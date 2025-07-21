/** Defines the options for configuring badges in tree view components */
export interface IBadgeOptions {
  /**
   * Badge type appearance
   */
  type?: 'filled' | 'filledlight' | 'outlined' | 'text';
  /**
   * Badge color variant
   */
  variant?: 'primary' | 'secondary' | 'neutral' | 'info' | 'success' | 'danger' | 'warning' | 'verified' | 'purple' | 'cyan' | 'business';
  /**
   * Whether badge corners are rounded
   */
  rounded?: boolean;
  /**
   * Icon to display in badge
   */
  icon?: string;
  /**
   * Position of icon in badge
   */
  iconPosition?: 'left' | 'right';
}
