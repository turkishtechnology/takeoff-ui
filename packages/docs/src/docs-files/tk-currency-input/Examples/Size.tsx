import { TkCurrencyInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Size = () => {
  const reactCode = `<TkCurrencyInput
  label="Small Currency Input"
  size="small"
/>
<TkCurrencyInput
  label="Base Currency Input"
  size="base"
/>
<TkCurrencyInput
  label="Large Currency Input"
  size="large"
/>`;

  const vueCode = `<TkCurrencyInput
  label="Small Currency Input"
  size="small"
/>
<TkCurrencyInput
  label="Base Currency Input"
  size="base"
/>
<TkCurrencyInput
  label="Large Currency Input"
  size="large"
/>`;

  const demo = (
    <div className="flex items-end gap-2 flex-wrap justify-center">
      <TkCurrencyInput label="Small Currency Input" size="small" />
      <TkCurrencyInput label="Base Currency Input" size="base" />
      <TkCurrencyInput label="Large Currency Input" size="large" />
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

export default Size;
