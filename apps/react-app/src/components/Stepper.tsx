import { TkStepper, TkStep, TkDivider } from '@takeoff-ui/react';

const steps = [
  { id: 'step1', header: 'Step 1', subheader: 'Description 1' },
  { id: 'step2', header: 'Step 2', subheader: 'Description 2' },
  { id: 'step3', header: 'Step 3', subheader: 'Description 3' },
];

const StepperItem = ({ size, orientation, reverse }: { size: 'xsmall' | 'small' | 'base' | 'large'; orientation: 'horizontal' | 'vertical'; reverse: boolean }) => (
  <div className={orientation === 'vertical' ? 'min-w-[300px]' : ''}>
    <p className="text-sm text-gray-500 mb-2">Size: {size}</p>
    <TkStepper size={size} orientation={orientation} reverse={reverse}>
      {steps.map((step, index) => (
        <TkStep key={step.id} header={step.header} subheader={step.subheader} complete={index === 0} isActive={index === 1} />
      ))}
    </TkStepper>
  </div>
);

const ReverseSection = ({ orientation, reverse }: { orientation: 'horizontal' | 'vertical'; reverse: boolean }) => {
  const sizes = ['xsmall', 'small', 'base', 'large'] as const;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-600">{reverse ? 'Reversed' : 'Normal'}</h3>
      <div className={orientation === 'horizontal' ? 'space-y-8' : 'flex flex-wrap gap-8'}>
        {sizes.map(size => (
          <StepperItem key={size} size={size} orientation={orientation} reverse={reverse} />
        ))}
      </div>
      <TkDivider />
    </div>
  );
};

function Stepper() {
  const orientations = ['horizontal', 'vertical'] as const;
  const reverseOptions = [false, true] as const;

  return (
    <div className="p-8 space-y-12">
      <h1 className="text-2xl font-bold mb-8">Stepper Combinations</h1>

      {orientations.map(orientation => (
        <div key={orientation} className="space-y-8">
          <h2 className="text-xl font-semibold border-b pb-2 uppercase">{orientation} Orientation</h2>
          {reverseOptions.map(reverse => (
            <ReverseSection key={`${orientation}-${reverse}`} orientation={orientation} reverse={reverse} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Stepper;
