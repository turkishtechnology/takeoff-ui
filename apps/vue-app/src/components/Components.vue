<template>
  <TkCard>
    <template #header>
      <h1 class="p-3 text-3xl font-semibold text-slate-500">Components</h1>
    </template>

    <p>Komponent testleri için aşağıdan komponent seçebilirsiniz. Burada olmayan komponentleri benzer düzende ekleyebilirsiniz.</p>

    <div class="grid grid-cols-6 gap-4 mt-4">
      <router-link 
        v-for="component in components" 
        :key="component.path"
        :to="`/components/${component.path}`" 
        class="p-4 border border-indigo-600 rounded-md text-center hover:bg-violet-100"
      >
        {{ component.name }}
      </router-link>
    </div>
  </TkCard>
</template>

<script setup>
import { TkCard } from '@takeoff-ui/vue';

const components = [
  { name: 'Input', path: 'input' },
  { name: 'Stepper', path: 'stepper' },
  { name: 'Toggle', path: 'toggle' },
  { name: 'Divider', path: 'divider' },
  { name: 'Pagination', path: 'pagination' },
  { name: 'Editor', path: 'editor' },
  { name: 'Drawer', path: 'drawer' },
  { name: 'Timeline', path: 'timeline' },
  { name: 'Spinner', path: 'spinner' },
  { name: 'Icon', path: 'icon' },
  { name: 'Chips', path: 'chips' },
  { name: 'Textarea', path: 'textarea' },
  { name: 'Chart', path: 'chart' },
  { name: 'Card', path: 'card' },
  { name: 'Badge', path: 'badge' },
  { name: 'Breadcrumb', path: 'breadcrumb' },
  { name: 'Avatar', path: 'avatar' },
  { name: 'Select', path: 'select' },
  { name: 'Slider', path: 'slider' },
  { name: 'Table', path: 'table' },
  { name: 'Datepicker', path: 'datepicker' },
  { name: 'Radio', path: 'radio' },
  { name: 'Dialog', path: 'dialog' },
  { name: 'Dropdown', path: 'dropdown' },
  { name: 'Button', path: 'button' },
  { name: 'Checkbox', path: 'checkbox' },
  { name: 'Rating', path: 'rating' },
  { name: 'Tooltip', path: 'tooltip' },
  { name: 'Alert', path: 'alert' },
  { name: 'Accordion', path: 'accordion' },
  { name: 'OrgChart', path: 'orgchart' },
  { name: 'Tabs', path: 'tabs' },
  { name: 'Toggle Button', path: 'toggle-button' },
  { name: 'Phone Input', path: 'phone-input' },
  { name: 'Currency Input', path: 'currency-input' },
  { name: 'Tree View', path: 'tree-view' },
  { name: 'Upload', path: 'upload' }
];
</script>
