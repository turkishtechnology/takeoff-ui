import React, { useState, useEffect } from 'react';
import { TkDatepicker, TkRadioGroup, TkRadio } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const HeaderTypes = () => {
  const [headerType, setHeaderType] = useState<'basic' | 'divided' | 'light'>('basic');
  const [codeSampleReact, setCodeSampleReact] = useState('');
  const [codeSampleVue, setCodeSampleVue] = useState('');

  const headerTypes = [
    { label: 'Basic', value: 'basic' },
    { label: 'Divided', value: 'divided' },
    { label: 'Light', value: 'light' },
  ];

  const handleHeaderTypeChange = event => {
    setHeaderType(event.detail);
  };

  useEffect(() => {
    const attributes = `headerType="${headerType}"`;
    const newCodeSample = `<TkDatepicker ${attributes} inline />`;

    setCodeSampleReact(newCodeSample);
    setCodeSampleVue(newCodeSample);
  }, [headerType]);

  const demo = (
    <div className="flex flex-col items-start gap-2 overflow-auto">
      <TkRadioGroup label="Header Type" value={headerType} onTkChange={handleHeaderTypeChange}>
        {headerTypes.map((radio, index) => {
          return <TkRadio label={radio.label} key={index} value={radio.value} />;
        })}
      </TkRadioGroup>
      <TkDatepicker headerType={headerType} inline />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={codeSampleReact} vueCode={codeSampleVue} angularCode={''}></FeatureDemo>;
};
export default HeaderTypes;
