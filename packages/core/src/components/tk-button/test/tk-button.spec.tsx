import { newSpecPage } from '@stencil/core/testing';
import { TkButton } from '../tk-button';
import { TkIcon } from '../../tk-icon/tk-icon';

describe('tk-button', () => {
  // Mock HTMLFormElement.prototype.requestSubmit for tests
  beforeAll(() => {
    // Mock requestSubmit for all form elements if it doesn't exist
    if (!HTMLFormElement.prototype.requestSubmit) {
      Object.defineProperty(HTMLFormElement.prototype, 'requestSubmit', {
        value: function (this: HTMLFormElement) {
          // Trigger submit event
          const event = new Event('submit', { bubbles: true, cancelable: true });
          this.dispatchEvent(event);
        },
        writable: true,
        configurable: true,
      });
    }
  });

  //Basic Rendering
  describe('basic rendering', () => {
    it('renders with default props', async () => {
      const page = await newSpecPage({
        components: [TkButton],
        html: `<tk-button></tk-button>`,
      });

      expect(page.root).toBeTruthy();
    });
    it('renders with label', async () => {
      const page = await newSpecPage({
        components: [TkButton],
        html: `<tk-button label="test"></tk-button>`,
      });

      await page.waitForChanges();

      const button = page.root.shadowRoot.querySelector('.tk-button');

      expect(button.textContent).toBe('test');
    });
    it('renders fullwidth buttons', async () => {
      const page = await newSpecPage({
        components: [TkButton],
        html: `<tk-button fullwidth="true"></tk-button>`,
      });

      await page.waitForChanges();

      expect(page.root.shadowRoot.querySelectorAll('full-width')).toBeTruthy();
    });
    it('renders link buttons whith underline', async () => {
      const page = await newSpecPage({
        components: [TkButton],
        html: `<tk-button type="link" href="/test" underline="true"></tk-button>`,
      });

      await page.waitForChanges();

      const button = page.root.shadowRoot.querySelector('.tk-button');

      expect(button.classList.contains('underline')).toBe(true);
    });
    it('renders loading buttons', async () => {
      const page = await newSpecPage({
        components: [TkButton],
        html: `<tk-button loading="true"></tk-button>`,
      });

      await page.waitForChanges();

      const button = page.root.shadowRoot.querySelector('.tk-button');

      expect(button.classList.contains('loading')).toBe(true);

      const icon = page.root.shadowRoot.querySelector('tk-spinner');
      expect(icon.getAttribute('size')).toBe('xsmall');
    });
    it('renders rounded buttons', async () => {
      const page = await newSpecPage({
        components: [TkButton],
        html: `<tk-button rounded="true" icon="home"></tk-button>`,
      });

      await page.waitForChanges();

      const button = page.root.shadowRoot.querySelector('.tk-button');

      expect(button.classList.contains('rounded')).toBe(true);
    });
  });
  //// State
  describe('state handling', () => {
    it('renders with different types', async () => {
      const types = ['filled', 'elevated', 'outlined', 'text'];
      for (const type of types) {
        const page = await newSpecPage({
          components: [TkButton],
          html: `<tk-button type='${type}'></tk-button>`,
        });

        const button = page.root.shadowRoot.querySelector('.tk-button');

        expect(button.classList.contains(type)).toBe(true);
      }
    });
    it('renders with different sizes', async () => {
      const sizes = ['small', 'base', 'large'];
      for (const size of sizes) {
        const page = await newSpecPage({
          components: [TkButton],
          html: `<tk-button size='${size}'></tk-button>`,
        });

        const button = page.root.shadowRoot.querySelector('.tk-button');

        expect(button.classList.contains(size)).toBe(true);
      }
    });
    it('handles modes correctly', async () => {
      const modes = ['button', 'submit', 'reset', 'link'];
      for (const mode of modes) {
        const page = await newSpecPage({
          components: [TkButton],
          html: `<tk-button mode='${mode}' href="/test", target="_self"></tk-button>`,
        });

        const button = page.root.shadowRoot.querySelector('.tk-button');

        if (mode === 'link') {
          expect(button.getAttribute('href')).toBe('/test');
          expect(button.getAttribute('target')).toBe('_self');
        }
      }
    });
    it('handles variants correctly', async () => {
      const variants = ['primary', 'secondary', 'neutral', 'info', 'success', 'danger', 'warning', 'white'];
      for (const variant of variants) {
        const page = await newSpecPage({
          components: [TkButton],
          html: `<tk-button variant='${variant}'></tk-button>`,
        });
        const button = page.root.shadowRoot.querySelector('.tk-button');
        expect(button.classList.contains(variant)).toBe(true);
      }
    });
    it('handles icon basic object', async () => {
      const page = await newSpecPage({
        components: [TkButton, TkIcon],
        html: `<tk-button
        ></tk-button>`,
      });

      page.root.icon = {
        name: 'search',
      };
      await page.waitForChanges();

      const tkIcon = page.root.shadowRoot.querySelector('tk-icon') as HTMLTkIconElement;
      expect(tkIcon).toBeTruthy();
      expect(tkIcon.icon).toBe('search');
    });
    it('handles icon object', async () => {
      const page = await newSpecPage({
        components: [TkButton, TkIcon],
        html: `<tk-button
        ></tk-button>`,
      });

      page.root.icon = {
        name: 'search',
        style: 'rounded',
        fill: true,
        color: '#000000',
      };
      await page.waitForChanges();

      const tkIcon = page.root.shadowRoot.querySelector('tk-icon') as HTMLTkIconElement;
      expect(tkIcon).toBeTruthy();
      expect(tkIcon.icon).toBe('search');
      expect(tkIcon.iconType).toBe('rounded');
      expect(tkIcon.fill).toBe(true);
      expect(tkIcon.color).toBe('#000000');
    });
    it('handles icon string', async () => {
      const page = await newSpecPage({
        components: [TkButton, TkIcon],
        html: `<tk-button icon="home"></tk-button>`,
      });

      await page.waitForChanges();

      const tkIcon = page.root.shadowRoot.querySelector('tk-icon.tk-button-icon') as HTMLTkIconElement;
      expect(tkIcon).toBeTruthy();
      expect(tkIcon.icon).toBe('home');
      expect(tkIcon.iconType).toBe('outlined');
    });
  });
  describe('event handling', () => {
    it('handle click events', async () => {
      const page = await newSpecPage({
        components: [TkButton],
        html: `<tk-button></tk-button>`,
      });

      const clickSpy = jest.fn();

      page.root.addEventListener('tk-click', clickSpy);

      const button = page.root.shadowRoot.querySelector('button');
      expect(button).toBeTruthy();

      button.click();
      await page.waitForChanges();
      expect(clickSpy).toHaveBeenCalled();
    });

    it('handles disabled click events', async () => {
      const page = await newSpecPage({
        components: [TkButton],
        html: `<tk-button disabled="true"></tk-button>`,
      });

      const button = page.root.shadowRoot.querySelector('button');

      expect(button.hasAttribute('disabled')).toBe(true);
      const clickSpy = jest.fn();

      page.root.addEventListener('tk-click', clickSpy);
      button.click();
      await page.waitForChanges();

      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('emits submit events correctly', async () => {
      const submitSpy = jest.fn();

      const page = await newSpecPage({
        components: [TkButton],
        html: `
          <form id="test-form">
            <tk-button mode="submit"></tk-button>
          </form>
        `,
      });

      const form = page.body.querySelector('form') as HTMLFormElement;
      const button = page.body.querySelector('tk-button');

      expect(form).toBeTruthy();
      expect(button).toBeTruthy();

      // Add submit event listener
      form.addEventListener('submit', e => {
        e.preventDefault();
        submitSpy();
      });

      // Click the button
      button.shadowRoot.querySelector('button').click();
      await page.waitForChanges();

      // Verify submit event was triggered through requestSubmit
      expect(submitSpy).toHaveBeenCalled();
    });
  });
});
