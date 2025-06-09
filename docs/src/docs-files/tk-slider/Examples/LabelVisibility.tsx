import { TkSlider } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const LabelVisibility = () => {
  const reactCode = `<TkSlider 
  value={30}
  label="Slider" 
  rangeVisibility={false} 
  />`;
  const vueCode = `<TkSlider 
  :value="30"  
  label="Slider" 
  :range-visibility="false" 
  />`;

  const angularCode = `<tk-slider
  label="Slider"
  [value]="30"
  [rangeVisibility]="false">
</tk-slider>`;

  const [value, setValue] = useState(30);

  const demo = (
    <TkSlider
      min={0}
      max={100}
      label="Slider"
      rangeVisibility={false}
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

export default LabelVisibility;
