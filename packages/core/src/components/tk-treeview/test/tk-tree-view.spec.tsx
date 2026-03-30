import { newSpecPage } from '@stencil/core/testing';
import { TkTreeView } from '../tk-tree-view';

describe('tk-tree-view', () => {
  it('renders a badge for branch child counts', async () => {
    const page = await newSpecPage({
      components: [TkTreeView],
      html: `<tk-tree-view></tk-tree-view>`,
    });

    page.root.items = [{ key: 'root', label: 'Root', children: [{ key: 'child', label: 'Child' }] }];
    await page.waitForChanges();

    expect(page.root.querySelector('tk-badge')).toBeTruthy();
  });
});
