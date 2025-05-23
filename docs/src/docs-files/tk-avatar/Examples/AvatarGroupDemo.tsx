import { TkAvatar, TkAvatarGroup } from '@takeoff-ui/react';
import React from 'react';
import FeatureDemo from '../../../components/FeatureDemo';
import useBaseUrl from '@docusaurus/useBaseUrl';

const AvatarGroupDemo = () => {
  const reactCode = `<TkAvatarGroup>
  <TkAvatar image="https://via.placeholder.com/40" variant="primary" background="solid" rounded />
  <TkAvatar image="https://via.placeholder.com/40" variant="light" background="solid" rounded />
  <TkAvatar image="https://via.placeholder.com/40" variant="success" background="solid" rounded />
  <TkAvatar image="https://via.placeholder.com/40" variant="info" background="solid" rounded label="TK" />
  <TkAvatar variant="light" background="solid" rounded label="+4" />
</TkAvatarGroup>
<TkAvatarGroup compact>
  <TkAvatar image="https://via.placeholder.com/40" variant="primary" background="solid" rounded />
  <TkAvatar image="https://via.placeholder.com/40" variant="light" background="solid" rounded />
  <TkAvatar image="https://via.placeholder.com/40" variant="success" background="solid" rounded />
  <TkAvatar image="https://via.placeholder.com/40" variant="info" background="solid" rounded label="TK" />
  <TkAvatar variant="light" background="solid" rounded label="+4" />
</TkAvatarGroup>`;

  const vueCode = `<TkAvatarGroup>
  <TkAvatar image="https://via.placeholder.com/40" variant="primary" background="solid" rounded />
  <TkAvatar image="https://via.placeholder.com/40" variant="light" background="solid" rounded />
  <TkAvatar image="https://via.placeholder.com/40" variant="success" background="solid" rounded />
  <TkAvatar image="https://via.placeholder.com/40" variant="info" background="solid" rounded label="TK" />
  <TkAvatar variant="light" background="solid" rounded label="+4" />
</TkAvatarGroup>
<TkAvatarGroup compact>
  <TkAvatar image="https://via.placeholder.com/40" variant="primary" background="solid" rounded />
  <TkAvatar image="https://via.placeholder.com/40" variant="light" background="solid" rounded />
  <TkAvatar image="https://via.placeholder.com/40" variant="success" background="solid" rounded />
  <TkAvatar image="https://via.placeholder.com/40" variant="info" background="solid" rounded label="TK" />
  <TkAvatar variant="light" background="solid" rounded label="+4" />
</TkAvatarGroup>`;

  const angularCode = `<tk-avatar-group>
  <tk-avatar image="https://via.placeholder.com/40" variant="primary" background="solid" rounded />
  <tk-avatar image="https://via.placeholder.com/40" variant="light" background="solid" rounded />
  <tk-avatar image="https://via.placeholder.com/40" variant="success" background="solid" rounded />
  <tk-avatar image="https://via.placeholder.com/40" variant="info" background="solid" rounded label="TK" />
  <tk-avatar variant="light" background="solid" rounded label="+4" />
</tk-avatar-group>
<tk-avatar-group compact>
  <tk-avatar image="https://via.placeholder.com/40" variant="primary" background="solid" rounded />
  <tk-avatar image="https://via.placeholder.com/40" variant="light" background="solid" rounded />
  <tk-avatar image="https://via.placeholder.com/40" variant="success" background="solid" rounded />
  <tk-avatar image="https://via.placeholder.com/40" variant="info" background="solid" rounded label="TK" />
  <tk-avatar variant="light" background="solid" rounded label="+4" />
</tk-avatar-group>`;

  const demo = (
    <div className="flex flex-col gap-4 overflow-auto">
      <TkAvatarGroup>
        <TkAvatar
          image={useBaseUrl('img/docs/tk-avatar/user-1.png')}
          variant="primary"
          background="solid"
          rounded
        />
        <TkAvatar
          image={useBaseUrl('img/docs/tk-avatar/user-2.png')}
          variant="light"
          background="solid"
          rounded
        />
        <TkAvatar
          image={useBaseUrl('img/docs/tk-avatar/user-3.png')}
          variant="success"
          background="solid"
          rounded
        />
        <TkAvatar
          image={useBaseUrl('img/docs/tk-avatar/user-4.png')}
          variant="info"
          background="solid"
          rounded
        />
        <TkAvatar variant="light" background="solid" rounded label="+4" />
      </TkAvatarGroup>
      <TkAvatarGroup compact>
        <TkAvatar
          image={useBaseUrl('img/docs/tk-avatar/user-1.png')}
          variant="primary"
          background="solid"
          rounded
        />
        <TkAvatar
          image={useBaseUrl('img/docs/tk-avatar/user-2.png')}
          variant="light"
          background="solid"
          rounded
        />
        <TkAvatar
          image={useBaseUrl('img/docs/tk-avatar/user-3.png')}
          variant="success"
          background="solid"
          rounded
        />
        <TkAvatar
          image={useBaseUrl('img/docs/tk-avatar/user-4.png')}
          variant="info"
          background="solid"
          rounded
        />
        <TkAvatar variant="light" background="solid" rounded label="+4" />
      </TkAvatarGroup>
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
export default AvatarGroupDemo;
