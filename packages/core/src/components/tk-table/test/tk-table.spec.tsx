jest.mock('lodash-es', () => ({
  isEqual: (left, right) => JSON.stringify(left) === JSON.stringify(right),
  some: (items: unknown[], predicate: (item: unknown) => boolean) => (items || []).some(predicate),
}));

jest.mock('jspdf', () => {
  const instance = { save: jest.fn() };
  const ctor: any = jest.fn(() => instance);
  ctor.__instance = instance;
  return ctor;
});
jest.mock('jspdf-autotable', () => jest.fn());
jest.mock('exceljs', () => {
  const worksheet: any = { columns: [], addRows: jest.fn() };
  const workbook: any = {
    addWorksheet: jest.fn(() => worksheet),
    xlsx: { writeBuffer: jest.fn(async () => new ArrayBuffer(8)) },
  };
  return { __esModule: true, default: { Workbook: jest.fn(() => workbook) } };
});
jest.mock('../../../utils/position-utils', () => ({
  floatingElementAutoUpdate: jest.fn(() => jest.fn()),
}));
jest.mock('../../../global/sass/fonts/geologica/geologica-regular', () => ({}), { virtual: true });
jest.mock('../../../global/sass/fonts/geologica/geologica-bold', () => ({}), { virtual: true });
jest.mock('../../../global/sass/fonts/tk-font/tk-text-regular', () => ({}), { virtual: true });
jest.mock('../../../global/sass/fonts/tk-font/tk-text-bold', () => ({}), { virtual: true });

import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ExcelJs from 'exceljs';
import { TkTable } from '../tk-table';
import { ITableColumn } from '../types';

// mock-doc does not implement replaceChildren/setHTMLUnsafe (used by cell/header rendering),
// anchor.download (used by csv export) or tk-input.setFocus (used by the text filter panel).
beforeAll(() => {
  const elementProto = Object.getPrototypeOf(document.createElement('td')) as any;
  if (!elementProto.replaceChildren) {
    elementProto.replaceChildren = function (...nodes: unknown[]) {
      while (this.firstChild) this.removeChild(this.firstChild);
      nodes.forEach(node => this.appendChild(typeof node === 'object' && node !== null ? node : this.ownerDocument.createTextNode(String(node))));
    };
  }
  if (!elementProto.setHTMLUnsafe) {
    elementProto.setHTMLUnsafe = function (html: string) {
      this.innerHTML = html;
    };
  }
  if (!elementProto.setFocus) {
    elementProto.setFocus = function () {};
  }
  const anchorProto = Object.getPrototypeOf(document.createElement('a')) as any;
  if (!Object.getOwnPropertyDescriptor(anchorProto, 'download')) {
    Object.defineProperty(anchorProto, 'download', {
      get() {
        return this.getAttribute('download') ?? '';
      },
      set(value: string) {
        this.setAttribute('download', value);
      },
      configurable: true,
    });
  }
  (URL as any).createObjectURL = jest.fn(() => 'blob:mock');
});

type TkTableTestInstance = {
  internalRowsPerPage: number;
  sortField: string | null;
  sortOrder: 'asc' | 'desc' | null;
  sorts: { field: string; order: 'asc' | 'desc' }[];
  handleSingleSort: (refSortIcon: { icon: string }, col: ITableColumn) => void;
  handleMultiSort: (refSortIcon: { icon: string }, col: ITableColumn) => void;
  el: { shadowRoot: { querySelectorAll: () => never[] } };
  getTableViewData: () => unknown[];
  generateRenderData: () => void;
};

describe('tk-table', () => {
  it('updates internal rows per page when the prop changes', () => {
    const instance = new TkTable();

    instance.rowsPerPageChanged(10, 6);

    expect((instance as unknown as TkTableTestInstance).internalRowsPerPage).toBe(10);
  });

  describe('sort icon cycle', () => {
    const createInstance = () => {
      const instance = new TkTable() as unknown as TkTableTestInstance;
      Object.defineProperty(instance, 'el', {
        value: { shadowRoot: { querySelectorAll: () => [] } },
        writable: true,
        configurable: true,
      });
      instance.getTableViewData = jest.fn(() => []);
      instance.generateRenderData = jest.fn();
      return instance;
    };

    it('single-sort defaults to asc -> desc -> none when firstSortOrder is not set', () => {
      const instance = createInstance();
      const col: ITableColumn = { field: 'name', header: 'Name', sortable: true };
      const refSortIcon = { icon: 'swap_vert' };

      instance.handleSingleSort(refSortIcon, col);
      expect(instance.sortOrder).toBe('asc');
      expect(refSortIcon.icon).toBe('arrow_drop_up');

      instance.handleSingleSort(refSortIcon, col);
      expect(instance.sortOrder).toBe('desc');
      expect(refSortIcon.icon).toBe('arrow_drop_down');

      instance.handleSingleSort(refSortIcon, col);
      expect(instance.sortField).toBeNull();
      expect(instance.sortOrder).toBeNull();
      expect(refSortIcon.icon).toBe('swap_vert');
    });

    it('single-sort cycles desc -> asc -> none when column opts into firstSortOrder desc', () => {
      const instance = createInstance();
      const col: ITableColumn = { field: 'amount', header: 'Amount', sortable: true, firstSortOrder: 'desc' };
      const refSortIcon = { icon: 'swap_vert' };

      instance.handleSingleSort(refSortIcon, col);
      expect(instance.sortOrder).toBe('desc');
      expect(refSortIcon.icon).toBe('arrow_drop_down');

      instance.handleSingleSort(refSortIcon, col);
      expect(instance.sortOrder).toBe('asc');
      expect(refSortIcon.icon).toBe('arrow_drop_up');

      instance.handleSingleSort(refSortIcon, col);
      expect(instance.sortField).toBeNull();
      expect(instance.sortOrder).toBeNull();
      expect(refSortIcon.icon).toBe('swap_vert');
    });

    it('multi-sort pushes asc order on first click when firstSortOrder is not set', () => {
      const instance = createInstance();
      instance.sorts = [];
      const col: ITableColumn = { field: 'name', header: 'Name', sortable: true };

      instance.handleMultiSort({ icon: 'swap_vert' }, col);

      expect(instance.sorts).toEqual([{ field: 'name', order: 'asc' }]);
    });

    it('multi-sort cycles desc -> asc -> removed when column opts into firstSortOrder desc', () => {
      const instance = createInstance();
      const col: ITableColumn = { field: 'amount', header: 'Amount', sortable: true, firstSortOrder: 'desc' };
      instance.sorts = [];

      instance.handleMultiSort({ icon: 'swap_vert' }, col);
      expect(instance.sorts).toEqual([{ field: 'amount', order: 'desc' }]);

      instance.handleMultiSort({ icon: 'arrow_drop_down' }, col);
      expect(instance.sorts).toEqual([{ field: 'amount', order: 'asc' }]);

      instance.handleMultiSort({ icon: 'arrow_drop_up' }, col);
      expect(instance.sorts).toEqual([]);
    });
  });
});

const baseColumns = (): ITableColumn[] => [
  {
    field: 'name',
    header: 'Name',
    sortable: true,
    searchable: true,
    sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    filter: (value: any, row: any) => row.name.toLowerCase().includes(String(value).toLowerCase()),
  },
  { field: 'status', header: 'Status' },
  { field: 'amount', header: 'Amount', sortable: true, sorter: (a: any, b: any) => a.amount - b.amount },
];

const baseData = () => [
  { id: 1, name: 'Alice', status: 'active', amount: 30 },
  { id: 2, name: 'Bob', status: 'passive', amount: 10 },
  { id: 3, name: 'Carol', status: 'active', amount: 20 },
  { id: 4, name: 'Dave', status: 'passive', amount: 40 },
  { id: 5, name: 'Eve', status: 'active', amount: 50 },
];

const createPage = async (props: Record<string, unknown> = {}, children: any[] = []) => {
  const page = await newSpecPage({
    components: [TkTable],
    template: () => h('tk-table', { columns: baseColumns(), data: baseData(), dataKey: 'id', ...props }, ...children),
  });
  await page.waitForChanges();
  return page;
};

