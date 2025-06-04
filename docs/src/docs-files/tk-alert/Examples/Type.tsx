import { TkAlert } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Type = () => {
  const reactCode = `<TkAlert
  variant="success"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
  type="filled"
/>
<TkAlert
  variant="success"
  header="Success FilledLight Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
  type="filledlight"
/>
<TkAlert
  variant="success"
  header="Success Gradient Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
  type="gradient"
/>
<TkAlert
  variant="success"
  header="Success Outlined Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
  type="outlined"
/>`;

  const vueCode = `<TkAlert
  variant="success"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
  type="filled"
/>
<TkAlert
  variant="success"
  header="Success FilledLight Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
  type="filledlight"
/>
<TkAlert
  variant="success"
  header="Success Gradient Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
  type="gradient"
/>
<TkAlert
  variant="success"
  header="Success Outlined Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
  type="outlined"
/>`;

  const angularCode = `<tk-alert
  variant="success"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
  type="filled"
/>
<tk-alert
  variant="success"
  header="Success FilledLight Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
  type="filledlight"
/>
<tk-alert
  variant="success"
  header="Success Gradient Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
  type="gradient"
/>
<tk-alert
  variant="success"
  header="Success Outlined Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
  type="outlined"
/>
`;

  const demo = (
    <>
      <div className="mb-4 flex flex-col gap-2">
        <TkAlert
          variant="success"
          header="Success Filled Alert"
          message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
          type="filled"
        />
        <TkAlert
          variant="success"
          header="Success FilledLight Alert"
          message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
          type="filledlight"
        />
        <TkAlert
          variant="success"
          header="Success Gradient Alert"
          message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
          type="gradient"
        />
        <TkAlert
          variant="success"
          header="Success Outlined Alert"
          message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
          type="outlined"
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
        angularCode={angularCode}
      ></FeatureDemo>
    </>
  );
};

export default Type;
