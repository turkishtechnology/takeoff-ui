import React from 'react';
import { TkChips } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const IconPosition = () => {
  const reactCode = `<TkChips variant="primary" size="large" icon="flight" label="Left Icon" iconPosition="left" />
<TkChips variant="primary" size="large" icon="flight" label="Right Icon" iconPosition="right" />`;

  const vueCode = `<TkChips variant="primary" size="large" icon="flight" label="Left Icon" iconPosition="left" />
<TkChips variant="primary" size="large" icon="flight" label="Right Icon" iconPosition="right" />`;

  const angularCode = `<tk-chips variant="primary" size="large" icon="flight" label="Left Icon" iconPosition="left"></tk-chips>
<tk-chips variant="primary" size="large" icon="flight" label="Right Icon" iconPosition="right"></tk-chips>`;

  const demo = (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <TkChips variant="primary" size="large" icon="flight" label="Left Icon" iconPosition="left" />
      <TkChips variant="primary" size="large" icon="flight" label="Right Icon" iconPosition="right" />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default IconPosition;