const getInstance = (page: SpecPage) => page.rootInstance as any;

const listen = (page: SpecPage, eventName: string) => {
  const spy = jest.fn();
  page.root.addEventListener(eventName, (e: Event) => spy((e as CustomEvent).detail));
  return spy;
};

const openFilterPanel = async (page: SpecPage, field: string) => {
  const instance = getInstance(page);
  const icon = document.createElement('div');
  await instance.handleSearchIconClick(icon, field);
  await page.waitForChanges();
  return document.body.querySelector('.tk-table-filter-panel') as HTMLElement;
};

describe('tk-table rendering', () => {
  it('renders a row for each data item with the cell values', async () => {
    const page = await createPage();

    const rows = page.root.shadowRoot.querySelectorAll('tbody tr');
    expect(rows).toHaveLength(5);

    const firstRowCells = rows[0].querySelectorAll('td');
    expect(firstRowCells[0].textContent).toBe('Alice');
    expect(firstRowCells[1].textContent).toBe('active');
    expect(firstRowCells[2].textContent).toBe('30');
  });

  it('renders column headers with header and optional sub header text', async () => {
    const columns: ITableColumn[] = [
      { field: 'name', header: 'Name', subHeader: 'Full name' },
      { field: 'status', header: 'Status' },
    ];
    const page = await createPage({ columns });

    const headers = page.root.shadowRoot.querySelectorAll('thead .header');
    expect(headers[0].textContent).toBe('Name');
    expect(headers[1].textContent).toBe('Status');
    expect(page.root.shadowRoot.querySelector('thead .sub-header').textContent).toBe('Full name');
  });

  it('renders custom headers from headerHtml as string or element', async () => {
    const customEl = document.createElement('b');
    customEl.textContent = 'Custom Element';
    const columns: ITableColumn[] = [
      { field: 'name', header: 'Name', headerHtml: () => '<em>Custom String</em>' },
      { field: 'status', header: 'Status', headerHtml: () => customEl },
    ];
    const page = await createPage({ columns });

    const containers = page.root.shadowRoot.querySelectorAll('thead .header-container');
    expect(containers[0].querySelector('em').textContent).toBe('Custom String');
    expect(containers[1].querySelector('b').textContent).toBe('Custom Element');
  });

  it('renders html cells from strings and custom elements', async () => {
    const customCell = document.createElement('span');
    customCell.textContent = 'element cell';
    const columns: ITableColumn[] = [
      { field: 'name', header: 'Name', html: () => '<strong>string cell</strong>' },
      { field: 'status', header: 'Status', html: () => customCell },
    ];
    const page = await createPage({ columns, data: [{ id: 1, name: 'Alice', status: 'active' }] });

    const row = page.root.shadowRoot.querySelector('tbody tr');
    expect(row.querySelector('td strong').textContent).toBe('string cell');
    expect(row.querySelector('td span').textContent).toBe('element cell');
  });

  it('keeps the horizontal scrollbar at the bottom by default', async () => {
    const page = await createPage();

    expect(page.root.shadowRoot.querySelector('.tk-table-top-scrollbar')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.tk-table-container.hide-bottom-scrollbar')).toBeFalsy();
  });

  it('hides the bottom scrollbar when the horizontal scrollbar is placed on top', async () => {
    const page = await createPage({ horizontalScrollPosition: 'top' });

    expect(page.root.shadowRoot.querySelector('.tk-table-top-scrollbar')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('.tk-table-container.hide-bottom-scrollbar')).toBeTruthy();
  });

  it('keeps both scrollbars when the horizontal scrollbar is placed on both sides', async () => {
    const page = await createPage({ horizontalScrollPosition: 'both' });

    expect(page.root.shadowRoot.querySelector('.tk-table-top-scrollbar')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('.tk-table-container.hide-bottom-scrollbar')).toBeFalsy();
  });

  it('mirrors the scroll position between the table and the top scrollbar', async () => {
    const page = await createPage({ horizontalScrollPosition: 'top' });
    const instance = getInstance(page);
    const bar = page.root.shadowRoot.querySelector('.tk-table-top-scrollbar') as HTMLElement;
    const holder = page.root.shadowRoot.querySelector('.table-holder') as HTMLElement;

    holder.scrollLeft = 120;
    instance.handleScroll({ target: holder } as unknown as Event);
    expect(bar.scrollLeft).toBe(120);

    bar.scrollLeft = 40;
    instance.handleTopScrollbarScroll();
    expect(holder.scrollLeft).toBe(40);
  });

  it('sizes the top scrollbar from the table and hides it when there is nothing to scroll', async () => {
    const page = await createPage({ horizontalScrollPosition: 'top' });
    const instance = getInstance(page);
    const bar = page.root.shadowRoot.querySelector('.tk-table-top-scrollbar') as HTMLElement;
    const content = page.root.shadowRoot.querySelector('.tk-table-top-scrollbar-content') as HTMLElement;
    const holder = page.root.shadowRoot.querySelector('.table-holder') as HTMLElement;

    Object.defineProperty(holder, 'clientWidth', { value: 400, configurable: true });
    Object.defineProperty(holder, 'scrollWidth', { value: 1200, configurable: true });
    instance.updateTopScrollbar();

    expect(bar.style.width).toBe('400px');
    expect(content.style.width).toBe('1200px');
    expect(bar.classList.contains('hidden')).toBe(false);

    Object.defineProperty(holder, 'scrollWidth', { value: 400, configurable: true });
    instance.updateTopScrollbar();

    expect(bar.classList.contains('hidden')).toBe(true);
  });

  it('renders the empty-data slot when there is no data', async () => {
    const page = await createPage({ data: [] }, [h('div', { slot: 'empty-data' }, 'no rows')]);

    expect(page.root.shadowRoot.querySelector('slot[name="empty-data"]')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('tbody tr td[colspan="100"]')).toBeTruthy();
  });

  it('shows the empty-data slot content again when the data is emptied', async () => {
    const slotChild = document.createElement('div');
    slotChild.setAttribute('slot', 'empty-data');
    const page = await newSpecPage({
      components: [TkTable],
      template: () => h('tk-table', { columns: baseColumns(), data: baseData(), dataKey: 'id' }),
    });
    page.root.appendChild(slotChild);
    getInstance(page).hasEmptyDataSlot = true;

    page.root.data = [];
    await page.waitForChanges();

    expect(slotChild.style.display).toBe('block');
    expect(getInstance(page).renderData).toEqual([]);
  });

  it('renders the empty-filter slot when filters produce no rows', async () => {
    const page = await createPage({}, [h('div', { slot: 'empty-filter' }, 'no match')]);
    const instance = getInstance(page);

    await instance.setFilters([{ field: 'name', value: 'zzz' }]);
    await instance.runFilters();
    await page.waitForChanges();

    expect(instance.renderData).toEqual([]);
    expect(page.root.shadowRoot.querySelector('slot[name="empty-filter"]')).toBeTruthy();
  });

  it('shows the loading indicator instead of the body while loading', async () => {
    const page = await createPage({ loading: true });

    expect(page.root.shadowRoot.querySelector('tbody.loading-holder')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('tbody .loading svg')).toBeTruthy();
  });

  it('renders the card title and the header-right slot', async () => {
    const page = await createPage({ cardTitle: 'My Table' }, [h('button', { slot: 'header-right' }, 'action')]);

    const header = page.root.shadowRoot.querySelector('.tk-table-header');
    expect(header.textContent).toContain('My Table');
    expect(header.querySelector('slot[name="header-right"]')).toBeTruthy();
  });

  it('applies striped, size and headerType classes', async () => {
    const page = await createPage({ striped: true, size: 'xsmall', headerType: 'dark' });

    const container = page.root.shadowRoot.querySelector('.tk-table-container');
    expect(container.classList.contains('striped')).toBe(true);
    expect(container.classList.contains('xsmall')).toBe(true);
    expect(page.root.shadowRoot.querySelector('thead').classList.contains('dark')).toBe(true);
  });

  it('renders editable cells and emits tk-cell-edit on blur', async () => {
    const columns: ITableColumn[] = [
      { field: 'name', header: 'Name', editable: true },
      { field: 'status', header: 'Status' },
    ];
    const page = await createPage({ columns });
    const cellEditSpy = listen(page, 'tk-cell-edit');

    const input = page.root.shadowRoot.querySelector('td.editable input') as HTMLInputElement;
    expect(input).toBeTruthy();

    input.value = 'Updated';
    input.dispatchEvent(new Event('blur'));

    expect(cellEditSpy).toHaveBeenCalledWith({ rowId: 1, rowIndex: 0, field: 'name', value: 'Updated' });
  });

  it('applies rowStyle and cellStyle functions to body cells', async () => {
    const page = await createPage({
      rowStyle: () => ({ background: 'red' }),
      cellStyle: () => ({ color: 'blue' }),
    });

    const td = page.root.shadowRoot.querySelector('tbody td') as HTMLElement;
    expect(td.style.background).toBe('red');
    expect(td.style.color).toBe('blue');
  });

  it('renders sticky classes and offsets for fixed columns', async () => {
    const columns: ITableColumn[] = [
      { field: 'name', header: 'Name', fixed: 'left', width: '100px' },
      { field: 'status', header: 'Status', fixed: 'left', width: '80px' },
      { field: 'amount', header: 'Amount' },
      { field: 'extra', header: 'Extra', fixed: 'right', width: '60px' },
    ];
    const page = await createPage({ columns, data: [{ id: 1, name: 'Alice', status: 'active', amount: 30, extra: 'x' }] });
    const instance = getInstance(page);

    const ths = page.root.shadowRoot.querySelectorAll('thead th');
    expect(ths[0].classList.contains('tk-table-left-sticky')).toBe(true);
    expect(ths[0].classList.contains('tk-table-sticky-first')).toBe(true);
    expect(ths[1].classList.contains('tk-table-sticky-shadow-right')).toBe(true);
    expect(ths[3].classList.contains('tk-table-right-sticky')).toBe(true);
    expect(ths[3].classList.contains('tk-table-sticky-last')).toBe(true);
    expect(ths[3].classList.contains('tk-table-sticky-shadow-left')).toBe(true);

    expect(instance.stickyOffsets.left).toEqual({ name: 0, status: 100 });
    expect(instance.stickyOffsets.right).toEqual({ extra: 0 });
  });

  it('sets data-testid attributes derived from the dataTestid prop', async () => {
    const page = await createPage({ dataTestid: 'tbl' });

    expect(page.root.shadowRoot.querySelector('[data-testid="tbl-container"]')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('[data-testid="tbl-head"]')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('[data-testid="tbl-body-row-1"]')).toBeTruthy();
  });

  it('adds the show-icon-on-hover class when the column opts in and is not sorted or filtered', async () => {
    const columns: ITableColumn[] = [{ field: 'name', header: 'Name', sortable: true, showIconsOnHover: true }];
    const page = await createPage({ columns });

    const icons = page.root.shadowRoot.querySelector('thead .icons');
    expect(icons.classList.contains('show-icon-on-hover')).toBe(true);
  });

  it('shows a filter badge on the search icon when the column has an active filter', async () => {
    const page = await createPage();
    const instance = getInstance(page);

    expect(page.root.shadowRoot.querySelector('th[data-field="name"] tk-badge')).toBeFalsy();

    instance.filters = [{ field: 'name', value: 'ali' }];
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('th[data-field="name"] tk-badge')).toBeTruthy();
  });
});

