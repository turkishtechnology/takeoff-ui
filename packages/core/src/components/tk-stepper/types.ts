import { IIconOptions } from '../../global/interfaces/IIconOptions';

export interface IStep {
  header: string;
  subheader?: string;
  icon?: string | IIconOptions;
  completeIcon?: string | IIconOptions;
  activeIcon?: string | IIconOptions;
  inactiveIcon?: string | IIconOptions;
  errorIcon?: string | IIconOptions;
  complete: boolean;
  error: boolean;
  isActive: boolean;
  isClickable?: boolean;
  labelPosition?: 'flip' | 'non-flip';
  disabled?: boolean;
  stepMode?: 'basic' | 'number';
}

export interface IStepClickDetail {
  index: number;
  status: 'completed' | 'active' | 'inactive' | 'error' | 'disabled';
}
