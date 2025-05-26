import { Component, ComponentInterface, Element, Prop, State, Watch, Event, EventEmitter, h } from '@stencil/core';
import classNames from 'classnames';

declare global {
  interface HTMLTkToggleButtonElement extends HTMLElement {
    position?: 'first' | 'middle' | 'last' | 'only';
  }
}

/**
 * TkToggleButtonGroup is a segmented/compact toggle button group.
 * Always renders in compact/segmented mode.
 */
@Component({
  tag: 'tk-toggle-button-group',
  styleUrl: 'tk-toggle-button-group.scss',
  shadow: true,
})
export class TkToggleButtonGroup implements ComponentInterface {
  @Element() el: HTMLTkToggleButtonGroupElement;
  @State() slottedItems: NodeListOf<HTMLTkToggleButtonElement>;

  @Prop() type: 'basic' | 'divided' | 'light' = 'basic';
  /**
   * The value of the rounded toggle button group.
   */
  @Prop() rounded: boolean = false;
  /**
   * The value of the selected toggle button.
   */
  @Prop({ mutable: true }) value?: any;
  @Watch('value')
  valueChanged() {
    this.updateSelected();
    this.tkChange.emit(this.value);
  }

  /**
   * The direction of the toggle button group.
   */
  @Prop() direction: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Emitted when the selected value changes.
   */
  @Event({ eventName: 'tk-change' }) tkChange!: EventEmitter<any>;

  componentWillLoad() {
    this.updateSlottedItems();
  }
  // gerek olmayabilir!
  private updateSlottedItems() {
    this.slottedItems = this.el.querySelectorAll('tk-toggle-button');
    this.updateSelected();

    // Only set position prop on children
    this.slottedItems.forEach((item, idx, arr) => {
      if (arr.length === 1) {
        item.position = 'only';
      } else if (idx === 0) {
        item.position = 'first';
      } else if (idx === arr.length - 1) {
        item.position = 'last';
      } else {
        item.position = 'middle';
      }
      item.addEventListener('tk-toggle', this.handleToggle.bind(this));
    });
  }

  private updateSelected() {
    if (this.slottedItems?.length > 0) {
      this.slottedItems.forEach(item => {
        item.selected = this.value == item.value;
      });
    }
  }

  private handleToggle(e) {
    const { value } = e.detail;
    this.value = value;
    this.updateSelected();
  }

  render() {
    const groupClasses = classNames('tk-toggle-button-group', this.type, {
      rounded: this.rounded,
      vertical: this.direction === 'vertical',
      horizontal: this.direction === 'horizontal',
    });

    return (
      <div class={groupClasses}>
        <slot onSlotchange={() => this.updateSlottedItems()}></slot>
      </div>
    );
  }
}
