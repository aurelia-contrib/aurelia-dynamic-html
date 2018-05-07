import { bindingMode } from "aurelia-binding";
import { bindable, customElement } from "aurelia-framework";
import { PLATFORM } from "aurelia-pal";
import { TaskQueue } from "aurelia-task-queue";
import * as monaco from "monaco-editor";

@customElement("monaco-editor")
export class MonacoEditor {
  @bindable({ defaultBindingMode: bindingMode.toView })
  public options: monaco.editor.IEditorConstructionOptions;

  @bindable({ defaultBindingMode: bindingMode.fromView })
  public editor: monaco.editor.IStandaloneCodeEditor;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public code: string;

  public editorHost: HTMLElement;
  private tq: TaskQueue;

  private isLoaded: boolean;
  private needsUpdateEditorValue: boolean;
  private isUpdatingCode: boolean;
  private isUpdatingEditorValue: boolean;

  constructor(tq: TaskQueue) {
    this.tq = tq;
    this.isLoaded = false;
    this.isUpdatingCode = false;
    this.isUpdatingEditorValue = false;
  }

  public attached(): void {
    PLATFORM.addEventListener("resize", this.handleResize);

    this.editor = monaco.editor.create(this.editorHost, this.options);
    this.isLoaded = true;
    if (this.needsUpdateEditorValue) {
      this.needsUpdateEditorValue = false;
      this.updateEditorValue();
    }
    this.editor.onDidChangeModelContent((): void => {
      this.updateCode();
    });
  }

  public detached(): void {
    PLATFORM.removeEventListener("resize", this.handleResize);

    this.editor.dispose();
    this.isLoaded = false;
  }

  protected codeChanged(): void {
    this.updateEditorValue();
  }

  private updateCode(): void {
    if (!this.isUpdatingEditorValue) {
      this.isUpdatingCode = true;
      this.code = this.editor.getValue();
      this.tq.queueMicroTask(() => {
        this.isUpdatingCode = false;
      });
    }
  }

  private updateEditorValue(): void {
    if (!this.isUpdatingCode && /String/.test(Object.prototype.toString.call(this.code))) {
      if (this.isLoaded) {
        this.isUpdatingEditorValue = true;
        this.editor.setValue(this.code);
        this.tq.queueTask(() => {
          this.isUpdatingEditorValue = false;
        });
      } else {
        this.needsUpdateEditorValue = true;
      }
    }
  }

  private handleResize = (): void => {
    if (!(this.editor === null || this.editor === undefined)) {
      this.editor.layout();
    }
  }
}
