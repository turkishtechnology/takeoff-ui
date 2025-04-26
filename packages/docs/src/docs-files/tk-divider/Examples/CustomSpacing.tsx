import { TkBadge, TkDivider } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';
const CustomSpacing = () => {
  const reactCode = `<TkDivider mx={32} />
<TkDivider my={48}>Custom Vertical Spacing</TkDivider>
<TkDivider mx={32} my={48}>Custom Both Spacing</TkDivider>`;
  const vueCode = `<TkDivider :mx="32" />
    <TkDivider :my="48">Custom Vertical Spacing</TkDivider>
    <TkDivider :mx="32" :my="48">Custom Both Spacing</TkDivider>`;
  const demo = (
    <div className="flex flex-col gap-4">
      <div
        style={{
          borderColor: 'var(--primary-700)',
        }}
        className="py-0 px-2 border border-solid rounded-lg"
      >
        <TkDivider my={32}>
          <div className="flex items-center gap-2">
            <span>Horizontal</span>
            <TkBadge label="32px" variant="danger" size="small" />
          </div>
        </TkDivider>
      </div>
      <div
        style={{
          borderColor: 'var(--primary-700)',
        }}
        className="border border-solid rounded-lg"
      >
        <TkDivider mx={0}>Vertical None</TkDivider>
      </div>
    </div>
  );
  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={''}
    ></FeatureDemo>
  );
};
export default CustomSpacing;
