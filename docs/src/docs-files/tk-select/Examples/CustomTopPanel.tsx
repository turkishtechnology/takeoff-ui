import { TkSelect, TkButton, TkIcon } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';
import { dividerClasses } from '@mui/material';

const CustomTopPanel = () => {
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
  onTkChange={(e) => setValue(e.detail)}
/>`;

  const vueCode = `<TkSelect
  label="Select With Top Panel"
  :options.prop="[
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
    { value: 'other', label: 'Other' },
  ]"
  :panelTopHtml.prop="() => {
    return \`<div style="display: flex; align-items:center; gap:4px; padding: 10px 10px; border: 1px solid var(--border-light, #E1E4EA); border-radius: 8px;">
              <tk-icon icon="person"></tk-icon>
              <span style="font-size:14px">Choose your gender</span>
            </div>\`;
  }"
  v-model="value"
/>`;

  const [value, setValue] = useState();

  const demo = (
    <div className="max-w-[215px]">
      <TkSelect
        label="Select With Top Panel"
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
        onTkChange={e => setValue(e.detail)}
      />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default CustomTopPanel;
