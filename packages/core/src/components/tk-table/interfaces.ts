import { IInputMaskOptions } from '../tk-input/interfaces';
import { CSSStyleProperties } from '../../global/types';
import { IDateSelection } from '../tk-datepicker/interfaces';
import { IIconOptions, IMultiIconOptions } from '../../global/interfaces/IIconOptions';
import { ITreeItem } from '../tk-treeview/interfaces';
import { IBadgeOptions } from '../../global/interfaces/IBadgeOptions';

type TableFilterValue = ITableFilter['value'];
type TableRowData = Record<string, unknown>;
type TableSorter = (a: TableRowData, b: TableRowData) => number;
type TableFilterFn = (value: TableFilterValue, row: TableRowData) => boolean | undefined;
type TableHeaderRenderer = () => string | HTMLElement;
type TableCellRenderer = (row: TableRowData, index: number) => string | HTMLElement;
type TableExportFormatter = (row: TableRowData) => string | number | boolean | null | undefined;

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
  sorter?: TableSorter;
  /** Custom filter function for the column, mandatory when using client-side filtering. */
  filter?: TableFilterFn;
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
  headerHtml?: TableHeaderRenderer;
  /** Custom rendering function for HTML content in the column cells */
  html?: TableCellRenderer;
  /** Custom formatting function for exporting column data */
  exportFormat?: TableExportFormatter;
  /** */
  fixed?: 'left' | 'right';
  /** Allows styling to be applied to the th element of the column */
  style?: CSSStyleProperties;
  /** When true, search and sort icons will only be displayed when hovering over the th element */
  showIconsOnHover?: boolean;
  /** Defines the filter type for this column (text, checkbox, radio, datepicker or treeview) */
  filterType?: 'text' | 'checkbox' | 'radio' | 'datepicker' | 'treeview';
  /** Defines options for checkbox, radio or treeview filter type */
  filterOptions?: IFilterOption[] | ITreeItem[];
  /** Defines the label of the buttons */
  filterButtons?: {
    searchButton?: { label?: string };
    cancelButton?: { label?: string };
    selectAllCheckbox?: { label?: string };
  };
  filterElements?: {
    icon?: string;
    searchInput?: {
      placeholder?: string;
      label?: string;
      maskOptions?: IInputMaskOptions;
      disabled?: boolean;
      invalid?: boolean;
      clearable?: boolean;
      error?: string;
      hint?: string;
      icon?: string | IIconOptions | IMultiIconOptions;
      iconPosition?: 'left' | 'right';
      size?: 'large' | 'base' | 'small';
    };
    searchButton?: { label?: string };
    cancelButton?: { label?: string };
    selectAllCheckbox?: { hide?: boolean; label?: string };
    optionsSearchInput?: { show?: boolean; placeholder?: string; emptyMessage?: string };
    optionsSearchDatepicker?: {
      label?: string;
      placeholder?: string;
      mode?: 'single' | 'range';
      dateFormat?: string;
      timeFormat?: '24' | '12';
      minDate?: string;
      maxDate?: string;
      hourStep?: number;
      minuteStep?: number;
      locale?: string;
      showTimePicker?: boolean;
      size?: 'small' | 'base' | 'large';
    };
    treeViewOptions?: {
      size?: 'small' | 'base' | 'large';
      branchIcon?: string;
      leafIcon?: string;
      showBadge?: boolean;
      showZeroCountBadges?: boolean;
      badgeOptions?: IBadgeOptions;
      showPointer?: boolean;
      selectionStrategy?: 'all' | 'leaf';
      containerStyle?: CSSStyleProperties;
      stepStyle?: CSSStyleProperties;
      expandAll?: boolean;
      expandedKeys?: string[];
    };
  };
  headerActionsOptions?: {
    direction?: 'vertical' | 'horizontal';
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
  /** The total number of items, working only client side pagination */
  totalItems?: number;
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
  /** A list of data */
  data?: TableRowData[];
}

/** Represents a filter applied to a table */
export interface ITableFilter {
  /** The value of the filter - string for text/radio/datepicker filter, string array for checkbox and treeview filter, IDateSelection for datepicker filter */
  value?: string | string[] | IDateSelection;
  /** The field to which the filter is applied */
  field: string;
  /** The type of the filter (text, checkbox, radio, datepicker, or treeview) */
  type?: 'text' | 'checkbox' | 'radio' | 'datepicker' | 'treeview';
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
  externalData?: TableRowData[];
}

export interface ITableExportExcelColumn {
  header: string;
  field: string;
  width: number;
}

/**
 * Represents a group of table rows with associated metadata
 */
export interface ITableGroup {
  /** The value that this group represents (e.g., "Active", "Completed") */
  groupValue: unknown;
  /** The number of rows in this group */
  groupCount: number;
  /** The array of row data objects belonging to this group */
  rows: TableRowData[];
}
