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
      <TkTooltip
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
      </TkTooltip>
    </div>
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={angularCode}
    ></FeatureDemo>
  );
};

export default Position;