describe('tk-table selection', () => {
  it('selects and deselects all rows through the header checkbox', async () => {
    const page = await createPage({ selectionMode: 'checkbox' });
    const selectionSpy = listen(page, 'tk-selection-change');
    const headCheckbox = page.root.shadowRoot.querySelector('thead tk-checkbox');

    headCheckbox.dispatchEvent(new CustomEvent('tk-change', { detail: true }));
    await page.waitForChanges();

    expect(page.root.selection).toHaveLength(5);
    expect(selectionSpy).toHaveBeenLastCalledWith(expect.arrayContaining([expect.objectContaining({ id: 1 })]));
    expect(getInstance(page).isAllRowsSelected()).toBe(true);

    headCheckbox.dispatchEvent(new CustomEvent('tk-change', { detail: false }));
    await page.waitForChanges();

    expect(page.root.selection).toEqual([]);
    expect(getInstance(page).isAllRowsSelected()).toBe(false);
  });

  it('skips disabled rows when selecting all', async () => {
    const page = await createPage({ selectionMode: 'checkbox', selectionRowDisabled: (row: any) => row.id === 1 });

    page.root.shadowRoot.querySelector('thead tk-checkbox').dispatchEvent(new CustomEvent('tk-change', { detail: true }));
    await page.waitForChanges();

    expect(page.root.selection).toHaveLength(4);
    expect(page.root.selection.map((row: any) => row.id)).not.toContain(1);
  });

  it('adds and removes a single row through the row checkbox', async () => {
    const page = await createPage({ selectionMode: 'checkbox' });
    const instance = getInstance(page);
    const rowCheckbox = page.root.shadowRoot.querySelector('tbody tk-checkbox');

    rowCheckbox.dispatchEvent(new CustomEvent('tk-change', { detail: true }));
    await page.waitForChanges();

    expect(page.root.selection).toHaveLength(1);
    expect(page.root.selection[0].id).toBe(1);
    expect(instance.refSelectAll.indeterminate).toBe(true);
    expect(instance.isAllRowsSelected()).toBe(false);

    page.root.shadowRoot.querySelector('tbody tk-checkbox').dispatchEvent(new CustomEvent('tk-change', { detail: false }));
    await page.waitForChanges();

    expect(page.root.selection).toEqual([]);
  });

  it('selects a single row in radio mode and marks it as selected', async () => {
    const page = await createPage({ selectionMode: 'radio' });
    const selectionSpy = listen(page, 'tk-selection-change');

    const rowRadio = page.root.shadowRoot.querySelector('tbody tk-radio');
    rowRadio.dispatchEvent(new CustomEvent('tk-change', { detail: true }));
    await page.waitForChanges();

    expect(page.root.selection.id).toBe(1);
    expect(selectionSpy).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
    expect(page.root.shadowRoot.querySelector('tbody tr').classList.contains('selected')).toBe(true);
  });
});

describe('tk-table expand', () => {
  it('expands and collapses a row through the expander button', async () => {
    const columns: ITableColumn[] = [{ field: 'expander', header: '', expander: true }, ...baseColumns()];
    const page = await createPage({ columns, expandedRowStyle: () => ({ background: 'yellow' }) });
    const expandSpy = listen(page, 'tk-expanded-rows-change');

    const expanderButton = page.root.shadowRoot.querySelector('tbody tk-button');
    expanderButton.dispatchEvent(new CustomEvent('tk-click'));
    await page.waitForChanges();

    expect(page.root.expandedRows).toHaveLength(1);
    expect(expandSpy).toHaveBeenLastCalledWith([expect.objectContaining({ id: 1 })]);

    // BUG: toggleExpandRow mutates the expandedRows array in place and reassigns the same
    // reference, so the expanded content row is not rendered until another render happens.
    expect(page.root.shadowRoot.querySelector('slot[name="expand-content-1"]')).toBeFalsy();
    page.root.expandedRows = [...page.root.expandedRows];
    await page.waitForChanges();

    const expandedSlot = page.root.shadowRoot.querySelector('slot[name="expand-content-1"]');
    expect(expandedSlot).toBeTruthy();
    expect((expandedSlot.closest('td') as HTMLElement).style.background).toBe('yellow');

    page.root.shadowRoot.querySelector('tbody tk-button').dispatchEvent(new CustomEvent('tk-click'));
    await page.waitForChanges();

    expect(page.root.expandedRows).toHaveLength(0);
    page.root.expandedRows = [];
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('slot[name="expand-content-1"]')).toBeFalsy();
  });
});

