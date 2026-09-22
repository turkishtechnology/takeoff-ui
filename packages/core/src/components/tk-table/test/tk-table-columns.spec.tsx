jest.mock('lodash-es', () => ({
  cloneDeep: value => JSON.parse(JSON.stringify(value)),
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
import autoTable from 'jspdf-autotable';
import ExcelJs from 'exceljs';
import { TkTable } from '../tk-table';
import { TkIcon } from '../../tk-icon/tk-icon';
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
    // tk-icon is registered so the header icons expose their props the way they do in a browser.
    components: [TkTable, TkIcon],
    // `h` has no rest-parameter overload, so children go in as an array rather than spread.
    template: () => h('tk-table', { columns: baseColumns(), data: baseData(), dataKey: 'id', ...props }, children),
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

const shadow = (page: SpecPage) => page.root.shadowRoot;

describe('tk-table container', () => {
  it('marks the container scrollable when a height or max height is set', async () => {
    const withMaxHeight = await createPage({ containerStyle: { maxHeight: '200px' } });
    expect(shadow(withMaxHeight).querySelector('.tk-table-container').classList.contains('scrollable-container')).toBe(true);

    const withHeight = await createPage({ containerStyle: { height: '200px' } });
    expect(shadow(withHeight).querySelector('.tk-table-container').classList.contains('scrollable-container')).toBe(true);

    const plain = await createPage({ containerStyle: { padding: '4px' } });
    expect(shadow(plain).querySelector('.tk-table-container').classList.contains('scrollable-container')).toBe(false);
    expect((shadow(plain).querySelector('.tk-table-container') as HTMLElement).style.padding).toBe('4px');
  });

  it('renders no body at all without data and without empty slots', async () => {
    const page = await createPage({ data: [] });

    expect(shadow(page).querySelector('tbody')).toBeNull();
    expect(shadow(page).querySelectorAll('thead th')).toHaveLength(3);

    const nullDataPage = await createPage({ data: null });
    expect(shadow(nullDataPage).querySelector('tbody')).toBeNull();
    expect(getInstance(nullDataPage).renderData).toEqual([]);
  });

  it('shows the empty-data slot when filters are empty even if an empty-filter slot exists', async () => {
    const page = await createPage({ data: [], paginationMethod: 'client' }, [h('div', { slot: 'empty-data' }, 'no rows'), h('div', { slot: 'empty-filter' }, 'no matches')]);
    const emptyFilter = page.root.querySelector('[slot="empty-filter"]') as HTMLElement;

    expect(shadow(page).querySelector('slot[name="empty-data"]')).toBeTruthy();
    expect(shadow(page).querySelector('slot[name="empty-filter"]')).toBeNull();

    await page.root.setFilters([{ field: 'name', value: 'zzz' }]);
    await page.root.runFilters();
    await page.waitForChanges();

    expect(shadow(page).querySelector('slot[name="empty-filter"]')).toBeTruthy();
    expect(shadow(page).querySelector('slot[name="empty-data"]')).toBeNull();
    expect(emptyFilter.style.display).toBe('block');
  });

  it('hides both empty slots while loading', async () => {
    const page = await createPage({ data: [] }, [h('div', { slot: 'empty-data' }, 'no rows'), h('div', { slot: 'empty-filter' }, 'no matches')]);
    await page.root.setFilters([{ field: 'name', value: 'zzz' }]);
    const emptyData = page.root.querySelector('[slot="empty-data"]') as HTMLElement;
    const emptyFilter = page.root.querySelector('[slot="empty-filter"]') as HTMLElement;

    page.root.loading = true;
    await page.waitForChanges();

    expect(shadow(page).querySelector('.loading-holder')).toBeTruthy();
    expect(emptyData.style.display).toBe('none');
    expect(emptyFilter.style.display).toBe('none');

    page.root.loading = false;
    await page.waitForChanges();
    expect(emptyFilter.style.display).toBe('block');
  });
});

describe('tk-table column headers', () => {
  it('renders a custom filter icon and vertical action icons', async () => {
    const columns: ITableColumn[] = [
      { field: 'name', header: 'Name', searchable: true, sortable: true, filterElements: { icon: 'filter_alt' }, headerActionsOptions: { direction: 'vertical' } },
    ];
    const page = await createPage({ columns });

    const icons = shadow(page).querySelector('th[data-field="name"] .icons');
    expect(icons.classList.contains('vertical')).toBe(true);
    expect((shadow(page).querySelector('th[data-field="name"] tk-icon.filter-icon') as any).icon).toBe('filter_alt');
    expect((shadow(page).querySelector('th[data-field="name"] tk-icon.sort-icon') as any).color).toBe('var(--icon-darkest)');
  });

  it('applies the column style to regular and expander header cells', async () => {
    const columns: ITableColumn[] = [
      { field: 'expander', header: '', expander: true, fixed: 'left', style: { width: '30px' } },
      { field: 'name', header: 'Name', style: { color: 'red' } },
    ];
    const page = await createPage({ columns });

    const expanderTh = shadow(page).querySelector('thead th') as HTMLElement;
    expect(expanderTh.classList.contains('tk-table-left-sticky')).toBe(true);
    expect(expanderTh.classList.contains('tk-table-sticky-first')).toBe(true);
    expect(expanderTh.style.width).toBe('30px');
    expect((shadow(page).querySelector('th[data-field="name"]') as HTMLElement).style.color).toBe('red');
  });

  it('uses white icons on dark headers and shows the direction in the sort badge', async () => {
    const page = await createPage({ headerType: 'dark', multiSort: true, paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);

    expect((shadow(page).querySelector('th[data-field="name"] tk-icon.filter-icon') as any).color).toBe('var(--static-white)');
    expect((shadow(page).querySelector('th[data-field="amount"] tk-icon.sort-icon') as any).color).toBe('var(--static-white)');

    const sortIcon = () => shadow(page).querySelector('th[data-field="amount"] tk-icon.sort-icon') as any;

    sortIcon().click();
    await page.waitForChanges();
    expect(shadow(page).querySelector('th[data-field="amount"] tk-badge tk-icon')).toBeTruthy();
    expect(sortIcon().icon).toBe('arrow_drop_up');
    expect(instance.renderData.map((row: any) => row.id)).toEqual([2, 3, 1, 4, 5]);

    sortIcon().click();
    await page.waitForChanges();
    expect(sortIcon().icon).toBe('arrow_drop_down');
    expect(sortIcon().color).toBe('var(--static-white)');
    expect(instance.sorts).toEqual([{ field: 'amount', order: 'desc' }]);
    expect(instance.renderData.map((row: any) => row.id)).toEqual([5, 4, 1, 3, 2]);

    sortIcon().click();
    await page.waitForChanges();
    expect(shadow(page).querySelector('th[data-field="amount"] tk-badge')).toBeNull();
    expect(instance.sorts).toEqual([]);
  });

  it('sorts through a real click on the sort icon but not while the table is empty', async () => {
    const page = await createPage({ paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);

    (shadow(page).querySelector('th[data-field="amount"] tk-icon.sort-icon') as HTMLElement).click();
    await page.waitForChanges();
    expect(instance.sortField).toBe('amount');
    expect(instance.renderData.map((row: any) => row.id)).toEqual([2, 3, 1, 4, 5]);

    const emptyPage = await createPage({ data: [] });
    (shadow(emptyPage).querySelector('th[data-field="amount"] tk-icon.sort-icon') as HTMLElement).click();
    await emptyPage.waitForChanges();
    expect(getInstance(emptyPage).sortField).toBeUndefined();
  });

  it('opens the filter panel from a real click on the search icon and keeps it open for clicks on that icon', async () => {
    const page = await createPage();
    const instance = getInstance(page);
    const searchIcon = shadow(page).querySelector('th[data-field="name"] tk-icon.filter-icon') as HTMLElement;

    searchIcon.click();
    await page.waitForChanges();

    expect(instance.isFilterOpen).toBe(true);
    expect(instance.elActiveSearchIcon).toBe(searchIcon);
    expect(document.body.querySelector('.name-filter-panel')).toBeTruthy();

    instance.checkForClickOutside({ composedPath: () => [searchIcon] } as any);
    expect(instance.isFilterOpen).toBe(true);

    instance.checkForClickOutside({ composedPath: () => [document.body] } as any);
    expect(instance.isFilterOpen).toBe(false);
  });
});

describe('tk-table column resize', () => {
  it('starts a resize from a mousedown on the handle', async () => {
    const page = await createPage();
    const instance = getInstance(page);
    const handle = shadow(page).querySelector('th[data-field="status"] .tk-table-resize-handle') as HTMLElement;

    handle.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: 40 }));

    expect(instance.isResizing).toBe(true);
    expect(instance.resizeColumnIndex).toBe(1);
    expect(page.root.style.cursor).toBe('col-resize');

    instance.handleMouseUp();
    expect(instance.isResizing).toBe(false);
    expect(page.root.style.cursor).toBe('');
  });

  it('does not change the cursor when the resize does not start inside a header cell', async () => {
    const page = await createPage();
    const instance = getInstance(page);
    const onResize = listen(page, 'tk-column-resize');

    instance.handleMouseDown({ preventDefault: jest.fn(), clientX: 10, target: document.createElement('div') } as any, 0);
    expect(page.root.style.cursor).toBe('');

    instance.handleMouseUp();
    expect(onResize).not.toHaveBeenCalled();
  });

  it('ignores resize moves for an unknown column index', async () => {
    const page = await createPage();
    const instance = getInstance(page);
    const onResize = listen(page, 'tk-column-resize');
    const handle = shadow(page).querySelector('.tk-table-resize-handle') as HTMLElement;

    instance.handleMouseDown({ preventDefault: jest.fn(), clientX: 10, target: handle } as any, 99);
    instance.handleMouseMove({ preventDefault: jest.fn(), clientX: 80 } as any);
    expect(instance.columnWidths).toEqual({});

    instance.handleMouseUp();
    expect(onResize).not.toHaveBeenCalled();
    expect(instance.isResizing).toBe(false);
  });
});

describe('tk-table sticky offsets', () => {
  it('measures header widths from the DOM when they are available', async () => {
    const columns: ITableColumn[] = [
      { field: 'name', header: 'Name', fixed: 'left' },
      { field: 'status', header: 'Status' },
      { field: 'amount', header: 'Amount', fixed: 'right' },
      { field: 'extra', header: 'Extra', fixed: 'right' },
    ];
    const page = await createPage({ columns, selectionMode: 'checkbox' });
    const instance = getInstance(page);
    shadow(page)
      .querySelectorAll('thead th')
      .forEach((th: HTMLElement, index) => ((th as any).getBoundingClientRect = () => ({ width: 100 + index })));

    instance.updateStickyOffsets();
    await page.waitForChanges();

    expect(instance.stickyOffsets.left).toEqual({ name: 100 });
    expect(instance.stickyOffsets.right).toEqual({ extra: 0, amount: 104 });
    expect((shadow(page).querySelector('th[data-field="name"]') as HTMLElement).style.left).toBe('100px');
    expect((shadow(page).querySelector('th[data-field="amount"]') as HTMLElement).style.right).toBe('104px');
  });

  it('falls back to the column widths and a 120px default when nothing can be measured', async () => {
    const columns: ITableColumn[] = [
      { field: 'a', header: 'A', fixed: 'left', width: '80px' },
      { field: 'b', header: 'B', fixed: 'left' },
      { field: 'c', header: 'C', fixed: 'left', width: 'wide' },
      { field: 'd', header: 'D', fixed: 'left', width: 60 as unknown as string },
      { field: 'e', header: 'E' },
      { field: 'f', header: 'F', fixed: 'right', width: 40 as unknown as string },
      { field: 'g', header: 'G', fixed: 'right', width: '2rem' },
      { field: 'h', header: 'H', fixed: 'right', width: 'wide' },
    ];
    const page = await createPage({ columns, selectionMode: 'checkbox' });
    const instance = getInstance(page);

    expect(instance.stickyOffsets.left).toEqual({ a: 52, b: 132, c: 252, d: 372 });
    expect(instance.stickyOffsets.right).toEqual({ h: 0, g: 120, f: 122 });
  });

  it('gives the leftmost of several right sticky columns the shadow class', async () => {
    const columns: ITableColumn[] = [
      { field: 'name', header: 'Name' },
      { field: 'amount', header: 'Amount', fixed: 'right', width: '80px' },
      { field: 'extra', header: 'Extra', fixed: 'right', width: '80px' },
    ];
    const page = await createPage({ columns });

    const amountTh = shadow(page).querySelector('th[data-field="amount"]');
    const extraTh = shadow(page).querySelector('th[data-field="extra"]');
    expect(amountTh.classList.contains('tk-table-sticky-shadow-left')).toBe(true);
    expect(amountTh.classList.contains('tk-table-sticky-last')).toBe(false);
    expect(extraTh.classList.contains('tk-table-sticky-last')).toBe(true);
    expect(extraTh.classList.contains('tk-table-sticky-shadow-left')).toBe(false);

    const bodyCells = shadow(page).querySelector('tbody tr').querySelectorAll('td');
    expect(bodyCells[1].classList.contains('tk-table-sticky-shadow-left')).toBe(true);
    expect((bodyCells[2] as HTMLElement).style.right).toBe('0px');
  });
});

describe('tk-table body rows', () => {
  it('uses the row index in test ids for rows without a key', async () => {
    const columns: ITableColumn[] = [
      { field: 'name', header: 'Name', html: () => '<b>x</b>' },
      { field: 'status', header: 'Status' },
    ];
    const page = await createPage({ columns, data: [{ name: 'Alice', status: 'active' }], dataTestid: 'tbl' });

    expect(shadow(page).querySelector('tbody tr').getAttribute('data-testid')).toBe('tbl-body-row-0');
    expect(shadow(page).querySelector('tbody td').getAttribute('data-testid')).toBe('tbl-body-cell-html-0-name');
  });

  it('derives the selection control ids from the host id', async () => {
    const withId = await createPage({ id: 'grid', selectionMode: 'checkbox' });
    expect(shadow(withId).querySelector('thead tk-checkbox').getAttribute('id')).toBe('grid-checkbox-all');
    expect(shadow(withId).querySelector('tbody tk-checkbox').getAttribute('id')).toBe('grid-checkbox-0');

    const radioWithId = await createPage({ id: 'grid', selectionMode: 'radio' });
    const radio = shadow(radioWithId).querySelector('tbody tk-radio');
    expect(radio.getAttribute('id')).toBe('grid-radio-0');
    expect(radio.getAttribute('name')).toBe('grid-selection');

    const withoutId = await createPage({ selectionMode: 'radio' });
    expect(shadow(withoutId).querySelector('tbody tk-radio').hasAttribute('id')).toBe(false);
    expect(shadow(withoutId).querySelector('tbody tk-radio').getAttribute('name')).toBe('selection');
  });

  it('emits tk-row-click for clicks on a row but not for clicks on its selection control', async () => {
    const checkboxPage = await createPage({ selectionMode: 'checkbox' });
    const checkboxClicks = listen(checkboxPage, 'tk-row-click');

    shadow(checkboxPage)
      .querySelector('tbody tk-checkbox')
      .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(checkboxClicks).not.toHaveBeenCalled();

    (shadow(checkboxPage).querySelector('tbody tr') as HTMLElement).click();
    expect(checkboxClicks).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));

    const radioPage = await createPage({ selectionMode: 'radio' });
    const radioClicks = listen(radioPage, 'tk-row-click');

    shadow(radioPage)
      .querySelector('tbody tk-radio')
      .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(radioClicks).not.toHaveBeenCalled();

    (shadow(radioPage).querySelectorAll('tbody tr')[1] as HTMLElement).click();
    expect(radioClicks).toHaveBeenCalledWith(expect.objectContaining({ id: 2 }));
  });

  it('emits tk-row-click when the click path holds nodes without a tag name', async () => {
    const page = await createPage();
    const rowClickSpy = listen(page, 'tk-row-click');

    getInstance(page).handleRowClick({ composedPath: () => [{}, document.createTextNode('x'), document] } as any, { id: 3 });

    expect(rowClickSpy).toHaveBeenCalledWith({ id: 3 });
  });

  it('reuses cached custom cell elements across selection updates', async () => {
    const cell = document.createElement('span');
    cell.textContent = 'custom';
    const html = jest.fn(() => cell);
    const columns: ITableColumn[] = [{ field: 'name', header: 'Name', html }];
    const page = await createPage({ columns, data: [{ id: 1, name: 'Alice' }], selectionMode: 'checkbox' });
    const instance = getInstance(page);
    const callsAfterLoad = html.mock.calls.length;

    instance.handleCheckboxSelectChange(true, instance.renderData[0]);
    await page.waitForChanges();

    expect(html).toHaveBeenCalledTimes(callsAfterLoad);
    expect(shadow(page).querySelector('tbody tr').classList.contains('selected')).toBe(true);
    expect(shadow(page).querySelector('tbody td span').textContent).toBe('custom');

    page.root.data = [{ id: 2, name: 'Bob' }];
    await page.waitForChanges();
    expect(html.mock.calls.length).toBeGreaterThan(callsAfterLoad);
  });

  it('moves the focus between editable cells with the arrow keys', async () => {
    const columns: ITableColumn[] = [{ field: 'name', header: 'Name', editable: true }];
    const page = await createPage({ columns, data: baseData().slice(0, 2) });
    const inputs = Array.from(shadow(page).querySelectorAll('tbody input')) as HTMLInputElement[];
    const focusSecond = jest.spyOn(inputs[1], 'focus');
    const focusFirst = jest.spyOn(inputs[0], 'focus');

    Object.defineProperty(shadow(page), 'activeElement', { value: inputs[0], configurable: true });
    inputs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(focusSecond).toHaveBeenCalledTimes(1);

    Object.defineProperty(shadow(page), 'activeElement', { value: inputs[1], configurable: true });
    inputs[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    expect(focusFirst).toHaveBeenCalledTimes(1);

    inputs[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(focusFirst).toHaveBeenCalledTimes(1);
    expect(focusSecond).toHaveBeenCalledTimes(1);
  });

  it('renders the expanded row without styles when no expandedRowStyle is given', async () => {
    const columns: ITableColumn[] = [{ field: 'expander', header: '', expander: true }, ...baseColumns()];
    const page = await createPage({ columns });

    page.root.expandedRows = [baseData()[0]];
    await page.waitForChanges();

    const expandedCell = shadow(page).querySelector('slot[name="expand-content-1"]').closest('td') as HTMLElement;
    expect(expandedCell.getAttribute('style')).toBeFalsy();
    expect(expandedCell.getAttribute('colspan')).toBe('100');
  });
});

describe('tk-table top scrollbar', () => {
  it('reuses its resize observer when the top scrollbar is switched off and on again', async () => {
    const observe = jest.fn();
    const disconnect = jest.fn();
    const construct = jest.fn();
    const globalScope = globalThis as { ResizeObserver?: unknown };
    globalScope.ResizeObserver = class {
      constructor() {
        construct();
      }
      observe = observe;
      disconnect = disconnect;
    };
    try {
      const page = await createPage({ horizontalScrollPosition: 'top' });
      expect(construct).toHaveBeenCalledTimes(1);
      expect(observe).toHaveBeenCalledTimes(2);

      page.root.horizontalScrollPosition = 'bottom';
      await page.waitForChanges();
      expect(disconnect).toHaveBeenCalledTimes(1);
      expect(shadow(page).querySelector('.tk-table-top-scrollbar')).toBeNull();

      page.root.horizontalScrollPosition = 'both';
      await page.waitForChanges();
      expect(construct).toHaveBeenCalledTimes(1);
      expect(disconnect).toHaveBeenCalledTimes(2);
      expect(observe).toHaveBeenCalledTimes(4);
      expect(shadow(page).querySelector('.tk-table-top-scrollbar')).toBeTruthy();
    } finally {
      delete globalScope.ResizeObserver;
    }
  });

  it('ignores scroll events from a top scrollbar that is not rendered', async () => {
    const page = await createPage();
    const instance = getInstance(page);
    const holder = shadow(page).querySelector('.table-holder') as HTMLElement;
    holder.scrollLeft = 30;

    expect(() => instance.handleTopScrollbarScroll()).not.toThrow();
    expect(holder.scrollLeft).toBe(30);
  });
});

describe('tk-table export formatting', () => {
  const formattedColumns = (): ITableColumn[] => [
    { field: 'name', header: 'Name', exportFormat: (row: any) => row.name.toUpperCase() },
    { field: 'status', header: 'Status' },
  ];
  const partialData = () => [{ id: 1, name: 'Alice' }];

  let blobParts: any[];
  let originalBlob: any;
  beforeEach(() => {
    blobParts = [];
    originalBlob = (globalThis as any).Blob;
    (globalThis as any).Blob = class {
      constructor(parts: any[]) {
        blobParts.push(parts);
      }
    };
  });
  afterEach(() => {
    (globalThis as any).Blob = originalBlob;
  });

  it('exports the current page explicitly and applies export formatters and empty values in csv', async () => {
    const page = await createPage({ columns: formattedColumns(), data: partialData() });

    await page.root.exportFile({ type: 'csv', scope: 'current-page', fileName: 'rows' });

    expect(blobParts[0][0]).toBe('Name,Status\nALICE,');
  });

  it('falls back to the current page when the external data is empty', async () => {
    const page = await createPage({ columns: formattedColumns(), data: partialData() });

    await page.root.exportFile({ type: 'csv', externalData: [] });

    expect(blobParts[0][0]).toBe('Name,Status\nALICE,');
  });

  it('applies export formatters and empty values in the pdf body and uses the tk-text font when configured', async () => {
    const page = await createPage({ columns: formattedColumns(), data: partialData() });
    const computedStyle = jest.spyOn(globalThis as any, 'getComputedStyle').mockReturnValue({ getPropertyValue: () => "'tk-text-regular'" });
    try {
      await page.root.exportFile({ type: 'pdf' });
    } finally {
      computedStyle.mockRestore();
    }

    const options = (autoTable as jest.Mock).mock.calls.slice(-1)[0][1];
    expect(options.body).toEqual([['ALICE', '']]);
    expect(options.styles.font).toBe('tk-text');
  });

  it('applies export formatters and empty values in the excel rows', async () => {
    const page = await createPage({ columns: formattedColumns(), data: partialData() });
    const worksheet = new (ExcelJs as any).Workbook().addWorksheet();

    await page.root.exportFile({ type: 'excel' });

    expect(worksheet.addRows).toHaveBeenLastCalledWith([{ name: 'ALICE', status: '' }]);
  });

  it('exports an empty sheet when the selected scope has no selection', async () => {
    const page = await createPage({ columns: formattedColumns(), data: partialData(), selection: null });
    const worksheet = new (ExcelJs as any).Workbook().addWorksheet();

    await page.root.exportFile({ type: 'excel', scope: 'selected' });

    expect(worksheet.addRows).toHaveBeenLastCalledWith(undefined);
  });
});
