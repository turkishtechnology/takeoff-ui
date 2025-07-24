import { TkInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Size = () => {
  const reactCode = `<TkInput
  label="Small Input"
  size="small"
  value={value}
  onTkChange={(e) => setValue(e.detail)}
/>
<TkInput
  label="Base Input"
  size="base"
  value={value1}
  onTkChange={(e) => setValue1(e.detail)}
/>
<TkInput
  label="Large Input"
  size="large"
  value={value2}
  onTkChange={(e) => setValue2(e.detail)}
/>`;

  const vueCode = `<TkInput
  label="Small Input"
  size="small"
  v-model="value"
/>
<TkInput
  label="Base Input"
  size="base"
  v-model="value1"
/>
<TkInput
  label="Large Input"
  size="large"
  v-model="value2"
/>`;

  const [value, setValue] = useState();
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();

  const demo = (
    <div className="flex justify-center flex-wrap items-end gap-2">
      <TkInput label="Small Input" size="small" value={value} onTkChange={e => setValue(e.detail)} />
      <TkInput label="Base Input" size="base" value={value1} onTkChange={e => setValue1(e.detail)} />
      <TkInput label="Large Input" size="large" value={value2} onTkChange={e => setValue2(e.detail)} />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default Size;
