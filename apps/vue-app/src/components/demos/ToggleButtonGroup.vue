<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">ToggleButtonGroup Component Demo</h2>
      </template>
      
      <div class="space-y-8">
        <!-- Basic ToggleButtonGroup -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic ToggleButtonGroup</h3>
          <TkToggleButtonGroup 
            :value="basicValue" 
            type="basic" 
            @tk-change="basicValue = $event.detail"
          >
            <TkToggleButton type="outlined" variant="neutral" :key="1" :value="1" label="Option One" />
            <TkToggleButton type="outlined" variant="neutral" :key="2" :value="2" label="Option Two" />
            <TkToggleButton type="outlined" variant="neutral" :key="3" :value="3" label="Option Three" />
          </TkToggleButtonGroup>
          <div class="mt-3 p-3 bg-gray-50 border rounded">
            <p class="text-sm"><strong>Selected Value:</strong> {{ basicValue || 'None' }}</p>
          </div>
        </div>

        <!-- ToggleButtonGroup Types -->
        <div>
          <h3 class="text-lg font-medium mb-3">ToggleButtonGroup Types</h3>
          <div class="space-y-6">
            <div>
              <h4 class="font-medium mb-2">Basic Type</h4>
              <TkToggleButtonGroup 
                :value="typeBasicValue" 
                type="basic" 
                @tk-change="typeBasicValue = $event.detail"
              >
                <TkToggleButton type="outlined" variant="neutral" :key="1" :value="1" label="Basic One" />
                <TkToggleButton type="outlined" variant="neutral" :key="2" :value="2" label="Basic Two" />
                <TkToggleButton type="outlined" variant="neutral" :key="3" :value="3" label="Basic Three" />
              </TkToggleButtonGroup>
              <p class="text-sm text-gray-600 mt-2">Selected: {{ typeBasicValue || 'None' }}</p>
            </div>

            <div>
              <h4 class="font-medium mb-2">Divided Type</h4>
              <TkToggleButtonGroup 
                :value="typeDividedValue" 
                type="divided" 
                @tk-change="typeDividedValue = $event.detail"
              >
                <TkToggleButton type="outlined" variant="neutral" :key="1" :value="1" label="Divided One" />
                <TkToggleButton type="outlined" variant="neutral" :key="2" :value="2" label="Divided Two" />
                <TkToggleButton type="outlined" variant="neutral" :key="3" :value="3" label="Divided Three" />
              </TkToggleButtonGroup>
              <p class="text-sm text-gray-600 mt-2">Selected: {{ typeDividedValue || 'None' }}</p>
            </div>

            <div>
              <h4 class="font-medium mb-2">Light Type</h4>
              <TkToggleButtonGroup 
                :value="typeLightValue" 
                type="light" 
                @tk-change="typeLightValue = $event.detail"
              >
                <TkToggleButton type="outlined" variant="neutral" :key="1" :value="1" label="Light One" />
                <TkToggleButton type="outlined" variant="neutral" :key="2" :value="2" label="Light Two" />
                <TkToggleButton type="outlined" variant="neutral" :key="3" :value="3" label="Light Three" />
              </TkToggleButtonGroup>
              <p class="text-sm text-gray-600 mt-2">Selected: {{ typeLightValue || 'None' }}</p>
            </div>
          </div>
        </div>

        <!-- Direction Options -->
        <div>
          <h3 class="text-lg font-medium mb-3">Direction Options</h3>
          <div class="space-y-6">
            <div>
              <h4 class="font-medium mb-2">Horizontal Direction (Default)</h4>
              <TkToggleButtonGroup 
                :value="horizontalValue" 
                type="basic" 
                direction="horizontal"
                @tk-change="horizontalValue = $event.detail"
              >
                <TkToggleButton type="outlined" variant="neutral" :key="1" :value="1" label="Left" />
                <TkToggleButton type="outlined" variant="neutral" :key="2" :value="2" label="Center" />
                <TkToggleButton type="outlined" variant="neutral" :key="3" :value="3" label="Right" />
              </TkToggleButtonGroup>
              <p class="text-sm text-gray-600 mt-2">Selected: {{ horizontalValue || 'None' }}</p>
            </div>

            <div>
              <h4 class="font-medium mb-2">Vertical Direction</h4>
              <TkToggleButtonGroup 
                :value="verticalValue" 
                type="basic" 
                direction="vertical"
                @tk-change="verticalValue = $event.detail"
              >
                <TkToggleButton type="outlined" variant="neutral" :key="1" :value="1" label="Top" />
                <TkToggleButton type="outlined" variant="neutral" :key="2" :value="2" label="Middle" />
                <TkToggleButton type="outlined" variant="neutral" :key="3" :value="3" label="Bottom" />
              </TkToggleButtonGroup>
              <p class="text-sm text-gray-600 mt-2">Selected: {{ verticalValue || 'None' }}</p>
            </div>
          </div>
        </div>

        <!-- Rounded ToggleButtonGroups -->
        <div>
          <h3 class="text-lg font-medium mb-3">Rounded ToggleButtonGroups</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-medium mb-2">Not Rounded (Default)</h4>
              <TkToggleButtonGroup 
                :value="roundedNormalValue" 
                type="basic" 
                @tk-change="roundedNormalValue = $event.detail"
              >
                <TkToggleButton type="outlined" variant="neutral" :key="1" :value="1" label="Normal" />
                <TkToggleButton type="outlined" variant="neutral" :key="2" :value="2" label="Corners" />
                <TkToggleButton type="outlined" variant="neutral" :key="3" :value="3" label="Sharp" />
              </TkToggleButtonGroup>
            </div>

            <div>
              <h4 class="font-medium mb-2">Rounded</h4>
              <TkToggleButtonGroup 
                :value="roundedValue" 
                type="basic" 
                :rounded="true"
                @tk-change="roundedValue = $event.detail"
              >
                <TkToggleButton type="outlined" variant="neutral" :key="1" :value="1" label="Rounded" />
                <TkToggleButton type="outlined" variant="neutral" :key="2" :value="2" label="Corners" />
                <TkToggleButton type="outlined" variant="neutral" :key="3" :value="3" label="Smooth" />
              </TkToggleButtonGroup>
            </div>
          </div>
        </div>

        <!-- With Icons -->
        <div>
          <h3 class="text-lg font-medium mb-3">ToggleButtonGroups with Icons</h3>
          <div class="space-y-6">
            <div>
              <h4 class="font-medium mb-2">Icons with Labels</h4>
              <TkToggleButtonGroup 
                :value="iconValue" 
                type="basic" 
                @tk-change="iconValue = $event.detail"
              >
                <TkToggleButton 
                  type="outlined" 
                  variant="neutral" 
                  :key="1" 
                  :value="1" 
                  :icon="{ name: 'view_list', fill: true }" 
                  icon-position="left" 
                  label="List View" 
                />
                <TkToggleButton 
                  type="outlined" 
                  variant="neutral" 
                  :key="2" 
                  :value="2" 
                  :icon="{ name: 'grid_view', fill: true }" 
                  icon-position="left" 
                  label="Grid View" 
                />
                <TkToggleButton 
                  type="outlined" 
                  variant="neutral" 
                  :key="3" 
                  :value="3" 
                  :icon="{ name: 'view_column', fill: true }" 
                  icon-position="left" 
                  label="Column View" 
                />
              </TkToggleButtonGroup>
              <p class="text-sm text-gray-600 mt-2">Selected: {{ iconValue || 'None' }}</p>
            </div>

            <div>
              <h4 class="font-medium mb-2">Icon Only Buttons</h4>
              <TkToggleButtonGroup 
                :value="iconOnlyValue" 
                type="basic" 
                @tk-change="iconOnlyValue = $event.detail"
              >
                <TkToggleButton 
                  type="outlined" 
                  variant="neutral" 
                  :key="1" 
                  :value="1" 
                  :icon="{ name: 'format_bold', fill: true }" 
                />
                <TkToggleButton 
                  type="outlined" 
                  variant="neutral" 
                  :key="2" 
                  :value="2" 
                  :icon="{ name: 'format_italic', fill: true }" 
                />
                <TkToggleButton 
                  type="outlined" 
                  variant="neutral" 
                  :key="3" 
                  :value="3" 
                  :icon="{ name: 'format_underlined', fill: true }" 
                />
                <TkToggleButton 
                  type="outlined" 
                  variant="neutral" 
                  :key="4" 
                  :value="4" 
                  :icon="{ name: 'format_strikethrough', fill: true }" 
                />
              </TkToggleButtonGroup>
              <p class="text-sm text-gray-600 mt-2">Selected formatting: {{ getFormattingText(iconOnlyValue) }}</p>
            </div>

            <div>
              <h4 class="font-medium mb-2">Icons on Right</h4>
              <TkToggleButtonGroup 
                :value="iconRightValue" 
                type="basic" 
                @tk-change="iconRightValue = $event.detail"
              >
                <TkToggleButton 
                  type="outlined" 
                  variant="neutral" 
                  :key="1" 
                  :value="1" 
                  :icon="{ name: 'keyboard_arrow_down', fill: true }" 
                  icon-position="right" 
                  label="Sort A-Z" 
                />
                <TkToggleButton 
                  type="outlined" 
                  variant="neutral" 
                  :key="2" 
                  :value="2" 
                  :icon="{ name: 'keyboard_arrow_up', fill: true }" 
                  icon-position="right" 
                  label="Sort Z-A" 
                />
                <TkToggleButton 
                  type="outlined" 
                  variant="neutral" 
                  :key="3" 
                  :value="3" 
                  :icon="{ name: 'date_range', fill: true }" 
                  icon-position="right" 
                  label="Sort by Date" 
                />
              </TkToggleButtonGroup>
              <p class="text-sm text-gray-600 mt-2">Selected: {{ iconRightValue || 'None' }}</p>
            </div>
          </div>
        </div>

        <!-- Different Variants -->
        <div>
          <h3 class="text-lg font-medium mb-3">Button Variants</h3>
          <div class="space-y-6">
            <div>
              <h4 class="font-medium mb-2">Neutral Variant</h4>
              <TkToggleButtonGroup 
                :value="variantNeutralValue" 
                type="basic" 
                @tk-change="variantNeutralValue = $event.detail"
              >
                <TkToggleButton type="outlined" variant="neutral" :key="1" :value="1" label="Neutral One" />
                <TkToggleButton type="outlined" variant="neutral" :key="2" :value="2" label="Neutral Two" />
                <TkToggleButton type="outlined" variant="neutral" :key="3" :value="3" label="Neutral Three" />
              </TkToggleButtonGroup>
            </div>

            <div>
              <h4 class="font-medium mb-2">Primary Variant</h4>
              <TkToggleButtonGroup 
                :value="variantPrimaryValue" 
                type="basic" 
                @tk-change="variantPrimaryValue = $event.detail"
              >
                <TkToggleButton type="outlined" variant="primary" :key="1" :value="1" label="Primary One" />
                <TkToggleButton type="outlined" variant="primary" :key="2" :value="2" label="Primary Two" />
                <TkToggleButton type="outlined" variant="primary" :key="3" :value="3" label="Primary Three" />
              </TkToggleButtonGroup>
            </div>
          </div>
        </div>

        <!-- Different Sizes -->
        <div>
          <h3 class="text-lg font-medium mb-3">Button Sizes</h3>
          <div class="space-y-6">
            <div>
              <h4 class="font-medium mb-2">Small Size</h4>
              <TkToggleButtonGroup 
                :value="sizeSmallValue" 
                type="basic" 
                @tk-change="sizeSmallValue = $event.detail"
              >
                <TkToggleButton type="outlined" variant="neutral" :key="1" :value="1" size="small" label="Small One" />
                <TkToggleButton type="outlined" variant="neutral" :key="2" :value="2" size="small" label="Small Two" />
                <TkToggleButton type="outlined" variant="neutral" :key="3" :value="3" size="small" label="Small Three" />
              </TkToggleButtonGroup>
            </div>

            <div>
              <h4 class="font-medium mb-2">Base Size (Default)</h4>
              <TkToggleButtonGroup 
                :value="sizeBaseValue" 
                type="basic" 
                @tk-change="sizeBaseValue = $event.detail"
              >
                <TkToggleButton type="outlined" variant="neutral" :key="1" :value="1" size="base" label="Base One" />
                <TkToggleButton type="outlined" variant="neutral" :key="2" :value="2" size="base" label="Base Two" />
                <TkToggleButton type="outlined" variant="neutral" :key="3" :value="3" size="base" label="Base Three" />
              </TkToggleButtonGroup>
            </div>

            <div>
              <h4 class="font-medium mb-2">Large Size</h4>
              <TkToggleButtonGroup 
                :value="sizeLargeValue" 
                type="basic" 
                @tk-change="sizeLargeValue = $event.detail"
              >
                <TkToggleButton type="outlined" variant="neutral" :key="1" :value="1" size="large" label="Large One" />
                <TkToggleButton type="outlined" variant="neutral" :key="2" :value="2" size="large" label="Large Two" />
                <TkToggleButton type="outlined" variant="neutral" :key="3" :value="3" size="large" label="Large Three" />
              </TkToggleButtonGroup>
            </div>
          </div>
        </div>

        <!-- Disabled States -->
        <div>
          <h3 class="text-lg font-medium mb-3">Disabled States</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-medium mb-2">All Disabled</h4>
              <TkToggleButtonGroup 
                :value="disabledValue" 
                type="basic" 
                @tk-change="disabledValue = $event.detail"
              >
                <TkToggleButton type="outlined" variant="neutral" :key="1" :value="1" :disabled="true" label="Disabled One" />
                <TkToggleButton type="outlined" variant="neutral" :key="2" :value="2" :disabled="true" label="Disabled Two" />
                <TkToggleButton type="outlined" variant="neutral" :key="3" :value="3" :disabled="true" label="Disabled Three" />
              </TkToggleButtonGroup>
            </div>

            <div>
              <h4 class="font-medium mb-2">Partially Disabled</h4>
              <TkToggleButtonGroup 
                :value="partialDisabledValue" 
                type="basic" 
                @tk-change="partialDisabledValue = $event.detail"
              >
                <TkToggleButton type="outlined" variant="neutral" :key="1" :value="1" label="Enabled" />
                <TkToggleButton type="outlined" variant="neutral" :key="2" :value="2" :disabled="true" label="Disabled" />
                <TkToggleButton type="outlined" variant="neutral" :key="3" :value="3" label="Enabled" />
              </TkToggleButtonGroup>
              <p class="text-sm text-gray-600 mt-2">Selected: {{ partialDisabledValue || 'None' }}</p>
            </div>
          </div>
        </div>

        <!-- Real-world Examples -->
        <div>
          <h3 class="text-lg font-medium mb-3">Real-world Examples</h3>
          <div class="space-y-6">
            <!-- Chart Type Selector -->
            <div>
              <h4 class="font-medium mb-3">Chart Type Selector</h4>
              <TkToggleButtonGroup 
                :value="chartTypeValue" 
                type="basic" 
                @tk-change="chartTypeValue = $event.detail"
              >
                <TkToggleButton 
                  type="outlined" 
                  variant="neutral" 
                  :key="1" 
                  :value="1" 
                  :icon="{ name: 'bar_chart', fill: true }" 
                  icon-position="left" 
                  label="Bar Chart" 
                />
                <TkToggleButton 
                  type="outlined" 
                  variant="neutral" 
                  :key="2" 
                  :value="2" 
                  :icon="{ name: 'show_chart', fill: true }" 
                  icon-position="left" 
                  label="Line Chart" 
                />
                <TkToggleButton 
                  type="outlined" 
                  variant="neutral" 
                  :key="3" 
                  :value="3" 
                  :icon="{ name: 'pie_chart', fill: true }" 
                  icon-position="left" 
                  label="Pie Chart" 
                />
              </TkToggleButtonGroup>
              <div class="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                <p class="text-sm">Current chart type: <strong>{{ getChartTypeName(chartTypeValue) }}</strong></p>
              </div>
            </div>

            <!-- Time Period Selector -->
            <div>
              <h4 class="font-medium mb-3">Time Period Filter</h4>
              <TkToggleButtonGroup 
                :value="timePeriodValue" 
                type="divided" 
                @tk-change="timePeriodValue = $event.detail"
              >
                <TkToggleButton type="outlined" variant="neutral" :key="1" :value="1" size="small" label="1D" />
                <TkToggleButton type="outlined" variant="neutral" :key="2" :value="2" size="small" label="1W" />
                <TkToggleButton type="outlined" variant="neutral" :key="3" :value="3" size="small" label="1M" />
                <TkToggleButton type="outlined" variant="neutral" :key="4" :value="4" size="small" label="3M" />
                <TkToggleButton type="outlined" variant="neutral" :key="5" :value="5" size="small" label="1Y" />
                <TkToggleButton type="outlined" variant="neutral" :key="6" :value="6" size="small" label="ALL" />
              </TkToggleButtonGroup>
              <div class="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                <p class="text-sm">Selected period: <strong>{{ getTimePeriodName(timePeriodValue) }}</strong></p>
              </div>
            </div>

            <!-- Layout Options -->
            <div>
              <h4 class="font-medium mb-3">Layout Options</h4>
              <TkToggleButtonGroup 
                :value="layoutValue" 
                type="light" 
                @tk-change="layoutValue = $event.detail"
              >
                <TkToggleButton 
                  type="outlined" 
                  variant="primary" 
                  :key="1" 
                  :value="1" 
                  :icon="{ name: 'view_agenda', fill: true }" 
                  icon-position="top" 
                  size="large" 
                  label="Single Column" 
                />
                <TkToggleButton 
                  type="outlined" 
                  variant="primary" 
                  :key="2" 
                  :value="2" 
                  :icon="{ name: 'view_week', fill: true }" 
                  icon-position="top" 
                  size="large" 
                  label="Two Columns" 
                />
                <TkToggleButton 
                  type="outlined" 
                  variant="primary" 
                  :key="3" 
                  :value="3" 
                  :icon="{ name: 'dashboard', fill: true }" 
                  icon-position="top" 
                  size="large" 
                  label="Grid Layout" 
                />
              </TkToggleButtonGroup>
              <div class="mt-3 p-3 bg-purple-50 border border-purple-200 rounded">
                <p class="text-sm">Current layout: <strong>{{ getLayoutName(layoutValue) }}</strong></p>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Configuration -->
        <div>
          <h3 class="text-lg font-medium mb-3">Interactive Configuration</h3>
          <div class="space-y-4">
            <div class="flex flex-wrap gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">Type:</label>
                <select v-model="configType" class="border rounded px-3 py-2">
                  <option value="basic">Basic</option>
                  <option value="divided">Divided</option>
                  <option value="light">Light</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Direction:</label>
                <select v-model="configDirection" class="border rounded px-3 py-2">
                  <option value="horizontal">Horizontal</option>
                  <option value="vertical">Vertical</option>
                </select>
              </div>

              <div class="flex items-center gap-2">
                <input type="checkbox" v-model="configRounded" id="configRounded" />
                <label for="configRounded" class="text-sm font-medium">Rounded</label>
              </div>
            </div>

            <div class="pt-4">
              <h4 class="font-medium mb-2">Configurable ToggleButtonGroup:</h4>
              <TkToggleButtonGroup 
                :value="configValue" 
                :type="configType" 
                :direction="configDirection"
                :rounded="configRounded"
                @tk-change="configValue = $event.detail"
              >
                <TkToggleButton type="outlined" variant="neutral" :key="1" :value="1" label="Config One" />
                <TkToggleButton type="outlined" variant="neutral" :key="2" :value="2" label="Config Two" />
                <TkToggleButton type="outlined" variant="neutral" :key="3" :value="3" label="Config Three" />
              </TkToggleButtonGroup>
              <p class="text-sm text-gray-600 mt-2">
                Selected: {{ configValue || 'None' }} | 
                Type: {{ configType }} | 
                Direction: {{ configDirection }} | 
                Rounded: {{ configRounded }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TkCard, TkToggleButtonGroup, TkToggleButton } from '@takeoff-ui/vue';

