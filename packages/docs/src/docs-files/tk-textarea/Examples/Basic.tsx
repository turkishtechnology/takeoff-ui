import { TkTextarea } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Basic = () => {
  const reactCode = `<TkTextarea
  label="Textarea"
  hint="Hint text"
  placeholder="Placeholder text"
/>`;

  const vueCode = `<TkTextarea
  label="Textarea"
  hint="Hint text"
  placeholder="Placeholder text"
/>`;

  const demo = (
    <TkTextarea
      label="Textarea"
      hint="Hint text"
      placeholder="Placeholder text"
    />
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

export default Basic;
