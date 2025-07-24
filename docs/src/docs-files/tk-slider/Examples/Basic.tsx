import React, { useState } from 'react';
import { TkSlider } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Basic = () => {
  const [value, setValue] = useState(30);

  const demo = (
    <TkSlider
      min={0}
      max={100}
      label="Basic Slider"
      value={value}
      onTkChange={e => {
        if (typeof e.detail === 'number') {
          setValue(e.detail);
        }
      }}
    />
  );

  const reactCode = `<TkSlider
  min={0}
  max={100}
  label="Basic Slider"
  value={30}
/>`;

  const vueCode = `<TkSlider
  :min="0"
  :max="100"
  label="Basic Slider"
  :value="30"
/>`;

  const angularCode = `<tk-slider
  [min]="0"
  [max]="100"
  label="Basic Slider"
  [value]="30">
</tk-slider>`;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode} />;
};

export default Basic;
