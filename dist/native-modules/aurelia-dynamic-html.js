import { PLATFORM } from "aurelia-pal";
export function configure(config) {
    config.globalResources(PLATFORM.moduleName("./dynamic-html"));
}
export * from "./dynamic-html";
