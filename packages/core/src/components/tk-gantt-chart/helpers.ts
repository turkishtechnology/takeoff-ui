import { IGanttTask, IGanttFlatRow, IGanttHeaderCell, GanttViewType, GanttSecondaryHeaderMode, GanttWeekStartDay } from './types';
import { VIEW_TYPE_DAY_WIDTH } from './defaults';

// ---------------------------------------------------------------------------
// Date helpers
// ---------------------------------------------------------------------------

/** Strip time portion and return a pure-date Date at midnight UTC. */
export function toDateOnly(input: string | Date): Date {
  const d = typeof input === 'string' ? new Date(input) : new Date(input.getTime());
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Number of calendar days between two dates (inclusive of start, exclusive of end). */
export function daysBetween(a: Date, b: Date): number {
  const msPerDay = 86_400_000;
  return Math.max(Math.round((b.getTime() - a.getTime()) / msPerDay), 0);
}

/** Add N days to a date (immutable). */
export function addDays(date: Date, days: number): Date {
  const d = new Date(date.getTime());
  d.setDate(d.getDate() + days);
  return d;
}

/** Is the given date a Saturday (6) or Sunday (0)? */
export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

/** Get the ISO week number for a given date. */
export function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
}

/** Get the start of the week containing `date` based on the configured start day. */
export function getWeekStart(date: Date, weekStartDay: GanttWeekStartDay): Date {
  const d = new Date(date.getTime());
  d.setHours(0, 0, 0, 0);
  const diff = (d.getDay() - weekStartDay + 7) % 7;
  d.setDate(d.getDate() - diff);
  return d;
}

/** Get the quarter (1-4) for a date. */
export function getQuarter(date: Date): number {
  return Math.floor(date.getMonth() / 3) + 1;
}

// ---------------------------------------------------------------------------
// Date range helpers
// ---------------------------------------------------------------------------

/** Compute the overall min/max date range across all tasks (recursively). */
export function getDateRange(tasks: IGanttTask[]): { min: Date; max: Date } {
  let min = Infinity;
  let max = -Infinity;

  const walk = (items: IGanttTask[]) => {
    for (const task of items) {
      const start = toDateOnly(task.startDate).getTime();
      const end = toDateOnly(task.endDate).getTime();
      if (start < min) min = start;
      if (end > max) max = end;

      // Also consider segment date ranges
      if (task.segments?.length) {
        for (const seg of task.segments) {
          const segStart = toDateOnly(seg.startDate).getTime();
          const segEnd = toDateOnly(seg.endDate).getTime();
          if (segStart < min) min = segStart;
          if (segEnd > max) max = segEnd;
        }
      }

      if (task.children?.length) walk(task.children);
    }
  };

  walk(tasks);
  return { min: new Date(min), max: addDays(new Date(max), 1) };
}

// ---------------------------------------------------------------------------
// Auto-fit view type
// ---------------------------------------------------------------------------

/** Determine the best view type based on the task date range span. */
export function autoFitViewType(tasks: IGanttTask[]): GanttViewType {
  if (!tasks.length) return 'monthly';
  const { min, max } = getDateRange(tasks);
  const totalDays = daysBetween(min, max);

  if (totalDays <= 14) return 'weekly';
  if (totalDays <= 90) return 'monthly';
  if (totalDays <= 365) return 'quarterly';
  return 'yearly';
}

// ---------------------------------------------------------------------------
// Flatten tree
// ---------------------------------------------------------------------------

/** Flatten the task tree into rows, respecting expanded state. */
export function flattenTasks(tasks: IGanttTask[], expandedIds: Set<string>, depth: number = 0): IGanttFlatRow[] {
  const rows: IGanttFlatRow[] = [];
  for (const task of tasks) {
    rows.push({ task, depth });
    if (task.children?.length && expandedIds.has(task.id)) {
      rows.push(...flattenTasks(task.children, expandedIds, depth + 1));
    }
  }
  return rows;
}

// ---------------------------------------------------------------------------
// Task bar positioning
// ---------------------------------------------------------------------------

/** Returns left offset (px) and width (px) for a task bar relative to minDate. */
export function getTaskBarPosition(task: IGanttTask, minDate: Date, viewType: GanttViewType): { left: number; width: number } {
  const dayWidth = VIEW_TYPE_DAY_WIDTH[viewType];
  const start = toDateOnly(task.startDate);
  const end = toDateOnly(task.endDate);
  const left = daysBetween(minDate, start) * dayWidth;
  const width = Math.max((daysBetween(start, end) + 1) * dayWidth, dayWidth);
  return { left, width };
}

