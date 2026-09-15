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
   * Declares whether the item has children, for the times the children themselves cannot say.
   * Only effective when `lazy` is set: `true` keeps an item expandable while its children are still
   * unloaded, and `false` settles it as a leaf. Left out, the loaded children decide.
   */
  hasChildren?: boolean;
}

// Payload of the tk-load event, emitted when an expanded branch needs its children
export interface ITreeLoad {
  /** The item whose children are requested */
  item: ITreeItem;
  /** Index path of that item in the tree, e.g. "0-1-2" */
  path: string;
}
