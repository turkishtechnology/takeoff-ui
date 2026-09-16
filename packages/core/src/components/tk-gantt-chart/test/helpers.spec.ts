import {
  toDateOnly,
  daysBetween,
  addDays,
  isWeekend,
  getWeekNumber,
  getWeekStart,
  getQuarter,
  getDateRange,
  autoFitViewType,
  flattenTasks,
  getTaskBarPosition,
  getBarPositionFromDates,
  getIndicatorPosition,
  getTimelineRange,
  generatePrimaryHeaders,
  generateSecondaryHeaders,
  isHoliday,
  findHoliday,
} from '../helpers';
import { IGanttTask } from '../types';

// Local-time constructors throughout: `toDateOnly` normalises to local midnight, so a bare
// '2024-01-15' (parsed as UTC) would land on a different day west of Greenwich.
const d = (year: number, month: number, day: number) => new Date(year, month - 1, day);
const iso = (year: number, month: number, day: number) => `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00`;

const task = (id: string, start: string, end: string, extra: Partial<IGanttTask> = {}): IGanttTask => ({ id, name: id, startDate: start, endDate: end, ...extra }) as IGanttTask;

describe('gantt helpers', () => {
  describe('toDateOnly', () => {
    it('strips the time portion of a string date', () => {
      const result = toDateOnly('2024-01-15T13:45:30');
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(15);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });

    it('strips the time portion of a Date without mutating the input', () => {
      const input = new Date(2024, 0, 15, 13, 45, 30);
      const result = toDateOnly(input);

      expect(result.getHours()).toBe(0);
      expect(input.getHours()).toBe(13);
      expect(result).not.toBe(input);
    });
  });

  describe('daysBetween', () => {
    it('counts whole days forward', () => {
      expect(daysBetween(d(2024, 1, 1), d(2024, 1, 11))).toBe(10);
    });

    it('returns 0 for the same day', () => {
      expect(daysBetween(d(2024, 1, 1), d(2024, 1, 1))).toBe(0);
    });

    it('clamps a backwards range to 0 rather than going negative', () => {
      expect(daysBetween(d(2024, 1, 11), d(2024, 1, 1))).toBe(0);
    });

    it('counts across a leap day', () => {
      expect(daysBetween(d(2024, 2, 28), d(2024, 3, 1))).toBe(2);
    });
  });

  describe('addDays', () => {
    it('adds days across a month boundary', () => {
      expect(addDays(d(2024, 1, 31), 1)).toEqual(d(2024, 2, 1));
    });

    it('subtracts days for a negative offset', () => {
      expect(addDays(d(2024, 1, 1), -1)).toEqual(d(2023, 12, 31));
    });

    it('does not mutate the input', () => {
      const input = d(2024, 1, 1);
      addDays(input, 10);
      expect(input).toEqual(d(2024, 1, 1));
    });
  });

  describe('isWeekend', () => {
    it('recognises Saturday and Sunday', () => {
      expect(isWeekend(d(2024, 1, 6))).toBe(true);
      expect(isWeekend(d(2024, 1, 7))).toBe(true);
    });

    it('rejects weekdays', () => {
      expect(isWeekend(d(2024, 1, 8))).toBe(false);
      expect(isWeekend(d(2024, 1, 5))).toBe(false);
    });
  });

  describe('getWeekNumber', () => {
    it('returns ISO week 1 for the first week of the year', () => {
      expect(getWeekNumber(d(2024, 1, 1))).toBe(1);
      expect(getWeekNumber(d(2024, 1, 4))).toBe(1);
    });

    it('rolls a late-December date into week 1 of the next year', () => {
      expect(getWeekNumber(d(2024, 12, 31))).toBe(1);
    });

    it('rolls an early-January date back into the previous year’s last week', () => {
      expect(getWeekNumber(d(2023, 1, 1))).toBe(52);
    });
  });

  describe('getWeekStart', () => {
    it('walks back to Monday when the week starts on Monday', () => {
      expect(getWeekStart(d(2024, 1, 17), 1)).toEqual(d(2024, 1, 15));
    });

    it('walks back to Sunday when the week starts on Sunday', () => {
      expect(getWeekStart(d(2024, 1, 17), 0)).toEqual(d(2024, 1, 14));
    });

    it('returns the same day when it is already the week start', () => {
      expect(getWeekStart(d(2024, 1, 15), 1)).toEqual(d(2024, 1, 15));
    });

    it('clears the time portion', () => {
      expect(getWeekStart(new Date(2024, 0, 17, 22, 30), 1).getHours()).toBe(0);
    });
  });

  describe('getQuarter', () => {
    it.each([
      [1, 1],
      [3, 1],
      [4, 2],
      [6, 2],
      [7, 3],
      [10, 4],
      [12, 4],
    ])('maps month %i to quarter %i', (month, quarter) => {
      expect(getQuarter(d(2024, month, 15))).toBe(quarter);
    });
  });

  describe('getDateRange', () => {
    it('spans the min and max across flat tasks, with one day of tail padding', () => {
      const range = getDateRange([task('a', iso(2024, 1, 10), iso(2024, 1, 20)), task('b', iso(2024, 1, 5), iso(2024, 1, 15))]);

      expect(range.min).toEqual(d(2024, 1, 5));
      expect(range.max).toEqual(d(2024, 1, 21));
    });

    it('descends into children', () => {
      const range = getDateRange([
        task('parent', iso(2024, 1, 10), iso(2024, 1, 12), {
          children: [task('child', iso(2024, 1, 1), iso(2024, 2, 1))],
        }),
      ]);

      expect(range.min).toEqual(d(2024, 1, 1));
      expect(range.max).toEqual(d(2024, 2, 2));
    });

    it('takes segment dates into account', () => {
      const range = getDateRange([
        task('a', iso(2024, 1, 10), iso(2024, 1, 12), {
          segments: [
            { startDate: iso(2024, 1, 2), endDate: iso(2024, 1, 3) },
            { startDate: iso(2024, 3, 1), endDate: iso(2024, 3, 5) },
          ],
        } as Partial<IGanttTask>),
      ]);

      expect(range.min).toEqual(d(2024, 1, 2));
      expect(range.max).toEqual(d(2024, 3, 6));
    });
  });

  describe('autoFitViewType', () => {
    it('falls back to monthly for an empty task list', () => {
      expect(autoFitViewType([])).toBe('monthly');
    });

    it.each([
      ['weekly', iso(2024, 1, 1), iso(2024, 1, 10)],
      ['monthly', iso(2024, 1, 1), iso(2024, 2, 20)],
      ['quarterly', iso(2024, 1, 1), iso(2024, 6, 30)],
      ['yearly', iso(2024, 1, 1), iso(2026, 1, 1)],
    ])('picks %s for the matching span', (expected, start, end) => {
      expect(autoFitViewType([task('a', start, end)])).toBe(expected);
    });

    it('switches from weekly to monthly at the 14-day boundary', () => {
      expect(autoFitViewType([task('a', iso(2024, 1, 1), iso(2024, 1, 14))])).toBe('weekly');
      expect(autoFitViewType([task('a', iso(2024, 1, 1), iso(2024, 1, 15))])).toBe('monthly');
    });
  });

  describe('flattenTasks', () => {
    const tree = [
      task('root', iso(2024, 1, 1), iso(2024, 1, 5), {
        children: [
          task('child', iso(2024, 1, 1), iso(2024, 1, 2), {
            children: [task('grandchild', iso(2024, 1, 1), iso(2024, 1, 2))],
          }),
        ],
      }),
      task('sibling', iso(2024, 1, 1), iso(2024, 1, 2)),
    ];

    it('hides children of collapsed rows', () => {
      const rows = flattenTasks(tree, new Set<string>());
      expect(rows.map(r => r.task.id)).toEqual(['root', 'sibling']);
      expect(rows.every(r => r.depth === 0)).toBe(true);
    });

    it('reveals one level per expanded id and tracks depth', () => {
      const rows = flattenTasks(tree, new Set(['root']));
      expect(rows.map(r => r.task.id)).toEqual(['root', 'child', 'sibling']);
      expect(rows.map(r => r.depth)).toEqual([0, 1, 0]);
    });

    it('recurses through nested expanded ids', () => {
      const rows = flattenTasks(tree, new Set(['root', 'child']));
      expect(rows.map(r => r.task.id)).toEqual(['root', 'child', 'grandchild', 'sibling']);
      expect(rows.map(r => r.depth)).toEqual([0, 1, 2, 0]);
    });

    it('returns an empty list for no tasks', () => {
      expect(flattenTasks([], new Set<string>())).toEqual([]);
    });
  });

  describe('getTaskBarPosition', () => {
    it('offsets and sizes a bar by the view type day width', () => {
      const position = getTaskBarPosition(task('a', iso(2024, 1, 3), iso(2024, 1, 5)), d(2024, 1, 1), 'monthly');
      expect(position).toEqual({ left: 2 * 24, width: 3 * 24 });
    });

    it('gives a single-day task one day of width', () => {
      const position = getTaskBarPosition(task('a', iso(2024, 1, 1), iso(2024, 1, 1)), d(2024, 1, 1), 'monthly');
      expect(position).toEqual({ left: 0, width: 24 });
    });

    it('never renders narrower than one day, even for an inverted range', () => {
      const position = getTaskBarPosition(task('a', iso(2024, 1, 5), iso(2024, 1, 1)), d(2024, 1, 1), 'weekly');
      expect(position.width).toBe(40);
    });

    it.each([
      ['weekly', 40],
      ['monthly', 24],
      ['quarterly', 6],
      ['yearly', 2],
    ])('uses the %s day width', (viewType, dayWidth) => {
      const position = getTaskBarPosition(task('a', iso(2024, 1, 2), iso(2024, 1, 2)), d(2024, 1, 1), viewType as never);
      expect(position).toEqual({ left: dayWidth, width: dayWidth });
    });
  });

  describe('getBarPositionFromDates', () => {
    it('matches getTaskBarPosition for the same range', () => {
      const fromDates = getBarPositionFromDates(iso(2024, 1, 3), iso(2024, 1, 5), d(2024, 1, 1), 'monthly');
      const fromTask = getTaskBarPosition(task('a', iso(2024, 1, 3), iso(2024, 1, 5)), d(2024, 1, 1), 'monthly');
      expect(fromDates).toEqual(fromTask);
    });

    it('clamps width to one day', () => {
      expect(getBarPositionFromDates(iso(2024, 1, 5), iso(2024, 1, 1), d(2024, 1, 1), 'monthly').width).toBe(24);
    });
  });

  describe('getIndicatorPosition', () => {
    it('offsets by whole days from the timeline start', () => {
      expect(getIndicatorPosition(iso(2024, 1, 5), d(2024, 1, 1), 'monthly')).toBe(4 * 24);
    });

    it('sits at 0 on the timeline start', () => {
      expect(getIndicatorPosition(iso(2024, 1, 1), d(2024, 1, 1), 'monthly')).toBe(0);
    });

    it('clamps a date before the timeline start to 0', () => {
      expect(getIndicatorPosition(iso(2023, 12, 1), d(2024, 1, 1), 'monthly')).toBe(0);
    });
  });

  describe('getTimelineRange', () => {
    const tasks = [task('a', iso(2024, 1, 10), iso(2024, 1, 20))];

    it('defaults to a 30-day window starting today when there are no tasks', () => {
      const range = getTimelineRange([], 'monthly', 1);
      expect(range.totalDays).toBe(30);
      expect(range.start).toEqual(toDateOnly(new Date()));
      expect(range.end).toEqual(addDays(toDateOnly(new Date()), 30));
    });

    it('snaps weekly to whole weeks', () => {
      const range = getTimelineRange(tasks, 'weekly', 1);
      expect(range.start).toEqual(d(2024, 1, 8));
      expect(range.end).toEqual(d(2024, 1, 22));
      expect(range.totalDays).toBe(14);
    });

    it('snaps monthly to month boundaries', () => {
      const range = getTimelineRange(tasks, 'monthly', 1);
      expect(range.start).toEqual(d(2024, 1, 1));
      expect(range.end).toEqual(d(2024, 2, 1));
      expect(range.totalDays).toBe(31);
    });

    it('snaps quarterly to quarter boundaries', () => {
      const range = getTimelineRange(tasks, 'quarterly', 1);
      expect(range.start).toEqual(d(2024, 1, 1));
      expect(range.end).toEqual(d(2024, 4, 1));
      expect(range.totalDays).toBe(91);
    });

    it('snaps yearly to year boundaries', () => {
      const range = getTimelineRange(tasks, 'yearly', 1);
      expect(range.start).toEqual(d(2024, 1, 1));
      expect(range.end).toEqual(d(2025, 1, 1));
      expect(range.totalDays).toBe(366);
    });

    it('honours a Sunday week start', () => {
      const range = getTimelineRange(tasks, 'weekly', 0);
      expect(range.start).toEqual(d(2024, 1, 7));
      expect(range.start.getDay()).toBe(0);
    });

    it('leaves the range unsnapped for an unknown view type', () => {
      const range = getTimelineRange(tasks, 'unknown' as never, 1);
      expect(range.start).toEqual(d(2024, 1, 10));
      expect(range.end).toEqual(d(2024, 1, 21));
    });
  });

  describe('generatePrimaryHeaders', () => {
    it('emits one 7-day cell per week', () => {
      const cells = generatePrimaryHeaders(d(2024, 1, 8), d(2024, 1, 22), 'weekly', 'en-US', 1);
      expect(cells).toHaveLength(2);
      expect(cells.map(c => c.span)).toEqual([7, 7]);
      expect(cells[0].startDate).toEqual(d(2024, 1, 8));
    });

    it('emits one cell per month, spanning that month’s days', () => {
      const cells = generatePrimaryHeaders(d(2024, 1, 1), d(2024, 3, 1), 'monthly', 'en-US', 1);
      expect(cells).toHaveLength(2);
      expect(cells.map(c => c.span)).toEqual([31, 29]);
      expect(cells[0].label).toMatch(/2024/);
    });

    it('emits quarter labels', () => {
      const cells = generatePrimaryHeaders(d(2024, 1, 1), d(2024, 7, 1), 'quarterly', 'en-US', 1);
      expect(cells.map(c => c.label)).toEqual(['Q1 2024', 'Q2 2024']);
      expect(cells.map(c => c.span)).toEqual([91, 91]);
    });

    it('emits year labels', () => {
      const cells = generatePrimaryHeaders(d(2024, 1, 1), d(2026, 1, 1), 'yearly', 'en-US', 1);
      expect(cells.map(c => c.label)).toEqual(['2024', '2025']);
      expect(cells.map(c => c.span)).toEqual([366, 365]);
    });

    it('truncates the trailing cell at the range end', () => {
      const cells = generatePrimaryHeaders(d(2024, 1, 1), d(2024, 2, 10), 'monthly', 'en-US', 1);
      expect(cells.map(c => c.span)).toEqual([31, 9]);
    });

    it('returns nothing for an empty range', () => {
      expect(generatePrimaryHeaders(d(2024, 1, 1), d(2024, 1, 1), 'monthly', 'en-US', 1)).toEqual([]);
    });
  });

  describe('generateSecondaryHeaders', () => {
    it('emits one weekday cell per day in the weekly view', () => {
      const cells = generateSecondaryHeaders(d(2024, 1, 8), d(2024, 1, 15), 'weekly', 'en-US', 1);
      expect(cells).toHaveLength(7);
      expect(cells.every(c => c.span === 1)).toBe(true);
    });

    it('emits day numbers in the monthly view', () => {
      const cells = generateSecondaryHeaders(d(2024, 1, 1), d(2024, 2, 1), 'monthly', 'en-US', 1);
      expect(cells).toHaveLength(31);
      expect(cells[0].label).toBe('1');
      expect(cells[30].label).toBe('31');
    });

    it('emits one cell per month in the quarterly and yearly views', () => {
      const quarterly = generateSecondaryHeaders(d(2024, 1, 1), d(2024, 4, 1), 'quarterly', 'en-US', 1);
      expect(quarterly.map(c => c.span)).toEqual([31, 29, 31]);

      const yearly = generateSecondaryHeaders(d(2024, 1, 1), d(2025, 1, 1), 'yearly', 'en-US', 1);
      expect(yearly).toHaveLength(12);
    });

    it('emits week-number cells when the secondary mode is weeks', () => {
      const cells = generateSecondaryHeaders(d(2024, 1, 1), d(2024, 1, 22), 'monthly', 'en-US', 1, 'weeks');
      expect(cells.map(c => c.label)).toEqual(['W1', 'W2', 'W3']);
      expect(cells.map(c => c.span)).toEqual([7, 7, 7]);
    });

    it('uses the Turkish week prefix for a tr locale', () => {
      const cells = generateSecondaryHeaders(d(2024, 1, 1), d(2024, 1, 15), 'monthly', 'tr-TR', 1, 'weeks');
      expect(cells.map(c => c.label)).toEqual(['H1', 'H2']);
    });

    it('shortens the first week cell when the range starts mid-week', () => {
      const cells = generateSecondaryHeaders(d(2024, 1, 3), d(2024, 1, 15), 'monthly', 'en-US', 1, 'weeks');
      expect(cells[0].span).toBe(5);
      expect(cells[0].startDate).toEqual(d(2024, 1, 3));
    });

    it('returns nothing for an empty range', () => {
      expect(generateSecondaryHeaders(d(2024, 1, 1), d(2024, 1, 1), 'monthly', 'en-US', 1)).toEqual([]);
    });
  });

  describe('holiday helpers', () => {
    const holidays = [{ date: iso(2024, 1, 1), label: 'New Year' }, { date: iso(2024, 4, 23), label: 'National Sovereignty Day' }, { date: iso(2024, 5, 1) }];

    it('matches a holiday regardless of the time of day', () => {
      expect(isHoliday(new Date(2024, 0, 1, 18, 30), holidays)).toBe(true);
    });

    it('rejects a non-holiday', () => {
      expect(isHoliday(d(2024, 1, 2), holidays)).toBe(false);
    });

    it('rejects everything when the holiday list is empty', () => {
      expect(isHoliday(d(2024, 1, 1), [])).toBe(false);
    });

    it('returns the matching holiday entry', () => {
      expect(findHoliday(d(2024, 4, 23), holidays)).toEqual(holidays[1]);
    });

    it('returns an entry that carries no label', () => {
      expect(findHoliday(d(2024, 5, 1), holidays)).toEqual(holidays[2]);
    });

    it('returns undefined when there is no match', () => {
      expect(findHoliday(d(2024, 1, 2), holidays)).toBeUndefined();
    });
  });
});
