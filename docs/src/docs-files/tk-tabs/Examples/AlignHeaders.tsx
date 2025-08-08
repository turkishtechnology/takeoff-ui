import React, { useState, useEffect } from 'react';
import { TkTabs, TkTabsItem, TkRadioGroup, TkRadio } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const AlignHeaders = () => {
  const [alignment, setAlignment] = useState<'start' | 'center' | 'end'>('start');
  const [codeSampleReact, setCodeSampleReact] = useState('');
  const [codeSampleVue, setCodeSampleVue] = useState('');
  const alignments = [
    { label: 'Start', value: 'start' },
    { label: 'Center', value: 'center' },
    { label: 'End', value: 'end' },
  ];
  const handleHeaderAlignmentChange = event => {
    setAlignment(event.detail);
  };
  useEffect(() => {
    const attributesList = [`alignHeaders="${alignment}"`].filter(Boolean);
    const attributes = attributesList.join('\n  ');

    const reactCode = `<TkTabs ${attributes}>
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

    const vueCode = `<TkTabs ${attributes}>
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
  }, [alignment]);

  const demo = (
    <>
      <div className="overflow-auto mb-4">
        <TkRadioGroup value={alignment} onTkChange={handleHeaderAlignmentChange}>
          {alignments.map((radio, index) => {
            return <TkRadio label={radio.label} key={index} value={radio.value} />;
          })}
        </TkRadioGroup>
      </div>
      <TkTabs
        alignHeaders={alignment}
        contentStyle={{
          color: 'var(--text-dark)',
          fontSize: 'var(--desktop-body-s-size)',
        }}
      >
        <TkTabsItem label="Tab label" icon="flight">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam
            nobis, culpa ratione quam perferendis esse, cupiditate nequequas! 1
          </p>
        </TkTabsItem>
        <TkTabsItem label="Tab label" icon="flight">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam
            nobis, culpa ratione quam perferendis esse, cupiditate nequequas! 2
          </p>
        </TkTabsItem>
        <TkTabsItem label="Tab label" icon="flight">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam
            nobis, culpa ratione quam perferendis esse, cupiditate nequequas! 3
          </p>
        </TkTabsItem>
      </TkTabs>
    </>
  );

  return <FeatureDemo demo={demo} reactCode={codeSampleReact} vueCode={codeSampleVue} angularCode={''}></FeatureDemo>;
};
export default AlignHeaders;
