import { TkCurrencyInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const State = () => {
  const reactCode = `<TkCurrencyInput
  label="Error"
  placeholder="Error"
  invalid={true}
  error="Bu alan zorunludur"
/>
<TkCurrencyInput
  label="Readonly"
  placeholder="Readonly"
  readonly
/>
<TkCurrencyInput
  label="Disabled"
  placeholder="Disabled"
  disabled
/>`;

  const vueCode = `<TkCurrencyInput
  label="Error"
  placeholder="Error"
  invalid={true}
  error="Bu alan zorunludur"
/>
<TkCurrencyInput
  label="Readonly"
  placeholder="Readonly"
  readonly
/>
<TkCurrencyInput
  label="Disabled"
  placeholder="Disabled"
  disabled
/>`;

  const demo = (
    <div className="flex gap-2 flex-wrap justify-center">
      <TkCurrencyInput
        label="Error"
        placeholder="Error"
        invalid={true}
        error="Bu alan zorunludur"
      />
      <TkCurrencyInput label="Readonly" placeholder="Readonly" readonly />
      <TkCurrencyInput label="Disabled" placeholder="Disabled" disabled />
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
