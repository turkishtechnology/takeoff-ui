import { newSpecPage } from '@stencil/core/testing';
import { TkRadio } from '../tk-radio';

describe('tk-radio', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [TkRadio],
      html: `<tk-radio label="Default Radio"></tk-radio>`,
    });

    expect(page.root).toBeTruthy();
    expect(page.root.shadowRoot.textContent).toContain('Default Radio'); // Use shadowRoot
  });

  it('applies name attribute', async () => {
    const page = await newSpecPage({
      components: [TkRadio],
      html: `<tk-radio name="group1" label="Radio 1"></tk-radio>`,
    });

    const input = page.root.shadowRoot.querySelector('input');
    expect(input.name).toBe('group1');
  });

  it('marks radio as checked when checked prop is true', async () => {
    const page = await newSpecPage({
      components: [TkRadio],
      html: `<tk-radio checked label="Checked Radio"></tk-radio>`,
    });

    const input = page.root.shadowRoot.querySelector('input');
    expect(input.checked).toBe(true);
  });

  it('toggles checked state on click', async () => {
    const page = await newSpecPage({
      components: [TkRadio],
      html: `<tk-radio label="Toggle Radio"></tk-radio>`,
    });

    const radio = page.root.shadowRoot.querySelector('input');
    expect(radio.checked).toBe(false);

    radio.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(page.rootInstance.checked).toBe(true);
  });

  it('does not toggle checked state when disabled', async () => {
    const page = await newSpecPage({
      components: [TkRadio],
      html: `<tk-radio disabled label="Disabled Radio"></tk-radio>`,
    });

    const radio = page.root.shadowRoot.querySelector('input');
    expect(radio.disabled).toBe(true);

    radio.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(page.rootInstance.checked).toBe(false);
  });

  it('emits tk-change event when checked', async () => {
    const page = await newSpecPage({
      components: [TkRadio],
      html: `<tk-radio label="Event Radio" value="radioValue"></tk-radio>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('tk-change', spy);

    const radio = page.root.shadowRoot.querySelector('input');
    radio.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toBe('radioValue');
  });

  it('unchecks radio when another radio in the same group is selected (handleWindowClick)', async () => {
    const page = await newSpecPage({
      components: [TkRadio],
      html: `
        <tk-radio name="group1" label="Radio 1" checked></tk-radio>
        <tk-radio name="group1" label="Radio 2"></tk-radio>
      `,
    });

    const radios = page.body.querySelectorAll('tk-radio');
    const firstRadio = radios[0].shadowRoot.querySelector('input');
    const secondRadio = radios[1].shadowRoot.querySelector('input');

    expect(firstRadio.checked).toBe(true);
    expect(secondRadio.checked).toBe(false);

    radios[1].dispatchEvent(new CustomEvent('click', { bubbles: true, composed: true }));
    await page.waitForChanges();
    expect(firstRadio.checked).toBe(false);
    //expect(radios[1].checked).toBe(true);
  });
});
