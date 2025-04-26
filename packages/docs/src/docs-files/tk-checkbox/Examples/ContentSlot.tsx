import { TkBadge, TkCheckbox } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const ContentSlot = () => {
  const reactCode = `<TkCheckbox>
  <TkBadge
    slot="content"
    icon="warning"
    variant="warning"
    label="warning"
  />
</TkCheckbox>`;

  const vueCode = `<TkCheckbox>
  <TkBadge
    slot="content"
    icon="warning"
    variant="warning"
    label="warning"
  />
</TkCheckbox>`;

  const demo = (
    <TkCheckbox>
      <TkBadge
        slot="content"
        icon="warning"
        variant="warning"
        label="warning"
      />
    </TkCheckbox>
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
