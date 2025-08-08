# tk-toggle



<!-- Auto Generated Below -->


## Overview

The TkToggle component is another basic element for user input. You can use this for turning settings, features or true/false inputs on and off.

## Properties

| Property         | Attribute         | Description                                     | Type                                                   | Default     |
| ---------------- | ----------------- | ----------------------------------------------- | ------------------------------------------------------ | ----------- |
| `ariaLabelledby` | `aria-labelledby` | The aria-labelledby attribute of the toggle.    | `string`                                               | `null`      |
| `disabled`       | `disabled`        | Whether the toggle is disabled.                 | `boolean`                                              | `false`     |
| `icon`           | `icon`            | Specifies a material icon name to be displayed. | `string`                                               | `'check'`   |
| `inputId`        | `input-id`        | The ID of the input element.                    | `string`                                               | `''`        |
| `invalid`        | `invalid`         | Whether the toggle is in an invalid state.      | `boolean`                                              | `false`     |
| `label`          | `label`           | The label for the toggle.                       | `string`                                               | `undefined` |
| `name`           | `name`            | The name attribute of the toggle.               | `string`                                               | `null`      |
| `showIcon`       | `show-icon`       | Whether to show the icon in the toggle.         | `boolean`                                              | `true`      |
| `size`           | `size`            | Sets size for the component.                    | `"base" \| "large" \| "small" \| "xlarge" \| "xsmall"` | `'base'`    |
| `value`          | `value`           | The current state of the toggle.                | `boolean`                                              | `false`     |
| `variant`        | `variant`         | The type of the toggle.                         | `"info" \| "success"`                                  | `'info'`    |


## Events

| Event       | Description                                  | Type                   |
| ----------- | -------------------------------------------- | ---------------------- |
| `tk-change` | Event emitted when the toggle value changes. | `CustomEvent<boolean>` |


## Methods

### `getInputElement() => Promise<HTMLInputElement>`

Returns the native `<input>` element used under the hood.

#### Returns

Type: `Promise<HTMLInputElement>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
