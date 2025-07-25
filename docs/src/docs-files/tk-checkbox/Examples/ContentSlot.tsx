import { TkBadge, TkCheckbox } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const ContentSlot = () => {
  const reactCode = `<TkCheckbox type="card">
  <div slot="content" className="flex items-center gap-2">
    <div>Label</div>
    <TkBadge icon="info" variant="info" label="İnformation" size="small" />
  </div>
</TkCheckbox>`;

  const vueCode = `<TkCheckbox type="card">
  <div slot="content" className="flex items-center gap-2">
    <div>Label</div>
    <TkBadge icon="info" variant="info" label="İnformation" size="small" />
  </div>
</TkCheckbox>`;

  const angularCode = `<tk-checkbox type="card">
  <div slot="content" class="flex items-center gap-2">
    <div>Label</div>
    <tk-badge icon="info" variant="info" label="İnformation" size="small" />
  </div>
</tk-checkbox>`;

  const demo = (
    <TkCheckbox type="card">
      <div slot="content" className="flex items-center gap-2">
        <div>Label</div>
        <TkBadge icon="info" variant="info" label="İnformation" size="small" />
      </div>
    </TkCheckbox>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default ContentSlot;
