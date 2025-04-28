import React, { useState, useEffect } from 'react';
import { TkEditor, TkRadioGroup, TkRadio } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
const MediaAndUrl = () => {
  const [feature, setFeature] = useState<'link' | 'image'>('link');
  const [codeSampleReact, setCodeSampleReact] = useState('');
  const [codeSampleVue, setCodeSampleVue] = useState('');
  const featureTypes = [
    { label: 'URL Link', value: 'link' },
    { label: 'Image', value: 'image' },
  ];
  const handleFeatureChange = (event) => {
    setFeature(event.detail);
  };
  const initialContent =
    feature === 'link'
      ? `<h3>URL Link Example</h3>
<p>Select some text and click the link button in the toolbar to create a hyperlink. You can also click an existing link to edit it.</p>
<p>Here's a sample link to <a href="https://takeoffui.thy.com">Takeoff UI</a>.</p>`
      : `<h3>Image Example</h3>
<p>Click the image button in the toolbar to insert an image via URL. Images can enhance your content significantly.</p>
<p>Here's a sample image:</p>
<img src="https://picsum.photos/400/200" alt="Sample image" />
<p>You can add more content below the image.</p>`;
  useEffect(() => {
    const getCodeSamples = () => {
      const reactSample = `import { TkEditor } from "@takeoff-ui/react";

const content = \`
${initialContent}
\`;
// The toolbar includes built-in ${feature === 'link' ? 'link' : 'image'} handling
<TkEditor
 value={content}
 toolbar={[
   ['bold', 'italic'],
   ['${feature}']  // ${feature === 'link' ? 'URL link' : 'Image'} button
 ]}
/>`;
      const vueSample = `<script setup>
import { ref } from 'vue';
import { TkEditor } from "@takeoff-ui/vue";

const content = ref(\`
${initialContent}
\`);  
</script>
<template>
<TkEditor
   v-model="content"
   :toolbar="[
     ['bold', 'italic'],
     ['${feature}']  // ${feature === 'link' ? 'URL link' : 'Image'} button
   ]"
 />
</template>
`;
      setCodeSampleReact(reactSample);
      setCodeSampleVue(vueSample);
    };
    getCodeSamples();
  }, [feature]);
  const demo = (
    <div className="flex flex-col gap-4">
      <div style={{ overflow: 'overlay' }}>
        <TkRadioGroup
          label="Feature"
          value={feature}
          onTkChange={handleFeatureChange}
        >
          {featureTypes.map((type, index) => (
            <TkRadio key={index} label={type.label} value={type.value} />
          ))}
        </TkRadioGroup>
      </div>
      <TkEditor
        value={initialContent}
        toolbar={[['bold', 'italic'], [feature]]}
      />
    </div>
  );
  return (
    <FeatureDemo
      demo={demo}
      reactCode={codeSampleReact}
      vueCode={codeSampleVue}
      angularCode={''}
    />
  );
};
export default MediaAndUrl;
