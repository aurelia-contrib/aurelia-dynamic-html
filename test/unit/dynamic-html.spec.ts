import { OverrideContext } from "aurelia-binding";
import { Container } from "aurelia-dependency-injection";
import { DOM } from "aurelia-pal";
import { TaskQueue } from "aurelia-task-queue";
import { BindingLanguage, ViewCompiler, ViewResources, ViewSlot } from "aurelia-templating";
import { DynamicHtml } from "../../src/dynamic-html";
import { IBindingContext, IOverrideContext } from "../../src/interfaces";
import { getAllProperties, getAllPropertyNames } from "./util";

// tslint:disable:mocha-no-side-effect-code
// tslint:disable:variable-name
// tslint:disable:no-empty
// tslint:disable:max-line-length

class SutProps {
  public __metadata__: any = null;
  public html: string | null = null;
  public context: IBindingContext | null = null;
  public renderErrors: boolean = false;

  public slot: ViewSlot | null = null;
  public bindingContext: IBindingContext | null = null;
  public overrideContext: IOverrideContext | OverrideContext | null = null;
  public isAttached: boolean = false;
  public isBound: boolean = false;
  public isCompiled: boolean = false;
  public isCleanedUp: boolean = true;
  public isInitialized: boolean = false;

  public el: HTMLElement = DOM.createElement("div");
  public tq: TaskQueue = new TaskQueue();
  public container: Container = new Container();
  public viewCompiler: ViewCompiler = new ViewCompiler(new BindingLanguage(), new ViewResources());

  public bind(_: any, __: any): void {}
  public unbind(): void {}
  public attached(): void {}
  public detached(): void {}
  public htmlChanged(_: any, __?: any): void {}
  public contextChanged(_: any, __?: any): void {}
  public tryCompile(): void {}
  public cleanUp(): void {}
  public compile(_: any): void {}
  public dispatchCompiledEvent(_: any): void {}
}

describe("SutProps", () => {
  const sutActual = new (DynamicHtml as any)();
  const sutProps = new SutProps();

  it("should have property", () => {
    const actualKeys = getAllPropertyNames(sutActual).sort();
    const expectedKeys = getAllPropertyNames(sutProps).sort();

    expect(actualKeys).toEqual(expectedKeys);
  });
});

describe("constructor()", () => {
  let actualSut: SutProps;
  const expectedSut = new SutProps();
  const expectedProps = getAllProperties(expectedSut).filter(p => !(p.value instanceof Function));
  const expectedPropsCount = expectedProps.length;

  beforeEach(() => {
    actualSut = new DynamicHtml(expectedSut.el, expectedSut.tq, expectedSut.container, expectedSut.viewCompiler) as any;
  });

  describe("should set property", () => {
    for (let i = 0; i < expectedPropsCount; i++) {
      it(expectedProps[i].key, () => {
        expect(actualSut[expectedProps[i].key]).toEqual(expectedProps[i].value);
      });
    }
  });

  describe("should not leave property undefined", () => {
    for (let i = 0; i < expectedPropsCount; i++) {
      it(expectedProps[i].key, () => {
        expect(actualSut[expectedProps[i].key]).not.toBeUndefined();
      });
    }
  });
});

