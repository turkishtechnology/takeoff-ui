import { Component, h, Prop, Element, Event, ComponentInterface, EventEmitter, AttachInternals, Host } from '@stencil/core';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

/**
 * The TkRadio component is another basic element for user input. You can use this to supply a way for the user to pick an option from multiple choices.
 * @react `import { TkRadio } from '@takeoff-ui/react'`
 * @vue `import { TkRadio } from '@takeoff-ui/vue'`
 * @angular `import { TkRadio } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-radio',
  styleUrl: 'tk-radio.scss',
  formAssociated: true,
})
export class TkRadio implements ComponentInterface {
  @Element() el: HTMLTkRadioElement;

  @AttachInternals() internals: ElementInternals;
  private parentEl: HTMLTkRadioGroupElement;
  private uniqueId: string;
  private windowClickHandler: (event: MouseEvent) => void;

  constructor() {
    this.uniqueId = uuidv4();
    // radio group ile birlikte kullanımlarda diğer radio ya tıklandığı durumda kendini false yapmaya ihtiyaç olmadığı için bu işlemi radio group tarafında yapıldığı için outside click eventi atanmasına gerek yoktur.
    if (!this.el.closest('tk-radio-group')) {
      this.windowClickHandler = this.handleWindowClick.bind(this);
    }
  }

  /**
   * Disables the radio button if true.
   * @defaultValue false
   */
  @Prop() disabled: boolean = false;

  /**
   * The description sub text displayed.
   */
  @Prop() description: string;

  /**
   * Indicates whether the input is in an invalid state
   * @defaultValue false
   */
  @Prop() invalid: boolean = false;

  /**
   * Defines the label for the element.
   */
  @Prop() label: string;

  /**
   * Determines the position of the radio and label.
   */
  @Prop() position?: 'left' | 'right';

  /**
   * Marks the radio button as checked or unchecked.
   * @defaultValue false
   */
  @Prop({ mutable: true }) checked: boolean = false;

  /**
   * The name of the radio group, used to group radio buttons together.
   */
  @Prop({ reflect: true }) name: string;

  /**
   * The value of the radio button.
   */
  @Prop() value: any;

  /**
   * Emitted when the radio button's checked state changes.
   */
  @Event({ eventName: 'tk-change' }) tkChange: EventEmitter<any>;

  private handleChange() {
    if (!this.disabled) {
      this.checked = !this.checked;

      if (this.checked) {
        this.tkChange.emit(this.value);
      }
    }
  }
  componentWillLoad(): void {
    this.parentEl = this.el.closest('tk-radio-group');

    if (this.parentEl && !this.position) {
      this.position = this.parentEl.position;
    }
  }
  componentDidRender(): void {
    this.bindWindowClickListener();
  }

  disconnectedCallback() {
    this.unbindWindowClickListener();
  }

  private bindWindowClickListener() {
    window.addEventListener('click', this.windowClickHandler);
  }

  private unbindWindowClickListener() {
    window.removeEventListener('click', this.windowClickHandler);
  }

  private handleWindowClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLTkRadioElement;
    if (
      clickedElement?.getAttribute('name')?.length > 0 &&
      clickedElement?.getAttribute('name') == this.name &&
      clickedElement?.getAttribute('data-tk-radio-id')?.length > 0 &&
      clickedElement?.getAttribute('data-tk-radio-id') !== this.uniqueId
    ) {
      this.checked = false;
    }
  }

  render() {
    const rootClasses = classNames('tk-radio-container', {
      disabled: this.disabled,
    });

    return (
      <Host data-tk-radio-id={this.uniqueId}>
        <div class={rootClasses} aria-disabled={this.disabled} aria-invalid={this.invalid}>
          <label htmlFor={this.uniqueId} class={(classNames({ 'width-description': this.description }), this.position)}>
            <input id={this.uniqueId} type="radio" checked={this.checked} value={this.value} disabled={this.disabled} onChange={this.handleChange.bind(this)} name={this.name} />
            <div class="mask">
              <div></div>
            </div>
            <div class="tk-radio-text-holder">
              <div class="tk-radio-label">{this.label}</div>
              <div class="tk-radio-description">{this.description}</div>
            </div>
          </label>
        </div>
      </Host>
    );
  }
}
