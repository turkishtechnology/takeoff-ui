import { TkPhoneInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Size = () => {
  const reactCode = `<TkPhoneInput
    label="Small Input"
    size="small"
    value={value}
    onTkChange={(e) => setValue(e.detail)}
  />
  <TkPhoneInput
    label="Base Input"
    size="base"
    value={value1}
    onTkChange={(e) => setValue1(e.detail)}
  />
  <TkPhoneInput
    label="Large Input"
    size="large"
    value={value2}
    onTkChange={(e) => setValue2(e.detail)}
  />`;

  const vueCode = `<TkPhoneInput
    label="Small Input"
    size="small"
    v-model="value"
  />
  <TkPhoneInput
    label="Base Input"
    size="base"
    v-model="value1"
  />
  <TkPhoneInput
    label="Large Input"
    size="large"
    v-model="value2"
  />`;

  const angularCode = `<tk-phone-input
    label="Small Input"
    size="small"
    [(ngModel)]="value"
  />
  <tk-phone-input
    label="Base Input"
    size="base"
    [(ngModel)]="value1"
  />
  <tk-phone-input
    label="Large Input"
    size="large"
    [(ngModel)]="value2"
  />`;

  const [value, setValue] = useState();
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();

  const demo = (
    <div className="flex flex-col flex-wrap items-start gap-3">
      <TkPhoneInput label="Small Input" size="small" value={value} onTkChange={e => setValue(e.detail)} />
      <TkPhoneInput label="Base Input" size="base" value={value1} onTkChange={e => setValue1(e.detail)} />
      <TkPhoneInput label="Large Input" size="large" value={value2} onTkChange={e => setValue2(e.detail)} />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Size;
