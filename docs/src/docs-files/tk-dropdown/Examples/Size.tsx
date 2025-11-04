import { TkButton, TkDropdown } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';


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
        <TkButton label="Select" slot="trigger"/>
    </TkDropdown>
    <TkDropdown options={options} size="base">
        <TkButton label="Select" slot="trigger"/>
    </TkDropdown>
    <TkDropdown options={options} size="large">
        <TkButton label="Select" slot="trigger"/>
    </TkDropdown>;`;



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
            <tk-dropdown :options.prop="options" size="small">
            <tk-button label="Select" slot="trigger"/>
            </tk-dropdown>
            <tk-dropdown :options.prop="options" size="base">
            <tk-button label="Select" slot="trigger"/>
            </tk-dropdown>
            <tk-dropdown :options.prop="options" size="large">
            <tk-button label="Select" slot="trigger"/>
            </tk-dropdown>
        </div>
        </template>`;

  const angularCode = `<tk-dropdown [options]="[
        { label: 'Lorem Ipsum', value: '1' },
        { label: 'It is established', value: '2' },
        { label: 'Many desktop', value: '3' }
    ]" size="small">
        <tk-button label="Select" slot="trigger"/>
    </tk-dropdown>
    
    <tk-dropdown [options]="[
        { label: 'Lorem Ipsum', value: '1' },
        { label: 'It is established', value: '2' },
        { label: 'Many desktop', value: '3' }
    ]" size="base">
        <tk-button label="Select" slot="trigger"/>
    </tk-dropdown>
    
    <tk-dropdown [options]="[
        { label: 'Lorem Ipsum', value: '1' },
        { label: 'It is established', value: '2' },
        { label: 'Many desktop', value: '3' }
    ]" size="large">
        <tk-button label="Select" slot="trigger"/>
    </tk-dropdown>`;

    const demo = (
      <div className="flex justify-center flex-wrap items-end gap-2">
        <TkDropdown options={options} size="small">
          <TkButton label="Select" icon="keyboard_arrow_down" iconPosition="right" slot="trigger" size="small"/>
        </TkDropdown>
        <TkDropdown options={options} size="base">
          <TkButton label="Select" icon="keyboard_arrow_down" iconPosition="right" slot="trigger" size="base"/>
        </TkDropdown>
        <TkDropdown options={options} size="large">
          <TkButton label="Select" icon="keyboard_arrow_down" iconPosition="right" slot="trigger" size="large"/>
        </TkDropdown>
      </div>
    );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Size;