import { Element, Component, Prop, Host, h, ComponentInterface, Watch } from '@stencil/core';
import { IIconOptions } from '../../global/interfaces/IIconOptions';
import { ITooltipOptions } from '../../global/interfaces/ITooltipOptions';

@Component({
  tag: 'tk-tabs-item',
  styleUrl: 'tk-tabs-item.scss',
  shadow: true,
})
export class TkTabsItem implements ComponentInterface {
  @Element() el: HTMLTkTabsItemElement;

  /**
   * Icon for tabs item component.
   */
  @Prop() icon?: string | IIconOptions;

  /**
   * Label for the tab item.
   */
  @Prop() label: string;

  /**
   * Whether the tab item is disabled.
   */
  @Prop() disabled: boolean;

  /**
   * Checks if tab item has badge component or not.
   * @defaultValue false
   */
  @Prop() badged?: boolean = false;

  /**
   * Sets badge component's label.
   * @deprecated since version 0.0.40. Use 'badgeCount' instead.
   */
  @Prop() badgeLabel?: string;

  /**
   * Sets badge component's count.
   */
  @Prop() badgeCount?: number | string;
  @Watch('badgeCount')
  badgeCountChanged() {
    // Dispatch a custom event that the parent component can listen for
    this.el.dispatchEvent(
      new CustomEvent('badgeUpdated', {
        bubbles: true,
        composed: true,
        detail: {
          badgeCount: this.badgeCount,
        },
      }),
    );
  }
  @Prop() tooltipOptions?: ITooltipOptions;

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
