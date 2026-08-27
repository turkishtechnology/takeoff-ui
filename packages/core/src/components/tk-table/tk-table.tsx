import { Component, ComponentInterface, h, Element, Prop, State, Watch, Event, EventEmitter, Listen, Fragment, Method } from '@stencil/core';
import classNames from 'classnames';
import { ITableColumn, ITableFilter, ITableCellEdit, ITableRequest, ITableExportOptions, ITableSort, ITableGroup, IFilterOption } from './types';
import { filterAndSort, handleInputKeydown, calculateColumnStartWidth, calculateNewColumnWidth } from './helpers';
import { isEqual, some } from 'lodash-es';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ExcelJs from 'exceljs';
import { getIconElementProps } from '../../utils/icon-utils';
import { getDataTestId } from '../../utils/test-id-utils';
import '../../global/sass/fonts/tk-font/tk-text-regular';
import '../../global/sass/fonts/tk-font/tk-text-bold';
import '../../global/sass/fonts/geologica/geologica-regular';
import '../../global/sass/fonts/geologica/geologica-bold';
import { getNestedValue } from '../../utils/object-utils';
import { showElement, hideElement } from '../../utils/style-utils';
import { CSSStyleProperties } from '../../global/types';
import { floatingElementAutoUpdate } from '../../utils/position-utils';
import { ITreeItem } from '../tk-treeview/types';

/**
 * TkTable is a component that allows you to display data in a tabular manner. It's generally called a datatable.
 * @react `import { TkTable } from '@takeoff-ui/react'`
 * @vue `import { TkTable } from '@takeoff-ui/vue'`
 * @angular `import { TkTable } from '@takeoff-ui/angular'`
 * @slot empty-data - Set how the table will appear when there is no data
 * @slot body-header - Custom independent rows at the top of tbody (e.g., summary, totals, or custom data rows)
 * @slot body-footer - Custom independent rows at the bottom of tbody (e.g., totals, summary, or additional data rows)
 */
@Component({
  tag: 'tk-table',
  styleUrl: 'tk-table.scss',
  shadow: true,
})
export class TkTable implements ComponentInterface {
  private refSelectAll: HTMLTkCheckboxElement;
  private elFilterPanelElement: HTMLElement;
  private isResizing: boolean = false;
  private resizeColumnIndex: number = -1;
  private startX: number = 0;
  private startWidth: number = 0;
  private customCellCache: Map<string, HTMLElement> = new Map();
  private isSelectionUpdating: boolean = false;
  private cleanup;
  private refTopScrollbar: HTMLElement;
  private refTopScrollbarContent: HTMLElement;
  private topScrollbarObserver: ResizeObserver;
  private scrollListenerTarget: HTMLElement;
  private resizeObserverTarget: HTMLElement;
  private topScrollbarFrame: number;

  @Element() el: HTMLTkTableElement;

  @State() elActiveSearchIcon: HTMLElement;
  @State() selectColumn: ITableColumn;
  @State() sortField: string;
  @State() sortOrder: 'asc' | 'desc';
  @State() filters: ITableFilter[] = [];
  @State() currentPage: number = 1;
  @State() renderData: Record<PropertyKey, unknown>[] = [];
  @State() hasHeaderRightSlot: boolean;
  @State() hasEmptyDataSlot: boolean;
  @State() hasEmptyFilterSlot: boolean;
  @State() isFilterOpen: boolean = false;
  @State() columnWidths: { [key: string]: string } = {};
  @State() stickyOffsets: { left: { [key: string]: number }; right: { [key: string]: number } } = { left: {}, right: {} };
  @State() sorts: ITableSort[] = [];
  @State() groupedData: ITableGroup[] = [];
  @State() groupByColumnField: string = null;
  @State() isControlledGrouping: boolean = false;
  @State() expandedGroups: any[] = [];
  @State() internalRowsPerPage: number;

  /**
   * The column definitions (Array of Objects)
   */
  @Prop() columns: ITableColumn[] = [];
  // columns prop'u değiştiğinde sticky column'lar varsa offset'leri güncellemek ve scroll listener'ı kurmak için watch eklenmiştir.
  @Watch('columns')
  columnsChanged() {
    const stickyColumns = this.columns.filter(col => col.fixed === 'left' || col.fixed === 'right');
    if (stickyColumns.length > 0) {
      setTimeout(() => {
        this.updateStickyOffsets();
        this.setupScrollListener();
      }, 0);
    }
  }

  /**
   * The style attribute of container element
   */
  @Prop() containerStyle?: CSSStyleProperties = null;

  /**
   * Where the horizontal scrollbar of the table is placed. 'top' and 'both' keep it reachable when the table is taller than the viewport.
   */
  @Prop() horizontalScrollPosition: 'bottom' | 'top' | 'both' = 'bottom';

  private get hasTopScrollbar() {
    return this.horizontalScrollPosition === 'top' || this.horizontalScrollPosition === 'both';
  }

  private get hasScrollableContainer() {
    return !!(this.containerStyle?.height || this.containerStyle?.maxHeight);
  }

  // The scroll handler only has work to do for sticky shadows, the header shadow of a scrolling container and
  // the top scrollbar; a plain table gets no listener at all.
  private get needsScrollListener() {
    const hasStickyColumns = this.columns.some(col => col.fixed === 'left' || col.fixed === 'right');
    return hasStickyColumns || !!this.selectionMode || this.hasScrollableContainer || this.hasTopScrollbar;
  }

  /**
   * Determines how rows can be selected, either with radio buttons (single selection) or checkboxes (multiple selection).
   */
  @Prop() selectionMode: 'radio' | 'checkbox';

  /**
   * List of the selected
   */
  @Prop({ mutable: true }) selection: any[] | any = [];

  /**
   * A function that returns true if the row should be disabled
   */
  @Prop() selectionRowDisabled: Function;

  /**
   * Style to apply to header of table
   */
  @Prop() headerType: 'basic' | 'dark' | 'primary' = 'basic';

  /**
   * Sets size for the component.
   */
  @Prop() size: 'xsmall' | 'small' | 'base' = 'base';

  /**
   * Property of each row that defines the unique key of each row
   */
  @Prop() dataKey: string;

  /**
   * Rows of data to display
   */
  @Prop() data: any[] = [];
  @Watch('data')
  dataChanged(newValue: any[], oldValue: any[]) {
    if (!isEqual(oldValue, newValue)) {
      if (this.paginationMethod == 'client') {
        const tmpData = filterAndSort(newValue, this.columns, this.filters, this.sortField, this.sortOrder, this.sorts);
        this.currentPage = 1;
        const startIndex = (this.currentPage - 1) * this.internalRowsPerPage;
        const endIndex = startIndex + this.internalRowsPerPage;
        this.renderData = [...tmpData]?.slice(startIndex, endIndex) || [];
      } else {
        this.renderData = newValue?.length > 0 ? [...newValue] : [];
      }

      // Re-apply grouping if it was previously set
      if (this.groupBy || this.groupByColumnField) {
        const groupField = this.groupBy || this.groupByColumnField;
        this.applyGrouping(groupField);
      }

      if (this.refSelectAll) this.refSelectAll.value = false;
      this.handleSelectAll(false);
      this.expandedRows = [];
      // Invalidate cached custom cell elements on data change
      this.customCellCache.clear();
    }
  }

  /**
   *
   */
  @Prop() cardTitle: string = '';

  /**
   * Enables or disables alternating row background colors for easier readability.
   */
  @Prop() striped: boolean = false;

  /**
   * Number of items per page.
   */
  @Prop() rowsPerPage: number = 6;
  @Watch('rowsPerPage')
  rowsPerPageChanged(newValue: number, oldValue: number) {
    if (oldValue !== newValue) {
      this.internalRowsPerPage = newValue;
    }
  }

  /**
   * Number of rows per page options
   */
  @Prop() rowsPerPageOptions: number[];

  /**
   * Number of total items.
   */
  @Prop({ mutable: true }) totalItems: number;

  /**
   * Defines whether pagination is handled on the client or server side.
   */
  @Prop() paginationMethod: string;

  /**
   * The type of the pagination
   * @defaultValue 'outlined'
   */
  @Prop() paginationType: 'outlined' | 'text' | 'grouped' = 'outlined';

  /**
   * Whether leaving the pagination page input applies the typed page number.
   * When false, the page only changes on Enter or on a click on the input's icon.
   * @defaultValue true
   */
  @Prop() applyPageOnBlur: boolean = true;

  /**
   * Template string for current page report in pagination.
   * Available placeholders: {currentPage}, {totalPages}
   * @defaultValue 'page: {currentPage} of {totalPages}'
   */
  @Prop() pageReportTemplate: string = 'page: {currentPage} of {totalPages}';

  /**
   * Template string for items report in pagination.
   * Available placeholders: {startItem}, {endItem}, {totalItems}
   * @defaultValue 'item: {startItem}-{endItem} of {totalItems}'
   */
  @Prop() itemsReportTemplate: string = 'item: {startItem}-{endItem} of {totalItems}';

  /**
   * Displays a loading indicator while data is being fetched or processed.
   */
  @Prop() loading: boolean;

  /**
   * Specifies which rows are expanded to show additional content.
   */
  @Prop({ mutable: true }) expandedRows: any[] = [];

  /**
   * Enables multi-column sorting.
   */

  @Prop() multiSort: boolean = false;

  /**
   * Provides a function to customize cell styles.
   * This function takes the row and column information and returns the style object for a specific cell.
   */
  @Prop() cellStyle: (row: any, column: ITableColumn) => any;

  /**
   * Provides a function to customize row styles.
   * This function takes row information and row index, and returns the style object for a specific  row.
   */
  @Prop() rowStyle: (row: any, index?: number) => any;

  /**
   * Provides a function to customize expanded row styles.
   * This function takes row information and returns the style object for the expanded row content.
   */
  @Prop() expandedRowStyle: (row: any) => any;

