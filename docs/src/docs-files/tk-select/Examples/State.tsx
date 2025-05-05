import { TkSelect } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const State = () => {
  const reactCode = `<TkSelect
  label="Error"
  placeholder="Error"
  invalid={true}
  error="Bu alan zorunludur"
/>
<TkSelect label="Readonly" placeholder="Readonly" readonly />
<TkSelect label="Disabled" placeholder="Disabled" disabled />`;

  const vueCode = `<TkSelect
  label="Error"
  placeholder="Error"
  :invalid="true"
  error="Bu alan zorunludur"
/>
<TkSelect label="Readonly" placeholder="Readonly" readonly />
<TkSelect label="Disabled" placeholder="Disabled" disabled />`;

  const demo = (
    <div className="flex justify-center gap-2 flex-wrap">
      <TkSelect
        label="Error"
        placeholder="Error"
        invalid={true}
        error="Bu alan zorunludur"
      />
      <TkSelect label="Readonly" placeholder="Readonly" readonly />
      <TkSelect label="Disabled" placeholder="Disabled" disabled />
    </div>
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

export default State;
