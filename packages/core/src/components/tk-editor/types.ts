import { Editor } from '@tiptap/core';

export type HeadingLevel = 1 | 2 | 3 | 4;
export type TkEditorToolbarButtonBehavior = 'toggle' | 'action';
export type TkEditorDefaultButton =
  /* heading buttons */
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  /* text style buttons */
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strike'
  | 'clear-format'
  /* list buttons */
  | 'bullet-list'
  | 'ordered-list'
  /* alignment buttons */
  | 'align-left'
  | 'align-center'
  | 'align-right'
  | 'align-justify'
  /* insert buttons */
  | 'link'
  | 'image'
  /* history buttons */
  | 'undo'
  | 'redo';
export interface TkEditorCustomButton {
  /**
   * The action to perform when the button is clicked
   */
  action: string;
  /**
   * The icon to display in the toolbar button
   */
  icon: string;
  /**
   * The label to display in the toolbar button
   */
  label: string;
  /**
   * The behavior of the button
   */
  behavior: TkEditorToolbarButtonBehavior;
  /**
   * The level of the heading to apply when the button is clicked
   */
  level?: HeadingLevel;
  /**
   * The command to run when the button is clicked
   */
  command?: (editor: Editor) => boolean | void;
}
export type TkEditorToolbarConfig = (TkEditorDefaultButton | TkEditorCustomButton)[][];
