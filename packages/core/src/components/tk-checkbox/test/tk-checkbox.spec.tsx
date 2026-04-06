import { newSpecPage } from '@stencil/core/testing';
import { TkCheckbox } from '../tk-checkbox';
import { TkIcon } from '../../tk-icon/tk-icon';

describe('tk-checkbox', () => {
  it('renders label and name in light DOM', async () => {
    const page = await newSpecPage({
      components: [TkCheckbox, TkIcon],
      html: `<tk-checkbox label="Test label" name="test-name"></tk-checkbox>`,
    });

    const label = page.root.querySelector('label');

    expect(label.textContent).toContain('Test label');
  });
  it('renders with name', async () => {
    const page = await newSpecPage({
      components: [TkCheckbox, TkIcon],
      html: `<tk-checkbox name='Test name'></tk-checkbox>`,
    });

    await page.waitForChanges();

    const input = page.root.querySelector('input');

    expect(input.getAttribute('name')).toBe('Test name');
  });
});

// State
describe('state handling', () => {
  it('handles disabled state', async () => {
    const page = await newSpecPage({
      components: [TkCheckbox, TkIcon],
      html: `<tk-checkbox disabled="true">
               </tk-checkbox>`,
    });

    const input = page.root.querySelector('input');

    expect(input.hasAttribute('disabled')).toBe(true);
  });
  it('handles invalid state', async () => {
    const page = await newSpecPage({
      components: [TkCheckbox, TkIcon],
      html: `<tk-checkbox invalid>
               </tk-checkbox>`,
    });

    await page.waitForChanges();

    const container = page.root.querySelector('.tk-checkbox-container');

    expect(container.getAttribute('aria-invalid')).not.toBeNull();
  });
  it('handles indeterminate state', async () => {
    const page = await newSpecPage({
      components: [TkCheckbox, TkIcon],
      html: `<tk-checkbox indeterminate="true">
                 </tk-checkbox>`,
    });

    const mask = page.root.querySelector('.mask');

    expect(page.root.indeterminate).toBe(true);
    expect(mask.textContent).toContain('remove');
  });

  it('emits tk-change when the checkbox changes', async () => {
    const page = await newSpecPage({
      components: [TkCheckbox, TkIcon],
      html: `<tk-checkbox></tk-checkbox>`,
    });

    const changeSpy = jest.fn();
    const checkbox = page.root.querySelector('input') as HTMLInputElement;

    page.root.addEventListener('tk-change', changeSpy);
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(page.root.value).toBe(true);
  });

  it('resets its form-associated state', async () => {
    const page = await newSpecPage({
      components: [TkCheckbox, TkIcon],
      html: `<tk-checkbox value="true" indeterminate="true"></tk-checkbox>`,
    });

    await page.root.formResetCallback();

    expect(page.root.value).toBe(false);
    expect(page.root.indeterminate).toBe(false);
  });
});
