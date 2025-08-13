<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Input Component Demo</h2>
      </template>
      
      <div class="space-y-6">
        <!-- Basic Input -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Input</h3>
          <TkInput v-model="basicValue" placeholder="Enter text..." />
          <p class="mt-2 text-sm text-gray-600">Value: {{ basicValue }}</p>
        </div>

        <!-- Input with Label -->
        <div>
          <h3 class="text-lg font-medium mb-3">Input with Label</h3>
          <TkInput v-model="labelValue" label="Name" placeholder="Enter your name" />
          <p class="mt-2 text-sm text-gray-600">Value: {{ labelValue }}</p>
        </div>

        <!-- Required Input -->
        <div>
          <h3 class="text-lg font-medium mb-3">Required Input</h3>
          <TkInput v-model="requiredValue" label="Email" placeholder="email@example.com" required />
          <p class="mt-2 text-sm text-gray-600">Value: {{ requiredValue }}</p>
        </div>

        <!-- Disabled Input -->
        <div>
          <h3 class="text-lg font-medium mb-3">Disabled Input</h3>
          <TkInput v-model="disabledValue" label="Disabled" disabled />
          <p class="mt-2 text-sm text-gray-600">Value: {{ disabledValue }}</p>
        </div>

        <!-- Input with Helper Text -->
        <div>
          <h3 class="text-lg font-medium mb-3">Input with Helper Text</h3>
          <TkInput 
            v-model="helperValue" 
            label="Password" 
            type="password"
            helper-text="Must be at least 8 characters"
          />
          <p class="mt-2 text-sm text-gray-600">Value: {{ helperValue }}</p>
        </div>

        <!-- Input with Error -->
        <div>
          <h3 class="text-lg font-medium mb-3">Input with Error</h3>
          <TkInput 
            v-model="errorValue" 
            label="Username"
            :error="errorValue.length < 3"
            helper-text="Username is too short"
          />
          <p class="mt-2 text-sm text-gray-600">Value: {{ errorValue }}</p>
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TkInput, TkCard } from '@takeoff-ui/vue';

const basicValue = ref('');
const labelValue = ref('');
const requiredValue = ref('');
const disabledValue = ref('This is disabled');
const helperValue = ref('');
const errorValue = ref('');
</script>