/** Returns the pixel left offset and width for a date range relative to the timeline start. */
export function getBarPositionFromDates(startDate: string, endDate: string, minDate: Date, viewType: GanttViewType): { left: number; width: number } {
  const dayWidth = VIEW_TYPE_DAY_WIDTH[viewType];
  const start = toDateOnly(startDate);
  const end = toDateOnly(endDate);
  const left = daysBetween(minDate, start) * dayWidth;
  const width = Math.max((daysBetween(start, end) + 1) * dayWidth, dayWidth);
  return { left, width };
}

/** Returns the pixel left offset for an indicator date. */
export function getIndicatorPosition(dateStr: string, minDate: Date, viewType: GanttViewType): number {
  const dayWidth = VIEW_TYPE_DAY_WIDTH[viewType];
  const d = toDateOnly(dateStr);
  return daysBetween(minDate, d) * dayWidth;
}

// ---------------------------------------------------------------------------
// Timeline range with padding
// ---------------------------------------------------------------------------

/** Compute padded timeline start/end based on view type. */
export function getTimelineRange(tasks: IGanttTask[], viewType: GanttViewType, weekStartDay: GanttWeekStartDay): { start: Date; end: Date; totalDays: number } {
  if (!tasks.length) {
    const today = toDateOnly(new Date());
    return { start: today, end: addDays(today, 30), totalDays: 30 };
  }

  const { min, max } = getDateRange(tasks);

  let start: Date;
  let end: Date;

  switch (viewType) {
    case 'weekly': {
      start = getWeekStart(min, weekStartDay);
      end = addDays(getWeekStart(max, weekStartDay), 7);
      break;
    }
    case 'monthly': {
      start = new Date(min.getFullYear(), min.getMonth(), 1);
      end = new Date(max.getFullYear(), max.getMonth() + 1, 1);
      break;
    }
    case 'quarterly': {
      const qStart = Math.floor(min.getMonth() / 3) * 3;
      start = new Date(min.getFullYear(), qStart, 1);
      const qEnd = Math.floor(max.getMonth() / 3) * 3 + 3;
      end = new Date(max.getFullYear(), qEnd, 1);
      break;
    }
    case 'yearly': {
      start = new Date(min.getFullYear(), 0, 1);
      end = new Date(max.getFullYear() + 1, 0, 1);
      break;
    }
    default: {
      start = min;
      end = max;
    }
  }

  const totalDays = daysBetween(start, end);
  return { start, end, totalDays };
}

// ---------------------------------------------------------------------------
// Header generation
// ---------------------------------------------------------------------------

/** Generate primary (upper) header cells. */
export function generatePrimaryHeaders(start: Date, end: Date, viewType: GanttViewType, locale: string): IGanttHeaderCell[] {
  const cells: IGanttHeaderCell[] = [];

  switch (viewType) {
    case 'weekly': {
      let cursor = new Date(start.getTime());
      while (cursor < end) {
        const weekEnd = addDays(cursor, 6);
        const label = formatWeekRange(cursor, weekEnd, locale);
        cells.push({ label, span: 7, startDate: new Date(cursor.getTime()) });
        cursor = addDays(cursor, 7);
      }
      break;
    }
    case 'monthly': {
      let cursor = new Date(start.getTime());
      while (cursor < end) {
        const year = cursor.getFullYear();
        const month = cursor.getMonth();
        const monthEnd = new Date(year, month + 1, 1);
        const effectiveEnd = monthEnd < end ? monthEnd : end;
        const span = daysBetween(cursor, effectiveEnd);
        const label = cursor.toLocaleString(locale, { month: 'long', year: 'numeric' });
        cells.push({ label, span, startDate: new Date(cursor.getTime()) });
        cursor = monthEnd;
      }
      break;
    }
    case 'quarterly': {
      let cursor = new Date(start.getTime());
      while (cursor < end) {
        const q = getQuarter(cursor);
        const year = cursor.getFullYear();
        const qEnd = new Date(year, q * 3, 1);
        const effectiveEnd = qEnd < end ? qEnd : end;
        const span = daysBetween(cursor, effectiveEnd);
        const label = `Q${q} ${year}`;
        cells.push({ label, span, startDate: new Date(cursor.getTime()) });
        cursor = qEnd;
      }
      break;
    }
    case 'yearly': {
      let cursor = new Date(start.getTime());
      while (cursor < end) {
        const year = cursor.getFullYear();
        const yearEnd = new Date(year + 1, 0, 1);
        const effectiveEnd = yearEnd < end ? yearEnd : end;
        const span = daysBetween(cursor, effectiveEnd);
        const label = `${year}`;
        cells.push({ label, span, startDate: new Date(cursor.getTime()) });
        cursor = yearEnd;
      }
      break;
    }
  }

  return cells;
}

