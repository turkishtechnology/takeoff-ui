/**
 * Interface representing a country for phone number input
 * @public
 */
export interface ICountry {
  /** The display name of the country */
  label: string;
  /** The ISO country code */
  id: string;
  /** The international dialing code with + prefix */
  dialCode: string;
  /** The phone number mask pattern where 9 represents a digit */
  mask: string;
}

/**
 * Interface for the output data emitted by the phone input
 * @public
 */
export interface IPhoneInputValue {
  /** The raw phone number without formatting */
  rawValue: string;
  /** The formatted phone number with mask applied */
  maskedValue: string;
  /** The selected country object */
  country: ICountry;
}
