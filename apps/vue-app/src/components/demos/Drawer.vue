<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Drawer Component Demo</h2>
      </template>
      
      <div class="space-y-6">
        <!-- Basic Drawer -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Drawer</h3>
          <TkButton label="Open Drawer" @tk-click="basicDrawer = true" />
          <TkDrawer
            header="Basic Drawer"
            :open="basicDrawer"
            @tk-drawer-close="basicDrawer = false"
          >
            <template #content>
              <p>This is a basic drawer with default settings. It opens from the right side.</p>
              <p class="mt-4">You can close it by clicking the close icon or clicking outside.</p>
            </template>
          </TkDrawer>
        </div>

        <!-- Position Options -->
        <div>
          <h3 class="text-lg font-medium mb-3">Drawer Positions</h3>
          <div class="flex gap-2 flex-wrap">
            <TkButton label="Top" @tk-click="handlePositionClick('top')" size="small" />
            <TkButton label="Right" @tk-click="handlePositionClick('right')" size="small" />
            <TkButton label="Bottom" @tk-click="handlePositionClick('bottom')" size="small" />
            <TkButton label="Left" @tk-click="handlePositionClick('left')" size="small" />
            <TkButton label="Full Screen" @tk-click="handlePositionClick('full-screen')" size="small" />
          </div>
          <TkDrawer
            :header="`${selectedPosition} Drawer`"
            :open="positionDrawer"
            :position="selectedPosition"
            @tk-drawer-close="positionDrawer = false"
          >
            <template #content>
              <p>This drawer opens from the {{ selectedPosition }} position.</p>
              <div v-if="selectedPosition === 'full-screen'" class="mt-4">
                <p>Full screen drawers take up the entire viewport.</p>
              </div>
            </template>
          </TkDrawer>
        </div>

        <!-- Prevent Dismiss -->
        <div>
          <h3 class="text-lg font-medium mb-3">Prevent Dismiss</h3>
          <p class="text-gray-600 mb-3">This drawer cannot be closed by clicking outside.</p>
          <TkButton label="Open Persistent Drawer" @tk-click="preventDismissDrawer = true" />
          <TkDrawer
            header="Persistent Drawer"
            :open="preventDismissDrawer"
            :prevent-dismiss="true"
            @tk-drawer-close="preventDismissDrawer = false"
          >
            <template #content>
              <p>You can only close this drawer by clicking the close button.</p>
              <p class="mt-4">Clicking outside will not dismiss it.</p>
            </template>
          </TkDrawer>
        </div>

        <!-- Header Types -->
        <div>
          <h3 class="text-lg font-medium mb-3">Header Types</h3>
          <div class="flex gap-2 flex-wrap">
            <TkButton label="Basic" @tk-click="handleHeaderTypeClick('basic')" size="small" />
            <TkButton label="Dark" @tk-click="handleHeaderTypeClick('dark')" size="small" />
            <TkButton label="Primary" @tk-click="handleHeaderTypeClick('primary')" size="small" />
            <TkButton label="Light" @tk-click="handleHeaderTypeClick('light')" size="small" />
            <TkButton label="Divided" @tk-click="handleHeaderTypeClick('divided')" size="small" />
          </div>
          <TkDrawer
            :header="`${selectedHeaderType} Header`"
            :open="headerTypeDrawer"
            :header-type="selectedHeaderType"
            @tk-drawer-close="headerTypeDrawer = false"
          >
            <template #content>
              <p>This drawer uses a {{ selectedHeaderType }} header style.</p>
            </template>
          </TkDrawer>
        </div>

        <!-- Custom Content with Slots -->
        <div>
          <h3 class="text-lg font-medium mb-3">Custom Content with Slots</h3>
          <TkButton label="Open Custom Drawer" @tk-click="customDrawer = true" />
          <TkDrawer
            :open="customDrawer"
            @tk-drawer-close="customDrawer = false"
          >
            <template #header>
              <div class="flex items-center gap-3">
                <TkIcon icon="settings" variant="primary" />
                <span class="text-xl font-semibold">Settings</span>
              </div>
            </template>
            
            <template #header-action>
              <TkButton label="Save" size="small" variant="primary" @tk-click="handleSave" />
            </template>
            
            <template #content>
              <div class="space-y-4">
                <TkToggle v-model="notifications" label="Enable Notifications" />
                <TkToggle v-model="darkMode" label="Dark Mode" />
                <TkInput v-model="username" label="Username" />
                <TkSelect 
                  v-model="language" 
                  label="Language"
                  :options="languageOptions"
                />
              </div>
            </template>
            
            <template #footer>
              <div class="flex justify-end gap-2">
                <TkButton label="Cancel" variant="neutral" @tk-click="customDrawer = false" />
                <TkButton label="Apply Changes" variant="primary" @tk-click="handleApply" />
              </div>
            </template>
          </TkDrawer>
        </div>

        <!-- Mask Variants -->
        <div>
          <h3 class="text-lg font-medium mb-3">Mask Variants</h3>
          <div class="flex gap-2 flex-wrap">
            <TkButton label="Light" @tk-click="handleMaskClick('light')" size="small" />
            <TkButton label="Base" @tk-click="handleMaskClick('base')" size="small" />
            <TkButton label="Dark" @tk-click="handleMaskClick('dark')" size="small" />
            <TkButton label="Darkest" @tk-click="handleMaskClick('darkest')" size="small" />
          </div>
          <TkDrawer
            :header="`${selectedMask} Mask`"
            :open="maskDrawer"
            :mask-variant="selectedMask"
            @tk-drawer-close="maskDrawer = false"
          >
            <template #content>
              <p>This drawer uses a {{ selectedMask }} mask variant.</p>
            </template>
          </TkDrawer>
        </div>

      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TkCard, TkDrawer, TkButton, TkIcon, TkToggle, TkInput, TkSelect } from '@takeoff-ui/vue';

// Basic drawer
const basicDrawer = ref(false);

// Position drawer
const positionDrawer = ref(false);
const selectedPosition = ref('right');

// Prevent dismiss
const preventDismissDrawer = ref(false);

// Header types
const headerTypeDrawer = ref(false);
const selectedHeaderType = ref('basic');

// Custom drawer
const customDrawer = ref(false);
const notifications = ref(true);
const darkMode = ref(false);
const username = ref('');
const language = ref('en');

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'tr', label: 'Turkish' },
  { value: 'de', label: 'German' },
  { value: 'fr', label: 'French' }
];

// Mask variants
const maskDrawer = ref(false);
const selectedMask = ref('base');

// Handlers
const handlePositionClick = (position) => {
  selectedPosition.value = position;
  positionDrawer.value = true;
};

const handleHeaderTypeClick = (type) => {
  selectedHeaderType.value = type;
  headerTypeDrawer.value = true;
};

const handleMaskClick = (mask) => {
  selectedMask.value = mask;
  maskDrawer.value = true;
};

const handleSave = () => {
  console.log('Settings saved!');
  customDrawer.value = false;
};

const handleApply = () => {
  console.log('Changes applied:', {
    notifications: notifications.value,
    darkMode: darkMode.value,
    username: username.value,
    language: language.value
  });
  customDrawer.value = false;
};
</script>
