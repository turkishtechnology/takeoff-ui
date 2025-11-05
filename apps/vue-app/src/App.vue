<script setup>
import Filter from './Filter.vue';
import filter from './filters';
import { ref, onMounted } from 'vue';

const countryOptions = ref([]);
const stateOptions = ref([]);

const fetchCountryData = async () => {
  try {
    // Simulate API call to fetch countries and their states
    const result = await new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            value: 'usa',
            label: 'United States',
            children: [
              { value: 'ny', label: 'New York' },
              { value: 'ca', label: 'California' },
              { value: 'tx', label: 'Texas' },
              { value: 'fl', label: 'Florida' },
            ],
          },
          {
            value: 'canada',
            label: 'Canada',
            children: [
              { value: 'on', label: 'Ontario' },
              { value: 'bc', label: 'British Columbia' },
              { value: 'qc', label: 'Quebec' },
              { value: 'ab', label: 'Alberta' },
            ],
          },
          {
            value: 'uk',
            label: 'United Kingdom',
            children: [
              { value: 'england', label: 'England' },
              { value: 'scotland', label: 'Scotland' },
              { value: 'wales', label: 'Wales' },
              { value: 'ni', label: 'Northern Ireland' },
            ],
          },
        ]);
      }, 1000); // Simulate network delay
    });

    countryOptions.value = result;
    stateOptions.value = []; // States will be populated based on country selection
  } catch (error) {
    console.error('Error fetching country data:', error);
  }
};
onMounted(fetchCountryData);
</script>

<template>
  <div>
    <Filter :filter="filter({ countryOptions, stateOptions })" />
  </div>
</template>
