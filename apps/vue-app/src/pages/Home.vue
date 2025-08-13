<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">
      Welcome to Takeoff UI Vue Demo
    </h1>
    <p class="text-xl text-gray-600 mb-8">
      Explore our component library built with Vue 3
    </p>
    <router-link 
      to="/components" 
      class="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
    >
      Browse Components
      <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </router-link>
  </div>
</template>

<script setup>
</script>
