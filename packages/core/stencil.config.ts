import { Config } from '@stencil/core';
import { angularOutputTarget, ValueAccessorConfig } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget, ComponentModelConfig } from '@stencil/vue-output-target';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export const config: Config = {
  namespace: 'core',
  taskQueue: 'async',
  plugins: [nodePolyfills()],
  outputTargets: [
    // angularOutputTarget({
    //   componentCorePackage: 'component-library',
    //   directivesProxyFile: '../component-library-angular/projects/library/src/directives/proxies.ts',

    // }),
    // reactOutputTarget({
    //   outDir: '../component-library-react/src',
    //   hydrateModule: 'component-library/hydrate',
    //   clientModule: 'component-library-react',
    //   serializeShadowRoot: { scoped: ['my-counter'], default: 'declarative-shadow-dom' }
    // }),
    // vueOutputTarget({
    //   includeImportCustomElements: true,
    //   includePolyfills: false,
    //   includeDefineCustomElements: false,
    //   componentCorePackage: 'component-library',
    //   hydrateModule: 'component-library/hydrate',
    //   proxiesFile: '../component-library-vue/src/index.ts',

    // }),
    {
      type: 'dist-custom-elements',
      externalRuntime: false,
      dir: 'components',
    },
    {
      type: 'dist',
      esmLoaderPath: '../loader',
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
    },
  ],
};
