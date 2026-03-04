import { Component, Prop, h, State, Event, EventEmitter, Element, Watch, Fragment, AttachInternals, Method } from '@stencil/core';
import { format, parse, isValid } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import { IInputMaskOptions } from '../tk-input/interfaces';
import { IIconOptions, IMultiIconOptions } from '../../global/interfaces/IIconOptions';
import { ClickOutsideMixin } from '../../utils/clickoutside-mixin';
import { floatingElementAutoUpdate } from '../../utils/position-utils';
import type { IDateSelection } from './interfaces';

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
  private uniqueId = uuidv4();
  private cleanup;
  private isUpdatingAmPm: boolean = false;
  private weeksLength: number = 0;
  private clickOutsideMixin?: ClickOutsideMixin;
  @Element() el: HTMLTkDatepickerElement;

  @AttachInternals() internals: ElementInternals;

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

  @State() internalAmPm: 'AM' | 'PM' = 'AM';
  @Watch('internalAmPm')
  internalAmPmChanged(newValue: 'AM' | 'PM') {
    this.updateTimeBasedOnAmPm(newValue);
  }
  @State() hoverDate: Date | null = null;
  @State() currentView: 'days' | 'months' | 'years' = 'days';
  @State() maskOptions?: IInputMaskOptions;
  @State() isInvalid: boolean = false;
  @State() isOpen: boolean = false;
  @State() concealUntilMeasured: boolean = false;
  @State() calendarTableHeightPx?: number;
  @Watch('isOpen')
  isOpenChanged(newValue: boolean) {
    if (!this.inline) {
      if (newValue) {
        if (this.internalSelectedDates.start) {
          this.currentMonth = new Date(this.internalSelectedDates.start.getFullYear(), this.internalSelectedDates.start.getMonth());
        }
        if (this.showTimePicker) {
          this.concealUntilMeasured = true;
          requestAnimationFrame(() => {
            const h = this.measureCalendarTableHeight();
            if (h > 0) this.calendarTableHeightPx = h;
            this.concealUntilMeasured = false;
          });
        }
      } else {
        // Kullanıcı değişikliklerini uygulamadan paneli kapatırsa, geçici seçimleri temizle
        if (this.allowApplyButton) {
          this.processDateValue(this.value, true);
        }
        this.currentView = 'days';
        this.calendarTableHeightPx = undefined;
        this.concealUntilMeasured = false;
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
    this.remeasureCalendarOnNextFrame();
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
   * Whether the datepicker is read-only
   */
  @Prop() readonly: boolean = false;

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
  @Prop() icon?: string | IIconOptions | IMultiIconOptions = 'calendar_month';

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
   * Whether to require manual confirmation (Apply button) before committing changes.
   * If true, changes are only applied when apply() is called.
   * @defaultValue false
   */
  @Prop() allowApplyButton: boolean = false;

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
  dateFormatChanged() {
    if (this.timeOnly) return;
    this.updateMaskOptions();
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
  @Watch('showTimePicker')
  showTimePickerChanged() {
    this.updateMaskOptions();
  }

  /**
   * Enables time-only mode. In this mode, no date selection is required and the input shows a time mask.
   * When enabled, the panel renders only the time picker and `tk-change` emits a time string (e.g. HH:mm or hh:mm a).
   * @defaultValue false
   */
  @Prop() timeOnly: boolean = false;

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

  @Watch('timeOnly')
  timeOnlyChanged() {
    // Update mask according to the active mode
    this.updateMaskOptions();
  }

  @Watch('timeFormat')
  timeFormatChanged() {
    if (this.timeOnly || this.showTimePicker) {
      this.updateMaskOptions();
      // Sync AM/PM with the current hour when switching to 12h
      if (this.timeFormat === '12' && this.internalStartTime) {
        this.internalAmPm = this.internalStartTime.hour >= 12 ? 'PM' : 'AM';
      }
    }
  }

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
  @Event({ eventName: 'tk-change' }) tkChange: EventEmitter<IDateSelection | string | null>;

  /**
   * Emitted when the input is invalid
   */
  @Event({ eventName: 'tk-invalid' }) tkInvalid: EventEmitter<{ message: string; value: string }>;
  componentWillLoad() {
    this.updateMaskOptions();

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
    // Initialize click outside mixin only if not inline mode
    if (!this.inline) {
      this.clickOutsideMixin = new ClickOutsideMixin({
        referenceElement: this.el,
        handler: this.closeHandler,
        disabled: this.disabled || this.readonly || !this.isOpen,
      });
    }

    if (this.inline && this.showTimePicker) {
      requestAnimationFrame(() => {
        const h = this.measureCalendarTableHeight();
        if (h > 0) this.calendarTableHeightPx = h;
      });
    }
  }

  componentDidUpdate() {
    // Update click outside mixin configuration based on current state
    this.clickOutsideMixin?.updateConfig({
      disabled: this.disabled || this.readonly || this.inline || !this.isOpen,
    });

    if (this.isOpen) {
      if (this.inputRef && this.panelRef) {
        // Clean up old floating UI listeners before setting up new ones
        this.cleanup?.();
        this.updatePosition();
      }
    } else {
      // Remove floating UI listeners when datepicker closes
      this.cleanup?.();
      // Clear reference to allow garbage collection
      this.cleanup = null;
    }
  }

  disconnectedCallback() {
    // Clean up floating UI listeners on component unmount
    this.cleanup?.();
    // Clear reference to allow garbage collection
    this.cleanup = null;
    this.internals?.form?.removeEventListener('reset', this.handleFormReset);

    // Call mixin's disconnectedCallback for cleanup
    this.clickOutsideMixin?.disconnectedCallback();
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
      const defaultTime = this.getDefaultTime();
      this.internalStartTime = defaultTime;
      this.internalEndTime = null;
      if (this.timeFormat === '12') this.internalAmPm = defaultTime.hour >= 12 ? 'PM' : 'AM';
    } else {
      this.internalStartTime = null;
      this.internalEndTime = null;
    }
  }

  /**
   * Applies the current internal selection and emits tk-change
   */
  @Method()
  async apply() {
    this.handleApply();
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

  private updatePosition() {
    const inputEl = this.inputRef!.querySelector('.tk-input') as HTMLElement;
    this.cleanup = floatingElementAutoUpdate(inputEl, this.panelRef, undefined, {
      placement: 'bottom-start',
    });
  }

  private updateTimeBasedOnAmPm(newAmPm: 'AM' | 'PM') {
    if (this.timeFormat !== '12' || this.isUpdatingAmPm) {
      return;
    }

    this.isUpdatingAmPm = true;
    const targetTimeState = this.getTimeStateToModify();
    if (!targetTimeState) {
      this.isUpdatingAmPm = false;
      return;
    }

    // Convert current hour based on AM/PM change
    let currentHour = targetTimeState.time.hour;
    let needsUpdate = false;

    if (newAmPm === 'PM' && currentHour < 12) {
      currentHour += 12;
      needsUpdate = true;
    } else if (newAmPm === 'AM' && currentHour >= 12) {
      currentHour -= 12;
      needsUpdate = true;
    }

    // Only update if the hour actually changed
    if (needsUpdate) {
      if (targetTimeState.type === 'start') {
        this.internalStartTime = { ...targetTimeState.time, hour: currentHour };
      } else {
        this.internalEndTime = { ...targetTimeState.time, hour: currentHour };
      }

      this.emitTimeChange();
    }

    this.isUpdatingAmPm = false;
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

  private getOnlyTimeFormat(): string {
    return this.timeFormat === '12' ? 'hh:mm a' : 'HH:mm';
  }

  private getDefaultTime(): { hour: number; minute: number } {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();

    // Align hour to the configured hourStep (floor to nearest step)
    const hourStep = Math.max(1, this.hourStep || 1);
    hour = Math.floor(hour / hourStep) * hourStep;

    // Align minutes to the configured step (floor to nearest step)
    const step = Math.max(1, this.minuteStep || 1);
    minute = Math.floor(minute / step) * step;

    // Respect optional min/max time bounds if provided
    const toTotalMinutes = (h: number, m: number) => h * 60 + m;
    const currentTotal = toTotalMinutes(hour, minute);

    const parseBound = (val?: string): number | null => {
      if (!val) return null;
      const parsed = this.parseTimeString(val);
      if (!parsed) return null;
      return toTotalMinutes(parsed.getHours(), parsed.getMinutes());
    };

    const minBound = parseBound(this.minTime);
    const maxBound = parseBound(this.maxTime);

    if (minBound !== null && currentTotal < minBound) {
      hour = Math.floor(minBound / 60);
      minute = minBound % 60;
    } else if (maxBound !== null && currentTotal > maxBound) {
      hour = Math.floor(maxBound / 60);
      minute = maxBound % 60;
    }

    return { hour, minute };
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

  private getMaskOptionsFromDateFormat(format: string): void {
    const delimiter = format.match(/[^a-zA-Z]/)?.[0] || '';
    const datePattern: string[] = [];
    const blockSizes: number[] = [];
    const parts = format.split(/[^a-zA-Z]/);

    parts.forEach(part => {
      switch (part.toLowerCase()) {
        case 'yyyy':
          datePattern.push('Y');
          blockSizes.push(4);
          break;
        case 'yy':
          datePattern.push('Y');
          blockSizes.push(2);
          break;
        case 'mm':
        case 'm':
          datePattern.push('m');
          blockSizes.push(2);
          break;
        case 'dd':
        case 'd':
          datePattern.push('d');
          blockSizes.push(2);
          break;
      }
    });

    const dateDelimiters = Array(blockSizes.length - 1).fill(delimiter);

    if (this.showTimePicker) {
      this.maskOptions = {
        blocks: [...blockSizes, 2, 2], // date blocks + HH:MM
        delimiters: [...dateDelimiters, ' ', ':'],
        numericOnly: true,
      };
    } else {
      this.maskOptions = {
        date: true,
        delimiter,
        datePattern,
      };
    }
  }
  private processDateValue(value: string | IDateSelection, updateCurrentMonth: boolean = false): void {
    if (this.timeOnly) {
      // In time-only mode, value is expected to be a time string (e.g., HH:mm or hh:mm a)
      let startTime: { hour: number; minute: number } | null = null;
      if (typeof value === 'string' && value) {
        const parsed = this.parseTimeString(value);
        if (parsed) {
          startTime = { hour: parsed.getHours(), minute: parsed.getMinutes() };
        }
      }
      // For initial load, set AM/PM based on actual time, but respect user changes after that
      if (this.timeFormat === '12' && startTime) {
        // Only set if this is the initial default state, otherwise respect user choice
        if (this.internalAmPm === 'AM' && startTime.hour >= 12) {
          this.internalAmPm = 'PM';
        }
      }

      this.internalStartTime = startTime;
      this.internalEndTime = startTime;
      // Do not set any dates in time-only mode
      this.internalSelectedDates = { start: null, end: null };
      this.inputValue = this.formatInputValue();
      return;
    }
    let startDate: Date | null = null;
    let endDate: Date | null = null;
    let startTime: { hour: number; minute: number } | null = null;
    let endTime: { hour: number; minute: number } | null = null;
    const now = new Date();
    const defaultTime = this.getDefaultTime();

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
      const defaultTime = this.getDefaultTime();
      this.internalStartTime = defaultTime;
      if (this.timeFormat === '12') this.internalAmPm = defaultTime.hour >= 12 ? 'PM' : 'AM';
      if (this.mode === 'range' && !this.internalEndTime && this.internalSelectedDates.end) {
        this.internalEndTime = this.internalStartTime;
      } else if (this.mode === 'single') {
        this.internalEndTime = this.internalStartTime;
      }
    }

    this.inputValue = this.formatInputValue();
  }

  private measureCalendarTableHeight(): number {
    const table = this.panelRef?.querySelector('.tk-datepicker-table') as HTMLTableElement | null;
    return table ? Math.ceil(table.getBoundingClientRect().height) : 0;
  }

  private remeasureCalendarOnNextFrame = () => {
    if (!(this.showTimePicker && (this.inline || this.isOpen))) return;
    requestAnimationFrame(() => {
      const h = this.measureCalendarTableHeight();
      if (h > 0) this.calendarTableHeightPx = h;
    });
  };

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
    if (this.timeOnly) {
      if (!this.internalStartTime) return '';
      const temp = new Date();
      temp.setHours(this.internalStartTime.hour, this.internalStartTime.minute, 0, 0);
      return format(temp, this.getOnlyTimeFormat());
    }
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
    return null;
  }

  private parseTimeString(timeString: string): Date | null {
    const base = new Date();
    const primaryFmt = this.getOnlyTimeFormat();
    let parsed = parse(timeString, primaryFmt, base);
    if (isValid(parsed) && format(parsed, primaryFmt) === timeString) {
      return parsed;
    }
    // Fallbacks
    // 1) In 12h mode, allow typing time without AM/PM (e.g., "11:00").
    //    We interpret it using the current AM/PM selection.
    if (this.timeFormat === '12') {
      const simpleMatch = timeString.match(/^(\d{1,2}):(\d{2})$/);
      if (simpleMatch) {
        let hour = parseInt(simpleMatch[1], 10);
        const minute = parseInt(simpleMatch[2], 10);
        if (Number.isFinite(hour) && Number.isFinite(minute) && minute >= 0 && minute <= 59) {
          if (this.internalAmPm === 'PM' && hour < 12) hour += 12;
          if (this.internalAmPm === 'AM' && hour === 12) hour = 0;
          const t = new Date(base);
          t.setHours(Math.max(0, Math.min(23, hour)), minute, 0, 0);
          return t;
        }
      }
      // Also accept explicit 24h input (HH:mm) and convert to a Date directly
      const alt24 = parse(timeString, 'HH:mm', base);
      if (isValid(alt24) && format(alt24, 'HH:mm') === timeString) {
        return alt24;
      }
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

    if (this.disabledWeekDays && this.disabledWeekDays.length > 0) {
      const dayOfWeek = date.getDay();
      return this.disabledWeekDays.includes(dayOfWeek);
    }

    return false;
  }

  private formatInputValue(): string {
    if (this.timeOnly) {
      if (this.internalStartTime) {
        const temp = new Date();
        temp.setHours(this.internalStartTime.hour, this.internalStartTime.minute, 0, 0);
        return format(temp, this.getOnlyTimeFormat());
      }
      return '';
    }
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
    if (this.timeOnly) {
      // In time-only mode, prefer parsing the current input value instead of resetting to default
      if (!this.internalStartTime) {
        let parsedFromInput: Date | null = null;
        if (this.inputValue) {
          parsedFromInput = this.parseTimeString(this.inputValue);
        }
        const resolvedTime = parsedFromInput ? { hour: parsedFromInput.getHours(), minute: parsedFromInput.getMinutes() } : this.getDefaultTime();
        this.internalStartTime = resolvedTime;
        this.internalEndTime = resolvedTime;
        if (this.timeFormat === '12') this.internalAmPm = resolvedTime.hour >= 12 ? 'PM' : 'AM';
      }
      return;
    }
    if (!this.internalSelectedDates.start && type === 'start') {
      const today = this.normalizeDate(new Date());
      this.internalSelectedDates = { ...this.internalSelectedDates, start: today };
      this.currentMonth = new Date(today);
    }
    if (!this.internalSelectedDates.end && type === 'end' && this.mode === 'range') {
      return; // Don't initialize end date if not set
    }

    if (this.showTimePicker) {
      const defaultTime = this.getDefaultTime();
      if (type === 'start' && !this.internalStartTime) {
        this.internalStartTime = defaultTime;
        if (this.timeFormat === '12') this.internalAmPm = defaultTime.hour >= 12 ? 'PM' : 'AM';
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
    // Apply buttona basılmadıkça anlık değişiklikleri emit etmesin diye
    if (this.allowApplyButton) return;
    if (this.timeOnly) {
      if (!this.internalStartTime) return;
      const temp = new Date();
      temp.setHours(this.internalStartTime.hour, this.internalStartTime.minute, 0, 0);
      const value = format(temp, this.getOnlyTimeFormat());
      this.tkChange.emit(value);
      this.inputValue = this.formatInputValue();
      return;
    }
    if (!this.showTimePicker || !this.internalSelectedDates.start) return;

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
  private updateMaskOptions() {
    if (this.timeOnly) {
      // timeformat'a göre mask options'ları belirle
      this.maskOptions = {
        time: true,
        timePattern: ['h', 'm'],
        timeFormat: this.timeFormat,
      };
    } else {
      this.getMaskOptionsFromDateFormat(this.dateFormat);
    }
  }
  /**
   * Click outside handler implementation - called by the mixin
   */
  private closeHandler = (): void => {
    if (this.inline) return;
    this.isOpen = false;
  };

  private getTimeStateToModify(): { time: { hour: number; minute: number }; type: 'start' | 'end' } | null {
    // Allow time changes if any time UI is active: showTimePicker or timeOnly mode
    if (!(this.showTimePicker || this.timeOnly)) return null;

    let targetType: 'start' | 'end' = 'start';
    if (this.mode === 'range' && this.internalSelectedDates.end) {
      targetType = 'end';
    }

    this.ensureDateTimeInitialized(targetType);

    const timeState = targetType === 'start' ? this.internalStartTime : this.internalEndTime;

    if (!timeState) return null;

    return { time: timeState, type: targetType };
  }

  private handleApply = () => {
    const { start, end } = this.internalSelectedDates;
    let emitValue: IDateSelection | string | null = null;

    if (this.timeOnly) {
      if (this.internalStartTime) {
        const tempDate = new Date();
        tempDate.setHours(this.internalStartTime.hour, this.internalStartTime.minute, 0, 0);
        emitValue = format(tempDate, this.getOnlyTimeFormat());
      }
    } else {
      const formattedStart = start ? this.formatDateOrDateTime(start, 'start') : null;
      if (this.mode === 'range') {
        emitValue = {
          start: formattedStart || '',
          end: end ? this.formatDateOrDateTime(end, 'end') : undefined,
        };
      } else {
        emitValue = formattedStart;
      }
    }

    this.inputValue = this.formatInputValue();
    this.value = emitValue;
    this.tkChange.emit(emitValue);

    const isEndSelected = this.mode === 'range' ? !!this.internalSelectedDates.end : true;
    if (!this.inline && this.isOpen && !this.showTimePicker && isEndSelected) {
      this.isOpen = false;
    }
    this.isInvalid = false;
    this.currentView = 'days';
  };

  private handleIncreaseHour = () => {
    const targetTimeState = this.getTimeStateToModify();
    if (!targetTimeState) return;

    if (this.timeFormat === '12') {
      const hoursList = Array.from({ length: Math.ceil(12 / this.hourStep) }, (_, i) => i * this.hourStep + 1);
      let displayHour = targetTimeState.time.hour % 12;
      displayHour = displayHour === 0 ? 12 : displayHour;

      // Find closest hour in step list
      const closestHour = hoursList.reduce((prev, curr) => (Math.abs(curr - displayHour) < Math.abs(prev - displayHour) ? curr : prev));

      const idx = hoursList.indexOf(closestHour);
      const nextIdx = Math.min(idx + 1, hoursList.length - 1);
      const newDisplayHour = hoursList[nextIdx];

      // Convert back to 24-hour format
      let newHour24 = newDisplayHour === 12 ? 0 : newDisplayHour;
      if (this.internalAmPm === 'PM') {
        newHour24 += 12;
      }

      if (targetTimeState.type === 'start') {
        this.internalStartTime = { ...targetTimeState.time, hour: newHour24 };
      } else {
        this.internalEndTime = { ...targetTimeState.time, hour: newHour24 };
      }
    } else {
      // 24h mode - move to next hour in step list
      const hoursList = Array.from({ length: Math.ceil(24 / this.hourStep) }, (_, i) => i * this.hourStep);

      // Find closest hour in step list
      const closestHour = hoursList.reduce((prev, curr) => (Math.abs(curr - targetTimeState.time.hour) < Math.abs(prev - targetTimeState.time.hour) ? curr : prev));

      const idx = hoursList.indexOf(closestHour);
      const nextIdx = Math.min(idx + 1, hoursList.length - 1);
      const hour = hoursList[nextIdx];

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
      const hoursList = Array.from({ length: Math.ceil(12 / this.hourStep) }, (_, i) => i * this.hourStep + 1);
      let displayHour = targetTimeState.time.hour % 12;
      displayHour = displayHour === 0 ? 12 : displayHour;

      // Find closest hour in step list
      const closestHour = hoursList.reduce((prev, curr) => (Math.abs(curr - displayHour) < Math.abs(prev - displayHour) ? curr : prev));

      const idx = hoursList.indexOf(closestHour);
      const prevIdx = Math.max(idx - 1, 0);
      const newDisplayHour = hoursList[prevIdx];

      // Convert back to 24-hour format
      let newHour24 = newDisplayHour === 12 ? 0 : newDisplayHour;
      if (this.internalAmPm === 'PM') {
        newHour24 += 12;
      }

      if (targetTimeState.type === 'start') {
        this.internalStartTime = { ...targetTimeState.time, hour: newHour24 };
      } else {
        this.internalEndTime = { ...targetTimeState.time, hour: newHour24 };
      }
    } else {
      // 24h mode - move to previous hour in step list
      const hoursList = Array.from({ length: Math.ceil(24 / this.hourStep) }, (_, i) => i * this.hourStep);

      // Find closest hour in step list
      const closestHour = hoursList.reduce((prev, curr) => (Math.abs(curr - targetTimeState.time.hour) < Math.abs(prev - targetTimeState.time.hour) ? curr : prev));

      const idx = hoursList.indexOf(closestHour);
      const prevIdx = Math.max(idx - 1, 0);
      const hour = hoursList[prevIdx];

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

    const minutesList = Array.from({ length: Math.ceil(60 / this.minuteStep) }, (_, i) => i * this.minuteStep);

    // Find closest minute in step list
    const closestMinute = minutesList.reduce((prev, curr) => (Math.abs(curr - targetTimeState.time.minute) < Math.abs(prev - targetTimeState.time.minute) ? curr : prev));

    const idx = minutesList.indexOf(closestMinute);
    const nextIdx = Math.min(idx + 1, minutesList.length - 1);
    const minute = minutesList[nextIdx];

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

    const minutesList = Array.from({ length: Math.ceil(60 / this.minuteStep) }, (_, i) => i * this.minuteStep);

    // Find closest minute in step list
    const closestMinute = minutesList.reduce((prev, curr) => (Math.abs(curr - targetTimeState.time.minute) < Math.abs(prev - targetTimeState.time.minute) ? curr : prev));

    const idx = minutesList.indexOf(closestMinute);
    const prevIdx = Math.max(idx - 1, 0);
    const minute = minutesList[prevIdx];

    if (targetTimeState.type === 'start') {
      this.internalStartTime = { ...targetTimeState.time, minute: minute };
    } else {
      this.internalEndTime = { ...targetTimeState.time, minute: minute };
    }
    this.emitTimeChange();
  };

  private handleMinuteClick = (min: number) => {
    if (this.disabled || this.readonly) return;
    const targetTimeState = this.getTimeStateToModify();
    if (!targetTimeState) return;

    if (targetTimeState.type === 'start') {
      this.internalStartTime = { ...targetTimeState.time, minute: min };
    } else {
      this.internalEndTime = { ...targetTimeState.time, minute: min };
    }
    this.emitTimeChange();
  };

  private handleAmPmToggle = (event: CustomEvent) => {
    // Prevent inner toggle group's tk-change from leaking outside and overwriting consumer value
    if (this.disabled || this.readonly) return;
    event.stopPropagation();
    if (this.timeFormat !== '12') return;

    const newAmPm = event.detail as 'AM' | 'PM';

    // Just update the state - the watcher will handle the time conversion
    this.internalAmPm = newAmPm;
  };

  private handleInputClick = (e: MouseEvent) => {
    if (this.disabled || this.readonly) {
      e.preventDefault();
      return;
    }

    this.isOpen = !this.isOpen;
    this.remeasureCalendarOnNextFrame();
  };

  private handleDateClick = (date: Date) => {
    if (this.disabled || this.readonly || this.isDateDisabled(date)) return;

    const normalizedDate = this.normalizeDate(date);
    const defaultTime = this.getDefaultTime();

    if (this.mode === 'single') {
      this.internalSelectedDates = { start: normalizedDate, end: null };
      if (this.showTimePicker) {
        if (!this.internalStartTime) {
          this.internalStartTime = defaultTime;
          if (this.timeFormat === '12') this.internalAmPm = defaultTime.hour >= 12 ? 'PM' : 'AM';
        }
      } else {
        this.internalStartTime = null;
      }
      this.internalEndTime = this.internalStartTime;

      if (!this.inline && !this.showTimePicker && !this.allowApplyButton) {
        this.isOpen = false;
      }
    } else if (this.mode === 'range') {
      const { start, end } = this.internalSelectedDates;

      if (!start || (start && end)) {
        this.internalSelectedDates = { start: normalizedDate, end: null };
        if (this.showTimePicker) {
          if (!this.internalStartTime) {
            this.internalStartTime = defaultTime;
            if (this.timeFormat === '12') this.internalAmPm = defaultTime.hour >= 12 ? 'PM' : 'AM';
          }
          this.internalEndTime = null;
        } else {
          this.internalStartTime = null;
          this.internalEndTime = null;
        }
        this.hoverDate = null;
      } else {
        let newStart: Date;
        let newEnd: Date | null;

        if (normalizedDate < start) {
          newStart = normalizedDate;
          newEnd = start;
          if (this.showTimePicker) {
            const tempTime = this.internalStartTime;
            this.internalStartTime = this.internalEndTime || this.internalStartTime || defaultTime;
            this.internalEndTime = tempTime || defaultTime;
          }
        } else {
          newStart = start;
          newEnd = normalizedDate;
          if (this.showTimePicker && !this.internalEndTime) {
            this.internalEndTime = this.internalStartTime || defaultTime;
          }
        }
        this.internalSelectedDates = { start: newStart, end: newEnd };

        this.hoverDate = null;

        if (!this.inline && !this.showTimePicker && !this.allowApplyButton) {
          this.isOpen = false;
        }
      }
    }
    // if swap occurred, bail
    if (!this.ensureRangeOrder()) {
      return;
    }
    this.remeasureCalendarOnNextFrame();
    if (!this.allowApplyButton) {
      this.handleApply();
    }
    this.isInvalid = false;
  };

  private handleInputKeyDown = (event: KeyboardEvent) => {
    if (this.timeOnly) return; // let time mask/type
    if (this.disableMask || this.mode === 'range') {
      event.preventDefault();
    }
  };

  private handleInputChange = (event: CustomEvent) => {
    if (this.disableMask || this.mode === 'range') {
      event.preventDefault();
      return;
    }
    this.remeasureCalendarOnNextFrame();
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

  private handleInputInput = () => {
    if (this.disableMask || this.mode === 'range') return;

    clearTimeout(this.debounceTimer);
    this.debounceTimer = window.setTimeout(() => {
      if (this.inputValue) {
        if (this.timeOnly) {
          const parsedTime = this.parseTimeString(this.inputValue);
          if (parsedTime) {
            this.internalStartTime = { hour: parsedTime.getHours(), minute: parsedTime.getMinutes() };
            this.internalEndTime = this.internalStartTime;
            this.isInvalid = false;
            if (!this.allowApplyButton) {
              this.tkChange.emit(format(parsedTime, this.getOnlyTimeFormat()));
            }
          } else if (!this.allowApplyButton) {
            this.isInvalid = true;
            this.tkInvalid.emit({ message: 'Invalid time format', value: this.inputValue });
            this.tkChange.emit(undefined);
          }
        } else {
          const parser = this.showTimePicker ? this.parseFullDateTime.bind(this) : this.parseInputDate.bind(this);
          const parsedDate = parser(this.inputValue);

          if (parsedDate && !this.isDateDisabled(parsedDate)) {
            const normalized = this.normalizeDate(parsedDate);
            this.internalSelectedDates = {
              start: normalized,
              end: null,
            };
            let formattedValue;
            if (this.showTimePicker) {
              const time = { hour: parsedDate.getHours(), minute: parsedDate.getMinutes() };
              this.internalStartTime = time;
              this.internalEndTime = time;
              formattedValue = format(parsedDate, this.getFullDateTimeFormat());
            } else {
              this.internalStartTime = null;
              this.internalEndTime = null;
              formattedValue = this.formatDateOrDateTime(parsedDate, 'start');
            }

            this.isInvalid = false;
            this.tkChange.emit(formattedValue);
          } else if (!this.allowApplyButton) {
            this.isInvalid = true;
            this.tkInvalid.emit({ message: 'Invalid date format', value: this.inputValue });
          }
        }
      } else {
        this.isInvalid = false;
        this.internalSelectedDates = { start: null, end: null };
        this.internalStartTime = null;
        this.internalEndTime = null;
        if (!this.allowApplyButton) {
          this.tkChange.emit(undefined);
        }
      }
    }, 300);
  };

  private handleDateHover = (date: Date) => {
    if (this.mode === 'range' && this.internalSelectedDates.start && !this.internalSelectedDates.end) {
      this.hoverDate = date;
    }
    this.remeasureCalendarOnNextFrame();
  };

  private handleMonthChange = (increment: number) => {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + increment);
    this.remeasureCalendarOnNextFrame();
  };

  private handleYearChange = (increment: number) => {
    if (this.currentView === 'years') {
      this.currentMonth = new Date(this.currentMonth.getFullYear() + increment * 12, this.currentMonth.getMonth());
      return;
    }

    this.currentMonth = new Date(this.currentMonth.getFullYear() + increment, this.currentMonth.getMonth());
    this.remeasureCalendarOnNextFrame();
  };

  private handleYearSelect(e: MouseEvent, year: number): void {
    e.stopPropagation();
    this.currentMonth = new Date(year, this.currentMonth.getMonth());
    this.currentView = 'months';
    this.remeasureCalendarOnNextFrame();
  }

  private handleViewChange = (e: MouseEvent, view: 'days' | 'months' | 'years') => {
    e.stopPropagation();
    this.currentView = view;
    this.remeasureCalendarOnNextFrame();
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
          'disabled': isDisabled || this.disabled,
          'readonly': this.readonly,
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
    this.weeksLength = weeks.length;
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
            <tk-button
              variant={this.headerType === 'primary' || this.headerType === 'dark' ? 'white' : 'neutral'}
              icon="keyboard_double_arrow_left"
              onTk-click={() => this.handleYearChange(-1)}
              type="text"
              disabled={this.readonly || this.disabled}
            ></tk-button>
            <span class="tk-datepicker-divider"></span>
            <tk-button
              variant={this.headerType === 'primary' || this.headerType === 'dark' ? 'white' : 'neutral'}
              icon="chevron_left"
              onTk-click={() => this.handleMonthChange(-1)}
              type="text"
              disabled={this.readonly || this.disabled}
            ></tk-button>
          </div>
          <div class="tk-datepicker-select-container">
            <div class={classNames('tk-datepicker-select-month', { disabled: this.readonly || this.disabled })} onClick={e => this.handleViewChange(e, 'months')}>
              {monthName}
            </div>
            <div class={classNames('tk-datepicker-select-year', { disabled: this.readonly || this.disabled })} onClick={e => this.handleViewChange(e, 'years')}>
              {year}
            </div>
          </div>
          <div class="tk-datepicker-header-content-end">
            <tk-button
              variant={this.headerType === 'primary' || this.headerType === 'dark' ? 'white' : 'neutral'}
              icon="chevron_right"
              onTk-click={() => this.handleMonthChange(1)}
              type="text"
              disabled={this.readonly || this.disabled}
            ></tk-button>
            <span class="tk-datepicker-divider"></span>
            <tk-button
              variant={this.headerType === 'primary' || this.headerType === 'dark' ? 'white' : 'neutral'}
              icon="keyboard_double_arrow_right"
              onTk-click={() => this.handleYearChange(1)}
              type="text"
              disabled={this.readonly || this.disabled}
            ></tk-button>
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

    const defaultTime = this.getDefaultTime();
    const currentTime = timeToDisplay || defaultTime;

    let displayHour = currentTime.hour;

    if (this.timeFormat === '12') {
      displayHour = displayHour % 12 === 0 ? 12 : displayHour % 12;
    }
    const displayMinute = currentTime.minute;

    const hours =
      this.timeFormat === '12'
        ? Array.from({ length: Math.ceil(12 / this.hourStep) }, (_, i) => i * this.hourStep + 1)
        : Array.from({ length: Math.ceil(24 / this.hourStep) }, (_, i) => i * this.hourStep);
    const minutes = Array.from({ length: Math.ceil(60 / this.minuteStep) }, (_, i) => i * this.minuteStep);

    // Find closest hour in the hours array
    const findClosestInArray = (value: number, arr: number[]): number => {
      if (arr.includes(value)) return value;
      // Find the closest value in the array
      return arr.reduce((prev, curr) => (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev));
    };

    const currentHour = findClosestInArray(displayHour, hours);
    const currentMinute = findClosestInArray(displayMinute, minutes);

    const sliceRange = (options: number[], selected: number): (number | null)[] => {
      const idx = options.indexOf(selected);
      return Array.from({ length: this.weeksLength === 6 ? 5 : this.weeksLength === 4 ? 3 : 4 }, (_, i) => {
        const optIndex = idx - (this.weeksLength === 4 ? 1 : 2) + i;
        return optIndex >= 0 && optIndex < options.length ? options[optIndex] : null;
      });
    };
    const isDisabled = this.disabled || this.readonly;
    const visibleHours = sliceRange(hours, currentHour);
    const visibleMinutes = sliceRange(minutes, currentMinute);

    const isMinHour = currentHour === hours[0];
    const isMaxHour = currentHour === hours[hours.length - 1];
    const isMinMinute = currentMinute === minutes[0];
    const isMaxMinute = currentMinute === minutes[minutes.length - 1];
    return (
      <div class={classNames('tk-datepicker-timepicker-panel', this.timeOnly && 'tk-datepicker-timepicker-panel-only')}>
        <div class={classNames('tk-datepicker-timepicker-header', `tk-datepicker-timepicker-header-${this.headerType}`, this.timeOnly && 'tk-datepicker-timepicker-header-only')}>
          {this.timeFormat === '12' && (
            <tk-toggle-button-group
              value={this.internalAmPm}
              type={this.headerType === 'basic' ? 'basic' : this.headerType === 'light' ? 'light' : 'divided'}
              onTk-change={e => this.handleAmPmToggle(e)}
              class="tk-datepicker-ampm-toggle"
            >
              <tk-toggle-button
                key="AM"
                type={this.headerType === 'primary' || this.headerType === 'dark' ? 'filled' : 'text'}
                variant={this.headerType === 'dark' ? 'neutral' : 'primary'}
                value="AM"
                label="AM"
                size="small"
                disabled={isDisabled}
              />
              <tk-toggle-button
                key="PM"
                type={this.headerType === 'primary' || this.headerType === 'dark' ? 'filled' : 'text'}
                variant={this.headerType === 'dark' ? 'neutral' : 'primary'}
                value="PM"
                label="PM"
                size="small"
                disabled={isDisabled}
              />
            </tk-toggle-button-group>
          )}
        </div>
        <div
          class={classNames(
            'tk-datepicker-timepicker-body',
            ['primary', 'light', 'dark'].includes(this.headerType as any) && `tk-datepicker-timepicker-body-${this.headerType}`,
            this.weeksLength === 4 && 'tk-datepicker-timepicker-body-4-weeks',
            this.timeOnly && 'tk-datepicker-timepicker-body-only',
          )}
          style={{
            height: this.calendarTableHeightPx ? `${this.calendarTableHeightPx}px` : undefined,
          }}
        >
          <div class="tk-datepicker-timepicker-col">
            <div>
              <tk-button
                variant="neutral"
                type="text"
                size="base"
                icon={{
                  name: 'expand_less',
                  color: this.headerType === 'dark' ? 'var(--icon-base)' : this.headerType === 'primary' ? 'var(--primary-100)' : 'var(--icon-sub-base)',
                }}
                onTk-click={this.handleDecreaseHour}
                disabled={isMinHour || isDisabled}
              ></tk-button>
              <div
                class={classNames('tk-datepicker-timepicker-separator', {
                  'tk-datepicker-timepicker-separator-dark': this.headerType === 'dark',
                  'tk-datepicker-timepicker-separator-primary': this.headerType === 'primary',
                })}
              ></div>
            </div>
            {visibleHours.map(hour =>
              hour === null ? (
                <div class={classNames('tk-datepicker-timepicker-value tk-datepicker-timepicker-value-empty', { disabled: isDisabled })}></div>
              ) : (
                <div
                  class={classNames('tk-datepicker-timepicker-value', {
                    'selected': hour === currentHour,
                    'tk-datepicker-timepicker-value-dark': this.headerType === 'dark',
                    'tk-datepicker-timepicker-value-primary': this.headerType === 'primary',
                    'disabled': isDisabled,
                  })}
                  onClick={() => {
                    if (isDisabled) {
                      return;
                    } else if (this.timeFormat === '12') {
                      const hour24 = (hour === 12 ? 0 : hour) + (this.internalAmPm === 'PM' ? 12 : 0);
                      this.handleHourClick(hour24);
                    } else {
                      this.handleHourClick(hour);
                    }
                  }}
                >
                  {hour.toString().padStart(2, '0')}
                </div>
              ),
            )}
            <div>
              <div
                class={classNames('tk-datepicker-timepicker-separator', {
                  'tk-datepicker-timepicker-separator-dark': this.headerType === 'dark',
                  'tk-datepicker-timepicker-separator-primary': this.headerType === 'primary',
                })}
              ></div>
              <tk-button
                variant="neutral"
                type="text"
                size="base"
                icon={{
                  name: 'expand_more',
                  color: this.headerType === 'dark' ? 'var(--icon-sub-base)' : this.headerType === 'primary' ? 'var(--primary-50)' : 'var(--icon-base)',
                }}
                onTk-click={this.handleIncreaseHour}
                disabled={isMaxHour || isDisabled}
              ></tk-button>
            </div>
          </div>
          <div class="tk-datepicker-timepicker-col">
            <div>
              <tk-button
                variant="neutral"
                type="text"
                size="base"
                icon={{
                  name: 'expand_less',
                  color: this.headerType === 'dark' ? 'var(--icon-base)' : this.headerType === 'primary' ? 'var(--primary-100)' : 'var(--icon-sub-base)',
                }}
                onTk-click={this.handleDecreaseMinute}
                disabled={isMinMinute || isDisabled}
              ></tk-button>
              <div
                class={classNames('tk-datepicker-timepicker-separator', {
                  'tk-datepicker-timepicker-separator-dark': this.headerType === 'dark',
                  'tk-datepicker-timepicker-separator-primary': this.headerType === 'primary',
                })}
              ></div>
            </div>
            {visibleMinutes.map(m =>
              m === null ? (
                <div class={classNames('tk-datepicker-timepicker-value tk-datepicker-timepicker-value-empty', { disabled: isDisabled })}></div>
              ) : (
                <div
                  class={classNames('tk-datepicker-timepicker-value', {
                    'selected': m === currentMinute,
                    'tk-datepicker-timepicker-value-dark': this.headerType === 'dark',
                    'tk-datepicker-timepicker-value-primary': this.headerType === 'primary',
                    'disabled': isDisabled,
                  })}
                  onClick={() => this.handleMinuteClick(m)}
                >
                  {String(m).padStart(2, '0')}
                </div>
              ),
            )}
            <div>
              <div
                class={classNames('tk-datepicker-timepicker-separator', {
                  'tk-datepicker-timepicker-separator-dark': this.headerType === 'dark',
                  'tk-datepicker-timepicker-separator-primary': this.headerType === 'primary',
                })}
              ></div>
              <tk-button
                variant="neutral"
                type="text"
                size="base"
                icon={{
                  name: 'expand_more',
                  color: this.headerType === 'dark' ? 'var(--icon-sub-base)' : this.headerType === 'primary' ? 'var(--primary-50)' : 'var(--icon-base)',
                }}
                onTk-click={this.handleIncreaseMinute}
                disabled={isMaxMinute || isDisabled}
              ></tk-button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private renderInput() {
    if (this.inline) return null;

    const shouldUseMask = !this.disableMask && this.mode !== 'range';
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
        readonly={this.readonly}
        error={this.error}
        placeholder={this.placeholder || (this.timeOnly ? this.getOnlyTimeFormat() : this.showTimePicker ? this.getFullDateTimeFormat() : this.dateFormat).toUpperCase()}
        value={this.inputValue}
        maskOptions={maskOptionsToPass}
        onTk-change={this.handleInputChange}
        onTk-clear-click={this.handleInputClearClick}
        onInput={this.handleInputInput}
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

    // Time-only mode: render only time picker
    if (this.timeOnly) {
      return (
        <div
          class={panelClasses}
          ref={el => (this.panelRef = el as HTMLDivElement)}
          role={!this.inline ? 'dialog' : undefined}
          aria-modal="true"
          data-tk-datepicker-id={this.uniqueId}
        >
          <div class="tk-datepicker-panel-inner">{this.createTimePicker()}</div>
          {this.createFooter()}
        </div>
      );
    }

    // Default: date (calendar), optionally alongside time picker
    return (
      <div
        class={panelClasses}
        ref={el => (this.panelRef = el as HTMLDivElement)}
        role={!this.inline ? 'dialog' : undefined}
        aria-modal="true"
        data-tk-datepicker-id={this.uniqueId}
        style={{ visibility: this.concealUntilMeasured ? 'hidden' : undefined }}
      >
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
