import { TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Animated = () => {
  const reactCode = `<TkButton animated icon="auto_awesome" variant="primary" />
<TkButton animated icon="auto_awesome" variant="secondary" />
<TkButton animated icon="auto_awesome" variant="neutral" />
<TkButton animated icon="auto_awesome" variant="info" />
<TkButton animated icon="auto_awesome" variant="success" />
<TkButton animated icon="auto_awesome" variant="danger" />
<TkButton animated icon="auto_awesome" variant="warning" />
<TkButton animated icon="auto_awesome" variant="purple" />

<TkButton animated icon="auto_awesome" variant="primary" type="outlined" />
<TkButton animated icon="auto_awesome" variant="secondary" type="outlined" />
<TkButton animated icon="auto_awesome" variant="neutral" type="outlined" />
<TkButton animated icon="auto_awesome" variant="info" type="outlined" />
<TkButton animated icon="auto_awesome" variant="success" type="outlined" />
<TkButton animated icon="auto_awesome" variant="danger" type="outlined" />
<TkButton animated icon="auto_awesome" variant="warning" type="outlined" />
<TkButton animated icon="auto_awesome" variant="purple" type="outlined" />`;

  const vueCode = `<TkButton animated icon="auto_awesome" variant="primary" />
<TkButton animated icon="auto_awesome" variant="secondary" />
<TkButton animated icon="auto_awesome" variant="neutral" />
<TkButton animated icon="auto_awesome" variant="info" />
<TkButton animated icon="auto_awesome" variant="success" />
<TkButton animated icon="auto_awesome" variant="danger" />
<TkButton animated icon="auto_awesome" variant="warning" />
<TkButton animated icon="auto_awesome" variant="purple" />

<TkButton animated icon="auto_awesome" variant="primary" type="outlined" />
<TkButton animated icon="auto_awesome" variant="secondary" type="outlined" />
<TkButton animated icon="auto_awesome" variant="neutral" type="outlined" />
<TkButton animated icon="auto_awesome" variant="info" type="outlined" />
<TkButton animated icon="auto_awesome" variant="success" type="outlined" />
<TkButton animated icon="auto_awesome" variant="danger" type="outlined" />
<TkButton animated icon="auto_awesome" variant="warning" type="outlined" />
<TkButton animated icon="auto_awesome" variant="purple" type="outlined" />`;

  const angularCode = `<tk-button [animated]="true" icon="auto_awesome" variant="primary" />
<tk-button [animated]="true" icon="auto_awesome" variant="secondary" />
<tk-button [animated]="true" icon="auto_awesome" variant="neutral" />
<tk-button [animated]="true" icon="auto_awesome" variant="info" />
<tk-button [animated]="true" icon="auto_awesome" variant="success" />
<tk-button [animated]="true" icon="auto_awesome" variant="danger" />
<tk-button [animated]="true" icon="auto_awesome" variant="warning" />
<tk-button [animated]="true" icon="auto_awesome" variant="purple" />

<tk-button [animated]="true" icon="auto_awesome" variant="primary" type="outlined" />
<tk-button [animated]="true" icon="auto_awesome" variant="secondary" type="outlined" />
<tk-button [animated]="true" icon="auto_awesome" variant="neutral" type="outlined" />
<tk-button [animated]="true" icon="auto_awesome" variant="info" type="outlined" />
<tk-button [animated]="true" icon="auto_awesome" variant="success" type="outlined" />
<tk-button [animated]="true" icon="auto_awesome" variant="danger" type="outlined" />
<tk-button [animated]="true" icon="auto_awesome" variant="warning" type="outlined" />
<tk-button [animated]="true" icon="auto_awesome" variant="purple" type="outlined" />`;

  const variants = ['primary', 'secondary', 'neutral', 'info', 'success', 'danger', 'warning', 'purple'] as const;

  const demo = (
    <div className="flex flex-col gap-3">
      <div className="flex justify-center flex-wrap gap-2">
        {variants.map(variant => (
          <TkButton key={variant} animated icon="auto_awesome" variant={variant} />
        ))}
      </div>
      <div className="flex justify-center flex-wrap gap-2">
        {variants.map(variant => (
          <TkButton key={variant} animated icon="auto_awesome" variant={variant} type="outlined" />
        ))}
      </div>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Animated;
