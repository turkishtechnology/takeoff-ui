import { TkSpinner } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Orientation = () => {
  const reactCode = `<TkSpinner orientation="horizontal" label="Horizontal" />
  <TkSpinner orientation="vertical" label="Vertical" />`;
  const vueCode = `<TkSpinner orientation="horizontal" label="Horizontal" />
  <TkSpinner orientation="vertical" label="Vertical" />`;

  const demo = (
    <div className="flex justify-center items-start gap-4 flex-wrap">
      <TkSpinner orientation="vertical" label="Vertical" />
      <TkSpinner orientation="horizontal" label="Horizontal" />
    </div>
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
