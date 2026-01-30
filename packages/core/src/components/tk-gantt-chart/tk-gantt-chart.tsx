import { Component, ComponentInterface, Element, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import { CSSStyleProperties } from '../../global/types';
import { IGanttTask, IGanttTaskClickDetail } from './interfaces';

// export { IGanttTask, IGanttTaskClickDetail };

/**
 * TkGanttChart is a visual component for displaying tasks on a timeline.
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
  @Element() el: HTMLElement;

  /**
   * The list of tasks to display in the Gantt chart.
   */
  @Prop() tasks: IGanttTask[] = [];

  /**
   * The view type of the Gantt chart.
   * @defaultValue 'week'
   */
  @Prop({ mutable: true }) viewType: 'day' | 'week' | 'month' = 'week';

  /**
   * The start date of the visible range. If not provided, calculated from tasks.
   */
  @Prop() startDate?: Date | string;

  /**
   * The end date of the visible range. If not provided, calculated from tasks.
   */
  @Prop() endDate?: Date | string;

  /**
   * The height of each task row in pixels.
   * @defaultValue 40
   */
  @Prop() rowHeight: number = 40;

  /**
   * The style attribute of container element
   */
  @Prop() containerStyle?: CSSStyleProperties = null;

  /**
   * Emitted when a task is clicked.
   */
  @Event({ eventName: 'tk-task-click' }) tkTaskClick!: EventEmitter<IGanttTaskClickDetail>;

  @State() computedStartDate: Date;
  @State() computedEndDate: Date;

  @Watch('tasks')
  @Watch('startDate')
  @Watch('endDate')
  computeDates() {
    this.calculateDateRange();
  }

  componentWillLoad() {
    this.calculateDateRange();
  }

  private calculateDateRange() {
    if (this.startDate && this.endDate) {
      this.computedStartDate = new Date(this.startDate);
      this.computedEndDate = new Date(this.endDate);
      return;
    }

    if (!this.tasks || this.tasks.length === 0) {
      const now = new Date();
      this.computedStartDate = new Date(now.getFullYear(), now.getMonth(), 1);
      this.computedEndDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return;
    }

    let minDate = new Date(this.tasks[0].startDate);
    let maxDate = new Date(this.tasks[0].endDate);

    this.tasks.forEach(task => {
      const taskStart = new Date(task.startDate);
      const taskEnd = new Date(task.endDate);
      if (taskStart < minDate) minDate = taskStart;
      if (taskEnd > maxDate) maxDate = taskEnd;
    });

    // Add padding based on view type
    const padding = this.viewType === 'day' ? 1 : this.viewType === 'week' ? 7 : 15;
    this.computedStartDate = new Date(minDate);
    this.computedStartDate.setDate(this.computedStartDate.getDate() - padding);
    this.computedEndDate = new Date(maxDate);
    this.computedEndDate.setDate(this.computedEndDate.getDate() + padding);
  }

  private getTimelineUnits(): Date[] {
    const units: Date[] = [];
    const current = new Date(this.computedStartDate);

    while (current <= this.computedEndDate) {
      units.push(new Date(current));
      if (this.viewType === 'day') {
        current.setDate(current.getDate() + 1);
      } else if (this.viewType === 'week') {
        current.setDate(current.getDate() + 7);
      } else {
        current.setMonth(current.getMonth() + 1);
      }
    }

    return units;
  }

  private formatHeaderDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions =
      this.viewType === 'day' ? { day: 'numeric', month: 'short' } : this.viewType === 'week' ? { day: 'numeric', month: 'short' } : { month: 'short', year: 'numeric' };

    return date.toLocaleDateString('tr-TR', options);
  }

  private getTaskPosition(task: IGanttTask): { left: string; width: string } {
    const totalDays = this.getDaysDiff(this.computedStartDate, this.computedEndDate);
    const taskStart = new Date(task.startDate);
    const taskEnd = new Date(task.endDate);

    const startOffset = this.getDaysDiff(this.computedStartDate, taskStart);
    const taskDuration = this.getDaysDiff(taskStart, taskEnd) + 1;

    const left = (startOffset / totalDays) * 100;
    const width = (taskDuration / totalDays) * 100;

    return {
      left: `${Math.max(0, left)}%`,
      width: `${Math.min(100 - left, width)}%`,
    };
  }

  private getDaysDiff(date1: Date, date2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round((date2.getTime() - date1.getTime()) / oneDay);
  }

  private handleTaskClick(task: IGanttTask, event: MouseEvent) {
    this.tkTaskClick.emit({ task, event });
  }

  private getTaskColor(task: IGanttTask): string {
    return task.color || 'var(--primary-base)';
  }

  private formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  private handleViewChange(viewType: 'day' | 'week' | 'month') {
    this.viewType = viewType;
    this.calculateDateRange();
  }

  render() {
    const timelineUnits = this.getTimelineUnits();

    return (
      <div class="tk-gantt-chart" style={this.containerStyle}>
        {/* View Type Buttons */}
        <div class="tk-gantt-header">
          <div class="tk-gantt-view-buttons">
            <tk-button label="Gün" size="small" type={this.viewType === 'day' ? 'filled' : 'outlined'} variant="neutral" onTk-click={() => this.handleViewChange('day')} />
            <tk-button label="Hafta" size="small" type={this.viewType === 'week' ? 'filled' : 'outlined'} variant="neutral" onTk-click={() => this.handleViewChange('week')} />
            <tk-button label="Ay" size="small" type={this.viewType === 'month' ? 'filled' : 'outlined'} variant="neutral" onTk-click={() => this.handleViewChange('month')} />
          </div>
        </div>

        {/* Main Content */}
        <div class="tk-gantt-content">
          {/* Task Names Column */}
          <div class="tk-gantt-sidebar">
            <div class="tk-gantt-sidebar-header">Görevler</div>
            {this.tasks.map(task => (
              <div class="tk-gantt-sidebar-row" style={{ height: `${this.rowHeight}px` }} key={task.id}>
                <span class="tk-gantt-task-name">{task.name}</span>
              </div>
            ))}
          </div>

          {/* Timeline Area */}
          <div class="tk-gantt-timeline">
            {/* Timeline Header */}
            <div class="tk-gantt-timeline-header">
              {timelineUnits.map((unit, index) => (
                <div class="tk-gantt-timeline-unit" key={index}>
                  {this.formatHeaderDate(unit)}
                </div>
              ))}
            </div>

            {/* Task Rows */}
            <div class="tk-gantt-timeline-body">
              {/* Grid Lines */}
              <div class="tk-gantt-grid">
                {timelineUnits.map((_, index) => (
                  <div class="tk-gantt-grid-line" key={index}></div>
                ))}
              </div>

              {/* Tasks */}
              {this.tasks.map(task => {
                const position = this.getTaskPosition(task);
                return (
                  <div class="tk-gantt-task-row" style={{ height: `${this.rowHeight}px` }} key={task.id}>
                    <tk-tooltip
                      header={task.name}
                      description={task.tooltipContent || `${this.formatDate(task.startDate)} - ${this.formatDate(task.endDate)}`}
                      position="top"
                      variant="dark"
                    >
                      <div
                        slot="trigger"
                        class="tk-gantt-task-bar"
                        style={{
                          left: position.left,
                          width: position.width,
                          backgroundColor: this.getTaskColor(task),
                        }}
                        onClick={(e: MouseEvent) => this.handleTaskClick(task, e)}
                      >
                        {task.progress !== undefined && (
                          <div
                            class="tk-gantt-task-progress"
                            style={{
                              width: `${task.progress}%`,
                            }}
                          ></div>
                        )}
                        <span class="tk-gantt-task-label">{task.name}</span>
                      </div>
                    </tk-tooltip>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
