import React, { useState } from 'react';
import { TkColorPicker } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Inline = () => {
  const [color, setColor] = useState('#119C8D');

  const demo = (
    <div className="flex justify-center items-center">
      <TkColorPicker
        inline
        value={color}
        panelTitle="Theme Color"
        onTkInput={e => setColor(e.detail)}
      />
    </div>
  );

  const reactCode = `const [color, setColor] = useState('#119C8D');

<TkColorPicker
  inline
  value={color}
  panelTitle="Theme Color"
  onTkInput={(e) => setColor(e.detail)}
/>`;

  const vueCode = `<script setup>
import { TkColorPicker } from '@takeoff-ui/vue';
import { ref } from 'vue';

const color = ref('#119C8D');
</script>

<template>
  <TkColorPicker
    inline
    v-model="color"
    panelTitle="Theme Color"
  />
</template>`;

  const angularCode = `<tk-color-picker
  inline
  [value]="color"
  panelTitle="Theme Color"
  (tkInput)="onColorInput($event)">
</tk-color-picker>`;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode} />;
};

export default Inline;


