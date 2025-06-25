import { Component, h, State, Prop, Element, Event, EventEmitter } from '@stencil/core';
import classNames from 'classnames';

import { INTERNAL_COUNTRIES } from './constants';
import { ICountry, IPhoneInputData, IPhoneInputDataList, IPhoneInputProps } from './interfaces';
import { getIconElementProps } from '../../utils/icon-props';

/**
 * The TkPhoneInput component allows users to input phone numbers with country selection and validation.
 * @react `import { TkPhoneInput } from '@takeoff-ui/react'`
 * @vue `import { TkPhoneInput } from '@takeoff-ui/vue'`
 * @angular `import { TkPhoneInput } from '@takeoff-ui/angular'`
 */

// For backward compatibility
export type Country = ICountry;
export type PhoneInputData = IPhoneInputData;

@Component({
  tag: 'tk-phone-input',
  styleUrls: ['tk-phone-input.scss', 'flag.scss'],
  formAssociated: true,
})
export class TkPhoneInput implements IPhoneInputProps {
  @Element() private el!: HTMLTkPhoneInputElement;

  /**
   * Reference to the phone number input element.
   */
  private textInput!: HTMLInputElement;

  /**
   * Reference to the country search input element.
   */
  private searchInput!: HTMLInputElement;

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
   * Whether the input has been touched.
   */
  @State() hasFocus = false;

  /**
   * Whether the country dropdown is open.
   */
  @State() private isDropdownOpen: boolean = false;

  /**
   * The current search term for filtering countries.
   */
  @State() private searchTerm: string = '';

  /**
   * The value of the phone input.
   * This is a list of phone input data objects.
   * It can be mutable to allow two-way binding.
   */
  @Prop({ mutable: true }) value?: IPhoneInputDataList;

  /**
   * The label for the phone input.
   * Defaults to 'Phone Number'.
   */
  @Prop() label: string;

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
  @Prop() defaultCountry: string = 'TR';

  /**
   * Placeholder text for the phone input.
   */
  @Prop() placeholder?: string;

  /**
   * Displays a red asterisk (*) next to the label for visual emphasis.
   */
  @Prop() showAsterisk: boolean = false;

  /**
   * Provided a hint or additional information about the input.
   */
  @Prop() hint: string;

  /**
   * Indicates whether the input is in an invalid state
   * @defaultValue false
   */
  @Prop() invalid: boolean = false;

  /**
   * This is the error message that will be displayed.
   */
  @Prop() error: string;

  /**
   * Emitted when the value has changed.
   */
  @Event({ eventName: 'tk-change', composed: false }) tkChange!: EventEmitter<any>;

  /**
   * Emitted when the input loses focus.
   */
  @Event({ eventName: 'tk-blur' }) tkBlur: EventEmitter<void>;

  /**
   * Emitted when the input has focus.
   */
  @Event({ eventName: 'tk-focus' }) tkFocus: EventEmitter<void>;

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
    this.setSelectedCountry(this.defaultCountry);
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
   * Get the filtered list of countries based on the search term.
   */
  private getFilteredCountries(): ICountry[] {
    const term = this.searchTerm.toLowerCase();
    if (!term) return this.countries;

    return this.countries.filter(country => country.label.toLowerCase().includes(term) || country.dialCode.includes(term));
  }

  /**
   * Event handler for clicks outside the component to close dropdown.
   */
  private handleClickOutside = (event: MouseEvent): void => {
    if (!this.el.contains(event.target as Node)) {
      this.isDropdownOpen = false;
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

    this.hasFocus = false;
    this.inputValue = this.applyMask(rawValue, currentMask);
    this.textInput.value = this.inputValue;

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

  private handleInputBlur = () => {
    this.hasFocus = false;
    this.tkBlur.emit();
  };

  private handleInputFocus = () => {
    this.hasFocus = true;
    this.tkFocus.emit();
  };

  private renderLabel() {
    let label;
    if (this.label?.length > 0) {
      const asterisk = <span class="tk-phone-input__label-red-asterisk">*</span>;
      label = (
        <label htmlFor="phone-input" class="tk-phone-input__label">
          <span class="tk-phone-input__label-title">{this.label}</span>
          {this.showAsterisk ? asterisk : ''}
        </label>
      );
    }

    return label;
  }

  /**
   * Create the country selector dropdown.
   */
  private renderCountrySelector() {
    return (
      <div class="tk-phone-input__dropdown">
        {this.renderDropdownButton()}
        {this.isDropdownOpen && (
          <div class="tk-phone-input__dropdown-menu" role="listbox">
            {this.renderDropdownSearch()}
            {this.renderDropdownList()}
          </div>
        )}
      </div>
    );
  }

  /**
   * Create the dropdown button for selecting a country.
   */
  private renderDropdownButton() {
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
  private renderDropdownSearch() {
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
  private renderDropdownList() {
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
  private renderPhoneInput() {
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
        onFocus={this.handleInputFocus}
        disabled={this.disabled}
        ref={el => (this.textInput = el as HTMLInputElement)}
      />
    );
  }

  private renderHint(): HTMLSpanElement {
    let hint;

    if (this.hint?.length > 0) {
      const hintIcon = <tk-icon {...getIconElementProps('info')} />;

      hint = (
        <span class="tk-phone-input__hint">
          {hintIcon}
          <span class="tk-phone-input__hint-text">{this.hint}</span>
        </span>
      );
    }

    if (this.error?.length > 0) {
      const hintIcon = <tk-icon {...getIconElementProps('info')} />;

      hint = (
        <span class="tk-phone-input__hint tk-phone-input__hint--error">
          {hintIcon}
          <span class="tk-phone-input__hint-text">{this.error}</span>
        </span>
      );
    }

    return hint;
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <div class={classNames('tk-phone-input')}>
        {this.renderLabel()}
        <div
          class={classNames(
            'tk-phone-input__wrapper',
            this.disabled && 'tk-phone-input__wrapper--disabled',
            this.hasFocus && 'tk-phone-input__wrapper--focus',
            this.readonly && 'tk-phone-input__wrapper--readonly',
          )}
        >
          {this.renderCountrySelector()}
          {this.renderPhoneInput()}
        </div>

        {this.renderHint()}
      </div>
    );
  }
}
