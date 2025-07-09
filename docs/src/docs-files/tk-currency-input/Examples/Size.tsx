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

  const angularCode = `<tk-currency-input
  label="Small Currency Input"
  size="small"
/>
<tk-currency-input
  label="Base Currency Input"
  size="base"
/>
<tk-currency-input
  label="Large Currency Input"
  size="large"
/>`;

  const demo = (
    <div className="flex flex-col flex-wrap items-start gap-3">
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
      angularCode={angularCode}
    ></FeatureDemo>
  );
};

export default Size;
