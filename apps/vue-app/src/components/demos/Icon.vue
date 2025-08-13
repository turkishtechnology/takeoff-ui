<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Icon Component Demo</h2>
      </template>
      
      <div class="space-y-6">
        <!-- Basic Icons -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Icons</h3>
          <div class="flex gap-4 items-center flex-wrap">
            <TkIcon icon="home" />
            <TkIcon icon="flight" />
            <TkIcon icon="hotel" />
            <TkIcon icon="directions_car" />
            <TkIcon icon="local_dining" />
            <TkIcon icon="shopping_cart" />
            <TkIcon icon="favorite" />
            <TkIcon icon="star" />
            <TkIcon icon="search" />
            <TkIcon icon="settings" />
          </div>
        </div>

        <!-- Icon Variants -->
        <div>
          <h3 class="text-lg font-medium mb-3">Icon Variants</h3>
          <div class="flex gap-4 items-center flex-wrap">
            <TkIcon icon="flight" variant="primary" />
            <TkIcon icon="flight" variant="secondary" />
            <TkIcon icon="flight" variant="neutral" />
            <TkIcon icon="flight" variant="info" />
            <TkIcon icon="flight" variant="success" />
            <TkIcon icon="flight" variant="warning" />
            <TkIcon icon="flight" variant="danger" />
            <TkIcon icon="flight" variant="white" class="bg-gray-800 p-1 rounded" />
          </div>
        </div>

        <!-- Icon Sizes -->
        <div>
          <h3 class="text-lg font-medium mb-3">Icon Sizes</h3>
          <div class="flex gap-4 items-center flex-wrap">
            <TkIcon icon="star" size="xsmall" variant="primary" />
            <TkIcon icon="star" size="small" variant="primary" />
            <TkIcon icon="star" size="base" variant="primary" />
            <TkIcon icon="star" size="medium" variant="primary" />
            <TkIcon icon="star" size="large" variant="primary" />
            <TkIcon icon="star" size="xlarge" variant="primary" />
            <TkIcon icon="star" size="xxlarge" variant="primary" />
          </div>
        </div>

        <!-- Icon Types -->
        <div>
          <h3 class="text-lg font-medium mb-3">Icon Types</h3>
          <div class="flex gap-4 items-center">
            <div class="text-center">
              <TkIcon icon="star" icon-type="outlined" size="large" />
              <p class="text-sm mt-1">Outlined</p>
            </div>
            <div class="text-center">
              <TkIcon icon="star" icon-type="rounded" size="large" />
              <p class="text-sm mt-1">Rounded</p>
            </div>
            <div class="text-center">
              <TkIcon icon="star" icon-type="sharp" size="large" />
              <p class="text-sm mt-1">Sharp</p>
            </div>
          </div>
        </div>

        <!-- Filled Icons -->
        <div>
          <h3 class="text-lg font-medium mb-3">Filled Icons</h3>
          <div class="flex gap-4 items-center flex-wrap">
            <TkIcon icon="favorite" :fill="false" variant="danger" size="large" />
            <TkIcon icon="favorite" :fill="true" variant="danger" size="large" />
            <TkIcon icon="star" :fill="false" variant="warning" size="large" />
            <TkIcon icon="star" :fill="true" variant="warning" size="large" />
            <TkIcon icon="bookmark" :fill="false" variant="info" size="large" />
            <TkIcon icon="bookmark" :fill="true" variant="info" size="large" />
          </div>
        </div>

        <!-- Sign Icons (Card Style) -->
        <div>
          <h3 class="text-lg font-medium mb-3">Sign Icons (Card Style)</h3>
          <div class="flex gap-4 items-center flex-wrap">
            <TkIcon icon="flight" sign variant="primary" />
            <TkIcon icon="hotel" sign variant="secondary" />
            <TkIcon icon="local_dining" sign variant="info" />
            <TkIcon icon="shopping_cart" sign variant="success" />
            <TkIcon icon="warning" sign variant="warning" />
            <TkIcon icon="error" sign variant="danger" />
          </div>
        </div>

        <!-- Sign Icons with Different Sizes -->
        <div>
          <h3 class="text-lg font-medium mb-3">Sign Icons - Different Sizes</h3>
          <div class="flex gap-4 items-center flex-wrap">
            <TkIcon icon="home" sign size="small" variant="primary" />
            <TkIcon icon="home" sign size="base" variant="primary" />
            <TkIcon icon="home" sign size="large" variant="primary" />
            <TkIcon icon="home" sign size="xlarge" variant="primary" />
            <TkIcon icon="home" sign size="xxlarge" variant="primary" />
          </div>
        </div>

        <!-- Custom Colors -->
        <div>
          <h3 class="text-lg font-medium mb-3">Custom Colors</h3>
          <div class="flex gap-4 items-center flex-wrap">
            <TkIcon icon="palette" color="#FF5722" size="large" />
            <TkIcon icon="palette" color="#2196F3" size="large" />
            <TkIcon icon="palette" color="#4CAF50" size="large" />
            <TkIcon icon="palette" color="#9C27B0" size="large" />
            <TkIcon icon="palette" color="#FF9800" size="large" />
          </div>
        </div>

        <!-- Custom Sign Colors -->
        <div>
          <h3 class="text-lg font-medium mb-3">Custom Sign Colors</h3>
          <div class="flex gap-4 items-center flex-wrap">
            <TkIcon 
              icon="flight" 
              sign 
              background-color="#F5F5F5" 
              border-color="#2196F3" 
              icon-color="#2196F3"
              size="large"
            />
            <TkIcon 
              icon="hotel" 
              sign 
              background-color="#FFF9C4" 
              border-color="#F57C00" 
              icon-color="#F57C00"
              size="large"
            />
            <TkIcon 
              icon="local_dining" 
              sign 
              background-color="#E8F5E9" 
              border-color="#388E3C" 
              icon-color="#388E3C"
              size="large"
            />
            <TkIcon 
              icon="spa" 
              sign 
              background-color="#FCE4EC" 
              border-color="#C2185B" 
              icon-color="#C2185B"
              size="large"
            />
          </div>
        </div>

        <!-- Interactive Example -->
        <div>
          <h3 class="text-lg font-medium mb-3">Interactive Example</h3>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <TkSelect 
              v-model="selectedIcon" 
              label="Icon" 
              :options="iconOptions"
            />
            <TkSelect 
              v-model="selectedVariant" 
              label="Variant" 
              :options="variantOptions"
            />
            <TkSelect 
              v-model="selectedSize" 
              label="Size" 
              :options="sizeOptions"
            />
            <TkSelect 
              v-model="selectedType" 
              label="Type" 
              :options="typeOptions"
            />
          </div>
          <div class="flex gap-4 items-center">
            <TkToggle v-model="isSign" label="Sign Style" />
            <TkToggle v-model="isFilled" label="Filled" />
          </div>
          
          <div class="mt-6 p-8 bg-gray-100 rounded flex items-center justify-center">
            <TkIcon 
              :icon="selectedIcon"
              :variant="selectedVariant"
              :size="selectedSize"
              :icon-type="selectedType"
              :sign="isSign"
              :fill="isFilled"
            />
          </div>
        </div>

      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TkCard, TkIcon, TkSelect, TkToggle } from '@takeoff-ui/vue';

// Interactive example
const selectedIcon = ref('flight');
const selectedVariant = ref('primary');
const selectedSize = ref('large');
const selectedType = ref('outlined');
const isSign = ref(false);
const isFilled = ref(false);

const iconOptions = [
  { value: 'flight', label: 'Flight' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'star', label: 'Star' },
  { value: 'favorite', label: 'Favorite' },
  { value: 'settings', label: 'Settings' },
  { value: 'home', label: 'Home' },
  { value: 'shopping_cart', label: 'Shopping Cart' },
  { value: 'local_dining', label: 'Dining' }
];

const variantOptions = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'info', label: 'Info' },
  { value: 'success', label: 'Success' },
  { value: 'warning', label: 'Warning' },
  { value: 'danger', label: 'Danger' }
];

const sizeOptions = [
  { value: 'xsmall', label: 'X-Small' },
  { value: 'small', label: 'Small' },
  { value: 'base', label: 'Base' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
  { value: 'xlarge', label: 'X-Large' },
  { value: 'xxlarge', label: 'XX-Large' }
];

const typeOptions = [
  { value: 'outlined', label: 'Outlined' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'sharp', label: 'Sharp' }
];
</script>
