# Layout and General Components Reference

API reference for Takeoff UI layout and general-purpose components. These
components structure content, provide visual separation, and offer common UI
elements.

---

### tk-accordion

The TkAccordion component is a user interface element that organizes content
under headers, allowing users to expand and collapse sections by clicking on
each header.

**Props**

| Name          | Type                                     | Default               | Description                                                                                                              |
| ------------- | ---------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| activeIndex   | (string \| number)[] \| number \| string |                       | Currently active panel indexes. Can be a single value or an array. When allowMultiple is false, only the last value i... |
| allowMultiple | boolean                                  | false                 | Allows multiple accordion items to be expanded simultaneously.                                                           |
| arrowPosition | "left" \| "right"                        | 'right'               | Sets the position of opening and closing chevrons.                                                                       |
| collapseIcon  | IIconOptions \| string                   | 'keyboard_arrow_up'   | Sets the collapse icon                                                                                                   |
| expandIcon    | IIconOptions \| string                   | 'keyboard_arrow_down' | Sets the expand icon                                                                                                     |
| hideArrows    | boolean                                  | false                 | Whether to hide the arrow icons.                                                                                         |
| mode          | "compact" \| "default"                   | 'default'             | Controls the display mode of the accordion component.                                                                    |
| type          | "divided" \| "grouped"                   | 'grouped'             | Sets accordion style for the component.                                                                                  |

**Events**

| Name                       | Detail                                   | Description                                |
| -------------------------- | ---------------------------------------- | ------------------------------------------ |
| tk-accordion-item-selected | IAccordionItemSelect                     | Emitted when an accordion item is selected |
| tk-active-index-change     | (string \| number)[] \| number \| string | Emitted when an active index is changed    |

**Slots**

| Name    | Description                                        |
| ------- | -------------------------------------------------- |
| default | Default slot to detect TkAccordionItem components. |

---

### tk-accordion-item

Individual collapsible panel within a tk-accordion container.

**Props**

| Name    | Type                   | Default | Description                          |
| ------- | ---------------------- | ------- | ------------------------------------ |
| active  | boolean                |         | Sets if the accordion is active.     |
| header  | string                 |         | Header text to display.              |
| icon    | IIconOptions \| string |         | Icon for accordion component.        |
| itemKey | number \| string       |         | Optional key for the accordion item. |
| size    | "base" \| "large"      | 'base'  | Sets size for the component.         |

**Events**

| Name             | Detail  | Description                             |
| ---------------- | ------- | --------------------------------------- |
| tk-active-change | boolean | Emitted when an active index is changed |

**Slots**

| Name    | Description                                                        |
| ------- | ------------------------------------------------------------------ |
| content | Custom content template.                                           |
| header  | Custom header template that overrides the header prop if provided. |

---

### tk-card

TkCard component description.

**Props**

| Name              | Type                                                                                                                                                                                                    | Default                                                    | Description                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| avatarProps       | any                                                                                                                                                                                                     | { severity: 'light', background: 'solid', rounded: true, } | TO DO State hata verdiği için buraya alındı, düzeltilecek TkAvatar component properties |
| containerStyle    | CSSProperties                                                                                                                                                                                           | null                                                       | The style attribute of container element                                                |
| contentStyle      | CSSProperties                                                                                                                                                                                           | null                                                       | The style attribute of content element                                                  |
| enableHoverShadow | boolean                                                                                                                                                                                                 | false                                                      | Controls whether the card shows a hover shadow effect                                   |
| footerType        | "basic" \| "divided" \| "light"                                                                                                                                                                         | 'basic'                                                    | The mode of the footer                                                                  |
| header            | string                                                                                                                                                                                                  |                                                            | The header text                                                                         |
| headerPosition    | "bottom" \| "top"                                                                                                                                                                                       | 'top'                                                      | The position of the header                                                              |
| headerType        | "basic" \| "dark" \| "divided" \| "light" \| "primary"                                                                                                                                                  | 'basic'                                                    | The type of the header                                                                  |
| hideHeader        | boolean                                                                                                                                                                                                 | false                                                      | Controls whether the header is hidden                                                   |
| horizontal        | boolean                                                                                                                                                                                                 | false                                                      | Controls whether the card is displayed horizontally                                     |
| image             | string                                                                                                                                                                                                  | null                                                       | The image source for the card                                                           |
| imageOptions      | { badge?: string; badgeIcon?: string; badgeIconPosition?: "left" \| "right"; windowed?: boolean; background?: boolean; backgroundUrl?: string; position?: "top" \| "background" \| "left" \| "right"; } | { position: 'top', background: false, windowed: true, }    | TO DO Options for the image display                                                     |
| showAvatar        | boolean                                                                                                                                                                                                 | false                                                      | Controls whether the header avatar is shown                                             |
| showMenuButton    | boolean                                                                                                                                                                                                 | false                                                      | Controls whether the menu button is shown                                               |
| subheader         | string                                                                                                                                                                                                  |                                                            | The subheader text                                                                      |

**Slots**

| Name           | Description                                 |
| -------------- | ------------------------------------------- |
| avatar         | Custom avatar template of card header.      |
| content        | Custom content template.                    |
| default        | Default slot to detect child to inner body. |
| footer         | Custom footer template.                     |
| footer-actions | Custom actions template to default footer.  |
| header         | Custom header template.                     |

---

### tk-divider

TkDivider is a component that allows you to separate different sections,
elements and content.

**Props**

| Name        | Type                       | Default      | Description                                        |
| ----------- | -------------------------- | ------------ | -------------------------------------------------- |
| mx          | number \| string           |              | Controls vertical spacing                          |
| my          | number \| string           |              | Controls horizontal spacing                        |
| orientation | "horizontal" \| "vertical" | 'horizontal' | Controls the orientation of the divider component. |

