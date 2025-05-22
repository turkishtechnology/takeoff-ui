import { TkPopover, TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Types = () => {
  const reactCode = `<TkPopover type="basic">
  <TkButton slot="trigger" label="Click Me!"></TkButton>
</TkPopover>
<TkPopover type="white">
  <TkButton slot="trigger" label="Click Me!"></TkButton>
</TkPopover>
<TkPopover type="dark">
  <TkButton slot="trigger" label="Click Me!"></TkButton>
</TkPopover>`;

  const vueCode = `<TkPopover type="basic">
  <TkButton slot="trigger" label="Click Me!"></TkButton>
</TkPopover>
<TkPopover type="white">
  <TkButton slot="trigger" label="Click Me!"></TkButton>
</TkPopover>
<TkPopover type="dark">
  <TkButton slot="trigger" label="Click Me!"></TkButton>
</TkPopover>`;

  const demo = (
    <div className="">
      <TkPopover type="basic">
        <TkButton slot="trigger" label="Click Me!"></TkButton>
        <div slot="content">This is a popover</div>
      </TkPopover>
      <br />
      <TkPopover type="white">
        <TkButton slot="trigger" label="Click Me!"></TkButton>
        <div slot="content">This is a popover</div>
      </TkPopover>
      <br />
      <TkPopover type="dark">
        <TkButton slot="trigger" label="Click Me!"></TkButton>
        <div slot="content">This is a popover</div>
      </TkPopover>
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

export default Types;
