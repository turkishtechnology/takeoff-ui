import { TkSelect } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const VisibleItemCount = () => {
  const reactCode = `<TkSelect
  label="Select with Visible Item Count"
  placeholder="Select multiple options"
  multiple
  visibleItemCount={3}
  options={[
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
    { value: "4", label: "Option 4" },
    { value: "5", label: "Option 5" },
    { value: "6", label: "Option 6" },
    { value: "7", label: "Option 7" },
    { value: "8", label: "Option 8" },
  ]}
  hint="Only 3 items will be visible before showing +N others"
/>`;

  const vueCode = `<script setup>
import { TkSelect } from '@takeoff-ui/vue';
import { ref } from 'vue';

const selectValue = ref([]);
</script>
<template>
  <TkSelect
    label="Select with Visible Item Count"
    placeholder="Select multiple options"
    v-model="selectValue"
    :options.prop="[
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
      { value: '4', label: 'Option 4' },
      { value: '5', label: 'Option 5' },
      { value: '6', label: 'Option 6' },
      { value: '7', label: 'Option 7' },
      { value: '8', label: 'Option 8' },
    ]"
    multiple
    :visible-item-count="3"
    hint="Only 3 items will be visible before showing +N others"
  />
</template>
`;

  const [value, setValue] = useState([
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ]);

  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' },
    { value: '8', label: 'Option 8' },
  ];

  const demo = (
    <div>
      <TkSelect
        label="Select with Visible Item Count"
        placeholder="Select multiple options"
        multiple
        visibleItemCount={3}
        options={options}
        value={value}
        onTkChange={e => setValue(e.detail.value)}
        hint="Only 3 items will be visible before showing +N others"
      />
    </div>
  );

  const angularCode = `import { Component } from '@angular/core';

@Component({
  selector: 'app-visible-item-count',
  template: \`
    <tk-select
      label="Select with Visible Item Count"
      placeholder="Select multiple options"
      [multiple]="true"
      [visibleItemCount]="3"
      [options]="options"
      [(ngModel)]="value"
      hint="Only 3 items will be visible before showing +N others">
    </tk-select>
  \`
})
export class VisibleItemCountComponent {
  value = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ];
  
  options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' },
    { value: '8', label: 'Option 8' }
  ];
}`;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default VisibleItemCount;
