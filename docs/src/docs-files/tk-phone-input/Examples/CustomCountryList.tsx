import { TkPhoneInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const CustomCountryList = () => {
  const reactCode = `<TkPhoneInput 
    label="Phone Input"
    showAsterisk={true}
    countryList={countryList}
    defaultCountry='AZ'
    value={value}
    onTkChange={(e) => setValue(e.detail)}
    />`;

  const vueCode = `<TkPhoneInput 
    label="Phone Input"
    :showAsterisk="true"
    :countryList="countryList"
    defaultCountry="AZ"
    v-model="value"
   />`;

  const angularCode = `<tk-phone-input  
    label="Phone Input"
    [showAsterisk]="true"
    [countryList]="countryList"
    defaultCountry="AZ"
    [(ngModel)]="value"
  />`;

  const [value, setValue] = useState();

  const countryList = [
    { label: 'Azerbaijan', id: 'AZ', dialCode: '+994', mask: '99 999 99 99' },
    { label: 'Bolivia', id: 'BO', dialCode: '+591', mask: '99999999' },
    { label: 'Brazil', id: 'BR', dialCode: '+55', mask: '(99) 99999-9999' },
    { label: 'Japan', id: 'JP', dialCode: '+81', mask: '99-9999-9999' },
    { label: 'Portugal', id: 'PT', dialCode: '+351', mask: '999 999 999' },
    { label: 'Turkey', id: 'TR', dialCode: '+90', mask: '(999) 999 9999' },
  ];

  const demo = (
    <div className="flex items-end gap-2">
      <TkPhoneInput label="Phone Input" showAsterisk={true} countryList={countryList} defaultCountry="AZ" value={value} onTkChange={e => setValue(e.detail)} />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default CustomCountryList;
