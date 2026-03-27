import { newSpecPage } from '@stencil/core/testing';
import { TkStepper } from '../tk-stepper';
import { TkStep } from '../tk-step';

const originalMutationObserver = globalThis.MutationObserver;

class MockMutationObserver {
  observe() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

describe('tk-stepper', () => {
  beforeAll(() => {
    (globalThis as typeof globalThis & { MutationObserver: typeof MutationObserver }).MutationObserver = MockMutationObserver as unknown as typeof MutationObserver;
  });

  afterAll(() => {
    (globalThis as typeof globalThis & { MutationObserver: typeof MutationObserver }).MutationObserver = originalMutationObserver;
  });

  it('renders steps and marks the active one', async () => {
    const page = await newSpecPage({
      components: [TkStepper, TkStep],
      html: `
        <tk-stepper active="1">
          <tk-step header="Step 1"></tk-step>
          <tk-step header="Step 2"></tk-step>
          <tk-step header="Step 3"></tk-step>
        </tk-stepper>
      `,
    });

    const steps = page.root.shadowRoot.querySelectorAll('.tk-step');

    expect(steps).toHaveLength(3);
    expect(steps[1].classList.contains('tk-step-active')).toBe(true);
  });

  it('updates the active step and emits change events', async () => {
    const page = await newSpecPage({
      components: [TkStepper, TkStep],
      html: `
        <tk-stepper active="0">
          <tk-step header="Step 1"></tk-step>
          <tk-step header="Step 2"></tk-step>
        </tk-stepper>
      `,
    });

    const changeSpy = jest.fn();

    page.root.addEventListener('tk-step-change', changeSpy);
    await page.root.setActive(1);
    await page.waitForChanges();

    expect(page.root.active).toBe(1);
    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy.mock.calls[0][0].detail).toBe(1);
    expect(page.root.shadowRoot.querySelectorAll('.tk-step')[1].classList.contains('tk-step-active')).toBe(true);
  });

  it('prevents invalid jumps in linear mode', async () => {
    const page = await newSpecPage({
      components: [TkStepper, TkStep],
      html: `
        <tk-stepper active="0" linear="true">
          <tk-step header="Step 1"></tk-step>
          <tk-step header="Step 2"></tk-step>
          <tk-step header="Step 3"></tk-step>
        </tk-stepper>
      `,
    });

    await page.root.setActive(2);
    await page.waitForChanges();
    expect(page.root.active).toBe(0);

    await page.root.setActive(1);
    await page.waitForChanges();
    expect(page.root.active).toBe(1);
  });

  it('does not select disabled or non-clickable steps', async () => {
    const page = await newSpecPage({
      components: [TkStepper, TkStep],
      html: `
        <tk-stepper active="0">
          <tk-step header="Step 1"></tk-step>
          <tk-step header="Step 2" disabled></tk-step>
          <tk-step header="Step 3" is-clickable="false"></tk-step>
        </tk-stepper>
      `,
    });

    await page.root.setActive(1);
    await page.waitForChanges();
    expect(page.root.active).toBe(0);

    await page.root.setActive(2);
    await page.waitForChanges();
    expect(page.root.active).toBe(0);
  });
});
