<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Divider Component Demo</h2>
      </template>
      
      <div class="space-y-6">
        <!-- Basic Divider -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Divider</h3>
          <div>
            <p style="margin: 0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <TkDivider />
            <p style="margin: 0">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <TkDivider />
            <p style="margin: 0">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
            </p>
          </div>
        </div>

        <!-- Divider with Content -->
        <div>
          <h3 class="text-lg font-medium mb-3">Divider with Content</h3>
          <div>
            <p style="margin: 0">Content above the divider.</p>
            <TkDivider>OR</TkDivider>
            <p style="margin: 0">Content below the divider with text.</p>
            <TkDivider>
              <TkButton type="outlined" variant="neutral" size="small" label="Button" />
            </TkDivider>
            <p style="margin: 0">Content below the divider with a button.</p>
          </div>
        </div>

        <!-- Vertical Divider -->
        <div>
          <h3 class="text-lg font-medium mb-3">Vertical Divider</h3>
          <div style="display: flex; align-items: flex-start; gap: 16px; min-height: 200px;">
            <p style="margin: 0; flex: 1;">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <TkDivider orientation="vertical" />
            <p style="margin: 0; flex: 1;">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <TkDivider orientation="vertical" />
            <p style="margin: 0; flex: 1;">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
            </p>
          </div>
        </div>

        <!-- Custom Spacing -->
        <div>
          <h3 class="text-lg font-medium mb-3">Custom Spacing</h3>
          <div>
            <p style="margin: 0">Default spacing divider:</p>
            <TkDivider />
            <p style="margin: 0">Custom horizontal spacing (mx=32):</p>
            <TkDivider :mx="32" />
            <p style="margin: 0">Custom vertical spacing (my=48):</p>
            <TkDivider :my="48">Custom Vertical Spacing</TkDivider>
            <p style="margin: 0">Custom both spacing (mx=32, my=48):</p>
            <TkDivider :mx="32" :my="48">Custom Both Spacing</TkDivider>
            <p style="margin: 0">Content after custom spacing.</p>
          </div>
        </div>

        <!-- Divider in Cards -->
        <div>
          <h3 class="text-lg font-medium mb-3">Divider in Cards</h3>
          <div class="max-w-md">
            <TkCard header="Card with Dividers">
              <div>
                <h4 class="font-semibold">Section 1</h4>
                <p>This is the first section of content.</p>
                <TkDivider />
                <h4 class="font-semibold">Section 2</h4>
                <p>This is the second section of content.</p>
                <TkDivider>
                  <TkBadge label="Important" variant="warning" size="small" />
                </TkDivider>
                <h4 class="font-semibold">Section 3</h4>
                <p>This is the third section with a badge divider above.</p>
              </div>
            </TkCard>
          </div>
        </div>

        <!-- Navigation Dividers -->
        <div>
          <h3 class="text-lg font-medium mb-3">Navigation with Dividers</h3>
          <div class="bg-gray-50 p-4 rounded-lg">
            <div style="display: flex; align-items: center; gap: 16px;">
              <a href="#" class="text-blue-600 hover:text-blue-800">Home</a>
              <TkDivider orientation="vertical" />
              <a href="#" class="text-blue-600 hover:text-blue-800">Products</a>
              <TkDivider orientation="vertical" />
              <a href="#" class="text-blue-600 hover:text-blue-800">Services</a>
              <TkDivider orientation="vertical" />
              <a href="#" class="text-blue-600 hover:text-blue-800">Contact</a>
            </div>
          </div>
        </div>

        <!-- Content Sections -->
        <div>
          <h3 class="text-lg font-medium mb-3">Content Sections</h3>
          <div>
            <div class="mb-4">
              <h4 class="text-lg font-semibold">Introduction</h4>
              <p>This is the introduction section of our content.</p>
            </div>
            <TkDivider>Chapter 1</TkDivider>
            <div class="mb-4">
              <h4 class="text-lg font-semibold">Getting Started</h4>
              <p>Learn the basics of using this component library.</p>
            </div>
            <TkDivider>Chapter 2</TkDivider>
            <div class="mb-4">
              <h4 class="text-lg font-semibold">Advanced Usage</h4>
              <p>Explore advanced features and customization options.</p>
            </div>
            <TkDivider>
              <div class="flex items-center gap-2">
                <TkIcon name="star" />
                <span>Featured</span>
              </div>
            </TkDivider>
            <div class="mb-4">
              <h4 class="text-lg font-semibold">Best Practices</h4>
              <p>Learn the recommended patterns and best practices.</p>
            </div>
          </div>
        </div>

        <!-- Interactive Divider -->
        <div>
          <h3 class="text-lg font-medium mb-3">Interactive Divider Example</h3>
          <div class="space-y-4">
            <div class="flex gap-4">
              <select v-model="selectedOrientation" class="px-3 py-2 border rounded">
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
              </select>
              <div class="flex items-center gap-2">
                <label>Margin X:</label>
                <input 
                  type="number" 
                  v-model="marginX" 
                  class="w-20 px-2 py-1 border rounded"
                  min="0"
                  max="100"
                >
              </div>
              <div class="flex items-center gap-2">
                <label>Margin Y:</label>
                <input 
                  type="number" 
                  v-model="marginY" 
                  class="w-20 px-2 py-1 border rounded"
                  min="0"
                  max="100"
                >
              </div>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="showContent" class="rounded">
                Show Content
              </label>
            </div>
            
            <div v-if="selectedOrientation === 'horizontal'">
              <p style="margin: 0">Content above the interactive divider.</p>
              <TkDivider 
                :orientation="selectedOrientation"
                :mx="marginX || null"
                :my="marginY || null"
              >
                <span v-if="showContent">Interactive Content</span>
              </TkDivider>
              <p style="margin: 0">Content below the interactive divider.</p>
            </div>

            <div v-else style="display: flex; align-items: flex-start; gap: 16px; min-height: 150px;">
              <p style="margin: 0; flex: 1;">Content on the left side of the interactive vertical divider.</p>
              <TkDivider 
                :orientation="selectedOrientation"
                :mx="marginX || null"
                :my="marginY || null"
              />
              <p style="margin: 0; flex: 1;">Content on the right side of the interactive vertical divider.</p>
            </div>
          </div>
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TkCard, TkDivider, TkButton, TkBadge, TkIcon } from '@takeoff-ui/vue';

// Interactive controls
const selectedOrientation = ref('horizontal');
const marginX = ref(0);
const marginY = ref(0);
const showContent = ref(true);
</script>
