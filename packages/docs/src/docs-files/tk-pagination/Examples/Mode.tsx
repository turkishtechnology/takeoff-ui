import { TkPagination, TkRadioGroup, TkRadio } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Mode = () => {
  const [mode, setMode] = useState<'compact' | 'compact-expanded'>('compact');

  const reactCode = `<TkPagination totalItems={50} rowsPerPage={10} mode="${mode}" />`;

  const vueCode = `<TkPagination :totalItems="50" :rowsPerPage="10" mode="${mode}" />`;

  const radioModels = [
    {
      label: 'Compact',
      value: 'compact',
    },
    {
      label: 'Compact Expanded',
      value: 'compact-expanded',
    },
  ];
  const demo = (
    <>
      <div style={{ overflow: 'overlay' }}>
        <TkRadioGroup value={mode} onTkChange={(e) => setMode(e.detail)}>
          {radioModels.map((radio, index) => {
            return (
              <TkRadio label={radio.label} key={index} value={radio.value} />
            );
          })}
        </TkRadioGroup>
      </div>
      <br />
      <TkPagination totalItems={50} rowsPerPage={10} mode={mode} />
    </>
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={''}
    ></FeatureDemo>
  );
};

export default Mode;
