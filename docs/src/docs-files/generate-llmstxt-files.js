const fs = require('fs');
const path = require('path');

function escapeStringForKonsolLog(str) {
  if (typeof str === 'string') {
    return str.replace(/\\\\/g, '\\\\\\\\').replace(/`/g, '\\\\`').replace(/\$/g, '\\\\$');
  }
  return str;
}

function cleanString(value) {
  return value?.replaceAll('|', ',').replaceAll('\\n', ' ').replaceAll('\\r', ' ');
}

function cleanStringObject(value, tag, propName) {
  if (tag === 'tk-chart') {
    if (value?.includes('ChartData')) return 'ChartData';
    if (propName === 'options') return 'ChartOptions';
  }
  return value
    ?.replaceAll('|', ',')
    .replaceAll('\\n', ' ')
    .replaceAll('\\r', ' ')
    .replaceAll(' ', '')
    .replaceAll(',', ', ')
    .replaceAll(';', '; ')
    .replaceAll(':', ': ')
    .replaceAll('{', '{ ');
}

function extractIntroductionParagraph(mdxContent) {
  if (!mdxContent) return '';
  const lines = mdxContent.split('\\n');
  const paragraphLines = [];
  let inParagraph = false;
  let pastImportsAndFrontmatter = false;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!pastImportsAndFrontmatter) {
      if (trimmedLine.startsWith('---') || trimmedLine.startsWith('import') || trimmedLine === '') {
        if (trimmedLine.startsWith('---') && lines.indexOf(line) > 0 && !lines[lines.indexOf(line) - 1].startsWith('---')) {
          pastImportsAndFrontmatter = true;
        } else if (!trimmedLine.startsWith('---')) {
          pastImportsAndFrontmatter = true;
        }
        continue;
      }
      pastImportsAndFrontmatter = true;
    }

    if (pastImportsAndFrontmatter) {
      if (trimmedLine.startsWith('<') || trimmedLine.startsWith('```') || trimmedLine.startsWith('#')) {
        if (inParagraph) break;
        else continue;
      }
      if (trimmedLine !== '') {
        paragraphLines.push(trimmedLine);
        inParagraph = true;
      } else {
        if (inParagraph) break;
      }
    }
  }
  return paragraphLines.join(' ').trim();
}

function removeMdxFrontmatter(mdxContent) {
  if (!mdxContent) return '';
  const lines = mdxContent.split('\n');
  if (lines[0].trim() === '---') {
    let secondDashIndex = -1;
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        secondDashIndex = i;
        break;
      }
    }
    if (secondDashIndex !== -1) {
      return lines
        .slice(secondDashIndex + 1)
        .join('\n')
        .trim();
    }
  }
  return mdxContent.trim();
}

function buildApiDocumentationString(component, helpers, allTypeLibraryKeys, docsDataInstance) {
  const { tag, props, events, methods, slots } = component;
  const { localCleanString, localCleanStringObject, localEscapeStringForKonsolLog } = helpers;
  let apiContent = '';

  if (props && props.length) {
    apiContent += '### Props\n\n| Name | Type | Default | Description |\n| ---- | ---- | ------- | ----------- |\n';
    props.forEach(prop => {
      let cleanPropType = localCleanStringObject(prop.type, tag, prop.name);
      if (cleanPropType && cleanPropType.startsWith('`') && cleanPropType.endsWith('`')) {
        cleanPropType = cleanPropType.substring(1, cleanPropType.length - 1);
      }

      apiContent +=
        '| ' +
        prop.name +
        ' ' +
        '| ' +
        cleanPropType +
        ' ' +
        '| ' +
        (prop.default?.indexOf('{') > -1 ? '`' + localCleanStringObject(prop.default, tag) + '`' : localCleanStringObject(prop.default) || 'null') +
        ' ' + // Keep default formatting as is for now
        '| ' +
        localCleanString(prop.docs) +
        ' |\n';
    });
  }

  if (events && events.length) {
    if (apiContent.length > 0) apiContent += '\n';
    apiContent += '### Events\n\n| Name | Description |\n| ---- | ----------- |\n';
    events.forEach(event => {
      apiContent += '| ' + event.event + ' | ' + localCleanString(event.docs) + ' |\n';
    });
  }

  if (methods && methods.length) {
    if (apiContent.length > 0) apiContent += '\n';
    apiContent += '### Methods\n\n| Name | Description |\n| ---- | ----------- |\n';
    methods.forEach(method => {
      apiContent += '| ' + method.name + ' | ' + localCleanString(method.docs) + ' |\n';
    });
  }

  if (slots && slots.length) {
    if (apiContent.length > 0) apiContent += '\n';
    apiContent += '### Slots\n\n| Name | Description |\n| ---- | ----------- |\n';
    slots.forEach(slot => {
      apiContent += '| ' + slot.name + ' | ' + localCleanString(slot.docs) + ' |\n';
    });
  }

  const componentTypeKeys = allTypeLibraryKeys.filter(key => key.includes(tag));
  if (componentTypeKeys.length > 0) {
    if (apiContent.length > 0) apiContent += '\n';
    apiContent += '### Interfaces\n\n';
    componentTypeKeys.forEach(key => {
      apiContent += (docsDataInstance.typeLibrary[key].docstring || '') + '\n\n';
      const declaration = (docsDataInstance.typeLibrary[key].declaration || '').replace('export ', '');
      apiContent += '```typescript\n' + localEscapeStringForKonsolLog(declaration) + '\n```\n\n';
    });
  }

  const isSubstantial = apiContent.trim() !== '';
  return {
    rawString: apiContent.trim(),
    isSubstantial: isSubstantial,
  };
}

