#!/usr/bin/env node

/**
 * Extracts component API from docs.json for a given tag name.
 * Usage: node get-component-api.mjs <tag-name>
 * Example: node get-component-api.mjs tk-button
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_PATH = resolve(__dirname, '../../../../docs/src/docs-files/docs.json');

const tagName = process.argv[2];

if (!tagName) {
  console.error('Usage: node get-component-api.mjs <tag-name>');
  console.error('Example: node get-component-api.mjs tk-button');
  process.exit(1);
}

let docs;
try {
  docs = JSON.parse(readFileSync(DOCS_PATH, 'utf-8'));
} catch (err) {
  console.error(`Error reading docs.json: ${err.message}`);
  process.exit(1);
}

const component = docs.components.find(c => c.tag === tagName);

if (!component) {
  console.error(`Component "${tagName}" not found in docs.json.`);
  console.error('Available components:');
  docs.components.forEach(c => console.error(`  ${c.tag}`));
  process.exit(1);
}

const lines = [];

// Header
const pascalName = tagName
  .split('-')
  .map(s => s.charAt(0).toUpperCase() + s.slice(1))
  .join('');

lines.push(`# ${tagName}`);
lines.push('');
if (component.docs) {
  lines.push(component.docs.trim());
  lines.push('');
}
lines.push(`- **Tag:** \`${tagName}\``);
lines.push(`- **React/Vue:** \`${pascalName}\``);
lines.push(`- **Shadow DOM:** ${component.encapsulation === 'shadow' ? 'Yes' : 'No'}`);
lines.push('');

// Props
if (component.props && component.props.length > 0) {
  lines.push('## Props');
  lines.push('');
  lines.push('| Name | Type | Default | Required | Description |');
  lines.push('|------|------|---------|----------|-------------|');
  for (const prop of component.props) {
    const name = prop.name || '';
    const type = (prop.complexType?.original || prop.type || '').replace(/\|/g, '\\|');
    const def = prop.default != null ? String(prop.default).replace(/\|/g, '\\|') : '-';
    const required = prop.required ? 'Yes' : 'No';
    const desc = (prop.docs || '').replace(/\n/g, ' ').replace(/\|/g, '\\|').trim();
    lines.push(`| \`${name}\` | \`${type}\` | \`${def}\` | ${required} | ${desc} |`);
  }
  lines.push('');
}

// Events
if (component.events && component.events.length > 0) {
  lines.push('## Events');
  lines.push('');
  lines.push('| Name | Detail Type | Description |');
  lines.push('|------|------------|-------------|');
  for (const event of component.events) {
    const name = event.event || '';
    const detail = (event.complexType?.original || event.detail || '').replace(/\|/g, '\\|');
    const desc = (event.docs || '').replace(/\n/g, ' ').replace(/\|/g, '\\|').trim();
    lines.push(`| \`${name}\` | \`${detail}\` | ${desc} |`);
  }
  lines.push('');

  // Event naming across frameworks
  lines.push('### Framework Event Names');
  lines.push('');
  lines.push('| Web Component | React | Vue | Angular |');
  lines.push('|--------------|-------|-----|---------|');
  for (const event of component.events) {
    const wcName = event.event;
    const reactName = 'on' + wcName.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
    const vueName = `@${wcName}`;
    const angularName = '(' + wcName.split('-').map((s, i) => i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)).join('') + ')';
    lines.push(`| \`${wcName}\` | \`${reactName}\` | \`${vueName}\` | \`${angularName}\` |`);
  }
  lines.push('');
}

// Methods
if (component.methods && component.methods.length > 0) {
  lines.push('## Methods');
  lines.push('');
  lines.push('| Name | Signature | Description |');
  lines.push('|------|-----------|-------------|');
  for (const method of component.methods) {
    const name = method.name || '';
    const sig = (method.signature || '').replace(/\|/g, '\\|');
    const desc = (method.docs || '').replace(/\n/g, ' ').replace(/\|/g, '\\|').trim();
    lines.push(`| \`${name}\` | \`${sig}\` | ${desc} |`);
  }
  lines.push('');
}

// Slots
if (component.slots && component.slots.length > 0) {
  lines.push('## Slots');
  lines.push('');
  lines.push('| Name | Description |');
  lines.push('|------|-------------|');
  for (const slot of component.slots) {
    const name = slot.name || '(default)';
    const desc = (slot.docs || '').replace(/\n/g, ' ').replace(/\|/g, '\\|').trim();
    lines.push(`| \`${name}\` | ${desc} |`);
  }
  lines.push('');
}

// Dependencies
if (component.dependencies && component.dependencies.length > 0) {
  lines.push('## Dependencies');
  lines.push('');
  lines.push('Uses: ' + component.dependencies.map(d => `\`${d}\``).join(', '));
  lines.push('');
}

if (component.dependents && component.dependents.length > 0) {
  lines.push('Used by: ' + component.dependents.map(d => `\`${d}\``).join(', '));
  lines.push('');
}

// Collect referenced interfaces
const interfaces = new Set();
if (component.props) {
  for (const prop of component.props) {
    if (prop.complexType?.references) {
      for (const [refName, ref] of Object.entries(prop.complexType.references)) {
        if (ref.location === 'import' || ref.location === 'local') {
          interfaces.add(refName);
        }
      }
    }
  }
}
if (component.events) {
  for (const event of component.events) {
    if (event.complexType?.references) {
      for (const [refName, ref] of Object.entries(event.complexType.references)) {
        if (ref.location === 'import' || ref.location === 'local') {
          interfaces.add(refName);
        }
      }
    }
  }
}

if (interfaces.size > 0) {
  lines.push('## Referenced Interfaces');
  lines.push('');
  lines.push('This component references: ' + [...interfaces].map(i => `\`${i}\``).join(', '));
  lines.push('');
  lines.push('> Use the component source files or TypeScript definitions for full interface details.');
  lines.push('');
}

console.log(lines.join('\n'));
