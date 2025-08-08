import { TkTooltip, TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Position = () => {
  const reactCode = `<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="top-start"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Top Start" />
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="top"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Top" />
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="top-end"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Top End" />
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="right-start"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Right Start" />
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="right"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Right" />
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="right-end"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Right End" />
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="left-start"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Left Start" />
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="left"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Left" />
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="left-end"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Left End" />
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="bottom-start"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Bottom Start" />
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="bottom"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Bottom" />
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="bottom-end"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Bottom End" />
</TkTooltip>`;
  const vueCode = `<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="top-start"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Top Start" />
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="top"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Top" />
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="top-end"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Top End" />
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="right-start"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Right Start" />
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="right"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Right" />
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="right-end"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Right End" />
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="left-start"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Left Start" />
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="left"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Left" />
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="left-end"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Left End" />
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="bottom-start"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Bottom Start" />
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="bottom"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Bottom" />
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="bottom-end"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Bottom End" />
</TkTooltip>`;

  const angularCode = `<tk-tooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="top-start"
  icon="flight"
  variant="dark"
>
  <tk-button slot="trigger" label="Top Start" />
</tk-tooltip>
<tk-tooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="top"
  icon="flight"
  variant="dark"
>
  <tk-button slot="trigger" label="Top" />
</tk-tooltip>
<tk-tooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="top-end"
  icon="flight"
  variant="dark"
>
  <tk-button slot="trigger" label="Top End" />
</tk-tooltip>
<tk-tooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="right-start"
  icon="flight"
  variant="dark"
>
  <tk-button slot="trigger" label="Right Start" />
</tk-tooltip>
<tk-tooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="right"
  icon="flight"
  variant="dark"
>
  <tk-button slot="trigger" label="Right" />
</tk-tooltip>
<tk-tooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="right-end"
  icon="flight"
  variant="dark"
>
  <tk-button slot="trigger" label="Right End" />
</tk-tooltip>
<tk-tooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="left-start"
  icon="flight"
  variant="dark"
>
  <tk-button slot="trigger" label="Left Start" />
</tk-tooltip>
<tk-tooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="left"
  icon="flight"
  variant="dark"
>
  <tk-button slot="trigger" label="Left" />
</tk-tooltip>
<tk-tooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="left-end"
  icon="flight"
  variant="dark"
>
  <tk-button slot="trigger" label="Left End" />
</tk-tooltip>
<tk-tooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="bottom-start"
  icon="flight"
  variant="dark"
>
  <tk-button slot="trigger" label="Bottom Start" />
</tk-tooltip>
<tk-tooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="bottom"
  icon="flight"
  variant="dark"
>
  <tk-button slot="trigger" label="Bottom" />
</tk-tooltip>
<tk-tooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="bottom-end"
  icon="flight"
  variant="dark"
>
  <tk-button slot="trigger" label="Bottom End" />
</tk-tooltip>`;

  const demo = (
    <div className="flex flex-col m-8">
      <div className="flex justify-center gap-2">
        <TkTooltip header="Tooltip Header" description="Tooltip Explanation Here" position="top-start" icon="flight" variant="dark">
          <TkButton slot="trigger" label="Top Start" />
        </TkTooltip>
        <TkTooltip header="Tooltip Header" description="Tooltip Explanation Here" position="top" icon="flight" variant="dark">
          <TkButton slot="trigger" label="Top" />
        </TkTooltip>
        <TkTooltip header="Tooltip Header" description="Tooltip Explanation Here" position="top-end" icon="flight" variant="dark">
          <TkButton slot="trigger" label="Top End" />
        </TkTooltip>
      </div>
      <div className="flex space-between justify-between">
        <div className="flex flex-col gap-2">
          <TkTooltip header="Tooltip Header" description="Tooltip Explanation Here" position="right-start" icon="flight" variant="dark">
            <TkButton slot="trigger" label="Right Start" />
          </TkTooltip>
          <TkTooltip header="Tooltip Header" description="Tooltip Explanation Here" position="right" icon="flight" variant="dark">
            <TkButton slot="trigger" label="Right" />
          </TkTooltip>
          <TkTooltip header="Tooltip Header" description="Tooltip Explanation Here" position="right-end" icon="flight" variant="dark">
            <TkButton slot="trigger" label="Right End" />
          </TkTooltip>
        </div>
        <div className="flex flex-col items-end gap-2">
          <TkTooltip header="Tooltip Header" description="Tooltip Explanation Here" position="left-start" icon="flight" variant="dark">
            <TkButton slot="trigger" label="Left Start" />
          </TkTooltip>
          <TkTooltip header="Tooltip Header" description="Tooltip Explanation Here" position="left" icon="flight" variant="dark">
            <TkButton slot="trigger" label="Left" />
          </TkTooltip>
          <TkTooltip header="Tooltip Header" description="Tooltip Explanation Here" position="left-end" icon="flight" variant="dark">
            <TkButton slot="trigger" label="Left End" />
          </TkTooltip>
        </div>
      </div>
      <div className="flex justify-center gap-2">
        <TkTooltip header="Tooltip Header" description="Tooltip Explanation Here" position="bottom-start" icon="flight" variant="dark">
          <TkButton slot="trigger" label="Bottom Start" />
        </TkTooltip>
        <TkTooltip header="Tooltip Header" description="Tooltip Explanation Here" position="bottom" icon="flight" variant="dark">
          <TkButton slot="trigger" label="Bottom" />
        </TkTooltip>
        <TkTooltip header="Tooltip Header" description="Tooltip Explanation Here" position="bottom-end" icon="flight" variant="dark">
          <TkButton slot="trigger" label="Bottom End" />
        </TkTooltip>
      </div>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Position;
