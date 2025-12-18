// @ts-nocheck
import { TkAvatar, TkCheckbox } from '@takeoff-ui/react';
import React, { useState } from 'react';
import FeatureDemo from '../../../components/FeatureDemo';
import useBaseUrl from '@docusaurus/useBaseUrl';

const WithShadow = () => {
  const [hideShadow, setHideShadow] = useState(false);

  const reactCode = `<TkAvatar label="JS" ${hideShadow ? 'hideShadow' : ''} />
<TkAvatar label="AD" rounded ${hideShadow ? 'hideShadow' : ''} />
<TkAvatar image="/img/docs/tk-avatar/user-1.png" ${hideShadow ? 'hideShadow' : ''} />
<TkAvatar image="/img/docs/tk-avatar/user-2.png" rounded ${hideShadow ? 'hideShadow' : ''} />
<TkAvatar label="AD" rounded badge ${hideShadow ? 'hideShadow' : ''} />`;

  const vueCode = `<TkAvatar label="JS" ${hideShadow ? 'hide-shadow' : ''} />
<TkAvatar label="AD" rounded ${hideShadow ? 'hide-shadow' : ''} />
<TkAvatar image="/img/docs/tk-avatar/user-1.png" ${hideShadow ? 'hide-shadow' : ''} />
<TkAvatar image="/img/docs/tk-avatar/user-2.png" rounded ${hideShadow ? 'hide-shadow' : ''} />
<TkAvatar label="AD" rounded badge ${hideShadow ? 'hide-shadow' : ''} />`;

  const angularCode = `<tk-avatar label="JS" ${hideShadow ? 'hideShadow' : ''} />
<tk-avatar label="AD" rounded ${hideShadow ? 'hideShadow' : ''} />
<tk-avatar image="/img/docs/tk-avatar/user-1.png" ${hideShadow ? 'hideShadow' : ''} />
<tk-avatar image="/img/docs/tk-avatar/user-2.png" rounded ${hideShadow ? 'hideShadow' : ''} />
<tk-avatar label="AD" rounded badge ${hideShadow ? 'hideShadow' : ''} />`;

  const demo = (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-4">
        <TkCheckbox label="Hide Shadow" value={hideShadow} onTkChange={() => setHideShadow(prev => !prev)} />
      </div>
      <div className="flex justify-center gap-4 flex-wrap items-center">
        <TkAvatar label="JS" hideShadow={hideShadow} />
        <TkAvatar label="AD" rounded hideShadow={hideShadow} />
        <TkAvatar image={useBaseUrl("/img/docs/tk-avatar/user-1.png")} hideShadow={hideShadow} />
        <TkAvatar image={useBaseUrl("/img/docs/tk-avatar/user-2.png")} rounded hideShadow={hideShadow} />
        <TkAvatar label="AD" rounded badge hideShadow={hideShadow} />
      </div>
    </div>
  );

  return (
    <>
      <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>
    </>
  );
};
export default WithShadow;
