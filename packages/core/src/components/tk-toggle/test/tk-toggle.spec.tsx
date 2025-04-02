import { newSpecPage } from '@stencil/core/testing';
import { TkToggle } from '../tk-toggle';

describe('tk-toggle', () => {
  //Basic Rendering
  describe('basic rendering', () => {
    it('renders icon', async () => {
      const page = await newSpecPage({
        components: [TkToggle],
        html: `<tk-toggle showIcon="true" icon="check">
			 </tk-toggle>`,
      });

      await page.waitForChanges();

      const icon = page.root.shadowRoot.querySelector('.tk-toggle-thumb-icon');

      expect(icon.textContent).toBe('check');
    });
    it('renders name correctly', async () => {
      const page = await newSpecPage({
        components: [TkToggle],
        html: `<tk-toggle name="test">
			 </tk-toggle>`,
      });

      await page.waitForChanges();

      const input = page.root.shadowRoot.querySelector('.tk-toggle-input');

      expect(input.getAttribute('aria-label')).toBe('test');
    });
  });
  //// State
  describe('state handling', () => {
    it('handles disabled state', async () => {
      const page = await newSpecPage({
        components: [TkToggle],
        html: `<tk-toggle disabled="true">
			 </tk-toggle>`,
      });

      await page.waitForChanges();

      const toggle = page.root.shadowRoot.querySelector('.tk-toggle');

      expect(toggle.classList.contains('tk-toggle-disabled')).toBe(true);
    });
    it('handles invalid state', async () => {
      const page = await newSpecPage({
        components: [TkToggle],
        html: `<tk-toggle invalid="true">
			 </tk-toggle>`,
      });

      await page.waitForChanges();

      const toggle = page.root.shadowRoot.querySelector('.tk-toggle');

      expect(toggle.classList.contains('tk-toggle-invalid')).toBe(true);
    });
    it('renders with different sizes', async () => {
      const sizes = ['xsmall', 'small', 'base', 'large', 'xlarge'];
      for (const size of sizes) {
        const page = await newSpecPage({
          components: [TkToggle],
          html: `<tk-toggle size='${size}'></tk-toggle>`,
        });

        const toggle = page.root.shadowRoot.querySelector('.tk-toggle');

        expect(toggle.classList.contains(`tk-toggle-${size}`)).toBe(true);
      }
    });
    it('handles variants correctly', async () => {
      const variants = ['success', 'info'];
      for (const variant of variants) {
        const page = await newSpecPage({
          components: [TkToggle],
          html: `<tk-toggle variant='${variant}'></tk-toggle>`,
        });
        const toggle = page.root.shadowRoot.querySelector('.tk-toggle');

        expect(toggle.classList.contains(`tk-toggle-${variant}`)).toBe(true);
      }
    });
    it('should render default slot content', async () => {
      const page = await newSpecPage({
        components: [TkToggle],
        html: `<tk-toggle>Default slot content
			 </tk-toggle>`,
      });

      const instance = page.rootInstance;
      const slot = page.root.shadowRoot.querySelector('slot');

      expect(instance.hasDefaultSlot).toBe(true);
      expect(slot).not.toBeNull;
    });
    it('should render label when no slot content is provided', async () => {
      const page = await newSpecPage({
        components: [TkToggle],
        html: `<tk-toggle label="Test">
			 </tk-toggle>`,
      });

      const instance = page.rootInstance;
      const label = page.root.shadowRoot.querySelector('.tk-toggle-label');

      expect(label.textContent).toBe('Test');
      expect(instance.hasDefaultSlot).toBe(false);
    });
  });
  //// Event
  describe('event handling', () => {
    it('emits events correctly', async () => {
      const page = await newSpecPage({
        components: [TkToggle],
        html: `<tk-toggle></tk-toggle>`,
      });

      await page.waitForChanges();

      const input = page.root.shadowRoot.querySelector('input');

      expect(input).not.toBeNull();

      // Test change event
      const changeSpy = jest.fn();

      page.root.addEventListener('tk-change', changeSpy);

      input.checked = true;
      input.value = 'true';

      input.dispatchEvent(new Event('change'));

      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy).toHaveBeenCalledWith(expect.any(CustomEvent));

      const instance = page.rootInstance;
      expect(instance.value).toBe(true);
    });
    it('handles tabindex correctly', async () => {
      const page = await newSpecPage({
        components: [TkToggle],
        html: `<tk-toggle tabindex=1></tk-toggle>`,
      });

      const input = page.root.shadowRoot.querySelector('input');

      expect(input.getAttribute('tabIndex')).toBe('1');
      expect(page.root.hasAttribute('tabindex')).toBe(false);
    });
  });
  ////Methods
  describe('public methods', () => {
    it('gets the input element', async () => {
      const page = await newSpecPage({
        components: [TkToggle],
        html: `<tk-toggle></tk-toggle>`,
      });

      const instance = page.rootInstance;
      const inputElement = await instance.getInputElement();

      expect(inputElement).not.toBeNull();
      expect(inputElement instanceof HTMLInputElement).toBe(true);
    });
    it('handles form reset', async () => {
      const page = await newSpecPage({
        components: [TkToggle],
        html: `<tk-toggle value="true" checked="true" ></tk-toggle>`,
      });

      await page.root.formResetCallback();

      expect(page.root.value).toBeFalsy();
      expect(page.root.checked).toBeFalsy();
    });
  });
});
