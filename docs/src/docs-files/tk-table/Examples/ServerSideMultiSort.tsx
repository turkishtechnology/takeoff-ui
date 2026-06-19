import { ITableColumn, TkTableCustomEvent, ITableRequest } from '@takeoff-ui/core';
import { TkButton, TkTable } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useEffect, useRef, useState } from 'react';
import { fetchFromServerMultiSort } from './server';

const Example = () => {
  const column: ITableColumn[] = [
    {
      field: 'id',
      header: 'Id',
    },
    {
      field: 'name',
      header: 'Name',
      searchable: true,
      sortable: true,
    },
    {
      field: 'category',
      header: 'Category',
      searchable: true,
      sortable: true,
    },
    {
      field: 'quantity',
      header: 'Quantity',
      sortable: true,
    },
  ];

  const tableRef = useRef<HTMLTkTableElement>(null);
  const [data, setData] = useState();
  const [totalItem, setTotalItem] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleRequest = async (e: TkTableCustomEvent<ITableRequest>) => {
    setLoading(true);
    const result: any = await fetchFromServerMultiSort(e.detail.currentPage, e.detail.rowsPerPage, e.detail.filters, e.detail.sorts);

    setTotalItem(result?.totalItem);
    setRowsPerPage(e.detail.rowsPerPage);
    setData(result?.data);
    setLoading(false);
  };

  useEffect(() => {
    tableRef.current.serverRequest();
  }, []);

  return (
    <>
      <TkButton
        icon="refresh"
        variant="neutral"
        type="text"
        onTkClick={async () => {
          setLoading(true);
          const result: any = await fetchFromServerMultiSort(1, 5, [], []);

          setTotalItem(result?.totalItem);
          setData(result?.data);
          setLoading(false);

          tableRef.current!.setCurrentPage(1);
        }}
      />
      <TkTable
        ref={tableRef}
        columns={column}
        data={data}
        multiSort={true}
        paginationMethod="server"
        rowsPerPage={rowsPerPage}
        totalItems={totalItem}
        loading={loading}
        onTkRequest={handleRequest}
      />
    </>
  );
};

const ServerSideMultiSort = () => {
  const reactCode = `const column: ITableColumn[] = [
  {
    field: "id",
    header: "Id",
  },
  {
    field: "name",
    header: "Name",
    searchable: true,
    sortable: true,
  },
  {
    field: "category",
    header: "Category",
    searchable: true,
    sortable: true,
  },
  {
    field: "quantity",
    header: "Quantity",
    sortable: true,
  },
];

const tableRef = useRef<HTMLTkTableElement>(null);
const [data, setData] = useState();
const [totalItem, setTotalItem] = useState();
const [rowsPerPage, setRowsPerPage] = useState(5);
const [loading, setLoading] = useState(false);

const handleRequest = async (e: TkTableCustomEvent<ITableRequest>) => {
  setLoading(true);
  // The table emits the full multi-sort array in priority order.
  // Pass it to the backend as ORDER BY col1 dir1, col2 dir2, ...
  const result: any = await fetchFromServerMultiSort(
    e.detail.currentPage,
    e.detail.rowsPerPage,
    e.detail.filters,
    e.detail.sorts
  );

  setTotalItem(result?.totalItem);
  setRowsPerPage(e.detail.rowsPerPage);
  setData(result?.data);
  setLoading(false);
};

useEffect(() => {
  tableRef.current.serverRequest();
}, []);

return (
  <>
    <TkButton
      icon="refresh"
      variant="neutral"
      type="text"
      onTkClick={async () => {
        setLoading(true);
        const result: any = await fetchFromServerMultiSort(1, 5, [], []);

        setTotalItem(result?.totalItem);
        setData(result?.data);
        setLoading(false);

        tableRef.current!.setCurrentPage(1);
      }}
    />
    <TkTable
      ref={tableRef}
      columns={column}
      data={data}
      multiSort={true}
      paginationMethod="server"
      rowsPerPage={rowsPerPage}
      totalItems={totalItem}
      loading={loading}
      onTkRequest={handleRequest}
    />
  </>
);`;

  const vueCode = `<script setup>
import { TkTable, TkButton } from '@takeoff-ui/vue'
import { ref, onMounted } from 'vue';

const column = [
  {
    field: "id",
    header: "Id",
  },
  {
    field: "name",
    header: "Name",
    searchable: true,
    sortable: true,
  },
  {
    field: "category",
    header: "Category",
    searchable: true,
    sortable: true,
  },
  {
    field: "quantity",
    header: "Quantity",
    sortable: true,
  },
];

const tableRef = ref(null);
const data = ref();
const totalItem = ref();
const rowsPerPage = ref(5);
const loading = ref(false);

const handleRequest = async (e) => {
  loading.value = true;
  // The table emits the full multi-sort array in priority order.
  // Pass it to the backend as ORDER BY col1 dir1, col2 dir2, ...
  const result = await fetchFromServerMultiSort(
    e.detail.currentPage,
    e.detail.rowsPerPage,
    e.detail.filters,
    e.detail.sorts
  );

  totalItem.value = result?.totalItem;
  rowsPerPage.value = e.detail.rowsPerPage;
  data.value = result?.data;
  loading.value = false;
};

onMounted(() => {
  tableRef.value.serverRequest();
});

const refreshData = async () => {
  loading.value = true;
  const result = await fetchFromServerMultiSort(1, 5, [], []);

  totalItem.value = result?.totalItem;
  data.value = result?.data;
  loading.value = false;

  tableRef.value.setCurrentPage(1);
};
</script>

<template>
  <TkButton
    icon="refresh"
    variant="neutral"
    type="text"
    @tkClick="refreshData"
  />
  <TkTable
    ref="tableRef"
    :columns="column"
    :data="data"
    :multiSort="true"
    paginationMethod="server"
    :rowsPerPage="rowsPerPage"
    :totalItems="totalItem"
    :loading="loading"
    @tkRequest="handleRequest"
  />
</template>
`;

  const demo = <Example />;
  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default ServerSideMultiSort;
