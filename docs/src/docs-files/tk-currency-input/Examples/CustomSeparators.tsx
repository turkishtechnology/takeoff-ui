import { TkCurrencyInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const CustomSeparators = () => {
  const reactCode = `<TkCurrencyInput
    label="Currency Franche Example"
    decimal-separator=","
    thousands-separator=" "
  />`;

  const vueCode = `<TkCurrencyInput
    label="Currency Franche Example"
    decimal-separator=","
    thousands-separator=" "
  />`;

  const angularCode = `<tk-currency-input
    label="Currency Franche Example"
    decimal-separator=","
    thousands-separator=" "
  />`;

  const demo = (
    <div className="flex items-end gap-2">
      <TkCurrencyInput
        label="Currency Franche Example"
        decimal-separator=","
        thousands-separator=" "
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

export default CustomSeparators;
