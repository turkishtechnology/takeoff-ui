import { newSpecPage } from '@stencil/core/testing';
import { TkDrawer } from '../tk-drawer';
import { TkButton } from '../../tk-button/tk-button';

// Basic Rendering
describe('tk-drawer', () => {
  it('should not render when open is false', async () => {
    const page = await newSpecPage({
      components: [TkDrawer],
      html: `<tk-drawer></tk-drawer>`,
    });

    expect(page.root).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('.tk-drawer-mask')).toBeFalsy();
  });

  it('should render when open is true', async () => {
    const page = await newSpecPage({
      components: [TkDrawer],
      html: `<tk-drawer open="true"></tk-drawer>`,
    });

    const mask = page.root.shadowRoot.querySelector('.tk-drawer-mask');

    expect(mask).toBeTruthy();
    expect(mask.classList.contains('tk-drawer-visible')).toBe(true);
  });

  it('should render header', async () => {
    const page = await newSpecPage({
      components: [TkDrawer],
      html: `<tk-drawer open="true" header="Test Header" ></tk-drawer>`,
    });
    const header = page.root.shadowRoot.querySelector('.tk-drawer-header .tk-drawer-header-label');

    expect(header.textContent).toBe('Test Header');
  });

  it('should render custom content in slots', async () => {
    const page = await newSpecPage({
      components: [TkDrawer],
      html: `
<tk-drawer open="true">
<div slot="header">Custom Header</div>
<div slot="content">Custom Content</div>
<div slot="footer">Custom Footer</div>
<div slot="container">Custom Container</div>
<div slot="header-actions">Custom Header Actions</div>
</tk-drawer>
       `,
    });
    const slotContents = {
      'header': 'Custom Header',
      'content': 'Custom Content',
      'footer': 'Custom Footer',
      'container': 'Custom Container',
      'header-actions': 'Custom Header Actions',
    };
    for (const [slot, expectedContent] of Object.entries(slotContents)) {
      const element = page.root.querySelector(`[slot="${slot}"]`);
      expect(element).toBeTruthy();
      expect(element.textContent).toBe(expectedContent);
    }
  });

  it('should handle header label when there is no header slot', async () => {
    const page = await newSpecPage({
      components: [TkDrawer],
      html: `<tk-drawer open="true" header="Test">
        </tk-drawer>`,
    });

    const label = page.root.shadowRoot.querySelector('.tk-drawer-header-label');

    expect(label.textContent).toBe('Test');
  });

  it('should render close button if there is no headerActionSlot ', async () => {
    const page = await newSpecPage({
      components: [TkDrawer, TkButton],
      html: `<tk-drawer open="true" header="Test" ></tk-drawer>`,
    });
    const drawer = page.root as HTMLTkDrawerElement;
    const tkButton = drawer.shadowRoot.querySelector('.tk-drawer-header tk-button');

    expect(tkButton).toBeTruthy();

    const button: HTMLButtonElement = tkButton.shadowRoot.querySelector('button');
    button.click();
    await page.waitForChanges();

    expect(drawer.open).toBe(false);
  });

  // Methods
  it('should drawer open when show method is called', async () => {
    const page = await newSpecPage({
      components: [TkDrawer],
      html: `<tk-drawer></tk-drawer>`,
    });

    const drawer = page.root as HTMLTkDrawerElement;
    await drawer.show();
    await page.waitForChanges();

    expect(drawer.open).toBe(true);
  });

  it('should drawer close when close method is called', async () => {
    const page = await newSpecPage({
      components: [TkDrawer],
      html: `<tk-drawer open="true"></tk-drawer>`,
    });

    const drawer = page.root as HTMLTkDrawerElement;
    await drawer.close();
    await page.waitForChanges();

    expect(drawer.open).toBe(false);
  });

  // State
  it('should handle all header types correctly', async () => {
    const headerTypes = ['basic', 'divided', 'light', 'dark', 'primary'];
    for (const type of headerTypes) {
      const page = await newSpecPage({
        components: [TkDrawer],
        html: `<tk-drawer open="true" header-type="${type}">
        </tk-drawer>`,
      });
      const header = page.root.shadowRoot.querySelector('.tk-drawer-header');
      expect(header.classList.contains(`tk-drawer-header-${type}`)).toBe(true);
    }
  });

  it('should handle all footer types correctly', async () => {
    const footerTypes = ['basic', 'divided', 'light'];
    for (const type of footerTypes) {
      const page = await newSpecPage({
        components: [TkDrawer],
        html: `<tk-drawer open="true" footer-type="${type}" footer="Test">
          <div slot="footer">Custom Footer</div></tk-drawer>`,
      });
      const footer = page.root.shadowRoot.querySelector('.tk-drawer-footer');
      expect(footer.classList.contains(`tk-drawer-footer-${type}`)).toBe(true);
    }
  });

  it('should handle all maskvariants correctly', async () => {
    const variants = ['lightest', 'light', 'base', 'dark', 'darkest'];
    for (const variant of variants) {
      const page = await newSpecPage({
        components: [TkDrawer],
        html: `<tk-drawer open="true" mask-variant="${variant}"></tk-drawer>`,
      });

      const mask = page.root.shadowRoot.querySelector(`.tk-drawer-mask`);

      expect(mask.classList.contains(`tk-drawer-mask-${variant}`)).toBe(true);
    }
  });

  it('should hide backdrop when hideBackdrop is true', async () => {
    const page = await newSpecPage({
      components: [TkDrawer],
      html: `<tk-drawer open="true" hide-backdrop="true" ></tk-drawer>`,
    });

    const mask = page.root.shadowRoot.querySelector(`.tk-drawer-mask`);

    expect(mask.classList.contains('tk-drawer-mask-hidden')).toBe(true);
  });

  it('should hide close button when hideCloseIcon is true', async () => {
    const page = await newSpecPage({
      components: [TkDrawer],
      html: `<tk-drawer open="true" hide-close-icon="true"></tk-drawer>`,
    });
    const closeButton = page.root.shadowRoot.querySelector('tk-button[icon="close"]');
    expect(closeButton).toBeFalsy();
  });

  it('should handle position transforms', async () => {
    const transformValue = [
      { position: 'left', style: 'translateX(-100%)' },
      { position: 'right', style: 'translateX(100%)' },
      { position: 'top', style: 'translateY(-100%)' },
      { position: 'bottom', style: 'translateY(100%)' },
      { position: '', style: '' },
    ];
    for (const value of transformValue) {
      const page = await newSpecPage({
        components: [TkDrawer],
        html: `<tk-drawer open="true" position=${value.position}></tk-drawer>`,
      });

      await page.waitForChanges();

      const drawer = page.root.shadowRoot.querySelector('.tk-drawer') as HTMLElement;

      expect(drawer.style.transform).toBe(value.style);
      expect(drawer.classList.contains(`tk-drawer-${value.position}`)).toBe(true);
    }
  });

  // Event
  it('should emit tk-drawer-close event after 300ms', async () => {
    const page = await newSpecPage({
      components: [TkDrawer],
      html: `<tk-drawer open="true"></tk-drawer>`,
    });

    const closeSpy = jest.fn();

    const drawer = page.root as HTMLTkDrawerElement;
    drawer.addEventListener('tk-drawer-close', closeSpy);

    drawer.open = false;
    await new Promise(resolve => setTimeout(resolve, 310));

    expect(closeSpy).toHaveBeenCalled();
  }, 50000);

  it('should not close on overlay click when preventDismiss is false', async () => {
    const page = await newSpecPage({
      components: [TkDrawer],
      html: `<tk-drawer open="true" ></tk-drawer>`,
    });

    const drawer = page.root as HTMLTkDrawerElement;

    const overlay: HTMLDivElement = drawer.shadowRoot.querySelector('.tk-drawer-overlay');

    overlay.click();
    await page.waitForChanges();

    expect(drawer.open).toBe(false);
  });
});
