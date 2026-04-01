import { newSpecPage } from '@stencil/core/testing';
import { TkStepper } from '../tk-stepper';
import { TkStep } from '../tk-step';

type MutationObserverCallback = ConstructorParameters<typeof MutationObserver>[0];

class MockMutationObserver {
  constructor(private callback: MutationObserverCallback) {}

  observe() {}

  disconnect() {}

  takeRecords() {
    return [];
  }

  simulateMutation() {
    this.callback(
      [
        {
          addedNodes: [] as unknown as NodeList,
          removedNodes: [] as unknown as NodeList,
          type: 'childList',
        } as MutationRecord,
      ],
      this as unknown as MutationObserver,
    );
  }
}

type StepperTestAccess = {
  mutationObserver?: MockMutationObserver | null;
  activeChanged?: (value: number) => void;
  showCompleteStateChanged?: () => void;
  getIconElement?: (icon: string | Record<string, unknown>) => unknown;
  createStepIcon?: (step: Record<string, unknown>, index: number) => unknown;
  disconnectedCallback: () => void;
};

const originalMutationObserver = globalThis.MutationObserver;

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

  it('updates step completion when showCompleteState changes', async () => {
    const page = await newSpecPage({
      components: [TkStepper, TkStep],
      html: `
        <tk-stepper active="1" show-complete-state="true">
          <tk-step header="Step 1"></tk-step>
          <tk-step header="Step 2"></tk-step>
        </tk-stepper>
      `,
    });

    const steps = page.root.shadowRoot.querySelectorAll('.tk-step');
    expect(steps[0].classList.contains('tk-step-completed')).toBe(true);

    page.root.showCompleteState = false;
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelectorAll('.tk-step')[0].classList.contains('tk-step-completed')).toBe(false);
  });

  it('uses number mode and custom icons', async () => {
    const page = await newSpecPage({
      components: [TkStepper, TkStep],
      html: `
        <tk-stepper active="1" step-mode="number" complete-icon="check" active-icon="edit" inactive-icon="dot" error-icon="warning">
          <tk-step header="Step 1" complete="true"></tk-step>
          <tk-step header="Step 2"></tk-step>
          <tk-step header="Step 3" error="true"></tk-step>
        </tk-stepper>
      `,
    });

    expect(page.root.shadowRoot.querySelector('.tk-step-number')).toBeTruthy();

    page.root.stepMode = 'basic';
    await page.waitForChanges();

    const iconNodes = page.root.shadowRoot.querySelectorAll('tk-icon');
    expect(iconNodes.length).toBeGreaterThan(0);
  });

  it('reacts to added steps through the mutation observer', async () => {
    const page = await newSpecPage({
      components: [TkStepper, TkStep],
      html: `
        <tk-stepper active="0">
          <tk-step header="Step 1"></tk-step>
        </tk-stepper>
      `,
    });

    const stepper = page.rootInstance as StepperTestAccess;
    const newStep = document.createElement('tk-step');
    newStep.setAttribute('header', 'Step 2');
    page.root.appendChild(newStep);

    stepper.mutationObserver.simulateMutation();
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelectorAll('.tk-step')).toHaveLength(2);
  });

  it('disconnects the mutation observer on teardown', async () => {
    const page = await newSpecPage({
      components: [TkStepper, TkStep],
      html: `
        <tk-stepper active="0">
          <tk-step header="Step 1"></tk-step>
        </tk-stepper>
      `,
    });

    const stepper = page.rootInstance as StepperTestAccess;
    const disconnectSpy = jest.spyOn(stepper.mutationObserver, 'disconnect');

    stepper.disconnectedCallback();

    expect(disconnectSpy).toHaveBeenCalled();
  });

  it('creates icon elements for different states', async () => {
    const page = await newSpecPage({
      components: [TkStepper, TkStep],
      html: `<tk-stepper active="1"></tk-stepper>`,
    });

    const stepper = page.rootInstance as StepperTestAccess;

    expect(stepper.getIconElement('check')).toBeTruthy();
    expect(stepper.createStepIcon({ disabled: true }, 0)).toBeTruthy();
    expect(stepper.createStepIcon({ error: true, disabled: false }, 1)).toBeTruthy();
    expect(stepper.createStepIcon({ complete: true, disabled: false, error: false }, 2)).toBeTruthy();
  });
});
