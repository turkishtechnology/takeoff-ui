import React from 'react';
import { TkDatepicker } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const States = () => {
  const reactCode = `<TkDatepicker
  label="Error"
  value="2024-01-15"
  invalid={true}
  error="Bu alan zorunludur"
/>
<TkDatepicker
  label="Readonly"
  value="2024-01-15"
  readonly
/>
<TkDatepicker
  label="Disabled"
  value="2024-01-15"
  disabled
/>`;

  const vueCode = `<TkDatepicker
  label="Error"
  value="2024-01-15"
  :invalid="true"
  error="Bu alan zorunludur"
/>
<TkDatepicker label="Readonly" value="2024-01-15" readonly />
<TkDatepicker label="Disabled" value="2024-01-15" disabled />`;

  const demo = (
    <div className="flex gap-2 flex-wrap justify-center">
      <TkDatepicker label="Error" value="2024-01-15" error="Bu alan zorunludur" invalid />
      <TkDatepicker label="Readonly" value="2024-01-15" readonly />
      <TkDatepicker label="Disabled" value="2024-01-15" disabled />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default States;
