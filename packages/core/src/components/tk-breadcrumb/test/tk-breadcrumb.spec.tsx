import { newSpecPage } from '@stencil/core/testing';
import { TkBreadcrumb } from '../tk-breadcrumb';
import { TkBreadcrumbItem } from '../tk-breadcrumb-item/tk-breadcrumb-item';

describe('tk-breadcrumb', () => {
  // Basic Rendering
  describe('basic rendering', () => {
    it('renders with default props', async () => {
      const page = await newSpecPage({
        components: [TkBreadcrumb],
        html: `<tk-breadcrumb></tk-breadcrumb>`,
      });

      expect(page.root).toBeTruthy();
    });
    it('renders tk-breadcrumb-item ', async () => {
      const page = await newSpecPage({
        components: [TkBreadcrumb, TkBreadcrumbItem],
        html: `<tk-breadcrumb>
        </tk-breadcrumb>`,
      });

      page.rootInstance.model = [{ label: 'home', href: '/', icon: { name: 'home' }, isCurrent: 'true', isExternal: 'true' }];

      await page.waitForChanges();

      const list = page.root.shadowRoot.querySelector('.tk-breadcrumb-list');

      expect(list).toBeTruthy();

      const item = page.root.shadowRoot.querySelector('.tk-breadcrumb-item');

      expect(item).toBeTruthy();
      expect(item.classList.contains('tk-breadcrumb-item-current')).toBe(true);
      expect(item.classList.contains('tk-breadcrumb-item-icon-only')).toBe(false);

      const icon = page.root.shadowRoot.querySelector('.tk-breadcrumb-item-icon');

      expect(icon).toBeTruthy();
      expect(icon.classList.contains("material-symbols-'outlined'"));
      expect(icon.getAttribute('style')).toBe('color: inherit;');
      expect(icon.textContent).toBe('home');

      const link = page.root.shadowRoot.querySelector('.tk-breadcrumb-link');

      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      expect(link.getAttribute('tabindex')).toBe('-1');

      const label = page.root.shadowRoot.querySelector('.tk-breadcrumb-item-label');

      expect(label.textContent).toBe('home');
    });
    it('renders with different separators', async () => {
      const separatorTypes = [
        { separator: 'icon', class: 'material-symbols-outlined' },
        { separator: 'dot', class: 'tk-breadcrumb-dot-separator' },
        { separator: 'slash', class: 'tk-breadcrumb-slash-separator' },
        { separator: 'vertical', class: 'tk-breadcrumb-vertical-separator' },
      ];
      for (const type of separatorTypes) {
        const page = await newSpecPage({
          components: [TkBreadcrumb, TkBreadcrumbItem],
          html: `<tk-breadcrumb 
          separator=${type.separator}>
          </tk-breadcrumb>`,
        });

        page.rootInstance.model = [{ label: 'home' }, { label: 'profile' }, { label: 'cart' }];

        await page.waitForChanges();

        const separators = page.root.shadowRoot.querySelectorAll('.tk-breadcrumb-separator-icon');

        separators.forEach(separator => {
          expect(separator.classList.contains(`${type.class}`)).toBe(true);
        });
      }
    });
    it('handles types', async () => {
      const types = ['basic', 'outlined'];
      for (const type in types) {
        const page = await newSpecPage({
          components: [TkBreadcrumb],
          html: `<tk-breadcrumb type=${type}></tk-breadcrumb>`,
        });

        await page.waitForChanges();

        const bradcrumb = page.root.shadowRoot.querySelector('.tk-breadcrumb');

        expect(bradcrumb.classList.contains(`tk-breadcrumb-${type}`)).toBe(true);
      }
    });
  });
  // State
  describe('state handling', () => {
    it('should render slotted items', async () => {
      const page = await newSpecPage({
        components: [TkBreadcrumb],
        html: `<tk-breadcrumb ><slot/>
        </tk-breadcrumb>`,
      });

      const slot = page.root.shadowRoot.querySelector('slot');

      expect(slot).not.toBeNull;
    });
    it('should render items when no slots provided', async () => {
      const page = await newSpecPage({
        components: [TkBreadcrumb, TkBreadcrumbItem],
        html: `<tk-breadcrumb>
        </tk-breadcrumb>`,
      });

      page.rootInstance.model = [{ label: 'home', href: '/', icon: { name: 'home' } }];

      await page.waitForChanges();

      const slot = page.root.shadowRoot.querySelector('slot');

      expect(slot).toBeNull;

      const label = page.root.shadowRoot.querySelector('.tk-breadcrumb-item-label');

      expect(label.textContent).toBe('home');
    });
    it('correctly assign the last item as isCurrent ', async () => {
      const page = await newSpecPage({
        components: [TkBreadcrumb, TkBreadcrumbItem],
        html: `<tk-breadcrumb>
        </tk-breadcrumb>`,
      });

      page.rootInstance.model = [{ label: 'home' }, { label: 'profile' }, { label: 'cart' }];

      await page.waitForChanges();

      const items = page.root.shadowRoot.querySelectorAll('.tk-breadcrumb-item');

      expect(items[0].classList.contains('tk-breadcrumb-item-current')).toBe(false);
      expect(items[1].classList.contains('tk-breadcrumb-item-current')).toBe(false);
      expect(items[2].classList.contains('tk-breadcrumb-item-current')).toBe(true);
    });
  });
});
