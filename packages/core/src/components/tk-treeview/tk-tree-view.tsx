import { Component, ComponentInterface, Prop, h, State, Element, Event, EventEmitter } from '@stencil/core';
import classNames from 'classnames';

/**
 * The `TkTreeview` component displays hierarchical data in a tree structure with expandable/collapsible nodes.
 * Supports both flat list data (via `items` prop) and declarative children (via slots).
 * @react `import { TkTreeView, TkTreeItem } from '@takeoff-ui/react'`
 * @vue `import { TkTreeView, TkTreeItem } from '@takeoff-ui/vue'`
 * @angular `import { TkTreeView, TkTreeItem } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-tree-view',
  styleUrl: 'tk-tree-view.scss',
  shadow: true,
})
export class TkTreeView implements ComponentInterface {
  @Element() el: HTMLElement;

  @State() expandedIds: Set<string | number> = new Set();
  @State() selectedId: string | number = null;
  @State() treeData: any[] = [];
  /**
   * Tree view type: 'basic', 'divided', or 'light'.
   */
  @Prop() type: 'basic' | 'divided' | 'light' = 'basic';

  /**
   * Tree view size: 'base', 'small', or 'large'.
   */
  @Prop() size: 'base' | 'small' | 'large' = 'base';

  /**
   * If true, disables all interaction with the tree view.
   */
  @Prop() disabled: boolean = false;

  /**
   * If true, the tree view is set as stepper mode.
   */
  @Prop() stepper: boolean = false;

  @Event({ eventName: 'tk-item-click' }) tkItemClick: EventEmitter<string | number>;

  componentWillLoad() {
    this.treeData = this.extractTreeData(Array.from(this.el.children));
  }

  extractTreeData(elements: Element[]): any[] {
    return elements
      .filter(el => el.tagName.toLowerCase() === 'tk-tree-item')
      .map(el => {
        const itemId = (el as any).itemId || el.getAttribute('item-id');
        const label = (el as any).label || el.getAttribute('label');
        const disabled = (el as any).disabled || el.getAttribute('disabled') !== null;
        const children = this.extractTreeData(Array.from(el.children));
        return { itemId, label, disabled, children };
      });
  }

  private handleToggle = id => {
    const expandedIds = new Set(this.expandedIds);
    if (expandedIds.has(id)) {
      expandedIds.delete(id);
    } else {
      expandedIds.add(id);
    }
    this.expandedIds = expandedIds;
    this.handleSelect(id);
  };

  private handleSelect = itemId => {
    this.selectedId = itemId;
    this.tkItemClick.emit(itemId);
  };

  private renderTree(nodes, depth = 0) {
    return nodes.map(node => {
      const isDirectory = node.children && node.children.length > 0;
      const isExpanded = this.expandedIds.has(node.itemId);
      const isSelected = this.selectedId === node.itemId;
      const isDisabled = node.disabled;
      const nodeClass = classNames('tk-tree-view', 'node', {
        directory: isDirectory,
        file: !isDirectory,
        expanded: isExpanded,
        selected: isSelected,
        disabled: isDisabled,
      });
      return (
        <div class={nodeClass}>
          <span
            class={classNames(
              'tk-tree-view',
              'label',
              {
                selected: isSelected,
                disabled: isDisabled,
              },
              this.size,
            )}
            onClick={() => {
              if (isDisabled) return;
              if (isDirectory) {
                this.handleToggle(node.itemId);
              } else {
                this.handleSelect(node.itemId);
              }
            }}
          >
            {isDirectory ? (
              [
                <span class={classNames('tk-tree-view', 'directory-icon', 'material-symbols-outlined', this.size)}>{isExpanded ? 'arrow_drop_down' : 'arrow_right'}</span>,
                <span class={classNames('tk-tree-view', 'folder-icon', 'material-symbols-outlined', this.size)}>folder</span>,
              ]
            ) : (
              <span class={classNames('tk-tree-view', 'file-icon', 'material-symbols-outlined', this.size)}>insert_drive_file</span>
            )}
            <span class={classNames('tk-tree-view', 'text', this.size)}>{node.label}</span>
          </span>
          {isDirectory && isExpanded && node.children && node.children.length > 0 && (
            <div class={classNames('tk-tree-view', 'children')}>{this.renderTree(node.children, depth + 1)}</div>
          )}
        </div>
      );
    });
  }

  render() {
    const rootClasses = classNames('tk-tree-view', this.type, { disabled: this.disabled });
    return (
      <div class={rootClasses}>
        <div class={classNames('tk-tree-view', 'content')}>{this.treeData.length > 0 ? this.renderTree(this.treeData) : null}</div>
      </div>
    );
  }
}
