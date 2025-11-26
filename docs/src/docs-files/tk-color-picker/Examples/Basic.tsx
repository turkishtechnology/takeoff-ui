import React, { useState } from 'react';
import { TkColorPicker } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Basic = () => {
  const [color, setColor] = useState('#326FD1');

  const demo = (
    <div className="flex justify-center items-center">
      <TkColorPicker label="Select Color" showAsterisk value={color} onTkChange={e => setColor(e.detail)} />
    </div>
  );

  const reactCode = `const [color, setColor] = useState('#326FD1');

<TkColorPicker
  label="Select Color"
  showAsterisk
  value={color}
  onTkChange={(e) => setColor(e.detail)}
/>`;

  const vueCode = `<script setup>
import { TkColorPicker } from '@takeoff-ui/vue';
import { ref } from 'vue';

const color = ref('#326FD1');
</script>

<template>
  <TkColorPicker
    label="Select Color"
    showAsterisk
    v-model="color"
  />
</template>`;

  const angularCode = `<tk-color-picker
  label="Select Color"
  showAsterisk
  [value]="color"
  (tkChange)="onColorChange($event)">
</tk-color-picker>`;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode} />;
};

export default Basic;
