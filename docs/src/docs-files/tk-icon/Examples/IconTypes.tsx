import { TkIcon } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const IconTypes = () => {
  const reactCode = `<TkIcon icon="star" iconType="outlined" />
<TkIcon icon="star" iconType="rounded" />
<TkIcon icon="star" iconType="sharp" />`;

  const vueCode = `<TkIcon icon="star" iconType="outlined" />
<TkIcon icon="star" iconType="rounded" />
<TkIcon icon="star" iconType="sharp" />`;

  const angularCode = `<tk-icon icon="star" iconType="outlined" />
<tk-icon icon="star" iconType="rounded" />
<tk-icon icon="star" iconType="sharp" />`;

  const demo = (
    <div className="flex justify-center items-end flex-wrap gap-4">
      <div className="flex flex-col items-center">
        <TkIcon icon="star" iconType="outlined" />
        <span className="text-sm mt-2">outlined</span>
      </div>
      <div className="flex flex-col items-center">
        <TkIcon icon="star" iconType="rounded" />
        <span className="text-sm mt-2">rounded</span>
      </div>
      <div className="flex flex-col items-center">
        <TkIcon icon="star" iconType="sharp" />
        <span className="text-sm mt-2">sharp</span>
      </div>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default IconTypes;
