# Data Display Components Reference

API reference for Takeoff UI data display components. These components present
data in structured formats like tables, charts, trees, visual indicators,
timelines, and media content.

---

### tk-table

TkTable is a component that allows you to display data in a tabular manner. It's
generally called a datatable.

**Props**

| Name                          | Type                                    | Default                                       | Description                                                                                                                                                                                                                                                                     |
| ----------------------------- | --------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| applyPageOnBlur               | boolean                                 | true                                          | Whether leaving the pagination page input applies the typed page number. When false, the page only changes on Enter or on a click on the input's icon.                                                                                                                          |
| cardTitle                     | string                                  | ''                                            |                                                                                                                                                                                                                                                                                 |
| cellStyle                     | (row: any, column: ITableColumn) => any |                                               | Provides a function to customize cell styles. This function takes the row and column information and returns the style object for a specific cell.                                                                                                                              |
| collapsibleGroups             | boolean                                 | false                                         | If true, group headers will have an expand/collapse button to show/hide the rows in that group.                                                                                                                                                                                 |
| columns                       | ITableColumn[]                          | []                                            | The column definitions (Array of Objects)                                                                                                                                                                                                                                       |
| containerStyle                | CSSStyleProperties                      | null                                          | The style attribute of container element                                                                                                                                                                                                                                        |
| data                          | any[]                                   | []                                            | Rows of data to display                                                                                                                                                                                                                                                         |
| dataKey                       | string                                  |                                               | Property of each row that defines the unique key of each row                                                                                                                                                                                                                    |
| expandedRowStyle              | (row: any) => any                       |                                               | Provides a function to customize expanded row styles. This function takes row information and returns the style object for the expanded row content.                                                                                                                            |
| expandedRows                  | any[]                                   | []                                            | Specifies which rows are expanded to show additional content.                                                                                                                                                                                                                   |
| groupBy                       | string                                  |                                               | Column field name to group the table data by. When specified, the table will automatically group rows by unique values in this column. Set to null or undefined to disable grouping. This makes the component controlled - changes should be handled via tkGroupByChange event. |
| headerType                    | "basic" \| "dark" \| "primary"          | 'basic'                                       | Style to apply to header of table                                                                                                                                                                                                                                               |
| horizontalScrollPosition      | "both" \| "bottom" \| "top"             | 'bottom'                                      | Where the horizontal scrollbar of the table is placed. 'top' and 'both' keep it reachable when the table is taller than the viewport.                                                                                                                                           |
| itemsReportTemplate           | string                                  | 'item: {startItem}-{endItem} of {totalItems}' | Template string for items report in pagination. Available placeholders: {startItem}, {endItem}, {totalItems}                                                                                                                                                                    |
| loading                       | boolean                                 |                                               | Displays a loading indicator while data is being fetched or processed.                                                                                                                                                                                                          |
| multiSort                     | boolean                                 | false                                         | Enables multi-column sorting.                                                                                                                                                                                                                                                   |
| pageReportTemplate            | string                                  | 'page: {currentPage} of {totalPages}'         | Template string for current page report in pagination. Available placeholders: {currentPage}, {totalPages}                                                                                                                                                                      |
| paginationMethod              | string                                  |                                               | Defines whether pagination is handled on the client or server side.                                                                                                                                                                                                             |
| paginationType                | "grouped" \| "outlined" \| "text"       | 'outlined'                                    | The type of the pagination                                                                                                                                                                                                                                                      |
| preserveSelectionOnPagination | boolean                                 | false                                         | Preserves selected rows when the pagination page or server-side page data changes.                                                                                                                                                                                              |
| rowStyle                      | (row: any, index?: number) => any       |                                               | Provides a function to customize row styles. This function takes row information and row index, and returns the style object for a specific row.                                                                                                                                |
| rowsPerPage                   | number                                  | 6                                             | Number of items per page.                                                                                                                                                                                                                                                       |
| rowsPerPageOptions            | number[]                                |                                               | Number of rows per page options                                                                                                                                                                                                                                                 |
| scrollbarSize                 | "base" \| "large" \| "thin"             | 'base'                                        | Size of the table scrollbars. Every size keeps a thin bar that widens on hover; larger sizes leave a bigger area to grab.                                                                                                                                                       |
| selection                     | any                                     | []                                            | List of the selected                                                                                                                                                                                                                                                            |
| selectionMode                 | "checkbox" \| "radio"                   |                                               | Determines how rows can be selected, either with radio buttons (single selection) or checkboxes (multiple selection).                                                                                                                                                           |
| selectionRowDisabled          | Function                                |                                               | A function that returns true if the row should be disabled                                                                                                                                                                                                                      |
| size                          | "base" \| "small" \| "xsmall"           | 'base'                                        | Sets size for the component.                                                                                                                                                                                                                                                    |
| striped                       | boolean                                 | false                                         | Enables or disables alternating row background colors for easier readability.                                                                                                                                                                                                   |
| totalItems                    | number                                  |                                               | Number of total items.                                                                                                                                                                                                                                                          |

