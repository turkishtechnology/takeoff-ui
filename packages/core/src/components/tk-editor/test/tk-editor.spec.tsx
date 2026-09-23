jest.mock('@tiptap/core', () => ({
  Editor: jest.fn().mockImplementation((options: { content?: string; onCreate?: (payload: { editor: unknown }) => void; onUpdate?: (payload: { editor: unknown }) => void }) => {
    let html = options.content || '';
    const text = () => html.replace(/<[^>]*>/g, '');
    const state = { active: new Set<string>(), attributes: {} as Record<string, Record<string, unknown>>, canUndo: false, canRedo: false };
    const chain: Record<string, jest.Mock> = { run: jest.fn(() => true) };
    const chainCommands = [
      'focus',
      'undo',
      'redo',
      'toggleHeading',
      'toggleBold',
      'toggleItalic',
      'toggleUnderline',
      'toggleStrike',
      'unsetAllMarks',
      'clearNodes',
      'setParagraph',
      'toggleBulletList',
      'toggleOrderedList',
      'setTextAlign',
      'setLink',
      'setImage',
    ];
    chainCommands.forEach(name => {
      chain[name] = jest.fn(() => chain);
    });
    const instance = {
      getHTML: () => html,
      getJSON: () => ({ type: 'doc' }),
      getText: text,
      setEditable: jest.fn(),
      destroy: jest.fn(),
      chain: jest.fn(() => chain),
      commands: {
        // mirrors Tiptap 3: onUpdate fires unless { emitUpdate: false } is passed
        setContent: jest.fn((content: string, setOptions?: { emitUpdate?: boolean }) => {
          html = content;
          if (setOptions?.emitUpdate ?? true) {
            options.onUpdate?.({ editor: instance });
          }
        }),
      },
      storage: { characterCount: { characters: () => text().length } },
      // mirrors the three call shapes the component uses: isActive('bold'), isActive('heading', { level }) and isActive({ textAlign })
      isActive: jest.fn((name: string | { textAlign: string }, attrs?: { level?: number }) => {
        if (typeof name === 'object') return state.active.has(`textAlign:${name.textAlign}`);
        if (attrs?.level !== undefined) return state.active.has(`${name}:${attrs.level}`);
        return state.active.has(name);
      }),
      getAttributes: jest.fn((name: string) => state.attributes[name] || {}),
      can: jest.fn(() => ({ undo: () => state.canUndo, redo: () => state.canRedo })),
      __setHtml: (next: string) => {
        html = next;
      },
      __chain: chain,
      __state: state,
      __options: options,
    };
    options.onCreate?.({ editor: instance });
    return instance;
  }),
}));

jest.mock('@tiptap/extensions', () => ({
  __esModule: true,
  Placeholder: { configure: jest.fn(() => ({ name: 'placeholder' })) },
  CharacterCount: { configure: jest.fn(() => ({ name: 'characterCount' })) },
}));
jest.mock('@tiptap/starter-kit', () => ({ __esModule: true, default: { configure: jest.fn(() => ({ name: 'starterKit' })) } }));
jest.mock('@tiptap/extension-text-align', () => ({ __esModule: true, default: { configure: jest.fn(() => ({ name: 'textAlign' })) } }));
jest.mock('@tiptap/extension-underline', () => ({ __esModule: true, default: { configure: jest.fn(() => ({ name: 'underline' })) } }));
jest.mock('@tiptap/extension-link', () => ({ __esModule: true, default: { configure: jest.fn(() => ({ name: 'link' })) } }));
jest.mock('@tiptap/extension-image', () => ({ __esModule: true, default: { configure: jest.fn(() => ({ name: 'image' })) } }));

import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { Editor, AnyExtension } from '@tiptap/core';
import { CharacterCount, Placeholder } from '@tiptap/extensions';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { TkEditor } from '../tk-editor';
import { TkEditorCustomButton } from '../types';
import { STARTER_KIT_OVERRIDES } from '../defaults';

