import { newE2EPage } from '@stencil/core/testing';

describe('tk-drawer', () => {
  // Basic Rendering
  describe('basic rendering', () => {
    it('should render with default props', async () => {
      const page = await newE2EPage();

      await page.setContent('<tk-drawer open="true"></tk-drawer>');

      const drawer = await page.find('tk-drawer');

      expect(drawer).toHaveClass('hydrated');

      const mask = await page.find('tk-drawer >>> [data-testid="mask"]');

      expect(mask).toBeFalsy();
    });
    it('should render custom slots content', async () => {
      const page = await newE2EPage();

      await page.setContent(`
<tk-drawer open="true">
<div slot="header" data-testid="custom-header">Header</div>
<div slot="footer" data-testid="custom-footer">Footer</div>
</tk-drawer>
     `);
      const headerContent = await page.find('tk-drawer >>> [data-testid="custom-header"]');

      const footerContent = await page.find('tk-drawer >>> [data-testid="custom-footer"]');

      expect(headerContent.textContent).toContain('Header');
      expect(footerContent.textContent).toContain('Footer');
    });
  });

  // State
  describe('state handling', () => {
    it('should apply header-type classes correctly', async () => {
      const page = await newE2EPage();

      await page.setContent('<tk-drawer open="true" header-type="dark"></tk-drawer>');

      const header = await page.find('tk-drawer >>> [data-testid="header"]');

      expect(header).toHaveClass('tk-drawer-header-dark');
    });
  });

  // Events
  describe('event handling', () => {
    it('should emit close event when overlay clicked', async () => {
      const page = await newE2EPage();

      await page.setContent('<tk-drawer open="true"></tk-drawer>');
      const closeSpy = await page.spyOnEvent('tk-drawer-close');
      const overlay = await page.find('tk-drawer >>> [data-testid="overlay"]');

      await overlay.click();
      await page.waitForChanges();

      expect(closeSpy).toHaveReceivedEvent();
    });

    it('should prevent close when prevent-dismiss is true', async () => {
      const page = await newE2EPage();

      await page.setContent('<tk-drawer open="true" prevent-dismiss></tk-drawer>');

      const closeSpy = await page.spyOnEvent('tk-close');
      const overlay = await page.find('tk-drawer >>> [data-testid="overlay"]');

      await overlay.click();
      await page.waitForChanges();

      expect(closeSpy).not.toHaveReceivedEvent();
    });
  });
});
