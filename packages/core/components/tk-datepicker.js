import { p as proxyCustomElement, H, c as createEvent, h, F as Fragment } from './p-F5eU3Bfi.js';
import { a as autoUpdate, c as computePosition, o as offset, f as flip, s as shift } from './p-B0XocndT.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { d as defineCustomElement$6 } from './p-DOzOzA8V.js';
import { d as defineCustomElement$5 } from './p-VOpLmPkP.js';
import { d as defineCustomElement$4 } from './p-75KyitY6.js';
import { d as defineCustomElement$3 } from './p-C9ySY_bP.js';
import { d as defineCustomElement$2 } from './p-BkhDFlMy.js';
import { v as v4 } from './p-BF0_OXTe.js';

var dateFns = {};

var add = {};

var addDays = {};

var toDate = {};

var hasRequiredToDate;

function requireToDate() {
  if (hasRequiredToDate) return toDate;
  hasRequiredToDate = 1;
  toDate.toDate = toDate$1;

  /**
   * @name toDate
   * @category Common Helpers
   * @summary Convert the given argument to an instance of Date.
   *
   * @description
   * Convert the given argument to an instance of Date.
   *
   * If the argument is an instance of Date, the function returns its clone.
   *
   * If the argument is a number, it is treated as a timestamp.
   *
   * If the argument is none of the above, the function returns Invalid Date.
   *
   * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param argument - The value to convert
   *
   * @returns The parsed date in the local time zone
   *
   * @example
   * // Clone the date:
   * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
   * //=> Tue Feb 11 2014 11:30:30
   *
   * @example
   * // Convert the timestamp to date:
   * const result = toDate(1392098430000)
   * //=> Tue Feb 11 2014 11:30:30
   */
  function toDate$1(argument) {
    const argStr = Object.prototype.toString.call(argument);

    // Clone the date
    if (argument instanceof Date || (typeof argument === 'object' && argStr === '[object Date]')) {
      // Prevent the date to lose the milliseconds when passed to new Date() in IE10
      return new argument.constructor(+argument);
    } else if (typeof argument === 'number' || argStr === '[object Number]' || typeof argument === 'string' || argStr === '[object String]') {
      // TODO: Can we get rid of as?
      return new Date(argument);
    } else {
      // TODO: Can we get rid of as?
      return new Date(NaN);
    }
  }
  return toDate;
}

var constructFrom = {};

var hasRequiredConstructFrom;

function requireConstructFrom() {
  if (hasRequiredConstructFrom) return constructFrom;
  hasRequiredConstructFrom = 1;
  constructFrom.constructFrom = constructFrom$1;

  /**
   * @name constructFrom
   * @category Generic Helpers
   * @summary Constructs a date using the reference date and the value
   *
   * @description
   * The function constructs a new date using the constructor from the reference
   * date and the given value. It helps to build generic functions that accept
   * date extensions.
   *
   * It defaults to `Date` if the passed reference date is a number or a string.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The reference date to take constructor from
   * @param value - The value to create the date
   *
   * @returns Date initialized using the given date and value
   *
   * @example
   * import { constructFrom } from 'date-fns'
   *
   * // A function that clones a date preserving the original type
   * function cloneDate<DateType extends Date(date: DateType): DateType {
   *   return constructFrom(
   *     date, // Use contrustor from the given date
   *     date.getTime() // Use the date value to create a new date
   *   )
   * }
   */
  function constructFrom$1(date, value) {
    if (date instanceof Date) {
      return new date.constructor(value);
    } else {
      return new Date(value);
    }
  }
  return constructFrom;
}

var hasRequiredAddDays;

function requireAddDays() {
  if (hasRequiredAddDays) return addDays;
  hasRequiredAddDays = 1;
  addDays.addDays = addDays$1;
  var _index = /*@__PURE__*/ requireToDate();
  var _index2 = /*@__PURE__*/ requireConstructFrom();

  /**
   * @name addDays
   * @category Day Helpers
   * @summary Add the specified number of days to the given date.
   *
   * @description
   * Add the specified number of days to the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param amount - The amount of days to be added.
   *
   * @returns The new date with the days added
   *
   * @example
   * // Add 10 days to 1 September 2014:
   * const result = addDays(new Date(2014, 8, 1), 10)
   * //=> Thu Sep 11 2014 00:00:00
   */
  function addDays$1(date, amount) {
    const _date = (0, _index.toDate)(date);
    if (isNaN(amount)) return (0, _index2.constructFrom)(date, NaN);
    if (!amount) {
      // If 0 days, no-op to avoid changing times in the hour before end of DST
      return _date;
    }
    _date.setDate(_date.getDate() + amount);
    return _date;
  }
  return addDays;
}

var addMonths = {};

var hasRequiredAddMonths;

function requireAddMonths() {
  if (hasRequiredAddMonths) return addMonths;
  hasRequiredAddMonths = 1;
  addMonths.addMonths = addMonths$1;
  var _index = /*@__PURE__*/ requireToDate();
  var _index2 = /*@__PURE__*/ requireConstructFrom();

  /**
   * @name addMonths
   * @category Month Helpers
   * @summary Add the specified number of months to the given date.
   *
   * @description
   * Add the specified number of months to the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param amount - The amount of months to be added.
   *
   * @returns The new date with the months added
   *
   * @example
   * // Add 5 months to 1 September 2014:
   * const result = addMonths(new Date(2014, 8, 1), 5)
   * //=> Sun Feb 01 2015 00:00:00
   *
   * // Add one month to 30 January 2023:
   * const result = addMonths(new Date(2023, 0, 30), 1)
   * //=> Tue Feb 28 2023 00:00:00
   */
  function addMonths$1(date, amount) {
    const _date = (0, _index.toDate)(date);
    if (isNaN(amount)) return (0, _index2.constructFrom)(date, NaN);
    if (!amount) {
      // If 0 months, no-op to avoid changing times in the hour before end of DST
      return _date;
    }
    const dayOfMonth = _date.getDate();

    // The JS Date object supports date math by accepting out-of-bounds values for
    // month, day, etc. For example, new Date(2020, 0, 0) returns 31 Dec 2019 and
    // new Date(2020, 13, 1) returns 1 Feb 2021.  This is *almost* the behavior we
    // want except that dates will wrap around the end of a month, meaning that
    // new Date(2020, 13, 31) will return 3 Mar 2021 not 28 Feb 2021 as desired. So
    // we'll default to the end of the desired month by adding 1 to the desired
    // month and using a date of 0 to back up one day to the end of the desired
    // month.
    const endOfDesiredMonth = (0, _index2.constructFrom)(date, _date.getTime());
    endOfDesiredMonth.setMonth(_date.getMonth() + amount + 1, 0);
    const daysInMonth = endOfDesiredMonth.getDate();
    if (dayOfMonth >= daysInMonth) {
      // If we're already at the end of the month, then this is the correct date
      // and we're done.
      return endOfDesiredMonth;
    } else {
      // Otherwise, we now know that setting the original day-of-month value won't
      // cause an overflow, so set the desired day-of-month. Note that we can't
      // just set the date of `endOfDesiredMonth` because that object may have had
      // its time changed in the unusual case where where a DST transition was on
      // the last day of the month and its local time was in the hour skipped or
      // repeated next to a DST transition.  So we use `date` instead which is
      // guaranteed to still have the original time.
      _date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
      return _date;
    }
  }
  return addMonths;
}

var hasRequiredAdd;

function requireAdd() {
  if (hasRequiredAdd) return add;
  hasRequiredAdd = 1;
  add.add = add$1;
  var _index = /*@__PURE__*/ requireAddDays();
  var _index2 = /*@__PURE__*/ requireAddMonths();
  var _index3 = /*@__PURE__*/ requireConstructFrom();
  var _index4 = /*@__PURE__*/ requireToDate();

  /**
   * @name add
   * @category Common Helpers
   * @summary Add the specified years, months, weeks, days, hours, minutes and seconds to the given date.
   *
   * @description
   * Add the specified years, months, weeks, days, hours, minutes and seconds to the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param duration - The object with years, months, weeks, days, hours, minutes and seconds to be added.
   *
   * | Key            | Description                        |
   * |----------------|------------------------------------|
   * | years          | Amount of years to be added        |
   * | months         | Amount of months to be added       |
   * | weeks          | Amount of weeks to be added        |
   * | days           | Amount of days to be added         |
   * | hours          | Amount of hours to be added        |
   * | minutes        | Amount of minutes to be added      |
   * | seconds        | Amount of seconds to be added      |
   *
   * All values default to 0
   *
   * @returns The new date with the seconds added
   *
   * @example
   * // Add the following duration to 1 September 2014, 10:19:50
   * const result = add(new Date(2014, 8, 1, 10, 19, 50), {
   *   years: 2,
   *   months: 9,
   *   weeks: 1,
   *   days: 7,
   *   hours: 5,\\-7
   *   minutes: 9,
   *   seconds: 30,
   * })
   * //=> Thu Jun 15 2017 15:29:20
   */
  function add$1(date, duration) {
    const { years = 0, months = 0, weeks = 0, days = 0, hours = 0, minutes = 0, seconds = 0 } = duration;

    // Add years and months
    const _date = (0, _index4.toDate)(date);
    const dateWithMonths = months || years ? (0, _index2.addMonths)(_date, months + years * 12) : _date;

    // Add weeks and days
    const dateWithDays = days || weeks ? (0, _index.addDays)(dateWithMonths, days + weeks * 7) : dateWithMonths;

    // Add days, hours, minutes and seconds
    const minutesToAdd = minutes + hours * 60;
    const secondsToAdd = seconds + minutesToAdd * 60;
    const msToAdd = secondsToAdd * 1000;
    const finalDate = (0, _index3.constructFrom)(date, dateWithDays.getTime() + msToAdd);

    return finalDate;
  }
  return add;
}

var addBusinessDays = {};

var isSaturday = {};

var hasRequiredIsSaturday;

function requireIsSaturday() {
  if (hasRequiredIsSaturday) return isSaturday;
  hasRequiredIsSaturday = 1;
  isSaturday.isSaturday = isSaturday$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name isSaturday
   * @category Weekday Helpers
   * @summary Is the given date Saturday?
   *
   * @description
   * Is the given date Saturday?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   *
   * @returns The date is Saturday
   *
   * @example
   * // Is 27 September 2014 Saturday?
   * const result = isSaturday(new Date(2014, 8, 27))
   * //=> true
   */
  function isSaturday$1(date) {
    return (0, _index.toDate)(date).getDay() === 6;
  }
  return isSaturday;
}

var isSunday = {};

var hasRequiredIsSunday;

function requireIsSunday() {
  if (hasRequiredIsSunday) return isSunday;
  hasRequiredIsSunday = 1;
  isSunday.isSunday = isSunday$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name isSunday
   * @category Weekday Helpers
   * @summary Is the given date Sunday?
   *
   * @description
   * Is the given date Sunday?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   *
   * @returns The date is Sunday
   *
   * @example
   * // Is 21 September 2014 Sunday?
   * const result = isSunday(new Date(2014, 8, 21))
   * //=> true
   */
  function isSunday$1(date) {
    return (0, _index.toDate)(date).getDay() === 0;
  }
  return isSunday;
}

var isWeekend = {};

var hasRequiredIsWeekend;

function requireIsWeekend() {
  if (hasRequiredIsWeekend) return isWeekend;
  hasRequiredIsWeekend = 1;
  isWeekend.isWeekend = isWeekend$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name isWeekend
   * @category Weekday Helpers
   * @summary Does the given date fall on a weekend?
   *
   * @description
   * Does the given date fall on a weekend?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   *
   * @returns The date falls on a weekend
   *
   * @example
   * // Does 5 October 2014 fall on a weekend?
   * const result = isWeekend(new Date(2014, 9, 5))
   * //=> true
   */
  function isWeekend$1(date) {
    const day = (0, _index.toDate)(date).getDay();
    return day === 0 || day === 6;
  }
  return isWeekend;
}

var hasRequiredAddBusinessDays;

function requireAddBusinessDays() {
  if (hasRequiredAddBusinessDays) return addBusinessDays;
  hasRequiredAddBusinessDays = 1;
  addBusinessDays.addBusinessDays = addBusinessDays$1;
  var _index = /*@__PURE__*/ requireConstructFrom();
  var _index2 = /*@__PURE__*/ requireIsSaturday();
  var _index3 = /*@__PURE__*/ requireIsSunday();
  var _index4 = /*@__PURE__*/ requireIsWeekend();
  var _index5 = /*@__PURE__*/ requireToDate();

  /**
   * @name addBusinessDays
   * @category Date Extension Helpers
   * @summary Add the specified number of business days (mon - fri) to the given date.
   *
   * @description
   * Add the specified number of business days (mon - fri) to the given date, ignoring weekends.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param amount - The amount of business days to be added.
   *
   * @returns The new date with the business days added
   *
   * @example
   * // Add 10 business days to 1 September 2014:
   * const result = addBusinessDays(new Date(2014, 8, 1), 10)
   * //=> Mon Sep 15 2014 00:00:00 (skipped weekend days)
   */
  function addBusinessDays$1(date, amount) {
    const _date = (0, _index5.toDate)(date);
    const startedOnWeekend = (0, _index4.isWeekend)(_date);

    if (isNaN(amount)) return (0, _index.constructFrom)(date, NaN);

    const hours = _date.getHours();
    const sign = amount < 0 ? -1 : 1;
    const fullWeeks = Math.trunc(amount / 5);

    _date.setDate(_date.getDate() + fullWeeks * 7);

    // Get remaining days not part of a full week
    let restDays = Math.abs(amount % 5);

    // Loops over remaining days
    while (restDays > 0) {
      _date.setDate(_date.getDate() + sign);
      if (!(0, _index4.isWeekend)(_date)) restDays -= 1;
    }

    // If the date is a weekend day and we reduce a dividable of
    // 5 from it, we land on a weekend date.
    // To counter this, we add days accordingly to land on the next business day
    if (startedOnWeekend && (0, _index4.isWeekend)(_date) && amount !== 0) {
      // If we're reducing days, we want to add days until we land on a weekday
      // If we're adding days we want to reduce days until we land on a weekday
      if ((0, _index2.isSaturday)(_date)) _date.setDate(_date.getDate() + (sign < 0 ? 2 : -1));
      if ((0, _index3.isSunday)(_date)) _date.setDate(_date.getDate() + (sign < 0 ? 1 : -2));
    }

    // Restore hours to avoid DST lag
    _date.setHours(hours);

    return _date;
  }
  return addBusinessDays;
}

var addHours = {};

var addMilliseconds = {};

var hasRequiredAddMilliseconds;

function requireAddMilliseconds() {
  if (hasRequiredAddMilliseconds) return addMilliseconds;
  hasRequiredAddMilliseconds = 1;
  addMilliseconds.addMilliseconds = addMilliseconds$1;
  var _index = /*@__PURE__*/ requireToDate();
  var _index2 = /*@__PURE__*/ requireConstructFrom();

  /**
   * @name addMilliseconds
   * @category Millisecond Helpers
   * @summary Add the specified number of milliseconds to the given date.
   *
   * @description
   * Add the specified number of milliseconds to the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param amount - The amount of milliseconds to be added.
   *
   * @returns The new date with the milliseconds added
   *
   * @example
   * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
   * const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
   * //=> Thu Jul 10 2014 12:45:30.750
   */
  function addMilliseconds$1(date, amount) {
    const timestamp = +(0, _index.toDate)(date);
    return (0, _index2.constructFrom)(date, timestamp + amount);
  }
  return addMilliseconds;
}

var constants$1 = {};

var hasRequiredConstants$1;

function requireConstants$1() {
  if (hasRequiredConstants$1) return constants$1;
  hasRequiredConstants$1 = 1;
  constants$1.secondsInYear =
    constants$1.secondsInWeek =
    constants$1.secondsInQuarter =
    constants$1.secondsInMonth =
    constants$1.secondsInMinute =
    constants$1.secondsInHour =
    constants$1.secondsInDay =
    constants$1.quartersInYear =
    constants$1.monthsInYear =
    constants$1.monthsInQuarter =
    constants$1.minutesInYear =
    constants$1.minutesInMonth =
    constants$1.minutesInHour =
    constants$1.minutesInDay =
    constants$1.minTime =
    constants$1.millisecondsInWeek =
    constants$1.millisecondsInSecond =
    constants$1.millisecondsInMinute =
    constants$1.millisecondsInHour =
    constants$1.millisecondsInDay =
    constants$1.maxTime =
    constants$1.daysInYear =
    constants$1.daysInWeek =
      void 0; /**
   * @module constants
   * @summary Useful constants
   * @description
   * Collection of useful date constants.
   *
   * The constants could be imported from `date-fns/constants`:
   *
   * ```ts
   * import { maxTime, minTime } from "date-fns/constants";
   *
   * function isAllowedTime(time) {
   *   return time <= maxTime && time >= minTime;
   * }
   * ```
   */

  /**
   * @constant
   * @name daysInWeek
   * @summary Days in 1 week.
   */
  constants$1.daysInWeek = 7;

  /**
   * @constant
   * @name daysInYear
   * @summary Days in 1 year.
   *
   * @description
   * How many days in a year.
   *
   * One years equals 365.2425 days according to the formula:
   *
   * > Leap year occures every 4 years, except for years that are divisable by 100 and not divisable by 400.
   * > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
   */
  const daysInYear = (constants$1.daysInYear = 365.2425);

  /**
   * @constant
   * @name maxTime
   * @summary Maximum allowed time.
   *
   * @example
   * import { maxTime } from "date-fns/constants";
   *
   * const isValid = 8640000000000001 <= maxTime;
   * //=> false
   *
   * new Date(8640000000000001);
   * //=> Invalid Date
   */
  const maxTime = (constants$1.maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1000);

  /**
   * @constant
   * @name minTime
   * @summary Minimum allowed time.
   *
   * @example
   * import { minTime } from "date-fns/constants";
   *
   * const isValid = -8640000000000001 >= minTime;
   * //=> false
   *
   * new Date(-8640000000000001)
   * //=> Invalid Date
   */
  constants$1.minTime = -maxTime;

  /**
   * @constant
   * @name millisecondsInWeek
   * @summary Milliseconds in 1 week.
   */
  constants$1.millisecondsInWeek = 604800000;

  /**
   * @constant
   * @name millisecondsInDay
   * @summary Milliseconds in 1 day.
   */
  constants$1.millisecondsInDay = 86400000;

  /**
   * @constant
   * @name millisecondsInMinute
   * @summary Milliseconds in 1 minute
   */
  constants$1.millisecondsInMinute = 60000;

  /**
   * @constant
   * @name millisecondsInHour
   * @summary Milliseconds in 1 hour
   */
  constants$1.millisecondsInHour = 3600000;

  /**
   * @constant
   * @name millisecondsInSecond
   * @summary Milliseconds in 1 second
   */
  constants$1.millisecondsInSecond = 1000;

  /**
   * @constant
   * @name minutesInYear
   * @summary Minutes in 1 year.
   */
  constants$1.minutesInYear = 525600;

  /**
   * @constant
   * @name minutesInMonth
   * @summary Minutes in 1 month.
   */
  constants$1.minutesInMonth = 43200;

  /**
   * @constant
   * @name minutesInDay
   * @summary Minutes in 1 day.
   */
  constants$1.minutesInDay = 1440;

  /**
   * @constant
   * @name minutesInHour
   * @summary Minutes in 1 hour.
   */
  constants$1.minutesInHour = 60;

  /**
   * @constant
   * @name monthsInQuarter
   * @summary Months in 1 quarter.
   */
  constants$1.monthsInQuarter = 3;

  /**
   * @constant
   * @name monthsInYear
   * @summary Months in 1 year.
   */
  constants$1.monthsInYear = 12;

  /**
   * @constant
   * @name quartersInYear
   * @summary Quarters in 1 year
   */
  constants$1.quartersInYear = 4;

  /**
   * @constant
   * @name secondsInHour
   * @summary Seconds in 1 hour.
   */
  const secondsInHour = (constants$1.secondsInHour = 3600);

  /**
   * @constant
   * @name secondsInMinute
   * @summary Seconds in 1 minute.
   */
  constants$1.secondsInMinute = 60;

  /**
   * @constant
   * @name secondsInDay
   * @summary Seconds in 1 day.
   */
  const secondsInDay = (constants$1.secondsInDay = secondsInHour * 24);

  /**
   * @constant
   * @name secondsInWeek
   * @summary Seconds in 1 week.
   */
  constants$1.secondsInWeek = secondsInDay * 7;

  /**
   * @constant
   * @name secondsInYear
   * @summary Seconds in 1 year.
   */
  const secondsInYear = (constants$1.secondsInYear = secondsInDay * daysInYear);

  /**
   * @constant
   * @name secondsInMonth
   * @summary Seconds in 1 month
   */
  const secondsInMonth = (constants$1.secondsInMonth = secondsInYear / 12);

  /**
   * @constant
   * @name secondsInQuarter
   * @summary Seconds in 1 quarter.
   */
  constants$1.secondsInQuarter = secondsInMonth * 3;
  return constants$1;
}

var hasRequiredAddHours;

function requireAddHours() {
  if (hasRequiredAddHours) return addHours;
  hasRequiredAddHours = 1;
  addHours.addHours = addHours$1;
  var _index = /*@__PURE__*/ requireAddMilliseconds();
  var _index2 = /*@__PURE__*/ requireConstants$1();

  /**
   * @name addHours
   * @category Hour Helpers
   * @summary Add the specified number of hours to the given date.
   *
   * @description
   * Add the specified number of hours to the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param amount - The amount of hours to be added.
   *
   * @returns The new date with the hours added
   *
   * @example
   * // Add 2 hours to 10 July 2014 23:00:00:
   * const result = addHours(new Date(2014, 6, 10, 23, 0), 2)
   * //=> Fri Jul 11 2014 01:00:00
   */
  function addHours$1(date, amount) {
    return (0, _index.addMilliseconds)(date, amount * _index2.millisecondsInHour);
  }
  return addHours;
}

var addISOWeekYears = {};

var getISOWeekYear = {};

var startOfISOWeek = {};

var startOfWeek = {};

var defaultOptions = {};

var hasRequiredDefaultOptions;

function requireDefaultOptions() {
  if (hasRequiredDefaultOptions) return defaultOptions;
  hasRequiredDefaultOptions = 1;
  defaultOptions.getDefaultOptions = getDefaultOptions;
  defaultOptions.setDefaultOptions = setDefaultOptions;

  let defaultOptions$1 = {};

  function getDefaultOptions() {
    return defaultOptions$1;
  }

  function setDefaultOptions(newOptions) {
    defaultOptions$1 = newOptions;
  }
  return defaultOptions;
}

var hasRequiredStartOfWeek;

function requireStartOfWeek() {
  if (hasRequiredStartOfWeek) return startOfWeek;
  hasRequiredStartOfWeek = 1;
  startOfWeek.startOfWeek = startOfWeek$1;
  var _index = /*@__PURE__*/ requireToDate();

  var _index2 = /*@__PURE__*/ requireDefaultOptions();

  /**
   * The {@link startOfWeek} function options.
   */

  /**
   * @name startOfWeek
   * @category Week Helpers
   * @summary Return the start of a week for the given date.
   *
   * @description
   * Return the start of a week for the given date.
   * The result will be in the local timezone.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   * @param options - An object with options
   *
   * @returns The start of a week
   *
   * @example
   * // The start of a week for 2 September 2014 11:55:00:
   * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
   * //=> Sun Aug 31 2014 00:00:00
   *
   * @example
   * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
   * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
   * //=> Mon Sep 01 2014 00:00:00
   */
  function startOfWeek$1(date, options) {
    const defaultOptions = (0, _index2.getDefaultOptions)();
    const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions.weekStartsOn ?? defaultOptions.locale?.options?.weekStartsOn ?? 0;

    const _date = (0, _index.toDate)(date);
    const day = _date.getDay();
    const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

    _date.setDate(_date.getDate() - diff);
    _date.setHours(0, 0, 0, 0);
    return _date;
  }
  return startOfWeek;
}

var hasRequiredStartOfISOWeek;

function requireStartOfISOWeek() {
  if (hasRequiredStartOfISOWeek) return startOfISOWeek;
  hasRequiredStartOfISOWeek = 1;
  startOfISOWeek.startOfISOWeek = startOfISOWeek$1;
  var _index = /*@__PURE__*/ requireStartOfWeek();

  /**
   * @name startOfISOWeek
   * @category ISO Week Helpers
   * @summary Return the start of an ISO week for the given date.
   *
   * @description
   * Return the start of an ISO week for the given date.
   * The result will be in the local timezone.
   *
   * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The start of an ISO week
   *
   * @example
   * // The start of an ISO week for 2 September 2014 11:55:00:
   * const result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
   * //=> Mon Sep 01 2014 00:00:00
   */
  function startOfISOWeek$1(date) {
    return (0, _index.startOfWeek)(date, { weekStartsOn: 1 });
  }
  return startOfISOWeek;
}

var hasRequiredGetISOWeekYear;

function requireGetISOWeekYear() {
  if (hasRequiredGetISOWeekYear) return getISOWeekYear;
  hasRequiredGetISOWeekYear = 1;
  getISOWeekYear.getISOWeekYear = getISOWeekYear$1;
  var _index = /*@__PURE__*/ requireConstructFrom();
  var _index2 = /*@__PURE__*/ requireStartOfISOWeek();
  var _index3 = /*@__PURE__*/ requireToDate();

  /**
   * @name getISOWeekYear
   * @category ISO Week-Numbering Year Helpers
   * @summary Get the ISO week-numbering year of the given date.
   *
   * @description
   * Get the ISO week-numbering year of the given date,
   * which always starts 3 days before the year's first Thursday.
   *
   * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given date
   *
   * @returns The ISO week-numbering year
   *
   * @example
   * // Which ISO-week numbering year is 2 January 2005?
   * const result = getISOWeekYear(new Date(2005, 0, 2))
   * //=> 2004
   */
  function getISOWeekYear$1(date) {
    const _date = (0, _index3.toDate)(date);
    const year = _date.getFullYear();

    const fourthOfJanuaryOfNextYear = (0, _index.constructFrom)(date, 0);
    fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
    fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
    const startOfNextYear = (0, _index2.startOfISOWeek)(fourthOfJanuaryOfNextYear);

    const fourthOfJanuaryOfThisYear = (0, _index.constructFrom)(date, 0);
    fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
    fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
    const startOfThisYear = (0, _index2.startOfISOWeek)(fourthOfJanuaryOfThisYear);

    if (_date.getTime() >= startOfNextYear.getTime()) {
      return year + 1;
    } else if (_date.getTime() >= startOfThisYear.getTime()) {
      return year;
    } else {
      return year - 1;
    }
  }
  return getISOWeekYear;
}

var setISOWeekYear = {};

var differenceInCalendarDays = {};

var startOfDay = {};

var hasRequiredStartOfDay;

function requireStartOfDay() {
  if (hasRequiredStartOfDay) return startOfDay;
  hasRequiredStartOfDay = 1;
  startOfDay.startOfDay = startOfDay$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name startOfDay
   * @category Day Helpers
   * @summary Return the start of a day for the given date.
   *
   * @description
   * Return the start of a day for the given date.
   * The result will be in the local timezone.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The start of a day
   *
   * @example
   * // The start of a day for 2 September 2014 11:55:00:
   * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
   * //=> Tue Sep 02 2014 00:00:00
   */
  function startOfDay$1(date) {
    const _date = (0, _index.toDate)(date);
    _date.setHours(0, 0, 0, 0);
    return _date;
  }
  return startOfDay;
}

var getTimezoneOffsetInMilliseconds = {};

var hasRequiredGetTimezoneOffsetInMilliseconds;

function requireGetTimezoneOffsetInMilliseconds() {
  if (hasRequiredGetTimezoneOffsetInMilliseconds) return getTimezoneOffsetInMilliseconds;
  hasRequiredGetTimezoneOffsetInMilliseconds = 1;
  getTimezoneOffsetInMilliseconds.getTimezoneOffsetInMilliseconds = getTimezoneOffsetInMilliseconds$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
   * They usually appear for dates that denote time before the timezones were introduced
   * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
   * and GMT+01:00:00 after that date)
   *
   * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
   * which would lead to incorrect calculations.
   *
   * This function returns the timezone offset in milliseconds that takes seconds in account.
   */
  function getTimezoneOffsetInMilliseconds$1(date) {
    const _date = (0, _index.toDate)(date);
    const utcDate = new Date(Date.UTC(_date.getFullYear(), _date.getMonth(), _date.getDate(), _date.getHours(), _date.getMinutes(), _date.getSeconds(), _date.getMilliseconds()));
    utcDate.setUTCFullYear(_date.getFullYear());
    return +date - +utcDate;
  }
  return getTimezoneOffsetInMilliseconds;
}

var hasRequiredDifferenceInCalendarDays;

function requireDifferenceInCalendarDays() {
  if (hasRequiredDifferenceInCalendarDays) return differenceInCalendarDays;
  hasRequiredDifferenceInCalendarDays = 1;
  differenceInCalendarDays.differenceInCalendarDays = differenceInCalendarDays$1;
  var _index = /*@__PURE__*/ requireConstants$1();
  var _index2 = /*@__PURE__*/ requireStartOfDay();
  var _index3 = /*@__PURE__*/ requireGetTimezoneOffsetInMilliseconds();

  /**
   * @name differenceInCalendarDays
   * @category Day Helpers
   * @summary Get the number of calendar days between the given dates.
   *
   * @description
   * Get the number of calendar days between the given dates. This means that the times are removed
   * from the dates and then the difference in days is calculated.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The later date
   * @param dateRight - The earlier date
   *
   * @returns The number of calendar days
   *
   * @example
   * // How many calendar days are between
   * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
   * const result = differenceInCalendarDays(
   *   new Date(2012, 6, 2, 0, 0),
   *   new Date(2011, 6, 2, 23, 0)
   * )
   * //=> 366
   * // How many calendar days are between
   * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
   * const result = differenceInCalendarDays(
   *   new Date(2011, 6, 3, 0, 1),
   *   new Date(2011, 6, 2, 23, 59)
   * )
   * //=> 1
   */
  function differenceInCalendarDays$1(dateLeft, dateRight) {
    const startOfDayLeft = (0, _index2.startOfDay)(dateLeft);
    const startOfDayRight = (0, _index2.startOfDay)(dateRight);

    const timestampLeft = +startOfDayLeft - (0, _index3.getTimezoneOffsetInMilliseconds)(startOfDayLeft);
    const timestampRight = +startOfDayRight - (0, _index3.getTimezoneOffsetInMilliseconds)(startOfDayRight);

    // Round the number of days to the nearest integer because the number of
    // milliseconds in a day is not constant (e.g. it's different in the week of
    // the daylight saving time clock shift).
    return Math.round((timestampLeft - timestampRight) / _index.millisecondsInDay);
  }
  return differenceInCalendarDays;
}

var startOfISOWeekYear = {};

var hasRequiredStartOfISOWeekYear;

function requireStartOfISOWeekYear() {
  if (hasRequiredStartOfISOWeekYear) return startOfISOWeekYear;
  hasRequiredStartOfISOWeekYear = 1;
  startOfISOWeekYear.startOfISOWeekYear = startOfISOWeekYear$1;
  var _index = /*@__PURE__*/ requireGetISOWeekYear();
  var _index2 = /*@__PURE__*/ requireStartOfISOWeek();
  var _index3 = /*@__PURE__*/ requireConstructFrom();

  /**
   * @name startOfISOWeekYear
   * @category ISO Week-Numbering Year Helpers
   * @summary Return the start of an ISO week-numbering year for the given date.
   *
   * @description
   * Return the start of an ISO week-numbering year,
   * which always starts 3 days before the year's first Thursday.
   * The result will be in the local timezone.
   *
   * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The start of an ISO week-numbering year
   *
   * @example
   * // The start of an ISO week-numbering year for 2 July 2005:
   * const result = startOfISOWeekYear(new Date(2005, 6, 2))
   * //=> Mon Jan 03 2005 00:00:00
   */
  function startOfISOWeekYear$1(date) {
    const year = (0, _index.getISOWeekYear)(date);
    const fourthOfJanuary = (0, _index3.constructFrom)(date, 0);
    fourthOfJanuary.setFullYear(year, 0, 4);
    fourthOfJanuary.setHours(0, 0, 0, 0);
    return (0, _index2.startOfISOWeek)(fourthOfJanuary);
  }
  return startOfISOWeekYear;
}

var hasRequiredSetISOWeekYear;

function requireSetISOWeekYear() {
  if (hasRequiredSetISOWeekYear) return setISOWeekYear;
  hasRequiredSetISOWeekYear = 1;
  setISOWeekYear.setISOWeekYear = setISOWeekYear$1;
  var _index = /*@__PURE__*/ requireConstructFrom();
  var _index2 = /*@__PURE__*/ requireDifferenceInCalendarDays();
  var _index3 = /*@__PURE__*/ requireStartOfISOWeekYear();
  var _index4 = /*@__PURE__*/ requireToDate();

  /**
   * @name setISOWeekYear
   * @category ISO Week-Numbering Year Helpers
   * @summary Set the ISO week-numbering year to the given date.
   *
   * @description
   * Set the ISO week-numbering year to the given date,
   * saving the week number and the weekday number.
   *
   * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param weekYear - The ISO week-numbering year of the new date
   *
   * @returns The new date with the ISO week-numbering year set
   *
   * @example
   * // Set ISO week-numbering year 2007 to 29 December 2008:
   * const result = setISOWeekYear(new Date(2008, 11, 29), 2007)
   * //=> Mon Jan 01 2007 00:00:00
   */
  function setISOWeekYear$1(date, weekYear) {
    let _date = (0, _index4.toDate)(date);
    const diff = (0, _index2.differenceInCalendarDays)(_date, (0, _index3.startOfISOWeekYear)(_date));
    const fourthOfJanuary = (0, _index.constructFrom)(date, 0);
    fourthOfJanuary.setFullYear(weekYear, 0, 4);
    fourthOfJanuary.setHours(0, 0, 0, 0);
    _date = (0, _index3.startOfISOWeekYear)(fourthOfJanuary);
    _date.setDate(_date.getDate() + diff);
    return _date;
  }
  return setISOWeekYear;
}

var hasRequiredAddISOWeekYears;

function requireAddISOWeekYears() {
  if (hasRequiredAddISOWeekYears) return addISOWeekYears;
  hasRequiredAddISOWeekYears = 1;
  addISOWeekYears.addISOWeekYears = addISOWeekYears$1;
  var _index = /*@__PURE__*/ requireGetISOWeekYear();
  var _index2 = /*@__PURE__*/ requireSetISOWeekYear();

  /**
   * @name addISOWeekYears
   * @category ISO Week-Numbering Year Helpers
   * @summary Add the specified number of ISO week-numbering years to the given date.
   *
   * @description
   * Add the specified number of ISO week-numbering years to the given date.
   *
   * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param amount - The amount of ISO week-numbering years to be added.
   *
   * @returns The new date with the ISO week-numbering years added
   *
   * @example
   * // Add 5 ISO week-numbering years to 2 July 2010:
   * const result = addISOWeekYears(new Date(2010, 6, 2), 5)
   * //=> Fri Jn 26 2015 00:00:00
   */
  function addISOWeekYears$1(date, amount) {
    return (0, _index2.setISOWeekYear)(date, (0, _index.getISOWeekYear)(date) + amount);
  }
  return addISOWeekYears;
}

var addMinutes = {};

var hasRequiredAddMinutes;

function requireAddMinutes() {
  if (hasRequiredAddMinutes) return addMinutes;
  hasRequiredAddMinutes = 1;
  addMinutes.addMinutes = addMinutes$1;
  var _index = /*@__PURE__*/ requireAddMilliseconds();
  var _index2 = /*@__PURE__*/ requireConstants$1();

  /**
   * @name addMinutes
   * @category Minute Helpers
   * @summary Add the specified number of minutes to the given date.
   *
   * @description
   * Add the specified number of minutes to the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param amount - The amount of minutes to be added.
   *
   * @returns The new date with the minutes added
   *
   * @example
   * // Add 30 minutes to 10 July 2014 12:00:00:
   * const result = addMinutes(new Date(2014, 6, 10, 12, 0), 30)
   * //=> Thu Jul 10 2014 12:30:00
   */
  function addMinutes$1(date, amount) {
    return (0, _index.addMilliseconds)(date, amount * _index2.millisecondsInMinute);
  }
  return addMinutes;
}

var addQuarters = {};

var hasRequiredAddQuarters;

function requireAddQuarters() {
  if (hasRequiredAddQuarters) return addQuarters;
  hasRequiredAddQuarters = 1;
  addQuarters.addQuarters = addQuarters$1;
  var _index = /*@__PURE__*/ requireAddMonths();

  /**
   * @name addQuarters
   * @category Quarter Helpers
   * @summary Add the specified number of year quarters to the given date.
   *
   * @description
   * Add the specified number of year quarters to the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param amount - The amount of quarters to be added.
   *
   * @returns The new date with the quarters added
   *
   * @example
   * // Add 1 quarter to 1 September 2014:
   * const result = addQuarters(new Date(2014, 8, 1), 1)
   * //=> Mon Dec 01 2014 00:00:00
   */
  function addQuarters$1(date, amount) {
    const months = amount * 3;
    return (0, _index.addMonths)(date, months);
  }
  return addQuarters;
}

var addSeconds = {};

var hasRequiredAddSeconds;

function requireAddSeconds() {
  if (hasRequiredAddSeconds) return addSeconds;
  hasRequiredAddSeconds = 1;
  addSeconds.addSeconds = addSeconds$1;
  var _index = /*@__PURE__*/ requireAddMilliseconds();

  /**
   * @name addSeconds
   * @category Second Helpers
   * @summary Add the specified number of seconds to the given date.
   *
   * @description
   * Add the specified number of seconds to the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param amount - The amount of seconds to be added.
   *
   * @returns The new date with the seconds added
   *
   * @example
   * // Add 30 seconds to 10 July 2014 12:45:00:
   * const result = addSeconds(new Date(2014, 6, 10, 12, 45, 0), 30)
   * //=> Thu Jul 10 2014 12:45:30
   */
  function addSeconds$1(date, amount) {
    return (0, _index.addMilliseconds)(date, amount * 1000);
  }
  return addSeconds;
}

var addWeeks = {};

var hasRequiredAddWeeks;

function requireAddWeeks() {
  if (hasRequiredAddWeeks) return addWeeks;
  hasRequiredAddWeeks = 1;
  addWeeks.addWeeks = addWeeks$1;
  var _index = /*@__PURE__*/ requireAddDays();

  /**
   * @name addWeeks
   * @category Week Helpers
   * @summary Add the specified number of weeks to the given date.
   *
   * @description
   * Add the specified number of week to the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param amount - The amount of weeks to be added.
   *
   * @returns The new date with the weeks added
   *
   * @example
   * // Add 4 weeks to 1 September 2014:
   * const result = addWeeks(new Date(2014, 8, 1), 4)
   * //=> Mon Sep 29 2014 00:00:00
   */
  function addWeeks$1(date, amount) {
    const days = amount * 7;
    return (0, _index.addDays)(date, days);
  }
  return addWeeks;
}

var addYears = {};

var hasRequiredAddYears;

function requireAddYears() {
  if (hasRequiredAddYears) return addYears;
  hasRequiredAddYears = 1;
  addYears.addYears = addYears$1;
  var _index = /*@__PURE__*/ requireAddMonths();

  /**
   * @name addYears
   * @category Year Helpers
   * @summary Add the specified number of years to the given date.
   *
   * @description
   * Add the specified number of years to the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param amount - The amount of years to be added.
   *
   * @returns The new date with the years added
   *
   * @example
   * // Add 5 years to 1 September 2014:
   * const result = addYears(new Date(2014, 8, 1), 5)
   * //=> Sun Sep 01 2019 00:00:00
   */
  function addYears$1(date, amount) {
    return (0, _index.addMonths)(date, amount * 12);
  }
  return addYears;
}

var areIntervalsOverlapping = {};

var hasRequiredAreIntervalsOverlapping;

function requireAreIntervalsOverlapping() {
  if (hasRequiredAreIntervalsOverlapping) return areIntervalsOverlapping;
  hasRequiredAreIntervalsOverlapping = 1;
  areIntervalsOverlapping.areIntervalsOverlapping = areIntervalsOverlapping$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * The {@link areIntervalsOverlapping} function options.
   */

  /**
   * @name areIntervalsOverlapping
   * @category Interval Helpers
   * @summary Is the given time interval overlapping with another time interval?
   *
   * @description
   * Is the given time interval overlapping with another time interval? Adjacent intervals do not count as overlapping unless `inclusive` is set to `true`.
   *
   * @param intervalLeft - The first interval to compare.
   * @param intervalRight - The second interval to compare.
   * @param options - The object with options
   *
   * @returns Whether the time intervals are overlapping
   *
   * @example
   * // For overlapping time intervals:
   * areIntervalsOverlapping(
   *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
   *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 21) }
   * )
   * //=> true
   *
   * @example
   * // For non-overlapping time intervals:
   * areIntervalsOverlapping(
   *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
   *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 22) }
   * )
   * //=> false
   *
   * @example
   * // For adjacent time intervals:
   * areIntervalsOverlapping(
   *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
   *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 30) }
   * )
   * //=> false
   *
   * @example
   * // Using the inclusive option:
   * areIntervalsOverlapping(
   *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
   *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 24) }
   * )
   * //=> false
   *
   * @example
   * areIntervalsOverlapping(
   *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
   *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 24) },
   *   { inclusive: true }
   * )
   * //=> true
   */
  function areIntervalsOverlapping$1(intervalLeft, intervalRight, options) {
    const [leftStartTime, leftEndTime] = [+(0, _index.toDate)(intervalLeft.start), +(0, _index.toDate)(intervalLeft.end)].sort((a, b) => a - b);
    const [rightStartTime, rightEndTime] = [+(0, _index.toDate)(intervalRight.start), +(0, _index.toDate)(intervalRight.end)].sort((a, b) => a - b);

    if (options?.inclusive) return leftStartTime <= rightEndTime && rightStartTime <= leftEndTime;

    return leftStartTime < rightEndTime && rightStartTime < leftEndTime;
  }
  return areIntervalsOverlapping;
}

var clamp = {};

var max = {};

var hasRequiredMax;

function requireMax() {
  if (hasRequiredMax) return max;
  hasRequiredMax = 1;
  max.max = max$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name max
   * @category Common Helpers
   * @summary Return the latest of the given dates.
   *
   * @description
   * Return the latest of the given dates.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dates - The dates to compare
   *
   * @returns The latest of the dates
   *
   * @example
   * // Which of these dates is the latest?
   * const result = max([
   *   new Date(1989, 6, 10),
   *   new Date(1987, 1, 11),
   *   new Date(1995, 6, 2),
   *   new Date(1990, 0, 1)
   * ])
   * //=> Sun Jul 02 1995 00:00:00
   */
  function max$1(dates) {
    let result;
    dates.forEach(function (dirtyDate) {
      const currentDate = (0, _index.toDate)(dirtyDate);

      if (result === undefined || result < currentDate || isNaN(Number(currentDate))) {
        result = currentDate;
      }
    });

    return result || new Date(NaN);
  }
  return max;
}

var min = {};

var hasRequiredMin;

function requireMin() {
  if (hasRequiredMin) return min;
  hasRequiredMin = 1;
  min.min = min$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name min
   * @category Common Helpers
   * @summary Returns the earliest of the given dates.
   *
   * @description
   * Returns the earliest of the given dates.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dates - The dates to compare
   *
   * @returns The earliest of the dates
   *
   * @example
   * // Which of these dates is the earliest?
   * const result = min([
   *   new Date(1989, 6, 10),
   *   new Date(1987, 1, 11),
   *   new Date(1995, 6, 2),
   *   new Date(1990, 0, 1)
   * ])
   * //=> Wed Feb 11 1987 00:00:00
   */
  function min$1(dates) {
    let result;

    dates.forEach(dirtyDate => {
      const date = (0, _index.toDate)(dirtyDate);
      if (!result || result > date || isNaN(+date)) {
        result = date;
      }
    });

    return result || new Date(NaN);
  }
  return min;
}

var hasRequiredClamp;

function requireClamp() {
  if (hasRequiredClamp) return clamp;
  hasRequiredClamp = 1;
  clamp.clamp = clamp$1;
  var _index = /*@__PURE__*/ requireMax();
  var _index2 = /*@__PURE__*/ requireMin();

  /**
   * @name clamp
   * @category Interval Helpers
   * @summary Return a date bounded by the start and the end of the given interval
   *
   * @description
   * Clamps a date to the lower bound with the start of the interval and the upper
   * bound with the end of the interval.
   *
   * - When the date is less than the start of the interval, the start is returned.
   * - When the date is greater than the end of the interval, the end is returned.
   * - Otherwise the date is returned.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be bounded
   * @param interval - The interval to bound to
   *
   * @returns The date bounded by the start and the end of the interval
   *
   * @example
   * // What is Mar, 21, 2021 bounded to an interval starting at Mar, 22, 2021 and ending at Apr, 01, 2021
   * const result = clamp(new Date(2021, 2, 21), {
   *   start: new Date(2021, 2, 22),
   *   end: new Date(2021, 3, 1),
   * })
   * //=> Mon Mar 22 2021 00:00:00
   */
  function clamp$1(date, interval) {
    return (0, _index2.min)([(0, _index.max)([date, interval.start]), interval.end]);
  }
  return clamp;
}

var closestIndexTo = {};

var hasRequiredClosestIndexTo;

function requireClosestIndexTo() {
  if (hasRequiredClosestIndexTo) return closestIndexTo;
  hasRequiredClosestIndexTo = 1;
  closestIndexTo.closestIndexTo = closestIndexTo$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name closestIndexTo
   * @category Common Helpers
   * @summary Return an index of the closest date from the array comparing to the given date.
   *
   * @description
   * Return an index of the closest date from the array comparing to the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateToCompare - The date to compare with
   * @param dates - The array to search
   *
   * @returns An index of the date closest to the given date or undefined if no valid value is given
   *
   * @example
   * // Which date is closer to 6 September 2015?
   * const dateToCompare = new Date(2015, 8, 6)
   * const datesArray = [
   *   new Date(2015, 0, 1),
   *   new Date(2016, 0, 1),
   *   new Date(2017, 0, 1)
   * ]
   * const result = closestIndexTo(dateToCompare, datesArray)
   * //=> 1
   */
  function closestIndexTo$1(dateToCompare, dates) {
    const date = (0, _index.toDate)(dateToCompare);

    if (isNaN(Number(date))) return NaN;

    const timeToCompare = date.getTime();

    let result;
    let minDistance;
    dates.forEach(function (dirtyDate, index) {
      const currentDate = (0, _index.toDate)(dirtyDate);

      if (isNaN(Number(currentDate))) {
        result = NaN;
        minDistance = NaN;
        return;
      }

      const distance = Math.abs(timeToCompare - currentDate.getTime());
      if (result == null || distance < minDistance) {
        result = index;
        minDistance = distance;
      }
    });

    return result;
  }
  return closestIndexTo;
}

var closestTo = {};

var hasRequiredClosestTo;

function requireClosestTo() {
  if (hasRequiredClosestTo) return closestTo;
  hasRequiredClosestTo = 1;
  closestTo.closestTo = closestTo$1;
  var _index = /*@__PURE__*/ requireConstructFrom();
  var _index2 = /*@__PURE__*/ requireToDate();

  /**
   * @name closestTo
   * @category Common Helpers
   * @summary Return a date from the array closest to the given date.
   *
   * @description
   * Return a date from the array closest to the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateToCompare - The date to compare with
   * @param dates - The array to search
   *
   * @returns The date from the array closest to the given date or undefined if no valid value is given
   *
   * @example
   * // Which date is closer to 6 September 2015: 1 January 2000 or 1 January 2030?
   * const dateToCompare = new Date(2015, 8, 6)
   * const result = closestTo(dateToCompare, [
   *   new Date(2000, 0, 1),
   *   new Date(2030, 0, 1)
   * ])
   * //=> Tue Jan 01 2030 00:00:00
   */
  function closestTo$1(dateToCompare, dates) {
    const date = (0, _index2.toDate)(dateToCompare);

    if (isNaN(Number(date))) return (0, _index.constructFrom)(dateToCompare, NaN);

    const timeToCompare = date.getTime();

    let result;
    let minDistance;
    dates.forEach(dirtyDate => {
      const currentDate = (0, _index2.toDate)(dirtyDate);

      if (isNaN(Number(currentDate))) {
        result = (0, _index.constructFrom)(dateToCompare, NaN);
        minDistance = NaN;
        return;
      }

      const distance = Math.abs(timeToCompare - currentDate.getTime());
      if (result == null || distance < minDistance) {
        result = currentDate;
        minDistance = distance;
      }
    });

    return result;
  }
  return closestTo;
}

var compareAsc = {};

var hasRequiredCompareAsc;

function requireCompareAsc() {
  if (hasRequiredCompareAsc) return compareAsc;
  hasRequiredCompareAsc = 1;
  compareAsc.compareAsc = compareAsc$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name compareAsc
   * @category Common Helpers
   * @summary Compare the two dates and return -1, 0 or 1.
   *
   * @description
   * Compare the two dates and return 1 if the first date is after the second,
   * -1 if the first date is before the second or 0 if dates are equal.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The first date to compare
   * @param dateRight - The second date to compare
   *
   * @returns The result of the comparison
   *
   * @example
   * // Compare 11 February 1987 and 10 July 1989:
   * const result = compareAsc(new Date(1987, 1, 11), new Date(1989, 6, 10))
   * //=> -1
   *
   * @example
   * // Sort the array of dates:
   * const result = [
   *   new Date(1995, 6, 2),
   *   new Date(1987, 1, 11),
   *   new Date(1989, 6, 10)
   * ].sort(compareAsc)
   * //=> [
   * //   Wed Feb 11 1987 00:00:00,
   * //   Mon Jul 10 1989 00:00:00,
   * //   Sun Jul 02 1995 00:00:00
   * // ]
   */
  function compareAsc$1(dateLeft, dateRight) {
    const _dateLeft = (0, _index.toDate)(dateLeft);
    const _dateRight = (0, _index.toDate)(dateRight);

    const diff = _dateLeft.getTime() - _dateRight.getTime();

    if (diff < 0) {
      return -1;
    } else if (diff > 0) {
      return 1;
      // Return 0 if diff is 0; return NaN if diff is NaN
    } else {
      return diff;
    }
  }
  return compareAsc;
}

var compareDesc = {};

var hasRequiredCompareDesc;

function requireCompareDesc() {
  if (hasRequiredCompareDesc) return compareDesc;
  hasRequiredCompareDesc = 1;
  compareDesc.compareDesc = compareDesc$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name compareDesc
   * @category Common Helpers
   * @summary Compare the two dates reverse chronologically and return -1, 0 or 1.
   *
   * @description
   * Compare the two dates and return -1 if the first date is after the second,
   * 1 if the first date is before the second or 0 if dates are equal.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The first date to compare
   * @param dateRight - The second date to compare
   *
   * @returns The result of the comparison
   *
   * @example
   * // Compare 11 February 1987 and 10 July 1989 reverse chronologically:
   * const result = compareDesc(new Date(1987, 1, 11), new Date(1989, 6, 10))
   * //=> 1
   *
   * @example
   * // Sort the array of dates in reverse chronological order:
   * const result = [
   *   new Date(1995, 6, 2),
   *   new Date(1987, 1, 11),
   *   new Date(1989, 6, 10)
   * ].sort(compareDesc)
   * //=> [
   * //   Sun Jul 02 1995 00:00:00,
   * //   Mon Jul 10 1989 00:00:00,
   * //   Wed Feb 11 1987 00:00:00
   * // ]
   */
  function compareDesc$1(dateLeft, dateRight) {
    const _dateLeft = (0, _index.toDate)(dateLeft);
    const _dateRight = (0, _index.toDate)(dateRight);

    const diff = _dateLeft.getTime() - _dateRight.getTime();

    if (diff > 0) {
      return -1;
    } else if (diff < 0) {
      return 1;
      // Return 0 if diff is 0; return NaN if diff is NaN
    } else {
      return diff;
    }
  }
  return compareDesc;
}

var constructNow = {};

var hasRequiredConstructNow;

function requireConstructNow() {
  if (hasRequiredConstructNow) return constructNow;
  hasRequiredConstructNow = 1;
  constructNow.constructNow = constructNow$1;
  var _index = /*@__PURE__*/ requireConstructFrom();

  /**
   * @name constructNow
   * @category Generic Helpers
   * @summary Constructs a new current date using the passed value constructor.
   * @pure false
   *
   * @description
   * The function constructs a new current date using the constructor from
   * the reference date. It helps to build generic functions that accept date
   * extensions and use the current date.
   *
   * It defaults to `Date` if the passed reference date is a number or a string.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The reference date to take constructor from
   *
   * @returns Current date initialized using the given date constructor
   *
   * @example
   * import { constructNow, isSameDay } from 'date-fns'
   *
   * function isToday<DateType extends Date>(
   *   date: DateType | number | string,
   * ): boolean {
   *   // If we were to use `new Date()` directly, the function would  behave
   *   // differently in different timezones and return false for the same date.
   *   return isSameDay(date, constructNow(date));
   * }
   */
  function constructNow$1(date) {
    return (0, _index.constructFrom)(date, Date.now());
  }
  return constructNow;
}

var daysToWeeks = {};

var hasRequiredDaysToWeeks;

function requireDaysToWeeks() {
  if (hasRequiredDaysToWeeks) return daysToWeeks;
  hasRequiredDaysToWeeks = 1;
  daysToWeeks.daysToWeeks = daysToWeeks$1;
  var _index = /*@__PURE__*/ requireConstants$1();

  /**
   * @name daysToWeeks
   * @category Conversion Helpers
   * @summary Convert days to weeks.
   *
   * @description
   * Convert a number of days to a full number of weeks.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param days - The number of days to be converted
   *
   * @returns The number of days converted in weeks
   *
   * @example
   * // Convert 14 days to weeks:
   * const result = daysToWeeks(14)
   * //=> 2
   *
   * @example
   * // It uses trunc rounding:
   * const result = daysToWeeks(13)
   * //=> 1
   */
  function daysToWeeks$1(days) {
    const weeks = days / _index.daysInWeek;
    const result = Math.trunc(weeks);
    // Prevent negative zero
    return result === 0 ? 0 : result;
  }
  return daysToWeeks;
}

var differenceInBusinessDays = {};

var isSameDay = {};

var hasRequiredIsSameDay;

function requireIsSameDay() {
  if (hasRequiredIsSameDay) return isSameDay;
  hasRequiredIsSameDay = 1;
  isSameDay.isSameDay = isSameDay$1;
  var _index = /*@__PURE__*/ requireStartOfDay();

  /**
	 * @name isSameDay
	 * @category Day Helpers
	 * @summary Are the given dates in the same day (and year and month)?
	 *
	 * @description
	 * Are the given dates in the same day (and year and month)?
	 *
	 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
	 *
	 * @param dateLeft - The first date to check
	 * @param dateRight - The second date to check

	 * @returns The dates are in the same day (and year and month)
	 *
	 * @example
	 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
	 * const result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
	 * //=> true
	 *
	 * @example
	 * // Are 4 September and 4 October in the same day?
	 * const result = isSameDay(new Date(2014, 8, 4), new Date(2014, 9, 4))
	 * //=> false
	 *
	 * @example
	 * // Are 4 September, 2014 and 4 September, 2015 in the same day?
	 * const result = isSameDay(new Date(2014, 8, 4), new Date(2015, 8, 4))
	 * //=> false
	 */
  function isSameDay$1(dateLeft, dateRight) {
    const dateLeftStartOfDay = (0, _index.startOfDay)(dateLeft);
    const dateRightStartOfDay = (0, _index.startOfDay)(dateRight);

    return +dateLeftStartOfDay === +dateRightStartOfDay;
  }
  return isSameDay;
}

var isValid = {};

var isDate = {};

var hasRequiredIsDate;

function requireIsDate() {
  if (hasRequiredIsDate) return isDate;
  hasRequiredIsDate = 1;
  isDate.isDate = isDate$1; /**
   * @name isDate
   * @category Common Helpers
   * @summary Is the given value a date?
   *
   * @description
   * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
   *
   * @param value - The value to check
   *
   * @returns True if the given value is a date
   *
   * @example
   * // For a valid date:
   * const result = isDate(new Date())
   * //=> true
   *
   * @example
   * // For an invalid date:
   * const result = isDate(new Date(NaN))
   * //=> true
   *
   * @example
   * // For some value:
   * const result = isDate('2014-02-31')
   * //=> false
   *
   * @example
   * // For an object:
   * const result = isDate({})
   * //=> false
   */
  function isDate$1(value) {
    return value instanceof Date || (typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]');
  }
  return isDate;
}

var hasRequiredIsValid;

function requireIsValid() {
  if (hasRequiredIsValid) return isValid;
  hasRequiredIsValid = 1;
  isValid.isValid = isValid$1;
  var _index = /*@__PURE__*/ requireIsDate();
  var _index2 = /*@__PURE__*/ requireToDate();

  /**
   * @name isValid
   * @category Common Helpers
   * @summary Is the given date valid?
   *
   * @description
   * Returns false if argument is Invalid Date and true otherwise.
   * Argument is converted to Date using `toDate`. See [toDate](https://date-fns.org/docs/toDate)
   * Invalid Date is a Date, whose time value is NaN.
   *
   * Time value of Date: http://es5.github.io/#x15.9.1.1
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   *
   * @returns The date is valid
   *
   * @example
   * // For the valid date:
   * const result = isValid(new Date(2014, 1, 31))
   * //=> true
   *
   * @example
   * // For the value, convertable into a date:
   * const result = isValid(1393804800000)
   * //=> true
   *
   * @example
   * // For the invalid date:
   * const result = isValid(new Date(''))
   * //=> false
   */
  function isValid$1(date) {
    if (!(0, _index.isDate)(date) && typeof date !== 'number') {
      return false;
    }
    const _date = (0, _index2.toDate)(date);
    return !isNaN(Number(_date));
  }
  return isValid;
}

var hasRequiredDifferenceInBusinessDays;

function requireDifferenceInBusinessDays() {
  if (hasRequiredDifferenceInBusinessDays) return differenceInBusinessDays;
  hasRequiredDifferenceInBusinessDays = 1;
  differenceInBusinessDays.differenceInBusinessDays = differenceInBusinessDays$1;
  var _index = /*@__PURE__*/ requireAddDays();
  var _index2 = /*@__PURE__*/ requireDifferenceInCalendarDays();
  var _index3 = /*@__PURE__*/ requireIsSameDay();
  var _index4 = /*@__PURE__*/ requireIsValid();
  var _index5 = /*@__PURE__*/ requireIsWeekend();
  var _index6 = /*@__PURE__*/ requireToDate();

  /**
   * @name differenceInBusinessDays
   * @category Day Helpers
   * @summary Get the number of business days between the given dates.
   *
   * @description
   * Get the number of business day periods between the given dates.
   * Business days being days that arent in the weekend.
   * Like `differenceInCalendarDays`, the function removes the times from
   * the dates before calculating the difference.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The later date
   * @param dateRight - The earlier date
   *
   * @returns The number of business days
   *
   * @example
   * // How many business days are between
   * // 10 January 2014 and 20 July 2014?
   * const result = differenceInBusinessDays(
   *   new Date(2014, 6, 20),
   *   new Date(2014, 0, 10)
   * )
   * //=> 136
   *
   * // How many business days are between
   * // 30 November 2021 and 1 November 2021?
   * const result = differenceInBusinessDays(
   *   new Date(2021, 10, 30),
   *   new Date(2021, 10, 1)
   * )
   * //=> 21
   *
   * // How many business days are between
   * // 1 November 2021 and 1 December 2021?
   * const result = differenceInBusinessDays(
   *   new Date(2021, 10, 1),
   *   new Date(2021, 11, 1)
   * )
   * //=> -22
   *
   * // How many business days are between
   * // 1 November 2021 and 1 November 2021 ?
   * const result = differenceInBusinessDays(
   *   new Date(2021, 10, 1),
   *   new Date(2021, 10, 1)
   * )
   * //=> 0
   */
  function differenceInBusinessDays$1(dateLeft, dateRight) {
    const _dateLeft = (0, _index6.toDate)(dateLeft);
    let _dateRight = (0, _index6.toDate)(dateRight);

    if (!(0, _index4.isValid)(_dateLeft) || !(0, _index4.isValid)(_dateRight)) return NaN;

    const calendarDifference = (0, _index2.differenceInCalendarDays)(_dateLeft, _dateRight);
    const sign = calendarDifference < 0 ? -1 : 1;

    const weeks = Math.trunc(calendarDifference / 7);

    let result = weeks * 5;
    _dateRight = (0, _index.addDays)(_dateRight, weeks * 7);

    // the loop below will run at most 6 times to account for the remaining days that don't makeup a full week
    while (!(0, _index3.isSameDay)(_dateLeft, _dateRight)) {
      // sign is used to account for both negative and positive differences
      result += (0, _index5.isWeekend)(_dateRight) ? 0 : sign;
      _dateRight = (0, _index.addDays)(_dateRight, sign);
    }

    // Prevent negative zero
    return result === 0 ? 0 : result;
  }
  return differenceInBusinessDays;
}

var differenceInCalendarISOWeekYears = {};

var hasRequiredDifferenceInCalendarISOWeekYears;

function requireDifferenceInCalendarISOWeekYears() {
  if (hasRequiredDifferenceInCalendarISOWeekYears) return differenceInCalendarISOWeekYears;
  hasRequiredDifferenceInCalendarISOWeekYears = 1;
  differenceInCalendarISOWeekYears.differenceInCalendarISOWeekYears = differenceInCalendarISOWeekYears$1;
  var _index = /*@__PURE__*/ requireGetISOWeekYear();

  /**
   * @name differenceInCalendarISOWeekYears
   * @category ISO Week-Numbering Year Helpers
   * @summary Get the number of calendar ISO week-numbering years between the given dates.
   *
   * @description
   * Get the number of calendar ISO week-numbering years between the given dates.
   *
   * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The later date
   * @param dateRight - The earlier date
   *
   * @returns The number of calendar ISO week-numbering years
   *
   * @example
   * // How many calendar ISO week-numbering years are 1 January 2010 and 1 January 2012?
   * const result = differenceInCalendarISOWeekYears(
   *   new Date(2012, 0, 1),
   *   new Date(2010, 0, 1)
   * )
   * //=> 2
   */
  function differenceInCalendarISOWeekYears$1(dateLeft, dateRight) {
    return (0, _index.getISOWeekYear)(dateLeft) - (0, _index.getISOWeekYear)(dateRight);
  }
  return differenceInCalendarISOWeekYears;
}

var differenceInCalendarISOWeeks = {};

var hasRequiredDifferenceInCalendarISOWeeks;

function requireDifferenceInCalendarISOWeeks() {
  if (hasRequiredDifferenceInCalendarISOWeeks) return differenceInCalendarISOWeeks;
  hasRequiredDifferenceInCalendarISOWeeks = 1;
  differenceInCalendarISOWeeks.differenceInCalendarISOWeeks = differenceInCalendarISOWeeks$1;
  var _index = /*@__PURE__*/ requireConstants$1();
  var _index2 = /*@__PURE__*/ requireStartOfISOWeek();
  var _index3 = /*@__PURE__*/ requireGetTimezoneOffsetInMilliseconds();

  /**
   * @name differenceInCalendarISOWeeks
   * @category ISO Week Helpers
   * @summary Get the number of calendar ISO weeks between the given dates.
   *
   * @description
   * Get the number of calendar ISO weeks between the given dates.
   *
   * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The later date
   * @param dateRight - The earlier date
   *
   * @returns The number of calendar ISO weeks
   *
   * @example
   * // How many calendar ISO weeks are between 6 July 2014 and 21 July 2014?
   * const result = differenceInCalendarISOWeeks(
   *   new Date(2014, 6, 21),
   *   new Date(2014, 6, 6)
   * )
   * //=> 3
   */
  function differenceInCalendarISOWeeks$1(dateLeft, dateRight) {
    const startOfISOWeekLeft = (0, _index2.startOfISOWeek)(dateLeft);
    const startOfISOWeekRight = (0, _index2.startOfISOWeek)(dateRight);

    const timestampLeft = +startOfISOWeekLeft - (0, _index3.getTimezoneOffsetInMilliseconds)(startOfISOWeekLeft);
    const timestampRight = +startOfISOWeekRight - (0, _index3.getTimezoneOffsetInMilliseconds)(startOfISOWeekRight);

    // Round the number of weeks to the nearest integer because the number of
    // milliseconds in a week is not constant (e.g. it's different in the week of
    // the daylight saving time clock shift).
    return Math.round((timestampLeft - timestampRight) / _index.millisecondsInWeek);
  }
  return differenceInCalendarISOWeeks;
}

var differenceInCalendarMonths = {};

var hasRequiredDifferenceInCalendarMonths;

function requireDifferenceInCalendarMonths() {
  if (hasRequiredDifferenceInCalendarMonths) return differenceInCalendarMonths;
  hasRequiredDifferenceInCalendarMonths = 1;
  differenceInCalendarMonths.differenceInCalendarMonths = differenceInCalendarMonths$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name differenceInCalendarMonths
   * @category Month Helpers
   * @summary Get the number of calendar months between the given dates.
   *
   * @description
   * Get the number of calendar months between the given dates.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The later date
   * @param dateRight - The earlier date
   *
   * @returns The number of calendar months
   *
   * @example
   * // How many calendar months are between 31 January 2014 and 1 September 2014?
   * const result = differenceInCalendarMonths(
   *   new Date(2014, 8, 1),
   *   new Date(2014, 0, 31)
   * )
   * //=> 8
   */
  function differenceInCalendarMonths$1(dateLeft, dateRight) {
    const _dateLeft = (0, _index.toDate)(dateLeft);
    const _dateRight = (0, _index.toDate)(dateRight);

    const yearDiff = _dateLeft.getFullYear() - _dateRight.getFullYear();
    const monthDiff = _dateLeft.getMonth() - _dateRight.getMonth();

    return yearDiff * 12 + monthDiff;
  }
  return differenceInCalendarMonths;
}

var differenceInCalendarQuarters = {};

var getQuarter = {};

var hasRequiredGetQuarter;

function requireGetQuarter() {
  if (hasRequiredGetQuarter) return getQuarter;
  hasRequiredGetQuarter = 1;
  getQuarter.getQuarter = getQuarter$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name getQuarter
   * @category Quarter Helpers
   * @summary Get the year quarter of the given date.
   *
   * @description
   * Get the year quarter of the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given date
   *
   * @returns The quarter
   *
   * @example
   * // Which quarter is 2 July 2014?
   * const result = getQuarter(new Date(2014, 6, 2))
   * //=> 3
   */
  function getQuarter$1(date) {
    const _date = (0, _index.toDate)(date);
    const quarter = Math.trunc(_date.getMonth() / 3) + 1;
    return quarter;
  }
  return getQuarter;
}

var hasRequiredDifferenceInCalendarQuarters;

function requireDifferenceInCalendarQuarters() {
  if (hasRequiredDifferenceInCalendarQuarters) return differenceInCalendarQuarters;
  hasRequiredDifferenceInCalendarQuarters = 1;
  differenceInCalendarQuarters.differenceInCalendarQuarters = differenceInCalendarQuarters$1;
  var _index = /*@__PURE__*/ requireGetQuarter();
  var _index2 = /*@__PURE__*/ requireToDate();

  /**
	 * @name differenceInCalendarQuarters
	 * @category Quarter Helpers
	 * @summary Get the number of calendar quarters between the given dates.
	 *
	 * @description
	 * Get the number of calendar quarters between the given dates.
	 *
	 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
	 *
	 * @param dateLeft - The later date
	 * @param dateRight - The earlier date

	 * @returns The number of calendar quarters
	 *
	 * @example
	 * // How many calendar quarters are between 31 December 2013 and 2 July 2014?
	 * const result = differenceInCalendarQuarters(
	 *   new Date(2014, 6, 2),
	 *   new Date(2013, 11, 31)
	 * )
	 * //=> 3
	 */
  function differenceInCalendarQuarters$1(dateLeft, dateRight) {
    const _dateLeft = (0, _index2.toDate)(dateLeft);
    const _dateRight = (0, _index2.toDate)(dateRight);

    const yearDiff = _dateLeft.getFullYear() - _dateRight.getFullYear();
    const quarterDiff = (0, _index.getQuarter)(_dateLeft) - (0, _index.getQuarter)(_dateRight);

    return yearDiff * 4 + quarterDiff;
  }
  return differenceInCalendarQuarters;
}

var differenceInCalendarWeeks = {};

var hasRequiredDifferenceInCalendarWeeks;

function requireDifferenceInCalendarWeeks() {
  if (hasRequiredDifferenceInCalendarWeeks) return differenceInCalendarWeeks;
  hasRequiredDifferenceInCalendarWeeks = 1;
  differenceInCalendarWeeks.differenceInCalendarWeeks = differenceInCalendarWeeks$1;
  var _index = /*@__PURE__*/ requireConstants$1();
  var _index2 = /*@__PURE__*/ requireStartOfWeek();

  var _index3 = /*@__PURE__*/ requireGetTimezoneOffsetInMilliseconds();

  /**
   * The {@link differenceInCalendarWeeks} function options.
   */

  /**
   * @name differenceInCalendarWeeks
   * @category Week Helpers
   * @summary Get the number of calendar weeks between the given dates.
   *
   * @description
   * Get the number of calendar weeks between the given dates.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The later date
   * @param dateRight - The earlier date
   * @param options - An object with options.
   *
   * @returns The number of calendar weeks
   *
   * @example
   * // How many calendar weeks are between 5 July 2014 and 20 July 2014?
   * const result = differenceInCalendarWeeks(
   *   new Date(2014, 6, 20),
   *   new Date(2014, 6, 5)
   * )
   * //=> 3
   *
   * @example
   * // If the week starts on Monday,
   * // how many calendar weeks are between 5 July 2014 and 20 July 2014?
   * const result = differenceInCalendarWeeks(
   *   new Date(2014, 6, 20),
   *   new Date(2014, 6, 5),
   *   { weekStartsOn: 1 }
   * )
   * //=> 2
   */
  function differenceInCalendarWeeks$1(dateLeft, dateRight, options) {
    const startOfWeekLeft = (0, _index2.startOfWeek)(dateLeft, options);
    const startOfWeekRight = (0, _index2.startOfWeek)(dateRight, options);

    const timestampLeft = +startOfWeekLeft - (0, _index3.getTimezoneOffsetInMilliseconds)(startOfWeekLeft);
    const timestampRight = +startOfWeekRight - (0, _index3.getTimezoneOffsetInMilliseconds)(startOfWeekRight);

    // Round the number of days to the nearest integer because the number of
    // milliseconds in a days is not constant (e.g. it's different in the week of
    // the daylight saving time clock shift).
    return Math.round((timestampLeft - timestampRight) / _index.millisecondsInWeek);
  }
  return differenceInCalendarWeeks;
}

var differenceInCalendarYears = {};

var hasRequiredDifferenceInCalendarYears;

function requireDifferenceInCalendarYears() {
  if (hasRequiredDifferenceInCalendarYears) return differenceInCalendarYears;
  hasRequiredDifferenceInCalendarYears = 1;
  differenceInCalendarYears.differenceInCalendarYears = differenceInCalendarYears$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
	 * @name differenceInCalendarYears
	 * @category Year Helpers
	 * @summary Get the number of calendar years between the given dates.
	 *
	 * @description
	 * Get the number of calendar years between the given dates.
	 *
	 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
	 *
	 * @param dateLeft - The later date
	 * @param dateRight - The earlier date

	 * @returns The number of calendar years
	 *
	 * @example
	 * // How many calendar years are between 31 December 2013 and 11 February 2015?
	 * const result = differenceInCalendarYears(
	 *   new Date(2015, 1, 11),
	 *   new Date(2013, 11, 31)
	 * )
	 * //=> 2
	 */
  function differenceInCalendarYears$1(dateLeft, dateRight) {
    const _dateLeft = (0, _index.toDate)(dateLeft);
    const _dateRight = (0, _index.toDate)(dateRight);

    return _dateLeft.getFullYear() - _dateRight.getFullYear();
  }
  return differenceInCalendarYears;
}

var differenceInDays = {};

var hasRequiredDifferenceInDays;

function requireDifferenceInDays() {
  if (hasRequiredDifferenceInDays) return differenceInDays;
  hasRequiredDifferenceInDays = 1;
  differenceInDays.differenceInDays = differenceInDays$1;
  var _index = /*@__PURE__*/ requireDifferenceInCalendarDays();
  var _index2 = /*@__PURE__*/ requireToDate();

  /**
   * @name differenceInDays
   * @category Day Helpers
   * @summary Get the number of full days between the given dates.
   *
   * @description
   * Get the number of full day periods between two dates. Fractional days are
   * truncated towards zero.
   *
   * One "full day" is the distance between a local time in one day to the same
   * local time on the next or previous day. A full day can sometimes be less than
   * or more than 24 hours if a daylight savings change happens between two dates.
   *
   * To ignore DST and only measure exact 24-hour periods, use this instead:
   * `Math.trunc(differenceInHours(dateLeft, dateRight)/24)|0`.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The later date
   * @param dateRight - The earlier date
   *
   * @returns The number of full days according to the local timezone
   *
   * @example
   * // How many full days are between
   * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
   * const result = differenceInDays(
   *   new Date(2012, 6, 2, 0, 0),
   *   new Date(2011, 6, 2, 23, 0)
   * )
   * //=> 365
   *
   * @example
   * // How many full days are between
   * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
   * const result = differenceInDays(
   *   new Date(2011, 6, 3, 0, 1),
   *   new Date(2011, 6, 2, 23, 59)
   * )
   * //=> 0
   *
   * @example
   * // How many full days are between
   * // 1 March 2020 0:00 and 1 June 2020 0:00 ?
   * // Note: because local time is used, the
   * // result will always be 92 days, even in
   * // time zones where DST starts and the
   * // period has only 92*24-1 hours.
   * const result = differenceInDays(
   *   new Date(2020, 5, 1),
   *   new Date(2020, 2, 1)
   * )
   * //=> 92
   */
  function differenceInDays$1(dateLeft, dateRight) {
    const _dateLeft = (0, _index2.toDate)(dateLeft);
    const _dateRight = (0, _index2.toDate)(dateRight);

    const sign = compareLocalAsc(_dateLeft, _dateRight);
    const difference = Math.abs((0, _index.differenceInCalendarDays)(_dateLeft, _dateRight));

    _dateLeft.setDate(_dateLeft.getDate() - sign * difference);

    // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
    // If so, result must be decreased by 1 in absolute value
    const isLastDayNotFull = Number(compareLocalAsc(_dateLeft, _dateRight) === -sign);
    const result = sign * (difference - isLastDayNotFull);
    // Prevent negative zero
    return result === 0 ? 0 : result;
  }

  // Like `compareAsc` but uses local time not UTC, which is needed
  // for accurate equality comparisons of UTC timestamps that end up
  // having the same representation in local time, e.g. one hour before
  // DST ends vs. the instant that DST ends.
  function compareLocalAsc(dateLeft, dateRight) {
    const diff =
      dateLeft.getFullYear() - dateRight.getFullYear() ||
      dateLeft.getMonth() - dateRight.getMonth() ||
      dateLeft.getDate() - dateRight.getDate() ||
      dateLeft.getHours() - dateRight.getHours() ||
      dateLeft.getMinutes() - dateRight.getMinutes() ||
      dateLeft.getSeconds() - dateRight.getSeconds() ||
      dateLeft.getMilliseconds() - dateRight.getMilliseconds();

    if (diff < 0) {
      return -1;
    } else if (diff > 0) {
      return 1;
      // Return 0 if diff is 0; return NaN if diff is NaN
    } else {
      return diff;
    }
  }
  return differenceInDays;
}

var differenceInHours = {};

var getRoundingMethod = {};

var hasRequiredGetRoundingMethod;

function requireGetRoundingMethod() {
  if (hasRequiredGetRoundingMethod) return getRoundingMethod;
  hasRequiredGetRoundingMethod = 1;
  getRoundingMethod.getRoundingMethod = getRoundingMethod$1;

  function getRoundingMethod$1(method) {
    return number => {
      const round = method ? Math[method] : Math.trunc;
      const result = round(number);
      // Prevent negative zero
      return result === 0 ? 0 : result;
    };
  }
  return getRoundingMethod;
}

var differenceInMilliseconds = {};

var hasRequiredDifferenceInMilliseconds;

function requireDifferenceInMilliseconds() {
  if (hasRequiredDifferenceInMilliseconds) return differenceInMilliseconds;
  hasRequiredDifferenceInMilliseconds = 1;
  differenceInMilliseconds.differenceInMilliseconds = differenceInMilliseconds$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name differenceInMilliseconds
   * @category Millisecond Helpers
   * @summary Get the number of milliseconds between the given dates.
   *
   * @description
   * Get the number of milliseconds between the given dates.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The later date
   * @param dateRight - The earlier date
   *
   * @returns The number of milliseconds
   *
   * @example
   * // How many milliseconds are between
   * // 2 July 2014 12:30:20.600 and 2 July 2014 12:30:21.700?
   * const result = differenceInMilliseconds(
   *   new Date(2014, 6, 2, 12, 30, 21, 700),
   *   new Date(2014, 6, 2, 12, 30, 20, 600)
   * )
   * //=> 1100
   */
  function differenceInMilliseconds$1(dateLeft, dateRight) {
    return +(0, _index.toDate)(dateLeft) - +(0, _index.toDate)(dateRight);
  }
  return differenceInMilliseconds;
}

var hasRequiredDifferenceInHours;

function requireDifferenceInHours() {
  if (hasRequiredDifferenceInHours) return differenceInHours;
  hasRequiredDifferenceInHours = 1;
  differenceInHours.differenceInHours = differenceInHours$1;
  var _index = /*@__PURE__*/ requireGetRoundingMethod();
  var _index2 = /*@__PURE__*/ requireConstants$1();
  var _index3 = /*@__PURE__*/ requireDifferenceInMilliseconds();

  /**
   * The {@link differenceInHours} function options.
   */

  /**
   * @name differenceInHours
   * @category Hour Helpers
   * @summary Get the number of hours between the given dates.
   *
   * @description
   * Get the number of hours between the given dates.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The later date
   * @param dateRight - The earlier date
   * @param options - An object with options.
   *
   * @returns The number of hours
   *
   * @example
   * // How many hours are between 2 July 2014 06:50:00 and 2 July 2014 19:00:00?
   * const result = differenceInHours(
   *   new Date(2014, 6, 2, 19, 0),
   *   new Date(2014, 6, 2, 6, 50)
   * )
   * //=> 12
   */
  function differenceInHours$1(dateLeft, dateRight, options) {
    const diff = (0, _index3.differenceInMilliseconds)(dateLeft, dateRight) / _index2.millisecondsInHour;
    return (0, _index.getRoundingMethod)(options?.roundingMethod)(diff);
  }
  return differenceInHours;
}

var differenceInISOWeekYears = {};

var subISOWeekYears = {};

var hasRequiredSubISOWeekYears;

function requireSubISOWeekYears() {
  if (hasRequiredSubISOWeekYears) return subISOWeekYears;
  hasRequiredSubISOWeekYears = 1;
  subISOWeekYears.subISOWeekYears = subISOWeekYears$1;
  var _index = /*@__PURE__*/ requireAddISOWeekYears();

  /**
   * @name subISOWeekYears
   * @category ISO Week-Numbering Year Helpers
   * @summary Subtract the specified number of ISO week-numbering years from the given date.
   *
   * @description
   * Subtract the specified number of ISO week-numbering years from the given date.
   *
   * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param amount - The amount of ISO week-numbering years to be subtracted.
   *
   * @returns The new date with the ISO week-numbering years subtracted
   *
   * @example
   * // Subtract 5 ISO week-numbering years from 1 September 2014:
   * const result = subISOWeekYears(new Date(2014, 8, 1), 5)
   * //=> Mon Aug 31 2009 00:00:00
   */
  function subISOWeekYears$1(date, amount) {
    return (0, _index.addISOWeekYears)(date, -amount);
  }
  return subISOWeekYears;
}

var hasRequiredDifferenceInISOWeekYears;

function requireDifferenceInISOWeekYears() {
  if (hasRequiredDifferenceInISOWeekYears) return differenceInISOWeekYears;
  hasRequiredDifferenceInISOWeekYears = 1;
  differenceInISOWeekYears.differenceInISOWeekYears = differenceInISOWeekYears$1;
  var _index = /*@__PURE__*/ requireCompareAsc();
  var _index2 = /*@__PURE__*/ requireDifferenceInCalendarISOWeekYears();
  var _index3 = /*@__PURE__*/ requireSubISOWeekYears();
  var _index4 = /*@__PURE__*/ requireToDate();

  /**
   * @name differenceInISOWeekYears
   * @category ISO Week-Numbering Year Helpers
   * @summary Get the number of full ISO week-numbering years between the given dates.
   *
   * @description
   * Get the number of full ISO week-numbering years between the given dates.
   *
   * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The later date
   * @param dateRight - The earlier date
   *
   * @returns The number of full ISO week-numbering years
   *
   * @example
   * // How many full ISO week-numbering years are between 1 January 2010 and 1 January 2012?
   * const result = differenceInISOWeekYears(
   *   new Date(2012, 0, 1),
   *   new Date(2010, 0, 1)
   * )
   * //=> 1
   */
  function differenceInISOWeekYears$1(dateLeft, dateRight) {
    let _dateLeft = (0, _index4.toDate)(dateLeft);
    const _dateRight = (0, _index4.toDate)(dateRight);

    const sign = (0, _index.compareAsc)(_dateLeft, _dateRight);
    const difference = Math.abs((0, _index2.differenceInCalendarISOWeekYears)(_dateLeft, _dateRight));
    _dateLeft = (0, _index3.subISOWeekYears)(_dateLeft, sign * difference);

    // Math.abs(diff in full ISO years - diff in calendar ISO years) === 1
    // if last calendar ISO year is not full
    // If so, result must be decreased by 1 in absolute value
    const isLastISOWeekYearNotFull = Number((0, _index.compareAsc)(_dateLeft, _dateRight) === -sign);
    const result = sign * (difference - isLastISOWeekYearNotFull);
    // Prevent negative zero
    return result === 0 ? 0 : result;
  }
  return differenceInISOWeekYears;
}

var differenceInMinutes = {};

var hasRequiredDifferenceInMinutes;

function requireDifferenceInMinutes() {
  if (hasRequiredDifferenceInMinutes) return differenceInMinutes;
  hasRequiredDifferenceInMinutes = 1;
  differenceInMinutes.differenceInMinutes = differenceInMinutes$1;
  var _index = /*@__PURE__*/ requireGetRoundingMethod();
  var _index2 = /*@__PURE__*/ requireConstants$1();
  var _index3 = /*@__PURE__*/ requireDifferenceInMilliseconds();

  /**
   * The {@link differenceInMinutes} function options.
   */

  /**
   * @name differenceInMinutes
   * @category Minute Helpers
   * @summary Get the number of minutes between the given dates.
   *
   * @description
   * Get the signed number of full (rounded towards 0) minutes between the given dates.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The later date
   * @param dateRight - The earlier date
   * @param options - An object with options.
   *
   * @returns The number of minutes
   *
   * @example
   * // How many minutes are between 2 July 2014 12:07:59 and 2 July 2014 12:20:00?
   * const result = differenceInMinutes(
   *   new Date(2014, 6, 2, 12, 20, 0),
   *   new Date(2014, 6, 2, 12, 7, 59)
   * )
   * //=> 12
   *
   * @example
   * // How many minutes are between 10:01:59 and 10:00:00
   * const result = differenceInMinutes(
   *   new Date(2000, 0, 1, 10, 0, 0),
   *   new Date(2000, 0, 1, 10, 1, 59)
   * )
   * //=> -1
   */
  function differenceInMinutes$1(dateLeft, dateRight, options) {
    const diff = (0, _index3.differenceInMilliseconds)(dateLeft, dateRight) / _index2.millisecondsInMinute;
    return (0, _index.getRoundingMethod)(options?.roundingMethod)(diff);
  }
  return differenceInMinutes;
}

var differenceInMonths = {};

var isLastDayOfMonth = {};

var endOfDay = {};

var hasRequiredEndOfDay;

function requireEndOfDay() {
  if (hasRequiredEndOfDay) return endOfDay;
  hasRequiredEndOfDay = 1;
  endOfDay.endOfDay = endOfDay$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name endOfDay
   * @category Day Helpers
   * @summary Return the end of a day for the given date.
   *
   * @description
   * Return the end of a day for the given date.
   * The result will be in the local timezone.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The end of a day
   *
   * @example
   * // The end of a day for 2 September 2014 11:55:00:
   * const result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
   * //=> Tue Sep 02 2014 23:59:59.999
   */
  function endOfDay$1(date) {
    const _date = (0, _index.toDate)(date);
    _date.setHours(23, 59, 59, 999);
    return _date;
  }
  return endOfDay;
}

var endOfMonth = {};

var hasRequiredEndOfMonth;

function requireEndOfMonth() {
  if (hasRequiredEndOfMonth) return endOfMonth;
  hasRequiredEndOfMonth = 1;
  endOfMonth.endOfMonth = endOfMonth$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name endOfMonth
   * @category Month Helpers
   * @summary Return the end of a month for the given date.
   *
   * @description
   * Return the end of a month for the given date.
   * The result will be in the local timezone.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The end of a month
   *
   * @example
   * // The end of a month for 2 September 2014 11:55:00:
   * const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
   * //=> Tue Sep 30 2014 23:59:59.999
   */
  function endOfMonth$1(date) {
    const _date = (0, _index.toDate)(date);
    const month = _date.getMonth();
    _date.setFullYear(_date.getFullYear(), month + 1, 0);
    _date.setHours(23, 59, 59, 999);
    return _date;
  }
  return endOfMonth;
}

var hasRequiredIsLastDayOfMonth;

function requireIsLastDayOfMonth() {
  if (hasRequiredIsLastDayOfMonth) return isLastDayOfMonth;
  hasRequiredIsLastDayOfMonth = 1;
  isLastDayOfMonth.isLastDayOfMonth = isLastDayOfMonth$1;
  var _index = /*@__PURE__*/ requireEndOfDay();
  var _index2 = /*@__PURE__*/ requireEndOfMonth();
  var _index3 = /*@__PURE__*/ requireToDate();

  /**
	 * @name isLastDayOfMonth
	 * @category Month Helpers
	 * @summary Is the given date the last day of a month?
	 *
	 * @description
	 * Is the given date the last day of a month?
	 *
	 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
	 *
	 * @param date - The date to check

	 * @returns The date is the last day of a month
	 *
	 * @example
	 * // Is 28 February 2014 the last day of a month?
	 * const result = isLastDayOfMonth(new Date(2014, 1, 28))
	 * //=> true
	 */
  function isLastDayOfMonth$1(date) {
    const _date = (0, _index3.toDate)(date);
    return +(0, _index.endOfDay)(_date) === +(0, _index2.endOfMonth)(_date);
  }
  return isLastDayOfMonth;
}

var hasRequiredDifferenceInMonths;

function requireDifferenceInMonths() {
  if (hasRequiredDifferenceInMonths) return differenceInMonths;
  hasRequiredDifferenceInMonths = 1;
  differenceInMonths.differenceInMonths = differenceInMonths$1;
  var _index = /*@__PURE__*/ requireCompareAsc();
  var _index2 = /*@__PURE__*/ requireDifferenceInCalendarMonths();
  var _index3 = /*@__PURE__*/ requireIsLastDayOfMonth();
  var _index4 = /*@__PURE__*/ requireToDate();

  /**
   * @name differenceInMonths
   * @category Month Helpers
   * @summary Get the number of full months between the given dates.
   *
   * @description
   * Get the number of full months between the given dates using trunc as a default rounding method.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The later date
   * @param dateRight - The earlier date
   *
   * @returns The number of full months
   *
   * @example
   * // How many full months are between 31 January 2014 and 1 September 2014?
   * const result = differenceInMonths(new Date(2014, 8, 1), new Date(2014, 0, 31))
   * //=> 7
   */
  function differenceInMonths$1(dateLeft, dateRight) {
    const _dateLeft = (0, _index4.toDate)(dateLeft);
    const _dateRight = (0, _index4.toDate)(dateRight);

    const sign = (0, _index.compareAsc)(_dateLeft, _dateRight);
    const difference = Math.abs((0, _index2.differenceInCalendarMonths)(_dateLeft, _dateRight));
    let result;

    // Check for the difference of less than month
    if (difference < 1) {
      result = 0;
    } else {
      if (_dateLeft.getMonth() === 1 && _dateLeft.getDate() > 27) {
        // This will check if the date is end of Feb and assign a higher end of month date
        // to compare it with Jan
        _dateLeft.setDate(30);
      }

      _dateLeft.setMonth(_dateLeft.getMonth() - sign * difference);

      // Math.abs(diff in full months - diff in calendar months) === 1 if last calendar month is not full
      // If so, result must be decreased by 1 in absolute value
      let isLastMonthNotFull = (0, _index.compareAsc)(_dateLeft, _dateRight) === -sign;

      // Check for cases of one full calendar month
      if ((0, _index3.isLastDayOfMonth)((0, _index4.toDate)(dateLeft)) && difference === 1 && (0, _index.compareAsc)(dateLeft, _dateRight) === 1) {
        isLastMonthNotFull = false;
      }

      result = sign * (difference - Number(isLastMonthNotFull));
    }

    // Prevent negative zero
    return result === 0 ? 0 : result;
  }
  return differenceInMonths;
}

var differenceInQuarters = {};

var hasRequiredDifferenceInQuarters;

function requireDifferenceInQuarters() {
  if (hasRequiredDifferenceInQuarters) return differenceInQuarters;
  hasRequiredDifferenceInQuarters = 1;
  differenceInQuarters.differenceInQuarters = differenceInQuarters$1;
  var _index = /*@__PURE__*/ requireGetRoundingMethod();
  var _index2 = /*@__PURE__*/ requireDifferenceInMonths();

  /**
   * The {@link differenceInQuarters} function options.
   */

  /**
   * @name differenceInQuarters
   * @category Quarter Helpers
   * @summary Get the number of quarters between the given dates.
   *
   * @description
   * Get the number of quarters between the given dates.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The later date
   * @param dateRight - The earlier date
   * @param options - An object with options.
   *
   * @returns The number of full quarters
   *
   * @example
   * // How many full quarters are between 31 December 2013 and 2 July 2014?
   * const result = differenceInQuarters(new Date(2014, 6, 2), new Date(2013, 11, 31))
   * //=> 2
   */
  function differenceInQuarters$1(dateLeft, dateRight, options) {
    const diff = (0, _index2.differenceInMonths)(dateLeft, dateRight) / 3;
    return (0, _index.getRoundingMethod)(options?.roundingMethod)(diff);
  }
  return differenceInQuarters;
}

var differenceInSeconds = {};

var hasRequiredDifferenceInSeconds;

function requireDifferenceInSeconds() {
  if (hasRequiredDifferenceInSeconds) return differenceInSeconds;
  hasRequiredDifferenceInSeconds = 1;
  differenceInSeconds.differenceInSeconds = differenceInSeconds$1;
  var _index = /*@__PURE__*/ requireGetRoundingMethod();
  var _index2 = /*@__PURE__*/ requireDifferenceInMilliseconds();

  /**
   * The {@link differenceInSeconds} function options.
   */

  /**
   * @name differenceInSeconds
   * @category Second Helpers
   * @summary Get the number of seconds between the given dates.
   *
   * @description
   * Get the number of seconds between the given dates.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The later date
   * @param dateRight - The earlier date
   * @param options - An object with options.
   *
   * @returns The number of seconds
   *
   * @example
   * // How many seconds are between
   * // 2 July 2014 12:30:07.999 and 2 July 2014 12:30:20.000?
   * const result = differenceInSeconds(
   *   new Date(2014, 6, 2, 12, 30, 20, 0),
   *   new Date(2014, 6, 2, 12, 30, 7, 999)
   * )
   * //=> 12
   */
  function differenceInSeconds$1(dateLeft, dateRight, options) {
    const diff = (0, _index2.differenceInMilliseconds)(dateLeft, dateRight) / 1000;
    return (0, _index.getRoundingMethod)(options?.roundingMethod)(diff);
  }
  return differenceInSeconds;
}

var differenceInWeeks = {};

var hasRequiredDifferenceInWeeks;

function requireDifferenceInWeeks() {
  if (hasRequiredDifferenceInWeeks) return differenceInWeeks;
  hasRequiredDifferenceInWeeks = 1;
  differenceInWeeks.differenceInWeeks = differenceInWeeks$1;
  var _index = /*@__PURE__*/ requireGetRoundingMethod();
  var _index2 = /*@__PURE__*/ requireDifferenceInDays();

  /**
   * The {@link differenceInWeeks} function options.
   */

  /**
   * @name differenceInWeeks
   * @category Week Helpers
   * @summary Get the number of full weeks between the given dates.
   *
   * @description
   * Get the number of full weeks between two dates. Fractional weeks are
   * truncated towards zero by default.
   *
   * One "full week" is the distance between a local time in one day to the same
   * local time 7 days earlier or later. A full week can sometimes be less than
   * or more than 7*24 hours if a daylight savings change happens between two dates.
   *
   * To ignore DST and only measure exact 7*24-hour periods, use this instead:
   * `Math.trunc(differenceInHours(dateLeft, dateRight)/(7*24))|0`.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The later date
   * @param dateRight - The earlier date
   * @param options - An object with options
   *
   * @returns The number of full weeks
   *
   * @example
   * // How many full weeks are between 5 July 2014 and 20 July 2014?
   * const result = differenceInWeeks(new Date(2014, 6, 20), new Date(2014, 6, 5))
   * //=> 2
   *
   * @example
   * // How many full weeks are between
   * // 1 March 2020 0:00 and 6 June 2020 0:00 ?
   * // Note: because local time is used, the
   * // result will always be 8 weeks (54 days),
   * // even if DST starts and the period has
   * // only 54*24-1 hours.
   * const result = differenceInWeeks(
   *   new Date(2020, 5, 1),
   *   new Date(2020, 2, 6)
   * )
   * //=> 8
   */
  function differenceInWeeks$1(dateLeft, dateRight, options) {
    const diff = (0, _index2.differenceInDays)(dateLeft, dateRight) / 7;
    return (0, _index.getRoundingMethod)(options?.roundingMethod)(diff);
  }
  return differenceInWeeks;
}

var differenceInYears = {};

var hasRequiredDifferenceInYears;

function requireDifferenceInYears() {
  if (hasRequiredDifferenceInYears) return differenceInYears;
  hasRequiredDifferenceInYears = 1;
  differenceInYears.differenceInYears = differenceInYears$1;
  var _index = /*@__PURE__*/ requireCompareAsc();
  var _index2 = /*@__PURE__*/ requireDifferenceInCalendarYears();
  var _index3 = /*@__PURE__*/ requireToDate();

  /**
   * @name differenceInYears
   * @category Year Helpers
   * @summary Get the number of full years between the given dates.
   *
   * @description
   * Get the number of full years between the given dates.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The later date
   * @param dateRight - The earlier date
   *
   * @returns The number of full years
   *
   * @example
   * // How many full years are between 31 December 2013 and 11 February 2015?
   * const result = differenceInYears(new Date(2015, 1, 11), new Date(2013, 11, 31))
   * //=> 1
   */
  function differenceInYears$1(dateLeft, dateRight) {
    const _dateLeft = (0, _index3.toDate)(dateLeft);
    const _dateRight = (0, _index3.toDate)(dateRight);

    const sign = (0, _index.compareAsc)(_dateLeft, _dateRight);
    const difference = Math.abs((0, _index2.differenceInCalendarYears)(_dateLeft, _dateRight));

    // Set both dates to a valid leap year for accurate comparison when dealing
    // with leap days
    _dateLeft.setFullYear(1584);
    _dateRight.setFullYear(1584);

    // Math.abs(diff in full years - diff in calendar years) === 1 if last calendar year is not full
    // If so, result must be decreased by 1 in absolute value
    const isLastYearNotFull = (0, _index.compareAsc)(_dateLeft, _dateRight) === -sign;
    const result = sign * (difference - +isLastYearNotFull);

    // Prevent negative zero
    return result === 0 ? 0 : result;
  }
  return differenceInYears;
}

var eachDayOfInterval = {};

var hasRequiredEachDayOfInterval;

function requireEachDayOfInterval() {
  if (hasRequiredEachDayOfInterval) return eachDayOfInterval;
  hasRequiredEachDayOfInterval = 1;
  eachDayOfInterval.eachDayOfInterval = eachDayOfInterval$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * The {@link eachDayOfInterval} function options.
   */

  /**
   * @name eachDayOfInterval
   * @category Interval Helpers
   * @summary Return the array of dates within the specified time interval.
   *
   * @description
   * Return the array of dates within the specified time interval.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param interval - The interval.
   * @param options - An object with options.
   *
   * @returns The array with starts of days from the day of the interval start to the day of the interval end
   *
   * @example
   * // Each day between 6 October 2014 and 10 October 2014:
   * const result = eachDayOfInterval({
   *   start: new Date(2014, 9, 6),
   *   end: new Date(2014, 9, 10)
   * })
   * //=> [
   * //   Mon Oct 06 2014 00:00:00,
   * //   Tue Oct 07 2014 00:00:00,
   * //   Wed Oct 08 2014 00:00:00,
   * //   Thu Oct 09 2014 00:00:00,
   * //   Fri Oct 10 2014 00:00:00
   * // ]
   */
  function eachDayOfInterval$1(interval, options) {
    const startDate = (0, _index.toDate)(interval.start);
    const endDate = (0, _index.toDate)(interval.end);

    let reversed = +startDate > +endDate;
    const endTime = reversed ? +startDate : +endDate;
    const currentDate = reversed ? endDate : startDate;
    currentDate.setHours(0, 0, 0, 0);

    let step = options?.step ?? 1;
    if (!step) return [];
    if (step < 0) {
      step = -step;
      reversed = !reversed;
    }

    const dates = [];

    while (+currentDate <= endTime) {
      dates.push((0, _index.toDate)(currentDate));
      currentDate.setDate(currentDate.getDate() + step);
      currentDate.setHours(0, 0, 0, 0);
    }

    return reversed ? dates.reverse() : dates;
  }
  return eachDayOfInterval;
}

var eachHourOfInterval = {};

var hasRequiredEachHourOfInterval;

function requireEachHourOfInterval() {
  if (hasRequiredEachHourOfInterval) return eachHourOfInterval;
  hasRequiredEachHourOfInterval = 1;
  eachHourOfInterval.eachHourOfInterval = eachHourOfInterval$1;
  var _index = /*@__PURE__*/ requireAddHours();
  var _index2 = /*@__PURE__*/ requireToDate();

  /**
   * The {@link eachHourOfInterval} function options.
   */

  /**
   * @name eachHourOfInterval
   * @category Interval Helpers
   * @summary Return the array of hours within the specified time interval.
   *
   * @description
   * Return the array of hours within the specified time interval.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param interval - The interval.
   * @param options - An object with options.
   *
   * @returns The array with starts of hours from the hour of the interval start to the hour of the interval end
   *
   * @example
   * // Each hour between 6 October 2014, 12:00 and 6 October 2014, 15:00
   * const result = eachHourOfInterval({
   *   start: new Date(2014, 9, 6, 12),
   *   end: new Date(2014, 9, 6, 15)
   * })
   * //=> [
   * //   Mon Oct 06 2014 12:00:00,
   * //   Mon Oct 06 2014 13:00:00,
   * //   Mon Oct 06 2014 14:00:00,
   * //   Mon Oct 06 2014 15:00:00
   * // ]
   */
  function eachHourOfInterval$1(interval, options) {
    const startDate = (0, _index2.toDate)(interval.start);
    const endDate = (0, _index2.toDate)(interval.end);

    let reversed = +startDate > +endDate;
    const endTime = reversed ? +startDate : +endDate;
    let currentDate = reversed ? endDate : startDate;
    currentDate.setMinutes(0, 0, 0);

    let step = options?.step ?? 1;
    if (!step) return [];
    if (step < 0) {
      step = -step;
      reversed = !reversed;
    }

    const dates = [];

    while (+currentDate <= endTime) {
      dates.push((0, _index2.toDate)(currentDate));
      currentDate = (0, _index.addHours)(currentDate, step);
    }

    return reversed ? dates.reverse() : dates;
  }
  return eachHourOfInterval;
}

var eachMinuteOfInterval = {};

var startOfMinute = {};

var hasRequiredStartOfMinute;

function requireStartOfMinute() {
  if (hasRequiredStartOfMinute) return startOfMinute;
  hasRequiredStartOfMinute = 1;
  startOfMinute.startOfMinute = startOfMinute$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name startOfMinute
   * @category Minute Helpers
   * @summary Return the start of a minute for the given date.
   *
   * @description
   * Return the start of a minute for the given date.
   * The result will be in the local timezone.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The start of a minute
   *
   * @example
   * // The start of a minute for 1 December 2014 22:15:45.400:
   * const result = startOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))
   * //=> Mon Dec 01 2014 22:15:00
   */
  function startOfMinute$1(date) {
    const _date = (0, _index.toDate)(date);
    _date.setSeconds(0, 0);
    return _date;
  }
  return startOfMinute;
}

var hasRequiredEachMinuteOfInterval;

function requireEachMinuteOfInterval() {
  if (hasRequiredEachMinuteOfInterval) return eachMinuteOfInterval;
  hasRequiredEachMinuteOfInterval = 1;
  eachMinuteOfInterval.eachMinuteOfInterval = eachMinuteOfInterval$1;
  var _index = /*@__PURE__*/ requireAddMinutes();
  var _index2 = /*@__PURE__*/ requireStartOfMinute();
  var _index3 = /*@__PURE__*/ requireToDate();

  /**
   * The {@link eachMinuteOfInterval} function options.
   */

  /**
   * @name eachMinuteOfInterval
   * @category Interval Helpers
   * @summary Return the array of minutes within the specified time interval.
   *
   * @description
   * Returns the array of minutes within the specified time interval.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param interval - The interval.
   * @param options - An object with options.
   *
   * @returns The array with starts of minutes from the minute of the interval start to the minute of the interval end
   *
   * @example
   * // Each minute between 14 October 2020, 13:00 and 14 October 2020, 13:03
   * const result = eachMinuteOfInterval({
   *   start: new Date(2014, 9, 14, 13),
   *   end: new Date(2014, 9, 14, 13, 3)
   * })
   * //=> [
   * //   Wed Oct 14 2014 13:00:00,
   * //   Wed Oct 14 2014 13:01:00,
   * //   Wed Oct 14 2014 13:02:00,
   * //   Wed Oct 14 2014 13:03:00
   * // ]
   */
  function eachMinuteOfInterval$1(interval, options) {
    const startDate = (0, _index2.startOfMinute)((0, _index3.toDate)(interval.start));
    const endDate = (0, _index3.toDate)(interval.end);

    let reversed = +startDate > +endDate;
    const endTime = reversed ? +startDate : +endDate;
    let currentDate = reversed ? endDate : startDate;

    let step = options?.step ?? 1;
    if (!step) return [];
    if (step < 0) {
      step = -step;
      reversed = !reversed;
    }

    const dates = [];

    while (+currentDate <= endTime) {
      dates.push((0, _index3.toDate)(currentDate));
      currentDate = (0, _index.addMinutes)(currentDate, step);
    }

    return reversed ? dates.reverse() : dates;
  }
  return eachMinuteOfInterval;
}

var eachMonthOfInterval = {};

var hasRequiredEachMonthOfInterval;

function requireEachMonthOfInterval() {
  if (hasRequiredEachMonthOfInterval) return eachMonthOfInterval;
  hasRequiredEachMonthOfInterval = 1;
  eachMonthOfInterval.eachMonthOfInterval = eachMonthOfInterval$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * The {@link eachMonthOfInterval} function options.
   */

  /**
   * @name eachMonthOfInterval
   * @category Interval Helpers
   * @summary Return the array of months within the specified time interval.
   *
   * @description
   * Return the array of months within the specified time interval.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param interval - The interval
   *
   * @returns The array with starts of months from the month of the interval start to the month of the interval end
   *
   * @example
   * // Each month between 6 February 2014 and 10 August 2014:
   * const result = eachMonthOfInterval({
   *   start: new Date(2014, 1, 6),
   *   end: new Date(2014, 7, 10)
   * })
   * //=> [
   * //   Sat Feb 01 2014 00:00:00,
   * //   Sat Mar 01 2014 00:00:00,
   * //   Tue Apr 01 2014 00:00:00,
   * //   Thu May 01 2014 00:00:00,
   * //   Sun Jun 01 2014 00:00:00,
   * //   Tue Jul 01 2014 00:00:00,
   * //   Fri Aug 01 2014 00:00:00
   * // ]
   */
  function eachMonthOfInterval$1(interval, options) {
    const startDate = (0, _index.toDate)(interval.start);
    const endDate = (0, _index.toDate)(interval.end);

    let reversed = +startDate > +endDate;
    const endTime = reversed ? +startDate : +endDate;
    const currentDate = reversed ? endDate : startDate;
    currentDate.setHours(0, 0, 0, 0);
    currentDate.setDate(1);

    let step = options?.step ?? 1;
    if (!step) return [];
    if (step < 0) {
      step = -step;
      reversed = !reversed;
    }

    const dates = [];

    while (+currentDate <= endTime) {
      dates.push((0, _index.toDate)(currentDate));
      currentDate.setMonth(currentDate.getMonth() + step);
    }

    return reversed ? dates.reverse() : dates;
  }
  return eachMonthOfInterval;
}

var eachQuarterOfInterval = {};

var startOfQuarter = {};

var hasRequiredStartOfQuarter;

function requireStartOfQuarter() {
  if (hasRequiredStartOfQuarter) return startOfQuarter;
  hasRequiredStartOfQuarter = 1;
  startOfQuarter.startOfQuarter = startOfQuarter$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name startOfQuarter
   * @category Quarter Helpers
   * @summary Return the start of a year quarter for the given date.
   *
   * @description
   * Return the start of a year quarter for the given date.
   * The result will be in the local timezone.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The start of a quarter
   *
   * @example
   * // The start of a quarter for 2 September 2014 11:55:00:
   * const result = startOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
   * //=> Tue Jul 01 2014 00:00:00
   */
  function startOfQuarter$1(date) {
    const _date = (0, _index.toDate)(date);
    const currentMonth = _date.getMonth();
    const month = currentMonth - (currentMonth % 3);
    _date.setMonth(month, 1);
    _date.setHours(0, 0, 0, 0);
    return _date;
  }
  return startOfQuarter;
}

var hasRequiredEachQuarterOfInterval;

function requireEachQuarterOfInterval() {
  if (hasRequiredEachQuarterOfInterval) return eachQuarterOfInterval;
  hasRequiredEachQuarterOfInterval = 1;
  eachQuarterOfInterval.eachQuarterOfInterval = eachQuarterOfInterval$1;
  var _index = /*@__PURE__*/ requireAddQuarters();
  var _index2 = /*@__PURE__*/ requireStartOfQuarter();
  var _index3 = /*@__PURE__*/ requireToDate();

  /**
   * The {@link eachQuarterOfInterval} function options.
   */

  /**
   * @name eachQuarterOfInterval
   * @category Interval Helpers
   * @summary Return the array of quarters within the specified time interval.
   *
   * @description
   * Return the array of quarters within the specified time interval.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param interval - The interval
   *
   * @returns The array with starts of quarters from the quarter of the interval start to the quarter of the interval end
   *
   * @example
   * // Each quarter within interval 6 February 2014 - 10 August 2014:
   * const result = eachQuarterOfInterval({
   *   start: new Date(2014, 1, 6),
   *   end: new Date(2014, 7, 10)
   * })
   * //=> [
   * //   Wed Jan 01 2014 00:00:00,
   * //   Tue Apr 01 2014 00:00:00,
   * //   Tue Jul 01 2014 00:00:00,
   * // ]
   */
  function eachQuarterOfInterval$1(interval, options) {
    const startDate = (0, _index3.toDate)(interval.start);
    const endDate = (0, _index3.toDate)(interval.end);

    let reversed = +startDate > +endDate;
    const endTime = reversed ? +(0, _index2.startOfQuarter)(startDate) : +(0, _index2.startOfQuarter)(endDate);
    let currentDate = reversed ? (0, _index2.startOfQuarter)(endDate) : (0, _index2.startOfQuarter)(startDate);

    let step = options?.step ?? 1;
    if (!step) return [];
    if (step < 0) {
      step = -step;
      reversed = !reversed;
    }

    const dates = [];

    while (+currentDate <= endTime) {
      dates.push((0, _index3.toDate)(currentDate));
      currentDate = (0, _index.addQuarters)(currentDate, step);
    }

    return reversed ? dates.reverse() : dates;
  }
  return eachQuarterOfInterval;
}

var eachWeekOfInterval = {};

var hasRequiredEachWeekOfInterval;

function requireEachWeekOfInterval() {
  if (hasRequiredEachWeekOfInterval) return eachWeekOfInterval;
  hasRequiredEachWeekOfInterval = 1;
  eachWeekOfInterval.eachWeekOfInterval = eachWeekOfInterval$1;
  var _index = /*@__PURE__*/ requireAddWeeks();
  var _index2 = /*@__PURE__*/ requireStartOfWeek();
  var _index3 = /*@__PURE__*/ requireToDate();

  /**
   * The {@link eachWeekOfInterval} function options.
   */

  /**
   * @name eachWeekOfInterval
   * @category Interval Helpers
   * @summary Return the array of weeks within the specified time interval.
   *
   * @description
   * Return the array of weeks within the specified time interval.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param interval - The interval.
   * @param options - An object with options.
   *
   * @returns The array with starts of weeks from the week of the interval start to the week of the interval end
   *
   * @example
   * // Each week within interval 6 October 2014 - 23 November 2014:
   * const result = eachWeekOfInterval({
   *   start: new Date(2014, 9, 6),
   *   end: new Date(2014, 10, 23)
   * })
   * //=> [
   * //   Sun Oct 05 2014 00:00:00,
   * //   Sun Oct 12 2014 00:00:00,
   * //   Sun Oct 19 2014 00:00:00,
   * //   Sun Oct 26 2014 00:00:00,
   * //   Sun Nov 02 2014 00:00:00,
   * //   Sun Nov 09 2014 00:00:00,
   * //   Sun Nov 16 2014 00:00:00,
   * //   Sun Nov 23 2014 00:00:00
   * // ]
   */
  function eachWeekOfInterval$1(interval, options) {
    const startDate = (0, _index3.toDate)(interval.start);
    const endDate = (0, _index3.toDate)(interval.end);

    let reversed = +startDate > +endDate;
    const startDateWeek = reversed ? (0, _index2.startOfWeek)(endDate, options) : (0, _index2.startOfWeek)(startDate, options);
    const endDateWeek = reversed ? (0, _index2.startOfWeek)(startDate, options) : (0, _index2.startOfWeek)(endDate, options);

    // Some timezones switch DST at midnight, making start of day unreliable in these timezones, 3pm is a safe bet
    startDateWeek.setHours(15);
    endDateWeek.setHours(15);

    const endTime = +endDateWeek.getTime();
    let currentDate = startDateWeek;

    let step = options?.step ?? 1;
    if (!step) return [];
    if (step < 0) {
      step = -step;
      reversed = !reversed;
    }

    const dates = [];

    while (+currentDate <= endTime) {
      currentDate.setHours(0);
      dates.push((0, _index3.toDate)(currentDate));
      currentDate = (0, _index.addWeeks)(currentDate, step);
      currentDate.setHours(15);
    }

    return reversed ? dates.reverse() : dates;
  }
  return eachWeekOfInterval;
}

var eachWeekendOfInterval = {};

var hasRequiredEachWeekendOfInterval;

function requireEachWeekendOfInterval() {
  if (hasRequiredEachWeekendOfInterval) return eachWeekendOfInterval;
  hasRequiredEachWeekendOfInterval = 1;
  eachWeekendOfInterval.eachWeekendOfInterval = eachWeekendOfInterval$1;
  var _index = /*@__PURE__*/ requireEachDayOfInterval();
  var _index2 = /*@__PURE__*/ requireIsWeekend();

  /**
   * @name eachWeekendOfInterval
   * @category Interval Helpers
   * @summary List all the Saturdays and Sundays in the given date interval.
   *
   * @description
   * Get all the Saturdays and Sundays in the given date interval.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param interval - The given interval
   *
   * @returns An array containing all the Saturdays and Sundays
   *
   * @example
   * // Lists all Saturdays and Sundays in the given date interval
   * const result = eachWeekendOfInterval({
   *   start: new Date(2018, 8, 17),
   *   end: new Date(2018, 8, 30)
   * })
   * //=> [
   * //   Sat Sep 22 2018 00:00:00,
   * //   Sun Sep 23 2018 00:00:00,
   * //   Sat Sep 29 2018 00:00:00,
   * //   Sun Sep 30 2018 00:00:00
   * // ]
   */
  function eachWeekendOfInterval$1(interval) {
    const dateInterval = (0, _index.eachDayOfInterval)(interval);
    const weekends = [];
    let index = 0;
    while (index < dateInterval.length) {
      const date = dateInterval[index++];
      if ((0, _index2.isWeekend)(date)) weekends.push(date);
    }
    return weekends;
  }
  return eachWeekendOfInterval;
}

var eachWeekendOfMonth = {};

var startOfMonth = {};

var hasRequiredStartOfMonth;

function requireStartOfMonth() {
  if (hasRequiredStartOfMonth) return startOfMonth;
  hasRequiredStartOfMonth = 1;
  startOfMonth.startOfMonth = startOfMonth$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name startOfMonth
   * @category Month Helpers
   * @summary Return the start of a month for the given date.
   *
   * @description
   * Return the start of a month for the given date.
   * The result will be in the local timezone.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The start of a month
   *
   * @example
   * // The start of a month for 2 September 2014 11:55:00:
   * const result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
   * //=> Mon Sep 01 2014 00:00:00
   */
  function startOfMonth$1(date) {
    const _date = (0, _index.toDate)(date);
    _date.setDate(1);
    _date.setHours(0, 0, 0, 0);
    return _date;
  }
  return startOfMonth;
}

var hasRequiredEachWeekendOfMonth;

function requireEachWeekendOfMonth() {
  if (hasRequiredEachWeekendOfMonth) return eachWeekendOfMonth;
  hasRequiredEachWeekendOfMonth = 1;
  eachWeekendOfMonth.eachWeekendOfMonth = eachWeekendOfMonth$1;
  var _index = /*@__PURE__*/ requireEachWeekendOfInterval();
  var _index2 = /*@__PURE__*/ requireEndOfMonth();
  var _index3 = /*@__PURE__*/ requireStartOfMonth();

  /**
   * @name eachWeekendOfMonth
   * @category Month Helpers
   * @summary List all the Saturdays and Sundays in the given month.
   *
   * @description
   * Get all the Saturdays and Sundays in the given month.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given month
   *
   * @returns An array containing all the Saturdays and Sundays
   *
   * @example
   * // Lists all Saturdays and Sundays in the given month
   * const result = eachWeekendOfMonth(new Date(2022, 1, 1))
   * //=> [
   * //   Sat Feb 05 2022 00:00:00,
   * //   Sun Feb 06 2022 00:00:00,
   * //   Sat Feb 12 2022 00:00:00,
   * //   Sun Feb 13 2022 00:00:00,
   * //   Sat Feb 19 2022 00:00:00,
   * //   Sun Feb 20 2022 00:00:00,
   * //   Sat Feb 26 2022 00:00:00,
   * //   Sun Feb 27 2022 00:00:00
   * // ]
   */
  function eachWeekendOfMonth$1(date) {
    const start = (0, _index3.startOfMonth)(date);
    const end = (0, _index2.endOfMonth)(date);
    return (0, _index.eachWeekendOfInterval)({ start, end });
  }
  return eachWeekendOfMonth;
}

var eachWeekendOfYear = {};

var endOfYear = {};

var hasRequiredEndOfYear;

function requireEndOfYear() {
  if (hasRequiredEndOfYear) return endOfYear;
  hasRequiredEndOfYear = 1;
  endOfYear.endOfYear = endOfYear$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name endOfYear
   * @category Year Helpers
   * @summary Return the end of a year for the given date.
   *
   * @description
   * Return the end of a year for the given date.
   * The result will be in the local timezone.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The end of a year
   *
   * @example
   * // The end of a year for 2 September 2014 11:55:00:
   * const result = endOfYear(new Date(2014, 8, 2, 11, 55, 00))
   * //=> Wed Dec 31 2014 23:59:59.999
   */
  function endOfYear$1(date) {
    const _date = (0, _index.toDate)(date);
    const year = _date.getFullYear();
    _date.setFullYear(year + 1, 0, 0);
    _date.setHours(23, 59, 59, 999);
    return _date;
  }
  return endOfYear;
}

var startOfYear = {};

var hasRequiredStartOfYear;

function requireStartOfYear() {
  if (hasRequiredStartOfYear) return startOfYear;
  hasRequiredStartOfYear = 1;
  startOfYear.startOfYear = startOfYear$1;
  var _index = /*@__PURE__*/ requireToDate();
  var _index2 = /*@__PURE__*/ requireConstructFrom();

  /**
   * @name startOfYear
   * @category Year Helpers
   * @summary Return the start of a year for the given date.
   *
   * @description
   * Return the start of a year for the given date.
   * The result will be in the local timezone.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The start of a year
   *
   * @example
   * // The start of a year for 2 September 2014 11:55:00:
   * const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
   * //=> Wed Jan 01 2014 00:00:00
   */
  function startOfYear$1(date) {
    const cleanDate = (0, _index.toDate)(date);
    const _date = (0, _index2.constructFrom)(date, 0);
    _date.setFullYear(cleanDate.getFullYear(), 0, 1);
    _date.setHours(0, 0, 0, 0);
    return _date;
  }
  return startOfYear;
}

var hasRequiredEachWeekendOfYear;

function requireEachWeekendOfYear() {
  if (hasRequiredEachWeekendOfYear) return eachWeekendOfYear;
  hasRequiredEachWeekendOfYear = 1;
  eachWeekendOfYear.eachWeekendOfYear = eachWeekendOfYear$1;
  var _index = /*@__PURE__*/ requireEachWeekendOfInterval();
  var _index2 = /*@__PURE__*/ requireEndOfYear();
  var _index3 = /*@__PURE__*/ requireStartOfYear();

  /**
   * @name eachWeekendOfYear
   * @category Year Helpers
   * @summary List all the Saturdays and Sundays in the year.
   *
   * @description
   * Get all the Saturdays and Sundays in the year.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given year
   *
   * @returns An array containing all the Saturdays and Sundays
   *
   * @example
   * // Lists all Saturdays and Sundays in the year
   * const result = eachWeekendOfYear(new Date(2020, 1, 1))
   * //=> [
   * //   Sat Jan 03 2020 00:00:00,
   * //   Sun Jan 04 2020 00:00:00,
   * //   ...
   * //   Sun Dec 27 2020 00:00:00
   * // ]
   * ]
   */
  function eachWeekendOfYear$1(date) {
    const start = (0, _index3.startOfYear)(date);
    const end = (0, _index2.endOfYear)(date);
    return (0, _index.eachWeekendOfInterval)({ start, end });
  }
  return eachWeekendOfYear;
}

var eachYearOfInterval = {};

var hasRequiredEachYearOfInterval;

function requireEachYearOfInterval() {
  if (hasRequiredEachYearOfInterval) return eachYearOfInterval;
  hasRequiredEachYearOfInterval = 1;
  eachYearOfInterval.eachYearOfInterval = eachYearOfInterval$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * The {@link eachYearOfInterval} function options.
   */

  /**
   * @name eachYearOfInterval
   * @category Interval Helpers
   * @summary Return the array of yearly timestamps within the specified time interval.
   *
   * @description
   * Return the array of yearly timestamps within the specified time interval.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param interval - The interval.
   *
   * @returns The array with starts of yearly timestamps from the month of the interval start to the month of the interval end
   *
   * @example
   * // Each year between 6 February 2014 and 10 August 2017:
   * const result = eachYearOfInterval({
   *   start: new Date(2014, 1, 6),
   *   end: new Date(2017, 7, 10)
   * })
   * //=> [
   * //   Wed Jan 01 2014 00:00:00,
   * //   Thu Jan 01 2015 00:00:00,
   * //   Fri Jan 01 2016 00:00:00,
   * //   Sun Jan 01 2017 00:00:00
   * // ]
   */
  function eachYearOfInterval$1(interval, options) {
    const startDate = (0, _index.toDate)(interval.start);
    const endDate = (0, _index.toDate)(interval.end);

    let reversed = +startDate > +endDate;
    const endTime = reversed ? +startDate : +endDate;
    const currentDate = reversed ? endDate : startDate;
    currentDate.setHours(0, 0, 0, 0);
    currentDate.setMonth(0, 1);

    let step = options?.step ?? 1;
    if (!step) return [];
    if (step < 0) {
      step = -step;
      reversed = !reversed;
    }

    const dates = [];

    while (+currentDate <= endTime) {
      dates.push((0, _index.toDate)(currentDate));
      currentDate.setFullYear(currentDate.getFullYear() + step);
    }

    return reversed ? dates.reverse() : dates;
  }
  return eachYearOfInterval;
}

var endOfDecade = {};

var hasRequiredEndOfDecade;

function requireEndOfDecade() {
  if (hasRequiredEndOfDecade) return endOfDecade;
  hasRequiredEndOfDecade = 1;
  endOfDecade.endOfDecade = endOfDecade$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name endOfDecade
   * @category Decade Helpers
   * @summary Return the end of a decade for the given date.
   *
   * @description
   * Return the end of a decade for the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The end of a decade
   *
   * @example
   * // The end of a decade for 12 May 1984 00:00:00:
   * const result = endOfDecade(new Date(1984, 4, 12, 00, 00, 00))
   * //=> Dec 31 1989 23:59:59.999
   */
  function endOfDecade$1(date) {
    // TODO: Switch to more technical definition in of decades that start with 1
    // end with 0. I.e. 2001-2010 instead of current 2000-2009. It's a breaking
    // change, so it can only be done in 4.0.
    const _date = (0, _index.toDate)(date);
    const year = _date.getFullYear();
    const decade = 9 + Math.floor(year / 10) * 10;
    _date.setFullYear(decade, 11, 31);
    _date.setHours(23, 59, 59, 999);
    return _date;
  }
  return endOfDecade;
}

var endOfHour = {};

var hasRequiredEndOfHour;

function requireEndOfHour() {
  if (hasRequiredEndOfHour) return endOfHour;
  hasRequiredEndOfHour = 1;
  endOfHour.endOfHour = endOfHour$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name endOfHour
   * @category Hour Helpers
   * @summary Return the end of an hour for the given date.
   *
   * @description
   * Return the end of an hour for the given date.
   * The result will be in the local timezone.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The end of an hour
   *
   * @example
   * // The end of an hour for 2 September 2014 11:55:00:
   * const result = endOfHour(new Date(2014, 8, 2, 11, 55))
   * //=> Tue Sep 02 2014 11:59:59.999
   */
  function endOfHour$1(date) {
    const _date = (0, _index.toDate)(date);
    _date.setMinutes(59, 59, 999);
    return _date;
  }
  return endOfHour;
}

var endOfISOWeek = {};

var endOfWeek = {};

var hasRequiredEndOfWeek;

function requireEndOfWeek() {
  if (hasRequiredEndOfWeek) return endOfWeek;
  hasRequiredEndOfWeek = 1;
  endOfWeek.endOfWeek = endOfWeek$1;
  var _index = /*@__PURE__*/ requireToDate();

  var _index2 = /*@__PURE__*/ requireDefaultOptions();

  /**
   * The {@link endOfWeek} function options.
   */

  /**
   * @name endOfWeek
   * @category Week Helpers
   * @summary Return the end of a week for the given date.
   *
   * @description
   * Return the end of a week for the given date.
   * The result will be in the local timezone.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   * @param options - An object with options
   *
   * @returns The end of a week
   *
   * @example
   * // The end of a week for 2 September 2014 11:55:00:
   * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
   * //=> Sat Sep 06 2014 23:59:59.999
   *
   * @example
   * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
   * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
   * //=> Sun Sep 07 2014 23:59:59.999
   */
  function endOfWeek$1(date, options) {
    const defaultOptions = (0, _index2.getDefaultOptions)();
    const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions.weekStartsOn ?? defaultOptions.locale?.options?.weekStartsOn ?? 0;

    const _date = (0, _index.toDate)(date);
    const day = _date.getDay();
    const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);

    _date.setDate(_date.getDate() + diff);
    _date.setHours(23, 59, 59, 999);
    return _date;
  }
  return endOfWeek;
}

var hasRequiredEndOfISOWeek;

function requireEndOfISOWeek() {
  if (hasRequiredEndOfISOWeek) return endOfISOWeek;
  hasRequiredEndOfISOWeek = 1;
  endOfISOWeek.endOfISOWeek = endOfISOWeek$1;
  var _index = /*@__PURE__*/ requireEndOfWeek();

  /**
   * @name endOfISOWeek
   * @category ISO Week Helpers
   * @summary Return the end of an ISO week for the given date.
   *
   * @description
   * Return the end of an ISO week for the given date.
   * The result will be in the local timezone.
   *
   * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The end of an ISO week
   *
   * @example
   * // The end of an ISO week for 2 September 2014 11:55:00:
   * const result = endOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
   * //=> Sun Sep 07 2014 23:59:59.999
   */
  function endOfISOWeek$1(date) {
    return (0, _index.endOfWeek)(date, { weekStartsOn: 1 });
  }
  return endOfISOWeek;
}

var endOfISOWeekYear = {};

var hasRequiredEndOfISOWeekYear;

function requireEndOfISOWeekYear() {
  if (hasRequiredEndOfISOWeekYear) return endOfISOWeekYear;
  hasRequiredEndOfISOWeekYear = 1;
  endOfISOWeekYear.endOfISOWeekYear = endOfISOWeekYear$1;
  var _index = /*@__PURE__*/ requireGetISOWeekYear();
  var _index2 = /*@__PURE__*/ requireStartOfISOWeek();
  var _index3 = /*@__PURE__*/ requireConstructFrom();

  /**
   * @name endOfISOWeekYear
   * @category ISO Week-Numbering Year Helpers
   * @summary Return the end of an ISO week-numbering year for the given date.
   *
   * @description
   * Return the end of an ISO week-numbering year,
   * which always starts 3 days before the year's first Thursday.
   * The result will be in the local timezone.
   *
   * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The end of an ISO week-numbering year
   *
   * @example
   * // The end of an ISO week-numbering year for 2 July 2005:
   * const result = endOfISOWeekYear(new Date(2005, 6, 2))
   * //=> Sun Jan 01 2006 23:59:59.999
   */
  function endOfISOWeekYear$1(date) {
    const year = (0, _index.getISOWeekYear)(date);
    const fourthOfJanuaryOfNextYear = (0, _index3.constructFrom)(date, 0);
    fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
    fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
    const _date = (0, _index2.startOfISOWeek)(fourthOfJanuaryOfNextYear);
    _date.setMilliseconds(_date.getMilliseconds() - 1);
    return _date;
  }
  return endOfISOWeekYear;
}

var endOfMinute = {};

var hasRequiredEndOfMinute;

function requireEndOfMinute() {
  if (hasRequiredEndOfMinute) return endOfMinute;
  hasRequiredEndOfMinute = 1;
  endOfMinute.endOfMinute = endOfMinute$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name endOfMinute
   * @category Minute Helpers
   * @summary Return the end of a minute for the given date.
   *
   * @description
   * Return the end of a minute for the given date.
   * The result will be in the local timezone.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The end of a minute
   *
   * @example
   * // The end of a minute for 1 December 2014 22:15:45.400:
   * const result = endOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))
   * //=> Mon Dec 01 2014 22:15:59.999
   */
  function endOfMinute$1(date) {
    const _date = (0, _index.toDate)(date);
    _date.setSeconds(59, 999);
    return _date;
  }
  return endOfMinute;
}

var endOfQuarter = {};

var hasRequiredEndOfQuarter;

function requireEndOfQuarter() {
  if (hasRequiredEndOfQuarter) return endOfQuarter;
  hasRequiredEndOfQuarter = 1;
  endOfQuarter.endOfQuarter = endOfQuarter$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name endOfQuarter
   * @category Quarter Helpers
   * @summary Return the end of a year quarter for the given date.
   *
   * @description
   * Return the end of a year quarter for the given date.
   * The result will be in the local timezone.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The end of a quarter
   *
   * @example
   * // The end of a quarter for 2 September 2014 11:55:00:
   * const result = endOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
   * //=> Tue Sep 30 2014 23:59:59.999
   */
  function endOfQuarter$1(date) {
    const _date = (0, _index.toDate)(date);
    const currentMonth = _date.getMonth();
    const month = currentMonth - (currentMonth % 3) + 3;
    _date.setMonth(month, 0);
    _date.setHours(23, 59, 59, 999);
    return _date;
  }
  return endOfQuarter;
}

var endOfSecond = {};

var hasRequiredEndOfSecond;

function requireEndOfSecond() {
  if (hasRequiredEndOfSecond) return endOfSecond;
  hasRequiredEndOfSecond = 1;
  endOfSecond.endOfSecond = endOfSecond$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name endOfSecond
   * @category Second Helpers
   * @summary Return the end of a second for the given date.
   *
   * @description
   * Return the end of a second for the given date.
   * The result will be in the local timezone.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The end of a second
   *
   * @example
   * // The end of a second for 1 December 2014 22:15:45.400:
   * const result = endOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
   * //=> Mon Dec 01 2014 22:15:45.999
   */
  function endOfSecond$1(date) {
    const _date = (0, _index.toDate)(date);
    _date.setMilliseconds(999);
    return _date;
  }
  return endOfSecond;
}

var endOfToday = {};

var hasRequiredEndOfToday;

function requireEndOfToday() {
  if (hasRequiredEndOfToday) return endOfToday;
  hasRequiredEndOfToday = 1;
  endOfToday.endOfToday = endOfToday$1;
  var _index = /*@__PURE__*/ requireEndOfDay();

  /**
   * @name endOfToday
   * @category Day Helpers
   * @summary Return the end of today.
   * @pure false
   *
   * @description
   * Return the end of today.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @returns The end of today
   *
   * @example
   * // If today is 6 October 2014:
   * const result = endOfToday()
   * //=> Mon Oct 6 2014 23:59:59.999
   */
  function endOfToday$1() {
    return (0, _index.endOfDay)(Date.now());
  }
  return endOfToday;
}

var endOfTomorrow = {};

var hasRequiredEndOfTomorrow;

function requireEndOfTomorrow() {
  if (hasRequiredEndOfTomorrow) return endOfTomorrow;
  hasRequiredEndOfTomorrow = 1;
  endOfTomorrow.endOfTomorrow = endOfTomorrow$1; /**
   * @name endOfTomorrow
   * @category Day Helpers
   * @summary Return the end of tomorrow.
   * @pure false
   *
   * @description
   * Return the end of tomorrow.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @returns The end of tomorrow
   *
   * @example
   * // If today is 6 October 2014:
   * const result = endOfTomorrow()
   * //=> Tue Oct 7 2014 23:59:59.999
   */
  function endOfTomorrow$1() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();

    const date = new Date(0);
    date.setFullYear(year, month, day + 1);
    date.setHours(23, 59, 59, 999);
    return date;
  }
  return endOfTomorrow;
}

var endOfYesterday = {};

var hasRequiredEndOfYesterday;

function requireEndOfYesterday() {
  if (hasRequiredEndOfYesterday) return endOfYesterday;
  hasRequiredEndOfYesterday = 1;
  endOfYesterday.endOfYesterday = endOfYesterday$1; /**
   * @name endOfYesterday
   * @category Day Helpers
   * @summary Return the end of yesterday.
   * @pure false
   *
   * @description
   * Return the end of yesterday.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @returns The end of yesterday
   *
   * @example
   * // If today is 6 October 2014:
   * const result = endOfYesterday()
   * //=> Sun Oct 5 2014 23:59:59.999
   */
  function endOfYesterday$1() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();

    const date = new Date(0);
    date.setFullYear(year, month, day - 1);
    date.setHours(23, 59, 59, 999);
    return date;
  }
  return endOfYesterday;
}

var format = {};

var defaultLocale = {};

var enUS = {};

var formatDistance$1 = {};

var hasRequiredFormatDistance$1;

function requireFormatDistance$1() {
  if (hasRequiredFormatDistance$1) return formatDistance$1;
  hasRequiredFormatDistance$1 = 1;
  formatDistance$1.formatDistance = void 0;

  const formatDistanceLocale = {
    lessThanXSeconds: {
      one: 'less than a second',
      other: 'less than {{count}} seconds',
    },

    xSeconds: {
      one: '1 second',
      other: '{{count}} seconds',
    },

    halfAMinute: 'half a minute',

    lessThanXMinutes: {
      one: 'less than a minute',
      other: 'less than {{count}} minutes',
    },

    xMinutes: {
      one: '1 minute',
      other: '{{count}} minutes',
    },

    aboutXHours: {
      one: 'about 1 hour',
      other: 'about {{count}} hours',
    },

    xHours: {
      one: '1 hour',
      other: '{{count}} hours',
    },

    xDays: {
      one: '1 day',
      other: '{{count}} days',
    },

    aboutXWeeks: {
      one: 'about 1 week',
      other: 'about {{count}} weeks',
    },

    xWeeks: {
      one: '1 week',
      other: '{{count}} weeks',
    },

    aboutXMonths: {
      one: 'about 1 month',
      other: 'about {{count}} months',
    },

    xMonths: {
      one: '1 month',
      other: '{{count}} months',
    },

    aboutXYears: {
      one: 'about 1 year',
      other: 'about {{count}} years',
    },

    xYears: {
      one: '1 year',
      other: '{{count}} years',
    },

    overXYears: {
      one: 'over 1 year',
      other: 'over {{count}} years',
    },

    almostXYears: {
      one: 'almost 1 year',
      other: 'almost {{count}} years',
    },
  };

  const formatDistance = (token, count, options) => {
    let result;

    const tokenValue = formatDistanceLocale[token];
    if (typeof tokenValue === 'string') {
      result = tokenValue;
    } else if (count === 1) {
      result = tokenValue.one;
    } else {
      result = tokenValue.other.replace('{{count}}', count.toString());
    }

    if (options?.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        return 'in ' + result;
      } else {
        return result + ' ago';
      }
    }

    return result;
  };
  formatDistance$1.formatDistance = formatDistance;
  return formatDistance$1;
}

var formatLong = {};

var buildFormatLongFn = {};

var hasRequiredBuildFormatLongFn;

function requireBuildFormatLongFn() {
  if (hasRequiredBuildFormatLongFn) return buildFormatLongFn;
  hasRequiredBuildFormatLongFn = 1;
  buildFormatLongFn.buildFormatLongFn = buildFormatLongFn$1;

  function buildFormatLongFn$1(args) {
    return (options = {}) => {
      // TODO: Remove String()
      const width = options.width ? String(options.width) : args.defaultWidth;
      const format = args.formats[width] || args.formats[args.defaultWidth];
      return format;
    };
  }
  return buildFormatLongFn;
}

var hasRequiredFormatLong;

function requireFormatLong() {
  if (hasRequiredFormatLong) return formatLong;
  hasRequiredFormatLong = 1;
  formatLong.formatLong = void 0;
  var _index = /*@__PURE__*/ requireBuildFormatLongFn();

  const dateFormats = {
    full: 'EEEE, MMMM do, y',
    long: 'MMMM do, y',
    medium: 'MMM d, y',
    short: 'MM/dd/yyyy',
  };

  const timeFormats = {
    full: 'h:mm:ss a zzzz',
    long: 'h:mm:ss a z',
    medium: 'h:mm:ss a',
    short: 'h:mm a',
  };

  const dateTimeFormats = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: '{{date}}, {{time}}',
    short: '{{date}}, {{time}}',
  };

  formatLong.formatLong = {
    date: (0, _index.buildFormatLongFn)({
      formats: dateFormats,
      defaultWidth: 'full',
    }),

    time: (0, _index.buildFormatLongFn)({
      formats: timeFormats,
      defaultWidth: 'full',
    }),

    dateTime: (0, _index.buildFormatLongFn)({
      formats: dateTimeFormats,
      defaultWidth: 'full',
    }),
  };
  return formatLong;
}

var formatRelative$1 = {};

var hasRequiredFormatRelative$1;

function requireFormatRelative$1() {
  if (hasRequiredFormatRelative$1) return formatRelative$1;
  hasRequiredFormatRelative$1 = 1;
  formatRelative$1.formatRelative = void 0;

  const formatRelativeLocale = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: 'P',
  };

  const formatRelative = (token, _date, _baseDate, _options) => formatRelativeLocale[token];
  formatRelative$1.formatRelative = formatRelative;
  return formatRelative$1;
}

var localize = {};

var buildLocalizeFn = {};

var hasRequiredBuildLocalizeFn;

function requireBuildLocalizeFn() {
  if (hasRequiredBuildLocalizeFn) return buildLocalizeFn;
  hasRequiredBuildLocalizeFn = 1;
  buildLocalizeFn.buildLocalizeFn = buildLocalizeFn$1; /* eslint-disable no-unused-vars */

  /**
   * The localize function argument callback which allows to convert raw value to
   * the actual type.
   *
   * @param value - The value to convert
   *
   * @returns The converted value
   */

  /**
   * The map of localized values for each width.
   */

  /**
   * The index type of the locale unit value. It types conversion of units of
   * values that don't start at 0 (i.e. quarters).
   */

  /**
   * Converts the unit value to the tuple of values.
   */

  /**
   * The tuple of localized era values. The first element represents BC,
   * the second element represents AD.
   */

  /**
   * The tuple of localized quarter values. The first element represents Q1.
   */

  /**
   * The tuple of localized day values. The first element represents Sunday.
   */

  /**
   * The tuple of localized month values. The first element represents January.
   */

  function buildLocalizeFn$1(args) {
    return (value, options) => {
      const context = options?.context ? String(options.context) : 'standalone';

      let valuesArray;
      if (context === 'formatting' && args.formattingValues) {
        const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
        const width = options?.width ? String(options.width) : defaultWidth;

        valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
      } else {
        const defaultWidth = args.defaultWidth;
        const width = options?.width ? String(options.width) : args.defaultWidth;

        valuesArray = args.values[width] || args.values[defaultWidth];
      }
      const index = args.argumentCallback ? args.argumentCallback(value) : value;

      // @ts-expect-error - For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!
      return valuesArray[index];
    };
  }
  return buildLocalizeFn;
}

var hasRequiredLocalize;

function requireLocalize() {
  if (hasRequiredLocalize) return localize;
  hasRequiredLocalize = 1;
  localize.localize = void 0;
  var _index = /*@__PURE__*/ requireBuildLocalizeFn();

  const eraValues = {
    narrow: ['B', 'A'],
    abbreviated: ['BC', 'AD'],
    wide: ['Before Christ', 'Anno Domini'],
  };

  const quarterValues = {
    narrow: ['1', '2', '3', '4'],
    abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
    wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'],
  };

  // Note: in English, the names of days of the week and months are capitalized.
  // If you are making a new locale based on this one, check if the same is true for the language you're working on.
  // Generally, formatted dates should look like they are in the middle of a sentence,
  // e.g. in Spanish language the weekdays and months should be in the lowercase.
  const monthValues = {
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  };

  const dayValues = {
    narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  };

  const dayPeriodValues = {
    narrow: {
      am: 'a',
      pm: 'p',
      midnight: 'mi',
      noon: 'n',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night',
    },
    abbreviated: {
      am: 'AM',
      pm: 'PM',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night',
    },
    wide: {
      am: 'a.m.',
      pm: 'p.m.',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night',
    },
  };

  const formattingDayPeriodValues = {
    narrow: {
      am: 'a',
      pm: 'p',
      midnight: 'mi',
      noon: 'n',
      morning: 'in the morning',
      afternoon: 'in the afternoon',
      evening: 'in the evening',
      night: 'at night',
    },
    abbreviated: {
      am: 'AM',
      pm: 'PM',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'in the morning',
      afternoon: 'in the afternoon',
      evening: 'in the evening',
      night: 'at night',
    },
    wide: {
      am: 'a.m.',
      pm: 'p.m.',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'in the morning',
      afternoon: 'in the afternoon',
      evening: 'in the evening',
      night: 'at night',
    },
  };

  const ordinalNumber = (dirtyNumber, _options) => {
    const number = Number(dirtyNumber);

    // If ordinal numbers depend on context, for example,
    // if they are different for different grammatical genders,
    // use `options.unit`.
    //
    // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
    // 'day', 'hour', 'minute', 'second'.

    const rem100 = number % 100;
    if (rem100 > 20 || rem100 < 10) {
      switch (rem100 % 10) {
        case 1:
          return number + 'st';
        case 2:
          return number + 'nd';
        case 3:
          return number + 'rd';
      }
    }
    return number + 'th';
  };

  localize.localize = {
    ordinalNumber,

    era: (0, _index.buildLocalizeFn)({
      values: eraValues,
      defaultWidth: 'wide',
    }),

    quarter: (0, _index.buildLocalizeFn)({
      values: quarterValues,
      defaultWidth: 'wide',
      argumentCallback: quarter => quarter - 1,
    }),

    month: (0, _index.buildLocalizeFn)({
      values: monthValues,
      defaultWidth: 'wide',
    }),

    day: (0, _index.buildLocalizeFn)({
      values: dayValues,
      defaultWidth: 'wide',
    }),

    dayPeriod: (0, _index.buildLocalizeFn)({
      values: dayPeriodValues,
      defaultWidth: 'wide',
      formattingValues: formattingDayPeriodValues,
      defaultFormattingWidth: 'wide',
    }),
  };
  return localize;
}

var match = {};

var buildMatchFn = {};

var hasRequiredBuildMatchFn;

function requireBuildMatchFn() {
  if (hasRequiredBuildMatchFn) return buildMatchFn;
  hasRequiredBuildMatchFn = 1;
  buildMatchFn.buildMatchFn = buildMatchFn$1;

  function buildMatchFn$1(args) {
    return (string, options = {}) => {
      const width = options.width;

      const matchPattern = (width && args.matchPatterns[width]) || args.matchPatterns[args.defaultMatchWidth];
      const matchResult = string.match(matchPattern);

      if (!matchResult) {
        return null;
      }
      const matchedString = matchResult[0];

      const parsePatterns = (width && args.parsePatterns[width]) || args.parsePatterns[args.defaultParseWidth];

      const key = Array.isArray(parsePatterns)
        ? findIndex(parsePatterns, pattern => pattern.test(matchedString))
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
          findKey(parsePatterns, pattern => pattern.test(matchedString));

      let value;

      value = args.valueCallback ? args.valueCallback(key) : key;
      value = options.valueCallback
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
          options.valueCallback(value)
        : value;

      const rest = string.slice(matchedString.length);

      return { value, rest };
    };
  }

  function findKey(object, predicate) {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
        return key;
      }
    }
    return undefined;
  }

  function findIndex(array, predicate) {
    for (let key = 0; key < array.length; key++) {
      if (predicate(array[key])) {
        return key;
      }
    }
    return undefined;
  }
  return buildMatchFn;
}

var buildMatchPatternFn = {};

var hasRequiredBuildMatchPatternFn;

function requireBuildMatchPatternFn() {
  if (hasRequiredBuildMatchPatternFn) return buildMatchPatternFn;
  hasRequiredBuildMatchPatternFn = 1;
  buildMatchPatternFn.buildMatchPatternFn = buildMatchPatternFn$1;

  function buildMatchPatternFn$1(args) {
    return (string, options = {}) => {
      const matchResult = string.match(args.matchPattern);
      if (!matchResult) return null;
      const matchedString = matchResult[0];

      const parseResult = string.match(args.parsePattern);
      if (!parseResult) return null;
      let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      value = options.valueCallback ? options.valueCallback(value) : value;

      const rest = string.slice(matchedString.length);

      return { value, rest };
    };
  }
  return buildMatchPatternFn;
}

var hasRequiredMatch;

function requireMatch() {
  if (hasRequiredMatch) return match;
  hasRequiredMatch = 1;
  match.match = void 0;

  var _index = /*@__PURE__*/ requireBuildMatchFn();
  var _index2 = /*@__PURE__*/ requireBuildMatchPatternFn();

  const matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
  const parseOrdinalNumberPattern = /\d+/i;

  const matchEraPatterns = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i,
  };
  const parseEraPatterns = {
    any: [/^b/i, /^(a|c)/i],
  };

  const matchQuarterPatterns = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i,
  };
  const parseQuarterPatterns = {
    any: [/1/i, /2/i, /3/i, /4/i],
  };

  const matchMonthPatterns = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
  };
  const parseMonthPatterns = {
    narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],

    any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i],
  };

  const matchDayPatterns = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
  };
  const parseDayPatterns = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
  };

  const matchDayPeriodPatterns = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
  };
  const parseDayPeriodPatterns = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i,
    },
  };

  match.match = {
    ordinalNumber: (0, _index2.buildMatchPatternFn)({
      matchPattern: matchOrdinalNumberPattern,
      parsePattern: parseOrdinalNumberPattern,
      valueCallback: value => parseInt(value, 10),
    }),

    era: (0, _index.buildMatchFn)({
      matchPatterns: matchEraPatterns,
      defaultMatchWidth: 'wide',
      parsePatterns: parseEraPatterns,
      defaultParseWidth: 'any',
    }),

    quarter: (0, _index.buildMatchFn)({
      matchPatterns: matchQuarterPatterns,
      defaultMatchWidth: 'wide',
      parsePatterns: parseQuarterPatterns,
      defaultParseWidth: 'any',
      valueCallback: index => index + 1,
    }),

    month: (0, _index.buildMatchFn)({
      matchPatterns: matchMonthPatterns,
      defaultMatchWidth: 'wide',
      parsePatterns: parseMonthPatterns,
      defaultParseWidth: 'any',
    }),

    day: (0, _index.buildMatchFn)({
      matchPatterns: matchDayPatterns,
      defaultMatchWidth: 'wide',
      parsePatterns: parseDayPatterns,
      defaultParseWidth: 'any',
    }),

    dayPeriod: (0, _index.buildMatchFn)({
      matchPatterns: matchDayPeriodPatterns,
      defaultMatchWidth: 'any',
      parsePatterns: parseDayPeriodPatterns,
      defaultParseWidth: 'any',
    }),
  };
  return match;
}

var hasRequiredEnUS;

function requireEnUS() {
  if (hasRequiredEnUS) return enUS;
  hasRequiredEnUS = 1;
  enUS.enUS = void 0;
  var _index = /*@__PURE__*/ requireFormatDistance$1();
  var _index2 = /*@__PURE__*/ requireFormatLong();
  var _index3 = /*@__PURE__*/ requireFormatRelative$1();
  var _index4 = /*@__PURE__*/ requireLocalize();
  var _index5 = /*@__PURE__*/ requireMatch();

  /**
   * @category Locales
   * @summary English locale (United States).
   * @language English
   * @iso-639-2 eng
   * @author Sasha Koss [@kossnocorp](https://github.com/kossnocorp)
   * @author Lesha Koss [@leshakoss](https://github.com/leshakoss)
   */
  enUS.enUS = {
    code: 'en-US',
    formatDistance: _index.formatDistance,
    formatLong: _index2.formatLong,
    formatRelative: _index3.formatRelative,
    localize: _index4.localize,
    match: _index5.match,
    options: {
      weekStartsOn: 0 /* Sunday */,
      firstWeekContainsDate: 1,
    },
  };
  return enUS;
}

var hasRequiredDefaultLocale;

function requireDefaultLocale() {
  if (hasRequiredDefaultLocale) return defaultLocale;
  hasRequiredDefaultLocale = 1;
  (function (exports) {
    Object.defineProperty(exports, 'defaultLocale', {
      enumerable: true,
      get: function () {
        return _index.enUS;
      },
    });
    var _index = /*@__PURE__*/ requireEnUS();
  })(defaultLocale);
  return defaultLocale;
}

var formatters = {};

var getDayOfYear = {};

var hasRequiredGetDayOfYear;

function requireGetDayOfYear() {
  if (hasRequiredGetDayOfYear) return getDayOfYear;
  hasRequiredGetDayOfYear = 1;
  getDayOfYear.getDayOfYear = getDayOfYear$1;
  var _index = /*@__PURE__*/ requireDifferenceInCalendarDays();
  var _index2 = /*@__PURE__*/ requireStartOfYear();
  var _index3 = /*@__PURE__*/ requireToDate();

  /**
   * @name getDayOfYear
   * @category Day Helpers
   * @summary Get the day of the year of the given date.
   *
   * @description
   * Get the day of the year of the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given date
   *
   * @returns The day of year
   *
   * @example
   * // Which day of the year is 2 July 2014?
   * const result = getDayOfYear(new Date(2014, 6, 2))
   * //=> 183
   */
  function getDayOfYear$1(date) {
    const _date = (0, _index3.toDate)(date);
    const diff = (0, _index.differenceInCalendarDays)(_date, (0, _index2.startOfYear)(_date));
    const dayOfYear = diff + 1;
    return dayOfYear;
  }
  return getDayOfYear;
}

var getISOWeek = {};

var hasRequiredGetISOWeek;

function requireGetISOWeek() {
  if (hasRequiredGetISOWeek) return getISOWeek;
  hasRequiredGetISOWeek = 1;
  getISOWeek.getISOWeek = getISOWeek$1;
  var _index = /*@__PURE__*/ requireConstants$1();
  var _index2 = /*@__PURE__*/ requireStartOfISOWeek();
  var _index3 = /*@__PURE__*/ requireStartOfISOWeekYear();
  var _index4 = /*@__PURE__*/ requireToDate();

  /**
   * @name getISOWeek
   * @category ISO Week Helpers
   * @summary Get the ISO week of the given date.
   *
   * @description
   * Get the ISO week of the given date.
   *
   * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given date
   *
   * @returns The ISO week
   *
   * @example
   * // Which week of the ISO-week numbering year is 2 January 2005?
   * const result = getISOWeek(new Date(2005, 0, 2))
   * //=> 53
   */
  function getISOWeek$1(date) {
    const _date = (0, _index4.toDate)(date);
    const diff = +(0, _index2.startOfISOWeek)(_date) - +(0, _index3.startOfISOWeekYear)(_date);

    // Round the number of weeks to the nearest integer because the number of
    // milliseconds in a week is not constant (e.g. it's different in the week of
    // the daylight saving time clock shift).
    return Math.round(diff / _index.millisecondsInWeek) + 1;
  }
  return getISOWeek;
}

var getWeek = {};

var startOfWeekYear = {};

var getWeekYear = {};

var hasRequiredGetWeekYear;

function requireGetWeekYear() {
  if (hasRequiredGetWeekYear) return getWeekYear;
  hasRequiredGetWeekYear = 1;
  getWeekYear.getWeekYear = getWeekYear$1;
  var _index = /*@__PURE__*/ requireConstructFrom();
  var _index2 = /*@__PURE__*/ requireStartOfWeek();
  var _index3 = /*@__PURE__*/ requireToDate();

  var _index4 = /*@__PURE__*/ requireDefaultOptions();

  /**
   * The {@link getWeekYear} function options.
   */

  /**
   * @name getWeekYear
   * @category Week-Numbering Year Helpers
   * @summary Get the local week-numbering year of the given date.
   *
   * @description
   * Get the local week-numbering year of the given date.
   * The exact calculation depends on the values of
   * `options.weekStartsOn` (which is the index of the first day of the week)
   * and `options.firstWeekContainsDate` (which is the day of January, which is always in
   * the first week of the week-numbering year)
   *
   * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given date
   * @param options - An object with options.
   *
   * @returns The local week-numbering year
   *
   * @example
   * // Which week numbering year is 26 December 2004 with the default settings?
   * const result = getWeekYear(new Date(2004, 11, 26))
   * //=> 2005
   *
   * @example
   * // Which week numbering year is 26 December 2004 if week starts on Saturday?
   * const result = getWeekYear(new Date(2004, 11, 26), { weekStartsOn: 6 })
   * //=> 2004
   *
   * @example
   * // Which week numbering year is 26 December 2004 if the first week contains 4 January?
   * const result = getWeekYear(new Date(2004, 11, 26), { firstWeekContainsDate: 4 })
   * //=> 2004
   */
  function getWeekYear$1(date, options) {
    const _date = (0, _index3.toDate)(date);
    const year = _date.getFullYear();

    const defaultOptions = (0, _index4.getDefaultOptions)();
    const firstWeekContainsDate =
      options?.firstWeekContainsDate ??
      options?.locale?.options?.firstWeekContainsDate ??
      defaultOptions.firstWeekContainsDate ??
      defaultOptions.locale?.options?.firstWeekContainsDate ??
      1;

    const firstWeekOfNextYear = (0, _index.constructFrom)(date, 0);
    firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
    firstWeekOfNextYear.setHours(0, 0, 0, 0);
    const startOfNextYear = (0, _index2.startOfWeek)(firstWeekOfNextYear, options);

    const firstWeekOfThisYear = (0, _index.constructFrom)(date, 0);
    firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
    firstWeekOfThisYear.setHours(0, 0, 0, 0);
    const startOfThisYear = (0, _index2.startOfWeek)(firstWeekOfThisYear, options);

    if (_date.getTime() >= startOfNextYear.getTime()) {
      return year + 1;
    } else if (_date.getTime() >= startOfThisYear.getTime()) {
      return year;
    } else {
      return year - 1;
    }
  }
  return getWeekYear;
}

var hasRequiredStartOfWeekYear;

function requireStartOfWeekYear() {
  if (hasRequiredStartOfWeekYear) return startOfWeekYear;
  hasRequiredStartOfWeekYear = 1;
  startOfWeekYear.startOfWeekYear = startOfWeekYear$1;
  var _index = /*@__PURE__*/ requireConstructFrom();
  var _index2 = /*@__PURE__*/ requireGetWeekYear();
  var _index3 = /*@__PURE__*/ requireStartOfWeek();

  var _index4 = /*@__PURE__*/ requireDefaultOptions();

  /**
   * The {@link startOfWeekYear} function options.
   */

  /**
   * @name startOfWeekYear
   * @category Week-Numbering Year Helpers
   * @summary Return the start of a local week-numbering year for the given date.
   *
   * @description
   * Return the start of a local week-numbering year.
   * The exact calculation depends on the values of
   * `options.weekStartsOn` (which is the index of the first day of the week)
   * and `options.firstWeekContainsDate` (which is the day of January, which is always in
   * the first week of the week-numbering year)
   *
   * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   * @param options - An object with options
   *
   * @returns The start of a week-numbering year
   *
   * @example
   * // The start of an a week-numbering year for 2 July 2005 with default settings:
   * const result = startOfWeekYear(new Date(2005, 6, 2))
   * //=> Sun Dec 26 2004 00:00:00
   *
   * @example
   * // The start of a week-numbering year for 2 July 2005
   * // if Monday is the first day of week
   * // and 4 January is always in the first week of the year:
   * const result = startOfWeekYear(new Date(2005, 6, 2), {
   *   weekStartsOn: 1,
   *   firstWeekContainsDate: 4
   * })
   * //=> Mon Jan 03 2005 00:00:00
   */
  function startOfWeekYear$1(date, options) {
    const defaultOptions = (0, _index4.getDefaultOptions)();
    const firstWeekContainsDate =
      options?.firstWeekContainsDate ??
      options?.locale?.options?.firstWeekContainsDate ??
      defaultOptions.firstWeekContainsDate ??
      defaultOptions.locale?.options?.firstWeekContainsDate ??
      1;

    const year = (0, _index2.getWeekYear)(date, options);
    const firstWeek = (0, _index.constructFrom)(date, 0);
    firstWeek.setFullYear(year, 0, firstWeekContainsDate);
    firstWeek.setHours(0, 0, 0, 0);
    const _date = (0, _index3.startOfWeek)(firstWeek, options);
    return _date;
  }
  return startOfWeekYear;
}

var hasRequiredGetWeek;

function requireGetWeek() {
  if (hasRequiredGetWeek) return getWeek;
  hasRequiredGetWeek = 1;
  getWeek.getWeek = getWeek$1;
  var _index = /*@__PURE__*/ requireConstants$1();
  var _index2 = /*@__PURE__*/ requireStartOfWeek();
  var _index3 = /*@__PURE__*/ requireStartOfWeekYear();
  var _index4 = /*@__PURE__*/ requireToDate();

  /**
   * The {@link getWeek} function options.
   */

  /**
   * @name getWeek
   * @category Week Helpers
   * @summary Get the local week index of the given date.
   *
   * @description
   * Get the local week index of the given date.
   * The exact calculation depends on the values of
   * `options.weekStartsOn` (which is the index of the first day of the week)
   * and `options.firstWeekContainsDate` (which is the day of January, which is always in
   * the first week of the week-numbering year)
   *
   * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given date
   * @param options - An object with options
   *
   * @returns The week
   *
   * @example
   * // Which week of the local week numbering year is 2 January 2005 with default options?
   * const result = getWeek(new Date(2005, 0, 2))
   * //=> 2
   *
   * @example
   * // Which week of the local week numbering year is 2 January 2005,
   * // if Monday is the first day of the week,
   * // and the first week of the year always contains 4 January?
   * const result = getWeek(new Date(2005, 0, 2), {
   *   weekStartsOn: 1,
   *   firstWeekContainsDate: 4
   * })
   * //=> 53
   */

  function getWeek$1(date, options) {
    const _date = (0, _index4.toDate)(date);
    const diff = +(0, _index2.startOfWeek)(_date, options) - +(0, _index3.startOfWeekYear)(_date, options);

    // Round the number of weeks to the nearest integer because the number of
    // milliseconds in a week is not constant (e.g. it's different in the week of
    // the daylight saving time clock shift).
    return Math.round(diff / _index.millisecondsInWeek) + 1;
  }
  return getWeek;
}

var addLeadingZeros = {};

var hasRequiredAddLeadingZeros;

function requireAddLeadingZeros() {
  if (hasRequiredAddLeadingZeros) return addLeadingZeros;
  hasRequiredAddLeadingZeros = 1;
  addLeadingZeros.addLeadingZeros = addLeadingZeros$1;
  function addLeadingZeros$1(number, targetLength) {
    const sign = number < 0 ? '-' : '';
    const output = Math.abs(number).toString().padStart(targetLength, '0');
    return sign + output;
  }
  return addLeadingZeros;
}

var lightFormatters = {};

var hasRequiredLightFormatters;

function requireLightFormatters() {
  if (hasRequiredLightFormatters) return lightFormatters;
  hasRequiredLightFormatters = 1;
  lightFormatters.lightFormatters = void 0;
  var _index = /*@__PURE__*/ requireAddLeadingZeros();

  /*
   * |     | Unit                           |     | Unit                           |
   * |-----|--------------------------------|-----|--------------------------------|
   * |  a  | AM, PM                         |  A* |                                |
   * |  d  | Day of month                   |  D  |                                |
   * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
   * |  m  | Minute                         |  M  | Month                          |
   * |  s  | Second                         |  S  | Fraction of second             |
   * |  y  | Year (abs)                     |  Y  |                                |
   *
   * Letters marked by * are not implemented but reserved by Unicode standard.
   */

  lightFormatters.lightFormatters = {
    // Year
    y(date, token) {
      // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
      // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
      // |----------|-------|----|-------|-------|-------|
      // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
      // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
      // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
      // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
      // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |

      const signedYear = date.getFullYear();
      // Returns 1 for 1 BC (which is year 0 in JavaScript)
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return (0, _index.addLeadingZeros)(token === 'yy' ? year % 100 : year, token.length);
    },

    // Month
    M(date, token) {
      const month = date.getMonth();
      return token === 'M' ? String(month + 1) : (0, _index.addLeadingZeros)(month + 1, 2);
    },

    // Day of the month
    d(date, token) {
      return (0, _index.addLeadingZeros)(date.getDate(), token.length);
    },

    // AM or PM
    a(date, token) {
      const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? 'pm' : 'am';

      switch (token) {
        case 'a':
        case 'aa':
          return dayPeriodEnumValue.toUpperCase();
        case 'aaa':
          return dayPeriodEnumValue;
        case 'aaaaa':
          return dayPeriodEnumValue[0];
        case 'aaaa':
        default:
          return dayPeriodEnumValue === 'am' ? 'a.m.' : 'p.m.';
      }
    },

    // Hour [1-12]
    h(date, token) {
      return (0, _index.addLeadingZeros)(date.getHours() % 12 || 12, token.length);
    },

    // Hour [0-23]
    H(date, token) {
      return (0, _index.addLeadingZeros)(date.getHours(), token.length);
    },

    // Minute
    m(date, token) {
      return (0, _index.addLeadingZeros)(date.getMinutes(), token.length);
    },

    // Second
    s(date, token) {
      return (0, _index.addLeadingZeros)(date.getSeconds(), token.length);
    },

    // Fraction of second
    S(date, token) {
      const numberOfDigits = token.length;
      const milliseconds = date.getMilliseconds();
      const fractionalSeconds = Math.trunc(milliseconds * Math.pow(10, numberOfDigits - 3));
      return (0, _index.addLeadingZeros)(fractionalSeconds, token.length);
    },
  };
  return lightFormatters;
}

var hasRequiredFormatters;

function requireFormatters() {
  if (hasRequiredFormatters) return formatters;
  hasRequiredFormatters = 1;
  formatters.formatters = void 0;
  var _index = /*@__PURE__*/ requireGetDayOfYear();
  var _index2 = /*@__PURE__*/ requireGetISOWeek();
  var _index3 = /*@__PURE__*/ requireGetISOWeekYear();
  var _index4 = /*@__PURE__*/ requireGetWeek();
  var _index5 = /*@__PURE__*/ requireGetWeekYear();

  var _index6 = /*@__PURE__*/ requireAddLeadingZeros();
  var _index7 = /*@__PURE__*/ requireLightFormatters();

  const dayPeriodEnum = {
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night',
  };

  /*
   * |     | Unit                           |     | Unit                           |
   * |-----|--------------------------------|-----|--------------------------------|
   * |  a  | AM, PM                         |  A* | Milliseconds in day            |
   * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
   * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
   * |  d  | Day of month                   |  D  | Day of year                    |
   * |  e  | Local day of week              |  E  | Day of week                    |
   * |  f  |                                |  F* | Day of week in month           |
   * |  g* | Modified Julian day            |  G  | Era                            |
   * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
   * |  i! | ISO day of week                |  I! | ISO week of year               |
   * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
   * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
   * |  l* | (deprecated)                   |  L  | Stand-alone month              |
   * |  m  | Minute                         |  M  | Month                          |
   * |  n  |                                |  N  |                                |
   * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
   * |  p! | Long localized time            |  P! | Long localized date            |
   * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
   * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
   * |  s  | Second                         |  S  | Fraction of second             |
   * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
   * |  u  | Extended year                  |  U* | Cyclic year                    |
   * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
   * |  w  | Local week of year             |  W* | Week of month                  |
   * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
   * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
   * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
   *
   * Letters marked by * are not implemented but reserved by Unicode standard.
   *
   * Letters marked by ! are non-standard, but implemented by date-fns:
   * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
   * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
   *   i.e. 7 for Sunday, 1 for Monday, etc.
   * - `I` is ISO week of year, as opposed to `w` which is local week of year.
   * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
   *   `R` is supposed to be used in conjunction with `I` and `i`
   *   for universal ISO week-numbering date, whereas
   *   `Y` is supposed to be used in conjunction with `w` and `e`
   *   for week-numbering date specific to the locale.
   * - `P` is long localized date format
   * - `p` is long localized time format
   */

  formatters.formatters = {
    // Era
    G: function (date, token, localize) {
      const era = date.getFullYear() > 0 ? 1 : 0;
      switch (token) {
        // AD, BC
        case 'G':
        case 'GG':
        case 'GGG':
          return localize.era(era, { width: 'abbreviated' });
        // A, B
        case 'GGGGG':
          return localize.era(era, { width: 'narrow' });
        // Anno Domini, Before Christ
        case 'GGGG':
        default:
          return localize.era(era, { width: 'wide' });
      }
    },

    // Year
    y: function (date, token, localize) {
      // Ordinal number
      if (token === 'yo') {
        const signedYear = date.getFullYear();
        // Returns 1 for 1 BC (which is year 0 in JavaScript)
        const year = signedYear > 0 ? signedYear : 1 - signedYear;
        return localize.ordinalNumber(year, { unit: 'year' });
      }

      return _index7.lightFormatters.y(date, token);
    },

    // Local week-numbering year
    Y: function (date, token, localize, options) {
      const signedWeekYear = (0, _index5.getWeekYear)(date, options);
      // Returns 1 for 1 BC (which is year 0 in JavaScript)
      const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;

      // Two digit year
      if (token === 'YY') {
        const twoDigitYear = weekYear % 100;
        return (0, _index6.addLeadingZeros)(twoDigitYear, 2);
      }

      // Ordinal number
      if (token === 'Yo') {
        return localize.ordinalNumber(weekYear, { unit: 'year' });
      }

      // Padding
      return (0, _index6.addLeadingZeros)(weekYear, token.length);
    },

    // ISO week-numbering year
    R: function (date, token) {
      const isoWeekYear = (0, _index3.getISOWeekYear)(date);

      // Padding
      return (0, _index6.addLeadingZeros)(isoWeekYear, token.length);
    },

    // Extended year. This is a single number designating the year of this calendar system.
    // The main difference between `y` and `u` localizers are B.C. years:
    // | Year | `y` | `u` |
    // |------|-----|-----|
    // | AC 1 |   1 |   1 |
    // | BC 1 |   1 |   0 |
    // | BC 2 |   2 |  -1 |
    // Also `yy` always returns the last two digits of a year,
    // while `uu` pads single digit years to 2 characters and returns other years unchanged.
    u: function (date, token) {
      const year = date.getFullYear();
      return (0, _index6.addLeadingZeros)(year, token.length);
    },

    // Quarter
    Q: function (date, token, localize) {
      const quarter = Math.ceil((date.getMonth() + 1) / 3);
      switch (token) {
        // 1, 2, 3, 4
        case 'Q':
          return String(quarter);
        // 01, 02, 03, 04
        case 'QQ':
          return (0, _index6.addLeadingZeros)(quarter, 2);
        // 1st, 2nd, 3rd, 4th
        case 'Qo':
          return localize.ordinalNumber(quarter, { unit: 'quarter' });
        // Q1, Q2, Q3, Q4
        case 'QQQ':
          return localize.quarter(quarter, {
            width: 'abbreviated',
            context: 'formatting',
          });
        // 1, 2, 3, 4 (narrow quarter; could be not numerical)
        case 'QQQQQ':
          return localize.quarter(quarter, {
            width: 'narrow',
            context: 'formatting',
          });
        // 1st quarter, 2nd quarter, ...
        case 'QQQQ':
        default:
          return localize.quarter(quarter, {
            width: 'wide',
            context: 'formatting',
          });
      }
    },

    // Stand-alone quarter
    q: function (date, token, localize) {
      const quarter = Math.ceil((date.getMonth() + 1) / 3);
      switch (token) {
        // 1, 2, 3, 4
        case 'q':
          return String(quarter);
        // 01, 02, 03, 04
        case 'qq':
          return (0, _index6.addLeadingZeros)(quarter, 2);
        // 1st, 2nd, 3rd, 4th
        case 'qo':
          return localize.ordinalNumber(quarter, { unit: 'quarter' });
        // Q1, Q2, Q3, Q4
        case 'qqq':
          return localize.quarter(quarter, {
            width: 'abbreviated',
            context: 'standalone',
          });
        // 1, 2, 3, 4 (narrow quarter; could be not numerical)
        case 'qqqqq':
          return localize.quarter(quarter, {
            width: 'narrow',
            context: 'standalone',
          });
        // 1st quarter, 2nd quarter, ...
        case 'qqqq':
        default:
          return localize.quarter(quarter, {
            width: 'wide',
            context: 'standalone',
          });
      }
    },

    // Month
    M: function (date, token, localize) {
      const month = date.getMonth();
      switch (token) {
        case 'M':
        case 'MM':
          return _index7.lightFormatters.M(date, token);
        // 1st, 2nd, ..., 12th
        case 'Mo':
          return localize.ordinalNumber(month + 1, { unit: 'month' });
        // Jan, Feb, ..., Dec
        case 'MMM':
          return localize.month(month, {
            width: 'abbreviated',
            context: 'formatting',
          });
        // J, F, ..., D
        case 'MMMMM':
          return localize.month(month, {
            width: 'narrow',
            context: 'formatting',
          });
        // January, February, ..., December
        case 'MMMM':
        default:
          return localize.month(month, { width: 'wide', context: 'formatting' });
      }
    },

    // Stand-alone month
    L: function (date, token, localize) {
      const month = date.getMonth();
      switch (token) {
        // 1, 2, ..., 12
        case 'L':
          return String(month + 1);
        // 01, 02, ..., 12
        case 'LL':
          return (0, _index6.addLeadingZeros)(month + 1, 2);
        // 1st, 2nd, ..., 12th
        case 'Lo':
          return localize.ordinalNumber(month + 1, { unit: 'month' });
        // Jan, Feb, ..., Dec
        case 'LLL':
          return localize.month(month, {
            width: 'abbreviated',
            context: 'standalone',
          });
        // J, F, ..., D
        case 'LLLLL':
          return localize.month(month, {
            width: 'narrow',
            context: 'standalone',
          });
        // January, February, ..., December
        case 'LLLL':
        default:
          return localize.month(month, { width: 'wide', context: 'standalone' });
      }
    },

    // Local week of year
    w: function (date, token, localize, options) {
      const week = (0, _index4.getWeek)(date, options);

      if (token === 'wo') {
        return localize.ordinalNumber(week, { unit: 'week' });
      }

      return (0, _index6.addLeadingZeros)(week, token.length);
    },

    // ISO week of year
    I: function (date, token, localize) {
      const isoWeek = (0, _index2.getISOWeek)(date);

      if (token === 'Io') {
        return localize.ordinalNumber(isoWeek, { unit: 'week' });
      }

      return (0, _index6.addLeadingZeros)(isoWeek, token.length);
    },

    // Day of the month
    d: function (date, token, localize) {
      if (token === 'do') {
        return localize.ordinalNumber(date.getDate(), { unit: 'date' });
      }

      return _index7.lightFormatters.d(date, token);
    },

    // Day of year
    D: function (date, token, localize) {
      const dayOfYear = (0, _index.getDayOfYear)(date);

      if (token === 'Do') {
        return localize.ordinalNumber(dayOfYear, { unit: 'dayOfYear' });
      }

      return (0, _index6.addLeadingZeros)(dayOfYear, token.length);
    },

    // Day of week
    E: function (date, token, localize) {
      const dayOfWeek = date.getDay();
      switch (token) {
        // Tue
        case 'E':
        case 'EE':
        case 'EEE':
          return localize.day(dayOfWeek, {
            width: 'abbreviated',
            context: 'formatting',
          });
        // T
        case 'EEEEE':
          return localize.day(dayOfWeek, {
            width: 'narrow',
            context: 'formatting',
          });
        // Tu
        case 'EEEEEE':
          return localize.day(dayOfWeek, {
            width: 'short',
            context: 'formatting',
          });
        // Tuesday
        case 'EEEE':
        default:
          return localize.day(dayOfWeek, {
            width: 'wide',
            context: 'formatting',
          });
      }
    },

    // Local day of week
    e: function (date, token, localize, options) {
      const dayOfWeek = date.getDay();
      const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
      switch (token) {
        // Numerical value (Nth day of week with current locale or weekStartsOn)
        case 'e':
          return String(localDayOfWeek);
        // Padded numerical value
        case 'ee':
          return (0, _index6.addLeadingZeros)(localDayOfWeek, 2);
        // 1st, 2nd, ..., 7th
        case 'eo':
          return localize.ordinalNumber(localDayOfWeek, { unit: 'day' });
        case 'eee':
          return localize.day(dayOfWeek, {
            width: 'abbreviated',
            context: 'formatting',
          });
        // T
        case 'eeeee':
          return localize.day(dayOfWeek, {
            width: 'narrow',
            context: 'formatting',
          });
        // Tu
        case 'eeeeee':
          return localize.day(dayOfWeek, {
            width: 'short',
            context: 'formatting',
          });
        // Tuesday
        case 'eeee':
        default:
          return localize.day(dayOfWeek, {
            width: 'wide',
            context: 'formatting',
          });
      }
    },

    // Stand-alone local day of week
    c: function (date, token, localize, options) {
      const dayOfWeek = date.getDay();
      const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
      switch (token) {
        // Numerical value (same as in `e`)
        case 'c':
          return String(localDayOfWeek);
        // Padded numerical value
        case 'cc':
          return (0, _index6.addLeadingZeros)(localDayOfWeek, token.length);
        // 1st, 2nd, ..., 7th
        case 'co':
          return localize.ordinalNumber(localDayOfWeek, { unit: 'day' });
        case 'ccc':
          return localize.day(dayOfWeek, {
            width: 'abbreviated',
            context: 'standalone',
          });
        // T
        case 'ccccc':
          return localize.day(dayOfWeek, {
            width: 'narrow',
            context: 'standalone',
          });
        // Tu
        case 'cccccc':
          return localize.day(dayOfWeek, {
            width: 'short',
            context: 'standalone',
          });
        // Tuesday
        case 'cccc':
        default:
          return localize.day(dayOfWeek, {
            width: 'wide',
            context: 'standalone',
          });
      }
    },

    // ISO day of week
    i: function (date, token, localize) {
      const dayOfWeek = date.getDay();
      const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
      switch (token) {
        // 2
        case 'i':
          return String(isoDayOfWeek);
        // 02
        case 'ii':
          return (0, _index6.addLeadingZeros)(isoDayOfWeek, token.length);
        // 2nd
        case 'io':
          return localize.ordinalNumber(isoDayOfWeek, { unit: 'day' });
        // Tue
        case 'iii':
          return localize.day(dayOfWeek, {
            width: 'abbreviated',
            context: 'formatting',
          });
        // T
        case 'iiiii':
          return localize.day(dayOfWeek, {
            width: 'narrow',
            context: 'formatting',
          });
        // Tu
        case 'iiiiii':
          return localize.day(dayOfWeek, {
            width: 'short',
            context: 'formatting',
          });
        // Tuesday
        case 'iiii':
        default:
          return localize.day(dayOfWeek, {
            width: 'wide',
            context: 'formatting',
          });
      }
    },

    // AM or PM
    a: function (date, token, localize) {
      const hours = date.getHours();
      const dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';

      switch (token) {
        case 'a':
        case 'aa':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'abbreviated',
            context: 'formatting',
          });
        case 'aaa':
          return localize
            .dayPeriod(dayPeriodEnumValue, {
              width: 'abbreviated',
              context: 'formatting',
            })
            .toLowerCase();
        case 'aaaaa':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'narrow',
            context: 'formatting',
          });
        case 'aaaa':
        default:
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'wide',
            context: 'formatting',
          });
      }
    },

    // AM, PM, midnight, noon
    b: function (date, token, localize) {
      const hours = date.getHours();
      let dayPeriodEnumValue;
      if (hours === 12) {
        dayPeriodEnumValue = dayPeriodEnum.noon;
      } else if (hours === 0) {
        dayPeriodEnumValue = dayPeriodEnum.midnight;
      } else {
        dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
      }

      switch (token) {
        case 'b':
        case 'bb':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'abbreviated',
            context: 'formatting',
          });
        case 'bbb':
          return localize
            .dayPeriod(dayPeriodEnumValue, {
              width: 'abbreviated',
              context: 'formatting',
            })
            .toLowerCase();
        case 'bbbbb':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'narrow',
            context: 'formatting',
          });
        case 'bbbb':
        default:
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'wide',
            context: 'formatting',
          });
      }
    },

    // in the morning, in the afternoon, in the evening, at night
    B: function (date, token, localize) {
      const hours = date.getHours();
      let dayPeriodEnumValue;
      if (hours >= 17) {
        dayPeriodEnumValue = dayPeriodEnum.evening;
      } else if (hours >= 12) {
        dayPeriodEnumValue = dayPeriodEnum.afternoon;
      } else if (hours >= 4) {
        dayPeriodEnumValue = dayPeriodEnum.morning;
      } else {
        dayPeriodEnumValue = dayPeriodEnum.night;
      }

      switch (token) {
        case 'B':
        case 'BB':
        case 'BBB':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'abbreviated',
            context: 'formatting',
          });
        case 'BBBBB':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'narrow',
            context: 'formatting',
          });
        case 'BBBB':
        default:
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'wide',
            context: 'formatting',
          });
      }
    },

    // Hour [1-12]
    h: function (date, token, localize) {
      if (token === 'ho') {
        let hours = date.getHours() % 12;
        if (hours === 0) hours = 12;
        return localize.ordinalNumber(hours, { unit: 'hour' });
      }

      return _index7.lightFormatters.h(date, token);
    },

    // Hour [0-23]
    H: function (date, token, localize) {
      if (token === 'Ho') {
        return localize.ordinalNumber(date.getHours(), { unit: 'hour' });
      }

      return _index7.lightFormatters.H(date, token);
    },

    // Hour [0-11]
    K: function (date, token, localize) {
      const hours = date.getHours() % 12;

      if (token === 'Ko') {
        return localize.ordinalNumber(hours, { unit: 'hour' });
      }

      return (0, _index6.addLeadingZeros)(hours, token.length);
    },

    // Hour [1-24]
    k: function (date, token, localize) {
      let hours = date.getHours();
      if (hours === 0) hours = 24;

      if (token === 'ko') {
        return localize.ordinalNumber(hours, { unit: 'hour' });
      }

      return (0, _index6.addLeadingZeros)(hours, token.length);
    },

    // Minute
    m: function (date, token, localize) {
      if (token === 'mo') {
        return localize.ordinalNumber(date.getMinutes(), { unit: 'minute' });
      }

      return _index7.lightFormatters.m(date, token);
    },

    // Second
    s: function (date, token, localize) {
      if (token === 'so') {
        return localize.ordinalNumber(date.getSeconds(), { unit: 'second' });
      }

      return _index7.lightFormatters.s(date, token);
    },

    // Fraction of second
    S: function (date, token) {
      return _index7.lightFormatters.S(date, token);
    },

    // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
    X: function (date, token, _localize) {
      const timezoneOffset = date.getTimezoneOffset();

      if (timezoneOffset === 0) {
        return 'Z';
      }

      switch (token) {
        // Hours and optional minutes
        case 'X':
          return formatTimezoneWithOptionalMinutes(timezoneOffset);

        // Hours, minutes and optional seconds without `:` delimiter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `XX`
        case 'XXXX':
        case 'XX': // Hours and minutes without `:` delimiter
          return formatTimezone(timezoneOffset);

        // Hours, minutes and optional seconds with `:` delimiter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `XXX`
        case 'XXXXX':
        case 'XXX': // Hours and minutes with `:` delimiter
        default:
          return formatTimezone(timezoneOffset, ':');
      }
    },

    // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
    x: function (date, token, _localize) {
      const timezoneOffset = date.getTimezoneOffset();

      switch (token) {
        // Hours and optional minutes
        case 'x':
          return formatTimezoneWithOptionalMinutes(timezoneOffset);

        // Hours, minutes and optional seconds without `:` delimiter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `xx`
        case 'xxxx':
        case 'xx': // Hours and minutes without `:` delimiter
          return formatTimezone(timezoneOffset);

        // Hours, minutes and optional seconds with `:` delimiter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `xxx`
        case 'xxxxx':
        case 'xxx': // Hours and minutes with `:` delimiter
        default:
          return formatTimezone(timezoneOffset, ':');
      }
    },

    // Timezone (GMT)
    O: function (date, token, _localize) {
      const timezoneOffset = date.getTimezoneOffset();

      switch (token) {
        // Short
        case 'O':
        case 'OO':
        case 'OOO':
          return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
        // Long
        case 'OOOO':
        default:
          return 'GMT' + formatTimezone(timezoneOffset, ':');
      }
    },

    // Timezone (specific non-location)
    z: function (date, token, _localize) {
      const timezoneOffset = date.getTimezoneOffset();

      switch (token) {
        // Short
        case 'z':
        case 'zz':
        case 'zzz':
          return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
        // Long
        case 'zzzz':
        default:
          return 'GMT' + formatTimezone(timezoneOffset, ':');
      }
    },

    // Seconds timestamp
    t: function (date, token, _localize) {
      const timestamp = Math.trunc(date.getTime() / 1000);
      return (0, _index6.addLeadingZeros)(timestamp, token.length);
    },

    // Milliseconds timestamp
    T: function (date, token, _localize) {
      const timestamp = date.getTime();
      return (0, _index6.addLeadingZeros)(timestamp, token.length);
    },
  };

  function formatTimezoneShort(offset, delimiter = '') {
    const sign = offset > 0 ? '-' : '+';
    const absOffset = Math.abs(offset);
    const hours = Math.trunc(absOffset / 60);
    const minutes = absOffset % 60;
    if (minutes === 0) {
      return sign + String(hours);
    }
    return sign + String(hours) + delimiter + (0, _index6.addLeadingZeros)(minutes, 2);
  }

  function formatTimezoneWithOptionalMinutes(offset, delimiter) {
    if (offset % 60 === 0) {
      const sign = offset > 0 ? '-' : '+';
      return sign + (0, _index6.addLeadingZeros)(Math.abs(offset) / 60, 2);
    }
    return formatTimezone(offset, delimiter);
  }

  function formatTimezone(offset, delimiter = '') {
    const sign = offset > 0 ? '-' : '+';
    const absOffset = Math.abs(offset);
    const hours = (0, _index6.addLeadingZeros)(Math.trunc(absOffset / 60), 2);
    const minutes = (0, _index6.addLeadingZeros)(absOffset % 60, 2);
    return sign + hours + delimiter + minutes;
  }
  return formatters;
}

var longFormatters = {};

var hasRequiredLongFormatters;

function requireLongFormatters() {
  if (hasRequiredLongFormatters) return longFormatters;
  hasRequiredLongFormatters = 1;
  longFormatters.longFormatters = void 0;

  const dateLongFormatter = (pattern, formatLong) => {
    switch (pattern) {
      case 'P':
        return formatLong.date({ width: 'short' });
      case 'PP':
        return formatLong.date({ width: 'medium' });
      case 'PPP':
        return formatLong.date({ width: 'long' });
      case 'PPPP':
      default:
        return formatLong.date({ width: 'full' });
    }
  };

  const timeLongFormatter = (pattern, formatLong) => {
    switch (pattern) {
      case 'p':
        return formatLong.time({ width: 'short' });
      case 'pp':
        return formatLong.time({ width: 'medium' });
      case 'ppp':
        return formatLong.time({ width: 'long' });
      case 'pppp':
      default:
        return formatLong.time({ width: 'full' });
    }
  };

  const dateTimeLongFormatter = (pattern, formatLong) => {
    const matchResult = pattern.match(/(P+)(p+)?/) || [];
    const datePattern = matchResult[1];
    const timePattern = matchResult[2];

    if (!timePattern) {
      return dateLongFormatter(pattern, formatLong);
    }

    let dateTimeFormat;

    switch (datePattern) {
      case 'P':
        dateTimeFormat = formatLong.dateTime({ width: 'short' });
        break;
      case 'PP':
        dateTimeFormat = formatLong.dateTime({ width: 'medium' });
        break;
      case 'PPP':
        dateTimeFormat = formatLong.dateTime({ width: 'long' });
        break;
      case 'PPPP':
      default:
        dateTimeFormat = formatLong.dateTime({ width: 'full' });
        break;
    }

    return dateTimeFormat.replace('{{date}}', dateLongFormatter(datePattern, formatLong)).replace('{{time}}', timeLongFormatter(timePattern, formatLong));
  };

  longFormatters.longFormatters = {
    p: timeLongFormatter,
    P: dateTimeLongFormatter,
  };
  return longFormatters;
}

var protectedTokens = {};

var hasRequiredProtectedTokens;

function requireProtectedTokens() {
  if (hasRequiredProtectedTokens) return protectedTokens;
  hasRequiredProtectedTokens = 1;
  protectedTokens.isProtectedDayOfYearToken = isProtectedDayOfYearToken;
  protectedTokens.isProtectedWeekYearToken = isProtectedWeekYearToken;
  protectedTokens.warnOrThrowProtectedError = warnOrThrowProtectedError;
  const dayOfYearTokenRE = /^D+$/;
  const weekYearTokenRE = /^Y+$/;

  const throwTokens = ['D', 'DD', 'YY', 'YYYY'];

  function isProtectedDayOfYearToken(token) {
    return dayOfYearTokenRE.test(token);
  }

  function isProtectedWeekYearToken(token) {
    return weekYearTokenRE.test(token);
  }

  function warnOrThrowProtectedError(token, format, input) {
    const _message = message(token, format, input);
    console.warn(_message);
    if (throwTokens.includes(token)) throw new RangeError(_message);
  }

  function message(token, format, input) {
    const subject = token[0] === 'Y' ? 'years' : 'days of the month';
    return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
  }
  return protectedTokens;
}

var hasRequiredFormat;

function requireFormat() {
  if (hasRequiredFormat) return format;
  hasRequiredFormat = 1;
  (function (exports) {
    exports.format = exports.formatDate = format;
    Object.defineProperty(exports, 'formatters', {
      enumerable: true,
      get: function () {
        return _index3.formatters;
      },
    });
    Object.defineProperty(exports, 'longFormatters', {
      enumerable: true,
      get: function () {
        return _index4.longFormatters;
      },
    });
    var _index = /*@__PURE__*/ requireDefaultLocale();
    var _index2 = /*@__PURE__*/ requireDefaultOptions();
    var _index3 = /*@__PURE__*/ requireFormatters();
    var _index4 = /*@__PURE__*/ requireLongFormatters();
    var _index5 = /*@__PURE__*/ requireProtectedTokens();

    var _index6 = /*@__PURE__*/ requireIsValid();
    var _index7 = /*@__PURE__*/ requireToDate();

    // Rexports of internal for libraries to use.
    // See: https://github.com/date-fns/date-fns/issues/3638#issuecomment-1877082874

    // This RegExp consists of three parts separated by `|`:
    // - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
    //   (one of the certain letters followed by `o`)
    // - (\w)\1* matches any sequences of the same letter
    // - '' matches two quote characters in a row
    // - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
    //   except a single quote symbol, which ends the sequence.
    //   Two quote characters do not end the sequence.
    //   If there is no matching single quote
    //   then the sequence will continue until the end of the string.
    // - . matches any single character unmatched by previous parts of the RegExps
    const formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

    // This RegExp catches symbols escaped by quotes, and also
    // sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
    const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

    const escapedStringRegExp = /^'([^]*?)'?$/;
    const doubleQuoteRegExp = /''/g;
    const unescapedLatinCharacterRegExp = /[a-zA-Z]/;

    /**
     * The {@link format} function options.
     */

    /**
     * @name format
     * @alias formatDate
     * @category Common Helpers
     * @summary Format the date.
     *
     * @description
     * Return the formatted date string in the given format. The result may vary by locale.
     *
     * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
     * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     *
     * The characters wrapped between two single quotes characters (') are escaped.
     * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
     * (see the last example)
     *
     * Format of the string is based on Unicode Technical Standard #35:
     * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
     * with a few additions (see note 7 below the table).
     *
     * Accepted patterns:
     * | Unit                            | Pattern | Result examples                   | Notes |
     * |---------------------------------|---------|-----------------------------------|-------|
     * | Era                             | G..GGG  | AD, BC                            |       |
     * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
     * |                                 | GGGGG   | A, B                              |       |
     * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
     * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
     * |                                 | yy      | 44, 01, 00, 17                    | 5     |
     * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
     * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
     * |                                 | yyyyy   | ...                               | 3,5   |
     * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
     * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
     * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
     * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
     * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
     * |                                 | YYYYY   | ...                               | 3,5   |
     * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
     * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
     * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
     * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
     * |                                 | RRRRR   | ...                               | 3,5,7 |
     * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
     * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
     * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
     * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
     * |                                 | uuuuu   | ...                               | 3,5   |
     * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
     * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
     * |                                 | QQ      | 01, 02, 03, 04                    |       |
     * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
     * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
     * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
     * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
     * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
     * |                                 | qq      | 01, 02, 03, 04                    |       |
     * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
     * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
     * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
     * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
     * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
     * |                                 | MM      | 01, 02, ..., 12                   |       |
     * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
     * |                                 | MMMM    | January, February, ..., December  | 2     |
     * |                                 | MMMMM   | J, F, ..., D                      |       |
     * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
     * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
     * |                                 | LL      | 01, 02, ..., 12                   |       |
     * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
     * |                                 | LLLL    | January, February, ..., December  | 2     |
     * |                                 | LLLLL   | J, F, ..., D                      |       |
     * | Local week of year              | w       | 1, 2, ..., 53                     |       |
     * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
     * |                                 | ww      | 01, 02, ..., 53                   |       |
     * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
     * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
     * |                                 | II      | 01, 02, ..., 53                   | 7     |
     * | Day of month                    | d       | 1, 2, ..., 31                     |       |
     * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
     * |                                 | dd      | 01, 02, ..., 31                   |       |
     * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
     * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
     * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
     * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
     * |                                 | DDDD    | ...                               | 3     |
     * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
     * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
     * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
     * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
     * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
     * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
     * |                                 | ii      | 01, 02, ..., 07                   | 7     |
     * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
     * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
     * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
     * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
     * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
     * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
     * |                                 | ee      | 02, 03, ..., 01                   |       |
     * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
     * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
     * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
     * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
     * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
     * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
     * |                                 | cc      | 02, 03, ..., 01                   |       |
     * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
     * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
     * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
     * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
     * | AM, PM                          | a..aa   | AM, PM                            |       |
     * |                                 | aaa     | am, pm                            |       |
     * |                                 | aaaa    | a.m., p.m.                        | 2     |
     * |                                 | aaaaa   | a, p                              |       |
     * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
     * |                                 | bbb     | am, pm, noon, midnight            |       |
     * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
     * |                                 | bbbbb   | a, p, n, mi                       |       |
     * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
     * |                                 | BBBB    | at night, in the morning, ...     | 2     |
     * |                                 | BBBBB   | at night, in the morning, ...     |       |
     * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
     * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
     * |                                 | hh      | 01, 02, ..., 11, 12               |       |
     * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
     * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
     * |                                 | HH      | 00, 01, 02, ..., 23               |       |
     * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
     * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
     * |                                 | KK      | 01, 02, ..., 11, 00               |       |
     * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
     * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
     * |                                 | kk      | 24, 01, 02, ..., 23               |       |
     * | Minute                          | m       | 0, 1, ..., 59                     |       |
     * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
     * |                                 | mm      | 00, 01, ..., 59                   |       |
     * | Second                          | s       | 0, 1, ..., 59                     |       |
     * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
     * |                                 | ss      | 00, 01, ..., 59                   |       |
     * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
     * |                                 | SS      | 00, 01, ..., 99                   |       |
     * |                                 | SSS     | 000, 001, ..., 999                |       |
     * |                                 | SSSS    | ...                               | 3     |
     * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
     * |                                 | XX      | -0800, +0530, Z                   |       |
     * |                                 | XXX     | -08:00, +05:30, Z                 |       |
     * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
     * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
     * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
     * |                                 | xx      | -0800, +0530, +0000               |       |
     * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
     * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
     * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
     * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
     * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
     * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
     * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
     * | Seconds timestamp               | t       | 512969520                         | 7     |
     * |                                 | tt      | ...                               | 3,7   |
     * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
     * |                                 | TT      | ...                               | 3,7   |
     * | Long localized date             | P       | 04/29/1453                        | 7     |
     * |                                 | PP      | Apr 29, 1453                      | 7     |
     * |                                 | PPP     | April 29th, 1453                  | 7     |
     * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
     * | Long localized time             | p       | 12:00 AM                          | 7     |
     * |                                 | pp      | 12:00:00 AM                       | 7     |
     * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
     * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
     * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
     * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
     * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
     * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
     * Notes:
     * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
     *    are the same as "stand-alone" units, but are different in some languages.
     *    "Formatting" units are declined according to the rules of the language
     *    in the context of a date. "Stand-alone" units are always nominative singular:
     *
     *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
     *
     *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
     *
     * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
     *    the single quote characters (see below).
     *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
     *    the output will be the same as default pattern for this unit, usually
     *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
     *    are marked with "2" in the last column of the table.
     *
     *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
     *
     *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
     *
     *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
     *
     *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
     *
     *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
     *
     * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
     *    The output will be padded with zeros to match the length of the pattern.
     *
     *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
     *
     * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
     *    These tokens represent the shortest form of the quarter.
     *
     * 5. The main difference between `y` and `u` patterns are B.C. years:
     *
     *    | Year | `y` | `u` |
     *    |------|-----|-----|
     *    | AC 1 |   1 |   1 |
     *    | BC 1 |   1 |   0 |
     *    | BC 2 |   2 |  -1 |
     *
     *    Also `yy` always returns the last two digits of a year,
     *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
     *
     *    | Year | `yy` | `uu` |
     *    |------|------|------|
     *    | 1    |   01 |   01 |
     *    | 14   |   14 |   14 |
     *    | 376  |   76 |  376 |
     *    | 1453 |   53 | 1453 |
     *
     *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
     *    except local week-numbering years are dependent on `options.weekStartsOn`
     *    and `options.firstWeekContainsDate` (compare [getISOWeekYear](https://date-fns.org/docs/getISOWeekYear)
     *    and [getWeekYear](https://date-fns.org/docs/getWeekYear)).
     *
     * 6. Specific non-location timezones are currently unavailable in `date-fns`,
     *    so right now these tokens fall back to GMT timezones.
     *
     * 7. These patterns are not in the Unicode Technical Standard #35:
     *    - `i`: ISO day of week
     *    - `I`: ISO week of year
     *    - `R`: ISO week-numbering year
     *    - `t`: seconds timestamp
     *    - `T`: milliseconds timestamp
     *    - `o`: ordinal number modifier
     *    - `P`: long localized date
     *    - `p`: long localized time
     *
     * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
     *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     *
     * 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
     *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The original date
     * @param format - The string of tokens
     * @param options - An object with options
     *
     * @returns The formatted date string
     *
     * @throws `date` must not be Invalid Date
     * @throws `options.locale` must contain `localize` property
     * @throws `options.locale` must contain `formatLong` property
     * @throws use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws format string contains an unescaped latin alphabet character
     *
     * @example
     * // Represent 11 February 2014 in middle-endian format:
     * const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
     * //=> '02/11/2014'
     *
     * @example
     * // Represent 2 July 2014 in Esperanto:
     * import { eoLocale } from 'date-fns/locale/eo'
     * const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
     *   locale: eoLocale
     * })
     * //=> '2-a de julio 2014'
     *
     * @example
     * // Escape string by single quote characters:
     * const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
     * //=> "3 o'clock"
     */
    function format(date, formatStr, options) {
      const defaultOptions = (0, _index2.getDefaultOptions)();
      const locale = options?.locale ?? defaultOptions.locale ?? _index.defaultLocale;

      const firstWeekContainsDate =
        options?.firstWeekContainsDate ??
        options?.locale?.options?.firstWeekContainsDate ??
        defaultOptions.firstWeekContainsDate ??
        defaultOptions.locale?.options?.firstWeekContainsDate ??
        1;

      const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions.weekStartsOn ?? defaultOptions.locale?.options?.weekStartsOn ?? 0;

      const originalDate = (0, _index7.toDate)(date);

      if (!(0, _index6.isValid)(originalDate)) {
        throw new RangeError('Invalid time value');
      }

      let parts = formatStr
        .match(longFormattingTokensRegExp)
        .map(substring => {
          const firstCharacter = substring[0];
          if (firstCharacter === 'p' || firstCharacter === 'P') {
            const longFormatter = _index4.longFormatters[firstCharacter];
            return longFormatter(substring, locale.formatLong);
          }
          return substring;
        })
        .join('')
        .match(formattingTokensRegExp)
        .map(substring => {
          // Replace two single quote characters with one single quote character
          if (substring === "''") {
            return { isToken: false, value: "'" };
          }

          const firstCharacter = substring[0];
          if (firstCharacter === "'") {
            return { isToken: false, value: cleanEscapedString(substring) };
          }

          if (_index3.formatters[firstCharacter]) {
            return { isToken: true, value: substring };
          }

          if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
            throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
          }

          return { isToken: false, value: substring };
        });

      // invoke localize preprocessor (only for french locales at the moment)
      if (locale.localize.preprocessor) {
        parts = locale.localize.preprocessor(originalDate, parts);
      }

      const formatterOptions = {
        firstWeekContainsDate,
        weekStartsOn,
        locale,
      };

      return parts
        .map(part => {
          if (!part.isToken) return part.value;

          const token = part.value;

          if (
            (!options?.useAdditionalWeekYearTokens && (0, _index5.isProtectedWeekYearToken)(token)) ||
            (!options?.useAdditionalDayOfYearTokens && (0, _index5.isProtectedDayOfYearToken)(token))
          ) {
            (0, _index5.warnOrThrowProtectedError)(token, formatStr, String(date));
          }

          const formatter = _index3.formatters[token[0]];
          return formatter(originalDate, token, locale.localize, formatterOptions);
        })
        .join('');
    }

    function cleanEscapedString(input) {
      const matched = input.match(escapedStringRegExp);

      if (!matched) {
        return input;
      }

      return matched[1].replace(doubleQuoteRegExp, "'");
    }
  })(format);
  return format;
}

var formatDistance = {};

var hasRequiredFormatDistance;

function requireFormatDistance() {
  if (hasRequiredFormatDistance) return formatDistance;
  hasRequiredFormatDistance = 1;
  formatDistance.formatDistance = formatDistance$1;
  var _index = /*@__PURE__*/ requireCompareAsc();
  var _index2 = /*@__PURE__*/ requireConstants$1();
  var _index3 = /*@__PURE__*/ requireDifferenceInMonths();
  var _index4 = /*@__PURE__*/ requireDifferenceInSeconds();
  var _index5 = /*@__PURE__*/ requireToDate();

  var _index6 = /*@__PURE__*/ requireDefaultLocale();
  var _index7 = /*@__PURE__*/ requireDefaultOptions();
  var _index8 = /*@__PURE__*/ requireGetTimezoneOffsetInMilliseconds();

  /**
   * The {@link formatDistance} function options.
   */

  /**
   * @name formatDistance
   * @category Common Helpers
   * @summary Return the distance between the given dates in words.
   *
   * @description
   * Return the distance between the given dates in words.
   *
   * | Distance between dates                                            | Result              |
   * |-------------------------------------------------------------------|---------------------|
   * | 0 ... 30 secs                                                     | less than a minute  |
   * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
   * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
   * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
   * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
   * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
   * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
   * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
   * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
   * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
   * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
   * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
   * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
   * | N yrs ... N yrs 3 months                                          | about N years       |
   * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
   * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
   *
   * With `options.includeSeconds == true`:
   * | Distance between dates | Result               |
   * |------------------------|----------------------|
   * | 0 secs ... 5 secs      | less than 5 seconds  |
   * | 5 secs ... 10 secs     | less than 10 seconds |
   * | 10 secs ... 20 secs    | less than 20 seconds |
   * | 20 secs ... 40 secs    | half a minute        |
   * | 40 secs ... 60 secs    | less than a minute   |
   * | 60 secs ... 90 secs    | 1 minute             |
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date
   * @param baseDate - The date to compare with
   * @param options - An object with options
   *
   * @returns The distance in words
   *
   * @throws `date` must not be Invalid Date
   * @throws `baseDate` must not be Invalid Date
   * @throws `options.locale` must contain `formatDistance` property
   *
   * @example
   * // What is the distance between 2 July 2014 and 1 January 2015?
   * const result = formatDistance(new Date(2014, 6, 2), new Date(2015, 0, 1))
   * //=> '6 months'
   *
   * @example
   * // What is the distance between 1 January 2015 00:00:15
   * // and 1 January 2015 00:00:00, including seconds?
   * const result = formatDistance(
   *   new Date(2015, 0, 1, 0, 0, 15),
   *   new Date(2015, 0, 1, 0, 0, 0),
   *   { includeSeconds: true }
   * )
   * //=> 'less than 20 seconds'
   *
   * @example
   * // What is the distance from 1 January 2016
   * // to 1 January 2015, with a suffix?
   * const result = formatDistance(new Date(2015, 0, 1), new Date(2016, 0, 1), {
   *   addSuffix: true
   * })
   * //=> 'about 1 year ago'
   *
   * @example
   * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?
   * import { eoLocale } from 'date-fns/locale/eo'
   * const result = formatDistance(new Date(2016, 7, 1), new Date(2015, 0, 1), {
   *   locale: eoLocale
   * })
   * //=> 'pli ol 1 jaro'
   */

  function formatDistance$1(date, baseDate, options) {
    const defaultOptions = (0, _index7.getDefaultOptions)();
    const locale = options?.locale ?? defaultOptions.locale ?? _index6.defaultLocale;
    const minutesInAlmostTwoDays = 2520;

    const comparison = (0, _index.compareAsc)(date, baseDate);

    if (isNaN(comparison)) {
      throw new RangeError('Invalid time value');
    }

    const localizeOptions = Object.assign({}, options, {
      addSuffix: options?.addSuffix,
      comparison: comparison,
    });

    let dateLeft;
    let dateRight;
    if (comparison > 0) {
      dateLeft = (0, _index5.toDate)(baseDate);
      dateRight = (0, _index5.toDate)(date);
    } else {
      dateLeft = (0, _index5.toDate)(date);
      dateRight = (0, _index5.toDate)(baseDate);
    }

    const seconds = (0, _index4.differenceInSeconds)(dateRight, dateLeft);
    const offsetInSeconds = ((0, _index8.getTimezoneOffsetInMilliseconds)(dateRight) - (0, _index8.getTimezoneOffsetInMilliseconds)(dateLeft)) / 1000;
    const minutes = Math.round((seconds - offsetInSeconds) / 60);
    let months;

    // 0 up to 2 mins
    if (minutes < 2) {
      if (options?.includeSeconds) {
        if (seconds < 5) {
          return locale.formatDistance('lessThanXSeconds', 5, localizeOptions);
        } else if (seconds < 10) {
          return locale.formatDistance('lessThanXSeconds', 10, localizeOptions);
        } else if (seconds < 20) {
          return locale.formatDistance('lessThanXSeconds', 20, localizeOptions);
        } else if (seconds < 40) {
          return locale.formatDistance('halfAMinute', 0, localizeOptions);
        } else if (seconds < 60) {
          return locale.formatDistance('lessThanXMinutes', 1, localizeOptions);
        } else {
          return locale.formatDistance('xMinutes', 1, localizeOptions);
        }
      } else {
        if (minutes === 0) {
          return locale.formatDistance('lessThanXMinutes', 1, localizeOptions);
        } else {
          return locale.formatDistance('xMinutes', minutes, localizeOptions);
        }
      }

      // 2 mins up to 0.75 hrs
    } else if (minutes < 45) {
      return locale.formatDistance('xMinutes', minutes, localizeOptions);

      // 0.75 hrs up to 1.5 hrs
    } else if (minutes < 90) {
      return locale.formatDistance('aboutXHours', 1, localizeOptions);

      // 1.5 hrs up to 24 hrs
    } else if (minutes < _index2.minutesInDay) {
      const hours = Math.round(minutes / 60);
      return locale.formatDistance('aboutXHours', hours, localizeOptions);

      // 1 day up to 1.75 days
    } else if (minutes < minutesInAlmostTwoDays) {
      return locale.formatDistance('xDays', 1, localizeOptions);

      // 1.75 days up to 30 days
    } else if (minutes < _index2.minutesInMonth) {
      const days = Math.round(minutes / _index2.minutesInDay);
      return locale.formatDistance('xDays', days, localizeOptions);

      // 1 month up to 2 months
    } else if (minutes < _index2.minutesInMonth * 2) {
      months = Math.round(minutes / _index2.minutesInMonth);
      return locale.formatDistance('aboutXMonths', months, localizeOptions);
    }

    months = (0, _index3.differenceInMonths)(dateRight, dateLeft);

    // 2 months up to 12 months
    if (months < 12) {
      const nearestMonth = Math.round(minutes / _index2.minutesInMonth);
      return locale.formatDistance('xMonths', nearestMonth, localizeOptions);

      // 1 year up to max Date
    } else {
      const monthsSinceStartOfYear = months % 12;
      const years = Math.trunc(months / 12);

      // N years up to 1 years 3 months
      if (monthsSinceStartOfYear < 3) {
        return locale.formatDistance('aboutXYears', years, localizeOptions);

        // N years 3 months up to N years 9 months
      } else if (monthsSinceStartOfYear < 9) {
        return locale.formatDistance('overXYears', years, localizeOptions);

        // N years 9 months up to N year 12 months
      } else {
        return locale.formatDistance('almostXYears', years + 1, localizeOptions);
      }
    }
  }
  return formatDistance;
}

var formatDistanceStrict = {};

var hasRequiredFormatDistanceStrict;

function requireFormatDistanceStrict() {
  if (hasRequiredFormatDistanceStrict) return formatDistanceStrict;
  hasRequiredFormatDistanceStrict = 1;
  formatDistanceStrict.formatDistanceStrict = formatDistanceStrict$1;
  var _index = /*@__PURE__*/ requireDefaultLocale();
  var _index2 = /*@__PURE__*/ requireDefaultOptions();
  var _index3 = /*@__PURE__*/ requireGetRoundingMethod();
  var _index4 = /*@__PURE__*/ requireGetTimezoneOffsetInMilliseconds();
  var _index5 = /*@__PURE__*/ requireCompareAsc();
  var _index6 = /*@__PURE__*/ requireConstants$1();

  var _index7 = /*@__PURE__*/ requireToDate();

  /**
   * The {@link formatDistanceStrict} function options.
   */

  /**
   * The unit used to format the distance in {@link formatDistanceStrict}.
   */

  /**
   * @name formatDistanceStrict
   * @category Common Helpers
   * @summary Return the distance between the given dates in words.
   *
   * @description
   * Return the distance between the given dates in words, using strict units.
   * This is like `formatDistance`, but does not use helpers like 'almost', 'over',
   * 'less than' and the like.
   *
   * | Distance between dates | Result              |
   * |------------------------|---------------------|
   * | 0 ... 59 secs          | [0..59] seconds     |
   * | 1 ... 59 mins          | [1..59] minutes     |
   * | 1 ... 23 hrs           | [1..23] hours       |
   * | 1 ... 29 days          | [1..29] days        |
   * | 1 ... 11 months        | [1..11] months      |
   * | 1 ... N years          | [1..N]  years       |
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date
   * @param baseDate - The date to compare with
   * @param options - An object with options
   *
   * @returns The distance in words
   *
   * @throws `date` must not be Invalid Date
   * @throws `baseDate` must not be Invalid Date
   * @throws `options.unit` must be 'second', 'minute', 'hour', 'day', 'month' or 'year'
   * @throws `options.locale` must contain `formatDistance` property
   *
   * @example
   * // What is the distance between 2 July 2014 and 1 January 2015?
   * const result = formatDistanceStrict(new Date(2014, 6, 2), new Date(2015, 0, 2))
   * //=> '6 months'
   *
   * @example
   * // What is the distance between 1 January 2015 00:00:15
   * // and 1 January 2015 00:00:00?
   * const result = formatDistanceStrict(
   *   new Date(2015, 0, 1, 0, 0, 15),
   *   new Date(2015, 0, 1, 0, 0, 0)
   * )
   * //=> '15 seconds'
   *
   * @example
   * // What is the distance from 1 January 2016
   * // to 1 January 2015, with a suffix?
   * const result = formatDistanceStrict(new Date(2015, 0, 1), new Date(2016, 0, 1), {
   *   addSuffix: true
   * })
   * //=> '1 year ago'
   *
   * @example
   * // What is the distance from 1 January 2016
   * // to 1 January 2015, in minutes?
   * const result = formatDistanceStrict(new Date(2016, 0, 1), new Date(2015, 0, 1), {
   *   unit: 'minute'
   * })
   * //=> '525600 minutes'
   *
   * @example
   * // What is the distance from 1 January 2015
   * // to 28 January 2015, in months, rounded up?
   * const result = formatDistanceStrict(new Date(2015, 0, 28), new Date(2015, 0, 1), {
   *   unit: 'month',
   *   roundingMethod: 'ceil'
   * })
   * //=> '1 month'
   *
   * @example
   * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?
   * import { eoLocale } from 'date-fns/locale/eo'
   * const result = formatDistanceStrict(new Date(2016, 7, 1), new Date(2015, 0, 1), {
   *   locale: eoLocale
   * })
   * //=> '1 jaro'
   */

  function formatDistanceStrict$1(date, baseDate, options) {
    const defaultOptions = (0, _index2.getDefaultOptions)();
    const locale = options?.locale ?? defaultOptions.locale ?? _index.defaultLocale;

    const comparison = (0, _index5.compareAsc)(date, baseDate);

    if (isNaN(comparison)) {
      throw new RangeError('Invalid time value');
    }

    const localizeOptions = Object.assign({}, options, {
      addSuffix: options?.addSuffix,
      comparison: comparison,
    });

    let dateLeft;
    let dateRight;
    if (comparison > 0) {
      dateLeft = (0, _index7.toDate)(baseDate);
      dateRight = (0, _index7.toDate)(date);
    } else {
      dateLeft = (0, _index7.toDate)(date);
      dateRight = (0, _index7.toDate)(baseDate);
    }

    const roundingMethod = (0, _index3.getRoundingMethod)(options?.roundingMethod ?? 'round');

    const milliseconds = dateRight.getTime() - dateLeft.getTime();
    const minutes = milliseconds / _index6.millisecondsInMinute;

    const timezoneOffset = (0, _index4.getTimezoneOffsetInMilliseconds)(dateRight) - (0, _index4.getTimezoneOffsetInMilliseconds)(dateLeft);

    // Use DST-normalized difference in minutes for years, months and days;
    // use regular difference in minutes for hours, minutes and seconds.
    const dstNormalizedMinutes = (milliseconds - timezoneOffset) / _index6.millisecondsInMinute;

    const defaultUnit = options?.unit;
    let unit;
    if (!defaultUnit) {
      if (minutes < 1) {
        unit = 'second';
      } else if (minutes < 60) {
        unit = 'minute';
      } else if (minutes < _index6.minutesInDay) {
        unit = 'hour';
      } else if (dstNormalizedMinutes < _index6.minutesInMonth) {
        unit = 'day';
      } else if (dstNormalizedMinutes < _index6.minutesInYear) {
        unit = 'month';
      } else {
        unit = 'year';
      }
    } else {
      unit = defaultUnit;
    }

    // 0 up to 60 seconds
    if (unit === 'second') {
      const seconds = roundingMethod(milliseconds / 1000);
      return locale.formatDistance('xSeconds', seconds, localizeOptions);

      // 1 up to 60 mins
    } else if (unit === 'minute') {
      const roundedMinutes = roundingMethod(minutes);
      return locale.formatDistance('xMinutes', roundedMinutes, localizeOptions);

      // 1 up to 24 hours
    } else if (unit === 'hour') {
      const hours = roundingMethod(minutes / 60);
      return locale.formatDistance('xHours', hours, localizeOptions);

      // 1 up to 30 days
    } else if (unit === 'day') {
      const days = roundingMethod(dstNormalizedMinutes / _index6.minutesInDay);
      return locale.formatDistance('xDays', days, localizeOptions);

      // 1 up to 12 months
    } else if (unit === 'month') {
      const months = roundingMethod(dstNormalizedMinutes / _index6.minutesInMonth);
      return months === 12 && defaultUnit !== 'month' ? locale.formatDistance('xYears', 1, localizeOptions) : locale.formatDistance('xMonths', months, localizeOptions);

      // 1 year up to max Date
    } else {
      const years = roundingMethod(dstNormalizedMinutes / _index6.minutesInYear);
      return locale.formatDistance('xYears', years, localizeOptions);
    }
  }
  return formatDistanceStrict;
}

var formatDistanceToNow = {};

var hasRequiredFormatDistanceToNow;

function requireFormatDistanceToNow() {
  if (hasRequiredFormatDistanceToNow) return formatDistanceToNow;
  hasRequiredFormatDistanceToNow = 1;
  formatDistanceToNow.formatDistanceToNow = formatDistanceToNow$1;
  var _index = /*@__PURE__*/ requireConstructNow();

  var _index2 = /*@__PURE__*/ requireFormatDistance();

  /**
   * The {@link formatDistanceToNow} function options.
   */

  /**
   * @name formatDistanceToNow
   * @category Common Helpers
   * @summary Return the distance between the given date and now in words.
   * @pure false
   *
   * @description
   * Return the distance between the given date and now in words.
   *
   * | Distance to now                                                   | Result              |
   * |-------------------------------------------------------------------|---------------------|
   * | 0 ... 30 secs                                                     | less than a minute  |
   * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
   * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
   * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
   * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
   * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
   * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
   * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
   * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
   * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
   * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
   * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
   * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
   * | N yrs ... N yrs 3 months                                          | about N years       |
   * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
   * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
   *
   * With `options.includeSeconds == true`:
   * | Distance to now     | Result               |
   * |---------------------|----------------------|
   * | 0 secs ... 5 secs   | less than 5 seconds  |
   * | 5 secs ... 10 secs  | less than 10 seconds |
   * | 10 secs ... 20 secs | less than 20 seconds |
   * | 20 secs ... 40 secs | half a minute        |
   * | 40 secs ... 60 secs | less than a minute   |
   * | 60 secs ... 90 secs | 1 minute             |
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given date
   * @param options - The object with options
   *
   * @returns The distance in words
   *
   * @throws `date` must not be Invalid Date
   * @throws `options.locale` must contain `formatDistance` property
   *
   * @example
   * // If today is 1 January 2015, what is the distance to 2 July 2014?
   * const result = formatDistanceToNow(
   *   new Date(2014, 6, 2)
   * )
   * //=> '6 months'
   *
   * @example
   * // If now is 1 January 2015 00:00:00,
   * // what is the distance to 1 January 2015 00:00:15, including seconds?
   * const result = formatDistanceToNow(
   *   new Date(2015, 0, 1, 0, 0, 15),
   *   {includeSeconds: true}
   * )
   * //=> 'less than 20 seconds'
   *
   * @example
   * // If today is 1 January 2015,
   * // what is the distance to 1 January 2016, with a suffix?
   * const result = formatDistanceToNow(
   *   new Date(2016, 0, 1),
   *   {addSuffix: true}
   * )
   * //=> 'in about 1 year'
   *
   * @example
   * // If today is 1 January 2015,
   * // what is the distance to 1 August 2016 in Esperanto?
   * const eoLocale = require('date-fns/locale/eo')
   * const result = formatDistanceToNow(
   *   new Date(2016, 7, 1),
   *   {locale: eoLocale}
   * )
   * //=> 'pli ol 1 jaro'
   */
  function formatDistanceToNow$1(date, options) {
    return (0, _index2.formatDistance)(date, (0, _index.constructNow)(date), options);
  }
  return formatDistanceToNow;
}

var formatDistanceToNowStrict = {};

var hasRequiredFormatDistanceToNowStrict;

function requireFormatDistanceToNowStrict() {
  if (hasRequiredFormatDistanceToNowStrict) return formatDistanceToNowStrict;
  hasRequiredFormatDistanceToNowStrict = 1;
  formatDistanceToNowStrict.formatDistanceToNowStrict = formatDistanceToNowStrict$1;
  var _index = /*@__PURE__*/ requireFormatDistanceStrict();
  var _index2 = /*@__PURE__*/ requireConstructNow();

  /**
   * The {@link formatDistanceToNowStrict} function options.
   */

  /**
   * @name formatDistanceToNowStrict
   * @category Common Helpers
   * @summary Return the distance between the given date and now in words.
   * @pure false
   *
   * @description
   * Return the distance between the given dates in words, using strict units.
   * This is like `formatDistance`, but does not use helpers like 'almost', 'over',
   * 'less than' and the like.
   *
   * | Distance between dates | Result              |
   * |------------------------|---------------------|
   * | 0 ... 59 secs          | [0..59] seconds     |
   * | 1 ... 59 mins          | [1..59] minutes     |
   * | 1 ... 23 hrs           | [1..23] hours       |
   * | 1 ... 29 days          | [1..29] days        |
   * | 1 ... 11 months        | [1..11] months      |
   * | 1 ... N years          | [1..N]  years       |
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given date
   * @param options - An object with options.
   *
   * @returns The distance in words
   *
   * @throws `date` must not be Invalid Date
   * @throws `options.locale` must contain `formatDistance` property
   *
   * @example
   * // If today is 1 January 2015, what is the distance to 2 July 2014?
   * const result = formatDistanceToNowStrict(
   *   new Date(2014, 6, 2)
   * )
   * //=> '6 months'
   *
   * @example
   * // If now is 1 January 2015 00:00:00,
   * // what is the distance to 1 January 2015 00:00:15, including seconds?
   * const result = formatDistanceToNowStrict(
   *   new Date(2015, 0, 1, 0, 0, 15)
   * )
   * //=> '15 seconds'
   *
   * @example
   * // If today is 1 January 2015,
   * // what is the distance to 1 January 2016, with a suffix?
   * const result = formatDistanceToNowStrict(
   *   new Date(2016, 0, 1),
   *   {addSuffix: true}
   * )
   * //=> 'in 1 year'
   *
   * @example
   * // If today is 28 January 2015,
   * // what is the distance to 1 January 2015, in months, rounded up??
   * const result = formatDistanceToNowStrict(new Date(2015, 0, 1), {
   *   unit: 'month',
   *   roundingMethod: 'ceil'
   * })
   * //=> '1 month'
   *
   * @example
   * // If today is 1 January 2015,
   * // what is the distance to 1 January 2016 in Esperanto?
   * const eoLocale = require('date-fns/locale/eo')
   * const result = formatDistanceToNowStrict(
   *   new Date(2016, 0, 1),
   *   {locale: eoLocale}
   * )
   * //=> '1 jaro'
   */
  function formatDistanceToNowStrict$1(date, options) {
    return (0, _index.formatDistanceStrict)(date, (0, _index2.constructNow)(date), options);
  }
  return formatDistanceToNowStrict;
}

var formatDuration = {};

var hasRequiredFormatDuration;

function requireFormatDuration() {
  if (hasRequiredFormatDuration) return formatDuration;
  hasRequiredFormatDuration = 1;
  formatDuration.formatDuration = formatDuration$1;

  var _index = /*@__PURE__*/ requireDefaultLocale();
  var _index2 = /*@__PURE__*/ requireDefaultOptions();

  /**
   * The {@link formatDuration} function options.
   */

  const defaultFormat = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];

  /**
   * @name formatDuration
   * @category Common Helpers
   * @summary Formats a duration in human-readable format
   *
   * @description
   * Return human-readable duration string i.e. "9 months 2 days"
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param duration - The duration to format
   * @param options - An object with options.
   *
   * @returns The formatted date string
   *
   * @example
   * // Format full duration
   * formatDuration({
   *   years: 2,
   *   months: 9,
   *   weeks: 1,
   *   days: 7,
   *   hours: 5,
   *   minutes: 9,
   *   seconds: 30
   * })
   * //=> '2 years 9 months 1 week 7 days 5 hours 9 minutes 30 seconds'
   *
   * @example
   * // Format partial duration
   * formatDuration({ months: 9, days: 2 })
   * //=> '9 months 2 days'
   *
   * @example
   * // Customize the format
   * formatDuration(
   *   {
   *     years: 2,
   *     months: 9,
   *     weeks: 1,
   *     days: 7,
   *     hours: 5,
   *     minutes: 9,
   *     seconds: 30
   *   },
   *   { format: ['months', 'weeks'] }
   * ) === '9 months 1 week'
   *
   * @example
   * // Customize the zeros presence
   * formatDuration({ years: 0, months: 9 })
   * //=> '9 months'
   * formatDuration({ years: 0, months: 9 }, { zero: true })
   * //=> '0 years 9 months'
   *
   * @example
   * // Customize the delimiter
   * formatDuration({ years: 2, months: 9, weeks: 3 }, { delimiter: ', ' })
   * //=> '2 years, 9 months, 3 weeks'
   */
  function formatDuration$1(duration, options) {
    const defaultOptions = (0, _index2.getDefaultOptions)();
    const locale = options?.locale ?? defaultOptions.locale ?? _index.defaultLocale;
    const format = options?.format ?? defaultFormat;
    const zero = options?.zero ?? false;
    const delimiter = options?.delimiter ?? ' ';

    if (!locale.formatDistance) {
      return '';
    }

    const result = format
      .reduce((acc, unit) => {
        const token = `x${unit.replace(/(^.)/, m => m.toUpperCase())}`;
        const value = duration[unit];
        if (value !== undefined && (zero || duration[unit])) {
          return acc.concat(locale.formatDistance(token, value));
        }
        return acc;
      }, [])
      .join(delimiter);

    return result;
  }
  return formatDuration;
}

var formatISO = {};

var hasRequiredFormatISO;

function requireFormatISO() {
  if (hasRequiredFormatISO) return formatISO;
  hasRequiredFormatISO = 1;
  formatISO.formatISO = formatISO$1;
  var _index = /*@__PURE__*/ requireToDate();

  var _index2 = /*@__PURE__*/ requireAddLeadingZeros();

  /**
   * The {@link formatISO} function options.
   */

  /**
   * @name formatISO
   * @category Common Helpers
   * @summary Format the date according to the ISO 8601 standard (https://support.sas.com/documentation/cdl/en/lrdict/64316/HTML/default/viewer.htm#a003169814.htm).
   *
   * @description
   * Return the formatted date string in ISO 8601 format. Options may be passed to control the parts and notations of the date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   * @param options - An object with options.
   *
   * @returns The formatted date string (in loca.l time zone)
   *
   * @throws `date` must not be Invalid Date
   *
   * @example
   * // Represent 18 September 2019 in ISO 8601 format (local time zone is UTC):
   * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52))
   * //=> '2019-09-18T19:00:52Z'
   *
   * @example
   * // Represent 18 September 2019 in ISO 8601, short format (local time zone is UTC):
   * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { format: 'basic' })
   * //=> '20190918T190052'
   *
   * @example
   * // Represent 18 September 2019 in ISO 8601 format, date only:
   * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'date' })
   * //=> '2019-09-18'
   *
   * @example
   * // Represent 18 September 2019 in ISO 8601 format, time only (local time zone is UTC):
   * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'time' })
   * //=> '19:00:52Z'
   */
  function formatISO$1(date, options) {
    const _date = (0, _index.toDate)(date);

    if (isNaN(_date.getTime())) {
      throw new RangeError('Invalid time value');
    }

    const format = options?.format ?? 'extended';
    const representation = options?.representation ?? 'complete';

    let result = '';
    let tzOffset = '';

    const dateDelimiter = format === 'extended' ? '-' : '';
    const timeDelimiter = format === 'extended' ? ':' : '';

    // Representation is either 'date' or 'complete'
    if (representation !== 'time') {
      const day = (0, _index2.addLeadingZeros)(_date.getDate(), 2);
      const month = (0, _index2.addLeadingZeros)(_date.getMonth() + 1, 2);
      const year = (0, _index2.addLeadingZeros)(_date.getFullYear(), 4);

      // yyyyMMdd or yyyy-MM-dd.
      result = `${year}${dateDelimiter}${month}${dateDelimiter}${day}`;
    }

    // Representation is either 'time' or 'complete'
    if (representation !== 'date') {
      // Add the timezone.
      const offset = _date.getTimezoneOffset();

      if (offset !== 0) {
        const absoluteOffset = Math.abs(offset);
        const hourOffset = (0, _index2.addLeadingZeros)(Math.trunc(absoluteOffset / 60), 2);
        const minuteOffset = (0, _index2.addLeadingZeros)(absoluteOffset % 60, 2);
        // If less than 0, the sign is +, because it is ahead of time.
        const sign = offset < 0 ? '+' : '-';

        tzOffset = `${sign}${hourOffset}:${minuteOffset}`;
      } else {
        tzOffset = 'Z';
      }

      const hour = (0, _index2.addLeadingZeros)(_date.getHours(), 2);
      const minute = (0, _index2.addLeadingZeros)(_date.getMinutes(), 2);
      const second = (0, _index2.addLeadingZeros)(_date.getSeconds(), 2);

      // If there's also date, separate it with time with 'T'
      const separator = result === '' ? '' : 'T';

      // Creates a time string consisting of hour, minute, and second, separated by delimiters, if defined.
      const time = [hour, minute, second].join(timeDelimiter);

      // HHmmss or HH:mm:ss.
      result = `${result}${separator}${time}${tzOffset}`;
    }

    return result;
  }
  return formatISO;
}

var formatISO9075 = {};

var hasRequiredFormatISO9075;

function requireFormatISO9075() {
  if (hasRequiredFormatISO9075) return formatISO9075;
  hasRequiredFormatISO9075 = 1;
  formatISO9075.formatISO9075 = formatISO9075$1;
  var _index = /*@__PURE__*/ requireIsValid();
  var _index2 = /*@__PURE__*/ requireToDate();

  var _index3 = /*@__PURE__*/ requireAddLeadingZeros();

  /**
   * The {@link formatISO9075} function options.
   */

  /**
   * @name formatISO9075
   * @category Common Helpers
   * @summary Format the date according to the ISO 9075 standard (https://dev.mysql.com/doc/refman/5.7/en/date-and-time-functions.html#function_get-format).
   *
   * @description
   * Return the formatted date string in ISO 9075 format. Options may be passed to control the parts and notations of the date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   * @param options - An object with options.
   *
   * @returns The formatted date string
   *
   * @throws `date` must not be Invalid Date
   *
   * @example
   * // Represent 18 September 2019 in ISO 9075 format:
   * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52))
   * //=> '2019-09-18 19:00:52'
   *
   * @example
   * // Represent 18 September 2019 in ISO 9075, short format:
   * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52), { format: 'basic' })
   * //=> '20190918 190052'
   *
   * @example
   * // Represent 18 September 2019 in ISO 9075 format, date only:
   * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52), { representation: 'date' })
   * //=> '2019-09-18'
   *
   * @example
   * // Represent 18 September 2019 in ISO 9075 format, time only:
   * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52), { representation: 'time' })
   * //=> '19:00:52'
   */
  function formatISO9075$1(date, options) {
    const _date = (0, _index2.toDate)(date);

    if (!(0, _index.isValid)(_date)) {
      throw new RangeError('Invalid time value');
    }

    const format = options?.format ?? 'extended';
    const representation = options?.representation ?? 'complete';

    let result = '';

    const dateDelimiter = format === 'extended' ? '-' : '';
    const timeDelimiter = format === 'extended' ? ':' : '';

    // Representation is either 'date' or 'complete'
    if (representation !== 'time') {
      const day = (0, _index3.addLeadingZeros)(_date.getDate(), 2);
      const month = (0, _index3.addLeadingZeros)(_date.getMonth() + 1, 2);
      const year = (0, _index3.addLeadingZeros)(_date.getFullYear(), 4);

      // yyyyMMdd or yyyy-MM-dd.
      result = `${year}${dateDelimiter}${month}${dateDelimiter}${day}`;
    }

    // Representation is either 'time' or 'complete'
    if (representation !== 'date') {
      const hour = (0, _index3.addLeadingZeros)(_date.getHours(), 2);
      const minute = (0, _index3.addLeadingZeros)(_date.getMinutes(), 2);
      const second = (0, _index3.addLeadingZeros)(_date.getSeconds(), 2);

      // If there's also date, separate it with time with a space
      const separator = result === '' ? '' : ' ';

      // HHmmss or HH:mm:ss.
      result = `${result}${separator}${hour}${timeDelimiter}${minute}${timeDelimiter}${second}`;
    }

    return result;
  }
  return formatISO9075;
}

var formatISODuration = {};

var hasRequiredFormatISODuration;

function requireFormatISODuration() {
  if (hasRequiredFormatISODuration) return formatISODuration;
  hasRequiredFormatISODuration = 1;
  formatISODuration.formatISODuration = formatISODuration$1;

  /**
   * @name formatISODuration
   * @category Common Helpers
   * @summary Format a duration object according as ISO 8601 duration string
   *
   * @description
   * Format a duration object according to the ISO 8601 duration standard (https://www.digi.com/resources/documentation/digidocs//90001488-13/reference/r_iso_8601_duration_format.htm)
   *
   * @param duration - The duration to format
   *
   * @returns The ISO 8601 duration string
   *
   * @example
   * // Format the given duration as ISO 8601 string
   * const result = formatISODuration({
   *   years: 39,
   *   months: 2,
   *   days: 20,
   *   hours: 7,
   *   minutes: 5,
   *   seconds: 0
   * })
   * //=> 'P39Y2M20DT0H0M0S'
   */
  function formatISODuration$1(duration) {
    const { years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0 } = duration;

    return `P${years}Y${months}M${days}DT${hours}H${minutes}M${seconds}S`;
  }
  return formatISODuration;
}

var formatRFC3339 = {};

var hasRequiredFormatRFC3339;

function requireFormatRFC3339() {
  if (hasRequiredFormatRFC3339) return formatRFC3339;
  hasRequiredFormatRFC3339 = 1;
  formatRFC3339.formatRFC3339 = formatRFC3339$1;
  var _index = /*@__PURE__*/ requireIsValid();
  var _index2 = /*@__PURE__*/ requireToDate();
  var _index3 = /*@__PURE__*/ requireAddLeadingZeros();

  /**
   * The {@link formatRFC3339} function options.
   */

  /**
   * @name formatRFC3339
   * @category Common Helpers
   * @summary Format the date according to the RFC 3339 standard (https://tools.ietf.org/html/rfc3339#section-5.6).
   *
   * @description
   * Return the formatted date string in RFC 3339 format. Options may be passed to control the parts and notations of the date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   * @param options - An object with options.
   *
   * @returns The formatted date string
   *
   * @throws `date` must not be Invalid Date
   *
   * @example
   * // Represent 18 September 2019 in RFC 3339 format:
   * formatRFC3339(new Date(2019, 8, 18, 19, 0, 52))
   * //=> '2019-09-18T19:00:52Z'
   *
   * @example
   * // Represent 18 September 2019 in RFC 3339 format, 3 digits of second fraction
   * formatRFC3339(new Date(2019, 8, 18, 19, 0, 52, 234), {
   *   fractionDigits: 3
   * })
   * //=> '2019-09-18T19:00:52.234Z'
   */
  function formatRFC3339$1(date, options) {
    const _date = (0, _index2.toDate)(date);

    if (!(0, _index.isValid)(_date)) {
      throw new RangeError('Invalid time value');
    }

    const fractionDigits = options?.fractionDigits ?? 0;

    const day = (0, _index3.addLeadingZeros)(_date.getDate(), 2);
    const month = (0, _index3.addLeadingZeros)(_date.getMonth() + 1, 2);
    const year = _date.getFullYear();

    const hour = (0, _index3.addLeadingZeros)(_date.getHours(), 2);
    const minute = (0, _index3.addLeadingZeros)(_date.getMinutes(), 2);
    const second = (0, _index3.addLeadingZeros)(_date.getSeconds(), 2);

    let fractionalSecond = '';
    if (fractionDigits > 0) {
      const milliseconds = _date.getMilliseconds();
      const fractionalSeconds = Math.trunc(milliseconds * Math.pow(10, fractionDigits - 3));
      fractionalSecond = '.' + (0, _index3.addLeadingZeros)(fractionalSeconds, fractionDigits);
    }

    let offset = '';
    const tzOffset = _date.getTimezoneOffset();

    if (tzOffset !== 0) {
      const absoluteOffset = Math.abs(tzOffset);
      const hourOffset = (0, _index3.addLeadingZeros)(Math.trunc(absoluteOffset / 60), 2);
      const minuteOffset = (0, _index3.addLeadingZeros)(absoluteOffset % 60, 2);
      // If less than 0, the sign is +, because it is ahead of time.
      const sign = tzOffset < 0 ? '+' : '-';

      offset = `${sign}${hourOffset}:${minuteOffset}`;
    } else {
      offset = 'Z';
    }

    return `${year}-${month}-${day}T${hour}:${minute}:${second}${fractionalSecond}${offset}`;
  }
  return formatRFC3339;
}

var formatRFC7231 = {};

var hasRequiredFormatRFC7231;

function requireFormatRFC7231() {
  if (hasRequiredFormatRFC7231) return formatRFC7231;
  hasRequiredFormatRFC7231 = 1;
  formatRFC7231.formatRFC7231 = formatRFC7231$1;
  var _index = /*@__PURE__*/ requireIsValid();
  var _index2 = /*@__PURE__*/ requireToDate();
  var _index3 = /*@__PURE__*/ requireAddLeadingZeros();

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  /**
   * @name formatRFC7231
   * @category Common Helpers
   * @summary Format the date according to the RFC 7231 standard (https://tools.ietf.org/html/rfc7231#section-7.1.1.1).
   *
   * @description
   * Return the formatted date string in RFC 7231 format.
   * The result will always be in UTC timezone.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The formatted date string
   *
   * @throws `date` must not be Invalid Date
   *
   * @example
   * // Represent 18 September 2019 in RFC 7231 format:
   * const result = formatRFC7231(new Date(2019, 8, 18, 19, 0, 52))
   * //=> 'Wed, 18 Sep 2019 19:00:52 GMT'
   */
  function formatRFC7231$1(date) {
    const _date = (0, _index2.toDate)(date);

    if (!(0, _index.isValid)(_date)) {
      throw new RangeError('Invalid time value');
    }

    const dayName = days[_date.getUTCDay()];
    const dayOfMonth = (0, _index3.addLeadingZeros)(_date.getUTCDate(), 2);
    const monthName = months[_date.getUTCMonth()];
    const year = _date.getUTCFullYear();

    const hour = (0, _index3.addLeadingZeros)(_date.getUTCHours(), 2);
    const minute = (0, _index3.addLeadingZeros)(_date.getUTCMinutes(), 2);
    const second = (0, _index3.addLeadingZeros)(_date.getUTCSeconds(), 2);

    // Result variables.
    return `${dayName}, ${dayOfMonth} ${monthName} ${year} ${hour}:${minute}:${second} GMT`;
  }
  return formatRFC7231;
}

var formatRelative = {};

var hasRequiredFormatRelative;

function requireFormatRelative() {
  if (hasRequiredFormatRelative) return formatRelative;
  hasRequiredFormatRelative = 1;
  formatRelative.formatRelative = formatRelative$1;
  var _index = /*@__PURE__*/ requireDifferenceInCalendarDays();
  var _index2 = /*@__PURE__*/ requireFormat();

  var _index3 = /*@__PURE__*/ requireToDate();

  var _index4 = /*@__PURE__*/ requireDefaultLocale();
  var _index5 = /*@__PURE__*/ requireDefaultOptions();

  /**
   * The {@link formatRelative} function options.
   */

  /**
   * @name formatRelative
   * @category Common Helpers
   * @summary Represent the date in words relative to the given base date.
   *
   * @description
   * Represent the date in words relative to the given base date.
   *
   * | Distance to the base date | Result                    |
   * |---------------------------|---------------------------|
   * | Previous 6 days           | last Sunday at 04:30 AM   |
   * | Last day                  | yesterday at 04:30 AM     |
   * | Same day                  | today at 04:30 AM         |
   * | Next day                  | tomorrow at 04:30 AM      |
   * | Next 6 days               | Sunday at 04:30 AM        |
   * | Other                     | 12/31/2017                |
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to format
   * @param baseDate - The date to compare with
   * @param options - An object with options
   *
   * @returns The date in words
   *
   * @throws `date` must not be Invalid Date
   * @throws `baseDate` must not be Invalid Date
   * @throws `options.locale` must contain `localize` property
   * @throws `options.locale` must contain `formatLong` property
   * @throws `options.locale` must contain `formatRelative` property
   *
   * @example
   * // Represent the date of 6 days ago in words relative to the given base date. In this example, today is Wednesday
   * const result = formatRelative(subDays(new Date(), 6), new Date())
   * //=> "last Thursday at 12:45 AM"
   */
  function formatRelative$1(date, baseDate, options) {
    const _date = (0, _index3.toDate)(date);
    const _baseDate = (0, _index3.toDate)(baseDate);

    const defaultOptions = (0, _index5.getDefaultOptions)();
    const locale = options?.locale ?? defaultOptions.locale ?? _index4.defaultLocale;
    const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions.weekStartsOn ?? defaultOptions.locale?.options?.weekStartsOn ?? 0;

    const diff = (0, _index.differenceInCalendarDays)(_date, _baseDate);

    if (isNaN(diff)) {
      throw new RangeError('Invalid time value');
    }

    let token;
    if (diff < -6) {
      token = 'other';
    } else if (diff < -1) {
      token = 'lastWeek';
    } else if (diff < 0) {
      token = 'yesterday';
    } else if (diff < 1) {
      token = 'today';
    } else if (diff < 2) {
      token = 'tomorrow';
    } else if (diff < 7) {
      token = 'nextWeek';
    } else {
      token = 'other';
    }

    const formatStr = locale.formatRelative(token, _date, _baseDate, {
      locale,
      weekStartsOn,
    });
    return (0, _index2.format)(_date, formatStr, { locale, weekStartsOn });
  }
  return formatRelative;
}

var fromUnixTime = {};

var hasRequiredFromUnixTime;

function requireFromUnixTime() {
  if (hasRequiredFromUnixTime) return fromUnixTime;
  hasRequiredFromUnixTime = 1;
  fromUnixTime.fromUnixTime = fromUnixTime$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name fromUnixTime
   * @category Timestamp Helpers
   * @summary Create a date from a Unix timestamp.
   *
   * @description
   * Create a date from a Unix timestamp (in seconds). Decimal values will be discarded.
   *
   * @param unixTime - The given Unix timestamp (in seconds)
   *
   * @returns The date
   *
   * @example
   * // Create the date 29 February 2012 11:45:05:
   * const result = fromUnixTime(1330515905)
   * //=> Wed Feb 29 2012 11:45:05
   */
  function fromUnixTime$1(unixTime) {
    return (0, _index.toDate)(unixTime * 1000);
  }
  return fromUnixTime;
}

var getDate = {};

var hasRequiredGetDate;

function requireGetDate() {
  if (hasRequiredGetDate) return getDate;
  hasRequiredGetDate = 1;
  getDate.getDate = getDate$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name getDate
   * @category Day Helpers
   * @summary Get the day of the month of the given date.
   *
   * @description
   * Get the day of the month of the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given date
   *
   * @returns The day of month
   *
   * @example
   * // Which day of the month is 29 February 2012?
   * const result = getDate(new Date(2012, 1, 29))
   * //=> 29
   */
  function getDate$1(date) {
    const _date = (0, _index.toDate)(date);
    const dayOfMonth = _date.getDate();
    return dayOfMonth;
  }
  return getDate;
}

var getDay = {};

var hasRequiredGetDay;

function requireGetDay() {
  if (hasRequiredGetDay) return getDay;
  hasRequiredGetDay = 1;
  getDay.getDay = getDay$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name getDay
   * @category Weekday Helpers
   * @summary Get the day of the week of the given date.
   *
   * @description
   * Get the day of the week of the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given date
   *
   * @returns The day of week, 0 represents Sunday
   *
   * @example
   * // Which day of the week is 29 February 2012?
   * const result = getDay(new Date(2012, 1, 29))
   * //=> 3
   */
  function getDay$1(date) {
    const _date = (0, _index.toDate)(date);
    const day = _date.getDay();
    return day;
  }
  return getDay;
}

var getDaysInMonth = {};

var hasRequiredGetDaysInMonth;

function requireGetDaysInMonth() {
  if (hasRequiredGetDaysInMonth) return getDaysInMonth;
  hasRequiredGetDaysInMonth = 1;
  getDaysInMonth.getDaysInMonth = getDaysInMonth$1;
  var _index = /*@__PURE__*/ requireToDate();
  var _index2 = /*@__PURE__*/ requireConstructFrom();

  /**
   * @name getDaysInMonth
   * @category Month Helpers
   * @summary Get the number of days in a month of the given date.
   *
   * @description
   * Get the number of days in a month of the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given date
   *
   * @returns The number of days in a month
   *
   * @example
   * // How many days are in February 2000?
   * const result = getDaysInMonth(new Date(2000, 1))
   * //=> 29
   */
  function getDaysInMonth$1(date) {
    const _date = (0, _index.toDate)(date);
    const year = _date.getFullYear();
    const monthIndex = _date.getMonth();
    const lastDayOfMonth = (0, _index2.constructFrom)(date, 0);
    lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
    lastDayOfMonth.setHours(0, 0, 0, 0);
    return lastDayOfMonth.getDate();
  }
  return getDaysInMonth;
}

var getDaysInYear = {};

var isLeapYear = {};

var hasRequiredIsLeapYear;

function requireIsLeapYear() {
  if (hasRequiredIsLeapYear) return isLeapYear;
  hasRequiredIsLeapYear = 1;
  isLeapYear.isLeapYear = isLeapYear$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name isLeapYear
   * @category Year Helpers
   * @summary Is the given date in the leap year?
   *
   * @description
   * Is the given date in the leap year?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   *
   * @returns The date is in the leap year
   *
   * @example
   * // Is 1 September 2012 in the leap year?
   * const result = isLeapYear(new Date(2012, 8, 1))
   * //=> true
   */
  function isLeapYear$1(date) {
    const _date = (0, _index.toDate)(date);
    const year = _date.getFullYear();
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
  }
  return isLeapYear;
}

var hasRequiredGetDaysInYear;

function requireGetDaysInYear() {
  if (hasRequiredGetDaysInYear) return getDaysInYear;
  hasRequiredGetDaysInYear = 1;
  getDaysInYear.getDaysInYear = getDaysInYear$1;
  var _index = /*@__PURE__*/ requireIsLeapYear();
  var _index2 = /*@__PURE__*/ requireToDate();

  /**
   * @name getDaysInYear
   * @category Year Helpers
   * @summary Get the number of days in a year of the given date.
   *
   * @description
   * Get the number of days in a year of the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given date
   *
   * @returns The number of days in a year
   *
   * @example
   * // How many days are in 2012?
   * const result = getDaysInYear(new Date(2012, 0, 1))
   * //=> 366
   */
  function getDaysInYear$1(date) {
    const _date = (0, _index2.toDate)(date);

    if (String(new Date(_date)) === 'Invalid Date') {
      return NaN;
    }

    return (0, _index.isLeapYear)(_date) ? 366 : 365;
  }
  return getDaysInYear;
}

var getDecade = {};

var hasRequiredGetDecade;

function requireGetDecade() {
  if (hasRequiredGetDecade) return getDecade;
  hasRequiredGetDecade = 1;
  getDecade.getDecade = getDecade$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name getDecade
   * @category Decade Helpers
   * @summary Get the decade of the given date.
   *
   * @description
   * Get the decade of the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given date
   *
   * @returns The year of decade
   *
   * @example
   * // Which decade belongs 27 November 1942?
   * const result = getDecade(new Date(1942, 10, 27))
   * //=> 1940
   */
  function getDecade$1(date) {
    // TODO: Switch to more technical definition in of decades that start with 1
    // end with 0. I.e. 2001-2010 instead of current 2000-2009. It's a breaking
    // change, so it can only be done in 4.0.
    const _date = (0, _index.toDate)(date);
    const year = _date.getFullYear();
    const decade = Math.floor(year / 10) * 10;
    return decade;
  }
  return getDecade;
}

var getDefaultOptions = {};

var hasRequiredGetDefaultOptions;

function requireGetDefaultOptions() {
  if (hasRequiredGetDefaultOptions) return getDefaultOptions;
  hasRequiredGetDefaultOptions = 1;
  getDefaultOptions.getDefaultOptions = getDefaultOptions$1;

  var _index = /*@__PURE__*/ requireDefaultOptions();

  /**
   * @name getDefaultOptions
   * @category Common Helpers
   * @summary Get default options.
   * @pure false
   *
   * @description
   * Returns an object that contains defaults for
   * `options.locale`, `options.weekStartsOn` and `options.firstWeekContainsDate`
   * arguments for all functions.
   *
   * You can change these with [setDefaultOptions](https://date-fns.org/docs/setDefaultOptions).
   *
   * @returns The default options
   *
   * @example
   * const result = getDefaultOptions()
   * //=> {}
   *
   * @example
   * setDefaultOptions({ weekStarsOn: 1, firstWeekContainsDate: 4 })
   * const result = getDefaultOptions()
   * //=> { weekStarsOn: 1, firstWeekContainsDate: 4 }
   */
  function getDefaultOptions$1() {
    return Object.assign({}, (0, _index.getDefaultOptions)());
  }
  return getDefaultOptions;
}

var getHours = {};

var hasRequiredGetHours;

function requireGetHours() {
  if (hasRequiredGetHours) return getHours;
  hasRequiredGetHours = 1;
  getHours.getHours = getHours$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name getHours
   * @category Hour Helpers
   * @summary Get the hours of the given date.
   *
   * @description
   * Get the hours of the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given date
   *
   * @returns The hours
   *
   * @example
   * // Get the hours of 29 February 2012 11:45:00:
   * const result = getHours(new Date(2012, 1, 29, 11, 45))
   * //=> 11
   */
  function getHours$1(date) {
    const _date = (0, _index.toDate)(date);
    const hours = _date.getHours();
    return hours;
  }
  return getHours;
}

var getISODay = {};

var hasRequiredGetISODay;

function requireGetISODay() {
  if (hasRequiredGetISODay) return getISODay;
  hasRequiredGetISODay = 1;
  getISODay.getISODay = getISODay$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name getISODay
   * @category Weekday Helpers
   * @summary Get the day of the ISO week of the given date.
   *
   * @description
   * Get the day of the ISO week of the given date,
   * which is 7 for Sunday, 1 for Monday etc.
   *
   * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given date
   *
   * @returns The day of ISO week
   *
   * @example
   * // Which day of the ISO week is 26 February 2012?
   * const result = getISODay(new Date(2012, 1, 26))
   * //=> 7
   */
  function getISODay$1(date) {
    const _date = (0, _index.toDate)(date);
    let day = _date.getDay();

    if (day === 0) {
      day = 7;
    }

    return day;
  }
  return getISODay;
}

var getISOWeeksInYear = {};

var hasRequiredGetISOWeeksInYear;

function requireGetISOWeeksInYear() {
  if (hasRequiredGetISOWeeksInYear) return getISOWeeksInYear;
  hasRequiredGetISOWeeksInYear = 1;
  getISOWeeksInYear.getISOWeeksInYear = getISOWeeksInYear$1;
  var _index = /*@__PURE__*/ requireAddWeeks();
  var _index2 = /*@__PURE__*/ requireConstants$1();
  var _index3 = /*@__PURE__*/ requireStartOfISOWeekYear();

  /**
   * @name getISOWeeksInYear
   * @category ISO Week-Numbering Year Helpers
   * @summary Get the number of weeks in an ISO week-numbering year of the given date.
   *
   * @description
   * Get the number of weeks in an ISO week-numbering year of the given date.
   *
   * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given date
   *
   * @returns The number of ISO weeks in a year
   *
   * @example
   * // How many weeks are in ISO week-numbering year 2015?
   * const result = getISOWeeksInYear(new Date(2015, 1, 11))
   * //=> 53
   */
  function getISOWeeksInYear$1(date) {
    const thisYear = (0, _index3.startOfISOWeekYear)(date);
    const nextYear = (0, _index3.startOfISOWeekYear)((0, _index.addWeeks)(thisYear, 60));
    const diff = +nextYear - +thisYear;

    // Round the number of weeks to the nearest integer because the number of
    // milliseconds in a week is not constant (e.g. it's different in the week of
    // the daylight saving time clock shift).
    return Math.round(diff / _index2.millisecondsInWeek);
  }
  return getISOWeeksInYear;
}

var getMilliseconds = {};

var hasRequiredGetMilliseconds;

function requireGetMilliseconds() {
  if (hasRequiredGetMilliseconds) return getMilliseconds;
  hasRequiredGetMilliseconds = 1;
  getMilliseconds.getMilliseconds = getMilliseconds$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name getMilliseconds
   * @category Millisecond Helpers
   * @summary Get the milliseconds of the given date.
   *
   * @description
   * Get the milliseconds of the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given date
   *
   * @returns The milliseconds
   *
   * @example
   * // Get the milliseconds of 29 February 2012 11:45:05.123:
   * const result = getMilliseconds(new Date(2012, 1, 29, 11, 45, 5, 123))
   * //=> 123
   */
  function getMilliseconds$1(date) {
    const _date = (0, _index.toDate)(date);
    const milliseconds = _date.getMilliseconds();
    return milliseconds;
  }
  return getMilliseconds;
}

var getMinutes = {};

var hasRequiredGetMinutes;

function requireGetMinutes() {
  if (hasRequiredGetMinutes) return getMinutes;
  hasRequiredGetMinutes = 1;
  getMinutes.getMinutes = getMinutes$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name getMinutes
   * @category Minute Helpers
   * @summary Get the minutes of the given date.
   *
   * @description
   * Get the minutes of the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given date
   *
   * @returns The minutes
   *
   * @example
   * // Get the minutes of 29 February 2012 11:45:05:
   * const result = getMinutes(new Date(2012, 1, 29, 11, 45, 5))
   * //=> 45
   */
  function getMinutes$1(date) {
    const _date = (0, _index.toDate)(date);
    const minutes = _date.getMinutes();
    return minutes;
  }
  return getMinutes;
}

var getMonth = {};

var hasRequiredGetMonth;

function requireGetMonth() {
  if (hasRequiredGetMonth) return getMonth;
  hasRequiredGetMonth = 1;
  getMonth.getMonth = getMonth$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name getMonth
   * @category Month Helpers
   * @summary Get the month of the given date.
   *
   * @description
   * Get the month of the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given date
   *
   * @returns The month index (0-11)
   *
   * @example
   * // Which month is 29 February 2012?
   * const result = getMonth(new Date(2012, 1, 29))
   * //=> 1
   */
  function getMonth$1(date) {
    const _date = (0, _index.toDate)(date);
    const month = _date.getMonth();
    return month;
  }
  return getMonth;
}

var getOverlappingDaysInIntervals = {};

var hasRequiredGetOverlappingDaysInIntervals;

function requireGetOverlappingDaysInIntervals() {
  if (hasRequiredGetOverlappingDaysInIntervals) return getOverlappingDaysInIntervals;
  hasRequiredGetOverlappingDaysInIntervals = 1;
  getOverlappingDaysInIntervals.getOverlappingDaysInIntervals = getOverlappingDaysInIntervals$1;
  var _index = /*@__PURE__*/ requireGetTimezoneOffsetInMilliseconds();
  var _index2 = /*@__PURE__*/ requireConstants$1();
  var _index3 = /*@__PURE__*/ requireToDate();

  /**
   * @name getOverlappingDaysInIntervals
   * @category Interval Helpers
   * @summary Get the number of days that overlap in two time intervals
   *
   * @description
   * Get the number of days that overlap in two time intervals. It uses the time
   * between dates to calculate the number of days, rounding it up to include
   * partial days.
   *
   * Two equal 0-length intervals will result in 0. Two equal 1ms intervals will
   * result in 1.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param intervalLeft - The first interval to compare.
   * @param intervalRight - The second interval to compare.
   *
   * @returns The number of days that overlap in two time intervals
   *
   * @example
   * // For overlapping time intervals adds 1 for each started overlapping day:
   * getOverlappingDaysInIntervals(
   *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
   *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 21) }
   * )
   * //=> 3
   *
   * @example
   * // For non-overlapping time intervals returns 0:
   * getOverlappingDaysInIntervals(
   *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
   *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 22) }
   * )
   * //=> 0
   */

  function getOverlappingDaysInIntervals$1(intervalLeft, intervalRight) {
    const [leftStart, leftEnd] = [+(0, _index3.toDate)(intervalLeft.start), +(0, _index3.toDate)(intervalLeft.end)].sort((a, b) => a - b);
    const [rightStart, rightEnd] = [+(0, _index3.toDate)(intervalRight.start), +(0, _index3.toDate)(intervalRight.end)].sort((a, b) => a - b);

    // Prevent NaN result if intervals don't overlap at all.
    const isOverlapping = leftStart < rightEnd && rightStart < leftEnd;
    if (!isOverlapping) return 0;

    // Remove the timezone offset to negate the DST effect on calculations.
    const overlapLeft = rightStart < leftStart ? leftStart : rightStart;
    const left = overlapLeft - (0, _index.getTimezoneOffsetInMilliseconds)(overlapLeft);
    const overlapRight = rightEnd > leftEnd ? leftEnd : rightEnd;
    const right = overlapRight - (0, _index.getTimezoneOffsetInMilliseconds)(overlapRight);

    // Ceil the number to include partial days too.
    return Math.ceil((right - left) / _index2.millisecondsInDay);
  }
  return getOverlappingDaysInIntervals;
}

var getSeconds = {};

var hasRequiredGetSeconds;

function requireGetSeconds() {
  if (hasRequiredGetSeconds) return getSeconds;
  hasRequiredGetSeconds = 1;
  getSeconds.getSeconds = getSeconds$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name getSeconds
   * @category Second Helpers
   * @summary Get the seconds of the given date.
   *
   * @description
   * Get the seconds of the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given date
   *
   * @returns The seconds
   *
   * @example
   * // Get the seconds of 29 February 2012 11:45:05.123:
   * const result = getSeconds(new Date(2012, 1, 29, 11, 45, 5, 123))
   * //=> 5
   */
  function getSeconds$1(date) {
    const _date = (0, _index.toDate)(date);
    const seconds = _date.getSeconds();
    return seconds;
  }
  return getSeconds;
}

var getTime = {};

var hasRequiredGetTime;

function requireGetTime() {
  if (hasRequiredGetTime) return getTime;
  hasRequiredGetTime = 1;
  getTime.getTime = getTime$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name getTime
   * @category Timestamp Helpers
   * @summary Get the milliseconds timestamp of the given date.
   *
   * @description
   * Get the milliseconds timestamp of the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given date
   *
   * @returns The timestamp
   *
   * @example
   * // Get the timestamp of 29 February 2012 11:45:05.123:
   * const result = getTime(new Date(2012, 1, 29, 11, 45, 5, 123))
   * //=> 1330515905123
   */
  function getTime$1(date) {
    const _date = (0, _index.toDate)(date);
    const timestamp = _date.getTime();
    return timestamp;
  }
  return getTime;
}

var getUnixTime = {};

var hasRequiredGetUnixTime;

function requireGetUnixTime() {
  if (hasRequiredGetUnixTime) return getUnixTime;
  hasRequiredGetUnixTime = 1;
  getUnixTime.getUnixTime = getUnixTime$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name getUnixTime
   * @category Timestamp Helpers
   * @summary Get the seconds timestamp of the given date.
   *
   * @description
   * Get the seconds timestamp of the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given date
   *
   * @returns The timestamp
   *
   * @example
   * // Get the timestamp of 29 February 2012 11:45:05 CET:
   * const result = getUnixTime(new Date(2012, 1, 29, 11, 45, 5))
   * //=> 1330512305
   */
  function getUnixTime$1(date) {
    return Math.trunc(+(0, _index.toDate)(date) / 1000);
  }
  return getUnixTime;
}

var getWeekOfMonth = {};

var hasRequiredGetWeekOfMonth;

function requireGetWeekOfMonth() {
  if (hasRequiredGetWeekOfMonth) return getWeekOfMonth;
  hasRequiredGetWeekOfMonth = 1;
  getWeekOfMonth.getWeekOfMonth = getWeekOfMonth$1;
  var _index = /*@__PURE__*/ requireGetDate();
  var _index2 = /*@__PURE__*/ requireGetDay();
  var _index3 = /*@__PURE__*/ requireStartOfMonth();

  var _index4 = /*@__PURE__*/ requireDefaultOptions();

  /**
   * The {@link getWeekOfMonth} function options.
   */

  /**
   * @name getWeekOfMonth
   * @category Week Helpers
   * @summary Get the week of the month of the given date.
   *
   * @description
   * Get the week of the month of the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given date
   * @param options - An object with options.
   *
   * @returns The week of month
   *
   * @example
   * // Which week of the month is 9 November 2017?
   * const result = getWeekOfMonth(new Date(2017, 10, 9))
   * //=> 2
   */
  function getWeekOfMonth$1(date, options) {
    const defaultOptions = (0, _index4.getDefaultOptions)();
    const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions.weekStartsOn ?? defaultOptions.locale?.options?.weekStartsOn ?? 0;

    const currentDayOfMonth = (0, _index.getDate)(date);
    if (isNaN(currentDayOfMonth)) return NaN;

    const startWeekDay = (0, _index2.getDay)((0, _index3.startOfMonth)(date));

    let lastDayOfFirstWeek = weekStartsOn - startWeekDay;
    if (lastDayOfFirstWeek <= 0) lastDayOfFirstWeek += 7;

    const remainingDaysAfterFirstWeek = currentDayOfMonth - lastDayOfFirstWeek;
    return Math.ceil(remainingDaysAfterFirstWeek / 7) + 1;
  }
  return getWeekOfMonth;
}

var getWeeksInMonth = {};

var lastDayOfMonth = {};

var hasRequiredLastDayOfMonth;

function requireLastDayOfMonth() {
  if (hasRequiredLastDayOfMonth) return lastDayOfMonth;
  hasRequiredLastDayOfMonth = 1;
  lastDayOfMonth.lastDayOfMonth = lastDayOfMonth$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name lastDayOfMonth
   * @category Month Helpers
   * @summary Return the last day of a month for the given date.
   *
   * @description
   * Return the last day of a month for the given date.
   * The result will be in the local timezone.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The last day of a month
   *
   * @example
   * // The last day of a month for 2 September 2014 11:55:00:
   * const result = lastDayOfMonth(new Date(2014, 8, 2, 11, 55, 0))
   * //=> Tue Sep 30 2014 00:00:00
   */
  function lastDayOfMonth$1(date) {
    const _date = (0, _index.toDate)(date);
    const month = _date.getMonth();
    _date.setFullYear(_date.getFullYear(), month + 1, 0);
    _date.setHours(0, 0, 0, 0);
    return _date;
  }
  return lastDayOfMonth;
}

var hasRequiredGetWeeksInMonth;

function requireGetWeeksInMonth() {
  if (hasRequiredGetWeeksInMonth) return getWeeksInMonth;
  hasRequiredGetWeeksInMonth = 1;
  getWeeksInMonth.getWeeksInMonth = getWeeksInMonth$1;
  var _index = /*@__PURE__*/ requireDifferenceInCalendarWeeks();
  var _index2 = /*@__PURE__*/ requireLastDayOfMonth();
  var _index3 = /*@__PURE__*/ requireStartOfMonth();

  /**
   * The {@link getWeeksInMonth} function options.
   */

  /**
   * @name getWeeksInMonth
   * @category Week Helpers
   * @summary Get the number of calendar weeks a month spans.
   *
   * @description
   * Get the number of calendar weeks the month in the given date spans.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given date
   * @param options - An object with options.
   *
   * @returns The number of calendar weeks
   *
   * @example
   * // How many calendar weeks does February 2015 span?
   * const result = getWeeksInMonth(new Date(2015, 1, 8))
   * //=> 4
   *
   * @example
   * // If the week starts on Monday,
   * // how many calendar weeks does July 2017 span?
   * const result = getWeeksInMonth(new Date(2017, 6, 5), { weekStartsOn: 1 })
   * //=> 6
   */
  function getWeeksInMonth$1(date, options) {
    return (0, _index.differenceInCalendarWeeks)((0, _index2.lastDayOfMonth)(date), (0, _index3.startOfMonth)(date), options) + 1;
  }
  return getWeeksInMonth;
}

var getYear = {};

var hasRequiredGetYear;

function requireGetYear() {
  if (hasRequiredGetYear) return getYear;
  hasRequiredGetYear = 1;
  getYear.getYear = getYear$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name getYear
   * @category Year Helpers
   * @summary Get the year of the given date.
   *
   * @description
   * Get the year of the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The given date
   *
   * @returns The year
   *
   * @example
   * // Which year is 2 July 2014?
   * const result = getYear(new Date(2014, 6, 2))
   * //=> 2014
   */
  function getYear$1(date) {
    return (0, _index.toDate)(date).getFullYear();
  }
  return getYear;
}

var hoursToMilliseconds = {};

var hasRequiredHoursToMilliseconds;

function requireHoursToMilliseconds() {
  if (hasRequiredHoursToMilliseconds) return hoursToMilliseconds;
  hasRequiredHoursToMilliseconds = 1;
  hoursToMilliseconds.hoursToMilliseconds = hoursToMilliseconds$1;
  var _index = /*@__PURE__*/ requireConstants$1();

  /**
   * @name hoursToMilliseconds
   * @category  Conversion Helpers
   * @summary Convert hours to milliseconds.
   *
   * @description
   * Convert a number of hours to a full number of milliseconds.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param hours - number of hours to be converted
   *
   * @returns The number of hours converted to milliseconds
   *
   * @example
   * // Convert 2 hours to milliseconds:
   * const result = hoursToMilliseconds(2)
   * //=> 7200000
   */
  function hoursToMilliseconds$1(hours) {
    return Math.trunc(hours * _index.millisecondsInHour);
  }
  return hoursToMilliseconds;
}

var hoursToMinutes = {};

var hasRequiredHoursToMinutes;

function requireHoursToMinutes() {
  if (hasRequiredHoursToMinutes) return hoursToMinutes;
  hasRequiredHoursToMinutes = 1;
  hoursToMinutes.hoursToMinutes = hoursToMinutes$1;
  var _index = /*@__PURE__*/ requireConstants$1();

  /**
   * @name hoursToMinutes
   * @category Conversion Helpers
   * @summary Convert hours to minutes.
   *
   * @description
   * Convert a number of hours to a full number of minutes.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param hours - number of hours to be converted
   *
   * @returns The number of hours converted in minutes
   *
   * @example
   * // Convert 2 hours to minutes:
   * const result = hoursToMinutes(2)
   * //=> 120
   */
  function hoursToMinutes$1(hours) {
    return Math.trunc(hours * _index.minutesInHour);
  }
  return hoursToMinutes;
}

var hoursToSeconds = {};

var hasRequiredHoursToSeconds;

function requireHoursToSeconds() {
  if (hasRequiredHoursToSeconds) return hoursToSeconds;
  hasRequiredHoursToSeconds = 1;
  hoursToSeconds.hoursToSeconds = hoursToSeconds$1;
  var _index = /*@__PURE__*/ requireConstants$1();

  /**
   * @name hoursToSeconds
   * @category Conversion Helpers
   * @summary Convert hours to seconds.
   *
   * @description
   * Convert a number of hours to a full number of seconds.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param hours - The number of hours to be converted
   *
   * @returns The number of hours converted in seconds
   *
   * @example
   * // Convert 2 hours to seconds:
   * const result = hoursToSeconds(2)
   * //=> 7200
   */
  function hoursToSeconds$1(hours) {
    return Math.trunc(hours * _index.secondsInHour);
  }
  return hoursToSeconds;
}

var interval = {};

var hasRequiredInterval;

function requireInterval() {
  if (hasRequiredInterval) return interval;
  hasRequiredInterval = 1;
  interval.interval = interval$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * The {@link interval} function options.
   */

  /**
   * @name interval
   * @category Interval Helpers
   * @summary Creates an interval object and validates its values.
   *
   * @description
   * Creates a normalized interval object and validates its values. If the interval is invalid, an exception is thrown.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param start - The start of the interval.
   * @param end - The end of the interval.
   * @param options - The options object.
   *
   * @throws `Start date is invalid` when `start` is invalid.
   * @throws `End date is invalid` when `end` is invalid.
   * @throws `End date must be after start date` when end is before `start` and `options.assertPositive` is true.
   *
   * @returns The normalized and validated interval object.
   */
  function interval$1(start, end, options) {
    const _start = (0, _index.toDate)(start);
    if (isNaN(+_start)) throw new TypeError('Start date is invalid');

    const _end = (0, _index.toDate)(end);
    if (isNaN(+_end)) throw new TypeError('End date is invalid');

    if (options?.assertPositive && +_start > +_end) throw new TypeError('End date must be after start date');

    return { start: _start, end: _end };
  }
  return interval;
}

var intervalToDuration = {};

var hasRequiredIntervalToDuration;

function requireIntervalToDuration() {
  if (hasRequiredIntervalToDuration) return intervalToDuration;
  hasRequiredIntervalToDuration = 1;
  intervalToDuration.intervalToDuration = intervalToDuration$1;
  var _index = /*@__PURE__*/ requireAdd();
  var _index2 = /*@__PURE__*/ requireDifferenceInDays();
  var _index3 = /*@__PURE__*/ requireDifferenceInHours();
  var _index4 = /*@__PURE__*/ requireDifferenceInMinutes();
  var _index5 = /*@__PURE__*/ requireDifferenceInMonths();
  var _index6 = /*@__PURE__*/ requireDifferenceInSeconds();
  var _index7 = /*@__PURE__*/ requireDifferenceInYears();
  var _index8 = /*@__PURE__*/ requireToDate();

  /**
   * @name intervalToDuration
   * @category Common Helpers
   * @summary Convert interval to duration
   *
   * @description
   * Convert a interval object to a duration object.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param interval - The interval to convert to duration
   *
   * @returns The duration object
   *
   * @example
   * // Get the duration between January 15, 1929 and April 4, 1968.
   * intervalToDuration({
   *   start: new Date(1929, 0, 15, 12, 0, 0),
   *   end: new Date(1968, 3, 4, 19, 5, 0)
   * })
   * // => { years: 39, months: 2, days: 20, hours: 7, minutes: 5, seconds: 0 }
   */
  function intervalToDuration$1(interval) {
    const start = (0, _index8.toDate)(interval.start);
    const end = (0, _index8.toDate)(interval.end);

    const duration = {};

    const years = (0, _index7.differenceInYears)(end, start);
    if (years) duration.years = years;

    const remainingMonths = (0, _index.add)(start, { years: duration.years });

    const months = (0, _index5.differenceInMonths)(end, remainingMonths);
    if (months) duration.months = months;

    const remainingDays = (0, _index.add)(remainingMonths, {
      months: duration.months,
    });

    const days = (0, _index2.differenceInDays)(end, remainingDays);
    if (days) duration.days = days;

    const remainingHours = (0, _index.add)(remainingDays, {
      days: duration.days,
    });

    const hours = (0, _index3.differenceInHours)(end, remainingHours);
    if (hours) duration.hours = hours;

    const remainingMinutes = (0, _index.add)(remainingHours, {
      hours: duration.hours,
    });

    const minutes = (0, _index4.differenceInMinutes)(end, remainingMinutes);
    if (minutes) duration.minutes = minutes;

    const remainingSeconds = (0, _index.add)(remainingMinutes, {
      minutes: duration.minutes,
    });

    const seconds = (0, _index6.differenceInSeconds)(end, remainingSeconds);
    if (seconds) duration.seconds = seconds;

    return duration;
  }
  return intervalToDuration;
}

var intlFormat = {};

var hasRequiredIntlFormat;

function requireIntlFormat() {
  if (hasRequiredIntlFormat) return intlFormat;
  hasRequiredIntlFormat = 1;
  intlFormat.intlFormat = intlFormat$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * The locale string (see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument).
   */

  /**
   * The format options (see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options)
   */

  /**
   * The locale options.
   */

  /**
   * @name intlFormat
   * @category Common Helpers
   * @summary Format the date with Intl.DateTimeFormat (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat).
   *
   * @description
   * Return the formatted date string in the given format.
   * The method uses [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) inside.
   * formatOptions are the same as [`Intl.DateTimeFormat` options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options)
   *
   * > ⚠️ Please note that before Node version 13.0.0, only the locale data for en-US is available by default.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to format
   *
   * @returns The formatted date string
   *
   * @throws `date` must not be Invalid Date
   *
   * @example
   * // Represent 4 October 2019 in middle-endian format:
   * const result = intlFormat(new Date(2019, 9, 4, 12, 30, 13, 456))
   * //=> 10/4/2019
   */

  /**
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to format
   * @param localeOptions - An object with locale
   *
   * @returns The formatted date string
   *
   * @throws `date` must not be Invalid Date
   *
   * @example
   * // Represent 4 October 2019 in Korean.
   * // Convert the date with locale's options.
   * const result = intlFormat(new Date(2019, 9, 4, 12, 30, 13, 456), {
   *   locale: 'ko-KR',
   * })
   * //=> 2019. 10. 4.
   */

  /**
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to format
   * @param formatOptions - The format options
   *
   * @returns The formatted date string
   *
   * @throws `date` must not be Invalid Date
   *
   * @example
   * // Represent 4 October 2019.
   * // Convert the date with format's options.
   * const result = intlFormat.default(new Date(2019, 9, 4, 12, 30, 13, 456), {
   *   year: 'numeric',
   *   month: 'numeric',
   *   day: 'numeric',
   *   hour: 'numeric',
   * })
   * //=> 10/4/2019, 12 PM
   */

  /**
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to format
   * @param formatOptions - The format options
   * @param localeOptions - An object with locale
   *
   * @returns The formatted date string
   *
   * @throws `date` must not be Invalid Date
   *
   * @example
   * // Represent 4 October 2019 in German.
   * // Convert the date with format's options and locale's options.
   * const result = intlFormat(new Date(2019, 9, 4, 12, 30, 13, 456), {
   *   weekday: 'long',
   *   year: 'numeric',
   *   month: 'long',
   *   day: 'numeric',
   * }, {
   *   locale: 'de-DE',
   * })
   * //=> Freitag, 4. Oktober 2019
   */

  function intlFormat$1(date, formatOrLocale, localeOptions) {
    let formatOptions;

    if (isFormatOptions(formatOrLocale)) {
      formatOptions = formatOrLocale;
    } else {
      localeOptions = formatOrLocale;
    }

    return new Intl.DateTimeFormat(localeOptions?.locale, formatOptions).format((0, _index.toDate)(date));
  }

  function isFormatOptions(opts) {
    return opts !== undefined && !('locale' in opts);
  }
  return intlFormat;
}

var intlFormatDistance = {};

var hasRequiredIntlFormatDistance;

function requireIntlFormatDistance() {
  if (hasRequiredIntlFormatDistance) return intlFormatDistance;
  hasRequiredIntlFormatDistance = 1;
  intlFormatDistance.intlFormatDistance = intlFormatDistance$1;
  var _index = /*@__PURE__*/ requireConstants$1();

  var _index2 = /*@__PURE__*/ requireDifferenceInCalendarDays();
  var _index3 = /*@__PURE__*/ requireDifferenceInCalendarMonths();
  var _index4 = /*@__PURE__*/ requireDifferenceInCalendarQuarters();
  var _index5 = /*@__PURE__*/ requireDifferenceInCalendarWeeks();
  var _index6 = /*@__PURE__*/ requireDifferenceInCalendarYears();
  var _index7 = /*@__PURE__*/ requireDifferenceInHours();
  var _index8 = /*@__PURE__*/ requireDifferenceInMinutes();
  var _index9 = /*@__PURE__*/ requireDifferenceInSeconds();
  var _index10 = /*@__PURE__*/ requireToDate();

  /**
   * The {@link intlFormatDistance} function options.
   */

  /**
   * The unit used to format the distance in {@link intlFormatDistance}.
   */

  /**
   * @name intlFormatDistance
   * @category Common Helpers
   * @summary Formats distance between two dates in a human-readable format
   * @description
   * The function calculates the difference between two dates and formats it as a human-readable string.
   *
   * The function will pick the most appropriate unit depending on the distance between dates. For example, if the distance is a few hours, it might return `x hours`. If the distance is a few months, it might return `x months`.
   *
   * You can also specify a unit to force using it regardless of the distance to get a result like `123456 hours`.
   *
   * See the table below for the unit picking logic:
   *
   * | Distance between dates | Result (past)  | Result (future) |
   * | ---------------------- | -------------- | --------------- |
   * | 0 seconds              | now            | now             |
   * | 1-59 seconds           | X seconds ago  | in X seconds    |
   * | 1-59 minutes           | X minutes ago  | in X minutes    |
   * | 1-23 hours             | X hours ago    | in X hours      |
   * | 1 day                  | yesterday      | tomorrow        |
   * | 2-6 days               | X days ago     | in X days       |
   * | 7 days                 | last week      | next week       |
   * | 8 days-1 month         | X weeks ago    | in X weeks      |
   * | 1 month                | last month     | next month      |
   * | 2-3 months             | X months ago   | in X months     |
   * | 1 quarter              | last quarter   | next quarter    |
   * | 2-3 quarters           | X quarters ago | in X quarters   |
   * | 1 year                 | last year      | next year       |
   * | 2+ years               | X years ago    | in X years      |
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date
   * @param baseDate - The date to compare with.
   * @param options - An object with options.
   * See MDN for details [Locale identification and negotiation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation)
   * The narrow one could be similar to the short one for some locales.
   *
   * @returns The distance in words according to language-sensitive relative time formatting.
   *
   * @throws `date` must not be Invalid Date
   * @throws `baseDate` must not be Invalid Date
   * @throws `options.unit` must not be invalid Unit
   * @throws `options.locale` must not be invalid locale
   * @throws `options.localeMatcher` must not be invalid localeMatcher
   * @throws `options.numeric` must not be invalid numeric
   * @throws `options.style` must not be invalid style
   *
   * @example
   * // What is the distance between the dates when the fist date is after the second?
   * intlFormatDistance(
   *   new Date(1986, 3, 4, 11, 30, 0),
   *   new Date(1986, 3, 4, 10, 30, 0)
   * )
   * //=> 'in 1 hour'
   *
   * // What is the distance between the dates when the fist date is before the second?
   * intlFormatDistance(
   *   new Date(1986, 3, 4, 10, 30, 0),
   *   new Date(1986, 3, 4, 11, 30, 0)
   * )
   * //=> '1 hour ago'
   *
   * @example
   * // Use the unit option to force the function to output the result in quarters. Without setting it, the example would return "next year"
   * intlFormatDistance(
   *   new Date(1987, 6, 4, 10, 30, 0),
   *   new Date(1986, 3, 4, 10, 30, 0),
   *   { unit: 'quarter' }
   * )
   * //=> 'in 5 quarters'
   *
   * @example
   * // Use the locale option to get the result in Spanish. Without setting it, the example would return "in 1 hour".
   * intlFormatDistance(
   *   new Date(1986, 3, 4, 11, 30, 0),
   *   new Date(1986, 3, 4, 10, 30, 0),
   *   { locale: 'es' }
   * )
   * //=> 'dentro de 1 hora'
   *
   * @example
   * // Use the numeric option to force the function to use numeric values. Without setting it, the example would return "tomorrow".
   * intlFormatDistance(
   *   new Date(1986, 3, 5, 11, 30, 0),
   *   new Date(1986, 3, 4, 11, 30, 0),
   *   { numeric: 'always' }
   * )
   * //=> 'in 1 day'
   *
   * @example
   * // Use the style option to force the function to use short values. Without setting it, the example would return "in 2 years".
   * intlFormatDistance(
   *   new Date(1988, 3, 4, 11, 30, 0),
   *   new Date(1986, 3, 4, 11, 30, 0),
   *   { style: 'short' }
   * )
   * //=> 'in 2 yr'
   */
  function intlFormatDistance$1(date, baseDate, options) {
    let value = 0;
    let unit;
    const dateLeft = (0, _index10.toDate)(date);
    const dateRight = (0, _index10.toDate)(baseDate);

    if (!options?.unit) {
      // Get the unit based on diffInSeconds calculations if no unit is specified
      const diffInSeconds = (0, _index9.differenceInSeconds)(dateLeft, dateRight); // The smallest unit

      if (Math.abs(diffInSeconds) < _index.secondsInMinute) {
        value = (0, _index9.differenceInSeconds)(dateLeft, dateRight);
        unit = 'second';
      } else if (Math.abs(diffInSeconds) < _index.secondsInHour) {
        value = (0, _index8.differenceInMinutes)(dateLeft, dateRight);
        unit = 'minute';
      } else if (Math.abs(diffInSeconds) < _index.secondsInDay && Math.abs((0, _index2.differenceInCalendarDays)(dateLeft, dateRight)) < 1) {
        value = (0, _index7.differenceInHours)(dateLeft, dateRight);
        unit = 'hour';
      } else if (Math.abs(diffInSeconds) < _index.secondsInWeek && (value = (0, _index2.differenceInCalendarDays)(dateLeft, dateRight)) && Math.abs(value) < 7) {
        unit = 'day';
      } else if (Math.abs(diffInSeconds) < _index.secondsInMonth) {
        value = (0, _index5.differenceInCalendarWeeks)(dateLeft, dateRight);
        unit = 'week';
      } else if (Math.abs(diffInSeconds) < _index.secondsInQuarter) {
        value = (0, _index3.differenceInCalendarMonths)(dateLeft, dateRight);
        unit = 'month';
      } else if (Math.abs(diffInSeconds) < _index.secondsInYear) {
        if ((0, _index4.differenceInCalendarQuarters)(dateLeft, dateRight) < 4) {
          // To filter out cases that are less than a year but match 4 quarters
          value = (0, _index4.differenceInCalendarQuarters)(dateLeft, dateRight);
          unit = 'quarter';
        } else {
          value = (0, _index6.differenceInCalendarYears)(dateLeft, dateRight);
          unit = 'year';
        }
      } else {
        value = (0, _index6.differenceInCalendarYears)(dateLeft, dateRight);
        unit = 'year';
      }
    } else {
      // Get the value if unit is specified
      unit = options?.unit;
      if (unit === 'second') {
        value = (0, _index9.differenceInSeconds)(dateLeft, dateRight);
      } else if (unit === 'minute') {
        value = (0, _index8.differenceInMinutes)(dateLeft, dateRight);
      } else if (unit === 'hour') {
        value = (0, _index7.differenceInHours)(dateLeft, dateRight);
      } else if (unit === 'day') {
        value = (0, _index2.differenceInCalendarDays)(dateLeft, dateRight);
      } else if (unit === 'week') {
        value = (0, _index5.differenceInCalendarWeeks)(dateLeft, dateRight);
      } else if (unit === 'month') {
        value = (0, _index3.differenceInCalendarMonths)(dateLeft, dateRight);
      } else if (unit === 'quarter') {
        value = (0, _index4.differenceInCalendarQuarters)(dateLeft, dateRight);
      } else if (unit === 'year') {
        value = (0, _index6.differenceInCalendarYears)(dateLeft, dateRight);
      }
    }

    const rtf = new Intl.RelativeTimeFormat(options?.locale, {
      localeMatcher: options?.localeMatcher,
      numeric: options?.numeric || 'auto',
      style: options?.style,
    });

    return rtf.format(value, unit);
  }
  return intlFormatDistance;
}

var isAfter = {};

var hasRequiredIsAfter;

function requireIsAfter() {
  if (hasRequiredIsAfter) return isAfter;
  hasRequiredIsAfter = 1;
  isAfter.isAfter = isAfter$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name isAfter
   * @category Common Helpers
   * @summary Is the first date after the second one?
   *
   * @description
   * Is the first date after the second one?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date that should be after the other one to return true
   * @param dateToCompare - The date to compare with
   *
   * @returns The first date is after the second date
   *
   * @example
   * // Is 10 July 1989 after 11 February 1987?
   * const result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
   * //=> true
   */
  function isAfter$1(date, dateToCompare) {
    const _date = (0, _index.toDate)(date);
    const _dateToCompare = (0, _index.toDate)(dateToCompare);
    return _date.getTime() > _dateToCompare.getTime();
  }
  return isAfter;
}

var isBefore = {};

var hasRequiredIsBefore;

function requireIsBefore() {
  if (hasRequiredIsBefore) return isBefore;
  hasRequiredIsBefore = 1;
  isBefore.isBefore = isBefore$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name isBefore
   * @category Common Helpers
   * @summary Is the first date before the second one?
   *
   * @description
   * Is the first date before the second one?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date that should be before the other one to return true
   * @param dateToCompare - The date to compare with
   *
   * @returns The first date is before the second date
   *
   * @example
   * // Is 10 July 1989 before 11 February 1987?
   * const result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
   * //=> false
   */
  function isBefore$1(date, dateToCompare) {
    const _date = (0, _index.toDate)(date);
    const _dateToCompare = (0, _index.toDate)(dateToCompare);
    return +_date < +_dateToCompare;
  }
  return isBefore;
}

var isEqual = {};

var hasRequiredIsEqual;

function requireIsEqual() {
  if (hasRequiredIsEqual) return isEqual;
  hasRequiredIsEqual = 1;
  isEqual.isEqual = isEqual$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name isEqual
   * @category Common Helpers
   * @summary Are the given dates equal?
   *
   * @description
   * Are the given dates equal?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The first date to compare
   * @param dateRight - The second date to compare
   *
   * @returns The dates are equal
   *
   * @example
   * // Are 2 July 2014 06:30:45.000 and 2 July 2014 06:30:45.500 equal?
   * const result = isEqual(
   *   new Date(2014, 6, 2, 6, 30, 45, 0),
   *   new Date(2014, 6, 2, 6, 30, 45, 500)
   * )
   * //=> false
   */
  function isEqual$1(leftDate, rightDate) {
    const _dateLeft = (0, _index.toDate)(leftDate);
    const _dateRight = (0, _index.toDate)(rightDate);
    return +_dateLeft === +_dateRight;
  }
  return isEqual;
}

var isExists = {};

var hasRequiredIsExists;

function requireIsExists() {
  if (hasRequiredIsExists) return isExists;
  hasRequiredIsExists = 1;
  isExists.isExists = isExists$1; /**
   * @name isExists
   * @category Common Helpers
   * @summary Is the given date exists?
   *
   * @description
   * Checks if the given arguments convert to an existing date.
   *
   * @param year - The year of the date to check
   * @param month - The month of the date to check
   * @param day - The day of the date to check
   *
   * @returns `true` if the date exists
   *
   * @example
   * // For the valid date:
   * const result = isExists(2018, 0, 31)
   * //=> true
   *
   * @example
   * // For the invalid date:
   * const result = isExists(2018, 1, 31)
   * //=> false
   */
  function isExists$1(year, month, day) {
    const date = new Date(year, month, day);
    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
  }
  return isExists;
}

var isFirstDayOfMonth = {};

var hasRequiredIsFirstDayOfMonth;

function requireIsFirstDayOfMonth() {
  if (hasRequiredIsFirstDayOfMonth) return isFirstDayOfMonth;
  hasRequiredIsFirstDayOfMonth = 1;
  isFirstDayOfMonth.isFirstDayOfMonth = isFirstDayOfMonth$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
	 * @name isFirstDayOfMonth
	 * @category Month Helpers
	 * @summary Is the given date the first day of a month?
	 *
	 * @description
	 * Is the given date the first day of a month?
	 *
	 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
	 *
	 * @param date - The date to check

	 * @returns The date is the first day of a month
	 *
	 * @example
	 * // Is 1 September 2014 the first day of a month?
	 * const result = isFirstDayOfMonth(new Date(2014, 8, 1))
	 * //=> true
	 */
  function isFirstDayOfMonth$1(date) {
    return (0, _index.toDate)(date).getDate() === 1;
  }
  return isFirstDayOfMonth;
}

var isFriday = {};

var hasRequiredIsFriday;

function requireIsFriday() {
  if (hasRequiredIsFriday) return isFriday;
  hasRequiredIsFriday = 1;
  isFriday.isFriday = isFriday$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name isFriday
   * @category Weekday Helpers
   * @summary Is the given date Friday?
   *
   * @description
   * Is the given date Friday?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   *
   * @returns The date is Friday
   *
   * @example
   * // Is 26 September 2014 Friday?
   * const result = isFriday(new Date(2014, 8, 26))
   * //=> true
   */
  function isFriday$1(date) {
    return (0, _index.toDate)(date).getDay() === 5;
  }
  return isFriday;
}

var isFuture = {};

var hasRequiredIsFuture;

function requireIsFuture() {
  if (hasRequiredIsFuture) return isFuture;
  hasRequiredIsFuture = 1;
  isFuture.isFuture = isFuture$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name isFuture
   * @category Common Helpers
   * @summary Is the given date in the future?
   * @pure false
   *
   * @description
   * Is the given date in the future?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   *
   * @returns The date is in the future
   *
   * @example
   * // If today is 6 October 2014, is 31 December 2014 in the future?
   * const result = isFuture(new Date(2014, 11, 31))
   * //=> true
   */
  function isFuture$1(date) {
    return +(0, _index.toDate)(date) > Date.now();
  }
  return isFuture;
}

var isMatch = {};

var parse = {};

var parsers = {};

var EraParser = {};

var Parser = {};

var Setter = {};

var transpose = {};

var hasRequiredTranspose;

function requireTranspose() {
  if (hasRequiredTranspose) return transpose;
  hasRequiredTranspose = 1;
  transpose.transpose = transpose$1;
  var _index = /*@__PURE__*/ requireConstructFrom();

  /**
   * @name transpose
   * @category Generic Helpers
   * @summary Transpose the date to the given constructor.
   *
   * @description
   * The function transposes the date to the given constructor. It helps you
   * to transpose the date in the system time zone to say `UTCDate` or any other
   * date extension.
   *
   * @typeParam DateInputType - The input `Date` type derived from the passed argument.
   * @typeParam DateOutputType - The output `Date` type derived from the passed constructor.
   *
   * @param fromDate - The date to use values from
   * @param constructor - The date constructor to use
   *
   * @returns Date transposed to the given constructor
   *
   * @example
   * // Create July 10, 2022 00:00 in locale time zone
   * const date = new Date(2022, 6, 10)
   * //=> 'Sun Jul 10 2022 00:00:00 GMT+0800 (Singapore Standard Time)'
   *
   * @example
   * // Transpose the date to July 10, 2022 00:00 in UTC
   * transpose(date, UTCDate)
   * //=> 'Sun Jul 10 2022 00:00:00 GMT+0000 (Coordinated Universal Time)'
   */
  function transpose$1(fromDate, constructor) {
    const date = constructor instanceof Date ? (0, _index.constructFrom)(constructor, 0) : new constructor(0);
    date.setFullYear(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
    date.setHours(fromDate.getHours(), fromDate.getMinutes(), fromDate.getSeconds(), fromDate.getMilliseconds());
    return date;
  }
  return transpose;
}

var hasRequiredSetter;

function requireSetter() {
  if (hasRequiredSetter) return Setter;
  hasRequiredSetter = 1;
  Setter.ValueSetter = Setter.Setter = Setter.DateToSystemTimezoneSetter = void 0;
  var _index = /*@__PURE__*/ requireTranspose();
  var _index2 = /*@__PURE__*/ requireConstructFrom();

  const TIMEZONE_UNIT_PRIORITY = 10;

  let Setter$1 = class Setter {
    subPriority = 0;

    validate(_utcDate, _options) {
      return true;
    }
  };
  Setter.Setter = Setter$1;

  class ValueSetter extends Setter$1 {
    constructor(
      value,

      validateValue,

      setValue,

      priority,
      subPriority,
    ) {
      super();
      this.value = value;
      this.validateValue = validateValue;
      this.setValue = setValue;
      this.priority = priority;
      if (subPriority) {
        this.subPriority = subPriority;
      }
    }

    validate(date, options) {
      return this.validateValue(date, this.value, options);
    }

    set(date, flags, options) {
      return this.setValue(date, flags, this.value, options);
    }
  }
  Setter.ValueSetter = ValueSetter;

  class DateToSystemTimezoneSetter extends Setter$1 {
    priority = TIMEZONE_UNIT_PRIORITY;
    subPriority = -1;
    set(date, flags) {
      if (flags.timestampIsSet) return date;
      return (0, _index2.constructFrom)(date, (0, _index.transpose)(date, Date));
    }
  }
  Setter.DateToSystemTimezoneSetter = DateToSystemTimezoneSetter;
  return Setter;
}

var hasRequiredParser;

function requireParser() {
  if (hasRequiredParser) return Parser;
  hasRequiredParser = 1;
  Parser.Parser = void 0;
  var _Setter = /*@__PURE__*/ requireSetter();

  let Parser$1 = class Parser {
    run(dateString, token, match, options) {
      const result = this.parse(dateString, token, match, options);
      if (!result) {
        return null;
      }

      return {
        setter: new _Setter.ValueSetter(result.value, this.validate, this.set, this.priority, this.subPriority),
        rest: result.rest,
      };
    }

    validate(_utcDate, _value, _options) {
      return true;
    }
  };
  Parser.Parser = Parser$1;
  return Parser;
}

var hasRequiredEraParser;

function requireEraParser() {
  if (hasRequiredEraParser) return EraParser;
  hasRequiredEraParser = 1;
  EraParser.EraParser = void 0;

  var _Parser = /*@__PURE__*/ requireParser();

  let EraParser$1 = class EraParser extends _Parser.Parser {
    priority = 140;

    parse(dateString, token, match) {
      switch (token) {
        // AD, BC
        case 'G':
        case 'GG':
        case 'GGG':
          return match.era(dateString, { width: 'abbreviated' }) || match.era(dateString, { width: 'narrow' });

        // A, B
        case 'GGGGG':
          return match.era(dateString, { width: 'narrow' });
        // Anno Domini, Before Christ
        case 'GGGG':
        default:
          return match.era(dateString, { width: 'wide' }) || match.era(dateString, { width: 'abbreviated' }) || match.era(dateString, { width: 'narrow' });
      }
    }

    set(date, flags, value) {
      flags.era = value;
      date.setFullYear(value, 0, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }

    incompatibleTokens = ['R', 'u', 't', 'T'];
  };
  EraParser.EraParser = EraParser$1;
  return EraParser;
}

var YearParser = {};

var utils = {};

var constants = {};

var hasRequiredConstants;

function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  constants.timezonePatterns = constants.numericPatterns = void 0;
  constants.numericPatterns = {
    month: /^(1[0-2]|0?\d)/, // 0 to 12
    date: /^(3[0-1]|[0-2]?\d)/, // 0 to 31
    dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/, // 0 to 366
    week: /^(5[0-3]|[0-4]?\d)/, // 0 to 53
    hour23h: /^(2[0-3]|[0-1]?\d)/, // 0 to 23
    hour24h: /^(2[0-4]|[0-1]?\d)/, // 0 to 24
    hour11h: /^(1[0-1]|0?\d)/, // 0 to 11
    hour12h: /^(1[0-2]|0?\d)/, // 0 to 12
    minute: /^[0-5]?\d/, // 0 to 59
    second: /^[0-5]?\d/, // 0 to 59

    singleDigit: /^\d/, // 0 to 9
    twoDigits: /^\d{1,2}/, // 0 to 99
    threeDigits: /^\d{1,3}/, // 0 to 999
    fourDigits: /^\d{1,4}/, // 0 to 9999

    anyDigitsSigned: /^-?\d+/,
    singleDigitSigned: /^-?\d/, // 0 to 9, -0 to -9
    twoDigitsSigned: /^-?\d{1,2}/, // 0 to 99, -0 to -99
    threeDigitsSigned: /^-?\d{1,3}/, // 0 to 999, -0 to -999
    fourDigitsSigned: /^-?\d{1,4}/, // 0 to 9999, -0 to -9999
  };

  constants.timezonePatterns = {
    basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
    basic: /^([+-])(\d{2})(\d{2})|Z/,
    basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
    extended: /^([+-])(\d{2}):(\d{2})|Z/,
    extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/,
  };
  return constants;
}

var hasRequiredUtils;

function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  utils.dayPeriodEnumToHours = dayPeriodEnumToHours;
  utils.isLeapYearIndex = isLeapYearIndex;
  utils.mapValue = mapValue;
  utils.normalizeTwoDigitYear = normalizeTwoDigitYear;
  utils.parseAnyDigitsSigned = parseAnyDigitsSigned;
  utils.parseNDigits = parseNDigits;
  utils.parseNDigitsSigned = parseNDigitsSigned;
  utils.parseNumericPattern = parseNumericPattern;
  utils.parseTimezonePattern = parseTimezonePattern;
  var _index = /*@__PURE__*/ requireConstants$1();

  var _constants = /*@__PURE__*/ requireConstants();

  function mapValue(parseFnResult, mapFn) {
    if (!parseFnResult) {
      return parseFnResult;
    }

    return {
      value: mapFn(parseFnResult.value),
      rest: parseFnResult.rest,
    };
  }

  function parseNumericPattern(pattern, dateString) {
    const matchResult = dateString.match(pattern);

    if (!matchResult) {
      return null;
    }

    return {
      value: parseInt(matchResult[0], 10),
      rest: dateString.slice(matchResult[0].length),
    };
  }

  function parseTimezonePattern(pattern, dateString) {
    const matchResult = dateString.match(pattern);

    if (!matchResult) {
      return null;
    }

    // Input is 'Z'
    if (matchResult[0] === 'Z') {
      return {
        value: 0,
        rest: dateString.slice(1),
      };
    }

    const sign = matchResult[1] === '+' ? 1 : -1;
    const hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
    const minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
    const seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;

    return {
      value: sign * (hours * _index.millisecondsInHour + minutes * _index.millisecondsInMinute + seconds * _index.millisecondsInSecond),
      rest: dateString.slice(matchResult[0].length),
    };
  }

  function parseAnyDigitsSigned(dateString) {
    return parseNumericPattern(_constants.numericPatterns.anyDigitsSigned, dateString);
  }

  function parseNDigits(n, dateString) {
    switch (n) {
      case 1:
        return parseNumericPattern(_constants.numericPatterns.singleDigit, dateString);
      case 2:
        return parseNumericPattern(_constants.numericPatterns.twoDigits, dateString);
      case 3:
        return parseNumericPattern(_constants.numericPatterns.threeDigits, dateString);
      case 4:
        return parseNumericPattern(_constants.numericPatterns.fourDigits, dateString);
      default:
        return parseNumericPattern(new RegExp('^\\d{1,' + n + '}'), dateString);
    }
  }

  function parseNDigitsSigned(n, dateString) {
    switch (n) {
      case 1:
        return parseNumericPattern(_constants.numericPatterns.singleDigitSigned, dateString);
      case 2:
        return parseNumericPattern(_constants.numericPatterns.twoDigitsSigned, dateString);
      case 3:
        return parseNumericPattern(_constants.numericPatterns.threeDigitsSigned, dateString);
      case 4:
        return parseNumericPattern(_constants.numericPatterns.fourDigitsSigned, dateString);
      default:
        return parseNumericPattern(new RegExp('^-?\\d{1,' + n + '}'), dateString);
    }
  }

  function dayPeriodEnumToHours(dayPeriod) {
    switch (dayPeriod) {
      case 'morning':
        return 4;
      case 'evening':
        return 17;
      case 'pm':
      case 'noon':
      case 'afternoon':
        return 12;
      case 'am':
      case 'midnight':
      case 'night':
      default:
        return 0;
    }
  }

  function normalizeTwoDigitYear(twoDigitYear, currentYear) {
    const isCommonEra = currentYear > 0;
    // Absolute number of the current year:
    // 1 -> 1 AC
    // 0 -> 1 BC
    // -1 -> 2 BC
    const absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;

    let result;
    if (absCurrentYear <= 50) {
      result = twoDigitYear || 100;
    } else {
      const rangeEnd = absCurrentYear + 50;
      const rangeEndCentury = Math.trunc(rangeEnd / 100) * 100;
      const isPreviousCentury = twoDigitYear >= rangeEnd % 100;
      result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
    }

    return isCommonEra ? result : 1 - result;
  }

  function isLeapYearIndex(year) {
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
  }
  return utils;
}

var hasRequiredYearParser;

function requireYearParser() {
  if (hasRequiredYearParser) return YearParser;
  hasRequiredYearParser = 1;
  YearParser.YearParser = void 0;
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_Patterns
  // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
  // |----------|-------|----|-------|-------|-------|
  // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
  // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
  // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
  // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
  // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
  let YearParser$1 = class YearParser extends _Parser.Parser {
    priority = 130;
    incompatibleTokens = ['Y', 'R', 'u', 'w', 'I', 'i', 'e', 'c', 't', 'T'];

    parse(dateString, token, match) {
      const valueCallback = year => ({
        year,
        isTwoDigitYear: token === 'yy',
      });

      switch (token) {
        case 'y':
          return (0, _utils.mapValue)((0, _utils.parseNDigits)(4, dateString), valueCallback);
        case 'yo':
          return (0, _utils.mapValue)(
            match.ordinalNumber(dateString, {
              unit: 'year',
            }),
            valueCallback,
          );
        default:
          return (0, _utils.mapValue)((0, _utils.parseNDigits)(token.length, dateString), valueCallback);
      }
    }

    validate(_date, value) {
      return value.isTwoDigitYear || value.year > 0;
    }

    set(date, flags, value) {
      const currentYear = date.getFullYear();

      if (value.isTwoDigitYear) {
        const normalizedTwoDigitYear = (0, _utils.normalizeTwoDigitYear)(value.year, currentYear);
        date.setFullYear(normalizedTwoDigitYear, 0, 1);
        date.setHours(0, 0, 0, 0);
        return date;
      }

      const year = !('era' in flags) || flags.era === 1 ? value.year : 1 - value.year;
      date.setFullYear(year, 0, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  };
  YearParser.YearParser = YearParser$1;
  return YearParser;
}

var LocalWeekYearParser = {};

var hasRequiredLocalWeekYearParser;

function requireLocalWeekYearParser() {
  if (hasRequiredLocalWeekYearParser) return LocalWeekYearParser;
  hasRequiredLocalWeekYearParser = 1;
  LocalWeekYearParser.LocalWeekYearParser = void 0;
  var _index = /*@__PURE__*/ requireGetWeekYear();

  var _index2 = /*@__PURE__*/ requireStartOfWeek();
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  // Local week-numbering year
  let LocalWeekYearParser$1 = class LocalWeekYearParser extends _Parser.Parser {
    priority = 130;

    parse(dateString, token, match) {
      const valueCallback = year => ({
        year,
        isTwoDigitYear: token === 'YY',
      });

      switch (token) {
        case 'Y':
          return (0, _utils.mapValue)((0, _utils.parseNDigits)(4, dateString), valueCallback);
        case 'Yo':
          return (0, _utils.mapValue)(
            match.ordinalNumber(dateString, {
              unit: 'year',
            }),
            valueCallback,
          );
        default:
          return (0, _utils.mapValue)((0, _utils.parseNDigits)(token.length, dateString), valueCallback);
      }
    }

    validate(_date, value) {
      return value.isTwoDigitYear || value.year > 0;
    }

    set(date, flags, value, options) {
      const currentYear = (0, _index.getWeekYear)(date, options);

      if (value.isTwoDigitYear) {
        const normalizedTwoDigitYear = (0, _utils.normalizeTwoDigitYear)(value.year, currentYear);
        date.setFullYear(normalizedTwoDigitYear, 0, options.firstWeekContainsDate);
        date.setHours(0, 0, 0, 0);
        return (0, _index2.startOfWeek)(date, options);
      }

      const year = !('era' in flags) || flags.era === 1 ? value.year : 1 - value.year;
      date.setFullYear(year, 0, options.firstWeekContainsDate);
      date.setHours(0, 0, 0, 0);
      return (0, _index2.startOfWeek)(date, options);
    }

    incompatibleTokens = ['y', 'R', 'u', 'Q', 'q', 'M', 'L', 'I', 'd', 'D', 'i', 't', 'T'];
  };
  LocalWeekYearParser.LocalWeekYearParser = LocalWeekYearParser$1;
  return LocalWeekYearParser;
}

var ISOWeekYearParser = {};

var hasRequiredISOWeekYearParser;

function requireISOWeekYearParser() {
  if (hasRequiredISOWeekYearParser) return ISOWeekYearParser;
  hasRequiredISOWeekYearParser = 1;
  ISOWeekYearParser.ISOWeekYearParser = void 0;
  var _index = /*@__PURE__*/ requireStartOfISOWeek();
  var _index2 = /*@__PURE__*/ requireConstructFrom();
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  // ISO week-numbering year
  let ISOWeekYearParser$1 = class ISOWeekYearParser extends _Parser.Parser {
    priority = 130;

    parse(dateString, token) {
      if (token === 'R') {
        return (0, _utils.parseNDigitsSigned)(4, dateString);
      }

      return (0, _utils.parseNDigitsSigned)(token.length, dateString);
    }

    set(date, _flags, value) {
      const firstWeekOfYear = (0, _index2.constructFrom)(date, 0);
      firstWeekOfYear.setFullYear(value, 0, 4);
      firstWeekOfYear.setHours(0, 0, 0, 0);
      return (0, _index.startOfISOWeek)(firstWeekOfYear);
    }

    incompatibleTokens = ['G', 'y', 'Y', 'u', 'Q', 'q', 'M', 'L', 'w', 'd', 'D', 'e', 'c', 't', 'T'];
  };
  ISOWeekYearParser.ISOWeekYearParser = ISOWeekYearParser$1;
  return ISOWeekYearParser;
}

var ExtendedYearParser = {};

var hasRequiredExtendedYearParser;

function requireExtendedYearParser() {
  if (hasRequiredExtendedYearParser) return ExtendedYearParser;
  hasRequiredExtendedYearParser = 1;
  ExtendedYearParser.ExtendedYearParser = void 0;
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  let ExtendedYearParser$1 = class ExtendedYearParser extends _Parser.Parser {
    priority = 130;

    parse(dateString, token) {
      if (token === 'u') {
        return (0, _utils.parseNDigitsSigned)(4, dateString);
      }

      return (0, _utils.parseNDigitsSigned)(token.length, dateString);
    }

    set(date, _flags, value) {
      date.setFullYear(value, 0, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }

    incompatibleTokens = ['G', 'y', 'Y', 'R', 'w', 'I', 'i', 'e', 'c', 't', 'T'];
  };
  ExtendedYearParser.ExtendedYearParser = ExtendedYearParser$1;
  return ExtendedYearParser;
}

var QuarterParser = {};

var hasRequiredQuarterParser;

function requireQuarterParser() {
  if (hasRequiredQuarterParser) return QuarterParser;
  hasRequiredQuarterParser = 1;
  QuarterParser.QuarterParser = void 0;
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  let QuarterParser$1 = class QuarterParser extends _Parser.Parser {
    priority = 120;

    parse(dateString, token, match) {
      switch (token) {
        // 1, 2, 3, 4
        case 'Q':
        case 'QQ': // 01, 02, 03, 04
          return (0, _utils.parseNDigits)(token.length, dateString);
        // 1st, 2nd, 3rd, 4th
        case 'Qo':
          return match.ordinalNumber(dateString, { unit: 'quarter' });
        // Q1, Q2, Q3, Q4
        case 'QQQ':
          return (
            match.quarter(dateString, {
              width: 'abbreviated',
              context: 'formatting',
            }) ||
            match.quarter(dateString, {
              width: 'narrow',
              context: 'formatting',
            })
          );

        // 1, 2, 3, 4 (narrow quarter; could be not numerical)
        case 'QQQQQ':
          return match.quarter(dateString, {
            width: 'narrow',
            context: 'formatting',
          });
        // 1st quarter, 2nd quarter, ...
        case 'QQQQ':
        default:
          return (
            match.quarter(dateString, {
              width: 'wide',
              context: 'formatting',
            }) ||
            match.quarter(dateString, {
              width: 'abbreviated',
              context: 'formatting',
            }) ||
            match.quarter(dateString, {
              width: 'narrow',
              context: 'formatting',
            })
          );
      }
    }

    validate(_date, value) {
      return value >= 1 && value <= 4;
    }

    set(date, _flags, value) {
      date.setMonth((value - 1) * 3, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }

    incompatibleTokens = ['Y', 'R', 'q', 'M', 'L', 'w', 'I', 'd', 'D', 'i', 'e', 'c', 't', 'T'];
  };
  QuarterParser.QuarterParser = QuarterParser$1;
  return QuarterParser;
}

var StandAloneQuarterParser = {};

var hasRequiredStandAloneQuarterParser;

function requireStandAloneQuarterParser() {
  if (hasRequiredStandAloneQuarterParser) return StandAloneQuarterParser;
  hasRequiredStandAloneQuarterParser = 1;
  StandAloneQuarterParser.StandAloneQuarterParser = void 0;
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  let StandAloneQuarterParser$1 = class StandAloneQuarterParser extends _Parser.Parser {
    priority = 120;

    parse(dateString, token, match) {
      switch (token) {
        // 1, 2, 3, 4
        case 'q':
        case 'qq': // 01, 02, 03, 04
          return (0, _utils.parseNDigits)(token.length, dateString);
        // 1st, 2nd, 3rd, 4th
        case 'qo':
          return match.ordinalNumber(dateString, { unit: 'quarter' });
        // Q1, Q2, Q3, Q4
        case 'qqq':
          return (
            match.quarter(dateString, {
              width: 'abbreviated',
              context: 'standalone',
            }) ||
            match.quarter(dateString, {
              width: 'narrow',
              context: 'standalone',
            })
          );

        // 1, 2, 3, 4 (narrow quarter; could be not numerical)
        case 'qqqqq':
          return match.quarter(dateString, {
            width: 'narrow',
            context: 'standalone',
          });
        // 1st quarter, 2nd quarter, ...
        case 'qqqq':
        default:
          return (
            match.quarter(dateString, {
              width: 'wide',
              context: 'standalone',
            }) ||
            match.quarter(dateString, {
              width: 'abbreviated',
              context: 'standalone',
            }) ||
            match.quarter(dateString, {
              width: 'narrow',
              context: 'standalone',
            })
          );
      }
    }

    validate(_date, value) {
      return value >= 1 && value <= 4;
    }

    set(date, _flags, value) {
      date.setMonth((value - 1) * 3, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }

    incompatibleTokens = ['Y', 'R', 'Q', 'M', 'L', 'w', 'I', 'd', 'D', 'i', 'e', 'c', 't', 'T'];
  };
  StandAloneQuarterParser.StandAloneQuarterParser = StandAloneQuarterParser$1;
  return StandAloneQuarterParser;
}

var MonthParser = {};

var hasRequiredMonthParser;

function requireMonthParser() {
  if (hasRequiredMonthParser) return MonthParser;
  hasRequiredMonthParser = 1;
  MonthParser.MonthParser = void 0;
  var _constants = /*@__PURE__*/ requireConstants();
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  let MonthParser$1 = class MonthParser extends _Parser.Parser {
    incompatibleTokens = ['Y', 'R', 'q', 'Q', 'L', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T'];

    priority = 110;

    parse(dateString, token, match) {
      const valueCallback = value => value - 1;

      switch (token) {
        // 1, 2, ..., 12
        case 'M':
          return (0, _utils.mapValue)((0, _utils.parseNumericPattern)(_constants.numericPatterns.month, dateString), valueCallback);
        // 01, 02, ..., 12
        case 'MM':
          return (0, _utils.mapValue)((0, _utils.parseNDigits)(2, dateString), valueCallback);
        // 1st, 2nd, ..., 12th
        case 'Mo':
          return (0, _utils.mapValue)(
            match.ordinalNumber(dateString, {
              unit: 'month',
            }),
            valueCallback,
          );
        // Jan, Feb, ..., Dec
        case 'MMM':
          return (
            match.month(dateString, {
              width: 'abbreviated',
              context: 'formatting',
            }) || match.month(dateString, { width: 'narrow', context: 'formatting' })
          );

        // J, F, ..., D
        case 'MMMMM':
          return match.month(dateString, {
            width: 'narrow',
            context: 'formatting',
          });
        // January, February, ..., December
        case 'MMMM':
        default:
          return (
            match.month(dateString, { width: 'wide', context: 'formatting' }) ||
            match.month(dateString, {
              width: 'abbreviated',
              context: 'formatting',
            }) ||
            match.month(dateString, { width: 'narrow', context: 'formatting' })
          );
      }
    }

    validate(_date, value) {
      return value >= 0 && value <= 11;
    }

    set(date, _flags, value) {
      date.setMonth(value, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  };
  MonthParser.MonthParser = MonthParser$1;
  return MonthParser;
}

var StandAloneMonthParser = {};

var hasRequiredStandAloneMonthParser;

function requireStandAloneMonthParser() {
  if (hasRequiredStandAloneMonthParser) return StandAloneMonthParser;
  hasRequiredStandAloneMonthParser = 1;
  StandAloneMonthParser.StandAloneMonthParser = void 0;
  var _constants = /*@__PURE__*/ requireConstants();
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  let StandAloneMonthParser$1 = class StandAloneMonthParser extends _Parser.Parser {
    priority = 110;

    parse(dateString, token, match) {
      const valueCallback = value => value - 1;

      switch (token) {
        // 1, 2, ..., 12
        case 'L':
          return (0, _utils.mapValue)((0, _utils.parseNumericPattern)(_constants.numericPatterns.month, dateString), valueCallback);
        // 01, 02, ..., 12
        case 'LL':
          return (0, _utils.mapValue)((0, _utils.parseNDigits)(2, dateString), valueCallback);
        // 1st, 2nd, ..., 12th
        case 'Lo':
          return (0, _utils.mapValue)(
            match.ordinalNumber(dateString, {
              unit: 'month',
            }),
            valueCallback,
          );
        // Jan, Feb, ..., Dec
        case 'LLL':
          return (
            match.month(dateString, {
              width: 'abbreviated',
              context: 'standalone',
            }) || match.month(dateString, { width: 'narrow', context: 'standalone' })
          );

        // J, F, ..., D
        case 'LLLLL':
          return match.month(dateString, {
            width: 'narrow',
            context: 'standalone',
          });
        // January, February, ..., December
        case 'LLLL':
        default:
          return (
            match.month(dateString, { width: 'wide', context: 'standalone' }) ||
            match.month(dateString, {
              width: 'abbreviated',
              context: 'standalone',
            }) ||
            match.month(dateString, { width: 'narrow', context: 'standalone' })
          );
      }
    }

    validate(_date, value) {
      return value >= 0 && value <= 11;
    }

    set(date, _flags, value) {
      date.setMonth(value, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }

    incompatibleTokens = ['Y', 'R', 'q', 'Q', 'M', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T'];
  };
  StandAloneMonthParser.StandAloneMonthParser = StandAloneMonthParser$1;
  return StandAloneMonthParser;
}

var LocalWeekParser = {};

var setWeek = {};

var hasRequiredSetWeek;

function requireSetWeek() {
  if (hasRequiredSetWeek) return setWeek;
  hasRequiredSetWeek = 1;
  setWeek.setWeek = setWeek$1;
  var _index = /*@__PURE__*/ requireGetWeek();
  var _index2 = /*@__PURE__*/ requireToDate();

  /**
   * The {@link setWeek} function options.
   */

  /**
   * @name setWeek
   * @category Week Helpers
   * @summary Set the local week to the given date.
   *
   * @description
   * Set the local week to the given date, saving the weekday number.
   * The exact calculation depends on the values of
   * `options.weekStartsOn` (which is the index of the first day of the week)
   * and `options.firstWeekContainsDate` (which is the day of January, which is always in
   * the first week of the week-numbering year)
   *
   * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param week - The week of the new date
   * @param options - An object with options
   *
   * @returns The new date with the local week set
   *
   * @example
   * // Set the 1st week to 2 January 2005 with default options:
   * const result = setWeek(new Date(2005, 0, 2), 1)
   * //=> Sun Dec 26 2004 00:00:00
   *
   * @example
   * // Set the 1st week to 2 January 2005,
   * // if Monday is the first day of the week,
   * // and the first week of the year always contains 4 January:
   * const result = setWeek(new Date(2005, 0, 2), 1, {
   *   weekStartsOn: 1,
   *   firstWeekContainsDate: 4
   * })
   * //=> Sun Jan 4 2004 00:00:00
   */
  function setWeek$1(date, week, options) {
    const _date = (0, _index2.toDate)(date);
    const diff = (0, _index.getWeek)(_date, options) - week;
    _date.setDate(_date.getDate() - diff * 7);
    return _date;
  }
  return setWeek;
}

var hasRequiredLocalWeekParser;

function requireLocalWeekParser() {
  if (hasRequiredLocalWeekParser) return LocalWeekParser;
  hasRequiredLocalWeekParser = 1;
  LocalWeekParser.LocalWeekParser = void 0;
  var _index = /*@__PURE__*/ requireSetWeek();
  var _index2 = /*@__PURE__*/ requireStartOfWeek();
  var _constants = /*@__PURE__*/ requireConstants();
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  // Local week of year
  let LocalWeekParser$1 = class LocalWeekParser extends _Parser.Parser {
    priority = 100;

    parse(dateString, token, match) {
      switch (token) {
        case 'w':
          return (0, _utils.parseNumericPattern)(_constants.numericPatterns.week, dateString);
        case 'wo':
          return match.ordinalNumber(dateString, { unit: 'week' });
        default:
          return (0, _utils.parseNDigits)(token.length, dateString);
      }
    }

    validate(_date, value) {
      return value >= 1 && value <= 53;
    }

    set(date, _flags, value, options) {
      return (0, _index2.startOfWeek)((0, _index.setWeek)(date, value, options), options);
    }

    incompatibleTokens = ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'i', 't', 'T'];
  };
  LocalWeekParser.LocalWeekParser = LocalWeekParser$1;
  return LocalWeekParser;
}

var ISOWeekParser = {};

var setISOWeek = {};

var hasRequiredSetISOWeek;

function requireSetISOWeek() {
  if (hasRequiredSetISOWeek) return setISOWeek;
  hasRequiredSetISOWeek = 1;
  setISOWeek.setISOWeek = setISOWeek$1;
  var _index = /*@__PURE__*/ requireGetISOWeek();
  var _index2 = /*@__PURE__*/ requireToDate();

  /**
   * @name setISOWeek
   * @category ISO Week Helpers
   * @summary Set the ISO week to the given date.
   *
   * @description
   * Set the ISO week to the given date, saving the weekday number.
   *
   * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param week - The ISO week of the new date
   *
   * @returns The new date with the ISO week set
   *
   * @example
   * // Set the 53rd ISO week to 7 August 2004:
   * const result = setISOWeek(new Date(2004, 7, 7), 53)
   * //=> Sat Jan 01 2005 00:00:00
   */
  function setISOWeek$1(date, week) {
    const _date = (0, _index2.toDate)(date);
    const diff = (0, _index.getISOWeek)(_date) - week;
    _date.setDate(_date.getDate() - diff * 7);
    return _date;
  }
  return setISOWeek;
}

var hasRequiredISOWeekParser;

function requireISOWeekParser() {
  if (hasRequiredISOWeekParser) return ISOWeekParser;
  hasRequiredISOWeekParser = 1;
  ISOWeekParser.ISOWeekParser = void 0;
  var _index = /*@__PURE__*/ requireSetISOWeek();
  var _index2 = /*@__PURE__*/ requireStartOfISOWeek();
  var _constants = /*@__PURE__*/ requireConstants();
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  // ISO week of year
  let ISOWeekParser$1 = class ISOWeekParser extends _Parser.Parser {
    priority = 100;

    parse(dateString, token, match) {
      switch (token) {
        case 'I':
          return (0, _utils.parseNumericPattern)(_constants.numericPatterns.week, dateString);
        case 'Io':
          return match.ordinalNumber(dateString, { unit: 'week' });
        default:
          return (0, _utils.parseNDigits)(token.length, dateString);
      }
    }

    validate(_date, value) {
      return value >= 1 && value <= 53;
    }

    set(date, _flags, value) {
      return (0, _index2.startOfISOWeek)((0, _index.setISOWeek)(date, value));
    }

    incompatibleTokens = ['y', 'Y', 'u', 'q', 'Q', 'M', 'L', 'w', 'd', 'D', 'e', 'c', 't', 'T'];
  };
  ISOWeekParser.ISOWeekParser = ISOWeekParser$1;
  return ISOWeekParser;
}

var DateParser = {};

var hasRequiredDateParser;

function requireDateParser() {
  if (hasRequiredDateParser) return DateParser;
  hasRequiredDateParser = 1;
  DateParser.DateParser = void 0;
  var _constants = /*@__PURE__*/ requireConstants();
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Day of the month
  let DateParser$1 = class DateParser extends _Parser.Parser {
    priority = 90;
    subPriority = 1;

    parse(dateString, token, match) {
      switch (token) {
        case 'd':
          return (0, _utils.parseNumericPattern)(_constants.numericPatterns.date, dateString);
        case 'do':
          return match.ordinalNumber(dateString, { unit: 'date' });
        default:
          return (0, _utils.parseNDigits)(token.length, dateString);
      }
    }

    validate(date, value) {
      const year = date.getFullYear();
      const isLeapYear = (0, _utils.isLeapYearIndex)(year);
      const month = date.getMonth();
      if (isLeapYear) {
        return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
      } else {
        return value >= 1 && value <= DAYS_IN_MONTH[month];
      }
    }

    set(date, _flags, value) {
      date.setDate(value);
      date.setHours(0, 0, 0, 0);
      return date;
    }

    incompatibleTokens = ['Y', 'R', 'q', 'Q', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T'];
  };
  DateParser.DateParser = DateParser$1;
  return DateParser;
}

var DayOfYearParser = {};

var hasRequiredDayOfYearParser;

function requireDayOfYearParser() {
  if (hasRequiredDayOfYearParser) return DayOfYearParser;
  hasRequiredDayOfYearParser = 1;
  DayOfYearParser.DayOfYearParser = void 0;
  var _constants = /*@__PURE__*/ requireConstants();
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  let DayOfYearParser$1 = class DayOfYearParser extends _Parser.Parser {
    priority = 90;

    subpriority = 1;

    parse(dateString, token, match) {
      switch (token) {
        case 'D':
        case 'DD':
          return (0, _utils.parseNumericPattern)(_constants.numericPatterns.dayOfYear, dateString);
        case 'Do':
          return match.ordinalNumber(dateString, { unit: 'date' });
        default:
          return (0, _utils.parseNDigits)(token.length, dateString);
      }
    }

    validate(date, value) {
      const year = date.getFullYear();
      const isLeapYear = (0, _utils.isLeapYearIndex)(year);
      if (isLeapYear) {
        return value >= 1 && value <= 366;
      } else {
        return value >= 1 && value <= 365;
      }
    }

    set(date, _flags, value) {
      date.setMonth(0, value);
      date.setHours(0, 0, 0, 0);
      return date;
    }

    incompatibleTokens = ['Y', 'R', 'q', 'Q', 'M', 'L', 'w', 'I', 'd', 'E', 'i', 'e', 'c', 't', 'T'];
  };
  DayOfYearParser.DayOfYearParser = DayOfYearParser$1;
  return DayOfYearParser;
}

var DayParser = {};

var setDay = {};

var hasRequiredSetDay;

function requireSetDay() {
  if (hasRequiredSetDay) return setDay;
  hasRequiredSetDay = 1;
  setDay.setDay = setDay$1;
  var _index = /*@__PURE__*/ requireAddDays();
  var _index2 = /*@__PURE__*/ requireToDate();

  var _index3 = /*@__PURE__*/ requireDefaultOptions();

  /**
   * The {@link setDay} function options.
   */

  /**
   * @name setDay
   * @category Weekday Helpers
   * @summary Set the day of the week to the given date.
   *
   * @description
   * Set the day of the week to the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param day - The day of the week of the new date
   * @param options - An object with options.
   *
   * @returns The new date with the day of the week set
   *
   * @example
   * // Set week day to Sunday, with the default weekStartsOn of Sunday:
   * const result = setDay(new Date(2014, 8, 1), 0)
   * //=> Sun Aug 31 2014 00:00:00
   *
   * @example
   * // Set week day to Sunday, with a weekStartsOn of Monday:
   * const result = setDay(new Date(2014, 8, 1), 0, { weekStartsOn: 1 })
   * //=> Sun Sep 07 2014 00:00:00
   */
  function setDay$1(date, day, options) {
    const defaultOptions = (0, _index3.getDefaultOptions)();
    const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions.weekStartsOn ?? defaultOptions.locale?.options?.weekStartsOn ?? 0;

    const _date = (0, _index2.toDate)(date);
    const currentDay = _date.getDay();

    const remainder = day % 7;
    const dayIndex = (remainder + 7) % 7;

    const delta = 7 - weekStartsOn;
    const diff = day < 0 || day > 6 ? day - ((currentDay + delta) % 7) : ((dayIndex + delta) % 7) - ((currentDay + delta) % 7);
    return (0, _index.addDays)(_date, diff);
  }
  return setDay;
}

var hasRequiredDayParser;

function requireDayParser() {
  if (hasRequiredDayParser) return DayParser;
  hasRequiredDayParser = 1;
  DayParser.DayParser = void 0;
  var _index = /*@__PURE__*/ requireSetDay();
  var _Parser = /*@__PURE__*/ requireParser();

  // Day of week
  let DayParser$1 = class DayParser extends _Parser.Parser {
    priority = 90;

    parse(dateString, token, match) {
      switch (token) {
        // Tue
        case 'E':
        case 'EE':
        case 'EEE':
          return (
            match.day(dateString, {
              width: 'abbreviated',
              context: 'formatting',
            }) ||
            match.day(dateString, { width: 'short', context: 'formatting' }) ||
            match.day(dateString, { width: 'narrow', context: 'formatting' })
          );

        // T
        case 'EEEEE':
          return match.day(dateString, {
            width: 'narrow',
            context: 'formatting',
          });
        // Tu
        case 'EEEEEE':
          return match.day(dateString, { width: 'short', context: 'formatting' }) || match.day(dateString, { width: 'narrow', context: 'formatting' });

        // Tuesday
        case 'EEEE':
        default:
          return (
            match.day(dateString, { width: 'wide', context: 'formatting' }) ||
            match.day(dateString, {
              width: 'abbreviated',
              context: 'formatting',
            }) ||
            match.day(dateString, { width: 'short', context: 'formatting' }) ||
            match.day(dateString, { width: 'narrow', context: 'formatting' })
          );
      }
    }

    validate(_date, value) {
      return value >= 0 && value <= 6;
    }

    set(date, _flags, value, options) {
      date = (0, _index.setDay)(date, value, options);
      date.setHours(0, 0, 0, 0);
      return date;
    }

    incompatibleTokens = ['D', 'i', 'e', 'c', 't', 'T'];
  };
  DayParser.DayParser = DayParser$1;
  return DayParser;
}

var LocalDayParser = {};

var hasRequiredLocalDayParser;

function requireLocalDayParser() {
  if (hasRequiredLocalDayParser) return LocalDayParser;
  hasRequiredLocalDayParser = 1;
  LocalDayParser.LocalDayParser = void 0;
  var _index = /*@__PURE__*/ requireSetDay();
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  // Local day of week
  let LocalDayParser$1 = class LocalDayParser extends _Parser.Parser {
    priority = 90;
    parse(dateString, token, match, options) {
      const valueCallback = value => {
        // We want here floor instead of trunc, so we get -7 for value 0 instead of 0
        const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
        return ((value + options.weekStartsOn + 6) % 7) + wholeWeekDays;
      };

      switch (token) {
        // 3
        case 'e':
        case 'ee': // 03
          return (0, _utils.mapValue)((0, _utils.parseNDigits)(token.length, dateString), valueCallback);
        // 3rd
        case 'eo':
          return (0, _utils.mapValue)(
            match.ordinalNumber(dateString, {
              unit: 'day',
            }),
            valueCallback,
          );
        // Tue
        case 'eee':
          return (
            match.day(dateString, {
              width: 'abbreviated',
              context: 'formatting',
            }) ||
            match.day(dateString, { width: 'short', context: 'formatting' }) ||
            match.day(dateString, { width: 'narrow', context: 'formatting' })
          );

        // T
        case 'eeeee':
          return match.day(dateString, {
            width: 'narrow',
            context: 'formatting',
          });
        // Tu
        case 'eeeeee':
          return match.day(dateString, { width: 'short', context: 'formatting' }) || match.day(dateString, { width: 'narrow', context: 'formatting' });

        // Tuesday
        case 'eeee':
        default:
          return (
            match.day(dateString, { width: 'wide', context: 'formatting' }) ||
            match.day(dateString, {
              width: 'abbreviated',
              context: 'formatting',
            }) ||
            match.day(dateString, { width: 'short', context: 'formatting' }) ||
            match.day(dateString, { width: 'narrow', context: 'formatting' })
          );
      }
    }

    validate(_date, value) {
      return value >= 0 && value <= 6;
    }

    set(date, _flags, value, options) {
      date = (0, _index.setDay)(date, value, options);
      date.setHours(0, 0, 0, 0);
      return date;
    }

    incompatibleTokens = ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'E', 'i', 'c', 't', 'T'];
  };
  LocalDayParser.LocalDayParser = LocalDayParser$1;
  return LocalDayParser;
}

var StandAloneLocalDayParser = {};

var hasRequiredStandAloneLocalDayParser;

function requireStandAloneLocalDayParser() {
  if (hasRequiredStandAloneLocalDayParser) return StandAloneLocalDayParser;
  hasRequiredStandAloneLocalDayParser = 1;
  StandAloneLocalDayParser.StandAloneLocalDayParser = void 0;
  var _index = /*@__PURE__*/ requireSetDay();
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  // Stand-alone local day of week
  let StandAloneLocalDayParser$1 = class StandAloneLocalDayParser extends _Parser.Parser {
    priority = 90;

    parse(dateString, token, match, options) {
      const valueCallback = value => {
        // We want here floor instead of trunc, so we get -7 for value 0 instead of 0
        const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
        return ((value + options.weekStartsOn + 6) % 7) + wholeWeekDays;
      };

      switch (token) {
        // 3
        case 'c':
        case 'cc': // 03
          return (0, _utils.mapValue)((0, _utils.parseNDigits)(token.length, dateString), valueCallback);
        // 3rd
        case 'co':
          return (0, _utils.mapValue)(
            match.ordinalNumber(dateString, {
              unit: 'day',
            }),
            valueCallback,
          );
        // Tue
        case 'ccc':
          return (
            match.day(dateString, {
              width: 'abbreviated',
              context: 'standalone',
            }) ||
            match.day(dateString, { width: 'short', context: 'standalone' }) ||
            match.day(dateString, { width: 'narrow', context: 'standalone' })
          );

        // T
        case 'ccccc':
          return match.day(dateString, {
            width: 'narrow',
            context: 'standalone',
          });
        // Tu
        case 'cccccc':
          return match.day(dateString, { width: 'short', context: 'standalone' }) || match.day(dateString, { width: 'narrow', context: 'standalone' });

        // Tuesday
        case 'cccc':
        default:
          return (
            match.day(dateString, { width: 'wide', context: 'standalone' }) ||
            match.day(dateString, {
              width: 'abbreviated',
              context: 'standalone',
            }) ||
            match.day(dateString, { width: 'short', context: 'standalone' }) ||
            match.day(dateString, { width: 'narrow', context: 'standalone' })
          );
      }
    }

    validate(_date, value) {
      return value >= 0 && value <= 6;
    }

    set(date, _flags, value, options) {
      date = (0, _index.setDay)(date, value, options);
      date.setHours(0, 0, 0, 0);
      return date;
    }

    incompatibleTokens = ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'E', 'i', 'e', 't', 'T'];
  };
  StandAloneLocalDayParser.StandAloneLocalDayParser = StandAloneLocalDayParser$1;
  return StandAloneLocalDayParser;
}

var ISODayParser = {};

var setISODay = {};

var hasRequiredSetISODay;

function requireSetISODay() {
  if (hasRequiredSetISODay) return setISODay;
  hasRequiredSetISODay = 1;
  setISODay.setISODay = setISODay$1;
  var _index = /*@__PURE__*/ requireAddDays();
  var _index2 = /*@__PURE__*/ requireGetISODay();
  var _index3 = /*@__PURE__*/ requireToDate();

  /**
   * @name setISODay
   * @category Weekday Helpers
   * @summary Set the day of the ISO week to the given date.
   *
   * @description
   * Set the day of the ISO week to the given date.
   * ISO week starts with Monday.
   * 7 is the index of Sunday, 1 is the index of Monday etc.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param day - The day of the ISO week of the new date
   *
   * @returns The new date with the day of the ISO week set
   *
   * @example
   * // Set Sunday to 1 September 2014:
   * const result = setISODay(new Date(2014, 8, 1), 7)
   * //=> Sun Sep 07 2014 00:00:00
   */
  function setISODay$1(date, day) {
    const _date = (0, _index3.toDate)(date);
    const currentDay = (0, _index2.getISODay)(_date);
    const diff = day - currentDay;
    return (0, _index.addDays)(_date, diff);
  }
  return setISODay;
}

var hasRequiredISODayParser;

function requireISODayParser() {
  if (hasRequiredISODayParser) return ISODayParser;
  hasRequiredISODayParser = 1;
  ISODayParser.ISODayParser = void 0;
  var _index = /*@__PURE__*/ requireSetISODay();
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  // ISO day of week
  let ISODayParser$1 = class ISODayParser extends _Parser.Parser {
    priority = 90;

    parse(dateString, token, match) {
      const valueCallback = value => {
        if (value === 0) {
          return 7;
        }
        return value;
      };

      switch (token) {
        // 2
        case 'i':
        case 'ii': // 02
          return (0, _utils.parseNDigits)(token.length, dateString);
        // 2nd
        case 'io':
          return match.ordinalNumber(dateString, { unit: 'day' });
        // Tue
        case 'iii':
          return (0, _utils.mapValue)(
            match.day(dateString, {
              width: 'abbreviated',
              context: 'formatting',
            }) ||
              match.day(dateString, {
                width: 'short',
                context: 'formatting',
              }) ||
              match.day(dateString, {
                width: 'narrow',
                context: 'formatting',
              }),
            valueCallback,
          );
        // T
        case 'iiiii':
          return (0, _utils.mapValue)(
            match.day(dateString, {
              width: 'narrow',
              context: 'formatting',
            }),
            valueCallback,
          );
        // Tu
        case 'iiiiii':
          return (0, _utils.mapValue)(
            match.day(dateString, {
              width: 'short',
              context: 'formatting',
            }) ||
              match.day(dateString, {
                width: 'narrow',
                context: 'formatting',
              }),
            valueCallback,
          );
        // Tuesday
        case 'iiii':
        default:
          return (0, _utils.mapValue)(
            match.day(dateString, {
              width: 'wide',
              context: 'formatting',
            }) ||
              match.day(dateString, {
                width: 'abbreviated',
                context: 'formatting',
              }) ||
              match.day(dateString, {
                width: 'short',
                context: 'formatting',
              }) ||
              match.day(dateString, {
                width: 'narrow',
                context: 'formatting',
              }),
            valueCallback,
          );
      }
    }

    validate(_date, value) {
      return value >= 1 && value <= 7;
    }

    set(date, _flags, value) {
      date = (0, _index.setISODay)(date, value);
      date.setHours(0, 0, 0, 0);
      return date;
    }

    incompatibleTokens = ['y', 'Y', 'u', 'q', 'Q', 'M', 'L', 'w', 'd', 'D', 'E', 'e', 'c', 't', 'T'];
  };
  ISODayParser.ISODayParser = ISODayParser$1;
  return ISODayParser;
}

var AMPMParser = {};

var hasRequiredAMPMParser;

function requireAMPMParser() {
  if (hasRequiredAMPMParser) return AMPMParser;
  hasRequiredAMPMParser = 1;
  AMPMParser.AMPMParser = void 0;
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  let AMPMParser$1 = class AMPMParser extends _Parser.Parser {
    priority = 80;

    parse(dateString, token, match) {
      switch (token) {
        case 'a':
        case 'aa':
        case 'aaa':
          return (
            match.dayPeriod(dateString, {
              width: 'abbreviated',
              context: 'formatting',
            }) ||
            match.dayPeriod(dateString, {
              width: 'narrow',
              context: 'formatting',
            })
          );

        case 'aaaaa':
          return match.dayPeriod(dateString, {
            width: 'narrow',
            context: 'formatting',
          });
        case 'aaaa':
        default:
          return (
            match.dayPeriod(dateString, {
              width: 'wide',
              context: 'formatting',
            }) ||
            match.dayPeriod(dateString, {
              width: 'abbreviated',
              context: 'formatting',
            }) ||
            match.dayPeriod(dateString, {
              width: 'narrow',
              context: 'formatting',
            })
          );
      }
    }

    set(date, _flags, value) {
      date.setHours((0, _utils.dayPeriodEnumToHours)(value), 0, 0, 0);
      return date;
    }

    incompatibleTokens = ['b', 'B', 'H', 'k', 't', 'T'];
  };
  AMPMParser.AMPMParser = AMPMParser$1;
  return AMPMParser;
}

var AMPMMidnightParser = {};

var hasRequiredAMPMMidnightParser;

function requireAMPMMidnightParser() {
  if (hasRequiredAMPMMidnightParser) return AMPMMidnightParser;
  hasRequiredAMPMMidnightParser = 1;
  AMPMMidnightParser.AMPMMidnightParser = void 0;
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  let AMPMMidnightParser$1 = class AMPMMidnightParser extends _Parser.Parser {
    priority = 80;

    parse(dateString, token, match) {
      switch (token) {
        case 'b':
        case 'bb':
        case 'bbb':
          return (
            match.dayPeriod(dateString, {
              width: 'abbreviated',
              context: 'formatting',
            }) ||
            match.dayPeriod(dateString, {
              width: 'narrow',
              context: 'formatting',
            })
          );

        case 'bbbbb':
          return match.dayPeriod(dateString, {
            width: 'narrow',
            context: 'formatting',
          });
        case 'bbbb':
        default:
          return (
            match.dayPeriod(dateString, {
              width: 'wide',
              context: 'formatting',
            }) ||
            match.dayPeriod(dateString, {
              width: 'abbreviated',
              context: 'formatting',
            }) ||
            match.dayPeriod(dateString, {
              width: 'narrow',
              context: 'formatting',
            })
          );
      }
    }

    set(date, _flags, value) {
      date.setHours((0, _utils.dayPeriodEnumToHours)(value), 0, 0, 0);
      return date;
    }

    incompatibleTokens = ['a', 'B', 'H', 'k', 't', 'T'];
  };
  AMPMMidnightParser.AMPMMidnightParser = AMPMMidnightParser$1;
  return AMPMMidnightParser;
}

var DayPeriodParser = {};

var hasRequiredDayPeriodParser;

function requireDayPeriodParser() {
  if (hasRequiredDayPeriodParser) return DayPeriodParser;
  hasRequiredDayPeriodParser = 1;
  DayPeriodParser.DayPeriodParser = void 0;
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  // in the morning, in the afternoon, in the evening, at night
  let DayPeriodParser$1 = class DayPeriodParser extends _Parser.Parser {
    priority = 80;

    parse(dateString, token, match) {
      switch (token) {
        case 'B':
        case 'BB':
        case 'BBB':
          return (
            match.dayPeriod(dateString, {
              width: 'abbreviated',
              context: 'formatting',
            }) ||
            match.dayPeriod(dateString, {
              width: 'narrow',
              context: 'formatting',
            })
          );

        case 'BBBBB':
          return match.dayPeriod(dateString, {
            width: 'narrow',
            context: 'formatting',
          });
        case 'BBBB':
        default:
          return (
            match.dayPeriod(dateString, {
              width: 'wide',
              context: 'formatting',
            }) ||
            match.dayPeriod(dateString, {
              width: 'abbreviated',
              context: 'formatting',
            }) ||
            match.dayPeriod(dateString, {
              width: 'narrow',
              context: 'formatting',
            })
          );
      }
    }

    set(date, _flags, value) {
      date.setHours((0, _utils.dayPeriodEnumToHours)(value), 0, 0, 0);
      return date;
    }

    incompatibleTokens = ['a', 'b', 't', 'T'];
  };
  DayPeriodParser.DayPeriodParser = DayPeriodParser$1;
  return DayPeriodParser;
}

var Hour1to12Parser = {};

var hasRequiredHour1to12Parser;

function requireHour1to12Parser() {
  if (hasRequiredHour1to12Parser) return Hour1to12Parser;
  hasRequiredHour1to12Parser = 1;
  Hour1to12Parser.Hour1to12Parser = void 0;
  var _constants = /*@__PURE__*/ requireConstants();
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  let Hour1to12Parser$1 = class Hour1to12Parser extends _Parser.Parser {
    priority = 70;

    parse(dateString, token, match) {
      switch (token) {
        case 'h':
          return (0, _utils.parseNumericPattern)(_constants.numericPatterns.hour12h, dateString);
        case 'ho':
          return match.ordinalNumber(dateString, { unit: 'hour' });
        default:
          return (0, _utils.parseNDigits)(token.length, dateString);
      }
    }

    validate(_date, value) {
      return value >= 1 && value <= 12;
    }

    set(date, _flags, value) {
      const isPM = date.getHours() >= 12;
      if (isPM && value < 12) {
        date.setHours(value + 12, 0, 0, 0);
      } else if (!isPM && value === 12) {
        date.setHours(0, 0, 0, 0);
      } else {
        date.setHours(value, 0, 0, 0);
      }
      return date;
    }

    incompatibleTokens = ['H', 'K', 'k', 't', 'T'];
  };
  Hour1to12Parser.Hour1to12Parser = Hour1to12Parser$1;
  return Hour1to12Parser;
}

var Hour0to23Parser = {};

var hasRequiredHour0to23Parser;

function requireHour0to23Parser() {
  if (hasRequiredHour0to23Parser) return Hour0to23Parser;
  hasRequiredHour0to23Parser = 1;
  Hour0to23Parser.Hour0to23Parser = void 0;
  var _constants = /*@__PURE__*/ requireConstants();
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  let Hour0to23Parser$1 = class Hour0to23Parser extends _Parser.Parser {
    priority = 70;

    parse(dateString, token, match) {
      switch (token) {
        case 'H':
          return (0, _utils.parseNumericPattern)(_constants.numericPatterns.hour23h, dateString);
        case 'Ho':
          return match.ordinalNumber(dateString, { unit: 'hour' });
        default:
          return (0, _utils.parseNDigits)(token.length, dateString);
      }
    }

    validate(_date, value) {
      return value >= 0 && value <= 23;
    }

    set(date, _flags, value) {
      date.setHours(value, 0, 0, 0);
      return date;
    }

    incompatibleTokens = ['a', 'b', 'h', 'K', 'k', 't', 'T'];
  };
  Hour0to23Parser.Hour0to23Parser = Hour0to23Parser$1;
  return Hour0to23Parser;
}

var Hour0To11Parser = {};

var hasRequiredHour0To11Parser;

function requireHour0To11Parser() {
  if (hasRequiredHour0To11Parser) return Hour0To11Parser;
  hasRequiredHour0To11Parser = 1;
  Hour0To11Parser.Hour0To11Parser = void 0;
  var _constants = /*@__PURE__*/ requireConstants();
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  let Hour0To11Parser$1 = class Hour0To11Parser extends _Parser.Parser {
    priority = 70;

    parse(dateString, token, match) {
      switch (token) {
        case 'K':
          return (0, _utils.parseNumericPattern)(_constants.numericPatterns.hour11h, dateString);
        case 'Ko':
          return match.ordinalNumber(dateString, { unit: 'hour' });
        default:
          return (0, _utils.parseNDigits)(token.length, dateString);
      }
    }

    validate(_date, value) {
      return value >= 0 && value <= 11;
    }

    set(date, _flags, value) {
      const isPM = date.getHours() >= 12;
      if (isPM && value < 12) {
        date.setHours(value + 12, 0, 0, 0);
      } else {
        date.setHours(value, 0, 0, 0);
      }
      return date;
    }

    incompatibleTokens = ['h', 'H', 'k', 't', 'T'];
  };
  Hour0To11Parser.Hour0To11Parser = Hour0To11Parser$1;
  return Hour0To11Parser;
}

var Hour1To24Parser = {};

var hasRequiredHour1To24Parser;

function requireHour1To24Parser() {
  if (hasRequiredHour1To24Parser) return Hour1To24Parser;
  hasRequiredHour1To24Parser = 1;
  Hour1To24Parser.Hour1To24Parser = void 0;
  var _constants = /*@__PURE__*/ requireConstants();
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  let Hour1To24Parser$1 = class Hour1To24Parser extends _Parser.Parser {
    priority = 70;

    parse(dateString, token, match) {
      switch (token) {
        case 'k':
          return (0, _utils.parseNumericPattern)(_constants.numericPatterns.hour24h, dateString);
        case 'ko':
          return match.ordinalNumber(dateString, { unit: 'hour' });
        default:
          return (0, _utils.parseNDigits)(token.length, dateString);
      }
    }

    validate(_date, value) {
      return value >= 1 && value <= 24;
    }

    set(date, _flags, value) {
      const hours = value <= 24 ? value % 24 : value;
      date.setHours(hours, 0, 0, 0);
      return date;
    }

    incompatibleTokens = ['a', 'b', 'h', 'H', 'K', 't', 'T'];
  };
  Hour1To24Parser.Hour1To24Parser = Hour1To24Parser$1;
  return Hour1To24Parser;
}

var MinuteParser = {};

var hasRequiredMinuteParser;

function requireMinuteParser() {
  if (hasRequiredMinuteParser) return MinuteParser;
  hasRequiredMinuteParser = 1;
  MinuteParser.MinuteParser = void 0;
  var _constants = /*@__PURE__*/ requireConstants();
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  let MinuteParser$1 = class MinuteParser extends _Parser.Parser {
    priority = 60;

    parse(dateString, token, match) {
      switch (token) {
        case 'm':
          return (0, _utils.parseNumericPattern)(_constants.numericPatterns.minute, dateString);
        case 'mo':
          return match.ordinalNumber(dateString, { unit: 'minute' });
        default:
          return (0, _utils.parseNDigits)(token.length, dateString);
      }
    }

    validate(_date, value) {
      return value >= 0 && value <= 59;
    }

    set(date, _flags, value) {
      date.setMinutes(value, 0, 0);
      return date;
    }

    incompatibleTokens = ['t', 'T'];
  };
  MinuteParser.MinuteParser = MinuteParser$1;
  return MinuteParser;
}

var SecondParser = {};

var hasRequiredSecondParser;

function requireSecondParser() {
  if (hasRequiredSecondParser) return SecondParser;
  hasRequiredSecondParser = 1;
  SecondParser.SecondParser = void 0;
  var _constants = /*@__PURE__*/ requireConstants();
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  let SecondParser$1 = class SecondParser extends _Parser.Parser {
    priority = 50;

    parse(dateString, token, match) {
      switch (token) {
        case 's':
          return (0, _utils.parseNumericPattern)(_constants.numericPatterns.second, dateString);
        case 'so':
          return match.ordinalNumber(dateString, { unit: 'second' });
        default:
          return (0, _utils.parseNDigits)(token.length, dateString);
      }
    }

    validate(_date, value) {
      return value >= 0 && value <= 59;
    }

    set(date, _flags, value) {
      date.setSeconds(value, 0);
      return date;
    }

    incompatibleTokens = ['t', 'T'];
  };
  SecondParser.SecondParser = SecondParser$1;
  return SecondParser;
}

var FractionOfSecondParser = {};

var hasRequiredFractionOfSecondParser;

function requireFractionOfSecondParser() {
  if (hasRequiredFractionOfSecondParser) return FractionOfSecondParser;
  hasRequiredFractionOfSecondParser = 1;
  FractionOfSecondParser.FractionOfSecondParser = void 0;
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  let FractionOfSecondParser$1 = class FractionOfSecondParser extends _Parser.Parser {
    priority = 30;

    parse(dateString, token) {
      const valueCallback = value => Math.trunc(value * Math.pow(10, -token.length + 3));
      return (0, _utils.mapValue)((0, _utils.parseNDigits)(token.length, dateString), valueCallback);
    }

    set(date, _flags, value) {
      date.setMilliseconds(value);
      return date;
    }

    incompatibleTokens = ['t', 'T'];
  };
  FractionOfSecondParser.FractionOfSecondParser = FractionOfSecondParser$1;
  return FractionOfSecondParser;
}

var ISOTimezoneWithZParser = {};

var hasRequiredISOTimezoneWithZParser;

function requireISOTimezoneWithZParser() {
  if (hasRequiredISOTimezoneWithZParser) return ISOTimezoneWithZParser;
  hasRequiredISOTimezoneWithZParser = 1;
  ISOTimezoneWithZParser.ISOTimezoneWithZParser = void 0;
  var _index = /*@__PURE__*/ requireConstructFrom();
  var _index2 = /*@__PURE__*/ requireGetTimezoneOffsetInMilliseconds();
  var _constants = /*@__PURE__*/ requireConstants();
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  // Timezone (ISO-8601. +00:00 is `'Z'`)
  let ISOTimezoneWithZParser$1 = class ISOTimezoneWithZParser extends _Parser.Parser {
    priority = 10;

    parse(dateString, token) {
      switch (token) {
        case 'X':
          return (0, _utils.parseTimezonePattern)(_constants.timezonePatterns.basicOptionalMinutes, dateString);
        case 'XX':
          return (0, _utils.parseTimezonePattern)(_constants.timezonePatterns.basic, dateString);
        case 'XXXX':
          return (0, _utils.parseTimezonePattern)(_constants.timezonePatterns.basicOptionalSeconds, dateString);
        case 'XXXXX':
          return (0, _utils.parseTimezonePattern)(_constants.timezonePatterns.extendedOptionalSeconds, dateString);
        case 'XXX':
        default:
          return (0, _utils.parseTimezonePattern)(_constants.timezonePatterns.extended, dateString);
      }
    }

    set(date, flags, value) {
      if (flags.timestampIsSet) return date;
      return (0, _index.constructFrom)(date, date.getTime() - (0, _index2.getTimezoneOffsetInMilliseconds)(date) - value);
    }

    incompatibleTokens = ['t', 'T', 'x'];
  };
  ISOTimezoneWithZParser.ISOTimezoneWithZParser = ISOTimezoneWithZParser$1;
  return ISOTimezoneWithZParser;
}

var ISOTimezoneParser = {};

var hasRequiredISOTimezoneParser;

function requireISOTimezoneParser() {
  if (hasRequiredISOTimezoneParser) return ISOTimezoneParser;
  hasRequiredISOTimezoneParser = 1;
  ISOTimezoneParser.ISOTimezoneParser = void 0;
  var _index = /*@__PURE__*/ requireConstructFrom();
  var _index2 = /*@__PURE__*/ requireGetTimezoneOffsetInMilliseconds();
  var _constants = /*@__PURE__*/ requireConstants();
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  // Timezone (ISO-8601)
  let ISOTimezoneParser$1 = class ISOTimezoneParser extends _Parser.Parser {
    priority = 10;

    parse(dateString, token) {
      switch (token) {
        case 'x':
          return (0, _utils.parseTimezonePattern)(_constants.timezonePatterns.basicOptionalMinutes, dateString);
        case 'xx':
          return (0, _utils.parseTimezonePattern)(_constants.timezonePatterns.basic, dateString);
        case 'xxxx':
          return (0, _utils.parseTimezonePattern)(_constants.timezonePatterns.basicOptionalSeconds, dateString);
        case 'xxxxx':
          return (0, _utils.parseTimezonePattern)(_constants.timezonePatterns.extendedOptionalSeconds, dateString);
        case 'xxx':
        default:
          return (0, _utils.parseTimezonePattern)(_constants.timezonePatterns.extended, dateString);
      }
    }

    set(date, flags, value) {
      if (flags.timestampIsSet) return date;
      return (0, _index.constructFrom)(date, date.getTime() - (0, _index2.getTimezoneOffsetInMilliseconds)(date) - value);
    }

    incompatibleTokens = ['t', 'T', 'X'];
  };
  ISOTimezoneParser.ISOTimezoneParser = ISOTimezoneParser$1;
  return ISOTimezoneParser;
}

var TimestampSecondsParser = {};

var hasRequiredTimestampSecondsParser;

function requireTimestampSecondsParser() {
  if (hasRequiredTimestampSecondsParser) return TimestampSecondsParser;
  hasRequiredTimestampSecondsParser = 1;
  TimestampSecondsParser.TimestampSecondsParser = void 0;
  var _index = /*@__PURE__*/ requireConstructFrom();
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  let TimestampSecondsParser$1 = class TimestampSecondsParser extends _Parser.Parser {
    priority = 40;

    parse(dateString) {
      return (0, _utils.parseAnyDigitsSigned)(dateString);
    }

    set(date, _flags, value) {
      return [(0, _index.constructFrom)(date, value * 1000), { timestampIsSet: true }];
    }

    incompatibleTokens = '*';
  };
  TimestampSecondsParser.TimestampSecondsParser = TimestampSecondsParser$1;
  return TimestampSecondsParser;
}

var TimestampMillisecondsParser = {};

var hasRequiredTimestampMillisecondsParser;

function requireTimestampMillisecondsParser() {
  if (hasRequiredTimestampMillisecondsParser) return TimestampMillisecondsParser;
  hasRequiredTimestampMillisecondsParser = 1;
  TimestampMillisecondsParser.TimestampMillisecondsParser = void 0;
  var _index = /*@__PURE__*/ requireConstructFrom();
  var _Parser = /*@__PURE__*/ requireParser();

  var _utils = /*@__PURE__*/ requireUtils();

  let TimestampMillisecondsParser$1 = class TimestampMillisecondsParser extends _Parser.Parser {
    priority = 20;

    parse(dateString) {
      return (0, _utils.parseAnyDigitsSigned)(dateString);
    }

    set(date, _flags, value) {
      return [(0, _index.constructFrom)(date, value), { timestampIsSet: true }];
    }

    incompatibleTokens = '*';
  };
  TimestampMillisecondsParser.TimestampMillisecondsParser = TimestampMillisecondsParser$1;
  return TimestampMillisecondsParser;
}

var hasRequiredParsers;

function requireParsers() {
  if (hasRequiredParsers) return parsers;
  hasRequiredParsers = 1;
  parsers.parsers = void 0;
  var _EraParser = /*@__PURE__*/ requireEraParser();
  var _YearParser = /*@__PURE__*/ requireYearParser();
  var _LocalWeekYearParser = /*@__PURE__*/ requireLocalWeekYearParser();
  var _ISOWeekYearParser = /*@__PURE__*/ requireISOWeekYearParser();
  var _ExtendedYearParser = /*@__PURE__*/ requireExtendedYearParser();
  var _QuarterParser = /*@__PURE__*/ requireQuarterParser();
  var _StandAloneQuarterParser = /*@__PURE__*/ requireStandAloneQuarterParser();
  var _MonthParser = /*@__PURE__*/ requireMonthParser();
  var _StandAloneMonthParser = /*@__PURE__*/ requireStandAloneMonthParser();
  var _LocalWeekParser = /*@__PURE__*/ requireLocalWeekParser();
  var _ISOWeekParser = /*@__PURE__*/ requireISOWeekParser();
  var _DateParser = /*@__PURE__*/ requireDateParser();
  var _DayOfYearParser = /*@__PURE__*/ requireDayOfYearParser();
  var _DayParser = /*@__PURE__*/ requireDayParser();
  var _LocalDayParser = /*@__PURE__*/ requireLocalDayParser();
  var _StandAloneLocalDayParser = /*@__PURE__*/ requireStandAloneLocalDayParser();
  var _ISODayParser = /*@__PURE__*/ requireISODayParser();
  var _AMPMParser = /*@__PURE__*/ requireAMPMParser();
  var _AMPMMidnightParser = /*@__PURE__*/ requireAMPMMidnightParser();
  var _DayPeriodParser = /*@__PURE__*/ requireDayPeriodParser();
  var _Hour1to12Parser = /*@__PURE__*/ requireHour1to12Parser();
  var _Hour0to23Parser = /*@__PURE__*/ requireHour0to23Parser();
  var _Hour0To11Parser = /*@__PURE__*/ requireHour0To11Parser();
  var _Hour1To24Parser = /*@__PURE__*/ requireHour1To24Parser();
  var _MinuteParser = /*@__PURE__*/ requireMinuteParser();
  var _SecondParser = /*@__PURE__*/ requireSecondParser();
  var _FractionOfSecondParser = /*@__PURE__*/ requireFractionOfSecondParser();
  var _ISOTimezoneWithZParser = /*@__PURE__*/ requireISOTimezoneWithZParser();
  var _ISOTimezoneParser = /*@__PURE__*/ requireISOTimezoneParser();
  var _TimestampSecondsParser = /*@__PURE__*/ requireTimestampSecondsParser();
  var _TimestampMillisecondsParser = /*@__PURE__*/ requireTimestampMillisecondsParser();

  /*
   * |     | Unit                           |     | Unit                           |
   * |-----|--------------------------------|-----|--------------------------------|
   * |  a  | AM, PM                         |  A* | Milliseconds in day            |
   * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
   * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
   * |  d  | Day of month                   |  D  | Day of year                    |
   * |  e  | Local day of week              |  E  | Day of week                    |
   * |  f  |                                |  F* | Day of week in month           |
   * |  g* | Modified Julian day            |  G  | Era                            |
   * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
   * |  i! | ISO day of week                |  I! | ISO week of year               |
   * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
   * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
   * |  l* | (deprecated)                   |  L  | Stand-alone month              |
   * |  m  | Minute                         |  M  | Month                          |
   * |  n  |                                |  N  |                                |
   * |  o! | Ordinal number modifier        |  O* | Timezone (GMT)                 |
   * |  p  |                                |  P  |                                |
   * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
   * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
   * |  s  | Second                         |  S  | Fraction of second             |
   * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
   * |  u  | Extended year                  |  U* | Cyclic year                    |
   * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
   * |  w  | Local week of year             |  W* | Week of month                  |
   * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
   * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
   * |  z* | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
   *
   * Letters marked by * are not implemented but reserved by Unicode standard.
   *
   * Letters marked by ! are non-standard, but implemented by date-fns:
   * - `o` modifies the previous token to turn it into an ordinal (see `parse` docs)
   * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
   *   i.e. 7 for Sunday, 1 for Monday, etc.
   * - `I` is ISO week of year, as opposed to `w` which is local week of year.
   * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
   *   `R` is supposed to be used in conjunction with `I` and `i`
   *   for universal ISO week-numbering date, whereas
   *   `Y` is supposed to be used in conjunction with `w` and `e`
   *   for week-numbering date specific to the locale.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- It's ok, we want any here
  parsers.parsers = {
    G: new _EraParser.EraParser(),
    y: new _YearParser.YearParser(),
    Y: new _LocalWeekYearParser.LocalWeekYearParser(),
    R: new _ISOWeekYearParser.ISOWeekYearParser(),
    u: new _ExtendedYearParser.ExtendedYearParser(),
    Q: new _QuarterParser.QuarterParser(),
    q: new _StandAloneQuarterParser.StandAloneQuarterParser(),
    M: new _MonthParser.MonthParser(),
    L: new _StandAloneMonthParser.StandAloneMonthParser(),
    w: new _LocalWeekParser.LocalWeekParser(),
    I: new _ISOWeekParser.ISOWeekParser(),
    d: new _DateParser.DateParser(),
    D: new _DayOfYearParser.DayOfYearParser(),
    E: new _DayParser.DayParser(),
    e: new _LocalDayParser.LocalDayParser(),
    c: new _StandAloneLocalDayParser.StandAloneLocalDayParser(),
    i: new _ISODayParser.ISODayParser(),
    a: new _AMPMParser.AMPMParser(),
    b: new _AMPMMidnightParser.AMPMMidnightParser(),
    B: new _DayPeriodParser.DayPeriodParser(),
    h: new _Hour1to12Parser.Hour1to12Parser(),
    H: new _Hour0to23Parser.Hour0to23Parser(),
    K: new _Hour0To11Parser.Hour0To11Parser(),
    k: new _Hour1To24Parser.Hour1To24Parser(),
    m: new _MinuteParser.MinuteParser(),
    s: new _SecondParser.SecondParser(),
    S: new _FractionOfSecondParser.FractionOfSecondParser(),
    X: new _ISOTimezoneWithZParser.ISOTimezoneWithZParser(),
    x: new _ISOTimezoneParser.ISOTimezoneParser(),
    t: new _TimestampSecondsParser.TimestampSecondsParser(),
    T: new _TimestampMillisecondsParser.TimestampMillisecondsParser(),
  };
  return parsers;
}

var hasRequiredParse;

function requireParse() {
  if (hasRequiredParse) return parse;
  hasRequiredParse = 1;
  (function (exports) {
    Object.defineProperty(exports, 'longFormatters', {
      enumerable: true,
      get: function () {
        return _index5.longFormatters;
      },
    });
    exports.parse = parse;
    Object.defineProperty(exports, 'parsers', {
      enumerable: true,
      get: function () {
        return _index7.parsers;
      },
    });
    var _index = /*@__PURE__*/ requireConstructFrom();
    var _index2 = /*@__PURE__*/ requireGetDefaultOptions();
    var _index3 = /*@__PURE__*/ requireDefaultLocale();
    var _index4 = /*@__PURE__*/ requireToDate();

    var _index5 = /*@__PURE__*/ requireLongFormatters();
    var _index6 = /*@__PURE__*/ requireProtectedTokens();

    var _index7 = /*@__PURE__*/ requireParsers();

    var _Setter = /*@__PURE__*/ requireSetter();

    // Rexports of internal for libraries to use.
    // See: https://github.com/date-fns/date-fns/issues/3638#issuecomment-1877082874

    /**
     * The {@link parse} function options.
     */

    // This RegExp consists of three parts separated by `|`:
    // - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
    //   (one of the certain letters followed by `o`)
    // - (\w)\1* matches any sequences of the same letter
    // - '' matches two quote characters in a row
    // - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
    //   except a single quote symbol, which ends the sequence.
    //   Two quote characters do not end the sequence.
    //   If there is no matching single quote
    //   then the sequence will continue until the end of the string.
    // - . matches any single character unmatched by previous parts of the RegExps
    const formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

    // This RegExp catches symbols escaped by quotes, and also
    // sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
    const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

    const escapedStringRegExp = /^'([^]*?)'?$/;
    const doubleQuoteRegExp = /''/g;

    const notWhitespaceRegExp = /\S/;
    const unescapedLatinCharacterRegExp = /[a-zA-Z]/;

    /**
     * @name parse
     * @category Common Helpers
     * @summary Parse the date.
     *
     * @description
     * Return the date parsed from string using the given format string.
     *
     * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
     * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     *
     * The characters in the format string wrapped between two single quotes characters (') are escaped.
     * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
     *
     * Format of the format string is based on Unicode Technical Standard #35:
     * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
     * with a few additions (see note 5 below the table).
     *
     * Not all tokens are compatible. Combinations that don't make sense or could lead to bugs are prohibited
     * and will throw `RangeError`. For example usage of 24-hour format token with AM/PM token will throw an exception:
     *
     * ```javascript
     * parse('23 AM', 'HH a', new Date())
     * //=> RangeError: The format string mustn't contain `HH` and `a` at the same time
     * ```
     *
     * See the compatibility table: https://docs.google.com/spreadsheets/d/e/2PACX-1vQOPU3xUhplll6dyoMmVUXHKl_8CRDs6_ueLmex3SoqwhuolkuN3O05l4rqx5h1dKX8eb46Ul-CCSrq/pubhtml?gid=0&single=true
     *
     * Accepted format string patterns:
     * | Unit                            |Prior| Pattern | Result examples                   | Notes |
     * |---------------------------------|-----|---------|-----------------------------------|-------|
     * | Era                             | 140 | G..GGG  | AD, BC                            |       |
     * |                                 |     | GGGG    | Anno Domini, Before Christ        | 2     |
     * |                                 |     | GGGGG   | A, B                              |       |
     * | Calendar year                   | 130 | y       | 44, 1, 1900, 2017, 9999           | 4     |
     * |                                 |     | yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
     * |                                 |     | yy      | 44, 01, 00, 17                    | 4     |
     * |                                 |     | yyy     | 044, 001, 123, 999                | 4     |
     * |                                 |     | yyyy    | 0044, 0001, 1900, 2017            | 4     |
     * |                                 |     | yyyyy   | ...                               | 2,4   |
     * | Local week-numbering year       | 130 | Y       | 44, 1, 1900, 2017, 9000           | 4     |
     * |                                 |     | Yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
     * |                                 |     | YY      | 44, 01, 00, 17                    | 4,6   |
     * |                                 |     | YYY     | 044, 001, 123, 999                | 4     |
     * |                                 |     | YYYY    | 0044, 0001, 1900, 2017            | 4,6   |
     * |                                 |     | YYYYY   | ...                               | 2,4   |
     * | ISO week-numbering year         | 130 | R       | -43, 1, 1900, 2017, 9999, -9999   | 4,5   |
     * |                                 |     | RR      | -43, 01, 00, 17                   | 4,5   |
     * |                                 |     | RRR     | -043, 001, 123, 999, -999         | 4,5   |
     * |                                 |     | RRRR    | -0043, 0001, 2017, 9999, -9999    | 4,5   |
     * |                                 |     | RRRRR   | ...                               | 2,4,5 |
     * | Extended year                   | 130 | u       | -43, 1, 1900, 2017, 9999, -999    | 4     |
     * |                                 |     | uu      | -43, 01, 99, -99                  | 4     |
     * |                                 |     | uuu     | -043, 001, 123, 999, -999         | 4     |
     * |                                 |     | uuuu    | -0043, 0001, 2017, 9999, -9999    | 4     |
     * |                                 |     | uuuuu   | ...                               | 2,4   |
     * | Quarter (formatting)            | 120 | Q       | 1, 2, 3, 4                        |       |
     * |                                 |     | Qo      | 1st, 2nd, 3rd, 4th                | 5     |
     * |                                 |     | QQ      | 01, 02, 03, 04                    |       |
     * |                                 |     | QQQ     | Q1, Q2, Q3, Q4                    |       |
     * |                                 |     | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
     * |                                 |     | QQQQQ   | 1, 2, 3, 4                        | 4     |
     * | Quarter (stand-alone)           | 120 | q       | 1, 2, 3, 4                        |       |
     * |                                 |     | qo      | 1st, 2nd, 3rd, 4th                | 5     |
     * |                                 |     | qq      | 01, 02, 03, 04                    |       |
     * |                                 |     | qqq     | Q1, Q2, Q3, Q4                    |       |
     * |                                 |     | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
     * |                                 |     | qqqqq   | 1, 2, 3, 4                        | 3     |
     * | Month (formatting)              | 110 | M       | 1, 2, ..., 12                     |       |
     * |                                 |     | Mo      | 1st, 2nd, ..., 12th               | 5     |
     * |                                 |     | MM      | 01, 02, ..., 12                   |       |
     * |                                 |     | MMM     | Jan, Feb, ..., Dec                |       |
     * |                                 |     | MMMM    | January, February, ..., December  | 2     |
     * |                                 |     | MMMMM   | J, F, ..., D                      |       |
     * | Month (stand-alone)             | 110 | L       | 1, 2, ..., 12                     |       |
     * |                                 |     | Lo      | 1st, 2nd, ..., 12th               | 5     |
     * |                                 |     | LL      | 01, 02, ..., 12                   |       |
     * |                                 |     | LLL     | Jan, Feb, ..., Dec                |       |
     * |                                 |     | LLLL    | January, February, ..., December  | 2     |
     * |                                 |     | LLLLL   | J, F, ..., D                      |       |
     * | Local week of year              | 100 | w       | 1, 2, ..., 53                     |       |
     * |                                 |     | wo      | 1st, 2nd, ..., 53th               | 5     |
     * |                                 |     | ww      | 01, 02, ..., 53                   |       |
     * | ISO week of year                | 100 | I       | 1, 2, ..., 53                     | 5     |
     * |                                 |     | Io      | 1st, 2nd, ..., 53th               | 5     |
     * |                                 |     | II      | 01, 02, ..., 53                   | 5     |
     * | Day of month                    |  90 | d       | 1, 2, ..., 31                     |       |
     * |                                 |     | do      | 1st, 2nd, ..., 31st               | 5     |
     * |                                 |     | dd      | 01, 02, ..., 31                   |       |
     * | Day of year                     |  90 | D       | 1, 2, ..., 365, 366               | 7     |
     * |                                 |     | Do      | 1st, 2nd, ..., 365th, 366th       | 5     |
     * |                                 |     | DD      | 01, 02, ..., 365, 366             | 7     |
     * |                                 |     | DDD     | 001, 002, ..., 365, 366           |       |
     * |                                 |     | DDDD    | ...                               | 2     |
     * | Day of week (formatting)        |  90 | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
     * |                                 |     | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
     * |                                 |     | EEEEE   | M, T, W, T, F, S, S               |       |
     * |                                 |     | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
     * | ISO day of week (formatting)    |  90 | i       | 1, 2, 3, ..., 7                   | 5     |
     * |                                 |     | io      | 1st, 2nd, ..., 7th                | 5     |
     * |                                 |     | ii      | 01, 02, ..., 07                   | 5     |
     * |                                 |     | iii     | Mon, Tue, Wed, ..., Sun           | 5     |
     * |                                 |     | iiii    | Monday, Tuesday, ..., Sunday      | 2,5   |
     * |                                 |     | iiiii   | M, T, W, T, F, S, S               | 5     |
     * |                                 |     | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 5     |
     * | Local day of week (formatting)  |  90 | e       | 2, 3, 4, ..., 1                   |       |
     * |                                 |     | eo      | 2nd, 3rd, ..., 1st                | 5     |
     * |                                 |     | ee      | 02, 03, ..., 01                   |       |
     * |                                 |     | eee     | Mon, Tue, Wed, ..., Sun           |       |
     * |                                 |     | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
     * |                                 |     | eeeee   | M, T, W, T, F, S, S               |       |
     * |                                 |     | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
     * | Local day of week (stand-alone) |  90 | c       | 2, 3, 4, ..., 1                   |       |
     * |                                 |     | co      | 2nd, 3rd, ..., 1st                | 5     |
     * |                                 |     | cc      | 02, 03, ..., 01                   |       |
     * |                                 |     | ccc     | Mon, Tue, Wed, ..., Sun           |       |
     * |                                 |     | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
     * |                                 |     | ccccc   | M, T, W, T, F, S, S               |       |
     * |                                 |     | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
     * | AM, PM                          |  80 | a..aaa  | AM, PM                            |       |
     * |                                 |     | aaaa    | a.m., p.m.                        | 2     |
     * |                                 |     | aaaaa   | a, p                              |       |
     * | AM, PM, noon, midnight          |  80 | b..bbb  | AM, PM, noon, midnight            |       |
     * |                                 |     | bbbb    | a.m., p.m., noon, midnight        | 2     |
     * |                                 |     | bbbbb   | a, p, n, mi                       |       |
     * | Flexible day period             |  80 | B..BBB  | at night, in the morning, ...     |       |
     * |                                 |     | BBBB    | at night, in the morning, ...     | 2     |
     * |                                 |     | BBBBB   | at night, in the morning, ...     |       |
     * | Hour [1-12]                     |  70 | h       | 1, 2, ..., 11, 12                 |       |
     * |                                 |     | ho      | 1st, 2nd, ..., 11th, 12th         | 5     |
     * |                                 |     | hh      | 01, 02, ..., 11, 12               |       |
     * | Hour [0-23]                     |  70 | H       | 0, 1, 2, ..., 23                  |       |
     * |                                 |     | Ho      | 0th, 1st, 2nd, ..., 23rd          | 5     |
     * |                                 |     | HH      | 00, 01, 02, ..., 23               |       |
     * | Hour [0-11]                     |  70 | K       | 1, 2, ..., 11, 0                  |       |
     * |                                 |     | Ko      | 1st, 2nd, ..., 11th, 0th          | 5     |
     * |                                 |     | KK      | 01, 02, ..., 11, 00               |       |
     * | Hour [1-24]                     |  70 | k       | 24, 1, 2, ..., 23                 |       |
     * |                                 |     | ko      | 24th, 1st, 2nd, ..., 23rd         | 5     |
     * |                                 |     | kk      | 24, 01, 02, ..., 23               |       |
     * | Minute                          |  60 | m       | 0, 1, ..., 59                     |       |
     * |                                 |     | mo      | 0th, 1st, ..., 59th               | 5     |
     * |                                 |     | mm      | 00, 01, ..., 59                   |       |
     * | Second                          |  50 | s       | 0, 1, ..., 59                     |       |
     * |                                 |     | so      | 0th, 1st, ..., 59th               | 5     |
     * |                                 |     | ss      | 00, 01, ..., 59                   |       |
     * | Seconds timestamp               |  40 | t       | 512969520                         |       |
     * |                                 |     | tt      | ...                               | 2     |
     * | Fraction of second              |  30 | S       | 0, 1, ..., 9                      |       |
     * |                                 |     | SS      | 00, 01, ..., 99                   |       |
     * |                                 |     | SSS     | 000, 001, ..., 999                |       |
     * |                                 |     | SSSS    | ...                               | 2     |
     * | Milliseconds timestamp          |  20 | T       | 512969520900                      |       |
     * |                                 |     | TT      | ...                               | 2     |
     * | Timezone (ISO-8601 w/ Z)        |  10 | X       | -08, +0530, Z                     |       |
     * |                                 |     | XX      | -0800, +0530, Z                   |       |
     * |                                 |     | XXX     | -08:00, +05:30, Z                 |       |
     * |                                 |     | XXXX    | -0800, +0530, Z, +123456          | 2     |
     * |                                 |     | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
     * | Timezone (ISO-8601 w/o Z)       |  10 | x       | -08, +0530, +00                   |       |
     * |                                 |     | xx      | -0800, +0530, +0000               |       |
     * |                                 |     | xxx     | -08:00, +05:30, +00:00            | 2     |
     * |                                 |     | xxxx    | -0800, +0530, +0000, +123456      |       |
     * |                                 |     | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
     * | Long localized date             |  NA | P       | 05/29/1453                        | 5,8   |
     * |                                 |     | PP      | May 29, 1453                      |       |
     * |                                 |     | PPP     | May 29th, 1453                    |       |
     * |                                 |     | PPPP    | Sunday, May 29th, 1453            | 2,5,8 |
     * | Long localized time             |  NA | p       | 12:00 AM                          | 5,8   |
     * |                                 |     | pp      | 12:00:00 AM                       |       |
     * | Combination of date and time    |  NA | Pp      | 05/29/1453, 12:00 AM              |       |
     * |                                 |     | PPpp    | May 29, 1453, 12:00:00 AM         |       |
     * |                                 |     | PPPpp   | May 29th, 1453 at ...             |       |
     * |                                 |     | PPPPpp  | Sunday, May 29th, 1453 at ...     | 2,5,8 |
     * Notes:
     * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
     *    are the same as "stand-alone" units, but are different in some languages.
     *    "Formatting" units are declined according to the rules of the language
     *    in the context of a date. "Stand-alone" units are always nominative singular.
     *    In `format` function, they will produce different result:
     *
     *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
     *
     *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
     *
     *    `parse` will try to match both formatting and stand-alone units interchangably.
     *
     * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
     *    the single quote characters (see below).
     *    If the sequence is longer than listed in table:
     *    - for numerical units (`yyyyyyyy`) `parse` will try to match a number
     *      as wide as the sequence
     *    - for text units (`MMMMMMMM`) `parse` will try to match the widest variation of the unit.
     *      These variations are marked with "2" in the last column of the table.
     *
     * 3. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
     *    These tokens represent the shortest form of the quarter.
     *
     * 4. The main difference between `y` and `u` patterns are B.C. years:
     *
     *    | Year | `y` | `u` |
     *    |------|-----|-----|
     *    | AC 1 |   1 |   1 |
     *    | BC 1 |   1 |   0 |
     *    | BC 2 |   2 |  -1 |
     *
     *    Also `yy` will try to guess the century of two digit year by proximity with `referenceDate`:
     *
     *    `parse('50', 'yy', new Date(2018, 0, 1)) //=> Sat Jan 01 2050 00:00:00`
     *
     *    `parse('75', 'yy', new Date(2018, 0, 1)) //=> Wed Jan 01 1975 00:00:00`
     *
     *    while `uu` will just assign the year as is:
     *
     *    `parse('50', 'uu', new Date(2018, 0, 1)) //=> Sat Jan 01 0050 00:00:00`
     *
     *    `parse('75', 'uu', new Date(2018, 0, 1)) //=> Tue Jan 01 0075 00:00:00`
     *
     *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
     *    except local week-numbering years are dependent on `options.weekStartsOn`
     *    and `options.firstWeekContainsDate` (compare [setISOWeekYear](https://date-fns.org/docs/setISOWeekYear)
     *    and [setWeekYear](https://date-fns.org/docs/setWeekYear)).
     *
     * 5. These patterns are not in the Unicode Technical Standard #35:
     *    - `i`: ISO day of week
     *    - `I`: ISO week of year
     *    - `R`: ISO week-numbering year
     *    - `o`: ordinal number modifier
     *    - `P`: long localized date
     *    - `p`: long localized time
     *
     * 6. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
     *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     *
     * 7. `D` and `DD` tokens represent days of the year but they are ofthen confused with days of the month.
     *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     *
     * 8. `P+` tokens do not have a defined priority since they are merely aliases to other tokens based
     *    on the given locale.
     *
     *    using `en-US` locale: `P` => `MM/dd/yyyy`
     *    using `en-US` locale: `p` => `hh:mm a`
     *    using `pt-BR` locale: `P` => `dd/MM/yyyy`
     *    using `pt-BR` locale: `p` => `HH:mm`
     *
     * Values will be assigned to the date in the descending order of its unit's priority.
     * Units of an equal priority overwrite each other in the order of appearance.
     *
     * If no values of higher priority are parsed (e.g. when parsing string 'January 1st' without a year),
     * the values will be taken from 3rd argument `referenceDate` which works as a context of parsing.
     *
     * `referenceDate` must be passed for correct work of the function.
     * If you're not sure which `referenceDate` to supply, create a new instance of Date:
     * `parse('02/11/2014', 'MM/dd/yyyy', new Date())`
     * In this case parsing will be done in the context of the current date.
     * If `referenceDate` is `Invalid Date` or a value not convertible to valid `Date`,
     * then `Invalid Date` will be returned.
     *
     * The result may vary by locale.
     *
     * If `formatString` matches with `dateString` but does not provides tokens, `referenceDate` will be returned.
     *
     * If parsing failed, `Invalid Date` will be returned.
     * Invalid Date is a Date, whose time value is NaN.
     * Time value of Date: http://es5.github.io/#x15.9.1.1
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param dateStr - The string to parse
     * @param formatStr - The string of tokens
     * @param referenceDate - defines values missing from the parsed dateString
     * @param options - An object with options.
     *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     *
     * @returns The parsed date
     *
     * @throws `options.locale` must contain `match` property
     * @throws use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws format string contains an unescaped latin alphabet character
     *
     * @example
     * // Parse 11 February 2014 from middle-endian format:
     * var result = parse('02/11/2014', 'MM/dd/yyyy', new Date())
     * //=> Tue Feb 11 2014 00:00:00
     *
     * @example
     * // Parse 28th of February in Esperanto locale in the context of 2010 year:
     * import eo from 'date-fns/locale/eo'
     * var result = parse('28-a de februaro', "do 'de' MMMM", new Date(2010, 0, 1), {
     *   locale: eo
     * })
     * //=> Sun Feb 28 2010 00:00:00
     */
    function parse(dateStr, formatStr, referenceDate, options) {
      const defaultOptions = (0, _index2.getDefaultOptions)();
      const locale = options?.locale ?? defaultOptions.locale ?? _index3.defaultLocale;

      const firstWeekContainsDate =
        options?.firstWeekContainsDate ??
        options?.locale?.options?.firstWeekContainsDate ??
        defaultOptions.firstWeekContainsDate ??
        defaultOptions.locale?.options?.firstWeekContainsDate ??
        1;

      const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions.weekStartsOn ?? defaultOptions.locale?.options?.weekStartsOn ?? 0;

      if (formatStr === '') {
        if (dateStr === '') {
          return (0, _index4.toDate)(referenceDate);
        } else {
          return (0, _index.constructFrom)(referenceDate, NaN);
        }
      }

      const subFnOptions = {
        firstWeekContainsDate,
        weekStartsOn,
        locale,
      };

      // If timezone isn't specified, it will be set to the system timezone
      const setters = [new _Setter.DateToSystemTimezoneSetter()];

      const tokens = formatStr
        .match(longFormattingTokensRegExp)
        .map(substring => {
          const firstCharacter = substring[0];
          if (firstCharacter in _index5.longFormatters) {
            const longFormatter = _index5.longFormatters[firstCharacter];
            return longFormatter(substring, locale.formatLong);
          }
          return substring;
        })
        .join('')
        .match(formattingTokensRegExp);

      const usedTokens = [];

      for (let token of tokens) {
        if (!options?.useAdditionalWeekYearTokens && (0, _index6.isProtectedWeekYearToken)(token)) {
          (0, _index6.warnOrThrowProtectedError)(token, formatStr, dateStr);
        }
        if (!options?.useAdditionalDayOfYearTokens && (0, _index6.isProtectedDayOfYearToken)(token)) {
          (0, _index6.warnOrThrowProtectedError)(token, formatStr, dateStr);
        }

        const firstCharacter = token[0];
        const parser = _index7.parsers[firstCharacter];
        if (parser) {
          const { incompatibleTokens } = parser;
          if (Array.isArray(incompatibleTokens)) {
            const incompatibleToken = usedTokens.find(usedToken => incompatibleTokens.includes(usedToken.token) || usedToken.token === firstCharacter);
            if (incompatibleToken) {
              throw new RangeError(`The format string mustn't contain \`${incompatibleToken.fullToken}\` and \`${token}\` at the same time`);
            }
          } else if (parser.incompatibleTokens === '*' && usedTokens.length > 0) {
            throw new RangeError(`The format string mustn't contain \`${token}\` and any other token at the same time`);
          }

          usedTokens.push({ token: firstCharacter, fullToken: token });

          const parseResult = parser.run(dateStr, token, locale.match, subFnOptions);

          if (!parseResult) {
            return (0, _index.constructFrom)(referenceDate, NaN);
          }

          setters.push(parseResult.setter);

          dateStr = parseResult.rest;
        } else {
          if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
            throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
          }

          // Replace two single quote characters with one single quote character
          if (token === "''") {
            token = "'";
          } else if (firstCharacter === "'") {
            token = cleanEscapedString(token);
          }

          // Cut token from string, or, if string doesn't match the token, return Invalid Date
          if (dateStr.indexOf(token) === 0) {
            dateStr = dateStr.slice(token.length);
          } else {
            return (0, _index.constructFrom)(referenceDate, NaN);
          }
        }
      }

      // Check if the remaining input contains something other than whitespace
      if (dateStr.length > 0 && notWhitespaceRegExp.test(dateStr)) {
        return (0, _index.constructFrom)(referenceDate, NaN);
      }

      const uniquePrioritySetters = setters
        .map(setter => setter.priority)
        .sort((a, b) => b - a)
        .filter((priority, index, array) => array.indexOf(priority) === index)
        .map(priority => setters.filter(setter => setter.priority === priority).sort((a, b) => b.subPriority - a.subPriority))
        .map(setterArray => setterArray[0]);

      let date = (0, _index4.toDate)(referenceDate);

      if (isNaN(date.getTime())) {
        return (0, _index.constructFrom)(referenceDate, NaN);
      }

      const flags = {};
      for (const setter of uniquePrioritySetters) {
        if (!setter.validate(date, subFnOptions)) {
          return (0, _index.constructFrom)(referenceDate, NaN);
        }

        const result = setter.set(date, flags, subFnOptions);
        // Result is tuple (date, flags)
        if (Array.isArray(result)) {
          date = result[0];
          Object.assign(flags, result[1]);
          // Result is date
        } else {
          date = result;
        }
      }

      return (0, _index.constructFrom)(referenceDate, date);
    }

    function cleanEscapedString(input) {
      return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'");
    }
  })(parse);
  return parse;
}

var hasRequiredIsMatch;

function requireIsMatch() {
  if (hasRequiredIsMatch) return isMatch;
  hasRequiredIsMatch = 1;
  isMatch.isMatch = isMatch$1;
  var _index = /*@__PURE__*/ requireIsValid();
  var _index2 = /*@__PURE__*/ requireParse();

  /**
   * The {@link isMatch} function options.
   */

  /**
   * @name isMatch
   * @category Common Helpers
   * @summary validates the date string against given formats
   *
   * @description
   * Return the true if given date is string correct against the given format else
   * will return false.
   *
   * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
   * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
   *
   * The characters in the format string wrapped between two single quotes characters (') are escaped.
   * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
   *
   * Format of the format string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   * with a few additions (see note 5 below the table).
   *
   * Not all tokens are compatible. Combinations that don't make sense or could lead to bugs are prohibited
   * and will throw `RangeError`. For example usage of 24-hour format token with AM/PM token will throw an exception:
   *
   * ```javascript
   * isMatch('23 AM', 'HH a')
   * //=> RangeError: The format string mustn't contain `HH` and `a` at the same time
   * ```
   *
   * See the compatibility table: https://docs.google.com/spreadsheets/d/e/2PACX-1vQOPU3xUhplll6dyoMmVUXHKl_8CRDs6_ueLmex3SoqwhuolkuN3O05l4rqx5h1dKX8eb46Ul-CCSrq/pubhtml?gid=0&single=true
   *
   * Accepted format string patterns:
   * | Unit                            |Prior| Pattern | Result examples                   | Notes |
   * |---------------------------------|-----|---------|-----------------------------------|-------|
   * | Era                             | 140 | G..GGG  | AD, BC                            |       |
   * |                                 |     | GGGG    | Anno Domini, Before Christ        | 2     |
   * |                                 |     | GGGGG   | A, B                              |       |
   * | Calendar year                   | 130 | y       | 44, 1, 1900, 2017, 9999           | 4     |
   * |                                 |     | yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
   * |                                 |     | yy      | 44, 01, 00, 17                    | 4     |
   * |                                 |     | yyy     | 044, 001, 123, 999                | 4     |
   * |                                 |     | yyyy    | 0044, 0001, 1900, 2017            | 4     |
   * |                                 |     | yyyyy   | ...                               | 2,4   |
   * | Local week-numbering year       | 130 | Y       | 44, 1, 1900, 2017, 9000           | 4     |
   * |                                 |     | Yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
   * |                                 |     | YY      | 44, 01, 00, 17                    | 4,6   |
   * |                                 |     | YYY     | 044, 001, 123, 999                | 4     |
   * |                                 |     | YYYY    | 0044, 0001, 1900, 2017            | 4,6   |
   * |                                 |     | YYYYY   | ...                               | 2,4   |
   * | ISO week-numbering year         | 130 | R       | -43, 1, 1900, 2017, 9999, -9999   | 4,5   |
   * |                                 |     | RR      | -43, 01, 00, 17                   | 4,5   |
   * |                                 |     | RRR     | -043, 001, 123, 999, -999         | 4,5   |
   * |                                 |     | RRRR    | -0043, 0001, 2017, 9999, -9999    | 4,5   |
   * |                                 |     | RRRRR   | ...                               | 2,4,5 |
   * | Extended year                   | 130 | u       | -43, 1, 1900, 2017, 9999, -999    | 4     |
   * |                                 |     | uu      | -43, 01, 99, -99                  | 4     |
   * |                                 |     | uuu     | -043, 001, 123, 999, -999         | 4     |
   * |                                 |     | uuuu    | -0043, 0001, 2017, 9999, -9999    | 4     |
   * |                                 |     | uuuuu   | ...                               | 2,4   |
   * | Quarter (formatting)            | 120 | Q       | 1, 2, 3, 4                        |       |
   * |                                 |     | Qo      | 1st, 2nd, 3rd, 4th                | 5     |
   * |                                 |     | QQ      | 01, 02, 03, 04                    |       |
   * |                                 |     | QQQ     | Q1, Q2, Q3, Q4                    |       |
   * |                                 |     | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
   * |                                 |     | QQQQQ   | 1, 2, 3, 4                        | 4     |
   * | Quarter (stand-alone)           | 120 | q       | 1, 2, 3, 4                        |       |
   * |                                 |     | qo      | 1st, 2nd, 3rd, 4th                | 5     |
   * |                                 |     | qq      | 01, 02, 03, 04                    |       |
   * |                                 |     | qqq     | Q1, Q2, Q3, Q4                    |       |
   * |                                 |     | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
   * |                                 |     | qqqqq   | 1, 2, 3, 4                        | 3     |
   * | Month (formatting)              | 110 | M       | 1, 2, ..., 12                     |       |
   * |                                 |     | Mo      | 1st, 2nd, ..., 12th               | 5     |
   * |                                 |     | MM      | 01, 02, ..., 12                   |       |
   * |                                 |     | MMM     | Jan, Feb, ..., Dec                |       |
   * |                                 |     | MMMM    | January, February, ..., December  | 2     |
   * |                                 |     | MMMMM   | J, F, ..., D                      |       |
   * | Month (stand-alone)             | 110 | L       | 1, 2, ..., 12                     |       |
   * |                                 |     | Lo      | 1st, 2nd, ..., 12th               | 5     |
   * |                                 |     | LL      | 01, 02, ..., 12                   |       |
   * |                                 |     | LLL     | Jan, Feb, ..., Dec                |       |
   * |                                 |     | LLLL    | January, February, ..., December  | 2     |
   * |                                 |     | LLLLL   | J, F, ..., D                      |       |
   * | Local week of year              | 100 | w       | 1, 2, ..., 53                     |       |
   * |                                 |     | wo      | 1st, 2nd, ..., 53th               | 5     |
   * |                                 |     | ww      | 01, 02, ..., 53                   |       |
   * | ISO week of year                | 100 | I       | 1, 2, ..., 53                     | 5     |
   * |                                 |     | Io      | 1st, 2nd, ..., 53th               | 5     |
   * |                                 |     | II      | 01, 02, ..., 53                   | 5     |
   * | Day of month                    |  90 | d       | 1, 2, ..., 31                     |       |
   * |                                 |     | do      | 1st, 2nd, ..., 31st               | 5     |
   * |                                 |     | dd      | 01, 02, ..., 31                   |       |
   * | Day of year                     |  90 | D       | 1, 2, ..., 365, 366               | 7     |
   * |                                 |     | Do      | 1st, 2nd, ..., 365th, 366th       | 5     |
   * |                                 |     | DD      | 01, 02, ..., 365, 366             | 7     |
   * |                                 |     | DDD     | 001, 002, ..., 365, 366           |       |
   * |                                 |     | DDDD    | ...                               | 2     |
   * | Day of week (formatting)        |  90 | E..EEE  | Mon, Tue, Wed, ..., Su            |       |
   * |                                 |     | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
   * |                                 |     | EEEEE   | M, T, W, T, F, S, S               |       |
   * |                                 |     | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
   * | ISO day of week (formatting)    |  90 | i       | 1, 2, 3, ..., 7                   | 5     |
   * |                                 |     | io      | 1st, 2nd, ..., 7th                | 5     |
   * |                                 |     | ii      | 01, 02, ..., 07                   | 5     |
   * |                                 |     | iii     | Mon, Tue, Wed, ..., Su            | 5     |
   * |                                 |     | iiii    | Monday, Tuesday, ..., Sunday      | 2,5   |
   * |                                 |     | iiiii   | M, T, W, T, F, S, S               | 5     |
   * |                                 |     | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 5     |
   * | Local day of week (formatting)  |  90 | e       | 2, 3, 4, ..., 1                   |       |
   * |                                 |     | eo      | 2nd, 3rd, ..., 1st                | 5     |
   * |                                 |     | ee      | 02, 03, ..., 01                   |       |
   * |                                 |     | eee     | Mon, Tue, Wed, ..., Su            |       |
   * |                                 |     | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
   * |                                 |     | eeeee   | M, T, W, T, F, S, S               |       |
   * |                                 |     | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
   * | Local day of week (stand-alone) |  90 | c       | 2, 3, 4, ..., 1                   |       |
   * |                                 |     | co      | 2nd, 3rd, ..., 1st                | 5     |
   * |                                 |     | cc      | 02, 03, ..., 01                   |       |
   * |                                 |     | ccc     | Mon, Tue, Wed, ..., Su            |       |
   * |                                 |     | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
   * |                                 |     | ccccc   | M, T, W, T, F, S, S               |       |
   * |                                 |     | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
   * | AM, PM                          |  80 | a..aaa  | AM, PM                            |       |
   * |                                 |     | aaaa    | a.m., p.m.                        | 2     |
   * |                                 |     | aaaaa   | a, p                              |       |
   * | AM, PM, noon, midnight          |  80 | b..bbb  | AM, PM, noon, midnight            |       |
   * |                                 |     | bbbb    | a.m., p.m., noon, midnight        | 2     |
   * |                                 |     | bbbbb   | a, p, n, mi                       |       |
   * | Flexible day period             |  80 | B..BBB  | at night, in the morning, ...     |       |
   * |                                 |     | BBBB    | at night, in the morning, ...     | 2     |
   * |                                 |     | BBBBB   | at night, in the morning, ...     |       |
   * | Hour [1-12]                     |  70 | h       | 1, 2, ..., 11, 12                 |       |
   * |                                 |     | ho      | 1st, 2nd, ..., 11th, 12th         | 5     |
   * |                                 |     | hh      | 01, 02, ..., 11, 12               |       |
   * | Hour [0-23]                     |  70 | H       | 0, 1, 2, ..., 23                  |       |
   * |                                 |     | Ho      | 0th, 1st, 2nd, ..., 23rd          | 5     |
   * |                                 |     | HH      | 00, 01, 02, ..., 23               |       |
   * | Hour [0-11]                     |  70 | K       | 1, 2, ..., 11, 0                  |       |
   * |                                 |     | Ko      | 1st, 2nd, ..., 11th, 0th          | 5     |
   * |                                 |     | KK      | 01, 02, ..., 11, 00               |       |
   * | Hour [1-24]                     |  70 | k       | 24, 1, 2, ..., 23                 |       |
   * |                                 |     | ko      | 24th, 1st, 2nd, ..., 23rd         | 5     |
   * |                                 |     | kk      | 24, 01, 02, ..., 23               |       |
   * | Minute                          |  60 | m       | 0, 1, ..., 59                     |       |
   * |                                 |     | mo      | 0th, 1st, ..., 59th               | 5     |
   * |                                 |     | mm      | 00, 01, ..., 59                   |       |
   * | Second                          |  50 | s       | 0, 1, ..., 59                     |       |
   * |                                 |     | so      | 0th, 1st, ..., 59th               | 5     |
   * |                                 |     | ss      | 00, 01, ..., 59                   |       |
   * | Seconds timestamp               |  40 | t       | 512969520                         |       |
   * |                                 |     | tt      | ...                               | 2     |
   * | Fraction of second              |  30 | S       | 0, 1, ..., 9                      |       |
   * |                                 |     | SS      | 00, 01, ..., 99                   |       |
   * |                                 |     | SSS     | 000, 001, ..., 999                |       |
   * |                                 |     | SSSS    | ...                               | 2     |
   * | Milliseconds timestamp          |  20 | T       | 512969520900                      |       |
   * |                                 |     | TT      | ...                               | 2     |
   * | Timezone (ISO-8601 w/ Z)        |  10 | X       | -08, +0530, Z                     |       |
   * |                                 |     | XX      | -0800, +0530, Z                   |       |
   * |                                 |     | XXX     | -08:00, +05:30, Z                 |       |
   * |                                 |     | XXXX    | -0800, +0530, Z, +123456          | 2     |
   * |                                 |     | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
   * | Timezone (ISO-8601 w/o Z)       |  10 | x       | -08, +0530, +00                   |       |
   * |                                 |     | xx      | -0800, +0530, +0000               |       |
   * |                                 |     | xxx     | -08:00, +05:30, +00:00            | 2     |
   * |                                 |     | xxxx    | -0800, +0530, +0000, +123456      |       |
   * |                                 |     | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
   * | Long localized date             |  NA | P       | 05/29/1453                        | 5,8   |
   * |                                 |     | PP      | May 29, 1453                      |       |
   * |                                 |     | PPP     | May 29th, 1453                    |       |
   * |                                 |     | PPPP    | Sunday, May 29th, 1453            | 2,5,8 |
   * | Long localized time             |  NA | p       | 12:00 AM                          | 5,8   |
   * |                                 |     | pp      | 12:00:00 AM                       |       |
   * | Combination of date and time    |  NA | Pp      | 05/29/1453, 12:00 AM              |       |
   * |                                 |     | PPpp    | May 29, 1453, 12:00:00 AM         |       |
   * |                                 |     | PPPpp   | May 29th, 1453 at ...             |       |
   * |                                 |     | PPPPpp  | Sunday, May 29th, 1453 at ...     | 2,5,8 |
   * Notes:
   * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
   *    are the same as "stand-alone" units, but are different in some languages.
   *    "Formatting" units are declined according to the rules of the language
   *    in the context of a date. "Stand-alone" units are always nominative singular.
   *    In `format` function, they will produce different result:
   *
   *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
   *
   *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
   *
   *    `isMatch` will try to match both formatting and stand-alone units interchangably.
   *
   * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
   *    the single quote characters (see below).
   *    If the sequence is longer than listed in table:
   *    - for numerical units (`yyyyyyyy`) `isMatch` will try to match a number
   *      as wide as the sequence
   *    - for text units (`MMMMMMMM`) `isMatch` will try to match the widest variation of the unit.
   *      These variations are marked with "2" in the last column of the table.
   *
   * 3. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
   *    These tokens represent the shortest form of the quarter.
   *
   * 4. The main difference between `y` and `u` patterns are B.C. years:
   *
   *    | Year | `y` | `u` |
   *    |------|-----|-----|
   *    | AC 1 |   1 |   1 |
   *    | BC 1 |   1 |   0 |
   *    | BC 2 |   2 |  -1 |
   *
   *    Also `yy` will try to guess the century of two digit year by proximity with `referenceDate`:
   *
   *    `isMatch('50', 'yy') //=> true`
   *
   *    `isMatch('75', 'yy') //=> true`
   *
   *    while `uu` will use the year as is:
   *
   *    `isMatch('50', 'uu') //=> true`
   *
   *    `isMatch('75', 'uu') //=> true`
   *
   *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
   *    except local week-numbering years are dependent on `options.weekStartsOn`
   *    and `options.firstWeekContainsDate` (compare [setISOWeekYear](https://date-fns.org/docs/setISOWeekYear)
   *    and [setWeekYear](https://date-fns.org/docs/setWeekYear)).
   *
   * 5. These patterns are not in the Unicode Technical Standard #35:
   *    - `i`: ISO day of week
   *    - `I`: ISO week of year
   *    - `R`: ISO week-numbering year
   *    - `o`: ordinal number modifier
   *    - `P`: long localized date
   *    - `p`: long localized time
   *
   * 6. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
   *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
   *
   * 7. `D` and `DD` tokens represent days of the year but they are ofthen confused with days of the month.
   *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
   *
   * 8. `P+` tokens do not have a defined priority since they are merely aliases to other tokens based
   *    on the given locale.
   *
   *    using `en-US` locale: `P` => `MM/dd/yyyy`
   *    using `en-US` locale: `p` => `hh:mm a`
   *    using `pt-BR` locale: `P` => `dd/MM/yyyy`
   *    using `pt-BR` locale: `p` => `HH:mm`
   *
   * Values will be checked in the descending order of its unit's priority.
   * Units of an equal priority overwrite each other in the order of appearance.
   *
   * If no values of higher priority are matched (e.g. when matching string 'January 1st' without a year),
   * the values will be taken from today's using `new Date()` date which works as a context of parsing.
   *
   * The result may vary by locale.
   *
   * If `formatString` matches with `dateString` but does not provides tokens, `referenceDate` will be returned.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateStr - The date string to verify
   * @param format - The string of tokens
   * @param options - An object with options.
   *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
   *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
   *
   * @returns Is format string a match for date string?
   *
   * @throws `options.locale` must contain `match` property
   * @throws use `yyyy` instead of `YYYY` for formatting years; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
   * @throws use `yy` instead of `YY` for formatting years; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
   * @throws use `d` instead of `D` for formatting days of the month; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
   * @throws use `dd` instead of `DD` for formatting days of the month; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
   * @throws format string contains an unescaped latin alphabet character
   *
   * @example
   * // Match 11 February 2014 from middle-endian format:
   * const result = isMatch('02/11/2014', 'MM/dd/yyyy')
   * //=> true
   *
   * @example
   * // Match 28th of February in Esperanto locale in the context of 2010 year:
   * import eo from 'date-fns/locale/eo'
   * const result = isMatch('28-a de februaro', "do 'de' MMMM", {
   *   locale: eo
   * })
   * //=> true
   */
  function isMatch$1(dateStr, formatStr, options) {
    return (0, _index.isValid)((0, _index2.parse)(dateStr, formatStr, new Date(), options));
  }
  return isMatch;
}

var isMonday = {};

var hasRequiredIsMonday;

function requireIsMonday() {
  if (hasRequiredIsMonday) return isMonday;
  hasRequiredIsMonday = 1;
  isMonday.isMonday = isMonday$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name isMonday
   * @category Weekday Helpers
   * @summary Is the given date Monday?
   *
   * @description
   * Is the given date Monday?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   *
   * @returns The date is Monday
   *
   * @example
   * // Is 22 September 2014 Monday?
   * const result = isMonday(new Date(2014, 8, 22))
   * //=> true
   */
  function isMonday$1(date) {
    return (0, _index.toDate)(date).getDay() === 1;
  }
  return isMonday;
}

var isPast = {};

var hasRequiredIsPast;

function requireIsPast() {
  if (hasRequiredIsPast) return isPast;
  hasRequiredIsPast = 1;
  isPast.isPast = isPast$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name isPast
   * @category Common Helpers
   * @summary Is the given date in the past?
   * @pure false
   *
   * @description
   * Is the given date in the past?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   *
   * @returns The date is in the past
   *
   * @example
   * // If today is 6 October 2014, is 2 July 2014 in the past?
   * const result = isPast(new Date(2014, 6, 2))
   * //=> true
   */
  function isPast$1(date) {
    return +(0, _index.toDate)(date) < Date.now();
  }
  return isPast;
}

var isSameHour = {};

var startOfHour = {};

var hasRequiredStartOfHour;

function requireStartOfHour() {
  if (hasRequiredStartOfHour) return startOfHour;
  hasRequiredStartOfHour = 1;
  startOfHour.startOfHour = startOfHour$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name startOfHour
   * @category Hour Helpers
   * @summary Return the start of an hour for the given date.
   *
   * @description
   * Return the start of an hour for the given date.
   * The result will be in the local timezone.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The start of an hour
   *
   * @example
   * // The start of an hour for 2 September 2014 11:55:00:
   * const result = startOfHour(new Date(2014, 8, 2, 11, 55))
   * //=> Tue Sep 02 2014 11:00:00
   */
  function startOfHour$1(date) {
    const _date = (0, _index.toDate)(date);
    _date.setMinutes(0, 0, 0);
    return _date;
  }
  return startOfHour;
}

var hasRequiredIsSameHour;

function requireIsSameHour() {
  if (hasRequiredIsSameHour) return isSameHour;
  hasRequiredIsSameHour = 1;
  isSameHour.isSameHour = isSameHour$1;
  var _index = /*@__PURE__*/ requireStartOfHour();

  /**
   * @name isSameHour
   * @category Hour Helpers
   * @summary Are the given dates in the same hour (and same day)?
   *
   * @description
   * Are the given dates in the same hour (and same day)?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The first date to check
   * @param dateRight - The second date to check
   *
   * @returns The dates are in the same hour (and same day)
   *
   * @example
   * // Are 4 September 2014 06:00:00 and 4 September 06:30:00 in the same hour?
   * const result = isSameHour(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 6, 30))
   * //=> true
   *
   * @example
   * // Are 4 September 2014 06:00:00 and 5 September 06:00:00 in the same hour?
   * const result = isSameHour(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 5, 6, 0))
   * //=> false
   */
  function isSameHour$1(dateLeft, dateRight) {
    const dateLeftStartOfHour = (0, _index.startOfHour)(dateLeft);
    const dateRightStartOfHour = (0, _index.startOfHour)(dateRight);

    return +dateLeftStartOfHour === +dateRightStartOfHour;
  }
  return isSameHour;
}

var isSameISOWeek = {};

var isSameWeek = {};

var hasRequiredIsSameWeek;

function requireIsSameWeek() {
  if (hasRequiredIsSameWeek) return isSameWeek;
  hasRequiredIsSameWeek = 1;
  isSameWeek.isSameWeek = isSameWeek$1;
  var _index = /*@__PURE__*/ requireStartOfWeek();

  /**
   * The {@link isSameWeek} function options.
   */

  /**
   * @name isSameWeek
   * @category Week Helpers
   * @summary Are the given dates in the same week (and month and year)?
   *
   * @description
   * Are the given dates in the same week (and month and year)?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The first date to check
   * @param dateRight - The second date to check
   * @param options - An object with options
   *
   * @returns The dates are in the same week (and month and year)
   *
   * @example
   * // Are 31 August 2014 and 4 September 2014 in the same week?
   * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4))
   * //=> true
   *
   * @example
   * // If week starts with Monday,
   * // are 31 August 2014 and 4 September 2014 in the same week?
   * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4), {
   *   weekStartsOn: 1
   * })
   * //=> false
   *
   * @example
   * // Are 1 January 2014 and 1 January 2015 in the same week?
   * const result = isSameWeek(new Date(2014, 0, 1), new Date(2015, 0, 1))
   * //=> false
   */
  function isSameWeek$1(dateLeft, dateRight, options) {
    const dateLeftStartOfWeek = (0, _index.startOfWeek)(dateLeft, options);
    const dateRightStartOfWeek = (0, _index.startOfWeek)(dateRight, options);

    return +dateLeftStartOfWeek === +dateRightStartOfWeek;
  }
  return isSameWeek;
}

var hasRequiredIsSameISOWeek;

function requireIsSameISOWeek() {
  if (hasRequiredIsSameISOWeek) return isSameISOWeek;
  hasRequiredIsSameISOWeek = 1;
  isSameISOWeek.isSameISOWeek = isSameISOWeek$1;
  var _index = /*@__PURE__*/ requireIsSameWeek();

  /**
   * @name isSameISOWeek
   * @category ISO Week Helpers
   * @summary Are the given dates in the same ISO week (and year)?
   *
   * @description
   * Are the given dates in the same ISO week (and year)?
   *
   * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The first date to check
   * @param dateRight - The second date to check
   *
   * @returns The dates are in the same ISO week (and year)
   *
   * @example
   * // Are 1 September 2014 and 7 September 2014 in the same ISO week?
   * const result = isSameISOWeek(new Date(2014, 8, 1), new Date(2014, 8, 7))
   * //=> true
   *
   * @example
   * // Are 1 September 2014 and 1 September 2015 in the same ISO week?
   * const result = isSameISOWeek(new Date(2014, 8, 1), new Date(2015, 8, 1))
   * //=> false
   */
  function isSameISOWeek$1(dateLeft, dateRight) {
    return (0, _index.isSameWeek)(dateLeft, dateRight, { weekStartsOn: 1 });
  }
  return isSameISOWeek;
}

var isSameISOWeekYear = {};

var hasRequiredIsSameISOWeekYear;

function requireIsSameISOWeekYear() {
  if (hasRequiredIsSameISOWeekYear) return isSameISOWeekYear;
  hasRequiredIsSameISOWeekYear = 1;
  isSameISOWeekYear.isSameISOWeekYear = isSameISOWeekYear$1;
  var _index = /*@__PURE__*/ requireStartOfISOWeekYear();

  /**
   * @name isSameISOWeekYear
   * @category ISO Week-Numbering Year Helpers
   * @summary Are the given dates in the same ISO week-numbering year?
   *
   * @description
   * Are the given dates in the same ISO week-numbering year?
   *
   * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The first date to check
   * @param dateRight - The second date to check
   *
   * @returns The dates are in the same ISO week-numbering year
   *
   * @example
   * // Are 29 December 2003 and 2 January 2005 in the same ISO week-numbering year?
   * const result = isSameISOWeekYear(new Date(2003, 11, 29), new Date(2005, 0, 2))
   * //=> true
   */
  function isSameISOWeekYear$1(dateLeft, dateRight) {
    const dateLeftStartOfYear = (0, _index.startOfISOWeekYear)(dateLeft);
    const dateRightStartOfYear = (0, _index.startOfISOWeekYear)(dateRight);

    return +dateLeftStartOfYear === +dateRightStartOfYear;
  }
  return isSameISOWeekYear;
}

var isSameMinute = {};

var hasRequiredIsSameMinute;

function requireIsSameMinute() {
  if (hasRequiredIsSameMinute) return isSameMinute;
  hasRequiredIsSameMinute = 1;
  isSameMinute.isSameMinute = isSameMinute$1;
  var _index = /*@__PURE__*/ requireStartOfMinute();

  /**
   * @name isSameMinute
   * @category Minute Helpers
   * @summary Are the given dates in the same minute (and hour and day)?
   *
   * @description
   * Are the given dates in the same minute (and hour and day)?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The first date to check
   * @param dateRight - The second date to check
   *
   * @returns The dates are in the same minute (and hour and day)
   *
   * @example
   * // Are 4 September 2014 06:30:00 and 4 September 2014 06:30:15 in the same minute?
   * const result = isSameMinute(
   *   new Date(2014, 8, 4, 6, 30),
   *   new Date(2014, 8, 4, 6, 30, 15)
   * )
   * //=> true
   *
   * @example
   * // Are 4 September 2014 06:30:00 and 5 September 2014 06:30:00 in the same minute?
   * const result = isSameMinute(
   *   new Date(2014, 8, 4, 6, 30),
   *   new Date(2014, 8, 5, 6, 30)
   * )
   * //=> false
   */
  function isSameMinute$1(dateLeft, dateRight) {
    const dateLeftStartOfMinute = (0, _index.startOfMinute)(dateLeft);
    const dateRightStartOfMinute = (0, _index.startOfMinute)(dateRight);

    return +dateLeftStartOfMinute === +dateRightStartOfMinute;
  }
  return isSameMinute;
}

var isSameMonth = {};

var hasRequiredIsSameMonth;

function requireIsSameMonth() {
  if (hasRequiredIsSameMonth) return isSameMonth;
  hasRequiredIsSameMonth = 1;
  isSameMonth.isSameMonth = isSameMonth$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name isSameMonth
   * @category Month Helpers
   * @summary Are the given dates in the same month (and year)?
   *
   * @description
   * Are the given dates in the same month (and year)?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The first date to check
   * @param dateRight - The second date to check
   *
   * @returns The dates are in the same month (and year)
   *
   * @example
   * // Are 2 September 2014 and 25 September 2014 in the same month?
   * const result = isSameMonth(new Date(2014, 8, 2), new Date(2014, 8, 25))
   * //=> true
   *
   * @example
   * // Are 2 September 2014 and 25 September 2015 in the same month?
   * const result = isSameMonth(new Date(2014, 8, 2), new Date(2015, 8, 25))
   * //=> false
   */
  function isSameMonth$1(dateLeft, dateRight) {
    const _dateLeft = (0, _index.toDate)(dateLeft);
    const _dateRight = (0, _index.toDate)(dateRight);
    return _dateLeft.getFullYear() === _dateRight.getFullYear() && _dateLeft.getMonth() === _dateRight.getMonth();
  }
  return isSameMonth;
}

var isSameQuarter = {};

var hasRequiredIsSameQuarter;

function requireIsSameQuarter() {
  if (hasRequiredIsSameQuarter) return isSameQuarter;
  hasRequiredIsSameQuarter = 1;
  isSameQuarter.isSameQuarter = isSameQuarter$1;
  var _index = /*@__PURE__*/ requireStartOfQuarter();

  /**
	 * @name isSameQuarter
	 * @category Quarter Helpers
	 * @summary Are the given dates in the same quarter (and year)?
	 *
	 * @description
	 * Are the given dates in the same quarter (and year)?
	 *
	 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
	 *
	 * @param dateLeft - The first date to check
	 * @param dateRight - The second date to check

	 * @returns The dates are in the same quarter (and year)
	 *
	 * @example
	 * // Are 1 January 2014 and 8 March 2014 in the same quarter?
	 * const result = isSameQuarter(new Date(2014, 0, 1), new Date(2014, 2, 8))
	 * //=> true
	 *
	 * @example
	 * // Are 1 January 2014 and 1 January 2015 in the same quarter?
	 * const result = isSameQuarter(new Date(2014, 0, 1), new Date(2015, 0, 1))
	 * //=> false
	 */
  function isSameQuarter$1(dateLeft, dateRight) {
    const dateLeftStartOfQuarter = (0, _index.startOfQuarter)(dateLeft);
    const dateRightStartOfQuarter = (0, _index.startOfQuarter)(dateRight);

    return +dateLeftStartOfQuarter === +dateRightStartOfQuarter;
  }
  return isSameQuarter;
}

var isSameSecond = {};

var startOfSecond = {};

var hasRequiredStartOfSecond;

function requireStartOfSecond() {
  if (hasRequiredStartOfSecond) return startOfSecond;
  hasRequiredStartOfSecond = 1;
  startOfSecond.startOfSecond = startOfSecond$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name startOfSecond
   * @category Second Helpers
   * @summary Return the start of a second for the given date.
   *
   * @description
   * Return the start of a second for the given date.
   * The result will be in the local timezone.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The start of a second
   *
   * @example
   * // The start of a second for 1 December 2014 22:15:45.400:
   * const result = startOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
   * //=> Mon Dec 01 2014 22:15:45.000
   */
  function startOfSecond$1(date) {
    const _date = (0, _index.toDate)(date);
    _date.setMilliseconds(0);
    return _date;
  }
  return startOfSecond;
}

var hasRequiredIsSameSecond;

function requireIsSameSecond() {
  if (hasRequiredIsSameSecond) return isSameSecond;
  hasRequiredIsSameSecond = 1;
  isSameSecond.isSameSecond = isSameSecond$1;
  var _index = /*@__PURE__*/ requireStartOfSecond();

  /**
   * @name isSameSecond
   * @category Second Helpers
   * @summary Are the given dates in the same second (and hour and day)?
   *
   * @description
   * Are the given dates in the same second (and hour and day)?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The first date to check
   * @param dateRight - The second date to check
   *
   * @returns The dates are in the same second (and hour and day)
   *
   * @example
   * // Are 4 September 2014 06:30:15.000 and 4 September 2014 06:30.15.500 in the same second?
   * const result = isSameSecond(
   *   new Date(2014, 8, 4, 6, 30, 15),
   *   new Date(2014, 8, 4, 6, 30, 15, 500)
   * )
   * //=> true
   *
   * @example
   * // Are 4 September 2014 06:00:15.000 and 4 September 2014 06:01.15.000 in the same second?
   * const result = isSameSecond(
   *   new Date(2014, 8, 4, 6, 0, 15),
   *   new Date(2014, 8, 4, 6, 1, 15)
   * )
   * //=> false
   *
   * @example
   * // Are 4 September 2014 06:00:15.000 and 5 September 2014 06:00.15.000 in the same second?
   * const result = isSameSecond(
   *   new Date(2014, 8, 4, 6, 0, 15),
   *   new Date(2014, 8, 5, 6, 0, 15)
   * )
   * //=> false
   */
  function isSameSecond$1(dateLeft, dateRight) {
    const dateLeftStartOfSecond = (0, _index.startOfSecond)(dateLeft);
    const dateRightStartOfSecond = (0, _index.startOfSecond)(dateRight);

    return +dateLeftStartOfSecond === +dateRightStartOfSecond;
  }
  return isSameSecond;
}

var isSameYear = {};

var hasRequiredIsSameYear;

function requireIsSameYear() {
  if (hasRequiredIsSameYear) return isSameYear;
  hasRequiredIsSameYear = 1;
  isSameYear.isSameYear = isSameYear$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name isSameYear
   * @category Year Helpers
   * @summary Are the given dates in the same year?
   *
   * @description
   * Are the given dates in the same year?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param dateLeft - The first date to check
   * @param dateRight - The second date to check
   *
   * @returns The dates are in the same year
   *
   * @example
   * // Are 2 September 2014 and 25 September 2014 in the same year?
   * const result = isSameYear(new Date(2014, 8, 2), new Date(2014, 8, 25))
   * //=> true
   */
  function isSameYear$1(dateLeft, dateRight) {
    const _dateLeft = (0, _index.toDate)(dateLeft);
    const _dateRight = (0, _index.toDate)(dateRight);
    return _dateLeft.getFullYear() === _dateRight.getFullYear();
  }
  return isSameYear;
}

var isThisHour = {};

var hasRequiredIsThisHour;

function requireIsThisHour() {
  if (hasRequiredIsThisHour) return isThisHour;
  hasRequiredIsThisHour = 1;
  isThisHour.isThisHour = isThisHour$1;
  var _index = /*@__PURE__*/ requireConstructNow();
  var _index2 = /*@__PURE__*/ requireIsSameHour();

  /**
   * @name isThisHour
   * @category Hour Helpers
   * @summary Is the given date in the same hour as the current date?
   * @pure false
   *
   * @description
   * Is the given date in the same hour as the current date?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   *
   * @returns The date is in this hour
   *
   * @example
   * // If now is 25 September 2014 18:30:15.500,
   * // is 25 September 2014 18:00:00 in this hour?
   * const result = isThisHour(new Date(2014, 8, 25, 18))
   * //=> true
   */
  function isThisHour$1(date) {
    return (0, _index2.isSameHour)(date, (0, _index.constructNow)(date));
  }
  return isThisHour;
}

var isThisISOWeek = {};

var hasRequiredIsThisISOWeek;

function requireIsThisISOWeek() {
  if (hasRequiredIsThisISOWeek) return isThisISOWeek;
  hasRequiredIsThisISOWeek = 1;
  isThisISOWeek.isThisISOWeek = isThisISOWeek$1;
  var _index = /*@__PURE__*/ requireConstructNow();
  var _index2 = /*@__PURE__*/ requireIsSameISOWeek();

  /**
   * @name isThisISOWeek
   * @category ISO Week Helpers
   * @summary Is the given date in the same ISO week as the current date?
   * @pure false
   *
   * @description
   * Is the given date in the same ISO week as the current date?
   *
   * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   *
   * @returns The date is in this ISO week
   *
   * @example
   * // If today is 25 September 2014, is 22 September 2014 in this ISO week?
   * const result = isThisISOWeek(new Date(2014, 8, 22))
   * //=> true
   */

  function isThisISOWeek$1(date) {
    return (0, _index2.isSameISOWeek)(date, (0, _index.constructNow)(date));
  }
  return isThisISOWeek;
}

var isThisMinute = {};

var hasRequiredIsThisMinute;

function requireIsThisMinute() {
  if (hasRequiredIsThisMinute) return isThisMinute;
  hasRequiredIsThisMinute = 1;
  isThisMinute.isThisMinute = isThisMinute$1;
  var _index = /*@__PURE__*/ requireConstructNow();
  var _index2 = /*@__PURE__*/ requireIsSameMinute();

  /**
   * @name isThisMinute
   * @category Minute Helpers
   * @summary Is the given date in the same minute as the current date?
   * @pure false
   *
   * @description
   * Is the given date in the same minute as the current date?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   *
   * @returns The date is in this minute
   *
   * @example
   * // If now is 25 September 2014 18:30:15.500,
   * // is 25 September 2014 18:30:00 in this minute?
   * const result = isThisMinute(new Date(2014, 8, 25, 18, 30))
   * //=> true
   */

  function isThisMinute$1(date) {
    return (0, _index2.isSameMinute)(date, (0, _index.constructNow)(date));
  }
  return isThisMinute;
}

var isThisMonth = {};

var hasRequiredIsThisMonth;

function requireIsThisMonth() {
  if (hasRequiredIsThisMonth) return isThisMonth;
  hasRequiredIsThisMonth = 1;
  isThisMonth.isThisMonth = isThisMonth$1;
  var _index = /*@__PURE__*/ requireConstructNow();
  var _index2 = /*@__PURE__*/ requireIsSameMonth();

  /**
   * @name isThisMonth
   * @category Month Helpers
   * @summary Is the given date in the same month as the current date?
   * @pure false
   *
   * @description
   * Is the given date in the same month as the current date?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   *
   * @returns The date is in this month
   *
   * @example
   * // If today is 25 September 2014, is 15 September 2014 in this month?
   * const result = isThisMonth(new Date(2014, 8, 15))
   * //=> true
   */

  function isThisMonth$1(date) {
    return (0, _index2.isSameMonth)(date, (0, _index.constructNow)(date));
  }
  return isThisMonth;
}

var isThisQuarter = {};

var hasRequiredIsThisQuarter;

function requireIsThisQuarter() {
  if (hasRequiredIsThisQuarter) return isThisQuarter;
  hasRequiredIsThisQuarter = 1;
  isThisQuarter.isThisQuarter = isThisQuarter$1;
  var _index = /*@__PURE__*/ requireConstructNow();
  var _index2 = /*@__PURE__*/ requireIsSameQuarter();

  /**
   * @name isThisQuarter
   * @category Quarter Helpers
   * @summary Is the given date in the same quarter as the current date?
   * @pure false
   *
   * @description
   * Is the given date in the same quarter as the current date?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   *
   * @returns The date is in this quarter
   *
   * @example
   * // If today is 25 September 2014, is 2 July 2014 in this quarter?
   * const result = isThisQuarter(new Date(2014, 6, 2))
   * //=> true
   */
  function isThisQuarter$1(date) {
    return (0, _index2.isSameQuarter)(date, (0, _index.constructNow)(date));
  }
  return isThisQuarter;
}

var isThisSecond = {};

var hasRequiredIsThisSecond;

function requireIsThisSecond() {
  if (hasRequiredIsThisSecond) return isThisSecond;
  hasRequiredIsThisSecond = 1;
  isThisSecond.isThisSecond = isThisSecond$1;
  var _index = /*@__PURE__*/ requireConstructNow();
  var _index2 = /*@__PURE__*/ requireIsSameSecond();

  /**
   * @name isThisSecond
   * @category Second Helpers
   * @summary Is the given date in the same second as the current date?
   * @pure false
   *
   * @description
   * Is the given date in the same second as the current date?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   *
   * @returns The date is in this second
   *
   * @example
   * // If now is 25 September 2014 18:30:15.500,
   * // is 25 September 2014 18:30:15.000 in this second?
   * const result = isThisSecond(new Date(2014, 8, 25, 18, 30, 15))
   * //=> true
   */
  function isThisSecond$1(date) {
    return (0, _index2.isSameSecond)(date, (0, _index.constructNow)(date));
  }
  return isThisSecond;
}

var isThisWeek = {};

var hasRequiredIsThisWeek;

function requireIsThisWeek() {
  if (hasRequiredIsThisWeek) return isThisWeek;
  hasRequiredIsThisWeek = 1;
  isThisWeek.isThisWeek = isThisWeek$1;
  var _index = /*@__PURE__*/ requireConstructNow();
  var _index2 = /*@__PURE__*/ requireIsSameWeek();

  /**
   * The {@link isThisWeek} function options.
   */

  /**
   * @name isThisWeek
   * @category Week Helpers
   * @summary Is the given date in the same week as the current date?
   * @pure false
   *
   * @description
   * Is the given date in the same week as the current date?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   * @param options - The object with options
   *
   * @returns The date is in this week
   *
   * @example
   * // If today is 25 September 2014, is 21 September 2014 in this week?
   * const result = isThisWeek(new Date(2014, 8, 21))
   * //=> true
   *
   * @example
   * // If today is 25 September 2014 and week starts with Monday
   * // is 21 September 2014 in this week?
   * const result = isThisWeek(new Date(2014, 8, 21), { weekStartsOn: 1 })
   * //=> false
   */
  function isThisWeek$1(date, options) {
    return (0, _index2.isSameWeek)(date, (0, _index.constructNow)(date), options);
  }
  return isThisWeek;
}

var isThisYear = {};

var hasRequiredIsThisYear;

function requireIsThisYear() {
  if (hasRequiredIsThisYear) return isThisYear;
  hasRequiredIsThisYear = 1;
  isThisYear.isThisYear = isThisYear$1;
  var _index = /*@__PURE__*/ requireConstructNow();
  var _index2 = /*@__PURE__*/ requireIsSameYear();

  /**
   * @name isThisYear
   * @category Year Helpers
   * @summary Is the given date in the same year as the current date?
   * @pure false
   *
   * @description
   * Is the given date in the same year as the current date?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   *
   * @returns The date is in this year
   *
   * @example
   * // If today is 25 September 2014, is 2 July 2014 in this year?
   * const result = isThisYear(new Date(2014, 6, 2))
   * //=> true
   */
  function isThisYear$1(date) {
    return (0, _index2.isSameYear)(date, (0, _index.constructNow)(date));
  }
  return isThisYear;
}

var isThursday = {};

var hasRequiredIsThursday;

function requireIsThursday() {
  if (hasRequiredIsThursday) return isThursday;
  hasRequiredIsThursday = 1;
  isThursday.isThursday = isThursday$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name isThursday
   * @category Weekday Helpers
   * @summary Is the given date Thursday?
   *
   * @description
   * Is the given date Thursday?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   *
   * @returns The date is Thursday
   *
   * @example
   * // Is 25 September 2014 Thursday?
   * const result = isThursday(new Date(2014, 8, 25))
   * //=> true
   */
  function isThursday$1(date) {
    return (0, _index.toDate)(date).getDay() === 4;
  }
  return isThursday;
}

var isToday = {};

var hasRequiredIsToday;

function requireIsToday() {
  if (hasRequiredIsToday) return isToday;
  hasRequiredIsToday = 1;
  isToday.isToday = isToday$1;
  var _index = /*@__PURE__*/ requireConstructNow();
  var _index2 = /*@__PURE__*/ requireIsSameDay();

  /**
   * @name isToday
   * @category Day Helpers
   * @summary Is the given date today?
   * @pure false
   *
   * @description
   * Is the given date today?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   *
   * @returns The date is today
   *
   * @example
   * // If today is 6 October 2014, is 6 October 14:00:00 today?
   * const result = isToday(new Date(2014, 9, 6, 14, 0))
   * //=> true
   */
  function isToday$1(date) {
    return (0, _index2.isSameDay)(date, (0, _index.constructNow)(date));
  }
  return isToday;
}

var isTomorrow = {};

var hasRequiredIsTomorrow;

function requireIsTomorrow() {
  if (hasRequiredIsTomorrow) return isTomorrow;
  hasRequiredIsTomorrow = 1;
  isTomorrow.isTomorrow = isTomorrow$1;
  var _index = /*@__PURE__*/ requireAddDays();
  var _index2 = /*@__PURE__*/ requireConstructNow();
  var _index3 = /*@__PURE__*/ requireIsSameDay();

  /**
   * @name isTomorrow
   * @category Day Helpers
   * @summary Is the given date tomorrow?
   * @pure false
   *
   * @description
   * Is the given date tomorrow?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   *
   * @returns The date is tomorrow
   *
   * @example
   * // If today is 6 October 2014, is 7 October 14:00:00 tomorrow?
   * const result = isTomorrow(new Date(2014, 9, 7, 14, 0))
   * //=> true
   */
  function isTomorrow$1(date) {
    return (0, _index3.isSameDay)(date, (0, _index.addDays)((0, _index2.constructNow)(date), 1));
  }
  return isTomorrow;
}

var isTuesday = {};

var hasRequiredIsTuesday;

function requireIsTuesday() {
  if (hasRequiredIsTuesday) return isTuesday;
  hasRequiredIsTuesday = 1;
  isTuesday.isTuesday = isTuesday$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name isTuesday
   * @category Weekday Helpers
   * @summary Is the given date Tuesday?
   *
   * @description
   * Is the given date Tuesday?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   *
   * @returns The date is Tuesday
   *
   * @example
   * // Is 23 September 2014 Tuesday?
   * const result = isTuesday(new Date(2014, 8, 23))
   * //=> true
   */
  function isTuesday$1(date) {
    return (0, _index.toDate)(date).getDay() === 2;
  }
  return isTuesday;
}

var isWednesday = {};

var hasRequiredIsWednesday;

function requireIsWednesday() {
  if (hasRequiredIsWednesday) return isWednesday;
  hasRequiredIsWednesday = 1;
  isWednesday.isWednesday = isWednesday$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name isWednesday
   * @category Weekday Helpers
   * @summary Is the given date Wednesday?
   *
   * @description
   * Is the given date Wednesday?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   *
   * @returns The date is Wednesday
   *
   * @example
   * // Is 24 September 2014 Wednesday?
   * const result = isWednesday(new Date(2014, 8, 24))
   * //=> true
   */
  function isWednesday$1(date) {
    return (0, _index.toDate)(date).getDay() === 3;
  }
  return isWednesday;
}

var isWithinInterval = {};

var hasRequiredIsWithinInterval;

function requireIsWithinInterval() {
  if (hasRequiredIsWithinInterval) return isWithinInterval;
  hasRequiredIsWithinInterval = 1;
  isWithinInterval.isWithinInterval = isWithinInterval$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name isWithinInterval
   * @category Interval Helpers
   * @summary Is the given date within the interval?
   *
   * @description
   * Is the given date within the interval? (Including start and end.)
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   * @param interval - The interval to check
   *
   * @returns The date is within the interval
   *
   * @example
   * // For the date within the interval:
   * isWithinInterval(new Date(2014, 0, 3), {
   *   start: new Date(2014, 0, 1),
   *   end: new Date(2014, 0, 7)
   * })
   * //=> true
   *
   * @example
   * // For the date outside of the interval:
   * isWithinInterval(new Date(2014, 0, 10), {
   *   start: new Date(2014, 0, 1),
   *   end: new Date(2014, 0, 7)
   * })
   * //=> false
   *
   * @example
   * // For date equal to interval start:
   * isWithinInterval(date, { start, end: date })
   * // => true
   *
   * @example
   * // For date equal to interval end:
   * isWithinInterval(date, { start: date, end })
   * // => true
   */
  function isWithinInterval$1(date, interval) {
    const time = +(0, _index.toDate)(date);
    const [startTime, endTime] = [+(0, _index.toDate)(interval.start), +(0, _index.toDate)(interval.end)].sort((a, b) => a - b);

    return time >= startTime && time <= endTime;
  }
  return isWithinInterval;
}

var isYesterday = {};

var subDays = {};

var hasRequiredSubDays;

function requireSubDays() {
  if (hasRequiredSubDays) return subDays;
  hasRequiredSubDays = 1;
  subDays.subDays = subDays$1;
  var _index = /*@__PURE__*/ requireAddDays();

  /**
   * @name subDays
   * @category Day Helpers
   * @summary Subtract the specified number of days from the given date.
   *
   * @description
   * Subtract the specified number of days from the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param amount - The amount of days to be subtracted.
   *
   * @returns The new date with the days subtracted
   *
   * @example
   * // Subtract 10 days from 1 September 2014:
   * const result = subDays(new Date(2014, 8, 1), 10)
   * //=> Fri Aug 22 2014 00:00:00
   */
  function subDays$1(date, amount) {
    return (0, _index.addDays)(date, -amount);
  }
  return subDays;
}

var hasRequiredIsYesterday;

function requireIsYesterday() {
  if (hasRequiredIsYesterday) return isYesterday;
  hasRequiredIsYesterday = 1;
  isYesterday.isYesterday = isYesterday$1;
  var _index = /*@__PURE__*/ requireConstructNow();
  var _index2 = /*@__PURE__*/ requireIsSameDay();
  var _index3 = /*@__PURE__*/ requireSubDays();

  /**
   * @name isYesterday
   * @category Day Helpers
   * @summary Is the given date yesterday?
   * @pure false
   *
   * @description
   * Is the given date yesterday?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   *
   * @returns The date is yesterday
   *
   * @example
   * // If today is 6 October 2014, is 5 October 14:00:00 yesterday?
   * const result = isYesterday(new Date(2014, 9, 5, 14, 0))
   * //=> true
   */
  function isYesterday$1(date) {
    return (0, _index2.isSameDay)(date, (0, _index3.subDays)((0, _index.constructNow)(date), 1));
  }
  return isYesterday;
}

var lastDayOfDecade = {};

var hasRequiredLastDayOfDecade;

function requireLastDayOfDecade() {
  if (hasRequiredLastDayOfDecade) return lastDayOfDecade;
  hasRequiredLastDayOfDecade = 1;
  lastDayOfDecade.lastDayOfDecade = lastDayOfDecade$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name lastDayOfDecade
   * @category Decade Helpers
   * @summary Return the last day of a decade for the given date.
   *
   * @description
   * Return the last day of a decade for the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The last day of a decade
   *
   * @example
   * // The last day of a decade for 21 December 2012 21:12:00:
   * const result = lastDayOfDecade(new Date(2012, 11, 21, 21, 12, 00))
   * //=> Wed Dec 31 2019 00:00:00
   */
  function lastDayOfDecade$1(date) {
    // TODO: Switch to more technical definition in of decades that start with 1
    // end with 0. I.e. 2001-2010 instead of current 2000-2009. It's a breaking
    // change, so it can only be done in 4.0.
    const _date = (0, _index.toDate)(date);
    const year = _date.getFullYear();
    const decade = 9 + Math.floor(year / 10) * 10;
    _date.setFullYear(decade + 1, 0, 0);
    _date.setHours(0, 0, 0, 0);
    return _date;
  }
  return lastDayOfDecade;
}

var lastDayOfISOWeek = {};

var lastDayOfWeek = {};

var hasRequiredLastDayOfWeek;

function requireLastDayOfWeek() {
  if (hasRequiredLastDayOfWeek) return lastDayOfWeek;
  hasRequiredLastDayOfWeek = 1;
  lastDayOfWeek.lastDayOfWeek = lastDayOfWeek$1;
  var _index = /*@__PURE__*/ requireToDate();

  var _index2 = /*@__PURE__*/ requireDefaultOptions();

  /**
   * The {@link lastDayOfWeek} function options.
   */

  /**
   * @name lastDayOfWeek
   * @category Week Helpers
   * @summary Return the last day of a week for the given date.
   *
   * @description
   * Return the last day of a week for the given date.
   * The result will be in the local timezone.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   * @param options - An object with options
   *
   * @returns The last day of a week
   *
   * @example
   * // The last day of a week for 2 September 2014 11:55:00:
   * const result = lastDayOfWeek(new Date(2014, 8, 2, 11, 55, 0))
   * //=> Sat Sep 06 2014 00:00:00
   *
   * @example
   * // If the week starts on Monday, the last day of the week for 2 September 2014 11:55:00:
   * const result = lastDayOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
   * //=> Sun Sep 07 2014 00:00:00
   */
  function lastDayOfWeek$1(date, options) {
    const defaultOptions = (0, _index2.getDefaultOptions)();
    const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions.weekStartsOn ?? defaultOptions.locale?.options?.weekStartsOn ?? 0;

    const _date = (0, _index.toDate)(date);
    const day = _date.getDay();
    const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);

    _date.setHours(0, 0, 0, 0);
    _date.setDate(_date.getDate() + diff);
    return _date;
  }
  return lastDayOfWeek;
}

var hasRequiredLastDayOfISOWeek;

function requireLastDayOfISOWeek() {
  if (hasRequiredLastDayOfISOWeek) return lastDayOfISOWeek;
  hasRequiredLastDayOfISOWeek = 1;
  lastDayOfISOWeek.lastDayOfISOWeek = lastDayOfISOWeek$1;
  var _index = /*@__PURE__*/ requireLastDayOfWeek();

  /**
   * @name lastDayOfISOWeek
   * @category ISO Week Helpers
   * @summary Return the last day of an ISO week for the given date.
   *
   * @description
   * Return the last day of an ISO week for the given date.
   * The result will be in the local timezone.
   *
   * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The last day of an ISO week
   *
   * @example
   * // The last day of an ISO week for 2 September 2014 11:55:00:
   * const result = lastDayOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
   * //=> Sun Sep 07 2014 00:00:00
   */
  function lastDayOfISOWeek$1(date) {
    return (0, _index.lastDayOfWeek)(date, { weekStartsOn: 1 });
  }
  return lastDayOfISOWeek;
}

var lastDayOfISOWeekYear = {};

var hasRequiredLastDayOfISOWeekYear;

function requireLastDayOfISOWeekYear() {
  if (hasRequiredLastDayOfISOWeekYear) return lastDayOfISOWeekYear;
  hasRequiredLastDayOfISOWeekYear = 1;
  lastDayOfISOWeekYear.lastDayOfISOWeekYear = lastDayOfISOWeekYear$1;
  var _index = /*@__PURE__*/ requireGetISOWeekYear();
  var _index2 = /*@__PURE__*/ requireStartOfISOWeek();
  var _index3 = /*@__PURE__*/ requireConstructFrom();

  /**
   * @name lastDayOfISOWeekYear
   * @category ISO Week-Numbering Year Helpers
   * @summary Return the last day of an ISO week-numbering year for the given date.
   *
   * @description
   * Return the last day of an ISO week-numbering year,
   * which always starts 3 days before the year's first Thursday.
   * The result will be in the local timezone.
   *
   * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The end of an ISO week-numbering year
   *
   * @example
   * // The last day of an ISO week-numbering year for 2 July 2005:
   * const result = lastDayOfISOWeekYear(new Date(2005, 6, 2))
   * //=> Sun Jan 01 2006 00:00:00
   */
  function lastDayOfISOWeekYear$1(date) {
    const year = (0, _index.getISOWeekYear)(date);
    const fourthOfJanuary = (0, _index3.constructFrom)(date, 0);
    fourthOfJanuary.setFullYear(year + 1, 0, 4);
    fourthOfJanuary.setHours(0, 0, 0, 0);
    const _date = (0, _index2.startOfISOWeek)(fourthOfJanuary);
    _date.setDate(_date.getDate() - 1);
    return _date;
  }
  return lastDayOfISOWeekYear;
}

var lastDayOfQuarter = {};

var hasRequiredLastDayOfQuarter;

function requireLastDayOfQuarter() {
  if (hasRequiredLastDayOfQuarter) return lastDayOfQuarter;
  hasRequiredLastDayOfQuarter = 1;
  lastDayOfQuarter.lastDayOfQuarter = lastDayOfQuarter$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name lastDayOfQuarter
   * @category Quarter Helpers
   * @summary Return the last day of a year quarter for the given date.
   *
   * @description
   * Return the last day of a year quarter for the given date.
   * The result will be in the local timezone.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The last day of a quarter
   *
   * @example
   * // The last day of a quarter for 2 September 2014 11:55:00:
   * const result = lastDayOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
   * //=> Tue Sep 30 2014 00:00:00
   */
  function lastDayOfQuarter$1(date) {
    const _date = (0, _index.toDate)(date);
    const currentMonth = _date.getMonth();
    const month = currentMonth - (currentMonth % 3) + 3;
    _date.setMonth(month, 0);
    _date.setHours(0, 0, 0, 0);
    return _date;
  }
  return lastDayOfQuarter;
}

var lastDayOfYear = {};

var hasRequiredLastDayOfYear;

function requireLastDayOfYear() {
  if (hasRequiredLastDayOfYear) return lastDayOfYear;
  hasRequiredLastDayOfYear = 1;
  lastDayOfYear.lastDayOfYear = lastDayOfYear$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name lastDayOfYear
   * @category Year Helpers
   * @summary Return the last day of a year for the given date.
   *
   * @description
   * Return the last day of a year for the given date.
   * The result will be in the local timezone.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The last day of a year
   *
   * @example
   * // The last day of a year for 2 September 2014 11:55:00:
   * const result = lastDayOfYear(new Date(2014, 8, 2, 11, 55, 00))
   * //=> Wed Dec 31 2014 00:00:00
   */
  function lastDayOfYear$1(date) {
    const _date = (0, _index.toDate)(date);
    const year = _date.getFullYear();
    _date.setFullYear(year + 1, 0, 0);
    _date.setHours(0, 0, 0, 0);
    return _date;
  }
  return lastDayOfYear;
}

var lightFormat = {};

var hasRequiredLightFormat;

function requireLightFormat() {
  if (hasRequiredLightFormat) return lightFormat;
  hasRequiredLightFormat = 1;
  (function (exports) {
    exports.lightFormat = lightFormat;
    Object.defineProperty(exports, 'lightFormatters', {
      enumerable: true,
      get: function () {
        return _index3.lightFormatters;
      },
    });
    var _index = /*@__PURE__*/ requireIsValid();
    var _index2 = /*@__PURE__*/ requireToDate();
    var _index3 = /*@__PURE__*/ requireLightFormatters();

    // Rexports of internal for libraries to use.
    // See: https://github.com/date-fns/date-fns/issues/3638#issuecomment-1877082874

    // This RegExp consists of three parts separated by `|`:
    // - (\w)\1* matches any sequences of the same letter
    // - '' matches two quote characters in a row
    // - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
    //   except a single quote symbol, which ends the sequence.
    //   Two quote characters do not end the sequence.
    //   If there is no matching single quote
    //   then the sequence will continue until the end of the string.
    // - . matches any single character unmatched by previous parts of the RegExps
    const formattingTokensRegExp = /(\w)\1*|''|'(''|[^'])+('|$)|./g;

    const escapedStringRegExp = /^'([^]*?)'?$/;
    const doubleQuoteRegExp = /''/g;
    const unescapedLatinCharacterRegExp = /[a-zA-Z]/;

    /**
     * @private
     */

    /**
     * @name lightFormat
     * @category Common Helpers
     * @summary Format the date.
     *
     * @description
     * Return the formatted date string in the given format. Unlike `format`,
     * `lightFormat` doesn't use locales and outputs date using the most popular tokens.
     *
     * > ⚠️ Please note that the `lightFormat` tokens differ from Moment.js and other libraries.
     * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     *
     * The characters wrapped between two single quotes characters (') are escaped.
     * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
     *
     * Format of the string is based on Unicode Technical Standard #35:
     * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
     *
     * Accepted patterns:
     * | Unit                            | Pattern | Result examples                   |
     * |---------------------------------|---------|-----------------------------------|
     * | AM, PM                          | a..aaa  | AM, PM                            |
     * |                                 | aaaa    | a.m., p.m.                        |
     * |                                 | aaaaa   | a, p                              |
     * | Calendar year                   | y       | 44, 1, 1900, 2017                 |
     * |                                 | yy      | 44, 01, 00, 17                    |
     * |                                 | yyy     | 044, 001, 000, 017                |
     * |                                 | yyyy    | 0044, 0001, 1900, 2017            |
     * | Month (formatting)              | M       | 1, 2, ..., 12                     |
     * |                                 | MM      | 01, 02, ..., 12                   |
     * | Day of month                    | d       | 1, 2, ..., 31                     |
     * |                                 | dd      | 01, 02, ..., 31                   |
     * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |
     * |                                 | hh      | 01, 02, ..., 11, 12               |
     * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |
     * |                                 | HH      | 00, 01, 02, ..., 23               |
     * | Minute                          | m       | 0, 1, ..., 59                     |
     * |                                 | mm      | 00, 01, ..., 59                   |
     * | Second                          | s       | 0, 1, ..., 59                     |
     * |                                 | ss      | 00, 01, ..., 59                   |
     * | Fraction of second              | S       | 0, 1, ..., 9                      |
     * |                                 | SS      | 00, 01, ..., 99                   |
     * |                                 | SSS     | 000, 001, ..., 999                |
     * |                                 | SSSS    | ...                               |
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The original date
     * @param format - The string of tokens
     *
     * @returns The formatted date string
     *
     * @throws `Invalid time value` if the date is invalid
     * @throws format string contains an unescaped latin alphabet character
     *
     * @example
     * const result = lightFormat(new Date(2014, 1, 11), 'yyyy-MM-dd')
     * //=> '2014-02-11'
     */
    function lightFormat(date, formatStr) {
      const _date = (0, _index2.toDate)(date);

      if (!(0, _index.isValid)(_date)) {
        throw new RangeError('Invalid time value');
      }

      const tokens = formatStr.match(formattingTokensRegExp);

      // The only case when formattingTokensRegExp doesn't match the string is when it's empty
      if (!tokens) return '';

      const result = tokens
        .map(substring => {
          // Replace two single quote characters with one single quote character
          if (substring === "''") {
            return "'";
          }

          const firstCharacter = substring[0];
          if (firstCharacter === "'") {
            return cleanEscapedString(substring);
          }

          const formatter = _index3.lightFormatters[firstCharacter];
          if (formatter) {
            return formatter(_date, substring);
          }

          if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
            throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
          }

          return substring;
        })
        .join('');

      return result;
    }

    function cleanEscapedString(input) {
      const matches = input.match(escapedStringRegExp);

      if (!matches) {
        return input;
      }

      return matches[1].replace(doubleQuoteRegExp, "'");
    }
  })(lightFormat);
  return lightFormat;
}

var milliseconds = {};

var hasRequiredMilliseconds;

function requireMilliseconds() {
  if (hasRequiredMilliseconds) return milliseconds;
  hasRequiredMilliseconds = 1;
  milliseconds.milliseconds = milliseconds$1;
  var _index = /*@__PURE__*/ requireConstants$1();

  /**
   * @name milliseconds
   * @category Millisecond Helpers
   * @summary
   * Returns the number of milliseconds in the specified, years, months, weeks, days, hours, minutes and seconds.
   *
   * @description
   * Returns the number of milliseconds in the specified, years, months, weeks, days, hours, minutes and seconds.
   *
   * One years equals 365.2425 days according to the formula:
   *
   * > Leap year occures every 4 years, except for years that are divisable by 100 and not divisable by 400.
   * > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
   *
   * One month is a year divided by 12.
   *
   * @param duration - The object with years, months, weeks, days, hours, minutes and seconds to be added.
   *
   * @returns The milliseconds
   *
   * @example
   * // 1 year in milliseconds
   * milliseconds({ years: 1 })
   * //=> 31556952000
   *
   * // 3 months in milliseconds
   * milliseconds({ months: 3 })
   * //=> 7889238000
   */
  function milliseconds$1({ years, months, weeks, days, hours, minutes, seconds }) {
    let totalDays = 0;

    if (years) totalDays += years * _index.daysInYear;
    if (months) totalDays += months * (_index.daysInYear / 12);
    if (weeks) totalDays += weeks * 7;
    if (days) totalDays += days;

    let totalSeconds = totalDays * 24 * 60 * 60;

    if (hours) totalSeconds += hours * 60 * 60;
    if (minutes) totalSeconds += minutes * 60;
    if (seconds) totalSeconds += seconds;

    return Math.trunc(totalSeconds * 1000);
  }
  return milliseconds;
}

var millisecondsToHours = {};

var hasRequiredMillisecondsToHours;

function requireMillisecondsToHours() {
  if (hasRequiredMillisecondsToHours) return millisecondsToHours;
  hasRequiredMillisecondsToHours = 1;
  millisecondsToHours.millisecondsToHours = millisecondsToHours$1;
  var _index = /*@__PURE__*/ requireConstants$1();

  /**
   * @name millisecondsToHours
   * @category Conversion Helpers
   * @summary Convert milliseconds to hours.
   *
   * @description
   * Convert a number of milliseconds to a full number of hours.
   *
   * @param milliseconds - The number of milliseconds to be converted
   *
   * @returns The number of milliseconds converted in hours
   *
   * @example
   * // Convert 7200000 milliseconds to hours:
   * const result = millisecondsToHours(7200000)
   * //=> 2
   *
   * @example
   * // It uses floor rounding:
   * const result = millisecondsToHours(7199999)
   * //=> 1
   */
  function millisecondsToHours$1(milliseconds) {
    const hours = milliseconds / _index.millisecondsInHour;
    return Math.trunc(hours);
  }
  return millisecondsToHours;
}

var millisecondsToMinutes = {};

var hasRequiredMillisecondsToMinutes;

function requireMillisecondsToMinutes() {
  if (hasRequiredMillisecondsToMinutes) return millisecondsToMinutes;
  hasRequiredMillisecondsToMinutes = 1;
  millisecondsToMinutes.millisecondsToMinutes = millisecondsToMinutes$1;
  var _index = /*@__PURE__*/ requireConstants$1();

  /**
   * @name millisecondsToMinutes
   * @category Conversion Helpers
   * @summary Convert milliseconds to minutes.
   *
   * @description
   * Convert a number of milliseconds to a full number of minutes.
   *
   * @param milliseconds - The number of milliseconds to be converted
   *
   * @returns The number of milliseconds converted in minutes
   *
   * @example
   * // Convert 60000 milliseconds to minutes:
   * const result = millisecondsToMinutes(60000)
   * //=> 1
   *
   * @example
   * // It uses floor rounding:
   * const result = millisecondsToMinutes(119999)
   * //=> 1
   */
  function millisecondsToMinutes$1(milliseconds) {
    const minutes = milliseconds / _index.millisecondsInMinute;
    return Math.trunc(minutes);
  }
  return millisecondsToMinutes;
}

var millisecondsToSeconds = {};

var hasRequiredMillisecondsToSeconds;

function requireMillisecondsToSeconds() {
  if (hasRequiredMillisecondsToSeconds) return millisecondsToSeconds;
  hasRequiredMillisecondsToSeconds = 1;
  millisecondsToSeconds.millisecondsToSeconds = millisecondsToSeconds$1;
  var _index = /*@__PURE__*/ requireConstants$1();

  /**
   * @name millisecondsToSeconds
   * @category Conversion Helpers
   * @summary Convert milliseconds to seconds.
   *
   * @description
   * Convert a number of milliseconds to a full number of seconds.
   *
   * @param milliseconds - The number of milliseconds to be converted
   *
   * @returns The number of milliseconds converted in seconds
   *
   * @example
   * // Convert 1000 miliseconds to seconds:
   * const result = millisecondsToSeconds(1000)
   * //=> 1
   *
   * @example
   * // It uses floor rounding:
   * const result = millisecondsToSeconds(1999)
   * //=> 1
   */
  function millisecondsToSeconds$1(milliseconds) {
    const seconds = milliseconds / _index.millisecondsInSecond;
    return Math.trunc(seconds);
  }
  return millisecondsToSeconds;
}

var minutesToHours = {};

var hasRequiredMinutesToHours;

function requireMinutesToHours() {
  if (hasRequiredMinutesToHours) return minutesToHours;
  hasRequiredMinutesToHours = 1;
  minutesToHours.minutesToHours = minutesToHours$1;
  var _index = /*@__PURE__*/ requireConstants$1();

  /**
   * @name minutesToHours
   * @category Conversion Helpers
   * @summary Convert minutes to hours.
   *
   * @description
   * Convert a number of minutes to a full number of hours.
   *
   * @param minutes - The number of minutes to be converted
   *
   * @returns The number of minutes converted in hours
   *
   * @example
   * // Convert 140 minutes to hours:
   * const result = minutesToHours(120)
   * //=> 2
   *
   * @example
   * // It uses floor rounding:
   * const result = minutesToHours(179)
   * //=> 2
   */
  function minutesToHours$1(minutes) {
    const hours = minutes / _index.minutesInHour;
    return Math.trunc(hours);
  }
  return minutesToHours;
}

var minutesToMilliseconds = {};

var hasRequiredMinutesToMilliseconds;

function requireMinutesToMilliseconds() {
  if (hasRequiredMinutesToMilliseconds) return minutesToMilliseconds;
  hasRequiredMinutesToMilliseconds = 1;
  minutesToMilliseconds.minutesToMilliseconds = minutesToMilliseconds$1;
  var _index = /*@__PURE__*/ requireConstants$1();

  /**
   * @name minutesToMilliseconds
   * @category Conversion Helpers
   * @summary Convert minutes to milliseconds.
   *
   * @description
   * Convert a number of minutes to a full number of milliseconds.
   *
   * @param minutes - The number of minutes to be converted
   *
   * @returns The number of minutes converted in milliseconds
   *
   * @example
   * // Convert 2 minutes to milliseconds
   * const result = minutesToMilliseconds(2)
   * //=> 120000
   */
  function minutesToMilliseconds$1(minutes) {
    return Math.trunc(minutes * _index.millisecondsInMinute);
  }
  return minutesToMilliseconds;
}

var minutesToSeconds = {};

var hasRequiredMinutesToSeconds;

function requireMinutesToSeconds() {
  if (hasRequiredMinutesToSeconds) return minutesToSeconds;
  hasRequiredMinutesToSeconds = 1;
  minutesToSeconds.minutesToSeconds = minutesToSeconds$1;
  var _index = /*@__PURE__*/ requireConstants$1();

  /**
   * @name minutesToSeconds
   * @category Conversion Helpers
   * @summary Convert minutes to seconds.
   *
   * @description
   * Convert a number of minutes to a full number of seconds.
   *
   * @param minutes - The number of minutes to be converted
   *
   * @returns The number of minutes converted in seconds
   *
   * @example
   * // Convert 2 minutes to seconds
   * const result = minutesToSeconds(2)
   * //=> 120
   */
  function minutesToSeconds$1(minutes) {
    return Math.trunc(minutes * _index.secondsInMinute);
  }
  return minutesToSeconds;
}

var monthsToQuarters = {};

var hasRequiredMonthsToQuarters;

function requireMonthsToQuarters() {
  if (hasRequiredMonthsToQuarters) return monthsToQuarters;
  hasRequiredMonthsToQuarters = 1;
  monthsToQuarters.monthsToQuarters = monthsToQuarters$1;
  var _index = /*@__PURE__*/ requireConstants$1();

  /**
   * @name monthsToQuarters
   * @category Conversion Helpers
   * @summary Convert number of months to quarters.
   *
   * @description
   * Convert a number of months to a full number of quarters.
   *
   * @param months - The number of months to be converted.
   *
   * @returns The number of months converted in quarters
   *
   * @example
   * // Convert 6 months to quarters:
   * const result = monthsToQuarters(6)
   * //=> 2
   *
   * @example
   * // It uses floor rounding:
   * const result = monthsToQuarters(7)
   * //=> 2
   */
  function monthsToQuarters$1(months) {
    const quarters = months / _index.monthsInQuarter;
    return Math.trunc(quarters);
  }
  return monthsToQuarters;
}

var monthsToYears = {};

var hasRequiredMonthsToYears;

function requireMonthsToYears() {
  if (hasRequiredMonthsToYears) return monthsToYears;
  hasRequiredMonthsToYears = 1;
  monthsToYears.monthsToYears = monthsToYears$1;
  var _index = /*@__PURE__*/ requireConstants$1();

  /**
   * @name monthsToYears
   * @category Conversion Helpers
   * @summary Convert number of months to years.
   *
   * @description
   * Convert a number of months to a full number of years.
   *
   * @param months - The number of months to be converted
   *
   * @returns The number of months converted in years
   *
   * @example
   * // Convert 36 months to years:
   * const result = monthsToYears(36)
   * //=> 3
   *
   * // It uses floor rounding:
   * const result = monthsToYears(40)
   * //=> 3
   */
  function monthsToYears$1(months) {
    const years = months / _index.monthsInYear;
    return Math.trunc(years);
  }
  return monthsToYears;
}

var nextDay = {};

var hasRequiredNextDay;

function requireNextDay() {
  if (hasRequiredNextDay) return nextDay;
  hasRequiredNextDay = 1;
  nextDay.nextDay = nextDay$1;
  var _index = /*@__PURE__*/ requireAddDays();
  var _index2 = /*@__PURE__*/ requireGetDay();

  /**
   * @name nextDay
   * @category Weekday Helpers
   * @summary When is the next day of the week?
   *
   * @description
   * When is the next day of the week? 0-6 the day of the week, 0 represents Sunday.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   * @param day - day of the week
   *
   * @returns The date is the next day of week
   *
   * @example
   * // When is the next Monday after Mar, 20, 2020?
   * const result = nextDay(new Date(2020, 2, 20), 1)
   * //=> Mon Mar 23 2020 00:00:00
   *
   * @example
   * // When is the next Tuesday after Mar, 21, 2020?
   * const result = nextDay(new Date(2020, 2, 21), 2)
   * //=> Tue Mar 24 2020 00:00:00
   */
  function nextDay$1(date, day) {
    let delta = day - (0, _index2.getDay)(date);
    if (delta <= 0) delta += 7;

    return (0, _index.addDays)(date, delta);
  }
  return nextDay;
}

var nextFriday = {};

var hasRequiredNextFriday;

function requireNextFriday() {
  if (hasRequiredNextFriday) return nextFriday;
  hasRequiredNextFriday = 1;
  nextFriday.nextFriday = nextFriday$1;
  var _index = /*@__PURE__*/ requireNextDay();

  /**
   * @name nextFriday
   * @category Weekday Helpers
   * @summary When is the next Friday?
   *
   * @description
   * When is the next Friday?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to start counting from
   *
   * @returns The next Friday
   *
   * @example
   * // When is the next Friday after Mar, 22, 2020?
   * const result = nextFriday(new Date(2020, 2, 22))
   * //=> Fri Mar 27 2020 00:00:00
   */
  function nextFriday$1(date) {
    return (0, _index.nextDay)(date, 5);
  }
  return nextFriday;
}

var nextMonday = {};

var hasRequiredNextMonday;

function requireNextMonday() {
  if (hasRequiredNextMonday) return nextMonday;
  hasRequiredNextMonday = 1;
  nextMonday.nextMonday = nextMonday$1;
  var _index = /*@__PURE__*/ requireNextDay();

  /**
   * @name nextMonday
   * @category Weekday Helpers
   * @summary When is the next Monday?
   *
   * @description
   * When is the next Monday?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to start counting from
   *
   * @returns The next Monday
   *
   * @example
   * // When is the next Monday after Mar, 22, 2020?
   * const result = nextMonday(new Date(2020, 2, 22))
   * //=> Mon Mar 23 2020 00:00:00
   */
  function nextMonday$1(date) {
    return (0, _index.nextDay)(date, 1);
  }
  return nextMonday;
}

var nextSaturday = {};

var hasRequiredNextSaturday;

function requireNextSaturday() {
  if (hasRequiredNextSaturday) return nextSaturday;
  hasRequiredNextSaturday = 1;
  nextSaturday.nextSaturday = nextSaturday$1;
  var _index = /*@__PURE__*/ requireNextDay();

  /**
   * @name nextSaturday
   * @category Weekday Helpers
   * @summary When is the next Saturday?
   *
   * @description
   * When is the next Saturday?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to start counting from
   *
   * @returns The next Saturday
   *
   * @example
   * // When is the next Saturday after Mar, 22, 2020?
   * const result = nextSaturday(new Date(2020, 2, 22))
   * //=> Sat Mar 28 2020 00:00:00
   */
  function nextSaturday$1(date) {
    return (0, _index.nextDay)(date, 6);
  }
  return nextSaturday;
}

var nextSunday = {};

var hasRequiredNextSunday;

function requireNextSunday() {
  if (hasRequiredNextSunday) return nextSunday;
  hasRequiredNextSunday = 1;
  nextSunday.nextSunday = nextSunday$1;
  var _index = /*@__PURE__*/ requireNextDay();

  /**
   * @name nextSunday
   * @category Weekday Helpers
   * @summary When is the next Sunday?
   *
   * @description
   * When is the next Sunday?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to start counting from
   *
   * @returns The next Sunday
   *
   * @example
   * // When is the next Sunday after Mar, 22, 2020?
   * const result = nextSunday(new Date(2020, 2, 22))
   * //=> Sun Mar 29 2020 00:00:00
   */
  function nextSunday$1(date) {
    return (0, _index.nextDay)(date, 0);
  }
  return nextSunday;
}

var nextThursday = {};

var hasRequiredNextThursday;

function requireNextThursday() {
  if (hasRequiredNextThursday) return nextThursday;
  hasRequiredNextThursday = 1;
  nextThursday.nextThursday = nextThursday$1;
  var _index = /*@__PURE__*/ requireNextDay();

  /**
   * @name nextThursday
   * @category Weekday Helpers
   * @summary When is the next Thursday?
   *
   * @description
   * When is the next Thursday?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to start counting from
   *
   * @returns The next Thursday
   *
   * @example
   * // When is the next Thursday after Mar, 22, 2020?
   * const result = nextThursday(new Date(2020, 2, 22))
   * //=> Thur Mar 26 2020 00:00:00
   */
  function nextThursday$1(date) {
    return (0, _index.nextDay)(date, 4);
  }
  return nextThursday;
}

var nextTuesday = {};

var hasRequiredNextTuesday;

function requireNextTuesday() {
  if (hasRequiredNextTuesday) return nextTuesday;
  hasRequiredNextTuesday = 1;
  nextTuesday.nextTuesday = nextTuesday$1;
  var _index = /*@__PURE__*/ requireNextDay();

  /**
   * @name nextTuesday
   * @category Weekday Helpers
   * @summary When is the next Tuesday?
   *
   * @description
   * When is the next Tuesday?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to start counting from
   *
   * @returns The next Tuesday
   *
   * @example
   * // When is the next Tuesday after Mar, 22, 2020?
   * const result = nextTuesday(new Date(2020, 2, 22))
   * //=> Tue Mar 24 2020 00:00:00
   */
  function nextTuesday$1(date) {
    return (0, _index.nextDay)(date, 2);
  }
  return nextTuesday;
}

var nextWednesday = {};

var hasRequiredNextWednesday;

function requireNextWednesday() {
  if (hasRequiredNextWednesday) return nextWednesday;
  hasRequiredNextWednesday = 1;
  nextWednesday.nextWednesday = nextWednesday$1;
  var _index = /*@__PURE__*/ requireNextDay();

  /**
   * @name nextWednesday
   * @category Weekday Helpers
   * @summary When is the next Wednesday?
   *
   * @description
   * When is the next Wednesday?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to start counting from
   *
   * @returns The next Wednesday
   *
   * @example
   * // When is the next Wednesday after Mar, 22, 2020?
   * const result = nextWednesday(new Date(2020, 2, 22))
   * //=> Wed Mar 25 2020 00:00:00
   */
  function nextWednesday$1(date) {
    return (0, _index.nextDay)(date, 3);
  }
  return nextWednesday;
}

var parseISO = {};

var hasRequiredParseISO;

function requireParseISO() {
  if (hasRequiredParseISO) return parseISO;
  hasRequiredParseISO = 1;
  parseISO.parseISO = parseISO$1;
  var _index = /*@__PURE__*/ requireConstants$1();

  /**
   * The {@link parseISO} function options.
   */

  /**
   * @name parseISO
   * @category Common Helpers
   * @summary Parse ISO string
   *
   * @description
   * Parse the given string in ISO 8601 format and return an instance of Date.
   *
   * Function accepts complete ISO 8601 formats as well as partial implementations.
   * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
   *
   * If the argument isn't a string, the function cannot parse the string or
   * the values are invalid, it returns Invalid Date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param argument - The value to convert
   * @param options - An object with options
   *
   * @returns The parsed date in the local time zone
   *
   * @example
   * // Convert string '2014-02-11T11:30:30' to date:
   * const result = parseISO('2014-02-11T11:30:30')
   * //=> Tue Feb 11 2014 11:30:30
   *
   * @example
   * // Convert string '+02014101' to date,
   * // if the additional number of digits in the extended year format is 1:
   * const result = parseISO('+02014101', { additionalDigits: 1 })
   * //=> Fri Apr 11 2014 00:00:00
   */
  function parseISO$1(argument, options) {
    const additionalDigits = options?.additionalDigits ?? 2;
    const dateStrings = splitDateString(argument);

    let date;
    if (dateStrings.date) {
      const parseYearResult = parseYear(dateStrings.date, additionalDigits);
      date = parseDate(parseYearResult.restDateString, parseYearResult.year);
    }

    if (!date || isNaN(date.getTime())) {
      return new Date(NaN);
    }

    const timestamp = date.getTime();
    let time = 0;
    let offset;

    if (dateStrings.time) {
      time = parseTime(dateStrings.time);
      if (isNaN(time)) {
        return new Date(NaN);
      }
    }

    if (dateStrings.timezone) {
      offset = parseTimezone(dateStrings.timezone);
      if (isNaN(offset)) {
        return new Date(NaN);
      }
    } else {
      const dirtyDate = new Date(timestamp + time);
      // JS parsed string assuming it's in UTC timezone
      // but we need it to be parsed in our timezone
      // so we use utc values to build date in our timezone.
      // Year values from 0 to 99 map to the years 1900 to 1999
      // so set year explicitly with setFullYear.
      const result = new Date(0);
      result.setFullYear(dirtyDate.getUTCFullYear(), dirtyDate.getUTCMonth(), dirtyDate.getUTCDate());
      result.setHours(dirtyDate.getUTCHours(), dirtyDate.getUTCMinutes(), dirtyDate.getUTCSeconds(), dirtyDate.getUTCMilliseconds());
      return result;
    }

    return new Date(timestamp + time + offset);
  }

  const patterns = {
    dateTimeDelimiter: /[T ]/,
    timeZoneDelimiter: /[Z ]/i,
    timezone: /([Z+-].*)$/,
  };

  const dateRegex = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
  const timeRegex = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
  const timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;

  function splitDateString(dateString) {
    const dateStrings = {};
    const array = dateString.split(patterns.dateTimeDelimiter);
    let timeString;

    // The regex match should only return at maximum two array elements.
    // [date], [time], or [date, time].
    if (array.length > 2) {
      return dateStrings;
    }

    if (/:/.test(array[0])) {
      timeString = array[0];
    } else {
      dateStrings.date = array[0];
      timeString = array[1];
      if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
        dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
        timeString = dateString.substr(dateStrings.date.length, dateString.length);
      }
    }

    if (timeString) {
      const token = patterns.timezone.exec(timeString);
      if (token) {
        dateStrings.time = timeString.replace(token[1], '');
        dateStrings.timezone = token[1];
      } else {
        dateStrings.time = timeString;
      }
    }

    return dateStrings;
  }

  function parseYear(dateString, additionalDigits) {
    const regex = new RegExp('^(?:(\\d{4}|[+-]\\d{' + (4 + additionalDigits) + '})|(\\d{2}|[+-]\\d{' + (2 + additionalDigits) + '})$)');

    const captures = dateString.match(regex);
    // Invalid ISO-formatted year
    if (!captures) return { year: NaN, restDateString: '' };

    const year = captures[1] ? parseInt(captures[1]) : null;
    const century = captures[2] ? parseInt(captures[2]) : null;

    // either year or century is null, not both
    return {
      year: century === null ? year : century * 100,
      restDateString: dateString.slice((captures[1] || captures[2]).length),
    };
  }

  function parseDate(dateString, year) {
    // Invalid ISO-formatted year
    if (year === null) return new Date(NaN);

    const captures = dateString.match(dateRegex);
    // Invalid ISO-formatted string
    if (!captures) return new Date(NaN);

    const isWeekDate = !!captures[4];
    const dayOfYear = parseDateUnit(captures[1]);
    const month = parseDateUnit(captures[2]) - 1;
    const day = parseDateUnit(captures[3]);
    const week = parseDateUnit(captures[4]);
    const dayOfWeek = parseDateUnit(captures[5]) - 1;

    if (isWeekDate) {
      if (!validateWeekDate(year, week, dayOfWeek)) {
        return new Date(NaN);
      }
      return dayOfISOWeekYear(year, week, dayOfWeek);
    } else {
      const date = new Date(0);
      if (!validateDate(year, month, day) || !validateDayOfYearDate(year, dayOfYear)) {
        return new Date(NaN);
      }
      date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
      return date;
    }
  }

  function parseDateUnit(value) {
    return value ? parseInt(value) : 1;
  }

  function parseTime(timeString) {
    const captures = timeString.match(timeRegex);
    if (!captures) return NaN; // Invalid ISO-formatted time

    const hours = parseTimeUnit(captures[1]);
    const minutes = parseTimeUnit(captures[2]);
    const seconds = parseTimeUnit(captures[3]);

    if (!validateTime(hours, minutes, seconds)) {
      return NaN;
    }

    return hours * _index.millisecondsInHour + minutes * _index.millisecondsInMinute + seconds * 1000;
  }

  function parseTimeUnit(value) {
    return (value && parseFloat(value.replace(',', '.'))) || 0;
  }

  function parseTimezone(timezoneString) {
    if (timezoneString === 'Z') return 0;

    const captures = timezoneString.match(timezoneRegex);
    if (!captures) return 0;

    const sign = captures[1] === '+' ? -1 : 1;
    const hours = parseInt(captures[2]);
    const minutes = (captures[3] && parseInt(captures[3])) || 0;

    if (!validateTimezone(hours, minutes)) {
      return NaN;
    }

    return sign * (hours * _index.millisecondsInHour + minutes * _index.millisecondsInMinute);
  }

  function dayOfISOWeekYear(isoWeekYear, week, day) {
    const date = new Date(0);
    date.setUTCFullYear(isoWeekYear, 0, 4);
    const fourthOfJanuaryDay = date.getUTCDay() || 7;
    const diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
    date.setUTCDate(date.getUTCDate() + diff);
    return date;
  }

  // Validation functions

  // February is null to handle the leap year (using ||)
  const daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  function isLeapYearIndex(year) {
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
  }

  function validateDate(year, month, date) {
    return month >= 0 && month <= 11 && date >= 1 && date <= (daysInMonths[month] || (isLeapYearIndex(year) ? 29 : 28));
  }

  function validateDayOfYearDate(year, dayOfYear) {
    return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year) ? 366 : 365);
  }

  function validateWeekDate(_year, week, day) {
    return week >= 1 && week <= 53 && day >= 0 && day <= 6;
  }

  function validateTime(hours, minutes, seconds) {
    if (hours === 24) {
      return minutes === 0 && seconds === 0;
    }

    return seconds >= 0 && seconds < 60 && minutes >= 0 && minutes < 60 && hours >= 0 && hours < 25;
  }

  function validateTimezone(_hours, minutes) {
    return minutes >= 0 && minutes <= 59;
  }
  return parseISO;
}

var parseJSON = {};

var hasRequiredParseJSON;

function requireParseJSON() {
  if (hasRequiredParseJSON) return parseJSON;
  hasRequiredParseJSON = 1;
  parseJSON.parseJSON = parseJSON$1; /**
   * @name parseJSON
   * @category Common Helpers
   * @summary Parse a JSON date string
   *
   * @description
   * Converts a complete ISO date string in UTC time, the typical format for transmitting
   * a date in JSON, to a JavaScript `Date` instance.
   *
   * This is a minimal implementation for converting dates retrieved from a JSON API to
   * a `Date` instance which can be used with other functions in the `date-fns` library.
   * The following formats are supported:
   *
   * - `2000-03-15T05:20:10.123Z`: The output of `.toISOString()` and `JSON.stringify(new Date())`
   * - `2000-03-15T05:20:10Z`: Without milliseconds
   * - `2000-03-15T05:20:10+00:00`: With a zero offset, the default JSON encoded format in some other languages
   * - `2000-03-15T05:20:10+05:45`: With a positive or negative offset, the default JSON encoded format in some other languages
   * - `2000-03-15T05:20:10+0000`: With a zero offset without a colon
   * - `2000-03-15T05:20:10`: Without a trailing 'Z' symbol
   * - `2000-03-15T05:20:10.1234567`: Up to 7 digits in milliseconds field. Only first 3 are taken into account since JS does not allow fractional milliseconds
   * - `2000-03-15 05:20:10`: With a space instead of a 'T' separator for APIs returning a SQL date without reformatting
   *
   * For convenience and ease of use these other input types are also supported
   * via [toDate](https://date-fns.org/docs/toDate):
   *
   * - A `Date` instance will be cloned
   * - A `number` will be treated as a timestamp
   *
   * Any other input type or invalid date strings will return an `Invalid Date`.
   *
   * @param dateStr - A fully formed ISO8601 date string to convert
   *
   * @returns The parsed date in the local time zone
   */
  function parseJSON$1(dateStr) {
    const parts = dateStr.match(/(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(?:\.(\d{0,7}))?(?:Z|(.)(\d{2}):?(\d{2})?)?/);
    if (parts) {
      // Group 8 matches the sign
      return new Date(
        Date.UTC(
          +parts[1],
          +parts[2] - 1,
          +parts[3],
          +parts[4] - (+parts[9] || 0) * (parts[8] == '-' ? -1 : 1),
          +parts[5] - (+parts[10] || 0) * (parts[8] == '-' ? -1 : 1),
          +parts[6],
          +((parts[7] || '0') + '00').substring(0, 3),
        ),
      );
    }
    return new Date(NaN);
  }
  return parseJSON;
}

var previousDay = {};

var hasRequiredPreviousDay;

function requirePreviousDay() {
  if (hasRequiredPreviousDay) return previousDay;
  hasRequiredPreviousDay = 1;
  previousDay.previousDay = previousDay$1;
  var _index = /*@__PURE__*/ requireGetDay();
  var _index2 = /*@__PURE__*/ requireSubDays();

  /**
   * @name previousDay
   * @category Weekday Helpers
   * @summary When is the previous day of the week?
   *
   * @description
   * When is the previous day of the week? 0-6 the day of the week, 0 represents Sunday.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to check
   * @param day - The day of the week
   *
   * @returns The date is the previous day of week
   *
   * @example
   * // When is the previous Monday before Mar, 20, 2020?
   * const result = previousDay(new Date(2020, 2, 20), 1)
   * //=> Mon Mar 16 2020 00:00:00
   *
   * @example
   * // When is the previous Tuesday before Mar, 21, 2020?
   * const result = previousDay(new Date(2020, 2, 21), 2)
   * //=> Tue Mar 17 2020 00:00:00
   */
  function previousDay$1(date, day) {
    let delta = (0, _index.getDay)(date) - day;
    if (delta <= 0) delta += 7;

    return (0, _index2.subDays)(date, delta);
  }
  return previousDay;
}

var previousFriday = {};

var hasRequiredPreviousFriday;

function requirePreviousFriday() {
  if (hasRequiredPreviousFriday) return previousFriday;
  hasRequiredPreviousFriday = 1;
  previousFriday.previousFriday = previousFriday$1;
  var _index = /*@__PURE__*/ requirePreviousDay();

  /**
   * @name previousFriday
   * @category Weekday Helpers
   * @summary When is the previous Friday?
   *
   * @description
   * When is the previous Friday?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to start counting from
   *
   * @returns The previous Friday
   *
   * @example
   * // When is the previous Friday before Jun, 19, 2021?
   * const result = previousFriday(new Date(2021, 5, 19))
   * //=> Fri June 18 2021 00:00:00
   */
  function previousFriday$1(date) {
    return (0, _index.previousDay)(date, 5);
  }
  return previousFriday;
}

var previousMonday = {};

var hasRequiredPreviousMonday;

function requirePreviousMonday() {
  if (hasRequiredPreviousMonday) return previousMonday;
  hasRequiredPreviousMonday = 1;
  previousMonday.previousMonday = previousMonday$1;
  var _index = /*@__PURE__*/ requirePreviousDay();

  /**
   * @name previousMonday
   * @category Weekday Helpers
   * @summary When is the previous Monday?
   *
   * @description
   * When is the previous Monday?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to start counting from
   *
   * @returns The previous Monday
   *
   * @example
   * // When is the previous Monday before Jun, 18, 2021?
   * const result = previousMonday(new Date(2021, 5, 18))
   * //=> Mon June 14 2021 00:00:00
   */
  function previousMonday$1(date) {
    return (0, _index.previousDay)(date, 1);
  }
  return previousMonday;
}

var previousSaturday = {};

var hasRequiredPreviousSaturday;

function requirePreviousSaturday() {
  if (hasRequiredPreviousSaturday) return previousSaturday;
  hasRequiredPreviousSaturday = 1;
  previousSaturday.previousSaturday = previousSaturday$1;
  var _index = /*@__PURE__*/ requirePreviousDay();

  /**
   * @name previousSaturday
   * @category Weekday Helpers
   * @summary When is the previous Saturday?
   *
   * @description
   * When is the previous Saturday?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to start counting from
   *
   * @returns The previous Saturday
   *
   * @example
   * // When is the previous Saturday before Jun, 20, 2021?
   * const result = previousSaturday(new Date(2021, 5, 20))
   * //=> Sat June 19 2021 00:00:00
   */
  function previousSaturday$1(date) {
    return (0, _index.previousDay)(date, 6);
  }
  return previousSaturday;
}

var previousSunday = {};

var hasRequiredPreviousSunday;

function requirePreviousSunday() {
  if (hasRequiredPreviousSunday) return previousSunday;
  hasRequiredPreviousSunday = 1;
  previousSunday.previousSunday = previousSunday$1;
  var _index = /*@__PURE__*/ requirePreviousDay();

  /**
   * @name previousSunday
   * @category Weekday Helpers
   * @summary When is the previous Sunday?
   *
   * @description
   * When is the previous Sunday?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to start counting from
   *
   * @returns The previous Sunday
   *
   * @example
   * // When is the previous Sunday before Jun, 21, 2021?
   * const result = previousSunday(new Date(2021, 5, 21))
   * //=> Sun June 20 2021 00:00:00
   */
  function previousSunday$1(date) {
    return (0, _index.previousDay)(date, 0);
  }
  return previousSunday;
}

var previousThursday = {};

var hasRequiredPreviousThursday;

function requirePreviousThursday() {
  if (hasRequiredPreviousThursday) return previousThursday;
  hasRequiredPreviousThursday = 1;
  previousThursday.previousThursday = previousThursday$1;
  var _index = /*@__PURE__*/ requirePreviousDay();

  /**
   * @name previousThursday
   * @category Weekday Helpers
   * @summary When is the previous Thursday?
   *
   * @description
   * When is the previous Thursday?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to start counting from
   *
   * @returns The previous Thursday
   *
   * @example
   * // When is the previous Thursday before Jun, 18, 2021?
   * const result = previousThursday(new Date(2021, 5, 18))
   * //=> Thu June 17 2021 00:00:00
   */
  function previousThursday$1(date) {
    return (0, _index.previousDay)(date, 4);
  }
  return previousThursday;
}

var previousTuesday = {};

var hasRequiredPreviousTuesday;

function requirePreviousTuesday() {
  if (hasRequiredPreviousTuesday) return previousTuesday;
  hasRequiredPreviousTuesday = 1;
  previousTuesday.previousTuesday = previousTuesday$1;
  var _index = /*@__PURE__*/ requirePreviousDay();

  /**
   * @name previousTuesday
   * @category Weekday Helpers
   * @summary When is the previous Tuesday?
   *
   * @description
   * When is the previous Tuesday?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to start counting from
   *
   * @returns The previous Tuesday
   *
   * @example
   * // When is the previous Tuesday before Jun, 18, 2021?
   * const result = previousTuesday(new Date(2021, 5, 18))
   * //=> Tue June 15 2021 00:00:00
   */
  function previousTuesday$1(date) {
    return (0, _index.previousDay)(date, 2);
  }
  return previousTuesday;
}

var previousWednesday = {};

var hasRequiredPreviousWednesday;

function requirePreviousWednesday() {
  if (hasRequiredPreviousWednesday) return previousWednesday;
  hasRequiredPreviousWednesday = 1;
  previousWednesday.previousWednesday = previousWednesday$1;
  var _index = /*@__PURE__*/ requirePreviousDay();

  /**
   * @name previousWednesday
   * @category Weekday Helpers
   * @summary When is the previous Wednesday?
   *
   * @description
   * When is the previous Wednesday?
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to start counting from
   *
   * @returns The previous Wednesday
   *
   * @example
   * // When is the previous Wednesday before Jun, 18, 2021?
   * const result = previousWednesday(new Date(2021, 5, 18))
   * //=> Wed June 16 2021 00:00:00
   */
  function previousWednesday$1(date) {
    return (0, _index.previousDay)(date, 3);
  }
  return previousWednesday;
}

var quartersToMonths = {};

var hasRequiredQuartersToMonths;

function requireQuartersToMonths() {
  if (hasRequiredQuartersToMonths) return quartersToMonths;
  hasRequiredQuartersToMonths = 1;
  quartersToMonths.quartersToMonths = quartersToMonths$1;
  var _index = /*@__PURE__*/ requireConstants$1();

  /**
   * @name quartersToMonths
   * @category Conversion Helpers
   * @summary Convert number of quarters to months.
   *
   * @description
   * Convert a number of quarters to a full number of months.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param quarters - The number of quarters to be converted
   *
   * @returns The number of quarters converted in months
   *
   * @example
   * // Convert 2 quarters to months
   * const result = quartersToMonths(2)
   * //=> 6
   */
  function quartersToMonths$1(quarters) {
    return Math.trunc(quarters * _index.monthsInQuarter);
  }
  return quartersToMonths;
}

var quartersToYears = {};

var hasRequiredQuartersToYears;

function requireQuartersToYears() {
  if (hasRequiredQuartersToYears) return quartersToYears;
  hasRequiredQuartersToYears = 1;
  quartersToYears.quartersToYears = quartersToYears$1;
  var _index = /*@__PURE__*/ requireConstants$1();

  /**
   * @name quartersToYears
   * @category Conversion Helpers
   * @summary Convert number of quarters to years.
   *
   * @description
   * Convert a number of quarters to a full number of years.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param quarters - The number of quarters to be converted
   *
   * @returns The number of quarters converted in years
   *
   * @example
   * // Convert 8 quarters to years
   * const result = quartersToYears(8)
   * //=> 2
   *
   * @example
   * // It uses floor rounding:
   * const result = quartersToYears(11)
   * //=> 2
   */
  function quartersToYears$1(quarters) {
    const years = quarters / _index.quartersInYear;
    return Math.trunc(years);
  }
  return quartersToYears;
}

var roundToNearestHours = {};

var hasRequiredRoundToNearestHours;

function requireRoundToNearestHours() {
  if (hasRequiredRoundToNearestHours) return roundToNearestHours;
  hasRequiredRoundToNearestHours = 1;
  roundToNearestHours.roundToNearestHours = roundToNearestHours$1;
  var _index = /*@__PURE__*/ requireGetRoundingMethod();
  var _index2 = /*@__PURE__*/ requireConstructFrom();
  var _index3 = /*@__PURE__*/ requireToDate();

  /**
   * The {@link roundToNearestHours} function options.
   */

  /**
	 * @name roundToNearestHours
	 * @category Hour Helpers
	 * @summary Rounds the given date to the nearest hour
	 *
	 * @description
	 * Rounds the given date to the nearest hour (or number of hours).
	 * Rounds up when the given date is exactly between the nearest round hours.
	 *
	 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
	 *
	 * @param date - The date to round
	 * @param options - An object with options.
	 *
	 * @returns The new date rounded to the closest hour
	 *
	 * @example
	 * // Round 10 July 2014 12:34:56 to nearest hour:
	 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56))
	 * //=> Thu Jul 10 2014 13:00:00
	 *
	 * @example
	 * // Round 10 July 2014 12:34:56 to nearest half hour:
	 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56), { nearestTo: 6 })
	 * //=> Thu Jul 10 2014 12:00:00

	 * @example
	 * // Round 10 July 2014 12:34:56 to nearest half hour:
	 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56), { nearestTo: 8 })
	 * //=> Thu Jul 10 2014 16:00:00

	* @example
	 * // Floor (rounds down) 10 July 2014 12:34:56 to nearest hour:
	 * const result = roundToNearestHours(new Date(2014, 6, 10, 1, 23, 45), { roundingMethod: 'ceil' })
	 * //=> Thu Jul 10 2014 02:00:00
	 *
	 * @example
	 * // Ceil (rounds up) 10 July 2014 12:34:56 to nearest quarter hour:
	 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56), { roundingMethod: 'floor', nearestTo: 8 })
	 * //=> Thu Jul 10 2014 08:00:00
	 */
  function roundToNearestHours$1(date, options) {
    const nearestTo = options?.nearestTo ?? 1;

    if (nearestTo < 1 || nearestTo > 12) return (0, _index2.constructFrom)(date, NaN);

    const _date = (0, _index3.toDate)(date);
    const fractionalMinutes = _date.getMinutes() / 60;
    const fractionalSeconds = _date.getSeconds() / 60 / 60;
    const fractionalMilliseconds = _date.getMilliseconds() / 1000 / 60 / 60;
    const hours = _date.getHours() + fractionalMinutes + fractionalSeconds + fractionalMilliseconds;

    // Unlike the `differenceIn*` functions, the default rounding behavior is `round` and not 'trunc'
    const method = options?.roundingMethod ?? 'round';
    const roundingMethod = (0, _index.getRoundingMethod)(method);

    // nearestTo option does not care daylight savings time
    const roundedHours = roundingMethod(hours / nearestTo) * nearestTo;

    const result = (0, _index2.constructFrom)(date, _date);
    result.setHours(roundedHours, 0, 0, 0);
    return result;
  }
  return roundToNearestHours;
}

var roundToNearestMinutes = {};

var hasRequiredRoundToNearestMinutes;

function requireRoundToNearestMinutes() {
  if (hasRequiredRoundToNearestMinutes) return roundToNearestMinutes;
  hasRequiredRoundToNearestMinutes = 1;
  roundToNearestMinutes.roundToNearestMinutes = roundToNearestMinutes$1;
  var _index = /*@__PURE__*/ requireGetRoundingMethod();
  var _index2 = /*@__PURE__*/ requireConstructFrom();
  var _index3 = /*@__PURE__*/ requireToDate();

  /**
   * The {@link roundToNearestMinutes} function options.
   */

  /**
   * @name roundToNearestMinutes
   * @category Minute Helpers
   * @summary Rounds the given date to the nearest minute
   *
   * @description
   * Rounds the given date to the nearest minute (or number of minutes).
   * Rounds up when the given date is exactly between the nearest round minutes.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to round
   * @param options - An object with options.
   *
   * @returns The new date rounded to the closest minute
   *
   * @example
   * // Round 10 July 2014 12:12:34 to nearest minute:
   * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34))
   * //=> Thu Jul 10 2014 12:13:00
   *
   * @example
   * // Round 10 July 2014 12:12:34 to nearest quarter hour:
   * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { nearestTo: 15 })
   * //=> Thu Jul 10 2014 12:15:00
   *
   * @example
   * // Floor (rounds down) 10 July 2014 12:12:34 to nearest minute:
   * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { roundingMethod: 'floor' })
   * //=> Thu Jul 10 2014 12:12:00
   *
   * @example
   * // Ceil (rounds up) 10 July 2014 12:12:34 to nearest half hour:
   * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { roundingMethod: 'ceil', nearestTo: 30 })
   * //=> Thu Jul 10 2014 12:30:00
   */
  function roundToNearestMinutes$1(date, options) {
    const nearestTo = options?.nearestTo ?? 1;

    if (nearestTo < 1 || nearestTo > 30) return (0, _index2.constructFrom)(date, NaN);

    const _date = (0, _index3.toDate)(date);
    const fractionalSeconds = _date.getSeconds() / 60;
    const fractionalMilliseconds = _date.getMilliseconds() / 1000 / 60;
    const minutes = _date.getMinutes() + fractionalSeconds + fractionalMilliseconds;

    // Unlike the `differenceIn*` functions, the default rounding behavior is `round` and not 'trunc'
    const method = options?.roundingMethod ?? 'round';
    const roundingMethod = (0, _index.getRoundingMethod)(method);

    const roundedMinutes = roundingMethod(minutes / nearestTo) * nearestTo;

    const result = (0, _index2.constructFrom)(date, _date);
    result.setMinutes(roundedMinutes, 0, 0);
    return result;
  }
  return roundToNearestMinutes;
}

var secondsToHours = {};

var hasRequiredSecondsToHours;

function requireSecondsToHours() {
  if (hasRequiredSecondsToHours) return secondsToHours;
  hasRequiredSecondsToHours = 1;
  secondsToHours.secondsToHours = secondsToHours$1;
  var _index = /*@__PURE__*/ requireConstants$1();

  /**
   * @name secondsToHours
   * @category Conversion Helpers
   * @summary Convert seconds to hours.
   *
   * @description
   * Convert a number of seconds to a full number of hours.
   *
   * @param seconds - The number of seconds to be converted
   *
   * @returns The number of seconds converted in hours
   *
   * @example
   * // Convert 7200 seconds into hours
   * const result = secondsToHours(7200)
   * //=> 2
   *
   * @example
   * // It uses floor rounding:
   * const result = secondsToHours(7199)
   * //=> 1
   */
  function secondsToHours$1(seconds) {
    const hours = seconds / _index.secondsInHour;
    return Math.trunc(hours);
  }
  return secondsToHours;
}

var secondsToMilliseconds = {};

var hasRequiredSecondsToMilliseconds;

function requireSecondsToMilliseconds() {
  if (hasRequiredSecondsToMilliseconds) return secondsToMilliseconds;
  hasRequiredSecondsToMilliseconds = 1;
  secondsToMilliseconds.secondsToMilliseconds = secondsToMilliseconds$1;
  var _index = /*@__PURE__*/ requireConstants$1();

  /**
   * @name secondsToMilliseconds
   * @category Conversion Helpers
   * @summary Convert seconds to milliseconds.
   *
   * @description
   * Convert a number of seconds to a full number of milliseconds.
   *
   * @param seconds - The number of seconds to be converted
   *
   * @returns The number of seconds converted in milliseconds
   *
   * @example
   * // Convert 2 seconds into milliseconds
   * const result = secondsToMilliseconds(2)
   * //=> 2000
   */
  function secondsToMilliseconds$1(seconds) {
    return seconds * _index.millisecondsInSecond;
  }
  return secondsToMilliseconds;
}

var secondsToMinutes = {};

var hasRequiredSecondsToMinutes;

function requireSecondsToMinutes() {
  if (hasRequiredSecondsToMinutes) return secondsToMinutes;
  hasRequiredSecondsToMinutes = 1;
  secondsToMinutes.secondsToMinutes = secondsToMinutes$1;
  var _index = /*@__PURE__*/ requireConstants$1();

  /**
   * @name secondsToMinutes
   * @category Conversion Helpers
   * @summary Convert seconds to minutes.
   *
   * @description
   * Convert a number of seconds to a full number of minutes.
   *
   * @param seconds - The number of seconds to be converted
   *
   * @returns The number of seconds converted in minutes
   *
   * @example
   * // Convert 120 seconds into minutes
   * const result = secondsToMinutes(120)
   * //=> 2
   *
   * @example
   * // It uses floor rounding:
   * const result = secondsToMinutes(119)
   * //=> 1
   */
  function secondsToMinutes$1(seconds) {
    const minutes = seconds / _index.secondsInMinute;
    return Math.trunc(minutes);
  }
  return secondsToMinutes;
}

var set = {};

var setMonth = {};

var hasRequiredSetMonth;

function requireSetMonth() {
  if (hasRequiredSetMonth) return setMonth;
  hasRequiredSetMonth = 1;
  setMonth.setMonth = setMonth$1;
  var _index = /*@__PURE__*/ requireConstructFrom();
  var _index2 = /*@__PURE__*/ requireGetDaysInMonth();
  var _index3 = /*@__PURE__*/ requireToDate();

  /**
   * @name setMonth
   * @category Month Helpers
   * @summary Set the month to the given date.
   *
   * @description
   * Set the month to the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param month - The month index to set (0-11)
   *
   * @returns The new date with the month set
   *
   * @example
   * // Set February to 1 September 2014:
   * const result = setMonth(new Date(2014, 8, 1), 1)
   * //=> Sat Feb 01 2014 00:00:00
   */
  function setMonth$1(date, month) {
    const _date = (0, _index3.toDate)(date);
    const year = _date.getFullYear();
    const day = _date.getDate();

    const dateWithDesiredMonth = (0, _index.constructFrom)(date, 0);
    dateWithDesiredMonth.setFullYear(year, month, 15);
    dateWithDesiredMonth.setHours(0, 0, 0, 0);
    const daysInMonth = (0, _index2.getDaysInMonth)(dateWithDesiredMonth);
    // Set the last day of the new month
    // if the original date was the last day of the longer month
    _date.setMonth(month, Math.min(day, daysInMonth));
    return _date;
  }
  return setMonth;
}

var hasRequiredSet;

function requireSet() {
  if (hasRequiredSet) return set;
  hasRequiredSet = 1;
  set.set = set$1;
  var _index = /*@__PURE__*/ requireConstructFrom();
  var _index2 = /*@__PURE__*/ requireSetMonth();
  var _index3 = /*@__PURE__*/ requireToDate();

  /**
   * @name set
   * @category Common Helpers
   * @summary Set date values to a given date.
   *
   * @description
   * Set date values to a given date.
   *
   * Sets time values to date from object `values`.
   * A value is not set if it is undefined or null or doesn't exist in `values`.
   *
   * Note about bundle size: `set` does not internally use `setX` functions from date-fns but instead opts
   * to use native `Date#setX` methods. If you use this function, you may not want to include the
   * other `setX` functions that date-fns provides if you are concerned about the bundle size.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param values - The date values to be set
   *
   * @returns The new date with options set
   *
   * @example
   * // Transform 1 September 2014 into 20 October 2015 in a single line:
   * const result = set(new Date(2014, 8, 20), { year: 2015, month: 9, date: 20 })
   * //=> Tue Oct 20 2015 00:00:00
   *
   * @example
   * // Set 12 PM to 1 September 2014 01:23:45 to 1 September 2014 12:00:00:
   * const result = set(new Date(2014, 8, 1, 1, 23, 45), { hours: 12 })
   * //=> Mon Sep 01 2014 12:23:45
   */

  function set$1(date, values) {
    let _date = (0, _index3.toDate)(date);

    // Check if date is Invalid Date because Date.prototype.setFullYear ignores the value of Invalid Date
    if (isNaN(+_date)) {
      return (0, _index.constructFrom)(date, NaN);
    }

    if (values.year != null) {
      _date.setFullYear(values.year);
    }

    if (values.month != null) {
      _date = (0, _index2.setMonth)(_date, values.month);
    }

    if (values.date != null) {
      _date.setDate(values.date);
    }

    if (values.hours != null) {
      _date.setHours(values.hours);
    }

    if (values.minutes != null) {
      _date.setMinutes(values.minutes);
    }

    if (values.seconds != null) {
      _date.setSeconds(values.seconds);
    }

    if (values.milliseconds != null) {
      _date.setMilliseconds(values.milliseconds);
    }

    return _date;
  }
  return set;
}

var setDate = {};

var hasRequiredSetDate;

function requireSetDate() {
  if (hasRequiredSetDate) return setDate;
  hasRequiredSetDate = 1;
  setDate.setDate = setDate$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name setDate
   * @category Day Helpers
   * @summary Set the day of the month to the given date.
   *
   * @description
   * Set the day of the month to the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param dayOfMonth - The day of the month of the new date
   *
   * @returns The new date with the day of the month set
   *
   * @example
   * // Set the 30th day of the month to 1 September 2014:
   * const result = setDate(new Date(2014, 8, 1), 30)
   * //=> Tue Sep 30 2014 00:00:00
   */
  function setDate$1(date, dayOfMonth) {
    const _date = (0, _index.toDate)(date);
    _date.setDate(dayOfMonth);
    return _date;
  }
  return setDate;
}

var setDayOfYear = {};

var hasRequiredSetDayOfYear;

function requireSetDayOfYear() {
  if (hasRequiredSetDayOfYear) return setDayOfYear;
  hasRequiredSetDayOfYear = 1;
  setDayOfYear.setDayOfYear = setDayOfYear$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name setDayOfYear
   * @category Day Helpers
   * @summary Set the day of the year to the given date.
   *
   * @description
   * Set the day of the year to the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param dayOfYear - The day of the year of the new date
   *
   * @returns The new date with the day of the year set
   *
   * @example
   * // Set the 2nd day of the year to 2 July 2014:
   * const result = setDayOfYear(new Date(2014, 6, 2), 2)
   * //=> Thu Jan 02 2014 00:00:00
   */
  function setDayOfYear$1(date, dayOfYear) {
    const _date = (0, _index.toDate)(date);
    _date.setMonth(0);
    _date.setDate(dayOfYear);
    return _date;
  }
  return setDayOfYear;
}

var setDefaultOptions = {};

var hasRequiredSetDefaultOptions;

function requireSetDefaultOptions() {
  if (hasRequiredSetDefaultOptions) return setDefaultOptions;
  hasRequiredSetDefaultOptions = 1;
  setDefaultOptions.setDefaultOptions = setDefaultOptions$1;

  var _index = /*@__PURE__*/ requireDefaultOptions();

  /**
   * @name setDefaultOptions
   * @category Common Helpers
   * @summary Set default options including locale.
   * @pure false
   *
   * @description
   * Sets the defaults for
   * `options.locale`, `options.weekStartsOn` and `options.firstWeekContainsDate`
   * arguments for all functions.
   *
   * @param options - An object with options
   *
   * @example
   * // Set global locale:
   * import { es } from 'date-fns/locale'
   * setDefaultOptions({ locale: es })
   * const result = format(new Date(2014, 8, 2), 'PPPP')
   * //=> 'martes, 2 de septiembre de 2014'
   *
   * @example
   * // Start of the week for 2 September 2014:
   * const result = startOfWeek(new Date(2014, 8, 2))
   * //=> Sun Aug 31 2014 00:00:00
   *
   * @example
   * // Start of the week for 2 September 2014,
   * // when we set that week starts on Monday by default:
   * setDefaultOptions({ weekStartsOn: 1 })
   * const result = startOfWeek(new Date(2014, 8, 2))
   * //=> Mon Sep 01 2014 00:00:00
   *
   * @example
   * // Manually set options take priority over default options:
   * setDefaultOptions({ weekStartsOn: 1 })
   * const result = startOfWeek(new Date(2014, 8, 2), { weekStartsOn: 0 })
   * //=> Sun Aug 31 2014 00:00:00
   *
   * @example
   * // Remove the option by setting it to `undefined`:
   * setDefaultOptions({ weekStartsOn: 1 })
   * setDefaultOptions({ weekStartsOn: undefined })
   * const result = startOfWeek(new Date(2014, 8, 2))
   * //=> Sun Aug 31 2014 00:00:00
   */
  function setDefaultOptions$1(options) {
    const result = {};
    const defaultOptions = (0, _index.getDefaultOptions)();

    for (const property in defaultOptions) {
      if (Object.prototype.hasOwnProperty.call(defaultOptions, property)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
        result[property] = defaultOptions[property];
      }
    }

    for (const property in options) {
      if (Object.prototype.hasOwnProperty.call(options, property)) {
        if (options[property] === undefined) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
          delete result[property];
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
          result[property] = options[property];
        }
      }
    }

    (0, _index.setDefaultOptions)(result);
  }
  return setDefaultOptions;
}

var setHours = {};

var hasRequiredSetHours;

function requireSetHours() {
  if (hasRequiredSetHours) return setHours;
  hasRequiredSetHours = 1;
  setHours.setHours = setHours$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name setHours
   * @category Hour Helpers
   * @summary Set the hours to the given date.
   *
   * @description
   * Set the hours to the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param hours - The hours of the new date
   *
   * @returns The new date with the hours set
   *
   * @example
   * // Set 4 hours to 1 September 2014 11:30:00:
   * const result = setHours(new Date(2014, 8, 1, 11, 30), 4)
   * //=> Mon Sep 01 2014 04:30:00
   */
  function setHours$1(date, hours) {
    const _date = (0, _index.toDate)(date);
    _date.setHours(hours);
    return _date;
  }
  return setHours;
}

var setMilliseconds = {};

var hasRequiredSetMilliseconds;

function requireSetMilliseconds() {
  if (hasRequiredSetMilliseconds) return setMilliseconds;
  hasRequiredSetMilliseconds = 1;
  setMilliseconds.setMilliseconds = setMilliseconds$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name setMilliseconds
   * @category Millisecond Helpers
   * @summary Set the milliseconds to the given date.
   *
   * @description
   * Set the milliseconds to the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param milliseconds - The milliseconds of the new date
   *
   * @returns The new date with the milliseconds set
   *
   * @example
   * // Set 300 milliseconds to 1 September 2014 11:30:40.500:
   * const result = setMilliseconds(new Date(2014, 8, 1, 11, 30, 40, 500), 300)
   * //=> Mon Sep 01 2014 11:30:40.300
   */
  function setMilliseconds$1(date, milliseconds) {
    const _date = (0, _index.toDate)(date);
    _date.setMilliseconds(milliseconds);
    return _date;
  }
  return setMilliseconds;
}

var setMinutes = {};

var hasRequiredSetMinutes;

function requireSetMinutes() {
  if (hasRequiredSetMinutes) return setMinutes;
  hasRequiredSetMinutes = 1;
  setMinutes.setMinutes = setMinutes$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name setMinutes
   * @category Minute Helpers
   * @summary Set the minutes to the given date.
   *
   * @description
   * Set the minutes to the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param minutes - The minutes of the new date
   *
   * @returns The new date with the minutes set
   *
   * @example
   * // Set 45 minutes to 1 September 2014 11:30:40:
   * const result = setMinutes(new Date(2014, 8, 1, 11, 30, 40), 45)
   * //=> Mon Sep 01 2014 11:45:40
   */
  function setMinutes$1(date, minutes) {
    const _date = (0, _index.toDate)(date);
    _date.setMinutes(minutes);
    return _date;
  }
  return setMinutes;
}

var setQuarter = {};

var hasRequiredSetQuarter;

function requireSetQuarter() {
  if (hasRequiredSetQuarter) return setQuarter;
  hasRequiredSetQuarter = 1;
  setQuarter.setQuarter = setQuarter$1;
  var _index = /*@__PURE__*/ requireSetMonth();
  var _index2 = /*@__PURE__*/ requireToDate();

  /**
   * @name setQuarter
   * @category Quarter Helpers
   * @summary Set the year quarter to the given date.
   *
   * @description
   * Set the year quarter to the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param quarter - The quarter of the new date
   *
   * @returns The new date with the quarter set
   *
   * @example
   * // Set the 2nd quarter to 2 July 2014:
   * const result = setQuarter(new Date(2014, 6, 2), 2)
   * //=> Wed Apr 02 2014 00:00:00
   */
  function setQuarter$1(date, quarter) {
    const _date = (0, _index2.toDate)(date);
    const oldQuarter = Math.trunc(_date.getMonth() / 3) + 1;
    const diff = quarter - oldQuarter;
    return (0, _index.setMonth)(_date, _date.getMonth() + diff * 3);
  }
  return setQuarter;
}

var setSeconds = {};

var hasRequiredSetSeconds;

function requireSetSeconds() {
  if (hasRequiredSetSeconds) return setSeconds;
  hasRequiredSetSeconds = 1;
  setSeconds.setSeconds = setSeconds$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name setSeconds
   * @category Second Helpers
   * @summary Set the seconds to the given date.
   *
   * @description
   * Set the seconds to the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param seconds - The seconds of the new date
   *
   * @returns The new date with the seconds set
   *
   * @example
   * // Set 45 seconds to 1 September 2014 11:30:40:
   * const result = setSeconds(new Date(2014, 8, 1, 11, 30, 40), 45)
   * //=> Mon Sep 01 2014 11:30:45
   */
  function setSeconds$1(date, seconds) {
    const _date = (0, _index.toDate)(date);
    _date.setSeconds(seconds);
    return _date;
  }
  return setSeconds;
}

var setWeekYear = {};

var hasRequiredSetWeekYear;

function requireSetWeekYear() {
  if (hasRequiredSetWeekYear) return setWeekYear;
  hasRequiredSetWeekYear = 1;
  setWeekYear.setWeekYear = setWeekYear$1;
  var _index = /*@__PURE__*/ requireConstructFrom();
  var _index2 = /*@__PURE__*/ requireDifferenceInCalendarDays();
  var _index3 = /*@__PURE__*/ requireStartOfWeekYear();
  var _index4 = /*@__PURE__*/ requireToDate();

  var _index5 = /*@__PURE__*/ requireDefaultOptions();

  /**
   * The {@link setWeekYear} function options.
   */

  /**
   * @name setWeekYear
   * @category Week-Numbering Year Helpers
   * @summary Set the local week-numbering year to the given date.
   *
   * @description
   * Set the local week-numbering year to the given date,
   * saving the week number and the weekday number.
   * The exact calculation depends on the values of
   * `options.weekStartsOn` (which is the index of the first day of the week)
   * and `options.firstWeekContainsDate` (which is the day of January, which is always in
   * the first week of the week-numbering year)
   *
   * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param weekYear - The local week-numbering year of the new date
   * @param options - An object with options
   *
   * @returns The new date with the local week-numbering year set
   *
   * @example
   * // Set the local week-numbering year 2004 to 2 January 2010 with default options:
   * const result = setWeekYear(new Date(2010, 0, 2), 2004)
   * //=> Sat Jan 03 2004 00:00:00
   *
   * @example
   * // Set the local week-numbering year 2004 to 2 January 2010,
   * // if Monday is the first day of week
   * // and 4 January is always in the first week of the year:
   * const result = setWeekYear(new Date(2010, 0, 2), 2004, {
   *   weekStartsOn: 1,
   *   firstWeekContainsDate: 4
   * })
   * //=> Sat Jan 01 2005 00:00:00
   */
  function setWeekYear$1(date, weekYear, options) {
    const defaultOptions = (0, _index5.getDefaultOptions)();
    const firstWeekContainsDate =
      options?.firstWeekContainsDate ??
      options?.locale?.options?.firstWeekContainsDate ??
      defaultOptions.firstWeekContainsDate ??
      defaultOptions.locale?.options?.firstWeekContainsDate ??
      1;

    let _date = (0, _index4.toDate)(date);
    const diff = (0, _index2.differenceInCalendarDays)(_date, (0, _index3.startOfWeekYear)(_date, options));
    const firstWeek = (0, _index.constructFrom)(date, 0);
    firstWeek.setFullYear(weekYear, 0, firstWeekContainsDate);
    firstWeek.setHours(0, 0, 0, 0);
    _date = (0, _index3.startOfWeekYear)(firstWeek, options);
    _date.setDate(_date.getDate() + diff);
    return _date;
  }
  return setWeekYear;
}

var setYear = {};

var hasRequiredSetYear;

function requireSetYear() {
  if (hasRequiredSetYear) return setYear;
  hasRequiredSetYear = 1;
  setYear.setYear = setYear$1;
  var _index = /*@__PURE__*/ requireConstructFrom();
  var _index2 = /*@__PURE__*/ requireToDate();

  /**
   * @name setYear
   * @category Year Helpers
   * @summary Set the year to the given date.
   *
   * @description
   * Set the year to the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param year - The year of the new date
   *
   * @returns The new date with the year set
   *
   * @example
   * // Set year 2013 to 1 September 2014:
   * const result = setYear(new Date(2014, 8, 1), 2013)
   * //=> Sun Sep 01 2013 00:00:00
   */
  function setYear$1(date, year) {
    const _date = (0, _index2.toDate)(date);

    // Check if date is Invalid Date because Date.prototype.setFullYear ignores the value of Invalid Date
    if (isNaN(+_date)) {
      return (0, _index.constructFrom)(date, NaN);
    }

    _date.setFullYear(year);
    return _date;
  }
  return setYear;
}

var startOfDecade = {};

var hasRequiredStartOfDecade;

function requireStartOfDecade() {
  if (hasRequiredStartOfDecade) return startOfDecade;
  hasRequiredStartOfDecade = 1;
  startOfDecade.startOfDecade = startOfDecade$1;
  var _index = /*@__PURE__*/ requireToDate();

  /**
   * @name startOfDecade
   * @category Decade Helpers
   * @summary Return the start of a decade for the given date.
   *
   * @description
   * Return the start of a decade for the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The original date
   *
   * @returns The start of a decade
   *
   * @example
   * // The start of a decade for 21 October 2015 00:00:00:
   * const result = startOfDecade(new Date(2015, 9, 21, 00, 00, 00))
   * //=> Jan 01 2010 00:00:00
   */
  function startOfDecade$1(date) {
    // TODO: Switch to more technical definition in of decades that start with 1
    // end with 0. I.e. 2001-2010 instead of current 2000-2009. It's a breaking
    // change, so it can only be done in 4.0.
    const _date = (0, _index.toDate)(date);
    const year = _date.getFullYear();
    const decade = Math.floor(year / 10) * 10;
    _date.setFullYear(decade, 0, 1);
    _date.setHours(0, 0, 0, 0);
    return _date;
  }
  return startOfDecade;
}

var startOfToday = {};

var hasRequiredStartOfToday;

function requireStartOfToday() {
  if (hasRequiredStartOfToday) return startOfToday;
  hasRequiredStartOfToday = 1;
  startOfToday.startOfToday = startOfToday$1;
  var _index = /*@__PURE__*/ requireStartOfDay();

  /**
   * @name startOfToday
   * @category Day Helpers
   * @summary Return the start of today.
   * @pure false
   *
   * @description
   * Return the start of today.
   *
   * @returns The start of today
   *
   * @example
   * // If today is 6 October 2014:
   * const result = startOfToday()
   * //=> Mon Oct 6 2014 00:00:00
   */
  function startOfToday$1() {
    return (0, _index.startOfDay)(Date.now());
  }
  return startOfToday;
}

var startOfTomorrow = {};

var hasRequiredStartOfTomorrow;

function requireStartOfTomorrow() {
  if (hasRequiredStartOfTomorrow) return startOfTomorrow;
  hasRequiredStartOfTomorrow = 1;
  startOfTomorrow.startOfTomorrow = startOfTomorrow$1; /**
   * @name startOfTomorrow
   * @category Day Helpers
   * @summary Return the start of tomorrow.
   * @pure false
   *
   * @description
   * Return the start of tomorrow.
   *
   * @returns The start of tomorrow
   *
   * @example
   * // If today is 6 October 2014:
   * const result = startOfTomorrow()
   * //=> Tue Oct 7 2014 00:00:00
   */
  function startOfTomorrow$1() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();

    const date = new Date(0);
    date.setFullYear(year, month, day + 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  return startOfTomorrow;
}

var startOfYesterday = {};

var hasRequiredStartOfYesterday;

function requireStartOfYesterday() {
  if (hasRequiredStartOfYesterday) return startOfYesterday;
  hasRequiredStartOfYesterday = 1;
  startOfYesterday.startOfYesterday = startOfYesterday$1; /**
   * @name startOfYesterday
   * @category Day Helpers
   * @summary Return the start of yesterday.
   * @pure false
   *
   * @description
   * Return the start of yesterday.
   *
   * @returns The start of yesterday
   *
   * @example
   * // If today is 6 October 2014:
   * const result = startOfYesterday()
   * //=> Sun Oct 5 2014 00:00:00
   */
  function startOfYesterday$1() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();

    const date = new Date(0);
    date.setFullYear(year, month, day - 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  return startOfYesterday;
}

var sub = {};

var subMonths = {};

var hasRequiredSubMonths;

function requireSubMonths() {
  if (hasRequiredSubMonths) return subMonths;
  hasRequiredSubMonths = 1;
  subMonths.subMonths = subMonths$1;
  var _index = /*@__PURE__*/ requireAddMonths();

  /**
   * @name subMonths
   * @category Month Helpers
   * @summary Subtract the specified number of months from the given date.
   *
   * @description
   * Subtract the specified number of months from the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param amount - The amount of months to be subtracted.
   *
   * @returns The new date with the months subtracted
   *
   * @example
   * // Subtract 5 months from 1 February 2015:
   * const result = subMonths(new Date(2015, 1, 1), 5)
   * //=> Mon Sep 01 2014 00:00:00
   */
  function subMonths$1(date, amount) {
    return (0, _index.addMonths)(date, -amount);
  }
  return subMonths;
}

var hasRequiredSub;

function requireSub() {
  if (hasRequiredSub) return sub;
  hasRequiredSub = 1;
  sub.sub = sub$1;
  var _index = /*@__PURE__*/ requireSubDays();
  var _index2 = /*@__PURE__*/ requireSubMonths();

  var _index3 = /*@__PURE__*/ requireConstructFrom();

  /**
   * @name sub
   * @category Common Helpers
   * @summary Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
   *
   * @description
   * Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param duration - The object with years, months, weeks, days, hours, minutes and seconds to be subtracted
   *
   * | Key     | Description                        |
   * |---------|------------------------------------|
   * | years   | Amount of years to be subtracted   |
   * | months  | Amount of months to be subtracted  |
   * | weeks   | Amount of weeks to be subtracted   |
   * | days    | Amount of days to be subtracted    |
   * | hours   | Amount of hours to be subtracted   |
   * | minutes | Amount of minutes to be subtracted |
   * | seconds | Amount of seconds to be subtracted |
   *
   * All values default to 0
   *
   * @returns The new date with the seconds subtracted
   *
   * @example
   * // Subtract the following duration from 15 June 2017 15:29:20
   * const result = sub(new Date(2017, 5, 15, 15, 29, 20), {
   *   years: 2,
   *   months: 9,
   *   weeks: 1,
   *   days: 7,
   *   hours: 5,
   *   minutes: 9,
   *   seconds: 30
   * })
   * //=> Mon Sep 1 2014 10:19:50
   */
  function sub$1(date, duration) {
    const { years = 0, months = 0, weeks = 0, days = 0, hours = 0, minutes = 0, seconds = 0 } = duration;

    // Subtract years and months
    const dateWithoutMonths = (0, _index2.subMonths)(date, months + years * 12);

    // Subtract weeks and days
    const dateWithoutDays = (0, _index.subDays)(dateWithoutMonths, days + weeks * 7);

    // Subtract hours, minutes and seconds
    const minutestoSub = minutes + hours * 60;
    const secondstoSub = seconds + minutestoSub * 60;
    const mstoSub = secondstoSub * 1000;
    const finalDate = (0, _index3.constructFrom)(date, dateWithoutDays.getTime() - mstoSub);

    return finalDate;
  }
  return sub;
}

var subBusinessDays = {};

var hasRequiredSubBusinessDays;

function requireSubBusinessDays() {
  if (hasRequiredSubBusinessDays) return subBusinessDays;
  hasRequiredSubBusinessDays = 1;
  subBusinessDays.subBusinessDays = subBusinessDays$1;
  var _index = /*@__PURE__*/ requireAddBusinessDays();

  /**
   * @name subBusinessDays
   * @category Day Helpers
   * @summary Substract the specified number of business days (mon - fri) to the given date.
   *
   * @description
   * Substract the specified number of business days (mon - fri) to the given date, ignoring weekends.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param amount - The amount of business days to be subtracted.
   *
   * @returns The new date with the business days subtracted
   *
   * @example
   * // Substract 10 business days from 1 September 2014:
   * const result = subBusinessDays(new Date(2014, 8, 1), 10)
   * //=> Mon Aug 18 2014 00:00:00 (skipped weekend days)
   */
  function subBusinessDays$1(date, amount) {
    return (0, _index.addBusinessDays)(date, -amount);
  }
  return subBusinessDays;
}

var subHours = {};

var hasRequiredSubHours;

function requireSubHours() {
  if (hasRequiredSubHours) return subHours;
  hasRequiredSubHours = 1;
  subHours.subHours = subHours$1;
  var _index = /*@__PURE__*/ requireAddHours();

  /**
   * @name subHours
   * @category Hour Helpers
   * @summary Subtract the specified number of hours from the given date.
   *
   * @description
   * Subtract the specified number of hours from the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param amount - The amount of hours to be subtracted.
   *
   * @returns The new date with the hours subtracted
   *
   * @example
   * // Subtract 2 hours from 11 July 2014 01:00:00:
   * const result = subHours(new Date(2014, 6, 11, 1, 0), 2)
   * //=> Thu Jul 10 2014 23:00:00
   */
  function subHours$1(date, amount) {
    return (0, _index.addHours)(date, -amount);
  }
  return subHours;
}

var subMilliseconds = {};

var hasRequiredSubMilliseconds;

function requireSubMilliseconds() {
  if (hasRequiredSubMilliseconds) return subMilliseconds;
  hasRequiredSubMilliseconds = 1;
  subMilliseconds.subMilliseconds = subMilliseconds$1;
  var _index = /*@__PURE__*/ requireAddMilliseconds();

  /**
   * @name subMilliseconds
   * @category Millisecond Helpers
   * @summary Subtract the specified number of milliseconds from the given date.
   *
   * @description
   * Subtract the specified number of milliseconds from the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param amount - The amount of milliseconds to be subtracted.
   *
   * @returns The new date with the milliseconds subtracted
   *
   * @example
   * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:
   * const result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
   * //=> Thu Jul 10 2014 12:45:29.250
   */
  function subMilliseconds$1(date, amount) {
    return (0, _index.addMilliseconds)(date, -amount);
  }
  return subMilliseconds;
}

var subMinutes = {};

var hasRequiredSubMinutes;

function requireSubMinutes() {
  if (hasRequiredSubMinutes) return subMinutes;
  hasRequiredSubMinutes = 1;
  subMinutes.subMinutes = subMinutes$1;
  var _index = /*@__PURE__*/ requireAddMinutes();

  /**
   * @name subMinutes
   * @category Minute Helpers
   * @summary Subtract the specified number of minutes from the given date.
   *
   * @description
   * Subtract the specified number of minutes from the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param amount - The amount of minutes to be subtracted.
   *
   * @returns The new date with the minutes subtracted
   *
   * @example
   * // Subtract 30 minutes from 10 July 2014 12:00:00:
   * const result = subMinutes(new Date(2014, 6, 10, 12, 0), 30)
   * //=> Thu Jul 10 2014 11:30:00
   */
  function subMinutes$1(date, amount) {
    return (0, _index.addMinutes)(date, -amount);
  }
  return subMinutes;
}

var subQuarters = {};

var hasRequiredSubQuarters;

function requireSubQuarters() {
  if (hasRequiredSubQuarters) return subQuarters;
  hasRequiredSubQuarters = 1;
  subQuarters.subQuarters = subQuarters$1;
  var _index = /*@__PURE__*/ requireAddQuarters();

  /**
   * @name subQuarters
   * @category Quarter Helpers
   * @summary Subtract the specified number of year quarters from the given date.
   *
   * @description
   * Subtract the specified number of year quarters from the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param amount - The amount of quarters to be subtracted.
   *
   * @returns The new date with the quarters subtracted
   *
   * @example
   * // Subtract 3 quarters from 1 September 2014:
   * const result = subQuarters(new Date(2014, 8, 1), 3)
   * //=> Sun Dec 01 2013 00:00:00
   */
  function subQuarters$1(date, amount) {
    return (0, _index.addQuarters)(date, -amount);
  }
  return subQuarters;
}

var subSeconds = {};

var hasRequiredSubSeconds;

function requireSubSeconds() {
  if (hasRequiredSubSeconds) return subSeconds;
  hasRequiredSubSeconds = 1;
  subSeconds.subSeconds = subSeconds$1;
  var _index = /*@__PURE__*/ requireAddSeconds();

  /**
   * @name subSeconds
   * @category Second Helpers
   * @summary Subtract the specified number of seconds from the given date.
   *
   * @description
   * Subtract the specified number of seconds from the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param amount - The amount of seconds to be subtracted.
   *
   * @returns The new date with the seconds subtracted
   *
   * @example
   * // Subtract 30 seconds from 10 July 2014 12:45:00:
   * const result = subSeconds(new Date(2014, 6, 10, 12, 45, 0), 30)
   * //=> Thu Jul 10 2014 12:44:30
   */
  function subSeconds$1(date, amount) {
    return (0, _index.addSeconds)(date, -amount);
  }
  return subSeconds;
}

var subWeeks = {};

var hasRequiredSubWeeks;

function requireSubWeeks() {
  if (hasRequiredSubWeeks) return subWeeks;
  hasRequiredSubWeeks = 1;
  subWeeks.subWeeks = subWeeks$1;
  var _index = /*@__PURE__*/ requireAddWeeks();

  /**
   * @name subWeeks
   * @category Week Helpers
   * @summary Subtract the specified number of weeks from the given date.
   *
   * @description
   * Subtract the specified number of weeks from the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param amount - The amount of weeks to be subtracted.
   *
   * @returns The new date with the weeks subtracted
   *
   * @example
   * // Subtract 4 weeks from 1 September 2014:
   * const result = subWeeks(new Date(2014, 8, 1), 4)
   * //=> Mon Aug 04 2014 00:00:00
   */
  function subWeeks$1(date, amount) {
    return (0, _index.addWeeks)(date, -amount);
  }
  return subWeeks;
}

var subYears = {};

var hasRequiredSubYears;

function requireSubYears() {
  if (hasRequiredSubYears) return subYears;
  hasRequiredSubYears = 1;
  subYears.subYears = subYears$1;
  var _index = /*@__PURE__*/ requireAddYears();

  /**
   * @name subYears
   * @category Year Helpers
   * @summary Subtract the specified number of years from the given date.
   *
   * @description
   * Subtract the specified number of years from the given date.
   *
   * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
   *
   * @param date - The date to be changed
   * @param amount - The amount of years to be subtracted.
   *
   * @returns The new date with the years subtracted
   *
   * @example
   * // Subtract 5 years from 1 September 2014:
   * const result = subYears(new Date(2014, 8, 1), 5)
   * //=> Tue Sep 01 2009 00:00:00
   */
  function subYears$1(date, amount) {
    return (0, _index.addYears)(date, -amount);
  }
  return subYears;
}

var weeksToDays = {};

var hasRequiredWeeksToDays;

function requireWeeksToDays() {
  if (hasRequiredWeeksToDays) return weeksToDays;
  hasRequiredWeeksToDays = 1;
  weeksToDays.weeksToDays = weeksToDays$1;
  var _index = /*@__PURE__*/ requireConstants$1();

  /**
   * @name weeksToDays
   * @category Conversion Helpers
   * @summary Convert weeks to days.
   *
   * @description
   * Convert a number of weeks to a full number of days.
   *
   * @param weeks - The number of weeks to be converted
   *
   * @returns The number of weeks converted in days
   *
   * @example
   * // Convert 2 weeks into days
   * const result = weeksToDays(2)
   * //=> 14
   */
  function weeksToDays$1(weeks) {
    return Math.trunc(weeks * _index.daysInWeek);
  }
  return weeksToDays;
}

var yearsToDays = {};

var hasRequiredYearsToDays;

function requireYearsToDays() {
  if (hasRequiredYearsToDays) return yearsToDays;
  hasRequiredYearsToDays = 1;
  yearsToDays.yearsToDays = yearsToDays$1;
  var _index = /*@__PURE__*/ requireConstants$1();

  /**
   * @name yearsToDays
   * @category Conversion Helpers
   * @summary Convert years to days.
   *
   * @description
   * Convert a number of years to a full number of days.
   *
   * @param years - The number of years to be converted
   *
   * @returns The number of years converted in days
   *
   * @example
   * // Convert 2 years into days
   * const result = yearsToDays(2)
   * //=> 730
   */
  function yearsToDays$1(years) {
    return Math.trunc(years * _index.daysInYear);
  }
  return yearsToDays;
}

var yearsToMonths = {};

var hasRequiredYearsToMonths;

function requireYearsToMonths() {
  if (hasRequiredYearsToMonths) return yearsToMonths;
  hasRequiredYearsToMonths = 1;
  yearsToMonths.yearsToMonths = yearsToMonths$1;
  var _index = /*@__PURE__*/ requireConstants$1();

  /**
   * @name yearsToMonths
   * @category Conversion Helpers
   * @summary Convert years to months.
   *
   * @description
   * Convert a number of years to a full number of months.
   *
   * @param years - The number of years to be converted
   *
   * @returns The number of years converted in months
   *
   * @example
   * // Convert 2 years into months
   * const result = yearsToMonths(2)
   * //=> 24
   */
  function yearsToMonths$1(years) {
    return Math.trunc(years * _index.monthsInYear);
  }
  return yearsToMonths;
}

var yearsToQuarters = {};

var hasRequiredYearsToQuarters;

function requireYearsToQuarters() {
  if (hasRequiredYearsToQuarters) return yearsToQuarters;
  hasRequiredYearsToQuarters = 1;
  yearsToQuarters.yearsToQuarters = yearsToQuarters$1;
  var _index = /*@__PURE__*/ requireConstants$1();

  /**
   * @name yearsToQuarters
   * @category Conversion Helpers
   * @summary Convert years to quarters.
   *
   * @description
   * Convert a number of years to a full number of quarters.
   *
   * @param years - The number of years to be converted
   *
   * @returns The number of years converted in quarters
   *
   * @example
   * // Convert 2 years to quarters
   * const result = yearsToQuarters(2)
   * //=> 8
   */
  function yearsToQuarters$1(years) {
    return Math.trunc(years * _index.quartersInYear);
  }
  return yearsToQuarters;
}

var hasRequiredDateFns;

function requireDateFns() {
  if (hasRequiredDateFns) return dateFns;
  hasRequiredDateFns = 1;
  (function (exports) {
    var _index = /*@__PURE__*/ requireAdd();
    Object.keys(_index).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index[key];
        },
      });
    });
    var _index2 = /*@__PURE__*/ requireAddBusinessDays();
    Object.keys(_index2).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index2[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index2[key];
        },
      });
    });
    var _index3 = /*@__PURE__*/ requireAddDays();
    Object.keys(_index3).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index3[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index3[key];
        },
      });
    });
    var _index4 = /*@__PURE__*/ requireAddHours();
    Object.keys(_index4).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index4[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index4[key];
        },
      });
    });
    var _index5 = /*@__PURE__*/ requireAddISOWeekYears();
    Object.keys(_index5).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index5[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index5[key];
        },
      });
    });
    var _index6 = /*@__PURE__*/ requireAddMilliseconds();
    Object.keys(_index6).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index6[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index6[key];
        },
      });
    });
    var _index7 = /*@__PURE__*/ requireAddMinutes();
    Object.keys(_index7).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index7[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index7[key];
        },
      });
    });
    var _index8 = /*@__PURE__*/ requireAddMonths();
    Object.keys(_index8).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index8[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index8[key];
        },
      });
    });
    var _index9 = /*@__PURE__*/ requireAddQuarters();
    Object.keys(_index9).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index9[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index9[key];
        },
      });
    });
    var _index10 = /*@__PURE__*/ requireAddSeconds();
    Object.keys(_index10).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index10[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index10[key];
        },
      });
    });
    var _index11 = /*@__PURE__*/ requireAddWeeks();
    Object.keys(_index11).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index11[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index11[key];
        },
      });
    });
    var _index12 = /*@__PURE__*/ requireAddYears();
    Object.keys(_index12).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index12[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index12[key];
        },
      });
    });
    var _index13 = /*@__PURE__*/ requireAreIntervalsOverlapping();
    Object.keys(_index13).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index13[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index13[key];
        },
      });
    });
    var _index14 = /*@__PURE__*/ requireClamp();
    Object.keys(_index14).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index14[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index14[key];
        },
      });
    });
    var _index15 = /*@__PURE__*/ requireClosestIndexTo();
    Object.keys(_index15).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index15[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index15[key];
        },
      });
    });
    var _index16 = /*@__PURE__*/ requireClosestTo();
    Object.keys(_index16).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index16[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index16[key];
        },
      });
    });
    var _index17 = /*@__PURE__*/ requireCompareAsc();
    Object.keys(_index17).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index17[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index17[key];
        },
      });
    });
    var _index18 = /*@__PURE__*/ requireCompareDesc();
    Object.keys(_index18).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index18[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index18[key];
        },
      });
    });
    var _index19 = /*@__PURE__*/ requireConstructFrom();
    Object.keys(_index19).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index19[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index19[key];
        },
      });
    });
    var _index20 = /*@__PURE__*/ requireConstructNow();
    Object.keys(_index20).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index20[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index20[key];
        },
      });
    });
    var _index21 = /*@__PURE__*/ requireDaysToWeeks();
    Object.keys(_index21).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index21[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index21[key];
        },
      });
    });
    var _index22 = /*@__PURE__*/ requireDifferenceInBusinessDays();
    Object.keys(_index22).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index22[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index22[key];
        },
      });
    });
    var _index23 = /*@__PURE__*/ requireDifferenceInCalendarDays();
    Object.keys(_index23).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index23[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index23[key];
        },
      });
    });
    var _index24 = /*@__PURE__*/ requireDifferenceInCalendarISOWeekYears();
    Object.keys(_index24).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index24[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index24[key];
        },
      });
    });
    var _index25 = /*@__PURE__*/ requireDifferenceInCalendarISOWeeks();
    Object.keys(_index25).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index25[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index25[key];
        },
      });
    });
    var _index26 = /*@__PURE__*/ requireDifferenceInCalendarMonths();
    Object.keys(_index26).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index26[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index26[key];
        },
      });
    });
    var _index27 = /*@__PURE__*/ requireDifferenceInCalendarQuarters();
    Object.keys(_index27).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index27[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index27[key];
        },
      });
    });
    var _index28 = /*@__PURE__*/ requireDifferenceInCalendarWeeks();
    Object.keys(_index28).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index28[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index28[key];
        },
      });
    });
    var _index29 = /*@__PURE__*/ requireDifferenceInCalendarYears();
    Object.keys(_index29).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index29[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index29[key];
        },
      });
    });
    var _index30 = /*@__PURE__*/ requireDifferenceInDays();
    Object.keys(_index30).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index30[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index30[key];
        },
      });
    });
    var _index31 = /*@__PURE__*/ requireDifferenceInHours();
    Object.keys(_index31).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index31[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index31[key];
        },
      });
    });
    var _index32 = /*@__PURE__*/ requireDifferenceInISOWeekYears();
    Object.keys(_index32).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index32[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index32[key];
        },
      });
    });
    var _index33 = /*@__PURE__*/ requireDifferenceInMilliseconds();
    Object.keys(_index33).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index33[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index33[key];
        },
      });
    });
    var _index34 = /*@__PURE__*/ requireDifferenceInMinutes();
    Object.keys(_index34).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index34[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index34[key];
        },
      });
    });
    var _index35 = /*@__PURE__*/ requireDifferenceInMonths();
    Object.keys(_index35).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index35[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index35[key];
        },
      });
    });
    var _index36 = /*@__PURE__*/ requireDifferenceInQuarters();
    Object.keys(_index36).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index36[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index36[key];
        },
      });
    });
    var _index37 = /*@__PURE__*/ requireDifferenceInSeconds();
    Object.keys(_index37).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index37[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index37[key];
        },
      });
    });
    var _index38 = /*@__PURE__*/ requireDifferenceInWeeks();
    Object.keys(_index38).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index38[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index38[key];
        },
      });
    });
    var _index39 = /*@__PURE__*/ requireDifferenceInYears();
    Object.keys(_index39).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index39[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index39[key];
        },
      });
    });
    var _index40 = /*@__PURE__*/ requireEachDayOfInterval();
    Object.keys(_index40).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index40[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index40[key];
        },
      });
    });
    var _index41 = /*@__PURE__*/ requireEachHourOfInterval();
    Object.keys(_index41).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index41[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index41[key];
        },
      });
    });
    var _index42 = /*@__PURE__*/ requireEachMinuteOfInterval();
    Object.keys(_index42).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index42[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index42[key];
        },
      });
    });
    var _index43 = /*@__PURE__*/ requireEachMonthOfInterval();
    Object.keys(_index43).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index43[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index43[key];
        },
      });
    });
    var _index44 = /*@__PURE__*/ requireEachQuarterOfInterval();
    Object.keys(_index44).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index44[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index44[key];
        },
      });
    });
    var _index45 = /*@__PURE__*/ requireEachWeekOfInterval();
    Object.keys(_index45).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index45[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index45[key];
        },
      });
    });
    var _index46 = /*@__PURE__*/ requireEachWeekendOfInterval();
    Object.keys(_index46).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index46[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index46[key];
        },
      });
    });
    var _index47 = /*@__PURE__*/ requireEachWeekendOfMonth();
    Object.keys(_index47).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index47[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index47[key];
        },
      });
    });
    var _index48 = /*@__PURE__*/ requireEachWeekendOfYear();
    Object.keys(_index48).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index48[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index48[key];
        },
      });
    });
    var _index49 = /*@__PURE__*/ requireEachYearOfInterval();
    Object.keys(_index49).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index49[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index49[key];
        },
      });
    });
    var _index50 = /*@__PURE__*/ requireEndOfDay();
    Object.keys(_index50).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index50[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index50[key];
        },
      });
    });
    var _index51 = /*@__PURE__*/ requireEndOfDecade();
    Object.keys(_index51).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index51[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index51[key];
        },
      });
    });
    var _index52 = /*@__PURE__*/ requireEndOfHour();
    Object.keys(_index52).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index52[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index52[key];
        },
      });
    });
    var _index53 = /*@__PURE__*/ requireEndOfISOWeek();
    Object.keys(_index53).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index53[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index53[key];
        },
      });
    });
    var _index54 = /*@__PURE__*/ requireEndOfISOWeekYear();
    Object.keys(_index54).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index54[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index54[key];
        },
      });
    });
    var _index55 = /*@__PURE__*/ requireEndOfMinute();
    Object.keys(_index55).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index55[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index55[key];
        },
      });
    });
    var _index56 = /*@__PURE__*/ requireEndOfMonth();
    Object.keys(_index56).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index56[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index56[key];
        },
      });
    });
    var _index57 = /*@__PURE__*/ requireEndOfQuarter();
    Object.keys(_index57).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index57[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index57[key];
        },
      });
    });
    var _index58 = /*@__PURE__*/ requireEndOfSecond();
    Object.keys(_index58).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index58[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index58[key];
        },
      });
    });
    var _index59 = /*@__PURE__*/ requireEndOfToday();
    Object.keys(_index59).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index59[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index59[key];
        },
      });
    });
    var _index60 = /*@__PURE__*/ requireEndOfTomorrow();
    Object.keys(_index60).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index60[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index60[key];
        },
      });
    });
    var _index61 = /*@__PURE__*/ requireEndOfWeek();
    Object.keys(_index61).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index61[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index61[key];
        },
      });
    });
    var _index62 = /*@__PURE__*/ requireEndOfYear();
    Object.keys(_index62).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index62[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index62[key];
        },
      });
    });
    var _index63 = /*@__PURE__*/ requireEndOfYesterday();
    Object.keys(_index63).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index63[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index63[key];
        },
      });
    });
    var _index64 = /*@__PURE__*/ requireFormat();
    Object.keys(_index64).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index64[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index64[key];
        },
      });
    });
    var _index65 = /*@__PURE__*/ requireFormatDistance();
    Object.keys(_index65).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index65[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index65[key];
        },
      });
    });
    var _index66 = /*@__PURE__*/ requireFormatDistanceStrict();
    Object.keys(_index66).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index66[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index66[key];
        },
      });
    });
    var _index67 = /*@__PURE__*/ requireFormatDistanceToNow();
    Object.keys(_index67).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index67[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index67[key];
        },
      });
    });
    var _index68 = /*@__PURE__*/ requireFormatDistanceToNowStrict();
    Object.keys(_index68).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index68[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index68[key];
        },
      });
    });
    var _index69 = /*@__PURE__*/ requireFormatDuration();
    Object.keys(_index69).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index69[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index69[key];
        },
      });
    });
    var _index70 = /*@__PURE__*/ requireFormatISO();
    Object.keys(_index70).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index70[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index70[key];
        },
      });
    });
    var _index71 = /*@__PURE__*/ requireFormatISO9075();
    Object.keys(_index71).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index71[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index71[key];
        },
      });
    });
    var _index72 = /*@__PURE__*/ requireFormatISODuration();
    Object.keys(_index72).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index72[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index72[key];
        },
      });
    });
    var _index73 = /*@__PURE__*/ requireFormatRFC3339();
    Object.keys(_index73).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index73[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index73[key];
        },
      });
    });
    var _index74 = /*@__PURE__*/ requireFormatRFC7231();
    Object.keys(_index74).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index74[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index74[key];
        },
      });
    });
    var _index75 = /*@__PURE__*/ requireFormatRelative();
    Object.keys(_index75).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index75[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index75[key];
        },
      });
    });
    var _index76 = /*@__PURE__*/ requireFromUnixTime();
    Object.keys(_index76).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index76[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index76[key];
        },
      });
    });
    var _index77 = /*@__PURE__*/ requireGetDate();
    Object.keys(_index77).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index77[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index77[key];
        },
      });
    });
    var _index78 = /*@__PURE__*/ requireGetDay();
    Object.keys(_index78).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index78[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index78[key];
        },
      });
    });
    var _index79 = /*@__PURE__*/ requireGetDayOfYear();
    Object.keys(_index79).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index79[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index79[key];
        },
      });
    });
    var _index80 = /*@__PURE__*/ requireGetDaysInMonth();
    Object.keys(_index80).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index80[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index80[key];
        },
      });
    });
    var _index81 = /*@__PURE__*/ requireGetDaysInYear();
    Object.keys(_index81).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index81[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index81[key];
        },
      });
    });
    var _index82 = /*@__PURE__*/ requireGetDecade();
    Object.keys(_index82).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index82[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index82[key];
        },
      });
    });
    var _index83 = /*@__PURE__*/ requireGetDefaultOptions();
    Object.keys(_index83).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index83[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index83[key];
        },
      });
    });
    var _index84 = /*@__PURE__*/ requireGetHours();
    Object.keys(_index84).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index84[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index84[key];
        },
      });
    });
    var _index85 = /*@__PURE__*/ requireGetISODay();
    Object.keys(_index85).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index85[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index85[key];
        },
      });
    });
    var _index86 = /*@__PURE__*/ requireGetISOWeek();
    Object.keys(_index86).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index86[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index86[key];
        },
      });
    });
    var _index87 = /*@__PURE__*/ requireGetISOWeekYear();
    Object.keys(_index87).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index87[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index87[key];
        },
      });
    });
    var _index88 = /*@__PURE__*/ requireGetISOWeeksInYear();
    Object.keys(_index88).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index88[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index88[key];
        },
      });
    });
    var _index89 = /*@__PURE__*/ requireGetMilliseconds();
    Object.keys(_index89).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index89[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index89[key];
        },
      });
    });
    var _index90 = /*@__PURE__*/ requireGetMinutes();
    Object.keys(_index90).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index90[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index90[key];
        },
      });
    });
    var _index91 = /*@__PURE__*/ requireGetMonth();
    Object.keys(_index91).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index91[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index91[key];
        },
      });
    });
    var _index92 = /*@__PURE__*/ requireGetOverlappingDaysInIntervals();
    Object.keys(_index92).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index92[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index92[key];
        },
      });
    });
    var _index93 = /*@__PURE__*/ requireGetQuarter();
    Object.keys(_index93).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index93[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index93[key];
        },
      });
    });
    var _index94 = /*@__PURE__*/ requireGetSeconds();
    Object.keys(_index94).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index94[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index94[key];
        },
      });
    });
    var _index95 = /*@__PURE__*/ requireGetTime();
    Object.keys(_index95).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index95[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index95[key];
        },
      });
    });
    var _index96 = /*@__PURE__*/ requireGetUnixTime();
    Object.keys(_index96).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index96[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index96[key];
        },
      });
    });
    var _index97 = /*@__PURE__*/ requireGetWeek();
    Object.keys(_index97).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index97[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index97[key];
        },
      });
    });
    var _index98 = /*@__PURE__*/ requireGetWeekOfMonth();
    Object.keys(_index98).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index98[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index98[key];
        },
      });
    });
    var _index99 = /*@__PURE__*/ requireGetWeekYear();
    Object.keys(_index99).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index99[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index99[key];
        },
      });
    });
    var _index100 = /*@__PURE__*/ requireGetWeeksInMonth();
    Object.keys(_index100).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index100[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index100[key];
        },
      });
    });
    var _index101 = /*@__PURE__*/ requireGetYear();
    Object.keys(_index101).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index101[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index101[key];
        },
      });
    });
    var _index102 = /*@__PURE__*/ requireHoursToMilliseconds();
    Object.keys(_index102).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index102[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index102[key];
        },
      });
    });
    var _index103 = /*@__PURE__*/ requireHoursToMinutes();
    Object.keys(_index103).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index103[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index103[key];
        },
      });
    });
    var _index104 = /*@__PURE__*/ requireHoursToSeconds();
    Object.keys(_index104).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index104[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index104[key];
        },
      });
    });
    var _index105 = /*@__PURE__*/ requireInterval();
    Object.keys(_index105).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index105[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index105[key];
        },
      });
    });
    var _index106 = /*@__PURE__*/ requireIntervalToDuration();
    Object.keys(_index106).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index106[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index106[key];
        },
      });
    });
    var _index107 = /*@__PURE__*/ requireIntlFormat();
    Object.keys(_index107).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index107[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index107[key];
        },
      });
    });
    var _index108 = /*@__PURE__*/ requireIntlFormatDistance();
    Object.keys(_index108).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index108[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index108[key];
        },
      });
    });
    var _index109 = /*@__PURE__*/ requireIsAfter();
    Object.keys(_index109).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index109[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index109[key];
        },
      });
    });
    var _index110 = /*@__PURE__*/ requireIsBefore();
    Object.keys(_index110).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index110[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index110[key];
        },
      });
    });
    var _index111 = /*@__PURE__*/ requireIsDate();
    Object.keys(_index111).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index111[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index111[key];
        },
      });
    });
    var _index112 = /*@__PURE__*/ requireIsEqual();
    Object.keys(_index112).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index112[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index112[key];
        },
      });
    });
    var _index113 = /*@__PURE__*/ requireIsExists();
    Object.keys(_index113).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index113[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index113[key];
        },
      });
    });
    var _index114 = /*@__PURE__*/ requireIsFirstDayOfMonth();
    Object.keys(_index114).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index114[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index114[key];
        },
      });
    });
    var _index115 = /*@__PURE__*/ requireIsFriday();
    Object.keys(_index115).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index115[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index115[key];
        },
      });
    });
    var _index116 = /*@__PURE__*/ requireIsFuture();
    Object.keys(_index116).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index116[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index116[key];
        },
      });
    });
    var _index117 = /*@__PURE__*/ requireIsLastDayOfMonth();
    Object.keys(_index117).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index117[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index117[key];
        },
      });
    });
    var _index118 = /*@__PURE__*/ requireIsLeapYear();
    Object.keys(_index118).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index118[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index118[key];
        },
      });
    });
    var _index119 = /*@__PURE__*/ requireIsMatch();
    Object.keys(_index119).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index119[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index119[key];
        },
      });
    });
    var _index120 = /*@__PURE__*/ requireIsMonday();
    Object.keys(_index120).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index120[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index120[key];
        },
      });
    });
    var _index121 = /*@__PURE__*/ requireIsPast();
    Object.keys(_index121).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index121[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index121[key];
        },
      });
    });
    var _index122 = /*@__PURE__*/ requireIsSameDay();
    Object.keys(_index122).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index122[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index122[key];
        },
      });
    });
    var _index123 = /*@__PURE__*/ requireIsSameHour();
    Object.keys(_index123).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index123[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index123[key];
        },
      });
    });
    var _index124 = /*@__PURE__*/ requireIsSameISOWeek();
    Object.keys(_index124).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index124[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index124[key];
        },
      });
    });
    var _index125 = /*@__PURE__*/ requireIsSameISOWeekYear();
    Object.keys(_index125).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index125[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index125[key];
        },
      });
    });
    var _index126 = /*@__PURE__*/ requireIsSameMinute();
    Object.keys(_index126).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index126[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index126[key];
        },
      });
    });
    var _index127 = /*@__PURE__*/ requireIsSameMonth();
    Object.keys(_index127).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index127[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index127[key];
        },
      });
    });
    var _index128 = /*@__PURE__*/ requireIsSameQuarter();
    Object.keys(_index128).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index128[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index128[key];
        },
      });
    });
    var _index129 = /*@__PURE__*/ requireIsSameSecond();
    Object.keys(_index129).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index129[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index129[key];
        },
      });
    });
    var _index130 = /*@__PURE__*/ requireIsSameWeek();
    Object.keys(_index130).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index130[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index130[key];
        },
      });
    });
    var _index131 = /*@__PURE__*/ requireIsSameYear();
    Object.keys(_index131).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index131[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index131[key];
        },
      });
    });
    var _index132 = /*@__PURE__*/ requireIsSaturday();
    Object.keys(_index132).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index132[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index132[key];
        },
      });
    });
    var _index133 = /*@__PURE__*/ requireIsSunday();
    Object.keys(_index133).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index133[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index133[key];
        },
      });
    });
    var _index134 = /*@__PURE__*/ requireIsThisHour();
    Object.keys(_index134).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index134[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index134[key];
        },
      });
    });
    var _index135 = /*@__PURE__*/ requireIsThisISOWeek();
    Object.keys(_index135).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index135[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index135[key];
        },
      });
    });
    var _index136 = /*@__PURE__*/ requireIsThisMinute();
    Object.keys(_index136).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index136[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index136[key];
        },
      });
    });
    var _index137 = /*@__PURE__*/ requireIsThisMonth();
    Object.keys(_index137).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index137[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index137[key];
        },
      });
    });
    var _index138 = /*@__PURE__*/ requireIsThisQuarter();
    Object.keys(_index138).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index138[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index138[key];
        },
      });
    });
    var _index139 = /*@__PURE__*/ requireIsThisSecond();
    Object.keys(_index139).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index139[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index139[key];
        },
      });
    });
    var _index140 = /*@__PURE__*/ requireIsThisWeek();
    Object.keys(_index140).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index140[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index140[key];
        },
      });
    });
    var _index141 = /*@__PURE__*/ requireIsThisYear();
    Object.keys(_index141).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index141[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index141[key];
        },
      });
    });
    var _index142 = /*@__PURE__*/ requireIsThursday();
    Object.keys(_index142).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index142[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index142[key];
        },
      });
    });
    var _index143 = /*@__PURE__*/ requireIsToday();
    Object.keys(_index143).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index143[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index143[key];
        },
      });
    });
    var _index144 = /*@__PURE__*/ requireIsTomorrow();
    Object.keys(_index144).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index144[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index144[key];
        },
      });
    });
    var _index145 = /*@__PURE__*/ requireIsTuesday();
    Object.keys(_index145).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index145[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index145[key];
        },
      });
    });
    var _index146 = /*@__PURE__*/ requireIsValid();
    Object.keys(_index146).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index146[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index146[key];
        },
      });
    });
    var _index147 = /*@__PURE__*/ requireIsWednesday();
    Object.keys(_index147).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index147[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index147[key];
        },
      });
    });
    var _index148 = /*@__PURE__*/ requireIsWeekend();
    Object.keys(_index148).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index148[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index148[key];
        },
      });
    });
    var _index149 = /*@__PURE__*/ requireIsWithinInterval();
    Object.keys(_index149).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index149[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index149[key];
        },
      });
    });
    var _index150 = /*@__PURE__*/ requireIsYesterday();
    Object.keys(_index150).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index150[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index150[key];
        },
      });
    });
    var _index151 = /*@__PURE__*/ requireLastDayOfDecade();
    Object.keys(_index151).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index151[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index151[key];
        },
      });
    });
    var _index152 = /*@__PURE__*/ requireLastDayOfISOWeek();
    Object.keys(_index152).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index152[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index152[key];
        },
      });
    });
    var _index153 = /*@__PURE__*/ requireLastDayOfISOWeekYear();
    Object.keys(_index153).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index153[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index153[key];
        },
      });
    });
    var _index154 = /*@__PURE__*/ requireLastDayOfMonth();
    Object.keys(_index154).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index154[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index154[key];
        },
      });
    });
    var _index155 = /*@__PURE__*/ requireLastDayOfQuarter();
    Object.keys(_index155).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index155[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index155[key];
        },
      });
    });
    var _index156 = /*@__PURE__*/ requireLastDayOfWeek();
    Object.keys(_index156).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index156[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index156[key];
        },
      });
    });
    var _index157 = /*@__PURE__*/ requireLastDayOfYear();
    Object.keys(_index157).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index157[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index157[key];
        },
      });
    });
    var _index158 = /*@__PURE__*/ requireLightFormat();
    Object.keys(_index158).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index158[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index158[key];
        },
      });
    });
    var _index159 = /*@__PURE__*/ requireMax();
    Object.keys(_index159).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index159[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index159[key];
        },
      });
    });
    var _index160 = /*@__PURE__*/ requireMilliseconds();
    Object.keys(_index160).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index160[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index160[key];
        },
      });
    });
    var _index161 = /*@__PURE__*/ requireMillisecondsToHours();
    Object.keys(_index161).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index161[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index161[key];
        },
      });
    });
    var _index162 = /*@__PURE__*/ requireMillisecondsToMinutes();
    Object.keys(_index162).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index162[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index162[key];
        },
      });
    });
    var _index163 = /*@__PURE__*/ requireMillisecondsToSeconds();
    Object.keys(_index163).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index163[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index163[key];
        },
      });
    });
    var _index164 = /*@__PURE__*/ requireMin();
    Object.keys(_index164).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index164[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index164[key];
        },
      });
    });
    var _index165 = /*@__PURE__*/ requireMinutesToHours();
    Object.keys(_index165).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index165[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index165[key];
        },
      });
    });
    var _index166 = /*@__PURE__*/ requireMinutesToMilliseconds();
    Object.keys(_index166).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index166[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index166[key];
        },
      });
    });
    var _index167 = /*@__PURE__*/ requireMinutesToSeconds();
    Object.keys(_index167).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index167[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index167[key];
        },
      });
    });
    var _index168 = /*@__PURE__*/ requireMonthsToQuarters();
    Object.keys(_index168).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index168[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index168[key];
        },
      });
    });
    var _index169 = /*@__PURE__*/ requireMonthsToYears();
    Object.keys(_index169).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index169[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index169[key];
        },
      });
    });
    var _index170 = /*@__PURE__*/ requireNextDay();
    Object.keys(_index170).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index170[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index170[key];
        },
      });
    });
    var _index171 = /*@__PURE__*/ requireNextFriday();
    Object.keys(_index171).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index171[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index171[key];
        },
      });
    });
    var _index172 = /*@__PURE__*/ requireNextMonday();
    Object.keys(_index172).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index172[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index172[key];
        },
      });
    });
    var _index173 = /*@__PURE__*/ requireNextSaturday();
    Object.keys(_index173).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index173[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index173[key];
        },
      });
    });
    var _index174 = /*@__PURE__*/ requireNextSunday();
    Object.keys(_index174).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index174[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index174[key];
        },
      });
    });
    var _index175 = /*@__PURE__*/ requireNextThursday();
    Object.keys(_index175).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index175[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index175[key];
        },
      });
    });
    var _index176 = /*@__PURE__*/ requireNextTuesday();
    Object.keys(_index176).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index176[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index176[key];
        },
      });
    });
    var _index177 = /*@__PURE__*/ requireNextWednesday();
    Object.keys(_index177).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index177[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index177[key];
        },
      });
    });
    var _index178 = /*@__PURE__*/ requireParse();
    Object.keys(_index178).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index178[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index178[key];
        },
      });
    });
    var _index179 = /*@__PURE__*/ requireParseISO();
    Object.keys(_index179).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index179[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index179[key];
        },
      });
    });
    var _index180 = /*@__PURE__*/ requireParseJSON();
    Object.keys(_index180).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index180[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index180[key];
        },
      });
    });
    var _index181 = /*@__PURE__*/ requirePreviousDay();
    Object.keys(_index181).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index181[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index181[key];
        },
      });
    });
    var _index182 = /*@__PURE__*/ requirePreviousFriday();
    Object.keys(_index182).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index182[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index182[key];
        },
      });
    });
    var _index183 = /*@__PURE__*/ requirePreviousMonday();
    Object.keys(_index183).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index183[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index183[key];
        },
      });
    });
    var _index184 = /*@__PURE__*/ requirePreviousSaturday();
    Object.keys(_index184).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index184[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index184[key];
        },
      });
    });
    var _index185 = /*@__PURE__*/ requirePreviousSunday();
    Object.keys(_index185).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index185[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index185[key];
        },
      });
    });
    var _index186 = /*@__PURE__*/ requirePreviousThursday();
    Object.keys(_index186).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index186[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index186[key];
        },
      });
    });
    var _index187 = /*@__PURE__*/ requirePreviousTuesday();
    Object.keys(_index187).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index187[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index187[key];
        },
      });
    });
    var _index188 = /*@__PURE__*/ requirePreviousWednesday();
    Object.keys(_index188).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index188[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index188[key];
        },
      });
    });
    var _index189 = /*@__PURE__*/ requireQuartersToMonths();
    Object.keys(_index189).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index189[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index189[key];
        },
      });
    });
    var _index190 = /*@__PURE__*/ requireQuartersToYears();
    Object.keys(_index190).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index190[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index190[key];
        },
      });
    });
    var _index191 = /*@__PURE__*/ requireRoundToNearestHours();
    Object.keys(_index191).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index191[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index191[key];
        },
      });
    });
    var _index192 = /*@__PURE__*/ requireRoundToNearestMinutes();
    Object.keys(_index192).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index192[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index192[key];
        },
      });
    });
    var _index193 = /*@__PURE__*/ requireSecondsToHours();
    Object.keys(_index193).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index193[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index193[key];
        },
      });
    });
    var _index194 = /*@__PURE__*/ requireSecondsToMilliseconds();
    Object.keys(_index194).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index194[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index194[key];
        },
      });
    });
    var _index195 = /*@__PURE__*/ requireSecondsToMinutes();
    Object.keys(_index195).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index195[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index195[key];
        },
      });
    });
    var _index196 = /*@__PURE__*/ requireSet();
    Object.keys(_index196).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index196[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index196[key];
        },
      });
    });
    var _index197 = /*@__PURE__*/ requireSetDate();
    Object.keys(_index197).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index197[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index197[key];
        },
      });
    });
    var _index198 = /*@__PURE__*/ requireSetDay();
    Object.keys(_index198).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index198[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index198[key];
        },
      });
    });
    var _index199 = /*@__PURE__*/ requireSetDayOfYear();
    Object.keys(_index199).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index199[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index199[key];
        },
      });
    });
    var _index200 = /*@__PURE__*/ requireSetDefaultOptions();
    Object.keys(_index200).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index200[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index200[key];
        },
      });
    });
    var _index201 = /*@__PURE__*/ requireSetHours();
    Object.keys(_index201).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index201[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index201[key];
        },
      });
    });
    var _index202 = /*@__PURE__*/ requireSetISODay();
    Object.keys(_index202).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index202[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index202[key];
        },
      });
    });
    var _index203 = /*@__PURE__*/ requireSetISOWeek();
    Object.keys(_index203).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index203[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index203[key];
        },
      });
    });
    var _index204 = /*@__PURE__*/ requireSetISOWeekYear();
    Object.keys(_index204).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index204[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index204[key];
        },
      });
    });
    var _index205 = /*@__PURE__*/ requireSetMilliseconds();
    Object.keys(_index205).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index205[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index205[key];
        },
      });
    });
    var _index206 = /*@__PURE__*/ requireSetMinutes();
    Object.keys(_index206).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index206[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index206[key];
        },
      });
    });
    var _index207 = /*@__PURE__*/ requireSetMonth();
    Object.keys(_index207).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index207[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index207[key];
        },
      });
    });
    var _index208 = /*@__PURE__*/ requireSetQuarter();
    Object.keys(_index208).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index208[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index208[key];
        },
      });
    });
    var _index209 = /*@__PURE__*/ requireSetSeconds();
    Object.keys(_index209).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index209[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index209[key];
        },
      });
    });
    var _index210 = /*@__PURE__*/ requireSetWeek();
    Object.keys(_index210).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index210[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index210[key];
        },
      });
    });
    var _index211 = /*@__PURE__*/ requireSetWeekYear();
    Object.keys(_index211).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index211[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index211[key];
        },
      });
    });
    var _index212 = /*@__PURE__*/ requireSetYear();
    Object.keys(_index212).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index212[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index212[key];
        },
      });
    });
    var _index213 = /*@__PURE__*/ requireStartOfDay();
    Object.keys(_index213).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index213[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index213[key];
        },
      });
    });
    var _index214 = /*@__PURE__*/ requireStartOfDecade();
    Object.keys(_index214).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index214[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index214[key];
        },
      });
    });
    var _index215 = /*@__PURE__*/ requireStartOfHour();
    Object.keys(_index215).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index215[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index215[key];
        },
      });
    });
    var _index216 = /*@__PURE__*/ requireStartOfISOWeek();
    Object.keys(_index216).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index216[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index216[key];
        },
      });
    });
    var _index217 = /*@__PURE__*/ requireStartOfISOWeekYear();
    Object.keys(_index217).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index217[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index217[key];
        },
      });
    });
    var _index218 = /*@__PURE__*/ requireStartOfMinute();
    Object.keys(_index218).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index218[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index218[key];
        },
      });
    });
    var _index219 = /*@__PURE__*/ requireStartOfMonth();
    Object.keys(_index219).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index219[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index219[key];
        },
      });
    });
    var _index220 = /*@__PURE__*/ requireStartOfQuarter();
    Object.keys(_index220).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index220[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index220[key];
        },
      });
    });
    var _index221 = /*@__PURE__*/ requireStartOfSecond();
    Object.keys(_index221).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index221[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index221[key];
        },
      });
    });
    var _index222 = /*@__PURE__*/ requireStartOfToday();
    Object.keys(_index222).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index222[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index222[key];
        },
      });
    });
    var _index223 = /*@__PURE__*/ requireStartOfTomorrow();
    Object.keys(_index223).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index223[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index223[key];
        },
      });
    });
    var _index224 = /*@__PURE__*/ requireStartOfWeek();
    Object.keys(_index224).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index224[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index224[key];
        },
      });
    });
    var _index225 = /*@__PURE__*/ requireStartOfWeekYear();
    Object.keys(_index225).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index225[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index225[key];
        },
      });
    });
    var _index226 = /*@__PURE__*/ requireStartOfYear();
    Object.keys(_index226).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index226[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index226[key];
        },
      });
    });
    var _index227 = /*@__PURE__*/ requireStartOfYesterday();
    Object.keys(_index227).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index227[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index227[key];
        },
      });
    });
    var _index228 = /*@__PURE__*/ requireSub();
    Object.keys(_index228).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index228[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index228[key];
        },
      });
    });
    var _index229 = /*@__PURE__*/ requireSubBusinessDays();
    Object.keys(_index229).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index229[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index229[key];
        },
      });
    });
    var _index230 = /*@__PURE__*/ requireSubDays();
    Object.keys(_index230).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index230[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index230[key];
        },
      });
    });
    var _index231 = /*@__PURE__*/ requireSubHours();
    Object.keys(_index231).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index231[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index231[key];
        },
      });
    });
    var _index232 = /*@__PURE__*/ requireSubISOWeekYears();
    Object.keys(_index232).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index232[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index232[key];
        },
      });
    });
    var _index233 = /*@__PURE__*/ requireSubMilliseconds();
    Object.keys(_index233).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index233[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index233[key];
        },
      });
    });
    var _index234 = /*@__PURE__*/ requireSubMinutes();
    Object.keys(_index234).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index234[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index234[key];
        },
      });
    });
    var _index235 = /*@__PURE__*/ requireSubMonths();
    Object.keys(_index235).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index235[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index235[key];
        },
      });
    });
    var _index236 = /*@__PURE__*/ requireSubQuarters();
    Object.keys(_index236).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index236[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index236[key];
        },
      });
    });
    var _index237 = /*@__PURE__*/ requireSubSeconds();
    Object.keys(_index237).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index237[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index237[key];
        },
      });
    });
    var _index238 = /*@__PURE__*/ requireSubWeeks();
    Object.keys(_index238).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index238[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index238[key];
        },
      });
    });
    var _index239 = /*@__PURE__*/ requireSubYears();
    Object.keys(_index239).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index239[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index239[key];
        },
      });
    });
    var _index240 = /*@__PURE__*/ requireToDate();
    Object.keys(_index240).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index240[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index240[key];
        },
      });
    });
    var _index241 = /*@__PURE__*/ requireTranspose();
    Object.keys(_index241).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index241[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index241[key];
        },
      });
    });
    var _index242 = /*@__PURE__*/ requireWeeksToDays();
    Object.keys(_index242).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index242[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index242[key];
        },
      });
    });
    var _index243 = /*@__PURE__*/ requireYearsToDays();
    Object.keys(_index243).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index243[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index243[key];
        },
      });
    });
    var _index244 = /*@__PURE__*/ requireYearsToMonths();
    Object.keys(_index244).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index244[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index244[key];
        },
      });
    });
    var _index245 = /*@__PURE__*/ requireYearsToQuarters();
    Object.keys(_index245).forEach(function (key) {
      if (key === 'default' || key === '__esModule') return;
      if (key in exports && exports[key] === _index245[key]) return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _index245[key];
        },
      });
    });
  })(dateFns);
  return dateFns;
}

var dateFnsExports = /*@__PURE__*/ requireDateFns();

const tkDatepickerCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}:host{display:block}.tk-datepicker-container{display:block}.tk-datepicker-panel{display:inline-flex;flex-direction:column;align-items:center;border-radius:var(--radius-xl);box-shadow:var(--effect-1-default-base);background:var(--static-light)}.tk-datepicker-panel:not(.tk-datepicker-panel-inline){position:fixed;z-index:800}.tk-datepicker-panel.tk-datepicker-panel-inline{position:static;box-shadow:none;border:1px solid var(--border-light)}.tk-datepicker-panel .tk-datepicker-panel-inner{display:inline-flex}.tk-datepicker-panel .tk-datepicker-panel-inner .tk-datepicker-calendar-container{display:inline-flex;flex-direction:column}.tk-datepicker-panel .tk-datepicker-panel-inner .tk-datepicker-timepicker-panel{display:flex;flex-direction:column;border-left:1px solid var(--border-light)}.tk-datepicker-header{display:flex;width:336px;padding:var(--datepicker-header-base-top-padding) var(--datepicker-header-base-h-padding) var(--datepicker-header-base-bottom-padding) var(--datepicker-header-base-h-padding);flex-direction:column;align-items:flex-start}.tk-datepicker-header.tk-datepicker-header-basic{border-bottom:var(--spacing-px) solid var(--border-light)}.tk-datepicker-header.tk-datepicker-header-divided .tk-datepicker-header-content{border:1px solid var(--border-light)}.tk-datepicker-header.tk-datepicker-header-light .tk-datepicker-header-content{background:var(--background-lightest)}.tk-datepicker-header.tk-datepicker-header-primary .tk-datepicker-header-content{background:var(--primary-base)}.tk-datepicker-header.tk-datepicker-header-dark .tk-datepicker-header-content{background:var(--background-darkest)}.tk-datepicker-header .tk-datepicker-header-content{display:flex;justify-content:space-between;align-items:center;align-self:stretch;width:100%;border-radius:8px}.tk-datepicker-header .tk-datepicker-header-content .tk-datepicker-select-container{display:flex;padding:0px var(--datepicker-header-base-date-text-h-padding);align-items:center;gap:var(--datepicker-header-base-date-text-gap)}.tk-datepicker-header .tk-datepicker-header-content .tk-datepicker-select-container .tk-datepicker-select-month{color:var(--text-darkest)}.tk-datepicker-header .tk-datepicker-header-content .tk-datepicker-select-container .tk-datepicker-select-year{color:var(--text-base)}.tk-datepicker-header .tk-datepicker-header-content .tk-datepicker-select-container .tk-datepicker-select-month,.tk-datepicker-header .tk-datepicker-header-content .tk-datepicker-select-container .tk-datepicker-select-year{text-align:center;font-family:var(--desktop-body-s-font, Geologica);font-size:var(--desktop-body-s-size);font-style:normal;font-weight:400;line-height:var(--desktop-body-s-line-height);cursor:pointer}.tk-datepicker-header .tk-datepicker-header-content .tk-datepicker-header-content-start,.tk-datepicker-header .tk-datepicker-header-content .tk-datepicker-header-content-end{display:inline-flex;align-items:center;gap:var(--datepicker-header-base-navigation-gap)}.tk-datepicker-header .tk-datepicker-header-content .tk-datepicker-divider{width:1px;height:16px;background-color:var(--border-light)}.tk-datepicker-header.tk-datepicker-header-primary .tk-datepicker-header-icon-button,.tk-datepicker-header.tk-datepicker-header-dark .tk-datepicker-header-icon-button{color:var(--icon-darkest)}.tk-datepicker-header.tk-datepicker-header-primary .tk-datepicker-header-content .tk-datepicker-select-container .tk-datepicker-select-month,.tk-datepicker-header.tk-datepicker-header-primary .tk-datepicker-header-content .tk-datepicker-select-container .tk-datepicker-select-year,.tk-datepicker-header.tk-datepicker-header-dark .tk-datepicker-header-content .tk-datepicker-select-container .tk-datepicker-select-month,.tk-datepicker-header.tk-datepicker-header-dark .tk-datepicker-header-content .tk-datepicker-select-container .tk-datepicker-select-year{color:var(--text-lightest)}.tk-datepicker-body{display:flex;width:336px;padding:var(--datepicker-body-base-day-v-padding) var(--datepicker-body-base-day-h-padding);flex-direction:column;align-items:center;gap:8px;flex-shrink:0}.tk-datepicker-body .tk-datepicker-table{width:100%;height:100%;table-layout:fixed;border-collapse:collapse;border-spacing:8px}.tk-datepicker-body.tk-datepicker-months-view,.tk-datepicker-body.tk-datepicker-years-view{height:260px}.tk-datepicker-week-day-cell{width:var(--datepicker-items-base-size);height:var(--datepicker-items-base-size);min-width:var(--datepicker-items-base-size);min-height:var(--datepicker-items-base-size);text-align:center;vertical-align:middle;padding:0}.tk-datepicker-week-day-cell .tk-datepicker-week-day{color:var(--text-base, #717784);text-align:center;font-family:var(--desktop-body-s-font, Geologica);font-size:var(--desktop-body-s-size);font-style:normal;font-weight:400;line-height:var(--desktop-body-s-line-height)}.tk-datepicker-day-cell{position:relative;min-width:var(--datepicker-items-base-size);height:var(--datepicker-items-base-size);text-align:center;vertical-align:middle;padding-top:2px;padding-bottom:2px;z-index:100;cursor:pointer}.tk-datepicker-day-cell::before{content:"";position:absolute;top:50%;transform:translateY(-50%);background-color:transparent;height:40px}.tk-datepicker-day-cell .tk-datepicker-day{display:inline-block;position:relative;min-width:var(--datepicker-items-base-size);height:var(--datepicker-items-base-size);line-height:var(--datepicker-items-base-size);z-index:100;text-align:center;color:var(--text-darkest);font-family:var(--desktop-body-s-font, Geologica);font-size:var(--desktop-body-s-size);font-style:normal;font-weight:400}.tk-datepicker-day-cell.disabled,.tk-datepicker-day-cell.adjacent-month{pointer-events:none;user-select:none}.tk-datepicker-day-cell.disabled .tk-datepicker-day,.tk-datepicker-day-cell.adjacent-month .tk-datepicker-day{color:var(--text-sub-base)}.tk-datepicker-day-cell.selected .tk-datepicker-day{color:var(--text-lightest);background:var(--primary-base);border-radius:var(--datepicker-items-base-radius)}.tk-datepicker-day-cell.today .tk-datepicker-day{border-radius:var(--datepicker-items-base-radius);border:var(--spacing-px) solid var(--states-info-sub-base);background:var(--background-lightest)}.tk-datepicker-day-cell.in-range:first-child::before{border-top-left-radius:var(--datepicker-items-base-radius);border-bottom-left-radius:var(--datepicker-items-base-radius)}.tk-datepicker-day-cell.in-range:last-child::before{border-top-right-radius:var(--datepicker-items-base-radius);border-bottom-right-radius:var(--datepicker-items-base-radius)}.tk-datepicker-day-cell.in-range::before{background:var(--primary-lightest);width:100%}.tk-datepicker-day-cell.range-start:has(+.in-range)::before,.tk-datepicker-day-cell.range-start:has(+.range-end)::before{background:var(--primary-lightest);width:100%;border-top-left-radius:var(--datepicker-items-base-radius);border-bottom-left-radius:var(--datepicker-items-base-radius)}.tk-datepicker-day-cell.range-start:not(.range-end) .tk-datepicker-day{border-top-right-radius:0;border-bottom-right-radius:0}.tk-datepicker-day-cell.range-end:not(.range-start) .tk-datepicker-day{border-top-left-radius:0;border-bottom-left-radius:0}.tk-datepicker-day-cell:not(.selected):not(.disabled):not(.in-range):hover .tk-datepicker-day{background:var(--background-lightest);border-radius:var(--datepicker-items-base-radius)}.tk-datepicker-table{border-collapse:separate;border-spacing:0}.tk-datepicker-months{display:flex;flex-direction:column;justify-content:space-between;height:100%;width:100%}.tk-datepicker-month-row{display:flex;justify-content:space-between}.tk-datepicker-month,.tk-datepicker-year{display:flex;width:var(--datepicker-items-base-size);height:var(--datepicker-items-base-size);justify-content:center;align-items:center;border-radius:var(--datepicker-items-base-radius);background:var(--static-light);color:var(--text-darkest);text-align:center;font-family:var(--desktop-body-s-font, Geologica);font-size:var(--desktop-body-s-size);font-style:normal;font-weight:400;line-height:var(--desktop-body-s-line-height);cursor:pointer}.tk-datepicker-month:hover,.tk-datepicker-year:hover{background:var(--background-lightest)}.tk-datepicker-month.selected,.tk-datepicker-year.selected{background:var(--primary-base);color:var(--text-lightest)}.tk-datepicker-month.disabled,.tk-datepicker-year.disabled{color:var(--text-sub-base);pointer-events:none}.tk-datepicker-years{display:flex;flex-direction:column;justify-content:space-between;height:100%;width:100%}.tk-datepicker-year-row{display:flex;justify-content:space-between}.tk-datepicker-footer{display:flex;padding:var(--datepicker-footer-base-v-padding) var(--datepicker-footer-base-h-padding);align-items:center;align-self:stretch}.tk-datepicker-footer.tk-datepicker-footer-divided,.tk-datepicker-footer.tk-datepicker-footer-light{border-top:1px solid var(--border-light)}.tk-datepicker-footer.tk-datepicker-footer-light{background:var(--background-lightest);border-bottom-left-radius:var(--radius-xl);border-bottom-right-radius:var(--radius-xl)}.tk-datepicker-timepicker-panel .tk-datepicker-timepicker-header{height:40px;padding:8px 16px 4px;border-bottom:1px solid var(--border-light);border-top-right-radius:var(--radius-sm);border-top-left-radius:var(--radius-sm)}.tk-datepicker-timepicker-header-colon{margin:0 var(--spacing-1)}.tk-datepicker-timepicker-panel .tk-datepicker-timepicker-body{display:flex;gap:4px;padding:var(--datepicker-body-base-day-v-padding) var(--datepicker-body-base-day-h-padding);flex:none;height:calc(var(--datepicker-items-base-size) * 4 + var(--spacing-1) * 3);overflow-y:auto;position:relative}.tk-datepicker-timepicker-panel .tk-datepicker-timepicker-body::before{content:"";position:absolute;top:50%;left:16px;right:16px;height:40px;box-sizing:border-box;border-radius:8px;border:1px solid var(--border-light);background:var(--background-lightest);pointer-events:none;z-index:0}.tk-datepicker-timepicker-col{display:flex;flex-direction:column;align-items:center;gap:4px;flex:1}.tk-datepicker-timepicker-label{font-family:var(--desktop-body-xs-font, Geologica);font-size:var(--desktop-body-xs-size);font-weight:400;color:var(--text-base)}.tk-datepicker-timepicker-arrow{background:none;border:none;color:var(--icon-base);cursor:pointer;padding:8px;font-size:12px;line-height:1}.tk-datepicker-timepicker-value{font-family:var(--desktop-body-s-font, Geologica);font-size:var(--desktop-body-s-size);color:var(--text-darkest);text-align:center;width:100%;height:40px;line-height:40px;position:relative;z-index:100;cursor:pointer}.tk-datepicker-timepicker-value-selected{background:transparent;border:none;padding:0}.tk-datepicker-timepicker-separator{width:100%;height:1px;background-color:var(--border-light)}';

const TkDatePicker = /*@__PURE__*/ proxyCustomElement(
  class TkDatePicker extends H {
    constructor() {
      super();
      this.__registerHost();
      this.__attachShadow();
      this.tkInputChange = createEvent(this, 'tk-input-change', 7);
      this.tkChange = createEvent(this, 'tk-change', 7);
      this.internals = this.attachInternals();
      this.today = new Date();
      this.currentMonth = new Date();
      this.internalSelectedDates = { start: null, end: null };
      this.inputValue = '';
      this.internalStartTime = null;
      this.internalEndTime = null;
      this.hoverDate = null;
      this.currentView = 'days';
      this.maskOptions = {
        date: true,
        delimiter: '-',
        datePattern: ['Y', 'm', 'd'],
      };
      this.isInvalid = false;
      this.isOpen = false;
      /**
       * Defines the size for the label
       * @defaultValue base
       */
      this.size = 'base';
      /**
       * Whether the datepicker is disabled
       * @defaultValue false
       */
      this.disabled = false;
      /**
       * Whether the datepicker is in an invalid state
       */
      this.invalid = false;
      /**
       * Indicates whether the input of datepicker can be cleared
       * @defaultValue false
       */
      this.clearable = false;
      /**
       * Specifies a material icon name to be displayed.
       */
      this.icon = 'calendar_month';
      /**
       * Defines the position of the icon.
       * @defaultValue left
       */
      this.iconPosition = 'left';
      /**
       * Minimum selectable date
       */
      this.minDate = '';
      /**
       * Maximum selectable date
       */
      this.maxDate = '';
      /**
       * Array of dates that are allowed to be selected. All other dates will be disabled.
       *
       * Note: Format should match dateFormat prop
       */
      this.allowedDates = [];
      /**
       * Array of dates that are disabled for selection.
       *
       * Format should match dateFormat prop
       */
      this.disabledDates = [];
      /**
       * Whether to display inline panel
       * @defaultValue false
       */
      this.inline = false;
      /**
       * The selection mode of the date picker: 'single' for single date selection, 'range' for date range selection.
       * @defaultValue single
       */
      this.mode = 'single';
      /**
       * Locale for date formatting
       * @defaultValue en
       */
      this.locale = 'en';
      /**
       * The visual variant of the footer: 'basic', 'divided', or 'light'.
       * @defaultValue basic
       */
      this.footerType = 'basic';
      /**
       * Date format pattern
       * @defaultValue yyyy-MM-dd
       */
      this.dateFormat = 'yyyy-MM-dd';
      /**
       * Whether to disable input mask
       * @defaultValue false
       */
      this.disableMask = false;
      /**
       * Header visual variant
       * @defaultValue basic
       */
      this.headerType = 'basic';
      /**
       * Displays a red asterisk (*) next to the label for visual emphasis.
       */
      this.showAsterisk = false;
      /**
       * Disabled week days (0-6, where 0 is Sunday and 6 is Saturday)
       * Example: [0,6] will disable Sunday and Saturday
       */
      this.disabledWeekDays = [];
      /**
       * Whether to show the timepicker panel next to the calendar.
       * @defaultValue false
       */
      this.showTimePicker = false;
      /**
       * Hour increment step.
       * @defaultValue 1
       */
      this.hourStep = 1;
      /**
       * Minute increment step.
       * @defaultValue 1
       */
      this.minuteStep = 1;
      /**
       * Time format: '12' or '24'.
       * @defaultValue '24'
       */
      this.timeFormat = '24';
      this.handleIncreaseHour = () => {
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
            this.internalStartTime = Object.assign(Object.assign({}, targetTimeState.time), { hour: newHour });
          } else {
            this.internalEndTime = Object.assign(Object.assign({}, targetTimeState.time), { hour: newHour });
          }
        } else {
          // 24h mode clamp
          let hour = targetTimeState.time.hour + this.hourStep;
          hour = Math.min(hour, 23);
          if (targetTimeState.type === 'start') {
            this.internalStartTime = Object.assign(Object.assign({}, targetTimeState.time), { hour: hour });
          } else {
            this.internalEndTime = Object.assign(Object.assign({}, targetTimeState.time), { hour: hour });
          }
        }
        this.emitTimeChange();
      };
      this.handleDecreaseHour = () => {
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
            this.internalStartTime = Object.assign(Object.assign({}, targetTimeState.time), { hour: newHour });
          } else {
            this.internalEndTime = Object.assign(Object.assign({}, targetTimeState.time), { hour: newHour });
          }
        } else {
          // 24h mode clamp
          let hour = targetTimeState.time.hour - this.hourStep;
          hour = Math.max(hour, 0);
          if (targetTimeState.type === 'start') {
            this.internalStartTime = Object.assign(Object.assign({}, targetTimeState.time), { hour: hour });
          } else {
            this.internalEndTime = Object.assign(Object.assign({}, targetTimeState.time), { hour: hour });
          }
        }
        this.emitTimeChange();
      };
      this.handleHourClick = hour => {
        const targetTimeState = this.getTimeStateToModify();
        if (!targetTimeState) return;
        if (targetTimeState.type === 'start') {
          this.internalStartTime = Object.assign(Object.assign({}, targetTimeState.time), { hour: hour });
        } else {
          this.internalEndTime = Object.assign(Object.assign({}, targetTimeState.time), { hour: hour });
        }
        this.emitTimeChange();
      };
      this.handleIncreaseMinute = () => {
        const targetTimeState = this.getTimeStateToModify();
        if (!targetTimeState) return;
        let minute = targetTimeState.time.minute + this.minuteStep;
        minute = Math.min(minute, 59);
        if (targetTimeState.type === 'start') {
          this.internalStartTime = Object.assign(Object.assign({}, targetTimeState.time), { minute: minute });
        } else {
          this.internalEndTime = Object.assign(Object.assign({}, targetTimeState.time), { minute: minute });
        }
        this.emitTimeChange();
      };
      this.handleDecreaseMinute = () => {
        const targetTimeState = this.getTimeStateToModify();
        if (!targetTimeState) return;
        let minute = targetTimeState.time.minute - this.minuteStep;
        minute = Math.max(minute, 0);
        if (targetTimeState.type === 'start') {
          this.internalStartTime = Object.assign(Object.assign({}, targetTimeState.time), { minute: minute });
        } else {
          this.internalEndTime = Object.assign(Object.assign({}, targetTimeState.time), { minute: minute });
        }
        this.emitTimeChange();
      };
      this.handleMinuteClick = min => {
        const targetTimeState = this.getTimeStateToModify();
        if (!targetTimeState) return;
        if (targetTimeState.type === 'start') {
          this.internalStartTime = Object.assign(Object.assign({}, targetTimeState.time), { minute: min });
        } else {
          this.internalEndTime = Object.assign(Object.assign({}, targetTimeState.time), { minute: min });
        }
        this.emitTimeChange();
      };
      this.handleInputClick = e => {
        if (this.disabled) {
          e.preventDefault();
          return;
        }
        this.isOpen = !this.isOpen;
      };
      this.handleDateClick = date => {
        if (this.isDateDisabled(date)) return;
        const normalizedDate = this.normalizeDate(date);
        let emitValue;
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
            let newStart;
            let newEnd;
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
      this.handleInputKeyDown = event => {
        if (this.disableMask || this.mode === 'range') {
          event.preventDefault();
        }
      };
      this.handleInputChange = event => {
        if (this.disableMask || this.mode === 'range') {
          event.preventDefault();
          return;
        }
        this.inputValue = event.detail;
        this.tkInputChange.emit(this.inputValue);
      };
      this.handleInputClearClick = () => {
        if (this.clearable) {
          this.inputValue = '';
          this.internalSelectedDates = { start: null, end: null };
          this.internalStartTime = null;
          this.internalEndTime = null;
          this.tkChange.emit(null);
        }
      };
      this.handleInputBlur = () => {
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
      this.handleDateHover = date => {
        if (this.mode === 'range' && this.internalSelectedDates.start && !this.internalSelectedDates.end) {
          this.hoverDate = date;
        }
      };
      this.handleMonthChange = increment => {
        this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + increment);
      };
      this.handleYearChange = increment => {
        if (this.currentView === 'years') {
          this.currentMonth = new Date(this.currentMonth.getFullYear() + increment * 12, this.currentMonth.getMonth());
          return;
        }
        this.currentMonth = new Date(this.currentMonth.getFullYear() + increment, this.currentMonth.getMonth());
      };
      this.handleViewChange = (e, view) => {
        e.stopPropagation();
        this.currentView = view;
      };
      this.uniqueId = v4();
      this.windowClickHandler = this.handleWindowClick.bind(this);
    }
    isOpenChanged(newValue) {
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
    valueChanged(newValue, oldValue) {
      if (JSON.stringify(newValue) === JSON.stringify(oldValue)) {
        return;
      }
      this.processDateValue(newValue, true);
    }
    dateFormatChanged(newFormat) {
      this.maskOptions = this.getMaskOptionsFromDateFormat(newFormat);
    }
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
      var _a, _b, _c, _d;
      (_b = (_a = this.internals) === null || _a === void 0 ? void 0 : _a.form) === null || _b === void 0
        ? void 0
        : _b.addEventListener('reset', () => {
            this.handleFormReset();
          });
      // dialog içerisindek kullanıldığında dialog içerisinde scroll olduğunda panelin kapanması için yapıldı.
      this.dialogRef = this.el.closest('tk-dialog');
      (_d = (_c = this.dialogRef) === null || _c === void 0 ? void 0 : _c.querySelector('.tk-dialog-content')) === null || _d === void 0
        ? void 0
        : _d.addEventListener('scroll', this.handleDialogScroll.bind(this));
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
      var _a, _b;
      (_b = (_a = this.internals) === null || _a === void 0 ? void 0 : _a.form) === null || _b === void 0 ? void 0 : _b.removeEventListener('reset', this.handleFormReset);
      this.unbindWindowClickListener();
    }
    formResetCallback() {
      this.handleFormReset();
    }
    /**
     * Sets the date to today
     */
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
    async closePanel() {
      if (this.isOpen) {
        this.isOpen = false;
      }
    }
    getResolvedFirstDayIndex() {
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
    getFullDateTimeFormat() {
      const timePattern = this.timeFormat === '12' ? 'hh:mm a' : 'HH:mm';
      return /[hH]/.test(this.dateFormat) ? this.dateFormat : `${this.dateFormat} ${timePattern}`;
    }
    getDateWithTime(date, type) {
      if (!date) return null;
      const newDate = new Date(date);
      const timeToApply = type === 'start' ? this.internalStartTime : this.internalEndTime;
      if (this.showTimePicker && timeToApply) {
        newDate.setHours(timeToApply.hour, timeToApply.minute);
      }
      return newDate;
    }
    getMaskOptionsFromDateFormat(format) {
      var _a;
      const delimiter = ((_a = format.match(/[^a-zA-Z]/)) === null || _a === void 0 ? void 0 : _a[0]) || '';
      const datePattern = [];
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
    processDateValue(value, updateCurrentMonth = false) {
      let startDate = null;
      let endDate = null;
      let startTime = null;
      let endTime = null;
      const now = new Date();
      const defaultTime = { hour: now.getHours(), minute: now.getMinutes() };
      if (value) {
        let startString = null;
        let endString = null;
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
    initializeDates() {
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
    updatePosition() {
      var _a;
      if (this.inputRef && this.panelRef) {
        computePosition((_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.querySelector('.tk-input'), this.panelRef, {
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
    normalizeDate(date) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
    formatDate(date) {
      return dateFnsExports.format(date, this.dateFormat);
    }
    formatFullDateTime(date) {
      if (!date) return '';
      return dateFnsExports.format(date, this.getFullDateTimeFormat());
    }
    formatDateOrDateTime(date, type) {
      if (this.showTimePicker && date && type) {
        const dateWithCorrectTime = this.getDateWithTime(date, type);
        return dateWithCorrectTime ? this.formatFullDateTime(dateWithCorrectTime) : '';
      } else if (date) {
        return this.formatDate(date);
      }
      return '';
    }
    parseInputDate(dateString) {
      const parsedDate = dateFnsExports.parse(dateString, this.dateFormat, new Date());
      if (dateFnsExports.isValid(parsedDate) && this.formatDate(parsedDate) === dateString) {
        return parsedDate;
      }
      return null;
    }
    parseFullDateTime(dateTimeString) {
      // Try full date+time format first
      const formatString = this.getFullDateTimeFormat();
      const parsedDate = dateFnsExports.parse(dateTimeString, formatString, new Date());
      if (dateFnsExports.isValid(parsedDate) && dateFnsExports.format(parsedDate, formatString) === dateTimeString) {
        return parsedDate;
      }
      // Fallback: allow typing HH:mm without AM/PM for 12h mode
      if (this.timeFormat === '12') {
        const altFormat = `${this.dateFormat} HH:mm`;
        const parsedAlt = dateFnsExports.parse(dateTimeString, altFormat, new Date());
        if (dateFnsExports.isValid(parsedAlt) && dateFnsExports.format(parsedAlt, altFormat) === dateTimeString) {
          return parsedAlt;
        }
      }
      // Fallback to date only
      return this.parseInputDate(dateTimeString.split(' ')[0]);
    }
    isDateDisabled(date) {
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
    formatInputValue() {
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
    isToday(date) {
      return date.getDate() === this.today.getDate() && date.getMonth() === this.today.getMonth() && date.getFullYear() === this.today.getFullYear();
    }
    ensureDateTimeInitialized(type) {
      if (!this.internalSelectedDates.start && type === 'start') {
        const today = this.normalizeDate(new Date());
        this.internalSelectedDates = Object.assign(Object.assign({}, this.internalSelectedDates), { start: today });
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
    ensureRangeOrder() {
      var _a, _b;
      if (this.mode !== 'range' || !this.showTimePicker) return true;
      const { start, end } = this.internalSelectedDates;
      if (!start || !end) return true;
      const startTs = (_a = this.getDateWithTime(start, 'start')) === null || _a === void 0 ? void 0 : _a.getTime();
      const endTs = (_b = this.getDateWithTime(end, 'end')) === null || _b === void 0 ? void 0 : _b.getTime();
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
    emitTimeChange() {
      if (!this.showTimePicker || !this.internalSelectedDates.start) {
        return;
      }
      // if swap occurred, bail
      if (!this.ensureRangeOrder()) {
        return;
      }
      const { start, end } = this.internalSelectedDates;
      let emitValue;
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
    bindWindowClickListener() {
      window.addEventListener('click', this.windowClickHandler);
    }
    unbindWindowClickListener() {
      window.removeEventListener('click', this.windowClickHandler);
    }
    handleWindowClick(event) {
      var _a, _b;
      if (this.inline) return;
      const clickedElement = event.target;
      const clickedDatepickerId =
        (_b =
          (_a = clickedElement === null || clickedElement === void 0 ? void 0 : clickedElement.el) === null || _a === void 0
            ? void 0
            : _a.shadowRoot.querySelector('.tk-datepicker-panel')) === null || _b === void 0
          ? void 0
          : _b.getAttribute('data-tk-datepicker-id');
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
    getTimeStateToModify() {
      if (!this.showTimePicker) return null;
      let targetType = 'start';
      if (this.mode === 'range' && this.internalSelectedDates.end) {
        targetType = 'end';
      }
      this.ensureDateTimeInitialized(targetType);
      const timeState = targetType === 'start' ? this.internalStartTime : this.internalEndTime;
      if (!timeState) return null;
      return { time: timeState, type: targetType };
    }
    handleYearSelect(e, year) {
      e.stopPropagation();
      this.currentMonth = new Date(year, this.currentMonth.getMonth());
      this.currentView = 'months';
    }
    handleFormReset() {
      const initialValueAttr = this.el.getAttribute('value');
      let initialValue = null;
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
    handleDialogScroll() {
      if (this.isOpen) {
        this.isOpen = false;
      }
    }
    createDayCell(date, isAdjacentMonth) {
      const { start = null, end = null } = this.internalSelectedDates;
      const dateTime = date.getTime();
      const isSelectedStart = start && dateTime === start.getTime();
      const isSelectedEnd = start && end && dateTime === end.getTime();
      const isSelected = isSelectedStart || isSelectedEnd;
      let isInRange = false;
      if (start && (end || this.hoverDate)) {
        const rangeEnd = end || this.hoverDate;
        if (start.getTime() < rangeEnd.getTime()) {
          isInRange = dateTime > start.getTime() && dateTime < rangeEnd.getTime();
        } else {
          isInRange = dateTime > rangeEnd.getTime() && dateTime < start.getTime();
        }
      }
      const isDisabled = this.isDateDisabled(date);
      const isToday = this.isToday(date);
      return h(
        'td',
        {
          class: classNames('tk-datepicker-day-cell', {
            'selected': isSelected,
            'in-range': isInRange,
            'range-start': isSelectedStart && this.mode === 'range',
            'range-end': isSelectedEnd && this.mode === 'range',
            'today': isToday && !isSelected && !isInRange,
            'disabled': isDisabled,
            'adjacent-month': isAdjacentMonth,
          }),
          onClick: () => !isDisabled && this.handleDateClick(date),
          onMouseEnter: () => this.handleDateHover(date),
        },
        h('span', { class: 'tk-datepicker-day' }, date.getDate()),
      );
    }
    createWeekDays() {
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
          weeks.push(h('tr', null, days));
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
        weeks.push(h('tr', null, days));
      }
      return h('tbody', { class: 'tk-datepicker-days' }, weeks);
    }
    createWeekDayNames() {
      const startOfWeekIndex = this.getResolvedFirstDayIndex();
      // Use a known Monday as a base to generate other days reliably
      const baseMonday = new Date(2023, 0, 2);
      const weekdays = [...Array(7)].map((_, i) => {
        const dayOffset = (i + startOfWeekIndex) % 7;
        const dateForDay = new Date(baseMonday);
        dateForDay.setDate(baseMonday.getDate() + dayOffset);
        return dateForDay.toLocaleString(this.locale, { weekday: 'short' });
      });
      return h(
        'thead',
        null,
        h(
          'tr',
          { class: 'tk-datepicker-week-days' },
          weekdays.map(day => h('th', { class: 'tk-datepicker-week-day-cell' }, h('span', { class: 'tk-datepicker-week-day' }, day))),
        ),
      );
    }
    createMonths() {
      const months = [...Array(12)].map((_, i) => new Date(2023, i).toLocaleString(this.locale, { month: 'short' }));
      const rows = [];
      for (let i = 0; i < 12; i += 4) {
        const monthGroup = months.slice(i, i + 4);
        rows.push(
          h(
            'tr',
            { class: 'tk-datepicker-month-row' },
            monthGroup.map((month, index) => {
              const monthIndex = i + index;
              const isSelected = this.currentMonth.getMonth() === monthIndex;
              return h(
                'td',
                {
                  class: classNames('tk-datepicker-month', {
                    selected: isSelected,
                  }),
                  onClick: e => {
                    e.stopPropagation();
                    this.currentMonth = new Date(this.currentMonth.getFullYear(), monthIndex);
                    this.currentView = 'days';
                  },
                },
                month,
              );
            }),
          ),
        );
      }
      return h('tbody', { class: 'tk-datepicker-months' }, rows);
    }
    createYears() {
      const currentYear = this.currentMonth.getFullYear();
      const startYear = Math.floor(currentYear / 12) * 12;
      const years = Array.from({ length: 12 }, (_, i) => startYear + i);
      const rows = [];
      for (let i = 0; i < years.length; i += 4) {
        const yearGroup = years.slice(i, i + 4);
        rows.push(
          h(
            'tr',
            { class: 'tk-datepicker-year-row' },
            yearGroup.map(year =>
              h(
                'td',
                {
                  class: classNames('tk-datepicker-year', {
                    selected: year === currentYear,
                  }),
                  onClick: e => this.handleYearSelect(e, year),
                },
                year,
              ),
            ),
          ),
        );
      }
      return h('tbody', { class: 'tk-datepicker-years' }, rows);
    }
    createHeader() {
      const monthName = this.currentMonth.toLocaleString(this.locale, {
        month: 'long',
      });
      const year = this.currentMonth.getFullYear().toString();
      const headerClasses = classNames('tk-datepicker-header', `tk-datepicker-header-${this.headerType}`);
      return h(
        'div',
        { class: headerClasses },
        h(
          'div',
          { class: 'tk-datepicker-header-content' },
          h(
            'div',
            { class: 'tk-datepicker-header-content-start' },
            h('tk-button', { 'variant': 'neutral', 'icon': 'keyboard_double_arrow_left', 'onTk-click': () => this.handleYearChange(-1), 'type': 'text' }),
            h('span', { class: 'tk-datepicker-divider' }),
            h('tk-button', { 'variant': 'neutral', 'icon': 'chevron_left', 'onTk-click': () => this.handleMonthChange(-1), 'type': 'text' }),
          ),
          h(
            'div',
            { class: 'tk-datepicker-select-container' },
            h('div', { class: 'tk-datepicker-select-month', onClick: e => this.handleViewChange(e, 'months') }, monthName),
            h('div', { class: 'tk-datepicker-select-year', onClick: e => this.handleViewChange(e, 'years') }, year),
          ),
          h(
            'div',
            { class: 'tk-datepicker-header-content-end' },
            h('tk-button', { 'variant': 'neutral', 'icon': 'chevron_right', 'onTk-click': () => this.handleMonthChange(1), 'type': 'text' }),
            h('span', { class: 'tk-datepicker-divider' }),
            h('tk-button', { 'variant': 'neutral', 'icon': 'keyboard_double_arrow_right', 'onTk-click': () => this.handleYearChange(1), 'type': 'text' }),
          ),
        ),
      );
    }
    createFooter() {
      if (this.hasFooterSlot) {
        return h('slot', { name: 'footer' });
      } else if (this.hasFooterActionsSlot) {
        const footerClass = classNames('tk-datepicker-footer', `tk-datepicker-footer-${this.footerType}`);
        return h('div', { class: footerClass }, h('slot', { name: 'footer-actions' }));
      }
      return null;
    }
    createTimePicker() {
      let timeToDisplay = null;
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
      const sliceRange = (options, selected) => {
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
      return h(
        'div',
        { class: 'tk-datepicker-timepicker-panel' },
        h('div', { class: 'tk-datepicker-timepicker-header' }),
        h(
          'div',
          { class: 'tk-datepicker-timepicker-body' },
          h(
            'div',
            { class: 'tk-datepicker-timepicker-col' },
            h(
              'div',
              null,
              h('tk-button', { 'variant': 'neutral', 'type': 'text', 'size': 'base', 'icon': 'expand_less', 'onTk-click': this.handleDecreaseHour, 'disabled': isMinHour }),
              h('div', { class: 'tk-datepicker-timepicker-separator' }),
            ),
            visibleHours.map(hour =>
              hour === null
                ? h('div', { class: 'tk-datepicker-timepicker-value tk-datepicker-timepicker-value-empty' })
                : h(
                    'div',
                    {
                      class: classNames('tk-datepicker-timepicker-value', {
                        selected: hour === currentHour,
                      }),
                      onClick: () => this.handleHourClick(this.timeFormat === '12' ? (hour % 12) + (isPM ? 12 : 0) : hour),
                    },
                    hour.toString().padStart(2, '0'),
                  ),
            ),
            h(
              'div',
              null,
              h('div', { class: 'tk-datepicker-timepicker-separator' }),
              h('tk-button', { 'variant': 'neutral', 'type': 'text', 'size': 'base', 'icon': 'expand_more', 'onTk-click': this.handleIncreaseHour, 'disabled': isMaxHour }),
            ),
          ),
          h(
            'div',
            { class: 'tk-datepicker-timepicker-col' },
            h(
              'div',
              null,
              h('tk-button', { 'variant': 'neutral', 'type': 'text', 'size': 'base', 'icon': 'expand_less', 'onTk-click': this.handleDecreaseMinute, 'disabled': isMinMinute }),
              h('div', { class: 'tk-datepicker-timepicker-separator' }),
            ),
            visibleMinutes.map(m =>
              m === null
                ? h('div', { class: 'tk-datepicker-timepicker-value tk-datepicker-timepicker-value-empty' })
                : h(
                    'div',
                    {
                      class: classNames('tk-datepicker-timepicker-value', {
                        selected: m === currentMinute,
                      }),
                      onClick: () => this.handleMinuteClick(m),
                    },
                    String(m).padStart(2, '0'),
                  ),
            ),
            h(
              'div',
              null,
              h('div', { class: 'tk-datepicker-timepicker-separator' }),
              h('tk-button', { 'variant': 'neutral', 'type': 'text', 'size': 'base', 'icon': 'expand_more', 'onTk-click': this.handleIncreaseMinute, 'disabled': isMaxMinute }),
            ),
          ),
        ),
      );
    }
    renderInput() {
      if (this.inline) return null;
      const displayValue = this.formatInputValue();
      const shouldUseMask = this.mode === 'single' && !this.disableMask && !this.showTimePicker;
      const maskOptionsToPass = shouldUseMask ? this.maskOptions : undefined;
      return h('tk-input', {
        'ref': el => (this.inputRef = el),
        'label': this.label,
        'size': this.size,
        'mode': 'text',
        'icon': this.icon,
        'iconPosition': this.iconPosition,
        'class': classNames('tk-datepicker-input', { 'tk-table-input': this.el.classList.contains('tk-table-datepicker') }),
        'name': this.name,
        'hint': this.hint,
        'clearable': this.clearable,
        'disabled': this.disabled,
        'invalid': this.invalid || this.isInvalid,
        'error': this.error,
        'placeholder': this.placeholder || (this.showTimePicker ? this.getFullDateTimeFormat() : this.dateFormat).toUpperCase(),
        'value': displayValue,
        'maskOptions': maskOptionsToPass,
        'onTk-change': this.handleInputChange,
        'onTk-clear-click': this.handleInputClearClick,
        'onTk-blur': this.handleInputBlur,
        'onKeyDown': this.handleInputKeyDown,
        'onClick': this.handleInputClick,
        'aria-expanded': !!this.isOpen,
        'aria-haspopup': 'true',
        'data-tk-datepicker-id': this.uniqueId,
        'showAsterisk': this.showAsterisk,
      });
    }
    renderPanel() {
      if (!this.isOpen && !this.inline) return null;
      const panelClasses = classNames('tk-datepicker-panel', {
        'tk-datepicker-panel-inline': this.inline,
      });
      const bodyClasses = classNames('tk-datepicker-body', {
        'tk-datepicker-months-view': this.currentView === 'months',
        'tk-datepicker-years-view': this.currentView === 'years',
      });
      return h(
        'div',
        { 'class': panelClasses, 'ref': el => (this.panelRef = el), 'role': !this.inline ? 'dialog' : null, 'aria-modal': 'true', 'data-tk-datepicker-id': this.uniqueId },
        h(
          'div',
          { class: 'tk-datepicker-panel-inner' },
          h(
            'div',
            { class: 'tk-datepicker-calendar-container' },
            this.createHeader(),
            h(
              'div',
              { class: bodyClasses },
              h(
                'table',
                { class: 'tk-datepicker-table' },
                this.currentView === 'days' && h(Fragment, null, this.createWeekDayNames(), this.createWeekDays()),
                this.currentView === 'months' && this.createMonths(),
                this.currentView === 'years' && this.createYears(),
              ),
            ),
          ),
          this.showTimePicker && this.createTimePicker(),
        ),
        this.createFooter(),
      );
    }
    render() {
      return h('div', { key: '61ab539bdec4fe13923a3363a9c65a9ee7e45de6', class: 'tk-datepicker-container' }, this.renderInput(), this.renderPanel());
    }
    static get formAssociated() {
      return true;
    }
    get el() {
      return this;
    }
    static get watchers() {
      return {
        isOpen: ['isOpenChanged'],
        value: ['valueChanged'],
        dateFormat: ['dateFormatChanged'],
      };
    }
    static get style() {
      return tkDatepickerCss;
    }
  },
  [
    65,
    'tk-datepicker',
    {
      value: [1],
      label: [1],
      size: [1],
      disabled: [4],
      invalid: [4],
      clearable: [4],
      error: [1],
      hint: [1],
      icon: [1],
      iconPosition: [1, 'icon-position'],
      minDate: [1, 'min-date'],
      maxDate: [1, 'max-date'],
      name: [1],
      allowedDates: [1040, 'allowed-dates'],
      disabledDates: [1040, 'disabled-dates'],
      inline: [4],
      mode: [1],
      locale: [1],
      footerType: [1, 'footer-type'],
      dateFormat: [1, 'date-format'],
      disableMask: [4, 'disable-mask'],
      headerType: [1, 'header-type'],
      placeholder: [1],
      showAsterisk: [4, 'show-asterisk'],
      disabledWeekDays: [16, 'disabled-week-days'],
      showTimePicker: [4, 'show-time-picker'],
      minTime: [1, 'min-time'],
      maxTime: [1, 'max-time'],
      hourStep: [2, 'hour-step'],
      minuteStep: [2, 'minute-step'],
      timeFormat: [1, 'time-format'],
      firstDayOfWeekIndex: [2, 'first-day-of-week-index'],
      hasFooterSlot: [32],
      hasFooterActionsSlot: [32],
      currentMonth: [32],
      internalSelectedDates: [32],
      inputValue: [32],
      internalStartTime: [32],
      internalEndTime: [32],
      hoverDate: [32],
      currentView: [32],
      maskOptions: [32],
      isInvalid: [32],
      isOpen: [32],
      setToday: [64],
      closePanel: [64],
    },
    undefined,
    {
      isOpen: ['isOpenChanged'],
      value: ['valueChanged'],
      dateFormat: ['dateFormatChanged'],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-datepicker', 'tk-button', 'tk-chips', 'tk-icon', 'tk-input', 'tk-spinner'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-datepicker':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkDatePicker);
        }
        break;
      case 'tk-button':
        if (!customElements.get(tagName)) {
          defineCustomElement$6();
        }
        break;
      case 'tk-chips':
        if (!customElements.get(tagName)) {
          defineCustomElement$5();
        }
        break;
      case 'tk-icon':
        if (!customElements.get(tagName)) {
          defineCustomElement$4();
        }
        break;
      case 'tk-input':
        if (!customElements.get(tagName)) {
          defineCustomElement$3();
        }
        break;
      case 'tk-spinner':
        if (!customElements.get(tagName)) {
          defineCustomElement$2();
        }
        break;
    }
  });
}

const TkDatepicker = TkDatePicker;
const defineCustomElement = defineCustomElement$1;

export { TkDatepicker, defineCustomElement };
//# sourceMappingURL=tk-datepicker.js.map

//# sourceMappingURL=tk-datepicker.js.map
