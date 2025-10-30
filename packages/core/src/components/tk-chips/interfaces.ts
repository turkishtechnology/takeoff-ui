import { IIconOptions } from '../../global/interfaces/IIconOptions';

export type CSSStyleProperties = { [K in keyof CSSStyleDeclaration as CSSStyleDeclaration[K] extends string ? K : never]: string };

export interface IChipOptions {
  icon?: string | IIconOptions;
  type?: 'filled' | 'filledlight' | 'outlined' | 'avatar';
  size?: 'large' | 'base' | 'small';
  variant?: 'primary' | 'secondary' | 'neutral' | 'info' | 'success' | 'danger' | 'warning' | 'verified';
  styles?: Partial<CSSStyleProperties>;
}
