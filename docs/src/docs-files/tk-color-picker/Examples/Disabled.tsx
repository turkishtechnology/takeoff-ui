import React from 'react';
import { TkColorPicker } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Disabled = () => {
  const demo = (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-start">
      <TkColorPicker label="Disabled Picker" value="#717784" disabled />
      <TkColorPicker label="Required Field" value="#326FD1" showAsterisk />
    </div>
  );

  const reactCode = `{/* Disabled State */}
<TkColorPicker
  label="Disabled Picker"
  value="#717784"
  disabled
/>

{/* Required Field */}
<TkColorPicker
  label="Required Field"
  value="#326FD1"
  required
/>`;

  const vueCode = `<!-- Disabled State -->
<TkColorPicker
  label="Disabled Picker"
  value="#717784"
  disabled
/>

<!-- Required Field -->
<TkColorPicker
  label="Required Field"
  value="#326FD1"
  required
/>`;

  const angularCode = `<!-- Disabled State -->
<tk-color-picker
  label="Disabled Picker"
  value="#717784"
  disabled>
</tk-color-picker>

<!-- Required Field -->
<tk-color-picker
  label="Required Field"
  value="#326FD1"
  required>
</tk-color-picker>`;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode} />;
};

export default Disabled;
