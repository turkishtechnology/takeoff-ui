import { ITableColumn } from '@takeoff-ui/core';
import { TkTable } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';
import { stickyData } from './data';

const Example = () => {
  const column: ITableColumn[] = [
    {
      field: 'id',
      header: 'Id',
    },
    {
      field: 'name',
      header: 'Name',
    },
    {
      field: 'category',
      header: 'Category',
    },
    {
      field: 'quantity',
      header: 'Quantity',
    },
    {
      field: 'place',
      header: 'Place',
    },
    {
      field: 'status',
      header: 'Status',
    },
  ];
  return (
    <div className="p-2">
      <TkTable columns={column} data={stickyData} containerStyle={{ height: '300px' }}></TkTable>
    </div>
  );
};

const StickyHeader = () => {
  const reactCode = `const tableRef = useRef<HTMLTkTableElement>(null);

const column: ITableColumn[] = [
  {
      field: "id",
      header: "Id",
    },
    {
      field: "name",
      header: "Name",
    },
    {
      field: "category",
      header: "Category",
    },
    {
      field: "quantity",
      header: "Quantity",
    },
    {
      field: "place",
      header: "Place",
    },
    {
      field: "status",
      header: "Status",
    },
];
return (
    <TkTable columns={column} data={stickyData} containerStyle={{height: "300px"}}>
    </TkTable>
);`;

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
    },
    {
      field: "category",
      header: "Category",
    },
    {
      field: "quantity",
      header: "Quantity",
    },
    {
      field: "place",
      header: "Place",
    },
    {
      field: "status",
      header: "Status",
      fixed: "right",
    },
  ];
</script>

<template>
    <TkTable :columns="column" :data="stickyData" :containerStyle="{height: '300px'}">
    </TkTable>
</template>
`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default StickyHeader;
