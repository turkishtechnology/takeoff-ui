import { p as proxyCustomElement, H, c as createEvent, h } from './p-F5eU3Bfi.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { d as defineCustomElement$4 } from './p-Bny2LZcO.js';
import { d as defineCustomElement$3 } from './p-Byx8wTce.js';
import { d as defineCustomElement$2 } from './p-75KyitY6.js';

const tkTreeViewCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}.tk-tree-view{display:inline-flex;flex-direction:column;align-items:flex-start;background:transparent}.tk-tree-view.stepper{display:flex;flex-direction:row;align-items:flex-start;gap:var(--tree-gap, 12px)}.tk-tree-view.stepper .column .node .tk-tree-view.pointer{height:100%}.tk-tree-view.divided{padding:var(--tree-v-padding, 8px) var(--tree-h-padding, 10px);border-radius:8px;border:1px solid var(--border-light, #e1e4ea)}.tk-tree-view.light{padding:var(--tree-v-padding, 8px) var(--tree-h-padding, 10px);border-radius:8px;border:1px solid var(--border-light, #e1e4ea);background:var(--background-lightest, #f9fafc)}.tk-tree-view.content{width:100%;display:flex;flex-direction:column;gap:var(--tree-gap, 2px)}.tk-tree-view.node{display:flex;align-items:flex-start;border-radius:4px;flex-direction:column;position:relative}.tk-tree-view.node.expanded{font-weight:500;gap:var(--tree-gap, 4px)}.tk-tree-view.node.directory{font-weight:500}.tk-tree-view.node.file{font-weight:400}.tk-tree-view.node .tk-tree-view.pointer{background-color:var(--primary-base);width:4px;border-radius:0 4px 4px 0;position:absolute;left:0;top:0;z-index:1}.tk-tree-view.node .tk-tree-view.pointer.base{height:32px}.tk-tree-view.node .tk-tree-view.pointer.small{height:24px}.tk-tree-view.node .tk-tree-view.pointer.large{height:44px}.tk-tree-view.label{display:flex;flex-direction:row;align-items:center;cursor:pointer;color:var(--text-dark, #525866);user-select:none;border-radius:4px}.tk-tree-view.label.large{gap:var(--items-tree-large-gap, 10px);padding:var(--items-tree-large-v-padding, 10px) var(--items-tree-large-h-padding, 12px)}.tk-tree-view.label.large .tk-icon{font-size:20px}.tk-tree-view.label.base{gap:var(--items-tree-base-gap, 8px);padding:var(--items-tree-base-v-padding, 6px) var(--items-tree-base-h-padding, 8px)}.tk-tree-view.label.base .tk-icon{font-size:20px}.tk-tree-view.label.small{gap:var(--items-tree-small-gap, 4px);padding:var(--items-tree-small-v-padding, 4px) var(--items-tree-small-h-padding, 6px)}.tk-tree-view.label.small .tk-icon{font-size:16px}.tk-tree-view.label.selected{background:var(--primary-lightest, #fae6e8);color:var(--text-darkest, #222530)}.tk-tree-view.label.disabled{color:var(--text-sub-base, #99a0ae);cursor:not-allowed}.tk-tree-view.label:not(.disabled,.selected):hover{color:var(--text-darkest, #222530);background:var(--background-lightest, #f9fafc)}.tk-tree-view.text{font-family:var(--body-s-font, Geologica);font-style:normal;font-weight:400}.tk-tree-view.text.base{font-size:var(--body-s-size, 14px);line-height:var(--body-s-line-height, 20px)}.tk-tree-view.text.small{font-size:var(--body-2xs-size, 11px);line-height:var(--line-height-xxs-normal, 16px)}.tk-tree-view.text.large{font-size:var(--body-m-base-size, 16px);line-height:var(--body-m-base-line-height, 24px)}.tk-tree-view.children{margin-left:18px;border-left:1px solid var(--border-light, #e1e4ea);padding-left:10px;gap:2px}';

const TkTreeView$1 = /*@__PURE__*/ proxyCustomElement(
  class TkTreeView extends H {
    constructor() {
      super();
      this.__registerHost();
      this.tkItemClick = createEvent(this, 'tk-item-click', 7);
      this.tkChange = createEvent(this, 'tk-change', 7);
      this.expandedPaths = new Set();
      this.selectedPath = null;
      /**
       * Array of tree items data. This is the primary way to provide data to the tree view.
       */
      this.items = [];
      /**
       * Tree view mode: 'basic' or 'stepper'.
       */
      this.mode = 'basic';
      /**
       * Tree view type: 'basic', 'divided', or 'light'.
       */
      this.type = 'basic';
      /**
       * Tree view size: 'large', 'base' or 'small'.
       */
      this.size = 'base';
      /**
       * If true, disables all interaction with the tree view.
       */
      this.disabled = false;
      /**
       * Icon for branch items (items with children). When empty, no icon is shown.
       */
      this.branchIcon = '';
      /**
       * Icon for leaf items (items without children). When empty, no icon is shown.
       */
      this.leafIcon = '';
      /**
       * Show/hide the badge for children count on directories.
       */
      this.showBadge = true;
      /**
       * If true, enables checkbox selection for tree items.
       */
      this.selectable = false;
      /**
       * Show/hide the pointer icon for selected items.
       */
      this.showPointer = true;
      this.handleToggleUnified = (pathStr, item) => {
        const descendants = this.collectDescendantPaths(pathStr, item);
        if (this.mode === 'stepper') {
          // Generate ancestor paths inline: "0-1-2" -> ["0", "0-1", "0-1-2"]
          const pathParts = pathStr.split('-');
          const ancestors = [];
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
      this.handleSelect = (pathStr, item) => {
        this.selectedPath = pathStr;
        this.tkItemClick.emit(item);
      };
      /**
       * Get all child keys recursively
       */
      this.getAllChildKeys = item => {
        const keys = [];
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
      this.handleCheckboxChange = (checked, item) => {
        var _a;
        const childKeys = this.getAllChildKeys(item);
        if (checked) {
          // Add current item and all children
          this.value = [...(this.value || []), item.key, ...childKeys];
        } else {
          // Remove current item and all children
          this.value = (_a = this.value) === null || _a === void 0 ? void 0 : _a.filter(key => key !== item.key && !childKeys.includes(key));
        }
        this.tkChange.emit(this.value);
      };
      /**
       * Check if all child nodes are selected and return checkbox state
       */
      this.getCheckboxState = item => {
        var _a;
        const isDirectlySelected = ((_a = this.value) === null || _a === void 0 ? void 0 : _a.includes(item.key)) || false;
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
      this.handleItemClick = (pathStr, item, isDirectory, isDisabled) => {
        if (this.disabled || isDisabled) return;
        if (isDirectory) {
          this.handleToggleUnified(pathStr, item);
        } else {
          this.handleSelect(pathStr, item);
        }
      };
      this.renderItem = (item, basePath = '', index, depth = 0) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
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
        return h(
          'div',
          { class: nodeClass },
          this.showPointer && (isExpanded || isSelected) && h('span', { class: classNames('tk-tree-view', 'pointer', this.size) }),
          h(
            'span',
            {
              class: classNames(
                'tk-tree-view',
                'label',
                {
                  selected: isSelected,
                  disabled: isDisabled,
                },
                this.size,
              ),
              onClick: () => {
                this.handleItemClick(pathStr, item, isDirectory, isDisabled);
              },
            },
            isDirectory &&
              this.mode === 'basic' &&
              h('tk-icon', { variant: isSelected ? 'primary' : 'neutral', icon: isExpanded ? 'arrow_drop_down' : 'arrow_right', size: this.size }),
            this.selectable &&
              h('tk-checkbox', {
                'value': this.getCheckboxState(item).checked,
                'indeterminate': this.getCheckboxState(item).indeterminate,
                'disabled': isDisabled,
                'onTk-change': e => {
                  e.stopPropagation();
                  this.handleCheckboxChange(e.detail, item);
                },
              }),
            isDirectory && this.branchIcon && h('tk-icon', { icon: this.branchIcon, variant: isSelected ? 'primary' : 'neutral', size: this.size }),
            !isDirectory && this.leafIcon && h('tk-icon', { icon: this.leafIcon, variant: isSelected ? 'primary' : 'neutral', size: this.size }),
            h('span', { class: classNames('tk-tree-view', 'text', this.size) }, item.label),
            isDirectory &&
              this.showBadge &&
              h('tk-badge', {
                count: (_b = (_a = item.children) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0,
                size: this.size,
                type: (_d = (_c = this.badgeOptions) === null || _c === void 0 ? void 0 : _c.type) !== null && _d !== void 0 ? _d : 'filledlight',
                variant: (_f = (_e = this.badgeOptions) === null || _e === void 0 ? void 0 : _e.variant) !== null && _f !== void 0 ? _f : 'neutral',
                rounded: (_h = (_g = this.badgeOptions) === null || _g === void 0 ? void 0 : _g.rounded) !== null && _h !== void 0 ? _h : true,
                icon: (_j = this.badgeOptions) === null || _j === void 0 ? void 0 : _j.icon,
                iconPosition: (_k = this.badgeOptions) === null || _k === void 0 ? void 0 : _k.iconPosition,
              }),
            this.mode === 'stepper' &&
              isDirectory &&
              item.children &&
              item.children.length > 0 &&
              h('tk-icon', { variant: isSelected ? 'primary' : 'neutral', icon: !isExpanded ? 'keyboard_arrow_down' : 'keyboard_arrow_right', size: this.size }),
          ),
          this.mode === 'basic' &&
            isDirectory &&
            isExpanded &&
            item.children &&
            item.children.length > 0 &&
            h(
              'div',
              { class: classNames('tk-tree-view', 'children') },
              item.children.map((child, childIndex) => this.renderItem(child, pathStr, childIndex, depth + 1)),
            ),
        );
      };
    }
    /**
     * Collect all descendant paths recursively
     */
    collectDescendantPaths(pathStr, item) {
      const paths = [];
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
    getStepperColumns() {
      const columns = [];
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
    render() {
      if (!this.items || !this.items.length) return null;
      if (this.mode === 'stepper') {
        const columns = this.getStepperColumns();
        return h(
          'div',
          { class: classNames('tk-tree-view', 'stepper') },
          columns.map((column, idx) =>
            h(
              'div',
              { class: classNames('tk-tree-view', 'column', 'divided'), key: idx },
              column.items.map((item, itemIndex) => this.renderItem(item, column.basePath, itemIndex)),
            ),
          ),
        );
      } else {
        const rootClasses = classNames('tk-tree-view', this.type, { disabled: this.disabled });
        return h(
          'div',
          { class: rootClasses },
          h(
            'div',
            { class: classNames('tk-tree-view', 'content') },
            this.items.map((item, index) => this.renderItem(item, '', index)),
          ),
        );
      }
    }
    get el() {
      return this;
    }
    static get style() {
      return tkTreeViewCss;
    }
  },
  [
    0,
    'tk-tree-view',
    {
      items: [16],
      mode: [1],
      type: [1],
      size: [1],
      disabled: [4],
      branchIcon: [1, 'branch-icon'],
      leafIcon: [1, 'leaf-icon'],
      showBadge: [4, 'show-badge'],
      badgeOptions: [16, 'badge-options'],
      value: [16],
      selectable: [4],
      showPointer: [4, 'show-pointer'],
      expandedPaths: [32],
      selectedPath: [32],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-tree-view', 'tk-badge', 'tk-checkbox', 'tk-icon'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-tree-view':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkTreeView$1);
        }
        break;
      case 'tk-badge':
        if (!customElements.get(tagName)) {
          defineCustomElement$4();
        }
        break;
      case 'tk-checkbox':
        if (!customElements.get(tagName)) {
          defineCustomElement$3();
        }
        break;
      case 'tk-icon':
        if (!customElements.get(tagName)) {
          defineCustomElement$2();
        }
        break;
    }
  });
}

const TkTreeView = TkTreeView$1;
const defineCustomElement = defineCustomElement$1;

export { TkTreeView, defineCustomElement };
//# sourceMappingURL=tk-tree-view.js.map

//# sourceMappingURL=tk-tree-view.js.map
