import { configure } from "../../src/aurelia-dynamic-html";

describe("configure()", () => {
  it("should call globalResources", () => {
    let moduleName: string = null as any;
    const config: any = {
      globalResources: (name: string) => {
        moduleName = name;
      }
    };

    configure(config);

    expect(moduleName).toEqual(["./dynamic-html"]);
  });
});
