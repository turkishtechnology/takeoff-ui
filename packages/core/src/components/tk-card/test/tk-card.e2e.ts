import { newE2EPage } from '@stencil/core/testing';

describe('tk-card', () => {
  it('reflects data-testid on host and forwards it to card container', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-card data-testid="automation-card" header="Test Header"></tk-card>');

    const hostTestId = await page.$eval('tk-card', el => el.getAttribute('data-testid'));
    const containerTestId = await page.$eval('tk-card >>> .tk-card', el => el.getAttribute('data-testid'));

    expect(hostTestId).toBe('automation-card');
    expect(containerTestId).toBe('automation-card-card');
  });

  it('forwards derived data-testid values to rendered card sections', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <tk-card
        data-testid="automation-card"
        header="Test Header"
        subheader="Test Subheader"
        image="data:image/gif;base64,R0lGODlhAQABAAAAACw="
      >
        <div>Body</div>
      </tk-card>
    `);

    const headerTestId = await page.$eval('tk-card >>> .tk-card-header', el => el.getAttribute('data-testid'));
    const headerContentTestId = await page.$eval('tk-card >>> .tk-card-header-content', el => el.getAttribute('data-testid'));
    const titleContainerTestId = await page.$eval('tk-card >>> .tk-card-title-container', el => el.getAttribute('data-testid'));
    const titleTestId = await page.$eval('tk-card >>> .tk-card-title', el => el.getAttribute('data-testid'));
    const subtitleTestId = await page.$eval('tk-card >>> .tk-card-subtitle', el => el.getAttribute('data-testid'));
    const imageTestId = await page.$eval('tk-card >>> .tk-card-image', el => el.getAttribute('data-testid'));
    const imageTagTestId = await page.$eval('tk-card >>> .tk-card-image img', el => el.getAttribute('data-testid'));
    const contentTestId = await page.$eval('tk-card >>> .tk-card-content', el => el.getAttribute('data-testid'));

    expect(headerTestId).toBe('automation-card-card-header');
    expect(headerContentTestId).toBe('automation-card-card-header-content');
    expect(titleContainerTestId).toBe('automation-card-card-title-container');
    expect(titleTestId).toBe('automation-card-card-title');
    expect(subtitleTestId).toBe('automation-card-card-subtitle');
    expect(imageTestId).toBe('automation-card-card-image');
    expect(imageTagTestId).toBe('automation-card-card-image-tag');
    expect(contentTestId).toBe('automation-card-card-content');
  });

  it('forwards derived data-testid values for footer actions slot wrapper', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <tk-card data-testid="automation-card" header="Test Header">
        <div slot="footer-actions">Custom Footer Actions</div>
      </tk-card>
    `);

    const footerTestId = await page.$eval('tk-card >>> .tk-card-footer', el => el.getAttribute('data-testid'));
    const footerSlotTestId = await page.$eval('tk-card >>> slot[name="footer-actions"]', el => el.getAttribute('data-testid'));

    expect(footerTestId).toBe('automation-card-card-footer');
    expect(footerSlotTestId).toBe('automation-card-card-footer-actions-slot');
  });

  it('renders header and subheader content', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-card header="Test Header" subheader="Test Subheader"></tk-card>');

    const card = await page.find('tk-card');
    const title = await page.find('tk-card >>> .tk-card-title');
    const subtitle = await page.find('tk-card >>> .tk-card-subtitle');

    expect(card).toHaveClass('hydrated');
    expect(title.textContent).toContain('Test Header');
    expect(subtitle.textContent).toContain('Test Subheader');
  });

  it('renders slotted content', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <tk-card>
        <div slot="header">Custom Header</div>
        <div slot="content">Custom Content</div>
        <div slot="footer-actions">Custom Footer Actions</div>
      </tk-card>
    `);

    expect((await page.find('tk-card [slot="header"]')).textContent).toContain('Custom Header');
    expect((await page.find('tk-card [slot="content"]')).textContent).toContain('Custom Content');
    expect((await page.find('tk-card [slot="footer-actions"]')).textContent).toContain('Custom Footer Actions');
  });

  it('renders image position classes', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-card image="data:image/gif;base64,R0lGODlhAQABAAAAACw=" horizontal="true"></tk-card>');
    await page.$eval('tk-card', el => {
      (el as HTMLTkCardElement).imageOptions = {
        position: 'left',
        background: false,
        windowed: true,
      };
    });
    await page.waitForChanges();

    const image = await page.find('tk-card >>> .tk-card-image');
    const img = await page.find('tk-card >>> .tk-card-image img');

    expect(image).toHaveClass('tk-card-image-left');
    expect(img.getAttribute('src')).toBe('data:image/gif;base64,R0lGODlhAQABAAAAACw=');
  });
});
