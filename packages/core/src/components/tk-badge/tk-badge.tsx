import { Component, Prop, Element, h, State, ComponentInterface } from '@stencil/core';
import classNames from 'classnames';
import { getIconElementProps } from '../../utils/icon-props';
import { IIconOptions } from '../../global/interfaces/IIconOptions';

/**
 * The TkBadge component allows you to create a small badge for adding information like contextual data that needs to stand out and get noticed. It is also often useful in combination with other elements like a user avatar to show a number of new messages.
 * @react `import { TkBadge } from '@takeoff-ui/react'`
 * @vue `import { TkBadge } from '@takeoff-ui/vue'`
 * @angular `import { TkBadge } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-badge',
  styleUrl: 'tk-badge.scss',
  shadow: true,
})
export class TkBadge implements ComponentInterface {
  @Element() el: HTMLTkBadgeElement;

  /**
   * State to check if slot content exists.
   * @defaultValue false
   */
  @State() hasSlot: boolean = false;

  /**
   * If true, shows a small dot on the badge.
   * @defaultValue false
   */
  @Prop() dot: boolean = false;

  /**
   * This field specifies the design type of the component.
   * @defaultValue filled
   */
  @Prop() type: 'filled' | 'filledlight' | 'outlined' | 'text' = 'filled';

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
   * Defines the label for the element.
   */
  @Prop() label: string;

  /**
   * Defines the number for the element.
   */
  @Prop() count: number | string;

  /**
   * Makes the badge corners rounded.
   * @defaultValue false
   */
  @Prop() rounded: boolean = false;

  /**
   * Sets size for the component.
   * @defaultValue 'base'
   */
  @Prop() size: 'large' | 'base' | 'small' = 'base';

  /**
   * Determines the badge's variant for different styles.
   * @defaultValue 'primary'
   */
  @Prop() variant: 'primary' | 'secondary' | 'neutral' | 'info' | 'success' | 'danger' | 'warning' | 'verified' | 'purple' | 'cyan' | 'business' = 'primary';

  componentDidLoad(): void {
    this.hasSlot = this.el.shadowRoot.querySelector('slot')?.assignedNodes?.().length > 0;
  }

  private isValidCount(): boolean {
    if (this.count === undefined || this.count === null) {
      return false;
    }

    if (this.count === 0 || this.count === '0') {
      return true;
    }

    // Handle other numeric strings and numbers
    const numericValue = Number(this.count);
    return !isNaN(numericValue);
  }

  private renderContent(): HTMLSpanElement {
    let content;
    if (!this.dot) {
      const contentConfig = {
        label: {
          value: this.label,
          class: 'label',
        },
        count: {
          value: this.count,
          class: 'count',
        },
      };
      const type = this.label ? 'label' : this.isValidCount() ? 'count' : null;
      const { value = '', class: contentClass = '' } = contentConfig[type] || {};
      content = <span class={contentClass}>{value}</span>;
    }
    return content;
  }

  render() {
    const isCountOnly = this.isValidCount() && !this.label && !this.dot && !this.icon;
    const rootClasses = classNames('tk-badge-container', {
      'has-slot': this.hasSlot,
    });
    const badgeClasses = classNames('tk-badge', this.variant, this.size, this.type, {
      'rounded': this.rounded,
      'reverse': this.icon && this.iconPosition === 'right',
      'icon-only': this.icon && !this.label && !this.dot,
      'dot': this.dot,
      'count': isCountOnly,
    });

    const icon = !this.dot && this.icon && <tk-icon {...getIconElementProps(this.icon, { variant: null })} />;

    return (
      <div class={rootClasses}>
        <slot />
        <span class={badgeClasses}>
          {icon}
          {this.renderContent()}
        </span>
      </div>
    );
  }
}
