import { TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const AI = () => {
  const reactCode = `<TkButton ai icon="auto_awesome" label="Generate" />
<TkButton ai icon="auto_awesome" label="Generate" type="outlined" />
<TkButton ai icon="auto_awesome" label="Generate" variant="secondary" />
<TkButton ai icon="auto_awesome" label="Generate" variant="secondary" type="outlined" />`;

  const vueCode = `<TkButton ai icon="auto_awesome" label="Generate" />
<TkButton ai icon="auto_awesome" label="Generate" type="outlined" />
<TkButton ai icon="auto_awesome" label="Generate" variant="secondary" />
<TkButton ai icon="auto_awesome" label="Generate" variant="secondary" type="outlined" />`;

  const angularCode = `<tk-button [ai]="true" icon="auto_awesome" label="Generate" />
<tk-button [ai]="true" icon="auto_awesome" label="Generate" type="outlined" />
<tk-button [ai]="true" icon="auto_awesome" label="Generate" variant="secondary" />
<tk-button [ai]="true" icon="auto_awesome" label="Generate" variant="secondary" type="outlined" />`;

  const demo = (
    <div className="flex justify-center flex-wrap gap-2">
      <TkButton ai icon="auto_awesome" label="Generate" />
      <TkButton ai icon="auto_awesome" label="Generate" type="outlined" />
      <TkButton ai icon="auto_awesome" label="Generate" variant="secondary" />
      <TkButton ai icon="auto_awesome" label="Generate" variant="secondary" type="outlined" />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default AI;
