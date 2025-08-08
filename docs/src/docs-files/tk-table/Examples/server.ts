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

export default fetchFromServer;
