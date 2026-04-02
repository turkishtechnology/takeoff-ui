import { newE2EPage } from '@stencil/core/testing';

describe('tk-card', () => {
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
