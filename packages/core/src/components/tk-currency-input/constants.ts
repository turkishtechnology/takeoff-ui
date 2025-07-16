import { ICurrency } from './interfaces';

export const INTERNAL_CURRENCY_LIST: ICurrency[] = [
  { code: 'USD', id: 'US', symbol: '$', name: 'US Dollar', decimalSeparator: '.', thousandsSeparator: ',' },
  { code: 'EUR', id: 'DE', symbol: '€', name: 'Euro', decimalSeparator: ',', thousandsSeparator: '.' },
  { code: 'GBP', id: 'GB', symbol: '£', name: 'British Pound', decimalSeparator: '.', thousandsSeparator: ',' },
  { code: 'TRY', id: 'TR', symbol: '₺', name: 'Turkish Lira', decimalSeparator: ',', thousandsSeparator: '.' },
  { code: 'JPY', id: 'JP', symbol: '¥', name: 'Japanese Yen', decimalSeparator: '.', thousandsSeparator: ',' },
  { code: 'CAD', id: 'CA', symbol: 'C$', name: 'Canadian Dollar', decimalSeparator: '.', thousandsSeparator: ',' },
  { code: 'AUD', id: 'AU', symbol: 'A$', name: 'Australian Dollar', decimalSeparator: '.', thousandsSeparator: ',' },
  { code: 'CHF', id: 'CH', symbol: 'Fr', name: 'Swiss Franc', decimalSeparator: '.', thousandsSeparator: ',' },
  { code: 'CNY', id: 'CN', symbol: '¥', name: 'Chinese Yuan', decimalSeparator: '.', thousandsSeparator: ',' },
  { code: 'SEK', id: 'SE', symbol: 'kr', name: 'Swedish Krona', decimalSeparator: ',', thousandsSeparator: ' ' },
];
