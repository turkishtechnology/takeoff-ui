import { TkInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Clearable = () => {
  const reactCode = `<TkInput 
    label="Clearable Input" 
    clearable 
    value={value}
    onTkChange={(e) => setValue(e.detail)}
    onTkClearClick={() => setValue(null)}
  />`;

  const vueCode = `<TkInput 
    label="Clearable Input" 
    clearable 
    v-model="value" 
    @tkClearClick="() => value = null"
  />`;

  const [value, setValue] = useState('Clearable Text');

  const demo = (
    <div className="flex gap-2 max-w-[300px]">
      <TkInput
        label="Clearable Input"
        clearable
        value={value}
        onTkChange={(e) => setValue(e.detail)}
        onTkClearClick={() => setValue(null)}
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

export default Clearable;
