import { Component, ComponentInterface, Element, Event, EventEmitter, Method, Prop, State, h, AttachInternals, Watch } from '@stencil/core';
import classNames from 'classnames';
import Cleave from 'cleave.js';
import { v4 as uuidv4 } from 'uuid';
import { IInputMaskOptions } from './interfaces';
import { IIconOptions } from '../../global/interfaces/IIconOptions';
import _ from 'lodash';
import { CleaveOptions } from 'cleave.js/options';
import { getIconElementProps } from '../../utils/icon-props';

/**
 * The TkInput component is used to capture text input from the user.
 * @react `import { TkInput } from '@takeoff-ui/react'`
 * @vue `import { TkInput } from '@takeoff-ui/vue'`
 * @angular `import { TkInput } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-input',
  styleUrl: 'tk-input.scss',
  formAssociated: true,
})
export class TkInput implements ComponentInterface {
  private nativeInput?: HTMLInputElement;
  private tabindex?: string | number;
  private uniqueId = uuidv4();
  private cleaveInstance: Cleave;

  @Element() el!: HTMLTkInputElement;

  @AttachInternals() internals: ElementInternals;

  @State() hasFocus = false;
  @State() inputType: string;
  @State() isCounter = false;
  @State() isPassword = false;
  @State() passwordStrength: number = 0;

  /**
   * the user cannot interact with the input.
   */
  @Prop() disabled = false;

  /**
   * Indicates whether the input is in an invalid state
   * @defaultValue false
   */
  @Prop() invalid: boolean = false;

  /**
   * Indicates whether the input can be cleared
   * @defaultValue false
   */
  @Prop() clearable: boolean = false;

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
  @Prop() icon?: string | IIconOptions;

  /**
   * Defines the position of the icon.
   * @defaultValue left
   */
  @Prop() iconPosition: 'left' | 'right' = 'left';

  /**
   * Defines the label for the input.
   */
  @Prop() label: string;

  /**
   * Defines the prefix of the input;
   */
  @Prop() pre?: string;

  /**
   * The maskOptions prop is used to define masking configurations supported by the Cleave.js library. With this prop, you can specify any masking options described in the Cleave.js documentation (https://nosir.github.io/cleave.js/). For example, you can configure it for formatting dates, phone numbers, or credit card numbers as needed.
   */
  @Prop() maskOptions: IInputMaskOptions;

  /**
   * Maximum value for number inputs
   */
  @Prop() max?: string | number;

  /**
   * Minimum value for number inputs
   */
  @Prop() min?: string | number;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string;

  /**
   * Placeholder text displayed when the input is empty.
   */
  @Prop() placeholder?: string | null;

  /**
   * If `true`, the user cannot modify the value.
   */
  @Prop() readonly: boolean = false;

  /**
   * Sets size for the component.
   */
  @Prop() size: 'large' | 'base' | 'small' = 'base';

  /**
   * if type = password safety status bar visible
   */
  @Prop() showSafetyStatus: boolean = false;

  /**
   * Displays a red asterisk (*) next to the label for visual emphasis.
   */
  @Prop() showAsterisk: boolean = false;

  /**
   * The key to use for option labels
   * @defaultValue label
   */
  @Prop() chipLabelKey: string = 'label';

  /**
   * input type
   */
  @Prop() mode: 'text' | 'password' | 'counter' | 'number' | 'chips' = 'text';

  /**
   * The value of the input.
   */
  @Prop({ mutable: true }) value?: string | string[] | number | any[];
  @Watch('value')
  protected valueChanged(newValue, oldValue) {
    if (_.isEqual(newValue, oldValue) && this.mode !== 'chips') {
      this.nativeInput.value = newValue;
    }
  }

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
   * Emitted when the clear button has click.
   */
  @Event({ eventName: 'tk-clear-click' }) tkClearClick: EventEmitter<void>;

  componentWillLoad() {
    // If the tk-input has a tabindex attribute we get the value
    // and pass it down to the native input, then remove it from the
    // tk-input to avoid causing tabbing twice on the same element
    if (this.el.hasAttribute('tabindex')) {
      const tabindex = this.el.getAttribute('tabindex');
      this.tabindex = tabindex !== null ? tabindex : undefined;
      this.el.removeAttribute('tabindex');
    }

    if (this.mode == 'text') {
      this.inputType = 'text';
    } else if (this.mode == 'number') {
      this.inputType = 'number';
    } else if (this.mode == 'password') {
      this.inputType = 'password';
      this.isPassword = true;
    } else if (this.mode == 'counter') {
      this.inputType = 'number';
      this.isCounter = true;
    }
  }

  componentDidLoad(): void {
    this.nativeInput = this.el.querySelector('input');

    if (this.mode == 'text' && this.maskOptions) {
      this.cleaveInstance = new Cleave(this.nativeInput, {
        ...this.maskOptions,
      } as CleaveOptions);
    }
  }

  formResetCallback() {
    this.value = null;
    this.tkChange.emit(null);
  }

  /**
   * Sets focus on the specified `tk-input`. Use this method instead of the global
   * `input.focus()`.
   */
  @Method()
  async setFocus() {
    this.nativeInput?.focus();
  }

  private validateMinMax() {
    if (this.mode === 'text' && this.min !== undefined && this.max !== undefined) {
      const numValue = parseInt(this.value as string, 10);
      if (!isNaN(numValue)) {
        if (numValue < Number(this.min)) {
          this.value = this.min.toString();
          this.tkChange.emit(this.min.toString());
        } else if (numValue > Number(this.max)) {
          this.value = this.max.toString();
          this.tkChange.emit(this.max.toString());
        }
      }
    }
  }

  /**
   * Toggles the visibility of the password input field.
   *
   * This method is called when the user interacts with the visibility toggle icon.
   *
   * @param event The mouse event triggered by the user interaction.
   * @param val A boolean value indicating whether to show or hide the password.
   */
  private visiblePassword(event, val: boolean) {
    if (val) {
      this.nativeInput.type = 'text';
      event.target.innerHTML = 'visibility_off';
    } else {
      this.nativeInput.type = 'password';
      event.target.innerHTML = 'visibility';
    }
  }

  /**
   * Calculates the strength of a given password.
   *
   * The password strength is determined based on the following criteria:
   * - Length of at least 8 characters
   * - Presence of uppercase letters
   * - Presence of lowercase letters
   * - Presence of numbers
   * - Presence of special characters
   *
   * Each met criterion increases the strength by 1. The maximum strength is 5.
   *
   * @param password The password to be evaluated.
   * @returns A number representing the password strength.
   */
  private calculatePasswordStrength(password: string): number {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  }

  private handleInput = (ev: Event) => {
    if (this.mode != 'chips') {
      const input = ev.target as HTMLInputElement;
      let _value;
      if (this.mode == 'number') {
        _value = input.value ? Number(input.value) : null;
      } else {
        _value = input.value || '';
      }

      // masklı kullanımlar için value'yu formatlama yapılıyor.
      if (this.maskOptions && this.cleaveInstance) {
        // If letterOnly option is enabled, filter out non-letters
        if (this.maskOptions.letterOnly) {
          _value = _value.replace(/[^a-zA-Z]/g, '');
          input.value = _value;
        }

        this.cleaveInstance?.setRawValue(_value);
        _value = this.cleaveInstance?.getFormattedValue();
      }

      if (!_.isEqual(this.value, _value)) {
        this.value = _value;
        this.tkChange.emit(_value);
      }
    }

    if (this.mode == 'password' && this.showSafetyStatus) {
      this.passwordStrength = this.calculatePasswordStrength(String(this.value));
    }
  };

  private handleInputBlur = () => {
    this.hasFocus = false;
    this.validateMinMax();
    this.tkBlur.emit();
  };

  // for add chip
  private handleInputKeyDown = (e: KeyboardEvent) => {
    if (
      e.key == 'Enter' &&
      this.nativeInput.value.trim() &&
      this.mode == 'chips' &&
      // (!this.value || (this.value as string[])?.indexOf(this.nativeInput.value) == -1) &&
      (this.el.classList.contains('allow-custom-value-select') || !this.el.classList.contains('tk-select-input'))
    ) {
      if (this.value) {
        this.value = [...(this.value as string[]), this.nativeInput.value];
        this.tkChange.emit(this.value);
      } else {
        this.value = [this.nativeInput.value];
        this.tkChange.emit([this.nativeInput.value]);
      }

      this.nativeInput.value = '';
    }
  };

  private handleMinusButtonClick() {
    if (!this.disabled && (this.min == undefined || Number(this.value) > Number(this.min))) {
      this.value = Number(this.value) - 1;
      this.tkChange.emit(this.value);
    }
  }

  private handlePlusButtonClick() {
    if (this.value == '' && this.min != undefined) {
      this.value = this.min;
      this.tkChange.emit(this.min);
    } else if (!this.disabled && (this.max == undefined || Number(this.value) < Number(this.max))) {
      this.value = Number(this.value) + 1;
      this.tkChange.emit(this.value);
    }
  }

  private handleChipsRemove(item: any) {
    const chipsArr = [...(this.value as any[])];

    if (_.includes(chipsArr, item)) {
      _.pull(chipsArr, item);
      this.value = chipsArr;
      this.tkChange.emit(chipsArr);
    }
  }

  private handleClearButtonClick(e) {
    e.stopPropagation();
    this.value = null;
    this.tkChange.emit(null);
    this.tkClearClick.emit();
  }

  private handleInputFocus = () => {
    this.hasFocus = true;

    this.tkFocus.emit();
  };

  private handleMouseDown = (event: MouseEvent) => {
    this.visiblePassword(event, true);
  };

  private handleMouseUp = (event: MouseEvent) => {
    this.visiblePassword(event, false);
  };

  /**
   * Renders the password strength indicator lines.
   *
   * The strength lines visually indicate the password strength:
   * - 1 or 2 filled lines: Weak (red color)
   * - 3 filled lines: Medium (yellow color)
   * - 4 filled lines: Strong (green color)
   *
   * The method creates four lines and assigns a CSS class based on the current password strength.
   *
   * @returns An array of JSX elements representing the strength indicator lines.
   */
  private renderStrengthLines(): HTMLElement[] {
    const lines: HTMLElement[] = [];
    for (let i = 0; i < 4; i++) {
      let className = 'line';
      if (i < this.passwordStrength) {
        if (this.passwordStrength < 3) className += ' weak';
        else if (this.passwordStrength < 4) className += ' medium';
        else className += ' strong';
      }
      lines.push(<span class={className}>&nbsp;</span>);
    }
    return lines;
  }

  private renderChips() {
    if (this.mode == 'chips' && typeof this.value == 'object' && (this.value as any[])?.length > 0) {
      return (this.value as any[]).map((item, index) => {
        if (typeof item === 'object') {
          // eğer item object ise label chips'in label'ına objenin labelı konmalı
          // ayrıca chips silinme durumunda remove handler'ına object tümüyle gönderilmeli
          // multiple abject array selection için geliştirildi
          return (
            <tk-chips
              label={item[this.chipLabelKey]}
              removable
              onTk-remove={() => this.handleChipsRemove(item)}
              variant="neutral"
              type="outlined"
              key={index}
              autoSelfDestroy={false}
            ></tk-chips>
          );
        } else {
          return (
            <tk-chips
              label={item}
              removable
              onTk-remove={(e: CustomEvent) => this.handleChipsRemove(e.detail)}
              variant="neutral"
              type="outlined"
              key={index}
              autoSelfDestroy={false}
            ></tk-chips>
          );
        }
      });
    }
  }

  render() {
    let label: HTMLLabelElement;
    let _icon: HTMLTkIconElement;
    let passwordLeftIcon: HTMLTkIconElement;
    let passwordRightIcon: HTMLTkIconElement;
    let leftButton: HTMLTkButtonElement;
    let rightButton: HTMLTkButtonElement;
    let safetyStatus: HTMLElement;
    let readOnly: boolean = false;

    const rootClasses = classNames('tk-input-container', this.size, { focus: this.hasFocus, counter: this.isCounter, chips: this.mode == 'chips' });
    const prefixClass = classNames('tk-input-prefix-container', this.size);

    if (this.label?.length > 0) {
      const asterisk = <span class="asterisk">*</span>;
      label = (
        <label class="label">
          {this.label}
          {this.showAsterisk ? asterisk : ''}
        </label>
      );
    }

    if (this.icon && !this.isCounter) {
      _icon = <tk-icon {...getIconElementProps(this.icon)} />;
    }

    if (this.inputType == 'password') {
      passwordLeftIcon = <tk-icon {...getIconElementProps('lock')} />;
      passwordRightIcon = (
        <tk-icon
          {...getIconElementProps('visibility', {
            class: 'clickable',
            onMouseDown: this.handleMouseDown,
            onMouseUp: this.handleMouseUp,
          })}
        />
      );

      if (this.showSafetyStatus) {
        safetyStatus = <div class="safety-status">{this.renderStrengthLines()}</div>;
      }
    }

    if (this.isCounter) {
      leftButton = (
        <tk-icon
          {...getIconElementProps(
            'remove',
            {
              class: classNames('counter-icon', { disabled: this.disabled || Number(this.value) <= Number(this.min) }),
              onClick: this.handleMinusButtonClick.bind(this),
            },
            undefined,
            'span',
          )}
        />
      );

      rightButton = (
        <tk-icon
          {...getIconElementProps(
            'add',
            {
              class: classNames('counter-icon', { disabled: this.disabled || Number(this.value) >= Number(this.max) }),
              onClick: this.handlePlusButtonClick.bind(this),
            },
            undefined,
            'span',
          )}
        />
      );
    }
    let hint: string;
    if (this.hint?.length > 0) {
      const hintIcon = <tk-icon {...getIconElementProps('info')} />;

      hint = (
        <span class="hint">
          {hintIcon}
          {this.hint}
        </span>
      );
    }

    if (this.error?.length > 0) {
      const hintIcon = <tk-icon {...getIconElementProps('info')} />;

      hint = (
        <span class="hint">
          {hintIcon}
          {this.error}
        </span>
      );
    }

    let showClearButton = this.clearable && ((this.mode != 'chips' && this.value) || (this.mode == 'chips' && (this.value as [])?.length > 0));

    if (this.el.classList.contains('tk-select-input')) {
      readOnly = !this.el.classList.contains('editable-select');
    } else {
      readOnly = this.readonly;
    }

    const chips = this.renderChips();

    return (
      <div aria-readonly={this.readonly} aria-disabled={this.disabled} aria-invalid={this.invalid} class={rootClasses}>
        {label}
        <label class="tk-input" htmlFor={this.uniqueId}>
          {chips}
          {!this.icon && this.iconPosition !== 'left' && passwordLeftIcon}
          {this.icon && this.iconPosition === 'left' && _icon}
          {leftButton}
          {this.pre && (
            <div class={prefixClass}>
              <span class="tk-input-prefix-text">{this.pre}</span>
              <span class="tk-input-divider"></span>
            </div>
          )}
          <input
            id={this.uniqueId}
            ref={el => (this.nativeInput = el)}
            disabled={this.disabled}
            autoComplete="off"
            type={this.inputType}
            name={this.name}
            min={this.min}
            max={this.max}
            placeholder={this.placeholder || ''}
            readOnly={readOnly}
            tabindex={this.tabindex}
            value={this.mode == 'chips' ? undefined : this.value}
            onInput={this.handleInput}
            onBlur={this.handleInputBlur}
            onFocus={this.handleInputFocus}
            onKeyDown={this.handleInputKeyDown}
          />
          {showClearButton && <tk-button variant="neutral" type="text" icon="close" size="small" onClick={e => this.handleClearButtonClick(e)}></tk-button>}
          {this.icon && this.iconPosition === 'right' && _icon}
          {!this.icon && this.iconPosition !== 'right' && passwordRightIcon}
          {rightButton}
        </label>
        {safetyStatus}
        {hint}
      </div>
    );
  }
}
