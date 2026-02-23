import { Component, Prop, h, State, Event, EventEmitter, Element, Watch, Method } from '@stencil/core';
import { Editor, JSONContent, AnyExtension } from '@tiptap/core';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { TOOLBAR_ICONS } from './constants';
import { TkEditorDefaultButton, TkEditorCustomButton, TkEditorToolbarConfig, HeadingLevel } from './interfaces';
import { STARTER_KIT_EXTENSION_NAMES, DEFAULT_TOOLBAR_CONFIG } from './defaults';
import classNames from 'classnames';
import { getIconElementProps } from '../../utils/icon-utils';
import { CSSStyleProperties } from '../../global/types';

/**
 * TkEditor is a WYSIWYG editor component that wraps Tiptap editor.
 */
@Component({
  tag: 'tk-editor',
  styleUrl: 'tk-editor.scss',
  shadow: false,
})
export class TkEditor {
  private editorRef?: HTMLDivElement;
  private isExternalUpdate: boolean = false;

  @Element() el: HTMLTkEditorElement;

  @State() private editor: Editor;
  @State() private isFocused: boolean = false;
  @State() selectionState: {
    heading?: { level: HeadingLevel };
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strike?: boolean;
    bulletList?: boolean;
    orderedList?: boolean;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    link?: boolean;
  } = {};
  @State() private isEmpty: boolean = false;
  @State() private charCount: number = 0;

  /**
   * The value of the editor
   * @default ''
   */
  @Prop({ mutable: true }) value: string = '';
  @Watch('value')
  valueChanged(newValue: string) {
    if (this.editor && newValue !== this.editor.getHTML()) {
      this.isExternalUpdate = true;
      this.editor.commands.setContent(newValue);
    }
  }

  /**
   * Whether the editor is disabled
   * @default false
   */
  @Prop() disabled: boolean = false;

  /**
   * Whether the editor is readonly
   * @default false
   */
  @Prop() readonly: boolean = false;
  @Watch('disabled')
  @Watch('readonly')
  editableChanged() {
    if (this.editor) {
      this.editor.setEditable(!this.disabled && !this.readonly);
    }
  }

  /**
   * The placeholder text when editor is empty
   */
  @Prop() placeholder?: string;

  /**
   * Whether to hide the toolbar
   * @default false
   */
  @Prop() hideToolbar: boolean = false;

  /**
   * Limits the number of characters.
   * @default 140
   */
  @Prop() maxLength?: number = 140;

  /**
   * Whether to show the character counter
   * @default false
   */
  @Prop() showCounter?: boolean = false;

  /**
   * Whether the editor is resizable
   * @default false
   */
  @Prop() resizable?: boolean = false;

  /**
   * The style attribute of tabs item element
   */
  @Prop() contentStyle?: CSSStyleProperties = null;

  @State() private editorHeight: number = 0;
  private isResizing: boolean = false;
  private resizeStartY: number = 0;
  private resizeStartHeight: number = 0;

  /**
   * Custom extensions
   */
  @Prop() extensions?: AnyExtension[] = [];

  /**
   * Custom toolbar buttons for extensions
   */
  @Prop() customToolbarButtons?: TkEditorCustomButton[] = [];

  /**
   * Toolbar configuration
   */
  @Prop() toolbar?: TkEditorToolbarConfig;

  /**
   * The label for the toggle
   */
  @Prop() label?: string;

  /**
   * Provided a hint or additional information about the input.
   */
  @Prop() hint?: string;

  /**
   * Indicates whether the editor is in an invalid state
   * @defaultValue false
   */
  @Prop() invalid: boolean = false;

  /**
   * This is the error message that will be displayed.
   */
  @Prop() error: string;

  /**
   * Displays a red asterisk (*) next to the label for visual emphasis.
   */
  @Prop() showAsterisk: boolean = false;

  /**
   * Emitted when editor content changes
   */
  @Event({ eventName: 'tk-change' }) tkChange: EventEmitter<string>;

