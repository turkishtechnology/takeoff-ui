import { TkPhoneInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Basic = () => {
  const reactCode = `<TkPhoneInput 
    label="Phone Input"
    hint="Hint text"
    placeholder="Placeholder text"
    value={value}
    onTkChange={(e) => setValue(e.detail)}
    />`;

  const vueCode = `<TkPhoneInput 
    label="Phone Input"
    hint="Hint text"
    placeholder="Placeholder text"
    v-model="value"
   />`;

  const angularCode = `<tk-phone-input  
    label="Phone Input"
    hint="Hint text"
    placeholder="Placeholder text"
    [(ngModel)]="value"
  />`;

  const [value, setValue] = useState();

  const demo = (
    <div className="flex items-end gap-2">
      <TkPhoneInput
        label="Phone Input"
        hint="Hint text"
        value={value}
        onTkChange={(e) => setValue(e.detail)}
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

export default Basic;
