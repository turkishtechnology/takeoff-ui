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

  const angularCode = `<tk-dropdown
  [options]="[
    { label: 'Lorem Ipsum', value: '1' },
    { label: 'It is established', value: '2' },
    { label: 'Many desktop', value: '3' }
  ]"
  position="bottom"
>
  <tk-button label="Bottom" slot="trigger" />
</tk-dropdown>
<tk-dropdown
  [options]="[
    { label: 'Lorem Ipsum', value: '1' },
    { label: 'It is established', value: '2' },
    { label: 'Many desktop', value: '3' }
  ]"
  position="bottom-start"
>
  <tk-button label="Bottom Start" slot="trigger" />
</tk-dropdown>
<tk-dropdown
  [options]="[
    { label: 'Lorem Ipsum', value: '1' },
    { label: 'It is established', value: '2' },
    { label: 'Many desktop', value: '3' }
  ]"
  position="bottom-end"
>
  <tk-button label="Bottom End" slot="trigger" />
</tk-dropdown>

<tk-dropdown
  [options]="[
    { label: 'Lorem Ipsum', value: '1' },
    { label: 'It is established', value: '2' },
    { label: 'Many desktop', value: '3' }
  ]"
  position="right"
>
  <tk-button label="Right" slot="trigger" />
</tk-dropdown>
<tk-dropdown
  [options]="[
    { label: 'Lorem Ipsum', value: '1' },
    { label: 'It is established', value: '2' },
    { label: 'Many desktop', value: '3' }
  ]"
  position="right-start"
>
  <tk-button label="Right Start" slot="trigger" />
</tk-dropdown>
<tk-dropdown
  [options]="[
    { label: 'Lorem Ipsum', value: '1' },
    { label: 'It is established', value: '2' },
    { label: 'Many desktop', value: '3' }
  ]"
  position="right-end"
>
  <tk-button label="Right End" slot="trigger" />
</tk-dropdown>`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Position;
