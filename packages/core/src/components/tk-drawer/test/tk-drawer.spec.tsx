import { newSpecPage } from '@stencil/core/testing';
import { TkDrawer } from '../tk-drawer';
import { TkButton } from '../../tk-button/tk-button';

describe('tk-drawer', () => {
  it('renders closed by default and visible when open is true', async () => {
    const closedPage = await newSpecPage({
      components: [TkDrawer],
      html: `<tk-drawer></tk-drawer>`,
    });

    expect(closedPage.root.shadowRoot.querySelector('.tk-drawer-mask')).toBeFalsy();

    const openPage = await newSpecPage({
      components: [TkDrawer],
      html: `<tk-drawer open="true" header="Test Header"></tk-drawer>`,
    });

    const mask = openPage.root.shadowRoot.querySelector('.tk-drawer-mask');
    const label = openPage.root.shadowRoot.querySelector('.tk-drawer-header-label');

    expect(mask).toBeTruthy();
    expect(mask.classList.contains('tk-drawer-visible')).toBe(true);
    expect(label.textContent).toBe('Test Header');
  });

  it('emits close when the header close button is used', async () => {
    const page = await newSpecPage({
      components: [TkDrawer, TkButton],
      html: `<tk-drawer open="true" header="Test"></tk-drawer>`,
    });

    const closeSpy = jest.fn();

    page.root.addEventListener('tk-drawer-close', closeSpy);
    page.root.shadowRoot.querySelector('tk-button').dispatchEvent(new CustomEvent('tk-click', { bubbles: true, composed: true }));
    await page.waitForChanges();

    expect(closeSpy).toHaveBeenCalledTimes(1);
    expect(page.root.open).toBe(true);
  });

  it('emits open and close events from public methods', async () => {
    const page = await newSpecPage({
      components: [TkDrawer],
      html: `<tk-drawer></tk-drawer>`,
    });

    const openSpy = jest.fn();
    const closeSpy = jest.fn();

    page.root.addEventListener('tk-drawer-open', openSpy);
    page.root.addEventListener('tk-drawer-close', closeSpy);

    await page.root.show();
    await page.root.close();

    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it('applies header, footer and mask classes', async () => {
    const page = await newSpecPage({
      components: [TkDrawer],
      html: `
        <tk-drawer open="true" header-type="dark" footer-type="divided" mask-variant="dark" hide-backdrop="true">
          <div slot="footer">Footer</div>
        </tk-drawer>
      `,
    });

    expect(page.root.shadowRoot.querySelector('.tk-drawer-header').classList.contains('tk-drawer-header-dark')).toBe(true);
    expect(page.root.shadowRoot.querySelector('.tk-drawer-footer').classList.contains('tk-drawer-footer-divided')).toBe(true);
    expect(page.root.shadowRoot.querySelector('.tk-drawer-mask').classList.contains('tk-drawer-mask-dark')).toBe(true);
    expect(page.root.shadowRoot.querySelector('.tk-drawer-mask').classList.contains('tk-drawer-mask-hidden')).toBe(true);
  });

  it('only emits overlay close when dismiss is allowed', async () => {
    const dismissiblePage = await newSpecPage({
      components: [TkDrawer],
      html: `<tk-drawer open="true"></tk-drawer>`,
    });

    const dismissibleSpy = jest.fn();
    dismissiblePage.root.addEventListener('tk-drawer-close', dismissibleSpy);
    (dismissiblePage.root.shadowRoot.querySelector('.tk-drawer-overlay') as HTMLDivElement).click();
    await dismissiblePage.waitForChanges();

    expect(dismissibleSpy).toHaveBeenCalledTimes(1);

    const lockedPage = await newSpecPage({
      components: [TkDrawer],
      html: `<tk-drawer open="true" prevent-dismiss="true"></tk-drawer>`,
    });

    const lockedSpy = jest.fn();
    lockedPage.root.addEventListener('tk-drawer-close', lockedSpy);
    (lockedPage.root.shadowRoot.querySelector('.tk-drawer-overlay') as HTMLDivElement).click();
    await lockedPage.waitForChanges();

    expect(lockedSpy).not.toHaveBeenCalled();
  });
});
