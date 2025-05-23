import { TkBadge } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Size = () => {
  const reactCode = `<TkBadge variant="primary" size="large" type="filledlight" label="primary" />
<TkBadge variant="primary" size="base" type="filledlight" label="primary" />
<TkBadge variant="primary" size="small" type="filledlight" label="primary" />
`;

  const vueCode = `<TkBadge variant="primary" size="large" type="filledlight" label="primary" />
<TkBadge variant="primary" size="base" type="filledlight" label="primary" />
<TkBadge variant="primary" size="small" type="filledlight" label="primary" />
`;

  const angularCode = `<tk-badge variant="primary" size="large" type="filledlight" label="primary" />
<tk-badge variant="primary" size="base" type="filledlight" label="primary" />
<tk-badge variant="primary" size="small" type="filledlight" label="primary" />`;

  const demo = (
    <div className="flex items-end justify-center flex-wrap gap-2">
      <TkBadge
        variant="primary"
        size="large"
        type="filledlight"
        label="primary"
      />
      <TkBadge
        variant="primary"
        size="base"
        type="filledlight"
        label="primary"
      />
      <TkBadge
        variant="primary"
        size="small"
        type="filledlight"
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

export default Size;
