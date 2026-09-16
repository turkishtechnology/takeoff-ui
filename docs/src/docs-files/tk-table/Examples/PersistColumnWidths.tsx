import { ITableColumn, ITableColumnResize } from '@takeoff-ui/core';
import { TkTable, TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import { useState } from 'react';
import { basicData } from './data';

const STORAGE_KEY = 'tk-table-docs-column-widths';

const readWidths = (): Record<string, string> => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
};

const baseColumns: ITableColumn[] = [
  { field: 'id', header: 'Id', width: '120px' },
  { field: 'name', header: 'Name', width: '200px' },
  { field: 'category', header: 'Category', width: '160px' },
  { field: 'quantity', header: 'Quantity', width: '120px' },
];

const Example = () => {
  const [savedWidths, setSavedWidths] = useState<Record<string, string>>(readWidths);

  const columns = baseColumns.map(col => ({ ...col, width: savedWidths[col.field] ?? col.width }));

  const handleResize = (e: CustomEvent<ITableColumnResize>) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(e.detail.widths));
  };

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSavedWidths({});
  };

  return (
    <div className="p-2">
      <div className="mb-4">
        <TkButton label="Reset saved widths" size="small" variant="neutral" type="outlined" onClick={reset} />
      </div>
      <TkTable columns={columns} data={basicData} dataKey="id" onTkColumnResize={handleResize} />
    </div>
  );
};

const PersistColumnWidths = () => {
  const reactCode = `const STORAGE_KEY = 'my-page-column-widths';

const baseColumns: ITableColumn[] = [
  { field: 'id', header: 'Id', width: '120px' },
  { field: 'name', header: 'Name', width: '200px' },
  { field: 'category', header: 'Category', width: '160px' },
  { field: 'quantity', header: 'Quantity', width: '120px' },
];

// Merge the saved widths into the column definitions before the first render
const savedWidths = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
const columns = baseColumns.map(col => ({ ...col, width: savedWidths[col.field] ?? col.width }));

const handleResize = (e: CustomEvent<ITableColumnResize>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(e.detail.widths));
};

<TkTable columns={columns} data={data} dataKey="id" onTkColumnResize={handleResize} />`;

  const vueCode = `<script setup>
import { TkTable } from '@takeoff-ui/vue';

const STORAGE_KEY = 'my-page-column-widths';

const baseColumns = [
  { field: 'id', header: 'Id', width: '120px' },
  { field: 'name', header: 'Name', width: '200px' },
  { field: 'category', header: 'Category', width: '160px' },
  { field: 'quantity', header: 'Quantity', width: '120px' },
];

// Merge the saved widths into the column definitions before the first render
const savedWidths = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
const columns = baseColumns.map(col => ({ ...col, width: savedWidths[col.field] ?? col.width }));

const handleResize = e => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(e.detail.widths));
};
</script>

<template>
  <TkTable :columns="columns" :data="data" dataKey="id" @tk-column-resize="handleResize" />
</template>`;

  const angularCode = `// component.ts
const STORAGE_KEY = 'my-page-column-widths';

baseColumns: ITableColumn[] = [
  { field: 'id', header: 'Id', width: '120px' },
  { field: 'name', header: 'Name', width: '200px' },
  { field: 'category', header: 'Category', width: '160px' },
  { field: 'quantity', header: 'Quantity', width: '120px' },
];

// Merge the saved widths into the column definitions before the first render
columns = this.baseColumns.map(col => {
  const savedWidths = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  return { ...col, width: savedWidths[col.field] ?? col.width };
});

handleResize(e: CustomEvent<ITableColumnResize>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(e.detail.widths));
}

// component.html
<tk-table [columns]="columns" [data]="data" dataKey="id" (tk-column-resize)="handleResize($event)"></tk-table>`;

  return <FeatureDemo demo={<Example />} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default PersistColumnWidths;
