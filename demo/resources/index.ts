// tslint:disable:no-implicit-dependencies
import { FrameworkConfiguration } from "aurelia-framework";
import { PLATFORM } from "aurelia-pal";

export function configure(config: FrameworkConfiguration): void {
  config.globalResources([
    PLATFORM.moduleName("resources/elements/monaco-editor"),
    PLATFORM.moduleName("resources/elements/dynamic-html")
  ]);
}
