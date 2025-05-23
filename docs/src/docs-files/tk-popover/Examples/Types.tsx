import { TkPopover, TkButton, TkIcon } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Types = () => {
  const reactCode = `<TkPopover type="basic">
  <TkButton slot="trigger" label="Click Me!"></TkButton>
  <div slot="content" className="flex flex-col gap-2 w-[300px]">
    <div className="flex justify-between items-center">
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

<TkPopover type="white">
  <TkButton slot="trigger" label="Click Me!"></TkButton>
  <div slot="content" className="flex flex-col gap-2 w-[300px]">
    <div className="flex justify-between items-center">
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

<TkPopover type="dark">
  <TkButton slot="trigger" label="Click Me!"></TkButton>
  <div slot="content" className="flex flex-col gap-2 w-[300px]">
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        <TkIcon icon="bolt" variant="neutral" sign />
        <span className="text-lg font-bold text-neutral-100">
          Popover Header
        </span>
      </div>
      <TkButton icon="close" type="text" size="small" variant="white" />
    </div>
    <div className="flex flex-col gap-2 text-neutral-100">
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.
      </span>
    </div>
  </div>
</TkPopover>`;

  const vueCode = `<TkPopover type="basic">
  <TkButton slot="trigger" label="Click Me!"></TkButton>
  <div slot="content" class="flex flex-col gap-2 w-[300px]">
    <div class="flex justify-between items-center">
      <div class="flex gap-2">
        <TkIcon icon="bolt" variant="neutral" sign />
        <span class="text-lg font-bold text-neutral-900">
          Popover Header
        </span>
      </div>
      <TkButton icon="close" type="text" size="small" variant="neutral" />
    </div>
    <div class="flex flex-col gap-2">
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.
      </span>
    </div>
  </div>
</TkPopover>

<TkPopover type="white">
  <TkButton slot="trigger" label="Click Me!"></TkButton>
  <div slot="content" class="flex flex-col gap-2 w-[300px]">
    <div class="flex justify-between items-center">
      <div class="flex gap-2">
        <TkIcon icon="bolt" variant="neutral" sign />
        <span class="text-lg font-bold text-neutral-900">
          Popover Header
        </span>
      </div>
      <TkButton icon="close" type="text" size="small" variant="neutral" />
    </div>
    <div class="flex flex-col gap-2">
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.
      </span>
    </div>
  </div>
</TkPopover>

<TkPopover type="dark">
  <TkButton slot="trigger" label="Click Me!"></TkButton>
  <div slot="content" class="flex flex-col gap-2 w-[300px]">
    <div class="flex justify-between items-center">
      <div class="flex gap-2">
        <TkIcon icon="bolt" variant="neutral" sign />
        <span class="text-lg font-bold text-neutral-100">
          Popover Header
        </span>
      </div>
      <TkButton icon="close" type="text" size="small" variant="white" />
    </div>
    <div class="flex flex-col gap-2 text-neutral-100">
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.
      </span>
    </div>
  </div>
</TkPopover>`;

  const demo = (
    <div className="">
      <TkPopover type="basic">
        <TkButton slot="trigger" label="Click Me!"></TkButton>
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
      <TkPopover type="white">
        <TkButton slot="trigger" label="Click Me!"></TkButton>
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
      <TkPopover type="dark">
        <TkButton slot="trigger" label="Click Me!"></TkButton>
        <div slot="content" className="flex flex-col gap-2 w-[300px]">
          <div className="flex justify-between items-center ">
            <div className="flex gap-2">
              <TkIcon icon="bolt" variant="neutral" sign />
              <span className="text-lg font-bold text-neutral-100">
                Popover Header
              </span>
            </div>
            <TkButton icon="close" type="text" size="small" variant="white" />
          </div>
          <div className="flex flex-col gap-2 text-neutral-100">
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

export default Types;
