import { TkBadge } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Type = () => {
  const reactCode = `<TkBadge variant="primary" type="filled" label="primary" />
<TkBadge variant="primary" type="filledlight" label="primary" />
<TkBadge variant="primary" type="outlined" label="primary" />
<TkBadge variant="primary" type="text" label="primary" />`;

  const vueCode = `<TkBadge variant="primary" type="filled" label="primary" />
<TkBadge variant="primary" type="filledlight" label="primary" />
<TkBadge variant="primary" type="outlined" label="primary" />
<TkBadge variant="primary" type="text" label="primary" />`;

  const demo = (
    <div className="flex justify-center flex-wrap gap-2">
      <TkBadge variant="primary" type="filled" label="primary" />
      <TkBadge variant="primary" type="filledlight" label="primary" />
      <TkBadge variant="primary" type="outlined" label="primary" />
      <TkBadge variant="primary" type="text" label="primary" />
    </div>
  );

  return (
    <>
      <FeatureDemo
        demo={demo}
        reactCode={reactCode}
        vueCode={vueCode}
        angularCode={''}
      ></FeatureDemo>
    </>
  );
};

export default Type;
