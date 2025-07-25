import { TkButton, TkDropdown } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Example = () => {
  const options = [
    { label: 'Lorem Ipsum', value: '1' },
    { label: 'It is established', value: '2' },
    { label: 'Many desktop', value: '3' },
  ];

  return (
    <TkDropdown options={options}>
      <TkButton label="Select" icon="keyboard_arrow_down" iconPosition="right" slot="trigger" />
    </TkDropdown>
  );
};

const Basic = () => {
  const reactCode = `const options = [
  { label: "Lorem Ipsum", value: "1" },
  { label: "It is established", value: "2" },
  { label: "Many desktop", value: "3" },
];

return (
  <TkDropdown options={options}>
    <TkButton
      label="Select"
      icon="keyboard_arrow_down"
      iconPosition="right"
      slot="trigger"
    />
  </TkDropdown>
);`;

  const vueCode = `<script setup>
import { TkDropdown, TkButton } from '@takeoff-ui/vue';

const options = [
  { label: 'Lorem Ipsum', value: '1' },
  { label: 'It is established', value: '2' },
  { label: 'Many desktop', value: '3' },
];
</script>

<template>
  <div>
    <tk-dropdown :options.prop="options">
      <tk-button
        label="Select"
        icon="keyboard_arrow_down"
        icon-position="right"
        slot="trigger"
      />
    </tk-dropdown>
  </div>
</template>
`;

  const angularCode = `<tk-dropdown [options]="[
    { label: 'Lorem Ipsum', value: '1' },
    { label: 'It is established', value: '2' },
    { label: 'Many desktop', value: '3' }
  ]">
    <tk-button
      label="Select"
      icon="keyboard_arrow_down"
      iconPosition="right"
      slot="trigger"
    />
  </tk-dropdown>`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Basic;
