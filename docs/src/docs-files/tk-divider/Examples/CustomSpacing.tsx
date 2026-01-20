import { TkButton, TkDivider } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';
const CustomSpacing = () => {
  const reactCode = `<TkDivider my={32}>
  <div className="flex items-center gap-2">
    <span>Horizontal</span>
    <TkButton label='button' size="small" variant="info" type="filled" icon="content_paste_search"></TkButton>
  </div>
</TkDivider>

<TkDivider mx={0}>Vertical None</TkDivider>`;

  const vueCode = `<TkDivider :my="32">
  <div class="flex items-center gap-2">
    <span>Horizontal</span>
    <TkButton label="button" size="small" variant="info" type="filled" icon="content_paste_search" />
  </div>
</TkDivider>

<TkDivider :mx="0">Vertical None</TkDivider>`;

  const angularCode = `<tk-divider [my]="32">
  <div class="flex items-center gap-2">
    <span>Horizontal</span>
    <tk-button label="button" size="small" variant="info" type="filled" icon="content_paste_search"></tk-button>
  </div>
</tk-divider>

<tk-divider [mx]="0">Vertical None</tk-divider>`;

  const demo = (
    <div className="flex flex-col gap-4">
      <div
        style={{ borderColor: 'var(--primary-700)' }}
        className="py-0 px-2 border border-dashed rounded-lg"
      >
        <TkDivider my={32}>
          <div className="flex items-center gap-2">
            <span>Horizontal</span>
            <TkButton label='button' size="small" variant="info" type="filled" icon="content_paste_search"></TkButton>
          </div>
        </TkDivider>
      </div>
      <div
        style={{ borderColor: 'var(--primary-700)' }}
        className="border border-dashed rounded-lg"
      >
        <TkDivider mx={0}>Vertical None</TkDivider>
      </div>
    </div>
  );
  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};
export default CustomSpacing;
