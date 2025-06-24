import { Component, h, State, Prop, Element, Event, EventEmitter } from '@stencil/core';
import classNames from 'classnames';

import { INTERNAL_COUNTRIES } from './constants';
import { ICountry, IPhoneInputData, IPhoneInputDataList, IPhoneInputProps } from './interfaces';
import { getIconElementProps } from '../../utils/icon-props';

// For backward compatibility
export type Country = ICountry;
export type PhoneInputData = IPhoneInputData;

/**
 * Phone input component with country selector and validation
 *
 * @slot - Default slot for custom content
 */
@Component({
  tag: 'tk-phone-input',
  styleUrls: ['tk-phone-input.scss', 'flag.scss'],
  formAssociated: true,
})
export class TkPhoneInput implements IPhoneInputProps {
  @Element() private hostElement!: HTMLElement;

  /**
   * Reference to the phone number input element.
   */
  private textInput!: HTMLInputElement;

  /**
   * Reference to the country search input element.
   */
  private searchInput!: HTMLInputElement;
  /**
   * The unique identifier for the phone input.
   * Used for testing and accessibility.
   */

  @Prop({ mutable: true }) value?: IPhoneInputDataList;

  /**
   * The label for the phone input.
   * Defaults to 'Phone Number'.
   */

  @Prop() label: string = 'Phone Number';

  /**
   * The list of countries to display in the dropdown.
   * Can be provided as an array of Country objects or as a JSON string.
   */
  @Prop() countryList?: ICountry[] | string;

  /**
   * Whether the input is disabled.
   */
  @Prop() disabled: boolean = false;

  /**
   * If `true`, the user cannot modify the value.
   */
  @Prop() readonly: boolean = false;

  /**
   * The default country to select (ISO country code).
   */
  @Prop() initialCountry: string = 'US';

  /**
   * Placeholder text for the phone input.
   */
  @Prop() placeholder?: string;

  /**
   * Error message for incomplete phone numbers.
   */
  @Prop() errorMessage?: string;

  /**
   * Message to display when no countries are available.
   * If not provided, a default message will be shown.
   */

  @Prop() emptyMessage?: string;

  /**
   * Emitted when the value has changed.
   */
  @Event({ eventName: 'tk-change', composed: false }) tkChange!: EventEmitter<any>;

  /**
   * The list of countries to display in the dropdown.
   */
  @State() private countries: ICountry[] = [];

  /**
   * The currently selected country.
   */
  @State() private selectedCountry!: ICountry;

  /**
   * The current input value with mask applied.
   */
  @State() private inputValue: string = '';

  /**
   * The validation message to display.
   */
  @State() private validationMessage: string = '';

  /**
   * Whether the input has been touched.
   */
  @State() private isFocused: boolean = true;

  /**
   * Whether the country dropdown is open.
   */
  @State() private isDropdownOpen: boolean = false;

  /**
   * Whether the input is empty.
   * This is used to show a message when no countries are available.
   */
  @State() private isEmpty: boolean = false;

  /**
   * The current search term for filtering countries.
   */
  @State() private searchTerm: string = '';

  /**
   * Event handler for clicks outside the component to close dropdown.
   */
  private handleClickOutside = (event: MouseEvent): void => {
    if (!this.hostElement.contains(event.target as Node)) {
      this.isDropdownOpen = false;
    }
  };

  /**
   * Add event listeners when the component is connected to the DOM.
   */
  connectedCallback(): void {
    document.addEventListener('click', this.handleClickOutside);
  }

  /**
   * Remove event listeners when the component is disconnected from the DOM.
   */
  disconnectedCallback(): void {
    document.removeEventListener('click', this.handleClickOutside);
  }

  /**
   * Initialize the component before it is rendered.
   */
  componentWillLoad(): void {
    this.initializeCountries();
    this.setSelectedCountry(this.initialCountry);
  }

