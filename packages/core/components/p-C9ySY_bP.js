import { p as proxyCustomElement, H, c as createEvent, h } from './p-F5eU3Bfi.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { _ } from './p-BVf-UonN.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { d as defineCustomElement$4 } from './p-DOzOzA8V.js';
import { d as defineCustomElement$3 } from './p-VOpLmPkP.js';
import { d as defineCustomElement$2 } from './p-75KyitY6.js';
import { d as defineCustomElement$1 } from './p-BkhDFlMy.js';
import { v as v4 } from './p-BF0_OXTe.js';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var NumeralFormatter = function (
  numeralDecimalMark,
  numeralIntegerScale,
  numeralDecimalScale,
  numeralThousandsGroupStyle,
  numeralPositiveOnly,
  stripLeadingZeroes,
  prefix,
  signBeforePrefix,
  tailPrefix,
  delimiter,
) {
  var owner = this;

  owner.numeralDecimalMark = numeralDecimalMark || '.';
  owner.numeralIntegerScale = numeralIntegerScale > 0 ? numeralIntegerScale : 0;
  owner.numeralDecimalScale = numeralDecimalScale >= 0 ? numeralDecimalScale : 2;
  owner.numeralThousandsGroupStyle = numeralThousandsGroupStyle || NumeralFormatter.groupStyle.thousand;
  owner.numeralPositiveOnly = !!numeralPositiveOnly;
  owner.stripLeadingZeroes = stripLeadingZeroes !== false;
  owner.prefix = prefix || prefix === '' ? prefix : '';
  owner.signBeforePrefix = !!signBeforePrefix;
  owner.tailPrefix = !!tailPrefix;
  owner.delimiter = delimiter || delimiter === '' ? delimiter : ',';
  owner.delimiterRE = delimiter ? new RegExp('\\' + delimiter, 'g') : '';
};

NumeralFormatter.groupStyle = {
  thousand: 'thousand',
  lakh: 'lakh',
  wan: 'wan',
  none: 'none',
};

NumeralFormatter.prototype = {
  getRawValue: function (value) {
    return value.replace(this.delimiterRE, '').replace(this.numeralDecimalMark, '.');
  },

  format: function (value) {
    var owner = this,
      parts,
      partSign,
      partSignAndPrefix,
      partInteger,
      partDecimal = '';

    // strip alphabet letters
    value = value
      .replace(/[A-Za-z]/g, '')
      // replace the first decimal mark with reserved placeholder
      .replace(owner.numeralDecimalMark, 'M')

      // strip non numeric letters except minus and "M"
      // this is to ensure prefix has been stripped
      .replace(/[^\dM-]/g, '')

      // replace the leading minus with reserved placeholder
      .replace(/^\-/, 'N')

      // strip the other minus sign (if present)
      .replace(/\-/g, '')

      // replace the minus sign (if present)
      .replace('N', owner.numeralPositiveOnly ? '' : '-')

      // replace decimal mark
      .replace('M', owner.numeralDecimalMark);

    // strip any leading zeros
    if (owner.stripLeadingZeroes) {
      value = value.replace(/^(-)?0+(?=\d)/, '$1');
    }

    partSign = value.slice(0, 1) === '-' ? '-' : '';
    if (typeof owner.prefix != 'undefined') {
      if (owner.signBeforePrefix) {
        partSignAndPrefix = partSign + owner.prefix;
      } else {
        partSignAndPrefix = owner.prefix + partSign;
      }
    } else {
      partSignAndPrefix = partSign;
    }

    partInteger = value;

    if (value.indexOf(owner.numeralDecimalMark) >= 0) {
      parts = value.split(owner.numeralDecimalMark);
      partInteger = parts[0];
      partDecimal = owner.numeralDecimalMark + parts[1].slice(0, owner.numeralDecimalScale);
    }

    if (partSign === '-') {
      partInteger = partInteger.slice(1);
    }

    if (owner.numeralIntegerScale > 0) {
      partInteger = partInteger.slice(0, owner.numeralIntegerScale);
    }

    switch (owner.numeralThousandsGroupStyle) {
      case NumeralFormatter.groupStyle.lakh:
        partInteger = partInteger.replace(/(\d)(?=(\d\d)+\d$)/g, '$1' + owner.delimiter);

        break;

      case NumeralFormatter.groupStyle.wan:
        partInteger = partInteger.replace(/(\d)(?=(\d{4})+$)/g, '$1' + owner.delimiter);

        break;

      case NumeralFormatter.groupStyle.thousand:
        partInteger = partInteger.replace(/(\d)(?=(\d{3})+$)/g, '$1' + owner.delimiter);

        break;
    }

    if (owner.tailPrefix) {
      return partSign + partInteger.toString() + (owner.numeralDecimalScale > 0 ? partDecimal.toString() : '') + owner.prefix;
    }

    return partSignAndPrefix + partInteger.toString() + (owner.numeralDecimalScale > 0 ? partDecimal.toString() : '');
  },
};

var NumeralFormatter_1 = NumeralFormatter;

var DateFormatter = function (datePattern, dateMin, dateMax) {
  var owner = this;

  owner.date = [];
  owner.blocks = [];
  owner.datePattern = datePattern;
  owner.dateMin = dateMin
    .split('-')
    .reverse()
    .map(function (x) {
      return parseInt(x, 10);
    });
  if (owner.dateMin.length === 2) owner.dateMin.unshift(0);

  owner.dateMax = dateMax
    .split('-')
    .reverse()
    .map(function (x) {
      return parseInt(x, 10);
    });
  if (owner.dateMax.length === 2) owner.dateMax.unshift(0);

  owner.initBlocks();
};

DateFormatter.prototype = {
  initBlocks: function () {
    var owner = this;
    owner.datePattern.forEach(function (value) {
      if (value === 'Y') {
        owner.blocks.push(4);
      } else {
        owner.blocks.push(2);
      }
    });
  },

  getISOFormatDate: function () {
    var owner = this,
      date = owner.date;

    return date[2] ? date[2] + '-' + owner.addLeadingZero(date[1]) + '-' + owner.addLeadingZero(date[0]) : '';
  },

  getBlocks: function () {
    return this.blocks;
  },

  getValidatedDate: function (value) {
    var owner = this,
      result = '';

    value = value.replace(/[^\d]/g, '');

    owner.blocks.forEach(function (length, index) {
      if (value.length > 0) {
        var sub = value.slice(0, length),
          sub0 = sub.slice(0, 1),
          rest = value.slice(length);

        switch (owner.datePattern[index]) {
          case 'd':
            if (sub === '00') {
              sub = '01';
            } else if (parseInt(sub0, 10) > 3) {
              sub = '0' + sub0;
            } else if (parseInt(sub, 10) > 31) {
              sub = '31';
            }

            break;

          case 'm':
            if (sub === '00') {
              sub = '01';
            } else if (parseInt(sub0, 10) > 1) {
              sub = '0' + sub0;
            } else if (parseInt(sub, 10) > 12) {
              sub = '12';
            }

            break;
        }

        result += sub;

        // update remaining string
        value = rest;
      }
    });

    return this.getFixedDateString(result);
  },

  getFixedDateString: function (value) {
    var owner = this,
      datePattern = owner.datePattern,
      date = [],
      dayIndex = 0,
      monthIndex = 0,
      yearIndex = 0,
      dayStartIndex = 0,
      monthStartIndex = 0,
      yearStartIndex = 0,
      day,
      month,
      year,
      fullYearDone = false;

    // mm-dd || dd-mm
    if (value.length === 4 && datePattern[0].toLowerCase() !== 'y' && datePattern[1].toLowerCase() !== 'y') {
      dayStartIndex = datePattern[0] === 'd' ? 0 : 2;
      monthStartIndex = 2 - dayStartIndex;
      day = parseInt(value.slice(dayStartIndex, dayStartIndex + 2), 10);
      month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);

      date = this.getFixedDate(day, month, 0);
    }

    // yyyy-mm-dd || yyyy-dd-mm || mm-dd-yyyy || dd-mm-yyyy || dd-yyyy-mm || mm-yyyy-dd
    if (value.length === 8) {
      datePattern.forEach(function (type, index) {
        switch (type) {
          case 'd':
            dayIndex = index;
            break;
          case 'm':
            monthIndex = index;
            break;
          default:
            yearIndex = index;
            break;
        }
      });

      yearStartIndex = yearIndex * 2;
      dayStartIndex = dayIndex <= yearIndex ? dayIndex * 2 : dayIndex * 2 + 2;
      monthStartIndex = monthIndex <= yearIndex ? monthIndex * 2 : monthIndex * 2 + 2;

      day = parseInt(value.slice(dayStartIndex, dayStartIndex + 2), 10);
      month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
      year = parseInt(value.slice(yearStartIndex, yearStartIndex + 4), 10);

      fullYearDone = value.slice(yearStartIndex, yearStartIndex + 4).length === 4;

      date = this.getFixedDate(day, month, year);
    }

    // mm-yy || yy-mm
    if (value.length === 4 && (datePattern[0] === 'y' || datePattern[1] === 'y')) {
      monthStartIndex = datePattern[0] === 'm' ? 0 : 2;
      yearStartIndex = 2 - monthStartIndex;
      month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
      year = parseInt(value.slice(yearStartIndex, yearStartIndex + 2), 10);

      fullYearDone = value.slice(yearStartIndex, yearStartIndex + 2).length === 2;

      date = [0, month, year];
    }

    // mm-yyyy || yyyy-mm
    if (value.length === 6 && (datePattern[0] === 'Y' || datePattern[1] === 'Y')) {
      monthStartIndex = datePattern[0] === 'm' ? 0 : 4;
      yearStartIndex = 2 - 0.5 * monthStartIndex;
      month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
      year = parseInt(value.slice(yearStartIndex, yearStartIndex + 4), 10);

      fullYearDone = value.slice(yearStartIndex, yearStartIndex + 4).length === 4;

      date = [0, month, year];
    }

    date = owner.getRangeFixedDate(date);
    owner.date = date;

    var result =
      date.length === 0
        ? value
        : datePattern.reduce(function (previous, current) {
            switch (current) {
              case 'd':
                return previous + (date[0] === 0 ? '' : owner.addLeadingZero(date[0]));
              case 'm':
                return previous + (date[1] === 0 ? '' : owner.addLeadingZero(date[1]));
              case 'y':
                return previous + (fullYearDone ? owner.addLeadingZeroForYear(date[2], false) : '');
              case 'Y':
                return previous + (fullYearDone ? owner.addLeadingZeroForYear(date[2], true) : '');
            }
          }, '');

    return result;
  },

  getRangeFixedDate: function (date) {
    var owner = this,
      datePattern = owner.datePattern,
      dateMin = owner.dateMin || [],
      dateMax = owner.dateMax || [];

    if (!date.length || (dateMin.length < 3 && dateMax.length < 3)) return date;

    if (
      datePattern.find(function (x) {
        return x.toLowerCase() === 'y';
      }) &&
      date[2] === 0
    )
      return date;

    if (dateMax.length && (dateMax[2] < date[2] || (dateMax[2] === date[2] && (dateMax[1] < date[1] || (dateMax[1] === date[1] && dateMax[0] < date[0]))))) return dateMax;

    if (dateMin.length && (dateMin[2] > date[2] || (dateMin[2] === date[2] && (dateMin[1] > date[1] || (dateMin[1] === date[1] && dateMin[0] > date[0]))))) return dateMin;

    return date;
  },

  getFixedDate: function (day, month, year) {
    day = Math.min(day, 31);
    month = Math.min(month, 12);
    year = parseInt(year || 0, 10);

    if ((month < 7 && month % 2 === 0) || (month > 8 && month % 2 === 1)) {
      day = Math.min(day, month === 2 ? (this.isLeapYear(year) ? 29 : 28) : 30);
    }

    return [day, month, year];
  },

  isLeapYear: function (year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  },

  addLeadingZero: function (number) {
    return (number < 10 ? '0' : '') + number;
  },

  addLeadingZeroForYear: function (number, fullYearMode) {
    if (fullYearMode) {
      return (number < 10 ? '000' : number < 100 ? '00' : number < 1000 ? '0' : '') + number;
    }

    return (number < 10 ? '0' : '') + number;
  },
};

