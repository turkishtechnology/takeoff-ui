<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Table Component Demo</h2>
      </template>
      
      <div class="space-y-8">
        <!-- Basic Table -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Table</h3>
          <TkTable :columns="basicColumns" :data="basicData" />
        </div>

        <!-- Table with Pagination -->
        <div>
          <h3 class="text-lg font-medium mb-3">Table with Pagination</h3>
          <TkTable 
            :columns="basicColumns" 
            :data="paginationData" 
            pagination-method="client"
            :rows-per-page="5"
            :total-items="paginationData.length"
          />
        </div>

        <!-- Sortable and Filterable Table -->
        <div>
          <h3 class="text-lg font-medium mb-3">Sortable & Filterable Table</h3>
          <TkTable :columns="filterColumns" :data="filterData" />
        </div>

        <!-- Table with Selection -->
        <div>
          <h3 class="text-lg font-medium mb-3">Table with Selection</h3>
          <div class="mb-4 space-x-2">
            <TkButton 
              :variant="selectionMode === 'checkbox' ? 'primary' : 'outlined'"
              @click="selectionMode = 'checkbox'"
            >
              Multiple Selection
            </TkButton>
            <TkButton 
              :variant="selectionMode === 'radio' ? 'primary' : 'outlined'"
              @click="selectionMode = 'radio'"
            >
              Single Selection
            </TkButton>
          </div>
          <TkTable 
            :columns="basicColumns" 
            :data="basicData"
            data-key="id"
            :selection-mode="selectionMode"
            @tk-selection-change="handleSelectionChange"
          />
          <div v-if="selectedItems && Object.keys(selectedItems).length > 0" class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p><strong>Selected Items:</strong></p>
            <pre class="text-sm">{{ JSON.stringify(selectedItems, null, 2) }}</pre>
          </div>
        </div>

        <!-- Striped Table -->
        <div>
          <h3 class="text-lg font-medium mb-3">Striped Table</h3>
          <TkTable :columns="basicColumns" :data="basicData" striped />
        </div>

        <!-- Different Sizes -->
        <div>
          <h3 class="text-lg font-medium mb-3">Table Sizes</h3>
          <div class="space-y-6">
            <div>
              <h4 class="font-medium mb-2">Small Size</h4>
              <TkTable :columns="basicColumns" :data="basicData.slice(0, 3)" size="small" />
            </div>
            <div>
              <h4 class="font-medium mb-2">Base Size (Default)</h4>
              <TkTable :columns="basicColumns" :data="basicData.slice(0, 3)" size="base" />
            </div>
          </div>
        </div>

        <!-- Header Types -->
        <div>
          <h3 class="text-lg font-medium mb-3">Header Types</h3>
          <div class="space-y-6">
            <div>
              <h4 class="font-medium mb-2">Basic Header</h4>
              <TkTable :columns="basicColumns" :data="basicData.slice(0, 3)" header-type="basic" />
            </div>
            <div>
              <h4 class="font-medium mb-2">Primary Header</h4>
              <TkTable :columns="basicColumns" :data="basicData.slice(0, 3)" header-type="primary" />
            </div>
            <div>
              <h4 class="font-medium mb-2">Dark Header</h4>
              <TkTable :columns="basicColumns" :data="basicData.slice(0, 3)" header-type="dark" />
            </div>
          </div>
        </div>

        <!-- Custom Cell Content -->
        <div>
          <h3 class="text-lg font-medium mb-3">Custom Cell Content</h3>
          <TkTable :columns="customColumns" :data="basicData" />
        </div>

        <!-- Row and Cell Styling -->
        <div>
          <h3 class="text-lg font-medium mb-3">Custom Styling</h3>
          <TkTable 
            :columns="basicColumns" 
            :data="basicData"
            :row-style="customRowStyle"
            :cell-style="customCellStyle"
          />
        </div>

        <!-- Expandable Rows -->
        <div>
          <h3 class="text-lg font-medium mb-3">Expandable Rows</h3>
          <TkTable 
            :columns="expandableColumns" 
            :data="basicData"
            data-key="id"
            :expanded-rows="expandedRows"
            @tk-expanded-rows-change="handleExpandedRowsChange"
          >
            <div 
              v-for="item in expandedRows" 
              :key="`expand-${item.id}`" 
              :slot="`expand-content-${item.id}`"
            >
              <div class="p-4 bg-gray-50 border-t">
                <h4 class="font-medium mb-2">Additional Details for {{ item.name }}</h4>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>ID:</strong> {{ item.id }}</div>
                  <div><strong>Category:</strong> {{ item.category }}</div>
                  <div><strong>Quantity:</strong> {{ item.quantity }}</div>
                  <div><strong>Status:</strong> Active</div>
                </div>
              </div>
            </div>
          </TkTable>
        </div>

        <!-- Export Table -->
        <div>
          <h3 class="text-lg font-medium mb-3">Export Table</h3>
          <TkTable ref="exportTable" :columns="basicColumns" :data="basicData">
            <div slot="header-right">
              <TkDropdown
                :options="exportOptions"
                position="bottom-end"
                @tk-item-click="handleExport"
              >
                <TkButton
                  slot="trigger"
                  label="Export"
                  icon="file_download"
                  icon-position="right"
                  variant="outlined"
                />
              </TkDropdown>
            </div>
          </TkTable>
        </div>

        <!-- Card Title -->
        <div>
          <h3 class="text-lg font-medium mb-3">Table with Card Title</h3>
          <TkTable 
            :columns="basicColumns" 
            :data="basicData" 
            card-title="Product Inventory"
          />
        </div>

        <!-- Pagination Types -->
        <div>
          <h3 class="text-lg font-medium mb-3">Pagination Types</h3>
          <div class="space-y-6">
            <div>
              <h4 class="font-medium mb-2">Outlined Pagination (Default)</h4>
              <TkTable 
                :columns="basicColumns" 
                :data="paginationData" 
                pagination-method="client"
                :rows-per-page="3"
                :total-items="paginationData.length"
                pagination-type="outlined"
              />
            </div>
            <div>
              <h4 class="font-medium mb-2">Grouped Pagination</h4>
              <TkTable 
                :columns="basicColumns" 
                :data="paginationData" 
                pagination-method="client"
                :rows-per-page="3"
                :total-items="paginationData.length"
                pagination-type="grouped"
              />
            </div>
            <div>
              <h4 class="font-medium mb-2">Text Pagination</h4>
              <TkTable 
                :columns="basicColumns" 
                :data="paginationData" 
                pagination-method="client"
                :rows-per-page="3"
                :total-items="paginationData.length"
                pagination-type="text"
              />
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div>
          <h3 class="text-lg font-medium mb-3">Loading State</h3>
          <div class="space-y-4">
            <TkButton @click="toggleLoading" :variant="isLoading ? 'success' : 'primary'">
              {{ isLoading ? 'Stop Loading' : 'Show Loading' }}
            </TkButton>
            <TkTable 
              :columns="basicColumns" 
              :data="basicData" 
              :loading="isLoading"
            />
          </div>
        </div>

        <!-- Container Style -->
        <div>
          <h3 class="text-lg font-medium mb-3">Custom Container Style</h3>
          <TkTable 
            :columns="basicColumns" 
            :data="basicData.slice(0, 3)" 
            :container-style="{
              backgroundColor: '#f8fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              padding: '16px'
            }"
          />
        </div>

        <!-- Sticky Columns -->
        <div>
          <h3 class="text-lg font-medium mb-3">Sticky Columns</h3>
          <TkTable :columns="stickyColumns" :data="stickyData" />
        </div>

        <!-- Custom Headers -->
        <div>
          <h3 class="text-lg font-medium mb-3">Custom Header HTML</h3>
          <TkTable :columns="customHeaderColumns" :data="basicData.slice(0, 3)" />
        </div>

        <!-- Methods Demo -->
        <div>
          <h3 class="text-lg font-medium mb-3">Table Methods</h3>
          <div class="space-y-4">
            <div class="flex gap-2 flex-wrap">
              <TkButton @click="clearFilters" variant="outlined">Clear Filters</TkButton>
              <TkButton @click="clearSorting" variant="outlined">Clear Sorting</TkButton>
              <TkButton @click="setCurrentPage" variant="outlined">Go to Page 2</TkButton>
              <TkButton @click="triggerServerRequest" variant="outlined">Server Request</TkButton>
            </div>
            <TkTable 
              ref="methodsTable"
              :columns="filterColumns" 
              :data="filterData" 
              pagination-method="client"
              :rows-per-page="3"
              :total-items="filterData.length"
            />
          </div>
        </div>

        <!-- Event Handling Demo -->
        <div>
          <h3 class="text-lg font-medium mb-3">Event Handling</h3>
          <TkTable 
            :columns="basicColumns" 
            :data="basicData"
            @tk-row-click="handleRowClick"
          />
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
import { TkCard, TkTable, TkButton, TkDropdown } from '@takeoff-ui/vue';

