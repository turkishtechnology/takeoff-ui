import { TkUpload } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const State = () => {
  const reactCode = `<TkUpload disabled={true}></TkUpload>`;

  const vueCode = `<TkUpload :disabled="true"></TkUpload>`;

  const demo = (
    <div>
      <label>Disabled</label>
      <TkUpload disabled={true}></TkUpload>
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
