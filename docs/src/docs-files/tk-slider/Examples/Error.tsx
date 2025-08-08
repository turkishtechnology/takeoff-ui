import { TkSlider } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Error = () => {
  const reactCode = `<TkSlider 
  label="Slider with Error" 
  invalid={true} 
  error="Invalid value" />`;
  const vueCode = `<TkSlider 
  label="Slider with Error" 
  :invalid="true" 
  error="Invalid value" />`;

  const angularCode = `<tk-slider
  label="Slider with Error"
  [invalid]="true"
  error="Invalid value">
</tk-slider>`;

  const [value, setValue] = useState(20);

  const demo = (
    <TkSlider
      label="Slider with Error"
      invalid={true}
      error="Invalid value"
      value={value}
      onTkChange={e => {
        if (typeof e.detail === 'number') {
          setValue(e.detail);
        }
      }}
    />
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode} />;
};

export default Error;
