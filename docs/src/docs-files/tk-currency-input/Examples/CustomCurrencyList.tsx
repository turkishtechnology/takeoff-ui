import { TkCurrencyInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const CustomCountryList = () => {
  const reactCode = `<TkCurrencyInput 
    label="Currency Input"
    showAsterisk={true}
    currencyList={currencyList}
    defaultCurrency="GBP"
    value={value}
    onTkChange={(e) => setValue(e.detail)}
    />`;

  const vueCode = `<TkCurrencyInput 
    label="Currency Input"
    :showAsterisk="true"
    :currencyList="currencyList"
    defaultCurrency="GBP"
    v-model="value"
   />`;

  const angularCode = `<tk-currency-input
    label="Currency Input"
    [showAsterisk]="true"
    [currencyList]="currencyList"
    defaultCurrency="GBP"
    [(ngModel)]="value"
  />`;

  const [value, setValue] = useState({
    value: 0,
    formattedValue: '',
    currency: {},
  });

  const currencyList = [
    {
      code: 'GBP',
      id: 'GB',
      symbol: '£',
      name: 'British Pound',
      decimalSeparator: '.' as const,
      thousandsSeparator: ',' as const,
    },
    {
      code: 'TRY',
      id: 'TR',
      symbol: '₺',
      name: 'Turkish Lira',
      decimalSeparator: ',' as const,
      thousandsSeparator: '.' as const,
    },
    {
      code: 'JPY',
      id: 'JP',
      symbol: '¥',
      name: 'Japanese Yen',
      decimalSeparator: '.' as const,
      thousandsSeparator: ',' as const,
    },
  ];

  const demo = (
    <div className="flex items-end gap-2">
      <TkCurrencyInput label="Currency Input" showAsterisk={true} defaultCurrency="GBP" currencyList={currencyList} onTkChange={e => setValue(e.detail)} />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default CustomCountryList;