interface MockEditor {
  getHTML(): string;
  setEditable: jest.Mock;
  destroy: jest.Mock;
  chain: jest.Mock;
  isActive: jest.Mock;
  commands: { setContent: jest.Mock };
  __setHtml(next: string): void;
  __chain: Record<string, jest.Mock>;
  __state: { active: Set<string>; attributes: Record<string, Record<string, unknown>>; canUndo: boolean; canRedo: boolean };
  __options: {
    content?: string;
    editable?: boolean;
    extensions?: { name: string }[];
    onUpdate?: (payload: { editor: unknown }) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onSelectionUpdate?: () => void;
  };
}

const configureOf = (extension: unknown) => (extension as { configure: jest.Mock }).configure;
const latestEditor = (): MockEditor => (Editor as unknown as jest.Mock).mock.results.slice(-1)[0].value;
const setup = async (html = `<tk-editor></tk-editor>`) => {
  const page = await newSpecPage({ components: [TkEditor], html });
  return { page, editor: latestEditor() };
};
const buttonOf = (page: SpecPage, action: string) => page.root.querySelector(`.tk-editor-button-${action}`) as HTMLButtonElement;
const click = (el: Element) => el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
const userEdit = (editor: MockEditor, html: string) => {
  editor.__setHtml(html);
  editor.__options.onUpdate({ editor });
};
const selectionChanged = async (page: SpecPage, editor: MockEditor) => {
  editor.__options.onSelectionUpdate();
  await page.waitForChanges();
};
const customButton = (overrides: Partial<TkEditorCustomButton> = {}): TkEditorCustomButton => ({
  action: 'highlight',
  icon: 'HL',
  label: overrides.action ?? 'Highlight',
  behavior: 'action',
  ...overrides,
});

