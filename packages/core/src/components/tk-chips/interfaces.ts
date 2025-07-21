import { IIconOptions } from '../../global/interfaces/IIconOptions';

export interface IChipsOptions {
  label?: string;
  icon?: string | IIconOptions;
  type?: 'filled' | 'filledlight' | 'outlined' | 'avatar';
  size?: 'large' | 'base' | 'small';
  variant?: 'primary' | 'secondary' | 'neutral' | 'info' | 'success' | 'danger' | 'warning' | 'verified';
}
