import { TkAvatar } from '@takeoff-ui/react';
import React from 'react';
import FeatureDemo from '../../../components/FeatureDemo';

const Sizes = () => {
  const reactCode = `<TkAvatar size="xlarge" rounded label="XL" />
<TkAvatar size="large" rounded label="L" />
<TkAvatar size="base" rounded label="M" />
<TkAvatar size="small" rounded label="S" />
<TkAvatar size="xsmall" rounded label="XS" />`;

  const vueCode = `<TkAvatar size="xlarge" rounded label="XL" />
<TkAvatar size="large" rounded label="L" />
<TkAvatar size="base" rounded label="M" />
<TkAvatar size="small" rounded label="S" />
<TkAvatar size="xsmall" rounded label="XS" />`;

  const angularCode = `<tk-avatar size="xlarge" rounded label="XL" />
<tk-avatar size="large" rounded label="L" />
<tk-avatar size="base" rounded label="M" />
<tk-avatar size="small" rounded label="S" />
<tk-avatar size="xsmall" rounded label="XS" />`;

  const demo = (
    <div className="flex justify-center items-end gap-2 flex-wrap">
      <TkAvatar size="xlarge" rounded label="XL" />
      <TkAvatar size="large" rounded label="L" />
      <TkAvatar size="base" rounded label="M" />
      <TkAvatar size="small" rounded label="S" />
      <TkAvatar size="xsmall" rounded label="XS" />
    </div>
  );

  return (
    <>
      <FeatureDemo
        demo={demo}
        reactCode={reactCode}
        vueCode={vueCode}
        angularCode={angularCode}
      ></FeatureDemo>
    </>
  );
};
export default Sizes;
