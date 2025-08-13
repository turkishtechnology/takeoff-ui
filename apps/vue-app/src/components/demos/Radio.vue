<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Radio Component Demo</h2>
      </template>
      
      <div class="space-y-6">
        <!-- Basic Radio Group -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Radio Group</h3>
          <TkRadioGroup v-model="basicValue">
            <TkRadio label="Option 1" value="1" />
            <TkRadio label="Option 2" value="2" />
            <TkRadio label="Option 3" value="3" />
          </TkRadioGroup>
          <p class="mt-2 text-sm text-gray-600">Selected: {{ basicValue }}</p>
        </div>

        <!-- Radio Group with Label -->
        <div>
          <h3 class="text-lg font-medium mb-3">Radio Group with Label</h3>
          <TkRadioGroup v-model="labelValue" label="Choose your preference">
            <TkRadio label="Morning" value="morning" />
            <TkRadio label="Afternoon" value="afternoon" />
            <TkRadio label="Evening" value="evening" />
          </TkRadioGroup>
          <p class="mt-2 text-sm text-gray-600">Selected: {{ labelValue }}</p>
        </div>

        <!-- Radio with Description -->
        <div>
          <h3 class="text-lg font-medium mb-3">Radio with Description</h3>
          <TkRadioGroup v-model="descriptionValue" label="Select a plan">
            <TkRadio label="Free Plan" value="free" description="Basic features with limited usage" />
            <TkRadio label="Pro Plan" value="pro" description="Advanced features with unlimited usage" />
            <TkRadio label="Enterprise Plan" value="enterprise" description="All features with priority support" />
          </TkRadioGroup>
          <p class="mt-2 text-sm text-gray-600">Selected: {{ descriptionValue }}</p>
        </div>

        <!-- Card Type Radio Group -->
        <div>
          <h3 class="text-lg font-medium mb-3">Card Type Radio Group</h3>
          <TkRadioGroup v-model="cardValue" label="Card Type" type="card">
            <TkRadio label="Standard Card" value="standard" description="Basic card with standard features" />
            <TkRadio label="Premium Card" value="premium" description="Enhanced card with premium benefits" />
            <TkRadio label="Business Card" value="business" description="Corporate card for business use" />
          </TkRadioGroup>
          <p class="mt-2 text-sm text-gray-600">Selected: {{ cardValue }}</p>
        </div>

        <!-- Radio Group with Custom Content -->
        <div>
          <h3 class="text-lg font-medium mb-3">Radio with Custom Content</h3>
          <TkRadioGroup v-model="customValue" type="card" spread>
            <TkRadio value="option1">
              <div slot="content" class="flex items-center gap-2">
                <div>Premium Option</div>
                <TkBadge icon="star" variant="info" label="Popular" />
              </div>
            </TkRadio>
            <TkRadio value="option2">
              <div slot="content" class="flex items-center gap-2">
                <div>Business Option</div>
                <TkBadge icon="business_center" variant="success" label="Recommended" />
              </div>
            </TkRadio>
          </TkRadioGroup>
          <p class="mt-2 text-sm text-gray-600">Selected: {{ customValue }}</p>
        </div>

        <!-- Radio States -->
        <div>
          <h3 class="text-lg font-medium mb-3">Radio States</h3>
          <div class="space-y-4">
            <div>
              <h4 class="text-md font-medium mb-2">Normal State</h4>
              <TkRadioGroup v-model="normalState" label="Normal">
                <TkRadio label="Option 1" value="1" />
                <TkRadio label="Option 2" value="2" />
              </TkRadioGroup>
            </div>
            <div>
              <h4 class="text-md font-medium mb-2">Invalid State</h4>
              <TkRadioGroup v-model="invalidState" :invalid="true" label="Error State">
                <TkRadio label="Option 1" value="1" />
                <TkRadio label="Option 2" value="2" />
              </TkRadioGroup>
            </div>
            <div>
              <h4 class="text-md font-medium mb-2">Disabled State</h4>
              <TkRadioGroup v-model="disabledState" label="Disabled">
                <TkRadio label="Option 1" value="1" disabled />
                <TkRadio label="Option 2" value="2" disabled />
              </TkRadioGroup>
            </div>
          </div>
        </div>

        <!-- Radio Position -->
        <div>
          <h3 class="text-lg font-medium mb-3">Radio Position</h3>
          <div class="space-y-4">
            <div>
              <h4 class="text-md font-medium mb-2">Left Position (Default)</h4>
              <TkRadioGroup v-model="leftPosition">
                <TkRadio label="Option 1" value="1" position="left" />
                <TkRadio label="Option 2" value="2" position="left" />
              </TkRadioGroup>
            </div>
            <div>
              <h4 class="text-md font-medium mb-2">Right Position</h4>
              <TkRadioGroup v-model="rightPosition">
                <TkRadio label="Option 1" value="1" position="right" />
                <TkRadio label="Option 2" value="2" position="right" />
              </TkRadioGroup>
            </div>
          </div>
        </div>

        <!-- Interactive Example -->
        <div>
          <h3 class="text-lg font-medium mb-3">Interactive Example</h3>
          <div class="space-y-4">
            <div class="flex gap-4">
              <select v-model="radioType" class="px-3 py-2 border rounded">
                <option value="default">Default</option>
                <option value="card">Card</option>
              </select>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="isInvalid" class="rounded">
                Invalid State
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="isDisabled" class="rounded">
                Disabled
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="useSpread" class="rounded">
                Spread (Card only)
              </label>
            </div>
            <TkRadioGroup 
              v-model="interactiveValue" 
              :type="radioType"
              :invalid="isInvalid"
              :spread="useSpread && radioType === 'card'"
              label="Interactive Radio Group"
            >
              <TkRadio 
                label="Interactive Option 1" 
                value="int1" 
                :disabled="isDisabled"
                description="This is the first option"
              />
              <TkRadio 
                label="Interactive Option 2" 
                value="int2" 
                :disabled="isDisabled"
                description="This is the second option"
              />
              <TkRadio 
                label="Interactive Option 3" 
                value="int3" 
                :disabled="isDisabled"
                description="This is the third option"
              />
            </TkRadioGroup>
            <p class="mt-2 text-sm text-gray-600">Selected: {{ interactiveValue }}</p>
          </div>
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TkCard, TkRadioGroup, TkRadio, TkBadge } from '@takeoff-ui/vue';

const basicValue = ref('1');
const labelValue = ref('morning');
const descriptionValue = ref('free');
const cardValue = ref('standard');
const customValue = ref('option1');
const normalState = ref('1');
const invalidState = ref('1');
const disabledState = ref('1');
const leftPosition = ref('1');
const rightPosition = ref('1');
const interactiveValue = ref('int1');

// Interactive controls
const radioType = ref('default');
const isInvalid = ref(false);
const isDisabled = ref(false);
const useSpread = ref(false);
</script>
