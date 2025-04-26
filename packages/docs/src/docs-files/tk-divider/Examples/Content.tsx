import { TkButton, TkDivider } from '@takeoff-ui/react';
import React from 'react';
import FeatureDemo from '../../../components/FeatureDemo';

const Content = () => {
  const reactCode = `<TkDivider>Content</TkDivider>
<TkDivider>
    <TkButton type="outlined" variant="neutral" size="small" label="Button"></TkButton>
</TkDivider>`;

  const vueCode = `<TkDivider>Content</TkDivider>
<TkDivider>
    <TkButton type="outlined" variant="neutral" size="small" label="Button"></TkButton>
</TkDivider>`;

  const demo = (
    <div className="flex flex-col">
      <TkDivider>Content</TkDivider>
      <TkDivider>
        <TkButton
          type="outlined"
          variant="neutral"
          size="small"
          label="Button"
        ></TkButton>
      </TkDivider>
    </div>
  );

  return (
    <>
      <FeatureDemo
        demo={demo}
        reactCode={reactCode}
        vueCode={vueCode}
        angularCode={''}
      ></FeatureDemo>
    </>
  );
};
export default Content;