var DateFormatter_1 = DateFormatter;

var TimeFormatter = function (timePattern, timeFormat) {
  var owner = this;

  owner.time = [];
  owner.blocks = [];
  owner.timePattern = timePattern;
  owner.timeFormat = timeFormat;
  owner.initBlocks();
};

TimeFormatter.prototype = {
  initBlocks: function () {
    var owner = this;
    owner.timePattern.forEach(function () {
      owner.blocks.push(2);
    });
  },

  getISOFormatTime: function () {
    var owner = this,
      time = owner.time;

    return time[2] ? owner.addLeadingZero(time[0]) + ':' + owner.addLeadingZero(time[1]) + ':' + owner.addLeadingZero(time[2]) : '';
  },

  getBlocks: function () {
    return this.blocks;
  },

  getTimeFormatOptions: function () {
    var owner = this;
    if (String(owner.timeFormat) === '12') {
      return {
        maxHourFirstDigit: 1,
        maxHours: 12,
        maxMinutesFirstDigit: 5,
        maxMinutes: 60,
      };
    }

    return {
      maxHourFirstDigit: 2,
      maxHours: 23,
      maxMinutesFirstDigit: 5,
      maxMinutes: 60,
    };
  },

  getValidatedTime: function (value) {
    var owner = this,
      result = '';

    value = value.replace(/[^\d]/g, '');

    var timeFormatOptions = owner.getTimeFormatOptions();

    owner.blocks.forEach(function (length, index) {
      if (value.length > 0) {
        var sub = value.slice(0, length),
          sub0 = sub.slice(0, 1),
          rest = value.slice(length);

        switch (owner.timePattern[index]) {
          case 'h':
            if (parseInt(sub0, 10) > timeFormatOptions.maxHourFirstDigit) {
              sub = '0' + sub0;
            } else if (parseInt(sub, 10) > timeFormatOptions.maxHours) {
              sub = timeFormatOptions.maxHours + '';
            }

            break;

          case 'm':
          case 's':
            if (parseInt(sub0, 10) > timeFormatOptions.maxMinutesFirstDigit) {
              sub = '0' + sub0;
            } else if (parseInt(sub, 10) > timeFormatOptions.maxMinutes) {
              sub = timeFormatOptions.maxMinutes + '';
            }
            break;
        }

        result += sub;

        // update remaining string
        value = rest;
      }
    });

    return this.getFixedTimeString(result);
  },

  getFixedTimeString: function (value) {
    var owner = this,
      timePattern = owner.timePattern,
      time = [],
      secondIndex = 0,
      minuteIndex = 0,
      hourIndex = 0,
      secondStartIndex = 0,
      minuteStartIndex = 0,
      hourStartIndex = 0,
      second,
      minute,
      hour;

    if (value.length === 6) {
      timePattern.forEach(function (type, index) {
        switch (type) {
          case 's':
            secondIndex = index * 2;
            break;
          case 'm':
            minuteIndex = index * 2;
            break;
          case 'h':
            hourIndex = index * 2;
            break;
        }
      });

      hourStartIndex = hourIndex;
      minuteStartIndex = minuteIndex;
      secondStartIndex = secondIndex;

      second = parseInt(value.slice(secondStartIndex, secondStartIndex + 2), 10);
      minute = parseInt(value.slice(minuteStartIndex, minuteStartIndex + 2), 10);
      hour = parseInt(value.slice(hourStartIndex, hourStartIndex + 2), 10);

      time = this.getFixedTime(hour, minute, second);
    }

    if (value.length === 4 && owner.timePattern.indexOf('s') < 0) {
      timePattern.forEach(function (type, index) {
        switch (type) {
          case 'm':
            minuteIndex = index * 2;
            break;
          case 'h':
            hourIndex = index * 2;
            break;
        }
      });

      hourStartIndex = hourIndex;
      minuteStartIndex = minuteIndex;

      second = 0;
      minute = parseInt(value.slice(minuteStartIndex, minuteStartIndex + 2), 10);
      hour = parseInt(value.slice(hourStartIndex, hourStartIndex + 2), 10);

      time = this.getFixedTime(hour, minute, second);
    }

    owner.time = time;

    return time.length === 0
      ? value
      : timePattern.reduce(function (previous, current) {
          switch (current) {
            case 's':
              return previous + owner.addLeadingZero(time[2]);
            case 'm':
              return previous + owner.addLeadingZero(time[1]);
            case 'h':
              return previous + owner.addLeadingZero(time[0]);
          }
        }, '');
  },

  getFixedTime: function (hour, minute, second) {
    second = Math.min(parseInt(second || 0, 10), 60);
    minute = Math.min(minute, 60);
    hour = Math.min(hour, 60);

    return [hour, minute, second];
  },

  addLeadingZero: function (number) {
    return (number < 10 ? '0' : '') + number;
  },
};

var TimeFormatter_1 = TimeFormatter;

var PhoneFormatter = function (formatter, delimiter) {
  var owner = this;

  owner.delimiter = delimiter || delimiter === '' ? delimiter : ' ';
  owner.delimiterRE = delimiter ? new RegExp('\\' + delimiter, 'g') : '';

  owner.formatter = formatter;
};

PhoneFormatter.prototype = {
  setFormatter: function (formatter) {
    this.formatter = formatter;
  },

  format: function (phoneNumber) {
    var owner = this;

    owner.formatter.clear();

    // only keep number and +
    phoneNumber = phoneNumber.replace(/[^\d+]/g, '');

    // strip non-leading +
    phoneNumber = phoneNumber.replace(/^\+/, 'B').replace(/\+/g, '').replace('B', '+');

    // strip delimiter
    phoneNumber = phoneNumber.replace(owner.delimiterRE, '');

    var result = '',
      current,
      validated = false;

    for (var i = 0, iMax = phoneNumber.length; i < iMax; i++) {
      current = owner.formatter.inputDigit(phoneNumber.charAt(i));

      // has ()- or space inside
      if (/[\s()-]/g.test(current)) {
        result = current;

        validated = true;
      } else {
        if (!validated) {
          result = current;
        }
        // else: over length input
        // it turns to invalid number again
      }
    }

    // strip ()
    // e.g. US: 7161234567 returns (716) 123-4567
    result = result.replace(/[()]/g, '');
    // replace library delimiter with user customized delimiter
    result = result.replace(/[\s-]/g, owner.delimiter);

    return result;
  },
};

var PhoneFormatter_1 = PhoneFormatter;

