<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Dropdown Component Demo</h2>
      </template>
      
      <div class="space-y-6">
        <!-- Basic Dropdown -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Dropdown</h3>
          <div class="flex gap-4 flex-wrap">
            <TkDropdown :options="basicOptions" @tk-item-click="handleBasicClick">
              <TkButton
                label="Select Option"
                icon="keyboard_arrow_down"
                icon-position="right"
                slot="trigger"
              />
            </TkDropdown>
            
            <TkDropdown :options="basicOptions" @tk-item-click="handleBasicClick">
              <TkButton
                label="Choose Item"
                variant="secondary"
                icon="keyboard_arrow_down"
                icon-position="right"
                slot="trigger"
              />
            </TkDropdown>
          </div>
          <div class="mt-2 text-sm text-gray-600">
            Last selected: {{ lastSelected || 'None' }}
          </div>
        </div>

        <!-- Dropdown Positions -->
        <div>
          <h3 class="text-lg font-medium mb-3">Dropdown Positions</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <!-- Bottom positions -->
            <TkDropdown :options="basicOptions" position="bottom">
              <TkButton label="Bottom" slot="trigger" />
            </TkDropdown>
            <TkDropdown :options="basicOptions" position="bottom-start">
              <TkButton label="Bottom Start" slot="trigger" />
            </TkDropdown>
            <TkDropdown :options="basicOptions" position="bottom-end">
              <TkButton label="Bottom End" slot="trigger" />
            </TkDropdown>
            
            <!-- Right positions -->
            <TkDropdown :options="basicOptions" position="right">
              <TkButton label="Right" slot="trigger" />
            </TkDropdown>
            <TkDropdown :options="basicOptions" position="right-start">
              <TkButton label="Right Start" slot="trigger" />
            </TkDropdown>
            <TkDropdown :options="basicOptions" position="right-end">
              <TkButton label="Right End" slot="trigger" />
            </TkDropdown>

            <!-- Top positions -->
            <TkDropdown :options="basicOptions" position="top">
              <TkButton label="Top" slot="trigger" />
            </TkDropdown>
            <TkDropdown :options="basicOptions" position="top-start">
              <TkButton label="Top Start" slot="trigger" />
            </TkDropdown>
            <TkDropdown :options="basicOptions" position="top-end">
              <TkButton label="Top End" slot="trigger" />
            </TkDropdown>

            <!-- Left positions -->
            <TkDropdown :options="basicOptions" position="left">
              <TkButton label="Left" slot="trigger" />
            </TkDropdown>
            <TkDropdown :options="basicOptions" position="left-start">
              <TkButton label="Left Start" slot="trigger" />
            </TkDropdown>
            <TkDropdown :options="basicOptions" position="left-end">
              <TkButton label="Left End" slot="trigger" />
            </TkDropdown>
          </div>
        </div>

        <!-- Custom Options -->
        <div>
          <h3 class="text-lg font-medium mb-3">Custom Options</h3>
          <div class="flex gap-4 flex-wrap">
            <TkDropdown
              :options="airportOptions"
              option-label-key="name"
              option-value-key="code"
              :option-html="airportOptionHtml"
              @tk-item-click="handleAirportClick"
            >
              <TkButton
                label="Select Airport"
                icon="flight_takeoff"
                icon-position="left"
                slot="trigger"
              />
            </TkDropdown>

            <TkDropdown
              :options="userOptions"
              option-label-key="name"
              option-value-key="id"
              :option-html="userOptionHtml"
              @tk-item-click="handleUserClick"
            >
              <TkButton
                label="Select User"
                icon="person"
                icon-position="left"
                slot="trigger"
              />
            </TkDropdown>
          </div>
          <div class="mt-2 text-sm text-gray-600">
            Selected Airport: {{ selectedAirport || 'None' }} | Selected User: {{ selectedUser || 'None' }}
          </div>
        </div>

        <!-- Disabled Options -->
        <div>
          <h3 class="text-lg font-medium mb-3">Disabled Options</h3>
          <div class="flex gap-4">
            <TkDropdown :options="disabledOptions" @tk-item-click="handleDisabledClick">
              <TkButton
                label="With Disabled Items"
                icon="keyboard_arrow_down"
                icon-position="right"
                slot="trigger"
              />
            </TkDropdown>
            
            <TkDropdown :options="basicOptions" disabled>
              <TkButton
                label="Disabled Dropdown"
                icon="keyboard_arrow_down"
                icon-position="right"
                disabled
                slot="trigger"
              />
            </TkDropdown>
          </div>
        </div>

        <!-- Grouped Options -->
        <div>
          <h3 class="text-lg font-medium mb-3">Grouped Options</h3>
          <div class="flex gap-4">
            <TkDropdown
              :options="groupedOptions"
              group-name-key="groupName"
              group-options-key="options"
              @tk-item-click="handleGroupedClick"
            >
              <TkButton
                label="Select Category"
                icon="category"
                icon-position="left"
                slot="trigger"
              />
            </TkDropdown>
          </div>
          <div class="mt-2 text-sm text-gray-600">
            Selected from group: {{ selectedFromGroup || 'None' }}
          </div>
        </div>

        <!-- Option Alignment -->
        <div>
          <h3 class="text-lg font-medium mb-3">Option Alignment</h3>
          <div class="flex gap-4">
            <TkDropdown :options="alignmentOptions" options-align="left">
              <TkButton label="Left Aligned" slot="trigger" />
            </TkDropdown>
            <TkDropdown :options="alignmentOptions" options-align="center">
              <TkButton label="Center Aligned" slot="trigger" />
            </TkDropdown>
            <TkDropdown :options="alignmentOptions" options-align="right">
              <TkButton label="Right Aligned" slot="trigger" />
            </TkDropdown>
          </div>
        </div>

        <!-- Custom Triggers -->
        <div>
          <h3 class="text-lg font-medium mb-3">Custom Triggers</h3>
          <div class="flex gap-4 flex-wrap">
            <TkDropdown :options="actionOptions" @tk-item-click="handleActionClick">
              <div 
                slot="trigger" 
                class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
              >
                <TkIcon name="settings" />
                <span>Settings</span>
                <TkIcon name="keyboard_arrow_down" />
              </div>
            </TkDropdown>

            <TkDropdown :options="profileOptions" @tk-item-click="handleProfileClick">
              <div slot="trigger" class="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                <TkAvatar label="JD" size="small" variant="primary" background="solid" rounded />
                <span class="font-medium">John Doe</span>
                <TkIcon name="keyboard_arrow_down" />
              </div>
            </TkDropdown>

            <TkDropdown :options="menuOptions" @tk-item-click="handleMenuClick">
              <TkIcon 
                name="more_vert" 
                slot="trigger"
                class="cursor-pointer hover:bg-gray-100 p-2 rounded"
              />
            </TkDropdown>
          </div>
        </div>

        <!-- Empty State -->
        <div>
          <h3 class="text-lg font-medium mb-3">Empty State</h3>
          <div class="flex gap-4">
            <TkDropdown :options="[]" empty-message="No options available">
              <TkButton
                label="Empty Options"
                icon="keyboard_arrow_down"
                icon-position="right"
                slot="trigger"
              />
            </TkDropdown>

            <TkDropdown :options="[]" empty-message="No data found">
              <template #empty-data>
                <div class="p-4 text-center">
                  <TkIcon name="inbox" class="mx-auto mb-2 text-gray-400" />
                  <p class="text-gray-500">No items to display</p>
                  <TkButton label="Add Item" size="small" variant="primary" class="mt-2" />
                </div>
              </template>
              <TkButton
                label="Custom Empty State"
                icon="keyboard_arrow_down"
                icon-position="right"
                slot="trigger"
              />
            </TkDropdown>
          </div>
        </div>

        <!-- Real-world Examples -->
        <div>
          <h3 class="text-lg font-medium mb-3">Real-world Examples</h3>
          <div class="space-y-4">
            <!-- Language Selector -->
            <div class="border p-4 rounded-lg">
              <h4 class="font-semibold mb-3">Language Selector</h4>
              <TkDropdown 
                :options="languageOptions" 
                option-label-key="name"
                option-value-key="code"
                :option-html="languageOptionHtml"
                @tk-item-click="handleLanguageChange"
              >
                <div slot="trigger" class="flex items-center gap-2 px-3 py-2 border rounded cursor-pointer hover:bg-gray-50">
                  <img :src="currentLanguage.flag" :alt="currentLanguage.name" class="w-5 h-5" />
                  <span>{{ currentLanguage.name }}</span>
                  <TkIcon name="keyboard_arrow_down" />
                </div>
              </TkDropdown>
            </div>

            <!-- User Actions Menu -->
            <div class="border p-4 rounded-lg">
              <h4 class="font-semibold mb-3">User Actions</h4>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <TkAvatar label="AM" variant="primary" background="solid" rounded />
                  <div>
                    <p class="font-medium">Anna Miller</p>
                    <p class="text-sm text-gray-600">anna.miller@example.com</p>
                  </div>
                </div>
                <TkDropdown :options="userActionsOptions" @tk-item-click="handleUserAction">
                  <TkButton
                    label="Actions"
                    icon="more_horiz"
                    icon-position="right"
                    variant="neutral"
                    type="outlined"
                    size="small"
                    slot="trigger"
                  />
                </TkDropdown>
              </div>
            </div>

            <!-- Table Actions -->
            <div class="border p-4 rounded-lg">
              <h4 class="font-semibold mb-3">Table Row Actions</h4>
              <div class="space-y-2">
                <div v-for="item in tableData" :key="item.id" class="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <div class="flex items-center gap-3">
                    <TkIcon :name="item.icon" />
                    <div>
                      <p class="font-medium">{{ item.name }}</p>
                      <p class="text-sm text-gray-600">{{ item.description }}</p>
                    </div>
                  </div>
                  <TkDropdown :options="tableActionOptions" @tk-item-click="(e) => handleTableAction(e, item)">
                    <TkIcon 
                      name="more_vert" 
                      slot="trigger"
                      class="cursor-pointer hover:bg-gray-200 p-1 rounded"
                    />
                  </TkDropdown>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Demo -->
        <div>
          <h3 class="text-lg font-medium mb-3">Interactive Dropdown Demo</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Position</label>
                <select v-model="selectedPosition" class="w-full px-3 py-2 border rounded">
                  <option value="bottom">Bottom</option>
                  <option value="bottom-start">Bottom Start</option>
                  <option value="bottom-end">Bottom End</option>
                  <option value="top">Top</option>
                  <option value="top-start">Top Start</option>
                  <option value="top-end">Top End</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Alignment</label>
                <select v-model="selectedAlignment" class="w-full px-3 py-2 border rounded">
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Empty Message</label>
                <input 
                  v-model="customEmptyMessage" 
                  type="text" 
                  class="w-full px-3 py-2 border rounded"
                  placeholder="Custom message"
                >
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Trigger Type</label>
                <select v-model="selectedTriggerType" class="w-full px-3 py-2 border rounded">
                  <option value="button">Button</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>
            <div class="flex gap-4">
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="isDropdownDisabled" class="rounded">
                Disabled
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="useCustomHtml" class="rounded">
                Use Custom HTML
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="showEmptyState" class="rounded">
                Show Empty State
              </label>
            </div>
            <div>
              <TkDropdown
                :options="showEmptyState ? [] : basicOptions"
                :position="selectedPosition"
                :options-align="selectedAlignment"
                :empty-message="customEmptyMessage || 'No options available'"
                :disabled="isDropdownDisabled"
                :option-html="useCustomHtml ? customOptionHtml : null"
                @tk-item-click="handleInteractiveClick"
              >
                <TkButton
                  v-if="selectedTriggerType === 'button'"
                  label="Interactive Dropdown"
                  icon="keyboard_arrow_down"
                  icon-position="right"
                  :disabled="isDropdownDisabled"
                  slot="trigger"
                />
                <div 
                  v-else
                  slot="trigger" 
                  class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg cursor-pointer hover:from-purple-600 hover:to-pink-600 transition-all"
                  :class="{ 'opacity-50 cursor-not-allowed': isDropdownDisabled }"
                >
                  <TkIcon name="auto_awesome" />
                  <span>Custom Trigger</span>
                  <TkIcon name="keyboard_arrow_down" />
                </div>
              </TkDropdown>
            </div>
            <div class="mt-2 text-sm text-gray-600">
              Interactive selection: {{ interactiveSelection || 'None' }}
            </div>
          </div>
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TkCard, TkDropdown, TkButton, TkIcon, TkAvatar } from '@takeoff-ui/vue';

