import { TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const FullWidth = () => {
  const reactCode = `<TkButton variant="primary" label="Full Width Button" fullWidth />`;

  const vueCode = `<TkButton variant="primary" label="Full Width Button" fullWidth />`;

  const angularCode = `<tk-button variant="primary" label="Full Width Button" fullWidth />`;

  const demo = <TkButton variant="primary" label="Full Width Button" fullWidth />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default FullWidth;
