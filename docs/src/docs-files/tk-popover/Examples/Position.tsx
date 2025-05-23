import { TkPopover, TkButton, TkIcon } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Position = () => {
  const reactCode = `<TkPopover position="top">
<TkButton slot="trigger" label="Top Placement" />
<div slot="content" className="flex flex-col gap-2 w-[300px]">
  <div className="flex justify-between items-center ">
    <div className="flex gap-2">
      <TkIcon icon="bolt" variant="neutral" sign />
      <span className="text-lg font-bold text-neutral-900">
        Popover Header
      </span>
    </div>
    <TkButton icon="close" type="text" size="small" variant="neutral" />
  </div>
  <div className="flex flex-col gap-2">
    <span>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
      quos.
    </span>
  </div>
</div>
</TkPopover>
<br />
<TkPopover position="right">
<TkButton slot="trigger" label="Right Placement" />
<div slot="content" className="flex flex-col gap-2 w-[300px]">
  <div className="flex justify-between items-center ">
    <div className="flex gap-2">
      <TkIcon icon="bolt" variant="neutral" sign />
      <span className="text-lg font-bold text-neutral-900">
        Popover Header
      </span>
    </div>
    <TkButton icon="close" type="text" size="small" variant="neutral" />
  </div>
  <div className="flex flex-col gap-2">
    <span>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
      quos.
    </span>
  </div>
</div>
</TkPopover>
<br />
<TkPopover position="left">
<TkButton slot="trigger" label="Left Placement" />
<div slot="content" className="flex flex-col gap-2 w-[300px]">
  <div className="flex justify-between items-center ">
    <div className="flex gap-2">
      <TkIcon icon="bolt" variant="neutral" sign />
      <span className="text-lg font-bold text-neutral-900">
        Popover Header
      </span>
    </div>
    <TkButton icon="close" type="text" size="small" variant="neutral" />
  </div>
  <div className="flex flex-col gap-2">
    <span>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
      quos.
    </span>
  </div>
</div>
</TkPopover>
<br />
<TkPopover position="bottom">
<TkButton slot="trigger" label="Bottom Placement" />
<div slot="content" className="flex flex-col gap-2 w-[300px]">
  <div className="flex justify-between items-center ">
    <div className="flex gap-2">
      <TkIcon icon="bolt" variant="neutral" sign />
      <span className="text-lg font-bold text-neutral-900">
        Popover Header
      </span>
    </div>
    <TkButton icon="close" type="text" size="small" variant="neutral" />
  </div>
  <div className="flex flex-col gap-2">
    <span>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
      quos.
    </span>
  </div>
</div>
</TkPopover>`;

  const vueCode = `<TkPopover position="top">
<TkButton slot="trigger" label="Top Placement" />
<div slot="content" className="flex flex-col gap-2 w-[300px]">
  <div className="flex justify-between items-center ">
    <div className="flex gap-2">
      <TkIcon icon="bolt" variant="neutral" sign />
      <span className="text-lg font-bold text-neutral-900">
        Popover Header
      </span>
    </div>
    <TkButton icon="close" type="text" size="small" variant="neutral" />
  </div>
  <div className="flex flex-col gap-2">
    <span>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
      quos.
    </span>
  </div>
</div>
</TkPopover>
<br />
<TkPopover position="right">
<TkButton slot="trigger" label="Right Placement" />
<div slot="content" className="flex flex-col gap-2 w-[300px]">
  <div className="flex justify-between items-center ">
    <div className="flex gap-2">
      <TkIcon icon="bolt" variant="neutral" sign />
      <span className="text-lg font-bold text-neutral-900">
        Popover Header
      </span>
    </div>
    <TkButton icon="close" type="text" size="small" variant="neutral" />
  </div>
  <div className="flex flex-col gap-2">
    <span>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
      quos.
    </span>
  </div>
</div>
</TkPopover>
<br />
<TkPopover position="left">
<TkButton slot="trigger" label="Left Placement" />
<div slot="content" className="flex flex-col gap-2 w-[300px]">
  <div className="flex justify-between items-center ">
    <div className="flex gap-2">
      <TkIcon icon="bolt" variant="neutral" sign />
      <span className="text-lg font-bold text-neutral-900">
        Popover Header
      </span>
    </div>
    <TkButton icon="close" type="text" size="small" variant="neutral" />
  </div>
  <div className="flex flex-col gap-2">
    <span>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
      quos.
    </span>
  </div>
</div>
</TkPopover>
<br />
<TkPopover position="bottom">
<TkButton slot="trigger" label="Bottom Placement" />
<div slot="content" className="flex flex-col gap-2 w-[300px]">
  <div className="flex justify-between items-center ">
    <div className="flex gap-2">
      <TkIcon icon="bolt" variant="neutral" sign />
      <span className="text-lg font-bold text-neutral-900">
        Popover Header
      </span>
    </div>
    <TkButton icon="close" type="text" size="small" variant="neutral" />
  </div>
  <div className="flex flex-col gap-2">
    <span>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
      quos.
    </span>
  </div>
</div>
</TkPopover>`;

  const demo = (
    <div className="">
      <TkPopover position="top">
        <TkButton slot="trigger" label="Top Placement" />
        <div slot="content" className="flex flex-col gap-2 w-[300px]">
          <div className="flex justify-between items-center ">
            <div className="flex gap-2">
              <TkIcon icon="bolt" variant="neutral" sign />
              <span className="text-lg font-bold text-neutral-900">
                Popover Header
              </span>
            </div>
            <TkButton icon="close" type="text" size="small" variant="neutral" />
          </div>
          <div className="flex flex-col gap-2">
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </span>
          </div>
        </div>
      </TkPopover>
      <br />
      <TkPopover position="right">
        <TkButton slot="trigger" label="Right Placement" />
        <div slot="content" className="flex flex-col gap-2 w-[300px]">
          <div className="flex justify-between items-center ">
            <div className="flex gap-2">
              <TkIcon icon="bolt" variant="neutral" sign />
              <span className="text-lg font-bold text-neutral-900">
                Popover Header
              </span>
            </div>
            <TkButton icon="close" type="text" size="small" variant="neutral" />
          </div>
          <div className="flex flex-col gap-2">
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </span>
          </div>
        </div>
      </TkPopover>
      <br />
      <TkPopover position="left">
        <TkButton slot="trigger" label="Left Placement" />
        <div slot="content" className="flex flex-col gap-2 w-[300px]">
          <div className="flex justify-between items-center ">
            <div className="flex gap-2">
              <TkIcon icon="bolt" variant="neutral" sign />
              <span className="text-lg font-bold text-neutral-900">
                Popover Header
              </span>
            </div>
            <TkButton icon="close" type="text" size="small" variant="neutral" />
          </div>
          <div className="flex flex-col gap-2">
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </span>
          </div>
        </div>
      </TkPopover>
      <br />
      <TkPopover position="bottom">
        <TkButton slot="trigger" label="Bottom Placement" />
        <div slot="content" className="flex flex-col gap-2 w-[300px]">
          <div className="flex justify-between items-center ">
            <div className="flex gap-2">
              <TkIcon icon="bolt" variant="neutral" sign />
              <span className="text-lg font-bold text-neutral-900">
                Popover Header
              </span>
            </div>
            <TkButton icon="close" type="text" size="small" variant="neutral" />
          </div>
          <div className="flex flex-col gap-2">
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </span>
          </div>
        </div>
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
