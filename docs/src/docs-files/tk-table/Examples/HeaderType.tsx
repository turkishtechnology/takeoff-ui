import { ITableColumn } from '@takeoff-ui/core';
import { TkRadioGroup, TkRadio, TkTable } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';
import { headerTypeData } from './data';

const Example = ({ type, setType }) => {
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
      <div style={{ overflow: 'overlay' }} className="mb-4">
        <TkRadioGroup value={type} onTkChange={(e) => setType(e.detail)}>
          <TkRadio label="Basic" value="basic" />
          <TkRadio label="Primary" value="primary" />
          <TkRadio label="Dark" value="dark" />
        </TkRadioGroup>
      </div>
      <h4>headerType is {type}</h4>
      <TkTable columns={column} data={headerTypeData} headerType={type} />
    </div>
  );
};

const HeaderType = () => {
  const [type, setType] = useState<'basic' | 'dark' | 'primary'>('basic');

  const reactCode = `<TkTable columns={column} data={headerTypeData} headerType="${type}" />`;

  const vueCode = `<TkTable :columns.prop="column" :data.prop="headerTypeData" headerType="${type}" />`;

  const demo = <Example type={type} setType={setType} />;

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={''}
    ></FeatureDemo>
  );
};

export default HeaderType;
