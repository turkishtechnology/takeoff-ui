# tk-dropdown



<!-- Auto Generated Below -->


## Overview

TkDropdown creates a dropdown with a trigger element. Items in the options prop can be listed and templated.

## Properties

| Property          | Attribute           | Description                                             | Type                                                                                                                                                                 | Default                  |
| ----------------- | ------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `disabled`        | `disabled`          | The disabled status.                                    | `boolean`                                                                                                                                                            | `false`                  |
| `emptyMessage`    | `empty-message`     | The message to display when there is no data available. | `string`                                                                                                                                                             | `'No options available'` |
| `groupNameKey`    | `group-name-key`    | The key to use for group names when options are grouped | `string`                                                                                                                                                             | `'groupName'`            |
| `groupOptionsKey` | `group-options-key` | The key to use for grouped options array                | `string`                                                                                                                                                             | `'options'`              |
| `optionHtml`      | `option-html`       | Provides a function to customize the options.           | `Function`                                                                                                                                                           | `undefined`              |
| `optionLabelKey`  | `option-label-key`  | The key to use for option labels                        | `string`                                                                                                                                                             | `'label'`                |
| `optionValueKey`  | `option-value-key`  | The key to use for option values                        | `string`                                                                                                                                                             | `'value'`                |
| `options`         | `options`           | The list of options to be displayed in the select box.  | `any[]`                                                                                                                                                              | `undefined`              |
| `optionsAlign`    | `options-align`     | Indicates the alignment of options.                     | `"center" \| "left" \| "right"`                                                                                                                                      | `'left'`                 |
| `position`        | `position`          | Sets the position of the tooltip.                       | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'bottom'`               |


## Events

| Event           | Description                         | Type               |
| --------------- | ----------------------------------- | ------------------ |
| `tk-item-click` | Emitted when the value has changed. | `CustomEvent<any>` |


## Slots

| Slot           | Description                                                         |
| -------------- | ------------------------------------------------------------------- |
| `"empty-data"` | Set how the dropdown will appear when there is no data              |
| `"trigger"`    | The trigger slot defines the element that will trigger the dropdown |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