describe('tk-table pagination', () => {
  it('slices the data for client pagination and sets totalItems', async () => {
    const page = await createPage({ paginationMethod: 'client', rowsPerPage: 2 });
    const instance = getInstance(page);

    expect(instance.renderData.map((row: any) => row.id)).toEqual([1, 2]);
    expect(page.root.totalItems).toBe(5);
    expect(page.root.shadowRoot.querySelector('tk-pagination')).toBeTruthy();
  });

  it('moves to the requested page and emits tk-request on tk-page-change', async () => {
    const page = await createPage({ paginationMethod: 'client', rowsPerPage: 2 });
    const instance = getInstance(page);
    const requestSpy = listen(page, 'tk-request');

    page.root.shadowRoot.querySelector('tk-pagination').dispatchEvent(new CustomEvent('tk-page-change', { detail: { page: 2 } }));
    await page.waitForChanges();

    expect(instance.currentPage).toBe(2);
    expect(instance.renderData.map((row: any) => row.id)).toEqual([3, 4]);
    expect(requestSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        currentPage: 2,
        rowsPerPage: 2,
        totalItems: 5,
        filters: [],
      }),
    );
  });

  it('updates the page size and clears the selection on tk-rows-per-page-change', async () => {
    const page = await createPage({ paginationMethod: 'client', rowsPerPage: 2, selectionMode: 'checkbox' });
    const instance = getInstance(page);

    page.root.shadowRoot.querySelector('tbody tk-checkbox').dispatchEvent(new CustomEvent('tk-change', { detail: true }));
    await page.waitForChanges();
    expect(page.root.selection).toHaveLength(1);

    page.root.shadowRoot.querySelector('tk-pagination').dispatchEvent(new CustomEvent('tk-rows-per-page-change', { detail: 3 }));
    await page.waitForChanges();

    expect(instance.internalRowsPerPage).toBe(3);
    expect(instance.renderData).toHaveLength(3);
    expect(page.root.selection).toEqual([]);
  });

  it('keeps the data unsliced for server pagination', async () => {
    const page = await createPage({ paginationMethod: 'server', rowsPerPage: 2, totalItems: 20 });

    expect(getInstance(page).renderData).toHaveLength(5);
    expect(page.root.shadowRoot.querySelector('tk-pagination')).toBeTruthy();
  });

  it('does not render pagination without a pagination method', async () => {
    const page = await createPage();

    expect(page.root.shadowRoot.querySelector('tk-pagination')).toBeFalsy();
  });
});

describe('tk-table watchers', () => {
  it('resets to the first page and reslices when the data changes with client pagination', async () => {
    const page = await createPage({ paginationMethod: 'client', rowsPerPage: 2 });
    const instance = getInstance(page);

    page.root.shadowRoot.querySelector('tk-pagination').dispatchEvent(new CustomEvent('tk-page-change', { detail: { page: 2 } }));
    await page.waitForChanges();
    expect(instance.currentPage).toBe(2);

    page.root.data = [
      { id: 10, name: 'Neo', status: 'active', amount: 1 },
      { id: 11, name: 'Trinity', status: 'active', amount: 2 },
      { id: 12, name: 'Morpheus', status: 'passive', amount: 3 },
    ];
    await page.waitForChanges();

    expect(instance.currentPage).toBe(1);
    expect(instance.renderData.map((row: any) => row.id)).toEqual([10, 11]);
  });

  it('replaces the render data when the data changes without client pagination', async () => {
    const page = await createPage();
    const instance = getInstance(page);

    page.root.data = [{ id: 9, name: 'Zed', status: 'active', amount: 5 }];
    await page.waitForChanges();

    expect(instance.renderData.map((row: any) => row.id)).toEqual([9]);

    page.root.data = [];
    await page.waitForChanges();

    expect(instance.renderData).toEqual([]);
  });

  it('reapplies grouping when the data changes', async () => {
    const page = await createPage();
    const instance = getInstance(page);

    await instance.groupByColumn('status');
    await page.waitForChanges();
    expect(instance.groupedData).toHaveLength(2);

    page.root.data = [
      { id: 20, name: 'Ann', status: 'done', amount: 1 },
      { id: 21, name: 'Ben', status: 'done', amount: 2 },
    ];
    await page.waitForChanges();

    expect(instance.groupedData).toHaveLength(1);
    expect(instance.groupedData[0].groupValue).toBe('done');
    expect(instance.groupedData[0].groupCount).toBe(2);
  });

  it('recalculates sticky offsets when the columns change to include fixed columns', async () => {
    const page = await createPage();
    const instance = getInstance(page);
    const originalSetTimeout = global.setTimeout;
    global.setTimeout = ((callback: Function) => callback()) as any;

    try {
      page.root.columns = [
        { field: 'name', header: 'Name', fixed: 'left', width: '100px' },
        { field: 'status', header: 'Status' },
      ];
    } finally {
      global.setTimeout = originalSetTimeout;
    }
    await page.waitForChanges();

    expect(instance.stickyOffsets.left).toHaveProperty('name');
  });

  it('applies and clears grouping through the groupBy prop', async () => {
    const page = await createPage({ groupBy: 'status' });
    const instance = getInstance(page);
    const groupBySpy = listen(page, 'tk-group-by-change');

    expect(instance.isControlledGrouping).toBe(true);
    expect(instance.groupedData).toHaveLength(2);

    page.root.groupBy = 'name';
    await page.waitForChanges();
    expect(groupBySpy).toHaveBeenLastCalledWith('name');
    expect(instance.groupedData).toHaveLength(5);

    page.root.groupBy = null;
    await page.waitForChanges();
    expect(groupBySpy).toHaveBeenLastCalledWith(null);
    expect(instance.groupedData).toEqual([]);
  });

  it('updates the internal rows per page when the rowsPerPage prop changes', async () => {
    const page = await createPage({ paginationMethod: 'client', rowsPerPage: 2 });

    page.root.rowsPerPage = 4;
    await page.waitForChanges();

    expect(getInstance(page).internalRowsPerPage).toBe(4);
  });
});

