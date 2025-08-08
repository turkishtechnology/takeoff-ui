import { TkIcon } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Sign = () => {
  const reactCode = `<TkIcon icon="flight" sign variant="primary" />
<TkIcon icon="flight" sign variant="secondary" />
<TkIcon icon="flight" sign variant="neutral" />
<TkIcon icon="flight" sign variant="info" />
<TkIcon icon="flight" sign variant="success" />
<TkIcon icon="flight" sign variant="warning" />
<TkIcon icon="flight" sign variant="danger" />
<TkIcon icon="flight" sign variant="white" />`;

  const vueCode = `<TkIcon icon="flight" sign variant="primary" />
<TkIcon icon="flight" sign variant="secondary" />
<TkIcon icon="flight" sign variant="neutral" />
<TkIcon icon="flight" sign variant="info" />
<TkIcon icon="flight" sign variant="success" />
<TkIcon icon="flight" sign variant="warning" />
<TkIcon icon="flight" sign variant="danger" />
<TkIcon icon="flight" sign variant="white" />`;

  const angularCode = `<tk-icon icon="flight" sign variant="primary" />
<tk-icon icon="flight" sign variant="secondary" />
<tk-icon icon="flight" sign variant="neutral" />
<tk-icon icon="flight" sign variant="info" />
<tk-icon icon="flight" sign variant="success" />
<tk-icon icon="flight" sign variant="warning" />
<tk-icon icon="flight" sign variant="danger" />
<tk-icon icon="flight" sign variant="white" />`;

  const demo = (
    <div className="flex justify-center items-end flex-wrap gap-4">
      <TkIcon icon="flight" sign variant="primary" />
      <TkIcon icon="flight" sign variant="secondary" />
      <TkIcon icon="flight" sign variant="neutral" />
      <TkIcon icon="flight" sign variant="info" />
      <TkIcon icon="flight" sign variant="success" />
      <TkIcon icon="flight" sign variant="warning" />
      <TkIcon icon="flight" sign variant="danger" />
      <TkIcon icon="flight" sign variant="white" />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Sign;
