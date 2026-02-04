import React from 'react';
import { TkStepper, TkStep, TkDivider } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Size = () => {
  const reactCode = `<TkStepper size="small">
  <TkStep header="General Information" subheader="Basic campaign details" complete />
  <TkStep header="Category Details" subheader="Campaign categorization" complete />
  <TkStep header="Communication" subheader="Communication strategies" isActive />
  <TkStep header="Summary" subheader="Campaign overview" />
</TkStepper>
<TkStepper size="large">
  <TkStep header="General Information" subheader="Basic campaign details" complete />
  <TkStep header="Category Details" subheader="Campaign categorization" complete />
  <TkStep header="Communication" subheader="Communication strategies" isActive />
  <TkStep header="Summary" subheader="Campaign overview" />
</TkStepper>`;

  const vueCode = `<tk-stepper size="small">
  <tk-step header="General Information" subheader="Basic campaign details" complete />
  <tk-step header="Category Details" subheader="Campaign categorization" complete />
  <tk-step header="Communication" subheader="Communication strategies" is-active />
  <tk-step header="Summary" subheader="Campaign overview" />
</tk-stepper>
<tk-stepper size="large">
  <tk-step header="General Information" subheader="Basic campaign details" complete />
  <tk-step header="Category Details" subheader="Campaign categorization" complete />
  <tk-step header="Communication" subheader="Communication strategies" is-active />
  <tk-step header="Summary" subheader="Campaign overview" />
</tk-stepper>`;

  const angularCode = `<tk-stepper size="small">
  <tk-step header="General Information" subheader="Basic campaign details" complete></tk-step>
  <tk-step header="Category Details" subheader="Campaign categorization" complete></tk-step>
  <tk-step header="Communication" subheader="Communication strategies" isActive></tk-step>
  <tk-step header="Summary" subheader="Campaign overview"></tk-step>
</tk-stepper>
<tk-stepper size="large">
  <tk-step header="General Information" subheader="Basic campaign details" complete></tk-step>
  <tk-step header="Category Details" subheader="Campaign categorization" complete></tk-step>
  <tk-step header="Communication" subheader="Communication strategies" isActive></tk-step>
  <tk-step header="Summary" subheader="Campaign overview"></tk-step>
</tk-stepper>`;

  const demo = (
    <div className=" m-4">
      <p className="justify-self-center font-medium">Small</p>
      <TkStepper size="small">
        <TkStep header="General Information" subheader="Basic campaign details" complete />
        <TkStep header="Category Details" subheader="Campaign categorization" complete />
        <TkStep header="Communication" subheader="Communication strategies" isActive />
        <TkStep header="Summary" subheader="Campaign overview" />
      </TkStepper>
      <TkDivider />
      <p className="justify-self-center font-medium">Large</p>
      <TkStepper size="large">
        <TkStep header="General Information" subheader="Basic campaign details" complete />
        <TkStep header="Category Details" subheader="Campaign categorization" complete />
        <TkStep header="Communication" subheader="Communication strategies" isActive />
        <TkStep header="Summary" subheader="Campaign overview" />
      </TkStepper>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode} />;
};

export default Size;
