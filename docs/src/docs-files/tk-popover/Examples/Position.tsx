import { TkPopover, TkButton, TkIcon } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Position = () => {
  const reactCode = `<TkPopover position="top-start">
  <TkButton slot="trigger" label="Top Start" />
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
<TkPopover position="top">
  <TkButton slot="trigger" label="Top" />
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
<TkPopover position="top-end">
  <TkButton slot="trigger" label="Top End" />
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
<TkPopover position="right-start">
  <TkButton slot="trigger" label="Right Start" />
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
<TkPopover position="right">
  <TkButton slot="trigger" label="Right" />
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
<TkPopover position="right-end">
  <TkButton slot="trigger" label="Right End" />
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
<TkPopover position="left-start">
  <TkButton slot="trigger" label="Left Start" />
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
<TkPopover position="left">
  <TkButton slot="trigger" label="Left" />
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
<TkPopover position="left-end">
  <TkButton slot="trigger" label="Left End" />
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
<TkPopover position="bottom-start">
  <TkButton slot="trigger" label="Bottom Start" />
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
<TkPopover position="bottom">
  <TkButton slot="trigger" label="Bottom" />
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
<TkPopover position="bottom-end">
  <TkButton slot="trigger" label="Bottom End" />
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

  const vueCode = `<TkPopover position="top-start">
  <TkButton slot="trigger" label="Top Start" />
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
<TkPopover position="top">
  <TkButton slot="trigger" label="Top" />
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
<TkPopover position="top-end">
  <TkButton slot="trigger" label="Top End" />
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
<TkPopover position="right-start">
  <TkButton slot="trigger" label="Right Start" />
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
<TkPopover position="right">
  <TkButton slot="trigger" label="Right" />
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
<TkPopover position="right-end">
  <TkButton slot="trigger" label="Right End" />
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
<TkPopover position="left-start">
  <TkButton slot="trigger" label="Left Start" />
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
<TkPopover position="left">
  <TkButton slot="trigger" label="Left" />
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
<TkPopover position="left-end">
  <TkButton slot="trigger" label="Left End" />
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
<TkPopover position="bottom-start">
  <TkButton slot="trigger" label="Bottom Start" />
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
<TkPopover position="bottom">
  <TkButton slot="trigger" label="Bottom" />
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
<TkPopover position="bottom-end">
  <TkButton slot="trigger" label="Bottom End" />
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
    <div className="circle-layout">
      <style>
        {`
          .circle-layout {
            position: relative;
            width: 500px;
            height: 500px;
            margin: 50px auto;
          }
          .circle-layout > * {
            position: absolute;
            transform: translate(-50%, -50%);
          }
          .circle-layout > *:nth-child(2) { top: 10%; left: 20%; } /* top-start */
          .circle-layout > *:nth-child(3) { top: 0%; left: 50%; } /* top*/
          .circle-layout > *:nth-child(4) { top: 10%; left: 80%; } /* top-end */
          .circle-layout > *:nth-child(5) { top: 30%; left: 90%; } /* right-start */
          .circle-layout > *:nth-child(6) { top: 50%; left: 100%; } /* right */
          .circle-layout > *:nth-child(7) { top: 70%; left: 90%; } /* right-end */
          .circle-layout > *:nth-child(8) { top: 70%; left: 10%; } /* left-start */
          .circle-layout > *:nth-child(9) { top: 50%; left: 10%; } /* left */
          .circle-layout > *:nth-child(10) { top: 30%; left: 10%; } /* left-end */
          .circle-layout > *:nth-child(11) { top: 90%; left: 20%; } /* bottom-start */
          .circle-layout > *:nth-child(12) { top: 100%; left: 50%; } /* bottom */
          .circle-layout > *:nth-child(13) { top: 90%; left: 80%; } /* bottom-end */
        `}
      </style>
      <TkPopover position="top-start">
        <TkButton slot="trigger" label="Top Start" />
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
      <TkPopover position="top">
        <TkButton slot="trigger" label="Top" />
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
      <TkPopover position="top-end">
        <TkButton slot="trigger" label="Top End" />
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
      <TkPopover position="right-start">
        <TkButton slot="trigger" label="Right Start" />
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
      <TkPopover position="right">
        <TkButton slot="trigger" label="Right" />
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
      <TkPopover position="right-end">
        <TkButton slot="trigger" label="Right End" />
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
      <TkPopover position="left-start">
        <TkButton slot="trigger" label="Left Start" />
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
      <TkPopover position="left">
        <TkButton slot="trigger" label="Left" />
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
      <TkPopover position="left-end">
        <TkButton slot="trigger" label="Left End" />
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
      <TkPopover position="bottom-start">
        <TkButton slot="trigger" label="Bottom Start" />
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
      <TkPopover position="bottom">
        <TkButton slot="trigger" label="Bottom" />
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
      <TkPopover position="bottom-end">
        <TkButton slot="trigger" label="Bottom End" />
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
