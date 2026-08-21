// Tree item data interface
export interface ITreeItem {
  /** Unique identifier for the tree item (required when selectable is true) */
  key?: string;
  /** Display label for the tree item */
  label: string;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Child items */
  children?: ITreeItem[];
  /**
   * Determines if this is a leaf node. Only effective when `lazy` is set.
   * `false` forces the item to be treated as a branch even while its children are not loaded yet.
   */
  isLeaf?: boolean;
}

// Payload of the tk-load event, emitted when an expanded branch needs its children
export interface ITreeLoad {
  /** The item whose children are requested */
  item: ITreeItem;
  /** Index path of that item in the tree, e.g. "0-1-2" */
  path: string;
}
