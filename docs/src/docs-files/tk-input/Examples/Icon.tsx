import { TkInput } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Icon = () => {
  const reactCode = `<TkInput label="Left Icon Input" icon="flight" />
  <TkInput label="Right Icon Input" icon="flight" iconPosition="right" />`;

  const vueCode = `<TkInput label="Left Icon Input" icon="flight" />
  <TkInput label="Right Icon Input" icon="flight" iconPosition="right" />`;

  const demo = (
    <div className="flex gap-2">
      <TkInput label="Left Icon Input" icon="flight" />
      <TkInput label="Right Icon Input" icon="flight" iconPosition="right" />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default Icon;
