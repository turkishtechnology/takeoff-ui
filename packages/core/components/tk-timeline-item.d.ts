import type { Components, JSX } from '../dist/types/components';

interface TkTimelineItem extends Components.TkTimelineItem, HTMLElement {}
export const TkTimelineItem: {
  prototype: TkTimelineItem;
  new (): TkTimelineItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
