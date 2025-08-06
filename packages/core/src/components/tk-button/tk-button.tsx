import { Component, ComponentInterface, Element, Prop, h, Event, Host, EventEmitter } from '@stencil/core';
import classNames from 'classnames';
import { IIconOptions, IMultiIconOptions } from '../../global/interfaces/IIconOptions';
import { getIconElementProps, isMultiIconOptions } from '../../utils/icon-props';

/**
 * TkButton is an extension to standard input element with icons and theming.
 * @react `import { TkButton } from '@takeoff-ui/react'`
 * @vue `import { TkButton } from '@takeoff-ui/vue'`
 * @angular `import { TkButton } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-button',
  styleUrl: 'tk-button.scss',
  shadow: true,
})
export class TkButton implements ComponentInterface {
  @Element() el: HTMLTkButtonElement;

  /**
   * Disables the button, preventing user interaction.
   */
  @Prop() disabled: boolean;

  /**
   * Sets the button to full-width mode, making it span the container.
   */
  @Prop() fullWidth: boolean;

  /**
   * This field specifies the design type of the component.
   * @defaultValue filled
   */
  @Prop({ mutable: true }) type: 'filled' | 'elevated' | 'outlined' | 'text' = 'filled';

  /**
   * Specifies a material icon name to be displayed.
   */
  @Prop() icon?: string | IIconOptions | IMultiIconOptions;

  /**
   * Defines the position of the icon.
   * @defaultValue 'left'
   */
  @Prop() iconPosition: 'left' | 'right' = 'left';

  /**
   * Sets the URL the button should navigate to when clicked (for type="link" buttons).
   */
  @Prop() href: string;

  /**
   * Specifies where to open the linked document (for type="link" buttons).
   */
  @Prop() target: string;

  /**
   * Applies underline styling to the button (for type="link" buttons).
   */
  @Prop() underline: boolean;

  /**
   * Label text displayed inside the button.
   */
  @Prop() label: string = '';

  /**
   * Shows a loading icon inside the button.
   */
  @Prop() loading: boolean;

  /**
   * Makes the button round with an icon-only style.
   */
  @Prop() rounded: boolean;

  /**
   * Sets size for the component.
   * @defaultValue 'base'
   */
  @Prop() size: 'large' | 'base' | 'small' = 'base';

  /**
   * Sets the button type.
   * @defaultValue 'button'
   */
  @Prop() mode: 'button' | 'submit' | 'reset' | 'link' = 'button';

  /**
   * Determines the button's variant for different styles.
   */
  @Prop() variant: 'primary' | 'secondary' | 'neutral' | 'info' | 'success' | 'danger' | 'warning' | 'white' = 'primary';

  /**
   * Emitted when the button click.
   */
  @Event({ eventName: 'tk-click' }) tkClick!: EventEmitter<MouseEvent>;

  componentWillLoad() {
    if (this.mode == 'link') {
      this.type = null;
    }
  }

  private handleClick(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    this.tkClick.emit(e);

    if (this.mode === 'submit') {
      const form = this.el.closest('form');
      if (form) {
        form.requestSubmit();
      }
    } else if (this.mode === 'reset') {
      const form = this.el.closest('form');
      if (form) {
        form.reset();
      }
    }
  }

  render() {
    const hasMultipleIcons = isMultiIconOptions(this.icon);

    const rootClasses = classNames(
      'tk-button',
      this.type,
      {
        'loading': this.loading && !this.disabled,
        'rounded': this.rounded && this.icon && (this.label == '' || this.label == null || this.label.length <= 0),
        'link': this.mode == 'link',
        'underline': this.underline,
        'icon-only': (this.label == '' || this.label == null || this.label.length <= 0) && this.icon && !hasMultipleIcons,
      },
      [this.variant],
      [this.size],
    );

    let _leftIcon: HTMLTkIconElement;
    let _rightIcon: HTMLTkIconElement;
    const spinnerElement = <tk-spinner size={this.size === 'large' ? 'small' : this.size === 'base' ? 'xsmall' : 'xxsmall'}></tk-spinner>;
    if (this.loading) {
      _leftIcon = spinnerElement;
    } else if (this.icon) {
      if (hasMultipleIcons) {
        const leftIconConfig = (this.icon as IMultiIconOptions).left;
        const rightIconConfig = (this.icon as IMultiIconOptions).right;
        if (leftIconConfig) {
          _leftIcon = <tk-icon {...getIconElementProps(leftIconConfig, { class: 'tk-button-icon', variant: null })} />;
        }
        if (rightIconConfig) {
          _rightIcon = <tk-icon {...getIconElementProps(rightIconConfig, { class: 'tk-button-icon', variant: null })} />;
        }
      } else {
        if (this.iconPosition === 'left') {
          _leftIcon = <tk-icon {...getIconElementProps(this.icon as string | IIconOptions, { class: 'tk-button-icon', variant: null })} />;
        } else {
          _rightIcon = <tk-icon {...getIconElementProps(this.icon as string | IIconOptions, { class: 'tk-button-icon', variant: null })} />;
        }
      }
    }

    let Tag;
    let props;

    if (this.mode == 'link') {
      Tag = 'a';
      props = { href: this.href, target: this.target };
    } else {
      Tag = 'button';
      props = { type: this.type };
    }

    let label;
    if (this.label?.length > 0) {
      label = <span>{this.label}</span>;
    }

    return (
      <Host class={{ 'full-width': this.fullWidth }}>
        <Tag class={rootClasses} {...props} disabled={this.disabled} onClick={e => this.handleClick(e)}>
          {_leftIcon}
          {label}
          {_rightIcon}
        </Tag>
      </Host>
    );
  }
}
