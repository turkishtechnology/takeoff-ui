import type { Components, JSX } from '../dist/types/components';

interface TkTimeline extends Components.TkTimeline, HTMLElement {}
export const TkTimeline: {
  prototype: TkTimeline;
  new (): TkTimeline;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
