import React from 'react';
import { TkSlider } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const WithAsterisk = () => {
  const demo = <TkSlider label="Required Slider" value={60} showAsterisk />;

  const reactCode = `<TkSlider
  label="Required Slider"
  value={60}
  showAsterisk
/>`;

  const vueCode = `<TkSlider
  label="Required Slider"
  :value="60"
  :showAsterisk="true"
/>`;

  const angularCode = `<tk-slider
  label="Required Slider"
  [value]="60"
  [showAsterisk]="true">
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

export default WithAsterisk;
