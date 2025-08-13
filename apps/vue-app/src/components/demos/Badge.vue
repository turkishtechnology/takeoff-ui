<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Badge Component Demo</h2>
      </template>
      
      <div class="space-y-6">
        <!-- Badge Variants -->
        <div>
          <h3 class="text-lg font-medium mb-3">Badge Variants</h3>
          <div class="flex flex-wrap gap-3">
            <TkBadge variant="primary" label="primary" />
            <TkBadge variant="secondary" label="secondary" />
            <TkBadge variant="neutral" label="neutral" />
            <TkBadge variant="info" label="info" />
            <TkBadge variant="warning" label="warning" />
            <TkBadge variant="success" label="success" />
            <TkBadge variant="danger" label="danger" />
            <TkBadge variant="verified" label="verified" />
            <TkBadge variant="purple" label="purple" />
            <TkBadge variant="cyan" label="cyan" />
            <TkBadge variant="business" label="business" />
          </div>
        </div>

        <!-- Badge Types -->
        <div>
          <h3 class="text-lg font-medium mb-3">Badge Types</h3>
          <div class="flex flex-wrap gap-3">
            <TkBadge variant="primary" type="filled" label="filled" />
            <TkBadge variant="primary" type="filledlight" label="filledlight" />
            <TkBadge variant="primary" type="outlined" label="outlined" />
            <TkBadge variant="primary" type="text" label="text" />
          </div>
        </div>

        <!-- Badge Sizes -->
        <div>
          <h3 class="text-lg font-medium mb-3">Badge Sizes</h3>
          <div class="flex items-center gap-3">
            <TkBadge variant="primary" size="large" type="filledlight" label="large" />
            <TkBadge variant="primary" size="base" type="filledlight" label="base" />
            <TkBadge variant="primary" size="small" type="filledlight" label="small" />
          </div>
        </div>

        <!-- Badge with Icons -->
        <div>
          <h3 class="text-lg font-medium mb-3">Badge with Icons</h3>
          <div class="flex flex-wrap gap-3">
            <TkBadge variant="primary" size="large" type="filled" icon="flight" label="primary" />
            <TkBadge variant="primary" size="large" type="filled" icon="flight" icon-position="right" label="primary" />
            <TkBadge variant="success" icon="check" label="verified" />
            <TkBadge variant="warning" icon="warning" label="warning" />
            <TkBadge variant="info" icon="info" label="information" />
          </div>
        </div>

        <!-- Badge with Count -->
        <div>
          <h3 class="text-lg font-medium mb-3">Badge with Count</h3>
          <div class="flex items-center gap-3">
            <TkBadge variant="purple" size="large" type="filledlight" count="11" rounded />
            <TkBadge variant="purple" size="base" type="filledlight" count="5" rounded />
            <TkBadge variant="purple" size="small" type="filledlight" count="99+" rounded />
          </div>
        </div>

        <!-- Floating Badges -->
        <div>
          <h3 class="text-lg font-medium mb-3">Floating Badges</h3>
          <div class="flex items-center gap-6">
            <TkBadge variant="danger" type="filled" dot>
              <div style="width: 40px; height: 40px; background-color: #e5e7eb; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                📧
              </div>
            </TkBadge>
            <TkBadge variant="secondary" size="small" type="filled" count="4" rounded>
              <div style="width: 40px; height: 40px; background-color: #e5e7eb; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                🔔
              </div>
            </TkBadge>
            <TkBadge variant="success" type="filled" count="12">
              <div style="width: 40px; height: 40px; background-color: #e5e7eb; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                💬
              </div>
            </TkBadge>
          </div>
        </div>

        <!-- Rounded Badges -->
        <div>
          <h3 class="text-lg font-medium mb-3">Rounded Badges</h3>
          <div class="flex flex-wrap gap-3">
            <TkBadge variant="primary" label="rounded" rounded />
            <TkBadge variant="success" label="success" rounded />
            <TkBadge variant="warning" count="5" rounded />
            <TkBadge variant="danger" icon="warning" label="alert" rounded />
          </div>
        </div>

        <!-- Interactive Badge Example -->
        <div>
          <h3 class="text-lg font-medium mb-3">Interactive Badge</h3>
          <div class="space-y-4">
            <div class="flex flex-wrap gap-4">
              <select v-model="selectedVariant" class="px-3 py-2 border rounded">
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="danger">Danger</option>
                <option value="info">Info</option>
              </select>
              <select v-model="selectedType" class="px-3 py-2 border rounded">
                <option value="filled">Filled</option>
                <option value="filledlight">Filled Light</option>
                <option value="outlined">Outlined</option>
                <option value="text">Text</option>
              </select>
              <select v-model="selectedSize" class="px-3 py-2 border rounded">
                <option value="small">Small</option>
                <option value="base">Base</option>
                <option value="large">Large</option>
              </select>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="showIcon" class="rounded">
                Show Icon
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="isRounded" class="rounded">
                Rounded
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="showCount" class="rounded">
                Show Count
              </label>
            </div>
            <TkBadge 
              :variant="selectedVariant"
              :type="selectedType"
              :size="selectedSize"
              :icon="showIcon ? 'star' : null"
              :rounded="isRounded"
              :count="showCount ? badgeCount : null"
              :label="showCount ? null : 'Custom Badge'"
            />
            <div v-if="showCount" class="flex items-center gap-2">
              <label>Count:</label>
              <input 
                type="number" 
                v-model="badgeCount" 
                min="0" 
                max="999" 
                class="px-2 py-1 border rounded w-20"
              >
            </div>
          </div>
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TkCard, TkBadge } from '@takeoff-ui/vue';

const selectedVariant = ref('primary');
const selectedType = ref('filled');
const selectedSize = ref('base');
const showIcon = ref(false);
const isRounded = ref(false);
const showCount = ref(false);
const badgeCount = ref(5);
</script>
