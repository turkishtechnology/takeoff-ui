import { newSpecPage } from '@stencil/core/testing';
import { TkSlider } from '../tk-slider';

describe('tk-slider', () => {
  it('renders both thumbs in range mode', async () => {
    const page = await newSpecPage({
      components: [TkSlider],
      html: `<tk-slider></tk-slider>`,
    });

    page.root.range = true;
    page.root.value = [20, 80];
    page.rootInstance.componentWillLoad();
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelectorAll('.tk-slider-thumb')).toHaveLength(2);
  });
});
