import { Component, Prop, h, Element, Watch, EventEmitter, Event, ComponentInterface, AttachInternals } from '@stencil/core';
import { v4 as uuidv4 } from 'uuid';

/**
 * The TkCheckbox component is another basic element for user input. You can use this to supply a way for the user to toggle an option.
 * @react `import { TkCheckbox } from '@takeoff-ui/react'`
 * @vue `import { TkCheckbox } from '@takeoff-ui/vue'`
 * @angular `import { TkCheckbox } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-checkbox',
  styleUrl: 'tk-checkbox.scss',
  formAssociated: true,
})
export class TkCheckbox implements ComponentInterface {
  private inputElement: HTMLInputElement;
  private uniqueId = uuidv4();

  @Element() el: HTMLTkCheckboxElement;

  @AttachInternals() internals: ElementInternals;

  /**
   * If true, the user cannot interact with the checkbox.
   */
  @Prop() disabled: boolean = false;

  /**
   * Indicates whether the input is in an invalid state
   * @defaultValue false
   */
  @Prop() invalid: boolean = false;

  /**
   * Defines the label for the checkbox.
   */
  @Prop() label: string;

  /**
   * Name of the checkbox
   */
  @Prop() name: string;

  /**
   * If true, the checkbox will be indeterminate.
   */
  @Prop({ mutable: true }) indeterminate: boolean = false;

  @Watch('indeterminate')
  indeterminateChanged(newValue: boolean, oldValue: boolean) {
    if (newValue !== oldValue) {
      this.inputElement.indeterminate = newValue; // update the checkbox's indeterminate property
      if (newValue) this.value = null;
    }
  }

  /**
   * Sets the checkbox value
   */
  @Prop({ mutable: true }) value: boolean = false;

  @Watch('value')
  valueChanged(newValue: boolean, oldValue: boolean) {
    if (newValue !== oldValue) {
      if (newValue !== null) {
        this.indeterminate = false;
      }
    }
  }

  /**
   * Emitted when the checkbox checked state changes.
   */
  @Event({ eventName: 'tk-change' }) tkChange: EventEmitter<boolean>;

  componentWillLoad() {
    if (this.indeterminate) this.value = null;
  }

  formResetCallback() {
    this.value = false;
    this.indeterminate = false;
    this.inputElement.checked = false;
    this.tkChange.emit(this.value);
  }

  private handleChange() {
    if (!this.disabled) {
      if (this.inputElement.indeterminate) {
        this.value = null;
        this.indeterminate = false;
      } else {
        this.value = this.inputElement.checked;
      }
      this.tkChange.emit(this.value);
    }
  }

  render() {
    return (
      <div class="tk-checkbox-container" aria-disabled={this.disabled} aria-invalid={this.invalid}>
        <label htmlFor={this.uniqueId}>
          <input
            id={this.uniqueId}
            type="checkbox"
            ref={el => (this.inputElement = el)}
            checked={this.value}
            indeterminate={this.indeterminate}
            disabled={this.disabled}
            onChange={this.handleChange.bind(this)}
            name={this.name}
          />
          <div class="mask">
            <i class="material-symbols-outlined">{this.indeterminate ? 'remove' : 'check'}</i>
          </div>
          {this.label}
        </label>
      </div>
    );
  }
}
