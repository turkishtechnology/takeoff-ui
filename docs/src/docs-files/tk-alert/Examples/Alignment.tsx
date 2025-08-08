import { TkAlert, TkDivider } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Messages = () => {
  const reactCode = `<TkAlert
  variant="success"
  type="outlined"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  alignItems="start"
/>
<TkAlert
  variant="success"
  type="outlined"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
/>
<TkAlert
  variant="success"
  type="outlined"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  alignItems="end"
/> `;

  const vueCode = `<TkAlert
  variant="success"
  type="outlined"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  align-items="start"
/>
<TkAlert
  variant="success"
  type="outlined"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
/>
<TkAlert
  variant="success"
  type="outlined"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  align-items="end"
/>
`;

  const angularCode = `<tk-alert
  variant="success"
  type="outlined"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  align-items="start"
></tk-alert>

<tk-alert
  variant="success"
  type="outlined"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
></tk-alert>

<tk-alert
  variant="success"
  type="outlined"
  header="Success Filled Alert"
  message="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  align-items="end"
></tk-alert>
`;

  const demo = (
    <>
      <div className="flex gap-2">
        <TkAlert
          variant="success"
          type="outlined"
          header="Success Filled Alert"
          message="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          alignItems="start"
        />
        <TkAlert variant="success" type="outlined" header="Success Filled Alert" message="Lorem Ipsum is simply dummy text of the printing and typesetting industry." />
        <TkAlert
          variant="success"
          type="outlined"
          header="Success Filled Alert"
          message="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          alignItems="end"
        />
      </div>
    </>
  );
  return (
    <>
      <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>
    </>
  );
};

export default Messages;
