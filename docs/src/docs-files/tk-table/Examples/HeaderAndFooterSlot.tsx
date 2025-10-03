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
    <TkTable columns={column} data={basicData}>
      <tr slot="body-header" style={{ background: 'white', fontWeight: 'bold' }}>
        <td style={{ padding: '0 8px' }}>Cell Sum Data</td>
        <td colSpan={3} style={{ padding: '0 8px' }}>
          This is a custom header row in tbody
        </td>
      </tr>
      <tr slot="body-footer" style={{ background: 'white', fontWeight: 'bold' }}>
        <td style={{ padding: '0 8px' }}>Cell Sum Data</td>
        <td colSpan={3} style={{ padding: '0 8px' }}>
          This is a custom footer row in tbody
        </td>
      </tr>
    </TkTable>
  );
};

const HeaderAndFooterSlot = () => {
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
     <TkTable columns={column} data={basicData}>
      <tr slot="body-header" style={{ background: 'white', fontWeight: 'bold' }}>
        <td style={{ padding: '0 8px' }}>Cell Sum Data</td>
        <td colSpan={3} style={{ padding: '0 8px' }}>This is a custom header row in tbody</td>
      </tr>
      <tr slot="body-footer" style={{ background: 'white', fontWeight: 'bold' }}>
        <td style={{ padding: '0 8px' }}>Cell Sum Data</td>
        <td colSpan={3} style={{ padding: '0 8px' }}>This is a custom footer row in tbody</td>
      </tr>
    </TkTable>
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
     <TkTable columns={column} data={basicData}>
       <tr slot="body-header" style="background: white; font-weight: bold">
         <td style="padding:0 8px">Cell Sum Data</td>
         <td colSpan={3} style="padding:0 8px">This is a custom header row in tbody</td>
       </tr>
       <tr slot="body-footer" style="background: 'white'; font-weight: bold;">
         <td style="padding:0 8px">Cell Sum Data</td>
         <td colSpan={3} style="padding:0 8px">This is a custom footer row in tbody</td>
       </tr>
     </TkTable>
  </div>
</template>`;

  const angularCode = ``;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default HeaderAndFooterSlot;