describe('tk-editor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('hides the toolbar when hideToolbar is enabled', async () => {
    const page = await newSpecPage({
      components: [TkEditor],
      html: `<tk-editor hide-toolbar="true"></tk-editor>`,
    });

    expect(page.root.querySelector('.tk-editor-toolbar')).toBeNull();
  });

  it('does not emit tk-change for an external value update but emits for the next user edit', async () => {
    const page = await newSpecPage({
      components: [TkEditor],
      html: `<tk-editor></tk-editor>`,
    });
    const editorMock = (Editor as unknown as jest.Mock).mock.results[0].value;
    const onTkChange = jest.fn();
    page.root.addEventListener('tk-change', onTkChange);

    // parent sets the value programmatically (e.g. reverting after a length guard)
    (page.root as HTMLTkEditorElement).value = '<p>reverted</p>';
    await page.waitForChanges();
    expect(editorMock.commands.setContent).toHaveBeenCalledWith('<p>reverted</p>', { emitUpdate: true });
    expect(onTkChange).not.toHaveBeenCalled();

    // the next real user edit fires Tiptap's onUpdate and must not be swallowed
    editorMock.__setHtml('<p><strong>reverted</strong></p>');
    editorMock.__options.onUpdate({ editor: editorMock });
    expect(onTkChange).toHaveBeenCalledTimes(1);
    expect(onTkChange.mock.calls[0][0].detail).toBe('<p><strong>reverted</strong></p>');
  });

  describe('rendering', () => {
    it('renders the default toolbar as six groups holding nineteen buttons', async () => {
      const { page } = await setup();

      expect(page.root.querySelectorAll('.tk-editor-controlsgroup')).toHaveLength(6);
      expect(page.root.querySelectorAll('.tk-editor-button')).toHaveLength(19);
      expect(buttonOf(page, 'bold').getAttribute('title')).toBe('Bold');
      expect(buttonOf(page, 'bold').querySelector('svg')).not.toBeNull();
    });

    it('renders the label with an asterisk when showAsterisk is set', async () => {
      const { page } = await setup(`<tk-editor label="Notes" show-asterisk="true"></tk-editor>`);

      const label = page.root.querySelector('.tk-editor-label');
      expect(label.textContent).toContain('Notes');
      expect(label.querySelector('.tk-editor-label-asterisk').textContent).toBe('*');
    });

    it('renders no label element when no label is given', async () => {
      const { page } = await setup();

      expect(page.root.querySelector('.tk-editor-label')).toBeNull();
    });

    it('shows the error message and marks the container invalid', async () => {
      const { page } = await setup(`<tk-editor invalid="true" error="Required"></tk-editor>`);

      expect(page.root.querySelector('.tk-editor-container').classList.contains('tk-editor-invalid')).toBe(true);
      expect(page.root.querySelector('.tk-hint-wrapper.error').textContent).toContain('Required');
    });

    it('shows the hint text when no error is present', async () => {
      const { page } = await setup(`<tk-editor hint="Max 140 chars"></tk-editor>`);

      const hint = page.root.querySelector('.tk-hint-wrapper');
      expect(hint.classList.contains('error')).toBe(false);
      expect(hint.textContent).toContain('Max 140 chars');
    });

    it('applies contentStyle to the content area', async () => {
      const { page } = await setup();

      page.root.contentStyle = { minHeight: '300px' };
      await page.waitForChanges();

      expect((page.root.querySelector('.tk-editor-content') as HTMLElement).style.minHeight).toBe('300px');
    });

    it('configures the placeholder extension with the placeholder text', async () => {
      await setup(`<tk-editor placeholder="Type here"></tk-editor>`);

      expect(configureOf(Placeholder)).toHaveBeenCalledWith({ placeholder: 'Type here' });
    });

    it('marks the content as placeholder-visible while the editor is empty', async () => {
      const { page, editor } = await setup(`<tk-editor placeholder="Type here"></tk-editor>`);
      const content = page.root.querySelector('.tk-editor-content');

      expect(content.getAttribute('data-placeholder')).toBe('Type here');
      expect(content.classList.contains('tk-editor-placeholder-visible')).toBe(true);

      userEdit(editor, '<p>hello</p>');
      await page.waitForChanges();

      expect(content.classList.contains('tk-editor-placeholder-visible')).toBe(false);
    });

    it('never shows the placeholder class without a placeholder', async () => {
      const { page } = await setup();

      expect(page.root.querySelector('.tk-editor-content').classList.contains('tk-editor-placeholder-visible')).toBe(false);
    });

    it('renders no footer when neither the counter nor resizing is enabled', async () => {
      const { page } = await setup();

      expect(page.root.querySelector('.tk-editor-footer')).toBeNull();
    });
  });

  describe('disabled and readonly', () => {
    it('creates a non-editable editor and disables the toolbar when disabled', async () => {
      const { page, editor } = await setup(`<tk-editor disabled="true"></tk-editor>`);
      const bold = buttonOf(page, 'bold');

      expect(editor.__options.editable).toBe(false);
      expect(page.root.querySelector('.tk-editor-container').classList.contains('tk-editor-disabled')).toBe(true);
      expect(bold.hasAttribute('disabled')).toBe(true);
      expect(bold.classList.contains('tk-editor-button-disabled')).toBe(true);
    });

    it('toggles editability on the editor when disabled changes', async () => {
      const { page, editor } = await setup();

      page.root.disabled = true;
      await page.waitForChanges();
      expect(editor.setEditable).toHaveBeenLastCalledWith(false);

      page.root.disabled = false;
      await page.waitForChanges();
      expect(editor.setEditable).toHaveBeenLastCalledWith(true);
    });

    it('makes the editor non-editable and styles the toolbar when readonly', async () => {
      const { page, editor } = await setup();

      page.root.readonly = true;
      await page.waitForChanges();

      expect(editor.setEditable).toHaveBeenLastCalledWith(false);
      expect(page.root.querySelector('.tk-editor-container').classList.contains('tk-editor-readonly')).toBe(true);
      expect(buttonOf(page, 'italic').classList.contains('tk-editor-button-readonly')).toBe(true);
      expect(buttonOf(page, 'italic').hasAttribute('disabled')).toBe(true);
    });

    it('runs no command when a toolbar button is clicked while disabled', async () => {
      const { page, editor } = await setup(`<tk-editor disabled="true"></tk-editor>`);

      click(buttonOf(page, 'bold'));

      expect(editor.chain).not.toHaveBeenCalled();
    });
  });

  describe('value sync', () => {
    it('passes the initial value to the editor as content', async () => {
      const { editor } = await setup(`<tk-editor value="<p>hi</p>"></tk-editor>`);

      expect(editor.__options.content).toBe('<p>hi</p>');
      expect(editor.getHTML()).toBe('<p>hi</p>');
    });

    it('does not push content to the editor when value already matches its html', async () => {
      const { page, editor } = await setup(`<tk-editor value="<p>hi</p>"></tk-editor>`);

      page.root.value = '<p>hi</p>';
      await page.waitForChanges();

      expect(editor.commands.setContent).not.toHaveBeenCalled();
    });

    it('updates the value prop and emits tk-change on a user edit', async () => {
      const { page, editor } = await setup();
      const onChange = jest.fn();
      page.root.addEventListener('tk-change', onChange);

      userEdit(editor, '<p>typed</p>');
      await page.waitForChanges();

      expect(page.root.value).toBe('<p>typed</p>');
      expect(onChange.mock.calls[0][0].detail).toBe('<p>typed</p>');
    });
  });

  describe('focus and blur', () => {
    it('adds the focused class and emits tkFocus when the editor gains focus', async () => {
      const { page, editor } = await setup();
      const onFocus = jest.fn();
      page.root.addEventListener('tkFocus', onFocus);

      editor.__options.onFocus();
      await page.waitForChanges();

      expect(page.root.querySelector('.tk-editor-container').classList.contains('tk-editor-focused')).toBe(true);
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('removes the focused class and emits tkBlur when the editor loses focus', async () => {
      const { page, editor } = await setup();
      const onBlur = jest.fn();
      page.root.addEventListener('tkBlur', onBlur);

      editor.__options.onFocus();
      await page.waitForChanges();
      editor.__options.onBlur();
      await page.waitForChanges();

      expect(page.root.querySelector('.tk-editor-container').classList.contains('tk-editor-focused')).toBe(false);
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('public methods', () => {
    it('getContent() returns html by default and json or text on request', async () => {
      const { page } = await setup(`<tk-editor value="<p>hi</p>"></tk-editor>`);

      await expect(page.root.getContent()).resolves.toBe('<p>hi</p>');
      await expect(page.root.getContent('html')).resolves.toBe('<p>hi</p>');
      await expect(page.root.getContent('json')).resolves.toEqual({ type: 'doc' });
      await expect(page.root.getContent('text')).resolves.toBe('hi');
    });

    it('getContent() falls back to html for an unknown format', async () => {
      const { page } = await setup(`<tk-editor value="<p>hi</p>"></tk-editor>`);

      await expect(page.root.getContent('markdown' as unknown as 'html')).resolves.toBe('<p>hi</p>');
    });

    it('getContent() returns an empty string before the editor exists', async () => {
      await expect(new TkEditor().getContent()).resolves.toBe('');
    });

    it('setContent() updates the value and the editor without emitting tk-change', async () => {
      const { page, editor } = await setup();
      const onChange = jest.fn();
      page.root.addEventListener('tk-change', onChange);

      await page.root.setContent('<p>set</p>');
      await page.waitForChanges();

      expect(page.root.value).toBe('<p>set</p>');
      // Tiptap 3 emits by default, so the programmatic path has to opt out explicitly
      expect(editor.commands.setContent).toHaveBeenCalledWith('<p>set</p>', { emitUpdate: false });
      expect(onChange).not.toHaveBeenCalled();
    });

    it('getEditor() exposes the underlying editor instance', async () => {
      const { page, editor } = await setup();

      await expect(page.root.getEditor()).resolves.toBe(editor);
    });

    it('destroys the editor when the element is removed', async () => {
      const { page, editor } = await setup();

      page.root.remove();
      await page.waitForChanges();

      expect(editor.destroy).toHaveBeenCalledTimes(1);
    });
  });

  describe('toolbar actions', () => {
    it.each([
      ['bold', 'toggleBold', []],
      ['italic', 'toggleItalic', []],
      ['underline', 'toggleUnderline', []],
      ['strike', 'toggleStrike', []],
      ['bulletList', 'toggleBulletList', []],
      ['orderedList', 'toggleOrderedList', []],
      ['undo', 'undo', []],
      ['redo', 'redo', []],
      ['alignLeft', 'setTextAlign', ['left']],
      ['alignCenter', 'setTextAlign', ['center']],
      ['alignRight', 'setTextAlign', ['right']],
      ['alignJustify', 'setTextAlign', ['justify']],
    ])('runs %s through a focused command chain', async (action, command, args) => {
      const { page, editor } = await setup();

      click(buttonOf(page, action));

      expect(editor.__chain.focus).toHaveBeenCalled();
      expect(editor.__chain[command]).toHaveBeenCalledWith(...args);
      expect(editor.__chain.run).toHaveBeenCalledTimes(1);
    });

    it('toggles the heading level of the clicked heading button', async () => {
      const { page, editor } = await setup();

      click(page.root.querySelector('[title="Heading 3"]'));

      expect(editor.__chain.toggleHeading).toHaveBeenCalledWith({ level: 3 });
      expect(editor.__chain.run).toHaveBeenCalledTimes(1);
    });

    it('clears marks, nodes and resets to a paragraph for clear formatting', async () => {
      const { page, editor } = await setup();

      click(buttonOf(page, 'clearFormat'));

      expect(editor.__chain.unsetAllMarks).toHaveBeenCalled();
      expect(editor.__chain.clearNodes).toHaveBeenCalled();
      expect(editor.__chain.setParagraph).toHaveBeenCalled();
      expect(editor.__chain.run).toHaveBeenCalledTimes(1);
    });

    it('inserts a link with the url entered in the prompt', async () => {
      const promptSpy = jest.spyOn(global, 'prompt').mockReturnValue('https://example.com');
      const { page, editor } = await setup();

      click(buttonOf(page, 'link'));

      expect(promptSpy).toHaveBeenCalledWith('Enter URL:');
      expect(editor.__chain.setLink).toHaveBeenCalledWith({ href: 'https://example.com' });
      expect(editor.__chain.run).toHaveBeenCalledTimes(1);
      promptSpy.mockRestore();
    });

    it('inserts nothing when the link prompt is cancelled', async () => {
      const promptSpy = jest.spyOn(global, 'prompt').mockReturnValue(null);
      const { page, editor } = await setup();

      click(buttonOf(page, 'link'));

      expect(editor.__chain.setLink).not.toHaveBeenCalled();
      expect(editor.__chain.run).not.toHaveBeenCalled();
      promptSpy.mockRestore();
    });

    it('inserts an image with the url entered in the prompt', async () => {
      const promptSpy = jest.spyOn(global, 'prompt').mockReturnValue('https://example.com/a.png');
      const { page, editor } = await setup();

      click(buttonOf(page, 'image'));

      expect(promptSpy).toHaveBeenCalledWith('Enter image URL:');
      expect(editor.__chain.setImage).toHaveBeenCalledWith({ src: 'https://example.com/a.png' });
      expect(editor.__chain.run).toHaveBeenCalledTimes(1);
      promptSpy.mockRestore();
    });

    it('inserts nothing when the image prompt is cancelled', async () => {
      const promptSpy = jest.spyOn(global, 'prompt').mockReturnValue('');
      const { page, editor } = await setup();

      click(buttonOf(page, 'image'));

      expect(editor.__chain.setImage).not.toHaveBeenCalled();
      expect(editor.__chain.run).not.toHaveBeenCalled();
      promptSpy.mockRestore();
    });
  });

  describe('custom toolbar buttons', () => {
    it('renders a custom button with its raw icon and runs its command with the editor', async () => {
      const command = jest.fn();
      const { page, editor } = await setup();

      page.root.toolbar = [['bold'], [customButton({ command })]];
      await page.waitForChanges();

      const button = buttonOf(page, 'highlight');
      expect(button.innerHTML).toBe('HL');
      expect(button.getAttribute('title')).toBe('Highlight');
      expect(button.hasAttribute('data-tk-editor-custom-button')).toBe(true);
      expect(buttonOf(page, 'bold').hasAttribute('data-tk-editor-custom-button')).toBe(false);

      click(button);

      expect(command).toHaveBeenCalledWith(editor);
      expect(editor.__chain.run).not.toHaveBeenCalled();
    });

    it('runs nothing for a custom button without a command and an unknown action', async () => {
      const { page, editor } = await setup();

      page.root.toolbar = [[customButton()]];
      await page.waitForChanges();
      click(buttonOf(page, 'highlight'));

      expect(editor.__chain.run).not.toHaveBeenCalled();
    });

    it('marks a custom toggle button active based on its action name', async () => {
      const { page, editor } = await setup();
      editor.__state.active.add('highlight');

      page.root.toolbar = [[customButton({ behavior: 'toggle', command: jest.fn() }), customButton({ action: 'mark', behavior: 'toggle' })]];
      await page.waitForChanges();

      expect(buttonOf(page, 'highlight').classList.contains('tk-editor-button-active')).toBe(true);
      expect(buttonOf(page, 'mark').classList.contains('tk-editor-button-active')).toBe(false);
      expect(editor.isActive).toHaveBeenCalledWith('mark');
    });
  });

  describe('active state', () => {
    it('highlights the bold button once the selection is bold', async () => {
      const { page, editor } = await setup();
      expect(buttonOf(page, 'bold').classList.contains('tk-editor-button-active')).toBe(false);

      editor.__state.active.add('bold');
      await selectionChanged(page, editor);

      expect(buttonOf(page, 'bold').classList.contains('tk-editor-button-active')).toBe(true);
      expect(buttonOf(page, 'italic').classList.contains('tk-editor-button-active')).toBe(false);
      expect(page.rootInstance.selectionState).toMatchObject({ bold: true, italic: false, heading: undefined });
    });

    it('highlights only the heading button matching the active level', async () => {
      const { page, editor } = await setup();
      editor.__state.active.add('heading');
      editor.__state.active.add('heading:2');
      editor.__state.attributes.heading = { level: 2 };

      await selectionChanged(page, editor);

      expect(page.root.querySelector('[title="Heading 2"]').classList.contains('tk-editor-button-active')).toBe(true);
      expect(page.root.querySelector('[title="Heading 1"]').classList.contains('tk-editor-button-active')).toBe(false);
      expect(page.rootInstance.selectionState.heading).toEqual({ level: 2 });
    });

    it('reflects the active text alignment', async () => {
      const { page, editor } = await setup();
      editor.__state.active.add('textAlign:center');
      editor.__state.attributes.textAlign = { textAlign: 'center' };

      await selectionChanged(page, editor);

      expect(page.rootInstance.selectionState.textAlign).toBe('center');
      // the default alignment buttons are plain actions, so they never carry the active class
      expect(buttonOf(page, 'alignCenter').classList.contains('tk-editor-button-active')).toBe(false);
    });

    it('highlights only the alignment matching the selection when alignment buttons are configured as toggles', async () => {
      const { page, editor } = await setup();
      editor.__state.active.add('textAlign:right');
      const alignToggle = (action: string) => customButton({ action, icon: action, behavior: 'toggle' });

      page.root.toolbar = [[alignToggle('alignLeft'), alignToggle('alignCenter'), alignToggle('alignRight'), alignToggle('alignJustify')]];
      await page.waitForChanges();

      const activeActions = Array.from(page.root.querySelectorAll('.tk-editor-button-active')).map(button => button.getAttribute('title'));
      expect(activeActions).toEqual(['alignRight']);
    });

    it('highlights undo and redo toggles based on history availability', async () => {
      const { page, editor } = await setup();
      editor.__state.canRedo = true;

      page.root.toolbar = [[customButton({ action: 'undo', icon: 'undo', behavior: 'toggle' }), customButton({ action: 'redo', icon: 'redo', behavior: 'toggle' })]];
      await page.waitForChanges();

      expect(buttonOf(page, 'undo').classList.contains('tk-editor-button-active')).toBe(false);
      expect(buttonOf(page, 'redo').classList.contains('tk-editor-button-active')).toBe(true);
    });

    it('highlights the link button when the selection is inside a link', async () => {
      const { page, editor } = await setup();
      editor.__state.active.add('link');

      await selectionChanged(page, editor);

      expect(buttonOf(page, 'link').classList.contains('tk-editor-button-active')).toBe(true);
      expect(page.rootInstance.selectionState.link).toBe(true);
    });

    it('marks undo and redo as disabled until history is available', async () => {
      const { page, editor } = await setup();
      expect(buttonOf(page, 'undo').classList.contains('tk-editor-button-undo-disabled')).toBe(true);
      expect(buttonOf(page, 'redo').classList.contains('tk-editor-button-redo-disabled')).toBe(true);

      editor.__state.canUndo = true;
      await selectionChanged(page, editor);

      expect(buttonOf(page, 'undo').classList.contains('tk-editor-button-undo-disabled')).toBe(false);
      expect(buttonOf(page, 'redo').classList.contains('tk-editor-button-redo-disabled')).toBe(true);
    });
  });

  describe('character counter', () => {
    it('configures the character count extension with maxLength and renders the counter', async () => {
      const { page } = await setup(`<tk-editor show-counter="true" max-length="20"></tk-editor>`);

      expect(configureOf(CharacterCount)).toHaveBeenCalledWith({ limit: 20 });
      expect(page.root.querySelector('.tk-editor-counter').textContent).toBe('0/20');
    });

    it('does not load the character count extension without the counter', async () => {
      await setup();

      expect(configureOf(CharacterCount)).not.toHaveBeenCalled();
    });

    it('updates the counter on user edits and flags it when the limit is reached', async () => {
      const { page, editor } = await setup(`<tk-editor show-counter="true" max-length="5"></tk-editor>`);
      const counter = () => page.root.querySelector('.tk-editor-counter');

      userEdit(editor, '<p>hey</p>');
      await page.waitForChanges();
      expect(counter().textContent).toBe('3/5');
      expect(counter().classList.contains('tk-editor-counter-maxed')).toBe(false);

      userEdit(editor, '<p>hello</p>');
      await page.waitForChanges();
      expect(counter().textContent).toBe('5/5');
      expect(counter().classList.contains('tk-editor-counter-maxed')).toBe(true);
    });

    it('updates the counter after an external value update', async () => {
      const { page } = await setup(`<tk-editor show-counter="true"></tk-editor>`);

      page.root.value = '<p>external</p>';
      await page.waitForChanges();

      expect(page.root.querySelector('.tk-editor-counter').textContent).toBe('8/140');
    });

    it('counts the initial content on creation', async () => {
      const { page } = await setup(`<tk-editor show-counter="true" value="<p>abcd</p>"></tk-editor>`);

      expect(page.root.querySelector('.tk-editor-counter').textContent).toBe('4/140');
    });
  });

  describe('resizing', () => {
    const startResize = async (html: string) => {
      const { page } = await setup(html);
      const content = page.root.querySelector('.tk-editor-content') as HTMLElement;
      Object.defineProperty(content, 'offsetHeight', { value: 200, configurable: true });
      const handle = page.root.querySelector('.tk-editor-resize-icon');
      handle?.dispatchEvent(new MouseEvent('mousedown', { clientY: 100 }));
      const dragTo = async (clientY: number) => {
        page.doc.dispatchEvent(new MouseEvent('mousemove', { clientY }));
        await page.waitForChanges();
      };
      return { page, content, dragTo };
    };

    it('renders a resize handle when resizable', async () => {
      const { page } = await setup(`<tk-editor resizable="true"></tk-editor>`);

      expect(page.root.querySelector('.tk-editor-footer .tk-editor-resize-icon')).not.toBeNull();
    });

    it('grows the content area by the dragged distance', async () => {
      const { content, dragTo } = await startResize(`<tk-editor resizable="true"></tk-editor>`);

      await dragTo(160);

      expect(content.style.height).toBe('260px');
      expect(content.style.minHeight).toBe('unset');
    });

    it('never shrinks the content area below 120px', async () => {
      const { content, dragTo } = await startResize(`<tk-editor resizable="true"></tk-editor>`);

      await dragTo(-500);

      expect(content.style.height).toBe('120px');
    });

    it('stops tracking the pointer after mouseup', async () => {
      const { page, content, dragTo } = await startResize(`<tk-editor resizable="true"></tk-editor>`);

      await dragTo(150);
      page.doc.dispatchEvent(new MouseEvent('mouseup'));
      await dragTo(400);

      expect(content.style.height).toBe('250px');
    });

    it('ignores the resize handle while disabled', async () => {
      const { content, dragTo } = await startResize(`<tk-editor resizable="true" disabled="true"></tk-editor>`);

      await dragTo(300);

      expect(content.style.height).toBe('');
    });
  });

  describe('extensions', () => {
    const setupWithExtensions = async (extensions: AnyExtension[]) => {
      const page = await newSpecPage({ components: [TkEditor], template: () => <tk-editor extensions={extensions}></tk-editor> });
      return { page, editor: latestEditor() };
    };

    it('loads the default extensions when none are provided', async () => {
      const { editor } = await setup();

      // Tiptap 3's StarterKit bundles link/underline and enables ListKeymap and TrailingNode;
      // all four stay off so the editor keeps its Tiptap 2 output and keyboard behaviour
      expect(configureOf(StarterKit)).toHaveBeenCalledWith(STARTER_KIT_OVERRIDES);
      expect(STARTER_KIT_OVERRIDES).toEqual({ link: false, underline: false, listKeymap: false, trailingNode: false });
      expect(configureOf(Underline)).toHaveBeenCalled();
      expect(configureOf(TextAlign)).toHaveBeenCalled();
      expect(configureOf(Link)).toHaveBeenCalled();
      expect(configureOf(Image)).toHaveBeenCalled();
      expect(editor.__options.extensions.map(ext => ext.name)).toEqual(['placeholder', 'starterKit', 'underline', 'textAlign', 'link', 'image']);
    });

    it('disables the starter-kit counterpart of a user-provided extension', async () => {
      const custom = { name: 'bold' } as AnyExtension;
      const { editor } = await setupWithExtensions([custom]);

      expect(configureOf(StarterKit)).toHaveBeenCalledWith({ bold: false, ...STARTER_KIT_OVERRIDES });
      expect(editor.__options.extensions.slice(-1)[0]).toBe(custom);
    });

    it('skips the built-in underline, textAlign, link and image extensions when the user provides them', async () => {
      const { editor } = await setupWithExtensions([{ name: 'underline' }, { name: 'textAlign' }, { name: 'link' }, { name: 'image' }] as AnyExtension[]);

      expect(configureOf(Underline)).not.toHaveBeenCalled();
      expect(configureOf(TextAlign)).not.toHaveBeenCalled();
      expect(configureOf(Link)).not.toHaveBeenCalled();
      expect(configureOf(Image)).not.toHaveBeenCalled();
      expect(editor.__options.extensions.map(ext => ext.name)).toEqual(['placeholder', 'starterKit', 'underline', 'textAlign', 'link', 'image']);
    });

    it('treats a null extensions prop as no extensions', async () => {
      const { editor } = await setupWithExtensions(null);

      expect(editor.__options.extensions).toHaveLength(6);
    });
  });
});
