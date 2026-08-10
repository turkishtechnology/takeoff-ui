import { newSpecPage } from '@stencil/core/testing';
import { TkSlider } from '../tk-slider';

const mockTrack = (instance: TkSlider, width = 100, left = 0) => {
  (instance as any).trackRef = {
    getBoundingClientRect: () => ({ left, width }),
  };
};

describe('tk-slider', () => {
  it('renders both thumbs in range mode', async () => {
    const page = await newSpecPage({
      components: [TkSlider],
      html: `<tk-slider></tk-slider>`,
    });

    page.root.range = true;
    page.root.value = [20, 80];
    page.rootInstance.componentWillLoad();
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelectorAll('.tk-slider-thumb')).toHaveLength(2);
  });

  it('renders a single thumb, fill and min/max labels by default', async () => {
    const page = await newSpecPage({
      components: [TkSlider],
      html: `<tk-slider></tk-slider>`,
    });

    expect(page.root.shadowRoot.querySelectorAll('.tk-slider-thumb')).toHaveLength(1);

    const fill = page.root.shadowRoot.querySelector('.tk-slider-fill') as HTMLElement;
    expect(fill.getAttribute('style')).toContain('width: 0%');

    const labels = page.root.shadowRoot.querySelectorAll('.tk-slider-labels span');
    expect(labels).toHaveLength(2);
    expect(labels[0].textContent).toBe('0');
    expect(labels[1].textContent).toBe('100');
  });

  it('clamps the initial value between min and max', async () => {
    const page = await newSpecPage({
      components: [TkSlider],
      html: `<tk-slider></tk-slider>`,
    });

    page.root.value = 150;
    page.rootInstance.componentWillLoad();
    await page.waitForChanges();
    expect((page.rootInstance as any).currentMin).toBe(100);

    page.root.value = -10;
    page.rootInstance.componentWillLoad();
    await page.waitForChanges();
    expect((page.rootInstance as any).currentMin).toBe(0);
  });

  it('sorts range values on load and positions the fill between them', async () => {
    const page = await newSpecPage({
      components: [TkSlider],
      html: `<tk-slider></tk-slider>`,
    });

    page.root.range = true;
    page.root.value = [80, 20];
    page.rootInstance.componentWillLoad();
    await page.waitForChanges();

    expect((page.rootInstance as any).currentMin).toBe(20);
    expect((page.rootInstance as any).currentMax).toBe(80);

    const fill = page.root.shadowRoot.querySelector('.tk-slider-fill') as HTMLElement;
    expect(fill.getAttribute('style')).toContain('left: 20%');
    expect(fill.getAttribute('style')).toContain('width: 60%');
  });

  it('applies disabled classes and ignores pointer down when disabled', async () => {
    const page = await newSpecPage({
      components: [TkSlider],
      html: `<tk-slider disabled></tk-slider>`,
    });

    expect(page.root.shadowRoot.querySelector('.tk-slider-disabled')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('.tk-slider-thumb-disabled')).toBeTruthy();

    (page.rootInstance as any).handlePointerDown('min');
    await page.waitForChanges();

    expect((page.rootInstance as any).draggingThumb).toBeNull();
    expect(page.root.shadowRoot.querySelector('.tk-slider-tooltip')).toBeFalsy();
  });

  it('starts dragging on thumb pointerdown and shows the value tooltip', async () => {
    const page = await newSpecPage({
      components: [TkSlider],
      html: `<tk-slider></tk-slider>`,
    });

    const addSpy = jest.spyOn(document, 'addEventListener');
    const thumb = page.root.shadowRoot.querySelector('.tk-slider-thumb') as HTMLElement;
    thumb.dispatchEvent(new Event('pointerdown'));
    await page.waitForChanges();

    expect((page.rootInstance as any).draggingThumb).toBe('min');
    expect(addSpy).toHaveBeenCalledWith('pointermove', expect.any(Function));
    expect(addSpy).toHaveBeenCalledWith('pointerup', expect.any(Function));

    const tooltip = page.root.shadowRoot.querySelector('.tk-slider-tooltip');
    expect(tooltip).toBeTruthy();
    expect(tooltip.textContent).toBe('0');
    expect(page.root.shadowRoot.querySelector('.tk-slider-thumb-active')).toBeTruthy();

    (page.rootInstance as any).handlePointerUp();
    addSpy.mockRestore();
  });

  it('shows the max thumb tooltip while dragging it in range mode', async () => {
    const page = await newSpecPage({
      components: [TkSlider],
      html: `<tk-slider></tk-slider>`,
    });

    page.root.range = true;
    page.root.value = [20, 80];
    page.rootInstance.componentWillLoad();
    await page.waitForChanges();

    const thumbs = page.root.shadowRoot.querySelectorAll('.tk-slider-thumb');
    thumbs[1].dispatchEvent(new Event('pointerdown'));
    await page.waitForChanges();

    expect((page.rootInstance as any).draggingThumb).toBe('max');

    const tooltip = page.root.shadowRoot.querySelector('.tk-slider-tooltip');
    expect(tooltip).toBeTruthy();
    expect(tooltip.textContent).toBe('80');

    (page.rootInstance as any).handlePointerUp();
  });

  it('snaps pointer moves to the step and emits tk-change in single mode', async () => {
    const page = await newSpecPage({
      components: [TkSlider],
      html: `<tk-slider step="5"></tk-slider>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('tkChange', spy);

    mockTrack(page.rootInstance);
    (page.rootInstance as any).draggingThumb = 'min';
    (page.rootInstance as any).handlePointerMove({ clientX: 33 });
    await page.waitForChanges();

    expect((page.rootInstance as any).currentMin).toBe(35);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toBe(35);
  });

  it('clamps pointer moves to the min/max bounds', async () => {
    const page = await newSpecPage({
      components: [TkSlider],
      html: `<tk-slider></tk-slider>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('tkChange', spy);

    mockTrack(page.rootInstance);
    (page.rootInstance as any).draggingThumb = 'min';

    (page.rootInstance as any).handlePointerMove({ clientX: 150 });
    expect((page.rootInstance as any).currentMin).toBe(100);

    (page.rootInstance as any).handlePointerMove({ clientX: -50 });
    expect((page.rootInstance as any).currentMin).toBe(0);

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('swaps thumbs when the min thumb is dragged past the max thumb', async () => {
    const page = await newSpecPage({
      components: [TkSlider],
      html: `<tk-slider></tk-slider>`,
    });

    page.root.range = true;
    page.root.value = [20, 80];
    page.rootInstance.componentWillLoad();
    await page.waitForChanges();

    const spy = jest.fn();
    page.root.addEventListener('tkChange', spy);

    mockTrack(page.rootInstance);
    (page.rootInstance as any).draggingThumb = 'min';
    (page.rootInstance as any).handlePointerMove({ clientX: 90 });

    expect((page.rootInstance as any).currentMin).toBe(80);
    expect((page.rootInstance as any).currentMax).toBe(90);
    expect((page.rootInstance as any).draggingThumb).toBe('max');
    expect(spy.mock.calls[0][0].detail).toEqual([80, 90]);
  });

  it('swaps thumbs when the max thumb is dragged below the min thumb', async () => {
    const page = await newSpecPage({
      components: [TkSlider],
      html: `<tk-slider></tk-slider>`,
    });

    page.root.range = true;
    page.root.value = [20, 80];
    page.rootInstance.componentWillLoad();
    await page.waitForChanges();

    const spy = jest.fn();
    page.root.addEventListener('tkChange', spy);

    mockTrack(page.rootInstance);
    (page.rootInstance as any).draggingThumb = 'max';
    (page.rootInstance as any).handlePointerMove({ clientX: 10 });

    expect((page.rootInstance as any).currentMin).toBe(10);
    expect((page.rootInstance as any).currentMax).toBe(20);
    expect((page.rootInstance as any).draggingThumb).toBe('min');
    expect(spy.mock.calls[0][0].detail).toEqual([10, 20]);
  });

  it('keeps the max thumb in range mode without swapping on a normal move', async () => {
    const page = await newSpecPage({
      components: [TkSlider],
      html: `<tk-slider></tk-slider>`,
    });

    page.root.range = true;
    page.root.value = [20, 80];
    page.rootInstance.componentWillLoad();
    await page.waitForChanges();

    mockTrack(page.rootInstance);
    (page.rootInstance as any).draggingThumb = 'max';
    (page.rootInstance as any).handlePointerMove({ clientX: 60 });

    expect((page.rootInstance as any).currentMin).toBe(20);
    expect((page.rootInstance as any).currentMax).toBe(60);
    expect((page.rootInstance as any).draggingThumb).toBe('max');
  });

  it('ignores pointer moves without an active thumb or track', async () => {
    const page = await newSpecPage({
      components: [TkSlider],
      html: `<tk-slider></tk-slider>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('tkChange', spy);

    mockTrack(page.rootInstance);
    (page.rootInstance as any).handlePointerMove({ clientX: 50 });
    expect(spy).not.toHaveBeenCalled();

    (page.rootInstance as any).draggingThumb = 'min';
    (page.rootInstance as any).trackRef = null;
    (page.rootInstance as any).handlePointerMove({ clientX: 50 });
    expect(spy).not.toHaveBeenCalled();
  });

  it('stops dragging and removes document listeners on pointer up', async () => {
    const page = await newSpecPage({
      components: [TkSlider],
      html: `<tk-slider></tk-slider>`,
    });

    (page.rootInstance as any).handlePointerDown('min');
    expect((page.rootInstance as any).draggingThumb).toBe('min');

    const removeSpy = jest.spyOn(document, 'removeEventListener');
    (page.rootInstance as any).handlePointerUp();
    await page.waitForChanges();

    expect((page.rootInstance as any).draggingThumb).toBeNull();
    expect(removeSpy).toHaveBeenCalledWith('pointermove', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('pointerup', expect.any(Function));
    removeSpy.mockRestore();
  });

  it('disables both thumbs in disabled range mode', async () => {
    const page = await newSpecPage({
      components: [TkSlider],
      html: `<tk-slider disabled></tk-slider>`,
    });

    page.root.range = true;
    page.root.value = [20, 80];
    page.rootInstance.componentWillLoad();
    await page.waitForChanges();

    const thumbs = page.root.shadowRoot.querySelectorAll('.tk-slider-thumb');
    expect(thumbs).toHaveLength(2);
    expect(thumbs[0].classList.contains('tk-slider-thumb-disabled')).toBe(true);
    expect(thumbs[1].classList.contains('tk-slider-thumb-disabled')).toBe(true);

    thumbs[1].dispatchEvent(new Event('pointerdown'));
    await page.waitForChanges();
    expect((page.rootInstance as any).draggingThumb).toBeNull();
  });

  it('renders evenly spaced ticks when type is ticks', async () => {
    const page = await newSpecPage({
      components: [TkSlider],
      html: `<tk-slider type="ticks" min="0" max="10" step="2"></tk-slider>`,
    });

    expect(page.root.shadowRoot.querySelectorAll('.tk-slider-tick')).toHaveLength(6);
    expect(page.root.shadowRoot.querySelector('.tk-slider-labels')).toBeFalsy();
  });

  it('hides the labels row when rangeVisibility is false', async () => {
    const page = await newSpecPage({
      components: [TkSlider],
      html: `<tk-slider range-visibility="false"></tk-slider>`,
    });

    expect(page.root.shadowRoot.querySelector('.tk-slider-labels')).toBeFalsy();
  });

  it('renders the label with an asterisk when showAsterisk is set', async () => {
    const page = await newSpecPage({
      components: [TkSlider],
      html: `<tk-slider label="Volume" show-asterisk></tk-slider>`,
    });

    const label = page.root.shadowRoot.querySelector('.tk-slider-label');
    expect(label.textContent).toContain('Volume');
    expect(label.querySelector('.asterisk')).toBeTruthy();
  });

  it('renders hint and error messages', async () => {
    const hintPage = await newSpecPage({
      components: [TkSlider],
      html: `<tk-slider hint="Pick a value"></tk-slider>`,
    });

    const hint = hintPage.root.shadowRoot.querySelector('.tk-hint-wrapper');
    expect(hint).toBeTruthy();
    expect(hint.textContent).toContain('Pick a value');

    const errorPage = await newSpecPage({
      components: [TkSlider],
      html: `<tk-slider invalid error="Out of range" hint="Pick a value"></tk-slider>`,
    });

    const error = errorPage.root.shadowRoot.querySelector('.tk-hint-wrapper');
    expect(error.classList.contains('error')).toBe(true);
    expect(error.textContent).toContain('Out of range');
  });

  it('applies semantic data-testid attributes', async () => {
    const page = await newSpecPage({
      components: [TkSlider],
      html: `<tk-slider data-testid="my-slider" label="Volume"></tk-slider>`,
    });

    expect(page.root.shadowRoot.querySelector('[data-testid="my-slider-container"]')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('[data-testid="my-slider-track"]')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('[data-testid="my-slider-thumb-min"]')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('[data-testid="my-slider-label"]')).toBeTruthy();
  });
});
