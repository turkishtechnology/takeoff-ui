import { TkTextarea } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Size = () => {
  const reactCode = `<TkTextarea
  label="Small Textarea"
  size="small"
/>
<TkTextarea
  label="Base Textarea"
  size="base"
/>
<TkTextarea
  label="Large Textarea"
  size="large"
/>`;

  const vueCode = `<TkTextarea
  label="Small Textarea"
  size="small"
/>
<TkTextarea
  label="Base Textarea"
  size="base"
/>
<TkTextarea
  label="Large Textarea"
  size="large"
/>`;

  const angularCode = `<tk-textarea
  label="Small Textarea"
  size="small"
/>
<tk-textarea
  label="Base Textarea"
  size="base"
/>
<tk-textarea
  label="Large Textarea"
  size="large"
/>`;

  const demo = (
    <div className="flex items-end gap-2 flex-wrap jusitfy-center">
      <TkTextarea label="Small Textarea" size="small" />
      <TkTextarea label="Base Textarea" size="base" />
      <TkTextarea label="Large Textarea" size="large" />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Size;
