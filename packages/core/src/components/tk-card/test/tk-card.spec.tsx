import { newSpecPage } from '@stencil/core/testing';
import { TkCard } from '../tk-card';

describe('tk-card', () => {
  describe('basic rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [TkCard],
        html: `<tk-card></tk-card>`,
      });
      expect(page.root).toBeTruthy();
      expect(page.root.shadowRoot.querySelector('.tk-card')).toBeTruthy();
    });

    it('should render with custom header and subheader', async () => {
      const page = await newSpecPage({
        components: [TkCard],
        html: `<tk-card header="Test Header" subheader="Test Subheader"></tk-card>`,
      });
      const title = page.root.shadowRoot.querySelector('.tk-card-title');
      const subtitle = page.root.shadowRoot.querySelector('.tk-card-subtitle');
      expect(title.textContent).toBe('Test Header');
      expect(subtitle.textContent).toBe('Test Subheader');
    });

    it('should render slots correctly', async () => {
      const page = await newSpecPage({
        components: [TkCard],
        html: `
          <tk-card>
            <div slot="header">Custom Header</div>
            <div slot="avatar">Custom Avatar</div>
            <div slot="content">Custom Content</div>
            <div slot="footer">Custom Footer</div>
            <div slot="footer-actions">Custom Footer Actions</div>
          </tk-card>
        `,
      });
      const slotContents = {
        'header': 'Custom Header',
        'avatar': 'Custom Avatar',
        'content': 'Custom Content',
        'footer': 'Custom Footer',
        'footer-actions': 'Custom Footer Actions',
      };
      for (const [slot, expectedContent] of Object.entries(slotContents)) {
        const element = page.root.querySelector(`[slot="${slot}"]`);
        expect(element).toBeTruthy();
        expect(element.textContent).toBe(expectedContent);
      }
    });
  });

  describe('state handling', () => {
    it('should apply correct header type class', async () => {
      const page = await newSpecPage({
        components: [TkCard],
        html: `<tk-card header="Test Header" header-type="divided"></tk-card>`,
      });
      const header = page.root.shadowRoot.querySelector('.tk-card-header');
      expect(header).toBeTruthy();
      expect(header.classList.contains('tk-card-header-divided')).toBe(true);
    });

    it('should handle all header types correctly', async () => {
      const headerTypes = ['basic', 'divided', 'light', 'dark', 'primary'];
      for (const type of headerTypes) {
        const page = await newSpecPage({
          components: [TkCard],
          html: `<tk-card header-type="${type}" header="Test"></tk-card>`,
        });
        const header = page.root.shadowRoot.querySelector('.tk-card-header');
        expect(header.classList.contains(`tk-card-header-${type}`)).toBe(true);
      }
    });

    it('should hide header when hideHeader is true', async () => {
      const page = await newSpecPage({
        components: [TkCard],
        html: `<tk-card hide-header="true"></tk-card>`,
      });
      const header = page.root.shadowRoot.querySelector('.tk-card-header');
      expect(header).toBeFalsy();
    });

    it('should apply correct footer type class', async () => {
      const page = await newSpecPage({
        components: [TkCard],
        html: `<tk-card footer-type="divided"><div slot="footer-actions"></div></tk-card>`,
      });
      const footer = page.root.shadowRoot.querySelector('.tk-card-footer');
      expect(footer.classList.contains('tk-card-footer-divided')).toBe(true);
    });

    it('should handle horizontal layout correctly', async () => {
      const page = await newSpecPage({
        components: [TkCard],
        html: `<tk-card horizontal="true"></tk-card>`,
      });
      const card = page.root.shadowRoot.querySelector('.tk-card');
      expect(card.classList.contains('tk-card-horizontal')).toBe(true);
    });

    it('should apply hover shadow when enableHoverShadow is true', async () => {
      const page = await newSpecPage({
        components: [TkCard],
        html: `<tk-card enable-hover-shadow="true"></tk-card>`,
      });
      const card = page.root.shadowRoot.querySelector('.tk-card');
      expect(card.classList.contains('has-hover-shadow')).toBe(true);
    });
  });

  describe('image handling', () => {
    it('should render image when image prop is provided', async () => {
      const page = await newSpecPage({
        components: [TkCard],
        html: `<tk-card image="https://example.com/image.jpg"></tk-card>`,
      });
      const image = page.root.shadowRoot.querySelector('.tk-card-image img');
      expect(image).toBeTruthy();
      expect(image.getAttribute('src')).toBe('https://example.com/image.jpg');
    });

    it('should handle image position correctly', async () => {
      const positions = ['top', 'left', 'right'];
      for (const position of positions) {
        const page = await newSpecPage({
          components: [TkCard],
          html: `<tk-card image="https://example.com/image.jpg" horizontal="true"}></tk-card>`,
        });
        page.rootInstance.imageOptions = { position: position };
        await page.waitForChanges();
        const image = page.root.shadowRoot.querySelector('.tk-card-image');
        expect(image.classList.contains(`tk-card-image-${position}`)).toBe(true);
      }
    });
  });
});
