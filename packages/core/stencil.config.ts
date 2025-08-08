import { Config } from '@stencil/core';
import { angularOutputTarget, ValueAccessorConfig } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget, ComponentModelConfig } from '@stencil/vue-output-target';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { sass } from '@stencil/sass';

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
    // angularOutputTarget({
    //   componentCorePackage: 'component-library',
    //   directivesProxyFile: '../component-library-angular/projects/library/src/directives/proxies.ts',

    // }),
    reactOutputTarget({
      stencilPackageName: '@takeoff-ui/core',
      outDir: '../react/src',
      hydrateModule: '@takeoff-ui/core/hydrate',
      clientModule: '@takeoff-ui/react',
    }),
    // vueOutputTarget({
    //   includeImportCustomElements: true,
    //   includePolyfills: false,
    //   includeDefineCustomElements: false,
    //   componentCorePackage: 'component-library',
    //   hydrateModule: 'component-library/hydrate',
    //   proxiesFile: '../component-library-vue/src/index.ts',

    // }),
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
      type: 'dist-hydrate-script',
      dir: './hydrate',
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
