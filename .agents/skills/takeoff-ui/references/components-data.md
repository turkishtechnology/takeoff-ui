# Data Display Components Reference

API reference for Takeoff UI data display components. These components present
data in structured formats like tables, charts, trees, and visual indicators.

---

### tk-table

TkTable is a component that allows you to display data in a tabular manner.

**Props**

| Name                 | Type                                    | Default                                       | Description                                                                                                              |
| -------------------- | --------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| cardTitle            | string                                  | ''                                            |                                                                                                                          |
| cellStyle            | (row: any, column: ITableColumn) => any |                                               | Provides a function to customize cell styles. This function takes the row and column information and returns the styl... |
| collapsibleGroups    | boolean                                 | false                                         | If true, group headers will have an expand/collapse button to show/hide the rows in that group.                          |
| columns              | ITableColumn[]                          | []                                            | The column definitions (Array of Objects)                                                                                |
| containerStyle       | CSSProperties                           | null                                          | The style attribute of container element                                                                                 |
| data                 | any[]                                   | []                                            | Rows of data to display                                                                                                  |
| dataKey              | string                                  |                                               | Property of each row that defines the unique key of each row                                                             |
| expandedRowStyle     | (row: any) => any                       |                                               | Provides a function to customize expanded row styles. This function takes row information and returns the style objec... |
| expandedRows         | any[]                                   | []                                            | Specifies which rows are expanded to show additional content.                                                            |
| groupBy              | string                                  |                                               | Column field name to group the table data by. When specified, the table will automatically group rows by unique value... |
| headerType           | "basic" \| "dark" \| "primary"          | 'basic'                                       | Style to apply to header of table                                                                                        |
| itemsReportTemplate  | string                                  | 'item: {startItem}-{endItem} of {totalItems}' | Template string for items report in pagination. Available placeholders: {startItem}, {endItem}, {totalItems}             |
| loading              | boolean                                 |                                               | Displays a loading indicator while data is being fetched or processed.                                                   |
| multiSort            | boolean                                 | false                                         | Enables multi-column sorting.                                                                                            |
| pageReportTemplate   | string                                  | 'page: {currentPage} of {totalPages}'         | Template string for current page report in pagination. Available placeholders: {currentPage}, {totalPages}               |
| paginationMethod     | string                                  |                                               | Defines whether pagination is handled on the client or server side.                                                      |
| paginationType       | "grouped" \| "outlined" \| "text"       | 'outlined'                                    | The type of the pagination                                                                                               |
| rowStyle             | (row: any, index?: number) => any       |                                               | Provides a function to customize row styles. This function takes row information and row index, and returns the style... |
| rowsPerPage          | number                                  | 6                                             | Number of items per page.                                                                                                |
| rowsPerPageOptions   | number[]                                |                                               | Number of rows per page options                                                                                          |
| selection            | any                                     | []                                            | List of the selected                                                                                                     |
| selectionMode        | "checkbox" \| "radio"                   |                                               | Determines how rows can be selected, either with radio buttons (single selection) or checkboxes (multiple selection).    |
| selectionRowDisabled | Function                                |                                               | A function that returns true if the row should be disabled                                                               |
| size                 | "base" \| "small" \| "xsmall"           | 'base'                                        | Sets size for the component.                                                                                             |
| striped              | boolean                                 | false                                         | Enables or disables alternating row background colors for easier readability.                                            |
| totalItems           | number                                  |                                               | Number of total items.                                                                                                   |

**Events**

| Name                    | Detail         | Description                                                                                                              |
| ----------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| tk-cell-edit            | ITableCellEdit | Emitted when a cell is edited.                                                                                           |
| tk-expanded-rows-change | any[]          | Emitted when the expanded rows change.                                                                                   |
| tk-group-by-change      | string         | Emitted when the groupBy value changes. Always emitted for both controlled and uncontrolled components. For controlle... |
| tk-request              | ITableRequest  | Emitted when a request needs to be made to the server.                                                                   |
| tk-row-click            | any            | Emitted when a row is clicked.                                                                                           |
| tk-selection-change     | any            |                                                                                                                          |

**Methods**