---

### tk-timeline

The `TkTimeline` is a component that displays a vertical or horizontal timeline
of events. The `TkTimelineItem` is a helper component used to create customized
content within the `TkTimeline` component.

**Props**

| Name        | Type                       | Default      | Description                                                                                                              |
| ----------- | -------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| alternate   | boolean                    | true         | Whether to alternate the position of timeline items relative to the line.                                                |
| items       | TimelineItem[]             | []           | An array of objects representing the items to display on the timeline. Each object should have at least a `title`. `d... |
| orientation | "horizontal" \| "vertical" | 'horizontal' | The orientation of the timeline.                                                                                         |

---

### tk-timeline-item

Individual item within a tk-timeline container.

---

### tk-button

TkButton is an extension to standard input element with icons and theming.

**Props**

| Name         | Type                                                                                             | Default   | Description                                                                        |
| ------------ | ------------------------------------------------------------------------------------------------ | --------- | ---------------------------------------------------------------------------------- |
| disabled     | boolean                                                                                          |           | Disables the button, preventing user interaction.                                  |
| fullWidth    | boolean                                                                                          |           | Sets the button to full-width mode, making it span the container.                  |
| href         | string                                                                                           |           | Sets the URL the button should navigate to when clicked (for type="link" buttons). |
| icon         | IIconOptions \| IMultiIconOptions \| string                                                      |           | Specifies a material icon name to be displayed.                                    |
| iconPosition | "left" \| "right"                                                                                | 'left'    | Defines the position of the icon.                                                  |
| label        | string                                                                                           | ''        | Label text displayed inside the button.                                            |
| loading      | boolean                                                                                          |           | Shows a loading icon inside the button.                                            |
| mode         | "button" \| "link" \| "reset" \| "submit"                                                        | 'button'  | Sets the button type.                                                              |
| rounded      | boolean                                                                                          |           | Makes the button round with an icon-only style.                                    |
| size         | "base" \| "large" \| "small"                                                                     | 'base'    | Sets size for the component.                                                       |
| target       | string                                                                                           |           | Specifies where to open the linked document (for type="link" buttons).             |
| type         | "elevated" \| "filled" \| "outlined" \| "text"                                                   | 'filled'  | This field specifies the design type of the component.                             |
| underline    | boolean                                                                                          |           | Applies underline styling to the button label regardless of mode.                  |
| variant      | "danger" \| "info" \| "neutral" \| "primary" \| "secondary" \| "success" \| "warning" \| "white" | 'primary' | Determines the button's variant for different styles.                              |

**Events**

| Name     | Detail     | Description                    |
| -------- | ---------- | ------------------------------ |
| tk-click | MouseEvent | Emitted when the button click. |

---

### tk-chips

The TkChip component is basically a simple UI block entity, representing for
example more advanced underlying data, such as a contact, in a compact way.

**Props**

| Name            | Type                                                                                                | Default   | Description                                                                                |
| --------------- | --------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------ |
| autoSelfDestroy | boolean                                                                                             | true      | Determines whether the chip automatically removes itself when the close button is clicked. |
| containerStyle  | CSSProperties                                                                                       | null      | Custom style to apply to the chip component.                                               |
| disabled        | boolean                                                                                             | false     | The disabled status.                                                                       |
| icon            | IIconOptions \| string                                                                              |           | Specifies a material icon name to be displayed.                                            |
| label           | string                                                                                              |           | The label to display inside the chip.                                                      |
| removable       | boolean                                                                                             | false     | This property determines whether the chip component is removable.                          |
| size            | "base" \| "large" \| "small"                                                                        | 'base'    | Sets size for the component.                                                               |
| type            | "avatar" \| "filled" \| "filledlight" \| "outlined"                                                 | 'filled'  | This field specifies the design type of the component.                                     |
| value           | any                                                                                                 |           | The value of the chips                                                                     |
| variant         | "danger" \| "info" \| "neutral" \| "primary" \| "secondary" \| "success" \| "verified" \| "warning" | 'primary' | The variant of the chip for styling.                                                       |

**Events**

| Name      | Detail | Description                                                        |
| --------- | ------ | ------------------------------------------------------------------ |
| tk-remove | any    | When an element is deleted, it is triggered. It returns the label. |

---

### tk-icon

The TkIcon component allows you to create a icon for adding visual information.

**Props**

| Name            | Type                                                                                             | Default    | Description                                                           |
| --------------- | ------------------------------------------------------------------------------------------------ | ---------- | --------------------------------------------------------------------- |
| backgroundColor | string                                                                                           |            | The background color of the sign (custom variant)                     |
| borderColor     | string                                                                                           |            | The border color of the sign (custom variant)                         |
| color           | string                                                                                           |            | The color of the icon                                                 |
| fill            | boolean                                                                                          |            | Indicates whether the icon should be filled                           |
| icon            | string                                                                                           |            | Specifies a material icon.                                            |
| iconColor       | string                                                                                           |            | The color of the icon (custom variant)                                |
| iconTag         | "i" \| "span"                                                                                    | 'i'        | The HTML tag to use for the icon element.                             |
| iconType        | "outlined" \| "rounded" \| "sharp"                                                               | 'outlined' | Specifies the type of the icon to be displayed.                       |
| sign            | boolean                                                                                          | false      | Controls whether the icon is shown as a sign (previously 'card' type) |
| size            | "base" \| "large" \| "medium" \| "small" \| "xlarge" \| "xsmall" \| "xxlarge"                    | 'base'     | Sets size for the component.                                          |
| variant         | "danger" \| "info" \| "neutral" \| "primary" \| "secondary" \| "success" \| "warning" \| "white" | 'primary'  | The variant of the icon.                                              |

---
