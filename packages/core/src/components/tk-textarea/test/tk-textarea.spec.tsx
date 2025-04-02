import { newSpecPage } from '@stencil/core/testing';
import { TkTextarea } from '../tk-textarea';
describe('tk-textarea', () => {
  ////Basic Rendering
  describe('basic rendering', () => {
    it('renders with default props', async () => {
      const page = await newSpecPage({
        components: [TkTextarea],
        html: `<tk-textarea></tk-textarea>`,
      });

      expect(page.root).toBeTruthy();
    });
    it('renders with label', async () => {
      const page = await newSpecPage({
        components: [TkTextarea],
        html: `<tk-textarea label="test"></tk-textarea>`,
      });

      await page.waitForChanges();

      const textarea = page.root.shadowRoot.querySelector('.tk-textarea');

      expect(textarea.getAttribute('htmlFor')).not.toBeNull();

      const label = page.root.shadowRoot.querySelector('.label');

      expect(label.textContent).toBe('test');
    });
    it('renders with hint', async () => {
      const page = await newSpecPage({
        components: [TkTextarea],
        html: `<tk-textarea hint="test"></tk-textarea>`,
      });

      await page.waitForChanges();

      const hint = page.root.shadowRoot.querySelector('.hint');

      expect(hint.textContent).toBe('infotest');
    });
    it('renders with error', async () => {
      const page = await newSpecPage({
        components: [TkTextarea],
        html: `<tk-textarea error="test"></tk-textarea>`,
      });

      await page.waitForChanges();

      const hint = page.root.shadowRoot.querySelector('.hint');

      expect(hint.textContent).toBe('infotest');
    });
    it('renders with name', async () => {
      const page = await newSpecPage({
        components: [TkTextarea],
        html: `<tk-textarea name="test"></tk-textarea>`,
      });

      await page.waitForChanges();

      const textarea = page.root.shadowRoot.querySelector('textarea');

      expect(textarea.getAttribute('name')).toBe('test');
    });
    it('renders with placeholder', async () => {
      const page = await newSpecPage({
        components: [TkTextarea],
        html: `<tk-textarea placeholder="test"></tk-textarea>`,
      });

      await page.waitForChanges();

      const textarea = page.root.shadowRoot.querySelector('textarea');

      expect(textarea.getAttribute('placeholder')).toBe('test');
    });
    it('renders rows correctly', async () => {
      const page = await newSpecPage({
        components: [TkTextarea],
        html: `<tk-textarea rows=5></tk-textarea>`,
      });

      await page.waitForChanges();

      const textarea = page.root.shadowRoot.querySelector('textarea');

      expect(textarea.getAttribute('rows')).toBe('5');
    });
    it('renders with showAsterisk', async () => {
      const page = await newSpecPage({
        components: [TkTextarea],
        html: `<tk-textarea label="test" show-asterisk="true"></tk-textarea>`,
      });

      await page.waitForChanges();

      const asterisk = page.root.shadowRoot.querySelector('label .asterisk');

      expect(asterisk).toBeTruthy();
    });
  });
  //// State
  describe('state handling', () => {
    it('handles disabled state', async () => {
      const page = await newSpecPage({
        components: [TkTextarea],
        html: `<tk-textarea></tk-textarea>`,
      });

      page.root.disabled = true;

      await page.waitForChanges();

      const container = page.root.shadowRoot.querySelector('.tk-textarea-container');

      expect(container.hasAttribute('aria-disabled')).toBe(true);

      const textarea = page.root.shadowRoot.querySelector('textarea');

      expect(textarea.hasAttribute('disabled')).toBe(true);
    });

    it('handles readonly state', async () => {
      const page = await newSpecPage({
        components: [TkTextarea],
        html: `<tk-textarea readonly="true"></tk-textarea>`,
      });

      const container = page.root.shadowRoot.querySelector('.tk-textarea-container');

      expect(container.hasAttribute('aria-readonly')).toBe(true);

      const textarea = page.root.shadowRoot.querySelector('textarea');

      expect(textarea.hasAttribute('readOnly')).toBe(true);
    });
    it('handles invalid state', async () => {
      const page = await newSpecPage({
        components: [TkTextarea],
        html: `<tk-textarea></tk-textarea>`,
      });

      page.root.invalid = true;

      await page.waitForChanges();

      const container = page.root.shadowRoot.querySelector('.tk-textarea-container');

      expect(container.hasAttribute('aria-invalid')).toBe(true);
    });

    it('renders with different sizes', async () => {
      const sizes = ['small', 'base', 'large'];
      for (const size of sizes) {
        const page = await newSpecPage({
          components: [TkTextarea],
          html: `<tk-textarea size='${size}'></tk-textarea>`,
        });
        await page.waitForChanges();

        const container = page.root.shadowRoot.querySelector('.tk-textarea-container');

        expect(container.classList.contains(size)).toBe(true);
      }
    });
  });
  //// Event
  describe('event handling', () => {
    it('emits events correctly', async () => {
      const page = await newSpecPage({
        components: [TkTextarea],
        html: `<tk-textarea></tk-textarea>`,
      });

      const textarea = page.root.shadowRoot.querySelector('textarea');

      // Test focus event
      const focusSpy = jest.fn();
      page.root.addEventListener('tk-focus', focusSpy);
      textarea.dispatchEvent(new Event('focus'));

      expect(focusSpy).toHaveBeenCalled();

      // Test blur event
      const blurSpy = jest.fn();

      page.root.addEventListener('tk-blur', blurSpy);
      textarea.dispatchEvent(new Event('blur'));

      expect(blurSpy).toHaveBeenCalled();

      // Test change event
      const changeSpy = jest.fn();

      page.root.addEventListener('tk-change', changeSpy);

      textarea.value = 'new value';
      textarea.dispatchEvent(new Event('input'));

      expect(changeSpy).toHaveBeenCalled();
    });
    it('handles tabindex correctly', async () => {
      const page = await newSpecPage({
        components: [TkTextarea],
        html: `<tk-textarea tabindex="1"></tk-textarea>`,
      });

      const textarea = page.root.shadowRoot.querySelector('textarea');

      expect(textarea.getAttribute('tabindex')).toBe('1');
      expect(page.root.hasAttribute('tabindex')).toBe(false);
    });
    it('handles values', async () => {
      const page = await newSpecPage({
        components: [TkTextarea],
        html: `<tk-textarea value="Test Value"></tk-textarea>`,
      });

      const textarea = page.root.shadowRoot.querySelector('textarea');

      textarea.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      await page.waitForChanges();

      expect(page.root.value).toEqual('Test Value');
    });
  });
  //// Method
  describe('public methods', () => {
    it('sets focus using setFocus method', async () => {
      const page = await newSpecPage({
        components: [TkTextarea],
        html: `<tk-textarea></tk-textarea>`,
      });

      const focusSpy = jest.fn();

      page.root.addEventListener('tk-focus', focusSpy);

      await page.root.setFocus();

      expect(focusSpy).toHaveBeenCalled();
    });
    it('handles form reset', async () => {
      const page = await newSpecPage({
        components: [TkTextarea],
        html: `<tk-textarea value="test"></tk-textarea>`,
      });

      await page.root.formResetCallback();

      expect(page.root.value).toBeNull();
    });
  });
});
