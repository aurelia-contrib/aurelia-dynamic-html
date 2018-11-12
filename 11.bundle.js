(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/pug/pug.js":
/*!**********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/pug/pug.js ***!
  \**********************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"conf\", function() { return conf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"language\", function() { return language; });\n/*---------------------------------------------------------------------------------------------\n *  Copyright (c) Microsoft Corporation. All rights reserved.\n *  Licensed under the MIT License. See License.txt in the project root for license information.\n *--------------------------------------------------------------------------------------------*/\n\nvar conf = {\n    comments: {\n        lineComment: '//'\n    },\n    brackets: [['{', '}'], ['[', ']'], ['(', ')']],\n    autoClosingPairs: [\n        { open: '\"', close: '\"', notIn: ['string', 'comment'] },\n        { open: '\\'', close: '\\'', notIn: ['string', 'comment'] },\n        { open: '{', close: '}', notIn: ['string', 'comment'] },\n        { open: '[', close: ']', notIn: ['string', 'comment'] },\n        { open: '(', close: ')', notIn: ['string', 'comment'] },\n    ],\n    folding: {\n        offSide: true\n    }\n};\nvar language = {\n    defaultToken: '',\n    tokenPostfix: '.pug',\n    ignoreCase: true,\n    brackets: [\n        { token: 'delimiter.curly', open: '{', close: '}' },\n        { token: 'delimiter.array', open: '[', close: ']' },\n        { token: 'delimiter.parenthesis', open: '(', close: ')' }\n    ],\n    keywords: ['append', 'block', 'case', 'default', 'doctype', 'each', 'else', 'extends',\n        'for', 'if', 'in', 'include', 'mixin', 'typeof', 'unless', 'var', 'when'],\n    tags: [\n        'a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio',\n        'b', 'base', 'basefont', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button',\n        'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'command',\n        'datalist', 'dd', 'del', 'details', 'dfn', 'div', 'dl', 'dt',\n        'em', 'embed',\n        'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset',\n        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html',\n        'i', 'iframe', 'img', 'input', 'ins',\n        'keygen', 'kbd',\n        'label', 'li', 'link',\n        'map', 'mark', 'menu', 'meta', 'meter',\n        'nav', 'noframes', 'noscript',\n        'object', 'ol', 'optgroup', 'option', 'output',\n        'p', 'param', 'pre', 'progress',\n        'q',\n        'rp', 'rt', 'ruby',\n        's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup',\n        'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'tracks', 'tt',\n        'u', 'ul',\n        'video',\n        'wbr'\n    ],\n    // we include these common regular expressions\n    symbols: /[\\+\\-\\*\\%\\&\\|\\!\\=\\/\\.\\,\\:]+/,\n    escapes: /\\\\(?:[abfnrtv\\\\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,\n    tokenizer: {\n        root: [\n            // Tag or a keyword at start\n            [/^(\\s*)([a-zA-Z_-][\\w-]*)/,\n                {\n                    cases: {\n                        '$2@tags': {\n                            cases: {\n                                '@eos': ['', 'tag'],\n                                '@default': ['', { token: 'tag', next: '@tag.$1' },]\n                            }\n                        },\n                        '$2@keywords': ['', { token: 'keyword.$2' },],\n                        '@default': ['', '',]\n                    }\n                }\n            ],\n            // id\n            [/^(\\s*)(#[a-zA-Z_-][\\w-]*)/, {\n                    cases: {\n                        '@eos': ['', 'tag.id'],\n                        '@default': ['', { token: 'tag.id', next: '@tag.$1' }]\n                    }\n                }],\n            // class\n            [/^(\\s*)(\\.[a-zA-Z_-][\\w-]*)/, {\n                    cases: {\n                        '@eos': ['', 'tag.class'],\n                        '@default': ['', { token: 'tag.class', next: '@tag.$1' }]\n                    }\n                }],\n            // plain text with pipe\n            [/^(\\s*)(\\|.*)$/, ''],\n            { include: '@whitespace' },\n            // keywords\n            [/[a-zA-Z_$][\\w$]*/, {\n                    cases: {\n                        '@keywords': { token: 'keyword.$0' },\n                        '@default': ''\n                    }\n                }],\n            // delimiters and operators\n            [/[{}()\\[\\]]/, '@brackets'],\n            [/@symbols/, 'delimiter'],\n            // numbers\n            [/\\d+\\.\\d+([eE][\\-+]?\\d+)?/, 'number.float'],\n            [/\\d+/, 'number'],\n            // strings:\n            [/\"/, 'string', '@string.\"'],\n            [/'/, 'string', '@string.\\''],\n        ],\n        tag: [\n            [/(\\.)(\\s*$)/, [{ token: 'delimiter', next: '@blockText.$S2.' }, '']],\n            [/\\s+/, { token: '', next: '@simpleText' }],\n            // id\n            [/#[a-zA-Z_-][\\w-]*/, {\n                    cases: {\n                        '@eos': { token: 'tag.id', next: '@pop' },\n                        '@default': 'tag.id'\n                    }\n                }],\n            // class\n            [/\\.[a-zA-Z_-][\\w-]*/, {\n                    cases: {\n                        '@eos': { token: 'tag.class', next: '@pop' },\n                        '@default': 'tag.class'\n                    }\n                }],\n            // attributes\n            [/\\(/, { token: 'delimiter.parenthesis', next: '@attributeList' }],\n        ],\n        simpleText: [\n            [/[^#]+$/, { token: '', next: '@popall' }],\n            [/[^#]+/, { token: '' }],\n            // interpolation\n            [/(#{)([^}]*)(})/, {\n                    cases: {\n                        '@eos': ['interpolation.delimiter', 'interpolation', { token: 'interpolation.delimiter', next: '@popall' }],\n                        '@default': ['interpolation.delimiter', 'interpolation', 'interpolation.delimiter']\n                    }\n                }],\n            [/#$/, { token: '', next: '@popall' }],\n            [/#/, '']\n        ],\n        attributeList: [\n            [/\\s+/, ''],\n            [/(\\w+)(\\s*=\\s*)(\"|')/, ['attribute.name', 'delimiter', { token: 'attribute.value', next: '@value.$3' }]],\n            [/\\w+/, 'attribute.name'],\n            [/,/, {\n                    cases: {\n                        '@eos': { token: 'attribute.delimiter', next: '@popall' },\n                        '@default': 'attribute.delimiter'\n                    }\n                }],\n            [/\\)$/, { token: 'delimiter.parenthesis', next: '@popall' }],\n            [/\\)/, { token: 'delimiter.parenthesis', next: '@pop' }],\n        ],\n        whitespace: [\n            [/^(\\s*)(\\/\\/.*)$/, { token: 'comment', next: '@blockText.$1.comment' }],\n            [/[ \\t\\r\\n]+/, ''],\n            [/<!--/, { token: 'comment', next: '@comment' }],\n        ],\n        blockText: [\n            [/^\\s+.*$/, {\n                    cases: {\n                        '($S2\\\\s+.*$)': { token: '$S3' },\n                        '@default': { token: '@rematch', next: '@popall' }\n                    }\n                }],\n            [/./, { token: '@rematch', next: '@popall' }]\n        ],\n        comment: [\n            [/[^<\\-]+/, 'comment.content'],\n            [/-->/, { token: 'comment', next: '@pop' }],\n            [/<!--/, 'comment.content.invalid'],\n            [/[<\\-]/, 'comment.content']\n        ],\n        string: [\n            [/[^\\\\\"'#]+/, {\n                    cases: {\n                        '@eos': { token: 'string', next: '@popall' },\n                        '@default': 'string'\n                    }\n                }],\n            [/@escapes/, {\n                    cases: {\n                        '@eos': { token: 'string.escape', next: '@popall' },\n                        '@default': 'string.escape'\n                    }\n                }],\n            [/\\\\./, {\n                    cases: {\n                        '@eos': { token: 'string.escape.invalid', next: '@popall' },\n                        '@default': 'string.escape.invalid'\n                    }\n                }],\n            // interpolation\n            [/(#{)([^}]*)(})/, ['interpolation.delimiter', 'interpolation', 'interpolation.delimiter']],\n            [/#/, 'string'],\n            [/[\"']/, {\n                    cases: {\n                        '$#==$S2': { token: 'string', next: '@pop' },\n                        '@default': { token: 'string' }\n                    }\n                }],\n        ],\n        // Almost identical to above, except for escapes and the output token\n        value: [\n            [/[^\\\\\"']+/, {\n                    cases: {\n                        '@eos': { token: 'attribute.value', next: '@popall' },\n                        '@default': 'attribute.value'\n                    }\n                }],\n            [/\\\\./, {\n                    cases: {\n                        '@eos': { token: 'attribute.value', next: '@popall' },\n                        '@default': 'attribute.value'\n                    }\n                }],\n            [/[\"']/, {\n                    cases: {\n                        '$#==$S2': { token: 'attribute.value', next: '@pop' },\n                        '@default': { token: 'attribute.value' }\n                    }\n                }],\n        ],\n    },\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3B1Zy9wdWcuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3B1Zy9wdWcuanM/MjNlMCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbid1c2Ugc3RyaWN0JztcbmV4cG9ydCB2YXIgY29uZiA9IHtcbiAgICBjb21tZW50czoge1xuICAgICAgICBsaW5lQ29tbWVudDogJy8vJ1xuICAgIH0sXG4gICAgYnJhY2tldHM6IFtbJ3snLCAnfSddLCBbJ1snLCAnXSddLCBbJygnLCAnKSddXSxcbiAgICBhdXRvQ2xvc2luZ1BhaXJzOiBbXG4gICAgICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicsIG5vdEluOiBbJ3N0cmluZycsICdjb21tZW50J10gfSxcbiAgICAgICAgeyBvcGVuOiAnXFwnJywgY2xvc2U6ICdcXCcnLCBub3RJbjogWydzdHJpbmcnLCAnY29tbWVudCddIH0sXG4gICAgICAgIHsgb3BlbjogJ3snLCBjbG9zZTogJ30nLCBub3RJbjogWydzdHJpbmcnLCAnY29tbWVudCddIH0sXG4gICAgICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nLCBub3RJbjogWydzdHJpbmcnLCAnY29tbWVudCddIH0sXG4gICAgICAgIHsgb3BlbjogJygnLCBjbG9zZTogJyknLCBub3RJbjogWydzdHJpbmcnLCAnY29tbWVudCddIH0sXG4gICAgXSxcbiAgICBmb2xkaW5nOiB7XG4gICAgICAgIG9mZlNpZGU6IHRydWVcbiAgICB9XG59O1xuZXhwb3J0IHZhciBsYW5ndWFnZSA9IHtcbiAgICBkZWZhdWx0VG9rZW46ICcnLFxuICAgIHRva2VuUG9zdGZpeDogJy5wdWcnLFxuICAgIGlnbm9yZUNhc2U6IHRydWUsXG4gICAgYnJhY2tldHM6IFtcbiAgICAgICAgeyB0b2tlbjogJ2RlbGltaXRlci5jdXJseScsIG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IHRva2VuOiAnZGVsaW1pdGVyLmFycmF5Jywgb3BlbjogJ1snLCBjbG9zZTogJ10nIH0sXG4gICAgICAgIHsgdG9rZW46ICdkZWxpbWl0ZXIucGFyZW50aGVzaXMnLCBvcGVuOiAnKCcsIGNsb3NlOiAnKScgfVxuICAgIF0sXG4gICAga2V5d29yZHM6IFsnYXBwZW5kJywgJ2Jsb2NrJywgJ2Nhc2UnLCAnZGVmYXVsdCcsICdkb2N0eXBlJywgJ2VhY2gnLCAnZWxzZScsICdleHRlbmRzJyxcbiAgICAgICAgJ2ZvcicsICdpZicsICdpbicsICdpbmNsdWRlJywgJ21peGluJywgJ3R5cGVvZicsICd1bmxlc3MnLCAndmFyJywgJ3doZW4nXSxcbiAgICB0YWdzOiBbXG4gICAgICAgICdhJywgJ2FiYnInLCAnYWNyb255bScsICdhZGRyZXNzJywgJ2FyZWEnLCAnYXJ0aWNsZScsICdhc2lkZScsICdhdWRpbycsXG4gICAgICAgICdiJywgJ2Jhc2UnLCAnYmFzZWZvbnQnLCAnYmRpJywgJ2JkbycsICdibG9ja3F1b3RlJywgJ2JvZHknLCAnYnInLCAnYnV0dG9uJyxcbiAgICAgICAgJ2NhbnZhcycsICdjYXB0aW9uJywgJ2NlbnRlcicsICdjaXRlJywgJ2NvZGUnLCAnY29sJywgJ2NvbGdyb3VwJywgJ2NvbW1hbmQnLFxuICAgICAgICAnZGF0YWxpc3QnLCAnZGQnLCAnZGVsJywgJ2RldGFpbHMnLCAnZGZuJywgJ2RpdicsICdkbCcsICdkdCcsXG4gICAgICAgICdlbScsICdlbWJlZCcsXG4gICAgICAgICdmaWVsZHNldCcsICdmaWdjYXB0aW9uJywgJ2ZpZ3VyZScsICdmb250JywgJ2Zvb3RlcicsICdmb3JtJywgJ2ZyYW1lJywgJ2ZyYW1lc2V0JyxcbiAgICAgICAgJ2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2JywgJ2hlYWQnLCAnaGVhZGVyJywgJ2hncm91cCcsICdocicsICdodG1sJyxcbiAgICAgICAgJ2knLCAnaWZyYW1lJywgJ2ltZycsICdpbnB1dCcsICdpbnMnLFxuICAgICAgICAna2V5Z2VuJywgJ2tiZCcsXG4gICAgICAgICdsYWJlbCcsICdsaScsICdsaW5rJyxcbiAgICAgICAgJ21hcCcsICdtYXJrJywgJ21lbnUnLCAnbWV0YScsICdtZXRlcicsXG4gICAgICAgICduYXYnLCAnbm9mcmFtZXMnLCAnbm9zY3JpcHQnLFxuICAgICAgICAnb2JqZWN0JywgJ29sJywgJ29wdGdyb3VwJywgJ29wdGlvbicsICdvdXRwdXQnLFxuICAgICAgICAncCcsICdwYXJhbScsICdwcmUnLCAncHJvZ3Jlc3MnLFxuICAgICAgICAncScsXG4gICAgICAgICdycCcsICdydCcsICdydWJ5JyxcbiAgICAgICAgJ3MnLCAnc2FtcCcsICdzY3JpcHQnLCAnc2VjdGlvbicsICdzZWxlY3QnLCAnc21hbGwnLCAnc291cmNlJywgJ3NwYW4nLCAnc3RyaWtlJywgJ3N0cm9uZycsICdzdHlsZScsICdzdWInLCAnc3VtbWFyeScsICdzdXAnLFxuICAgICAgICAndGFibGUnLCAndGJvZHknLCAndGQnLCAndGV4dGFyZWEnLCAndGZvb3QnLCAndGgnLCAndGhlYWQnLCAndGltZScsICd0aXRsZScsICd0cicsICd0cmFja3MnLCAndHQnLFxuICAgICAgICAndScsICd1bCcsXG4gICAgICAgICd2aWRlbycsXG4gICAgICAgICd3YnInXG4gICAgXSxcbiAgICAvLyB3ZSBpbmNsdWRlIHRoZXNlIGNvbW1vbiByZWd1bGFyIGV4cHJlc3Npb25zXG4gICAgc3ltYm9sczogL1tcXCtcXC1cXCpcXCVcXCZcXHxcXCFcXD1cXC9cXC5cXCxcXDpdKy8sXG4gICAgZXNjYXBlczogL1xcXFwoPzpbYWJmbnJ0dlxcXFxcIiddfHhbMC05QS1GYS1mXXsxLDR9fHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pLyxcbiAgICB0b2tlbml6ZXI6IHtcbiAgICAgICAgcm9vdDogW1xuICAgICAgICAgICAgLy8gVGFnIG9yIGEga2V5d29yZCBhdCBzdGFydFxuICAgICAgICAgICAgWy9eKFxccyopKFthLXpBLVpfLV1bXFx3LV0qKS8sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJyQyQHRhZ3MnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0Blb3MnOiBbJycsICd0YWcnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogWycnLCB7IHRva2VuOiAndGFnJywgbmV4dDogJ0B0YWcuJDEnIH0sXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnJDJAa2V5d29yZHMnOiBbJycsIHsgdG9rZW46ICdrZXl3b3JkLiQyJyB9LF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiBbJycsICcnLF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAvLyBpZFxuICAgICAgICAgICAgWy9eKFxccyopKCNbYS16QS1aXy1dW1xcdy1dKikvLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQGVvcyc6IFsnJywgJ3RhZy5pZCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogWycnLCB7IHRva2VuOiAndGFnLmlkJywgbmV4dDogJ0B0YWcuJDEnIH1dXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIC8vIGNsYXNzXG4gICAgICAgICAgICBbL14oXFxzKikoXFwuW2EtekEtWl8tXVtcXHctXSopLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0Blb3MnOiBbJycsICd0YWcuY2xhc3MnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6IFsnJywgeyB0b2tlbjogJ3RhZy5jbGFzcycsIG5leHQ6ICdAdGFnLiQxJyB9XVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAvLyBwbGFpbiB0ZXh0IHdpdGggcGlwZVxuICAgICAgICAgICAgWy9eKFxccyopKFxcfC4qKSQvLCAnJ10sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAd2hpdGVzcGFjZScgfSxcbiAgICAgICAgICAgIC8vIGtleXdvcmRzXG4gICAgICAgICAgICBbL1thLXpBLVpfJF1bXFx3JF0qLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0BrZXl3b3Jkcyc6IHsgdG9rZW46ICdrZXl3b3JkLiQwJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogJydcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgLy8gZGVsaW1pdGVycyBhbmQgb3BlcmF0b3JzXG4gICAgICAgICAgICBbL1t7fSgpXFxbXFxdXS8sICdAYnJhY2tldHMnXSxcbiAgICAgICAgICAgIFsvQHN5bWJvbHMvLCAnZGVsaW1pdGVyJ10sXG4gICAgICAgICAgICAvLyBudW1iZXJzXG4gICAgICAgICAgICBbL1xcZCtcXC5cXGQrKFtlRV1bXFwtK10/XFxkKyk/LywgJ251bWJlci5mbG9hdCddLFxuICAgICAgICAgICAgWy9cXGQrLywgJ251bWJlciddLFxuICAgICAgICAgICAgLy8gc3RyaW5nczpcbiAgICAgICAgICAgIFsvXCIvLCAnc3RyaW5nJywgJ0BzdHJpbmcuXCInXSxcbiAgICAgICAgICAgIFsvJy8sICdzdHJpbmcnLCAnQHN0cmluZy5cXCcnXSxcbiAgICAgICAgXSxcbiAgICAgICAgdGFnOiBbXG4gICAgICAgICAgICBbLyhcXC4pKFxccyokKS8sIFt7IHRva2VuOiAnZGVsaW1pdGVyJywgbmV4dDogJ0BibG9ja1RleHQuJFMyLicgfSwgJyddXSxcbiAgICAgICAgICAgIFsvXFxzKy8sIHsgdG9rZW46ICcnLCBuZXh0OiAnQHNpbXBsZVRleHQnIH1dLFxuICAgICAgICAgICAgLy8gaWRcbiAgICAgICAgICAgIFsvI1thLXpBLVpfLV1bXFx3LV0qLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0Blb3MnOiB7IHRva2VuOiAndGFnLmlkJywgbmV4dDogJ0Bwb3AnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAndGFnLmlkJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAvLyBjbGFzc1xuICAgICAgICAgICAgWy9cXC5bYS16QS1aXy1dW1xcdy1dKi8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZW9zJzogeyB0b2tlbjogJ3RhZy5jbGFzcycsIG5leHQ6ICdAcG9wJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogJ3RhZy5jbGFzcydcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgLy8gYXR0cmlidXRlc1xuICAgICAgICAgICAgWy9cXCgvLCB7IHRva2VuOiAnZGVsaW1pdGVyLnBhcmVudGhlc2lzJywgbmV4dDogJ0BhdHRyaWJ1dGVMaXN0JyB9XSxcbiAgICAgICAgXSxcbiAgICAgICAgc2ltcGxlVGV4dDogW1xuICAgICAgICAgICAgWy9bXiNdKyQvLCB7IHRva2VuOiAnJywgbmV4dDogJ0Bwb3BhbGwnIH1dLFxuICAgICAgICAgICAgWy9bXiNdKy8sIHsgdG9rZW46ICcnIH1dLFxuICAgICAgICAgICAgLy8gaW50ZXJwb2xhdGlvblxuICAgICAgICAgICAgWy8oI3spKFtefV0qKSh9KS8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZW9zJzogWydpbnRlcnBvbGF0aW9uLmRlbGltaXRlcicsICdpbnRlcnBvbGF0aW9uJywgeyB0b2tlbjogJ2ludGVycG9sYXRpb24uZGVsaW1pdGVyJywgbmV4dDogJ0Bwb3BhbGwnIH1dLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogWydpbnRlcnBvbGF0aW9uLmRlbGltaXRlcicsICdpbnRlcnBvbGF0aW9uJywgJ2ludGVycG9sYXRpb24uZGVsaW1pdGVyJ11cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgWy8jJC8sIHsgdG9rZW46ICcnLCBuZXh0OiAnQHBvcGFsbCcgfV0sXG4gICAgICAgICAgICBbLyMvLCAnJ11cbiAgICAgICAgXSxcbiAgICAgICAgYXR0cmlidXRlTGlzdDogW1xuICAgICAgICAgICAgWy9cXHMrLywgJyddLFxuICAgICAgICAgICAgWy8oXFx3KykoXFxzKj1cXHMqKShcInwnKS8sIFsnYXR0cmlidXRlLm5hbWUnLCAnZGVsaW1pdGVyJywgeyB0b2tlbjogJ2F0dHJpYnV0ZS52YWx1ZScsIG5leHQ6ICdAdmFsdWUuJDMnIH1dXSxcbiAgICAgICAgICAgIFsvXFx3Ky8sICdhdHRyaWJ1dGUubmFtZSddLFxuICAgICAgICAgICAgWy8sLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0Blb3MnOiB7IHRva2VuOiAnYXR0cmlidXRlLmRlbGltaXRlcicsIG5leHQ6ICdAcG9wYWxsJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogJ2F0dHJpYnV0ZS5kZWxpbWl0ZXInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIFsvXFwpJC8sIHsgdG9rZW46ICdkZWxpbWl0ZXIucGFyZW50aGVzaXMnLCBuZXh0OiAnQHBvcGFsbCcgfV0sXG4gICAgICAgICAgICBbL1xcKS8sIHsgdG9rZW46ICdkZWxpbWl0ZXIucGFyZW50aGVzaXMnLCBuZXh0OiAnQHBvcCcgfV0sXG4gICAgICAgIF0sXG4gICAgICAgIHdoaXRlc3BhY2U6IFtcbiAgICAgICAgICAgIFsvXihcXHMqKShcXC9cXC8uKikkLywgeyB0b2tlbjogJ2NvbW1lbnQnLCBuZXh0OiAnQGJsb2NrVGV4dC4kMS5jb21tZW50JyB9XSxcbiAgICAgICAgICAgIFsvWyBcXHRcXHJcXG5dKy8sICcnXSxcbiAgICAgICAgICAgIFsvPCEtLS8sIHsgdG9rZW46ICdjb21tZW50JywgbmV4dDogJ0Bjb21tZW50JyB9XSxcbiAgICAgICAgXSxcbiAgICAgICAgYmxvY2tUZXh0OiBbXG4gICAgICAgICAgICBbL15cXHMrLiokLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJygkUzJcXFxccysuKiQpJzogeyB0b2tlbjogJyRTMycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6IHsgdG9rZW46ICdAcmVtYXRjaCcsIG5leHQ6ICdAcG9wYWxsJyB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIFsvLi8sIHsgdG9rZW46ICdAcmVtYXRjaCcsIG5leHQ6ICdAcG9wYWxsJyB9XVxuICAgICAgICBdLFxuICAgICAgICBjb21tZW50OiBbXG4gICAgICAgICAgICBbL1tePFxcLV0rLywgJ2NvbW1lbnQuY29udGVudCddLFxuICAgICAgICAgICAgWy8tLT4vLCB7IHRva2VuOiAnY29tbWVudCcsIG5leHQ6ICdAcG9wJyB9XSxcbiAgICAgICAgICAgIFsvPCEtLS8sICdjb21tZW50LmNvbnRlbnQuaW52YWxpZCddLFxuICAgICAgICAgICAgWy9bPFxcLV0vLCAnY29tbWVudC5jb250ZW50J11cbiAgICAgICAgXSxcbiAgICAgICAgc3RyaW5nOiBbXG4gICAgICAgICAgICBbL1teXFxcXFwiJyNdKy8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZW9zJzogeyB0b2tlbjogJ3N0cmluZycsIG5leHQ6ICdAcG9wYWxsJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogJ3N0cmluZydcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgWy9AZXNjYXBlcy8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZW9zJzogeyB0b2tlbjogJ3N0cmluZy5lc2NhcGUnLCBuZXh0OiAnQHBvcGFsbCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdzdHJpbmcuZXNjYXBlJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBbL1xcXFwuLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0Blb3MnOiB7IHRva2VuOiAnc3RyaW5nLmVzY2FwZS5pbnZhbGlkJywgbmV4dDogJ0Bwb3BhbGwnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnc3RyaW5nLmVzY2FwZS5pbnZhbGlkJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAvLyBpbnRlcnBvbGF0aW9uXG4gICAgICAgICAgICBbLygjeykoW159XSopKH0pLywgWydpbnRlcnBvbGF0aW9uLmRlbGltaXRlcicsICdpbnRlcnBvbGF0aW9uJywgJ2ludGVycG9sYXRpb24uZGVsaW1pdGVyJ11dLFxuICAgICAgICAgICAgWy8jLywgJ3N0cmluZyddLFxuICAgICAgICAgICAgWy9bXCInXS8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICckIz09JFMyJzogeyB0b2tlbjogJ3N0cmluZycsIG5leHQ6ICdAcG9wJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogeyB0b2tlbjogJ3N0cmluZycgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgIF0sXG4gICAgICAgIC8vIEFsbW9zdCBpZGVudGljYWwgdG8gYWJvdmUsIGV4Y2VwdCBmb3IgZXNjYXBlcyBhbmQgdGhlIG91dHB1dCB0b2tlblxuICAgICAgICB2YWx1ZTogW1xuICAgICAgICAgICAgWy9bXlxcXFxcIiddKy8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZW9zJzogeyB0b2tlbjogJ2F0dHJpYnV0ZS52YWx1ZScsIG5leHQ6ICdAcG9wYWxsJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogJ2F0dHJpYnV0ZS52YWx1ZSdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgWy9cXFxcLi8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZW9zJzogeyB0b2tlbjogJ2F0dHJpYnV0ZS52YWx1ZScsIG5leHQ6ICdAcG9wYWxsJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogJ2F0dHJpYnV0ZS52YWx1ZSdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgWy9bXCInXS8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICckIz09JFMyJzogeyB0b2tlbjogJ2F0dHJpYnV0ZS52YWx1ZScsIG5leHQ6ICdAcG9wJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogeyB0b2tlbjogJ2F0dHJpYnV0ZS52YWx1ZScgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgIF0sXG4gICAgfSxcbn07XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/monaco-editor/esm/vs/basic-languages/pug/pug.js\n");

/***/ })

}]);