import { newSpecPage } from '@stencil/core/testing';
import { TkRating } from '../tk-rating';

describe('tk-rating', () => {
  it('marks the selected number rating item', async () => {
    const page = await newSpecPage({
      components: [TkRating],
      html: `<tk-rating type="number" value="3"></tk-rating>`,
    });

    expect(page.root.shadowRoot.querySelector('.rating-number-3')?.classList.contains('selected')).toBe(true);
  });
});
