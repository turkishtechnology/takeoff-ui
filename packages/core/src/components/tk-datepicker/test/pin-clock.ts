// The datepicker reads the wall clock (`new Date()`) for its default time and month, so tests that
// assert on those values must pin the clock or they pass only at certain times of day. Jest's fake
// timers stall `newSpecPage`, so the clock is pinned by shadowing `Date` instead: a no-argument
// `new Date()` and `Date.now()` return the pinned instant, every other constructor call is forwarded.
const RealDate = Date;

export const pinClock = (localIso: string): void => {
  const fixed = new RealDate(localIso).getTime();

  class PinnedDate extends RealDate {
    constructor(...args: unknown[]) {
      // The cast lets the spread type-check against Date's overloads; at runtime every argument is forwarded.
      super(...((args.length ? args : [fixed]) as []));
    }

    static now(): number {
      return fixed;
    }
  }

  global.Date = PinnedDate as DateConstructor;
};

export const restoreClock = (): void => {
  global.Date = RealDate;
};
