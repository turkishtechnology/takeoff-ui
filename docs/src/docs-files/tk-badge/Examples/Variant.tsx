import { TkBadge } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Variant = () => {
  const reactCode = `<TkBadge variant="primary" label="primary" />
<TkBadge variant="secondary" label="secondary" /> 
<TkBadge variant="neutral" label="neutral" />
<TkBadge variant="info" label="info" />
<TkBadge variant="warning" label="warning" />
<TkBadge variant="success" label="success" />
<TkBadge variant="danger" label="danger" />
<TkBadge variant="verified" label="verified" />
<TkBadge variant="purple" label="purple" />
<TkBadge variant="cyan" label="cyan" />
<TkBadge variant="business" label="business" />
`;

  const vueCode = `<TkBadge variant="primary" label="primary" />
<TkBadge variant="secondary" label="secondary" />
<TkBadge variant="neutral" label="neutral" />
<TkBadge variant="info" label="info" />
<TkBadge variant="warning" label="warning" />
<TkBadge variant="success" label="success" />
<TkBadge variant="danger" label="danger" />
<TkBadge variant="verified" label="verified" />
<TkBadge variant="purple" label="purple" />
<TkBadge variant="cyan" label="cyan" />
<TkBadge variant="business" label="business" />
`;

  const demo = (
    <div className="flex justify-center flex-wrap gap-2">
      <TkBadge variant="primary" label="primary" />
      <TkBadge variant="secondary" label="secondary" />
      <TkBadge variant="neutral" label="neutral" />
      <TkBadge variant="info" label="info" />
      <TkBadge variant="warning" label="warning" />
      <TkBadge variant="success" label="success" />
      <TkBadge variant="danger" label="danger" />
      <TkBadge variant="verified" label="verified" />
      <TkBadge variant="purple" label="purple" />
      <TkBadge variant="cyan" label="cyan" />
      <TkBadge variant="business" label="business" />
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

export default Variant;
