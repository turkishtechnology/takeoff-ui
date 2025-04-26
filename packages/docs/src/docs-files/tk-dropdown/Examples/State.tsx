import { TkButton, TkDropdown } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Example = () => {
  const options = [
    { label: 'Enable Item', value: '1' },
    { label: 'Disabled Item', value: '2', disabled: true },
    { label: 'Enable Item', value: '3' },
  ];

  return (
    <TkDropdown options={options}>
      <TkButton label="Disable Item Example" slot="trigger" />
    </TkDropdown>
  );
};

const State = () => {
  const reactCode = `const options = [
  { label: "Enable Item", value: "1" },
  { label: "Disabled Item", value: "2", disabled: true },
  { label: "Enable Item", value: "3" },
];
return (
  <TkDropdown options={options}>
    <TkButton label="Disable Item Example" slot="trigger" />
  </TkDropdown>
);`;

  const vueCode = `<script setup>
import { TkDropdown, TkButton } from '@takeoff-ui/vue'

const options = [
  { label: "Lorem Ipsum", value: "1", disabled: true },
  { label: "It is established", value: "2" },
  { label: "Many desktop", value: "3" },
];

</script>

<template>
  <div>
    <TkDropdown :options.prop="options" position="bottom">
      <TkButton label="Bottom" slot="trigger" />
    </TkDropdown>
  </div>
</template>
`;

  const demo = <Example />;

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={''}
    ></FeatureDemo>
  );
};

export default State;
