import React, { useState, useEffect } from 'react';
import { TkColorPicker, TkRadio, TkRadioGroup } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Orientation = () => {
  const [color, setColor] = useState('#C79807');
  const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('vertical');
  const [codeSampleReact, setCodeSampleReact] = useState('');
  const [codeSampleVue, setCodeSampleVue] = useState('');
  const [codeSampleAngular, setCodeSampleAngular] = useState('');

  const orientations = [
    { label: 'Vertical', value: 'vertical' },
    { label: 'Horizontal', value: 'horizontal' },
  ];

  const handleOrientationChange = (event: CustomEvent) => {
    setOrientation(event.detail);
  };

  useEffect(() => {
    const reactCode = `const [color, setColor] = useState('#C79807');

<TkColorPicker
  inline
  orientation="${orientation}"
  value={color}
  panelTitle="${orientation.charAt(0).toUpperCase() + orientation.slice(1)} Layout"
  onTkInput={(e) => setColor(e.detail)}
/>`;

    const vueCode = `<script setup>
import { TkColorPicker } from '@takeoff-ui/vue';
import { ref } from 'vue';

const color = ref('#C79807');
</script>

<template>
  <TkColorPicker
    inline
    orientation="${orientation}"
    v-model="color"
    panelTitle="${orientation.charAt(0).toUpperCase() + orientation.slice(1)} Layout"
  />
</template>`;

    const angularCode = `<tk-color-picker
  inline
  orientation="${orientation}"
  [value]="color"
  panelTitle="${orientation.charAt(0).toUpperCase() + orientation.slice(1)} Layout"
  (tkInput)="onColorInput($event)">
</tk-color-picker>`;

    setCodeSampleReact(reactCode);
    setCodeSampleVue(vueCode);
    setCodeSampleAngular(angularCode);
  }, [orientation]);

  const demo = (
    <div className="flex flex-col gap-4">
      <TkRadioGroup label="Orientation" value={orientation} onTkChange={handleOrientationChange}>
        {orientations.map((radio, index) => (
          <TkRadio label={radio.label} key={index} value={radio.value} />
        ))}
      </TkRadioGroup>
      <div className="flex justify-center">
        <TkColorPicker
          inline
          orientation={orientation}
          value={color}
          panelTitle={`${orientation.charAt(0).toUpperCase() + orientation.slice(1)} Layout`}
          onTkInput={e => setColor(e.detail)}
        />
      </div>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={codeSampleReact} vueCode={codeSampleVue} angularCode={codeSampleAngular} />;
};

export default Orientation;
