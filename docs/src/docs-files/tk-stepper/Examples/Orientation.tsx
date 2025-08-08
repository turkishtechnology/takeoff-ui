import React, { useState } from 'react';
import { TkStepper, TkStep, TkRadio, TkRadioGroup } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Orientation = () => {
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('vertical');
  const orientations = [
    { label: 'Vertical', value: 'vertical' },
    { label: 'Horizontal', value: 'horizontal' },
  ];
  const [reactCodeSample, setReactCodeSample] = useState('');
  const [vueCodeSample, setVueCodeSample] = useState('');

  const handleOrientationChange = event => {
    setOrientation(event.detail);
  };

  React.useEffect(() => {
    const newReactCodeSample = `<TkStepper orientation="${orientation}">
  <TkStep header="General Information" subheader="Basic campaign details" complete />
  <TkStep header="Category Details" subheader="Campaign categorization" complete />
  <TkStep header="Communication" subheader="Communication strategies" isActive />
  <TkStep header="Summary" subheader="Campaign overview" />
</TkStepper>`;

    const newVueCodeSample = `<template>
  <tk-stepper orientation="${orientation}">
    <tk-step header="General Information" subheader="Basic campaign details" complete />
    <tk-step header="Category Details" subheader="Campaign categorization" complete />
    <tk-step header="Communication" subheader="Communication strategies" :is-active="true" />
    <tk-step header="Summary" subheader="Campaign overview" />
  </tk-stepper>
</template>

<script setup>
import { ref } from 'vue';

const orientation = ref('${orientation}');

const handleOrientationChange = (event) => {
  orientation.value = event.detail;
};
</script>`;

    setReactCodeSample(newReactCodeSample);
    setVueCodeSample(newVueCodeSample);
  }, [orientation]);

  const demo = (
    <div className="space-y-6">
      <div style={{ overflow: 'overlay' }} className="mb-4">
        <TkRadioGroup value={orientation} onTkChange={handleOrientationChange}>
          {orientations.map((radio, index) => {
            return <TkRadio label={radio.label} key={index} value={radio.value} />;
          })}
        </TkRadioGroup>
      </div>

      <TkStepper orientation={orientation}>
        <TkStep header="General Information" subheader="Basic campaign details" complete />
        <TkStep header="Category Details" subheader="Campaign categorization" complete />
        <TkStep header="Communication" subheader="Communication strategies" isActive />
        <TkStep header="Summary" subheader="Campaign overview" />
      </TkStepper>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCodeSample} vueCode={vueCodeSample} angularCode={''} />;
};

export default Orientation;
