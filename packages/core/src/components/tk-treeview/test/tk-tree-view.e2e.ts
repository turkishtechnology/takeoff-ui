import { newE2EPage } from '@stencil/core/testing';

describe('tk-tree-view', () => {
  it('expands a branch when it is clicked', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-tree-view></tk-tree-view>');
    await page.$eval('tk-tree-view', el => {
      (el as HTMLTkTreeViewElement).items = [{ key: 'root', label: 'Root', children: [{ key: 'child', label: 'Child' }] }];
    });
    await page.waitForChanges();

    const rootLabel = await page.find('tk-tree-view .tk-tree-view.label');

    await rootLabel.click();
    await page.waitForChanges();

    const textNodes = await page.findAll('tk-tree-view .tk-tree-view.text');

    expect(textNodes[1].textContent).toBe('Child');
  });
});
