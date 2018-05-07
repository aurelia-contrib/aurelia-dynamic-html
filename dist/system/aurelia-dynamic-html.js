System.register(['aurelia-binding', 'aurelia-dependency-injection', 'aurelia-logging', 'aurelia-task-queue', 'aurelia-templating', 'aurelia-pal'], function (exports, module) {
    'use strict';
    var bindingMode, createOverrideContext, Container, getLogger, TaskQueue, bindable, customElement, inlineView, ViewCompiler, ViewResources, ViewSlot, PLATFORM;
    return {
        setters: [function (module) {
            bindingMode = module.bindingMode;
            createOverrideContext = module.createOverrideContext;
        }, function (module) {
            Container = module.Container;
        }, function (module) {
            getLogger = module.getLogger;
        }, function (module) {
            TaskQueue = module.TaskQueue;
        }, function (module) {
            bindable = module.bindable;
            customElement = module.customElement;
            inlineView = module.inlineView;
            ViewCompiler = module.ViewCompiler;
            ViewResources = module.ViewResources;
            ViewSlot = module.ViewSlot;
        }, function (module) {
            PLATFORM = module.PLATFORM;
        }],
        execute: function () {

            exports('configure', configure);
            /*! *****************************************************************************
            Copyright (c) Microsoft Corporation. All rights reserved.
            Licensed under the Apache License, Version 2.0 (the "License"); you may not use
            this file except in compliance with the License. You may obtain a copy of the
            License at http://www.apache.org/licenses/LICENSE-2.0

            THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
            KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
            WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
            MERCHANTABLITY OR NON-INFRINGEMENT.

            See the Apache Version 2.0 License for specific language governing permissions
            and limitations under the License.
            ***************************************************************************** */

            function __decorate(decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            }

            function __metadata(metadataKey, metadataValue) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
            }

            const logger = getLogger("dynamic-html");
            let DynamicHtml = exports('DynamicHtml', class DynamicHtml {
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
            });
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
            DynamicHtml = exports('DynamicHtml', __decorate([
                customElement("dynamic-html"),
                inlineView("<template><div></div></template>"),
                __metadata("design:paramtypes", [Element, TaskQueue, Container, ViewCompiler])
            ], DynamicHtml));

            function configure(config) {
                config.globalResources(PLATFORM.moduleName("./dynamic-html"));
            }

        }
    };
});
