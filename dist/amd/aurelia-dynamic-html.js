define(["require", "exports", "aurelia-pal", "./dynamic-html"], function (require, exports, aurelia_pal_1, dynamic_html_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName("./dynamic-html"));
    }
    exports.configure = configure;
    __export(dynamic_html_1);
});
