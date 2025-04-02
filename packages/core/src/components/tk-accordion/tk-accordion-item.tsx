import { Component, ComponentInterface, Prop, h, Element, State, Host } from '@stencil/core';
import classNames from 'classnames';
import { IIconOptions } from '../../global/interfaces/IIconOptions';

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
  @Prop() icon?: string | IIconOptions;

  componentWillLoad(): void {
    this.parentEl = this.el.closest('tk-accordion');

    if (this.parentEl) {
      this.type = this.parentEl.type as 'grouped' | 'divided';
      this.arrowPosition = this.parentEl.arrowPosition as 'left' | 'right';
      this.expandIcon = this.parentEl.expandIcon;
      this.collapseIcon = this.parentEl.collapseIcon;
      this.hideArrows = this.parentEl.hideArrows;
    }
    this.hasHeaderSlot = !!this.el.querySelector('[slot="header"]');
  }

  private createIcon() {
    if (this.hideArrows) return null;
    let _icon!: HTMLSpanElement;
    let _renderIcon: string | IIconOptions;

    if (this.active) {
      _renderIcon = this.collapseIcon;
    } else {
      _renderIcon = this.expandIcon;
    }

    if (typeof _renderIcon == 'string') {
      _icon = <span class={`material-symbols-outlined ${this.active && 'tk-accordion-item-icon-collapse'}`}>{_renderIcon}</span>;
    } else if (typeof _renderIcon == 'object') {
      _icon = (
        <span class={`material-symbols-${_renderIcon?.style || 'outlined'} ${_renderIcon?.fill && 'fill'}`} style={{ color: _renderIcon?.color || 'inherit' }}>
          {_renderIcon?.name}
        </span>
      );
    }

    return <span class="icon">{_icon}</span>;
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

    let icon;
    if (this.icon) {
      if (typeof this.icon == 'string') {
        icon = <span class="material-symbols-outlined tk-accordion-item-icon">{this.icon}</span>;
      } else {
        icon = (
          <span
            class={`material-symbols-${this.icon?.style || 'outlined'} ${this.icon?.fill ? 'fill' : ''} tk-accordion-item-icon`}
            style={{ color: this.icon?.color || 'inherit' }}
          >
            {this.icon.name}
          </span>
        );
      }
    }

    return (
      <Host>
        <div class={rootClasses}>
          <div class="header" onClick={this.toggleItem}>
            {this.arrowPosition === 'left' && this.createIcon()}
            {icon}
            <span class="title">{this.createHeader()}</span>
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
