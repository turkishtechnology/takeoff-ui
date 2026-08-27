import { Component, h, Prop, Element, Event, ComponentInterface, EventEmitter, Host } from '@stencil/core';
import classNames from 'classnames';
import { IIconOptions, IMultiIconOptions } from '../../global/interfaces/IIconOptions';
import { getIconElementProps, renderIcons } from '../../utils/icon-utils';
import { CSSStyleProperties } from '../../global/types';
import { getDataTestId } from '../../utils/test-id-utils';

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
  @Prop() icon?: string | IIconOptions | IMultiIconOptions;

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
   * The value of the chips
   * @defaultValue this.label
   */
  @Prop() value: any;

  /**
   * The position of the icon relative to the label.
   * @defaultValue 'left'
   */
  @Prop() iconPosition: 'left' | 'right' = 'left';

  /**
   * Custom style to apply to the chip component.
   */
  @Prop() containerStyle?: CSSStyleProperties = null;

  /**
   * If true, the chip will take the full width of its container.
   * @defaultValue false
   */
  @Prop() fullWidth: boolean = false;

  /**
   * Marks the chip as the one holding the keyboard inside a chips input, e.g. while the arrow keys walk them.
   * @defaultValue false
   */
  @Prop({ reflect: true }) focused: boolean = false;

  /**
   * Sets the data-testid attribute on the root container element.
   */
  @Prop({ reflect: true }) dataTestid?: string;

  /**
   * When an element is deleted, it is triggered. It returns the label.
   */
  @Event({ eventName: 'tk-remove' }) tkRemove: EventEmitter<any>;

  componentWillLoad(): void {
    if (this.value == null) this.value = this.label;
  }

  private handleClick() {
    this.tkRemove.emit(this.value);
    if (this.autoSelfDestroy) this.el?.remove();
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handleClick();
    }
  }

  render() {
    const rootClasses = classNames('tk-chips', this.variant, this.size, this.type, {
      removable: this.removable,
      disabled: this.disabled,
      focused: this.focused,
    });
    const { leftIcon, rightIcon } = renderIcons(
      this.icon,
      {
        variant: this.variant,
        size: this.size === 'large' ? 'medium' : this.size,
        additionalProps: { color: this.disabled ? 'var(--icon-sub-base)' : this.type === 'filled' ? 'var(--static-white)' : undefined },
        dataTestid: this.dataTestid,
      },
      this.iconPosition,
    );

    return (
      <Host class={{ 'full-width': this.fullWidth }}>
        <div class={rootClasses} style={this.containerStyle} data-testid={getDataTestId(this.dataTestid, 'container')}>
          {leftIcon}
          {this.label}
          {rightIcon}
          {this.removable && (
            <tk-icon
              {...getIconElementProps('close', {
                variant: this.variant,
                color: this.disabled ? 'var(--icon-sub-base)' : this.type === 'filled' ? 'var(--static-white)' : undefined,
                size: this.size === 'large' ? 'medium' : this.size,
                onClick: () => this.handleClick(),
                onKeyDown: (e: KeyboardEvent) => this.handleKeyDown(e),
                tabIndex: this.disabled ? -1 : 0,
              })}
              dataTestid={getDataTestId(this.dataTestid, 'remove-icon')}
            />
          )}
        </div>
      </Host>
    );
  }
}
