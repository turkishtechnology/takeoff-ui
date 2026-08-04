import { Config } from '@stencil/core';
import { ComponentModelConfig, vueOutputTarget } from '@stencil/vue-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';
import { angularOutputTarget, ValueAccessorConfig } from '@stencil/angular-output-target';
import { sass } from '@stencil/sass';

const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: ['tk-input'],
    event: 'tk-change',
    targetAttr: 'value',
    type: 'text',
  },
];

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
      'tk-tree-view',
      'tk-toggle-button-group',
      'tk-color-picker',
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

export const config: Config = {
  namespace: 'core',
  globalStyle: 'src/global/sass/style.scss',
  extras: {
    cloneNodeFix: true,
    enableImportInjection: true,
  },
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: '@takeoff-ui/core',
      directivesProxyFile: '../angular/projects/library/src/directives/proxies.ts',
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
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
    {
      type: 'docs-json',
      file: '../../docs/src/docs-files/docs.json',
      supplementalPublicTypes: 'src/components/tk-table/types.ts',
    },
    {
      type: 'dist',
      copy: [{ src: 'global/sass/fonts/assets/fonts', dest: 'assets/fonts' }],
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      // customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
      dir: 'components',
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
    browserHeadless: 'shell',
    moduleNameMapper: {
      '^uuid$': '<rootDir>/jest-uuid-shim.js',
    },
  },
  plugins: [
    sass({
      injectGlobalPaths: ['src/global/sass/fonts/_material-symbols.scss'],
    }),
  ],

  minifyJs: true,
  minifyCss: true,
  sourceMap: false,
};
