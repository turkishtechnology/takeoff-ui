import { TkCurrencyInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const MinMax = () => {
  const reactCode = `<TkCurrencyInput
  label="Currency Input"
  min={100}
  max={10000}
  value={2500}
/>`;

  const vueCode = `<TkCurrencyInput
  label="Currency Input"
  :min="100"
  :max="10000"
  :value="2500"
/>`;

  const angularCode = `<tk-currency-input
  label="Currency Input"
  [min]="100"
  [max]="10000"
  [value]="2500"
/>`;

  const [value, setValue] = useState(2500);

  const demo = (
    <div className="flex items-end gap-2">
      <TkCurrencyInput label="Currency Input" min={100} max={10000} value={value} onTkChange={e => setValue(e.detail.value)} />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default MinMax;
