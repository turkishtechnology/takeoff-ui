import { Component, h, Prop, Element, Event, ComponentInterface, EventEmitter } from '@stencil/core';
import classNames from 'classnames';
import { IIconOptions } from '../../global/interfaces/IIconOptions';
import { getIconElementProps } from '../../utils/icon-props';

/**
 * The TkChip component is basically a simple UI block entity, representing for example more advanced underlying data, such as a contact, in a compact way. Chips can contain entities such as an avatar, text or an icon, optionally having a pointer too.
 * @react `import { TkChips } from '@takeoff-ui/react'`
 * @vue `import { TkChips } from '@takeoff-ui/vue'`
 * @angular `import { TkChips } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-chips',
  styleUrl: 'tk-chips.scss',
  shadow: true,
})
export class TkChips implements ComponentInterface {
  @Element() el: HTMLTkChipsElement;

  /**
   * The disabled status.
   * @defaultValue false
   */
  @Prop() disabled: boolean = false;

  /**
   * This field specifies the design type of the component.
   * @defaultValue filled
   */
  @Prop() type: 'filled' | 'filledlight' | 'outlined' | 'avatar' = 'filled';

  /**
   * Specifies a material icon name to be displayed.
   */
  @Prop() icon?: string | IIconOptions;

  /**
   * The label to display inside the chip.
   */
  @Prop() label: string;

  /**
   * This property determines whether the chip component is removable.
   * @defaultValue false
   */
  @Prop() removable: boolean = false;

  /**
   * Determines whether the chip automatically removes itself when the close button is clicked.
   * @defaultValue true
   */
  @Prop() autoSelfDestroy: boolean = true;

  /**
   * Sets size for the component.
   * @defaultValue 'base'
   */
  @Prop() size: 'large' | 'base' | 'small' = 'base';

  /**
   * The variant of the chip for styling.
   * @defaultValue 'primary'
   */
  @Prop() variant: 'primary' | 'secondary' | 'neutral' | 'info' | 'success' | 'danger' | 'warning' | 'verified' = 'primary';

  /**
   * When an element is deleted, it is triggered. It returns the label.
   */
  @Event({ eventName: 'tk-remove' }) tkRemove: EventEmitter<string>;

  private handleClick() {
    if (this.autoSelfDestroy) this.el.remove();
    this.tkRemove.emit(this.label);
  }

  render() {
    const rootClasses = classNames('tk-chips', this.variant, this.size, this.disabled && 'disabled', this.type, {
      removable: this.removable,
    });

    const icon = <tk-icon {...getIconElementProps(this.icon, { variant: null })} />;

    return (
      <div class={rootClasses}>
        {icon}
        {this.label}
        {this.removable && (
          <i onClick={() => this.handleClick()} class="material-symbols-outlined">
            close
          </i>
        )}
      </div>
    );
  }
}
