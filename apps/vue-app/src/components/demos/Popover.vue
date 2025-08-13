<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Popover Component Demo</h2>
      </template>
      
      <div class="space-y-8">
        <!-- Basic Popover -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Popover</h3>
          <div class="flex gap-4">
            <TkPopover type="basic">
              <TkButton slot="trigger" label="Basic Popover" />
              <div slot="content" class="flex flex-col gap-2 w-[300px]">
                <div class="flex gap-2">
                  <TkIcon icon="info" variant="neutral" />
                  <span class="text-lg font-bold text-neutral-900">Basic Popover</span>
                </div>
                <div class="flex flex-col gap-2">
                  <span>This is a basic popover with default styling and click trigger.</span>
                </div>
              </div>
            </TkPopover>

            <TkPopover type="basic">
              <TkButton slot="trigger" label="Simple Content" />
              <div slot="content" class="p-3">
                <h4 class="font-semibold mb-2">Simple Popover</h4>
                <p class="text-sm">This is a simple popover with minimal content.</p>
              </div>
            </TkPopover>
          </div>
        </div>

        <!-- Popover Types -->
        <div>
          <h3 class="text-lg font-medium mb-3">Popover Types</h3>
          <div class="flex gap-4">
            <TkPopover type="basic">
              <TkButton slot="trigger" label="Basic Type" variant="outlined" />
              <div slot="content" class="flex flex-col gap-2 w-[300px]">
                <div class="flex gap-2">
                  <TkIcon icon="widgets" variant="neutral" />
                  <span class="text-lg font-bold text-neutral-900">Basic Type</span>
                </div>
                <div class="flex flex-col gap-2">
                  <span>This is a basic type popover with standard appearance and neutral colors.</span>
                </div>
              </div>
            </TkPopover>

            <TkPopover type="white">
              <TkButton slot="trigger" label="White Type" variant="outlined" />
              <div slot="content" class="flex flex-col gap-2 w-[300px]">
                <div class="flex gap-2">
                  <TkIcon icon="lightbulb" variant="neutral" />
                  <span class="text-lg font-bold text-neutral-900">White Type</span>
                </div>
                <div class="flex flex-col gap-2">
                  <span>This is a white type popover with a clean, bright appearance and white background.</span>
                </div>
              </div>
            </TkPopover>

            <TkPopover type="dark">
              <TkButton slot="trigger" label="Dark Type" variant="outlined" />
              <div slot="content" class="flex flex-col gap-2 w-[300px]">
                <div class="flex gap-2">
                  <TkIcon icon="dark_mode" variant="neutral" />
                  <span class="text-lg font-bold text-neutral-100">Dark Type</span>
                </div>
                <div class="flex flex-col gap-2 text-neutral-100">
                  <span>This is a dark type popover with a dark background and light text for contrast.</span>
                </div>
              </div>
            </TkPopover>
          </div>
        </div>

        <!-- Trigger Types -->
        <div>
          <h3 class="text-lg font-medium mb-3">Trigger Types</h3>
          <div class="flex gap-4">
            <TkPopover trigger="click">
              <TkButton slot="trigger" label="Click Trigger" />
              <div slot="content" class="flex flex-col gap-2 w-[300px]">
                <div class="flex gap-2">
                  <TkIcon icon="mouse" variant="neutral" />
                  <span class="text-lg font-bold text-neutral-900">Click Trigger</span>
                </div>
                <div class="flex flex-col gap-2">
                  <span>This popover opens when you click the trigger button and closes when you click outside.</span>
                </div>
              </div>
            </TkPopover>

            <TkPopover trigger="hover">
              <TkButton slot="trigger" label="Hover Trigger" />
              <div slot="content" class="flex flex-col gap-2 w-[300px]">
                <div class="flex gap-2">
                  <TkIcon icon="touch_app" variant="neutral" />
                  <span class="text-lg font-bold text-neutral-900">Hover Trigger</span>
                </div>
                <div class="flex flex-col gap-2">
                  <span>This popover opens when you hover over the trigger button and closes when you move away.</span>
                </div>
              </div>
            </TkPopover>
          </div>
        </div>

        <!-- Popover Positions -->
        <div>
          <h3 class="text-lg font-medium mb-3">Popover Positions</h3>
          <div class="space-y-8">
            <!-- Top Positions -->
            <div class="text-center">
              <h4 class="font-medium mb-4">Top Positions</h4>
              <div class="flex justify-center gap-4">
                <TkPopover position="top-start">
                  <TkButton slot="trigger" label="Top Start" />
                  <div slot="content" class="flex flex-col gap-2 w-[300px]">
                    <div class="flex gap-2">
                      <TkIcon icon="north_west" variant="neutral" />
                      <span class="text-lg font-bold text-neutral-900">Top Start Position</span>
                    </div>
                    <div class="flex flex-col gap-2">
                      <span>Popover positioned at the top-start of the trigger element.</span>
                    </div>
                  </div>
                </TkPopover>

                <TkPopover position="top">
                  <TkButton slot="trigger" label="Top Center" />
                  <div slot="content" class="flex flex-col gap-2 w-[300px]">
                    <div class="flex gap-2">
                      <TkIcon icon="north" variant="neutral" />
                      <span class="text-lg font-bold text-neutral-900">Top Center Position</span>
                    </div>
                    <div class="flex flex-col gap-2">
                      <span>Popover positioned at the top-center of the trigger element.</span>
                    </div>
                  </div>
                </TkPopover>

                <TkPopover position="top-end">
                  <TkButton slot="trigger" label="Top End" />
                  <div slot="content" class="flex flex-col gap-2 w-[300px]">
                    <div class="flex gap-2">
                      <TkIcon icon="north_east" variant="neutral" />
                      <span class="text-lg font-bold text-neutral-900">Top End Position</span>
                    </div>
                    <div class="flex flex-col gap-2">
                      <span>Popover positioned at the top-end of the trigger element.</span>
                    </div>
                  </div>
                </TkPopover>
              </div>
            </div>

            <!-- Side Positions -->
            <div class="flex justify-between items-center px-12">
              <!-- Left Positions -->
              <div class="flex flex-col gap-4">
                <h4 class="font-medium text-center">Left Positions</h4>
                <TkPopover position="left-start">
                  <TkButton slot="trigger" label="Left Start" />
                  <div slot="content" class="flex flex-col gap-2 w-[300px]">
                    <div class="flex gap-2">
                      <TkIcon icon="west" variant="neutral" />
                      <span class="text-lg font-bold text-neutral-900">Left Start</span>
                    </div>
                    <div class="flex flex-col gap-2">
                      <span>Positioned at left-start of trigger.</span>
                    </div>
                  </div>
                </TkPopover>

                <TkPopover position="left">
                  <TkButton slot="trigger" label="Left Center" />
                  <div slot="content" class="flex flex-col gap-2 w-[300px]">
                    <div class="flex gap-2">
                      <TkIcon icon="west" variant="neutral" />
                      <span class="text-lg font-bold text-neutral-900">Left Center</span>
                    </div>
                    <div class="flex flex-col gap-2">
                      <span>Positioned at left-center of trigger.</span>
                    </div>
                  </div>
                </TkPopover>

                <TkPopover position="left-end">
                  <TkButton slot="trigger" label="Left End" />
                  <div slot="content" class="flex flex-col gap-2 w-[300px]">
                    <div class="flex gap-2">
                      <TkIcon icon="south_west" variant="neutral" />
                      <span class="text-lg font-bold text-neutral-900">Left End</span>
                    </div>
                    <div class="flex flex-col gap-2">
                      <span>Positioned at left-end of trigger.</span>
                    </div>
                  </div>
                </TkPopover>
              </div>

              <!-- Right Positions -->
              <div class="flex flex-col gap-4">
                <h4 class="font-medium text-center">Right Positions</h4>
                <TkPopover position="right-start">
                  <TkButton slot="trigger" label="Right Start" />
                  <div slot="content" class="flex flex-col gap-2 w-[300px]">
                    <div class="flex gap-2">
                      <TkIcon icon="east" variant="neutral" />
                      <span class="text-lg font-bold text-neutral-900">Right Start</span>
                    </div>
                    <div class="flex flex-col gap-2">
                      <span>Positioned at right-start of trigger.</span>
                    </div>
                  </div>
                </TkPopover>

                <TkPopover position="right">
                  <TkButton slot="trigger" label="Right Center" />
                  <div slot="content" class="flex flex-col gap-2 w-[300px]">
                    <div class="flex gap-2">
                      <TkIcon icon="east" variant="neutral" />
                      <span class="text-lg font-bold text-neutral-900">Right Center</span>
                    </div>
                    <div class="flex flex-col gap-2">
                      <span>Positioned at right-center of trigger.</span>
                    </div>
                  </div>
                </TkPopover>

                <TkPopover position="right-end">
                  <TkButton slot="trigger" label="Right End" />
                  <div slot="content" class="flex flex-col gap-2 w-[300px]">
                    <div class="flex gap-2">
                      <TkIcon icon="south_east" variant="neutral" />
                      <span class="text-lg font-bold text-neutral-900">Right End</span>
                    </div>
                    <div class="flex flex-col gap-2">
                      <span>Positioned at right-end of trigger.</span>
                    </div>
                  </div>
                </TkPopover>
              </div>
            </div>

            <!-- Bottom Positions -->
            <div class="text-center">
              <h4 class="font-medium mb-4">Bottom Positions</h4>
              <div class="flex justify-center gap-4">
                <TkPopover position="bottom-start">
                  <TkButton slot="trigger" label="Bottom Start" />
                  <div slot="content" class="flex flex-col gap-2 w-[300px]">
                    <div class="flex gap-2">
                      <TkIcon icon="south_west" variant="neutral" />
                      <span class="text-lg font-bold text-neutral-900">Bottom Start</span>
                    </div>
                    <div class="flex flex-col gap-2">
                      <span>Positioned at bottom-start of trigger.</span>
                    </div>
                  </div>
                </TkPopover>

                <TkPopover position="bottom">
                  <TkButton slot="trigger" label="Bottom Center" />
                  <div slot="content" class="flex flex-col gap-2 w-[300px]">
                    <div class="flex gap-2">
                      <TkIcon icon="south" variant="neutral" />
                      <span class="text-lg font-bold text-neutral-900">Bottom Center</span>
                    </div>
                    <div class="flex flex-col gap-2">
                      <span>Positioned at bottom-center of trigger.</span>
                    </div>
                  </div>
                </TkPopover>

                <TkPopover position="bottom-end">
                  <TkButton slot="trigger" label="Bottom End" />
                  <div slot="content" class="flex flex-col gap-2 w-[300px]">
                    <div class="flex gap-2">
                      <TkIcon icon="south_east" variant="neutral" />
                      <span class="text-lg font-bold text-neutral-900">Bottom End</span>
                    </div>
                    <div class="flex flex-col gap-2">
                      <span>Positioned at bottom-end of trigger.</span>
                    </div>
                  </div>
                </TkPopover>
              </div>
            </div>
          </div>
        </div>

        <!-- Popover with Close Button -->
        <div>
          <h3 class="text-lg font-medium mb-3">Popover with Close Button</h3>
          <div class="flex gap-4">
            <TkPopover ref="popoverRef1">
              <TkButton slot="trigger" label="Inner Close Button" />
              <div slot="content" class="flex flex-col gap-2 w-[300px]">
                <div class="flex justify-between items-center">
                  <div class="flex gap-2">
                    <TkIcon icon="bolt" variant="neutral" />
                    <span class="text-lg font-bold text-neutral-900">Closable Popover</span>
                  </div>
                  <TkButton
                    icon="close"
                    type="text"
                    size="small"
                    variant="neutral"
                    @tk-click="() => popoverRef1?.$el?.close()"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <span>This popover has a close button in the top-right corner. Click it to close the popover programmatically.</span>
                </div>
              </div>
            </TkPopover>

            <TkPopover ref="popoverRef2" type="dark">
              <TkButton slot="trigger" label="Dark with Close" />
              <div slot="content" class="flex flex-col gap-2 w-[300px]">
                <div class="flex justify-between items-center">
                  <div class="flex gap-2">
                    <TkIcon icon="settings" variant="neutral" />
                    <span class="text-lg font-bold text-neutral-100">Dark Popover</span>
                  </div>
                  <TkButton
                    icon="close"
                    type="text"
                    size="small"
                    variant="neutral"
                    @tk-click="() => popoverRef2?.$el?.close()"
                  />
                </div>
                <div class="flex flex-col gap-2 text-neutral-100">
                  <span>This is a dark popover with an integrated close button for better user control.</span>
                </div>
              </div>
            </TkPopover>
          </div>
        </div>

        <!-- Different Trigger Elements -->
        <div>
          <h3 class="text-lg font-medium mb-3">Different Trigger Elements</h3>
          <div class="flex flex-wrap gap-6 items-center">
            <!-- Icon Button Trigger -->
            <TkPopover position="top">
              <TkButton slot="trigger" icon="help" variant="text" />
              <div slot="content" class="p-3 w-[250px]">
                <h4 class="font-semibold mb-2">Help Information</h4>
                <p class="text-sm">Click the help icon to get assistance with this feature.</p>
              </div>
            </TkPopover>

            <!-- Text Trigger -->
            <TkPopover position="top" trigger="hover">
              <span slot="trigger" class="underline text-blue-600 cursor-pointer">
                Hover over this text
              </span>
              <div slot="content" class="p-3 w-[200px]">
                <p class="text-sm">This popover is triggered by hovering over text elements.</p>
              </div>
            </TkPopover>

            <!-- Badge Trigger -->
            <TkPopover position="top">
              <TkBadge slot="trigger" label="New" variant="success" />
              <div slot="content" class="p-3 w-[250px]">
                <h4 class="font-semibold mb-2">New Feature</h4>
                <p class="text-sm">This badge indicates a new feature has been added to the application.</p>
              </div>
            </TkPopover>

            <!-- Avatar Trigger -->
            <TkPopover position="bottom-end">
              <TkAvatar slot="trigger" name="John Doe" size="medium" />
              <div slot="content" class="p-3 w-[200px]">
                <h4 class="font-semibold mb-2">User Profile</h4>
                <div class="space-y-1 text-sm">
                  <p><strong>Name:</strong> John Doe</p>
                  <p><strong>Role:</strong> Developer</p>
                  <p><strong>Status:</strong> Online</p>
                </div>
              </div>
            </TkPopover>
          </div>
        </div>

        <!-- Complex Content Popovers -->
        <div>
          <h3 class="text-lg font-medium mb-3">Complex Content Examples</h3>
          <div class="flex gap-4">
            <!-- Form Popover -->
            <TkPopover position="bottom" ref="formPopover">
              <TkButton slot="trigger" label="Settings Form" />
              <div slot="content" class="p-4 w-[350px]">
                <div class="flex justify-between items-center mb-4">
                  <h4 class="text-lg font-semibold">Quick Settings</h4>
                  <TkButton
                    icon="close"
                    type="text"
                    size="small"
                    @tk-click="() => formPopover?.$el?.close()"
                  />
                </div>
                <form @submit.prevent="handleFormSubmit" class="space-y-3">
                  <div>
                    <label class="block text-sm font-medium mb-1">Theme</label>
                    <TkSelect
                      v-model="formData.theme"
                      :options="[
                        { label: 'Light', value: 'light' },
                        { label: 'Dark', value: 'dark' },
                        { label: 'Auto', value: 'auto' }
                      ]"
                      size="small"
                    />
                  </div>
                  <div class="flex items-center gap-2">
                    <TkToggle v-model="formData.notifications" size="small" />
                    <label class="text-sm">Enable notifications</label>
                  </div>
                  <div class="flex gap-2 pt-2">
                    <TkButton type="submit" label="Save" size="small" variant="primary" />
                    <TkButton 
                      type="button" 
                      label="Cancel" 
                      size="small" 
                      variant="outlined"
                      @tk-click="() => formPopover?.$el?.close()"
                    />
                  </div>
                </form>
              </div>
            </TkPopover>

            <!-- Statistics Popover -->
            <TkPopover position="bottom" trigger="hover">
              <TkButton slot="trigger" label="View Stats" icon="analytics" />
              <div slot="content" class="p-4 w-[280px]">
                <h4 class="text-lg font-semibold mb-3">Analytics Overview</h4>
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-sm">Page Views</span>
                    <span class="font-semibold">12,534</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm">Unique Visitors</span>
                    <span class="font-semibold">8,921</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm">Bounce Rate</span>
                    <span class="font-semibold">23.4%</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm">Avg. Session</span>
                    <span class="font-semibold">4m 32s</span>
                  </div>
                  <div class="pt-2 border-t">
                    <TkButton label="View Details" size="small" variant="outlined" class="w-full" />
                  </div>
                </div>
              </div>
            </TkPopover>

            <!-- Rich Content Popover -->
            <TkPopover position="bottom" type="white">
              <TkButton slot="trigger" label="Rich Content" icon="article" />
              <div slot="content" class="p-4 w-[400px]">
                <div class="flex items-center gap-3 mb-3">
                  <TkAvatar name="Alice Johnson" size="small" />
                  <div>
                    <h4 class="font-semibold">Alice Johnson</h4>
                    <p class="text-sm text-gray-600">2 hours ago</p>
                  </div>
                </div>
                <p class="text-sm mb-3">
                  Just published a new article about Vue.js best practices. 
                  Check it out and let me know what you think!
                </p>
                <div class="flex gap-2">
                  <TkButton label="Read Article" size="small" variant="primary" />
                  <TkButton icon="favorite" size="small" variant="text" />
                  <TkButton icon="share" size="small" variant="text" />
                </div>
              </div>
            </TkPopover>
          </div>
        </div>

        <!-- Interactive Demo -->
        <div>
          <h3 class="text-lg font-medium mb-3">Interactive Configuration</h3>
          <div class="space-y-4">
            <div class="flex flex-wrap gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">Position:</label>
                <select v-model="configPosition" class="border rounded px-3 py-2">
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
                <label class="block text-sm font-medium mb-2">Type:</label>
                <select v-model="configType" class="border rounded px-3 py-2">
                  <option value="basic">Basic</option>
                  <option value="white">White</option>
                  <option value="dark">Dark</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Trigger:</label>
                <select v-model="configTrigger" class="border rounded px-3 py-2">
                  <option value="click">Click</option>
                  <option value="hover">Hover</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Content Text:</label>
              <textarea 
                v-model="configContent" 
                class="border rounded px-3 py-2 w-full h-20"
                placeholder="Enter popover content..."
              ></textarea>
            </div>

            <div class="pt-4">
              <TkPopover 
                :position="configPosition" 
                :type="configType" 
                :trigger="configTrigger"
              >
                <TkButton slot="trigger" label="Configurable Popover" variant="primary" />
                <div slot="content" class="p-4 w-[300px]" :class="configType === 'dark' ? 'text-white' : ''">
                  <div class="flex gap-2 mb-2">
                    <TkIcon icon="settings" :class="configType === 'dark' ? 'text-white' : ''" />
                    <span class="font-semibold">Interactive Popover</span>
                  </div>
                  <p class="text-sm">{{ configContent }}</p>
                </div>
              </TkPopover>
            </div>
          </div>
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { TkCard, TkPopover, TkButton, TkIcon, TkBadge, TkAvatar, TkSelect, TkToggle } from '@takeoff-ui/vue';

// Refs for popovers with close buttons
const popoverRef1 = ref(null);
const popoverRef2 = ref(null);
const formPopover = ref(null);

// Form data for settings popover
const formData = reactive({
  theme: 'light',
  notifications: true
});

// Interactive configuration
const configPosition = ref('bottom');
const configType = ref('basic');
const configTrigger = ref('click');
const configContent = ref('This is a configurable popover. Use the controls above to change its position, type, and trigger method. You can also customize this content text!');

// Form submit handler
const handleFormSubmit = () => {
  console.log('Form submitted:', formData);
  formPopover.value?.$el?.close();
  
  // You could show a toast or other feedback here
  alert('Settings saved successfully!');
};
</script>