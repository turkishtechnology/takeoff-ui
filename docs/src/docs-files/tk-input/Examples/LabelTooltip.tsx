import { TkIcon, TkInput, TkTooltip } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const LabelTooltip = () => {
  const reactCode = `<div className="text-sm">Label with tooltip</div>
<TkTooltip
  header="Tooltip Example?"
  description="Tooltip description example"
  variant="white"
>
  <TkIcon icon="info" fill variant="info" slot="trigger" />
</TkTooltip>
<TkInput />`;

  const vueCode = `<div class="text-sm">Label with tooltip</div>
<TkTooltip
  header="Tooltip Example?"
  description="Tooltip description example"
  variant="white"
>
  <TkIcon icon="info" fill variant="info" slot="trigger" />
</TkTooltip>
<TkInput />`;

  const demo = (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 mx-2">
        <div className="text-sm">Label with tooltip</div>
        <TkTooltip header="Tooltip Example?" description="Tooltip description example" variant="white">
          <TkIcon icon="info" fill variant="info" slot="trigger" />
        </TkTooltip>
      </div>
      <TkInput />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default LabelTooltip;
