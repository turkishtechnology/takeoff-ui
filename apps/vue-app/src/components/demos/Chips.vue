<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Chips Component Demo</h2>
      </template>
      
      <div class="space-y-6">
        <!-- Chip Variants -->
        <div>
          <h3 class="text-lg font-medium mb-3">Chip Variants</h3>
          <div class="flex flex-wrap gap-3">
            <TkChips variant="primary" label="primary" removable />
            <TkChips variant="secondary" label="secondary" removable />
            <TkChips variant="neutral" label="neutral" removable />
            <TkChips variant="info" label="info" removable />
            <TkChips variant="warning" label="warning" removable />
            <TkChips variant="success" label="success" removable />
            <TkChips variant="danger" label="danger" removable />
            <TkChips variant="verified" label="verified" removable />
          </div>
        </div>

        <!-- Chip Types -->
        <div>
          <h3 class="text-lg font-medium mb-3">Chip Types</h3>
          <div class="flex flex-wrap gap-3">
            <TkChips variant="primary" type="filled" label="filled" />
            <TkChips variant="primary" type="filledlight" label="filledlight" />
            <TkChips variant="primary" type="outlined" label="outlined" />
          </div>
        </div>

        <!-- Chip Sizes -->
        <div>
          <h3 class="text-lg font-medium mb-3">Chip Sizes</h3>
          <div class="flex items-center gap-3">
            <TkChips variant="primary" size="small" label="small" removable />
            <TkChips variant="primary" size="base" label="base" removable />
            <TkChips variant="primary" size="large" label="large" removable />
          </div>
        </div>

        <!-- Chips with Icons -->
        <div>
          <h3 class="text-lg font-medium mb-3">Chips with Icons</h3>
          <div class="flex flex-wrap gap-3">
            <TkChips variant="primary" size="large" icon="flight" label="primary" removable />
            <TkChips variant="success" icon="check" label="completed" removable />
            <TkChips variant="warning" icon="warning" label="warning" removable />
            <TkChips variant="info" icon="info" label="information" removable />
            <TkChips variant="danger" icon="error" label="error" removable />
          </div>
        </div>

        <!-- Disabled Chips -->
        <div>
          <h3 class="text-lg font-medium mb-3">Disabled Chips</h3>
          <div class="flex flex-wrap gap-3">
            <TkChips variant="primary" label="disabled" disabled />
            <TkChips variant="success" label="disabled removable" disabled removable />
            <TkChips variant="info" icon="info" label="disabled with icon" disabled />
          </div>
        </div>

        <!-- Non-removable Chips -->
        <div>
          <h3 class="text-lg font-medium mb-3">Non-removable Chips</h3>
          <div class="flex flex-wrap gap-3">
            <TkChips variant="primary" label="Fixed" />
            <TkChips variant="success" icon="verified" label="Verified" />
            <TkChips variant="info" label="Read-only" type="outlined" />
          </div>
        </div>

        <!-- Skills/Tags Example -->
        <div>
          <h3 class="text-lg font-medium mb-3">Skills/Tags Example</h3>
          <div class="space-y-4">
            <div>
              <h4 class="text-md font-medium mb-2">Programming Languages</h4>
              <div class="flex flex-wrap gap-2">
                <TkChips 
                  v-for="skill in programmingSkills" 
                  :key="skill.id"
                  :variant="skill.variant"
                  :label="skill.label"
                  :icon="skill.icon"
                  removable
                  @tk-remove="removeSkill('programming', skill.id)"
                />
              </div>
            </div>
            <div>
              <h4 class="text-md font-medium mb-2">Frameworks</h4>
              <div class="flex flex-wrap gap-2">
                <TkChips 
                  v-for="framework in frameworks" 
                  :key="framework.id"
                  :variant="framework.variant"
                  :label="framework.label"
                  type="filledlight"
                  removable
                  @tk-remove="removeSkill('frameworks', framework.id)"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Avatar Type Chips -->
        <div>
          <h3 class="text-lg font-medium mb-3">Avatar Type Chips</h3>
          <div class="flex flex-wrap gap-3">
            <TkChips type="avatar" label="User 1" removable />
            <TkChips type="avatar" label="User 2" removable />
            <TkChips type="avatar" label="User 3" removable />
          </div>
        </div>

        <!-- Interactive Chip Builder -->
        <div>
          <h3 class="text-lg font-medium mb-3">Interactive Chip Builder</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Variant</label>
                <select v-model="selectedVariant" class="w-full px-3 py-2 border rounded">
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="danger">Danger</option>
                  <option value="info">Info</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Type</label>
                <select v-model="selectedType" class="w-full px-3 py-2 border rounded">
                  <option value="filled">Filled</option>
                  <option value="filledlight">Filled Light</option>
                  <option value="outlined">Outlined</option>
                  <option value="avatar">Avatar</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Size</label>
                <select v-model="selectedSize" class="w-full px-3 py-2 border rounded">
                  <option value="small">Small</option>
                  <option value="base">Base</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Label</label>
                <input 
                  v-model="customLabel" 
                  type="text" 
                  class="w-full px-3 py-2 border rounded"
                  placeholder="Enter label"
                >
              </div>
            </div>
            <div class="flex gap-4">
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="showIcon" class="rounded">
                Show Icon
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="isRemovable" class="rounded">
                Removable
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="isDisabled" class="rounded">
                Disabled
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="autoDestroy" class="rounded">
                Auto Self Destroy
              </label>
            </div>
            <div class="flex items-center gap-4">
              <TkChips 
                :variant="selectedVariant"
                :type="selectedType"
                :size="selectedSize"
                :label="customLabel || 'Custom Chip'"
                :icon="showIcon ? 'star' : null"
                :removable="isRemovable"
                :disabled="isDisabled"
                :auto-self-destroy="autoDestroy"
                @tk-remove="handleCustomChipRemove"
              />
              <span class="text-sm text-gray-500">← Your custom chip</span>
            </div>
          </div>
        </div>

        <!-- Dynamic Chip List -->
        <div>
          <h3 class="text-lg font-medium mb-3">Dynamic Chip Management</h3>
          <div class="space-y-4">
            <div class="flex gap-2">
              <input 
                v-model="newChipLabel" 
                type="text" 
                placeholder="Add new chip..."
                class="px-3 py-2 border rounded flex-1"
                @keyup.enter="addChip"
              >
              <TkButton label="Add Chip" @click="addChip" size="small" />
            </div>
            <div class="flex flex-wrap gap-2">
              <TkChips 
                v-for="chip in dynamicChips" 
                :key="chip.id"
                :variant="chip.variant"
                :label="chip.label"
                removable
                @tk-remove="removeDynamicChip(chip.id)"
              />
            </div>
            <p class="text-sm text-gray-600">
              Total chips: {{ dynamicChips.length }}
            </p>
          </div>
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TkCard, TkChips, TkButton } from '@takeoff-ui/vue';

