import type { Components, JSX } from '../dist/types/components';

interface TkAvatarGroup extends Components.TkAvatarGroup, HTMLElement {}
export const TkAvatarGroup: {
  prototype: TkAvatarGroup;
  new (): TkAvatarGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
