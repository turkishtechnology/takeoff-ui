import { TkChips } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Type = () => {
  const reactCode = `<TkChips variant="primary" type="filled" label="primary" />
<TkChips variant="primary" type="filledlight" label="primary" />
<TkChips variant="primary" type="outlined" label="primary" />`;

  const vueCode = `<TkChips variant="primary" type="filled" label="primary" />
<TkChips variant="primary" type="filledlight" label="primary" />
<TkChips variant="primary" type="outlined" label="primary" />`;

  const demo = (
    <div className="flex gap-2 flex-wrap justify-center">
      <TkChips variant="primary" type="filled" label="primary" />
      <TkChips variant="primary" type="filledlight" label="primary" />
      <TkChips variant="primary" type="outlined" label="primary" />
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
