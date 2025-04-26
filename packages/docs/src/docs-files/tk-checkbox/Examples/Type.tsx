import { TkCheckbox } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Type = () => {
  const reactCode = `<TkCheckbox label="default type" />
<TkCheckbox label="card type" type="card" />`;

  const vueCode = `<TkCheckbox label="default type" />
<TkCheckbox label="card type" type="card" />`;

  const demo = (
    <div className="flex gap-4 flex-wrap justify-center items-center">
      <TkCheckbox label="default type" />
      <TkCheckbox label="card type" type="card" />
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

export default Type;
