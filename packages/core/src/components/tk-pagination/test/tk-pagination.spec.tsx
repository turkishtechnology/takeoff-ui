import { newSpecPage } from '@stencil/core/testing';
import { TkPagination } from '../tk-pagination';

describe('tk-pagination', () => {
  // Basic Rendering
  describe('basic rendering', () => {
    it('renders with default props', async () => {
      const page = await newSpecPage({
        components: [TkPagination],
        html: `<tk-pagination></tk-pagination>`,
      });

      expect(page.root).toBeTruthy();
    });
    it('renders when rounded', async () => {
      const page = await newSpecPage({
        components: [TkPagination],
        html: `<tk-pagination rounded></tk-pagination>`,
      });

      await page.waitForChanges();

      const pagination = page.root.querySelector('.tk-pagination');

      expect(pagination.classList.contains('tk-pagination-rounded')).toBeTruthy();
    });
  });

  // State
  describe('state handling', () => {
    it('handles types correctly', async () => {
      const types = ['outlined', 'text', 'grouped'];
      for (const type of types) {
        const page = await newSpecPage({
          components: [TkPagination],
          html: `<tk-pagination type='${type}'></tk-pagination>`,
        });

        const pagination = page.root.querySelector('.tk-pagination');

        expect(pagination.classList.contains(`tk-pagination-${type}`)).toBeTruthy();
      }
    });
    it('handles modes correctly', async () => {
      const modes = ['compact', 'compact-expanded'];
      for (const mode of modes) {
        const page = await newSpecPage({
          components: [TkPagination],
          html: `<tk-pagination mode='${mode}'></tk-pagination>`,
        });

        const pagination = page.root.querySelector('.tk-pagination');

        expect(pagination.classList.contains(`tk-pagination-${mode}`)).toBeTruthy();
      }
    });
    it('handles internal value changes', async () => {
      const page = await newSpecPage({
        components: [TkPagination],
        html: `<tk-pagination total-items="50" rows-per-page="10" current-page="3"</tk-pagination>`,
      });

      await page.waitForChanges();

      const tagLabel = page.root.querySelector('.tk-pagination-tag-label');

      expect(tagLabel.textContent).toBe('page: 3 of 5');
    });
    it('handles rowsPerPage  changes', async () => {
      const page = await newSpecPage({
        components: [TkPagination],
        html: `<tk-pagination total-items="50" rows-per-page="20"</tk-pagination>`,
      });

      await page.waitForChanges();

      page.rootInstance.rowsPerPage = 10;

      await page.waitForChanges();

      const tagLabel = page.root.querySelector('.tk-pagination-tag-label');

      expect(tagLabel.textContent).toBe('page: 1 of 5');
    });
    it('handles currentPage value changes', async () => {
      const page = await newSpecPage({
        components: [TkPagination],
        html: `<tk-pagination total-items="50" current-page="3"</tk-pagination>`,
      });

      await page.waitForChanges();

      page.rootInstance.currentPage = 2;

      await page.waitForChanges();

      const tagLabel = page.root.querySelector('.tk-pagination-tag-label');

      expect(tagLabel.textContent).toBe('page: 2 of 5');
    });
    it('handles page numbers for mediumRange when currentPage is in the beginning', async () => {
      const page = await newSpecPage({
        components: [TkPagination],
        html: `<tk-pagination total-items="70" current-page="1"</tk-pagination>`,
      });

      await page.waitForChanges();

      const span = page.root.querySelector('.tk-pagination-page-label');

      expect(span.textContent).toBeTruthy();
    });
    it('handles page numbers for mediumRange when currentPage is in the last', async () => {
      const page = await newSpecPage({
        components: [TkPagination],
        html: `<tk-pagination total-items="70" current-page="6"</tk-pagination>`,
      });

      await page.waitForChanges();

      const span = page.root.querySelector('.tk-pagination-page-label');

      expect(span.textContent).toBeTruthy();
    });
    it('handles page numbers for mediumRange when currentPage is in the middle', async () => {
      const page = await newSpecPage({
        components: [TkPagination],
        html: `<tk-pagination total-items="70" current-page="4"</tk-pagination>`,
      });

      await page.waitForChanges();

      const span = page.root.querySelector('.tk-pagination-page-label');

      expect(span.textContent).toBeTruthy();
    });
    it('handles page numbers for largeRange when currentPage is in the beginning', async () => {
      const page = await newSpecPage({
        components: [TkPagination],
        html: `<tk-pagination total-items="100" current-page="1"</tk-pagination>`,
      });

      await page.waitForChanges();

      const span = page.root.querySelector('.tk-pagination-page-label');

      expect(span.textContent).toBeTruthy();
    });
    it('handles page numbers for largeRange when currentPage is in the last', async () => {
      const page = await newSpecPage({
        components: [TkPagination],
        html: `<tk-pagination total-items="100" current-page="9"</tk-pagination>`,
      });

      await page.waitForChanges();

      const span = page.root.querySelector('.tk-pagination-page-label');

      expect(span.textContent).toBeTruthy();
    });
    it('handles page numbers for largeRange when currentPage is in the middle', async () => {
      const page = await newSpecPage({
        components: [TkPagination],
        html: `<tk-pagination total-items="100" current-page="5"</tk-pagination>`,
      });

      await page.waitForChanges();

      const span = page.root.querySelector('.tk-pagination-page-label');

      expect(span.textContent).toBeTruthy();
    });
  });

  //Event
  describe('event handling', () => {
    it('handles first button action', async () => {
      const page = await newSpecPage({
        components: [TkPagination],
        html: `<tk-pagination total-items="50" current-page="3"></tk-pagination>`,
      });

      await page.waitForChanges();

      const button = page.root.querySelector('.tk-pagination-first') as HTMLButtonElement;

      button.click();

      await page.waitForChanges();

      const tagLabel = page.root.querySelector('.tk-pagination-tag-label');

      expect(tagLabel.textContent).toBe('page: 1 of 5');
    });
    it('handles last button action', async () => {
      const page = await newSpecPage({
        components: [TkPagination],
        html: `<tk-pagination total-items="50" current-page="3"></tk-pagination>`,
      });

      await page.waitForChanges();

      const button = page.root.querySelector('.tk-pagination-last') as HTMLButtonElement;

      button.click();

      await page.waitForChanges();

      const tagLabel = page.root.querySelector('.tk-pagination-tag-label');

      expect(tagLabel.textContent).toBe('page: 5 of 5');
    });
    it('emits tk-prev event correctly', async () => {
      const page = await newSpecPage({
        components: [TkPagination],
        html: `<tk-pagination total-items="30" current-page="3"></tk-pagination>`,
      });

      await page.waitForChanges();
      const prevSpy = jest.fn();
      const button = page.root.querySelector('.tk-pagination-prev') as HTMLButtonElement;

      page.root.addEventListener('tk-prev-page', prevSpy);
      button.click();
      await page.waitForChanges();

      expect(page.rootInstance.currentPage).toBe(2);
      expect(prevSpy).toHaveBeenCalled();
    });
    it('emits tk-next event correctly', async () => {
      const page = await newSpecPage({
        components: [TkPagination],
        html: `<tk-pagination total-items="30" current-page="2"></tk-pagination>`,
      });

      await page.waitForChanges();
      const nextSpy = jest.fn();
      const button = page.root.querySelector('.tk-pagination-next') as HTMLButtonElement;

      page.root.addEventListener('tk-next-page', nextSpy);
      button.click();
      await page.waitForChanges();

      expect(page.rootInstance.currentPage).toBe(3);
      expect(nextSpy).toHaveBeenCalled();
    });
  });
});
