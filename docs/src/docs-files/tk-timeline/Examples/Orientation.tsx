import { TkRadio, TkTimeline, TkRadioGroup } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Orientation = () => {
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>(
    'vertical',
  );
  const orientations = [
    { label: 'Vertical', value: 'vertical' },
    { label: 'Horizontal', value: 'horizontal' },
  ];

  const handleOrientationChange = (event) => {
    setOrientation(event.detail);
  };
  const items = [
    { title: 'First Commit', date: '07.07.2024' },
    { title: 'Prod', date: '16.12.2024', description: 'Live release' },
    {
      title: 'Open Source',
      date: '12.04.2025',
      description: 'Open source release',
    },
  ];
  const reactCode = `<TkTimeline items={items} />
<TkTimeline items={items} orientation="vertical" />`;

  const vueCode = `<TkTimeline :items.prop="items" />
<TkTimeline :items.prop="items" orientation="vertical" />`;

  const demo = (
    <>
      <div style={{ overflow: 'overlay' }} className="mb-4">
        <TkRadioGroup value={orientation} onTkChange={handleOrientationChange}>
          {orientations.map((radio, index) => {
            return (
              <TkRadio label={radio.label} key={index} value={radio.value} />
            );
          })}
        </TkRadioGroup>
      </div>

      <div className="pb-4">
        <TkTimeline items={items} orientation={orientation} />
      </div>
    </>
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={''}
    ></FeatureDemo>
  );
};

export default Orientation;
