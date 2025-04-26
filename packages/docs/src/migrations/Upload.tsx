import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import React from 'react';

const Upload = () => {
  const previousReactCode = `// before-start
<TkUpload
      onTkFilesAccepted = {handleFilesAccepted} >
</TkUpload>
  // before-end
  `;
  const presentReactCode = `
  //after-start
  <TkUpload
        onTkChange = {handleChange} >
  </TkUpload>
  //after-end`;
  const previousVueCode = ` // before-start
<TkUpload 
      @tkFilesAccepted = "handleFilesAccepted" >
</TkUpload>
  // before-end
  `;
  const presentVueCode = `
  //after-start
  <TkUpload 
        @tkChange = "handleChange" >
  </TkUpload>
  //after-end`;
  const previousAngularCode = '';
  const presentAngularCode = '';

  return (
    <>
      <Tabs>
        <TabItem value="react" label="React" default>
          <CodeBlock className="m-0" language="tsx" showLineNumbers>
            {previousReactCode}
            {presentReactCode}
          </CodeBlock>
        </TabItem>
        <TabItem value="vue" label="Vue">
          <CodeBlock className="m-0" language="tsx" showLineNumbers>
            {previousVueCode}
            {presentVueCode}
          </CodeBlock>
        </TabItem>
        <TabItem value="angular" label="Angular">
          <CodeBlock className="m-0" language="tsx" showLineNumbers>
            {previousAngularCode}
            {presentAngularCode}
          </CodeBlock>
        </TabItem>
      </Tabs>
    </>
  );
};

export default Upload;
