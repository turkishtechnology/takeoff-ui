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
      headerHtml: () => {
        return '<div style="color: red;">Custom Header</div>';
      },
    },
    {
      field: 'category',
      header: 'Category',
      headerHtml: () => {
        const checkbox = document.createElement('tk-checkbox');
        checkbox.label = 'Checkbox';
        checkbox.addEventListener('tk-change', e => {
          console.log('checkbox status', e.detail);
        });
        return checkbox;
      },
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

const CustomHeader = () => {
  const reactCode = `const column: ITableColumn[] = [
  {
    field: "id",
    header: "Id",
  },
  {
    field: "name",
    header: "Name",
    headerHtml: () => {
      return '<div style="color: red;">Custom Header</div>';
    },
  },
  {
    field: "category",
    header: "Category",
    headerHtml: () => {
      const checkbox = document.createElement('tk-checkbox');
      checkbox.label = 'Checkbox';
      checkbox.addEventListener('tk-change', (e) => {
        console.log('checkbox status', e.detail);
      });
      return checkbox;
    },
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
    headerHtml: () => {
      return '<div style="color: red;">Custom Header</div>';
    },
  },
  {
    field: "category",
    header: "Category",
     headerHtml: () => {
      const checkbox = document.createElement('tk-checkbox');
      checkbox.label = 'Checkbox';
      checkbox.addEventListener('tk-change', (e) => {
        console.log('checkbox status', e.detail);
      });
      return checkbox;
    },
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

  const angularCode = `<div style="padding: 8px">
  <tk-table
    [columns]="[
      { field: 'id', header: 'Id' },
      { 
        field: 'name', 
        header: 'Name',
        headerHtml: () => {
          return '<div style="color: red;">Custom Header</div>';
        },
      },
      { 
        field: 'category', 
        header: 'Category', 
        headerHtml: () => {
          const checkbox = document.createElement('tk-checkbox');
          checkbox.label = 'Checkbox';
          checkbox.addEventListener('tk-change', (e) => {
            console.log('checkbox status', e.detail);
          });
          return checkbox;
        },
      },
      { field: 'quantity', header: 'Quantity' }
    ]"
    [data]="[
      { id: 1, name: 'Product A', category: 'Electronics', quantity: 12 },
      { id: 2, name: 'Product B', category: 'Books', quantity: 8 },
      { id: 3, name: 'Product C', category: 'Groceries', quantity: 20 }
    ]"
  />
</div>`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default CustomHeader;
