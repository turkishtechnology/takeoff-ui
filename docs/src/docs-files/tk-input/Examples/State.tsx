import { TkInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const State = () => {
  const reactCode = `<TkInput
  label="Error"
  placeholder="Error"
  invalid={true}
  error="Bu alan zorunludur"
/>
<TkInput
  label="Readonly"
  placeholder="Readonly"
  readonly
/>
<TkInput
  label="Disabled"
  placeholder="Disabled"
  disabled
/>`;

  const vueCode = `<TkInput
  label="Error"
  placeholder="Error"
  :invalid="true"
  error="Bu alan zorunludur"
/>
<TkInput label="Readonly" placeholder="Readonly" readonly />
<TkInput label="Disabled" placeholder="Disabled" disabled />`;

  const demo = (
    <div className="flex gap-2 flex-wrap justify-center">
      <TkInput
        label="Error"
        placeholder="Error"
        invalid={true}
        error="Bu alan zorunludur"
      />
      <TkInput label="Readonly" placeholder="Readonly" readonly />
      <TkInput label="Disabled" placeholder="Disabled" disabled />
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
