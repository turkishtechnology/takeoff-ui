import { TkStepper, TkStep, TkButton } from '@takeoff-ui/react';
import { useState } from 'react';

function Stepper() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const handleStepChange = (event) => {
    setActiveStep(event.detail);
  };

  const goToNext = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    }
  };

  const goToPrevious = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div>
      <TkStepper
        completeIcon="done_all"
        active={1}
        onTkStepChange={handleStepChange}
      >
        <TkStep
          header="Step 1"
          subheader="Step Description"
          complete={activeStep > 0}
        />
        <TkStep
          header="Step 2"
          subheader="Step Description"
          isActive={activeStep === 1}
          complete={activeStep > 1}
        />
        <TkStep
          header="Step 3"
          subheader="Step Description"
          isActive={activeStep === 2}
          complete={activeStep > 2}
        />
        <TkStep
          header="Step 4"
          subheader="Step Description"
          isActive={activeStep === 3}
          activeIcon={{
            name: 'apps',
            style: 'rounded',
            fill: true,
            color: '#FFFFFF',
          }}
        />
      </TkStepper>
    </div>
  );
}

export default Stepper;
