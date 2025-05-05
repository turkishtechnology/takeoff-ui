import { AttachInternals, Component, ComponentInterface, Element, Event, EventEmitter, Method, Prop, State, Watch, h } from '@stencil/core';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

/**
 * The TkTextarea component enables multi-line text input with customizable size, validation, and styling options.
 * @react `import { TkTextarea } from '@takeoff-ui/react'`
 * @vue `import { TkTextarea } from '@takeoff-ui/vue'`
 * @angular `import { TkTextarea } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-textarea',
  styleUrl: 'tk-textarea.scss',
  shadow: true,
  formAssociated: true,
})
export class TkTextarea implements ComponentInterface {
  private nativeInput?: HTMLTextAreaElement;
  private tabindex?: string | number;
  private uniqueId = uuidv4();

  @Element() el!: HTMLTkTextareaElement;

  @AttachInternals() internals: ElementInternals;

  @State() hasFocus = false;
  @State() passwordStrength: number = 0;
  @State() charCount: number = 0;

  /**
   * If `true`, the user cannot interact with the input.
   */
  @Prop() disabled = false;

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
   * Provided a hint or additional information about the input.
   */
  @Prop() hint: string;

  /**
   * Defines the label for the element.
   */
  @Prop() label: string;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string;

  /**
   * Placeholder text displayed when the input is empty.
   */
  @Prop() placeholder?: string | null;

  /**
   * Represents the rows value of the component
   * @defaultValue 3
   */
  @Prop() rows = 3;

  /**
   * If `true`, the user cannot modify the value.
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
   * Limits the number of characters.
   */
  @Prop() maxLength?: number;
  /**
   * The value of the input.
   */
  @Prop({ mutable: true }) value?: string | number | null = '';

  /**
   * Update the native input element when the value changes
   */
  @Watch('value')
  protected valueChanged() {
    this.tkChange.emit(this.value);
    this.updateCharCount();
  }

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event({ eventName: 'tk-input' }) tkInput!: EventEmitter<KeyboardEvent>;

  /**
   * Emitted when the value has changed.
   */
  @Event({ eventName: 'tk-change' }) tkChange!: EventEmitter<string | number | undefined | null>;

  /**
   * Emitted when the input loses focus.
   */
  @Event({ eventName: 'tk-blur' }) tkBlur!: EventEmitter<void>;

  /**
   * Emitted when the input has focus.
   */
  @Event({ eventName: 'tk-focus' }) tkFocus!: EventEmitter<void>;

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
    this.nativeInput = this.el.shadowRoot.querySelector('textarea');
  }

  formResetCallback() {
    this.value = null;
    this.nativeInput.value = null;
  }

  /**
   * Sets focus on the specified `tk-input`. Use this method instead of the global
   * `input.focus()`.
   */
  @Method()
  async setFocus() {
    this.nativeInput?.focus();
  }

  private updateCharCount = () => {
    if (this.maxLength) {
      this.charCount = this.value.toString().trim().length;
    }
  };

  private handleInput = (ev: Event) => {
    const input = ev.target as HTMLTextAreaElement | null;

    this.value = input?.value || '';
    this.tkInput.emit(ev as KeyboardEvent);
  };

  private handleBlur = () => {
    this.hasFocus = false;
    this.tkBlur.emit();
  };

  private handleFocus = () => {
    this.hasFocus = true;

    this.tkFocus.emit();
  };

  private renderLabel(): HTMLLabelElement {
    let label: HTMLLabelElement;

    if (this.label?.length > 0) {
      const asterisk = <span class="asterisk">*</span>;
      label = (
        <label class="label">
          {this.label}
          {this.showAsterisk ? asterisk : ''}
        </label>
      );
    }
    return label;
  }

  private renderHintError(): HTMLSpanElement {
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
        <span class="hint error">
          <i class="material-symbols-outlined">info</i>
          {this.error}
        </span>
      );
    }
    return hint;
  }

  render() {
    const rootClasses = classNames('tk-textarea-container', this.size, { focus: this.hasFocus });

    let counter: HTMLSpanElement;
    const counterClasses = classNames('counter', this.charCount == this.maxLength && 'maxed');
    if (this.maxLength) {
      counter = (
        <span class={counterClasses}>
          {this.charCount}/{this.maxLength}
        </span>
      );
    }

    return (
      <div aria-readonly={this.readonly} aria-disabled={this.disabled} aria-invalid={this.invalid} class={rootClasses}>
        {this.renderLabel()}
        <label class="tk-textarea" htmlFor={this.uniqueId}>
          <textarea
            id={this.uniqueId}
            ref={el => (this.nativeInput = el)}
            disabled={this.disabled}
            autoComplete="off"
            name={this.name}
            rows={this.rows}
            maxLength={this.maxLength}
            placeholder={this.placeholder || ''}
            readOnly={this.readonly}
            tabindex={this.tabindex}
            onInput={this.handleInput}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
          >
            {this.value}
          </textarea>
          {counter}
        </label>
        {this.renderHintError()}
      </div>
    );
  }
}
