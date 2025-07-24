import { TkIcon } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Basic = () => {
  const reactCode = `<TkIcon icon="flight" />
<TkIcon icon="hotel" />
<TkIcon icon="directions_car" />
<TkIcon icon="local_dining" />`;

  const vueCode = `<TkIcon icon="flight" />
<TkIcon icon="hotel" />
<TkIcon icon="directions_car" />
<TkIcon icon="local_dining" />`;

  const angularCode = `<tk-icon icon="flight" />
<tk-icon icon="hotel" />
<tk-icon icon="directions_car" />
<tk-icon icon="local_dining" />`;

  const demo = (
    <div className="flex justify-center items-end flex-wrap gap-4">
      <TkIcon icon="flight" />
      <TkIcon icon="hotel" />
      <TkIcon icon="directions_car" />
      <TkIcon icon="local_dining" />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Basic;
