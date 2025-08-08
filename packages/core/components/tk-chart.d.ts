import type { Components, JSX } from '../dist/types/components';

interface TkChart extends Components.TkChart, HTMLElement {}
export const TkChart: {
  prototype: TkChart;
  new (): TkChart;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
