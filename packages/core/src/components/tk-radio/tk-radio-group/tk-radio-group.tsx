import { Component, ComponentInterface, Element, Prop, State, Watch, Event, EventEmitter, h, AttachInternals } from '@stencil/core';
import classNames from 'classnames';
import { getIconElementProps } from '../../../utils/icon-utils';

@Component({
  tag: 'tk-radio-group',
  styleUrl: 'tk-radio-group.scss',
  formAssociated: true,
})
export class TkRadioGroup implements ComponentInterface {
  @Element() el: HTMLTkRadioGroupElement;

  @State() slottedItems: NodeListOf<HTMLTkRadioElement>;

  @AttachInternals() internals: ElementInternals;

  /**
   * Defines the label for the element.
   */
  @Prop() label: string;

  /**
   * The direction of the radio buttons.
   */
  @Prop() direction: 'vertical' | 'horizontal' = 'horizontal';

  /**
   * Indicates whether the input is in an invalid state
   * @defaultValue false
   */
  @Prop() invalid: boolean = false;

  @Watch('invalid')
  protected invalidChanged() {
    if (this.slottedItems?.length > 0) {
      this.slottedItems.forEach(item => {
        item.invalid = this.invalid;
      });
    }
  }
  /**
   * Determines the position of the radio group and label.
   */
  @Prop() position: 'left' | 'right' = 'left';

  /**
   * The value of the input.
   */
  @Prop({ mutable: true }) value?: any;

  /**
   * Watches for changes in the selected value and emits a custom event when the value changes.
   */
  @Watch('value')
  protected valueChanged() {
    this.updateTkRadio();
  }

  /**
   * Displays a red asterisk (*) next to the label for visual emphasis.
   */
  @Prop() showAsterisk: boolean = false;

  /**
   * Determines whether the radios will spread evenly across the horizontal space.
   */
  @Prop() spread: boolean = false;

  /**
   * Determines the appearance types of radios.
   */
  @Prop() type: 'default' | 'card' = 'default';

  /**
   * This is the error message that will be displayed.
   */
  @Prop() error: string;

  /**
   * Emitted when the value has changed.
   */
  @Event({ eventName: 'tk-change' }) tkChange!: EventEmitter<any>;

  componentWillLoad() {
    this.slottedItems = this.el.querySelectorAll('tk-radio');
    if (this.slottedItems.length > 0) {
      this.slottedItems.forEach(item => {
        item.addEventListener('tk-change', e => {
          e.stopPropagation();
          this.handleChange(e);
        });
        item.checked = this.value == item.value;
        item.invalid = this.invalid;
      });
    }
  }

  formResetCallback() {
    this.handleFormReset();
  }

  private updateTkRadio() {
    if (this.slottedItems.length > 0) {
      this.slottedItems.forEach(item => {
        item.checked = this.value == item.value;
      });
    }
  }

  private handleFormReset() {
    this.value = null;
    this.tkChange.emit(this.value);
    this.updateTkRadio();
  }

  private handleChange(e) {
    this.value = e.detail;
    this.tkChange.emit(this.value);
    this.updateTkRadio();
  }

  private renderError() {
    let error;
    if (this.error?.length > 0) {
      const hintIcon = <tk-icon {...getIconElementProps('info')} />;

      error = (
        <span class="hint">
          {hintIcon}
          {this.error}
        </span>
      );
    }
    return error;
  }

  render() {
    let _label: HTMLLabelElement;

    const rootClasses = classNames('tk-radio-group-container', {
      vertical: this.direction === 'vertical',
    });

    if (this.label?.length > 0) {
      const asterisk = <span class="asterisk">*</span>;
      _label = (
        <label class="label">
          {this.label}
          {this.showAsterisk && asterisk}
        </label>
      );
    }

    return (
      <div class={rootClasses} aria-invalid={this.invalid}>
        {_label}
        <div class={classNames('tk-radio-holder', this.type, { spread: this.spread })}>{this.slottedItems.length > 0 ? <slot /> : ''}</div>
        {this.error && this.renderError()}
      </div>
    );
  }
}
