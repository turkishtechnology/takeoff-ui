import { Plugin } from 'vue';
import { defineCustomElements } from '@takeoff-ui/core/loader';

export const ComponentLibrary: Plugin = {
  async install() {
    defineCustomElements();
  },
};
