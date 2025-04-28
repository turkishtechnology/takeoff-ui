import { TkSpinner } from '@takeoff-ui/react';
import React from 'react';
import FeatureDemo from '../../../components/FeatureDemo';

const Sizes = () => {
  const reactCode = `<TkSpinner size="xlarge" type="rounded" label="XL" />
<TkSpinner size="large" type="rounded" label="L" />
<TkSpinner size="base" type="rounded" label="M" />
<TkSpinner size="small" type="rounded" label="S" />`;

  const vueCode = `<TkSpinner size="xlarge" type="rounded" label="XL" />
<TkSpinner size="large" type="rounded" label="L" />
<TkSpinner size="base" type="rounded" label="M" />
<TkSpinner size="small" type="rounded" label="S" />`;

  const demo = (
    <div className="flex items-end justify-center gap-4 flex-wrap">
      <TkSpinner size="xlarge" type="rounded" label="XL" />
      <TkSpinner size="large" type="rounded" label="L" />
      <TkSpinner size="base" type="rounded" label="M" />
      <TkSpinner size="small" type="rounded" label="S" />
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
export default Sizes;
