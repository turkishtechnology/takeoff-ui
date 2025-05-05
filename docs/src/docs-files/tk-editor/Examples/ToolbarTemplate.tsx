import React, { useRef } from 'react';
import { TkEditor } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import Highlight from '@tiptap/extension-highlight';

const ToolbarTemplate = () => {
  const editorRef = useRef<HTMLTkEditorElement>(null);

  const content = `<p><mark>Lorem </mark>ipsum dolor sit amet, consectetur adipisicing elit.</p>`;
  const reactCode = `import Highlight from "@tiptap/extension-highlight";
const content = \`
${content}
\`;

const editorRef = useRef<HTMLTkEditorElement>(null);

<TkEditor
    ref={editorRef}
    label="Rich Text Editor"
    hint="You can format text using the toolbar"
    showAsterisk={true}
    value={content}
    extensions={[
        Highlight.configure()
    ]}
    toolbar={[
        ['h1', 'h2', 'bold', 'italic'],
        ['align-left', 'align-center', 'align-right'],
        [{
            action: 'highlight',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9" color="#717784"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" color="#717784"/></svg>',
            label: 'Highlight Text',
            behavior: 'toggle',
            command: (editor) => editor.chain().focus().toggleHighlight().run()
        }]
    ]}
/>`;

  const vueCode = `import Highlight from "@tiptap/extension-highlight";
const content = ref(\`
${content}
\`);

const editorRef = ref();

<TkEditor
    ref="editorRef"
    label="Rich Text Editor"
    hint="You can format text using the toolbar"
    showAsterisk
    v-model="content"
    :extensions={[
        Highlight.configure()
    ]}
    toolbar={[
        ['h1', 'h2', 'bold', 'italic'],
        ['align-left', 'align-center', 'align-right'],
        [{
            action: 'highlight',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9" color="#717784"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" color="#717784"/></svg>',
            label: 'Highlight Text',
            behavior: 'toggle',
            command: (editor) => editor.chain().focus().toggleHighlight().run()
        }]
    ]}
/>
`;

  const demo = (
    <TkEditor
      ref={editorRef}
      label="Rich Text Editor"
      hint="You can format text using the toolbar"
      showAsterisk={true}
      value={content}
      extensions={[Highlight]}
      toolbar={[
        ['h1', 'h2', 'bold', 'italic'],
        ['align-left', 'align-center', 'align-right'],
        [
          {
            action: 'highlight',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9" color="#717784"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" color="#717784"/></svg>',
            label: 'Highlight Text',
            behavior: 'toggle',
            command: (editor) => editor.chain().focus().toggleHighlight().run(),
          },
        ],
      ]}
      onTkChange={async (e) =>
        console.log(await editorRef.current.getContent('json'))
      }
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

export default ToolbarTemplate;
