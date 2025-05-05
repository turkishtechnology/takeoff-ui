import { Component, ComponentInterface, Element, Prop, State, Watch, Event, EventEmitter, h, AttachInternals } from '@stencil/core';
import classNames from 'classnames';

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
    this.tkChange.emit(this.value);
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
   * Emitted when the value has changed.
   */
  @Event({ eventName: 'tk-change' }) tkChange!: EventEmitter<any>;

  componentWillLoad() {
    this.slottedItems = this.el.querySelectorAll('tk-radio');
    if (this.slottedItems.length > 0) {
      this.slottedItems.forEach(item => {
        item.addEventListener('tk-change', this.onChangeHandle.bind(this));
        item.checked = this.value == item.value;
        item.invalid = this.invalid;
      });
    }
  }

  formResetCallback() {
    this.value = null;
    this.updateTkRadio();
  }

  private updateTkRadio() {
    if (this.slottedItems.length > 0) {
      this.slottedItems.forEach(item => {
        item.checked = this.value == item.value;
      });
    }
  }

  private onChangeHandle(e) {
    this.value = e.detail;
    this.updateTkRadio();
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
      <div class={rootClasses}>
        {_label}
        <div class={classNames('tk-radio-holder', this.type, { spread: this.spread })}>{this.slottedItems.length > 0 ? <slot /> : ''}</div>
      </div>
    );
  }
}
