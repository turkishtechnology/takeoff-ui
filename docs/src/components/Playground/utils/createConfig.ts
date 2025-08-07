import type { ComponentConfig } from '../Playground.types';

export function createConfigFromJson(jsonData: any, component: React.ComponentType<any>): ComponentConfig {
  return {
    ...jsonData,
    component,
  };
}