describe("bind()", () => {
  let sut: SutProps;
  let bc: any;
  let oc: any;
  const props = new SutProps();

  beforeEach(() => {
    sut = new DynamicHtml(props.el, props.tq, props.container, props.viewCompiler) as any;
    bc = {};
    oc = {};
  });

  describe("should set property", () => {
    it("isBound", () => {
      sut.bind(bc, oc);
      expect(sut.isBound).toBe(true);
    });

    it("bindingContext when this.context is null and bindingContext.context is undefined", () => {
      sut.bind(bc, oc);
      expect(sut.bindingContext).toBe(bc);
    });

    it("bindingContext when this.context is null and bindingContext.context is an object", () => {
      bc.context = {};
      sut.bind(bc, oc);
      expect(sut.bindingContext).toBe(bc.context);
    });

    it("bindingContext when this.context is an object", () => {
      sut.context = {};
      delete sut.contextChanged;
      sut.bind(bc, oc);
      expect(sut.bindingContext).toBe(sut.context);
    });
  });

  describe("should not set property", () => {
    const excludedProps = ["context", "isBound", "bindingContext", "overrideContext", "tq", "viewCompiler"];
    const expectedSut = new SutProps();
    const expectedProps = getAllProperties(expectedSut).filter(
      p => !(p.value instanceof Function) && excludedProps.indexOf(p.key) === -1
    );
    const expectedPropsCount = expectedProps.length;

    for (let i = 0; i < expectedPropsCount; i++) {
      it(expectedProps[i].key, () => {
        sut.bind(bc, oc);
        expect((sut as any)[expectedProps[i].key]).toEqual((expectedSut as any)[expectedProps[i].key]);
      });
    }
  });
});

describe("unbind()", () => {
  let sut: SutProps;
  const props = new SutProps();

  beforeEach(() => {
    sut = new DynamicHtml(props.el, props.tq, props.container, props.viewCompiler) as any;
  });

  describe("should set property", () => {
    beforeEach(() => {
      sut.bind({}, {});
    });

    it("bindingContext", () => {
      sut.unbind();
      expect(sut.bindingContext).toBeNull();
    });

    it("overrideContext", () => {
      sut.unbind();
      expect(sut.overrideContext).toBeNull();
    });

    it("isBound", () => {
      sut.unbind();
      expect(sut.isBound).toBe(false);
    });
  });

  describe("should not set property", () => {
    const excludedProps = ["isBound", "bindingContext", "overrideContext"];
    const expectedSut = new DynamicHtml(props.el, props.tq, props.container, props.viewCompiler) as any;
    const expectedProps = getAllProperties(expectedSut).filter(
      p => !(p.value instanceof Function) && excludedProps.indexOf(p.key) === -1
    );
    const expectedPropsCount = expectedProps.length;

    beforeEach(() => {
      const bc = {};
      const oc = {};
      sut.bind(bc, oc);
      expectedSut.bind(bc, oc);
    });

    for (let i = 0; i < expectedPropsCount; i++) {
      it(expectedProps[i].key, () => {
        sut.unbind();
        expect((sut as any)[expectedProps[i].key]).toEqual((expectedSut as any)[expectedProps[i].key]);
      });
    }
  });
});

describe("attached()", () => {
  let sut: SutProps;
  const props = new SutProps();

  beforeEach(() => {
    sut = new DynamicHtml(props.el, props.tq, props.container, props.viewCompiler) as any;
  });

  describe("should set property", () => {
    it("isAttached", () => {
      sut.attached();
      expect(sut.isAttached).toBe(true);
    });

    it("isInitialized", () => {
      sut.attached();
      expect(sut.isInitialized).toBe(true);
    });

    it("slot", () => {
      sut.attached();
      expect(sut.slot).toEqual(jasmine.any(ViewSlot));
    });
  });

  describe("should not set property", () => {
    const excludedProps = ["isAttached", "isInitialized", "slot", "tq", "viewCompiler"];
    const expectedSut = new SutProps();
    const expectedProps = getAllProperties(expectedSut).filter(
      p => !(p.value instanceof Function) && excludedProps.indexOf(p.key) === -1
    );
    const expectedPropsCount = expectedProps.length;

    for (let i = 0; i < expectedPropsCount; i++) {
      it(expectedProps[i].key, () => {
        sut.attached();
        expect((sut as any)[expectedProps[i].key]).toEqual((expectedSut as any)[expectedProps[i].key]);
      });
    }
  });
});

