import { Component, ComponentInterface, Prop, Element, h, State, Fragment } from '@stencil/core';
import classNames from 'classnames';
import { IBreadcrumbModel } from './interfaces';
import { getIconElementProps } from '../../utils/icon-props';

/**
 * The `TkBreadcrumb` provides a navigational aid, allowing users to keep track of their location within the application's hierarchy.
 * @slot default - Default slot to detect TkBreadcrumbItem components.
 * @react `import { TkBreadcrumb, TkBreadcrumbItem } from '@takeoff-ui/react'`
 * @vue `import { TkBreadcrumb, TkBreadcrumbItem } from '@takeoff-ui/vue'`
 * @angular `import { TkBreadcrumb, TkBreadcrumbItem } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-breadcrumb',
  styleUrl: 'tk-breadcrumb.scss',
  shadow: true,
})
export class TkBreadcrumb implements ComponentInterface {
  @Element() el: HTMLTkBreadcrumbElement;

  @State() hasSlottedItems: boolean = false;

  /**
   * Array of breadcrumb items
   */
  @Prop() model?: IBreadcrumbModel[];

  /**
   * Type of separator to use between breadcrumb items
   * @default 'icon'
   */
  @Prop() separator: 'icon' | 'dot' | 'slash' | 'vertical' = 'icon';

  /**
   * Icon to use as separator when separator is set to 'icon'
   * @default 'chevron_right'
   */
  @Prop() separatorIcon?: string = 'chevron_right';

  /**
   * Defines the visual style of the component, possible values are 'basic' and 'outlined'.
   * @default 'basic'
   */
  @Prop() type?: 'basic' | 'outlined' = 'basic';

  componentWillLoad() {
    this.hasSlottedItems = !!this.el.querySelector('tk-breadcrumb-item');
  }

  private getBreadcrumbItemProps(item, index) {
    const { label, href, isExternal, icon } = item;
    return {
      key: index,
      label,
      href,
      icon,
      isExternal,
      isCurrent: index === (this.model?.length ?? 0) - 1,
    };
  }

  private renderSeparator() {
    const separatorClasses = classNames('tk-breadcrumb-separator-icon', {
      'material-symbols-outlined': this.separator === 'icon',
      'tk-breadcrumb-dot-separator': this.separator === 'dot',
      'tk-breadcrumb-slash-separator': this.separator === 'slash',
      'tk-breadcrumb-vertical-separator': this.separator === 'vertical',
    });
    if (this.separator === 'icon') {
      return <tk-icon {...getIconElementProps(this.separatorIcon, { class: separatorClasses, variant: null }, undefined, 'span')} />;
    }
    return <span class={separatorClasses} />;
  }

  render() {
    const rootClasses = classNames('tk-breadcrumb', `tk-breadcrumb-${this.type}`);

    return (
      <nav class={rootClasses} aria-label="breadcrumb">
        <ol class="tk-breadcrumb-list">
          {this.hasSlottedItems ? (
            <slot />
          ) : (
            this.model?.map((item, index) => (
              <Fragment>
                <tk-breadcrumb-item {...this.getBreadcrumbItemProps(item, index)} />
                {index < this.model.length - 1 && <li class="tk-breadcrumb-separator">{this.renderSeparator()}</li>}
              </Fragment>
            ))
          )}
        </ol>
      </nav>
    );
  }
}
