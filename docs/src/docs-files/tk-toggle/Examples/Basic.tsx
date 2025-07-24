import { TkToggle } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Basic = () => {
  const reactCode = `<TkToggle />`;

  const vueCode = `<TkToggle />`;

  const angularCode = `<tk-toggle />`;

  const demo = (
    <div className="flex justify-center">
      <TkToggle />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Basic;
