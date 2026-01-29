import { TkTextarea } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const State = () => {
  const reactCode = `<TkTextarea
  label="Error"
  value="Error"
  invalid={true}
  error="Bu alan zorunludur"
/>
<TkTextarea
  label="Readonly"
  value="Readonly"
  readonly
/>
<TkTextarea
  label="Disabled"
  value="Disabled"
  disabled
/>`;

  const vueCode = `<TkTextarea
  label="Error"
  value="Error"
  :invalid="true"
  error="Bu alan zorunludur"
/>
<TkTextarea
  label="Readonly"
  value="Readonly"
  readonly
/>
<TkTextarea
  label="Disabled"
  value="Disabled"
  disabled
/>`;

  const angularCode = `<tk-textarea
  label="Error"
  value="Error"
  [invalid]="true"
  error="Bu alan zorunludur"
/>
<tk-textarea
  label="Readonly"
  value="Readonly"
  [readonly]="true"
/>
<tk-textarea
  label="Disabled"
  value="Disabled"
  [disabled]="true"
/>`;

  const demo = (
    <div className="flex gap-2 flex-wrap justify-center">
      <TkTextarea label="Error" value="Error" invalid={true} error="Bu alan zorunludur" />
      <TkTextarea label="Readonly" value="Readonly" readonly />
      <TkTextarea label="Disabled" value="Disabled" disabled />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default State;
