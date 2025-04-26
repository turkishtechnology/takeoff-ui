import { ITableColumn } from '@takeoff-ui/core';
import { TkTable } from '@takeoff-ui/react';
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

  const [selectionList, setSelectionList] = useState();

  return (
    <div className="p-2">
      <TkTable
        columns={column}
        data={basicData}
        dataKey="id"
        selectionMode="radio"
        onTkSelectionChange={(e: CustomEvent) =>
          setSelectionList({ ...e.detail })
        }
      />
      <p>{JSON.stringify(selectionList)}</p>
    </div>
  );
};

const RadioSelection = () => {
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
const [selectionList, setSelectionList] = useState();
return (
  <div style={{ padding: "8px" }}>
    <TkTable
      columns={column}
      data={basicData}
      dataKey="id"
      selectionMode="radio"
      onTkSelectionChange={(e: CustomEvent) =>
        setSelectionList({ ...e.detail })
      }
    />
    <p>{JSON.stringify(selectionList)}</p>
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
    <TkTable 
      :columns.prop="column" 
      :data.prop="basicData" 
      dataKey="id" 
      selectionMode="radio"
      @tkSelectionChange="(e) => setSelectionList({ ...e.detail })" 
    />
    <p>{{ JSON.stringify(selectionList) }}</p>
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

export default RadioSelection;
