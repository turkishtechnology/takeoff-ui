import { TkPopover, TkButton, TkIcon } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Position = () => {
  const reactCode = `<TkPopover position="top-start">
  <TkButton slot="trigger" label="Top Start" />
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
<TkPopover position="top">
  <TkButton slot="trigger" label="Top" />
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
<TkPopover position="top-end">
  <TkButton slot="trigger" label="Top End" />
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
<TkPopover position="right-start">
  <TkButton slot="trigger" label="Right Start" />
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
<TkPopover position="right">
  <TkButton slot="trigger" label="Right" />
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
<TkPopover position="right-end">
  <TkButton slot="trigger" label="Right End" />
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
<TkPopover position="left-start">
  <TkButton slot="trigger" label="Left Start" />
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
<TkPopover position="left">
  <TkButton slot="trigger" label="Left" />
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
<TkPopover position="left-end">
  <TkButton slot="trigger" label="Left End" />
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
<TkPopover position="bottom-start">
  <TkButton slot="trigger" label="Bottom Start" />
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
<TkPopover position="bottom">
  <TkButton slot="trigger" label="Bottom" />
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
<TkPopover position="bottom-end">
  <TkButton slot="trigger" label="Bottom End" />
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
</TkPopover>`;

  const vueCode = `<TkPopover position="top-start">
  <TkButton slot="trigger" label="Top Start" />
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
<TkPopover position="top">
  <TkButton slot="trigger" label="Top" />
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
<TkPopover position="top-end">
  <TkButton slot="trigger" label="Top End" />
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
<TkPopover position="right-start">
  <TkButton slot="trigger" label="Right Start" />
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
<TkPopover position="right">
  <TkButton slot="trigger" label="Right" />
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
<TkPopover position="right-end">
  <TkButton slot="trigger" label="Right End" />
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
<TkPopover position="left-start">
  <TkButton slot="trigger" label="Left Start" />
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
<TkPopover position="left">
  <TkButton slot="trigger" label="Left" />
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
<TkPopover position="left-end">
  <TkButton slot="trigger" label="Left End" />
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
<TkPopover position="bottom-start">
  <TkButton slot="trigger" label="Bottom Start" />
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
<TkPopover position="bottom">
  <TkButton slot="trigger" label="Bottom" />
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
<TkPopover position="bottom-end">
  <TkButton slot="trigger" label="Bottom End" />
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
</TkPopover>`;

  const demo = (
    <div className="flex flex-col m-8">
      <div className="flex justify-center gap-2">
        <TkPopover position="top-start">
          <TkButton slot="trigger" label="Top Start" />
          <div slot="content" className="flex flex-col gap-2 w-[300px]">
            <div className="flex gap-2">
              <TkIcon icon="bolt" variant="neutral" sign />
              <span className="text-lg font-bold text-neutral-900">
                Popover Header
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos.
              </span>
            </div>
          </div>
        </TkPopover>
        <TkPopover position="top">
          <TkButton slot="trigger" label="Top" />
          <div slot="content" className="flex flex-col gap-2 w-[300px]">
            <div className="flex gap-2">
              <TkIcon icon="bolt" variant="neutral" sign />
              <span className="text-lg font-bold text-neutral-900">
                Popover Header
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos.
              </span>
            </div>
          </div>
        </TkPopover>
        <TkPopover position="top-end">
          <TkButton slot="trigger" label="Top End" />
          <div slot="content" className="flex flex-col gap-2 w-[300px]">
            <div className="flex gap-2">
              <TkIcon icon="bolt" variant="neutral" sign />
              <span className="text-lg font-bold text-neutral-900">
                Popover Header
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos.
              </span>
            </div>
          </div>
        </TkPopover>
      </div>
      <div className="flex space-between justify-between">
        <div className="flex flex-col gap-2">
          <TkPopover position="right-start">
            <TkButton slot="trigger" label="Right Start" />
            <div slot="content" className="flex flex-col gap-2 w-[300px]">
              <div className="flex gap-2">
                <TkIcon icon="bolt" variant="neutral" sign />
                <span className="text-lg font-bold text-neutral-900">
                  Popover Header
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quos.
                </span>
              </div>
            </div>
          </TkPopover>
          <TkPopover position="right">
            <TkButton slot="trigger" label="Right" />
            <div slot="content" className="flex flex-col gap-2 w-[300px]">
              <div className="flex gap-2">
                <TkIcon icon="bolt" variant="neutral" sign />
                <span className="text-lg font-bold text-neutral-900">
                  Popover Header
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quos.
                </span>
              </div>
            </div>
          </TkPopover>
          <TkPopover position="right-end">
            <TkButton slot="trigger" label="Right End" />
            <div slot="content" className="flex flex-col gap-2 w-[300px]">
              <div className="flex gap-2">
                <TkIcon icon="bolt" variant="neutral" sign />
                <span className="text-lg font-bold text-neutral-900">
                  Popover Header
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quos.
                </span>
              </div>
            </div>
          </TkPopover>
        </div>
        <div className="flex flex-col items-end gap-2">
          <TkPopover position="left-start">
            <TkButton slot="trigger" label="Left Start" />
            <div slot="content" className="flex flex-col gap-2 w-[300px]">
              <div className="flex gap-2">
                <TkIcon icon="bolt" variant="neutral" sign />
                <span className="text-lg font-bold text-neutral-900">
                  Popover Header
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quos.
                </span>
              </div>
            </div>
          </TkPopover>
          <TkPopover position="left">
            <TkButton slot="trigger" label="Left" />
            <div slot="content" className="flex flex-col gap-2 w-[300px]">
              <div className="flex gap-2">
                <TkIcon icon="bolt" variant="neutral" sign />
                <span className="text-lg font-bold text-neutral-900">
                  Popover Header
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quos.
                </span>
              </div>
            </div>
          </TkPopover>
          <TkPopover position="left-end">
            <TkButton slot="trigger" label="Left End" />
            <div slot="content" className="flex flex-col gap-2 w-[300px]">
              <div className="flex gap-2">
                <TkIcon icon="bolt" variant="neutral" sign />
                <span className="text-lg font-bold text-neutral-900">
                  Popover Header
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quos.
                </span>
              </div>
            </div>
          </TkPopover>
        </div>
      </div>
      <div className="flex justify-center gap-2">
        <TkPopover position="bottom-start">
          <TkButton slot="trigger" label="Bottom Start" />
          <div slot="content" className="flex flex-col gap-2 w-[300px]">
            <div className="flex gap-2">
              <TkIcon icon="bolt" variant="neutral" sign />
              <span className="text-lg font-bold text-neutral-900">
                Popover Header
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos.
              </span>
            </div>
          </div>
        </TkPopover>
        <TkPopover position="bottom">
          <TkButton slot="trigger" label="Bottom" />
          <div slot="content" className="flex flex-col gap-2 w-[300px]">
            <div className="flex gap-2">
              <TkIcon icon="bolt" variant="neutral" sign />
              <span className="text-lg font-bold text-neutral-900">
                Popover Header
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos.
              </span>
            </div>
          </div>
        </TkPopover>
        <TkPopover position="bottom-end">
          <TkButton slot="trigger" label="Bottom End" />
          <div slot="content" className="flex flex-col gap-2 w-[300px]">
            <div className="flex gap-2">
              <TkIcon icon="bolt" variant="neutral" sign />
              <span className="text-lg font-bold text-neutral-900">
                Popover Header
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos.
              </span>
            </div>
          </div>
        </TkPopover>
      </div>
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
