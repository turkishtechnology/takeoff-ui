jest.mock('@tiptap/core', () => ({
  Editor: jest
    .fn()
    .mockImplementation(
      (options: { content?: string; onCreate?: (payload: { editor: { getText: () => string; storage: { characterCount: { characters: () => number } } } }) => void }) => {
        options.onCreate?.({ editor: { getText: () => '', storage: { characterCount: { characters: () => 0 } } } });
        return {
          getHTML: () => options.content || '',
          getJSON: () => ({}),
          getText: () => '',
          setEditable: jest.fn(),
          destroy: jest.fn(),
          commands: { setContent: jest.fn() },
          storage: { characterCount: { characters: () => 0 } },
          isActive: jest.fn(() => false),
          getAttributes: jest.fn(() => ({})),
          can: jest.fn(() => ({ undo: jest.fn(() => false), redo: jest.fn(() => false) })),
        };
      },
    ),
}));

jest.mock('@tiptap/extension-placeholder', () => ({ __esModule: true, default: { configure: jest.fn(() => ({ name: 'placeholder' })) } }));
jest.mock('@tiptap/extension-character-count', () => ({ __esModule: true, default: { configure: jest.fn(() => ({ name: 'characterCount' })) } }));
jest.mock('@tiptap/starter-kit', () => ({ __esModule: true, default: { configure: jest.fn(() => ({ name: 'starterKit' })) } }));
jest.mock('@tiptap/extension-text-align', () => ({ __esModule: true, default: { configure: jest.fn(() => ({ name: 'textAlign' })) } }));
jest.mock('@tiptap/extension-underline', () => ({ __esModule: true, default: { configure: jest.fn(() => ({ name: 'underline' })) } }));
jest.mock('@tiptap/extension-link', () => ({ __esModule: true, default: { configure: jest.fn(() => ({ name: 'link' })) } }));
jest.mock('@tiptap/extension-image', () => ({ __esModule: true, default: { configure: jest.fn(() => ({ name: 'image' })) } }));

import { newSpecPage } from '@stencil/core/testing';
import { TkEditor } from '../tk-editor';

describe('tk-editor', () => {
  it('hides the toolbar when hideToolbar is enabled', async () => {
    const page = await newSpecPage({
      components: [TkEditor],
      html: `<tk-editor hide-toolbar="true"></tk-editor>`,
    });

    expect(page.root.querySelector('.tk-editor-toolbar')).toBeNull();
  });
});
