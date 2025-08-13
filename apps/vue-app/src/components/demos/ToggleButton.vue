<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">ToggleButton Component Demo</h2>
      </template>
      
      <div class="space-y-8">
        <!-- Basic Toggle Buttons -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Toggle Buttons</h3>
          <div class="flex flex-wrap gap-4">
            <TkToggleButton 
              label="Toggle Me"
              :selected="basicToggle1"
              @tk-toggle="basicToggle1 = $event.detail"
            />
            <TkToggleButton 
              label="With Icon"
              icon="star"
              :selected="basicToggle2"
              @tk-toggle="basicToggle2 = $event.detail"
            />
            <TkToggleButton 
              label="Right Icon"
              icon="favorite"
              icon-position="right"
              :selected="basicToggle3"
              @tk-toggle="basicToggle3 = $event.detail"
            />
          </div>
          <div class="mt-4 p-4 bg-gray-50 border rounded-lg">
            <p class="text-sm">
              Toggle states: 
              Button 1: {{ basicToggle1 ? 'Selected' : 'Not selected' }}, 
              Button 2: {{ basicToggle2 ? 'Selected' : 'Not selected' }}, 
              Button 3: {{ basicToggle3 ? 'Selected' : 'Not selected' }}
            </p>
          </div>
        </div>

        <!-- Toggle Button Types -->
        <div>
          <h3 class="text-lg font-medium mb-3">Toggle Button Types</h3>
          <div class="space-y-6">
            <div>
              <h4 class="font-medium mb-2">Filled Type (Default)</h4>
              <div class="flex gap-4">
                <TkToggleButton 
                  label="Filled"
                  type="filled"
                  :selected="filledToggle"
                  @tk-toggle="filledToggle = $event.detail"
                />
                <TkToggleButton 
                  label="With Icon"
                  icon="check"
                  type="filled"
                  :selected="filledToggleIcon"
                  @tk-toggle="filledToggleIcon = $event.detail"
                />
              </div>
            </div>

            <div>
              <h4 class="font-medium mb-2">Filled Light Type</h4>
              <div class="flex gap-4">
                <TkToggleButton 
                  label="Filled Light"
                  type="filled-light"
                  :selected="filledLightToggle"
                  @tk-toggle="filledLightToggle = $event.detail"
                />
                <TkToggleButton 
                  label="With Icon"
                  icon="lightbulb"
                  type="filled-light"
                  :selected="filledLightToggleIcon"
                  @tk-toggle="filledLightToggleIcon = $event.detail"
                />
              </div>
            </div>

            <div>
              <h4 class="font-medium mb-2">Outlined Type</h4>
              <div class="flex gap-4">
                <TkToggleButton 
                  label="Outlined"
                  type="outlined"
                  :selected="outlinedToggle"
                  @tk-toggle="outlinedToggle = $event.detail"
                />
                <TkToggleButton 
                  label="With Icon"
                  icon="border_all"
                  type="outlined"
                  :selected="outlinedToggleIcon"
                  @tk-toggle="outlinedToggleIcon = $event.detail"
                />
              </div>
            </div>

            <div>
              <h4 class="font-medium mb-2">Raised Type</h4>
              <div class="flex gap-4">
                <TkToggleButton 
                  label="Raised"
                  type="raised"
                  :selected="raisedToggle"
                  @tk-toggle="raisedToggle = $event.detail"
                />
                <TkToggleButton 
                  label="With Icon"
                  icon="expand_less"
                  type="raised"
                  :selected="raisedToggleIcon"
                  @tk-toggle="raisedToggleIcon = $event.detail"
                />
              </div>
            </div>

            <div>
              <h4 class="font-medium mb-2">Text Type</h4>
              <div class="flex gap-4">
                <TkToggleButton 
                  label="Text"
                  type="text"
                  :selected="textToggle"
                  @tk-toggle="textToggle = $event.detail"
                />
                <TkToggleButton 
                  label="With Icon"
                  icon="text_fields"
                  type="text"
                  :selected="textToggleIcon"
                  @tk-toggle="textToggleIcon = $event.detail"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Toggle Button Variants -->
        <div>
          <h3 class="text-lg font-medium mb-3">Toggle Button Variants</h3>
          <div class="space-y-6">
            <div>
              <h4 class="font-medium mb-2">Primary Variant</h4>
              <div class="flex gap-4">
                <TkToggleButton 
                  label="Primary"
                  variant="primary"
                  :selected="primaryToggle"
                  @tk-toggle="primaryToggle = $event.detail"
                />
                <TkToggleButton 
                  label="Primary Outlined"
                  type="outlined"
                  variant="primary"
                  :selected="primaryOutlinedToggle"
                  @tk-toggle="primaryOutlinedToggle = $event.detail"
                />
                <TkToggleButton 
                  label="Primary Text"
                  type="text"
                  variant="primary"
                  :selected="primaryTextToggle"
                  @tk-toggle="primaryTextToggle = $event.detail"
                />
              </div>
            </div>

            <div>
              <h4 class="font-medium mb-2">Neutral Variant</h4>
              <div class="flex gap-4">
                <TkToggleButton 
                  label="Neutral"
                  variant="neutral"
                  :selected="neutralToggle"
                  @tk-toggle="neutralToggle = $event.detail"
                />
                <TkToggleButton 
                  label="Neutral Outlined"
                  type="outlined"
                  variant="neutral"
                  :selected="neutralOutlinedToggle"
                  @tk-toggle="neutralOutlinedToggle = $event.detail"
                />
                <TkToggleButton 
                  label="Neutral Text"
                  type="text"
                  variant="neutral"
                  :selected="neutralTextToggle"
                  @tk-toggle="neutralTextToggle = $event.detail"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Toggle Button Sizes -->
        <div>
          <h3 class="text-lg font-medium mb-3">Toggle Button Sizes</h3>
          <div class="flex items-end gap-4">
            <div class="text-center">
              <p class="text-sm mb-2">Small</p>
              <TkToggleButton 
                label="Small"
                size="small"
                :selected="smallSizeToggle"
                @tk-toggle="smallSizeToggle = $event.detail"
              />
            </div>
            <div class="text-center">
              <p class="text-sm mb-2">Base (Default)</p>
              <TkToggleButton 
                label="Base"
                size="base"
                :selected="baseSizeToggle"
                @tk-toggle="baseSizeToggle = $event.detail"
              />
            </div>
            <div class="text-center">
              <p class="text-sm mb-2">Large</p>
              <TkToggleButton 
                label="Large"
                size="large"
                :selected="largeSizeToggle"
                @tk-toggle="largeSizeToggle = $event.detail"
              />
            </div>
          </div>
        </div>

        <!-- Rounded Toggle Buttons -->
        <div>
          <h3 class="text-lg font-medium mb-3">Rounded Toggle Buttons (Icon Only)</h3>
          <div class="flex gap-4">
            <TkToggleButton 
              icon="favorite"
              :rounded="true"
              :selected="roundedToggle1"
              @tk-toggle="roundedToggle1 = $event.detail"
            />
            <TkToggleButton 
              icon="bookmark"
              :rounded="true"
              variant="primary"
              :selected="roundedToggle2"
              @tk-toggle="roundedToggle2 = $event.detail"
            />
            <TkToggleButton 
              icon="thumb_up"
              :rounded="true"
              type="outlined"
              :selected="roundedToggle3"
              @tk-toggle="roundedToggle3 = $event.detail"
            />
            <TkToggleButton 
              icon="share"
              :rounded="true"
              size="small"
              :selected="roundedToggle4"
              @tk-toggle="roundedToggle4 = $event.detail"
            />
            <TkToggleButton 
              icon="notifications"
              :rounded="true"
              size="large"
              variant="primary"
              :selected="roundedToggle5"
              @tk-toggle="roundedToggle5 = $event.detail"
            />
          </div>
          <div class="mt-4 p-4 bg-gray-50 border rounded-lg">
            <p class="text-sm">
              Rounded button states: 
              Favorite: {{ roundedToggle1 ? '❤️' : '🤍' }}, 
              Bookmark: {{ roundedToggle2 ? '🔖' : '🏷️' }}, 
              Like: {{ roundedToggle3 ? '👍' : '👎' }}, 
              Share: {{ roundedToggle4 ? '📤' : '📥' }}, 
              Notify: {{ roundedToggle5 ? '🔔' : '🔕' }}
            </p>
          </div>
        </div>

        <!-- Disabled Toggle Buttons -->
        <div>
          <h3 class="text-lg font-medium mb-3">Disabled Toggle Buttons</h3>
          <div class="flex gap-4">
            <TkToggleButton 
              label="Disabled Off"
              :disabled="true"
              :selected="false"
            />
            <TkToggleButton 
              label="Disabled On"
              :disabled="true"
              :selected="true"
            />
            <TkToggleButton 
              icon="block"
              label="Disabled with Icon"
              :disabled="true"
              :selected="false"
            />
            <TkToggleButton 
              icon="lock"
              :rounded="true"
              :disabled="true"
              :selected="false"
            />
          </div>
        </div>

        <!-- Toggle Button Groups -->
        <div>
          <h3 class="text-lg font-medium mb-3">Toggle Button Groups</h3>
          <div class="space-y-6">
            <div>
              <h4 class="font-medium mb-2">View Options</h4>
              <div class="flex gap-1">
                <TkToggleButton 
                  icon="view_list"
                  type="outlined"
                  :selected="viewMode === 'list'"
                  @tk-toggle="viewMode = $event.detail ? 'list' : null"
                />
                <TkToggleButton 
                  icon="view_module"
                  type="outlined"
                  :selected="viewMode === 'grid'"
                  @tk-toggle="viewMode = $event.detail ? 'grid' : null"
                />
                <TkToggleButton 
                  icon="view_column"
                  type="outlined"
                  :selected="viewMode === 'column'"
                  @tk-toggle="viewMode = $event.detail ? 'column' : null"
                />
              </div>
              <p class="mt-2 text-sm text-gray-600">Current view mode: {{ viewMode || 'None' }}</p>
            </div>

            <div>
              <h4 class="font-medium mb-2">Text Formatting</h4>
              <div class="flex gap-1">
                <TkToggleButton 
                  icon="format_bold"
                  type="outlined"
                  size="small"
                  :selected="formatting.bold"
                  @tk-toggle="formatting.bold = $event.detail"
                />
                <TkToggleButton 
                  icon="format_italic"
                  type="outlined"
                  size="small"
                  :selected="formatting.italic"
                  @tk-toggle="formatting.italic = $event.detail"
                />
                <TkToggleButton 
                  icon="format_underlined"
                  type="outlined"
                  size="small"
                  :selected="formatting.underline"
                  @tk-toggle="formatting.underline = $event.detail"
                />
                <TkToggleButton 
                  icon="format_strikethrough"
                  type="outlined"
                  size="small"
                  :selected="formatting.strikethrough"
                  @tk-toggle="formatting.strikethrough = $event.detail"
                />
              </div>
              <div class="mt-2">
                <span 
                  class="text-sm"
                  :class="{
                    'font-bold': formatting.bold,
                    'italic': formatting.italic,
                    'underline': formatting.underline,
                    'line-through': formatting.strikethrough
                  }"
                >
                  Sample text with formatting applied
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Event Handling Demo -->
        <div>
          <h3 class="text-lg font-medium mb-3">Event Handling</h3>
          <div class="flex gap-4">
            <TkToggleButton 
              label="Track Events"
              icon="event"
              :selected="eventToggle"
              @tk-toggle="handleToggleEvent"
            />
            <TkToggleButton 
              label="Monitor Changes"
              icon="monitor"
              variant="primary"
              :selected="monitorToggle"
              @tk-toggle="handleMonitorEvent"
            />
          </div>
          
          <div v-if="eventLog.length > 0" class="mt-4 p-4 bg-gray-50 border rounded-lg">
            <h4 class="font-medium mb-2">Event Log:</h4>
            <div class="space-y-1 max-h-32 overflow-y-auto">
              <div v-for="(event, index) in eventLog" :key="index" class="text-sm text-gray-700">
                {{ event }}
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
import { TkCard, TkToggleButton } from '@takeoff-ui/vue';

