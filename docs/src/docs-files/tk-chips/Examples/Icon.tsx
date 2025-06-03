import { TkChips } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Icon = () => {
  const reactCode = `<TkChips
  variant="primary"
  size="large"
  icon="flight"
  label="primary"
  removable
/>`;

  const vueCode = `<TkChips
  variant="primary"
  size="large"
  icon="flight"
  label="primary"
  removable
/>`;

  const angularCode = `<tk-chips
  variant="primary"
  size="large"
  icon="flight"
  label="primary"
  removable
/>`;

  const demo = (
    <div>
      <TkChips
        variant="primary"
        size="large"
        icon="flight"
        label="primary"
        removable
      />
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

export default Icon;
