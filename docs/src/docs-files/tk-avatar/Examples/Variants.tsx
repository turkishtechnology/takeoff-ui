import { TkAvatar } from '@takeoff-ui/react';
import React from 'react';
import FeatureDemo from '../../../components/FeatureDemo';

const Variants = () => {
  const reactCode = `<TkAvatar variant="primary" label="PR" />
<TkAvatar background="solid" variant="light" label="LT" />
<TkAvatar background="solid" variant="success" label="SC" />
<TkAvatar background="solid" variant="info" label="IN" />
<TkAvatar background="solid" variant="warning" label="WN" />
<TkAvatar background="solid" variant="danger" label="DG" />`;

  const vueCode = `<TkAvatar background="solid" variant="primary" label="PR" />
<TkAvatar background="solid" variant="light" label="LT" />
<TkAvatar background="solid" variant="success" label="SC" />
<TkAvatar background="solid" variant="info" label="IN" />
<TkAvatar background="solid" variant="warning" label="WN" />
<TkAvatar background="solid" variant="danger" label="DG" />`;

  const demo = (
    <div className="flex flex-col gap-2">
      <div className="flex justify*center gap-2 flex-wrap">
        <TkAvatar background="solid" variant="primary" rounded />
        <TkAvatar background="solid" variant="light" rounded />
        <TkAvatar background="solid" variant="success" rounded />
        <TkAvatar background="solid" variant="info" rounded />
        <TkAvatar background="solid" variant="warning" rounded />
        <TkAvatar background="solid" variant="danger" rounded />
      </div>
      <div className="flex gap-2 flex-wrap">
        <TkAvatar background="solid" variant="primary" label="PR" />
        <TkAvatar background="solid" variant="light" label="LT" />
        <TkAvatar background="solid" variant="success" label="SC" />
        <TkAvatar background="solid" variant="info" label="IN" />
        <TkAvatar background="solid" variant="warning" label="WN" />
        <TkAvatar background="solid" variant="danger" label="DG" />
      </div>
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
export default Variants;
