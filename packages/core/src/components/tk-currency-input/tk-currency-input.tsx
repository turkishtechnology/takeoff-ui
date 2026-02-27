import { Component, ComponentInterface, Prop, State, Element, Event, EventEmitter, Watch, h } from '@stencil/core';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import { getIconElementProps } from '../../utils/icon-utils';
import type { Separator, ICurrency, CurrencyInputChangeEvent } from './interfaces';
import { INTERNAL_CURRENCY_LIST } from './constants';
import { floatingElementAutoUpdate } from '../../utils/position-utils';
import { getValidSeparator } from './helpers';
import { applyStyles } from '../../utils/style-utils';

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
  private menuListRef?: HTMLUListElement;

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
  @Watch('disabled')
  protected disabledChanged(newValue: boolean) {
    if (newValue) this.isDropdownOpen = false;
  }

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
   * Disables the currency field if set to true.
   */
  @Prop() currencyDisabled: boolean = false;

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
  @Prop() decimalSeparator?: Separator;

  /**
   * Custom thousands separator to use for formatting.
   * If provided, this will override the currency's default thousands separator.
   * Example: "," for USD style, "." for EUR style, " " for some European styles
   */
  @Prop() thousandsSeparator?: Separator;

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
   * Hides the currency flag icon in the dropdown button and list.
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
      // Clean up old floating UI listeners before setting up new ones
      this.cleanup?.();
      this.updatePosition();
      // After the panel is positioned, calculate and apply the 6-item height cap
      this.applyHeightConstraint();
    } else {
      // Remove floating UI listeners when dropdown closes
      this.cleanup?.();
      // Clear reference to allow garbage collection
      this.cleanup = null;
      this.dropdownEl?.remove();
    }
  }

  connectedCallback() {
    document.addEventListener('click', this.closeDropdown);
  }

  disconnectedCallback() {
    // Clean up floating UI listeners on component unmount
    this.cleanup?.();
    // Clear reference to allow garbage collection
    this.cleanup = null;
    document.removeEventListener('click', this.closeDropdown);
  }

  private updatePosition() {
    const dropdownWidthMode = this.dropdownWidthMode;
    const tkInputRootEl = this.el.querySelector('.tk-currency-input-wrapper') as HTMLTkInputElement;
    this.cleanup = floatingElementAutoUpdate(tkInputRootEl, this.dropdownEl, undefined, {
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
  private getDecimalSeparator(): Separator {
    return getValidSeparator(this.decimalSeparator, this.thousandsSeparator, this.selectedCurrency?.decimalSeparator, this.selectedCurrency?.thousandsSeparator, '.');
  }

  /**
   * Get the thousands separator to use - custom prop takes priority over currency default
   */

  private getThousandsSeparator(): Separator {
    return getValidSeparator(this.thousandsSeparator, this.decimalSeparator, this.selectedCurrency?.thousandsSeparator, this.selectedCurrency?.decimalSeparator, ',');
  }

  private formatCurrency(amount: number): string {
    if (isNaN(amount)) return '';

    // Use custom separators if provided, otherwise fall back to currency defaults
    const decimalSeparator = this.getDecimalSeparator();
    const thousandsSeparator = this.getThousandsSeparator();

    const isNegative = amount < 0 || Object.is(amount, -0);
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

    // Remove thousands separators
    if (thousandsSeparator) {
      cleanValue = cleanValue.replace(new RegExp('\\' + thousandsSeparator, 'g'), '');
    }

    // Handle decimal separator: split by separator, keep first part as integer, join rest as decimal
    const parts = cleanValue.split(decimalSeparator);
    if (parts.length > 1) {
      cleanValue = parts[0] + '.' + parts.slice(1).join('');
    }

    // Remove non-numeric characters except decimal point
    cleanValue = cleanValue.replace(/[^0-9.]/g, '');

    const numericValue = parseFloat(cleanValue);
    const result = isNaN(numericValue) ? 0 : numericValue;

    return isNegative ? -result : result;
  }

  private closeDropdown = (event: Event) => {
    if (event.composedPath().includes(this.el) || !this.isDropdownOpen) {
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

    if (!this.disabled && !this.readonly && !this.currencyDisabled) {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  };

  private calculateNewCursorPosition(inputValue: string, formattedValue: string, oldCursorPosition: number): number {
    const decimalSeparator = this.getDecimalSeparator();

    // Find decimal separator positions
    const inputDecimalIndex = inputValue.indexOf(decimalSeparator);
    const formattedDecimalIndex = formattedValue.indexOf(decimalSeparator);

    // If no decimal separator in formatted value (precision 0), treat end as decimal point
    const targetDecimalIndex = formattedDecimalIndex === -1 ? formattedValue.length : formattedDecimalIndex;

    // If no decimal separator in input, treat end as decimal point
    const sourceDecimalIndex = inputDecimalIndex === -1 ? inputValue.length : inputDecimalIndex;

    // Helper to count digits in a range
    const countDigits = (str: string, start: number, end: number) => {
      let count = 0;
      for (let i = Math.min(start, end); i < Math.max(start, end); i++) {
        if (str[i] >= '0' && str[i] <= '9') {
          count++;
        }
      }
      return count;
    };

    // Calculate logical distance (number of digits) from decimal separator
    const isCursorAfterDecimal = oldCursorPosition > sourceDecimalIndex;
    const logicalDist = countDigits(inputValue, oldCursorPosition, sourceDecimalIndex);

    if (logicalDist === 0) {
      return isCursorAfterDecimal ? targetDecimalIndex + 1 : targetDecimalIndex;
    }

    // Traverse formatted value to find new position
    let currentDist = 0;

    if (isCursorAfterDecimal) {
      // Moving right from decimal separator
      for (let i = targetDecimalIndex + 1; i < formattedValue.length; i++) {
        if (currentDist >= logicalDist) {
          return i;
        }
        if (formattedValue[i] >= '0' && formattedValue[i] <= '9') {
          currentDist++;
        }
      }
      return formattedValue.length;
    } else {
      // Moving left from decimal separator
      for (let i = targetDecimalIndex - 1; i >= 0; i--) {
        if (formattedValue[i] >= '0' && formattedValue[i] <= '9') {
          currentDist++;
        }
        if (currentDist > logicalDist) {
          // Use > because we want to be *after* the digit that completes the count
          return i + 1;
        }
      }
      // If we run out of digits, go to start, but respect negative sign
      const hasNegative = formattedValue.startsWith('-');
      return hasNegative ? 1 : 0;
    }
  }

  private handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value;
    const cursorPosition = target.selectionStart;

    // Use custom separators if provided, otherwise fall back to currency defaults
    const decimalSeparator = this.getDecimalSeparator();
    const thousandsSeparator = this.getThousandsSeparator();

    // Check if decimal separator was deleted
    if (this.displayValue.includes(decimalSeparator) && !inputValue.includes(decimalSeparator)) {
      const expectedValueWithoutSeparator = this.displayValue.replace(decimalSeparator, '');
      if (inputValue === expectedValueWithoutSeparator) {
        target.value = this.displayValue;
        const commaIndex = this.displayValue.indexOf(decimalSeparator);
        target.setSelectionRange(commaIndex, commaIndex);
        return;
      }
    }

    // Allow negative sign if allowNegative is true
    const negativePattern = this.allowNegative ? '\\-' : '';
    const allowedChars = new RegExp(`[0-9\\${decimalSeparator}\\${thousandsSeparator}${negativePattern}]`);

    let filteredValue = '';
    let hasNegativeSign = false;

    const parts = inputValue.split(decimalSeparator);
    if (parts.length > 2) {
      const firstSeparatorIndex = inputValue.indexOf(decimalSeparator);
      const newIntegerPart = inputValue.substring(0, firstSeparatorIndex);
      const displayParts = this.displayValue.split(decimalSeparator);
      const oldDecimalPart = displayParts.length > 1 ? displayParts[1] : '';
      filteredValue = newIntegerPart + decimalSeparator + oldDecimalPart;
    } else {
      for (let i = 0; i < inputValue.length; i++) {
        const char = inputValue[i];

        // Handle negative sign - only allow it at the beginning
        if (char === '-' && this.allowNegative && i === 0 && !hasNegativeSign) {
          filteredValue += char;
          hasNegativeSign = true;
        } else if (char === '-' && this.allowNegative && hasNegativeSign) {
          // Remove duplicate negative signs
        } else if (allowedChars.test(char) && char !== '-') {
          filteredValue += char;
        }
      }
    }

    // Truncate decimal digits if they exceed precision
    if (this.precision >= 0) {
      const parts = filteredValue.split(decimalSeparator);
      if (parts.length > 1) {
        const integerPart = parts[0];
        const decimalPart = parts[1];

        if (decimalPart.length > this.precision) {
          filteredValue = integerPart + decimalSeparator + decimalPart.substring(0, this.precision);
        }
      }
    }

    const numericValue = this.parseFormattedValue(filteredValue);

    this.currentNumericValue = numericValue;

    const formattedValue = this.formatCurrency(numericValue);

    this.displayValue = formattedValue;

    target.value = formattedValue;

    const newCursorPosition = this.calculateNewCursorPosition(inputValue, formattedValue, cursorPosition);

    target.setSelectionRange(newCursorPosition, newCursorPosition);

    const eventData = {
      value: numericValue,
      currency: this.selectedCurrency,
      formattedValue: formattedValue,
    } as CurrencyInputChangeEvent;

    this.tkChange.emit(eventData);
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    const decimalSeparator = this.getDecimalSeparator();

    if (event.key === '.' && decimalSeparator !== '.') {
      event.preventDefault();
    }
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
  /*
   * Define and apply
   */
  private applyHeightConstraint() {
    const firstItem = this.menuListRef?.querySelector<HTMLLIElement>('.tk-currency-input-dropdown-menu-list-item');
    if (!firstItem || !this.menuListRef || !this.dropdownEl) return;

    const itemHeight = firstItem.getBoundingClientRect().height;
    const listMargin = 8 * 2;
    const itemMargin = 5 * 4;
    const listMaxHeight = itemHeight * 6 + itemMargin;

    const panelMaxHeight = listMaxHeight + listMargin;

    this.menuListRef.style.maxHeight = `${listMaxHeight}px`;
    this.dropdownEl.style.maxHeight = `${panelMaxHeight}px`;
  }

  private renderLabel() {
    if (this.label) {
      return (
        <label class="tk-currency-input-label" htmlFor={this.uniqueId}>
          <span class="tk-currency-input-label-title">{this.label}</span>
          {this.showAsterisk && <span class="tk-currency-input-label-asterisk">*</span>}
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
        class="tk-currency-input-input"
        autoComplete="off"
        value={this.displayValue}
        placeholder={this.placeholder}
        disabled={this.disabled}
        readonly={this.readonly}
        name={this.name}
        onInput={this.handleInput}
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      />
    );
  }

  private renderCurrencySelector() {
    return (
      <div class="tk-currency-input-dropdown">
        {this.renderDropdownButton()}

        {this.isDropdownOpen && (
          <div class="tk-currency-input-dropdown-menu" role="listbox" ref={el => (this.dropdownEl = el as HTMLDivElement)}>
            {this.renderCurrencyList()}
          </div>
        )}
      </div>
    );
  }

  private renderDropdownButton() {
    return (
      <button type="button" class="tk-currency-input-dropdown-button" onClick={event => this.toggleDropdown(event)} disabled={this.currencyDisabled || this.disabled}>
        <div class="tk-currency-input-dropdown-button-selected">
          {!this.hideFlag && <div class={`flag flag-${this.selectedCurrency.id.toLowerCase()}`} aria-label={`${this.selectedCurrency.name} flag`} />}
          <span class="tk-currency-input-dropdown-button-currency-code">{this.selectedCurrency?.code}</span>
          <tk-icon {...getIconElementProps('stat_minus_1', { variant: null, size: 'large' }, undefined, 'span')} />
        </div>
      </button>
    );
  }

  private renderCurrencyList() {
    const currencies = this.getCurrencies();

    return (
      <ul class="tk-currency-input-dropdown-menu-list" ref={el => (this.menuListRef = el as HTMLUListElement)}>
        {currencies.map(currency => (
          <li
            class="tk-currency-input-dropdown-menu-list-item"
            key={currency.code}
            role="option"
            onClick={event => this.handleSelectCurrency(currency.code, event)}
            aria-selected={this.selectedCurrency.code === currency.code}
          >
            {!this.hideFlag && <div class={`flag flag-${currency.id.toLowerCase()}`} aria-label={`${currency.code} flag`} />}
            <span class="tk-currency-input-dropdown-menu-list-country-label">{currency.symbol}</span>
            <span class="tk-currency-input-dropdown-menu-list-dial-id">{currency.name}</span>
          </li>
        ))}
      </ul>
    );
  }

  private renderHint(): HTMLSpanElement {
    let hint;

    if (this.hint?.length > 0) {
      const hintIcon = <tk-icon {...getIconElementProps('info', { class: 'tk-currency-input-hint-icon', variant: null })} />;

      hint = (
        <span class="tk-currency-input-hint">
          {hintIcon}
          <span class="tk-currency-input-hint-text">{this.hint}</span>
        </span>
      );
    }

    if (this.error?.length > 0) {
      const hintIcon = <tk-icon {...getIconElementProps('info', { class: 'tk-currency-input-error-icon', variant: null })} />;

      hint = (
        <span class="tk-currency-input-error">
          {hintIcon}
          <span class="tk-currency-input-error-text">{this.error}</span>
        </span>
      );
    }

    return hint;
  }

  render() {
    return (
      <div
        class={classNames('tk-currency-input-container', `tk-currency-input-container-${this.size}`)}
        aria-invalid={this.invalid}
        aria-disabled={this.disabled}
        aria-readonly={this.readonly}
      >
        {this.renderLabel()}
        <div class="tk-currency-input-wrapper">
          {this.renderCurrencyInput()}
          {this.renderCurrencySelector()}
        </div>
        {this.renderHint()}
      </div>
    );
  }
}
