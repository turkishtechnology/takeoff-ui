import { TkBadge } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Icon = () => {
  const reactCode = `<TkBadge
  variant="primary"
  size="large"
  type="filled"
  icon="flight"
  label="primary"
/>
<TkBadge
  variant="primary"
  size="large"
  type="filled"
  icon="flight"
  iconPosition="right"
  label="primary"
/>`;

  const vueCode = `<TkBadge
  variant="primary"
  size="large"
  type="filled"
  icon="flight"
  label="primary"
/>
<TkBadge
  variant="primary"
  size="large"
  type="filled"
  icon="flight"
  iconPosition="right"
  label="primary"
/>`;

  const angularCode = `<tk-badge
  variant="primary"
  size="large"
  type="filled"
  icon="flight"
  label="primary"
/>
<tk-badge
  variant="primary"
  size="large"
  type="filled"
  icon="flight"
  iconPosition="right"
  label="primary"
/>`;

  const demo = (
    <div className="flex flex-col items-center justify-center gap-2">
      <TkBadge
        variant="primary"
        size="large"
        type="filled"
        icon="flight"
        label="primary"
      />
      <TkBadge
        variant="primary"
        size="large"
        type="filled"
        icon="flight"
        iconPosition="right"
        label="primary"
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
