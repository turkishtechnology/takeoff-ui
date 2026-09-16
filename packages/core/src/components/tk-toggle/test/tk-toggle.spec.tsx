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

describe('tk-toggle state handling', () => {
  it('ignores change events while disabled', async () => {
    const page = await newSpecPage({
      components: [TkToggle],
      html: `<tk-toggle disabled="true"></tk-toggle>`,
    });
    const changeSpy = jest.fn();
    page.root.addEventListener('tk-change', changeSpy);
    const input = page.root.shadowRoot.querySelector('input') as HTMLInputElement;

    input.checked = true;
    input.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(changeSpy).not.toHaveBeenCalled();
    expect(page.root.value).toBe(false);
  });

  it('resets to unchecked on form reset and emits the new value', async () => {
    const page = await newSpecPage({
      components: [TkToggle],
      html: `<tk-toggle value="true" invalid="true"></tk-toggle>`,
    });
    const changeSpy = jest.fn();
    page.root.addEventListener('tk-change', (e: CustomEvent) => changeSpy(e.detail));

    page.rootInstance.formResetCallback();
    await page.waitForChanges();

    expect(changeSpy).toHaveBeenCalledWith(false);
    expect(page.root.value).toBe(false);
    expect(page.root.invalid).toBe(false);
    expect(page.root.shadowRoot.querySelector('input').getAttribute('aria-checked')).toBe('false');
  });

  it('syncs the checked state when the value prop changes', async () => {
    const page = await newSpecPage({
      components: [TkToggle],
      html: `<tk-toggle></tk-toggle>`,
    });
    const input = () => page.root.shadowRoot.querySelector('input');
    expect(input().getAttribute('aria-checked')).toBe('false');

    page.root.value = true;
    await page.waitForChanges();
    expect(input().getAttribute('aria-checked')).toBe('true');

    page.root.value = false;
    await page.waitForChanges();
    expect(input().getAttribute('aria-checked')).toBe('false');
  });

  it('shows a close icon when checked and invalid, and no icon when unchecked', async () => {
    const page = await newSpecPage({
      components: [TkToggle, TkIcon],
      html: `<tk-toggle invalid="true"></tk-toggle>`,
    });
    const icon = () => page.root.shadowRoot.querySelector('tk-icon') as any;
    expect(icon().icon).toBeUndefined();
    expect(icon().textContent).toBe('');

    page.root.value = true;
    await page.waitForChanges();
    expect(icon().icon).toBe('close');
    expect(icon().variant).toBe('danger');
  });

  it('hides the thumb icon when showIcon is false', async () => {
    const page = await newSpecPage({
      components: [TkToggle],
      html: `<tk-toggle show-icon="false" value="true"></tk-toggle>`,
    });

    expect(page.root.shadowRoot.querySelector('tk-icon')).toBeNull();
  });

  it('maps large sizes to a medium icon and dims the icon when disabled', async () => {
    const xlarge = await newSpecPage({
      components: [TkToggle, TkIcon],
      html: `<tk-toggle size="xlarge" value="true" disabled="true"></tk-toggle>`,
    });
    const xlargeIcon = xlarge.root.shadowRoot.querySelector('tk-icon') as any;
    expect(xlargeIcon.size).toBe('medium');
    expect(xlargeIcon.color).toBe('var(--icon-lightest)');

    const small = await newSpecPage({
      components: [TkToggle, TkIcon],
      html: `<tk-toggle size="small" value="true" variant="success"></tk-toggle>`,
    });
    const smallIcon = small.root.shadowRoot.querySelector('tk-icon') as any;
    expect(smallIcon.size).toBe('small');
    expect(smallIcon.variant).toBe('success');
    expect(smallIcon.color).toBe('');
  });

  it('leaves the native input without a tabindex when the host has none', async () => {
    const page = await newSpecPage({
      components: [TkToggle],
      html: `<tk-toggle aria-labelledby="lbl"></tk-toggle>`,
    });

    const input = page.root.shadowRoot.querySelector('input');
    expect(input.hasAttribute('tabindex')).toBe(false);
    expect(input.getAttribute('aria-labelledby')).toBe('lbl');
  });

  it('exposes disabled and invalid as aria strings on the native input', async () => {
    const page = await newSpecPage({
      components: [TkToggle],
      html: `<tk-toggle disabled="true" invalid="true"></tk-toggle>`,
    });
    const input = page.root.shadowRoot.querySelector('input');
    expect(input.getAttribute('aria-disabled')).toBe('true');
    expect(input.getAttribute('aria-invalid')).toBe('true');

    page.root.disabled = false;
    page.root.invalid = false;
    await page.waitForChanges();
    expect(input.getAttribute('aria-disabled')).toBe('false');
    expect(input.hasAttribute('aria-invalid')).toBe(false);
  });
});
