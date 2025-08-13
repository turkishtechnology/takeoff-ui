<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Editor Component Demo</h2>
      </template>
      
      <div class="space-y-6">
        <!-- Basic Editor -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Editor</h3>
          <TkEditor
            v-model="basicContent"
            placeholder="Start typing here..."
          />
          <div class="mt-3 p-3 bg-gray-100 rounded">
            <p class="text-sm font-medium mb-1">Output HTML:</p>
            <pre class="text-xs overflow-x-auto">{{ basicContent }}</pre>
          </div>
        </div>

        <!-- Editor with Label -->
        <div>
          <h3 class="text-lg font-medium mb-3">Editor with Label</h3>
          <TkEditor
            v-model="labelContent"
            label="Article Content"
            hint="Write your article content here. You can format text using the toolbar."
            show-asterisk
          />
        </div>

        <!-- Readonly Editor -->
        <div>
          <h3 class="text-lg font-medium mb-3">Readonly Editor</h3>
          <TkEditor
            v-model="readonlyContent"
            label="Published Article (Read Only)"
            :readonly="true"
          />
        </div>

        <!-- Disabled Editor -->
        <div>
          <h3 class="text-lg font-medium mb-3">Disabled Editor</h3>
          <TkEditor
            v-model="disabledContent"
            label="Disabled Editor"
            :disabled="true"
          />
        </div>

        <!-- Editor with Validation -->
        <div>
          <h3 class="text-lg font-medium mb-3">Editor with Validation</h3>
          <TkEditor
            v-model="validationContent"
            label="Required Content"
            :invalid="isInvalid"
            :error="errorMessage"
            show-asterisk
            @tk-change="validateContent"
          />
          <TkButton 
            label="Validate" 
            @tk-click="checkValidation" 
            variant="primary" 
            size="small"
            class="mt-2"
          />
        </div>

        <!-- Custom Height Editor -->
        <div>
          <h3 class="text-lg font-medium mb-3">Custom Height Editor</h3>
          <TkEditor
            v-model="customHeightContent"
            label="Long Form Content"
            :content-style="{ height: '300px', overflow: 'auto' }"
            placeholder="This editor has a custom height with scrollable content area..."
          />
        </div>

        <!-- Editor with Custom Toolbar -->
        <div>
          <h3 class="text-lg font-medium mb-3">Custom Toolbar Configuration</h3>
          <TkEditor
            ref="customEditorRef"
            v-model="customToolbarContent"
            label="Custom Editor"
            :toolbar="customToolbar"
          />
          <div class="mt-3 flex gap-2">
            <TkButton 
              label="Get HTML" 
              @tk-click="getHtmlContent" 
              size="small"
            />
            <TkButton 
              label="Get Text" 
              @tk-click="getTextContent" 
              size="small"
            />
            <TkButton 
              label="Get JSON" 
              @tk-click="getJsonContent" 
              size="small"
            />
          </div>
          <div v-if="extractedContent" class="mt-3 p-3 bg-gray-100 rounded">
            <p class="text-sm font-medium mb-1">{{ extractedFormat }} Content:</p>
            <pre class="text-xs overflow-x-auto">{{ extractedContent }}</pre>
          </div>
        </div>

        <!-- Editor without Toolbar -->
        <div>
          <h3 class="text-lg font-medium mb-3">Editor without Toolbar</h3>
          <TkEditor
            v-model="noToolbarContent"
            label="Simple Text Editor"
            :hide-toolbar="true"
            placeholder="Type here without toolbar..."
          />
        </div>

      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TkCard, TkEditor, TkButton } from '@takeoff-ui/vue';

// Basic editor
const basicContent = ref('<p>Welcome to <strong>TakeOff UI</strong> Editor!</p>');

// Editor with label
const labelContent = ref('<h2>Getting Started</h2><p>This is a rich text editor with many features.</p>');

// Readonly content
const readonlyContent = ref(`
  <h2>The Future of Web Development</h2>
  <p>This article discusses the <em>latest trends</em> in web development...</p>
  <ul>
    <li>Component-based architecture</li>
    <li>Server-side rendering</li>
    <li>Edge computing</li>
  </ul>
`);

// Disabled content
const disabledContent = ref('<p>This editor is disabled and cannot be edited.</p>');

// Validation
const validationContent = ref('');
const isInvalid = ref(false);
const errorMessage = ref('');

const validateContent = () => {
  if (validationContent.value.length > 0) {
    isInvalid.value = false;
    errorMessage.value = '';
  }
};

const checkValidation = () => {
  const textContent = validationContent.value.replace(/<[^>]*>/g, '').trim();
  if (textContent.length < 10) {
    isInvalid.value = true;
    errorMessage.value = 'Content must be at least 10 characters long';
  } else {
    isInvalid.value = false;
    errorMessage.value = '';
    alert('Content is valid!');
  }
};

// Custom height
const customHeightContent = ref(`
  <h1>Long Form Article</h1>
  <p>This editor has a custom height with a scrollable content area.</p>
  <h2>Section 1: Introduction</h2>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  <h2>Section 2: Main Content</h2>
  <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  <h2>Section 3: Conclusion</h2>
  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
`);

// Custom toolbar
const customEditorRef = ref(null);
const customToolbarContent = ref('<p>This editor has a customized toolbar with selected features.</p>');
const customToolbar = [
  ['bold', 'italic', 'underline'],
  ['heading'],
  ['bulletList', 'orderedList'],
  ['blockquote', 'codeBlock'],
  ['link', 'image'],
  ['undo', 'redo']
];

const extractedContent = ref('');
const extractedFormat = ref('');

const getHtmlContent = async () => {
  if (customEditorRef.value) {
    extractedContent.value = await customEditorRef.value.getContent('html');
    extractedFormat.value = 'HTML';
  }
};

const getTextContent = async () => {
  if (customEditorRef.value) {
    extractedContent.value = await customEditorRef.value.getContent('text');
    extractedFormat.value = 'Text';
  }
};

const getJsonContent = async () => {
  if (customEditorRef.value) {
    const json = await customEditorRef.value.getContent('json');
    extractedContent.value = JSON.stringify(json, null, 2);
    extractedFormat.value = 'JSON';
  }
};

// No toolbar
const noToolbarContent = ref('<p>This is a simple text editor without any formatting toolbar.</p>');
</script>
