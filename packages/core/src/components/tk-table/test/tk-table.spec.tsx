jest.mock('lodash-es', () => ({
  isEqual: (left, right) => JSON.stringify(left) === JSON.stringify(right),
  some: (items: unknown[], predicate: (item: unknown) => boolean) => (items || []).some(predicate),
}));

jest.mock('jspdf', () => jest.fn());
jest.mock('jspdf-autotable', () => jest.fn());
jest.mock('exceljs', () => ({
  __esModule: true,
  default: { Workbook: jest.fn() },
}));
jest.mock('../../../global/sass/fonts/geologica/geologica-regular', () => ({}), { virtual: true });
jest.mock('../../../global/sass/fonts/geologica/geologica-bold', () => ({}), { virtual: true });
jest.mock('../../../global/sass/fonts/tk-font/tk-text-regular', () => ({}), { virtual: true });
jest.mock('../../../global/sass/fonts/tk-font/tk-text-bold', () => ({}), { virtual: true });

import { TkTable } from '../tk-table';
import { ITableColumn } from '../types';

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

    it('single-sort defaults to asc -> desc -> none when defaultSortOrder is not set', () => {
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

    it('single-sort cycles desc -> asc -> none when column opts into defaultSortOrder desc', () => {
      const instance = createInstance();
      const col: ITableColumn = { field: 'amount', header: 'Amount', sortable: true, defaultSortOrder: 'desc' };
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

    it('multi-sort pushes asc order on first click when defaultSortOrder is not set', () => {
      const instance = createInstance();
      instance.sorts = [];
      const col: ITableColumn = { field: 'name', header: 'Name', sortable: true };

      instance.handleMultiSort({ icon: 'swap_vert' }, col);

      expect(instance.sorts).toEqual([{ field: 'name', order: 'asc' }]);
    });

    it('multi-sort cycles desc -> asc -> removed when column opts into defaultSortOrder desc', () => {
      const instance = createInstance();
      const col: ITableColumn = { field: 'amount', header: 'Amount', sortable: true, defaultSortOrder: 'desc' };
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
