import { TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Size = () => {
  const reactCode = `<TkButton variant="primary" size="small" label="small button" />
<TkButton variant="primary" size="base" label="base button" />
<TkButton variant="primary" size="large" label="large button" />`;

  const vueCode = `<TkButton variant="primary" size="small" label="small button" />
<TkButton variant="primary" size="base" label="base button" />
<TkButton variant="primary" size="large" label="large button" />`;

  const demo = (
    <div className="flex justify-center items-end flex-wrap gap-2">
      <TkButton variant="primary" size="small" label="small button" />
      <TkButton variant="primary" size="base" label="base button" />
      <TkButton variant="primary" size="large" label="large button" />
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

export default Size;
