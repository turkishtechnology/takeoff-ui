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
    <div className="flex flex-col gap-2">
      <div className="justify-center flex-wrap flex gap-2">
        <TkDropdown options={options} position="bottom">
          <TkButton label="Bottom" slot="trigger" />
        </TkDropdown>
        <TkDropdown options={options} position="bottom-start">
          <TkButton label="Bottom Start" slot="trigger" />
        </TkDropdown>
        <TkDropdown options={options} position="bottom-end">
          <TkButton label="Bottom End" slot="trigger" />
        </TkDropdown>
      </div>
      <div className="justify-center flex-wrap flex gap-2">
        <TkDropdown options={options} position="right">
          <TkButton label="Right" slot="trigger" />
        </TkDropdown>
        <TkDropdown options={options} position="right-start">
          <TkButton label="Right Start" slot="trigger" />
        </TkDropdown>
        <TkDropdown options={options} position="right-end">
          <TkButton label="Right End" slot="trigger" />
        </TkDropdown>
      </div>
    </div>
  );
};

const Position = () => {
  const reactCode = `<TkDropdown options={options} position="bottom">
  <TkButton label="Bottom" slot="trigger" />
</TkDropdown>
<TkDropdown options={options} position="bottom-start">
  <TkButton label="Bottom Start" slot="trigger" />
</TkDropdown>
<TkDropdown options={options} position="bottom-end">
  <TkButton label="Bottom End" slot="trigger" />
</TkDropdown>

<TkDropdown options={options} position="right">
  <TkButton label="Right" slot="trigger" />
</TkDropdown>
<TkDropdown options={options} position="right-start">
  <TkButton label="Right Start" slot="trigger" />
</TkDropdown>
<TkDropdown options={options} position="right-end">
  <TkButton label="Right End" slot="trigger" />
</TkDropdown>`;

  const vueCode = `<script setup>
import { TkDropdown, TkButton } from '@takeoff-ui/vue'

const options = [
  { label: "Lorem Ipsum", value: "1" },
  { label: "It is established", value: "2" },
  { label: "Many desktop", value: "3" },
];

</script>

<template>
  <div>
    <TkDropdown :options.prop="options" position="bottom">
      <TkButton label="Bottom" slot="trigger" />
    </TkDropdown>
    <TkDropdown :options.prop="options" position="bottom-start">
      <TkButton label="Bottom Start" slot="trigger" />
    </TkDropdown>
    <TkDropdown :options.prop="options" position="bottom-end">
      <TkButton label="Bottom End" slot="trigger" />
    </TkDropdown>

    <TkDropdown :options.prop="options" position="right">
      <TkButton label="Right" slot="trigger" />
    </TkDropdown>
    <TkDropdown :options.prop="options" position="right-start">
      <TkButton label="Right Start" slot="trigger" />
    </TkDropdown>
    <TkDropdown :options.prop="options" position="right-end">
      <TkButton label="Right End" slot="trigger" />
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

export default Position;
