import { Component, ComponentInterface, h, Element, Prop, State, Watch, Event, EventEmitter, Listen, Fragment, Method } from '@stencil/core';
import classNames from 'classnames';
import { ITableColumn, ITableFilter, ITableCellEdit, ITableRequest, ICustomElement, ITableExportOptions, ITableRowCellStyleResponse } from './interfaces';
import { createDropdown, filterAndSort, handleInputKeydown } from './helpers';
import _ from 'lodash';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ExcelJs from 'exceljs';

/**
 * TkTable is a component that allows you to display data in a tabular manner. It’s generally called a datatable.
 * @react `import { TkTable } from '@takeoff-ui/react'`
 * @vue `import { TkTable } from '@takeoff-ui/vue'`
 * @angular `import { TkTable } from '@takeoff-ui/angular'`
 * @slot empty-data - Set how the table will appear when there is no data
 */
@Component({
  tag: 'tk-table',
  styleUrl: 'tk-table.scss',
})
export class TkTable implements ComponentInterface {
  private elements: ICustomElement[] = [];
  private selectAllRef: HTMLTkCheckboxElement;

  @Element() el: HTMLTkTableElement;

  @State() elActivePopper: HTMLDivElement;
  @State() elActiveSearchIcon: HTMLElement;
  @State() selectColumn: ITableColumn;
  @State() sortField: string;
  @State() sortOrder: 'asc' | 'desc';
  @State() filters: ITableFilter[] = [];
  @State() currentPage: number = 1;
  @State() renderData: any[] = [];
  @State() hasHeaderRightSlot: boolean;
  @State() hasEmptyDataSlot: boolean;

  /**
   * The column definitions (Array of Objects)
   */
  @Prop() columns: ITableColumn[] = [];

  /**
   * Determines how rows can be selected, either with radio buttons (single selection) or checkboxes (multiple selection).
   */
  @Prop() selectionMode: 'radio' | 'checkbox';

  /**
   * List of the selected
   */
  @Prop({ mutable: true }) selection: any[] | any = [];

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

      if (this.selectAllRef) this.selectAllRef.value = false;
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
  @Prop({ reflect: true }) paginationType: 'outlined' | 'text' | 'grouped' = 'outlined';

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
   *
   */
  @Event({ eventName: 'tk-request' }) tkRequest: EventEmitter<ITableRequest>;

  /**
   *
   */
  @Event({ eventName: 'tk-expanded-rows-change' }) tkExpandedRowsChange: EventEmitter<any[]>;

  /**
   *
   */
  @Event({ eventName: 'tk-cell-edit' }) tkCellEdit: EventEmitter<ITableCellEdit>;

  componentWillLoad(): Promise<void> | void {
    this.hasHeaderRightSlot = !!this.el.querySelector('[slot="header-right"]');
    this.hasEmptyDataSlot = !!this.el.querySelector('[slot="empty-data"]');

    if (this.data?.length > 0) {
      this.generateRenderData(this.data, this.currentPage, true);
    }
  }

  componentDidRender(): void {
    this.elements?.forEach(element => {
      element?.ref?.replaceChildren(element.element);
    });
  }

  // outside click of search popper for close
  @Listen('click', { target: 'window' })
  checkForClickOutside(ev: MouseEvent) {
    if (this.elActivePopper != undefined) {
      let isInside = false;
      ev.composedPath().forEach((item: HTMLElement) => {
        if (this.elActivePopper == item || this.elActiveSearchIcon == item) {
          isInside = true;
          return;
        }
      });

      if (!isInside) this.elActivePopper.style.display = 'none';
    }
  }

