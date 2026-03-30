jest.mock('mime', () => ({
  __esModule: true,
  default: { getExtension: () => 'txt' },
}));

jest.mock('filesize', () => ({
  filesize: (size: number) => `${size} B`,
}));

import { newSpecPage } from '@stencil/core/testing';
import { TkUpload } from '../tk-upload';

describe('tk-upload', () => {
  it('renders uploaded file names when showFiles is enabled', async () => {
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    const page = await newSpecPage({
      components: [TkUpload],
      html: `<tk-upload></tk-upload>`,
    });

    page.root.value = [file];
    await page.waitForChanges();

    expect(page.root.querySelector('.tk-upload-file-name')?.textContent).toBe('hello.txt');
  });
});
