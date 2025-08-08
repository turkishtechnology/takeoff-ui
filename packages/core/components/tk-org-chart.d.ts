import type { Components, JSX } from '../dist/types/components';

interface TkOrgChart extends Components.TkOrgChart, HTMLElement {}
export const TkOrgChart: {
  prototype: TkOrgChart;
  new (): TkOrgChart;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
