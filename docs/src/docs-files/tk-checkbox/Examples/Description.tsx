import { TkCheckbox } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Description = () => {
  const reactCode = `<TkCheckbox description="example description" />`;

  const vueCode = `<TkCheckbox description="example description" />`;

  const angularCode = `<tk-checkbox description="example description" />`;

  const demo = (
    <div className="flex gap-4 flex-wrap items-center">
      <TkCheckbox description="example description" />
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

export default Description;
