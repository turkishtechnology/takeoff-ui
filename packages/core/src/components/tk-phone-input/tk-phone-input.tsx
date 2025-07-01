import { Component, ComponentInterface, h, State, Prop, Element, Event, EventEmitter } from '@stencil/core';
import classNames from 'classnames';
import { computePosition, flip, shift, offset, autoUpdate } from '@floating-ui/dom';

import { INTERNAL_COUNTRIES } from './constants';
import { ICountry, IPhoneInputValue } from './interfaces';
import { getIconElementProps } from '../../utils/icon-props';

/**
 * The TkPhoneInput component allows users to input phone numbers with country selection and validation.
 * @react `import { TkPhoneInput } from '@takeoff-ui/react'`
 * @vue `import { TkPhoneInput } from '@takeoff-ui/vue'`
 * @angular `import { TkPhoneInput } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-phone-input',
  styleUrls: ['tk-phone-input.scss', 'flag.scss'],
  formAssociated: true,
})
export class TkPhoneInput implements ComponentInterface {
  @Element() private el!: HTMLTkPhoneInputElement;

  /**
   * Reference to the phone number input element.
   */
  private inputRef!: HTMLInputElement;

  /**
   * Reference to the country search input element.
   */
  private searchInput!: HTMLTkInputElement;
  private cleanup;
  private panelRef?: HTMLDivElement;

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
  @Prop({ mutable: true }) value?: IPhoneInputValue;

  /**
   * The label for the phone input.
   * Defaults to 'Phone Number'.
   */
  @Prop() label: string;

  /**
   * The list of countries to display in the dropdown.
   * Can be provided as an array of Country objects or as a JSON string.
   */
  @Prop() countryList?: ICountry[];

  /**
   * Whether the input is disabled.
   * * @defaultValue false
   */
  @Prop() disabled: boolean = false;

  /**
   * If `true`, the user cannot modify the value.
   * @defaultValue false
   */
  @Prop() readonly: boolean = false;

  /**
   * Indicates whether the input is in an invalid state
   * @defaultValue false
   */
  @Prop() invalid: boolean = false;

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
   * This is the error message that will be displayed.
   */
  @Prop() error: string;

  /**
   * Sets size for the component.
   */
  @Prop() size: 'large' | 'base' | 'small' = 'base';

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
   * Update the component when properties change.
   */
  componentDidUpdate() {
    if (this.isDropdownOpen) {
      this.cleanup = autoUpdate(this.el.querySelector('.tk-phone-input__wrapper'), this.el, () => this.updatePosition(), {
        animationFrame: true,
      });
    } else {
      this.panelRef?.remove();
      this.cleanup && this.cleanup();
    }
  }

  /**
   * Initialize the list of countries from the provided prop or fallback to internal list.
   */
  private initializeCountries(): void {
    if (this.countryList) {
      this.countries = this.countryList;
    } else {
      this.countries = INTERNAL_COUNTRIES as ICountry[];
    }
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

  private updatePosition() {
    const tkInputRootEl = this.el.querySelector('.tk-phone-input__wrapper');

    if (tkInputRootEl && this.panelRef) {
      computePosition(tkInputRootEl, this.panelRef, {
        strategy: 'fixed',
        placement: 'bottom-start',
        middleware: [offset(4), flip(), shift({ padding: 5 })],
      }).then(({ y }) => {
        Object.assign(this.panelRef.style, {
          top: `${y}px`,
        });
      });
    }
  }

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
   * Handle country selection from the dropdown.
   */
  private handleCountrySelect = (country: ICountry): void => {
    this.setSelectedCountry(country.id);
    this.inputValue = '';
    this.isDropdownOpen = false;
    this.searchTerm = '';
    this.inputRef?.focus();
  };

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
      this.inputRef.value = this.inputValue;
      return;
    }

    this.hasFocus = false;
    this.inputValue = this.applyMask(rawValue, currentMask);
    this.inputRef.value = this.inputValue;

    this.value = {
      rawValue,
      maskedValue: this.inputValue,
      country: {
        id: this.selectedCountry.id,
        label: this.selectedCountry.label,
        dialCode: this.selectedCountry.dialCode,
      },
    } as IPhoneInputValue;
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
          <div class="tk-phone-input__dropdown-menu" role="listbox" ref={el => (this.panelRef = el as HTMLDivElement)}>
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
      <button class="tk-phone-input__dropdown-button" onClick={this.toggleDropdown} type="button">
        <div class="tk-phone-input__dropdown-button-selected">
          <tk-icon {...getIconElementProps('stat_minus_1', { variant: null, size: 'large' }, undefined, 'span')} />
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
      <tk-input
        class="tk-phone-input__dropdown-menu-search"
        size={this.size}
        placeholder="Search"
        value={this.searchTerm}
        onTk-change={this.handleSearchChange}
        ref={el => (this.searchInput = el as HTMLTkInputElement)}
        icon="search"
        iconPosition="right"
        onClick={(e: MouseEvent) => e.stopPropagation()}
      />
    );
  }

  /**
   * Create the dropdown list of countries.
   */
  private renderDropdownList() {
    return (
      <ul class="tk-phone-input__dropdown-menu-list">
        {this.getFilteredCountries().map(country => (
          <li
            class="tk-phone-input__dropdown-menu-list-item"
            onClick={() => this.handleCountrySelect(country)}
            key={country.id}
            role="option"
            aria-selected={country.id === this.selectedCountry.id}
          >
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
        ref={el => (this.inputRef = el as HTMLInputElement)}
      />
    );
  }

  private renderHint(): HTMLSpanElement {
    let hint;

    if (this.hint?.length > 0) {
      const hintIcon = <tk-icon {...getIconElementProps('info', { class: 'tk-phone-input__hint-icon', variant: null })} />;

      hint = (
        <span class="tk-phone-input__hint">
          {hintIcon}
          <span class="tk-phone-input__hint-text">{this.hint}</span>
        </span>
      );
    }

    if (this.error?.length > 0) {
      const hintIcon = <tk-icon {...getIconElementProps('info', { class: 'tk-phone-input__hint-icon', variant: null })} />;

      hint = (
        <span class="tk-phone-input__hint">
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
      <div class={classNames('tk-phone-input', `tk-phone-input--${this.size}`)} aria-invalid={this.invalid} aria-disabled={this.disabled} aria-readonly={this.readonly}>
        {this.renderLabel()}
        <div class="tk-phone-input__wrapper">
          {this.renderCountrySelector()}
          {this.renderPhoneInput()}
        </div>

        {this.renderHint()}
      </div>
    );
  }
}
