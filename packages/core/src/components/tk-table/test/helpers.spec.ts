import { calculateColumnStartWidth, calculateNewColumnWidth, handleInputKeydown, filterAndSort } from '../helpers';
import { ITableColumn, ITableFilter, ITableSort } from '../types';

describe('tk-table helpers', () => {
  describe('calculateColumnStartWidth', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('returns the parsed state width when a current state width is provided', () => {
      const th = { clientWidth: 300 } as HTMLTableCellElement;

      expect(calculateColumnStartWidth(th, '150px')).toBe(150);
    });

    it('uses the css width when clientWidth differs from it by more than 5px', () => {
      jest.spyOn(window, 'getComputedStyle').mockReturnValue({ width: '200px' } as CSSStyleDeclaration);
      const th = { clientWidth: 250 } as HTMLTableCellElement;

      expect(calculateColumnStartWidth(th)).toBe(200);
    });

    it('uses clientWidth when it is close to the css width', () => {
      jest.spyOn(window, 'getComputedStyle').mockReturnValue({ width: '200px' } as CSSStyleDeclaration);
      const th = { clientWidth: 202 } as HTMLTableCellElement;

      expect(calculateColumnStartWidth(th)).toBe(202);
    });
  });

  describe('calculateNewColumnWidth', () => {
    it('adds the mouse delta to the start width', () => {
      expect(calculateNewColumnWidth(100, 140, 200)).toBe(240);
    });

    it('shrinks the column when the mouse moves left', () => {
      expect(calculateNewColumnWidth(200, 150, 200)).toBe(150);
    });

    it('clamps to the default minimum width of 50', () => {
      expect(calculateNewColumnWidth(500, 100, 120)).toBe(50);
    });

    it('respects a custom minimum width', () => {
      expect(calculateNewColumnWidth(500, 100, 120, 90)).toBe(90);
    });
  });

  describe('handleInputKeydown', () => {
    const buildTable = () => {
      const tbody = document.createElement('tbody');
      const inputs: HTMLInputElement[][] = [];

      for (let rowIndex = 0; rowIndex < 2; rowIndex++) {
        const tr = document.createElement('tr');
        const rowInputs: HTMLInputElement[] = [];

        for (let cellIndex = 0; cellIndex < 2; cellIndex++) {
          const td = document.createElement('td');
          const input = document.createElement('input');
          input.focus = jest.fn();
          td.appendChild(input);
          tr.appendChild(td);
          rowInputs.push(input);
        }

        tbody.appendChild(tr);
        inputs.push(rowInputs);
      }

      return { tbody, inputs };
    };

    const buildEl = (activeElement: HTMLElement) => ({ shadowRoot: { activeElement } }) as unknown as HTMLTkTableElement;

    it('focuses the input on the same column of the next row on ArrowDown', () => {
      const { inputs } = buildTable();

      handleInputKeydown({ key: 'ArrowDown' } as KeyboardEvent, buildEl(inputs[0][1]));

      expect(inputs[1][1].focus).toHaveBeenCalled();
    });

    it('focuses the input on the same column of the previous row on ArrowUp', () => {
      const { inputs } = buildTable();

      handleInputKeydown({ key: 'ArrowUp' } as KeyboardEvent, buildEl(inputs[1][0]));

      expect(inputs[0][0].focus).toHaveBeenCalled();
    });

    it('does nothing on ArrowDown when there is no next row', () => {
      const { inputs } = buildTable();

      handleInputKeydown({ key: 'ArrowDown' } as KeyboardEvent, buildEl(inputs[1][0]));

      expect(inputs[0][0].focus).not.toHaveBeenCalled();
      expect(inputs[0][1].focus).not.toHaveBeenCalled();
    });

    it('does nothing on ArrowUp when there is no previous row', () => {
      const { inputs } = buildTable();

      handleInputKeydown({ key: 'ArrowUp' } as KeyboardEvent, buildEl(inputs[0][0]));

      expect(inputs[1][0].focus).not.toHaveBeenCalled();
      expect(inputs[1][1].focus).not.toHaveBeenCalled();
    });

    it('ignores keydown events outside of table cells', () => {
      const wrapper = document.createElement('div');
      const input = document.createElement('input');
      input.focus = jest.fn();
      wrapper.appendChild(input);

      expect(() => handleInputKeydown({ key: 'ArrowDown' } as KeyboardEvent, buildEl(input))).not.toThrow();
      expect(input.focus).not.toHaveBeenCalled();
    });
  });

  describe('filterAndSort', () => {
    const rows = () => [
      { id: 1, name: 'Alice', status: 'active', amount: 30, date: '2024-05-10', meta: { city: 'Ankara' } },
      { id: 2, name: 'Bob', status: 'passive', amount: 10, date: '2024-05-12', meta: { city: 'Izmir' } },
      { id: 3, name: 'Carol', status: 'active', amount: 20, date: '2024-05-15', meta: { city: 'Istanbul' } },
    ];

    const plainColumns = (): ITableColumn[] => [
      { field: 'name', header: 'Name' },
      { field: 'status', header: 'Status' },
      { field: 'amount', header: 'Amount' },
    ];

    it('returns a copy of the data when there are no filters or sorts', () => {
      const data = rows();

      const result = filterAndSort(data, plainColumns(), []);

      expect(result).toEqual(data);
      expect(result).not.toBe(data);
    });

    describe('checkbox filter', () => {
      it('keeps rows whose field value is in the selected values', () => {
        const filters: ITableFilter[] = [{ field: 'status', type: 'checkbox', value: ['active'] }];

        const result = filterAndSort(rows(), plainColumns(), filters);

        expect(result.map(row => row.id)).toEqual([1, 3]);
      });

      it('resolves nested fields with dot notation', () => {
        const filters: ITableFilter[] = [{ field: 'meta.city', type: 'checkbox', value: ['Ankara', 'Izmir'] }];

        const result = filterAndSort(rows(), plainColumns(), filters);

        expect(result.map(row => row.id)).toEqual([1, 2]);
      });

      it('uses the column custom filter function when defined', () => {
        const filter = jest.fn((value: string[], row: any) => value.includes(row.status) && row.amount > 15);
        const columns: ITableColumn[] = [{ field: 'status', header: 'Status', searchable: true, filter }];
        const filters: ITableFilter[] = [{ field: 'status', type: 'checkbox', value: ['active'] }];

        const result = filterAndSort(rows(), columns, filters);

        expect(result.map(row => row.id)).toEqual([1, 3]);
        expect(filter).toHaveBeenCalledWith(['active'], expect.objectContaining({ id: 1 }));
      });

      it('does not filter when the selected values array is empty', () => {
        const filters: ITableFilter[] = [{ field: 'status', type: 'checkbox', value: [] }];

        expect(filterAndSort(rows(), plainColumns(), filters)).toHaveLength(3);
      });

      // BUG: default checkbox filtering calls .toString() on the raw field value, so a row
      // that does not contain the filtered field throws instead of being filtered out.
      it('documents that default checkbox filtering throws when a row lacks the filtered field (bug)', () => {
        const data = [...rows(), { id: 4, name: 'Dave' }];
        const filters: ITableFilter[] = [{ field: 'status', type: 'checkbox', value: ['active'] }];

        expect(() => filterAndSort(data, plainColumns(), filters)).toThrow();
      });
    });

    describe('radio filter', () => {
      it('keeps only rows matching the selected value', () => {
        const filters: ITableFilter[] = [{ field: 'status', type: 'radio', value: 'passive' }];

        const result = filterAndSort(rows(), plainColumns(), filters);

        expect(result.map(row => row.id)).toEqual([2]);
      });

      it('uses the column custom filter function when defined', () => {
        const filter = jest.fn((value: string, row: any) => row.status !== value);
        const columns: ITableColumn[] = [{ field: 'status', header: 'Status', searchable: true, filter }];
        const filters: ITableFilter[] = [{ field: 'status', type: 'radio', value: 'active' }];

        const result = filterAndSort(rows(), columns, filters);

        expect(result.map(row => row.id)).toEqual([2]);
      });
    });

    describe('datepicker filter', () => {
      const dateColumns = (): ITableColumn[] => [
        {
          field: 'date',
          header: 'Date',
          filterElements: { optionsSearchDatepicker: { dateFormat: 'yyyy-MM-dd' } },
        },
      ];

      it('matches a single date value', () => {
        const filters: ITableFilter[] = [{ field: 'date', type: 'datepicker', value: '2024-05-12' }];

        const result = filterAndSort(rows(), dateColumns(), filters);

        expect(result.map(row => row.id)).toEqual([2]);
      });

      it('matches rows within a date range', () => {
        const filters: ITableFilter[] = [{ field: 'date', type: 'datepicker', value: { start: '2024-05-10', end: '2024-05-12' } }];

        const result = filterAndSort(rows(), dateColumns(), filters);

        expect(result.map(row => row.id)).toEqual([1, 2]);
      });

      it('filters out rows without a value in the date field', () => {
        const data = [...rows(), { id: 4, name: 'Dave' }];
        const filters: ITableFilter[] = [{ field: 'date', type: 'datepicker', value: '2024-05-12' }];

        const result = filterAndSort(data, dateColumns(), filters);

        expect(result.map(row => row.id)).toEqual([2]);
      });

      it('uses the column custom filter function when defined', () => {
        const filter = jest.fn((value: string, row: any) => row.date === value);
        const columns: ITableColumn[] = [{ field: 'date', header: 'Date', searchable: true, filter }];
        const filters: ITableFilter[] = [{ field: 'date', type: 'datepicker', value: '2024-05-15' }];

        const result = filterAndSort(rows(), columns, filters);

        expect(result.map(row => row.id)).toEqual([3]);
      });

      it('keeps all rows when the range filter value is incomplete', () => {
        const filters: ITableFilter[] = [{ field: 'date', type: 'datepicker', value: { start: '', end: '' } }];

        expect(filterAndSort(rows(), dateColumns(), filters)).toHaveLength(3);
      });
    });

    describe('text filter', () => {
      it('uses the column custom filter function when defined', () => {
        const columns: ITableColumn[] = [
          {
            field: 'name',
            header: 'Name',
            searchable: true,
            filter: (value: string, row: any) => row.name.toLowerCase().includes(value.toLowerCase()),
          },
        ];
        const filters: ITableFilter[] = [{ field: 'name', value: 'bo' }];

        const result = filterAndSort(rows(), columns, filters);

        expect(result.map(row => row.id)).toEqual([2]);
      });

      it('keeps all rows when the column has no custom filter function', () => {
        const filters: ITableFilter[] = [{ field: 'name', value: 'bo' }];

        expect(filterAndSort(rows(), plainColumns(), filters)).toHaveLength(3);
      });
    });

    describe('multi sort', () => {
      const amountSorter = (a: any, b: any) => a.amount - b.amount;
      const statusSorter = (a: any, b: any) => a.status.localeCompare(b.status);

      it('sorts ascending with the column sorter', () => {
        const columns: ITableColumn[] = [{ field: 'amount', header: 'Amount', sortable: true, sorter: amountSorter }];
        const sorts: ITableSort[] = [{ field: 'amount', order: 'asc' }];

        const result = filterAndSort(rows(), columns, [], undefined, undefined, sorts);

        expect(result.map(row => row.id)).toEqual([2, 3, 1]);
      });

      it('sorts descending with the column sorter', () => {
        const columns: ITableColumn[] = [{ field: 'amount', header: 'Amount', sortable: true, sorter: amountSorter }];
        const sorts: ITableSort[] = [{ field: 'amount', order: 'desc' }];

        const result = filterAndSort(rows(), columns, [], undefined, undefined, sorts);

        expect(result.map(row => row.id)).toEqual([1, 3, 2]);
      });

      it('breaks ties with the next sort in priority order', () => {
        const columns: ITableColumn[] = [
          { field: 'status', header: 'Status', sortable: true, sorter: statusSorter },
          { field: 'amount', header: 'Amount', sortable: true, sorter: amountSorter },
        ];
        const sorts: ITableSort[] = [
          { field: 'status', order: 'asc' },
          { field: 'amount', order: 'desc' },
        ];

        const result = filterAndSort(rows(), columns, [], undefined, undefined, sorts);

        // active rows first (sorted by amount desc), then the passive row
        expect(result.map(row => row.id)).toEqual([1, 3, 2]);
      });

      it('keeps the original order when the sorted column has no sorter', () => {
        const sorts: ITableSort[] = [{ field: 'amount', order: 'asc' }];

        const result = filterAndSort(rows(), plainColumns(), [], undefined, undefined, sorts);

        expect(result.map(row => row.id)).toEqual([1, 2, 3]);
      });
    });

    describe('single sort', () => {
      const amountSorter = (a: any, b: any) => a.amount - b.amount;

      it('sorts ascending with the column sorter', () => {
        const columns: ITableColumn[] = [{ field: 'amount', header: 'Amount', sortable: true, sorter: amountSorter }];

        const result = filterAndSort(rows(), columns, [], 'amount', 'asc');

        expect(result.map(row => row.id)).toEqual([2, 3, 1]);
      });

      it('sorts descending with the column sorter', () => {
        const columns: ITableColumn[] = [{ field: 'amount', header: 'Amount', sortable: true, sorter: amountSorter }];

        const result = filterAndSort(rows(), columns, [], 'amount', 'desc');

        expect(result.map(row => row.id)).toEqual([1, 3, 2]);
      });

      it('keeps the original order for an unknown sort order', () => {
        const columns: ITableColumn[] = [{ field: 'amount', header: 'Amount', sortable: true, sorter: amountSorter }];

        const result = filterAndSort(rows(), columns, [], 'amount', 'original');

        expect(result.map(row => row.id)).toEqual([1, 2, 3]);
      });

      it('keeps the original order when the column is not sortable or has no sorter', () => {
        const result = filterAndSort(rows(), plainColumns(), [], 'amount', 'asc');

        expect(result.map(row => row.id)).toEqual([1, 2, 3]);
      });
    });
  });
});
