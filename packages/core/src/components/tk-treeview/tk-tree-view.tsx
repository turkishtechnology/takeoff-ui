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
  shadow: false,
})
export class TkTreeView implements ComponentInterface {
  @Element() el: HTMLElement;

  @State() expandedIds: Set<string | number> = new Set();
  @State() selectedId: string | number = null;
  @State() treeData: any[] = [];
  private observer: MutationObserver;

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
  @Prop() mode: 'basic' | 'stepper' = 'basic';

  /**
   * Show/hide the directory arrow icon.
   */
  @Prop() showExpandIcon: boolean = true;

  /**
   * Show/hide the folder icon for directories.
   */
  @Prop() showFolderIcon: boolean = true;

  /**
   * Show/hide the file icon for files.
   */
  @Prop() showFileIcon: boolean = true;

  /**
   * Show/hide the badge for children count on directories.
   */
  @Prop() showBadge: boolean = true;

  @Event({ eventName: 'tk-item-click' }) tkItemClick: EventEmitter<string | number>;

  componentWillLoad() {
    this.treeData = this.extractTreeData(Array.from(this.el.children));
  }

  componentDidLoad() {
    this.observer = new MutationObserver(() => {
      this.treeData = this.extractTreeData(Array.from(this.el.children));
    });
    this.observer.observe(this.el, { childList: true, subtree: true });
  }

  disconnectedCallback() {
    if (this.observer) this.observer.disconnect();
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

  private handleToggleUnified = id => {
    const expandedIds = new Set(this.expandedIds);
    const clickedNode = this.findNodeById(this.treeData, id);
    const descendants = clickedNode ? this.collectDescendantIds(clickedNode) : [];

    if (this.mode === 'stepper') {
      const path = this.findPathToNode(this.treeData, id);
      const isExpanded = expandedIds.has(id);

      if (isExpanded) {
        // Stepper: Sadece kendini ve altlarını kapat
        expandedIds.delete(id);
        descendants.forEach(descId => expandedIds.delete(descId));
        if (id === this.selectedId || descendants.includes(this.selectedId)) {
          this.selectedId = null;
        }
      } else {
        // Stepper: Sadece path'i aç
        this.expandedIds = new Set(path);
        this.handleSelect(id);
        return;
      }
    } else {
      if (expandedIds.has(id)) {
        // Normal: Kendini ve altlarını kapat
        expandedIds.delete(id);
        descendants.forEach(descId => expandedIds.delete(descId));
        if (this.selectedId === id || descendants.includes(this.selectedId)) {
          this.selectedId = null;
        }
      } else {
        // Normal: Sadece kendini aç
        expandedIds.add(id);
        this.handleSelect(id);
      }
    }
    this.expandedIds = expandedIds;
  };

  private handleSelect = itemId => {
    this.selectedId = itemId;
    this.tkItemClick.emit(itemId);
  };

  private findPathToNode(nodes, targetId, path = []): any[] {
    for (const node of nodes) {
      if (node.itemId === targetId) {
        return [...path, node.itemId];
      }
      if (node.children && node.children.length > 0) {
        const result = this.findPathToNode(node.children, targetId, [...path, node.itemId]);
        if (result.length) return result;
      }
    }
    return [];
  }

  private collectDescendantIds(node) {
    let ids = [];
    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        ids.push(child.itemId);
        ids = ids.concat(this.collectDescendantIds(child));
      }
    }
    return ids;
  }

  private findNodeById(nodes, targetId) {
    for (const node of nodes) {
      if (node.itemId === targetId) return node;
      if (node.children) {
        const found = this.findNodeById(node.children, targetId);
        if (found) return found;
      }
    }
    return null;
  }

  private getStepperColumns(nodes, columns = [], depth = 0) {
    if (!nodes || !nodes.length) return columns;
    columns[depth] = nodes;
    const expandedNode = nodes.find(node => this.expandedIds.has(node.itemId));
    if (expandedNode && expandedNode.children && expandedNode.children.length > 0) {
      this.getStepperColumns(expandedNode.children, columns, depth + 1);
    }
    return columns;
  }

  private renderNode = (node, depth = 0) => {
    const isDirectory = node.children && node.children.length > 0;
    const isExpanded = this.expandedIds.has(node.itemId);
    const isSelected = this.expandedIds.has(node.itemId) || this.selectedId === node.itemId;
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
              this.handleToggleUnified(node.itemId);
            } else {
              this.handleSelect(node.itemId);
            }
          }}
        >
          {isDirectory
            ? [
                this.showExpandIcon && this.mode === 'basic' && (
                  <span class={classNames('tk-tree-view', 'directory-icon', 'material-symbols-outlined', this.size)}>{isExpanded ? 'arrow_drop_down' : 'arrow_right'}</span>
                ),
                this.showFolderIcon && <span class={classNames('tk-tree-view', 'folder-icon', 'material-symbols-outlined', this.size)}>folder</span>,
              ]
            : this.showFileIcon && <span class={classNames('tk-tree-view', 'file-icon', 'material-symbols-outlined', this.size)}>insert_drive_file</span>}
          <span class={classNames('tk-tree-view', 'text', this.size)}>{node.label}</span>
          {isDirectory && this.showBadge && <span class={classNames('tk-tree-view', 'badge')}>{node.children?.length ?? 0}</span>}
        </span>
        {this.mode == 'basic' && isDirectory && isExpanded && node.children && node.children.length > 0 && (
          <div class={classNames('tk-tree-view', 'children')}>{node.children.map(child => this.renderNode(child, depth + 1))}</div>
        )}
      </div>
    );
  };

  render() {
    if (!this.treeData.length) return null;
    if (this.mode === 'stepper') {
      const columns = this.getStepperColumns(this.treeData);
      return (
        <div class={classNames('tk-tree-view', 'stepper')}>
          {columns.map((nodes, idx) => (
            <div class={classNames('tk-tree-view', 'column', 'divided')} key={idx}>
              {nodes.map(node => this.renderNode(node))}
            </div>
          ))}
        </div>
      );
    } else {
      const rootClasses = classNames('tk-tree-view', this.type, { disabled: this.disabled });
      return (
        <div class={rootClasses}>
          <div class={classNames('tk-tree-view', 'content')}>{this.treeData.map(node => this.renderNode(node))}</div>
        </div>
      );
    }
  }
}
