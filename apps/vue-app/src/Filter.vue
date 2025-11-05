<template v-if="filter && filter.length > 0">
  <div class="tbl-filter relative" ref="dropdownFilter">
    <button
      :class="{
        'tbl-filter-btn': true,
      }"
      @click="toggleFilter"
    >
      <i class="material-symbols-outlined mr-1">filter_list</i>
      Filter
      <i class="material-symbols-outlined ml-3">keyboard_arrow_down</i>
    </button>
    <div class="tbl-filter-content" v-show="isFilterVisible">
      <div class="tbl-filter-header flex justify-between items-center w-full mb-4">
        <p>Filter</p>
        <TkButton icon="close" type="text" variant="neutral" @tkClick="close" />
      </div>
      <div class="w-full">
        <div v-for="(filterGroup, index) in filter" :key="index" class="mb-4">
          <label v-if="filterGroup?.label">{{ filterGroup.label }}</label>
          <div :class="filterGroup.fieldType === 'fieldset' ? 'flex gap-2 mb-4' : 'block mb-4'">
            <template v-for="(item, index) in filterGroup.group" :key="index">
              <div v-if="item.field === 'select'">
                <TkSelect
                  v-model="filters[item.name]"
                  :label="item.label"
                  :options="getOptions(item)"
                  :disabled="getOptions(item)?.length > 0 || item.dependsOnOptions ? false : true"
                  :multiple="item?.multiple"
                  :editable="item?.editable"
                  :clearable="item?.clearable"
                  :placeholder="item.placeholder"
                  :optionLabelKey="item?.optionLabelKey"
                  :optionValueKey="item?.optionValueKey"
                  :loading="item?.loading"
                  @tkChange="handleChangeChild(item)"
                />
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="tbl-filter-rectangle">
        <svg width="12" height="12" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.56699 0.75C4.75944 0.416667 5.24056 0.416667 5.43301 0.75L8.89711 6.75C9.08956 7.08333 8.849 7.5 8.4641 7.5H1.5359C1.151 7.5 0.910436 7.08333 1.10289 6.75L4.56699 0.75Z"
            fill="#F9FAFC"
            stroke="#E1E4EA"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { TkButton, TkAlert, TkInput, TkSelect, TkRadio, TkRadioGroup, TkDatepicker, TkCheckbox, TkToggle, TkTextarea } from '@takeoff-ui/vue';

const props = defineProps<{
  filter: Array<{
    fieldType: string;
    label?: string;
    group: {
      field: string;
      name: any;
      label?: any;
      placeholder?: any;
      mode?: any;
      spread?: boolean;
      multiple?: boolean;
      editable?: boolean;
      clearable?: boolean;
      options?: Array<{ value: string; label: string; child?: Array<object> }>;
      icon?: string;
      iconPosition?: 'left' | 'right';
      format?: string;
      rules?: {
        error: {
          header: string;
          message: string;
        };
      };
      customClass?: string;
      optionLabelKey?: string;
      optionValueKey?: string;
      dependsOn?: string;
      dependsOnOptions?: Array<{ value: string; label: string; child?: Array<object> }>;
      dependsOnAction?: (parentValue: string) => Promise<[]>;
      loading?: boolean;
      hasTimezone?: boolean;
      showTimePicker?: boolean;
      isSecondDate?: boolean;
    }[];
  }>;
  filterInitValue?: {
    [key: string]: any;
  };
}>();

const filters = ref({});
const filtersOld = ref({});
const error = ref({});
const isFilterVisible = ref(false);
const isDisableApply = ref(true);
const dropdownFilter = ref<HTMLElement | null>(null);

const emit = defineEmits(['update:filter', 'update:filterStatus']);

const toggleFilter = () => {
  isFilterVisible.value = !isFilterVisible.value;
};

const close = () => {
  filters.value = {};
  error.value = {};
  isFilterVisible.value = false;
};

const getOptions = item => {
  // Eğer bağlı bir seçim alanı değilse, mevcut seçenekleri döndür
  if (!item?.dependsOn) return item.options;

  //Options eğer bir component içinde alınıp belli şartlarla oluşturup referans ile filter objesi gönderiliyorsa kullanılabilir
  if (item.dependsOn && item.dependsOnOptions) return item.dependsOnOptions;

  //Options eğer bir parentın içinde child parent olarak tutuluyorsa
  const parentValue = filters.value[item.dependsOn];
  const newOptions = parentValue?.children ?? [];
  return newOptions;
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownFilter.value && !dropdownFilter.value.contains(event.target as Node)) {
    isFilterVisible.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

watch(
  () => filters.value,
  newValue => {
    if (JSON.stringify(filtersOld.value) === JSON.stringify(newValue)) {
      isDisableApply.value = true;
    } else {
      isDisableApply.value = Object.keys(newValue).length > 0 ? false : true;
    }
  },
  { deep: true },
);

const handleChangeChild = async item => {
  props.filter.forEach(async filterItem => {
    for (const groupItem of filterItem.group) {
      if (groupItem.dependsOn === item.name) {
        const childName = groupItem.name;
        filters.value[childName] = undefined;

        const parentValue = filters.value[groupItem.dependsOn];

        if (groupItem.dependsOnAction) {
          try {
            const result = await groupItem.dependsOnAction(parentValue);
          } catch (err) {
            console.error('dependsOnAction error ', err);
            groupItem.dependsOnOptions = [];
          }
        }
      }
    }
  });
};
watch(
  () => props.filterInitValue,
  newValue => {
    filters.value = newValue ?? {};
  },
  { deep: true },
);
</script>

<style>
.tbl-filter-btn {
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 8px 10px;
  border-radius: var(--external-label-base-text-area-radius, 8px);
  border: 1px solid var(--border-sub-base);
  background: var(--static-Light, #fff);
}

.tbl-filter-btn.danger {
  background-color: transparent;
  color: var(--primary-base);
  border: 1px solid var(--primary-base);
}

.tbl-filter-btn i {
  font-size: 20px;
  color: #717784;
}
.tbl-filter-btn.danger i {
  color: var(--primary-base);
}

.tbl-filter-content {
  position: absolute;
  z-index: 9999999999;
  right: 0;
  top: 70px;
  width: 480px;
  padding: 8px;
  border-radius: 16px;
  border: 1px solid var(--border-light);
  background: var(--frames-lightest);
  box-shadow:
    0px 2px 2px -1px var(--shadow-black-alpha-base, rgba(82, 88, 102, 0.08)),
    0px 6px 12px -2px var(--shadow-black-alpha-base, rgba(82, 88, 102, 0.08)),
    0px 8px 20px 0px var(--shadow-black-alpha-base, rgba(82, 88, 102, 0.08));
}

.tbl-filter-rectangle {
  position: absolute;
  top: -10px;
  right: 15px;
}

.tbl-filter-rectangle:before {
  content: '';
  position: absolute;
  left: 1px;
  bottom: 1px;
  background: #ffffff;
  width: 10px;
  height: 1px;
}

.tbl-filter-header {
  border-bottom: 1px solid var(--border-light, #e1e4ea);
}

.tbl-filter-radio {
  padding: 12px 12px 6px;
  border-radius: var(--card-radio-container-radius, 8px);
  border: 1px solid var(--border-light, #e1e4ea);
  background: var(--static-Light, #fff);
}
</style>
