import { TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Type = () => {
  const reactCode = `<TkButton variant="primary" label="Primary" type="filled" />
<TkButton variant="primary" label="Primary" type="outlined" />
<TkButton variant="primary" label="Primary" type="text" />`;

  const vueCode = `<TkButton variant="primary" label="Primary" type="filled" />
<TkButton variant="primary" label="Primary" type="outlined" />
<TkButton variant="primary" label="Primary" type="text" />`;

  const angularCode = `<tk-button variant="primary" label="Primary" type="filled" />
<tk-button variant="primary" label="Primary" type="outlined" />
<tk-button variant="primary" label="Primary" type="text" />`;

  const demo = (
    <div className="flex justify-center flex-wrap gap-2">
      <TkButton variant="primary" label="Primary" type="filled" />
      <TkButton variant="primary" label="Primary" type="outlined" />
      <TkButton variant="primary" label="Primary" type="text" />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Type;