**Events**

| Name                    | Detail             | Description                                                                                                                                                                                                                                                      |
| ----------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tk-cell-edit            | ITableCellEdit     | Emitted when a cell is edited.                                                                                                                                                                                                                                   |
| tk-column-resize        | ITableColumnResize | Emitted once a column resize ends (on mouse up), not while dragging. Carries the resized column's field and width, plus the current widths of every column, so they can be persisted and passed back as `width` on the column definitions to restore the layout. |
| tk-expanded-rows-change | any[]              | Emitted when the expanded rows change.                                                                                                                                                                                                                           |
| tk-group-by-change      | string \| null     | Emitted when the groupBy value changes. Always emitted for both controlled and uncontrolled components. For controlled components, handle this event to update the groupBy prop.                                                                                 |
| tk-request              | ITableRequest      | Emitted when a request needs to be made to the server.                                                                                                                                                                                                           |
| tk-row-click            | any                | Emitted when a row is clicked.                                                                                                                                                                                                                                   |
| tk-selection-change     | any[] \| any       |                                                                                                                                                                                                                                                                  |

**Methods**

| Name           | Signature                                                                                      | Description                                                                                                                                                                                                                                                                                                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| clearFilters   | clearFilters(columns?: string[]) => Promise<void>                                              | Clears all filters or specific column filters                                                                                                                                                                                                                                                                                                                                        |
| clearGrouping  | clearGrouping() => Promise<void>                                                               | Clears the current grouping and returns to normal table view Always emits tkGroupByChange event with null value. For uncontrolled components, also clears internal state.                                                                                                                                                                                                            |
| clearSorting   | clearSorting() => Promise<void>                                                                | Clears all sorting for server side pagination                                                                                                                                                                                                                                                                                                                                        |
| exportFile     | exportFile(options: ITableExportOptions) => Promise<void>                                      | Exports the table data to a file                                                                                                                                                                                                                                                                                                                                                     |
| getFilters     | getFilters() => Promise<ITableFilter[]>                                                        | Returns the current filters                                                                                                                                                                                                                                                                                                                                                          |
| getSorting     | getSorting() => Promise<ITableSort[] \| { field: string; order: "desc" \| "asc"; }>            | Returns the current sorting settings                                                                                                                                                                                                                                                                                                                                                 |
| groupByColumn  | groupByColumn(columnField: string) => Promise<void>                                            | Groups table data by the specified column field Creates group header rows that display the unique value and count of items in that group. For example, if you have a 'status' column with values 'Open' and 'Closed', this will create group headers like "Open (5)" and "Closed (3)". Always emits tkGroupByChange event. For uncontrolled components, also updates internal state. |
| runFilters     | runFilters() => Promise<void>                                                                  | Applies the current filters to the data for client side pagination                                                                                                                                                                                                                                                                                                                   |
| serverRequest  | serverRequest() => Promise<void>                                                               | Allows tk-request event to be triggered manually                                                                                                                                                                                                                                                                                                                                     |
| setCurrentPage | setCurrentPage(page: number) => Promise<void>                                                  | Sets the current page for pagination                                                                                                                                                                                                                                                                                                                                                 |
| setFilters     | setFilters(filters: ITableFilter[]) => Promise<void>                                           | Sets the current filter settings                                                                                                                                                                                                                                                                                                                                                     |
| setSorting     | setSorting(sorts: ITableSort[] \| { field: string; order: "asc" \| "desc"; }) => Promise<void> | Sets the current sorting settings                                                                                                                                                                                                                                                                                                                                                    |

