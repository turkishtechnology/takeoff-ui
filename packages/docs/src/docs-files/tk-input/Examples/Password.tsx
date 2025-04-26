import { TkInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Password = () => {
  const reactCode = `<TkInput 
    label="Password Input" 
    mode="password" 
    value={value}
    onTkChange={(e) => setValue(e.detail)} 
  />
  <TkInput
    label="Password Input With Status Bar"
    mode="password"
    showSafetyStatus
    value={value1}
    onTkChange={(e) => setValue1(e.detail)} 
  />`;

  const vueCode = `<TkInput 
    label="Password Input" 
    mode="password" 
    v-model="value" 
  />
  <TkInput
    label="Password Input With Status Bar"
    mode="password"
    showSafetyStatus
    v-model="value1"
  />`;

  const [value, setValue] = useState();
  const [value1, setValue1] = useState();

  const demo = (
    <div className="inline-flex flex-col gap-2 max-w-[250px]">
      <TkInput
        label="Password Input"
        mode="password"
        value={value}
        onTkChange={(e) => setValue(e.detail)}
      />
      <TkInput
        label="Password Input With Status Bar"
        mode="password"
        showSafetyStatus
        value={value1}
        onTkChange={(e) => setValue1(e.detail)}
      />
    </div>
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={''}
    ></FeatureDemo>
  );
};

export default Password;
