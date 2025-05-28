import { TkPagination } from '@takeoff-ui/react';

function Pagination() {
  return (
    <div>
      <TkPagination totalItems={50} rowsPerPage={10} mode="compact" />
    </div>
  );
}

export default Pagination;
