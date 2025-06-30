import { Component, ComponentInterface, h, Element, Prop, State, Watch, Event, EventEmitter, Listen, Fragment, Method } from '@stencil/core';
import classNames from 'classnames';
import { ITableColumn, ITableFilter, ITableCellEdit, ITableRequest, ICustomElement, ITableExportOptions, ITableRowCellStyleResponse } from './interfaces';
import { filterAndSort, handleInputKeydown, getNestedValue, calculateColumnStartWidth, calculateNewColumnWidth } from './helpers';
import _ from 'lodash';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ExcelJs from 'exceljs';
import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { getIconElementProps } from '../../utils/icon-props';
import '../../global/sass/fonts/Geologica/Geologica-Regular';
import '../../global/sass/fonts/Geologica/Geologica-Bold';

/**
 * TkTable is a component that allows you to display data in a tabular manner. It's generally called a datatable.
 * @react `import { TkTable } from '@takeoff-ui/react'`
 * @vue `import { TkTable } from '@takeoff-ui/vue'`
 * @angular `import { TkTable } from '@takeoff-ui/angular'`
 * @slot empty-data - Set how the table will appear when there is no data
 */
@Component({
  tag: 'tk-table',
  styleUrl: 'tk-table.scss',
  shadow: true,
})
export class TkTable implements ComponentInterface {
  private customCellElements: ICustomElement[] = [];
  private customHeaderElements: ICustomElement[] = [];
  private refSelectAll: HTMLTkCheckboxElement;
  private cleanupFilterPanel;
  private elFilterPanelElement: HTMLElement;
  private isResizing: boolean = false;
  private resizeColumnIndex: number = -1;
  private startX: number = 0;
  private startWidth: number = 0;

  @Element() el: HTMLTkTableElement;

  @State() elActiveSearchIcon: HTMLElement;
  @State() selectColumn: ITableColumn;
  @State() sortField: string;
  @State() sortOrder: 'asc' | 'desc';
  @State() filters: ITableFilter[] = [];
  @State() currentPage: number = 1;
  @State() renderData: any[] = [];
  @State() hasHeaderRightSlot: boolean;
  @State() hasEmptyDataSlot: boolean;
  @State() isFilterOpen: boolean = false;
  @State() columnWidths: { [key: string]: string } = {};
  @State() stickyOffsets: { left: { [key: string]: number }; right: { [key: string]: number } } = { left: {}, right: {} };

  /**
   * The column definitions (Array of Objects)
   */
  @Prop() columns: ITableColumn[] = [];

