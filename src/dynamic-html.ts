import { bindingMode, createOverrideContext, OverrideContext } from "aurelia-binding";
import { Container } from "aurelia-dependency-injection";
import { getLogger } from "aurelia-logging";
import { TaskQueue } from "aurelia-task-queue";
import { bindable, customElement, inlineView, ViewCompiler, ViewResources, ViewSlot } from "aurelia-templating";

const logger = getLogger("dynamic-html");

export interface IBindingContext {
  [key: string]: any;
}

export interface IOverrideContext {
  parentOverrideContext: IOverrideContext;
  bindingContext: IBindingContext;
}

@customElement("dynamic-html")
@inlineView("<template><div></div></template>")
export class DynamicHtml {
  @bindable({ defaultBindingMode: bindingMode.toView })
  public html: string | null;

  @bindable({ defaultBindingMode: bindingMode.toView })
  public context: IBindingContext | null;

  @bindable({ defaultBindingMode: bindingMode.toView })
  public renderErrors: boolean;

  public slot: ViewSlot | null;
  public bindingContext: IBindingContext | null;
  public overrideContext: IOverrideContext | OverrideContext | null;
  public isAttached: boolean;
  public isBound: boolean;
  public isCompiled: boolean;
  public isCleanedUp: boolean;
  public isInitialized: boolean;

  public el: HTMLElement;
  protected tq: TaskQueue;
  protected container: Container;
  protected viewCompiler: ViewCompiler;

  constructor(el: Element, tq: TaskQueue, container: Container, viewCompiler: ViewCompiler) {
    this.el = el as HTMLElement;
    this.tq = tq;
    this.container = container;
    this.viewCompiler = viewCompiler;
    this.html = this.context = this.slot = this.bindingContext = this.overrideContext = null;
    this.renderErrors = this.isAttached = this.isBound = this.isCompiled = this.isInitialized = false;
    this.isCleanedUp = true;
  }

  public bind(bindingContext: IBindingContext, overrideContext: IOverrideContext): void {
    this.isBound = true;

    this.bindingContext = this.context || bindingContext.context || bindingContext;
    this.overrideContext = createOverrideContext(bindingContext, overrideContext);

    this.htmlChanged(this.html);
  }

  public unbind(): void {
    this.isBound = false;

    this.bindingContext = null;
    this.overrideContext = null;
  }

  public attached(): void {
    this.isAttached = true;
    this.isInitialized = true;

    this.slot = new ViewSlot(this.el.firstElementChild || this.el, true);

    this.tq.queueMicroTask(() => {
      this.tryCompile();
    });
  }

  public detached(): void {
    this.isAttached = false;

    if (this.isCompiled) {
      this.cleanUp();
    }
    this.slot = null;
  }

  protected htmlChanged(newValue: string | null, __?: string): void {
    if ((newValue === null || newValue === undefined) && !this.isCleanedUp) {
      this.cleanUp();
    } else if (this.isBound || this.isInitialized) {
      this.tq.queueMicroTask(() => {
        this.tryCompile();
      });
    }
  }

  protected contextChanged(newValue: IBindingContext | null, _?: IBindingContext): void {
    if ((newValue === null || newValue === undefined) && !!this.overrideContext) {
      this.bindingContext = this.overrideContext.bindingContext;
    } else {
      this.bindingContext = newValue;
    }
    if (this.isBound || this.isInitialized) {
      this.tq.queueMicroTask(() => {
        this.tryCompile();
      });
    }
  }

  protected tryCompile(): void {
    if (this.isAttached) {
      if (!this.isCleanedUp) {
        this.cleanUp();
      }
      try {
        this.tq.queueMicroTask(() => {
          this.compile();
        });
      } catch (e) {
        logger.warn(e.message);
        if (this.renderErrors) {
          this.tq.queueMicroTask(() => {
            this.compile(`<template>${e.message}</template>`);
          });
        }
      }
    }
  }

  protected cleanUp(): void {
    this.isCompiled = false;

    logger.debug("Cleaning up");

    const slot = this.slot as ViewSlot;
    try {
      slot.detached();
    } catch (e) {
      logger.error(e.message);
    }
    try {
      slot.unbind();
    } catch (e) {
      logger.error(e.message);
    }
    try {
      slot.removeAll();
    } catch (e) {
      logger.error(e.message);
    }

    this.isCleanedUp = true;
  }

  protected compile(message?: string): void {
    if (!this.isCleanedUp) {
      this.cleanUp();
    }
    if ((this.html === null || this.html === undefined) && message === undefined) {
      logger.debug("Skipping compilation because no html value is set");

      return;
    }
    this.isCleanedUp = false;

    const template = `<template>${message || this.html}</template>`;

    logger.debug("Compiling", template, this.bindingContext);

    const viewResources = this.container.get(ViewResources) as ViewResources;
    const childContainer = this.container.createChild();
    const factory = this.viewCompiler.compile(template, viewResources);
    const view = factory.create(childContainer);
    const slot = this.slot as ViewSlot;

    slot.add(view);
    slot.bind(this.bindingContext as IBindingContext, this.overrideContext as IOverrideContext);
    slot.attached();

    this.isCompiled = true;
  }
}
