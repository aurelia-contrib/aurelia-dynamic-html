(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[26],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/cpp/cpp.js":
/*!**********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/cpp/cpp.js ***!
  \**********************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"conf\", function() { return conf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"language\", function() { return language; });\n/*---------------------------------------------------------------------------------------------\n *  Copyright (c) Microsoft Corporation. All rights reserved.\n *  Licensed under the MIT License. See License.txt in the project root for license information.\n *--------------------------------------------------------------------------------------------*/\n\nvar conf = {\n    comments: {\n        lineComment: '//',\n        blockComment: ['/*', '*/'],\n    },\n    brackets: [\n        ['{', '}'],\n        ['[', ']'],\n        ['(', ')']\n    ],\n    autoClosingPairs: [\n        { open: '[', close: ']' },\n        { open: '{', close: '}' },\n        { open: '(', close: ')' },\n        { open: '\\'', close: '\\'', notIn: ['string', 'comment'] },\n        { open: '\"', close: '\"', notIn: ['string'] },\n    ],\n    surroundingPairs: [\n        { open: '{', close: '}' },\n        { open: '[', close: ']' },\n        { open: '(', close: ')' },\n        { open: '\"', close: '\"' },\n        { open: '\\'', close: '\\'' },\n    ],\n    folding: {\n        markers: {\n            start: new RegExp(\"^\\\\s*#pragma\\\\s+region\\\\b\"),\n            end: new RegExp(\"^\\\\s*#pragma\\\\s+endregion\\\\b\")\n        }\n    }\n};\nvar language = {\n    defaultToken: '',\n    tokenPostfix: '.cpp',\n    brackets: [\n        { token: 'delimiter.curly', open: '{', close: '}' },\n        { token: 'delimiter.parenthesis', open: '(', close: ')' },\n        { token: 'delimiter.square', open: '[', close: ']' },\n        { token: 'delimiter.angle', open: '<', close: '>' }\n    ],\n    keywords: [\n        'abstract',\n        'amp',\n        'array',\n        'auto',\n        'bool',\n        'break',\n        'case',\n        'catch',\n        'char',\n        'class',\n        'const',\n        'constexpr',\n        'const_cast',\n        'continue',\n        'cpu',\n        'decltype',\n        'default',\n        'delegate',\n        'delete',\n        'do',\n        'double',\n        'dynamic_cast',\n        'each',\n        'else',\n        'enum',\n        'event',\n        'explicit',\n        'export',\n        'extern',\n        'false',\n        'final',\n        'finally',\n        'float',\n        'for',\n        'friend',\n        'gcnew',\n        'generic',\n        'goto',\n        'if',\n        'in',\n        'initonly',\n        'inline',\n        'int',\n        'interface',\n        'interior_ptr',\n        'internal',\n        'literal',\n        'long',\n        'mutable',\n        'namespace',\n        'new',\n        'noexcept',\n        'nullptr',\n        '__nullptr',\n        'operator',\n        'override',\n        'partial',\n        'pascal',\n        'pin_ptr',\n        'private',\n        'property',\n        'protected',\n        'public',\n        'ref',\n        'register',\n        'reinterpret_cast',\n        'restrict',\n        'return',\n        'safe_cast',\n        'sealed',\n        'short',\n        'signed',\n        'sizeof',\n        'static',\n        'static_assert',\n        'static_cast',\n        'struct',\n        'switch',\n        'template',\n        'this',\n        'thread_local',\n        'throw',\n        'tile_static',\n        'true',\n        'try',\n        'typedef',\n        'typeid',\n        'typename',\n        'union',\n        'unsigned',\n        'using',\n        'virtual',\n        'void',\n        'volatile',\n        'wchar_t',\n        'where',\n        'while',\n        '_asm',\n        '_based',\n        '_cdecl',\n        '_declspec',\n        '_fastcall',\n        '_if_exists',\n        '_if_not_exists',\n        '_inline',\n        '_multiple_inheritance',\n        '_pascal',\n        '_single_inheritance',\n        '_stdcall',\n        '_virtual_inheritance',\n        '_w64',\n        '__abstract',\n        '__alignof',\n        '__asm',\n        '__assume',\n        '__based',\n        '__box',\n        '__builtin_alignof',\n        '__cdecl',\n        '__clrcall',\n        '__declspec',\n        '__delegate',\n        '__event',\n        '__except',\n        '__fastcall',\n        '__finally',\n        '__forceinline',\n        '__gc',\n        '__hook',\n        '__identifier',\n        '__if_exists',\n        '__if_not_exists',\n        '__inline',\n        '__int128',\n        '__int16',\n        '__int32',\n        '__int64',\n        '__int8',\n        '__interface',\n        '__leave',\n        '__m128',\n        '__m128d',\n        '__m128i',\n        '__m256',\n        '__m256d',\n        '__m256i',\n        '__m64',\n        '__multiple_inheritance',\n        '__newslot',\n        '__nogc',\n        '__noop',\n        '__nounwind',\n        '__novtordisp',\n        '__pascal',\n        '__pin',\n        '__pragma',\n        '__property',\n        '__ptr32',\n        '__ptr64',\n        '__raise',\n        '__restrict',\n        '__resume',\n        '__sealed',\n        '__single_inheritance',\n        '__stdcall',\n        '__super',\n        '__thiscall',\n        '__try',\n        '__try_cast',\n        '__typeof',\n        '__unaligned',\n        '__unhook',\n        '__uuidof',\n        '__value',\n        '__virtual_inheritance',\n        '__w64',\n        '__wchar_t'\n    ],\n    operators: [\n        '=', '>', '<', '!', '~', '?', ':',\n        '==', '<=', '>=', '!=', '&&', '||', '++', '--',\n        '+', '-', '*', '/', '&', '|', '^', '%', '<<',\n        '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=',\n        '^=', '%=', '<<=', '>>=', '>>>='\n    ],\n    // we include these common regular expressions\n    symbols: /[=><!~?:&|+\\-*\\/\\^%]+/,\n    escapes: /\\\\(?:[abfnrtv\\\\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,\n    integersuffix: /(ll|LL|u|U|l|L)?(ll|LL|u|U|l|L)?/,\n    floatsuffix: /[fFlL]?/,\n    encoding: /u|u8|U|L/,\n    // The main tokenizer for our languages\n    tokenizer: {\n        root: [\n            // C++ 11 Raw String\n            [/@encoding?R\\\"(?:([^ ()\\\\\\t]*))\\(/, { token: 'string.raw.begin', next: '@raw.$1' }],\n            // identifiers and keywords\n            [/[a-zA-Z_]\\w*/, {\n                    cases: {\n                        '@keywords': { token: 'keyword.$0' },\n                        '@default': 'identifier'\n                    }\n                }],\n            // whitespace\n            { include: '@whitespace' },\n            // [[ attributes ]].\n            [/\\[\\[.*\\]\\]/, 'annotation'],\n            // Preprocessor directive\n            [/^\\s*#\\s*\\w+/, 'keyword'],\n            // delimiters and operators\n            [/[{}()\\[\\]]/, '@brackets'],\n            [/[<>](?!@symbols)/, '@brackets'],\n            [/@symbols/, {\n                    cases: {\n                        '@operators': 'delimiter',\n                        '@default': ''\n                    }\n                }],\n            // numbers\n            [/\\d*\\d+[eE]([\\-+]?\\d+)?(@floatsuffix)/, 'number.float'],\n            [/\\d*\\.\\d+([eE][\\-+]?\\d+)?(@floatsuffix)/, 'number.float'],\n            [/0[xX][0-9a-fA-F']*[0-9a-fA-F](@integersuffix)/, 'number.hex'],\n            [/0[0-7']*[0-7](@integersuffix)/, 'number.octal'],\n            [/0[bB][0-1']*[0-1](@integersuffix)/, 'number.binary'],\n            [/\\d[\\d']*\\d(@integersuffix)/, 'number'],\n            [/\\d(@integersuffix)/, 'number'],\n            // delimiter: after number because of .\\d floats\n            [/[;,.]/, 'delimiter'],\n            // strings\n            [/\"([^\"\\\\]|\\\\.)*$/, 'string.invalid'],\n            [/\"/, 'string', '@string'],\n            // characters\n            [/'[^\\\\']'/, 'string'],\n            [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],\n            [/'/, 'string.invalid']\n        ],\n        whitespace: [\n            [/[ \\t\\r\\n]+/, ''],\n            [/\\/\\*\\*(?!\\/)/, 'comment.doc', '@doccomment'],\n            [/\\/\\*/, 'comment', '@comment'],\n            [/\\/\\/.*$/, 'comment'],\n        ],\n        comment: [\n            [/[^\\/*]+/, 'comment'],\n            [/\\*\\//, 'comment', '@pop'],\n            [/[\\/*]/, 'comment']\n        ],\n        //Identical copy of comment above, except for the addition of .doc\n        doccomment: [\n            [/[^\\/*]+/, 'comment.doc'],\n            [/\\*\\//, 'comment.doc', '@pop'],\n            [/[\\/*]/, 'comment.doc']\n        ],\n        string: [\n            [/[^\\\\\"]+/, 'string'],\n            [/@escapes/, 'string.escape'],\n            [/\\\\./, 'string.escape.invalid'],\n            [/\"/, 'string', '@pop']\n        ],\n        raw: [\n            [/(.*)(\\))(?:([^ ()\\\\\\t]*))(\\\")/, {\n                    cases: {\n                        '$3==$S2': ['string.raw', 'string.raw.end', 'string.raw.end', { token: 'string.raw.end', next: '@pop' }],\n                        '@default': ['string.raw', 'string.raw', 'string.raw', 'string.raw']\n                    }\n                }\n            ],\n            [/.*/, 'string.raw']\n        ]\n    },\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL2NwcC9jcHAuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL2NwcC9jcHAuanM/N2UxYyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbid1c2Ugc3RyaWN0JztcbmV4cG9ydCB2YXIgY29uZiA9IHtcbiAgICBjb21tZW50czoge1xuICAgICAgICBsaW5lQ29tbWVudDogJy8vJyxcbiAgICAgICAgYmxvY2tDb21tZW50OiBbJy8qJywgJyovJ10sXG4gICAgfSxcbiAgICBicmFja2V0czogW1xuICAgICAgICBbJ3snLCAnfSddLFxuICAgICAgICBbJ1snLCAnXSddLFxuICAgICAgICBbJygnLCAnKSddXG4gICAgXSxcbiAgICBhdXRvQ2xvc2luZ1BhaXJzOiBbXG4gICAgICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nIH0sXG4gICAgICAgIHsgb3BlbjogJ3snLCBjbG9zZTogJ30nIH0sXG4gICAgICAgIHsgb3BlbjogJygnLCBjbG9zZTogJyknIH0sXG4gICAgICAgIHsgb3BlbjogJ1xcJycsIGNsb3NlOiAnXFwnJywgbm90SW46IFsnc3RyaW5nJywgJ2NvbW1lbnQnXSB9LFxuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInLCBub3RJbjogWydzdHJpbmcnXSB9LFxuICAgIF0sXG4gICAgc3Vycm91bmRpbmdQYWlyczogW1xuICAgICAgICB7IG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IG9wZW46ICdbJywgY2xvc2U6ICddJyB9LFxuICAgICAgICB7IG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgICAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH0sXG4gICAgICAgIHsgb3BlbjogJ1xcJycsIGNsb3NlOiAnXFwnJyB9LFxuICAgIF0sXG4gICAgZm9sZGluZzoge1xuICAgICAgICBtYXJrZXJzOiB7XG4gICAgICAgICAgICBzdGFydDogbmV3IFJlZ0V4cChcIl5cXFxccyojcHJhZ21hXFxcXHMrcmVnaW9uXFxcXGJcIiksXG4gICAgICAgICAgICBlbmQ6IG5ldyBSZWdFeHAoXCJeXFxcXHMqI3ByYWdtYVxcXFxzK2VuZHJlZ2lvblxcXFxiXCIpXG4gICAgICAgIH1cbiAgICB9XG59O1xuZXhwb3J0IHZhciBsYW5ndWFnZSA9IHtcbiAgICBkZWZhdWx0VG9rZW46ICcnLFxuICAgIHRva2VuUG9zdGZpeDogJy5jcHAnLFxuICAgIGJyYWNrZXRzOiBbXG4gICAgICAgIHsgdG9rZW46ICdkZWxpbWl0ZXIuY3VybHknLCBvcGVuOiAneycsIGNsb3NlOiAnfScgfSxcbiAgICAgICAgeyB0b2tlbjogJ2RlbGltaXRlci5wYXJlbnRoZXNpcycsIG9wZW46ICcoJywgY2xvc2U6ICcpJyB9LFxuICAgICAgICB7IHRva2VuOiAnZGVsaW1pdGVyLnNxdWFyZScsIG9wZW46ICdbJywgY2xvc2U6ICddJyB9LFxuICAgICAgICB7IHRva2VuOiAnZGVsaW1pdGVyLmFuZ2xlJywgb3BlbjogJzwnLCBjbG9zZTogJz4nIH1cbiAgICBdLFxuICAgIGtleXdvcmRzOiBbXG4gICAgICAgICdhYnN0cmFjdCcsXG4gICAgICAgICdhbXAnLFxuICAgICAgICAnYXJyYXknLFxuICAgICAgICAnYXV0bycsXG4gICAgICAgICdib29sJyxcbiAgICAgICAgJ2JyZWFrJyxcbiAgICAgICAgJ2Nhc2UnLFxuICAgICAgICAnY2F0Y2gnLFxuICAgICAgICAnY2hhcicsXG4gICAgICAgICdjbGFzcycsXG4gICAgICAgICdjb25zdCcsXG4gICAgICAgICdjb25zdGV4cHInLFxuICAgICAgICAnY29uc3RfY2FzdCcsXG4gICAgICAgICdjb250aW51ZScsXG4gICAgICAgICdjcHUnLFxuICAgICAgICAnZGVjbHR5cGUnLFxuICAgICAgICAnZGVmYXVsdCcsXG4gICAgICAgICdkZWxlZ2F0ZScsXG4gICAgICAgICdkZWxldGUnLFxuICAgICAgICAnZG8nLFxuICAgICAgICAnZG91YmxlJyxcbiAgICAgICAgJ2R5bmFtaWNfY2FzdCcsXG4gICAgICAgICdlYWNoJyxcbiAgICAgICAgJ2Vsc2UnLFxuICAgICAgICAnZW51bScsXG4gICAgICAgICdldmVudCcsXG4gICAgICAgICdleHBsaWNpdCcsXG4gICAgICAgICdleHBvcnQnLFxuICAgICAgICAnZXh0ZXJuJyxcbiAgICAgICAgJ2ZhbHNlJyxcbiAgICAgICAgJ2ZpbmFsJyxcbiAgICAgICAgJ2ZpbmFsbHknLFxuICAgICAgICAnZmxvYXQnLFxuICAgICAgICAnZm9yJyxcbiAgICAgICAgJ2ZyaWVuZCcsXG4gICAgICAgICdnY25ldycsXG4gICAgICAgICdnZW5lcmljJyxcbiAgICAgICAgJ2dvdG8nLFxuICAgICAgICAnaWYnLFxuICAgICAgICAnaW4nLFxuICAgICAgICAnaW5pdG9ubHknLFxuICAgICAgICAnaW5saW5lJyxcbiAgICAgICAgJ2ludCcsXG4gICAgICAgICdpbnRlcmZhY2UnLFxuICAgICAgICAnaW50ZXJpb3JfcHRyJyxcbiAgICAgICAgJ2ludGVybmFsJyxcbiAgICAgICAgJ2xpdGVyYWwnLFxuICAgICAgICAnbG9uZycsXG4gICAgICAgICdtdXRhYmxlJyxcbiAgICAgICAgJ25hbWVzcGFjZScsXG4gICAgICAgICduZXcnLFxuICAgICAgICAnbm9leGNlcHQnLFxuICAgICAgICAnbnVsbHB0cicsXG4gICAgICAgICdfX251bGxwdHInLFxuICAgICAgICAnb3BlcmF0b3InLFxuICAgICAgICAnb3ZlcnJpZGUnLFxuICAgICAgICAncGFydGlhbCcsXG4gICAgICAgICdwYXNjYWwnLFxuICAgICAgICAncGluX3B0cicsXG4gICAgICAgICdwcml2YXRlJyxcbiAgICAgICAgJ3Byb3BlcnR5JyxcbiAgICAgICAgJ3Byb3RlY3RlZCcsXG4gICAgICAgICdwdWJsaWMnLFxuICAgICAgICAncmVmJyxcbiAgICAgICAgJ3JlZ2lzdGVyJyxcbiAgICAgICAgJ3JlaW50ZXJwcmV0X2Nhc3QnLFxuICAgICAgICAncmVzdHJpY3QnLFxuICAgICAgICAncmV0dXJuJyxcbiAgICAgICAgJ3NhZmVfY2FzdCcsXG4gICAgICAgICdzZWFsZWQnLFxuICAgICAgICAnc2hvcnQnLFxuICAgICAgICAnc2lnbmVkJyxcbiAgICAgICAgJ3NpemVvZicsXG4gICAgICAgICdzdGF0aWMnLFxuICAgICAgICAnc3RhdGljX2Fzc2VydCcsXG4gICAgICAgICdzdGF0aWNfY2FzdCcsXG4gICAgICAgICdzdHJ1Y3QnLFxuICAgICAgICAnc3dpdGNoJyxcbiAgICAgICAgJ3RlbXBsYXRlJyxcbiAgICAgICAgJ3RoaXMnLFxuICAgICAgICAndGhyZWFkX2xvY2FsJyxcbiAgICAgICAgJ3Rocm93JyxcbiAgICAgICAgJ3RpbGVfc3RhdGljJyxcbiAgICAgICAgJ3RydWUnLFxuICAgICAgICAndHJ5JyxcbiAgICAgICAgJ3R5cGVkZWYnLFxuICAgICAgICAndHlwZWlkJyxcbiAgICAgICAgJ3R5cGVuYW1lJyxcbiAgICAgICAgJ3VuaW9uJyxcbiAgICAgICAgJ3Vuc2lnbmVkJyxcbiAgICAgICAgJ3VzaW5nJyxcbiAgICAgICAgJ3ZpcnR1YWwnLFxuICAgICAgICAndm9pZCcsXG4gICAgICAgICd2b2xhdGlsZScsXG4gICAgICAgICd3Y2hhcl90JyxcbiAgICAgICAgJ3doZXJlJyxcbiAgICAgICAgJ3doaWxlJyxcbiAgICAgICAgJ19hc20nLFxuICAgICAgICAnX2Jhc2VkJyxcbiAgICAgICAgJ19jZGVjbCcsXG4gICAgICAgICdfZGVjbHNwZWMnLFxuICAgICAgICAnX2Zhc3RjYWxsJyxcbiAgICAgICAgJ19pZl9leGlzdHMnLFxuICAgICAgICAnX2lmX25vdF9leGlzdHMnLFxuICAgICAgICAnX2lubGluZScsXG4gICAgICAgICdfbXVsdGlwbGVfaW5oZXJpdGFuY2UnLFxuICAgICAgICAnX3Bhc2NhbCcsXG4gICAgICAgICdfc2luZ2xlX2luaGVyaXRhbmNlJyxcbiAgICAgICAgJ19zdGRjYWxsJyxcbiAgICAgICAgJ192aXJ0dWFsX2luaGVyaXRhbmNlJyxcbiAgICAgICAgJ193NjQnLFxuICAgICAgICAnX19hYnN0cmFjdCcsXG4gICAgICAgICdfX2FsaWdub2YnLFxuICAgICAgICAnX19hc20nLFxuICAgICAgICAnX19hc3N1bWUnLFxuICAgICAgICAnX19iYXNlZCcsXG4gICAgICAgICdfX2JveCcsXG4gICAgICAgICdfX2J1aWx0aW5fYWxpZ25vZicsXG4gICAgICAgICdfX2NkZWNsJyxcbiAgICAgICAgJ19fY2xyY2FsbCcsXG4gICAgICAgICdfX2RlY2xzcGVjJyxcbiAgICAgICAgJ19fZGVsZWdhdGUnLFxuICAgICAgICAnX19ldmVudCcsXG4gICAgICAgICdfX2V4Y2VwdCcsXG4gICAgICAgICdfX2Zhc3RjYWxsJyxcbiAgICAgICAgJ19fZmluYWxseScsXG4gICAgICAgICdfX2ZvcmNlaW5saW5lJyxcbiAgICAgICAgJ19fZ2MnLFxuICAgICAgICAnX19ob29rJyxcbiAgICAgICAgJ19faWRlbnRpZmllcicsXG4gICAgICAgICdfX2lmX2V4aXN0cycsXG4gICAgICAgICdfX2lmX25vdF9leGlzdHMnLFxuICAgICAgICAnX19pbmxpbmUnLFxuICAgICAgICAnX19pbnQxMjgnLFxuICAgICAgICAnX19pbnQxNicsXG4gICAgICAgICdfX2ludDMyJyxcbiAgICAgICAgJ19faW50NjQnLFxuICAgICAgICAnX19pbnQ4JyxcbiAgICAgICAgJ19faW50ZXJmYWNlJyxcbiAgICAgICAgJ19fbGVhdmUnLFxuICAgICAgICAnX19tMTI4JyxcbiAgICAgICAgJ19fbTEyOGQnLFxuICAgICAgICAnX19tMTI4aScsXG4gICAgICAgICdfX20yNTYnLFxuICAgICAgICAnX19tMjU2ZCcsXG4gICAgICAgICdfX20yNTZpJyxcbiAgICAgICAgJ19fbTY0JyxcbiAgICAgICAgJ19fbXVsdGlwbGVfaW5oZXJpdGFuY2UnLFxuICAgICAgICAnX19uZXdzbG90JyxcbiAgICAgICAgJ19fbm9nYycsXG4gICAgICAgICdfX25vb3AnLFxuICAgICAgICAnX19ub3Vud2luZCcsXG4gICAgICAgICdfX25vdnRvcmRpc3AnLFxuICAgICAgICAnX19wYXNjYWwnLFxuICAgICAgICAnX19waW4nLFxuICAgICAgICAnX19wcmFnbWEnLFxuICAgICAgICAnX19wcm9wZXJ0eScsXG4gICAgICAgICdfX3B0cjMyJyxcbiAgICAgICAgJ19fcHRyNjQnLFxuICAgICAgICAnX19yYWlzZScsXG4gICAgICAgICdfX3Jlc3RyaWN0JyxcbiAgICAgICAgJ19fcmVzdW1lJyxcbiAgICAgICAgJ19fc2VhbGVkJyxcbiAgICAgICAgJ19fc2luZ2xlX2luaGVyaXRhbmNlJyxcbiAgICAgICAgJ19fc3RkY2FsbCcsXG4gICAgICAgICdfX3N1cGVyJyxcbiAgICAgICAgJ19fdGhpc2NhbGwnLFxuICAgICAgICAnX190cnknLFxuICAgICAgICAnX190cnlfY2FzdCcsXG4gICAgICAgICdfX3R5cGVvZicsXG4gICAgICAgICdfX3VuYWxpZ25lZCcsXG4gICAgICAgICdfX3VuaG9vaycsXG4gICAgICAgICdfX3V1aWRvZicsXG4gICAgICAgICdfX3ZhbHVlJyxcbiAgICAgICAgJ19fdmlydHVhbF9pbmhlcml0YW5jZScsXG4gICAgICAgICdfX3c2NCcsXG4gICAgICAgICdfX3djaGFyX3QnXG4gICAgXSxcbiAgICBvcGVyYXRvcnM6IFtcbiAgICAgICAgJz0nLCAnPicsICc8JywgJyEnLCAnficsICc/JywgJzonLFxuICAgICAgICAnPT0nLCAnPD0nLCAnPj0nLCAnIT0nLCAnJiYnLCAnfHwnLCAnKysnLCAnLS0nLFxuICAgICAgICAnKycsICctJywgJyonLCAnLycsICcmJywgJ3wnLCAnXicsICclJywgJzw8JyxcbiAgICAgICAgJz4+JywgJz4+PicsICcrPScsICctPScsICcqPScsICcvPScsICcmPScsICd8PScsXG4gICAgICAgICdePScsICclPScsICc8PD0nLCAnPj49JywgJz4+Pj0nXG4gICAgXSxcbiAgICAvLyB3ZSBpbmNsdWRlIHRoZXNlIGNvbW1vbiByZWd1bGFyIGV4cHJlc3Npb25zXG4gICAgc3ltYm9sczogL1s9Pjwhfj86JnwrXFwtKlxcL1xcXiVdKy8sXG4gICAgZXNjYXBlczogL1xcXFwoPzpbYWJmbnJ0dlxcXFxcIiddfHhbMC05QS1GYS1mXXsxLDR9fHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pLyxcbiAgICBpbnRlZ2Vyc3VmZml4OiAvKGxsfExMfHV8VXxsfEwpPyhsbHxMTHx1fFV8bHxMKT8vLFxuICAgIGZsb2F0c3VmZml4OiAvW2ZGbExdPy8sXG4gICAgZW5jb2Rpbmc6IC91fHU4fFV8TC8sXG4gICAgLy8gVGhlIG1haW4gdG9rZW5pemVyIGZvciBvdXIgbGFuZ3VhZ2VzXG4gICAgdG9rZW5pemVyOiB7XG4gICAgICAgIHJvb3Q6IFtcbiAgICAgICAgICAgIC8vIEMrKyAxMSBSYXcgU3RyaW5nXG4gICAgICAgICAgICBbL0BlbmNvZGluZz9SXFxcIig/OihbXiAoKVxcXFxcXHRdKikpXFwoLywgeyB0b2tlbjogJ3N0cmluZy5yYXcuYmVnaW4nLCBuZXh0OiAnQHJhdy4kMScgfV0sXG4gICAgICAgICAgICAvLyBpZGVudGlmaWVycyBhbmQga2V5d29yZHNcbiAgICAgICAgICAgIFsvW2EtekEtWl9dXFx3Ki8sIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAa2V5d29yZHMnOiB7IHRva2VuOiAna2V5d29yZC4kMCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdpZGVudGlmaWVyJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAvLyB3aGl0ZXNwYWNlXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAd2hpdGVzcGFjZScgfSxcbiAgICAgICAgICAgIC8vIFtbIGF0dHJpYnV0ZXMgXV0uXG4gICAgICAgICAgICBbL1xcW1xcWy4qXFxdXFxdLywgJ2Fubm90YXRpb24nXSxcbiAgICAgICAgICAgIC8vIFByZXByb2Nlc3NvciBkaXJlY3RpdmVcbiAgICAgICAgICAgIFsvXlxccyojXFxzKlxcdysvLCAna2V5d29yZCddLFxuICAgICAgICAgICAgLy8gZGVsaW1pdGVycyBhbmQgb3BlcmF0b3JzXG4gICAgICAgICAgICBbL1t7fSgpXFxbXFxdXS8sICdAYnJhY2tldHMnXSxcbiAgICAgICAgICAgIFsvWzw+XSg/IUBzeW1ib2xzKS8sICdAYnJhY2tldHMnXSxcbiAgICAgICAgICAgIFsvQHN5bWJvbHMvLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQG9wZXJhdG9ycyc6ICdkZWxpbWl0ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogJydcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgLy8gbnVtYmVyc1xuICAgICAgICAgICAgWy9cXGQqXFxkK1tlRV0oW1xcLStdP1xcZCspPyhAZmxvYXRzdWZmaXgpLywgJ251bWJlci5mbG9hdCddLFxuICAgICAgICAgICAgWy9cXGQqXFwuXFxkKyhbZUVdW1xcLStdP1xcZCspPyhAZmxvYXRzdWZmaXgpLywgJ251bWJlci5mbG9hdCddLFxuICAgICAgICAgICAgWy8wW3hYXVswLTlhLWZBLUYnXSpbMC05YS1mQS1GXShAaW50ZWdlcnN1ZmZpeCkvLCAnbnVtYmVyLmhleCddLFxuICAgICAgICAgICAgWy8wWzAtNyddKlswLTddKEBpbnRlZ2Vyc3VmZml4KS8sICdudW1iZXIub2N0YWwnXSxcbiAgICAgICAgICAgIFsvMFtiQl1bMC0xJ10qWzAtMV0oQGludGVnZXJzdWZmaXgpLywgJ251bWJlci5iaW5hcnknXSxcbiAgICAgICAgICAgIFsvXFxkW1xcZCddKlxcZChAaW50ZWdlcnN1ZmZpeCkvLCAnbnVtYmVyJ10sXG4gICAgICAgICAgICBbL1xcZChAaW50ZWdlcnN1ZmZpeCkvLCAnbnVtYmVyJ10sXG4gICAgICAgICAgICAvLyBkZWxpbWl0ZXI6IGFmdGVyIG51bWJlciBiZWNhdXNlIG9mIC5cXGQgZmxvYXRzXG4gICAgICAgICAgICBbL1s7LC5dLywgJ2RlbGltaXRlciddLFxuICAgICAgICAgICAgLy8gc3RyaW5nc1xuICAgICAgICAgICAgWy9cIihbXlwiXFxcXF18XFxcXC4pKiQvLCAnc3RyaW5nLmludmFsaWQnXSxcbiAgICAgICAgICAgIFsvXCIvLCAnc3RyaW5nJywgJ0BzdHJpbmcnXSxcbiAgICAgICAgICAgIC8vIGNoYXJhY3RlcnNcbiAgICAgICAgICAgIFsvJ1teXFxcXCddJy8sICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFsvKCcpKEBlc2NhcGVzKSgnKS8sIFsnc3RyaW5nJywgJ3N0cmluZy5lc2NhcGUnLCAnc3RyaW5nJ11dLFxuICAgICAgICAgICAgWy8nLywgJ3N0cmluZy5pbnZhbGlkJ11cbiAgICAgICAgXSxcbiAgICAgICAgd2hpdGVzcGFjZTogW1xuICAgICAgICAgICAgWy9bIFxcdFxcclxcbl0rLywgJyddLFxuICAgICAgICAgICAgWy9cXC9cXCpcXCooPyFcXC8pLywgJ2NvbW1lbnQuZG9jJywgJ0Bkb2Njb21tZW50J10sXG4gICAgICAgICAgICBbL1xcL1xcKi8sICdjb21tZW50JywgJ0Bjb21tZW50J10sXG4gICAgICAgICAgICBbL1xcL1xcLy4qJC8sICdjb21tZW50J10sXG4gICAgICAgIF0sXG4gICAgICAgIGNvbW1lbnQ6IFtcbiAgICAgICAgICAgIFsvW15cXC8qXSsvLCAnY29tbWVudCddLFxuICAgICAgICAgICAgWy9cXCpcXC8vLCAnY29tbWVudCcsICdAcG9wJ10sXG4gICAgICAgICAgICBbL1tcXC8qXS8sICdjb21tZW50J11cbiAgICAgICAgXSxcbiAgICAgICAgLy9JZGVudGljYWwgY29weSBvZiBjb21tZW50IGFib3ZlLCBleGNlcHQgZm9yIHRoZSBhZGRpdGlvbiBvZiAuZG9jXG4gICAgICAgIGRvY2NvbW1lbnQ6IFtcbiAgICAgICAgICAgIFsvW15cXC8qXSsvLCAnY29tbWVudC5kb2MnXSxcbiAgICAgICAgICAgIFsvXFwqXFwvLywgJ2NvbW1lbnQuZG9jJywgJ0Bwb3AnXSxcbiAgICAgICAgICAgIFsvW1xcLypdLywgJ2NvbW1lbnQuZG9jJ11cbiAgICAgICAgXSxcbiAgICAgICAgc3RyaW5nOiBbXG4gICAgICAgICAgICBbL1teXFxcXFwiXSsvLCAnc3RyaW5nJ10sXG4gICAgICAgICAgICBbL0Blc2NhcGVzLywgJ3N0cmluZy5lc2NhcGUnXSxcbiAgICAgICAgICAgIFsvXFxcXC4vLCAnc3RyaW5nLmVzY2FwZS5pbnZhbGlkJ10sXG4gICAgICAgICAgICBbL1wiLywgJ3N0cmluZycsICdAcG9wJ11cbiAgICAgICAgXSxcbiAgICAgICAgcmF3OiBbXG4gICAgICAgICAgICBbLyguKikoXFwpKSg/OihbXiAoKVxcXFxcXHRdKikpKFxcXCIpLywge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJyQzPT0kUzInOiBbJ3N0cmluZy5yYXcnLCAnc3RyaW5nLnJhdy5lbmQnLCAnc3RyaW5nLnJhdy5lbmQnLCB7IHRva2VuOiAnc3RyaW5nLnJhdy5lbmQnLCBuZXh0OiAnQHBvcCcgfV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiBbJ3N0cmluZy5yYXcnLCAnc3RyaW5nLnJhdycsICdzdHJpbmcucmF3JywgJ3N0cmluZy5yYXcnXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFsvLiovLCAnc3RyaW5nLnJhdyddXG4gICAgICAgIF1cbiAgICB9LFxufTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/monaco-editor/esm/vs/basic-languages/cpp/cpp.js\n");

/***/ })

}]);