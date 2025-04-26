import { TkBadge, TkRadio, TkRadioGroup } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const ContentSlot = () => {
  const reactCode = `<TkRadioGroup>
    <TkRadio>
        <TkBadge
            slot="content"
            icon="warning"
            variant="warning"
            label="warning"
        />
    </TkRadio>
</TkRadioGroup>`;

  const vueCode = `<TkRadioGroup>
    <TkRadio>
        <TkBadge
            slot="content"
            icon="warning"
            variant="warning"
            label="warning"
        />
    </TkRadio>
</TkRadioGroup>`;

  const demo = (
    <TkRadioGroup>
      <TkRadio>
        <TkBadge
          slot="content"
          icon="warning"
          variant="warning"
          label="warning"
        />
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
