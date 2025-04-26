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

export default Striped;
