import { Component, ComponentInterface, Prop, h, Element, State, Host, Event, type EventEmitter, Watch } from '@stencil/core';
import classNames from 'classnames';
import { IIconOptions, IMultiIconOptions } from '../../global/interfaces/IIconOptions';
import { renderIcons } from '../../utils/icon-utils';

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
  @State() mode: 'default' | 'compact' = 'default';

  /**
   * Sets if the accordion is active.
   * @defaultValue false
   */
  @Prop() active: boolean;
  @Watch('active')
  activeChanged(newValue: boolean, oldValue: boolean) {
    if (newValue !== oldValue) {
      this.tkActiveChange.emit(newValue);
    }
  }

  /**
   * Optional key for the accordion item.
   */
  @Prop({ attribute: 'item-key', reflect: true }) itemKey?: string | number;

  /**
   * Header text to display.
   */
  @Prop() header?: string;

  /**
   * Sets size for the component.
   * @defaultValue 'base'
   */
  @Prop() size: 'base' | 'large' = 'base';

  /**
   * Icon for accordion component.
   */
  @Prop() icon?: string | IIconOptions | IMultiIconOptions;

  /**
   * Emitted when an active index is changed
   */
  @Event({ eventName: 'tk-active-change' }) tkActiveChange: EventEmitter<boolean>;

  componentWillLoad(): void {
    this.parentEl = this.el.closest('tk-accordion');

    if (this.parentEl) {
      this.type = this.parentEl.type as 'grouped' | 'divided';
      this.arrowPosition = this.parentEl.arrowPosition as 'left' | 'right';
      this.expandIcon = this.parentEl.expandIcon;
      this.collapseIcon = this.parentEl.collapseIcon;
      this.hideArrows = this.parentEl.hideArrows;
      this.mode = this.parentEl.mode;
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

    return renderIcons(
      _renderIcon,
      { size: 'large', variant: null, additionalProps: { class: classNames({ 'tk-accordion-item-icon-collapse': this.active }) } },
      this.arrowPosition,
    );
  }

  private createHeader() {
    if (this.hasHeaderSlot) {
      return <slot name="header" />;
    }
    return this.header || '';
  }

  render() {
    const rootClasses = classNames('tk-accordion-item', this.size, this.type, this.mode, {
      open: this.active,
    });
    const collapseIcon = this.createIcon();
    const icon = renderIcons(this.icon, { sign: true, variant: 'neutral', additionalProps: { class: 'tk-accordion-item-icon' } });
    return (
      <Host>
        <div class={rootClasses}>
          <div class="header" onClick={() => this.tkActiveChange.emit(!this.active)}>
            {collapseIcon?.leftIcon}
            {icon.leftIcon}
            <span class="title">{this.createHeader()}</span>
            {icon.rightIcon}
            {collapseIcon?.rightIcon}
          </div>
          <div class={`content ${this.active ? 'open' : ''}`}>
            <slot name="content" />
          </div>
        </div>
      </Host>
    );
  }
}
