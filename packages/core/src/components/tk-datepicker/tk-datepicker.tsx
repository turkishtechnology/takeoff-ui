import { Component, Prop, h, State, Event, EventEmitter, Element, Watch, Fragment, AttachInternals, Method } from '@stencil/core';
import { computePosition, flip, shift, offset } from '@floating-ui/dom';
import { format, parse, isValid } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import { IInputMaskOptions } from '../tk-input/interfaces';

export interface IDateSelection {
  start: string;
  end?: string;
}
/**
 * The `TkDatepicker` component is a versatile and customizable date picker that supports `single` date and date `range` selection. It offers various display modes, localization, and customizable date formatting.
 * @slot footer - Custom footer template.
 * @slot footer-actions - Custom actions template to default footer.
 * @react `import { TkDatepicker } from '@takeoff-ui/react'`
 * @vue `import { TkDatepicker } from '@takeoff-ui/vue'`
 * @angular `import { TkDatepicker } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-datepicker',
  styleUrl: 'tk-datepicker.scss',
  shadow: true,
  formAssociated: true,
})
export class TkDatePicker {
  @Element() el: HTMLTkDatepickerElement;

  @State() hasFooterSlot: boolean;
  @State() hasFooterActionsSlot: boolean;
  @State() currentMonth: Date = new Date();
  @State() internalSelectedDates: {
    start: Date | null;
    end: Date | null;
  } = { start: null, end: null };
  @State() inputValue: string = '';
  @State() hoverDate: Date | null = null;
  @State() currentView: 'days' | 'months' | 'years' = 'days';
  @State() maskOptions: IInputMaskOptions = {
    date: true,
    delimiter: '-',
    datePattern: ['Y', 'm', 'd'],
  };
  @State() isInvalid: boolean = false;
  @State() isOpen: boolean = false;
  @Watch('isOpen')
  isOpenChanged(newValue: boolean) {
    if (!this.inline) {
      if (newValue) {
        if (this.internalSelectedDates.start) {
          this.currentMonth = new Date(this.internalSelectedDates.start.getFullYear(), this.internalSelectedDates.start.getMonth());
        }
        this.bindWindowClickListener();
      } else {
        this.currentView = 'days';
        this.unbindWindowClickListener();
      }
    }
  }

  @AttachInternals() internals: ElementInternals;

  private today = new Date();
  private debounceTimer: number;
  private resizeObserver: ResizeObserver;
  private inputRef?: HTMLTkInputElement;
  private panelRef?: HTMLDivElement;
  private uniqueId: string;
  private windowClickHandler: (event: MouseEvent) => void;
  constructor() {
    this.uniqueId = uuidv4();

    this.windowClickHandler = this.handleWindowClick.bind(this);
  }
  /**
   * The value representing the selected date(s)
   */
  @Prop() value: string | IDateSelection;
  @Watch('value')
  valueChanged(newValue: string | IDateSelection, oldValue: string | IDateSelection): void {
    if (JSON.stringify(newValue) === JSON.stringify(oldValue)) {
      return;
    }

    this.processDateValue(newValue, true);
  }
  /**
   * Defines the label for the input
   */
  @Prop() label: string;

  /**
   * Whether the datepicker is disabled
   * @defaultValue false
   */
  @Prop() disabled = false;

  /**
   * Whether the datepicker is in an invalid state
   */
  @Prop() invalid: boolean = false;

  /**
   * Error message to display
   */
  @Prop() error: string;

  /**
   * Hint text to display
   */
  @Prop() hint: string;

  /**
   * Minimum selectable date
   */
  @Prop() minDate: string = '';
  /**
   * Maximum selectable date
   */
  @Prop() maxDate: string = '';

  /**
   * The name of the control.
   */
  @Prop() name: string;

  /**
   * Array of dates that are allowed to be selected. All other dates will be disabled.
   *
   * Note: Format should match dateFormat prop
   */
  @Prop() allowedDates?: string[] = [];
  /**
   * Array of dates that are disabled for selection.
   *
   * Format should match dateFormat prop
   */
  @Prop() disabledDates?: string[] = [];
  /**
   * Whether to display inline panel
   * @defaultValue false
   */
  @Prop() inline: boolean = false;
  /**
   * The selection mode of the date picker: 'single' for single date selection, 'range' for date range selection.
   * @defaultValue single
   */
  @Prop() mode: 'single' | 'range' = 'single';
  /**
   * Locale for date formatting
   * @defaultValue en
   */
  @Prop() locale: string = 'en';
  /**
   * The visual variant of the footer: 'basic', 'divided', or 'light'.
   * @defaultValue basic
   */
  @Prop() footerType: 'basic' | 'divided' | 'light' = 'basic';
  /**
   * Date format pattern
   * @defaultValue yyyy-MM-dd
   */
  @Prop() dateFormat: string = 'yyyy-MM-dd';
  @Watch('dateFormat')
  dateFormatChanged(newFormat: string) {
    this.maskOptions = this.getMaskOptionsFromDateFormat(newFormat);
  }

  /**
   * Whether to disable input mask
   * @defaultValue false
   */
  @Prop() disableMask?: boolean = false;
  /**
   * Header visual variant
   * @defaultValue basic
   */
  @Prop() headerType: 'basic' | 'divided' | 'light' | 'primary' | 'dark' = 'basic';
  /**
   * Input placeholder text
   */
  @Prop() placeholder?: string;

  /**
   * Displays a red asterisk (*) next to the label for visual emphasis.
   */
  @Prop() showAsterisk: boolean = false;

  /**
   * Emitted on input value changes
   */
  @Event({ eventName: 'tk-input-change' }) tkInputChange: EventEmitter<string>;

  /**
   * Emitted on date selection changes
   */
  @Event({ eventName: 'tk-change' }) tkChange: EventEmitter<IDateSelection | string>;

  componentWillLoad() {
    this.maskOptions = this.getMaskOptionsFromDateFormat(this.dateFormat);

    if (this.allowedDates) {
      this.allowedDates = this.allowedDates.filter(date => {
        const parsed = this.parseInputDate(date);
        return parsed !== null;
      });
    }
    if (this.disabledDates) {
      this.disabledDates = this.disabledDates.filter(date => {
        const parsed = this.parseInputDate(date);
        return parsed !== null;
      });
    }
    this.initializeDates();
    this.hasFooterSlot = !!this.el.querySelector('[slot="footer"]');
    this.hasFooterActionsSlot = !!this.el.querySelector('[slot="footer-actions"]');
  }

  componentDidLoad() {
    if (!this.inline && this.panelRef) {
      this.initializeResizeObserver();
    }

    this.internals?.form?.addEventListener('reset', () => {
      this.handleFormReset();
    });
  }

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    this.internals?.form?.removeEventListener('reset', this.handleFormReset);
    this.unbindWindowClickListener();
  }

  private getMaskOptionsFromDateFormat(format: string): IInputMaskOptions {
    const delimiter = format.match(/[^a-zA-Z]/)?.[0] || '';
    const datePattern: string[] = [];
    const parts = format.split(/[^a-zA-Z]/);

    parts.forEach(part => {
      switch (part.toLowerCase()) {
        case 'yyyy':
        case 'yy':
          datePattern.push('Y');
          break;
        case 'mm':
        case 'M':
        case 'dd':
        case 'd':
          datePattern.push(part.startsWith('M') ? 'm' : 'd');
          break;
      }
    });
    return {
      date: true,
      delimiter,
      datePattern,
    };
  }

  private handleFormReset() {
    this.inputValue = '';
    this.internalSelectedDates = { start: null, end: null };
    this.tkChange.emit(undefined);
  }

  private processDateValue(value: string | IDateSelection, updateCurrentMonth: boolean = false): void {
    if (!value) {
      this.internalSelectedDates = { start: null, end: null };
      this.inputValue = '';
      return;
    }

    let startDate = null;
    let endDate = null;

    if (typeof value === 'string') {
      const parsedDate = this.parseInputDate(value);
      if (parsedDate && !this.isDateDisabled(parsedDate)) {
        startDate = this.normalizeDate(parsedDate);
      } else {
        this.internalSelectedDates = { start: null, end: null };
        this.inputValue = '';
        return;
      }
    } else if (typeof value === 'object') {
      if (value.start) {
        const parsed = this.parseInputDate(value.start);
        if (parsed && !this.isDateDisabled(parsed)) startDate = this.normalizeDate(parsed);
      }

      if (value.end) {
        const parsed = this.parseInputDate(value.end);
        if (parsed) endDate = this.normalizeDate(parsed);
      }
    }

    this.internalSelectedDates = { start: startDate, end: endDate };

    if (updateCurrentMonth && startDate) {
      this.currentMonth = new Date(startDate);
    }

    this.inputValue = this.formatInputValue();
  }

  private initializeDates(): void {
    this.currentMonth = new Date();

    this.processDateValue(this.value, true);
  }

  private initializeResizeObserver() {
    this.resizeObserver = new ResizeObserver(() => {
      this.updatePosition();
    });

    if (this.panelRef) {
      this.resizeObserver.observe(this.panelRef);
    }
  }

  private updatePosition() {
    if (this.inputRef && this.panelRef) {
      computePosition(this.inputRef, this.panelRef, {
        placement: 'bottom-start',
        middleware: [offset(5), flip(), shift({ padding: 5 })],
      }).then(({ x, y }) => {
        Object.assign(this.panelRef.style, {
          left: `${x}px`,

          top: `${y}px`,
        });
      });
    }
  }

  private requestAnimationFrame(fn) {
    const timeout = fn => setTimeout(fn, 0);
    let frame = window.requestAnimationFrame || timeout;
    return frame(fn);
  }

  private onTkInputClick = (e: MouseEvent) => {
    if (this.disabled) {
      e.preventDefault();
      return;
    }

    if (this.isOpen) {
      this.isOpen = false;
      this.unbindWindowClickListener();
    } else {
      this.isOpen = true;
      this.requestAnimationFrame(() => {
        this.updatePosition();
        this.bindWindowClickListener();
      });
    }
  };

  private normalizeDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private formatDate(date: Date): string {
    return format(date, this.dateFormat);
  }

  private parseInputDate(dateString: string): Date | null {
    const parsedDate = parse(dateString, this.dateFormat, new Date());

    if (isValid(parsedDate) && this.formatDate(parsedDate) === dateString) {
      return parsedDate;
    }

    return null;
  }

  private isDateDisabled(date: Date): boolean {
    const normalizedDate = this.normalizeDate(date);
    const dateStr = this.formatDate(normalizedDate);
    const minDate = this.minDate ? this.parseInputDate(this.minDate) : null;
    const maxDate = this.maxDate ? this.parseInputDate(this.maxDate) : null;

    if (minDate) {
      minDate.setHours(0, 0, 0, 0);
    }

    if (maxDate) {
      maxDate.setHours(23, 59, 59, 999);
    }

    const isOutOfRange = (minDate && date < minDate) || (maxDate && date > maxDate);
    if (isOutOfRange) return true;

    if (this.allowedDates && this.allowedDates.length > 0) {
      const isAllowed = this.allowedDates.some(allowedDate => {
        const parsedAllowedDate = this.parseInputDate(allowedDate);
        return parsedAllowedDate && this.formatDate(this.normalizeDate(parsedAllowedDate)) === dateStr;
      });
      return !isAllowed;
    }

    if (this.disabledDates && this.disabledDates.length > 0) {
      return this.disabledDates.some(disabledDate => {
        const parsedDisabledDate = this.parseInputDate(disabledDate);
        return parsedDisabledDate && this.formatDate(this.normalizeDate(parsedDisabledDate)) === dateStr;
      });
    }

    return false;
  }
  private handleDateClick = (date: Date) => {
    if (this.isDateDisabled(date)) return;

    const formattedValue = this.formatDate(date);

    if (this.mode === 'single') {
      this.internalSelectedDates = { start: date, end: null };
      this.tkChange.emit(formattedValue);

      if (!this.inline && this.isOpen) {
        this.isOpen = false;
      }
    } else if (this.mode === 'range') {
      const { start, end } = this.internalSelectedDates;

      if (!start || (start && end)) {
        this.internalSelectedDates = { start: date, end: null };
        this.tkChange.emit({
          start: formattedValue,
          end: null,
        });
        this.hoverDate = null;
      } else {
        let newSelection: IDateSelection;

        if (date < start) {
          this.internalSelectedDates = { start: date, end: start };
          newSelection = {
            start: this.formatDate(date),
            end: this.formatDate(start),
          };
        } else {
          this.internalSelectedDates = { start, end: date };
          newSelection = {
            start: this.formatDate(start),
            end: this.formatDate(date),
          };
        }

        this.tkChange.emit(newSelection);
        this.hoverDate = null;

        if (!this.inline && this.isOpen) {
          this.isOpen = false;
        }
      }
    }
  };

  private handleDateHover = (date: Date) => {
    if (this.mode === 'range' && this.internalSelectedDates.start && !this.internalSelectedDates.end) {
      this.hoverDate = date;
    }
  };

  private handleMonthChange = (increment: number) => {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + increment);
  };

  private handleYearChange = (increment: number) => {
    if (this.currentView === 'years') {
      this.currentMonth = new Date(this.currentMonth.getFullYear() + increment * 12, this.currentMonth.getMonth());
      return;
    }

    this.currentMonth = new Date(this.currentMonth.getFullYear() + increment, this.currentMonth.getMonth());
  };

  private handleYearSelect(e: MouseEvent, year: number): void {
    e.stopPropagation();
    this.currentMonth = new Date(year, this.currentMonth.getMonth());
    this.currentView = 'months';
  }

  private handleViewChange = (e: MouseEvent, view: 'days' | 'months' | 'years') => {
    e.stopPropagation();
    this.currentView = view;
  };

  private onTkInputKeyDown = (event: KeyboardEvent) => {
    if (this.disableMask || this.mode === 'range') {
      event.preventDefault();
    }
    //TODO: Add other keydown event actions
  };

  private onTkInputChange = (event: CustomEvent) => {
    if (this.disableMask || this.mode === 'range') {
      event.preventDefault();
      return;
    }

    this.inputValue = event.detail;
    this.tkInputChange.emit(this.inputValue);
  };

  private onTkInputBlur = () => {
    if (this.disableMask || this.mode === 'range') return;

    clearTimeout(this.debounceTimer);
    this.debounceTimer = window.setTimeout(() => {
      if (this.inputValue) {
        const parsedDate = this.parseInputDate(this.inputValue);
        if (parsedDate && !this.isDateDisabled(parsedDate)) {
          this.internalSelectedDates = {
            start: this.normalizeDate(parsedDate),
            end: null,
          };

          this.isInvalid = false;

          const formattedDate = this.formatDate(parsedDate);
          if (this.mode === 'range') {
            this.tkChange.emit({
              start: formattedDate,
              end: null,
            });
          } else {
            this.tkChange.emit(formattedDate);
          }
        } else {
          this.isInvalid = true;
          this.internalSelectedDates = { start: null, end: null };
          this.tkChange.emit(undefined);
        }
      } else {
        this.isInvalid = false;
        this.internalSelectedDates = { start: null, end: null };
        this.tkChange.emit(undefined);
      }
    }, 300);
  };

  private formatInputValue(selectedDate = this.internalSelectedDates): string {
    if (typeof selectedDate === 'object') {
      const { start, end } = selectedDate;

      if (start) {
        if (this.mode === 'range' && end) {
          return `${this.formatDate(start)} - ${this.formatDate(end)}`;
        }

        return this.formatDate(start);
      }
    } else if (typeof selectedDate === 'string') {
      return this.formatDate(selectedDate);
    }

    return '';
  }

  private isToday(date: Date): boolean {
    return date.getDate() === this.today.getDate() && date.getMonth() === this.today.getMonth() && date.getFullYear() === this.today.getFullYear();
  }

  private bindWindowClickListener() {
    window.addEventListener('click', this.windowClickHandler);
  }

  private unbindWindowClickListener() {
    window.removeEventListener('click', this.windowClickHandler);
  }

  private handleWindowClick(event: MouseEvent) {
    if (this.inline) return;
    const clickedElement = event.target as any;

    const clickedDatepickerId = clickedElement?.el?.shadowRoot.querySelector('.tk-datepicker-panel')?.getAttribute('data-tk-datepicker-id');
    const isOutsideClicked = !(
      this.el.contains(clickedElement) ||
      clickedDatepickerId === this.uniqueId ||
      event.composedPath().some(item => item == this.inputRef) ||
      event.composedPath().some(item => item == this.el)
    );
    if (isOutsideClicked) {
      this.isOpen = false;
      this.unbindWindowClickListener();
    }
  }

  /**
   * Sets the date to today
   */
  @Method()
  async handleToday() {
    const today = this.normalizeDate(new Date());
    this.currentMonth = today;
    this.internalSelectedDates = { start: today, end: null };
    this.inputValue = this.formatDate(today);

    if (this.mode === 'range') {
      this.tkChange.emit({
        start: this.formatDate(today),
        end: null,
      });
    } else {
      this.tkChange.emit(this.formatDate(today));
    }

    this.currentView = 'days';
    if (!this.inline && this.isOpen) {
      this.isOpen = false;
    }
  }

  private renderInput() {
    if (this.inline) return null;

    const shouldUseMask = this.mode === 'single' && !this.disableMask;

    return (
      <tk-input
        ref={el => (this.inputRef = el as HTMLTkInputElement)}
        label={this.label}
        mode="text"
        icon="calendar_month"
        class={classNames('tk-datepicker-input', { 'tk-table-input': this.el.classList.contains('tk-table-datepicker') })}
        name={this.name}
        hint={this.hint}
        disabled={this.disabled}
        invalid={this.invalid || this.isInvalid}
        error={this.error}
        placeholder={this.placeholder || this.dateFormat.toUpperCase()}
        value={this.inputValue}
        maskOptions={shouldUseMask ? this.maskOptions : undefined}
        onTk-change={this.onTkInputChange}
        onTk-blur={this.onTkInputBlur}
        onKeyDown={this.onTkInputKeyDown}
        onClick={this.onTkInputClick}
        aria-expanded={!!this.isOpen}
        aria-haspopup="true"
        data-tk-datepicker-id={this.uniqueId}
        showAsterisk={this.showAsterisk}
      />
    );
  }

  private renderPanel() {
    if (!this.isOpen && !this.inline) return null;
    const panelClasses = classNames('tk-datepicker-panel', {
      'tk-datepicker-panel-inline': this.inline,
    });
    const bodyClasses = classNames('tk-datepicker-body', {
      'tk-datepicker-months-view': this.currentView === 'months',
      'tk-datepicker-years-view': this.currentView === 'years',
    });

    return (
      <div class={panelClasses} ref={el => (this.panelRef = el as HTMLDivElement)} role={!this.inline ? 'dialog' : null} aria-modal="true" data-tk-datepicker-id={this.uniqueId}>
        {this.createHeader()}
        <div class={bodyClasses}>
          <table class="tk-datepicker-table">
            {this.currentView === 'days' && (
              <Fragment>
                {this.createWeekDayNames()}
                {this.createWeekDays()}
              </Fragment>
            )}
            {this.currentView === 'months' && this.createMonths()}
            {this.currentView === 'years' && this.createYears()}
          </table>
        </div>
        {this.createFooter()}
      </div>
    );
  }

  private createHeader() {
    const monthName = this.currentMonth.toLocaleString(this.locale, {
      month: 'long',
    });
    const year = this.currentMonth.getFullYear().toString();
    const headerClasses = classNames('tk-datepicker-header', `tk-datepicker-header-${this.headerType}`);

    return (
      <div class={headerClasses}>
        <div class="tk-datepicker-header-content">
          <div class="tk-datepicker-header-content-start">
            <tk-button variant="neutral" icon="keyboard_double_arrow_left" onTk-click={() => this.handleYearChange(-1)} type="text"></tk-button>
            <span class="tk-datepicker-divider"></span>
            <tk-button variant="neutral" icon="chevron_left" onTk-click={() => this.handleMonthChange(-1)} type="text"></tk-button>
          </div>
          <div class="tk-datepicker-select-container">
            <div class="tk-datepicker-select-month" onClick={e => this.handleViewChange(e, 'months')}>
              {monthName}
            </div>
            <div class="tk-datepicker-select-year" onClick={e => this.handleViewChange(e, 'years')}>
              {year}
            </div>
          </div>
          <div class="tk-datepicker-header-content-end">
            <tk-button variant="neutral" icon="chevron_right" onTk-click={() => this.handleMonthChange(1)} type="text"></tk-button>
            <span class="tk-datepicker-divider"></span>
            <tk-button variant="neutral" icon="keyboard_double_arrow_right" onTk-click={() => this.handleYearChange(1)} type="text"></tk-button>
          </div>
        </div>
      </div>
    );
  }

  private createWeekDayNames() {
    const weekdays = [...Array(7)].map((_, i) => new Date(2023, 0, i + 1).toLocaleString(this.locale, { weekday: 'short' }));

    return (
      <thead>
        <tr class="tk-datepicker-week-days">
          {weekdays.map(day => (
            <th class="tk-datepicker-week-day-cell">
              <span class="tk-datepicker-week-day">{day}</span>
            </th>
          ))}
        </tr>
      </thead>
    );
  }
  private createWeekDays() {
    const firstDayOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const lastDayOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);
    const daysInPreviousMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 0).getDate();
    const daysInCurrentMonth = lastDayOfMonth.getDate();
    const weeks = [];
    let days = [];
    const startOfWeek = 0;
    const firstDayOfWeek = firstDayOfMonth.getDay();
    let emptyCells = (firstDayOfWeek - startOfWeek + 7) % 7;

    // Previous month's days
    for (let i = emptyCells - 1; i >= 0; i--) {
      const date = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, daysInPreviousMonth - i);
      days.push(this.createDayCell(date, true));
    }

    // Current month's days
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const date = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), i);
      days.push(this.createDayCell(date, false));
      if (days.length === 7) {
        weeks.push(<tr>{days}</tr>);
        days = [];
      }
    }

    // Next month's days
    if (days.length > 0) {
      let nextMonthDay = 1;
      while (days.length < 7) {
        const date = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, nextMonthDay);
        days.push(this.createDayCell(date, true));
        nextMonthDay++;
      }
      weeks.push(<tr>{days}</tr>);
    }

    return <tbody class="tk-datepicker-days">{weeks}</tbody>;
  }

  private createDayCell(date: Date, isAdjacentMonth: boolean) {
    const { start = null, end = null } = this.internalSelectedDates;
    const dateTime = date.getTime();
    const isSelectedStart = start && dateTime === start.getTime();
    const isSelectedEnd = start && end && dateTime === end.getTime();
    const isSelected = isSelectedStart || isSelectedEnd;
    let isInRange = false;

    if (start && (end || this.hoverDate)) {
      const rangeEnd = (end || this.hoverDate) as Date;
      if (start.getTime() < rangeEnd.getTime()) {
        isInRange = dateTime > start.getTime() && dateTime < rangeEnd.getTime();
      } else {
        isInRange = dateTime > rangeEnd.getTime() && dateTime < start.getTime();
      }
    }
    const isDisabled = this.isDateDisabled(date);
    const isToday = this.isToday(date);

    return (
      <td
        class={classNames('tk-datepicker-day-cell', {
          'selected': isSelected,
          'in-range': isInRange,
          'range-start': isSelectedStart && this.mode === 'range',
          'range-end': isSelectedEnd && this.mode === 'range',
          'today': isToday && !isSelected && !isInRange,
          'disabled': isDisabled,
          'adjacent-month': isAdjacentMonth,
        })}
        onClick={() => !isDisabled && this.handleDateClick(date)}
        onMouseEnter={() => this.handleDateHover(date)}
      >
        <span class="tk-datepicker-day">{date.getDate()}</span>
      </td>
    );
  }

  private createMonths() {
    const months = [...Array(12)].map((_, i) => new Date(2023, i).toLocaleString(this.locale, { month: 'short' }));
    const rows = [];

    for (let i = 0; i < 12; i += 4) {
      const monthGroup = months.slice(i, i + 4);
      rows.push(
        <tr class="tk-datepicker-month-row">
          {monthGroup.map((month, index) => {
            const monthIndex = i + index;
            const isSelected = this.currentMonth.getMonth() === monthIndex;
            return (
              <td
                class={classNames('tk-datepicker-month', {
                  selected: isSelected,
                })}
                onClick={(e: MouseEvent) => {
                  e.stopPropagation();
                  this.currentMonth = new Date(this.currentMonth.getFullYear(), monthIndex);
                  this.currentView = 'days';
                }}
              >
                {month}
              </td>
            );
          })}
        </tr>,
      );
    }
    return <tbody class="tk-datepicker-months">{rows}</tbody>;
  }

  private createYears() {
    const currentYear = this.currentMonth.getFullYear();
    const startYear = Math.floor(currentYear / 12) * 12;
    const years = Array.from({ length: 12 }, (_, i) => startYear + i);
    const rows = [];

    for (let i = 0; i < years.length; i += 4) {
      const yearGroup = years.slice(i, i + 4);
      rows.push(
        <tr class="tk-datepicker-year-row">
          {yearGroup.map(year => (
            <td
              class={classNames('tk-datepicker-year', {
                selected: year === currentYear,
              })}
              onClick={e => this.handleYearSelect(e, year)}
            >
              {year}
            </td>
          ))}
        </tr>,
      );
    }
    return <tbody class="tk-datepicker-years">{rows}</tbody>;
  }

  private createFooter() {
    if (this.hasFooterSlot) {
      return <slot name="footer"></slot>;
    } else if (this.hasFooterActionsSlot) {
      const footerClass = classNames('tk-datepicker-footer', `tk-datepicker-footer-${this.footerType}`);
      return (
        <div class={footerClass}>
          <slot name="footer-actions"></slot>
        </div>
      );
    }
    return null;
  }
  render() {
    return (
      <div class="tk-datepicker-container">
        {this.renderInput()}
        {this.renderPanel()}
      </div>
    );
  }
}
