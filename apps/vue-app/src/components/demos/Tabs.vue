<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Tabs Component Demo</h2>
      </template>
      
      <div class="space-y-8">
        <!-- Basic Tabs -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Tabs</h3>
          <TkTabs>
            <TkTabsItem label="Home" icon="home">
              <div class="p-4">
                <h4 class="font-semibold mb-2">Home Content</h4>
                <p>Welcome to the home tab. Here you can find general information and overview of our services.</p>
              </div>
            </TkTabsItem>
            <TkTabsItem label="Products" icon="inventory">
              <div class="p-4">
                <h4 class="font-semibold mb-2">Products Content</h4>
                <p>Browse our extensive product catalog with detailed specifications and pricing information.</p>
              </div>
            </TkTabsItem>
            <TkTabsItem label="Services" icon="build">
              <div class="p-4">
                <h4 class="font-semibold mb-2">Services Content</h4>
                <p>Discover our professional services including consulting, implementation, and support.</p>
              </div>
            </TkTabsItem>
            <TkTabsItem label="Contact" icon="contact_mail">
              <div class="p-4">
                <h4 class="font-semibold mb-2">Contact Content</h4>
                <p>Get in touch with our team through various communication channels.</p>
              </div>
            </TkTabsItem>
          </TkTabs>
        </div>

        <!-- Tab Variants -->
        <div>
          <h3 class="text-lg font-medium mb-3">Tab Variants</h3>
          <div class="space-y-6">
            <div>
              <h4 class="font-medium mb-2">Primary Variant</h4>
              <TkTabs variant="primary">
                <TkTabsItem label="Tab 1" icon="star">
                  <div class="p-4">Primary variant tab content 1</div>
                </TkTabsItem>
                <TkTabsItem label="Tab 2" icon="favorite">
                  <div class="p-4">Primary variant tab content 2</div>
                </TkTabsItem>
                <TkTabsItem label="Tab 3" icon="thumb_up">
                  <div class="p-4">Primary variant tab content 3</div>
                </TkTabsItem>
              </TkTabs>
            </div>

            <div>
              <h4 class="font-medium mb-2">Neutral Variant</h4>
              <TkTabs variant="neutral">
                <TkTabsItem label="Tab 1" icon="info">
                  <div class="p-4">Neutral variant tab content 1</div>
                </TkTabsItem>
                <TkTabsItem label="Tab 2" icon="help">
                  <div class="p-4">Neutral variant tab content 2</div>
                </TkTabsItem>
                <TkTabsItem label="Tab 3" icon="settings">
                  <div class="p-4">Neutral variant tab content 3</div>
                </TkTabsItem>
              </TkTabs>
            </div>

            <div>
              <h4 class="font-medium mb-2">Info Variant</h4>
              <TkTabs variant="info">
                <TkTabsItem label="Tab 1" icon="notifications">
                  <div class="p-4">Info variant tab content 1</div>
                </TkTabsItem>
                <TkTabsItem label="Tab 2" icon="announcement">
                  <div class="p-4">Info variant tab content 2</div>
                </TkTabsItem>
                <TkTabsItem label="Tab 3" icon="campaign">
                  <div class="p-4">Info variant tab content 3</div>
                </TkTabsItem>
              </TkTabs>
            </div>
          </div>
        </div>

        <!-- Tab Types -->
        <div>
          <h3 class="text-lg font-medium mb-3">Tab Types</h3>
          <div class="space-y-6">
            <div>
              <h4 class="font-medium mb-2">Basic Type</h4>
              <TkTabs type="basic">
                <TkTabsItem label="Dashboard" icon="dashboard">
                  <div class="p-4">Dashboard overview with key metrics and charts.</div>
                </TkTabsItem>
                <TkTabsItem label="Analytics" icon="analytics">
                  <div class="p-4">Advanced analytics and reporting tools.</div>
                </TkTabsItem>
                <TkTabsItem label="Reports" icon="assessment">
                  <div class="p-4">Generate and view detailed reports.</div>
                </TkTabsItem>
              </TkTabs>
            </div>

            <div>
              <h4 class="font-medium mb-2">Compact Type</h4>
              <TkTabs type="compact">
                <TkTabsItem label="Overview" icon="visibility">
                  <div class="p-4">Compact tab overview content.</div>
                </TkTabsItem>
                <TkTabsItem label="Details" icon="list">
                  <div class="p-4">Compact tab details content.</div>
                </TkTabsItem>
                <TkTabsItem label="Settings" icon="settings">
                  <div class="p-4">Compact tab settings content.</div>
                </TkTabsItem>
              </TkTabs>
            </div>

            <div>
              <h4 class="font-medium mb-2">Divided Type</h4>
              <TkTabs type="divided">
                <TkTabsItem label="Users" icon="people">
                  <div class="p-4">User management and permissions.</div>
                </TkTabsItem>
                <TkTabsItem label="Roles" icon="admin_panel_settings">
                  <div class="p-4">Role definitions and access control.</div>
                </TkTabsItem>
                <TkTabsItem label="Permissions" icon="security">
                  <div class="p-4">Permission settings and security.</div>
                </TkTabsItem>
              </TkTabs>
            </div>

            <div>
              <h4 class="font-medium mb-2">Expanded Type</h4>
              <TkTabs type="expanded">
                <TkTabsItem label="Projects" icon="work">
                  <div class="p-4">Project management and tracking.</div>
                </TkTabsItem>
                <TkTabsItem label="Tasks" icon="task">
                  <div class="p-4">Task assignment and progress.</div>
                </TkTabsItem>
                <TkTabsItem label="Team" icon="group">
                  <div class="p-4">Team collaboration and communication.</div>
                </TkTabsItem>
              </TkTabs>
            </div>
          </div>
        </div>

        <!-- Tab Sizes -->
        <div>
          <h3 class="text-lg font-medium mb-3">Tab Sizes</h3>
          <div class="space-y-6">
            <div>
              <h4 class="font-medium mb-2">XX Small Size</h4>
              <TkTabs size="xxsmall">
                <TkTabsItem label="Tab 1" icon="filter_1">
                  <div class="p-4">XX Small size tab content</div>
                </TkTabsItem>
                <TkTabsItem label="Tab 2" icon="filter_2">
                  <div class="p-4">XX Small size tab content</div>
                </TkTabsItem>
              </TkTabs>
            </div>

            <div>
              <h4 class="font-medium mb-2">X Small Size</h4>
              <TkTabs size="xsmall">
                <TkTabsItem label="Tab 1" icon="filter_1">
                  <div class="p-4">X Small size tab content</div>
                </TkTabsItem>
                <TkTabsItem label="Tab 2" icon="filter_2">
                  <div class="p-4">X Small size tab content</div>
                </TkTabsItem>
              </TkTabs>
            </div>

            <div>
              <h4 class="font-medium mb-2">Small Size</h4>
              <TkTabs size="small">
                <TkTabsItem label="Tab 1" icon="filter_1">
                  <div class="p-4">Small size tab content</div>
                </TkTabsItem>
                <TkTabsItem label="Tab 2" icon="filter_2">
                  <div class="p-4">Small size tab content</div>
                </TkTabsItem>
              </TkTabs>
            </div>

            <div>
              <h4 class="font-medium mb-2">Base Size (Default)</h4>
              <TkTabs size="base">
                <TkTabsItem label="Tab 1" icon="filter_1">
                  <div class="p-4">Base size tab content</div>
                </TkTabsItem>
                <TkTabsItem label="Tab 2" icon="filter_2">
                  <div class="p-4">Base size tab content</div>
                </TkTabsItem>
              </TkTabs>
            </div>

            <div>
              <h4 class="font-medium mb-2">Large Size</h4>
              <TkTabs size="large">
                <TkTabsItem label="Tab 1" icon="filter_1">
                  <div class="p-4">Large size tab content</div>
                </TkTabsItem>
                <TkTabsItem label="Tab 2" icon="filter_2">
                  <div class="p-4">Large size tab content</div>
                </TkTabsItem>
              </TkTabs>
            </div>
          </div>
        </div>

        <!-- Vertical Orientation -->
        <div>
          <h3 class="text-lg font-medium mb-3">Vertical Orientation</h3>
          <TkTabs orientation="vertical" class="min-h-64">
            <TkTabsItem label="Profile" icon="person">
              <div class="p-4">
                <h4 class="font-semibold mb-2">Profile Settings</h4>
                <p>Manage your personal information, avatar, and account preferences.</p>
                <div class="mt-4 space-y-2">
                  <div class="flex items-center gap-2">
                    <span class="font-medium">Name:</span>
                    <span>John Doe</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="font-medium">Email:</span>
                    <span>john@example.com</span>
                  </div>
                </div>
              </div>
            </TkTabsItem>
            <TkTabsItem label="Security" icon="security">
              <div class="p-4">
                <h4 class="font-semibold mb-2">Security Settings</h4>
                <p>Configure password, two-factor authentication, and login preferences.</p>
                <div class="mt-4 space-y-2">
                  <div>✓ Two-factor authentication enabled</div>
                  <div>✓ Strong password policy</div>
                  <div>✓ Recent login activity monitored</div>
                </div>
              </div>
            </TkTabsItem>
            <TkTabsItem label="Notifications" icon="notifications">
              <div class="p-4">
                <h4 class="font-semibold mb-2">Notification Preferences</h4>
                <p>Control email, push, and in-app notification settings.</p>
                <div class="mt-4 space-y-2">
                  <div>📧 Email notifications: Enabled</div>
                  <div>📱 Push notifications: Enabled</div>
                  <div>🔔 In-app notifications: Enabled</div>
                </div>
              </div>
            </TkTabsItem>
          </TkTabs>
        </div>

        <!-- Closable Tabs -->
        <div>
          <h3 class="text-lg font-medium mb-3">Closable Tabs</h3>
          <TkTabs :is-closable="true">
            <TkTabsItem label="Document 1" icon="description">
              <div class="p-4">
                <h4 class="font-semibold mb-2">Document 1</h4>
                <p>This is the content of Document 1. You can close this tab using the X button.</p>
              </div>
            </TkTabsItem>
            <TkTabsItem label="Document 2" icon="description">
              <div class="p-4">
                <h4 class="font-semibold mb-2">Document 2</h4>
                <p>This is the content of Document 2. You can close this tab using the X button.</p>
              </div>
            </TkTabsItem>
            <TkTabsItem label="Document 3" icon="description">
              <div class="p-4">
                <h4 class="font-semibold mb-2">Document 3</h4>
                <p>This is the content of Document 3. You can close this tab using the X button.</p>
              </div>
            </TkTabsItem>
          </TkTabs>
        </div>

        <!-- Controlled Tabs -->
        <div>
          <h3 class="text-lg font-medium mb-3">Controlled Tabs</h3>
          <div class="mb-4">
            <span class="font-medium">Current Active Tab: {{ controlledActiveTab }}</span>
          </div>
          <div class="mb-4 space-x-2">
            <TkButton 
              v-for="(tab, index) in controlledTabs" 
              :key="index"
              :variant="controlledActiveTab === index ? 'primary' : 'outlined'"
              size="small"
              @click="controlledActiveTab = index"
            >
              Go to {{ tab.label }}
            </TkButton>
          </div>
          <TkTabs 
            :active-index="controlledActiveTab"
            :controlled="true"
            @tk-tab-click="handleControlledTabClick"
            @tk-tab-change="handleControlledTabChange"
          >
            <TkTabsItem 
              v-for="(tab, index) in controlledTabs" 
              :key="index"
              :label="tab.label" 
              :icon="tab.icon"
            >
              <div class="p-4">
                <h4 class="font-semibold mb-2">{{ tab.label }}</h4>
                <p>{{ tab.content }}</p>
              </div>
            </TkTabsItem>
          </TkTabs>
        </div>

        <!-- Spread Headers -->
        <div>
          <h3 class="text-lg font-medium mb-3">Spread Headers</h3>
          <TkTabs :spread-headers="true">
            <TkTabsItem label="Overview" icon="visibility">
              <div class="p-4">Headers are spread evenly across the available width.</div>
            </TkTabsItem>
            <TkTabsItem label="Details" icon="info">
              <div class="p-4">Each tab header takes equal space in the container.</div>
            </TkTabsItem>
            <TkTabsItem label="Settings" icon="settings">
              <div class="p-4">This creates a more balanced layout for the tabs.</div>
            </TkTabsItem>
          </TkTabs>
        </div>

        <!-- Header Alignment -->
        <div>
          <h3 class="text-lg font-medium mb-3">Header Alignment</h3>
          <div class="space-y-6">
            <div>
              <h4 class="font-medium mb-2">Start Aligned (Default)</h4>
              <TkTabs align-headers="start">
                <TkTabsItem label="Tab 1">
                  <div class="p-4">Start aligned tab content</div>
                </TkTabsItem>
                <TkTabsItem label="Tab 2">
                  <div class="p-4">Start aligned tab content</div>
                </TkTabsItem>
              </TkTabs>
            </div>

            <div>
              <h4 class="font-medium mb-2">Center Aligned</h4>
              <TkTabs align-headers="center">
                <TkTabsItem label="Tab 1">
                  <div class="p-4">Center aligned tab content</div>
                </TkTabsItem>
                <TkTabsItem label="Tab 2">
                  <div class="p-4">Center aligned tab content</div>
                </TkTabsItem>
              </TkTabs>
            </div>

            <div>
              <h4 class="font-medium mb-2">End Aligned</h4>
              <TkTabs align-headers="end">
                <TkTabsItem label="Tab 1">
                  <div class="p-4">End aligned tab content</div>
                </TkTabsItem>
                <TkTabsItem label="Tab 2">
                  <div class="p-4">End aligned tab content</div>
                </TkTabsItem>
              </TkTabs>
            </div>
          </div>
        </div>

        <!-- Default Active Index -->
        <div>
          <h3 class="text-lg font-medium mb-3">Default Active Index</h3>
          <TkTabs :default-active-index="1">
            <TkTabsItem label="First Tab" icon="filter_1">
              <div class="p-4">This is the first tab, but the second tab is active by default.</div>
            </TkTabsItem>
            <TkTabsItem label="Second Tab" icon="filter_2">
              <div class="p-4">This tab is active by default due to defaultActiveIndex="1".</div>
            </TkTabsItem>
            <TkTabsItem label="Third Tab" icon="filter_3">
              <div class="p-4">This is the third tab.</div>
            </TkTabsItem>
          </TkTabs>
        </div>

        <!-- Extendable Tabs -->
        <div>
          <h3 class="text-lg font-medium mb-3">Extendable Tabs</h3>
          <TkTabs :is-extendable="true">
            <TkTabsItem label="Tab 1" icon="tab">
              <div class="p-4">This tab component allows adding new tabs dynamically.</div>
            </TkTabsItem>
            <TkTabsItem label="Tab 2" icon="tab">
              <div class="p-4">You can extend this tab set with additional tabs.</div>
            </TkTabsItem>
            <TkTabsItem label="Tab 3" icon="tab">
              <div class="p-4">The plus button allows adding new tabs.</div>
            </TkTabsItem>
          </TkTabs>
        </div>

        <!-- Custom Styling -->
        <div>
          <h3 class="text-lg font-medium mb-3">Custom Styling</h3>
          <TkTabs 
            :container-style="{
              backgroundColor: '#f8fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              padding: '16px'
            }"
            :header-container-style="{
              backgroundColor: '#e2e8f0',
              borderRadius: '8px',
              padding: '8px',
              marginBottom: '12px'
            }"
            :content-style="{
              backgroundColor: 'white',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              minHeight: '120px'
            }"
          >
            <TkTabsItem label="Styled Tab 1" icon="palette">
              <div class="p-4">This tab has custom container, header, and content styling.</div>
            </TkTabsItem>
            <TkTabsItem label="Styled Tab 2" icon="brush">
              <div class="p-4">The styling affects the overall appearance of the tabs component.</div>
            </TkTabsItem>
            <TkTabsItem label="Styled Tab 3" icon="color_lens">
              <div class="p-4">Custom styles can be applied to different parts of the component.</div>
            </TkTabsItem>
          </TkTabs>
        </div>

        <!-- Event Handling Demo -->
        <div>
          <h3 class="text-lg font-medium mb-3">Event Handling</h3>
          <TkTabs 
            @tk-tab-click="handleTabClick"
            @tk-tab-change="handleTabChange"
          >
            <TkTabsItem label="Events 1" icon="event">
              <div class="p-4">Click events are tracked for this tab.</div>
            </TkTabsItem>
            <TkTabsItem label="Events 2" icon="track_changes">
              <div class="p-4">Tab change events are also monitored.</div>
            </TkTabsItem>
            <TkTabsItem label="Events 3" icon="monitor">
              <div class="p-4">All tab interactions are logged below.</div>
            </TkTabsItem>
          </TkTabs>
          
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
import { ref } from 'vue';
import { TkCard, TkTabs, TkTabsItem, TkButton } from '@takeoff-ui/vue';

