import { newE2EPage } from '@stencil/core/testing';

describe('tk-stepper', () => {
  it('activates the clicked step and emits a change event', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <tk-stepper>
        <tk-step header="Step 1"></tk-step>
        <tk-step header="Step 2"></tk-step>
      </tk-stepper>
    `);

    const stepper = await page.find('tk-stepper');
    const changeSpy = await stepper.spyOnEvent('tk-step-change');
    const steps = await page.findAll('tk-stepper >>> .tk-step-item');

    await steps[1].click();
    await page.waitForChanges();

    const activeStep = await page.find('tk-stepper >>> .tk-step-active .tk-step-header');

    expect(activeStep.textContent).toBe('Step 2');
    expect(changeSpy).toHaveReceivedEventDetail(1);
  });
});
