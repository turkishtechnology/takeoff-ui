import { TkCheckbox } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const State = () => {
  const reactCode = `<TkCheckbox label="Invalid" invalid={true} />
<TkCheckbox label="Disabled" disabled />`;

  const vueCode = `<TkCheckbox label="Invalid" :invalid="true" />
<TkCheckbox label="Disabled" disabled />`;

  const angularCode = `<tk-checkbox label="Invalid" [invalid]="true" />
<tk-checkbox label="Disabled" disabled />`;

  const demo = (
    <div className="flex flex-col gap-4">
      <TkCheckbox label="Invalid" invalid={true} />
      <TkCheckbox label="Disabled" disabled />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default State;
