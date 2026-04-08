import { Component, ComponentInterface, h, Element, Prop, State, Watch, Event, EventEmitter, Fragment } from '@stencil/core';
import classNames from 'classnames';
import {
  IGanttTask,
  IGanttTaskSegment,
  IGanttIndicator,
  IGanttColumn,
  IGanttHoliday,
  IGanttFlatRow,
  GanttViewType,
  GanttSecondaryHeaderMode,
  GanttWeekStartDay,
  GanttTooltipFunction,
  GanttTaskBarFunction,
} from './types';
import { DEFAULT_COLUMNS, DEFAULT_ROW_HEIGHT, DEFAULT_PANEL_WIDTH, DEFAULT_HEADER_HEIGHT, DEFAULT_WEEK_START_DAY, VIEW_TYPE_DAY_WIDTH } from './defaults';
import {
  autoFitViewType,
  flattenTasks,
  getTaskBarPosition,
  getBarPositionFromDates,
  getIndicatorPosition,
  getTimelineRange,
  generatePrimaryHeaders,
  generateSecondaryHeaders,
  isWeekend,
  isHoliday,
  addDays,
  toDateOnly,
} from './helpers';
import { CSSStyleProperties } from '../../global/types';

/**
 * TkGanttChart is a display-only Gantt chart component with expandable tasks,
 * configurable view types (weekly, monthly, quarterly, yearly), two-layer headers,
 * indicators, weekend/holiday highlighting, and customisable tooltips / task bars.
 * @slot empty - Content to show when there are no tasks
 * @react `import { TkGanttChart } from '@takeoff-ui/react'`
 * @vue `import { TkGanttChart } from '@takeoff-ui/vue'`
 * @angular `import { TkGanttChart } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-gantt-chart',
  styleUrl: 'tk-gantt-chart.scss',
  shadow: true,
})
export class TkGanttChart implements ComponentInterface {
  private timelineRef: HTMLElement;
  private panelRef: HTMLElement;

  @Element() el: HTMLTkGanttChartElement;

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------

  @State() expandedIds: Set<string> = new Set();
  @State() computedViewType: GanttViewType = 'monthly';

  // ---------------------------------------------------------------------------
  // Props
  // ---------------------------------------------------------------------------

  /**
   * Array of tasks to display. Each task may contain nested children for sub-tasks.
   */
  @Prop() tasks: IGanttTask[] = [];
  @Watch('tasks')
  tasksChanged() {
    this.recalculate();
  }

  /**
   * Column definitions for the left-side task list panel.
   * Columns are fed from the task data.
   */
  @Prop() columns: IGanttColumn[] = DEFAULT_COLUMNS;

  /**
   * Timeline view type. When not set the component auto-fits based on the task date range.
   * @defaultValue undefined (auto-fit)
   */
  @Prop() viewType: GanttViewType;
  @Watch('viewType')
  viewTypeChanged() {
    this.recalculate();
  }

  /**
   * Secondary header display mode.
   * - `'days'` shows individual day numbers or day names
   * - `'weeks'` shows week numbers (W1, W2 … / H1, H2 … for Turkish locale)
   * @defaultValue 'days'
   */
  @Prop() secondaryHeaderMode: GanttSecondaryHeaderMode = 'days';

  /**
   * Day the week starts on (0 = Sunday … 6 = Saturday).
   * @defaultValue 1 (Monday)
   */
  @Prop() weekStartDay: GanttWeekStartDay = DEFAULT_WEEK_START_DAY;

  /**
   * Array of indicator lines rendered on the timeline (e.g. today, startDate, freezeDate).
   */
  @Prop() indicators: IGanttIndicator[] = [];

  /**
   * Whether to automatically show a today indicator line.
   * @defaultValue true
   */
  @Prop() showTodayIndicator: boolean = true;

  /**
   * Whether to highlight weekend columns with a different background.
   * @defaultValue true
   */
  @Prop() highlightWeekends: boolean = true;

  /**
   * Array of holiday dates to highlight on the timeline.
   */
  @Prop() holidays: IGanttHoliday[] = [];

  /**
   * Custom tooltip render function. Receives the hovered task and should return
   * an HTMLElement or an HTML string.
   */
  @Prop() tooltipHtml: GanttTooltipFunction;

  /**
   * Custom task bar render function. Receives the task and should return
   * an HTMLElement or an HTML string.
   */
  @Prop() taskBarHtml: GanttTaskBarFunction;

  /**
   * Row height in pixels.
   * @defaultValue 40
   */
  @Prop() rowHeight: number = DEFAULT_ROW_HEIGHT;

  /**
   * Width of the left-side task list panel in pixels.
   * @defaultValue 320
   */
  @Prop() panelWidth: number = DEFAULT_PANEL_WIDTH;

  /**
   * Whether to hide the left-side task list panel.
   * @defaultValue false
   */
  @Prop() hidePanel: boolean = false;

  /**
   * Custom CSS style applied to the root container element.
   */
  @Prop() containerStyle: CSSStyleProperties;

  /**
   * Locale string for date formatting (e.g. 'tr-TR', 'en-US').
   * Uses native `toLocaleString` under the hood.
   * @defaultValue 'default'
   */
  @Prop() locale: string = 'default';

  // ---------------------------------------------------------------------------
  // Events
  // ---------------------------------------------------------------------------

  /**
   * Emitted when a task bar is clicked. Detail contains the clicked task.
   */
  @Event({ eventName: 'tk-task-click' }) tkTaskClick!: EventEmitter<IGanttTask>;

  /**
   * Emitted when a task row is expanded or collapsed.
   */
  @Event({ eventName: 'tk-task-toggle' }) tkTaskToggle!: EventEmitter<{ task: IGanttTask; expanded: boolean }>;

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  componentWillLoad() {
    this.recalculate();
  }

  // ---------------------------------------------------------------------------
  // Private methods
  // ---------------------------------------------------------------------------

  private recalculate() {
    this.computedViewType = this.viewType ?? autoFitViewType(this.tasks);
  }

  // ---------------------------------------------------------------------------
  // Handle event handlers
  // ---------------------------------------------------------------------------

  private handleToggleRow(task: IGanttTask, e: MouseEvent) {
    e.stopPropagation();
    const newSet = new Set(this.expandedIds);
    const isExpanded = newSet.has(task.id);
    if (isExpanded) {
      newSet.delete(task.id);
    } else {
      newSet.add(task.id);
    }
    this.expandedIds = newSet;
    this.tkTaskToggle.emit({ task, expanded: !isExpanded });
  }

  private handleTaskClick(task: IGanttTask) {
    this.tkTaskClick.emit(task);
  }

  private handleTimelineScroll(e: Event) {
    const target = e.target as HTMLElement;
    if (this.panelRef) {
      this.panelRef.scrollTop = target.scrollTop;
    }
  }

  private handlePanelScroll(e: Event) {
    const target = e.target as HTMLElement;
    if (this.timelineRef) {
      this.timelineRef.scrollTop = target.scrollTop;
    }
  }

  // ---------------------------------------------------------------------------
  // Create factory methods
  // ---------------------------------------------------------------------------

  private createTaskBar(task: IGanttTask, barPos: { left: number; width: number }, segment?: IGanttTaskSegment, segmentIndex?: number) {
    const testId = segmentIndex != null ? `task-bar-${task.id}-seg-${segmentIndex}` : `task-bar-${task.id}`;
    const progress = segment?.progress ?? task.progress;
    const barStyle = segment?.style ?? task.style;
    const barLabel = segment?.label ?? task.name;

    const commonStyle: Record<string, string> = {
      left: `${barPos.left}px`,
      width: `${barPos.width}px`,
      height: `${this.rowHeight - 12}px`,
      ...(barStyle as Record<string, string>),
    };

    const tooltipContent = this.createTooltipContent(task);

    if (this.taskBarHtml) {
      const content = this.taskBarHtml(task);
      const barContent =
        typeof content === 'string' ? (
          <div class="custom-task-bar" innerHTML={content}></div>
        ) : (
          <div class="custom-task-bar" ref={(el: HTMLElement) => el && el.replaceChildren(content as HTMLElement)}></div>
        );
      return (
        <tk-tooltip position="top" variant="dark">
          <div slot="trigger" class="tk-gantt-chart-task-bar tk-gantt-chart-task-bar-custom" data-testid={testId} style={commonStyle} onClick={() => this.handleTaskClick(task)}>
            {barContent}
          </div>
          <div slot="content">{tooltipContent}</div>
        </tk-tooltip>
      );
    }

    return (
      <tk-tooltip position="top" variant="dark">
        <div
          slot="trigger"
          class={classNames('tk-gantt-chart-task-bar', { 'tk-gantt-chart-task-bar-segment': segmentIndex != null })}
          data-testid={testId}
          style={commonStyle}
          onClick={() => this.handleTaskClick(task)}
        >
          {progress != null && progress > 0 && (
            <div class="tk-gantt-chart-task-bar-progress" data-testid={`task-progress-${testId}`} style={{ width: `${Math.min(progress, 100)}%` }}></div>
          )}
          <span class="tk-gantt-chart-task-bar-label">{barLabel}</span>
        </div>
        <div slot="content">{tooltipContent}</div>
      </tk-tooltip>
    );
  }

  private createIndicatorLine(indicator: IGanttIndicator, minDate: Date, bodyHeight: number) {
    const left = getIndicatorPosition(indicator.date, minDate, this.computedViewType);
    return (
      <div
        class={classNames('tk-gantt-chart-indicator', {
          'tk-gantt-chart-indicator-dashed': indicator.lineStyle === 'dashed',
        })}
        data-testid={`indicator-${indicator.label || 'custom'}`}
        style={{
          left: `${left}px`,
          height: `${bodyHeight}px`,
          borderLeftColor: indicator.color || 'var(--primary-base)',
          borderLeftStyle: indicator.lineStyle === 'dashed' ? 'dashed' : 'solid',
        }}
      >
        {indicator.label && <span class="tk-gantt-chart-indicator-label">{indicator.label}</span>}
      </div>
    );
  }

  private createTooltipContent(task: IGanttTask) {
    if (this.tooltipHtml) {
      const content = this.tooltipHtml(task);
      if (typeof content === 'string') {
        return <div innerHTML={content}></div>;
      }
      return <div ref={(el: HTMLElement) => el && el.replaceChildren(content as HTMLElement)}></div>;
    }

    const startLabel = toDateOnly(task.startDate).toLocaleDateString(this.locale);
    const endLabel = toDateOnly(task.endDate).toLocaleDateString(this.locale);
    return (
      <Fragment>
        <div class="tk-gantt-chart-tooltip-title">{task.name}</div>
        <div class="tk-gantt-chart-tooltip-row">
          <span class="tk-gantt-chart-tooltip-label">Start:</span> {startLabel}
        </div>
        <div class="tk-gantt-chart-tooltip-row">
          <span class="tk-gantt-chart-tooltip-label">End:</span> {endLabel}
        </div>
        {task.progress != null && (
          <div class="tk-gantt-chart-tooltip-row">
            <span class="tk-gantt-chart-tooltip-label">Progress:</span> {task.progress}%
          </div>
        )}
      </Fragment>
    );
  }

  // ---------------------------------------------------------------------------
  // Render helpers
  // ---------------------------------------------------------------------------

  private renderPanel(flatRows: IGanttFlatRow[]) {
    if (this.hidePanel) return null;

    const headerHeight = DEFAULT_HEADER_HEIGHT * 2; // two header layers

    return (
      <div
        class="tk-gantt-chart-panel"
        data-testid="gantt-panel"
        style={{ width: `${this.panelWidth}px` }}
        ref={(el: HTMLElement) => (this.panelRef = el)}
        onScroll={(e: Event) => this.handlePanelScroll(e)}
      >
        {/* Panel header placeholder aligned with timeline headers */}
        <div class="tk-gantt-chart-panel-header" style={{ height: `${headerHeight}px` }}>
          {this.columns.map(col => (
            <div class="tk-gantt-chart-panel-header-cell" style={{ width: col.width || 'auto', minWidth: col.width || '80px' }}>
              {col.header}
            </div>
          ))}
        </div>

        {/* Panel rows */}
        <div class="tk-gantt-chart-panel-body">
          {flatRows.map(({ task, depth }) => (
            <div class="tk-gantt-chart-panel-row" data-testid={`panel-row-${task.id}`} style={{ height: `${this.rowHeight}px` }}>
              {this.columns.map((col, colIndex) => (
                <div
                  class="tk-gantt-chart-panel-cell"
                  style={{
                    width: col.width || 'auto',
                    minWidth: col.width || '80px',
                    paddingLeft: colIndex === 0 ? `${depth * 20 + 8}px` : '8px',
                  }}
                >
                  {colIndex === 0 && task.children?.length > 0 && (
                    <button
                      class={classNames('tk-gantt-chart-expand-btn', {
                        'tk-gantt-chart-expand-btn-open': this.expandedIds.has(task.id),
                      })}
                      data-testid={`expand-btn-${task.id}`}
                      onClick={(e: MouseEvent) => this.handleToggleRow(task, e)}
                    >
                      <tk-icon icon="chevron_right" size="small"></tk-icon>
                    </button>
                  )}
                  {col.html ? <span innerHTML={col.html(task)}></span> : <span>{(task as unknown as Record<string, unknown>)[col.field] as string}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  private renderTimelineHeader(start: Date, end: Date, totalWidth: number) {
    const vt = this.computedViewType;
    const dayWidth = VIEW_TYPE_DAY_WIDTH[vt];

    const primaryCells = generatePrimaryHeaders(start, end, vt, this.locale, this.weekStartDay);
    const secondaryCells = generateSecondaryHeaders(start, end, vt, this.locale, this.weekStartDay, this.secondaryHeaderMode);

    return (
      <div class="tk-gantt-chart-timeline-headers" style={{ width: `${totalWidth}px` }}>
        {/* Primary (upper) header */}
        <div class="tk-gantt-chart-timeline-header tk-gantt-chart-timeline-header-primary" data-testid="header-primary" style={{ height: `${DEFAULT_HEADER_HEIGHT}px` }}>
          {primaryCells.map(cell => (
            <div class="tk-gantt-chart-timeline-header-cell" style={{ width: `${cell.span * dayWidth}px` }}>
              {cell.label}
            </div>
          ))}
        </div>

        {/* Secondary (lower) header */}
        <div class="tk-gantt-chart-timeline-header tk-gantt-chart-timeline-header-secondary" data-testid="header-secondary" style={{ height: `${DEFAULT_HEADER_HEIGHT}px` }}>
          {secondaryCells.map(cell => {
            const cellStart = cell.startDate;
            const isWeekendCell = cell.span === 1 && isWeekend(cellStart);
            const isHolidayCell = cell.span === 1 && isHoliday(cellStart, this.holidays);
            return (
              <div
                class={classNames('tk-gantt-chart-timeline-header-cell', {
                  'tk-gantt-chart-timeline-header-cell-weekend': isWeekendCell && this.highlightWeekends,
                  'tk-gantt-chart-timeline-header-cell-holiday': isHolidayCell,
                })}
                style={{ width: `${cell.span * dayWidth}px` }}
              >
                {cell.label}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  private renderTimelineBody(flatRows: IGanttFlatRow[], start: Date, totalWidth: number, totalDays: number) {
    const dayWidth = VIEW_TYPE_DAY_WIDTH[this.computedViewType];
    const bodyHeight = flatRows.length * this.rowHeight;

    return (
      <div class="tk-gantt-chart-timeline-body" style={{ width: `${totalWidth}px` }}>
        {/* Weekend & holiday columns */}
        {(this.highlightWeekends || this.holidays.length > 0) &&
          Array.from({ length: totalDays }).map((_, i) => {
            const d = addDays(start, i);
            const weekend = this.highlightWeekends && isWeekend(d);
            const holiday = isHoliday(d, this.holidays);
            if (!weekend && !holiday) return null;
            return (
              <div
                class={classNames('tk-gantt-chart-column-highlight', {
                  'tk-gantt-chart-weekend': weekend,
                  'tk-gantt-chart-holiday': holiday,
                })}
                style={{
                  left: `${i * dayWidth}px`,
                  width: `${dayWidth}px`,
                  height: `${bodyHeight}px`,
                }}
              ></div>
            );
          })}

        {/* Today indicator */}
        {this.showTodayIndicator &&
          this.createIndicatorLine({ date: new Date().toISOString(), label: 'Today', color: 'var(--primary-base)', lineStyle: 'solid' }, start, bodyHeight)}

        {/* Custom indicators */}
        {this.indicators.map(ind => this.createIndicatorLine(ind, start, bodyHeight))}

        {/* Task rows */}
        {flatRows.map(({ task }) => {
          const hasSegments = task.segments && task.segments.length > 0;

          return (
            <div class="tk-gantt-chart-timeline-row" data-testid={`timeline-row-${task.id}`} style={{ height: `${this.rowHeight}px` }}>
              {hasSegments
                ? task.segments.map((seg, idx) => {
                    const segPos = getBarPositionFromDates(seg.startDate, seg.endDate, start, this.computedViewType);
                    return this.createTaskBar(task, segPos, seg, idx);
                  })
                : this.createTaskBar(task, getTaskBarPosition(task, start, this.computedViewType))}
            </div>
          );
        })}
      </div>
    );
  }

  private renderEmptyState() {
    return (
      <div class="tk-gantt-chart-empty" data-testid="gantt-empty">
        <slot name="empty">
          <span>No tasks to display</span>
        </slot>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // render
  // ---------------------------------------------------------------------------

  render() {
    if (!this.tasks.length) {
      return (
        <div class="tk-gantt-chart" style={this.containerStyle}>
          {this.renderEmptyState()}
        </div>
      );
    }

    const flatRows = flattenTasks(this.tasks, this.expandedIds);
    const { start, end, totalDays } = getTimelineRange(this.tasks, this.computedViewType, this.weekStartDay);
    const dayWidth = VIEW_TYPE_DAY_WIDTH[this.computedViewType];
    const totalWidth = totalDays * dayWidth;

    return (
      <div class="tk-gantt-chart" style={this.containerStyle}>
        {this.renderPanel(flatRows)}

        <div class="tk-gantt-chart-timeline" data-testid="gantt-timeline" ref={(el: HTMLElement) => (this.timelineRef = el)} onScroll={(e: Event) => this.handleTimelineScroll(e)}>
          {this.renderTimelineHeader(start, end, totalWidth)}
          {this.renderTimelineBody(flatRows, start, totalWidth, totalDays)}
        </div>
      </div>
    );
  }
}
