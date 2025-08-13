<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Spinner Component Demo</h2>
      </template>
      
      <div class="space-y-6">
        <!-- Basic Spinner -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Spinner</h3>
          <TkSpinner />
        </div>

        <!-- Spinner Types -->
        <div>
          <h3 class="text-lg font-medium mb-3">Spinner Types</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div class="text-center">
              <TkSpinner type="rounded" />
              <p class="mt-2 text-sm">Rounded</p>
            </div>
            <div class="text-center">
              <TkSpinner type="dots" />
              <p class="mt-2 text-sm">Dots</p>
            </div>
            <div class="text-center">
              <TkSpinner type="three-dots" />
              <p class="mt-2 text-sm">Three Dots</p>
            </div>
            <div class="text-center">
              <TkSpinner type="lines" />
              <p class="mt-2 text-sm">Lines</p>
            </div>
            <div class="text-center">
              <TkSpinner type="pulse" />
              <p class="mt-2 text-sm">Pulse</p>
            </div>
            <div class="text-center">
              <TkSpinner type="loader" />
              <p class="mt-2 text-sm">Loader</p>
            </div>
          </div>
        </div>

        <!-- Spinner Sizes -->
        <div>
          <h3 class="text-lg font-medium mb-3">Spinner Sizes</h3>
          <div class="flex items-center gap-8">
            <div class="text-center">
              <TkSpinner size="xxsmall" type="rounded" />
              <p class="mt-2 text-sm">XXSmall</p>
            </div>
            <div class="text-center">
              <TkSpinner size="xsmall" type="rounded" />
              <p class="mt-2 text-sm">XSmall</p>
            </div>
            <div class="text-center">
              <TkSpinner size="small" type="rounded" />
              <p class="mt-2 text-sm">Small</p>
            </div>
            <div class="text-center">
              <TkSpinner size="base" type="rounded" />
              <p class="mt-2 text-sm">Base</p>
            </div>
            <div class="text-center">
              <TkSpinner size="large" type="rounded" />
              <p class="mt-2 text-sm">Large</p>
            </div>
            <div class="text-center">
              <TkSpinner size="xlarge" type="rounded" />
              <p class="mt-2 text-sm">XLarge</p>
            </div>
          </div>
        </div>

        <!-- Spinner with Labels -->
        <div>
          <h3 class="text-lg font-medium mb-3">Spinner with Labels</h3>
          <div class="space-y-4">
            <TkSpinner type="three-dots" label="Loading..." />
            <TkSpinner type="rounded" label="Processing data..." />
            <TkSpinner type="pulse" label="Saving changes..." />
          </div>
        </div>

        <!-- Spinner Orientations -->
        <div>
          <h3 class="text-lg font-medium mb-3">Spinner Orientations</h3>
          <div class="space-y-6">
            <div>
              <h4 class="text-md font-medium mb-2">Vertical (Default)</h4>
              <TkSpinner orientation="vertical" label="Vertical loading..." />
            </div>
            <div>
              <h4 class="text-md font-medium mb-2">Horizontal</h4>
              <TkSpinner orientation="horizontal" label="Horizontal loading..." />
            </div>
          </div>
        </div>

        <!-- Loading States in Components -->
        <div>
          <h3 class="text-lg font-medium mb-3">Loading States in Components</h3>
          <div class="space-y-4">
            <div class="max-w-md">
              <TkCard header="Loading Card Content">
                <div class="flex justify-center py-8">
                  <TkSpinner type="rounded" label="Loading content..." />
                </div>
              </TkCard>
            </div>
            <div class="flex gap-4">
              <TkButton 
                :label="buttonLoading ? 'Loading...' : 'Click me'"
                :loading="buttonLoading"
                @click="simulateButtonLoading"
              />
              <TkButton 
                label="Simulate Loading" 
                variant="secondary"
                @click="simulateButtonLoading"
              />
            </div>
          </div>
        </div>

        <!-- Inline Spinners -->
        <div>
          <h3 class="text-lg font-medium mb-3">Inline Spinners</h3>
          <div class="space-y-3">
            <p class="flex items-center gap-2">
              <TkSpinner size="small" type="dots" />
              <span>Loading inline content...</span>
            </p>
            <p class="flex items-center gap-2">
              <span>Saving your changes</span>
              <TkSpinner size="xsmall" type="three-dots" />
            </p>
            <p class="flex items-center gap-2">
              <TkSpinner size="small" type="pulse" />
              <span>Processing request</span>
              <TkSpinner size="small" type="pulse" />
            </p>
          </div>
        </div>

        <!-- Full Page Loading Simulation -->
        <div>
          <h3 class="text-lg font-medium mb-3">Full Page Loading Simulation</h3>
          <div class="space-y-4">
            <TkButton 
              label="Simulate Page Loading" 
              @click="simulatePageLoading"
            />
            <div 
              v-if="pageLoading" 
              class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              @click="pageLoading = false"
            >
              <div class="bg-white p-8 rounded-lg">
                <TkSpinner type="rounded" size="large" label="Loading page..." />
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Spinner Builder -->
        <div>
          <h3 class="text-lg font-medium mb-3">Interactive Spinner Builder</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Type</label>
                <select v-model="selectedType" class="w-full px-3 py-2 border rounded">
                  <option value="rounded">Rounded</option>
                  <option value="dots">Dots</option>
                  <option value="three-dots">Three Dots</option>
                  <option value="lines">Lines</option>
                  <option value="pulse">Pulse</option>
                  <option value="loader">Loader</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Size</label>
                <select v-model="selectedSize" class="w-full px-3 py-2 border rounded">
                  <option value="xxsmall">XXSmall</option>
                  <option value="xsmall">XSmall</option>
                  <option value="small">Small</option>
                  <option value="base">Base</option>
                  <option value="large">Large</option>
                  <option value="xlarge">XLarge</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Orientation</label>
                <select v-model="selectedOrientation" class="w-full px-3 py-2 border rounded">
                  <option value="vertical">Vertical</option>
                  <option value="horizontal">Horizontal</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Label</label>
                <input 
                  v-model="customLabel" 
                  type="text" 
                  class="w-full px-3 py-2 border rounded"
                  placeholder="Loading text..."
                >
              </div>
            </div>
            <div class="p-8 border-2 border-dashed border-gray-200 rounded-lg text-center">
              <TkSpinner 
                :type="selectedType"
                :size="selectedSize"
                :orientation="selectedOrientation"
                :label="customLabel || 'Custom spinner...'"
              />
            </div>
          </div>
        </div>

        <!-- Real-world Examples -->
        <div>
          <h3 class="text-lg font-medium mb-3">Real-world Examples</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="text-md font-medium mb-2">Form Submission</h4>
              <div class="border p-4 rounded">
                <div class="space-y-3">
                  <input type="text" placeholder="Your name" class="w-full px-3 py-2 border rounded">
                  <input type="email" placeholder="Your email" class="w-full px-3 py-2 border rounded">
                  <button 
                    class="w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2"
                    :disabled="formSubmitting"
                    @click="simulateFormSubmission"
                  >
                    <TkSpinner v-if="formSubmitting" size="small" type="dots" />
                    {{ formSubmitting ? 'Submitting...' : 'Submit Form' }}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h4 class="text-md font-medium mb-2">Data Loading</h4>
              <div class="border p-4 rounded">
                <div v-if="dataLoading" class="text-center py-8">
                  <TkSpinner type="three-dots" label="Loading data..." />
                </div>
                <div v-else>
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span>Item 1</span>
                      <span>$10.00</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Item 2</span>
                      <span>$25.00</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Item 3</span>
                      <span>$15.00</span>
                    </div>
                  </div>
                </div>
                <button 
                  class="mt-3 w-full bg-gray-600 text-white py-2 rounded"
                  @click="simulateDataLoading"
                >
                  Reload Data
                </button>
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
import { TkCard, TkSpinner, TkButton } from '@takeoff-ui/vue';

// Interactive controls
const selectedType = ref('rounded');
const selectedSize = ref('base');
const selectedOrientation = ref('vertical');
const customLabel = ref('');

// Loading states
const buttonLoading = ref(false);
const pageLoading = ref(false);
const formSubmitting = ref(false);
const dataLoading = ref(false);

const simulateButtonLoading = () => {
  buttonLoading.value = true;
  setTimeout(() => {
    buttonLoading.value = false;
  }, 2000);
};

const simulatePageLoading = () => {
  pageLoading.value = true;
  setTimeout(() => {
    pageLoading.value = false;
  }, 3000);
};

const simulateFormSubmission = () => {
  formSubmitting.value = true;
  setTimeout(() => {
    formSubmitting.value = false;
    alert('Form submitted successfully!');
  }, 2500);
};

const simulateDataLoading = () => {
  dataLoading.value = true;
  setTimeout(() => {
    dataLoading.value = false;
  }, 1500);
};
</script>
