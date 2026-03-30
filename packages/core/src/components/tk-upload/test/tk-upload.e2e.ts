import { newE2EPage } from '@stencil/core/testing';

describe('tk-upload', () => {
  it('removes a rendered file and emits removed-file', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-upload></tk-upload>');
    await page.$eval('tk-upload', el => {
      (el as HTMLTkUploadElement).value = [new File(['hello'], 'hello.txt', { type: 'text/plain', lastModified: 1 })];
    });
    await page.waitForChanges();

    const upload = await page.find('tk-upload');
    const removedSpy = await upload.spyOnEvent('tk-removed-file');
    const removeButton = await page.find('tk-upload .tk-upload-file-buttons tk-button >>> button');

    await removeButton.click();
    await page.waitForChanges();

    expect(await page.$eval('tk-upload', el => (el as HTMLTkUploadElement).value.length)).toBe(0);
    expect(removedSpy).toHaveReceivedEvent();
  });
});
