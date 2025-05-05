import { TkRadio, TkRadioGroup } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Type = () => {
  const reactCode = `<TkRadioGroup label="Default Type">
  <TkRadio label="label 1" value="1" />
  <TkRadio label="label 2" value="2" />
</TkRadioGroup>
<TkRadioGroup label="Card Type" type="card">
  <TkRadio label="label 1" value="1" />
  <TkRadio label="label 2" value="2" />
</TkRadioGroup>`;

  const vueCode = `<TkRadioGroup label="Default Type">
  <TkRadio label="label 1" value="1" />
  <TkRadio label="label 2" value="2" />
</TkRadioGroup>
<TkRadioGroup label="Card Type" type="card">
  <TkRadio label="label 1" value="1" />
  <TkRadio label="label 2" value="2" />
</TkRadioGroup>`;

  const demo = (
    <div
      style={{
        overflow: 'overlay',
      }}
      className="flex flex-col gap-4"
    >
      <TkRadioGroup label="Default Type">
        <TkRadio label="label 1" value="1" />
        <TkRadio label="label 2" value="2" />
      </TkRadioGroup>
      <TkRadioGroup label="Card Type" type="card">
        <TkRadio label="label 1" value="1" />
        <TkRadio label="label 2" value="2" />
      </TkRadioGroup>
    </div>
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

export default Type;
