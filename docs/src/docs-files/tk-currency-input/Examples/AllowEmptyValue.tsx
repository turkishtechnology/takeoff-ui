import { TkCurrencyInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const AllowEmptyValue = () => {
  const reactCode = `<TkCurrencyInput
  label="Amount"
  placeholder="Type and clear"
  allowEmptyValue
/>`;

  const vueCode = `<TkCurrencyInput
  label="Amount"
  placeholder="Type and clear"
  allowEmptyValue
/>`;

  const angularCode = `<tk-currency-input
  label="Amount"
  placeholder="Type and clear"
  [allow-empty-value]="true"
/>`;

  const [value, setValue] = useState<number | null>(null);
  const demo = (
    <div className="flex flex-col items-start gap-2">
      <TkCurrencyInput label="Amount" placeholder="Type and clear" allowEmptyValue value={value} onTkChange={e => setValue(e.detail.value)} />
      <span className="text-xs text-neutral-700">Current value: {value === null ? 'null' : value}</span>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default AllowEmptyValue;
