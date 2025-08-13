<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Dialog Component Demo</h2>
      </template>
      
      <div class="space-y-6">
        <!-- Basic Dialog -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Dialog</h3>
          <div class="flex gap-4">
            <TkButton label="Open Basic Dialog" @tk-click="showBasicDialog = true" />
            <TkButton label="Open Welcome Dialog" variant="secondary" @tk-click="showWelcomeDialog = true" />
          </div>
          
          <TkDialog
            header="Basic Dialog"
            subheader="This is a basic dialog example"
            v-model="showBasicDialog"
            :container-style="{ width: '450px' }"
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
              sed consequuntur error repudiandae numquam deserunt quisquam repellat
              libero asperiores earum nam nobis, culpa ratione quam perferendis
              esse, cupiditate neque quas!
            </p>
          </TkDialog>

          <TkDialog
            header="Welcome"
            subheader="Welcome to our application"
            v-model="showWelcomeDialog"
            :container-style="{ width: '500px' }"
          >
            <div class="space-y-4">
              <p>Thank you for joining us! We're excited to have you on board.</p>
              <ul class="list-disc list-inside space-y-1">
                <li>Explore our features</li>
                <li>Customize your profile</li>
                <li>Connect with others</li>
              </ul>
            </div>
          </TkDialog>
        </div>

        <!-- Dialog with Footer -->
        <div>
          <h3 class="text-lg font-medium mb-3">Dialog with Footer Actions</h3>
          <div class="flex gap-4">
            <TkButton label="Open Confirmation Dialog" @tk-click="showConfirmDialog = true" />
            <TkButton label="Open Form Dialog" variant="secondary" @tk-click="showFormDialog = true" />
          </div>

          <TkDialog
            header="Confirm Action"
            subheader="Please confirm your action"
            v-model="showConfirmDialog"
            :container-style="{ width: '450px' }"
          >
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            <template #footer-actions>
              <TkButton
                label="Cancel"
                variant="neutral"
                type="text"
                @tk-click="showConfirmDialog = false"
              />
              <TkButton
                label="Delete"
                variant="danger"
                @tk-click="handleDelete"
              />
            </template>
          </TkDialog>

          <TkDialog
            header="Edit Profile"
            subheader="Update your profile information"
            v-model="showFormDialog"
            :container-style="{ width: '500px' }"
          >
            <div class="space-y-4">
              <TkInput
                label="Name"
                v-model="formData.name"
                placeholder="Enter your name"
              />
              <TkInput
                label="Email"
                type="email"
                v-model="formData.email"
                placeholder="Enter your email"
              />
              <TkTextarea
                label="Bio"
                v-model="formData.bio"
                placeholder="Tell us about yourself"
                :rows="3"
              />
            </div>
            <template #footer-actions>
              <TkButton
                label="Cancel"
                variant="neutral"
                type="text"
                @tk-click="showFormDialog = false"
              />
              <TkButton
                label="Save"
                variant="primary"
                @tk-click="saveProfile"
              />
            </template>
          </TkDialog>
        </div>

        <!-- Dialog Variants -->
        <div>
          <h3 class="text-lg font-medium mb-3">Dialog Variants</h3>
          <div class="flex gap-4 flex-wrap">
            <TkButton label="Info Dialog" variant="info" @tk-click="showInfoDialog = true" />
            <TkButton label="Success Dialog" variant="success" @tk-click="showSuccessDialog = true" />
            <TkButton label="Warning Dialog" variant="warning" @tk-click="showWarningDialog = true" />
            <TkButton label="Danger Dialog" variant="danger" @tk-click="showDangerDialog = true" />
          </div>

          <TkDialog
            header="Information"
            subheader="This is an info dialog"
            variant="info"
            v-model="showInfoDialog"
            :container-style="{ width: '450px' }"
          >
            <p>This dialog provides information about a process or feature.</p>
          </TkDialog>

          <TkDialog
            header="Success"
            subheader="Operation completed successfully"
            variant="success"
            v-model="showSuccessDialog"
            :container-style="{ width: '450px' }"
          >
            <p>Your action has been completed successfully!</p>
          </TkDialog>

          <TkDialog
            header="Warning"
            subheader="Please review before proceeding"
            variant="warning"
            v-model="showWarningDialog"
            :container-style="{ width: '450px' }"
          >
            <p>This action may have unintended consequences. Please proceed with caution.</p>
          </TkDialog>

          <TkDialog
            header="Danger"
            subheader="This action is destructive"
            variant="danger"
            v-model="showDangerDialog"
            :container-style="{ width: '450px' }"
          >
            <p>Warning: This action is irreversible and may cause data loss.</p>
            <template #footer-actions>
              <TkButton
                label="Cancel"
                variant="neutral"
                type="text"
                @tk-click="showDangerDialog = false"
              />
              <TkButton
                label="Proceed"
                variant="danger"
                @tk-click="handleDangerousAction"
              />
            </template>
          </TkDialog>
        </div>

        <!-- Header Types -->
        <div>
          <h3 class="text-lg font-medium mb-3">Header Types</h3>
          <div class="flex gap-4 flex-wrap">
            <TkButton label="Basic Header" @tk-click="showBasicHeaderDialog = true" />
            <TkButton label="Primary Header" variant="primary" @tk-click="showPrimaryHeaderDialog = true" />
            <TkButton label="Dark Header" variant="neutral" @tk-click="showDarkHeaderDialog = true" />
            <TkButton label="Light Header" variant="secondary" @tk-click="showLightHeaderDialog = true" />
          </div>

          <TkDialog
            header="Basic Header"
            subheader="This dialog uses basic header type"
            header-type="basic"
            v-model="showBasicHeaderDialog"
            :container-style="{ width: '450px' }"
          >
            <p>This dialog demonstrates the basic header styling.</p>
          </TkDialog>

          <TkDialog
            header="Primary Header"
            subheader="This dialog uses primary header type"
            header-type="primary"
            v-model="showPrimaryHeaderDialog"
            :container-style="{ width: '450px' }"
          >
            <p>This dialog demonstrates the primary header styling.</p>
          </TkDialog>

          <TkDialog
            header="Dark Header"
            subheader="This dialog uses dark header type"
            header-type="dark"
            v-model="showDarkHeaderDialog"
            :container-style="{ width: '450px' }"
          >
            <p>This dialog demonstrates the dark header styling.</p>
          </TkDialog>

          <TkDialog
            header="Light Header"
            subheader="This dialog uses light header type"
            header-type="light"
            v-model="showLightHeaderDialog"
            :container-style="{ width: '450px' }"
          >
            <p>This dialog demonstrates the light header styling.</p>
          </TkDialog>
        </div>

        <!-- Dialog Options -->
        <div>
          <h3 class="text-lg font-medium mb-3">Dialog Options</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TkButton label="No Close Button" @tk-click="showNoCloseDialog = true" />
            <TkButton label="No Header" @tk-click="showNoHeaderDialog = true" />
            <TkButton label="No Backdrop" @tk-click="showNoBackdropDialog = true" />
            <TkButton label="Blur Background" @tk-click="showBlurDialog = true" />
            <TkButton label="Prevent Dismiss" @tk-click="showPreventDismissDialog = true" />
            <TkButton label="No Variant Sign" @tk-click="showNoSignDialog = true" />
          </div>

          <TkDialog
            header="No Close Button"
            subheader="This dialog has no close button"
            :show-close-button="false"
            v-model="showNoCloseDialog"
            :container-style="{ width: '450px' }"
          >
            <p>You must use the footer buttons to close this dialog.</p>
            <template #footer-actions>
              <TkButton
                label="Close"
                variant="primary"
                @tk-click="showNoCloseDialog = false"
              />
            </template>
          </TkDialog>

          <TkDialog
            :show-header="false"
            v-model="showNoHeaderDialog"
            :container-style="{ width: '450px' }"
          >
            <div class="text-center py-4">
              <h3 class="text-lg font-semibold mb-2">Custom Content</h3>
              <p>This dialog has no header and uses custom content instead.</p>
            </div>
            <template #footer-actions>
              <TkButton
                label="Close"
                variant="primary"
                @tk-click="showNoHeaderDialog = false"
              />
            </template>
          </TkDialog>

          <TkDialog
            header="No Backdrop"
            subheader="This dialog has no backdrop"
            :hide-backdrop="true"
            v-model="showNoBackdropDialog"
            :container-style="{ width: '450px' }"
          >
            <p>This dialog doesn't have a backdrop overlay.</p>
          </TkDialog>

          <TkDialog
            header="Blur Background"
            subheader="This dialog has a blur effect"
            :is-mask-blur="true"
            v-model="showBlurDialog"
            :container-style="{ width: '450px' }"
          >
            <p>The background behind this dialog is blurred.</p>
          </TkDialog>

          <TkDialog
            header="Prevent Dismiss"
            subheader="Click outside won't close this dialog"
            :prevent-dismiss="true"
            v-model="showPreventDismissDialog"
            :container-style="{ width: '450px' }"
          >
            <p>You can't close this dialog by clicking outside or pressing escape.</p>
            <template #footer-actions>
              <TkButton
                label="Close"
                variant="primary"
                @tk-click="showPreventDismissDialog = false"
              />
            </template>
          </TkDialog>

          <TkDialog
            header="No Variant Sign"
            subheader="This info dialog has no variant icon"
            variant="info"
            :show-variant-sign="false"
            v-model="showNoSignDialog"
            :container-style="{ width: '450px' }"
          >
            <p>This dialog doesn't show the variant icon even though it has an info variant.</p>
          </TkDialog>
        </div>

        <!-- Different Mask Variants -->
        <div>
          <h3 class="text-lg font-medium mb-3">Mask Variants</h3>
          <div class="flex gap-4 flex-wrap">
            <TkButton label="Light Mask" @tk-click="showLightMaskDialog = true" />
            <TkButton label="Base Mask" @tk-click="showBaseMaskDialog = true" />
            <TkButton label="Dark Mask" @tk-click="showDarkMaskDialog = true" />
            <TkButton label="Darkest Mask" @tk-click="showDarkestMaskDialog = true" />
          </div>

          <TkDialog
            header="Light Mask"
            subheader="This dialog uses light mask variant"
            mask-variant="light"
            v-model="showLightMaskDialog"
            :container-style="{ width: '450px' }"
          >
            <p>This dialog uses a light background mask.</p>
          </TkDialog>

          <TkDialog
            header="Base Mask"
            subheader="This dialog uses base mask variant"
            mask-variant="base"
            v-model="showBaseMaskDialog"
            :container-style="{ width: '450px' }"
          >
            <p>This dialog uses a base background mask.</p>
          </TkDialog>

          <TkDialog
            header="Dark Mask"
            subheader="This dialog uses dark mask variant"
            mask-variant="dark"
            v-model="showDarkMaskDialog"
            :container-style="{ width: '450px' }"
          >
            <p>This dialog uses a dark background mask.</p>
          </TkDialog>

          <TkDialog
            header="Darkest Mask"
            subheader="This dialog uses darkest mask variant"
            mask-variant="darkest"
            v-model="showDarkestMaskDialog"
            :container-style="{ width: '450px' }"
          >
            <p>This dialog uses the darkest background mask.</p>
          </TkDialog>
        </div>

        <!-- Custom Content -->
        <div>
          <h3 class="text-lg font-medium mb-3">Custom Content</h3>
          <div class="flex gap-4">
            <TkButton label="Rich Content Dialog" @tk-click="showRichContentDialog = true" />
            <TkButton label="Image Gallery Dialog" variant="secondary" @tk-click="showGalleryDialog = true" />
          </div>

          <TkDialog
            v-model="showRichContentDialog"
            :container-style="{ width: '600px', maxHeight: '80vh' }"
          >
            <template #header>
              <div class="flex items-center gap-3 p-4">
                <TkAvatar label="JD" variant="primary" background="solid" rounded />
                <div>
                  <h3 class="font-semibold">John Doe</h3>
                  <p class="text-sm text-gray-600">Software Engineer</p>
                </div>
              </div>
            </template>
            <template #content>
              <div class="space-y-4">
                <div class="flex gap-2">
                  <TkBadge label="JavaScript" variant="primary" size="small" />
                  <TkBadge label="Vue.js" variant="success" size="small" />
                  <TkBadge label="Node.js" variant="info" size="small" />
                </div>
                <p>Experienced software engineer with expertise in modern web technologies.</p>
                <TkDivider />
                <div>
                  <h4 class="font-semibold mb-2">Contact Information</h4>
                  <div class="space-y-2">
                    <p><strong>Email:</strong> john.doe@example.com</p>
                    <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                    <p><strong>Location:</strong> San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </template>
            <template #footer-actions>
              <TkButton
                label="Send Message"
                variant="primary"
                @tk-click="sendMessage"
              />
              <TkButton
                label="Add to Team"
                variant="secondary"
                @tk-click="addToTeam"
              />
            </template>
          </TkDialog>

          <TkDialog
            header="Image Gallery"
            subheader="Beautiful images from our collection"
            v-model="showGalleryDialog"
            :container-style="{ width: '700px' }"
          >
            <div class="grid grid-cols-2 gap-4">
              <div v-for="i in 4" :key="i" class="aspect-video bg-gray-200 rounded flex items-center justify-center">
                <span class="text-gray-500">Image {{ i }}</span>
              </div>
            </div>
            <template #footer-actions>
              <TkButton
                label="Download All"
                variant="secondary"
                @tk-click="downloadImages"
              />
              <TkButton
                label="Close"
                variant="primary"
                @tk-click="showGalleryDialog = false"
              />
            </template>
          </TkDialog>
        </div>

        <!-- Interactive Demo -->
        <div>
          <h3 class="text-lg font-medium mb-3">Interactive Dialog Demo</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Variant</label>
                <select v-model="selectedVariant" class="w-full px-3 py-2 border rounded">
                  <option value="info">Info</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="danger">Danger</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Header Type</label>
                <select v-model="selectedHeaderType" class="w-full px-3 py-2 border rounded">
                  <option value="basic">Basic</option>
                  <option value="primary">Primary</option>
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Mask Variant</label>
                <select v-model="selectedMaskVariant" class="w-full px-3 py-2 border rounded">
                  <option value="light">Light</option>
                  <option value="base">Base</option>
                  <option value="dark">Dark</option>
                  <option value="darkest">Darkest</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Width</label>
                <select v-model="selectedWidth" class="w-full px-3 py-2 border rounded">
                  <option value="400px">Small (400px)</option>
                  <option value="500px">Medium (500px)</option>
                  <option value="600px">Large (600px)</option>
                  <option value="800px">Extra Large (800px)</option>
                </select>
              </div>
            </div>
            <div class="flex gap-4 flex-wrap">
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="showCloseButton" class="rounded">
                Show Close Button
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="showHeader" class="rounded">
                Show Header
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="showVariantSign" class="rounded">
                Show Variant Sign
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="hideBackdrop" class="rounded">
                Hide Backdrop
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="isMaskBlur" class="rounded">
                Blur Background
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="preventDismiss" class="rounded">
                Prevent Dismiss
              </label>
            </div>
            <div>
              <TkButton label="Open Interactive Dialog" @tk-click="showInteractiveDialog = true" />
            </div>
          </div>

          <TkDialog
            :header="showHeader ? `Interactive ${selectedVariant} Dialog` : null"
            :subheader="showHeader ? `This is a ${selectedVariant} dialog with custom settings` : null"
            :variant="selectedVariant"
            :header-type="selectedHeaderType"
            :mask-variant="selectedMaskVariant"
            :show-close-button="showCloseButton"
            :show-header="showHeader"
            :show-variant-sign="showVariantSign"
            :hide-backdrop="hideBackdrop"
            :is-mask-blur="isMaskBlur"
            :prevent-dismiss="preventDismiss"
            v-model="showInteractiveDialog"
            :container-style="{ width: selectedWidth }"
          >
            <div class="space-y-3">
              <p>This is an interactive dialog where you can test different configurations.</p>
              <p><strong>Current settings:</strong></p>
              <ul class="text-sm space-y-1">
                <li>Variant: {{ selectedVariant }}</li>
                <li>Header Type: {{ selectedHeaderType }}</li>
                <li>Mask Variant: {{ selectedMaskVariant }}</li>
                <li>Width: {{ selectedWidth }}</li>
                <li>Close Button: {{ showCloseButton ? 'Shown' : 'Hidden' }}</li>
                <li>Header: {{ showHeader ? 'Shown' : 'Hidden' }}</li>
                <li>Variant Sign: {{ showVariantSign ? 'Shown' : 'Hidden' }}</li>
                <li>Backdrop: {{ hideBackdrop ? 'Hidden' : 'Shown' }}</li>
                <li>Blur: {{ isMaskBlur ? 'Enabled' : 'Disabled' }}</li>
                <li>Prevent Dismiss: {{ preventDismiss ? 'Enabled' : 'Disabled' }}</li>
              </ul>
            </div>
            <template #footer-actions>
              <TkButton
                label="Close"
                variant="neutral"
                type="text"
                @tk-click="showInteractiveDialog = false"
              />
              <TkButton
                label="Apply"
                :variant="selectedVariant"
                @tk-click="applySettings"
              />
            </template>
          </TkDialog>
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TkCard, TkDialog, TkButton, TkInput, TkTextarea, TkAvatar, TkBadge, TkDivider } from '@takeoff-ui/vue';

