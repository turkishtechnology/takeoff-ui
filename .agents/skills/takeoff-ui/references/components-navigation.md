# Navigation Components Reference

API reference for Takeoff UI navigation components. These components help users
move through content, steps, and hierarchical structures.

---

### tk-tabs

TkTabs is a navigation component that displays menu items as tab headers.

**Props**

| Name                 | Type                                                  | Default      | Description                                                                               |
| -------------------- | ----------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------- |
| activeIndex          | number                                                | 0            | Controls the currently active tab index. Can be controlled programmatically from outside. |
| alignHeaders         | "center" \| "end" \| "start"                          | 'start'      | Sets the alignment of the header.                                                         |
| containerStyle       | CSSProperties                                         | null         | The style attribute of container element                                                  |
| contentStyle         | CSSProperties                                         | null         | The style attribute of tabs item element                                                  |
| controlled           | boolean                                               | false        | Controls if the tabs component is controlled.                                             |
| defaultActiveIndex   | number                                                | 0            | Default Active Index for tabs component.                                                  |
| headerContainerStyle | CSSProperties                                         | null         | The style attribute of headers container element                                          |
| isClosable           | boolean                                               | false        | Controls if tabs are closable.                                                            |
| isExtendable         | boolean                                               | false        | Controls if new tabs can be added or not.                                                 |
| orientation          | "horizontal" \| "vertical"                            | 'horizontal' | Controls the orientation of the tabs component.                                           |
| size                 | "base" \| "large" \| "small" \| "xsmall" \| "xxsmall" | 'base'       | Controls the size of the tabs component.                                                  |
| spreadHeaders        | boolean                                               | false        | Determines whether the tab headers will spread evenly across the horizontal space.        |
| type                 | "basic" \| "compact" \| "divided" \| "expanded"       | 'basic'      | Controls the tab style of the tabs component.                                             |
| variant              | "info" \| "neutral" \| "primary"                      | 'primary'    | Controls the color variant of the tabs component.                                         |

**Events**

| Name          | Detail | Description                                                              |
| ------------- | ------ | ------------------------------------------------------------------------ |
| tk-tab-change | number | Triggered when the currently open tab changes. Returns the active index. |
| tk-tab-click  | number | Triggered when a tab is clicked. Returns the clicked tab index.          |

---

### tk-tabs-item

Individual tab item within a tk-tabs container.

**Props**

| Name           | Type                   | Default | Description                                    |
| -------------- | ---------------------- | ------- | ---------------------------------------------- |
| badgeCount     | number \| string       |         | Sets badge component's count.                  |
| badgeLabel     | string                 |         | Sets badge component's label.                  |
| badgeOptions   | IBadgeOptions          |         | Sets badge component's options.                |
| badged         | boolean                | false   | Checks if tab item has badge component or not. |
| disabled       | boolean                |         | Whether the tab item is disabled.              |
| icon           | IIconOptions \| string |         | Icon for tabs item component.                  |
| label          | string                 |         | Label for the tab item.                        |
| tooltipOptions | ITooltipOptions        |         | Sets tooltip options for the tab item.         |

---

### tk-stepper

TkStepper component for managing a series of steps.

**Props**

| Name              | Type                                     | Default      | Description                                                                                                              |
| ----------------- | ---------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| active            | number                                   | 0            | Currently active step index                                                                                              |
| activeIcon        | IIconOptions \| string                   |              | Specifies a material icon or icon options for active steps.                                                              |
| completeIcon      | IIconOptions \| string                   |              | Specifies a material icon or icon options for completed steps.                                                           |
| containerStyle    | CSSProperties                            | null         | The style attribute of container element                                                                                 |
| contentStyle      | CSSProperties                            | null         | The style attribute of content elements                                                                                  |
| controlled        | boolean                                  | false        | Controls if the tabs component is controlled.                                                                            |
| errorIcon         | IIconOptions \| string                   |              | Specifies a material icon or icon options for error steps.                                                               |
| inactiveIcon      | IIconOptions \| string                   |              | Specifies a material icon or icon options for inactive steps.                                                            |
| linear            | boolean                                  | false        | Whether the steps follow a linear progression (can only navigate to the next step when current step is completed).       |
| mode              | "compact" \| "default"                   | 'default'    | Controls the display mode of the stepper component.                                                                      |
| orientation       | "horizontal" \| "vertical"               | 'horizontal' | Controls the orientation of the stepper component.                                                                       |
| railStyle         | CSSProperties                            | null         | The style attribute of rail elements                                                                                     |
| reverse           | boolean                                  | false        | Whether the step headers and content should be reversed.                                                                 |
| showCompleteState | boolean                                  | true         | Whether to show completed steps with the complete state. If false, completed steps will appear as just passed and not... |
| signStyle         | CSSProperties                            | null         | The style attribute of step sign elements                                                                                |
| size              | "base" \| "large" \| "small" \| "xsmall" | 'base'       | The size of the stepper component.                                                                                       |
| stepMode          | "basic" \| "number"                      | 'basic'      | Controls the step mode of the stepper component.                                                                         |

**Events**

| Name           | Detail           | Description                           |
| -------------- | ---------------- | ------------------------------------- |
| tk-step-change | number           | Emitted when the active step changes. |
| tk-step-click  | IStepClickDetail | Emitted when a step is clicked.       |