  /**
   * The style attribute of container element
   */
  @Prop() containerStyle: any = null;

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
  @Prop() size: 'small' | 'base' = 'base';

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
    if (!_.isEqual(oldValue, newValue)) {
      if (this.paginationMethod == 'client') {
        this.currentPage = 1;
        const startIndex = (this.currentPage - 1) * this.rowsPerPage;
        const endIndex = startIndex + this.rowsPerPage;
        this.renderData = [...newValue]?.slice(startIndex, endIndex) || [];
      } else {
        this.renderData = newValue?.length > 0 ? [...newValue] : [];
      }

      if (this.refSelectAll) this.refSelectAll.value = false;
      this.handleSelectAll(false);
      this.expandedRows = [];
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
  @Prop({ mutable: true }) rowsPerPage: number = 6;

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
   * Displays a loading indicator while data is being fetched or processed.
   */
  @Prop() loading: boolean;

  /**
   * Specifies which rows are expanded to show additional content.
   */
  @Prop({ mutable: true }) expandedRows: any[] = [];

  /**
   * Provides a function to customize cell styles.
   * This function takes row and column information and returns a style for a specific cell.
   */
  @Prop() cellStyle: (row: any, column: ITableColumn) => ITableRowCellStyleResponse | undefined;

  /**
   * Provides a function to customize row styles.
   * This function takes row information and returns a style for a specific row.
   */
  @Prop() rowStyle: (row: any) => ITableRowCellStyleResponse | undefined;

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

    if (this.data?.length > 0) {
      this.generateRenderData(this.data, this.currentPage, true);
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

  componentDidLoad() {
    const stickyColumns = this.columns.filter(col => col.fixed === 'left' || col.fixed === 'right');
    if (stickyColumns.length > 0) {
      this.updateStickyOffsets();
      this.setupScrollListener();
    }
  }

  componentDidRender(): void {
    this.customCellElements?.forEach(element => {
      element?.ref?.replaceChildren(element.element);
    });

    this.customHeaderElements?.forEach(element => {
      element?.ref?.replaceChildren(element.element);
    });
  }

  componentWillUpdate(): Promise<void> | void {
    // ampty-data slot'unun data her değiştiğinde görünürlüğünü ayarlamak için yapılmıştır.
    const slotEmptyData: HTMLElement = this.el.querySelector("[slot='empty-data']");

    if (slotEmptyData) {
      if (this.loading || this.data?.length > 0) {
        slotEmptyData.style.display = 'none';
      } else {
        slotEmptyData.style.display = 'block';
      }
    }
  }

  componentDidUpdate() {
    if (this.isFilterOpen) {
      if (this.elActiveSearchIcon && this.elFilterPanelElement) {
        this.cleanupFilterPanel = autoUpdate(this.elActiveSearchIcon, this.elFilterPanelElement, () => this.updatePosition());
      }
    } else {
      this.closeFilterPanel();
    }
  }

  disconnectedCallback(): void {
    if (this.cleanupFilterPanel) {
      this.cleanupFilterPanel();
      this.cleanupFilterPanel = null;
    }

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
    const tableHolder = this.el.shadowRoot?.querySelector('.table-holder');
    if (tableHolder) {
      tableHolder.removeEventListener('scroll', this.handleScroll.bind(this));
    }
  }

  /**
   * Allows tk-request event to be triggered manually
   */
  @Method()
  async serverRequest() {
    this.tkRequest.emit({
      currentPage: this.currentPage,
      rowsPerPage: this.rowsPerPage,
      sortField: this.sortField,
      sortOrder: this.sortOrder,
      filters: this.filters,
    } as ITableRequest);
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
      _data = filterAndSort(this.data, this.columns, this.filters, this.sortField, this.sortOrder);
    } else if (options.scope == 'selected') {
      _data = this.selection;
    } else if (!options.scope || options.scope == 'current-page') {
      _data = this.renderData;
    }

    if (options.type == 'pdf') {
      const doc = new jsPDF(options.orientation === 'horizontal' ? 'l' : 'p');

      autoTable(doc, {
        head: [this.columns.map(col => col.header)], // Başlıkları dinamik olarak ekler
        body: _data.map(
          row => this.columns.map(col => getNestedValue(row, col.field) || ''), // Her sütunun değerini dinamik olarak alır
        ),
        theme: 'striped',
        // styles: { halign: 'center', fontSize: 10 },
        headStyles: { fillColor: [201, 0, 25], fontStyle: 'bold' },
        bodyStyles: { fontStyle: 'normal' },
        styles: { font: 'Geologica' },
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
              rowData[col.field] = getNestedValue(item, col.field) || '';
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
      const rows = _data.map(row => this.columns.map(col => getNestedValue(row, col.field) || '').join(',')).join('\n');
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
   * Clears all filters for server side pagination
   */
  @Method()
  async clearFilters() {
    if (this.filters?.length > 0) {
      this.filters = [];
      this.currentPage = 1;

      if (this.paginationMethod !== 'server') {
        const tmpData = filterAndSort(this.data, this.columns, this.filters, this.sortField, this.sortOrder);
        this.generateRenderData(tmpData, 1, true);
      }
    }
  }

  /**
   * Clears all sorting for server side pagination
   */
  @Method()
  async clearSorting() {
    if (this.sortField) {
      this.sortField = null;
      this.sortOrder = null;
      this.currentPage = 1;
      // all sort icons are reset to their default state
      this.el.shadowRoot.querySelectorAll('thead th .tk-table-head-cell .sort-icon').forEach((icon: HTMLTkIconElement) => (icon.icon = 'swap_vert'));

      if (this.paginationMethod !== 'server') {
        const tmpData = filterAndSort(this.data, this.columns, this.filters, this.sortField, this.sortOrder);
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
    return {
      field: this.sortField,
      order: this.sortOrder,
    };
  }

  @Method()
  async setCurrentPage(page: number) {
    this.currentPage = page;
  }

  private generateRenderData(data: any[], currentPage: number, isWillLoad: boolean = false) {
    let _data = [...data];
    this.currentPage = currentPage;
    this.totalItems = _data?.length;

    // component will load dan geldiğinde tkRequest tetiklenmesin diye bu kontrol eklendi.
    if (!isWillLoad) {
      this.tkRequest.emit({
        currentPage: this.currentPage,
        rowsPerPage: this.rowsPerPage,
        sortField: this.sortField,
        sortOrder: this.sortOrder,
        filters: this.filters,
      } as ITableRequest);
    }

    if (this.paginationMethod == 'client') {
      const startIndex = (this.currentPage - 1) * this.rowsPerPage;
      const endIndex = startIndex + this.rowsPerPage;
      this.renderData = _data.slice(startIndex, endIndex);
    } else {
      this.renderData = _data;
    }

    this.expandedRows = [];
  }

  private toggleExpandRow(row: any, tdExpanderButtonRef: HTMLTkButtonElement) {
    let newExpandedRows = this.expandedRows;

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
  }

  private updatePosition() {
    if (this.elActiveSearchIcon && this.elFilterPanelElement) {
      computePosition(this.elActiveSearchIcon, this.elFilterPanelElement, {
        strategy: 'fixed',
        placement: 'bottom',
        middleware: [offset(4), flip(), shift({ padding: 5 })],
      }).then(({ x, y }) => {
        // Ensure the element still exists before updating its position
        if (this.elFilterPanelElement) {
          Object.assign(this.elFilterPanelElement.style, {
            left: `${x}px`,
            top: `${y}px`,
          });
        }
      });
    }
  }

  // Add a new method to safely close the filter panel
  private closeFilterPanel() {
    // First cleanup the floating UI
    if (this.cleanupFilterPanel) {
      this.cleanupFilterPanel();
      this.cleanupFilterPanel = null;
    }

    // Then remove the element from DOM
    if (this.elFilterPanelElement) {
      this.elFilterPanelElement.remove();
      this.elFilterPanelElement = null;
    }

    // Finally update the state
    this.isFilterOpen = false;
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

    // Bu field da mevcutta bir filtre uygulanmış ise mevcutu değiştirmek için yazıldı.
    // filtre yoksa yeni filtre olarak filters'a eklenmesi sağlandı
    const filterIndex = this.filters.findIndex(filter => filter.field == columnField);
    if (filterIndex > -1) {
      this.filters[filterIndex].value = searchInput.value.toString();
    } else {
      this.filters.push({ field: columnField, value: searchInput.value } as ITableFilter);
    }

    // current page değiştiğinde pagination componenti 'handlePageChange' eventini tetiklediğinden 2 defa emit edilmesin diye buraya bu kontrol eklendi
    if (this.currentPage == 1) {
      const tmpData = filterAndSort(this.data, this.columns, this.filters, this.sortField, this.sortOrder);
      this.generateRenderData(tmpData, 1);
    } else {
      this.currentPage = 1;
    }

    // Close the filter panel
    this.closeFilterPanel();
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
        const tmpData = filterAndSort(this.data, this.columns, this.filters, this.sortField, this.sortOrder);
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
    if (value) {
      this.selection = [...this.renderData.filter(row => (this.selectionRowDisabled ? !this.selectionRowDisabled(row) : true))];
      this.el.shadowRoot.querySelectorAll('tr').forEach(item => item.classList.add('selected'));
    } else {
      this.selection = [];
      this.el.shadowRoot.querySelectorAll('tr.selected').forEach(item => item.classList.remove('selected'));
    }
    this.tkSelectionChange.emit(this.selection);
  }

  private handleCheckboxSelectChange(isSelect: boolean, trElRef: HTMLTableRowElement, row) {
    let tmpSelection = this.selection;
    const hasSelect = _.includes(tmpSelection, row);
    if (!tmpSelection) tmpSelection = [];

    if (isSelect == false && hasSelect) {
      // seçili ise ve silinmek isteniyor ise
      _.pull(tmpSelection, row);
      trElRef.classList.remove('selected');
      this.selection = [...tmpSelection];
      this.tkSelectionChange.emit(this.selection);
    } else if (isSelect == true && !hasSelect) {
      // seçili değilse ve eklenmek isteniyor ise
      tmpSelection.push(row);
      trElRef.classList.add('selected');
      this.selection = [...tmpSelection];
      this.tkSelectionChange.emit(this.selection);
    }
  }

  private handleRadioSelectChange(row: any, trElRef: HTMLTableRowElement) {
    this.el.shadowRoot.querySelectorAll('table tr.selected').forEach(tr => tr.classList.remove('selected'));

    this.selection = row;
    this.tkSelectionChange.emit(this.selection);

    trElRef.classList.add('selected');
  }

  private handlePageChange(e) {
    const tmpData = filterAndSort(this.data, this.columns, this.filters, this.sortField, this.sortOrder);
    this.generateRenderData(tmpData, Number(e.detail.page));
    // sayfa değişikliğinde seçilen değerler sıfırlanır
    if (this.refSelectAll) this.refSelectAll.value = false;
    this.handleSelectAll(false);
  }

  private handleSortIconClick(refSortIcon: HTMLTkIconElement, col: ITableColumn) {
    if (!col.sortable) return;

    this.sortField = col.field;

    const icon = refSortIcon.icon;

    // tüm sort iconlar default duruma getirilir.
    this.el.shadowRoot.querySelectorAll('thead th .tk-table-head-cell .sort-icon').forEach((icon: HTMLTkIconElement) => (icon.icon = 'swap_vert'));

    if (icon == 'swap_vert') {
      this.sortOrder = 'asc';
      refSortIcon.icon = 'arrow_drop_up';
    } else if (icon == 'arrow_drop_up') {
      this.sortOrder = 'desc';
      refSortIcon.icon = 'arrow_drop_down';
    } else if (icon == 'arrow_drop_down') {
      this.sortField = null;
      this.sortOrder = null;
      refSortIcon.icon = 'swap_vert';
    }

    // // current page değiştiğinde pagination componenti 'handlePageChange' eventini tetiklediğinden 2 defa emit edilmesin diye buraya bu kontrol eklendi
    if (this.currentPage == 1) {
      const tmpData = filterAndSort(this.data, this.columns, this.filters, this.sortField, this.sortOrder);
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

    // Find the column configuration for this field
    const column = this.columns.find(col => col.field === field);

    // Check if the column has a filterType property and it's set to 'checkbox'
    if (column?.filterType === 'checkbox' && column.filterOptions?.length > 0) {
      // Create checkbox filter
      const filterContainer = document.createElement('div');
      filterContainer.classList.add('tk-table-filter-checkbox-container');

      // Get current filter values for this field
      const currentFilter = this.filters.find(filter => filter.field === field);
      const selectedValues = (currentFilter?.value as string[]) || [];

      const checkboxWrapper = document.createElement('div');

      checkboxWrapper.classList.add('tk-table-filter-checkbox-item');
      if (column?.filterElements?.optionsSearchInput?.show) {
        const optionsSearchInput = document.createElement('tk-input');
        optionsSearchInput.placeholder = column.filterElements.optionsSearchInput.placeholder || 'Search';

        optionsSearchInput.addEventListener('tk-change', (e: any) => {
          const searchText = e.detail.toLowerCase();
          const checkboxWrappers = filterContainer.querySelectorAll('.tk-table-filter-checkbox-item');
          checkboxWrappers.forEach((wrapper: HTMLElement) => {
            const checkbox = wrapper.querySelector('tk-checkbox:not(.select-all)') as HTMLTkCheckboxElement;
            if (checkbox) {
              const label = checkbox.label.toLowerCase();
              wrapper.style.display = label.includes(searchText) ? 'block' : 'none';
              checkbox.style.display = label.includes(searchText) ? 'block' : 'none';
            }
          });
          const visibleCheckboxes = Array.from(checkboxWrappers).filter(wrapper => {
            const checkbox = wrapper.querySelector('tk-checkbox:not(.select-all)');
            return checkbox && (wrapper as HTMLElement).style.display !== 'none';
          });
          allCheckbox.style.display = visibleCheckboxes.length === 0 ? 'none' : '';
        });
        filterContainer.appendChild(optionsSearchInput);
      }
      const allCheckbox = document.createElement('tk-checkbox');
      allCheckbox.classList.add('select-all');
      allCheckbox.label = column?.filterElements?.selectAllCheckbox?.label || column?.filterButtons?.selectAllCheckbox?.label || 'Select All';
      allCheckbox.value = selectedValues.length === column.filterOptions.length;
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
      });

      const divider = document.createElement('tk-divider');
      divider.my = 1;

      filterContainer.appendChild(checkboxWrapper);
      filterContainer.appendChild(divider);
      // Create checkboxes for each option
      column.filterOptions.forEach(option => {
        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.classList.add('tk-table-filter-checkbox-item');

        const checkbox = document.createElement('tk-checkbox');
        checkbox.value = selectedValues.includes(option.value);
        checkbox.label = option.label || option.value;

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

      // Get current filter value for this field
      const currentFilter = this.filters.find(filter => filter.field === field);
      const selectedValue = currentFilter?.value as string;

      // Create radio group name unique to this column
      const radioGroupName = `radio-filter-${field}`;
      if (column?.filterElements?.optionsSearchInput) {
        const optionsSearchInput = document.createElement('tk-input');
        optionsSearchInput.placeholder = column.filterElements.optionsSearchInput.placeholder || 'Search';

        optionsSearchInput.addEventListener('tk-change', (e: any) => {
          const searchText = e.detail.toLowerCase();
          const radioWrappers = filterContainer.querySelectorAll('.tk-table-filter-radio-item');
          radioWrappers.forEach((wrapper: HTMLElement) => {
            const radio = wrapper.querySelector('tk-radio');
            const label = radio.label.toLowerCase();
            wrapper.style.display = label.includes(searchText) ? 'block' : 'none';
          });
        });
        optionsSearchInput.style.marginBottom = '0.75rem';
        filterContainer.appendChild(optionsSearchInput);
      }
      // Create radio buttons for each option
      column.filterOptions.forEach(option => {
        const radioWrapper = document.createElement('div');
        radioWrapper.classList.add('tk-table-filter-radio-item');

        const radio = document.createElement('tk-radio');
        radio.value = option.value;
        radio.name = radioGroupName;
        radio.label = option.label || option.value;

        // Check if this option is currently selected
        if (selectedValue === option.value) {
          radio.checked = true;
        }

        radioWrapper.appendChild(radio);
        filterContainer.appendChild(radioWrapper);
      });

      this.elFilterPanelElement.appendChild(filterContainer);
    } else {
      // Default text input filter
      const input: HTMLTkInputElement = document.createElement('tk-input');
      input.placeholder = column?.filterElements?.searchInput?.placeholder || 'Search';
      input.setFocus();
      input.value = (this.filters?.find(item => item.field == field)?.value as string) || '';
      this.elFilterPanelElement.appendChild(input);
    }

    // Create buttons container
    const buttons = document.createElement('div');
    buttons.classList.add('tk-table-filter-panel-buttons');

    // Create cancel button
    const cancelButton: HTMLTkButtonElement = document.createElement('tk-button');
    cancelButton.label = column?.filterElements?.cancelButton?.label || column?.filterButtons?.cancelButton?.label || 'Remove';
    cancelButton.type = 'outlined';
    cancelButton.fullWidth = true;
    cancelButton.addEventListener('tk-click', () => {
      this.handleSearchCancelButtonClick(field);
      this.isFilterOpen = false;
    });

    // Create search/apply button
    const searchButton: HTMLTkButtonElement = document.createElement('tk-button');
    searchButton.label = column?.filterElements?.searchButton?.label || column?.filterButtons?.searchButton?.label || 'Apply';
    searchButton.fullWidth = true;
    searchButton.addEventListener('tk-click', () => {
      if (this.columns.find(col => col.field === field)?.filterType === 'checkbox') {
        this.handleCheckboxFilterApply(field);
      } else if (this.columns.find(col => col.field === field)?.filterType === 'radio') {
        this.handleRadioFilterApply(field);
      } else {
        this.handleInputFilterApply(field);
      }
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

    checkboxes.forEach((checkbox: HTMLTkCheckboxElement, index) => {
      if (checkbox.value && column.filterOptions[index] && checkbox.style.display !== 'none') {
        selectedValues.push(column.filterOptions[index].value);
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
      const tmpData = filterAndSort(this.data, this.columns, this.filters, this.sortField, this.sortOrder);
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
      const tmpData = filterAndSort(this.data, this.columns, this.filters, this.sortField, this.sortOrder);
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

    let measuredWidths: { [key: string]: number } = {};
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

  private setupScrollListener() {
    const tableHolder = this.el.shadowRoot?.querySelector('.table-holder');
    if (tableHolder) {
      tableHolder.addEventListener('scroll', this.handleScroll.bind(this));
    }
  }

  private handleScroll = (e: Event) => {
    const target = e.target as HTMLElement;
    const scrollLeft = target.scrollLeft;
    const scrollWidth = target.scrollWidth;
    const clientWidth = target.clientWidth;
    const maxScrollLeft = scrollWidth - clientWidth;

    // Update shadow visibility based on scroll position
    const leftStickyElements = this.el.shadowRoot?.querySelectorAll('.tk-table-sticky-shadow-right');
    const rightStickyElements = this.el.shadowRoot?.querySelectorAll('.tk-table-sticky-shadow-left');

    // Show/hide left sticky shadow
    if (leftStickyElements) {
      leftStickyElements.forEach((el: HTMLElement) => {
        if (scrollLeft > 0) {
          el.style.setProperty('--shadow-opacity', '1');
        } else {
          el.style.setProperty('--shadow-opacity', '0');
        }
      });
    }

    // Show/hide right sticky shadow
    if (rightStickyElements) {
      rightStickyElements.forEach((el: HTMLElement) => {
        if (scrollLeft < maxScrollLeft) {
          el.style.setProperty('--shadow-opacity', '1');
        } else {
          el.style.setProperty('--shadow-opacity', '0');
        }
      });
    }
  };

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

  private getStickyColumnStyle(col: ITableColumn) {
    const style: any = {
      width: this.columnWidths[col.field] || col.width,
      minWidth: this.columnWidths[col.field] || col.width,
      maxWidth: this.columnWidths[col.field] || col.width,
      ...col.style,
    };

    if (col.fixed === 'left' && this.stickyOffsets.left[col.field] !== undefined) {
      const leftColumns = this.columns.filter(c => c.fixed === 'left');
      const columnIndex = leftColumns.findIndex(c => c.field === col.field);

      style['--tk-table-sticky-left-offset'] = `${this.stickyOffsets.left[col.field]}px`;
      style['left'] = `${this.stickyOffsets.left[col.field]}px`;
      // En soldaki kolon en yüksek z-index'e sahip olmalı (en üstte durmalı)
      style['zIndex'] = 30 - columnIndex; // Left sticky: 30, 29, 28... (soldan sağa azalıyor)
    } else if (col.fixed === 'right' && this.stickyOffsets.right[col.field] !== undefined) {
      style['--tk-table-sticky-right-offset'] = `${this.stickyOffsets.right[col.field]}px`;
      style['right'] = `${this.stickyOffsets.right[col.field]}px`;

      // Right sticky z-index mantığı: En sağdaki (offset=0) en yüksek z-index
      const rightOffset = this.stickyOffsets.right[col.field];

      // Right kolonlar için z-index: offset'e göre hesaplıyoruz
      // offset=0 (en sağdaki) -> z-index=30
      // offset arttıkça z-index azalır
      const offsetLevel = Math.floor(rightOffset / 50); // Her 50px'te bir level
      const zIndex = 30 - offsetLevel;
      style['zIndex'] = Math.max(zIndex, 20); // Minimum z-index 20
    }

    return style;
  }

  private createHead() {
    this.customHeaderElements = [];

    const theadClasses = classNames(this.headerType);
    let selectionTh;

    if (this.selectionMode === 'checkbox') {
      selectionTh = (
        <th style={{ width: '20px', maxWidth: '20px' }} class="non-text">
          <tk-checkbox disabled={!(this.renderData.length > 0)} ref={el => (this.refSelectAll = el)} onTk-change={e => this.handleSelectAll(e.detail)}></tk-checkbox>{' '}
        </th>
      );
    } else if (this.selectionMode === 'radio') {
      selectionTh = <th style={{ width: '20px', maxWidth: '20px' }} class="non-text"></th>;
    }

    return (
      <thead class={theadClasses}>
        <tr>
          {selectionTh}
          {this.columns.map(col => {
            let refSortIcon: HTMLTkIconElement;
            let refSearchIcon: HTMLTkIconElement;
            let _sortIcon;
            let _searchIcon;
            let _customHeader;
            let _customHeaderElements: ICustomElement;

            // generate expander th
            if (col.expander) {
              const leftColumns = this.columns.filter(c => c.fixed === 'left');
              const rightColumns = this.columns.filter(c => c.fixed === 'right');
              const isFirstLeft = col.fixed === 'left' && leftColumns[0]?.field === col.field;
              const isLastRight = col.fixed === 'right' && rightColumns[rightColumns.length - 1]?.field === col.field;

              return <th class={classNames(this.getStickyColumnClasses(col, isFirstLeft, isLastRight))} style={this.getStickyColumnStyle(col)}></th>;
            }

            // generate head sort and search icons

            _sortIcon = col.sortable && (
              <tk-icon
                {...getIconElementProps('swap_vert', {
                  class: classNames('sort-icon'),
                  variant: null,
                  ref: (el: any) => (refSortIcon = el),
                  onClick: () => this.renderData?.length > 0 && this.handleSortIconClick(refSortIcon, col),
                })}
              />
            );

            if (col.searchable) {
              _searchIcon = (
                <tk-icon
                  {...getIconElementProps(col?.filterElements?.icon || 'search', {
                    class: classNames('filter-icon'),
                    variant: null,
                    ref: (el: any) => (refSearchIcon = el),
                    onClick: () => this.handleSearchIconClick(refSearchIcon, col.field),
                  })}
                />
              );

              // filtrelenmiş ise badge ile göster
              if (this.filters.findIndex(item => item.field == col.field) > -1) {
                _searchIcon = <tk-badge dot>{_searchIcon}</tk-badge>;
              }
            }
            if (typeof col?.headerHtml == 'function') {
              _customHeader = col.headerHtml();

              if (_customHeader instanceof HTMLElement) {
                _customHeaderElements = {
                  ref: null,
                  element: _customHeader,
                } as ICustomElement;
                this.customHeaderElements.push(_customHeaderElements);
              }
            }

            const leftColumns = this.columns.filter(c => c.fixed === 'left');
            const rightColumns = this.columns.filter(c => c.fixed === 'right');
            const isFirstLeft = col.fixed === 'left' && leftColumns[0]?.field === col.field;
            const isLastRight = col.fixed === 'right' && rightColumns[rightColumns.length - 1]?.field === col.field;

            return (
              <th class={classNames(this.getStickyColumnClasses(col, isFirstLeft, isLastRight))} style={this.getStickyColumnStyle(col)}>
                <div class="tk-table-head-cell">
                  {_customHeader ? (
                    !_customHeaderElements ? (
                      <div class="header-container" innerHTML={_customHeader}></div>
                    ) : (
                      <div ref={el => (_customHeaderElements.ref = el as HTMLElement)} class="header-container"></div>
                    )
                  ) : (
                    <div class="header-container">
                      <div class="header" title={col.header}>
                        {col.header}
                      </div>
                      {col?.subHeader?.length > 0 && (
                        <div class="sub-header" title={col.subHeader}>
                          {col.subHeader}
                        </div>
                      )}
                    </div>
                  )}
                  {(col.sortable || col.searchable) && (
                    <div class={classNames('icons', { 'show-icon-on-hover': col.showIconsOnHover && !this.elFilterPanelElement })}>
                      {_sortIcon}
                      {_searchIcon}
                    </div>
                  )}
                  {/* Add resize handle */}
                  <div class="tk-table-resize-handle" onMouseDown={e => this.handleMouseDown(e, this.columns.indexOf(col))}></div>
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }

  private createBody() {
    // clear custom cell elements
    this.customCellElements?.forEach(element => {
      element?.element?.remove();
    });
    this.customCellElements = [];

    if (this.renderData?.length > 0) {
      return (
        <tbody>
          {this.renderData?.map((row, index) => {
            let trElRef!: HTMLTableRowElement;
            let styleRowObject;

            if (typeof this.rowStyle == 'function') {
              const stylesRow = this.rowStyle(row);
              if (stylesRow !== undefined) styleRowObject = { backgroundColor: stylesRow.background, color: stylesRow.color };
            }

            let isRowDisabled = false;
            if (this.selectionRowDisabled) {
              isRowDisabled = this.selectionRowDisabled(row);
            }

            let selectionTd;
            if (this.selectionMode === 'checkbox') {
              selectionTd = (
                <td class="non-text">
                  <tk-checkbox
                    value={_.some(this.selection, itemValue => _.isEqual(itemValue, row))}
                    disabled={isRowDisabled}
                    onTk-change={e => this.handleCheckboxSelectChange(e.detail, trElRef, row)}
                  ></tk-checkbox>
                </td>
              );
            } else if (this.selectionMode === 'radio') {
              selectionTd = (
                <td class="non-text">
                  <tk-radio
                    value={row}
                    name="selection"
                    checked={_.isEqual(this.selection, row)}
                    disabled={isRowDisabled}
                    onTk-change={() => this.handleRadioSelectChange(row, trElRef)}
                  ></tk-radio>
                </td>
              );
            }

            return (
              <Fragment>
                <tr ref={el => (trElRef = el)} onClick={e => this.handleRowClick(e, row)} aria-disabled={isRowDisabled}>
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
                      if (stylesCell !== undefined) styleCellObject = { backgroundColor: stylesCell.background, color: stylesCell.color };
                    }

                    if (col.expander) {
                      return (
                        <td
                          class={classNames(this.getStickyColumnClasses(col, isFirstLeft, isLastRight))}
                          style={{ ...this.getStickyColumnStyle(col), ...styleRowObject, ...styleCellObject }}
                        >
                          <tk-button
                            ref={el => (tdExpanderButtonRef = el)}
                            variant="info"
                            icon="keyboard_arrow_down"
                            iconPosition="right"
                            type="text"
                            size="small"
                            onTk-click={() => this.toggleExpandRow(row, tdExpanderButtonRef)}
                          ></tk-button>
                        </td>
                      );
                    } else if (typeof col?.html == 'function') {
                      const cellElement = col?.html(row, index) as HTMLElement;

                      if (typeof cellElement == 'string') {
                        return (
                          <td
                            class={classNames('non-text', this.getStickyColumnClasses(col, isFirstLeft, isLastRight))}
                            innerHTML={cellElement}
                            style={{
                              ...this.getStickyColumnStyle(col),
                              ...styleRowObject,
                              ...styleCellObject,
                            }}
                          ></td>
                        );
                      } else if (typeof cellElement == 'object') {
                        return (
                          <td
                            ref={el => this.customCellElements.push({ ref: el as HTMLElement, element: cellElement })}
                            class={classNames('non-text', this.getStickyColumnClasses(col, isFirstLeft, isLastRight))}
                            style={{
                              ...this.getStickyColumnStyle(col),
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
                          style={{
                            ...this.getStickyColumnStyle(col),
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
                          ></input>
                        </td>
                      );
                    } else {
                      return (
                        <td
                          class={classNames(this.getStickyColumnClasses(col, isFirstLeft, isLastRight))}
                          style={{
                            ...this.getStickyColumnStyle(col),
                            ...styleRowObject,
                            ...styleCellObject,
                          }}
                        >
                          {getNestedValue(row, col.field)}
                        </td>
                      );
                    }
                  })}
                </tr>
                {this.expandedRows.length > 0 && this.expandedRows.findIndex(item => item[this.dataKey] == row[this.dataKey]) > -1 && (
                  <tr>
                    <td colSpan={100}>
                      <slot name={`expand-content-${row[this.dataKey]}`} />
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      );
    } else if (this.hasEmptyDataSlot) {
      return (
        <tbody>
          <tr>
            <td colSpan={100}>
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
        <div class="tk-table-header">
          <div>{this.cardTitle}</div>
          <div>
            <slot name="header-right"></slot>
          </div>
        </div>
      );
  }

  private renderTable() {
    return (
      <div class="table-holder">
        <table>
          {this.createHead()}
          {this.loading ? (
            <tbody class="loading-holder">
              <tr>
                <td colSpan={this.columns.length + 1}>
                  <div class="loading">
                    <svg width="97" height="97" viewBox="0 0 97 97" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  }

  private renderPagination() {
    if (['client', 'server'].includes(this.paginationMethod))
      return (
        <tk-pagination
          type={this.paginationType}
          totalItems={this.totalItems}
          rowsPerPage={this.rowsPerPage}
          rowsPerPageOptions={this.rowsPerPageOptions}
          currentPage={this.currentPage}
          onTk-page-change={e => this.handlePageChange(e)}
          onTk-rows-per-page-change={e => {
            this.rowsPerPage = e.detail;
            const tmpData = filterAndSort(this.data, this.columns, this.filters, this.sortField, this.sortOrder);
            this.generateRenderData(tmpData, 1);
            if (this.refSelectAll) this.refSelectAll.value = false;
            if (this.selection?.length > 0) this.handleSelectAll(false);
          }}
        ></tk-pagination>
      );
  }

  render() {
    const rootClasses = classNames('tk-table-container', this.size, {
      striped: this.striped,
    });

    return (
      <div class={rootClasses} style={this.containerStyle}>
        {this.renderHeader()}
        {this.renderTable()}
        {this.renderPagination()}
      </div>
    );
  }
}
