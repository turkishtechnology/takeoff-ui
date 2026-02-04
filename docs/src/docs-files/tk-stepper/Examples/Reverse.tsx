import React from 'react';
import { TkStepper, TkStep, TkDivider } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Reverse = () => {
  const reactCode = `<TkStepper reverse>
  <TkStep header="General Information" subheader="Basic campaign details" complete />
  <TkStep header="Category Details" subheader="Campaign categorization" complete />
</TkStepper>

<TkStepper orientation="vertical" reverse>
  <TkStep header="General Information" subheader="Basic campaign details" complete />
  <TkStep header="Category Details" subheader="Campaign categorization" complete />
</TkStepper>`;

  const vueCode = `<tk-stepper reverse>
  <tk-step header="General Information" subheader="Basic campaign details" complete />
  <tk-step header="Category Details" subheader="Campaign categorization" complete />
</tk-stepper>

<tk-stepper orientation="vertical" reverse>
  <tk-step header="General Information" subheader="Basic campaign details" complete />
  <tk-step header="Category Details" subheader="Campaign categorization" complete />
</tk-stepper>`;

  const angularCode = `<tk-stepper reverse>
  <tk-step header="General Information" subheader="Basic campaign details" complete></tk-step>
  <tk-step header="Category Details" subheader="Campaign categorization" complete></tk-step>
</tk-stepper>

<tk-stepper orientation="vertical" reverse>
  <tk-step header="General Information" subheader="Basic campaign details" complete></tk-step>
  <tk-step header="Category Details" subheader="Campaign categorization" complete></tk-step>
</tk-stepper>`;

  const demo = (
    <div className=" m-4">
      <div className="h-48">
        <p className="justify-self-center font-medium">Horizontal Reverse</p>
        <TkStepper reverse>
          <TkStep header="General Information" subheader="Basic campaign details" complete />
          <TkStep header="Category Details" subheader="Campaign categorization" complete />
        </TkStepper>
      </div>
      <TkDivider />
      <div className="h-48">
        <p className="justify-self-center font-medium">Vertical Reverse</p>
        <TkStepper orientation="vertical" reverse>
          <TkStep header="General Information" subheader="Basic campaign details" complete />
          <TkStep header="Category Details" subheader="Campaign categorization" complete />
        </TkStepper>
      </div>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode} />;
};

export default Reverse;
