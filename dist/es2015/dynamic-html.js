var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { bindingMode, createOverrideContext } from "aurelia-binding";
import { Container } from "aurelia-dependency-injection";
import { getLogger } from "aurelia-logging";
import { TaskQueue } from "aurelia-task-queue";
import { bindable, customElement, inlineView, ViewCompiler, ViewResources, ViewSlot } from "aurelia-templating";
const logger = getLogger("dynamic-html");
let DynamicHtml = class DynamicHtml {
    constructor(el, tq, container, viewCompiler) {
        this.el = el;
        this.tq = tq;
        this.container = container;
        this.viewCompiler = viewCompiler;
        this.html = this.context = this.slot = this.bindingContext = this.overrideContext = null;
        this.renderErrors = this.isAttached = this.isBound = this.isCompiled = this.isInitialized = false;
        this.isCleanedUp = true;
    }
    bind(bindingContext, overrideContext) {
        this.isBound = true;
        this.bindingContext = this.context || bindingContext.context || bindingContext;
        this.overrideContext = createOverrideContext(bindingContext, overrideContext);
        this.htmlChanged(this.html);
    }
    unbind() {
        this.isBound = false;
        this.bindingContext = null;
        this.overrideContext = null;
    }
    attached() {
        this.isAttached = true;
        this.isInitialized = true;
        this.slot = new ViewSlot(this.el.firstElementChild || this.el, true);
        this.tq.queueMicroTask(() => {
            this.tryCompile();
        });
    }
    detached() {
        this.isAttached = false;
        if (this.isCompiled) {
            this.cleanUp();
        }
        this.slot = null;
    }
    htmlChanged(newValue, __) {
        if ((newValue === null || newValue === undefined) && !this.isCleanedUp) {
            this.cleanUp();
        }
        else if (this.isBound || this.isInitialized) {
            this.tq.queueMicroTask(() => {
                this.tryCompile();
            });
        }
    }
    contextChanged(newValue, _) {
        if ((newValue === null || newValue === undefined) && !!this.overrideContext) {
            this.bindingContext = this.overrideContext.bindingContext;
        }
        else {
            this.bindingContext = newValue;
        }
        if (this.isBound || this.isInitialized) {
            this.tq.queueMicroTask(() => {
                this.tryCompile();
            });
        }
    }
    tryCompile() {
        if (this.isAttached) {
            if (!this.isCleanedUp) {
                this.cleanUp();
            }
            try {
                this.tq.queueMicroTask(() => {
                    this.compile();
                });
            }
            catch (e) {
                logger.warn(e.message);
                if (this.renderErrors) {
                    this.tq.queueMicroTask(() => {
                        this.compile(`<template>${e.message}</template>`);
                    });
                }
            }
        }
    }
    cleanUp() {
        this.isCompiled = false;
        logger.debug("Cleaning up");
        const slot = this.slot;
        try {
            slot.detached();
        }
        catch (e) {
            logger.error(e.message);
        }
        try {
            slot.unbind();
        }
        catch (e) {
            logger.error(e.message);
        }
        try {
            slot.removeAll();
        }
        catch (e) {
            logger.error(e.message);
        }
        this.isCleanedUp = true;
    }
    compile(message) {
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
        const viewResources = this.container.get(ViewResources);
        const childContainer = this.container.createChild();
        const factory = this.viewCompiler.compile(template, viewResources);
        const view = factory.create(childContainer);
        const slot = this.slot;
        slot.add(view);
        slot.bind(this.bindingContext, this.overrideContext);
        slot.attached();
        this.dispatchCompiledEvent();
        this.isCompiled = true;
    }
    dispatchCompiledEvent() {
        const event = new CustomEvent("compiled", {
            cancelable: true,
            bubbles: true,
            detail: this
        });
        this.el.dispatchEvent(event);
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.toView }),
    __metadata("design:type", Object)
], DynamicHtml.prototype, "html", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.toView }),
    __metadata("design:type", Object)
], DynamicHtml.prototype, "context", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.toView }),
    __metadata("design:type", Boolean)
], DynamicHtml.prototype, "renderErrors", void 0);
DynamicHtml = __decorate([
    customElement("dynamic-html"),
    inlineView("<template><div></div></template>"),
    __metadata("design:paramtypes", [Element, TaskQueue, Container, ViewCompiler])
], DynamicHtml);
export { DynamicHtml };
