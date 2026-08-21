import { TkCurrencyInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const MaxIntegerDigits = () => {
  const reactCode = `<TkCurrencyInput
  label="Currency Input"
  hint="At most 5 integer digits"
  maxIntegerDigits={5}
  value={12345}
/>`;

  const vueCode = `<TkCurrencyInput
  label="Currency Input"
  hint="At most 5 integer digits"
  :max-integer-digits="5"
  :value="12345"
/>`;

  const angularCode = `<tk-currency-input
  label="Currency Input"
  hint="At most 5 integer digits"
  [maxIntegerDigits]="5"
  [value]="12345"
/>`;

  const [value, setValue] = useState(12345);

  const demo = (
    <div className="flex items-end gap-2">
      <TkCurrencyInput label="Currency Input" hint="At most 5 integer digits" maxIntegerDigits={5} value={value} onTkChange={e => setValue(e.detail.value)} />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default MaxIntegerDigits;
