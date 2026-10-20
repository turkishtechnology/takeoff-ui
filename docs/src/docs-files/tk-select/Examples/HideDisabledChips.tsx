import { TkSelect } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const options = [
  { value: 'ist', label: 'Istanbul' },
  { value: 'ank', label: 'Ankara' },
  { value: 'izm', label: 'Izmir' },
  { value: 'ant', label: 'Antalya' },
];

const HideDisabledChips = () => {
  const reactCode = `const [value, setValue] = useState(['ist', 'izm']);

<TkSelect
  label="Destinations"
  multiple
  clearable
  hideDisabledChips
  optionValueKey="value"
  options={[
    { value: 'ist', label: 'Istanbul' },
    { value: 'ank', label: 'Ankara' },
    { value: 'izm', label: 'Izmir' },
    { value: 'ant', label: 'Antalya' },
  ]}
  optionDisabled={option => option.value === 'ist'}
  value={value}
  onTkChange={e => setValue(e.detail)}
/>`;

  const vueCode = `<script setup>
import { TkSelect } from '@takeoff-ui/vue';
import { ref } from 'vue';

const selectValue = ref(['ist', 'izm']);
const isOptionDisabled = option => option.value === 'ist';
</script>
<template>
  <TkSelect
    label="Destinations"
    v-model="selectValue"
    :options="[
      { value: 'ist', label: 'Istanbul' },
      { value: 'ank', label: 'Ankara' },
      { value: 'izm', label: 'Izmir' },
      { value: 'ant', label: 'Antalya' },
    ]"
    multiple
    clearable
    hide-disabled-chips
    option-value-key="value"
    :option-disabled="isOptionDisabled"
  />
</template>
`;

  const [value, setValue] = useState(['ist', 'izm']);
  const demo = (
    <div className="max-w-[400px]">
      <TkSelect
        label="Destinations"
        options={options}
        multiple
        clearable
        hideDisabledChips
        optionValueKey="value"
        optionDisabled={option => option.value === 'ist'}
        hint={`Value: ${JSON.stringify(value)}`}
        value={value}
        onTkChange={e => setValue(e.detail)}
      />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default HideDisabledChips;
