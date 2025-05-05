import React from 'react';
import { TkEditor } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const States = () => {
  const content = `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>`;
  const reactCode = `const content = \`
${content}
\`;

<TkEditor value={content} readonly showAsterisk />
<TkEditor value={content} disabled />
`;

  const vueCode = `const content = ref(\`
${content}
\`);

<TkEditor v-model="content" readonly showAsterisk />
<TkEditor v-model="content" disabled />
`;

  const demo = (
    <div className="flex flex-col gap-2 items-center">
      <TkEditor label="Readonly" value={content} readonly showAsterisk />
      <TkEditor label="Disabled" value={content} disabled />
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

export default States;
