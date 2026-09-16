import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { TkPagination } from '../tk-pagination';

describe('tk-pagination', () => {
  it('renders rounded and mode classes', async () => {
    const page = await newSpecPage({
      components: [TkPagination],
      html: `<tk-pagination rounded mode='compact'></tk-pagination>`,
    });

    const pagination = page.root.querySelector('.tk-pagination');

    expect(pagination.classList.contains('tk-pagination-rounded')).toBe(true);
    expect(pagination.classList.contains('tk-pagination-compact')).toBe(true);
  });

  it('updates page labels when rows per page changes', async () => {
    const page = await newSpecPage({
      components: [TkPagination],
      html: `<tk-pagination total-items="50" rows-per-page="20"></tk-pagination>`,
    });

    page.rootInstance.rowsPerPage = 10;
    await page.waitForChanges();

    expect(page.root.querySelector('.tk-pagination-tag-label').textContent).toBe('page: 1 of 5');
  });

  it('handles first and last button actions', async () => {
    const page = await newSpecPage({
      components: [TkPagination],
      html: `<tk-pagination total-items="50" current-page="3"></tk-pagination>`,
    });

    (page.root.querySelector('.tk-pagination-first') as HTMLButtonElement).click();
    await page.waitForChanges();
    expect(page.root.querySelector('.tk-pagination-tag-label').textContent).toBe('page: 1 of 5');

    (page.root.querySelector('.tk-pagination-last') as HTMLButtonElement).click();
    await page.waitForChanges();
    expect(page.root.querySelector('.tk-pagination-tag-label').textContent).toBe('page: 5 of 5');
  });

  it('emits previous and next page events', async () => {
    const prevPage = await newSpecPage({
      components: [TkPagination],
      html: `<tk-pagination total-items="30" current-page="3"></tk-pagination>`,
    });

    const prevSpy = jest.fn();
    prevPage.root.addEventListener('tk-prev-page', prevSpy);
    (prevPage.root.querySelector('.tk-pagination-prev') as HTMLButtonElement).click();
    await prevPage.waitForChanges();

    expect(prevPage.rootInstance.currentPage).toBe(2);
    expect(prevSpy).toHaveBeenCalled();

    const nextPage = await newSpecPage({
      components: [TkPagination],
      html: `<tk-pagination total-items="30" current-page="2"></tk-pagination>`,
    });

    const nextSpy = jest.fn();
    nextPage.root.addEventListener('tk-next-page', nextSpy);
    (nextPage.root.querySelector('.tk-pagination-next') as HTMLButtonElement).click();
    await nextPage.waitForChanges();

    expect(nextPage.rootInstance.currentPage).toBe(3);
    expect(nextSpy).toHaveBeenCalled();
  });
  it('applies the typed page on blur by default', async () => {
    const page = await newSpecPage({
      components: [TkPagination],
      html: `<tk-pagination total-items="50"></tk-pagination>`,
    });

    const input = page.root.querySelector('tk-input');
    input.dispatchEvent(new CustomEvent('tk-change', { detail: '4' }));
    await page.waitForChanges();
    input.dispatchEvent(new CustomEvent('tk-blur'));
    await page.waitForChanges();

    expect(page.rootInstance.currentPage).toBe(4);
  });

  it('keeps the page on blur when applyPageOnBlur is false', async () => {
    const page = await newSpecPage({
      components: [TkPagination],
      html: `<tk-pagination total-items="50" apply-page-on-blur="false"></tk-pagination>`,
    });

    const input = page.root.querySelector('tk-input');
    input.dispatchEvent(new CustomEvent('tk-change', { detail: '4' }));
    await page.waitForChanges();
    input.dispatchEvent(new CustomEvent('tk-blur'));
    await page.waitForChanges();

    expect(page.rootInstance.currentPage).toBe(1);
    expect(page.rootInstance.inputValue).toBe('1');
  });

  it('applies the typed page on Enter', async () => {
    const page = await newSpecPage({
      components: [TkPagination],
      html: `<tk-pagination total-items="50" apply-page-on-blur="false"></tk-pagination>`,
    });

    const input = page.root.querySelector('tk-input');
    input.dispatchEvent(new CustomEvent('tk-change', { detail: '4' }));
    await page.waitForChanges();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await page.waitForChanges();

    expect(page.rootInstance.currentPage).toBe(4);
  });
});

