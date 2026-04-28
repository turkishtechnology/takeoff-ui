import { newSpecPage } from '@stencil/core/testing';
import { TkCarousel } from '../tk-carousel';

describe('tk-carousel', () => {
  it('renders an indicator for each visible slide position', async () => {
    const page = await newSpecPage({
      components: [TkCarousel],
      html: `<tk-carousel><div>One</div><div>Two</div><div>Three</div></tk-carousel>`,
    });

    expect(page.root.shadowRoot.querySelectorAll('.tk-carousel-indicator-dot')).toHaveLength(3);
  });
});
