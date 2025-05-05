import { TkTextarea } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const State = () => {
  const reactCode = `<TkTextarea
  label="Error"
  placeholder="Error"
  invalid={true}
  error="Bu alan zorunludur"
/>
<TkTextarea
  label="Readonly"
  placeholder="Readonly"
  readonly
/>
<TkTextarea
  label="Disabled"
  placeholder="Disabled"
  disabled
/>`;

  const vueCode = `<TkTextarea
  label="Error"
  placeholder="Error"
  :invalid="true"
  error="Bu alan zorunludur"
/>
<TkTextarea
  label="Readonly"
  placeholder="Readonly"
  readonly
/>
<TkTextarea
  label="Disabled"
  placeholder="Disabled"
  disabled
/>`;

  const demo = (
    <div className="flex gap-2 flex-wrap justify-center">
      <TkTextarea
        label="Error"
        placeholder="Error"
        invalid={true}
        error="Bu alan zorunludur"
      />
      <TkTextarea label="Readonly" placeholder="Readonly" readonly />
      <TkTextarea label="Disabled" placeholder="Disabled" disabled />
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
