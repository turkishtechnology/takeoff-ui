import { TkCurrencyInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Basic = () => {
  const reactCode = `<TkCurrencyInput
  label="Currency Input"
  hint="Hint text"
  placeholder="Placeholder text"
/>`;

  const vueCode = `<TkCurrencyInput
  label="Currency Input"
  hint="Hint text"
  placeholder="Placeholder text"
/>`;

  const angularCode = `<tk-currency-input
  label="Currency Input"
  hint="Hint text"
  placeholder="Placeholder text"
/>`;

  const demo = (
    <div className="flex items-end gap-2">
      <TkCurrencyInput
        label="Currency Input"
        hint="Hint text"
        placeholder="Placeholder text"
      />
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

export default Basic;
