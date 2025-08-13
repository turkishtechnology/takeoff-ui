<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Checkbox Component Demo</h2>
      </template>
      
      <div class="space-y-6">
        <!-- Basic Checkbox -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Checkbox</h3>
          <TkCheckbox v-model="isChecked" label="I agree to the terms and conditions" />
          <p class="mt-2 text-sm text-gray-600">Checked: {{ isChecked }}</p>
        </div>

        <!-- Multiple Checkboxes -->
        <div>
          <h3 class="text-lg font-medium mb-3">Multiple Options</h3>
          <div class="space-y-2">
            <TkCheckbox v-model="options.newsletter" label="Subscribe to newsletter" />
            <TkCheckbox v-model="options.updates" label="Receive product updates" />
            <TkCheckbox v-model="options.marketing" label="Receive marketing emails" />
          </div>
          <p class="mt-2 text-sm text-gray-600">
            Selected: {{ Object.entries(options).filter(([_, v]) => v).map(([k]) => k).join(', ') }}
          </p>
        </div>

        <!-- Disabled Checkbox -->
        <div>
          <h3 class="text-lg font-medium mb-3">Disabled State</h3>
          <div class="space-y-2">
            <TkCheckbox v-model="disabledChecked" label="Disabled checked" disabled />
            <TkCheckbox v-model="disabledUnchecked" label="Disabled unchecked" disabled />
          </div>
        </div>

        <!-- Indeterminate State -->
        <div>
          <h3 class="text-lg font-medium mb-3">Indeterminate State</h3>
          <TkCheckbox 
            v-model="allSelected" 
            :indeterminate="indeterminate"
            label="Select all"
            @change="handleSelectAll"
          />
          <div class="ml-6 mt-2 space-y-2">
            <TkCheckbox v-model="items.item1" label="Item 1" @change="updateSelectAll" />
            <TkCheckbox v-model="items.item2" label="Item 2" @change="updateSelectAll" />
            <TkCheckbox v-model="items.item3" label="Item 3" @change="updateSelectAll" />
          </div>
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { TkCheckbox, TkCard } from '@takeoff-ui/vue';

const isChecked = ref(false);

const options = ref({
  newsletter: true,
  updates: false,
  marketing: false
});

const disabledChecked = ref(true);
const disabledUnchecked = ref(false);

const items = ref({
  item1: false,
  item2: true,
  item3: false
});

const allSelected = ref(false);

const indeterminate = computed(() => {
  const values = Object.values(items.value);
  const checkedCount = values.filter(v => v).length;
  return checkedCount > 0 && checkedCount < values.length;
});

const handleSelectAll = (value) => {
  Object.keys(items.value).forEach(key => {
    items.value[key] = value;
  });
};

const updateSelectAll = () => {
  const values = Object.values(items.value);
  if (values.every(v => v)) {
    allSelected.value = true;
  } else {
    allSelected.value = false;
  }
};
</script>
