import { newSpecPage } from '@stencil/core/testing';
import { TkCheckbox } from '../tk-checkbox';

describe('tk-checkbox', () => {
  // Basic Rendering
  describe('basic rendering', () => {
    it('renders with default props', async () => {
      const page = await newSpecPage({
        components: [TkCheckbox],
        html: `<tk-checkbox></tk-checkbox>`,
      });

      expect(page.root).toBeTruthy();
    });
    it('renders with label', async () => {
      const page = await newSpecPage({
        components: [TkCheckbox],
        html: `<tk-checkbox label='Test label'></tk-checkbox>`,
      });

      await page.waitForChanges();

      const label = page.root.shadowRoot.querySelector('label');

      expect(label.textContent).toBe('checkTest label');
    });
    it('renders with name', async () => {
      const page = await newSpecPage({
        components: [TkCheckbox],
        html: `<tk-checkbox name='Test name'></tk-checkbox>`,
      });

      await page.waitForChanges();

      const input = page.root.shadowRoot.querySelector('input');

      expect(input.getAttribute('name')).toBe('Test name');
    });
  });

  // State
  describe('state handling', () => {
    it('handles disabled state', async () => {
      const page = await newSpecPage({
        components: [TkCheckbox],
        html: `<tk-checkbox disabled="true">
               </tk-checkbox>`,
      });

      await page.waitForChanges();

      const container = page.root.shadowRoot.querySelector('.tk-checkbox-container');

      expect(container.getAttribute('aria-disabled')).not.toBeNull();

      const input = page.root.shadowRoot.querySelector('input');

      expect(input.getAttribute('disabled')).toBeTruthy;
    });
    it('handles invalid state', async () => {
      const page = await newSpecPage({
        components: [TkCheckbox],
        html: `<tk-checkbox invalid>
               </tk-checkbox>`,
      });

      await page.waitForChanges();

      const container = page.root.shadowRoot.querySelector('.tk-checkbox-container');

      expect(container.getAttribute('aria-invalid')).not.toBeNull();
    });
    it('handles indeterminate state', async () => {
      const page = await newSpecPage({
        components: [TkCheckbox],
        html: `<tk-checkbox indeterminate="true">
                 </tk-checkbox>`,
      });

      await page.waitForChanges();

      const input = page.root.shadowRoot.querySelector('input');

      expect(input.getAttribute('indeterminate')).not.toBeNull();

      const mask = page.root.shadowRoot.querySelector('.mask');

      expect(mask.textContent).toBe('remove');
    });
  });

  //Event
  describe('event handling', () => {
    it('emits tk-change correctly', async () => {
      const page = await newSpecPage({
        components: [TkCheckbox],
        html: `<tk-checkbox value></tk-checkbox>`,
      });
      await page.waitForChanges();

      const changeSpy = jest.fn();

      page.root.addEventListener('tk-change', changeSpy);

      const checkbox = page.root.shadowRoot.querySelector('input[type="checkbox"]');

      expect(checkbox).toBeTruthy();

      checkbox.dispatchEvent(new Event('change'));

      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalled();
    });
    it('emits tk-change correctly when indeterminate is set', async () => {
      const page = await newSpecPage({
        components: [TkCheckbox],
        html: `<tk-checkbox value indeterminate></tk-checkbox>`,
      });
      await page.waitForChanges();

      const changeSpy = jest.fn();

      page.root.addEventListener('tk-change', changeSpy);

      const checkbox = page.root.shadowRoot.querySelector('input[type="checkbox"]') as HTMLInputElement;

      expect(checkbox).toBeTruthy();
      expect(checkbox.getAttribute('indeterminate')).toBeFalsy();
      expect(checkbox.getAttribute('checked')).toBeNull();

      checkbox.dispatchEvent(new Event('change'));

      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalled();
    });
  });

  //Public methods
  describe('event handling', () => {
    it('handles form reset', async () => {
      const page = await newSpecPage({
        components: [TkCheckbox],
        html: `<tk-checkbox value></tk-checkbox>`,
      });

      await page.root.formResetCallback();

      expect(page.root.value).toBeFalsy();
      expect(page.root.indeterminate).toBeFalsy();
    });
  });
});
