import { IIconOptions } from './IIconOptions';

export interface ITooltipOptions {
  /**
   * Sets header text for the tooltip.
   */
  header?: string;
  /**
   * Sets description text for the tooltip.
   */
  description?: string;
  /**
   * Sets the position of the tooltip.
   */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Sets the variant of the tooltip.
   */
  variant?: 'dark' | 'white' | 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  /**
   * Sets the icon of the tooltip.
   */
  icon: string | IIconOptions;
}
