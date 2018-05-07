(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[23],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/fsharp/fsharp.js":
/*!****************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/fsharp/fsharp.js ***!
  \****************************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"conf\", function() { return conf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"language\", function() { return language; });\n/*---------------------------------------------------------------------------------------------\n *  Copyright (c) Microsoft Corporation. All rights reserved.\n *  Licensed under the MIT License. See License.txt in the project root for license information.\n *--------------------------------------------------------------------------------------------*/\n\nvar conf = {\n    comments: {\n        lineComment: '//',\n        blockComment: ['(*', '*)'],\n    },\n    brackets: [\n        ['{', '}'],\n        ['[', ']'],\n        ['(', ')']\n    ],\n    autoClosingPairs: [\n        { open: '{', close: '}' },\n        { open: '[', close: ']' },\n        { open: '(', close: ')' },\n        { open: '\"', close: '\"' }\n    ],\n    surroundingPairs: [\n        { open: '{', close: '}' },\n        { open: '[', close: ']' },\n        { open: '(', close: ')' },\n        { open: '\"', close: '\"' },\n        { open: '\\'', close: '\\'' }\n    ],\n    folding: {\n        markers: {\n            start: new RegExp(\"^\\\\s*//\\\\s*#region\\\\b|^\\\\s*\\\\(\\\\*\\\\s*#region(.*)\\\\*\\\\)\"),\n            end: new RegExp(\"^\\\\s*//\\\\s*#endregion\\\\b|^\\\\s*\\\\(\\\\*\\\\s*#endregion\\\\s*\\\\*\\\\)\")\n        }\n    }\n};\nvar language = {\n    defaultToken: '',\n    tokenPostfix: '.fs',\n    keywords: [\n        'abstract', 'and', 'atomic', 'as',\n        'assert', 'asr', 'base', 'begin',\n        'break', 'checked', 'component',\n        'const', 'constraint', 'constructor',\n        'continue', 'class', 'default',\n        'delegate', 'do', 'done', 'downcast',\n        'downto', 'elif', 'else', 'end',\n        'exception', 'eager', 'event', 'external',\n        'extern', 'false', 'finally', 'for',\n        'fun', 'function', 'fixed', 'functor',\n        'global', 'if', 'in', 'include', 'inherit',\n        'inline', 'interface', 'internal', 'land',\n        'lor', 'lsl', 'lsr', 'lxor', 'lazy', 'let',\n        'match', 'member', 'mod', 'module', 'mutable',\n        'namespace', 'method', 'mixin', 'new', 'not',\n        'null', 'of', 'open', 'or', 'object',\n        'override', 'private', 'parallel', 'process',\n        'protected', 'pure', 'public', 'rec', 'return',\n        'static', 'sealed', 'struct', 'sig', 'then',\n        'to', 'true', 'tailcall', 'trait',\n        'try', 'type', 'upcast', 'use',\n        'val', 'void', 'virtual', 'volatile',\n        'when', 'while', 'with', 'yield'\n    ],\n    // we include these common regular expressions\n    symbols: /[=><!~?:&|+\\-*\\^%;\\.,\\/]+/,\n    escapes: /\\\\(?:[abfnrtv\\\\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,\n    integersuffix: /[uU]?[yslnLI]?/,\n    floatsuffix: /[fFmM]?/,\n    // The main tokenizer for our languages\n    tokenizer: {\n        root: [\n            // identifiers and keywords\n            [/[a-zA-Z_]\\w*/, {\n                    cases: {\n                        '@keywords': { token: 'keyword.$0' },\n                        '@default': 'identifier'\n                    }\n                }],\n            // whitespace\n            { include: '@whitespace' },\n            // [< attributes >].\n            [/\\[<.*>\\]/, 'annotation'],\n            // Preprocessor directive\n            [/^#(if|else|endif)/, 'keyword'],\n            // delimiters and operators\n            [/[{}()\\[\\]]/, '@brackets'],\n            [/[<>](?!@symbols)/, '@brackets'],\n            [/@symbols/, 'delimiter'],\n            // numbers\n            [/\\d*\\d+[eE]([\\-+]?\\d+)?(@floatsuffix)/, 'number.float'],\n            [/\\d*\\.\\d+([eE][\\-+]?\\d+)?(@floatsuffix)/, 'number.float'],\n            [/0x[0-9a-fA-F]+LF/, 'number.float'],\n            [/0x[0-9a-fA-F]+(@integersuffix)/, 'number.hex'],\n            [/0b[0-1]+(@integersuffix)/, 'number.bin'],\n            [/\\d+(@integersuffix)/, 'number'],\n            // delimiter: after number because of .\\d floats\n            [/[;,.]/, 'delimiter'],\n            // strings\n            [/\"([^\"\\\\]|\\\\.)*$/, 'string.invalid'],\n            [/\"\"\"/, 'string', '@string.\"\"\"'],\n            [/\"/, 'string', '@string.\"'],\n            // literal string\n            [/\\@\"/, { token: 'string.quote', next: '@litstring' }],\n            // characters\n            [/'[^\\\\']'B?/, 'string'],\n            [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],\n            [/'/, 'string.invalid']\n        ],\n        whitespace: [\n            [/[ \\t\\r\\n]+/, ''],\n            [/\\(\\*(?!\\))/, 'comment', '@comment'],\n            [/\\/\\/.*$/, 'comment'],\n        ],\n        comment: [\n            [/[^\\*]+/, 'comment'],\n            [/\\*\\)/, 'comment', '@pop'],\n            [/\\*/, 'comment']\n        ],\n        string: [\n            [/[^\\\\\"]+/, 'string'],\n            [/@escapes/, 'string.escape'],\n            [/\\\\./, 'string.escape.invalid'],\n            [/(\"\"\"|\"B?)/, {\n                    cases: {\n                        '$#==$S2': { token: 'string', next: '@pop' },\n                        '@default': 'string'\n                    }\n                }]\n        ],\n        litstring: [\n            [/[^\"]+/, 'string'],\n            [/\"\"/, 'string.escape'],\n            [/\"/, { token: 'string.quote', next: '@pop' }]\n        ],\n    },\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL2ZzaGFycC9mc2hhcnAuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL2ZzaGFycC9mc2hhcnAuanM/Y2FjYyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbid1c2Ugc3RyaWN0JztcbmV4cG9ydCB2YXIgY29uZiA9IHtcbiAgICBjb21tZW50czoge1xuICAgICAgICBsaW5lQ29tbWVudDogJy8vJyxcbiAgICAgICAgYmxvY2tDb21tZW50OiBbJygqJywgJyopJ10sXG4gICAgfSxcbiAgICBicmFja2V0czogW1xuICAgICAgICBbJ3snLCAnfSddLFxuICAgICAgICBbJ1snLCAnXSddLFxuICAgICAgICBbJygnLCAnKSddXG4gICAgXSxcbiAgICBhdXRvQ2xvc2luZ1BhaXJzOiBbXG4gICAgICAgIHsgb3BlbjogJ3snLCBjbG9zZTogJ30nIH0sXG4gICAgICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nIH0sXG4gICAgICAgIHsgb3BlbjogJygnLCBjbG9zZTogJyknIH0sXG4gICAgICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicgfVxuICAgIF0sXG4gICAgc3Vycm91bmRpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH0sXG4gICAgICAgIHsgb3BlbjogJ1xcJycsIGNsb3NlOiAnXFwnJyB9XG4gICAgXSxcbiAgICBmb2xkaW5nOiB7XG4gICAgICAgIG1hcmtlcnM6IHtcbiAgICAgICAgICAgIHN0YXJ0OiBuZXcgUmVnRXhwKFwiXlxcXFxzKi8vXFxcXHMqI3JlZ2lvblxcXFxifF5cXFxccypcXFxcKFxcXFwqXFxcXHMqI3JlZ2lvbiguKilcXFxcKlxcXFwpXCIpLFxuICAgICAgICAgICAgZW5kOiBuZXcgUmVnRXhwKFwiXlxcXFxzKi8vXFxcXHMqI2VuZHJlZ2lvblxcXFxifF5cXFxccypcXFxcKFxcXFwqXFxcXHMqI2VuZHJlZ2lvblxcXFxzKlxcXFwqXFxcXClcIilcbiAgICAgICAgfVxuICAgIH1cbn07XG5leHBvcnQgdmFyIGxhbmd1YWdlID0ge1xuICAgIGRlZmF1bHRUb2tlbjogJycsXG4gICAgdG9rZW5Qb3N0Zml4OiAnLmZzJyxcbiAgICBrZXl3b3JkczogW1xuICAgICAgICAnYWJzdHJhY3QnLCAnYW5kJywgJ2F0b21pYycsICdhcycsXG4gICAgICAgICdhc3NlcnQnLCAnYXNyJywgJ2Jhc2UnLCAnYmVnaW4nLFxuICAgICAgICAnYnJlYWsnLCAnY2hlY2tlZCcsICdjb21wb25lbnQnLFxuICAgICAgICAnY29uc3QnLCAnY29uc3RyYWludCcsICdjb25zdHJ1Y3RvcicsXG4gICAgICAgICdjb250aW51ZScsICdjbGFzcycsICdkZWZhdWx0JyxcbiAgICAgICAgJ2RlbGVnYXRlJywgJ2RvJywgJ2RvbmUnLCAnZG93bmNhc3QnLFxuICAgICAgICAnZG93bnRvJywgJ2VsaWYnLCAnZWxzZScsICdlbmQnLFxuICAgICAgICAnZXhjZXB0aW9uJywgJ2VhZ2VyJywgJ2V2ZW50JywgJ2V4dGVybmFsJyxcbiAgICAgICAgJ2V4dGVybicsICdmYWxzZScsICdmaW5hbGx5JywgJ2ZvcicsXG4gICAgICAgICdmdW4nLCAnZnVuY3Rpb24nLCAnZml4ZWQnLCAnZnVuY3RvcicsXG4gICAgICAgICdnbG9iYWwnLCAnaWYnLCAnaW4nLCAnaW5jbHVkZScsICdpbmhlcml0JyxcbiAgICAgICAgJ2lubGluZScsICdpbnRlcmZhY2UnLCAnaW50ZXJuYWwnLCAnbGFuZCcsXG4gICAgICAgICdsb3InLCAnbHNsJywgJ2xzcicsICdseG9yJywgJ2xhenknLCAnbGV0JyxcbiAgICAgICAgJ21hdGNoJywgJ21lbWJlcicsICdtb2QnLCAnbW9kdWxlJywgJ211dGFibGUnLFxuICAgICAgICAnbmFtZXNwYWNlJywgJ21ldGhvZCcsICdtaXhpbicsICduZXcnLCAnbm90JyxcbiAgICAgICAgJ251bGwnLCAnb2YnLCAnb3BlbicsICdvcicsICdvYmplY3QnLFxuICAgICAgICAnb3ZlcnJpZGUnLCAncHJpdmF0ZScsICdwYXJhbGxlbCcsICdwcm9jZXNzJyxcbiAgICAgICAgJ3Byb3RlY3RlZCcsICdwdXJlJywgJ3B1YmxpYycsICdyZWMnLCAncmV0dXJuJyxcbiAgICAgICAgJ3N0YXRpYycsICdzZWFsZWQnLCAnc3RydWN0JywgJ3NpZycsICd0aGVuJyxcbiAgICAgICAgJ3RvJywgJ3RydWUnLCAndGFpbGNhbGwnLCAndHJhaXQnLFxuICAgICAgICAndHJ5JywgJ3R5cGUnLCAndXBjYXN0JywgJ3VzZScsXG4gICAgICAgICd2YWwnLCAndm9pZCcsICd2aXJ0dWFsJywgJ3ZvbGF0aWxlJyxcbiAgICAgICAgJ3doZW4nLCAnd2hpbGUnLCAnd2l0aCcsICd5aWVsZCdcbiAgICBdLFxuICAgIC8vIHdlIGluY2x1ZGUgdGhlc2UgY29tbW9uIHJlZ3VsYXIgZXhwcmVzc2lvbnNcbiAgICBzeW1ib2xzOiAvWz0+PCF+PzomfCtcXC0qXFxeJTtcXC4sXFwvXSsvLFxuICAgIGVzY2FwZXM6IC9cXFxcKD86W2FiZm5ydHZcXFxcXCInXXx4WzAtOUEtRmEtZl17MSw0fXx1WzAtOUEtRmEtZl17NH18VVswLTlBLUZhLWZdezh9KS8sXG4gICAgaW50ZWdlcnN1ZmZpeDogL1t1VV0/W3lzbG5MSV0/LyxcbiAgICBmbG9hdHN1ZmZpeDogL1tmRm1NXT8vLFxuICAgIC8vIFRoZSBtYWluIHRva2VuaXplciBmb3Igb3VyIGxhbmd1YWdlc1xuICAgIHRva2VuaXplcjoge1xuICAgICAgICByb290OiBbXG4gICAgICAgICAgICAvLyBpZGVudGlmaWVycyBhbmQga2V5d29yZHNcbiAgICAgICAgICAgIFsvW2EtekEtWl9dXFx3Ki8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAa2V5d29yZHMnOiB7IHRva2VuOiAna2V5d29yZC4kMCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdpZGVudGlmaWVyJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAvLyB3aGl0ZXNwYWNlXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAd2hpdGVzcGFjZScgfSxcbiAgICAgICAgICAgIC8vIFs8IGF0dHJpYnV0ZXMgPl0uXG4gICAgICAgICAgICBbL1xcWzwuKj5cXF0vLCAnYW5ub3RhdGlvbiddLFxuICAgICAgICAgICAgLy8gUHJlcHJvY2Vzc29yIGRpcmVjdGl2ZVxuICAgICAgICAgICAgWy9eIyhpZnxlbHNlfGVuZGlmKS8sICdrZXl3b3JkJ10sXG4gICAgICAgICAgICAvLyBkZWxpbWl0ZXJzIGFuZCBvcGVyYXRvcnNcbiAgICAgICAgICAgIFsvW3t9KClcXFtcXF1dLywgJ0BicmFja2V0cyddLFxuICAgICAgICAgICAgWy9bPD5dKD8hQHN5bWJvbHMpLywgJ0BicmFja2V0cyddLFxuICAgICAgICAgICAgWy9Ac3ltYm9scy8sICdkZWxpbWl0ZXInXSxcbiAgICAgICAgICAgIC8vIG51bWJlcnNcbiAgICAgICAgICAgIFsvXFxkKlxcZCtbZUVdKFtcXC0rXT9cXGQrKT8oQGZsb2F0c3VmZml4KS8sICdudW1iZXIuZmxvYXQnXSxcbiAgICAgICAgICAgIFsvXFxkKlxcLlxcZCsoW2VFXVtcXC0rXT9cXGQrKT8oQGZsb2F0c3VmZml4KS8sICdudW1iZXIuZmxvYXQnXSxcbiAgICAgICAgICAgIFsvMHhbMC05YS1mQS1GXStMRi8sICdudW1iZXIuZmxvYXQnXSxcbiAgICAgICAgICAgIFsvMHhbMC05YS1mQS1GXSsoQGludGVnZXJzdWZmaXgpLywgJ251bWJlci5oZXgnXSxcbiAgICAgICAgICAgIFsvMGJbMC0xXSsoQGludGVnZXJzdWZmaXgpLywgJ251bWJlci5iaW4nXSxcbiAgICAgICAgICAgIFsvXFxkKyhAaW50ZWdlcnN1ZmZpeCkvLCAnbnVtYmVyJ10sXG4gICAgICAgICAgICAvLyBkZWxpbWl0ZXI6IGFmdGVyIG51bWJlciBiZWNhdXNlIG9mIC5cXGQgZmxvYXRzXG4gICAgICAgICAgICBbL1s7LC5dLywgJ2RlbGltaXRlciddLFxuICAgICAgICAgICAgLy8gc3RyaW5nc1xuICAgICAgICAgICAgWy9cIihbXlwiXFxcXF18XFxcXC4pKiQvLCAnc3RyaW5nLmludmFsaWQnXSxcbiAgICAgICAgICAgIFsvXCJcIlwiLywgJ3N0cmluZycsICdAc3RyaW5nLlwiXCJcIiddLFxuICAgICAgICAgICAgWy9cIi8sICdzdHJpbmcnLCAnQHN0cmluZy5cIiddLFxuICAgICAgICAgICAgLy8gbGl0ZXJhbCBzdHJpbmdcbiAgICAgICAgICAgIFsvXFxAXCIvLCB7IHRva2VuOiAnc3RyaW5nLnF1b3RlJywgbmV4dDogJ0BsaXRzdHJpbmcnIH1dLFxuICAgICAgICAgICAgLy8gY2hhcmFjdGVyc1xuICAgICAgICAgICAgWy8nW15cXFxcJ10nQj8vLCAnc3RyaW5nJ10sXG4gICAgICAgICAgICBbLygnKShAZXNjYXBlcykoJykvLCBbJ3N0cmluZycsICdzdHJpbmcuZXNjYXBlJywgJ3N0cmluZyddXSxcbiAgICAgICAgICAgIFsvJy8sICdzdHJpbmcuaW52YWxpZCddXG4gICAgICAgIF0sXG4gICAgICAgIHdoaXRlc3BhY2U6IFtcbiAgICAgICAgICAgIFsvWyBcXHRcXHJcXG5dKy8sICcnXSxcbiAgICAgICAgICAgIFsvXFwoXFwqKD8hXFwpKS8sICdjb21tZW50JywgJ0Bjb21tZW50J10sXG4gICAgICAgICAgICBbL1xcL1xcLy4qJC8sICdjb21tZW50J10sXG4gICAgICAgIF0sXG4gICAgICAgIGNvbW1lbnQ6IFtcbiAgICAgICAgICAgIFsvW15cXCpdKy8sICdjb21tZW50J10sXG4gICAgICAgICAgICBbL1xcKlxcKS8sICdjb21tZW50JywgJ0Bwb3AnXSxcbiAgICAgICAgICAgIFsvXFwqLywgJ2NvbW1lbnQnXVxuICAgICAgICBdLFxuICAgICAgICBzdHJpbmc6IFtcbiAgICAgICAgICAgIFsvW15cXFxcXCJdKy8sICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFsvQGVzY2FwZXMvLCAnc3RyaW5nLmVzY2FwZSddLFxuICAgICAgICAgICAgWy9cXFxcLi8sICdzdHJpbmcuZXNjYXBlLmludmFsaWQnXSxcbiAgICAgICAgICAgIFsvKFwiXCJcInxcIkI/KS8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICckIz09JFMyJzogeyB0b2tlbjogJ3N0cmluZycsIG5leHQ6ICdAcG9wJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogJ3N0cmluZydcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgIF0sXG4gICAgICAgIGxpdHN0cmluZzogW1xuICAgICAgICAgICAgWy9bXlwiXSsvLCAnc3RyaW5nJ10sXG4gICAgICAgICAgICBbL1wiXCIvLCAnc3RyaW5nLmVzY2FwZSddLFxuICAgICAgICAgICAgWy9cIi8sIHsgdG9rZW46ICdzdHJpbmcucXVvdGUnLCBuZXh0OiAnQHBvcCcgfV1cbiAgICAgICAgXSxcbiAgICB9LFxufTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/monaco-editor/esm/vs/basic-languages/fsharp/fsharp.js\n");

/***/ })

}]);