import { TkCheckbox } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Basic = () => {
  const reactCode = `<TkCheckbox label="unchecked" value={false} />
<TkCheckbox label="checked" value={true} />
<TkCheckbox label="indeterminate" indeterminate={true} />`;

  const vueCode = `<TkCheckbox label="unchecked" :value="false" />
<TkCheckbox label="checked" :value="true" />
<TkCheckbox label="indeterminate" :indeterminate="true" />`;

  const angularCode = `<tk-checkbox label="unchecked" [value]="false" />
<tk-checkbox label="checked" [value]="true" />
<tk-checkbox label="indeterminate" [indeterminate]="true" />`;

  const demo = (
    <div className="flex gap-2 flex-wrap justify-center">
      <TkCheckbox label="unchecked" value={false} />
      <TkCheckbox label="checked" value={true} />
      <TkCheckbox label="indeterminate" indeterminate={true} />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Basic;
