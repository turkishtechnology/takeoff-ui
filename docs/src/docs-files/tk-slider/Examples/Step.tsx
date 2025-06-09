import { TkSlider } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Step = () => {
  const reactCode = `<TkSlider 
  min={0} 
  max={100} 
  step={10} 
  label="Step Slider" 
  />`;
  const vueCode = `<TkSlider 
  :min="0" 
  :max="100" 
  :step="10" 
  label="Step Slider" 
  />`;

  const angularCode = `<tk-slider
  [min]="0"
  [max]="100"
  [step]="10"
  label="Step Slider">
</tk-slider>`;

  const [value, setValue] = useState(20);

  const demo = (
    <TkSlider
      min={0}
      max={100}
      step={10}
      label="Step Slider"
      value={value}
      onTkChange={(e) => {
        if (typeof e.detail === 'number') {
          setValue(e.detail);
        }
      }}
    />
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={angularCode}
    />
  );
};

export default Step;
