import { TkRadio, TkRadioGroup } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Spread = () => {
  const reactCode = `<TkRadioGroup spread={true}>
    <TkRadio label="label 1" value="1" />
    <TkRadio label="label 2" value="2" />
    <TkRadio label="label 3" value="3" />
</TkRadioGroup>`;

  const vueCode = `<TkRadioGroup :spread="true">
    <TkRadio label="label 1" value="1" />
    <TkRadio label="label 2" value="2" />
    <TkRadio label="label 3" value="3" />
</TkRadioGroup>`;

  const angularCode = `<tk-radio-group [spread]="true">
    <tk-radio label="label 1" value="1" />
    <tk-radio label="label 2" value="2" />
    <tk-radio label="label 3" value="3" />
</tk-radio-group>`;

  const demo = (
    <TkRadioGroup spread={true}>
      <TkRadio label="label 1" value="1" />
      <TkRadio label="label 2" value="2" />
      <TkRadio label="label 3" value="3" />
    </TkRadioGroup>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Spread;
