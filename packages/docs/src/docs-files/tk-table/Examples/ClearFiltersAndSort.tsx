import { ITableColumn } from '@takeoff-ui/core';
import { TkTable, TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import { useRef } from 'react';
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
      searchable: true,
      sortable: true,
      sorter: (a: any, b: any) => (a.name > b.name ? 1 : -1),
      filter: (value: string, row: any) =>
        row.name
          .toString()
          .toLowerCase()
          .indexOf(value.toString().toLowerCase() as string) > -1,
    },
    {
      field: 'category',
      header: 'Category',
      searchable: true,
      filterType: 'checkbox',
      filterOptions: [
        { value: 'Accessories', label: 'Accessories' },
        { value: 'Clothing', label: 'Clothing' },
        { value: 'Fitness', label: 'Fitness' },
      ],
    },
    {
      field: 'quantity',
      header: 'Quantity',
      sortable: true,
      sorter: (a: any, b: any) =>
        Number(a.quantity) > Number(b.quantity) ? 1 : -1,
    },
  ];

  const handleClearFilters = () => {
    tableRef.current?.clearFilters();
    // For server-side pagination, after clearing filters,
    // serverRequest method is called to trigger tkRequest event
    // tableRef.current?.serverRequest();
  };

  const handleClearSorting = () => {
    tableRef.current?.clearSorting();
    // For server-side pagination, after clearing filters,
    // serverRequest method is called to trigger tkRequest event
    // tableRef.current?.serverRequest();
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <TkButton onClick={handleClearFilters} label="Clear Filters"></TkButton>
        <TkButton onClick={handleClearSorting} label="Clear Sorting"></TkButton>
      </div>
      <TkTable ref={tableRef} columns={column} data={basicData} />
    </div>
  );
};

const ClearFiltersAndSort = () => {
  const reactCode = `const Example = () => {
  const tableRef = useRef(null);

  const column: ITableColumn[] = [
    {
      field: "id",
      header: "Id",
    },
    {
      field: "name",
      header: "Name",
      searchable: true,
      sortable: true,
      sorter: (a: any, b: any) => (a.name > b.name ? 1 : -1),
      filter: (value: string, row: any) =>
        row.name.toString().toLowerCase().indexOf(value.toString().toLowerCase() as string) > -1,
    },
    {
      field: "category",
      header: "Category",
      searchable: true,
      filterType: 'checkbox',
      filterOptions: [
        { value: 'Accessories', label: 'Accessories' },
        { value: 'Clothing', label: 'Clothing' },
        { value: 'Fitness', label: 'Fitness' },
      ],
    },
    {
      field: "quantity",
      header: "Quantity",
      sortable: true,
      sorter: (a: any, b: any) =>
        Number(a.quantity) > Number(b.quantity) ? 1 : -1,
    },
  ];

  const handleClearFilters = () => {
    tableRef.current?.clearFilters();
    // For server-side pagination, after clearing filters,
    // serverRequest method is called to trigger tkRequest event
    // tableRef.current?.serverRequest();
  };

  const handleClearSorting = () => {
    tableRef.current?.clearSorting();
    // For server-side pagination, after clearing filters,
    // serverRequest method is called to trigger tkRequest event
    // tableRef.current?.serverRequest();
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <TkButton onClick={handleClearFilters} label="Clear Filters"></TkButton>
        <TkButton onClick={handleClearSorting} label="Clear Sorting"></TkButton>
      </div>
      <TkTable ref={tableRef} columns={column} data={basicData}/>
    </div>
  );
};`;

  const vueCode = `<script setup>
import { TkTable, TkButton } from '@takeoff-ui/vue'
import { ref } from 'vue'

const tableRef = ref(null)

const column = [
  {
    field: "id",
    header: "Id",
  },
  {
    field: "name",
    header: "Name",
    searchable: true,
    sortable: true,
    sorter: (a, b) => (a.name > b.name ? 1 : -1),
    filter: (value, row) =>
      row.name.toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1,
  },
  {
    field: "category",
    header: "Category",
    searchable: true,
    filterType: 'checkbox',
    filterOptions: [
      { value: 'Accessories', label: 'Accessories' },
      { value: 'Clothing', label: 'Clothing' },
      { value: 'Fitness', label: 'Fitness' },
    ],
  },
  {
    field: "quantity",
    header: "Quantity",
    sortable: true,
    sorter: (a, b) =>
      Number(a.quantity) > Number(b.quantity) ? 1 : -1,
  },
];

const handleClearFilters = () => {
  tableRef.value?.$el.clearFilters();
  // For server-side pagination, after clearing filters,
  // serverRequest method is called to trigger tkRequest event
  // tableRef.value?.$el.serverRequest();
};

const handleClearSorting = () => {
  tableRef.value?.$el.clearSorting();
  // For server-side pagination, after clearing filters,
  // serverRequest method is called to trigger tkRequest event
  // tableRef.value?.$el.serverRequest();
};
</script>

<template>
  <div>
    <div style="margin-bottom: 1rem; display: flex; gap: 0.5rem">
      <TkButton @click="handleClearFilters" label="Clear Filters"></TkButton>
      <TkButton @click="handleClearSorting" label="Clear Sorting"></TkButton>
    </div>
    <TkTable ref="tableRef" :columns.prop="column" :data.prop="basicData" />
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

export default ClearFiltersAndSort;
