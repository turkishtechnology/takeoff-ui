import { newE2EPage } from '@stencil/core/testing';

describe('tk-dialog', () => {
  // Basic Rendering
  describe('basic rendering', () => {
    it('should render with default props', async () => {
      const page = await newE2EPage();

      await page.setContent('<tk-dialog></tk-dialog>');

      const dialog = await page.find('tk-dialog');

      expect(dialog).toHaveClass('hydrated');

      const mask = await page.find('tk-dialog >>> [data-testid="mask"]');

      expect(mask).toBeFalsy();
    });
    it('should render custom slots content', async () => {
      const page = await newE2EPage();

      await page.setContent(`
<tk-dialog visible="true">
<div slot="header" data-testid="custom-header">Header</div>
<div slot="content" data-testid="custom-content">Content</div>
</tk-dialog>
     `);
      const headerContent = await page.find('tk-dialog >>> [data-testid="custom-header"]');

      const content = await page.find('tk-dialog >>> [data-testid="custom-content"]');

      expect(headerContent.textContent).toContain('Header');
      expect(content.textContent).toContain('Content');
    });
  });

  // State
  describe('state handling', () => {
    it('should toggle visibility when open/close methods called', async () => {
      const page = await newE2EPage();

      await page.setContent('<tk-dialog></tk-dialog>');

      // Open
      const openButton = await page.find('tk-dialog >>> [data-testid="open-button"]');

      await openButton.click();
      await page.waitForChanges();
      await page.waitForSelector('tk-dialog >>> [data-testid="mask"]', {
        visible: true,
      });

      // Close
      const closeButton = await page.find('tk-dialog >>> [data-testid="close-button"]');

      await closeButton.click();
      await page.waitForChanges();
      await page.waitForSelector('tk-dialog >>> [data-testid="mask"]', {
        hidden: true,
      });
    });

    it('should apply header-type classes correctly', async () => {
      const page = await newE2EPage();

      await page.setContent('<tk-dialog visible="true" header-type="dark"></tk-dialog>');

      const header = await page.find('tk-dialog >>> [data-testid="header"]');

      expect(header).toHaveClass('tk-dialog-header-dark');
    });
  });

  // Events
  describe('event handling', () => {
    it('should emit close event when overlay clicked', async () => {
      const page = await newE2EPage();

      await page.setContent('<tk-dialog visible="true"></tk-dialog>');
      const closeSpy = await page.spyOnEvent('tk-close');
      const overlay = await page.find('tk-dialog >>> [data-testid="overlay"]');

      await overlay.click();
      await page.waitForChanges();

      expect(closeSpy).toHaveReceivedEvent();
    });

    it('should prevent close when prevent-dismiss is true', async () => {
      const page = await newE2EPage();

      await page.setContent('<tk-dialog visible="true" prevent-dismiss></tk-dialog>');

      const closeSpy = await page.spyOnEvent('tk-close');
      const overlay = await page.find('tk-dialog >>> [data-testid="overlay"]');

      await overlay.click();
      await page.waitForChanges();

      expect(closeSpy).not.toHaveReceivedEvent();
    });
  });
});
