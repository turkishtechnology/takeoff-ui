<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Button Component Demo</h2>
      </template>
      
      <div class="space-y-6">
        <!-- Button Variants -->
        <div>
          <h3 class="text-lg font-medium mb-3">Button Variants</h3>
          <div class="flex flex-wrap gap-3">
            <TkButton label="Primary" variant="primary" @click="handleClick('Primary')" />
            <TkButton label="Secondary" variant="secondary" @click="handleClick('Secondary')" />
            <TkButton label="Success" variant="success" @click="handleClick('Success')" />
            <TkButton label="Danger" variant="danger" @click="handleClick('Danger')" />
            <TkButton label="Warning" variant="warning" @click="handleClick('Warning')" />
            <TkButton label="Info" variant="info" @click="handleClick('Info')" />
          </div>
        </div>

        <!-- Button Sizes -->
        <div>
          <h3 class="text-lg font-medium mb-3">Button Sizes</h3>
          <div class="flex items-center gap-3">
            <TkButton label="Small" size="small" />
            <TkButton label="Medium" size="medium" />
            <TkButton label="Large" size="large" />
          </div>
        </div>

        <!-- Button States -->
        <div>
          <h3 class="text-lg font-medium mb-3">Button States</h3>
          <div class="flex flex-wrap gap-3">
            <TkButton label="Normal" />
            <TkButton label="Disabled" disabled />
            <TkButton label="Loading" :loading="isLoading" @click="toggleLoading" />
          </div>
        </div>

        <!-- Button with Icons -->
        <div>
          <h3 class="text-lg font-medium mb-3">Button with Icons</h3>
          <div class="flex flex-wrap gap-3">
            <TkButton label="Download" icon="download" />
            <TkButton label="Upload" icon="upload" icon-position="right" />
            <TkButton icon="settings" />
          </div>
        </div>

        <!-- Full Width Button -->
        <div>
          <h3 class="text-lg font-medium mb-3">Full Width Button</h3>
          <TkButton label="Full Width Button" full-width />
        </div>

        <!-- Button Click Example -->
        <div>
          <h3 class="text-lg font-medium mb-3">Button Click Example</h3>
          <TkButton label="Click Me!" @click="incrementCounter" />
          <p class="mt-2 text-sm text-gray-600">Button clicked: {{ clickCount }} times</p>
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TkButton, TkCard } from '@takeoff-ui/vue';

const clickCount = ref(0);
const isLoading = ref(false);

const handleClick = (variant) => {
  console.log(`${variant} button clicked`);
};

const incrementCounter = () => {
  clickCount.value++;
};

const toggleLoading = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
};
</script>