type PaginationInstance = { inputValue: string; internalCurrentPage: number };
type PageChangeDetail = { page: number; totalPages: number; startItem: number; endItem: number };

const createPagination = async (attrs = ''): Promise<SpecPage> =>
  newSpecPage({
    components: [TkPagination],
    html: `<tk-pagination ${attrs}></tk-pagination>`,
  });

const instanceOf = (page: SpecPage) => page.rootInstance as PaginationInstance;
const query = <T extends Element = HTMLElement>(page: SpecPage, selector: string) => page.root.querySelector(selector) as T | null;
const queryAll = (page: SpecPage, selector: string) => Array.from(page.root.querySelectorAll(selector)) as HTMLElement[];
const renderedPageCells = (page: SpecPage) =>
  queryAll(page, '.tk-pagination-page, .tk-pagination-ellipsis').map(cell => (cell.classList.contains('tk-pagination-ellipsis') ? '...' : Number(cell.textContent)));
const activePage = (page: SpecPage) => Number(query(page, '.tk-pagination-page-active')?.textContent);
const tagLabels = (page: SpecPage) => queryAll(page, '.tk-pagination-tag-label').map(label => label.textContent);
const pageInput = (page: SpecPage) => query<HTMLTkInputElement>(page, '.tk-pagination-end tk-input');
const isDisabled = (page: SpecPage, selector: string) => query<HTMLButtonElement>(page, selector).hasAttribute('disabled');

const clickPage = async (page: SpecPage, pageNumber: number) => {
  queryAll(page, '.tk-pagination-page')
    .find(cell => Number(cell.textContent) === pageNumber)
    .click();
  await page.waitForChanges();
};

const clickControl = async (page: SpecPage, selector: string) => {
  query<HTMLButtonElement>(page, selector).click();
  await page.waitForChanges();
};

const typeIntoInput = async (page: SpecPage, input: HTMLElement, value: string) => {
  input.dispatchEvent(new CustomEvent('tk-change', { detail: value }));
  await page.waitForChanges();
};

const listen = <T,>(page: SpecPage, eventName: string) => {
  const spy = jest.fn();
  page.root.addEventListener(eventName, spy);
  return {
    details: () => spy.mock.calls.map(call => (call[0] as CustomEvent<T>).detail),
    calls: () => spy.mock.calls.length,
  };
};

describe('tk-pagination page range', () => {
  it('renders every page without ellipsis when there are five pages or fewer', async () => {
    const page = await createPagination('total-items="50"');

    expect(renderedPageCells(page)).toEqual([1, 2, 3, 4, 5]);
    expect(activePage(page)).toBe(1);
  });

  it('collapses the tail of a medium range while near the start', async () => {
    const page = await createPagination('total-items="70" current-page="2"');

    expect(renderedPageCells(page)).toEqual([1, 2, 3, 4, 5, '...', 7]);
  });

  it('collapses the head of a medium range while near the end', async () => {
    const page = await createPagination('total-items="70" current-page="6"');

    expect(renderedPageCells(page)).toEqual([1, '...', 3, 4, 5, 6, 7]);
  });

  it('surrounds the current page with one sibling in the middle of a medium range', async () => {
    const page = await createPagination('total-items="70" current-page="4"');

    expect(renderedPageCells(page)).toEqual([1, '...', 3, 4, 5, '...', 7]);
  });

  it('collapses the tail of a large range while near the start', async () => {
    const page = await createPagination('total-items="200" current-page="4"');

    expect(renderedPageCells(page)).toEqual([1, 2, 3, 4, 5, '...', 20]);
  });

  it('collapses the head of a large range while near the end', async () => {
    const page = await createPagination('total-items="200" current-page="17"');

    expect(renderedPageCells(page)).toEqual([1, '...', 16, 17, 18, 19, 20]);
  });

  it('surrounds the current page with two siblings in the middle of a large range', async () => {
    const page = await createPagination('total-items="200" current-page="10"');

    expect(renderedPageCells(page)).toEqual([1, '...', 8, 9, 10, 11, 12, '...', 20]);
  });

  it('re-centers the range when a page is clicked', async () => {
    const page = await createPagination('total-items="200"');

    await clickPage(page, 5);

    expect(activePage(page)).toBe(5);
    expect(renderedPageCells(page)).toEqual([1, '...', 3, 4, 5, 6, 7, '...', 20]);
  });

  it('renders no page cells when there are no items', async () => {
    const page = await createPagination('total-items="0"');

    expect(renderedPageCells(page)).toEqual([]);
    expect(query(page, '.tk-pagination-tag').textContent).toBe('');
  });

  it('renders a single page that is both first and last', async () => {
    const page = await createPagination('total-items="7"');

    expect(renderedPageCells(page)).toEqual([1]);
    expect(isDisabled(page, '.tk-pagination-first')).toBe(true);
    expect(isDisabled(page, '.tk-pagination-prev')).toBe(true);
    expect(isDisabled(page, '.tk-pagination-next')).toBe(true);
    expect(isDisabled(page, '.tk-pagination-last')).toBe(true);
  });
});

