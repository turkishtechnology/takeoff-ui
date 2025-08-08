import React, { useRef, useState, useEffect } from 'react';
import { TkEditor, TkRadioGroup, TkRadio, TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const GetContent = () => {
  const editorRef = useRef<HTMLTkEditorElement>(null);
  const [outputContent, setOutputContent] = useState('');
  const [outputFormat, setOutputFormat] = useState<'html' | 'text' | 'json'>('html');
  const [codeSampleReact, setCodeSampleReact] = useState('');
  const [codeSampleVue, setCodeSampleVue] = useState('');

  const initialContent = `<h3>Try Different Output Formats</h3>
<p>This editor demonstrates how to retrieve content in different formats using the getContent() method.</p>
<ul>
<li>HTML format - includes all formatting and structure</li>
<li>Plain Text format - only text content</li>
<li>JSON format - Prosemirror document structure</li>
</ul>`;

  const formatTypes = [
    { label: 'HTML', value: 'html' },
    { label: 'Plain Text', value: 'text' },
    { label: 'JSON', value: 'json' },
  ];

  const handleFormatChange = event => {
    setOutputFormat(event.detail);
    setOutputContent('');
  };

  const handleGetContent = async () => {
    if (editorRef.current) {
      const content = await editorRef.current.getContent(outputFormat);
      setOutputContent(typeof content === 'string' ? content : JSON.stringify(content, null, 2));
    }
  };

  useEffect(() => {
    const newCodeSampleReact = `import { TkEditor } from "@takeoff-ui/react";
const editorRef = useRef<HTMLTkEditorElement>(null);

const getContent = async () => {
const content = await editorRef.current?.getContent("${outputFormat}");
console.log(content);
};

return (
    <>
    <TkEditor ref={editorRef} value={content} />
    <TkButton label="Get Content" onTkClick={() => getContent()} />
    </>
  );
`;
    const newCodeSampleVue = `<script setup>
import { ref } from 'vue';
import { TkEditor } from "@takeoff-ui/vue";

const editorRef = ref();

const getContent = async () => {
const content = await editorRef.value?.getContent("${outputFormat}");
console.log(content);
};

</script>
<template>
    <TkEditor ref="editorRef" v-model="content" />
</template>`;
    setCodeSampleReact(newCodeSampleReact);
    setCodeSampleVue(newCodeSampleVue);
  }, [outputFormat]);

  const demo = (
    <div className="flex flex-col gap-4">
      <TkEditor ref={editorRef} value={initialContent} />
      <div className="flex flex-col gap-4">
        <TkRadioGroup label="Output Format" value={outputFormat} onTkChange={handleFormatChange}>
          {formatTypes.map((format, index) => (
            <TkRadio key={index} label={format.label} value={format.value} />
          ))}
        </TkRadioGroup>
        <TkButton label="Get Content" variant="primary" onTkClick={handleGetContent} />
      </div>
      {outputContent && (
        <div className="mt-4">
          <div className="font-medium mb-2">Output ({outputFormat}):</div>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-[300px]">{outputContent}</pre>
        </div>
      )}
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={codeSampleReact} vueCode={codeSampleVue} angularCode={''} />;
};

export default GetContent;
