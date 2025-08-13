<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Stepper Component Demo</h2>
      </template>
      
      <div class="space-y-8">
        <!-- Basic Stepper -->
        <div>
          <h3 class="text-lg font-medium mb-4">Basic Stepper</h3>
          <TkStepper :active="basicActive" @tk-step-change="handleBasicStepChange">
            <TkStep header="Personal Info" subheader="Enter your details" />
            <TkStep header="Contact Info" subheader="Email and phone" />
            <TkStep header="Review" subheader="Confirm your data" />
            <TkStep header="Complete" subheader="Finish setup" />
          </TkStepper>
          <div class="mt-4 flex gap-2">
            <TkButton 
              @click="previousStep('basic')" 
              :disabled="basicActive === 0"
              variant="outlined"
            >
              Previous
            </TkButton>
            <TkButton 
              @click="nextStep('basic')" 
              :disabled="basicActive === 3"
            >
              Next
            </TkButton>
          </div>
        </div>

        <!-- Vertical Stepper -->
        <div>
          <h3 class="text-lg font-medium mb-4">Vertical Stepper</h3>
          <TkStepper 
            orientation="vertical" 
            :active="verticalActive"
            @tk-step-click="handleVerticalStepClick"
          >
            <TkStep header="Account Setup" subheader="Create your account">
              <div class="p-4 bg-gray-50 rounded mt-2">
                <p>Step 1: Account setup content goes here...</p>
              </div>
            </TkStep>
            <TkStep header="Profile Details" subheader="Add your information">
              <div class="p-4 bg-gray-50 rounded mt-2">
                <p>Step 2: Profile details form would be here...</p>
              </div>
            </TkStep>
            <TkStep header="Preferences" subheader="Customize your experience">
              <div class="p-4 bg-gray-50 rounded mt-2">
                <p>Step 3: Preferences settings...</p>
              </div>
            </TkStep>
          </TkStepper>
        </div>

        <!-- Number Step Mode -->
        <div>
          <h3 class="text-lg font-medium mb-4">Number Step Mode</h3>
          <TkStepper 
            step-mode="number" 
            :active="numberActive"
            :show-complete-state="true"
            @tk-step-change="handleNumberStepChange"
          >
            <TkStep header="Order Details" subheader="Product information" />
            <TkStep header="Shipping" subheader="Delivery address" />
            <TkStep header="Payment" subheader="Payment method" />
            <TkStep header="Confirmation" subheader="Review order" />
          </TkStepper>
          <div class="mt-4 flex gap-2">
            <TkButton 
              @click="previousStep('number')" 
              :disabled="numberActive === 0"
              variant="outlined"
            >
              Previous
            </TkButton>
            <TkButton 
              @click="nextStep('number')" 
              :disabled="numberActive === 3"
            >
              Next
            </TkButton>
          </div>
        </div>

        <!-- Linear Mode -->
        <div>
          <h3 class="text-lg font-medium mb-4">Linear Mode (Sequential)</h3>
          <TkStepper 
            :linear="true" 
            :active="linearActive"
            @tk-step-change="handleLinearStepChange"
          >
            <TkStep 
              header="Step 1" 
              subheader="Must complete first"
              :complete="linearActive > 0"
            />
            <TkStep 
              header="Step 2" 
              subheader="Unlocks after Step 1"
              :complete="linearActive > 1"
            />
            <TkStep 
              header="Step 3" 
              subheader="Unlocks after Step 2"
              :complete="linearActive > 2"
            />
            <TkStep 
              header="Step 4" 
              subheader="Final step"
              :complete="linearActive > 3"
            />
          </TkStepper>
          <div class="mt-4 flex gap-2">
            <TkButton 
              @click="previousStep('linear')" 
              :disabled="linearActive === 0"
              variant="outlined"
            >
              Previous
            </TkButton>
            <TkButton 
              @click="nextStep('linear')" 
              :disabled="linearActive === 3"
            >
              Next
            </TkButton>
          </div>
        </div>

        <!-- Custom Icons -->
        <div>
          <h3 class="text-lg font-medium mb-4">Custom Icons</h3>
          <TkStepper 
            :active="iconActive"
            :complete-icon="{ name: 'check_circle', fill: true, color: '#10B981' }"
            :active-icon="{ name: 'play_circle', fill: true, color: '#3B82F6' }"
            :inactive-icon="{ name: 'radio_button_unchecked', fill: false, color: '#9CA3AF' }"
            @tk-step-change="handleIconStepChange"
          >
            <TkStep header="Start" subheader="Begin the process" />
            <TkStep header="Progress" subheader="Work in progress" />
            <TkStep 
              header="Error Step" 
              subheader="This step has an error"
              :error="iconActive === 2"
              :error-icon="{ name: 'error', fill: true, color: '#EF4444' }"
            />
            <TkStep header="Finish" subheader="Complete the task" />
          </TkStepper>
          <div class="mt-4 flex gap-2">
            <TkButton 
              @click="previousStep('icon')" 
              :disabled="iconActive === 0"
              variant="outlined"
            >
              Previous
            </TkButton>
            <TkButton 
              @click="nextStep('icon')" 
              :disabled="iconActive === 3"
            >
              Next
            </TkButton>
          </div>
        </div>

        <!-- Custom Styling -->
        <div>
          <h3 class="text-lg font-medium mb-4">Custom Styling</h3>
          <TkStepper 
            :active="styledActive"
            :container-style="{
              backgroundColor: 'var(--neutral-50)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #E5E7EB'
            }"
            :content-style="{
              backgroundColor: '#F9FAFB',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #E5E7EB'
            }"
            :sign-style="{
              backgroundColor: '#3B82F6',
              border: '2px solid #1E40AF',
              borderRadius: '50%',
              color: 'white'
            }"
            @tk-step-change="handleStyledStepChange"
          >
            <TkStep header="Custom Style 1" subheader="Styled container" />
            <TkStep header="Custom Style 2" subheader="Styled content" />
            <TkStep header="Custom Style 3" subheader="Styled elements" />
          </TkStepper>
          <div class="mt-4 flex gap-2">
            <TkButton 
              @click="previousStep('styled')" 
              :disabled="styledActive === 0"
              variant="outlined"
            >
              Previous
            </TkButton>
            <TkButton 
              @click="nextStep('styled')" 
              :disabled="styledActive === 2"
            >
              Next
            </TkButton>
          </div>
        </div>

        <!-- Methods Demo -->
        <div>
          <h3 class="text-lg font-medium mb-4">Methods Demo (setActive)</h3>
          <TkStepper 
            ref="methodsStepper"
            :active="methodsActive"
            @tk-step-change="handleMethodsStepChange"
          >
            <TkStep header="Method Step 1" subheader="Use buttons below" />
            <TkStep header="Method Step 2" subheader="Direct navigation" />
            <TkStep header="Method Step 3" subheader="Method control" />
            <TkStep header="Method Step 4" subheader="Final step" />
          </TkStepper>
          <div class="mt-4 flex gap-2 flex-wrap">
            <TkButton 
              @click="setActiveStep(0)" 
              variant="outlined"
              size="sm"
            >
              Go to Step 1
            </TkButton>
            <TkButton 
              @click="setActiveStep(1)" 
              variant="outlined"
              size="sm"
            >
              Go to Step 2
            </TkButton>
            <TkButton 
              @click="setActiveStep(2)" 
              variant="outlined"
              size="sm"
            >
              Go to Step 3
            </TkButton>
            <TkButton 
              @click="setActiveStep(3)" 
              variant="outlined"
              size="sm"
            >
              Go to Step 4
            </TkButton>
          </div>
        </div>

        <!-- Event Handling Demo -->
        <div>
          <h3 class="text-lg font-medium mb-4">Event Handling</h3>
          <TkStepper 
            :active="eventActive"
            @tk-step-change="handleEventStepChange"
            @tk-step-click="handleEventStepClick"
          >
            <TkStep header="Step A" subheader="Click events demo" />
            <TkStep header="Step B" subheader="Change events demo" />
            <TkStep header="Step C" subheader="Event tracking" />
          </TkStepper>
          <div class="mt-4 p-4 bg-gray-50 border rounded-lg">
            <h4 class="font-medium mb-2">Event Log:</h4>
            <div class="space-y-1 max-h-32 overflow-y-auto">
              <div v-for="(event, index) in eventLog" :key="index" class="text-sm text-gray-700">
                {{ event }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TkCard, TkStepper, TkStep, TkButton } from '@takeoff-ui/vue';

