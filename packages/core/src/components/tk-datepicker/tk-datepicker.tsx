import { Component, Prop, h, State, Event, EventEmitter, Element, Watch, Fragment, AttachInternals, Method } from '@stencil/core';
import { computePosition, flip, shift, offset, autoUpdate } from '@floating-ui/dom';
import { format, parse, isValid } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import { IInputMaskOptions } from '../tk-input/interfaces';
import { IIconOptions } from '../../global/interfaces/IIconOptions';

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
  private today = new Date();
  private debounceTimer: number;
  private inputRef?: HTMLTkInputElement;
  private panelRef?: HTMLDivElement;
  private dialogRef?: HTMLTkDialogElement;
  private uniqueId: string;
  private windowClickHandler: (event: MouseEvent) => void;
  private cleanup;

  @Element() el: HTMLTkDatepickerElement;

  @AttachInternals() internals: ElementInternals;

  constructor() {
    this.uniqueId = uuidv4();
    this.windowClickHandler = this.handleWindowClick.bind(this);
  }

  @State() hasFooterSlot: boolean;
  @State() hasFooterActionsSlot: boolean;
  @State() currentMonth: Date = new Date();
  @State() internalSelectedDates: {
    start: Date | null;
    end: Date | null;
  } = { start: null, end: null };
  @State() inputValue: string = '';
  @State() internalStartTime: { hour: number; minute: number } | null = null;
  @State() internalEndTime: { hour: number; minute: number } | null = null;
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
      } else {
        this.currentView = 'days';
      }
    }
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
   * Defines the size for the label
   * @defaultValue base
   */
  @Prop() size: 'large' | 'base' | 'small' = 'base';

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
   * Indicates whether the input of datepicker can be cleared
   * @defaultValue false
   */
  @Prop() clearable: boolean = false;

  /**
   * Error message to display
   */
  @Prop() error: string;

  /**
   * Hint text to display
   */
  @Prop() hint: string;

  /**
   * Specifies a material icon name to be displayed.
   */
  @Prop() icon?: string | IIconOptions = 'calendar_month';

  /**
   * Defines the position of the icon.
   * @defaultValue left
   */
  @Prop() iconPosition: 'left' | 'right' = 'left';

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
  @Prop({ mutable: true }) allowedDates?: string[] = [];

  /**
   * Array of dates that are disabled for selection.
   *
   * Format should match dateFormat prop
   */
  @Prop({ mutable: true }) disabledDates?: string[] = [];

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
   * Disabled week days (0-6, where 0 is Sunday and 6 is Saturday)
   * Example: [0,6] will disable Sunday and Saturday
   */
  @Prop() disabledWeekDays?: number[] = [];

  /**
   * Whether to show the timepicker panel next to the calendar.
   * @defaultValue false
   */
  @Prop() showTimePicker: boolean = false;

  /**
   * Minimum selectable time (HH:mm format).
   */
  @Prop() minTime?: string;

  /**
   * Maximum selectable time (HH:mm format).
   */
  @Prop() maxTime?: string;

  /**
   * Hour increment step.
   * @defaultValue 1
   */
  @Prop() hourStep: number = 1;

  /**
   * Minute increment step.
   * @defaultValue 1
   */
  @Prop() minuteStep: number = 1;

  /**
   * Time format: '12' or '24'.
   * @defaultValue '24'
   */
  @Prop() timeFormat: '12' | '24' = '24';

  /**
   * Defines the first day of the week. 0 for Monday, 1 for Tuesday, ..., 6 for Sunday.
   * If not provided, the first day of the week is determined by the `locale` prop.
   * If neither `firstDayOfWeekIndex` nor `locale` provide a value, defaults to Monday (0).
   * Providing this prop overrides the locale setting for the start of the week.
   */
  @Prop() firstDayOfWeekIndex?: number;

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
    this.internals?.form?.addEventListener('reset', () => {
      this.handleFormReset();
    });

    // dialog içerisindek kullanıldığında dialog içerisinde scroll olduğunda panelin kapanması için yapıldı.
    this.dialogRef = this.el.closest('tk-dialog');
    this.dialogRef?.querySelector('.tk-dialog-content')?.addEventListener('scroll', this.handleDialogScroll.bind(this));
  }

  componentDidUpdate() {
    if (this.isOpen) {
      if (this.inputRef && this.panelRef) {
        this.cleanup = autoUpdate(this.inputRef.querySelector('.tk-input'), this.panelRef, () => this.updatePosition(), {
          animationFrame: true,
        });
      }
      this.bindWindowClickListener();
    } else {
      this.cleanup && this.cleanup();
      this.unbindWindowClickListener();
    }
  }

  disconnectedCallback() {
    this.internals?.form?.removeEventListener('reset', this.handleFormReset);
    this.unbindWindowClickListener();
  }

  formResetCallback() {
    this.handleFormReset();
  }

  /**
   * Sets the date to today
   */
  @Method()
  async setToday() {
    const today = this.normalizeDate(new Date());
    this.currentMonth = today;
    this.internalSelectedDates = { start: today, end: null };

    if (this.showTimePicker) {
      const now = new Date();
      const currentTime = { hour: now.getHours(), minute: now.getMinutes() };
      this.internalStartTime = currentTime;
      this.internalEndTime = null;
    } else {
      this.internalStartTime = null;
      this.internalEndTime = null;
    }

    const emitValue = this.formatDateOrDateTime(today, 'start');

    if (this.mode === 'range') {
      this.tkChange.emit({
        start: emitValue,
        end: null,
      });
    } else {
      this.tkChange.emit(emitValue);
    }

    this.currentView = 'days';
    if (!this.inline && this.isOpen && !this.showTimePicker) {
      this.isOpen = false;
    }
    this.inputValue = this.formatInputValue();
  }

  /**
   * Closes the datepicker panel if it is open.
   */
  @Method()
  async closePanel() {
    if (this.isOpen) {
      this.isOpen = false;
    }
  }

  private getResolvedFirstDayIndex(): number {
    if (this.firstDayOfWeekIndex !== undefined && this.firstDayOfWeekIndex !== null) {
      if (this.firstDayOfWeekIndex >= 0 && this.firstDayOfWeekIndex <= 6) {
        return this.firstDayOfWeekIndex;
      } else {
        console.warn(`Invalid firstDayOfWeekIndex value: ${this.firstDayOfWeekIndex}. Defaulting to 0 (Monday).`);
        return 0;
      }
    }

    try {
      const resolvedLocale = this.locale || 'en';
      if (typeof Intl !== 'undefined' && Intl.Locale && typeof Intl.Locale === 'function' && Intl.Locale.prototype.hasOwnProperty('weekInfo')) {
        // @ts-ignore: Accessing weekInfo from potentially unknown Intl.Locale type
        const localeInfo = new Intl.Locale(resolvedLocale).getWeekInfo();
        if (localeInfo && localeInfo.firstDay !== undefined) {
          // Formula: (IntlDay + 6) % 7 maps 1(Mon) to 0, 7(Sun) to 6
          return (localeInfo.firstDay + 6) % 7;
        }
      }
    } catch (e) {
      console.warn(`Could not determine first day of week from locale '${this.locale}'. Error or unsupported: ${e}`);
    }

    return 0;
  }

  private getFullDateTimeFormat(): string {
    const timePattern = this.timeFormat === '12' ? 'hh:mm a' : 'HH:mm';
    return /[hH]/.test(this.dateFormat) ? this.dateFormat : `${this.dateFormat} ${timePattern}`;
  }

  private getDateWithTime(date: Date, type: 'start' | 'end'): Date | null {
    if (!date) return null;
    const newDate = new Date(date);
    const timeToApply = type === 'start' ? this.internalStartTime : this.internalEndTime;

    if (this.showTimePicker && timeToApply) {
      newDate.setHours(timeToApply.hour, timeToApply.minute);
    }
    return newDate;
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

  private processDateValue(value: string | IDateSelection, updateCurrentMonth: boolean = false): void {
    let startDate: Date | null = null;
    let endDate: Date | null = null;
    let startTime: { hour: number; minute: number } | null = null;
    let endTime: { hour: number; minute: number } | null = null;
    const now = new Date();
    const defaultTime = { hour: now.getHours(), minute: now.getMinutes() };

    if (value) {
      let startString: string | null = null;
      let endString: string | null = null;

      if (typeof value === 'string') {
        startString = value;
      } else if (typeof value === 'object' && value.start) {
        startString = value.start;
        endString = value.end || null;
      }

      if (startString) {
        const parsedStartDateTime = this.showTimePicker ? this.parseFullDateTime(startString) : this.parseInputDate(startString);

        if (parsedStartDateTime && !this.isDateDisabled(parsedStartDateTime)) {
          startDate = this.normalizeDate(parsedStartDateTime);
          if (this.showTimePicker) {
            const expectedFullFormat = this.formatFullDateTime(parsedStartDateTime);
            if (startString === expectedFullFormat || startString.includes(' ')) {
              startTime = { hour: parsedStartDateTime.getHours(), minute: parsedStartDateTime.getMinutes() };
            } else {
              startTime = defaultTime;
            }
          }
        } else {
          startDate = null;
          startTime = null;
        }
      }

      if (this.mode === 'range' && endString && startDate) {
        const parsedEndDateTime = this.showTimePicker ? this.parseFullDateTime(endString) : this.parseInputDate(endString);

        if (parsedEndDateTime && !this.isDateDisabled(parsedEndDateTime)) {
          endDate = this.normalizeDate(parsedEndDateTime);
          if (this.showTimePicker) {
            const expectedFullFormat = this.formatFullDateTime(parsedEndDateTime);
            if (endString === expectedFullFormat || endString.includes(' ')) {
              endTime = { hour: parsedEndDateTime.getHours(), minute: parsedEndDateTime.getMinutes() };
            } else {
              endTime = startTime || defaultTime;
            }
          }
        } else {
          endDate = null;
          endTime = null;
        }
      } else if (this.mode === 'range') {
        endDate = null;
        endTime = null;
      } else {
        endDate = null;
        endTime = null;
      }
    } else {
      if (this.showTimePicker) {
        startTime = defaultTime;
        endTime = this.mode === 'range' ? null : defaultTime;
      }
    }

    this.internalSelectedDates = { start: startDate, end: endDate };
    this.internalStartTime = startTime;
    this.internalEndTime = this.mode === 'range' ? endTime : startTime;

    if (updateCurrentMonth && startDate) {
      this.currentMonth = new Date(startDate.getFullYear(), startDate.getMonth());
    } else if (!startDate) {
      this.currentMonth = new Date(this.currentMonth || now);
    }

    this.inputValue = this.formatInputValue();
  }

  private initializeDates(): void {
    this.currentMonth = new Date();

    this.processDateValue(this.value, true);

    if (this.showTimePicker && !this.internalStartTime && this.internalSelectedDates.start) {
      const now = new Date();
      const defaultTime = { hour: now.getHours(), minute: now.getMinutes() };
      this.internalStartTime = defaultTime;
      if (this.mode === 'range' && !this.internalEndTime && this.internalSelectedDates.end) {
        this.internalEndTime = this.internalStartTime;
      } else if (this.mode === 'single') {
        this.internalEndTime = this.internalStartTime;
      }
    }

    this.inputValue = this.formatInputValue();
  }

  private updatePosition() {
    if (this.inputRef && this.panelRef) {
      computePosition(this.inputRef?.querySelector('.tk-input'), this.panelRef, {
        strategy: 'fixed',
        placement: 'bottom-start',
        middleware: [offset(4), flip(), shift({ padding: 5 })],
      }).then(({ x, y }) => {
        Object.assign(this.panelRef.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    }
  }

  private normalizeDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private formatDate(date: Date): string {
    return format(date, this.dateFormat);
  }

  private formatFullDateTime(date: Date): string {
    if (!date) return '';
    return format(date, this.getFullDateTimeFormat());
  }

  private formatDateOrDateTime(date: Date, type?: 'start' | 'end'): string {
    if (this.showTimePicker && date && type) {
      const dateWithCorrectTime = this.getDateWithTime(date, type);

      return dateWithCorrectTime ? this.formatFullDateTime(dateWithCorrectTime) : '';
    } else if (date) {
      return this.formatDate(date);
    }
    return '';
  }

  private parseInputDate(dateString: string): Date | null {
    const parsedDate = parse(dateString, this.dateFormat, new Date());

    if (isValid(parsedDate) && this.formatDate(parsedDate) === dateString) {
      return parsedDate;
    }

    return null;
  }

  private parseFullDateTime(dateTimeString: string): Date | null {
    // Try full date+time format first
    const formatString = this.getFullDateTimeFormat();
    const parsedDate = parse(dateTimeString, formatString, new Date());
    if (isValid(parsedDate) && format(parsedDate, formatString) === dateTimeString) {
      return parsedDate;
    }
    // Fallback: allow typing HH:mm without AM/PM for 12h mode
    if (this.timeFormat === '12') {
      const altFormat = `${this.dateFormat} HH:mm`;
      const parsedAlt = parse(dateTimeString, altFormat, new Date());
      if (isValid(parsedAlt) && format(parsedAlt, altFormat) === dateTimeString) {
        return parsedAlt;
      }
    }
    // Fallback to date only
    return this.parseInputDate(dateTimeString.split(' ')[0]);
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

    if (this.disabledWeekDays && this.disabledWeekDays.length > 0) {
      const dayOfWeek = date.getDay();
      return this.disabledWeekDays.includes(dayOfWeek);
    }

    return false;
  }

  private formatInputValue(): string {
    const { start, end } = this.internalSelectedDates;

    if (start) {
      const formattedStart = this.formatDateOrDateTime(start, 'start');

      if (this.mode === 'range' && end) {
        const formattedEnd = this.formatDateOrDateTime(end, 'end');
        return `${formattedStart} - ${formattedEnd}`;
      }

      return formattedStart;
    }

    return '';
  }

  private isToday(date: Date): boolean {
    return date.getDate() === this.today.getDate() && date.getMonth() === this.today.getMonth() && date.getFullYear() === this.today.getFullYear();
  }

  private ensureDateTimeInitialized(type: 'start' | 'end') {
    if (!this.internalSelectedDates.start && type === 'start') {
      const today = this.normalizeDate(new Date());
      this.internalSelectedDates = { ...this.internalSelectedDates, start: today };
      this.currentMonth = new Date(today);
    }
    if (!this.internalSelectedDates.end && type === 'end' && this.mode === 'range') {
      return; // Don't initialize end date if not set
    }

    if (this.showTimePicker) {
      const now = new Date();
      const defaultTime = { hour: now.getHours(), minute: now.getMinutes() };
      if (type === 'start' && !this.internalStartTime) {
        this.internalStartTime = defaultTime;
      }
      if (type === 'end' && this.mode === 'range' && this.internalSelectedDates.end && !this.internalEndTime) {
        this.internalEndTime = this.internalStartTime || defaultTime;
      }
    }
  }

  private ensureRangeOrder(): boolean {
    if (this.mode !== 'range' || !this.showTimePicker) return true;
    const { start, end } = this.internalSelectedDates;
    if (!start || !end) return true;
    const startTs = this.getDateWithTime(start, 'start')?.getTime();
    const endTs = this.getDateWithTime(end, 'end')?.getTime();
    if (startTs !== undefined && endTs !== undefined && endTs < startTs) {
      this.internalSelectedDates = { start: end, end: start };
      [this.internalStartTime, this.internalEndTime] = [this.internalEndTime, this.internalStartTime];

      this.inputValue = this.formatInputValue();
      this.tkChange.emit({
        start: this.formatDateOrDateTime(end, 'start'),
        end: this.formatDateOrDateTime(start, 'end'),
      });
      return false;
    }
    return true;
  }

  private emitTimeChange() {
    if (!this.showTimePicker || !this.internalSelectedDates.start) {
      return;
    }

    // if swap occurred, bail
    if (!this.ensureRangeOrder()) {
      return;
    }

    const { start, end } = this.internalSelectedDates;
    let emitValue: string | IDateSelection;

    const formattedStart = this.formatDateOrDateTime(start, 'start');

    if (this.mode === 'range') {
      const formattedEnd = end ? this.formatDateOrDateTime(end, 'end') : null;
      emitValue = {
        start: formattedStart,
        end: formattedEnd,
      };
    } else {
      emitValue = formattedStart;
    }

    this.tkChange.emit(emitValue);
    this.inputValue = this.formatInputValue();
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

  private getTimeStateToModify(): { time: { hour: number; minute: number }; type: 'start' | 'end' } | null {
    if (!this.showTimePicker) return null;

    let targetType: 'start' | 'end' = 'start';
    if (this.mode === 'range' && this.internalSelectedDates.end) {
      targetType = 'end';
    }

    this.ensureDateTimeInitialized(targetType);

    const timeState = targetType === 'start' ? this.internalStartTime : this.internalEndTime;

    if (!timeState) return null;

    return { time: timeState, type: targetType };
  }

  private handleIncreaseHour = () => {
    const targetTimeState = this.getTimeStateToModify();
    if (!targetTimeState) return;

    if (this.timeFormat === '12') {
      const hoursList = Array.from({ length: 12 }, (_, i) => i + 1);
      let displayHour = targetTimeState.time.hour % 12;
      displayHour = displayHour === 0 ? 12 : displayHour;
      const idx = hoursList.indexOf(displayHour);
      const nextIdx = Math.min(idx + this.hourStep, hoursList.length - 1);
      const newHour = hoursList[nextIdx];
      if (targetTimeState.type === 'start') {
        this.internalStartTime = { ...targetTimeState.time, hour: newHour };
      } else {
        this.internalEndTime = { ...targetTimeState.time, hour: newHour };
      }
    } else {
      // 24h mode clamp
      let hour = targetTimeState.time.hour + this.hourStep;
      hour = Math.min(hour, 23);

      if (targetTimeState.type === 'start') {
        this.internalStartTime = { ...targetTimeState.time, hour: hour };
      } else {
        this.internalEndTime = { ...targetTimeState.time, hour: hour };
      }
    }
    this.emitTimeChange();
  };

  private handleDecreaseHour = () => {
    const targetTimeState = this.getTimeStateToModify();
    if (!targetTimeState) return;

    if (this.timeFormat === '12') {
      const hoursList = Array.from({ length: 12 }, (_, i) => i + 1);
      let displayHour = targetTimeState.time.hour % 12;
      displayHour = displayHour === 0 ? 12 : displayHour;
      const idx = hoursList.indexOf(displayHour);
      const prevIdx = Math.max(idx - this.hourStep, 0);
      const newHour = hoursList[prevIdx];
      if (targetTimeState.type === 'start') {
        this.internalStartTime = { ...targetTimeState.time, hour: newHour };
      } else {
        this.internalEndTime = { ...targetTimeState.time, hour: newHour };
      }
    } else {
      // 24h mode clamp
      let hour = targetTimeState.time.hour - this.hourStep;
      hour = Math.max(hour, 0);

      if (targetTimeState.type === 'start') {
        this.internalStartTime = { ...targetTimeState.time, hour: hour };
      } else {
        this.internalEndTime = { ...targetTimeState.time, hour: hour };
      }
    }
    this.emitTimeChange();
  };

  private handleHourClick = (hour: number) => {
    const targetTimeState = this.getTimeStateToModify();
    if (!targetTimeState) return;

    if (targetTimeState.type === 'start') {
      this.internalStartTime = { ...targetTimeState.time, hour: hour };
    } else {
      this.internalEndTime = { ...targetTimeState.time, hour: hour };
    }
    this.emitTimeChange();
  };

  private handleIncreaseMinute = () => {
    const targetTimeState = this.getTimeStateToModify();
    if (!targetTimeState) return;

    let minute = targetTimeState.time.minute + this.minuteStep;
    minute = Math.min(minute, 59);

    if (targetTimeState.type === 'start') {
      this.internalStartTime = { ...targetTimeState.time, minute: minute };
    } else {
      this.internalEndTime = { ...targetTimeState.time, minute: minute };
    }
    this.emitTimeChange();
  };

  private handleDecreaseMinute = () => {
    const targetTimeState = this.getTimeStateToModify();
    if (!targetTimeState) return;

    let minute = targetTimeState.time.minute - this.minuteStep;
    minute = Math.max(minute, 0);

    if (targetTimeState.type === 'start') {
      this.internalStartTime = { ...targetTimeState.time, minute: minute };
    } else {
      this.internalEndTime = { ...targetTimeState.time, minute: minute };
    }
    this.emitTimeChange();
  };

  private handleMinuteClick = (min: number) => {
    const targetTimeState = this.getTimeStateToModify();
    if (!targetTimeState) return;

    if (targetTimeState.type === 'start') {
      this.internalStartTime = { ...targetTimeState.time, minute: min };
    } else {
      this.internalEndTime = { ...targetTimeState.time, minute: min };
    }
    this.emitTimeChange();
  };

  private handleInputClick = (e: MouseEvent) => {
    if (this.disabled) {
      e.preventDefault();
      return;
    }

    this.isOpen = !this.isOpen;
  };

  private handleDateClick = (date: Date) => {
    if (this.isDateDisabled(date)) return;

    const normalizedDate = this.normalizeDate(date);
    let emitValue: string | IDateSelection;
    const now = new Date();
    const currentTime = { hour: now.getHours(), minute: now.getMinutes() };

    if (this.mode === 'single') {
      this.internalSelectedDates = { start: normalizedDate, end: null };
      if (this.showTimePicker) {
        this.internalStartTime = this.internalStartTime || currentTime;
      } else {
        this.internalStartTime = null;
      }
      this.internalEndTime = this.internalStartTime;

      emitValue = this.formatDateOrDateTime(normalizedDate, 'start');

      if (!this.inline && !this.showTimePicker) {
        this.isOpen = false;
      }
    } else if (this.mode === 'range') {
      const { start, end } = this.internalSelectedDates;

      if (!start || (start && end)) {
        this.internalSelectedDates = { start: normalizedDate, end: null };
        if (this.showTimePicker) {
          this.internalStartTime = this.internalStartTime || currentTime;
          this.internalEndTime = null;
        } else {
          this.internalStartTime = null;
          this.internalEndTime = null;
        }
        emitValue = {
          start: this.formatDateOrDateTime(normalizedDate, 'start'),
          end: null,
        };
        this.hoverDate = null;
      } else {
        let newStart: Date;
        let newEnd: Date | null;

        if (normalizedDate < start) {
          newStart = normalizedDate;
          newEnd = start;
          if (this.showTimePicker) {
            const tempTime = this.internalStartTime;
            this.internalStartTime = this.internalEndTime || this.internalStartTime || currentTime;
            this.internalEndTime = tempTime || currentTime;
          }
        } else {
          newStart = start;
          newEnd = normalizedDate;
          if (this.showTimePicker && !this.internalEndTime) {
            this.internalEndTime = this.internalStartTime || currentTime;
          }
        }
        this.internalSelectedDates = { start: newStart, end: newEnd };

        emitValue = {
          start: this.formatDateOrDateTime(newStart, 'start'),
          end: this.formatDateOrDateTime(newEnd, 'end'),
        };
        this.hoverDate = null;

        if (!this.inline && !this.showTimePicker) {
          this.isOpen = false;
        }
      }
    }

    // if swap occurred, bail
    if (!this.ensureRangeOrder()) {
      return;
    }

    this.tkChange.emit(emitValue);
    this.inputValue = this.formatInputValue();
  };

  private handleInputKeyDown = (event: KeyboardEvent) => {
    if (this.disableMask || this.mode === 'range') {
      event.preventDefault();
    }
  };

  private handleInputChange = (event: CustomEvent) => {
    if (this.disableMask || this.mode === 'range') {
      event.preventDefault();
      return;
    }

    this.inputValue = event.detail;
    this.tkInputChange.emit(this.inputValue);
  };

  private handleInputClearClick = () => {
    if (this.clearable) {
      this.inputValue = '';
      this.internalSelectedDates = { start: null, end: null };
      this.internalStartTime = null;
      this.internalEndTime = null;
      this.tkChange.emit(null);
    }
  };

  private handleInputBlur = () => {
    if (this.disableMask || this.mode === 'range') return;

    clearTimeout(this.debounceTimer);
    this.debounceTimer = window.setTimeout(() => {
      if (this.inputValue) {
        const parser = this.showTimePicker ? this.parseFullDateTime.bind(this) : this.parseInputDate.bind(this);
        const parsedDate = parser(this.inputValue);

        if (parsedDate && !this.isDateDisabled(parsedDate)) {
          const normalized = this.normalizeDate(parsedDate);
          this.internalSelectedDates = {
            start: normalized,
            end: null,
          };
          if (this.showTimePicker) {
            const time = { hour: parsedDate.getHours(), minute: parsedDate.getMinutes() };
            this.internalStartTime = time;
            this.internalEndTime = time;
          } else {
            this.internalStartTime = null;
            this.internalEndTime = null;
          }

          this.isInvalid = false;
          const formattedValue = this.formatDateOrDateTime(parsedDate, 'start');
          this.tkChange.emit(formattedValue);
        } else {
          this.isInvalid = true;
          this.tkChange.emit(undefined);
        }
      } else {
        this.isInvalid = false;
        this.internalSelectedDates = { start: null, end: null };
        this.internalStartTime = null;
        this.internalEndTime = null;
        this.tkChange.emit(undefined);
      }
      this.inputValue = this.formatInputValue();
    }, 300);
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

  private handleFormReset() {
    const initialValueAttr = this.el.getAttribute('value');
    let initialValue: string | IDateSelection | null = null;
    if (initialValueAttr) {
      try {
        initialValue = JSON.parse(initialValueAttr);
      } catch (e) {
        initialValue = initialValueAttr;
      }
    }
    this.processDateValue(initialValue, true);
    this.tkChange.emit(this.value);
  }

  // dialog contentindeki scroll'u dinleyip scroll olduğunda panelin kapanması için yapıldı
  private handleDialogScroll() {
    if (this.isOpen) {
      this.isOpen = false;
    }
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

  private createWeekDays() {
    const firstDayOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const lastDayOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);
    const daysInPreviousMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 0).getDate();
    const daysInCurrentMonth = lastDayOfMonth.getDate();
    const weeks = [];
    let days = [];
    const resolvedStartOfWeekIndex = this.getResolvedFirstDayIndex();

    const startOfWeekForGetDay = (resolvedStartOfWeekIndex + 1) % 7;

    const firstDayOfWeek = firstDayOfMonth.getDay();
    let emptyCells = (firstDayOfWeek - startOfWeekForGetDay + 7) % 7;

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

  private createWeekDayNames() {
    const startOfWeekIndex = this.getResolvedFirstDayIndex();
    // Use a known Monday as a base to generate other days reliably
    const baseMonday = new Date(2023, 0, 2);

    const weekdays = [...Array(7)].map((_, i) => {
      const dayOffset = (i + startOfWeekIndex) % 7;
      const dateForDay = new Date(baseMonday);
      dateForDay.setDate(baseMonday.getDate() + dayOffset);
      return dateForDay.toLocaleString(this.locale, { weekday: 'short' });
    });

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

  private createTimePicker() {
    let timeToDisplay: { hour: number; minute: number } | null = null;

    if (this.mode === 'single') {
      timeToDisplay = this.internalStartTime;
    } else {
      if (this.internalSelectedDates.end) {
        timeToDisplay = this.internalEndTime;
      } else if (this.internalSelectedDates.start) {
        timeToDisplay = this.internalStartTime;
      }
    }

    const now = new Date();
    const defaultTime = { hour: now.getHours(), minute: now.getMinutes() };
    const currentTime = timeToDisplay || defaultTime;

    let displayHour = currentTime.hour;
    const isPM = displayHour >= 12;
    if (this.timeFormat === '12') {
      displayHour = displayHour % 12 === 0 ? 12 : displayHour % 12;
    }
    const displayMinute = currentTime.minute;

    const currentHour = displayHour;
    const currentMinute = displayMinute;

    const hours = this.timeFormat === '12' ? Array.from({ length: 12 }, (_, i) => i + 1) : Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: Math.ceil(60 / this.minuteStep) }, (_, i) => i * this.minuteStep);

    const sliceRange = (options: number[], selected: number): (number | null)[] => {
      const idx = options.indexOf(selected);
      return Array.from({ length: 4 }, (_, i) => {
        const optIndex = idx - 2 + i;
        return optIndex >= 0 && optIndex < options.length ? options[optIndex] : null;
      });
    };

    const visibleHours = sliceRange(hours, currentHour);
    const visibleMinutes = sliceRange(minutes, currentMinute);

    const isMinHour = currentHour === hours[0];
    const isMaxHour = currentHour === hours[hours.length - 1];
    const isMinMinute = currentMinute === minutes[0];
    const isMaxMinute = currentMinute === minutes[minutes.length - 1];

    return (
      <div class="tk-datepicker-timepicker-panel">
        <div class="tk-datepicker-timepicker-header"></div>
        <div class="tk-datepicker-timepicker-body">
          <div class="tk-datepicker-timepicker-col">
            <div>
              <tk-button variant="neutral" type="text" size="base" icon="expand_less" onTk-click={this.handleDecreaseHour} disabled={isMinHour}></tk-button>
              <div class="tk-datepicker-timepicker-separator"></div>
            </div>
            {visibleHours.map(hour =>
              hour === null ? (
                <div class="tk-datepicker-timepicker-value tk-datepicker-timepicker-value-empty"></div>
              ) : (
                <div
                  class={classNames('tk-datepicker-timepicker-value', {
                    selected: hour === currentHour,
                  })}
                  onClick={() => this.handleHourClick(this.timeFormat === '12' ? (hour % 12) + (isPM ? 12 : 0) : hour)}
                >
                  {hour.toString().padStart(2, '0')}
                </div>
              ),
            )}
            <div>
              <div class="tk-datepicker-timepicker-separator"></div>
              <tk-button variant="neutral" type="text" size="base" icon="expand_more" onTk-click={this.handleIncreaseHour} disabled={isMaxHour}></tk-button>
            </div>
          </div>
          <div class="tk-datepicker-timepicker-col">
            <div>
              <tk-button variant="neutral" type="text" size="base" icon="expand_less" onTk-click={this.handleDecreaseMinute} disabled={isMinMinute}></tk-button>
              <div class="tk-datepicker-timepicker-separator"></div>
            </div>
            {visibleMinutes.map(m =>
              m === null ? (
                <div class="tk-datepicker-timepicker-value tk-datepicker-timepicker-value-empty"></div>
              ) : (
                <div
                  class={classNames('tk-datepicker-timepicker-value', {
                    selected: m === currentMinute,
                  })}
                  onClick={() => this.handleMinuteClick(m)}
                >
                  {String(m).padStart(2, '0')}
                </div>
              ),
            )}
            <div>
              <div class="tk-datepicker-timepicker-separator"></div>
              <tk-button variant="neutral" type="text" size="base" icon="expand_more" onTk-click={this.handleIncreaseMinute} disabled={isMaxMinute}></tk-button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private renderInput() {
    if (this.inline) return null;

    const displayValue = this.formatInputValue();
    const shouldUseMask = this.mode === 'single' && !this.disableMask && !this.showTimePicker;
    const maskOptionsToPass = shouldUseMask ? this.maskOptions : undefined;

    return (
      <tk-input
        ref={el => (this.inputRef = el as HTMLTkInputElement)}
        label={this.label}
        size={this.size}
        mode="text"
        icon={this.icon}
        iconPosition={this.iconPosition}
        class={classNames('tk-datepicker-input', { 'tk-table-input': this.el.classList.contains('tk-table-datepicker') })}
        name={this.name}
        hint={this.hint}
        clearable={this.clearable}
        disabled={this.disabled}
        invalid={this.invalid || this.isInvalid}
        error={this.error}
        placeholder={this.placeholder || (this.showTimePicker ? this.getFullDateTimeFormat() : this.dateFormat).toUpperCase()}
        value={displayValue}
        maskOptions={maskOptionsToPass}
        onTk-change={this.handleInputChange}
        onTk-clear-click={this.handleInputClearClick}
        onTk-blur={this.handleInputBlur}
        onKeyDown={this.handleInputKeyDown}
        onClick={this.handleInputClick}
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
        <div class="tk-datepicker-panel-inner">
          <div class="tk-datepicker-calendar-container">
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
          </div>
          {this.showTimePicker && this.createTimePicker()}
        </div>
        {this.createFooter()}
      </div>
    );
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