  /**
   * Initialize the list of countries from the provided prop or fallback to internal list.
   */
  private initializeCountries(): void {
    if (this.countryList) {
      try {
        const parsedList = typeof this.countryList === 'string' ? JSON.parse(this.countryList) : this.countryList;

        if (Array.isArray(parsedList) && parsedList.length > 0) {
          this.countries = parsedList;
          return;
        }
      } catch (error) {
        console.error('Failed to parse country-list prop.', error);
      }
    }

    this.countries = INTERNAL_COUNTRIES as ICountry[];
  }

  /**
   * Set the selected country by its ID.
   */
  private setSelectedCountry(countryId: string): void {
    const country = this.countries.find(c => c.id.toUpperCase() === countryId.toUpperCase());
    this.selectedCountry = country || this.countries[0];
  }

  /**
   * Apply the mask to a raw phone number.
   */
  private applyMask(rawValue: string, mask: string): string {
    let maskedValue = '';
    let digitIndex = 0;

    for (let i = 0; i < mask.length && digitIndex < rawValue.length; i++) {
      if (mask[i] === '9') {
        maskedValue += rawValue[digitIndex++];
      } else {
        maskedValue += mask[i];
      }
    }

    return maskedValue;
  }

  /**
   * Handle country selection from the dropdown.
   */
  private handleCountrySelect = (country: ICountry): void => {
    this.setSelectedCountry(country.id);
    this.inputValue = '';
    this.validationMessage = '';
    this.isFocused = true;
    this.isDropdownOpen = false;
    this.searchTerm = '';
    this.textInput?.focus();
  };

  /**
   * Toggle the country dropdown.
   */
  private toggleDropdown = (): void => {
    if (!this.disabled) {
      this.isDropdownOpen = !this.isDropdownOpen;
      if (this.isDropdownOpen) {
        this.searchInput?.focus();
      }
    }
  };

  /**
   * Handle changes to the country search input.
   */
  private handleSearchChange = (event: Event): void => {
    this.searchTerm = (event.target as HTMLInputElement).value;
  };

  /**
   * Handle changes to the phone number input.
   */
  private handleInput = (event: Event): void => {
    const inputElement = event.target as HTMLInputElement;
    const rawValue = inputElement.value.replace(/\D/g, '');
    const currentMask = this.selectedCountry.mask;
    const maxDigits = (currentMask.match(/9/g) || []).length;

    if (rawValue.length > maxDigits) {
      this.textInput.value = this.inputValue;
      return;
    }

    this.isFocused = false;
    this.inputValue = this.applyMask(rawValue, currentMask);
    this.textInput.value = this.inputValue;
    this.validateInput();

    this.value = [
      {
        rawValue,
        maskedValue: this.inputValue,
        dialCode: this.selectedCountry.dialCode,
        country: this.selectedCountry,
      },
    ] as IPhoneInputDataList;
    this.tkChange.emit(this.value);
  };

  /**
   * Handle blur events on the phone number input.
   */
  private handleInputBlur = (): void => {
    this.validateInput();
  };

  /**
   * Validate the current input and set the validation message.
   */
  private validateInput(): void {
    if (this.isFocused || this.inputValue === '' || !this.selectedCountry) {
      this.isEmpty = true;
      this.validationMessage = this.emptyMessage || 'This field is required.';
      return;
    } else {
      this.isEmpty = false;
      this.validationMessage = '';
    }

    const currentMask = this.selectedCountry.mask;
    const digitsInInput = this.inputValue.replace(/\D/g, '').length;
    const digitsInMask = (currentMask.match(/9/g) || []).length;

    if (digitsInInput < digitsInMask) {
      this.validationMessage = this.errorMessage || 'Please complete your phone number.';
      this.isEmpty = true;
    }
  }

  /**
   * Get the filtered list of countries based on the search term.
   */
  private getFilteredCountries(): ICountry[] {
    const term = this.searchTerm.toLowerCase();
    if (!term) return this.countries;

    return this.countries.filter(country => country.label.toLowerCase().includes(term) || country.dialCode.includes(term));
  }

  private createLabel() {
    return (
      <label htmlFor="phone-input" class="tk-phone-input__label">
        <span class="tk-phone-input__label-title">{this.label}</span>
        <span class="tk-phone-input__label-red-dot">*</span>
      </label>
    );
  }

