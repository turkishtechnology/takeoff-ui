import { TkChips } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Size = () => {
  const reactCode = `<TkChips variant="primary" size="small" label="primary" removable />
<TkChips variant="primary" size="base" label="primary" removable />
<TkChips variant="primary" size="large" label="primary" removable />`;

  const vueCode = `<TkChips variant="primary" size="small" label="primary" removable />
<TkChips variant="primary" size="base" label="primary" removable />
<TkChips variant="primary" size="large" label="primary" removable />`;

  const demo = (
    <div className="flex items-end gap-2 flex-wrap justify-center">
      <TkChips
        variant="primary"
        size="small"
        type="filled"
        label="primary"
        removable
      />
      <TkChips variant="primary" size="base" label="primary" removable />
      <TkChips
        variant="primary"
        size="large"
        type="filled"
        label="primary"
        removable
      />
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

export default Size;
