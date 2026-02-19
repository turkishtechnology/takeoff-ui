import React, { useState } from 'react';
import { TkSlider } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Range = () => {
  const [value, setValue] = useState<[number, number]>([20, 80]);

  const reactCode = `<TkSlider
  range
  min={0}
  max={100}
  label="Range Slider"
  value={[20, 80]}
  onTkChange={(e) => setValue(e.detail)}
/>`;

  const vueCode = `<TkSlider
  :range="true"
  :min="0"
  :max="100"
  label="Range Slider"
  :value="[20, 80]"
  @tk-change="(val) => update(val)"
/>`;

  const angularCode = `<tk-slider
  [range]="true"
  [min]="0"
  [max]="100"
  label="Range Slider"
  [value]="[20, 80]"
  (tkChange)="onChange($event)">
</tk-slider>`;

  const demo = (
    <TkSlider
      range={true}
      min={0}
      max={100}
      label="Range Slider"
      value={value}
      onTkChange={e => {
        if (Array.isArray(e.detail) && e.detail.length === 2) {
          setValue([e.detail[0], e.detail[1]]);
        }
      }}
    />
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode} />;
};

export default Range;
