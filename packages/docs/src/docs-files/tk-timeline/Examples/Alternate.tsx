import { TkTimeline, TkCheckbox } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useEffect, useState } from 'react';

const Alternate = () => {
  const items = [
    { title: 'First Commit', date: '07.07.2024' },
    { title: 'Prod', date: '16.12.2024', description: 'Live release' },
    {
      title: 'Open Source',
      date: '12.04.2025',
      description: 'Open source release',
    },
  ];
  const [alternate, setAlternate] = useState(true);
  const reactCode = `<TkTimeline items={items} />
<TkTimeline items={items} alternate={false} />`;

  const vueCode = `<TkTimeline items.prop="items" />
<TkTimeline :items.prop="items" :alternate="false"/>`;

  const demo = (
    <>
      <div className="mb-4 flex gap-2 flex-wrap w-full">
        <TkCheckbox
          name="alternate"
          value={alternate}
          onTkChange={() => setAlternate((prevState) => !prevState)}
          label="Alternate"
        />
      </div>
      <div className="pb-6">
        <TkTimeline items={items} alternate={alternate} />
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

export default Alternate;
