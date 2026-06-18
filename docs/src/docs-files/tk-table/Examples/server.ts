import { data } from './data';

const fetchFromServer = async (page: number, rowsPerPage: number, filters: any[], sortField: string, sortOrder: string) => {
  return new Promise(resolve => {
    setTimeout(() => {
      let newPageData;
      let totalItem;
      newPageData = [...data].filter(row => filters.every(filter => row[filter.field].toString().toLowerCase().indexOf(filter.value.toLowerCase()) > -1));

      if (sortField?.length > 0) {
        newPageData = newPageData.sort((a, b) => {
          const result = a[sortField] > b[sortField] ? 1 : -1;
          if (sortOrder === 'asc') return result;
          if (sortOrder === 'desc') return -result;
          return 0;
        });
      }
      totalItem = newPageData.length;

      const startIndex = (page - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      newPageData = newPageData.slice(startIndex, endIndex);

      resolve({ data: newPageData, totalItem: totalItem });
    }, 1500);
  });
};

// Multi-sort aware variant. The table emits a `sorts` array (in priority order)
// on the tk-request event; here we replicate what a backend would do with an
// `ORDER BY col1 dir1, col2 dir2, ...` clause.
export const fetchFromServerMultiSort = async (page: number, rowsPerPage: number, filters: any[], sorts: { field: string; order: string }[]) => {
  return new Promise(resolve => {
    setTimeout(() => {
      let newPageData;
      let totalItem;
      newPageData = [...data].filter(row => filters.every(filter => row[filter.field].toString().toLowerCase().indexOf(filter.value.toLowerCase()) > -1));

      if (sorts?.length > 0) {
        newPageData = newPageData.sort((a, b) => {
          for (const sort of sorts) {
            if (a[sort.field] === b[sort.field]) continue;
            const result = a[sort.field] > b[sort.field] ? 1 : -1;
            return sort.order === 'asc' ? result : -result;
          }
          return 0;
        });
      }
      totalItem = newPageData.length;

      const startIndex = (page - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      newPageData = newPageData.slice(startIndex, endIndex);

      resolve({ data: newPageData, totalItem: totalItem });
    }, 1500);
  });
};

export default fetchFromServer;