// Basic toggle states
const basicValue = ref(1);

// Type toggle states
const typeBasicValue = ref(2);
const typeDividedValue = ref(1);
const typeLightValue = ref(3);

// Direction toggle states
const horizontalValue = ref(2);
const verticalValue = ref(1);

// Rounded toggle states
const roundedNormalValue = ref(1);
const roundedValue = ref(2);

// Icon toggle states
const iconValue = ref(1);
const iconOnlyValue = ref(2);
const iconRightValue = ref(1);

// Variant toggle states
const variantNeutralValue = ref(1);
const variantPrimaryValue = ref(2);

// Size toggle states
const sizeSmallValue = ref(2);
const sizeBaseValue = ref(1);
const sizeLargeValue = ref(3);

// Disabled toggle states
const disabledValue = ref(null);
const partialDisabledValue = ref(1);

// Real-world example states
const chartTypeValue = ref(1);
const timePeriodValue = ref(3);
const layoutValue = ref(2);

// Interactive configuration
const configType = ref('basic');
const configDirection = ref('horizontal');
const configRounded = ref(false);
const configValue = ref(1);

// Helper methods
const getFormattingText = (value) => {
  const formats = {
    1: 'Bold',
    2: 'Italic',
    3: 'Underlined',
    4: 'Strikethrough'
  };
  return formats[value] || 'None';
};

const getChartTypeName = (value) => {
  const types = {
    1: 'Bar Chart',
    2: 'Line Chart',
    3: 'Pie Chart'
  };
  return types[value] || 'None';
};

const getTimePeriodName = (value) => {
  const periods = {
    1: 'Last 1 Day',
    2: 'Last 1 Week',
    3: 'Last 1 Month',
    4: 'Last 3 Months',
    5: 'Last 1 Year',
    6: 'All Time'
  };
  return periods[value] || 'None';
};

const getLayoutName = (value) => {
  const layouts = {
    1: 'Single Column Layout',
    2: 'Two Column Layout',
    3: 'Grid Layout'
  };
  return layouts[value] || 'None';
};
</script>