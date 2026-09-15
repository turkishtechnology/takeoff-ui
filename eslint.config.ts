import type { Linter } from 'eslint';
import stencil from '@stencil/eslint-plugin';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

// `no-undef` only fires on plain JS - typescript-eslint turns it off for TS, where the
// compiler already reports unknown identifiers. So this covers the Node scripts and configs.
const nodeGlobals = {
  require: 'readonly',
  module: 'writable',
  exports: 'writable',
  process: 'readonly',
  console: 'readonly',
  __dirname: 'readonly',
  __filename: 'readonly',
  Buffer: 'readonly',
} as const;

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Apply Stencil rules only to Stencil component files
    files: ['**/src/components/**/*.tsx', 'packages/*/src/**/*.tsx'],
    ...stencil.configs.flat.recommended,
    rules: {
      'react/jsx-no-bind': 'off',
      'stencil/reserved-member-names': 'off',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    rules: {
      // Backlog, not policy: these carry ~750 existing violations and each needs its own
      // cleanup pass. Kept as warnings so `eslint .` still fails on everything else - that is
      // what stops new violations of the remaining rules from landing.
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      // A `@ts-ignore` is allowed when it says why; a bare one is still an error.
      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
    },
  },
  {
    // Node scripts, configs and the CommonJS test entry points.
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    languageOptions: { globals: nodeGlobals },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    // Docusaurus resolves static assets through `require()`, so the ESM-only rule cannot apply.
    files: ['docs/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    // Doc examples are standalone snippets rendered as source, not compiled with the site.
    files: ['docs/src/docs-files/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
  {
    ignores: [
      '**/dist/**',
      '**/www/**',
      '**/build/**',
      '**/loader/**',
      '**/node_modules/**',
      '**/.turbo/**',
      '**/.docusaurus/**',
      'apps/vue-app/**',
      'apps/react-app/**',
      'packages/*/dist/**',
      'packages/*/www/**',
      'packages/*/build/**',
      'docs/build/**',
      '**/*.d.ts',
      // Stencil output targets write these. Linting them produced 9,265 of the repo's
      // 10,213 errors, none of them actionable.
      'packages/core/components/**',
      'packages/*/lib/**',
      'packages/angular/projects/library/src/directives/**',
      'commitlint.config.js',
      'docs/babel.config.js',
      'docs/docusaurus.config.ts',
      'docs/tailwind.config.js',
      'apps/*/postcss.config.js',
      'apps/*/tailwind.config.js',
      'apps/*/vite.config.ts',
      'apps/*/vite.config.js',
      'packages/*/stencil.config.ts',
      'packages/*/tailwind.config.cjs',
      'packages/*/scripts/**',
      'turbo.json',
    ],
  },
] as Linter.Config[];
