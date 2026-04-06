import { Component, ComponentInterface, h, State, Prop, Element, Event, EventEmitter, Watch } from '@stencil/core';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import { INTERNAL_COUNTRIES } from './constants';
import { ICountry, IPhoneInputValue } from './types';
import { getIconElementProps } from '../../utils/icon-utils';
import { floatingElementAutoUpdate } from '../../utils/position-utils';
import { applyStyles } from '../../utils/style-utils';
import { renderHint } from '../../utils/hint-utils';

/**
 * The TkPhoneInput component allows users to input phone numbers with country selection and validation.
 * @react `import { TkPhoneInput } from '@takeoff-ui/react'`
 * @vue `import { TkPhoneInput } from '@takeoff-ui/vue'`
 * @angular `import { TkPhoneInput } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-phone-input',
  styleUrls: ['tk-phone-input.scss'],
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
  private uniqueId = uuidv4();

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
  @Prop({ mutable: true }) value?: IPhoneInputValue | any;
  @Watch('value')
  protected valueChanged(newValue): void {
    if (!newValue || (typeof newValue === 'object' && Object.keys(newValue).length === 0)) {
      this.handleFormReset();
    }
    if (!newValue.rawValue && !newValue.maskedValue) {
      this.inputValue = '';
    }
    if (newValue) {
      if (newValue?.country?.id) {
        this.setSelectedCountry(newValue?.country?.id);
      }
      this.inputValue = this.applyMask(newValue.rawValue, this.selectedCountry.mask);
    }
  }

  /**
   * The label for the phone input.
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
  @Watch('disabled')
  protected disabledChanged(newValue: boolean) {
    if (newValue) this.isDropdownOpen = false;
  }

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
   * Hides the phone flag icon in the dropdown button and list.
   * @default false
   */
  @Prop() hideFlag: boolean = false;

  /**
   * Determines the width of the dropdown. Accepts values like 'match-parent', 'auto', or a specific width in '300px'.
   * @defaultValue match-parent
   */
  @Prop() dropdownWidthMode: 'match-parent' | 'auto' | string = 'match-parent';

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
    // Clean up floating UI listeners on component unmount
    this.cleanup?.();
    // Clear reference to allow garbage collection
    this.cleanup = null;
    document.removeEventListener('click', this.handleClickOutside);
  }

  /**
   * Initialize the component before it is rendered.
   */
  componentWillLoad(): void {
    this.initializeCountries();
    if (this?.value && Object.keys(this?.value)?.length) {
      if (this.value?.country?.id) {
        this.setSelectedCountry(this.value.country.id);
      }
      this.inputValue = this.applyMask(this?.value?.rawValue, this?.selectedCountry.mask);
    } else {
      this.setSelectedCountry(this.defaultCountry);
    }
  }

  /**
   * Update the component when properties change.
   */
  componentDidUpdate() {
    if (this.isDropdownOpen) {
      // Clean up old floating UI listeners before setting up new ones
      this.cleanup?.();
      this.updatePosition();
    } else {
      // Remove floating UI listeners when dropdown closes
      this.cleanup?.();
      // Clear reference to allow garbage collection
      this.cleanup = null;
      this.panelRef?.remove();
    }
  }

  formResetCallback() {
    this.handleFormReset();
  }

  private updatePosition() {
    const dropdownWidthMode = this.dropdownWidthMode;
    const tkInputRootEl = this.el.querySelector('.tk-phone-input-wrapper') as HTMLElement;
    this.cleanup = floatingElementAutoUpdate(tkInputRootEl, this.panelRef, undefined, {
      placement: 'bottom-start',
      size: {
        apply({ rects, elements }) {
          if (dropdownWidthMode === 'match-parent') {
            applyStyles(elements.floating, {
              width: `${rects.reference.width}px`,
            });
          } else if (dropdownWidthMode !== 'auto' && dropdownWidthMode.length > 0) {
            applyStyles(elements.floating, {
              width: dropdownWidthMode,
            });
          }
        },
      },
    });
  }

  /**
   * Initialize the list of countries from the provided prop or fallback to internal list.
   */
  private initializeCountries(): void {
    if (this.countryList) {
      this.countries = this.countryList;
    } else {
      this.countries = INTERNAL_COUNTRIES;
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
  private applyMask(rawValue: string, mask: string | undefined) {
    if (!mask?.length || !rawValue?.length) return rawValue;
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

    return this.countries.filter(country => country.label.toLowerCase().includes(term) || country.dialCode?.includes(term));
  }

  /**
   * Get the flag class based on the country object.
   */
  private getFlagClass(country: ICountry): string {
    return classNames('flag', country?.dialCode ? `flag-${country?.id.toLowerCase()}` : 'flag-none');
  }

  /**
   * Handle country selection from the dropdown.
   */
  private handleCountrySelect = (country: ICountry): void => {
    this.setSelectedCountry(country.id);
    this.value = {
      rawValue: '',
      maskedValue: '',
      country: {
        id: this.selectedCountry.id,
        label: this.selectedCountry.label,
        dialCode: this.selectedCountry.dialCode,
        mask: this.selectedCountry.mask,
        placeholder: this.selectedCountry.placeholder,
      },
    } as IPhoneInputValue;
    this.tkChange.emit(this.value);
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
  private handleInput = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    const rawValue = inputElement.value.replace(/\D/g, '');

    if (!this.selectedCountry.mask?.length) {
      this.inputValue = rawValue;
      this.inputRef.value = this.inputValue;

      // reassign the value object and emit the change event before returning. Masked Value consists of raw value
      this.value = {
        rawValue,
        maskedValue: rawValue,
        country: {
          id: this.selectedCountry.id,
          label: this.selectedCountry.label,
          dialCode: this.selectedCountry.dialCode,
          placeholder: this.selectedCountry.placeholder,
        },
      };
      this.tkChange.emit(this.value);
      return;
    }

    const currentMask = this.selectedCountry.mask;
    const maxDigits = (currentMask.match(/9/g) || []).length;
    const hasInvalidCharacters = /[^\d() -]/.test(inputElement.value);

    if (rawValue.length > maxDigits || hasInvalidCharacters) return (this.inputRef.value = this.inputValue);

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
        mask: currentMask,
        placeholder: this.selectedCountry.placeholder,
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

  private handleFormReset = () => {
    this.value = {
      rawValue: '',
      maskedValue: '',
      country: {
        id: this.selectedCountry.id,
        label: this.selectedCountry.label,
        dialCode: this.selectedCountry.dialCode,
        mask: this.selectedCountry.mask,
        placeholder: this.selectedCountry.placeholder,
      },
    } as IPhoneInputValue;
    this.tkChange.emit(this.value);
    this.isDropdownOpen = false;
    this.inputValue = '';
    this.inputRef.value = '';
    this.searchTerm = '';
    this.inputRef?.focus();
  };

  private renderLabel() {
    let label;
    if (this.label?.length > 0) {
      const asterisk = <span class="tk-phone-input-asterisk">*</span>;
      label = (
        <label htmlFor={this.uniqueId} class="tk-phone-input-label">
          {this.label}
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
      <div class="tk-phone-input-dropdown">
        {this.createDropdownButton()}
        {this.isDropdownOpen && (
          <div class="tk-phone-input-dropdown-menu" role="listbox" ref={el => (this.panelRef = el as HTMLDivElement)}>
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
    const selectedClass = classNames('tk-phone-input-dropdown-button-selected', {
      'tk-phone-input-no-dial-code': !this.selectedCountry.dialCode,
    });

    return (
      <button class="tk-phone-input-dropdown-button" onClick={this.toggleDropdown} type="button">
        <div class={selectedClass}>
          <tk-icon {...getIconElementProps('stat_minus_1', { variant: null, size: 'large' }, 'rounded', 'span')} />
          {!this.hideFlag && this.renderFlag(this.selectedCountry)}
          {this.selectedCountry.dialCode && <span class="tk-phone-input-dial-code">{this.selectedCountry.dialCode}</span>}
        </div>
      </button>
    );
  }

  /**
   * Create the search input for filtering countries in the dropdown.
   */
  private createDropdownSearch() {
    return (
      <tk-input
        class="tk-phone-input-dropdown-menu-search"
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
  private createDropdownList() {
    return (
      <ul class="tk-phone-input-menu">
        {this.getFilteredCountries().map(country => (
          <li
            class="tk-phone-input-menu-item"
            onClick={() => this.handleCountrySelect(country)}
            key={country.id}
            role="option"
            aria-selected={country.id === this.selectedCountry.id}
          >
            {!this.hideFlag && this.renderFlag(country)}
            {country.label && <span class="tk-phone-input-menu-country-label">{country.label}</span>}
            {country.dialCode && <span class="tk-phone-input-menu-dial-id">{country.dialCode}</span>}
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
        id={this.uniqueId}
        type="tel"
        class="tk-phone-input-input"
        autoComplete="off"
        placeholder={this.selectedCountry?.placeholder || this.placeholder || this.selectedCountry.mask?.replace(/9/g, '9')}
        value={this.inputValue}
        onInput={this.handleInput}
        onBlur={this.handleInputBlur}
        onFocus={this.handleInputFocus}
        disabled={this.disabled}
        ref={el => (this.inputRef = el as HTMLInputElement)}
      />
    );
  }

  /**
   * Render the flag element for a country. Shows a close icon for countries without a dial code.
   */
  private renderFlag(country: ICountry) {
    const flagClass = this.getFlagClass(country);
    return country.dialCode ? (
      <div class={flagClass} aria-label={`${country.label} flag`} />
    ) : (
      <div class={flagClass}>
        <tk-icon {...getIconElementProps('close', { color: 'var(--static-white)' })} />
      </div>
    );
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <div
        class={classNames('tk-phone-input-container', `tk-phone-input-container-${this.size}`)}
        aria-invalid={this.invalid}
        aria-disabled={this.disabled}
        aria-readonly={this.readonly}
      >
        {this.renderLabel()}
        <div class="tk-phone-input-wrapper">
          {this.renderCountrySelector()}
          {this.renderPhoneInput()}
        </div>

        {renderHint(this.hint, this.error, this.invalid)}
      </div>
    );
  }
}
