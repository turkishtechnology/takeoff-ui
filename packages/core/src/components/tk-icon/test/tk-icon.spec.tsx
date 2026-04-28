import { newSpecPage } from '@stencil/core/testing';
import { TkIcon } from '../tk-icon';

describe('tk-icon', () => {
  it('renders the icon name with sign styling', async () => {
    const page = await newSpecPage({
      components: [TkIcon],
      html: `<tk-icon icon="home" sign="true"></tk-icon>`,
    });

    expect(page.root.querySelector('.tk-icon')?.textContent).toBe('home');
    expect(page.root.querySelector('.tk-icon')?.classList.contains('tk-icon-sign')).toBe(true);
  });
});
