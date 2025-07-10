import { TkCurrencyInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const AllowNegativeValue = () => {
  const reactCode = `<TkCurrencyInput
  label="Currency Input"
  showAsterisk
  placeholder="Placeholder text"
  allowNegative
/>`;

  const vueCode = `<TkCurrencyInput
  label="Currency Input"
  showAsterisk
  placeholder="Placeholder text"
  allowNegative
/>`;

  const angularCode = `<tk-currency-input
  label="Currency Input"
  show-asterisk
  placeholder="Placeholder text"
  allow-negative
/>`;

  const [value, setValue] = useState({
    value: -2300,
    formattedValue: '',
    currency: {},
  });
  const demo = (
    <div className="flex items-end gap-2">
      <TkCurrencyInput
        label="Currency Input"
        showAsterisk
        placeholder="Placeholder text"
        allowNegative
        onTkChange={(e) => setValue(e.detail)}
        value={value.value}
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

export default AllowNegativeValue;
