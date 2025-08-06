import { Component, ComponentInterface, Prop, h, Element, State, Host } from '@stencil/core';
import classNames from 'classnames';
import { IIconOptions, IMultiIconOptions } from '../../global/interfaces/IIconOptions';
import { getIconElementProps, isMultiIconOptions } from '../../utils/icon-props';

/**
 * @slot header - Custom header template that overrides the header prop if provided.
 * @slot content - Custom content template.
 */
@Component({
  tag: 'tk-accordion-item',
  styleUrl: 'tk-accordion-item.scss',
  shadow: true,
})
export class TkAccordionItem implements ComponentInterface {
  private parentEl!: HTMLTkAccordionElement;

  @Element() el: HTMLTkAccordionItemElement;

  @State() type: 'grouped' | 'divided' = 'grouped';
  @State() arrowPosition: 'left' | 'right' = 'right';
  @State() expandIcon: string | IIconOptions;
  @State() collapseIcon: string | IIconOptions;
  @State() hideArrows: boolean = false;
  @State() hasHeaderSlot = false;

  /**
   * Sets if the accordion is active.
   * @defaultValue false
   */
  @Prop() active: boolean = false;

  /**
   * Optional key for the accordion item.
   */
  @Prop({ attribute: 'item-key', reflect: true }) itemKey?: string;

  /**
   * Header text to display.
   */
  @Prop() header?: string;

  /**
   * Toggle's the accordion item.
   */
  @Prop() toggleItem: () => void;

  /**
   * Sets size for the component.
   * @defaultValue 'base'
   */
  @Prop() size: 'base' | 'large' = 'base';

  /**
   * Icon for accordion component.
   */
  @Prop() icon?: string | IIconOptions | IMultiIconOptions;

  componentWillLoad(): void {
    this.parentEl = this.el.closest('tk-accordion');

    if (this.parentEl) {
      this.type = this.parentEl.type as 'grouped' | 'divided';
      this.arrowPosition = this.parentEl.arrowPosition as 'left' | 'right';
      this.expandIcon = this.parentEl.expandIcon;
      this.collapseIcon = this.parentEl.collapseIcon;
      this.hideArrows = this.parentEl.hideArrows;
    }
    this.hasHeaderSlot = !!this.el.querySelector(':scope > [slot="header"]');
  }

  private createIcon() {
    if (this.hideArrows) return null;
    let _renderIcon: string | IIconOptions;

    if (this.active) {
      _renderIcon = this.collapseIcon;
    } else {
      _renderIcon = this.expandIcon;
    }

    const icon = (
      <tk-icon
        {...getIconElementProps(_renderIcon, { class: classNames({ 'tk-accordion-item-icon-collapse': this.active }), variant: null, size: 'large' }, 'outlined', 'span')}
      ></tk-icon>
    );

    return <span class="icon">{icon}</span>;
  }

  private createHeader() {
    if (this.hasHeaderSlot) {
      return <slot name="header" />;
    }
    return this.header || '';
  }

  render() {
    const rootClasses = classNames('tk-accordion-item', this.size, this.type, {
      open: this.active,
    });
    let _leftIcon: HTMLTkIconElement;
    let _rightIcon: HTMLTkIconElement;
    // Handle icon rendering based on format
    if (this.icon) {
      if (isMultiIconOptions(this.icon)) {
        const leftIconConfig = (this.icon as IMultiIconOptions).left;
        const rightIconConfig = (this.icon as IMultiIconOptions).right;
        if (leftIconConfig) {
          _leftIcon = <tk-icon {...getIconElementProps(leftIconConfig)} />;
        }
        if (rightIconConfig) {
          _rightIcon = <tk-icon {...getIconElementProps(rightIconConfig)} />;
        }
      }
    }
    return (
      <Host>
        <div class={rootClasses}>
          <div class="header" onClick={this.toggleItem}>
            {this.arrowPosition === 'left' && this.createIcon()}
            {_leftIcon}
            <span class="title">{this.createHeader()}</span>
            {_rightIcon}
            {this.arrowPosition === 'right' && this.createIcon()}
          </div>
          <div class={`content ${this.active ? 'open' : ''}`}>
            <slot name="content" />
          </div>
        </div>
      </Host>
    );
  }
}
