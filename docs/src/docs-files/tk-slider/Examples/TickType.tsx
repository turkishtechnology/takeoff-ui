import React, { useState } from 'react';
import { TkSlider, TkRadioGroup, TkRadio } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const TickType = () => {
  const [type, setType] = useState<'ticks' | 'labels'>('ticks');
  const [value, setValue] = useState<number>(30);

  const typeOptions = [
    { label: 'Ticks', value: 'ticks' },
    { label: 'Labels', value: 'labels' },
  ];

  const reactCode = `<TkSlider
  min={0}
  max={100}
  step={10}
  label="Slider"
  type={${type}}
/>`;

  const vueCode = `<TkSlider 
  :min="0" 
  :max="100" 
  :step="10" 
  label="Slider" 
  :type="type" 
/>`;

  const angularCode = `<tk-slider
  [min]="0"
  [max]="100"
  [step]="10"
  label="Slider"
  type="ticks">
</tk-slider>`;

  const demo = (
    <>
      <TkRadioGroup value={type} onTkChange={(e) => setType(e.detail)}>
        {typeOptions.map((opt, i) => (
          <TkRadio key={i} label={opt.label} value={opt.value} />
        ))}
      </TkRadioGroup>
      <br />
      <TkSlider
        min={0}
        max={100}
        step={10}
        label="Slider"
        type={type}
        value={value}
        onTkChange={(e) => {
          if (typeof e.detail === 'number') {
            setValue(e.detail);
          }
        }}
      />
    </>
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

export default TickType;
