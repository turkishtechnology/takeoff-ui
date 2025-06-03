import { TkSelect } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const GroupedOptions = () => {
  const reactCode = `<TkSelect
  label="Grouped Cities"
  placeholder="Select a city"
  options={[
    {
      groupName: 'Marmara',
      options: [
        { value: 'ankara', label: 'Ankara' },
        { value: 'istanbul', label: 'İzmir' },
        { value: 'izmir', label: 'İstanbul' },
      ],
    },
    {
      groupName: 'Batı Karadeniz',
      options: [
        { value: 'bolu', label: 'Bolu' },
        { value: 'bartin', label: 'Bartın' },
        { value: 'zonguldak', label: 'Zonguldak' },
      ],
    },
    {
      groupName: 'İç Anadolu',
      options: [
        { value: 'yozgat', label: 'Yozgat' },
        { value: 'kirikkale', label: 'Kırıkkale' },
      ],
    },
  ]}
  groupNameKey="groupName"
  groupOptionsKey="options"
  optionLabelKey="label"
  optionValueKey="value"
/>`;

  const vueCode = `<script setup>
import { TkSelect } from '@takeoff-ui/vue';
import { ref } from 'vue';

const selectValue = ref();
</script>
<template>
  <TkSelect
    label="Grouped Cities"
    placeholder="Select a city"
    v-model="selectValue"
    groupNameKey="groupName"
    groupOptionsKey="options"
    optionLabelKey="label"
    optionValueKey="value"
    :options.prop="[
      {
        groupName: 'Marmara',
        options: [
          { value: 'ankara', label: 'Ankara' },
          { value: 'istanbul', label: 'İzmir' },
          { value: 'izmir', label: 'İstanbul' }
        ]
      },
      {
        groupName: 'Batı Karadeniz',
        options: [
          { value: 'bolu', label: 'Bolu' },
          { value: 'bartin', label: 'Bartın' },
          { value: 'zonguldak', label: 'Zonguldak' }
        ]
      },
      {
        groupName: 'İç Anadolu',
        options: [
          { value: 'yozgat', label: 'Yozgat' },
          { value: 'kirikkale', label: 'Kırıkkale' }
        ]
      }
    ]"
  />
</template>`;

  const angularCode = `<tk-select
  label="Grouped Cities"
  placeholder="Select a city"
  [(value)]="value"
  [options]="[
    {
      groupName: 'Marmara',
      options: [
        { value: 'ankara', label: 'Ankara' },
        { value: 'istanbul', label: 'İzmir' },
        { value: 'izmir', label: 'İstanbul' }
      ]
    },
    {
      groupName: 'Batı Karadeniz',
      options: [
        { value: 'bolu', label: 'Bolu' },
        { value: 'bartin', label: 'Bartın' },
        { value: 'zonguldak', label: 'Zonguldak' }
      ]
    },
    {
      groupName: 'İç Anadolu',
      options: [
        { value: 'yozgat', label: 'Yozgat' },
        { value: 'kirikkale', label: 'Kırıkkale' }
      ]
    }
  ]"
  groupNameKey="groupName"
  groupOptionsKey="options"
  optionLabelKey="label"
  optionValueKey="value"
/>`;

  const [value, setValue] = useState(null);

  const demo = (
    <div className="max-w-[400px]">
      <TkSelect
        label="Grouped Cities"
        placeholder="Select a city"
        options={[
          {
            groupName: 'Marmara',
            options: [
              { value: 'ankara', label: 'Ankara' },
              { value: 'istanbul', label: 'İzmir' },
              { value: 'izmir', label: 'İstanbul' },
            ],
          },
          {
            groupName: 'Batı Karadeniz',
            options: [
              { value: 'bolu', label: 'Bolu' },
              { value: 'bartin', label: 'Bartın' },
              { value: 'zonguldak', label: 'Zonguldak' },
            ],
          },
          {
            groupName: 'İç Anadolu',
            options: [
              { value: 'yozgat', label: 'Yozgat' },
              { value: 'kirikkale', label: 'Kırıkkale' },
            ],
          },
        ]}
        groupNameKey="groupName"
        groupOptionsKey="options"
        optionLabelKey="label"
        optionValueKey="value"
        value={value}
        onTkChange={(e) => setValue(e.detail)}
      />
    </div>
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={angularCode}
    ></FeatureDemo>
  );
};

export default GroupedOptions;
