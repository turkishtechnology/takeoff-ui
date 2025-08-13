<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Component Name Demo</h2>
      </template>
      
      <div class="space-y-6">
        <!-- Demo Section 1 -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Example</h3>
          <!-- Add component examples here -->
        </div>

        <!-- Demo Section 2 -->
        <div>
          <h3 class="text-lg font-medium mb-3">Advanced Example</h3>
          <!-- Add more complex examples here -->
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TkCard } from '@takeoff-ui/vue';
// Import other needed components from '@takeoff-ui/vue'

// Add reactive data and methods here
</script>
