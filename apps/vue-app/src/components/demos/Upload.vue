<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Upload Component Demo</h2>
      </template>
      
      <div class="space-y-8">
        <!-- Basic Upload -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Upload</h3>
          <TkUpload
            label="Basic File Upload"
            hint="Select files to upload manually"
            @tk-change="handleBasicFilesAccepted"
            @tk-upload="handleBasicUpload"
            @tk-files-rejected="handleFilesRejected"
            @tk-removed-file="handleFileRemoved"
          />
        </div>

        <!-- Multiple Upload -->
        <div>
          <h3 class="text-lg font-medium mb-3">Multiple File Upload</h3>
          <TkUpload
            label="Multiple Files Upload"
            :multiple="true"
            hint="You can select multiple files at once"
            @tk-change="handleMultipleFilesAccepted"
            @tk-upload="handleMultipleUpload"
            @tk-files-rejected="handleFilesRejected"
            @tk-removed-file="handleFileRemoved"
          />
        </div>

        <!-- Auto Upload -->
        <div>
          <h3 class="text-lg font-medium mb-3">Auto Upload</h3>
          <TkUpload
            label="Auto Upload Files"
            :auto-upload="true"
            :multiple="true"
            hint="Files will be uploaded automatically when selected"
            @tk-upload="handleAutoUpload"
            @tk-files-rejected="handleFilesRejected"
            @tk-removed-file="handleFileRemoved"
          />
        </div>

        <!-- File Type Restrictions -->
        <div>
          <h3 class="text-lg font-medium mb-3">File Type Restrictions</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-medium mb-2">Images Only</h4>
              <TkUpload
                label="Image Upload"
                accept="image/*"
                :multiple="true"
                title="Choose images or drag & drop them here."
                description="JPEG, PNG, GIF formats, up to 5MB."
                @tk-change="handleImageFilesAccepted"
                @tk-upload="handleImageUpload"
                @tk-files-rejected="handleFilesRejected"
                @tk-removed-file="handleFileRemoved"
              />
            </div>

            <div>
              <h4 class="font-medium mb-2">PDF Documents Only</h4>
              <TkUpload
                label="Document Upload"
                accept="application/pdf"
                :multiple="true"
                title="Choose PDF documents or drag & drop them here."
                description="PDF format only, up to 10MB."
                @tk-change="handleDocumentFilesAccepted"
                @tk-upload="handleDocumentUpload"
                @tk-files-rejected="handleFilesRejected"
                @tk-removed-file="handleFileRemoved"
              />
            </div>

            <div>
              <h4 class="font-medium mb-2">Specific Extensions</h4>
              <TkUpload
                label="Code Files Upload"
                accept=".js,.ts,.vue,.jsx,.tsx"
                :multiple="true"
                title="Choose code files or drag & drop them here."
                description="JavaScript, TypeScript, and Vue files only."
                @tk-change="handleCodeFilesAccepted"
                @tk-upload="handleCodeUpload"
                @tk-files-rejected="handleFilesRejected"
                @tk-removed-file="handleFileRemoved"
              />
            </div>
          </div>
        </div>

        <!-- File Size Limits -->
        <div>
          <h3 class="text-lg font-medium mb-3">File Size Limits</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-medium mb-2">Small Files (1MB limit)</h4>
              <TkUpload
                label="Small File Upload"
                :max-file-size="1024 * 1024"
                :multiple="true"
                title="Upload small files (max 1MB)."
                description="All formats, maximum 1MB per file."
                @tk-change="handleSmallFilesAccepted"
                @tk-upload="handleSmallUpload"
                @tk-files-rejected="handleFilesRejected"
                @tk-removed-file="handleFileRemoved"
              />
            </div>

            <div>
              <h4 class="font-medium mb-2">Limited Count (3 files max)</h4>
              <TkUpload
                label="Limited Count Upload"
                :multiple="true"
                :max-file-count="3"
                title="Upload up to 3 files."
                description="Maximum 3 files allowed."
                @tk-change="handleLimitedFilesAccepted"
                @tk-upload="handleLimitedUpload"
                @tk-files-rejected="handleFilesRejected"
                @tk-removed-file="handleFileRemoved"
              />
            </div>
          </div>
        </div>

        <!-- Upload Types -->
        <div>
          <h3 class="text-lg font-medium mb-3">Upload Types</h3>
          <div class="space-y-6">
            <div>
              <h4 class="font-medium mb-2">Default Type</h4>
              <TkUpload
                label="Default Upload Area"
                type="default"
                :multiple="true"
                @tk-change="handleTypeFilesAccepted"
                @tk-upload="handleTypeUpload"
                @tk-files-rejected="handleFilesRejected"
                @tk-removed-file="handleFileRemoved"
              />
            </div>

            <div>
              <h4 class="font-medium mb-2">Centered Type</h4>
              <TkUpload
                label="Centered Upload Area"
                type="centered"
                :multiple="true"
                title="Drag & drop files here or click to choose."
                description="All file types supported, up to 50MB."
                @tk-change="handleCenteredFilesAccepted"
                @tk-upload="handleCenteredUpload"
                @tk-files-rejected="handleFilesRejected"
                @tk-removed-file="handleFileRemoved"
              />
            </div>
          </div>
        </div>

        <!-- Upload States -->
        <div>
          <h3 class="text-lg font-medium mb-3">Upload States</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-medium mb-2">Normal State</h4>
              <TkUpload
                label="Normal Upload"
                hint="This is a normal upload component"
                @tk-change="handleStateFilesAccepted"
                @tk-upload="handleStateUpload"
                @tk-files-rejected="handleFilesRejected"
                @tk-removed-file="handleFileRemoved"
              />
            </div>

            <div>
              <h4 class="font-medium mb-2">Disabled State</h4>
              <TkUpload
                label="Disabled Upload"
                :disabled="true"
                hint="This upload component is disabled"
              />
            </div>

            <div>
              <h4 class="font-medium mb-2">Invalid State</h4>
              <TkUpload
                label="Invalid Upload"
                :invalid="true"
                error="Please fix the validation errors"
                hint="This upload has validation errors"
              />
            </div>

            <div>
              <h4 class="font-medium mb-2">Loading State</h4>
              <TkUpload
                label="Loading Upload"
                :loading="true"
                hint="Upload is currently processing files"
              />
            </div>
          </div>
        </div>

        <!-- Required Field -->
        <div>
          <h3 class="text-lg font-medium mb-3">Required Field</h3>
          <TkUpload
            label="Required Upload"
            :show-asterisk="true"
            hint="This field is required"
            @tk-change="handleRequiredFilesAccepted"
            @tk-upload="handleRequiredUpload"
            @tk-files-rejected="handleFilesRejected"
            @tk-removed-file="handleFileRemoved"
          />
        </div>

        <!-- Custom Labels -->
        <div>
          <h3 class="text-lg font-medium mb-3">Custom Labels</h3>
          <TkUpload
            label="Custom Labels Upload"
            title="Drop your awesome files here!"
            description="We accept any format, make it amazing!"
            choose-button-label="Pick Files"
            upload-button-label="Send Files"
            :multiple="true"
            @tk-change="handleCustomFilesAccepted"
            @tk-upload="handleCustomUpload"
            @tk-files-rejected="handleFilesRejected"
            @tk-removed-file="handleFileRemoved"
          />
        </div>

        <!-- Downloadable Files -->
        <div>
          <h3 class="text-lg font-medium mb-3">Downloadable Upload</h3>
          <TkUpload
            label="Upload with Download Option"
            :downloadable="true"
            :multiple="true"
            hint="Upload files and then download them if needed"
            @tk-change="handleDownloadableFilesAccepted"
            @tk-upload="handleDownloadableUpload"
            @tk-download-file="handleFileDownload"
            @tk-files-rejected="handleFilesRejected"
            @tk-removed-file="handleFileRemoved"
          />
        </div>

        <!-- Controlled Upload -->
        <div>
          <h3 class="text-lg font-medium mb-3">Controlled Upload with Custom Actions</h3>
          <div class="space-y-4">
            <div class="flex gap-2">
              <TkButton
                label="Clear All Files"
                variant="outlined"
                @click="clearControlledFiles"
                :disabled="controlledFiles.length === 0"
              />
              <TkButton
                label="Upload All Files"
                variant="primary"
                @click="uploadControlledFiles"
                :disabled="controlledFiles.length === 0"
              />
            </div>
            
            <TkUpload
              label="Controlled Upload"
              :multiple="true"
              :value="controlledFiles"
              hint="Files are managed externally"
              @tk-change="handleControlledFilesAccepted"
              @tk-upload="handleControlledUpload"
              @tk-files-rejected="handleFilesRejected"
              @tk-removed-file="handleControlledFileRemoved"
            />
            
            <div v-if="controlledFiles.length > 0" class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 class="font-medium mb-2">Currently Selected Files:</h4>
              <ul class="space-y-1 text-sm">
                <li v-for="(file, index) in controlledFiles" :key="index" class="flex justify-between items-center">
                  <span>{{ file.name }} ({{ formatFileSize(file.size) }})</span>
                  <TkButton
                    icon="delete"
                    variant="text"
                    size="small"
                    @click="removeControlledFile(index)"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Event Log -->
        <div v-if="eventLog.length > 0">
          <h3 class="text-lg font-medium mb-3">Upload Event Log</h3>
          <div class="p-4 bg-gray-50 border rounded-lg">
            <div class="flex justify-between items-center mb-3">
              <h4 class="font-medium">Recent Events:</h4>
              <TkButton
                label="Clear Log"
                size="small"
                variant="outlined"
                @click="clearEventLog"
              />
            </div>
            <div class="space-y-2 max-h-64 overflow-y-auto">
              <div
                v-for="(event, index) in eventLog"
                :key="index"
                class="text-sm p-2 rounded"
                :class="{
                  'bg-green-100 text-green-800': event.type === 'success',
                  'bg-red-100 text-red-800': event.type === 'error',
                  'bg-blue-100 text-blue-800': event.type === 'info',
                  'bg-yellow-100 text-yellow-800': event.type === 'warning'
                }"
              >
                <div class="font-medium">{{ event.title }}</div>
                <div class="text-xs opacity-75">{{ event.timestamp }}</div>
                <div v-if="event.details" class="mt-1">{{ event.details }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- File Statistics -->
        <div v-if="uploadStats.totalFiles > 0">
          <h3 class="text-lg font-medium mb-3">Upload Statistics</h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
              <div class="text-2xl font-bold text-blue-700">{{ uploadStats.totalFiles }}</div>
              <div class="text-sm text-blue-600">Total Files</div>
            </div>
            <div class="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
              <div class="text-2xl font-bold text-green-700">{{ uploadStats.successfulUploads }}</div>
              <div class="text-sm text-green-600">Successful</div>
            </div>
            <div class="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
              <div class="text-2xl font-bold text-red-700">{{ uploadStats.failedUploads }}</div>
              <div class="text-sm text-red-600">Failed</div>
            </div>
            <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg text-center">
              <div class="text-2xl font-bold text-purple-700">{{ formatFileSize(uploadStats.totalSize) }}</div>
              <div class="text-sm text-purple-600">Total Size</div>
            </div>
          </div>
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { TkCard, TkUpload, TkButton } from '@takeoff-ui/vue';

// Event log
const eventLog = ref([]);

// Upload statistics
const uploadStats = reactive({
  totalFiles: 0,
  successfulUploads: 0,
  failedUploads: 0,
  totalSize: 0
});

// Controlled upload files
const controlledFiles = ref([]);

// Event handler methods
const logEvent = (title, type = 'info', details = null) => {
  const timestamp = new Date().toLocaleTimeString();
  eventLog.value.unshift({
    title,
    type,
    timestamp,
    details
  });
  
  // Keep only last 10 events
  if (eventLog.value.length > 10) {
    eventLog.value = eventLog.value.slice(0, 10);
  }
};

const updateStats = (files, success = true) => {
  uploadStats.totalFiles += files.length;
  if (success) {
    uploadStats.successfulUploads += files.length;
  } else {
    uploadStats.failedUploads += files.length;
  }
  
  files.forEach(file => {
    uploadStats.totalSize += file.size || 0;
  });
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Basic upload handlers
const handleBasicFilesAccepted = (event) => {
  const files = event.detail;
  logEvent(`${files.length} file(s) selected for basic upload`, 'info', 
    `Files: ${files.map(f => f.name).join(', ')}`);
};

const handleBasicUpload = (event) => {
  const files = event.detail;
  updateStats(files, true);
  logEvent(`${files.length} file(s) uploaded successfully`, 'success',
    `Basic upload completed`);
};

// Multiple upload handlers
const handleMultipleFilesAccepted = (event) => {
  const files = event.detail;
  logEvent(`${files.length} file(s) selected for multiple upload`, 'info');
};

const handleMultipleUpload = (event) => {
  const files = event.detail;
  updateStats(files, true);
  logEvent(`Multiple upload: ${files.length} file(s) uploaded`, 'success');
};

// Auto upload handlers
const handleAutoUpload = (event) => {
  const files = event.detail;
  updateStats(files, true);
  logEvent(`Auto upload: ${files.length} file(s) uploaded automatically`, 'success');
};

// Image upload handlers
const handleImageFilesAccepted = (event) => {
  const files = event.detail;
  logEvent(`${files.length} image(s) selected`, 'info');
};

const handleImageUpload = (event) => {
  const files = event.detail;
  updateStats(files, true);
  logEvent(`Image upload: ${files.length} image(s) uploaded`, 'success');
};

// Document upload handlers
const handleDocumentFilesAccepted = (event) => {
  const files = event.detail;
  logEvent(`${files.length} PDF document(s) selected`, 'info');
};

const handleDocumentUpload = (event) => {
  const files = event.detail;
  updateStats(files, true);
  logEvent(`Document upload: ${files.length} PDF(s) uploaded`, 'success');
};

// Code files upload handlers
const handleCodeFilesAccepted = (event) => {
  const files = event.detail;
  logEvent(`${files.length} code file(s) selected`, 'info');
};

const handleCodeUpload = (event) => {
  const files = event.detail;
  updateStats(files, true);
  logEvent(`Code upload: ${files.length} code file(s) uploaded`, 'success');
};

// Size limited upload handlers
const handleSmallFilesAccepted = (event) => {
  const files = event.detail;
  logEvent(`${files.length} small file(s) selected (≤1MB)`, 'info');
};

const handleSmallUpload = (event) => {
  const files = event.detail;
  updateStats(files, true);
  logEvent(`Small files upload: ${files.length} file(s) uploaded`, 'success');
};

const handleLimitedFilesAccepted = (event) => {
  const files = event.detail;
  logEvent(`${files.length} file(s) selected (max 3 files)`, 'info');
};

const handleLimitedUpload = (event) => {
  const files = event.detail;
  updateStats(files, true);
  logEvent(`Limited upload: ${files.length} file(s) uploaded`, 'success');
};

// Type upload handlers
const handleTypeFilesAccepted = (event) => {
  const files = event.detail;
  logEvent(`${files.length} file(s) selected (default type)`, 'info');
};

const handleTypeUpload = (event) => {
  const files = event.detail;
  updateStats(files, true);
  logEvent(`Default type upload: ${files.length} file(s) uploaded`, 'success');
};

const handleCenteredFilesAccepted = (event) => {
  const files = event.detail;
  logEvent(`${files.length} file(s) selected (centered type)`, 'info');
};

const handleCenteredUpload = (event) => {
  const files = event.detail;
  updateStats(files, true);
  logEvent(`Centered type upload: ${files.length} file(s) uploaded`, 'success');
};

// State upload handlers
const handleStateFilesAccepted = (event) => {
  const files = event.detail;
  logEvent(`${files.length} file(s) selected (normal state)`, 'info');
};

const handleStateUpload = (event) => {
  const files = event.detail;
  updateStats(files, true);
  logEvent(`State upload: ${files.length} file(s) uploaded`, 'success');
};

// Required upload handlers
const handleRequiredFilesAccepted = (event) => {
  const files = event.detail;
  logEvent(`${files.length} file(s) selected (required field)`, 'info');
};

const handleRequiredUpload = (event) => {
  const files = event.detail;
  updateStats(files, true);
  logEvent(`Required upload: ${files.length} file(s) uploaded`, 'success');
};

// Custom upload handlers
const handleCustomFilesAccepted = (event) => {
  const files = event.detail;
  logEvent(`${files.length} file(s) selected (custom labels)`, 'info');
};

const handleCustomUpload = (event) => {
  const files = event.detail;
  updateStats(files, true);
  logEvent(`Custom upload: ${files.length} file(s) uploaded`, 'success');
};

// Downloadable upload handlers
const handleDownloadableFilesAccepted = (event) => {
  const files = event.detail;
  logEvent(`${files.length} downloadable file(s) selected`, 'info');
};

const handleDownloadableUpload = (event) => {
  const files = event.detail;
  updateStats(files, true);
  logEvent(`Downloadable upload: ${files.length} file(s) uploaded`, 'success');
};

const handleFileDownload = (event) => {
  const file = event.detail;
  logEvent(`File download requested: ${file.name}`, 'info');
};

// Controlled upload handlers
const handleControlledFilesAccepted = (event) => {
  const files = event.detail;
  controlledFiles.value.push(...files);
  logEvent(`${files.length} file(s) added to controlled upload`, 'info');
};

const handleControlledUpload = (event) => {
  const files = event.detail;
  updateStats(files, true);
  logEvent(`Controlled upload: ${files.length} file(s) uploaded`, 'success');
};

const handleControlledFileRemoved = (event) => {
  const file = event.detail;
  const index = controlledFiles.value.findIndex(f => f.name === file.name);
  if (index > -1) {
    controlledFiles.value.splice(index, 1);
  }
  logEvent(`File removed from controlled upload: ${file.name}`, 'warning');
};

const clearControlledFiles = () => {
  const count = controlledFiles.value.length;
  controlledFiles.value = [];
  logEvent(`Cleared ${count} file(s) from controlled upload`, 'info');
};

const uploadControlledFiles = () => {
  const count = controlledFiles.value.length;
  updateStats(controlledFiles.value, true);
  controlledFiles.value = [];
  logEvent(`Manually uploaded ${count} file(s) from controlled upload`, 'success');
};

const removeControlledFile = (index) => {
  const file = controlledFiles.value[index];
  controlledFiles.value.splice(index, 1);
  logEvent(`Manually removed file: ${file.name}`, 'warning');
};

// Common handlers
const handleFilesRejected = (event) => {
  const rejectedFiles = event.detail;
  updateStats(rejectedFiles.map(rf => rf.file), false);
  
  rejectedFiles.forEach(rejection => {
    logEvent(`File rejected: ${rejection.file.name}`, 'error', `Reason: ${rejection.reason}`);
  });
};

const handleFileRemoved = (event) => {
  const file = event.detail;
  logEvent(`File removed: ${file.name}`, 'warning');
};

// Utility methods
const clearEventLog = () => {
  eventLog.value = [];
};
</script>