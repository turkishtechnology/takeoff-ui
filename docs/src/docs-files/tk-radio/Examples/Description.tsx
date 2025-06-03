import { TkRadio, TkRadioGroup } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Description = () => {
  const reactCode = `<TkRadioGroup>
    <TkRadio label="label 1" value="1" />
    <TkRadio label="label 2" value="2" description="Example description" />
</TkRadioGroup>`;

  const vueCode = `<TkRadioGroup>
    <TkRadio label="label 1" value="1" />
    <TkRadio label="label 2" value="2" description="Example description" />
</TkRadioGroup>`;

  const angularCode = `<tk-radio-group>
  <tk-radio label="label 1" value="1" />
  <tk-radio label="label 2" value="2" description="Example description" />
</tk-radio-group>`;

  const demo = (
    <TkRadioGroup style={{ overflow: 'overlay' }}>
      <TkRadio label="label 1" value="1" />
      <TkRadio label="label 2" value="2" description="Example description" />
    </TkRadioGroup>
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={angularCode}
    ></FeatureDemo>
  );
};

export default Description;
