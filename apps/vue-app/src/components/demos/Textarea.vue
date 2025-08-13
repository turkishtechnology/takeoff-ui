<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Textarea Component Demo</h2>
      </template>
      
      <div class="space-y-8">
        <!-- Basic Textarea -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Textarea</h3>
          <div class="space-y-4">
            <TkTextarea
              label="Basic Textarea"
              v-model="basicValue"
              placeholder="Enter your text here..."
              hint="This is a basic textarea component"
            />
            <div class="p-4 bg-gray-50 border rounded-lg">
              <p class="text-sm"><strong>Current Value:</strong></p>
              <pre class="text-sm text-gray-700 mt-1">{{ basicValue || '(empty)' }}</pre>
            </div>
          </div>
        </div>

        <!-- Textarea Sizes -->
        <div>
          <h3 class="text-lg font-medium mb-3">Textarea Sizes</h3>
          <div class="space-y-4">
            <TkTextarea
              label="Small Textarea"
              size="small"
              v-model="smallValue"
              placeholder="Small size textarea"
              hint="Small size variant"
            />
            <TkTextarea
              label="Base Textarea (Default)"
              size="base"
              v-model="baseValue"
              placeholder="Base size textarea"
              hint="Base size variant"
            />
            <TkTextarea
              label="Large Textarea"
              size="large"
              v-model="largeValue"
              placeholder="Large size textarea"
              hint="Large size variant"
            />
          </div>
        </div>

        <!-- Textarea States -->
        <div>
          <h3 class="text-lg font-medium mb-3">Textarea States</h3>
          <div class="space-y-4">
            <TkTextarea
              label="Normal State"
              v-model="normalValue"
              placeholder="Normal textarea"
              hint="This is a normal state textarea"
            />
            <TkTextarea
              label="Invalid State"
              :invalid="true"
              error="This field is required"
              v-model="invalidValue"
              placeholder="Invalid textarea"
            />
            <TkTextarea
              label="Disabled State"
              :disabled="true"
              value="This textarea is disabled"
              placeholder="Disabled textarea"
              hint="User cannot interact with this textarea"
            />
            <TkTextarea
              label="Readonly State"
              :readonly="true"
              value="This textarea is readonly. You can select text but cannot edit it."
              placeholder="Readonly textarea"
              hint="User can select text but cannot modify it"
            />
          </div>
        </div>

        <!-- Required Field -->
        <div>
          <h3 class="text-lg font-medium mb-3">Required Field</h3>
          <TkTextarea
            label="Required Textarea"
            :show-asterisk="true"
            v-model="requiredValue"
            placeholder="This field is required..."
            hint="Red asterisk indicates this field is required"
          />
        </div>

        <!-- Custom Rows -->
        <div>
          <h3 class="text-lg font-medium mb-3">Custom Rows</h3>
          <div class="space-y-4">
            <TkTextarea
              label="2 Rows"
              :rows="2"
              v-model="rows2Value"
              placeholder="Textarea with 2 rows"
              hint="Minimum height with 2 rows"
            />
            <TkTextarea
              label="5 Rows"
              :rows="5"
              v-model="rows5Value"
              placeholder="Textarea with 5 rows"
              hint="Taller textarea with 5 rows"
            />
            <TkTextarea
              label="8 Rows"
              :rows="8"
              v-model="rows8Value"
              placeholder="Textarea with 8 rows"
              hint="Much taller textarea with 8 rows"
            />
          </div>
        </div>

        <!-- Character Limit -->
        <div>
          <h3 class="text-lg font-medium mb-3">Character Limit</h3>
          <div class="space-y-4">
            <TkTextarea
              label="Limited to 100 characters"
              :max-length="100"
              v-model="limitedValue"
              placeholder="Type up to 100 characters..."
              hint="Maximum 100 characters allowed"
            />
            <div class="p-4 bg-gray-50 border rounded-lg">
              <p class="text-sm">
                <strong>Characters used:</strong> {{ limitedValue.length }}/100
              </p>
            </div>

            <TkTextarea
              label="Limited to 250 characters"
              :max-length="250"
              v-model="limitedValue250"
              placeholder="Type up to 250 characters..."
              hint="Maximum 250 characters allowed"
              :rows="4"
            />
            <div class="p-4 bg-gray-50 border rounded-lg">
              <p class="text-sm">
                <strong>Characters used:</strong> {{ limitedValue250.length }}/250
              </p>
            </div>
          </div>
        </div>

        <!-- Form Integration -->
        <div>
          <h3 class="text-lg font-medium mb-3">Form Integration</h3>
          <form @submit.prevent="handleFormSubmit" class="space-y-4">
            <TkTextarea
              label="Name"
              name="name"
              :show-asterisk="true"
              v-model="formData.name"
              placeholder="Enter your full name"
              :invalid="formErrors.name"
              :error="formErrors.name"
            />
            <TkTextarea
              label="Message"
              name="message"
              :show-asterisk="true"
              v-model="formData.message"
              placeholder="Enter your message..."
              :rows="4"
              :max-length="500"
              :invalid="formErrors.message"
              :error="formErrors.message"
              hint="Please describe your inquiry in detail"
            />
            <TkTextarea
              label="Additional Comments (Optional)"
              name="comments"
              v-model="formData.comments"
              placeholder="Any additional comments..."
              :rows="3"
              hint="Optional field for additional information"
            />
            <div class="flex gap-2">
              <TkButton type="submit" variant="primary">
                Submit Form
              </TkButton>
              <TkButton type="button" variant="outlined" @click="resetForm">
                Reset
              </TkButton>
            </div>
          </form>
          
          <div v-if="formSubmitted" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 class="font-medium text-green-800 mb-2">Form Submitted Successfully!</h4>
            <pre class="text-sm text-green-700">{{ JSON.stringify(formData, null, 2) }}</pre>
          </div>
        </div>

        <!-- Event Handling -->
        <div>
          <h3 class="text-lg font-medium mb-3">Event Handling</h3>
          <TkTextarea
            label="Event Tracking"
            v-model="eventValue"
            placeholder="Type to see events..."
            @tk-input="handleInput"
            @tk-change="handleChange"
            @tk-focus="handleFocus"
            @tk-blur="handleBlur"
            hint="All events are logged below"
          />
          
          <div v-if="eventLog.length > 0" class="mt-4 p-4 bg-gray-50 border rounded-lg">
            <h4 class="font-medium mb-2">Event Log:</h4>
            <div class="space-y-1 max-h-32 overflow-y-auto">
              <div v-for="(event, index) in eventLog" :key="index" class="text-sm text-gray-700">
                {{ event }}
              </div>
            </div>
            <TkButton 
              size="small" 
              variant="outlined" 
              @click="eventLog = []" 
              class="mt-2"
            >
              Clear Log
            </TkButton>
          </div>
        </div>

        <!-- Advanced Example -->
        <div>
          <h3 class="text-lg font-medium mb-3">Advanced Example - Rich Text Editor Simulation</h3>
          <div class="space-y-4">
            <div class="flex gap-2 mb-2">
              <TkButton 
                size="small" 
                variant="outlined"
                @click="insertText('[BOLD]', '[/BOLD]')"
              >
                Bold
              </TkButton>
              <TkButton 
                size="small" 
                variant="outlined"
                @click="insertText('[ITALIC]', '[/ITALIC]')"
              >
                Italic
              </TkButton>
              <TkButton 
                size="small" 
                variant="outlined"
                @click="insertText('[LINK]', '[/LINK]')"
              >
                Link
              </TkButton>
              <TkButton 
                size="small" 
                variant="outlined"
                @click="clearAdvanced"
              >
                Clear
              </TkButton>
            </div>
            
            <TkTextarea
              ref="advancedTextarea"
              label="Rich Text Content"
              v-model="advancedValue"
              placeholder="Use the buttons above to insert markup tags..."
              :rows="6"
              :max-length="1000"
              hint="Simulates a rich text editor with markup tags"
            />
            
            <div class="p-4 bg-gray-50 border rounded-lg">
              <p class="text-sm font-medium mb-2">Preview:</p>
              <div class="text-sm" v-html="renderAdvancedPreview()"></div>
            </div>
          </div>
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { TkCard, TkTextarea, TkButton } from '@takeoff-ui/vue';

