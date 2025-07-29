import { IIconOptions } from '../../global/interfaces/IIconOptions';

/** Interface for multi-position icon configuration */
export interface IMultiIconOptions {
  left?: string | IIconOptions;
  right?: string | IIconOptions;
}

/** See cleave.js documentation https://nosir.github.io/cleave.js */
export interface IInputMaskOptions {
  backspace?: boolean;
  blocks?: number[];
  blocksLength?: number;
  copyDelimiter?: boolean;
  creditCard?: boolean;
  creditCardStrictMode?: boolean;
  creditCardType?: string;
  date?: boolean;
  dateFormatter?: any;
  dateMax?: string;
  dateMin?: string;
  datePattern?: string[];
  delimiter?: string;
  delimiterLazyShow?: boolean;
  delimiterLength?: number;
  delimiters?: any[];
  initValue?: string;
  letterOnly?: boolean;
  lowerCase?: boolean;
  maxLength?: number;
  noImmediatePrefix?: boolean;
  numeral?: boolean;
  numeralDecimalMark?: string;
  numeralDecimalScale?: number;
  numeralIntegerScale?: number;
  numeralPositiveOnly?: boolean;
  numeralThousandsGroupStyle?: string;
  numericOnly?: boolean;
  phone?: boolean;
  phoneFormatter?: any;
  phoneRegionCode?: string;
  prefix?: string;
  prefixLength?: number;
  rawValueTrimPrefix?: boolean;
  result?: string;
  signBeforePrefix?: boolean;
  stripLeadingZeroes?: boolean;
  swapHiddenInput?: boolean;
  tailPrefix?: boolean;
  time?: boolean;
  timeFormat?: string;
  timeFormatter?: any;
  timePattern?: string[];
  uppercase?: boolean;
}
