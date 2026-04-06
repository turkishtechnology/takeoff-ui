import { TkAvatar, TkBadge, TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

const Floating = () => {
  const reactCode = `<TkBadge variant="danger" type="filled" dot={true}>
  <div className="w-6 h-6 bg-[lightgrey]"></div>
</TkBadge>

<TkBadge variant="secondary" size="small" type="filled" count="4" rounded={true}>
  <div className="w-6 h-6 bg-[lightgrey]"></div>
</TkBadge>`;

  const vueCode = `<TkBadge variant="danger" type="filled" :dot="true">
  <div class="w-6 h-6 bg-[lightgrey]"></div>
</TkBadge>

<TkBadge variant="secondary" size="small" type="filled" count="4" :rounded="true">
  <div class="w-6 h-6 bg-[lightgrey]"></div>
</TkBadge>`;

  const angularCode = `<tk-badge variant="danger" type="filled" [dot]="true">
  <div class="w-6 h-6 bg-[lightgrey]"></div>
</tk-badge>

<tk-badge variant="secondary" size="small" type="filled" count="4" [rounded]="true">
  <div class="w-6 h-6 bg-[lightgrey]"></div>
</tk-badge>`;

  const demo = (
    <div className="flex items-end justify-center gap-2">
      <TkBadge variant="danger" type="filled" dot>
        <div className="w-6 h-6 bg-[lightgrey]"></div>
      </TkBadge>
      <TkBadge variant="secondary" size="small" type="filled" count="4" rounded>
        <div className="w-6 h-6 bg-[lightgrey]"></div>
      </TkBadge>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Floating;