**Slots**

| Name         | Description                                                                                     |
| ------------ | ----------------------------------------------------------------------------------------------- |
| body-footer  | Custom independent rows at the bottom of tbody (e.g., totals, summary, or additional data rows) |
| body-header  | Custom independent rows at the top of tbody (e.g., summary, totals, or custom data rows)        |
| empty-data   | Set how the table will appear when there is no data                                             |
| empty-filter |                                                                                                 |
| header-right |                                                                                                 |

---

### tk-pagination

TkPagination component description.

**Props**

| Name                | Type                              | Default                                       | Description                                                                                                                                 |
| ------------------- | --------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| applyPageOnBlur     | boolean                           | true                                          | Whether leaving the page input applies the typed page number. When false, the page only changes on Enter or on a click on the input's icon. |
| currentPage         | number                            | 1                                             | The current page of the pagination.                                                                                                         |
| itemsReportTemplate | string                            | 'item: {startItem}-{endItem} of {totalItems}' | Template string for items report in pagination. Available placeholders: {startItem}, {endItem}, {totalItems}                                |
| mode                | "compact" \| "compact-expanded"   |                                               | The mode of the pagination                                                                                                                  |
| pageReportTemplate  | string                            | 'page: {currentPage} of {totalPages}'         | Template string for current page report in pagination. Available placeholders: {currentPage}, {totalPages}                                  |
| rounded             | boolean                           | false                                         | Whether the pagination elements should have rounded corners                                                                                 |
| rowsPerPage         | number                            | 10                                            | Number of items per page.                                                                                                                   |
| rowsPerPageOptions  | number[]                          | [5, 10, 20, 50]                               | Number of items per page options                                                                                                            |
| totalItems          | number                            | 0                                             | Number of total items.                                                                                                                      |
| type                | "grouped" \| "outlined" \| "text" | 'outlined'                                    | The type of the pagination                                                                                                                  |

**Events**

| Name                    | Detail                                                                   | Description                        |
| ----------------------- | ------------------------------------------------------------------------ | ---------------------------------- |
| tk-next-page            | { page: number }                                                         | Pagination next button click event |
| tk-page-change          | { page: number; totalPages: number; startItem: number; endItem: number } | Pagination page change event       |
| tk-prev-page            | { page: number }                                                         | Pagination prev button click event |
| tk-rows-per-page-change | number                                                                   | RowsPerPage change event           |

---

### tk-chart

The TkChart component allows users to visualize data in various chart formats
using Chart.js.

**Props**