describe("detached()", () => {
  let sut: SutProps;
  const props = new SutProps();

  beforeEach(() => {
    sut = new DynamicHtml(props.el, props.tq, props.container, props.viewCompiler) as any;
    sut.attached();
  });

  describe("should set property", () => {
    it("isAttached", () => {
      sut.detached();
      expect(sut.isAttached).toBe(false);
    });

    it("slot", () => {
      sut.detached();
      expect(sut.slot).toBeNull();
    });
  });

  describe("should not set property", () => {
    const excludedProps = ["isAttached", "slot"];
    const expectedSut = new DynamicHtml(props.el, props.tq, props.container, props.viewCompiler) as any;
    const expectedProps = getAllProperties(expectedSut).filter(
      p => !(p.value instanceof Function) && excludedProps.indexOf(p.key) === -1
    );
    const expectedPropsCount = expectedProps.length;

    beforeEach(() => {
      sut.attached();
      expectedSut.attached();
    });

    for (let i = 0; i < expectedPropsCount; i++) {
      it(expectedProps[i].key, () => {
        sut.detached();
        expect((sut as any)[expectedProps[i].key]).toEqual((expectedSut as any)[expectedProps[i].key]);
      });
    }
  });
});

describe("htmlChanged()", () => {
  let sut: SutProps;
  const props = new SutProps();

  beforeEach(() => {
    sut = new DynamicHtml(props.el, props.tq, props.container, props.viewCompiler) as any;
  });

  const newValueValues = [undefined, null, "", "asdf"];
  const isCleanedUpValues = [true, false];
  const isBoundValues = [true, false];
  const isInitializedValues = [true, false];

  const newValueValuesLength = newValueValues.length;
  const isCleanedUpValuesLength = isCleanedUpValues.length;
  const isBoundValuesLength = isBoundValues.length;
  const isInitializedValuesLength = isInitializedValues.length;

  for (let i = 0; i < newValueValuesLength; i++) {
    const newValue = newValueValues[i];

    for (let j = 0; j < isCleanedUpValuesLength; j++) {
      const isCleanedUp = isCleanedUpValues[j];

      for (let k = 0; k < isBoundValuesLength; k++) {
        const isBound = isBoundValues[k];

        for (let l = 0; l < isInitializedValuesLength; l++) {
          const isInitialized = isInitializedValues[l];

          // tslint:disable-next-line:max-line-length
          it(`newValue=${!newValue ? typeof newValue : newValue}, isCleanedUp=${isCleanedUp}, isBound=${isBound}, isInitialized=${isInitialized}`, done => {
            sut.isCleanedUp = isCleanedUp;
            sut.isBound = isBound;
            sut.isInitialized = isInitialized;

            const cleanUpSpy = spyOn(sut, "cleanUp").and.callThrough();
            const tryCompileSpy = spyOn(sut, "tryCompile").and.callThrough();

            sut.htmlChanged(newValue);

            setTimeout(() => {
              if ((newValue === null || newValue === undefined) && isCleanedUp === false) {
                expect(cleanUpSpy.calls.count()).toBe(1, "cleanUp() should have been called");
                expect(tryCompileSpy.calls.count()).toBe(0, "tryCompile() should NOT have been called");
              } else if (isBound === true || isInitialized === true) {
                expect(cleanUpSpy.calls.count()).toBe(0, "cleanUp() should NOT have been called");
                expect(tryCompileSpy.calls.count()).toBe(1, "tryCompile() should have been called");
              } else {
                expect(cleanUpSpy.calls.count()).toBe(0, "tryCompile() should NOT have been called");
                expect(tryCompileSpy.calls.count()).toBe(0, "tryCompile() should NOT have been called");
              }
              done();
            },         0);
          });
        }
      }
    }
  }
});