  // to close search popper during resize resize
  @Listen('resize', { target: 'window' })
  checkForResize() {
    if (this.elActivePopper != undefined) {
      this.elActivePopper.style.display = 'none';
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

  private getNestedValue(obj, path) {
    return path.split('.').reduce((acc, key) => {
      return acc && acc[key] !== undefined ? acc[key] : undefined;
    }, obj);
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
    // seçili satırların stilinin kaldırılması
    this.el.querySelector('table tr.selected')?.classList.remove('selected');

    this.selection = row;
    this.tkSelectionChange.emit(this.selection);

    trElRef.classList.add('selected');
  }

  private handlePageChange(e) {
    const tmpData = filterAndSort(this.data, this.columns, this.filters, this.sortField, this.sortOrder);
    this.generateRenderData(tmpData, Number(e.detail.page));
    // sayfa değişikliğinde seçilen değerler sıfırlanır
    if (this.selectAllRef) this.selectAllRef.value = false;
    this.handleSelectAll(false);
  }

  private handleSortIconClick(refSearchIcon: HTMLElement, col: ITableColumn) {
    if (!col.sortable) return;

    this.sortField = col.field;

    const icon = refSearchIcon.innerHTML;

    // tüm sort iconlar default duruma getirilir.
    this.el.querySelectorAll('thead th .tk-table-head-cell .sort-icon').forEach(icon => (icon.innerHTML = 'swap_vert'));

    if (icon == 'swap_vert') {
      this.sortOrder = 'asc';
      refSearchIcon.innerHTML = 'arrow_drop_up';
    } else if (icon == 'arrow_drop_up') {
      this.sortOrder = 'desc';
      refSearchIcon.innerHTML = 'arrow_drop_down';
    } else if (icon == 'arrow_drop_down') {
      this.sortField = null;
      this.sortOrder = null;
      refSearchIcon.innerHTML = 'swap_vert';
    }

    // // current page değiştiğinde pagination componenti 'handlePageChange' eventini tetiklediğinden 2 defa emit edilmesin diye buraya bu kontrol eklendi
    if (this.currentPage == 1) {
      const tmpData = filterAndSort(this.data, this.columns, this.filters, this.sortField, this.sortOrder);
      this.generateRenderData(tmpData, 1);
    } else {
      this.currentPage = 1;
    }
  }

  private async handleSearchIconClick(refSearchIcon: HTMLElement, refDropdown: HTMLDivElement, refSearchInput: HTMLTkInputElement) {
    this.el.querySelectorAll('.popper').forEach((item: HTMLElement) => {
      item.style.display = 'none';
    });
    this.elActivePopper = refDropdown;
    this.elActiveSearchIcon = refSearchIcon;
    await createDropdown(refSearchIcon, refDropdown, refSearchInput);
  }

  private handleSearchButtonClick(refSearchInput: HTMLTkInputElement, columnField, refDropdown: HTMLDivElement) {
    if (refSearchInput.value.toString().length > 0) {
      // Bu field da mevcutta bir filtre uygulanmış ise mevcutu değiştirmek için yazıldı.
      // filtre yoksa yeni filtre olarak filters'a eklenmesi sağlandı
      const filterIndex = this.filters.findIndex(filter => filter.field == columnField);
      if (filterIndex > -1) {
        this.filters[filterIndex].value = refSearchInput.value.toString();
      } else {
        this.filters.push({ field: columnField, value: refSearchInput.value } as ITableFilter);
      }

      // current page değiştiğinde pagination componenti 'handlePageChange' eventini tetiklediğinden 2 defa emit edilmesin diye buraya bu kontrol eklendi
      if (this.currentPage == 1) {
        const tmpData = filterAndSort(this.data, this.columns, this.filters, this.sortField, this.sortOrder);
        this.generateRenderData(tmpData, 1);
      } else {
        this.currentPage = 1;
      }
    }
    refDropdown.style.display = 'none';
  }

  private handleSearchCancelButtonClick(refSearchInput: HTMLTkInputElement, columnField, refDropdown: HTMLDivElement) {
    const removeFilterIndex = this.filters.findIndex(filter => filter.field == columnField);
    if (removeFilterIndex > -1) {
      this.filters.splice(removeFilterIndex, 1);
      refSearchInput.value = '';

      // current page değiştiğinde pagination componenti 'handlePageChange' eventini tetiklediğinden 2 defa emit edilmesin diye buraya bu kontrol eklendi
      if (this.currentPage == 1) {
        const tmpData = filterAndSort(this.data, this.columns, this.filters, this.sortField, this.sortOrder);
        this.generateRenderData(tmpData, 1);
      } else {
        this.currentPage = 1;
      }
    }

    refDropdown.style.display = 'none';
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
      this.selection = [...this.renderData];
      this.el.querySelectorAll('tr').forEach(item => item.classList.add('selected'));
    } else {
      this.selection = [];
      this.el.querySelectorAll('tr.selected').forEach(item => item.classList.remove('selected'));
    }
    this.tkSelectionChange.emit(this.selection);
  }

  /**
   *
   * @param options
   */
  @Method()
  async exportFile(options: ITableExportOptions) {
    let _data;

    if (options.scope == 'all') {
      _data = this.data;
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
          row => this.columns.map(col => this.getNestedValue(row, col.field) || ''), // Her sütunun değerini dinamik olarak alır
        ),
        theme: 'striped',
        // styles: { halign: 'center', fontSize: 10 },
        headStyles: { fillColor: [201, 0, 25] },
      });

