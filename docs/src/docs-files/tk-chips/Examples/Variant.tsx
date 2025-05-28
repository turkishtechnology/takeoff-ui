import { TkChips } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Variant = () => {
  const reactCode = `<TkChips variant="primary" label="primary" removable />
<TkChips variant="secondary" label="secondary" removable />
<TkChips variant="neutral" label="neutral" removable />
<TkChips variant="info" label="info" removable />
<TkChips variant="warning" label="warning" removable />
<TkChips variant="success" label="success" removable />
<TkChips variant="danger" label="danger" removable />
<TkChips variant="verified" label="verified" removable />`;

  const vueCode = `<TkChips variant="primary" label="primary" removable/>
<TkChips variant="secondary" label="secondary" removable />
<TkChips variant="neutral" label="neutral" removable/>
<TkChips variant="info" label="info" removable/>
<TkChips variant="warning" label="warning" removable/>
<TkChips variant="success" label="success" removable/>
<TkChips variant="danger" label="danger" removable/>
<TkChips variant="verified" label="verified" removable/>`;

  const angularCode = `<tk-chips variant="primary" label="primary" removable />
<tk-chips variant="secondary" label="secondary" removable />
<tk-chips variant="neutral" label="neutral" removable />
<tk-chips variant="info" label="info" removable />
<tk-chips variant="warning" label="warning" removable />
<tk-chips variant="success" label="success" removable />
<tk-chips variant="danger" label="danger" removable />
<tk-chips variant="verified" label="verified" removable />`;

  const demo = (
    <div className="flex gap-2 flex-wrap justify-center">
      <TkChips variant="primary" label="primary" removable />
      <TkChips variant="secondary" label="secondary" removable />
      <TkChips variant="neutral" label="neutral" removable />
      <TkChips variant="info" label="info" removable />
      <TkChips variant="warning" label="warning" removable />
      <TkChips variant="success" label="success" removable />
      <TkChips variant="danger" label="danger" removable />
      <TkChips variant="verified" label="verified" removable />
    </div>
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={angularCode}
    ></FeatureDemo>
  );
};

export default Variant;
