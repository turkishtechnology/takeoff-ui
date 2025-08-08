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

  const angularCode = `<tk-badge variant="primary" label="primary" />
<tk-badge variant="secondary" label="secondary" /> 
<tk-badge variant="neutral" label="neutral" />
<tk-badge variant="info" label="info" />
<tk-badge variant="warning" label="warning" />
<tk-badge variant="success" label="success" />
<tk-badge variant="danger" label="danger" />
<tk-badge variant="verified" label="verified" />
<tk-badge variant="purple" label="purple" />
<tk-badge variant="cyan" label="cyan" />
<tk-badge variant="business" label="business" />`;

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
      <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>
    </>
  );
};

export default Variant;
