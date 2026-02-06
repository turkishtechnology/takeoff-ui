import React from 'react';
import { TkStepper, TkStep, TkDivider } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Mode = () => {
  const reactCode = `<TkStepper>
  <TkStep header="Information" subheader="Details" />
  <TkStep header="Details" subheader="Categorization" />
  <TkStep header="Communication" subheader="Communication" />
</TkStepper>

<TkStepper mode="compact">
  <TkStep header="Information" subheader="Details" />
  <TkStep header="Details" subheader="Categorization" />
  <TkStep header="Communication" subheader="Communication" />
</TkStepper>`;

  const vueCode = `<tk-stepper>
  <tk-step header="Information" subheader="Details" />
  <tk-step header="Details" subheader="Categorization" />
  <tk-step header="Communication" subheader="Communication" />
</tk-stepper>

<tk-stepper mode="compact">
  <tk-step header="Information" subheader="Details" />
  <tk-step header="Details" subheader="Categorization" />
  <tk-step header="Communication" subheader="Communication" />
</tk-stepper>`;

  const angularCode = `<tk-stepper>
  <tk-step header="Information" subheader="Details"></tk-step>
  <tk-step header="Details" subheader="Categorization"></tk-step>
  <tk-step header="Communication" subheader="Communication"></tk-step>
</tk-stepper>

<tk-stepper mode="compact">
  <tk-step header="Information" subheader="Details"></tk-step>
  <tk-step header="Details" subheader="Categorization"></tk-step>
  <tk-step header="Communication" subheader="Communication"></tk-step>
</tk-stepper>`;

  const demo = (
    <>
      <div className="px-4 h-32">
        <p className="font-medium mb-4">Default Mode</p>
        <TkStepper containerStyle={{ paddingInline: '20px' }}>
          <TkStep header="Information" subheader="Details" />
          <TkStep header="Details" subheader="Categorization" />
          <TkStep header="Communication" subheader="Communication" />
        </TkStepper>
      </div>
      <TkDivider />
      <div className="h-32">
        <p className="font-medium mb-8 mx-4">Compact Mode</p>
        <TkStepper mode="compact" containerStyle={{ paddingInline: '20px' }}>
          <TkStep header="Information" subheader="Details" />
          <TkStep header="Details" subheader="Categorization" />
          <TkStep header="Communication" subheader="Communication" />
        </TkStepper>
      </div>
    </>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode} />;
};

export default Mode;
