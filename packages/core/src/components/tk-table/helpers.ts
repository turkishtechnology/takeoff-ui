import { ITableColumn, ITableFilter } from './interfaces';

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
      if (filter.type === 'checkbox' && Array.isArray(filter.value) && (filter.value as string[]).length > 0) {
        const fieldValue = row[filter.field]?.toString();
        return (filter.value as string[]).includes(fieldValue);
      }

      if (filter.type === 'radio' && filter.value) {
        const fieldValue = row[filter.field]?.toString();
        return fieldValue === filter.value;
      }

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
