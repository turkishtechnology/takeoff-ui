import { TkAlert, TkDivider, TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Actions = () => {
  const reactCode = `<TkAlert
  variant="info"
  type="outlined"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
>
  <div slot="right-action" className="flex gap-3">
    <TkButton label="Action1" variant="info" type="text" />
    <TkButton label="Action2" variant="info" type="text" />
  </div>
</TkAlert>

<TkAlert
  variant="info"
  type="outlined"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
>
  <div slot="footer-action" className="flex gap-3">
    <TkButton
        label="Action1"
        variant="info"
        type="outlined"
        size="small"
    />
    <TkButton
        label="Action2"
        variant="info"
        type="filled"
        size="small"
    />
  </div>
</TkAlert>`;

  const vueCode = `<TkAlert
  variant="info"
  type="outlined"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
>
  <div slot="right-action" className="flex gap-3">
    <TkButton label="Action1" variant="info" type="text" />
    <TkButton label="Action2" variant="info" type="text" />
  </div>
</TkAlert>

<TkAlert
  variant="info"
  type="outlined"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
>
  <div slot="footer-action" className="flex gap-3">
    <TkButton
        label="Action1"
        variant="info"
        type="outlined"
        size="small"
    />
    <TkButton
        label="Action2"
        variant="info"
        type="filled"
        size="small"
    />
  </div>
</TkAlert>
`;

  const demo = (
    <>
      <div className="mb-4 flex flex-col gap-2">
        <div className="title-h6">Right Action Slot</div>
        <TkAlert
          variant="info"
          type="outlined"
          header="Success Filled Alert"
          message="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        >
          <div slot="right-action" className="flex gap-3">
            <TkButton label="Action1" variant="info" type="text" />
            <TkButton label="Action2" variant="info" type="text" />
          </div>
        </TkAlert>
        <TkDivider />
        <div className="title-h6">Footer Action Slot</div>
        <TkAlert
          variant="info"
          type="outlined"
          header="Success Filled Alert"
          message="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        >
          <div slot="footer-action" className="flex gap-3">
            <TkButton
              label="Action1"
              variant="info"
              type="outlined"
              size="small"
            />
            <TkButton
              label="Action2"
              variant="info"
              type="filled"
              size="small"
            />
          </div>
        </TkAlert>
      </div>
    </>
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

export default Actions;