// Sample data
const basicData = ref([
  { id: 'f230fh0g3', name: 'Bamboo Watch', category: 'Accessories', quantity: 24 },
  { id: 'nvklal433', name: 'Black Watch', category: 'Electronics', quantity: 42 },
  { id: 'zz21cz3c1', name: 'Blue Band', category: 'Accessories', quantity: 87 },
  { id: '244wgerg2', name: 'Blue T-Shirt', category: 'Clothing', quantity: 12 },
  { id: 'h456wer53', name: 'Bracelet', category: 'Accessories', quantity: 45 },
]);

const paginationData = ref([
  ...basicData.value,
  { id: '344wgerg2', name: 'Art Venere', category: 'Accessories', quantity: 23 },
  { id: '144wgerg3', name: 'Simona Morasca', category: 'Clothing', quantity: 56 },
  { id: '444wgerg6', name: 'Leota Dilliard', category: 'Electronics', quantity: 89 },
  { id: 'k14wgerj1', name: 'Sage Wieser', category: 'Accessories', quantity: 77 },
  { id: 'fq4wgergq', name: 'Kris Marrier', category: 'Clothing', quantity: 65 },
  { id: '764wger11', name: 'Abel Maclead', category: 'Electronics', quantity: 61 },
  { id: '08ge885f', name: 'Mattie Poquette', category: 'Clothing', quantity: 42 },
]);