// Stepper states
const basicActive = ref(0);
const verticalActive = ref(0);
const numberActive = ref(0);
const linearActive = ref(0);
const iconActive = ref(0);
const styledActive = ref(0);
const eventActive = ref(0);
const methodsActive = ref(0);

// Stepper references
const methodsStepper = ref(null);

// Event logging
const eventLog = ref([]);

// Step navigation functions
const nextStep = (stepperType) => {
  switch (stepperType) {
    case 'basic':
      if (basicActive.value < 3) basicActive.value++;
      break;
    case 'number':
      if (numberActive.value < 3) numberActive.value++;
      break;
    case 'linear':
      if (linearActive.value < 3) linearActive.value++;
      break;
    case 'icon':
      if (iconActive.value < 3) iconActive.value++;
      break;
    case 'styled':
      if (styledActive.value < 2) styledActive.value++;
      break;
  }
};

const previousStep = (stepperType) => {
  switch (stepperType) {
    case 'basic':
      if (basicActive.value > 0) basicActive.value--;
      break;
    case 'number':
      if (numberActive.value > 0) numberActive.value--;
      break;
    case 'linear':
      if (linearActive.value > 0) linearActive.value--;
      break;
    case 'icon':
      if (iconActive.value > 0) iconActive.value--;
      break;
    case 'styled':
      if (styledActive.value > 0) styledActive.value--;
      break;
  }
};

// Event handlers
const handleBasicStepChange = (event) => {
  basicActive.value = event.detail;
};

const handleVerticalStepClick = (event) => {
  verticalActive.value = event.detail.index;
};

const handleNumberStepChange = (event) => {
  numberActive.value = event.detail;
};

const handleLinearStepChange = (event) => {
  linearActive.value = event.detail;
};

const handleIconStepChange = (event) => {
  iconActive.value = event.detail;
};

const handleStyledStepChange = (event) => {
  styledActive.value = event.detail;
};

const handleEventStepChange = (event) => {
  eventActive.value = event.detail;
  addEventLog(`Step changed to: ${event.detail}`);
};

const handleEventStepClick = (event) => {
  addEventLog(`Step clicked: ${event.detail.index} (${event.detail.status})`);
};

const handleMethodsStepChange = (event) => {
  methodsActive.value = event.detail;
};

// Method demo - setActive
const setActiveStep = (stepIndex) => {
  if (methodsStepper.value) {
    methodsStepper.value.setActive(stepIndex);
    console.log(`Set active step to: ${stepIndex}`);
  }
};

const addEventLog = (message) => {
  const timestamp = new Date().toLocaleTimeString();
  eventLog.value.unshift(`${timestamp}: ${message}`);
  
  // Keep only last 10 events
  if (eventLog.value.length > 10) {
    eventLog.value = eventLog.value.slice(0, 10);
  }
};
</script>
