import { TkInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Chips = () => {
  const reactCode = `<TkInput
  label="Chips Mode"
  mode="chips"
  value={value}
  onTkChange={(e) => setValue(e.detail)}
/>`;

  const vueCode = `<TkInput
  label="Chips Mode"
  mode="chips"
  v-model="value" 
/>`;

  const [value, setValue] = useState();

  const demo = (
    <div className="flex items-end gap-2">
      <TkInput
        label="Chips Mode"
        mode="chips"
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

export default Chips;
