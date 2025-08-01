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
      header: 'Name',
      sortable: true,
      sorter: (a: any, b: any) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      },
    },
    {
      field: 'status',
      header: 'Status',
      sortable: true,
      sorter: (a: any, b: any) => {
        if (a.status < b.status) return -1;
        if (a.status > b.status) return 1;
        return 0;
      },
    },
    {
      field: 'group',
      header: 'Group',
      sortable: true,
      sorter: (a: any, b: any) => {
        if (a.group < b.group) return -1;
        if (a.group > b.group) return 1;
        return 0;
      },
    },
    {
      field: 'quantity',
      header: 'Quantity',
      sortable: true,
      sorter: (a: any, b: any) => {
        if (a.quantity < b.quantity) return -1;
        if (a.quantity > b.quantity) return 1;
        return 0;
      },
    },
  ];

  const data = [
    {
      id: 'zz21cz3c1',
      name: 'Blue Band',
      status: 'active',
      group: 'group 3',
      quantity: 87,
    },
    {
      id: 'h456wer53',
      name: 'Bracelet',
      status: 'inactive',
      group: 'group 2',
      quantity: 45,
    },
    {
      id: 'a789def12',
      name: 'Blue Band',
      status: 'pending',
      group: 'group 1',
      quantity: 24,
    },
    {
      id: 'b123ghi34',
      name: 'Blue Band',
      status: 'inactive',
      group: 'group 2',
      quantity: 12,
    },
    {
      id: 'c456jkl56',
      name: 'Smart Watch',
      status: 'active',
      group: 'group 3',
      quantity: 24,
    },
    {
      id: 'e012pqr90',
      name: 'Bracelet',
      status: 'active',
      group: 'group 1',
      quantity: 45,
    },
  ];
  return <TkTable columns={column} data={data} allowMultiSort={true} />;
};

const MultiSort = () => {
  const reactCode = `const column: ITableColumn[] = [
    {
      field: 'id',
      header: 'Id',
    },
    {
      field: 'name',
      header: 'Name',
      sortable: true,
      sorter: (a: any, b: any) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      },
    },
    {
      field: 'status',
      header: 'Status',
      sortable: true,
      sorter: (a: any, b: any) => {
        if (a.status < b.status) return -1;
        if (a.status > b.status) return 1;
        return 0;
      },
    },
    {
      field: 'group',
      header: 'Group',
      sortable: true,
      sorter: (a: any, b: any) => {
        if (a.group < b.group) return -1;
        if (a.group > b.group) return 1;
        return 0;
      },
    },
    {
      field: 'quantity',
      header: 'Quantity',
      sortable: true,
      sorter: (a: any, b: any) => {
        if (a.quantity < b.quantity) return -1;
        if (a.quantity > b.quantity) return 1;
        return 0;
      },
    },
  ];

  const data = [
    {
      id: 'zz21cz3c1',
      name: 'Blue Band',
      status: 'active',
      group: 'group 3',
      quantity: 87,
    },
    {
      id: 'h456wer53',
      name: 'Bracelet',
      status: 'inactive',
      group: 'group 2',
      quantity: 45,
    },
    {
      id: 'a789def12',
      name: 'Blue Band',
      status: 'pending',
      group: 'group 1',
      quantity: 24,
    },
    {
      id: 'b123ghi34',
      name: 'Blue Band',
      status: 'inactive',
      group: 'group 2',
      quantity: 12,
    },
    {
      id: 'c456jkl56',
      name: 'Smart Watch',
      status: 'active',
      group: 'group 3',
      quantity: 24,
    },
    {
      id: 'e012pqr90',
      name: 'Bracelet',
      status: 'active',
      group: 'group 1',
      quantity: 45,
    },
  ];

  return <TkTable columns={column} data={data} allowMultiSort={true} />;`;

  const vueCode = `<script setup>
import { TkTable } from '@takeoff-ui/vue';

const column = [
    {
      field: 'id',
      header: 'Id',
    },
    {
      field: 'name',
      header: 'Name',
      sortable: true,
      sorter: (a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      },
    },
    {
      field: 'status',
      header: 'Status',
      sortable: true,
      sorter: (a, b) => {
        if (a.status < b.status) return -1;
        if (a.status > b.status) return 1;
        return 0;
      },
    },
    {
      field: 'group',
      header: 'Group',
      sortable: true,
      sorter: (a, b) => {
        if (a.group < b.group) return -1;
        if (a.group > b.group) return 1;
        return 0;
      },
    },
    {
      field: 'quantity',
      header: 'Quantity',
      sortable: true,
      sorter: (a, b) => {
        if (a.quantity < b.quantity) return -1;
        if (a.quantity > b.quantity) return 1;
        return 0;
      },
    },
  ];
  const data = [
    {
      id: 'zz21cz3c1',
      name: 'Blue Band',
      status: 'active',
      group: 'group 3',
      quantity: 87,
    },
    {
      id: 'h456wer53',
      name: 'Bracelet',
      status: 'inactive',
      group: 'group 2',
      quantity: 45,
    },
    {
      id: 'a789def12',
      name: 'Blue Band',
      status: 'pending',
      group: 'group 1',
      quantity: 24,
    },
    {
      id: 'b123ghi34',
      name: 'Blue Band',
      status: 'inactive',
      group: 'group 2',
      quantity: 12,
    },
    {
      id: 'c456jkl56',
      name: 'Smart Watch',
      status: 'active',
      group: 'group 3',
      quantity: 24,
    },
    {
      id: 'e012pqr90',
      name: 'Bracelet',
      status: 'active',
      group: 'group 1',
      quantity: 45,
    },
  ];
</script>

<template>
  <TkTable :columns.prop="column" :data.prop="data" :allowMultiSort.prop="true" />
</template>
`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default MultiSort;
