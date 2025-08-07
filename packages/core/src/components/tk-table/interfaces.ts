/**
 * Defines the columns for the table
 */
export interface ITableColumn {
  /** Defines the field for the column */
  field: string;
  /** Defines heading for the column */
  header: string;
  /** Defines sub heading for the column */
  subHeader?: string;
  /** Defines width for the column */
  width?: string;
  /** Indicates if the column supports sorting */
  sortable?: boolean;
  /** Custom sort function for the column, mandatory when using client-side sorting. */
  sorter?: Function;
  /** Custom filter function for the column, mandatory when using client-side filtering. */
  filter?: Function;
  /** Indicates if the column is searchable */
  searchable?: boolean;
  /** Indicates if the column is editable */
  editable?: boolean;
  /** Specifies the input type for editable columns */
  inputType?: string;
  /** Indicates if the column contains selection checkboxes */
  selectColumn?: boolean;
  /** Indicates if the column acts as an expander */
  expander?: boolean;
  /** Custom rendering function for HTML content in the column header */
  headerHtml?: Function;
  /** Custom rendering function for HTML content in the column cells */
  html?: Function;
  /** */
  fixed?: 'left' | 'right';
  /** Allows styling to be applied to the th element of the column */
  style?: any;
  /** When true, search and sort icons will only be displayed when hovering over the th element */
  showIconsOnHover?: boolean;
  /** Defines the filter type for this column (text, checkbox or radio) */
  filterType?: 'text' | 'checkbox' | 'radio';
  /** Defines options for checkbox or radio filter type */
  filterOptions?: IFilterOption[];
  /** Defines the label of the buttons */
  filterButtons?: {
    searchButton?: { label?: string };
    cancelButton?: { label?: string };
    selectAllCheckbox?: { label?: string };
  };
  filterElements?: {
    icon?: string;
    searchInput?: { placeholder?: string };
    searchButton?: { label?: string };
    cancelButton?: { label?: string };
    selectAllCheckbox?: { label?: string };
    optionsSearchInput?: { show?: boolean; placeholder?: string };
  };
}

/**
 * Defines options for checkbox filter
 */
export interface IFilterOption {
  /** The value of the option */
  value: string;
  /** The display label of the option */
  label?: string;
}

export interface ITableSort {
  /** The field name being sorted */
  field: string;
  /** The sort direction */
  order: 'asc' | 'desc';
}
/** It is the return type of the tkRequest event. */
export interface ITableRequest {
  /** The current page number */
  currentPage: number;
  /** The total number of pages */
  totalPages: number;
  /** The starting index of the items on the current page */
  startItem: number;
  /** The ending index of the items on the current page */
  endItem: number;
  /** The number of rows per page */
  rowsPerPage: number;
  /** The field by which the table is sorted */
  sortField?: string;
  /** The order of sorting: 'asc' or 'desc' */
  sortOrder?: string;
  /** Array of sort information for multi-sort functionality. When multiple sorts are applied, they are processed in priority order. */
  sorts?: ITableSort[];
  /** A list of filters applied to the table */
  filters: ITableFilter[];
}

/** Represents a filter applied to a table */
export interface ITableFilter {
  /** The value of the filter - string for text/radio filter, string array for checkbox filter */
  value?: string | string[];
  /** The field to which the filter is applied */
  field: string;
  /** The type of the filter (text, checkbox or radio) */
  type?: 'text' | 'checkbox' | 'radio';
}

/** It is the return type of the tkCellEdit event. */
export interface ITableCellEdit {
  /** The unique identifier of the row being edited. Contains the value of the dataKey prop in the edited row */
  rowId: string;
  /** The index of the row being edited */
  rowIndex: number;
  /** The field being edited */
  field: string;
  /** The new value for the field */
  value: string;
}

export interface ICustomElement {
  ref: HTMLElement;
  element: HTMLElement;
}

export interface ITableExportOptions {
  /** only works when type is `pdf`. Default value is `vertical` */
  orientation?: 'horizontal' | 'vertical';
  /** */
  fileName?: string;
  /** */
  type?: 'csv' | 'pdf' | 'excel';
  /** `all` working only client side pagination. Default value is `current-page` */
  scope?: 'current-page' | 'selected' | 'all';
  /** Ignore Columns Fields array for only excel export */
  ignoreColumnsFields?: string[];
  /** Columns for only excel export */
  columns?: ITableExportExcelColumn[];
  /** */
  externalData?: any[];
}

export interface ITableExportExcelColumn {
  header: string;
  field: string;
  width: number;
}
