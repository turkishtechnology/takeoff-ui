import { Component, ComponentInterface, Prop, h, State, Element, Event, EventEmitter, Watch } from '@stencil/core';
import classNames from 'classnames';
import { ITreeItem } from './interfaces';
import { IBadgeOptions } from '../../global/interfaces/IBadgeOptions';

/**
 * The `TkTreeview` component displays hierarchical data in a tree structure with expandable/collapsible nodes.
 * Uses array-based data structure for better performance and easier data management.
 *
 * ## Controlled vs Uncontrolled Mode
 *
 * **Uncontrolled Mode** (default):
 * - Component manages its own expansion state internally
 * - Use `expandAll` prop to control initial expansion
 * - The component automatically handles node expand/collapse
 *
 * **Controlled Mode** (when `expandedKeys` is provided):
 * - Parent component fully controls which nodes are expanded via `expandedKeys` prop
 * - `expandAll` prop is ignored
 * - Must listen to `tk-expand-change` and update `expandedKeys`.
 * - Parent has complete control over expansion state
 * - Invalid paths in `expandedKeys` are logged as errors and ignored.
 *
 * @react `import { TkTreeView } from '@takeoff-ui/react'`
 * @vue `import { TkTreeView } from '@takeoff-ui/vue'`
 * @angular `import { TkTreeView } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-tree-view',
  styleUrl: 'tk-tree-view.scss',
  shadow: false,
})
export class TkTreeView implements ComponentInterface {
  @Element() el: HTMLElement;

  @State() expandedPaths: Set<string> = new Set();
  @State() selectedPath: string | null = null;

  /**
   * Array of tree items data. This is the primary way to provide data to the tree view.
   */
  @Prop() items: ITreeItem[] = [];
  @Watch('items')
  itemsChanged() {
    this.initializeExpandedPaths();
  }

  /**
   * Tree view mode: 'basic' or 'stepper'.
   */
  @Prop() mode: 'basic' | 'stepper' = 'basic';
  @Watch('mode')
  modeChanged() {
    this.initializeExpandedPaths();
  }

  /**
   * Tree view type: 'basic', 'divided', or 'light'.
   */
  @Prop() type: 'basic' | 'divided' | 'light' = 'basic';

  /**
   * Tree view size: 'large', 'base' or 'small'.
   */
  @Prop() size: 'large' | 'base' | 'small' = 'base';

  /**
   * If true, disables all interaction with the tree view.
   */
  @Prop() disabled: boolean = false;

  /**
   * Icon for branch items (items with children). When empty, no icon is shown.
   */
  @Prop() branchIcon: string = '';

  /**
   * Icon for leaf items (items without children). When empty, no icon is shown.
   */
  @Prop() leafIcon: string = '';

  /**
   * Show/hide the badge for children count on directories.
   */
  @Prop() showBadge: boolean = true;

  /**
   * Show/hide badges with zero count. Default is true.
   * When false, badges with 0 count will be hidden (works for both selected count and children count).
   */
  @Prop() showZeroCountBadges: boolean = true;

  /**
   * Badge customization options for children count display.
   */
  @Prop() badgeOptions?: IBadgeOptions;

  /**
   * The value of the selected tree item.
   */
  @Prop() value?: string[];

  /**
   * If true, enables checkbox selection for tree items.
   */
  @Prop() selectable: boolean = false;

  /**
   * Show/hide the pointer icon for selected items.
   */
  @Prop() showPointer: boolean = true;

  /**
   * Selection strategy for checkboxes:
   * - 'all': selecting a node selects the node itself and all descendants
   * - 'leaf': selecting a node selects only leaf descendants (and leaf itself if it is a leaf)
   */
  @Prop() selectionStrategy: 'all' | 'leaf' = 'all';

  /**
   * If true, expands all nodes in basic mode.
   * Note: This prop is ignored when expandedKeys is provided (controlled mode).
   */
  @Prop() expandAll: boolean = false;
  @Watch('expandAll')
  expandAllChanged(newValue: boolean, oldValue: boolean) {
    if (newValue !== oldValue) {
      this.initializeExpandedPaths();
    }
  }

  /**
   * Array of paths that should be expanded. Use this for controlled expansion state.
   * Paths are represented as hyphen-separated indices (e.g., "0", "0-1", "0-1-2").
   *
   * **Controlled Mode:**
   * - When this prop is provided (any array, including empty []), the component enters controlled mode
   * - Parent component must manage expansion state and update this prop
   * - `expandAll` prop will be ignored
   * - Use with `tk-expand-change` event for two-way binding
   *
   * **Note:**
   * - Parent paths are automatically included. For example, setting ["0-1-2"] will also expand "0" and "0-1"
   * - Pass `[]` (empty array) to collapse all nodes in controlled mode
   * - Do not pass this prop (or pass `undefined`) for uncontrolled mode
   */
  @Prop({ mutable: true }) expandedKeys?: string[];
  @Watch('expandedKeys')
  expandedKeysChanged(newValue: string[]) {
    if (Array.isArray(newValue)) {
      this.expandedPaths = this.expandKeysWithAncestors(newValue);

      // In controlled mode, clear selection if the selected node is no longer expanded
      if (this.selectedPath !== null) {
        // Check if the selected path or any of its ancestors is collapsed
        const selectedPathParts = this.selectedPath.split('-');
        let isSelectedPathVisible = true;

        // Check each ancestor up to and including the selected path
        for (let i = 1; i <= selectedPathParts.length; i++) {
          const ancestorPath = selectedPathParts.slice(0, i).join('-');
          // For directories, they need to be expanded to show their children
          if (i < selectedPathParts.length && !this.expandedPaths.has(ancestorPath)) {
            isSelectedPathVisible = false;
            break;
          }
        }

        // Clear selection if not visible
        if (!isSelectedPathVisible) {
          this.selectedPath = null;
        }
      }
    }
  }

  /**
   * Event emitted when a tree item is clicked.
   */
  @Event({ eventName: 'tk-item-click' }) tkItemClick: EventEmitter<ITreeItem>;

  /**
   * Event emitted when the selected value changes.
   */
  @Event({ eventName: 'tk-change' }) tkChange: EventEmitter<string[]>;

  /**
   * Event emitted when the expanded paths change in controlled mode.
   */
  @Event({ eventName: 'tk-expand-change' }) tkExpandChange: EventEmitter<string[]>;

  componentWillLoad() {
    this.initializeExpandedPaths();
  }

  /**
   * Check if the component is in controlled mode.
   * Controlled mode is when the parent component manages expansion state via expandedKeys prop.
   * We use Array.isArray() instead of checking undefined to handle edge cases like null.
   */
  private isControlled(): boolean {
    return Array.isArray(this.expandedKeys);
  }

  /**
   * Validate if a path exists in the tree structure
   */
  private isValidPath(path: string): boolean {
    const indices = path.split('-').map(Number);
    let currentLevel = this.items;

    for (const index of indices) {
      if (!currentLevel || index < 0 || index >= currentLevel.length) {
        return false;
      }
      const item = currentLevel[index];
      currentLevel = item.children;
    }

    return true;
  }

  /**
   * Expand keys and automatically include all ancestor paths
   * Example: ["0-1-2"] -> Set(["0", "0-1", "0-1-2"])
   */
  private expandKeysWithAncestors(keys: string[]): Set<string> {
    const expandedSet = new Set<string>();

    keys.forEach(key => {
      // Validate the path
      if (!this.isValidPath(key)) {
        console.error('Invalid path given to expandedKeys prop:', key);
        return;
      }

      // Add the key itself
      expandedSet.add(key);

      // Add all ancestor paths
      const parts = key.split('-');
      for (let i = 1; i < parts.length; i++) {
        const ancestorPath = parts.slice(0, i).join('-');
        expandedSet.add(ancestorPath);
      }
    });

    return expandedSet;
  }
  /**
   * Collect all descendant paths recursively
   */
  private collectDescendantPaths(pathStr: string, item: ITreeItem): string[] {
    const paths: string[] = [];

    if (item.children && item.children.length > 0) {
      item.children.forEach((child, index) => {
        const childPath = `${pathStr}-${index}`;
        paths.push(childPath);
        paths.push(...this.collectDescendantPaths(childPath, child));
      });
    }

    return paths;
  }

  /**
   * Initialize expanded paths based on mode and expandAll configuration
   */
  private initializeExpandedPaths() {
    if (!this.items || this.items.length === 0) {
      this.expandedPaths = new Set<string>();
      return;
    }

    // Skip initialization if expandedKeys is being used for control
    if (this.isControlled()) {
      this.expandedPaths = this.expandKeysWithAncestors(this.expandedKeys);
      return;
    }

    if (!this.expandAll) return;

    const expanded = new Set<string>();

    if (this.mode === 'basic') {
      // Expand all directory nodes
      const traverse = (nodes: ITreeItem[], base: string = '') => {
        nodes.forEach((node, idx) => {
          const path = base ? `${base}-${idx}` : `${idx}`;
          if (node.children && node.children.length > 0) {
            expanded.add(path);
            traverse(node.children, path);
          }
        });
      };
      traverse(this.items);
    } else if (this.mode === 'stepper') {
      // Expand the first directory all the way down
      let level = this.items;
      let base = '';
      while (level && level.length > 0) {
        const idx = level.findIndex(n => n.children && n.children.length > 0);
        if (idx === -1) break;
        const path = base ? `${base}-${idx}` : `${idx}`;
        expanded.add(path);
        base = path;
        level = level[idx].children;
      }
    }

    this.expandedPaths = expanded;
  }

  /**
   * Get stepper columns for stepper mode display.
   */
  private getStepperColumns(): { items: ITreeItem[]; basePath: string }[] {
    const columns: { items: ITreeItem[]; basePath: string }[] = [];
    let currentLevel = this.items;
    let currentBasePath = '';

    while (currentLevel && currentLevel.length > 0) {
      columns.push({ items: currentLevel, basePath: currentBasePath });

      const expandedItem = currentLevel.find((_, index) => {
        const itemPath = currentBasePath ? `${currentBasePath}-${index}` : `${index}`;
        return this.expandedPaths.has(itemPath);
      });

      if (expandedItem && expandedItem.children && expandedItem.children.length > 0) {
        const expandedIndex = currentLevel.indexOf(expandedItem);
        currentBasePath = currentBasePath ? `${currentBasePath}-${expandedIndex}` : `${expandedIndex}`;
        currentLevel = expandedItem.children;
      } else {
        break;
      }
    }

    return columns;
  }

  private handleToggleUnified = (pathStr: string, item: ITreeItem) => {
    const descendants = this.collectDescendantPaths(pathStr, item);

    if (this.mode === 'stepper') {
      // Generate ancestor paths inline: "0-1-2" -> ["0", "0-1", "0-1-2"]
      const pathParts = pathStr.split('-');
      const ancestors: string[] = [];
      for (let i = 1; i <= pathParts.length; i++) {
        ancestors.push(pathParts.slice(0, i).join('-'));
      }

      const isExpanded = this.expandedPaths.has(pathStr);

      if (isExpanded) {
        // Stepper: Close self and descendants
        if (!this.isControlled()) {
          this.expandedPaths.delete(pathStr);
          descendants.forEach(descPath => this.expandedPaths.delete(descPath));
        }
        if (pathStr === this.selectedPath || descendants.includes(this.selectedPath)) {
          this.selectedPath = null;
        }
        // Emit new state for controlled mode
        if (this.isControlled()) {
          const newPaths = new Set(this.expandedPaths);
          newPaths.delete(pathStr);
          descendants.forEach(descPath => newPaths.delete(descPath));
          this.tkExpandChange.emit(Array.from(newPaths));
        }
      } else {
        // Stepper: Open path to this item
        if (!this.isControlled()) {
          this.expandedPaths = new Set(ancestors);
        }
        this.handleSelect(pathStr, item);
        // Emit new state for controlled mode
        if (this.isControlled()) {
          this.tkExpandChange.emit(ancestors);
        }
        return;
      }
    } else {
      if (this.expandedPaths.has(pathStr)) {
        // Basic: Close self and descendants
        if (!this.isControlled()) {
          this.expandedPaths.delete(pathStr);
          descendants.forEach(descPath => this.expandedPaths.delete(descPath));
        }
        if (this.selectedPath === pathStr || descendants.includes(this.selectedPath)) {
          this.selectedPath = null;
        }
        // Emit new state for controlled mode
        if (this.isControlled()) {
          const newPaths = new Set(this.expandedPaths);
          newPaths.delete(pathStr);
          descendants.forEach(descPath => newPaths.delete(descPath));
          this.tkExpandChange.emit(Array.from(newPaths));
        }
      } else {
        // Basic: Open only self
        if (!this.isControlled()) {
          this.expandedPaths.add(pathStr);
        }
        this.handleSelect(pathStr, item);
        // Emit new state for controlled mode
        if (this.isControlled()) {
          const newPaths = new Set(this.expandedPaths);
          newPaths.add(pathStr);
          this.tkExpandChange.emit(Array.from(newPaths));
        }
      }
    }
  };

  private handleSelect = (pathStr: string, item: ITreeItem) => {
    this.selectedPath = pathStr;
    this.tkItemClick.emit(item);
  };

  /**
   * Get all child keys recursively
   */
  private getAllChildKeys = (item: ITreeItem): string[] => {
    const keys: string[] = [];
    if (item.children && item.children.length > 0) {
      item.children.forEach(child => {
        keys.push(child.key);
        keys.push(...this.getAllChildKeys(child));
      });
    }
    return keys;
  };

  /**
   * Get all leaf descendant keys including the item's own key if it is a leaf
   */
  private getLeafKeys = (item: ITreeItem): string[] => {
    const keys: string[] = [];
    const isLeaf = !item.children || item.children.length === 0;
    if (isLeaf) {
      if (item.key) keys.push(item.key);
      return keys;
    }
    for (const child of item.children) {
      keys.push(...this.getLeafKeys(child));
    }
    return keys;
  };

  /**
   * Handle checkbox change events.
   */
  private handleCheckboxChange = (checked: boolean, item: ITreeItem) => {
    if (this.selectionStrategy === 'all') {
      const childKeys = this.getAllChildKeys(item);
      if (checked) {
        // Add current item and all children
        this.value = [...(this.value || []), item.key, ...childKeys];
      } else {
        // Remove current item and all children
        this.value = this.value?.filter(key => key !== item.key && !childKeys.includes(key));
      }
    } else {
      // 'leaf' strategy
      const leafKeys = this.getLeafKeys(item);
      if (checked) {
        this.value = [...(this.value || []), ...leafKeys];
      } else {
        this.value = (this.value || []).filter(key => !leafKeys.includes(key));
      }
      // Ensure we don't keep non-leaf keys selected under leaf strategy
      const allLeafsUnderRoot = this.items.flatMap(root => this.getLeafKeys(root));
      this.value = (this.value || []).filter(key => allLeafsUnderRoot.includes(key));
    }

    // Deduplicate and clean undefined/null
    this.value = Array.from(new Set((this.value || []).filter((k): k is string => !!k)));
    this.tkChange.emit(this.value);
  };

  /**
   * Check if all child nodes are selected and return checkbox state
   */
  private getCheckboxState = (item: ITreeItem): { checked: boolean; indeterminate: boolean } => {
    const isLeaf = !item.children || item.children.length === 0;
    const isDirectlySelected = this.value?.includes(item.key) || false;

    // Leaf nodes: direct selection matters in both strategies
    if (isLeaf) {
      return { checked: isDirectlySelected, indeterminate: false };
    }

    // Directory nodes: compute based on children
    const childStates = item.children.map(child => this.getCheckboxState(child));
    const checkedChildren = childStates.filter(state => state.checked || state.indeterminate);
    const allChecked = childStates.every(state => state.checked);

    if (this.selectionStrategy === 'all') {
      if (allChecked && checkedChildren.length === item.children.length) {
        return { checked: true, indeterminate: false };
      } else if (checkedChildren.length > 0) {
        return { checked: false, indeterminate: true };
      } else {
        return { checked: isDirectlySelected, indeterminate: false };
      }
    } else {
      // 'leaf' strategy: ignore isDirectlySelected for directories
      if (allChecked && checkedChildren.length === item.children.length) {
        return { checked: true, indeterminate: false };
      } else if (checkedChildren.length > 0) {
        return { checked: false, indeterminate: true };
      } else {
        return { checked: false, indeterminate: false };
      }
    }
  };

  /**
   * Count selected items within the subtree rooted at the given item
   */
  private getSelectedCount = (item: ITreeItem): number => {
    let count = 0;
    if (item.key && this.value?.includes(item.key)) {
      count += 1;
    }
    if (item.children && item.children.length > 0) {
      for (const child of item.children) {
        count += this.getSelectedCount(child);
      }
    }
    return count;
  };

  /**
   * Handle item click events.
   */
  private handleItemClick = (pathStr: string, item: ITreeItem, isDisabled: boolean, isDirectory: boolean) => {
    if (this.disabled || isDisabled) return;
    if (isDirectory) {
      this.handleToggleUnified(pathStr, item);
    } else {
      // In stepper mode, when a file (leaf) is clicked, collapse any expanded
      // directory at the same level by keeping only the ancestors of the file's parent
      if (this.mode === 'stepper') {
        const parentPath = pathStr.includes('-') ? pathStr.split('-').slice(0, -1).join('-') : '';
        const ancestors: string[] = [];
        if (parentPath) {
          const parentParts = parentPath.split('-');
          for (let i = 1; i <= parentParts.length; i++) {
            ancestors.push(parentParts.slice(0, i).join('-'));
          }
        }
        if (this.isControlled()) {
          this.tkExpandChange.emit(ancestors);
        } else {
          this.expandedPaths = new Set(ancestors);
        }
      }
      this.handleSelect(pathStr, item);
    }
  };

  private renderItem = (item: ITreeItem, basePath: string = '', index: number, depth: number = 0) => {
    const pathStr = basePath ? `${basePath}-${index}` : `${index}`;
    const isDirectory = !!(item.children && item.children.length > 0);
    const isExpanded = this.expandedPaths.has(pathStr);
    const isSelected = this.selectedPath === pathStr;
    const isDisabled = this.disabled || item.disabled;

    const nodeClass = classNames('tk-tree-view', 'node', {
      directory: isDirectory,
      file: !isDirectory,
      expanded: isExpanded,
      selected: isSelected,
      disabled: isDisabled,
    });
    const selectedCount = this.getSelectedCount(item);

    return (
      <div class={nodeClass}>
        {this.showPointer && (isExpanded || isSelected) && <span class={classNames('tk-tree-view', 'pointer', this.size)}></span>}
        <div
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
            this.handleItemClick(pathStr, item, isDisabled, isDirectory);
          }}
        >
          {isDirectory && this.mode === 'basic' && <tk-icon variant={isSelected ? 'primary' : 'neutral'} icon={isExpanded ? 'arrow_drop_down' : 'arrow_right'} size={this.size} />}
          {this.selectable && (
            <tk-checkbox
              onClick={e => {
                e.stopPropagation();
              }}
              value={this.getCheckboxState(item).checked}
              indeterminate={this.getCheckboxState(item).indeterminate}
              disabled={isDisabled}
              onTk-change={e => {
                e.stopPropagation();
                this.handleCheckboxChange(e.detail, item);
              }}
            />
          )}
          {isDirectory && this.branchIcon && <tk-icon icon={this.branchIcon} variant={isSelected ? 'primary' : 'neutral'} size={this.size} />}
          {!isDirectory && this.leafIcon && <tk-icon icon={this.leafIcon} variant={isSelected ? 'primary' : 'neutral'} size={this.size} />}
          <div class={classNames('tk-tree-view', 'text-container', this.size)}>
            <span class={classNames('tk-tree-view', 'text', this.size)}>{item.label}</span>
            {(() => {
              const badgeCount = this.selectable ? selectedCount : item.children?.length;
              const shouldShowBadge = isDirectory && this.showBadge && (this.showZeroCountBadges || badgeCount > 0);
              return (
                shouldShowBadge && (
                  <tk-badge
                    count={badgeCount}
                    size={this.size}
                    type={this.badgeOptions?.type ?? 'filledlight'}
                    variant={this.badgeOptions?.variant ?? 'neutral'}
                    rounded={this.badgeOptions?.rounded ?? true}
                    icon={this.badgeOptions?.icon}
                    iconPosition={this.badgeOptions?.iconPosition}
                  />
                )
              );
            })()}
          </div>
          {this.mode === 'stepper' && isDirectory && item.children && item.children.length > 0 && (
            <tk-icon variant={isSelected ? 'primary' : 'neutral'} icon={!isExpanded ? 'keyboard_arrow_down' : 'keyboard_arrow_right'} size={this.size} />
          )}
        </div>
        {this.mode === 'basic' && isDirectory && isExpanded && item.children && item.children.length > 0 && (
          <div class={classNames('tk-tree-view', 'children')}>{item.children.map((child, childIndex) => this.renderItem(child, pathStr, childIndex, depth + 1))}</div>
        )}
      </div>
    );
  };

  render() {
    if (!this.items || !this.items.length) return null;

    if (this.mode === 'stepper') {
      const columns = this.getStepperColumns();
      return (
        <div class={classNames('tk-tree-view', 'stepper')}>
          {columns.map((column, idx) => (
            <div class={classNames('tk-tree-view', 'column', 'divided')} key={idx}>
              {column.items.map((item, itemIndex) => this.renderItem(item, column.basePath, itemIndex))}
            </div>
          ))}
        </div>
      );
    } else {
      const rootClasses = classNames('tk-tree-view', this.type, { disabled: this.disabled });
      return (
        <div class={rootClasses}>
          <div class={classNames('tk-tree-view', 'content')}>{this.items.map((item, index) => this.renderItem(item, '', index))}</div>
        </div>
      );
    }
  }
}
