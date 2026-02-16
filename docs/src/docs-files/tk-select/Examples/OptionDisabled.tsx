import { TkSelect } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const OptionDisabled = () => {
  const reactCode = `<TkSelect
    label="Disable Options"
    multiple
    selectAll
    editable
    clearable
  options={[
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "other", label: "Other" },
  ]}
  optionDisabled={option => {
    if (option.value === 'female' || option.value === 'male') return true;
  }}
  hint="Hint text"
/>`;

  const vueCode = `<script setup>
import { TkSelect } from '@takeoff-ui/vue';
import { ref } from 'vue';

const selectValue = ref([
  { value: 'female', label: 'Female' },
]);
const isOptionDisabled = option => {
  return option.value === 'female' || option.value === 'male';
};
</script>
<template>
  <TkSelect
    label="Disable Options"
    v-model="selectValue"
    :options="[
      { value: 'female', label: 'Female' },
      { value: 'male', label: 'Male' },
      { value: 'other', label: 'Other' },
    ]"
    multiple
    selectAll
    editable
    clearable
    hint="Hint text"
    :option-disabled="isOptionDisabled"
  />
</template>
`;

  const [value, setValue] = useState([{ value: 'female', label: 'Female' }]);
  const demo = (
    <div className="max-w-[400px]">
      <TkSelect
        label="Disable Options"
        options={[
          { value: 'female', label: 'Female' },
          { value: 'male', label: 'Male' },
          { value: 'other', label: 'Other' },
        ]}
        multiple
        selectAll
        editable
        clearable
        optionDisabled={option => {
          if (option.value === 'female' || option.value === 'male') return true;
        }}
        hint="Hint text"
        value={value}
        onTkChange={e => setValue(e.detail)}
      />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default OptionDisabled;
