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
 * Interface for phone input component props
 * @public
 */
export interface IPhoneInputProps {
  /** The list of countries to display in the dropdown */
  countryList?: ICountry[] | string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** The default country to select */
  initialCountry?: string;
  /** Placeholder text for the phone input */
  placeholder?: string;
  /** Error message for incomplete phone numbers */
  errorMessageIncomplete?: string;
  /** Error message for too long phone numbers */
  errorMessageTooLong?: string;
  /** Success message for valid phone numbers */
  successMessage?: string;
}

/**
 * Interface for phone input validation state
 * @internal
 */
export interface IPhoneInputValidation {
  /** Whether the input has been touched */
  isPristine: boolean;
  /** Validation message to display */
  message: string;
  /** Whether the phone number is valid */
  isValid: boolean;
}

/**
 * Interface for the output data emitted by the phone input
 * @public
 */
export interface IPhoneInputData {
  /** The raw phone number without formatting */
  rawValue: string;
  /** The formatted phone number with mask applied */
  maskedValue: string;
  /** The international dialing code */
  dialCode: string;
  /** The selected country object */
  country: ICountry;
}

/**
 * Array of IPhoneInputData
 * @public
 */
export type IPhoneInputDataList = IPhoneInputData[];
