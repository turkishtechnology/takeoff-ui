import { TkRadio, TkRadioGroup } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Basic = () => {
  const reactCode = `<TkRadioGroup>
  <TkRadio label="label 1" value="1" />
  <TkRadio label="label 2" value="2" />
</TkRadioGroup>`;

  const vueCode = `<TkRadioGroup>
  <TkRadio label="label 1" value="1" />
  <TkRadio label="label 2" value="2" />
</TkRadioGroup>`;

  const demo = (
    <TkRadioGroup style={{ overflow: 'overlay' }}>
      <TkRadio label="label 1" value="1" />
      <TkRadio label="label 2" value="2" />
    </TkRadioGroup>
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={''}
    ></FeatureDemo>
  );
};

export default Basic;
