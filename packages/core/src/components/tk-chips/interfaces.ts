import { IIconOptions } from '../../global/interfaces/IIconOptions';

export interface IChips {
  label: string;
  icon?: string | IIconOptions;
  disabled?: boolean;
  type?: 'filled' | 'filledlight' | 'outlined' | 'avatar';
  size?: 'large' | 'base' | 'small';
  variant?: 'primary' | 'secondary' | 'neutral' | 'info' | 'success' | 'danger' | 'warning' | 'verified';
  chipStyle?: any;
  labelStyle?: any;
  autoSelfDestroy: boolean;
}
