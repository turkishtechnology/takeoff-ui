jest.mock('@tiptap/core', () => ({
  Editor: jest.fn().mockImplementation((options: { content?: string; onCreate?: (payload: { editor: unknown }) => void; onUpdate?: (payload: { editor: unknown }) => void }) => {
    let html = options.content || '';
    const instance = {
      getHTML: () => html,
      getJSON: () => ({}),
      getText: () => '',
      setEditable: jest.fn(),
      destroy: jest.fn(),
      commands: {
        // mirrors Tiptap v2: onUpdate fires only when emitUpdate is true
        setContent: jest.fn((content: string, emitUpdate?: boolean) => {
          html = content;
          if (emitUpdate) {
            options.onUpdate?.({ editor: instance });
          }
        }),
      },
      storage: { characterCount: { characters: () => 0 } },
      isActive: jest.fn(() => false),
      getAttributes: jest.fn(() => ({})),
      can: jest.fn(() => ({ undo: jest.fn(() => false), redo: jest.fn(() => false) })),
      __setHtml: (next: string) => {
        html = next;
      },
      __options: options,
    };
    options.onCreate?.({ editor: instance });
    return instance;
  }),
}));

jest.mock('@tiptap/extension-placeholder', () => ({ __esModule: true, default: { configure: jest.fn(() => ({ name: 'placeholder' })) } }));
jest.mock('@tiptap/extension-character-count', () => ({ __esModule: true, default: { configure: jest.fn(() => ({ name: 'characterCount' })) } }));
jest.mock('@tiptap/starter-kit', () => ({ __esModule: true, default: { configure: jest.fn(() => ({ name: 'starterKit' })) } }));
jest.mock('@tiptap/extension-text-align', () => ({ __esModule: true, default: { configure: jest.fn(() => ({ name: 'textAlign' })) } }));
jest.mock('@tiptap/extension-underline', () => ({ __esModule: true, default: { configure: jest.fn(() => ({ name: 'underline' })) } }));
jest.mock('@tiptap/extension-link', () => ({ __esModule: true, default: { configure: jest.fn(() => ({ name: 'link' })) } }));
jest.mock('@tiptap/extension-image', () => ({ __esModule: true, default: { configure: jest.fn(() => ({ name: 'image' })) } }));

import { newSpecPage } from '@stencil/core/testing';
import { Editor } from '@tiptap/core';
import { TkEditor } from '../tk-editor';

describe('tk-editor', () => {
  beforeEach(() => {
    (Editor as unknown as jest.Mock).mockClear();
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
    expect(editorMock.commands.setContent).toHaveBeenCalledWith('<p>reverted</p>', true);
    expect(onTkChange).not.toHaveBeenCalled();

    // the next real user edit fires Tiptap's onUpdate and must not be swallowed
    editorMock.__setHtml('<p><strong>reverted</strong></p>');
    editorMock.__options.onUpdate({ editor: editorMock });
    expect(onTkChange).toHaveBeenCalledTimes(1);
    expect(onTkChange.mock.calls[0][0].detail).toBe('<p><strong>reverted</strong></p>');
  });
});
