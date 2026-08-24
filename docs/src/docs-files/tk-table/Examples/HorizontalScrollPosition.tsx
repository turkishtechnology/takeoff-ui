import { ITableColumn } from '@takeoff-ui/core';
import { TkTable, TkRadio, TkRadioGroup } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import { useState } from 'react';
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
      field: 'startDate',
      header: 'Start Date',
    },
    {
      field: 'endDate',
      header: 'End Date',
    },
    {
      field: 'duration',
      header: 'Dration',
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

  const [horizontalScrollPosition, setHorizontalScrollPosition] = useState<'bottom' | 'top' | 'both'>('top');

  return (
    <div className="p-2">
      <div style={{ overflow: 'overlay' }} className="mb-4">
        <TkRadioGroup value={horizontalScrollPosition} onTkChange={e => setHorizontalScrollPosition(e.detail)}>
          <TkRadio label="Bottom" value="bottom" />
          <TkRadio label="Top" value="top" />
          <TkRadio label="Both" value="both" />
        </TkRadioGroup>
      </div>
      <TkTable columns={column} data={stickyData} dataKey="id" horizontalScrollPosition={horizontalScrollPosition} />
    </div>
  );
};

const HorizontalScrollPosition = () => {
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
  {
    field: "startDate",
    header: "Start Date",
  },
  {
    field: "endDate",
    header: "End Date",
  },
  {
    field: "duration",
    header: "Dration",
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
  <div style={{ padding: "8px" }}>
    <TkTable columns={column} data={stickyData} dataKey="id" horizontalScrollPosition="top" />
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
  {
    field: "startDate",
    header: "Start Date",
  },
  {
    field: "endDate",
    header: "End Date",
  },
  {
    field: "duration",
    header: "Dration",
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
</script>

<template>
  <div :style="{ padding: '8px' }">
    <TkTable :columns="column" :data="stickyData" dataKey="id" horizontalScrollPosition="top" />
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
      { field: 'duration', header: 'Dration' },
      { field: 'place', header: 'Place' },
      { field: 'status', header: 'Status' }
    ]"
    [data]="stickyData"
    dataKey="id"
    horizontalScrollPosition="top"
  />
</div>`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default HorizontalScrollPosition;
