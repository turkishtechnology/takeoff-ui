import { newE2EPage } from '@stencil/core/testing';

describe('tk-pagination', () => {
  it('moves to the next page and emits page change data', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-pagination total-items="30" rows-per-page="10"></tk-pagination>');
    await page.waitForChanges();
    await page.waitForTimeout(50);

    const pagination = await page.find('tk-pagination');
    const changeSpy = await pagination.spyOnEvent('tk-page-change');
    const nextButton = await page.find('tk-pagination .tk-pagination-next');

    await nextButton.click();
    await page.waitForChanges();
    await page.waitForTimeout(50);

    const activePage = await page.find('tk-pagination .tk-pagination-page-active .tk-pagination-page-label');

    expect(activePage.textContent).toBe('2');
    expect(changeSpy).toHaveReceivedEventDetail({
      page: 2,
      totalPages: 3,
      startItem: 11,
      endItem: 20,
    });
  });
});
