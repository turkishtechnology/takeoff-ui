import { TkInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Basic = () => {
  const reactCode = `<TkInput
  label="Text Input"
  mode="text"
  hint="Hint text"
  placeholder="Placeholder text"
  value={value}
  onTkChange={(e) => setValue(e.detail)}
/>`;

  const vueCode = `<TkInput
  label="Text Input"
  mode="text"
  hint="Hint text"
  placeholder="Placeholder text"
/>`;

  const [value, setValue] = useState();

  const demo = (
    <div className="flex items-end gap-2">
      <TkInput
        label="Text Input"
        mode="text"
        hint="Hint text"
        placeholder="Placeholder text"
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

export default Basic;
