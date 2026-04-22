import { Component, Prop, h, ComponentInterface, Element, Fragment } from '@stencil/core';
import classNames from 'classnames';
import { IIconOptions, IMultiIconOptions } from '../../global/interfaces/IIconOptions';
import { renderIcons } from '../../utils/icon-utils';
import { CSSStyleProperties } from '../../global/types';
import { getDataTestidAttribute } from '../../utils/test-id-utils';

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
  shadow: true,
})
export class TkAlert implements ComponentInterface {
  private hasRightActionSlot: boolean = false;
  private hasFooterActionSlot: boolean = false;
  private hasContentSlot: boolean = false;

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
  @Prop() icon: string | IIconOptions | IMultiIconOptions;

  /**
   * Size of the icon displayed in the alert ('small', 'base', or 'large').
   * @defaultValue 'base'
   */
  @Prop() iconSize: 'small' | 'base' | 'large' | 'xlarge' = 'large';

  /**
   * Alignment of the alert content ('start', 'center', or 'end').
   * @defaultValue 'center'
   */
  @Prop() alignItems: 'start' | 'center' | 'end' = 'center';

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

  /**
   * The style attribute of container element
   */
  @Prop() containerStyle?: CSSStyleProperties = null;

  /**
   * Sets the data-testid attribute on the root container element.
   */
  @Prop({ reflect: true }) dataTestid?: string;

  private handleCloseButtonClick() {
    this.el.remove();
  }

  private createIcons() {
    let iconValue = this.icon;
    if (iconValue == undefined) {
      if (this.variant == 'success') iconValue = 'check_circle';
      else if (this.variant == 'info') iconValue = 'info';
      else if (this.variant == 'danger') iconValue = 'error';
      else if (this.variant == 'warning') iconValue = 'warning';
    }
    return renderIcons(iconValue, {
      variant: this.variant,
      sign: true,
      size: this.iconSize,
      iconStyle: 'rounded',
      fill: true,
      dataTestid: this.dataTestid,
      dataTestidComponent: 'alert',
    });
  }

  private renderContent() {
    let header, message;

    if (this.header?.length > 0) {
      header = (
        <div class="tk-alert-header" {...getDataTestidAttribute(this.dataTestid, 'alert', 'header')}>
          {this.header}
        </div>
      );
    }

    if (typeof this.message == 'string') {
      message = (
        <div class="tk-alert-message" {...getDataTestidAttribute(this.dataTestid, 'alert', 'message')}>
          {this.message}
        </div>
      );
    } else if (this.message?.every(item => typeof item === 'string')) {
      message = (
        <div class="tk-alert-message-holder" {...getDataTestidAttribute(this.dataTestid, 'alert', 'message-holder')}>
          {this.message?.map(m => (
            <div class="tk-alert-message" {...getDataTestidAttribute(this.dataTestid, 'alert', 'message')}>
              {m}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div class={classNames('tk-alert-content', !this.header && 'message-content')} {...getDataTestidAttribute(this.dataTestid, 'alert', 'content')}>
        <div>
          {header}
          {message}
        </div>
        {this.hasFooterActionSlot && <slot name="footer-action"></slot>}
      </div>
    );
  }

  private renderCloseButton() {
    if (!this.removable) return null;

    const buttonVariant = this.type == 'filled' ? 'white' : 'neutral';

    return (
      <tk-button
        icon="close"
        size="small"
        variant={buttonVariant}
        type="text"
        onTk-click={() => this.handleCloseButtonClick()}
        dataTestid={this.dataTestid ? `${this.dataTestid}-alert-close` : undefined}
      ></tk-button>
    );
  }

  render() {
    this.hasContentSlot = !!this.el.querySelector('[slot="content"]');
    this.hasRightActionSlot = !!this.el.querySelector('[slot="right-action"]');
    this.hasFooterActionSlot = !!this.el.querySelector('[slot="footer-action"]');

    const rootClasses = classNames('tk-alert-container', this.variant, this.type, `tk-alert-alignment-${this.alignItems}`);
    const content = this.renderContent();
    const closeButton = this.renderCloseButton();
    const icon = this.createIcons();

    return (
      <div class={rootClasses} style={this.containerStyle} {...getDataTestidAttribute(this.dataTestid, 'alert')}>
        {this.hasContentSlot ? (
          <slot name="content" />
        ) : (
          <Fragment>
            {icon.leftIcon}
            {content}
            {icon.rightIcon}
          </Fragment>
        )}
        {this.hasRightActionSlot && <slot name="right-action"></slot>}
        {closeButton}
      </div>
    );
  }
}
