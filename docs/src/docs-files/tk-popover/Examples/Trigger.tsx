import { TkPopover, TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Trigger = () => {
  const reactCode = `<TkPopover trigger="click">
  <TkButton slot="trigger" label="Click Me!"></TkButton>
</TkPopover>
<TkPopover trigger="hover">
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkPopover>
`;

  const vueCode = `<TkPopover trigger="click">
  <TkButton slot="trigger" label="Click Me!"></TkButton>
</TkPopover>
<TkPopover trigger="hover">
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkPopover>
`;

  const demo = (
    <div className="">
      <TkPopover trigger="click">
        <TkButton slot="trigger" label="Click Me!"></TkButton>
        <div slot="content">This is a popover</div>
      </TkPopover>
      <br />
      <TkPopover trigger="hover">
        <TkButton slot="trigger" label="Hover Me!"></TkButton>
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

export default Trigger;
