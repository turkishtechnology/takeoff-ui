import { TkSpinner } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Default = () => {
  const reactCode = `<TkSpinner />`;

  const vueCode = `<TkSpinner />`;

  const angularCode = `<tk-spinner />`;

  const demo = (
    <div className="flex justify-center gap-2">
      <TkSpinner />
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

export default Default;
