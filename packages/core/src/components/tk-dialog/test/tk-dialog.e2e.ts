import { newE2EPage } from '@stencil/core/testing';

describe('tk-dialog', () => {
  it('renders and applies visible state', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-dialog visible="true" header="Header"></tk-dialog>');

    const dialog = await page.find('tk-dialog');
    const mask = await page.find('tk-dialog .tk-dialog-mask');
    const title = await page.find('tk-dialog .tk-dialog-title');

    expect(dialog).toHaveClass('hydrated');
    expect(mask).toHaveClass('tk-dialog-visible');
    expect(title.textContent).toContain('Header');
  });

  it('renders slotted content and overlay events', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-dialog visible="true"><div slot="content">Content</div></tk-dialog>');
    await page.evaluate(() => {
      const dialog = document.querySelector('tk-dialog');
      (window as typeof window & { __dialogEvents: { close: number; visible: boolean[] } }).__dialogEvents = { close: 0, visible: [] };
      dialog.addEventListener('tk-close', () => {
        (window as typeof window & { __dialogEvents: { close: number; visible: boolean[] } }).__dialogEvents.close += 1;
      });
      dialog.addEventListener('tk-visible-change', (event: Event) => {
        (window as typeof window & { __dialogEvents: { close: number; visible: boolean[] } }).__dialogEvents.visible.push((event as CustomEvent<boolean>).detail);
      });
    });
    const overlay = await page.find('tk-dialog .tk-dialog-overlay');

    expect((await page.find('tk-dialog [slot="content"]')).textContent).toContain('Content');

    await page.evaluate(() => {
      (document.querySelector('tk-dialog .tk-dialog-overlay') as HTMLElement).click();
    });
    await page.waitForChanges();

    const events = await page.evaluate(() => (window as typeof window & { __dialogEvents: { close: number; visible: boolean[] } }).__dialogEvents);

    expect(events.close).toBe(1);
    expect(events.visible).toEqual([false]);
    expect(overlay).toBeTruthy();
  });

  it('does not close from overlay when prevent-dismiss is true', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-dialog visible="true" prevent-dismiss></tk-dialog>');
    await page.evaluate(() => {
      const dialog = document.querySelector('tk-dialog');
      (window as typeof window & { __dialogCloseCount: number }).__dialogCloseCount = 0;
      dialog.addEventListener('tk-close', () => {
        (window as typeof window & { __dialogCloseCount: number }).__dialogCloseCount += 1;
      });
    });

    await page.evaluate(() => {
      (document.querySelector('tk-dialog .tk-dialog-overlay') as HTMLElement).click();
    });
    await page.waitForChanges();

    expect(await page.evaluate(() => (window as typeof window & { __dialogCloseCount: number }).__dialogCloseCount)).toBe(0);
  });
});
