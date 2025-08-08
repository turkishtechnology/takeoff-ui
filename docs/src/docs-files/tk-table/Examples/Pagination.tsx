import { ITableColumn } from '@takeoff-ui/core';
import { TkTable } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';
import { data } from './data';

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
      sorter: (a: any, b: any) => (Number(a.quantity) > Number(b.quantity) ? 1 : -1),
    },
  ];

  return <TkTable columns={column} data={data} paginationMethod="client" rowsPerPage={5} totalItems={data.length} />;
};

const Pagination = () => {
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
        row.name
          .toString()
          .toLowerCase()
          .indexOf(value.toString().toLowerCase() as string) > -1,
    },
    {
      field: "category",
      header: "Category",
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
      field: "quantity",
      header: "Quantity",
      sortable: true,
      sorter: (a: any, b: any) =>
        Number(a.quantity) > Number(b.quantity) ? 1 : -1,
    },
  ];
  return (
    <TkTable
      columns={column}
      data={data}
      paginationMethod="client"
      rowsPerPage={5}
      totalItems={data.length}
    />
  );`;

  const vueCode = `<script setup>
import { TkTable } from '@takeoff-ui/vue'

const data = [
  {
    id: "f230fh0g3",
    name: "Bamboo Watch",
    category: "Accessories",
    quantity: 24,
  },
  {
    id: "nvklal433",
    name: "Black Watch",
    category: "Onyama",
    quantity: 42,
  },
  {
    id: "zz21cz3c1",
    name: "Blue Band",
    category: "Accessories",
    quantity: 87,
  },
  {
    id: "244wgerg2",
    name: "Blue T-Shirt",
    category: "Fitness",
    quantity: 12,
  },
  {
    id: "h456wer53",
    name: "Bracelet",
    category: "Clothing",
    quantity: 45,
  },
  {
    id: "344wgerg2",
    name: "Art Venere",
    category: "Accessories",
    quantity: 23,
  },
  {
    id: "144wgerg3",
    name: "Simona Morasca",
    category: "Clothing",
    quantity: 56,
  },
  {
    id: "444wgerg6",
    name: "Leota Dilliard",
    category: "Fitness",
    quantity: 89,
  },
  {
    id: "k14wgerj1",
    name: "Sage Wieser",
    category: "Accessories",
    quantity: 77,
  },
  {
    id: "fq4wgergq",
    name: "Kris Marrier",
    category: "Clothing",
    quantity: 65,
  },
  {
    id: "764wger11",
    name: "Abel Maclead",
    category: "Clothing",
    quantity: 61,
  },
  {
    id: "08ge885f",
    name: "Mattie Poquette",
    category: "Fitness",
    quantity: 42,
  },
  {
    id: "wg57erg2",
    name: "Meaghan Garufi",
    category: "Accessories",
    quantity: 99,
  },
  {
    id: "264w3erg2",
    name: "Gladys Rim",
    category: "Magalhaes",
    quantity: 92,
  },
];

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
  <TkTable 
    :columns.prop="column" 
    :data.prop="data" 
    paginationMethod="client" 
    :rowsPerPage="5"
    :totalItems="data.length" 
  />
</template>
`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default Pagination;
