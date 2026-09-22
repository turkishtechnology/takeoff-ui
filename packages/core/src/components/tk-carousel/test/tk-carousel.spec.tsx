import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { TkCarousel } from '../tk-carousel';
import { TkButton } from '../../tk-button/tk-button';
import { TkIcon } from '../../tk-icon/tk-icon';

type CarouselInstance = {
  activeIndex: number;
  autoplayTimer?: number;
  startAutoplay: () => void;
  stopAutoplay: () => void;
};

type IntervalWindow = { __setInterval: (callback: () => void, ms: number) => number };

const slides = (count: number) =>
  Array.from({ length: count })
    .map((_, index) => `<div>Slide ${index + 1}</div>`)
    .join('');

const createCarousel = async (attrs = '', count = 3): Promise<SpecPage> =>
  newSpecPage({
    components: [TkCarousel, TkButton, TkIcon],
    html: `<tk-carousel ${attrs}>${slides(count)}</tk-carousel>`,
  });

const instanceOf = (page: SpecPage) => page.rootInstance as CarouselInstance;
const shadow = (page: SpecPage) => page.root.shadowRoot;
const rootElement = (page: SpecPage) => shadow(page).querySelector('.tk-carousel');
const navigationHolder = (page: SpecPage) => shadow(page).querySelector('.tk-carousel-navigation-holder');
const prevButton = (page: SpecPage) => shadow(page).querySelector('tk-button.prev-button') as HTMLTkButtonElement | null;
const nextButton = (page: SpecPage) => shadow(page).querySelector('tk-button.next-button') as HTMLTkButtonElement | null;
const playerButton = (page: SpecPage) => shadow(page).querySelector('tk-icon.player-button') as HTMLTkIconElement | null;
const indicators = (page: SpecPage) => Array.from(shadow(page).querySelectorAll('.tk-carousel-indicator')) as HTMLElement[];
const dots = (page: SpecPage) => Array.from(shadow(page).querySelectorAll('.tk-carousel-indicator-dot')) as HTMLElement[];
const activeDotIndex = (page: SpecPage) => dots(page).findIndex(dot => dot.classList.contains('active'));
const itemsContainer = (page: SpecPage) => shadow(page).querySelector('.tk-carousel-items-container') as HTMLElement;

const stubOverlayWidth = (page: SpecPage, width: number) => {
  const overlay = shadow(page).querySelector('.tk-carousel-overlay') as HTMLElement;
  overlay.getBoundingClientRect = () => ({ width }) as DOMRect;
};

const clickButton = async (page: SpecPage, button: HTMLElement | null) => {
  button.dispatchEvent(new CustomEvent('tk-click'));
  await page.waitForChanges();
};

const clickIndicator = async (page: SpecPage, index: number) => {
  indicators(page)[index].click();
  await page.waitForChanges();
};

const pressKey = async (page: SpecPage, key: string) => {
  const event = new KeyboardEvent('keydown', { key, cancelable: true });
  page.root.dispatchEvent(event);
  await page.waitForChanges();
  return event;
};

const listenForChange = (page: SpecPage) => {
  const spy = jest.fn();
  page.root.addEventListener('tk-change', spy);
  return {
    details: () => spy.mock.calls.map(call => (call[0] as CustomEvent<number>).detail),
    calls: () => spy.mock.calls.length,
  };
};

/**
 * The mock window creates real Node intervals that the spec cannot advance, so the autoplay
 * tests swap the window's interval factory for a manual clock and restart the autoplay
 * that componentDidLoad already scheduled against the real clock.
 */
const useManualAutoplayClock = (page: SpecPage) => {
  const callbacks = new Map<number, () => void>();
  let nextId = 1;
  const realClearInterval = global.clearInterval;

  (page.win as unknown as IntervalWindow).__setInterval = callback => {
    callbacks.set(nextId, callback);
    return nextId++;
  };
  const clearSpy = jest.spyOn(global, 'clearInterval').mockImplementation((id: unknown) => {
    if (typeof id === 'number') callbacks.delete(id);
    else realClearInterval(id as NodeJS.Timeout);
  });

  instanceOf(page).stopAutoplay();
  instanceOf(page).startAutoplay();

  return {
    tick: async (times = 1) => {
      for (let i = 0; i < times; i++) {
        Array.from(callbacks.values()).forEach(callback => callback());
        await page.waitForChanges();
      }
    },
    runningIntervals: () => callbacks.size,
    restore: () => clearSpy.mockRestore(),
  };
};

