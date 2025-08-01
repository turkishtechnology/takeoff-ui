import { ITableColumn, ITableFilter, ITableSortInfo } from './interfaces';

/**
 * Calculates the optimal starting width for column resizing
 * Handles the difference between CSS width, clientWidth, and offsetWidth
 * @param th - The table header element
 * @param currentStateWidth - Current width from component state
 * @returns The calculated starting width in pixels
 */
export const calculateColumnStartWidth = (th: HTMLTableCellElement, currentStateWidth?: string): number => {
  if (currentStateWidth) {
    return parseFloat(currentStateWidth);
  }

  const computedStyle = window.getComputedStyle(th);
  const cssWidthValue = parseFloat(computedStyle.width);
  const clientWidthValue = th.clientWidth;

  // If clientWidth is very different from cssWidth (more than 5px), use cssWidth
  // This handles padding/border inconsistencies across different columns
  if (Math.abs(clientWidthValue - cssWidthValue) > 5) {
    return cssWidthValue;
  }

  return clientWidthValue;
};

/**
 * Calculates the new column width during resize
 * @param startX - Initial mouse X position
 * @param currentX - Current mouse X position
 * @param startWidth - Initial column width
 * @param minWidth - Minimum allowed width (default: 50px)
 * @returns The new calculated width in pixels
 */
export const calculateNewColumnWidth = (startX: number, currentX: number, startWidth: number, minWidth: number = 50): number => {
  const diff = currentX - startX;
  return Math.max(minWidth, startWidth + diff);
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

export const filterAndSort = (data: any[], columns: ITableColumn[], filters: ITableFilter[], sortField?: string, sortOrder?: string, sortInfo?: ITableSortInfo[]) => {
  let sortAndFilterData;
  let _data = [...data];

  //#region filter
  sortAndFilterData = _data.filter(row =>
    filters.every(filter => {
      const filterableColumn = columns.find(col => col.field == filter.field && col.searchable && typeof col.filter == 'function');

      if (filter.type === 'checkbox' && Array.isArray(filter.value) && (filter.value as string[]).length > 0) {
        // If the column has a custom filter function, use it
        if (filterableColumn) {
          return filterableColumn.filter(filter.value, row);
        } else {
          // If the column doesn't have a custom filter function, use the default filter
          const fieldValue = getNestedValue(row, filter.field).toString();
          return (filter.value as string[]).includes(fieldValue);
        }
      }

      if (filter.type === 'radio' && filter.value) {
        // If the column has a custom filter function, use it
        if (filterableColumn) {
          return filterableColumn.filter(filter.value, row);
        } else {
          // If the column doesn't have a custom filter function, use the default filter
          const fieldValue = getNestedValue(row, filter.field).toString();
          return fieldValue === filter.value;
        }
      }

      const result = filterableColumn?.filter(filter.value, row);
      if (result == undefined) return true;
      else return result;
    }),
  );
  // #endregion

  //#region sort
  //Multi-Sort
  if (sortInfo && sortInfo.length > 0) {
    sortAndFilterData = sortAndFilterData.sort((a, b) => {
      for (const sort of sortInfo) {
        const col = columns.find(col => col.field === sort.field && col.sortable);
        let comparison = 0;

        if (col && typeof col.sorter === 'function') {
          // Custom sorter
          comparison = col.sorter(a, b);
        }

        if (comparison !== 0) {
          const result = sort.order === 'asc' ? comparison : -comparison;
          return result;
        }
      }
      return 0;
    });
    //Single-Sort
  } else if (sortField && sortOrder) {
    const col = columns.find(col => col.field == sortField && col.sortable && typeof col.sorter == 'function');

    if (sortField && col) {
      sortAndFilterData = sortAndFilterData.sort((a, b) => {
        const result = col?.sorter(a, b);
        if (sortOrder === 'asc') return result;
        if (sortOrder === 'desc') return -result;
        return 0;
      });
    }
  }
  // #endregion
  return sortAndFilterData;
};

export const getNestedValue = (row, path) => {
  return path.split('.').reduce((acc, key) => {
    return acc && acc[key] !== undefined ? acc[key] : undefined;
  }, row);
};