      doc.save(`${options.fileName ?? 'tk-table'}.pdf`);
    } else if (options.type == 'excel') {
      const workbook = new ExcelJs.Workbook();
      const worksheet = workbook.addWorksheet('Sheet 1');

      worksheet.columns = this.columns
        .filter(item => !options.ignoreColumnsFields?.includes(item.field))
        .map(item => {
          return { header: item.header, key: item.field, width: 20 };
        });
      worksheet.addRows(_data);

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${options.fileName ?? 'tk-table'}.xlsx`;
      link.click();
    } else if (options.type == 'csv') {
      const headers = this.columns.map(col => col.header).join(',');
      const rows = _data.map(row => this.columns.map(col => this.getNestedValue(row, col.field) || '').join(',')).join('\n');
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

  private createHead() {
    const theadClasses = classNames(this.headerType);
    let selectionTh;

    if (this.selectionMode === 'checkbox') {
      selectionTh = (
        <th style={{ width: '20px', maxWidth: '20px' }} class="non-text">
          <tk-checkbox ref={el => (this.selectAllRef = el)} onTk-change={e => this.handleSelectAll(e.detail)}></tk-checkbox>
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
            let refSortIcon: HTMLElement;
            let refSearchIcon: HTMLElement;
            let refSearchInput: HTMLTkInputElement;
            let refDropdown: HTMLDivElement;
            let _icons;

            // generate expander th
            if (col.expander) {
              return <th></th>;
            }

            // generate head sort and search icons
            if (col.sortable || col.searchable) {
              _icons = (
                <div class="icons">
                  {col.sortable && (
                    <i ref={el => (refSortIcon = el)} class="material-symbols-outlined sort-icon" onClick={() => this.handleSortIconClick(refSortIcon, col)}>
                      swap_vert
                    </i>
                  )}
                  {col.searchable && (
                    <i
                      ref={el => (refSearchIcon = el)}
                      class="material-symbols-outlined filter-icon"
                      onClick={() => this.handleSearchIconClick(refSearchIcon, refDropdown, refSearchInput)}
                    >
                      search
                    </i>
                  )}
                </div>
              );
            }

            return (
              <th
                class={classNames({ 'tk-table-left-sticky': col.fixed == 'left', 'tk-table-right-sticky': col.fixed == 'right' })}
                style={{ width: col.width, minWidth: col.width, maxWidth: col.width }}
              >
                <div class="tk-table-head-cell">
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
                  {_icons}
                </div>
                <div ref={el => (refDropdown = el)} class="popper">
                  <div id="arrow"></div>
                  <div class="container">
                    <tk-input
                      ref={el => (refSearchInput = el)}
                      onTk-change={e => {
                        refSearchInput.value = e.detail;
                      }}
                      placeholder="Search"
                    ></tk-input>
                    <div class="buttons">
                      <div>
                        <tk-button
                          variant="primary"
                          label="Remove"
                          fullWidth
                          type="outlined"
                          onTk-click={() => this.handleSearchCancelButtonClick(refSearchInput, col.field, refDropdown)}
                        ></tk-button>
                      </div>
                      <div>
                        <tk-button variant="primary" label="Search" fullWidth onTk-click={() => this.handleSearchButtonClick(refSearchInput, col.field, refDropdown)}></tk-button>
                      </div>
                    </div>
                  </div>
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }

  private createBody() {
    this.elements = [];

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

            let selectionTd;
            if (this.selectionMode === 'checkbox') {
              selectionTd = (
                <td class="non-text">
                  <tk-checkbox
                    value={_.some(this.selection, itemValue => _.isEqual(itemValue, row))}
                    onTk-change={e => this.handleCheckboxSelectChange(e.detail, trElRef, row)}
                  ></tk-checkbox>
                </td>
              );
            } else if (this.selectionMode === 'radio') {
              selectionTd = (
                <td class="non-text">
                  <tk-radio value={row} name="selection" onTk-change={e => this.handleRadioSelectChange(e.detail, trElRef)}></tk-radio>
                </td>
              );
            }

            return (
              <Fragment>
                <tr ref={el => (trElRef = el)}>
                  {selectionTd}
                  {this.columns.map(col => {
                    let tdExpanderButtonRef!: HTMLTkButtonElement;
                    let styleCellObject;

                    if (typeof this.cellStyle == 'function') {
                      const stylesCell = this.cellStyle(row, col);
                      if (stylesCell !== undefined) styleCellObject = { backgroundColor: stylesCell.background, color: stylesCell.color };
                    }

                    if (col.expander) {
                      return (
                        <td
                          class={classNames({ 'tk-table-left-sticky': col.fixed == 'left', 'tk-table-right-sticky': col.fixed == 'right' })}
                          style={{ ...styleRowObject, ...styleCellObject }}
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
                            class={classNames('non-text', { 'tk-table-left-sticky': col.fixed == 'left', 'tk-table-right-sticky': col.fixed == 'right' })}
                            innerHTML={cellElement}
                            style={{ width: col.width, minWidth: col.width, maxWidth: col.width, ...styleRowObject, ...styleCellObject }}
                          ></td>
                        );
                      } else if (typeof cellElement == 'object') {
                        const customElements: ICustomElement = {
                          ref: null,
                          element: cellElement,
                        };

                        this.elements.push(customElements);
                        return (
                          <td
                            ref={el => (customElements.ref = el as HTMLElement)}
                            class={classNames('non-text', { 'tk-table-left-sticky': col.fixed == 'left', 'tk-table-right-sticky': col.fixed == 'right' })}
                            style={{ width: col.width, minWidth: col.width, maxWidth: col.width, ...styleRowObject, ...styleCellObject }}
                          ></td>
                        );
                      }
                    } else if (col.editable) {
                      let editableInputRef: HTMLInputElement;
                      return (
                        <td
                          class={classNames('non-text editable', { 'tk-table-left-sticky': col.fixed == 'left', 'tk-table-right-sticky': col.fixed == 'right' })}
                          style={{ width: col.width, minWidth: col.width, maxWidth: col.width, ...styleRowObject, ...styleCellObject }}
                        >
                          <input
                            ref={el => (editableInputRef = el)}
                            value={this.getNestedValue(row, col.field)}
                            type="text"
                            onKeyDown={e => handleInputKeydown(e, this.el)}
                            onBlur={() => this.handleInputBlur(row, index, col.field, editableInputRef)}
                          ></input>
                        </td>
                      );
                    } else {
                      return (
                        <td
                          class={classNames({ 'tk-table-left-sticky': col.fixed == 'left', 'tk-table-right-sticky': col.fixed == 'right' })}
                          style={{ width: col.width, minWidth: col.width, maxWidth: col.width, ...styleRowObject, ...styleCellObject }}
                        >
                          {this.getNestedValue(row, col.field)}
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

  private renderTable() {
    return (
      <div class="table-holder">
        <table>
          {this.createHead()}
          {this.loading ? (
            <tbody>
              <tr>
                <td colSpan={this.columns.length}>
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
          rounded={false}
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
            if (this.selectAllRef) this.selectAllRef.value = false;
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
      <div class={rootClasses}>
        {this.renderHeader()}
        {this.renderTable()}
        {this.renderPagination()}
      </div>
    );
  }
}
