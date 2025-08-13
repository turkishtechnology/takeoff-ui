<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Tooltip Component Demo</h2>
      </template>
      
      <div class="space-y-8">
        <!-- Basic Tooltip -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Tooltip</h3>
          <div class="flex gap-4">
            <TkTooltip
              description="This is a simple tooltip"
            >
              <TkButton slot="trigger" label="Simple Tooltip" />
            </TkTooltip>
            
            <TkTooltip
              header="Header Title"
              description="This tooltip has both header and description"
            >
              <TkButton slot="trigger" label="With Header" />
            </TkTooltip>
            
            <TkTooltip
              header="With Icon"
              description="This tooltip includes an icon"
              icon="info"
            >
              <TkButton slot="trigger" label="With Icon" />
            </TkTooltip>
          </div>
        </div>

        <!-- Tooltip Positions -->
        <div>
          <h3 class="text-lg font-medium mb-3">Tooltip Positions</h3>
          <div class="space-y-6">
            <!-- Top Positions -->
            <div class="text-center">
              <h4 class="font-medium mb-3">Top Positions</h4>
              <div class="flex justify-center gap-4">
                <TkTooltip
                  header="Top Start"
                  description="Tooltip positioned at top-start"
                  position="top-start"
                  icon="flight"
                  variant="dark"
                >
                  <TkButton slot="trigger" label="Top Start" />
                </TkTooltip>
                
                <TkTooltip
                  header="Top Center"
                  description="Tooltip positioned at top center"
                  position="top"
                  icon="flight"
                  variant="dark"
                >
                  <TkButton slot="trigger" label="Top" />
                </TkTooltip>
                
                <TkTooltip
                  header="Top End"
                  description="Tooltip positioned at top-end"
                  position="top-end"
                  icon="flight"
                  variant="dark"
                >
                  <TkButton slot="trigger" label="Top End" />
                </TkTooltip>
              </div>
            </div>

            <!-- Side Positions -->
            <div class="flex justify-between items-center px-8">
              <!-- Left Side -->
              <div class="flex flex-col gap-4">
                <h4 class="font-medium text-center">Left</h4>
                <TkTooltip
                  header="Left Start"
                  description="Tooltip positioned at left-start"
                  position="left-start"
                  icon="flight"
                  variant="dark"
                >
                  <TkButton slot="trigger" label="Left Start" />
                </TkTooltip>
                
                <TkTooltip
                  header="Left Center"
                  description="Tooltip positioned at left center"
                  position="left"
                  icon="flight"
                  variant="dark"
                >
                  <TkButton slot="trigger" label="Left" />
                </TkTooltip>
                
                <TkTooltip
                  header="Left End"
                  description="Tooltip positioned at left-end"
                  position="left-end"
                  icon="flight"
                  variant="dark"
                >
                  <TkButton slot="trigger" label="Left End" />
                </TkTooltip>
              </div>

              <!-- Right Side -->
              <div class="flex flex-col gap-4">
                <h4 class="font-medium text-center">Right</h4>
                <TkTooltip
                  header="Right Start"
                  description="Tooltip positioned at right-start"
                  position="right-start"
                  icon="flight"
                  variant="dark"
                >
                  <TkButton slot="trigger" label="Right Start" />
                </TkTooltip>
                
                <TkTooltip
                  header="Right Center"
                  description="Tooltip positioned at right center"
                  position="right"
                  icon="flight"
                  variant="dark"
                >
                  <TkButton slot="trigger" label="Right" />
                </TkTooltip>
                
                <TkTooltip
                  header="Right End"
                  description="Tooltip positioned at right-end"
                  position="right-end"
                  icon="flight"
                  variant="dark"
                >
                  <TkButton slot="trigger" label="Right End" />
                </TkTooltip>
              </div>
            </div>

            <!-- Bottom Positions -->
            <div class="text-center">
              <h4 class="font-medium mb-3">Bottom Positions</h4>
              <div class="flex justify-center gap-4">
                <TkTooltip
                  header="Bottom Start"
                  description="Tooltip positioned at bottom-start"
                  position="bottom-start"
                  icon="flight"
                  variant="dark"
                >
                  <TkButton slot="trigger" label="Bottom Start" />
                </TkTooltip>
                
                <TkTooltip
                  header="Bottom Center"
                  description="Tooltip positioned at bottom center"
                  position="bottom"
                  icon="flight"
                  variant="dark"
                >
                  <TkButton slot="trigger" label="Bottom" />
                </TkTooltip>
                
                <TkTooltip
                  header="Bottom End"
                  description="Tooltip positioned at bottom-end"
                  position="bottom-end"
                  icon="flight"
                  variant="dark"
                >
                  <TkButton slot="trigger" label="Bottom End" />
                </TkTooltip>
              </div>
            </div>
          </div>
        </div>

        <!-- Tooltip Variants -->
        <div>
          <h3 class="text-lg font-medium mb-3">Tooltip Variants</h3>
          <div class="flex flex-wrap gap-4">
            <TkTooltip
              header="Dark Variant"
              description="This is a dark tooltip variant"
              position="top"
              icon="dark_mode"
              variant="dark"
            >
              <TkButton slot="trigger" label="Dark" variant="outlined" />
            </TkTooltip>
            
            <TkTooltip
              header="White Variant"
              description="This is a white tooltip variant"
              position="top"
              icon="light_mode"
              variant="white"
            >
              <TkButton slot="trigger" label="White" variant="outlined" />
            </TkTooltip>
            
            <TkTooltip
              header="Info Variant"
              description="This is an info tooltip variant"
              position="top"
              icon="info"
              variant="info"
            >
              <TkButton slot="trigger" label="Info" variant="outlined" />
            </TkTooltip>
            
            <TkTooltip
              header="Success Variant"
              description="This is a success tooltip variant"
              position="top"
              icon="check_circle"
              variant="success"
            >
              <TkButton slot="trigger" label="Success" variant="outlined" />
            </TkTooltip>
            
            <TkTooltip
              header="Danger Variant"
              description="This is a danger tooltip variant"
              position="top"
              icon="error"
              variant="danger"
            >
              <TkButton slot="trigger" label="Danger" variant="outlined" />
            </TkTooltip>
            
            <TkTooltip
              header="Warning Variant"
              description="This is a warning tooltip variant"
              position="top"
              icon="warning"
              variant="warning"
            >
              <TkButton slot="trigger" label="Warning" variant="outlined" />
            </TkTooltip>
            
            <TkTooltip
              header="Neutral Variant"
              description="This is a neutral tooltip variant"
              position="top"
              icon="help"
              variant="neutral"
            >
              <TkButton slot="trigger" label="Neutral" variant="outlined" />
            </TkTooltip>
          </div>
        </div>

        <!-- Different Trigger Elements -->
        <div>
          <h3 class="text-lg font-medium mb-3">Different Trigger Elements</h3>
          <div class="flex flex-wrap items-center gap-6">
            <!-- Button Triggers -->
            <TkTooltip
              description="Tooltip on primary button"
              position="top"
            >
              <TkButton slot="trigger" label="Button" variant="primary" />
            </TkTooltip>

            <!-- Icon Button -->
            <TkTooltip
              header="Settings"
              description="Open application settings"
              position="top"
              variant="info"
            >
              <TkButton slot="trigger" icon="settings" variant="text" />
            </TkTooltip>

            <!-- Text Element -->
            <TkTooltip
              header="More Information"
              description="Click here to learn more about this feature"
              position="top"
              icon="info"
              variant="info"
            >
              <span slot="trigger" class="underline text-blue-600 cursor-pointer">
                Hover over this text
              </span>
            </TkTooltip>

            <!-- Badge -->
            <TkTooltip
              header="Status Badge"
              description="This indicates the current status of the system"
              position="top"
              variant="success"
            >
              <TkBadge slot="trigger" label="Active" variant="success" />
            </TkTooltip>

            <!-- Image -->
            <TkTooltip
              header="Profile Picture"
              description="Click to view full profile"
              position="top"
              variant="dark"
            >
              <div slot="trigger" class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                <span class="text-gray-600 text-sm">JD</span>
              </div>
            </TkTooltip>
          </div>
        </div>

        <!-- Custom Icons -->
        <div>
          <h3 class="text-lg font-medium mb-3">Custom Icons</h3>
          <div class="flex flex-wrap gap-4">
            <TkTooltip
              header="Flight Information"
              description="Check flight status and details"
              position="top"
              icon="flight"
              variant="info"
            >
              <TkButton slot="trigger" icon="flight" label="Flight" />
            </TkTooltip>
            
            <TkTooltip
              header="Email Notification"
              description="You have 3 unread messages"
              position="top"
              icon="email"
              variant="warning"
            >
              <TkButton slot="trigger" icon="mail" label="Messages" />
            </TkTooltip>
            
            <TkTooltip
              header="Favorite Item"
              description="Add this item to your favorites"
              position="top"
              icon="favorite"
              variant="danger"
            >
              <TkButton slot="trigger" icon="favorite_border" label="Favorite" />
            </TkTooltip>
            
            <TkTooltip
              header="Download File"
              description="Download the selected file to your computer"
              position="top"
              icon="file_download"
              variant="success"
            >
              <TkButton slot="trigger" icon="download" label="Download" />
            </TkTooltip>
          </div>
        </div>

        <!-- Custom Content -->
        <div>
          <h3 class="text-lg font-medium mb-3">Custom Content Tooltips</h3>
          <div class="flex flex-wrap gap-4">
            <TkTooltip position="right" variant="white">
              <template #content>
                <div class="p-2">
                  <h4 class="font-semibold mb-2 text-gray-900">User Profile</h4>
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span class="text-white text-sm">JD</span>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900">John Doe</p>
                      <p class="text-sm text-gray-600">john@example.com</p>
                    </div>
                  </div>
                </div>
              </template>
              <TkButton slot="trigger" label="User Profile" />
            </TkTooltip>

            <TkTooltip position="right" variant="info">
              <template #content>
                <div class="p-2">
                  <h4 class="font-semibold mb-2">Statistics</h4>
                  <div class="space-y-1 text-sm">
                    <div class="flex justify-between">
                      <span>Views:</span>
                      <span class="font-semibold">1,234</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Clicks:</span>
                      <span class="font-semibold">456</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Conversion:</span>
                      <span class="font-semibold">12.3%</span>
                    </div>
                  </div>
                </div>
              </template>
              <TkButton slot="trigger" label="View Stats" />
            </TkTooltip>

            <TkTooltip position="right" variant="warning">
              <template #content>
                <div class="p-2">
                  <div class="flex items-center gap-2 mb-2">
                    <TkIcon name="warning" class="text-yellow-600" />
                    <h4 class="font-semibold">System Alert</h4>
                  </div>
                  <p class="text-sm mb-2">Server maintenance scheduled for tonight.</p>
                  <div class="text-xs">
                    <strong>Time:</strong> 11:00 PM - 2:00 AM
                  </div>
                </div>
              </template>
              <TkButton slot="trigger" label="System Status" />
            </TkTooltip>
          </div>
        </div>

        <!-- Interactive Demo -->
        <div>
          <h3 class="text-lg font-medium mb-3">Interactive Configuration</h3>
          <div class="space-y-4">
            <div class="flex flex-wrap gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">Position:</label>
                <select v-model="interactivePosition" class="border rounded px-3 py-2">
                  <option value="top">Top</option>
                  <option value="top-start">Top Start</option>
                  <option value="top-end">Top End</option>
                  <option value="right">Right</option>
                  <option value="right-start">Right Start</option>
                  <option value="right-end">Right End</option>
                  <option value="bottom">Bottom</option>
                  <option value="bottom-start">Bottom Start</option>
                  <option value="bottom-end">Bottom End</option>
                  <option value="left">Left</option>
                  <option value="left-start">Left Start</option>
                  <option value="left-end">Left End</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Variant:</label>
                <select v-model="interactiveVariant" class="border rounded px-3 py-2">
                  <option value="neutral">Neutral</option>
                  <option value="dark">Dark</option>
                  <option value="white">White</option>
                  <option value="info">Info</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="danger">Danger</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Icon:</label>
                <select v-model="interactiveIcon" class="border rounded px-3 py-2">
                  <option value="">No Icon</option>
                  <option value="info">Info</option>
                  <option value="star">Star</option>
                  <option value="favorite">Favorite</option>
                  <option value="help">Help</option>
                  <option value="settings">Settings</option>
                  <option value="flight">Flight</option>
                </select>
              </div>
            </div>

            <div class="space-y-2">
              <div>
                <label class="block text-sm font-medium mb-1">Header Text:</label>
                <input 
                  v-model="interactiveHeader" 
                  class="border rounded px-3 py-2 w-64"
                  placeholder="Enter header text..."
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Description Text:</label>
                <textarea 
                  v-model="interactiveDescription" 
                  class="border rounded px-3 py-2 w-64 h-20"
                  placeholder="Enter description text..."
                ></textarea>
              </div>
            </div>

            <div class="pt-4">
              <TkTooltip
                :header="interactiveHeader || undefined"
                :description="interactiveDescription"
                :position="interactivePosition"
                :icon="interactiveIcon || undefined"
                :variant="interactiveVariant"
              >
                <TkButton slot="trigger" label="Interactive Tooltip" variant="primary" />
              </TkTooltip>
            </div>
          </div>
        </div>

        <!-- Real-world Use Cases -->
        <div>
          <h3 class="text-lg font-medium mb-3">Real-world Use Cases</h3>
          <div class="space-y-6">
            <!-- Form Help -->
            <div>
              <h4 class="font-medium mb-3">Form Field Help</h4>
              <div class="space-y-3">
                <div class="flex items-center gap-2">
                  <label class="font-medium">Password:</label>
                  <TkTooltip
                    header="Password Requirements"
                    description="Password must be at least 8 characters long, contain uppercase and lowercase letters, numbers, and special characters."
                    position="right"
                    icon="info"
                    variant="info"
                  >
                    <TkIcon slot="trigger" name="help" class="text-blue-500 cursor-pointer" />
                  </TkTooltip>
                </div>
                <div class="flex items-center gap-2">
                  <label class="font-medium">Email:</label>
                  <TkTooltip
                    header="Email Format"
                    description="Please enter a valid email address (e.g., user@example.com)"
                    position="right"
                    icon="email"
                    variant="info"
                  >
                    <TkIcon slot="trigger" name="help" class="text-blue-500 cursor-pointer" />
                  </TkTooltip>
                </div>
              </div>
            </div>

            <!-- Status Indicators -->
            <div>
              <h4 class="font-medium mb-3">Status Indicators</h4>
              <div class="flex gap-4">
                <TkTooltip
                  header="System Healthy"
                  description="All systems are operational. Last check: 2 minutes ago"
                  position="top"
                  icon="check_circle"
                  variant="success"
                >
                  <div slot="trigger" class="w-4 h-4 bg-green-500 rounded-full cursor-pointer"></div>
                </TkTooltip>
                
                <TkTooltip
                  header="Warning: High CPU Usage"
                  description="CPU usage is at 85%. Consider optimizing or scaling resources."
                  position="top"
                  icon="warning"
                  variant="warning"
                >
                  <div slot="trigger" class="w-4 h-4 bg-yellow-500 rounded-full cursor-pointer"></div>
                </TkTooltip>
                
                <TkTooltip
                  header="System Error"
                  description="Database connection failed. Please contact system administrator."
                  position="top"
                  icon="error"
                  variant="danger"
                >
                  <div slot="trigger" class="w-4 h-4 bg-red-500 rounded-full cursor-pointer"></div>
                </TkTooltip>
              </div>
            </div>

            <!-- Action Buttons -->
            <div>
              <h4 class="font-medium mb-3">Action Buttons with Tooltips</h4>
              <div class="flex gap-2">
                <TkTooltip
                  header="Save Document"
                  description="Save the current document (Ctrl+S)"
                  position="top"
                  icon="save"
                  variant="info"
                >
                  <TkButton slot="trigger" icon="save" variant="text" />
                </TkTooltip>
                
                <TkTooltip
                  header="Undo"
                  description="Undo last action (Ctrl+Z)"
                  position="top"
                  icon="undo"
                  variant="info"
                >
                  <TkButton slot="trigger" icon="undo" variant="text" />
                </TkTooltip>
                
                <TkTooltip
                  header="Redo"
                  description="Redo last action (Ctrl+Y)"
                  position="top"
                  icon="redo"
                  variant="info"
                >
                  <TkButton slot="trigger" icon="redo" variant="text" />
                </TkTooltip>
                
                <TkTooltip
                  header="Delete"
                  description="Delete selected item (Cannot be undone)"
                  position="top"
                  icon="delete"
                  variant="danger"
                >
                  <TkButton slot="trigger" icon="delete" variant="text" />
                </TkTooltip>
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
import { TkCard, TkTooltip, TkButton, TkBadge, TkIcon } from '@takeoff-ui/vue';

// Interactive configuration
const interactivePosition = ref('top');
const interactiveVariant = ref('info');
const interactiveIcon = ref('info');
const interactiveHeader = ref('Interactive Tooltip');
const interactiveDescription = ref('This tooltip can be customized using the controls above. Try changing the position, variant, and content!');
</script>