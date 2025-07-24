import { TkSelect } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const CustomItem = () => {
  const reactCode = `<TkSelect
  label="Custom Item"
  optionLabelKey="name"
  optionValueKey="code"
  options={[
    {
      code: "SAW",
      name: "Sabiha Gökçen Havalimanı",
      country: "İstanbul",
    },
    { code: "ESB", name: "Esenboğa Havalimanı", country: "Ankara" },
    { code: "AYT", name: "Antalya Havalimanı", country: "Antalya" },
  ]}
  optionHtml={(item) => {
    return \`<div style="display: flex; flex-direction: column;">
                <div style="displaY: flex;justify-content: space-between;">
                    <div style="font-weight: bold;">\${item.name}</div>
                    <div style="color: var(--primary-base)">\${item.code}</div>
                </div>
                <div>\${item.country}</div>
            </div>\`;
  }}
  value={value}
  onTkChange={(e) => setValue(e.detail)}
/>`;

  const vueCode = `<TkSelect 
  label="Custom Item" 
  optionLabelKey="name" 
  optionValueKey="code" 
  :options.prop="[
    { code: 'SAW', name: 'Sabiha Gökçen Havalimanı', country: 'İstanbul' },
    { code: 'ESB', name: 'Esenboğa Havalimanı', country: 'Ankara' },
    { code: 'AYT', name: 'Antalya Havalimanı', country: 'Antalya' },
  ]" :optionHtml.prop="(item) => {
    return \`<div style='display: flex; flex-direction: column;'>
        <div style='display: flex;justify-content: space-between;'>
          <div style='font-weight: bold;'>\${item.name}</div>
          <div style='color: var(--primary-base)'>\${item.code}</div>
          </div>
          <div>\${item.country}</div>
        </div>\`;
    }"
  v-model="value"
/>
`;

  const [value, setValue] = useState();

  const demo = (
    <div className="max-w-[300px]">
      <TkSelect
        label="Custom Item"
        optionLabelKey="name"
        optionValueKey="code"
        options={[
          {
            code: 'SAW',
            name: 'Sabiha Gökçen Havalimanı',
            country: 'İstanbul',
          },
          { code: 'ESB', name: 'Esenboğa Havalimanı', country: 'Ankara' },
          { code: 'AYT', name: 'Antalya Havalimanı', country: 'Antalya' },
        ]}
        optionHtml={item => {
          return `<div style="display: flex; flex-direction: column;">
                      <div style="displaY: flex;justify-content: space-between;">
                          <div style="font-weight: bold;">${item.name}</div>
                          <div style="color: var(--primary-base)">${item.code}</div>
                      </div>
                      <div>${item.country}</div>
                  </div>`;
        }}
        value={value}
        onTkChange={e => setValue(e.detail)}
      />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default CustomItem;
