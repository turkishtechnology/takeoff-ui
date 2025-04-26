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

  const demo = (
    <div className="flex flex-col items-end justify-center gap-2">
      <TkBadge
        variant="verified"
        size="large"
        type="filledlight"
        icon="new_releases"
        label="verified"
      />
      <TkBadge
        variant="verified"
        size="large"
        type="filledlight"
        icon="new_releases"
        iconPosition="right"
        label="verified"
      />
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

export default Icon;