// Basic toggle states
const basicToggle1 = ref(false);
const basicToggle2 = ref(true);
const basicToggle3 = ref(false);

// Type toggle states
const filledToggle = ref(false);
const filledToggleIcon = ref(false);
const filledLightToggle = ref(false);
const filledLightToggleIcon = ref(false);
const outlinedToggle = ref(false);
const outlinedToggleIcon = ref(false);
const raisedToggle = ref(false);
const raisedToggleIcon = ref(false);
const textToggle = ref(false);
const textToggleIcon = ref(false);

// Variant toggle states
const primaryToggle = ref(false);
const primaryOutlinedToggle = ref(false);
const primaryTextToggle = ref(false);
const neutralToggle = ref(false);
const neutralOutlinedToggle = ref(false);
const neutralTextToggle = ref(false);

// Size toggle states
const smallSizeToggle = ref(false);
const baseSizeToggle = ref(false);
const largeSizeToggle = ref(false);

// Rounded toggle states
const roundedToggle1 = ref(false);
const roundedToggle2 = ref(true);
const roundedToggle3 = ref(false);
const roundedToggle4 = ref(false);
const roundedToggle5 = ref(false);

// Group toggle states
const viewMode = ref('list');
const formatting = reactive({
  bold: false,
  italic: false,
  underline: false,
  strikethrough: false
});

// Event handling
const eventToggle = ref(false);
const monitorToggle = ref(false);
const eventLog = ref([]);

// Event handlers
const handleToggleEvent = (event) => {
  eventToggle.value = event.detail;
  const timestamp = new Date().toLocaleTimeString();
  eventLog.value.unshift(`${timestamp}: Track Events toggled to ${event.detail}`);
  
  // Keep only last 5 events
  if (eventLog.value.length > 5) {
    eventLog.value = eventLog.value.slice(0, 5);
  }
};

const handleMonitorEvent = (event) => {
  monitorToggle.value = event.detail;
  const timestamp = new Date().toLocaleTimeString();
  eventLog.value.unshift(`${timestamp}: Monitor Changes toggled to ${event.detail}`);
  
  // Keep only last 5 events
  if (eventLog.value.length > 5) {
    eventLog.value = eventLog.value.slice(0, 5);
  }
};
</script>
