import { TkAvatar } from '@takeoff-ui/react';
import React from 'react';
import FeatureDemo from '../../../components/FeatureDemo';
import useBaseUrl from '@docusaurus/useBaseUrl';

const WithBadges = () => {
  const reactCode = `<TkAvatar image="https://via.placeholder.com/40" background="solid" badge badgeStatus="success" rounded />
<TkAvatar image="https://via.placeholder.com/40" badge badgeStatus="warning" rounded />
<TkAvatar label="AD" badge badgeStatus="danger" rounded />`;

  const vueCode = `<TkAvatar image="https://via.placeholder.com/40" background="solid" badge badgeStatus="success" rounded />
<TkAvatar image="https://via.placeholder.com/40" badge badgeStatus="warning" rounded />
<TkAvatar label="AD" badge badgeStatus="danger" rounded />`;

  const demo = (
    <div className="flex justify-center gap-2 flex-wrap">
      <TkAvatar
        image={useBaseUrl('img/docs/tk-avatar/user-1.png')}
        background="solid"
        badge
        badgeStatus="success"
        rounded
      />
      <TkAvatar
        image={useBaseUrl('img/docs/tk-avatar/user-2.png')}
        background="solid"
        badge
        badgeStatus="warning"
        rounded
      />
      <TkAvatar label="AD" badge badgeStatus="danger" rounded />
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
export default WithBadges;
