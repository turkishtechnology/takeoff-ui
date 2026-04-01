# Feedback Components Reference

API reference for Takeoff UI feedback components. These components communicate
status, provide contextual information, and display overlay content to users.

---

### tk-alert

The TkAlert component is designed to display contextual feedback messages, such
as success, warnings, informational notices, and errors.

**Props**

| Name           | Type                                                      | Default   | Description                                                                                    |
| -------------- | --------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------- |
| alignItems     | "center" \| "end" \| "start"                              | 'center'  | Alignment of the alert content ('start', 'center', or 'end').                                  |
| containerStyle | CSSProperties                                             | null      | The style attribute of container element                                                       |
| header         | string                                                    |           | The header text displayed at the top of the alert.                                             |
| icon           | IIconOptions \| string                                    |           | The icon displayed in the alert. If not provided, a default icon is used based on the variant. |
| iconSize       | "base" \| "large" \| "small" \| "xlarge"                  | 'large'   | Size of the icon displayed in the alert ('small', 'base', or 'large').                         |
| message        | string \| string[]                                        |           | The message text displayed within the alert.                                                   |
| removable      | boolean                                                   | false     | The alert can be closed by the user.                                                           |
| type           | "filled" \| "filledlight" \| "gradient" \| "outlined"     | 'filled'  | This field specifies the design type of the component.                                         |
| variant        | "danger" \| "info" \| "neutral" \| "success" \| "warning" | 'neutral' | Defines the visual variant of the alert.                                                       |

**Slots**

| Name          | Description                                |
| ------------- | ------------------------------------------ |
| footer-action | Custom actions template to default footer. |
| right-action  | Custom actions template to right content.  |

---

### tk-dialog

The `TkDialog` component provides a customizable modal dialog for displaying
important information or requesting user input.

**Props**

| Name            | Type                                                   | Default | Description                                                  |
| --------------- | ------------------------------------------------------ | ------- | ------------------------------------------------------------ |
| containerStyle  | CSSProperties                                          | null    | The style attribute of container element                     |
| header          | string                                                 |         | The header text                                              |
| headerType      | "basic" \| "dark" \| "divided" \| "light" \| "primary" | 'basic' | Header type                                                  |
| hideBackdrop    | boolean                                                | false   | Controls whether the backdrop is shown                       |
| isMaskBlur      | boolean                                                | false   | Controls whether the dialog has a blur background            |
| maskVariant     | "base" \| "dark" \| "darkest" \| "light" \| "lightest" | 'base'  | Appearance of the mask                                       |
| preventDismiss  | boolean                                                | false   | Prevents the dialog from being dismissed by clicking outside |
| showCloseButton | boolean                                                | true    | Controls whether the close button is shown                   |
| showHeader      | boolean                                                | true    | Controls whether the header is shown                         |
| showVariantSign | boolean                                                | true    | Controls whether the variant sign is shown                   |
| subheader       | string                                                 |         | The subheader text                                           |
| variant         | "danger" \| "info" \| "success" \| "warning"           | 'info'  | The variant of the dialog                                    |
| visible         | boolean                                                | false   | Controls the visibility of the dialog                        |

**Events**

| Name              | Detail  | Description                                      |
| ----------------- | ------- | ------------------------------------------------ |
| tk-close          | void    | Event emitted when the dialog is closed          |
| tk-open           | void    | Event emitted when the dialog is opened          |
| tk-visible-change | boolean | Event emitted when the dialog visibility changes |

**Methods**

| Name  | Signature                | Description                                                                                                              |
| ----- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| close | close() => Promise<void> | Requests to close the dialog by emitting a tk-close event. Note: This method only emits an event. The dialog will onl... |
| open  | open() => Promise<void>  | Requests to open the dialog by emitting a tk-open event. Note: This method only emits an event. The dialog will only ... |

**Slots**

| Name           | Description                                    |
| -------------- | ---------------------------------------------- |
| container      | Custom container template.                     |
| content        | Custom content template.                       |
| default        | Default slot to detect child to inner content. |
| footer         | Custom footer template.                        |
| footer-actions | Custom actions template to default footer.     |
| header         | Custom header template.                        |

---

### tk-drawer

The `TkDrawer` is a container component displayed as an overlay.

**Props**

