# tk-rating



<!-- Auto Generated Below -->


## Overview

The `TkRating` component is a customizable rating input element that allows users to select a value from a series of icons (such as stars, hearts, or dot).

## Properties

| Property          | Attribute           | Description                                                                                               | Type                                     | Default  |
| ----------------- | ------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------- | -------- |
| `disabled`        | `disabled`          | The user cannot interact with the input.                                                                  | `boolean`                                | `false`  |
| `maxRating`       | `max-rating`        | The maximum rating value. Possible options are 5 or 10.                                                   | `number`                                 | `5`      |
| `readonly`        | `readonly`          | If `true`, the user cannot modify the value.                                                              | `boolean`                                | `false`  |
| `showRatingValue` | `show-rating-value` | Determines whether to show the numerical rating value under to the icon.                                  | `boolean`                                | `false`  |
| `type`            | `type`              | The type of icon to display for each rating element. Options include 'star', 'heart', 'dot' and 'number'. | `"dot" \| "heart" \| "number" \| "star"` | `'star'` |
| `value`           | `value`             | The currently selected rating value.                                                                      | `number`                                 | `0`      |


## Events

| Event       | Description                         | Type                  |
| ----------- | ----------------------------------- | --------------------- |
| `tk-change` | Emitted when the value has changed. | `CustomEvent<number>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
