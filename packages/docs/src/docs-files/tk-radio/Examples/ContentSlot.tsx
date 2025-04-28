import { TkBadge, TkRadio, TkRadioGroup } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const ContentSlot = () => {
  const reactCode = `<TkRadioGroup type="card" value="0" spread>
  <TkRadio value="0">
    <div slot="content" className="flex items-center gap-2">
      <div>Label</div>
      <TkBadge icon="info" variant="info" label="İnformation" />
    </div>
  </TkRadio>
  <TkRadio value="1">
    <div slot="content" className="flex items-center gap-2">
      <div>Label</div>
      <TkBadge icon="info" variant="info" label="İnformation" />
    </div>
  </TkRadio>
</TkRadioGroup>`;

  const vueCode = `<TkRadioGroup type="card" value="0" spread>
  <TkRadio value="0">
    <div slot="content" className="flex items-center gap-2">
      <div>Label</div>
      <TkBadge icon="info" variant="info" label="İnformation" />
    </div>
  </TkRadio>
  <TkRadio value="1">
    <div slot="content" className="flex items-center gap-2">
      <div>Label</div>
      <TkBadge icon="info" variant="info" label="İnformation" />
    </div>
  </TkRadio>
</TkRadioGroup>`;

  const demo = (
    <TkRadioGroup type="card" value="0" spread>
      <TkRadio value="0">
        <div slot="content" className="flex items-center gap-2">
          <div>Label</div>
          <TkBadge icon="info" variant="info" label="İnformation" />
        </div>
      </TkRadio>
      <TkRadio value="1">
        <div slot="content" className="flex items-center gap-2">
          <div>Label</div>
          <TkBadge icon="info" variant="info" label="İnformation" />
        </div>
      </TkRadio>
    </TkRadioGroup>
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

export default ContentSlot;
