import { TkEditorToolbarConfig } from './interfaces';

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
  'history',
  'horizontalRule',
  'italic',
  'listItem',
  'orderedList',
  'paragraph',
  'strike',
  'text',
] as const;

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
