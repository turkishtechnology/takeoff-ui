import { TkTooltip, TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Position = () => {
  const reactCode = `<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="top"
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
  variant="dark"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="left"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="bottom"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkTooltip>`;

  const vueCode = `<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="top"
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
  variant="dark"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="left"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkTooltip>
<TkTooltip
  header="Tooltip Header"
  description="Tooltip Explanation Here"
  position="bottom"
  icon="flight"
  variant="dark"
>
  <TkButton slot="trigger" label="Hover Me!"></TkButton>
</TkTooltip>`;

  const demo = (
    <div className="">
      <TkTooltip
        header="Tooltip Header"
        description="Tooltip Explanation Here"
        position="top"
        icon="flight"
        variant="dark"
      >
        <TkButton slot="trigger" label="Top Placement" />
      </TkTooltip>
      <br />
      <TkTooltip
        header="Tooltip Header"
        description="Tooltip Explanation Here"
        position="right"
        icon="flight"
        variant="dark"
      >
        <TkButton slot="trigger" label="Right Placement" />
      </TkTooltip>
      <br />
      <TkTooltip
        header="Tooltip Header"
        description="Tooltip Explanation Here"
        position="left"
        icon="flight"
        variant="dark"
      >
        <TkButton slot="trigger" label="Left Placement" />
      </TkTooltip>
      <br />
      <TkTooltip
        header="Tooltip Header"
        description="Tooltip Explanation Here"
        position="bottom"
        icon="flight"
        variant="dark"
      >
        <TkButton slot="trigger" label="Bottom Placement" />
      </TkTooltip>
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
