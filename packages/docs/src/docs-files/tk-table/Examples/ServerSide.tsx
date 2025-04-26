import {
  ITableColumn,
  TkTableCustomEvent,
  ITableRequest,
} from '@takeoff-ui/core';
import { TkTable } from '@takeoff-ui/react';
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
  const [loading, setLoading] = useState(false);

  const handleRequest = async (e: TkTableCustomEvent<ITableRequest>) => {
    console.log('handleRequest');
    setLoading(true);
    const result: any = await fetchFromServer(
      e.detail.currentPage,
      e.detail.rowsPerPage,
      e.detail.filters,
      e.detail.sortField,
      e.detail.sortOrder,
    );

    setData(result?.data);
    setTotalItem(result?.totalItem);
    setLoading(false);
  };

  useEffect(() => {
    tableRef.current.serverRequest();
  }, []);

  return (
    <TkTable
      ref={tableRef}
      columns={column}
      data={data}
      paginationMethod="server"
      rowsPerPage={5}
      totalItems={totalItem}
      loading={loading}
      onTkRequest={handleRequest}
    />
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
const [data, setData] = useState();
const [totalItem, setTotalItem] = useState();
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
  setData(result?.data);
  setTotalItem(result?.totalItem);
  setLoading(false);
};
return (
  <TkTable
    columns={column}
    data={data}
    paginationMethod="server"
    rowsPerPage={5}
    totalItems={totalItem}
    loading={loading}
    onTkRequest={handleRequest}
  />
);`;

  const vueCode = `<script setup>
import { TkTable } from '@takeoff-ui/vue'
import { ref } from 'vue';

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
    sorter: (a, b) => (a.name > b.name ? 1 : -1),
    filter: (value, row) =>
      row.name.toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1,
  },
  {
    field: "category",
    header: "Category",
    searchable: true,
    sortable: true,
    sorter: (a, b) => (a.category > b.category ? 1 : -1),
    filter: (value, row) =>
      row.category.toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1,
  },
  {
    field: "quantity",
    header: "Quantity",
    sortable: true,
    sorter: (a, b) =>
      Number(a.quantity) > Number(b.quantity) ? 1 : -1,
  },
];

const data = ref([])
const totalItem = ref(0)
const loading = ref(false)

const handleRequest = async (e) => {
  loading.value = true
  const result = await fetchFromServer(
    e.detail.currentPage,
    e.detail.rowsPerPage,
    e.detail.filters,
    e.detail.sortField,
    e.detail.sortOrder
  );
  data.value = result?.data
  totalItem.value = result?.totalItem
  loading.value = false
};
</script>

<template>
  <TkTable 
    :columns.prop="column" 
    :data.prop="data" 
    paginationMethod="server" 
    :rowsPerPage="5" 
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
