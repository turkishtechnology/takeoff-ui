import React from 'react';
import { TkSlider } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Disabled = () => {
  const demo = (
    <TkSlider
      min={0}
      max={100}
      step={10}
      label="Disabled Slider"
      value={50}
      disabled
    />
  );

  const reactCode = `<TkSlider
  min={0}
  max={100}
  step={10}
  label="Disabled Slider"
  value={50}
  disabled
/>`;

  const vueCode = `<TkSlider
  :min="0"
  :max="100"
  :step="10"
  label="Disabled Slider"
  :value="50"
  :disabled="true"
/>`;

  const angularCode = `<tk-slider
  [min]="0"
  [max]="100"
  [step]="10"
  label="Disabled Slider"
  [value]="50"
  [disabled]="true">
</tk-slider>`;

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={angularCode}
    />
  );
};

export default Disabled;
