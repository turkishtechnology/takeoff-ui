<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Avatar Component Demo</h2>
      </template>
      
      <div class="space-y-6">
        <!-- Basic Avatars -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Avatars</h3>
          <div class="flex items-center gap-4">
            <TkAvatar label="JS" />
            <TkAvatar label="AD" rounded />
            <TkAvatar />
          </div>
        </div>

        <!-- Avatar Sizes -->
        <div>
          <h3 class="text-lg font-medium mb-3">Avatar Sizes</h3>
          <div class="flex items-center gap-4">
            <TkAvatar size="xlarge" rounded label="XL" />
            <TkAvatar size="large" rounded label="L" />
            <TkAvatar size="base" rounded label="M" />
            <TkAvatar size="small" rounded label="S" />
            <TkAvatar size="xsmall" rounded label="XS" />
          </div>
        </div>

        <!-- Avatar Variants -->
        <div>
          <h3 class="text-lg font-medium mb-3">Avatar Variants</h3>
          <div class="flex items-center gap-4">
            <TkAvatar background="solid" variant="primary" label="PR" />
            <TkAvatar background="solid" variant="light" label="LT" />
            <TkAvatar background="solid" variant="success" label="SC" />
            <TkAvatar background="solid" variant="info" label="IN" />
            <TkAvatar background="solid" variant="warning" label="WN" />
            <TkAvatar background="solid" variant="danger" label="DG" />
          </div>
        </div>

        <!-- Avatars with Images -->
        <div>
          <h3 class="text-lg font-medium mb-3">Avatars with Images</h3>
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <TkAvatar image="https://via.placeholder.com/40" background="solid" variant="primary" rounded />
              <TkAvatar image="https://via.placeholder.com/40" background="solid" variant="light" rounded />
              <TkAvatar image="https://via.placeholder.com/40" background="solid" variant="success" rounded />
              <TkAvatar image="https://via.placeholder.com/40" background="solid" variant="info" rounded />
              <TkAvatar image="https://via.placeholder.com/40" background="solid" variant="danger" rounded />
            </div>
            <div class="flex items-center gap-4">
              <TkAvatar image="https://via.placeholder.com/40" background="solid" variant="primary" />
              <TkAvatar image="https://via.placeholder.com/40" background="solid" variant="light" />
              <TkAvatar image="https://via.placeholder.com/40" background="solid" variant="success" />
              <TkAvatar image="https://via.placeholder.com/40" background="solid" variant="info" />
              <TkAvatar image="https://via.placeholder.com/40" background="solid" variant="danger" />
            </div>
          </div>
        </div>

        <!-- Avatars with Badges -->
        <div>
          <h3 class="text-lg font-medium mb-3">Avatars with Badges</h3>
          <div class="flex items-center gap-4">
            <TkAvatar image="https://via.placeholder.com/40" background="solid" badge badge-status="success" rounded />
            <TkAvatar image="https://via.placeholder.com/40" badge badge-status="warning" rounded />
            <TkAvatar label="AD" badge badge-status="danger" rounded />
          </div>
        </div>

        <!-- Avatar Group -->
        <div>
          <h3 class="text-lg font-medium mb-3">Avatar Group</h3>
          <div class="space-y-4">
            <div>
              <h4 class="text-md font-medium mb-2">Normal Avatar Group</h4>
              <TkAvatarGroup>
                <TkAvatar image="https://via.placeholder.com/40" variant="primary" background="solid" rounded />
                <TkAvatar image="https://via.placeholder.com/40" variant="light" background="solid" rounded />
                <TkAvatar image="https://via.placeholder.com/40" variant="success" background="solid" rounded />
                <TkAvatar image="https://via.placeholder.com/40" variant="info" background="solid" rounded label="TK" />
                <TkAvatar variant="light" background="solid" rounded label="+4" />
              </TkAvatarGroup>
            </div>
            <div>
              <h4 class="text-md font-medium mb-2">Compact Avatar Group</h4>
              <TkAvatarGroup compact>
                <TkAvatar image="https://via.placeholder.com/40" variant="primary" background="solid" rounded />
                <TkAvatar image="https://via.placeholder.com/40" variant="light" background="solid" rounded />
                <TkAvatar image="https://via.placeholder.com/40" variant="success" background="solid" rounded />
                <TkAvatar image="https://via.placeholder.com/40" variant="info" background="solid" rounded label="TK" />
                <TkAvatar variant="light" background="solid" rounded label="+4" />
              </TkAvatarGroup>
            </div>
          </div>
        </div>

        <!-- Interactive Example -->
        <div>
          <h3 class="text-lg font-medium mb-3">Interactive Example</h3>
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="showBadge" class="rounded">
                Show Badge
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="isRounded" class="rounded">
                Rounded
              </label>
              <select v-model="selectedSize" class="px-3 py-1 border rounded">
                <option value="xsmall">XSmall</option>
                <option value="small">Small</option>
                <option value="base">Base</option>
                <option value="large">Large</option>
                <option value="xlarge">XLarge</option>
              </select>
              <select v-model="selectedVariant" class="px-3 py-1 border rounded">
                <option value="primary">Primary</option>
                <option value="light">Light</option>
                <option value="success">Success</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="danger">Danger</option>
              </select>
            </div>
            <TkAvatar 
              :size="selectedSize"
              :variant="selectedVariant"
              :rounded="isRounded"
              :badge="showBadge"
              badge-status="success"
              background="solid"
              label="JS"
            />
          </div>
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TkCard, TkAvatar, TkAvatarGroup } from '@takeoff-ui/vue';

const showBadge = ref(false);
const isRounded = ref(true);
const selectedSize = ref('base');
const selectedVariant = ref('primary');
</script>
