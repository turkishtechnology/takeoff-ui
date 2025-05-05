import { newSpecPage } from '@stencil/core/testing';
import { TkBadge } from '../tk-badge';
describe('tk-badge', () => {
  //Basic Rendering
  describe('basic rendering', () => {
    it('renders with default props', async () => {
      const page = await newSpecPage({
        components: [TkBadge],
        html: `<tk-badge></tk-badge>`,
      });

      expect(page.root).toBeTruthy();
    });
    it('renders when rounded', async () => {
      const page = await newSpecPage({
        components: [TkBadge],
        html: `<tk-badge rounded="true"></tk-badge>`,
      });

      await page.waitForChanges();

      const badge = page.root.shadowRoot.querySelector('.tk-badge');

      expect(badge.classList.contains('rounded')).toBe(true);
    });
    it('renders with dot', async () => {
      const page = await newSpecPage({
        components: [TkBadge],
        html: `<tk-badge dot="true"></tk-badge>`,
      });

      await page.waitForChanges();

      const badge = page.root.shadowRoot.querySelector('.tk-badge');

      expect(badge.classList.contains('dot')).toBe(true);
    });
    it('renders content', async () => {
      const page = await newSpecPage({
        components: [TkBadge],
        html: `<tk-badge label="test"></tk-badge>`,
      });

      await page.waitForChanges();

      const badge = page.root.shadowRoot.querySelector('.tk-badge');

      expect(badge.textContent).toBe('test');
    });
  });

  //// State
  describe('state handling', () => {
    it('renders count only', async () => {
      const page = await newSpecPage({
        components: [TkBadge],
        html: `<tk-badge count=5></tk-badge>`,
      });

      const badge = page.root.shadowRoot.querySelector('.tk-badge');

      expect(badge.textContent).toBe('5');
      expect(badge.classList.contains('count')).toBe(true);
      expect(badge.classList.contains('dot')).toBe(false);
      expect(badge.classList.contains('icon-only')).toBe(false);
    });
    it('renders with different sizes', async () => {
      const sizes = ['xsmall', 'small', 'base', 'large', 'xlarge'];
      for (const size of sizes) {
        const page = await newSpecPage({
          components: [TkBadge],
          html: `<tk-badge size='${size}'></tk-badge>`,
        });

        const badge = page.root.shadowRoot.querySelector('.tk-badge');

        expect(badge.classList.contains(size)).toBe(true);
      }
    });
    it('handles variants correctly', async () => {
      const variants = ['primary', 'secondary', 'neutral', 'info', 'success', 'danger', 'warning', 'verified', 'purple', 'cyan', 'business'];
      for (const variant of variants) {
        const page = await newSpecPage({
          components: [TkBadge],
          html: `<tk-badge variant='${variant}'></tk-badge>`,
        });

        const badge = page.root.shadowRoot.querySelector('.tk-badge');

        expect(badge.classList.contains(variant)).toBe(true);
      }
    });
    it('renders with different types', async () => {
      const types = ['filled', 'filledlight', 'outlined', 'text'];
      for (const type of types) {
        const page = await newSpecPage({
          components: [TkBadge],
          html: `<tk-badge type='${type}'></tk-badge>`,
        });

        const badge = page.root.shadowRoot.querySelector('.tk-badge');

        expect(badge.classList.contains(type)).toBe(true);
      }
    });
    it('handles icon object', async () => {
      const page = await newSpecPage({
        components: [TkBadge],
        html: `<tk-badge 
        ></tk-badge>`,
      });

      page.root.icon = {
        name: 'search',
        style: 'rounded',
        fill: true,
        color: '#000000',
      };
      await page.waitForChanges();

      const icon = page.root.shadowRoot.querySelector('.material-symbols-rounded') as HTMLElement;

      expect(icon.textContent).toBe('search');
      expect(icon.classList.contains('fill')).toBe(true);
      expect(icon.style.color).toBe('#000000');
    });
    it('handles icon string', async () => {
      const page = await newSpecPage({
        components: [TkBadge],
        html: `<tk-badge icon="home"
        ></tk-badge>`,
      });

      await page.waitForChanges();

      const icon = page.root.shadowRoot.querySelector('.tk-badge-icon');

      expect(icon.classList.contains('material-symbols-outlined')).toBe(true);
      expect(icon.textContent).toBe('home');
    });
    it('handles slots', async () => {
      const page = await newSpecPage({
        components: [TkBadge],
        html: `
         <tk-badge
           hasSlot="true"
           <div slot="content">Custom Content</div>
         ></tk-badge>`,
      });
      await page.waitForChanges();

      const element = page.root.shadowRoot.querySelector(`slot`);

      expect(element).toBeTruthy();
    });
  });
});
