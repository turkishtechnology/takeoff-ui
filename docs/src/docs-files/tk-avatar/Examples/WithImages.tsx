import { TkAvatar } from '@takeoff-ui/react';
import React from 'react';
import FeatureDemo from '../../../components/FeatureDemo';
import useBaseUrl from '@docusaurus/useBaseUrl';
const WithImages = () => {
  const reactCode = `<TkAvatar image="https://via.placeholder.com/40" background="solid" variant="primary" rounded />
<TkAvatar image="https://via.placeholder.com/40" background="solid" variant="light" rounded />
<TkAvatar image="https://via.placeholder.com/40" background="solid" variant="success" rounded />
<TkAvatar image="https://via.placeholder.com/40" background="solid" variant="info" rounded />
<TkAvatar image="https://via.placeholder.com/40" background="solid" variant="danger" rounded />

<TkAvatar image="https://via.placeholder.com/40" background="solid" variant="primary" />
<TkAvatar image="https://via.placeholder.com/40" background="solid" variant="light" />
<TkAvatar image="https://via.placeholder.com/40" background="solid" variant="success" />
<TkAvatar image="https://via.placeholder.com/40" background="solid" variant="info" />
<TkAvatar image="https://via.placeholder.com/40" background="solid" variant="danger" />`;

  const vueCode = `<TkAvatar image="https://via.placeholder.com/40" background="solid" variant="primary" rounded />
<TkAvatar image="https://via.placeholder.com/40" background="solid" variant="light" rounded />
<TkAvatar image="https://via.placeholder.com/40" background="solid" variant="success" rounded />
<TkAvatar image="https://via.placeholder.com/40" background="solid" variant="info" rounded />
<TkAvatar image="https://via.placeholder.com/40" background="solid" variant="danger" rounded />

<TkAvatar image="https://via.placeholder.com/40" background="solid" variant="primary" />
<TkAvatar image="https://via.placeholder.com/40" background="solid" variant="light" />
<TkAvatar image="https://via.placeholder.com/40" background="solid" variant="success" />
<TkAvatar image="https://via.placeholder.com/40" background="solid" variant="info" />
<TkAvatar image="https://via.placeholder.com/40" background="solid" variant="danger" />`;

  const angularCode = `<tk-avatar image="https://via.placeholder.com/40" background="solid" variant="primary" rounded />
<tk-avatar image="https://via.placeholder.com/40" background="solid" variant="light" rounded />
<tk-avatar image="https://via.placeholder.com/40" background="solid" variant="success" rounded />
<tk-avatar image="https://via.placeholder.com/40" background="solid" variant="info" rounded />
<tk-avatar image="https://via.placeholder.com/40" background="solid" variant="danger" rounded />
    
<tk-avatar image="https://via.placeholder.com/40" background="solid" variant="primary" />
<tk-avatar image="https://via.placeholder.com/40" background="solid" variant="light" />
<tk-avatar image="https://via.placeholder.com/40" background="solid" variant="success" />
<tk-avatar image="https://via.placeholder.com/40" background="solid" variant="info" />
<tk-avatar image="https://via.placeholder.com/40" background="solid" variant="danger" />`;

  const demo = (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center gap-2 flex-wrap">
        <TkAvatar
          image={useBaseUrl('img/docs/tk-avatar/user-1.png')}
          background="solid"
          variant="primary"
          rounded
        />
        <TkAvatar
          image={useBaseUrl('img/docs/tk-avatar/user-2.png')}
          background="solid"
          variant="light"
          rounded
        />
        <TkAvatar
          image={useBaseUrl('img/docs/tk-avatar/user-3.png')}
          background="solid"
          variant="success"
          rounded
        />
        <TkAvatar
          image={useBaseUrl('img/docs/tk-avatar/user-4.png')}
          background="solid"
          variant="info"
          rounded
        />
        <TkAvatar
          image={useBaseUrl('img/docs/tk-avatar/user-5.png')}
          background="solid"
          variant="danger"
          rounded
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        <TkAvatar
          image={useBaseUrl('img/docs/tk-avatar/user-1.png')}
          background="solid"
          variant="primary"
        />
        <TkAvatar
          image={useBaseUrl('img/docs/tk-avatar/user-2.png')}
          background="solid"
          variant="light"
        />
        <TkAvatar
          image={useBaseUrl('img/docs/tk-avatar/user-3.png')}
          background="solid"
          variant="success"
        />
        <TkAvatar
          image={useBaseUrl('img/docs/tk-avatar/user-4.png')}
          background="solid"
          variant="info"
        />
        <TkAvatar
          image={useBaseUrl('img/docs/tk-avatar/user-5.png')}
          background="solid"
          variant="danger"
        />
      </div>
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
export default WithImages;
