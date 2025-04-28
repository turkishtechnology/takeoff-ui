import { TkInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Counter = () => {
  const reactCode = `<TkInput 
    label="Counter Input" 
    mode="counter" 
    value={value}
    onTkChange={(e) => setValue(e.detail)}  
  />`;

  const vueCode = `<TkInput label="Counter Input" mode="counter" v-model="value" />`;

  const [value, setValue] = useState(0);

  const demo = (
    <div className="flex gap-2 max-w-[300px]">
      <TkInput
        label="Counter Input"
        mode="counter"
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
      angularCode={''}
    ></FeatureDemo>
  );
};

export default Counter;
