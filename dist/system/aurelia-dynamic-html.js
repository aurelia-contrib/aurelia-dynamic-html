System.register(["aurelia-pal", "./dynamic-html"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName("./dynamic-html"));
    }
    exports_1("configure", configure);
    var aurelia_pal_1;
    var exportedNames_1 = {
        "configure": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (aurelia_pal_1_1) {
                aurelia_pal_1 = aurelia_pal_1_1;
            },
            function (dynamic_html_1_1) {
                exportStar_1(dynamic_html_1_1);
            }
        ],
        execute: function () {
        }
    };
});
