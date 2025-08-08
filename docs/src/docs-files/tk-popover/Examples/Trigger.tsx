import { TkPopover, TkButton, TkIcon } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Trigger = () => {
  const reactCode = `<TkPopover trigger="click">
  <TkButton slot="trigger" label="Click Me!"></TkButton>
  <div slot="content" className="flex flex-col gap-2 w-[300px]">
    <div className="flex gap-2">
      <TkIcon icon="bolt" variant="neutral" sign />
      <span className="text-lg font-bold text-neutral-900">
        Popover Header
      </span>
    </div>
    <div className="flex flex-col gap-2">
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.
      </span>
    </div>
  </div>
</TkPopover>
<TkPopover trigger="hover">
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
  <div slot="content" className="flex flex-col gap-2 w-[300px]">
    <div className="flex gap-2">
      <TkIcon icon="bolt" variant="neutral" sign />
      <span className="text-lg font-bold text-neutral-900">
        Popover Header
      </span>
    </div>
    <div className="flex flex-col gap-2">
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.
      </span>
    </div>
  </div>
</TkPopover>
`;

  const vueCode = `<TkPopover trigger="click">
  <TkButton slot="trigger" label="Click Me!"></TkButton>
  <div slot="content" className="flex flex-col gap-2 w-[300px]">
    <div className="flex gap-2">
      <TkIcon icon="bolt" variant="neutral" sign />
      <span className="text-lg font-bold text-neutral-900">
        Popover Header
      </span>
    </div>
    <div className="flex flex-col gap-2">
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.
      </span>
    </div>
  </div>
</TkPopover>
<TkPopover trigger="hover">
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
  <div slot="content" className="flex flex-col gap-2 w-[300px]">
    <div className="flex gap-2">
      <TkIcon icon="bolt" variant="neutral" sign />
      <span className="text-lg font-bold text-neutral-900">
        Popover Header
      </span>
    </div>
    <div className="flex flex-col gap-2">
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.
      </span>
    </div>
  </div>
</TkPopover>
`;

  const demo = (
    <div className="">
      <TkPopover trigger="click">
        <TkButton slot="trigger" label="Click Me!"></TkButton>
        <div slot="content" className="flex flex-col gap-2 w-[300px]">
          <div className="flex gap-2">
            <TkIcon icon="bolt" variant="neutral" sign />
            <span className="text-lg font-bold text-neutral-900">Popover Header</span>
          </div>
          <div className="flex flex-col gap-2">
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</span>
          </div>
        </div>
      </TkPopover>
      <br />
      <TkPopover trigger="hover">
        <TkButton slot="trigger" label="Hover Me!"></TkButton>
        <div slot="content" className="flex flex-col gap-2 w-[300px]">
          <div className="flex gap-2">
            <TkIcon icon="bolt" variant="neutral" sign />
            <span className="text-lg font-bold text-neutral-900">Popover Header</span>
          </div>
          <div className="flex flex-col gap-2">
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</span>
          </div>
        </div>
      </TkPopover>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default Trigger;