var CreditCardDetector = {
  blocks: {
    uatp: [4, 5, 6],
    amex: [4, 6, 5],
    diners: [4, 6, 4],
    discover: [4, 4, 4, 4],
    mastercard: [4, 4, 4, 4],
    dankort: [4, 4, 4, 4],
    instapayment: [4, 4, 4, 4],
    jcb15: [4, 6, 5],
    jcb: [4, 4, 4, 4],
    maestro: [4, 4, 4, 4],
    visa: [4, 4, 4, 4],
    mir: [4, 4, 4, 4],
    unionPay: [4, 4, 4, 4],
    general: [4, 4, 4, 4],
  },

  re: {
    // starts with 1; 15 digits, not starts with 1800 (jcb card)
    uatp: /^(?!1800)1\d{0,14}/,

    // starts with 34/37; 15 digits
    amex: /^3[47]\d{0,13}/,

    // starts with 6011/65/644-649; 16 digits
    discover: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,

    // starts with 300-305/309 or 36/38/39; 14 digits
    diners: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,

    // starts with 51-55/2221–2720; 16 digits
    mastercard: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,

    // starts with 5019/4175/4571; 16 digits
    dankort: /^(5019|4175|4571)\d{0,12}/,

    // starts with 637-639; 16 digits
    instapayment: /^63[7-9]\d{0,13}/,

    // starts with 2131/1800; 15 digits
    jcb15: /^(?:2131|1800)\d{0,11}/,

    // starts with 2131/1800/35; 16 digits
    jcb: /^(?:35\d{0,2})\d{0,12}/,

    // starts with 50/56-58/6304/67; 16 digits
    maestro: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,

    // starts with 22; 16 digits
    mir: /^220[0-4]\d{0,12}/,

    // starts with 4; 16 digits
    visa: /^4\d{0,15}/,

    // starts with 62/81; 16 digits
    unionPay: /^(62|81)\d{0,14}/,
  },

  getStrictBlocks: function (block) {
    var total = block.reduce(function (prev, current) {
      return prev + current;
    }, 0);

    return block.concat(19 - total);
  },

  getInfo: function (value, strictMode) {
    var blocks = CreditCardDetector.blocks,
      re = CreditCardDetector.re;

    // Some credit card can have up to 19 digits number.
    // Set strictMode to true will remove the 16 max-length restrain,
    // however, I never found any website validate card number like
    // this, hence probably you don't want to enable this option.
    strictMode = !!strictMode;

    for (var key in re) {
      if (re[key].test(value)) {
        var matchedBlocks = blocks[key];
        return {
          type: key,
          blocks: strictMode ? this.getStrictBlocks(matchedBlocks) : matchedBlocks,
        };
      }
    }

    return {
      type: 'unknown',
      blocks: strictMode ? this.getStrictBlocks(blocks.general) : blocks.general,
    };
  },
};

var CreditCardDetector_1 = CreditCardDetector;