// Basic options
const basicOptions = ref([
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
]);

// State for basic dropdown
const lastSelected = ref('');

// Airport options
const airportOptions = ref([
  { code: 'SAW', name: 'Sabiha Gökçen Airport' },
  { code: 'ESB', name: 'Esenboğa Airport' },
  { code: 'AYT', name: 'Antalya Airport' },
  { code: 'IST', name: 'Istanbul Airport' },
]);

const selectedAirport = ref('');

// User options
const userOptions = ref([
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
]);

const selectedUser = ref('');

// Disabled options
const disabledOptions = ref([
  { label: 'Enabled Option', value: '1' },
  { label: 'Disabled Option', value: '2', disabled: true },
  { label: 'Another Enabled', value: '3' },
  { label: 'Also Disabled', value: '4', disabled: true },
]);

// Grouped options
const groupedOptions = ref([
  {
    groupName: 'Fruits',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Orange', value: 'orange' },
    ]
  },
  {
    groupName: 'Vegetables',
    options: [
      { label: 'Carrot', value: 'carrot' },
      { label: 'Broccoli', value: 'broccoli' },
      { label: 'Spinach', value: 'spinach' },
    ]
  }
]);

const selectedFromGroup = ref('');

// Alignment options
const alignmentOptions = ref([
  { label: 'Short', value: '1' },
  { label: 'Medium Length Option', value: '2' },
  { label: 'Very Long Option Text Here', value: '3' },
]);