  /**
   * Create the country selector dropdown.
   */
  private createCountryOption() {
    return (
      <div class="tk-phone-input__dropdown">
        {this.createDropdownButton()}
        {this.isDropdownOpen && (
          <div class="tk-phone-input__dropdown-menu" role="listbox">
            {this.createDropdownSearch()}
            {this.createDropdownList()}
          </div>
        )}
      </div>
    );
  }

  /**
   * Create the dropdown button for selecting a country.
   */
  private createDropdownButton() {
    return (
      <button class="tk-phone-input__dropdown-button" onClick={this.toggleDropdown} type="button" disabled={this.disabled}>
        <div class="tk-phone-input__dropdown-button-selected">
          <tk-icon {...getIconElementProps('stat_minus_1', { variant: null }, undefined, 'span')} />
          <img
            src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
            alt={`${this.selectedCountry.label} flag`}
            class={`flag flag-${this.selectedCountry.id.toLowerCase()}`}
          />
          <span class="tk-phone-input__dropdown-button-dial-code">{this.selectedCountry.dialCode}</span>
        </div>
      </button>
    );
  }

  /**
   * Create the search input for filtering countries in the dropdown.
   */

  private createDropdownSearch() {
    return (
      <div class="tk-phone-input__dropdown-menu-search-wrapper">
        <input
          id="country-search"
          type="search"
          class="tk-phone-input__dropdown-menu-search-wrapper-search"
          placeholder="Search"
          value={this.searchTerm}
          onInput={this.handleSearchChange}
          onClick={(e: MouseEvent) => e.stopPropagation()}
          ref={el => (this.searchInput = el as HTMLInputElement)}
        />
        <tk-icon {...getIconElementProps('search', { variant: null }, undefined, 'span')} class="tk-phone-input__dropdown-menu-search-wrapper-icon" />
      </div>
    );
  }

  /**
   * Create the dropdown list of countries.
   */

  private createDropdownList() {
    return (
      <ul class="tk-phone-input__dropdown-menu-list">
        {this.getFilteredCountries().map(country => (
          <li onClick={() => this.handleCountrySelect(country)} key={country.id} role="option" aria-selected={country.id === this.selectedCountry.id}>
            <img src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" alt={`${country.label} flag`} class={`flag flag-${country.id.toLowerCase()}`} />
            <span class="tk-phone-input__dropdown-menu-list-country-label">{country.label}</span>
            <span class="tk-phone-input__dropdown-menu-list-dial-id">{country.dialCode}</span>
          </li>
        ))}
      </ul>
    );
  }

  /**
   * Create the phone number input field.
   */

  private createPhoneInput() {
    return (
      <input
        type="tel"
        id="phone-input"
        class="tk-phone-input__input"
        autoComplete="off"
        placeholder={this.placeholder || this.selectedCountry.mask.replace(/9/g, '9')}
        value={this.inputValue}
        onInput={this.handleInput}
        onBlur={this.handleInputBlur}
        disabled={this.disabled}
        ref={el => (this.textInput = el as HTMLInputElement)}
      />
    );
  }

  /**
   * Create a loading indicator while the component is initializing.
   */
  private createLoading() {
    return <div>Loading...</div>;
  }

  /**
   * Render the component.
   */

  render() {
    if (!this.selectedCountry) {
      return this.createLoading();
    }

    return (
      <div class={classNames('tk-phone-input')}>
        {this.createLabel()}
        <div
          class={classNames(
            'tk-phone-input__wrapper',
            this.disabled && 'tk-phone-input__wrapper--disabled',
            this.isEmpty && 'tk-phone-input__wrapper--error',
            this.readonly && 'tk-phone-input__wrapper--readonly',
          )}
        >
          {this.createCountryOption()}
          {this.createPhoneInput()}
        </div>
        <div class={classNames('tk-phone-input__message tk-phone-input__message--invalid', this.isEmpty && 'tk-phone-input__message--invalid')}>
          {this.validationMessage && <tk-icon {...getIconElementProps('info', { variant: null, iconType: 'sharp' }, undefined, 'span')} />}
          {this.validationMessage}
        </div>
      </div>
    );
  }
}