const filterData = ref([
  { id: 'f230fh0g3', name: 'Bamboo Watch', status: 'active', group: 'group 1', quantity: 24 },
  { id: 'nvklal433', name: 'Black Watch', status: 'inactive', group: 'group 2', quantity: 42 },
  { id: 'zz21cz3c1', name: 'Blue Band', status: 'active', group: 'group 3', quantity: 87 },
  { id: '244wgerg2', name: 'Blue T-Shirt', status: 'pending', group: 'group 1', quantity: 12 },
  { id: 'h456wer53', name: 'Bracelet', status: 'inactive', group: 'group 2', quantity: 45 },
]);

// Column definitions
const basicColumns = ref([
  { field: 'id', header: 'ID' },
  { field: 'name', header: 'Name' },
  { field: 'category', header: 'Category' },
  { field: 'quantity', header: 'Quantity' },
]);

const filterColumns = ref([
  { field: 'id', header: 'ID' },
  {
    field: 'name',
    header: 'Name',
    searchable: true,
    sortable: true,
    sorter: (a, b) => (a.name > b.name ? 1 : -1),
    filter: (value, row) =>
      row.name.toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1,
  },
  {
    field: 'status',
    header: 'Status',
    searchable: true,
    filterType: 'checkbox',
    filterOptions: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'pending', label: 'Pending' },
    ],
  },
  {
    field: 'group',
    header: 'Group',
    searchable: true,
    filterType: 'radio',
    filterOptions: [
      { value: 'group 1', label: 'Group 1' },
      { value: 'group 2', label: 'Group 2' },
      { value: 'group 3', label: 'Group 3' },
    ],
  },
  {
    field: 'quantity',
    header: 'Quantity',
    sortable: true,
    sorter: (a, b) => (Number(a.quantity) > Number(b.quantity) ? 1 : -1),
  },
]);

const customColumns = ref([
  { field: 'id', header: 'ID' },
  { field: 'name', header: 'Name' },
  {
    field: 'category',
    header: 'Category',
    html: (row) => `<tk-badge label="${row.category}" variant="primary"></tk-badge>`
  },
  { field: 'quantity', header: 'Quantity' },
]);

const expandableColumns = ref([
  { expander: true, field: '', header: '' },
  { field: 'id', header: 'ID' },
  { field: 'name', header: 'Name' },
  { field: 'category', header: 'Category' },
  { field: 'quantity', header: 'Quantity' },
]);