// Controlled tabs state
const controlledActiveTab = ref(0);
const controlledTabs = ref([
  {
    label: 'First Tab',
    icon: 'filter_1',
    content: 'This is the first controlled tab. You can switch between tabs using the buttons above or by clicking the tab headers.'
  },
  {
    label: 'Second Tab',
    icon: 'filter_2',
    content: 'This is the second controlled tab. The active tab is controlled programmatically.'
  },
  {
    label: 'Third Tab',
    icon: 'filter_3',
    content: 'This is the third controlled tab. Notice how the active tab state is synchronized.'
  }
]);

// Event logging
const eventLog = ref([]);

// Event handlers
const handleControlledTabClick = (event) => {
  console.log('Controlled tab clicked:', event.detail);
};

const handleControlledTabChange = (event) => {
  controlledActiveTab.value = event.detail;
  console.log('Controlled tab changed:', event.detail);
};

const handleTabClick = (event) => {
  const timestamp = new Date().toLocaleTimeString();
  eventLog.value.unshift(`${timestamp}: Tab clicked - index ${event.detail}`);
  
  // Keep only last 5 events
  if (eventLog.value.length > 5) {
    eventLog.value = eventLog.value.slice(0, 5);
  }
};

const handleTabChange = (event) => {
  const timestamp = new Date().toLocaleTimeString();
  eventLog.value.unshift(`${timestamp}: Tab changed - index ${event.detail}`);
  
  // Keep only last 5 events
  if (eventLog.value.length > 5) {
    eventLog.value = eventLog.value.slice(0, 5);
  }
};
</script>
