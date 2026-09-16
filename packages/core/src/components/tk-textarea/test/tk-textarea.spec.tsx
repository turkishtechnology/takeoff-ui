import { newSpecPage } from '@stencil/core/testing';
import { TkTextarea } from '../tk-textarea';
import { TkIcon } from '../../tk-icon/tk-icon';

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

    expect(container.getAttribute('aria-disabled')).toBe('true');
    expect(container.getAttribute('aria-readonly')).toBe('true');
    expect(container.getAttribute('aria-invalid')).toBe('true');
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

  describe('copy button', () => {
    let writeText: jest.Mock;

    beforeEach(() => {
      writeText = jest.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText },
        configurable: true,
      });
    });

    it('renders the copy button only when showCopyButton is set', async () => {
      const page = await newSpecPage({
        components: [TkTextarea],
        html: `<tk-textarea value="hello"></tk-textarea>`,
      });

      expect(page.root.shadowRoot.querySelector('.copy-button')).toBeNull();

      page.root.showCopyButton = true;
      await page.waitForChanges();

      expect(page.root.shadowRoot.querySelector('.copy-button')).toBeTruthy();
    });

    it('copies the current value and shows the copied state', async () => {
      const page = await newSpecPage({
        components: [TkTextarea],
        html: `<tk-textarea value="hello" show-copy-button="true"></tk-textarea>`,
      });

      page.root.shadowRoot.querySelector('.copy-button').dispatchEvent(new MouseEvent('click'));
      // handleCopy is async (awaits the clipboard write); flush the write's
      // microtask, then the render triggered by the copied-state change.
      await page.waitForChanges();
      await page.waitForChanges();

      expect(writeText).toHaveBeenCalledWith('hello');
      expect(page.rootInstance.copied).toBe(true);
      expect(page.root.shadowRoot.querySelector('.copy-button').getAttribute('aria-label')).toBe('Copied!');
    });

    it('does not copy when disabled', async () => {
      const page = await newSpecPage({
        components: [TkTextarea],
        html: `<tk-textarea value="hello" show-copy-button="true" disabled="true"></tk-textarea>`,
      });

      page.root.shadowRoot.querySelector('.copy-button').dispatchEvent(new MouseEvent('click'));
      await page.waitForChanges();

      expect(writeText).not.toHaveBeenCalled();
      expect(page.rootInstance.copied).toBe(false);
    });

    it('stays un-copied when the clipboard write fails', async () => {
      writeText.mockRejectedValue(new Error('denied'));
      const page = await newSpecPage({
        components: [TkTextarea],
        html: `<tk-textarea value="hello" show-copy-button="true"></tk-textarea>`,
      });

      page.root.shadowRoot.querySelector('.copy-button').dispatchEvent(new MouseEvent('click'));
      await page.waitForChanges();

      expect(writeText).toHaveBeenCalled();
      expect(page.rootInstance.copied).toBe(false);
    });

    it('resets the copied state after the timeout', async () => {
      // Fake timers deadlock Stencil's waitForChanges, so use real timers and
      // wait just past the 2s reset window.
      const page = await newSpecPage({
        components: [TkTextarea],
        html: `<tk-textarea value="hello" show-copy-button="true"></tk-textarea>`,
      });

      page.root.shadowRoot.querySelector('.copy-button').dispatchEvent(new MouseEvent('click'));
      await page.waitForChanges();
      await page.waitForChanges();
      expect(page.rootInstance.copied).toBe(true);

      await new Promise(resolve => setTimeout(resolve, 2100));
      await page.waitForChanges();
      expect(page.rootInstance.copied).toBe(false);
    });
  });
});

