import React from 'react';
import { TkEditor } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Default = () => {
  const content = `<h2 style="text-align: center">Takeoff UI Rich Text Editor</h2>
</br>
<p>
  TkEditor is delivers a modern, intutive rich text editing experience built on <a target="_blank" rel="noopener noreferrer" class="tk-editor-link" href="https://tiptap.dev/">@tiptap</a>.
  </br>
  The component supports all of its features:
</p>
<ul>
  <li><p>Text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s></p></li>
  <li><p>Headings (h1-h4)</p></li>
  <li><p>Ordered and bullet lists</p></li><li><p>Text align&nbsp;</p></li>
</ul>`;

  const reactCode = `const content = \`
${content}
\`;

<TkEditor value={content} />
`;

  const vueCode = `const content = ref(\`
${content}
\`);

<TkEditor v-model="content" />
`;

  const demo = <TkEditor value={content} />;

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={''}
    ></FeatureDemo>
  );
};

export default Default;
