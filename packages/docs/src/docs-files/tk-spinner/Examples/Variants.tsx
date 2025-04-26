import React, { useState, useEffect } from 'react';
import { TkSpinner, TkRadioGroup, TkRadio } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const CardWithHeaderMode = () => {
  const [type, setType] = useState<
    'rounded' | 'dots' | 'lines' | 'pulse' | 'three-dots' | 'loader'
  >('rounded');
  const [codeSampleReact, setCodeSampleReact] = useState('');
  const [codeSampleVue, setCodeSampleVue] = useState('');
  const types = [
    { label: 'Rounded', value: 'rounded' },
    { label: 'Dots', value: 'dots' },
    { label: 'Lines', value: 'lines' },
    { label: 'Pulse', value: 'pulse' },
    { label: 'Three Dots', value: 'three-dots' },
    { label: 'Loader', value: 'loader' },
  ];
  const handleTypeChange = (event) => {
    setType(event.detail);
  };
  useEffect(() => {
    const attributesList = [`type="${type}"`].filter(Boolean);
    const attributes = attributesList.join('\n  ');

    const newCodeSample = `<TkSpinner
 ${attributes}
/>`;
    setCodeSampleReact(newCodeSample);
    setCodeSampleVue(newCodeSample);
  }, [type]);

  const demo = (
    <>
      <div style={{ overflow: 'overlay' }} className="mb-4">
        <TkRadioGroup
          label="Options"
          value={type}
          onTkChange={handleTypeChange}
        >
          {types.map((radio, index) => {
            return (
              <TkRadio label={radio.label} key={index} value={radio.value} />
            );
          })}
        </TkRadioGroup>
      </div>
      <div className="flex justify-center">
        <TkSpinner type={type} />
      </div>
    </>
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={codeSampleReact}
      vueCode={codeSampleVue}
      angularCode={''}
    ></FeatureDemo>
  );
};
export default CardWithHeaderMode;
