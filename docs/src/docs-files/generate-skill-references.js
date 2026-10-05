// Regenerates the component API sections of the takeoff-ui agent skill
// (.agents/skills/takeoff-ui/references/components-*.md) from the Stencil
// docs-json output, so the skill can no longer drift from the components.
//
//   node generate-skill-references.js          rewrite the reference files
//   node generate-skill-references.js --check  exit 1 if they are out of date
//
// Hand-written guidance for a component goes between
// `<!-- skill-notes:start -->` and `<!-- skill-notes:end -->` inside its
// section; that block is carried over untouched on every run.

const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

const ROOT = path.join(__dirname, '../../..');
const SKILL_DIR = path.join(ROOT, '.agents/skills/takeoff-ui');
const REFERENCES_DIR = path.join(SKILL_DIR, 'references');
const docsJson = path.join(__dirname, 'docs.json');

// Which reference file each component lives in, in reading order. A new
// component has to be added here, otherwise the run fails.
const CATEGORIES = {
  'components-form.md': [
    'tk-input',
    'tk-textarea',
    'tk-select',
    'tk-checkbox',
    'tk-radio',
    'tk-radio-group',
    'tk-toggle',
    'tk-toggle-button',
    'tk-toggle-button-group',
    'tk-datepicker',
    'tk-currency-input',
    'tk-phone-input',
    'tk-upload',
    'tk-color-picker',
    'tk-slider',
    'tk-editor',
    'tk-rating',
    'tk-button',
  ],
  'components-data.md': [
    'tk-table',
    'tk-pagination',
    'tk-chart',
    'tk-gantt-chart',
    'tk-org-chart',
    'tk-tree-view',
    'tk-badge',
    'tk-avatar',
    'tk-avatar-group',
    'tk-carousel',
    'tk-chips',
    'tk-icon',
    'tk-timeline',
    'tk-timeline-item',
  ],
  'components-feedback.md': ['tk-alert', 'tk-dialog', 'tk-drawer', 'tk-spinner', 'tk-tooltip', 'tk-popover'],
  'components-navigation.md': ['tk-tabs', 'tk-tabs-item', 'tk-stepper', 'tk-step', 'tk-breadcrumb', 'tk-breadcrumb-item', 'tk-dropdown'],
  'components-layout.md': ['tk-accordion', 'tk-accordion-item', 'tk-card', 'tk-divider'],
};

// Test hooks, not something an app author sets.
const HIDDEN_PROPS = new Set(['dataTestid']);

const NOTES_PATTERN = /<!-- skill-notes:start -->[\s\S]*?<!-- skill-notes:end -->/;

