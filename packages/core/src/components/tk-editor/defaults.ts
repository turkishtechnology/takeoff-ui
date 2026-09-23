import { TkEditorToolbarConfig } from './types';

/**
 * Extension names bundled by Tiptap 3's StarterKit. A user extension with one of these names
 * replaces the bundled one (the StarterKit option of the same name is set to `false`).
 */
export const STARTER_KIT_EXTENSION_NAMES = [
  'blockquote',
  'bold',
  'bulletList',
  'code',
  'codeBlock',
  'document',
  'dropcursor',
  'gapcursor',
  'hardBreak',
  'heading',
  'horizontalRule',
  'italic',
  'link',
  'listItem',
  'listKeymap',
  'orderedList',
  'paragraph',
  'strike',
  'text',
  'trailingNode',
  'underline',
  'undoRedo',
] as const;

/**
 * StarterKit options that Tiptap 3 turns on by default but tk-editor keeps off, so the editor
 * behaves as it did on Tiptap 2: link and underline come from the dedicated extensions (with the
 * tk-editor classes), TrailingNode would append an empty paragraph after a trailing heading, list or
 * image and change the emitted HTML, and ListKeymap changes Backspace/Delete/Tab inside lists.
 */
export const STARTER_KIT_OVERRIDES = { link: false, underline: false, listKeymap: false, trailingNode: false } as const;

export const DEFAULT_TOOLBAR_CONFIG: TkEditorToolbarConfig = [
  // Heading buttons
  ['h1', 'h2', 'h3', 'h4'],
  // Text style buttons
  ['bold', 'italic', 'underline', 'strike', 'clear-format'],
  // List buttons
  ['bullet-list', 'ordered-list'],
  // Alignment buttons
  ['align-left', 'align-center', 'align-right', 'align-justify'],
  // Insert buttons
  ['link', 'image'],
  // History buttons
  ['undo', 'redo'],
];
