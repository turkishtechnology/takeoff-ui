import { TkSlider } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Hint = () => {
  const reactCode = `<TkSlider 
  label="Slider with Hint" 
  hint="This is a hint" 
  />`;
  const vueCode = `<TkSlider 
  label="Slider with Hint" 
  hint="This is a hint" 
  />`;

  const angularCode = `<tk-slider
  label="Slider with Hint"
  hint="This is a hint">
</tk-slider>`;

  const [value, setValue] = useState(20);

  const demo = (
    <TkSlider
      label="Slider with Hint"
      hint="This is a hint"
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

export default Hint;
