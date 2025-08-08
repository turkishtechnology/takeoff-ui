import { TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Icon = () => {
  const reactCode = `<TkButton
  variant="primary"
  size="large"
  icon="flight"
  label="left icon"
/>
<TkButton
  variant="primary"
  size="large"
  icon="flight"
  iconPosition="right"
  label="right icon"
/>`;

  const vueCode = `<TkButton
  variant="primary"
  size="large"
  icon="flight"
  label="left icon"
/>
<TkButton
  variant="primary"
  size="large"
  icon="flight"
  iconPosition="right"
  label="right icon"
/>`;

  const angularCode = `<tk-button
  variant="primary"
  size="large"
  icon="flight"
  label="left icon"
/>
<tk-button
  variant="primary"
  size="large"
  icon="flight"
  iconPosition="right"
  label="right icon"
/>`;

  const demo = (
    <div className="flex justify-center items-end flex-wrap gap-2">
      <TkButton variant="primary" size="large" icon="flight" label="left icon" />
      <TkButton variant="primary" size="large" icon="flight" iconPosition="right" label="right icon" />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Icon;
