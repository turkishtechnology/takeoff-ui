<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Select Component Demo</h2>
      </template>
      
      <div class="space-y-6">
        <!-- Basic Select -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Select</h3>
          <TkSelect 
            v-model="selectedValue" 
            :options="basicOptions"
            placeholder="Choose an option"
          />
          <p class="mt-2 text-sm text-gray-600">Selected: {{ selectedValue }}</p>
        </div>

        <!-- Select with Label -->
        <div>
          <h3 class="text-lg font-medium mb-3">Select with Label</h3>
          <TkSelect 
            v-model="selectedCountry" 
            :options="countries"
            label="Country"
            placeholder="Select your country"
          />
        </div>

        <!-- Multi Select -->
        <div>
          <h3 class="text-lg font-medium mb-3">Multi Select</h3>
          <TkSelect 
            v-model="selectedSkills" 
            :options="skills"
            label="Skills"
            multiple
            placeholder="Select your skills"
          />
          <p class="mt-2 text-sm text-gray-600">Selected: {{ selectedSkills.join(', ') }}</p>
        </div>

        <!-- Searchable Select -->
        <div>
          <h3 class="text-lg font-medium mb-3">Searchable Select</h3>
          <TkSelect 
            v-model="selectedCity" 
            :options="cities"
            label="City"
            searchable
            placeholder="Search and select city"
          />
        </div>

        <!-- Disabled Select -->
        <div>
          <h3 class="text-lg font-medium mb-3">Disabled Select</h3>
          <TkSelect 
            v-model="disabledValue" 
            :options="basicOptions"
            label="Disabled Select"
            disabled
          />
        </div>

        <!-- Select with Helper Text -->
        <div>
          <h3 class="text-lg font-medium mb-3">Select with Helper Text</h3>
          <TkSelect 
            v-model="selectedPlan" 
            :options="plans"
            label="Subscription Plan"
            helper-text="Choose the plan that best fits your needs"
          />
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TkSelect, TkCard } from '@takeoff-ui/vue';

const selectedValue = ref('');
const selectedCountry = ref('');
const selectedSkills = ref([]);
const selectedCity = ref('');
const disabledValue = ref('option2');
const selectedPlan = ref('');

const basicOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' }
];

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'tr', label: 'Turkey' }
];

const skills = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'python', label: 'Python' }
];

const cities = [
  { value: 'istanbul', label: 'Istanbul' },
  { value: 'ankara', label: 'Ankara' },
  { value: 'izmir', label: 'Izmir' },
  { value: 'antalya', label: 'Antalya' },
  { value: 'bursa', label: 'Bursa' },
  { value: 'adana', label: 'Adana' },
  { value: 'london', label: 'London' },
  { value: 'newyork', label: 'New York' },
  { value: 'paris', label: 'Paris' },
  { value: 'berlin', label: 'Berlin' }
];

const plans = [
  { value: 'free', label: 'Free - $0/month' },
  { value: 'basic', label: 'Basic - $9/month' },
  { value: 'pro', label: 'Pro - $29/month' },
  { value: 'enterprise', label: 'Enterprise - Custom pricing' }
];
</script>
