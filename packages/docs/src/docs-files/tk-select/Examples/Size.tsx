import { TkSelect } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Size = () => {
  const reactCode = `<TkSelect
  label="Text Input"
  options={[
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "other", label: "Other" },
  ]}
  hint="Hint text"
  placeholder="Placeholder text"
  size="small"
  value={value}
  onTkChange={(e) => setValue(e.detail)}
/>
<TkSelect
  label="Text Input"
  options={[
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "other", label: "Other" },
  ]}
  hint="Hint text"
  placeholder="Placeholder text"
  size="base"
  value={value1}
  onTkChange={(e) => setValue1(e.detail)}
/>
<TkSelect
  label="Text Input"
  options={[
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "other", label: "Other" },
  ]}
  hint="Hint text"
  placeholder="Placeholder text"
  size="large"
  value={value2}
  onTkChange={(e) => setValue2(e.detail)}
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
  size="small"
  v-model="value"
/>
<TkSelect
  label="Text Input"
  :options.prop="[
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
    { value: 'other', label: 'Other' },
  ]"
  hint="Hint text"
  placeholder="Placeholder text"
  size="base"
  v-model="value1"
/>
<TkSelect
  label="Text Input"
  :options.prop="[
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
    { value: 'other', label: 'Other' },
  ]"
  hint="Hint text"
  placeholder="Placeholder text"
  size="large"
  v-model="value2"
/>`;

  const [value, setValue] = useState();
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();

  const demo = (
    <div className="flex justify-center items-end gap-2 flex-wrap">
      <TkSelect
        label="Small Select"
        options={[
          { value: 'female', label: 'Female' },
          { value: 'male', label: 'Male' },
          { value: 'other', label: 'Other' },
        ]}
        hint="Hint text"
        placeholder="Placeholder text"
        size="small"
        value={value}
        onTkChange={(e) => setValue(e.detail)}
      />
      <TkSelect
        label="Base Select"
        options={[
          { value: 'female', label: 'Female' },
          { value: 'male', label: 'Male' },
          { value: 'other', label: 'Other' },
        ]}
        hint="Hint text"
        placeholder="Placeholder text"
        size="base"
        value={value1}
        onTkChange={(e) => setValue1(e.detail)}
      />
      <TkSelect
        label="Large Select"
        options={[
          { value: 'female', label: 'Female' },
          { value: 'male', label: 'Male' },
          { value: 'other', label: 'Other' },
        ]}
        hint="Hint text"
        placeholder="Placeholder text"
        size="large"
        value={value2}
        onTkChange={(e) => setValue2(e.detail)}
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

export default Size;
