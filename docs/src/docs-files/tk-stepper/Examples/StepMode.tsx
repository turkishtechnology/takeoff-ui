import React, { useState } from 'react';
import { TkStepper, TkStep, TkRadio, TkRadioGroup } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const StepMode = () => {
  const [stepMode, setStepMode] = useState<'basic' | 'number'>('basic');
  const [reactCodeSample, setReactCodeSample] = useState('');
  const [vueCodeSample, setVueCodeSample] = useState('');

  const handleStepModeChange = event => {
    setStepMode(event.detail);
  };

  React.useEffect(() => {
    const newReactCodeSample = `<TkStepper stepMode="${stepMode}">
  <TkStep header="General Information" subheader="Basic campaign details" complete />
  <TkStep header="Category Details" subheader="Campaign categorization" complete />
  <TkStep header="Communication" subheader="Communication strategies" isActive />
  <TkStep header="Summary" subheader="Campaign overview" />
</TkStepper>`;

    const newVueCodeSample = `<template>
  <tk-stepper step-mode="${stepMode}">
    <tk-step header="General Information" subheader="Basic campaign details" complete />
    <tk-step header="Category Details" subheader="Campaign categorization" complete />
    <tk-step header="Communication" subheader="Communication strategies" :is-active="true" />
    <tk-step header="Summary" subheader="Campaign overview" />
  </tk-stepper>
</template>

<script setup>
import { ref } from 'vue';

const stepMode = ref('${stepMode}');

const handleStepModeChange = (event) => {
  stepMode.value = event.detail;
};
</script>`;

    setReactCodeSample(newReactCodeSample);
    setVueCodeSample(newVueCodeSample);
  }, [stepMode]);

  const demo = (
    <div className="space-y-6">
      <TkRadioGroup label="Step Mode" value={stepMode} onTkChange={handleStepModeChange} className="mb-4">
        <TkRadio label="Basic" value="basic" />
        <TkRadio label="Number" value="number" />
      </TkRadioGroup>

      <TkStepper stepMode={stepMode}>
        <TkStep header="General Information" subheader="Basic campaign details" complete />
        <TkStep header="Category Details" subheader="Campaign categorization" complete />
        <TkStep header="Communication" subheader="Communication strategies" isActive />
        <TkStep header="Summary" subheader="Campaign overview" />
      </TkStepper>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCodeSample} vueCode={vueCodeSample} angularCode={''} />;
};

export default StepMode;
