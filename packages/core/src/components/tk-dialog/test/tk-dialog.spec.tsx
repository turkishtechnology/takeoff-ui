import { newSpecPage } from '@stencil/core/testing';
import { TkDialog } from '../tk-dialog';

describe('tk-dialog', () => {
  // Basic Rendering
  describe('basic rendering', () => {
    it('should not render when visible is false', async () => {
      const page = await newSpecPage({
        components: [TkDialog],
        html: `<tk-dialog></tk-dialog>`,
      });
      expect(page.root).toBeTruthy();
      expect(page.root.shadowRoot.querySelector('.tk-dialog-mask')).toBeFalsy();
    });
    it('should render when visible is true', async () => {
      const page = await newSpecPage({
        components: [TkDialog],
        html: `<tk-dialog visible="true"></tk-dialog>`,
      });
      const mask = page.root.shadowRoot.querySelector('.tk-dialog-mask');
      expect(mask).toBeTruthy();
      expect(mask.classList.contains('tk-dialog-visible')).toBe(true);
    });
    it('should render header with title and subtitle', async () => {
      const page = await newSpecPage({
        components: [TkDialog],
        html: `<tk-dialog visible="true" header="Test Header" subheader="Test Subheader"></tk-dialog>`,
      });
      const title = page.root.shadowRoot.querySelector('.tk-dialog-title');
      const subtitle = page.root.shadowRoot.querySelector('.tk-dialog-subtitle');
      expect(title.textContent).toBe('Test Header');
      expect(subtitle.textContent).toBe('Test Subheader');
    });
    it('should render custom content in slots', async () => {
      const page = await newSpecPage({
        components: [TkDialog],
        html: `
<tk-dialog visible="true">
<div slot="header">Custom Header</div>
<div slot="content">Custom Content</div>
<div slot="footer">Custom Footer</div>
<div slot="container">Custom Container</div>
<div slot="footer-actions">Custom Footer Actions</div>
</tk-dialog>
       `,
      });
      const slotContents = {
        'header': 'Custom Header',
        'content': 'Custom Content',
        'footer': 'Custom Footer',
        'container': 'Custom Container',
        'footer-actions': 'Custom Footer Actions',
      };
      for (const [slot, expectedContent] of Object.entries(slotContents)) {
        const element = page.root.querySelector(`[slot="${slot}"]`);
        expect(element).toBeTruthy();
        expect(element.textContent).toBe(expectedContent);
      }
    });
  });

  // State
  describe('state handling', () => {
    it('should apply correct header type class', async () => {
      const page = await newSpecPage({
        components: [TkDialog],
        html: `<tk-dialog visible="true" header-type="divided"></tk-dialog>`,
      });
      const header = page.root.shadowRoot.querySelector('.tk-dialog-header');
      expect(header.classList.contains('tk-dialog-header-divided')).toBe(true);
    });
    it('should handle all header types correctly', async () => {
      const headerTypes = ['basic', 'divided', 'light', 'dark', 'primary'];
      for (const type of headerTypes) {
        const page = await newSpecPage({
          components: [TkDialog],
          html: `<tk-dialog visible="true" header-type="${type}" header="Test"></tk-dialog>`,
        });
        const header = page.root.shadowRoot.querySelector('.tk-dialog-header');
        expect(header.classList.contains(`tk-dialog-header-${type}`)).toBe(true);
      }
    });
    it('should apply correct variant class and icon', async () => {
      const page = await newSpecPage({
        components: [TkDialog],
        html: `<tk-dialog visible="true" variant="success"></tk-dialog>`,
      });
      const dialog = page.root.shadowRoot.querySelector('.tk-dialog');
      const icon = page.root.shadowRoot.querySelector('.tk-dialog-sign-icon');
      expect(dialog.classList.contains('tk-dialog-success')).toBe(true);
      expect(icon.textContent).toBe('check_circle');
    });
    it('should handle all variant icons correctly', async () => {
      const variants = {
        success: 'check_circle',
        warning: 'warning',
        danger: 'error',
        info: 'info',
      };
      for (const [variant, expectedIcon] of Object.entries(variants)) {
        const page = await newSpecPage({
          components: [TkDialog],
          html: `<tk-dialog visible="true" variant="${variant}"></tk-dialog>`,
        });
        const icon = page.root.shadowRoot.querySelector('.tk-dialog-sign-icon');
        expect(icon.textContent).toBe(expectedIcon);
      }
    });
    it('should hide close button when showCloseButton is false', async () => {
      const page = await newSpecPage({
        components: [TkDialog],
        html: `<tk-dialog visible="true" show-close-button="false"></tk-dialog>`,
      });
      const closeButton = page.root.shadowRoot.querySelector('tk-button[icon="close"]');
      expect(closeButton).toBeFalsy();
    });
    it('should hide backdrop when hideBackdrop is true', async () => {
      const page = await newSpecPage({
        components: [TkDialog],
        html: `<tk-dialog visible="true" hide-backdrop="true"></tk-dialog>`,
      });
      const mask = page.root.shadowRoot.querySelector('.tk-dialog-mask');
      expect(mask.classList.contains('tk-dialog-mask-hidden')).toBe(true);
    });
    it('should apply correct mask variant', async () => {
      const page = await newSpecPage({
        components: [TkDialog],
        html: `<tk-dialog visible="true" mask-variant="dark"></tk-dialog>`,
      });
      const mask = page.root.shadowRoot.querySelector('.tk-dialog-mask');
      expect(mask.classList.contains('tk-dialog-mask-dark')).toBe(true);
    });
    it('should handle container style prop', async () => {
      const testStyle = { maxWidth: '500px', backgroundColor: 'red' };
      const page = await newSpecPage({
        components: [TkDialog],
        html: `<tk-dialog visible="true"></tk-dialog>`,
      });
      page.root.containerStyle = testStyle;
      await page.waitForChanges();
      const dialog = page.root.shadowRoot.querySelector('.tk-dialog') as HTMLElement;
      expect(dialog.style.maxWidth).toBe('500px');
      expect(dialog.style.backgroundColor).toBe('red');
    });
  });

  // Event
  describe('event handling', () => {
    it('should emit tk-close event when close method is called', async () => {
      const page = await newSpecPage({
        components: [TkDialog],
        html: `<tk-dialog visible="true"></tk-dialog>`,
      });
      const closeSpy = jest.fn();
      page.root.addEventListener('tk-close', closeSpy);
      await page.root.close();
      expect(closeSpy).toHaveBeenCalled();
    });
    it('should handle visibility change events', async () => {
      const page = await newSpecPage({
        components: [TkDialog],
        html: `<tk-dialog></tk-dialog>`,
      });
      const visibleChangeSpy = jest.fn();
      page.root.addEventListener('tk-visible-change', visibleChangeSpy);
      // Open
      await page.root.open();
      expect(visibleChangeSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: true,
        }),
      );
      // Close
      await page.root.close();
      expect(visibleChangeSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: false,
        }),
      );
    });
    it('should not close on overlay click when preventDismiss is true', async () => {
      const page = await newSpecPage({
        components: [TkDialog],
        html: `<tk-dialog visible="true" prevent-dismiss="true"></tk-dialog>`,
      });
      const closeSpy = jest.fn();
      page.root.addEventListener('tk-close', closeSpy);
      const overlay = page.root.shadowRoot.querySelector('.tk-dialog-overlay');
      const event = new MouseEvent('click');
      overlay.dispatchEvent(event);
      expect(closeSpy).not.toHaveBeenCalled();
    });
  });
});
