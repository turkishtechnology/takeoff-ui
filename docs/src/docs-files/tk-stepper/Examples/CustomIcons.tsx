import React, { useState } from 'react';
import { TkStepper, TkStep, TkRadio, TkRadioGroup } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const CustomIcons = () => {
  const [completeIcon, setCompleteIcon] = useState<string>('check');
  const [active, setActive] = useState<number>(1);
  const [reactCodeSample, setReactCodeSample] = useState('');
  const [vueCodeSample, setVueCodeSample] = useState('');

  const completeIcons = [
    { label: 'Check', value: 'check' },
    { label: 'Done All', value: 'done_all' },
    { label: 'Verified', value: 'verified' },
    { label: 'Star', value: 'star' },
  ];

  const handleCompleteIconChange = (event) => {
    setCompleteIcon(event.detail);
  };

  const handleStepChange = (event) => {
    setActive(event.detail);
  };

  React.useEffect(() => {
    const newReactCodeSample = `<TkStepper completeIcon="${completeIcon}" active={1} onTkStepChange={handleStepChange}>
    <TkStep header="Step 1" subheader="Step Description" complete={activeStep > 0} />
    <TkStep header="Step 2" subheader="Step Description" isActive={activeStep === 1} complete={activeStep > 1} />
    <TkStep header="Step 3" subheader="Step Description" isActive={activeStep === 2} complete={activeStep > 2} />
    <TkStep header="Step 4" subheader="Step Description" isActive={activeStep === 3} activeIcon={{
        name: "apps",
        style: "rounded",
        fill: true,
        color: "#FFFFFF"
    }} />
</TkStepper>`;

    const newVueCodeSample = `<template>
  <tk-stepper 
    :complete-icon="completeIcon" 
    :active="active" 
    @tk-step-change="handleStepChange"
  >
    <tk-step header="Step 1" subheader="Step Description" :complete="active > 0" />
    <tk-step header="Step 2" subheader=Step Description" :is-active="active === 1" complete="active > 1" />
    <tk-step header="Step 3" subheader="Step Description" :is-active="active === 2" complete="active > 2" />
    <tk-step header="Step 4" subheader="Step Description" :is-active="active === 3" :activeIcon.prop="{
        name: "apps",
        style: "rounded",
        fill: true,
        color: "#FFFFFF"
    }" />
  </tk-stepper>
</template>

<script setup>
import { ref } from 'vue';

const completeIcon = ref('${completeIcon}');
const active = ref(1);

const handleStepChange = (event) => {
  active.value = event.detail;
};
</script>`;

    setReactCodeSample(newReactCodeSample);
    setVueCodeSample(newVueCodeSample);
  }, [completeIcon]);

  const customActiveIconConfig: any = {
    name: 'apps',
    style: 'rounded',
    fill: true,
    color: '#FFFFFF',
  };

  const demo = (
    <div className="space-y-6">
      <TkRadioGroup
        label="Complete Icon"
        value={completeIcon}
        onTkChange={handleCompleteIconChange}
      >
        {completeIcons.map((icon, index) => (
          <TkRadio key={index} label={icon.label} value={icon.value} />
        ))}
      </TkRadioGroup>

      <TkStepper
        active={active}
        onTkStepChange={handleStepChange}
        completeIcon={completeIcon}
      >
        <TkStep
          header="Step 1"
          subheader="Step Description"
          complete={active > 0}
        />
        <TkStep
          header="Step 2"
          subheader="Step Description"
          isActive={active === 1}
          complete={active > 1}
        />
        <TkStep
          header="Step 3"
          subheader="Step Description"
          isActive={active === 2}
          complete={active > 2}
        />
        <TkStep
          header="Step 4"
          subheader="Step Description"
          activeIcon={customActiveIconConfig}
          isActive={active === 3}
        />
      </TkStepper>

      <div className="bg-gray-100 p-4 rounded mt-4">
        <h3 className="text-lg font-medium mb-2">Icon Configuration</h3>
        <p className="text-sm">
          The stepper component accepts both simple string icons and complex
          icon configuration objects. For advanced customization, you can use:
        </p>
        <pre className="bg-gray-800 text-white p-3 rounded mt-2 text-sm overflow-auto">
          {`icon={{
  name: "apps",
  style: "rounded",
  fill: true,
  color: "#00796B"
}}`}
        </pre>
      </div>
    </div>
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCodeSample}
      vueCode={vueCodeSample}
      angularCode={''}
    />
  );
};

export default CustomIcons;
