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
}
