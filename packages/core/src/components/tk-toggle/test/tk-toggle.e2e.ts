import { newE2EPage } from '@stencil/core/testing';

describe('tk-toggle', () => {
  it('toggles on click and emits change', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-toggle></tk-toggle>');

    const toggle = await page.find('tk-toggle');
    const changeSpy = await toggle.spyOnEvent('tk-change');
    const nativeInput = await page.find('tk-toggle >>> input');

    await nativeInput.click();
    await page.waitForChanges();

    expect(await page.$eval('tk-toggle', el => (el as HTMLTkToggleElement).value)).toBe(true);
    expect(changeSpy).toHaveReceivedEventDetail(true);
  });

  it('renders hint text when hint prop is provided', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-toggle data-testid="toggle" hint="Helpful hint"></tk-toggle>');

    const hint = await page.find('tk-toggle >>> [data-testid="toggle-hint-text"]');

    expect(hint).toEqualText('Helpful hint');
  });

  it('renders error text when invalid and error props are provided', async () => {
    const page = await newE2EPage();

    await page.setContent('<tk-toggle data-testid="toggle" invalid error="Something went wrong"></tk-toggle>');

    const errorWrapper = await page.find('tk-toggle >>> [data-testid="toggle-error"]');
    const errorText = await page.find('tk-toggle >>> [data-testid="toggle-error-text"]');

    expect(errorWrapper).toHaveClass('invalid');
    expect(errorText).toEqualText('Something went wrong');
  });
});
