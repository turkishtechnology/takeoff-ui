import { TkCurrencyInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const MinMax = () => {
  const reactCode = `<TkCurrencyInput
  label="Currency Input"
  hint="Allowed range: 100 - 10000"
  min={100}
  max={10000}
  value={50000}
/>`;

  const vueCode = `<TkCurrencyInput
  label="Currency Input"
  hint="Allowed range: 100 - 10000"
  :min="100"
  :max="10000"
  :value="50000"
/>`;

  const angularCode = `<tk-currency-input
  label="Currency Input"
  hint="Allowed range: 100 - 10000"
  [min]="100"
  [max]="10000"
  [value]="50000"
/>`;

  // Starts out of range (50000 > max) to show the value is clamped to 10000.
  const [value, setValue] = useState(50000);

  const demo = (
    <div className="flex items-end gap-2">
      <TkCurrencyInput label="Currency Input" hint="Allowed range: 100 - 10000" min={100} max={10000} value={value} onTkChange={e => setValue(e.detail.value)} />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default MinMax;
