<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Breadcrumb Component Demo</h2>
      </template>
      
      <div class="space-y-6">
        <!-- Basic Breadcrumb -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Breadcrumb</h3>
          <TkBreadcrumb :model="basicItems" />
        </div>

        <!-- Breadcrumb with Icons -->
        <div>
          <h3 class="text-lg font-medium mb-3">Breadcrumb with Icons</h3>
          <TkBreadcrumb :model="iconItems" separator-icon="navigate_next" />
        </div>

        <!-- Different Separators -->
        <div>
          <h3 class="text-lg font-medium mb-3">Different Separators</h3>
          <div class="space-y-4">
            <div>
              <h4 class="text-md font-medium mb-2">Icon Separator (Default)</h4>
              <TkBreadcrumb :model="separatorItems" separator="icon" />
            </div>
            <div>
              <h4 class="text-md font-medium mb-2">Slash Separator</h4>
              <TkBreadcrumb :model="separatorItems" separator="slash" />
            </div>
            <div>
              <h4 class="text-md font-medium mb-2">Dot Separator</h4>
              <TkBreadcrumb :model="separatorItems" separator="dot" />
            </div>
            <div>
              <h4 class="text-md font-medium mb-2">Vertical Separator</h4>
              <TkBreadcrumb :model="separatorItems" separator="vertical" />
            </div>
          </div>
        </div>

        <!-- Breadcrumb Types -->
        <div>
          <h3 class="text-lg font-medium mb-3">Breadcrumb Types</h3>
          <div class="space-y-4">
            <div>
              <h4 class="text-md font-medium mb-2">Basic Type (Default)</h4>
              <TkBreadcrumb :model="typeItems" type="basic" />
            </div>
            <div>
              <h4 class="text-md font-medium mb-2">Outlined Type</h4>
              <TkBreadcrumb :model="typeItems" type="outlined" />
            </div>
          </div>
        </div>

        <!-- Custom Separator Icon -->
        <div>
          <h3 class="text-lg font-medium mb-3">Custom Separator Icon</h3>
          <div class="space-y-3">
            <TkBreadcrumb :model="customItems" separator="icon" separator-icon="arrow_forward" />
            <TkBreadcrumb :model="customItems" separator="icon" separator-icon="keyboard_arrow_right" />
            <TkBreadcrumb :model="customItems" separator="icon" separator-icon="double_arrow" />
          </div>
        </div>

        <!-- Real-world Examples -->
        <div>
          <h3 class="text-lg font-medium mb-3">Real-world Examples</h3>
          <div class="space-y-4">
            <div>
              <h4 class="text-md font-medium mb-2">E-commerce Navigation</h4>
              <TkBreadcrumb :model="ecommerceItems" />
            </div>
            <div>
              <h4 class="text-md font-medium mb-2">Documentation Navigation</h4>
              <TkBreadcrumb :model="docsItems" type="outlined" />
            </div>
            <div>
              <h4 class="text-md font-medium mb-2">Dashboard Navigation</h4>
              <TkBreadcrumb :model="dashboardItems" separator="dot" />
            </div>
          </div>
        </div>

        <!-- Interactive Example -->
        <div>
          <h3 class="text-lg font-medium mb-3">Interactive Breadcrumb</h3>
          <div class="space-y-4">
            <div class="flex gap-4">
              <select v-model="selectedType" class="px-3 py-2 border rounded">
                <option value="basic">Basic</option>
                <option value="outlined">Outlined</option>
              </select>
              <select v-model="selectedSeparator" class="px-3 py-2 border rounded">
                <option value="icon">Icon</option>
                <option value="slash">Slash</option>
                <option value="dot">Dot</option>
                <option value="vertical">Vertical</option>
              </select>
              <select v-model="selectedSeparatorIcon" class="px-3 py-2 border rounded">
                <option value="chevron_right">Chevron Right</option>
                <option value="navigate_next">Navigate Next</option>
                <option value="arrow_forward">Arrow Forward</option>
                <option value="keyboard_arrow_right">Keyboard Arrow</option>
              </select>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="showIcons" class="rounded">
                Show Icons
              </label>
            </div>
            <TkBreadcrumb 
              :model="dynamicItems"
              :type="selectedType"
              :separator="selectedSeparator"
              :separator-icon="selectedSeparatorIcon"
            />
            <div class="text-sm text-gray-600">
              <p>Current path: {{ dynamicItems.map(item => item.label).join(' > ') }}</p>
            </div>
          </div>
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { TkCard, TkBreadcrumb } from '@takeoff-ui/vue';

const basicItems = ref([
  { label: 'Home', href: '/', isExternal: true },
  { label: 'Library', href: '/library', isExternal: true },
  { label: 'Data', href: '/library/data', isExternal: true },
  { label: 'Current Page' },
]);

const iconItems = ref([
  { label: 'Home', href: '/', icon: 'home', isExternal: true },
  { label: 'Library', href: '/library', icon: 'local_library', isExternal: true },
  { label: 'Data', icon: 'data_usage' },
]);

const separatorItems = ref([
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Phones' },
]);

const typeItems = ref([
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Analytics', href: '/dashboard/analytics' },
  { label: 'Reports', href: '/dashboard/analytics/reports' },
  { label: 'Monthly Report' },
]);

const customItems = ref([
  { label: 'Settings', href: '/settings' },
  { label: 'Account', href: '/settings/account' },
  { label: 'Profile' },
]);

const ecommerceItems = ref([
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'Electronics', href: '/electronics', icon: 'devices' },
  { label: 'Smartphones', href: '/electronics/smartphones', icon: 'smartphone' },
  { label: 'iPhone 15 Pro', icon: 'phone_iphone' },
]);

const docsItems = ref([
  { label: 'Documentation', href: '/docs', icon: 'book' },
  { label: 'Components', href: '/docs/components', icon: 'widgets' },
  { label: 'Forms', href: '/docs/components/forms', icon: 'dynamic_form' },
  { label: 'Input Field', icon: 'input' },
]);

const dashboardItems = ref([
  { label: 'Admin', href: '/admin', icon: 'admin_panel_settings' },
  { label: 'Users', href: '/admin/users', icon: 'people' },
  { label: 'User Management', href: '/admin/users/management', icon: 'manage_accounts' },
  { label: 'Edit User', icon: 'edit' },
]);

// Interactive controls
const selectedType = ref('basic');
const selectedSeparator = ref('icon');
const selectedSeparatorIcon = ref('chevron_right');
const showIcons = ref(true);

const dynamicItems = computed(() => {
  const baseItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Category', href: '/products/category' },
    { label: 'Item Details' },
  ];

  if (showIcons.value) {
    return [
      { ...baseItems[0], icon: 'home' },
      { ...baseItems[1], icon: 'inventory' },
      { ...baseItems[2], icon: 'category' },
      { ...baseItems[3], icon: 'info' },
    ];
  }

  return baseItems;
});
</script>
