import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import React from 'react';

const Table = () => {
  const previousReactCode = `// before-start
<TkTable 
    paginationType = "client">
</TkTable>
  // before-end
  `;
  const presentReactCode = `
//after-start
<TkTable 
    paginationType = "text"
    paginationMethod = "client">
</TkTable>
//after-end`;
  const previousVueCode = `// before-start
<TkTable 
    paginationType = "client">
</TkTable>
  // before-end
  `;
  const presentVueCode = `
//after-start
<TkTable 
    paginationType = "text"
    paginationMethod = "client">
</TkTable>
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

export default Table;
