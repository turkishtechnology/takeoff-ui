import { TkInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Pre = () => {
  const reactCode = `<TkInput 
    label="Prefix Text"  
    value={value}
    pre="TK"
    onTkChange={(e) => setValue(e.detail)}
  />`;

  const vueCode = `<TkInput 
    label="Prefix Text" 
    v-model="value" 
    pre="TK"
  />`;

  const angularCode = `<tk-input 
    label="Prefix Text" 
    [(ngModel)]="value" 
    pre="TK"
  ></tk-input>`;

  const [value, setValue] = useState('');

  const demo = (
    <div className="flex gap-2 max-w-[300px]">
      <TkInput label="Prefix Text" value={value} pre="TK" onTkChange={e => setValue(e.detail)} />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Pre;