describe('tk-textarea attributes and counter', () => {
  it('moves the host tabindex onto the native textarea', async () => {
    const page = await newSpecPage({
      components: [TkTextarea],
      html: `<tk-textarea tabindex="3"></tk-textarea>`,
    });

    expect(page.root.hasAttribute('tabindex')).toBe(false);
    expect(page.root.shadowRoot.querySelector('textarea').getAttribute('tabindex')).toBe('3');
  });

  it('leaves the textarea without a tabindex when the host has none', async () => {
    const page = await newSpecPage({
      components: [TkTextarea],
      html: `<tk-textarea></tk-textarea>`,
    });

    expect(page.root.shadowRoot.querySelector('textarea').hasAttribute('tabindex')).toBe(false);
  });

  it('renders the label without an asterisk by default and no label row without a label', async () => {
    const labelled = await newSpecPage({
      components: [TkTextarea],
      html: `<tk-textarea label="Notes"></tk-textarea>`,
    });
    expect(labelled.root.shadowRoot.querySelector('.tk-textarea-label-row')).toBeTruthy();
    expect(labelled.root.shadowRoot.querySelector('.asterisk')).toBeNull();

    const plain = await newSpecPage({
      components: [TkTextarea],
      html: `<tk-textarea></tk-textarea>`,
    });
    expect(plain.root.shadowRoot.querySelector('.tk-textarea-label-row')).toBeNull();
    expect(plain.root.shadowRoot.querySelector('label.label')).toBeNull();
  });

  it('keeps the label row for the copy button even without a label', async () => {
    const page = await newSpecPage({
      components: [TkTextarea],
      html: `<tk-textarea show-copy-button="true"></tk-textarea>`,
    });

    expect(page.root.shadowRoot.querySelector('.tk-textarea-label-row')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('label.label')).toBeNull();
    expect(page.root.shadowRoot.querySelector('.copy-button')).toBeTruthy();
  });

  it('counts trimmed characters against maxLength and flags the limit', async () => {
    const page = await newSpecPage({
      components: [TkTextarea],
      html: `<tk-textarea max-length="5" data-testid="ta"></tk-textarea>`,
    });
    const textarea = page.root.shadowRoot.querySelector('textarea') as HTMLTextAreaElement;
    const counter = () => page.root.shadowRoot.querySelector('.counter') as HTMLElement;

    expect(counter().textContent).toBe('0/5');
    expect(counter().getAttribute('data-testid')).toBe('ta-counter');

    textarea.value = ' abc ';
    textarea.dispatchEvent(new Event('input'));
    await page.waitForChanges();
    expect(counter().textContent).toBe('3/5');
    expect(counter().classList.contains('maxed')).toBe(false);

    textarea.value = 'abcde';
    textarea.dispatchEvent(new Event('input'));
    await page.waitForChanges();
    expect(counter().textContent).toBe('5/5');
    expect(counter().classList.contains('maxed')).toBe(true);
  });

  it('does not render a counter without maxLength', async () => {
    const page = await newSpecPage({
      components: [TkTextarea],
      html: `<tk-textarea value="abc"></tk-textarea>`,
    });

    expect(page.root.shadowRoot.querySelector('.counter')).toBeNull();
  });

  it('falls back to an empty value when the textarea is cleared', async () => {
    const page = await newSpecPage({
      components: [TkTextarea],
      html: `<tk-textarea value="abc"></tk-textarea>`,
    });
    const changeSpy = jest.fn();
    page.root.addEventListener('tk-change', (e: CustomEvent) => changeSpy(e.detail));
    const textarea = page.root.shadowRoot.querySelector('textarea') as HTMLTextAreaElement;

    textarea.value = '';
    textarea.dispatchEvent(new Event('input'));
    await page.waitForChanges();

    expect(changeSpy).toHaveBeenCalledWith('');
    expect(page.root.value).toBe('');
  });

  it('emits tk-change with null on form reset', async () => {
    const page = await newSpecPage({
      components: [TkTextarea],
      html: `<tk-textarea value="abc"></tk-textarea>`,
    });
    const changeSpy = jest.fn();
    page.root.addEventListener('tk-change', (e: CustomEvent) => changeSpy(e.detail));

    page.rootInstance.formResetCallback();
    await page.waitForChanges();

    expect(changeSpy).toHaveBeenCalledWith(null);
    expect(page.root.shadowRoot.querySelector('textarea').value).toBeFalsy();
  });
});

describe('tk-textarea copy button keyboard', () => {
  let writeText: jest.Mock;

  beforeEach(() => {
    writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
  });

  it('copies with Enter or Space and ignores other keys', async () => {
    const page = await newSpecPage({
      components: [TkTextarea],
      html: `<tk-textarea value="hello" show-copy-button="true"></tk-textarea>`,
    });
    const copyButton = page.root.shadowRoot.querySelector('.copy-button');

    copyButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await page.waitForChanges();
    expect(writeText).not.toHaveBeenCalled();

    const enter = new KeyboardEvent('keydown', { key: 'Enter' });
    const preventDefault = jest.spyOn(enter, 'preventDefault');
    copyButton.dispatchEvent(enter);
    await page.waitForChanges();
    expect(preventDefault).toHaveBeenCalled();
    expect(writeText).toHaveBeenCalledTimes(1);

    copyButton.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    await page.waitForChanges();
    expect(writeText).toHaveBeenCalledTimes(2);
  });

  it('copies an empty string when the value is null', async () => {
    const page = await newSpecPage({
      components: [TkTextarea],
      html: `<tk-textarea show-copy-button="true"></tk-textarea>`,
    });
    page.root.value = null;
    await page.waitForChanges();

    page.root.shadowRoot.querySelector('.copy-button').dispatchEvent(new MouseEvent('click'));
    await page.waitForChanges();

    expect(writeText).toHaveBeenCalledWith('');
  });

  it('marks the copy button disabled and dims it while disabled', async () => {
    const page = await newSpecPage({
      components: [TkTextarea, TkIcon],
      html: `<tk-textarea show-copy-button="true" disabled="true" size="small"></tk-textarea>`,
    });
    const copyButton = page.root.shadowRoot.querySelector('.copy-button') as any;

    expect(copyButton.getAttribute('aria-disabled')).toBe('true');
    expect(copyButton.getAttribute('tabindex')).toBe('-1');
    expect(copyButton.color).toBe('var(--text-sub-base)');
    expect(copyButton.size).toBe('small');
  });
});
