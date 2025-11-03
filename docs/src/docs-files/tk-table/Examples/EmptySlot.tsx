import { ITableColumn } from '@takeoff-ui/core';
import { TkButton, TkTable } from '@takeoff-ui/react';
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
  const [data, setData] = useState([]);
  return (
    <div className="p-2">
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <TkButton label="Load Data" onTkClick={() => setData(basicData)} className="mt-2" />
        <TkButton label="Show Empty Data Slot" onTkClick={() => setData([])} className="mt-2" />
      </div>
      <TkTable columns={column} data={data}>
        <div slot="empty-data" className="p-4 text-center text-gray-500">
          No data found...
        </div>
      </TkTable>
    </div>
  );
};

const EmptySlot = () => {
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

const [data, setData] = useState([]);
  return (
    <div className="p-2">
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <TkButton label="Load Data" onTkClick={() => setData(basicData)} className="mt-2" />
        <TkButton label="Show Empty Data Slot" onTkClick={() => setData([])} className="mt-2" />
      </div>
      <TkTable columns={column} data={data}>
        <div slot="empty-data" className="p-4 text-center text-gray-500">
          No data found...
        </div>
      </TkTable>
    </div>
  );`;

  const vueCode = `<script setup>
import { TkButton, TkTable } from '@takeoff-ui/vue';
import { ref } from 'vue';
import { basicData } from './data';
const data = ref([]);

const columns = [
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

const loadData = () => {
  data.value = basicData;
};

const showEmptySlot = () => {
  data.value = [];
};
</script>

<template>
  <div class="p-2">
    <div style="margin-bottom: 1rem; display: flex; gap: 0.5rem">
      <TkButton label="Load Data" @tk-click="loadData" class="mt-2" />
      <TkButton label="Show Empty Data Slot" @tk-click="showEmptySlot" class="mt-2" />
    </div>
    <TkTable :columns.prop="columns" :data.prop="data">
      <div slot="empty-data" class="p-4 text-center text-gray-500">No data found...</div>
    </TkTable>
  </div>
</template>
`;

  const angularCode = `
    <div style="padding: 8px">
      <div style="margin-bottom: 1rem; display: flex; gap: 0.5rem">
        <tk-button label="Load Data" (tkClick)="loadData()" class="mt-2"></tk-button>
        <tk-button label="Show Empty Data Slot" (tkClick)="showEmptySlot()" class="mt-2"></tk-button>
      </div>
      <tk-table [columns]="columns" [data]="data">
        <div slot="empty-data" class="p-4 text-center text-gray-500">
          No data found...
        </div>
      </tk-table>
    </div>`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default EmptySlot;