| Name           | Type                                                    | Default | Description                                                   |
| -------------- | ------------------------------------------------------- | ------- | ------------------------------------------------------------- |
| containerStyle | CSSProperties                                           | null    | The style attribute of container element                      |
| footerType     | "basic" \| "divided" \| "light"                         | 'basic' | The mode of the footer                                        |
| header         | string                                                  |         | Text to display in the drawer header                          |
| headerType     | "basic" \| "dark" \| "divided" \| "light" \| "primary"  | 'basic' | The type of the header                                        |
| hideBackdrop   | boolean                                                 | false   | Controls whether the backdrop is shown                        |
| hideCloseIcon  | boolean                                                 | false   | Controls whether to hide the close icon                       |
| maskVariant    | "base" \| "dark" \| "darkest" \| "light" \| "lightest"  | 'base'  | Appearance of the mask                                        |
| open           | boolean                                                 | false   | Controls whether the drawer is open or closed                 |
| position       | "bottom" \| "full-screen" \| "left" \| "right" \| "top" | 'right' | Determines the position of the drawer                         |
| preventDismiss | boolean                                                 | false   | Prevents the drawer from being dismissed by clicking outside  |
| unblockScroll  | boolean                                                 | false   | Controls whether to unblock scrolling when the drawer is open |

**Events**

| Name             | Detail  | Description                                  |
| ---------------- | ------- | -------------------------------------------- |
| tk-drawer-change | boolean | Emitted when the drawer's open state changes |
| tk-drawer-close  | void    | Emitted when the drawer is closed            |
| tk-drawer-enter  | void    | Emitted when the drawer starts to enter      |
| tk-drawer-leave  | void    | Emitted when the drawer starts to leave      |
| tk-drawer-open   | void    | Emitted when the drawer is opened            |

**Methods**

| Name  | Signature                | Description                                                                                                              |
| ----- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| close | close() => Promise<void> | Closes the drawer by emitting a tk-drawer-close event Parent components should listen for this event and update the o... |
| show  | show() => Promise<void>  | Opens the drawer by emitting a tk-drawer-open event Parent components should listen for this event and update the ope... |

**Slots**

| Name          | Description                        |
| ------------- | ---------------------------------- |
| container     | Custom container template.         |
| content       | Custom inner body template.        |
| footer        | Custom footer template.            |
| header        | Custom header template.            |
| header-action | Custom actions template of header. |

---

### tk-spinner

The `TkSpinner` component description.

**Props**

| Name        | Type                                                                  | Default    | Description                                        |
| ----------- | --------------------------------------------------------------------- | ---------- | -------------------------------------------------- |
| label       | string                                                                |            | Sets the label of the spinner component.           |
| orientation | "horizontal" \| "vertical"                                            | 'vertical' | Controls the orientation of the spinner component. |
| size        | "base" \| "large" \| "small" \| "xlarge" \| "xsmall" \| "xxsmall"     | 'base'     | Controls the size of the spinner component.        |
| type        | "dots" \| "lines" \| "loader" \| "pulse" \| "rounded" \| "three-dots" | 'rounded'  | Sets the style of spinner component.               |

---

### tk-tooltip

The TkTooltip is used to display additional information when element is hovered
over.

**Props**

| Name           | Type                                                                                                                                                               | Default   | Description                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ----------------------------------------------- |
| containerStyle | CSSProperties                                                                                                                                                      | null      | The style attribute of container element        |
| description    | string                                                                                                                                                             |           | Sets description text for the tooltip.          |
| header         | string                                                                                                                                                             |           | Sets header text for the tooltip.               |
| icon           | IIconOptions \| IMultiIconOptions \| string                                                                                                                        |           | Specifies a material icon name to be displayed. |
| position       | "bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start" | 'right'   | Sets the position of the tooltip.               |
| variant        | "danger" \| "dark" \| "info" \| "neutral" \| "success" \| "warning" \| "white"                                                                                     | 'neutral' | Sets the color variant of the tooltip.          |

**Slots**

| Name    | Description                                                                                                  |
| ------- | ------------------------------------------------------------------------------------------------------------ |
| content | Define custom HTML content for the tooltip, which replaces the default header, description and icon elements |
| trigger | The trigger slot defines the element that will trigger the tooltip                                           |

---

### tk-popover

The TkPopover displays additional information when triggered.

**Props**

| Name           | Type                                                                                                                                                               | Default | Description                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | ---------------------------------------- |
| containerStyle | CSSProperties                                                                                                                                                      | null    | The style attribute of container element |
| position       | "bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start" |         | Sets the position of the popover.        |
| trigger        | "click" \| "hover"                                                                                                                                                 | 'click' | Sets the action of the popover.          |
| type           | "basic" \| "dark" \| "white"                                                                                                                                       | 'basic' | Sets the type of the popover.            |

**Events**

| Name      | Detail  | Description                                        |
| --------- | ------- | -------------------------------------------------- |
| tk-change | boolean | Emitted when the open state of the popover changes |

**Methods**

| Name  | Signature                | Description        |
| ----- | ------------------------ | ------------------ |
| close | close() => Promise<void> | Closes the popover |

**Slots**

| Name    | Description                                                                                                  |
| ------- | ------------------------------------------------------------------------------------------------------------ |
| default | Default slot for content without a specific name                                                             |
| content | Define custom HTML content for the Popover, which replaces the default header, description and icon elements |
| trigger | The trigger slot defines the element that will trigger the Popover                                           |

---
