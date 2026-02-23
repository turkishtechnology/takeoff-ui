import { Component, ComponentInterface, Element, Event, EventEmitter, Method, Prop, State, h, AttachInternals, Watch } from '@stencil/core';
import classNames from 'classnames';
import Cleave from 'cleave.js';
import { v4 as uuidv4 } from 'uuid';
import { IInputMaskOptions } from './interfaces';
import { IIconOptions, IMultiIconOptions } from '../../global/interfaces/IIconOptions';
import { isEqual, isNil } from 'lodash-es';
import { CleaveOptions } from 'cleave.js/options';
import { IChipOptions } from '../tk-chips/interfaces';
import { renderIcons, getIconElementProps } from '../../utils/icon-utils';
import { getNestedValue } from '../../utils/object-utils';

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
  private readOnly: boolean = false;
  private editable: boolean = true;

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
  @Prop() icon?: string | IIconOptions | IMultiIconOptions;

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
  @Watch('maskOptions')
  protected maskOptionsChanged(newValue: IInputMaskOptions, oldValue: IInputMaskOptions) {
    if (!isEqual(newValue, oldValue)) {
      this.cleaveInstance?.destroy();
      this.cleaveInstance = new Cleave(this.nativeInput, {
        ...this.maskOptions,
      } as CleaveOptions);
    }
  }

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
   * @defaultValue false
   */
  @Prop() readonly: boolean = false;

  /**
   * Sets size for the component.
   * @defaultValue base
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
   * Sets options for all chips rendered in chips mode.
   */
  @Prop() chipOptions: IChipOptions;
  /**
   * input type
   */
  @Prop() mode: 'text' | 'password' | 'counter' | 'number' | 'chips' = 'text';

  /**
   * Sets step for decimal value with mode number
   */
  @Prop() step: string;

  /**
   * A function that determines whether a chip is disabled.
   */
  @Prop() chipDisabled: Function;

  /**
   * Shows a loading spinner on the right side of the input.
   * @defaultValue false
   */
  @Prop() loading: boolean = false;

  /**
   * The value of the input.
   */
  @Prop({ mutable: true }) value?: string | string[] | number | any[];
  @Watch('value')
  protected valueChanged(newValue, oldValue) {
    if (!isEqual(newValue, oldValue) && this.mode !== 'chips') {
      if (typeof newValue === 'object' && typeof oldValue === 'object') {
        this.nativeInput.value = getNestedValue(newValue, this.chipLabelKey);
      } else {
        this.nativeInput.value = newValue;
      }
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
    if (this.mode === 'counter') {
      this.nativeInput.value = this.clampValueByLimit(this.value)?.toString() ?? '';
    }
    if (this.mode == 'text' && this.maskOptions) {
      this.cleaveInstance = new Cleave(this.nativeInput, {
        ...this.maskOptions,
      } as CleaveOptions);
    }
  }
  componentDidUpdate(): void {
    if (this.mode === 'counter') {
      this.nativeInput.value = this.clampValueByLimit(this.value)?.toString() ?? '';
    }
  }

  formResetCallback() {
    this.handleFormReset();
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

  private clampValueByLimit = (value, operation?: string): number | null => {
    if (value === null || value === undefined || isNaN(value)) {
      return null;
    }

    const numValue = Number(value);

    if (this.min !== null && this.min !== undefined && numValue < Number(this.min)) {
      if (operation === 'increment') {
        return Number(this.min) + 1;
      }
      return Number(this.min);
    }

    if (this.max !== null && this.max !== undefined && numValue > Number(this.max)) {
      if (operation === 'decrement') {
        return Number(this.max) - 1;
      }
      return Number(this.max);
    }
    return numValue;
  };

  private handleInput = (ev: Event) => {
    if (this.mode != 'chips') {
      const input = ev.target as HTMLInputElement;
      let _value;

      if (this.mode == 'number' || this.mode == 'counter') {
        _value = input.value ? Number(input.value) : null;
      } else {
        _value = input.value || '';
      }

      if (this.maskOptions) {
        // Custom regex mask
        if (this.maskOptions?.regex && this.mode === 'text') {
          const regex = typeof this.maskOptions.regex === 'string' ? new RegExp(this.maskOptions.regex, 'g') : new RegExp(this.maskOptions.regex.source, 'g');

          // Regex'e uyan karakterleri filtrele
          const matches = _value.match(regex);
          _value = matches ? matches.join('') : '';
          input.value = _value;
        }

        if (this.maskOptions.letterOnly) {
          // If letterOnly option is enabled, filter out non-letters
          _value = _value.replace(/[^a-zA-Z]/g, '');
          input.value = _value;
        }

        if (this.cleaveInstance) {
          this.cleaveInstance?.setRawValue(_value);
          _value = this.cleaveInstance?.getFormattedValue();
        }
      }

      if (!isEqual(this.value, _value)) {
        this.value = _value;
        this.tkChange.emit(_value);
      }
    }

    if (this.mode == 'password' && this.showSafetyStatus) {
      this.passwordStrength = this.calculatePasswordStrength(String(this.value));
    }
  };

  private handleInputKeyUp = (ev: KeyboardEvent) => {
    const newInput = ev.target as HTMLInputElement;
    if (this.mode === 'counter' && newInput) {
      if (newInput.value === '') {
        this.nativeInput.value = '';
      } else {
        this.nativeInput.value = this.clampValueByLimit(Number(newInput.value))?.toString() ?? '';
      }
    }
  };

  private handleInputBlur = () => {
    this.hasFocus = false;
    this.validateMinMax();
    this.tkBlur.emit();
  };

  private handleFormReset() {
    if (this.mode === 'chips' && this.chipDisabled && Array.isArray(this.value)) {
      this.value = this.value.filter(item => this.chipDisabled(item));
    } else {
      this.value = null;
    }
    this.tkChange.emit(this.value);
  }

  // for add chip
  private handleInputKeyDown = (e: KeyboardEvent) => {
    // --- Cleave.js maske ayırıcı karakterlerinin silinmesi için genel çözüm ---
    if (this.maskOptions && this.cleaveInstance && this.mode == 'text' && (e.key === 'Backspace' || e.key === 'Delete')) {
      const input = this.nativeInput;
      const value = input.value;
      const selectionStart = input.selectionStart;
      const selectionEnd = input.selectionEnd;

      // Sadece imleç varsa (seçili alan yoksa) işle
      if (selectionStart === selectionEnd) {
        let charToCheck, posToRemove;
        if (e.key === 'Backspace' && selectionStart > 0) {
          charToCheck = value[selectionStart - 1];
          posToRemove = selectionStart - 1;
        } else if (e.key === 'Delete' && selectionStart < value.length) {
          charToCheck = value[selectionStart];
          posToRemove = selectionStart;
        }

        // Eğer karakter bir ayırıcı ise (rakam/harf değilse)
        if (charToCheck && /[^a-zA-Z0-9]/.test(charToCheck)) {
          e.preventDefault();
          // Ayırıcıyı ve öncesindeki (Backspace) veya sonrasındaki (Delete) karakteri sil
          let newValue;
          let newCaretPos;
          if (e.key === 'Backspace') {
            // Ayırıcının öncesindeki karakteri sil
            newValue = value.slice(0, posToRemove - 1) + value.slice(posToRemove);
            newCaretPos = posToRemove - 1;
          } else {
            // Ayırıcının sonrasındaki karakteri sil
            newValue = value.slice(0, posToRemove) + value.slice(posToRemove + 1);
            newCaretPos = posToRemove;
          }
          this.cleaveInstance.setRawValue(newValue);
          this.value = this.cleaveInstance.getFormattedValue();
          this.tkChange.emit(this.value);

          // DOM güncellendikten sonra imleç pozisyonunu ayarla
          setTimeout(() => {
            input.setSelectionRange(newCaretPos, newCaretPos);
          }, 0);
          return; // Daha fazla işlem yapma
        }
      }
    }
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
    if (!this.disabled) {
      const currentValue = Number(this.value) || 0;
      const newValue = this.clampValueByLimit(currentValue - 1, 'decrement');
      if (newValue !== null && newValue !== Number(this.value)) {
        this.value = newValue;
        this.tkChange.emit(newValue);
      }
    }
  }

  private handlePlusButtonClick() {
    if (!this.disabled) {
      let currentValue: number;
      if (this.value === '' || this.value === null || this.value === undefined) {
        currentValue = !isNil(this.min) ? Number(this.min) : 0;
      } else {
        currentValue = Number(this.value);
      }

      const newValue = this.clampValueByLimit(currentValue + 1, 'increment');
      if (newValue !== null && newValue !== Number(this.value)) {
        this.value = newValue;
        this.tkChange.emit(newValue);
      }
    }
  }

  private handleChipsRemove(index: number) {
    const chipsArr = [...(this.value as any[])];

    if (index >= 0 && index < chipsArr.length) {
      chipsArr.splice(index, 1);
      this.value = chipsArr;
      this.tkChange.emit(chipsArr);
    }
  }

  private handleClearButtonClick(e) {
    e.stopPropagation();
    this.handleFormReset();
    this.tkClearClick.emit();
  }

  private handleClearButtonKeyDown = (e: KeyboardEvent) => {
    // Make clear button accessible via Space and Enter keys
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      this.handleFormReset();
      this.tkClearClick.emit();
    }
  };

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
        const itemChipOptions = this.chipOptions || {};
        let isRemovable;
        if (this.chipDisabled?.(item) || this.disabled || this.readonly) {
          isRemovable = false;
        } else if (typeof item === 'object' && item !== null && item.hasOwnProperty('removable')) {
          isRemovable = item.removable;
        } else {
          isRemovable = true;
        }
        const baseProps = {
          ...itemChipOptions,
          removable: isRemovable,
          key: index,
          autoSelfDestroy: false,
          value: item,
          variant: (itemChipOptions.variant ?? 'neutral') as IChipOptions['variant'],
          type: (itemChipOptions.type ?? 'outlined') as IChipOptions['type'],
          size: (itemChipOptions.size ?? 'small') as IChipOptions['size'],
          disabled: this.disabled || this.readonly,
        };
        const label =
          typeof item === 'object' && item !== null && item.__isOthersIndicator ? item.label : typeof item === 'object' ? getNestedValue(item, this.chipLabelKey) : String(item);

        return <tk-chips label={label} onTk-remove={() => this.handleChipsRemove(index)} {...baseProps}></tk-chips>;
      });
    }
  }

  private renderInput(): HTMLInputElement {
    return (
      <input
        id={this.uniqueId}
        ref={el => (this.nativeInput = el)}
        disabled={this.disabled}
        autoComplete="off"
        type={this.inputType}
        name={this.name}
        min={this.min}
        max={this.max}
        step={this.step}
        placeholder={this.placeholder || ''}
        readOnly={this.readOnly || !this.editable}
        tabindex={this.tabindex}
        value={this.mode === 'chips' ? undefined : typeof this.value === 'object' && this.value !== null ? getNestedValue(this.value, this.chipLabelKey) : this.value}
        onInput={this.handleInput}
        onBlur={this.handleInputBlur}
        onFocus={this.handleInputFocus}
        onKeyDown={this.handleInputKeyDown}
        onKeyUp={this.handleInputKeyUp}
      />
    );
  }

  private renderHint(): HTMLSpanElement {
    let hint;
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
        <span class="hint error">
          {hintIcon}
          {this.error}
        </span>
      );
    }
    return hint;
  }

  private renderLabel(): HTMLLabelElement {
    let label;
    if (this.label?.length > 0) {
      const asterisk = <span class="asterisk">*</span>;
      label = (
        <label htmlFor={this.uniqueId} class="label">
          {this.label}
          {this.showAsterisk ? asterisk : ''}
        </label>
      );
    }
    return label;
  }

  private renderAlignmentButtons() {
    let leftButton: HTMLTkButtonElement;
    let rightButton: HTMLTkButtonElement;
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
    return { left: leftButton, right: rightButton };
  }

  private renderPasswordIcons() {
    let passwordLeftIcon: HTMLTkIconElement;
    let passwordRightIcon: HTMLTkIconElement;

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
    }
    return { left: passwordLeftIcon, right: passwordRightIcon };
  }

  render() {
    let _leftIcon: HTMLTkIconElement;
    let _rightIcon: HTMLTkIconElement;
    let safetyStatus: HTMLElement;

    if (this.showSafetyStatus) {
      safetyStatus = <div class="safety-status">{this.renderStrengthLines()}</div>;
    }

    const rootClasses = classNames('tk-input-container', this.size, { focus: this.hasFocus, counter: this.isCounter, chips: this.mode == 'chips' });
    const prefixClass = classNames('tk-input-prefix-container', this.size);

    // Handle icon rendering using utility function
    if (this.icon && !this.isCounter) {
      const { leftIcon, rightIcon } = renderIcons(this.icon, {}, this.iconPosition);
      _leftIcon = leftIcon;
      _rightIcon = rightIcon;
    }

    const showClearButton = this.clearable && !this.readonly && ((this.mode !== 'chips' && this.value) || (this.mode === 'chips' && (this.value as [])?.length > 0));

    if (this.el.classList.contains('tk-select-input')) {
      this.readOnly = this.el.classList.contains('readonly-select');
      // readOnly hides clear button and makes input readOnly(disables input), editable only impacts input readOnly
      this.editable = this.el.classList.contains('editable-select');
    } else {
      this.readOnly = this.readonly;
    }

    return (
      <div aria-readonly={this.readonly} aria-disabled={this.disabled} aria-invalid={this.invalid} class={rootClasses}>
        {this.renderLabel()}
        <div class="tk-input">
          {this.renderChips()}
          {!_leftIcon && this.renderPasswordIcons().left}
          {_leftIcon}
          {this.renderAlignmentButtons().left}
          {this.pre && (
            <div class={prefixClass}>
              <span class="tk-input-prefix-text">{this.pre}</span>
              <span class="tk-input-divider"></span>
            </div>
          )}
          {this.renderInput()}
          {this.loading && <tk-spinner size="xxsmall"></tk-spinner>}
          {showClearButton && (
            <tk-button
              variant="neutral"
              type="text"
              icon="close"
              size="small"
              onTk-click={e => this.handleClearButtonClick(e)}
              onKeyDown={this.handleClearButtonKeyDown}
              class="tk-input-clear-button"
              disabled={this.disabled}
            ></tk-button>
          )}
          {_rightIcon}
          {!_rightIcon && this.renderPasswordIcons().right}
          {this.renderAlignmentButtons().right}
        </div>
        {safetyStatus}
        {this.renderHint()}
      </div>
    );
  }
}
