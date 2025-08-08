import { TkAvatar, TkAvatarGroup } from '@takeoff-ui/react';

function Avatar() {
  return (
    <div>
      <TkAvatarGroup>
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
      </TkAvatarGroup>
    </div>
  );
}

export default Avatar;
