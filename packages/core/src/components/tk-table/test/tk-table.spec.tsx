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
jest.mock('../../global/sass/fonts/Geologica/Geologica-Regular', () => ({}), { virtual: true });
jest.mock('../../global/sass/fonts/Geologica/Geologica-Bold', () => ({}), { virtual: true });
jest.mock('../../../global/sass/fonts/Geologica/Geologica-Regular', () => ({}), { virtual: true });
jest.mock('../../../global/sass/fonts/Geologica/Geologica-Bold', () => ({}), { virtual: true });

import { TkTable } from '../tk-table';

type TkTableTestInstance = {
  internalRowsPerPage: number;
};

describe('tk-table', () => {
  it('updates internal rows per page when the prop changes', () => {
    const instance = new TkTable();

    instance.rowsPerPageChanged(10, 6);

    expect((instance as unknown as TkTableTestInstance).internalRowsPerPage).toBe(10);
  });
});