describe('tk-pagination navigation buttons', () => {
  it('disables the first and previous buttons on the first page only', async () => {
    const page = await createPagination('total-items="50"');

    expect(isDisabled(page, '.tk-pagination-first')).toBe(true);
    expect(isDisabled(page, '.tk-pagination-prev')).toBe(true);
    expect(isDisabled(page, '.tk-pagination-next')).toBe(false);
    expect(isDisabled(page, '.tk-pagination-last')).toBe(false);

    await clickControl(page, '.tk-pagination-next');

    expect(isDisabled(page, '.tk-pagination-first')).toBe(false);
    expect(isDisabled(page, '.tk-pagination-prev')).toBe(false);
  });

  it('disables the next and last buttons on the last page', async () => {
    const page = await createPagination('total-items="50" current-page="5"');

    expect(isDisabled(page, '.tk-pagination-next')).toBe(true);
    expect(isDisabled(page, '.tk-pagination-last')).toBe(true);
  });

  it('does not move before the first page', async () => {
    const page = await createPagination('total-items="50"');
    const prev = listen(page, 'tk-prev-page');
    const change = listen(page, 'tk-page-change');

    await clickControl(page, '.tk-pagination-prev');

    expect(activePage(page)).toBe(1);
    expect(prev.calls()).toBe(0);
    expect(change.calls()).toBe(0);
  });

  it('does not move past the last page', async () => {
    const page = await createPagination('total-items="50" current-page="5"');
    const next = listen(page, 'tk-next-page');

    await clickControl(page, '.tk-pagination-next');

    expect(activePage(page)).toBe(5);
    expect(next.calls()).toBe(0);
  });

  it('emits tk-page-change with the item range of the new page', async () => {
    const page = await createPagination('total-items="45"');
    const change = listen<PageChangeDetail>(page, 'tk-page-change');

    await clickControl(page, '.tk-pagination-last');

    expect(change.details()).toEqual([{ page: 5, totalPages: 5, startItem: 41, endItem: 45 }]);
    expect(tagLabels(page)).toEqual(['page: 5 of 5', 'item: 41-45 of 45']);
  });

  it('emits the previous and next events with the page that was reached', async () => {
    const page = await createPagination('total-items="50" current-page="3"');
    const next = listen<{ page: number }>(page, 'tk-next-page');
    const prev = listen<{ page: number }>(page, 'tk-prev-page');

    await clickControl(page, '.tk-pagination-next');
    await clickControl(page, '.tk-pagination-prev');

    expect(next.details()).toEqual([{ page: 4 }]);
    expect(prev.details()).toEqual([{ page: 3 }]);
  });

  it('does not emit when the active page is clicked again', async () => {
    const page = await createPagination('total-items="50" current-page="2"');
    const change = listen(page, 'tk-page-change');

    await clickPage(page, 2);

    expect(change.calls()).toBe(0);
  });

  it('follows currentPage prop changes and reports them', async () => {
    const page = await createPagination('total-items="50"');
    const change = listen<PageChangeDetail>(page, 'tk-page-change');

    page.root.currentPage = 4;
    await page.waitForChanges();

    expect(activePage(page)).toBe(4);
    expect(pageInput(page).getAttribute('value')).toBe('4');
    expect(change.details()).toEqual([{ page: 4, totalPages: 5, startItem: 31, endItem: 40 }]);
  });
});

