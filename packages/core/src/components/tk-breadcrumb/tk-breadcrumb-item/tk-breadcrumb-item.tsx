import { Component, ComponentInterface, Prop, Element, h } from '@stencil/core';
import classNames from 'classnames';
import { renderIcons } from '../../../utils/icon-utils';
import { IIconOptions } from '../../../global/interfaces/IIconOptions';
import { getDataTestidAttribute } from '../../../utils/test-id-utils';

@Component({
  tag: 'tk-breadcrumb-item',
  styleUrl: 'tk-breadcrumb-item.scss',
})
export class TkBreadcrumbItem implements ComponentInterface {
  @Element() el: HTMLTkBreadcrumbItemElement;

  /**
   * URL for the item
   */
  @Prop() href?: string;

  /**
   * Icon to display alongside the label
   */
  @Prop() icon?: string | IIconOptions;

  /**
   * Label text for the breadcrumb item
   */
  @Prop() label: string;

  /**
   * Whether the item is an external url
   * @defaultValue false
   */
  @Prop() isExternal?: boolean = false;

  /**
   * Indicates if the item is the last one
   */
  @Prop() isCurrent?: boolean = false;

  /**
   * Sets the data-testid attribute on the root container element.
   */
  @Prop({ reflect: true }) dataTestid?: string;

  render() {
    const rootClasses = classNames('tk-breadcrumb-item', {
      'tk-breadcrumb-item-current': this.isCurrent,
      'tk-breadcrumb-item-icon-only': !this.label,
    });
    const linkProps = {
      href: this.href,
      ...(this.isExternal && { target: '_blank', rel: 'noopener noreferrer' }),
    };
    const { leftIcon, rightIcon } = renderIcons(this.icon, {
      additionalProps: { color: this.isCurrent ? 'var(--icon-dark)' : 'var(--icon-sub-base)' },
      iconTag: 'span',
      dataTestid: this.dataTestid,
    });

    return (
      <li class={rootClasses} aria-current={this.isCurrent ? 'page' : null} {...getDataTestidAttribute(this.dataTestid, 'container')}>
        <a class="tk-breadcrumb-link" {...linkProps} tabindex={this.isCurrent ? -1 : 0} {...getDataTestidAttribute(this.dataTestid, 'link')}>
          {leftIcon}
          {this.label && (
            <span class="tk-breadcrumb-item-label" {...getDataTestidAttribute(this.dataTestid, 'label')}>
              <slot>{this.label}</slot>
            </span>
          )}
          {rightIcon}
        </a>
      </li>
    );
  }
}
