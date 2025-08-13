<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Toggle Component Demo</h2>
      </template>
      
      <div class="space-y-8">
        <!-- Basic Toggle ---->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Toggle</h3>
          <div class="space-y-4">
            <TkToggle 
              v-model="basicToggle1"
              @tk-change="handleBasicChange"
            />
            <TkToggle 
              label="Toggle with Label"
              v-model="basicToggle2"
              @tk-change="handleBasicChange"
            />
            <TkToggle 
              label="Initially On"
              v-model="basicToggle3"
              @tk-change="handleBasicChange"
            />
          </div>
          <div class="mt-4 p-4 bg-gray-50 border rounded-lg">
            <p class="text-sm">
              Toggle states: 
              Basic: {{ basicToggle1 ? 'On' : 'Off' }}, 
              With Label: {{ basicToggle2 ? 'On' : 'Off' }}, 
              Initially On: {{ basicToggle3 ? 'On' : 'Off' }}
            </p>
          </div>
        </div>

        <!-- Toggle Variants ---->
        <div>
          <h3 class="text-lg font-medium mb-3">Toggle Variants</h3>
          <div class="space-y-6">
            <div>
              <h4 class="font-medium mb-2">Info Variant (Default)</h4>
              <div class="flex gap-4">
                <TkToggle 
                  label="Info Toggle Off"
                  variant="info"
                  v-model="infoToggle1"
                />
                <TkToggle 
                  label="Info Toggle On"
                  variant="info"
                  v-model="infoToggle2"
                />
              </div>
            </div>

            <div>
              <h4 class="font-medium mb-2">Success Variant</h4>
              <div class="flex gap-4">
                <TkToggle 
                  label="Success Toggle Off"
                  variant="success"
                  v-model="successToggle1"
                />
                <TkToggle 
                  label="Success Toggle On"
                  variant="success"
                  v-model="successToggle2"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Toggle Sizes ---->
        <div>
          <h3 class="text-lg font-medium mb-3">Toggle Sizes</h3>
          <div class="flex items-center gap-6">
            <div class="text-center">
              <p class="text-sm mb-2">X Small</p>
              <TkToggle 
                size="xsmall"
                v-model="sizeToggle1"
              />
            </div>
            <div class="text-center">
              <p class="text-sm mb-2">Small</p>
              <TkToggle 
                size="small"
                v-model="sizeToggle2"
              />
            </div>
            <div class="text-center">
              <p class="text-sm mb-2">Base (Default)</p>
              <TkToggle 
                size="base"
                v-model="sizeToggle3"
              />
            </div>
            <div class="text-center">
              <p class="text-sm mb-2">Large</p>
              <TkToggle 
                size="large"
                v-model="sizeToggle4"
              />
            </div>
            <div class="text-center">
              <p class="text-sm mb-2">X Large</p>
              <TkToggle 
                size="xlarge"
                v-model="sizeToggle5"
              />
            </div>
          </div>
        </div>

        <!-- Toggle States ---->
        <div>
          <h3 class="text-lg font-medium mb-3">Toggle States</h3>
          <div class="space-y-4">
            <div class="flex gap-6">
              <TkToggle 
                label="Normal Toggle"
                v-model="normalToggle"
              />
              <TkToggle 
                label="Disabled Off"
                :disabled="true"
                :value="false"
              />
              <TkToggle 
                label="Disabled On"
                :disabled="true"
                :value="true"
              />
            </div>
            <div class="flex gap-6">
              <TkToggle 
                label="Invalid Off"
                :invalid="true"
                v-model="invalidToggle1"
              />
              <TkToggle 
                label="Invalid On"
                :invalid="true"
                v-model="invalidToggle2"
              />
            </div>
          </div>
        </div>

        <!-- Toggle Icons ---->
        <div>
          <h3 class="text-lg font-medium mb-3">Toggle Icons</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-medium mb-2">Default Icon (check)</h4>
              <div class="flex gap-4">
                <TkToggle 
                  label="Show Icon (default)"
                  :show-icon="true"
                  v-model="iconToggle1"
                />
                <TkToggle 
                  label="Hide Icon"
                  :show-icon="false"
                  v-model="iconToggle2"
                />
              </div>
            </div>

            <div>
              <h4 class="font-medium mb-2">Custom Icons</h4>
              <div class="flex gap-4">
                <TkToggle 
                  label="Star Icon"
                  icon="star"
                  v-model="iconToggle3"
                />
                <TkToggle 
                  label="Favorite Icon"
                  icon="favorite"
                  v-model="iconToggle4"
                />
                <TkToggle 
                  label="Thumb Up Icon"
                  icon="thumb_up"
                  v-model="iconToggle5"
                />
                <TkToggle 
                  label="Done Icon"
                  icon="done"
                  v-model="iconToggle6"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Form Integration ---->
        <div>
          <h3 class="text-lg font-medium mb-3">Form Integration</h3>
          <form @submit.prevent="handleFormSubmit" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TkToggle 
                name="notifications"
                label="Enable Notifications"
                v-model="formData.notifications"
              />
              <TkToggle 
                name="emailAlerts"
                label="Email Alerts"
                v-model="formData.emailAlerts"
              />
              <TkToggle 
                name="darkMode"
                label="Dark Mode"
                variant="success"
                v-model="formData.darkMode"
              />
              <TkToggle 
                name="autoSave"
                label="Auto Save"
                v-model="formData.autoSave"
              />
              <TkToggle 
                name="shareData"
                label="Share Analytics Data"
                v-model="formData.shareData"
              />
              <TkToggle 
                name="marketing"
                label="Marketing Communications"
                v-model="formData.marketing"
              />
            </div>
            
            <div class="flex gap-2">
              <TkButton type="submit" variant="primary">
                Save Settings
              </TkButton>
              <TkButton type="button" variant="outlined" @click="resetForm">
                Reset
              </TkButton>
            </div>
          </form>
          
          <div v-if="formSubmitted" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 class="font-medium text-green-800 mb-2">Settings Saved!</h4>
            <pre class="text-sm text-green-700">{{ JSON.stringify(formData, null, 2) }}</pre>
          </div>
        </div>

        <!-- Interactive Settings Panel ---->
        <div>
          <h3 class="text-lg font-medium mb-3">Interactive Settings Panel</h3>
          <div class="border rounded-lg p-6 bg-gray-50">
            <h4 class="text-lg font-semibold mb-4">User Preferences</h4>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Push Notifications</p>
                  <p class="text-sm text-gray-600">Receive notifications on your device</p>
                </div>
                <TkToggle 
                  v-model="settings.pushNotifications"
                  @tk-change="handleSettingChange('pushNotifications', $event)"
                />
              </div>
              
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Location Services</p>
                  <p class="text-sm text-gray-600">Allow location-based features</p>
                </div>
                <TkToggle 
                  variant="info"
                  v-model="settings.locationServices"
                  @tk-change="handleSettingChange('locationServices', $event)"
                />
              </div>
              
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Auto-sync Data</p>
                  <p class="text-sm text-gray-600">Automatically sync your data across devices</p>
                </div>
                <TkToggle 
                  variant="success"
                  v-model="settings.autoSync"
                  @tk-change="handleSettingChange('autoSync', $event)"
                />
              </div>
              
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Analytics & Reporting</p>
                  <p class="text-sm text-gray-600">Help improve our service by sharing usage data</p>
                </div>
                <TkToggle 
                  v-model="settings.analytics"
                  @tk-change="handleSettingChange('analytics', $event)"
                />
              </div>
              
              <div class="flex items-center justify-between opacity-50">
                <div>
                  <p class="font-medium">Beta Features</p>
                  <p class="text-sm text-gray-600">Get early access to new features</p>
                </div>
                <TkToggle 
                  :disabled="true"
                  :value="false"
                />
              </div>
            </div>
          </div>
          
          <div v-if="settingsLog.length > 0" class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 class="font-medium mb-2">Settings Changes:</h4>
            <div class="space-y-1 max-h-32 overflow-y-auto">
              <div v-for="(change, index) in settingsLog" :key="index" class="text-sm text-gray-700">
                {{ change }}
              </div>
            </div>
          </div>
        </div>

        <!-- Event Handling Demo ---->
        <div>
          <h3 class="text-lg font-medium mb-3">Event Handling</h3>
          <div class="flex gap-4">
            <TkToggle 
              label="Track Events"
              icon="event"
              v-model="eventToggle1"
              @tk-change="handleEventToggle"
            />
            <TkToggle 
              label="Monitor Changes"
              icon="monitor"
              variant="success"
              v-model="eventToggle2"
              @tk-change="handleEventToggle"
            />
          </div>
          
          <div v-if="eventLog.length > 0" class="mt-4 p-4 bg-gray-50 border rounded-lg">
            <h4 class="font-medium mb-2">Event Log:</h4>
            <div class="space-y-1 max-h-32 overflow-y-auto">
              <div v-for="(event, index) in eventLog" :key="index" class="text-sm text-gray-700">
                {{ event }}
              </div>
            </div>
            <TkButton 
              size="small" 
              variant="outlined" 
              @click="eventLog = []" 
              class="mt-2"
            >
              Clear Log
            </TkButton>
          </div>
        </div>

        <!-- Advanced Examples ---->
        <div>
          <h3 class="text-lg font-medium mb-3">Advanced Examples</h3>
          <div class="space-y-6">
            <!-- Feature Toggle Group -->
            <div>
              <h4 class="font-medium mb-3">Feature Toggles</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                <div>
                  <TkToggle 
                    label="Advanced Search"
                    v-model="features.advancedSearch"
                    size="small"
                  />
                  <p class="text-xs text-gray-500 mt-1">Enhanced search capabilities</p>
                </div>
                <div>
                  <TkToggle 
                    label="Real-time Updates"
                    v-model="features.realTimeUpdates"
                    variant="info"
                    size="small"
                  />
                  <p class="text-xs text-gray-500 mt-1">Live data synchronization</p>
                </div>
                <div>
                  <TkToggle 
                    label="Experimental UI"
                    v-model="features.experimentalUI"
                    variant="success"
                    size="small"
                  />
                  <p class="text-xs text-gray-500 mt-1">Beta interface features</p>
                </div>
              </div>
            </div>

            <!-- Conditional Content -->
            <div>
              <h4 class="font-medium mb-3">Conditional Content Display</h4>
              <div class="space-y-2">
                <TkToggle 
                  label="Show Advanced Options"
                  v-model="showAdvanced"
                />
                <div v-if="showAdvanced" class="ml-6 p-4 border-l-4 border-blue-200 bg-blue-50">
                  <h5 class="font-medium mb-2">Advanced Configuration</h5>
                  <div class="space-y-2">
                    <TkToggle label="Debug Mode" v-model="advancedOptions.debug" size="small" />
                    <TkToggle label="Verbose Logging" v-model="advancedOptions.verbose" size="small" />
                    <TkToggle label="Performance Monitoring" v-model="advancedOptions.performance" size="small" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { TkCard, TkToggle, TkButton } from '@takeoff-ui/vue';

