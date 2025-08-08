import { Config } from '@stencil/core';
import { angularOutputTarget, ValueAccessorConfig } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget, ComponentModelConfig } from '@stencil/vue-output-target';
import nodePolyfills from 'rollup-plugin-node-polyfills';
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
      'tk-tree-view',
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
  taskQueue: 'async',
  plugins: [
    nodePolyfills(),
    sass({
      injectGlobalPaths: ['src/global/sass/fonts/_material-symbols.scss'],
    }),
  ],
  extras: {
    cloneNodeFix: true,
    enableImportInjection: true,
  },
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: '@takeoff-ui/core',
      directivesProxyFile: '../angular/projects/library/src/directives/proxies.ts',
    }),
    reactOutputTarget({
      stencilPackageName: '@takeoff-ui/core',
      outDir: '../react/src',
    }),
    vueOutputTarget({
      includeImportCustomElements: true,
      includePolyfills: false,
      includeDefineCustomElements: false,
      componentCorePackage: '@takeoff-ui/core',
      proxiesFile: '../vue/src/index.ts',
      componentModels: vueComponentModels,
    }),
    {
      type: 'docs-json',
      file: '../../docs/src/docs-files/docs.json',
      supplementalPublicTypes: 'src/components/tk-table/interfaces.ts',
    },
    {
      type: 'dist-custom-elements',
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
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [{ src: 'global/sass/fonts/assets/fonts', dest: 'assets/fonts' }],
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [{ src: 'global/sass/fonts/assets/fonts', dest: 'build/assets/fonts' }],
    },
  ],
};