describe('tk-pagination rows per page', () => {
  it('passes the options and current value to the select', async () => {
    const page = await createPagination('total-items="50" rows-per-page="20"');
    const select = query<HTMLTkSelectElement>(page, 'tk-select');

    expect(select.getAttribute('value')).toBe('20');
    expect(select.options).toEqual([5, 10, 20, 50]);
  });

  it('applies a new page size and emits tk-rows-per-page-change', async () => {
    const page = await createPagination('total-items="50"');
    const rows = listen<number>(page, 'tk-rows-per-page-change');

    query(page, 'tk-select').dispatchEvent(new CustomEvent('tk-change', { detail: 25 }));
    await page.waitForChanges();

    expect(page.root.rowsPerPage).toBe(25);
    expect(rows.details()).toEqual([25]);
    expect(renderedPageCells(page)).toEqual([1, 2]);
    expect(tagLabels(page)).toEqual(['page: 1 of 2', 'item: 1-25 of 50']);
  });

  it('ignores a select change to the page size already in use', async () => {
    const page = await createPagination('total-items="50"');
    const rows = listen(page, 'tk-rows-per-page-change');

    query(page, 'tk-select').dispatchEvent(new CustomEvent('tk-change', { detail: 10 }));
    await page.waitForChanges();

    expect(rows.calls()).toBe(0);
  });

  it('uses custom rows per page options', async () => {
    const page = await newSpecPage({
      components: [TkPagination],
      template: () => <tk-pagination totalItems={50} rowsPerPageOptions={[3, 6]} rowsPerPage={3}></tk-pagination>,
    });

    expect(query<HTMLTkSelectElement>(page, 'tk-select').options).toEqual([3, 6]);
    expect(tagLabels(page)).toEqual(['page: 1 of 17', 'item: 1-3 of 50']);
  });
});

describe('tk-pagination jump to page input', () => {
  it('bounds the input to the available pages and sizes it to the page digits', async () => {
    const page = await createPagination('total-items="200"');
    const input = pageInput(page);

    expect(input.getAttribute('min')).toBe('1');
    expect(input.getAttribute('max')).toBe('20');
    expect(input.getAttribute('value')).toBe('1');
    expect(input.style.getPropertyValue('--tk-pagination-digits')).toBe('2');
  });

  it('applies the typed page through the input icon', async () => {
    const page = await createPagination('total-items="50" apply-page-on-blur="false"');
    const input = pageInput(page);
    const change = listen<PageChangeDetail>(page, 'tk-page-change');

    await typeIntoInput(page, input, '3');
    (input.icon as { click: () => void }).click();
    await page.waitForChanges();

    expect(activePage(page)).toBe(3);
    expect(change.details()).toEqual([{ page: 3, totalPages: 5, startItem: 21, endItem: 30 }]);
  });

  it('strips non-digit characters from the typed value', async () => {
    const page = await createPagination('total-items="50"');
    const input = pageInput(page);

    await typeIntoInput(page, input, '4abc');

    expect(instanceOf(page).inputValue).toBe('4');
    expect(input.getAttribute('value')).toBe('4');
  });

  it('restores the current page when the typed value is not a number', async () => {
    const page = await createPagination('total-items="50" current-page="2"');
    const input = pageInput(page);
    const change = listen(page, 'tk-page-change');

    await typeIntoInput(page, input, 'abc');
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await page.waitForChanges();

    expect(activePage(page)).toBe(2);
    expect(input.getAttribute('value')).toBe('2');
    expect(change.calls()).toBe(0);
  });

  it('restores the current page when the typed value is out of range', async () => {
    const page = await createPagination('total-items="50" current-page="2"');
    const input = pageInput(page);

    await typeIntoInput(page, input, '99');
    input.dispatchEvent(new CustomEvent('tk-blur'));
    await page.waitForChanges();

    expect(activePage(page)).toBe(2);
    expect(input.getAttribute('value')).toBe('2');

    await typeIntoInput(page, input, '0');
    input.dispatchEvent(new CustomEvent('tk-blur'));
    await page.waitForChanges();

    expect(activePage(page)).toBe(2);
    expect(input.getAttribute('value')).toBe('2');
  });

  it('prevents the default of Enter but leaves other keys alone', async () => {
    const page = await createPagination('total-items="50"');
    const input = pageInput(page);

    const enter = new KeyboardEvent('keydown', { key: 'Enter', cancelable: true });
    input.dispatchEvent(enter);
    const digit = new KeyboardEvent('keydown', { key: '3', cancelable: true });
    input.dispatchEvent(digit);
    await page.waitForChanges();

    expect(enter.defaultPrevented).toBe(true);
    expect(digit.defaultPrevented).toBe(false);
    expect(activePage(page)).toBe(1);
  });

  it('keeps the input focused when its apply icon is pressed', async () => {
    const page = await createPagination('total-items="50"');
    const input = pageInput(page);
    const icon = page.doc.createElement('tk-icon');
    input.appendChild(icon);

    const onIcon = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
    icon.dispatchEvent(onIcon);
    const onField = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
    input.dispatchEvent(onField);

    expect(onIcon.defaultPrevented).toBe(true);
    expect(onField.defaultPrevented).toBe(false);
  });
});

