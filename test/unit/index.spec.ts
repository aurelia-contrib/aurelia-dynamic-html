import { configure } from "../../src/aurelia-dynamic-html";

describe("configure()", () => {
  it("should set fxconfig.foo to 'bar'", () => {
    const fxconfig: any = {};

    configure(fxconfig);

    expect(fxconfig.foo).toBe("bar");
  });
});
