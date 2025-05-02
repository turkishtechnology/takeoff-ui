import {
  ITableColumn,
  TkTableCustomEvent,
  ITableRequest,
} from '@takeoff-ui/core';
import { TkButton, TkTable } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useEffect, useRef, useState } from 'react';
import fetchFromServer from './server';

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
    const result: any = await fetchFromServer(
      e.detail.currentPage,
      e.detail.rowsPerPage,
      e.detail.filters,
      e.detail.sortField,
      e.detail.sortOrder,
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
          const result: any = await fetchFromServer(1, 5, [], null, null);

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
        paginationMethod="server"
        rowsPerPage={rowsPerPage}
        totalItems={totalItem}
        loading={loading}
        onTkRequest={handleRequest}
      />
    </>
  );
};

const ServerSide = () => {
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
  const result: any = await fetchFromServer(
    e.detail.currentPage,
    e.detail.rowsPerPage,
    e.detail.filters,
    e.detail.sortField,
    e.detail.sortOrder
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
        const result: any = await fetchFromServer(1, 5, [], null, null);

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
  const result = await fetchFromServer(
    e.detail.currentPage,
    e.detail.rowsPerPage,
    e.detail.filters,
    e.detail.sortField,
    e.detail.sortOrder
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
  const result = await fetchFromServer(1, 5, [], null, null);
  
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
    :columns.prop="column" 
    :data.prop="data" 
    paginationMethod="server" 
    :rowsPerPage="rowsPerPage" 
    :totalItems="totalItem"
    :loading="loading" 
    @tkRequest="handleRequest" 
  />
</template>
`;

  const demo = <Example />;
  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={''}
    ></FeatureDemo>
  );
};

export default ServerSide;
