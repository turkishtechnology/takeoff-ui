import { Component, ComponentInterface, Prop, h, State, Element, Event, EventEmitter } from '@stencil/core';
import classNames from 'classnames';

/**
 * The `TkTreeview` component displays hierarchical data in a tree structure with expandable/collapsible nodes.
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
  private observer: MutationObserver;
  private treeMap: Map<string, any> = new Map();

  @Element() el: HTMLElement;

  @State() expandedIds: Set<string | number> = new Set();
  @State() selectedId: string | number = null;
  @State() treeData: any[] = [];

  /**
   * Tree view mode: 'basic' or 'stepper'.
   */
  @Prop() mode: 'basic' | 'stepper' = 'basic';

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

  /**
   * Event emitted when a tree item is clicked.
   */
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

  /**
   * Girdi stringinden deterministik bir hash değeri üretir.
   * Ağacın parent, index ve label bilgilerine göre stabil ve benzersiz ID'ler oluşturmak için kullanılır.
   * Aynı node yapısı her zaman aynı ID'yi üretir; bu, React uyumluluğu ve state'in korunması için kritiktir.
   */
  private hashString(str: string): string {
    let hash = 0,
      i,
      chr;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Returns the full path from root to this node as a string, using labels.
   * This helps ensure itemId uniqueness even for nodes with the same label, parent, or index.
   */
  private getNodePath(label: string, parent: any): string {
    let path = [];
    let current = parent;
    while (current) {
      path.unshift(current.label);
      current = current.parent;
    }
    path.push(label);
    return path.join('/');
  }

  extractTreeData(elements: Element[], parent: any = null): any[] {
    const nodes = Array.from(elements)
      .filter(el => el.tagName.toLowerCase() === 'tk-tree-item')
      .map((el, idx) => {
        let itemId = (el as any).itemId || el.getAttribute('item-id');
        const label = (el as any).label || el.getAttribute('label') || '';
        const childrenEls = Array.from(el.children);
        if (!itemId) {
          // Use label, parentId, index, and full path for deterministic uniqueness
          const parentId = parent?.itemId || 'root';
          const path = this.getNodePath(label, parent);
          const hash = this.hashString(`${label}|${parentId}|${idx}|${path}`);
          itemId = `auto-id-${hash}`;
        }
        itemId = String(itemId);
        const node: any = {
          itemId,
          label,
          parent,
          children: [],
        };
        node.children = this.extractTreeData(childrenEls, node);
        node.hasChildren = node.children.length > 0;
        this.treeMap.set(itemId, node);
        return node;
      });
    console.log('treeMap:', Array.from(this.treeMap.entries()));
    return nodes;
  }

  private handleToggleUnified = id => {
    const expandedIds = new Set(this.expandedIds);
    const clickedNode = this.findNodeById(id);
    const descendants = clickedNode ? this.collectDescendantIds(clickedNode) : [];

    if (this.mode === 'stepper') {
      const path = this.findPathToNode(id);
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

  /**
   * O(1) lookup for a node by itemId using treeMap.
   */
  private findNodeById(itemId: string | number) {
    return this.treeMap.get(String(itemId));
  }

  /**
   * Collect all descendant itemIds of a node using a stack (non-recursive).
   */
  private collectDescendantIds(node: any): (string | number)[] {
    const ids: (string | number)[] = [];
    const stack = [...(node.children || [])];
    while (stack.length) {
      const current = stack.pop();
      ids.push(current.itemId);
      if (current.children && current.children.length > 0) {
        stack.push(...current.children);
      }
    }
    return ids;
  }

  /**
   * Find the path from root to a node by walking up parent references.
   * Returns an array of itemIds from root to the node.
   */
  private findPathToNode(itemId: string | number): (string | number)[] {
    const path: (string | number)[] = [];
    let node = this.treeMap.get(String(itemId));
    while (node) {
      path.unshift(node.itemId);
      node = node.parent;
    }
    return path;
  }

  /**
   * Stepper modunda, her seviyedeki (kolon) node'ları bulup bir dizi olarak döner.
   * Her kolon, o seviyedeki node'ları içerir. Sadece genişletilmiş (expanded) node'ların çocukları bir sonraki kolonda gösterilir.
   * Bu, stepper tarzı gezinme için gereklidir.
   */
  private getStepperColumns(): any[][] {
    const columns: any[][] = [];
    let currentLevel = this.treeData;
    while (currentLevel && currentLevel.length > 0) {
      columns.push(currentLevel);
      const expandedNode = currentLevel.find(node => this.expandedIds.has(node.itemId));
      if (expandedNode && expandedNode.children && expandedNode.children.length > 0) {
        currentLevel = expandedNode.children;
      } else {
        break;
      }
    }
    return columns;
  }

  /**
   * Bir node'a tıklandığında çalışır. Eğer node bir dizin (klasör) ise açma/kapama işlemini tetikler,
   * değilse (dosya ise) seçili hale getirir. Eğer tree veya node disable ise hiçbir işlem yapmaz.
   */
  private handleNodeClick = (node, isDirectory, isDisabled) => {
    if (this.disabled || isDisabled) return;
    if (isDirectory) {
      this.handleToggleUnified(node.itemId);
    } else {
      this.handleSelect(node.itemId);
    }
  };

  private renderNode = (node, depth = 0) => {
    const isDirectory = node.hasChildren;
    const isExpanded = this.expandedIds.has(node.itemId);
    const isSelected = this.expandedIds.has(node.itemId) || this.selectedId === node.itemId;
    const isDisabled = this.disabled || node.disabled;
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
            this.handleNodeClick(node, isDirectory, isDisabled);
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
      const columns = this.getStepperColumns();
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
