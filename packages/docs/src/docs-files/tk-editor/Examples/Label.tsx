import React from 'react';
import { TkEditor } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Label = () => {
  const content = `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>`;
  const reactCode = `const content = \`
${content}
\`;

<TkEditor label="Rich Text Editor" value={content} hint="Supporting text" showAsterisk />
`;

  const vueCode = `const content = ref(\`
${content}
\`);

<TkEditor label="Rich Text Editor" :value="content" hint="Supporting text" showAsterisk />
`;

  const demo = (
    <TkEditor
      label="Rich Text Editor"
      value={content}
      hint="Supporting text"
      showAsterisk
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

export default Label;
