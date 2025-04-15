import { Component, Prop, Element, h, ComponentInterface } from '@stencil/core';
import classNames from 'classnames';
/**
 * The TkIcon component allows you to create a icon for adding visual information. It is also often useful in combination with other elements.
 * @react `import { TkIcon } from '@takeoff-ui/react'`
 * @vue `import { TkIcon } from '@takeoff-ui/vue'`
 * @angular `import { TkIcon } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-icon',
  styleUrl: 'tk-icon.scss',
})
export class TkIcon implements ComponentInterface {
  @Element() el: HTMLTkIconElement;

  /**
   * This field specifies the type of the component.
   * @defaultValue 'default'
   */
  @Prop() type: 'default ' | 'card' = 'default ';

  /**
   * This field specifies the variant of icon.
   * @defaultValue 'primary'
   */
  @Prop() variant: 'primary' | 'secondary' | 'neutral' | 'info' | 'success' | 'danger' | 'warning' | 'white' = 'primary';

  /**
   * Indicates whether the icon should be filled
   */
  @Prop() fill?: boolean;

  /**
   * The color of the icon
   */
  @Prop() color?: string;

  /**
   * Specifies a material icon.
   */
  @Prop() icon: string;

  /**
   * Specifies the type of the icon to be displayed.
   */
  @Prop() iconType: 'rounded' | 'outlined' | 'sharp' = 'outlined';

  /**
   * Sets size for the component.
   * @defaultValue 'base'
   */
  @Prop() size: 'large' | 'base' | 'small' = 'base';

  render() {
    const iconClasses = classNames('tk-icon', `tk-icon-${this.type} tk-${this.variant}`);

    let setColor = this.color ? { color: ` ${this.color}` } : {};
    let setBackgroundColor = this.color && this.type == 'card' ? { backgroundColor: 'var(--background-lightest)' } : {};

    return (
      <div class={iconClasses} style={setColor}>
        <i class={`material-symbols-${this.iconType} ${this.fill ? 'fill' : ''} tk-${this.size}`} style={setBackgroundColor}>
          {this.icon}
        </i>
      </div>
    );
  }
}
