import { TkAlert, TkDivider } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Messages = () => {
  const reactCode = `<TkAlert
  variant="success"
  type="outlined"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
/>

<TkAlert
  variant="success"
  type="outlined"
  header="Success Filled Alert"
  message={[
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    "Dummy text of the printing and typesetting",
    "Lorem Ipsum has been the industry's standard.",
  ]}
/>`;

  const vueCode = `<TkAlert
  variant="success"
  type="outlined"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
/>

<TkAlert
  variant="success"
  type="outlined"
  header="Success Filled Alert"
  :message='[
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    "Dummy text of the printing and typesetting",
    "Lorem Ipsum has been the industry's standard.",
  ]'
/>
`;

  const demo = (
    <>
      <div className="mb-4 flex flex-col gap-2">
        <div className="title-h6">Single Message View</div>
        <TkAlert
          variant="success"
          type="outlined"
          header="Success Filled Alert"
          message="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        />
        <TkDivider />
        <div className="title-h6">Multi Message View</div>
        <TkAlert
          variant="success"
          type="outlined"
          header="Success Filled Alert"
          message={[
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
            'Dummy text of the printing and typesetting',
            "Lorem Ipsum has been the industry's standard.",
          ]}
        />
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

export default Messages;
