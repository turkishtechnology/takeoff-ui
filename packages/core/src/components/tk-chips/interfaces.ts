import { IIconOptions } from '../../global/interfaces/IIconOptions';
import { CSSStyleProperties } from '../../global/types';

export interface IChipOptions {
  icon?: string | IIconOptions;
  type?: 'filled' | 'filledlight' | 'outlined' | 'avatar';
  size?: 'large' | 'base' | 'small';
  variant?: 'primary' | 'secondary' | 'neutral' | 'info' | 'success' | 'danger' | 'warning' | 'verified';
  containerStyle?: CSSStyleProperties;
}
