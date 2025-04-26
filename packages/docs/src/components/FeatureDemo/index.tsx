import { TkAccordion, TkAccordionItem } from '@takeoff-ui/react';
import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

const FeatureDemo = ({
  demo,
  reactCode,
  vueCode,
  angularCode,
  cssCode = '',
  dataExample = null,
}) => {
  return (
    <>
      <div
        className="p-3 rounded-sm"
        style={{
          border: '1px solid var(--border-light)',
          background: 'var(--background-lightest)',
        }}
        className="p-4 rounded-lg"
      >
        {demo}
      </div>
      <TkAccordion>
        <TkAccordionItem>
          <span slot="header">View Code</span>
          <div slot="content">
            <Tabs>
              <TabItem value="react" label="React" default>
                <CodeBlock className="m-0" language="tsx" showLineNumbers>
                  {reactCode}
                </CodeBlock>
              </TabItem>
              <TabItem value="vue" label="Vue">
                <CodeBlock className="m-0" language="tsx" showLineNumbers>
                  {vueCode}
                </CodeBlock>
              </TabItem>
              <TabItem value="angular" label="Angular">
                <CodeBlock className="m-0" language="tsx" showLineNumbers>
                  {angularCode}
                </CodeBlock>
              </TabItem>
              {cssCode && (
                <TabItem value="css" label="CSS">
                  <CodeBlock className="m-0 p-0" language="css" showLineNumbers>
                    {cssCode}
                  </CodeBlock>
                </TabItem>
              )}
              {dataExample && (
                <TabItem value="data" label="Data">
                  <CodeBlock className="m-0" language="json" showLineNumbers>
                    {typeof dataExample === 'string'
                      ? dataExample
                      : JSON.stringify(dataExample, null, 2)}
                  </CodeBlock>
                </TabItem>
              )}
            </Tabs>
          </div>
        </TkAccordionItem>
      </TkAccordion>
    </>
  );
};

export default FeatureDemo;
