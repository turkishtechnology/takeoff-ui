import { newSpecPage } from '@stencil/core/testing';
import { TkRadio } from '../tk-radio';

describe('tk-radio', () => {
  it('renders label and name in light DOM', async () => {
    const page = await newSpecPage({
      components: [TkRadio],
      html: `<tk-radio label="Default Radio" name="group1"></tk-radio>`,
    });

    expect(page.root.textContent).toContain('Default Radio');
    expect((page.root.querySelector('input') as HTMLInputElement).name).toBe('group1');
  });

  it('tracks checked state and emits tk-change', async () => {
    const page = await newSpecPage({
      components: [TkRadio],
      html: `<tk-radio label="Event Radio" value="radioValue"></tk-radio>`,
    });

    const spy = jest.fn();
    const radio = page.root.querySelector('input') as HTMLInputElement;

    page.root.addEventListener('tk-change', spy);
    radio.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(page.rootInstance.checked).toBe(true);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toBe('radioValue');
  });

  it('does not change when disabled', async () => {
    const page = await newSpecPage({
      components: [TkRadio],
      html: `<tk-radio disabled label="Disabled Radio"></tk-radio>`,
    });

    const radio = page.root.querySelector('input') as HTMLInputElement;
    radio.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(page.rootInstance.checked).toBe(false);
  });
});
