/**
 * Interfaces for the tk-currency-input component.
 */
export interface ICurrency {
  id: string;
  code: string;
  symbol: string;
  name: string;
  decimalSeparator: Seperator;
  thousandsSeparator: Seperator;
}

/**
 * Event data emitted when the currency input value changes.
 * Contains the numeric value, formatted value, and selected currency.
 */
export interface CurrencyInputChangeEvent {
  value: number;
  formattedValue: string;
  currency: ICurrency;
}

/**
 * The decimal/thousands separators for the currency input.
 */
export type Seperator = ',' | '.' | ' ';