// Basic dialogs
const showBasicDialog = ref(false);
const showWelcomeDialog = ref(false);

// Footer dialogs
const showConfirmDialog = ref(false);
const showFormDialog = ref(false);

// Form data
const formData = ref({
  name: '',
  email: '',
  bio: ''
});

// Variant dialogs
const showInfoDialog = ref(false);
const showSuccessDialog = ref(false);
const showWarningDialog = ref(false);
const showDangerDialog = ref(false);

// Header type dialogs
const showBasicHeaderDialog = ref(false);
const showPrimaryHeaderDialog = ref(false);
const showDarkHeaderDialog = ref(false);
const showLightHeaderDialog = ref(false);

// Option dialogs
const showNoCloseDialog = ref(false);
const showNoHeaderDialog = ref(false);
const showNoBackdropDialog = ref(false);
const showBlurDialog = ref(false);
const showPreventDismissDialog = ref(false);
const showNoSignDialog = ref(false);

// Mask variant dialogs
const showLightMaskDialog = ref(false);
const showBaseMaskDialog = ref(false);
const showDarkMaskDialog = ref(false);
const showDarkestMaskDialog = ref(false);

// Custom content dialogs
const showRichContentDialog = ref(false);
const showGalleryDialog = ref(false);

// Interactive demo
const showInteractiveDialog = ref(false);
const selectedVariant = ref('info');
const selectedHeaderType = ref('basic');
const selectedMaskVariant = ref('base');
const selectedWidth = ref('500px');
const showCloseButton = ref(true);
const showHeader = ref(true);
const showVariantSign = ref(true);
const hideBackdrop = ref(false);
const isMaskBlur = ref(false);
const preventDismiss = ref(false);

// Methods
const handleDelete = () => {
  console.log('Item deleted');
  showConfirmDialog.value = false;
};

const saveProfile = () => {
  console.log('Profile saved:', formData.value);
  showFormDialog.value = false;
  // Reset form
  formData.value = {
    name: '',
    email: '',
    bio: ''
  };
};

const handleDangerousAction = () => {
  console.log('Dangerous action executed');
  showDangerDialog.value = false;
};

const sendMessage = () => {
  console.log('Message sent');
  showRichContentDialog.value = false;
};

const addToTeam = () => {
  console.log('Added to team');
  showRichContentDialog.value = false;
};

const downloadImages = () => {
  console.log('Downloading images...');
};

const applySettings = () => {
  console.log('Settings applied');
  showInteractiveDialog.value = false;
};
</script>
