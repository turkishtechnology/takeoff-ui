import { TkSelect } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Example = () => {
  const groupOptions = [
    {
      groupName: 'Büyükşehir',
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
  ];

  return (
    <div className="max-w-[215px]">
      <TkSelect label="Group Option" options={groupOptions} />
    </div>
  );
};

const GroupOption = () => {
  const reactCode = `const groupOptions = [
  {
    groupName: "Büyükşehir",
    options: [
      { value: "ankara", label: "Ankara" },
      { value: "istanbul", label: "İzmir" },
      { value: "izmir", label: "İstanbul" },
    ],
  },
  {
    groupName: "Batı Karadeniz",
    options: [
      { value: "bolu", label: "Bolu" },
      { value: "bartin", label: "Bartın" },
      { value: "zonguldak", label: "Zonguldak" },
    ],
  },
  {
    groupName: "İç Anadolu",
    options: [
      { value: "yozgat", label: "Yozgat" },
      { value: "kirikkale", label: "Kırıkkale" },
    ],
  },
];
return <TkSelect label="Group Option" options={groupOptions} />;`;

  const vueCode = `<script setup>
import { TkSelect } from '@takeoff-ui/vue'
const groupOptions = [
  {
    groupName: "Büyükşehir",
    options: [
      { value: "ankara", label: "Ankara" },
      { value: "istanbul", label: "İzmir" },
      { value: "izmir", label: "İstanbul" },
    ],
  },
  {
    groupName: "Batı Karadeniz",
    options: [
      { value: "bolu", label: "Bolu" },
      { value: "bartin", label: "Bartın" },
      { value: "zonguldak", label: "Zonguldak" },
    ],
  },
  {
    groupName: "İç Anadolu",
    options: [
      { value: "yozgat", label: "Yozgat" },
      { value: "kirikkale", label: "Kırıkkale" },
    ],
  },
];
</script>

<template>
    <TkSelect label="Group Option" :options.prop="groupOptions" />
</template>
`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default GroupOption;
