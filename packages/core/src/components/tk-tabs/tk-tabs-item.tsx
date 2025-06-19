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
  @Watch('icon')
  iconChanged() {
    this.emitUpdate();
  }

  /**
   * Label for the tab item.
   */
  @Prop() label: string;
  @Watch('label')
  labelChanged() {
    this.emitUpdate();
  }

  /**
   * Whether the tab item is disabled.
   */
  @Prop() disabled: boolean;
  @Watch('disabled')
  disabledChanged() {
    this.emitUpdate();
  }

  /**
   * Checks if tab item has badge component or not.
   * @defaultValue false
   */
  @Prop() badged?: boolean = false;
  @Watch('badged')
  badgedChanged() {
    this.emitUpdate();
  }

  /**
   * Sets badge component's label.
   * @deprecated since version 0.0.40. Use 'badgeCount' instead.
   */
  @Prop() badgeLabel?: string;
  @Watch('badgeLabel')
  badgeLabelChanged() {
    this.emitUpdate();
  }

  /**
   * Sets badge component's count.
   */
  @Prop() badgeCount?: number | string;
  @Watch('badgeCount')
  badgeCountChanged() {
    this.emitUpdate();
  }

  /**
   * Sets tooltip options for the tab item.
   */
  @Prop() tooltipOptions?: ITooltipOptions;
  @Watch('tooltipOptions')
  tooltipOptionsChanged() {
    this.emitUpdate();
  }

  // Dispatch a custom event that the parent component can listen for
  private emitUpdate() {
    this.el.dispatchEvent(
      new CustomEvent('tk-update', {
        bubbles: true,
        composed: true,
        detail: {
          label: this.label,
          icon: this.icon,
          disabled: this.disabled,
          badged: this.badged,
          badgeCount: this.badgeCount,
          badgeLabel: this.badgeLabel,
          tooltipOptions: this.tooltipOptions,
        },
      }),
    );
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
