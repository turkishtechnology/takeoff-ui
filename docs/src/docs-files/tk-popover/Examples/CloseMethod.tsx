import { TkPopover, TkButton, TkIcon } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useRef } from 'react';

const CloseMethod = () => {
  const reactCode = `import { TkPopover, TkButton, TkIcon } from '@takeoff-ui/react';
import React, { useRef } from 'react';

const PopoverCloseMethod = () => {
  const popoverRef = useRef<HTMLTkPopoverElement>(null);

  return (
    <div>
      <TkPopover ref={popoverRef} >
        <TkButton slot="trigger" label="Inner Close Button" />
        <div slot="content" className="flex flex-col gap-2 w-[300px]">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <TkIcon icon="bolt" variant="neutral" sign />
              <span className="text-lg font-bold text-neutral-900">
                Popover Header
              </span>
            </div>
            <TkButton
              icon="close"
              type="text"
              size="small"
              variant="neutral"
              onTkClick={() => popoverRef.current?.close()}
            />
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
};

export default PopoverCloseMethod;`;

  const vueCode = `<template>
  <div>
    <TkPopover ref="popoverRef" >
      <TkButton slot="trigger" label="Inner Close Button" />
      <div slot="content" class="flex flex-col gap-2 w-[300px]">
        <div class="flex justify-between items-center">
          <div class="flex gap-2">
            <TkIcon icon="bolt" variant="neutral" sign />
            <span class="text-lg font-bold text-neutral-900">
              Popover Header
            </span>
          </div>
          <TkButton
            icon="close"
            type="text"
            size="small"
            variant="neutral"
            @tk-click="()=>  popoverRef.$el.close()"
          />
        </div>
        <div class="flex flex-col gap-2">
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </span>
        </div>
      </div>
    </TkPopover>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TkPopover, TkButton, TkIcon } from '@takeoff-ui/vue';

const popoverRef = ref(null);
</script>`;

  const popoverRef = useRef<HTMLTkPopoverElement>(null);

  const demo = (
    <div className="">
      <TkPopover ref={popoverRef}>
        <TkButton slot="trigger" label="Inner Close Button" />
        <div slot="content" className="flex flex-col gap-2 w-[300px]">
          <div className="flex justify-between items-center ">
            <div className="flex gap-2">
              <TkIcon icon="bolt" variant="neutral" sign />
              <span className="text-lg font-bold text-neutral-900">
                Popover Header
              </span>
            </div>
            <TkButton
              icon="close"
              type="text"
              size="small"
              variant="neutral"
              onTkClick={() => popoverRef.current?.close()}
            />
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

export default CloseMethod;
