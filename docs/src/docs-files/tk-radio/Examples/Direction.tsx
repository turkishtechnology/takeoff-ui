import { TkRadio, TkRadioGroup } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Direction = () => {
  const reactCode = `<TkRadioGroup label="Horizontal Direction" direction="horizontal">
  <TkRadio label="label 1" value="1" />
  <TkRadio label="label 2" value="2" />
  <TkRadio label="label 3" value="3" />
</TkRadioGroup>
<TkRadioGroup label="Vertical Direction" direction="vertical">
  <TkRadio label="label 1" value="1" />
  <TkRadio label="label 2" value="2" />
  <TkRadio label="label 3" value="3" />
</TkRadioGroup>`;

  const vueCode = `<TkRadioGroup label="Horizontal Direction" direction="horizontal">
  <TkRadio label="label 1" value="1" />
  <TkRadio label="label 2" value="2" />
  <TkRadio label="label 3" value="3" />
</TkRadioGroup>
<TkRadioGroup label="Vertical Direction" direction="vertical">
  <TkRadio label="label 1" value="1" />
  <TkRadio label="label 2" value="2" />
  <TkRadio label="label 3" value="3" />
</TkRadioGroup>`;

  const angularCode = `<tk-radio-group label="Horizontal Direction" direction="horizontal">
  <tk-radio label="label 1" value="1" />
  <tk-radio label="label 2" value="2" />
  <tk-radio label="label 3" value="3" />
</tk-radio-group>
<tk-radio-group label="Vertical Direction" direction="vertical">
  <tk-radio label="label 1" value="1" />
  <tk-radio label="label 2" value="2" />
  <tk-radio label="label 3" value="3" />
</tk-radio-group>`;

  const demo = (
    <div className="flex flex-col gap-4">
      <TkRadioGroup label="Horizontal Direction" direction="horizontal">
        <TkRadio label="label 1" value="1" />
        <TkRadio label="label 2" value="2" />
        <TkRadio label="label 3" value="3" />
      </TkRadioGroup>
      <TkRadioGroup label="Vertical Direction" direction="vertical">
        <TkRadio label="label 1" value="1" />
        <TkRadio label="label 2" value="2" />
        <TkRadio label="label 3" value="3" />
      </TkRadioGroup>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Direction;
