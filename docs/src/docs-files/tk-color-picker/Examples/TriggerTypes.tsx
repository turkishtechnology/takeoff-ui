import React, { useState, useEffect } from 'react';
import { TkColorPicker, TkRadio, TkRadioGroup } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const TriggerTypes = () => {
  const [color, setColor] = useState('#C90019');
  const [triggerType, setTriggerType] = useState<'input' | 'input-compact' | 'item'>('input');
  const [codeSampleReact, setCodeSampleReact] = useState('');
  const [codeSampleVue, setCodeSampleVue] = useState('');
  const [codeSampleAngular, setCodeSampleAngular] = useState('');

  const triggerTypes = [
    { label: 'Input', value: 'input' },
    { label: 'Input Compact', value: 'input-compact' },
    { label: 'Item', value: 'item' },
  ];

  const handleTriggerTypeChange = (event: CustomEvent) => {
    setTriggerType(event.detail);
  };

  useEffect(() => {
    const labelProp = triggerType === 'input' ? '\n  label="Color"' : '';

    const reactCode = `const [color, setColor] = useState('#C90019');

<TkColorPicker${labelProp}
  triggerType="${triggerType}"
  value={color}
  onTkChange={(e) => setColor(e.detail)}
/>`;

    const vueCode = `<script setup>
import { TkColorPicker } from '@takeoff-ui/vue';
import { ref } from 'vue';

const color = ref('#C90019');
</script>

<template>
  <TkColorPicker${labelProp}
    triggerType="${triggerType}"
    v-model="color"
  />
</template>`;

    const angularCode = `<tk-color-picker${labelProp}
  triggerType="${triggerType}"
  [value]="color"
  (tkChange)="onColorChange($event)">
</tk-color-picker>`;

    setCodeSampleReact(reactCode);
    setCodeSampleVue(vueCode);
    setCodeSampleAngular(angularCode);
  }, [triggerType]);

  const demo = (
    <div className="flex flex-col gap-4">
      <TkRadioGroup label="Trigger Type" value={triggerType} onTkChange={handleTriggerTypeChange}>
        {triggerTypes.map((radio, index) => (
          <TkRadio label={radio.label} key={index} value={radio.value} />
        ))}
      </TkRadioGroup>
      <div className="flex justify-center items-center min-h-[80px]">
        <TkColorPicker label={triggerType === 'input' ? 'Color' : undefined} triggerType={triggerType} value={color} onTkChange={e => setColor(e.detail)} />
      </div>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={codeSampleReact} vueCode={codeSampleVue} angularCode={codeSampleAngular} />;
};

export default TriggerTypes;