// Basic toggle states
const basicToggle1 = ref(false);
const basicToggle2 = ref(false);
const basicToggle3 = ref(true);

// Variant toggle states
const infoToggle1 = ref(false);
const infoToggle2 = ref(true);
const successToggle1 = ref(false);
const successToggle2 = ref(true);

// Size toggle states
const sizeToggle1 = ref(false);
const sizeToggle2 = ref(false);
const sizeToggle3 = ref(true);
const sizeToggle4 = ref(false);
const sizeToggle5 = ref(true);

// State toggle states
const normalToggle = ref(false);
const invalidToggle1 = ref(false);
const invalidToggle2 = ref(true);

// Icon toggle states
const iconToggle1 = ref(true);
const iconToggle2 = ref(false);
const iconToggle3 = ref(false);
const iconToggle4 = ref(true);
const iconToggle5 = ref(false);
const iconToggle6 = ref(true);

// Form data
const formData = reactive({
  notifications: true,
  emailAlerts: false,
  darkMode: true,
  autoSave: true,
  shareData: false,
  marketing: false
});

const formSubmitted = ref(false);

// Settings data
const settings = reactive({
  pushNotifications: true,
  locationServices: false,
  autoSync: true,
  analytics: false
});

const settingsLog = ref([]);

// Feature toggles
const features = reactive({
  advancedSearch: false,
  realTimeUpdates: true,
  experimentalUI: false
});

