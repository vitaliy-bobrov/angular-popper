# angular-popper

[![Build Status](https://travis-ci.org/vitaliy-bobrov/angular-popper.svg?branch=master)](https://travis-ci.org/vitaliy-bobrov/angular-popper)
[![npm version](https://badge.fury.io/js/angular-popper.svg)](https://badge.fury.io/js/angular-popper)
[![npm](https://img.shields.io/npm/dt/angular-popper.svg)](https://github.com/vitaliy-bobrov/angular-popper)

Popover component for Angular 2+ based on [Popper.js](https://popper.js.org/) library.

[Demo](https://vitaliy-bobrov.github.io/angular-popper/)

## Instalation

* Angular CLI > v6.0.0: `ng add angular-popper`

* yarn: `yarn add popper.js angular-popper`

* npm: `npm install --save popper.js angular-popper`

## Usage

### Import NgxPopper module
```ts
...
import { NgxPopper } from 'angular-popper';

@NgModule({
  ...
  imports: [
    NgxPopper
  ]
  ..
})
export class AppModule {}
```

### Use in template

```html
<angular-popper>
  <div class="target-block border border-primary">
    Target
  </div>

  <div content>Popper content</div>
</angular-popper>
```

## Input properties

### show: boolean

**Default**: `true`

Specify if popper visible.

### target?: string | Element

Specify popper element target, accepts HTMLElement reference or CSS selector.

### closeButton: boolean

**Default**: `false`

Specify if popper should contain close button.

### placement: Popper.Placement

**Default**: `'bottom'`

Specify popper placement.

### positionFixed: boolean

**Default**: `false`

Specify if popper should has `fixed` position.

### eventsEnabled: boolean

**Default**: `true`

Specify if popper should listen for scroll & resize events.

### modifiers?: Popper.Modifiers

Popper.js modifiers object, [details](https://popper.js.org/popper-documentation.html#modifiers).

## Events

### close

Fires on popper close button click.