describe('tk-carousel', () => {
  describe('rendering', () => {
    it('renders an indicator for each visible slide position', async () => {
      const page = await createCarousel();

      expect(dots(page)).toHaveLength(3);
      expect(activeDotIndex(page)).toBe(0);
    });

    it('makes the host focusable so it can receive arrow keys', async () => {
      const page = await createCarousel();

      expect(page.root.getAttribute('tabindex')).toBe('0');
    });

    it('exposes itemsPerView through the --items-per-view css variable', async () => {
      const page = await createCarousel('items-per-view="2"', 5);

      expect(page.root.style.getPropertyValue('--items-per-view')).toBe('2');
    });

    it('renders both arrows and the indicators by default', async () => {
      const page = await createCarousel();

      expect(prevButton(page)).not.toBeNull();
      expect(nextButton(page)).not.toBeNull();
      expect(rootElement(page).classList.contains('show-arrows')).toBe(true);
      expect(rootElement(page).classList.contains('show-indicators')).toBe(true);
    });

    it('hides the arrows when showArrows is false', async () => {
      const page = await createCarousel('show-arrows="false"');

      expect(prevButton(page)).toBeNull();
      expect(nextButton(page)).toBeNull();
      expect(rootElement(page).classList.contains('show-arrows')).toBe(false);
      expect(dots(page)).toHaveLength(3);
    });

    it('hides the indicators when showIndicators is false', async () => {
      const page = await createCarousel('show-indicators="false"');

      expect(dots(page)).toHaveLength(0);
      expect(rootElement(page).classList.contains('show-indicators')).toBe(false);
      expect(nextButton(page)).not.toBeNull();
    });

    it('hides arrows and indicators when every item already fits in the view', async () => {
      const page = await createCarousel('items-per-view="3"', 3);

      expect(prevButton(page)).toBeNull();
      expect(nextButton(page)).toBeNull();
      expect(dots(page)).toHaveLength(0);
    });

    it('renders one indicator per starting position when several items are visible at once', async () => {
      const page = await createCarousel('items-per-view="2"', 5);

      expect(dots(page)).toHaveLength(4);
    });

    it('uses chevron icons for a horizontal carousel', async () => {
      const page = await createCarousel();

      expect(prevButton(page).icon).toBe('chevron_left');
      expect(nextButton(page).icon).toBe('chevron_right');
    });

    it('uses up and down arrow icons for a vertical carousel', async () => {
      const page = await createCarousel('orientation="vertical"');

      expect(prevButton(page).icon).toBe('keyboard_arrow_up');
      expect(nextButton(page).icon).toBe('keyboard_arrow_down');
    });

    it('applies the navigation placement and position as root classes', async () => {
      const page = await createCarousel('navigation-placement="outside" navigation-position="bottom"');

      const classes = rootElement(page).classList;
      expect(classes.contains('outside')).toBe(true);
      expect(classes.contains('bottom')).toBe(true);
      expect(classes.contains('vertical')).toBe(false);
      expect(navigationHolder(page).classList.contains('tk-carousel-navigation')).toBe(true);
      expect(navigationHolder(page).classList.contains('vertical-navigation')).toBe(false);
    });

    it('falls back to the distributed position when a vertical-only position is used horizontally', async () => {
      const page = await createCarousel('navigation-position="left"');

      expect(rootElement(page).classList.contains('distributed')).toBe(true);
      expect(rootElement(page).classList.contains('left')).toBe(false);
      expect(navigationHolder(page).classList.contains('tk-carousel-navigation')).toBe(false);
    });

    it('falls back to the right position when a horizontal-only position is used vertically', async () => {
      const page = await createCarousel('orientation="vertical" navigation-position="top"');

      const classes = rootElement(page).classList;
      expect(classes.contains('vertical')).toBe(true);
      expect(classes.contains('right')).toBe(true);
      expect(classes.contains('top')).toBe(false);
      expect(navigationHolder(page).classList.contains('vertical-navigation')).toBe(true);
    });

    it('keeps a valid vertical position as is', async () => {
      const page = await createCarousel('orientation="vertical" navigation-position="left"');

      expect(rootElement(page).classList.contains('left')).toBe(true);
      expect(navigationHolder(page).classList.contains('vertical-navigation')).toBe(true);
    });

    it('propagates dataTestid to the container, navigation and item elements', async () => {
      const page = await createCarousel('data-testid="gallery" autoplay show-player-button');
      const byTestId = (id: string) => shadow(page).querySelector(`[data-testid="${id}"]`);

      expect(byTestId('gallery-container')).not.toBeNull();
      expect(byTestId('gallery-overlay')).not.toBeNull();
      expect(byTestId('gallery-items')).not.toBeNull();
      expect(byTestId('gallery-navigation')).not.toBeNull();
      expect(byTestId('gallery-indicators')).not.toBeNull();
      expect(byTestId('gallery-indicator-1')).not.toBeNull();
      expect(byTestId('gallery-indicator-1-dot')).not.toBeNull();
      expect(prevButton(page).dataTestid).toBe('gallery-prev-button');
      expect(nextButton(page).dataTestid).toBe('gallery-next-button');
      expect(playerButton(page).dataTestid).toBe('gallery-player-icon');
    });

    it('does not add data-testid attributes when the prop is not set', async () => {
      const page = await createCarousel();

      expect(shadow(page).querySelector('[data-testid]')).toBeNull();
    });
  });

  describe('arrow navigation', () => {
    it('moves to the next item and emits tk-change with the new index', async () => {
      const page = await createCarousel();
      const change = listenForChange(page);

      await clickButton(page, nextButton(page));

      expect(activeDotIndex(page)).toBe(1);
      expect(change.details()).toContain(1);
      expect(change.details().every(detail => detail === 1)).toBe(true);
    });

    it('moves back to the previous item', async () => {
      const page = await createCarousel();
      await clickIndicator(page, 2);
      const change = listenForChange(page);

      await clickButton(page, prevButton(page));

      expect(activeDotIndex(page)).toBe(1);
      expect(change.details().every(detail => detail === 1)).toBe(true);
    });

    it('wraps from the last item to the first when circular', async () => {
      const page = await createCarousel();
      await clickIndicator(page, 2);

      await clickButton(page, nextButton(page));

      expect(activeDotIndex(page)).toBe(0);
    });

    it('wraps from the first item to the last when circular', async () => {
      const page = await createCarousel();

      await clickButton(page, prevButton(page));

      expect(activeDotIndex(page)).toBe(2);
    });

    it('hides the previous arrow on the first item when not circular', async () => {
      const page = await createCarousel('circular="false"');

      expect(prevButton(page)).toBeNull();
      expect(nextButton(page)).not.toBeNull();
    });

    it('hides the next arrow on the last item when not circular', async () => {
      const page = await createCarousel('circular="false"');

      await clickButton(page, nextButton(page));
      expect(prevButton(page)).not.toBeNull();
      expect(nextButton(page)).not.toBeNull();

      await clickButton(page, nextButton(page));
      expect(activeDotIndex(page)).toBe(2);
      expect(nextButton(page)).toBeNull();
      expect(prevButton(page)).not.toBeNull();
    });

    it('clamps to the ends instead of wrapping when not circular', async () => {
      const page = await createCarousel('circular="false"');

      await pressKey(page, 'ArrowLeft');
      expect(activeDotIndex(page)).toBe(0);

      await clickIndicator(page, 2);
      await pressKey(page, 'ArrowRight');
      expect(activeDotIndex(page)).toBe(2);
    });

    it('treats the last starting position as the end when several items are visible', async () => {
      const page = await createCarousel('items-per-view="2" circular="false"', 5);

      await clickIndicator(page, 3);
      expect(nextButton(page)).toBeNull();

      await pressKey(page, 'ArrowRight');
      expect(activeDotIndex(page)).toBe(3);
    });

    it('wraps to the last starting position when several items are visible and circular', async () => {
      const page = await createCarousel('items-per-view="2"', 5);

      await clickButton(page, prevButton(page));

      expect(activeDotIndex(page)).toBe(3);
    });
  });

  describe('indicators', () => {
    it('jumps to the clicked indicator and emits tk-change once', async () => {
      const page = await createCarousel();
      const change = listenForChange(page);

      await clickIndicator(page, 2);

      expect(activeDotIndex(page)).toBe(2);
      expect(change.calls()).toBe(1);
      expect(change.details()).toEqual([2]);
    });

    it('marks only the active indicator dot', async () => {
      const page = await createCarousel();

      await clickIndicator(page, 1);

      expect(dots(page).map(dot => dot.classList.contains('active'))).toEqual([false, true, false]);
    });
  });

  describe('item positioning', () => {
    it('translates horizontally by the item width plus gap', async () => {
      const page = await createCarousel();
      stubOverlayWidth(page, 1000);

      await clickIndicator(page, 1);
      expect(itemsContainer(page).style.transform).toBe('translateX(-1016px)');

      await clickIndicator(page, 2);
      expect(itemsContainer(page).style.transform).toBe('translateX(-2032px)');
    });

    it('divides the available width between the visible items', async () => {
      const page = await createCarousel('items-per-view="2"', 5);
      stubOverlayWidth(page, 1000);

      await clickIndicator(page, 1);

      // (1000 - 16) / 2 = 492 per item, plus the 16px gap
      expect(itemsContainer(page).style.transform).toBe('translateX(-508px)');
    });

    it('sets the host height and translates vertically when vertical', async () => {
      const page = await createCarousel('orientation="vertical" vertical-view-height="400px"');

      expect(page.root.style.height).toBe('400px');
      expect(itemsContainer(page).style.transform).toBe('translateY(-0px)');

      await clickIndicator(page, 1);
      expect(itemsContainer(page).style.transform).toBe('translateY(-416px)');
    });

    it('uses the default vertical view height when none is given', async () => {
      const page = await createCarousel('orientation="vertical"');

      expect(page.root.style.height).toBe('300px');

      await clickIndicator(page, 1);
      expect(itemsContainer(page).style.transform).toBe('translateY(-316px)');
    });
  });

  describe('keyboard navigation', () => {
    it('moves with the left and right arrows when horizontal and prevents the default', async () => {
      const page = await createCarousel();

      const right = await pressKey(page, 'ArrowRight');
      expect(right.defaultPrevented).toBe(true);
      expect(activeDotIndex(page)).toBe(1);

      const left = await pressKey(page, 'ArrowLeft');
      expect(left.defaultPrevented).toBe(true);
      expect(activeDotIndex(page)).toBe(0);
    });

    it('ignores the up and down arrows when horizontal', async () => {
      const page = await createCarousel();

      const down = await pressKey(page, 'ArrowDown');
      const up = await pressKey(page, 'ArrowUp');

      expect(down.defaultPrevented).toBe(false);
      expect(up.defaultPrevented).toBe(false);
      expect(activeDotIndex(page)).toBe(0);
    });

    it('moves with the up and down arrows when vertical', async () => {
      const page = await createCarousel('orientation="vertical"');

      const down = await pressKey(page, 'ArrowDown');
      expect(down.defaultPrevented).toBe(true);
      expect(activeDotIndex(page)).toBe(1);

      const up = await pressKey(page, 'ArrowUp');
      expect(up.defaultPrevented).toBe(true);
      expect(activeDotIndex(page)).toBe(0);
    });

    it('ignores the left and right arrows when vertical', async () => {
      const page = await createCarousel('orientation="vertical"');

      const right = await pressKey(page, 'ArrowRight');

      expect(right.defaultPrevented).toBe(false);
      expect(activeDotIndex(page)).toBe(0);
    });

    it('ignores unrelated keys', async () => {
      const page = await createCarousel();
      const change = listenForChange(page);

      const enter = await pressKey(page, 'Enter');

      expect(enter.defaultPrevented).toBe(false);
      expect(change.calls()).toBe(0);
    });

    it('stops listening to the keyboard once removed from the document', async () => {
      const page = await createCarousel();
      const change = listenForChange(page);

      page.root.remove();
      await page.waitForChanges();
      await pressKey(page, 'ArrowRight');

      expect(change.calls()).toBe(0);
      expect(instanceOf(page).activeIndex).toBe(0);
    });
  });

  describe('autoplay', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('does not schedule a timer when autoplay is off', async () => {
      const page = await createCarousel();

      expect(instanceOf(page).autoplayTimer).toBeUndefined();
    });

    it('does not schedule a timer when every item already fits in the view', async () => {
      const page = await createCarousel('autoplay items-per-view="3"', 3);

      expect(instanceOf(page).autoplayTimer).toBeUndefined();
    });

    it('schedules a timer when autoplay is on', async () => {
      const page = await createCarousel('autoplay');

      expect(instanceOf(page).autoplayTimer).toBeDefined();
    });

    it('advances one item per interval and emits tk-change', async () => {
      const page = await createCarousel('autoplay');
      const clock = useManualAutoplayClock(page);
      const change = listenForChange(page);

      await clock.tick();
      expect(activeDotIndex(page)).toBe(1);

      await clock.tick();
      expect(activeDotIndex(page)).toBe(2);
      expect(change.details()).toEqual([1, 2]);
      clock.restore();
    });

    it('returns to the first item after the last when circular', async () => {
      const page = await createCarousel('autoplay');
      const clock = useManualAutoplayClock(page);

      await clock.tick(3);

      expect(activeDotIndex(page)).toBe(0);
      expect(clock.runningIntervals()).toBe(1);
      clock.restore();
    });

    it('stops on the last item when not circular', async () => {
      const page = await createCarousel('autoplay circular="false"');
      const clock = useManualAutoplayClock(page);
      const change = listenForChange(page);

      await clock.tick(4);

      expect(activeDotIndex(page)).toBe(2);
      expect(change.details()).toEqual([1, 2]);
      expect(clock.runningIntervals()).toBe(0);
      expect(instanceOf(page).autoplayTimer).toBeUndefined();
      clock.restore();
    });

    it('stops at the last starting position when several items are visible', async () => {
      const page = await createCarousel('autoplay circular="false" items-per-view="2"', 4);
      const clock = useManualAutoplayClock(page);

      await clock.tick(5);

      expect(activeDotIndex(page)).toBe(2);
      expect(clock.runningIntervals()).toBe(0);
      clock.restore();
    });

    it('clears the timer when removed from the document', async () => {
      const page = await createCarousel('autoplay');
      const clock = useManualAutoplayClock(page);

      page.root.remove();
      await page.waitForChanges();

      expect(clock.runningIntervals()).toBe(0);
      expect(instanceOf(page).autoplayTimer).toBeUndefined();
      clock.restore();
    });
  });

  describe('player button', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('is not rendered unless showPlayerButton is set', async () => {
      const page = await createCarousel('autoplay');

      expect(playerButton(page)).toBeNull();
    });

    it('is not rendered when autoplay is off', async () => {
      const page = await createCarousel('show-player-button');

      expect(playerButton(page)).toBeNull();
    });

    it('shows the pause icon while autoplay is running', async () => {
      const page = await createCarousel('autoplay show-player-button');

      expect(playerButton(page).icon).toBe('pause_circle');
    });

    it('pauses the autoplay on click and shows the play icon', async () => {
      const page = await createCarousel('autoplay show-player-button');
      const clock = useManualAutoplayClock(page);

      playerButton(page).click();
      await page.waitForChanges();

      expect(playerButton(page).icon).toBe('play_circle');
      expect(clock.runningIntervals()).toBe(0);

      await clock.tick();
      expect(activeDotIndex(page)).toBe(0);
      clock.restore();
    });

    it('resumes the autoplay on a second click', async () => {
      const page = await createCarousel('autoplay show-player-button');
      const clock = useManualAutoplayClock(page);

      playerButton(page).click();
      await page.waitForChanges();
      playerButton(page).click();
      await page.waitForChanges();

      expect(playerButton(page).icon).toBe('pause_circle');
      expect(clock.runningIntervals()).toBe(1);

      await clock.tick();
      expect(activeDotIndex(page)).toBe(1);
      clock.restore();
    });
  });

  describe('slotted items', () => {
    it('picks up items added later once the slot changes', async () => {
      const page = await createCarousel();

      const extra = page.doc.createElement('div');
      extra.textContent = 'Slide 4';
      page.root.appendChild(extra);
      shadow(page).querySelector('slot').dispatchEvent(new Event('slotchange'));
      await page.waitForChanges();

      expect(dots(page)).toHaveLength(4);
    });

    it('ignores children assigned to a named slot', async () => {
      const page = await newSpecPage({
        components: [TkCarousel, TkButton, TkIcon],
        html: `<tk-carousel><div>Slide 1</div><div>Slide 2</div><div slot="caption">Caption</div></tk-carousel>`,
      });

      expect(dots(page)).toHaveLength(2);
    });

    it('does nothing when navigating an empty carousel', async () => {
      const page = await createCarousel('', 0);
      const change = listenForChange(page);

      await pressKey(page, 'ArrowRight');

      expect(dots(page)).toHaveLength(0);
      expect(instanceOf(page).activeIndex).toBe(0);
      expect(change.details().every(detail => detail === 0)).toBe(true);
    });
  });
});
