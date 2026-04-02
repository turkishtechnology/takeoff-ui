import { newSpecPage } from '@stencil/core/testing';
import { TkSpinner } from '../tk-spinner';

describe('tk-spinner', () => {
  it('renders the three-dots spinner variant', async () => {
    const page = await newSpecPage({
      components: [TkSpinner],
      html: `<tk-spinner type="three-dots" label="Loading"></tk-spinner>`,
    });

    expect(page.root.shadowRoot.querySelector('.spinner-three-dots')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('.tk-spinner-label')?.textContent).toBe('Loading');
  });
});
