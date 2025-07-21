// Tree item data interface
export interface ITreeItem {
  /** Display label for the tree item */
  label: string;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Child items */
  children?: ITreeItem[];
}
