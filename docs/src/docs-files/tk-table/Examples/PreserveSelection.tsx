import { ITableColumn } from '@takeoff-ui/core';
import { TkTable } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';
import { basicData } from './data';

const columns: ITableColumn[] = [
  { field: 'id', header: 'Id' },
  { field: 'name', header: 'Name' },
  { field: 'category', header: 'Category' },
  { field: 'quantity', header: 'Quantity' },
];

const Example = () => {
  const [selection, setSelection] = useState<any[]>([]);

  return (
    <div className="p-2">
      <p>Selected rows: {selection.length}</p>
      <TkTable
        columns={columns}
        data={basicData}
        dataKey="id"
        paginationMethod="client"
        rowsPerPage={2}
        selection={selection}
        selectionMode="checkbox"
        preserveSelectionOnPagination
        onTkSelectionChange={(e: CustomEvent) => setSelection(e.detail)}
      />
    </div>
  );
};

const PreserveSelection = () => {
  const reactCode = `const [selection, setSelection] = useState<any[]>([]);

return (
  <TkTable
    columns={columns}
    data={basicData}
    dataKey="id"
    paginationMethod="client"
    rowsPerPage={2}
    selection={selection}
    selectionMode="checkbox"
    preserveSelectionOnPagination
    onTkSelectionChange={(e: CustomEvent) => setSelection(e.detail)}
  />
);`;

  const vueCode = `<script setup>
import { ref } from 'vue';
import { TkTable } from '@takeoff-ui/vue';

const selection = ref([]);

const handleSelectionChange = event => {
  selection.value = event.detail;
};
</script>

<template>
  <TkTable
    :columns="columns"
    :data="basicData"
    dataKey="id"
    paginationMethod="client"
    :rowsPerPage="2"
    :selection="selection"
    selectionMode="checkbox"
    preserveSelectionOnPagination
    @tk-selection-change="handleSelectionChange"
  />
</template>`;

  return <FeatureDemo demo={<Example />} reactCode={reactCode} vueCode={vueCode} angularCode="" />;
};

export default PreserveSelection;
