import { newSpecPage } from '@stencil/core/testing';
import { TkAlert } from '../tk-alert';
import { TkIcon } from '../../tk-icon/tk-icon';
import { TkButton } from '../../tk-button/tk-button';

describe('tk-alert', () => {
  // Basic Rendering
  describe('basic rendering', () => {
    it('renders with default props', async () => {
      const page = await newSpecPage({
        components: [TkAlert, TkIcon],
        html: `<tk-alert></tk-alert>`,
      });

      expect(page.root).toBeTruthy();
    });
    it('renders with header', async () => {
      const page = await newSpecPage({
        components: [TkAlert, TkIcon],
        html: `<tk-alert header='Test header'></tk-alert>`,
      });

      await page.waitForChanges();

      const content = page.root.shadowRoot.querySelector('.tk-alert-content');

      expect(content.textContent).toBe('Test header');
    });
    it('renders with message', async () => {
      const page = await newSpecPage({
        components: [TkAlert, TkIcon],
        html: `<tk-alert message='Test message'></tk-alert>`,
      });

      await page.waitForChanges();

      const content = page.root.shadowRoot.querySelector('.tk-alert-content');

      expect(content.textContent).toBe('Test message');
    });
  });

  // State
  describe('state handling', () => {
    it('handles variants correctly', async () => {
      const variants = [
        { variant: 'success', icon: 'check_circle' },
        { variant: 'warning', icon: 'warning' },
        { variant: 'info', icon: 'info' },
        { variant: 'danger', icon: 'error' },
        { variant: 'neutral', icon: '' },
      ];
      for (const variant of variants) {
        const page = await newSpecPage({
          components: [TkAlert, TkIcon],
          html: `<tk-alert variant='${variant.variant}'></tk-alert>`,
        });

        const container = page.root.shadowRoot.querySelector('.tk-alert-container');
        const tkIcon = page.root.shadowRoot.querySelector('tk-icon');
        const iconElement = tkIcon?.querySelector('.material-symbols-rounded');

        expect(container.classList.contains(variant.variant)).toBe(true);
        if (variant.icon) {
          expect(iconElement?.textContent).toBe(variant.icon);
        } else {
          expect(iconElement?.textContent || '').toBe('');
        }
      }
    });
    it('handles types correctly', async () => {
      const types = ['filled', 'filledlight', 'outlined', 'gradient'];
      for (const type of types) {
        const page = await newSpecPage({
          components: [TkAlert, TkIcon],
          html: `<tk-alert type='${type}'></tk-alert>`,
        });

        const container = page.root.shadowRoot.querySelector('.tk-alert-container');

        expect(container.classList.contains(type)).toBe(true);
      }
    });
    it('handles icon object', async () => {
      const page = await newSpecPage({
        components: [TkAlert, TkIcon],
        html: `<tk-alert 
          ></tk-alert>`,
      });

      page.root.icon = {
        name: 'search',
        style: 'rounded',
        fill: true,
        color: '#000000',
      };
      await page.waitForChanges();

      const tkIcon = page.root.shadowRoot.querySelector('tk-icon');
      const icon = tkIcon?.querySelector('.material-symbols-rounded') as HTMLElement;

      expect(icon?.textContent).toBe('search');
      expect(icon?.classList.contains('fill')).toBe(true);
      expect(icon?.style.color).toBe('#000000');
    });
    it('handles icon string', async () => {
      const page = await newSpecPage({
        components: [TkAlert, TkIcon],
        html: `<tk-alert icon="home"
          ></tk-alert>`,
      });

      await page.waitForChanges();

      const tkIcon = page.root.shadowRoot.querySelector('tk-icon');
      const icon = tkIcon?.querySelector('.material-symbols-rounded') as HTMLElement;

      expect(icon?.textContent).toBe('home');
    });
    it('handles icon size', async () => {
      const sizes = ['small', 'base', 'large'];
      for (const size of sizes) {
        const page = await newSpecPage({
          components: [TkAlert, TkIcon],
          html: `<tk-alert icon="home" icon-size=${size}
            ></tk-alert>`,
        });

        await page.waitForChanges();

        const tkIcon = page.root.shadowRoot.querySelector('tk-icon') as HTMLTkIconElement;

        expect(tkIcon?.size).toBe(size);
      }
    });
    it('renders multiple messages', async () => {
      const message = [
        'Lorem ipsum odor amet, consectetuer adipiscing elit.',
        'Aptent fringilla felis aenean mus habitant.',
        'Nullam lobortis dapibus habitant pellentesque netus placerat natoque consectetur phasellus.',
        'Ligula turpis id netus himenaeos magna semper netus elit.',
      ];
      const page = await newSpecPage({
        components: [TkAlert, TkIcon],
        html: `<tk-alert></tk-alert>`,
      });
      page.root.message = message;

      await page.waitForChanges();

      const divs = page.root.shadowRoot.querySelectorAll('.tk-alert-message');
      expect(divs.length).toBe(message.length);

      for (let i = 0; i < message.length; i++) {
        expect(divs[i].textContent.trim()).toBe(message[i].trim());
      }
    });
  });

  //Event
  describe('event handling', () => {
    it('should remove the alert when close button is clicked', async () => {
      const page = await newSpecPage({
        components: [TkAlert, TkIcon, TkButton],
        html: `<tk-alert removable
              ></tk-alert>`,
      });

      await page.waitForChanges();

      const tkButtonElement = page.root.shadowRoot.querySelector('tk-button') as HTMLTkButtonElement;
      const buttonInnerElement = tkButtonElement.shadowRoot.querySelector('button');

      expect(tkButtonElement).toBeTruthy();
      expect(tkButtonElement.icon).toBe('close');

      // Spy on the remove method to verify it's called
      const removeSpy = jest.spyOn(page.root, 'remove');

      buttonInnerElement.click();

      await page.waitForChanges();

      expect(removeSpy).toHaveBeenCalled();
    });
    it('should call handleCloseButtonClick when close button is clicked', async () => {
      const page = await newSpecPage({
        components: [TkAlert, TkIcon, TkButton],
        html: `<tk-alert removable
                ></tk-alert>`,
      });

      await page.waitForChanges();

      const instance = page.rootInstance;

      expect(instance).toBeTruthy();

      const spy = jest.spyOn(instance as any, 'handleCloseButtonClick');
      const tkButtonElement = page.root.shadowRoot.querySelector('tk-button') as HTMLTkButtonElement;
      const buttonInnerElement = tkButtonElement.shadowRoot.querySelector('button');

      expect(tkButtonElement).toBeTruthy();

      buttonInnerElement.click();

      await page.waitForChanges();

      expect(spy).toHaveBeenCalled();
    });
  });
});
