# tk-popover



<!-- Auto Generated Below -->


## Overview

The TkPopover displays additional information when triggered. By default, it opens when clicked, but can also be configured to open on hover.

## Properties

| Property         | Attribute         | Description                              | Type                                                                                                                                                                 | Default     |
| ---------------- | ----------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `containerStyle` | `container-style` | The style attribute of container element | `any`                                                                                                                                                                | `null`      |
| `position`       | `position`        | Sets the position of the popover.        | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `undefined` |
| `trigger`        | `trigger`         | Sets the action of the popover.          | `"click" \| "hover"`                                                                                                                                                 | `'click'`   |
| `type`           | `type`            | Sets the type of the popover.            | `"basic" \| "dark" \| "white"`                                                                                                                                       | `'basic'`   |


## Methods

### `close() => Promise<void>`

Closes the popover

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------ |
|             | Default slot for content without a specific name                                                             |
| `"content"` | Define custom HTML content for the Popover, which replaces the default header, description and icon elements |
| `"trigger"` | The trigger slot defines the element that will trigger the Popover                                           |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
