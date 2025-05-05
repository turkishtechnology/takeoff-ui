import { TkAlert } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Variant = () => {
  const reactCode = `<TkAlert
  variant="success"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
  type="filled"
/>
<TkAlert
  variant="warning"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
  type="filled"
/>
<TkAlert
  variant="info"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
  type="filled"
/>
<TkAlert
  variant="danger"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
  type="filled"
/>
<TkAlert
  variant="neutral"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
  type="filled"
  icon="flight"
/>`;

  const vueCode = `<TkAlert
  variant="success"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
  type="filled"
/>
<TkAlert
  variant="warning"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
  type="filled"
/>
<TkAlert
  variant="info"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
  type="filled"
/>
<TkAlert
  variant="danger"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
  type="filled"
/>
<TkAlert
  variant="neutral"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
  type="filled"
  icon="flight"
/>`;

  const demo = (
    <div className="mb-4 flex flex-col gap-2">
      <TkAlert
        variant="success"
        header="Success Filled Alert"
        message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
        type="filled"
      />
      <TkAlert
        variant="warning"
        header="Success Filled Alert"
        message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
        type="filled"
      />
      <TkAlert
        variant="info"
        header="Success Filled Alert"
        message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
        type="filled"
      />
      <TkAlert
        variant="danger"
        header="Success Filled Alert"
        message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
        type="filled"
      />
      <TkAlert
        variant="neutral"
        header="Success Filled Alert"
        message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
        type="filled"
        icon="flight"
      />
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

export default Variant;
