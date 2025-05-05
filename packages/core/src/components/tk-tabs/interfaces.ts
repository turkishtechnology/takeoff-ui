/** Defines the options for configuring icons in the Tabs Item component */
export interface ITabsIconOptions {
  /**
   * Material symbols icon name
   */
  name: string;
  /**
   * The color of the icon
   */
  color?: string;
  /**
   * The style of the icon
   */
  style?: 'outlined' | 'rounded' | 'sharp';
  /**
   * Indicates whether the icon should be filled
   */
  fill?: boolean;
}
