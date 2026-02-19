import { TkSelect } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const PanelHeader = () => {
  const reactCode = `<TkSelect
  label="Select With Top Panel"
  options={[
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "other", label: "Other" },
  ]}
  panelTopHtml={() => {
    return \`<div style="display: flex; align-items:center; gap:4px; padding: 10px 10px; border: 1px solid var(--border-light, #E1E4EA); border-radius: 8px;">
              <tk-icon icon="person"></tk-icon>
              <span style="font-size:14px">Choose your gender</span>
            </div>\`;
  }}
  value={value}
  optionValueKey="value"
  onTkChange={(e) => setValue(e.detail)}
/>
<TkSelect
  label="Button in Panel Header"
  options={[
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
    { value: 'other', label: 'Other' },
  ]}
  panelTopHtml={() => {
    const div: HTMLDivElement = document.createElement('div');
    const tkButton: HTMLTkButtonElement = document.createElement('tk-button');
    tkButton.label = 'Set Male';
    tkButton.addEventListener('tk-click', () => {
      setSecondValue('male');
    });
    div.style.justifySelf = 'center';
    div.style.padding = '2px';
    div.appendChild(tkButton);
    return div;
  }}
  value={secondValue}
  optionValueKey="value"
  onTkChange={e => setSecondValue(e.detail)}
/>`;

  const vueCode = `<TkSelect
  label="Select With Top Panel"
  :options="[
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
    { value: 'other', label: 'Other' },
  ]"
  :panelTopHtml="() => {
    return \`<div style="display: flex; align-items:center; gap:4px; padding: 10px 10px; border: 1px solid var(--border-light, #E1E4EA); border-radius: 8px;">
              <tk-icon icon="person"></tk-icon>
              <span style="font-size:14px">Choose your gender</span>
            </div>\`;
  }"
  v-model="value"
/>
<TkSelect
  label="Button in Panel Header"
  :options="[
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
    { value: 'other', label: 'Other' },
  ]"
  :panelTopHtml="() => {
    const div: HTMLDivElement = document.createElement('div');
    const tkButton: HTMLTkButtonElement = document.createElement('tk-button');
    tkButton.label = 'Set Male';
    tkButton.addEventListener('tk-click', () => {
      setSecondValue('male');
    });
    div.style.justifySelf = 'center';
    div.style.padding = '2px';
    div.appendChild(tkButton);
    return div;
  }"
  v-model="secondValue"
  optionValueKey="value"

/>`;

  const [value, setValue] = useState();
  const [secondValue, setSecondValue] = useState<string | undefined>();

  const demo = (
    <div className="max-w-[215px]">
      <TkSelect
        label="String in Panel Header"
        options={[
          { value: 'female', label: 'Female' },
          { value: 'male', label: 'Male' },
          { value: 'other', label: 'Other' },
        ]}
        panelTopHtml={() => {
          return `<div style="display: flex; align-items:center; gap:4px; padding: 10px 10px; border: 1px solid var(--border-light, #E1E4EA); border-radius: 8px;">
              <tk-icon icon="person"></tk-icon>
              <span style="font-size:14px">Choose your gender</span>
            </div>`;
        }}
        value={value}
        optionValueKey="value"
        onTkChange={e => setValue(e.detail)}
      />
      <TkSelect
        label="Button in Panel Header"
        options={[
          { value: 'female', label: 'Female' },
          { value: 'male', label: 'Male' },
          { value: 'other', label: 'Other' },
        ]}
        panelTopHtml={() => {
          const div: HTMLDivElement = document.createElement('div');
          const tkButton: HTMLTkButtonElement = document.createElement('tk-button');
          tkButton.label = 'Set Male';
          tkButton.addEventListener('tk-click', () => {
            setSecondValue('male');
          });
          div.style.justifySelf = 'center';
          div.style.padding = '2px';
          div.appendChild(tkButton);
          return div;
        }}
        value={secondValue}
        optionValueKey="value"
        onTkChange={e => setSecondValue(e.detail)}
      />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default PanelHeader;