describe("contextChanged()", () => {
  let sut: SutProps;
  const props = new SutProps();

  beforeEach(() => {
    sut = new DynamicHtml(props.el, props.tq, props.container, props.viewCompiler) as any;
  });

  const newValueValues = [undefined, null, {}];
  const overrideContextValues = [undefined, null, {bindingContext: {}}];
  const isBoundValues = [true, false];
  const isInitializedValues = [true, false];

  const newValueValuesLength = newValueValues.length;
  const overrideContextValuesLength = overrideContextValues.length;
  const isBoundValuesLength = isBoundValues.length;
  const isInitializedValuesLength = isInitializedValues.length;

  for (let i = 0; i < newValueValuesLength; i++) {
    const newValue = newValueValues[i];

    for (let j = 0; j < overrideContextValuesLength; j++) {
      const overrideContext = overrideContextValues[j];

      for (let k = 0; k < isBoundValuesLength; k++) {
        const isBound = isBoundValues[k];

        for (let l = 0; l < isInitializedValuesLength; l++) {
          const isInitialized = isInitializedValues[l];

          // tslint:disable-next-line:max-line-length
          it(`newValue=${typeof newValue}, overrideContext=${typeof overrideContext}, isBound=${isBound}, isInitialized=${isInitialized}`, done => {
            sut.overrideContext = overrideContext as any;
            sut.isBound = isBound;
            sut.isInitialized = isInitialized;

            const tryCompileSpy = spyOn(sut, "tryCompile").and.callThrough();
            const initialBindingContext = sut.bindingContext = {};

            sut.contextChanged(newValue);

            setTimeout(() => {
              if (newValue === null || newValue === undefined) {
                if (!!overrideContext) {
                  expect(sut.bindingContext).toBe(overrideContext.bindingContext, "bindingContext should have been set to overrideContext.bindingContext");
                } else {
                  expect(sut.bindingContext).toBe(newValue as any, "bindingContext should have been set to newValue");
                }
              } else {
                expect(sut.bindingContext).toBe(newValue as any, "bindingContext should have been set to newValue");
              }
              expect(sut.bindingContext).not.toBe(initialBindingContext, "bindingContext should never be the same as its original value");
              if (isBound === true || isInitialized === true) {
                expect(tryCompileSpy.calls.count()).toBe(1, "tryCompile() should have been called");
              } else {
                expect(tryCompileSpy.calls.count()).toBe(0, "tryCompile() should NOT have been called");
              }
              done();
            },         0);
          });
        }
      }
    }
  }
});

describe("tryCompile()", () => {
  let sut: SutProps;
  const props = new SutProps();

  beforeEach(() => {
    sut = new DynamicHtml(props.el, props.tq, props.container, props.viewCompiler) as any;
  });

  const isAttachedValues = [true, false];
  const isCleanedUpValues = [true, false];

  const isAttachedValuesLength = isAttachedValues.length;
  const isCleanedUpValuesLength = isCleanedUpValues.length;

  for (let i = 0; i < isAttachedValuesLength; i++) {
    const isAttached = isAttachedValues[i];

    for (let j = 0; j < isCleanedUpValuesLength; j++) {
      const isCleanedUp = isCleanedUpValues[j];

      // tslint:disable-next-line:max-line-length
      it(`isAttached=${isAttached}, isCleanedUp=${isCleanedUp}`, done => {
        sut.isAttached = isAttached;
        sut.isCleanedUp = isCleanedUp;

        const cleanUpSpy = spyOn(sut, "cleanUp").and.callThrough();

        sut.tryCompile();

        setTimeout(() => {
          if (isAttached === true && isCleanedUp === false) {
            expect(cleanUpSpy.calls.count()).toBe(1, "cleanUp() should have been called");
          } else {
            expect(cleanUpSpy.calls.count()).toBe(0, "cleanUp() should NOT have been called");
          }
          done();
        },         0);
      });
    }
  }
});

