import { IGanttColumn, GanttWeekStartDay } from './types';

/** Default row height in pixels. */
export const DEFAULT_ROW_HEIGHT = 40;

/** Default width of the left-side panel in pixels. */
export const DEFAULT_PANEL_WIDTH = 320;

/** Default header row height in pixels (each of the two header layers). */
export const DEFAULT_HEADER_HEIGHT = 36;

/** Default week start day (1 = Monday). */
export const DEFAULT_WEEK_START_DAY: GanttWeekStartDay = 1;

/** Base unit width in pixels per day for each view type. */
export const VIEW_TYPE_DAY_WIDTH: Record<string, number> = {
  weekly: 40,
  monthly: 24,
  quarterly: 6,
  yearly: 2,
};

/** Default columns shown in the left panel. */
export const DEFAULT_COLUMNS: IGanttColumn[] = [
  { field: 'name', header: 'Task Name', width: '200px' },
  { field: 'startDate', header: 'Start', width: '100px' },
  { field: 'endDate', header: 'End', width: '100px' },
];
