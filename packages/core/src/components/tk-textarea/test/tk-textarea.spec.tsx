import { newSpecPage } from '@stencil/core/testing';
import { TkTextarea } from '../tk-textarea';

describe('tk-textarea', () => {
  it('renders label, placeholder, rows and asterisk', async () => {
    const page = await newSpecPage({
      components: [TkTextarea],
      html: `<tk-textarea label="test" placeholder="text" rows="5" show-asterisk="true"></tk-textarea>`,
    });

    expect(page.root.shadowRoot.querySelector('label.label').textContent).toContain('test');
    expect(page.root.shadowRoot.querySelector('.asterisk')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('textarea').getAttribute('placeholder')).toBe('text');
    expect(page.root.shadowRoot.querySelector('textarea').getAttribute('rows')).toBe('5');
  });

  it('renders hint and error content through the shared hint wrapper', async () => {
    const hintPage = await newSpecPage({
      components: [TkTextarea],
      html: `<tk-textarea hint="test"></tk-textarea>`,
    });

    expect(hintPage.root.shadowRoot.querySelector('.tk-hint-wrapper').textContent).toContain('test');

    const errorPage = await newSpecPage({
      components: [TkTextarea],
      html: `<tk-textarea error="bad value"></tk-textarea>`,
    });

    expect(errorPage.root.shadowRoot.querySelector('.tk-hint-wrapper').textContent).toContain('bad value');
  });

  it('applies disabled, readonly and invalid states', async () => {
    const page = await newSpecPage({
      components: [TkTextarea],
      html: `<tk-textarea readonly="true"></tk-textarea>`,
    });

    page.root.disabled = true;
    page.root.invalid = true;
    await page.waitForChanges();

    const container = page.root.shadowRoot.querySelector('.tk-textarea-container');
    const textarea = page.root.shadowRoot.querySelector('textarea') as HTMLTextAreaElement;

    expect(container.getAttribute('aria-disabled')).toBe('');
    expect(container.getAttribute('aria-readonly')).toBe('');
    expect(container.getAttribute('aria-invalid')).toBe('');
    expect(textarea.getAttribute('disabled')).toBe('');
    expect(textarea.getAttribute('readonly')).toBe('');
  });

  it('emits focus, blur and change events', async () => {
    const page = await newSpecPage({
      components: [TkTextarea],
      html: `<tk-textarea></tk-textarea>`,
    });

    const textarea = page.root.shadowRoot.querySelector('textarea') as HTMLTextAreaElement;
    const focusSpy = jest.fn();
    const blurSpy = jest.fn();
    const changeSpy = jest.fn();

    page.root.addEventListener('tk-focus', focusSpy);
    page.root.addEventListener('tk-blur', blurSpy);
    page.root.addEventListener('tk-change', changeSpy);

    textarea.dispatchEvent(new Event('focus'));
    textarea.value = 'new value';
    textarea.dispatchEvent(new Event('input'));
    textarea.dispatchEvent(new Event('blur'));
    await page.waitForChanges();

    expect(focusSpy).toHaveBeenCalled();
    expect(changeSpy).toHaveBeenCalled();
    expect(blurSpy).toHaveBeenCalled();
  });

  it('supports setFocus and form reset', async () => {
    const page = await newSpecPage({
      components: [TkTextarea],
      html: `<tk-textarea value="test"></tk-textarea>`,
    });

    await page.root.setFocus();
    await page.root.formResetCallback();

    expect(page.root.value).toBeNull();
  });
});