// Skills data
const programmingSkills = ref([
  { id: 1, label: 'JavaScript', variant: 'primary', icon: 'code' },
  { id: 2, label: 'TypeScript', variant: 'info', icon: 'code' },
  { id: 3, label: 'Python', variant: 'success', icon: 'code' },
  { id: 4, label: 'Java', variant: 'warning', icon: 'code' },
]);

const frameworks = ref([
  { id: 1, label: 'Vue.js', variant: 'success' },
  { id: 2, label: 'React', variant: 'primary' },
  { id: 3, label: 'Angular', variant: 'danger' },
  { id: 4, label: 'Node.js', variant: 'success' },
]);

// Interactive controls
const selectedVariant = ref('primary');
const selectedType = ref('filled');
const selectedSize = ref('base');
const customLabel = ref('');
const showIcon = ref(false);
const isRemovable = ref(true);
const isDisabled = ref(false);
const autoDestroy = ref(true);

// Dynamic chips
const newChipLabel = ref('');
const dynamicChips = ref([
  { id: 1, label: 'Sample Chip 1', variant: 'primary' },
  { id: 2, label: 'Sample Chip 2', variant: 'success' },
  { id: 3, label: 'Sample Chip 3', variant: 'info' },
]);
let chipIdCounter = 4;

const removeSkill = (category, skillId) => {
  if (category === 'programming') {
    programmingSkills.value = programmingSkills.value.filter(skill => skill.id !== skillId);
  } else if (category === 'frameworks') {
    frameworks.value = frameworks.value.filter(framework => framework.id !== skillId);
  }
  console.log(`Removed ${category} skill with ID: ${skillId}`);
};

const handleCustomChipRemove = (event) => {
  console.log('Custom chip removed:', event.detail);
};

const addChip = () => {
  if (newChipLabel.value.trim()) {
    const variants = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];
    const randomVariant = variants[Math.floor(Math.random() * variants.length)];
    
    dynamicChips.value.push({
      id: chipIdCounter++,
      label: newChipLabel.value.trim(),
      variant: randomVariant
    });
    newChipLabel.value = '';
  }
};

const removeDynamicChip = (chipId) => {
  dynamicChips.value = dynamicChips.value.filter(chip => chip.id !== chipId);
  console.log(`Removed dynamic chip with ID: ${chipId}`);
};
</script>
