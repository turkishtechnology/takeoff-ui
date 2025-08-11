import { Component, ComponentInterface, Prop, h, State, Element, Event, EventEmitter } from '@stencil/core';
import classNames from 'classnames';
import { ITreeItem } from './interfaces';
import { IBadgeOptions } from '../../global/interfaces/IBadgeOptions';

/**
 * The `TkTreeview` component displays hierarchical data in a tree structure with expandable/collapsible nodes.
 * Uses array-based data structure for better performance and easier data management.
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

  /**
   * Tree view mode: 'basic' or 'stepper'.
   */
  @Prop() mode: 'basic' | 'stepper' = 'basic';

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
   * Event emitted when a tree item is clicked.
   */
  @Event({ eventName: 'tk-item-click' }) tkItemClick: EventEmitter<ITreeItem>;

  /**
   * Event emitted when the selected value changes.
   */
  @Event({ eventName: 'tk-change' }) tkChange: EventEmitter<string[]>;

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
        this.expandedPaths.delete(pathStr);
        descendants.forEach(descPath => this.expandedPaths.delete(descPath));
        if (pathStr === this.selectedPath || descendants.includes(this.selectedPath)) {
          this.selectedPath = null;
        }
      } else {
        // Stepper: Open path to this item
        this.expandedPaths = new Set(ancestors);
        this.handleSelect(pathStr, item);
        return;
      }
    } else {
      if (this.expandedPaths.has(pathStr)) {
        // Basic: Close self and descendants
        this.expandedPaths.delete(pathStr);
        descendants.forEach(descPath => this.expandedPaths.delete(descPath));
        if (this.selectedPath === pathStr || descendants.includes(this.selectedPath)) {
          this.selectedPath = null;
        }
      } else {
        // Basic: Open only self
        this.expandedPaths.add(pathStr);
        this.handleSelect(pathStr, item);
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
   * Handle checkbox change events.
   */
  private handleCheckboxChange = (checked: boolean, item: ITreeItem) => {
    const childKeys = this.getAllChildKeys(item);

    if (checked) {
      // Add current item and all children
      this.value = [...(this.value || []), item.key, ...childKeys];
    } else {
      // Remove current item and all children
      this.value = this.value?.filter(key => key !== item.key && !childKeys.includes(key));
    }
    this.tkChange.emit(this.value);
  };

  /**
   * Check if all child nodes are selected and return checkbox state
   */
  private getCheckboxState = (item: ITreeItem): { checked: boolean; indeterminate: boolean } => {
    const isDirectlySelected = this.value?.includes(item.key) || false;

    if (!item.children || item.children.length === 0) {
      return { checked: isDirectlySelected, indeterminate: false };
    }

    const childStates = item.children.map(child => this.getCheckboxState(child));
    const checkedChildren = childStates.filter(state => state.checked || state.indeterminate);
    const allChecked = childStates.every(state => state.checked);

    if (allChecked && checkedChildren.length === item.children.length) {
      return { checked: true, indeterminate: false };
    } else if (checkedChildren.length > 0) {
      return { checked: false, indeterminate: true };
    } else {
      return { checked: isDirectlySelected, indeterminate: false };
    }
  };

  /**
   * Handle item click events.
   */
  private handleItemClick = (pathStr: string, item: ITreeItem, isDirectory: boolean, isDisabled: boolean) => {
    if (this.disabled || isDisabled) return;
    if (isDirectory) {
      this.handleToggleUnified(pathStr, item);
    } else {
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

    return (
      <div class={nodeClass}>
        {this.showPointer && (isExpanded || isSelected) && <span class={classNames('tk-tree-view', 'pointer', this.size)}></span>}
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
            this.handleItemClick(pathStr, item, isDirectory, isDisabled);
          }}
        >
          {isDirectory && this.mode === 'basic' && <tk-icon variant={isSelected ? 'primary' : 'neutral'} icon={isExpanded ? 'arrow_drop_down' : 'arrow_right'} size={this.size} />}
          {this.selectable && (
            <tk-checkbox
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
          <span class={classNames('tk-tree-view', 'text', this.size)}>{item.label}</span>
          {isDirectory && this.showBadge && (
            <tk-badge
              count={item.children?.length ?? 0}
              size={this.size}
              type={this.badgeOptions?.type ?? 'filledlight'}
              variant={this.badgeOptions?.variant ?? 'neutral'}
              rounded={this.badgeOptions?.rounded ?? true}
              icon={this.badgeOptions?.icon}
              iconPosition={this.badgeOptions?.iconPosition}
            />
          )}
          {this.mode === 'stepper' && isDirectory && item.children && item.children.length > 0 && (
            <tk-icon variant={isSelected ? 'primary' : 'neutral'} icon={!isExpanded ? 'keyboard_arrow_down' : 'keyboard_arrow_right'} size={this.size} />
          )}
        </span>
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
