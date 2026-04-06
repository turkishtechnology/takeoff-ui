import { newSpecPage } from '@stencil/core/testing';
import { TkToggleButton } from '../tk-toggle-button';

describe('tk-toggle-button', () => {
  it('emits the next selected state on click', async () => {
    const page = await newSpecPage({
      components: [TkToggleButton],
      html: `<tk-toggle-button label="Bold"></tk-toggle-button>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('tk-toggle', spy);
    (page.root.shadowRoot.querySelector('button') as HTMLButtonElement).click();
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail.selected).toBe(true);
  });
});
