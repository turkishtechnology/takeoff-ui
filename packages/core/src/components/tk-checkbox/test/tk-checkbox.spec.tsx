import { newSpecPage } from '@stencil/core/testing';
import { TkCheckbox } from '../tk-checkbox';
import { TkIcon } from '../../tk-icon/tk-icon';

describe('tk-checkbox', () => {
  it('renders label and name in light DOM', async () => {
    const page = await newSpecPage({
      components: [TkCheckbox],
      html: `<tk-checkbox label="Test label" name="test-name"></tk-checkbox>`,
    });

    const label = page.root.querySelector('label');
    const input = page.root.querySelector('input');

    expect(label.textContent).toContain('Test label');
    expect(input.getAttribute('name')).toBe('test-name');
  });

  it('applies disabled and invalid state attributes', async () => {
    const page = await newSpecPage({
      components: [TkCheckbox],
      html: `<tk-checkbox disabled="true" invalid="true"></tk-checkbox>`,
    });

    const container = page.root.querySelector('.tk-checkbox-container');
    const input = page.root.querySelector('input');

    expect(container.getAttribute('aria-disabled')).toBe('');
    expect(container.getAttribute('aria-invalid')).toBe('');
    expect(input.disabled).toBe(true);
  });

  it('renders indeterminate state with the remove icon', async () => {
    const page = await newSpecPage({
      components: [TkCheckbox, TkIcon],
      html: `<tk-checkbox indeterminate="true"></tk-checkbox>`,
    });

    const input = page.root.querySelector('input') as HTMLInputElement;
    const mask = page.root.querySelector('.mask');

    expect(page.root.indeterminate).toBe(true);
    expect(mask.textContent).toContain('remove');
  });

  it('emits tk-change when the checkbox changes', async () => {
    const page = await newSpecPage({
      components: [TkCheckbox],
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
      components: [TkCheckbox],
      html: `<tk-checkbox value="true" indeterminate="true"></tk-checkbox>`,
    });

    await page.root.formResetCallback();

    expect(page.root.value).toBe(false);
    expect(page.root.indeterminate).toBe(false);
  });
});