// Action options
const actionOptions = ref([
  { label: 'Preferences', value: 'preferences' },
  { label: 'Account Settings', value: 'account' },
  { label: 'Privacy', value: 'privacy' },
  { label: 'Security', value: 'security' },
  { label: 'Logout', value: 'logout' },
]);

// Profile options
const profileOptions = ref([
  { label: 'View Profile', value: 'view' },
  { label: 'Edit Profile', value: 'edit' },
  { label: 'Account Settings', value: 'settings' },
  { label: 'Sign Out', value: 'signout' },
]);

// Menu options
const menuOptions = ref([
  { label: 'Edit', value: 'edit' },
  { label: 'Duplicate', value: 'duplicate' },
  { label: 'Delete', value: 'delete' },
]);

// Language options
const languageOptions = ref([
  { code: 'en', name: 'English', flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjMDA1MkZGIi8+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSI0IiB5PSI4IiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4=' },
  { code: 'tr', name: 'Türkçe', flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjRkYwMDAwIi8+Cjwvc3ZnPg==' },
  { code: 'de', name: 'Deutsch', flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjYuNjciIGZpbGw9ImJsYWNrIi8+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSI2LjY3IiB5PSI2LjY3IiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSI2LjY3IiB5PSIxMy4zMyIgZmlsbD0iI0ZGRDcwMCIvPgo8L3N2Zz4=' },
  { code: 'fr', name: 'Français', flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYuNjciIGhlaWdodD0iMjAiIGZpbGw9IiMwMDAwRkYiLz4KPHJlY3Qgd2lkdGg9IjYuNjciIGhlaWdodD0iMjAiIHg9IjYuNjciIGZpbGw9IndoaXRlIi8+CjxyZWN0IHdpZHRoPSI2LjY3IiBoZWlnaHQ9IjIwIiB4PSIxMy4zMyIgZmlsbD0iI0ZGMDAwMCIvPgo8L3N2Zz4=' },
]);

const currentLanguage = ref(languageOptions.value[0]);

// User actions options
const userActionsOptions = ref([
  { label: 'View Profile', value: 'view' },
  { label: 'Send Message', value: 'message' },
  { label: 'Assign Role', value: 'role' },
  { label: 'Remove User', value: 'remove' },
]);

// Table data
const tableData = ref([
  { id: 1, name: 'Project Alpha', description: 'Main development project', icon: 'folder' },
  { id: 2, name: 'Documentation', description: 'User guides and manuals', icon: 'description' },
  { id: 3, name: 'Testing Suite', description: 'Automated testing framework', icon: 'bug_report' },
]);

// Table action options
const tableActionOptions = ref([
  { label: 'Edit', value: 'edit' },
  { label: 'Share', value: 'share' },
  { label: 'Archive', value: 'archive' },
  { label: 'Delete', value: 'delete' },
]);

// Interactive demo controls
const selectedPosition = ref('bottom');
const selectedAlignment = ref('left');
const customEmptyMessage = ref('');
const selectedTriggerType = ref('button');
const isDropdownDisabled = ref(false);
const useCustomHtml = ref(false);
const showEmptyState = ref(false);
const interactiveSelection = ref('');

// Custom HTML functions
const airportOptionHtml = (item) => {
  return `<div class="flex justify-between items-center gap-4">
    <div style="font-weight: bold;">${item.name}</div>
    <div style="color: var(--primary-base); font-family: monospace;">${item.code}</div>
  </div>`;
};

const userOptionHtml = (item) => {
  return `<div class="flex items-center gap-3">
    <div style="width: 32px; height: 32px; background: var(--primary-base); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">
      ${item.name.split(' ').map(n => n[0]).join('')}
    </div>
    <div>
      <div style="font-weight: 500;">${item.name}</div>
      <div style="font-size: 12px; color: #666;">${item.email}</div>
    </div>
    <div style="margin-left: auto; padding: 2px 8px; background: #e3f2fd; color: #1976d2; border-radius: 12px; font-size: 11px;">
      ${item.role}
    </div>
  </div>`;
};

const languageOptionHtml = (item) => {
  return `<div class="flex items-center gap-3">
    <img src="${item.flag}" alt="${item.name}" style="width: 20px; height: 20px;" />
    <span>${item.name}</span>
  </div>`;
};

const customOptionHtml = (item) => {
  return `<div class="flex items-center justify-between p-2 hover:bg-purple-50">
    <span style="color: #7c3aed; font-weight: 500;">${item.label}</span>
    <span style="color: #a855f7; font-size: 12px;">✨</span>
  </div>`;
};

// Event handlers
const handleBasicClick = (event) => {
  lastSelected.value = event.detail.label;
  console.log('Basic selection:', event.detail);
};

const handleAirportClick = (event) => {
  selectedAirport.value = `${event.detail.name} (${event.detail.code})`;
  console.log('Airport selection:', event.detail);
};

const handleUserClick = (event) => {
  selectedUser.value = event.detail.name;
  console.log('User selection:', event.detail);
};

const handleDisabledClick = (event) => {
  console.log('Disabled options selection:', event.detail);
};

const handleGroupedClick = (event) => {
  selectedFromGroup.value = event.detail.label;
  console.log('Grouped selection:', event.detail);
};

const handleActionClick = (event) => {
  console.log('Action:', event.detail.value);
  if (event.detail.value === 'logout') {
    alert('Logging out...');
  }
};

const handleProfileClick = (event) => {
  console.log('Profile action:', event.detail.value);
};

const handleMenuClick = (event) => {
  console.log('Menu action:', event.detail.value);
};

const handleLanguageChange = (event) => {
  currentLanguage.value = event.detail;
  console.log('Language changed to:', event.detail);
};

const handleUserAction = (event) => {
  console.log('User action:', event.detail.value);
};

const handleTableAction = (event, item) => {
  console.log('Table action:', event.detail.value, 'for item:', item);
};

const handleInteractiveClick = (event) => {
  interactiveSelection.value = event.detail.label;
  console.log('Interactive selection:', event.detail);
};
</script>
