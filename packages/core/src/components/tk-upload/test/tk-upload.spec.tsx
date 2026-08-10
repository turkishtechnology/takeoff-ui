const mockGetExtension = jest.fn(() => 'txt');

jest.mock('mime', () => ({
  __esModule: true,
  default: { getExtension: (...args: unknown[]) => mockGetExtension(...(args as [])) },
}));

jest.mock('filesize', () => ({
  filesize: (size: number) => `${size} B`,
}));

import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { TkUpload } from '../tk-upload';

function createFileList(files: File[]): FileList {
  const fileList: Record<string, unknown> = {
    length: files.length,
    item: (index: number) => files[index] ?? null,
  };
  files.forEach((file, index) => {
    fileList[index] = file;
  });
  return fileList as unknown as FileList;
}

function selectFiles(page: SpecPage, files: File[]) {
  const input = page.root.querySelector('input[type="file"]') as HTMLInputElement;
  Object.defineProperty(input, 'files', { value: createFileList(files), configurable: true });
  input.dispatchEvent(new Event('change'));
  return page.waitForChanges();
}

describe('tk-upload', () => {
  beforeEach(() => {
    mockGetExtension.mockReset();
    mockGetExtension.mockReturnValue('txt');
    (global.URL as any).createObjectURL = jest.fn(() => 'blob:mock-url');
  });

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

  describe('rendering', () => {
    it('renders default dropzone with title, description and buttons', async () => {
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload></tk-upload>`,
      });

      expect(page.root.querySelector('.tk-upload-container').classList.contains('drag-drop-enabled')).toBe(true);
      expect(page.root.querySelector('.tk-upload-title').textContent).toBe('Choose a file or drag & drop it here.');
      expect(page.root.querySelector('.tk-upload-description').textContent).toBe('JPEG, PNG, PDF and MP4 formats, up to 50 MB.');
      const buttons = page.root.querySelectorAll('.tk-upload-input tk-button');
      expect(buttons).toHaveLength(2);
      expect(buttons[0].getAttribute('label')).toBe('Choose File');
      expect(buttons[1].getAttribute('label')).toBe('Upload');
      expect(page.root.querySelector('.tk-upload-file-holder')).not.toBeNull();
    });

    it('renders label with asterisk when showAsterisk is set', async () => {
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload label="Documents" show-asterisk="true"></tk-upload>`,
      });

      const label = page.root.querySelector('label.label');
      expect(label.textContent).toContain('Documents');
      expect(label.querySelector('.asterisk')).not.toBeNull();
    });

    it('renders hint and error messages', async () => {
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload hint="Only PDF files"></tk-upload>`,
      });

      expect(page.root.querySelector('.tk-hint-wrapper span').textContent).toBe('Only PDF files');

      page.root.error = 'Upload failed';
      page.root.invalid = true;
      await page.waitForChanges();

      const wrapper = page.root.querySelector('.tk-hint-wrapper');
      expect(wrapper.classList.contains('error')).toBe(true);
      expect(wrapper.classList.contains('invalid')).toBe(true);
      expect(wrapper.querySelector('span').textContent).toBe('Upload failed');
    });

    it('hides the upload button when autoUpload is enabled', async () => {
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload auto-upload="true"></tk-upload>`,
      });

      expect(page.root.querySelectorAll('.tk-upload-input tk-button')).toHaveLength(1);
    });

    it('applies centered type and disabled state to the dropzone', async () => {
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload type="centered" disabled="true"></tk-upload>`,
      });

      const dropzone = page.root.querySelector('.tk-upload-dropzone');
      expect(dropzone.classList.contains('centered')).toBe(true);
      expect(dropzone.classList.contains('disabled')).toBe(true);
      expect(page.root.querySelector('.tk-upload-container').hasAttribute('aria-disabled')).toBe(true);
    });

    it('does not render the file holder when showFiles is false', async () => {
      const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload show-files="false"></tk-upload>`,
      });

      page.root.value = [file];
      await page.waitForChanges();

      expect(page.root.querySelector('.tk-upload-file-holder')).toBeNull();
    });

    it('renders an image preview for image files', async () => {
      const file = new File(['img'], 'photo.png', { type: 'image/png' });
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload></tk-upload>`,
      });

      page.root.value = [file];
      await page.waitForChanges();

      const img = page.root.querySelector('.tk-upload-file-preview img');
      expect(img.getAttribute('src')).toBe('blob:mock-url');
      expect((global.URL as any).createObjectURL).toHaveBeenCalledWith(file);
    });

    it('renders extension text for non-image files using mime type', async () => {
      const file = new File(['hello'], 'notes.txt', { type: 'text/plain' });
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload></tk-upload>`,
      });

      page.root.value = [file];
      await page.waitForChanges();

      expect(page.root.querySelector('.extension-text').textContent).toBe('TXT');
      expect(page.root.querySelector('.tk-upload-size').textContent).toBe('5 B');
    });

    it('falls back to the file name extension when mime lookup fails', async () => {
      mockGetExtension.mockReturnValue(null);
      const file = new File(['data'], 'archive.rar', { type: 'application/x-rar' });
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload></tk-upload>`,
      });

      page.root.value = [file];
      await page.waitForChanges();

      expect(page.root.querySelector('.extension-text').textContent).toBe('RAR');
    });
  });

  describe('file states', () => {
    it('renders the added state by default', async () => {
      const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload></tk-upload>`,
      });

      page.root.value = [file];
      await page.waitForChanges();

      const state = page.root.querySelector('.tk-upload-state');
      expect(state.classList.contains('added')).toBe(true);
      expect(state.textContent).toContain('Added');
    });

    it('renders the loading state with a spinner', async () => {
      const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload loading="true" loading-label="Yükleniyor"></tk-upload>`,
      });

      page.root.value = [file];
      await page.waitForChanges();

      const state = page.root.querySelector('.tk-upload-state');
      expect(state.classList.contains('loading')).toBe(true);
      expect(state.querySelector('tk-spinner')).not.toBeNull();
      expect(state.textContent).toContain('Yükleniyor');
    });

    it('renders the failed state when invalid', async () => {
      const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload invalid="true" failed-label="Hata"></tk-upload>`,
      });

      page.root.value = [file];
      await page.waitForChanges();

      const state = page.root.querySelector('.tk-upload-state');
      expect(state.classList.contains('failed')).toBe(true);
      expect(state.textContent).toContain('Hata');
      expect(page.root.querySelector('.tk-upload-container').hasAttribute('aria-invalid')).toBe(true);
    });
  });

  describe('file selection', () => {
    it('accepts a valid file and emits tk-change', async () => {
      const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload></tk-upload>`,
      });

      const changeSpy = jest.fn();
      page.root.addEventListener('tk-change', changeSpy);

      await selectFiles(page, [file]);

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.mock.calls[0][0].detail).toEqual([file]);
      expect(page.root.value).toEqual([file]);
    });

    it('replaces the previous file in single selection mode', async () => {
      const first = new File(['a'], 'a.txt', { type: 'text/plain' });
      const second = new File(['b'], 'b.txt', { type: 'text/plain' });
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload></tk-upload>`,
      });

      await selectFiles(page, [first]);
      await selectFiles(page, [second]);

      expect(page.root.value).toEqual([second]);
    });

    it('appends files in multiple selection mode', async () => {
      const first = new File(['a'], 'a.txt', { type: 'text/plain' });
      const second = new File(['b'], 'b.txt', { type: 'text/plain' });
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload multiple="true"></tk-upload>`,
      });

      const changeSpy = jest.fn();
      page.root.addEventListener('tk-change', changeSpy);

      await selectFiles(page, [first, second]);

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.mock.calls[0][0].detail).toEqual([first, second]);
    });

    it('rejects files exceeding maxFileSize', async () => {
      const bigFile = new File(['x'.repeat(100)], 'big.txt', { type: 'text/plain' });
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload max-file-size="10"></tk-upload>`,
      });

      const changeSpy = jest.fn();
      const rejectedSpy = jest.fn();
      page.root.addEventListener('tk-change', changeSpy);
      page.root.addEventListener('tk-files-rejected', rejectedSpy);

      await selectFiles(page, [bigFile]);

      expect(changeSpy).not.toHaveBeenCalled();
      expect(rejectedSpy).toHaveBeenCalledTimes(1);
      expect(rejectedSpy.mock.calls[0][0].detail[0].reason).toContain('File size exceeds');
      expect(rejectedSpy.mock.calls[0][0].detail[0].file).toBe(bigFile);
    });

    it('rejects files with a type not matching accept', async () => {
      const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload accept="image/png"></tk-upload>`,
      });

      const changeSpy = jest.fn();
      const rejectedSpy = jest.fn();
      page.root.addEventListener('tk-change', changeSpy);
      page.root.addEventListener('tk-files-rejected', rejectedSpy);

      await selectFiles(page, [file]);

      expect(changeSpy).not.toHaveBeenCalled();
      expect(rejectedSpy).toHaveBeenCalledTimes(1);
      expect(rejectedSpy.mock.calls[0][0].detail[0].reason).toContain('Invalid file type');
    });

    it('rejects the whole selection when maxFileCount is exceeded', async () => {
      const first = new File(['a'], 'a.txt', { type: 'text/plain' });
      const second = new File(['b'], 'b.txt', { type: 'text/plain' });
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload multiple="true" max-file-count="1"></tk-upload>`,
      });

      const changeSpy = jest.fn();
      const rejectedSpy = jest.fn();
      page.root.addEventListener('tk-change', changeSpy);
      page.root.addEventListener('tk-files-rejected', rejectedSpy);

      await selectFiles(page, [first, second]);

      expect(changeSpy).not.toHaveBeenCalled();
      expect(rejectedSpy).toHaveBeenCalledTimes(1);
      expect(rejectedSpy.mock.calls[0][0].detail[0].reason).toContain('Max file count exceeded');
      expect(page.root.value).toEqual([]);
    });

    it('accepts valid files and rejects invalid ones in the same selection', async () => {
      const valid = new File(['a'], 'a.txt', { type: 'text/plain' });
      const tooBig = new File(['x'.repeat(100)], 'big.txt', { type: 'text/plain' });
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload multiple="true" max-file-size="10"></tk-upload>`,
      });

      const changeSpy = jest.fn();
      const rejectedSpy = jest.fn();
      page.root.addEventListener('tk-change', changeSpy);
      page.root.addEventListener('tk-files-rejected', rejectedSpy);

      await selectFiles(page, [valid, tooBig]);

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.mock.calls[0][0].detail).toEqual([valid]);
      expect(rejectedSpy).toHaveBeenCalledTimes(1);
      expect(rejectedSpy.mock.calls[0][0].detail).toHaveLength(1);
    });

    it('emits tk-upload automatically when autoUpload is enabled', async () => {
      const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload auto-upload="true"></tk-upload>`,
      });

      const uploadSpy = jest.fn();
      page.root.addEventListener('tk-upload', uploadSpy);

      await selectFiles(page, [file]);

      expect(uploadSpy).toHaveBeenCalledTimes(1);
      expect(uploadSpy.mock.calls[0][0].detail).toEqual([file]);
    });

    it('ignores change events without files', async () => {
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload></tk-upload>`,
      });

      const changeSpy = jest.fn();
      page.root.addEventListener('tk-change', changeSpy);

      await selectFiles(page, []);

      expect(changeSpy).not.toHaveBeenCalled();
    });
  });

  describe('buttons', () => {
    it('triggers the hidden input when the choose button is clicked', async () => {
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload></tk-upload>`,
      });

      const input = page.root.querySelector('input[type="file"]') as HTMLInputElement;
      const clickSpy = jest.spyOn(input, 'click').mockImplementation(() => undefined);

      page.root.querySelectorAll('.tk-upload-input tk-button')[0].dispatchEvent(new CustomEvent('tk-click'));

      expect(clickSpy).toHaveBeenCalledTimes(1);
    });

    it('emits tk-upload when the upload button is clicked', async () => {
      const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload></tk-upload>`,
      });

      page.root.value = [file];
      await page.waitForChanges();

      const uploadSpy = jest.fn();
      page.root.addEventListener('tk-upload', uploadSpy);

      page.root.querySelectorAll('.tk-upload-input tk-button')[1].dispatchEvent(new CustomEvent('tk-click'));

      expect(uploadSpy).toHaveBeenCalledTimes(1);
      expect(uploadSpy.mock.calls[0][0].detail).toEqual([file]);
    });

    it('removes a file and emits tk-removed-file and tk-change', async () => {
      const first = new File(['a'], 'a.txt', { type: 'text/plain' });
      const second = new File(['b'], 'b.txt', { type: 'text/plain' });
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload multiple="true"></tk-upload>`,
      });

      page.root.value = [first, second];
      await page.waitForChanges();

      const changeSpy = jest.fn();
      const removedSpy = jest.fn();
      page.root.addEventListener('tk-change', changeSpy);
      page.root.addEventListener('tk-removed-file', removedSpy);

      const fileItems = page.root.querySelectorAll('.tk-upload-file-item');
      fileItems[1].querySelector('.tk-upload-file-buttons tk-button').dispatchEvent(new CustomEvent('tk-click'));
      await page.waitForChanges();

      expect(removedSpy).toHaveBeenCalledTimes(1);
      expect(removedSpy.mock.calls[0][0].detail).toBe(second);
      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.mock.calls[0][0].detail).toEqual([first]);
      expect(page.root.querySelectorAll('.tk-upload-file-item')).toHaveLength(1);
    });

    it('renders a download button and emits tk-download-file when downloadable', async () => {
      const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload downloadable="true"></tk-upload>`,
      });

      page.root.value = [file];
      await page.waitForChanges();

      const downloadSpy = jest.fn();
      page.root.addEventListener('tk-download-file', downloadSpy);

      const buttons = page.root.querySelectorAll('.tk-upload-file-buttons tk-button');
      expect(buttons).toHaveLength(2);

      buttons[0].dispatchEvent(new CustomEvent('tk-click'));

      expect(downloadSpy).toHaveBeenCalledTimes(1);
      expect(downloadSpy.mock.calls[0][0].detail).toBe(file);
    });
  });

  describe('value watcher', () => {
    it('clears the native input when value is emptied', async () => {
      const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload></tk-upload>`,
      });

      page.root.value = [file];
      await page.waitForChanges();

      const input = page.root.querySelector('input[type="file"]') as HTMLInputElement;
      input.value = 'hello.txt';

      page.root.value = [];
      await page.waitForChanges();

      expect(input.value).not.toBe('hello.txt');
    });
  });

  describe('drag and drop', () => {
    function createDragEvent(overrides: Record<string, unknown> = {}) {
      return {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        clientX: 0,
        clientY: 0,
        currentTarget: {
          getBoundingClientRect: () => ({ left: 0, right: 100, top: 0, bottom: 100 }),
        },
        ...overrides,
      } as unknown as DragEvent;
    }

    it('activates drag-over state on drag enter and drag over', async () => {
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload drag-drop-title="Bırak" drag-drop-description="Dosyaları bırak"></tk-upload>`,
      });
      const instance = page.rootInstance as any;

      const enterEvent = createDragEvent();
      instance.handleDragEnter(enterEvent);
      await page.waitForChanges();

      expect(enterEvent.preventDefault).toHaveBeenCalled();
      expect(page.root.querySelector('.tk-upload-dropzone').classList.contains('drag-over')).toBe(true);
      expect(page.root.querySelector('.tk-upload-title').textContent).toBe('Bırak');
      expect(page.root.querySelector('.tk-upload-description').textContent).toBe('Dosyaları bırak');

      const overEvent = createDragEvent();
      instance.handleDragOver(overEvent);
      await page.waitForChanges();

      expect(overEvent.preventDefault).toHaveBeenCalled();
      expect(page.root.querySelector('.tk-upload-dropzone').classList.contains('drag-over')).toBe(true);
    });

    it('keeps drag-over state when leaving within the dropzone bounds', async () => {
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload></tk-upload>`,
      });
      const instance = page.rootInstance as any;

      instance.handleDragEnter(createDragEvent());
      instance.handleDragLeave(createDragEvent({ clientX: 50, clientY: 50 }));
      await page.waitForChanges();

      expect(page.root.querySelector('.tk-upload-dropzone').classList.contains('drag-over')).toBe(true);
    });

    it('clears drag-over state when leaving the dropzone bounds', async () => {
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload></tk-upload>`,
      });
      const instance = page.rootInstance as any;

      instance.handleDragEnter(createDragEvent());
      instance.handleDragLeave(createDragEvent({ clientX: 200, clientY: 50 }));
      await page.waitForChanges();

      expect(page.root.querySelector('.tk-upload-dropzone').classList.contains('drag-over')).toBe(false);
    });

    it('processes dropped files and emits tk-change', async () => {
      const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload></tk-upload>`,
      });
      const instance = page.rootInstance as any;

      const changeSpy = jest.fn();
      page.root.addEventListener('tk-change', changeSpy);

      instance.handleDragEnter(createDragEvent());
      instance.handleDrop(createDragEvent({ dataTransfer: { files: createFileList([file]) } }));
      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.mock.calls[0][0].detail).toEqual([file]);
      expect(page.root.querySelector('.tk-upload-dropzone').classList.contains('drag-over')).toBe(false);
    });

    it('ignores drops without files', async () => {
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload></tk-upload>`,
      });
      const instance = page.rootInstance as any;

      const changeSpy = jest.fn();
      page.root.addEventListener('tk-change', changeSpy);

      instance.handleDrop(createDragEvent({ dataTransfer: { files: createFileList([]) } }));
      await page.waitForChanges();

      expect(changeSpy).not.toHaveBeenCalled();
    });

    it('ignores drag events when disabled', async () => {
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload disabled="true"></tk-upload>`,
      });
      const instance = page.rootInstance as any;

      const enterEvent = createDragEvent();
      instance.handleDragEnter(enterEvent);
      const leaveEvent = createDragEvent();
      instance.handleDragLeave(leaveEvent);
      const overEvent = createDragEvent();
      instance.handleDragOver(overEvent);
      const dropEvent = createDragEvent();
      instance.handleDrop(dropEvent);
      await page.waitForChanges();

      expect(enterEvent.preventDefault).not.toHaveBeenCalled();
      expect(leaveEvent.preventDefault).not.toHaveBeenCalled();
      expect(overEvent.preventDefault).not.toHaveBeenCalled();
      expect(dropEvent.preventDefault).not.toHaveBeenCalled();
      expect(page.root.querySelector('.tk-upload-dropzone').classList.contains('drag-over')).toBe(false);
    });

    it('ignores drag events when dragDrop is false', async () => {
      const page = await newSpecPage({
        components: [TkUpload],
        html: `<tk-upload drag-drop="false"></tk-upload>`,
      });
      const instance = page.rootInstance as any;

      const enterEvent = createDragEvent();
      instance.handleDragEnter(enterEvent);
      await page.waitForChanges();

      expect(enterEvent.preventDefault).not.toHaveBeenCalled();
      expect(page.root.querySelector('.tk-upload-container').classList.contains('drag-drop-enabled')).toBe(false);
    });
  });
});