**Methods**

| Name      | Signature                                 | Description                 |
| --------- | ----------------------------------------- | --------------------------- |
| setActive | setActive(index: number) => Promise<void> | Sets the active step index. |

---

### tk-step

Individual step within a tk-stepper container.

**Props**

| Name          | Type                   | Default    | Description                                                                                      |
| ------------- | ---------------------- | ---------- | ------------------------------------------------------------------------------------------------ |
| activeIcon    | IIconOptions \| string |            | Specifies a material icon or icon options for active steps.                                      |
| complete      | boolean                | false      | Indicates if the step has been completed.                                                        |
| completeIcon  | IIconOptions \| string |            | Specifies a material icon or icon options for completed steps.                                   |
| disabled      | boolean                | false      | Indicates if the step is disabled (cannot be selected or interacted with).                       |
| error         | boolean                | false      | Indicates if the step has encountered an error.                                                  |
| errorIcon     | IIconOptions \| string |            | Specifies a material icon or icon options for error steps.                                       |
| header        | string                 |            | The header text to be displayed for the step.                                                    |
| icon          | IIconOptions \| string |            | Icon to be displayed for the step. Can be either a string (icon name) or an IIconOptions object. |
| inactiveIcon  | IIconOptions \| string |            | Specifies a material icon or icon options for inactive steps.                                    |
| index         | number                 |            | The index of the step in the stepper.                                                            |
| isActive      | boolean                | false      | Indicates if the step is currently active.                                                       |
| isClickable   | boolean                | true       | Whether the step is clickable.                                                                   |
| labelPosition | "flip" \| "non-flip"   | 'non-flip' | Controls the label position of the step.                                                         |
| stepMode      | "basic" \| "number"    | 'basic'    | Controls the step mode of the stepper component.                                                 |
| subheader     | string                 |            | Optional subheader text to provide additional context for the step.                              |

---

### tk-breadcrumb

The `TkBreadcrumb` provides a navigational aid, allowing users to keep track of
their location within the application's hierarchy.

**Props**

| Name          | Type                                     | Default         | Description                                                                            |
| ------------- | ---------------------------------------- | --------------- | -------------------------------------------------------------------------------------- |
| model         | IBreadcrumbModel[]                       |                 | Array of breadcrumb items                                                              |
| separator     | "dot" \| "icon" \| "slash" \| "vertical" | 'icon'          | Type of separator to use between breadcrumb items                                      |
| separatorIcon | string                                   | 'chevron_right' | Icon to use as separator when separator is set to 'icon'                               |
| type          | "basic" \| "outlined"                    | 'basic'         | Defines the visual style of the component, possible values are 'basic' and 'outlined'. |

**Slots**

| Name    | Description                                         |
| ------- | --------------------------------------------------- |
| default | Default slot to detect TkBreadcrumbItem components. |

---

### tk-breadcrumb-item

Individual item within a tk-breadcrumb navigation trail.

**Props**

| Name       | Type                   | Default | Description                           |
| ---------- | ---------------------- | ------- | ------------------------------------- |
| href       | string                 |         | URL for the item                      |
| icon       | IIconOptions \| string |         | Icon to display alongside the label   |
| isCurrent  | boolean                | false   | Indicates if the item is the last one |
| isExternal | boolean                | false   | Whether the item is an external url   |
| label      | string                 |         | Label text for the breadcrumb item    |

---

### tk-dropdown

TkDropdown creates a dropdown with a trigger element.

**Props**

| Name            | Type                                                                                                                                                               | Default                | Description                                             |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ------------------------------------------------------- |
| disabled        | boolean                                                                                                                                                            | false                  | The disabled status.                                    |
| emptyMessage    | string                                                                                                                                                             | 'No options available' | The message to display when there is no data available. |
| groupNameKey    | string                                                                                                                                                             | 'groupName'            | The key to use for group names when options are grouped |
| groupOptionsKey | string                                                                                                                                                             | 'options'              | The key to use for grouped options array                |
| optionHtml      | Function                                                                                                                                                           |                        | Provides a function to customize the options.           |
| optionLabelKey  | string                                                                                                                                                             | 'label'                | The key to use for option labels                        |
| optionValueKey  | string                                                                                                                                                             | 'value'                | The key to use for option values                        |
| options         | any[]                                                                                                                                                              |                        | The list of options to be displayed in the select box.  |
| optionsAlign    | "center" \| "left" \| "right"                                                                                                                                      | 'left'                 | Indicates the alignment of options.                     |
| position        | "bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start" | 'bottom'               | Sets the position of the tooltip.                       |
| size            | "base" \| "large" \| "small"                                                                                                                                       | 'base'                 | Sets size for the dropdown panel.                       |

**Events**

| Name          | Detail | Description                         |
| ------------- | ------ | ----------------------------------- |
| tk-item-click | any    | Emitted when the value has changed. |

**Slots**

| Name       | Description                                                         |
| ---------- | ------------------------------------------------------------------- |
| empty-data | Set how the dropdown will appear when there is no data              |
| trigger    | The trigger slot defines the element that will trigger the dropdown |

---
