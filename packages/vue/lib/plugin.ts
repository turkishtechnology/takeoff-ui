import { Plugin } from 'vue';
import { defineCustomElements } from '@takeoff-ui/core/dist/loader';

export const ComponentLibrary: Plugin = {
  async install() {
    defineCustomElements();
  },
};
