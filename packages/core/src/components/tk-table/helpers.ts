import { computePosition, flip, shift, offset, arrow } from '@floating-ui/dom';
import { ITableColumn, ITableFilter } from './interfaces';

export const createDropdown = (refSearchIcon: HTMLElement, refDropdown: HTMLElement, refSearchInput: HTMLTkInputElement) => {
  return new Promise(async resolve => {
    const refArrow: HTMLElement = refDropdown.querySelector('#arrow');
    const computeResult = await computePosition(refSearchIcon, refDropdown, {
      placement: 'bottom',
      middleware: [
        offset(8),
        flip(),
        shift(),
        arrow({
          element: refArrow,
        }),
      ],
    });

    Object.assign(refDropdown.style, {
      left: `${computeResult.x - 110}px`,
      top: `${computeResult.y}px`,
    });

    Object.assign(refArrow.style, {
      left: `${computeResult.x}px`,
      top: '-8px',
    });

    refDropdown.style.display = 'block';
    refSearchInput.setFocus();

    resolve(true);
  });
};

export const handleInputKeydown = (event: KeyboardEvent, el: HTMLTkTableElement) => {
  const activeElement = el.shadowRoot.activeElement.parentElement as HTMLElement;

  // Sadece tablo hücrelerinde işlem yapmak istiyoruz
  if (activeElement.tagName === 'TD') {
    const currentRow = activeElement.parentElement as HTMLTableRowElement;
    const rowIndex = Array.from(currentRow.parentElement.children).indexOf(currentRow);
    const cellIndex = Array.from(currentRow.children).indexOf(activeElement);

    if (event.key === 'ArrowDown') {
      // Bir sonraki satır var mı kontrol edin
      const nextRow = currentRow.parentElement.children[rowIndex + 1] as HTMLTableRowElement;
      if (nextRow) {
        const nextCell = nextRow.children[cellIndex] as HTMLElement;
        nextCell?.querySelector('input')?.focus();
      }
    } else if (event.key === 'ArrowUp') {
      // Bir önceki satır var mı kontrol edin
      const prevRow = currentRow.parentElement.children[rowIndex - 1] as HTMLTableRowElement;
      if (prevRow) {
        const prevCell = prevRow.children[cellIndex] as HTMLElement;
        prevCell?.querySelector('input')?.focus();
      }
    }
  }
};

export const filterAndSort = (data: any[], columns: ITableColumn[], filters: ITableFilter[], sortField: string, sortOrder: string) => {
  let sortAndFilterData;
  let _data = [...data];

  sortAndFilterData = _data.filter(row =>
    filters.every(filter => {
      const filterableColumn = columns.find(col => col.field == filter.field && col.searchable && typeof col.filter == 'function');
      const result = filterableColumn?.filter(filter.value, row);
      if (result == undefined) return true;
      else return result;
    }),
  );

  const col = columns.find(col => col.field == sortField && col.sortable && typeof col.sorter == 'function');

  if (sortField && col) {
    sortAndFilterData = sortAndFilterData.sort((a, b) => {
      const result = col?.sorter(a, b);
      if (sortOrder === 'asc') return result;
      if (sortOrder === 'desc') return -result;
      return 0;
    });
  }

  return sortAndFilterData;
};
