import { TkIcon } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Variants = () => {
  const reactCode = `<TkIcon icon="flight" variant="primary" />
<TkIcon icon="flight" variant="secondary" />
<TkIcon icon="flight" variant="neutral" />
<TkIcon icon="flight" variant="info" />
<TkIcon icon="flight" variant="success" />
<TkIcon icon="flight" variant="warning" />
<TkIcon icon="flight" variant="danger" />
<TkIcon icon="flight" variant="white" />`;

  const vueCode = `<TkIcon icon="flight" variant="primary" />
<TkIcon icon="flight" variant="secondary" />
<TkIcon icon="flight" variant="neutral" />
<TkIcon icon="flight" variant="info" />
<TkIcon icon="flight" variant="success" />
<TkIcon icon="flight" variant="warning" />
<TkIcon icon="flight" variant="danger" />
<TkIcon icon="flight" variant="white" />`;

  const demo = (
    <div className="flex justify-center items-end flex-wrap gap-4">
      <TkIcon icon="flight" variant="primary" />
      <TkIcon icon="flight" variant="secondary" />
      <TkIcon icon="flight" variant="neutral" />
      <TkIcon icon="flight" variant="info" />
      <TkIcon icon="flight" variant="success" />
      <TkIcon icon="flight" variant="warning" />
      <TkIcon icon="flight" variant="danger" />
      <TkIcon icon="flight" variant="white" />
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

export default Variants;
