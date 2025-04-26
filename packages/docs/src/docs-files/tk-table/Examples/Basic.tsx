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
    },
    {
      field: 'category',
      header: 'Category',
    },
    {
      field: 'quantity',
      header: 'Quantity',
    },
  ];

  return (
    <div className="p-2">
      <TkTable columns={column} data={basicData} />
    </div>
  );
};

const Basic = () => {
  const reactCode = `const column: ITableColumn[] = [
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
];

return (
  <div style={{ padding: "8px" }}>
    <TkTable columns={column} data={basicData} />
  </div>
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
];
</script>

<template>
  <div :style="{ padding: '8px' }">
    <TkTable :columns.prop="column" :data.prop="basicData" />
  </div>
</template>`;

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

export default Basic;
