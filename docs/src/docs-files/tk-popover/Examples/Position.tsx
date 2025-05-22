import { TkPopover, TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Position = () => {
  const reactCode = `<TkPopover
  position="top"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkPopover>
<TkPopover
  position="right"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkPopover>
<TkPopover
  position="left"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkPopover>
<TkPopover
  position="bottom"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkPopover>`;

  const vueCode = `<TkPopover
  position="top"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkPopover>
<TkPopover
  position="right"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkPopover>
<TkPopover
  position="left"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkPopover>
<TkPopover
  position="bottom"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkPopover>`;

  const demo = (
    <div className="">
      <TkPopover position="top">
        <TkButton slot="trigger" label="Top Placement" />
        <div slot="content">This is a popover</div>
      </TkPopover>
      <br />
      <TkPopover position="right">
        <TkButton slot="trigger" label="Right Placement" />
        <div slot="content">This is a popover</div>
      </TkPopover>
      <br />
      <TkPopover position="left">
        <TkButton slot="trigger" label="Left Placement" />
        <div slot="content">This is a popover</div>
      </TkPopover>
      <br />
      <TkPopover position="bottom">
        <TkButton slot="trigger" label="Bottom Placement" />
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

export default Position;
