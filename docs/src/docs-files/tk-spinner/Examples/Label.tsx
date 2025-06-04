import { TkSpinner } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Default = () => {
  const reactCode = `<TkSpinner type="three-dots" label="Loading..." />`;

  const vueCode = `<TkSpinner type="three-dots" label="Loading..." />`;

  const angularCode = `<tk-spinner type="three-dots" label="Loading..." />`;

  const demo = (
    <div className="flex justify-center gap-2">
      <TkSpinner type="three-dots" label="Loading..." />
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
