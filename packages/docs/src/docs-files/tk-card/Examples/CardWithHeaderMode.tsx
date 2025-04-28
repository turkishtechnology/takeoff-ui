import React, { useState, useEffect } from 'react';
import { TkCard, TkCheckbox, TkRadio, TkRadioGroup } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const CardWithHeaderMode = () => {
  const [headerType, setHeaderType] = useState<
    'basic' | 'divided' | 'light' | 'dark' | 'primary'
  >('basic');
  const [showAvatar, setShowAvatar] = useState(false);
  const [showMenuButton, setShowMenuButton] = useState(false);
  const [codeSampleReact, setCodeSampleReact] = useState('');
  const [codeSampleVue, setCodeSampleVue] = useState('');
  const headerTypes = [
    { label: 'Basic', value: 'basic' },
    { label: 'Divided', value: 'divided' },
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'Primary', value: 'primary' },
  ];

  const handleHeaderTypeChange = (event) => {
    setHeaderType(event.detail);
  };

  useEffect(() => {
    const attributesList = [
      `header="${
        headerType.charAt(0).toUpperCase() + headerType.slice(1)
      } Header"`,
      `subheader="Interactive Example"`,
      `headerType="${headerType}"`,
      showAvatar ? 'showAvatar' : '',
      showMenuButton ? 'showMenuButton' : '',
    ].filter(Boolean);
    const attributes = attributesList.join('\n  ');

    const newCodeSample = `<TkCard
 ${attributes}
>
    <p>This card demonstrates different header options.</p>
</TkCard>`;
    setCodeSampleReact(newCodeSample);
    setCodeSampleVue(newCodeSample);
  }, [headerType, showAvatar, showMenuButton]);

  const demo = (
    <>
      <div style={{ overflow: 'overlay' }} className="mb-4">
        <TkRadioGroup
          label="Options"
          value={headerType}
          onTkChange={handleHeaderTypeChange}
        >
          {headerTypes.map((radio, index) => {
            return (
              <TkRadio label={radio.label} key={index} value={radio.value} />
            );
          })}
        </TkRadioGroup>
      </div>
      <div className="mb-4 flex gap-2 flex-wrap w-full">
        <TkCheckbox
          name="showAvatar"
          value={showAvatar}
          onTkChange={() => setShowAvatar((prevState) => !prevState)}
          label="Avatar"
        />
        <TkCheckbox
          name="showMenuButton"
          value={showMenuButton}
          onTkChange={() => setShowMenuButton((prevState) => !prevState)}
          label="Menu Button"
        />
      </div>
      <TkCard
        header={`${
          headerType.charAt(0).toUpperCase() + headerType.slice(1)
        } Header`}
        subheader="Interactive Example"
        headerType={headerType as any}
        showAvatar={showAvatar}
        showMenuButton={showMenuButton}
      >
        <p>
          This card demonstrates different header options. Use the controls
          above to change the header type and toggle avatar and menu button
          visibility.
        </p>
      </TkCard>
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
