import { newSpecPage } from '@stencil/core/testing';
import { TkBreadcrumbItem } from '../tk-breadcrumb-item';

describe('tk-breadcrumb-item', () => {
  it('marks the current page item as non-focusable', async () => {
    const page = await newSpecPage({
      components: [TkBreadcrumbItem],
      html: `<tk-breadcrumb-item label="Home" href="/home" is-current="true"></tk-breadcrumb-item>`,
    });

    const item = page.root.querySelector('li');
    const link = page.root.querySelector('a');

    expect(item.getAttribute('aria-current')).toBe('page');
    expect(link.getAttribute('tabindex')).toBe('-1');
  });
});
