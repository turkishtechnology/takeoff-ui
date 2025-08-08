const fs = require('fs');
const path = require('path');

// Stencil docs-json file path
const docsJson = path.join(__dirname, 'docs.json');

// Read docs-json file
const data = JSON.parse(fs.readFileSync(docsJson, 'utf8'));
const typeLibraryAllKeys = Object.keys(data.typeLibrary);

function clearString(value) {
  return value?.replaceAll('|', ',').replaceAll('\n', ' ').replaceAll('\r', ' ');
}

function clearStringObject(value, tag, propName) {
  if (tag == 'tk-chart') {
    if (value?.indexOf('ChartData') > -1) {
      return 'ChartData';
    } else if (propName == 'options') {
      return 'ChartOptions';
    }
  }
  return value
    ?.replaceAll('|', ',')
    .replaceAll('\n', ' ')
    .replaceAll('\r', ' ')
    .replaceAll(' ', '')
    .replaceAll(',', ', ')
    .replaceAll(';', '; ')
    .replaceAll(':', ': ')
    .replaceAll('{', '{ ');
}

// Function to generate MDX content
function generateMdx(component) {
  const { tag, docs, docsTags, props, events, methods, slots } = component;

  // Start MDX head content
  const reactImportCode = docsTags.find(item => item.name == 'react')?.text;
  const vueImportCode = docsTags.find(item => item.name == 'vue')?.text;
  const angularImportCode = docsTags.find(item => item.name == 'angular')?.text;

  let headContent = `import Tabs from "@theme/Tabs";
import CodeBlock from '@theme/CodeBlock'
import TabItem from "@theme/TabItem";\n
${docs} \n
<Tabs>
  <TabItem value="react" label="React" default>
    <CodeBlock
      language="jsx"
      showLineNumbers>
      {${reactImportCode}}
    </CodeBlock>
  </TabItem>
  <TabItem value="vue" label="Vue">
    <CodeBlock
      language="jsx"
      showLineNumbers>
      {${vueImportCode}}
    </CodeBlock>
  </TabItem>
  <TabItem value="angular" label="Angular">
    <CodeBlock
      language="jsx"
      showLineNumbers>
      {${angularImportCode}}
    </CodeBlock>
  </TabItem>
</Tabs>`;

  // Start MDX api content
  let apiContent = `import { TkBadge } from "@takeoff-ui/react"; \n\n`;

  // Add Props Table
  if (props && props.length) {
    apiContent += `### Props\n\n`;
    apiContent += `| Name | Type | Default | Description |\n| ---- | ---- | ------- | ----------- |\n`;
    props.forEach(prop => {
      apiContent += `| <TkBadge label="${prop.name}" variant="primary" size="large" type="filledlight"/> | <code>${
        prop.type?.indexOf('{') > -1 ? '`' + clearStringObject(prop.type, tag, prop.name) + '`' : clearStringObject(prop.type, tag, prop.name)
      }</code> | ${
        prop.default?.indexOf('{') > -1 ? '`' + clearStringObject(prop.default, tag) + '`' || 'null' : clearStringObject(prop.default) || 'null'
      } | ${clearString(prop.docs)} |\n`;
    });
  }

  // Add Events Table
  if (events && events.length) {
    apiContent += `\n### Events\n\n`;
    apiContent += `| Name | Description |\n| ---- | ----------- |\n`;
    events.forEach(event => {
      apiContent += `| ${event.event} | ${clearString(event.docs)} |\n`;
    });
  }

  // Add Methods Table
  if (methods && methods.length) {
    apiContent += `\n### Methods\n\n`;
    apiContent += `| Name | Description |\n| ---- | ----------- |\n`;
    methods.forEach(method => {
      apiContent += `| ${method.name} | ${clearString(method.docs)} |\n`;
    });
  }

  // Add Slots Table
  if (slots && slots.length) {
    apiContent += `\n### Slots\n\n`;
    apiContent += `| Name | Description |\n| ---- | ----------- |\n`;
    slots.forEach(slot => {
      apiContent += `| ${slot.name} | ${clearString(slot.docs)} |\n`;
    });
  }

  // Add İnterfaces
  const arrKeys = typeLibraryAllKeys.filter(key => key.includes(tag));
  if (arrKeys.length > 0) {
    apiContent += `\n### Interfaces\n\n`;
  }

  arrKeys.forEach(key => {
    apiContent += data.typeLibrary[key].docstring + '\n\n';
    apiContent += `\`\`\`typescript
${data.typeLibrary[key].declaration?.replace('export ', '')}
\`\`\`\n\n`;
  });

  return { head: headContent, api: apiContent };
}

data.components.forEach(component => {
  const content = generateMdx(component);
  // fs.mkdirSync("./src/docs-files/" + component.tag);
  try {
    fs.writeFileSync('./src/docs-files/' + component.tag + '/head.mdx', content.head);
    fs.writeFileSync('./src/docs-files/' + component.tag + '/api.mdx', content.api);
  } catch (error) {
    console.log(error);
  }
});