var Util = {
  noop: function () {},

  strip: function (value, re) {
    return value.replace(re, '');
  },

  getPostDelimiter: function (value, delimiter, delimiters) {
    // single delimiter
    if (delimiters.length === 0) {
      return value.slice(-delimiter.length) === delimiter ? delimiter : '';
    }

    // multiple delimiters
    var matchedDelimiter = '';
    delimiters.forEach(function (current) {
      if (value.slice(-current.length) === current) {
        matchedDelimiter = current;
      }
    });

    return matchedDelimiter;
  },

  getDelimiterREByDelimiter: function (delimiter) {
    return new RegExp(delimiter.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'), 'g');
  },

  getNextCursorPosition: function (prevPos, oldValue, newValue, delimiter, delimiters) {
    // If cursor was at the end of value, just place it back.
    // Because new value could contain additional chars.
    if (oldValue.length === prevPos) {
      return newValue.length;
    }

    return prevPos + this.getPositionOffset(prevPos, oldValue, newValue, delimiter, delimiters);
  },

  getPositionOffset: function (prevPos, oldValue, newValue, delimiter, delimiters) {
    var oldRawValue, newRawValue, lengthOffset;

    oldRawValue = this.stripDelimiters(oldValue.slice(0, prevPos), delimiter, delimiters);
    newRawValue = this.stripDelimiters(newValue.slice(0, prevPos), delimiter, delimiters);
    lengthOffset = oldRawValue.length - newRawValue.length;

    return lengthOffset !== 0 ? lengthOffset / Math.abs(lengthOffset) : 0;
  },

  stripDelimiters: function (value, delimiter, delimiters) {
    var owner = this;

    // single delimiter
    if (delimiters.length === 0) {
      var delimiterRE = delimiter ? owner.getDelimiterREByDelimiter(delimiter) : '';

      return value.replace(delimiterRE, '');
    }

    // multiple delimiters
    delimiters.forEach(function (current) {
      current.split('').forEach(function (letter) {
        value = value.replace(owner.getDelimiterREByDelimiter(letter), '');
      });
    });

    return value;
  },

  headStr: function (str, length) {
    return str.slice(0, length);
  },

  getMaxLength: function (blocks) {
    return blocks.reduce(function (previous, current) {
      return previous + current;
    }, 0);
  },

  // strip prefix
  // Before type  |   After type    |     Return value
  // PEFIX-...    |   PEFIX-...     |     ''
  // PREFIX-123   |   PEFIX-123     |     123
  // PREFIX-123   |   PREFIX-23     |     23
  // PREFIX-123   |   PREFIX-1234   |     1234
  getPrefixStrippedValue: function (value, prefix, prefixLength, prevResult, delimiter, delimiters, noImmediatePrefix, tailPrefix, signBeforePrefix) {
    // No prefix
    if (prefixLength === 0) {
      return value;
    }

    // Value is prefix
    if (value === prefix && value !== '') {
      return '';
    }

    if (signBeforePrefix && value.slice(0, 1) == '-') {
      var prev = prevResult.slice(0, 1) == '-' ? prevResult.slice(1) : prevResult;
      return '-' + this.getPrefixStrippedValue(value.slice(1), prefix, prefixLength, prev, delimiter, delimiters, noImmediatePrefix, tailPrefix, signBeforePrefix);
    }

    // Pre result prefix string does not match pre-defined prefix
    if (prevResult.slice(0, prefixLength) !== prefix && !tailPrefix) {
      // Check if the first time user entered something
      if (noImmediatePrefix && !prevResult && value) return value;
      return '';
    } else if (prevResult.slice(-prefixLength) !== prefix && tailPrefix) {
      // Check if the first time user entered something
      if (noImmediatePrefix && !prevResult && value) return value;
      return '';
    }

    var prevValue = this.stripDelimiters(prevResult, delimiter, delimiters);

    // New value has issue, someone typed in between prefix letters
    // Revert to pre value
    if (value.slice(0, prefixLength) !== prefix && !tailPrefix) {
      return prevValue.slice(prefixLength);
    } else if (value.slice(-prefixLength) !== prefix && tailPrefix) {
      return prevValue.slice(0, -prefixLength - 1);
    }

    // No issue, strip prefix for new value
    return tailPrefix ? value.slice(0, -prefixLength) : value.slice(prefixLength);
  },

  getFirstDiffIndex: function (prev, current) {
    var index = 0;

    while (prev.charAt(index) === current.charAt(index)) {
      if (prev.charAt(index++) === '') {
        return -1;
      }
    }

    return index;
  },

  getFormattedValue: function (value, blocks, blocksLength, delimiter, delimiters, delimiterLazyShow) {
    var result = '',
      multipleDelimiters = delimiters.length > 0,
      currentDelimiter = '';

    // no options, normal input
    if (blocksLength === 0) {
      return value;
    }

    blocks.forEach(function (length, index) {
      if (value.length > 0) {
        var sub = value.slice(0, length),
          rest = value.slice(length);

        if (multipleDelimiters) {
          currentDelimiter = delimiters[delimiterLazyShow ? index - 1 : index] || currentDelimiter;
        } else {
          currentDelimiter = delimiter;
        }

        if (delimiterLazyShow) {
          if (index > 0) {
            result += currentDelimiter;
          }

          result += sub;
        } else {
          result += sub;

          if (sub.length === length && index < blocksLength - 1) {
            result += currentDelimiter;
          }
        }

        // update remaining string
        value = rest;
      }
    });

    return result;
  },

  // move cursor to the end
  // the first time user focuses on an input with prefix
  fixPrefixCursor: function (el, prefix, delimiter, delimiters) {
    if (!el) {
      return;
    }

    var val = el.value,
      appendix = delimiter || delimiters[0] || ' ';

    if (!el.setSelectionRange || !prefix || prefix.length + appendix.length <= val.length) {
      return;
    }

    var len = val.length * 2;

    // set timeout to avoid blink
    setTimeout(function () {
      el.setSelectionRange(len, len);
    }, 1);
  },

  // Check if input field is fully selected
  checkFullSelection: function (value) {
    try {
      var selection = window.getSelection() || document.getSelection() || {};
      return selection.toString().length === value.length;
    } catch (ex) {
      // Ignore
    }

    return false;
  },

  setSelection: function (element, position, doc) {
    if (element !== this.getActiveElement(doc)) {
      return;
    }

    // cursor is already in the end
    if (element && element.value.length <= position) {
      return;
    }

    if (element.createTextRange) {
      var range = element.createTextRange();

      range.move('character', position);
      range.select();
    } else {
      try {
        element.setSelectionRange(position, position);
      } catch (e) {
        // eslint-disable-next-line
        console.warn('The input element type does not support selection');
      }
    }
  },

  getActiveElement: function (parent) {
    var activeElement = parent.activeElement;
    if (activeElement && activeElement.shadowRoot) {
      return this.getActiveElement(activeElement.shadowRoot);
    }
    return activeElement;
  },

  isAndroid: function () {
    return navigator && /android/i.test(navigator.userAgent);
  },

  // On Android chrome, the keyup and keydown events
  // always return key code 229 as a composition that
  // buffers the user’s keystrokes
  // see https://github.com/nosir/cleave.js/issues/147
  isAndroidBackspaceKeydown: function (lastInputValue, currentInputValue) {
    if (!this.isAndroid() || !lastInputValue || !currentInputValue) {
      return false;
    }

    return currentInputValue === lastInputValue.slice(0, -1);
  },
};

var Util_1 = Util;

/**
 * Props Assignment
 *
 * Separate this, so react module can share the usage
 */
var DefaultProperties = {
  // Maybe change to object-assign
  // for now just keep it as simple
  assign: function (target, opts) {
    target = target || {};
    opts = opts || {};

    // credit card
    target.creditCard = !!opts.creditCard;
    target.creditCardStrictMode = !!opts.creditCardStrictMode;
    target.creditCardType = '';
    target.onCreditCardTypeChanged = opts.onCreditCardTypeChanged || function () {};

    // phone
    target.phone = !!opts.phone;
    target.phoneRegionCode = opts.phoneRegionCode || 'AU';
    target.phoneFormatter = {};

    // time
    target.time = !!opts.time;
    target.timePattern = opts.timePattern || ['h', 'm', 's'];
    target.timeFormat = opts.timeFormat || '24';
    target.timeFormatter = {};

    // date
    target.date = !!opts.date;
    target.datePattern = opts.datePattern || ['d', 'm', 'Y'];
    target.dateMin = opts.dateMin || '';
    target.dateMax = opts.dateMax || '';
    target.dateFormatter = {};

    // numeral
    target.numeral = !!opts.numeral;
    target.numeralIntegerScale = opts.numeralIntegerScale > 0 ? opts.numeralIntegerScale : 0;
    target.numeralDecimalScale = opts.numeralDecimalScale >= 0 ? opts.numeralDecimalScale : 2;
    target.numeralDecimalMark = opts.numeralDecimalMark || '.';
    target.numeralThousandsGroupStyle = opts.numeralThousandsGroupStyle || 'thousand';
    target.numeralPositiveOnly = !!opts.numeralPositiveOnly;
    target.stripLeadingZeroes = opts.stripLeadingZeroes !== false;
    target.signBeforePrefix = !!opts.signBeforePrefix;
    target.tailPrefix = !!opts.tailPrefix;

    // others
    target.swapHiddenInput = !!opts.swapHiddenInput;

    target.numericOnly = target.creditCard || target.date || !!opts.numericOnly;

    target.uppercase = !!opts.uppercase;
    target.lowercase = !!opts.lowercase;

    target.prefix = target.creditCard || target.date ? '' : opts.prefix || '';
    target.noImmediatePrefix = !!opts.noImmediatePrefix;
    target.prefixLength = target.prefix.length;
    target.rawValueTrimPrefix = !!opts.rawValueTrimPrefix;
    target.copyDelimiter = !!opts.copyDelimiter;

    target.initValue = opts.initValue !== undefined && opts.initValue !== null ? opts.initValue.toString() : '';

    target.delimiter = opts.delimiter || opts.delimiter === '' ? opts.delimiter : opts.date ? '/' : opts.time ? ':' : opts.numeral ? ',' : opts.phone ? ' ' : ' ';
    target.delimiterLength = target.delimiter.length;
    target.delimiterLazyShow = !!opts.delimiterLazyShow;
    target.delimiters = opts.delimiters || [];

    target.blocks = opts.blocks || [];
    target.blocksLength = target.blocks.length;

    target.root = typeof commonjsGlobal === 'object' && commonjsGlobal ? commonjsGlobal : window;
    target.document = opts.document || target.root.document;

    target.maxLength = 0;

    target.backspace = false;
    target.result = '';

    target.onValueChanged = opts.onValueChanged || function () {};

    return target;
  },
};

var DefaultProperties_1 = DefaultProperties;

/**
 * Construct a new Cleave instance by passing the configuration object
 *
 * @param {String | HTMLElement} element
 * @param {Object} opts
 */
var Cleave = function (element, opts) {
  var owner = this;
  var hasMultipleElements = false;

  if (typeof element === 'string') {
    owner.element = document.querySelector(element);
    hasMultipleElements = document.querySelectorAll(element).length > 1;
  } else {
    if (typeof element.length !== 'undefined' && element.length > 0) {
      owner.element = element[0];
      hasMultipleElements = element.length > 1;
    } else {
      owner.element = element;
    }
  }

  if (!owner.element) {
    throw new Error('[cleave.js] Please check the element');
  }

  if (hasMultipleElements) {
    try {
      // eslint-disable-next-line
      console.warn('[cleave.js] Multiple input fields matched, cleave.js will only take the first one.');
    } catch (e) {
      // Old IE
    }
  }

  opts.initValue = owner.element.value;

  owner.properties = Cleave.DefaultProperties.assign({}, opts);

  owner.init();
};

Cleave.prototype = {
  init: function () {
    var owner = this,
      pps = owner.properties;

    // no need to use this lib
    if (!pps.numeral && !pps.phone && !pps.creditCard && !pps.time && !pps.date && pps.blocksLength === 0 && !pps.prefix) {
      owner.onInput(pps.initValue);

      return;
    }

    pps.maxLength = Cleave.Util.getMaxLength(pps.blocks);

    owner.isAndroid = Cleave.Util.isAndroid();
    owner.lastInputValue = '';
    owner.isBackward = '';

    owner.onChangeListener = owner.onChange.bind(owner);
    owner.onKeyDownListener = owner.onKeyDown.bind(owner);
    owner.onFocusListener = owner.onFocus.bind(owner);
    owner.onCutListener = owner.onCut.bind(owner);
    owner.onCopyListener = owner.onCopy.bind(owner);

    owner.initSwapHiddenInput();

    owner.element.addEventListener('input', owner.onChangeListener);
    owner.element.addEventListener('keydown', owner.onKeyDownListener);
    owner.element.addEventListener('focus', owner.onFocusListener);
    owner.element.addEventListener('cut', owner.onCutListener);
    owner.element.addEventListener('copy', owner.onCopyListener);

    owner.initPhoneFormatter();
    owner.initDateFormatter();
    owner.initTimeFormatter();
    owner.initNumeralFormatter();

    // avoid touch input field if value is null
    // otherwise Firefox will add red box-shadow for <input required />
    if (pps.initValue || (pps.prefix && !pps.noImmediatePrefix)) {
      owner.onInput(pps.initValue);
    }
  },

  initSwapHiddenInput: function () {
    var owner = this,
      pps = owner.properties;
    if (!pps.swapHiddenInput) return;

    var inputFormatter = owner.element.cloneNode(true);
    owner.element.parentNode.insertBefore(inputFormatter, owner.element);

    owner.elementSwapHidden = owner.element;
    owner.elementSwapHidden.type = 'hidden';

    owner.element = inputFormatter;
    owner.element.id = '';
  },

  initNumeralFormatter: function () {
    var owner = this,
      pps = owner.properties;

    if (!pps.numeral) {
      return;
    }

    pps.numeralFormatter = new Cleave.NumeralFormatter(
      pps.numeralDecimalMark,
      pps.numeralIntegerScale,
      pps.numeralDecimalScale,
      pps.numeralThousandsGroupStyle,
      pps.numeralPositiveOnly,
      pps.stripLeadingZeroes,
      pps.prefix,
      pps.signBeforePrefix,
      pps.tailPrefix,
      pps.delimiter,
    );
  },

  initTimeFormatter: function () {
    var owner = this,
      pps = owner.properties;

    if (!pps.time) {
      return;
    }

    pps.timeFormatter = new Cleave.TimeFormatter(pps.timePattern, pps.timeFormat);
    pps.blocks = pps.timeFormatter.getBlocks();
    pps.blocksLength = pps.blocks.length;
    pps.maxLength = Cleave.Util.getMaxLength(pps.blocks);
  },

  initDateFormatter: function () {
    var owner = this,
      pps = owner.properties;

    if (!pps.date) {
      return;
    }

    pps.dateFormatter = new Cleave.DateFormatter(pps.datePattern, pps.dateMin, pps.dateMax);
    pps.blocks = pps.dateFormatter.getBlocks();
    pps.blocksLength = pps.blocks.length;
    pps.maxLength = Cleave.Util.getMaxLength(pps.blocks);
  },

  initPhoneFormatter: function () {
    var owner = this,
      pps = owner.properties;

    if (!pps.phone) {
      return;
    }

    // Cleave.AsYouTypeFormatter should be provided by
    // external google closure lib
    try {
      pps.phoneFormatter = new Cleave.PhoneFormatter(new pps.root.Cleave.AsYouTypeFormatter(pps.phoneRegionCode), pps.delimiter);
    } catch (ex) {
      throw new Error('[cleave.js] Please include phone-type-formatter.{country}.js lib');
    }
  },

  onKeyDown: function (event) {
    var owner = this,
      charCode = event.which || event.keyCode;

    owner.lastInputValue = owner.element.value;
    owner.isBackward = charCode === 8;
  },

  onChange: function (event) {
    var owner = this,
      pps = owner.properties,
      Util = Cleave.Util;

    owner.isBackward = owner.isBackward || event.inputType === 'deleteContentBackward';

    var postDelimiter = Util.getPostDelimiter(owner.lastInputValue, pps.delimiter, pps.delimiters);

    if (owner.isBackward && postDelimiter) {
      pps.postDelimiterBackspace = postDelimiter;
    } else {
      pps.postDelimiterBackspace = false;
    }

    this.onInput(this.element.value);
  },

  onFocus: function () {
    var owner = this,
      pps = owner.properties;
    owner.lastInputValue = owner.element.value;

    if (pps.prefix && pps.noImmediatePrefix && !owner.element.value) {
      this.onInput(pps.prefix);
    }

    Cleave.Util.fixPrefixCursor(owner.element, pps.prefix, pps.delimiter, pps.delimiters);
  },

  onCut: function (e) {
    if (!Cleave.Util.checkFullSelection(this.element.value)) return;
    this.copyClipboardData(e);
    this.onInput('');
  },

  onCopy: function (e) {
    if (!Cleave.Util.checkFullSelection(this.element.value)) return;
    this.copyClipboardData(e);
  },

  copyClipboardData: function (e) {
    var owner = this,
      pps = owner.properties,
      Util = Cleave.Util,
      inputValue = owner.element.value,
      textToCopy = '';

    if (!pps.copyDelimiter) {
      textToCopy = Util.stripDelimiters(inputValue, pps.delimiter, pps.delimiters);
    } else {
      textToCopy = inputValue;
    }

    try {
      if (e.clipboardData) {
        e.clipboardData.setData('Text', textToCopy);
      } else {
        window.clipboardData.setData('Text', textToCopy);
      }

      e.preventDefault();
    } catch (ex) {
      //  empty
    }
  },

  onInput: function (value) {
    var owner = this,
      pps = owner.properties,
      Util = Cleave.Util;

    // case 1: delete one more character "4"
    // 1234*| -> hit backspace -> 123|
    // case 2: last character is not delimiter which is:
    // 12|34* -> hit backspace -> 1|34*
    // note: no need to apply this for numeral mode
    var postDelimiterAfter = Util.getPostDelimiter(value, pps.delimiter, pps.delimiters);
    if (!pps.numeral && pps.postDelimiterBackspace && !postDelimiterAfter) {
      value = Util.headStr(value, value.length - pps.postDelimiterBackspace.length);
    }

    // phone formatter
    if (pps.phone) {
      if (pps.prefix && (!pps.noImmediatePrefix || value.length)) {
        pps.result = pps.prefix + pps.phoneFormatter.format(value).slice(pps.prefix.length);
      } else {
        pps.result = pps.phoneFormatter.format(value);
      }
      owner.updateValueState();

      return;
    }

    // numeral formatter
    if (pps.numeral) {
      // Do not show prefix when noImmediatePrefix is specified
      // This mostly because we need to show user the native input placeholder
      if (pps.prefix && pps.noImmediatePrefix && value.length === 0) {
        pps.result = '';
      } else {
        pps.result = pps.numeralFormatter.format(value);
      }
      owner.updateValueState();

      return;
    }

    // date
    if (pps.date) {
      value = pps.dateFormatter.getValidatedDate(value);
    }

    // time
    if (pps.time) {
      value = pps.timeFormatter.getValidatedTime(value);
    }

    // strip delimiters
    value = Util.stripDelimiters(value, pps.delimiter, pps.delimiters);

    // strip prefix
    value = Util.getPrefixStrippedValue(
      value,
      pps.prefix,
      pps.prefixLength,
      pps.result,
      pps.delimiter,
      pps.delimiters,
      pps.noImmediatePrefix,
      pps.tailPrefix,
      pps.signBeforePrefix,
    );

    // strip non-numeric characters
    value = pps.numericOnly ? Util.strip(value, /[^\d]/g) : value;

    // convert case
    value = pps.uppercase ? value.toUpperCase() : value;
    value = pps.lowercase ? value.toLowerCase() : value;

    // prevent from showing prefix when no immediate option enabled with empty input value
    if (pps.prefix) {
      if (pps.tailPrefix) {
        value = value + pps.prefix;
      } else {
        value = pps.prefix + value;
      }

      // no blocks specified, no need to do formatting
      if (pps.blocksLength === 0) {
        pps.result = value;
        owner.updateValueState();

        return;
      }
    }

    // update credit card props
    if (pps.creditCard) {
      owner.updateCreditCardPropsByValue(value);
    }

    // strip over length characters
    value = Util.headStr(value, pps.maxLength);

    // apply blocks
    pps.result = Util.getFormattedValue(value, pps.blocks, pps.blocksLength, pps.delimiter, pps.delimiters, pps.delimiterLazyShow);

    owner.updateValueState();
  },

  updateCreditCardPropsByValue: function (value) {
    var owner = this,
      pps = owner.properties,
      Util = Cleave.Util,
      creditCardInfo;

    // At least one of the first 4 characters has changed
    if (Util.headStr(pps.result, 4) === Util.headStr(value, 4)) {
      return;
    }

    creditCardInfo = Cleave.CreditCardDetector.getInfo(value, pps.creditCardStrictMode);

    pps.blocks = creditCardInfo.blocks;
    pps.blocksLength = pps.blocks.length;
    pps.maxLength = Util.getMaxLength(pps.blocks);

    // credit card type changed
    if (pps.creditCardType !== creditCardInfo.type) {
      pps.creditCardType = creditCardInfo.type;

      pps.onCreditCardTypeChanged.call(owner, pps.creditCardType);
    }
  },

  updateValueState: function () {
    var owner = this,
      Util = Cleave.Util,
      pps = owner.properties;

    if (!owner.element) {
      return;
    }

    var endPos = owner.element.selectionEnd;
    var oldValue = owner.element.value;
    var newValue = pps.result;

    endPos = Util.getNextCursorPosition(endPos, oldValue, newValue, pps.delimiter, pps.delimiters);

    // fix Android browser type="text" input field
    // cursor not jumping issue
    if (owner.isAndroid) {
      window.setTimeout(function () {
        owner.element.value = newValue;
        Util.setSelection(owner.element, endPos, pps.document, false);
        owner.callOnValueChanged();
      }, 1);

      return;
    }

    owner.element.value = newValue;
    if (pps.swapHiddenInput) owner.elementSwapHidden.value = owner.getRawValue();

    Util.setSelection(owner.element, endPos, pps.document, false);
    owner.callOnValueChanged();
  },

  callOnValueChanged: function () {
    var owner = this,
      pps = owner.properties;

    pps.onValueChanged.call(owner, {
      target: {
        name: owner.element.name,
        value: pps.result,
        rawValue: owner.getRawValue(),
      },
    });
  },

  setPhoneRegionCode: function (phoneRegionCode) {
    var owner = this,
      pps = owner.properties;

    pps.phoneRegionCode = phoneRegionCode;
    owner.initPhoneFormatter();
    owner.onChange();
  },

  setRawValue: function (value) {
    var owner = this,
      pps = owner.properties;

    value = value !== undefined && value !== null ? value.toString() : '';

    if (pps.numeral) {
      value = value.replace('.', pps.numeralDecimalMark);
    }

    pps.postDelimiterBackspace = false;

    owner.element.value = value;
    owner.onInput(value);
  },

  getRawValue: function () {
    var owner = this,
      pps = owner.properties,
      Util = Cleave.Util,
      rawValue = owner.element.value;

    if (pps.rawValueTrimPrefix) {
      rawValue = Util.getPrefixStrippedValue(
        rawValue,
        pps.prefix,
        pps.prefixLength,
        pps.result,
        pps.delimiter,
        pps.delimiters,
        pps.noImmediatePrefix,
        pps.tailPrefix,
        pps.signBeforePrefix,
      );
    }

    if (pps.numeral) {
      rawValue = pps.numeralFormatter.getRawValue(rawValue);
    } else {
      rawValue = Util.stripDelimiters(rawValue, pps.delimiter, pps.delimiters);
    }

    return rawValue;
  },

  getISOFormatDate: function () {
    var owner = this,
      pps = owner.properties;

    return pps.date ? pps.dateFormatter.getISOFormatDate() : '';
  },

  getISOFormatTime: function () {
    var owner = this,
      pps = owner.properties;

    return pps.time ? pps.timeFormatter.getISOFormatTime() : '';
  },

  getFormattedValue: function () {
    return this.element.value;
  },

  destroy: function () {
    var owner = this;

    owner.element.removeEventListener('input', owner.onChangeListener);
    owner.element.removeEventListener('keydown', owner.onKeyDownListener);
    owner.element.removeEventListener('focus', owner.onFocusListener);
    owner.element.removeEventListener('cut', owner.onCutListener);
    owner.element.removeEventListener('copy', owner.onCopyListener);
  },

  toString: function () {
    return '[Cleave Object]';
  },
};

Cleave.NumeralFormatter = NumeralFormatter_1;
Cleave.DateFormatter = DateFormatter_1;
Cleave.TimeFormatter = TimeFormatter_1;
Cleave.PhoneFormatter = PhoneFormatter_1;
Cleave.CreditCardDetector = CreditCardDetector_1;
Cleave.Util = Util_1;
Cleave.DefaultProperties = DefaultProperties_1;

// for angular directive
(typeof commonjsGlobal === 'object' && commonjsGlobal ? commonjsGlobal : window)['Cleave'] = Cleave;

// CommonJS
var Cleave_1 = Cleave;

const tkInputCss =
  '@font-face{font-family:"Material Symbols Outlined";src:url("./assets/fonts/Material-Symbols-Outlined.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-outlined{font-family:"Material Symbols Outlined";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-outlined{font-variation-settings:"FILL" 0}.material-symbols-outlined.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Rounded";src:url("./assets/fonts/Material-Symbols-Rounded.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-rounded{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-rounded{font-variation-settings:"FILL" 0}.material-symbols-rounded.fill{font-variation-settings:"FILL" 1}@font-face{font-family:"Material Symbols Sharp";src:url("./assets/fonts/Material-Symbols-Sharp.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}.material-symbols-sharp{font-family:"Material Symbols Sharp";font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}.material-symbols-sharp{font-variation-settings:"FILL" 0}.material-symbols-sharp.fill{font-variation-settings:"FILL" 1}tk-input{display:block}tk-input.tk-select-input:not(.editable-select) .tk-input,tk-input.tk-select-input:not(.editable-select) .tk-input input{cursor:pointer}tk-input.tk-table-input .tk-input-container .tk-input{height:20px;padding-top:0px;padding-bottom:0px;border-radius:var(--spacing-xs)}tk-input.tk-table-input .tk-input-container .tk-input i{font-size:var(--spacing-2xl);width:var(--spacing-2xl);height:var(--spacing-2xl)}tk-input.tk-table-input .tk-input-container .tk-input input{font-size:var(--desktop-body-s-size);line-height:100%}.tk-input-container{display:flex;align-items:flex-start;flex-direction:column;gap:var(--input-external-label-large-container-gap);width:100%;}.tk-input-container .label{color:var(--text-darkest);font-weight:400}.tk-input-container .label .asterisk{color:var(--states-danger-base);font-size:var(--desktop-label-s-size);font-weight:300;line-height:var(--desktop-label-s-line-height)}.tk-input-container .tk-input{display:flex;align-items:center;border:1px solid var(--border-light);border-radius:var(--spacing-m-base);background-color:var(--static-light);box-sizing:border-box;width:-webkit-fill-available}.tk-input-container .tk-input i{color:var(--icon-base);user-select:none}.tk-input-container .tk-input i.clickable{cursor:pointer}.tk-input-container .tk-input .counter-icon{width:20px;height:20px;font-size:20px;color:var(--icon-base);user-select:none}.tk-input-container .tk-input .counter-icon:hover{color:var(--icon-dark);cursor:pointer}.tk-input-container .tk-input .tk-input-prefix-container{display:inline-flex;font-weight:300}.tk-input-container .tk-input .tk-input-prefix-container.large{font-size:var(--desktop-body-m-base-size);line-height:var(--desktop-body-m-base-line-height)}.tk-input-container .tk-input .tk-input-prefix-container.base{font-size:var(--desktop-body-s-size);line-height:var(--desktop-body-s-line-height)}.tk-input-container .tk-input .tk-input-prefix-container.small{font-size:var(--desktop-body-xs-size);line-height:var(--desktop-body-xs-line-height)}.tk-input-container .tk-input .tk-input-prefix-container .tk-input-prefix-text{color:var(--text-sub-base);size:inherit}.tk-input-container .tk-input .tk-input-prefix-container .tk-input-divider{position:relative;display:flex;justify-content:center;min-height:100%;margin:0 8px}.tk-input-container .tk-input .tk-input-prefix-container .tk-input-divider::before{content:"";position:absolute;display:block;height:100%;inset-block-start:0;inset-inline-start:50%;border-inline-start:var(--spacing-px) solid var(--background-light);box-sizing:border-box}.tk-input-container .tk-input input{outline:none;border:none;background-color:transparent;color:var(--text-darkest);padding:0px;width:100%;line-height:var(--desktop-body-m-base-line-height)}.tk-input-container .tk-input input::placeholder{color:var(--text-sub-base)}.tk-input-container .tk-input:hover:not(.tk-input-container[aria-disabled] .tk-input){background-color:var(--background-lightest)}.tk-input-container .safety-status{display:flex;gap:var(--spacing-xs);width:100%;margin-top:var(--spacing-xxs)}.tk-input-container .safety-status .line{width:25%;height:4px;border-radius:var(--radius-m-base);background-color:var(--background-light)}.tk-input-container .safety-status .line.weak{background-color:var(--states-danger-base)}.tk-input-container .safety-status .line.medium{background-color:var(--states-warning-base)}.tk-input-container .safety-status .line.strong{background-color:var(--states-success-base)}.tk-input-container .hint{color:var(--text-base);line-height:var(--desktop-label-s-line-height);font-size:var(--desktop-label-s-size);font-weight:300;display:flex;align-items:center;gap:var(--spacing-m-base)}.tk-input-container .hint i{font-size:var(--size-base);width:var(--size-base);height:var(--size-base);color:var(--icon-base)}.tk-input-container.large .label{font-size:var(--desktop-label-l-size);line-height:var(--desktop-label-l-line-height);padding:var(--input-external-label-large-label-v-padding) var(--input-external-label-large-label-h-padding)}.tk-input-container.large .tk-input{padding:var(--input-external-label-large-input-v-padding) var(--input-external-label-large-input-h-padding);gap:var(--input-external-label-large-input-gap);height:48px}.tk-input-container.large .tk-input i,.tk-input-container.large .tk-input .counter-icon{font-size:var(--input-external-label-large-icon-size);width:var(--input-external-label-large-icon-size);height:var(--input-external-label-large-icon-size)}.tk-input-container.large .tk-input input{font-size:var(--desktop-body-m-base-size);line-height:var(--desktop-body-m-base-line-height)}.tk-input-container.base .label{font-size:var(--desktop-label-m-base-size);line-height:var(--desktop-label-m-base-line-height);padding:var(--input-external-label-base-label-v-padding) var(--input-external-label-base-label-h-padding)}.tk-input-container.base .tk-input{padding:var(--input-external-label-base-input-v-padding) var(--input-external-label-base-input-h-padding);gap:var(--input-external-label-base-input-gap);height:40px}.tk-input-container.base .tk-input i{font-size:var(--input-external-label-base-icon-size);width:var(--input-external-label-base-icon-size);height:var(--input-external-label-base-icon-size)}.tk-input-container.base .tk-input input{font-size:var(--desktop-body-s-size);line-height:var(--desktop-body-s-line-height)}.tk-input-container.small .label{font-size:var(--desktop-label-s-size);line-height:var(--desktop-label-s-line-height);padding:var(--input-external-label-small-label-v-padding) var(--input-external-label-small-label-h-padding)}.tk-input-container.small .tk-input{padding:var(--input-external-label-small-input-v-padding) var(--input-external-label-small-input-h-padding);gap:var(--input-external-label-small-input-gap);height:32px}.tk-input-container.small .tk-input i{font-size:var(--input-external-label-small-icon-size);width:var(--input-external-label-small-icon-size);height:var(--input-external-label-small-icon-size)}.tk-input-container.small .tk-input input{font-size:var(--desktop-body-xs-size);line-height:var(--desktop-body-xs-line-height)}.tk-input-container.focus .tk-input{border-color:var(--states-info-base)}.tk-input-container[aria-disabled] .label,.tk-input-container[aria-disabled] .hint,.tk-input-container[aria-disabled] .tk-input input{color:var(--text-sub-base);pointer-events:none}.tk-input-container[aria-disabled] .tk-input{background-color:var(--background-lightest)}.tk-input-container[aria-disabled] .tk-input i,.tk-input-container[aria-disabled] .tk-input .counter-icon{color:var(--icon-sub-base)}.tk-input-container[aria-readonly] .label,.tk-input-container[aria-readonly] .hint{color:var(--text-sub-base)}.tk-input-container[aria-readonly] .tk-input{background-color:var(--background-lightest)}.tk-input-container[aria-readonly] .tk-input i{color:var(--icon-light)}.tk-input-container[aria-invalid] .tk-input{border-color:var(--states-danger-base)}.tk-input-container[aria-invalid] .hint,.tk-input-container[aria-invalid] .hint i{color:var(--states-danger-base)}.tk-input-container input[type=number]{appearance:none}.tk-input-container input[type=number]::-webkit-outer-spin-button,.tk-input-container input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}.tk-input-container.counter input{text-align:center}.tk-input-container.chips .tk-input{flex-wrap:wrap;height:unset}.tk-input-container.chips .tk-input input{flex:1;width:unset;min-width:30px}';

const TkInput = /*@__PURE__*/ proxyCustomElement(
  class TkInput extends H {
    constructor() {
      super();
      this.__registerHost();
      this.tkChange = createEvent(this, 'tk-change', 5);
      this.tkBlur = createEvent(this, 'tk-blur', 7);
      this.tkFocus = createEvent(this, 'tk-focus', 7);
      this.tkClearClick = createEvent(this, 'tk-clear-click', 7);
      this.internals = this.attachInternals();
      this.uniqueId = v4();
      this.readOnly = false;
      this.hasFocus = false;
      this.isCounter = false;
      this.isPassword = false;
      this.passwordStrength = 0;
      /**
       * the user cannot interact with the input.
       */
      this.disabled = false;
      /**
       * Indicates whether the input is in an invalid state
       * @defaultValue false
       */
      this.invalid = false;
      /**
       * Indicates whether the input can be cleared
       * @defaultValue false
       */
      this.clearable = false;
      /**
       * Defines the position of the icon.
       * @defaultValue left
       */
      this.iconPosition = 'left';
      /**
       * If `true`, the user cannot modify the value.
       */
      this.readonly = false;
      /**
       * Sets size for the component.
       */
      this.size = 'base';
      /**
       * if type = password safety status bar visible
       */
      this.showSafetyStatus = false;
      /**
       * Displays a red asterisk (*) next to the label for visual emphasis.
       */
      this.showAsterisk = false;
      /**
       * The key to use for option labels
       * @defaultValue label
       */
      this.chipLabelKey = 'label';
      /**
       * input type
       */
      this.mode = 'text';
      this.handleInput = ev => {
        var _a, _b;
        if (this.mode != 'chips') {
          const input = ev.target;
          let _value;
          if (this.mode == 'number') {
            _value = input.value ? Number(input.value) : null;
          } else {
            _value = input.value || '';
          }
          // masklı kullanımlar için value'yu formatlama yapılıyor.
          if (this.maskOptions && this.cleaveInstance) {
            // If letterOnly option is enabled, filter out non-letters
            if (this.maskOptions.letterOnly) {
              _value = _value.replace(/[^a-zA-Z]/g, '');
              input.value = _value;
            }
            (_a = this.cleaveInstance) === null || _a === void 0 ? void 0 : _a.setRawValue(_value);
            _value = (_b = this.cleaveInstance) === null || _b === void 0 ? void 0 : _b.getFormattedValue();
          }
          if (!_.isEqual(this.value, _value)) {
            this.value = _value;
            this.tkChange.emit(_value);
          }
        }
        if (this.mode == 'password' && this.showSafetyStatus) {
          this.passwordStrength = this.calculatePasswordStrength(String(this.value));
        }
      };
      this.handleInputBlur = () => {
        this.hasFocus = false;
        this.validateMinMax();
        this.tkBlur.emit();
      };
      // for add chip
      this.handleInputKeyDown = e => {
        // --- Cleave.js maske ayırıcı karakterlerinin silinmesi için genel çözüm ---
        if (this.maskOptions && this.cleaveInstance && this.mode == 'text' && (e.key === 'Backspace' || e.key === 'Delete')) {
          const input = this.nativeInput;
          const value = input.value;
          const selectionStart = input.selectionStart;
          const selectionEnd = input.selectionEnd;
          // Sadece imleç varsa (seçili alan yoksa) işle
          if (selectionStart === selectionEnd) {
            let charToCheck, posToRemove;
            if (e.key === 'Backspace' && selectionStart > 0) {
              charToCheck = value[selectionStart - 1];
              posToRemove = selectionStart - 1;
            } else if (e.key === 'Delete' && selectionStart < value.length) {
              charToCheck = value[selectionStart];
              posToRemove = selectionStart;
            }
            // Eğer karakter bir ayırıcı ise (rakam/harf değilse)
            if (charToCheck && /[^a-zA-Z0-9]/.test(charToCheck)) {
              e.preventDefault();
              // Ayırıcıyı ve öncesindeki (Backspace) veya sonrasındaki (Delete) karakteri sil
              let newValue;
              let newCaretPos;
              if (e.key === 'Backspace') {
                // Ayırıcının öncesindeki karakteri sil
                newValue = value.slice(0, posToRemove - 1) + value.slice(posToRemove);
                newCaretPos = posToRemove - 1;
              } else {
                // Ayırıcının sonrasındaki karakteri sil
                newValue = value.slice(0, posToRemove) + value.slice(posToRemove + 1);
                newCaretPos = posToRemove;
              }
              this.cleaveInstance.setRawValue(newValue);
              this.value = this.cleaveInstance.getFormattedValue();
              this.tkChange.emit(this.value);
              // DOM güncellendikten sonra imleç pozisyonunu ayarla
              setTimeout(() => {
                input.setSelectionRange(newCaretPos, newCaretPos);
              }, 0);
              return; // Daha fazla işlem yapma
            }
          }
        }
        if (
          e.key == 'Enter' &&
          this.nativeInput.value.trim() &&
          this.mode == 'chips' &&
          // (!this.value || (this.value as string[])?.indexOf(this.nativeInput.value) == -1) &&
          (this.el.classList.contains('allow-custom-value-select') || !this.el.classList.contains('tk-select-input'))
        ) {
          if (this.value) {
            this.value = [...this.value, this.nativeInput.value];
            this.tkChange.emit(this.value);
          } else {
            this.value = [this.nativeInput.value];
            this.tkChange.emit([this.nativeInput.value]);
          }
          this.nativeInput.value = '';
        }
      };
      this.handleInputFocus = () => {
        this.hasFocus = true;
        this.tkFocus.emit();
      };
      this.handleMouseDown = event => {
        this.visiblePassword(event, true);
      };
      this.handleMouseUp = event => {
        this.visiblePassword(event, false);
      };
    }
    valueChanged(newValue, oldValue) {
      if (_.isEqual(newValue, oldValue) && this.mode !== 'chips') {
        this.nativeInput.value = newValue;
      }
    }
    componentWillLoad() {
      // If the tk-input has a tabindex attribute we get the value
      // and pass it down to the native input, then remove it from the
      // tk-input to avoid causing tabbing twice on the same element
      if (this.el.hasAttribute('tabindex')) {
        const tabindex = this.el.getAttribute('tabindex');
        this.tabindex = tabindex !== null ? tabindex : undefined;
        this.el.removeAttribute('tabindex');
      }
      if (this.mode == 'text') {
        this.inputType = 'text';
      } else if (this.mode == 'number') {
        this.inputType = 'number';
      } else if (this.mode == 'password') {
        this.inputType = 'password';
        this.isPassword = true;
      } else if (this.mode == 'counter') {
        this.inputType = 'number';
        this.isCounter = true;
      }
    }
    componentDidLoad() {
      this.nativeInput = this.el.querySelector('input');
      if (this.mode == 'text' && this.maskOptions) {
        this.cleaveInstance = new Cleave_1(this.nativeInput, Object.assign({}, this.maskOptions));
      }
    }
    formResetCallback() {
      this.handleFormReset();
    }
    /**
     * Sets focus on the specified `tk-input`. Use this method instead of the global
     * `input.focus()`.
     */
    async setFocus() {
      var _a;
      (_a = this.nativeInput) === null || _a === void 0 ? void 0 : _a.focus();
    }
    isMultiIconFormat() {
      return this.icon && typeof this.icon === 'object' && ('left' in this.icon || 'right' in this.icon) && !('name' in this.icon);
    }
    validateMinMax() {
      if (this.mode === 'text' && this.min !== undefined && this.max !== undefined) {
        const numValue = parseInt(this.value, 10);
        if (!isNaN(numValue)) {
          if (numValue < Number(this.min)) {
            this.value = this.min.toString();
            this.tkChange.emit(this.min.toString());
          } else if (numValue > Number(this.max)) {
            this.value = this.max.toString();
            this.tkChange.emit(this.max.toString());
          }
        }
      }
    }
    /**
     * Toggles the visibility of the password input field.
     *
     * This method is called when the user interacts with the visibility toggle icon.
     *
     * @param event The mouse event triggered by the user interaction.
     * @param val A boolean value indicating whether to show or hide the password.
     */
    visiblePassword(event, val) {
      if (val) {
        this.nativeInput.type = 'text';
        event.target.innerHTML = 'visibility_off';
      } else {
        this.nativeInput.type = 'password';
        event.target.innerHTML = 'visibility';
      }
    }
    /**
     * Calculates the strength of a given password.
     *
     * The password strength is determined based on the following criteria:
     * - Length of at least 8 characters
     * - Presence of uppercase letters
     * - Presence of lowercase letters
     * - Presence of numbers
     * - Presence of special characters
     *
     * Each met criterion increases the strength by 1. The maximum strength is 5.
     *
     * @param password The password to be evaluated.
     * @returns A number representing the password strength.
     */
    calculatePasswordStrength(password) {
      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[a-z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[^A-Za-z0-9]/.test(password)) strength++;
      return strength;
    }
    getNestedValue(obj, path) {
      return path.split('.').reduce((acc, key) => {
        return acc && acc[key] !== undefined ? acc[key] : undefined;
      }, obj);
    }
    handleFormReset() {
      this.value = null;
      this.tkChange.emit(null);
    }
    handleMinusButtonClick() {
      if (!this.disabled && (this.min == undefined || Number(this.value) > Number(this.min))) {
        this.value = Number(this.value) - 1;
        this.tkChange.emit(this.value);
      }
    }
    handlePlusButtonClick() {
      if (this.value == '' && this.min != undefined) {
        this.value = this.min;
        this.tkChange.emit(this.min);
      } else if (!this.disabled && (this.max == undefined || Number(this.value) < Number(this.max))) {
        this.value = Number(this.value) + 1;
        this.tkChange.emit(this.value);
      }
    }
    handleChipsRemove(item) {
      const chipsArr = [...this.value];
      if (_.includes(chipsArr, item)) {
        _.pull(chipsArr, item);
        this.value = chipsArr;
        this.tkChange.emit(chipsArr);
      }
    }
    handleClearButtonClick(e) {
      e.stopPropagation();
      this.handleFormReset();
      this.tkClearClick.emit();
    }
    /**
     * Renders the password strength indicator lines.
     *
     * The strength lines visually indicate the password strength:
     * - 1 or 2 filled lines: Weak (red color)
     * - 3 filled lines: Medium (yellow color)
     * - 4 filled lines: Strong (green color)
     *
     * The method creates four lines and assigns a CSS class based on the current password strength.
     *
     * @returns An array of JSX elements representing the strength indicator lines.
     */
    renderStrengthLines() {
      const lines = [];
      for (let i = 0; i < 4; i++) {
        let className = 'line';
        if (i < this.passwordStrength) {
          if (this.passwordStrength < 3) className += ' weak';
          else if (this.passwordStrength < 4) className += ' medium';
          else className += ' strong';
        }
        lines.push(h('span', { class: className }, '\u00A0'));
      }
      return lines;
    }
    renderChips() {
      var _a;
      if (this.mode == 'chips' && typeof this.value == 'object' && ((_a = this.value) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        return this.value.map((item, index) => {
          var _a, _b, _c;
          const itemChipOptions = this.chipOptions || {};
          const baseProps = Object.assign(Object.assign({}, itemChipOptions), {
            removable: true,
            key: index,
            autoSelfDestroy: false,
            value: item,
            variant: (_a = itemChipOptions.variant) !== null && _a !== void 0 ? _a : 'neutral',
            type: (_b = itemChipOptions.type) !== null && _b !== void 0 ? _b : 'outlined',
            size: (_c = itemChipOptions.size) !== null && _c !== void 0 ? _c : 'small',
          });
          const label = typeof item === 'object' ? this.getNestedValue(item, this.chipLabelKey) : String(item);
          return h('tk-chips', Object.assign({ 'label': label, 'onTk-remove': () => this.handleChipsRemove(item) }, baseProps));
        });
      }
    }
    renderInput() {
      return h('input', {
        id: this.uniqueId,
        ref: el => (this.nativeInput = el),
        disabled: this.disabled,
        autoComplete: 'off',
        type: this.inputType,
        name: this.name,
        min: this.min,
        max: this.max,
        step: this.step,
        placeholder: this.placeholder || '',
        readOnly: this.readOnly,
        tabindex: this.tabindex,
        value: this.mode === 'chips' ? undefined : typeof this.value === 'object' && this.value !== null ? this.getNestedValue(this.value, this.chipLabelKey) : this.value,
        onInput: this.handleInput,
        onBlur: this.handleInputBlur,
        onFocus: this.handleInputFocus,
        onKeyDown: this.handleInputKeyDown,
      });
    }
    renderHint() {
      var _a, _b;
      let hint;
      if (((_a = this.hint) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        const hintIcon = h('tk-icon', Object.assign({}, getIconElementProps('info')));
        hint = h('span', { class: 'hint' }, hintIcon, this.hint);
      }
      if (((_b = this.error) === null || _b === void 0 ? void 0 : _b.length) > 0) {
        const hintIcon = h('tk-icon', Object.assign({}, getIconElementProps('info')));
        hint = h('span', { class: 'hint' }, hintIcon, this.error);
      }
      return hint;
    }
    renderLabel() {
      var _a;
      let label;
      if (((_a = this.label) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        const asterisk = h('span', { class: 'asterisk' }, '*');
        label = h('label', { class: 'label' }, this.label, this.showAsterisk ? asterisk : '');
      }
      return label;
    }
    renderAlignmentButtons() {
      let leftButton;
      let rightButton;
      if (this.isCounter) {
        leftButton = h(
          'tk-icon',
          Object.assign(
            {},
            getIconElementProps(
              'remove',
              {
                class: classNames('counter-icon', { disabled: this.disabled || Number(this.value) <= Number(this.min) }),
                onClick: this.handleMinusButtonClick.bind(this),
              },
              undefined,
              'span',
            ),
          ),
        );
        rightButton = h(
          'tk-icon',
          Object.assign(
            {},
            getIconElementProps(
              'add',
              {
                class: classNames('counter-icon', { disabled: this.disabled || Number(this.value) >= Number(this.max) }),
                onClick: this.handlePlusButtonClick.bind(this),
              },
              undefined,
              'span',
            ),
          ),
        );
      }
      return { left: leftButton, right: rightButton };
    }
    renderPasswordIcons() {
      let passwordLeftIcon;
      let passwordRightIcon;
      if (this.inputType == 'password') {
        passwordLeftIcon = h('tk-icon', Object.assign({}, getIconElementProps('lock')));
        passwordRightIcon = h(
          'tk-icon',
          Object.assign(
            {},
            getIconElementProps('visibility', {
              class: 'clickable',
              onMouseDown: this.handleMouseDown,
              onMouseUp: this.handleMouseUp,
            }),
          ),
        );
      }
      return { left: passwordLeftIcon, right: passwordRightIcon };
    }
    render() {
      var _a;
      let _leftIcon;
      let _rightIcon;
      let safetyStatus;
      if (this.showSafetyStatus) {
        safetyStatus = h('div', { key: '6e8d830abba07557bbbd71c8830a74357d87359b', class: 'safety-status' }, this.renderStrengthLines());
      }
      const rootClasses = classNames('tk-input-container', this.size, { focus: this.hasFocus, counter: this.isCounter, chips: this.mode == 'chips' });
      const prefixClass = classNames('tk-input-prefix-container', this.size);
      // Handle icon rendering based on format
      if (this.icon && !this.isCounter) {
        if (this.isMultiIconFormat()) {
          const leftIconConfig = this.icon.left;
          const rightIconConfig = this.icon.right;
          if (leftIconConfig) {
            _leftIcon = h('tk-icon', Object.assign({ key: '8ac6614a432586ac0a6126905de3a5baa01702ac' }, getIconElementProps(leftIconConfig)));
          }
          if (rightIconConfig) {
            _rightIcon = h('tk-icon', Object.assign({ key: '878403cee5a80f952acd5d75b32b95741967a60d' }, getIconElementProps(rightIconConfig)));
          }
        } else {
          if (this.icon) {
            if (this.iconPosition === 'left') {
              _leftIcon = h('tk-icon', Object.assign({ key: '8ddc2d1f0448f92fd24aa272b6b47a7cb948af07' }, getIconElementProps(this.icon)));
            } else {
              _rightIcon = h('tk-icon', Object.assign({ key: 'f9f472fd979334aa40f18b6a7d29086052da3e44' }, getIconElementProps(this.icon)));
            }
          }
        }
      }
      let showClearButton =
        this.clearable && ((this.mode != 'chips' && this.value) || (this.mode == 'chips' && ((_a = this.value) === null || _a === void 0 ? void 0 : _a.length) > 0));
      if (this.el.classList.contains('tk-select-input')) {
        this.readOnly = !this.el.classList.contains('editable-select');
      } else {
        this.readOnly = this.readonly;
      }
      return h(
        'div',
        { 'key': '262e972685a4d1cd7bf88e1962f060fbf80f3e9a', 'aria-readonly': this.readonly, 'aria-disabled': this.disabled, 'aria-invalid': this.invalid, 'class': rootClasses },
        this.renderLabel(),
        h(
          'label',
          { key: 'c86101c3c60ea357626937139551b905533be2d1', class: 'tk-input', htmlFor: this.uniqueId },
          this.renderChips(),
          !_leftIcon && this.renderPasswordIcons().left,
          _leftIcon,
          this.renderAlignmentButtons().left,
          this.pre &&
            h(
              'div',
              { key: '0ceccbb65c25ff9cc881b3d93978c83e6e994057', class: prefixClass },
              h('span', { key: 'f3b970d3ccb438235064d586b1565d0c85a49045', class: 'tk-input-prefix-text' }, this.pre),
              h('span', { key: '912dc9a849f8ab5cdfcc980c9ccef5efd6a240f1', class: 'tk-input-divider' }),
            ),
          this.renderInput(),
          showClearButton &&
            h('tk-button', {
              key: '160aeb09377c8944b7fe95d200656de0d2241531',
              variant: 'neutral',
              type: 'text',
              icon: 'close',
              size: 'small',
              onClick: e => this.handleClearButtonClick(e),
            }),
          _rightIcon,
          !_rightIcon && this.renderPasswordIcons().right,
          this.renderAlignmentButtons().right,
        ),
        safetyStatus,
        this.renderHint(),
      );
    }
    static get formAssociated() {
      return true;
    }
    get el() {
      return this;
    }
    static get watchers() {
      return {
        value: ['valueChanged'],
      };
    }
    static get style() {
      return tkInputCss;
    }
  },
  [
    64,
    'tk-input',
    {
      disabled: [4],
      invalid: [4],
      clearable: [4],
      error: [1],
      hint: [1],
      icon: [1],
      iconPosition: [1, 'icon-position'],
      label: [1],
      pre: [1],
      maskOptions: [16, 'mask-options'],
      max: [8],
      min: [8],
      name: [1],
      placeholder: [1],
      readonly: [4],
      size: [1],
      showSafetyStatus: [4, 'show-safety-status'],
      showAsterisk: [4, 'show-asterisk'],
      chipLabelKey: [1, 'chip-label-key'],
      chipOptions: [16, 'chip-options'],
      mode: [1],
      step: [1],
      value: [1032],
      hasFocus: [32],
      inputType: [32],
      isCounter: [32],
      isPassword: [32],
      passwordStrength: [32],
      setFocus: [64],
    },
    undefined,
    {
      value: ['valueChanged'],
    },
  ],
);
function defineCustomElement() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-input', 'tk-button', 'tk-chips', 'tk-icon', 'tk-spinner'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-input':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkInput);
        }
        break;
      case 'tk-button':
        if (!customElements.get(tagName)) {
          defineCustomElement$4();
        }
        break;
      case 'tk-chips':
        if (!customElements.get(tagName)) {
          defineCustomElement$3();
        }
        break;
      case 'tk-icon':
        if (!customElements.get(tagName)) {
          defineCustomElement$2();
        }
        break;
      case 'tk-spinner':
        if (!customElements.get(tagName)) {
          defineCustomElement$1();
        }
        break;
    }
  });
}

export { TkInput as T, defineCustomElement as d };
//# sourceMappingURL=p-C9ySY_bP.js.map

//# sourceMappingURL=p-C9ySY_bP.js.map
