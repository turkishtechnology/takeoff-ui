import { TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';
import { IIconOptions, IMultiIconOptions } from '@takeoff-ui/core';

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
/>
<TkButton
  variant="primary"
  size="large"
  label="multiple icons"
  icon={{
    left: { name: 'key', color: 'pink' },
    right: { name: 'check_circle', color: 'pink', fill: true }
  }}
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
/>
<TkButton
  variant="primary"
  size="large\"
  label="multiple icons"
  :icon="{ left: { name: 'key', color: 'pink' }, right: { name: 'check_circle', color: 'pink', fill: true } }"
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
/>
<tk-button
  variant="primary"
  size="large"
  label="multiple icons"
  [icon]="{ left: { name: 'key', color: 'pink' }, right: { name: 'check_circle', color: 'pink', fill: true } }"
></tk-button>`;

  const demo = (
    <div className="flex justify-center items-end flex-wrap gap-2">
      <TkButton variant="primary" size="large" icon="flight" label="left icon" />
      <TkButton variant="primary" size="large" icon="flight" iconPosition="right" label="right icon" />
      <TkButton
        variant="primary"
        size="large"
        iconPosition="right"
        label="multiple icons"
        icon={
          {
            left: { name: 'key', color: 'pink' } as IIconOptions,
            right: { name: 'check_circle', color: 'pink', fill: true } as IIconOptions,
          } as IMultiIconOptions
        }
      />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Icon;
