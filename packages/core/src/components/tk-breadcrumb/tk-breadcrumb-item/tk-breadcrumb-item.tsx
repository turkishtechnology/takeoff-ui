import { Component, ComponentInterface, Prop, Element, h } from '@stencil/core';
import classNames from 'classnames';
import { getIconElementProps } from '../../../utils/icon-utils';
import { IIconOptions } from '../../../global/interfaces/IIconOptions';

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

  render() {
    const rootClasses = classNames('tk-breadcrumb-item', {
      'tk-breadcrumb-item-current': this.isCurrent,
      'tk-breadcrumb-item-icon-only': !this.label,
    });
    const linkProps = {
      href: this.href,
      ...(this.isExternal && { target: '_blank', rel: 'noopener noreferrer' }),
    };

    const icon = <tk-icon {...getIconElementProps(this.icon, { class: 'tk-breadcrumb-item-icon', variant: null }, undefined, 'span')} />;

    return (
      <li class={rootClasses} aria-current={this.isCurrent ? 'page' : null}>
        <a class="tk-breadcrumb-link" {...linkProps} tabindex={this.isCurrent ? -1 : 0}>
          {icon}
          {this.label && (
            <span class="tk-breadcrumb-item-label">
              <slot>{this.label}</slot>
            </span>
          )}
        </a>
      </li>
    );
  }
}
