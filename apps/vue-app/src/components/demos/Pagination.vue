<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Pagination Component Demo</h2>
      </template>
      
      <div class="space-y-8">
        <!-- Basic Pagination -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Pagination</h3>
          <TkPagination 
            :total-items="250" 
            :rows-per-page="10"
            :current-page="currentPageBasic"
            @tk-page-change="handleBasicPageChange"
            @tk-rows-per-page-change="handleBasicRowsPerPageChange"
          />
          <div class="mt-2 text-sm text-gray-600">
            Current Page: {{ currentPageBasic }}, Items per page: {{ rowsPerPageBasic }}
          </div>
        </div>

        <!-- Different Types -->
        <div>
          <h3 class="text-lg font-medium mb-3">Pagination Types</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-medium mb-2">Outlined (Default)</h4>
              <TkPagination 
                :total-items="150" 
                :rows-per-page="10"
                type="outlined"
                :current-page="currentPageOutlined"
                @tk-page-change="(e) => currentPageOutlined = e.detail"
              />
            </div>
            
            <div>
              <h4 class="font-medium mb-2">Grouped</h4>
              <TkPagination 
                :total-items="150" 
                :rows-per-page="10"
                type="grouped"
                :current-page="currentPageGrouped"
                @tk-page-change="(e) => currentPageGrouped = e.detail"
              />
            </div>
            
            <div>
              <h4 class="font-medium mb-2">Text</h4>
              <TkPagination 
                :total-items="150" 
                :rows-per-page="10"
                type="text"
                :current-page="currentPageText"
                @tk-page-change="(e) => currentPageText = e.detail"
              />
            </div>
          </div>
        </div>

        <!-- Different Modes -->
        <div>
          <h3 class="text-lg font-medium mb-3">Pagination Modes</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-medium mb-2">Default Mode</h4>
              <TkPagination 
                :total-items="200" 
                :rows-per-page="10"
                :current-page="currentPageDefault"
                @tk-page-change="(e) => currentPageDefault = e.detail"
              />
            </div>
            
            <div>
              <h4 class="font-medium mb-2">Compact Mode</h4>
              <TkPagination 
                :total-items="200" 
                :rows-per-page="10"
                mode="compact"
                :current-page="currentPageCompact"
                @tk-page-change="(e) => currentPageCompact = e.detail"
              />
            </div>
            
            <div>
              <h4 class="font-medium mb-2">Compact Expanded Mode</h4>
              <TkPagination 
                :total-items="200" 
                :rows-per-page="10"
                mode="compact-expanded"
                :current-page="currentPageCompactExpanded"
                @tk-page-change="(e) => currentPageCompactExpanded = e.detail"
              />
            </div>
          </div>
        </div>

        <!-- Rounded Pagination -->
        <div>
          <h3 class="text-lg font-medium mb-3">Rounded Pagination</h3>
          <TkPagination 
            :total-items="120" 
            :rows-per-page="12"
            :rounded="true"
            :current-page="currentPageRounded"
            @tk-page-change="(e) => currentPageRounded = e.detail"
          />
        </div>

        <!-- Custom Rows Per Page Options -->
        <div>
          <h3 class="text-lg font-medium mb-3">Custom Rows Per Page Options</h3>
          <TkPagination 
            :total-items="500" 
            :rows-per-page="rowsPerPageCustom"
            :rows-per-page-options="[10, 25, 50, 100]"
            :current-page="currentPageCustom"
            @tk-page-change="handleCustomPageChange"
            @tk-rows-per-page-change="handleCustomRowsPerPageChange"
          />
          <div class="mt-2 text-sm text-gray-600">
            Current: Page {{ currentPageCustom }} of {{ Math.ceil(500 / rowsPerPageCustom) }}, 
            showing {{ rowsPerPageCustom }} items per page
          </div>
        </div>

        <!-- Event Handling Demo -->
        <div>
          <h3 class="text-lg font-medium mb-3">Event Handling</h3>
          <TkPagination 
            :total-items="300" 
            :rows-per-page="15"
            :current-page="eventDemoPage"
            @tk-page-change="handleEventPageChange"
            @tk-next-page="handleNextPage"
            @tk-prev-page="handlePrevPage"
            @tk-rows-per-page-change="handleEventRowsPerPageChange"
          />
          <div class="mt-4 p-4 bg-gray-50 border rounded-lg">
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
import { TkCard, TkPagination } from '@takeoff-ui/vue';

// Basic pagination
const currentPageBasic = ref(1);
const rowsPerPageBasic = ref(10);

// Type demos
const currentPageOutlined = ref(1);
const currentPageGrouped = ref(1);
const currentPageText = ref(1);

// Mode demos
const currentPageDefault = ref(1);
const currentPageCompact = ref(1);
const currentPageCompactExpanded = ref(1);

// Rounded demo
const currentPageRounded = ref(1);

// Custom options demo
const currentPageCustom = ref(1);
const rowsPerPageCustom = ref(25);

// Event demo
const eventDemoPage = ref(1);
const eventLog = ref([]);

const handleBasicPageChange = (event) => {
  currentPageBasic.value = event.detail;
};

const handleBasicRowsPerPageChange = (event) => {
  rowsPerPageBasic.value = event.detail;
  currentPageBasic.value = 1; // Reset to first page when changing rows per page
};

const handleCustomPageChange = (event) => {
  currentPageCustom.value = event.detail;
};

const handleCustomRowsPerPageChange = (event) => {
  rowsPerPageCustom.value = event.detail;
  currentPageCustom.value = 1; // Reset to first page
};

const handleEventPageChange = (event) => {
  eventDemoPage.value = event.detail;
  addEventLog(`Page changed to: ${event.detail}`);
};

const handleNextPage = (event) => {
  addEventLog(`Next page clicked. New page: ${event.detail}`);
};

const handlePrevPage = (event) => {
  addEventLog(`Previous page clicked. New page: ${event.detail}`);
};

const handleEventRowsPerPageChange = (event) => {
  eventDemoPage.value = 1; // Reset to first page
  addEventLog(`Rows per page changed to: ${event.detail}`);
};

const addEventLog = (message) => {
  const timestamp = new Date().toLocaleTimeString();
  eventLog.value.unshift(`${timestamp}: ${message}`);
  
  // Keep only last 10 events
  if (eventLog.value.length > 10) {
    eventLog.value = eventLog.value.slice(0, 10);
  }
};
</script>
