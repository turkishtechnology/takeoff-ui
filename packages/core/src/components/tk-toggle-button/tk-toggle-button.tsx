import { Component, ComponentInterface, Element, Prop, h, Event, Host, EventEmitter } from '@stencil/core';
import classNames from 'classnames';
import { IIconOptions } from '../../global/interfaces/IIconOptions';
import { getIconElementProps } from '../../utils/icon-props';

/**
 * TkToggleButton is a segmented/compact toggle button for use in a group.
 * @react `import { TkToggleButton } from '@takeoff-ui/react'`
 * @vue `import { TkToggleButton } from '@takeoff-ui/vue'`
 * @angular `import { TkToggleButton } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-toggle-button',
  styleUrl: 'tk-toggle-button.scss',
  shadow: true,
})
export class TkToggleButton implements ComponentInterface {
  @Element() el: HTMLTkToggleButtonElement;

  /**
   * Disables the button, preventing user interaction.
   */
  @Prop() disabled: boolean;

  /**
   * Specifies a material icon name to be displayed.
   */
  @Prop() icon?: string | IIconOptions;

  /**
   * Defines the position of the icon.
   * @defaultValue 'left'
   */
  @Prop() iconPosition: 'left' | 'right' = 'left';

  /**
   * Label text displayed inside the button.
   */
  @Prop() label: string = '';

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
   * Determines the button's variant for different styles.
   */
  @Prop() variant: 'primary' | 'neutral' = 'neutral';

  /**
   * The value of the type toggle button.
   */
  @Prop() type: 'filled' | 'outlined' | 'text' | 'raised' | 'filled-light' = 'filled';

  /**
   * The value of the toggle button (for group usage).
   */
  @Prop() value?: any;

  /**
   * Whether the button is selected (controlled by group or standalone).
   */
  @Prop({ mutable: true, reflect: true }) selected: boolean = false;

  /**
   * Emitted when the toggle button is toggled.
   */
  @Event({ eventName: 'tk-toggle' }) tkToggle!: EventEmitter<any>;

  private handleClick(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.tkToggle.emit({ value: this.value, selected: !this.selected });
  }
  // tk-icon kullanılacak.
  private getDefaultIcon() {
    const sizeClass = `tk-toggle-button-icon ${this.size}`;

    if (this.size === 'small') {
      return (
        <svg class={sizeClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
          <path
            d="M9.16298 17.5H8.32965L9.16298 11.6667H6.24631C5.51298 11.6667 5.97131 11.0417 5.98798 11.0167C7.06298 9.11667 8.67965 6.28333 10.838 2.5H11.6713L10.838 8.33333H13.763C14.0963 8.33333 14.2796 8.49167 14.0963 8.88333C10.8046 14.625 9.16298 17.5 9.16298 17.5Z"
            fill="#F9FAFC"
          />
        </svg>
      );
    }

    if (this.size === 'base') {
      return (
        <svg class={sizeClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 24" fill="none">
          <path
            d="M11.4956 21H10.4956L11.4956 14H7.99558C7.11558 14 7.66558 13.25 7.68558 13.22C8.97558 10.94 10.9156 7.54 13.5056 3H14.5056L13.5056 10H17.0156C17.4156 10 17.6356 10.19 17.4156 10.66C13.4656 17.55 11.4956 21 11.4956 21Z"
            fill="#F9FAFC"
          />
        </svg>
      );
    }

    // large (default)
    return (
      <svg class={sizeClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <path
          d="M10.9956 21H9.99558L10.9956 14H7.49558C6.61558 14 7.16558 13.25 7.18558 13.22C8.47558 10.94 10.4156 7.54 13.0056 3H14.0056L13.0056 10H16.5156C16.9156 10 17.1356 10.19 16.9156 10.66C12.9656 17.55 10.9956 21 10.9956 21Z"
          fill="#F9FAFC"
        />
      </svg>
    );
  }
  render() {
    const rootClasses = classNames(
      'tk-toggle-button',
      {
        rounded: this.rounded,
        selected: this.selected,
      },
      [this.variant],
      [this.size],
    );

    let icon;
    if (this.icon) {
      icon = <tk-icon {...getIconElementProps(this.icon, { class: 'tk-toggle-button-icon', variant: null })} />;
    } else {
      icon = this.getDefaultIcon();
    }
    let label;
    if (this.label?.length > 0) {
      label = <span class={classNames('tk-toggle-button-label', this.size)}>{this.label}</span>;
    }

    return (
      <Host>
        <button part="button" class={rootClasses} disabled={this.disabled} onClick={e => this.handleClick(e)}>
          {icon}
          {label}
        </button>
      </Host>
    );
  }
}
