export interface IAlertActionButton {
  /** Text displayed inside the button. */
  label: string;
  /** Specifies a material icon name to be displayed. */
  icon?: string;
  /** Determines the button's variant for different styles. */
  variant?: 'primary' | 'secondary' | 'danger' | 'info' | 'neutral' | 'success' | 'warning' | 'white';
  /** This field specifies the design type of the component. */
  type?: 'filled' | 'outlined' | 'text';
  /** Sets size for the component. */
  size?: 'small' | 'base' | 'large';
  /** Function to be executed on click event.*/
  action?: Function;
}
