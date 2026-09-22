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

import { floatingElementAutoUpdate } from '../../../utils/position-utils';
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

const openFilterPanel = async (page: SpecPage, field: string) => {
  const instance = getInstance(page);
  const icon = document.createElement('div');
  await instance.handleSearchIconClick(icon, field);
  await page.waitForChanges();
  return document.body.querySelector('.tk-table-filter-panel') as HTMLElement;
};

const shadow = (page: SpecPage) => page.root.shadowRoot;

// The table only resets `currentPage` when it is not on page 1; the real tk-pagination re-emits
// tk-page-change for the new page, which is what reloads the rows. Simulate that emit here.
const emitPageChange = async (page: SpecPage, pageNumber: number) => {
  shadow(page)
    .querySelector('tk-pagination')
    .dispatchEvent(new CustomEvent('tk-page-change', { detail: { page: pageNumber } }));
  await page.waitForChanges();
};

describe('tk-table sorting methods', () => {
  it('leaves the state untouched when clearSorting is called without an active sort', async () => {
    const page = await createPage({ paginationMethod: 'client', rowsPerPage: 2 });
    const instance = getInstance(page);
    const requestSpy = listen(page, 'tk-request');
    await page.root.setCurrentPage(2);

    await page.root.clearSorting();
    await page.waitForChanges();

    expect(instance.currentPage).toBe(2);
    expect(requestSpy).not.toHaveBeenCalled();
  });

  it('clears multi sorts and restores the original order', async () => {
    const page = await createPage({ multiSort: true, paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);

    instance.handleSortIconClick({ icon: 'swap_vert' }, page.root.columns[2]);
    await page.waitForChanges();
    expect(instance.renderData.map((row: any) => row.id)).toEqual([2, 3, 1, 4, 5]);
    expect(instance.sortField).toBeUndefined();

    await page.root.clearSorting();
    await page.waitForChanges();

    expect(instance.sorts).toEqual([]);
    expect(instance.renderData.map((row: any) => row.id)).toEqual([1, 2, 3, 4, 5]);
    expect(await page.root.getSorting()).toEqual([]);
  });

  it('resets to the first page when a sort is applied from another page', async () => {
    const page = await createPage({ paginationMethod: 'client', rowsPerPage: 2 });
    const instance = getInstance(page);
    await page.root.setCurrentPage(3);
    await page.waitForChanges();

    instance.handleSortIconClick({ icon: 'swap_vert' }, page.root.columns[2]);
    await page.waitForChanges();
    expect(instance.currentPage).toBe(1);

    await emitPageChange(page, 1);
    expect(instance.renderData.map((row: any) => row.id)).toEqual([2, 3]);
  });

  it('clearFilters is a no-op without filters', async () => {
    const page = await createPage({ paginationMethod: 'client', rowsPerPage: 2 });
    const instance = getInstance(page);
    await page.root.setCurrentPage(2);

    await page.root.clearFilters();
    await page.waitForChanges();

    expect(instance.currentPage).toBe(2);
    expect(await page.root.getFilters()).toEqual([]);
  });
});

describe('tk-table text filter panel', () => {
  it('configures the search input from the column definition', async () => {
    const columns: ITableColumn[] = [
      {
        field: 'name',
        header: 'Name',
        searchable: true,
        filterElements: {
          searchInput: {
            placeholder: 'Find a name',
            label: 'Name',
            maskOptions: { regex: '[a-z]*' } as any,
            disabled: true,
            invalid: true,
            clearable: true,
            error: 'Bad',
            hint: 'Type a name',
            icon: 'person',
            iconPosition: 'right',
            size: 'small',
          },
        },
      },
    ];
    const page = await createPage({ columns, dataTestid: 'tbl' });

    const input = (await openFilterPanel(page, 'name')).querySelector('tk-input') as any;
    expect(input.placeholder).toBe('Find a name');
    expect(input.label).toBe('Name');
    expect(input.maskOptions).toEqual({ regex: '[a-z]*' });
    expect(input.disabled).toBe(true);
    expect(input.invalid).toBe(true);
    expect(input.clearable).toBe(true);
    expect(input.error).toBe('Bad');
    expect(input.hint).toBe('Type a name');
    expect(input.icon).toBe('person');
    expect(input.iconPosition).toBe('right');
    expect(input.size).toBe('small');
    expect(input.dataTestid).toBe('tbl-filter-search-input-name');
  });

  it('uses plain defaults for the search input when the column has no configuration', async () => {
    const page = await createPage();

    const input = (await openFilterPanel(page, 'name')).querySelector('tk-input') as any;
    expect(input.placeholder).toBe('Search');
    expect(input.disabled).toBe(false);
    expect(input.invalid).toBe(false);
    expect(input.clearable).toBe(false);
    expect(input.size).toBe('base');
    expect(input.value).toBe('');
  });

  it('labels the panel buttons from filterElements, filterButtons or the defaults', async () => {
    const columns: ITableColumn[] = [
      { field: 'name', header: 'Name', searchable: true, filterElements: { searchButton: { label: 'Go' }, cancelButton: { label: 'Drop' } } },
      { field: 'status', header: 'Status', searchable: true, filterButtons: { searchButton: { label: 'Find' }, cancelButton: { label: 'Reset' } } },
      { field: 'amount', header: 'Amount', searchable: true },
    ];
    const page = await createPage({ columns });
    const buttonLabels = async (field: string) =>
      Array.from((await openFilterPanel(page, field)).querySelectorAll('.tk-table-filter-panel-buttons tk-button')).map((button: any) => button.label);

    expect(await buttonLabels('name')).toEqual(['Drop', 'Go']);
    expect(await buttonLabels('status')).toEqual(['Reset', 'Find']);
    expect(await buttonLabels('amount')).toEqual(['Remove', 'Apply']);
  });

  it('applies the filter through the apply button and updates an existing filter on the next apply', async () => {
    const page = await createPage({ paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);

    let panel = await openFilterPanel(page, 'name');
    (panel.querySelector('tk-input') as any).value = 'ali';
    panel.querySelectorAll('.tk-table-filter-panel-buttons tk-button')[1].dispatchEvent(new CustomEvent('tk-click'));
    await page.waitForChanges();
    expect(instance.filters).toEqual([{ field: 'name', value: 'ali' }]);
    expect(instance.renderData.map((row: any) => row.name)).toEqual(['Alice']);
    expect(shadow(page).querySelector('th[data-field="name"] tk-badge')).toBeTruthy();

    panel = await openFilterPanel(page, 'name');
    const input = panel.querySelector('tk-input') as any;
    expect(input.value).toBe('ali');
    input.value = 'bo';
    instance.handleSearchButtonClick('name');
    await page.waitForChanges();

    expect(instance.filters).toEqual([{ field: 'name', value: 'bo' }]);
    expect(instance.renderData.map((row: any) => row.name)).toEqual(['Bob']);
  });

  it('treats a null search value as an empty filter and drops the filter badge', async () => {
    const page = await createPage({ paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);

    const panel = await openFilterPanel(page, 'name');
    (panel.querySelector('tk-input') as any).value = null;
    instance.handleSearchButtonClick('name');
    await page.waitForChanges();

    expect(instance.filters).toEqual([{ field: 'name', value: '' }]);
    expect(instance.renderData).toHaveLength(5);
    expect(shadow(page).querySelector('th[data-field="name"] tk-badge')).toBeNull();
  });

  it('resets to the first page when a filter is removed from another page', async () => {
    const page = await createPage({ paginationMethod: 'client', rowsPerPage: 2 });
    const instance = getInstance(page);

    let panel = await openFilterPanel(page, 'name');
    (panel.querySelector('tk-input') as any).value = 'a';
    instance.handleSearchButtonClick('name');
    await page.waitForChanges();
    expect(page.root.totalItems).toBe(3);

    await page.root.setCurrentPage(2);
    await page.waitForChanges();

    panel = await openFilterPanel(page, 'name');
    panel.querySelectorAll('.tk-table-filter-panel-buttons tk-button')[0].dispatchEvent(new CustomEvent('tk-click'));
    await page.waitForChanges();

    expect(instance.filters).toEqual([]);
    expect(instance.currentPage).toBe(1);

    await emitPageChange(page, 1);
    expect(instance.renderData.map((row: any) => row.id)).toEqual([1, 2]);
  });

  it('re-positions the open filter panel when the table re-renders', async () => {
    const page = await createPage();
    const instance = getInstance(page);

    await openFilterPanel(page, 'name');
    const positionMock = floatingElementAutoUpdate as jest.Mock;
    const firstCleanup = positionMock.mock.results.slice(-1)[0].value;
    const positionCalls = positionMock.mock.calls.length;

    page.root.striped = true;
    await page.waitForChanges();

    expect(firstCleanup).toHaveBeenCalledTimes(1);
    expect(positionMock.mock.calls.length).toBe(positionCalls + 1);
    expect(instance.isFilterOpen).toBe(true);
    expect(document.body.querySelector('.tk-table-filter-panel')).toBeTruthy();
  });

  it('sets data-testid attributes on the panel elements', async () => {
    const page = await createPage({ dataTestid: 'tbl' });

    const panel = await openFilterPanel(page, 'name');

    expect(panel.getAttribute('data-testid')).toBe('tbl-filter-panel-name');
    expect(panel.querySelector('.tk-table-filter-panel-buttons').getAttribute('data-testid')).toBe('tbl-filter-panel-buttons-name');
    const buttons = panel.querySelectorAll('.tk-table-filter-panel-buttons tk-button') as any;
    expect(buttons[0].dataTestid).toBe('tbl-filter-cancel-button-name');
    expect(buttons[1].dataTestid).toBe('tbl-filter-apply-button-name');
  });

  it('falls back to the text filter when a typed filter has no options', async () => {
    const columns: ITableColumn[] = [
      { field: 'name', header: 'Name', searchable: true, filterType: 'checkbox', filterOptions: [] },
      { field: 'status', header: 'Status', searchable: true, filterType: 'radio', filterOptions: [] },
      { field: 'amount', header: 'Amount', searchable: true, filterType: 'treeview', filterOptions: [] },
    ];
    const page = await createPage({ columns });

    for (const field of ['name', 'status', 'amount']) {
      const panel = await openFilterPanel(page, field);
      expect(panel.querySelector('tk-input')).toBeTruthy();
      expect(panel.querySelector('.tk-table-filter-checkbox-container')).toBeNull();
      expect(panel.querySelector('.tk-table-filter-radio-container')).toBeNull();
      expect(panel.querySelector('.tk-table-filter-treeview-container')).toBeNull();
    }
  });
});

describe('tk-table checkbox filter branches', () => {
  const columnsWith = (filterElements?: ITableColumn['filterElements']): ITableColumn[] => [
    { field: 'name', header: 'Name' },
    {
      field: 'status',
      header: 'Status',
      searchable: true,
      filterType: 'checkbox',
      filterOptions: [{ value: 'active' }, { value: 'passive', label: 'Passive' }],
      filterElements,
    },
  ];
  const optionCheckboxes = (panel: HTMLElement) => Array.from(panel.querySelectorAll('.tk-table-filter-checkbox-item tk-checkbox:not(.select-all)')) as any[];

  it('uses the default search placeholder and empty message', async () => {
    const page = await createPage({ columns: columnsWith({ optionsSearchInput: { show: true } }) });

    const panel = await openFilterPanel(page, 'status');
    const searchInput = panel.querySelector('tk-input') as any;
    expect(searchInput.placeholder).toBe('Search');
    expect(optionCheckboxes(panel)[0].label).toBe('active');

    searchInput.dispatchEvent(new CustomEvent('tk-change', { detail: 'zzz' }));
    expect(searchInput.hint).toBe('No results found');
  });

  it('can hide the select-all checkbox', async () => {
    const page = await createPage({ columns: columnsWith({ selectAllCheckbox: { hide: true } }), paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);

    const panel = await openFilterPanel(page, 'status');
    expect(panel.querySelector('tk-checkbox.select-all')).toBeNull();
    expect(panel.querySelector('tk-divider')).toBeNull();

    const options = optionCheckboxes(panel);
    options[1].value = true;
    options[1].dispatchEvent(new CustomEvent('tk-change', { detail: true }));
    instance.handleSearchButtonClick('status');
    await page.waitForChanges();

    expect(instance.filters).toEqual([{ field: 'status', value: ['passive'], type: 'checkbox' }]);
    expect(instance.renderData).toHaveLength(2);
  });

  it('uses the default select-all label and clears every option when it is unchecked', async () => {
    const page = await createPage({ columns: columnsWith(), paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);

    const panel = await openFilterPanel(page, 'status');
    const selectAll = panel.querySelector('tk-checkbox.select-all') as any;
    expect(selectAll.label).toBe('Select All');

    selectAll.dispatchEvent(new CustomEvent('tk-change', { detail: true }));
    expect(optionCheckboxes(panel).map(cb => cb.value)).toEqual([true, true]);

    selectAll.dispatchEvent(new CustomEvent('tk-change', { detail: false }));
    expect(optionCheckboxes(panel).map(cb => cb.value)).toEqual([false, false]);
    expect(selectAll.indeterminate).toBe(false);

    instance.handleSearchButtonClick('status');
    await page.waitForChanges();
    expect(instance.filters).toEqual([]);
    expect(instance.renderData).toHaveLength(5);
  });

  it('updates and then removes an existing checkbox filter', async () => {
    const page = await createPage({ columns: columnsWith(), paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);

    let panel = await openFilterPanel(page, 'status');
    optionCheckboxes(panel)[0].value = true;
    instance.handleSearchButtonClick('status');
    await page.waitForChanges();
    expect(instance.renderData).toHaveLength(3);

    panel = await openFilterPanel(page, 'status');
    optionCheckboxes(panel)[1].value = true;
    instance.handleSearchButtonClick('status');
    await page.waitForChanges();
    expect(instance.filters).toEqual([{ field: 'status', value: ['active', 'passive'], type: 'checkbox' }]);
    expect(instance.renderData).toHaveLength(5);

    panel = await openFilterPanel(page, 'status');
    optionCheckboxes(panel).forEach(cb => (cb.value = false));
    instance.handleSearchButtonClick('status');
    await page.waitForChanges();
    expect(instance.filters).toEqual([]);
  });

  it('resets to the first page when a checkbox filter is applied from another page', async () => {
    const page = await createPage({ columns: columnsWith(), paginationMethod: 'client', rowsPerPage: 2 });
    const instance = getInstance(page);
    await page.root.setCurrentPage(2);
    await page.waitForChanges();

    const panel = await openFilterPanel(page, 'status');
    optionCheckboxes(panel)[0].value = true;
    instance.handleSearchButtonClick('status');
    await page.waitForChanges();

    expect(instance.currentPage).toBe(1);

    await emitPageChange(page, 1);
    expect(instance.renderData.map((row: any) => row.id)).toEqual([1, 3]);
  });

  it('ignores an apply without an open panel', async () => {
    const page = await createPage({ columns: columnsWith() });
    const instance = getInstance(page);
    const requestSpy = listen(page, 'tk-request');

    instance.handleSearchButtonClick('status');
    await page.waitForChanges();

    expect(instance.filters).toEqual([]);
    expect(requestSpy).not.toHaveBeenCalled();
  });
});

describe('tk-table radio filter branches', () => {
  const columnsWith = (filterElements?: ITableColumn['filterElements']): ITableColumn[] => [
    { field: 'name', header: 'Name' },
    {
      field: 'status',
      header: 'Status',
      searchable: true,
      filterType: 'radio',
      filterOptions: [{ value: 'active' }, { value: 'passive', label: 'Passive' }],
      filterElements,
    },
  ];
  const radios = (panel: HTMLElement) => Array.from(panel.querySelectorAll('.tk-table-filter-radio-item tk-radio')) as any[];

  it('uses the default search placeholder and labels options by value', async () => {
    const page = await createPage({ columns: columnsWith({ optionsSearchInput: {} }) });

    const panel = await openFilterPanel(page, 'status');
    expect((panel.querySelector('tk-input') as any).placeholder).toBe('Search');
    expect(radios(panel).map(radio => radio.label)).toEqual(['active', 'Passive']);
    expect(radios(panel).map(radio => radio.name)).toEqual(['radio-filter-status', 'radio-filter-status']);
  });

  it('renders no search input when the column does not ask for one', async () => {
    const page = await createPage({ columns: columnsWith() });

    const panel = await openFilterPanel(page, 'status');
    expect(panel.querySelector('tk-input')).toBeNull();
  });

  it('updates an existing radio filter and resets the page', async () => {
    const page = await createPage({ columns: columnsWith(), paginationMethod: 'client', rowsPerPage: 2 });
    const instance = getInstance(page);

    let panel = await openFilterPanel(page, 'status');
    radios(panel)[0].checked = true;
    instance.handleSearchButtonClick('status');
    await page.waitForChanges();
    expect(instance.filters).toEqual([{ field: 'status', value: 'active', type: 'radio' }]);

    await page.root.setCurrentPage(2);
    await page.waitForChanges();
    panel = await openFilterPanel(page, 'status');
    expect(radios(panel)[0].checked).toBe(true);
    radios(panel)[0].checked = false;
    radios(panel)[1].checked = true;
    instance.handleSearchButtonClick('status');
    await page.waitForChanges();

    expect(instance.filters).toEqual([{ field: 'status', value: 'passive', type: 'radio' }]);
    expect(instance.currentPage).toBe(1);

    await emitPageChange(page, 1);
    expect(instance.renderData.map((row: any) => row.id)).toEqual([2, 4]);
  });

  it('leaves the filters untouched when nothing is checked and ignores an apply without a panel', async () => {
    const page = await createPage({ columns: columnsWith(), paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);

    await openFilterPanel(page, 'status');
    instance.handleSearchButtonClick('status');
    await page.waitForChanges();
    expect(instance.filters).toEqual([]);
    expect(document.body.querySelector('.tk-table-filter-panel')).toBeNull();

    instance.handleSearchButtonClick('status');
    expect(instance.filters).toEqual([]);
  });
});

describe('tk-table datepicker filter branches', () => {
  const dateColumns = (filterElements?: ITableColumn['filterElements']): ITableColumn[] => [
    { field: 'name', header: 'Name' },
    { field: 'date', header: 'Date', searchable: true, filterType: 'datepicker', filterElements },
  ];
  // The default date filter in helpers.ts needs the format from the column configuration.
  const withFormat = () => dateColumns({ optionsSearchDatepicker: { dateFormat: 'yyyy-MM-dd' } });
  const dateData = () => [
    { id: 1, name: 'Alice', date: '2024-05-10' },
    { id: 2, name: 'Bob', date: '2024-05-12' },
    { id: 3, name: 'Carol', date: '2024-05-15' },
  ];

  it('uses the default datepicker props when the column has no configuration', async () => {
    const page = await createPage({ columns: dateColumns(), data: dateData(), dataTestid: 'tbl' });

    const panel = await openFilterPanel(page, 'date');
    const datepicker = panel.querySelector('tk-datepicker') as any;
    expect(datepicker.label).toBe('Select a date');
    expect(datepicker.placeholder).toBe('Choose a date');
    expect(datepicker.mode).toBe('single');
    expect(datepicker.dateFormat).toBe('yyyy-MM-dd');
    expect(datepicker.locale).toBe('en');
    expect(datepicker.value).toBeNull();
    expect(datepicker.dataTestid).toBe('tbl-filter-datepicker-date');
    expect(panel.querySelector('.tk-table-filter-datepicker-container').getAttribute('data-testid')).toBe('tbl-filter-datepicker-container-date');
  });

  it('updates an existing date filter and resets the page', async () => {
    const page = await createPage({ columns: withFormat(), data: dateData(), paginationMethod: 'client', rowsPerPage: 1 });
    const instance = getInstance(page);

    let panel = await openFilterPanel(page, 'date');
    (panel.querySelector('tk-datepicker') as any).value = '2024-05-12';
    instance.handleSearchButtonClick('date');
    await page.waitForChanges();
    expect(instance.filters).toEqual([{ field: 'date', value: '2024-05-12', type: 'datepicker' }]);

    await page.root.setFilters([]);
    await page.root.runFilters();
    await page.root.setCurrentPage(2);
    await page.waitForChanges();
    await page.root.setFilters([{ field: 'date', value: '2024-05-12', type: 'datepicker' }]);

    panel = await openFilterPanel(page, 'date');
    expect((panel.querySelector('tk-datepicker') as any).value).toBe('2024-05-12');
    (panel.querySelector('tk-datepicker') as any).value = '2024-05-15';
    instance.handleSearchButtonClick('date');
    await page.waitForChanges();

    expect(instance.filters).toEqual([{ field: 'date', value: '2024-05-15', type: 'datepicker' }]);
    expect(instance.currentPage).toBe(1);

    await emitPageChange(page, 1);
    expect(instance.renderData.map((row: any) => row.name)).toEqual(['Carol']);
  });

  it('keeps the filters untouched when applied without a panel or without a date', async () => {
    const page = await createPage({ columns: withFormat(), data: dateData(), paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);
    const requestSpy = listen(page, 'tk-request');

    instance.handleSearchButtonClick('date');
    expect(instance.filters).toEqual([]);

    await openFilterPanel(page, 'date');
    instance.handleSearchButtonClick('date');
    await page.waitForChanges();

    expect(instance.filters).toEqual([]);
    // the date apply always reloads the rows, even when nothing changed
    expect(requestSpy).toHaveBeenCalledTimes(2);
    expect(instance.renderData).toHaveLength(3);
    expect(document.body.querySelector('.tk-table-filter-panel')).toBeNull();
  });
});

describe('tk-table treeview filter branches', () => {
  const treeColumns = (filterElements?: ITableColumn['filterElements']): ITableColumn[] => [
    { field: 'name', header: 'Name' },
    {
      field: 'status',
      header: 'Status',
      searchable: true,
      filterType: 'treeview',
      filterOptions: [
        {
          key: 'all',
          label: 'All',
          children: [
            { key: 'active', label: 'Active' },
            { key: 'passive', label: 'Passive' },
          ],
        },
      ] as any,
      filterElements,
    },
  ];

  it('uses the default treeview settings when the column has no configuration', async () => {
    const page = await createPage({ columns: treeColumns(), dataTestid: 'tbl' });

    const panel = await openFilterPanel(page, 'status');
    const treeview = panel.querySelector('tk-tree-view') as any;
    expect(treeview.selectable).toBe(true);
    expect(treeview.size).toBe('small');
    expect(treeview.showPointer).toBe(false);
    expect(treeview.selectionStrategy).toBe('leaf');
    expect(treeview.containerStyle).toEqual({ width: '100%' });
    expect(treeview.expandAll).toBe(true);
    expect(treeview.value).toEqual([]);
    expect(treeview.getAttribute('data-testid')).toBe('tbl-filter-treeview-status');
    expect(panel.querySelector('tk-input')).toBeNull();
  });

  it('honours explicit treeview options without a search input', async () => {
    const page = await createPage({
      columns: treeColumns({
        treeViewOptions: { size: 'large', showPointer: true, selectionStrategy: 'all', containerStyle: { width: '50%' }, expandAll: false },
        optionsSearchInput: { show: false },
      }),
    });

    const treeview = (await openFilterPanel(page, 'status')).querySelector('tk-tree-view') as any;
    expect(treeview.size).toBe('large');
    expect(treeview.showPointer).toBe(true);
    expect(treeview.selectionStrategy).toBe('all');
    expect(treeview.containerStyle).toEqual({ width: '50%' });
    expect(treeview.expandAll).toBe(false);
  });

  it('updates an existing treeview filter and resets the page', async () => {
    const page = await createPage({ columns: treeColumns(), paginationMethod: 'client', rowsPerPage: 2 });
    const instance = getInstance(page);

    let panel = await openFilterPanel(page, 'status');
    (panel.querySelector('tk-tree-view') as any).value = ['active'];
    instance.handleSearchButtonClick('status');
    await page.waitForChanges();
    expect(instance.filters).toEqual([{ field: 'status', value: ['active'], type: 'treeview' }]);
    expect(page.root.totalItems).toBe(3);

    await page.root.setCurrentPage(2);
    await page.waitForChanges();
    panel = await openFilterPanel(page, 'status');
    expect((panel.querySelector('tk-tree-view') as any).value).toEqual(['active']);
    (panel.querySelector('tk-tree-view') as any).value = ['passive'];
    instance.handleSearchButtonClick('status');
    await page.waitForChanges();

    expect(instance.filters).toEqual([{ field: 'status', value: ['passive'], type: 'treeview' }]);
    expect(instance.currentPage).toBe(1);

    await emitPageChange(page, 1);
    expect(instance.renderData.map((row: any) => row.id)).toEqual([2, 4]);
  });

  it('does nothing for an apply without a panel or without a selection and filter', async () => {
    const page = await createPage({ columns: treeColumns(), paginationMethod: 'client', rowsPerPage: 10 });
    const instance = getInstance(page);
    const requestSpy = listen(page, 'tk-request');

    instance.handleSearchButtonClick('status');
    expect(instance.filters).toEqual([]);

    await openFilterPanel(page, 'status');
    instance.handleSearchButtonClick('status');
    await page.waitForChanges();

    expect(instance.filters).toEqual([]);
    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(document.body.querySelector('.tk-table-filter-panel')).toBeNull();
  });
});
