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
      <TkButton label="Item Click Example" icon="keyboard_arrow_down" iconPosition="right" slot="trigger" />
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

  const vueCode = `const options = [
  { label: 'Lorem Ipsum', value: '1' },
  { label: 'It is established', value: '2' },
  { label: 'Many desktop', value: '3' },
];
const handleItemClick=(e)=>{
alert(\`\${e.detail.label} has been clicked\`);
}

<TkDropdown :options="options"
@tk-item-click="handleItemClick"
>
  <TkButton
    label="Item Click Example"
    icon="keyboard_arrow_down"
    :iconPosition="right"
    slot="trigger"
  />
</TkDropdown>`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default ItemClick;
