import { Element, Component, Prop, Host, ComponentInterface, Watch } from '@stencil/core';
import { IIconOptions, IMultiIconOptions } from '../../global/interfaces/IIconOptions';
import { ITooltipOptions } from '../../global/interfaces/ITooltipOptions';
import { IBadgeOptions } from '../../global/interfaces/IBadgeOptions';

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
  @Prop() icon?: string | IIconOptions | IMultiIconOptions;
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
   * Sets badge component's options.
   */
  @Prop() badgeOptions?: IBadgeOptions;
  @Watch('badgeOptions')
  badgeOptionsChanged() {
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
          badgeOptions: this.badgeOptions,
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