describe('tk-table methods', () => {
  it('serverRequest emits the current state including data for client pagination', async () => {
    const page = await createPage({ paginationMethod: 'client', rowsPerPage: 2 });
    const requestSpy = listen(page, 'tk-request');

    await getInstance(page).serverRequest();

    expect(requestSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        currentPage: 1,
        rowsPerPage: 2,
        filters: [],
        data: expect.any(Array),
      }),
    );
  });

  it('serverRequest omits the data for server pagination', async () => {
    const page = await createPage({ paginationMethod: 'server', totalItems: 20 });
    const requestSpy = listen(page, 'tk-request');

    await getInstance(page).serverRequest();

    expect(requestSpy.mock.calls[0][0].data).toBeUndefined();
  });

  it('setFilters and getFilters round trip', async () => {
    const page = await createPage();
    const instance = getInstance(page);
    const filters = [{ field: 'name', value: 'ali' }];

    await instance.setFilters(filters);

    expect(await instance.getFilters()).toEqual(filters);
  });

  it('setCurrentPage updates the current page', async () => {
    const page = await createPage({ paginationMethod: 'client', rowsPerPage: 2 });
    const instance = getInstance(page);

    await instance.setCurrentPage(3);

    expect(instance.currentPage).toBe(3);
  });

  it('getSorting returns the single sort state or the multi sort list', async () => {
    const singlePage = await createPage();
    const singleInstance = getInstance(singlePage);
    singleInstance.sortField = 'name';
    singleInstance.sortOrder = 'asc';
    expect(await singleInstance.getSorting()).toEqual({ field: 'name', order: 'asc' });

    const multiPage = await createPage({ multiSort: true });
    const multiInstance = getInstance(multiPage);
    multiInstance.sorts = [{ field: 'amount', order: 'desc' }];
    expect(await multiInstance.getSorting()).toEqual([{ field: 'amount', order: 'desc' }]);
  });

  it('setSorting updates the single sort state and the header icon', async () => {
    const page = await createPage();
    const instance = getInstance(page);

    await instance.setSorting({ field: 'name', order: 'asc' });
    expect(instance.sortField).toBe('name');
    expect(instance.sortOrder).toBe('asc');
    expect((page.root.shadowRoot.querySelector('th[data-field="name"] tk-icon') as any).icon).toBe('arrow_drop_up');

    await instance.setSorting({ field: 'amount', order: 'desc' });
    expect((page.root.shadowRoot.querySelector('th[data-field="amount"] tk-icon') as any).icon).toBe('arrow_drop_down');
  });

  it('setSorting updates the multi sort list and the header icons', async () => {
    const page = await createPage({ multiSort: true });
    const instance = getInstance(page);

    await instance.setSorting([
      { field: 'name', order: 'asc' },
      { field: 'amount', order: 'desc' },
    ]);

    expect(instance.sorts).toHaveLength(2);
    expect((page.root.shadowRoot.querySelector('th[data-field="name"] tk-icon') as any).icon).toBe('arrow_drop_up');
    expect((page.root.shadowRoot.querySelector('th[data-field="amount"] tk-icon') as any).icon).toBe('arrow_drop_down');
  });

  it('clearSorting resets the sort state and regenerates the data', async () => {
    const page = await createPage({ paginationMethod: 'client', rowsPerPage: 2 });
    const instance = getInstance(page);

    await instance.setSorting({ field: 'amount', order: 'asc' });
    await instance.runFilters();
    await page.waitForChanges();
    expect(instance.renderData.map((row: any) => row.id)).toEqual([2, 3]);

    await instance.clearSorting();
    await page.waitForChanges();

    expect(instance.sortField).toBeNull();
    expect(instance.sortOrder).toBeNull();
    expect(instance.sorts).toEqual([]);
    expect(instance.renderData.map((row: any) => row.id)).toEqual([1, 2]);
  });

  it('clearFilters clears all filters or only the given columns', async () => {
    const page = await createPage({ paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);

    await instance.clearFilters(); // no-op without filters

    await instance.setFilters([
      { field: 'name', value: 'ali' },
      { field: 'status', value: 'active' },
    ]);
    await instance.clearFilters(['status']);
    expect(await instance.getFilters()).toEqual([{ field: 'name', value: 'ali' }]);

    await instance.clearFilters();
    expect(await instance.getFilters()).toEqual([]);
    expect(instance.renderData).toHaveLength(5);
  });

  it('runFilters applies the current filters for client side pagination', async () => {
    const page = await createPage({ paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);

    await instance.setFilters([{ field: 'name', value: 'ali' }]);
    await instance.runFilters();
    await page.waitForChanges();

    expect(instance.renderData.map((row: any) => row.name)).toEqual(['Alice']);
  });

  it('runFilters does nothing for server side pagination', async () => {
    const page = await createPage({ paginationMethod: 'server', totalItems: 5 });
    const instance = getInstance(page);

    await instance.setFilters([{ field: 'name', value: 'ali' }]);
    await instance.runFilters();
    await page.waitForChanges();

    expect(instance.renderData).toHaveLength(5);
  });
});

describe('tk-table grouping', () => {
  it('groups rows and renders group headers with counts', async () => {
    const page = await createPage();
    const instance = getInstance(page);
    const groupBySpy = listen(page, 'tk-group-by-change');

    await instance.groupByColumn('status');
    await page.waitForChanges();

    expect(groupBySpy).toHaveBeenCalledWith('status');
    const groupHeaders = page.root.shadowRoot.querySelectorAll('.tk-table-group-header');
    expect(groupHeaders).toHaveLength(2);
    expect(groupHeaders[0].textContent).toContain('active');
    expect(groupHeaders[0].textContent).toContain('(3)');
    expect(groupHeaders[1].textContent).toContain('passive');
    expect(groupHeaders[1].textContent).toContain('(2)');
    expect(page.root.shadowRoot.querySelectorAll('tbody tr')).toHaveLength(7);
  });

  it('collapses and expands groups by clicking the group header when collapsibleGroups is set', async () => {
    const page = await createPage({ collapsibleGroups: true });
    const instance = getInstance(page);

    await instance.groupByColumn('status');
    await page.waitForChanges();

    (page.root.shadowRoot.querySelector('.tk-table-group-header') as HTMLElement).click();
    await page.waitForChanges();

    const collapsedHeader = page.root.shadowRoot.querySelector('.tk-table-group-header');
    expect(collapsedHeader.classList.contains('tk-table-group-collapsed')).toBe(true);
    expect(page.root.shadowRoot.querySelectorAll('tbody tr')).toHaveLength(4);

    (page.root.shadowRoot.querySelector('.tk-table-group-header') as HTMLElement).click();
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelectorAll('tbody tr')).toHaveLength(7);
  });

  it('does not toggle groups without collapsibleGroups', async () => {
    const page = await createPage();
    const instance = getInstance(page);

    await instance.groupByColumn('status');
    await page.waitForChanges();

    (page.root.shadowRoot.querySelector('.tk-table-group-header') as HTMLElement).click();
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelectorAll('tbody tr')).toHaveLength(7);
  });

  it('clearGrouping restores the normal table view', async () => {
    const page = await createPage();
    const instance = getInstance(page);
    const groupBySpy = listen(page, 'tk-group-by-change');

    await instance.groupByColumn('status');
    await page.waitForChanges();
    await instance.clearGrouping();
    await page.waitForChanges();

    expect(groupBySpy).toHaveBeenLastCalledWith(null);
    expect(instance.groupedData).toEqual([]);
    expect(page.root.shadowRoot.querySelectorAll('.tk-table-group-header')).toHaveLength(0);
    expect(page.root.shadowRoot.querySelectorAll('tbody tr')).toHaveLength(5);
  });

  it('groupByColumn only emits the event for controlled components', async () => {
    const page = await createPage({ groupBy: 'status' });
    const instance = getInstance(page);
    const groupBySpy = listen(page, 'tk-group-by-change');

    await instance.groupByColumn('name');
    await page.waitForChanges();

    expect(groupBySpy).toHaveBeenCalledWith('name');
    expect(instance.groupByColumnField).toBe('status');
  });

  it('slices grouped rows for client pagination', async () => {
    const page = await createPage({ paginationMethod: 'client', rowsPerPage: 2 });
    const instance = getInstance(page);

    await instance.groupByColumn('status');
    await page.waitForChanges();

    expect(instance.renderData).toHaveLength(2);
    expect(page.root.totalItems).toBe(5);
  });
});

