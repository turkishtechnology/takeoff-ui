import { Component, Prop, h, ComponentInterface, Element } from '@stencil/core';
import classNames from 'classnames';
import { IIconOptions } from '../../global/interfaces/IIconOptions';

/**
 * The TkAlert component is designed to display contextual feedback messages, such as success, warnings, informational notices, and errors.
 * @slot right-action - Custom actions template to right content.
 * @slot footer-action - Custom actions template to default footer.
 * @react `import { TkAlert } from '@takeoff-ui/react'`
 * @vue `import { TkAlert } from '@takeoff-ui/vue'`
 * @angular `import { TkAlert } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-alert',
  styleUrl: 'tk-alert.scss',
})
export class TkAlert implements ComponentInterface {
  private hasRightActionSlot: boolean = false;
  private hasFooterActionSlot: boolean = false;

  @Element() el: HTMLTkAlertElement;

  /**
   * Defines the visual variant of the alert.
   * @defaultValue 'neutral'
   */
  @Prop() variant: 'success' | 'warning' | 'info' | 'danger' | 'neutral' = 'neutral';

  /**
   * The header text displayed at the top of the alert.
   */
  @Prop() header: string;

  /**
   * The message text displayed within the alert.
   */
  @Prop() message: string | string[];

  /**
   * The icon displayed in the alert. If not provided, a default icon is used based on the variant.
   */
  @Prop({ mutable: true }) icon: string | IIconOptions;

  /**
   * Size of the icon displayed in the alert ('small', 'base', or 'large').
   * @defaultValue 'base'
   */
  @Prop() iconSize: 'small' | 'base' | 'large' = 'base';

  /**
   * This field specifies the design type of the component.
   * @defaultValue filled
   */
  @Prop() type: 'filled' | 'filledlight' | 'outlined' | 'gradient' = 'filled';

  /**
   * The alert can be closed by the user.
   * @defaultValue false
   */
  @Prop() removable: boolean = false;

  private handleCloseButtonClick() {
    this.el.remove();
  }

  private renderIcon() {
    const iconClasses = classNames('icon', this.iconSize);

    if (this.icon == undefined) {
      if (this.variant == 'success') this.icon = 'check_circle';
      else if (this.variant == 'info') this.icon = 'info';
      else if (this.variant == 'danger') this.icon = 'error';
      else if (this.variant == 'warning') this.icon = 'warning';
    }

    let icon;
    if (this.icon) {
      if (typeof this.icon == 'string') {
        icon = <i class="material-symbols-rounded fill">{this.icon}</i>;
      } else {
        icon = (
          <i class={`material-symbols-${this.icon?.style || 'rounded'} ${this.icon?.fill ? 'fill' : ''}`} style={{ color: this.icon?.color || 'inherit' }}>
            {this.icon.name}
          </i>
        );
      }
    }

    return <div class={iconClasses}>{icon}</div>;
  }

  private renderContent() {
    let header, message;

    if (this.header?.length > 0) {
      header = <div class="tk-alert-header">{this.header}</div>;
    }

    if (typeof this.message == 'string') {
      message = <div class="tk-alert-message">{this.message}</div>;
    } else if (this.message?.every(item => typeof item === 'string')) {
      message = <div class="tk-alert-message-holder">{this.message?.map(m => <div class="tk-alert-message">{m}</div>)}</div>;
    }

    return (
      <div class={classNames('tk-alert-content')}>
        <div>
          {header}
          {message}
        </div>
        {this.hasFooterActionSlot && <slot name="footer-action"></slot>}
      </div>
    );
  }

  private renderClose() {
    if (!this.removable) return null;

    const buttonVariant = this.type == 'filled' ? 'white' : 'neutral';

    return <tk-button icon="close" size="small" variant={buttonVariant} type="text" onTk-click={() => this.handleCloseButtonClick()}></tk-button>;
  }

  render() {
    this.hasRightActionSlot = !!this.el.querySelector('[slot="right-action"]');
    this.hasFooterActionSlot = !!this.el.querySelector('[slot="footer-action"]');

    const rootClasses = classNames('tk-alert-container', this.variant, this.type);

    return (
      <div class={rootClasses}>
        {this.renderIcon()}
        {this.renderContent()}
        {this.hasRightActionSlot && <slot name="right-action"></slot>}
        {this.renderClose()}
      </div>
    );
  }
}
