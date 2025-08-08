# tk-stepper



<!-- Auto Generated Below -->


## Overview

TkStepper component for managing a series of steps.

## Properties

| Property            | Attribute             | Description                                                                                                                                  | Type                         | Default        |
| ------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | -------------- |
| `active`            | `active`              | Currently active step index                                                                                                                  | `number`                     | `0`            |
| `activeIcon`        | `active-icon`         | Specifies a material icon or icon options for active steps.                                                                                  | `IIconOptions \| string`     | `undefined`    |
| `completeIcon`      | `complete-icon`       | Specifies a material icon or icon options for completed steps.                                                                               | `IIconOptions \| string`     | `undefined`    |
| `containerStyle`    | `container-style`     | The style attribute of container element                                                                                                     | `any`                        | `null`         |
| `contentStyle`      | `content-style`       | The style attribute of content elements                                                                                                      | `any`                        | `null`         |
| `controlled`        | `controlled`          | Controls if the tabs component is controlled.                                                                                                | `boolean`                    | `false`        |
| `errorIcon`         | `error-icon`          | Specifies a material icon or icon options for error steps.                                                                                   | `IIconOptions \| string`     | `undefined`    |
| `inactiveIcon`      | `inactive-icon`       | Specifies a material icon or icon options for inactive steps.                                                                                | `IIconOptions \| string`     | `undefined`    |
| `linear`            | `linear`              | Whether the steps follow a linear progression (can only navigate to the next step when current step is completed).                           | `boolean`                    | `false`        |
| `orientation`       | `orientation`         | Controls the orientation of the stepper component.                                                                                           | `"horizontal" \| "vertical"` | `'horizontal'` |
| `showCompleteState` | `show-complete-state` | Whether to show completed steps with the complete state. If false, completed steps will appear as just passed and not with complete styling. | `boolean`                    | `true`         |
| `signStyle`         | `sign-style`          | The style attribute of step sign elements                                                                                                    | `any`                        | `null`         |
| `stepMode`          | `step-mode`           | Controls the step mode of the stepper component.                                                                                             | `"basic" \| "number"`        | `'basic'`      |


## Events

| Event            | Description                           | Type                            |
| ---------------- | ------------------------------------- | ------------------------------- |
| `tk-step-change` | Emitted when the active step changes. | `CustomEvent<number>`           |
| `tk-step-click`  | Emitted when a step is clicked.       | `CustomEvent<IStepClickDetail>` |


## Methods

### `setActive(index: number) => Promise<void>`

Sets the active step index.

#### Parameters

| Name    | Type     | Description                               |
| ------- | -------- | ----------------------------------------- |
| `index` | `number` | - The index of the step to set as active. |

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
