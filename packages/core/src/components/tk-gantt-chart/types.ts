import { CSSStyleProperties } from '../../global/types';

/**
 * Represents a single segment (sub-bar) within a task row.
 * When a task has multiple time ranges displayed on the same row,
 * each range is defined as a segment.
 */
export interface IGanttTaskSegment {
  /** Start date of this segment (ISO string or Date-parseable string) */
  startDate: string;
  /** End date of this segment (ISO string or Date-parseable string) */
  endDate: string;
  /** Progress percentage for this segment (0–100) */
  progress?: number;
  /** Custom inline styles for this segment bar */
  style?: CSSStyleProperties;
  /** Optional label displayed inside the segment bar */
  label?: string;
}

/**
 * Represents a single task in the Gantt chart.
 */
export interface IGanttTask {
  /** Unique identifier for the task */
  id: string;
  /** Display name of the task */
  name: string;
  /** Start date of the task (ISO string or Date-parseable string) */
  startDate: string;
  /** End date of the task (ISO string or Date-parseable string) */
  endDate: string;
  /** Progress percentage (0–100) */
  progress?: number;
  /** Nested child tasks */
  children?: IGanttTask[];
  /** Custom inline styles for the task bar */
  style?: CSSStyleProperties;
  /** Arbitrary additional data attached to the task */
  additionalData?: unknown;
  /**
   * Multiple time segments rendered on the same row.
   * When provided, the task's own startDate/endDate are used only for
   * positioning reference; actual bars are drawn per segment.
   */
  segments?: IGanttTaskSegment[];
}

/**
 * View type for the Gantt chart timeline.
 */
export type GanttViewType = 'weekly' | 'monthly' | 'quarterly' | 'yearly';

/**
 * Secondary header display mode for monthly and other view types.
 */
export type GanttSecondaryHeaderMode = 'days' | 'weeks';

/**
 * Day of the week (0 = Sunday … 6 = Saturday).
 */
export type GanttWeekStartDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * An indicator line drawn on the timeline (e.g. today, freeze-date).
 */
export interface IGanttIndicator {
  /** Date of the indicator (ISO string or Date-parseable string) */
  date: string;
  /** Label shown above the indicator line */
  label?: string;
  /** CSS colour for the indicator line */
  color?: string;
  /** Line style */
  lineStyle?: 'solid' | 'dashed';
}

/**
 * Holiday entry used to highlight non-working days.
 */
export interface IGanttHoliday {
  /** Date of the holiday (ISO string or Date-parseable string) */
  date: string;
  /** Optional display label */
  label?: string;
}

/**
 * Column definition for the left-side task-list panel.
 */
export interface IGanttColumn {
  /** Property key on IGanttTask (or nested path) to read data from */
  field: string;
  /** Column header label */
  header: string;
  /** Fixed width (CSS value, e.g. '120px') */
  width?: string;
  /** Custom HTML render function – receives the task, returns HTML string */
  html?: (task: IGanttTask) => string;
}

/**
 * Custom tooltip render function signature.
 * Receives the hovered task and returns an HTMLElement or an HTML string.
 */
export type GanttTooltipFunction = (task: IGanttTask) => HTMLElement | string;

/**
 * Custom task-bar render function signature.
 * Receives the task and returns an HTMLElement or an HTML string.
 */
export type GanttTaskBarFunction = (task: IGanttTask) => HTMLElement | string;

/**
 * Internal header cell representation used for rendering.
 */
export interface IGanttHeaderCell {
  /** Display label */
  label: string;
  /** How many base-unit columns the cell spans */
  span: number;
  /** Start date of this header segment */
  startDate: Date;
}

/**
 * Flat row representation used after expanding the tree.
 */
export interface IGanttFlatRow {
  task: IGanttTask;
  depth: number;
}
