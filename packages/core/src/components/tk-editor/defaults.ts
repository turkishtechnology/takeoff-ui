import { AnyExtension } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { TkEditorToolbarConfig } from './interfaces';
/**
 * Default Tiptap extensions with their configurations
 */
export const DEFAULT_EXTENSIONS: AnyExtension[] = [
  StarterKit.configure({}),
  Underline.configure({}),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    alignments: ['left', 'center', 'right', 'justify'],
  }),
  Link.configure({
    openOnClick: true,
    HTMLAttributes: {
      class: 'tk-editor-link',
    },
  }),
  Image.configure({
    HTMLAttributes: {
      class: 'tk-editor-image',
    },
  }),
];
/**
 * Default toolbar configuration with all available buttons
 */
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
