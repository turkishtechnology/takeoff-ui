import { TkIcon } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Sizes = () => {
  const reactCode = `// Standard Icons
<TkIcon icon="flight" size="small" />
<TkIcon icon="flight" size="base" />
<TkIcon icon="flight" size="medium" />
<TkIcon icon="flight" size="large" />
<TkIcon icon="flight" size="xlarge" />
<TkIcon icon="flight" size="xxlarge" />

// Sign icons
<TkIcon icon="flight" sign size="small" />
<TkIcon icon="flight" sign size="base" />
<TkIcon icon="flight" sign size="medium" />
<TkIcon icon="flight" sign size="large" />
<TkIcon icon="flight" sign size="xlarge" />
<TkIcon icon="flight" sign size="xxlarge" />`;

  const vueCode = `// Standard Icons
<TkIcon icon="flight" size="small" />
<TkIcon icon="flight" size="base" />
<TkIcon icon="flight" size="medium" />
<TkIcon icon="flight" size="large" />
<TkIcon icon="flight" size="xlarge" />
<TkIcon icon="flight" size="xxlarge" />

// Sign icons
<TkIcon icon="flight" sign size="small" />
<TkIcon icon="flight" sign size="base" />
<TkIcon icon="flight" sign size="medium" />
<TkIcon icon="flight" sign size="large" />
<TkIcon icon="flight" sign size="xlarge" />
<TkIcon icon="flight" sign size="xxlarge" />`;

  const angularCode = `<!-- Standard Icons -->
<tk-icon icon="flight" size="small" />
<tk-icon icon="flight" size="base" />
<tk-icon icon="flight" size="medium" />
<tk-icon icon="flight" size="large" />
<tk-icon icon="flight" size="xlarge" />
<tk-icon icon="flight" size="xxlarge" />
  
<!-- Sign icons -->
<tk-icon icon="flight" sign size="small" />
<tk-icon icon="flight" sign size="base" />
<tk-icon icon="flight" sign size="medium" />
<tk-icon icon="flight" sign size="large" />
<tk-icon icon="flight" sign size="xlarge" />
<tk-icon icon="flight" sign size="xxlarge" />`;

  const demo = (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="text-lg font-medium mb-3">Standard Icons</h4>
        <div className="flex justify-center items-end flex-wrap gap-4">
          <div className="flex flex-col items-center">
            <TkIcon icon="flight" size="small" />
            <span className="text-xs mt-2">small</span>
          </div>
          <div className="flex flex-col items-center">
            <TkIcon icon="flight" size="base" />
            <span className="text-xs mt-2">base</span>
          </div>
          <div className="flex flex-col items-center">
            <TkIcon icon="flight" size="medium" />
            <span className="text-xs mt-2">medium</span>
          </div>
          <div className="flex flex-col items-center">
            <TkIcon icon="flight" size="large" />
            <span className="text-xs mt-2">large</span>
          </div>
          <div className="flex flex-col items-center">
            <TkIcon icon="flight" size="xlarge" />
            <span className="text-xs mt-2">xlarge</span>
          </div>
          <div className="flex flex-col items-center">
            <TkIcon icon="flight" size="xxlarge" />
            <span className="text-xs mt-2">xxlarge</span>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-lg font-medium mb-3">Sign Icons</h4>
        <div className="flex justify-center items-end flex-wrap gap-4">
          <div className="flex flex-col items-center">
            <TkIcon icon="flight" sign size="small" />
            <span className="text-xs mt-2">small</span>
          </div>
          <div className="flex flex-col items-center">
            <TkIcon icon="flight" sign size="base" />
            <span className="text-xs mt-2">base</span>
          </div>
          <div className="flex flex-col items-center">
            <TkIcon icon="flight" sign size="medium" />
            <span className="text-xs mt-2">medium</span>
          </div>
          <div className="flex flex-col items-center">
            <TkIcon icon="flight" sign size="large" />
            <span className="text-xs mt-2">large</span>
          </div>
          <div className="flex flex-col items-center">
            <TkIcon icon="flight" sign size="xlarge" />
            <span className="text-xs mt-2">xlarge</span>
          </div>
          <div className="flex flex-col items-center">
            <TkIcon icon="flight" sign size="xxlarge" />
            <span className="text-xs mt-2">xxlarge</span>
          </div>
        </div>
      </div>
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

export default Sizes;
