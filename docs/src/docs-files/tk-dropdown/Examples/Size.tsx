import { TkButton, TkDropdown } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const options = [
  { label: 'Lorem Ipsum', value: '1' },
  { label: 'It is established', value: '2' },
  { label: 'Many desktop', value: '3' },
];

const Size = () => {
  const reactCode = `const options = [
    { label: "Lorem Ipsum", value: "1" },
    { label: "It is established", value: "2" },
    { label: "Many desktop", value: "3" },
    ];

    <TkDropdown options={options} size="small">
        <TkButton label="Small" icon="keyboard_arrow_down" iconPosition="right" slot="trigger" size="small" />
    </TkDropdown>
    <TkDropdown options={options} size="base">
        <TkButton label="Base" icon="keyboard_arrow_down" iconPosition="right" slot="trigger" size="base" />
    </TkDropdown>
    <TkDropdown options={options} size="large">
        <TkButton label="Large" icon="keyboard_arrow_down" iconPosition="right" slot="trigger" size="large" />
    </TkDropdown>;`;

  const vueCode = `const options = [
{ label: 'Lorem Ipsum', value: '1' },
{ label: 'It is established', value: '2' },
{ label: 'Many desktop', value: '3' },
];

<TkDropdown :options="options" size="small">
<TkButton label="Small" icon="keyboard_arrow_down" :iconPosition="right" slot="trigger" size="small" />
</TkDropdown>
<TkDropdown :options="options" size="base">
<TkButton label="Base" icon="keyboard_arrow_down" :iconPosition="right" slot="trigger" size="base" />
</TkDropdown>
<TkDropdown :options="options" size="large">
<TkButton label="Large" icon="keyboard_arrow_down" :iconPosition="right" slot="trigger" size="large" />
</TkDropdown>`;

  const angularCode = `options = [
    { label: 'Lorem Ipsum', value: '1' },
    { label: 'It is established', value: '2' },
    { label: 'Many desktop', value: '3' }
];

<tk-dropdown [options]="options" size="small">
    <tk-button label="Small" icon="keyboard_arrow_down" iconPosition="right" slot="trigger" size="small" />
</tk-dropdown>

<tk-dropdown [options]="options" size="base">
    <tk-button label="Base" icon="keyboard_arrow_down" iconPosition="right" slot="trigger" size="base" />
</tk-dropdown>

<tk-dropdown [options]="options" size="large">
    <tk-button label="Large" icon="keyboard_arrow_down" iconPosition="right" slot="trigger" size="large" />
</tk-dropdown>`;

  const demo = (
    <div className="flex justify-center flex-wrap items-end gap-2">
      <TkDropdown options={options} size="small">
        <TkButton label="Small" icon="keyboard_arrow_down" iconPosition="right" slot="trigger" size="small" />
      </TkDropdown>
      <TkDropdown options={options} size="base">
        <TkButton label="Base" icon="keyboard_arrow_down" iconPosition="right" slot="trigger" size="base" />
      </TkDropdown>
      <TkDropdown options={options} size="large">
        <TkButton label="Large" icon="keyboard_arrow_down" iconPosition="right" slot="trigger" size="large" />
      </TkDropdown>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Size;
