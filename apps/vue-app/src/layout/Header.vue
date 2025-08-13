<template>
  <header class="bg-white shadow">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-8">
          <router-link to="/" class="text-xl font-bold text-indigo-600">
            Takeoff UI - Vue
          </router-link>
          <div class="flex space-x-4">
            <router-link 
              to="/" 
              class="text-gray-700 hover:text-indigo-600"
              :class="{ 'text-indigo-600': $route.path === '/' }"
            >
              Home
            </router-link>
            <router-link 
              to="/components" 
              class="text-gray-700 hover:text-indigo-600"
              :class="{ 'text-indigo-600': $route.path.startsWith('/components') }"
            >
              Components
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router';

const $route = useRoute();
</script>
