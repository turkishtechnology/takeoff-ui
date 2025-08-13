<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Rating Component Demo</h2>
      </template>
      
      <div class="space-y-6">
        <!-- Rating Types -->
        <div>
          <h3 class="text-lg font-medium mb-3">Rating Types</h3>
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <span class="w-20">Star:</span>
              <TkRating type="star" v-model="starRating" />
              <span class="text-sm text-gray-600">Value: {{ starRating }}</span>
            </div>
            <div class="flex items-center gap-4">
              <span class="w-20">Heart:</span>
              <TkRating type="heart" v-model="heartRating" />
              <span class="text-sm text-gray-600">Value: {{ heartRating }}</span>
            </div>
            <div class="flex items-center gap-4">
              <span class="w-20">Dot:</span>
              <TkRating type="dot" v-model="dotRating" />
              <span class="text-sm text-gray-600">Value: {{ dotRating }}</span>
            </div>
            <div class="flex items-center gap-4">
              <span class="w-20">Number:</span>
              <TkRating type="number" v-model="numberRating" />
              <span class="text-sm text-gray-600">Value: {{ numberRating }}</span>
            </div>
          </div>
        </div>

        <!-- Rating with Value Display -->
        <div>
          <h3 class="text-lg font-medium mb-3">Rating with Value Display</h3>
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <TkRating type="star" :value="2" :show-rating-value="true" />
              <span class="text-sm text-gray-600">2.0 stars</span>
            </div>
            <div class="flex items-center gap-4">
              <TkRating type="heart" :value="2.5" :show-rating-value="true" />
              <span class="text-sm text-gray-600">2.5 hearts</span>
            </div>
            <div class="flex items-center gap-4">
              <TkRating type="dot" :value="3.5" :show-rating-value="true" />
              <span class="text-sm text-gray-600">3.5 dots</span>
            </div>
          </div>
        </div>

        <!-- Different Max Ratings -->
        <div>
          <h3 class="text-lg font-medium mb-3">Different Max Ratings</h3>
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <span class="w-32">3 Stars Max:</span>
              <TkRating type="star" :value="2.5" :show-rating-value="true" :max-rating="3" />
            </div>
            <div class="flex items-center gap-4">
              <span class="w-32">5 Stars Max:</span>
              <TkRating type="star" :value="4" :show-rating-value="true" :max-rating="5" />
            </div>
            <div class="flex items-center gap-4">
              <span class="w-32">10 Stars Max:</span>
              <TkRating type="star" :value="7.5" :show-rating-value="true" :max-rating="10" />
            </div>
          </div>
        </div>

        <!-- Rating States -->
        <div>
          <h3 class="text-lg font-medium mb-3">Rating States</h3>
          <div class="space-y-4">
            <div>
              <h4 class="text-md font-medium mb-2">Interactive (Default)</h4>
              <TkRating type="star" v-model="interactiveRating" :show-rating-value="true" v-on:tk-change="interactiveRating" />
              <p class="text-sm text-gray-600 mt-1">Click to change rating: {{ interactiveRating }}</p>
            </div>
            <div>
              <h4 class="text-md font-medium mb-2">Read-only</h4>
              <TkRating type="star" :value="3.5" :show-rating-value="true" readonly />
              <p class="text-sm text-gray-600 mt-1">This rating cannot be changed</p>
            </div>
            <div>
              <h4 class="text-md font-medium mb-2">Disabled</h4>
              <TkRating type="star" :value="3.5" :show-rating-value="true" disabled />
              <p class="text-sm text-gray-600 mt-1">This rating is disabled</p>
            </div>
          </div>
        </div>

        <!-- Fractional Ratings -->
        <div>
          <h3 class="text-lg font-medium mb-3">Fractional Ratings</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-4">
              <span class="w-16">1.5:</span>
              <TkRating type="star" :value="1.5" :show-rating-value="true" readonly />
            </div>
            <div class="flex items-center gap-4">
              <span class="w-16">2.3:</span>
              <TkRating type="star" :value="2.3" :show-rating-value="true" readonly />
            </div>
            <div class="flex items-center gap-4">
              <span class="w-16">3.7:</span>
              <TkRating type="star" :value="3.7" :show-rating-value="true" readonly />
            </div>
            <div class="flex items-center gap-4">
              <span class="w-16">4.9:</span>
              <TkRating type="star" :value="4.9" :show-rating-value="true" readonly />
            </div>
          </div>
        </div>

        <!-- Interactive Example -->
        <div>
          <h3 class="text-lg font-medium mb-3">Interactive Rating Example</h3>
          <div class="space-y-4">
            <div class="flex gap-4">
              <select v-model="selectedType" class="px-3 py-2 border rounded">
                <option value="star">Star</option>
                <option value="heart">Heart</option>
                <option value="dot">Dot</option>
                <option value="number">Number</option>
              </select>
              <select v-model="selectedMaxRating" class="px-3 py-2 border rounded">
                <option :value="3">3 Max</option>
                <option :value="5">5 Max</option>
                <option :value="10">10 Max</option>
              </select>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="showValue" class="rounded">
                Show Value
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="isReadonly" class="rounded">
                Read-only
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="isDisabled" class="rounded">
                Disabled
              </label>
            </div>
            <TkRating 
              :type="selectedType"
              v-model="customRating"
              :max-rating="selectedMaxRating"
              :show-rating-value="showValue"
              :readonly="isReadonly"
              :disabled="isDisabled"
              @tk-change="handleRatingChange"
            />
            <p class="text-sm text-gray-600">Current rating: {{ customRating }} / {{ selectedMaxRating }}</p>
          </div>
        </div>

        <!-- Rating with Feedback -->
        <div>
          <h3 class="text-lg font-medium mb-3">Rating with Feedback</h3>
          <div class="space-y-4">
            <TkRating 
              type="star" 
              v-model="feedbackRating" 
              :show-rating-value="true"
              @tk-change="handleFeedbackRating"
            />
            <div v-if="feedbackText" class="p-3 bg-gray-50 rounded-lg">
              <p class="text-sm font-medium">{{ feedbackText }}</p>
            </div>
          </div>
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { TkCard, TkRating } from '@takeoff-ui/vue';

// Basic ratings
const starRating = ref(3);
const heartRating = ref(2.5);
const dotRating = ref(4);
const numberRating = ref(3);

// Interactive rating
const interactiveRating = ref(0);

// Custom rating controls
const selectedType = ref('star');
const selectedMaxRating = ref(5);
const showValue = ref(true);
const isReadonly = ref(false);
const isDisabled = ref(false);
const customRating = ref(3);

// Feedback rating
const feedbackRating = ref(0);

const feedbackText = computed(() => {
  const rating = feedbackRating.value;
  if (rating === 0) return '';
  if (rating <= 1) return 'Poor - We apologize for the experience';
  if (rating <= 2) return 'Below Average - We\'ll work to improve';
  if (rating <= 3) return 'Average - Thank you for your feedback';
  if (rating <= 4) return 'Good - We\'re glad you enjoyed it';
  return 'Excellent - Thank you for the great rating!';
});

const handleRatingChange = (event) => {
  console.log('Rating changed:', event.detail);
};

const handleFeedbackRating = (event) => {
  console.log('Feedback rating:', event.detail);
};
</script>