describe('tk-pagination compact modes', () => {
  it('renders the compact mode with prev, page input, label and next only', async () => {
    const page = await createPagination('mode="compact" total-items="50" current-page="2"');
    const wrapper = query(page, '.tk-pagination');

    expect(wrapper.tagName).toBe('DIV');
    expect(query(page, '.tk-pagination-first')).toBeNull();
    expect(query(page, '.tk-pagination-last')).toBeNull();
    expect(query(page, '.tk-pagination-page')).toBeNull();
    expect(query(page, '.tk-pagination-tag')).toBeNull();
    expect(query(page, '.tk-pagination-current-label').textContent).toBe('page: 2 of 5');
    expect(query<HTMLTkInputElement>(page, '.tk-pagination .tk-pagination-page-input').getAttribute('value')).toBe('2');
  });

  it('navigates and applies typed pages in compact mode', async () => {
    const page = await createPagination('mode="compact" total-items="50"');
    const input = query<HTMLTkInputElement>(page, '.tk-pagination .tk-pagination-page-input');

    expect(isDisabled(page, '.tk-pagination-prev')).toBe(true);

    await clickControl(page, '.tk-pagination-next');
    expect(query(page, '.tk-pagination-current-label').textContent).toBe('page: 2 of 5');

    await typeIntoInput(page, input, '5');
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await page.waitForChanges();

    expect(query(page, '.tk-pagination-current-label').textContent).toBe('page: 5 of 5');
    expect(isDisabled(page, '.tk-pagination-next')).toBe(true);

    await typeIntoInput(page, input, '7');
    input.dispatchEvent(new CustomEvent('tk-blur'));
    await page.waitForChanges();

    expect(query(page, '.tk-pagination-current-label').textContent).toBe('page: 5 of 5');
    expect(input.getAttribute('value')).toBe('5');
  });

  it('renders only the items report in compact-expanded mode', async () => {
    const page = await createPagination('mode="compact-expanded" total-items="50" current-page="3"');

    expect(query(page, '.tk-pagination').tagName).toBe('DIV');
    expect(query(page, '.tk-pagination').classList.contains('tk-pagination-compact-expanded')).toBe(true);
    expect(tagLabels(page)).toEqual(['item: 21-30 of 50']);
    expect(renderedPageCells(page)).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('tk-pagination types and labels', () => {
  it('renders a nav element with the type class by default', async () => {
    const page = await createPagination('total-items="50"');

    expect(query(page, '.tk-pagination').tagName).toBe('NAV');
    expect(query(page, '.tk-pagination').classList.contains('tk-pagination-outlined')).toBe(true);
    expect(query(page, '.tk-pagination').classList.contains('tk-pagination-rounded')).toBe(false);
    expect(query(page, '.tk-pagination-divider')).toBeNull();
  });

  it('applies the text type class', async () => {
    const page = await createPagination('type="text" total-items="50"');

    expect(query(page, '.tk-pagination').classList.contains('tk-pagination-text')).toBe(true);
  });

  it('adds dividers between the grouped controls', async () => {
    const page = await createPagination('type="grouped" total-items="50"');

    expect(query(page, '.tk-pagination').classList.contains('tk-pagination-grouped')).toBe(true);
    expect(queryAll(page, '.tk-pagination-divider')).toHaveLength(2);
  });

  it('formats custom report templates', async () => {
    const page = await createPagination(
      `total-items="23" current-page="3" page-report-template="Page {currentPage}/{totalPages}" items-report-template="{startItem} to {endItem} of {totalItems} rows"`,
    );

    expect(tagLabels(page)).toEqual(['Page 3/3', '21 to 23 of 23 rows']);
  });

  it('leaves unknown template placeholders untouched', async () => {
    const page = await createPagination('total-items="50" page-report-template="{unknown} {currentPage}"');

    expect(tagLabels(page)[0]).toBe('{unknown} 1');
  });

  it('clamps the reported end item to the total on the last page', async () => {
    const page = await createPagination('total-items="42" current-page="5"');

    expect(tagLabels(page)).toEqual(['page: 5 of 5', 'item: 41-42 of 42']);
  });
});
