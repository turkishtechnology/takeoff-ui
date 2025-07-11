import React, { useState } from 'react';
import {
  TkStepper,
  TkStep,
  TkButton,
  TkCard,
  TkInput,
} from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const ControlledStepper = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
  });
  const [reactCodeSample, setReactCodeSample] = useState('');
  const [vueCodeSample, setVueCodeSample] = useState('');

  const handleStepChange = (event) => {
    setActiveStep(event.detail);
  };

  const handleInputChange = (name: string, event: CustomEvent<any>) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: event.detail,
    }));
  };

  // ... existing code ...

  React.useEffect(() => {
    const newReactCodeSample = `const [activeStep, setActiveStep] = useState(0);
const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: ""
});

const handleStepChange = (event) => {
    setActiveStep(event.detail);
};

const handleInputChange = (name, event) => {
    setFormData(prevState => ({
        ...prevState,
        [name]: event.detail
    }));
};

<TkStepper
    active={activeStep}
    onTkStepChange={handleStepChange}
    controlled={true}
>
    <TkStep
        header="Personal Info"
        subheader="Name and contact details"
        complete={activeStep > 0}
        isActive={activeStep === 0}
    />
    <TkStep
        header="Address"
        subheader="Your address information"
        complete={activeStep > 1}
        isActive={activeStep === 1}
    />
    <TkStep
        header="Review"
        subheader="Review and submit"
        isActive={activeStep === 2}
    />
</TkStepper>

<div className="mt-6">
    {activeStep === 0 && (
        <TkCard>
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
            <div className="space-y-4">
                <div className="w-[250px]">
                    <TkInput
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onTkChange={(e) => handleInputChange("name", e)}
                        placeholder="Enter your name"
                    />
                </div>
                <div className="w-[250px]">
                    <TkInput
                        label="Email"
                        name="email"
                        value={formData.email}
                        onTkChange={(e) => handleInputChange("email", e)}
                        placeholder="Enter your email"
                    />
                </div>
                <div className="flex justify-end mt-4">
                    <TkButton
                        label="Next"
                        onClick={() => setActiveStep(1)}
                    />
                </div>
            </div>
        </TkCard>
    )}

    {activeStep === 1 && (
        <TkCard>
            <h3 className="text-lg font-medium mb-4">Address Information</h3>
            <div className="space-y-4">
                <div className="w-[250px]">
                    <TkInput
                        label="Address"
                        name="address"
                        value={formData.address}
                        onTkChange={(e) => handleInputChange("address", e)}
                        placeholder="Enter your address"
                    />
                </div>
                <div className="w-[250px]">
                    <TkInput
                        label="City"
                        name="city"
                        value={formData.city}
                        onTkChange={(e) => handleInputChange("city", e)}
                        placeholder="Enter your city"
                    />
                </div>
                <div className="flex justify-between mt-4">
                    <TkButton
                        label="Back"
                        onClick={() => setActiveStep(0)}
                    />
                    <TkButton
                        label="Next"
                        onClick={() => setActiveStep(2)}
                    />
                </div>
            </div>
        </TkCard>
    )}

    {activeStep === 2 && (
        <TkCard>
            <h3 className="text-lg font-medium mb-4">Review Information</h3>
            <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded">
                    <p><strong>Name:</strong> {formData.name || 'Not provided'}</p>
                    <p><strong>Email:</strong> {formData.email || 'Not provided'}</p>
                    <p><strong>Address:</strong> {formData.address || 'Not provided'}</p>
                    <p><strong>City:</strong> {formData.city || 'Not provided'}</p>
                </div>
                <div className="flex justify-between mt-4">
                    <TkButton
                        label="Back"
                        onClick={() => setActiveStep(1)}
                    />
                    <TkButton
                        label="Submit"
                        onClick={() => alert('Form submitted successfully!')}
                    />
                </div>
            </div>
        </TkCard>
    )}
</div>`;

    const newVueCodeSample = `<template>
  <tk-stepper
    :active="activeStep"
    @tk-step-change="handleStepChange"
    controlled="true"
  >
    <tk-step
      header="Personal Info"
      subheader="Name and contact details"
      :complete="activeStep > 0"
      :is-active="activeStep === 0"
    />
    <tk-step
      header="Address"
      subheader="Your address information"
      :complete="activeStep > 1"
      :is-active="activeStep === 1"
    />
    <tk-step
      header="Review"
      subheader="Review and submit"
      :is-active="activeStep === 2"
    />
  </tk-stepper>

  <div class="mt-6">
    <tk-card v-if="activeStep === 0">
      <h3 class="text-lg font-medium mb-4">Personal Information</h3>
      <div class="space-y-4">
        <div class="w-[250px]">
          <tk-input
            label="Full Name"
            name="name"
            :value="formData.name"
            @tk-change="(e) => handleInputChange('name', e)"
            placeholder="Enter your name"
          />
        </div>
        <div class="w-[250px]">
          <tk-input
            label="Email"
            name="email"
            :value="formData.email"
            @tk-change="(e) => handleInputChange('email', e)"
            placeholder="Enter your email"
          />
        </div>
        <div class="flex justify-end mt-4">
          <tk-button
            label="Next"
            @click="setActiveStep(1)"
          />
        </div>
      </div>
    </tk-card>

    <tk-card v-if="activeStep === 1">
      <h3 class="text-lg font-medium mb-4">Address Information</h3>
      <div class="space-y-4">
        <div class="w-[250px]">
          <tk-input
            label="Address"
            name="address"
            :value="formData.address"
            @tk-change="(e) => handleInputChange('address', e)"
            placeholder="Enter your address"
          />
        </div>
        <div class="w-[250px]">
          <tk-input
            label="City"
            name="city"
            :value="formData.city"
            @tk-change="(e) => handleInputChange('city', e)"
            placeholder="Enter your city"
          />
        </div>
        <div class="flex justify-between mt-4">
          <tk-button
            label="Back"
            @click="setActiveStep(0)"
          />
          <tk-button
            label="Next"
            @click="setActiveStep(2)"
          />
        </div>
      </div>
    </tk-card>

    <tk-card v-if="activeStep === 2">
      <h3 class="text-lg font-medium mb-4">Review Information</h3>
      <div class="space-y-4">
        <div class="bg-gray-100 p-4 rounded">
          <p><strong>Name:</strong> {{ formData.name || 'Not provided' }}</p>
          <p><strong>Email:</strong> {{ formData.email || 'Not provided' }}</p>
          <p><strong>Address:</strong> {{ formData.address || 'Not provided' }}</p>
          <p><strong>City:</strong> {{ formData.city || 'Not provided' }}</p>
        </div>
        <div class="flex justify-between mt-4">
          <tk-button
            label="Back"
            @click="setActiveStep(1)"
          />
          <tk-button
            label="Submit"
            @click="submitForm"
          />
        </div>
      </div>
    </tk-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeStep = ref(0);
const formData = ref({
  name: "",
  email: "",
  address: "",
  city: ""
});

const handleStepChange = (event) => {
  activeStep.value = event.detail;
};

const handleInputChange = (name, event) => {
  formData.value[name] = event.detail;
};

const setActiveStep = (step) => {
  activeStep.value = step;
};

const submitForm = () => {
  alert('Form submitted successfully!');
};
</script>`;

    setReactCodeSample(newReactCodeSample);
    setVueCodeSample(newVueCodeSample);
  }, [activeStep, formData]);

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <TkCard>
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div className="w-[250px]">
                <TkInput
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onTkChange={(e) => handleInputChange('name', e)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="w-[250px]">
                <TkInput
                  label="Email"
                  name="email"
                  value={formData.email}
                  onTkChange={(e) => handleInputChange('email', e)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex justify-end mt-4">
                <TkButton label="Next" onClick={() => setActiveStep(1)} />
              </div>
            </div>
          </TkCard>
        );
      case 1:
        return (
          <TkCard>
            <h3 className="text-lg font-medium mb-4">Address Information</h3>
            <div className="space-y-4">
              <div className="w-[250px]">
                <TkInput
                  label="Address"
                  name="address"
                  value={formData.address}
                  onTkChange={(e) => handleInputChange('address', e)}
                  placeholder="Enter your address"
                />
              </div>
              <div className="w-[250px]">
                <TkInput
                  label="City"
                  name="city"
                  value={formData.city}
                  onTkChange={(e) => handleInputChange('city', e)}
                  placeholder="Enter your city"
                />
              </div>
              <div className="flex justify-between mt-4">
                <TkButton label="Back" onClick={() => setActiveStep(0)} />
                <TkButton label="Next" onClick={() => setActiveStep(2)} />
              </div>
            </div>
          </TkCard>
        );
      case 2:
        return (
          <TkCard>
            <h3 className="text-lg font-medium mb-4">Review Information</h3>
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded">
                <p>
                  <strong>Name:</strong> {formData.name || 'Not provided'}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email || 'Not provided'}
                </p>
                <p>
                  <strong>Address:</strong> {formData.address || 'Not provided'}
                </p>
                <p>
                  <strong>City:</strong> {formData.city || 'Not provided'}
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <TkButton label="Back" onClick={() => setActiveStep(1)} />
                <TkButton
                  label="Submit"
                  onClick={() => alert('Form submitted successfully!')}
                />
              </div>
            </div>
          </TkCard>
        );
      default:
        return null;
    }
  };

  const demo = (
    <div className="space-y-6">
      <p className="text-sm mb-4">
        This example demonstrates a controlled stepper component used with a
        multi-step form. The active step is controlled by the parent component's
        state.
      </p>

      <TkStepper
        active={activeStep}
        onTkStepChange={handleStepChange}
        controlled={true}
      >
        <TkStep
          header="Personal Info"
          subheader="Name and contact details"
          complete={activeStep > 0}
          isActive={activeStep === 0}
        />
        <TkStep
          header="Address"
          subheader="Your address information"
          complete={activeStep > 1}
          isActive={activeStep === 1}
        />
        <TkStep
          header="Review"
          subheader="Review and submit"
          isActive={activeStep === 2}
        />
      </TkStepper>

      <div className="mt-6">{renderStepContent()}</div>
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

export default ControlledStepper;
