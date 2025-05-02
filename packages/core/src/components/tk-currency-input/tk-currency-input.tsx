import { Component, ComponentInterface, Element, Event, EventEmitter, Method, Prop, State, Watch, h } from '@stencil/core';
import classNames from 'classnames';

/**
 * TkCurrencyInput component description.
 * @react `import { TkCurrencyInput } from '@takeoff-ui/react'`
 * @vue `import { TkCurrencyInput } from '@takeoff-ui/vue'`
 * @angular `import { TkCurrencyInput } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-currency-input',
  styleUrl: 'tk-currency-input.scss',
  shadow: true,
})
export class TkCurrencyInput implements ComponentInterface {
  private nativeInput?: HTMLInputElement;
  private inputId = `tk-input-${inputIds++}`;
  private tabindex?: string | number;

  @Element() el!: HTMLTkCurrencyInputElement;

  @State() formattedValue: string = '';
  @State() hasFocus = false;

  /**
   * Specifies the currency to be displayed.
   * @defaultValue 'TL'
   */
  @Prop() currency: string = 'TL';

  /**
   * Defines the available currency options for the user to select from.
   */
  @Prop() currencyOptions: any[];

  /**
   * Sets the character used to separate the decimal part.
   */
  @Prop() decimalSeparator: string = ',';

  /**
   * If `true`, the user cannot interact with the input.
   */
  @Prop() disabled = false;

  /**
   * Indicates whether the input is in an invalid state.
   * @defaultValue false
   */
  @Prop() invalid: boolean = false;

  /**
   * This is the error message that will be displayed.
   */
  @Prop() error: string;

  /**
   * Provided a hint or additional information about the input.
   */
  @Prop() hint: string;

  /**
   * Specifies a material icon name to be displayed.
   */
  @Prop() icon: string | undefined;

  /**
   * Defines the label for the input.
   */
  @Prop() label: string;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId;

  /**
   * Placeholder text displayed when the input is empty.
   */
  @Prop() placeholder?: string | null;

  /**
   * Determines the number of decimal places to display, like 2 decimal places for cents.
   * @defaultValue 2
   */
  @Prop() precision: number = 2;

  /**
   * If `true`, the user cannot modify the value.
   */
  @Prop() readonly: boolean = false;

  /**
   * Sets size for the component.
   */
  @Prop() size: 'large' | 'base' | 'small' = 'base';

  /**
   * Specifies the character used to separate thousands in large numbers.
   */
  @Prop() thousandsSeparator: string = '.';

  /**
   * The value of the input.
   */
  @Prop({ mutable: true }) value?: number | null = 0;

  /**
   * Update the native input element when the value changes
   */
  @Watch('value')
  protected valueChanged() {
    this.tkChange.emit(this.value);
  }

  /**
   * Emitted when the input loses focus.
   */
  @Event({ eventName: 'tk-blur' }) tkBlur!: EventEmitter<void>;

  /**
   * Emitted when the value has changed.
   */
  @Event({ eventName: 'tk-change' }) tkChange!: EventEmitter<string | number | undefined | null>;

  /**
   * Emitted when the input has focus.
   */
  @Event({ eventName: 'tk-focus' }) tkFocus!: EventEmitter<void>;

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event({ eventName: 'tk-input' }) tkInput!: EventEmitter<KeyboardEvent>;

  componentWillLoad() {
    // If the tk-input has a tabindex attribute we get the value
    // and pass it down to the native input, then remove it from the
    // tk-input to avoid causing tabbing twice on the same element
    if (this.el.hasAttribute('tabindex')) {
      const tabindex = this.el.getAttribute('tabindex');
      this.tabindex = tabindex !== null ? tabindex : undefined;
      this.el.removeAttribute('tabindex');
    }
  }

  componentDidLoad(): void {
    this.nativeInput = this.el.shadowRoot.querySelector('input');
  }

  /**
   * Sets focus on the specified `tk-input`. Use this method instead of the global
   * `input.focus()`.
   */
  @Method()
  async setFocus() {
    this.nativeInput?.focus();
  }

  private formatCurrency(value) {
    const allowedChar = value.replace(/[^0-9.,]/g, '');
    value = this.formattedValue = allowedChar;

    const parts = this.formattedValue.replaceAll(this.thousandsSeparator, '').split(this.decimalSeparator);
    const arr = parts[0].split('');
    const formatted = arr.flatMap((item, index) => {
      if (arr.length > 3 && arr.length != index + 1 && arr.length % 3 == (index + 1) % 3) {
        return [item, this.thousandsSeparator];
      } else {
        return [item];
      }
    });
    if (parts.length > 1) {
      this.formattedValue = formatted.join('') + this.decimalSeparator + parts[1];
      this.value = parseFloat(this.formattedValue.replaceAll(this.thousandsSeparator, '').replace(this.decimalSeparator, '.')) || 0;
    } else {
      this.formattedValue = formatted.join('');
      this.value = parseFloat(this.formattedValue.replaceAll(this.thousandsSeparator, '')) || 0;
    }
  }

  private handleInput = (ev: Event) => {
    const input = ev.target as HTMLInputElement | null;
    if (input?.value) {
      this.formatCurrency(input.value);
    }
    this.tkInput.emit(ev as KeyboardEvent);
  };

  private handleBlur = () => {
    this.hasFocus = false;

    this.formatCurrency(this.value.toFixed(this.precision).replace('.', this.decimalSeparator));

    this.tkBlur.emit();
  };

  private handleFocus = () => {
    this.hasFocus = true;

    this.tkFocus.emit();
  };

  private renderInput(): HTMLInputElement {
    return (
      <input
        ref={el => (this.nativeInput = el)}
        disabled={this.disabled}
        autoComplete="off"
        type="text"
        name={this.name}
        placeholder={this.placeholder || ''}
        readOnly={this.readonly}
        tabindex={this.tabindex}
        value={this.formattedValue}
        onInput={this.handleInput}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
      />
    );
  }

  private renderRightField(): HTMLElement {
    let rightField;
    if (this.currencyOptions?.length > 0) {
      rightField = (
        // TODO: dropdown yapılınca burasıda dinamik hale getirilecek
        <div class="options">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="flag">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H24V24H0V0Z" fill="#E30A17" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.3501 12.3752C16.3501 15.6846 13.6173 18.3705 10.2516 18.3705C6.88601 18.3705 4.1532 15.6846 4.1532 12.3705C4.1532 9.05644 6.88132 6.37988 10.2469 6.37988C13.6126 6.37988 16.3548 9.06113 16.3548 12.3752H16.3501Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.6551 12.3754C16.6551 15.0238 14.4707 17.1707 11.7754 17.1707C9.08008 17.1707 6.90039 15.0238 6.90039 12.3754C6.90039 9.72695 9.08008 7.58008 11.7754 7.58008C14.4707 7.58008 16.6504 9.72695 16.6504 12.3754H16.6551Z"
              fill="#E30A17"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.5359 9.57227L17.489 11.7895L15.4171 12.352L17.4562 13.0785L17.4093 15.1082L18.7359 13.5238L20.7468 14.2176L19.5843 12.516L20.9999 10.8238L18.8249 11.4238L17.5359 9.57227Z"
              fill="white"
            />
          </svg>
          <div class="current-currency">{this.currency}</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15.875 8.99953L11.995 12.8795L8.11501 8.99953C7.72501 8.60953 7.09501 8.60953 6.70501 8.99953C6.31501 9.38953 6.31501 10.0195 6.70501 10.4095L11.295 14.9995C11.685 15.3895 12.315 15.3895 12.705 14.9995L17.295 10.4095C17.685 10.0195 17.685 9.38953 17.295 8.99953C16.905 8.61953 16.265 8.60953 15.875 8.99953Z"
              fill="#222530"
            />
          </svg>
        </div>
      );
    }
    return rightField;
  }

  private renderHint(): HTMLSpanElement {
    let hint;
    if (this.hint?.length > 0) {
      hint = (
        <span class="hint">
          <i class="material-symbols-outlined">info</i>
          {this.hint}
        </span>
      );
    }

    if (this.error?.length > 0) {
      hint = (
        <span class="hint">
          <i class="material-symbols-outlined">info</i>
          {this.error}
        </span>
      );
    }
    return hint;
  }

  render() {
    const rootClasses = classNames('tk-currency-input-container', this.size, { focus: this.hasFocus });

    return (
      <div aria-readonly={this.readonly} aria-disabled={this.disabled} aria-invalid={this.invalid} class={rootClasses}>
        <label class="label">{this.label}</label>
        <div class="tk-currency-input">
          {this.renderInput()}
          {this.renderRightField()}
        </div>
        {this.renderHint()}
      </div>
    );
  }
}

let inputIds = 0;
