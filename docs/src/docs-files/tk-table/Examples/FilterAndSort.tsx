import { ITableColumn } from '@takeoff-ui/core';
import { TkTable } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Example = () => {
  const column: ITableColumn[] = [
    {
      field: 'id',
      header: 'Id',
    },
    {
      field: 'name',
      header: 'Input Filter',
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
      field: 'status',
      header: 'Checkbox Filter',
      searchable: true,
      filterType: 'checkbox',
      filterOptions: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'pending', label: 'Pending' },
      ],
      filterElements: {
        optionsSearchInput: { placeholder: 'Filter' },
      },
    },
    {
      field: 'group',
      header: 'Radio Filter',
      searchable: true,
      filterType: 'radio',
      filterOptions: [
        { value: 'group 1', label: 'Group 1' },
        { value: 'group 2', label: 'Group 2' },
        { value: 'group 3', label: 'Group 3' },
      ],
      filterElements: {
        optionsSearchInput: { placeholder: 'Filter' },
      },
    },
    {
      field: 'quantity',
      header: 'Quantity',
      sortable: true,
      sorter: (a: any, b: any) =>
        Number(a.quantity) > Number(b.quantity) ? 1 : -1,
    },
  ];

  const data = [
    {
      id: 'f230fh0g3',
      name: 'Bamboo Watch',
      status: 'active',
      group: 'group 1',
      quantity: 24,
    },
    {
      id: 'nvklal433',
      name: 'Black Watch',
      status: 'inactive',
      group: 'group 2',
      quantity: 42,
    },
    {
      id: 'zz21cz3c1',
      name: 'Blue Band',
      status: 'active',
      group: 'group 3',
      quantity: 87,
    },
    {
      id: '244wgerg2',
      name: 'Blue T-Shirt',
      status: 'pending',
      group: 'group 1',
      quantity: 12,
    },
    {
      id: 'h456wer53',
      name: 'Bracelet',
      status: 'inactive',
      group: 'group 2',
      quantity: 45,
    },
  ];
  return <TkTable columns={column} data={data} />;
};

const FilterAndSort = () => {
  const reactCode = `const column: ITableColumn[] = [
    {
      field: "id",
      header: "Id",
    },
    {
      field: "name",
      header: "Input Filter",
      searchable: true,
      sortable: true,
      sorter: (a: any, b: any) => (a.name > b.name ? 1 : -1),
      filter: (value: string, row: any) =>
        row.name.toString().toLowerCase().indexOf(value.toString().toLowerCase() as string) > -1,
    },
    {
      field: "status",
      header: "Checkbox Filter",
      searchable: true,
      filterType: 'checkbox',
      filterOptions: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'pending', label: 'Pending' },
      ],
    },
    {
      field: "group",
      header: "Radio Filter",
      searchable: true,
      filterType: 'radio',
      filterOptions: [
        { value: 'group 1', label: 'Group 1' },
        { value: 'group 2', label: 'Group 2' },
        { value: 'group 3', label: 'Group 3' },
      ],
    },
    {
      field: "quantity",
      header: "Quantity",
      sortable: true,
      sorter: (a: any, b: any) =>
        Number(a.quantity) > Number(b.quantity) ? 1 : -1,
    },
  ];

  const data = [
    {
      id: 'f230fh0g3',
      name: 'Bamboo Watch',
      status: 'active',
      group: 'group 1',
      quantity: 24,
    },
    {
      id: 'nvklal433',
      name: 'Black Watch',
      status: 'inactive',
      group: 'group 2',
      quantity: 42,
    },
    {
      id: 'zz21cz3c1',
      name: 'Blue Band',
      status: 'active',
      group: 'group 3',
      quantity: 87,
    },
    {
      id: '244wgerg2',
      name: 'Blue T-Shirt',
      status: 'pending',
      group: 'group 1',
      quantity: 12,
    },
    {
      id: 'h456wer53',
      name: 'Bracelet',
      status: 'inactive',
      group: 'group 2',
      quantity: 45,
    },
  ];
  
  return <TkTable columns={column} data={data} />;`;

  const vueCode = `<script setup>
import { TkTable } from '@takeoff-ui/vue'

const column = [
  {
    field: "id",
    header: "Id",
  },
  {
    field: "name",
    header: "Input Filter",
    searchable: true,
    sortable: true,
    sorter: (a, b) => (a.name > b.name ? 1 : -1),
    filter: (value, row) =>
      row.name.toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1,
  },
  {
    field: "status",
    header: "Checkbox Filter",
    searchable: true,
    filterType: 'checkbox',
    filterOptions: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'pending', label: 'Pending' },
    ],
  },
  {
    field: "group",
    header: "Radio Filter",
    searchable: true,
    filterType: 'radio',
    filterOptions: [
      { value: 'group 1', label: 'Group 1' },
      { value: 'group 2', label: 'Group 2' },
      { value: 'group 3', label: 'Group 3' },
    ],
  },
  {
    field: "quantity",
    header: "Quantity",
    sortable: true,
    sorter: (a, b) =>
      Number(a.quantity) > Number(b.quantity) ? 1 : -1,
  },
];

const data = [
  {
    id: 'f230fh0g3',
    name: 'Bamboo Watch',
    status: 'active',
    group: 'group 1',
    quantity: 24,
  },
  {
    id: 'nvklal433',
    name: 'Black Watch',
    status: 'inactive',
    group: 'group 2',
    quantity: 42,
  },
  {
    id: 'zz21cz3c1',
    name: 'Blue Band',
    status: 'active',
    group: 'group 3',
    quantity: 87,
  },
  {
    id: '244wgerg2',
    name: 'Blue T-Shirt',
    status: 'pending',
    group: 'group 1',
    quantity: 12,
  },
  {
    id: 'h456wer53',
    name: 'Bracelet',
    status: 'inactive',
    group: 'group 2',
    quantity: 45,
  },
];
</script>

<template>
  <TkTable :columns.prop="column" :data.prop="data" />
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