| Name           | Signature                                                                                      | Description                                                                                                              |
| -------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| clearFilters   | clearFilters(columns?: string[]) => Promise<void>                                              | Clears all filters or specific column filters                                                                            |
| clearGrouping  | clearGrouping() => Promise<void>                                                               | Clears the current grouping and returns to normal table view Always emits tkGroupByChange event with null value. For...  |
| clearSorting   | clearSorting() => Promise<void>                                                                | Clears all sorting for server side pagination                                                                            |
| exportFile     | exportFile(options: ITableExportOptions) => Promise<void>                                      | Exports the table data to a file                                                                                         |
| getFilters     | getFilters() => Promise<ITableFilter[]>                                                        | Returns the current filters                                                                                              |
| getSorting     | getSorting() => Promise<ITableSort[] \| { field: string; order: "desc" \| "asc"; }>            | Returns the current sorting settings                                                                                     |
| groupByColumn  | groupByColumn(columnField: string) => Promise<void>                                            | Groups table data by the specified column field Creates group header rows that display the unique value and count of ... |
| runFilters     | runFilters() => Promise<void>                                                                  | Applies the current filters to the data for client side pagination                                                       |
| serverRequest  | serverRequest() => Promise<void>                                                               | Allows tk-request event to be triggered manually                                                                         |
| setCurrentPage | setCurrentPage(page: number) => Promise<void>                                                  | Sets the current page for pagination                                                                                     |
| setFilters     | setFilters(filters: ITableFilter[]) => Promise<void>                                           | Sets the current filter settings                                                                                         |
| setSorting     | setSorting(sorts: ITableSort[] \| { field: string; order: "asc" \| "desc"; }) => Promise<void> | Sets the current sorting settings                                                                                        |

**Slots**

| Name        | Description                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------------- |
| body-footer | Custom independent rows at the bottom of tbody (e.g., totals, summary, or additional data rows) |
| body-header | Custom independent rows at the top of tbody (e.g., summary, totals, or custom data rows)        |
| empty-data  | Set how the table will appear when there is no data                                             |

---

### tk-pagination

TkPagination component description.

**Props**

| Name                | Type                              | Default                                       | Description                                                                                                  |
| ------------------- | --------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| currentPage         | number                            | 1                                             | The current page of the pagination.                                                                          |
| itemsReportTemplate | string                            | 'item: {startItem}-{endItem} of {totalItems}' | Template string for items report in pagination. Available placeholders: {startItem}, {endItem}, {totalItems} |
| mode                | "compact" \| "compact-expanded"   |                                               | The mode of the pagination                                                                                   |
| pageReportTemplate  | string                            | 'page: {currentPage} of {totalPages}'         | Template string for current page report in pagination. Available placeholders: {currentPage}, {totalPages}   |
| rounded             | boolean                           | false                                         | Whether the pagination elements should have rounded corners                                                  |
| rowsPerPage         | number                            | 10                                            | Number of items per page.                                                                                    |
| rowsPerPageOptions  | number[]                          | [5, 10, 20, 50]                               | Number of items per page options                                                                             |
| totalItems          | number                            | 0                                             | Number of total items.                                                                                       |
| type                | "grouped" \| "outlined" \| "text" | 'outlined'                                    | The type of the pagination                                                                                   |

**Events**

| Name                    | Detail                                                                    | Description                        |
| ----------------------- | ------------------------------------------------------------------------- | ---------------------------------- |
| tk-next-page            | { page: number; }                                                         | Pagination next button click event |
| tk-page-change          | { page: number; totalPages: number; startItem: number; endItem: number; } | Pagination page change event       |
| tk-prev-page            | { page: number; }                                                         | Pagination prev button click event |
| tk-rows-per-page-change | number                                                                    | RowsPerPage change event           |

---

### tk-chart

The TkChart component allows users to visualize data in various chart formats
using Chart.js.

**Props**

| Name               | Type                                                                                                    | Default | Description                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| accessibilityLabel | string                                                                                                  |         | Accessibility label for the chart                                                                                        |
| data               | ChartData<keyof ChartTypeRegistry, (number \| Point \| [number, number] \| BubbleDataPoint)[], unknown> |         | Chart data prop is used to define chart data supported by the Chart.js library. With this prop, you can specify chart... |
| height             | number                                                                                                  | null    | Height of the chart container in pixels                                                                                  |
| options            | CoreChartOptions<keyof ChartTypeRegistry> & ElementChartOptions<keyof ChartTypeR...                     |         | Chart options prop is used to define chart options supported by the Chart.js library. With this prop, you can specify... |
| plugins            | any[]                                                                                                   | []      | Custom plugins to use with chart                                                                                         |
| type               | "bar" \| "bubble" \| "doughnut" \| "line" \| "pie" \| "polarArea" \| "radar" \| "scatter"               | 'bar'   | The type of chart to render                                                                                              |
| width              | string                                                                                                  | null    | Width of the chart container                                                                                             |

