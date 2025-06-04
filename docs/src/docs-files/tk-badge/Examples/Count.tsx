import { TkBadge } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Size = () => {
  const reactCode = `<TkBadge variant="purple" size="large" type="filledlight" count="11" rounded />
<TkBadge variant="purple" size="base" type="filledlight" count="11" rounded />
<TkBadge variant="purple" size="small" type="filledlight" count="11" rounded />
`;

  const vueCode = `<TkBadge variant="purple" size="large" type="filledlight" count="11" rounded />
<TkBadge variant="purple" size="base" type="filledlight" count="11" rounded />
<TkBadge variant="purple" size="small" type="filledlight" count="11" rounded />
`;

  const angularCode = `<tk-badge variant="purple" size="large" type="filledlight" count="11" rounded />
<tk-badge variant="purple" size="base" type="filledlight" count="11" rounded />
<tk-badge variant="purple" size="small" type="filledlight" count="11" rounded />`;

  const demo = (
    <div className="flex items-end justify-center flex-wrap gap-2">
      <TkBadge
        variant="purple"
        size="large"
        type="filledlight"
        count="11"
        rounded
      />
      <TkBadge
        variant="purple"
        size="base"
        type="filledlight"
        count="11"
        rounded
      />
      <TkBadge
        variant="purple"
        size="small"
        type="filledlight"
        count="11"
        rounded
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
