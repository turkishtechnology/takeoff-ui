import { TkAvatar } from '@takeoff-ui/react';
import React from 'react';
import FeatureDemo from '../../../components/FeatureDemo';

const Basic = () => {
  const reactCode = `<TkAvatar label="JS" />
<TkAvatar label="AD" rounded />
<TkAvatar />`;

  const vueCode = `<TkAvatar label="JS" />
<TkAvatar label="AD" rounded />
<TkAvatar />`;

  const demo = (
    <div className="flex justify-center gap-4 flex-wrap">
      <TkAvatar label="JS" />
      <TkAvatar label="AD" rounded />
      <TkAvatar />
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
export default Basic;