// Basic values
const basicValue = ref('');
const smallValue = ref('');
const baseValue = ref('');
const largeValue = ref('');
const normalValue = ref('');
const invalidValue = ref('');
const requiredValue = ref('');

// Custom rows
const rows2Value = ref('');
const rows5Value = ref('');
const rows8Value = ref('');

// Character limit
const limitedValue = ref('');
const limitedValue250 = ref('');

// Form data
const formData = reactive({
  name: '',
  message: '',
  comments: ''
});

const formErrors = reactive({
  name: '',
  message: ''
});

const formSubmitted = ref(false);

// Event handling
const eventValue = ref('');
const eventLog = ref([]);

// Advanced example
const advancedValue = ref('Welcome to our [BOLD]rich text[/BOLD] editor!\n\nYou can add [ITALIC]formatting[/ITALIC] and [LINK]links[/LINK] using the buttons above.\n\nTry it out!');
const advancedTextarea = ref(null);

// Form methods
const handleFormSubmit = () => {
  // Reset errors
  formErrors.name = '';
  formErrors.message = '';
  
  // Validate
  let hasErrors = false;
  
  if (!formData.name.trim()) {
    formErrors.name = 'Name is required';
    hasErrors = true;
  }
  
  if (!formData.message.trim()) {
    formErrors.message = 'Message is required';
    hasErrors = true;
  } else if (formData.message.length < 10) {
    formErrors.message = 'Message must be at least 10 characters long';
    hasErrors = true;
  }
  
  if (!hasErrors) {
    formSubmitted.value = true;
    setTimeout(() => {
      formSubmitted.value = false;
    }, 5000);
  }
};

