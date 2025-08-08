import type { Components, JSX } from '../dist/types/components';

interface TkAvatar extends Components.TkAvatar, HTMLElement {}
export const TkAvatar: {
  prototype: TkAvatar;
  new (): TkAvatar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
