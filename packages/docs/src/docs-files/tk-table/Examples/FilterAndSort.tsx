import { ITableColumn } from '@takeoff-ui/core';
import { TkTable } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';
import { basicData } from './data';

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
      sorter: (a: any, b: any) => (a.name > b.name ? 1 : -1),
      filter: (value: string, row: any) =>
        row.name
          .toString()
          .toLowerCase()
          .indexOf(value.toString().toLowerCase() as string) > -1,
    },
    {
      field: 'category',
      header: 'Category',
      searchable: true,
      sortable: true,
      sorter: (a: any, b: any) => (a.category > b.category ? 1 : -1),
      filter: (value: string, row: any) =>
        row.category
          .toString()
          .toLowerCase()
          .indexOf(value.toString().toLowerCase() as string) > -1,
    },
    {
      field: 'quantity',
      header: 'Quantity',
      sortable: true,
      sorter: (a: any, b: any) =>
        Number(a.quantity) > Number(b.quantity) ? 1 : -1,
    },
  ];

  return <TkTable columns={column} data={basicData} />;
};

const FilterAndSort = () => {
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
      sorter: (a: any, b: any) => (a.name > b.name ? 1 : -1),
      filter: (value: string, row: any) =>
        row.name.toString().toLowerCase().indexOf(value.toString().toLowerCase() as string) > -1,
    },
    {
      field: "category",
      header: "Category",
      searchable: true,
      sortable: true,
      sorter: (a: any, b: any) => (a.category > b.category ? 1 : -1),
      filter: (value: string, row: any) =>
        row.category.toString().toLowerCase().indexOf(value.toString().toLowerCase() as string) > -1,
    },
    {
      field: "quantity",
      header: "Quantity",
      sortable: true,
      sorter: (a: any, b: any) =>
        Number(a.quantity) > Number(b.quantity) ? 1 : -1,
    },
  ];
  return <TkTable columns={column} data={basicData} />;`;

  const vueCode = `<script setup>
import { TkTable } from '@takeoff-ui/vue'

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
</script>

<template>
  <TkTable :columns.prop="column" :data.prop="basicData" />
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

export default FilterAndSort;
