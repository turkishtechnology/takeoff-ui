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
    @tk-clear-click="() => value = null"
  />`;

  const [value, setValue] = useState('Clearable Text');

  const demo = <TkInput className="max-w-[300px]" label="Clearable Input" clearable value={value} onTkChange={e => setValue(e.detail)} onTkClearClick={() => setValue(null)} />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default Clearable;
