import React, { useState, useEffect } from 'react';
import { TkTabs, TkTabsItem, TkRadioGroup, TkRadio } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const SpreadHeaders = () => {
  const [type, setType] = useState<
    'basic' | 'divided' | 'compact' | 'expanded'
  >('basic');
  const [codeSampleReact, setCodeSampleReact] = useState('');
  const [codeSampleVue, setCodeSampleVue] = useState('');
  const types = [
    { label: 'Basic', value: 'basic' },
    { label: 'Divided', value: 'divided' },
    { label: 'Compact', value: 'compact' },
    { label: 'Expanded', value: 'expanded' },
  ];
  const handleHeaderTypeChange = (event) => {
    setType(event.detail);
  };
  useEffect(() => {
    const attributesList = [`type="${type}"`].filter(Boolean);
    const attributes = attributesList.join('\n  ');

    const reactCodeSample = `<TkTabs ${attributes} spreadHeaders>
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

    const vueCodeSample = `<TkTabs ${attributes} :spreadHeaders.prop="true">
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
    setCodeSampleReact(reactCodeSample);
    setCodeSampleVue(vueCodeSample);
  }, [type]);

  const demo = (
    <>
      <div className="overflow-auto mb-4">
        <TkRadioGroup value={type} onTkChange={handleHeaderTypeChange}>
          {types.map((radio, index) => {
            return (
              <TkRadio label={radio.label} key={index} value={radio.value} />
            );
          })}
        </TkRadioGroup>
      </div>
      <TkTabs
        type={type}
        spreadHeaders
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
            perferendis esse, cupiditate nequequas!
          </p>
        </TkTabsItem>
        <TkTabsItem label="Tab label" icon="flight">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            sed consequuntur error repudiandae numquam deserunt quisquam
            repellat libero asperiores earum nam nobis, culpa ratione quam
            perferendis esse, cupiditate nequequas!
          </p>
        </TkTabsItem>
        <TkTabsItem label="Tab label" icon="flight">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            sed consequuntur error repudiandae numquam deserunt quisquam
            repellat libero asperiores earum nam nobis, culpa ratione quam
            perferendis esse, cupiditate nequequas!
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
export default SpreadHeaders;
