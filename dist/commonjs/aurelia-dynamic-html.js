'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var aureliaBinding = require('aurelia-binding');
var aureliaDependencyInjection = require('aurelia-dependency-injection');
var aureliaLogging = require('aurelia-logging');
var aureliaTaskQueue = require('aurelia-task-queue');
var aureliaTemplating = require('aurelia-templating');
var aureliaPal = require('aurelia-pal');

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

const logger = aureliaLogging.getLogger("dynamic-html");
exports.DynamicHtml = class DynamicHtml {
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
        this.overrideContext = aureliaBinding.createOverrideContext(bindingContext, overrideContext);
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
        this.slot = new aureliaTemplating.ViewSlot(this.el.firstElementChild || this.el, true);
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
        const viewResources = this.container.get(aureliaTemplating.ViewResources);
        const childContainer = this.container.createChild();
        const factory = this.viewCompiler.compile(template, viewResources);
        const view = factory.create(childContainer);
        const slot = this.slot;
        slot.add(view);
        slot.bind(this.bindingContext, this.overrideContext);
        slot.attached();
        this.isCompiled = true;
    }
};
__decorate([
    aureliaTemplating.bindable({ defaultBindingMode: aureliaBinding.bindingMode.toView }),
    __metadata("design:type", Object)
], exports.DynamicHtml.prototype, "html", void 0);
__decorate([
    aureliaTemplating.bindable({ defaultBindingMode: aureliaBinding.bindingMode.toView }),
    __metadata("design:type", Object)
], exports.DynamicHtml.prototype, "context", void 0);
__decorate([
    aureliaTemplating.bindable({ defaultBindingMode: aureliaBinding.bindingMode.toView }),
    __metadata("design:type", Boolean)
], exports.DynamicHtml.prototype, "renderErrors", void 0);
exports.DynamicHtml = __decorate([
    aureliaTemplating.customElement("dynamic-html"),
    aureliaTemplating.inlineView("<template><div></div></template>"),
    __metadata("design:paramtypes", [Element, aureliaTaskQueue.TaskQueue, aureliaDependencyInjection.Container, aureliaTemplating.ViewCompiler])
], exports.DynamicHtml);

function configure(config) {
    config.globalResources(aureliaPal.PLATFORM.moduleName("./dynamic-html"));
}

exports.configure = configure;
