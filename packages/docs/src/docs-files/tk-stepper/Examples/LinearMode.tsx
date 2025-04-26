import React, { useState } from 'react';
import { TkStepper, TkStep, TkCheckbox, TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const LinearMode = () => {
  const [linear, setLinear] = useState<boolean>(true);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [reactCodeSample, setReactCodeSample] = useState('');
  const [vueCodeSample, setVueCodeSample] = useState('');

  const handleLinearChange = () => {
    setLinear(!linear);
  };

  const handleStepChange = (event) => {
    setActiveStep(event.detail);
  };

  const goToNext = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    }
  };

  const goToPrevious = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  React.useEffect(() => {
    const newReactCodeSample = `const [activeStep, setActiveStep] = useState<number>(1);

const handleStepChange = (event) => {
    setActiveStep(event.detail);
};

const goToNext = () => {
    if (activeStep < 3) {
        setActiveStep(activeStep + 1);
    }
};

const goToPrevious = () => {
    if (activeStep > 0) {
        setActiveStep(activeStep - 1);
    }
};

<TkStepper
    linear={${linear}}
    active={activeStep}
    onTkStepChange={handleStepChange}
  >
    <TkStep header="General Information" subheader="Basic campaign details" complete={activeStep > 0} />
    <TkStep header="Category Details" subheader="Campaign categorization" isActive={activeStep === 1} complete={activeStep > 1} />
    <TkStep header="Communication" subheader="Communication strategies" isActive={activeStep === 2} complete={activeStep > 2} />
    <TkStep header="Summary" subheader="Campaign overview" isActive={activeStep === 3} />
  </TkStepper>

  <div className="flex gap-4 mt-4">
    <TkButton
      label="Previous"
      onClick={goToPrevious}
      disabled={activeStep === 0}
    />
    <TkButton
      label="Next"
      onClick={goToNext}
      disabled={activeStep === 3}
    />
  </div>
</div>`;

    const newVueCodeSample = `<template>
  <div class="space-y-6">
    <div class="mb-4">
      <tk-checkbox
        label="Linear Mode"
        :value="${linear}"
        @tk-change="handleLinearChange"
      />
      <p class="text-sm text-gray-500 mt-1">
        {{ ${linear}
          ? "In linear mode, steps must be completed in sequence"
          : "Non-linear mode allows jumping between steps" }}
      </p>
    </div>

    <tk-stepper
      :linear="${linear}"
      :active="activeStep"
      @tk-step-change="handleStepChange"
    >
      <tk-step header="General Information" subheader="Basic campaign details" :complete="activeStep > 0"/>
      <tk-step header="Category Details" subheader="Campaign categorization" :is-active="activeStep === 1" :complete="activeStep > 1" />
      <tk-step header="Communication" subheader="Communication strategies" :is-active="activeStep === 2" :complete="activeStep > 2" />
      <tk-step header="Summary" subheader="Campaign overview" :is-active="activeStep === 3" />
    </tk-stepper>

    <div class="flex gap-4 mt-4">
      <tk-button
        label="Previous"
        @click="goToPrevious"
        :disabled="activeStep === 0"
      />
      <tk-button
        label="Next"
        @click="goToNext"
        :disabled="activeStep === 3"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TkStepper, TkStep, TkCheckbox, TkButton } from '@takeoff-ui/vue';

const linear = ref(${linear});
const activeStep = ref(1);

const handleLinearChange = () => {
  linear.value = !linear.value;
};

const handleStepChange = (event) => {
  activeStep.value = event.detail;
};

const goToNext = () => {
  if (activeStep.value < 3) {
    activeStep.value++;
  }
};

const goToPrevious = () => {
  if (activeStep.value > 0) {
    activeStep.value--;
  }
};
</script>`;

    setReactCodeSample(newReactCodeSample);
    setVueCodeSample(newVueCodeSample);
  }, [linear, activeStep]);

  const demo = (
    <div className="space-y-6">
      <div className="mb-4">
        <TkCheckbox
          label="Linear Mode"
          value={linear}
          onTkChange={handleLinearChange}
        />
        <p className="text-sm text-gray-500 mt-1">
          {linear
            ? 'In linear mode, steps must be completed in sequence'
            : 'Non-linear mode allows jumping between steps'}
        </p>
      </div>

      <TkStepper
        linear={linear}
        active={activeStep}
        onTkStepChange={handleStepChange}
      >
        <TkStep
          header="General Information"
          subheader="Basic campaign details"
          complete={activeStep > 0}
        />
        <TkStep
          header="Category Details"
          subheader="Campaign categorization"
          isActive={activeStep === 1}
          complete={activeStep > 1}
        />
        <TkStep
          header="Communication"
          subheader="Communication strategies"
          isActive={activeStep === 2}
          complete={activeStep > 2}
        />
        <TkStep
          header="Summary"
          subheader="Campaign overview"
          isActive={activeStep === 3}
        />
      </TkStepper>

      <div className="flex gap-4 mt-4">
        <TkButton
          label="Previous"
          onClick={goToPrevious}
          disabled={activeStep === 0}
        />
        <TkButton label="Next" onClick={goToNext} disabled={activeStep === 3} />
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

export default LinearMode;
