import { Component, ComponentInterface, Prop, h, Host, Element } from '@stencil/core';

@Component({
  tag: 'tk-tree-item',
  styleUrl: 'tk-tree-item.scss',
  shadow: false,
})
export class TkTreeItem implements ComponentInterface {
  @Element() el: HTMLTkTreeItemElement;

  /** Unique id for the tree item */
  @Prop() itemId: string | number;
  /** Label to display */
  @Prop() label: string;
  /** Is this item selected? */
  @Prop() selected: boolean = false;
  /** Is this item expanded? */
  @Prop() expanded: boolean = false;
  /** Is this item disabled? */
  @Prop() disabled: boolean = false;
  /** Does this item have children? */
  @Prop() hasChildren: boolean = false;
  /** Depth in the tree (for indentation) */
  @Prop() depth: number = 0;

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
