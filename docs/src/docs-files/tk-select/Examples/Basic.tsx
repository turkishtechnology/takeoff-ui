import { TkSelect } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Basic = () => {
  const reactCode = `<TkSelect
  label="Text Input"
  options={[
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "other", label: "Other" },
  ]}
  hint="Hint text"
  placeholder="Placeholder text"
/>`;

  const vueCode = `<TkSelect
  label="Text Input"
  :options.prop="[
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
    { value: 'other', label: 'Other' },
  ]"
  hint="Hint text"
  placeholder="Placeholder text"
/>`;

  const [value, setValue] = useState();

  const demo = (
    <div className="max-w-[215px]">
      <TkSelect
        label="Basic Select"
        options={[
          { value: 'female', label: 'Female' },
          { value: 'male', label: 'Male' },
          { value: 'other', label: 'Other' },
        ]}
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
