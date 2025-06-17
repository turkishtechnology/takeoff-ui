import React, { useState, useEffect } from 'react';
import { TkTabs, TkTabsItem, TkRadioGroup, TkRadio } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Type = () => {
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>(
    'horizontal',
  );
  const [type, setType] = useState<
    'basic' | 'divided' | 'compact' | 'expanded'
  >('basic');
  const [codeSampleReact, setCodeSampleReact] = useState('');
  const [codeSampleVue, setCodeSampleVue] = useState('');
  const orientations = [
    { label: 'Horizontal', value: 'horizontal' },
    { label: 'Vertical', value: 'vertical' },
  ];
  const types = [
    { label: 'Basic', value: 'basic' },
    { label: 'Divided', value: 'divided' },
    { label: 'Compact', value: 'compact' },
    { label: 'Expanded', value: 'expanded' },
  ];
  const handleOrientationChange = (event) => {
    setOrientation(event.detail);
  };
  const handleTypeChange = (event) => {
    setType(event.detail);
  };
  useEffect(() => {
    const attributesList = [
      `orientation="${orientation}"`,
      `type="${type}"`,
    ].filter(Boolean);
    const attributes = attributesList.join('\n  ');

    const reactCode = `<TkTabs
${attributes}
>
  <TkTabsItem label="Tab label" icon="flight">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
  </TkTabsItem>
  <TkTabsItem label="Tab label" icon="flight">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
  </TkTabsItem>
  <TkTabsItem label="Tab label" icon="flight">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
  </TkTabsItem>
</TkTabs>`;

    const vueCode = `<TkTabs 
${attributes}
>
  <TkTabsItem label="Tab label" icon="flight">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
  </TkTabsItem>
  <TkTabsItem label="Tab label" icon="flight">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
  </TkTabsItem>
  <TkTabsItem label="Tab label" icon="flight">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
  </TkTabsItem>
</TkTabs>`;
    setCodeSampleReact(reactCode);
    setCodeSampleVue(vueCode);
  }, [orientation, type]);

  const demo = (
    <>
      <div className="flex flex-col items-start gap-2 overflow-auto mb-4">
        <TkRadioGroup
          label="Orientation"
          value={orientation}
          onTkChange={handleOrientationChange}
        >
          {orientations.map((radio, index) => {
            return (
              <TkRadio label={radio.label} key={index} value={radio.value} />
            );
          })}
        </TkRadioGroup>
        <TkRadioGroup label="Type" value={type} onTkChange={handleTypeChange}>
          {types.map((radio, index) => {
            return (
              <TkRadio label={radio.label} key={index} value={radio.value} />
            );
          })}
        </TkRadioGroup>
      </div>
      <TkTabs
        orientation={orientation}
        type={type}
        contentStyle={{
          color: 'var(--text-dark)',
          fontSize: 'var(--desktop-body-s-size)',
        }}
      >
        <TkTabsItem label="Tab label" icon="flight">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            sed consequuntur error repudiandae numquam deserunt quisquam
            repellat libero asperiores earum nam nobis, culpa ratione quam
            perferendis esse, cupiditate nequequas! 1
          </p>
        </TkTabsItem>
        <TkTabsItem label="Tab label" icon="flight">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            sed consequuntur error repudiandae numquam deserunt quisquam
            repellat libero asperiores earum nam nobis, culpa ratione quam
            perferendis esse, cupiditate nequequas! 2
          </p>
        </TkTabsItem>
        <TkTabsItem label="Tab label" icon="flight">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            sed consequuntur error repudiandae numquam deserunt quisquam
            repellat libero asperiores earum nam nobis, culpa ratione quam
            perferendis esse, cupiditate nequequas! 3
          </p>
        </TkTabsItem>
      </TkTabs>
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
export default Type;
