import { TkToggle } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Basic = () => {
  const reactCode = `<TkToggle label="Disabled" disabled value={true} />
<TkToggle label="Invalid" invalid value={true} />`;

  const vueCode = `<TkToggle label="Disabled" disabled :value="true" />
<TkToggle label="Invalid" invalid :value="true" />`;

  const angularCode = `<tk-toggle label="Disabled" disabled value="true" />
<tk-toggle label="Invalid" invalid value="true" />`;

  const demo = (
    <div className="flex flex-wrap justify-center gap-2">
      <TkToggle label="Disabled" disabled value={true} />
      <TkToggle label="Invalid" invalid value={true} />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Basic;
