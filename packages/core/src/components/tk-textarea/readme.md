# tk-textarea



<!-- Auto Generated Below -->


## Overview

The TkTextarea component enables multi-line text input with customizable size, validation, and styling options.

## Properties

| Property       | Attribute       | Description                                                        | Type                           | Default     |
| -------------- | --------------- | ------------------------------------------------------------------ | ------------------------------ | ----------- |
| `disabled`     | `disabled`      | If `true`, the user cannot interact with the input.                | `boolean`                      | `false`     |
| `error`        | `error`         | This is the error message that will be displayed.                  | `string`                       | `undefined` |
| `hint`         | `hint`          | Provided a hint or additional information about the input.         | `string`                       | `undefined` |
| `invalid`      | `invalid`       | Indicates whether the input is in an invalid state                 | `boolean`                      | `false`     |
| `label`        | `label`         | Defines the label for the element.                                 | `string`                       | `undefined` |
| `maxLength`    | `max-length`    | Limits the number of characters.                                   | `number`                       | `undefined` |
| `name`         | `name`          | The name of the control, which is submitted with the form data.    | `string`                       | `undefined` |
| `placeholder`  | `placeholder`   | Placeholder text displayed when the input is empty.                | `string`                       | `undefined` |
| `readonly`     | `readonly`      | If `true`, the user cannot modify the value.                       | `boolean`                      | `false`     |
| `rows`         | `rows`          | Represents the rows value of the component                         | `number`                       | `3`         |
| `showAsterisk` | `show-asterisk` | Displays a red asterisk (*) next to the label for visual emphasis. | `boolean`                      | `false`     |
| `size`         | `size`          | Sets size for the component.                                       | `"base" \| "large" \| "small"` | `'base'`    |
| `value`        | `value`         | The value of the input.                                            | `number \| string`             | `''`        |


## Events

| Event       | Description                             | Type                            |
| ----------- | --------------------------------------- | ------------------------------- |
| `tk-blur`   | Emitted when the input loses focus.     | `CustomEvent<void>`             |
| `tk-change` | Emitted when the value has changed.     | `CustomEvent<number \| string>` |
| `tk-focus`  | Emitted when the input has focus.       | `CustomEvent<void>`             |
| `tk-input`  | Emitted when a keyboard input occurred. | `CustomEvent<KeyboardEvent>`    |


## Methods

### `setFocus() => Promise<void>`

Sets focus on the specified `tk-input`. Use this method instead of the global
`input.focus()`.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
