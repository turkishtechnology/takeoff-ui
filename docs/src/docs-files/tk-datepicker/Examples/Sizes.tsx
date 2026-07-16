import React, { useState } from 'react';
import { TkDatepicker, TkRadio, TkRadioGroup } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const sizeOptions = ['small', 'base', 'large'] as const;

const Sizes = () => {
  const [size, setSize] = useState<(typeof sizeOptions)[number]>('base');

  const reactCode = `<TkDatepicker size="${size}" />`;

  const vueCode = `<TkDatepicker size="${size}" />`;

  const angularCode = `<tk-datepicker size="${size}"></tk-datepicker>`;

  const demo = (
    <div className="flex flex-col items-center gap-4 overflow-auto">
      <TkRadioGroup label="Size" value={size} onTkChange={event => setSize(event.detail)}>
        {sizeOptions.map(option => (
          <TkRadio key={option} label={option.charAt(0).toUpperCase() + option.slice(1)} value={option} />
        ))}
      </TkRadioGroup>
      <TkDatepicker size={size} />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Sizes;
