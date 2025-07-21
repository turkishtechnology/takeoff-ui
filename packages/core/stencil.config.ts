import { Config } from '@stencil/core';
import { ComponentModelConfig, vueOutputTarget } from '@stencil/vue-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';
import { ValueAccessorConfig, angularOutputTarget } from '@stencil/angular-output-target';
import { sass } from '@stencil/sass';

const vueComponentModels: ComponentModelConfig[] = [
  {
    elements: [
      'tk-input',
      'tk-phone-input',
      'tk-textarea',
      'tk-checkbox',
      'tk-toggle',
      'tk-radio-group',
      'tk-radio',
      'tk-select',
      'tk-datepicker',
      'tk-rating',
      'tk-editor',
      'tk-upload',
    ],
    event: 'tk-change',
    targetAttr: 'value',
  },
  {
    elements: ['tk-dialog'],
    event: 'tk-visible-change',
    targetAttr: 'visible',
  },
  {
    elements: ['tk-drawer'],
    event: 'tk-drawer-change',
    targetAttr: 'open',
  },
  {
    elements: ['tk-stepper'],
    event: 'tk-step-change',
    targetAttr: 'active',
  },
];

const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: ['tk-input', 'tk-phone-input', 'tk-select', 'tk-datepicker', 'tk-rating'],
    event: 'tk-change',
    targetAttr: 'value',
    type: 'text',
  },
  {
    elementSelectors: ['tk-radio-group', 'tk-radio'],
    event: 'tk-change',
    targetAttr: 'value',
    type: 'radio',
  },
  {
    elementSelectors: ['tk-checkbox', 'tk-toggle'],
    event: 'tk-change',
    targetAttr: 'value',
    type: 'boolean',
  },
];

export const config: Config = {
  namespace: 'core',
  globalStyle: 'src/global/sass/style.scss',
  extras: {
    cloneNodeFix: true,
    enableImportInjection: true,
  },
  outputTargets: [
    vueOutputTarget({
      componentCorePackage: '@takeoff-ui/core',
      proxiesFile: '../vue/lib/components.ts',
      componentModels: vueComponentModels,
      includePolyfills: true,
    }),
    reactOutputTarget({
      outDir: '../react/lib/components/stencil-generated/',
      stencilPackageName: '@takeoff-ui/core',
    }),
    angularOutputTarget({
      componentCorePackage: '@takeoff-ui/core',
      outputType: 'component',
      directivesProxyFile: '../angular/projects/library/src/lib/stencil-generated/components.ts',
      directivesArrayFile: '../angular/projects/library/src/lib/stencil-generated/index.ts',
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
    {
      type: 'docs-json',
      file: '../../docs/src/docs-files/docs.json',
      supplementalPublicTypes: 'src/components/tk-table/interfaces.ts',
    },
    {
      type: 'dist',
      copy: [{ src: 'global/sass/fonts/assets/fonts', dest: 'assets/fonts' }],
    },
    {
      type: 'dist-custom-elements',
      // customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
      copy: [
        {
          src: '**/*.{jpg,png}',
          dest: 'dist',
          warn: true,
        },
      ],
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [{ src: 'global/sass/fonts/assets/fonts', dest: 'build/assets/fonts' }],
    },
  ],
  testing: {
    browserHeadless: true,
  },
  plugins: [
    sass({
      injectGlobalPaths: ['src/global/sass/fonts/_material-symbols.scss'],
    }),
  ],
};
