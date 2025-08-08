import { TkPopover, TkButton, TkIcon } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Basic = () => {
  const reactCode = `<TkPopover type="basic">
  <TkButton slot="trigger" label="Click Me!"></TkButton>
  <div slot="content" >
    <h4>This is a popover</h4>
  </div>
</TkPopover>`;

  const vueCode = `<TkPopover type="basic">
  <TkButton slot="trigger" label="Click Me!"></TkButton>
  <div slot="content" class="flex flex-col gap-2 w-[300px]">
    <div>This is a popover</div>
  </div>
</TkPopover>`;

  const demo = (
    <div className="">
      <TkPopover type="basic">
        <TkButton slot="trigger" label="Click Me!"></TkButton>
        <div slot="content">
          <div>This is a popover</div>
        </div>
      </TkPopover>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default Basic;
