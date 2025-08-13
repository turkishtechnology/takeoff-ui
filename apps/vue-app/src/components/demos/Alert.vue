<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Alert Component Demo</h2>
      </template>
      
      <div class="space-y-6">
        <!-- Alert Types -->
        <div>
          <h3 class="text-lg font-medium mb-3">Alert Types</h3>
          <div class="space-y-3">
            <TkAlert type="info" message="This is an informational alert message." />
            <TkAlert type="success" message="Success! Your changes have been saved." />
            <TkAlert type="warning" message="Warning: This action cannot be undone." />
            <TkAlert type="error" message="Error: Something went wrong. Please try again." />
          </div>
        </div>

        <!-- Alert with Title -->
        <div>
          <h3 class="text-lg font-medium mb-3">Alert with Title</h3>
          <TkAlert 
            type="info" 
            title="Information"
            message="This alert has both a title and a message for more detailed information."
          />
        </div>

        <!-- Dismissible Alert -->
        <div>
          <h3 class="text-lg font-medium mb-3">Dismissible Alert</h3>
          <TkButton 
            v-if="!showDismissible" 
            label="Show Alert" 
            @click="showDismissible = true"
            variant="secondary"
            size="small"
          />
          <TkAlert 
            v-else
            type="success" 
            message="This alert can be dismissed by clicking the close button."
            dismissible
            @close="showDismissible = false"
          />
        </div>

        <!-- Alert with Actions -->
        <div>
          <h3 class="text-lg font-medium mb-3">Alert with Actions</h3>
          <TkAlert 
            type="warning" 
            title="Confirm Action"
            message="Are you sure you want to proceed with this action?"
          >
            <template #actions>
              <TkButton label="Cancel" variant="secondary" size="small" @click="handleCancel" />
              <TkButton label="Confirm" variant="primary" size="small" @click="handleConfirm" />
            </template>
          </TkAlert>
        </div>

        <!-- Alert with Icon -->
        <div>
          <h3 class="text-lg font-medium mb-3">Alert with Custom Icon</h3>
          <TkAlert 
            type="info" 
            icon="information-circle"
            message="This alert displays a custom icon."
          />
        </div>

        <!-- Programmatic Alert -->
        <div>
          <h3 class="text-lg font-medium mb-3">Programmatic Alert</h3>
          <div class="space-y-3">
            <TkButton label="Show Alert" @click="toggleAlert" />
            <TkAlert 
              v-if="showAlert"
              :type="alertConfig.type" 
              :message="alertConfig.message"
              dismissible
              @close="showAlert = false"
            />
          </div>
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TkAlert, TkButton, TkCard } from '@takeoff-ui/vue';

const showDismissible = ref(true);
const showAlert = ref(false);

const alertConfig = ref({
  type: 'success',
  message: 'This is a programmatically shown alert!'
});

const handleCancel = () => {
  console.log('Action cancelled');
};

const handleConfirm = () => {
  console.log('Action confirmed');
};

const toggleAlert = () => {
  showAlert.value = true;
  // Auto-hide after 3 seconds
  setTimeout(() => {
    showAlert.value = false;
  }, 3000);
};
</script>
