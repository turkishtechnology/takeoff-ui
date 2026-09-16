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

describe('tk-table selection edge cases', () => {
  it('treats a non array selection as empty in checkbox mode', async () => {
    const page = await createPage({ selectionMode: 'checkbox', selection: { id: 1 } });
    const instance = getInstance(page);

    expect(instance.isAllRowsSelected()).toBe(false);
    expect(instance.hasPartiallySelectedRows()).toBe(false);
    expect(instance.isRowSelected(instance.renderData[0])).toBe(false);
    expect(shadow(page).querySelector('tbody tr.selected')).toBeNull();

    instance.handleSelectAll(true);
    expect(page.root.selection.map((row: any) => row.id)).toEqual([1, 2, 3, 4, 5]);

    page.root.selection = 'nothing';
    await page.waitForChanges();
    instance.handleCheckboxSelectChange(true, instance.renderData[1]);
    expect(page.root.selection).toEqual([expect.objectContaining({ id: 2 })]);
  });

  it('keeps the header checkbox unchecked when every row is disabled', async () => {
    const page = await createPage({ selectionMode: 'checkbox', selectionRowDisabled: () => true });
    const instance = getInstance(page);
    const selectionSpy = listen(page, 'tk-selection-change');

    expect(instance.isAllRowsSelected()).toBe(false);
    expect(shadow(page).querySelector('thead tk-checkbox').hasAttribute('value')).toBe(false);
    expect(shadow(page).querySelector('tbody tr').hasAttribute('aria-disabled')).toBe(true);
    expect(shadow(page).querySelector('tbody tk-checkbox').hasAttribute('disabled')).toBe(true);

    shadow(page)
      .querySelector('thead tk-checkbox')
      .dispatchEvent(new CustomEvent('tk-change', { detail: true }));
    await page.waitForChanges();

    expect(page.root.selection).toEqual([]);
    expect(selectionSpy).toHaveBeenCalledWith([]);
  });

  it('matches rows without a key value by content when checking the header state', async () => {
    const data = [{ id: 1, name: 'Alice' }, { name: 'NoKey' }, { name: 'Other' }];
    const page = await createPage({ data, selectionMode: 'checkbox', paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);

    shadow(page)
      .querySelector('thead tk-checkbox')
      .dispatchEvent(new CustomEvent('tk-change', { detail: true }));
    await page.waitForChanges();

    expect(page.root.selection).toHaveLength(3);
    expect(instance.isAllRowsSelected()).toBe(true);
    expect(instance.hasPartiallySelectedRows()).toBe(false);

    instance.handleCheckboxSelectChange(false, instance.renderData[1]);
    await page.waitForChanges();
    expect(page.root.selection.map((row: any) => row.name)).toEqual(['Alice', 'Other']);
    expect(instance.isAllRowsSelected()).toBe(false);
  });

  it('renders no selected row in radio mode when the selection is null', async () => {
    const page = await createPage({ selectionMode: 'radio', selection: null });

    expect(shadow(page).querySelector('tbody tr.selected')).toBeNull();
    shadow(page)
      .querySelectorAll('tbody tk-radio')
      .forEach(radio => expect(radio.hasAttribute('checked')).toBe(false));

    shadow(page)
      .querySelectorAll('tbody tk-radio')[2]
      .dispatchEvent(new CustomEvent('tk-change', { detail: true }));
    await page.waitForChanges();

    expect(page.root.selection.id).toBe(3);
    expect(shadow(page).querySelectorAll('tbody tr')[2].classList.contains('selected')).toBe(true);
  });
});

describe('tk-table rows per page changes', () => {
  const changeRowsPerPage = async (page: SpecPage, rows: number) => {
    shadow(page)
      .querySelector('tk-pagination')
      .dispatchEvent(new CustomEvent('tk-rows-per-page-change', { detail: rows }));
    await page.waitForChanges();
  };

  it('does not emit a selection change when nothing was selected', async () => {
    const page = await createPage({ selectionMode: 'checkbox', paginationMethod: 'client', rowsPerPage: 2 });
    const instance = getInstance(page);
    const selectionSpy = listen(page, 'tk-selection-change');

    await changeRowsPerPage(page, 3);

    expect(instance.internalRowsPerPage).toBe(3);
    expect(instance.renderData).toHaveLength(3);
    expect(selectionSpy).not.toHaveBeenCalled();
  });

  it('does not touch a null selection when the page size changes', async () => {
    const page = await createPage({ selectionMode: 'checkbox', paginationMethod: 'client', rowsPerPage: 2, selection: null });
    const selectionSpy = listen(page, 'tk-selection-change');

    await changeRowsPerPage(page, 3);

    expect(page.root.selection).toBeNull();
    expect(selectionSpy).not.toHaveBeenCalled();
  });

  it('clears an existing selection when the page size changes without preserve mode', async () => {
    const page = await createPage({ selectionMode: 'checkbox', paginationMethod: 'client', rowsPerPage: 2 });
    const instance = getInstance(page);
    instance.handleCheckboxSelectChange(true, instance.renderData[0]);
    await page.waitForChanges();
    const selectionSpy = listen(page, 'tk-selection-change');

    await changeRowsPerPage(page, 3);

    expect(page.root.selection).toEqual([]);
    expect(selectionSpy).toHaveBeenCalledWith([]);
  });

  it('keeps the selection when the page size changes in preserve mode', async () => {
    const page = await createPage({ selectionMode: 'checkbox', paginationMethod: 'client', rowsPerPage: 2, preserveSelectionOnPagination: true });
    const instance = getInstance(page);
    instance.handleCheckboxSelectChange(true, instance.renderData[0]);
    await page.waitForChanges();

    await changeRowsPerPage(page, 3);

    expect(page.root.selection.map((row: any) => row.id)).toEqual([1]);
    expect(instance.hasPartiallySelectedRows()).toBe(true);
  });
});

describe('tk-table grouping and expansion', () => {
  it('spans the group header across the selection and filler columns', async () => {
    const columns: ITableColumn[] = [
      { field: 'name', header: 'Name', width: '100px' },
      { field: 'status', header: 'Status', width: '80px' },
    ];
    const page = await createPage({ columns, selectionMode: 'checkbox', groupBy: 'status' });

    const groupHeaders = shadow(page).querySelectorAll('.tk-table-group-header');
    expect(groupHeaders).toHaveLength(2);
    expect(groupHeaders[0].querySelector('td').getAttribute('colspan')).toBe('4');
    expect(shadow(page).querySelector('.tk-table-group-value').textContent).toBe('active');
  });

  it('refreshes the sticky shadows on the next frame after a group or row is toggled', async () => {
    const columns: ITableColumn[] = [{ field: 'expander', header: '', expander: true }, ...baseColumns()];
    const page = await createPage({ columns, groupBy: 'status', collapsibleGroups: true });
    const instance = getInstance(page);
    const refresh = jest.spyOn(instance, 'refreshStickyShadows');

    (shadow(page).querySelector('.tk-table-group-header') as HTMLElement).click();
    await page.waitForChanges();
    expect(instance.expandedGroups).toEqual(['passive']);
    expect(shadow(page).querySelector('.tk-table-group-header').classList.contains('tk-table-group-collapsed')).toBe(true);

    // every render refreshes the shadows once; the toggle schedules one more refresh for the next frame
    let callsAfterRender = refresh.mock.calls.length;
    await new Promise(resolve => requestAnimationFrame(resolve));
    expect(refresh).toHaveBeenCalledTimes(callsAfterRender + 1);

    shadow(page).querySelector('tbody tk-button').dispatchEvent(new CustomEvent('tk-click'));
    await page.waitForChanges();
    expect(page.root.expandedRows).toHaveLength(1);

    callsAfterRender = refresh.mock.calls.length;
    await new Promise(resolve => requestAnimationFrame(resolve));
    expect(refresh).toHaveBeenCalledTimes(callsAfterRender + 1);
  });

  it('clears an uncontrolled grouping through groupByColumn with an empty field', async () => {
    const page = await createPage();
    const instance = getInstance(page);
    const groupSpy = listen(page, 'tk-group-by-change');

    await page.root.groupByColumn('status');
    await page.waitForChanges();
    expect(shadow(page).querySelectorAll('.tk-table-group-header')).toHaveLength(2);

    await page.root.groupByColumn('');
    await page.waitForChanges();

    expect(shadow(page).querySelectorAll('.tk-table-group-header')).toHaveLength(0);
    expect(shadow(page).querySelectorAll('tbody tr')).toHaveLength(5);
    expect(instance.groupByColumnField).toBeNull();
    expect(groupSpy.mock.calls).toEqual([['status'], [null]]);
  });
});

describe('tk-table data edge cases', () => {
  it('treats a null data prop as an empty table', async () => {
    const page = await createPage({ paginationMethod: 'server' });
    const instance = getInstance(page);

    page.root.data = null;
    await page.waitForChanges();
    expect(instance.renderData).toEqual([]);
    expect(shadow(page).querySelector('tbody')).toBeNull();

    await page.root.clearGrouping();
    await page.waitForChanges();
    expect(instance.renderData).toEqual([]);

    instance.handleSortIconClick({ icon: 'swap_vert' }, page.root.columns[2]);
    await page.waitForChanges();
    expect(instance.sortField).toBe('amount');
    expect(instance.renderData).toEqual([]);
  });

  it('empties the rows when the data is cleared without client pagination', async () => {
    const page = await createPage();
    const selectionSpy = listen(page, 'tk-selection-change');

    page.root.data = [];
    await page.waitForChanges();

    expect(getInstance(page).renderData).toEqual([]);
    expect(shadow(page).querySelector('tbody')).toBeNull();
    expect(selectionSpy).toHaveBeenCalledWith([]);
  });
});