/** Generate secondary (lower) header cells. */
export function generateSecondaryHeaders(
  start: Date,
  end: Date,
  viewType: GanttViewType,
  locale: string,
  weekStartDay: GanttWeekStartDay,
  secondaryMode: GanttSecondaryHeaderMode = 'days',
): IGanttHeaderCell[] {
  const cells: IGanttHeaderCell[] = [];

  if (secondaryMode === 'weeks') {
    return generateWeekHeaders(start, end, locale, weekStartDay);
  }

  switch (viewType) {
    case 'weekly': {
      // Days of the week
      let cursor = new Date(start.getTime());
      while (cursor < end) {
        const label = cursor.toLocaleString(locale, { weekday: 'short' });
        cells.push({ label, span: 1, startDate: new Date(cursor.getTime()) });
        cursor = addDays(cursor, 1);
      }
      break;
    }
    case 'monthly': {
      // Day numbers
      let cursor = new Date(start.getTime());
      while (cursor < end) {
        const label = `${cursor.getDate()}`;
        cells.push({ label, span: 1, startDate: new Date(cursor.getTime()) });
        cursor = addDays(cursor, 1);
      }
      break;
    }
    case 'quarterly': {
      // Months
      let cursor = new Date(start.getTime());
      while (cursor < end) {
        const year = cursor.getFullYear();
        const month = cursor.getMonth();
        const monthEnd = new Date(year, month + 1, 1);
        const effectiveEnd = monthEnd < end ? monthEnd : end;
        const span = daysBetween(cursor, effectiveEnd);
        const label = cursor.toLocaleString(locale, { month: 'short' });
        cells.push({ label, span, startDate: new Date(cursor.getTime()) });
        cursor = monthEnd;
      }
      break;
    }
    case 'yearly': {
      // Months
      let cursor = new Date(start.getTime());
      while (cursor < end) {
        const year = cursor.getFullYear();
        const month = cursor.getMonth();
        const monthEnd = new Date(year, month + 1, 1);
        const effectiveEnd = monthEnd < end ? monthEnd : end;
        const span = daysBetween(cursor, effectiveEnd);
        const label = cursor.toLocaleString(locale, { month: 'short' });
        cells.push({ label, span, startDate: new Date(cursor.getTime()) });
        cursor = monthEnd;
      }
      break;
    }
  }

  return cells;
}

/** Generate week number header cells (W1, W2, etc.). */
function generateWeekHeaders(start: Date, end: Date, locale: string, weekStartDay: GanttWeekStartDay): IGanttHeaderCell[] {
  const cells: IGanttHeaderCell[] = [];
  let cursor = getWeekStart(start, weekStartDay);

  // If week start is before range start, adjust the first cell span
  if (cursor < start) {
    cursor = new Date(start.getTime());
  }

  while (cursor < end) {
    const weekNum = getWeekNumber(cursor);
    const weekPrefix = getWeekPrefix(locale);
    const nextWeekStart = addDays(getWeekStart(cursor, weekStartDay), 7);
    const effectiveEnd = nextWeekStart < end ? nextWeekStart : end;
    const span = daysBetween(cursor, effectiveEnd);
    if (span > 0) {
      cells.push({ label: `${weekPrefix}${weekNum}`, span, startDate: new Date(cursor.getTime()) });
    }
    cursor = nextWeekStart;
  }

  return cells;
}

/** Get the locale-aware week prefix (W for English, H for Turkish, etc.). */
function getWeekPrefix(locale: string): string {
  const lower = locale.toLowerCase();
  if (lower.startsWith('tr')) return 'H';
  return 'W';
}

/** Format a week range label such as "Jan 13–19". */
function formatWeekRange(start: Date, end: Date, locale: string): string {
  const startStr = start.toLocaleString(locale, { month: 'short', day: 'numeric' });
  const endDay = end.getDate();
  return `${startStr}–${endDay}`;
}

// ---------------------------------------------------------------------------
// Holiday helpers
// ---------------------------------------------------------------------------

/** Check whether a date is in the holidays list. */
export function isHoliday(date: Date, holidays: { date: string; label?: string }[]): boolean {
  const ts = toDateOnly(date).getTime();
  return holidays.some(h => toDateOnly(h.date).getTime() === ts);
}

/** Find the holiday entry for a specific date, if any. */
export function findHoliday(date: Date, holidays: { date: string; label?: string }[]): { date: string; label?: string } | undefined {
  const ts = toDateOnly(date).getTime();
  return holidays.find(h => toDateOnly(h.date).getTime() === ts);
}
