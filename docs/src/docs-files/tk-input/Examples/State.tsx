import { TkInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const State = () => {
  const reactCode = `<TkInput
  label="Error"
  value="Error"
  invalid={true}
  error="Bu alan zorunludur"
/>
<TkInput
  label="Readonly"
  value="Readonly"
  readonly
/>
<TkInput
  label="Disabled"
  value="Disabled"
  disabled
/>`;

  const vueCode = `<TkInput
  label="Error"
  value="Error"
  :invalid="true"
  error="Bu alan zorunludur"
/>
<TkInput label="Readonly" value="Readonly" readonly />
<TkInput label="Disabled" value="Disabled" disabled />`;

  const demo = (
    <div className="flex gap-2 flex-wrap justify-center">
      <TkInput label="Error" value="Error" error="Bu alan zorunludur" invalid />
      <TkInput label="Readonly" value="Readonly" readonly />
      <TkInput label="Disabled" value="Disabled" disabled />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default State;
