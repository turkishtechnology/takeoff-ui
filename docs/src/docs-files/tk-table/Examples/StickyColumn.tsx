import { ITableColumn } from '@takeoff-ui/core';
import { TkTable } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useRef } from 'react';
import { stickyData } from './data';

const Example = () => {
  const tableRef = useRef<HTMLTkTableElement>(null);

  const column: ITableColumn[] = [
    {
      field: 'id',
      header: 'Id',
      fixed: 'left',
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
      fixed: 'right',
    },
  ];
  return (
    <div className="p-2">
      <TkTable ref={tableRef} cardTitle="Sticky" columns={column} data={stickyData}></TkTable>
    </div>
  );
};

const StickyColumn = () => {
  const reactCode = `const tableRef = useRef<HTMLTkTableElement>(null);

const column: ITableColumn[] = [
  {
      field: "id",
      header: "Id",
      fixed: "left",
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
      fixed: "right",
    },
];
return (
  <div style={{ padding: "8px" }}>
    <TkTable ref={tableRef} cardTitle="Sticky" columns={column} data={stickyData}>
    </TkTable>
  </div>
);`;

  const vueCode = `<script setup>
import { TkTable, TkDropdown, TkButton } from '@takeoff-ui/vue'
import { ref } from 'vue';

const stickyData=[
  {
    id: "f230fh0g3",
    name: "Bamboo Watch",
    category: "Accessories",
    quantity: 24,
    startDate:"12.20",
    endDate:"13.20",
    duration:"60 minutes",
    place:"Ankara",
    status:"Onboard"
  },
  {
    id: "nvklal433",
    name: "Black Watch",
    category: "Onyama",
    quantity: 42,
    startDate:"11.40",
    endDate:"15.20",
    duration:"220 minutes",
    place:"Istanbul",
    status:"Boarding"
  },
  {
    id: "zz21cz3c1",
    name: "Blue Band",
    category: "Accessories",
    quantity: 87,
    startDate:"09.00",
    endDate:"15.00",
    duration:"360 minutes",
    place:"Paris",
    status:"Departed"
  },
  {
    id: "244wgerg2",
    name: "Blue T-Shirt",
    category: "Fitness",
    quantity: 12,
    startDate:"07.30",
    endDate:"14.20",
    duration:"410 minutes",
    place:"London",
    status:"Arrived"
  },
  {
    id: "h456wer53",
    name: "Bracelet",
    category: "Clothing",
    quantity: 45,
    startDate:"18.20",
    endDate:"06.20",
    duration:"720 minutes",
    place:"Tokyo",
    status:"Checked-in"
  },
]
const column = [
    {
      field: "id",
      header: "Id",
      fixed: "left",
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
      fixed: "right",
    },
  ];
</script>

<template>
   <div :style="{ padding: '8px' }">
    <TkTable ref="tableRef" cardTitle="Sticky" :columns.prop="column" :data.prop="stickyData">
    </TkTable>
  </div>
</template>
`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default StickyColumn;
