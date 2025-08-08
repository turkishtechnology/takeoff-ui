import { TkSelect } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Clearable = () => {
  const reactCode = `<TkSelect label="Clearable Select" options={options} value="Option 1" clearable />`;

  const vueCode = `<TkSelect label="Clearable Select" :options.prop="options" value="Option 1" clearable />`;

  const options = ['Option 1', 'Option 2', 'Option 3'];

  const [value, setValue] = useState('Option 1');

  const demo = (
    <div className="flex gap-2 w-[300px] max-w-[300px]">
      <TkSelect label="Clearable Select" options={options} value={value} onTkChange={e => setValue(e.detail)} clearable />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default Clearable;
