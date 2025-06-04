import { ITableColumn } from '@takeoff-ui/core';
import { TkTable, TkCheckbox } from '@takeoff-ui/react';
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
  const [striped, setStripe] = useState<boolean>(true);
  return (
    <div className="p-2">
      <div className="flex items-center">
        <TkCheckbox
          onTkChange={() => setStripe(!striped)}
          label="striped"
          value={striped}
        />
      </div>
      <TkTable columns={column} data={basicData} striped={striped} />
    </div>
  );
};

const Striped = () => {
  const reactCode = `<TkTable columns={column} data={basicData} striped />`;

  const vueCode = `<TkTable :columns.prop="column" :data.prop="basicData" striped />`;

  const angularCode = `<tk-table
  [columns]="[
    { field: 'id', header: 'Id' },
    { field: 'name', header: 'Name' },
    { field: 'category', header: 'Category' },
    { field: 'quantity', header: 'Quantity' }
  ]"
  [data]="[
    { id: 1, name: 'Product A', category: 'Electronics', quantity: 12 },
    { id: 2, name: 'Product B', category: 'Books', quantity: 8 },
    { id: 3, name: 'Product C', category: 'Groceries', quantity: 20 }
  ]"
  striped
/>`;

  const demo = <Example />;

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={angularCode}
    ></FeatureDemo>
  );
};

export default Striped;
