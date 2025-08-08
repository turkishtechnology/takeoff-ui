import React from 'react';
import { TkEditor } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
const CustomHeight = () => {
  const content = `<h3>Scrollable Content</h3>
<p>This editor has a fixed height with scrollable content area. The content will scroll when it exceeds the container height.</p>
</br>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
<p>Cras ut pulvinar arcu. Aliquam vel turpis vulputate, iaculis ipsum vitae, feugiat nisi.</p>
<p>Cras ut pulvinar arcu. Aliquam vel turpis vulputate, iaculis ipsum vitae, feugiat nisi.</p>
<p>Donec gravida molestie eros, eget venenatis nibh mattis et.</p>
<p>Sed bibendum, neque non interdum tincidunt, magna lacus vulputate turpis, ac venenatis eros neque at tellus. Integer nec magna urna.</p>
<p>Sed convallis sapien a laoreet tempor. Proin enim lectus, tincidunt a magna non, gravida imperdiet urna. Maecenas non ultrices lacus.</p>`;

  const reactCode = `const content = \`
${content}
\`;

<TkEditor
 contentStyle={{ height: "200px" }}
 value={content}
/>`;

  const vueCode = `const content = ref(\`
${content}
\`);
    
<TkEditor
 :contentStyle="{ height: '200px' }"
 v-model="content"
/>`;

  const demo = <TkEditor contentStyle={{ height: '200px' }} value={content} />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''} />;
};
export default CustomHeight;
