import { newE2EPage } from '@stencil/core/testing';

describe('tk-drawer', () => {
  it('renders visible drawer content', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-drawer open="true" header="Header"></tk-drawer>');
    await page.waitForChanges();
    await page.waitForTimeout(50);

    const drawer = await page.find('tk-drawer');
    const mask = await page.find('tk-drawer >>> .tk-drawer-mask');
    const header = await page.find('tk-drawer >>> .tk-drawer-header-label');

    expect(drawer).toHaveClass('hydrated');
    expect(mask).toHaveClass('tk-drawer-visible');
    expect(header.textContent).toContain('Header');
  });

  it('renders slot content and emits close on overlay click', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-drawer open="true"><div slot="footer">Footer</div></tk-drawer>');
    await page.waitForChanges();
    await page.waitForTimeout(50);

    const drawer = await page.find('tk-drawer');
    const closeSpy = await drawer.spyOnEvent('tk-drawer-close');
    const overlay = await page.find('tk-drawer >>> .tk-drawer-overlay');

    expect((await page.find('tk-drawer [slot="footer"]')).textContent).toContain('Footer');

    await overlay.click();
    await page.waitForChanges();

    expect(closeSpy).toHaveReceivedEvent();
  });

  it('does not emit close when prevent-dismiss is true', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-drawer open="true" prevent-dismiss></tk-drawer>');
    await page.waitForChanges();
    await page.waitForTimeout(50);

    const drawer = await page.find('tk-drawer');
    const closeSpy = await drawer.spyOnEvent('tk-drawer-close');
    const overlay = await page.find('tk-drawer >>> .tk-drawer-overlay');

    await overlay.click();
    await page.waitForChanges();

    expect(closeSpy).not.toHaveReceivedEvent();
  });
});
