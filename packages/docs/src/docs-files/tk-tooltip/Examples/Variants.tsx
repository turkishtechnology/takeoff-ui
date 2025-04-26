import { TkTooltip, TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Variants = () => {
  const reactCode = `<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="right"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="right"
  icon="flight"
  variant="white"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="right"
  icon="flight"
  variant="info"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="right"
  icon="flight"
  variant="success"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="right"
  icon="flight"
  variant="danger"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="right"
  icon="flight"
  variant="warning"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="right"
  icon="flight"
  variant="neutral"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkTooltip>`;

  const vueCode = `<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="right"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="right"
  icon="flight"
  variant="white"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="right"
  icon="flight"
  variant="info"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="right"
  icon="flight"
  variant="success"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="right"
  icon="flight"
  variant="danger"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="right"
  icon="flight"
  variant="warning"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="right"
  icon="flight"
  variant="neutral"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkTooltip>`;

  const demo = (
    <>
      <div>
        <TkTooltip
          header="Tooltip Header"
          description="Tooltip Explanation Here"
          position="right"
          icon="flight"
          variant="dark"
        >
          <TkButton
            slot="trigger"
            data-tooltip-trigger
            label="   Dark (Hover Me!)"
          />
        </TkTooltip>
      </div>
      <br />
      <div>
        <TkTooltip
          header="Tooltip Header"
          description="Tooltip Explanation Here"
          position="right"
          icon="flight"
          variant="white"
        >
          <TkButton
            slot="trigger"
            data-tooltip-trigger
            label="   White (Hover Me!)"
          />
        </TkTooltip>
      </div>
      <br />
      <div>
        <TkTooltip
          header="Tooltip Header"
          description="Tooltip Explanation Here"
          position="right"
          icon="flight"
          variant="info"
        >
          <TkButton
            slot="trigger"
            data-tooltip-trigger
            label="   Info (Hover Me!)"
          />
        </TkTooltip>
      </div>
      <br />
      <div>
        <TkTooltip
          header="Tooltip Header"
          description="Tooltip Explanation Here"
          position="right"
          icon="flight"
          variant="success"
        >
          <TkButton
            slot="trigger"
            data-tooltip-trigger
            label="   Success (Hover Me!)"
          />
        </TkTooltip>
      </div>
      <br />
      <div>
        <TkTooltip
          header="Tooltip Header"
          description="Tooltip Explanation Here"
          position="right"
          icon="flight"
          variant="danger"
        >
          <TkButton
            slot="trigger"
            data-tooltip-trigger
            label="   Danger (Hover Me!)"
          />
        </TkTooltip>
      </div>
      <br />
      <div>
        <TkTooltip
          header="Tooltip Header"
          description="Tooltip Explanation Here"
          position="right"
          icon="flight"
          variant="warning"
        >
          <TkButton
            slot="trigger"
            data-tooltip-trigger
            label="   Warning (Hover Me!)"
          />
        </TkTooltip>
      </div>
      <br />
      <div>
        <TkTooltip
          header="Tooltip Header"
          description="Tooltip Explanation Here"
          position="right"
          icon="flight"
          variant="neutral"
        >
          <TkButton
            slot="trigger"
            data-tooltip-trigger
            label="   Neutral (Hover Me!)"
          />
        </TkTooltip>
      </div>
    </>
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

export default Variants;
