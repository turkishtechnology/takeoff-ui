import { TkSelect } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const SelectAll = () => {
  const reactCode = `  const handleSelectAll = e => {
    const selected = e.detail;
    setSelectAll(selected);
  };

<TkSelect
  label="Select All"
  options={[
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "other", label: "Other" },
  ]}
  selectAllLabel="Select All"
  multiple
  selectAll={true}
  onTkSelectAll={handleSelectAll}
/>
 <div>Selected All: { selectAll ? 'true' : 'false' }</div>`;

  const vueCode = `<script setup>
import { TkSelect } from '@takeoff-ui/vue';
import { ref } from 'vue';

const selectAll = ref(false);
const handleSelectAll = e => {
  selectAll.value = e.detail;
};
</script>

<template>
 <TkSelect
  label="Select All"
  :options="[
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
    { value: 'other', label: 'Other' },
  ]"
  selectAllLabel="Select All"
  :selectAll="true"
  multiple
  @tk-select-all="handleSelectAll"
/>

 <div>Selected All: {{ selectAll ? 'true' : 'false' }}</div>
</template>
`;
  const [selectAll, setSelectAll] = useState(false);
  const [value, setValue] = useState([]);
  const options = [
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
    { value: 'other', label: 'Other' },
  ];
  const handleTkChange = e => {
    const selected = e.detail;
    setValue(selected);
  };
  const handleSelectAll = e => {
    const selected = e.detail;
    setSelectAll(selected);
  };

  const demo = (
    <div className="max-w-[215px]">
      <TkSelect
        label="Select All"
        selectAllLabel="Select All"
        options={options}
        multiple
        hint="Hint text"
        placeholder="Placeholder text"
        value={value}
        selectAll={true}
        onTkChange={handleTkChange}
        onTkSelectAll={handleSelectAll}
      />
      Select All Event: {selectAll ? 'true' : 'false'}
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default SelectAll;
