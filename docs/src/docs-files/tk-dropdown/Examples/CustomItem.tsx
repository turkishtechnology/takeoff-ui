import { TkButton, TkDropdown } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Example = () => {
  return (
    <TkDropdown
      optionLabelKey="name"
      optionValueKey="code"
      options={[
        {
          code: 'SAW',
          name: 'Sabiha Gökçen Havalimanı',
        },
        { code: 'ESB', name: 'Esenboğa Havalimanı' },
        { code: 'AYT', name: 'Antalya Havalimanı' },
      ]}
      optionHtml={(item: { name: any; code: any }) => {
        return `<div class="flex justify-between gap-4">
                      <div style="font-weight: bold;">${item.name}</div>
                      <div style="color: var(--primary-base)">${item.code}</div>
                  </div>`;
      }}
    >
      <TkButton
        label="Custom Item Example"
        icon="keyboard_arrow_down"
        iconPosition="right"
        slot="trigger"
      />
    </TkDropdown>
  );
};

const CustomItem = () => {
  const reactCode = ` <TkDropdown
      optionLabelKey="name"
      optionValueKey="code"
      options={[
        {
          code: "SAW",
          name: "Sabiha Gökçen Havalimanı",
        },
        { code: "ESB", name: "Esenboğa Havalimanı" },
        { code: "AYT", name: "Antalya Havalimanı" },
      ]}
      optionHtml={(item: { name: any; code: any }) => {
        return \`<div class="flex justify-between gap-4">
                      <div style="font-weight: bold;">\${item.name}</div>
                      <div style="color: var(--primary-base)">\${item.code}</div>
                  </div>\`;
      }}
    >
      <TkButton
        label="Custom Item Example"
        icon="keyboard_arrow_down"
        iconPosition="right"
        slot="trigger"
      />
    </TkDropdown>`;

  const vueCode = ` <TkDropdown
    optionLabelKey="name" 
    optionValueKey="code" 
    :options.prop="[
    { code: 'SAW', name: 'Sabiha Gökçen Havalimanı'},
    { code: 'ESB', name: 'Esenboğa Havalimanı'},
    { code: 'AYT', name: 'Antalya Havalimanı'},
  ]"
  :optionHtml.prop="(item) => {
     return \`<div class='flex justify-between gap-4'>
                      <div style='font-weight: bold;'>\${item.name}</div>
                      <div style='color: var(--primary-base)'>\${item.code}</div>
                  </div>\`;
      }"
>
      <TkButton
        label="Custom Item Example"
        icon="keyboard_arrow_down"
        icon-position="right"
        slot="trigger"
      />
</TkDropdown>`;

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

export default CustomItem;
