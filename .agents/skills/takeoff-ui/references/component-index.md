# Takeoff UI Component Index

Quick-reference catalog of all 48 Takeoff UI components, organized by category.

---

## Form Components

| Tag                      | React/Vue Import      | Description                                                                      | Key Props                                                     |
| ------------------------ | --------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `tk-input`               | `TkInput`             | Captures text input from the user.                                               | `value`, `label`, `placeholder`, `disabled`, `size`           |
| `tk-textarea`            | `TkTextarea`          | Multi-line text input with customizable size, validation, and styling options.   | `value`, `label`, `placeholder`, `rows`, `maxLength`          |
| `tk-select`              | `TkSelect`            | Dropdown selection component with filtering, grouping, and multi-select support. | `value`, `options`, `label`, `multiple`, `filter`             |
| `tk-checkbox`            | `TkCheckbox`          | Basic checkbox element for user input.                                           | `value`, `label`, `disabled`, `indeterminate`, `size`         |
| `tk-radio`               | `TkRadio`             | Basic radio button element for user input.                                       | `value`, `label`, `checked`, `disabled`, `name`               |
| `tk-radio-group`         | `TkRadioGroup`        | Groups radio buttons together with shared state and validation.                  | `value`, `label`, `name`, `direction`, `error`                |
| `tk-toggle`              | `TkToggle`            | Toggle switch element for boolean user input.                                    | `value`, `label`, `disabled`, `size`, `icon`                  |
| `tk-toggle-button`       | `TkToggleButton`      | A button that can be toggled on/off.                                             | `value`, `label`, `selected`, `icon`, `disabled`              |
| `tk-toggle-button-group` | `TkToggleButtonGroup` | Groups toggle buttons allowing single or multi selection.                        | `value`, `type`, `direction`, `rounded`                       |
| `tk-datepicker`          | `TkDatepicker`        | Versatile date picker supporting single date and date range selection.           | `value`, `label`, `mode`, `dateFormat`, `placeholder`         |
| `tk-currency-input`      | `TkCurrencyInput`     | Currency input with country/currency selection and formatting.                   | `value`, `label`, `defaultCurrency`, `precision`, `disabled`  |
| `tk-phone-input`         | `TkPhoneInput`        | Phone number input with country selection and validation.                        | `value`, `label`, `defaultCountry`, `placeholder`, `disabled` |
| `tk-upload`              | `TkUpload`            | File upload interface for selecting and uploading files.                         | `value`, `accept`, `multiple`, `maxFileSize`, `dragDrop`      |
| `tk-color-picker`        | `TkColorPicker`       | Color selection interface with various input formats.                            | `value`, `label`, `format`, `presets`, `inline`               |
| `tk-slider`              | `TkSlider`            | Slider control for selecting numeric values or ranges.                           | `value`, `min`, `max`, `step`, `range`                        |
| `tk-editor`              | `TkEditor`            | WYSIWYG editor component wrapping Tiptap editor.                                 | `value`, `label`, `toolbar`, `placeholder`, `disabled`        |

## Data Display Components

| Tag               | React/Vue Import | Description                                                                       | Key Props                                                    |
| ----------------- | ---------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `tk-table`        | `TkTable`        | Displays data in a tabular format with sorting, pagination, and selection.        | `data`, `columns`, `selectionMode`, `rowsPerPage`, `loading` |
| `tk-pagination`   | `TkPagination`   | Pagination control for navigating paged data.                                     | `currentPage`, `totalItems`, `rowsPerPage`, `mode`, `type`   |
| `tk-chart`        | `TkChart`        | Visualizes data in various chart formats using Chart.js.                          | `data`, `type`, `options`, `height`, `width`                 |
| `tk-org-chart`    | `TkOrgChart`     | Visualizes organizational data using d3-org-chart.                                | `data`, `options`, `collapsible`, `accessibilityLabel`       |
| `tk-tree-view`    | `TkTreeView`     | Displays hierarchical data in a tree structure with expandable/collapsible nodes. | `items`, `value`, `selectable`, `expandAll`, `type`          |
| `tk-badge`        | `TkBadge`        | Small badge for adding contextual information such as counts or labels.           | `label`, `type`, `size`, `count`, `dot`                      |
| `tk-avatar`       | `TkAvatar`       | Represents a user or brand with an image, initials, or icon.                      | `image`, `label`, `size`, `rounded`, `badge`                 |
| `tk-avatar-group` | `TkAvatarGroup`  | Groups multiple avatars together in a compact layout.                             | `compact`                                                    |
| `tk-rating`       | `TkRating`       | Customizable rating input element for selecting a value from a series.            | `value`, `maxRating`, `type`, `disabled`, `readonly`         |

