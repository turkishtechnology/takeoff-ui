import type { Components, JSX } from '../dist/types/components';

interface TkUpload extends Components.TkUpload, HTMLElement {}
export const TkUpload: {
  prototype: TkUpload;
  new (): TkUpload;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
