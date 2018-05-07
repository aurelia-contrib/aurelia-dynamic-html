export interface IBindingContext {
  [key: string]: any;
}

export interface IOverrideContext {
  parentOverrideContext: IOverrideContext;
  bindingContext: IBindingContext;
}
