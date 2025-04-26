import React from 'react';
import { TkStepper, TkStep } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const StyleProps = () => {
  const containerStyle = {
    backgroundColor: 'var(--neutral-50)',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid var(--neutral-200)',
    boxShadow: '0 4px 6px var(--alpha-neutral-neutral-500-8)',
  };

  const contentStyle = {
    backgroundColor: 'var(--neutral-0)',
    padding: '8px 10px',
    borderRadius: '8px',
    borderLeft: '2px solid var(--primary-base)',
    boxShadow: '0 2px 4px var(--alpha-neutral-neutral-500-4)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const signStyle = {
    backgroundColor: 'var(--primary-50)',
    border: '2px solid var(--primary-300)',
    borderRadius: '8px',
  };

  const globalIcons = {
    completeIcon: {
      name: 'check_circle',
      style: 'rounded' as 'rounded',
      fill: true,
      color: 'var(--primary-base)',
    },
    activeIcon: {
      name: 'radio_button_checked',
      style: 'rounded' as 'rounded',
      fill: true,
      color: 'var(--primary-base)',
    },
    inactiveIcon: {
      name: 'radio_button_unchecked',
      style: 'rounded' as 'rounded',
      fill: false,
      color: 'var(--red-200)',
    },
  };

  const reactCodeSample = `// Container Style Example
<TkStepper
  containerStyle={{
    backgroundColor: "var(--neutral-50)",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid var(--neutral-200)",
    boxShadow: "0 4px 6px var(--alpha-neutral-neutral-500-8)"
  }}
>
  <TkStep header="Step 1" subheader="Container styling" complete />
  <TkStep header="Step 2" subheader="Custom background" isActive />
  <TkStep header="Step 3" subheader="With borders" />
</TkStepper>
 
// Content Style Example
<TkStepper
  contentStyle={{
    backgroundColor: "var(--neutral-0)",
    padding: "8px 10px",
    borderRadius: "8px",
    borderLeft: "2px solid var(--primary-base)",
    boxShadow: "0 2px 4px var(--alpha-neutral-neutral-500-4)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }}
>
  <TkStep header="Step 1" subheader="Content styling" complete />
  <TkStep header="Step 2" subheader="Custom content borders" isActive />
  <TkStep header="Step 3" subheader="With shadows" />
</TkStepper>
 
// Sign Style & Custom Icons Example
<TkStepper
  signStyle={{
    backgroundColor: "var(--primary-50)",
    border: "2px solid var(--primary-300)",
    borderRadius: "8px"
  }}
  // Global icons applied to all steps unless overridden
  completeIcon={{
    name: "check_circle",
    style: 'rounded',
    fill: true,
    color: "var(--primary-base)"
  }}
  activeIcon={{
    name: "radio_button_checked",
    style: 'rounded',
    fill: true,
    color: "var(--primary-base)"
  }}
  inactiveIcon={{
    name: "radio_button_unchecked",
    style: 'rounded',
    fill: false,
    color: "var(--red-200)"
  }}
>
  <TkStep header="Step 1" subheader="Global sign style" complete />
  <TkStep header="Step 2" subheader="Global icons" isActive />
  <TkStep 
    header="Step 3" 
    subheader="Step-specific icon" 
    error
    errorIcon={{
      name: "warning",
      style: 'rounded',
      fill: true,
      color: "var(--red-500)"
    }}
  />
</TkStepper>`;

  const vueCodeSample = `<!-- Container Style Example -->
<tk-stepper
  :containerStyle.prop="{
    backgroundColor: 'var(--neutral-50)',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid var(--neutral-200)',
    boxShadow: '0 4px 6px var(--alpha-neutral-neutral-500-8)'
  }"
>
  <tk-step header="Step 1" subheader="Container styling" complete />
  <tk-step header="Step 2" subheader="Custom background" :is-active="true" />
  <tk-step header="Step 3" subheader="With borders" />
</tk-stepper>
 
<!-- Content Style Example -->
<tk-stepper
  :contentStyle.prop="{
    backgroundColor: 'var(--neutral-0)',
    padding: '8px 10px',
    borderRadius: '8px',
    borderLeft: '2px solid var(--primary-base)',
    boxShadow: '0 2px 4px var(--alpha-neutral-neutral-500-4)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }"
>
  <tk-step header="Step 1" subheader="Content styling" complete />
  <tk-step header="Step 2" subheader="Custom content borders" :is-active="true" />
  <tk-step header="Step 3" subheader="With shadows" />
</tk-stepper>
 
<!-- Sign Style & Custom Icons Example -->
<tk-stepper
  :signStyle.prop="{
    backgroundColor: 'var(--primary-50)',
    border: '2px solid var(--primary-300)',
    borderRadius: '8px'
  }"
  <!-- Global icons applied to all steps unless overridden -->
  :completeIcon.prop="{
    name: 'check_circle',
    style: 'rounded',
    fill: true,
    color: 'var(--primary-base)'
  }"
  :activeIcon.prop="{
    name: 'radio_button_checked',
    style: 'rounded',
    fill: true,
    color: 'var(--primary-base)'
  }"
  :inactiveIcon.prop="{
    name: 'radio_button_unchecked',
    style: 'rounded',
    fill: false,
    color: 'var(--red-200)'
  }"
>
  <tk-step header="Step 1" subheader="Global sign style" complete />
  <tk-step header="Step 2" subheader="Global icons" :is-active="true" />
  <tk-step 
    header="Step 3" 
    subheader="Step-specific icon" 
    error
    :error-icon="{
      name: 'warning',
      style: 'rounded',
      fill: true,
      color: 'var(--red-500)'
    }"
  />
</tk-stepper>`;

  const demo = (
    <div className="space-y-10">
      <div>
        <h3 className="text-lg font-medium mb-4">Container Style</h3>
        <p className="mb-4">
          Use <code>containerStyle</code> to customize the main container of the
          stepper component.
        </p>

        <TkStepper containerStyle={containerStyle}>
          <TkStep header="Step 1" subheader="Container styling" complete />
          <TkStep header="Step 2" subheader="Custom background" isActive />
          <TkStep header="Step 3" subheader="With borders" />
        </TkStepper>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Content Style</h3>
        <p className="mb-4">
          Use <code>contentStyle</code> to customize the content area (header
          and subheader) of each step.
        </p>

        <TkStepper contentStyle={contentStyle}>
          <TkStep header="Step 1" subheader="Content styling" complete />
          <TkStep header="Step 2" subheader="Custom borders" isActive />
          <TkStep header="Step 3" subheader="With shadows" />
        </TkStepper>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Sign Style & Custom Icons</h3>
        <p className="mb-4">
          Use <code>signStyle</code> on the Stepper component for global styling
          of step indicators, and icon props on both levels for customization.
        </p>

        <TkStepper
          signStyle={signStyle}
          completeIcon={globalIcons.completeIcon}
          activeIcon={globalIcons.activeIcon}
          inactiveIcon={globalIcons.inactiveIcon}
        >
          <TkStep header="Step 1" subheader="Global sign style" complete />
          <TkStep header="Step 2" subheader="Global icons" isActive />
          <TkStep
            header="Step 3"
            subheader="Step-specific icon"
            error
            errorIcon={{
              name: 'warning',
              style: 'rounded',
              fill: true,
              color: 'var(--red-500)',
            }}
          />
        </TkStepper>
      </div>
    </div>
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCodeSample}
      vueCode={vueCodeSample}
      angularCode={''}
    />
  );
};

export default StyleProps;
