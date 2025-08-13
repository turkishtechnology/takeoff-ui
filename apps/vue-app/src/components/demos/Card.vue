<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Card Component Demo</h2>
      </template>
      
      <div class="space-y-6">
        <!-- Basic Card -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Card</h3>
          <div class="max-w-md">
            <TkCard header="Basic Card Title">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
              </p>
            </TkCard>
          </div>
        </div>

        <!-- Card with Header Types -->
        <div>
          <h3 class="text-lg font-medium mb-3">Header Types</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TkCard header="Basic Header" header-type="basic">
              <p>Card with basic header type.</p>
            </TkCard>
            <TkCard header="Primary Header" header-type="primary">
              <p>Card with primary header type.</p>
            </TkCard>
            <TkCard header="Dark Header" header-type="dark">
              <p>Card with dark header type.</p>
            </TkCard>
            <TkCard header="Light Header" header-type="light">
              <p>Card with light header type.</p>
            </TkCard>
          </div>
        </div>

        <!-- Card with Footer -->
        <div>
          <h3 class="text-lg font-medium mb-3">Card with Footer</h3>
          <div class="max-w-md">
            <TkCard header="Card with Footer" footer-type="basic">
              <p>This card has content and footer actions.</p>
              <template #footer-actions>
                <TkButton label="Cancel" variant="neutral" type="text" />
                <TkButton label="Submit" variant="primary" />
              </template>
            </TkCard>
          </div>
        </div>

        <!-- Card with Avatar -->
        <div>
          <h3 class="text-lg font-medium mb-3">Card with Avatar</h3>
          <div class="max-w-md">
            <TkCard 
              header="User Profile" 
              subheader="Profile information"
              :show-avatar="true"
              :avatar-props="{ label: 'JD', variant: 'primary', background: 'solid', rounded: true }"
            >
              <p>User profile card with avatar in the header.</p>
              <template #footer-actions>
                <TkButton label="Edit Profile" variant="primary" size="small" />
              </template>
            </TkCard>
          </div>
        </div>

        <!-- Card with Image -->
        <div>
          <h3 class="text-lg font-medium mb-3">Card with Image</h3>
          <div class="max-w-sm">
            <TkCard 
              header="Top Image" 
              image="https://via.placeholder.com/400x200"
              :image-options="{ position: 'top', windowed: true }"
              :show-avatar="false"
              :show-menu-button="true"
            >
              <p>Card with top image in windowed mode.</p>
              <template #footer-actions>
                <TkButton label="Cancel" variant="neutral" type="text" />
                <TkButton label="Submit" variant="primary" />
              </template>
            </TkCard>
          </div>
        </div>

        <!-- Horizontal Card -->
        <div>
          <h3 class="text-lg font-medium mb-3">Horizontal Card</h3>
          <div class="max-w-2xl">
            <TkCard 
              header="Horizontal Layout" 
              :horizontal="true"
              image="https://via.placeholder.com/200x150"
              :image-options="{ position: 'left' }"
            >
              <p>This is a horizontal card layout with image on the left side. The content flows next to the image.</p>
              <template #footer-actions>
                <TkButton label="Learn More" variant="primary" size="small" />
              </template>
            </TkCard>
          </div>
        </div>

        <!-- Card with Hover Effects -->
        <div>
          <h3 class="text-lg font-medium mb-3">Card with Hover Effects</h3>
          <div class="max-w-md">
            <TkCard 
              header="Hover Effect" 
              :enable-hover-shadow="true"
            >
              <p>This card shows a shadow effect when you hover over it.</p>
            </TkCard>
          </div>
        </div>

        <!-- Card without Header -->
        <div>
          <h3 class="text-lg font-medium mb-3">Card without Header</h3>
          <div class="max-w-md">
            <TkCard :hide-header="true">
              <p>This card has no header, just content and optional footer.</p>
              <template #footer-actions>
                <TkButton label="Action" variant="primary" size="small" />
              </template>
            </TkCard>
          </div>
        </div>

        <!-- Custom Content Card -->
        <div>
          <h3 class="text-lg font-medium mb-3">Custom Content Card</h3>
          <div class="max-w-md">
            <TkCard>
              <template #header>
                <div class="flex items-center gap-3 p-4">
                  <TkAvatar label="JS" variant="primary" background="solid" rounded />
                  <div>
                    <h3 class="font-semibold">John Smith</h3>
                    <p class="text-sm text-gray-600">Software Engineer</p>
                  </div>
                </div>
              </template>
              <template #content>
                <div class="space-y-3">
                  <p>Custom content with various elements:</p>
                  <div class="flex gap-2">
                    <TkBadge label="JavaScript" variant="primary" size="small" />
                    <TkBadge label="Vue.js" variant="success" size="small" />
                    <TkBadge label="Node.js" variant="info" size="small" />
                  </div>
                  <TkRating type="star" :value="4.5" :show-rating-value="true" readonly />
                </div>
              </template>
              <template #footer>
                <div class="flex justify-between items-center p-4 bg-gray-50">
                  <span class="text-sm text-gray-600">Member since 2020</span>
                  <TkButton label="Contact" variant="primary" size="small" />
                </div>
              </template>
            </TkCard>
          </div>
        </div>

        <!-- Interactive Card Example -->
        <div>
          <h3 class="text-lg font-medium mb-3">Interactive Card Example</h3>
          <div class="space-y-4">
            <div class="flex gap-4">
              <select v-model="selectedHeaderType" class="px-3 py-2 border rounded">
                <option value="basic">Basic</option>
                <option value="primary">Primary</option>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
              <select v-model="selectedFooterType" class="px-3 py-2 border rounded">
                <option value="basic">Basic</option>
                <option value="divided">Divided</option>
                <option value="light">Light</option>
              </select>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="showAvatar" class="rounded">
                Show Avatar
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="showMenuButton" class="rounded">
                Menu Button
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="enableHover" class="rounded">
                Hover Effect
              </label>
            </div>
            <div class="max-w-md">
              <TkCard 
                :header="dynamicHeader"
                :subheader="showAvatar ? 'Interactive subheader' : null"
                :header-type="selectedHeaderType"
                :footer-type="selectedFooterType"
                :show-avatar="showAvatar"
                :show-menu-button="showMenuButton"
                :enable-hover-shadow="enableHover"
                :avatar-props="{ label: 'IC', variant: 'primary', background: 'solid', rounded: true }"
              >
                <p>This is an interactive card that changes based on your selections above.</p>
                <template #footer-actions>
                  <TkButton label="Cancel" variant="neutral" type="text" size="small" />
                  <TkButton label="Apply" variant="primary" size="small" />
                </template>
              </TkCard>
            </div>
          </div>
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { TkCard, TkButton, TkAvatar, TkBadge, TkRating } from '@takeoff-ui/vue';

// Interactive controls
const selectedHeaderType = ref('basic');
const selectedFooterType = ref('basic');
const showAvatar = ref(false);
const showMenuButton = ref(false);
const enableHover = ref(false);

const dynamicHeader = computed(() => {
  return `Interactive Card - ${selectedHeaderType.value}`;
});
</script>