  /**
   * Column field name to group the table data by.
   * When specified, the table will automatically group rows by unique values in this column.
   * Set to null or undefined to disable grouping.
   * This makes the component controlled - changes should be handled via tkGroupByChange event.
   * @example groupBy="status" // Groups by the 'status' column
   */
  @Prop() groupBy: string;
  @Watch('groupBy')
  groupByChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      if (newValue) {
        this.applyGrouping(newValue);
      } else {
        this.clearGroupingInternal();
      }
      this.tkGroupByChange.emit(newValue || null);
    }
  }

  /**
   * If true, group headers will have an expand/collapse button to show/hide the rows in that group.
   * @defaultValue false
   */
  @Prop() collapsibleGroups: boolean = false;

  /**
   * Sets the data-testid attribute on the root container element.
   */
  @Prop({ reflect: true }) dataTestid?: string;

  /**
   *
   */
  @Event({ eventName: 'tk-selection-change' }) tkSelectionChange: EventEmitter<any[] | any>;

  /**
   * Emitted when a request needs to be made to the server.
   */
  @Event({ eventName: 'tk-request' }) tkRequest: EventEmitter<ITableRequest>;

  /**
   * Emitted when the expanded rows change.
   */
  @Event({ eventName: 'tk-expanded-rows-change' }) tkExpandedRowsChange: EventEmitter<any[]>;

  /**
   * Emitted when a cell is edited.
   */
  @Event({ eventName: 'tk-cell-edit' }) tkCellEdit: EventEmitter<ITableCellEdit>;

  /**
   * Emitted when a row is clicked.
   * @param row The row data that was clicked
   */
  @Event({ eventName: 'tk-row-click' }) tkRowClick: EventEmitter<any>;

  /**
   * Emitted when the groupBy value changes.
   * Always emitted for both controlled and uncontrolled components.
   * For controlled components, handle this event to update the groupBy prop.
   * @param groupBy The new groupBy field name (null if grouping is cleared)
   */
  @Event({ eventName: 'tk-group-by-change' }) tkGroupByChange: EventEmitter<string | null>;

  // outside click of search tk-table-filter-panel for close
  @Listen('click', { target: 'window' })
  checkForClickOutside(ev: MouseEvent) {
    if (this.isFilterOpen) {
      let isInside = false;
      ev.composedPath().forEach((item: HTMLElement) => {
        if (this.elFilterPanelElement == item || this.elActiveSearchIcon == item) {
          isInside = true;
          return;
        }
      });

      if (!isInside) {
        this.closeFilterPanel();
      }
    }
  }

  componentWillLoad(): Promise<void> | void {
    this.hasHeaderRightSlot = !!this.el.querySelector('[slot="header-right"]');
    this.hasEmptyDataSlot = !!this.el.querySelector('[slot="empty-data"]');
    this.hasEmptyFilterSlot = !!this.el.querySelector('[slot="empty-filter"]');

    // Determine if this is a controlled component based on initial groupBy prop
    this.isControlledGrouping = this.groupBy !== undefined;

    this.internalRowsPerPage = this.rowsPerPage;

    if (this.data?.length > 0) {
      this.generateRenderData(this.data, this.currentPage, true);
    }

    // Apply grouping if groupBy prop is set
    if (this.groupBy) {
      this.applyGrouping(this.groupBy);
    }

    // Initialize column widths from column definitions
    this.columns.forEach(col => {
      if (col.width) {
        this.columnWidths[col.field] = col.width;
      }
    });

    // Add mouse event listeners for column resizing
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  // Re-runs after the element is moved in the DOM, where disconnectedCallback has torn the listeners down.
  connectedCallback() {
    this.bindScrollTargets();
  }

  componentDidLoad() {
    const stickyColumns = this.columns.filter(col => col.fixed === 'left' || col.fixed === 'right');
    const hasSelectionMode = !!this.selectionMode;

    if (stickyColumns.length > 0 || hasSelectionMode || this.hasScrollableContainer) {
      this.updateStickyOffsets();
    }
  }

  componentDidRender(): void {
    // Reset transient selection flag after a render cycle
    if (this.isSelectionUpdating) {
      this.isSelectionUpdating = false;
    }
    // Props that decide whether a listener is needed (sticky columns, container height, scrollbar position)
    // can change between renders; the setup calls are no-ops while the bound element stays the same.
    this.bindScrollTargets();
    this.updateTopScrollbar();
    this.refreshStickyShadows();
  }

  componentWillUpdate(): Promise<void> | void {
    // empty-data slot'unun data her değiştiğinde görünürlüğünü ayarlamak için yapılmıştır.
    const slotEmptyFilter: HTMLElement = this.el.querySelector("[slot='empty-filter']");
    const slotEmptyData: HTMLElement = this.el.querySelector("[slot='empty-data']");

    if (slotEmptyFilter) {
      if (this.hasEmptyFilterSlot && this.filters?.length > 0 && !this.loading && this.renderData?.length === 0) {
        showElement(slotEmptyFilter);
      } else {
        hideElement(slotEmptyFilter);
      }
    }

    if (slotEmptyData) {
      if (this.loading || this.renderData?.length > 0) {
        hideElement(slotEmptyData);
      } else {
        showElement(slotEmptyData);
      }
    }
  }

  componentDidUpdate() {
    if (this.isFilterOpen) {
      if (this.elActiveSearchIcon && this.elFilterPanelElement) {
        // Clean up old floating UI listeners before setting up new ones
        this.cleanup?.();
        this.updatePanelPosition();
      }
    } else {
      // Remove floating UI listeners when filter closes
      this.cleanup?.();
      // Clear reference to allow garbage collection
      this.cleanup = null;
      this.closeFilterPanel();
    }
  }

  disconnectedCallback(): void {
    // Clean up floating UI listeners on component unmount
    this.cleanup?.();
    // Clear reference to allow garbage collection
    this.cleanup = null;
    this.elActiveSearchIcon = null;
    this.elFilterPanelElement = null;
    this.isFilterOpen = false;

    const existingFilterPanel = document.querySelector('.tk-table-filter-panel');
    if (existingFilterPanel) {
      existingFilterPanel.remove();
    }

    // Clean up resize event listeners
    document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    document.removeEventListener('mouseup', this.handleMouseUp.bind(this));

    // Clean up scroll event listener
    this.scrollListenerTarget?.removeEventListener('scroll', this.handleScroll);
    this.scrollListenerTarget = null;

    cancelAnimationFrame(this.topScrollbarFrame);
    this.topScrollbarObserver?.disconnect();
    this.topScrollbarObserver = null;
    this.resizeObserverTarget = null;
  }

  /**
   * Allows tk-request event to be triggered manually
   */
  @Method()
  async serverRequest() {
    const requestData = {
      currentPage: this.currentPage,
      rowsPerPage: this.internalRowsPerPage,
      sortField: this.sortField,
      sortOrder: this.sortOrder,
      sorts: this.sorts,
      filters: this.filters,
    } as ITableRequest;

    if (this.paginationMethod === 'client') {
      requestData.totalItems = this.totalItems;
      requestData.data = this.data;
    }

    this.tkRequest.emit(requestData);
  }

  /**
   * Exports the table data to a file
   * @param options
   */
  @Method()
  async exportFile(options: ITableExportOptions) {
    let _data;
    let _columns;

    if (options?.externalData?.length > 0) {
      _data = options.externalData;
    } else if (options.scope == 'all') {
      _data = filterAndSort(this.data, this.columns, this.filters, this.sortField, this.sortOrder, this.sorts);
    } else if (options.scope == 'selected') {
      _data = this.selection;
    } else if (!options.scope || options.scope == 'current-page') {
      _data = this.renderData;
    }

    if (options.type == 'pdf') {
      const doc = new jsPDF(options.orientation === 'horizontal' ? 'l' : 'p');

      const fontFamily = getComputedStyle(this.el).getPropertyValue('--family-body').trim().replace(/['"]/g, '');
      const pdfFont = fontFamily.startsWith('tk-text') ? 'tk-text' : 'Geologica';

      autoTable(doc, {
        head: [this.columns.map(col => col.header)], // Başlıkları dinamik olarak ekler
        body: _data.map(row =>
          this.columns.map(col => {
            if (col.exportFormat) {
              return col.exportFormat(row);
            } else {
              return getNestedValue(row, col.field) ?? '';
            }
          }),
        ),
        theme: 'striped',
        // styles: { halign: 'center', fontSize: 10 },
        headStyles: { fillColor: [201, 0, 25], fontStyle: 'bold' },
        bodyStyles: { fontStyle: 'normal' },
        styles: { font: pdfFont },
      });

      doc.save(`${options.fileName ?? 'tk-table'}.pdf`);
    } else if (options.type == 'excel') {
      const workbook = new ExcelJs.Workbook();
      const worksheet = workbook.addWorksheet('Sheet 1');

      if (options.columns && options.columns.length > 0) {
        _columns = options.columns;
      } else {
        _columns = this.columns;
      }

      worksheet.columns = _columns
        .filter(item => !options.ignoreColumnsFields?.includes(item.field))
        .map(item => {
          return { header: item.header, key: item.field, width: Number(item.width?.toString().replace('px', '')) / 7 || 20 }; //Add this 7 because of unit conversion (In excel inches are used and 7px is approximately 1inch)
        });

      worksheet.addRows(
        _data?.map(item => {
          const rowData = {};

          _columns
            .filter(col => !options.ignoreColumnsFields?.includes(col.field))
            .forEach(col => {
              if (col.exportFormat) {
                rowData[col.field] = col.exportFormat(item);
              } else {
                rowData[col.field] = getNestedValue(item, col.field) ?? '';
              }
            });

          return rowData;
        }),
      );

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${options.fileName ?? 'tk-table'}.xlsx`;
      link.click();
    } else if (options.type == 'csv') {
      const headers = this.columns.map(col => col.header).join(',');
      const rows = _data
        .map(row =>
          this.columns
            .map(col => {
              if (col.exportFormat) {
                return col.exportFormat(row);
              } else {
                return getNestedValue(row, col.field) ?? '';
              }
            })
            .join(','),
        )
        .join('\n');
      const csvContent = headers + '\n' + rows;

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      if (link.download !== undefined) {
        link.setAttribute('href', URL.createObjectURL(blob));
        link.setAttribute('download', `${options.fileName ?? 'tk-table'}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  /**
   * Clears all filters or specific column filters
   * @param columns Optional array of column field names to clear filters for. If not provided, all filters are cleared.
   */
  @Method()
  async clearFilters(columns?: string[]) {
    if (!this.filters?.length) return;
    if (columns?.length) {
      // Clear filters for specific columns
      this.filters = this.filters.filter(filter => !columns.includes(filter.field));
    } else {
      // Clear all filters
      this.filters = [];
    }

    this.currentPage = 1;

    if (this.paginationMethod !== 'server') {
      const tmpData = filterAndSort(this.data, this.columns, this.filters, this.sortField, this.sortOrder, this.sorts);
      this.generateRenderData(tmpData, 1, true);
    }
  }

  /**
   * Clears all sorting for server side pagination
   */
  @Method()
  async clearSorting() {
    if (this.sortField || this.sorts.length > 0) {
      this.sortField = null;
      this.sortOrder = null;
      this.sorts = [];
      this.currentPage = 1;

      // all sort icons are reset to their default state
      this.el.shadowRoot.querySelectorAll('thead th .tk-table-head-cell .sort-icon').forEach((icon: HTMLTkIconElement) => (icon.icon = 'swap_vert'));

      if (this.paginationMethod !== 'server') {
        const tmpData = filterAndSort(this.data, this.columns, this.filters, this.sortField, this.sortOrder, this.sorts);
        this.generateRenderData(tmpData, 1, true);
      }
    }
  }

  /**
   * Returns the current filters
   * @returns {Object} The current filters
   */
  @Method()
  async getFilters() {
    return this.filters;
  }

  /**
   * Returns the current sorting settings
   * @returns {Object} The current sorting settings
   */
  @Method()
  async getSorting() {
    if (this.multiSort) {
      return this.sorts;
    } else {
      return {
        field: this.sortField,
        order: this.sortOrder,
      };
    }
  }

  /**
   * Sets the current page for pagination
   * @param page The page number to set (1-based index)
   */
  @Method()
  async setCurrentPage(page: number) {
    this.currentPage = page;
  }

  /**
   * Sets the current filter settings
   */
  @Method()
  async setFilters(filters: ITableFilter[]) {
    this.filters = filters;
  }

  /**
   * Sets the current sorting settings
   */
  @Method()
  async setSorting(sorts: ITableSort[] | { field: string; order: 'asc' | 'desc' }) {
    if (this.multiSort && Array.isArray(sorts)) {
      this.sorts = sorts;

      this.sorts?.forEach(sort => {
        const sortIcon: HTMLTkIconElement = this.el.shadowRoot.querySelector(`thead tr th[data-field="${sort.field}"] tk-icon`);

        if (sortIcon) {
          if (sort.order == 'asc') {
            sortIcon.icon = 'arrow_drop_up';
          } else if (sort.order == 'desc') {
            sortIcon.icon = 'arrow_drop_down';
          }
        }
      });
    } else if (!this.multiSort && !Array.isArray(sorts)) {
      this.sortField = sorts.field;
      this.sortOrder = sorts.order;

      const sortIcon: HTMLTkIconElement = this.el.shadowRoot.querySelector(`thead tr th[data-field="${sorts.field}"] tk-icon`);
      if (sortIcon) {
        if (sorts.order == 'asc') {
          sortIcon.icon = 'arrow_drop_up';
        } else if (sorts.order == 'desc') {
          sortIcon.icon = 'arrow_drop_down';
        }
      }
    }
  }

  /**
   * Applies the current filters to the data for client side pagination
   */
  @Method()
  async runFilters() {
    if (this.paginationMethod !== 'server') {
      this.currentPage = 1;
      const tmpData = filterAndSort(this.data, this.columns, this.filters, this.sortField, this.sortOrder, this.sorts);
      this.generateRenderData(tmpData, 1, true);
    }
  }

  /**
   * Groups table data by the specified column field
   * Creates group header rows that display the unique value and count of items in that group.
   * For example, if you have a 'status' column with values 'Open' and 'Closed',
   * this will create group headers like "Open (5)" and "Closed (3)".
   *
   * Always emits tkGroupByChange event. For uncontrolled components, also updates internal state.
   *
   * @param columnField The field name to group by (e.g., 'status', 'category', 'department')
   *
   * @example
   * // Controlled usage (with groupBy prop)
   * await tableRef.groupByColumn('status'); // Emits tkGroupByChange event
   *
   * // Uncontrolled usage (no groupBy prop)
   * await tableRef.groupByColumn('status'); // Updates internal state and emits tkGroupByChange event
   */
  @Method()
  async groupByColumn(columnField: string) {
    if (!this.isControlledGrouping) {
      // Uncontrolled component - update internal state directly
      if (!columnField) {
        this.clearGroupingInternal();
      } else {
        this.applyGrouping(columnField);
      }
    }
    this.tkGroupByChange.emit(columnField || null);
  }

  /**
   * Clears the current grouping and returns to normal table view
   *
   * Always emits tkGroupByChange event with null value. For uncontrolled components, also clears internal state.
   */
  @Method()
  async clearGrouping() {
    if (!this.isControlledGrouping) {
      // Uncontrolled component - clear internal state directly
      this.clearGroupingInternal();
    }
    this.tkGroupByChange.emit(null);
  }

  private applyGrouping(columnField: string) {
    if (!columnField) {
      this.clearGroupingInternal();
      return;
    }

    const filteredData = this.getTableViewData();

    // Group data by the specified column
    const groups = new Map<any, any[]>();

    filteredData.forEach(row => {
      const groupValue = getNestedValue(row, columnField);
      if (!groups.has(groupValue)) {
        groups.set(groupValue, []);
      }
      groups.get(groupValue).push(row);
    });

    // Convert to array format for rendering
    this.groupedData = Array.from(groups.entries()).map(([groupValue, rows]) => ({
      groupValue,
      groupCount: rows.length,
      rows,
    }));

    this.groupByColumnField = columnField;

    // Başlangıçta tüm gruplar genişletilmiş olarak gösterilir
    this.expandedGroups = this.groupedData.map(group => group.groupValue);

    // Generate render data from grouped data
    const flatRenderData = [];
    this.groupedData.forEach(group => {
      flatRenderData.push(...group.rows);
    });

    if (this.paginationMethod === 'client') {
      const startIndex = (this.currentPage - 1) * this.internalRowsPerPage;
      const endIndex = startIndex + this.internalRowsPerPage;
      this.renderData = flatRenderData.slice(startIndex, endIndex);
    } else {
      this.renderData = flatRenderData;
    }

    this.totalItems = flatRenderData.length;
  }

  private updatePanelPosition() {
    this.cleanup = floatingElementAutoUpdate(this.elActiveSearchIcon, this.elFilterPanelElement, undefined, {
      placement: 'bottom',
      offset: 4,
    });
  }

  private clearGroupingInternal() {
    this.groupByColumnField = null;
    this.groupedData = [];
    this.expandedGroups = [];
    this.generateRenderData(this.data, this.currentPage, true);
  }

  private generateRenderData(data: any[], currentPage: number, isWillLoad: boolean = false) {
    const _data = [...(data ?? [])];
    this.currentPage = currentPage;

    // Clear grouping when generating render data with new dataset
    if (!this.groupByColumnField) {
      this.groupedData = [];
    }

    // component will load dan geldiğinde tkRequest tetiklenmesin diye bu kontrol eklendi.
    if (!isWillLoad) {
      const requestData = {
        currentPage: this.currentPage,
        rowsPerPage: this.internalRowsPerPage,
        sortField: this.sortField,
        sortOrder: this.sortOrder,
        sorts: this.sorts,
        filters: this.filters,
      } as ITableRequest;

      if (this.paginationMethod === 'client') {
        requestData.totalItems = _data?.length;
        requestData.data = _data;
      }

      this.tkRequest.emit(requestData);
    }

    if (this.paginationMethod == 'client') {
      const startIndex = (this.currentPage - 1) * this.internalRowsPerPage;
      const endIndex = startIndex + this.internalRowsPerPage;
      this.renderData = _data.slice(startIndex, endIndex);
      this.totalItems = _data?.length;
    } else {
      this.renderData = _data;
    }

    this.expandedRows = [];
    // Slice/view changed -> clear cached custom cells to avoid stale nodes
    this.customCellCache.clear();
  }

  /**
   * Tabloda gösterilecek satırlar. Server pagination'da filtre/sıralama sunucuda uygulanır;
   * bu yüzden client tarafında filterAndSort tekrar çalıştırılmaz (çift filtreleme ve boş tablo riski).
   */
  private getTableViewData(): any[] {
    const source = Array.isArray(this.data) ? this.data : [];
    if (this.paginationMethod === 'server') {
      return [...source];
    }
    return filterAndSort(source, this.columns, this.filters, this.sortField, this.sortOrder, this.sorts);
  }

  private toggleExpandRow(row: any, tdExpanderButtonRef: HTMLTkButtonElement) {
    const newExpandedRows = this.expandedRows;

    const findIndex = newExpandedRows.findIndex(item => item[this.dataKey] == row[this.dataKey]);
    if (findIndex > -1) {
      tdExpanderButtonRef.icon = 'keyboard_arrow_down';
      newExpandedRows.splice(findIndex, 1); // Eğer zaten genişlemişse kapat
    } else {
      tdExpanderButtonRef.icon = 'keyboard_arrow_up';
      newExpandedRows.push(row); // Değilse genişlet
    }

    this.expandedRows = newExpandedRows;

    this.tkExpandedRowsChange.emit(this.expandedRows);

    // After state change, recalc shadows on next frame
    requestAnimationFrame(() => this.refreshStickyShadows());
  }

  private toggleExpandGroup(groupValue: any) {
    if (!this.collapsibleGroups) return;
    const existingIndex = this.expandedGroups.indexOf(groupValue);

    if (existingIndex > -1) {
      // collapse the group
      this.expandedGroups = [...this.expandedGroups.slice(0, existingIndex), ...this.expandedGroups.slice(existingIndex + 1)];
    } else {
      // expand the group
      this.expandedGroups = [...this.expandedGroups, groupValue];
    }

    // After state change, recalc shadows on next frame
    requestAnimationFrame(() => this.refreshStickyShadows());
  }

  // Add a new method to safely close the filter panel
  private closeFilterPanel() {
    // Clean up floating UI listeners before removing element
    this.cleanup?.();
    // Clear reference to allow garbage collection
    this.cleanup = null;

    // Then remove the element from DOM
    if (this.elFilterPanelElement) {
      this.elFilterPanelElement.remove();
      this.elFilterPanelElement = null;
    }

    // Finally update the state
    this.isFilterOpen = false;
  }

  // Checks if all selectable rows are selected
  private isAllRowsSelected(): boolean {
    if (!Array.isArray(this.selection)) return false;
    const selectableRows = this.renderData.filter(row => (this.selectionRowDisabled ? !this.selectionRowDisabled(row) : true));
    if (selectableRows.length === 0) return false;
    if (this.selection.length < selectableRows.length) return false;
    return selectableRows.every(row => this.selection.some(sel => sel?.[this.dataKey] === row?.[this.dataKey]));
  }

  private setDataTestidAttribute(el: Element, ...suffixes: Array<string | undefined>) {
    const testId = getDataTestId(this.dataTestid, ...suffixes);
    if (testId) {
      el.setAttribute('data-testid', testId);
    }
  }

  private async handleSearchIconClick(refSearchIcon: HTMLTkIconElement, field: string) {
    if (!this.isFilterOpen) {
      this.isFilterOpen = true;
      this.createFilterPanel(refSearchIcon, field);
    } else if (this.elActiveSearchIcon != refSearchIcon) {
      this.isFilterOpen = false;
      this.createFilterPanel(refSearchIcon, field);
    }
  }

  private handleInputFilterApply(columnField) {
    // if (refSearchInput.value.toString().length > 0) {
    const searchInput: HTMLTkInputElement = document.querySelector('body > .tk-table-filter-panel > tk-input');
    const value = searchInput.value ?? '';

    // Bu field da mevcutta bir filtre uygulanmış ise mevcutu değiştirmek için yazıldı.
    // filtre yoksa yeni filtre olarak filters'a eklenmesi sağlandı
    const filter = this.filters.find(filter => filter.field == columnField);

    if (filter) filter.value = value.toString();
    else this.filters.push({ field: columnField, value } as ITableFilter);

    // current page değiştiğinde pagination componenti 'handlePageChange' eventini tetiklediğinden 2 defa emit edilmesin diye buraya bu kontrol eklendi
    if (this.currentPage == 1) {
      const tmpData = this.getTableViewData();
      this.generateRenderData(tmpData, 1);
    } else {
      this.currentPage = 1;
    }

    // Close the filter panel
    this.closeFilterPanel();
  }
  private handleSearchButtonClick(columnField: any) {
    if (this.columns.find(col => col.field === columnField)?.filterType === 'checkbox') {
      this.handleCheckboxFilterApply(columnField);
    } else if (this.columns.find(col => col.field === columnField)?.filterType === 'radio') {
      this.handleRadioFilterApply(columnField);
    } else if (this.columns.find(col => col.field === columnField)?.filterType === 'datepicker') {
      this.handleDatepickerFilterApply(columnField);
    } else if (this.columns.find(col => col.field === columnField)?.filterType === 'treeview') {
      this.handleTreeviewFilterApply(columnField);
    } else {
      this.handleInputFilterApply(columnField);
    }
  }
  private handleSearchCancelButtonClick(columnField) {
    const removeFilterIndex = this.filters.findIndex(filter => filter.field == columnField);
    if (removeFilterIndex > -1) {
      this.filters.splice(removeFilterIndex, 1);

      // Reset input value if it's a text filter
      const searchInput: HTMLTkInputElement = document.querySelector('body > .tk-table-filter-panel > tk-input');
      if (searchInput) searchInput.value = '';

      // current page değiştiğinde pagination componenti 'handlePageChange' eventini tetiklediğinden 2 defa emit edilmesin diye buraya bu kontrol eklendi
      if (this.currentPage == 1) {
        const tmpData = this.getTableViewData();
        this.generateRenderData(tmpData, 1);
      } else {
        this.currentPage = 1;
      }
    }

    // Close the filter panel
    this.closeFilterPanel();
  }

  private handleInputBlur(row, index: number, colField: string, editableInputRef) {
    const cellEdit: ITableCellEdit = {
      rowId: row[this.dataKey],
      rowIndex: index,
      field: colField,
      value: editableInputRef.value,
    };
    this.tkCellEdit.emit(cellEdit);
  }

  private handleSelectAll(value: boolean) {
    this.isSelectionUpdating = true;
    if (value) {
      this.selection = [...this.renderData.filter(row => (this.selectionRowDisabled ? !this.selectionRowDisabled(row) : true))];
    } else {
      this.selection = [];
    }
    this.tkSelectionChange.emit(this.selection);
  }

  private handleCheckboxSelectChange(isSelect: boolean, row) {
    this.isSelectionUpdating = true;
    let tmpSelection = Array.isArray(this.selection) ? [...this.selection] : [];
    const hasSelect = some(tmpSelection, item => isEqual(item, row));

    if (isSelect == false && hasSelect) {
      // seçili ise ve silinmek isteniyor ise
      tmpSelection = tmpSelection.filter(item => item[this.dataKey] !== row[this.dataKey]);
      this.selection = [...tmpSelection];
      this.tkSelectionChange.emit(this.selection);
      this.refSelectAll.indeterminate = true;
    } else if (isSelect == true && !hasSelect) {
      // seçili değilse ve eklenmek isteniyor ise
      tmpSelection.push(row);
      this.selection = [...tmpSelection];
      this.tkSelectionChange.emit(this.selection);
      this.refSelectAll.indeterminate = true;
    }
  }

  private handleRadioSelectChange(row: any) {
    this.isSelectionUpdating = true;
    this.selection = row;
    this.tkSelectionChange.emit(this.selection);
  }

  private handlePageChange(e) {
    const tmpData = this.getTableViewData();
    this.generateRenderData(tmpData, Number(e.detail.page));
    // sayfa değişikliğinde seçilen değerler sıfırlanır
    if (this.refSelectAll) this.refSelectAll.value = false;
    this.handleSelectAll(false);
  }

  private handleSortIconClick(refSortIcon: HTMLTkIconElement, col: ITableColumn) {
    if (!col.sortable) return;

    if (this.multiSort) {
      this.handleMultiSort(refSortIcon, col);
    } else {
      this.handleSingleSort(refSortIcon, col);
    }
  }

  // Sort icon cycle starts from col.firstSortOrder ('asc' unless the column opts into 'desc' first).
  private getSortCycle(col: ITableColumn): { firstOrder: 'asc' | 'desc'; firstIcon: string; secondOrder: 'asc' | 'desc'; secondIcon: string } {
    const firstOrder = col.firstSortOrder === 'desc' ? 'desc' : 'asc';
    const firstIcon = firstOrder === 'desc' ? 'arrow_drop_down' : 'arrow_drop_up';
    const secondOrder = firstOrder === 'desc' ? 'asc' : 'desc';
    const secondIcon = firstOrder === 'desc' ? 'arrow_drop_up' : 'arrow_drop_down';

    return { firstOrder, firstIcon, secondOrder, secondIcon };
  }

  private handleSingleSort(refSortIcon: HTMLTkIconElement, col: ITableColumn) {
    this.sortField = col.field;
    const icon = refSortIcon.icon;
    this.sorts = [];

    // tüm sort iconlar default duruma getirilir.
    this.el.shadowRoot.querySelectorAll('thead th .tk-table-head-cell .sort-icon').forEach((icon: HTMLTkIconElement) => (icon.icon = 'swap_vert'));

    const { firstOrder, firstIcon, secondOrder, secondIcon } = this.getSortCycle(col);

    if (icon == 'swap_vert') {
      this.sortOrder = firstOrder;
      refSortIcon.icon = firstIcon;
    } else if (icon == firstIcon) {
      this.sortOrder = secondOrder;
      refSortIcon.icon = secondIcon;
    } else if (icon == secondIcon) {
      this.sortField = null;
      this.sortOrder = null;
      refSortIcon.icon = 'swap_vert';
    }

    this.applySorting();
  }

  private handleMultiSort(refSortIcon: HTMLTkIconElement, col: ITableColumn) {
    const existingIndex = this.sorts.findIndex(s => s.field === col.field);

    const icon = refSortIcon.icon;

    const { firstOrder, firstIcon, secondOrder } = this.getSortCycle(col);

    if (existingIndex > -1) {
      const currentSort = this.sorts[existingIndex];

      if (icon === firstIcon) {
        currentSort.order = secondOrder;
      } else {
        this.sorts.splice(existingIndex, 1);
      }
    } else {
      this.sorts.push({
        field: col.field,
        order: firstOrder,
      });
    }

    this.applySorting();
  }

  private applySorting() {
    if (this.currentPage === 1) {
      const tmpData = this.getTableViewData();
      this.generateRenderData(tmpData, 1);
    } else {
      this.currentPage = 1;
    }
  }

  private createFilterPanel(refSearchIcon: HTMLElement, field: string) {
    // First close any existing filter panel
    this.closeFilterPanel();

    this.elActiveSearchIcon = refSearchIcon;
    this.elFilterPanelElement = document.createElement('div');
    this.elFilterPanelElement.classList.add('tk-table-filter-panel');
    this.elFilterPanelElement.classList.add(`${field}-filter-panel`);
    this.setDataTestidAttribute(this.elFilterPanelElement, 'filter-panel', field);

    // Find the column configuration for this field
    const column = this.columns.find(col => col.field === field);

    // Check if the column has a filterType property and it's set to 'checkbox'
    if (column?.filterType === 'checkbox' && column.filterOptions?.length > 0) {
      // Create checkbox filter
      const filterContainer = document.createElement('div');
      filterContainer.classList.add('tk-table-filter-checkbox-container');
      this.setDataTestidAttribute(filterContainer, 'filter-checkbox-container', field);

      // Get current filter values for this field
      const currentFilter = this.filters.find(filter => filter.field === field);
      const selectedValues = (currentFilter?.value as string[]) || [];

      const divider = document.createElement('tk-divider');
      divider.my = 1;

      const checkboxWrapper = document.createElement('div');

      checkboxWrapper.classList.add('tk-table-filter-checkbox-item');
      if (column?.filterElements?.optionsSearchInput?.show) {
        const optionsSearchInput = document.createElement('tk-input');
        optionsSearchInput.placeholder = column.filterElements.optionsSearchInput.placeholder || 'Search';
        optionsSearchInput.dataTestid = getDataTestId(this.dataTestid, 'filter-options-search-input', field);

        optionsSearchInput.addEventListener('tk-change', (e: any) => {
          const searchText = e.detail.toLowerCase();
          const checkboxWrappers = filterContainer.querySelectorAll('.tk-table-filter-checkbox-item');
          checkboxWrappers.forEach((wrapper: HTMLElement) => {
            const checkbox = wrapper.querySelector('tk-checkbox:not(.select-all)') as HTMLTkCheckboxElement;
            if (checkbox) {
              const label = checkbox.label.toLowerCase();
              wrapper.style.display = label.includes(searchText) ? 'block' : 'none';
            }
          });
          const visibleCheckboxes = Array.from(checkboxWrappers).filter(wrapper => {
            const checkbox = wrapper.querySelector('tk-checkbox:not(.select-all)');
            return checkbox && (wrapper as HTMLElement).style.display !== 'none';
          });

          if (visibleCheckboxes.length === 0) {
            checkboxWrapper.style.display = 'none';
            divider.style.display = 'none';
            optionsSearchInput.hint = column?.filterElements?.optionsSearchInput?.emptyMessage || 'No results found';
          } else {
            checkboxWrapper.style.display = 'block';
            divider.style.display = 'block';
            optionsSearchInput.hint = null;
          }
        });
        filterContainer.appendChild(optionsSearchInput);
      }

      let allCheckbox: HTMLTkCheckboxElement;

      if (!column?.filterElements?.selectAllCheckbox?.hide) {
        allCheckbox = document.createElement('tk-checkbox');
        allCheckbox.classList.add('select-all');
        this.setDataTestidAttribute(allCheckbox, 'filter-select-all-checkbox', field);
        allCheckbox.label = column?.filterElements?.selectAllCheckbox?.label || 'Select All';
        allCheckbox.value = selectedValues.length === column.filterOptions.length;
        if (selectedValues.length > 0 && selectedValues.length < column.filterOptions.length) {
          allCheckbox.indeterminate = true;
        }
        checkboxWrapper.appendChild(allCheckbox);
        allCheckbox.addEventListener('tk-change', (e: any) => {
          const allCheckboxes = filterContainer.querySelectorAll('tk-checkbox:not(.select-all)');
          allCheckboxes.forEach((cb: HTMLTkCheckboxElement) => {
            cb.value = e.detail;
          });
          if (e.detail) {
            selectedValues.length = 0;
            selectedValues.push(...column.filterOptions.map(option => option.value));
          } else {
            selectedValues.length = 0;
          }
          allCheckbox.indeterminate = false;
        });

        filterContainer.appendChild(checkboxWrapper);
        filterContainer.appendChild(divider);
      }
      // Create checkboxes for each option
      column.filterOptions.forEach((option, optionIndex) => {
        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.classList.add('tk-table-filter-checkbox-item');
        this.setDataTestidAttribute(checkboxWrapper, 'filter-checkbox-item', field, optionIndex.toString());

        const checkbox = document.createElement('tk-checkbox');
        checkbox.value = selectedValues.includes(option.value);
        checkbox.label = option.label || option.value;
        this.setDataTestidAttribute(checkbox, 'filter-option-checkbox', field, optionIndex.toString());

        if (!column?.filterElements?.selectAllCheckbox?.hide) {
          checkbox.addEventListener('tk-change', () => {
            const allItemCheckboxes = Array.from(filterContainer.querySelectorAll('tk-checkbox:not(.select-all)')) as HTMLTkCheckboxElement[];
            const visibleCheckboxes = allItemCheckboxes.filter(
              cb => (cb as HTMLTkCheckboxElement).style.display !== 'none' && (cb.parentElement as HTMLElement)?.style.display !== 'none',
            );

            const allSelected = visibleCheckboxes.length > 0 && visibleCheckboxes.every(cb => cb.value);
            const anySelected = visibleCheckboxes.some(cb => cb.value);
            allCheckbox.value = allSelected;

            if (!allSelected && anySelected) {
              allCheckbox.indeterminate = true;
            } else {
              allCheckbox.indeterminate = false;
            }
          });
        }

        checkboxWrapper.appendChild(checkbox);
        filterContainer.appendChild(checkboxWrapper);
      });

      this.elFilterPanelElement.appendChild(filterContainer);
    }
    // Check if the column has a filterType property and it's set to 'radio'
    else if (column?.filterType === 'radio' && column.filterOptions?.length > 0) {
      // Create radio filter
      const filterContainer = document.createElement('div');
      filterContainer.classList.add('tk-table-filter-radio-container');
      this.setDataTestidAttribute(filterContainer, 'filter-radio-container', field);

      // Get current filter value for this field
      const currentFilter = this.filters.find(filter => filter.field === field);
      const selectedValue = currentFilter?.value as string;

      // Create radio group name unique to this column
      const radioGroupName = `radio-filter-${field}`;
      if (column?.filterElements?.optionsSearchInput) {
        const optionsSearchInput = document.createElement('tk-input');
        optionsSearchInput.placeholder = column.filterElements.optionsSearchInput.placeholder || 'Search';
        optionsSearchInput.dataTestid = getDataTestId(this.dataTestid, 'filter-options-search-input', field);

        optionsSearchInput.addEventListener('tk-change', (e: any) => {
          const searchText = e.detail.toLowerCase();
          const radioWrappers = filterContainer.querySelectorAll('.tk-table-filter-radio-item');
          radioWrappers.forEach((wrapper: HTMLElement) => {
            const radio = wrapper.querySelector('tk-radio');
            const label = radio.label.toLowerCase();
            wrapper.style.display = label.includes(searchText) ? 'block' : 'none';
          });
        });
        filterContainer.appendChild(optionsSearchInput);
      }
      // Create radio buttons for each option
      column.filterOptions.forEach((option, optionIndex) => {
        const radioWrapper = document.createElement('div');
        radioWrapper.classList.add('tk-table-filter-radio-item');
        this.setDataTestidAttribute(radioWrapper, 'filter-radio-item', field, optionIndex.toString());

        const radio = document.createElement('tk-radio');
        radio.value = option.value;
        radio.name = radioGroupName;
        radio.label = option.label || option.value;
        this.setDataTestidAttribute(radio, 'filter-option-radio', field, optionIndex.toString());

        // Check if this option is currently selected
        if (selectedValue === option.value) {
          radio.checked = true;
        }

        radioWrapper.appendChild(radio);
        filterContainer.appendChild(radioWrapper);
      });

      this.elFilterPanelElement.appendChild(filterContainer);
    } else if (column?.filterType === 'datepicker') {
      const filterContainer = document.createElement('div');
      filterContainer.classList.add('tk-table-filter-datepicker-container');
      this.setDataTestidAttribute(filterContainer, 'filter-datepicker-container', field);

      const datepicker = document.createElement('tk-datepicker');
      datepicker.dataTestid = getDataTestId(this.dataTestid, 'filter-datepicker', field);
      const defaultDatepickerProps = {
        label: 'Select a date',
        placeholder: 'Choose a date',
        mode: 'single',
        dateFormat: 'yyyy-MM-dd',
        timeFormat: '24',
        minDate: '',
        maxDate: '',
        hourStep: 1,
        minuteStep: 1,
        locale: 'en',
        showTimePicker: false,
        size: 'base',
      };
      const currentFilter = this.filters.find(filter => filter.field === field);
      const currentValue = currentFilter?.value || null;

      Object.assign(datepicker, { ...defaultDatepickerProps, ...column?.filterElements?.optionsSearchDatepicker, value: currentValue });
      datepicker.addEventListener('tk-change', (e: Event) => {
        datepicker.value = (e as CustomEvent).detail;
      });
      filterContainer.appendChild(datepicker);
      this.elFilterPanelElement.appendChild(filterContainer);
    } else if (column?.filterType === 'treeview' && column.filterOptions?.length > 0) {
      // Create treeview filter
      const filterContainer = document.createElement('div');
      filterContainer.classList.add('tk-table-filter-treeview-container');
      this.setDataTestidAttribute(filterContainer, 'filter-treeview-container', field);

      // Get current filter value for this field
      const currentFilter = this.filters.find(filter => filter.field === field);
      const selectedValue = (currentFilter?.value as string[]) || [];

      // Create treeview component first
      const treeview = document.createElement('tk-tree-view') as any;
      this.setDataTestidAttribute(treeview, 'filter-treeview', field);
      const treeviewConfig = column?.filterElements?.treeViewOptions ?? {};
      treeview.selectable = true;
      treeview.size = treeviewConfig?.size ?? 'small';
      treeview.branchIcon = treeviewConfig?.branchIcon;
      treeview.leafIcon = treeviewConfig?.leafIcon;
      treeview.showBadge = treeviewConfig?.showBadge;
      treeview.showZeroCountBadges = treeviewConfig?.showZeroCountBadges;
      treeview.badgeOptions = treeviewConfig?.badgeOptions;
      treeview.showPointer = treeviewConfig?.showPointer ?? false;
      treeview.selectionStrategy = treeviewConfig?.selectionStrategy ?? 'leaf';
      treeview.containerStyle = treeviewConfig?.containerStyle ?? { width: '100%' };
      treeview.stepStyle = treeviewConfig?.stepStyle;
      treeview.expandAll = treeviewConfig?.expandAll ?? true;
      treeview.expandedKeys = treeviewConfig?.expandedKeys;

      treeview.items = column.filterOptions as ITreeItem[];
      treeview.value = selectedValue;

      treeview.addEventListener('tk-change', (e: CustomEvent) => {
        treeview.value = e.detail;
      });
      if (column?.filterElements?.optionsSearchInput?.show) {
        const optionsSearchInput = document.createElement('tk-input');
        optionsSearchInput.placeholder = column.filterElements.optionsSearchInput.placeholder || 'Search';
        optionsSearchInput.dataTestid = getDataTestId(this.dataTestid, 'filter-options-search-input', field);

        optionsSearchInput.addEventListener('tk-change', (e: any) => {
          const searchText = e.detail.toLowerCase();

          // Recursive function to filter tree items including nested children
          const filterTreeItems = (items: ITreeItem[]): ITreeItem[] => {
            return items
              .map(item => {
                // Check if current item matches, at start its the parent node
                const itemMatches = item.label.toLowerCase().includes(searchText);

                // Recursively filter children
                const filteredChildren = item.children ? filterTreeItems(item.children) : [];

                // Include both parent and children if children match, or if parent matches
                if (itemMatches || filteredChildren.length > 0) {
                  return {
                    ...item,
                    children: filteredChildren.length > 0 ? filteredChildren : item.children,
                  };
                }

                return null;
              })
              .filter(item => item !== null);
          };

          treeview.items = filterTreeItems(column.filterOptions as ITreeItem[]);
        });
        filterContainer.appendChild(optionsSearchInput);
      }

      filterContainer.appendChild(treeview);
      this.elFilterPanelElement.appendChild(filterContainer);
    } else {
      // Default text input filter
      const input: HTMLTkInputElement = document.createElement('tk-input');
      const searchInputConfig = column?.filterElements?.searchInput ?? {};
      input.dataTestid = getDataTestId(this.dataTestid, 'filter-search-input', field);
      input.placeholder = searchInputConfig?.placeholder || 'Search';
      input.label = searchInputConfig?.label;
      input.maskOptions = searchInputConfig?.maskOptions;
      input.disabled = !!searchInputConfig?.disabled;
      input.invalid = !!searchInputConfig?.invalid;
      input.clearable = !!searchInputConfig?.clearable;
      input.error = searchInputConfig?.error;
      input.hint = searchInputConfig?.hint;
      input.icon = searchInputConfig?.icon;
      input.iconPosition = searchInputConfig?.iconPosition;
      input.size = searchInputConfig?.size || 'base';

      input.setFocus();
      input.value = (this.filters?.find(item => item.field == field)?.value as string) || '';
      input.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          this.handleSearchButtonClick(field);
        }
      });
      this.elFilterPanelElement.appendChild(input);
    }

    // Create buttons container
    const buttons = document.createElement('div');
    buttons.classList.add('tk-table-filter-panel-buttons');
    this.setDataTestidAttribute(buttons, 'filter-panel-buttons', field);

    // Create cancel button
    const cancelButton: HTMLTkButtonElement = document.createElement('tk-button');
    cancelButton.label = column?.filterElements?.cancelButton?.label || column?.filterButtons?.cancelButton?.label || 'Remove';
    cancelButton.type = 'outlined';
    cancelButton.fullWidth = true;
    cancelButton.dataTestid = getDataTestId(this.dataTestid, 'filter-cancel-button', field);
    cancelButton.addEventListener('tk-click', () => {
      this.handleSearchCancelButtonClick(field);
      this.isFilterOpen = false;
    });

    // Create search/apply button
    const searchButton: HTMLTkButtonElement = document.createElement('tk-button');
    searchButton.label = column?.filterElements?.searchButton?.label || column?.filterButtons?.searchButton?.label || 'Apply';
    searchButton.fullWidth = true;
    searchButton.dataTestid = getDataTestId(this.dataTestid, 'filter-apply-button', field);
    searchButton.addEventListener('tk-click', () => {
      this.handleSearchButtonClick(field);
      // We don't need to close the filter panel here anymore since it's closed in the apply methods
    });

    buttons.appendChild(cancelButton);
    buttons.appendChild(searchButton);
    this.elFilterPanelElement.appendChild(buttons);
    this.elFilterPanelElement.style.zIndex = '1700';
    document.body.appendChild(this.elFilterPanelElement);
    this.isFilterOpen = true;
  }

  private handleCheckboxFilterApply(columnField: string) {
    const checkboxes = Array.from(document.querySelectorAll('body > .tk-table-filter-panel .tk-table-filter-checkbox-item tk-checkbox:not(.select-all)'));
    const column = this.columns.find(col => col.field === columnField);

    if (!column || !column.filterOptions || checkboxes.length === 0) return;

    // Get selected values
    const selectedValues = [];
    const filterOptions = column.filterOptions as IFilterOption[];

    checkboxes.forEach((checkbox: HTMLTkCheckboxElement, index) => {
      if (checkbox.value && filterOptions[index] && checkbox.style.display !== 'none') {
        selectedValues.push(filterOptions[index].value);
      }
    });

    // Update filter
    const filterIndex = this.filters.findIndex(filter => filter.field === columnField);

    if (selectedValues.length > 0) {
      if (filterIndex > -1) {
        this.filters[filterIndex].value = selectedValues;
        this.filters[filterIndex].type = 'checkbox';
      } else {
        this.filters.push({
          field: columnField,
          value: selectedValues,
          type: 'checkbox',
        } as ITableFilter);
      }
    } else if (filterIndex > -1) {
      // Remove filter if no values selected
      this.filters.splice(filterIndex, 1);
    }

    // Apply filter
    if (this.currentPage === 1) {
      const tmpData = this.getTableViewData();
      this.generateRenderData(tmpData, 1);
    } else {
      this.currentPage = 1;
    }

    // Close the filter panel
    this.closeFilterPanel();
  }

  private handleRadioFilterApply(columnField: string) {
    const radioButtons = Array.from(document.querySelectorAll(`body > .tk-table-filter-panel .tk-table-filter-radio-item tk-radio`));
    const column = this.columns.find(col => col.field === columnField);

    if (!column || !column.filterOptions || radioButtons.length === 0) return;

    // Find selected radio button
    const selectedRadio = radioButtons.find((radio: HTMLTkRadioElement) => radio.checked) as HTMLTkRadioElement;

    // Update filter
    const filterIndex = this.filters.findIndex(filter => filter.field === columnField);

    if (selectedRadio) {
      const selectedValue = selectedRadio.value;

      if (filterIndex > -1) {
        this.filters[filterIndex].value = selectedValue;
        this.filters[filterIndex].type = 'radio';
      } else {
        this.filters.push({
          field: columnField,
          value: selectedValue,
          type: 'radio',
        } as ITableFilter);
      }
    } else if (filterIndex > -1) {
      // Remove filter if no value selected
      this.filters.splice(filterIndex, 1);
    }

    // Apply filter
    if (this.currentPage === 1) {
      const tmpData = this.getTableViewData();
      this.generateRenderData(tmpData, 1);
    } else {
      this.currentPage = 1;
    }

    // Close the filter panel
    this.closeFilterPanel();
  }
  private handleDatepickerFilterApply(columnField: string) {
    const datepickerEl = document.querySelector('body > .tk-table-filter-panel .tk-table-filter-datepicker-container tk-datepicker') as HTMLTkDatepickerElement;
    const selectedDate = datepickerEl?.value;
    const filterIndex = this.filters.findIndex(filter => filter.field == columnField);

    if (selectedDate) {
      if (filterIndex > -1) {
        this.filters[filterIndex].value = selectedDate;
        this.filters[filterIndex].type = 'datepicker';
      } else {
        this.filters.push({ field: columnField, value: selectedDate, type: 'datepicker' } as ITableFilter);
      }
    } else if (filterIndex > -1) {
      // Remove filter if date is cleared
      this.filters.splice(filterIndex, 1);
    }
    // Update table data
    if (this.currentPage === 1) {
      const tmpData = this.getTableViewData();
      this.generateRenderData(tmpData, 1);
    } else {
      this.currentPage = 1;
    }
    // Close the filter panel
    this.closeFilterPanel();
  }

  private handleTreeviewFilterApply(columnField: string) {
    const treeview = document.querySelector('.tk-table-filter-treeview-container tk-tree-view') as HTMLTkTreeViewElement;
    if (!treeview) return;
    const selectedValues = treeview.value;
    const filterIndex = this.filters.findIndex(filter => filter.field === columnField);
    if (selectedValues.length > 0) {
      if (filterIndex > -1) {
        this.filters[filterIndex].value = selectedValues;
        this.filters[filterIndex].type = 'treeview';
      } else {
        this.filters.push({
          field: columnField,
          value: selectedValues,
          type: 'treeview',
        } as ITableFilter);
      }
    } else if (filterIndex > -1) {
      // Remove filter if no values selected
      this.filters.splice(filterIndex, 1);
    }

    // Apply filter
    if (this.currentPage === 1) {
      const tmpData = this.getTableViewData();
      this.generateRenderData(tmpData, 1);
    } else {
      this.currentPage = 1;
    }

    // Close the filter panel
    this.closeFilterPanel();
  }

  private handleRowClick = (e: MouseEvent, row: any) => {
    const path = e.composedPath();
    const clickableElement = path.some(element => element instanceof HTMLElement && ['tk-popover', 'tk-dropdown'].includes(element.tagName.toLowerCase()));

    if (clickableElement) {
      e.stopPropagation();
    } else {
      this.tkRowClick.emit(row);
    }
  };

  private handleMouseDown = (e: MouseEvent, columnIndex: number) => {
    e.preventDefault();
    this.isResizing = true;
    this.resizeColumnIndex = columnIndex;
    this.startX = e.clientX;

    const th = (e.target as HTMLElement).closest('th') as HTMLTableCellElement;
    if (!th) return;

    const column = this.columns[columnIndex];
    const currentStateWidth = this.columnWidths[column?.field];

    // Use helper function to calculate starting width
    this.startWidth = calculateColumnStartWidth(th, currentStateWidth);

    this.el.style.cursor = 'col-resize';
    this.el.style.userSelect = 'none';
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.isResizing || this.resizeColumnIndex === -1) return;

    e.preventDefault();

    // Use helper function to calculate new width
    const newWidth = calculateNewColumnWidth(this.startX, e.clientX, this.startWidth);

    const column = this.columns[this.resizeColumnIndex];
    if (column) {
      this.columnWidths = {
        ...this.columnWidths,
        [column.field]: `${newWidth}px`,
      };

      // Force re-render
      this.columnWidths = { ...this.columnWidths };
    }
  };

  private updateStickyOffsets() {
    const leftColumns = this.columns.filter(col => col.fixed === 'left');
    const rightColumns = this.columns.filter(col => col.fixed === 'right');

    // Reset offsets
    this.stickyOffsets = { left: {}, right: {} };

    const measuredWidths: { [key: string]: number } = {};
    let shouldUseMeasuredWidths = false;

    // Try to measure from DOM if available
    const tableElement = this.el.shadowRoot?.querySelector('table');
    if (tableElement) {
      const headerRow = tableElement.querySelector('thead tr');
      if (headerRow) {
        const thElements = Array.from(headerRow.querySelectorAll('th'));

        // Measure actual widths from DOM
        thElements.forEach((th, index) => {
          const actualWidth = Math.round(th.getBoundingClientRect().width);

          if (index === 0 && this.selectionMode) {
            // Selection column
            measuredWidths['selection'] = actualWidth;
          } else {
            // Data column
            const dataColumnIndex = this.selectionMode ? index - 1 : index;
            if (dataColumnIndex >= 0 && dataColumnIndex < this.columns.length) {
              const column = this.columns[dataColumnIndex];
              if (column) {
                measuredWidths[column.field] = actualWidth;
              }
            }
          }
        });

        shouldUseMeasuredWidths = true;
      }
    }

    // Calculate left sticky offsets (cumulative from left)
    let leftOffset = 0;

    // Add selection column width if it exists
    if (this.selectionMode) {
      if (shouldUseMeasuredWidths && measuredWidths['selection']) {
        // Use measured width if available
        leftOffset += measuredWidths['selection'];
      } else {
        // Fallback to estimated width
        leftOffset += 52;
      }
    }

    leftColumns.forEach(col => {
      this.stickyOffsets.left[col.field] = leftOffset;

      let numericWidth = 120;

      if (shouldUseMeasuredWidths && measuredWidths[col.field]) {
        // Use measured width (priority)
        numericWidth = measuredWidths[col.field];
      } else {
        // Use state or column definition width
        const width = this.columnWidths[col.field] || col.width;
        if (width) {
          if (typeof width === 'string') {
            numericWidth = parseInt(width.replace(/px|%|em|rem/, '')) || 120;
          } else if (typeof width === 'number') {
            numericWidth = width;
          }
        }
      }

      leftOffset += numericWidth;
    });

    // Calculate right sticky offsets (cumulative from right)
    let rightOffset = 0;
    // Process right columns in reverse order (rightmost first)
    [...rightColumns].reverse().forEach(col => {
      this.stickyOffsets.right[col.field] = rightOffset;

      let numericWidth = 120;

      if (shouldUseMeasuredWidths && measuredWidths[col.field]) {
        // Use measured width (priority)
        numericWidth = measuredWidths[col.field];
      } else {
        // Use state or column definition width
        const width = this.columnWidths[col.field] || col.width;
        if (width) {
          if (typeof width === 'string') {
            numericWidth = parseInt(width.replace(/px|%|em|rem/, '')) || 120;
          } else if (typeof width === 'number') {
            numericWidth = width;
          }
        }
      }

      rightOffset += numericWidth;
    });

    // Force re-render if using measured widths
    if (shouldUseMeasuredWidths) {
      this.columnWidths = { ...this.columnWidths };
    }
  }

  private handleMouseUp = () => {
    if (this.isResizing) {
      this.isResizing = false;
      this.resizeColumnIndex = -1;
      // Reset cursor styles on the table container
      this.el.style.cursor = '';
      this.el.style.userSelect = '';
      this.updateStickyOffsets();
    }
  };

  private bindScrollTargets() {
    if (this.needsScrollListener) this.setupScrollListener();
    this.setupTopScrollbarObserver();
  }

  private setupScrollListener() {
    const tableHolder = this.getTableHolder();
    if (!tableHolder || tableHolder === this.scrollListenerTarget) return;

    this.scrollListenerTarget?.removeEventListener('scroll', this.handleScroll);
    this.scrollListenerTarget = tableHolder;
    tableHolder.addEventListener('scroll', this.handleScroll);
    // Initialize shadow state on the element we just bound to
    this.handleScroll({ target: tableHolder } as unknown as Event);
  }

  private handleScroll = (e: Event) => {
    const target = e.target as HTMLElement;

    const scrollLeft = target.scrollLeft;
    const scrollWidth = target.scrollWidth;
    const clientWidth = target.clientWidth;
    const maxScrollLeft = Math.max(0, scrollWidth - clientWidth);

    const EPS = 1; // tolerance for float rounding
    const hasOverflow = scrollWidth > clientWidth + EPS;
    const atLeft = scrollLeft <= EPS;
    const atRight = scrollLeft >= maxScrollLeft - EPS;

    // Update shadow visibility based on scroll position
    const leftStickyElements = this.el.shadowRoot?.querySelectorAll('.tk-table-sticky-shadow-right');
    const rightStickyElements = this.el.shadowRoot?.querySelectorAll('.tk-table-sticky-shadow-left');

    // Left shadow visibility
    if (leftStickyElements) {
      leftStickyElements.forEach((el: HTMLElement) => {
        el.style.setProperty('--shadow-opacity', hasOverflow && !atLeft ? '1' : '0');
      });
    }

    // Right shadow visibility
    if (rightStickyElements) {
      rightStickyElements.forEach((el: HTMLElement) => {
        el.style.setProperty('--shadow-opacity', hasOverflow && !atRight ? '1' : '0');
      });
    }

    // Header bottom shadow visibility on vertical scroll
    const scrollTop = target.scrollTop;
    const atTop = scrollTop <= EPS;

    const theadElement = this.el.shadowRoot?.querySelector('thead') as HTMLElement;
    if (theadElement) {
      theadElement.style.setProperty('--header-shadow-opacity', !atTop ? '1' : '0');
    }

    this.syncScroll(this.refTopScrollbar, scrollLeft);
  };

  private getTableHolder() {
    return this.el.shadowRoot?.querySelector('.table-holder') as HTMLElement;
  }

  private handleTopScrollbarScroll = () => {
    this.syncScroll(this.getTableHolder(), this.refTopScrollbar?.scrollLeft);
  };

  // Mirrors scrollLeft between the table and its top scrollbar. The two handlers do not loop into each other
  // because the mirrored element already holds the same value when its own scroll event fires back.
  private syncScroll(target: HTMLElement, scrollLeft: number) {
    if (!this.hasTopScrollbar || !target || scrollLeft === undefined) return;
    if (Math.abs(target.scrollLeft - scrollLeft) < 1) return;

    target.scrollLeft = scrollLeft;
  }

  private setupTopScrollbarObserver() {
    if (!this.hasTopScrollbar) {
      // Without this the observer keeps the discarded table subtree alive after a switch back to 'bottom'
      this.topScrollbarObserver?.disconnect();
      this.resizeObserverTarget = null;
      return;
    }

    if (typeof ResizeObserver === 'undefined') return;

    const tableHolder = this.getTableHolder();
    const table = this.el.shadowRoot?.querySelector('table') as HTMLElement;
    if (!tableHolder || !table || this.resizeObserverTarget === tableHolder) return;

    this.topScrollbarObserver?.disconnect();
    this.topScrollbarObserver = this.topScrollbarObserver || new ResizeObserver(() => this.scheduleTopScrollbarUpdate());
    this.resizeObserverTarget = tableHolder;
    this.topScrollbarObserver.observe(tableHolder);
    this.topScrollbarObserver.observe(table);
  }

  // Showing or hiding the bar changes the height of the observed holder in a fixed-height frame, which the
  // browser reports as a ResizeObserver loop when it happens inside the callback; the next frame is late enough.
  private scheduleTopScrollbarUpdate() {
    cancelAnimationFrame(this.topScrollbarFrame);
    this.topScrollbarFrame = requestAnimationFrame(() => this.updateTopScrollbar());
  }

  // Keeps the scrollbar as wide as the table's visible area and its content as wide as the table, so the
  // browser draws exactly the bar the table draws at its bottom. Hidden when there is nothing to scroll.
  private updateTopScrollbar() {
    if (!this.hasTopScrollbar || !this.refTopScrollbar || !this.refTopScrollbarContent) return;

    const tableHolder = this.getTableHolder();
    if (!tableHolder) return;

    const { scrollLeft, scrollWidth, clientWidth } = tableHolder;
    const hasOverflow = scrollWidth > clientWidth + 1;

    this.refTopScrollbar.style.width = `${clientWidth}px`;
    this.refTopScrollbarContent.style.width = `${scrollWidth}px`;
    // classList.toggle's force argument is not honoured by every DOM implementation the component runs in
    this.refTopScrollbar.classList[hasOverflow ? 'remove' : 'add']('hidden');
    this.refTopScrollbar.scrollLeft = scrollLeft;
  }

  private refreshStickyShadows() {
    const tableHolder = this.getTableHolder();
    if (!tableHolder) return;
    this.handleScroll({ target: tableHolder } as unknown as Event);
  }

  private createGroupedRows() {
    const rows = [];
    let globalIndex = 0;

    // Group headerın olduğu cellden sonra oluşan boşluk için genişlik hesaplaması
    const tableHolder = this.getTableHolder();
    if (tableHolder) {
      const tableHolderWidth = tableHolder.clientWidth;
      tableHolder.style.setProperty('--table-holder-width', `${tableHolderWidth}px`);
    }

    // For pagination, we need to determine which groups and rows to show
    let startIndex = 0;
    let endIndex = this.renderData.length;

    if (this.paginationMethod === 'client') {
      startIndex = (this.currentPage - 1) * this.internalRowsPerPage;
      endIndex = startIndex + this.internalRowsPerPage;
    }

    let currentRowIndex = 0;

    this.groupedData.forEach((group, groupIndex) => {
      // Check if this group contains any rows in the current page range
      const groupStartIndex = currentRowIndex;
      const groupEndIndex = currentRowIndex + group.rows.length;

      const isGroupExpanded = this.expandedGroups.includes(group.groupValue);

      // If this group overlaps with the visible range, show it
      if (groupEndIndex > startIndex && groupStartIndex < endIndex) {
        // Create group header row
        const totalColumns = this.columns.length + (this.selectionMode ? 1 : 0);
        const groupHeaderRow = (
          <tr
            class={classNames(
              'tk-table-group-header',
              { 'tk-table-collapsible-group-header': this.collapsibleGroups },
              { 'tk-table-group-collapsed': this.collapsibleGroups && !isGroupExpanded },
            )}
            data-testid={getDataTestId(this.dataTestid, 'group-header', groupIndex.toString())}
            onClick={() => this.toggleExpandGroup(group.groupValue)}
          >
            <td colSpan={totalColumns} class="tk-table-group-header-cell" data-testid={getDataTestId(this.dataTestid, 'group-header-cell', groupIndex.toString())}>
              <div class="tk-table-group-header-content" data-testid={getDataTestId(this.dataTestid, 'group-header-content', groupIndex.toString())}>
                {this.collapsibleGroups && (
                  <tk-icon
                    icon={isGroupExpanded ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}
                    variant="neutral"
                    dataTestid={getDataTestId(this.dataTestid, 'group-header-toggle-icon', groupIndex.toString())}
                  />
                )}
                <span class="tk-table-group-value" data-testid={getDataTestId(this.dataTestid, 'group-header-value', groupIndex.toString())}>
                  {group.groupValue}
                </span>
                <span class="tk-table-group-count" data-testid={getDataTestId(this.dataTestid, 'group-header-count', groupIndex.toString())}>
                  ({group.groupCount})
                </span>
              </div>
            </td>
          </tr>
        );
        rows.push(groupHeaderRow);
        if (isGroupExpanded) {
          // Show only the visible rows from this group
          group.rows.forEach((row, groupRowIndex) => {
            const absoluteRowIndex = currentRowIndex + groupRowIndex;

            // Only show rows that are in the visible range
            if (absoluteRowIndex >= startIndex && absoluteRowIndex < endIndex) {
              const dataRow = this.createDataRow(row, globalIndex + groupRowIndex);
              rows.push(dataRow);
            }
          });
        }
      }

      currentRowIndex += group.rows.length;
      globalIndex += group.rows.length;
    });

    return rows;
  }

  private createDataRow(row: Record<PropertyKey, unknown>, index: number) {
    const rowKey = String(row?.[this.dataKey] ?? index);
    let styleRowObject;
    const leftColumns = this.columns.filter(c => c.fixed === 'left');

    if (typeof this.rowStyle == 'function') {
      const stylesRow = this.rowStyle(row, index);
      if (stylesRow !== undefined) styleRowObject = { ...stylesRow };
    }

    let isRowDisabled = false;
    if (this.selectionRowDisabled) {
      isRowDisabled = this.selectionRowDisabled(row);
    }

    let selectionTd;
    if (this.selectionMode === 'checkbox') {
      selectionTd = (
        <td
          class={classNames('non-text', 'tk-table-left-sticky', 'tk-table-sticky-first', { 'tk-table-sticky-shadow-right': leftColumns.length === 0 })}
          style={this.getSelectionStickyStyle(index)}
          data-testid={getDataTestId(this.dataTestid, 'body-row-selection-cell', rowKey)}
        >
          <tk-checkbox
            id={this.el.id ? `${this.el.id}-checkbox-${index}` : undefined}
            value={some(this.selection, itemValue => isEqual(itemValue, row))}
            disabled={isRowDisabled}
            onTk-change={e => this.handleCheckboxSelectChange(e.detail, row)}
            onClick={e => e.stopPropagation()}
            data-testid={getDataTestId(this.dataTestid, 'body-row-selection-checkbox', rowKey)}
          ></tk-checkbox>
        </td>
      );
    } else if (this.selectionMode === 'radio') {
      selectionTd = (
        <td
          class={classNames('non-text', 'tk-table-left-sticky', 'tk-table-sticky-first', { 'tk-table-sticky-shadow-right': leftColumns.length === 0 })}
          style={this.getSelectionStickyStyle(index)}
          data-testid={getDataTestId(this.dataTestid, 'body-row-selection-cell', rowKey)}
        >
          <tk-radio
            id={this.el.id ? `${this.el.id}-radio-${index}` : undefined}
            value={row}
            name={this.el.id ? `${this.el.id}-selection` : 'selection'}
            checked={isEqual(this.selection, row)}
            disabled={isRowDisabled}
            onTk-change={() => this.handleRadioSelectChange(row)}
            onClick={e => e.stopPropagation()}
            data-testid={getDataTestId(this.dataTestid, 'body-row-selection-radio', rowKey)}
          ></tk-radio>
        </td>
      );
    }

    const isSelected =
      this.selectionMode === 'checkbox' ? some(this.selection, itemValue => isEqual(itemValue, row)) : this.selectionMode === 'radio' ? isEqual(this.selection, row) : false;

    return (
      <Fragment>
        <tr
          class={isSelected ? 'selected' : ''}
          onClick={e => this.handleRowClick(e, row)}
          aria-disabled={isRowDisabled}
          data-testid={getDataTestId(this.dataTestid, 'body-row', rowKey)}
        >
          {selectionTd}
          {this.columns.map(col => {
            let tdExpanderButtonRef!: HTMLTkButtonElement;
            let styleCellObject;

            const leftColumns = this.columns.filter(c => c.fixed === 'left');
            const rightColumns = this.columns.filter(c => c.fixed === 'right');
            const isFirstLeft = col.fixed === 'left' && leftColumns[0]?.field === col.field;
            const isLastRight = col.fixed === 'right' && rightColumns[rightColumns.length - 1]?.field === col.field;

            if (typeof this.cellStyle == 'function') {
              const stylesCell = this.cellStyle(row, col);
              if (stylesCell !== undefined) styleCellObject = { ...stylesCell };
            }

            if (col.expander) {
              return (
                <td
                  class={classNames(this.getStickyColumnClasses(col, isFirstLeft, isLastRight))}
                  style={{ ...this.getStickyColumnStyle(col, index), ...styleRowObject, ...styleCellObject }}
                  data-testid={getDataTestId(this.dataTestid, 'body-cell-expander', rowKey, String(col.field))}
                >
                  <tk-button
                    ref={el => (tdExpanderButtonRef = el)}
                    variant="info"
                    icon="keyboard_arrow_down"
                    iconPosition="right"
                    type="text"
                    size="small"
                    onTk-click={() => this.toggleExpandRow(row, tdExpanderButtonRef)}
                    dataTestid={getDataTestId(this.dataTestid, 'body-expander-button', rowKey, String(col.field))}
                  ></tk-button>
                </td>
              );
            } else if (typeof col?.html == 'function') {
              // Reuse cached custom cell elements whenever possible
              let usedElement = null;
              let computedElement = null;

              const cacheKey = `${row?.[this.dataKey] ?? index}::${col.field}`;
              const cached = this.customCellCache.get(cacheKey);
              if (cached) {
                usedElement = cached;
              } else {
                computedElement = col?.html(row, index);
              }

              const effectiveElement = usedElement ?? computedElement;
              if (typeof effectiveElement == 'string') {
                return (
                  <td
                    class={classNames('non-text', this.getStickyColumnClasses(col, isFirstLeft, isLastRight))}
                    innerHTML={effectiveElement}
                    data-testid={getDataTestId(this.dataTestid, 'body-cell-html', rowKey, String(col.field))}
                    style={{
                      ...this.getStickyColumnStyle(col, index),
                      ...styleRowObject,
                      ...styleCellObject,
                    }}
                  ></td>
                );
              } else if (typeof effectiveElement == 'object') {
                // Update cache if we computed a new element in this render
                if (!usedElement) {
                  this.customCellCache.set(cacheKey, effectiveElement as HTMLElement);
                }
                return (
                  <td
                    ref={el => el?.replaceChildren(effectiveElement)}
                    class={classNames('non-text', this.getStickyColumnClasses(col, isFirstLeft, isLastRight))}
                    data-testid={getDataTestId(this.dataTestid, 'body-cell-custom', rowKey, String(col.field))}
                    style={{
                      ...this.getStickyColumnStyle(col, index),
                      ...styleRowObject,
                      ...styleCellObject,
                    }}
                  />
                );
              }
            } else if (col.editable) {
              let editableInputRef: HTMLInputElement;
              return (
                <td
                  class={classNames('non-text editable', this.getStickyColumnClasses(col, isFirstLeft, isLastRight))}
                  data-testid={getDataTestId(this.dataTestid, 'body-cell-editable', rowKey, String(col.field))}
                  style={{
                    ...this.getStickyColumnStyle(col, index),
                    ...styleRowObject,
                    ...styleCellObject,
                  }}
                >
                  <input
                    ref={el => (editableInputRef = el)}
                    value={getNestedValue(row, col.field)}
                    type="text"
                    onKeyDown={e => handleInputKeydown(e, this.el)}
                    onBlur={() => this.handleInputBlur(row, index, col.field, editableInputRef)}
                    data-testid={getDataTestId(this.dataTestid, 'body-cell-editable-input', rowKey, String(col.field))}
                  ></input>
                </td>
              );
            } else {
              return (
                <td
                  class={classNames(this.getStickyColumnClasses(col, isFirstLeft, isLastRight))}
                  data-testid={getDataTestId(this.dataTestid, 'body-cell', rowKey, String(col.field))}
                  style={{
                    ...this.getStickyColumnStyle(col, index),
                    ...styleRowObject,
                    ...styleCellObject,
                  }}
                  ref={el => el?.replaceChildren(getNestedValue(row, col.field) ?? '')}
                ></td>
              );
            }
          })}
        </tr>
        {this.expandedRows.length > 0 && this.expandedRows.findIndex(item => item[this.dataKey] == row[this.dataKey]) > -1 && (
          <tr data-testid={getDataTestId(this.dataTestid, 'body-expanded-row', rowKey)}>
            <td
              colSpan={100}
              style={typeof this.expandedRowStyle == 'function' ? this.expandedRowStyle(row) : {}}
              data-testid={getDataTestId(this.dataTestid, 'body-expanded-row-cell', rowKey)}
            >
              <slot name={`expand-content-${row[this.dataKey]}`} />
            </td>
          </tr>
        )}
      </Fragment>
    );
  }

  private getStickyColumnClasses(col: ITableColumn, isFirst: boolean = false, isLast: boolean = false) {
    const classes = [];

    if (col.fixed === 'left') {
      classes.push('tk-table-left-sticky');
      if (isFirst) classes.push('tk-table-sticky-first');

      // En sağdaki left sticky kolonda shadow göster
      const leftColumns = this.columns.filter(c => c.fixed === 'left');
      const isLastLeft = leftColumns[leftColumns.length - 1]?.field === col.field;
      if (isLastLeft) classes.push('tk-table-sticky-shadow-right');
    } else if (col.fixed === 'right') {
      classes.push('tk-table-right-sticky');
      if (isLast) classes.push('tk-table-sticky-last');

      // En soldaki right sticky kolonda shadow göster (en büyük offset'li)
      const rightColumns = this.columns.filter(c => c.fixed === 'right');
      if (rightColumns.length > 0) {
        // Right kolonlarda en soldaki = en büyük offset'e sahip olan
        const leftmostRightCol = rightColumns.reduce((leftmost, current) => {
          const currentOffset = this.stickyOffsets.right?.[current.field] || 0;
          const leftmostOffset = this.stickyOffsets.right?.[leftmost.field] || 0;
          return currentOffset > leftmostOffset ? current : leftmost;
        }, rightColumns[0]);

        const isLeftmostRight = leftmostRightCol?.field === col.field;
        if (isLeftmostRight) classes.push('tk-table-sticky-shadow-left');
      }
    }

    return classes.join(' ');
  }

  private getStickyColumnStyle(col: ITableColumn, rowIndex?: number) {
    const style: any = {
      width: this.columnWidths[col.field] || col.width,
      minWidth: this.columnWidths[col.field] || col.width,
      maxWidth: this.columnWidths[col.field] || col.width,
    };

    if (col.fixed === 'left' && this.stickyOffsets.left[col.field] !== undefined) {
      const leftColumns = this.columns.filter(c => c.fixed === 'left');
      const columnIndex = leftColumns.findIndex(c => c.field === col.field);

      style['--tk-table-sticky-left-offset'] = `${this.stickyOffsets.left[col.field]}px`;
      style['left'] = `${this.stickyOffsets.left[col.field]}px`;
      // Z-index: hem columnIndex hem rowIndex'e göre azalt
      // En soldaki kolon en yüksek z-index'e sahip olmalı (en üstte durmalı)
      style['zIndex'] = Math.max(99 - columnIndex - (rowIndex ?? 0), 0);
    } else if (col.fixed === 'right' && this.stickyOffsets.right[col.field] !== undefined) {
      style['--tk-table-sticky-right-offset'] = `${this.stickyOffsets.right[col.field]}px`;
      style['right'] = `${this.stickyOffsets.right[col.field]}px`;

      // Right sticky z-index mantığı: En sağdaki (offset=0) en yüksek z-index
      const rightOffset = this.stickyOffsets.right[col.field];

      // Right kolonlar için z-index: offset'e göre hesaplıyoruz
      // offset=0 (en sağdaki) -> z-index=30
      // offset arttıkça z-index azalır
      const offsetLevel = Math.floor(rightOffset / 50); // Her 50px'te bir level
      const zIndex = 99 - offsetLevel;
      style['zIndex'] = Math.max(zIndex - (rowIndex ?? 0), 0); // Satır aşağı indikçe z-index azalır
    }

    return style;
  }

  private getSelectionStickyStyle(rowIndex?: number) {
    const style: any = {};

    // Selection column is always the left-most sticky column
    style['--tk-table-sticky-left-offset'] = `0px`;
    style['left'] = `0px`;

    if (rowIndex !== undefined) {
      style['zIndex'] = Math.max(99 - (rowIndex ?? 0), 0);
    }

    return style;
  }

  private createHead() {
    const theadClasses = classNames(this.headerType);
    let selectionTh;

    if (this.selectionMode === 'checkbox') {
      const leftColumns = this.columns.filter(c => c.fixed === 'left');
      selectionTh = (
        <th
          style={{ width: '20px', maxWidth: '20px', ...this.getSelectionStickyStyle() }}
          class={classNames('non-text', 'tk-table-left-sticky', 'tk-table-sticky-first', { 'tk-table-sticky-shadow-right': leftColumns.length === 0 })}
          data-testid={getDataTestId(this.dataTestid, 'head-selection-cell')}
        >
          <tk-checkbox
            id={this.el.id ? `${this.el.id}-checkbox-all` : undefined}
            value={this.isAllRowsSelected()}
            disabled={!(this.renderData.length > 0)}
            ref={el => (this.refSelectAll = el)}
            indeterminate={Array.isArray(this.selection) && this.selection.length > 0 && !this.isAllRowsSelected()}
            onTk-change={e => this.handleSelectAll(e.detail)}
            data-testid={getDataTestId(this.dataTestid, 'head-selection-checkbox')}
          ></tk-checkbox>
        </th>
      );
    } else if (this.selectionMode === 'radio') {
      const leftColumns = this.columns.filter(c => c.fixed === 'left');
      selectionTh = (
        <th
          style={{ width: '20px', maxWidth: '20px', ...this.getSelectionStickyStyle() }}
          class={classNames('non-text', 'tk-table-left-sticky', 'tk-table-sticky-first', { 'tk-table-sticky-shadow-right': leftColumns.length === 0 })}
          data-testid={getDataTestId(this.dataTestid, 'head-selection-cell')}
        ></th>
      );
    }

    return (
      <thead class={theadClasses} data-testid={getDataTestId(this.dataTestid, 'head')}>
        <tr data-testid={getDataTestId(this.dataTestid, 'head-row')}>
          {selectionTh}
          {this.columns.map(col => {
            let refSortIcon: HTMLTkIconElement;
            let refSearchIcon: HTMLTkIconElement;
            let _sortIcon;
            let _searchIcon;
            let _headerStructure;
            let _customHeader;

            if (typeof col?.headerHtml == 'function') {
              _customHeader = col.headerHtml();
            }

            _headerStructure = (
              <div
                class="header-container"
                data-testid={getDataTestId(this.dataTestid, 'head-cell-header-container', String(col.field))}
                ref={el => {
                  if (_customHeader) {
                    if (typeof _customHeader === 'string') {
                      el?.setHTMLUnsafe(_customHeader);
                    } else if (typeof _customHeader == 'object') {
                      el?.replaceChildren(_customHeader);
                    }
                  } else {
                    const _header = document.createElement('div');
                    _header.classList.add('header');
                    _header.title = col.header;
                    _header.textContent = col.header;

                    let _subHeader = null;
                    if (!col.subHeader) {
                      el?.replaceChildren(_header);
                    } else {
                      _subHeader = document.createElement('div');
                      _subHeader.classList.add('sub-header');
                      _subHeader.title = col.subHeader;
                      _subHeader.textContent = col.subHeader;

                      el?.replaceChildren(_header, _subHeader);
                    }
                  }
                }}
              ></div>
            );

            // generate expander th
            if (col.expander) {
              const leftColumns = this.columns.filter(c => c.fixed === 'left');
              const rightColumns = this.columns.filter(c => c.fixed === 'right');
              const isFirstLeft = col.fixed === 'left' && leftColumns[0]?.field === col.field;
              const isLastRight = col.fixed === 'right' && rightColumns[rightColumns.length - 1]?.field === col.field;

              return (
                <th
                  class={classNames(this.getStickyColumnClasses(col, isFirstLeft, isLastRight))}
                  style={{
                    ...this.getStickyColumnStyle(col),
                    ...col?.style,
                  }}
                  data-testid={getDataTestId(this.dataTestid, 'head-cell-expander')}
                ></th>
              );
            }

            // generate head sort and search icons
            const sortIndex = this.sorts.findIndex(s => s.field === col.field);
            const sortObj = this.sorts.find(s => s.field === col.field);
            const iconType = sortObj ? (sortObj.order === 'asc' ? 'arrow_drop_up' : sortObj.order === 'desc' ? 'arrow_drop_down' : 'swap_vert') : 'swap_vert';

            const showBadge = sortIndex > -1 && this.sorts.length > 0 && this.multiSort;
            _sortIcon = showBadge ? (
              <tk-badge count={sortIndex + 1} type="text" rounded size="small" dataTestid={getDataTestId(this.dataTestid, 'head-cell-sort-badge', String(col.field))}>
                <tk-icon
                  {...getIconElementProps(iconType, {
                    class: classNames('sort-icon'),
                    color: this.headerType === 'basic' ? 'var(--icon-darkest)' : 'var(--static-white)',
                    ref: (el: HTMLTkIconElement) => (refSortIcon = el),
                    onClick: () => this.renderData?.length > 0 && this.handleSortIconClick(refSortIcon, col),
                  })}
                  dataTestid={getDataTestId(this.dataTestid, 'head-cell-sort-icon', String(col.field))}
                />
              </tk-badge>
            ) : (
              <tk-icon
                {...getIconElementProps('swap_vert', {
                  class: classNames('sort-icon'),
                  color: this.headerType === 'basic' ? 'var(--icon-darkest)' : 'var(--static-white)',
                  ref: (el: HTMLTkIconElement) => (refSortIcon = el),
                  onClick: () => this.renderData?.length > 0 && this.handleSortIconClick(refSortIcon, col),
                })}
                dataTestid={getDataTestId(this.dataTestid, 'head-cell-sort-icon', String(col.field))}
              />
            );

            const currentFilter = this.filters.find(item => item.field == col.field);
            const hasFilter =
              currentFilter && ((Array.isArray(currentFilter.value) && currentFilter.value.length > 0) || (!Array.isArray(currentFilter.value) && currentFilter.value !== ''));
            const filterPanelOpen = this.elFilterPanelElement?.classList.contains(`${col.field}-filter-panel`);
            const singleSorted = this.sortField === col.field && this.sortOrder;
            const multiSorted = !!sortObj?.order;
            const isSorted = this.multiSort ? multiSorted : singleSorted;
            const noSortAndFilter = !isSorted && !hasFilter;

            if (col.searchable) {
              _searchIcon = (
                <tk-icon
                  {...getIconElementProps(col?.filterElements?.icon || 'search', {
                    class: classNames('filter-icon'),
                    color: this.headerType === 'basic' ? 'var(--icon-darkest)' : 'var(--static-white)',
                    ref: (el: HTMLTkIconElement) => (refSearchIcon = el),
                    onClick: () => this.handleSearchIconClick(refSearchIcon, col.field),
                  })}
                  dataTestid={getDataTestId(this.dataTestid, 'head-cell-search-icon', String(col.field))}
                />
              );

              // filtrelenmiş ise badge ile göster
              if (hasFilter) {
                _searchIcon = (
                  <tk-badge dot dataTestid={getDataTestId(this.dataTestid, 'head-cell-search-badge', String(col.field))}>
                    {_searchIcon}
                  </tk-badge>
                );
              }
            }

            const leftColumns = this.columns.filter(c => c.fixed === 'left');
            const rightColumns = this.columns.filter(c => c.fixed === 'right');
            const isFirstLeft = col.fixed === 'left' && leftColumns[0]?.field === col.field;
            const isLastRight = col.fixed === 'right' && rightColumns[rightColumns.length - 1]?.field === col.field;
            const buttonDirection = col?.headerActionsOptions?.direction ?? 'horizontal';
            return (
              <th
                class={classNames(this.getStickyColumnClasses(col, isFirstLeft, isLastRight))}
                style={{
                  ...this.getStickyColumnStyle(col),
                  ...col?.style,
                }}
                data-field={col.field}
                data-testid={getDataTestId(this.dataTestid, 'head-cell', String(col.field))}
              >
                <div class="tk-table-head-cell" data-testid={getDataTestId(this.dataTestid, 'head-cell-content', String(col.field))}>
                  {_headerStructure}
                  {(col.sortable || col.searchable) && (
                    <div
                      class={classNames('icons', { 'show-icon-on-hover': col.showIconsOnHover && noSortAndFilter && !filterPanelOpen }, buttonDirection)}
                      data-testid={getDataTestId(this.dataTestid, 'head-cell-icons', String(col.field))}
                    >
                      {col.sortable && _sortIcon}
                      {_searchIcon}
                    </div>
                  )}
                  {/* Add resize handle */}
                  <div
                    class="tk-table-resize-handle"
                    onMouseDown={e => this.handleMouseDown(e, this.columns.indexOf(col))}
                    data-testid={getDataTestId(this.dataTestid, 'head-cell-resize-handle', String(col.field))}
                  ></div>
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }

  private createBody() {
    if (!this.isResizing && !this.isSelectionUpdating) {
      this.customCellCache.clear();
    }

    if (this.renderData.length > 0) {
      return (
        <tbody data-testid={getDataTestId(this.dataTestid, 'body')}>
          <slot name="body-header"></slot>

          {this.groupByColumnField ? this.createGroupedRows() : this.renderData.map((row, index) => this.createDataRow(row, index))}

          <slot name="body-footer"></slot>
        </tbody>
      );
    } else if (this.hasEmptyFilterSlot && this.filters?.length > 0) {
      return (
        <tbody data-testid={getDataTestId(this.dataTestid, 'body-empty-filter')}>
          <tr data-testid={getDataTestId(this.dataTestid, 'body-empty-filter-row')}>
            <td colSpan={100} data-testid={getDataTestId(this.dataTestid, 'body-empty-filter-cell')}>
              <slot name="empty-filter" />
            </td>
          </tr>
        </tbody>
      );
    } else if (this.hasEmptyDataSlot) {
      return (
        <tbody data-testid={getDataTestId(this.dataTestid, 'body-empty-data')}>
          <tr data-testid={getDataTestId(this.dataTestid, 'body-empty-data-row')}>
            <td colSpan={100} data-testid={getDataTestId(this.dataTestid, 'body-empty-data-cell')}>
              <slot name="empty-data" />
            </td>
          </tr>
        </tbody>
      );
    }
  }

  private renderHeader() {
    if (this.cardTitle || this.hasHeaderRightSlot)
      return (
        <div class="tk-table-header" data-testid={getDataTestId(this.dataTestid, 'header')}>
          <div data-testid={getDataTestId(this.dataTestid, 'header-title')}>{this.cardTitle}</div>
          <div data-testid={getDataTestId(this.dataTestid, 'header-right')}>
            <slot name="header-right"></slot>
          </div>
        </div>
      );
  }

  private renderTopScrollbar() {
    return (
      <div
        key="top-scrollbar"
        class="tk-table-top-scrollbar hidden"
        ref={el => (this.refTopScrollbar = el as HTMLElement)}
        onScroll={this.handleTopScrollbarScroll}
        data-testid={getDataTestId(this.dataTestid, 'top-scrollbar')}
      >
        <div class="tk-table-top-scrollbar-content" ref={el => (this.refTopScrollbarContent = el as HTMLElement)}></div>
      </div>
    );
  }

  private renderTable() {
    const table = (
      <div key="table-holder" class="table-holder" data-testid={getDataTestId(this.dataTestid, 'table-holder')}>
        <table data-testid={getDataTestId(this.dataTestid, 'content-table')}>
          {this.createHead()}
          {this.loading ? (
            <tbody class="loading-holder" data-testid={getDataTestId(this.dataTestid, 'loading-holder')}>
              <tr data-testid={getDataTestId(this.dataTestid, 'loading-row')}>
                <td colSpan={this.columns.length + 1} data-testid={getDataTestId(this.dataTestid, 'loading-cell')}>
                  <div class="loading" data-testid={getDataTestId(this.dataTestid, 'loading-content')}>
                    <svg width="97" height="97" viewBox="0 0 97 97" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid={getDataTestId(this.dataTestid, 'loading-icon')}>
                      <path
                        d="M88.8501 0.5H48.8501C35.5901 0.5 23.5901 5.87 14.9101 14.56C6.2201 23.25 0.850098 35.25 0.850098 48.5C0.850098 75.01 22.3401 96.5 48.8501 96.5C75.3601 96.5 96.8501 75.01 96.8501 48.5V8.5C96.8501 4.09 93.2601 0.5 88.8501 0.5ZM71.4801 71.13C65.6901 76.92 57.6901 80.5 48.8501 80.5C31.1701 80.5 16.8501 66.18 16.8501 48.5C16.8501 39.67 20.4301 31.67 26.2201 25.87C32.0101 20.08 40.0101 16.5 48.8501 16.5C57.6901 16.5 65.6901 20.08 71.4801 25.87C77.2701 31.67 80.8501 39.67 80.8501 48.5C80.8501 57.33 77.2701 65.34 71.4801 71.13Z"
                        fill="#C92027"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            this.createBody()
          )}
        </table>
      </div>
    );

    // The frame is always in the DOM so the holder (and the table inside it) survives a change of
    // `horizontalScrollPosition` with its scroll position and focus intact. With the top scrollbar it takes over
    // the table border so the bar sits inside it, just like the bottom one; without it, it draws nothing itself.
    const frameClasses = classNames('table-frame', { 'has-top-scrollbar': this.hasTopScrollbar });

    return (
      <div class={frameClasses} data-testid={getDataTestId(this.dataTestid, 'table-frame')}>
        {this.hasTopScrollbar && this.renderTopScrollbar()}
        {table}
      </div>
    );
  }

  private renderPagination() {
    if (['client', 'server'].includes(this.paginationMethod))
      return (
        <tk-pagination
          type={this.paginationType}
          totalItems={this.totalItems}
          rowsPerPage={this.internalRowsPerPage}
          rowsPerPageOptions={this.rowsPerPageOptions}
          currentPage={this.currentPage}
          pageReportTemplate={this.pageReportTemplate}
          itemsReportTemplate={this.itemsReportTemplate}
          applyPageOnBlur={this.applyPageOnBlur}
          data-testid={getDataTestId(this.dataTestid, 'pagination')}
          onTk-page-change={e => this.handlePageChange(e)}
          onTk-rows-per-page-change={e => {
            this.internalRowsPerPage = e.detail;
            const tmpData = this.getTableViewData();
            this.generateRenderData(tmpData, 1);
            if (this.refSelectAll) this.refSelectAll.value = false;
            if (this.selection?.length > 0) this.handleSelectAll(false);
          }}
        ></tk-pagination>
      );
  }

  render() {
    const rootClasses = classNames('tk-table-container', this.size, {
      'striped': this.striped,
      'hide-bottom-scrollbar': this.horizontalScrollPosition === 'top',
      'scrollable-container': this.hasScrollableContainer,
    });

    return (
      <div class={rootClasses} style={this.containerStyle} data-testid={getDataTestId(this.dataTestid, 'container')}>
        {this.renderHeader()}
        {this.renderTable()}
        {this.renderPagination()}
      </div>
    );
  }
}
