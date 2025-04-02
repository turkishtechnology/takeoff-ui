import { AttachInternals, Component, ComponentInterface, Element, Event, EventEmitter, Method, Prop, State, Watch, h } from '@stencil/core';
import classNames from 'classnames';

/**
 * The TkToggle component is another basic element for user input. You can use this for turning settings, features or true/false inputs on and off.
 * @react `import { TkToggle } from '@takeoff-ui/react'`
 * @vue `import { TkToggle } from '@takeoff-ui/vue'`
 * @angular `import { TkToggle } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-toggle',
  styleUrl: 'tk-toggle.scss',
  formAssociated: true,
  shadow: true,
})
export class TkToggle implements ComponentInterface {
  private tabindex?: number;
  private nativeInput?: HTMLInputElement;

  @Element() el: HTMLTkToggleElement;
  @State() hasDefaultSlot: boolean;

  /**
   * The internal checked state of the toggle.
   * @defaultValue false
   */
  @State() checked: boolean = false;

  @AttachInternals() internals: ElementInternals;

  /**
   * The aria-labelledby attribute of the toggle.
   * @defaultValue null
   */
  @Prop() ariaLabelledby: string = null;

  /**
   * Whether the toggle is disabled.
   * @defaultValue false
   */
  @Prop() disabled: boolean = false;

  /**
   * Specifies a material icon name to be displayed.
   * @defaultValue check
   */
  @Prop() icon: string = 'check';

  /**
   * The ID of the input element.
   * @defaultValue ''
   */
  @Prop() inputId: string = '';

  /**
   * The name attribute of the toggle.
   * @defaultValue null
   */
  @Prop() name: string = null;

  /**
   * The label for the toggle.
   */
  @Prop() label?: string;

  /**
   * Whether to show the icon in the toggle.
   * @defaultValue true
   */
  @Prop() showIcon: boolean = true;

  /**
   * Sets size for the component.
   * @defaultValue base
   */
  @Prop() size: 'xlarge' | 'large' | 'base' | 'small' | 'xsmall' = 'base';

  /**
   * The type of the toggle.
   * @defaultValue info
   */
  @Prop() variant: 'info' | 'success' = 'info';

  /**
   * Whether the toggle is in an invalid state.
   * @defaultValue false
   */
  @Prop() invalid: boolean = false;

  /**
   * The current state of the toggle.
   * @defaultValue false
   */
  @Prop({ reflect: true, mutable: true }) value: boolean = false;
  @Watch('value')
  valueChanged(newValue: boolean, oldValue: boolean) {
    if (newValue !== oldValue) {
      this.checked = newValue;
    }
  }

  /**
   * Event emitted when the toggle value changes.
   * @event onChange
   */
  @Event({ eventName: 'tk-change' }) tkChange: EventEmitter<boolean>;

  componentWillLoad() {
    this.checked = this.value;

    // If the tk-toggle has a tabindex attribute we get the value
    // and pass it down to the native input, then remove it from the
    // tk-toggle to avoid causing tabbing twice on the same element
    if (this.el.hasAttribute('tabindex')) {
      const tabindex = Number(this.el.getAttribute('tabindex'));
      this.tabindex = tabindex !== null ? tabindex : undefined;
      this.el.removeAttribute('tabindex');
    }

    this.hasDefaultSlot = Array.from(this.el.childNodes).some(
      node => (node.nodeType === Node.ELEMENT_NODE && !(node as HTMLElement).hasAttribute('slot')) || (node.nodeType === Node.TEXT_NODE && node.textContent?.trim().length > 0),
    );
  }

  formResetCallback() {
    this.value = false;
    this.checked = false;
    this.invalid = false;
  }

  /**
   * Returns the native `<input>` element used under the hood.
   */
  @Method()
  getInputElement(): Promise<HTMLInputElement> {
    return Promise.resolve(this.nativeInput);
  }

  private handleChange = (event: Event) => {
    if (!this.disabled) {
      const target = event.target as HTMLInputElement;
      this.value = target.checked;
      this.checked = target.checked;
      this.tkChange.emit(this.checked);
    }
  };

  render() {
    const rootClasses = classNames('tk-toggle', `tk-toggle-${this.size}`, `tk-toggle-${this.variant}`, {
      'tk-toggle-disabled': this.disabled,
      'tk-toggle-invalid': this.invalid,
    });

    return (
      <div class={rootClasses}>
        <label htmlFor={this.inputId}>
          <div class="tk-toggle-input-container">
            <input
              id={this.inputId}
              ref={input => (this.nativeInput = input)}
              class="tk-toggle-input"
              type="checkbox"
              role="switch"
              disabled={this.disabled}
              checked={this.checked}
              onChange={this.handleChange}
              tabIndex={this.tabindex}
              aria-checked={this.checked.toString()}
              aria-disabled={this.disabled}
              aria-invalid={this.invalid || undefined}
              aria-label={this.name}
              aria-labelledby={this.ariaLabelledby}
            />
            <span class="tk-toggle-thumb">{this.showIcon && <span class="material-symbols-outlined tk-toggle-thumb-icon">{this.icon}</span>}</span>
          </div>
          {this.hasDefaultSlot ? <slot></slot> : this.label && <span class="tk-toggle-label">{this.label}</span>}
        </label>
      </div>
    );
  }
}