function buildExamplesString(tag, localEscapeStringForKonsolLog) {
  let examplesContent = '';
  const componentExamplesDir = path.join(__dirname, tag, 'Examples');

  try {
    if (fs.existsSync(componentExamplesDir)) {
      const exampleFiles = fs.readdirSync(componentExamplesDir).filter(file => file.endsWith('.tsx'));
      if (exampleFiles.length === 0) {
        // console.log('No .tsx example files found for ' + tag + ' in ' + componentExamplesDir);
      }
      exampleFiles.forEach(file => {
        const exampleName = path.basename(file, '.tsx');
        examplesContent += '// ' + exampleName + '\n\n';
        const filePath = path.join(componentExamplesDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');

        const reactCodeMatch = fileContent.match(/const reactCode\s*=\s*\`([\s\S]*?)\`\s*;/);
        const vueCodeMatch = fileContent.match(/const vueCode\s*=\s*\`([\s\S]*?)\`\s*;/);

        let codeFound = false;
        if (reactCodeMatch && reactCodeMatch[1]) {
          examplesContent += '#### React Example\n```tsx\n' + localEscapeStringForKonsolLog(reactCodeMatch[1].trim()) + '\n```\n\n';
          codeFound = true;
        }
        if (vueCodeMatch && vueCodeMatch[1]) {
          examplesContent += '#### Vue Example\n```tsx\n' + localEscapeStringForKonsolLog(vueCodeMatch[1].trim()) + '\n```\n\n';
          codeFound = true;
        }
        if (!codeFound && exampleFiles.length > 0) {
          // console.log('No reactCode or vueCode found in ' + filePath + ' for component ' + tag);
        }
      });
    } else {
      // console.log('Examples directory not found for ' + tag + ' at ' + componentExamplesDir);
    }
  } catch (error) {
    console.error('Error processing examples for ' + tag + ':', error);
    examplesContent += 'Failed to load examples for ' + tag + '.\n';
  }
  return examplesContent;
}

function generateLlmsFileContent(component, helpers, allTypeLibraryKeys, docsDataInstance) {
  const { tag, docs } = component;
  const { localCleanString, localCleanStringObject, localEscapeStringForKonsolLog, localExtractIntroductionParagraph } = helpers;

  const introductionParagraph = localExtractIntroductionParagraph(docs);
  const examplesString = buildExamplesString(tag, localEscapeStringForKonsolLog);
  const apiDocumentation = buildApiDocumentationString(component, helpers, allTypeLibraryKeys, docsDataInstance);

  let finalLlmsContent = introductionParagraph;

  if (examplesString.trim() !== '') {
    finalLlmsContent += '\n\n## Examples\n\n' + examplesString;
  }

  if (apiDocumentation.isSubstantial) {
    if (finalLlmsContent.trim() !== '') finalLlmsContent += '\n\n';
    finalLlmsContent += '## API\n\n' + apiDocumentation.rawString;
  }

  return { llmsAggregate: finalLlmsContent };
}

const docsJsonPath = path.join(__dirname, 'docs.json');
const docsData = JSON.parse(fs.readFileSync(docsJsonPath, 'utf8'));
const allTypeLibraryKeys = Object.keys(docsData.typeLibrary);

const outputLlmsDir = path.join(__dirname, '..', '..', 'static', 'llmstxt-files');

try {
  if (!fs.existsSync(outputLlmsDir)) {
    fs.mkdirSync(outputLlmsDir, { recursive: true });
  }
} catch (err) {
  console.error('Error creating LLMS output directory:', err);
  process.exit(1);
}

const scriptHelpers = {
  localCleanString: cleanString,
  localCleanStringObject: cleanStringObject,
  localEscapeStringForKonsolLog: escapeStringForKonsolLog,
  localExtractIntroductionParagraph: extractIntroductionParagraph,
};

docsData.components.forEach(component => {
  const content = generateLlmsFileContent(component, scriptHelpers, allTypeLibraryKeys, docsData);
  const llmsFilePath = path.join(outputLlmsDir, component.tag + '.txt');
  try {
    fs.writeFileSync(llmsFilePath, content.llmsAggregate);
    console.log('Generated LLM file for ' + component.tag + ' at: ' + llmsFilePath);
  } catch (error) {
    console.error('Error writing LLM file for ' + component.tag + ':', error);
  }
});

const staticMdxFiles = ['../../docs/Coding-Standards.mdx', '../../docs/CONTRIBUTING.mdx', '../../docs/Tailwind.mdx', '../../docs/Installation.mdx', '../../docs/Introduction.mdx'];

console.log('\nProcessing static MDX files:');

staticMdxFiles.forEach(relativeMdxPath => {
  const mdxFilePath = path.join(__dirname, relativeMdxPath);
  const mdxFileName = path.basename(mdxFilePath);

  try {
    if (fs.existsSync(mdxFilePath)) {
      const mdxFileContent = fs.readFileSync(mdxFilePath, 'utf8');
      const processedContent = removeMdxFrontmatter(mdxFileContent);

      const outputFileName = mdxFileName.replace(/\.mdx$/i, '').toLowerCase() + '.txt';
      const outputFilePath = path.join(outputLlmsDir, outputFileName);

      fs.writeFileSync(outputFilePath, processedContent);
      console.log('Generated LLM file for ' + mdxFileName + ' at: ' + outputFilePath);
    } else {
      console.warn('Static MDX file not found: ' + mdxFilePath);
    }
  } catch (error) {
    console.error('Error processing static MDX file ' + mdxFileName + ':', error);
  }
});
