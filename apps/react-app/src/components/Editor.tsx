import { TkEditor, TkButton } from '@takeoff-ui/react';
import React from 'react';
import { useRef } from 'react';

function Editor() {
  const content = `
    <p><mark>Lorem </mark>ipsum dolor sit amet, consectetur adipisicing elit.</p>
    `;

  const customPlaceholderStyle = `
.custom-placeholder .ProseMirror p.is-editor-empty:first-child::before {
    color: #6A5ACD;
    font-style: italic;
}`;
  const editorRef = useRef<HTMLTkEditorElement>(null);

  const getContent = async () => {
    const content = await editorRef.current?.getContent('html');
    console.log(content);
  };

  return (
    <>
      <TkEditor ref={editorRef} value={content} />
      <TkButton label="Get Content" onTkClick={() => getContent()} />
    </>
  );
}

export default Editor;
