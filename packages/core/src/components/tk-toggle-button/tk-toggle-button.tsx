import { Component, ComponentInterface, Element, Prop, h, Event, EventEmitter } from '@stencil/core';
import classNames from 'classnames';
import { IIconOptions } from '../../global/interfaces/IIconOptions';
import { getIconElementProps } from '../../utils/icon-props';

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
   * The value of the toggle button.
   */
  @Prop() value?: any;

  /**
   * Whether the button is selected.
   */
  @Prop({ mutable: true, reflect: true }) selected: boolean = false;
  /**
   * Emitted when the toggle button is toggled.
   */
  @Event({ eventName: 'tk-toggle' }) tkToggle!: EventEmitter<any>;

  private handleClick = (e: MouseEvent) => {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.tkToggle.emit({ value: this.value, selected: !this.selected });
  };

  private renderIcon() {
    const iconClass = `tk-toggle-button-icon ${this.size}`;
    if (this.icon) {
      const iconProps = getIconElementProps(this.icon, { size: this.size, class: iconClass, variant: null });
      return <tk-icon {...iconProps} />;
    }
    return null;
  }

  private renderLabel() {
    if (this.label?.length > 0) {
      return <span class={classNames('tk-toggle-button-label', this.size)}>{this.label}</span>;
    }
    return null;
  }

  render() {
    const rootClasses = classNames('tk-toggle-button', this.variant, this.type, this.size, {
      rounded: this.rounded,
      selected: this.selected && !this.disabled,
      disabled: this.disabled,
    });

    return (
      <button class={rootClasses} disabled={this.disabled} onClick={this.handleClick}>
        {this.iconPosition === 'left' && this.renderIcon()}
        {this.renderLabel()}
        {this.iconPosition === 'right' && this.renderIcon()}
      </button>
    );
  }
}
