import React, { useState } from 'react';
import { TkColorPicker } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const CustomPresets = () => {
  const [color, setColor] = useState('#E63946');

  const customPresets = [
    '#E63946',
    '#F1FAEE',
    '#A8DADC',
    '#457B9D',
    '#1D3557',
    '#F4A261',
    '#2A9D8F',
    '#E9C46A',
    '#264653',
    '#E76F51',
  ];

  const demo = (
    <div className="flex justify-center items-center">
      <TkColorPicker
        label="Brand Colors"
        presets={customPresets}
        value={color}
        inline
        onTkChange={e => setColor(e.detail)}
      />
    </div>
  );

  const reactCode = `const [color, setColor] = useState('#E63946');

const customPresets = [
  '#E63946', '#F1FAEE', '#A8DADC', '#457B9D', '#1D3557',
  '#F4A261', '#2A9D8F', '#E9C46A', '#264653', '#E76F51'
];

<TkColorPicker
  label="Brand Colors"
  presets={customPresets}
  value={color}
  inline
  onTkChange={(e) => setColor(e.detail)}
/>`;

  const vueCode = `<script setup>
import { TkColorPicker } from '@takeoff-ui/vue';
import { ref } from 'vue';

const color = ref('#E63946');

const customPresets = [
  '#E63946', '#F1FAEE', '#A8DADC', '#457B9D', '#1D3557',
  '#F4A261', '#2A9D8F', '#E9C46A', '#264653', '#E76F51'
];
</script>

<template>
  <TkColorPicker
    label="Brand Colors"
    :presets="customPresets"
    inline
    v-model="color"
  />
</template>`;

  const angularCode = `// component.ts
customPresets = [
  '#E63946', '#F1FAEE', '#A8DADC', '#457B9D', '#1D3557',
  '#F4A261', '#2A9D8F', '#E9C46A', '#264653', '#E76F51'
];

// component.html
<tk-color-picker
  label="Brand Colors"
  [presets]="customPresets"
  [value]="color"
  inline
  (tkChange)="onColorChange($event)">
</tk-color-picker>`;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode} />;
};

export default CustomPresets;