describe('tk-table export', () => {
  it('exports the current page to pdf through jspdf-autotable', async () => {
    const columns: ITableColumn[] = [
      { field: 'name', header: 'Name' },
      { field: 'amount', header: 'Amount', exportFormat: (row: any) => `TL ${row.amount}` },
    ];
    const page = await createPage({ columns, paginationMethod: 'client', rowsPerPage: 2 });

    await getInstance(page).exportFile({ type: 'pdf', fileName: 'rapor', orientation: 'horizontal' });

    expect(jsPDF).toHaveBeenCalledWith('l');
    const autoTableArgs = (autoTable as unknown as jest.Mock).mock.calls.at(-1);
    expect(autoTableArgs[1].head).toEqual([['Name', 'Amount']]);
    expect(autoTableArgs[1].body).toEqual([
      ['Alice', 'TL 30'],
      ['Bob', 'TL 10'],
    ]);
    expect((jsPDF as any).__instance.save).toHaveBeenCalledWith('rapor.pdf');
  });

  it('exports to pdf with the default file name and portrait orientation', async () => {
    const page = await createPage();

    await getInstance(page).exportFile({ type: 'pdf' });

    expect(jsPDF).toHaveBeenLastCalledWith('p');
    expect((jsPDF as any).__instance.save).toHaveBeenLastCalledWith('tk-table.pdf');
  });

  it('exports to excel ignoring the given columns', async () => {
    const page = await createPage();

    await getInstance(page).exportFile({ type: 'excel', fileName: 'rapor', ignoreColumnsFields: ['status'] });

    const workbook = (ExcelJs.Workbook as unknown as jest.Mock)();
    const worksheet = workbook.addWorksheet();
    expect(worksheet.columns).toEqual([
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Amount', key: 'amount', width: 20 },
    ]);
    const addedRows = worksheet.addRows.mock.calls.at(-1)[0];
    expect(addedRows).toHaveLength(5);
    expect(addedRows[0]).toEqual({ name: 'Alice', amount: 30 });
    expect((URL as any).createObjectURL).toHaveBeenCalled();
  });

  it('exports to excel with explicit export columns', async () => {
    const page = await createPage();

    await getInstance(page).exportFile({ type: 'excel', columns: [{ header: 'AD', field: 'name', width: 140 }] });

    const workbook = (ExcelJs.Workbook as unknown as jest.Mock)();
    const worksheet = workbook.addWorksheet();
    expect(worksheet.columns).toEqual([{ header: 'AD', key: 'name', width: 20 }]);
  });

  it('exports all filtered rows to csv for scope all', async () => {
    const page = await createPage({ paginationMethod: 'client', rowsPerPage: 2 });
    const createObjectURL = (URL as any).createObjectURL as jest.Mock;
    createObjectURL.mockClear();

    await getInstance(page).exportFile({ type: 'csv', scope: 'all', fileName: 'tumu' });

    expect(createObjectURL).toHaveBeenCalledTimes(1);
    const blob = createObjectURL.mock.calls[0][0] as Blob;
    const text = await blob.text();
    expect(text).toContain('Name,Status,Amount');
    expect(text).toContain('Eve,active,50');
  });

  it('exports the selection to csv for scope selected', async () => {
    const page = await createPage({ selectionMode: 'checkbox' });
    page.root.selection = [{ id: 2, name: 'Bob', status: 'passive', amount: 10 }];
    const createObjectURL = (URL as any).createObjectURL as jest.Mock;
    createObjectURL.mockClear();

    await getInstance(page).exportFile({ type: 'csv', scope: 'selected' });

    const text = await (createObjectURL.mock.calls[0][0] as Blob).text();
    expect(text).toContain('Bob,passive,10');
    expect(text).not.toContain('Alice');
  });

  it('exports external data to csv when provided', async () => {
    const page = await createPage();
    const createObjectURL = (URL as any).createObjectURL as jest.Mock;
    createObjectURL.mockClear();

    await getInstance(page).exportFile({ type: 'csv', externalData: [{ name: 'Ext', status: 'x', amount: 0 }] });

    const text = await (createObjectURL.mock.calls[0][0] as Blob).text();
    expect(text).toContain('Ext,x,0');
  });
});

