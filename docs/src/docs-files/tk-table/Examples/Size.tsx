import { ITableColumn } from '@takeoff-ui/core';
import { TkTable, TkRadio, TkRadioGroup } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';
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

  const [size, setSize] = useState('small');

  return (
    <div className="p-2">
      <div style={{ overflow: 'overlay' }} className="mb-4">
        <TkRadioGroup value={size} onTkChange={e => setSize(e.detail)}>
          <TkRadio label="Small" value="small" />
          <TkRadio label="Base" value="base" />
        </TkRadioGroup>
      </div>
      <TkTable columns={column} data={basicData} dataKey="id" size={size} />
    </div>
  );
};

const Size = () => {
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
    <TkTable columns={column} data={basicData} size="small"/>
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
    <TkTable :columns.prop="column" :data.prop="basicData" size="small" />
  </div>
</template>`;

  const angularCode = `<div style="padding: 8px">
  <tk-table
    [columns]="[
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' }
    ]"
    [data]="[
      { id: 1, name: 'Product A', category: 'Electronics', quantity: 12 },
      { id: 2, name: 'Product B', category: 'Books', quantity: 8 },
      { id: 3, name: 'Product C', category: 'Groceries', quantity: 20 }
    ]"
    size="small"
  />
</div>`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Size;
