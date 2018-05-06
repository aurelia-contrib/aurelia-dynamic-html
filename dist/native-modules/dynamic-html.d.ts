import { OverrideContext } from "aurelia-binding";
import { Container } from "aurelia-dependency-injection";
import { TaskQueue } from "aurelia-task-queue";
import { ViewCompiler, ViewSlot } from "aurelia-templating";
export interface IBindingContext {
    [key: string]: any;
}
export interface IOverrideContext {
    parentOverrideContext: IOverrideContext;
    bindingContext: IBindingContext;
}
export declare class DynamicHtml {
    html: string | null;
    context: IBindingContext | null;
    renderErrors: boolean;
    slot: ViewSlot | null;
    bindingContext: IBindingContext | null;
    overrideContext: IOverrideContext | OverrideContext | null;
    isAttached: boolean;
    isBound: boolean;
    isCompiled: boolean;
    isCleanedUp: boolean;
    isInitialized: boolean;
    el: HTMLElement;
    protected tq: TaskQueue;
    protected container: Container;
    protected viewCompiler: ViewCompiler;
    constructor(el: Element, tq: TaskQueue, container: Container, viewCompiler: ViewCompiler);
    bind(bindingContext: IBindingContext, overrideContext: IOverrideContext): void;
    unbind(): void;
    attached(): void;
    detached(): void;
    protected htmlChanged(newValue: string | null, __?: string): void;
    protected contextChanged(newValue: IBindingContext | null, _?: IBindingContext): void;
    protected tryCompile(): void;
    protected cleanUp(): void;
    protected compile(message?: string): void;
}
