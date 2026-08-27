import { newSpecPage } from '@stencil/core/testing';
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
