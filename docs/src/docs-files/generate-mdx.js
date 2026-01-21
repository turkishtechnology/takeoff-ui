const fs = require('fs');
const path = require('path');

// Stencil docs-json file path
const docsJson = path.join(__dirname, 'docs.json');

// Read docs-json file
const data = JSON.parse(fs.readFileSync(docsJson, 'utf8'));
const typeLibraryAllKeys = Object.keys(data.typeLibrary);

// Props to preserve original type name
const preservedTypes = new Set(['CSSStyleProperties', 'Separator']);

function clearString(value) {
  return value?.replaceAll('|', ',').replaceAll('\n', ' ').replaceAll('\r', ' ').replaceAll('{', '&#123;').replaceAll('}', '&#125;');
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

// Function to create a slug from type name for anchor links
function createSlug(typeName) {
  return typeName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

// Function to wrap custom types with anchor links
function wrapTypeWithLink(propType, references, tag) {
  if (!references || Object.keys(references).length === 0) {
    return propType;
  }

  let result = propType;
  Object.keys(references).forEach(refName => {
    const refData = references[refName];
    if (refData.path && refData.path.startsWith(`src/components/${tag}/`)) {
      const slug = createSlug(refName);
      result = result.replace(new RegExp(`\\b${refName}\\b`, 'g'), `[${refName}](#${slug})`);
    }
  });
  return result;
}

// Function to generate a unique heading ID from tag name and section
function generateHeadingId(tag, section) {
  // Remove 'tk-' prefix and convert to lowercase, then add section suffix
  const cleanTag = tag.replace(/^tk-/, '');
  return `${cleanTag}-${section}`;
}

// Function to generate MDX content
function generateMdx(component) {
  const { tag, docs, docsTags, props, events, methods, slots } = component;

  const reactImportCode = docsTags.find(item => item.name == 'react')?.text;
  const vueImportCode = docsTags.find(item => item.name == 'vue')?.text;
  const angularImportCode = docsTags.find(item => item.name == 'angular')?.text;

  const headContent = `import Tabs from "@theme/Tabs";
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
    apiContent += `### Props {#${generateHeadingId(tag, 'props')}}\n\n`;
    apiContent += `| Name | Type | Default | Description |\n| ---- | ---- | ------- | ----------- |\n`;
    props.forEach(prop => {
      const hasImportedType = prop.complexType?.references && Object.keys(prop.complexType.references).length > 0;

      const shouldPreserve = preservedTypes.has(prop.complexType?.original);

      let propType;
      if (shouldPreserve) {
        propType = prop.complexType?.original;
      } else {
        propType = prop.type;
      }

      if (hasImportedType && !shouldPreserve) {
        propType = wrapTypeWithLink(propType, prop.complexType.references, tag);
      }

      apiContent += `| <TkBadge label="${prop.name}" variant="primary" size="large" type="filledlight"/> | <code>${
        propType?.indexOf('{') > -1 ? '`' + clearStringObject(propType, tag, prop.name) + '`' : clearStringObject(propType, tag, prop.name)
      }</code> | ${
        prop.default?.indexOf('{') > -1 ? '`' + clearStringObject(prop.default, tag) + '`' || 'null' : clearStringObject(prop.default) || 'null'
      } | ${clearString(prop.docs)} |\n`;
    });
  }

  // Add Events Table
  if (events && events.length) {
    apiContent += `\n### Events {#${generateHeadingId(tag, 'events')}}\n\n`;
    apiContent += `| Name | Description |\n| ---- | ----------- |\n`;
    events.forEach(event => {
      apiContent += `| ${event.event} | ${clearString(event.docs)} |\n`;
    });
  }

  // Add Methods Table
  if (methods && methods.length) {
    apiContent += `\n### Methods {#${generateHeadingId(tag, 'methods')}}\n\n`;
    apiContent += `| Name | Type | Description |\n| ---- | ---- | ----------- |\n`;
    methods.forEach(method => {
      const type = method.signature.replaceAll('<', '\\<').replaceAll('>', '\\>').replaceAll(',', '\\,').replaceAll('{', '\\{').replaceAll('}', '\\}').replaceAll('|', '\\|');
      apiContent += `| ${method.name} | <code>${type}</code> | ${clearString(method.docs)} |\n`;
    });
  }

  // Add Slots Table
  if (slots && slots.length) {
    apiContent += `\n### Slots {#${generateHeadingId(tag, 'slots')}}\n\n`;
    apiContent += `| Name | Description |\n| ---- | ----------- |\n`;
    slots.forEach(slot => {
      apiContent += `| ${slot.name} | ${clearString(slot.docs)} |\n`;
    });
  }

  // Add Interfaces
  const arrKeys = typeLibraryAllKeys.filter(key => key.includes(tag));
  const componentInterfaces = arrKeys.filter(key => {
    const typeData = data.typeLibrary[key];
    return typeData.path && typeData.path.startsWith(`src/components/${tag}/`) && typeData.declaration && typeData.declaration.startsWith('export interface');
  });

  if (componentInterfaces.length > 0) {
    apiContent += `\n### Interfaces {#${generateHeadingId(tag, 'interfaces')}}\n\n`;

    componentInterfaces.forEach(key => {
      const typeData = data.typeLibrary[key];
      const typeName = key.split('::')[1];
      const slug = createSlug(typeName);
      const declaration = typeData.declaration;

      apiContent += `#### <span id="${slug}">${typeName}</span>\n\n`;

      if (typeData.docstring) {
        apiContent += typeData.docstring + '\n\n';
      }

      apiContent += `\`\`\`typescript\n${declaration.replace('export ', '')}\n\`\`\`\n\n`;
    });
  }

  const externalInterfaces = arrKeys.filter(key => {
    const typeData = data.typeLibrary[key];
    return !typeData.path || !typeData.path.startsWith(`src/components/${tag}/`);
  });

  if (externalInterfaces.length > 0) {
    externalInterfaces.forEach(key => {
      apiContent += data.typeLibrary[key].docstring + '\n\n';
      apiContent += `\`\`\`typescript\n${data.typeLibrary[key].declaration?.replace('export ', '')}\n\`\`\`\n\n`;
    });
  }

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
