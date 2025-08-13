<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">OrgChart Component Demo</h2>
      </template>
      
      <div class="space-y-8">
        <!-- Basic OrgChart -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Organization Chart</h3>
          <div class="border rounded-lg p-4">
            <TkOrgChart 
              :data="basicOrgData"
              @tk-node-click="handleNodeClick"
              accessibility-label="Basic Organization Chart"
            />
          </div>
        </div>

        <!-- Non-Collapsible OrgChart -->
        <div>
          <h3 class="text-lg font-medium mb-3">Non-Collapsible Organization Chart</h3>
          <div class="border rounded-lg p-4">
            <TkOrgChart 
              :data="basicOrgData"
              :collapsible="false"
              @tk-node-click="handleNodeClick"
              accessibility-label="Non-Collapsible Organization Chart"
            />
          </div>
        </div>

        <!-- Collapsible OrgChart -->
        <div>
          <h3 class="text-lg font-medium mb-3">Collapsible Organization Chart</h3>
          <div class="border rounded-lg p-4">
            <TkOrgChart 
              :data="collapsibleOrgData"
              :collapsible="true"
              @tk-node-click="handleNodeClick"
              accessibility-label="Collapsible Organization Chart"
            />
          </div>
        </div>

        <!-- Custom Styled OrgChart -->
        <div>
          <h3 class="text-lg font-medium mb-3">Custom Styled Organization Chart</h3>
          <div class="border rounded-lg p-4 bg-gray-50">
            <TkOrgChart 
              :data="styledOrgData"
              :options="customOptions"
              :collapsible="true"
              @tk-node-click="handleNodeClick"
              accessibility-label="Custom Styled Organization Chart"
            />
          </div>
        </div>

        <!-- Event Demo -->
        <div v-if="selectedNode">
          <h3 class="text-lg font-medium mb-3">Node Click Event</h3>
          <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p><strong>Selected Node:</strong> {{ selectedNode.name }}</p>
            <p><strong>Title:</strong> {{ selectedNode.title }}</p>
            <p><strong>Department:</strong> {{ selectedNode.department || 'N/A' }}</p>
          </div>
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TkCard, TkOrgChart } from '@takeoff-ui/vue';

const selectedNode = ref(null);

const basicOrgData = ref({
  name: 'John Smith',
  title: 'CEO',
  department: 'Executive',
  children: [
    {
      name: 'Sarah Johnson',
      title: 'CTO',
      department: 'Technology',
      children: [
        { name: 'Mike Brown', title: 'Frontend Lead', department: 'Engineering' },
        { name: 'Lisa Davis', title: 'Backend Lead', department: 'Engineering' }
      ]
    },
    {
      name: 'David Wilson',
      title: 'CFO', 
      department: 'Finance',
      children: [
        { name: 'Anna Taylor', title: 'Accountant', department: 'Finance' }
      ]
    }
  ]
});

const collapsibleOrgData = ref({
  name: 'Emma Thompson',
  title: 'General Manager',
  department: 'Management',
  children: [
    {
      name: 'Robert Lee',
      title: 'Sales Director',
      department: 'Sales',
      children: [
        { name: 'Jennifer White', title: 'Sales Rep', department: 'Sales' },
        { name: 'Michael Green', title: 'Sales Rep', department: 'Sales' },
        { name: 'Ashley Black', title: 'Account Manager', department: 'Sales' }
      ]
    },
    {
      name: 'James Anderson',
      title: 'HR Director',
      department: 'Human Resources',
      children: [
        { name: 'Maria Garcia', title: 'HR Specialist', department: 'HR' },
        { name: 'Thomas Martinez', title: 'Recruiter', department: 'HR' }
      ]
    },
    {
      name: 'Rachel Moore',
      title: 'Marketing Director',
      department: 'Marketing',
      children: [
        { name: 'Kevin Clark', title: 'Content Manager', department: 'Marketing' },
        { name: 'Sophie Lewis', title: 'Social Media Manager', department: 'Marketing' },
        { name: 'Daniel Young', title: 'SEO Specialist', department: 'Marketing' }
      ]
    }
  ]
});

const styledOrgData = ref({
  name: 'Alex Carter',
  title: 'President',
  department: 'Executive',
  image: 'https://via.placeholder.com/50',
  children: [
    {
      name: 'Olivia Turner',
      title: 'VP Engineering',
      department: 'Engineering',
      children: [
        { name: 'Ryan Adams', title: 'Senior Developer', department: 'Engineering' },
        { name: 'Maya Patel', title: 'DevOps Engineer', department: 'Engineering' },
        { name: 'Chris Rodriguez', title: 'QA Lead', department: 'Engineering' }
      ]
    },
    {
      name: 'Ethan Cooper',
      title: 'VP Operations',
      department: 'Operations',
      children: [
        { name: 'Grace Kim', title: 'Operations Manager', department: 'Operations' },
        { name: 'Tyler Scott', title: 'Logistics Coordinator', department: 'Operations' }
      ]
    }
  ]
});

const customOptions = ref({
  nodeWidth: 200,
  nodeHeight: 80,
  orientation: 'top',
  pan: true,
  zoom: true,
  exportButton: false,
  exportFilename: 'organization-chart'
});

const handleNodeClick = (event) => {
  selectedNode.value = event.detail;
  console.log('Node clicked:', event.detail);
};
</script>
