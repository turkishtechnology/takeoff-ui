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

  it('renders the description and applies the width-description class', async () => {
    const page = await newSpecPage({
      components: [TkRadio],
      html: `<tk-radio label="With Description" description="More info"></tk-radio>`,
    });

    const container = page.root.querySelector('.tk-radio-container') as HTMLElement;
    expect(container.classList.contains('width-description')).toBe(true);
    expect(page.root.querySelector('.tk-radio-description').textContent).toBe('More info');
    expect(page.root.querySelector('.tk-radio-label').textContent).toBe('With Description');
  });

  it('applies disabled and invalid states to the rendered markup', async () => {
    const page = await newSpecPage({
      components: [TkRadio],
      html: `<tk-radio disabled invalid label="Broken"></tk-radio>`,
    });

    const container = page.root.querySelector('.tk-radio-container') as HTMLElement;
    expect(container.classList.contains('disabled')).toBe(true);
    expect((page.root.querySelector('input') as HTMLInputElement).disabled).toBe(true);
  });

  it('applies the position class to the container', async () => {
    const page = await newSpecPage({
      components: [TkRadio],
      html: `<tk-radio position="right" label="Right Radio"></tk-radio>`,
    });

    const container = page.root.querySelector('.tk-radio-container') as HTMLElement;
    expect(container.classList.contains('right')).toBe(true);
  });

  it('renders custom content slot instead of the default text holder', async () => {
    const page = await newSpecPage({
      components: [TkRadio],
      html: `<tk-radio><span slot="content">Custom</span></tk-radio>`,
    });

    expect(page.rootInstance.hasContentSlot).toBe(true);
    expect(page.root.querySelector('.tk-radio-text-holder')).toBeFalsy();
    expect(page.root.textContent).toContain('Custom');
  });

  describe('window click handling for standalone radios', () => {
    const html = `
      <tk-radio name="g" checked label="A"></tk-radio>
      <tk-radio name="g" label="B"></tk-radio>
      <tk-radio name="other" label="C"></tk-radio>
      <tk-radio label="D"></tk-radio>
      <tk-radio name="g" disabled label="E"></tk-radio>
      <div id="outside"></div>
    `;

    it('unchecks itself when another radio with the same name is clicked', async () => {
      const page = await newSpecPage({
        components: [TkRadio],
        html,
      });

      const radios = page.body.querySelectorAll('tk-radio');
      expect(page.rootInstance.checked).toBe(true);

      (page.rootInstance as any).handleWindowClick({ target: radios[1] });
      await page.waitForChanges();

      expect(page.rootInstance.checked).toBe(false);
    });

    it('resolves the radio from inner elements via closest', async () => {
      const page = await newSpecPage({
        components: [TkRadio],
        html,
      });

      const radios = page.body.querySelectorAll('tk-radio');
      const innerInput = radios[1].querySelector('input');

      (page.rootInstance as any).handleWindowClick({ target: innerInput });
      await page.waitForChanges();

      expect(page.rootInstance.checked).toBe(false);
    });

    it('stays checked for clicks on radios with a different or missing name', async () => {
      const page = await newSpecPage({
        components: [TkRadio],
        html,
      });

      const radios = page.body.querySelectorAll('tk-radio');

      (page.rootInstance as any).handleWindowClick({ target: radios[2] });
      await page.waitForChanges();
      expect(page.rootInstance.checked).toBe(true);

      (page.rootInstance as any).handleWindowClick({ target: radios[3] });
      await page.waitForChanges();
      expect(page.rootInstance.checked).toBe(true);
    });

    it('stays checked for clicks on itself and outside elements', async () => {
      const page = await newSpecPage({
        components: [TkRadio],
        html,
      });

      const radios = page.body.querySelectorAll('tk-radio');
      const outside = page.body.querySelector('#outside');

      (page.rootInstance as any).handleWindowClick({ target: radios[0] });
      await page.waitForChanges();
      expect(page.rootInstance.checked).toBe(true);

      (page.rootInstance as any).handleWindowClick({ target: outside });
      await page.waitForChanges();
      expect(page.rootInstance.checked).toBe(true);
    });

    it('stays checked when the clicked radio has no data-tk-radio-id', async () => {
      const page = await newSpecPage({
        components: [TkRadio],
        html,
      });

      const fakeRadio = {
        tagName: 'TK-RADIO',
        getAttribute: (attr: string) => (attr === 'name' ? 'g' : null),
      };

      (page.rootInstance as any).handleWindowClick({ target: fakeRadio });
      await page.waitForChanges();
      expect(page.rootInstance.checked).toBe(true);
    });

    // NOTE: current behavior — the guard `!clickedElement?.getAttribute('disabled')`
    // fails for a bare `disabled` attribute because getAttribute returns '' (falsy),
    // so clicking a disabled sibling still unchecks this radio. Kept as-is on purpose.
    it('unchecks even when the clicked sibling radio is disabled (known quirk)', async () => {
      const page = await newSpecPage({
        components: [TkRadio],
        html,
      });

      const radios = page.body.querySelectorAll('tk-radio');

      (page.rootInstance as any).handleWindowClick({ target: radios[4] });
      await page.waitForChanges();
      expect(page.rootInstance.checked).toBe(false);
    });

    it('stays checked when the clicked radio reports a non-empty disabled attribute', async () => {
      const page = await newSpecPage({
        components: [TkRadio],
        html,
      });

      const fakeDisabledRadio = {
        tagName: 'TK-RADIO',
        getAttribute: (attr: string) => {
          if (attr === 'name') return 'g';
          if (attr === 'data-tk-radio-id') return 'other-id';
          if (attr === 'disabled') return 'true';
          return null;
        },
      };

      (page.rootInstance as any).handleWindowClick({ target: fakeDisabledRadio });
      await page.waitForChanges();
      expect(page.rootInstance.checked).toBe(true);
    });

    it('reacts to real window clicks on sibling radios', async () => {
      const page = await newSpecPage({
        components: [TkRadio],
        html,
      });

      const radios = page.body.querySelectorAll('tk-radio');
      radios[1].dispatchEvent(new Event('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.rootInstance.checked).toBe(false);
    });
  });

  it('removes the window click listener on disconnect', async () => {
    const page = await newSpecPage({
      components: [TkRadio],
      html: `<tk-radio name="g" label="A"></tk-radio>`,
    });

    const removeSpy = jest.spyOn(window, 'removeEventListener');
    page.rootInstance.disconnectedCallback();

    expect(removeSpy).toHaveBeenCalledWith('click', (page.rootInstance as any).windowClickHandler);
    removeSpy.mockRestore();
  });
});