## Feedback Components

| Tag           | React/Vue Import | Description                                                                    | Key Props                                                           |
| ------------- | ---------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| `tk-alert`    | `TkAlert`        | Displays contextual feedback messages such as success, warnings, or errors.    | `type`, `header`, `message`, `removable`, `variant`                 |
| `tk-dialog`   | `TkDialog`       | Customizable modal dialog for displaying information or requesting user input. | `visible`, `header`, `variant`, `headerType`, `preventDismiss`      |
| `tk-drawer`   | `TkDrawer`       | Container component displayed as a slide-in overlay panel.                     | `open`, `header`, `position`, `headerType`, `footerType`            |
| `tk-spinner`  | `TkSpinner`      | Loading spinner indicator.                                                     | `size`, `type`, `label`, `orientation`                              |
| `tk-tooltip`  | `TkTooltip`      | Displays additional information when an element is hovered over.               | `header`, `description`, `position`, `variant`, `icon`              |
| `tk-popover`  | `TkPopover`      | Displays additional information or content when triggered.                     | `position`, `trigger`, `type`, `containerStyle`                     |
| `tk-carousel` | `TkCarousel`     | Content slider component with autoplay and navigation options.                 | `itemsPerView`, `autoplay`, `circular`, `showArrows`, `orientation` |

## Navigation Components

| Tag                  | React/Vue Import   | Description                                                   | Key Props                                                   |
| -------------------- | ------------------ | ------------------------------------------------------------- | ----------------------------------------------------------- |
| `tk-tabs`            | `TkTabs`           | Navigation component that displays menu items as tab headers. | `activeIndex`, `type`, `orientation`, `size`, `variant`     |
| `tk-tabs-item`       | `TkTabsItem`       | Individual tab item within a TkTabs component.                | `label`, `icon`, `disabled`, `badged`, `badgeCount`         |
| `tk-stepper`         | `TkStepper`        | Step-by-step workflow navigation component.                   | `active`, `orientation`, `mode`, `linear`, `size`           |
| `tk-step`            | `TkStep`           | Individual step sub-component within TkStepper.               | `header`, `subheader`, `icon`, `complete`, `disabled`       |
| `tk-breadcrumb`      | `TkBreadcrumb`     | Navigational aid for tracking location within an application. | `model`, `separator`, `separatorIcon`, `type`               |
| `tk-breadcrumb-item` | `TkBreadcrumbItem` | Individual breadcrumb item within a TkBreadcrumb.             | `label`, `href`, `icon`, `isCurrent`, `isExternal`          |
| `tk-dropdown`        | `TkDropdown`       | Creates a dropdown menu with a trigger element.               | `options`, `disabled`, `position`, `size`, `optionLabelKey` |

## Layout Components

| Tag                 | React/Vue Import  | Description                                                              | Key Props                                                       |
| ------------------- | ----------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------- |
| `tk-accordion`      | `TkAccordion`     | Organizes content under collapsible headers for expandable sections.     | `activeIndex`, `allowMultiple`, `type`, `mode`, `arrowPosition` |
| `tk-accordion-item` | `TkAccordionItem` | Individual collapsible item within a TkAccordion.                        | `header`, `active`, `icon`, `itemKey`, `size`                   |
| `tk-card`           | `TkCard`          | Container component for grouping related content with header and footer. | `header`, `subheader`, `image`, `headerType`, `footerType`      |
| `tk-divider`        | `TkDivider`       | Separates different sections, elements, and content.                     | `orientation`, `mx`, `my`                                       |
| `tk-timeline`       | `TkTimeline`      | Displays a vertical or horizontal timeline of events.                    | `items`, `orientation`, `alternate`                             |
| `tk-timeline-item`  | `TkTimelineItem`  | Individual timeline entry for custom timeline content.                   | _(slot-based)_                                                  |
| `tk-button`         | `TkButton`        | Extension to standard button element with icons and theming.             | `label`, `type`, `variant`, `icon`, `disabled`                  |
| `tk-chips`          | `TkChips`         | Simple UI block entity representing tags, labels, or data.               | `label`, `type`, `variant`, `removable`, `icon`                 |
| `tk-icon`           | `TkIcon`          | Renders icons with customizable size, color, and styling.                | `icon`, `size`, `color`, `fill`, `variant`                      |

---

**Import pattern:**

```jsx
// React
import { TkButton, TkInput } from '@takeoff-ui/react';

// Vue
import { TkButton, TkInput } from '@takeoff-ui/vue';

// Angular
import { TkButton, TkInput } from '@takeoff-ui/angular';
```
