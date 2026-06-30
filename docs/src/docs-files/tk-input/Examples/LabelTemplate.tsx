import { TkInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const LabelTemplate = () => {
  const reactCode = `const labelTemplate = (label) => \`
  <span style="display: inline-flex; align-items: center; gap: 8px;">
    <span
      class="material-symbols-outlined"
      style="color: var(--states-info-base); font-size: 16px;"
    >
      flight_takeoff
    </span>
    <span>\${label}</span>
    <span
      style="
        border: 1px solid var(--states-info-base);
        border-radius: 999px;
        color: var(--states-info-base);
        font-size: 11px;
        line-height: 16px;
        padding: 0 6px;
      "
    >
      Optional
    </span>
  </span>
\`;

<TkInput
  label="Flight note"
  placeholder="Window seat, meal preference..."
  hint="This information helps the crew prepare your trip."
  labelHtml={labelTemplate}
  value={value}
  onTkChange={(e) => setValue(e.detail)}
/>`;

  const vueCode = `<script setup>
const labelTemplate = (label) => \`
  <span style="display: inline-flex; align-items: center; gap: 8px;">
    <span
      class="material-symbols-outlined"
      style="color: var(--states-info-base); font-size: 16px;"
    >
      flight_takeoff
    </span>
    <span>\${label}</span>
    <span
      style="
        border: 1px solid var(--states-info-base);
        border-radius: 999px;
        color: var(--states-info-base);
        font-size: 11px;
        line-height: 16px;
        padding: 0 6px;
      "
    >
      Optional
    </span>
  </span>
\`;
</script>

<TkInput
  label="Flight note"
  placeholder="Window seat, meal preference..."
  hint="This information helps the crew prepare your trip."
  :labelHtml="labelTemplate"
/>`;

  const angularCode = `labelTemplate = (label: string) => \`
  <span style="display: inline-flex; align-items: center; gap: 8px;">
    <span
      class="material-symbols-outlined"
      style="color: var(--states-info-base); font-size: 16px;"
    >
      flight_takeoff
    </span>
    <span>\${label}</span>
    <span
      style="
        border: 1px solid var(--states-info-base);
        border-radius: 999px;
        color: var(--states-info-base);
        font-size: 11px;
        line-height: 16px;
        padding: 0 6px;
      "
    >
      Optional
    </span>
  </span>
\`;

<tk-input
  label="Flight note"
  placeholder="Window seat, meal preference..."
  hint="This information helps the crew prepare your trip."
  [labelHtml]="labelTemplate"
></tk-input>`;

  const [value, setValue] = useState('');

  const labelTemplate = (label: string) => {
    return `
      <span style="display: inline-flex; align-items: center; gap: 8px;">
        <span
          class="material-symbols-outlined"
          style="color: var(--states-info-base); font-size: 16px;"
        >
          flight_takeoff
        </span>
        <span>${label}</span>
        <span
          style="
            border: 1px solid var(--states-info-base);
            border-radius: 999px;
            color: var(--states-info-base);
            font-size: 11px;
            line-height: 16px;
            padding: 0 6px;
          "
        >
          Optional
        </span>
      </span>
    `;
  };

  const demo = (
    <div className="max-w-[360px]">
      <TkInput
        label="Flight note"
        placeholder="Window seat, meal preference..."
        hint="This information helps the crew prepare your trip."
        labelHtml={labelTemplate}
        value={value}
        onTkChange={e => setValue(e.detail)}
      />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default LabelTemplate;
