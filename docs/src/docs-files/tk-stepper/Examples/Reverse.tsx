import React from 'react';
import { TkStepper, TkStep, TkDivider } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Reverse = () => {
  const reactCode = `<TkStepper>
  <TkStep header="Information" subheader="Details" />
  <TkStep header="Details" subheader="Categorization" />
  <TkStep header="Communication" subheader="Communication" />
</TkStepper>

<TkStepper reverse>
  <TkStep header="Information" subheader="Details" />
  <TkStep header="Details" subheader="Categorization" />
  <TkStep header="Communication" subheader="Communication" />
</TkStepper>`;

  const vueCode = `<tk-stepper>
  <tk-step header="Information" subheader="Details" />
  <tk-step header="Details" subheader="Categorization" />
  <tk-step header="Communication" subheader="Communication" />
</tk-stepper>

<tk-stepper reverse>
  <tk-step header="Information" subheader="Details" />
  <tk-step header="Details" subheader="Categorization" />
  <tk-step header="Communication" subheader="Communication" />
</tk-stepper>`;

  const angularCode = `<tk-stepper>
  <tk-step header="Information" subheader="Details"></tk-step>
  <tk-step header="Details" subheader="Categorization"></tk-step>
  <tk-step header="Communication" subheader="Communication"></tk-step>
</tk-stepper>

<tk-stepper reverse>
  <tk-step header="Information" subheader="Details"></tk-step>
  <tk-step header="Details" subheader="Categorization"></tk-step>
  <tk-step header="Communication" subheader="Communication"></tk-step>
</tk-stepper>`;

  const demo = (
    <>
      <div className="px-4 h-32">
        <p className="font-medium mb-4">Default</p>
        <TkStepper containerStyle={{ paddingInline: '20px' }}>
          <TkStep header="Information" subheader="Details" />
          <TkStep header="Details" subheader="Categorization" />
          <TkStep header="Communication" subheader="Communication" />
        </TkStepper>
      </div>
      <TkDivider />
      <div className="px-4 mb-4 h-32">
        <p className="font-medium mb-4">Reverse</p>
        <TkStepper reverse containerStyle={{ paddingInline: '20px' }}>
          <TkStep header="Information" subheader="Details" />
          <TkStep header="Details" subheader="Categorization" />
          <TkStep header="Communication" subheader="Communication" />
        </TkStepper>
      </div>
    </>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode} />;
};

export default Reverse;