// Advanced options
const showAdvanced = ref(false);
const advancedOptions = reactive({
  debug: false,
  verbose: false,
  performance: true
});

// Event handling
const eventToggle1 = ref(false);
const eventToggle2 = ref(false);
const eventLog = ref([]);

// Methods
const handleBasicChange = (event) => {
  console.log('Toggle changed:', event.detail);
};

const handleFormSubmit = () => {
  formSubmitted.value = true;
  console.log('Form submitted:', formData);
  
  setTimeout(() => {
    formSubmitted.value = false;
  }, 3000);
};

const resetForm = () => {
  Object.keys(formData).forEach(key => {
    formData[key] = false;
  });
  formSubmitted.value = false;
};

const handleSettingChange = (setting, event) => {
  const timestamp = new Date().toLocaleTimeString();
  const status = event.detail ? 'enabled' : 'disabled';
  settingsLog.value.unshift(`${timestamp}: ${setting} ${status}`);
  
  // Keep only last 5 changes
  if (settingsLog.value.length > 5) {
    settingsLog.value = settingsLog.value.slice(0, 5);
  }
};

const handleEventToggle = (event) => {
  const timestamp = new Date().toLocaleTimeString();
  const status = event.detail ? 'ON' : 'OFF';
  eventLog.value.unshift(`${timestamp}: Toggle switched ${status}`);
  
  // Keep only last 8 events
  if (eventLog.value.length > 8) {
    eventLog.value = eventLog.value.slice(0, 8);
  }
};
</script>