describe('tk-table filter panel', () => {
  it('opens the text filter panel, applies the value and closes the panel', async () => {
    const page = await createPage({ paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);

    const panel = await openFilterPanel(page, 'name');
    expect(panel).toBeTruthy();
    expect(instance.isFilterOpen).toBe(true);

    const input = panel.querySelector('tk-input') as any;
    input.value = 'ali';
    instance.handleSearchButtonClick('name');
    await page.waitForChanges();

    expect(instance.filters).toEqual([{ field: 'name', value: 'ali' }]);
    expect(instance.renderData.map((row: any) => row.name)).toEqual(['Alice']);
    expect(document.body.querySelector('.tk-table-filter-panel')).toBeFalsy();
    expect(instance.isFilterOpen).toBe(false);
  });

  it('applies the text filter with the Enter key', async () => {
    const page = await createPage({ paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);

    const panel = await openFilterPanel(page, 'name');
    const input = panel.querySelector('tk-input') as any;
    input.value = 'bob';
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await page.waitForChanges();

    expect(instance.renderData.map((row: any) => row.name)).toEqual(['Bob']);
  });

  it('resets to the first page when a filter is applied from another page', async () => {
    const page = await createPage({ paginationMethod: 'client', rowsPerPage: 2 });
    const instance = getInstance(page);
    await instance.setCurrentPage(3);

    const panel = await openFilterPanel(page, 'name');
    (panel.querySelector('tk-input') as any).value = 'ali';
    instance.handleSearchButtonClick('name');
    await page.waitForChanges();

    expect(instance.currentPage).toBe(1);
  });

  it('removes the filter through the cancel button', async () => {
    const page = await createPage({ paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);

    let panel = await openFilterPanel(page, 'name');
    (panel.querySelector('tk-input') as any).value = 'ali';
    instance.handleSearchButtonClick('name');
    await page.waitForChanges();
    expect(instance.renderData).toHaveLength(1);

    panel = await openFilterPanel(page, 'name');
    const cancelButton = panel.querySelectorAll('.tk-table-filter-panel-buttons tk-button')[0];
    cancelButton.dispatchEvent(new CustomEvent('tk-click'));
    await page.waitForChanges();

    expect(instance.filters).toEqual([]);
    expect(instance.renderData).toHaveLength(5);
    expect(document.body.querySelector('.tk-table-filter-panel')).toBeFalsy();
  });

  it('switches the panel when another search icon is clicked', async () => {
    const page = await createPage();
    const instance = getInstance(page);

    await openFilterPanel(page, 'name');
    expect(document.body.querySelector('.name-filter-panel')).toBeTruthy();

    const otherIcon = document.createElement('div');
    await instance.handleSearchIconClick(otherIcon, 'status');
    await page.waitForChanges();

    expect(document.body.querySelector('.name-filter-panel')).toBeFalsy();
    expect(document.body.querySelector('.status-filter-panel')).toBeTruthy();
  });

  it('closes the panel on outside clicks and keeps it open on inside clicks', async () => {
    const page = await createPage();
    const instance = getInstance(page);

    await openFilterPanel(page, 'name');
    instance.checkForClickOutside({ composedPath: () => [instance.elFilterPanelElement] } as any);
    expect(instance.isFilterOpen).toBe(true);

    instance.checkForClickOutside({ composedPath: () => [] } as any);
    expect(instance.isFilterOpen).toBe(false);
    expect(document.body.querySelector('.tk-table-filter-panel')).toBeFalsy();
  });

  it('removes the filter panel on disconnect', async () => {
    const page = await createPage();
    const instance = getInstance(page);

    await openFilterPanel(page, 'name');
    instance.disconnectedCallback();

    expect(instance.isFilterOpen).toBe(false);
    expect(document.querySelector('.tk-table-filter-panel')).toBeFalsy();
  });
});

describe('tk-table checkbox filter', () => {
  const checkboxColumns = (): ITableColumn[] => [
    { field: 'name', header: 'Name' },
    {
      field: 'status',
      header: 'Status',
      searchable: true,
      filterType: 'checkbox',
      filterOptions: [
        { value: 'active', label: 'Active' },
        { value: 'passive', label: 'Passive' },
      ],
      filterElements: {
        optionsSearchInput: { show: true, placeholder: 'Ara', emptyMessage: 'Sonuç yok' },
        selectAllCheckbox: { label: 'Tümü' },
      },
    },
  ];

  it('builds the checkbox panel and applies the selected values', async () => {
    const page = await createPage({ columns: checkboxColumns(), paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);

    const panel = await openFilterPanel(page, 'status');
    expect(panel.querySelector('.tk-table-filter-checkbox-container')).toBeTruthy();
    expect((panel.querySelector('tk-checkbox.select-all') as any).label).toBe('Tümü');

    const options = panel.querySelectorAll('.tk-table-filter-checkbox-item tk-checkbox:not(.select-all)');
    expect(options).toHaveLength(2);

    (options[0] as any).value = true;
    instance.handleSearchButtonClick('status');
    await page.waitForChanges();

    expect(instance.filters).toEqual([{ field: 'status', value: ['active'], type: 'checkbox' }]);
    expect(instance.renderData.map((row: any) => row.status)).toEqual(['active', 'active', 'active']);
  });

  it('selects every option through the select-all checkbox', async () => {
    const page = await createPage({ columns: checkboxColumns(), paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);

    const panel = await openFilterPanel(page, 'status');
    panel.querySelector('tk-checkbox.select-all').dispatchEvent(new CustomEvent('tk-change', { detail: true }));

    const options = panel.querySelectorAll('.tk-table-filter-checkbox-item tk-checkbox:not(.select-all)');
    options.forEach(option => expect((option as any).value).toBe(true));

    instance.handleSearchButtonClick('status');
    await page.waitForChanges();

    expect(instance.filters[0].value).toEqual(['active', 'passive']);
    expect(instance.renderData).toHaveLength(5);
  });

  it('marks the select-all checkbox indeterminate when an option changes', async () => {
    const page = await createPage({ columns: checkboxColumns() });

    const panel = await openFilterPanel(page, 'status');
    const selectAll = panel.querySelector('tk-checkbox.select-all') as any;
    const options = panel.querySelectorAll('.tk-table-filter-checkbox-item tk-checkbox:not(.select-all)');

    (options[0] as any).value = true;
    options[0].dispatchEvent(new CustomEvent('tk-change', { detail: true }));

    expect(selectAll.indeterminate).toBe(true);
    expect(selectAll.value).toBe(false);

    (options[1] as any).value = true;
    options[1].dispatchEvent(new CustomEvent('tk-change', { detail: true }));

    expect(selectAll.value).toBe(true);
    expect(selectAll.indeterminate).toBe(false);
  });

  it('filters the visible options through the options search input', async () => {
    const page = await createPage({ columns: checkboxColumns() });

    const panel = await openFilterPanel(page, 'status');
    const searchInput = panel.querySelector('tk-input') as any;

    searchInput.dispatchEvent(new CustomEvent('tk-change', { detail: 'act' }));
    const wrappers = panel.querySelectorAll('.tk-table-filter-checkbox-item');
    const optionWrappers = Array.from(wrappers).filter(wrapper => wrapper.querySelector('tk-checkbox:not(.select-all)'));
    expect((optionWrappers[0] as HTMLElement).style.display).toBe('block');
    expect((optionWrappers[1] as HTMLElement).style.display).toBe('none');

    searchInput.dispatchEvent(new CustomEvent('tk-change', { detail: 'zzz' }));
    expect(searchInput.hint).toBe('Sonuç yok');

    searchInput.dispatchEvent(new CustomEvent('tk-change', { detail: '' }));
    expect(searchInput.hint).toBeNull();
  });

  it('restores the previous selection when the panel is reopened', async () => {
    const page = await createPage({ columns: checkboxColumns(), paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);

    let panel = await openFilterPanel(page, 'status');
    (panel.querySelectorAll('.tk-table-filter-checkbox-item tk-checkbox:not(.select-all)')[0] as any).value = true;
    instance.handleSearchButtonClick('status');
    await page.waitForChanges();

    panel = await openFilterPanel(page, 'status');
    const options = panel.querySelectorAll('.tk-table-filter-checkbox-item tk-checkbox:not(.select-all)');
    expect((options[0] as any).value).toBe(true);
    expect((options[1] as any).value).toBe(false);
    expect((panel.querySelector('tk-checkbox.select-all') as any).indeterminate).toBe(true);
  });
});

describe('tk-table radio filter', () => {
  const radioColumns = (): ITableColumn[] => [
    { field: 'name', header: 'Name' },
    {
      field: 'status',
      header: 'Status',
      searchable: true,
      filterType: 'radio',
      filterOptions: [
        { value: 'active', label: 'Active' },
        { value: 'passive', label: 'Passive' },
      ],
      filterElements: { optionsSearchInput: { placeholder: 'Ara' } },
    },
  ];

  it('builds the radio panel and applies the checked value', async () => {
    const page = await createPage({ columns: radioColumns(), paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);

    const panel = await openFilterPanel(page, 'status');
    const radios = panel.querySelectorAll('.tk-table-filter-radio-item tk-radio');
    expect(radios).toHaveLength(2);

    (radios[1] as any).checked = true;
    instance.handleSearchButtonClick('status');
    await page.waitForChanges();

    expect(instance.filters).toEqual([{ field: 'status', value: 'passive', type: 'radio' }]);
    expect(instance.renderData.map((row: any) => row.status)).toEqual(['passive', 'passive']);
  });

  it('checks the previously selected option and removes the filter when unchecked', async () => {
    const page = await createPage({ columns: radioColumns(), paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);

    let panel = await openFilterPanel(page, 'status');
    ((panel.querySelectorAll('.tk-table-filter-radio-item tk-radio') as any)[1] as any).checked = true;
    instance.handleSearchButtonClick('status');
    await page.waitForChanges();

    panel = await openFilterPanel(page, 'status');
    const radios = panel.querySelectorAll('.tk-table-filter-radio-item tk-radio');
    expect((radios[1] as any).checked).toBe(true);

    (radios[1] as any).checked = false;
    instance.handleSearchButtonClick('status');
    await page.waitForChanges();

    expect(instance.filters).toEqual([]);
    expect(instance.renderData).toHaveLength(5);
  });

  it('filters the visible radio options through the options search input', async () => {
    const page = await createPage({ columns: radioColumns() });

    const panel = await openFilterPanel(page, 'status');
    panel.querySelector('tk-input').dispatchEvent(new CustomEvent('tk-change', { detail: 'pas' }));

    const wrappers = panel.querySelectorAll('.tk-table-filter-radio-item');
    expect((wrappers[0] as HTMLElement).style.display).toBe('none');
    expect((wrappers[1] as HTMLElement).style.display).toBe('block');
  });
});

describe('tk-table datepicker filter', () => {
  const dateColumns = (): ITableColumn[] => [
    { field: 'name', header: 'Name' },
    {
      field: 'date',
      header: 'Date',
      searchable: true,
      filterType: 'datepicker',
      filterElements: { optionsSearchDatepicker: { dateFormat: 'yyyy-MM-dd', label: 'Tarih' } },
    },
  ];

  const dateData = () => [
    { id: 1, name: 'Alice', date: '2024-05-10' },
    { id: 2, name: 'Bob', date: '2024-05-12' },
    { id: 3, name: 'Carol', date: '2024-05-15' },
  ];

  it('builds the datepicker panel with merged props and applies the selected date', async () => {
    const page = await createPage({ columns: dateColumns(), data: dateData(), paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);

    const panel = await openFilterPanel(page, 'date');
    const datepicker = panel.querySelector('tk-datepicker') as any;
    expect(datepicker.dateFormat).toBe('yyyy-MM-dd');
    expect(datepicker.label).toBe('Tarih');
    expect(datepicker.mode).toBe('single');

    datepicker.dispatchEvent(new CustomEvent('tk-change', { detail: '2024-05-12' }));
    expect(datepicker.value).toBe('2024-05-12');

    instance.handleSearchButtonClick('date');
    await page.waitForChanges();

    expect(instance.filters).toEqual([{ field: 'date', value: '2024-05-12', type: 'datepicker' }]);
    expect(instance.renderData.map((row: any) => row.name)).toEqual(['Bob']);
  });

  it('removes the date filter when the datepicker is cleared', async () => {
    const page = await createPage({ columns: dateColumns(), data: dateData(), paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);

    let panel = await openFilterPanel(page, 'date');
    (panel.querySelector('tk-datepicker') as any).value = '2024-05-12';
    instance.handleSearchButtonClick('date');
    await page.waitForChanges();
    expect(instance.renderData).toHaveLength(1);

    panel = await openFilterPanel(page, 'date');
    (panel.querySelector('tk-datepicker') as any).value = null;
    instance.handleSearchButtonClick('date');
    await page.waitForChanges();

    expect(instance.filters).toEqual([]);
    expect(instance.renderData).toHaveLength(3);
  });
});

describe('tk-table treeview filter', () => {
  const treeviewColumns = (): ITableColumn[] => [
    { field: 'name', header: 'Name' },
    {
      field: 'status',
      header: 'Status',
      searchable: true,
      filterType: 'treeview',
      filterOptions: [
        {
          key: 'statuses',
          label: 'Statuses',
          children: [
            { key: 'active', label: 'Active' },
            { key: 'passive', label: 'Passive' },
          ],
        },
      ] as any,
      filterElements: { optionsSearchInput: { show: true }, treeViewOptions: { size: 'base', selectionStrategy: 'leaf' } },
    },
  ];

  it('builds the treeview panel and applies the selected values', async () => {
    const page = await createPage({ columns: treeviewColumns(), paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);

    const panel = await openFilterPanel(page, 'status');
    const treeview = panel.querySelector('tk-tree-view') as any;
    expect(treeview.selectable).toBe(true);
    expect(treeview.size).toBe('base');
    expect(treeview.items).toHaveLength(1);

    treeview.dispatchEvent(new CustomEvent('tk-change', { detail: ['active'] }));
    expect(treeview.value).toEqual(['active']);

    instance.handleSearchButtonClick('status');
    await page.waitForChanges();

    expect(instance.filters).toEqual([{ field: 'status', value: ['active'], type: 'treeview' }]);
    expect(instance.renderData.map((row: any) => row.status)).toEqual(['active', 'active', 'active']);
  });

  it('filters the tree items recursively through the options search input', async () => {
    const page = await createPage({ columns: treeviewColumns() });

    const panel = await openFilterPanel(page, 'status');
    const treeview = panel.querySelector('tk-tree-view') as any;
    const searchInput = panel.querySelector('tk-input');

    searchInput.dispatchEvent(new CustomEvent('tk-change', { detail: 'passive' }));
    expect(treeview.items).toHaveLength(1);
    expect(treeview.items[0].children).toHaveLength(1);
    expect(treeview.items[0].children[0].key).toBe('passive');

    searchInput.dispatchEvent(new CustomEvent('tk-change', { detail: 'statuses' }));
    expect(treeview.items[0].children).toHaveLength(2);

    searchInput.dispatchEvent(new CustomEvent('tk-change', { detail: 'nope' }));
    expect(treeview.items).toHaveLength(0);
  });

  it('removes the treeview filter when no value is selected', async () => {
    const page = await createPage({ columns: treeviewColumns(), paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);

    let panel = await openFilterPanel(page, 'status');
    (panel.querySelector('tk-tree-view') as any).value = ['active'];
    instance.handleSearchButtonClick('status');
    await page.waitForChanges();
    expect(instance.renderData).toHaveLength(3);

    panel = await openFilterPanel(page, 'status');
    (panel.querySelector('tk-tree-view') as any).value = [];
    instance.handleSearchButtonClick('status');
    await page.waitForChanges();

    expect(instance.filters).toEqual([]);
    expect(instance.renderData).toHaveLength(5);
  });
});

describe('tk-table interactions', () => {
  it('emits tk-row-click for plain row clicks and suppresses clicks from popovers', async () => {
    const page = await createPage();
    const instance = getInstance(page);
    const rowClickSpy = listen(page, 'tk-row-click');

    instance.handleRowClick({ composedPath: () => [] } as any, { id: 1 });
    expect(rowClickSpy).toHaveBeenCalledWith({ id: 1 });

    // mock-doc custom elements are not HTMLElement instances, so fake the tag on a div
    const popover = document.createElement('div');
    Object.defineProperty(popover, 'tagName', { value: 'TK-POPOVER' });
    const stopPropagation = jest.fn();
    instance.handleRowClick({ composedPath: () => [popover], stopPropagation } as any, { id: 2 });

    expect(stopPropagation).toHaveBeenCalled();
    expect(rowClickSpy).toHaveBeenCalledTimes(1);
  });

  it('sorts the data through the sort icon cycle', async () => {
    const page = await createPage({ paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);
    const amountCol = page.root.columns[2];
    const refSortIcon = { icon: 'swap_vert' };

    instance.handleSortIconClick(refSortIcon, amountCol);
    await page.waitForChanges();
    expect(instance.renderData.map((row: any) => row.id)).toEqual([2, 3, 1, 4, 5]);

    instance.handleSortIconClick(refSortIcon, amountCol);
    await page.waitForChanges();
    expect(instance.renderData.map((row: any) => row.id)).toEqual([5, 4, 1, 3, 2]);

    instance.handleSortIconClick(refSortIcon, amountCol);
    await page.waitForChanges();
    expect(instance.renderData.map((row: any) => row.id)).toEqual([1, 2, 3, 4, 5]);
  });

  it('ignores sort clicks on non sortable columns', async () => {
    const page = await createPage();
    const instance = getInstance(page);

    instance.handleSortIconClick({ icon: 'swap_vert' }, page.root.columns[1]);

    expect(instance.sortField).toBeUndefined();
  });

  it('renders a priority badge for multi sorted columns', async () => {
    const page = await createPage({ multiSort: true, paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);

    instance.handleSortIconClick({ icon: 'swap_vert' }, page.root.columns[2]);
    await page.waitForChanges();

    expect(instance.sorts).toEqual([{ field: 'amount', order: 'asc' }]);
    expect(page.root.shadowRoot.querySelector('th[data-field="amount"] tk-badge')).toBeTruthy();
    expect(instance.renderData.map((row: any) => row.id)).toEqual([2, 3, 1, 4, 5]);
  });

  it('resizes a column with the mouse handlers', async () => {
    const columns: ITableColumn[] = [
      { field: 'name', header: 'Name', width: '100px' },
      { field: 'status', header: 'Status' },
    ];
    const page = await createPage({ columns });
    const instance = getInstance(page);
    const handle = page.root.shadowRoot.querySelector('.tk-table-resize-handle') as HTMLElement;

    instance.handleMouseMove({ preventDefault: jest.fn(), clientX: 500 } as any); // ignored while not resizing
    expect(instance.columnWidths.name).toBe('100px');

    instance.handleMouseDown({ preventDefault: jest.fn(), clientX: 100, target: handle } as any, 0);
    expect(instance.isResizing).toBe(true);

    instance.handleMouseMove({ preventDefault: jest.fn(), clientX: 160 } as any);
    expect(instance.columnWidths.name).toBe('160px');

    instance.handleMouseMove({ preventDefault: jest.fn(), clientX: 20 } as any);
    expect(instance.columnWidths.name).toBe('50px');

    instance.handleMouseUp();
    expect(instance.isResizing).toBe(false);
  });

  it('toggles sticky shadows based on the scroll position', async () => {
    const columns: ITableColumn[] = [
      { field: 'name', header: 'Name', fixed: 'left', width: '100px' },
      { field: 'status', header: 'Status' },
      { field: 'amount', header: 'Amount', fixed: 'right', width: '80px' },
    ];
    const page = await createPage({ columns });
    const instance = getInstance(page);

    instance.handleScroll({ target: { scrollLeft: 50, scrollWidth: 1000, clientWidth: 200, scrollTop: 10 } });

    const leftShadowCell = page.root.shadowRoot.querySelector('.tk-table-sticky-shadow-right') as HTMLElement;
    const rightShadowCell = page.root.shadowRoot.querySelector('.tk-table-sticky-shadow-left') as HTMLElement;
    const thead = page.root.shadowRoot.querySelector('thead') as HTMLElement;
    expect(leftShadowCell.style.getPropertyValue('--shadow-opacity')).toBe('1');
    expect(rightShadowCell.style.getPropertyValue('--shadow-opacity')).toBe('1');
    expect(thead.style.getPropertyValue('--header-shadow-opacity')).toBe('1');

    instance.handleScroll({ target: { scrollLeft: 0, scrollWidth: 1000, clientWidth: 200, scrollTop: 0 } });
    expect(leftShadowCell.style.getPropertyValue('--shadow-opacity')).toBe('0');
    expect(thead.style.getPropertyValue('--header-shadow-opacity')).toBe('0');

    instance.handleScroll({ target: { scrollLeft: 800, scrollWidth: 1000, clientWidth: 200, scrollTop: 0 } });
    expect(rightShadowCell.style.getPropertyValue('--shadow-opacity')).toBe('0');
  });
});
