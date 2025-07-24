import { TkSelect } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Basic = () => {
  const reactCode = `<TkSelect
  label="Multiple Input"
  multiple
  options={[
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "other", label: "Other" },
  ]}
  hint="Hint text"
/>`;

  const vueCode = `<script setup>
import { TkSelect } from '@takeoff-ui/vue';
import { ref } from 'vue';

const selectValue = ref([{ value: 'female', label: 'Female' }]);
</script>
<template>
  <TkSelect
    label="Multiple Input"
    v-model="selectValue"
    :options.prop="[
      { value: 'female', label: 'Female' },
      { value: 'male', label: 'Male' },
      { value: 'other', label: 'Other' },
    ]"
    multiple
    hint="Hint text"
  />
</template>
`;

  const [value, setValue] = useState([
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
  ]);

  const demo = (
    <div className="max-w-[400px]">
      <TkSelect
        label="Multiple Select"
        options={[
          { value: 'female', label: 'Female' },
          { value: 'male', label: 'Male' },
          { value: 'other', label: 'Other' },
        ]}
        multiple
        hint="Hint text"
        value={value}
        onTkChange={e => setValue(e.detail)}
      />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default Basic;
