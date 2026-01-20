import type { Linter } from 'eslint';
import stencil from '@stencil/eslint-plugin';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

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
    // Can add rules for the rest of the JS/TS files here
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
      'packages/*/lib/**/*.js',
      'turbo.json',
    ],
  },
] as Linter.Config[];
