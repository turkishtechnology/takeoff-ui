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
    <TkDropdown
      options={options}
      onTkItemClick={(e: any) => {
        alert(`${e.detail.label} has been clicked`);
      }}
    >
      <TkButton
        label="Item Click Example"
        icon="keyboard_arrow_down"
        iconPosition="right"
        slot="trigger"
      />
    </TkDropdown>
  );
};

const ItemClick = () => {
  const reactCode = `const options = [
  { label: "Lorem Ipsum", value: "1" },
  { label: "It is established", value: "2" },
  { label: "Many desktop", value: "3" },
];

return (
   <TkDropdown
      options={options}
      onTkItemClick={(e: any) => {
        alert(\`\${e.detail.label} has been clicked\`);
      }}
    >
      <TkButton
        label="Item Click Example"
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
const handleItemClick=(e)=>{
alert(\`\${e.detail.label} has been clicked\`);
}
</script>

<template>
  <div>
    <TkDropdown :options.prop="options"
    @tkItemClick="handleItemClick"
    >
      <TkButton
        label="Item Click Example"
        icon="keyboard_arrow_down"
        icon-position="right"
        slot="trigger"
      />
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

export default ItemClick;
