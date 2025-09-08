import { ITableColumn } from '@takeoff-ui/core';
import { TkRadio, TkRadioGroup, TkTable } from '@takeoff-ui/react';
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

  const [selectionList, setSelectionList] = useState([
    {
      id: 'h456wer53',
      name: 'Bracelet',
      category: 'Clothing',
      quantity: 45,
    },
  ]);
  const [mode, setMode] = useState<'checkbox' | 'radio'>('checkbox');

  return (
    <div className="p-2">
      <div style={{ overflow: 'overlay' }} className="mb-4">
        <TkRadioGroup value={mode} onTkChange={e => setMode(e.detail)}>
          <TkRadio label="Checkbox" value="checkbox" />
          <TkRadio label="Radio" value="radio" />
        </TkRadioGroup>
      </div>
      <TkTable
        columns={column}
        data={basicData}
        dataKey="id"
        selection={selectionList}
        selectionMode={mode}
        selectionRowDisabled={row => row.id === 'zz21cz3c1'}
        onTkSelectionChange={(e: CustomEvent) => {
          setSelectionList(e.detail);
        }}
      />
      <p>{JSON.stringify(selectionList)}</p>
    </div>
  );
};

const HeadStyle = () => {
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
const [mode, setMode] = useState();
return (
  <div style={{ padding: "8px" }}>
    <TkTable
      columns={column}
      data={basicData}
      dataKey="id"
      selection={selectionList}
      selectionMode={mode}
      onTkSelectionChange={(e: CustomEvent) =>
        setSelectionList(e.detail)
      }
    />
    <p>{JSON.stringify(selectionList)}</p>
  </div>
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
const selectionList = ref([
  {
    id: 'h456wer53',
    name: 'Bracelet',
    category: 'Clothing',
    quantity: 45,
  },
]);
</script>
 
<template>
  <div :style="{ padding: '8px' }">
    <TkTable
      :columns.prop="column"
      :data.prop="basicData"
      dataKey="id"
      :selection="selectionList"
      selectionMode.prop="mode"
      @tkSelectionChange="e => (selectionList.value = e.detail)"
    />
    <p>{{ JSON.stringify(selectionList) }}</p>
  </div>
</template>`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default HeadStyle;