  /**
   * Emitted when editor gets focus
   */
  @Event() tkFocus: EventEmitter<void>;

  /**
   * Emitted when editor loses focus
   */
  @Event() tkBlur: EventEmitter<void>;

  componentDidLoad() {
    this.initEditor();
  }

  disconnectedCallback() {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  /**
   * Gets the current content of the editor
   */
  @Method()
  async getContent(format: 'json' | 'html' | 'text' = 'html'): Promise<JSONContent | string> {
    if (this.editor) {
      switch (format) {
        case 'json':
          return this.editor.getJSON();
        case 'html':
          return this.editor.getHTML();
        case 'text':
          return this.editor.getText();
        default:
          return this.editor.getHTML();
      }
    }
    return '';
  }

  /**
   * Sets the content of the editor
   */
  @Method()
  async setContent(content: string) {
    if (this.editor) {
      this.value = content;
      this.editor.commands.setContent(content);
    }
  }

  /**
   * Returns the Tiptap Editor instance
   */
  @Method()
  async getEditor(): Promise<Editor> {
    return this.editor;
  }

  private get activeExtensions(): AnyExtension[] {
    const userExtensions = this.extensions || [];
    const userExtensionNames = new Set(userExtensions.map(ext => ext.name));

    const starterKitExclusions = STARTER_KIT_EXTENSION_NAMES.filter(name => userExtensionNames.has(name)).reduce((acc, name) => ({ ...acc, [name]: false }), {});

    const defaultExtensions: AnyExtension[] = [Placeholder.configure({ placeholder: this.placeholder || '' }), StarterKit.configure(starterKitExclusions)];

    if (!userExtensionNames.has('underline')) {
      defaultExtensions.push(Underline.configure({}));
    }

    if (!userExtensionNames.has('textAlign')) {
      defaultExtensions.push(
        TextAlign.configure({
          types: ['heading', 'paragraph'],
          alignments: ['left', 'center', 'right', 'justify'],
        }),
      );
    }

    if (!userExtensionNames.has('link')) {
      defaultExtensions.push(
        Link.configure({
          openOnClick: true,
          HTMLAttributes: {
            class: 'tk-editor-link',
          },
        }),
      );
    }

    if (!userExtensionNames.has('image')) {
      defaultExtensions.push(
        Image.configure({
          HTMLAttributes: {
            class: 'tk-editor-image',
          },
        }),
      );
    }

    if (this.showCounter) {
      defaultExtensions.push(CharacterCount.configure({ limit: this.maxLength }));
    }

    return [...defaultExtensions, ...userExtensions];
  }

  private command() {
    return this.editor?.chain().focus();
  }

  private initEditor() {
    if (this.editorRef) {
      this.editor = new Editor({
        element: this.editorRef,
        extensions: this.activeExtensions,
        content: this.value,
        editable: !this.disabled && !this.readonly,
        onCreate: ({ editor }) => {
          this.isEmpty = editor.getText().length === 0;
          if (this.showCounter) {
            this.charCount = editor.storage.characterCount.characters();
          }
        },
        onUpdate: ({ editor }) => {
          if (this.isExternalUpdate) {
            this.isExternalUpdate = false;
            this.isEmpty = editor.getText().length === 0;
            if (this.showCounter) {
              this.charCount = editor.storage.characterCount.characters();
            }
            return;
          }

          const html = editor.getHTML();
          this.value = html;
          this.tkChange.emit(html);
          this.updateSelectionState();
          this.isEmpty = editor.getText().length === 0;
          if (this.showCounter) {
            this.charCount = editor.storage.characterCount.characters();
          }
        },
        onFocus: () => {
          this.isFocused = true;
          this.tkFocus.emit();
        },
        onBlur: () => {
          this.isFocused = false;
          this.tkBlur.emit();
        },
        onSelectionUpdate: () => {
          this.updateSelectionState();
        },
      });
    }
  }

  private updateSelectionState() {
    if (!this.editor) return;
    this.selectionState = {
      heading: this.editor.isActive('heading') ? { level: this.editor.getAttributes('heading').level } : undefined,
      bold: this.editor.isActive('bold'),
      italic: this.editor.isActive('italic'),
      underline: this.editor.isActive('underline'),
      strike: this.editor.isActive('strike'),
      bulletList: this.editor.isActive('bulletList'),
      orderedList: this.editor.isActive('orderedList'),
      textAlign: this.editor.getAttributes('textAlign').textAlign as 'left' | 'center' | 'right' | 'justify',
      link: this.editor.isActive('link'),
    };
  }

  private getDefaultButtonConfig(button: TkEditorDefaultButton): TkEditorCustomButton {
    const configs: Record<TkEditorDefaultButton, Omit<TkEditorCustomButton, 'action'>> = {
      'h1': { icon: 'H1', label: 'Heading 1', behavior: 'toggle', level: 1 },
      'h2': { icon: 'H2', label: 'Heading 2', behavior: 'toggle', level: 2 },
      'h3': { icon: 'H3', label: 'Heading 3', behavior: 'toggle', level: 3 },
      'h4': { icon: 'H4', label: 'Heading 4', behavior: 'toggle', level: 4 },
      'bold': { icon: 'BOLD', label: 'Bold', behavior: 'toggle' },
      'italic': { icon: 'ITALIC', label: 'Italic', behavior: 'toggle' },
      'underline': { icon: 'UNDERLINED', label: 'Underline', behavior: 'toggle' },
      'strike': { icon: 'STRIKETHROUGH', label: 'Strikethrough', behavior: 'toggle' },
      'clear-format': { icon: 'CLEAR_FORMAT', label: 'Clear Formatting', behavior: 'action' },
      'bullet-list': { icon: 'LIST', label: 'Bullet List', behavior: 'toggle' },
      'ordered-list': { icon: 'LIST_NUMBERED', label: 'Numbered List', behavior: 'toggle' },
      'align-left': { icon: 'ALIGN_LEFT', label: 'Align Left', behavior: 'action' },
      'align-center': { icon: 'ALIGN_CENTER', label: 'Align Center', behavior: 'action' },
      'align-right': { icon: 'ALIGN_RIGHT', label: 'Align Right', behavior: 'action' },
      'align-justify': { icon: 'ALIGN_JUSTIFY', label: 'Align Justify', behavior: 'action' },
      'link': { icon: 'LINK', label: 'Add Link', behavior: 'toggle' },
      'image': { icon: 'PHOTO', label: 'Add Image', behavior: 'action' },
      'undo': { icon: 'UNDO', label: 'Undo', behavior: 'action' },
      'redo': { icon: 'REDO', label: 'Redo', behavior: 'action' },
    };
    return {
      action: this.getButtonAction(button),
      ...configs[button],
    };
  }

  private getButtonAction(button: TkEditorDefaultButton): string {
    const actionMap: Record<TkEditorDefaultButton, string> = {
      'h1': 'heading',
      'h2': 'heading',
      'h3': 'heading',
      'h4': 'heading',
      'bold': 'bold',
      'italic': 'italic',
      'underline': 'underline',
      'strike': 'strike',
      'clear-format': 'clearFormat',
      'bullet-list': 'bulletList',
      'ordered-list': 'orderedList',
      'align-left': 'alignLeft',
      'align-center': 'alignCenter',
      'align-right': 'alignRight',
      'align-justify': 'alignJustify',
      'link': 'link',
      'image': 'image',
      'undo': 'undo',
      'redo': 'redo',
    };
    return actionMap[button];
  }

  private isButtonActive(button: TkEditorCustomButton): boolean {
    if (!this.editor) return false;
    if (button.command) {
      return this.editor.isActive(button.action);
    }
    switch (button.action) {
      case 'heading':
        return this.editor.isActive('heading', { level: button.level });
      case 'bold':
        return this.editor.isActive('bold');
      case 'italic':
        return this.editor.isActive('italic');
      case 'underline':
        return this.editor.isActive('underline');
      case 'strike':
        return this.editor.isActive('strike');
      case 'bulletList':
        return this.editor.isActive('bulletList');
      case 'orderedList':
        return this.editor.isActive('orderedList');
      case 'alignLeft':
        return this.editor.isActive({ textAlign: 'left' });
      case 'alignCenter':
        return this.editor.isActive({ textAlign: 'center' });
      case 'alignRight':
        return this.editor.isActive({ textAlign: 'right' });
      case 'alignJustify':
        return this.editor.isActive({ textAlign: 'justify' });
      case 'link':
        return this.editor.isActive('link');
      case 'undo':
        return this.editor.can().undo();
      case 'redo':
        return this.editor.can().redo();
      default:
        return this.editor.isActive(button.action);
    }
  }

  private isHistoryButtonDisabled(action: 'undo' | 'redo'): boolean {
    if (!this.editor) return true;
    return !this.editor.can()?.[action]();
  }

  private handleToolbarAction = (button: TkEditorCustomButton) => {
    if (!this.editor) return;
    if (button.command) {
      button.command(this.editor);
      return;
    }
    const commands = {
      undo: () => this.command()?.undo(),
      redo: () => this.command()?.redo(),
      heading: () => this.command()?.toggleHeading({ level: button.level }),
      bold: () => this.command()?.toggleBold(),
      italic: () => this.command()?.toggleItalic(),
      underline: () => this.command()?.toggleUnderline(),
      strike: () => this.command()?.toggleStrike(),
      clearFormat: () => this.command()?.unsetAllMarks().clearNodes().setParagraph(),
      bulletList: () => this.command()?.toggleBulletList(),
      orderedList: () => this.command()?.toggleOrderedList(),
      alignLeft: () => this.command()?.setTextAlign('left'),
      alignCenter: () => this.command()?.setTextAlign('center'),
      alignRight: () => this.command()?.setTextAlign('right'),
      alignJustify: () => this.command()?.setTextAlign('justify'),
      link: () => {
        const url = prompt('Enter URL:');
        return url ? this.command()?.setLink({ href: url }) : undefined;
      },
      image: () => {
        const imageUrl = prompt('Enter image URL:');
        return imageUrl ? this.command()?.setImage({ src: imageUrl }) : undefined;
      },
    };
    const command = commands[button.action];
    const chain = command?.();
    if (chain) {
      chain.run();
    }
  };

  private handleResizeMouseDown = (e: MouseEvent) => {
    if (!this.resizable || this.disabled || this.readonly) return;
    e.preventDefault(); // Prevent text selection
    this.isResizing = true;
    this.resizeStartY = e.clientY;
    const content = this.el.querySelector('.tk-editor-content') as HTMLElement;
    this.resizeStartHeight = content.offsetHeight;

    document.addEventListener('mousemove', this.handleResizeMouseMove);
    document.addEventListener('mouseup', this.handleResizeMouseUp);
  };

  private handleResizeMouseMove = (e: MouseEvent) => {
    if (!this.isResizing) return;
    const deltaY = e.clientY - this.resizeStartY;
    const newHeight = Math.max(120, this.resizeStartHeight + deltaY); // Min height 120px
    this.editorHeight = newHeight;
  };

  private handleResizeMouseUp = () => {
    this.isResizing = false;
    document.removeEventListener('mousemove', this.handleResizeMouseMove);
    document.removeEventListener('mouseup', this.handleResizeMouseUp);
  };

  private createToolbarButton(button: TkEditorCustomButton) {
    const isCustomButton = !TOOLBAR_ICONS[button.icon as keyof typeof TOOLBAR_ICONS];
    const iconContent = TOOLBAR_ICONS[button.icon as keyof typeof TOOLBAR_ICONS] || button.icon;
    return (
      <button
        class={classNames('tk-editor-button', `tk-editor-button-${button.action}`, `tk-editor-button-${button.behavior}`, {
          'tk-editor-button-active': button.behavior === 'toggle' && this.isButtonActive(button),
          'tk-editor-button-disabled': this.disabled,
          'tk-editor-button-readonly': this.readonly,
          [`tk-editor-button-${button.action}-disabled`]: (button.action === 'undo' || button.action === 'redo') && this.isHistoryButtonDisabled(button.action),
        })}
        type="button"
        title={button.label}
        disabled={this.disabled || this.readonly}
        innerHTML={iconContent}
        onClick={() => !this.disabled && this.handleToolbarAction(button)}
        data-tk-editor-custom-button={isCustomButton}
      />
    );
  }

  private renderToolbar() {
    if (this.hideToolbar) return null;
    const toolbarConfig = this.toolbar || DEFAULT_TOOLBAR_CONFIG;
    return (
      <div class="tk-editor-toolbar">
        <div class="tk-editor-controlsgroup-container">
          {toolbarConfig.map((group, groupIndex) => (
            <div class="tk-editor-controlsgroup" key={groupIndex}>
              {group.map(button => {
                const buttonConfig = typeof button === 'string' ? this.getDefaultButtonConfig(button) : button;
                return this.createToolbarButton(buttonConfig);
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  private renderHint(): HTMLDivElement {
    let hint: HTMLDivElement;
    if (this.hint?.length > 0) {
      hint = (
        <div class="tk-editor-supporting-text">
          <tk-icon {...getIconElementProps('info', { class: classNames('tk-editor-supporting-text-icon'), variant: null })} />
          <span>{this.hint}</span>
        </div>
      );
    }
    if (this.error?.length > 0) {
      hint = (
        <div class="tk-editor-supporting-text error">
          <tk-icon {...getIconElementProps('info', { class: classNames('tk-editor-supporting-text-icon'), variant: null })} />
          <span>{this.error}</span>
        </div>
      );
    }
    return hint;
  }

  private renderFooter(): HTMLDivElement | null {
    if (this.showCounter || this.resizable) {
      return (
        <div class="tk-editor-footer">
          {this.showCounter && (
            <div class={classNames('tk-editor-counter', { 'tk-editor-counter-maxed': this.charCount === this.maxLength })}>
              {this.charCount}/{this.maxLength}
            </div>
          )}
          {this.resizable && (
            <div class="tk-editor-resize-icon" onMouseDown={this.handleResizeMouseDown}>
              <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                <path d="M2.18564e-05 5.89256H5.89258V0L2.18564e-05 5.89256Z" fill="var(--icon-light)" />
              </svg>
            </div>
          )}
        </div>
      );
    }
    return null;
  }

  render() {
    const contentStyle = {
      ...this.contentStyle,
      ...(this.editorHeight > 0 ? { height: `${this.editorHeight}px`, minHeight: 'unset' } : {}),
    };
    const labelElement = this.label && (
      <label class="tk-editor-label">
        {this.label}
        {this.showAsterisk && <span class="tk-editor-label-asterisk">*</span>}
      </label>
    );

    return (
      <div
        class={classNames('tk-editor-container', {
          'tk-editor-focused': this.isFocused,
          'tk-editor-disabled': this.disabled,
          'tk-editor-readonly': this.readonly,
          'tk-editor-invalid': this.invalid,
        })}
      >
        {labelElement}
        <div class="tk-editor">
          {this.renderToolbar()}
          <div
            class={classNames('tk-editor-content', { 'tk-editor-placeholder-visible': this.isEmpty && !!this.placeholder })}
            ref={el => (this.editorRef = el)}
            data-placeholder={this.placeholder}
            style={contentStyle}
          />
          {this.renderFooter()}
        </div>
        {this.renderHint()}
      </div>
    );
  }
}
