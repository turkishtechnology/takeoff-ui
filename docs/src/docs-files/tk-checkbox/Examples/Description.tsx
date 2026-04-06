import { TkCheckbox } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Description = () => {
  const reactCode = `<TkCheckbox label="example label" description="example description" />`;

  const vueCode = `<TkCheckbox label="example label" description="example description" />`;

  const angularCode = `<tk-checkbox label="example label" description="example description" />`;

  const demo = (
    <div className="flex gap-4 flex-wrap items-center">
      <TkCheckbox label="example label" description="example description" />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Description;
