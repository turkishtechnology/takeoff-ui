import { TkPhoneInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const State = () => {
  const reactCode = `<TkPhoneInput
    label="Error"
    placeholder="Error"
    invalid={true}
    error="This field is required"
  />
  <TkPhoneInput
    label="Readonly"
    placeholder="Readonly"
    readonly
  />
  <TkPhoneInput
    label="Disabled"
    placeholder="Disabled"
    disabled
  />`;

  const vueCode = `<TkPhoneInput
    label="Error"
    placeholder="Error"
    :invalid="true"
    error="This field is required"
  />
  <TkPhoneInput 
    label="Readonly" 
    placeholder="Readonly" 
    readonly 
  />
  <TkPhoneInput 
    label="Disabled" 
    placeholder="Disabled" 
    disabled 
  />`;

  const angularCode = `<tk-phone-input
    label="Error"
    placeholder="Error"
    [invalid]="true"
    error="This field is required"
  />
  <tk-phone-input
    label="Readonly"
    placeholder="Readonly"
    readonly
  />
  <tk-phone-input
    label="Disabled"
    placeholder="Disabled"
    disabled
  />`;

  const demo = (
    <div className="flex flex-col flex-wrap items-start gap-3">
      <TkPhoneInput label="Error" placeholder="Error" invalid={true} error="This field is required" />
      <TkPhoneInput label="Readonly" placeholder="Readonly" readonly />
      <TkPhoneInput label="Disabled" placeholder="Disabled" disabled />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default State;