**Methods**

| Name           | Signature                                              | Description                   |
| -------------- | ------------------------------------------------------ | ----------------------------- |
| getBase64Image | getBase64Image() => Promise<string \| undefined>       | Get base64 image of the chart |
| getCanvas      | getCanvas() => Promise<HTMLCanvasElement \| undefined> | Get the canvas element        |
| getChart       | getChart() => Promise<any>                             | Get the chart instance        |
| refresh        | refresh() => Promise<void>                             | Refresh the chart             |

---

### tk-org-chart

The TkOrgChart component allows users to visualize organizational data using
d3-org-chart.

**Props**

| Name               | Type    | Default | Description                                                                                                        |
| ------------------ | ------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| accessibilityLabel | string  |         | Accessibility label for the chart                                                                                  |
| collapsible        | boolean | true    | Enable or disable expand/collapse buttons functionality When disabled, all nodes will be automatically expanded    |
| data               | any[]   |         | Chart data should be an array of node objects with at least id, parentId (optional for root), and name properties. |
| options            | any     |         | Chart options for d3-org-chart customization                                                                       |

**Events**

| Name          | Detail | Description      |
| ------------- | ------ | ---------------- |
| tk-node-click | any    | Node click event |

**Methods**

| Name        | Signature                           | Description                      |
| ----------- | ----------------------------------- | -------------------------------- |
| addNode     | addNode(node: any) => Promise<void> | Add node to organizational chart |
| fit         | fit() => Promise<void>              | Fit chart to screen              |
| getOrgChart | getOrgChart() => Promise<any>       | Get the chart instance           |
| refresh     | refresh() => Promise<void>          | Refresh the chart                |

---

### tk-tree-view

The `TkTreeview` component displays hierarchical data in a tree structure with
expandable/collapsible nodes. Uses array-based data structure for better
performance and easier data management.

**Props**

