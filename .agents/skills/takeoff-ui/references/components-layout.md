# Layout Components Reference

API reference for Takeoff UI layout components. These components structure
content, provide visual separation, and organize sections.

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
