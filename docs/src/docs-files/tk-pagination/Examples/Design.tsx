import { TkPagination, TkRadioGroup, TkRadio } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Design = () => {
  const [type, setType] = useState<'grouped' | 'outlined' | 'text'>('outlined');

  const reactCode = `<TkPagination totalItems={50} rowsPerPage={10} type="${type}" />`;

  const vueCode = `<TkPagination :totalItems="50" :rowsPerPage="10" type="${type}" />`;

  const angularCode = `<tk-pagination [totalItems]="50" [rowsPerPage]="10" type="${type}" />`;

  const radioModels = [
    {
      label: 'Grouped',
      value: 'grouped',
    },
    {
      label: 'Outlined',
      value: 'outlined',
    },
    {
      label: 'Text',
      value: 'text',
    },
  ];
  const demo = (
    <>
      <div style={{ overflow: 'overlay' }}>
        <TkRadioGroup value={type} onTkChange={(e) => setType(e.detail)}>
          {radioModels.map((radio, index) => {
            return (
              <TkRadio label={radio.label} key={index} value={radio.value} />
            );
          })}
        </TkRadioGroup>
      </div>
      <br />
      <TkPagination totalItems={50} rowsPerPage={10} type={type} />
    </>
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={angularCode}
    ></FeatureDemo>
  );
};

export default Design;
