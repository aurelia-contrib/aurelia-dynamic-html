import { PLATFORM } from "aurelia-pal";

export function configure(config: any): void {
  config.globalResources([PLATFORM.moduleName("./dynamic-html")]);
}
