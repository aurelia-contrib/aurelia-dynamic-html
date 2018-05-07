# aurelia-dynamic-html

Aurelia custom element that takes (server- or client side) generated html and compiles it into a fully functional Aurelia View.

View [LIVE DEMO](https://aurelia-contrib.github.io/aurelia-dynamic-html/)

## Installation
Install the npm dependency via

```bash
npm i aurelia-dynamic-html
```

or via the Aurelia CLI

```bash
au install aurelia-dynamic-html
```

## Aurelia-CLI

For Aurelia-CLI projects based on RequireJS or SystemJS, the following will install and declare the dependency in your aurelia.json:

```bash
au install aurelia-dynamic-html
```

or if you have already installed and only need to add the dependency to aurelia.json:

```bash
au import aurelia-dynamic-html
```

alternatively you can manually add the dependency to your vendor.bundles:

```json
"dependencies": [
  {
    "name": "aurelia-dynamic-html",
    "path": "../node_modules/aurelia-dynamic-html/dist/amd",
    "main": "aurelia-dynamic-html"
  }
]
```

## Configuration

```typescript
import { Aurelia } from "aurelia-framework";

export function configure(au: Aurelia) {
  au.use.standardConfiguration();

  au.use.plugin("aurelia-dynamic-html"); // don't forget PLATFORM.moduleName if you're using webpack

  au.start().then(() => au.setRoot());
}
```

## Usage

### Inline html, implicit $this context

* Input

```ts
export class App {
  message = "Hello world!";
}
```

```html
<template>
  <dynamic-html html.bind="${message}"></dynamic-html>
</template>
```

* Output

```html
<div>Hello world!</div>
```

Note: the variants below also apply to inline html, but are omitted for brevity

### Html variable, implicit $this context

* Input

```ts
export class App {
  message = "Hello world!";
  html = "${message}";
}
```

```html
<template>
  <dynamic-html html.bind="html"></dynamic-html>
</template>
```

* Output

```html
<div>Hello world!</div>
```

### Html variable, explicit $this context

* Input

```ts
export class App {
  message = "Hello world!";
  html = "${message}";
}
```

```html
<template>
  <dynamic-html html.bind="html" context.bind="$this"></dynamic-html>
</template>
```

* Output

```html
<div>Hello world!</div>
```


### Html variable, context variable

* Input

```ts
export class App {
  context = { message: "Hello world!" };
  html = "${message}";
}
```

```html
<template>
  <dynamic-html html.bind="html" context.bind="context"></dynamic-html>
</template>
```

* Output

```html
<div>Hello world!</div>
```


### Html variable, context variable (complex / nested)

The html and context can come from any source, be of arbitrary complexity, and work for any Aurelia feature.

* Input

```ts
export class App {
  context = { message: "Hello world!", html: "${message}" };
  html = "<dynamic-html html.bind=\"context.html\" context.bind=\"context\"></dynamic-html>";
}
```

```html
<template>
  <dynamic-html html.bind="html" context.bind="$this"></dynamic-html>
</template>
```

* Output

```html
<div><dynamic-html html.bind="context.html" context.bind="context">Hello world!</dynamic-html></div>
```

### Erroneous html, do not render errors

* Input

```ts
export class App {
  context = { message: "Hello world!" };
  html = "${message"; // missing closing brace
}
```

```html
<template>
  <dynamic-html html.bind="html" context.bind="context"></dynamic-html>
</template>
```

* Output

```html
<div></div>
```

### Erroneous html, render errors

* Input

```ts
export class App {
  context = { message: "Hello world!" };
  html = "${message"; // missing closing brace
}
```

```html
<template>
  <dynamic-html html.bind="html" context.bind="context" render-errors=true></dynamic-html>
</template>
```

* Output

```html
<div>Parser Error: Missing expected token } (...)</div>
```

## Building The Code


1. From the project folder, execute the following command:

  ```
  yarn/npm install
  ```
2. To build the code:

  ```
  npm run build
  ```

## Running The Tests

1. To run the tests

  ```
  npm run test
  ```

2. To continuously run the tests

```
npm run develop
```


