import { TkTimeline } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Basic = () => {
  const items = [
    { title: 'First Commit', date: '07.07.2024' },
    { title: 'Prod', date: '16.12.2024', description: 'Live release' },
    {
      title: 'Open Source',
      date: '12.04.2025',
      description: 'Open source release',
    },
  ];
  const reactCode = `<TkTimeline items={items} />`;

  const vueCode = `<TkTimeline :items.prop="items" />`;

  const angularCode = `<tk-timeline [items]="items" />`;

  const demo = (
    <div className=" my-6">
      <TkTimeline items={items} />
    </div>
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={angularCode}
    ></FeatureDemo>
  );
};

export default Basic;
