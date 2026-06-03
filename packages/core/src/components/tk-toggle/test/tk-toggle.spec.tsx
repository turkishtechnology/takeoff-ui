import { newSpecPage } from '@stencil/core/testing';
import { TkToggle } from '../tk-toggle';
import { TkIcon } from '../../tk-icon/tk-icon';

describe('tk-toggle', () => {
  it('renders icon when checked and maps name to aria-label', async () => {
    const page = await newSpecPage({
      components: [TkToggle, TkIcon],
      html: `<tk-toggle show-icon="true" icon="check" name="test"></tk-toggle>`,
    });

    page.root.value = true;
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('tk-icon').textContent).toContain('check');
    expect(page.root.shadowRoot.querySelector('.tk-toggle-input').getAttribute('aria-label')).toBe('test');
  });

  it('applies disabled, invalid, size and variant classes', async () => {
    const page = await newSpecPage({
      components: [TkToggle],
      html: `<tk-toggle disabled="true" invalid="true" size="large" variant="success"></tk-toggle>`,
    });

    const toggle = page.root.shadowRoot.querySelector('.tk-toggle');

    expect(toggle.classList.contains('tk-toggle-disabled')).toBe(true);
    expect(toggle.classList.contains('tk-toggle-invalid')).toBe(true);
    expect(toggle.classList.contains('tk-toggle-large')).toBe(true);
    expect(toggle.classList.contains('tk-toggle-success')).toBe(true);
  });

  it('renders default slot content or label text', async () => {
    const slotPage = await newSpecPage({
      components: [TkToggle],
      html: `<tk-toggle>Default slot content</tk-toggle>`,
    });

    expect(slotPage.rootInstance.hasDefaultSlot).toBe(true);
    expect(slotPage.root.shadowRoot.querySelector('slot')).not.toBeNull();

    const labelPage = await newSpecPage({
      components: [TkToggle],
      html: `<tk-toggle label="Test"></tk-toggle>`,
    });

    expect(labelPage.root.shadowRoot.querySelector('.tk-toggle-label').textContent).toBe('Test');
    expect(labelPage.rootInstance.hasDefaultSlot).toBe(false);
  });

  it('emits tk-change and updates its value', async () => {
    const page = await newSpecPage({
      components: [TkToggle],
      html: `<tk-toggle></tk-toggle>`,
    });

    const changeSpy = jest.fn();
    const input = page.root.shadowRoot.querySelector('input') as HTMLInputElement;

    page.root.addEventListener('tk-change', changeSpy);
    input.checked = true;
    input.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(page.rootInstance.value).toBe(true);
  });

  it('moves tabindex to the native input and exposes it via getInputElement', async () => {
    const page = await newSpecPage({
      components: [TkToggle],
      html: `<tk-toggle tabindex=1></tk-toggle>`,
    });

    const input = page.root.shadowRoot.querySelector('input');
    const inputElement = await page.rootInstance.getInputElement();

    expect(input.getAttribute('tabindex')).toBe('1');
    expect(page.root.hasAttribute('tabindex')).toBe(false);
    expect(inputElement instanceof HTMLInputElement).toBe(true);
  });

  it('renders hint text when hint is provided', async () => {
    const page = await newSpecPage({
      components: [TkToggle, TkIcon],
      html: `<tk-toggle data-testid="toggle" hint="Helpful hint"></tk-toggle>`,
    });

    const hintWrapper = page.root!.shadowRoot!.querySelector('[data-testid="toggle-hint"]');
    const hintText = page.root!.shadowRoot!.querySelector('[data-testid="toggle-hint-text"]') as HTMLElement;

    expect(hintWrapper).not.toBeNull();
    expect(hintText.textContent).toBe('Helpful hint');
  });

  it('renders error text when error is provided and invalid is true', async () => {
    const page = await newSpecPage({
      components: [TkToggle, TkIcon],
      html: `<tk-toggle data-testid="toggle" invalid="true" error="Something went wrong"></tk-toggle>`,
    });

    const errorWrapper = page.root!.shadowRoot!.querySelector('[data-testid="toggle-error"]') as HTMLElement;
    const errorText = page.root!.shadowRoot!.querySelector('[data-testid="toggle-error-text"]') as HTMLElement;

    expect(errorWrapper).not.toBeNull();
    expect(errorWrapper.classList.contains('invalid')).toBe(true);
    expect(errorText.textContent).toBe('Something went wrong');
  });
});