function cell(value) {
  return (value ?? '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/\s+/g, ' ')
    .replaceAll('|', '\\|')
    .trim();
}

// Inline object types (CSSProperties expands to ~500 members) are unreadable,
// so those fall back to the type name as written in the source.
function propType(prop) {
  return prop.type?.includes('{') && prop.complexType?.original ? prop.complexType.original : prop.type;
}

function table(headers, rows) {
  const lines = [`| ${headers.join(' | ')} |`, `| ${headers.map(() => '---').join(' | ')} |`];
  rows.forEach(row => lines.push(`| ${row.map(cell).join(' | ')} |`));
  return lines.join('\n');
}

function renderSection(component, existing) {
  // A few components have no JSDoc summary; those keep the hand-written one.
  const parts = [`### ${component.tag}`, component.docs.trim() || existing.description];
  if (existing.notes) parts.push(existing.notes);

  const props = component.props.filter(prop => !HIDDEN_PROPS.has(prop.name));
  if (props.length) {
    parts.push(
      '**Props**',
      table(
        ['Name', 'Type', 'Default', 'Description'],
        props.map(prop => [prop.name, propType(prop), prop.default, prop.docs]),
      ),
    );
  }
  if (component.events.length) {
    parts.push(
      '**Events**',
      table(
        ['Name', 'Detail', 'Description'],
        component.events.map(event => [event.event, event.complexType?.original ?? event.detail, event.docs]),
      ),
    );
  }
  if (component.methods.length) {
    parts.push(
      '**Methods**',
      table(
        ['Name', 'Signature', 'Description'],
        component.methods.map(method => [method.name, method.signature, method.docs]),
      ),
    );
  }
  if (component.slots.length) {
    parts.push(
      '**Slots**',
      table(
        ['Name', 'Description'],
        component.slots.map(slot => [slot.name || '(default)', slot.docs]),
      ),
    );
  }
  return parts.join('\n\n');
}

function existingSection(content, tag) {
  const start = content.indexOf(`### ${tag}\n`);
  if (start === -1) return { description: '', notes: null };
  const end = content.indexOf('\n---\n', start);
  const section = content.slice(start + `### ${tag}\n`.length, end === -1 ? undefined : end);
  const description = section.split(/\n(?=\*\*(?:Props|Events|Methods|Slots)\*\*|<!-- skill-notes:start -->)/)[0].trim();
  return { description, notes: section.match(NOTES_PATTERN)?.[0] ?? null };
}

async function main() {
  const check = process.argv.includes('--check');
  const { components } = JSON.parse(fs.readFileSync(docsJson, 'utf8'));
  const byTag = new Map(components.map(component => [component.tag, component]));

  const listed = Object.values(CATEGORIES).flat();
  const unlisted = components.map(component => component.tag).filter(tag => !listed.includes(tag));
  const unknown = listed.filter(tag => !byTag.has(tag));
  if (unlisted.length || unknown.length) {
    if (unlisted.length) console.error(`Add to CATEGORIES in generate-skill-references.js: ${unlisted.join(', ')}`);
    if (unknown.length) console.error(`No longer in docs.json, remove from CATEGORIES: ${unknown.join(', ')}`);
    process.exit(1);
  }

  const stale = [];
  for (const [file, tags] of Object.entries(CATEGORIES)) {
    const filePath = path.join(REFERENCES_DIR, file);
    const current = fs.readFileSync(filePath, 'utf8');
    // Everything above the first component (title and intro) is hand-written.
    const intro = current.slice(0, current.indexOf('\n### tk-')).trimEnd();
    const sections = tags.map(tag => renderSection(byTag.get(tag), existingSection(current, tag)));
    const raw = `${intro}\n\n${sections.join('\n\n---\n\n')}\n\n---\n`;
    const options = await prettier.resolveConfig(filePath);
    const next = await prettier.format(raw, { ...options, filepath: filePath });

    if (next === current) continue;
    stale.push(file);
    if (!check) fs.writeFileSync(filePath, next);
  }

  // Keep the advertised component count honest.
  const count = components.length;
  for (const [file, pattern, replacement] of [
    ['SKILL.md', /provides \d+ components/, `provides ${count} components`],
    ['references/component-index.md', /all \d+ Takeoff UI components/, `all ${count} Takeoff UI components`],
  ]) {
    const filePath = path.join(SKILL_DIR, file);
    const current = fs.readFileSync(filePath, 'utf8');
    const next = current.replace(pattern, replacement);
    const missing = components.map(component => component.tag).filter(tag => !current.includes(`\`${tag}\``));
    if (missing.length) {
      console.error(`${file} does not list: ${missing.join(', ')}`);
      process.exit(1);
    }
    if (next === current) continue;
    stale.push(file);
    if (!check) fs.writeFileSync(filePath, next);
  }

  if (check && stale.length) {
    console.error(`Skill references are out of date: ${stale.join(', ')}`);
    console.error('Run `pnpm --filter @takeoff-ui/docs run generate-skill-references` after building core and commit the result.');
    process.exit(1);
  }
  console.log(check ? 'Skill references are up to date.' : `Updated ${stale.length ? stale.join(', ') : 'nothing'}.`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