| Name                | Type                            | Default | Description                                                                                                              |
| ------------------- | ------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| badgeOptions        | IBadgeOptions                   |         | Badge customization options for children count display.                                                                  |
| branchIcon          | string                          | ''      | Icon for branch items (items with children). When empty, no icon is shown.                                               |
| containerStyle      | CSSProperties                   | null    | The style attribute of container element                                                                                 |
| disabled            | boolean                         | false   | If true, disables all interaction with the tree view.                                                                    |
| expandAll           | boolean                         | false   | If true, expands all nodes in basic mode. **Note:** This prop is ignored when expandedKeys is provided.                  |
| expandedKeys        | string[]                        |         | Array of keys that should be expanded. **Usage:** Provide an array of item keys: `["atakan", "mehmet", "4"]` ...         |
| items               | ITreeItem[]                     | []      | Array of tree items data. This is the primary way to provide data to the tree view.                                      |
| leafIcon            | string                          | ''      | Icon for leaf items (items without children). When empty, no icon is shown.                                              |
| mode                | "basic" \| "stepper"            | 'basic' | Tree view mode: 'basic' or 'stepper'.                                                                                    |
| selectable          | boolean                         | false   | If true, enables checkbox selection for tree items.                                                                      |
| selectionStrategy   | "all" \| "leaf"                 | 'all'   | Selection strategy for checkboxes: **all:** selecting a node selects the node itself and all descendants <br /...        |
| showBadge           | boolean                         | true    | Show/hide the badge for children count on directories.                                                                   |
| showPointer         | boolean                         | true    | Show/hide the pointer icon for selected items.                                                                           |
| showZeroCountBadges | boolean                         | true    | Show/hide badges with zero count. Default is true. When false, badges with 0 count will be hidden (works for both sel... |
| size                | "base" \| "large" \| "small"    | 'base'  | Tree view size: 'large', 'base' or 'small'.                                                                              |
| stepStyle           | CSSProperties                   | null    | The style attribute of column element for stepper mode                                                                   |
| type                | "basic" \| "divided" \| "light" | 'basic' | Tree view type: 'basic', 'divided', or 'light'.                                                                          |
| value               | string[]                        |         | The value of the selected tree item.                                                                                     |

**Events**

| Name             | Detail    | Description                                                                                                              |
| ---------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| tk-change        | string[]  | Event emitted when the selected value changes.                                                                           |
| tk-expand-change | string[]  | Event emitted when the expanded paths change in controlled mode. Emits an array of keys (e.g., ["4", "13"]) represent... |
| tk-item-click    | ITreeItem | Event emitted when a tree item is clicked.                                                                               |

---

### tk-badge

The TkBadge component allows you to create a small badge for adding information
like contextual data that needs to stand out and get noticed.

**Props**

| Name         | Type                                                                                                                                              | Default   | Description                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------ |
| count        | number \| string                                                                                                                                  |           | Defines the number for the element.                    |
| dot          | boolean                                                                                                                                           | false     | If true, shows a small dot on the badge.               |
| icon         | IIconOptions \| IMultiIconOptions \| string                                                                                                       |           | Specifies a material icon name to be displayed.        |
| iconPosition | "left" \| "right"                                                                                                                                 | 'left'    | Defines the position of the icon.                      |
| label        | string                                                                                                                                            |           | Defines the label for the element.                     |
| rounded      | boolean                                                                                                                                           | false     | Makes the badge corners rounded.                       |
| size         | "base" \| "large" \| "small"                                                                                                                      | 'base'    | Sets size for the component.                           |
| type         | "filled" \| "filledlight" \| "outlined" \| "text"                                                                                                 | 'filled'  | This field specifies the design type of the component. |
| variant      | "business" \| "cyan" \| "danger" \| "info" \| "neutral" \| "primary" \| "purple" \| "secondary" \| "success" \| "teal" \| "verified" \| "warning" | 'primary' | Determines the badge's variant for different styles.   |

---

### tk-avatar

The `TkAvatar` represents a user, labels, and display the images or a brand.

**Props**

| Name           | Type                                                                 | Default   | Description                                              |
| -------------- | -------------------------------------------------------------------- | --------- | -------------------------------------------------------- |
| ariaLabelledby | string                                                               | null      | ID of the element that labels the avatar - accessibility |
| background     | "brand" \| "solid"                                                   | 'brand'   | Background style of the avatar                           |
| badge          | boolean                                                              | false     | The badge to be displayed in the avatar                  |
| badgeStatus    | "danger" \| "info" \| "success" \| "warning"                         | 'success' | The status of the badge                                  |
| hideShadow     | boolean                                                              | false     | Whether to hide the shadow effect on the avatar          |
| image          | string                                                               | null      | URL of the image to be displayed in the avatar           |
| label          | string                                                               | null      | Text label to be displayed in the avatar                 |
| name           | string                                                               | null      | Name associated with the avatar - accessibility          |
| rounded        | boolean                                                              | false     | Whether the avatar should have rounded corners           |
| size           | "base" \| "large" \| "small" \| "xlarge" \| "xsmall"                 | 'base'    | Size of the avatar                                       |
| variant        | "danger" \| "info" \| "light" \| "primary" \| "success" \| "warning" | 'primary' | Appearance of the avatar                                 |

---

### tk-avatar-group

Groups multiple tk-avatar components together with optional compact/overlap
styling.

**Props**

| Name    | Type    | Default | Description                                         |
| ------- | ------- | ------- | --------------------------------------------------- |
| compact | boolean | false   | Whether the avatars should have a shared background |

---

### tk-rating

The `TkRating` component is a customizable rating input element that allows
users to select a value from a series of icons (such as stars, hearts, or dot).

**Props**

| Name            | Type                                   | Default | Description                                                                                               |
| --------------- | -------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------- |
| disabled        | boolean                                | false   | The user cannot interact with the input.                                                                  |
| maxRating       | number                                 | 5       | The maximum rating value. Possible options are 5 or 10.                                                   |
| readonly        | boolean                                | false   | If `true`, the user cannot modify the value.                                                              |
| showRatingValue | boolean                                | false   | Determines whether to show the numerical rating value under to the icon.                                  |
| type            | "dot" \| "heart" \| "number" \| "star" | 'star'  | The type of icon to display for each rating element. Options include 'star', 'heart', 'dot' and 'number'. |
| value           | number                                 | 0       | The currently selected rating value.                                                                      |

**Events**

| Name      | Detail | Description                         |
| --------- | ------ | ----------------------------------- |
| tk-change | number | Emitted when the value has changed. |

---
