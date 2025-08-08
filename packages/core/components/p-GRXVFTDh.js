import { a as getDefaultExportFromCjs } from './p-Dr0z5XX9.js';

var classnames = { exports: {} };

/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/

var hasRequiredClassnames;

function requireClassnames() {
  if (hasRequiredClassnames) return classnames.exports;
  hasRequiredClassnames = 1;
  (function (module) {
    /* global define */

    (function () {
      var hasOwn = {}.hasOwnProperty;

      function classNames() {
        var classes = '';

        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
          if (arg) {
            classes = appendClass(classes, parseValue(arg));
          }
        }

        return classes;
      }

      function parseValue(arg) {
        if (typeof arg === 'string' || typeof arg === 'number') {
          return arg;
        }

        if (typeof arg !== 'object') {
          return '';
        }

        if (Array.isArray(arg)) {
          return classNames.apply(null, arg);
        }

        if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
          return arg.toString();
        }

        var classes = '';

        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes = appendClass(classes, key);
          }
        }

        return classes;
      }

      function appendClass(value, newClass) {
        if (!newClass) {
          return value;
        }

        if (value) {
          return value + ' ' + newClass;
        }

        return value + newClass;
      }

      if (module.exports) {
        classNames.default = classNames;
        module.exports = classNames;
      } else {
        window.classNames = classNames;
      }
    })();
  })(classnames);
  return classnames.exports;
}

var classnamesExports = requireClassnames();
var classNames = /*@__PURE__*/ getDefaultExportFromCjs(classnamesExports);

export { classNames as c };
//# sourceMappingURL=p-GRXVFTDh.js.map

//# sourceMappingURL=p-GRXVFTDh.js.map
