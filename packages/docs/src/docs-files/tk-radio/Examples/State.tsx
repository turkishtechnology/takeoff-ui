import { TkRadio, TkRadioGroup } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const State = () => {
  const reactCode = `<TkRadioGroup invalid={true} label="Error">
  <TkRadio label="label 1" value="1" />
  <TkRadio label="label 2" value="2" />
</TkRadioGroup>
<TkRadioGroup invalid={true} label="Disabled">
  <TkRadio label="label 1" value="1" disabled />
  <TkRadio label="label 2" value="2" disabled />
</TkRadioGroup>`;

  const vueCode = `<TkRadioGroup :invalid="true" label="Error">
  <TkRadio label="label 1" value="1" />
  <TkRadio label="label 2" value="2" />
</TkRadioGroup>
<TkRadioGroup :invalid="true" label="Disabled">
  <TkRadio label="label 1" value="1" disabled />
  <TkRadio label="label 2" value="2" disabled />
</TkRadioGroup>`;

  const demo = (
    <div
      style={{
        overflow: 'overlay',
      }}
      className="flex flex-col gap-4"
    >
      <TkRadioGroup invalid={true} label="Error">
        <TkRadio label="label 1" value="1" />
        <TkRadio label="label 2" value="2" />
      </TkRadioGroup>
      <TkRadioGroup invalid={true} label="Disabled">
        <TkRadio label="label 1" value="1" disabled />
        <TkRadio label="label 2" value="2" disabled />
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

export default State;
