import { Component, Prop, Element, h, ComponentInterface } from '@stencil/core';
import classNames from 'classnames';
/**
 * The TkIcon component allows you to create a icon for adding visual information. It is also often useful in combination with other elements.
 * This component uses Google's Material Symbols icons. For a complete list of available icon names, please visit:
 * https://fonts.google.com/icons?icon.set=Material+Symbols
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
   * Controls whether the icon is shown as a sign (previously 'card' type)
   * @defaultValue false
   */
  @Prop() sign: boolean = false;

  /**
   * The variant of the icon.
   * @defaultValue 'primary'
   */
  @Prop() variant: 'primary' | 'secondary' | 'neutral' | 'info' | 'success' | 'danger' | 'warning' | 'white' = 'primary';

  /**
   * Sets size for the component.
   * @defaultValue 'base'
   */
  @Prop() size: 'xxlarge' | 'xlarge' | 'large' | 'medium' | 'base' | 'small' | 'xsmall' = 'base';

  /**
   * Indicates whether the icon should be filled
   */
  @Prop() fill?: boolean;

  /**
   * The color of the icon
   */
  @Prop() color?: string;

  /**
   * The color of the icon (custom variant)
   */
  @Prop() iconColor?: string;

  /**
   * The border color of the sign (custom variant)
   */
  @Prop() borderColor?: string;

  /**
   * The background color of the sign (custom variant)
   */
  @Prop() backgroundColor?: string;

  /**
   * Specifies a material icon.
   */
  @Prop() icon: string;

  /**
   * Specifies the type of the icon to be displayed.
   */
  @Prop() iconType: 'rounded' | 'outlined' | 'sharp' = 'outlined';

  /**
   * The HTML tag to use for the icon element.
   * @defaultValue 'i'
   */
  @Prop() iconTag: 'i' | 'span' = 'i';

  private getIconStyles = () => {
    const style: Record<string, string> = {};
    if (this.color) {
      style.color = this.color;
    } else if (this.iconColor) {
      style.color = this.iconColor;
    }
    if (this.sign) {
      if (this.borderColor) {
        style.borderColor = this.borderColor;
      }
      if (this.backgroundColor) {
        style.backgroundColor = this.backgroundColor;
      }
    }
    return { style };
  };

  render() {
    const iconClasses = classNames(`material-symbols-${this.iconType}`, 'tk-icon', this.variant && `tk-icon-${this.variant}`, `tk-icon-${this.size}`, {
      'tk-icon-sign': this.sign,
      'fill': this.fill,
    });

    const iconProps = {
      class: iconClasses,
      ...this.getIconStyles(),
    };

    const IconTag = this.iconTag;

    const iconElement = <IconTag {...iconProps}>{this.icon}</IconTag>;

    if (this.sign) {
      return (
        <div
          class="tk-icon-sign-container"
          style={{
            borderColor: this.borderColor,
          }}
        >
          {iconElement}
        </div>
      );
    }
    return iconElement;
  }
}
