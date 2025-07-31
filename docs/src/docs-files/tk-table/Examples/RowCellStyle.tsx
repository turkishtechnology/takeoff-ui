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
      <TkTable
        columns={column}
        data={basicData}
        cellStyle={(row, col) => {
          if (col.field == 'name' && row.name == 'Blue Band') {
            return { background: 'var(--primary-base)', color: 'white' };
          }
        }}
        rowStyle={(row, index) => {
          if (row.quantity > 50) {
            return {
              background: 'var(--states-success-sub-base)',
            };
          }
          if (index % 2 === 0) {
            return {
              background: 'var(--states-info-sub-base)',
            };
          }
        }}
      />
    </div>
  );
};

const RowCellStyle = () => {
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
      <TkTable
        columns={column}
        data={basicData}
        cellStyle={(row, col) => {
          if (col.field == "name" && row.name == "Blue Band") {
            return { background: "var(--primary-base)", color: "white" };
          }
        }}
        rowStyle={(row, index) => {
          if (row.quantity > 50) {
            return {
              background: "var(--states-success-sub-base)",
            };
          }
          if (index % 2 === 0) {
            return {
              background: "var(--states-info-sub-base)",
            };
          }
        }}
      />
    </div>
  );`;

  const vueCode = `<script setup>
import { TkTable } from '@takeoff-ui/vue'

const basicData = [
  {
    id: "f230fh0g3",
    name: "Bamboo Watch",
    category: "Accessories",
    quantity: 24,
  },
  {
    id: "nvklal433",
    name: "Black Watch",
    category: "Onyama",
    quantity: 42,
  },
  {
    id: "zz21cz3c1",
    name: "Blue Band",
    category: "Accessories",
    quantity: 87,
  },
  {
    id: "244wgerg2",
    name: "Blue T-Shirt",
    category: "Fitness",
    quantity: 12,
  },
  {
    id: "h456wer53",
    name: "Bracelet",
    category: "Clothing",
    quantity: 45,
  },
];

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
  <TkTable
    :columns.prop="column"
    :data.prop="basicData"
    :cellStyle.prop="(row, col) => {
      if (col.field == 'name' && row.name == 'Blue Band') {
        return { background: 'var(--primary-base)', color: 'white' };
      }
    }"
    :rowStyle.prop="(row, index) => {
      if (row.quantity > 50) {
        return {
          background: 'var(--states-success-sub-base)',
        };
      }
      if (index % 2 === 0) {
        return {
          background: 'var(--states-info-sub-base)',
        };
      }
    }"
  />
</template>
`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default RowCellStyle;
