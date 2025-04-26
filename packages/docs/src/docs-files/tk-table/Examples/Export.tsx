import { ITableColumn, ITableExportOptions } from '@takeoff-ui/core';
import { TkButton, TkDropdown, TkTable } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useRef } from 'react';
import { basicData } from './data';

const Example = () => {
  const tableRef = useRef<HTMLTkTableElement>(null);

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

  const exportOptions = [
    {
      label: 'Pdf',
      value: 'pdf',
    },
    {
      label: 'Excel',
      value: 'excel',
    },
    {
      label: 'Csv',
      value: 'csv',
    },
  ];

  const handleItemClick = (e) => {
    tableRef.current?.exportFile({
      type: e.detail.value,
      fileName: 'custom_file_name',
    } as ITableExportOptions);
  };

  return (
    <div className="p-2">
      <TkTable ref={tableRef} columns={column} data={basicData}>
        <div slot="header-right">
          <TkDropdown
            options={exportOptions}
            position="bottom-end"
            onTkItemClick={handleItemClick}
          >
            <TkButton
              slot="trigger"
              label="Export"
              icon="keyboard_arrow_down"
              iconPosition="right"
              type="outlined"
            />
          </TkDropdown>
        </div>
      </TkTable>
    </div>
  );
};

const Export = () => {
  const reactCode = `const tableRef = useRef<HTMLTkTableElement>(null);

const column: ITableColumn[] = [
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
const exportOptions = [
  {
    label: "Pdf",
    value: "pdf",
  },
  {
    label: "Excel",
    value: "excel",
  },
  {
    label: "Csv",
    value: "csv",
  },
];
const handleItemClick = (e) => {
  tableRef.current?.exportFile({
    type: e.detail.value,
    fileName: "custom_file_name",
  } as ITableExportOptions);
};
return (
  <div style={{ padding: "8px" }}>
    <TkTable ref={tableRef} columns={column} data={basicData}>
      <div slot="header-right">
        <TkDropdown
          options={exportOptions}
          position="bottom-end"
          onTkItemClick={handleItemClick}
        >
          <TkButton
            slot="trigger"
            label="Export"
            icon="keyboard_arrow_down"
            iconPosition="right"
            type="outlined"
          />
        </TkDropdown>
      </div>
    </TkTable>
  </div>
);`;

  const vueCode = `<script setup>
import { TkTable, TkDropdown, TkButton } from '@takeoff-ui/vue'
import { ref } from 'vue';

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
const exportOptions = [
  {
    label: "Pdf",
    value: "pdf",
  },
  {
    label: "Excel",
    value: "excel",
  },
  {
    label: "Csv",
    value: "csv",
  },
];

const tableRef = ref()
const handleItemClick = (e) => {
  tableRef.value?.$el.exportFile({
    type: e.detail.value,
    fileName: "custom_file_name",
  });
};
</script>

<template>
   <div :style="{ padding: '8px' }">
    <TkTable ref="tableRef" :columns.prop="column" :data.prop="basicData">
      <div slot="header-right">
        <TkDropdown
          :options.prop="exportOptions"
          position="bottom-end"
          @tkItemClick="handleItemClick"
        >
          <TkButton
            slot="trigger"
            label="Export"
            icon="keyboard_arrow_down"
            iconPosition="right"
            type="outlined"
          />
        </TkDropdown>
      </div>
    </TkTable>
  </div>
</template>
`;

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

export default Export;
