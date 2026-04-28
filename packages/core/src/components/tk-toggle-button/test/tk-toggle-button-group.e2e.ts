import { newE2EPage } from '@stencil/core/testing';

describe('tk-toggle-button-group', () => {
  it('selects the clicked button and emits change', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <tk-toggle-button-group>
        <tk-toggle-button value="a" label="A"></tk-toggle-button>
        <tk-toggle-button value="b" label="B"></tk-toggle-button>
      </tk-toggle-button-group>
    `);

    const group = await page.find('tk-toggle-button-group');
    const changeSpy = await group.spyOnEvent('tk-change');
    const secondButton = await page.find('tk-toggle-button[value="b"] >>> button');

    await secondButton.click();
    await page.waitForChanges();

    const selectedButton = await page.find('tk-toggle-button[value="b"]');

    expect(selectedButton).toHaveAttribute('selected');
    expect(changeSpy).toHaveReceivedEventDetail('b');
  });
});
