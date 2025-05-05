export interface IBreadcrumbModel {
  /** Label text for the item */
  label: string;
  /** URL for the item */
  href?: string;
  /** Icon to display alongside the label */
  icon?: string;
  /** Whether the item is an external url */
  isExternal?: boolean;
}
