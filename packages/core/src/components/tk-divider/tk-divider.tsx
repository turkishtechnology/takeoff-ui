import { Component, h, Prop, ComponentInterface, State, Element } from '@stencil/core';
import classNames from 'classnames';

/**
 * TkDivider is a component that allows you to separate different sections, elements and content.
 * @react `import { TkDivider } from '@takeoff-ui/react'`
 * @vue `import { TkDivider } from '@takeoff-ui/vue'`
 * @angular `import { TkDivider } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-divider',
  styleUrl: 'tk-divider.scss',
  shadow: true,
})
export class TkDivider implements ComponentInterface {
  @Element() el: HTMLTkDividerElement;
  @State() hasDefaultSlot: boolean;
  /**
   * Controls the orientation of the divider component.
   * @defaultValue horizontal
   */
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';
  /**
   * Controls vertical spacing
   */
  @Prop() mx?: string | number;
  /**
   * Controls horizontal spacing
   */
  @Prop() my?: string | number;

  componentWillLoad() {
    this.hasDefaultSlot = Array.from(this.el.childNodes).some(
      node => (node.nodeType === Node.ELEMENT_NODE && !(node as HTMLElement).hasAttribute('slot')) || (node.nodeType === Node.TEXT_NODE && node.textContent?.trim().length > 0),
    );
  }
  private getRootStyles() {
    const styles: { [key: string]: string } = {};
    if (this.my) {
      const space = typeof this.my === 'number' ? `${this.my}px` : this.my;
      styles.marginTop = space;
      styles.marginBottom = space;
    }

    if (this.mx) {
      const space = typeof this.mx === 'number' ? `${this.mx}px` : this.mx;
      styles.marginLeft = space;
      styles.marginRight = space;
    }
    return styles;
  }

  render() {
    return (
      <div class={classNames('tk-divider', `tk-divider-${this.orientation}`)} role="separator" aria-orientation={this.orientation} style={this.getRootStyles()}>
        {this.hasDefaultSlot && (
          <div class="tk-divider-content">
            <slot />
          </div>
        )}
      </div>
    );
  }
}
