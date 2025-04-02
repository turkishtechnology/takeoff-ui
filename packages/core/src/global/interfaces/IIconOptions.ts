/** Defines the options for configuring icons in the component */
export interface IIconOptions {
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
