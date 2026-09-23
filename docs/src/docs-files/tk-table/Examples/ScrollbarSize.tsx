import { ITableColumn } from '@takeoff-ui/core';
import { TkTable, TkRadio, TkRadioGroup } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import { useState } from 'react';
import { stickyData } from './data';

const column: ITableColumn[] = [
  { field: 'id', header: 'Id' },
  { field: 'name', header: 'Name' },
  { field: 'category', header: 'Category' },
  { field: 'quantity', header: 'Quantity' },
  { field: 'startDate', header: 'Start Date' },
  { field: 'endDate', header: 'End Date' },
  { field: 'duration', header: 'Duration' },
  { field: 'place', header: 'Place' },
  { field: 'status', header: 'Status' },
];

const Example = () => {
  const [scrollbarSize, setScrollbarSize] = useState<'thin' | 'base' | 'large'>('base');

  return (
    <div className="p-2">
      <div className="mb-4">
        <TkRadioGroup value={scrollbarSize} onTkChange={e => setScrollbarSize(e.detail)}>
          <TkRadio label="Thin" value="thin" />
          <TkRadio label="Base" value="base" />
          <TkRadio label="Large" value="large" />
        </TkRadioGroup>
      </div>
      <TkTable columns={column} data={stickyData} dataKey="id" containerStyle={{ height: '240px' }} scrollbarSize={scrollbarSize} />
    </div>
  );
};

const ScrollbarSize = () => {
  const reactCode = `const column: ITableColumn[] = [
  { field: "id", header: "Id" },
  { field: "name", header: "Name" },
  { field: "category", header: "Category" },
  { field: "quantity", header: "Quantity" },
  { field: "startDate", header: "Start Date" },
  { field: "endDate", header: "End Date" },
  { field: "duration", header: "Duration" },
  { field: "place", header: "Place" },
  { field: "status", header: "Status" },
];

return (
  <div style={{ padding: "8px" }}>
    <TkTable columns={column} data={stickyData} dataKey="id" containerStyle={{ height: "240px" }} scrollbarSize="large" />
  </div>
);`;

  const vueCode = `<script setup>
import { TkTable } from '@takeoff-ui/vue'

const column = [
  { field: "id", header: "Id" },
  { field: "name", header: "Name" },
  { field: "category", header: "Category" },
  { field: "quantity", header: "Quantity" },
  { field: "startDate", header: "Start Date" },
  { field: "endDate", header: "End Date" },
  { field: "duration", header: "Duration" },
  { field: "place", header: "Place" },
  { field: "status", header: "Status" },
];
</script>

<template>
  <div :style="{ padding: '8px' }">
    <TkTable :columns="column" :data="stickyData" dataKey="id" :containerStyle="{ height: '240px' }" scrollbarSize="large" />
  </div>
</template>`;

  const angularCode = `<div style="padding: 8px">
  <tk-table
    [columns]="[
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' },
      { field: 'startDate', header: 'Start Date' },
      { field: 'endDate', header: 'End Date' },
      { field: 'duration', header: 'Duration' },
      { field: 'place', header: 'Place' },
      { field: 'status', header: 'Status' }
    ]"
    [data]="stickyData"
    dataKey="id"
    [containerStyle]="{ height: '240px' }"
    scrollbarSize="large"
  />
</div>`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default ScrollbarSize;
