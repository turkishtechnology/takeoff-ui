import { newE2EPage } from '@stencil/core/testing';

// These components render their floating panel inside their own shadow root, which the
// document-level global stylesheet never reaches, so the rule has to be scoped per component.
const SHADOW_FLOATING_COMPONENTS = ['tk-popover', 'tk-tooltip', 'tk-datepicker', 'tk-color-picker'];

describe('floating-hidden', () => {
  it.each(SHADOW_FLOATING_COMPONENTS)('hides elements inside the shadow root of %s', async tag => {
    const page = await newE2EPage();

    await page.setContent(`<${tag}></${tag}>`);

    const visibility = await page.evaluate(selector => {
      const root = document.querySelector(selector).shadowRoot;
      const probe = document.createElement('div');
      probe.className = 'floating-hidden';
      root.appendChild(probe);

      const result = getComputedStyle(probe).visibility;
      probe.remove();

      return result;
    }, tag);

    expect(visibility).toBe('hidden');
  });
});