| Name               | Type                                                                                                                                                                                                                               | Default | Description                                                                                                                                                                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accessibilityLabel | string                                                                                                                                                                                                                             |         | Accessibility label for the chart                                                                                                                                                                                                           |
| data               | ChartData<keyof ChartTypeRegistry, (number \| Point \| [number, number] \| BubbleDataPoint)[], unknown>                                                                                                                            |         | Chart data prop is used to define chart data supported by the Chart.js library. With this prop, you can specify chart data described in the Chart.js documentation (https://www.chartjs.org/docs/latest/general/data-structures.html).      |
| height             | number                                                                                                                                                                                                                             | null    | Height of the chart container in pixels                                                                                                                                                                                                     |
| options            | CoreChartOptions<keyof ChartTypeRegistry> & ElementChartOptions<keyof ChartTypeRegistry> & PluginChartOptions<keyof ChartTypeRegistry> & DatasetChartOptions<keyof ChartTypeRegistry> & ScaleChartOptions<keyof ChartTypeRegistry> |         | Chart options prop is used to define chart options supported by the Chart.js library. With this prop, you can specify any chart options described in the Chart.js documentation (https://www.chartjs.org/docs/latest/general/options.html). |
| plugins            | any[]                                                                                                                                                                                                                              | []      | Custom plugins to use with chart                                                                                                                                                                                                            |
| type               | "bar" \| "bubble" \| "doughnut" \| "line" \| "pie" \| "polarArea" \| "radar" \| "scatter"                                                                                                                                          | 'bar'   | The type of chart to render                                                                                                                                                                                                                 |
| width              | string                                                                                                                                                                                                                             | null    | Width of the chart container                                                                                                                                                                                                                |

**Methods**

| Name           | Signature                                              | Description                   |
| -------------- | ------------------------------------------------------ | ----------------------------- |
| getBase64Image | getBase64Image() => Promise<string \| undefined>       | Get base64 image of the chart |
| getCanvas      | getCanvas() => Promise<HTMLCanvasElement \| undefined> | Get the canvas element        |
| getChart       | getChart() => Promise<any>                             | Get the chart instance        |
| refresh        | refresh() => Promise<void>                             | Refresh the chart             |

---

### tk-gantt-chart

TkGanttChart is a display-only Gantt chart component with expandable tasks,
configurable view types (weekly, monthly, quarterly, yearly), two-layer headers,
indicators, weekend/holiday highlighting, and customisable tooltips / task bars.

**Props**

| Name                | Type                                             | Default                                                                                                                                                                   | Description                                                                                                                                                 |
| ------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| columns             | IGanttColumn[]                                   | [ { field: 'name', header: 'Task Name', width: '200px' }, { field: 'startDate', header: 'Start', width: '100px' }, { field: 'endDate', header: 'End', width: '100px' }, ] | Column definitions for the left-side task list panel. Columns are fed from the task data.                                                                   |
| containerStyle      | CSSStyleProperties                               |                                                                                                                                                                           | Custom CSS style applied to the root container element.                                                                                                     |
| hidePanel           | boolean                                          | false                                                                                                                                                                     | Whether to hide the left-side task list panel.                                                                                                              |
| highlightWeekends   | boolean                                          | true                                                                                                                                                                      | Whether to highlight weekend columns with a different background.                                                                                           |
| holidays            | IGanttHoliday[]                                  | []                                                                                                                                                                        | Array of holiday dates to highlight on the timeline.                                                                                                        |
| indicators          | IGanttIndicator[]                                | []                                                                                                                                                                        | Array of indicator lines rendered on the timeline (e.g. today, startDate, freezeDate).                                                                      |
| locale              | string                                           | 'default'                                                                                                                                                                 | Locale string for date formatting (e.g. 'tr-TR', 'en-US'). Uses native `toLocaleString` under the hood.                                                     |
| panelWidth          | number                                           | 320                                                                                                                                                                       | Width of the left-side task list panel in pixels.                                                                                                           |
| rowHeight           | number                                           | 40                                                                                                                                                                        | Row height in pixels.                                                                                                                                       |
| secondaryHeaderMode | "days" \| "weeks"                                | 'days'                                                                                                                                                                    | Secondary header display mode. - `'days'` shows individual day numbers or day names - `'weeks'` shows week numbers (W1, W2 … / H1, H2 … for Turkish locale) |
| showTodayIndicator  | boolean                                          | true                                                                                                                                                                      | Whether to automatically show a today indicator line.                                                                                                       |
| taskBarHtml         | (task: IGanttTask) => string \| HTMLElement      |                                                                                                                                                                           | Custom task bar render function. Receives the task and should return an HTMLElement or an HTML string.                                                      |
| tasks               | IGanttTask[]                                     | []                                                                                                                                                                        | Array of tasks to display. Each task may contain nested children for sub-tasks.                                                                             |
| tooltipHtml         | (task: IGanttTask) => string \| HTMLElement      |                                                                                                                                                                           | Custom tooltip render function. Receives the hovered task and should return an HTMLElement or an HTML string.                                               |
| viewType            | "monthly" \| "quarterly" \| "weekly" \| "yearly" |                                                                                                                                                                           | Timeline view type. When not set the component auto-fits based on the task date range.                                                                      |
| weekStartDay        | 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6                  | 1                                                                                                                                                                         | Day the week starts on (0 = Sunday … 6 = Saturday).                                                                                                         |

**Events**

| Name           | Detail                                  | Description                                                           |
| -------------- | --------------------------------------- | --------------------------------------------------------------------- |
| tk-task-click  | IGanttTask                              | Emitted when a task bar is clicked. Detail contains the clicked task. |
| tk-task-toggle | { task: IGanttTask; expanded: boolean } | Emitted when a task row is expanded or collapsed.                     |

**Slots**

| Name  | Description                             |
| ----- | --------------------------------------- |
| empty | Content to show when there are no tasks |

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

| Name                | Type                            | Default      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------- | ------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| badgeOptions        | IBadgeOptions                   |              | Badge customization options for children count display.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| branchIcon          | string                          | ''           | Icon for branch items (items with children). When empty, no icon is shown.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| containerStyle      | CSSStyleProperties              | null         | The style attribute of container element                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| disabled            | boolean                         | false        | If true, disables all interaction with the tree view.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| expandAll           | boolean                         | false        | If true, expands all nodes in basic mode. **Note:** This prop is ignored when expandedKeys is provided.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| expandedKeys        | string[]                        |              | Array of keys that should be expanded. **Usage:** Provide an array of item keys: `["atakan", "mehmet", "4"]` Each key must be unique in the tree structure                                                                                                                                                                                                                                                                                                                                                                                                                |
| items               | ITreeItem[]                     | []           | Array of tree items data. This is the primary way to provide data to the tree view.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| lazy                | boolean                         | false        | If true, branches are loaded on demand rather than handed over up front. Expanding a branch whose children are missing emits `tk-load` instead of rendering nothing, and the fetch itself belongs to the consumer. **Note:** Branches that are not loaded yet have to be marked with `hasChildren: true`, otherwise they cannot be told apart from a leaf and cannot be expanded at all. Items also need a `key`, since `loadingKeys` and `loadedKeys` address them by key. `expandAll` is ignored while this is set, because the tree it would expand is not loaded yet. |
| leafIcon            | string                          | ''           | Icon for leaf items (items without children). When empty, no icon is shown.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| loadedKeys          | string[]                        | []           | Keys of the branches whose children have already been fetched. A branch listed here never emits `tk-load` again, and leaving a failed branch off the list is what allows it to be retried. **Note:** This is optional. A branch that came back with children is already recognised as loaded, so the only case that needs this list is a branch that came back empty and should still read as a branch. Marking such a branch `hasChildren: false` instead turns it into a leaf and takes its arrow away.                                                                 |
| loadingKeys         | string[]                        | []           | Keys of the branches whose children are being fetched right now. Each of them shows a spinner in place of its toggle icon until its key is taken off the list.                                                                                                                                                                                                                                                                                                                                                                                                            |
| mode                | "basic" \| "stepper"            | 'basic'      | Tree view mode: 'basic' or 'stepper'.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| selectAll           | boolean                         | false        | If true, shows a "Select All" checkbox above the tree items. Only effective when `selectable` is true.                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| selectAllLabel      | string                          | 'Select All' | Label for the "Select All" checkbox row.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| selectable          | boolean                         | false        | If true, enables checkbox selection for tree items.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| selectionStrategy   | "all" \| "leaf"                 | 'all'        | Selection strategy for checkboxes: **all:** selecting a node selects the node itself and all descendants **leaf:** selecting a node selects only leaf descendants (and leaf itself if it is a leaf)                                                                                                                                                                                                                                                                                                                                                                       |
| showBadge           | boolean                         | true         | Show/hide the badge for children count on directories.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| showPointer         | boolean                         | true         | Show/hide the pointer icon for selected items.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| showZeroCountBadges | boolean                         | true         | Show/hide badges with zero count. Default is true. When false, badges with 0 count will be hidden (works for both selected count and children count).                                                                                                                                                                                                                                                                                                                                                                                                                     |
| size                | "base" \| "large" \| "small"    | 'base'       | Tree view size: 'large', 'base' or 'small'.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| stepStyle           | CSSStyleProperties              | null         | The style attribute of column element for stepper mode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| toggleTrigger       | "icon" \| "item"                | 'item'       | Determines which part of a branch item toggles its expanded state                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| type                | "basic" \| "divided" \| "light" | 'basic'      | Tree view type: 'basic', 'divided', or 'light'.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| value               | string[]                        |              | The value of the selected tree item.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

**Events**

| Name             | Detail    | Description                                                                                                                                                                                               |
| ---------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tk-change        | string[]  | Event emitted when the selected value changes.                                                                                                                                                            |
| tk-expand-change | string[]  | Event emitted when the expanded paths change in controlled mode. Emits an array of keys (e.g., ["4", "13"]) representing the expanded items. Only the keys of expanded items are emitted, not full paths. |
| tk-item-click    | ITreeItem | Event emitted when a tree item is clicked.                                                                                                                                                                |
| tk-load          | ITreeLoad | Event emitted when an expanded branch needs its children. Only fires while `lazy` is set, and only for a branch that has no children and is listed in neither `loadingKeys` nor `loadedKeys`.             |

---

### tk-badge

The TkBadge component allows you to create a small badge for adding information
like contextual data that needs to stand out and get noticed. It is also often
useful in combination with other elements like a user avatar to show a number of
new messages.

**Props**

| Name         | Type                                                                                                                                              | Default   | Description                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------- |
| count        | number \| string                                                                                                                                  |           | Defines the number for the element.                           |
| dot          | boolean                                                                                                                                           | false     | If true, shows a small dot on the badge.                      |
| fullWidth    | boolean                                                                                                                                           | false     | If true, the badge will take the full width of its container. |
| icon         | IIconOptions \| IMultiIconOptions \| string                                                                                                       |           | Specifies a material icon name to be displayed.               |
| iconPosition | "left" \| "right"                                                                                                                                 | 'left'    | Defines the position of the icon.                             |
| label        | string                                                                                                                                            |           | Defines the label for the element.                            |
| rounded      | boolean                                                                                                                                           | false     | Makes the badge corners rounded.                              |
| size         | "base" \| "large" \| "small"                                                                                                                      | 'base'    | Sets size for the component.                                  |
| type         | "filled" \| "filledlight" \| "outlined" \| "text"                                                                                                 | 'filled'  | This field specifies the design type of the component.        |
| variant      | "business" \| "cyan" \| "danger" \| "info" \| "neutral" \| "primary" \| "purple" \| "secondary" \| "success" \| "teal" \| "verified" \| "warning" | 'primary' | Determines the badge's variant for different styles.          |

**Slots**

| Name      | Description      |
| --------- | ---------------- |
| (default) | The default slot |

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

**Slots**

| Name      | Description      |
| --------- | ---------------- |
| (default) | The default slot |

---

### tk-carousel

The `TkCarousel` is a content slider component with various options.

**Props**

| Name                | Type                                                    | Default       | Description                                                                                                                                       |
| ------------------- | ------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| autoplay            | boolean                                                 | false         | Controls whether the carousel should autoplay                                                                                                     |
| autoplayDelay       | number                                                  | 3000          | Controls the interval of the autoplay in milliseconds                                                                                             |
| circular            | boolean                                                 | true          | Controls whether it should loop back to the start after reaching the end                                                                          |
| itemsPerView        | number                                                  | 1             | Number of items to show per view                                                                                                                  |
| navigationPlacement | "inside" \| "outside"                                   | 'inside'      | Placement of the navigation indicators                                                                                                            |
| navigationPosition  | "bottom" \| "distributed" \| "left" \| "right" \| "top" | 'distributed' | Position of the navigation indicators. For horizontal orientation: 'distributed' \| 'top' \| 'bottom' For vertical orientation: 'left' \| 'right' |
| orientation         | "horizontal" \| "vertical"                              | 'horizontal'  | Orientation of the carousel                                                                                                                       |
| showArrows          | boolean                                                 | true          | Controls whether the navigation arrows are shown                                                                                                  |
| showIndicators      | boolean                                                 | true          | Controls whether the carousel indicators are shown                                                                                                |
| showPlayerButton    | boolean                                                 | false         | Controls whether the pause/play button is shown                                                                                                   |
| verticalViewHeight  | string                                                  | '300px'       | Height of the carousel when orientation is vertical                                                                                               |

**Events**

| Name      | Detail | Description                  |
| --------- | ------ | ---------------------------- |
| tk-change | number | Emitted when item is changed |

**Slots**

| Name      | Description      |
| --------- | ---------------- |
| (default) | The default slot |

---

### tk-chips

The TkChip component is basically a simple UI block entity, representing for
example more advanced underlying data, such as a contact, in a compact way.
Chips can contain entities such as an avatar, text or an icon, optionally having
a pointer too.

**Props**

| Name            | Type                                                                                                | Default   | Description                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------- |
| autoSelfDestroy | boolean                                                                                             | true      | Determines whether the chip automatically removes itself when the close button is clicked.                |
| containerStyle  | CSSStyleProperties                                                                                  | null      | Custom style to apply to the chip component.                                                              |
| disabled        | boolean                                                                                             | false     | The disabled status.                                                                                      |
| focused         | boolean                                                                                             | false     | Marks the chip as the one holding the keyboard inside a chips input, e.g. while the arrow keys walk them. |
| fullWidth       | boolean                                                                                             | false     | If true, the chip will take the full width of its container.                                              |
| icon            | IIconOptions \| IMultiIconOptions \| string                                                         |           | Specifies a material icon name to be displayed.                                                           |
| iconPosition    | "left" \| "right"                                                                                   | 'left'    | The position of the icon relative to the label.                                                           |
| label           | string                                                                                              |           | The label to display inside the chip.                                                                     |
| removable       | boolean                                                                                             | false     | This property determines whether the chip component is removable.                                         |
| size            | "base" \| "large" \| "small"                                                                        | 'base'    | Sets size for the component.                                                                              |
| type            | "avatar" \| "filled" \| "filledlight" \| "outlined"                                                 | 'filled'  | This field specifies the design type of the component.                                                    |
| value           | any                                                                                                 |           | The value of the chips                                                                                    |
| variant         | "danger" \| "info" \| "neutral" \| "primary" \| "secondary" \| "success" \| "verified" \| "warning" | 'primary' | The variant of the chip for styling.                                                                      |

**Events**

| Name      | Detail | Description                                                        |
| --------- | ------ | ------------------------------------------------------------------ |
| tk-remove | any    | When an element is deleted, it is triggered. It returns the label. |

---

### tk-icon

The TkIcon component allows you to create a icon for adding visual information.
It is also often useful in combination with other elements. This component uses
Google's Material Symbols icons. For a complete list of available icon names,
please visit: https://fonts.google.com/icons?icon.set=Material+Symbols

<!-- skill-notes:start -->

`icon` takes any Material Symbols name (e.g. `"search"`, `"home"`, `"settings"`)
and `iconType` picks the `outlined`, `rounded` or `sharp` set. The font ships
with the `@takeoff-ui/core` stylesheet, so no extra font import is needed.

<!-- skill-notes:end -->

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
| size            | "base" \| "large" \| "medium" \| "small" \| "xlarge" \| "xsmall" \| "xxlarge" \| "xxsmall"       | 'base'     | Sets size for the component.                                          |
| variant         | "danger" \| "info" \| "neutral" \| "primary" \| "secondary" \| "success" \| "warning" \| "white" | 'primary'  | The variant of the icon.                                              |

---

### tk-timeline

The `TkTimeline` is a component that displays a vertical or horizontal timeline
of events. The `TkTimelineItem` is a helper component used to create customized
content within the `TkTimeline` component.

**Props**

| Name        | Type                       | Default      | Description                                                                                                                                               |
| ----------- | -------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| alternate   | boolean                    | true         | Whether to alternate the position of timeline items relative to the line.                                                                                 |
| items       | TimelineItem[]             | []           | An array of objects representing the items to display on the timeline. Each object should have at least a `title`. `description` and `date` are optional. |
| orientation | "horizontal" \| "vertical" | 'horizontal' | The orientation of the timeline.                                                                                                                          |

---

### tk-timeline-item

The TimelineItem component for custom timeline content. This component is used
within the `tk-timeline` component to represent individual items in a timeline.
It automatically assigns a slot name based on its index within the parent
timeline. *

**Slots**

| Name      | Description      |
| --------- | ---------------- |
| (default) | The default slot |

---