// State
const selectionMode = ref('checkbox');
const selectedItems = ref({});
const expandedRows = ref([]);
const eventLog = ref([]);
const exportTable = ref(null);
const methodsTable = ref(null);
const isLoading = ref(false);

const exportOptions = ref([
  { label: 'PDF', value: 'pdf' },
  { label: 'Excel', value: 'excel' },
  { label: 'CSV', value: 'csv' },
]);

// Sticky columns data
const stickyData = ref([
  {
    id: 'f230fh0g3',
    name: 'Bamboo Watch',
    category: 'Accessories',
    quantity: 24,
    startDate: '12:20',
    endDate: '13:20',
    duration: '60 minutes',
    place: 'Ankara',
    status: 'Onboard'
  },
  {
    id: 'nvklal433',
    name: 'Black Watch',
    category: 'Electronics',
    quantity: 42,
    startDate: '11:40',
    endDate: '15:20',
    duration: '220 minutes',
    place: 'Istanbul',
    status: 'Boarding'
  },
  {
    id: 'zz21cz3c1',
    name: 'Blue Band',
    category: 'Accessories',
    quantity: 87,
    startDate: '09:00',
    endDate: '15:00',
    duration: '360 minutes',
    place: 'Paris',
    status: 'Departed'
  }
]);

const stickyColumns = ref([
  { field: 'id', header: 'ID', fixed: 'left' },
  { field: 'name', header: 'Name' },
  { field: 'category', header: 'Category' },
  { field: 'quantity', header: 'Quantity' },
  { field: 'startDate', header: 'Start Date' },
  { field: 'endDate', header: 'End Date' },
  { field: 'duration', header: 'Duration' },
  { field: 'place', header: 'Place' },
  { field: 'status', header: 'Status', fixed: 'right' }
]);

const customHeaderColumns = ref([
  { field: 'id', header: 'ID' },
  {
    field: 'name',
    header: 'Name',
    headerHtml: () => '<div style="color: red; font-weight: bold;">Custom Name Header</div>'
  },
  {
    field: 'category',
    header: 'Category',
    headerHtml: () => {
      const div = document.createElement('div');
      div.innerHTML = '<span style="color: blue;">📂 Category</span>';
      return div;
    }
  },
  { field: 'quantity', header: 'Quantity' }
]);

// Event handlers
const handleSelectionChange = (event) => {
  selectedItems.value = { ...event.detail };
};

const handleExpandedRowsChange = (event) => {
  expandedRows.value = [...event.detail];
};

const handleRowClick = (event) => {
  const timestamp = new Date().toLocaleTimeString();
  eventLog.value.unshift(`${timestamp}: Row clicked - ${event.detail.name} (ID: ${event.detail.id})`);
  
  // Keep only last 5 events
  if (eventLog.value.length > 5) {
    eventLog.value = eventLog.value.slice(0, 5);
  }
};

const handleExport = (event) => {
  exportTable.value?.$el.exportFile({
    type: event.detail.value,
    fileName: 'table_export',
  });
};

// Custom styling functions
const customRowStyle = (row) => {
  if (row.quantity > 50) {
    return {
      background: 'rgba(34, 197, 94, 0.1)',
      color: 'black',
    };
  }
  return null;
};

const customCellStyle = (row, col) => {
  if (col.field === 'name' && row.name === 'Blue Band') {
    return { 
      background: 'rgba(59, 130, 246, 0.1)', 
      color: '#1d4ed8',
      fontWeight: 'bold'
    };
  }
  return null;
};

// Methods functions
const toggleLoading = () => {
  isLoading.value = !isLoading.value;
};

const clearFilters = () => {
  if (methodsTable.value) {
    methodsTable.value.$el.clearFilters();
    console.log('Filters cleared');
  }
};

const clearSorting = () => {
  if (methodsTable.value) {
    methodsTable.value.$el.clearSorting();
    console.log('Sorting cleared');
  }
};

const setCurrentPage = () => {
  if (methodsTable.value) {
    methodsTable.value.$el.setCurrentPage(2);
    console.log('Current page set to 2');
  }
};

const triggerServerRequest = () => {
  if (methodsTable.value) {
    methodsTable.value.$el.serverRequest();
    console.log('Server request triggered');
  }
};
</script>
