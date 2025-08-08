import React, { useState } from 'react';
import { TkStepper, TkStep, TkRadio, TkRadioGroup } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const LabelPosition = () => {
  const [labelPosition, setLabelPosition] = useState<'non-flip' | 'flip'>('non-flip');
  const [codeSample, setCodeSample] = useState('');

  const handleLabelPositionChange = event => {
    setLabelPosition(event.detail);
  };

  React.useEffect(() => {
    const newCodeSample = `<TkStepper labelPosition="${labelPosition}">
  <TkStep header="General Information" subheader="Basic campaign details" complete />
  <TkStep header="Category Details" subheader="Campaign categorization" complete />
  <TkStep header="Communication" subheader="Communication strategies" isActive />
  <TkStep header="Summary" subheader="Campaign overview" />
</TkStepper>`;
    setCodeSample(newCodeSample);
  }, [labelPosition]);

  const demo = (
    <div className="space-y-6">
      <TkRadioGroup label="Label Position" value={labelPosition} onTkChange={handleLabelPositionChange} className="mb-4">
        <TkRadio label="Standard (non-flip)" value="non-flip" />
        <TkRadio label="Reversed (flip)" value="flip" />
      </TkRadioGroup>

      <TkStepper>
        <TkStep header="General Information" subheader="Basic campaign details" complete />
        <TkStep header="Category Details" subheader="Campaign categorization" complete />
        <TkStep header="Communication" subheader="Communication strategies" isActive />
        <TkStep header="Summary" subheader="Campaign overview" />
      </TkStepper>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={codeSample} vueCode={codeSample} angularCode={''} />;
};

export default LabelPosition;
