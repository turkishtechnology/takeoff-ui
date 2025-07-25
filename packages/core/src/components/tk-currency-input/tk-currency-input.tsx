import { Component, ComponentInterface, Prop, State, Element, Event, EventEmitter, Watch, h } from '@stencil/core';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { computePosition, flip, shift, offset, autoUpdate } from '@floating-ui/dom';

import { getIconElementProps } from '../../utils/icon-props';
import { ICurrency, CurrencyInputChangeEvent } from './interfaces';
import { INTERNAL_CURRENCY_LIST } from './constants';

/**
 * The TkCurrencyInput component allows users to input phone numbers with country selection and validation.
 * @react `import { TkCurrencyInput } from '@takeoff-ui/react'`
 * @vue `import { TkCurrencyInput } from '@takeoff-ui/vue'`
 * @angular `import { TkCurrencyInput } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-currency-input',
  styleUrls: ['tk-currency-input.scss', 'flag.scss'],
  formAssociated: true,
})
export class TkCurrencyInput implements ComponentInterface {
  @Element() private el!: HTMLTkCurrencyInputElement;

  /**
   * Reference to the currency input element.
   */
  private inputElement?: HTMLInputElement;
  /**
   * Reference to the dropdown element.
   */
  private dropdownEl?: HTMLElement;
  private cleanup;
  private uniqueId = uuidv4();

  /**
   * The currently selected currency object.
   * This is initialized based on the defaultCurrency prop and can be changed by the user.
   */
  @State() selectedCurrency: ICurrency;
  /**
   * The value displayed in the input field, formatted as a currency string.
   * This is updated based on the current numeric value and selected currency.
   */
  @State() displayValue: string = '';
  /**
   * Indicates whether the dropdown for currency selection is open.
   */
  @State() isDropdownOpen: boolean = false;
  /**
   * Current numeric value of the input, used for calculations and formatting.
   * This is updated based on user input and can be used in form submissions.
   */
  @State() currentNumericValue: number = 0;

  /**
   * The value of the input.
   */
  @Prop() value: number = 0;
  @Watch('value')
  valueChanged() {
    if (this.value !== this.currentNumericValue) {
      this.currentNumericValue = this.value || 0;
      this.updateDisplayValue();
    }
  }

  /**
   * List of available currencies.
   * If not provided, it defaults to the internal currency list.
   */
  @Prop() currencyList?: ICurrency[];

  /**
   * Placeholder text for the input field.
   */
  @Prop() placeholder?: string;

  /**
   * Disables the input field if set to true.
   */
  @Prop() disabled: boolean = false;

  /**
   * Marks the input field as invalid if set to true.
   */
  @Prop() invalid: boolean = false;

  /**
   * Makes the input field read-only if set to true.
   */
  @Prop() readonly: boolean = false;

  /**
   * Sets size for the component.
   */
  @Prop() size: 'large' | 'base' | 'small' = 'base';

  /**
   * Displays a red asterisk (*) next to the label for visual emphasis.
   */
  @Prop() showAsterisk: boolean = false;

  /**
   * The number of decimal places to display in the formatted currency value.
   * Default is 2, which is common for most currencies.
   */
  @Prop() precision: number = 2;

  /**
   * The default currency to use when the component is initialized.
   * Default is 'TRY'.
   */
  @Prop() defaultCurrency: string = 'TRY';

  /**
   * Allows negative values to be entered if set to true.
   */
  @Prop() allowNegative: boolean = false;

  /**
   * Custom decimal separator to use for formatting.
   * If provided, this will override the currency's default decimal separator.
   * Example: "." for USD style, "," for EUR style
   */
  @Prop() decimalSeparator?: string;

  /**
   * Custom thousands separator to use for formatting.
   * If provided, this will override the currency's default thousands separator.
   * Example: "," for USD style, "." for EUR style, " " for some European styles
   */
  @Prop() thousandsSeparator?: string;

  @Watch('defaultCurrency')
  defaultCurrencyChanged() {
    const currencies = this.getCurrencies();
    const currency = currencies.find(c => c.code.toUpperCase() === this.defaultCurrency.toUpperCase());

    if (currency) {
      this.selectedCurrency = currency;
      this.updateDisplayValue();

      if (this.inputElement) {
        this.inputElement.value = this.displayValue;
      }

      const eventData = {
        value: this.currentNumericValue,
        currency: this.selectedCurrency,
        formattedValue: this.displayValue,
      } as CurrencyInputChangeEvent;

      this.tkChange.emit(eventData);
    }
  }

  /**
   * The label for the input field.
   * If provided, it will be displayed above the input.
   */
  @Prop() label: string;

  /**
   * The name attribute for the input element.
   * Useful for form submissions.
   */
  @Prop() name: string;

  /**
   * Provided a hint or additional information about the input.
   */
  @Prop() hint: string;

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
  @Event() tkBlur: EventEmitter<void>;

  /**
   * Emitted when the input has focus.
   */
  @Event() tkFocus: EventEmitter<void>;

  /**
   * Initialize the component before it is rendered.
   */
  componentWillLoad() {
    this.setSelectedCurrency(this.defaultCurrency);
  }

  /**
   * Update the component when properties change.
   */
  componentDidUpdate() {
    if (this.isDropdownOpen) {
      this.cleanup = autoUpdate(this.el.querySelector('.tk-currency-input__wrapper'), this.el, () => this.updatePosition(), {
        animationFrame: true,
      });
    } else {
      this.dropdownEl?.remove();
      this.cleanup && this.cleanup();
    }
  }

  connectedCallback() {
    document.addEventListener('click', this.closeDropdown);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.closeDropdown);
  }

  /**
   * Get the currencies list - either from prop or use internal default
   */
  private getCurrencies(): ICurrency[] {
    return this.currencyList || INTERNAL_CURRENCY_LIST;
  }

  private setSelectedCurrency(currencyCode: string) {
    const currencies = this.getCurrencies();
    const currency = currencies.find(c => c.code.toUpperCase() === currencyCode.toUpperCase());
    this.selectedCurrency = currency || currencies[0];
    this.currentNumericValue = this.value || 0;
    this.updateDisplayValue();
  }

  private updatePosition() {
    const tkCurrenInputRootEl = this.el.querySelector('.tk-currency-input__wrapper');

    if (tkCurrenInputRootEl && this.dropdownEl) {
      computePosition(tkCurrenInputRootEl, this.dropdownEl, {
        strategy: 'fixed',
        placement: 'bottom-start',
        middleware: [offset(4), flip(), shift({ padding: 5 })],
      }).then(({ y }) => {
        Object.assign(this.dropdownEl.style, {
          top: `${y}px`,
        });
      });
    }
  }

  private updateDisplayValue() {
    if (this.currentNumericValue === null || this.currentNumericValue === undefined || isNaN(this.currentNumericValue)) {
      this.displayValue = '';
      return;
    }

    const formattedValue = this.formatCurrency(this.currentNumericValue);
    this.displayValue = formattedValue;
  }

  /**
   * Get the decimal separator to use - custom prop takes priority over currency default
   */
  private getDecimalSeparator(): string {
    return this.decimalSeparator ?? this.selectedCurrency?.decimalSeparator ?? '.';
  }

  /**
   * Get the thousands separator to use - custom prop takes priority over currency default
   */
  private getThousandsSeparator(): string {
    return this.thousandsSeparator ?? this.selectedCurrency?.thousandsSeparator ?? ',';
  }

  private formatCurrency(amount: number): string {
    if (isNaN(amount)) return '';

    // Use custom separators if provided, otherwise fall back to currency defaults
    const decimalSeparator = this.getDecimalSeparator();
    const thousandsSeparator = this.getThousandsSeparator();

    const isNegative = amount < 0;
    const absoluteAmount = Math.abs(amount);

    // Format the number with the specified precision
    const fixedAmount = Number(absoluteAmount).toFixed(this.precision);
    const [integerPart, decimalPart] = fixedAmount.split('.');

    // Add thousands separators
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

    // Combine with decimal part if precision > 0
    let result = formattedInteger;
    if (this.precision > 0 && decimalPart) {
      result += decimalSeparator + decimalPart;
    }

    // Add negative sign if needed and allowed
    if (isNegative && this.allowNegative) {
      result = '-' + result;
    }

    return result;
  }

  private parseFormattedValue(formattedValue: string): number {
    if (!formattedValue) return 0;

    // Use custom separators if provided, otherwise fall back to currency defaults
    const decimalSeparator = this.getDecimalSeparator();
    const thousandsSeparator = this.getThousandsSeparator();

    const isNegative = formattedValue.startsWith('-') && this.allowNegative;

    // Remove negative sign temporarily for processing
    let cleanValue = formattedValue.replace('-', '');

    // Remove thousands separators and replace decimal separator with dot
    cleanValue = cleanValue.replace(new RegExp('\\' + thousandsSeparator, 'g'), '').replace(decimalSeparator, '.');

    // Remove non-numeric characters except decimal point
    cleanValue = cleanValue.replace(/[^0-9.]/g, '');

    const numericValue = parseFloat(cleanValue);
    const result = isNaN(numericValue) ? 0 : numericValue;

    return isNegative ? -result : result;
  }

  private closeDropdown = (event: Event) => {
    if (!this.isDropdownOpen) {
      return;
    }

    const target = event.target as Node;

    if (this.dropdownEl && this.dropdownEl.contains(target)) {
      return;
    }

    const hostElement = this.inputElement?.closest('tk-currency-input');
    if (hostElement && hostElement.contains(target)) {
      return;
    }

    this.isDropdownOpen = false;
  };

  private toggleDropdown = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();

    if (!this.disabled && !this.readonly) {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  };

  private calculateNewCursorPosition(oldValue: string, newValue: string, oldCursorPosition: number, removedCharsBeforeCursor: number): number {
    // Use custom thousands separator if provided, otherwise fall back to currency default
    const thousandsSeparator = this.getThousandsSeparator();

    let adjustedPosition = oldCursorPosition - removedCharsBeforeCursor;

    let oldSeparatorsBeforeCursor = 0;
    for (let i = 0; i < Math.min(adjustedPosition, oldValue.length); i++) {
      if (oldValue[i] === thousandsSeparator) {
        oldSeparatorsBeforeCursor++;
      }
    }

    let newSeparatorsBeforeCursor = 0;
    let digitCount = 0;
    let targetDigitPosition = adjustedPosition - oldSeparatorsBeforeCursor;

    for (let i = 0; i < newValue.length; i++) {
      if (newValue[i] === thousandsSeparator) {
        newSeparatorsBeforeCursor++;
      } else if (newValue[i] >= '0' && newValue[i] <= '9') {
        digitCount++;
        if (digitCount >= targetDigitPosition) {
          return i + 1;
        }
      } else if (newValue[i] === this.getDecimalSeparator()) {
        if (digitCount >= targetDigitPosition) {
          return i + 1;
        }
      }
    }

    return Math.min(adjustedPosition + (newSeparatorsBeforeCursor - oldSeparatorsBeforeCursor), newValue.length);
  }

  private handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value;
    const cursorPosition = target.selectionStart;

    // Use custom separators if provided, otherwise fall back to currency defaults
    const decimalSeparator = this.getDecimalSeparator();
    const thousandsSeparator = this.getThousandsSeparator();

    // Allow negative sign if allowNegative is true
    const negativePattern = this.allowNegative ? '\\-' : '';
    const allowedChars = new RegExp(`[0-9\\${decimalSeparator}\\${thousandsSeparator}${negativePattern}]`);

    let filteredValue = '';
    let removedCharsBeforeCursor = 0;
    let hasNegativeSign = false;

    for (let i = 0; i < inputValue.length; i++) {
      const char = inputValue[i];

      // Handle negative sign - only allow it at the beginning
      if (char === '-' && this.allowNegative && i === 0 && !hasNegativeSign) {
        filteredValue += char;
        hasNegativeSign = true;
      } else if (char === '-' && this.allowNegative && hasNegativeSign) {
        // Remove duplicate negative signs
        if (i < cursorPosition) {
          removedCharsBeforeCursor++;
        }
      } else if (allowedChars.test(char) && char !== '-') {
        filteredValue += char;
      } else if (i < cursorPosition) {
        removedCharsBeforeCursor++;
      }
    }

    const numericValue = this.parseFormattedValue(filteredValue);

    this.currentNumericValue = numericValue;

    const formattedValue = this.formatCurrency(numericValue);

    this.displayValue = formattedValue;

    target.value = formattedValue;

    const newCursorPosition = this.calculateNewCursorPosition(inputValue, formattedValue, cursorPosition, removedCharsBeforeCursor);

    requestAnimationFrame(() => {
      target.setSelectionRange(newCursorPosition, newCursorPosition);
    });

    const eventData = {
      value: numericValue,
      currency: this.selectedCurrency,
      formattedValue: formattedValue,
    } as CurrencyInputChangeEvent;

    this.tkChange.emit(eventData);
  };

  private handleFocus = () => {
    this.tkFocus.emit();
  };

  private handleBlur = () => {
    const target = this.inputElement;
    const numericValue = this.parseFormattedValue(target.value);
    this.currentNumericValue = numericValue;

    const formattedValue = this.formatCurrency(numericValue);
    target.value = formattedValue;
    this.displayValue = formattedValue;

    this.tkBlur.emit();
  };

  private handleSelectCurrency = (currencyCode: string, event: Event) => {
    event.stopPropagation();
    event.preventDefault();

    const currencies = this.getCurrencies();
    const currency = currencies.find(c => c.code.toUpperCase() === currencyCode.toUpperCase());

    if (currency) {
      this.selectedCurrency = currency;

      this.updateDisplayValue();
      this.isDropdownOpen = false;

      if (this.inputElement) {
        this.inputElement.value = this.displayValue;
      }

      const eventData = {
        value: this.currentNumericValue,
        currency: this.selectedCurrency,
        formattedValue: this.displayValue,
      } as CurrencyInputChangeEvent;

      this.tkChange.emit(eventData);
    }
  };

  private handlePropsDecimalAndThousandsSeparator() {
    if (this.decimalSeparator && this.thousandsSeparator) {
      return false; // If both separators are provided, we assume custom formatting is required
    } else {
      return true;
    }
  }

  private renderLabel() {
    if (this.label) {
      return (
        <label class="tk-currency-input__label" htmlFor={this.uniqueId}>
          <span class="tk-currency-input__label-title">{this.label}</span>
          {this.showAsterisk && <span class="tk-currency-input__label-red-asterisk">*</span>}
        </label>
      );
    }
    return null;
  }

  private renderCurrencyInput() {
    return (
      <input
        id={this.uniqueId}
        ref={el => (this.inputElement = el)}
        type="text"
        class="tk-currency-input__input"
        autoComplete="off"
        value={this.displayValue}
        placeholder={this.placeholder}
        disabled={this.disabled}
        readonly={this.readonly}
        name={this.name}
        onInput={this.handleInput}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      />
    );
  }

  private renderCurrencySelector() {
    return (
      <div class="tk-currency-input__dropdown">
        {this.renderDropdownButton()}

        {this.isDropdownOpen && (
          <div class="tk-currency-input__dropdown-menu" role="listbox" ref={el => (this.dropdownEl = el as HTMLDivElement)}>
            {this.renderCurrencyList()}
          </div>
        )}
      </div>
    );
  }

  private renderDropdownButton() {
    return (
      <button type="button" class="tk-currency-input__dropdown-button" onClick={event => this.toggleDropdown(event)} disabled={this.disabled}>
        <div class="tk-currency-input__dropdown-button-selected">
          <img
            src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
            alt={`${this.selectedCurrency.name} flag`}
            class={`flag flag-${this.selectedCurrency.id.toLowerCase()}`}
          />
          <span class="tk-currency-input__dropdown-button-currency-code">{this.selectedCurrency?.code}</span>
          <tk-icon {...getIconElementProps('stat_minus_1', { variant: null, size: 'large' }, undefined, 'span')} />
        </div>
      </button>
    );
  }

  private renderCurrencyList() {
    const currencies = this.getCurrencies();

    return (
      <ul class="tk-currency-input__dropdown-menu-list">
        {currencies.map(currency => (
          <li
            class="tk-currency-input__dropdown-menu-list-item"
            key={currency.code}
            role="option"
            onClick={event => this.handleSelectCurrency(currency.code, event)}
            aria-selected={this.selectedCurrency.code === currency.code}
          >
            <img src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" alt={`${currency.code} flag`} class={`flag flag-${currency.id.toLowerCase()}`} />
            <span class="tk-currency-input__dropdown-menu-list-country-label">{currency.symbol}</span>
            <span class="tk-currency-input__dropdown-menu-list-dial-id">{currency.name}</span>
          </li>
        ))}
      </ul>
    );
  }

  private renderHint(): HTMLSpanElement {
    let hint;

    if (this.hint?.length > 0) {
      const hintIcon = <tk-icon {...getIconElementProps('info', { class: 'tk-currency-input__hint-icon', variant: null })} />;

      hint = (
        <span class="tk-currency-input__hint">
          {hintIcon}
          <span class="tk-currency-input__hint-text">{this.hint}</span>
        </span>
      );
    }

    if (this.error?.length > 0) {
      const hintIcon = <tk-icon {...getIconElementProps('info', { class: 'tk-currency-input__hint-icon', variant: null })} />;

      hint = (
        <span class="tk-currency-input__hint">
          {hintIcon}
          <span class="tk-currency-input__hint-text">{this.error}</span>
        </span>
      );
    }

    return hint;
  }

  render() {
    return (
      <div class={classNames('tk-currency-input', `tk-currency-input--${this.size}`)} aria-invalid={this.invalid} aria-disabled={this.disabled} aria-readonly={this.readonly}>
        {this.renderLabel()}
        <div class="tk-currency-input__wrapper">
          {this.renderCurrencyInput()}
          {this.handlePropsDecimalAndThousandsSeparator() && this.renderCurrencySelector()}
        </div>
        {this.renderHint()}
      </div>
    );
  }
}