const resetForm = () => {
  formData.name = '';
  formData.message = '';
  formData.comments = '';
  formErrors.name = '';
  formErrors.message = '';
  formSubmitted.value = false;
};

// Event handlers
const handleInput = (event) => {
  const timestamp = new Date().toLocaleTimeString();
  eventLog.value.unshift(`${timestamp}: Input event - "${event.detail}"`);
  keepEventLogSize();
};

const handleChange = (event) => {
  const timestamp = new Date().toLocaleTimeString();
  eventLog.value.unshift(`${timestamp}: Change event - "${event.detail}"`);
  keepEventLogSize();
};

const handleFocus = () => {
  const timestamp = new Date().toLocaleTimeString();
  eventLog.value.unshift(`${timestamp}: Focus event`);
  keepEventLogSize();
};

const handleBlur = () => {
  const timestamp = new Date().toLocaleTimeString();
  eventLog.value.unshift(`${timestamp}: Blur event`);
  keepEventLogSize();
};

const keepEventLogSize = () => {
  if (eventLog.value.length > 10) {
    eventLog.value = eventLog.value.slice(0, 10);
  }
};

// Advanced example methods
const insertText = (startTag, endTag) => {
  const textarea = advancedTextarea.value?.$el?.querySelector('textarea');
  if (!textarea) return;
  
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = advancedValue.value.substring(start, end);
  const beforeText = advancedValue.value.substring(0, start);
  const afterText = advancedValue.value.substring(end);
  
  const newText = beforeText + startTag + selectedText + endTag + afterText;
  advancedValue.value = newText;
  
  // Focus and set cursor position
  setTimeout(() => {
    textarea.focus();
    const newCursorPos = start + startTag.length + selectedText.length + endTag.length;
    textarea.setSelectionRange(newCursorPos, newCursorPos);
  }, 0);
};

const clearAdvanced = () => {
  advancedValue.value = '';
  advancedTextarea.value?.$el?.querySelector('textarea')?.focus();
};

const renderAdvancedPreview = () => {
  return advancedValue.value
    .replace(/\[BOLD\](.*?)\[\/BOLD\]/g, '<strong>$1</strong>')
    .replace(/\[ITALIC\](.*?)\[\/ITALIC\]/g, '<em>$1</em>')
    .replace(/\[LINK\](.*?)\[\/LINK\]/g, '<a href="#" class="text-blue-600 underline">$1</a>')
    .replace(/\n/g, '<br>');
};
</script>
