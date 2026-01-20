import { TkRadio, TkRadioGroup } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const State = () => {
  const reactCode = `<TkRadioGroup invalid={true} label="Error" error="This is an error message">
  <TkRadio label="label 1" value="1" />
  <TkRadio label="label 2" value="2" />
</TkRadioGroup>
<TkRadioGroup label="Disabled" value="1">
  <TkRadio label="label 1" value="1" disabled />
  <TkRadio label="label 2" value="2" disabled />
</TkRadioGroup>`;

  const vueCode = `<TkRadioGroup :invalid="true" label="Error" error="This is an error message">
  <TkRadio label="label 1" value="1" />
  <TkRadio label="label 2" value="2" />
</TkRadioGroup>
<TkRadioGroup label="Disabled" value="1">
  <TkRadio label="label 1" value="1" disabled />
  <TkRadio label="label 2" value="2" disabled />
</TkRadioGroup>`;

  const angularCode = `<tk-radio-group [invalid]="true" label="Error" error="This is an error message">
  <tk-radio label="label 1" value="1" />
  <tk-radio label="label 2" value="2" />
</tk-radio-group>
<tk-radio-group label="Disabled" value="1">
  <tk-radio label="label 1" value="1" disabled />
  <tk-radio label="label 2" value="2" disabled />
</tk-radio-group>`;

  const demo = (
    <div
      style={{
        overflow: 'overlay',
      }}
      className="flex flex-col gap-4"
    >
      <TkRadioGroup invalid={true} label="Error" error="This is an error message">
        <TkRadio label="label 1" value="1" />
        <TkRadio label="label 2" value="2" />
      </TkRadioGroup>
      <TkRadioGroup label="Disabled" value="1">
        <TkRadio label="label 1" value="1" disabled />
        <TkRadio label="label 2" value="2" disabled />
      </TkRadioGroup>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default State;
