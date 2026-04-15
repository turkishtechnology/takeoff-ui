import { newE2EPage } from '@stencil/core/testing';

describe('tk-button', () => {
  it('reflects data-testid on host and forwards it to shadow button', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-button data-testid="1" label="Click" icon="home"></tk-button>');

    const hostTestId = await page.$eval('tk-button', el => el.getAttribute('data-testid'));
    const nativeTestId = await page.$eval('tk-button >>> button', el => el.getAttribute('data-testid'));
    const labelTestId = await page.$eval('tk-button >>> span', el => el.getAttribute('data-testid'));
    const iconTestId = await page.$eval('tk-button >>> tk-icon', el => el.getAttribute('data-testid'));

    expect(hostTestId).toBe('1');
    expect(nativeTestId).toBe('1-button');
    expect(labelTestId).toBe('1-button-label');
    expect(iconTestId).toBe('1-button-left-icon');
  });

  it('forwards data-testid to anchor in link mode', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-button mode="link" href="/docs" data-testid="2" label="Docs" icon="arrow_forward" icon-position="right"></tk-button>');

    const nativeLinkTestId = await page.$eval('tk-button >>> a', el => el.getAttribute('data-testid'));
    const labelTestId = await page.$eval('tk-button >>> span', el => el.getAttribute('data-testid'));
    const iconTestId = await page.$eval('tk-button >>> tk-icon', el => el.getAttribute('data-testid'));

    expect(nativeLinkTestId).toBe('2-button');
    expect(labelTestId).toBe('2-button-label');
    expect(iconTestId).toBe('2-button-right-icon');
  });

  it('generates left and right icon test ids for multi-icon configuration', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-button data-testid="3-multi"></tk-button>');

    const button = await page.find('tk-button');
    await button.setProperty('icon', {
      left: { name: 'chevron_left' },
      right: { name: 'chevron_right' },
    });

    await page.waitForChanges();

    const leftIconTestId = await page.$eval('tk-button >>> tk-icon:first-of-type', el => el.getAttribute('data-testid'));
    const rightIconTestId = await page.$eval('tk-button >>> tk-icon:last-of-type', el => el.getAttribute('data-testid'));

    expect(leftIconTestId).toBe('3-multi-button-left-icon');
    expect(rightIconTestId).toBe('3-multi-button-right-icon');
  });

  it('forwards derived data-testid to loading spinner', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-button loading="true" data-testid="4"></tk-button>');

    const spinnerTestId = await page.$eval('tk-button >>> tk-spinner', el => el.getAttribute('data-testid'));

    expect(spinnerTestId).toBe('4-button-left-icon');
  });
});
