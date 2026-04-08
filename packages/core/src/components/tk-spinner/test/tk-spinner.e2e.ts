import { newE2EPage } from '@stencil/core/testing';

describe('tk-spinner', () => {
  it('renders with default variant class', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-spinner></tk-spinner>');

    const container = await page.find('tk-spinner >>> .tk-spin-container');

    expect(container).toHaveClass('neutral');
  });

  it('renders with provided variant and label', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-spinner variant="danger" label="Loading"></tk-spinner>');

    const container = await page.find('tk-spinner >>> .tk-spin-container');
    const label = await page.find('tk-spinner >>> .tk-spinner-label');

    expect(container).toHaveClass('danger');
    expect(label.textContent).toContain('Loading');
  });
});