describe("cleanUp()", () => {
  let sut: any;
  const props = new SutProps();

  beforeEach(() => {
    sut = new DynamicHtml(props.el, props.tq, props.container, props.viewCompiler) as any;
  });

  it("should always call slot.detached()", () => {
    sut.slot = jasmine.createSpyObj(["detached"]);
    sut.cleanUp();
    expect(sut.slot.detached.calls.count()).toBe(1);
  });

  it("should always call slot.unbind()", () => {
    sut.slot = jasmine.createSpyObj(["unbind"]);
    sut.cleanUp();
    expect(sut.slot.unbind.calls.count()).toBe(1);
  });

  it("should always call slot.removeAll()", () => {
    sut.slot = jasmine.createSpyObj(["removeAll"]);
    sut.cleanUp();
    expect(sut.slot.removeAll.calls.count()).toBe(1);
  });

  it("should always set isCompiled to false", () => {
    sut.isCompiled = true;
    sut.cleanUp();
    expect(sut.isCompiled).toBe(false);
  });

  it("should always set isCleanedUp to true", () => {
    sut.isCleanedUp = false;
    sut.cleanUp();
    expect(sut.isCleanedUp).toBe(true);
  });
});

describe("compile()", () => {
  let sut: any;
  const props = new SutProps();

  beforeEach(() => {
    sut = new DynamicHtml(props.el, props.tq, props.container, props.viewCompiler) as any;
  });

  it("should call cleanUp() when isCleanedUp is false", done => {
    sut.slot = jasmine.createSpyObj(["add", "bind", "attached"]);
    sut.isCleanedUp = false;

    const cleanUpSpy = spyOn(sut, "cleanUp").and.callThrough();

    sut.compile();

    setTimeout(() => {
      expect(cleanUpSpy.calls.count()).toBe(1);
      done();
    },         0);
  });

  it("should NOT call cleanUp() when isCleanedUp is true", done => {
    sut.slot = jasmine.createSpyObj(["add", "bind", "attached"]);
    sut.isCleanedUp = true;

    const cleanUpSpy = spyOn(sut, "cleanUp").and.callThrough();

    sut.compile();

    setTimeout(() => {
      expect(cleanUpSpy.calls.count()).toBe(0);
      done();
    },         0);
  });

  it("should always set isCleanedUp to false if html has a value", () => {
    sut.isCleanedUp = true;
    delete sut.htmlChanged;
    sut.html = "";

    try {
      sut.compile();
    } catch (e) { }

    expect(sut.isCleanedUp).toBe(false);
  });

  it("should not proceed with compilation if html is null", () => {
    sut.isCleanedUp = true;
    delete sut.htmlChanged;
    sut.html = null;

    sut.compile();

    expect(sut.isCleanedUp).toBe(true);
  });

  it("should not proceed with compilation if html is undefined", () => {
    sut.isCleanedUp = true;
    delete sut.htmlChanged;
    sut.html = undefined;

    sut.compile();

    expect(sut.isCleanedUp).toBe(true);
  });

  it("should proceed with compilation if html has a value", () => {
    sut.isCleanedUp = true;
    delete sut.htmlChanged;
    sut.html = "";
    spyOn(sut.container, "get").and.callFake(new Function());
    spyOn(sut.container, "createChild").and.callFake(new Function());
    const mockFactory = jasmine.createSpyObj(["create"]);
    spyOn(sut.viewCompiler, "compile").and.returnValue(mockFactory);
    sut.slot = jasmine.createSpyObj(["add", "bind", "attached"]);

    sut.compile();

    expect(sut.container.get.calls.count()).toBe(1);
    expect(sut.container.createChild.calls.count()).toBe(1);
    expect(mockFactory.create.calls.count()).toBe(1);
    expect(sut.viewCompiler.compile.calls.count()).toBe(1);
    expect(sut.slot.add.calls.count()).toBe(1);
    expect(sut.slot.bind.calls.count()).toBe(1);
    expect(sut.slot.attached.calls.count()).toBe(1);

    expect(sut.isCompiled).toBe(true);
  });
});
