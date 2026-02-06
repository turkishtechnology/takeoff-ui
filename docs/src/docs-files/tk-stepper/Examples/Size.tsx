import React from 'react';
import { TkStepper, TkStep, TkDivider } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Size = () => {
  const reactCode = `<TkStepper size="xsmall">
  <TkStep header="Information" subheader="Details" />
  <TkStep header="Details" subheader="Categorization" />
  <TkStep header="Communication" subheader="Communication" />
</TkStepper>

<TkStepper size="small">
  <TkStep header="Information" subheader="Details" />
  <TkStep header="Details" subheader="Categorization" />
  <TkStep header="Communication" subheader="Communication" />
</TkStepper>

<TkStepper>
  <TkStep header="Information" subheader="Details" />
  <TkStep header="Details" subheader="Categorization" />
  <TkStep header="Communication" subheader="Communication" />
</TkStepper>

<TkStepper size="large">
  <TkStep header="Information" subheader="Details" />
  <TkStep header="Details" subheader="Categorization" />
  <TkStep header="Communication" subheader="Communication" />
</TkStepper>`;

  const vueCode = `<tk-stepper size="xsmall">
  <tk-step header="Information" subheader="Details" />
  <tk-step header="Details" subheader="Categorization" />
  <tk-step header="Communication" subheader="Communication" />
</tk-stepper>

<tk-stepper size="small">
  <tk-step header="Information" subheader="Details" />
  <tk-step header="Details" subheader="Categorization" />
  <tk-step header="Communication" subheader="Communication" />
</tk-stepper>

<tk-stepper>
  <tk-step header="Information" subheader="Details" />
  <tk-step header="Details" subheader="Categorization" />
  <tk-step header="Communication" subheader="Communication" />
</tk-stepper>

<tk-stepper size="large">
  <tk-step header="Information" subheader="Details" />
  <tk-step header="Details" subheader="Categorization" />
  <tk-step header="Communication" subheader="Communication" />
</tk-stepper>`;

  const angularCode = `<tk-stepper size="xsmall">
  <tk-step header="Information" subheader="Details"></tk-step>
  <tk-step header="Details" subheader="Categorization"></tk-step>
  <tk-step header="Communication" subheader="Communication"></tk-step>
</tk-stepper>

<tk-stepper size="small">
  <tk-step header="Information" subheader="Details"></tk-step>
  <tk-step header="Details" subheader="Categorization"></tk-step>
  <tk-step header="Communication" subheader="Communication"></tk-step>
</tk-stepper>

<tk-stepper>
  <tk-step header="Information" subheader="Details"></tk-step>
  <tk-step header="Details" subheader="Categorization"></tk-step>
  <tk-step header="Communication" subheader="Communication"></tk-step>
</tk-stepper>

<tk-stepper size="large">
  <tk-step header="Information" subheader="Details"></tk-step>
  <tk-step header="Details" subheader="Categorization"></tk-step>
  <tk-step header="Communication" subheader="Communication"></tk-step>
</tk-stepper>`;

  const demo = (
    <>
      <div>
        <p className="font-medium mb-4">Xsmall</p>
        <TkStepper size="xsmall" containerStyle={{ paddingInline: '20px' }}>
          <TkStep header="Information" subheader="Details" />
          <TkStep header="Details" subheader="Categorization" />
          <TkStep header="Communication" subheader="Communication" />
        </TkStepper>
      </div>
      <TkDivider className="my-8" />
      <div>
        <p className="font-medium mb-4">Small</p>
        <TkStepper size="small" containerStyle={{ paddingInline: '20px' }}>
          <TkStep header="Information" subheader="Details" />
          <TkStep header="Details" subheader="Categorization" />
          <TkStep header="Communication" subheader="Communication" />
        </TkStepper>
      </div>
      <TkDivider className="my-8" />
      <div>
        <p className="font-medium mb-4">Base</p>
        <TkStepper containerStyle={{ paddingInline: '20px' }}>
          <TkStep header="Information" subheader="Details" />
          <TkStep header="Details" subheader="Categorization" />
          <TkStep header="Communication" subheader="Communication" />
        </TkStepper>
      </div>
      <TkDivider className="my-8" />
      <div>
        <p className="font-medium mb-4">Large</p>
        <TkStepper size="large" containerStyle={{ paddingInline: '20px' }}>
          <TkStep header="Information" subheader="Details" />
          <TkStep header="Details" subheader="Categorization" />
          <TkStep header="Communication" subheader="Communication" />
        </TkStepper>
      </div>
    </>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode} />;
};

export default Size;
