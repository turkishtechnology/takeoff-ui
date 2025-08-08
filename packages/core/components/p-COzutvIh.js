import { c as commonjsGlobal, g as getAugmentedNamespace, a as getDefaultExportFromCjs } from './p-Dr0z5XX9.js';
import { r as require_typeof } from './tk-table.js';

function _mergeNamespaces(n, m) {
  m.forEach(function (e) {
    e &&
      typeof e !== 'string' &&
      !Array.isArray(e) &&
      Object.keys(e).forEach(function (k) {
        if (k !== 'default' && !(k in n)) {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(
            n,
            k,
            d.get
              ? d
              : {
                  enumerable: true,
                  get: function () {
                    return e[k];
                  },
                },
          );
        }
      });
  });
  return Object.freeze(n);
}

var lib = {};

var es_object_toString = {};

var globalThis_1;
var hasRequiredGlobalThis;

function requireGlobalThis() {
  if (hasRequiredGlobalThis) return globalThis_1;
  hasRequiredGlobalThis = 1;
  var check = function (it) {
    return it && it.Math === Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  globalThis_1 =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    check(typeof globalThis_1 == 'object' && globalThis_1) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () {
      return this;
    })() ||
    Function('return this')();
  return globalThis_1;
}

var sharedStore = { exports: {} };

var isPure;
var hasRequiredIsPure;

function requireIsPure() {
  if (hasRequiredIsPure) return isPure;
  hasRequiredIsPure = 1;
  isPure = false;
  return isPure;
}

var defineGlobalProperty;
var hasRequiredDefineGlobalProperty;

function requireDefineGlobalProperty() {
  if (hasRequiredDefineGlobalProperty) return defineGlobalProperty;
  hasRequiredDefineGlobalProperty = 1;
  var globalThis = requireGlobalThis();

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty = Object.defineProperty;

  defineGlobalProperty = function (key, value) {
    try {
      defineProperty(globalThis, key, { value: value, configurable: true, writable: true });
    } catch (error) {
      globalThis[key] = value;
    }
    return value;
  };
  return defineGlobalProperty;
}

var hasRequiredSharedStore;

function requireSharedStore() {
  if (hasRequiredSharedStore) return sharedStore.exports;
  hasRequiredSharedStore = 1;
  var IS_PURE = requireIsPure();
  var globalThis = requireGlobalThis();
  var defineGlobalProperty = requireDefineGlobalProperty();

  var SHARED = '__core-js_shared__';
  var store = (sharedStore.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {}));

  (store.versions || (store.versions = [])).push({
    version: '3.44.0',
    mode: IS_PURE ? 'pure' : 'global',
    copyright: '© 2014-2025 Denis Pushkarev (zloirock.ru)',
    license: 'https://github.com/zloirock/core-js/blob/v3.44.0/LICENSE',
    source: 'https://github.com/zloirock/core-js',
  });
  return sharedStore.exports;
}

var shared;
var hasRequiredShared;

function requireShared() {
  if (hasRequiredShared) return shared;
  hasRequiredShared = 1;
  var store = requireSharedStore();

  shared = function (key, value) {
    return store[key] || (store[key] = value || {});
  };
  return shared;
}

var fails;
var hasRequiredFails;

function requireFails() {
  if (hasRequiredFails) return fails;
  hasRequiredFails = 1;
  fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };
  return fails;
}

var functionBindNative;
var hasRequiredFunctionBindNative;

function requireFunctionBindNative() {
  if (hasRequiredFunctionBindNative) return functionBindNative;
  hasRequiredFunctionBindNative = 1;
  var fails = requireFails();

  functionBindNative = !fails(function () {
    // eslint-disable-next-line es/no-function-prototype-bind -- safe
    var test = function () {
      /* empty */
    }.bind();
    // eslint-disable-next-line no-prototype-builtins -- safe
    return typeof test != 'function' || test.hasOwnProperty('prototype');
  });
  return functionBindNative;
}

var functionUncurryThis;
var hasRequiredFunctionUncurryThis;

function requireFunctionUncurryThis() {
  if (hasRequiredFunctionUncurryThis) return functionUncurryThis;
  hasRequiredFunctionUncurryThis = 1;
  var NATIVE_BIND = requireFunctionBindNative();

  var FunctionPrototype = Function.prototype;
  var call = FunctionPrototype.call;
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

  functionUncurryThis = NATIVE_BIND
    ? uncurryThisWithBind
    : function (fn) {
        return function () {
          return call.apply(fn, arguments);
        };
      };
  return functionUncurryThis;
}

var isNullOrUndefined;
var hasRequiredIsNullOrUndefined;

function requireIsNullOrUndefined() {
  if (hasRequiredIsNullOrUndefined) return isNullOrUndefined;
  hasRequiredIsNullOrUndefined = 1;
  // we can't use just `it == null` since of `document.all` special case
  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
  isNullOrUndefined = function (it) {
    return it === null || it === undefined;
  };
  return isNullOrUndefined;
}

var requireObjectCoercible;
var hasRequiredRequireObjectCoercible;

function requireRequireObjectCoercible() {
  if (hasRequiredRequireObjectCoercible) return requireObjectCoercible;
  hasRequiredRequireObjectCoercible = 1;
  var isNullOrUndefined = requireIsNullOrUndefined();

  var $TypeError = TypeError;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  requireObjectCoercible = function (it) {
    if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
    return it;
  };
  return requireObjectCoercible;
}

var toObject;
var hasRequiredToObject;

function requireToObject() {
  if (hasRequiredToObject) return toObject;
  hasRequiredToObject = 1;
  var requireObjectCoercible = requireRequireObjectCoercible();

  var $Object = Object;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  toObject = function (argument) {
    return $Object(requireObjectCoercible(argument));
  };
  return toObject;
}

var hasOwnProperty_1;
var hasRequiredHasOwnProperty;

function requireHasOwnProperty() {
  if (hasRequiredHasOwnProperty) return hasOwnProperty_1;
  hasRequiredHasOwnProperty = 1;
  var uncurryThis = requireFunctionUncurryThis();
  var toObject = requireToObject();

  var hasOwnProperty = uncurryThis({}.hasOwnProperty);

  // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  // eslint-disable-next-line es/no-object-hasown -- safe
  hasOwnProperty_1 =
    Object.hasOwn ||
    function hasOwn(it, key) {
      return hasOwnProperty(toObject(it), key);
    };
  return hasOwnProperty_1;
}

var uid;
var hasRequiredUid;

function requireUid() {
  if (hasRequiredUid) return uid;
  hasRequiredUid = 1;
  var uncurryThis = requireFunctionUncurryThis();

  var id = 0;
  var postfix = Math.random();
  var toString = uncurryThis((1.1).toString);

  uid = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
  };
  return uid;
}

var environmentUserAgent;
var hasRequiredEnvironmentUserAgent;

function requireEnvironmentUserAgent() {
  if (hasRequiredEnvironmentUserAgent) return environmentUserAgent;
  hasRequiredEnvironmentUserAgent = 1;
  var globalThis = requireGlobalThis();

  var navigator = globalThis.navigator;
  var userAgent = navigator && navigator.userAgent;

  environmentUserAgent = userAgent ? String(userAgent) : '';
  return environmentUserAgent;
}

var environmentV8Version;
var hasRequiredEnvironmentV8Version;

function requireEnvironmentV8Version() {
  if (hasRequiredEnvironmentV8Version) return environmentV8Version;
  hasRequiredEnvironmentV8Version = 1;
  var globalThis = requireGlobalThis();
  var userAgent = requireEnvironmentUserAgent();

  var process = globalThis.process;
  var Deno = globalThis.Deno;
  var versions = (process && process.versions) || (Deno && Deno.version);
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  }

  // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
  // so check `userAgent` even if `.v8` exists, but 0
  if (!version && userAgent) {
    match = userAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = userAgent.match(/Chrome\/(\d+)/);
      if (match) version = +match[1];
    }
  }

  environmentV8Version = version;
  return environmentV8Version;
}

var symbolConstructorDetection;
var hasRequiredSymbolConstructorDetection;

function requireSymbolConstructorDetection() {
  if (hasRequiredSymbolConstructorDetection) return symbolConstructorDetection;
  hasRequiredSymbolConstructorDetection = 1;
  /* eslint-disable es/no-symbol -- required for testing */
  var V8_VERSION = requireEnvironmentV8Version();
  var fails = requireFails();
  var globalThis = requireGlobalThis();

  var $String = globalThis.String;

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  symbolConstructorDetection =
    !!Object.getOwnPropertySymbols &&
    !fails(function () {
      var symbol = Symbol('symbol detection');
      // Chrome 38 Symbol has incorrect toString conversion
      // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
      // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
      // of course, fail.
      return (
        !$String(symbol) ||
        !(Object(symbol) instanceof Symbol) ||
        // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
        (!Symbol.sham && V8_VERSION && V8_VERSION < 41)
      );
    });
  return symbolConstructorDetection;
}

var useSymbolAsUid;
var hasRequiredUseSymbolAsUid;

function requireUseSymbolAsUid() {
  if (hasRequiredUseSymbolAsUid) return useSymbolAsUid;
  hasRequiredUseSymbolAsUid = 1;
  /* eslint-disable es/no-symbol -- required for testing */
  var NATIVE_SYMBOL = requireSymbolConstructorDetection();

  useSymbolAsUid = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == 'symbol';
  return useSymbolAsUid;
}

var wellKnownSymbol;
var hasRequiredWellKnownSymbol;

function requireWellKnownSymbol() {
  if (hasRequiredWellKnownSymbol) return wellKnownSymbol;
  hasRequiredWellKnownSymbol = 1;
  var globalThis = requireGlobalThis();
  var shared = requireShared();
  var hasOwn = requireHasOwnProperty();
  var uid = requireUid();
  var NATIVE_SYMBOL = requireSymbolConstructorDetection();
  var USE_SYMBOL_AS_UID = requireUseSymbolAsUid();

  var Symbol = globalThis.Symbol;
  var WellKnownSymbolsStore = shared('wks');
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : (Symbol && Symbol.withoutSetter) || uid;

  wellKnownSymbol = function (name) {
    if (!hasOwn(WellKnownSymbolsStore, name)) {
      WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name) ? Symbol[name] : createWellKnownSymbol('Symbol.' + name);
    }
    return WellKnownSymbolsStore[name];
  };
  return wellKnownSymbol;
}

var toStringTagSupport;
var hasRequiredToStringTagSupport;

function requireToStringTagSupport() {
  if (hasRequiredToStringTagSupport) return toStringTagSupport;
  hasRequiredToStringTagSupport = 1;
  var wellKnownSymbol = requireWellKnownSymbol();

  var TO_STRING_TAG = wellKnownSymbol('toStringTag');
  var test = {};

  test[TO_STRING_TAG] = 'z';

  toStringTagSupport = String(test) === '[object z]';
  return toStringTagSupport;
}

var isCallable;
var hasRequiredIsCallable;

function requireIsCallable() {
  if (hasRequiredIsCallable) return isCallable;
  hasRequiredIsCallable = 1;
  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
  var documentAll = typeof document == 'object' && document.all;

  // `IsCallable` abstract operation
  // https://tc39.es/ecma262/#sec-iscallable
  // eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
  isCallable =
    typeof documentAll == 'undefined' && documentAll !== undefined
      ? function (argument) {
          return typeof argument == 'function' || argument === documentAll;
        }
      : function (argument) {
          return typeof argument == 'function';
        };
  return isCallable;
}

var objectDefineProperty = {};

var descriptors;
var hasRequiredDescriptors;

function requireDescriptors() {
  if (hasRequiredDescriptors) return descriptors;
  hasRequiredDescriptors = 1;
  var fails = requireFails();

  // Detect IE8's incomplete defineProperty implementation
  descriptors = !fails(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return (
      Object.defineProperty({}, 1, {
        get: function () {
          return 7;
        },
      })[1] !== 7
    );
  });
  return descriptors;
}

var isObject;
var hasRequiredIsObject;

function requireIsObject() {
  if (hasRequiredIsObject) return isObject;
  hasRequiredIsObject = 1;
  var isCallable = requireIsCallable();

  isObject = function (it) {
    return typeof it == 'object' ? it !== null : isCallable(it);
  };
  return isObject;
}

var documentCreateElement;
var hasRequiredDocumentCreateElement;

function requireDocumentCreateElement() {
  if (hasRequiredDocumentCreateElement) return documentCreateElement;
  hasRequiredDocumentCreateElement = 1;
  var globalThis = requireGlobalThis();
  var isObject = requireIsObject();

  var document = globalThis.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject(document) && isObject(document.createElement);

  documentCreateElement = function (it) {
    return EXISTS ? document.createElement(it) : {};
  };
  return documentCreateElement;
}

var ie8DomDefine;
var hasRequiredIe8DomDefine;

function requireIe8DomDefine() {
  if (hasRequiredIe8DomDefine) return ie8DomDefine;
  hasRequiredIe8DomDefine = 1;
  var DESCRIPTORS = requireDescriptors();
  var fails = requireFails();
  var createElement = requireDocumentCreateElement();

  // Thanks to IE8 for its funny defineProperty
  ie8DomDefine =
    !DESCRIPTORS &&
    !fails(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- required for testing
      return (
        Object.defineProperty(createElement('div'), 'a', {
          get: function () {
            return 7;
          },
        }).a !== 7
      );
    });
  return ie8DomDefine;
}

var v8PrototypeDefineBug;
var hasRequiredV8PrototypeDefineBug;

function requireV8PrototypeDefineBug() {
  if (hasRequiredV8PrototypeDefineBug) return v8PrototypeDefineBug;
  hasRequiredV8PrototypeDefineBug = 1;
  var DESCRIPTORS = requireDescriptors();
  var fails = requireFails();

  // V8 ~ Chrome 36-
  // https://bugs.chromium.org/p/v8/issues/detail?id=3334
  v8PrototypeDefineBug =
    DESCRIPTORS &&
    fails(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- required for testing
      return (
        Object.defineProperty(
          function () {
            /* empty */
          },
          'prototype',
          {
            value: 42,
            writable: false,
          },
        ).prototype !== 42
      );
    });
  return v8PrototypeDefineBug;
}

var anObject;
var hasRequiredAnObject;

function requireAnObject() {
  if (hasRequiredAnObject) return anObject;
  hasRequiredAnObject = 1;
  var isObject = requireIsObject();

  var $String = String;
  var $TypeError = TypeError;

  // `Assert: Type(argument) is Object`
  anObject = function (argument) {
    if (isObject(argument)) return argument;
    throw new $TypeError($String(argument) + ' is not an object');
  };
  return anObject;
}

var functionCall;
var hasRequiredFunctionCall;

function requireFunctionCall() {
  if (hasRequiredFunctionCall) return functionCall;
  hasRequiredFunctionCall = 1;
  var NATIVE_BIND = requireFunctionBindNative();

  var call = Function.prototype.call;
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  functionCall = NATIVE_BIND
    ? call.bind(call)
    : function () {
        return call.apply(call, arguments);
      };
  return functionCall;
}

var getBuiltIn;
var hasRequiredGetBuiltIn;

function requireGetBuiltIn() {
  if (hasRequiredGetBuiltIn) return getBuiltIn;
  hasRequiredGetBuiltIn = 1;
  var globalThis = requireGlobalThis();
  var isCallable = requireIsCallable();

  var aFunction = function (argument) {
    return isCallable(argument) ? argument : undefined;
  };

  getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(globalThis[namespace]) : globalThis[namespace] && globalThis[namespace][method];
  };
  return getBuiltIn;
}

var objectIsPrototypeOf;
var hasRequiredObjectIsPrototypeOf;

function requireObjectIsPrototypeOf() {
  if (hasRequiredObjectIsPrototypeOf) return objectIsPrototypeOf;
  hasRequiredObjectIsPrototypeOf = 1;
  var uncurryThis = requireFunctionUncurryThis();

  objectIsPrototypeOf = uncurryThis({}.isPrototypeOf);
  return objectIsPrototypeOf;
}

var isSymbol;
var hasRequiredIsSymbol;

function requireIsSymbol() {
  if (hasRequiredIsSymbol) return isSymbol;
  hasRequiredIsSymbol = 1;
  var getBuiltIn = requireGetBuiltIn();
  var isCallable = requireIsCallable();
  var isPrototypeOf = requireObjectIsPrototypeOf();
  var USE_SYMBOL_AS_UID = requireUseSymbolAsUid();

  var $Object = Object;

  isSymbol = USE_SYMBOL_AS_UID
    ? function (it) {
        return typeof it == 'symbol';
      }
    : function (it) {
        var $Symbol = getBuiltIn('Symbol');
        return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
      };
  return isSymbol;
}

var tryToString;
var hasRequiredTryToString;

function requireTryToString() {
  if (hasRequiredTryToString) return tryToString;
  hasRequiredTryToString = 1;
  var $String = String;

  tryToString = function (argument) {
    try {
      return $String(argument);
    } catch (error) {
      return 'Object';
    }
  };
  return tryToString;
}

var aCallable;
var hasRequiredACallable;

function requireACallable() {
  if (hasRequiredACallable) return aCallable;
  hasRequiredACallable = 1;
  var isCallable = requireIsCallable();
  var tryToString = requireTryToString();

  var $TypeError = TypeError;

  // `Assert: IsCallable(argument) is true`
  aCallable = function (argument) {
    if (isCallable(argument)) return argument;
    throw new $TypeError(tryToString(argument) + ' is not a function');
  };
  return aCallable;
}

var getMethod;
var hasRequiredGetMethod;

function requireGetMethod() {
  if (hasRequiredGetMethod) return getMethod;
  hasRequiredGetMethod = 1;
  var aCallable = requireACallable();
  var isNullOrUndefined = requireIsNullOrUndefined();

  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  getMethod = function (V, P) {
    var func = V[P];
    return isNullOrUndefined(func) ? undefined : aCallable(func);
  };
  return getMethod;
}

var ordinaryToPrimitive;
var hasRequiredOrdinaryToPrimitive;

function requireOrdinaryToPrimitive() {
  if (hasRequiredOrdinaryToPrimitive) return ordinaryToPrimitive;
  hasRequiredOrdinaryToPrimitive = 1;
  var call = requireFunctionCall();
  var isCallable = requireIsCallable();
  var isObject = requireIsObject();

  var $TypeError = TypeError;

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  ordinaryToPrimitive = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable((fn = input.toString)) && !isObject((val = call(fn, input)))) return val;
    if (isCallable((fn = input.valueOf)) && !isObject((val = call(fn, input)))) return val;
    if (pref !== 'string' && isCallable((fn = input.toString)) && !isObject((val = call(fn, input)))) return val;
    throw new $TypeError("Can't convert object to primitive value");
  };
  return ordinaryToPrimitive;
}

var toPrimitive$1;
var hasRequiredToPrimitive$1;

function requireToPrimitive$1() {
  if (hasRequiredToPrimitive$1) return toPrimitive$1;
  hasRequiredToPrimitive$1 = 1;
  var call = requireFunctionCall();
  var isObject = requireIsObject();
  var isSymbol = requireIsSymbol();
  var getMethod = requireGetMethod();
  var ordinaryToPrimitive = requireOrdinaryToPrimitive();
  var wellKnownSymbol = requireWellKnownSymbol();

  var $TypeError = TypeError;
  var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  toPrimitive$1 = function (input, pref) {
    if (!isObject(input) || isSymbol(input)) return input;
    var exoticToPrim = getMethod(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = call(exoticToPrim, input, pref);
      if (!isObject(result) || isSymbol(result)) return result;
      throw new $TypeError("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };
  return toPrimitive$1;
}

var toPropertyKey$1;
var hasRequiredToPropertyKey$1;

function requireToPropertyKey$1() {
  if (hasRequiredToPropertyKey$1) return toPropertyKey$1;
  hasRequiredToPropertyKey$1 = 1;
  var toPrimitive = requireToPrimitive$1();
  var isSymbol = requireIsSymbol();

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  toPropertyKey$1 = function (argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol(key) ? key : key + '';
  };
  return toPropertyKey$1;
}

var hasRequiredObjectDefineProperty;

function requireObjectDefineProperty() {
  if (hasRequiredObjectDefineProperty) return objectDefineProperty;
  hasRequiredObjectDefineProperty = 1;
  var DESCRIPTORS = requireDescriptors();
  var IE8_DOM_DEFINE = requireIe8DomDefine();
  var V8_PROTOTYPE_DEFINE_BUG = requireV8PrototypeDefineBug();
  var anObject = requireAnObject();
  var toPropertyKey = requireToPropertyKey$1();

  var $TypeError = TypeError;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var ENUMERABLE = 'enumerable';
  var CONFIGURABLE = 'configurable';
  var WRITABLE = 'writable';

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty.f = DESCRIPTORS
    ? V8_PROTOTYPE_DEFINE_BUG
      ? function defineProperty(O, P, Attributes) {
          anObject(O);
          P = toPropertyKey(P);
          anObject(Attributes);
          if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
            var current = $getOwnPropertyDescriptor(O, P);
            if (current && current[WRITABLE]) {
              O[P] = Attributes.value;
              Attributes = {
                configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
                enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
                writable: false,
              };
            }
          }
          return $defineProperty(O, P, Attributes);
        }
      : $defineProperty
    : function defineProperty(O, P, Attributes) {
        anObject(O);
        P = toPropertyKey(P);
        anObject(Attributes);
        if (IE8_DOM_DEFINE)
          try {
            return $defineProperty(O, P, Attributes);
          } catch (error) {
            /* empty */
          }
        if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
        if ('value' in Attributes) O[P] = Attributes.value;
        return O;
      };
  return objectDefineProperty;
}

var makeBuiltIn = { exports: {} };

var functionName;
var hasRequiredFunctionName;

function requireFunctionName() {
  if (hasRequiredFunctionName) return functionName;
  hasRequiredFunctionName = 1;
  var DESCRIPTORS = requireDescriptors();
  var hasOwn = requireHasOwnProperty();

  var FunctionPrototype = Function.prototype;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

  var EXISTS = hasOwn(FunctionPrototype, 'name');
  // additional protection from minified / mangled / dropped function names
  var PROPER =
    EXISTS &&
    function something() {
      /* empty */
    }.name === 'something';
  var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

  functionName = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE,
  };
  return functionName;
}

var inspectSource;
var hasRequiredInspectSource;

function requireInspectSource() {
  if (hasRequiredInspectSource) return inspectSource;
  hasRequiredInspectSource = 1;
  var uncurryThis = requireFunctionUncurryThis();
  var isCallable = requireIsCallable();
  var store = requireSharedStore();

  var functionToString = uncurryThis(Function.toString);

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable(store.inspectSource)) {
    store.inspectSource = function (it) {
      return functionToString(it);
    };
  }

  inspectSource = store.inspectSource;
  return inspectSource;
}

var weakMapBasicDetection;
var hasRequiredWeakMapBasicDetection;

function requireWeakMapBasicDetection() {
  if (hasRequiredWeakMapBasicDetection) return weakMapBasicDetection;
  hasRequiredWeakMapBasicDetection = 1;
  var globalThis = requireGlobalThis();
  var isCallable = requireIsCallable();

  var WeakMap = globalThis.WeakMap;

  weakMapBasicDetection = isCallable(WeakMap) && /native code/.test(String(WeakMap));
  return weakMapBasicDetection;
}

var createPropertyDescriptor;
var hasRequiredCreatePropertyDescriptor;

function requireCreatePropertyDescriptor() {
  if (hasRequiredCreatePropertyDescriptor) return createPropertyDescriptor;
  hasRequiredCreatePropertyDescriptor = 1;
  createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value,
    };
  };
  return createPropertyDescriptor;
}

var createNonEnumerableProperty;
var hasRequiredCreateNonEnumerableProperty;

function requireCreateNonEnumerableProperty() {
  if (hasRequiredCreateNonEnumerableProperty) return createNonEnumerableProperty;
  hasRequiredCreateNonEnumerableProperty = 1;
  var DESCRIPTORS = requireDescriptors();
  var definePropertyModule = requireObjectDefineProperty();
  var createPropertyDescriptor = requireCreatePropertyDescriptor();

  createNonEnumerableProperty = DESCRIPTORS
    ? function (object, key, value) {
        return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
      }
    : function (object, key, value) {
        object[key] = value;
        return object;
      };
  return createNonEnumerableProperty;
}

var sharedKey;
var hasRequiredSharedKey;

function requireSharedKey() {
  if (hasRequiredSharedKey) return sharedKey;
  hasRequiredSharedKey = 1;
  var shared = requireShared();
  var uid = requireUid();

  var keys = shared('keys');

  sharedKey = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };
  return sharedKey;
}

var hiddenKeys;
var hasRequiredHiddenKeys;

function requireHiddenKeys() {
  if (hasRequiredHiddenKeys) return hiddenKeys;
  hasRequiredHiddenKeys = 1;
  hiddenKeys = {};
  return hiddenKeys;
}

var internalState;
var hasRequiredInternalState;

function requireInternalState() {
  if (hasRequiredInternalState) return internalState;
  hasRequiredInternalState = 1;
  var NATIVE_WEAK_MAP = requireWeakMapBasicDetection();
  var globalThis = requireGlobalThis();
  var isObject = requireIsObject();
  var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
  var hasOwn = requireHasOwnProperty();
  var shared = requireSharedStore();
  var sharedKey = requireSharedKey();
  var hiddenKeys = requireHiddenKeys();

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var TypeError = globalThis.TypeError;
  var WeakMap = globalThis.WeakMap;
  var set, get, has;

  var enforce = function (it) {
    return has(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
      }
      return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared.state) {
    var store = shared.state || (shared.state = new WeakMap());
    /* eslint-disable no-self-assign -- prototype methods protection */
    store.get = store.get;
    store.has = store.has;
    store.set = store.set;
    /* eslint-enable no-self-assign -- prototype methods protection */
    set = function (it, metadata) {
      if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      store.set(it, metadata);
      return metadata;
    };
    get = function (it) {
      return store.get(it) || {};
    };
    has = function (it) {
      return store.has(it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;
    set = function (it, metadata) {
      if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return hasOwn(it, STATE) ? it[STATE] : {};
    };
    has = function (it) {
      return hasOwn(it, STATE);
    };
  }

  internalState = {
    set: set,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor,
  };
  return internalState;
}

var hasRequiredMakeBuiltIn;

function requireMakeBuiltIn() {
  if (hasRequiredMakeBuiltIn) return makeBuiltIn.exports;
  hasRequiredMakeBuiltIn = 1;
  var uncurryThis = requireFunctionUncurryThis();
  var fails = requireFails();
  var isCallable = requireIsCallable();
  var hasOwn = requireHasOwnProperty();
  var DESCRIPTORS = requireDescriptors();
  var CONFIGURABLE_FUNCTION_NAME = requireFunctionName().CONFIGURABLE;
  var inspectSource = requireInspectSource();
  var InternalStateModule = requireInternalState();

  var enforceInternalState = InternalStateModule.enforce;
  var getInternalState = InternalStateModule.get;
  var $String = String;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty = Object.defineProperty;
  var stringSlice = uncurryThis(''.slice);
  var replace = uncurryThis(''.replace);
  var join = uncurryThis([].join);

  var CONFIGURABLE_LENGTH =
    DESCRIPTORS &&
    !fails(function () {
      return (
        defineProperty(
          function () {
            /* empty */
          },
          'length',
          { value: 8 },
        ).length !== 8
      );
    });

  var TEMPLATE = String(String).split('String');

  var makeBuiltIn$1 = (makeBuiltIn.exports = function (value, name, options) {
    if (stringSlice($String(name), 0, 7) === 'Symbol(') {
      name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
    }
    if (options && options.getter) name = 'get ' + name;
    if (options && options.setter) name = 'set ' + name;
    if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
      if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
      else value.name = name;
    }
    if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
      defineProperty(value, 'length', { value: options.arity });
    }
    try {
      if (options && hasOwn(options, 'constructor') && options.constructor) {
        if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
        // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
      } else if (value.prototype) value.prototype = undefined;
    } catch (error) {
      /* empty */
    }
    var state = enforceInternalState(value);
    if (!hasOwn(state, 'source')) {
      state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
    }
    return value;
  });

  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  // eslint-disable-next-line no-extend-native -- required
  Function.prototype.toString = makeBuiltIn$1(function toString() {
    return (isCallable(this) && getInternalState(this).source) || inspectSource(this);
  }, 'toString');
  return makeBuiltIn.exports;
}

var defineBuiltIn;
var hasRequiredDefineBuiltIn;

function requireDefineBuiltIn() {
  if (hasRequiredDefineBuiltIn) return defineBuiltIn;
  hasRequiredDefineBuiltIn = 1;
  var isCallable = requireIsCallable();
  var definePropertyModule = requireObjectDefineProperty();
  var makeBuiltIn = requireMakeBuiltIn();
  var defineGlobalProperty = requireDefineGlobalProperty();

  defineBuiltIn = function (O, key, value, options) {
    if (!options) options = {};
    var simple = options.enumerable;
    var name = options.name !== undefined ? options.name : key;
    if (isCallable(value)) makeBuiltIn(value, name, options);
    if (options.global) {
      if (simple) O[key] = value;
      else defineGlobalProperty(key, value);
    } else {
      try {
        if (!options.unsafe) delete O[key];
        else if (O[key]) simple = true;
      } catch (error) {
        /* empty */
      }
      if (simple) O[key] = value;
      else
        definePropertyModule.f(O, key, {
          value: value,
          enumerable: false,
          configurable: !options.nonConfigurable,
          writable: !options.nonWritable,
        });
    }
    return O;
  };
  return defineBuiltIn;
}

var classofRaw;
var hasRequiredClassofRaw;

function requireClassofRaw() {
  if (hasRequiredClassofRaw) return classofRaw;
  hasRequiredClassofRaw = 1;
  var uncurryThis = requireFunctionUncurryThis();

  var toString = uncurryThis({}.toString);
  var stringSlice = uncurryThis(''.slice);

  classofRaw = function (it) {
    return stringSlice(toString(it), 8, -1);
  };
  return classofRaw;
}

var classof;
var hasRequiredClassof;

function requireClassof() {
  if (hasRequiredClassof) return classof;
  hasRequiredClassof = 1;
  var TO_STRING_TAG_SUPPORT = requireToStringTagSupport();
  var isCallable = requireIsCallable();
  var classofRaw = requireClassofRaw();
  var wellKnownSymbol = requireWellKnownSymbol();

  var TO_STRING_TAG = wellKnownSymbol('toStringTag');
  var $Object = Object;

  // ES3 wrong here
  var CORRECT_ARGUMENTS =
    classofRaw(
      (function () {
        return arguments;
      })(),
    ) === 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) {
      /* empty */
    }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  classof = TO_STRING_TAG_SUPPORT
    ? classofRaw
    : function (it) {
        var O, tag, result;
        return it === undefined
          ? 'Undefined'
          : it === null
            ? 'Null'
            : // @@toStringTag case
              typeof (tag = tryGet((O = $Object(it)), TO_STRING_TAG)) == 'string'
              ? tag
              : // builtinTag case
                CORRECT_ARGUMENTS
                ? classofRaw(O)
                : // ES3 arguments fallback
                  (result = classofRaw(O)) === 'Object' && isCallable(O.callee)
                  ? 'Arguments'
                  : result;
      };
  return classof;
}

var objectToString;
var hasRequiredObjectToString;

function requireObjectToString() {
  if (hasRequiredObjectToString) return objectToString;
  hasRequiredObjectToString = 1;
  var TO_STRING_TAG_SUPPORT = requireToStringTagSupport();
  var classof = requireClassof();

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  objectToString = TO_STRING_TAG_SUPPORT
    ? {}.toString
    : function toString() {
        return '[object ' + classof(this) + ']';
      };
  return objectToString;
}

var hasRequiredEs_object_toString;

function requireEs_object_toString() {
  if (hasRequiredEs_object_toString) return es_object_toString;
  hasRequiredEs_object_toString = 1;
  var TO_STRING_TAG_SUPPORT = requireToStringTagSupport();
  var defineBuiltIn = requireDefineBuiltIn();
  var toString = requireObjectToString();

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!TO_STRING_TAG_SUPPORT) {
    defineBuiltIn(Object.prototype, 'toString', toString, { unsafe: true });
  }
  return es_object_toString;
}

var es_promise = {};

var es_promise_constructor = {};

var objectGetOwnPropertyDescriptor = {};

var objectPropertyIsEnumerable = {};

var hasRequiredObjectPropertyIsEnumerable;

function requireObjectPropertyIsEnumerable() {
  if (hasRequiredObjectPropertyIsEnumerable) return objectPropertyIsEnumerable;
  hasRequiredObjectPropertyIsEnumerable = 1;
  var $propertyIsEnumerable = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  objectPropertyIsEnumerable.f = NASHORN_BUG
    ? function propertyIsEnumerable(V) {
        var descriptor = getOwnPropertyDescriptor(this, V);
        return !!descriptor && descriptor.enumerable;
      }
    : $propertyIsEnumerable;
  return objectPropertyIsEnumerable;
}

var indexedObject;
var hasRequiredIndexedObject;

function requireIndexedObject() {
  if (hasRequiredIndexedObject) return indexedObject;
  hasRequiredIndexedObject = 1;
  var uncurryThis = requireFunctionUncurryThis();
  var fails = requireFails();
  var classof = requireClassofRaw();

  var $Object = Object;
  var split = uncurryThis(''.split);

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !$Object('z').propertyIsEnumerable(0);
  })
    ? function (it) {
        return classof(it) === 'String' ? split(it, '') : $Object(it);
      }
    : $Object;
  return indexedObject;
}

var toIndexedObject;
var hasRequiredToIndexedObject;

function requireToIndexedObject() {
  if (hasRequiredToIndexedObject) return toIndexedObject;
  hasRequiredToIndexedObject = 1;
  // toObject with fallback for non-array-like ES3 strings
  var IndexedObject = requireIndexedObject();
  var requireObjectCoercible = requireRequireObjectCoercible();

  toIndexedObject = function (it) {
    return IndexedObject(requireObjectCoercible(it));
  };
  return toIndexedObject;
}

var hasRequiredObjectGetOwnPropertyDescriptor;

function requireObjectGetOwnPropertyDescriptor() {
  if (hasRequiredObjectGetOwnPropertyDescriptor) return objectGetOwnPropertyDescriptor;
  hasRequiredObjectGetOwnPropertyDescriptor = 1;
  var DESCRIPTORS = requireDescriptors();
  var call = requireFunctionCall();
  var propertyIsEnumerableModule = requireObjectPropertyIsEnumerable();
  var createPropertyDescriptor = requireCreatePropertyDescriptor();
  var toIndexedObject = requireToIndexedObject();
  var toPropertyKey = requireToPropertyKey$1();
  var hasOwn = requireHasOwnProperty();
  var IE8_DOM_DEFINE = requireIe8DomDefine();

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS
    ? $getOwnPropertyDescriptor
    : function getOwnPropertyDescriptor(O, P) {
        O = toIndexedObject(O);
        P = toPropertyKey(P);
        if (IE8_DOM_DEFINE)
          try {
            return $getOwnPropertyDescriptor(O, P);
          } catch (error) {
            /* empty */
          }
        if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
      };
  return objectGetOwnPropertyDescriptor;
}

var objectGetOwnPropertyNames = {};

var mathTrunc;
var hasRequiredMathTrunc;

function requireMathTrunc() {
  if (hasRequiredMathTrunc) return mathTrunc;
  hasRequiredMathTrunc = 1;
  var ceil = Math.ceil;
  var floor = Math.floor;

  // `Math.trunc` method
  // https://tc39.es/ecma262/#sec-math.trunc
  // eslint-disable-next-line es/no-math-trunc -- safe
  mathTrunc =
    Math.trunc ||
    function trunc(x) {
      var n = +x;
      return (n > 0 ? floor : ceil)(n);
    };
  return mathTrunc;
}

var toIntegerOrInfinity;
var hasRequiredToIntegerOrInfinity;

function requireToIntegerOrInfinity() {
  if (hasRequiredToIntegerOrInfinity) return toIntegerOrInfinity;
  hasRequiredToIntegerOrInfinity = 1;
  var trunc = requireMathTrunc();

  // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity
  toIntegerOrInfinity = function (argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- NaN check
    return number !== number || number === 0 ? 0 : trunc(number);
  };
  return toIntegerOrInfinity;
}

var toAbsoluteIndex;
var hasRequiredToAbsoluteIndex;

function requireToAbsoluteIndex() {
  if (hasRequiredToAbsoluteIndex) return toAbsoluteIndex;
  hasRequiredToAbsoluteIndex = 1;
  var toIntegerOrInfinity = requireToIntegerOrInfinity();

  var max = Math.max;
  var min = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  toAbsoluteIndex = function (index, length) {
    var integer = toIntegerOrInfinity(index);
    return integer < 0 ? max(integer + length, 0) : min(integer, length);
  };
  return toAbsoluteIndex;
}

var toLength;
var hasRequiredToLength;

function requireToLength() {
  if (hasRequiredToLength) return toLength;
  hasRequiredToLength = 1;
  var toIntegerOrInfinity = requireToIntegerOrInfinity();

  var min = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  toLength = function (argument) {
    var len = toIntegerOrInfinity(argument);
    return len > 0 ? min(len, 0x1fffffffffffff) : 0; // 2 ** 53 - 1 == 9007199254740991
  };
  return toLength;
}

var lengthOfArrayLike;
var hasRequiredLengthOfArrayLike;

function requireLengthOfArrayLike() {
  if (hasRequiredLengthOfArrayLike) return lengthOfArrayLike;
  hasRequiredLengthOfArrayLike = 1;
  var toLength = requireToLength();

  // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike
  lengthOfArrayLike = function (obj) {
    return toLength(obj.length);
  };
  return lengthOfArrayLike;
}

var arrayIncludes;
var hasRequiredArrayIncludes;

function requireArrayIncludes() {
  if (hasRequiredArrayIncludes) return arrayIncludes;
  hasRequiredArrayIncludes = 1;
  var toIndexedObject = requireToIndexedObject();
  var toAbsoluteIndex = requireToAbsoluteIndex();
  var lengthOfArrayLike = requireLengthOfArrayLike();

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = lengthOfArrayLike(O);
      if (length === 0) return !IS_INCLUDES && -1;
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el !== el)
        while (length > index) {
          value = O[index++];
          // eslint-disable-next-line no-self-compare -- NaN check
          if (value !== value) return true;
          // Array#indexOf ignores holes, Array#includes - not
        }
      else
        for (; length > index; index++) {
          if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
        }
      return !IS_INCLUDES && -1;
    };
  };

  arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false),
  };
  return arrayIncludes;
}

var objectKeysInternal;
var hasRequiredObjectKeysInternal;

function requireObjectKeysInternal() {
  if (hasRequiredObjectKeysInternal) return objectKeysInternal;
  hasRequiredObjectKeysInternal = 1;
  var uncurryThis = requireFunctionUncurryThis();
  var hasOwn = requireHasOwnProperty();
  var toIndexedObject = requireToIndexedObject();
  var indexOf = requireArrayIncludes().indexOf;
  var hiddenKeys = requireHiddenKeys();

  var push = uncurryThis([].push);

  objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
    // Don't enum bug & hidden keys
    while (names.length > i)
      if (hasOwn(O, (key = names[i++]))) {
        ~indexOf(result, key) || push(result, key);
      }
    return result;
  };
  return objectKeysInternal;
}

var enumBugKeys;
var hasRequiredEnumBugKeys;

function requireEnumBugKeys() {
  if (hasRequiredEnumBugKeys) return enumBugKeys;
  hasRequiredEnumBugKeys = 1;
  // IE8- don't enum bug keys
  enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];
  return enumBugKeys;
}

var hasRequiredObjectGetOwnPropertyNames;

function requireObjectGetOwnPropertyNames() {
  if (hasRequiredObjectGetOwnPropertyNames) return objectGetOwnPropertyNames;
  hasRequiredObjectGetOwnPropertyNames = 1;
  var internalObjectKeys = requireObjectKeysInternal();
  var enumBugKeys = requireEnumBugKeys();

  var hiddenKeys = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  objectGetOwnPropertyNames.f =
    Object.getOwnPropertyNames ||
    function getOwnPropertyNames(O) {
      return internalObjectKeys(O, hiddenKeys);
    };
  return objectGetOwnPropertyNames;
}

var objectGetOwnPropertySymbols = {};

var hasRequiredObjectGetOwnPropertySymbols;

function requireObjectGetOwnPropertySymbols() {
  if (hasRequiredObjectGetOwnPropertySymbols) return objectGetOwnPropertySymbols;
  hasRequiredObjectGetOwnPropertySymbols = 1;
  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;
  return objectGetOwnPropertySymbols;
}

var ownKeys;
var hasRequiredOwnKeys;

function requireOwnKeys() {
  if (hasRequiredOwnKeys) return ownKeys;
  hasRequiredOwnKeys = 1;
  var getBuiltIn = requireGetBuiltIn();
  var uncurryThis = requireFunctionUncurryThis();
  var getOwnPropertyNamesModule = requireObjectGetOwnPropertyNames();
  var getOwnPropertySymbolsModule = requireObjectGetOwnPropertySymbols();
  var anObject = requireAnObject();

  var concat = uncurryThis([].concat);

  // all object keys, includes non-enumerable and symbols
  ownKeys =
    getBuiltIn('Reflect', 'ownKeys') ||
    function ownKeys(it) {
      var keys = getOwnPropertyNamesModule.f(anObject(it));
      var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
      return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
    };
  return ownKeys;
}

var copyConstructorProperties;
var hasRequiredCopyConstructorProperties;

function requireCopyConstructorProperties() {
  if (hasRequiredCopyConstructorProperties) return copyConstructorProperties;
  hasRequiredCopyConstructorProperties = 1;
  var hasOwn = requireHasOwnProperty();
  var ownKeys = requireOwnKeys();
  var getOwnPropertyDescriptorModule = requireObjectGetOwnPropertyDescriptor();
  var definePropertyModule = requireObjectDefineProperty();

  copyConstructorProperties = function (target, source, exceptions) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    }
  };
  return copyConstructorProperties;
}

var isForced_1;
var hasRequiredIsForced;

function requireIsForced() {
  if (hasRequiredIsForced) return isForced_1;
  hasRequiredIsForced = 1;
  var fails = requireFails();
  var isCallable = requireIsCallable();

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value === POLYFILL ? true : value === NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
  };

  var normalize = (isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  });

  var data = (isForced.data = {});
  var NATIVE = (isForced.NATIVE = 'N');
  var POLYFILL = (isForced.POLYFILL = 'P');

  isForced_1 = isForced;
  return isForced_1;
}

var _export;
var hasRequired_export;

function require_export() {
  if (hasRequired_export) return _export;
  hasRequired_export = 1;
  var globalThis = requireGlobalThis();
  var getOwnPropertyDescriptor = requireObjectGetOwnPropertyDescriptor().f;
  var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
  var defineBuiltIn = requireDefineBuiltIn();
  var defineGlobalProperty = requireDefineGlobalProperty();
  var copyConstructorProperties = requireCopyConstructorProperties();
  var isForced = requireIsForced();

  /*
	  options.target         - name of the target object
	  options.global         - target is the global object
	  options.stat           - export as static methods of target
	  options.proto          - export as prototype methods of target
	  options.real           - real prototype method for the `pure` version
	  options.forced         - export even if the native feature is available
	  options.bind           - bind methods to the target, required for the `pure` version
	  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
	  options.sham           - add a flag to not completely full polyfills
	  options.enumerable     - export as enumerable property
	  options.dontCallGetSet - prevent calling a getter on target
	  options.name           - the .name of the function if it does not match the key
	*/
  _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = globalThis;
    } else if (STATIC) {
      target = globalThis[TARGET] || defineGlobalProperty(TARGET, {});
    } else {
      target = globalThis[TARGET] && globalThis[TARGET].prototype;
    }
    if (target)
      for (key in source) {
        sourceProperty = source[key];
        if (options.dontCallGetSet) {
          descriptor = getOwnPropertyDescriptor(target, key);
          targetProperty = descriptor && descriptor.value;
        } else targetProperty = target[key];
        FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
        // contained in target
        if (!FORCED && targetProperty !== undefined) {
          if (typeof sourceProperty == typeof targetProperty) continue;
          copyConstructorProperties(sourceProperty, targetProperty);
        }
        // add a flag to not completely full polyfills
        if (options.sham || (targetProperty && targetProperty.sham)) {
          createNonEnumerableProperty(sourceProperty, 'sham', true);
        }
        defineBuiltIn(target, key, sourceProperty, options);
      }
  };
  return _export;
}

var environment;
var hasRequiredEnvironment;

function requireEnvironment() {
  if (hasRequiredEnvironment) return environment;
  hasRequiredEnvironment = 1;
  /* global Bun, Deno -- detection */
  var globalThis = requireGlobalThis();
  var userAgent = requireEnvironmentUserAgent();
  var classof = requireClassofRaw();

  var userAgentStartsWith = function (string) {
    return userAgent.slice(0, string.length) === string;
  };

  environment = (function () {
    if (userAgentStartsWith('Bun/')) return 'BUN';
    if (userAgentStartsWith('Cloudflare-Workers')) return 'CLOUDFLARE';
    if (userAgentStartsWith('Deno/')) return 'DENO';
    if (userAgentStartsWith('Node.js/')) return 'NODE';
    if (globalThis.Bun && typeof Bun.version == 'string') return 'BUN';
    if (globalThis.Deno && typeof Deno.version == 'object') return 'DENO';
    if (classof(globalThis.process) === 'process') return 'NODE';
    if (globalThis.window && globalThis.document) return 'BROWSER';
    return 'REST';
  })();
  return environment;
}

var environmentIsNode;
var hasRequiredEnvironmentIsNode;

function requireEnvironmentIsNode() {
  if (hasRequiredEnvironmentIsNode) return environmentIsNode;
  hasRequiredEnvironmentIsNode = 1;
  var ENVIRONMENT = requireEnvironment();

  environmentIsNode = ENVIRONMENT === 'NODE';
  return environmentIsNode;
}

var path;
var hasRequiredPath;

function requirePath() {
  if (hasRequiredPath) return path;
  hasRequiredPath = 1;
  var globalThis = requireGlobalThis();

  path = globalThis;
  return path;
}

var functionUncurryThisAccessor;
var hasRequiredFunctionUncurryThisAccessor;

function requireFunctionUncurryThisAccessor() {
  if (hasRequiredFunctionUncurryThisAccessor) return functionUncurryThisAccessor;
  hasRequiredFunctionUncurryThisAccessor = 1;
  var uncurryThis = requireFunctionUncurryThis();
  var aCallable = requireACallable();

  functionUncurryThisAccessor = function (object, key, method) {
    try {
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
    } catch (error) {
      /* empty */
    }
  };
  return functionUncurryThisAccessor;
}

var isPossiblePrototype;
var hasRequiredIsPossiblePrototype;

function requireIsPossiblePrototype() {
  if (hasRequiredIsPossiblePrototype) return isPossiblePrototype;
  hasRequiredIsPossiblePrototype = 1;
  var isObject = requireIsObject();

  isPossiblePrototype = function (argument) {
    return isObject(argument) || argument === null;
  };
  return isPossiblePrototype;
}

var aPossiblePrototype;
var hasRequiredAPossiblePrototype;

function requireAPossiblePrototype() {
  if (hasRequiredAPossiblePrototype) return aPossiblePrototype;
  hasRequiredAPossiblePrototype = 1;
  var isPossiblePrototype = requireIsPossiblePrototype();

  var $String = String;
  var $TypeError = TypeError;

  aPossiblePrototype = function (argument) {
    if (isPossiblePrototype(argument)) return argument;
    throw new $TypeError("Can't set " + $String(argument) + ' as a prototype');
  };
  return aPossiblePrototype;
}

var objectSetPrototypeOf;
var hasRequiredObjectSetPrototypeOf;

function requireObjectSetPrototypeOf() {
  if (hasRequiredObjectSetPrototypeOf) return objectSetPrototypeOf;
  hasRequiredObjectSetPrototypeOf = 1;
  /* eslint-disable no-proto -- safe */
  var uncurryThisAccessor = requireFunctionUncurryThisAccessor();
  var isObject = requireIsObject();
  var requireObjectCoercible = requireRequireObjectCoercible();
  var aPossiblePrototype = requireAPossiblePrototype();

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es/no-object-setprototypeof -- safe
  objectSetPrototypeOf =
    Object.setPrototypeOf ||
    ('__proto__' in {}
      ? (function () {
          var CORRECT_SETTER = false;
          var test = {};
          var setter;
          try {
            setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
            setter(test, []);
            CORRECT_SETTER = test instanceof Array;
          } catch (error) {
            /* empty */
          }
          return function setPrototypeOf(O, proto) {
            requireObjectCoercible(O);
            aPossiblePrototype(proto);
            if (!isObject(O)) return O;
            if (CORRECT_SETTER) setter(O, proto);
            else O.__proto__ = proto;
            return O;
          };
        })()
      : undefined);
  return objectSetPrototypeOf;
}

var setToStringTag;
var hasRequiredSetToStringTag;

function requireSetToStringTag() {
  if (hasRequiredSetToStringTag) return setToStringTag;
  hasRequiredSetToStringTag = 1;
  var defineProperty = requireObjectDefineProperty().f;
  var hasOwn = requireHasOwnProperty();
  var wellKnownSymbol = requireWellKnownSymbol();

  var TO_STRING_TAG = wellKnownSymbol('toStringTag');

  setToStringTag = function (target, TAG, STATIC) {
    if (target && !STATIC) target = target.prototype;
    if (target && !hasOwn(target, TO_STRING_TAG)) {
      defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
    }
  };
  return setToStringTag;
}

var defineBuiltInAccessor;
var hasRequiredDefineBuiltInAccessor;

function requireDefineBuiltInAccessor() {
  if (hasRequiredDefineBuiltInAccessor) return defineBuiltInAccessor;
  hasRequiredDefineBuiltInAccessor = 1;
  var makeBuiltIn = requireMakeBuiltIn();
  var defineProperty = requireObjectDefineProperty();

  defineBuiltInAccessor = function (target, name, descriptor) {
    if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
    if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
    return defineProperty.f(target, name, descriptor);
  };
  return defineBuiltInAccessor;
}

var setSpecies;
var hasRequiredSetSpecies;

function requireSetSpecies() {
  if (hasRequiredSetSpecies) return setSpecies;
  hasRequiredSetSpecies = 1;
  var getBuiltIn = requireGetBuiltIn();
  var defineBuiltInAccessor = requireDefineBuiltInAccessor();
  var wellKnownSymbol = requireWellKnownSymbol();
  var DESCRIPTORS = requireDescriptors();

  var SPECIES = wellKnownSymbol('species');

  setSpecies = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn(CONSTRUCTOR_NAME);

    if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
      defineBuiltInAccessor(Constructor, SPECIES, {
        configurable: true,
        get: function () {
          return this;
        },
      });
    }
  };
  return setSpecies;
}

var anInstance;
var hasRequiredAnInstance;

function requireAnInstance() {
  if (hasRequiredAnInstance) return anInstance;
  hasRequiredAnInstance = 1;
  var isPrototypeOf = requireObjectIsPrototypeOf();

  var $TypeError = TypeError;

  anInstance = function (it, Prototype) {
    if (isPrototypeOf(Prototype, it)) return it;
    throw new $TypeError('Incorrect invocation');
  };
  return anInstance;
}

var isConstructor;
var hasRequiredIsConstructor;

function requireIsConstructor() {
  if (hasRequiredIsConstructor) return isConstructor;
  hasRequiredIsConstructor = 1;
  var uncurryThis = requireFunctionUncurryThis();
  var fails = requireFails();
  var isCallable = requireIsCallable();
  var classof = requireClassof();
  var getBuiltIn = requireGetBuiltIn();
  var inspectSource = requireInspectSource();

  var noop = function () {
    /* empty */
  };
  var construct = getBuiltIn('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec = uncurryThis(constructorRegExp.exec);
  var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

  var isConstructorModern = function isConstructor(argument) {
    if (!isCallable(argument)) return false;
    try {
      construct(noop, [], argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy = function isConstructor(argument) {
    if (!isCallable(argument)) return false;
    switch (classof(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction':
        return false;
    }
    try {
      // we can't check .prototype since constructors produced by .bind haven't it
      // `Function#toString` throws on some built-it function in some legacy engines
      // (for example, `DOMQuad` and similar in FF41-)
      return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
    } catch (error) {
      return true;
    }
  };

  isConstructorLegacy.sham = true;

  // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor
  isConstructor =
    !construct ||
    fails(function () {
      var called;
      return (
        isConstructorModern(isConstructorModern.call) ||
        !isConstructorModern(Object) ||
        !isConstructorModern(function () {
          called = true;
        }) ||
        called
      );
    })
      ? isConstructorLegacy
      : isConstructorModern;
  return isConstructor;
}

var aConstructor;
var hasRequiredAConstructor;

function requireAConstructor() {
  if (hasRequiredAConstructor) return aConstructor;
  hasRequiredAConstructor = 1;
  var isConstructor = requireIsConstructor();
  var tryToString = requireTryToString();

  var $TypeError = TypeError;

  // `Assert: IsConstructor(argument) is true`
  aConstructor = function (argument) {
    if (isConstructor(argument)) return argument;
    throw new $TypeError(tryToString(argument) + ' is not a constructor');
  };
  return aConstructor;
}

var speciesConstructor;
var hasRequiredSpeciesConstructor;

function requireSpeciesConstructor() {
  if (hasRequiredSpeciesConstructor) return speciesConstructor;
  hasRequiredSpeciesConstructor = 1;
  var anObject = requireAnObject();
  var aConstructor = requireAConstructor();
  var isNullOrUndefined = requireIsNullOrUndefined();
  var wellKnownSymbol = requireWellKnownSymbol();

  var SPECIES = wellKnownSymbol('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  speciesConstructor = function (O, defaultConstructor) {
    var C = anObject(O).constructor;
    var S;
    return C === undefined || isNullOrUndefined((S = anObject(C)[SPECIES])) ? defaultConstructor : aConstructor(S);
  };
  return speciesConstructor;
}

var functionApply;
var hasRequiredFunctionApply;

function requireFunctionApply() {
  if (hasRequiredFunctionApply) return functionApply;
  hasRequiredFunctionApply = 1;
  var NATIVE_BIND = requireFunctionBindNative();

  var FunctionPrototype = Function.prototype;
  var apply = FunctionPrototype.apply;
  var call = FunctionPrototype.call;

  // eslint-disable-next-line es/no-function-prototype-bind, es/no-reflect -- safe
  functionApply =
    (typeof Reflect == 'object' && Reflect.apply) ||
    (NATIVE_BIND
      ? call.bind(apply)
      : function () {
          return call.apply(apply, arguments);
        });
  return functionApply;
}

var functionUncurryThisClause;
var hasRequiredFunctionUncurryThisClause;

function requireFunctionUncurryThisClause() {
  if (hasRequiredFunctionUncurryThisClause) return functionUncurryThisClause;
  hasRequiredFunctionUncurryThisClause = 1;
  var classofRaw = requireClassofRaw();
  var uncurryThis = requireFunctionUncurryThis();

  functionUncurryThisClause = function (fn) {
    // Nashorn bug:
    //   https://github.com/zloirock/core-js/issues/1128
    //   https://github.com/zloirock/core-js/issues/1130
    if (classofRaw(fn) === 'Function') return uncurryThis(fn);
  };
  return functionUncurryThisClause;
}

var functionBindContext;
var hasRequiredFunctionBindContext;

function requireFunctionBindContext() {
  if (hasRequiredFunctionBindContext) return functionBindContext;
  hasRequiredFunctionBindContext = 1;
  var uncurryThis = requireFunctionUncurryThisClause();
  var aCallable = requireACallable();
  var NATIVE_BIND = requireFunctionBindNative();

  var bind = uncurryThis(uncurryThis.bind);

  // optional / simple context binding
  functionBindContext = function (fn, that) {
    aCallable(fn);
    return that === undefined
      ? fn
      : NATIVE_BIND
        ? bind(fn, that)
        : function (/* ...args */) {
            return fn.apply(that, arguments);
          };
  };
  return functionBindContext;
}

var html;
var hasRequiredHtml;

function requireHtml() {
  if (hasRequiredHtml) return html;
  hasRequiredHtml = 1;
  var getBuiltIn = requireGetBuiltIn();

  html = getBuiltIn('document', 'documentElement');
  return html;
}

var arraySlice;
var hasRequiredArraySlice;

function requireArraySlice() {
  if (hasRequiredArraySlice) return arraySlice;
  hasRequiredArraySlice = 1;
  var uncurryThis = requireFunctionUncurryThis();

  arraySlice = uncurryThis([].slice);
  return arraySlice;
}

var validateArgumentsLength;
var hasRequiredValidateArgumentsLength;

function requireValidateArgumentsLength() {
  if (hasRequiredValidateArgumentsLength) return validateArgumentsLength;
  hasRequiredValidateArgumentsLength = 1;
  var $TypeError = TypeError;

  validateArgumentsLength = function (passed, required) {
    if (passed < required) throw new $TypeError('Not enough arguments');
    return passed;
  };
  return validateArgumentsLength;
}

var environmentIsIos;
var hasRequiredEnvironmentIsIos;

function requireEnvironmentIsIos() {
  if (hasRequiredEnvironmentIsIos) return environmentIsIos;
  hasRequiredEnvironmentIsIos = 1;
  var userAgent = requireEnvironmentUserAgent();

  // eslint-disable-next-line redos/no-vulnerable -- safe
  environmentIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);
  return environmentIsIos;
}

var task;
var hasRequiredTask;

function requireTask() {
  if (hasRequiredTask) return task;
  hasRequiredTask = 1;
  var globalThis = requireGlobalThis();
  var apply = requireFunctionApply();
  var bind = requireFunctionBindContext();
  var isCallable = requireIsCallable();
  var hasOwn = requireHasOwnProperty();
  var fails = requireFails();
  var html = requireHtml();
  var arraySlice = requireArraySlice();
  var createElement = requireDocumentCreateElement();
  var validateArgumentsLength = requireValidateArgumentsLength();
  var IS_IOS = requireEnvironmentIsIos();
  var IS_NODE = requireEnvironmentIsNode();

  var set = globalThis.setImmediate;
  var clear = globalThis.clearImmediate;
  var process = globalThis.process;
  var Dispatch = globalThis.Dispatch;
  var Function = globalThis.Function;
  var MessageChannel = globalThis.MessageChannel;
  var String = globalThis.String;
  var counter = 0;
  var queue = {};
  var ONREADYSTATECHANGE = 'onreadystatechange';
  var $location, defer, channel, port;

  fails(function () {
    // Deno throws a ReferenceError on `location` access without `--location` flag
    $location = globalThis.location;
  });

  var run = function (id) {
    if (hasOwn(queue, id)) {
      var fn = queue[id];
      delete queue[id];
      fn();
    }
  };

  var runner = function (id) {
    return function () {
      run(id);
    };
  };

  var eventListener = function (event) {
    run(event.data);
  };

  var globalPostMessageDefer = function (id) {
    // old engines have not location.origin
    globalThis.postMessage(String(id), $location.protocol + '//' + $location.host);
  };

  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!set || !clear) {
    set = function setImmediate(handler) {
      validateArgumentsLength(arguments.length, 1);
      var fn = isCallable(handler) ? handler : Function(handler);
      var args = arraySlice(arguments, 1);
      queue[++counter] = function () {
        apply(fn, undefined, args);
      };
      defer(counter);
      return counter;
    };
    clear = function clearImmediate(id) {
      delete queue[id];
    };
    // Node.js 0.8-
    if (IS_NODE) {
      defer = function (id) {
        process.nextTick(runner(id));
      };
      // Sphere (JS game engine) Dispatch API
    } else if (Dispatch && Dispatch.now) {
      defer = function (id) {
        Dispatch.now(runner(id));
      };
      // Browsers with MessageChannel, includes WebWorkers
      // except iOS - https://github.com/zloirock/core-js/issues/624
    } else if (MessageChannel && !IS_IOS) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = eventListener;
      defer = bind(port.postMessage, port);
      // Browsers with postMessage, skip WebWorkers
      // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (
      globalThis.addEventListener &&
      isCallable(globalThis.postMessage) &&
      !globalThis.importScripts &&
      $location &&
      $location.protocol !== 'file:' &&
      !fails(globalPostMessageDefer)
    ) {
      defer = globalPostMessageDefer;
      globalThis.addEventListener('message', eventListener, false);
      // IE8-
    } else if (ONREADYSTATECHANGE in createElement('script')) {
      defer = function (id) {
        html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
          html.removeChild(this);
          run(id);
        };
      };
      // Rest old browsers
    } else {
      defer = function (id) {
        setTimeout(runner(id), 0);
      };
    }
  }

  task = {
    set: set,
    clear: clear,
  };
  return task;
}

var safeGetBuiltIn;
var hasRequiredSafeGetBuiltIn;

function requireSafeGetBuiltIn() {
  if (hasRequiredSafeGetBuiltIn) return safeGetBuiltIn;
  hasRequiredSafeGetBuiltIn = 1;
  var globalThis = requireGlobalThis();
  var DESCRIPTORS = requireDescriptors();

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Avoid NodeJS experimental warning
  safeGetBuiltIn = function (name) {
    if (!DESCRIPTORS) return globalThis[name];
    var descriptor = getOwnPropertyDescriptor(globalThis, name);
    return descriptor && descriptor.value;
  };
  return safeGetBuiltIn;
}

var queue;
var hasRequiredQueue;

function requireQueue() {
  if (hasRequiredQueue) return queue;
  hasRequiredQueue = 1;
  var Queue = function () {
    this.head = null;
    this.tail = null;
  };

  Queue.prototype = {
    add: function (item) {
      var entry = { item: item, next: null };
      var tail = this.tail;
      if (tail) tail.next = entry;
      else this.head = entry;
      this.tail = entry;
    },
    get: function () {
      var entry = this.head;
      if (entry) {
        var next = (this.head = entry.next);
        if (next === null) this.tail = null;
        return entry.item;
      }
    },
  };

  queue = Queue;
  return queue;
}

var environmentIsIosPebble;
var hasRequiredEnvironmentIsIosPebble;

function requireEnvironmentIsIosPebble() {
  if (hasRequiredEnvironmentIsIosPebble) return environmentIsIosPebble;
  hasRequiredEnvironmentIsIosPebble = 1;
  var userAgent = requireEnvironmentUserAgent();

  environmentIsIosPebble = /ipad|iphone|ipod/i.test(userAgent) && typeof Pebble != 'undefined';
  return environmentIsIosPebble;
}

var environmentIsWebosWebkit;
var hasRequiredEnvironmentIsWebosWebkit;

function requireEnvironmentIsWebosWebkit() {
  if (hasRequiredEnvironmentIsWebosWebkit) return environmentIsWebosWebkit;
  hasRequiredEnvironmentIsWebosWebkit = 1;
  var userAgent = requireEnvironmentUserAgent();

  environmentIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);
  return environmentIsWebosWebkit;
}

var microtask_1;
var hasRequiredMicrotask;

function requireMicrotask() {
  if (hasRequiredMicrotask) return microtask_1;
  hasRequiredMicrotask = 1;
  var globalThis = requireGlobalThis();
  var safeGetBuiltIn = requireSafeGetBuiltIn();
  var bind = requireFunctionBindContext();
  var macrotask = requireTask().set;
  var Queue = requireQueue();
  var IS_IOS = requireEnvironmentIsIos();
  var IS_IOS_PEBBLE = requireEnvironmentIsIosPebble();
  var IS_WEBOS_WEBKIT = requireEnvironmentIsWebosWebkit();
  var IS_NODE = requireEnvironmentIsNode();

  var MutationObserver = globalThis.MutationObserver || globalThis.WebKitMutationObserver;
  var document = globalThis.document;
  var process = globalThis.process;
  var Promise = globalThis.Promise;
  var microtask = safeGetBuiltIn('queueMicrotask');
  var notify, toggle, node, promise, then;

  // modern engines have queueMicrotask method
  if (!microtask) {
    var queue = new Queue();

    var flush = function () {
      var parent, fn;
      if (IS_NODE && (parent = process.domain)) parent.exit();
      while ((fn = queue.get()))
        try {
          fn();
        } catch (error) {
          if (queue.head) notify();
          throw error;
        }
      if (parent) parent.enter();
    };

    // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
    // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
    if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
      toggle = true;
      node = document.createTextNode('');
      new MutationObserver(flush).observe(node, { characterData: true });
      notify = function () {
        node.data = toggle = !toggle;
      };
      // environments with maybe non-completely correct, but existent Promise
    } else if (!IS_IOS_PEBBLE && Promise && Promise.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      promise = Promise.resolve(undefined);
      // workaround of WebKit ~ iOS Safari 10.1 bug
      promise.constructor = Promise;
      then = bind(promise.then, promise);
      notify = function () {
        then(flush);
      };
      // Node.js without promises
    } else if (IS_NODE) {
      notify = function () {
        process.nextTick(flush);
      };
      // for other environments - macrotask based on:
      // - setImmediate
      // - MessageChannel
      // - window.postMessage
      // - onreadystatechange
      // - setTimeout
    } else {
      // `webpack` dev server bug on IE global methods - use bind(fn, global)
      macrotask = bind(macrotask, globalThis);
      notify = function () {
        macrotask(flush);
      };
    }

    microtask = function (fn) {
      if (!queue.head) notify();
      queue.add(fn);
    };
  }

  microtask_1 = microtask;
  return microtask_1;
}

var hostReportErrors;
var hasRequiredHostReportErrors;

function requireHostReportErrors() {
  if (hasRequiredHostReportErrors) return hostReportErrors;
  hasRequiredHostReportErrors = 1;
  hostReportErrors = function (a, b) {
    try {
      // eslint-disable-next-line no-console -- safe
      arguments.length === 1 ? console.error(a) : console.error(a, b);
    } catch (error) {
      /* empty */
    }
  };
  return hostReportErrors;
}

var perform;
var hasRequiredPerform;

function requirePerform() {
  if (hasRequiredPerform) return perform;
  hasRequiredPerform = 1;
  perform = function (exec) {
    try {
      return { error: false, value: exec() };
    } catch (error) {
      return { error: true, value: error };
    }
  };
  return perform;
}

var promiseNativeConstructor;
var hasRequiredPromiseNativeConstructor;

function requirePromiseNativeConstructor() {
  if (hasRequiredPromiseNativeConstructor) return promiseNativeConstructor;
  hasRequiredPromiseNativeConstructor = 1;
  var globalThis = requireGlobalThis();

  promiseNativeConstructor = globalThis.Promise;
  return promiseNativeConstructor;
}

var promiseConstructorDetection;
var hasRequiredPromiseConstructorDetection;

function requirePromiseConstructorDetection() {
  if (hasRequiredPromiseConstructorDetection) return promiseConstructorDetection;
  hasRequiredPromiseConstructorDetection = 1;
  var globalThis = requireGlobalThis();
  var NativePromiseConstructor = requirePromiseNativeConstructor();
  var isCallable = requireIsCallable();
  var isForced = requireIsForced();
  var inspectSource = requireInspectSource();
  var wellKnownSymbol = requireWellKnownSymbol();
  var ENVIRONMENT = requireEnvironment();
  var IS_PURE = requireIsPure();
  var V8_VERSION = requireEnvironmentV8Version();

  var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
  var SPECIES = wellKnownSymbol('species');
  var SUBCLASSING = false;
  var NATIVE_PROMISE_REJECTION_EVENT = isCallable(globalThis.PromiseRejectionEvent);

  var FORCED_PROMISE_CONSTRUCTOR = isForced('Promise', function () {
    var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor);
    var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor);
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
    // We need Promise#{ catch, finally } in the pure version for preventing prototype pollution
    if (IS_PURE && !(NativePromisePrototype['catch'] && NativePromisePrototype['finally'])) return true;
    // We can't use @@species feature detection in V8 since it causes
    // deoptimization and performance degradation
    // https://github.com/zloirock/core-js/issues/679
    if (!V8_VERSION || V8_VERSION < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
      // Detect correctness of subclassing with @@species support
      var promise = new NativePromiseConstructor(function (resolve) {
        resolve(1);
      });
      var FakePromise = function (exec) {
        exec(
          function () {
            /* empty */
          },
          function () {
            /* empty */
          },
        );
      };
      var constructor = (promise.constructor = {});
      constructor[SPECIES] = FakePromise;
      SUBCLASSING =
        promise.then(function () {
          /* empty */
        }) instanceof FakePromise;
      if (!SUBCLASSING) return true;
      // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    }
    return !GLOBAL_CORE_JS_PROMISE && (ENVIRONMENT === 'BROWSER' || ENVIRONMENT === 'DENO') && !NATIVE_PROMISE_REJECTION_EVENT;
  });

  promiseConstructorDetection = {
    CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR,
    REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT,
    SUBCLASSING: SUBCLASSING,
  };
  return promiseConstructorDetection;
}

var newPromiseCapability = {};

var hasRequiredNewPromiseCapability;

function requireNewPromiseCapability() {
  if (hasRequiredNewPromiseCapability) return newPromiseCapability;
  hasRequiredNewPromiseCapability = 1;
  var aCallable = requireACallable();

  var $TypeError = TypeError;

  var PromiseCapability = function (C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw new $TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = aCallable(resolve);
    this.reject = aCallable(reject);
  };

  // `NewPromiseCapability` abstract operation
  // https://tc39.es/ecma262/#sec-newpromisecapability
  newPromiseCapability.f = function (C) {
    return new PromiseCapability(C);
  };
  return newPromiseCapability;
}

var hasRequiredEs_promise_constructor;

function requireEs_promise_constructor() {
  if (hasRequiredEs_promise_constructor) return es_promise_constructor;
  hasRequiredEs_promise_constructor = 1;
  var $ = require_export();
  var IS_PURE = requireIsPure();
  var IS_NODE = requireEnvironmentIsNode();
  var globalThis = requireGlobalThis();
  var path = requirePath();
  var call = requireFunctionCall();
  var defineBuiltIn = requireDefineBuiltIn();
  var setPrototypeOf = requireObjectSetPrototypeOf();
  var setToStringTag = requireSetToStringTag();
  var setSpecies = requireSetSpecies();
  var aCallable = requireACallable();
  var isCallable = requireIsCallable();
  var isObject = requireIsObject();
  var anInstance = requireAnInstance();
  var speciesConstructor = requireSpeciesConstructor();
  var task = requireTask().set;
  var microtask = requireMicrotask();
  var hostReportErrors = requireHostReportErrors();
  var perform = requirePerform();
  var Queue = requireQueue();
  var InternalStateModule = requireInternalState();
  var NativePromiseConstructor = requirePromiseNativeConstructor();
  var PromiseConstructorDetection = requirePromiseConstructorDetection();
  var newPromiseCapabilityModule = requireNewPromiseCapability();

  var PROMISE = 'Promise';
  var FORCED_PROMISE_CONSTRUCTOR = PromiseConstructorDetection.CONSTRUCTOR;
  var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
  var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
  var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
  var setInternalState = InternalStateModule.set;
  var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
  var PromiseConstructor = NativePromiseConstructor;
  var PromisePrototype = NativePromisePrototype;
  var TypeError = globalThis.TypeError;
  var document = globalThis.document;
  var process = globalThis.process;
  var newPromiseCapability = newPromiseCapabilityModule.f;
  var newGenericPromiseCapability = newPromiseCapability;

  var DISPATCH_EVENT = !!(document && document.createEvent && globalThis.dispatchEvent);
  var UNHANDLED_REJECTION = 'unhandledrejection';
  var REJECTION_HANDLED = 'rejectionhandled';
  var PENDING = 0;
  var FULFILLED = 1;
  var REJECTED = 2;
  var HANDLED = 1;
  var UNHANDLED = 2;

  var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

  // helpers
  var isThenable = function (it) {
    var then;
    return isObject(it) && isCallable((then = it.then)) ? then : false;
  };

  var callReaction = function (reaction, state) {
    var value = state.value;
    var ok = state.state === FULFILLED;
    var handler = ok ? reaction.ok : reaction.fail;
    var resolve = reaction.resolve;
    var reject = reaction.reject;
    var domain = reaction.domain;
    var result, then, exited;
    try {
      if (handler) {
        if (!ok) {
          if (state.rejection === UNHANDLED) onHandleUnhandled(state);
          state.rejection = HANDLED;
        }
        if (handler === true) result = value;
        else {
          if (domain) domain.enter();
          result = handler(value); // can throw
          if (domain) {
            domain.exit();
            exited = true;
          }
        }
        if (result === reaction.promise) {
          reject(new TypeError('Promise-chain cycle'));
        } else if ((then = isThenable(result))) {
          call(then, result, resolve, reject);
        } else resolve(result);
      } else reject(value);
    } catch (error) {
      if (domain && !exited) domain.exit();
      reject(error);
    }
  };

  var notify = function (state, isReject) {
    if (state.notified) return;
    state.notified = true;
    microtask(function () {
      var reactions = state.reactions;
      var reaction;
      while ((reaction = reactions.get())) {
        callReaction(reaction, state);
      }
      state.notified = false;
      if (isReject && !state.rejection) onUnhandled(state);
    });
  };

  var dispatchEvent = function (name, promise, reason) {
    var event, handler;
    if (DISPATCH_EVENT) {
      event = document.createEvent('Event');
      event.promise = promise;
      event.reason = reason;
      event.initEvent(name, false, true);
      globalThis.dispatchEvent(event);
    } else event = { promise: promise, reason: reason };
    if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = globalThis['on' + name])) handler(event);
    else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
  };

  var onUnhandled = function (state) {
    call(task, globalThis, function () {
      var promise = state.facade;
      var value = state.value;
      var IS_UNHANDLED = isUnhandled(state);
      var result;
      if (IS_UNHANDLED) {
        result = perform(function () {
          if (IS_NODE) {
            process.emit('unhandledRejection', value, promise);
          } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
        if (result.error) throw result.value;
      }
    });
  };

  var isUnhandled = function (state) {
    return state.rejection !== HANDLED && !state.parent;
  };

  var onHandleUnhandled = function (state) {
    call(task, globalThis, function () {
      var promise = state.facade;
      if (IS_NODE) {
        process.emit('rejectionHandled', promise);
      } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
    });
  };

  var bind = function (fn, state, unwrap) {
    return function (value) {
      fn(state, value, unwrap);
    };
  };

  var internalReject = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    state.value = value;
    state.state = REJECTED;
    notify(state, true);
  };

  var internalResolve = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    try {
      if (state.facade === value) throw new TypeError("Promise can't be resolved itself");
      var then = isThenable(value);
      if (then) {
        microtask(function () {
          var wrapper = { done: false };
          try {
            call(then, value, bind(internalResolve, wrapper, state), bind(internalReject, wrapper, state));
          } catch (error) {
            internalReject(wrapper, error, state);
          }
        });
      } else {
        state.value = value;
        state.state = FULFILLED;
        notify(state, false);
      }
    } catch (error) {
      internalReject({ done: false }, error, state);
    }
  };

  // constructor polyfill
  if (FORCED_PROMISE_CONSTRUCTOR) {
    // 25.4.3.1 Promise(executor)
    PromiseConstructor = function Promise(executor) {
      anInstance(this, PromisePrototype);
      aCallable(executor);
      call(Internal, this);
      var state = getInternalPromiseState(this);
      try {
        executor(bind(internalResolve, state), bind(internalReject, state));
      } catch (error) {
        internalReject(state, error);
      }
    };

    PromisePrototype = PromiseConstructor.prototype;

    // eslint-disable-next-line no-unused-vars -- required for `.length`
    Internal = function Promise(executor) {
      setInternalState(this, {
        type: PROMISE,
        done: false,
        notified: false,
        parent: false,
        reactions: new Queue(),
        rejection: false,
        state: PENDING,
        value: null,
      });
    };

    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    Internal.prototype = defineBuiltIn(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      state.parent = true;
      reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
      reaction.fail = isCallable(onRejected) && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      if (state.state === PENDING) state.reactions.add(reaction);
      else
        microtask(function () {
          callReaction(reaction, state);
        });
      return reaction.promise;
    });

    OwnPromiseCapability = function () {
      var promise = new Internal();
      var state = getInternalPromiseState(promise);
      this.promise = promise;
      this.resolve = bind(internalResolve, state);
      this.reject = bind(internalReject, state);
    };

    newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
      return C === PromiseConstructor || C === PromiseWrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
    };

    if (!IS_PURE && isCallable(NativePromiseConstructor) && NativePromisePrototype !== Object.prototype) {
      nativeThen = NativePromisePrototype.then;

      if (!NATIVE_PROMISE_SUBCLASSING) {
        // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
        defineBuiltIn(
          NativePromisePrototype,
          'then',
          function then(onFulfilled, onRejected) {
            var that = this;
            return new PromiseConstructor(function (resolve, reject) {
              call(nativeThen, that, resolve, reject);
            }).then(onFulfilled, onRejected);
            // https://github.com/zloirock/core-js/issues/640
          },
          { unsafe: true },
        );
      }

      // make `.constructor === Promise` work for native promise-based APIs
      try {
        delete NativePromisePrototype.constructor;
      } catch (error) {
        /* empty */
      }

      // make `instanceof Promise` work for native promise-based APIs
      if (setPrototypeOf) {
        setPrototypeOf(NativePromisePrototype, PromisePrototype);
      }
    }
  }

  // `Promise` constructor
  // https://tc39.es/ecma262/#sec-promise-executor
  $(
    { global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR },
    {
      Promise: PromiseConstructor,
    },
  );

  PromiseWrapper = path.Promise;

  setToStringTag(PromiseConstructor, PROMISE, false, true);
  setSpecies(PROMISE);
  return es_promise_constructor;
}

var es_promise_all = {};

var iterators;
var hasRequiredIterators;

function requireIterators() {
  if (hasRequiredIterators) return iterators;
  hasRequiredIterators = 1;
  iterators = {};
  return iterators;
}

var isArrayIteratorMethod;
var hasRequiredIsArrayIteratorMethod;

function requireIsArrayIteratorMethod() {
  if (hasRequiredIsArrayIteratorMethod) return isArrayIteratorMethod;
  hasRequiredIsArrayIteratorMethod = 1;
  var wellKnownSymbol = requireWellKnownSymbol();
  var Iterators = requireIterators();

  var ITERATOR = wellKnownSymbol('iterator');
  var ArrayPrototype = Array.prototype;

  // check on default Array iterator
  isArrayIteratorMethod = function (it) {
    return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
  };
  return isArrayIteratorMethod;
}

var getIteratorMethod;
var hasRequiredGetIteratorMethod;

function requireGetIteratorMethod() {
  if (hasRequiredGetIteratorMethod) return getIteratorMethod;
  hasRequiredGetIteratorMethod = 1;
  var classof = requireClassof();
  var getMethod = requireGetMethod();
  var isNullOrUndefined = requireIsNullOrUndefined();
  var Iterators = requireIterators();
  var wellKnownSymbol = requireWellKnownSymbol();

  var ITERATOR = wellKnownSymbol('iterator');

  getIteratorMethod = function (it) {
    if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR) || getMethod(it, '@@iterator') || Iterators[classof(it)];
  };
  return getIteratorMethod;
}

var getIterator;
var hasRequiredGetIterator;

function requireGetIterator() {
  if (hasRequiredGetIterator) return getIterator;
  hasRequiredGetIterator = 1;
  var call = requireFunctionCall();
  var aCallable = requireACallable();
  var anObject = requireAnObject();
  var tryToString = requireTryToString();
  var getIteratorMethod = requireGetIteratorMethod();

  var $TypeError = TypeError;

  getIterator = function (argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
    if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
    throw new $TypeError(tryToString(argument) + ' is not iterable');
  };
  return getIterator;
}

var iteratorClose;
var hasRequiredIteratorClose;

function requireIteratorClose() {
  if (hasRequiredIteratorClose) return iteratorClose;
  hasRequiredIteratorClose = 1;
  var call = requireFunctionCall();
  var anObject = requireAnObject();
  var getMethod = requireGetMethod();

  iteratorClose = function (iterator, kind, value) {
    var innerResult, innerError;
    anObject(iterator);
    try {
      innerResult = getMethod(iterator, 'return');
      if (!innerResult) {
        if (kind === 'throw') throw value;
        return value;
      }
      innerResult = call(innerResult, iterator);
    } catch (error) {
      innerError = true;
      innerResult = error;
    }
    if (kind === 'throw') throw value;
    if (innerError) throw innerResult;
    anObject(innerResult);
    return value;
  };
  return iteratorClose;
}

var iterate;
var hasRequiredIterate;

function requireIterate() {
  if (hasRequiredIterate) return iterate;
  hasRequiredIterate = 1;
  var bind = requireFunctionBindContext();
  var call = requireFunctionCall();
  var anObject = requireAnObject();
  var tryToString = requireTryToString();
  var isArrayIteratorMethod = requireIsArrayIteratorMethod();
  var lengthOfArrayLike = requireLengthOfArrayLike();
  var isPrototypeOf = requireObjectIsPrototypeOf();
  var getIterator = requireGetIterator();
  var getIteratorMethod = requireGetIteratorMethod();
  var iteratorClose = requireIteratorClose();

  var $TypeError = TypeError;

  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var ResultPrototype = Result.prototype;

  iterate = function (iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_RECORD = !!(options && options.IS_RECORD);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = bind(unboundFunction, that);
    var iterator, iterFn, index, length, result, next, step;

    var stop = function (condition) {
      if (iterator) iteratorClose(iterator, 'normal');
      return new Result(true, condition);
    };

    var callFn = function (value) {
      if (AS_ENTRIES) {
        anObject(value);
        return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
      }
      return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_RECORD) {
      iterator = iterable.iterator;
    } else if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod(iterable);
      if (!iterFn) throw new $TypeError(tryToString(iterable) + ' is not iterable');
      // optimisation for array iterators
      if (isArrayIteratorMethod(iterFn)) {
        for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
          result = callFn(iterable[index]);
          if (result && isPrototypeOf(ResultPrototype, result)) return result;
        }
        return new Result(false);
      }
      iterator = getIterator(iterable, iterFn);
    }

    next = IS_RECORD ? iterable.next : iterator.next;
    while (!(step = call(next, iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose(iterator, 'throw', error);
      }
      if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
    }
    return new Result(false);
  };
  return iterate;
}

var checkCorrectnessOfIteration;
var hasRequiredCheckCorrectnessOfIteration;

function requireCheckCorrectnessOfIteration() {
  if (hasRequiredCheckCorrectnessOfIteration) return checkCorrectnessOfIteration;
  hasRequiredCheckCorrectnessOfIteration = 1;
  var wellKnownSymbol = requireWellKnownSymbol();

  var ITERATOR = wellKnownSymbol('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      return: function () {
        SAFE_CLOSING = true;
      },
    };
    iteratorWithReturn[ITERATOR] = function () {
      return this;
    };
    // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn, function () {
      throw 2;
    });
  } catch (error) {
    /* empty */
  }

  checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
    try {
      if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    } catch (error) {
      return false;
    } // workaround of old WebKit + `eval` bug
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR] = function () {
        return {
          next: function () {
            return { done: (ITERATION_SUPPORT = true) };
          },
        };
      };
      exec(object);
    } catch (error) {
      /* empty */
    }
    return ITERATION_SUPPORT;
  };
  return checkCorrectnessOfIteration;
}

var promiseStaticsIncorrectIteration;
var hasRequiredPromiseStaticsIncorrectIteration;

function requirePromiseStaticsIncorrectIteration() {
  if (hasRequiredPromiseStaticsIncorrectIteration) return promiseStaticsIncorrectIteration;
  hasRequiredPromiseStaticsIncorrectIteration = 1;
  var NativePromiseConstructor = requirePromiseNativeConstructor();
  var checkCorrectnessOfIteration = requireCheckCorrectnessOfIteration();
  var FORCED_PROMISE_CONSTRUCTOR = requirePromiseConstructorDetection().CONSTRUCTOR;

  promiseStaticsIncorrectIteration =
    FORCED_PROMISE_CONSTRUCTOR ||
    !checkCorrectnessOfIteration(function (iterable) {
      NativePromiseConstructor.all(iterable).then(undefined, function () {
        /* empty */
      });
    });
  return promiseStaticsIncorrectIteration;
}

var hasRequiredEs_promise_all;

function requireEs_promise_all() {
  if (hasRequiredEs_promise_all) return es_promise_all;
  hasRequiredEs_promise_all = 1;
  var $ = require_export();
  var call = requireFunctionCall();
  var aCallable = requireACallable();
  var newPromiseCapabilityModule = requireNewPromiseCapability();
  var perform = requirePerform();
  var iterate = requireIterate();
  var PROMISE_STATICS_INCORRECT_ITERATION = requirePromiseStaticsIncorrectIteration();

  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  $(
    { target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION },
    {
      all: function all(iterable) {
        var C = this;
        var capability = newPromiseCapabilityModule.f(C);
        var resolve = capability.resolve;
        var reject = capability.reject;
        var result = perform(function () {
          var $promiseResolve = aCallable(C.resolve);
          var values = [];
          var counter = 0;
          var remaining = 1;
          iterate(iterable, function (promise) {
            var index = counter++;
            var alreadyCalled = false;
            remaining++;
            call($promiseResolve, C, promise).then(function (value) {
              if (alreadyCalled) return;
              alreadyCalled = true;
              values[index] = value;
              --remaining || resolve(values);
            }, reject);
          });
          --remaining || resolve(values);
        });
        if (result.error) reject(result.value);
        return capability.promise;
      },
    },
  );
  return es_promise_all;
}

var es_promise_catch = {};

var hasRequiredEs_promise_catch;

function requireEs_promise_catch() {
  if (hasRequiredEs_promise_catch) return es_promise_catch;
  hasRequiredEs_promise_catch = 1;
  var $ = require_export();
  var IS_PURE = requireIsPure();
  var FORCED_PROMISE_CONSTRUCTOR = requirePromiseConstructorDetection().CONSTRUCTOR;
  var NativePromiseConstructor = requirePromiseNativeConstructor();
  var getBuiltIn = requireGetBuiltIn();
  var isCallable = requireIsCallable();
  var defineBuiltIn = requireDefineBuiltIn();

  var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

  // `Promise.prototype.catch` method
  // https://tc39.es/ecma262/#sec-promise.prototype.catch
  $(
    { target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR, real: true },
    {
      catch: function (onRejected) {
        return this.then(undefined, onRejected);
      },
    },
  );

  // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
  if (!IS_PURE && isCallable(NativePromiseConstructor)) {
    var method = getBuiltIn('Promise').prototype['catch'];
    if (NativePromisePrototype['catch'] !== method) {
      defineBuiltIn(NativePromisePrototype, 'catch', method, { unsafe: true });
    }
  }
  return es_promise_catch;
}

var es_promise_race = {};

var hasRequiredEs_promise_race;

function requireEs_promise_race() {
  if (hasRequiredEs_promise_race) return es_promise_race;
  hasRequiredEs_promise_race = 1;
  var $ = require_export();
  var call = requireFunctionCall();
  var aCallable = requireACallable();
  var newPromiseCapabilityModule = requireNewPromiseCapability();
  var perform = requirePerform();
  var iterate = requireIterate();
  var PROMISE_STATICS_INCORRECT_ITERATION = requirePromiseStaticsIncorrectIteration();

  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  $(
    { target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION },
    {
      race: function race(iterable) {
        var C = this;
        var capability = newPromiseCapabilityModule.f(C);
        var reject = capability.reject;
        var result = perform(function () {
          var $promiseResolve = aCallable(C.resolve);
          iterate(iterable, function (promise) {
            call($promiseResolve, C, promise).then(capability.resolve, reject);
          });
        });
        if (result.error) reject(result.value);
        return capability.promise;
      },
    },
  );
  return es_promise_race;
}

var es_promise_reject = {};

var hasRequiredEs_promise_reject;

function requireEs_promise_reject() {
  if (hasRequiredEs_promise_reject) return es_promise_reject;
  hasRequiredEs_promise_reject = 1;
  var $ = require_export();
  var newPromiseCapabilityModule = requireNewPromiseCapability();
  var FORCED_PROMISE_CONSTRUCTOR = requirePromiseConstructorDetection().CONSTRUCTOR;

  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  $(
    { target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR },
    {
      reject: function reject(r) {
        var capability = newPromiseCapabilityModule.f(this);
        var capabilityReject = capability.reject;
        capabilityReject(r);
        return capability.promise;
      },
    },
  );
  return es_promise_reject;
}

var es_promise_resolve = {};

var promiseResolve;
var hasRequiredPromiseResolve;

function requirePromiseResolve() {
  if (hasRequiredPromiseResolve) return promiseResolve;
  hasRequiredPromiseResolve = 1;
  var anObject = requireAnObject();
  var isObject = requireIsObject();
  var newPromiseCapability = requireNewPromiseCapability();

  promiseResolve = function (C, x) {
    anObject(C);
    if (isObject(x) && x.constructor === C) return x;
    var promiseCapability = newPromiseCapability.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };
  return promiseResolve;
}

var hasRequiredEs_promise_resolve;

function requireEs_promise_resolve() {
  if (hasRequiredEs_promise_resolve) return es_promise_resolve;
  hasRequiredEs_promise_resolve = 1;
  var $ = require_export();
  var getBuiltIn = requireGetBuiltIn();
  var IS_PURE = requireIsPure();
  var NativePromiseConstructor = requirePromiseNativeConstructor();
  var FORCED_PROMISE_CONSTRUCTOR = requirePromiseConstructorDetection().CONSTRUCTOR;
  var promiseResolve = requirePromiseResolve();

  var PromiseConstructorWrapper = getBuiltIn('Promise');
  var CHECK_WRAPPER = IS_PURE && !FORCED_PROMISE_CONSTRUCTOR;

  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  $(
    { target: 'Promise', stat: true, forced: IS_PURE || FORCED_PROMISE_CONSTRUCTOR },
    {
      resolve: function resolve(x) {
        return promiseResolve(CHECK_WRAPPER && this === PromiseConstructorWrapper ? NativePromiseConstructor : this, x);
      },
    },
  );
  return es_promise_resolve;
}

var hasRequiredEs_promise;

function requireEs_promise() {
  if (hasRequiredEs_promise) return es_promise;
  hasRequiredEs_promise = 1;
  // TODO: Remove this module from `core-js@4` since it's split to modules listed below
  requireEs_promise_constructor();
  requireEs_promise_all();
  requireEs_promise_catch();
  requireEs_promise_race();
  requireEs_promise_reject();
  requireEs_promise_resolve();
  return es_promise;
}

var es_reflect_deleteProperty = {};

var hasRequiredEs_reflect_deleteProperty;

function requireEs_reflect_deleteProperty() {
  if (hasRequiredEs_reflect_deleteProperty) return es_reflect_deleteProperty;
  hasRequiredEs_reflect_deleteProperty = 1;
  var $ = require_export();
  var anObject = requireAnObject();
  var getOwnPropertyDescriptor = requireObjectGetOwnPropertyDescriptor().f;

  // `Reflect.deleteProperty` method
  // https://tc39.es/ecma262/#sec-reflect.deleteproperty
  $(
    { target: 'Reflect', stat: true },
    {
      deleteProperty: function deleteProperty(target, propertyKey) {
        var descriptor = getOwnPropertyDescriptor(anObject(target), propertyKey);
        return descriptor && !descriptor.configurable ? false : delete target[propertyKey];
      },
    },
  );
  return es_reflect_deleteProperty;
}

var regeneratorRuntime$1 = { exports: {} };

var OverloadYield = { exports: {} };

var hasRequiredOverloadYield;

function requireOverloadYield() {
  if (hasRequiredOverloadYield) return OverloadYield.exports;
  hasRequiredOverloadYield = 1;
  (function (module) {
    function _OverloadYield(e, d) {
      ((this.v = e), (this.k = d));
    }
    ((module.exports = _OverloadYield), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(OverloadYield);
  return OverloadYield.exports;
}

var regenerator$1 = { exports: {} };

var regeneratorDefine = { exports: {} };

var hasRequiredRegeneratorDefine;

function requireRegeneratorDefine() {
  if (hasRequiredRegeneratorDefine) return regeneratorDefine.exports;
  hasRequiredRegeneratorDefine = 1;
  (function (module) {
    function _regeneratorDefine(e, r, n, t) {
      var i = Object.defineProperty;
      ((module.exports = _regeneratorDefine =
        function regeneratorDefine(e, r, n, t) {
          function o(r, n) {
            _regeneratorDefine(e, r, function (e) {
              return this._invoke(r, n, e);
            });
          }
          r
            ? i
              ? i(e, r, {
                  value: n,
                  enumerable: !t,
                  configurable: !t,
                  writable: !t,
                })
              : (e[r] = n)
            : (o('next', 0), o('throw', 1), o('return', 2));
        }),
        (module.exports.__esModule = true),
        (module.exports['default'] = module.exports),
        _regeneratorDefine(e, r, n, t));
    }
    ((module.exports = _regeneratorDefine), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(regeneratorDefine);
  return regeneratorDefine.exports;
}

var hasRequiredRegenerator$1;

function requireRegenerator$1() {
  if (hasRequiredRegenerator$1) return regenerator$1.exports;
  hasRequiredRegenerator$1 = 1;
  (function (module) {
    var regeneratorDefine = requireRegeneratorDefine();
    function _regenerator() {
      /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
      var e,
        t,
        r = 'function' == typeof Symbol ? Symbol : {},
        n = r.iterator || '@@iterator',
        o = r.toStringTag || '@@toStringTag';
      function i(r, n, o, i) {
        var c = n && n.prototype instanceof Generator ? n : Generator,
          u = Object.create(c.prototype);
        return (
          regeneratorDefine(
            u,
            '_invoke',
            (function (r, n, o) {
              var i,
                c,
                u,
                f = 0,
                p = o || [],
                y = false,
                G = {
                  p: 0,
                  n: 0,
                  v: e,
                  a: d,
                  f: d.bind(e, 4),
                  d: function d(t, r) {
                    return ((i = t), (c = 0), (u = e), (G.n = r), a);
                  },
                };
              function d(r, n) {
                for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
                  var o,
                    i = p[t],
                    d = G.p,
                    l = i[2];
                  r > 3
                    ? (o = l === n) && ((u = i[(c = i[4]) ? 5 : ((c = 3), 3)]), (i[4] = i[5] = e))
                    : i[0] <= d &&
                      ((o = r < 2 && d < i[1]) ? ((c = 0), (G.v = n), (G.n = i[1])) : d < l && (o = r < 3 || i[0] > n || n > l) && ((i[4] = r), (i[5] = n), (G.n = l), (c = 0)));
                }
                if (o || r > 1) return a;
                throw ((y = true), n);
              }
              return function (o, p, l) {
                if (f > 1) throw TypeError('Generator is already running');
                for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y; ) {
                  i || (c ? (c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : (G.n = u)) : (G.v = u));
                  try {
                    if (((f = 2), i)) {
                      if ((c || (o = 'next'), (t = i[o]))) {
                        if (!(t = t.call(i, u))) throw TypeError('iterator result is not an object');
                        if (!t.done) return t;
                        ((u = t.value), c < 2 && (c = 0));
                      } else (1 === c && (t = i['return']) && t.call(i), c < 2 && ((u = TypeError("The iterator does not provide a '" + o + "' method")), (c = 1)));
                      i = e;
                    } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
                  } catch (t) {
                    ((i = e), (c = 1), (u = t));
                  } finally {
                    f = 1;
                  }
                }
                return {
                  value: t,
                  done: y,
                };
              };
            })(r, o, i),
            true,
          ),
          u
        );
      }
      var a = {};
      function Generator() {}
      function GeneratorFunction() {}
      function GeneratorFunctionPrototype() {}
      t = Object.getPrototypeOf;
      var c = [][n]
          ? t(t([][n]()))
          : (regeneratorDefine((t = {}), n, function () {
              return this;
            }),
            t),
        u = (GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c));
      function f(e) {
        return (
          Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : ((e.__proto__ = GeneratorFunctionPrototype), regeneratorDefine(e, o, 'GeneratorFunction')),
          (e.prototype = Object.create(u)),
          e
        );
      }
      return (
        (GeneratorFunction.prototype = GeneratorFunctionPrototype),
        regeneratorDefine(u, 'constructor', GeneratorFunctionPrototype),
        regeneratorDefine(GeneratorFunctionPrototype, 'constructor', GeneratorFunction),
        (GeneratorFunction.displayName = 'GeneratorFunction'),
        regeneratorDefine(GeneratorFunctionPrototype, o, 'GeneratorFunction'),
        regeneratorDefine(u),
        regeneratorDefine(u, o, 'Generator'),
        regeneratorDefine(u, n, function () {
          return this;
        }),
        regeneratorDefine(u, 'toString', function () {
          return '[object Generator]';
        }),
        ((module.exports = _regenerator =
          function _regenerator() {
            return {
              w: i,
              m: f,
            };
          }),
        (module.exports.__esModule = true),
        (module.exports['default'] = module.exports))()
      );
    }
    ((module.exports = _regenerator), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(regenerator$1);
  return regenerator$1.exports;
}

var regeneratorAsync = { exports: {} };

var regeneratorAsyncGen = { exports: {} };

var regeneratorAsyncIterator = { exports: {} };

var hasRequiredRegeneratorAsyncIterator;

function requireRegeneratorAsyncIterator() {
  if (hasRequiredRegeneratorAsyncIterator) return regeneratorAsyncIterator.exports;
  hasRequiredRegeneratorAsyncIterator = 1;
  (function (module) {
    var OverloadYield = requireOverloadYield();
    var regeneratorDefine = requireRegeneratorDefine();
    function AsyncIterator(t, e) {
      function n(r, o, i, f) {
        try {
          var c = t[r](o),
            u = c.value;
          return u instanceof OverloadYield
            ? e.resolve(u.v).then(
                function (t) {
                  n('next', t, i, f);
                },
                function (t) {
                  n('throw', t, i, f);
                },
              )
            : e.resolve(u).then(
                function (t) {
                  ((c.value = t), i(c));
                },
                function (t) {
                  return n('throw', t, i, f);
                },
              );
        } catch (t) {
          f(t);
        }
      }
      var r;
      (this.next ||
        (regeneratorDefine(AsyncIterator.prototype),
        regeneratorDefine(AsyncIterator.prototype, ('function' == typeof Symbol && Symbol.asyncIterator) || '@asyncIterator', function () {
          return this;
        })),
        regeneratorDefine(
          this,
          '_invoke',
          function (t, o, i) {
            function f() {
              return new e(function (e, r) {
                n(t, i, e, r);
              });
            }
            return (r = r ? r.then(f, f) : f());
          },
          true,
        ));
    }
    ((module.exports = AsyncIterator), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(regeneratorAsyncIterator);
  return regeneratorAsyncIterator.exports;
}

var hasRequiredRegeneratorAsyncGen;

function requireRegeneratorAsyncGen() {
  if (hasRequiredRegeneratorAsyncGen) return regeneratorAsyncGen.exports;
  hasRequiredRegeneratorAsyncGen = 1;
  (function (module) {
    var regenerator = requireRegenerator$1();
    var regeneratorAsyncIterator = requireRegeneratorAsyncIterator();
    function _regeneratorAsyncGen(r, e, t, o, n) {
      return new regeneratorAsyncIterator(regenerator().w(r, e, t, o), n || Promise);
    }
    ((module.exports = _regeneratorAsyncGen), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(regeneratorAsyncGen);
  return regeneratorAsyncGen.exports;
}

var hasRequiredRegeneratorAsync;

function requireRegeneratorAsync() {
  if (hasRequiredRegeneratorAsync) return regeneratorAsync.exports;
  hasRequiredRegeneratorAsync = 1;
  (function (module) {
    var regeneratorAsyncGen = requireRegeneratorAsyncGen();
    function _regeneratorAsync(n, e, r, t, o) {
      var a = regeneratorAsyncGen(n, e, r, t, o);
      return a.next().then(function (n) {
        return n.done ? n.value : a.next();
      });
    }
    ((module.exports = _regeneratorAsync), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(regeneratorAsync);
  return regeneratorAsync.exports;
}

var regeneratorKeys = { exports: {} };

var hasRequiredRegeneratorKeys;

function requireRegeneratorKeys() {
  if (hasRequiredRegeneratorKeys) return regeneratorKeys.exports;
  hasRequiredRegeneratorKeys = 1;
  (function (module) {
    function _regeneratorKeys(e) {
      var n = Object(e),
        r = [];
      for (var t in n) r.unshift(t);
      return function e() {
        for (; r.length; ) if ((t = r.pop()) in n) return ((e.value = t), (e.done = false), e);
        return ((e.done = true), e);
      };
    }
    ((module.exports = _regeneratorKeys), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(regeneratorKeys);
  return regeneratorKeys.exports;
}

var regeneratorValues = { exports: {} };

var hasRequiredRegeneratorValues;

function requireRegeneratorValues() {
  if (hasRequiredRegeneratorValues) return regeneratorValues.exports;
  hasRequiredRegeneratorValues = 1;
  (function (module) {
    var _typeof = require_typeof()['default'];
    function _regeneratorValues(e) {
      if (null != e) {
        var t = e[('function' == typeof Symbol && Symbol.iterator) || '@@iterator'],
          r = 0;
        if (t) return t.call(e);
        if ('function' == typeof e.next) return e;
        if (!isNaN(e.length))
          return {
            next: function next() {
              return (
                e && r >= e.length && (e = void 0),
                {
                  value: e && e[r++],
                  done: !e,
                }
              );
            },
          };
      }
      throw new TypeError(_typeof(e) + ' is not iterable');
    }
    ((module.exports = _regeneratorValues), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(regeneratorValues);
  return regeneratorValues.exports;
}

var hasRequiredRegeneratorRuntime;

function requireRegeneratorRuntime() {
  if (hasRequiredRegeneratorRuntime) return regeneratorRuntime$1.exports;
  hasRequiredRegeneratorRuntime = 1;
  (function (module) {
    var OverloadYield = requireOverloadYield();
    var regenerator = requireRegenerator$1();
    var regeneratorAsync = requireRegeneratorAsync();
    var regeneratorAsyncGen = requireRegeneratorAsyncGen();
    var regeneratorAsyncIterator = requireRegeneratorAsyncIterator();
    var regeneratorKeys = requireRegeneratorKeys();
    var regeneratorValues = requireRegeneratorValues();
    function _regeneratorRuntime() {
      var r = regenerator(),
        e = r.m(_regeneratorRuntime),
        t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor;
      function n(r) {
        var e = 'function' == typeof r && r.constructor;
        return !!e && (e === t || 'GeneratorFunction' === (e.displayName || e.name));
      }
      var o = {
        throw: 1,
        return: 2,
        break: 3,
        continue: 3,
      };
      function a(r) {
        var e, t;
        return function (n) {
          (e ||
            ((e = {
              stop: function stop() {
                return t(n.a, 2);
              },
              catch: function _catch() {
                return n.v;
              },
              abrupt: function abrupt(r, e) {
                return t(n.a, o[r], e);
              },
              delegateYield: function delegateYield(r, o, a) {
                return ((e.resultName = o), t(n.d, regeneratorValues(r), a));
              },
              finish: function finish(r) {
                return t(n.f, r);
              },
            }),
            (t = function t(r, _t, o) {
              ((n.p = e.prev), (n.n = e.next));
              try {
                return r(_t, o);
              } finally {
                e.next = n.n;
              }
            })),
            e.resultName && ((e[e.resultName] = n.v), (e.resultName = void 0)),
            (e.sent = n.v),
            (e.next = n.n));
          try {
            return r.call(this, e);
          } finally {
            ((n.p = e.prev), (n.n = e.next));
          }
        };
      }
      return ((module.exports = _regeneratorRuntime =
        function _regeneratorRuntime() {
          return {
            wrap: function wrap(e, t, n, o) {
              return r.w(a(e), t, n, o && o.reverse());
            },
            isGeneratorFunction: n,
            mark: r.m,
            awrap: function awrap(r, e) {
              return new OverloadYield(r, e);
            },
            AsyncIterator: regeneratorAsyncIterator,
            async: function async(r, e, t, o, u) {
              return (n(e) ? regeneratorAsyncGen : regeneratorAsync)(a(r), e, t, o, u);
            },
            keys: regeneratorKeys,
            values: regeneratorValues,
          };
        }),
      (module.exports.__esModule = true),
      (module.exports['default'] = module.exports))();
    }
    ((module.exports = _regeneratorRuntime), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(regeneratorRuntime$1);
  return regeneratorRuntime$1.exports;
}

var regenerator;
var hasRequiredRegenerator;

function requireRegenerator() {
  if (hasRequiredRegenerator) return regenerator;
  hasRequiredRegenerator = 1;
  // TODO(Babel 8): Remove this file.

  var runtime = requireRegeneratorRuntime()();
  regenerator = runtime;

  // Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    if (typeof globalThis === 'object') {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function('r', 'regeneratorRuntime = r')(runtime);
    }
  }
  return regenerator;
}

var asyncToGenerator = { exports: {} };

var hasRequiredAsyncToGenerator;

function requireAsyncToGenerator() {
  if (hasRequiredAsyncToGenerator) return asyncToGenerator.exports;
  hasRequiredAsyncToGenerator = 1;
  (function (module) {
    function asyncGeneratorStep(n, t, e, r, o, a, c) {
      try {
        var i = n[a](c),
          u = i.value;
      } catch (n) {
        return void e(n);
      }
      i.done ? t(u) : Promise.resolve(u).then(r, o);
    }
    function _asyncToGenerator(n) {
      return function () {
        var t = this,
          e = arguments;
        return new Promise(function (r, o) {
          var a = n.apply(t, e);
          function _next(n) {
            asyncGeneratorStep(a, r, o, _next, _throw, 'next', n);
          }
          function _throw(n) {
            asyncGeneratorStep(a, r, o, _next, _throw, 'throw', n);
          }
          _next(void 0);
        });
      };
    }
    ((module.exports = _asyncToGenerator), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(asyncToGenerator);
  return asyncToGenerator.exports;
}

var es_array_map = {};

var isArray;
var hasRequiredIsArray;

function requireIsArray() {
  if (hasRequiredIsArray) return isArray;
  hasRequiredIsArray = 1;
  var classof = requireClassofRaw();

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  isArray =
    Array.isArray ||
    function isArray(argument) {
      return classof(argument) === 'Array';
    };
  return isArray;
}

var arraySpeciesConstructor;
var hasRequiredArraySpeciesConstructor;

function requireArraySpeciesConstructor() {
  if (hasRequiredArraySpeciesConstructor) return arraySpeciesConstructor;
  hasRequiredArraySpeciesConstructor = 1;
  var isArray = requireIsArray();
  var isConstructor = requireIsConstructor();
  var isObject = requireIsObject();
  var wellKnownSymbol = requireWellKnownSymbol();

  var SPECIES = wellKnownSymbol('species');
  var $Array = Array;

  // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  arraySpeciesConstructor = function (originalArray) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;
      else if (isObject(C)) {
        C = C[SPECIES];
        if (C === null) C = undefined;
      }
    }
    return C === undefined ? $Array : C;
  };
  return arraySpeciesConstructor;
}

var arraySpeciesCreate;
var hasRequiredArraySpeciesCreate;

function requireArraySpeciesCreate() {
  if (hasRequiredArraySpeciesCreate) return arraySpeciesCreate;
  hasRequiredArraySpeciesCreate = 1;
  var arraySpeciesConstructor = requireArraySpeciesConstructor();

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  arraySpeciesCreate = function (originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };
  return arraySpeciesCreate;
}

var arrayIteration;
var hasRequiredArrayIteration;

function requireArrayIteration() {
  if (hasRequiredArrayIteration) return arrayIteration;
  hasRequiredArrayIteration = 1;
  var bind = requireFunctionBindContext();
  var uncurryThis = requireFunctionUncurryThis();
  var IndexedObject = requireIndexedObject();
  var toObject = requireToObject();
  var lengthOfArrayLike = requireLengthOfArrayLike();
  var arraySpeciesCreate = requireArraySpeciesCreate();

  var push = uncurryThis([].push);

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
  var createMethod = function (TYPE) {
    var IS_MAP = TYPE === 1;
    var IS_FILTER = TYPE === 2;
    var IS_SOME = TYPE === 3;
    var IS_EVERY = TYPE === 4;
    var IS_FIND_INDEX = TYPE === 6;
    var IS_FILTER_REJECT = TYPE === 7;
    var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject($this);
      var self = IndexedObject(O);
      var length = lengthOfArrayLike(self);
      var boundFunction = bind(callbackfn, that);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
      var value, result;
      for (; length > index; index++)
        if (NO_HOLES || index in self) {
          value = self[index];
          result = boundFunction(value, index, O);
          if (TYPE) {
            if (IS_MAP)
              target[index] = result; // map
            else if (result)
              switch (TYPE) {
                case 3:
                  return true; // some
                case 5:
                  return value; // find
                case 6:
                  return index; // findIndex
                case 2:
                  push(target, value); // filter
              }
            else
              switch (TYPE) {
                case 4:
                  return false; // every
                case 7:
                  push(target, value); // filterReject
              }
          }
        }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod(6),
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod(7),
  };
  return arrayIteration;
}

var arrayMethodHasSpeciesSupport;
var hasRequiredArrayMethodHasSpeciesSupport;

function requireArrayMethodHasSpeciesSupport() {
  if (hasRequiredArrayMethodHasSpeciesSupport) return arrayMethodHasSpeciesSupport;
  hasRequiredArrayMethodHasSpeciesSupport = 1;
  var fails = requireFails();
  var wellKnownSymbol = requireWellKnownSymbol();
  var V8_VERSION = requireEnvironmentV8Version();

  var SPECIES = wellKnownSymbol('species');

  arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return (
      V8_VERSION >= 51 ||
      !fails(function () {
        var array = [];
        var constructor = (array.constructor = {});
        constructor[SPECIES] = function () {
          return { foo: 1 };
        };
        return array[METHOD_NAME](Boolean).foo !== 1;
      })
    );
  };
  return arrayMethodHasSpeciesSupport;
}

var hasRequiredEs_array_map;

function requireEs_array_map() {
  if (hasRequiredEs_array_map) return es_array_map;
  hasRequiredEs_array_map = 1;
  var $ = require_export();
  var $map = requireArrayIteration().map;
  var arrayMethodHasSpeciesSupport = requireArrayMethodHasSpeciesSupport();

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  $(
    { target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT },
    {
      map: function map(callbackfn /* , thisArg */) {
        return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      },
    },
  );
  return es_array_map;
}

var es_parseFloat = {};

var toString;
var hasRequiredToString;

function requireToString() {
  if (hasRequiredToString) return toString;
  hasRequiredToString = 1;
  var classof = requireClassof();

  var $String = String;

  toString = function (argument) {
    if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
    return $String(argument);
  };
  return toString;
}

var whitespaces;
var hasRequiredWhitespaces;

function requireWhitespaces() {
  if (hasRequiredWhitespaces) return whitespaces;
  hasRequiredWhitespaces = 1;
  // a string of all valid unicode whitespaces
  whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' + '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
  return whitespaces;
}

var stringTrim;
var hasRequiredStringTrim;

function requireStringTrim() {
  if (hasRequiredStringTrim) return stringTrim;
  hasRequiredStringTrim = 1;
  var uncurryThis = requireFunctionUncurryThis();
  var requireObjectCoercible = requireRequireObjectCoercible();
  var toString = requireToString();
  var whitespaces = requireWhitespaces();

  var replace = uncurryThis(''.replace);
  var ltrim = RegExp('^[' + whitespaces + ']+');
  var rtrim = RegExp('(^|[^' + whitespaces + '])[' + whitespaces + ']+$');

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod = function (TYPE) {
    return function ($this) {
      var string = toString(requireObjectCoercible($this));
      if (TYPE & 1) string = replace(string, ltrim, '');
      if (TYPE & 2) string = replace(string, rtrim, '$1');
      return string;
    };
  };

  stringTrim = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimstart
    start: createMethod(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    end: createMethod(2),
    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    trim: createMethod(3),
  };
  return stringTrim;
}

var numberParseFloat;
var hasRequiredNumberParseFloat;

function requireNumberParseFloat() {
  if (hasRequiredNumberParseFloat) return numberParseFloat;
  hasRequiredNumberParseFloat = 1;
  var globalThis = requireGlobalThis();
  var fails = requireFails();
  var uncurryThis = requireFunctionUncurryThis();
  var toString = requireToString();
  var trim = requireStringTrim().trim;
  var whitespaces = requireWhitespaces();

  var charAt = uncurryThis(''.charAt);
  var $parseFloat = globalThis.parseFloat;
  var Symbol = globalThis.Symbol;
  var ITERATOR = Symbol && Symbol.iterator;
  var FORCED =
    1 / $parseFloat(whitespaces + '-0') !== -Infinity ||
    // MS Edge 18- broken with boxed symbols
    (ITERATOR &&
      !fails(function () {
        $parseFloat(Object(ITERATOR));
      }));

  // `parseFloat` method
  // https://tc39.es/ecma262/#sec-parsefloat-string
  numberParseFloat = FORCED
    ? function parseFloat(string) {
        var trimmedString = trim(toString(string));
        var result = $parseFloat(trimmedString);
        return result === 0 && charAt(trimmedString, 0) === '-' ? -0 : result;
      }
    : $parseFloat;
  return numberParseFloat;
}

var hasRequiredEs_parseFloat;

function requireEs_parseFloat() {
  if (hasRequiredEs_parseFloat) return es_parseFloat;
  hasRequiredEs_parseFloat = 1;
  var $ = require_export();
  var $parseFloat = requireNumberParseFloat();

  // `parseFloat` method
  // https://tc39.es/ecma262/#sec-parsefloat-string
  $(
    { global: true, forced: parseFloat !== $parseFloat },
    {
      parseFloat: $parseFloat,
    },
  );
  return es_parseFloat;
}

var es_regexp_exec = {};

var regexpFlags;
var hasRequiredRegexpFlags;

function requireRegexpFlags() {
  if (hasRequiredRegexpFlags) return regexpFlags;
  hasRequiredRegexpFlags = 1;
  var anObject = requireAnObject();

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  regexpFlags = function () {
    var that = anObject(this);
    var result = '';
    if (that.hasIndices) result += 'd';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.unicodeSets) result += 'v';
    if (that.sticky) result += 'y';
    return result;
  };
  return regexpFlags;
}

var regexpStickyHelpers;
var hasRequiredRegexpStickyHelpers;

function requireRegexpStickyHelpers() {
  if (hasRequiredRegexpStickyHelpers) return regexpStickyHelpers;
  hasRequiredRegexpStickyHelpers = 1;
  var fails = requireFails();
  var globalThis = requireGlobalThis();

  // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var $RegExp = globalThis.RegExp;

  var UNSUPPORTED_Y = fails(function () {
    var re = $RegExp('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') !== null;
  });

  // UC Browser bug
  // https://github.com/zloirock/core-js/issues/1008
  var MISSED_STICKY =
    UNSUPPORTED_Y ||
    fails(function () {
      return !$RegExp('a', 'y').sticky;
    });

  var BROKEN_CARET =
    UNSUPPORTED_Y ||
    fails(function () {
      // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
      var re = $RegExp('^r', 'gy');
      re.lastIndex = 2;
      return re.exec('str') !== null;
    });

  regexpStickyHelpers = {
    BROKEN_CARET: BROKEN_CARET,
    MISSED_STICKY: MISSED_STICKY,
    UNSUPPORTED_Y: UNSUPPORTED_Y,
  };
  return regexpStickyHelpers;
}

var objectDefineProperties = {};

var objectKeys;
var hasRequiredObjectKeys;

function requireObjectKeys() {
  if (hasRequiredObjectKeys) return objectKeys;
  hasRequiredObjectKeys = 1;
  var internalObjectKeys = requireObjectKeysInternal();
  var enumBugKeys = requireEnumBugKeys();

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  objectKeys =
    Object.keys ||
    function keys(O) {
      return internalObjectKeys(O, enumBugKeys);
    };
  return objectKeys;
}

var hasRequiredObjectDefineProperties;

function requireObjectDefineProperties() {
  if (hasRequiredObjectDefineProperties) return objectDefineProperties;
  hasRequiredObjectDefineProperties = 1;
  var DESCRIPTORS = requireDescriptors();
  var V8_PROTOTYPE_DEFINE_BUG = requireV8PrototypeDefineBug();
  var definePropertyModule = requireObjectDefineProperty();
  var anObject = requireAnObject();
  var toIndexedObject = requireToIndexedObject();
  var objectKeys = requireObjectKeys();

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  objectDefineProperties.f =
    DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG
      ? Object.defineProperties
      : function defineProperties(O, Properties) {
          anObject(O);
          var props = toIndexedObject(Properties);
          var keys = objectKeys(Properties);
          var length = keys.length;
          var index = 0;
          var key;
          while (length > index) definePropertyModule.f(O, (key = keys[index++]), props[key]);
          return O;
        };
  return objectDefineProperties;
}

var objectCreate;
var hasRequiredObjectCreate;

function requireObjectCreate() {
  if (hasRequiredObjectCreate) return objectCreate;
  hasRequiredObjectCreate = 1;
  /* global ActiveXObject -- old IE, WSH */
  var anObject = requireAnObject();
  var definePropertiesModule = requireObjectDefineProperties();
  var enumBugKeys = requireEnumBugKeys();
  var hiddenKeys = requireHiddenKeys();
  var html = requireHtml();
  var documentCreateElement = requireDocumentCreateElement();
  var sharedKey = requireSharedKey();

  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO = sharedKey('IE_PROTO');

  var EmptyConstructor = function () {
    /* empty */
  };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    // eslint-disable-next-line no-useless-assignment -- avoid memory leak
    activeXDocument = null;
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) {
      /* ignore */
    }
    NullProtoObject =
      typeof document != 'undefined'
        ? document.domain && activeXDocument
          ? NullProtoObjectViaActiveX(activeXDocument) // old IE
          : NullProtoObjectViaIFrame()
        : NullProtoObjectViaActiveX(activeXDocument); // WSH
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys[IE_PROTO] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  // eslint-disable-next-line es/no-object-create -- safe
  objectCreate =
    Object.create ||
    function create(O, Properties) {
      var result;
      if (O !== null) {
        EmptyConstructor[PROTOTYPE] = anObject(O);
        result = new EmptyConstructor();
        EmptyConstructor[PROTOTYPE] = null;
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO] = O;
      } else result = NullProtoObject();
      return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
    };
  return objectCreate;
}

var regexpUnsupportedDotAll;
var hasRequiredRegexpUnsupportedDotAll;

function requireRegexpUnsupportedDotAll() {
  if (hasRequiredRegexpUnsupportedDotAll) return regexpUnsupportedDotAll;
  hasRequiredRegexpUnsupportedDotAll = 1;
  var fails = requireFails();
  var globalThis = requireGlobalThis();

  // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  var $RegExp = globalThis.RegExp;

  regexpUnsupportedDotAll = fails(function () {
    var re = $RegExp('.', 's');
    return !(re.dotAll && re.test('\n') && re.flags === 's');
  });
  return regexpUnsupportedDotAll;
}

var regexpUnsupportedNcg;
var hasRequiredRegexpUnsupportedNcg;

function requireRegexpUnsupportedNcg() {
  if (hasRequiredRegexpUnsupportedNcg) return regexpUnsupportedNcg;
  hasRequiredRegexpUnsupportedNcg = 1;
  var fails = requireFails();
  var globalThis = requireGlobalThis();

  // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
  var $RegExp = globalThis.RegExp;

  regexpUnsupportedNcg = fails(function () {
    var re = $RegExp('(?<a>b)', 'g');
    return re.exec('b').groups.a !== 'b' || 'b'.replace(re, '$<a>c') !== 'bc';
  });
  return regexpUnsupportedNcg;
}

var regexpExec;
var hasRequiredRegexpExec;

function requireRegexpExec() {
  if (hasRequiredRegexpExec) return regexpExec;
  hasRequiredRegexpExec = 1;
  /* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
  /* eslint-disable regexp/no-useless-quantifier -- testing */
  var call = requireFunctionCall();
  var uncurryThis = requireFunctionUncurryThis();
  var toString = requireToString();
  var regexpFlags = requireRegexpFlags();
  var stickyHelpers = requireRegexpStickyHelpers();
  var shared = requireShared();
  var create = requireObjectCreate();
  var getInternalState = requireInternalState().get;
  var UNSUPPORTED_DOT_ALL = requireRegexpUnsupportedDotAll();
  var UNSUPPORTED_NCG = requireRegexpUnsupportedNcg();

  var nativeReplace = shared('native-string-replace', String.prototype.replace);
  var nativeExec = RegExp.prototype.exec;
  var patchedExec = nativeExec;
  var charAt = uncurryThis(''.charAt);
  var indexOf = uncurryThis(''.indexOf);
  var replace = uncurryThis(''.replace);
  var stringSlice = uncurryThis(''.slice);

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/;
    var re2 = /b*/g;
    call(nativeExec, re1, 'a');
    call(nativeExec, re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  })();

  var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

  if (PATCH) {
    patchedExec = function exec(string) {
      var re = this;
      var state = getInternalState(re);
      var str = toString(string);
      var raw = state.raw;
      var result, reCopy, lastIndex, match, i, object, group;

      if (raw) {
        raw.lastIndex = re.lastIndex;
        result = call(patchedExec, raw, str);
        re.lastIndex = raw.lastIndex;
        return result;
      }

      var groups = state.groups;
      var sticky = UNSUPPORTED_Y && re.sticky;
      var flags = call(regexpFlags, re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;

      if (sticky) {
        flags = replace(flags, 'y', '');
        if (indexOf(flags, 'g') === -1) {
          flags += 'g';
        }

        strCopy = stringSlice(str, re.lastIndex);
        // Support anchored sticky behavior.
        if (re.lastIndex > 0 && (!re.multiline || (re.multiline && charAt(str, re.lastIndex - 1) !== '\n'))) {
          source = '(?: ' + source + ')';
          strCopy = ' ' + strCopy;
          charsAdded++;
        }
        // ^(? + rx + ) is needed, in combination with some str slicing, to
        // simulate the 'y' flag.
        reCopy = new RegExp('^(?:' + source + ')', flags);
      }

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

      match = call(nativeExec, sticky ? reCopy : re, strCopy);

      if (sticky) {
        if (match) {
          match.input = stringSlice(match.input, charsAdded);
          match[0] = stringSlice(match[0], charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
        call(nativeReplace, match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      if (match && groups) {
        match.groups = object = create(null);
        for (i = 0; i < groups.length; i++) {
          group = groups[i];
          object[group[0]] = match[group[1]];
        }
      }

      return match;
    };
  }

  regexpExec = patchedExec;
  return regexpExec;
}

var hasRequiredEs_regexp_exec;

function requireEs_regexp_exec() {
  if (hasRequiredEs_regexp_exec) return es_regexp_exec;
  hasRequiredEs_regexp_exec = 1;
  var $ = require_export();
  var exec = requireRegexpExec();

  // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec
  $(
    { target: 'RegExp', proto: true, forced: /./.exec !== exec },
    {
      exec: exec,
    },
  );
  return es_regexp_exec;
}

var es_string_match = {};

var fixRegexpWellKnownSymbolLogic;
var hasRequiredFixRegexpWellKnownSymbolLogic;

function requireFixRegexpWellKnownSymbolLogic() {
  if (hasRequiredFixRegexpWellKnownSymbolLogic) return fixRegexpWellKnownSymbolLogic;
  hasRequiredFixRegexpWellKnownSymbolLogic = 1;
  // TODO: Remove from `core-js@4` since it's moved to entry points
  requireEs_regexp_exec();
  var call = requireFunctionCall();
  var defineBuiltIn = requireDefineBuiltIn();
  var regexpExec = requireRegexpExec();
  var fails = requireFails();
  var wellKnownSymbol = requireWellKnownSymbol();
  var createNonEnumerableProperty = requireCreateNonEnumerableProperty();

  var SPECIES = wellKnownSymbol('species');
  var RegExpPrototype = RegExp.prototype;

  fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
    var SYMBOL = wellKnownSymbol(KEY);

    var DELEGATES_TO_SYMBOL = !fails(function () {
      // String methods call symbol-named RegExp methods
      var O = {};
      O[SYMBOL] = function () {
        return 7;
      };
      return ''[KEY](O) !== 7;
    });

    var DELEGATES_TO_EXEC =
      DELEGATES_TO_SYMBOL &&
      !fails(function () {
        // Symbol-named RegExp methods call .exec
        var execCalled = false;
        var re = /a/;

        if (KEY === 'split') {
          // We can't use real regex here since it causes deoptimization
          // and serious performance degradation in V8
          // https://github.com/zloirock/core-js/issues/306
          re = {};
          // RegExp[@@split] doesn't call the regex's exec method, but first creates
          // a new one. We need to return the patched regex when creating the new one.
          re.constructor = {};
          re.constructor[SPECIES] = function () {
            return re;
          };
          re.flags = '';
          re[SYMBOL] = /./[SYMBOL];
        }

        re.exec = function () {
          execCalled = true;
          return null;
        };

        re[SYMBOL]('');
        return !execCalled;
      });

    if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || FORCED) {
      var nativeRegExpMethod = /./[SYMBOL];
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var $exec = regexp.exec;
        if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: call(nativeRegExpMethod, regexp, str, arg2) };
          }
          return { done: true, value: call(nativeMethod, str, regexp, arg2) };
        }
        return { done: false };
      });

      defineBuiltIn(String.prototype, KEY, methods[0]);
      defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
    }

    if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
  };
  return fixRegexpWellKnownSymbolLogic;
}

var stringMultibyte;
var hasRequiredStringMultibyte;

function requireStringMultibyte() {
  if (hasRequiredStringMultibyte) return stringMultibyte;
  hasRequiredStringMultibyte = 1;
  var uncurryThis = requireFunctionUncurryThis();
  var toIntegerOrInfinity = requireToIntegerOrInfinity();
  var toString = requireToString();
  var requireObjectCoercible = requireRequireObjectCoercible();

  var charAt = uncurryThis(''.charAt);
  var charCodeAt = uncurryThis(''.charCodeAt);
  var stringSlice = uncurryThis(''.slice);

  var createMethod = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString(requireObjectCoercible($this));
      var position = toIntegerOrInfinity(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = charCodeAt(S, position);
      return first < 0xd800 || first > 0xdbff || position + 1 === size || (second = charCodeAt(S, position + 1)) < 0xdc00 || second > 0xdfff
        ? CONVERT_TO_STRING
          ? charAt(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice(S, position, position + 2)
          : ((first - 0xd800) << 10) + (second - 0xdc00) + 0x10000;
    };
  };

  stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod(true),
  };
  return stringMultibyte;
}

var advanceStringIndex;
var hasRequiredAdvanceStringIndex;

function requireAdvanceStringIndex() {
  if (hasRequiredAdvanceStringIndex) return advanceStringIndex;
  hasRequiredAdvanceStringIndex = 1;
  var charAt = requireStringMultibyte().charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex
  advanceStringIndex = function (S, index, unicode) {
    return index + (unicode ? charAt(S, index).length : 1);
  };
  return advanceStringIndex;
}

var regexpFlagsDetection;
var hasRequiredRegexpFlagsDetection;

function requireRegexpFlagsDetection() {
  if (hasRequiredRegexpFlagsDetection) return regexpFlagsDetection;
  hasRequiredRegexpFlagsDetection = 1;
  var globalThis = requireGlobalThis();
  var fails = requireFails();

  // babel-minify and Closure Compiler transpiles RegExp('.', 'd') -> /./d and it causes SyntaxError
  var RegExp = globalThis.RegExp;

  var FLAGS_GETTER_IS_CORRECT = !fails(function () {
    var INDICES_SUPPORT = true;
    try {
      RegExp('.', 'd');
    } catch (error) {
      INDICES_SUPPORT = false;
    }

    var O = {};
    // modern V8 bug
    var calls = '';
    var expected = INDICES_SUPPORT ? 'dgimsy' : 'gimsy';

    var addGetter = function (key, chr) {
      // eslint-disable-next-line es/no-object-defineproperty -- safe
      Object.defineProperty(O, key, {
        get: function () {
          calls += chr;
          return true;
        },
      });
    };

    var pairs = {
      dotAll: 's',
      global: 'g',
      ignoreCase: 'i',
      multiline: 'm',
      sticky: 'y',
    };

    if (INDICES_SUPPORT) pairs.hasIndices = 'd';

    for (var key in pairs) addGetter(key, pairs[key]);

    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var result = Object.getOwnPropertyDescriptor(RegExp.prototype, 'flags').get.call(O);

    return result !== expected || calls !== expected;
  });

  regexpFlagsDetection = { correct: FLAGS_GETTER_IS_CORRECT };
  return regexpFlagsDetection;
}

var regexpGetFlags;
var hasRequiredRegexpGetFlags;

function requireRegexpGetFlags() {
  if (hasRequiredRegexpGetFlags) return regexpGetFlags;
  hasRequiredRegexpGetFlags = 1;
  var call = requireFunctionCall();
  var hasOwn = requireHasOwnProperty();
  var isPrototypeOf = requireObjectIsPrototypeOf();
  var regExpFlagsDetection = requireRegexpFlagsDetection();
  var regExpFlagsGetterImplementation = requireRegexpFlags();

  var RegExpPrototype = RegExp.prototype;

  regexpGetFlags = regExpFlagsDetection.correct
    ? function (it) {
        return it.flags;
      }
    : function (it) {
        return !regExpFlagsDetection.correct && isPrototypeOf(RegExpPrototype, it) && !hasOwn(it, 'flags') ? call(regExpFlagsGetterImplementation, it) : it.flags;
      };
  return regexpGetFlags;
}

var regexpExecAbstract;
var hasRequiredRegexpExecAbstract;

function requireRegexpExecAbstract() {
  if (hasRequiredRegexpExecAbstract) return regexpExecAbstract;
  hasRequiredRegexpExecAbstract = 1;
  var call = requireFunctionCall();
  var anObject = requireAnObject();
  var isCallable = requireIsCallable();
  var classof = requireClassofRaw();
  var regexpExec = requireRegexpExec();

  var $TypeError = TypeError;

  // `RegExpExec` abstract operation
  // https://tc39.es/ecma262/#sec-regexpexec
  regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (isCallable(exec)) {
      var result = call(exec, R, S);
      if (result !== null) anObject(result);
      return result;
    }
    if (classof(R) === 'RegExp') return call(regexpExec, R, S);
    throw new $TypeError('RegExp#exec called on incompatible receiver');
  };
  return regexpExecAbstract;
}

var hasRequiredEs_string_match;

function requireEs_string_match() {
  if (hasRequiredEs_string_match) return es_string_match;
  hasRequiredEs_string_match = 1;
  var call = requireFunctionCall();
  var uncurryThis = requireFunctionUncurryThis();
  var fixRegExpWellKnownSymbolLogic = requireFixRegexpWellKnownSymbolLogic();
  var anObject = requireAnObject();
  var isObject = requireIsObject();
  var toLength = requireToLength();
  var toString = requireToString();
  var requireObjectCoercible = requireRequireObjectCoercible();
  var getMethod = requireGetMethod();
  var advanceStringIndex = requireAdvanceStringIndex();
  var getRegExpFlags = requireRegexpGetFlags();
  var regExpExec = requireRegexpExecAbstract();

  var stringIndexOf = uncurryThis(''.indexOf);

  // @@match logic
  fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
    return [
      // `String.prototype.match` method
      // https://tc39.es/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = requireObjectCoercible(this);
        var matcher = isObject(regexp) ? getMethod(regexp, MATCH) : undefined;
        return matcher ? call(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString(O));
      },
      // `RegExp.prototype[@@match]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
      function (string) {
        var rx = anObject(this);
        var S = toString(string);
        var res = maybeCallNative(nativeMatch, rx, S);

        if (res.done) return res.value;

        var flags = toString(getRegExpFlags(rx));

        if (stringIndexOf(flags, 'g') === -1) return regExpExec(rx, S);

        var fullUnicode = stringIndexOf(flags, 'u') !== -1;
        rx.lastIndex = 0;
        var A = [];
        var n = 0;
        var result;
        while ((result = regExpExec(rx, S)) !== null) {
          var matchStr = toString(result[0]);
          A[n] = matchStr;
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
          n++;
        }
        return n === 0 ? null : A;
      },
    ];
  });
  return es_string_match;
}

var es_string_replace = {};

var getSubstitution;
var hasRequiredGetSubstitution;

function requireGetSubstitution() {
  if (hasRequiredGetSubstitution) return getSubstitution;
  hasRequiredGetSubstitution = 1;
  var uncurryThis = requireFunctionUncurryThis();
  var toObject = requireToObject();

  var floor = Math.floor;
  var charAt = uncurryThis(''.charAt);
  var replace = uncurryThis(''.replace);
  var stringSlice = uncurryThis(''.slice);
  // eslint-disable-next-line redos/no-vulnerable -- safe
  var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

  // `GetSubstitution` abstract operation
  // https://tc39.es/ecma262/#sec-getsubstitution
  getSubstitution = function (matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return replace(replacement, symbols, function (match, ch) {
      var capture;
      switch (charAt(ch, 0)) {
        case '$':
          return '$';
        case '&':
          return matched;
        case '`':
          return stringSlice(str, 0, position);
        case "'":
          return stringSlice(str, tailPos);
        case '<':
          capture = namedCaptures[stringSlice(ch, 1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  };
  return getSubstitution;
}

var hasRequiredEs_string_replace;

function requireEs_string_replace() {
  if (hasRequiredEs_string_replace) return es_string_replace;
  hasRequiredEs_string_replace = 1;
  var apply = requireFunctionApply();
  var call = requireFunctionCall();
  var uncurryThis = requireFunctionUncurryThis();
  var fixRegExpWellKnownSymbolLogic = requireFixRegexpWellKnownSymbolLogic();
  var fails = requireFails();
  var anObject = requireAnObject();
  var isCallable = requireIsCallable();
  var isObject = requireIsObject();
  var toIntegerOrInfinity = requireToIntegerOrInfinity();
  var toLength = requireToLength();
  var toString = requireToString();
  var requireObjectCoercible = requireRequireObjectCoercible();
  var advanceStringIndex = requireAdvanceStringIndex();
  var getMethod = requireGetMethod();
  var getSubstitution = requireGetSubstitution();
  var getRegExpFlags = requireRegexpGetFlags();
  var regExpExec = requireRegexpExecAbstract();
  var wellKnownSymbol = requireWellKnownSymbol();

  var REPLACE = wellKnownSymbol('replace');
  var max = Math.max;
  var min = Math.min;
  var concat = uncurryThis([].concat);
  var push = uncurryThis([].push);
  var stringIndexOf = uncurryThis(''.indexOf);
  var stringSlice = uncurryThis(''.slice);

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // IE <= 11 replaces $0 with the whole match, as if it was $&
  // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
  var REPLACE_KEEPS_$0 = (function () {
    // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
    return 'a'.replace(/./, '$0') === '$0';
  })();

  // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
    if (/./[REPLACE]) {
      return /./[REPLACE]('a', '$0') === '';
    }
    return false;
  })();

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
    return ''.replace(re, '$<a>') !== '7';
  });

  // @@replace logic
  fixRegExpWellKnownSymbolLogic(
    'replace',
    function (_, nativeReplace, maybeCallNative) {
      var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

      return [
        // `String.prototype.replace` method
        // https://tc39.es/ecma262/#sec-string.prototype.replace
        function replace(searchValue, replaceValue) {
          var O = requireObjectCoercible(this);
          var replacer = isObject(searchValue) ? getMethod(searchValue, REPLACE) : undefined;
          return replacer ? call(replacer, searchValue, O, replaceValue) : call(nativeReplace, toString(O), searchValue, replaceValue);
        },
        // `RegExp.prototype[@@replace]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
        function (string, replaceValue) {
          var rx = anObject(this);
          var S = toString(string);

          if (typeof replaceValue == 'string' && stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 && stringIndexOf(replaceValue, '$<') === -1) {
            var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
            if (res.done) return res.value;
          }

          var functionalReplace = isCallable(replaceValue);
          if (!functionalReplace) replaceValue = toString(replaceValue);

          var flags = toString(getRegExpFlags(rx));
          var global = stringIndexOf(flags, 'g') !== -1;
          var fullUnicode;
          if (global) {
            fullUnicode = stringIndexOf(flags, 'u') !== -1;
            rx.lastIndex = 0;
          }

          var results = [];
          var result;
          while (true) {
            result = regExpExec(rx, S);
            if (result === null) break;

            push(results, result);
            if (!global) break;

            var matchStr = toString(result[0]);
            if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
          }

          var accumulatedResult = '';
          var nextSourcePosition = 0;
          for (var i = 0; i < results.length; i++) {
            result = results[i];

            var matched = toString(result[0]);
            var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
            var captures = [];
            var replacement;
            // NOTE: This is equivalent to
            //   captures = result.slice(1).map(maybeToString)
            // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
            // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
            // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
            for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
            var namedCaptures = result.groups;
            if (functionalReplace) {
              var replacerArgs = concat([matched], captures, position, S);
              if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
              replacement = toString(apply(replaceValue, undefined, replacerArgs));
            } else {
              replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
            }
            if (position >= nextSourcePosition) {
              accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
              nextSourcePosition = position + matched.length;
            }
          }

          return accumulatedResult + stringSlice(S, nextSourcePosition);
        },
      ];
    },
    !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,
  );
  return es_string_replace;
}

var es_string_startsWith = {};

var isRegexp;
var hasRequiredIsRegexp;

function requireIsRegexp() {
  if (hasRequiredIsRegexp) return isRegexp;
  hasRequiredIsRegexp = 1;
  var isObject = requireIsObject();
  var classof = requireClassofRaw();
  var wellKnownSymbol = requireWellKnownSymbol();

  var MATCH = wellKnownSymbol('match');

  // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp
  isRegexp = function (it) {
    var isRegExp;
    return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) === 'RegExp');
  };
  return isRegexp;
}

var notARegexp;
var hasRequiredNotARegexp;

function requireNotARegexp() {
  if (hasRequiredNotARegexp) return notARegexp;
  hasRequiredNotARegexp = 1;
  var isRegExp = requireIsRegexp();

  var $TypeError = TypeError;

  notARegexp = function (it) {
    if (isRegExp(it)) {
      throw new $TypeError("The method doesn't accept regular expressions");
    }
    return it;
  };
  return notARegexp;
}

var correctIsRegexpLogic;
var hasRequiredCorrectIsRegexpLogic;

function requireCorrectIsRegexpLogic() {
  if (hasRequiredCorrectIsRegexpLogic) return correctIsRegexpLogic;
  hasRequiredCorrectIsRegexpLogic = 1;
  var wellKnownSymbol = requireWellKnownSymbol();

  var MATCH = wellKnownSymbol('match');

  correctIsRegexpLogic = function (METHOD_NAME) {
    var regexp = /./;
    try {
      '/./'[METHOD_NAME](regexp);
    } catch (error1) {
      try {
        regexp[MATCH] = false;
        return '/./'[METHOD_NAME](regexp);
      } catch (error2) {
        /* empty */
      }
    }
    return false;
  };
  return correctIsRegexpLogic;
}

var hasRequiredEs_string_startsWith;

function requireEs_string_startsWith() {
  if (hasRequiredEs_string_startsWith) return es_string_startsWith;
  hasRequiredEs_string_startsWith = 1;
  var $ = require_export();
  var uncurryThis = requireFunctionUncurryThisClause();
  var getOwnPropertyDescriptor = requireObjectGetOwnPropertyDescriptor().f;
  var toLength = requireToLength();
  var toString = requireToString();
  var notARegExp = requireNotARegexp();
  var requireObjectCoercible = requireRequireObjectCoercible();
  var correctIsRegExpLogic = requireCorrectIsRegexpLogic();
  var IS_PURE = requireIsPure();

  var stringSlice = uncurryThis(''.slice);
  var min = Math.min;

  var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
  // https://github.com/zloirock/core-js/pull/702
  var MDN_POLYFILL_BUG =
    !IS_PURE &&
    !CORRECT_IS_REGEXP_LOGIC &&
    !!(function () {
      var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
      return descriptor && !descriptor.writable;
    })();

  // `String.prototype.startsWith` method
  // https://tc39.es/ecma262/#sec-string.prototype.startswith
  $(
    { target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC },
    {
      startsWith: function startsWith(searchString /* , position = 0 */) {
        var that = toString(requireObjectCoercible(this));
        notARegExp(searchString);
        var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
        var search = toString(searchString);
        return stringSlice(that, index, index + search.length) === search;
      },
    },
  );
  return es_string_startsWith;
}

var es_array_join = {};

var arrayMethodIsStrict;
var hasRequiredArrayMethodIsStrict;

function requireArrayMethodIsStrict() {
  if (hasRequiredArrayMethodIsStrict) return arrayMethodIsStrict;
  hasRequiredArrayMethodIsStrict = 1;
  var fails = requireFails();

  arrayMethodIsStrict = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return (
      !!method &&
      fails(function () {
        // eslint-disable-next-line no-useless-call -- required for testing
        method.call(
          null,
          argument ||
            function () {
              return 1;
            },
          1,
        );
      })
    );
  };
  return arrayMethodIsStrict;
}

var hasRequiredEs_array_join;

function requireEs_array_join() {
  if (hasRequiredEs_array_join) return es_array_join;
  hasRequiredEs_array_join = 1;
  var $ = require_export();
  var uncurryThis = requireFunctionUncurryThis();
  var IndexedObject = requireIndexedObject();
  var toIndexedObject = requireToIndexedObject();
  var arrayMethodIsStrict = requireArrayMethodIsStrict();

  var nativeJoin = uncurryThis([].join);

  var ES3_STRINGS = IndexedObject !== Object;
  var FORCED = ES3_STRINGS || !arrayMethodIsStrict('join', ',');

  // `Array.prototype.join` method
  // https://tc39.es/ecma262/#sec-array.prototype.join
  $(
    { target: 'Array', proto: true, forced: FORCED },
    {
      join: function join(separator) {
        return nativeJoin(toIndexedObject(this), separator === undefined ? ',' : separator);
      },
    },
  );
  return es_array_join;
}

var slicedToArray = { exports: {} };

var arrayWithHoles = { exports: {} };

var hasRequiredArrayWithHoles;

function requireArrayWithHoles() {
  if (hasRequiredArrayWithHoles) return arrayWithHoles.exports;
  hasRequiredArrayWithHoles = 1;
  (function (module) {
    function _arrayWithHoles(r) {
      if (Array.isArray(r)) return r;
    }
    ((module.exports = _arrayWithHoles), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(arrayWithHoles);
  return arrayWithHoles.exports;
}

var iterableToArrayLimit = { exports: {} };

var hasRequiredIterableToArrayLimit;

function requireIterableToArrayLimit() {
  if (hasRequiredIterableToArrayLimit) return iterableToArrayLimit.exports;
  hasRequiredIterableToArrayLimit = 1;
  (function (module) {
    function _iterableToArrayLimit(r, l) {
      var t = null == r ? null : ('undefined' != typeof Symbol && r[Symbol.iterator]) || r['@@iterator'];
      if (null != t) {
        var e,
          n,
          i,
          u,
          a = [],
          f = true,
          o = false;
        try {
          if (((i = (t = t.call(r)).next), 0 === l)) {
            if (Object(t) !== t) return;
            f = false;
          } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true);
        } catch (r) {
          ((o = true), (n = r));
        } finally {
          try {
            if (!f && null != t['return'] && ((u = t['return']()), Object(u) !== u)) return;
          } finally {
            if (o) throw n;
          }
        }
        return a;
      }
    }
    ((module.exports = _iterableToArrayLimit), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(iterableToArrayLimit);
  return iterableToArrayLimit.exports;
}

var unsupportedIterableToArray = { exports: {} };

var arrayLikeToArray = { exports: {} };

var hasRequiredArrayLikeToArray;

function requireArrayLikeToArray() {
  if (hasRequiredArrayLikeToArray) return arrayLikeToArray.exports;
  hasRequiredArrayLikeToArray = 1;
  (function (module) {
    function _arrayLikeToArray(r, a) {
      (null == a || a > r.length) && (a = r.length);
      for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
      return n;
    }
    ((module.exports = _arrayLikeToArray), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(arrayLikeToArray);
  return arrayLikeToArray.exports;
}

var hasRequiredUnsupportedIterableToArray;

function requireUnsupportedIterableToArray() {
  if (hasRequiredUnsupportedIterableToArray) return unsupportedIterableToArray.exports;
  hasRequiredUnsupportedIterableToArray = 1;
  (function (module) {
    var arrayLikeToArray = requireArrayLikeToArray();
    function _unsupportedIterableToArray(r, a) {
      if (r) {
        if ('string' == typeof r) return arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return (
          'Object' === t && r.constructor && (t = r.constructor.name),
          'Map' === t || 'Set' === t ? Array.from(r) : 'Arguments' === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? arrayLikeToArray(r, a) : void 0
        );
      }
    }
    ((module.exports = _unsupportedIterableToArray), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(unsupportedIterableToArray);
  return unsupportedIterableToArray.exports;
}

var nonIterableRest = { exports: {} };

var hasRequiredNonIterableRest;

function requireNonIterableRest() {
  if (hasRequiredNonIterableRest) return nonIterableRest.exports;
  hasRequiredNonIterableRest = 1;
  (function (module) {
    function _nonIterableRest() {
      throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
    }
    ((module.exports = _nonIterableRest), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(nonIterableRest);
  return nonIterableRest.exports;
}

var hasRequiredSlicedToArray;

function requireSlicedToArray() {
  if (hasRequiredSlicedToArray) return slicedToArray.exports;
  hasRequiredSlicedToArray = 1;
  (function (module) {
    var arrayWithHoles = requireArrayWithHoles();
    var iterableToArrayLimit = requireIterableToArrayLimit();
    var unsupportedIterableToArray = requireUnsupportedIterableToArray();
    var nonIterableRest = requireNonIterableRest();
    function _slicedToArray(r, e) {
      return arrayWithHoles(r) || iterableToArrayLimit(r, e) || unsupportedIterableToArray(r, e) || nonIterableRest();
    }
    ((module.exports = _slicedToArray), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(slicedToArray);
  return slicedToArray.exports;
}

var defineProperty = { exports: {} };

var toPropertyKey = { exports: {} };

var toPrimitive = { exports: {} };

var hasRequiredToPrimitive;

function requireToPrimitive() {
  if (hasRequiredToPrimitive) return toPrimitive.exports;
  hasRequiredToPrimitive = 1;
  (function (module) {
    var _typeof = require_typeof()['default'];
    function toPrimitive(t, r) {
      if ('object' != _typeof(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || 'default');
        if ('object' != _typeof(i)) return i;
        throw new TypeError('@@toPrimitive must return a primitive value.');
      }
      return ('string' === r ? String : Number)(t);
    }
    ((module.exports = toPrimitive), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(toPrimitive);
  return toPrimitive.exports;
}

var hasRequiredToPropertyKey;

function requireToPropertyKey() {
  if (hasRequiredToPropertyKey) return toPropertyKey.exports;
  hasRequiredToPropertyKey = 1;
  (function (module) {
    var _typeof = require_typeof()['default'];
    var toPrimitive = requireToPrimitive();
    function toPropertyKey(t) {
      var i = toPrimitive(t, 'string');
      return 'symbol' == _typeof(i) ? i : i + '';
    }
    ((module.exports = toPropertyKey), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(toPropertyKey);
  return toPropertyKey.exports;
}

var hasRequiredDefineProperty;

function requireDefineProperty() {
  if (hasRequiredDefineProperty) return defineProperty.exports;
  hasRequiredDefineProperty = 1;
  (function (module) {
    var toPropertyKey = requireToPropertyKey();
    function _defineProperty(e, r, t) {
      return (
        (r = toPropertyKey(r)) in e
          ? Object.defineProperty(e, r, {
              value: t,
              enumerable: true,
              configurable: true,
              writable: true,
            })
          : (e[r] = t),
        e
      );
    }
    ((module.exports = _defineProperty), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(defineProperty);
  return defineProperty.exports;
}

var classCallCheck = { exports: {} };

var hasRequiredClassCallCheck;

function requireClassCallCheck() {
  if (hasRequiredClassCallCheck) return classCallCheck.exports;
  hasRequiredClassCallCheck = 1;
  (function (module) {
    function _classCallCheck(a, n) {
      if (!(a instanceof n)) throw new TypeError('Cannot call a class as a function');
    }
    ((module.exports = _classCallCheck), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(classCallCheck);
  return classCallCheck.exports;
}

var createClass = { exports: {} };

var hasRequiredCreateClass;

function requireCreateClass() {
  if (hasRequiredCreateClass) return createClass.exports;
  hasRequiredCreateClass = 1;
  (function (module) {
    var toPropertyKey = requireToPropertyKey();
    function _defineProperties(e, r) {
      for (var t = 0; t < r.length; t++) {
        var o = r[t];
        ((o.enumerable = o.enumerable || false), (o.configurable = true), 'value' in o && (o.writable = true), Object.defineProperty(e, toPropertyKey(o.key), o));
      }
    }
    function _createClass(e, r, t) {
      return (
        r && _defineProperties(e.prototype, r),
        t && _defineProperties(e, t),
        Object.defineProperty(e, 'prototype', {
          writable: false,
        }),
        e
      );
    }
    ((module.exports = _createClass), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(createClass);
  return createClass.exports;
}

var es_array_concat = {};

var doesNotExceedSafeInteger;
var hasRequiredDoesNotExceedSafeInteger;

function requireDoesNotExceedSafeInteger() {
  if (hasRequiredDoesNotExceedSafeInteger) return doesNotExceedSafeInteger;
  hasRequiredDoesNotExceedSafeInteger = 1;
  var $TypeError = TypeError;
  var MAX_SAFE_INTEGER = 0x1fffffffffffff; // 2 ** 53 - 1 == 9007199254740991

  doesNotExceedSafeInteger = function (it) {
    if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
    return it;
  };
  return doesNotExceedSafeInteger;
}

var createProperty;
var hasRequiredCreateProperty;

function requireCreateProperty() {
  if (hasRequiredCreateProperty) return createProperty;
  hasRequiredCreateProperty = 1;
  var DESCRIPTORS = requireDescriptors();
  var definePropertyModule = requireObjectDefineProperty();
  var createPropertyDescriptor = requireCreatePropertyDescriptor();

  createProperty = function (object, key, value) {
    if (DESCRIPTORS) definePropertyModule.f(object, key, createPropertyDescriptor(0, value));
    else object[key] = value;
  };
  return createProperty;
}

var hasRequiredEs_array_concat;

function requireEs_array_concat() {
  if (hasRequiredEs_array_concat) return es_array_concat;
  hasRequiredEs_array_concat = 1;
  var $ = require_export();
  var fails = requireFails();
  var isArray = requireIsArray();
  var isObject = requireIsObject();
  var toObject = requireToObject();
  var lengthOfArrayLike = requireLengthOfArrayLike();
  var doesNotExceedSafeInteger = requireDoesNotExceedSafeInteger();
  var createProperty = requireCreateProperty();
  var arraySpeciesCreate = requireArraySpeciesCreate();
  var arrayMethodHasSpeciesSupport = requireArrayMethodHasSpeciesSupport();
  var wellKnownSymbol = requireWellKnownSymbol();
  var V8_VERSION = requireEnvironmentV8Version();

  var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT =
    V8_VERSION >= 51 ||
    !fails(function () {
      var array = [];
      array[IS_CONCAT_SPREADABLE] = false;
      return array.concat()[0] !== array;
    });

  var isConcatSpreadable = function (O) {
    if (!isObject(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray(O);
  };

  var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport('concat');

  // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  $(
    { target: 'Array', proto: true, arity: 1, forced: FORCED },
    {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      concat: function concat(arg) {
        var O = toObject(this);
        var A = arraySpeciesCreate(O, 0);
        var n = 0;
        var i, k, length, len, E;
        for (i = -1, length = arguments.length; i < length; i++) {
          E = i === -1 ? O : arguments[i];
          if (isConcatSpreadable(E)) {
            len = lengthOfArrayLike(E);
            doesNotExceedSafeInteger(n + len);
            for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
          } else {
            doesNotExceedSafeInteger(n + 1);
            createProperty(A, n++, E);
          }
        }
        A.length = n;
        return A;
      },
    },
  );
  return es_array_concat;
}

var es_array_every = {};

var hasRequiredEs_array_every;

function requireEs_array_every() {
  if (hasRequiredEs_array_every) return es_array_every;
  hasRequiredEs_array_every = 1;
  var $ = require_export();
  var $every = requireArrayIteration().every;
  var arrayMethodIsStrict = requireArrayMethodIsStrict();

  var STRICT_METHOD = arrayMethodIsStrict('every');

  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  $(
    { target: 'Array', proto: true, forced: !STRICT_METHOD },
    {
      every: function every(callbackfn /* , thisArg */) {
        return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      },
    },
  );
  return es_array_every;
}

var es_array_reduce = {};

var arrayReduce;
var hasRequiredArrayReduce;

function requireArrayReduce() {
  if (hasRequiredArrayReduce) return arrayReduce;
  hasRequiredArrayReduce = 1;
  var aCallable = requireACallable();
  var toObject = requireToObject();
  var IndexedObject = requireIndexedObject();
  var lengthOfArrayLike = requireLengthOfArrayLike();

  var $TypeError = TypeError;

  var REDUCE_EMPTY = 'Reduce of empty array with no initial value';

  // `Array.prototype.{ reduce, reduceRight }` methods implementation
  var createMethod = function (IS_RIGHT) {
    return function (that, callbackfn, argumentsLength, memo) {
      var O = toObject(that);
      var self = IndexedObject(O);
      var length = lengthOfArrayLike(O);
      aCallable(callbackfn);
      if (length === 0 && argumentsLength < 2) throw new $TypeError(REDUCE_EMPTY);
      var index = IS_RIGHT ? length - 1 : 0;
      var i = IS_RIGHT ? -1 : 1;
      if (argumentsLength < 2)
        while (true) {
          if (index in self) {
            memo = self[index];
            index += i;
            break;
          }
          index += i;
          if (IS_RIGHT ? index < 0 : length <= index) {
            throw new $TypeError(REDUCE_EMPTY);
          }
        }
      for (; IS_RIGHT ? index >= 0 : length > index; index += i)
        if (index in self) {
          memo = callbackfn(memo, self[index], index, O);
        }
      return memo;
    };
  };

  arrayReduce = {
    // `Array.prototype.reduce` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduce
    left: createMethod(false),
    // `Array.prototype.reduceRight` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduceright
    right: createMethod(true),
  };
  return arrayReduce;
}

var hasRequiredEs_array_reduce;

function requireEs_array_reduce() {
  if (hasRequiredEs_array_reduce) return es_array_reduce;
  hasRequiredEs_array_reduce = 1;
  var $ = require_export();
  var $reduce = requireArrayReduce().left;
  var arrayMethodIsStrict = requireArrayMethodIsStrict();
  var CHROME_VERSION = requireEnvironmentV8Version();
  var IS_NODE = requireEnvironmentIsNode();

  // Chrome 80-82 has a critical bug
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
  var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;
  var FORCED = CHROME_BUG || !arrayMethodIsStrict('reduce');

  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  $(
    { target: 'Array', proto: true, forced: FORCED },
    {
      reduce: function reduce(callbackfn /* , initialValue */) {
        var length = arguments.length;
        return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
      },
    },
  );
  return es_array_reduce;
}

var es_string_endsWith = {};

var hasRequiredEs_string_endsWith;

function requireEs_string_endsWith() {
  if (hasRequiredEs_string_endsWith) return es_string_endsWith;
  hasRequiredEs_string_endsWith = 1;
  var $ = require_export();
  var uncurryThis = requireFunctionUncurryThisClause();
  var getOwnPropertyDescriptor = requireObjectGetOwnPropertyDescriptor().f;
  var toLength = requireToLength();
  var toString = requireToString();
  var notARegExp = requireNotARegexp();
  var requireObjectCoercible = requireRequireObjectCoercible();
  var correctIsRegExpLogic = requireCorrectIsRegexpLogic();
  var IS_PURE = requireIsPure();

  var slice = uncurryThis(''.slice);
  var min = Math.min;

  var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('endsWith');
  // https://github.com/zloirock/core-js/pull/702
  var MDN_POLYFILL_BUG =
    !IS_PURE &&
    !CORRECT_IS_REGEXP_LOGIC &&
    !!(function () {
      var descriptor = getOwnPropertyDescriptor(String.prototype, 'endsWith');
      return descriptor && !descriptor.writable;
    })();

  // `String.prototype.endsWith` method
  // https://tc39.es/ecma262/#sec-string.prototype.endswith
  $(
    { target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC },
    {
      endsWith: function endsWith(searchString /* , endPosition = @length */) {
        var that = toString(requireObjectCoercible(this));
        notARegExp(searchString);
        var endPosition = arguments.length > 1 ? arguments[1] : undefined;
        var len = that.length;
        var end = endPosition === undefined ? len : min(toLength(endPosition), len);
        var search = toString(searchString);
        return slice(that, end - search.length, end) === search;
      },
    },
  );
  return es_string_endsWith;
}

var es_string_split = {};

var hasRequiredEs_string_split;

function requireEs_string_split() {
  if (hasRequiredEs_string_split) return es_string_split;
  hasRequiredEs_string_split = 1;
  var call = requireFunctionCall();
  var uncurryThis = requireFunctionUncurryThis();
  var fixRegExpWellKnownSymbolLogic = requireFixRegexpWellKnownSymbolLogic();
  var anObject = requireAnObject();
  var isObject = requireIsObject();
  var requireObjectCoercible = requireRequireObjectCoercible();
  var speciesConstructor = requireSpeciesConstructor();
  var advanceStringIndex = requireAdvanceStringIndex();
  var toLength = requireToLength();
  var toString = requireToString();
  var getMethod = requireGetMethod();
  var regExpExec = requireRegexpExecAbstract();
  var stickyHelpers = requireRegexpStickyHelpers();
  var fails = requireFails();

  var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
  var MAX_UINT32 = 0xffffffff;
  var min = Math.min;
  var push = uncurryThis([].push);
  var stringSlice = uncurryThis(''.slice);

  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  // Weex JS has frozen built-in prototypes, so use try / catch wrapper
  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function () {
      return originalExec.apply(this, arguments);
    };
    var result = 'ab'.split(re);
    return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
  });

  var BUGGY =
    'abbc'.split(/(b)*/)[1] === 'c' ||
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length !== 4 ||
    'ab'.split(/(?:ab)*/).length !== 2 ||
    '.'.split(/(.?)(.?)/).length !== 4 ||
    // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length;

  // @@split logic
  fixRegExpWellKnownSymbolLogic(
    'split',
    function (SPLIT, nativeSplit, maybeCallNative) {
      var internalSplit = '0'.split(undefined, 0).length
        ? function (separator, limit) {
            return separator === undefined && limit === 0 ? [] : call(nativeSplit, this, separator, limit);
          }
        : nativeSplit;

      return [
        // `String.prototype.split` method
        // https://tc39.es/ecma262/#sec-string.prototype.split
        function split(separator, limit) {
          var O = requireObjectCoercible(this);
          var splitter = isObject(separator) ? getMethod(separator, SPLIT) : undefined;
          return splitter ? call(splitter, separator, O, limit) : call(internalSplit, toString(O), separator, limit);
        },
        // `RegExp.prototype[@@split]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
        //
        // NOTE: This cannot be properly polyfilled in engines that don't support
        // the 'y' flag.
        function (string, limit) {
          var rx = anObject(this);
          var S = toString(string);

          if (!BUGGY) {
            var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);
            if (res.done) return res.value;
          }

          var C = speciesConstructor(rx, RegExp);
          var unicodeMatching = rx.unicode;
          var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (UNSUPPORTED_Y ? 'g' : 'y');
          // ^(? + rx + ) is needed, in combination with some S slicing, to
          // simulate the 'y' flag.
          var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
          var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
          if (lim === 0) return [];
          if (S.length === 0) return regExpExec(splitter, S) === null ? [S] : [];
          var p = 0;
          var q = 0;
          var A = [];
          while (q < S.length) {
            splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
            var z = regExpExec(splitter, UNSUPPORTED_Y ? stringSlice(S, q) : S);
            var e;
            if (z === null || (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p) {
              q = advanceStringIndex(S, q, unicodeMatching);
            } else {
              push(A, stringSlice(S, p, q));
              if (A.length === lim) return A;
              for (var i = 1; i <= z.length - 1; i++) {
                push(A, z[i]);
                if (A.length === lim) return A;
              }
              q = p = e;
            }
          }
          push(A, stringSlice(S, p));
          return A;
        },
      ];
    },
    BUGGY || !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC,
    UNSUPPORTED_Y,
  );
  return es_string_split;
}

var raf = { exports: {} };

var performanceNow$1 = { exports: {} };

var performanceNow = performanceNow$1.exports;

var hasRequiredPerformanceNow;

function requirePerformanceNow() {
  if (hasRequiredPerformanceNow) return performanceNow$1.exports;
  hasRequiredPerformanceNow = 1;
  // Generated by CoffeeScript 1.12.2
  (function () {
    var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

    if (typeof performance !== 'undefined' && performance !== null && performance.now) {
      performanceNow$1.exports = function () {
        return performance.now();
      };
    } else if (typeof process !== 'undefined' && process !== null && process.hrtime) {
      performanceNow$1.exports = function () {
        return (getNanoSeconds() - nodeLoadTime) / 1e6;
      };
      hrtime = process.hrtime;
      getNanoSeconds = function () {
        var hr;
        hr = hrtime();
        return hr[0] * 1e9 + hr[1];
      };
      moduleLoadTime = getNanoSeconds();
      upTime = process.uptime() * 1e9;
      nodeLoadTime = moduleLoadTime - upTime;
    } else if (Date.now) {
      performanceNow$1.exports = function () {
        return Date.now() - loadTime;
      };
      loadTime = Date.now();
    } else {
      performanceNow$1.exports = function () {
        return new Date().getTime() - loadTime;
      };
      loadTime = new Date().getTime();
    }
  }).call(performanceNow);

  return performanceNow$1.exports;
}

var hasRequiredRaf;

function requireRaf() {
  if (hasRequiredRaf) return raf.exports;
  hasRequiredRaf = 1;
  var now = requirePerformanceNow(),
    root = typeof window === 'undefined' ? commonjsGlobal : window,
    vendors = ['moz', 'webkit'],
    suffix = 'AnimationFrame',
    raf$1 = root['request' + suffix],
    caf = root['cancel' + suffix] || root['cancelRequest' + suffix];

  for (var i = 0; !raf$1 && i < vendors.length; i++) {
    raf$1 = root[vendors[i] + 'Request' + suffix];
    caf = root[vendors[i] + 'Cancel' + suffix] || root[vendors[i] + 'CancelRequest' + suffix];
  }

  // Some versions of FF have rAF but not cAF
  if (!raf$1 || !caf) {
    var last = 0,
      id = 0,
      queue = [],
      frameDuration = 1000 / 60;

    raf$1 = function (callback) {
      if (queue.length === 0) {
        var _now = now(),
          next = Math.max(0, frameDuration - (_now - last));
        last = next + _now;
        setTimeout(function () {
          var cp = queue.slice(0);
          // Clear queue here to prevent
          // callbacks from appending listeners
          // to the current frame's queue
          queue.length = 0;
          for (var i = 0; i < cp.length; i++) {
            if (!cp[i].cancelled) {
              try {
                cp[i].callback(last);
              } catch (e) {
                setTimeout(function () {
                  throw e;
                }, 0);
              }
            }
          }
        }, Math.round(next));
      }
      queue.push({
        handle: ++id,
        callback: callback,
        cancelled: false,
      });
      return id;
    };

    caf = function (handle) {
      for (var i = 0; i < queue.length; i++) {
        if (queue[i].handle === handle) {
          queue[i].cancelled = true;
        }
      }
    };
  }

  raf.exports = function (fn) {
    // Wrap in a new function to prevent
    // `cancel` potentially being assigned
    // to the native rAF function
    return raf$1.call(root, fn);
  };
  raf.exports.cancel = function () {
    caf.apply(root, arguments);
  };
  raf.exports.polyfill = function (object) {
    if (!object) {
      object = root;
    }
    object.requestAnimationFrame = raf$1;
    object.cancelAnimationFrame = caf;
  };
  return raf.exports;
}

var es_function_name = {};

var hasRequiredEs_function_name;

function requireEs_function_name() {
  if (hasRequiredEs_function_name) return es_function_name;
  hasRequiredEs_function_name = 1;
  var DESCRIPTORS = requireDescriptors();
  var FUNCTION_NAME_EXISTS = requireFunctionName().EXISTS;
  var uncurryThis = requireFunctionUncurryThis();
  var defineBuiltInAccessor = requireDefineBuiltInAccessor();

  var FunctionPrototype = Function.prototype;
  var functionToString = uncurryThis(FunctionPrototype.toString);
  var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
  var regExpExec = uncurryThis(nameRE.exec);
  var NAME = 'name';

  // Function instances `.name` property
  // https://tc39.es/ecma262/#sec-function-instances-name
  if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
    defineBuiltInAccessor(FunctionPrototype, NAME, {
      configurable: true,
      get: function () {
        try {
          return regExpExec(nameRE, functionToString(this))[1];
        } catch (error) {
          return '';
        }
      },
    });
  }
  return es_function_name;
}

var es_string_trim = {};

var stringTrimForced;
var hasRequiredStringTrimForced;

function requireStringTrimForced() {
  if (hasRequiredStringTrimForced) return stringTrimForced;
  hasRequiredStringTrimForced = 1;
  var PROPER_FUNCTION_NAME = requireFunctionName().PROPER;
  var fails = requireFails();
  var whitespaces = requireWhitespaces();

  var non = '\u200B\u0085\u180E';

  // check that a method works with the correct list
  // of whitespaces and has a correct name
  stringTrimForced = function (METHOD_NAME) {
    return fails(function () {
      return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() !== non || (PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME);
    });
  };
  return stringTrimForced;
}

var hasRequiredEs_string_trim;

function requireEs_string_trim() {
  if (hasRequiredEs_string_trim) return es_string_trim;
  hasRequiredEs_string_trim = 1;
  var $ = require_export();
  var $trim = requireStringTrim().trim;
  var forcedStringTrimMethod = requireStringTrimForced();

  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  $(
    { target: 'String', proto: true, forced: forcedStringTrimMethod('trim') },
    {
      trim: function trim() {
        return $trim(this);
      },
    },
  );
  return es_string_trim;
}

/*
	Based on rgbcolor.js by Stoyan Stefanov <sstoo@gmail.com>
	http://www.phpied.com/rgb-color-parser-in-javascript/
*/

var rgbcolor;
var hasRequiredRgbcolor;

function requireRgbcolor() {
  if (hasRequiredRgbcolor) return rgbcolor;
  hasRequiredRgbcolor = 1;
  rgbcolor = function (color_string) {
    this.ok = false;
    this.alpha = 1.0;

    // strip any leading #
    if (color_string.charAt(0) == '#') {
      // remove # if any
      color_string = color_string.substr(1, 6);
    }

    color_string = color_string.replace(/ /g, '');
    color_string = color_string.toLowerCase();

    // before getting into regexps, try simple matches
    // and overwrite the input
    var simple_colors = {
      aliceblue: 'f0f8ff',
      antiquewhite: 'faebd7',
      aqua: '00ffff',
      aquamarine: '7fffd4',
      azure: 'f0ffff',
      beige: 'f5f5dc',
      bisque: 'ffe4c4',
      black: '000000',
      blanchedalmond: 'ffebcd',
      blue: '0000ff',
      blueviolet: '8a2be2',
      brown: 'a52a2a',
      burlywood: 'deb887',
      cadetblue: '5f9ea0',
      chartreuse: '7fff00',
      chocolate: 'd2691e',
      coral: 'ff7f50',
      cornflowerblue: '6495ed',
      cornsilk: 'fff8dc',
      crimson: 'dc143c',
      cyan: '00ffff',
      darkblue: '00008b',
      darkcyan: '008b8b',
      darkgoldenrod: 'b8860b',
      darkgray: 'a9a9a9',
      darkgreen: '006400',
      darkkhaki: 'bdb76b',
      darkmagenta: '8b008b',
      darkolivegreen: '556b2f',
      darkorange: 'ff8c00',
      darkorchid: '9932cc',
      darkred: '8b0000',
      darksalmon: 'e9967a',
      darkseagreen: '8fbc8f',
      darkslateblue: '483d8b',
      darkslategray: '2f4f4f',
      darkturquoise: '00ced1',
      darkviolet: '9400d3',
      deeppink: 'ff1493',
      deepskyblue: '00bfff',
      dimgray: '696969',
      dodgerblue: '1e90ff',
      feldspar: 'd19275',
      firebrick: 'b22222',
      floralwhite: 'fffaf0',
      forestgreen: '228b22',
      fuchsia: 'ff00ff',
      gainsboro: 'dcdcdc',
      ghostwhite: 'f8f8ff',
      gold: 'ffd700',
      goldenrod: 'daa520',
      gray: '808080',
      green: '008000',
      greenyellow: 'adff2f',
      honeydew: 'f0fff0',
      hotpink: 'ff69b4',
      indianred: 'cd5c5c',
      indigo: '4b0082',
      ivory: 'fffff0',
      khaki: 'f0e68c',
      lavender: 'e6e6fa',
      lavenderblush: 'fff0f5',
      lawngreen: '7cfc00',
      lemonchiffon: 'fffacd',
      lightblue: 'add8e6',
      lightcoral: 'f08080',
      lightcyan: 'e0ffff',
      lightgoldenrodyellow: 'fafad2',
      lightgrey: 'd3d3d3',
      lightgreen: '90ee90',
      lightpink: 'ffb6c1',
      lightsalmon: 'ffa07a',
      lightseagreen: '20b2aa',
      lightskyblue: '87cefa',
      lightslateblue: '8470ff',
      lightslategray: '778899',
      lightsteelblue: 'b0c4de',
      lightyellow: 'ffffe0',
      lime: '00ff00',
      limegreen: '32cd32',
      linen: 'faf0e6',
      magenta: 'ff00ff',
      maroon: '800000',
      mediumaquamarine: '66cdaa',
      mediumblue: '0000cd',
      mediumorchid: 'ba55d3',
      mediumpurple: '9370d8',
      mediumseagreen: '3cb371',
      mediumslateblue: '7b68ee',
      mediumspringgreen: '00fa9a',
      mediumturquoise: '48d1cc',
      mediumvioletred: 'c71585',
      midnightblue: '191970',
      mintcream: 'f5fffa',
      mistyrose: 'ffe4e1',
      moccasin: 'ffe4b5',
      navajowhite: 'ffdead',
      navy: '000080',
      oldlace: 'fdf5e6',
      olive: '808000',
      olivedrab: '6b8e23',
      orange: 'ffa500',
      orangered: 'ff4500',
      orchid: 'da70d6',
      palegoldenrod: 'eee8aa',
      palegreen: '98fb98',
      paleturquoise: 'afeeee',
      palevioletred: 'd87093',
      papayawhip: 'ffefd5',
      peachpuff: 'ffdab9',
      peru: 'cd853f',
      pink: 'ffc0cb',
      plum: 'dda0dd',
      powderblue: 'b0e0e6',
      purple: '800080',
      rebeccapurple: '663399',
      red: 'ff0000',
      rosybrown: 'bc8f8f',
      royalblue: '4169e1',
      saddlebrown: '8b4513',
      salmon: 'fa8072',
      sandybrown: 'f4a460',
      seagreen: '2e8b57',
      seashell: 'fff5ee',
      sienna: 'a0522d',
      silver: 'c0c0c0',
      skyblue: '87ceeb',
      slateblue: '6a5acd',
      slategray: '708090',
      snow: 'fffafa',
      springgreen: '00ff7f',
      steelblue: '4682b4',
      tan: 'd2b48c',
      teal: '008080',
      thistle: 'd8bfd8',
      tomato: 'ff6347',
      turquoise: '40e0d0',
      violet: 'ee82ee',
      violetred: 'd02090',
      wheat: 'f5deb3',
      white: 'ffffff',
      whitesmoke: 'f5f5f5',
      yellow: 'ffff00',
      yellowgreen: '9acd32',
    };
    color_string = simple_colors[color_string] || color_string;
    // emd of simple type-in colors

    // array of color definition objects
    var color_defs = [
      {
        re: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*((?:\d?\.)?\d)\)$/,
        example: ['rgba(123, 234, 45, 0.8)', 'rgba(255,234,245,1.0)'],
        process: function (bits) {
          return [parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3]), parseFloat(bits[4])];
        },
      },
      {
        re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
        example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
        process: function (bits) {
          return [parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3])];
        },
      },
      {
        re: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        example: ['#00ff00', '336699'],
        process: function (bits) {
          return [parseInt(bits[1], 16), parseInt(bits[2], 16), parseInt(bits[3], 16)];
        },
      },
      {
        re: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        example: ['#fb0', 'f0f'],
        process: function (bits) {
          return [parseInt(bits[1] + bits[1], 16), parseInt(bits[2] + bits[2], 16), parseInt(bits[3] + bits[3], 16)];
        },
      },
    ];

    // search through the definitions to find a match
    for (var i = 0; i < color_defs.length; i++) {
      var re = color_defs[i].re;
      var processor = color_defs[i].process;
      var bits = re.exec(color_string);
      if (bits) {
        var channels = processor(bits);
        this.r = channels[0];
        this.g = channels[1];
        this.b = channels[2];
        if (channels.length > 3) {
          this.alpha = channels[3];
        }
        this.ok = true;
      }
    }

    // validate/cleanup values
    this.r = this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r;
    this.g = this.g < 0 || isNaN(this.g) ? 0 : this.g > 255 ? 255 : this.g;
    this.b = this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b;
    this.alpha = this.alpha < 0 ? 0 : this.alpha > 1.0 || isNaN(this.alpha) ? 1.0 : this.alpha;

    // some getters
    this.toRGB = function () {
      return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    };
    this.toRGBA = function () {
      return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.alpha + ')';
    };
    this.toHex = function () {
      var r = this.r.toString(16);
      var g = this.g.toString(16);
      var b = this.b.toString(16);
      if (r.length == 1) r = '0' + r;
      if (g.length == 1) g = '0' + g;
      if (b.length == 1) b = '0' + b;
      return '#' + r + g + b;
    };

    // help
    this.getHelpXML = function () {
      var examples = new Array();
      // add regexps
      for (var i = 0; i < color_defs.length; i++) {
        var example = color_defs[i].example;
        for (var j = 0; j < example.length; j++) {
          examples[examples.length] = example[j];
        }
      }
      // add type-in colors
      for (var sc in simple_colors) {
        examples[examples.length] = sc;
      }

      var xml = document.createElement('ul');
      xml.setAttribute('id', 'rgbcolor-examples');
      for (var i = 0; i < examples.length; i++) {
        try {
          var list_item = document.createElement('li');
          var list_color = new RGBColor(examples[i]);
          var example_div = document.createElement('div');
          example_div.style.cssText = 'margin: 3px; ' + 'border: 1px solid black; ' + 'background:' + list_color.toHex() + '; ' + 'color:' + list_color.toHex();
          example_div.appendChild(document.createTextNode('test'));
          var list_item_value = document.createTextNode(' ' + examples[i] + ' -> ' + list_color.toRGB() + ' -> ' + list_color.toHex());
          list_item.appendChild(example_div);
          list_item.appendChild(list_item_value);
          xml.appendChild(list_item);
        } catch (e) {}
      }
      return xml;
    };
  };
  return rgbcolor;
}

var es_array_forEach = {};

var arrayForEach;
var hasRequiredArrayForEach;

function requireArrayForEach() {
  if (hasRequiredArrayForEach) return arrayForEach;
  hasRequiredArrayForEach = 1;
  var $forEach = requireArrayIteration().forEach;
  var arrayMethodIsStrict = requireArrayMethodIsStrict();

  var STRICT_METHOD = arrayMethodIsStrict('forEach');

  // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  arrayForEach = !STRICT_METHOD
    ? function forEach(callbackfn /* , thisArg */) {
        return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        // eslint-disable-next-line es/no-array-prototype-foreach -- safe
      }
    : [].forEach;
  return arrayForEach;
}

var hasRequiredEs_array_forEach;

function requireEs_array_forEach() {
  if (hasRequiredEs_array_forEach) return es_array_forEach;
  hasRequiredEs_array_forEach = 1;
  var $ = require_export();
  var forEach = requireArrayForEach();

  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  // eslint-disable-next-line es/no-array-prototype-foreach -- safe
  $(
    { target: 'Array', proto: true, forced: [].forEach !== forEach },
    {
      forEach: forEach,
    },
  );
  return es_array_forEach;
}

var web_domCollections_forEach = {};

var domIterables;
var hasRequiredDomIterables;

function requireDomIterables() {
  if (hasRequiredDomIterables) return domIterables;
  hasRequiredDomIterables = 1;
  // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0,
  };
  return domIterables;
}

var domTokenListPrototype;
var hasRequiredDomTokenListPrototype;

function requireDomTokenListPrototype() {
  if (hasRequiredDomTokenListPrototype) return domTokenListPrototype;
  hasRequiredDomTokenListPrototype = 1;
  // in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
  var documentCreateElement = requireDocumentCreateElement();

  var classList = documentCreateElement('span').classList;
  var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

  domTokenListPrototype = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;
  return domTokenListPrototype;
}

var hasRequiredWeb_domCollections_forEach;

function requireWeb_domCollections_forEach() {
  if (hasRequiredWeb_domCollections_forEach) return web_domCollections_forEach;
  hasRequiredWeb_domCollections_forEach = 1;
  var globalThis = requireGlobalThis();
  var DOMIterables = requireDomIterables();
  var DOMTokenListPrototype = requireDomTokenListPrototype();
  var forEach = requireArrayForEach();
  var createNonEnumerableProperty = requireCreateNonEnumerableProperty();

  var handlePrototype = function (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== forEach)
      try {
        createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
      } catch (error) {
        CollectionPrototype.forEach = forEach;
      }
  };

  for (var COLLECTION_NAME in DOMIterables) {
    if (DOMIterables[COLLECTION_NAME]) {
      handlePrototype(globalThis[COLLECTION_NAME] && globalThis[COLLECTION_NAME].prototype);
    }
  }

  handlePrototype(DOMTokenListPrototype);
  return web_domCollections_forEach;
}

var inherits = { exports: {} };

var setPrototypeOf = { exports: {} };

var hasRequiredSetPrototypeOf;

function requireSetPrototypeOf() {
  if (hasRequiredSetPrototypeOf) return setPrototypeOf.exports;
  hasRequiredSetPrototypeOf = 1;
  (function (module) {
    function _setPrototypeOf(t, e) {
      return (
        (module.exports = _setPrototypeOf =
          Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return ((t.__proto__ = e), t);
              }),
        (module.exports.__esModule = true),
        (module.exports['default'] = module.exports),
        _setPrototypeOf(t, e)
      );
    }
    ((module.exports = _setPrototypeOf), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(setPrototypeOf);
  return setPrototypeOf.exports;
}

var hasRequiredInherits;

function requireInherits() {
  if (hasRequiredInherits) return inherits.exports;
  hasRequiredInherits = 1;
  (function (module) {
    var setPrototypeOf = requireSetPrototypeOf();
    function _inherits(t, e) {
      if ('function' != typeof e && null !== e) throw new TypeError('Super expression must either be null or a function');
      ((t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: true,
          configurable: true,
        },
      })),
        Object.defineProperty(t, 'prototype', {
          writable: false,
        }),
        e && setPrototypeOf(t, e));
    }
    ((module.exports = _inherits), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(inherits);
  return inherits.exports;
}

var possibleConstructorReturn = { exports: {} };

var assertThisInitialized = { exports: {} };

var hasRequiredAssertThisInitialized;

function requireAssertThisInitialized() {
  if (hasRequiredAssertThisInitialized) return assertThisInitialized.exports;
  hasRequiredAssertThisInitialized = 1;
  (function (module) {
    function _assertThisInitialized(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }
    ((module.exports = _assertThisInitialized), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(assertThisInitialized);
  return assertThisInitialized.exports;
}

var hasRequiredPossibleConstructorReturn;

function requirePossibleConstructorReturn() {
  if (hasRequiredPossibleConstructorReturn) return possibleConstructorReturn.exports;
  hasRequiredPossibleConstructorReturn = 1;
  (function (module) {
    var _typeof = require_typeof()['default'];
    var assertThisInitialized = requireAssertThisInitialized();
    function _possibleConstructorReturn(t, e) {
      if (e && ('object' == _typeof(e) || 'function' == typeof e)) return e;
      if (void 0 !== e) throw new TypeError('Derived constructors may only return object or undefined');
      return assertThisInitialized(t);
    }
    ((module.exports = _possibleConstructorReturn), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(possibleConstructorReturn);
  return possibleConstructorReturn.exports;
}

var getPrototypeOf = { exports: {} };

var hasRequiredGetPrototypeOf;

function requireGetPrototypeOf() {
  if (hasRequiredGetPrototypeOf) return getPrototypeOf.exports;
  hasRequiredGetPrototypeOf = 1;
  (function (module) {
    function _getPrototypeOf(t) {
      return (
        (module.exports = _getPrototypeOf =
          Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              }),
        (module.exports.__esModule = true),
        (module.exports['default'] = module.exports),
        _getPrototypeOf(t)
      );
    }
    ((module.exports = _getPrototypeOf), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(getPrototypeOf);
  return getPrototypeOf.exports;
}

var es_array_from = {};

var callWithSafeIterationClosing;
var hasRequiredCallWithSafeIterationClosing;

function requireCallWithSafeIterationClosing() {
  if (hasRequiredCallWithSafeIterationClosing) return callWithSafeIterationClosing;
  hasRequiredCallWithSafeIterationClosing = 1;
  var anObject = requireAnObject();
  var iteratorClose = requireIteratorClose();

  // call something on iterator step with safe closing on error
  callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
  };
  return callWithSafeIterationClosing;
}

var arrayFrom;
var hasRequiredArrayFrom;

function requireArrayFrom() {
  if (hasRequiredArrayFrom) return arrayFrom;
  hasRequiredArrayFrom = 1;
  var bind = requireFunctionBindContext();
  var call = requireFunctionCall();
  var toObject = requireToObject();
  var callWithSafeIterationClosing = requireCallWithSafeIterationClosing();
  var isArrayIteratorMethod = requireIsArrayIteratorMethod();
  var isConstructor = requireIsConstructor();
  var lengthOfArrayLike = requireLengthOfArrayLike();
  var createProperty = requireCreateProperty();
  var getIterator = requireGetIterator();
  var getIteratorMethod = requireGetIteratorMethod();

  var $Array = Array;

  // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from
  arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var IS_CONSTRUCTOR = isConstructor(this);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
    var iteratorMethod = getIteratorMethod(O);
    var index = 0;
    var length, result, step, iterator, next, value;
    // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
      result = IS_CONSTRUCTOR ? new this() : [];
      iterator = getIterator(O, iteratorMethod);
      next = iterator.next;
      for (; !(step = call(next, iterator)).done; index++) {
        value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
        createProperty(result, index, value);
      }
    } else {
      length = lengthOfArrayLike(O);
      result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
      for (; length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty(result, index, value);
      }
    }
    result.length = index;
    return result;
  };
  return arrayFrom;
}

var hasRequiredEs_array_from;

function requireEs_array_from() {
  if (hasRequiredEs_array_from) return es_array_from;
  hasRequiredEs_array_from = 1;
  var $ = require_export();
  var from = requireArrayFrom();
  var checkCorrectnessOfIteration = requireCheckCorrectnessOfIteration();

  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
    // eslint-disable-next-line es/no-array-from -- required for testing
    Array.from(iterable);
  });

  // `Array.from` method
  // https://tc39.es/ecma262/#sec-array.from
  $(
    { target: 'Array', stat: true, forced: INCORRECT_ITERATION },
    {
      from: from,
    },
  );
  return es_array_from;
}

var es_array_includes = {};

var addToUnscopables;
var hasRequiredAddToUnscopables;

function requireAddToUnscopables() {
  if (hasRequiredAddToUnscopables) return addToUnscopables;
  hasRequiredAddToUnscopables = 1;
  var wellKnownSymbol = requireWellKnownSymbol();
  var create = requireObjectCreate();
  var defineProperty = requireObjectDefineProperty().f;

  var UNSCOPABLES = wellKnownSymbol('unscopables');
  var ArrayPrototype = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype[UNSCOPABLES] === undefined) {
    defineProperty(ArrayPrototype, UNSCOPABLES, {
      configurable: true,
      value: create(null),
    });
  }

  // add a key to Array.prototype[@@unscopables]
  addToUnscopables = function (key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };
  return addToUnscopables;
}

var hasRequiredEs_array_includes;

function requireEs_array_includes() {
  if (hasRequiredEs_array_includes) return es_array_includes;
  hasRequiredEs_array_includes = 1;
  var $ = require_export();
  var $includes = requireArrayIncludes().includes;
  var fails = requireFails();
  var addToUnscopables = requireAddToUnscopables();

  // FF99+ bug
  var BROKEN_ON_SPARSE = fails(function () {
    // eslint-disable-next-line es/no-array-prototype-includes -- detection
    return !Array(1).includes();
  });

  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  $(
    { target: 'Array', proto: true, forced: BROKEN_ON_SPARSE },
    {
      includes: function includes(el /* , fromIndex = 0 */) {
        return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
      },
    },
  );

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('includes');
  return es_array_includes;
}

var es_array_indexOf = {};

var hasRequiredEs_array_indexOf;

function requireEs_array_indexOf() {
  if (hasRequiredEs_array_indexOf) return es_array_indexOf;
  hasRequiredEs_array_indexOf = 1;
  /* eslint-disable es/no-array-prototype-indexof -- required for testing */
  var $ = require_export();
  var uncurryThis = requireFunctionUncurryThisClause();
  var $indexOf = requireArrayIncludes().indexOf;
  var arrayMethodIsStrict = requireArrayMethodIsStrict();

  var nativeIndexOf = uncurryThis([].indexOf);

  var NEGATIVE_ZERO = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;
  var FORCED = NEGATIVE_ZERO || !arrayMethodIsStrict('indexOf');

  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  $(
    { target: 'Array', proto: true, forced: FORCED },
    {
      indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
        var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
        return NEGATIVE_ZERO
          ? // convert -0 to +0
            nativeIndexOf(this, searchElement, fromIndex) || 0
          : $indexOf(this, searchElement, fromIndex);
      },
    },
  );
  return es_array_indexOf;
}

var es_array_some = {};

var hasRequiredEs_array_some;

function requireEs_array_some() {
  if (hasRequiredEs_array_some) return es_array_some;
  hasRequiredEs_array_some = 1;
  var $ = require_export();
  var $some = requireArrayIteration().some;
  var arrayMethodIsStrict = requireArrayMethodIsStrict();

  var STRICT_METHOD = arrayMethodIsStrict('some');

  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  $(
    { target: 'Array', proto: true, forced: !STRICT_METHOD },
    {
      some: function some(callbackfn /* , thisArg */) {
        return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      },
    },
  );
  return es_array_some;
}

var es_string_includes = {};

var hasRequiredEs_string_includes;

function requireEs_string_includes() {
  if (hasRequiredEs_string_includes) return es_string_includes;
  hasRequiredEs_string_includes = 1;
  var $ = require_export();
  var uncurryThis = requireFunctionUncurryThis();
  var notARegExp = requireNotARegexp();
  var requireObjectCoercible = requireRequireObjectCoercible();
  var toString = requireToString();
  var correctIsRegExpLogic = requireCorrectIsRegexpLogic();

  var stringIndexOf = uncurryThis(''.indexOf);

  // `String.prototype.includes` method
  // https://tc39.es/ecma262/#sec-string.prototype.includes
  $(
    { target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') },
    {
      includes: function includes(searchString /* , position = 0 */) {
        return !!~stringIndexOf(toString(requireObjectCoercible(this)), toString(notARegExp(searchString)), arguments.length > 1 ? arguments[1] : undefined);
      },
    },
  );
  return es_string_includes;
}

var es_string_iterator = {};

var correctPrototypeGetter;
var hasRequiredCorrectPrototypeGetter;

function requireCorrectPrototypeGetter() {
  if (hasRequiredCorrectPrototypeGetter) return correctPrototypeGetter;
  hasRequiredCorrectPrototypeGetter = 1;
  var fails = requireFails();

  correctPrototypeGetter = !fails(function () {
    function F() {
      /* empty */
    }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });
  return correctPrototypeGetter;
}

var objectGetPrototypeOf;
var hasRequiredObjectGetPrototypeOf;

function requireObjectGetPrototypeOf() {
  if (hasRequiredObjectGetPrototypeOf) return objectGetPrototypeOf;
  hasRequiredObjectGetPrototypeOf = 1;
  var hasOwn = requireHasOwnProperty();
  var isCallable = requireIsCallable();
  var toObject = requireToObject();
  var sharedKey = requireSharedKey();
  var CORRECT_PROTOTYPE_GETTER = requireCorrectPrototypeGetter();

  var IE_PROTO = sharedKey('IE_PROTO');
  var $Object = Object;
  var ObjectPrototype = $Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe
  objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER
    ? $Object.getPrototypeOf
    : function (O) {
        var object = toObject(O);
        if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
        var constructor = object.constructor;
        if (isCallable(constructor) && object instanceof constructor) {
          return constructor.prototype;
        }
        return object instanceof $Object ? ObjectPrototype : null;
      };
  return objectGetPrototypeOf;
}

var iteratorsCore;
var hasRequiredIteratorsCore;

function requireIteratorsCore() {
  if (hasRequiredIteratorsCore) return iteratorsCore;
  hasRequiredIteratorsCore = 1;
  var fails = requireFails();
  var isCallable = requireIsCallable();
  var isObject = requireIsObject();
  var create = requireObjectCreate();
  var getPrototypeOf = requireObjectGetPrototypeOf();
  var defineBuiltIn = requireDefineBuiltIn();
  var wellKnownSymbol = requireWellKnownSymbol();
  var IS_PURE = requireIsPure();

  var ITERATOR = wellKnownSymbol('iterator');
  var BUGGY_SAFARI_ITERATORS = false;

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

  /* eslint-disable es/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
    else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE =
    !isObject(IteratorPrototype) ||
    fails(function () {
      var test = {};
      // FF44- legacy iterators case
      return IteratorPrototype[ITERATOR].call(test) !== test;
    });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
  else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!isCallable(IteratorPrototype[ITERATOR])) {
    defineBuiltIn(IteratorPrototype, ITERATOR, function () {
      return this;
    });
  }

  iteratorsCore = {
    IteratorPrototype: IteratorPrototype,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS,
  };
  return iteratorsCore;
}

var iteratorCreateConstructor;
var hasRequiredIteratorCreateConstructor;

function requireIteratorCreateConstructor() {
  if (hasRequiredIteratorCreateConstructor) return iteratorCreateConstructor;
  hasRequiredIteratorCreateConstructor = 1;
  var IteratorPrototype = requireIteratorsCore().IteratorPrototype;
  var create = requireObjectCreate();
  var createPropertyDescriptor = requireCreatePropertyDescriptor();
  var setToStringTag = requireSetToStringTag();
  var Iterators = requireIterators();

  var returnThis = function () {
    return this;
  };

  iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
    setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
    Iterators[TO_STRING_TAG] = returnThis;
    return IteratorConstructor;
  };
  return iteratorCreateConstructor;
}

var iteratorDefine;
var hasRequiredIteratorDefine;

function requireIteratorDefine() {
  if (hasRequiredIteratorDefine) return iteratorDefine;
  hasRequiredIteratorDefine = 1;
  var $ = require_export();
  var call = requireFunctionCall();
  var IS_PURE = requireIsPure();
  var FunctionName = requireFunctionName();
  var isCallable = requireIsCallable();
  var createIteratorConstructor = requireIteratorCreateConstructor();
  var getPrototypeOf = requireObjectGetPrototypeOf();
  var setPrototypeOf = requireObjectSetPrototypeOf();
  var setToStringTag = requireSetToStringTag();
  var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
  var defineBuiltIn = requireDefineBuiltIn();
  var wellKnownSymbol = requireWellKnownSymbol();
  var Iterators = requireIterators();
  var IteratorsCore = requireIteratorsCore();

  var PROPER_FUNCTION_NAME = FunctionName.PROPER;
  var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
  var IteratorPrototype = IteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR = wellKnownSymbol('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function () {
    return this;
  };

  iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];

      switch (KIND) {
        case KEYS:
          return function keys() {
            return new IteratorConstructor(this, KIND);
          };
        case VALUES:
          return function values() {
            return new IteratorConstructor(this, KIND);
          };
        case ENTRIES:
          return function entries() {
            return new IteratorConstructor(this, KIND);
          };
      }

      return function () {
        return new IteratorConstructor(this);
      };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR] || IterablePrototype['@@iterator'] || (DEFAULT && IterablePrototype[DEFAULT]);
    var defaultIterator = (!BUGGY_SAFARI_ITERATORS && nativeIterator) || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
      if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (setPrototypeOf) {
            setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
          } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
            defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
        if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
      }
    }

    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
        createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
      } else {
        INCORRECT_VALUES_NAME = true;
        defaultIterator = function values() {
          return call(nativeIterator, this);
        };
      }
    }

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES),
      };
      if (FORCED)
        for (KEY in methods) {
          if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
            defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
          }
        }
      else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
    }

    // define iterator
    if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
      defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
    }
    Iterators[NAME] = defaultIterator;

    return methods;
  };
  return iteratorDefine;
}

var createIterResultObject;
var hasRequiredCreateIterResultObject;

function requireCreateIterResultObject() {
  if (hasRequiredCreateIterResultObject) return createIterResultObject;
  hasRequiredCreateIterResultObject = 1;
  // `CreateIterResultObject` abstract operation
  // https://tc39.es/ecma262/#sec-createiterresultobject
  createIterResultObject = function (value, done) {
    return { value: value, done: done };
  };
  return createIterResultObject;
}

var hasRequiredEs_string_iterator;

function requireEs_string_iterator() {
  if (hasRequiredEs_string_iterator) return es_string_iterator;
  hasRequiredEs_string_iterator = 1;
  var charAt = requireStringMultibyte().charAt;
  var toString = requireToString();
  var InternalStateModule = requireInternalState();
  var defineIterator = requireIteratorDefine();
  var createIterResultObject = requireCreateIterResultObject();

  var STRING_ITERATOR = 'String Iterator';
  var setInternalState = InternalStateModule.set;
  var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  defineIterator(
    String,
    'String',
    function (iterated) {
      setInternalState(this, {
        type: STRING_ITERATOR,
        string: toString(iterated),
        index: 0,
      });
      // `%StringIteratorPrototype%.next` method
      // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
    },
    function next() {
      var state = getInternalState(this);
      var string = state.string;
      var index = state.index;
      var point;
      if (index >= string.length) return createIterResultObject(undefined, true);
      point = charAt(string, index);
      state.index += point.length;
      return createIterResultObject(point, false);
    },
  );
  return es_string_iterator;
}

var toConsumableArray = { exports: {} };

var arrayWithoutHoles = { exports: {} };

var hasRequiredArrayWithoutHoles;

function requireArrayWithoutHoles() {
  if (hasRequiredArrayWithoutHoles) return arrayWithoutHoles.exports;
  hasRequiredArrayWithoutHoles = 1;
  (function (module) {
    var arrayLikeToArray = requireArrayLikeToArray();
    function _arrayWithoutHoles(r) {
      if (Array.isArray(r)) return arrayLikeToArray(r);
    }
    ((module.exports = _arrayWithoutHoles), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(arrayWithoutHoles);
  return arrayWithoutHoles.exports;
}

var iterableToArray = { exports: {} };

var hasRequiredIterableToArray;

function requireIterableToArray() {
  if (hasRequiredIterableToArray) return iterableToArray.exports;
  hasRequiredIterableToArray = 1;
  (function (module) {
    function _iterableToArray(r) {
      if (('undefined' != typeof Symbol && null != r[Symbol.iterator]) || null != r['@@iterator']) return Array.from(r);
    }
    ((module.exports = _iterableToArray), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(iterableToArray);
  return iterableToArray.exports;
}

var nonIterableSpread = { exports: {} };

var hasRequiredNonIterableSpread;

function requireNonIterableSpread() {
  if (hasRequiredNonIterableSpread) return nonIterableSpread.exports;
  hasRequiredNonIterableSpread = 1;
  (function (module) {
    function _nonIterableSpread() {
      throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
    }
    ((module.exports = _nonIterableSpread), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(nonIterableSpread);
  return nonIterableSpread.exports;
}

var hasRequiredToConsumableArray;

function requireToConsumableArray() {
  if (hasRequiredToConsumableArray) return toConsumableArray.exports;
  hasRequiredToConsumableArray = 1;
  (function (module) {
    var arrayWithoutHoles = requireArrayWithoutHoles();
    var iterableToArray = requireIterableToArray();
    var unsupportedIterableToArray = requireUnsupportedIterableToArray();
    var nonIterableSpread = requireNonIterableSpread();
    function _toConsumableArray(r) {
      return arrayWithoutHoles(r) || iterableToArray(r) || unsupportedIterableToArray(r) || nonIterableSpread();
    }
    ((module.exports = _toConsumableArray), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(toConsumableArray);
  return toConsumableArray.exports;
}

var es_array_reverse = {};

var hasRequiredEs_array_reverse;

function requireEs_array_reverse() {
  if (hasRequiredEs_array_reverse) return es_array_reverse;
  hasRequiredEs_array_reverse = 1;
  var $ = require_export();
  var uncurryThis = requireFunctionUncurryThis();
  var isArray = requireIsArray();

  var nativeReverse = uncurryThis([].reverse);
  var test = [1, 2];

  // `Array.prototype.reverse` method
  // https://tc39.es/ecma262/#sec-array.prototype.reverse
  // fix for Safari 12.0 bug
  // https://bugs.webkit.org/show_bug.cgi?id=188794
  $(
    { target: 'Array', proto: true, forced: String(test) === String(test.reverse()) },
    {
      reverse: function reverse() {
        // eslint-disable-next-line no-self-assign -- dirty hack
        if (isArray(this)) this.length = this.length;
        return nativeReverse(this);
      },
    },
  );
  return es_array_reverse;
}

var es_number_constructor = {};

var inheritIfRequired;
var hasRequiredInheritIfRequired;

function requireInheritIfRequired() {
  if (hasRequiredInheritIfRequired) return inheritIfRequired;
  hasRequiredInheritIfRequired = 1;
  var isCallable = requireIsCallable();
  var isObject = requireIsObject();
  var setPrototypeOf = requireObjectSetPrototypeOf();

  // makes subclassing work correct for wrapped built-ins
  inheritIfRequired = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if (
      // it can work only with native `setPrototypeOf`
      setPrototypeOf &&
      // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
      isCallable((NewTarget = dummy.constructor)) &&
      NewTarget !== Wrapper &&
      isObject((NewTargetPrototype = NewTarget.prototype)) &&
      NewTargetPrototype !== Wrapper.prototype
    )
      setPrototypeOf($this, NewTargetPrototype);
    return $this;
  };
  return inheritIfRequired;
}

var thisNumberValue;
var hasRequiredThisNumberValue;

function requireThisNumberValue() {
  if (hasRequiredThisNumberValue) return thisNumberValue;
  hasRequiredThisNumberValue = 1;
  var uncurryThis = requireFunctionUncurryThis();

  // `thisNumberValue` abstract operation
  // https://tc39.es/ecma262/#sec-thisnumbervalue
  thisNumberValue = uncurryThis((1.1).valueOf);
  return thisNumberValue;
}

var hasRequiredEs_number_constructor;

function requireEs_number_constructor() {
  if (hasRequiredEs_number_constructor) return es_number_constructor;
  hasRequiredEs_number_constructor = 1;
  var $ = require_export();
  var IS_PURE = requireIsPure();
  var DESCRIPTORS = requireDescriptors();
  var globalThis = requireGlobalThis();
  var path = requirePath();
  var uncurryThis = requireFunctionUncurryThis();
  var isForced = requireIsForced();
  var hasOwn = requireHasOwnProperty();
  var inheritIfRequired = requireInheritIfRequired();
  var isPrototypeOf = requireObjectIsPrototypeOf();
  var isSymbol = requireIsSymbol();
  var toPrimitive = requireToPrimitive$1();
  var fails = requireFails();
  var getOwnPropertyNames = requireObjectGetOwnPropertyNames().f;
  var getOwnPropertyDescriptor = requireObjectGetOwnPropertyDescriptor().f;
  var defineProperty = requireObjectDefineProperty().f;
  var thisNumberValue = requireThisNumberValue();
  var trim = requireStringTrim().trim;

  var NUMBER = 'Number';
  var NativeNumber = globalThis[NUMBER];
  var PureNumberNamespace = path[NUMBER];
  var NumberPrototype = NativeNumber.prototype;
  var TypeError = globalThis.TypeError;
  var stringSlice = uncurryThis(''.slice);
  var charCodeAt = uncurryThis(''.charCodeAt);

  // `ToNumeric` abstract operation
  // https://tc39.es/ecma262/#sec-tonumeric
  var toNumeric = function (value) {
    var primValue = toPrimitive(value, 'number');
    return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
  };

  // `ToNumber` abstract operation
  // https://tc39.es/ecma262/#sec-tonumber
  var toNumber = function (argument) {
    var it = toPrimitive(argument, 'number');
    var first, third, radix, maxCode, digits, length, index, code;
    if (isSymbol(it)) throw new TypeError('Cannot convert a Symbol value to a number');
    if (typeof it == 'string' && it.length > 2) {
      it = trim(it);
      first = charCodeAt(it, 0);
      if (first === 43 || first === 45) {
        third = charCodeAt(it, 2);
        if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
      } else if (first === 48) {
        switch (charCodeAt(it, 1)) {
          // fast equal of /^0b[01]+$/i
          case 66:
          case 98:
            radix = 2;
            maxCode = 49;
            break;
          // fast equal of /^0o[0-7]+$/i
          case 79:
          case 111:
            radix = 8;
            maxCode = 55;
            break;
          default:
            return +it;
        }
        digits = stringSlice(it, 2);
        length = digits.length;
        for (index = 0; index < length; index++) {
          code = charCodeAt(digits, index);
          // parseInt parses a string to a first unavailable symbol
          // but ToNumber should return NaN if a string contains unavailable symbols
          if (code < 48 || code > maxCode) return NaN;
        }
        return parseInt(digits, radix);
      }
    }
    return +it;
  };

  var FORCED = isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'));

  var calledWithNew = function (dummy) {
    // includes check on 1..constructor(foo) case
    return (
      isPrototypeOf(NumberPrototype, dummy) &&
      fails(function () {
        thisNumberValue(dummy);
      })
    );
  };

  // `Number` constructor
  // https://tc39.es/ecma262/#sec-number-constructor
  var NumberWrapper = function Number(value) {
    var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
    return calledWithNew(this) ? inheritIfRequired(Object(n), this, NumberWrapper) : n;
  };

  NumberWrapper.prototype = NumberPrototype;
  if (FORCED && !IS_PURE) NumberPrototype.constructor = NumberWrapper;

  $(
    { global: true, constructor: true, wrap: true, forced: FORCED },
    {
      Number: NumberWrapper,
    },
  );

  // Use `internal/copy-constructor-properties` helper in `core-js@4`
  var copyConstructorProperties = function (target, source) {
    for (
      var keys = DESCRIPTORS
          ? getOwnPropertyNames(source)
          : // ES3:
            (
              'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
              // ES2015 (in case, if modules with ES2015 Number statics required before):
              'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
              // ESNext
              'fromString,range'
            ).split(','),
        j = 0,
        key;
      keys.length > j;
      j++
    ) {
      if (hasOwn(source, (key = keys[j])) && !hasOwn(target, key)) {
        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    }
  };

  if (IS_PURE && PureNumberNamespace) copyConstructorProperties(path[NUMBER], PureNumberNamespace);
  if (FORCED || IS_PURE) copyConstructorProperties(path[NUMBER], NativeNumber);
  return es_number_constructor;
}

var get = { exports: {} };

var superPropBase = { exports: {} };

var hasRequiredSuperPropBase;

function requireSuperPropBase() {
  if (hasRequiredSuperPropBase) return superPropBase.exports;
  hasRequiredSuperPropBase = 1;
  (function (module) {
    var getPrototypeOf = requireGetPrototypeOf();
    function _superPropBase(t, o) {
      for (; !{}.hasOwnProperty.call(t, o) && null !== (t = getPrototypeOf(t)); );
      return t;
    }
    ((module.exports = _superPropBase), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(superPropBase);
  return superPropBase.exports;
}

var hasRequiredGet;

function requireGet() {
  if (hasRequiredGet) return get.exports;
  hasRequiredGet = 1;
  (function (module) {
    var superPropBase = requireSuperPropBase();
    function _get() {
      return (
        (module.exports = _get =
          'undefined' != typeof Reflect && Reflect.get
            ? Reflect.get.bind()
            : function (e, t, r) {
                var p = superPropBase(e, t);
                if (p) {
                  var n = Object.getOwnPropertyDescriptor(p, t);
                  return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
                }
              }),
        (module.exports.__esModule = true),
        (module.exports['default'] = module.exports),
        _get.apply(null, arguments)
      );
    }
    ((module.exports = _get), (module.exports.__esModule = true), (module.exports['default'] = module.exports));
  })(get);
  return get.exports;
}

var es_array_fill = {};

var arrayFill;
var hasRequiredArrayFill;

function requireArrayFill() {
  if (hasRequiredArrayFill) return arrayFill;
  hasRequiredArrayFill = 1;
  var toObject = requireToObject();
  var toAbsoluteIndex = requireToAbsoluteIndex();
  var lengthOfArrayLike = requireLengthOfArrayLike();

  // `Array.prototype.fill` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.fill
  arrayFill = function fill(value /* , start = 0, end = @length */) {
    var O = toObject(this);
    var length = lengthOfArrayLike(O);
    var argumentsLength = arguments.length;
    var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
    var end = argumentsLength > 2 ? arguments[2] : undefined;
    var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
    while (endPos > index) O[index++] = value;
    return O;
  };
  return arrayFill;
}

var hasRequiredEs_array_fill;

function requireEs_array_fill() {
  if (hasRequiredEs_array_fill) return es_array_fill;
  hasRequiredEs_array_fill = 1;
  var $ = require_export();
  var fill = requireArrayFill();
  var addToUnscopables = requireAddToUnscopables();

  // `Array.prototype.fill` method
  // https://tc39.es/ecma262/#sec-array.prototype.fill
  $(
    { target: 'Array', proto: true },
    {
      fill: fill,
    },
  );

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('fill');
  return es_array_fill;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var t = function (r, e) {
  return (t =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array &&
      function (t, r) {
        t.__proto__ = r;
      }) ||
    function (t, r) {
      for (var e in r) Object.prototype.hasOwnProperty.call(r, e) && (t[e] = r[e]);
    })(r, e);
};
function r(r, e) {
  if ('function' != typeof e && null !== e) throw new TypeError('Class extends value ' + String(e) + ' is not a constructor or null');
  function i() {
    this.constructor = r;
  }
  (t(r, e), (r.prototype = null === e ? Object.create(e) : ((i.prototype = e.prototype), new i())));
}
function e(t) {
  var r = '';
  Array.isArray(t) || (t = [t]);
  for (var e = 0; e < t.length; e++) {
    var i = t[e];
    if (i.type === _.CLOSE_PATH) r += 'z';
    else if (i.type === _.HORIZ_LINE_TO) r += (i.relative ? 'h' : 'H') + i.x;
    else if (i.type === _.VERT_LINE_TO) r += (i.relative ? 'v' : 'V') + i.y;
    else if (i.type === _.MOVE_TO) r += (i.relative ? 'm' : 'M') + i.x + ' ' + i.y;
    else if (i.type === _.LINE_TO) r += (i.relative ? 'l' : 'L') + i.x + ' ' + i.y;
    else if (i.type === _.CURVE_TO) r += (i.relative ? 'c' : 'C') + i.x1 + ' ' + i.y1 + ' ' + i.x2 + ' ' + i.y2 + ' ' + i.x + ' ' + i.y;
    else if (i.type === _.SMOOTH_CURVE_TO) r += (i.relative ? 's' : 'S') + i.x2 + ' ' + i.y2 + ' ' + i.x + ' ' + i.y;
    else if (i.type === _.QUAD_TO) r += (i.relative ? 'q' : 'Q') + i.x1 + ' ' + i.y1 + ' ' + i.x + ' ' + i.y;
    else if (i.type === _.SMOOTH_QUAD_TO) r += (i.relative ? 't' : 'T') + i.x + ' ' + i.y;
    else {
      if (i.type !== _.ARC) throw new Error('Unexpected command type "' + i.type + '" at index ' + e + '.');
      r += (i.relative ? 'a' : 'A') + i.rX + ' ' + i.rY + ' ' + i.xRot + ' ' + +i.lArcFlag + ' ' + +i.sweepFlag + ' ' + i.x + ' ' + i.y;
    }
  }
  return r;
}
function i(t, r) {
  var e = t[0],
    i = t[1];
  return [e * Math.cos(r) - i * Math.sin(r), e * Math.sin(r) + i * Math.cos(r)];
}
function a() {
  for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
  for (var e = 0; e < t.length; e++) if ('number' != typeof t[e]) throw new Error('assertNumbers arguments[' + e + '] is not a number. ' + typeof t[e] + ' == typeof ' + t[e]);
  return true;
}
var n = Math.PI;
function o(t, r, e) {
  ((t.lArcFlag = 0 === t.lArcFlag ? 0 : 1), (t.sweepFlag = 0 === t.sweepFlag ? 0 : 1));
  var a = t.rX,
    o = t.rY,
    s = t.x,
    u = t.y;
  ((a = Math.abs(t.rX)), (o = Math.abs(t.rY)));
  var h = i([(r - s) / 2, (e - u) / 2], (-t.xRot / 180) * n),
    c = h[0],
    y = h[1],
    p = Math.pow(c, 2) / Math.pow(a, 2) + Math.pow(y, 2) / Math.pow(o, 2);
  (1 < p && ((a *= Math.sqrt(p)), (o *= Math.sqrt(p))), (t.rX = a), (t.rY = o));
  var m = Math.pow(a, 2) * Math.pow(y, 2) + Math.pow(o, 2) * Math.pow(c, 2),
    O = (t.lArcFlag !== t.sweepFlag ? 1 : -1) * Math.sqrt(Math.max(0, (Math.pow(a, 2) * Math.pow(o, 2) - m) / m)),
    l = ((a * y) / o) * O,
    T = ((-o * c) / a) * O,
    v = i([l, T], (t.xRot / 180) * n);
  ((t.cX = v[0] + (r + s) / 2),
    (t.cY = v[1] + (e + u) / 2),
    (t.phi1 = Math.atan2((y - T) / o, (c - l) / a)),
    (t.phi2 = Math.atan2((-y - T) / o, (-c - l) / a)),
    0 === t.sweepFlag && t.phi2 > t.phi1 && (t.phi2 -= 2 * n),
    1 === t.sweepFlag && t.phi2 < t.phi1 && (t.phi2 += 2 * n),
    (t.phi1 *= 180 / n),
    (t.phi2 *= 180 / n));
}
function s(t, r, e) {
  a(t, r, e);
  var i = t * t + r * r - e * e;
  if (0 > i) return [];
  if (0 === i) return [[(t * e) / (t * t + r * r), (r * e) / (t * t + r * r)]];
  var n = Math.sqrt(i);
  return [
    [(t * e + r * n) / (t * t + r * r), (r * e - t * n) / (t * t + r * r)],
    [(t * e - r * n) / (t * t + r * r), (r * e + t * n) / (t * t + r * r)],
  ];
}
var u,
  h = Math.PI / 180;
function c(t, r, e) {
  return (1 - e) * t + e * r;
}
function y(t, r, e, i) {
  return t + Math.cos((i / 180) * n) * r + Math.sin((i / 180) * n) * e;
}
function p(t, r, e, i) {
  var a = 1e-6,
    n = r - t,
    o = e - r,
    s = 3 * n + 3 * (i - e) - 6 * o,
    u = 6 * (o - n),
    h = 3 * n;
  return Math.abs(s) < a
    ? [-h / u]
    : (function (t, r, e) {
        var i = (t * t) / 4 - r;
        if (i < -1e-6) return [];
        if (i <= e) return [-t / 2];
        var a = Math.sqrt(i);
        return [-t / 2 - a, -t / 2 + a];
      })(u / s, h / s, a);
}
function m(t, r, e, i, a) {
  var n = 1 - a;
  return t * (n * n * n) + r * (3 * n * n * a) + e * (3 * n * a * a) + i * (a * a * a);
}
!(function (t) {
  function r() {
    return u(function (t, r, e) {
      return (
        t.relative &&
          (void 0 !== t.x1 && (t.x1 += r),
          void 0 !== t.y1 && (t.y1 += e),
          void 0 !== t.x2 && (t.x2 += r),
          void 0 !== t.y2 && (t.y2 += e),
          void 0 !== t.x && (t.x += r),
          void 0 !== t.y && (t.y += e),
          (t.relative = false)),
        t
      );
    });
  }
  function e() {
    var t = NaN,
      r = NaN,
      e = NaN,
      i = NaN;
    return u(function (a, n, o) {
      return (
        a.type & _.SMOOTH_CURVE_TO &&
          ((a.type = _.CURVE_TO), (t = isNaN(t) ? n : t), (r = isNaN(r) ? o : r), (a.x1 = a.relative ? n - t : 2 * n - t), (a.y1 = a.relative ? o - r : 2 * o - r)),
        a.type & _.CURVE_TO ? ((t = a.relative ? n + a.x2 : a.x2), (r = a.relative ? o + a.y2 : a.y2)) : ((t = NaN), (r = NaN)),
        a.type & _.SMOOTH_QUAD_TO &&
          ((a.type = _.QUAD_TO), (e = isNaN(e) ? n : e), (i = isNaN(i) ? o : i), (a.x1 = a.relative ? n - e : 2 * n - e), (a.y1 = a.relative ? o - i : 2 * o - i)),
        a.type & _.QUAD_TO ? ((e = a.relative ? n + a.x1 : a.x1), (i = a.relative ? o + a.y1 : a.y1)) : ((e = NaN), (i = NaN)),
        a
      );
    });
  }
  function n() {
    var t = NaN,
      r = NaN;
    return u(function (e, i, a) {
      if (
        (e.type & _.SMOOTH_QUAD_TO &&
          ((e.type = _.QUAD_TO), (t = isNaN(t) ? i : t), (r = isNaN(r) ? a : r), (e.x1 = e.relative ? i - t : 2 * i - t), (e.y1 = e.relative ? a - r : 2 * a - r)),
        e.type & _.QUAD_TO)
      ) {
        ((t = e.relative ? i + e.x1 : e.x1), (r = e.relative ? a + e.y1 : e.y1));
        var n = e.x1,
          o = e.y1;
        ((e.type = _.CURVE_TO), (e.x1 = ((e.relative ? 0 : i) + 2 * n) / 3), (e.y1 = ((e.relative ? 0 : a) + 2 * o) / 3), (e.x2 = (e.x + 2 * n) / 3), (e.y2 = (e.y + 2 * o) / 3));
      } else ((t = NaN), (r = NaN));
      return e;
    });
  }
  function u(t) {
    var r = 0,
      e = 0,
      i = NaN,
      a = NaN;
    return function (n) {
      if (isNaN(i) && !(n.type & _.MOVE_TO)) throw new Error('path must start with moveto');
      var o = t(n, r, e, i, a);
      return (
        n.type & _.CLOSE_PATH && ((r = i), (e = a)),
        void 0 !== n.x && (r = n.relative ? r + n.x : n.x),
        void 0 !== n.y && (e = n.relative ? e + n.y : n.y),
        n.type & _.MOVE_TO && ((i = r), (a = e)),
        o
      );
    };
  }
  function O(t, r, e, i, n, o) {
    return (
      a(t, r, e, i, n, o),
      u(function (a, s, u, h) {
        var c = a.x1,
          y = a.x2,
          p = a.relative && !isNaN(h),
          m = void 0 !== a.x ? a.x : p ? 0 : s,
          O = void 0 !== a.y ? a.y : p ? 0 : u;
        function l(t) {
          return t * t;
        }
        (a.type & _.HORIZ_LINE_TO && 0 !== r && ((a.type = _.LINE_TO), (a.y = a.relative ? 0 : u)),
          a.type & _.VERT_LINE_TO && 0 !== e && ((a.type = _.LINE_TO), (a.x = a.relative ? 0 : s)),
          void 0 !== a.x && (a.x = a.x * t + O * e + (p ? 0 : n)),
          void 0 !== a.y && (a.y = m * r + a.y * i + (p ? 0 : o)),
          void 0 !== a.x1 && (a.x1 = a.x1 * t + a.y1 * e + (p ? 0 : n)),
          void 0 !== a.y1 && (a.y1 = c * r + a.y1 * i + (p ? 0 : o)),
          void 0 !== a.x2 && (a.x2 = a.x2 * t + a.y2 * e + (p ? 0 : n)),
          void 0 !== a.y2 && (a.y2 = y * r + a.y2 * i + (p ? 0 : o)));
        var T = t * i - r * e;
        if (void 0 !== a.xRot && (1 !== t || 0 !== r || 0 !== e || 1 !== i))
          if (0 === T) (delete a.rX, delete a.rY, delete a.xRot, delete a.lArcFlag, delete a.sweepFlag, (a.type = _.LINE_TO));
          else {
            var v = (a.xRot * Math.PI) / 180,
              f = Math.sin(v),
              N = Math.cos(v),
              x = 1 / l(a.rX),
              d = 1 / l(a.rY),
              E = l(N) * x + l(f) * d,
              A = 2 * f * N * (x - d),
              C = l(f) * x + l(N) * d,
              M = E * i * i - A * r * i + C * r * r,
              R = A * (t * i + r * e) - 2 * (E * e * i + C * t * r),
              g = E * e * e - A * t * e + C * t * t,
              I = ((Math.atan2(R, M - g) + Math.PI) % Math.PI) / 2,
              S = Math.sin(I),
              L = Math.cos(I);
            ((a.rX = Math.abs(T) / Math.sqrt(M * l(L) + R * S * L + g * l(S))), (a.rY = Math.abs(T) / Math.sqrt(M * l(S) - R * S * L + g * l(L))), (a.xRot = (180 * I) / Math.PI));
          }
        return (void 0 !== a.sweepFlag && 0 > T && (a.sweepFlag = +!a.sweepFlag), a);
      })
    );
  }
  function l() {
    return function (t) {
      var r = {};
      for (var e in t) r[e] = t[e];
      return r;
    };
  }
  ((t.ROUND = function (t) {
    function r(r) {
      return Math.round(r * t) / t;
    }
    return (
      void 0 === t && (t = 1e13),
      a(t),
      function (t) {
        return (
          void 0 !== t.x1 && (t.x1 = r(t.x1)),
          void 0 !== t.y1 && (t.y1 = r(t.y1)),
          void 0 !== t.x2 && (t.x2 = r(t.x2)),
          void 0 !== t.y2 && (t.y2 = r(t.y2)),
          void 0 !== t.x && (t.x = r(t.x)),
          void 0 !== t.y && (t.y = r(t.y)),
          void 0 !== t.rX && (t.rX = r(t.rX)),
          void 0 !== t.rY && (t.rY = r(t.rY)),
          t
        );
      }
    );
  }),
    (t.TO_ABS = r),
    (t.TO_REL = function () {
      return u(function (t, r, e) {
        return (
          t.relative ||
            (void 0 !== t.x1 && (t.x1 -= r),
            void 0 !== t.y1 && (t.y1 -= e),
            void 0 !== t.x2 && (t.x2 -= r),
            void 0 !== t.y2 && (t.y2 -= e),
            void 0 !== t.x && (t.x -= r),
            void 0 !== t.y && (t.y -= e),
            (t.relative = true)),
          t
        );
      });
    }),
    (t.NORMALIZE_HVZ = function (t, r, e) {
      return (
        void 0 === t && (t = true),
        void 0 === r && (r = true),
        void 0 === e && (e = true),
        u(function (i, a, n, o, s) {
          if (isNaN(o) && !(i.type & _.MOVE_TO)) throw new Error('path must start with moveto');
          return (
            r && i.type & _.HORIZ_LINE_TO && ((i.type = _.LINE_TO), (i.y = i.relative ? 0 : n)),
            e && i.type & _.VERT_LINE_TO && ((i.type = _.LINE_TO), (i.x = i.relative ? 0 : a)),
            t && i.type & _.CLOSE_PATH && ((i.type = _.LINE_TO), (i.x = i.relative ? o - a : o), (i.y = i.relative ? s - n : s)),
            i.type & _.ARC && (0 === i.rX || 0 === i.rY) && ((i.type = _.LINE_TO), delete i.rX, delete i.rY, delete i.xRot, delete i.lArcFlag, delete i.sweepFlag),
            i
          );
        })
      );
    }),
    (t.NORMALIZE_ST = e),
    (t.QT_TO_C = n),
    (t.INFO = u),
    (t.SANITIZE = function (t) {
      (void 0 === t && (t = 0), a(t));
      var r = NaN,
        e = NaN,
        i = NaN,
        n = NaN;
      return u(function (a, o, s, u, h) {
        var c = Math.abs,
          y = false,
          p = 0,
          m = 0;
        if (
          (a.type & _.SMOOTH_CURVE_TO && ((p = isNaN(r) ? 0 : o - r), (m = isNaN(e) ? 0 : s - e)),
          a.type & (_.CURVE_TO | _.SMOOTH_CURVE_TO) ? ((r = a.relative ? o + a.x2 : a.x2), (e = a.relative ? s + a.y2 : a.y2)) : ((r = NaN), (e = NaN)),
          a.type & _.SMOOTH_QUAD_TO
            ? ((i = isNaN(i) ? o : 2 * o - i), (n = isNaN(n) ? s : 2 * s - n))
            : a.type & _.QUAD_TO
              ? ((i = a.relative ? o + a.x1 : a.x1), (n = a.relative ? s + a.y1 : a.y2))
              : ((i = NaN), (n = NaN)),
          a.type & _.LINE_COMMANDS ||
            (a.type & _.ARC && (0 === a.rX || 0 === a.rY || !a.lArcFlag)) ||
            a.type & _.CURVE_TO ||
            a.type & _.SMOOTH_CURVE_TO ||
            a.type & _.QUAD_TO ||
            a.type & _.SMOOTH_QUAD_TO)
        ) {
          var O = void 0 === a.x ? 0 : a.relative ? a.x : a.x - o,
            l = void 0 === a.y ? 0 : a.relative ? a.y : a.y - s;
          ((p = isNaN(i) ? (void 0 === a.x1 ? p : a.relative ? a.x : a.x1 - o) : i - o), (m = isNaN(n) ? (void 0 === a.y1 ? m : a.relative ? a.y : a.y1 - s) : n - s));
          var T = void 0 === a.x2 ? 0 : a.relative ? a.x : a.x2 - o,
            v = void 0 === a.y2 ? 0 : a.relative ? a.y : a.y2 - s;
          c(O) <= t && c(l) <= t && c(p) <= t && c(m) <= t && c(T) <= t && c(v) <= t && (y = true);
        }
        return (a.type & _.CLOSE_PATH && c(o - u) <= t && c(s - h) <= t && (y = true), y ? [] : a);
      });
    }),
    (t.MATRIX = O),
    (t.ROTATE = function (t, r, e) {
      (void 0 === r && (r = 0), void 0 === e && (e = 0), a(t, r, e));
      var i = Math.sin(t),
        n = Math.cos(t);
      return O(n, i, -i, n, r - r * n + e * i, e - r * i - e * n);
    }),
    (t.TRANSLATE = function (t, r) {
      return (void 0 === r && (r = 0), a(t, r), O(1, 0, 0, 1, t, r));
    }),
    (t.SCALE = function (t, r) {
      return (void 0 === r && (r = t), a(t, r), O(t, 0, 0, r, 0, 0));
    }),
    (t.SKEW_X = function (t) {
      return (a(t), O(1, 0, Math.atan(t), 1, 0, 0));
    }),
    (t.SKEW_Y = function (t) {
      return (a(t), O(1, Math.atan(t), 0, 1, 0, 0));
    }),
    (t.X_AXIS_SYMMETRY = function (t) {
      return (void 0 === t && (t = 0), a(t), O(-1, 0, 0, 1, t, 0));
    }),
    (t.Y_AXIS_SYMMETRY = function (t) {
      return (void 0 === t && (t = 0), a(t), O(1, 0, 0, -1, 0, t));
    }),
    (t.A_TO_C = function () {
      return u(function (t, r, e) {
        return _.ARC === t.type
          ? (function (t, r, e) {
              var a, n, s, u;
              t.cX || o(t, r, e);
              for (var y = Math.min(t.phi1, t.phi2), p = Math.max(t.phi1, t.phi2) - y, m = Math.ceil(p / 90), O = new Array(m), l = r, T = e, v = 0; v < m; v++) {
                var f = c(t.phi1, t.phi2, v / m),
                  N = c(t.phi1, t.phi2, (v + 1) / m),
                  x = N - f,
                  d = (4 / 3) * Math.tan((x * h) / 4),
                  E = [Math.cos(f * h) - d * Math.sin(f * h), Math.sin(f * h) + d * Math.cos(f * h)],
                  A = E[0],
                  C = E[1],
                  M = [Math.cos(N * h), Math.sin(N * h)],
                  R = M[0],
                  g = M[1],
                  I = [R + d * Math.sin(N * h), g - d * Math.cos(N * h)],
                  S = I[0],
                  L = I[1];
                O[v] = { relative: t.relative, type: _.CURVE_TO };
                var H = function (r, e) {
                  var a = i([r * t.rX, e * t.rY], t.xRot),
                    n = a[0],
                    o = a[1];
                  return [t.cX + n, t.cY + o];
                };
                ((a = H(A, C)),
                  (O[v].x1 = a[0]),
                  (O[v].y1 = a[1]),
                  (n = H(S, L)),
                  (O[v].x2 = n[0]),
                  (O[v].y2 = n[1]),
                  (s = H(R, g)),
                  (O[v].x = s[0]),
                  (O[v].y = s[1]),
                  t.relative && ((O[v].x1 -= l), (O[v].y1 -= T), (O[v].x2 -= l), (O[v].y2 -= T), (O[v].x -= l), (O[v].y -= T)),
                  (l = (u = [O[v].x, O[v].y])[0]),
                  (T = u[1]));
              }
              return O;
            })(t, t.relative ? 0 : r, t.relative ? 0 : e)
          : t;
      });
    }),
    (t.ANNOTATE_ARCS = function () {
      return u(function (t, r, e) {
        return (t.relative && ((r = 0), (e = 0)), _.ARC === t.type && o(t, r, e), t);
      });
    }),
    (t.CLONE = l),
    (t.CALCULATE_BOUNDS = function () {
      var t = function (t) {
          var r = {};
          for (var e in t) r[e] = t[e];
          return r;
        },
        i = r(),
        a = n(),
        h = e(),
        c = u(function (r, e, n) {
          var u = h(a(i(t(r))));
          function O(t) {
            (t > c.maxX && (c.maxX = t), t < c.minX && (c.minX = t));
          }
          function l(t) {
            (t > c.maxY && (c.maxY = t), t < c.minY && (c.minY = t));
          }
          if (
            (u.type & _.DRAWING_COMMANDS && (O(e), l(n)),
            u.type & _.HORIZ_LINE_TO && O(u.x),
            u.type & _.VERT_LINE_TO && l(u.y),
            u.type & _.LINE_TO && (O(u.x), l(u.y)),
            u.type & _.CURVE_TO)
          ) {
            (O(u.x), l(u.y));
            for (var T = 0, v = p(e, u.x1, u.x2, u.x); T < v.length; T++) {
              0 < (w = v[T]) && 1 > w && O(m(e, u.x1, u.x2, u.x, w));
            }
            for (var f = 0, N = p(n, u.y1, u.y2, u.y); f < N.length; f++) {
              0 < (w = N[f]) && 1 > w && l(m(n, u.y1, u.y2, u.y, w));
            }
          }
          if (u.type & _.ARC) {
            (O(u.x), l(u.y), o(u, e, n));
            for (
              var x = (u.xRot / 180) * Math.PI,
                d = Math.cos(x) * u.rX,
                E = Math.sin(x) * u.rX,
                A = -Math.sin(x) * u.rY,
                C = Math.cos(x) * u.rY,
                M = u.phi1 < u.phi2 ? [u.phi1, u.phi2] : -180 > u.phi2 ? [u.phi2 + 360, u.phi1 + 360] : [u.phi2, u.phi1],
                R = M[0],
                g = M[1],
                I = function (t) {
                  var r = t[0],
                    e = t[1],
                    i = (180 * Math.atan2(e, r)) / Math.PI;
                  return i < R ? i + 360 : i;
                },
                S = 0,
                L = s(A, -d, 0).map(I);
              S < L.length;
              S++
            ) {
              (w = L[S]) > R && w < g && O(y(u.cX, d, A, w));
            }
            for (var H = 0, U = s(C, -E, 0).map(I); H < U.length; H++) {
              var w;
              (w = U[H]) > R && w < g && l(y(u.cY, E, C, w));
            }
          }
          return r;
        });
      return ((c.minX = 1 / 0), (c.maxX = -1 / 0), (c.minY = 1 / 0), (c.maxY = -1 / 0), c);
    }));
})(u || (u = {}));
var O,
  l = (function () {
    function t() {}
    return (
      (t.prototype.round = function (t) {
        return this.transform(u.ROUND(t));
      }),
      (t.prototype.toAbs = function () {
        return this.transform(u.TO_ABS());
      }),
      (t.prototype.toRel = function () {
        return this.transform(u.TO_REL());
      }),
      (t.prototype.normalizeHVZ = function (t, r, e) {
        return this.transform(u.NORMALIZE_HVZ(t, r, e));
      }),
      (t.prototype.normalizeST = function () {
        return this.transform(u.NORMALIZE_ST());
      }),
      (t.prototype.qtToC = function () {
        return this.transform(u.QT_TO_C());
      }),
      (t.prototype.aToC = function () {
        return this.transform(u.A_TO_C());
      }),
      (t.prototype.sanitize = function (t) {
        return this.transform(u.SANITIZE(t));
      }),
      (t.prototype.translate = function (t, r) {
        return this.transform(u.TRANSLATE(t, r));
      }),
      (t.prototype.scale = function (t, r) {
        return this.transform(u.SCALE(t, r));
      }),
      (t.prototype.rotate = function (t, r, e) {
        return this.transform(u.ROTATE(t, r, e));
      }),
      (t.prototype.matrix = function (t, r, e, i, a, n) {
        return this.transform(u.MATRIX(t, r, e, i, a, n));
      }),
      (t.prototype.skewX = function (t) {
        return this.transform(u.SKEW_X(t));
      }),
      (t.prototype.skewY = function (t) {
        return this.transform(u.SKEW_Y(t));
      }),
      (t.prototype.xSymmetry = function (t) {
        return this.transform(u.X_AXIS_SYMMETRY(t));
      }),
      (t.prototype.ySymmetry = function (t) {
        return this.transform(u.Y_AXIS_SYMMETRY(t));
      }),
      (t.prototype.annotateArcs = function () {
        return this.transform(u.ANNOTATE_ARCS());
      }),
      t
    );
  })(),
  T = function (t) {
    return ' ' === t || '\t' === t || '\r' === t || '\n' === t;
  },
  v = function (t) {
    return '0'.charCodeAt(0) <= t.charCodeAt(0) && t.charCodeAt(0) <= '9'.charCodeAt(0);
  },
  f = (function (t) {
    function e() {
      var r = t.call(this) || this;
      return (
        (r.curNumber = ''),
        (r.curCommandType = -1),
        (r.curCommandRelative = false),
        (r.canParseCommandOrComma = true),
        (r.curNumberHasExp = false),
        (r.curNumberHasExpDigits = false),
        (r.curNumberHasDecimal = false),
        (r.curArgs = []),
        r
      );
    }
    return (
      r(e, t),
      (e.prototype.finish = function (t) {
        if ((void 0 === t && (t = []), this.parse(' ', t), 0 !== this.curArgs.length || !this.canParseCommandOrComma))
          throw new SyntaxError('Unterminated command at the path end.');
        return t;
      }),
      (e.prototype.parse = function (t, r) {
        var e = this;
        void 0 === r && (r = []);
        for (
          var i = function (t) {
              (r.push(t), (e.curArgs.length = 0), (e.canParseCommandOrComma = true));
            },
            a = 0;
          a < t.length;
          a++
        ) {
          var n = t[a],
            o = !(
              this.curCommandType !== _.ARC ||
              (3 !== this.curArgs.length && 4 !== this.curArgs.length) ||
              1 !== this.curNumber.length ||
              ('0' !== this.curNumber && '1' !== this.curNumber)
            ),
            s = v(n) && (('0' === this.curNumber && '0' === n) || o);
          if (!v(n) || s)
            if ('e' !== n && 'E' !== n)
              if (('-' !== n && '+' !== n) || !this.curNumberHasExp || this.curNumberHasExpDigits)
                if ('.' !== n || this.curNumberHasExp || this.curNumberHasDecimal || o) {
                  if (this.curNumber && -1 !== this.curCommandType) {
                    var u = Number(this.curNumber);
                    if (isNaN(u)) throw new SyntaxError('Invalid number ending at ' + a);
                    if (this.curCommandType === _.ARC)
                      if (0 === this.curArgs.length || 1 === this.curArgs.length) {
                        if (0 > u) throw new SyntaxError('Expected positive number, got "' + u + '" at index "' + a + '"');
                      } else if ((3 === this.curArgs.length || 4 === this.curArgs.length) && '0' !== this.curNumber && '1' !== this.curNumber)
                        throw new SyntaxError('Expected a flag, got "' + this.curNumber + '" at index "' + a + '"');
                    (this.curArgs.push(u),
                      this.curArgs.length === N[this.curCommandType] &&
                        (_.HORIZ_LINE_TO === this.curCommandType
                          ? i({ type: _.HORIZ_LINE_TO, relative: this.curCommandRelative, x: u })
                          : _.VERT_LINE_TO === this.curCommandType
                            ? i({ type: _.VERT_LINE_TO, relative: this.curCommandRelative, y: u })
                            : this.curCommandType === _.MOVE_TO || this.curCommandType === _.LINE_TO || this.curCommandType === _.SMOOTH_QUAD_TO
                              ? (i({ type: this.curCommandType, relative: this.curCommandRelative, x: this.curArgs[0], y: this.curArgs[1] }),
                                _.MOVE_TO === this.curCommandType && (this.curCommandType = _.LINE_TO))
                              : this.curCommandType === _.CURVE_TO
                                ? i({
                                    type: _.CURVE_TO,
                                    relative: this.curCommandRelative,
                                    x1: this.curArgs[0],
                                    y1: this.curArgs[1],
                                    x2: this.curArgs[2],
                                    y2: this.curArgs[3],
                                    x: this.curArgs[4],
                                    y: this.curArgs[5],
                                  })
                                : this.curCommandType === _.SMOOTH_CURVE_TO
                                  ? i({
                                      type: _.SMOOTH_CURVE_TO,
                                      relative: this.curCommandRelative,
                                      x2: this.curArgs[0],
                                      y2: this.curArgs[1],
                                      x: this.curArgs[2],
                                      y: this.curArgs[3],
                                    })
                                  : this.curCommandType === _.QUAD_TO
                                    ? i({ type: _.QUAD_TO, relative: this.curCommandRelative, x1: this.curArgs[0], y1: this.curArgs[1], x: this.curArgs[2], y: this.curArgs[3] })
                                    : this.curCommandType === _.ARC &&
                                      i({
                                        type: _.ARC,
                                        relative: this.curCommandRelative,
                                        rX: this.curArgs[0],
                                        rY: this.curArgs[1],
                                        xRot: this.curArgs[2],
                                        lArcFlag: this.curArgs[3],
                                        sweepFlag: this.curArgs[4],
                                        x: this.curArgs[5],
                                        y: this.curArgs[6],
                                      })),
                      (this.curNumber = ''),
                      (this.curNumberHasExpDigits = false),
                      (this.curNumberHasExp = false),
                      (this.curNumberHasDecimal = false),
                      (this.canParseCommandOrComma = true));
                  }
                  if (!T(n))
                    if (',' === n && this.canParseCommandOrComma) this.canParseCommandOrComma = false;
                    else if ('+' !== n && '-' !== n && '.' !== n)
                      if (s) ((this.curNumber = n), (this.curNumberHasDecimal = false));
                      else {
                        if (0 !== this.curArgs.length) throw new SyntaxError('Unterminated command at index ' + a + '.');
                        if (!this.canParseCommandOrComma) throw new SyntaxError('Unexpected character "' + n + '" at index ' + a + '. Command cannot follow comma');
                        if (((this.canParseCommandOrComma = false), 'z' !== n && 'Z' !== n))
                          if ('h' === n || 'H' === n) ((this.curCommandType = _.HORIZ_LINE_TO), (this.curCommandRelative = 'h' === n));
                          else if ('v' === n || 'V' === n) ((this.curCommandType = _.VERT_LINE_TO), (this.curCommandRelative = 'v' === n));
                          else if ('m' === n || 'M' === n) ((this.curCommandType = _.MOVE_TO), (this.curCommandRelative = 'm' === n));
                          else if ('l' === n || 'L' === n) ((this.curCommandType = _.LINE_TO), (this.curCommandRelative = 'l' === n));
                          else if ('c' === n || 'C' === n) ((this.curCommandType = _.CURVE_TO), (this.curCommandRelative = 'c' === n));
                          else if ('s' === n || 'S' === n) ((this.curCommandType = _.SMOOTH_CURVE_TO), (this.curCommandRelative = 's' === n));
                          else if ('q' === n || 'Q' === n) ((this.curCommandType = _.QUAD_TO), (this.curCommandRelative = 'q' === n));
                          else if ('t' === n || 'T' === n) ((this.curCommandType = _.SMOOTH_QUAD_TO), (this.curCommandRelative = 't' === n));
                          else {
                            if ('a' !== n && 'A' !== n) throw new SyntaxError('Unexpected character "' + n + '" at index ' + a + '.');
                            ((this.curCommandType = _.ARC), (this.curCommandRelative = 'a' === n));
                          }
                        else (r.push({ type: _.CLOSE_PATH }), (this.canParseCommandOrComma = true), (this.curCommandType = -1));
                      }
                    else ((this.curNumber = n), (this.curNumberHasDecimal = '.' === n));
                } else ((this.curNumber += n), (this.curNumberHasDecimal = true));
              else this.curNumber += n;
            else ((this.curNumber += n), (this.curNumberHasExp = true));
          else ((this.curNumber += n), (this.curNumberHasExpDigits = this.curNumberHasExp));
        }
        return r;
      }),
      (e.prototype.transform = function (t) {
        return Object.create(this, {
          parse: {
            value: function (r, e) {
              void 0 === e && (e = []);
              for (var i = 0, a = Object.getPrototypeOf(this).parse.call(this, r); i < a.length; i++) {
                var n = a[i],
                  o = t(n);
                Array.isArray(o) ? e.push.apply(e, o) : e.push(o);
              }
              return e;
            },
          },
        });
      }),
      e
    );
  })(l),
  _ = (function (t) {
    function i(r) {
      var e = t.call(this) || this;
      return ((e.commands = 'string' == typeof r ? i.parse(r) : r), e);
    }
    return (
      r(i, t),
      (i.prototype.encode = function () {
        return i.encode(this.commands);
      }),
      (i.prototype.getBounds = function () {
        var t = u.CALCULATE_BOUNDS();
        return (this.transform(t), t);
      }),
      (i.prototype.transform = function (t) {
        for (var r = [], e = 0, i = this.commands; e < i.length; e++) {
          var a = t(i[e]);
          Array.isArray(a) ? r.push.apply(r, a) : r.push(a);
        }
        return ((this.commands = r), this);
      }),
      (i.encode = function (t) {
        return e(t);
      }),
      (i.parse = function (t) {
        var r = new f(),
          e = [];
        return (r.parse(t, e), r.finish(e), e);
      }),
      (i.CLOSE_PATH = 1),
      (i.MOVE_TO = 2),
      (i.HORIZ_LINE_TO = 4),
      (i.VERT_LINE_TO = 8),
      (i.LINE_TO = 16),
      (i.CURVE_TO = 32),
      (i.SMOOTH_CURVE_TO = 64),
      (i.QUAD_TO = 128),
      (i.SMOOTH_QUAD_TO = 256),
      (i.ARC = 512),
      (i.LINE_COMMANDS = i.LINE_TO | i.HORIZ_LINE_TO | i.VERT_LINE_TO),
      (i.DRAWING_COMMANDS = i.HORIZ_LINE_TO | i.VERT_LINE_TO | i.LINE_TO | i.CURVE_TO | i.SMOOTH_CURVE_TO | i.QUAD_TO | i.SMOOTH_QUAD_TO | i.ARC),
      i
    );
  })(l),
  N =
    (((O = {})[_.MOVE_TO] = 2),
    (O[_.LINE_TO] = 2),
    (O[_.HORIZ_LINE_TO] = 1),
    (O[_.VERT_LINE_TO] = 1),
    (O[_.CLOSE_PATH] = 0),
    (O[_.QUAD_TO] = 4),
    (O[_.SMOOTH_QUAD_TO] = 2),
    (O[_.CURVE_TO] = 6),
    (O[_.SMOOTH_CURVE_TO] = 4),
    (O[_.ARC] = 7),
    O);

var SVGPathData_module = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  COMMAND_ARG_COUNTS: N,
  SVGPathData: _,
  SVGPathDataParser: f,
  get SVGPathDataTransformer() {
    return u;
  },
  encodeSVGPath: e,
});

var require$$41 = /*@__PURE__*/ getAugmentedNamespace(SVGPathData_module);

var es_regexp_toString = {};

var hasRequiredEs_regexp_toString;

function requireEs_regexp_toString() {
  if (hasRequiredEs_regexp_toString) return es_regexp_toString;
  hasRequiredEs_regexp_toString = 1;
  var PROPER_FUNCTION_NAME = requireFunctionName().PROPER;
  var defineBuiltIn = requireDefineBuiltIn();
  var anObject = requireAnObject();
  var $toString = requireToString();
  var fails = requireFails();
  var getRegExpFlags = requireRegexpGetFlags();

  var TO_STRING = 'toString';
  var RegExpPrototype = RegExp.prototype;
  var nativeToString = RegExpPrototype[TO_STRING];

  var NOT_GENERIC = fails(function () {
    return nativeToString.call({ source: 'a', flags: 'b' }) !== '/a/b';
  });
  // FF44- RegExp#toString has a wrong name
  var INCORRECT_NAME = PROPER_FUNCTION_NAME && nativeToString.name !== TO_STRING;

  // `RegExp.prototype.toString` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.tostring
  if (NOT_GENERIC || INCORRECT_NAME) {
    defineBuiltIn(
      RegExpPrototype,
      TO_STRING,
      function toString() {
        var R = anObject(this);
        var pattern = $toString(R.source);
        var flags = $toString(getRegExpFlags(R));
        return '/' + pattern + '/' + flags;
      },
      { unsafe: true },
    );
  }
  return es_regexp_toString;
}

var es_array_iterator;
var hasRequiredEs_array_iterator;

function requireEs_array_iterator() {
  if (hasRequiredEs_array_iterator) return es_array_iterator;
  hasRequiredEs_array_iterator = 1;
  var toIndexedObject = requireToIndexedObject();
  var addToUnscopables = requireAddToUnscopables();
  var Iterators = requireIterators();
  var InternalStateModule = requireInternalState();
  var defineProperty = requireObjectDefineProperty().f;
  var defineIterator = requireIteratorDefine();
  var createIterResultObject = requireCreateIterResultObject();
  var IS_PURE = requireIsPure();
  var DESCRIPTORS = requireDescriptors();

  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState = InternalStateModule.set;
  var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

  // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator
  es_array_iterator = defineIterator(
    Array,
    'Array',
    function (iterated, kind) {
      setInternalState(this, {
        type: ARRAY_ITERATOR,
        target: toIndexedObject(iterated), // target
        index: 0, // next index
        kind: kind, // kind
      });
      // `%ArrayIteratorPrototype%.next` method
      // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
    },
    function () {
      var state = getInternalState(this);
      var target = state.target;
      var index = state.index++;
      if (!target || index >= target.length) {
        state.target = null;
        return createIterResultObject(undefined, true);
      }
      switch (state.kind) {
        case 'keys':
          return createIterResultObject(index, false);
        case 'values':
          return createIterResultObject(target[index], false);
      }
      return createIterResultObject([index, target[index]], false);
    },
    'values',
  );

  // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject
  var values = (Iterators.Arguments = Iterators.Array);

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');

  // V8 ~ Chrome 45- bug
  if (!IS_PURE && DESCRIPTORS && values.name !== 'values')
    try {
      defineProperty(values, 'name', { value: 'values' });
    } catch (error) {
      /* empty */
    }
  return es_array_iterator;
}

var web_domCollections_iterator = {};

var hasRequiredWeb_domCollections_iterator;

function requireWeb_domCollections_iterator() {
  if (hasRequiredWeb_domCollections_iterator) return web_domCollections_iterator;
  hasRequiredWeb_domCollections_iterator = 1;
  var globalThis = requireGlobalThis();
  var DOMIterables = requireDomIterables();
  var DOMTokenListPrototype = requireDomTokenListPrototype();
  var ArrayIteratorMethods = requireEs_array_iterator();
  var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
  var setToStringTag = requireSetToStringTag();
  var wellKnownSymbol = requireWellKnownSymbol();

  var ITERATOR = wellKnownSymbol('iterator');
  var ArrayValues = ArrayIteratorMethods.values;

  var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
    if (CollectionPrototype) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[ITERATOR] !== ArrayValues)
        try {
          createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
        } catch (error) {
          CollectionPrototype[ITERATOR] = ArrayValues;
        }
      setToStringTag(CollectionPrototype, COLLECTION_NAME, true);
      if (DOMIterables[COLLECTION_NAME])
        for (var METHOD_NAME in ArrayIteratorMethods) {
          // some Chrome versions have non-configurable methods on DOMTokenList
          if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME])
            try {
              createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
            } catch (error) {
              CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
            }
        }
    }
  };

  for (var COLLECTION_NAME in DOMIterables) {
    handlePrototype(globalThis[COLLECTION_NAME] && globalThis[COLLECTION_NAME].prototype, COLLECTION_NAME);
  }

  handlePrototype(DOMTokenListPrototype, 'DOMTokenList');
  return web_domCollections_iterator;
}

var es_map = {};

var es_map_constructor = {};

var internalMetadata = { exports: {} };

var objectGetOwnPropertyNamesExternal = {};

var hasRequiredObjectGetOwnPropertyNamesExternal;

function requireObjectGetOwnPropertyNamesExternal() {
  if (hasRequiredObjectGetOwnPropertyNamesExternal) return objectGetOwnPropertyNamesExternal;
  hasRequiredObjectGetOwnPropertyNamesExternal = 1;
  /* eslint-disable es/no-object-getownpropertynames -- safe */
  var classof = requireClassofRaw();
  var toIndexedObject = requireToIndexedObject();
  var $getOwnPropertyNames = requireObjectGetOwnPropertyNames().f;
  var arraySlice = requireArraySlice();

  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function (it) {
    try {
      return $getOwnPropertyNames(it);
    } catch (error) {
      return arraySlice(windowNames);
    }
  };

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
    return windowNames && classof(it) === 'Window' ? getWindowNames(it) : $getOwnPropertyNames(toIndexedObject(it));
  };
  return objectGetOwnPropertyNamesExternal;
}

var arrayBufferNonExtensible;
var hasRequiredArrayBufferNonExtensible;

function requireArrayBufferNonExtensible() {
  if (hasRequiredArrayBufferNonExtensible) return arrayBufferNonExtensible;
  hasRequiredArrayBufferNonExtensible = 1;
  // FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
  var fails = requireFails();

  arrayBufferNonExtensible = fails(function () {
    if (typeof ArrayBuffer == 'function') {
      var buffer = new ArrayBuffer(8);
      // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
      if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
    }
  });
  return arrayBufferNonExtensible;
}

var objectIsExtensible;
var hasRequiredObjectIsExtensible;

function requireObjectIsExtensible() {
  if (hasRequiredObjectIsExtensible) return objectIsExtensible;
  hasRequiredObjectIsExtensible = 1;
  var fails = requireFails();
  var isObject = requireIsObject();
  var classof = requireClassofRaw();
  var ARRAY_BUFFER_NON_EXTENSIBLE = requireArrayBufferNonExtensible();

  // eslint-disable-next-line es/no-object-isextensible -- safe
  var $isExtensible = Object.isExtensible;
  var FAILS_ON_PRIMITIVES = fails(function () {});

  // `Object.isExtensible` method
  // https://tc39.es/ecma262/#sec-object.isextensible
  objectIsExtensible =
    FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE
      ? function isExtensible(it) {
          if (!isObject(it)) return false;
          if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) === 'ArrayBuffer') return false;
          return $isExtensible ? $isExtensible(it) : true;
        }
      : $isExtensible;
  return objectIsExtensible;
}

var freezing;
var hasRequiredFreezing;

function requireFreezing() {
  if (hasRequiredFreezing) return freezing;
  hasRequiredFreezing = 1;
  var fails = requireFails();

  freezing = !fails(function () {
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
    return Object.isExtensible(Object.preventExtensions({}));
  });
  return freezing;
}

var hasRequiredInternalMetadata;

function requireInternalMetadata() {
  if (hasRequiredInternalMetadata) return internalMetadata.exports;
  hasRequiredInternalMetadata = 1;
  var $ = require_export();
  var uncurryThis = requireFunctionUncurryThis();
  var hiddenKeys = requireHiddenKeys();
  var isObject = requireIsObject();
  var hasOwn = requireHasOwnProperty();
  var defineProperty = requireObjectDefineProperty().f;
  var getOwnPropertyNamesModule = requireObjectGetOwnPropertyNames();
  var getOwnPropertyNamesExternalModule = requireObjectGetOwnPropertyNamesExternal();
  var isExtensible = requireObjectIsExtensible();
  var uid = requireUid();
  var FREEZING = requireFreezing();

  var REQUIRED = false;
  var METADATA = uid('meta');
  var id = 0;

  var setMetadata = function (it) {
    defineProperty(it, METADATA, {
      value: {
        objectID: 'O' + id++, // object ID
        weakData: {}, // weak collections IDs
      },
    });
  };

  var fastKey = function (it, create) {
    // return a primitive with prefix
    if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!hasOwn(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F';
      // not necessary to add metadata
      if (!create) return 'E';
      // add missing metadata
      setMetadata(it);
      // return object ID
    }
    return it[METADATA].objectID;
  };

  var getWeakData = function (it, create) {
    if (!hasOwn(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true;
      // not necessary to add metadata
      if (!create) return false;
      // add missing metadata
      setMetadata(it);
      // return the store of weak collections IDs
    }
    return it[METADATA].weakData;
  };

  // add metadata on freeze-family methods calling
  var onFreeze = function (it) {
    if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn(it, METADATA)) setMetadata(it);
    return it;
  };

  var enable = function () {
    meta.enable = function () {
      /* empty */
    };
    REQUIRED = true;
    var getOwnPropertyNames = getOwnPropertyNamesModule.f;
    var splice = uncurryThis([].splice);
    var test = {};
    test[METADATA] = 1;

    // prevent exposing of metadata key
    if (getOwnPropertyNames(test).length) {
      getOwnPropertyNamesModule.f = function (it) {
        var result = getOwnPropertyNames(it);
        for (var i = 0, length = result.length; i < length; i++) {
          if (result[i] === METADATA) {
            splice(result, i, 1);
            break;
          }
        }
        return result;
      };

      $(
        { target: 'Object', stat: true, forced: true },
        {
          getOwnPropertyNames: getOwnPropertyNamesExternalModule.f,
        },
      );
    }
  };

  var meta = (internalMetadata.exports = {
    enable: enable,
    fastKey: fastKey,
    getWeakData: getWeakData,
    onFreeze: onFreeze,
  });

  hiddenKeys[METADATA] = true;
  return internalMetadata.exports;
}

var collection;
var hasRequiredCollection;

function requireCollection() {
  if (hasRequiredCollection) return collection;
  hasRequiredCollection = 1;
  var $ = require_export();
  var globalThis = requireGlobalThis();
  var uncurryThis = requireFunctionUncurryThis();
  var isForced = requireIsForced();
  var defineBuiltIn = requireDefineBuiltIn();
  var InternalMetadataModule = requireInternalMetadata();
  var iterate = requireIterate();
  var anInstance = requireAnInstance();
  var isCallable = requireIsCallable();
  var isNullOrUndefined = requireIsNullOrUndefined();
  var isObject = requireIsObject();
  var fails = requireFails();
  var checkCorrectnessOfIteration = requireCheckCorrectnessOfIteration();
  var setToStringTag = requireSetToStringTag();
  var inheritIfRequired = requireInheritIfRequired();

  collection = function (CONSTRUCTOR_NAME, wrapper, common) {
    var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
    var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
    var ADDER = IS_MAP ? 'set' : 'add';
    var NativeConstructor = globalThis[CONSTRUCTOR_NAME];
    var NativePrototype = NativeConstructor && NativeConstructor.prototype;
    var Constructor = NativeConstructor;
    var exported = {};

    var fixMethod = function (KEY) {
      var uncurriedNativeMethod = uncurryThis(NativePrototype[KEY]);
      defineBuiltIn(
        NativePrototype,
        KEY,
        KEY === 'add'
          ? function add(value) {
              uncurriedNativeMethod(this, value === 0 ? 0 : value);
              return this;
            }
          : KEY === 'delete'
            ? function (key) {
                return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
              }
            : KEY === 'get'
              ? function get(key) {
                  return IS_WEAK && !isObject(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
                }
              : KEY === 'has'
                ? function has(key) {
                    return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
                  }
                : function set(key, value) {
                    uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
                    return this;
                  },
      );
    };

    var REPLACE = isForced(
      CONSTRUCTOR_NAME,
      !isCallable(NativeConstructor) ||
        !(
          IS_WEAK ||
          (NativePrototype.forEach &&
            !fails(function () {
              new NativeConstructor().entries().next();
            }))
        ),
    );

    if (REPLACE) {
      // create collection constructor
      Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
      InternalMetadataModule.enable();
    } else if (isForced(CONSTRUCTOR_NAME, true)) {
      var instance = new Constructor();
      // early implementations not supports chaining
      var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) !== instance;
      // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
      var THROWS_ON_PRIMITIVES = fails(function () {
        instance.has(1);
      });
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      // eslint-disable-next-line no-new -- required for testing
      var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) {
        new NativeConstructor(iterable);
      });
      // for early implementations -0 and +0 not the same
      var BUGGY_ZERO =
        !IS_WEAK &&
        fails(function () {
          // V8 ~ Chromium 42- fails only with 5+ elements
          var $instance = new NativeConstructor();
          var index = 5;
          while (index--) $instance[ADDER](index, index);
          return !$instance.has(-0);
        });

      if (!ACCEPT_ITERABLES) {
        Constructor = wrapper(function (dummy, iterable) {
          anInstance(dummy, NativePrototype);
          var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
          if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
          return that;
        });
        Constructor.prototype = NativePrototype;
        NativePrototype.constructor = Constructor;
      }

      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }

      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

      // weak collections should not contains .clear method
      if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
    }

    exported[CONSTRUCTOR_NAME] = Constructor;
    $({ global: true, constructor: true, forced: Constructor !== NativeConstructor }, exported);

    setToStringTag(Constructor, CONSTRUCTOR_NAME);

    if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

    return Constructor;
  };
  return collection;
}

var defineBuiltIns;
var hasRequiredDefineBuiltIns;

function requireDefineBuiltIns() {
  if (hasRequiredDefineBuiltIns) return defineBuiltIns;
  hasRequiredDefineBuiltIns = 1;
  var defineBuiltIn = requireDefineBuiltIn();

  defineBuiltIns = function (target, src, options) {
    for (var key in src) defineBuiltIn(target, key, src[key], options);
    return target;
  };
  return defineBuiltIns;
}

var collectionStrong;
var hasRequiredCollectionStrong;

function requireCollectionStrong() {
  if (hasRequiredCollectionStrong) return collectionStrong;
  hasRequiredCollectionStrong = 1;
  var create = requireObjectCreate();
  var defineBuiltInAccessor = requireDefineBuiltInAccessor();
  var defineBuiltIns = requireDefineBuiltIns();
  var bind = requireFunctionBindContext();
  var anInstance = requireAnInstance();
  var isNullOrUndefined = requireIsNullOrUndefined();
  var iterate = requireIterate();
  var defineIterator = requireIteratorDefine();
  var createIterResultObject = requireCreateIterResultObject();
  var setSpecies = requireSetSpecies();
  var DESCRIPTORS = requireDescriptors();
  var fastKey = requireInternalMetadata().fastKey;
  var InternalStateModule = requireInternalState();

  var setInternalState = InternalStateModule.set;
  var internalStateGetterFor = InternalStateModule.getterFor;

  collectionStrong = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var Constructor = wrapper(function (that, iterable) {
        anInstance(that, Prototype);
        setInternalState(that, {
          type: CONSTRUCTOR_NAME,
          index: create(null),
          first: null,
          last: null,
          size: 0,
        });
        if (!DESCRIPTORS) that.size = 0;
        if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
      });

      var Prototype = Constructor.prototype;

      var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        var previous, index;
        // change existing entry
        if (entry) {
          entry.value = value;
          // create new entry
        } else {
          state.last = entry = {
            index: (index = fastKey(key, true)),
            key: key,
            value: value,
            previous: (previous = state.last),
            next: null,
            removed: false,
          };
          if (!state.first) state.first = entry;
          if (previous) previous.next = entry;
          if (DESCRIPTORS) state.size++;
          else that.size++;
          // add to index
          if (index !== 'F') state.index[index] = entry;
        }
        return that;
      };

      var getEntry = function (that, key) {
        var state = getInternalState(that);
        // fast case
        var index = fastKey(key);
        var entry;
        if (index !== 'F') return state.index[index];
        // frozen object case
        for (entry = state.first; entry; entry = entry.next) {
          if (entry.key === key) return entry;
        }
      };

      defineBuiltIns(Prototype, {
        // `{ Map, Set }.prototype.clear()` methods
        // https://tc39.es/ecma262/#sec-map.prototype.clear
        // https://tc39.es/ecma262/#sec-set.prototype.clear
        clear: function clear() {
          var that = this;
          var state = getInternalState(that);
          var entry = state.first;
          while (entry) {
            entry.removed = true;
            if (entry.previous) entry.previous = entry.previous.next = null;
            entry = entry.next;
          }
          state.first = state.last = null;
          state.index = create(null);
          if (DESCRIPTORS) state.size = 0;
          else that.size = 0;
        },
        // `{ Map, Set }.prototype.delete(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.delete
        // https://tc39.es/ecma262/#sec-set.prototype.delete
        delete: function (key) {
          var that = this;
          var state = getInternalState(that);
          var entry = getEntry(that, key);
          if (entry) {
            var next = entry.next;
            var prev = entry.previous;
            delete state.index[entry.index];
            entry.removed = true;
            if (prev) prev.next = next;
            if (next) next.previous = prev;
            if (state.first === entry) state.first = next;
            if (state.last === entry) state.last = prev;
            if (DESCRIPTORS) state.size--;
            else that.size--;
          }
          return !!entry;
        },
        // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.foreach
        // https://tc39.es/ecma262/#sec-set.prototype.foreach
        forEach: function forEach(callbackfn /* , that = undefined */) {
          var state = getInternalState(this);
          var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
          var entry;
          while ((entry = entry ? entry.next : state.first)) {
            boundFunction(entry.value, entry.key, this);
            // revert to the last existing entry
            while (entry && entry.removed) entry = entry.previous;
          }
        },
        // `{ Map, Set}.prototype.has(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.has
        // https://tc39.es/ecma262/#sec-set.prototype.has
        has: function has(key) {
          return !!getEntry(this, key);
        },
      });

      defineBuiltIns(
        Prototype,
        IS_MAP
          ? {
              // `Map.prototype.get(key)` method
              // https://tc39.es/ecma262/#sec-map.prototype.get
              get: function get(key) {
                var entry = getEntry(this, key);
                return entry && entry.value;
              },
              // `Map.prototype.set(key, value)` method
              // https://tc39.es/ecma262/#sec-map.prototype.set
              set: function set(key, value) {
                return define(this, key === 0 ? 0 : key, value);
              },
            }
          : {
              // `Set.prototype.add(value)` method
              // https://tc39.es/ecma262/#sec-set.prototype.add
              add: function add(value) {
                return define(this, (value = value === 0 ? 0 : value), value);
              },
            },
      );
      if (DESCRIPTORS)
        defineBuiltInAccessor(Prototype, 'size', {
          configurable: true,
          get: function () {
            return getInternalState(this).size;
          },
        });
      return Constructor;
    },
    setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
      var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
      var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
      var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
      // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.entries
      // https://tc39.es/ecma262/#sec-map.prototype.keys
      // https://tc39.es/ecma262/#sec-map.prototype.values
      // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
      // https://tc39.es/ecma262/#sec-set.prototype.entries
      // https://tc39.es/ecma262/#sec-set.prototype.keys
      // https://tc39.es/ecma262/#sec-set.prototype.values
      // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
      defineIterator(
        Constructor,
        CONSTRUCTOR_NAME,
        function (iterated, kind) {
          setInternalState(this, {
            type: ITERATOR_NAME,
            target: iterated,
            state: getInternalCollectionState(iterated),
            kind: kind,
            last: null,
          });
        },
        function () {
          var state = getInternalIteratorState(this);
          var kind = state.kind;
          var entry = state.last;
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
          // get next entry
          if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
            // or finish the iteration
            state.target = null;
            return createIterResultObject(undefined, true);
          }
          // return step by kind
          if (kind === 'keys') return createIterResultObject(entry.key, false);
          if (kind === 'values') return createIterResultObject(entry.value, false);
          return createIterResultObject([entry.key, entry.value], false);
        },
        IS_MAP ? 'entries' : 'values',
        !IS_MAP,
        true,
      );

      // `{ Map, Set }.prototype[@@species]` accessors
      // https://tc39.es/ecma262/#sec-get-map-@@species
      // https://tc39.es/ecma262/#sec-get-set-@@species
      setSpecies(CONSTRUCTOR_NAME);
    },
  };
  return collectionStrong;
}

var hasRequiredEs_map_constructor;

function requireEs_map_constructor() {
  if (hasRequiredEs_map_constructor) return es_map_constructor;
  hasRequiredEs_map_constructor = 1;
  var collection = requireCollection();
  var collectionStrong = requireCollectionStrong();

  // `Map` constructor
  // https://tc39.es/ecma262/#sec-map-objects
  collection(
    'Map',
    function (init) {
      return function Map() {
        return init(this, arguments.length ? arguments[0] : undefined);
      };
    },
    collectionStrong,
  );
  return es_map_constructor;
}

var hasRequiredEs_map;

function requireEs_map() {
  if (hasRequiredEs_map) return es_map;
  hasRequiredEs_map = 1;
  // TODO: Remove this module from `core-js@4` since it's replaced to module below
  requireEs_map_constructor();
  return es_map;
}

var es_reflect_apply = {};

var hasRequiredEs_reflect_apply;

function requireEs_reflect_apply() {
  if (hasRequiredEs_reflect_apply) return es_reflect_apply;
  hasRequiredEs_reflect_apply = 1;
  var $ = require_export();
  var functionApply = requireFunctionApply();
  var aCallable = requireACallable();
  var anObject = requireAnObject();
  var fails = requireFails();

  // MS Edge argumentsList argument is optional
  var OPTIONAL_ARGUMENTS_LIST = !fails(function () {
    // eslint-disable-next-line es/no-reflect -- required for testing
    Reflect.apply(function () {
      /* empty */
    });
  });

  // `Reflect.apply` method
  // https://tc39.es/ecma262/#sec-reflect.apply
  $(
    { target: 'Reflect', stat: true, forced: OPTIONAL_ARGUMENTS_LIST },
    {
      apply: function apply(target, thisArgument, argumentsList) {
        return functionApply(aCallable(target), thisArgument, anObject(argumentsList));
      },
    },
  );
  return es_reflect_apply;
}

var es_reflect_getPrototypeOf = {};

var hasRequiredEs_reflect_getPrototypeOf;

function requireEs_reflect_getPrototypeOf() {
  if (hasRequiredEs_reflect_getPrototypeOf) return es_reflect_getPrototypeOf;
  hasRequiredEs_reflect_getPrototypeOf = 1;
  var $ = require_export();
  var anObject = requireAnObject();
  var objectGetPrototypeOf = requireObjectGetPrototypeOf();
  var CORRECT_PROTOTYPE_GETTER = requireCorrectPrototypeGetter();

  // `Reflect.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-reflect.getprototypeof
  $(
    { target: 'Reflect', stat: true, sham: !CORRECT_PROTOTYPE_GETTER },
    {
      getPrototypeOf: function getPrototypeOf(target) {
        return objectGetPrototypeOf(anObject(target));
      },
    },
  );
  return es_reflect_getPrototypeOf;
}

function _typeof(obj) {
  '@babel/helpers - typeof';

  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

/* eslint-disable no-bitwise -- used for calculations */

/* eslint-disable unicorn/prefer-query-selector -- aiming at
  backward-compatibility */

/**
 * StackBlur - a fast almost Gaussian Blur For Canvas
 *
 * In case you find this class useful - especially in commercial projects -
 * I am not totally unhappy for a small donation to my PayPal account
 * mario@quasimondo.de
 *
 * Or support me on flattr:
 * {@link https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript}.
 *
 * @module StackBlur
 * @author Mario Klingemann
 * Contact: mario@quasimondo.com
 * Website: {@link http://www.quasimondo.com/StackBlurForCanvas/StackBlurDemo.html}
 * Twitter: @quasimondo
 *
 * @copyright (c) 2010 Mario Klingemann
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
var mulTable = [
  512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428,
  405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428,
  417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381,
  374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428,
  422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274,
  271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381,
  377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280,
  278, 275, 273, 271, 269, 267, 265, 263, 261, 259,
];
var shgTable = [
  9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
  20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
  21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23,
  23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
  23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
  24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
];
/**
 * @param {string|HTMLImageElement} img
 * @param {string|HTMLCanvasElement} canvas
 * @param {Float} radius
 * @param {boolean} blurAlphaChannel
 * @param {boolean} useOffset
 * @param {boolean} skipStyles
 * @returns {undefined}
 */

function processImage(img, canvas, radius, blurAlphaChannel, useOffset, skipStyles) {
  if (typeof img === 'string') {
    img = document.getElementById(img);
  }

  if (!img || (Object.prototype.toString.call(img).slice(8, -1) === 'HTMLImageElement' && !('naturalWidth' in img))) {
    return;
  }

  var dimensionType = useOffset ? 'offset' : 'natural';
  var w = img[dimensionType + 'Width'];
  var h = img[dimensionType + 'Height']; // add ImageBitmap support,can blur texture source

  if (Object.prototype.toString.call(img).slice(8, -1) === 'ImageBitmap') {
    w = img.width;
    h = img.height;
  }

  if (typeof canvas === 'string') {
    canvas = document.getElementById(canvas);
  }

  if (!canvas || !('getContext' in canvas)) {
    return;
  }

  if (!skipStyles) {
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
  }

  canvas.width = w;
  canvas.height = h;
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, w, h);
  context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, w, h);

  if (isNaN(radius) || radius < 1) {
    return;
  }

  if (blurAlphaChannel) {
    processCanvasRGBA(canvas, 0, 0, w, h, radius);
  } else {
    processCanvasRGB(canvas, 0, 0, w, h, radius);
  }
}
/**
 * @param {string|HTMLCanvasElement} canvas
 * @param {Integer} topX
 * @param {Integer} topY
 * @param {Integer} width
 * @param {Integer} height
 * @throws {Error|TypeError}
 * @returns {ImageData} See {@link https://html.spec.whatwg.org/multipage/canvas.html#imagedata}
 */

function getImageDataFromCanvas(canvas, topX, topY, width, height) {
  if (typeof canvas === 'string') {
    canvas = document.getElementById(canvas);
  }

  if (!canvas || _typeof(canvas) !== 'object' || !('getContext' in canvas)) {
    throw new TypeError('Expecting canvas with `getContext` method ' + 'in processCanvasRGB(A) calls!');
  }

  var context = canvas.getContext('2d');

  try {
    return context.getImageData(topX, topY, width, height);
  } catch (e) {
    throw new Error('unable to access image data: ' + e);
  }
}
/**
 * @param {HTMLCanvasElement} canvas
 * @param {Integer} topX
 * @param {Integer} topY
 * @param {Integer} width
 * @param {Integer} height
 * @param {Float} radius
 * @returns {undefined}
 */

function processCanvasRGBA(canvas, topX, topY, width, height, radius) {
  if (isNaN(radius) || radius < 1) {
    return;
  }

  radius |= 0;
  var imageData = getImageDataFromCanvas(canvas, topX, topY, width, height);
  imageData = processImageDataRGBA(imageData, topX, topY, width, height, radius);
  canvas.getContext('2d').putImageData(imageData, topX, topY);
}
/**
 * @param {ImageData} imageData
 * @param {Integer} topX
 * @param {Integer} topY
 * @param {Integer} width
 * @param {Integer} height
 * @param {Float} radius
 * @returns {ImageData}
 */

function processImageDataRGBA(imageData, topX, topY, width, height, radius) {
  var pixels = imageData.data;
  var div = 2 * radius + 1; // const w4 = width << 2;

  var widthMinus1 = width - 1;
  var heightMinus1 = height - 1;
  var radiusPlus1 = radius + 1;
  var sumFactor = (radiusPlus1 * (radiusPlus1 + 1)) / 2;
  var stackStart = new BlurStack();
  var stack = stackStart;
  var stackEnd;

  for (var i = 1; i < div; i++) {
    stack = stack.next = new BlurStack();

    if (i === radiusPlus1) {
      stackEnd = stack;
    }
  }

  stack.next = stackStart;
  var stackIn = null,
    stackOut = null,
    yw = 0,
    yi = 0;
  var mulSum = mulTable[radius];
  var shgSum = shgTable[radius];

  for (var y = 0; y < height; y++) {
    stack = stackStart;
    var pr = pixels[yi],
      pg = pixels[yi + 1],
      pb = pixels[yi + 2],
      pa = pixels[yi + 3];

    for (var _i = 0; _i < radiusPlus1; _i++) {
      stack.r = pr;
      stack.g = pg;
      stack.b = pb;
      stack.a = pa;
      stack = stack.next;
    }

    var rInSum = 0,
      gInSum = 0,
      bInSum = 0,
      aInSum = 0,
      rOutSum = radiusPlus1 * pr,
      gOutSum = radiusPlus1 * pg,
      bOutSum = radiusPlus1 * pb,
      aOutSum = radiusPlus1 * pa,
      rSum = sumFactor * pr,
      gSum = sumFactor * pg,
      bSum = sumFactor * pb,
      aSum = sumFactor * pa;

    for (var _i2 = 1; _i2 < radiusPlus1; _i2++) {
      var p = yi + ((widthMinus1 < _i2 ? widthMinus1 : _i2) << 2);
      var r = pixels[p],
        g = pixels[p + 1],
        b = pixels[p + 2],
        a = pixels[p + 3];
      var rbs = radiusPlus1 - _i2;
      rSum += (stack.r = r) * rbs;
      gSum += (stack.g = g) * rbs;
      bSum += (stack.b = b) * rbs;
      aSum += (stack.a = a) * rbs;
      rInSum += r;
      gInSum += g;
      bInSum += b;
      aInSum += a;
      stack = stack.next;
    }

    stackIn = stackStart;
    stackOut = stackEnd;

    for (var x = 0; x < width; x++) {
      var paInitial = (aSum * mulSum) >>> shgSum;
      pixels[yi + 3] = paInitial;

      if (paInitial !== 0) {
        var _a2 = 255 / paInitial;

        pixels[yi] = ((rSum * mulSum) >>> shgSum) * _a2;
        pixels[yi + 1] = ((gSum * mulSum) >>> shgSum) * _a2;
        pixels[yi + 2] = ((bSum * mulSum) >>> shgSum) * _a2;
      } else {
        pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
      }

      rSum -= rOutSum;
      gSum -= gOutSum;
      bSum -= bOutSum;
      aSum -= aOutSum;
      rOutSum -= stackIn.r;
      gOutSum -= stackIn.g;
      bOutSum -= stackIn.b;
      aOutSum -= stackIn.a;

      var _p = x + radius + 1;

      _p = (yw + (_p < widthMinus1 ? _p : widthMinus1)) << 2;
      rInSum += stackIn.r = pixels[_p];
      gInSum += stackIn.g = pixels[_p + 1];
      bInSum += stackIn.b = pixels[_p + 2];
      aInSum += stackIn.a = pixels[_p + 3];
      rSum += rInSum;
      gSum += gInSum;
      bSum += bInSum;
      aSum += aInSum;
      stackIn = stackIn.next;
      var _stackOut = stackOut,
        _r = _stackOut.r,
        _g = _stackOut.g,
        _b = _stackOut.b,
        _a = _stackOut.a;
      rOutSum += _r;
      gOutSum += _g;
      bOutSum += _b;
      aOutSum += _a;
      rInSum -= _r;
      gInSum -= _g;
      bInSum -= _b;
      aInSum -= _a;
      stackOut = stackOut.next;
      yi += 4;
    }

    yw += width;
  }

  for (var _x = 0; _x < width; _x++) {
    yi = _x << 2;

    var _pr = pixels[yi],
      _pg = pixels[yi + 1],
      _pb = pixels[yi + 2],
      _pa = pixels[yi + 3],
      _rOutSum = radiusPlus1 * _pr,
      _gOutSum = radiusPlus1 * _pg,
      _bOutSum = radiusPlus1 * _pb,
      _aOutSum = radiusPlus1 * _pa,
      _rSum = sumFactor * _pr,
      _gSum = sumFactor * _pg,
      _bSum = sumFactor * _pb,
      _aSum = sumFactor * _pa;

    stack = stackStart;

    for (var _i3 = 0; _i3 < radiusPlus1; _i3++) {
      stack.r = _pr;
      stack.g = _pg;
      stack.b = _pb;
      stack.a = _pa;
      stack = stack.next;
    }

    var yp = width;
    var _gInSum = 0,
      _bInSum = 0,
      _aInSum = 0,
      _rInSum = 0;

    for (var _i4 = 1; _i4 <= radius; _i4++) {
      yi = (yp + _x) << 2;

      var _rbs = radiusPlus1 - _i4;

      _rSum += (stack.r = _pr = pixels[yi]) * _rbs;
      _gSum += (stack.g = _pg = pixels[yi + 1]) * _rbs;
      _bSum += (stack.b = _pb = pixels[yi + 2]) * _rbs;
      _aSum += (stack.a = _pa = pixels[yi + 3]) * _rbs;
      _rInSum += _pr;
      _gInSum += _pg;
      _bInSum += _pb;
      _aInSum += _pa;
      stack = stack.next;

      if (_i4 < heightMinus1) {
        yp += width;
      }
    }

    yi = _x;
    stackIn = stackStart;
    stackOut = stackEnd;

    for (var _y = 0; _y < height; _y++) {
      var _p2 = yi << 2;

      pixels[_p2 + 3] = _pa = (_aSum * mulSum) >>> shgSum;

      if (_pa > 0) {
        _pa = 255 / _pa;
        pixels[_p2] = ((_rSum * mulSum) >>> shgSum) * _pa;
        pixels[_p2 + 1] = ((_gSum * mulSum) >>> shgSum) * _pa;
        pixels[_p2 + 2] = ((_bSum * mulSum) >>> shgSum) * _pa;
      } else {
        pixels[_p2] = pixels[_p2 + 1] = pixels[_p2 + 2] = 0;
      }

      _rSum -= _rOutSum;
      _gSum -= _gOutSum;
      _bSum -= _bOutSum;
      _aSum -= _aOutSum;
      _rOutSum -= stackIn.r;
      _gOutSum -= stackIn.g;
      _bOutSum -= stackIn.b;
      _aOutSum -= stackIn.a;
      _p2 = (_x + ((_p2 = _y + radiusPlus1) < heightMinus1 ? _p2 : heightMinus1) * width) << 2;
      _rSum += _rInSum += stackIn.r = pixels[_p2];
      _gSum += _gInSum += stackIn.g = pixels[_p2 + 1];
      _bSum += _bInSum += stackIn.b = pixels[_p2 + 2];
      _aSum += _aInSum += stackIn.a = pixels[_p2 + 3];
      stackIn = stackIn.next;
      _rOutSum += _pr = stackOut.r;
      _gOutSum += _pg = stackOut.g;
      _bOutSum += _pb = stackOut.b;
      _aOutSum += _pa = stackOut.a;
      _rInSum -= _pr;
      _gInSum -= _pg;
      _bInSum -= _pb;
      _aInSum -= _pa;
      stackOut = stackOut.next;
      yi += width;
    }
  }

  return imageData;
}
/**
 * @param {HTMLCanvasElement} canvas
 * @param {Integer} topX
 * @param {Integer} topY
 * @param {Integer} width
 * @param {Integer} height
 * @param {Float} radius
 * @returns {undefined}
 */

function processCanvasRGB(canvas, topX, topY, width, height, radius) {
  if (isNaN(radius) || radius < 1) {
    return;
  }

  radius |= 0;
  var imageData = getImageDataFromCanvas(canvas, topX, topY, width, height);
  imageData = processImageDataRGB(imageData, topX, topY, width, height, radius);
  canvas.getContext('2d').putImageData(imageData, topX, topY);
}
/**
 * @param {ImageData} imageData
 * @param {Integer} topX
 * @param {Integer} topY
 * @param {Integer} width
 * @param {Integer} height
 * @param {Float} radius
 * @returns {ImageData}
 */

function processImageDataRGB(imageData, topX, topY, width, height, radius) {
  var pixels = imageData.data;
  var div = 2 * radius + 1; // const w4 = width << 2;

  var widthMinus1 = width - 1;
  var heightMinus1 = height - 1;
  var radiusPlus1 = radius + 1;
  var sumFactor = (radiusPlus1 * (radiusPlus1 + 1)) / 2;
  var stackStart = new BlurStack();
  var stack = stackStart;
  var stackEnd;

  for (var i = 1; i < div; i++) {
    stack = stack.next = new BlurStack();

    if (i === radiusPlus1) {
      stackEnd = stack;
    }
  }

  stack.next = stackStart;
  var stackIn = null;
  var stackOut = null;
  var mulSum = mulTable[radius];
  var shgSum = shgTable[radius];
  var p, rbs;
  var yw = 0,
    yi = 0;

  for (var y = 0; y < height; y++) {
    var pr = pixels[yi],
      pg = pixels[yi + 1],
      pb = pixels[yi + 2],
      rOutSum = radiusPlus1 * pr,
      gOutSum = radiusPlus1 * pg,
      bOutSum = radiusPlus1 * pb,
      rSum = sumFactor * pr,
      gSum = sumFactor * pg,
      bSum = sumFactor * pb;
    stack = stackStart;

    for (var _i5 = 0; _i5 < radiusPlus1; _i5++) {
      stack.r = pr;
      stack.g = pg;
      stack.b = pb;
      stack = stack.next;
    }

    var rInSum = 0,
      gInSum = 0,
      bInSum = 0;

    for (var _i6 = 1; _i6 < radiusPlus1; _i6++) {
      p = yi + ((widthMinus1 < _i6 ? widthMinus1 : _i6) << 2);
      rSum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - _i6);
      gSum += (stack.g = pg = pixels[p + 1]) * rbs;
      bSum += (stack.b = pb = pixels[p + 2]) * rbs;
      rInSum += pr;
      gInSum += pg;
      bInSum += pb;
      stack = stack.next;
    }

    stackIn = stackStart;
    stackOut = stackEnd;

    for (var x = 0; x < width; x++) {
      pixels[yi] = (rSum * mulSum) >>> shgSum;
      pixels[yi + 1] = (gSum * mulSum) >>> shgSum;
      pixels[yi + 2] = (bSum * mulSum) >>> shgSum;
      rSum -= rOutSum;
      gSum -= gOutSum;
      bSum -= bOutSum;
      rOutSum -= stackIn.r;
      gOutSum -= stackIn.g;
      bOutSum -= stackIn.b;
      p = (yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;
      rInSum += stackIn.r = pixels[p];
      gInSum += stackIn.g = pixels[p + 1];
      bInSum += stackIn.b = pixels[p + 2];
      rSum += rInSum;
      gSum += gInSum;
      bSum += bInSum;
      stackIn = stackIn.next;
      rOutSum += pr = stackOut.r;
      gOutSum += pg = stackOut.g;
      bOutSum += pb = stackOut.b;
      rInSum -= pr;
      gInSum -= pg;
      bInSum -= pb;
      stackOut = stackOut.next;
      yi += 4;
    }

    yw += width;
  }

  for (var _x2 = 0; _x2 < width; _x2++) {
    yi = _x2 << 2;

    var _pr2 = pixels[yi],
      _pg2 = pixels[yi + 1],
      _pb2 = pixels[yi + 2],
      _rOutSum2 = radiusPlus1 * _pr2,
      _gOutSum2 = radiusPlus1 * _pg2,
      _bOutSum2 = radiusPlus1 * _pb2,
      _rSum2 = sumFactor * _pr2,
      _gSum2 = sumFactor * _pg2,
      _bSum2 = sumFactor * _pb2;

    stack = stackStart;

    for (var _i7 = 0; _i7 < radiusPlus1; _i7++) {
      stack.r = _pr2;
      stack.g = _pg2;
      stack.b = _pb2;
      stack = stack.next;
    }

    var _rInSum2 = 0,
      _gInSum2 = 0,
      _bInSum2 = 0;

    for (var _i8 = 1, yp = width; _i8 <= radius; _i8++) {
      yi = (yp + _x2) << 2;
      _rSum2 += (stack.r = _pr2 = pixels[yi]) * (rbs = radiusPlus1 - _i8);
      _gSum2 += (stack.g = _pg2 = pixels[yi + 1]) * rbs;
      _bSum2 += (stack.b = _pb2 = pixels[yi + 2]) * rbs;
      _rInSum2 += _pr2;
      _gInSum2 += _pg2;
      _bInSum2 += _pb2;
      stack = stack.next;

      if (_i8 < heightMinus1) {
        yp += width;
      }
    }

    yi = _x2;
    stackIn = stackStart;
    stackOut = stackEnd;

    for (var _y2 = 0; _y2 < height; _y2++) {
      p = yi << 2;
      pixels[p] = (_rSum2 * mulSum) >>> shgSum;
      pixels[p + 1] = (_gSum2 * mulSum) >>> shgSum;
      pixels[p + 2] = (_bSum2 * mulSum) >>> shgSum;
      _rSum2 -= _rOutSum2;
      _gSum2 -= _gOutSum2;
      _bSum2 -= _bOutSum2;
      _rOutSum2 -= stackIn.r;
      _gOutSum2 -= stackIn.g;
      _bOutSum2 -= stackIn.b;
      p = (_x2 + ((p = _y2 + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width) << 2;
      _rSum2 += _rInSum2 += stackIn.r = pixels[p];
      _gSum2 += _gInSum2 += stackIn.g = pixels[p + 1];
      _bSum2 += _bInSum2 += stackIn.b = pixels[p + 2];
      stackIn = stackIn.next;
      _rOutSum2 += _pr2 = stackOut.r;
      _gOutSum2 += _pg2 = stackOut.g;
      _bOutSum2 += _pb2 = stackOut.b;
      _rInSum2 -= _pr2;
      _gInSum2 -= _pg2;
      _bInSum2 -= _pb2;
      stackOut = stackOut.next;
      yi += width;
    }
  }

  return imageData;
}
/**
 *
 */

var BlurStack =
  /**
   * Set properties.
   */
  function BlurStack() {
    _classCallCheck(this, BlurStack);

    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
    this.next = null;
  };

var stackblurEs = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  BlurStack: BlurStack,
  canvasRGB: processCanvasRGB,
  canvasRGBA: processCanvasRGBA,
  image: processImage,
  imageDataRGB: processImageDataRGB,
  imageDataRGBA: processImageDataRGBA,
});

var require$$49 = /*@__PURE__*/ getAugmentedNamespace(stackblurEs);

var hasRequiredLib;

function requireLib() {
  if (hasRequiredLib) return lib;
  hasRequiredLib = 1;
  (function (exports) {
    Object.defineProperty(exports, '__esModule', { value: true });

    requireEs_object_toString();
    requireEs_promise();
    requireEs_reflect_deleteProperty();
    var _regeneratorRuntime = requireRegenerator();
    var _asyncToGenerator = requireAsyncToGenerator();
    requireEs_array_map();
    requireEs_parseFloat();
    requireEs_regexp_exec();
    requireEs_string_match();
    requireEs_string_replace();
    requireEs_string_startsWith();
    requireEs_array_join();
    var _slicedToArray = requireSlicedToArray();
    var _defineProperty = requireDefineProperty();
    var _classCallCheck = requireClassCallCheck();
    var _createClass = requireCreateClass();
    requireEs_array_concat();
    requireEs_array_every();
    requireEs_array_reduce();
    requireEs_string_endsWith();
    requireEs_string_split();
    var requestAnimationFrame = requireRaf();
    requireEs_function_name();
    requireEs_string_trim();
    var RGBColor = requireRgbcolor();
    requireEs_array_forEach();
    requireWeb_domCollections_forEach();
    var _inherits = requireInherits();
    var _possibleConstructorReturn = requirePossibleConstructorReturn();
    var _getPrototypeOf = requireGetPrototypeOf();
    requireEs_array_from();
    requireEs_array_includes();
    requireEs_array_indexOf();
    requireEs_array_some();
    requireEs_string_includes();
    requireEs_string_iterator();
    var _toConsumableArray = requireToConsumableArray();
    requireEs_array_reverse();
    requireEs_number_constructor();
    var _get = requireGet();
    requireEs_array_fill();
    var svgPathdata = require$$41;
    requireEs_regexp_toString();
    var _assertThisInitialized = requireAssertThisInitialized();
    requireEs_array_iterator();
    requireWeb_domCollections_iterator();
    requireEs_map();
    requireEs_reflect_apply();
    requireEs_reflect_getPrototypeOf();
    var stackblurCanvas = require$$49;

    function _interopDefaultLegacy(e) {
      return e && typeof e === 'object' && 'default' in e ? e : { default: e };
    }

    var _regeneratorRuntime__default = /*#__PURE__*/ _interopDefaultLegacy(_regeneratorRuntime);
    var _asyncToGenerator__default = /*#__PURE__*/ _interopDefaultLegacy(_asyncToGenerator);
    var _slicedToArray__default = /*#__PURE__*/ _interopDefaultLegacy(_slicedToArray);
    var _defineProperty__default = /*#__PURE__*/ _interopDefaultLegacy(_defineProperty);
    var _classCallCheck__default = /*#__PURE__*/ _interopDefaultLegacy(_classCallCheck);
    var _createClass__default = /*#__PURE__*/ _interopDefaultLegacy(_createClass);
    var requestAnimationFrame__default = /*#__PURE__*/ _interopDefaultLegacy(requestAnimationFrame);
    var RGBColor__default = /*#__PURE__*/ _interopDefaultLegacy(RGBColor);
    var _inherits__default = /*#__PURE__*/ _interopDefaultLegacy(_inherits);
    var _possibleConstructorReturn__default = /*#__PURE__*/ _interopDefaultLegacy(_possibleConstructorReturn);
    var _getPrototypeOf__default = /*#__PURE__*/ _interopDefaultLegacy(_getPrototypeOf);
    var _toConsumableArray__default = /*#__PURE__*/ _interopDefaultLegacy(_toConsumableArray);
    var _get__default = /*#__PURE__*/ _interopDefaultLegacy(_get);
    var _assertThisInitialized__default = /*#__PURE__*/ _interopDefaultLegacy(_assertThisInitialized);

    /**
     * Options preset for `OffscreenCanvas`.
     * @param config - Preset requirements.
     * @param config.DOMParser - XML/HTML parser from string into DOM Document.
     * @returns Preset object.
     */
    function offscreen() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        DOMParserFallback = _ref.DOMParser;

      var preset = {
        window: null,
        ignoreAnimation: true,
        ignoreMouse: true,
        DOMParser: DOMParserFallback,
        createCanvas: function createCanvas(width, height) {
          return new OffscreenCanvas(width, height);
        },
        createImage: function createImage(url) {
          return _asyncToGenerator__default['default'](
            /*#__PURE__*/ _regeneratorRuntime__default['default'].mark(function _callee() {
              var response, blob, img;
              return _regeneratorRuntime__default['default'].wrap(function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      _context.next = 2;
                      return fetch(url);

                    case 2:
                      response = _context.sent;
                      _context.next = 5;
                      return response.blob();

                    case 5:
                      blob = _context.sent;
                      _context.next = 8;
                      return createImageBitmap(blob);

                    case 8:
                      img = _context.sent;
                      return _context.abrupt('return', img);

                    case 10:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee);
            }),
          )();
        },
      };

      if (typeof DOMParser !== 'undefined' || typeof DOMParserFallback === 'undefined') {
        Reflect.deleteProperty(preset, 'DOMParser');
      }

      return preset;
    }

    /**
     * Options preset for `node-canvas`.
     * @param config - Preset requirements.
     * @param config.DOMParser - XML/HTML parser from string into DOM Document.
     * @param config.canvas - `node-canvas` exports.
     * @param config.fetch - WHATWG-compatible `fetch` function.
     * @returns Preset object.
     */
    function node(_ref) {
      var DOMParser = _ref.DOMParser,
        canvas = _ref.canvas,
        fetch = _ref.fetch;
      return {
        window: null,
        ignoreAnimation: true,
        ignoreMouse: true,
        DOMParser: DOMParser,
        fetch: fetch,
        createCanvas: canvas.createCanvas,
        createImage: canvas.loadImage,
      };
    }

    var index = /*#__PURE__*/ Object.freeze({
      __proto__: null,
      offscreen: offscreen,
      node: node,
    });

    /**
     * HTML-safe compress white-spaces.
     * @param str - String to compress.
     * @returns String.
     */
    function compressSpaces(str) {
      return str.replace(/(?!\u3000)\s+/gm, ' ');
    }
    /**
     * HTML-safe left trim.
     * @param str - String to trim.
     * @returns String.
     */

    function trimLeft(str) {
      return str.replace(/^[\n \t]+/, '');
    }
    /**
     * HTML-safe right trim.
     * @param str - String to trim.
     * @returns String.
     */

    function trimRight(str) {
      return str.replace(/[\n \t]+$/, '');
    }
    /**
     * String to numbers array.
     * @param str - Numbers string.
     * @returns Numbers array.
     */

    function toNumbers(str) {
      var matches = (str || '').match(/-?(\d+(?:\.\d*(?:[eE][+-]?\d+)?)?|\.\d+)(?=\D|$)/gm) || [];
      return matches.map(parseFloat);
    } // Microsoft Edge fix

    var allUppercase = /^[A-Z-]+$/;
    /**
     * Normalize attribute name.
     * @param name - Attribute name.
     * @returns Normalized attribute name.
     */

    function normalizeAttributeName(name) {
      if (allUppercase.test(name)) {
        return name.toLowerCase();
      }

      return name;
    }
    /**
     * Parse external URL.
     * @param url - CSS url string.
     * @returns Parsed URL.
     */

    function parseExternalUrl(url) {
      //                      single quotes [2]
      //                      v         double quotes [3]
      //                      v         v         no quotes [4]
      //                      v         v         v
      var urlMatch = /url\(('([^']+)'|"([^"]+)"|([^'")]+))\)/.exec(url) || [];
      return urlMatch[2] || urlMatch[3] || urlMatch[4];
    }
    /**
     * Transform floats to integers in rgb colors.
     * @param color - Color to normalize.
     * @returns Normalized color.
     */

    function normalizeColor(color) {
      if (!color.startsWith('rgb')) {
        return color;
      }

      var rgbParts = 3;
      var normalizedColor = color.replace(/\d+(\.\d+)?/g, function (num, isFloat) {
        return rgbParts-- && isFloat ? String(Math.round(parseFloat(num))) : num;
      });
      return normalizedColor;
    }

    // slightly modified version of https://github.com/keeganstreet/specificity/blob/master/specificity.js
    var attributeRegex = /(\[[^\]]+\])/g;
    var idRegex = /(#[^\s+>~.[:]+)/g;
    var classRegex = /(\.[^\s+>~.[:]+)/g;
    var pseudoElementRegex = /(::[^\s+>~.[:]+|:first-line|:first-letter|:before|:after)/gi;
    var pseudoClassWithBracketsRegex = /(:[\w-]+\([^)]*\))/gi;
    var pseudoClassRegex = /(:[^\s+>~.[:]+)/g;
    var elementRegex = /([^\s+>~.[:]+)/g;

    function findSelectorMatch(selector, regex) {
      var matches = regex.exec(selector);

      if (!matches) {
        return [selector, 0];
      }

      return [selector.replace(regex, ' '), matches.length];
    }
    /**
     * Measure selector specificity.
     * @param selector - Selector to measure.
     * @returns Specificity.
     */

    function getSelectorSpecificity(selector) {
      var specificity = [0, 0, 0];
      var currentSelector = selector.replace(/:not\(([^)]*)\)/g, '     $1 ').replace(/{[\s\S]*/gm, ' ');
      var delta = 0;

      var _findSelectorMatch = findSelectorMatch(currentSelector, attributeRegex);

      var _findSelectorMatch2 = _slicedToArray__default['default'](_findSelectorMatch, 2);

      currentSelector = _findSelectorMatch2[0];
      delta = _findSelectorMatch2[1];
      specificity[1] += delta;

      var _findSelectorMatch3 = findSelectorMatch(currentSelector, idRegex);

      var _findSelectorMatch4 = _slicedToArray__default['default'](_findSelectorMatch3, 2);

      currentSelector = _findSelectorMatch4[0];
      delta = _findSelectorMatch4[1];
      specificity[0] += delta;

      var _findSelectorMatch5 = findSelectorMatch(currentSelector, classRegex);

      var _findSelectorMatch6 = _slicedToArray__default['default'](_findSelectorMatch5, 2);

      currentSelector = _findSelectorMatch6[0];
      delta = _findSelectorMatch6[1];
      specificity[1] += delta;

      var _findSelectorMatch7 = findSelectorMatch(currentSelector, pseudoElementRegex);

      var _findSelectorMatch8 = _slicedToArray__default['default'](_findSelectorMatch7, 2);

      currentSelector = _findSelectorMatch8[0];
      delta = _findSelectorMatch8[1];
      specificity[2] += delta;

      var _findSelectorMatch9 = findSelectorMatch(currentSelector, pseudoClassWithBracketsRegex);

      var _findSelectorMatch10 = _slicedToArray__default['default'](_findSelectorMatch9, 2);

      currentSelector = _findSelectorMatch10[0];
      delta = _findSelectorMatch10[1];
      specificity[1] += delta;

      var _findSelectorMatch11 = findSelectorMatch(currentSelector, pseudoClassRegex);

      var _findSelectorMatch12 = _slicedToArray__default['default'](_findSelectorMatch11, 2);

      currentSelector = _findSelectorMatch12[0];
      delta = _findSelectorMatch12[1];
      specificity[1] += delta;
      currentSelector = currentSelector.replace(/[*\s+>~]/g, ' ').replace(/[#.]/g, ' ');

      var _findSelectorMatch13 = findSelectorMatch(currentSelector, elementRegex);

      var _findSelectorMatch14 = _slicedToArray__default['default'](_findSelectorMatch13, 2);

      currentSelector = _findSelectorMatch14[0];
      delta = _findSelectorMatch14[1];
      // lgtm [js/useless-assignment-to-local]
      specificity[2] += delta;
      return specificity.join('');
    }

    var PSEUDO_ZERO = 0.00000001;
    /**
     * Vector magnitude.
     * @param v
     * @returns Number result.
     */

    function vectorMagnitude(v) {
      return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
    }
    /**
     * Ratio between two vectors.
     * @param u
     * @param v
     * @returns Number result.
     */

    function vectorsRatio(u, v) {
      return (u[0] * v[0] + u[1] * v[1]) / (vectorMagnitude(u) * vectorMagnitude(v));
    }
    /**
     * Angle between two vectors.
     * @param u
     * @param v
     * @returns Number result.
     */

    function vectorsAngle(u, v) {
      return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vectorsRatio(u, v));
    }
    function CB1(t) {
      return t * t * t;
    }
    function CB2(t) {
      return 3 * t * t * (1 - t);
    }
    function CB3(t) {
      return 3 * t * (1 - t) * (1 - t);
    }
    function CB4(t) {
      return (1 - t) * (1 - t) * (1 - t);
    }
    function QB1(t) {
      return t * t;
    }
    function QB2(t) {
      return 2 * t * (1 - t);
    }
    function QB3(t) {
      return (1 - t) * (1 - t);
    }

    var Property = /*#__PURE__*/ (function () {
      function Property(document, name, value) {
        _classCallCheck__default['default'](this, Property);

        this.document = document;
        this.name = name;
        this.value = value;
        this.isNormalizedColor = false;
      }

      _createClass__default['default'](
        Property,
        [
          {
            key: 'split',
            value: function split() {
              var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
              var document = this.document,
                name = this.name;
              return compressSpaces(this.getString())
                .trim()
                .split(separator)
                .map(function (value) {
                  return new Property(document, name, value);
                });
            },
          },
          {
            key: 'hasValue',
            value: function hasValue(zeroIsValue) {
              var value = this.value;
              return value !== null && value !== '' && (zeroIsValue || value !== 0) && typeof value !== 'undefined';
            },
          },
          {
            key: 'isString',
            value: function isString(regexp) {
              var value = this.value;
              var result = typeof value === 'string';

              if (!result || !regexp) {
                return result;
              }

              return regexp.test(value);
            },
          },
          {
            key: 'isUrlDefinition',
            value: function isUrlDefinition() {
              return this.isString(/^url\(/);
            },
          },
          {
            key: 'isPixels',
            value: function isPixels() {
              if (!this.hasValue()) {
                return false;
              }

              var asString = this.getString();

              switch (true) {
                case asString.endsWith('px'):
                case /^[0-9]+$/.test(asString):
                  return true;

                default:
                  return false;
              }
            },
          },
          {
            key: 'setValue',
            value: function setValue(value) {
              this.value = value;
              return this;
            },
          },
          {
            key: 'getValue',
            value: function getValue(def) {
              if (typeof def === 'undefined' || this.hasValue()) {
                return this.value;
              }

              return def;
            },
          },
          {
            key: 'getNumber',
            value: function getNumber(def) {
              if (!this.hasValue()) {
                if (typeof def === 'undefined') {
                  return 0;
                }

                return parseFloat(def);
              }

              var value = this.value;
              var n = parseFloat(value);

              if (this.isString(/%$/)) {
                n /= 100.0;
              }

              return n;
            },
          },
          {
            key: 'getString',
            value: function getString(def) {
              if (typeof def === 'undefined' || this.hasValue()) {
                return typeof this.value === 'undefined' ? '' : String(this.value);
              }

              return String(def);
            },
          },
          {
            key: 'getColor',
            value: function getColor(def) {
              var color = this.getString(def);

              if (this.isNormalizedColor) {
                return color;
              }

              this.isNormalizedColor = true;
              color = normalizeColor(color);
              this.value = color;
              return color;
            },
          },
          {
            key: 'getDpi',
            value: function getDpi() {
              return 96.0; // TODO: compute?
            },
          },
          {
            key: 'getRem',
            value: function getRem() {
              return this.document.rootEmSize;
            },
          },
          {
            key: 'getEm',
            value: function getEm() {
              return this.document.emSize;
            },
          },
          {
            key: 'getUnits',
            value: function getUnits() {
              return this.getString().replace(/[0-9.-]/g, '');
            },
          },
          {
            key: 'getPixels',
            value: function getPixels(axisOrIsFontSize) {
              var processPercent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

              if (!this.hasValue()) {
                return 0;
              }

              var _ref = typeof axisOrIsFontSize === 'boolean' ? [undefined, axisOrIsFontSize] : [axisOrIsFontSize],
                _ref2 = _slicedToArray__default['default'](_ref, 2),
                axis = _ref2[0],
                isFontSize = _ref2[1];

              var viewPort = this.document.screen.viewPort;

              switch (true) {
                case this.isString(/vmin$/):
                  return (this.getNumber() / 100.0) * Math.min(viewPort.computeSize('x'), viewPort.computeSize('y'));

                case this.isString(/vmax$/):
                  return (this.getNumber() / 100.0) * Math.max(viewPort.computeSize('x'), viewPort.computeSize('y'));

                case this.isString(/vw$/):
                  return (this.getNumber() / 100.0) * viewPort.computeSize('x');

                case this.isString(/vh$/):
                  return (this.getNumber() / 100.0) * viewPort.computeSize('y');

                case this.isString(/rem$/):
                  return this.getNumber() * this.getRem();

                case this.isString(/em$/):
                  return this.getNumber() * this.getEm();

                case this.isString(/ex$/):
                  return (this.getNumber() * this.getEm()) / 2.0;

                case this.isString(/px$/):
                  return this.getNumber();

                case this.isString(/pt$/):
                  return this.getNumber() * this.getDpi() * (1.0 / 72.0);

                case this.isString(/pc$/):
                  return this.getNumber() * 15;

                case this.isString(/cm$/):
                  return (this.getNumber() * this.getDpi()) / 2.54;

                case this.isString(/mm$/):
                  return (this.getNumber() * this.getDpi()) / 25.4;

                case this.isString(/in$/):
                  return this.getNumber() * this.getDpi();

                case this.isString(/%$/) && isFontSize:
                  return this.getNumber() * this.getEm();

                case this.isString(/%$/):
                  return this.getNumber() * viewPort.computeSize(axis);

                default: {
                  var n = this.getNumber();

                  if (processPercent && n < 1.0) {
                    return n * viewPort.computeSize(axis);
                  }

                  return n;
                }
              }
            },
          },
          {
            key: 'getMilliseconds',
            value: function getMilliseconds() {
              if (!this.hasValue()) {
                return 0;
              }

              if (this.isString(/ms$/)) {
                return this.getNumber();
              }

              return this.getNumber() * 1000;
            },
          },
          {
            key: 'getRadians',
            value: function getRadians() {
              if (!this.hasValue()) {
                return 0;
              }

              switch (true) {
                case this.isString(/deg$/):
                  return this.getNumber() * (Math.PI / 180.0);

                case this.isString(/grad$/):
                  return this.getNumber() * (Math.PI / 200.0);

                case this.isString(/rad$/):
                  return this.getNumber();

                default:
                  return this.getNumber() * (Math.PI / 180.0);
              }
            },
          },
          {
            key: 'getDefinition',
            value: function getDefinition() {
              var asString = this.getString();
              var name = /#([^)'"]+)/.exec(asString);

              if (name) {
                name = name[1];
              }

              if (!name) {
                name = asString;
              }

              return this.document.definitions[name];
            },
          },
          {
            key: 'getFillStyleDefinition',
            value: function getFillStyleDefinition(element, opacity) {
              var def = this.getDefinition();

              if (!def) {
                return null;
              } // gradient

              if (typeof def.createGradient === 'function') {
                return def.createGradient(this.document.ctx, element, opacity);
              } // pattern

              if (typeof def.createPattern === 'function') {
                if (def.getHrefAttribute().hasValue()) {
                  var patternTransform = def.getAttribute('patternTransform');
                  def = def.getHrefAttribute().getDefinition();

                  if (patternTransform.hasValue()) {
                    def.getAttribute('patternTransform', true).setValue(patternTransform.value);
                  }
                }

                return def.createPattern(this.document.ctx, element, opacity);
              }

              return null;
            },
          },
          {
            key: 'getTextBaseline',
            value: function getTextBaseline() {
              if (!this.hasValue()) {
                return null;
              }

              return Property.textBaselineMapping[this.getString()];
            },
          },
          {
            key: 'addOpacity',
            value: function addOpacity(opacity) {
              var value = this.getColor();
              var len = value.length;
              var commas = 0; // Simulate old RGBColor version, which can't parse rgba.

              for (var i = 0; i < len; i++) {
                if (value[i] === ',') {
                  commas++;
                }

                if (commas === 3) {
                  break;
                }
              }

              if (opacity.hasValue() && this.isString() && commas !== 3) {
                var color = new RGBColor__default['default'](value);

                if (color.ok) {
                  color.alpha = opacity.getNumber();
                  value = color.toRGBA();
                }
              }

              return new Property(this.document, this.name, value);
            },
          },
        ],
        [
          {
            key: 'empty',
            value: function empty(document) {
              return new Property(document, 'EMPTY', '');
            },
          },
        ],
      );

      return Property;
    })();
    Property.textBaselineMapping = {
      'baseline': 'alphabetic',
      'before-edge': 'top',
      'text-before-edge': 'top',
      'middle': 'middle',
      'central': 'middle',
      'after-edge': 'bottom',
      'text-after-edge': 'bottom',
      'ideographic': 'ideographic',
      'alphabetic': 'alphabetic',
      'hanging': 'hanging',
      'mathematical': 'alphabetic',
    };

    var ViewPort = /*#__PURE__*/ (function () {
      function ViewPort() {
        _classCallCheck__default['default'](this, ViewPort);

        this.viewPorts = [];
      }

      _createClass__default['default'](ViewPort, [
        {
          key: 'clear',
          value: function clear() {
            this.viewPorts = [];
          },
        },
        {
          key: 'setCurrent',
          value: function setCurrent(width, height) {
            this.viewPorts.push({
              width: width,
              height: height,
            });
          },
        },
        {
          key: 'removeCurrent',
          value: function removeCurrent() {
            this.viewPorts.pop();
          },
        },
        {
          key: 'getCurrent',
          value: function getCurrent() {
            var viewPorts = this.viewPorts;
            return viewPorts[viewPorts.length - 1];
          },
        },
        {
          key: 'computeSize',
          value: function computeSize(d) {
            if (typeof d === 'number') {
              return d;
            }

            if (d === 'x') {
              return this.width;
            }

            if (d === 'y') {
              return this.height;
            }

            return Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)) / Math.sqrt(2);
          },
        },
        {
          key: 'width',
          get: function get() {
            return this.getCurrent().width;
          },
        },
        {
          key: 'height',
          get: function get() {
            return this.getCurrent().height;
          },
        },
      ]);

      return ViewPort;
    })();

    var Point = /*#__PURE__*/ (function () {
      function Point(x, y) {
        _classCallCheck__default['default'](this, Point);

        this.x = x;
        this.y = y;
      }

      _createClass__default['default'](
        Point,
        [
          {
            key: 'angleTo',
            value: function angleTo(point) {
              return Math.atan2(point.y - this.y, point.x - this.x);
            },
          },
          {
            key: 'applyTransform',
            value: function applyTransform(transform) {
              var x = this.x,
                y = this.y;
              var xp = x * transform[0] + y * transform[2] + transform[4];
              var yp = x * transform[1] + y * transform[3] + transform[5];
              this.x = xp;
              this.y = yp;
            },
          },
        ],
        [
          {
            key: 'parse',
            value: function parse(point) {
              var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

              var _toNumbers = toNumbers(point),
                _toNumbers2 = _slicedToArray__default['default'](_toNumbers, 2),
                _toNumbers2$ = _toNumbers2[0],
                x = _toNumbers2$ === void 0 ? defaultValue : _toNumbers2$,
                _toNumbers2$2 = _toNumbers2[1],
                y = _toNumbers2$2 === void 0 ? defaultValue : _toNumbers2$2;

              return new Point(x, y);
            },
          },
          {
            key: 'parseScale',
            value: function parseScale(scale) {
              var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

              var _toNumbers3 = toNumbers(scale),
                _toNumbers4 = _slicedToArray__default['default'](_toNumbers3, 2),
                _toNumbers4$ = _toNumbers4[0],
                x = _toNumbers4$ === void 0 ? defaultValue : _toNumbers4$,
                _toNumbers4$2 = _toNumbers4[1],
                y = _toNumbers4$2 === void 0 ? x : _toNumbers4$2;

              return new Point(x, y);
            },
          },
          {
            key: 'parsePath',
            value: function parsePath(path) {
              var points = toNumbers(path);
              var len = points.length;
              var pathPoints = [];

              for (var i = 0; i < len; i += 2) {
                pathPoints.push(new Point(points[i], points[i + 1]));
              }

              return pathPoints;
            },
          },
        ],
      );

      return Point;
    })();

    var Mouse = /*#__PURE__*/ (function () {
      function Mouse(screen) {
        _classCallCheck__default['default'](this, Mouse);

        this.screen = screen;
        this.working = false;
        this.events = [];
        this.eventElements = []; // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

        this.onClick = this.onClick.bind(this); // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

        this.onMouseMove = this.onMouseMove.bind(this);
      }

      _createClass__default['default'](Mouse, [
        {
          key: 'isWorking',
          value: function isWorking() {
            return this.working;
          },
        },
        {
          key: 'start',
          value: function start() {
            if (this.working) {
              return;
            }

            var screen = this.screen,
              onClick = this.onClick,
              onMouseMove = this.onMouseMove;
            var canvas = screen.ctx.canvas;
            canvas.onclick = onClick;
            canvas.onmousemove = onMouseMove;
            this.working = true;
          },
        },
        {
          key: 'stop',
          value: function stop() {
            if (!this.working) {
              return;
            }

            var canvas = this.screen.ctx.canvas;
            this.working = false;
            canvas.onclick = null;
            canvas.onmousemove = null;
          },
        },
        {
          key: 'hasEvents',
          value: function hasEvents() {
            return this.working && this.events.length > 0;
          },
        },
        {
          key: 'runEvents',
          value: function runEvents() {
            if (!this.working) {
              return;
            }

            var document = this.screen,
              events = this.events,
              eventElements = this.eventElements;
            var style = document.ctx.canvas.style;

            if (style) {
              style.cursor = '';
            }

            events.forEach(function (_ref, i) {
              var run = _ref.run;
              var element = eventElements[i];

              while (element) {
                run(element);
                element = element.parent;
              }
            }); // done running, clear

            this.events = [];
            this.eventElements = [];
          },
        },
        {
          key: 'checkPath',
          value: function checkPath(element, ctx) {
            if (!this.working || !ctx) {
              return;
            }

            var events = this.events,
              eventElements = this.eventElements;
            events.forEach(function (_ref2, i) {
              var x = _ref2.x,
                y = _ref2.y;

              if (!eventElements[i] && ctx.isPointInPath && ctx.isPointInPath(x, y)) {
                eventElements[i] = element;
              }
            });
          },
        },
        {
          key: 'checkBoundingBox',
          value: function checkBoundingBox(element, boundingBox) {
            if (!this.working || !boundingBox) {
              return;
            }

            var events = this.events,
              eventElements = this.eventElements;
            events.forEach(function (_ref3, i) {
              var x = _ref3.x,
                y = _ref3.y;

              if (!eventElements[i] && boundingBox.isPointInBox(x, y)) {
                eventElements[i] = element;
              }
            });
          },
        },
        {
          key: 'mapXY',
          value: function mapXY(x, y) {
            var _this$screen = this.screen,
              window = _this$screen.window,
              ctx = _this$screen.ctx;
            var point = new Point(x, y);
            var element = ctx.canvas;

            while (element) {
              point.x -= element.offsetLeft;
              point.y -= element.offsetTop;
              element = element.offsetParent;
            }

            if (window.scrollX) {
              point.x += window.scrollX;
            }

            if (window.scrollY) {
              point.y += window.scrollY;
            }

            return point;
          },
        },
        {
          key: 'onClick',
          value: function onClick(event) {
            var _this$mapXY = this.mapXY(event.clientX, event.clientY),
              x = _this$mapXY.x,
              y = _this$mapXY.y;

            this.events.push({
              type: 'onclick',
              x: x,
              y: y,
              run: function run(eventTarget) {
                if (eventTarget.onClick) {
                  eventTarget.onClick();
                }
              },
            });
          },
        },
        {
          key: 'onMouseMove',
          value: function onMouseMove(event) {
            var _this$mapXY2 = this.mapXY(event.clientX, event.clientY),
              x = _this$mapXY2.x,
              y = _this$mapXY2.y;

            this.events.push({
              type: 'onmousemove',
              x: x,
              y: y,
              run: function run(eventTarget) {
                if (eventTarget.onMouseMove) {
                  eventTarget.onMouseMove();
                }
              },
            });
          },
        },
      ]);

      return Mouse;
    })();

    var defaultWindow = typeof window !== 'undefined' ? window : null;
    var defaultFetch$1 =
      typeof fetch !== 'undefined'
        ? fetch.bind(undefined) // `fetch` depends on context: `someObject.fetch(...)` will throw error.
        : null;

    var Screen = /*#__PURE__*/ (function () {
      function Screen(ctx) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$fetch = _ref.fetch,
          fetch = _ref$fetch === void 0 ? defaultFetch$1 : _ref$fetch,
          _ref$window = _ref.window,
          window = _ref$window === void 0 ? defaultWindow : _ref$window;

        _classCallCheck__default['default'](this, Screen);

        this.ctx = ctx;
        this.FRAMERATE = 30;
        this.MAX_VIRTUAL_PIXELS = 30000;
        this.CLIENT_WIDTH = 800;
        this.CLIENT_HEIGHT = 600;
        this.viewPort = new ViewPort();
        this.mouse = new Mouse(this);
        this.animations = [];
        this.waits = [];
        this.frameDuration = 0;
        this.isReadyLock = false;
        this.isFirstRender = true;
        this.intervalId = null;
        this.window = window;
        this.fetch = fetch;
      }

      _createClass__default['default'](Screen, [
        {
          key: 'wait',
          value: function wait(checker) {
            this.waits.push(checker);
          },
        },
        {
          key: 'ready',
          value: function ready() {
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            if (!this.readyPromise) {
              return Promise.resolve();
            }

            return this.readyPromise;
          },
        },
        {
          key: 'isReady',
          value: function isReady() {
            if (this.isReadyLock) {
              return true;
            }

            var isReadyLock = this.waits.every(function (_) {
              return _();
            });

            if (isReadyLock) {
              this.waits = [];

              if (this.resolveReady) {
                this.resolveReady();
              }
            }

            this.isReadyLock = isReadyLock;
            return isReadyLock;
          },
        },
        {
          key: 'setDefaults',
          value: function setDefaults(ctx) {
            // initial values and defaults
            ctx.strokeStyle = 'rgba(0,0,0,0)';
            ctx.lineCap = 'butt';
            ctx.lineJoin = 'miter';
            ctx.miterLimit = 4;
          },
        },
        {
          key: 'setViewBox',
          value: function setViewBox(_ref2) {
            var document = _ref2.document,
              ctx = _ref2.ctx,
              aspectRatio = _ref2.aspectRatio,
              width = _ref2.width,
              desiredWidth = _ref2.desiredWidth,
              height = _ref2.height,
              desiredHeight = _ref2.desiredHeight,
              _ref2$minX = _ref2.minX,
              minX = _ref2$minX === void 0 ? 0 : _ref2$minX,
              _ref2$minY = _ref2.minY,
              minY = _ref2$minY === void 0 ? 0 : _ref2$minY,
              refX = _ref2.refX,
              refY = _ref2.refY,
              _ref2$clip = _ref2.clip,
              clip = _ref2$clip === void 0 ? false : _ref2$clip,
              _ref2$clipX = _ref2.clipX,
              clipX = _ref2$clipX === void 0 ? 0 : _ref2$clipX,
              _ref2$clipY = _ref2.clipY,
              clipY = _ref2$clipY === void 0 ? 0 : _ref2$clipY;
            // aspect ratio - http://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute
            var cleanAspectRatio = compressSpaces(aspectRatio).replace(/^defer\s/, ''); // ignore defer

            var _cleanAspectRatio$spl = cleanAspectRatio.split(' '),
              _cleanAspectRatio$spl2 = _slicedToArray__default['default'](_cleanAspectRatio$spl, 2),
              aspectRatioAlign = _cleanAspectRatio$spl2[0],
              aspectRatioMeetOrSlice = _cleanAspectRatio$spl2[1];

            var align = aspectRatioAlign || 'xMidYMid';
            var meetOrSlice = aspectRatioMeetOrSlice || 'meet'; // calculate scale

            var scaleX = width / desiredWidth;
            var scaleY = height / desiredHeight;
            var scaleMin = Math.min(scaleX, scaleY);
            var scaleMax = Math.max(scaleX, scaleY);
            var finalDesiredWidth = desiredWidth;
            var finalDesiredHeight = desiredHeight;

            if (meetOrSlice === 'meet') {
              finalDesiredWidth *= scaleMin;
              finalDesiredHeight *= scaleMin;
            }

            if (meetOrSlice === 'slice') {
              finalDesiredWidth *= scaleMax;
              finalDesiredHeight *= scaleMax;
            }

            var refXProp = new Property(document, 'refX', refX);
            var refYProp = new Property(document, 'refY', refY);
            var hasRefs = refXProp.hasValue() && refYProp.hasValue();

            if (hasRefs) {
              ctx.translate(-scaleMin * refXProp.getPixels('x'), -scaleMin * refYProp.getPixels('y'));
            }

            if (clip) {
              var scaledClipX = scaleMin * clipX;
              var scaledClipY = scaleMin * clipY;
              ctx.beginPath();
              ctx.moveTo(scaledClipX, scaledClipY);
              ctx.lineTo(width, scaledClipY);
              ctx.lineTo(width, height);
              ctx.lineTo(scaledClipX, height);
              ctx.closePath();
              ctx.clip();
            }

            if (!hasRefs) {
              var isMeetMinY = meetOrSlice === 'meet' && scaleMin === scaleY;
              var isSliceMaxY = meetOrSlice === 'slice' && scaleMax === scaleY;
              var isMeetMinX = meetOrSlice === 'meet' && scaleMin === scaleX;
              var isSliceMaxX = meetOrSlice === 'slice' && scaleMax === scaleX;

              if (align.startsWith('xMid') && (isMeetMinY || isSliceMaxY)) {
                ctx.translate(width / 2.0 - finalDesiredWidth / 2.0, 0);
              }

              if (align.endsWith('YMid') && (isMeetMinX || isSliceMaxX)) {
                ctx.translate(0, height / 2.0 - finalDesiredHeight / 2.0);
              }

              if (align.startsWith('xMax') && (isMeetMinY || isSliceMaxY)) {
                ctx.translate(width - finalDesiredWidth, 0);
              }

              if (align.endsWith('YMax') && (isMeetMinX || isSliceMaxX)) {
                ctx.translate(0, height - finalDesiredHeight);
              }
            } // scale

            switch (true) {
              case align === 'none':
                ctx.scale(scaleX, scaleY);
                break;

              case meetOrSlice === 'meet':
                ctx.scale(scaleMin, scaleMin);
                break;

              case meetOrSlice === 'slice':
                ctx.scale(scaleMax, scaleMax);
                break;
            } // translate

            ctx.translate(-minX, -minY);
          },
        },
        {
          key: 'start',
          value: function start(element) {
            var _this = this;

            var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
              _ref3$enableRedraw = _ref3.enableRedraw,
              enableRedraw = _ref3$enableRedraw === void 0 ? false : _ref3$enableRedraw,
              _ref3$ignoreMouse = _ref3.ignoreMouse,
              ignoreMouse = _ref3$ignoreMouse === void 0 ? false : _ref3$ignoreMouse,
              _ref3$ignoreAnimation = _ref3.ignoreAnimation,
              ignoreAnimation = _ref3$ignoreAnimation === void 0 ? false : _ref3$ignoreAnimation,
              _ref3$ignoreDimension = _ref3.ignoreDimensions,
              ignoreDimensions = _ref3$ignoreDimension === void 0 ? false : _ref3$ignoreDimension,
              _ref3$ignoreClear = _ref3.ignoreClear,
              ignoreClear = _ref3$ignoreClear === void 0 ? false : _ref3$ignoreClear,
              forceRedraw = _ref3.forceRedraw,
              scaleWidth = _ref3.scaleWidth,
              scaleHeight = _ref3.scaleHeight,
              offsetX = _ref3.offsetX,
              offsetY = _ref3.offsetY;

            var FRAMERATE = this.FRAMERATE,
              mouse = this.mouse;
            var frameDuration = 1000 / FRAMERATE;
            this.frameDuration = frameDuration;
            this.readyPromise = new Promise(function (resolve) {
              _this.resolveReady = resolve;
            });

            if (this.isReady()) {
              this.render(element, ignoreDimensions, ignoreClear, scaleWidth, scaleHeight, offsetX, offsetY);
            }

            if (!enableRedraw) {
              return;
            }

            var now = Date.now();
            var then = now;
            var delta = 0;

            var tick = function tick() {
              now = Date.now();
              delta = now - then;

              if (delta >= frameDuration) {
                then = now - (delta % frameDuration);

                if (_this.shouldUpdate(ignoreAnimation, forceRedraw)) {
                  _this.render(element, ignoreDimensions, ignoreClear, scaleWidth, scaleHeight, offsetX, offsetY);

                  mouse.runEvents();
                }
              }

              _this.intervalId = requestAnimationFrame__default['default'](tick);
            };

            if (!ignoreMouse) {
              mouse.start();
            }

            this.intervalId = requestAnimationFrame__default['default'](tick);
          },
        },
        {
          key: 'stop',
          value: function stop() {
            if (this.intervalId) {
              requestAnimationFrame__default['default'].cancel(this.intervalId);
              this.intervalId = null;
            }

            this.mouse.stop();
          },
        },
        {
          key: 'shouldUpdate',
          value: function shouldUpdate(ignoreAnimation, forceRedraw) {
            // need update from animations?
            if (!ignoreAnimation) {
              var frameDuration = this.frameDuration;
              var shouldUpdate = this.animations.reduce(function (shouldUpdate, animation) {
                return animation.update(frameDuration) || shouldUpdate;
              }, false);

              if (shouldUpdate) {
                return true;
              }
            } // need update from redraw?

            if (typeof forceRedraw === 'function' && forceRedraw()) {
              return true;
            }

            if (!this.isReadyLock && this.isReady()) {
              return true;
            } // need update from mouse events?

            if (this.mouse.hasEvents()) {
              return true;
            }

            return false;
          },
        },
        {
          key: 'render',
          value: function render(element, ignoreDimensions, ignoreClear, scaleWidth, scaleHeight, offsetX, offsetY) {
            var CLIENT_WIDTH = this.CLIENT_WIDTH,
              CLIENT_HEIGHT = this.CLIENT_HEIGHT,
              viewPort = this.viewPort,
              ctx = this.ctx,
              isFirstRender = this.isFirstRender;
            var canvas = ctx.canvas;
            viewPort.clear();

            if (canvas.width && canvas.height) {
              viewPort.setCurrent(canvas.width, canvas.height);
            } else {
              viewPort.setCurrent(CLIENT_WIDTH, CLIENT_HEIGHT);
            }

            var widthStyle = element.getStyle('width');
            var heightStyle = element.getStyle('height');

            if (!ignoreDimensions && (isFirstRender || (typeof scaleWidth !== 'number' && typeof scaleHeight !== 'number'))) {
              // set canvas size
              if (widthStyle.hasValue()) {
                canvas.width = widthStyle.getPixels('x');

                if (canvas.style) {
                  canvas.style.width = ''.concat(canvas.width, 'px');
                }
              }

              if (heightStyle.hasValue()) {
                canvas.height = heightStyle.getPixels('y');

                if (canvas.style) {
                  canvas.style.height = ''.concat(canvas.height, 'px');
                }
              }
            }

            var cWidth = canvas.clientWidth || canvas.width;
            var cHeight = canvas.clientHeight || canvas.height;

            if (ignoreDimensions && widthStyle.hasValue() && heightStyle.hasValue()) {
              cWidth = widthStyle.getPixels('x');
              cHeight = heightStyle.getPixels('y');
            }

            viewPort.setCurrent(cWidth, cHeight);

            if (typeof offsetX === 'number') {
              element.getAttribute('x', true).setValue(offsetX);
            }

            if (typeof offsetY === 'number') {
              element.getAttribute('y', true).setValue(offsetY);
            }

            if (typeof scaleWidth === 'number' || typeof scaleHeight === 'number') {
              var viewBox = toNumbers(element.getAttribute('viewBox').getString());
              var xRatio = 0;
              var yRatio = 0;

              if (typeof scaleWidth === 'number') {
                var _widthStyle = element.getStyle('width');

                if (_widthStyle.hasValue()) {
                  xRatio = _widthStyle.getPixels('x') / scaleWidth;
                } else if (!isNaN(viewBox[2])) {
                  xRatio = viewBox[2] / scaleWidth;
                }
              }

              if (typeof scaleHeight === 'number') {
                var _heightStyle = element.getStyle('height');

                if (_heightStyle.hasValue()) {
                  yRatio = _heightStyle.getPixels('y') / scaleHeight;
                } else if (!isNaN(viewBox[3])) {
                  yRatio = viewBox[3] / scaleHeight;
                }
              }

              if (!xRatio) {
                xRatio = yRatio;
              }

              if (!yRatio) {
                yRatio = xRatio;
              }

              element.getAttribute('width', true).setValue(scaleWidth);
              element.getAttribute('height', true).setValue(scaleHeight);
              var transformStyle = element.getStyle('transform', true, true);
              transformStyle.setValue(
                ''
                  .concat(transformStyle.getString(), ' scale(')
                  .concat(1.0 / xRatio, ', ')
                  .concat(1.0 / yRatio, ')'),
              );
            } // clear and render

            if (!ignoreClear) {
              ctx.clearRect(0, 0, cWidth, cHeight);
            }

            element.render(ctx);

            if (isFirstRender) {
              this.isFirstRender = false;
            }
          },
        },
      ]);

      return Screen;
    })();
    Screen.defaultWindow = defaultWindow;
    Screen.defaultFetch = defaultFetch$1;

    var defaultFetch = Screen.defaultFetch;
    var DefaultDOMParser = typeof DOMParser !== 'undefined' ? DOMParser : null;

    var Parser = /*#__PURE__*/ (function () {
      function Parser() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$fetch = _ref.fetch,
          fetch = _ref$fetch === void 0 ? defaultFetch : _ref$fetch,
          _ref$DOMParser = _ref.DOMParser,
          DOMParser = _ref$DOMParser === void 0 ? DefaultDOMParser : _ref$DOMParser;

        _classCallCheck__default['default'](this, Parser);

        this.fetch = fetch;
        this.DOMParser = DOMParser;
      }

      _createClass__default['default'](Parser, [
        {
          key: 'parse',
          value: (function () {
            var _parse = _asyncToGenerator__default['default'](
              /*#__PURE__*/ _regeneratorRuntime__default['default'].mark(function _callee(resource) {
                return _regeneratorRuntime__default['default'].wrap(
                  function _callee$(_context) {
                    while (1) {
                      switch ((_context.prev = _context.next)) {
                        case 0:
                          if (!resource.startsWith('<')) {
                            _context.next = 2;
                            break;
                          }

                          return _context.abrupt('return', this.parseFromString(resource));

                        case 2:
                          return _context.abrupt('return', this.load(resource));

                        case 3:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  },
                  _callee,
                  this,
                );
              }),
            );

            function parse(_x) {
              return _parse.apply(this, arguments);
            }

            return parse;
          })(),
        },
        {
          key: 'parseFromString',
          value: function parseFromString(xml) {
            var parser = new this.DOMParser();

            try {
              return this.checkDocument(parser.parseFromString(xml, 'image/svg+xml'));
            } catch (err) {
              return this.checkDocument(parser.parseFromString(xml, 'text/xml'));
            }
          },
        },
        {
          key: 'checkDocument',
          value: function checkDocument(document) {
            var parserError = document.getElementsByTagName('parsererror')[0];

            if (parserError) {
              throw new Error(parserError.textContent);
            }

            return document;
          },
        },
        {
          key: 'load',
          value: (function () {
            var _load = _asyncToGenerator__default['default'](
              /*#__PURE__*/ _regeneratorRuntime__default['default'].mark(function _callee2(url) {
                var response, xml;
                return _regeneratorRuntime__default['default'].wrap(
                  function _callee2$(_context2) {
                    while (1) {
                      switch ((_context2.prev = _context2.next)) {
                        case 0:
                          _context2.next = 2;
                          return this.fetch(url);

                        case 2:
                          response = _context2.sent;
                          _context2.next = 5;
                          return response.text();

                        case 5:
                          xml = _context2.sent;
                          return _context2.abrupt('return', this.parseFromString(xml));

                        case 7:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  },
                  _callee2,
                  this,
                );
              }),
            );

            function load(_x2) {
              return _load.apply(this, arguments);
            }

            return load;
          })(),
        },
      ]);

      return Parser;
    })();

    var Translate = /*#__PURE__*/ (function () {
      function Translate(_, point) {
        _classCallCheck__default['default'](this, Translate);

        this.type = 'translate';
        this.point = null;
        this.point = Point.parse(point);
      }

      _createClass__default['default'](Translate, [
        {
          key: 'apply',
          value: function apply(ctx) {
            var _this$point = this.point,
              x = _this$point.x,
              y = _this$point.y;
            ctx.translate(x || 0.0, y || 0.0);
          },
        },
        {
          key: 'unapply',
          value: function unapply(ctx) {
            var _this$point2 = this.point,
              x = _this$point2.x,
              y = _this$point2.y;
            ctx.translate(-1 * x || 0.0, -1 * y || 0.0);
          },
        },
        {
          key: 'applyToPoint',
          value: function applyToPoint(point) {
            var _this$point3 = this.point,
              x = _this$point3.x,
              y = _this$point3.y;
            point.applyTransform([1, 0, 0, 1, x || 0.0, y || 0.0]);
          },
        },
      ]);

      return Translate;
    })();

    var Rotate = /*#__PURE__*/ (function () {
      function Rotate(document, rotate, transformOrigin) {
        _classCallCheck__default['default'](this, Rotate);

        this.type = 'rotate';
        this.angle = null;
        this.originX = null;
        this.originY = null;
        this.cx = 0;
        this.cy = 0;
        var numbers = toNumbers(rotate);
        this.angle = new Property(document, 'angle', numbers[0]);
        this.originX = transformOrigin[0];
        this.originY = transformOrigin[1];
        this.cx = numbers[1] || 0;
        this.cy = numbers[2] || 0;
      }

      _createClass__default['default'](Rotate, [
        {
          key: 'apply',
          value: function apply(ctx) {
            var cx = this.cx,
              cy = this.cy,
              originX = this.originX,
              originY = this.originY,
              angle = this.angle;
            var tx = cx + originX.getPixels('x');
            var ty = cy + originY.getPixels('y');
            ctx.translate(tx, ty);
            ctx.rotate(angle.getRadians());
            ctx.translate(-tx, -ty);
          },
        },
        {
          key: 'unapply',
          value: function unapply(ctx) {
            var cx = this.cx,
              cy = this.cy,
              originX = this.originX,
              originY = this.originY,
              angle = this.angle;
            var tx = cx + originX.getPixels('x');
            var ty = cy + originY.getPixels('y');
            ctx.translate(tx, ty);
            ctx.rotate(-1 * angle.getRadians());
            ctx.translate(-tx, -ty);
          },
        },
        {
          key: 'applyToPoint',
          value: function applyToPoint(point) {
            var cx = this.cx,
              cy = this.cy,
              angle = this.angle;
            var rad = angle.getRadians();
            point.applyTransform([
              1,
              0,
              0,
              1,
              cx || 0.0,
              cy || 0.0, // this.p.y
            ]);
            point.applyTransform([Math.cos(rad), Math.sin(rad), -Math.sin(rad), Math.cos(rad), 0, 0]);
            point.applyTransform([
              1,
              0,
              0,
              1,
              -cx || 0.0,
              -cy || 0.0, // -this.p.y
            ]);
          },
        },
      ]);

      return Rotate;
    })();

    var Scale = /*#__PURE__*/ (function () {
      function Scale(_, scale, transformOrigin) {
        _classCallCheck__default['default'](this, Scale);

        this.type = 'scale';
        this.scale = null;
        this.originX = null;
        this.originY = null;
        var scaleSize = Point.parseScale(scale); // Workaround for node-canvas

        if (scaleSize.x === 0 || scaleSize.y === 0) {
          scaleSize.x = PSEUDO_ZERO;
          scaleSize.y = PSEUDO_ZERO;
        }

        this.scale = scaleSize;
        this.originX = transformOrigin[0];
        this.originY = transformOrigin[1];
      }

      _createClass__default['default'](Scale, [
        {
          key: 'apply',
          value: function apply(ctx) {
            var _this$scale = this.scale,
              x = _this$scale.x,
              y = _this$scale.y,
              originX = this.originX,
              originY = this.originY;
            var tx = originX.getPixels('x');
            var ty = originY.getPixels('y');
            ctx.translate(tx, ty);
            ctx.scale(x, y || x);
            ctx.translate(-tx, -ty);
          },
        },
        {
          key: 'unapply',
          value: function unapply(ctx) {
            var _this$scale2 = this.scale,
              x = _this$scale2.x,
              y = _this$scale2.y,
              originX = this.originX,
              originY = this.originY;
            var tx = originX.getPixels('x');
            var ty = originY.getPixels('y');
            ctx.translate(tx, ty);
            ctx.scale(1.0 / x, 1.0 / y || x);
            ctx.translate(-tx, -ty);
          },
        },
        {
          key: 'applyToPoint',
          value: function applyToPoint(point) {
            var _this$scale3 = this.scale,
              x = _this$scale3.x,
              y = _this$scale3.y;
            point.applyTransform([x || 0.0, 0, 0, y || 0.0, 0, 0]);
          },
        },
      ]);

      return Scale;
    })();

    var Matrix = /*#__PURE__*/ (function () {
      function Matrix(_, matrix, transformOrigin) {
        _classCallCheck__default['default'](this, Matrix);

        this.type = 'matrix';
        this.matrix = [];
        this.originX = null;
        this.originY = null;
        this.matrix = toNumbers(matrix);
        this.originX = transformOrigin[0];
        this.originY = transformOrigin[1];
      }

      _createClass__default['default'](Matrix, [
        {
          key: 'apply',
          value: function apply(ctx) {
            var originX = this.originX,
              originY = this.originY,
              matrix = this.matrix;
            var tx = originX.getPixels('x');
            var ty = originY.getPixels('y');
            ctx.translate(tx, ty);
            ctx.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
            ctx.translate(-tx, -ty);
          },
        },
        {
          key: 'unapply',
          value: function unapply(ctx) {
            var originX = this.originX,
              originY = this.originY,
              matrix = this.matrix;
            var a = matrix[0];
            var b = matrix[2];
            var c = matrix[4];
            var d = matrix[1];
            var e = matrix[3];
            var f = matrix[5];
            var g = 0.0;
            var h = 0.0;
            var i = 1.0;
            var det = 1 / (a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g));
            var tx = originX.getPixels('x');
            var ty = originY.getPixels('y');
            ctx.translate(tx, ty);
            ctx.transform(det * (e * i - f * h), det * (f * g - d * i), det * (c * h - b * i), det * (a * i - c * g), det * (b * f - c * e), det * (c * d - a * f));
            ctx.translate(-tx, -ty);
          },
        },
        {
          key: 'applyToPoint',
          value: function applyToPoint(point) {
            point.applyTransform(this.matrix);
          },
        },
      ]);

      return Matrix;
    })();

    function _createSuper$M(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$M();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$M() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var Skew = /*#__PURE__*/ (function (_Matrix) {
      _inherits__default['default'](Skew, _Matrix);

      var _super = _createSuper$M(Skew);

      function Skew(document, skew, transformOrigin) {
        var _this;

        _classCallCheck__default['default'](this, Skew);

        _this = _super.call(this, document, skew, transformOrigin);
        _this.type = 'skew';
        _this.angle = null;
        _this.angle = new Property(document, 'angle', skew);
        return _this;
      }

      return Skew;
    })(Matrix);

    function _createSuper$L(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$L();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$L() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var SkewX = /*#__PURE__*/ (function (_Skew) {
      _inherits__default['default'](SkewX, _Skew);

      var _super = _createSuper$L(SkewX);

      function SkewX(document, skew, transformOrigin) {
        var _this;

        _classCallCheck__default['default'](this, SkewX);

        _this = _super.call(this, document, skew, transformOrigin);
        _this.type = 'skewX';
        _this.matrix = [1, 0, Math.tan(_this.angle.getRadians()), 1, 0, 0];
        return _this;
      }

      return SkewX;
    })(Skew);

    function _createSuper$K(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$K();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$K() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var SkewY = /*#__PURE__*/ (function (_Skew) {
      _inherits__default['default'](SkewY, _Skew);

      var _super = _createSuper$K(SkewY);

      function SkewY(document, skew, transformOrigin) {
        var _this;

        _classCallCheck__default['default'](this, SkewY);

        _this = _super.call(this, document, skew, transformOrigin);
        _this.type = 'skewY';
        _this.matrix = [1, Math.tan(_this.angle.getRadians()), 0, 1, 0, 0];
        return _this;
      }

      return SkewY;
    })(Skew);

    function parseTransforms(transform) {
      return compressSpaces(transform)
        .trim()
        .replace(/\)([a-zA-Z])/g, ') $1')
        .replace(/\)(\s?,\s?)/g, ') ')
        .split(/\s(?=[a-z])/);
    }

    function parseTransform(transform) {
      var _transform$split = transform.split('('),
        _transform$split2 = _slicedToArray__default['default'](_transform$split, 2),
        type = _transform$split2[0],
        value = _transform$split2[1];

      return [type.trim(), value.trim().replace(')', '')];
    }

    var Transform = /*#__PURE__*/ (function () {
      function Transform(document, transform, transformOrigin) {
        var _this = this;

        _classCallCheck__default['default'](this, Transform);

        this.document = document;
        this.transforms = [];
        var data = parseTransforms(transform);
        data.forEach(function (transform) {
          if (transform === 'none') {
            return;
          }

          var _parseTransform = parseTransform(transform),
            _parseTransform2 = _slicedToArray__default['default'](_parseTransform, 2),
            type = _parseTransform2[0],
            value = _parseTransform2[1];

          var TransformType = Transform.transformTypes[type];

          if (typeof TransformType !== 'undefined') {
            _this.transforms.push(new TransformType(_this.document, value, transformOrigin));
          }
        });
      }

      _createClass__default['default'](
        Transform,
        [
          {
            key: 'apply',
            value: function apply(ctx) {
              var transforms = this.transforms;
              var len = transforms.length;

              for (var i = 0; i < len; i++) {
                transforms[i].apply(ctx);
              }
            },
          },
          {
            key: 'unapply',
            value: function unapply(ctx) {
              var transforms = this.transforms;
              var len = transforms.length;

              for (var i = len - 1; i >= 0; i--) {
                transforms[i].unapply(ctx);
              }
            }, // TODO: applyToPoint unused ... remove?
          },
          {
            key: 'applyToPoint',
            value: function applyToPoint(point) {
              var transforms = this.transforms;
              var len = transforms.length;

              for (var i = 0; i < len; i++) {
                transforms[i].applyToPoint(point);
              }
            },
          },
        ],
        [
          {
            key: 'fromElement',
            value: function fromElement(document, element) {
              var transformStyle = element.getStyle('transform', false, true);

              var _element$getStyle$spl = element.getStyle('transform-origin', false, true).split(),
                _element$getStyle$spl2 = _slicedToArray__default['default'](_element$getStyle$spl, 2),
                transformOriginXProperty = _element$getStyle$spl2[0],
                _element$getStyle$spl3 = _element$getStyle$spl2[1],
                transformOriginYProperty = _element$getStyle$spl3 === void 0 ? transformOriginXProperty : _element$getStyle$spl3;

              var transformOrigin = [transformOriginXProperty, transformOriginYProperty];

              if (transformStyle.hasValue()) {
                return new Transform(document, transformStyle.getString(), transformOrigin);
              }

              return null;
            },
          },
        ],
      );

      return Transform;
    })();
    Transform.transformTypes = {
      translate: Translate,
      rotate: Rotate,
      scale: Scale,
      matrix: Matrix,
      skewX: SkewX,
      skewY: SkewY,
    };

    var Element = /*#__PURE__*/ (function () {
      function Element(document, node) {
        var _this = this;

        var captureTextNodes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        _classCallCheck__default['default'](this, Element);

        this.document = document;
        this.node = node;
        this.captureTextNodes = captureTextNodes;
        this.attributes = Object.create(null);
        this.styles = Object.create(null);
        this.stylesSpecificity = Object.create(null);
        this.animationFrozen = false;
        this.animationFrozenValue = '';
        this.parent = null;
        this.children = [];

        if (!node || node.nodeType !== 1) {
          // ELEMENT_NODE
          return;
        } // add attributes

        Array.from(node.attributes).forEach(function (attribute) {
          var nodeName = normalizeAttributeName(attribute.nodeName);
          _this.attributes[nodeName] = new Property(document, nodeName, attribute.value);
        });
        this.addStylesFromStyleDefinition(); // add inline styles

        if (this.getAttribute('style').hasValue()) {
          var styles = this.getAttribute('style')
            .getString()
            .split(';')
            .map(function (_) {
              return _.trim();
            });
          styles.forEach(function (style) {
            if (!style) {
              return;
            }

            var _style$split$map = style.split(':').map(function (_) {
                return _.trim();
              }),
              _style$split$map2 = _slicedToArray__default['default'](_style$split$map, 2),
              name = _style$split$map2[0],
              value = _style$split$map2[1];

            _this.styles[name] = new Property(document, name, value);
          });
        }

        var definitions = document.definitions;
        var id = this.getAttribute('id'); // add id

        if (id.hasValue()) {
          if (!definitions[id.getString()]) {
            definitions[id.getString()] = this;
          }
        }

        Array.from(node.childNodes).forEach(function (childNode) {
          if (childNode.nodeType === 1) {
            _this.addChild(childNode); // ELEMENT_NODE
          } else if (captureTextNodes && (childNode.nodeType === 3 || childNode.nodeType === 4)) {
            var textNode = document.createTextNode(childNode);

            if (textNode.getText().length > 0) {
              _this.addChild(textNode); // TEXT_NODE
            }
          }
        });
      }

      _createClass__default['default'](Element, [
        {
          key: 'getAttribute',
          value: function getAttribute(name) {
            var createIfNotExists = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var attr = this.attributes[name];

            if (!attr && createIfNotExists) {
              var _attr = new Property(this.document, name, '');

              this.attributes[name] = _attr;
              return _attr;
            }

            return attr || Property.empty(this.document);
          },
        },
        {
          key: 'getHrefAttribute',
          value: function getHrefAttribute() {
            for (var key in this.attributes) {
              if (key === 'href' || key.endsWith(':href')) {
                return this.attributes[key];
              }
            }

            return Property.empty(this.document);
          },
        },
        {
          key: 'getStyle',
          value: function getStyle(name) {
            var createIfNotExists = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var skipAncestors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var style = this.styles[name];

            if (style) {
              return style;
            }

            var attr = this.getAttribute(name);

            if (attr !== null && attr !== void 0 && attr.hasValue()) {
              this.styles[name] = attr; // move up to me to cache

              return attr;
            }

            if (!skipAncestors) {
              var parent = this.parent;

              if (parent) {
                var parentStyle = parent.getStyle(name);

                if (parentStyle !== null && parentStyle !== void 0 && parentStyle.hasValue()) {
                  return parentStyle;
                }
              }
            }

            if (createIfNotExists) {
              var _style = new Property(this.document, name, '');

              this.styles[name] = _style;
              return _style;
            }

            return style || Property.empty(this.document);
          },
        },
        {
          key: 'render',
          value: function render(ctx) {
            // don't render display=none
            // don't render visibility=hidden
            if (this.getStyle('display').getString() === 'none' || this.getStyle('visibility').getString() === 'hidden') {
              return;
            }

            ctx.save();

            if (this.getStyle('mask').hasValue()) {
              // mask
              var mask = this.getStyle('mask').getDefinition();

              if (mask) {
                this.applyEffects(ctx);
                mask.apply(ctx, this);
              }
            } else if (this.getStyle('filter').getValue('none') !== 'none') {
              // filter
              var filter = this.getStyle('filter').getDefinition();

              if (filter) {
                this.applyEffects(ctx);
                filter.apply(ctx, this);
              }
            } else {
              this.setContext(ctx);
              this.renderChildren(ctx);
              this.clearContext(ctx);
            }

            ctx.restore();
          },
        },
        {
          key: 'setContext',
          value: function setContext(_) {
            // NO RENDER
          },
        },
        {
          key: 'applyEffects',
          value: function applyEffects(ctx) {
            // transform
            var transform = Transform.fromElement(this.document, this);

            if (transform) {
              transform.apply(ctx);
            } // clip

            var clipPathStyleProp = this.getStyle('clip-path', false, true);

            if (clipPathStyleProp.hasValue()) {
              var clip = clipPathStyleProp.getDefinition();

              if (clip) {
                clip.apply(ctx);
              }
            }
          },
        },
        {
          key: 'clearContext',
          value: function clearContext(_) {
            // NO RENDER
          },
        },
        {
          key: 'renderChildren',
          value: function renderChildren(ctx) {
            this.children.forEach(function (child) {
              child.render(ctx);
            });
          },
        },
        {
          key: 'addChild',
          value: function addChild(childNode) {
            var child = childNode instanceof Element ? childNode : this.document.createElement(childNode);
            child.parent = this;

            if (!Element.ignoreChildTypes.includes(child.type)) {
              this.children.push(child);
            }
          },
        },
        {
          key: 'matchesSelector',
          value: function matchesSelector(selector) {
            var _node$getAttribute;

            var node = this.node;

            if (typeof node.matches === 'function') {
              return node.matches(selector);
            }

            var styleClasses = (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, 'class');

            if (!styleClasses || styleClasses === '') {
              return false;
            }

            return styleClasses.split(' ').some(function (styleClass) {
              return '.'.concat(styleClass) === selector;
            });
          },
        },
        {
          key: 'addStylesFromStyleDefinition',
          value: function addStylesFromStyleDefinition() {
            var _this$document = this.document,
              styles = _this$document.styles,
              stylesSpecificity = _this$document.stylesSpecificity;

            for (var selector in styles) {
              if (!selector.startsWith('@') && this.matchesSelector(selector)) {
                var style = styles[selector];
                var specificity = stylesSpecificity[selector];

                if (style) {
                  for (var name in style) {
                    var existingSpecificity = this.stylesSpecificity[name];

                    if (typeof existingSpecificity === 'undefined') {
                      existingSpecificity = '000';
                    }

                    if (specificity >= existingSpecificity) {
                      this.styles[name] = style[name];
                      this.stylesSpecificity[name] = specificity;
                    }
                  }
                }
              }
            }
          },
        },
        {
          key: 'removeStyles',
          value: function removeStyles(element, ignoreStyles) {
            var toRestore = ignoreStyles.reduce(function (toRestore, name) {
              var styleProp = element.getStyle(name);

              if (!styleProp.hasValue()) {
                return toRestore;
              }

              var value = styleProp.getString();
              styleProp.setValue('');
              return [].concat(_toConsumableArray__default['default'](toRestore), [[name, value]]);
            }, []);
            return toRestore;
          },
        },
        {
          key: 'restoreStyles',
          value: function restoreStyles(element, styles) {
            styles.forEach(function (_ref) {
              var _ref2 = _slicedToArray__default['default'](_ref, 2),
                name = _ref2[0],
                value = _ref2[1];

              element.getStyle(name, true).setValue(value);
            });
          },
        },
        {
          key: 'isFirstChild',
          value: function isFirstChild() {
            var _this$parent;

            return ((_this$parent = this.parent) === null || _this$parent === void 0 ? void 0 : _this$parent.children.indexOf(this)) === 0;
          },
        },
      ]);

      return Element;
    })();
    Element.ignoreChildTypes = ['title'];

    function _createSuper$J(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$J();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$J() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var UnknownElement = /*#__PURE__*/ (function (_Element) {
      _inherits__default['default'](UnknownElement, _Element);

      var _super = _createSuper$J(UnknownElement);

      function UnknownElement(document, node, captureTextNodes) {
        var _this;

        _classCallCheck__default['default'](this, UnknownElement);

        _this = _super.call(this, document, node, captureTextNodes);

        return _this;
      }

      return UnknownElement;
    })(Element);

    function wrapFontFamily(fontFamily) {
      var trimmed = fontFamily.trim();
      return /^('|")/.test(trimmed) ? trimmed : '"'.concat(trimmed, '"');
    }

    function prepareFontFamily(fontFamily) {
      return typeof process === 'undefined' ? fontFamily : fontFamily.trim().split(',').map(wrapFontFamily).join(',');
    }
    /**
     * https://developer.mozilla.org/en-US/docs/Web/CSS/font-style
     * @param fontStyle
     * @returns CSS font style.
     */

    function prepareFontStyle(fontStyle) {
      if (!fontStyle) {
        return '';
      }

      var targetFontStyle = fontStyle.trim().toLowerCase();

      switch (targetFontStyle) {
        case 'normal':
        case 'italic':
        case 'oblique':
        case 'inherit':
        case 'initial':
        case 'unset':
          return targetFontStyle;

        default:
          if (/^oblique\s+(-|)\d+deg$/.test(targetFontStyle)) {
            return targetFontStyle;
          }

          return '';
      }
    }
    /**
     * https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
     * @param fontWeight
     * @returns CSS font weight.
     */

    function prepareFontWeight(fontWeight) {
      if (!fontWeight) {
        return '';
      }

      var targetFontWeight = fontWeight.trim().toLowerCase();

      switch (targetFontWeight) {
        case 'normal':
        case 'bold':
        case 'lighter':
        case 'bolder':
        case 'inherit':
        case 'initial':
        case 'unset':
          return targetFontWeight;

        default:
          if (/^[\d.]+$/.test(targetFontWeight)) {
            return targetFontWeight;
          }

          return '';
      }
    }

    var Font = /*#__PURE__*/ (function () {
      function Font(fontStyle, fontVariant, fontWeight, fontSize, fontFamily, inherit) {
        _classCallCheck__default['default'](this, Font);

        var inheritFont = inherit ? (typeof inherit === 'string' ? Font.parse(inherit) : inherit) : {};
        this.fontFamily = fontFamily || inheritFont.fontFamily;
        this.fontSize = fontSize || inheritFont.fontSize;
        this.fontStyle = fontStyle || inheritFont.fontStyle;
        this.fontWeight = fontWeight || inheritFont.fontWeight;
        this.fontVariant = fontVariant || inheritFont.fontVariant;
      }

      _createClass__default['default'](
        Font,
        [
          {
            key: 'toString',
            value: function toString() {
              return [
                prepareFontStyle(this.fontStyle),
                this.fontVariant,
                prepareFontWeight(this.fontWeight),
                this.fontSize, // Wrap fontFamily only on nodejs and only for canvas.ctx
                prepareFontFamily(this.fontFamily),
              ]
                .join(' ')
                .trim();
            },
          },
        ],
        [
          {
            key: 'parse',
            value: function parse() {
              var font = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
              var inherit = arguments.length > 1 ? arguments[1] : undefined;
              var fontStyle = '';
              var fontVariant = '';
              var fontWeight = '';
              var fontSize = '';
              var fontFamily = '';
              var parts = compressSpaces(font).trim().split(' ');
              var set = {
                fontSize: false,
                fontStyle: false,
                fontWeight: false,
                fontVariant: false,
              };
              parts.forEach(function (part) {
                switch (true) {
                  case !set.fontStyle && Font.styles.includes(part):
                    if (part !== 'inherit') {
                      fontStyle = part;
                    }

                    set.fontStyle = true;
                    break;

                  case !set.fontVariant && Font.variants.includes(part):
                    if (part !== 'inherit') {
                      fontVariant = part;
                    }

                    set.fontStyle = true;
                    set.fontVariant = true;
                    break;

                  case !set.fontWeight && Font.weights.includes(part):
                    if (part !== 'inherit') {
                      fontWeight = part;
                    }

                    set.fontStyle = true;
                    set.fontVariant = true;
                    set.fontWeight = true;
                    break;

                  case !set.fontSize:
                    if (part !== 'inherit') {
                      var _part$split = part.split('/');

                      var _part$split2 = _slicedToArray__default['default'](_part$split, 1);

                      fontSize = _part$split2[0];
                    }

                    set.fontStyle = true;
                    set.fontVariant = true;
                    set.fontWeight = true;
                    set.fontSize = true;
                    break;

                  default:
                    if (part !== 'inherit') {
                      fontFamily += part;
                    }
                }
              });
              return new Font(fontStyle, fontVariant, fontWeight, fontSize, fontFamily, inherit);
            },
          },
        ],
      );

      return Font;
    })();
    Font.styles = 'normal|italic|oblique|inherit';
    Font.variants = 'normal|small-caps|inherit';
    Font.weights = 'normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit';

    var BoundingBox = /*#__PURE__*/ (function () {
      function BoundingBox() {
        var x1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Number.NaN;
        var y1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.NaN;
        var x2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Number.NaN;
        var y2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Number.NaN;

        _classCallCheck__default['default'](this, BoundingBox);

        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.addPoint(x1, y1);
        this.addPoint(x2, y2);
      }

      _createClass__default['default'](BoundingBox, [
        {
          key: 'addPoint',
          value: function addPoint(x, y) {
            if (typeof x !== 'undefined') {
              if (isNaN(this.x1) || isNaN(this.x2)) {
                this.x1 = x;
                this.x2 = x;
              }

              if (x < this.x1) {
                this.x1 = x;
              }

              if (x > this.x2) {
                this.x2 = x;
              }
            }

            if (typeof y !== 'undefined') {
              if (isNaN(this.y1) || isNaN(this.y2)) {
                this.y1 = y;
                this.y2 = y;
              }

              if (y < this.y1) {
                this.y1 = y;
              }

              if (y > this.y2) {
                this.y2 = y;
              }
            }
          },
        },
        {
          key: 'addX',
          value: function addX(x) {
            this.addPoint(x, null);
          },
        },
        {
          key: 'addY',
          value: function addY(y) {
            this.addPoint(null, y);
          },
        },
        {
          key: 'addBoundingBox',
          value: function addBoundingBox(boundingBox) {
            if (!boundingBox) {
              return;
            }

            var x1 = boundingBox.x1,
              y1 = boundingBox.y1,
              x2 = boundingBox.x2,
              y2 = boundingBox.y2;
            this.addPoint(x1, y1);
            this.addPoint(x2, y2);
          },
        },
        {
          key: 'sumCubic',
          value: function sumCubic(t, p0, p1, p2, p3) {
            return Math.pow(1 - t, 3) * p0 + 3 * Math.pow(1 - t, 2) * t * p1 + 3 * (1 - t) * Math.pow(t, 2) * p2 + Math.pow(t, 3) * p3;
          },
        },
        {
          key: 'bezierCurveAdd',
          value: function bezierCurveAdd(forX, p0, p1, p2, p3) {
            var b = 6 * p0 - 12 * p1 + 6 * p2;
            var a = -3 * p0 + 9 * p1 - 9 * p2 + 3 * p3;
            var c = 3 * p1 - 3 * p0;

            if (a === 0) {
              if (b === 0) {
                return;
              }

              var t = -c / b;

              if (0 < t && t < 1) {
                if (forX) {
                  this.addX(this.sumCubic(t, p0, p1, p2, p3));
                } else {
                  this.addY(this.sumCubic(t, p0, p1, p2, p3));
                }
              }

              return;
            }

            var b2ac = Math.pow(b, 2) - 4 * c * a;

            if (b2ac < 0) {
              return;
            }

            var t1 = (-b + Math.sqrt(b2ac)) / (2 * a);

            if (0 < t1 && t1 < 1) {
              if (forX) {
                this.addX(this.sumCubic(t1, p0, p1, p2, p3));
              } else {
                this.addY(this.sumCubic(t1, p0, p1, p2, p3));
              }
            }

            var t2 = (-b - Math.sqrt(b2ac)) / (2 * a);

            if (0 < t2 && t2 < 1) {
              if (forX) {
                this.addX(this.sumCubic(t2, p0, p1, p2, p3));
              } else {
                this.addY(this.sumCubic(t2, p0, p1, p2, p3));
              }
            }
          }, // from http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
        },
        {
          key: 'addBezierCurve',
          value: function addBezierCurve(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y) {
            this.addPoint(p0x, p0y);
            this.addPoint(p3x, p3y);
            this.bezierCurveAdd(true, p0x, p1x, p2x, p3x);
            this.bezierCurveAdd(false, p0y, p1y, p2y, p3y);
          },
        },
        {
          key: 'addQuadraticCurve',
          value: function addQuadraticCurve(p0x, p0y, p1x, p1y, p2x, p2y) {
            var cp1x = p0x + (2 / 3) * (p1x - p0x); // CP1 = QP0 + 2/3 *(QP1-QP0)

            var cp1y = p0y + (2 / 3) * (p1y - p0y); // CP1 = QP0 + 2/3 *(QP1-QP0)

            var cp2x = cp1x + (1 / 3) * (p2x - p0x); // CP2 = CP1 + 1/3 *(QP2-QP0)

            var cp2y = cp1y + (1 / 3) * (p2y - p0y); // CP2 = CP1 + 1/3 *(QP2-QP0)

            this.addBezierCurve(p0x, p0y, cp1x, cp2x, cp1y, cp2y, p2x, p2y);
          },
        },
        {
          key: 'isPointInBox',
          value: function isPointInBox(x, y) {
            var x1 = this.x1,
              y1 = this.y1,
              x2 = this.x2,
              y2 = this.y2;
            return x1 <= x && x <= x2 && y1 <= y && y <= y2;
          },
        },
        {
          key: 'x',
          get: function get() {
            return this.x1;
          },
        },
        {
          key: 'y',
          get: function get() {
            return this.y1;
          },
        },
        {
          key: 'width',
          get: function get() {
            return this.x2 - this.x1;
          },
        },
        {
          key: 'height',
          get: function get() {
            return this.y2 - this.y1;
          },
        },
      ]);

      return BoundingBox;
    })();

    function _createSuper$I(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$I();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$I() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var PathParser = /*#__PURE__*/ (function (_SVGPathData) {
      _inherits__default['default'](PathParser, _SVGPathData);

      var _super = _createSuper$I(PathParser);

      function PathParser(path) {
        var _this;

        _classCallCheck__default['default'](this, PathParser);

        _this = _super.call(
          this,
          path // Fix spaces after signs.
            .replace(/([+\-.])\s+/gm, '$1') // Remove invalid part.
            .replace(/[^MmZzLlHhVvCcSsQqTtAae\d\s.,+-].*/g, ''),
        );
        _this.control = null;
        _this.start = null;
        _this.current = null;
        _this.command = null;
        _this.commands = _this.commands;
        _this.i = -1;
        _this.previousCommand = null;
        _this.points = [];
        _this.angles = [];
        return _this;
      }

      _createClass__default['default'](PathParser, [
        {
          key: 'reset',
          value: function reset() {
            this.i = -1;
            this.command = null;
            this.previousCommand = null;
            this.start = new Point(0, 0);
            this.control = new Point(0, 0);
            this.current = new Point(0, 0);
            this.points = [];
            this.angles = [];
          },
        },
        {
          key: 'isEnd',
          value: function isEnd() {
            var i = this.i,
              commands = this.commands;
            return i >= commands.length - 1;
          },
        },
        {
          key: 'next',
          value: function next() {
            var command = this.commands[++this.i];
            this.previousCommand = this.command;
            this.command = command;
            return command;
          },
        },
        {
          key: 'getPoint',
          value: function getPoint() {
            var xProp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'x';
            var yProp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'y';
            var point = new Point(this.command[xProp], this.command[yProp]);
            return this.makeAbsolute(point);
          },
        },
        {
          key: 'getAsControlPoint',
          value: function getAsControlPoint(xProp, yProp) {
            var point = this.getPoint(xProp, yProp);
            this.control = point;
            return point;
          },
        },
        {
          key: 'getAsCurrentPoint',
          value: function getAsCurrentPoint(xProp, yProp) {
            var point = this.getPoint(xProp, yProp);
            this.current = point;
            return point;
          },
        },
        {
          key: 'getReflectedControlPoint',
          value: function getReflectedControlPoint() {
            var previousCommand = this.previousCommand.type;

            if (
              previousCommand !== svgPathdata.SVGPathData.CURVE_TO &&
              previousCommand !== svgPathdata.SVGPathData.SMOOTH_CURVE_TO &&
              previousCommand !== svgPathdata.SVGPathData.QUAD_TO &&
              previousCommand !== svgPathdata.SVGPathData.SMOOTH_QUAD_TO
            ) {
              return this.current;
            } // reflect point

            var _this$current = this.current,
              cx = _this$current.x,
              cy = _this$current.y,
              _this$control = this.control,
              ox = _this$control.x,
              oy = _this$control.y;
            var point = new Point(2 * cx - ox, 2 * cy - oy);
            return point;
          },
        },
        {
          key: 'makeAbsolute',
          value: function makeAbsolute(point) {
            if (this.command.relative) {
              var _this$current2 = this.current,
                x = _this$current2.x,
                y = _this$current2.y;
              point.x += x;
              point.y += y;
            }

            return point;
          },
        },
        {
          key: 'addMarker',
          value: function addMarker(point, from, priorTo) {
            var points = this.points,
              angles = this.angles; // if the last angle isn't filled in because we didn't have this point yet ...

            if (priorTo && angles.length > 0 && !angles[angles.length - 1]) {
              angles[angles.length - 1] = points[points.length - 1].angleTo(priorTo);
            }

            this.addMarkerAngle(point, from ? from.angleTo(point) : null);
          },
        },
        {
          key: 'addMarkerAngle',
          value: function addMarkerAngle(point, angle) {
            this.points.push(point);
            this.angles.push(angle);
          },
        },
        {
          key: 'getMarkerPoints',
          value: function getMarkerPoints() {
            return this.points;
          },
        },
        {
          key: 'getMarkerAngles',
          value: function getMarkerAngles() {
            var angles = this.angles;
            var len = angles.length;

            for (var i = 0; i < len; i++) {
              if (!angles[i]) {
                for (var j = i + 1; j < len; j++) {
                  if (angles[j]) {
                    angles[i] = angles[j];
                    break;
                  }
                }
              }
            }

            return angles;
          },
        },
      ]);

      return PathParser;
    })(svgPathdata.SVGPathData);

    function _createSuper$H(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$H();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$H() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var RenderedElement = /*#__PURE__*/ (function (_Element) {
      _inherits__default['default'](RenderedElement, _Element);

      var _super = _createSuper$H(RenderedElement);

      function RenderedElement() {
        var _this;

        _classCallCheck__default['default'](this, RenderedElement);

        _this = _super.apply(this, arguments);
        _this.modifiedEmSizeStack = false;
        return _this;
      }

      _createClass__default['default'](RenderedElement, [
        {
          key: 'calculateOpacity',
          value: function calculateOpacity() {
            var opacity = 1.0; // eslint-disable-next-line @typescript-eslint/no-this-alias, consistent-this

            var element = this;

            while (element) {
              var opacityStyle = element.getStyle('opacity', false, true); // no ancestors on style call

              if (opacityStyle.hasValue(true)) {
                opacity *= opacityStyle.getNumber();
              }

              element = element.parent;
            }

            return opacity;
          },
        },
        {
          key: 'setContext',
          value: function setContext(ctx) {
            var fromMeasure = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (!fromMeasure) {
              // causes stack overflow when measuring text with gradients
              // fill
              var fillStyleProp = this.getStyle('fill');
              var fillOpacityStyleProp = this.getStyle('fill-opacity');
              var strokeStyleProp = this.getStyle('stroke');
              var strokeOpacityProp = this.getStyle('stroke-opacity');

              if (fillStyleProp.isUrlDefinition()) {
                var fillStyle = fillStyleProp.getFillStyleDefinition(this, fillOpacityStyleProp);

                if (fillStyle) {
                  ctx.fillStyle = fillStyle;
                }
              } else if (fillStyleProp.hasValue()) {
                if (fillStyleProp.getString() === 'currentColor') {
                  fillStyleProp.setValue(this.getStyle('color').getColor());
                }

                var _fillStyle = fillStyleProp.getColor();

                if (_fillStyle !== 'inherit') {
                  ctx.fillStyle = _fillStyle === 'none' ? 'rgba(0,0,0,0)' : _fillStyle;
                }
              }

              if (fillOpacityStyleProp.hasValue()) {
                var _fillStyle2 = new Property(this.document, 'fill', ctx.fillStyle).addOpacity(fillOpacityStyleProp).getColor();

                ctx.fillStyle = _fillStyle2;
              } // stroke

              if (strokeStyleProp.isUrlDefinition()) {
                var strokeStyle = strokeStyleProp.getFillStyleDefinition(this, strokeOpacityProp);

                if (strokeStyle) {
                  ctx.strokeStyle = strokeStyle;
                }
              } else if (strokeStyleProp.hasValue()) {
                if (strokeStyleProp.getString() === 'currentColor') {
                  strokeStyleProp.setValue(this.getStyle('color').getColor());
                }

                var _strokeStyle = strokeStyleProp.getString();

                if (_strokeStyle !== 'inherit') {
                  ctx.strokeStyle = _strokeStyle === 'none' ? 'rgba(0,0,0,0)' : _strokeStyle;
                }
              }

              if (strokeOpacityProp.hasValue()) {
                var _strokeStyle2 = new Property(this.document, 'stroke', ctx.strokeStyle).addOpacity(strokeOpacityProp).getString();

                ctx.strokeStyle = _strokeStyle2;
              }

              var strokeWidthStyleProp = this.getStyle('stroke-width');

              if (strokeWidthStyleProp.hasValue()) {
                var newLineWidth = strokeWidthStyleProp.getPixels();
                ctx.lineWidth = !newLineWidth
                  ? PSEUDO_ZERO // browsers don't respect 0 (or node-canvas? :-)
                  : newLineWidth;
              }

              var strokeLinecapStyleProp = this.getStyle('stroke-linecap');
              var strokeLinejoinStyleProp = this.getStyle('stroke-linejoin');
              var strokeMiterlimitProp = this.getStyle('stroke-miterlimit'); // NEED TEST
              // const pointOrderStyleProp = this.getStyle('paint-order');

              var strokeDasharrayStyleProp = this.getStyle('stroke-dasharray');
              var strokeDashoffsetProp = this.getStyle('stroke-dashoffset');

              if (strokeLinecapStyleProp.hasValue()) {
                ctx.lineCap = strokeLinecapStyleProp.getString();
              }

              if (strokeLinejoinStyleProp.hasValue()) {
                ctx.lineJoin = strokeLinejoinStyleProp.getString();
              }

              if (strokeMiterlimitProp.hasValue()) {
                ctx.miterLimit = strokeMiterlimitProp.getNumber();
              } // NEED TEST
              // if (pointOrderStyleProp.hasValue()) {
              // 	// ?
              // 	ctx.paintOrder = pointOrderStyleProp.getValue();
              // }

              if (strokeDasharrayStyleProp.hasValue() && strokeDasharrayStyleProp.getString() !== 'none') {
                var gaps = toNumbers(strokeDasharrayStyleProp.getString());

                if (typeof ctx.setLineDash !== 'undefined') {
                  ctx.setLineDash(gaps);
                } else if (typeof ctx.webkitLineDash !== 'undefined') {
                  // @ts-expect-error Handle browser prefix.
                  // @ts-expect-error Handle browser prefix.
                  ctx.webkitLineDash = gaps;
                } else if (typeof ctx.mozDash !== 'undefined' && !(gaps.length === 1 && gaps[0] === 0)) {
                  // @ts-expect-error Handle browser prefix.
                  // @ts-expect-error Handle browser prefix.
                  ctx.mozDash = gaps;
                }

                var offset = strokeDashoffsetProp.getPixels();

                if (typeof ctx.lineDashOffset !== 'undefined') {
                  ctx.lineDashOffset = offset;
                } else if (typeof ctx.webkitLineDashOffset !== 'undefined') {
                  // @ts-expect-error Handle browser prefix.
                  // @ts-expect-error Handle browser prefix.
                  ctx.webkitLineDashOffset = offset;
                } else if (typeof ctx.mozDashOffset !== 'undefined') {
                  // @ts-expect-error Handle browser prefix.
                  // @ts-expect-error Handle browser prefix.
                  ctx.mozDashOffset = offset;
                }
              }
            } // font

            this.modifiedEmSizeStack = false;

            if (typeof ctx.font !== 'undefined') {
              var fontStyleProp = this.getStyle('font');
              var fontStyleStyleProp = this.getStyle('font-style');
              var fontVariantStyleProp = this.getStyle('font-variant');
              var fontWeightStyleProp = this.getStyle('font-weight');
              var fontSizeStyleProp = this.getStyle('font-size');
              var fontFamilyStyleProp = this.getStyle('font-family');
              var font = new Font(
                fontStyleStyleProp.getString(),
                fontVariantStyleProp.getString(),
                fontWeightStyleProp.getString(),
                fontSizeStyleProp.hasValue() ? ''.concat(fontSizeStyleProp.getPixels(true), 'px') : '',
                fontFamilyStyleProp.getString(),
                Font.parse(fontStyleProp.getString(), ctx.font),
              );
              fontStyleStyleProp.setValue(font.fontStyle);
              fontVariantStyleProp.setValue(font.fontVariant);
              fontWeightStyleProp.setValue(font.fontWeight);
              fontSizeStyleProp.setValue(font.fontSize);
              fontFamilyStyleProp.setValue(font.fontFamily);
              ctx.font = font.toString();

              if (fontSizeStyleProp.isPixels()) {
                this.document.emSize = fontSizeStyleProp.getPixels();
                this.modifiedEmSizeStack = true;
              }
            }

            if (!fromMeasure) {
              // effects
              this.applyEffects(ctx); // opacity

              ctx.globalAlpha = this.calculateOpacity();
            }
          },
        },
        {
          key: 'clearContext',
          value: function clearContext(ctx) {
            _get__default['default'](_getPrototypeOf__default['default'](RenderedElement.prototype), 'clearContext', this).call(this, ctx);

            if (this.modifiedEmSizeStack) {
              this.document.popEmSize();
            }
          },
        },
      ]);

      return RenderedElement;
    })(Element);

    function _createSuper$G(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$G();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$G() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var PathElement = /*#__PURE__*/ (function (_RenderedElement) {
      _inherits__default['default'](PathElement, _RenderedElement);

      var _super = _createSuper$G(PathElement);

      function PathElement(document, node, captureTextNodes) {
        var _this;

        _classCallCheck__default['default'](this, PathElement);

        _this = _super.call(this, document, node, captureTextNodes);
        _this.type = 'path';
        _this.pathParser = null;
        _this.pathParser = new PathParser(_this.getAttribute('d').getString());
        return _this;
      }

      _createClass__default['default'](
        PathElement,
        [
          {
            key: 'path',
            value: function path(ctx) {
              var pathParser = this.pathParser;
              var boundingBox = new BoundingBox();
              pathParser.reset();

              if (ctx) {
                ctx.beginPath();
              }

              while (!pathParser.isEnd()) {
                switch (pathParser.next().type) {
                  case PathParser.MOVE_TO:
                    this.pathM(ctx, boundingBox);
                    break;

                  case PathParser.LINE_TO:
                    this.pathL(ctx, boundingBox);
                    break;

                  case PathParser.HORIZ_LINE_TO:
                    this.pathH(ctx, boundingBox);
                    break;

                  case PathParser.VERT_LINE_TO:
                    this.pathV(ctx, boundingBox);
                    break;

                  case PathParser.CURVE_TO:
                    this.pathC(ctx, boundingBox);
                    break;

                  case PathParser.SMOOTH_CURVE_TO:
                    this.pathS(ctx, boundingBox);
                    break;

                  case PathParser.QUAD_TO:
                    this.pathQ(ctx, boundingBox);
                    break;

                  case PathParser.SMOOTH_QUAD_TO:
                    this.pathT(ctx, boundingBox);
                    break;

                  case PathParser.ARC:
                    this.pathA(ctx, boundingBox);
                    break;

                  case PathParser.CLOSE_PATH:
                    this.pathZ(ctx, boundingBox);
                    break;
                }
              }

              return boundingBox;
            },
          },
          {
            key: 'getBoundingBox',
            value: function getBoundingBox(_) {
              return this.path();
            },
          },
          {
            key: 'getMarkers',
            value: function getMarkers() {
              var pathParser = this.pathParser;
              var points = pathParser.getMarkerPoints();
              var angles = pathParser.getMarkerAngles();
              var markers = points.map(function (point, i) {
                return [point, angles[i]];
              });
              return markers;
            },
          },
          {
            key: 'renderChildren',
            value: function renderChildren(ctx) {
              this.path(ctx);
              this.document.screen.mouse.checkPath(this, ctx);
              var fillRuleStyleProp = this.getStyle('fill-rule');

              if (ctx.fillStyle !== '') {
                if (fillRuleStyleProp.getString('inherit') !== 'inherit') {
                  ctx.fill(fillRuleStyleProp.getString());
                } else {
                  ctx.fill();
                }
              }

              if (ctx.strokeStyle !== '') {
                if (this.getAttribute('vector-effect').getString() === 'non-scaling-stroke') {
                  ctx.save();
                  ctx.setTransform(1, 0, 0, 1, 0, 0);
                  ctx.stroke();
                  ctx.restore();
                } else {
                  ctx.stroke();
                }
              }

              var markers = this.getMarkers();

              if (markers) {
                var markersLastIndex = markers.length - 1;
                var markerStartStyleProp = this.getStyle('marker-start');
                var markerMidStyleProp = this.getStyle('marker-mid');
                var markerEndStyleProp = this.getStyle('marker-end');

                if (markerStartStyleProp.isUrlDefinition()) {
                  var marker = markerStartStyleProp.getDefinition();

                  var _markers$ = _slicedToArray__default['default'](markers[0], 2),
                    point = _markers$[0],
                    angle = _markers$[1];

                  marker.render(ctx, point, angle);
                }

                if (markerMidStyleProp.isUrlDefinition()) {
                  var _marker = markerMidStyleProp.getDefinition();

                  for (var i = 1; i < markersLastIndex; i++) {
                    var _markers$i = _slicedToArray__default['default'](markers[i], 2),
                      _point = _markers$i[0],
                      _angle = _markers$i[1];

                    _marker.render(ctx, _point, _angle);
                  }
                }

                if (markerEndStyleProp.isUrlDefinition()) {
                  var _marker2 = markerEndStyleProp.getDefinition();

                  var _markers$markersLastI = _slicedToArray__default['default'](markers[markersLastIndex], 2),
                    _point2 = _markers$markersLastI[0],
                    _angle2 = _markers$markersLastI[1];

                  _marker2.render(ctx, _point2, _angle2);
                }
              }
            },
          },
          {
            key: 'pathM',
            value: function pathM(ctx, boundingBox) {
              var pathParser = this.pathParser;

              var _PathElement$pathM = PathElement.pathM(pathParser),
                point = _PathElement$pathM.point;

              var x = point.x,
                y = point.y;
              pathParser.addMarker(point);
              boundingBox.addPoint(x, y);

              if (ctx) {
                ctx.moveTo(x, y);
              }
            },
          },
          {
            key: 'pathL',
            value: function pathL(ctx, boundingBox) {
              var pathParser = this.pathParser;

              var _PathElement$pathL = PathElement.pathL(pathParser),
                current = _PathElement$pathL.current,
                point = _PathElement$pathL.point;

              var x = point.x,
                y = point.y;
              pathParser.addMarker(point, current);
              boundingBox.addPoint(x, y);

              if (ctx) {
                ctx.lineTo(x, y);
              }
            },
          },
          {
            key: 'pathH',
            value: function pathH(ctx, boundingBox) {
              var pathParser = this.pathParser;

              var _PathElement$pathH = PathElement.pathH(pathParser),
                current = _PathElement$pathH.current,
                point = _PathElement$pathH.point;

              var x = point.x,
                y = point.y;
              pathParser.addMarker(point, current);
              boundingBox.addPoint(x, y);

              if (ctx) {
                ctx.lineTo(x, y);
              }
            },
          },
          {
            key: 'pathV',
            value: function pathV(ctx, boundingBox) {
              var pathParser = this.pathParser;

              var _PathElement$pathV = PathElement.pathV(pathParser),
                current = _PathElement$pathV.current,
                point = _PathElement$pathV.point;

              var x = point.x,
                y = point.y;
              pathParser.addMarker(point, current);
              boundingBox.addPoint(x, y);

              if (ctx) {
                ctx.lineTo(x, y);
              }
            },
          },
          {
            key: 'pathC',
            value: function pathC(ctx, boundingBox) {
              var pathParser = this.pathParser;

              var _PathElement$pathC = PathElement.pathC(pathParser),
                current = _PathElement$pathC.current,
                point = _PathElement$pathC.point,
                controlPoint = _PathElement$pathC.controlPoint,
                currentPoint = _PathElement$pathC.currentPoint;

              pathParser.addMarker(currentPoint, controlPoint, point);
              boundingBox.addBezierCurve(current.x, current.y, point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);

              if (ctx) {
                ctx.bezierCurveTo(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
              }
            },
          },
          {
            key: 'pathS',
            value: function pathS(ctx, boundingBox) {
              var pathParser = this.pathParser;

              var _PathElement$pathS = PathElement.pathS(pathParser),
                current = _PathElement$pathS.current,
                point = _PathElement$pathS.point,
                controlPoint = _PathElement$pathS.controlPoint,
                currentPoint = _PathElement$pathS.currentPoint;

              pathParser.addMarker(currentPoint, controlPoint, point);
              boundingBox.addBezierCurve(current.x, current.y, point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);

              if (ctx) {
                ctx.bezierCurveTo(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
              }
            },
          },
          {
            key: 'pathQ',
            value: function pathQ(ctx, boundingBox) {
              var pathParser = this.pathParser;

              var _PathElement$pathQ = PathElement.pathQ(pathParser),
                current = _PathElement$pathQ.current,
                controlPoint = _PathElement$pathQ.controlPoint,
                currentPoint = _PathElement$pathQ.currentPoint;

              pathParser.addMarker(currentPoint, controlPoint, controlPoint);
              boundingBox.addQuadraticCurve(current.x, current.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);

              if (ctx) {
                ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
              }
            },
          },
          {
            key: 'pathT',
            value: function pathT(ctx, boundingBox) {
              var pathParser = this.pathParser;

              var _PathElement$pathT = PathElement.pathT(pathParser),
                current = _PathElement$pathT.current,
                controlPoint = _PathElement$pathT.controlPoint,
                currentPoint = _PathElement$pathT.currentPoint;

              pathParser.addMarker(currentPoint, controlPoint, controlPoint);
              boundingBox.addQuadraticCurve(current.x, current.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);

              if (ctx) {
                ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
              }
            },
          },
          {
            key: 'pathA',
            value: function pathA(ctx, boundingBox) {
              var pathParser = this.pathParser;

              var _PathElement$pathA = PathElement.pathA(pathParser),
                currentPoint = _PathElement$pathA.currentPoint,
                rX = _PathElement$pathA.rX,
                rY = _PathElement$pathA.rY,
                sweepFlag = _PathElement$pathA.sweepFlag,
                xAxisRotation = _PathElement$pathA.xAxisRotation,
                centp = _PathElement$pathA.centp,
                a1 = _PathElement$pathA.a1,
                ad = _PathElement$pathA.ad; // for markers

              var dir = 1 - sweepFlag ? 1.0 : -1;
              var ah = a1 + dir * (ad / 2.0);
              var halfWay = new Point(centp.x + rX * Math.cos(ah), centp.y + rY * Math.sin(ah));
              pathParser.addMarkerAngle(halfWay, ah - (dir * Math.PI) / 2);
              pathParser.addMarkerAngle(currentPoint, ah - dir * Math.PI);
              boundingBox.addPoint(currentPoint.x, currentPoint.y); // TODO: this is too naive, make it better

              if (ctx && !isNaN(a1) && !isNaN(ad)) {
                var r = rX > rY ? rX : rY;
                var sx = rX > rY ? 1 : rX / rY;
                var sy = rX > rY ? rY / rX : 1;
                ctx.translate(centp.x, centp.y);
                ctx.rotate(xAxisRotation);
                ctx.scale(sx, sy);
                ctx.arc(0, 0, r, a1, a1 + ad, Boolean(1 - sweepFlag));
                ctx.scale(1 / sx, 1 / sy);
                ctx.rotate(-xAxisRotation);
                ctx.translate(-centp.x, -centp.y);
              }
            },
          },
          {
            key: 'pathZ',
            value: function pathZ(ctx, boundingBox) {
              PathElement.pathZ(this.pathParser);

              if (ctx) {
                // only close path if it is not a straight line
                if (boundingBox.x1 !== boundingBox.x2 && boundingBox.y1 !== boundingBox.y2) {
                  ctx.closePath();
                }
              }
            },
          },
        ],
        [
          {
            key: 'pathM',
            value: function pathM(pathParser) {
              var point = pathParser.getAsCurrentPoint();
              pathParser.start = pathParser.current;
              return {
                point: point,
              };
            },
          },
          {
            key: 'pathL',
            value: function pathL(pathParser) {
              var current = pathParser.current;
              var point = pathParser.getAsCurrentPoint();
              return {
                current: current,
                point: point,
              };
            },
          },
          {
            key: 'pathH',
            value: function pathH(pathParser) {
              var current = pathParser.current,
                command = pathParser.command;
              var point = new Point((command.relative ? current.x : 0) + command.x, current.y);
              pathParser.current = point;
              return {
                current: current,
                point: point,
              };
            },
          },
          {
            key: 'pathV',
            value: function pathV(pathParser) {
              var current = pathParser.current,
                command = pathParser.command;
              var point = new Point(current.x, (command.relative ? current.y : 0) + command.y);
              pathParser.current = point;
              return {
                current: current,
                point: point,
              };
            },
          },
          {
            key: 'pathC',
            value: function pathC(pathParser) {
              var current = pathParser.current;
              var point = pathParser.getPoint('x1', 'y1');
              var controlPoint = pathParser.getAsControlPoint('x2', 'y2');
              var currentPoint = pathParser.getAsCurrentPoint();
              return {
                current: current,
                point: point,
                controlPoint: controlPoint,
                currentPoint: currentPoint,
              };
            },
          },
          {
            key: 'pathS',
            value: function pathS(pathParser) {
              var current = pathParser.current;
              var point = pathParser.getReflectedControlPoint();
              var controlPoint = pathParser.getAsControlPoint('x2', 'y2');
              var currentPoint = pathParser.getAsCurrentPoint();
              return {
                current: current,
                point: point,
                controlPoint: controlPoint,
                currentPoint: currentPoint,
              };
            },
          },
          {
            key: 'pathQ',
            value: function pathQ(pathParser) {
              var current = pathParser.current;
              var controlPoint = pathParser.getAsControlPoint('x1', 'y1');
              var currentPoint = pathParser.getAsCurrentPoint();
              return {
                current: current,
                controlPoint: controlPoint,
                currentPoint: currentPoint,
              };
            },
          },
          {
            key: 'pathT',
            value: function pathT(pathParser) {
              var current = pathParser.current;
              var controlPoint = pathParser.getReflectedControlPoint();
              pathParser.control = controlPoint;
              var currentPoint = pathParser.getAsCurrentPoint();
              return {
                current: current,
                controlPoint: controlPoint,
                currentPoint: currentPoint,
              };
            },
          },
          {
            key: 'pathA',
            value: function pathA(pathParser) {
              var current = pathParser.current,
                command = pathParser.command;
              var rX = command.rX,
                rY = command.rY,
                xRot = command.xRot,
                lArcFlag = command.lArcFlag,
                sweepFlag = command.sweepFlag;
              var xAxisRotation = xRot * (Math.PI / 180.0);
              var currentPoint = pathParser.getAsCurrentPoint(); // Conversion from endpoint to center parameterization
              // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
              // x1', y1'

              var currp = new Point(
                (Math.cos(xAxisRotation) * (current.x - currentPoint.x)) / 2.0 + (Math.sin(xAxisRotation) * (current.y - currentPoint.y)) / 2.0,
                (-Math.sin(xAxisRotation) * (current.x - currentPoint.x)) / 2.0 + (Math.cos(xAxisRotation) * (current.y - currentPoint.y)) / 2.0,
              ); // adjust radii

              var l = Math.pow(currp.x, 2) / Math.pow(rX, 2) + Math.pow(currp.y, 2) / Math.pow(rY, 2);

              if (l > 1) {
                rX *= Math.sqrt(l);
                rY *= Math.sqrt(l);
              } // cx', cy'

              var s =
                (lArcFlag === sweepFlag ? -1 : 1) *
                Math.sqrt(
                  (Math.pow(rX, 2) * Math.pow(rY, 2) - Math.pow(rX, 2) * Math.pow(currp.y, 2) - Math.pow(rY, 2) * Math.pow(currp.x, 2)) /
                    (Math.pow(rX, 2) * Math.pow(currp.y, 2) + Math.pow(rY, 2) * Math.pow(currp.x, 2)),
                );

              if (isNaN(s)) {
                s = 0;
              }

              var cpp = new Point((s * rX * currp.y) / rY, (s * -rY * currp.x) / rX); // cx, cy

              var centp = new Point(
                (current.x + currentPoint.x) / 2.0 + Math.cos(xAxisRotation) * cpp.x - Math.sin(xAxisRotation) * cpp.y,
                (current.y + currentPoint.y) / 2.0 + Math.sin(xAxisRotation) * cpp.x + Math.cos(xAxisRotation) * cpp.y,
              ); // initial angle

              var a1 = vectorsAngle([1, 0], [(currp.x - cpp.x) / rX, (currp.y - cpp.y) / rY]); // θ1
              // angle delta

              var u = [(currp.x - cpp.x) / rX, (currp.y - cpp.y) / rY];
              var v = [(-currp.x - cpp.x) / rX, (-currp.y - cpp.y) / rY];
              var ad = vectorsAngle(u, v); // Δθ

              if (vectorsRatio(u, v) <= -1) {
                ad = Math.PI;
              }

              if (vectorsRatio(u, v) >= 1) {
                ad = 0;
              }

              return {
                currentPoint: currentPoint,
                rX: rX,
                rY: rY,
                sweepFlag: sweepFlag,
                xAxisRotation: xAxisRotation,
                centp: centp,
                a1: a1,
                ad: ad,
              };
            },
          },
          {
            key: 'pathZ',
            value: function pathZ(pathParser) {
              pathParser.current = pathParser.start;
            },
          },
        ],
      );

      return PathElement;
    })(RenderedElement);

    function _createSuper$F(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$F();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$F() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var GlyphElement = /*#__PURE__*/ (function (_PathElement) {
      _inherits__default['default'](GlyphElement, _PathElement);

      var _super = _createSuper$F(GlyphElement);

      function GlyphElement(document, node, captureTextNodes) {
        var _this;

        _classCallCheck__default['default'](this, GlyphElement);

        _this = _super.call(this, document, node, captureTextNodes);
        _this.type = 'glyph';
        _this.horizAdvX = _this.getAttribute('horiz-adv-x').getNumber();
        _this.unicode = _this.getAttribute('unicode').getString();
        _this.arabicForm = _this.getAttribute('arabic-form').getString();
        return _this;
      }

      return GlyphElement;
    })(PathElement);

    function _createSuper$E(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$E();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$E() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var TextElement = /*#__PURE__*/ (function (_RenderedElement) {
      _inherits__default['default'](TextElement, _RenderedElement);

      var _super = _createSuper$E(TextElement);

      function TextElement(document, node, captureTextNodes) {
        var _this;

        _classCallCheck__default['default'](this, TextElement);

        _this = _super.call(this, document, node, (this instanceof TextElement ? this.constructor : void 0) === TextElement ? true : captureTextNodes);
        _this.type = 'text';
        _this.x = 0;
        _this.y = 0;
        _this.measureCache = -1;
        return _this;
      }

      _createClass__default['default'](TextElement, [
        {
          key: 'setContext',
          value: function setContext(ctx) {
            var fromMeasure = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            _get__default['default'](_getPrototypeOf__default['default'](TextElement.prototype), 'setContext', this).call(this, ctx, fromMeasure);

            var textBaseline = this.getStyle('dominant-baseline').getTextBaseline() || this.getStyle('alignment-baseline').getTextBaseline();

            if (textBaseline) {
              ctx.textBaseline = textBaseline;
            }
          },
        },
        {
          key: 'initializeCoordinates',
          value: function initializeCoordinates() {
            this.x = 0;
            this.y = 0;
            this.leafTexts = [];
            this.textChunkStart = 0;
            this.minX = Number.POSITIVE_INFINITY;
            this.maxX = Number.NEGATIVE_INFINITY;
          },
        },
        {
          key: 'getBoundingBox',
          value: function getBoundingBox(ctx) {
            var _this2 = this;

            if (this.type !== 'text') {
              return this.getTElementBoundingBox(ctx);
            } // first, calculate child positions

            this.initializeCoordinates();
            this.adjustChildCoordinatesRecursive(ctx);
            var boundingBox = null; // then calculate bounding box

            this.children.forEach(function (_, i) {
              var childBoundingBox = _this2.getChildBoundingBox(ctx, _this2, _this2, i);

              if (!boundingBox) {
                boundingBox = childBoundingBox;
              } else {
                boundingBox.addBoundingBox(childBoundingBox);
              }
            });
            return boundingBox;
          },
        },
        {
          key: 'getFontSize',
          value: function getFontSize() {
            var document = this.document,
              parent = this.parent;
            var inheritFontSize = Font.parse(document.ctx.font).fontSize;
            var fontSize = parent.getStyle('font-size').getNumber(inheritFontSize);
            return fontSize;
          },
        },
        {
          key: 'getTElementBoundingBox',
          value: function getTElementBoundingBox(ctx) {
            var fontSize = this.getFontSize();
            return new BoundingBox(this.x, this.y - fontSize, this.x + this.measureText(ctx), this.y);
          },
        },
        {
          key: 'getGlyph',
          value: function getGlyph(font, text, i) {
            var char = text[i];
            var glyph = null;

            if (font.isArabic) {
              var len = text.length;
              var prevChar = text[i - 1];
              var nextChar = text[i + 1];
              var arabicForm = 'isolated';

              if ((i === 0 || prevChar === ' ') && i < len - 1 && nextChar !== ' ') {
                arabicForm = 'terminal';
              }

              if (i > 0 && prevChar !== ' ' && i < len - 1 && nextChar !== ' ') {
                arabicForm = 'medial';
              }

              if (i > 0 && prevChar !== ' ' && (i === len - 1 || nextChar === ' ')) {
                arabicForm = 'initial';
              }

              if (typeof font.glyphs[char] !== 'undefined') {
                // NEED TEST
                var maybeGlyph = font.glyphs[char];
                glyph = maybeGlyph instanceof GlyphElement ? maybeGlyph : maybeGlyph[arabicForm];
              }
            } else {
              glyph = font.glyphs[char];
            }

            if (!glyph) {
              glyph = font.missingGlyph;
            }

            return glyph;
          },
        },
        {
          key: 'getText',
          value: function getText() {
            return '';
          },
        },
        {
          key: 'getTextFromNode',
          value: function getTextFromNode(node) {
            var textNode = node || this.node;
            var childNodes = Array.from(textNode.parentNode.childNodes);
            var index = childNodes.indexOf(textNode);
            var lastIndex = childNodes.length - 1;
            var text = compressSpaces(
              // textNode.value
              // || textNode.text
              textNode.textContent || '',
            );

            if (index === 0) {
              text = trimLeft(text);
            }

            if (index === lastIndex) {
              text = trimRight(text);
            }

            return text;
          },
        },
        {
          key: 'renderChildren',
          value: function renderChildren(ctx) {
            var _this3 = this;

            if (this.type !== 'text') {
              this.renderTElementChildren(ctx);
              return;
            } // first, calculate child positions

            this.initializeCoordinates();
            this.adjustChildCoordinatesRecursive(ctx); // then render

            this.children.forEach(function (_, i) {
              _this3.renderChild(ctx, _this3, _this3, i);
            });
            var mouse = this.document.screen.mouse; // Do not calc bounding box if mouse is not working.

            if (mouse.isWorking()) {
              mouse.checkBoundingBox(this, this.getBoundingBox(ctx));
            }
          },
        },
        {
          key: 'renderTElementChildren',
          value: function renderTElementChildren(ctx) {
            var document = this.document,
              parent = this.parent;
            var renderText = this.getText();
            var customFont = parent.getStyle('font-family').getDefinition();

            if (customFont) {
              var unitsPerEm = customFont.fontFace.unitsPerEm;
              var ctxFont = Font.parse(document.ctx.font);
              var fontSize = parent.getStyle('font-size').getNumber(ctxFont.fontSize);
              var fontStyle = parent.getStyle('font-style').getString(ctxFont.fontStyle);
              var scale = fontSize / unitsPerEm;
              var text = customFont.isRTL ? renderText.split('').reverse().join('') : renderText;
              var dx = toNumbers(parent.getAttribute('dx').getString());
              var len = text.length;

              for (var i = 0; i < len; i++) {
                var glyph = this.getGlyph(customFont, text, i);
                ctx.translate(this.x, this.y);
                ctx.scale(scale, -scale);
                var lw = ctx.lineWidth;
                ctx.lineWidth = (ctx.lineWidth * unitsPerEm) / fontSize;

                if (fontStyle === 'italic') {
                  ctx.transform(1, 0, 0.4, 1, 0, 0);
                }

                glyph.render(ctx);

                if (fontStyle === 'italic') {
                  ctx.transform(1, 0, -0.4, 1, 0, 0);
                }

                ctx.lineWidth = lw;
                ctx.scale(1 / scale, -1 / scale);
                ctx.translate(-this.x, -this.y);
                this.x += (fontSize * (glyph.horizAdvX || customFont.horizAdvX)) / unitsPerEm;

                if (typeof dx[i] !== 'undefined' && !isNaN(dx[i])) {
                  this.x += dx[i];
                }
              }

              return;
            }

            var x = this.x,
              y = this.y; // NEED TEST
            // if (ctx.paintOrder === 'stroke') {
            // 	if (ctx.strokeStyle) {
            // 		ctx.strokeText(renderText, x, y);
            // 	}
            // 	if (ctx.fillStyle) {
            // 		ctx.fillText(renderText, x, y);
            // 	}
            // } else {

            if (ctx.fillStyle) {
              ctx.fillText(renderText, x, y);
            }

            if (ctx.strokeStyle) {
              ctx.strokeText(renderText, x, y);
            } // }
          },
        },
        {
          key: 'applyAnchoring',
          value: function applyAnchoring() {
            if (this.textChunkStart >= this.leafTexts.length) {
              return;
            } // This is basically the "Apply anchoring" part of https://www.w3.org/TR/SVG2/text.html#TextLayoutAlgorithm.
            // The difference is that we apply the anchoring as soon as a chunk is finished. This saves some extra looping.
            // Vertical text is not supported.

            var firstElement = this.leafTexts[this.textChunkStart];
            var textAnchor = firstElement.getStyle('text-anchor').getString('start');
            var isRTL = false; // we treat RTL like LTR

            var shift = 0;

            if ((textAnchor === 'start' && true) || (textAnchor === 'end' && isRTL)) {
              shift = firstElement.x - this.minX;
            } else if ((textAnchor === 'end' && true) || (textAnchor === 'start' && isRTL)) {
              shift = firstElement.x - this.maxX;
            } else {
              shift = firstElement.x - (this.minX + this.maxX) / 2;
            }

            for (var i = this.textChunkStart; i < this.leafTexts.length; i++) {
              this.leafTexts[i].x += shift;
            } // start new chunk

            this.minX = Number.POSITIVE_INFINITY;
            this.maxX = Number.NEGATIVE_INFINITY;
            this.textChunkStart = this.leafTexts.length;
          },
        },
        {
          key: 'adjustChildCoordinatesRecursive',
          value: function adjustChildCoordinatesRecursive(ctx) {
            var _this4 = this;

            this.children.forEach(function (_, i) {
              _this4.adjustChildCoordinatesRecursiveCore(ctx, _this4, _this4, i);
            });
            this.applyAnchoring();
          },
        },
        {
          key: 'adjustChildCoordinatesRecursiveCore',
          value: function adjustChildCoordinatesRecursiveCore(ctx, textParent, parent, i) {
            var child = parent.children[i];

            if (child.children.length > 0) {
              child.children.forEach(function (_, i) {
                textParent.adjustChildCoordinatesRecursiveCore(ctx, textParent, child, i);
              });
            } else {
              // only leafs are relevant
              this.adjustChildCoordinates(ctx, textParent, parent, i);
            }
          },
        },
        {
          key: 'adjustChildCoordinates',
          value: function adjustChildCoordinates(ctx, textParent, parent, i) {
            var child = parent.children[i];

            if (typeof child.measureText !== 'function') {
              return child;
            }

            ctx.save();
            child.setContext(ctx, true);
            var xAttr = child.getAttribute('x');
            var yAttr = child.getAttribute('y');
            var dxAttr = child.getAttribute('dx');
            var dyAttr = child.getAttribute('dy');
            var customFont = child.getStyle('font-family').getDefinition();
            var isRTL = Boolean(customFont) && customFont.isRTL;

            if (i === 0) {
              // First children inherit attributes from parent(s). Positional attributes
              // are only inherited from a parent to it's first child.
              if (!xAttr.hasValue()) {
                xAttr.setValue(child.getInheritedAttribute('x'));
              }

              if (!yAttr.hasValue()) {
                yAttr.setValue(child.getInheritedAttribute('y'));
              }

              if (!dxAttr.hasValue()) {
                dxAttr.setValue(child.getInheritedAttribute('dx'));
              }

              if (!dyAttr.hasValue()) {
                dyAttr.setValue(child.getInheritedAttribute('dy'));
              }
            }

            var width = child.measureText(ctx);

            if (isRTL) {
              textParent.x -= width;
            }

            if (xAttr.hasValue()) {
              // an "x" attribute marks the start of a new chunk
              textParent.applyAnchoring();
              child.x = xAttr.getPixels('x');

              if (dxAttr.hasValue()) {
                child.x += dxAttr.getPixels('x');
              }
            } else {
              if (dxAttr.hasValue()) {
                textParent.x += dxAttr.getPixels('x');
              }

              child.x = textParent.x;
            }

            textParent.x = child.x;

            if (!isRTL) {
              textParent.x += width;
            }

            if (yAttr.hasValue()) {
              child.y = yAttr.getPixels('y');

              if (dyAttr.hasValue()) {
                child.y += dyAttr.getPixels('y');
              }
            } else {
              if (dyAttr.hasValue()) {
                textParent.y += dyAttr.getPixels('y');
              }

              child.y = textParent.y;
            }

            textParent.y = child.y; // update the current chunk and it's bounds

            textParent.leafTexts.push(child);
            textParent.minX = Math.min(textParent.minX, child.x, child.x + width);
            textParent.maxX = Math.max(textParent.maxX, child.x, child.x + width);
            child.clearContext(ctx);
            ctx.restore();
            return child;
          },
        },
        {
          key: 'getChildBoundingBox',
          value: function getChildBoundingBox(ctx, textParent, parent, i) {
            var child = parent.children[i]; // not a text node?

            if (typeof child.getBoundingBox !== 'function') {
              return null;
            }

            var boundingBox = child.getBoundingBox(ctx);

            if (!boundingBox) {
              return null;
            }

            child.children.forEach(function (_, i) {
              var childBoundingBox = textParent.getChildBoundingBox(ctx, textParent, child, i);
              boundingBox.addBoundingBox(childBoundingBox);
            });
            return boundingBox;
          },
        },
        {
          key: 'renderChild',
          value: function renderChild(ctx, textParent, parent, i) {
            var child = parent.children[i];
            child.render(ctx);
            child.children.forEach(function (_, i) {
              textParent.renderChild(ctx, textParent, child, i);
            });
          },
        },
        {
          key: 'measureText',
          value: function measureText(ctx) {
            var measureCache = this.measureCache;

            if (~measureCache) {
              return measureCache;
            }

            var renderText = this.getText();
            var measure = this.measureTargetText(ctx, renderText);
            this.measureCache = measure;
            return measure;
          },
        },
        {
          key: 'measureTargetText',
          value: function measureTargetText(ctx, targetText) {
            if (!targetText.length) {
              return 0;
            }

            var parent = this.parent;
            var customFont = parent.getStyle('font-family').getDefinition();

            if (customFont) {
              var fontSize = this.getFontSize();
              var text = customFont.isRTL ? targetText.split('').reverse().join('') : targetText;
              var dx = toNumbers(parent.getAttribute('dx').getString());
              var len = text.length;
              var _measure = 0;

              for (var i = 0; i < len; i++) {
                var glyph = this.getGlyph(customFont, text, i);
                _measure += ((glyph.horizAdvX || customFont.horizAdvX) * fontSize) / customFont.fontFace.unitsPerEm;

                if (typeof dx[i] !== 'undefined' && !isNaN(dx[i])) {
                  _measure += dx[i];
                }
              }

              return _measure;
            }

            if (!ctx.measureText) {
              return targetText.length * 10;
            }

            ctx.save();
            this.setContext(ctx, true);

            var _ctx$measureText = ctx.measureText(targetText),
              measure = _ctx$measureText.width;

            this.clearContext(ctx);
            ctx.restore();
            return measure;
          },
          /**
           * Inherits positional attributes from {@link TextElement} parent(s). Attributes
           * are only inherited from a parent to its first child.
           * @param name - The attribute name.
           * @returns The attribute value or null.
           */
        },
        {
          key: 'getInheritedAttribute',
          value: function getInheritedAttribute(name) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias,consistent-this
            var current = this;

            while (current instanceof TextElement && current.isFirstChild()) {
              var parentAttr = current.parent.getAttribute(name);

              if (parentAttr.hasValue(true)) {
                return parentAttr.getValue('0');
              }

              current = current.parent;
            }

            return null;
          },
        },
      ]);

      return TextElement;
    })(RenderedElement);

    function _createSuper$D(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$D();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$D() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var TSpanElement = /*#__PURE__*/ (function (_TextElement) {
      _inherits__default['default'](TSpanElement, _TextElement);

      var _super = _createSuper$D(TSpanElement);

      function TSpanElement(document, node, captureTextNodes) {
        var _this;

        _classCallCheck__default['default'](this, TSpanElement);

        _this = _super.call(this, document, node, (this instanceof TSpanElement ? this.constructor : void 0) === TSpanElement ? true : captureTextNodes);
        _this.type = 'tspan'; // if this node has children, then they own the text

        _this.text = _this.children.length > 0 ? '' : _this.getTextFromNode();
        return _this;
      }

      _createClass__default['default'](TSpanElement, [
        {
          key: 'getText',
          value: function getText() {
            return this.text;
          },
        },
      ]);

      return TSpanElement;
    })(TextElement);

    function _createSuper$C(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$C();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$C() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var TextNode = /*#__PURE__*/ (function (_TSpanElement) {
      _inherits__default['default'](TextNode, _TSpanElement);

      var _super = _createSuper$C(TextNode);

      function TextNode() {
        var _this;

        _classCallCheck__default['default'](this, TextNode);

        _this = _super.apply(this, arguments);
        _this.type = 'textNode';
        return _this;
      }

      return TextNode;
    })(TSpanElement);

    function _createSuper$B(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$B();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$B() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var SVGElement = /*#__PURE__*/ (function (_RenderedElement) {
      _inherits__default['default'](SVGElement, _RenderedElement);

      var _super = _createSuper$B(SVGElement);

      function SVGElement() {
        var _this;

        _classCallCheck__default['default'](this, SVGElement);

        _this = _super.apply(this, arguments);
        _this.type = 'svg';
        _this.root = false;
        return _this;
      }

      _createClass__default['default'](SVGElement, [
        {
          key: 'setContext',
          value: function setContext(ctx) {
            var _this$node$parentNode;

            var document = this.document;
            var screen = document.screen,
              window = document.window;
            var canvas = ctx.canvas;
            screen.setDefaults(ctx);

            if (canvas.style && typeof ctx.font !== 'undefined' && window && typeof window.getComputedStyle !== 'undefined') {
              ctx.font = window.getComputedStyle(canvas).getPropertyValue('font');
              var fontSizeProp = new Property(document, 'fontSize', Font.parse(ctx.font).fontSize);

              if (fontSizeProp.hasValue()) {
                document.rootEmSize = fontSizeProp.getPixels('y');
                document.emSize = document.rootEmSize;
              }
            } // create new view port

            if (!this.getAttribute('x').hasValue()) {
              this.getAttribute('x', true).setValue(0);
            }

            if (!this.getAttribute('y').hasValue()) {
              this.getAttribute('y', true).setValue(0);
            }

            var _screen$viewPort = screen.viewPort,
              width = _screen$viewPort.width,
              height = _screen$viewPort.height;

            if (!this.getStyle('width').hasValue()) {
              this.getStyle('width', true).setValue('100%');
            }

            if (!this.getStyle('height').hasValue()) {
              this.getStyle('height', true).setValue('100%');
            }

            if (!this.getStyle('color').hasValue()) {
              this.getStyle('color', true).setValue('black');
            }

            var refXAttr = this.getAttribute('refX');
            var refYAttr = this.getAttribute('refY');
            var viewBoxAttr = this.getAttribute('viewBox');
            var viewBox = viewBoxAttr.hasValue() ? toNumbers(viewBoxAttr.getString()) : null;
            var clip = !this.root && this.getStyle('overflow').getValue('hidden') !== 'visible';
            var minX = 0;
            var minY = 0;
            var clipX = 0;
            var clipY = 0;

            if (viewBox) {
              minX = viewBox[0];
              minY = viewBox[1];
            }

            if (!this.root) {
              width = this.getStyle('width').getPixels('x');
              height = this.getStyle('height').getPixels('y');

              if (this.type === 'marker') {
                clipX = minX;
                clipY = minY;
                minX = 0;
                minY = 0;
              }
            }

            screen.viewPort.setCurrent(width, height); // Default value of transform-origin is center only for root SVG elements
            // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform-origin

            if (
              this.node && // is not temporary SVGElement
              (!this.parent ||
                ((_this$node$parentNode = this.node.parentNode) === null || _this$node$parentNode === void 0 ? void 0 : _this$node$parentNode.nodeName) === 'foreignObject') &&
              this.getStyle('transform', false, true).hasValue() &&
              !this.getStyle('transform-origin', false, true).hasValue()
            ) {
              this.getStyle('transform-origin', true, true).setValue('50% 50%');
            }

            _get__default['default'](_getPrototypeOf__default['default'](SVGElement.prototype), 'setContext', this).call(this, ctx);

            ctx.translate(this.getAttribute('x').getPixels('x'), this.getAttribute('y').getPixels('y'));

            if (viewBox) {
              width = viewBox[2];
              height = viewBox[3];
            }

            document.setViewBox({
              ctx: ctx,
              aspectRatio: this.getAttribute('preserveAspectRatio').getString(),
              width: screen.viewPort.width,
              desiredWidth: width,
              height: screen.viewPort.height,
              desiredHeight: height,
              minX: minX,
              minY: minY,
              refX: refXAttr.getValue(),
              refY: refYAttr.getValue(),
              clip: clip,
              clipX: clipX,
              clipY: clipY,
            });

            if (viewBox) {
              screen.viewPort.removeCurrent();
              screen.viewPort.setCurrent(width, height);
            }
          },
        },
        {
          key: 'clearContext',
          value: function clearContext(ctx) {
            _get__default['default'](_getPrototypeOf__default['default'](SVGElement.prototype), 'clearContext', this).call(this, ctx);

            this.document.screen.viewPort.removeCurrent();
          },
          /**
           * Resize SVG to fit in given size.
           * @param width
           * @param height
           * @param preserveAspectRatio
           */
        },
        {
          key: 'resize',
          value: function resize(width) {
            var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : width;
            var preserveAspectRatio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var widthAttr = this.getAttribute('width', true);
            var heightAttr = this.getAttribute('height', true);
            var viewBoxAttr = this.getAttribute('viewBox');
            var styleAttr = this.getAttribute('style');
            var originWidth = widthAttr.getNumber(0);
            var originHeight = heightAttr.getNumber(0);

            if (preserveAspectRatio) {
              if (typeof preserveAspectRatio === 'string') {
                this.getAttribute('preserveAspectRatio', true).setValue(preserveAspectRatio);
              } else {
                var preserveAspectRatioAttr = this.getAttribute('preserveAspectRatio');

                if (preserveAspectRatioAttr.hasValue()) {
                  preserveAspectRatioAttr.setValue(preserveAspectRatioAttr.getString().replace(/^\s*(\S.*\S)\s*$/, '$1'));
                }
              }
            }

            widthAttr.setValue(width);
            heightAttr.setValue(height);

            if (!viewBoxAttr.hasValue()) {
              viewBoxAttr.setValue('0 0 '.concat(originWidth || width, ' ').concat(originHeight || height));
            }

            if (styleAttr.hasValue()) {
              var widthStyle = this.getStyle('width');
              var heightStyle = this.getStyle('height');

              if (widthStyle.hasValue()) {
                widthStyle.setValue(''.concat(width, 'px'));
              }

              if (heightStyle.hasValue()) {
                heightStyle.setValue(''.concat(height, 'px'));
              }
            }
          },
        },
      ]);

      return SVGElement;
    })(RenderedElement);

    function _createSuper$A(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$A();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$A() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var RectElement = /*#__PURE__*/ (function (_PathElement) {
      _inherits__default['default'](RectElement, _PathElement);

      var _super = _createSuper$A(RectElement);

      function RectElement() {
        var _this;

        _classCallCheck__default['default'](this, RectElement);

        _this = _super.apply(this, arguments);
        _this.type = 'rect';
        return _this;
      }

      _createClass__default['default'](RectElement, [
        {
          key: 'path',
          value: function path(ctx) {
            var x = this.getAttribute('x').getPixels('x');
            var y = this.getAttribute('y').getPixels('y');
            var width = this.getStyle('width', false, true).getPixels('x');
            var height = this.getStyle('height', false, true).getPixels('y');
            var rxAttr = this.getAttribute('rx');
            var ryAttr = this.getAttribute('ry');
            var rx = rxAttr.getPixels('x');
            var ry = ryAttr.getPixels('y');

            if (rxAttr.hasValue() && !ryAttr.hasValue()) {
              ry = rx;
            }

            if (ryAttr.hasValue() && !rxAttr.hasValue()) {
              rx = ry;
            }

            rx = Math.min(rx, width / 2.0);
            ry = Math.min(ry, height / 2.0);

            if (ctx) {
              var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
              ctx.beginPath(); // always start the path so we don't fill prior paths

              if (height > 0 && width > 0) {
                ctx.moveTo(x + rx, y);
                ctx.lineTo(x + width - rx, y);
                ctx.bezierCurveTo(x + width - rx + KAPPA * rx, y, x + width, y + ry - KAPPA * ry, x + width, y + ry);
                ctx.lineTo(x + width, y + height - ry);
                ctx.bezierCurveTo(x + width, y + height - ry + KAPPA * ry, x + width - rx + KAPPA * rx, y + height, x + width - rx, y + height);
                ctx.lineTo(x + rx, y + height);
                ctx.bezierCurveTo(x + rx - KAPPA * rx, y + height, x, y + height - ry + KAPPA * ry, x, y + height - ry);
                ctx.lineTo(x, y + ry);
                ctx.bezierCurveTo(x, y + ry - KAPPA * ry, x + rx - KAPPA * rx, y, x + rx, y);
                ctx.closePath();
              }
            }

            return new BoundingBox(x, y, x + width, y + height);
          },
        },
        {
          key: 'getMarkers',
          value: function getMarkers() {
            return null;
          },
        },
      ]);

      return RectElement;
    })(PathElement);

    function _createSuper$z(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$z();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$z() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var CircleElement = /*#__PURE__*/ (function (_PathElement) {
      _inherits__default['default'](CircleElement, _PathElement);

      var _super = _createSuper$z(CircleElement);

      function CircleElement() {
        var _this;

        _classCallCheck__default['default'](this, CircleElement);

        _this = _super.apply(this, arguments);
        _this.type = 'circle';
        return _this;
      }

      _createClass__default['default'](CircleElement, [
        {
          key: 'path',
          value: function path(ctx) {
            var cx = this.getAttribute('cx').getPixels('x');
            var cy = this.getAttribute('cy').getPixels('y');
            var r = this.getAttribute('r').getPixels();

            if (ctx && r > 0) {
              ctx.beginPath();
              ctx.arc(cx, cy, r, 0, Math.PI * 2, false);
              ctx.closePath();
            }

            return new BoundingBox(cx - r, cy - r, cx + r, cy + r);
          },
        },
        {
          key: 'getMarkers',
          value: function getMarkers() {
            return null;
          },
        },
      ]);

      return CircleElement;
    })(PathElement);

    function _createSuper$y(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$y();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$y() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var EllipseElement = /*#__PURE__*/ (function (_PathElement) {
      _inherits__default['default'](EllipseElement, _PathElement);

      var _super = _createSuper$y(EllipseElement);

      function EllipseElement() {
        var _this;

        _classCallCheck__default['default'](this, EllipseElement);

        _this = _super.apply(this, arguments);
        _this.type = 'ellipse';
        return _this;
      }

      _createClass__default['default'](EllipseElement, [
        {
          key: 'path',
          value: function path(ctx) {
            var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
            var rx = this.getAttribute('rx').getPixels('x');
            var ry = this.getAttribute('ry').getPixels('y');
            var cx = this.getAttribute('cx').getPixels('x');
            var cy = this.getAttribute('cy').getPixels('y');

            if (ctx && rx > 0 && ry > 0) {
              ctx.beginPath();
              ctx.moveTo(cx + rx, cy);
              ctx.bezierCurveTo(cx + rx, cy + KAPPA * ry, cx + KAPPA * rx, cy + ry, cx, cy + ry);
              ctx.bezierCurveTo(cx - KAPPA * rx, cy + ry, cx - rx, cy + KAPPA * ry, cx - rx, cy);
              ctx.bezierCurveTo(cx - rx, cy - KAPPA * ry, cx - KAPPA * rx, cy - ry, cx, cy - ry);
              ctx.bezierCurveTo(cx + KAPPA * rx, cy - ry, cx + rx, cy - KAPPA * ry, cx + rx, cy);
              ctx.closePath();
            }

            return new BoundingBox(cx - rx, cy - ry, cx + rx, cy + ry);
          },
        },
        {
          key: 'getMarkers',
          value: function getMarkers() {
            return null;
          },
        },
      ]);

      return EllipseElement;
    })(PathElement);

    function _createSuper$x(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$x();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$x() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var LineElement = /*#__PURE__*/ (function (_PathElement) {
      _inherits__default['default'](LineElement, _PathElement);

      var _super = _createSuper$x(LineElement);

      function LineElement() {
        var _this;

        _classCallCheck__default['default'](this, LineElement);

        _this = _super.apply(this, arguments);
        _this.type = 'line';
        return _this;
      }

      _createClass__default['default'](LineElement, [
        {
          key: 'getPoints',
          value: function getPoints() {
            return [
              new Point(this.getAttribute('x1').getPixels('x'), this.getAttribute('y1').getPixels('y')),
              new Point(this.getAttribute('x2').getPixels('x'), this.getAttribute('y2').getPixels('y')),
            ];
          },
        },
        {
          key: 'path',
          value: function path(ctx) {
            var _this$getPoints = this.getPoints(),
              _this$getPoints2 = _slicedToArray__default['default'](_this$getPoints, 2),
              _this$getPoints2$ = _this$getPoints2[0],
              x0 = _this$getPoints2$.x,
              y0 = _this$getPoints2$.y,
              _this$getPoints2$2 = _this$getPoints2[1],
              x1 = _this$getPoints2$2.x,
              y1 = _this$getPoints2$2.y;

            if (ctx) {
              ctx.beginPath();
              ctx.moveTo(x0, y0);
              ctx.lineTo(x1, y1);
            }

            return new BoundingBox(x0, y0, x1, y1);
          },
        },
        {
          key: 'getMarkers',
          value: function getMarkers() {
            var _this$getPoints3 = this.getPoints(),
              _this$getPoints4 = _slicedToArray__default['default'](_this$getPoints3, 2),
              p0 = _this$getPoints4[0],
              p1 = _this$getPoints4[1];

            var a = p0.angleTo(p1);
            return [
              [p0, a],
              [p1, a],
            ];
          },
        },
      ]);

      return LineElement;
    })(PathElement);

    function _createSuper$w(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$w();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$w() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var PolylineElement = /*#__PURE__*/ (function (_PathElement) {
      _inherits__default['default'](PolylineElement, _PathElement);

      var _super = _createSuper$w(PolylineElement);

      function PolylineElement(document, node, captureTextNodes) {
        var _this;

        _classCallCheck__default['default'](this, PolylineElement);

        _this = _super.call(this, document, node, captureTextNodes);
        _this.type = 'polyline';
        _this.points = [];
        _this.points = Point.parsePath(_this.getAttribute('points').getString());
        return _this;
      }

      _createClass__default['default'](PolylineElement, [
        {
          key: 'path',
          value: function path(ctx) {
            var points = this.points;

            var _points = _slicedToArray__default['default'](points, 1),
              _points$ = _points[0],
              x0 = _points$.x,
              y0 = _points$.y;

            var boundingBox = new BoundingBox(x0, y0);

            if (ctx) {
              ctx.beginPath();
              ctx.moveTo(x0, y0);
            }

            points.forEach(function (_ref) {
              var x = _ref.x,
                y = _ref.y;
              boundingBox.addPoint(x, y);

              if (ctx) {
                ctx.lineTo(x, y);
              }
            });
            return boundingBox;
          },
        },
        {
          key: 'getMarkers',
          value: function getMarkers() {
            var points = this.points;
            var lastIndex = points.length - 1;
            var markers = [];
            points.forEach(function (point, i) {
              if (i === lastIndex) {
                return;
              }

              markers.push([point, point.angleTo(points[i + 1])]);
            });

            if (markers.length > 0) {
              markers.push([points[points.length - 1], markers[markers.length - 1][1]]);
            }

            return markers;
          },
        },
      ]);

      return PolylineElement;
    })(PathElement);

    function _createSuper$v(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$v();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$v() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var PolygonElement = /*#__PURE__*/ (function (_PolylineElement) {
      _inherits__default['default'](PolygonElement, _PolylineElement);

      var _super = _createSuper$v(PolygonElement);

      function PolygonElement() {
        var _this;

        _classCallCheck__default['default'](this, PolygonElement);

        _this = _super.apply(this, arguments);
        _this.type = 'polygon';
        return _this;
      }

      _createClass__default['default'](PolygonElement, [
        {
          key: 'path',
          value: function path(ctx) {
            var boundingBox = _get__default['default'](_getPrototypeOf__default['default'](PolygonElement.prototype), 'path', this).call(this, ctx);

            var _this$points = _slicedToArray__default['default'](this.points, 1),
              _this$points$ = _this$points[0],
              x = _this$points$.x,
              y = _this$points$.y;

            if (ctx) {
              ctx.lineTo(x, y);
              ctx.closePath();
            }

            return boundingBox;
          },
        },
      ]);

      return PolygonElement;
    })(PolylineElement);

    function _createSuper$u(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$u();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$u() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var PatternElement = /*#__PURE__*/ (function (_Element) {
      _inherits__default['default'](PatternElement, _Element);

      var _super = _createSuper$u(PatternElement);

      function PatternElement() {
        var _this;

        _classCallCheck__default['default'](this, PatternElement);

        _this = _super.apply(this, arguments);
        _this.type = 'pattern';
        return _this;
      }

      _createClass__default['default'](PatternElement, [
        {
          key: 'createPattern',
          value: function createPattern(ctx, _, parentOpacityProp) {
            var width = this.getStyle('width').getPixels('x', true);
            var height = this.getStyle('height').getPixels('y', true); // render me using a temporary svg element

            var patternSvg = new SVGElement(this.document, null);
            patternSvg.attributes.viewBox = new Property(this.document, 'viewBox', this.getAttribute('viewBox').getValue());
            patternSvg.attributes.width = new Property(this.document, 'width', ''.concat(width, 'px'));
            patternSvg.attributes.height = new Property(this.document, 'height', ''.concat(height, 'px'));
            patternSvg.attributes.transform = new Property(this.document, 'transform', this.getAttribute('patternTransform').getValue());
            patternSvg.children = this.children;
            var patternCanvas = this.document.createCanvas(width, height);
            var patternCtx = patternCanvas.getContext('2d');
            var xAttr = this.getAttribute('x');
            var yAttr = this.getAttribute('y');

            if (xAttr.hasValue() && yAttr.hasValue()) {
              patternCtx.translate(xAttr.getPixels('x', true), yAttr.getPixels('y', true));
            }

            if (parentOpacityProp.hasValue()) {
              this.styles['fill-opacity'] = parentOpacityProp;
            } else {
              Reflect.deleteProperty(this.styles, 'fill-opacity');
            } // render 3x3 grid so when we transform there's no white space on edges

            for (var x = -1; x <= 1; x++) {
              for (var y = -1; y <= 1; y++) {
                patternCtx.save();
                patternSvg.attributes.x = new Property(this.document, 'x', x * patternCanvas.width);
                patternSvg.attributes.y = new Property(this.document, 'y', y * patternCanvas.height);
                patternSvg.render(patternCtx);
                patternCtx.restore();
              }
            }

            var pattern = ctx.createPattern(patternCanvas, 'repeat');
            return pattern;
          },
        },
      ]);

      return PatternElement;
    })(Element);

    function _createSuper$t(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$t();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$t() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var MarkerElement = /*#__PURE__*/ (function (_Element) {
      _inherits__default['default'](MarkerElement, _Element);

      var _super = _createSuper$t(MarkerElement);

      function MarkerElement() {
        var _this;

        _classCallCheck__default['default'](this, MarkerElement);

        _this = _super.apply(this, arguments);
        _this.type = 'marker';
        return _this;
      }

      _createClass__default['default'](MarkerElement, [
        {
          key: 'render',
          value: function render(ctx, point, angle) {
            if (!point) {
              return;
            }

            var x = point.x,
              y = point.y;
            var orient = this.getAttribute('orient').getString('auto');
            var markerUnits = this.getAttribute('markerUnits').getString('strokeWidth');
            ctx.translate(x, y);

            if (orient === 'auto') {
              ctx.rotate(angle);
            }

            if (markerUnits === 'strokeWidth') {
              ctx.scale(ctx.lineWidth, ctx.lineWidth);
            }

            ctx.save(); // render me using a temporary svg element

            var markerSvg = new SVGElement(this.document, null);
            markerSvg.type = this.type;
            markerSvg.attributes.viewBox = new Property(this.document, 'viewBox', this.getAttribute('viewBox').getValue());
            markerSvg.attributes.refX = new Property(this.document, 'refX', this.getAttribute('refX').getValue());
            markerSvg.attributes.refY = new Property(this.document, 'refY', this.getAttribute('refY').getValue());
            markerSvg.attributes.width = new Property(this.document, 'width', this.getAttribute('markerWidth').getValue());
            markerSvg.attributes.height = new Property(this.document, 'height', this.getAttribute('markerHeight').getValue());
            markerSvg.attributes.overflow = new Property(this.document, 'overflow', this.getAttribute('overflow').getValue());
            markerSvg.attributes.fill = new Property(this.document, 'fill', this.getAttribute('fill').getColor('black'));
            markerSvg.attributes.stroke = new Property(this.document, 'stroke', this.getAttribute('stroke').getValue('none'));
            markerSvg.children = this.children;
            markerSvg.render(ctx);
            ctx.restore();

            if (markerUnits === 'strokeWidth') {
              ctx.scale(1 / ctx.lineWidth, 1 / ctx.lineWidth);
            }

            if (orient === 'auto') {
              ctx.rotate(-angle);
            }

            ctx.translate(-x, -y);
          },
        },
      ]);

      return MarkerElement;
    })(Element);

    function _createSuper$s(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$s();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$s() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var DefsElement = /*#__PURE__*/ (function (_Element) {
      _inherits__default['default'](DefsElement, _Element);

      var _super = _createSuper$s(DefsElement);

      function DefsElement() {
        var _this;

        _classCallCheck__default['default'](this, DefsElement);

        _this = _super.apply(this, arguments);
        _this.type = 'defs';
        return _this;
      }

      _createClass__default['default'](DefsElement, [
        {
          key: 'render',
          value: function render() {
            // NOOP
          },
        },
      ]);

      return DefsElement;
    })(Element);

    function _createSuper$r(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$r();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$r() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var GElement = /*#__PURE__*/ (function (_RenderedElement) {
      _inherits__default['default'](GElement, _RenderedElement);

      var _super = _createSuper$r(GElement);

      function GElement() {
        var _this;

        _classCallCheck__default['default'](this, GElement);

        _this = _super.apply(this, arguments);
        _this.type = 'g';
        return _this;
      }

      _createClass__default['default'](GElement, [
        {
          key: 'getBoundingBox',
          value: function getBoundingBox(ctx) {
            var boundingBox = new BoundingBox();
            this.children.forEach(function (child) {
              boundingBox.addBoundingBox(child.getBoundingBox(ctx));
            });
            return boundingBox;
          },
        },
      ]);

      return GElement;
    })(RenderedElement);

    function _createSuper$q(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$q();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$q() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var GradientElement = /*#__PURE__*/ (function (_Element) {
      _inherits__default['default'](GradientElement, _Element);

      var _super = _createSuper$q(GradientElement);

      function GradientElement(document, node, captureTextNodes) {
        var _this;

        _classCallCheck__default['default'](this, GradientElement);

        _this = _super.call(this, document, node, captureTextNodes);
        _this.attributesToInherit = ['gradientUnits'];
        _this.stops = [];

        var _assertThisInitialize = _assertThisInitialized__default['default'](_this),
          stops = _assertThisInitialize.stops,
          children = _assertThisInitialize.children;

        children.forEach(function (child) {
          if (child.type === 'stop') {
            stops.push(child);
          }
        });
        return _this;
      }

      _createClass__default['default'](GradientElement, [
        {
          key: 'getGradientUnits',
          value: function getGradientUnits() {
            return this.getAttribute('gradientUnits').getString('objectBoundingBox');
          },
        },
        {
          key: 'createGradient',
          value: function createGradient(ctx, element, parentOpacityProp) {
            var _this2 = this;

            // eslint-disable-next-line @typescript-eslint/no-this-alias, consistent-this
            var stopsContainer = this;

            if (this.getHrefAttribute().hasValue()) {
              stopsContainer = this.getHrefAttribute().getDefinition();
              this.inheritStopContainer(stopsContainer);
            }

            var _stopsContainer = stopsContainer,
              stops = _stopsContainer.stops;
            var gradient = this.getGradient(ctx, element);

            if (!gradient) {
              return this.addParentOpacity(parentOpacityProp, stops[stops.length - 1].color);
            }

            stops.forEach(function (stop) {
              gradient.addColorStop(stop.offset, _this2.addParentOpacity(parentOpacityProp, stop.color));
            });

            if (this.getAttribute('gradientTransform').hasValue()) {
              // render as transformed pattern on temporary canvas
              var document = this.document;
              var _document$screen = document.screen,
                MAX_VIRTUAL_PIXELS = _document$screen.MAX_VIRTUAL_PIXELS,
                viewPort = _document$screen.viewPort;

              var _viewPort$viewPorts = _slicedToArray__default['default'](viewPort.viewPorts, 1),
                rootView = _viewPort$viewPorts[0];

              var rect = new RectElement(document, null);
              rect.attributes.x = new Property(document, 'x', -MAX_VIRTUAL_PIXELS / 3.0);
              rect.attributes.y = new Property(document, 'y', -MAX_VIRTUAL_PIXELS / 3.0);
              rect.attributes.width = new Property(document, 'width', MAX_VIRTUAL_PIXELS);
              rect.attributes.height = new Property(document, 'height', MAX_VIRTUAL_PIXELS);
              var group = new GElement(document, null);
              group.attributes.transform = new Property(document, 'transform', this.getAttribute('gradientTransform').getValue());
              group.children = [rect];
              var patternSvg = new SVGElement(document, null);
              patternSvg.attributes.x = new Property(document, 'x', 0);
              patternSvg.attributes.y = new Property(document, 'y', 0);
              patternSvg.attributes.width = new Property(document, 'width', rootView.width);
              patternSvg.attributes.height = new Property(document, 'height', rootView.height);
              patternSvg.children = [group];
              var patternCanvas = document.createCanvas(rootView.width, rootView.height);
              var patternCtx = patternCanvas.getContext('2d');
              patternCtx.fillStyle = gradient;
              patternSvg.render(patternCtx);
              return patternCtx.createPattern(patternCanvas, 'no-repeat');
            }

            return gradient;
          },
        },
        {
          key: 'inheritStopContainer',
          value: function inheritStopContainer(stopsContainer) {
            var _this3 = this;

            this.attributesToInherit.forEach(function (attributeToInherit) {
              if (!_this3.getAttribute(attributeToInherit).hasValue() && stopsContainer.getAttribute(attributeToInherit).hasValue()) {
                _this3.getAttribute(attributeToInherit, true).setValue(stopsContainer.getAttribute(attributeToInherit).getValue());
              }
            });
          },
        },
        {
          key: 'addParentOpacity',
          value: function addParentOpacity(parentOpacityProp, color) {
            if (parentOpacityProp.hasValue()) {
              var colorProp = new Property(this.document, 'color', color);
              return colorProp.addOpacity(parentOpacityProp).getColor();
            }

            return color;
          },
        },
      ]);

      return GradientElement;
    })(Element);

    function _createSuper$p(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$p();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$p() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var LinearGradientElement = /*#__PURE__*/ (function (_GradientElement) {
      _inherits__default['default'](LinearGradientElement, _GradientElement);

      var _super = _createSuper$p(LinearGradientElement);

      function LinearGradientElement(document, node, captureTextNodes) {
        var _this;

        _classCallCheck__default['default'](this, LinearGradientElement);

        _this = _super.call(this, document, node, captureTextNodes);
        _this.type = 'linearGradient';

        _this.attributesToInherit.push('x1', 'y1', 'x2', 'y2');

        return _this;
      }

      _createClass__default['default'](LinearGradientElement, [
        {
          key: 'getGradient',
          value: function getGradient(ctx, element) {
            var isBoundingBoxUnits = this.getGradientUnits() === 'objectBoundingBox';
            var boundingBox = isBoundingBoxUnits ? element.getBoundingBox(ctx) : null;

            if (isBoundingBoxUnits && !boundingBox) {
              return null;
            }

            if (!this.getAttribute('x1').hasValue() && !this.getAttribute('y1').hasValue() && !this.getAttribute('x2').hasValue() && !this.getAttribute('y2').hasValue()) {
              this.getAttribute('x1', true).setValue(0);
              this.getAttribute('y1', true).setValue(0);
              this.getAttribute('x2', true).setValue(1);
              this.getAttribute('y2', true).setValue(0);
            }

            var x1 = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute('x1').getNumber() : this.getAttribute('x1').getPixels('x');
            var y1 = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute('y1').getNumber() : this.getAttribute('y1').getPixels('y');
            var x2 = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute('x2').getNumber() : this.getAttribute('x2').getPixels('x');
            var y2 = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute('y2').getNumber() : this.getAttribute('y2').getPixels('y');

            if (x1 === x2 && y1 === y2) {
              return null;
            }

            return ctx.createLinearGradient(x1, y1, x2, y2);
          },
        },
      ]);

      return LinearGradientElement;
    })(GradientElement);

    function _createSuper$o(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$o();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$o() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var RadialGradientElement = /*#__PURE__*/ (function (_GradientElement) {
      _inherits__default['default'](RadialGradientElement, _GradientElement);

      var _super = _createSuper$o(RadialGradientElement);

      function RadialGradientElement(document, node, captureTextNodes) {
        var _this;

        _classCallCheck__default['default'](this, RadialGradientElement);

        _this = _super.call(this, document, node, captureTextNodes);
        _this.type = 'radialGradient';

        _this.attributesToInherit.push('cx', 'cy', 'r', 'fx', 'fy', 'fr');

        return _this;
      }

      _createClass__default['default'](RadialGradientElement, [
        {
          key: 'getGradient',
          value: function getGradient(ctx, element) {
            var isBoundingBoxUnits = this.getGradientUnits() === 'objectBoundingBox';
            var boundingBox = element.getBoundingBox(ctx);

            if (isBoundingBoxUnits && !boundingBox) {
              return null;
            }

            if (!this.getAttribute('cx').hasValue()) {
              this.getAttribute('cx', true).setValue('50%');
            }

            if (!this.getAttribute('cy').hasValue()) {
              this.getAttribute('cy', true).setValue('50%');
            }

            if (!this.getAttribute('r').hasValue()) {
              this.getAttribute('r', true).setValue('50%');
            }

            var cx = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute('cx').getNumber() : this.getAttribute('cx').getPixels('x');
            var cy = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute('cy').getNumber() : this.getAttribute('cy').getPixels('y');
            var fx = cx;
            var fy = cy;

            if (this.getAttribute('fx').hasValue()) {
              fx = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute('fx').getNumber() : this.getAttribute('fx').getPixels('x');
            }

            if (this.getAttribute('fy').hasValue()) {
              fy = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute('fy').getNumber() : this.getAttribute('fy').getPixels('y');
            }

            var r = isBoundingBoxUnits ? ((boundingBox.width + boundingBox.height) / 2.0) * this.getAttribute('r').getNumber() : this.getAttribute('r').getPixels();
            var fr = this.getAttribute('fr').getPixels();
            return ctx.createRadialGradient(fx, fy, fr, cx, cy, r);
          },
        },
      ]);

      return RadialGradientElement;
    })(GradientElement);

    function _createSuper$n(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$n();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$n() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var StopElement = /*#__PURE__*/ (function (_Element) {
      _inherits__default['default'](StopElement, _Element);

      var _super = _createSuper$n(StopElement);

      function StopElement(document, node, captureTextNodes) {
        var _this;

        _classCallCheck__default['default'](this, StopElement);

        _this = _super.call(this, document, node, captureTextNodes);
        _this.type = 'stop';
        var offset = Math.max(0, Math.min(1, _this.getAttribute('offset').getNumber()));

        var stopOpacity = _this.getStyle('stop-opacity');

        var stopColor = _this.getStyle('stop-color', true);

        if (stopColor.getString() === '') {
          stopColor.setValue('#000');
        }

        if (stopOpacity.hasValue()) {
          stopColor = stopColor.addOpacity(stopOpacity);
        }

        _this.offset = offset;
        _this.color = stopColor.getColor();
        return _this;
      }

      return StopElement;
    })(Element);

    function _createSuper$m(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$m();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$m() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var AnimateElement = /*#__PURE__*/ (function (_Element) {
      _inherits__default['default'](AnimateElement, _Element);

      var _super = _createSuper$m(AnimateElement);

      function AnimateElement(document, node, captureTextNodes) {
        var _this;

        _classCallCheck__default['default'](this, AnimateElement);

        _this = _super.call(this, document, node, captureTextNodes);
        _this.type = 'animate';
        _this.duration = 0;
        _this.initialValue = null;
        _this.initialUnits = '';
        _this.removed = false;
        _this.frozen = false;
        document.screen.animations.push(_assertThisInitialized__default['default'](_this));
        _this.begin = _this.getAttribute('begin').getMilliseconds();
        _this.maxDuration = _this.begin + _this.getAttribute('dur').getMilliseconds();
        _this.from = _this.getAttribute('from');
        _this.to = _this.getAttribute('to');
        _this.values = new Property(document, 'values', null);

        var valuesAttr = _this.getAttribute('values');

        if (valuesAttr.hasValue()) {
          _this.values.setValue(valuesAttr.getString().split(';'));
        }

        return _this;
      }

      _createClass__default['default'](AnimateElement, [
        {
          key: 'getProperty',
          value: function getProperty() {
            var attributeType = this.getAttribute('attributeType').getString();
            var attributeName = this.getAttribute('attributeName').getString();

            if (attributeType === 'CSS') {
              return this.parent.getStyle(attributeName, true);
            }

            return this.parent.getAttribute(attributeName, true);
          },
        },
        {
          key: 'calcValue',
          value: function calcValue() {
            var initialUnits = this.initialUnits;

            var _this$getProgress = this.getProgress(),
              progress = _this$getProgress.progress,
              from = _this$getProgress.from,
              to = _this$getProgress.to; // tween value linearly

            var newValue = from.getNumber() + (to.getNumber() - from.getNumber()) * progress;

            if (initialUnits === '%') {
              newValue *= 100.0; // numValue() returns 0-1 whereas properties are 0-100
            }

            return ''.concat(newValue).concat(initialUnits);
          },
        },
        {
          key: 'update',
          value: function update(delta) {
            var parent = this.parent;
            var prop = this.getProperty(); // set initial value

            if (!this.initialValue) {
              this.initialValue = prop.getString();
              this.initialUnits = prop.getUnits();
            } // if we're past the end time

            if (this.duration > this.maxDuration) {
              var fill = this.getAttribute('fill').getString('remove'); // loop for indefinitely repeating animations

              if (this.getAttribute('repeatCount').getString() === 'indefinite' || this.getAttribute('repeatDur').getString() === 'indefinite') {
                this.duration = 0;
              } else if (fill === 'freeze' && !this.frozen) {
                this.frozen = true;
                parent.animationFrozen = true;
                parent.animationFrozenValue = prop.getString();
              } else if (fill === 'remove' && !this.removed) {
                this.removed = true;
                prop.setValue(parent.animationFrozen ? parent.animationFrozenValue : this.initialValue);
                return true;
              }

              return false;
            }

            this.duration += delta; // if we're past the begin time

            var updated = false;

            if (this.begin < this.duration) {
              var newValue = this.calcValue(); // tween

              var typeAttr = this.getAttribute('type');

              if (typeAttr.hasValue()) {
                // for transform, etc.
                var type = typeAttr.getString();
                newValue = ''.concat(type, '(').concat(newValue, ')');
              }

              prop.setValue(newValue);
              updated = true;
            }

            return updated;
          },
        },
        {
          key: 'getProgress',
          value: function getProgress() {
            var document = this.document,
              values = this.values;
            var result = {
              progress: (this.duration - this.begin) / (this.maxDuration - this.begin),
            };

            if (values.hasValue()) {
              var p = result.progress * (values.getValue().length - 1);
              var lb = Math.floor(p);
              var ub = Math.ceil(p);
              result.from = new Property(document, 'from', parseFloat(values.getValue()[lb]));
              result.to = new Property(document, 'to', parseFloat(values.getValue()[ub]));
              result.progress = (p - lb) / (ub - lb);
            } else {
              result.from = this.from;
              result.to = this.to;
            }

            return result;
          },
        },
      ]);

      return AnimateElement;
    })(Element);

    function _createSuper$l(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$l();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$l() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var AnimateColorElement = /*#__PURE__*/ (function (_AnimateElement) {
      _inherits__default['default'](AnimateColorElement, _AnimateElement);

      var _super = _createSuper$l(AnimateColorElement);

      function AnimateColorElement() {
        var _this;

        _classCallCheck__default['default'](this, AnimateColorElement);

        _this = _super.apply(this, arguments);
        _this.type = 'animateColor';
        return _this;
      }

      _createClass__default['default'](AnimateColorElement, [
        {
          key: 'calcValue',
          value: function calcValue() {
            var _this$getProgress = this.getProgress(),
              progress = _this$getProgress.progress,
              from = _this$getProgress.from,
              to = _this$getProgress.to;

            var colorFrom = new RGBColor__default['default'](from.getColor());
            var colorTo = new RGBColor__default['default'](to.getColor());

            if (colorFrom.ok && colorTo.ok) {
              // tween color linearly
              var r = colorFrom.r + (colorTo.r - colorFrom.r) * progress;
              var g = colorFrom.g + (colorTo.g - colorFrom.g) * progress;
              var b = colorFrom.b + (colorTo.b - colorFrom.b) * progress; // ? alpha

              return 'rgb('.concat(Math.floor(r), ', ').concat(Math.floor(g), ', ').concat(Math.floor(b), ')');
            }

            return this.getAttribute('from').getColor();
          },
        },
      ]);

      return AnimateColorElement;
    })(AnimateElement);

    function _createSuper$k(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$k();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$k() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var AnimateTransformElement = /*#__PURE__*/ (function (_AnimateElement) {
      _inherits__default['default'](AnimateTransformElement, _AnimateElement);

      var _super = _createSuper$k(AnimateTransformElement);

      function AnimateTransformElement() {
        var _this;

        _classCallCheck__default['default'](this, AnimateTransformElement);

        _this = _super.apply(this, arguments);
        _this.type = 'animateTransform';
        return _this;
      }

      _createClass__default['default'](AnimateTransformElement, [
        {
          key: 'calcValue',
          value: function calcValue() {
            var _this$getProgress = this.getProgress(),
              progress = _this$getProgress.progress,
              from = _this$getProgress.from,
              to = _this$getProgress.to; // tween value linearly

            var transformFrom = toNumbers(from.getString());
            var transformTo = toNumbers(to.getString());
            var newValue = transformFrom
              .map(function (from, i) {
                var to = transformTo[i];
                return from + (to - from) * progress;
              })
              .join(' ');
            return newValue;
          },
        },
      ]);

      return AnimateTransformElement;
    })(AnimateElement);

    function _createForOfIteratorHelper$1(o, allowArrayLike) {
      var it = (typeof Symbol !== 'undefined' && o[Symbol.iterator]) || o['@@iterator'];
      if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike) {
          if (it) o = it;
          var i = 0;
          var F = function F() {};
          return {
            s: F,
            n: function n() {
              if (i >= o.length) return { done: true };
              return { done: false, value: o[i++] };
            },
            e: function e(_e) {
              throw _e;
            },
            f: F,
          };
        }
        throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
      }
      var normalCompletion = true,
        didErr = false,
        err;
      return {
        s: function s() {
          it = it.call(o);
        },
        n: function n() {
          var step = it.next();
          normalCompletion = step.done;
          return step;
        },
        e: function e(_e2) {
          didErr = true;
          err = _e2;
        },
        f: function f() {
          try {
            if (!normalCompletion && it.return != null) it.return();
          } finally {
            if (didErr) throw err;
          }
        },
      };
    }

    function _unsupportedIterableToArray$1(o, minLen) {
      if (!o) return;
      if (typeof o === 'string') return _arrayLikeToArray$1(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === 'Object' && o.constructor) n = o.constructor.name;
      if (n === 'Map' || n === 'Set') return Array.from(o);
      if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
    }

    function _arrayLikeToArray$1(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }

    function _createSuper$j(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$j();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$j() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var FontElement = /*#__PURE__*/ (function (_Element) {
      _inherits__default['default'](FontElement, _Element);

      var _super = _createSuper$j(FontElement);

      function FontElement(document, node, captureTextNodes) {
        var _this;

        _classCallCheck__default['default'](this, FontElement);

        _this = _super.call(this, document, node, captureTextNodes);
        _this.type = 'font';
        _this.glyphs = Object.create(null);
        _this.horizAdvX = _this.getAttribute('horiz-adv-x').getNumber();
        var definitions = document.definitions;

        var _assertThisInitialize = _assertThisInitialized__default['default'](_this),
          children = _assertThisInitialize.children;

        var _iterator = _createForOfIteratorHelper$1(children),
          _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var child = _step.value;

            switch (child.type) {
              case 'font-face': {
                _this.fontFace = child;
                var fontFamilyStyle = child.getStyle('font-family');

                if (fontFamilyStyle.hasValue()) {
                  definitions[fontFamilyStyle.getString()] = _assertThisInitialized__default['default'](_this);
                }

                break;
              }

              case 'missing-glyph':
                _this.missingGlyph = child;
                break;

              case 'glyph': {
                var glyph = child;

                if (glyph.arabicForm) {
                  _this.isRTL = true;
                  _this.isArabic = true;

                  if (typeof _this.glyphs[glyph.unicode] === 'undefined') {
                    _this.glyphs[glyph.unicode] = Object.create(null);
                  }

                  _this.glyphs[glyph.unicode][glyph.arabicForm] = glyph;
                } else {
                  _this.glyphs[glyph.unicode] = glyph;
                }

                break;
              }
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return _this;
      }

      _createClass__default['default'](FontElement, [
        {
          key: 'render',
          value: function render() {
            // NO RENDER
          },
        },
      ]);

      return FontElement;
    })(Element);

    function _createSuper$i(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$i();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$i() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var FontFaceElement = /*#__PURE__*/ (function (_Element) {
      _inherits__default['default'](FontFaceElement, _Element);

      var _super = _createSuper$i(FontFaceElement);

      function FontFaceElement(document, node, captureTextNodes) {
        var _this;

        _classCallCheck__default['default'](this, FontFaceElement);

        _this = _super.call(this, document, node, captureTextNodes);
        _this.type = 'font-face';
        _this.ascent = _this.getAttribute('ascent').getNumber();
        _this.descent = _this.getAttribute('descent').getNumber();
        _this.unitsPerEm = _this.getAttribute('units-per-em').getNumber();
        return _this;
      }

      return FontFaceElement;
    })(Element);

    function _createSuper$h(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$h();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$h() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var MissingGlyphElement = /*#__PURE__*/ (function (_PathElement) {
      _inherits__default['default'](MissingGlyphElement, _PathElement);

      var _super = _createSuper$h(MissingGlyphElement);

      function MissingGlyphElement() {
        var _this;

        _classCallCheck__default['default'](this, MissingGlyphElement);

        _this = _super.apply(this, arguments);
        _this.type = 'missing-glyph';
        _this.horizAdvX = 0;
        return _this;
      }

      return MissingGlyphElement;
    })(PathElement);

    function _createSuper$g(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$g();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$g() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var TRefElement = /*#__PURE__*/ (function (_TextElement) {
      _inherits__default['default'](TRefElement, _TextElement);

      var _super = _createSuper$g(TRefElement);

      function TRefElement() {
        var _this;

        _classCallCheck__default['default'](this, TRefElement);

        _this = _super.apply(this, arguments);
        _this.type = 'tref';
        return _this;
      }

      _createClass__default['default'](TRefElement, [
        {
          key: 'getText',
          value: function getText() {
            var element = this.getHrefAttribute().getDefinition();

            if (element) {
              var firstChild = element.children[0];

              if (firstChild) {
                return firstChild.getText();
              }
            }

            return '';
          },
        },
      ]);

      return TRefElement;
    })(TextElement);

    function _createSuper$f(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$f();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$f() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var AElement = /*#__PURE__*/ (function (_TextElement) {
      _inherits__default['default'](AElement, _TextElement);

      var _super = _createSuper$f(AElement);

      function AElement(document, node, captureTextNodes) {
        var _this;

        _classCallCheck__default['default'](this, AElement);

        _this = _super.call(this, document, node, captureTextNodes);
        _this.type = 'a';
        var childNodes = node.childNodes;
        var firstChild = childNodes[0];
        var hasText =
          childNodes.length > 0 &&
          Array.from(childNodes).every(function (node) {
            return node.nodeType === 3;
          });
        _this.hasText = hasText;
        _this.text = hasText ? _this.getTextFromNode(firstChild) : '';
        return _this;
      }

      _createClass__default['default'](AElement, [
        {
          key: 'getText',
          value: function getText() {
            return this.text;
          },
        },
        {
          key: 'renderChildren',
          value: function renderChildren(ctx) {
            if (this.hasText) {
              // render as text element
              _get__default['default'](_getPrototypeOf__default['default'](AElement.prototype), 'renderChildren', this).call(this, ctx);

              var document = this.document,
                x = this.x,
                y = this.y;
              var mouse = document.screen.mouse;
              var fontSize = new Property(document, 'fontSize', Font.parse(document.ctx.font).fontSize); // Do not calc bounding box if mouse is not working.

              if (mouse.isWorking()) {
                mouse.checkBoundingBox(this, new BoundingBox(x, y - fontSize.getPixels('y'), x + this.measureText(ctx), y));
              }
            } else if (this.children.length > 0) {
              // render as temporary group
              var g = new GElement(this.document, null);
              g.children = this.children;
              g.parent = this;
              g.render(ctx);
            }
          },
        },
        {
          key: 'onClick',
          value: function onClick() {
            var window = this.document.window;

            if (window) {
              window.open(this.getHrefAttribute().getString());
            }
          },
        },
        {
          key: 'onMouseMove',
          value: function onMouseMove() {
            var ctx = this.document.ctx;
            ctx.canvas.style.cursor = 'pointer';
          },
        },
      ]);

      return AElement;
    })(TextElement);

    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it = (typeof Symbol !== 'undefined' && o[Symbol.iterator]) || o['@@iterator'];
      if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike) {
          if (it) o = it;
          var i = 0;
          var F = function F() {};
          return {
            s: F,
            n: function n() {
              if (i >= o.length) return { done: true };
              return { done: false, value: o[i++] };
            },
            e: function e(_e) {
              throw _e;
            },
            f: F,
          };
        }
        throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
      }
      var normalCompletion = true,
        didErr = false,
        err;
      return {
        s: function s() {
          it = it.call(o);
        },
        n: function n() {
          var step = it.next();
          normalCompletion = step.done;
          return step;
        },
        e: function e(_e2) {
          didErr = true;
          err = _e2;
        },
        f: function f() {
          try {
            if (!normalCompletion && it.return != null) it.return();
          } finally {
            if (didErr) throw err;
          }
        },
      };
    }

    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === 'Object' && o.constructor) n = o.constructor.name;
      if (n === 'Map' || n === 'Set') return Array.from(o);
      if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }

    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }

    function ownKeys$2(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
          symbols = symbols.filter(function (sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        }
        keys.push.apply(keys, symbols);
      }
      return keys;
    }

    function _objectSpread$2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys$2(Object(source), true).forEach(function (key) {
            _defineProperty__default['default'](target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys$2(Object(source)).forEach(function (key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }

    function _createSuper$e(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$e();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$e() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var TextPathElement = /*#__PURE__*/ (function (_TextElement) {
      _inherits__default['default'](TextPathElement, _TextElement);

      var _super = _createSuper$e(TextPathElement);

      function TextPathElement(document, node, captureTextNodes) {
        var _this;

        _classCallCheck__default['default'](this, TextPathElement);

        _this = _super.call(this, document, node, captureTextNodes);
        _this.type = 'textPath';
        _this.textWidth = 0;
        _this.textHeight = 0;
        _this.pathLength = -1;
        _this.glyphInfo = null;
        _this.letterSpacingCache = [];
        _this.measuresCache = new Map([['', 0]]);

        var pathElement = _this.getHrefAttribute().getDefinition();

        _this.text = _this.getTextFromNode();
        _this.dataArray = _this.parsePathData(pathElement);
        return _this;
      }

      _createClass__default['default'](TextPathElement, [
        {
          key: 'getText',
          value: function getText() {
            return this.text;
          },
        },
        {
          key: 'path',
          value: function path(ctx) {
            var dataArray = this.dataArray;

            if (ctx) {
              ctx.beginPath();
            }

            dataArray.forEach(function (_ref) {
              var type = _ref.type,
                points = _ref.points;

              switch (type) {
                case PathParser.LINE_TO:
                  if (ctx) {
                    ctx.lineTo(points[0], points[1]);
                  }

                  break;

                case PathParser.MOVE_TO:
                  if (ctx) {
                    ctx.moveTo(points[0], points[1]);
                  }

                  break;

                case PathParser.CURVE_TO:
                  if (ctx) {
                    ctx.bezierCurveTo(points[0], points[1], points[2], points[3], points[4], points[5]);
                  }

                  break;

                case PathParser.QUAD_TO:
                  if (ctx) {
                    ctx.quadraticCurveTo(points[0], points[1], points[2], points[3]);
                  }

                  break;

                case PathParser.ARC: {
                  var _points = _slicedToArray__default['default'](points, 8),
                    cx = _points[0],
                    cy = _points[1],
                    rx = _points[2],
                    ry = _points[3],
                    theta = _points[4],
                    dTheta = _points[5],
                    psi = _points[6],
                    fs = _points[7];

                  var r = rx > ry ? rx : ry;
                  var scaleX = rx > ry ? 1 : rx / ry;
                  var scaleY = rx > ry ? ry / rx : 1;

                  if (ctx) {
                    ctx.translate(cx, cy);
                    ctx.rotate(psi);
                    ctx.scale(scaleX, scaleY);
                    ctx.arc(0, 0, r, theta, theta + dTheta, Boolean(1 - fs));
                    ctx.scale(1 / scaleX, 1 / scaleY);
                    ctx.rotate(-psi);
                    ctx.translate(-cx, -cy);
                  }

                  break;
                }

                case PathParser.CLOSE_PATH:
                  if (ctx) {
                    ctx.closePath();
                  }

                  break;
              }
            });
          },
        },
        {
          key: 'renderChildren',
          value: function renderChildren(ctx) {
            this.setTextData(ctx);
            ctx.save();
            var textDecoration = this.parent.getStyle('text-decoration').getString();
            var fontSize = this.getFontSize();
            var glyphInfo = this.glyphInfo;
            var fill = ctx.fillStyle;

            if (textDecoration === 'underline') {
              ctx.beginPath();
            }

            glyphInfo.forEach(function (glyph, i) {
              var p0 = glyph.p0,
                p1 = glyph.p1,
                rotation = glyph.rotation,
                partialText = glyph.text;
              ctx.save();
              ctx.translate(p0.x, p0.y);
              ctx.rotate(rotation);

              if (ctx.fillStyle) {
                ctx.fillText(partialText, 0, 0);
              }

              if (ctx.strokeStyle) {
                ctx.strokeText(partialText, 0, 0);
              }

              ctx.restore();

              if (textDecoration === 'underline') {
                if (i === 0) {
                  ctx.moveTo(p0.x, p0.y + fontSize / 8);
                }

                ctx.lineTo(p1.x, p1.y + fontSize / 5);
              } // // To assist with debugging visually, uncomment following
              //
              // ctx.beginPath();
              // if (i % 2)
              // 	ctx.strokeStyle = 'red';
              // else
              // 	ctx.strokeStyle = 'green';
              // ctx.moveTo(p0.x, p0.y);
              // ctx.lineTo(p1.x, p1.y);
              // ctx.stroke();
              // ctx.closePath();
            });

            if (textDecoration === 'underline') {
              ctx.lineWidth = fontSize / 20;
              ctx.strokeStyle = fill;
              ctx.stroke();
              ctx.closePath();
            }

            ctx.restore();
          },
        },
        {
          key: 'getLetterSpacingAt',
          value: function getLetterSpacingAt() {
            var idx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            return this.letterSpacingCache[idx] || 0;
          },
        },
        {
          key: 'findSegmentToFitChar',
          value: function findSegmentToFitChar(ctx, anchor, textFullWidth, fullPathWidth, spacesNumber, inputOffset, dy, c, charI) {
            var offset = inputOffset;
            var glyphWidth = this.measureText(ctx, c);

            if (c === ' ' && anchor === 'justify' && textFullWidth < fullPathWidth) {
              glyphWidth += (fullPathWidth - textFullWidth) / spacesNumber;
            }

            if (charI > -1) {
              offset += this.getLetterSpacingAt(charI);
            }

            var splineStep = this.textHeight / 20;
            var p0 = this.getEquidistantPointOnPath(offset, splineStep, 0);
            var p1 = this.getEquidistantPointOnPath(offset + glyphWidth, splineStep, 0);
            var segment = {
              p0: p0,
              p1: p1,
            };
            var rotation = p0 && p1 ? Math.atan2(p1.y - p0.y, p1.x - p0.x) : 0;

            if (dy) {
              var dyX = Math.cos(Math.PI / 2 + rotation) * dy;
              var dyY = Math.cos(-rotation) * dy;
              segment.p0 = _objectSpread$2(
                _objectSpread$2({}, p0),
                {},
                {
                  x: p0.x + dyX,
                  y: p0.y + dyY,
                },
              );
              segment.p1 = _objectSpread$2(
                _objectSpread$2({}, p1),
                {},
                {
                  x: p1.x + dyX,
                  y: p1.y + dyY,
                },
              );
            }

            offset += glyphWidth;
            return {
              offset: offset,
              segment: segment,
              rotation: rotation,
            };
          },
        },
        {
          key: 'measureText',
          value: function measureText(ctx, text) {
            var measuresCache = this.measuresCache;
            var targetText = text || this.getText();

            if (measuresCache.has(targetText)) {
              return measuresCache.get(targetText);
            }

            var measure = this.measureTargetText(ctx, targetText);
            measuresCache.set(targetText, measure);
            return measure;
          }, // This method supposes what all custom fonts already loaded.
          // If some font will be loaded after this method call, <textPath> will not be rendered correctly.
          // You need to call this method manually to update glyphs cache.
        },
        {
          key: 'setTextData',
          value: function setTextData(ctx) {
            var _this2 = this;

            if (this.glyphInfo) {
              return;
            }

            var renderText = this.getText();
            var chars = renderText.split('');
            var spacesNumber = renderText.split(' ').length - 1;
            var dx = this.parent
              .getAttribute('dx')
              .split()
              .map(function (_) {
                return _.getPixels('x');
              });
            var dy = this.parent.getAttribute('dy').getPixels('y');
            var anchor = this.parent.getStyle('text-anchor').getString('start');
            var thisSpacing = this.getStyle('letter-spacing');
            var parentSpacing = this.parent.getStyle('letter-spacing');
            var letterSpacing = 0;

            if (!thisSpacing.hasValue() || thisSpacing.getValue() === 'inherit') {
              letterSpacing = parentSpacing.getPixels();
            } else if (thisSpacing.hasValue()) {
              if (thisSpacing.getValue() !== 'initial' && thisSpacing.getValue() !== 'unset') {
                letterSpacing = thisSpacing.getPixels();
              }
            } // fill letter-spacing cache

            var letterSpacingCache = [];
            var textLen = renderText.length;
            this.letterSpacingCache = letterSpacingCache;

            for (var i = 0; i < textLen; i++) {
              letterSpacingCache.push(typeof dx[i] !== 'undefined' ? dx[i] : letterSpacing);
            }

            var dxSum = letterSpacingCache.reduce(function (acc, cur, i) {
              return i === 0 ? 0 : acc + cur || 0;
            }, 0);
            var textWidth = this.measureText(ctx);
            var textFullWidth = Math.max(textWidth + dxSum, 0);
            this.textWidth = textWidth;
            this.textHeight = this.getFontSize();
            this.glyphInfo = [];
            var fullPathWidth = this.getPathLength();
            var startOffset = this.getStyle('startOffset').getNumber(0) * fullPathWidth;
            var offset = 0;

            if (anchor === 'middle' || anchor === 'center') {
              offset = -textFullWidth / 2;
            }

            if (anchor === 'end' || anchor === 'right') {
              offset = -textFullWidth;
            }

            offset += startOffset;
            chars.forEach(function (char, i) {
              // Find such segment what distance between p0 and p1 is approx. width of glyph
              var _this2$findSegmentToF = _this2.findSegmentToFitChar(ctx, anchor, textFullWidth, fullPathWidth, spacesNumber, offset, dy, char, i),
                nextOffset = _this2$findSegmentToF.offset,
                segment = _this2$findSegmentToF.segment,
                rotation = _this2$findSegmentToF.rotation;

              offset = nextOffset;

              if (!segment.p0 || !segment.p1) {
                return;
              } // const width = this.getLineLength(
              // 	segment.p0.x,
              // 	segment.p0.y,
              // 	segment.p1.x,
              // 	segment.p1.y
              // );
              // Note: Since glyphs are rendered one at a time, any kerning pair data built into the font will not be used.
              // Can foresee having a rough pair table built in that the developer can override as needed.
              // Or use "dx" attribute of the <text> node as a naive replacement
              // const kern = 0;
              // placeholder for future implementation
              // const midpoint = this.getPointOnLine(
              // 	kern + width / 2.0,
              // 	segment.p0.x, segment.p0.y, segment.p1.x, segment.p1.y
              // );

              _this2.glyphInfo.push({
                // transposeX: midpoint.x,
                // transposeY: midpoint.y,
                text: chars[i],
                p0: segment.p0,
                p1: segment.p1,
                rotation: rotation,
              });
            });
          },
        },
        {
          key: 'parsePathData',
          value: function parsePathData(path) {
            this.pathLength = -1; // reset path length

            if (!path) {
              return [];
            }

            var pathCommands = [];
            var pathParser = path.pathParser;
            pathParser.reset(); // convert l, H, h, V, and v to L

            while (!pathParser.isEnd()) {
              var current = pathParser.current;
              var startX = current ? current.x : 0;
              var startY = current ? current.y : 0;
              var command = pathParser.next();
              var nextCommandType = command.type;
              var points = [];

              switch (command.type) {
                case PathParser.MOVE_TO:
                  this.pathM(pathParser, points);
                  break;

                case PathParser.LINE_TO:
                  nextCommandType = this.pathL(pathParser, points);
                  break;

                case PathParser.HORIZ_LINE_TO:
                  nextCommandType = this.pathH(pathParser, points);
                  break;

                case PathParser.VERT_LINE_TO:
                  nextCommandType = this.pathV(pathParser, points);
                  break;

                case PathParser.CURVE_TO:
                  this.pathC(pathParser, points);
                  break;

                case PathParser.SMOOTH_CURVE_TO:
                  nextCommandType = this.pathS(pathParser, points);
                  break;

                case PathParser.QUAD_TO:
                  this.pathQ(pathParser, points);
                  break;

                case PathParser.SMOOTH_QUAD_TO:
                  nextCommandType = this.pathT(pathParser, points);
                  break;

                case PathParser.ARC:
                  points = this.pathA(pathParser);
                  break;

                case PathParser.CLOSE_PATH:
                  PathElement.pathZ(pathParser);
                  break;
              }

              if (command.type !== PathParser.CLOSE_PATH) {
                pathCommands.push({
                  type: nextCommandType,
                  points: points,
                  start: {
                    x: startX,
                    y: startY,
                  },
                  pathLength: this.calcLength(startX, startY, nextCommandType, points),
                });
              } else {
                pathCommands.push({
                  type: PathParser.CLOSE_PATH,
                  points: [],
                  pathLength: 0,
                });
              }
            }

            return pathCommands;
          },
        },
        {
          key: 'pathM',
          value: function pathM(pathParser, points) {
            var _PathElement$pathM$po = PathElement.pathM(pathParser).point,
              x = _PathElement$pathM$po.x,
              y = _PathElement$pathM$po.y;
            points.push(x, y);
          },
        },
        {
          key: 'pathL',
          value: function pathL(pathParser, points) {
            var _PathElement$pathL$po = PathElement.pathL(pathParser).point,
              x = _PathElement$pathL$po.x,
              y = _PathElement$pathL$po.y;
            points.push(x, y);
            return PathParser.LINE_TO;
          },
        },
        {
          key: 'pathH',
          value: function pathH(pathParser, points) {
            var _PathElement$pathH$po = PathElement.pathH(pathParser).point,
              x = _PathElement$pathH$po.x,
              y = _PathElement$pathH$po.y;
            points.push(x, y);
            return PathParser.LINE_TO;
          },
        },
        {
          key: 'pathV',
          value: function pathV(pathParser, points) {
            var _PathElement$pathV$po = PathElement.pathV(pathParser).point,
              x = _PathElement$pathV$po.x,
              y = _PathElement$pathV$po.y;
            points.push(x, y);
            return PathParser.LINE_TO;
          },
        },
        {
          key: 'pathC',
          value: function pathC(pathParser, points) {
            var _PathElement$pathC = PathElement.pathC(pathParser),
              point = _PathElement$pathC.point,
              controlPoint = _PathElement$pathC.controlPoint,
              currentPoint = _PathElement$pathC.currentPoint;

            points.push(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
          },
        },
        {
          key: 'pathS',
          value: function pathS(pathParser, points) {
            var _PathElement$pathS = PathElement.pathS(pathParser),
              point = _PathElement$pathS.point,
              controlPoint = _PathElement$pathS.controlPoint,
              currentPoint = _PathElement$pathS.currentPoint;

            points.push(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
            return PathParser.CURVE_TO;
          },
        },
        {
          key: 'pathQ',
          value: function pathQ(pathParser, points) {
            var _PathElement$pathQ = PathElement.pathQ(pathParser),
              controlPoint = _PathElement$pathQ.controlPoint,
              currentPoint = _PathElement$pathQ.currentPoint;

            points.push(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
          },
        },
        {
          key: 'pathT',
          value: function pathT(pathParser, points) {
            var _PathElement$pathT = PathElement.pathT(pathParser),
              controlPoint = _PathElement$pathT.controlPoint,
              currentPoint = _PathElement$pathT.currentPoint;

            points.push(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
            return PathParser.QUAD_TO;
          },
        },
        {
          key: 'pathA',
          value: function pathA(pathParser) {
            var _PathElement$pathA = PathElement.pathA(pathParser),
              rX = _PathElement$pathA.rX,
              rY = _PathElement$pathA.rY,
              sweepFlag = _PathElement$pathA.sweepFlag,
              xAxisRotation = _PathElement$pathA.xAxisRotation,
              centp = _PathElement$pathA.centp,
              a1 = _PathElement$pathA.a1,
              ad = _PathElement$pathA.ad;

            if (sweepFlag === 0 && ad > 0) {
              ad -= 2 * Math.PI;
            }

            if (sweepFlag === 1 && ad < 0) {
              ad += 2 * Math.PI;
            }

            return [centp.x, centp.y, rX, rY, a1, ad, xAxisRotation, sweepFlag];
          },
        },
        {
          key: 'calcLength',
          value: function calcLength(x, y, commandType, points) {
            var len = 0;
            var p1 = null;
            var p2 = null;
            var t = 0;

            switch (commandType) {
              case PathParser.LINE_TO:
                return this.getLineLength(x, y, points[0], points[1]);

              case PathParser.CURVE_TO:
                // Approximates by breaking curve into 100 line segments
                len = 0.0;
                p1 = this.getPointOnCubicBezier(0, x, y, points[0], points[1], points[2], points[3], points[4], points[5]);

                for (t = 0.01; t <= 1; t += 0.01) {
                  p2 = this.getPointOnCubicBezier(t, x, y, points[0], points[1], points[2], points[3], points[4], points[5]);
                  len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
                  p1 = p2;
                }

                return len;

              case PathParser.QUAD_TO:
                // Approximates by breaking curve into 100 line segments
                len = 0.0;
                p1 = this.getPointOnQuadraticBezier(0, x, y, points[0], points[1], points[2], points[3]);

                for (t = 0.01; t <= 1; t += 0.01) {
                  p2 = this.getPointOnQuadraticBezier(t, x, y, points[0], points[1], points[2], points[3]);
                  len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
                  p1 = p2;
                }

                return len;

              case PathParser.ARC: {
                // Approximates by breaking curve into line segments
                len = 0.0;
                var start = points[4]; // 4 = theta

                var dTheta = points[5]; // 5 = dTheta

                var end = points[4] + dTheta;
                var inc = Math.PI / 180.0; // 1 degree resolution

                if (Math.abs(start - end) < inc) {
                  inc = Math.abs(start - end);
                } // Note: for purpose of calculating arc length, not going to worry about rotating X-axis by angle psi

                p1 = this.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], start, 0);

                if (dTheta < 0) {
                  // clockwise
                  for (t = start - inc; t > end; t -= inc) {
                    p2 = this.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
                    len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
                    p1 = p2;
                  }
                } else {
                  // counter-clockwise
                  for (t = start + inc; t < end; t += inc) {
                    p2 = this.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
                    len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
                    p1 = p2;
                  }
                }

                p2 = this.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], end, 0);
                len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
                return len;
              }
            }

            return 0;
          },
        },
        {
          key: 'getPointOnLine',
          value: function getPointOnLine(dist, p1x, p1y, p2x, p2y) {
            var fromX = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : p1x;
            var fromY = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : p1y;
            var m = (p2y - p1y) / (p2x - p1x + PSEUDO_ZERO);
            var run = Math.sqrt((dist * dist) / (1 + m * m));

            if (p2x < p1x) {
              run *= -1;
            }

            var rise = m * run;
            var pt = null;

            if (p2x === p1x) {
              // vertical line
              pt = {
                x: fromX,
                y: fromY + rise,
              };
            } else if ((fromY - p1y) / (fromX - p1x + PSEUDO_ZERO) === m) {
              pt = {
                x: fromX + run,
                y: fromY + rise,
              };
            } else {
              var ix = 0;
              var iy = 0;
              var len = this.getLineLength(p1x, p1y, p2x, p2y);

              if (len < PSEUDO_ZERO) {
                return null;
              }

              var u = (fromX - p1x) * (p2x - p1x) + (fromY - p1y) * (p2y - p1y);
              u /= len * len;
              ix = p1x + u * (p2x - p1x);
              iy = p1y + u * (p2y - p1y);
              var pRise = this.getLineLength(fromX, fromY, ix, iy);
              var pRun = Math.sqrt(dist * dist - pRise * pRise);
              run = Math.sqrt((pRun * pRun) / (1 + m * m));

              if (p2x < p1x) {
                run *= -1;
              }

              rise = m * run;
              pt = {
                x: ix + run,
                y: iy + rise,
              };
            }

            return pt;
          },
        },
        {
          key: 'getPointOnPath',
          value: function getPointOnPath(distance) {
            var fullLen = this.getPathLength();
            var cumulativePathLength = 0;
            var p = null;

            if (distance < -5e-5 || distance - 0.00005 > fullLen) {
              return null;
            }

            var dataArray = this.dataArray;

            var _iterator = _createForOfIteratorHelper(dataArray),
              _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                var command = _step.value;

                if (command && (command.pathLength < 0.00005 || cumulativePathLength + command.pathLength + 0.00005 < distance)) {
                  cumulativePathLength += command.pathLength;
                  continue;
                }

                var delta = distance - cumulativePathLength;
                var currentT = 0;

                switch (command.type) {
                  case PathParser.LINE_TO:
                    p = this.getPointOnLine(delta, command.start.x, command.start.y, command.points[0], command.points[1], command.start.x, command.start.y);
                    break;

                  case PathParser.ARC: {
                    var start = command.points[4]; // 4 = theta

                    var dTheta = command.points[5]; // 5 = dTheta

                    var end = command.points[4] + dTheta;
                    currentT = start + (delta / command.pathLength) * dTheta;

                    if ((dTheta < 0 && currentT < end) || (dTheta >= 0 && currentT > end)) {
                      break;
                    }

                    p = this.getPointOnEllipticalArc(command.points[0], command.points[1], command.points[2], command.points[3], currentT, command.points[6]);
                    break;
                  }

                  case PathParser.CURVE_TO:
                    currentT = delta / command.pathLength;

                    if (currentT > 1) {
                      currentT = 1;
                    }

                    p = this.getPointOnCubicBezier(
                      currentT,
                      command.start.x,
                      command.start.y,
                      command.points[0],
                      command.points[1],
                      command.points[2],
                      command.points[3],
                      command.points[4],
                      command.points[5],
                    );
                    break;

                  case PathParser.QUAD_TO:
                    currentT = delta / command.pathLength;

                    if (currentT > 1) {
                      currentT = 1;
                    }

                    p = this.getPointOnQuadraticBezier(currentT, command.start.x, command.start.y, command.points[0], command.points[1], command.points[2], command.points[3]);
                    break;
                }

                if (p) {
                  return p;
                }

                break;
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            return null;
          },
        },
        {
          key: 'getLineLength',
          value: function getLineLength(x1, y1, x2, y2) {
            return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
          },
        },
        {
          key: 'getPathLength',
          value: function getPathLength() {
            if (this.pathLength === -1) {
              this.pathLength = this.dataArray.reduce(function (length, command) {
                return command.pathLength > 0 ? length + command.pathLength : length;
              }, 0);
            }

            return this.pathLength;
          },
        },
        {
          key: 'getPointOnCubicBezier',
          value: function getPointOnCubicBezier(pct, p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y) {
            var x = p4x * CB1(pct) + p3x * CB2(pct) + p2x * CB3(pct) + p1x * CB4(pct);
            var y = p4y * CB1(pct) + p3y * CB2(pct) + p2y * CB3(pct) + p1y * CB4(pct);
            return {
              x: x,
              y: y,
            };
          },
        },
        {
          key: 'getPointOnQuadraticBezier',
          value: function getPointOnQuadraticBezier(pct, p1x, p1y, p2x, p2y, p3x, p3y) {
            var x = p3x * QB1(pct) + p2x * QB2(pct) + p1x * QB3(pct);
            var y = p3y * QB1(pct) + p2y * QB2(pct) + p1y * QB3(pct);
            return {
              x: x,
              y: y,
            };
          },
        },
        {
          key: 'getPointOnEllipticalArc',
          value: function getPointOnEllipticalArc(cx, cy, rx, ry, theta, psi) {
            var cosPsi = Math.cos(psi);
            var sinPsi = Math.sin(psi);
            var pt = {
              x: rx * Math.cos(theta),
              y: ry * Math.sin(theta),
            };
            return {
              x: cx + (pt.x * cosPsi - pt.y * sinPsi),
              y: cy + (pt.x * sinPsi + pt.y * cosPsi),
            };
          }, // TODO need some optimisations. possibly build cache only for curved segments?
        },
        {
          key: 'buildEquidistantCache',
          value: function buildEquidistantCache(inputStep, inputPrecision) {
            var fullLen = this.getPathLength();
            var precision = inputPrecision || 0.25; // accuracy vs performance

            var step = inputStep || fullLen / 100;

            if (!this.equidistantCache || this.equidistantCache.step !== step || this.equidistantCache.precision !== precision) {
              // Prepare cache
              this.equidistantCache = {
                step: step,
                precision: precision,
                points: [],
              }; // Calculate points

              var s = 0;

              for (var l = 0; l <= fullLen; l += precision) {
                var p0 = this.getPointOnPath(l);
                var p1 = this.getPointOnPath(l + precision);

                if (!p0 || !p1) {
                  continue;
                }

                s += this.getLineLength(p0.x, p0.y, p1.x, p1.y);

                if (s >= step) {
                  this.equidistantCache.points.push({
                    x: p0.x,
                    y: p0.y,
                    distance: l,
                  });
                  s -= step;
                }
              }
            }
          },
        },
        {
          key: 'getEquidistantPointOnPath',
          value: function getEquidistantPointOnPath(targetDistance, step, precision) {
            this.buildEquidistantCache(step, precision);

            if (targetDistance < 0 || targetDistance - this.getPathLength() > 0.00005) {
              return null;
            }

            var idx = Math.round((targetDistance / this.getPathLength()) * (this.equidistantCache.points.length - 1));
            return this.equidistantCache.points[idx] || null;
          },
        },
      ]);

      return TextPathElement;
    })(TextElement);

    function _createSuper$d(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$d();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$d() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var dataUriRegex = /^\s*data:(([^/,;]+\/[^/,;]+)(?:;([^,;=]+=[^,;=]+))?)?(?:;(base64))?,(.*)$/i;

    var ImageElement = /*#__PURE__*/ (function (_RenderedElement) {
      _inherits__default['default'](ImageElement, _RenderedElement);

      var _super = _createSuper$d(ImageElement);

      function ImageElement(document, node, captureTextNodes) {
        var _this;

        _classCallCheck__default['default'](this, ImageElement);

        _this = _super.call(this, document, node, captureTextNodes);
        _this.type = 'image';
        _this.loaded = false;

        var href = _this.getHrefAttribute().getString();

        if (!href) {
          return _possibleConstructorReturn__default['default'](_this);
        }

        var isSvg = href.endsWith('.svg') || /^\s*data:image\/svg\+xml/i.test(href);
        document.images.push(_assertThisInitialized__default['default'](_this));

        if (!isSvg) {
          void _this.loadImage(href);
        } else {
          void _this.loadSvg(href);
        }

        _this.isSvg = isSvg;
        return _this;
      }

      _createClass__default['default'](ImageElement, [
        {
          key: 'loadImage',
          value: (function () {
            var _loadImage = _asyncToGenerator__default['default'](
              /*#__PURE__*/ _regeneratorRuntime__default['default'].mark(function _callee(href) {
                var image;
                return _regeneratorRuntime__default['default'].wrap(
                  function _callee$(_context) {
                    while (1) {
                      switch ((_context.prev = _context.next)) {
                        case 0:
                          _context.prev = 0;
                          _context.next = 3;
                          return this.document.createImage(href);

                        case 3:
                          image = _context.sent;
                          this.image = image;
                          _context.next = 10;
                          break;

                        case 7:
                          _context.prev = 7;
                          _context.t0 = _context['catch'](0);
                          console.error('Error while loading image "'.concat(href, '":'), _context.t0);

                        case 10:
                          this.loaded = true;

                        case 11:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  },
                  _callee,
                  this,
                  [[0, 7]],
                );
              }),
            );

            function loadImage(_x) {
              return _loadImage.apply(this, arguments);
            }

            return loadImage;
          })(),
        },
        {
          key: 'loadSvg',
          value: (function () {
            var _loadSvg = _asyncToGenerator__default['default'](
              /*#__PURE__*/ _regeneratorRuntime__default['default'].mark(function _callee2(href) {
                var match, data, response, svg;
                return _regeneratorRuntime__default['default'].wrap(
                  function _callee2$(_context2) {
                    while (1) {
                      switch ((_context2.prev = _context2.next)) {
                        case 0:
                          match = dataUriRegex.exec(href);

                          if (!match) {
                            _context2.next = 6;
                            break;
                          }

                          data = match[5];

                          if (match[4] === 'base64') {
                            this.image = atob(data);
                          } else {
                            this.image = decodeURIComponent(data);
                          }

                          _context2.next = 19;
                          break;

                        case 6:
                          _context2.prev = 6;
                          _context2.next = 9;
                          return this.document.fetch(href);

                        case 9:
                          response = _context2.sent;
                          _context2.next = 12;
                          return response.text();

                        case 12:
                          svg = _context2.sent;
                          this.image = svg;
                          _context2.next = 19;
                          break;

                        case 16:
                          _context2.prev = 16;
                          _context2.t0 = _context2['catch'](6);
                          console.error('Error while loading image "'.concat(href, '":'), _context2.t0);

                        case 19:
                          this.loaded = true;

                        case 20:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  },
                  _callee2,
                  this,
                  [[6, 16]],
                );
              }),
            );

            function loadSvg(_x2) {
              return _loadSvg.apply(this, arguments);
            }

            return loadSvg;
          })(),
        },
        {
          key: 'renderChildren',
          value: function renderChildren(ctx) {
            var document = this.document,
              image = this.image,
              loaded = this.loaded;
            var x = this.getAttribute('x').getPixels('x');
            var y = this.getAttribute('y').getPixels('y');
            var width = this.getStyle('width').getPixels('x');
            var height = this.getStyle('height').getPixels('y');

            if (!loaded || !image || !width || !height) {
              return;
            }

            ctx.save();
            ctx.translate(x, y);

            if (this.isSvg) {
              var subDocument = document.canvg.forkString(ctx, this.image, {
                ignoreMouse: true,
                ignoreAnimation: true,
                ignoreDimensions: true,
                ignoreClear: true,
                offsetX: 0,
                offsetY: 0,
                scaleWidth: width,
                scaleHeight: height,
              });
              subDocument.document.documentElement.parent = this;
              void subDocument.render();
            } else {
              var _image = this.image;
              document.setViewBox({
                ctx: ctx,
                aspectRatio: this.getAttribute('preserveAspectRatio').getString(),
                width: width,
                desiredWidth: _image.width,
                height: height,
                desiredHeight: _image.height,
              });

              if (this.loaded) {
                if (typeof _image.complete === 'undefined' || _image.complete) {
                  ctx.drawImage(_image, 0, 0);
                }
              }
            }

            ctx.restore();
          },
        },
        {
          key: 'getBoundingBox',
          value: function getBoundingBox() {
            var x = this.getAttribute('x').getPixels('x');
            var y = this.getAttribute('y').getPixels('y');
            var width = this.getStyle('width').getPixels('x');
            var height = this.getStyle('height').getPixels('y');
            return new BoundingBox(x, y, x + width, y + height);
          },
        },
      ]);

      return ImageElement;
    })(RenderedElement);

    function _createSuper$c(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$c();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$c() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var SymbolElement = /*#__PURE__*/ (function (_RenderedElement) {
      _inherits__default['default'](SymbolElement, _RenderedElement);

      var _super = _createSuper$c(SymbolElement);

      function SymbolElement() {
        var _this;

        _classCallCheck__default['default'](this, SymbolElement);

        _this = _super.apply(this, arguments);
        _this.type = 'symbol';
        return _this;
      }

      _createClass__default['default'](SymbolElement, [
        {
          key: 'render',
          value: function render(_) {
            // NO RENDER
          },
        },
      ]);

      return SymbolElement;
    })(RenderedElement);

    var SVGFontLoader = /*#__PURE__*/ (function () {
      function SVGFontLoader(document) {
        _classCallCheck__default['default'](this, SVGFontLoader);

        this.document = document;
        this.loaded = false;
        document.fonts.push(this);
      }

      _createClass__default['default'](SVGFontLoader, [
        {
          key: 'load',
          value: (function () {
            var _load = _asyncToGenerator__default['default'](
              /*#__PURE__*/ _regeneratorRuntime__default['default'].mark(function _callee(fontFamily, url) {
                var document, svgDocument, fonts;
                return _regeneratorRuntime__default['default'].wrap(
                  function _callee$(_context) {
                    while (1) {
                      switch ((_context.prev = _context.next)) {
                        case 0:
                          _context.prev = 0;
                          document = this.document;
                          _context.next = 4;
                          return document.canvg.parser.load(url);

                        case 4:
                          svgDocument = _context.sent;
                          fonts = svgDocument.getElementsByTagName('font');
                          Array.from(fonts).forEach(function (fontNode) {
                            var font = document.createElement(fontNode);
                            document.definitions[fontFamily] = font;
                          });
                          _context.next = 12;
                          break;

                        case 9:
                          _context.prev = 9;
                          _context.t0 = _context['catch'](0);
                          console.error('Error while loading font "'.concat(url, '":'), _context.t0);

                        case 12:
                          this.loaded = true;

                        case 13:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  },
                  _callee,
                  this,
                  [[0, 9]],
                );
              }),
            );

            function load(_x, _x2) {
              return _load.apply(this, arguments);
            }

            return load;
          })(),
        },
      ]);

      return SVGFontLoader;
    })();

    function _createSuper$b(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$b();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$b() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var StyleElement = /*#__PURE__*/ (function (_Element) {
      _inherits__default['default'](StyleElement, _Element);

      var _super = _createSuper$b(StyleElement);

      function StyleElement(document, node, captureTextNodes) {
        var _this;

        _classCallCheck__default['default'](this, StyleElement);

        _this = _super.call(this, document, node, captureTextNodes);
        _this.type = 'style';
        var css = compressSpaces(
          Array.from(node.childNodes) // NEED TEST
            .map(function (_) {
              return _.textContent;
            })
            .join('')
            .replace(/(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm, '') // remove comments
            .replace(/@import.*;/g, ''), // remove imports
        );
        var cssDefs = css.split('}');
        cssDefs.forEach(function (_) {
          var def = _.trim();

          if (!def) {
            return;
          }

          var cssParts = def.split('{');
          var cssClasses = cssParts[0].split(',');
          var cssProps = cssParts[1].split(';');
          cssClasses.forEach(function (_) {
            var cssClass = _.trim();

            if (!cssClass) {
              return;
            }

            var props = document.styles[cssClass] || {};
            cssProps.forEach(function (cssProp) {
              var prop = cssProp.indexOf(':');
              var name = cssProp.substr(0, prop).trim();
              var value = cssProp.substr(prop + 1, cssProp.length - prop).trim();

              if (name && value) {
                props[name] = new Property(document, name, value);
              }
            });
            document.styles[cssClass] = props;
            document.stylesSpecificity[cssClass] = getSelectorSpecificity(cssClass);

            if (cssClass === '@font-face') {
              //  && !nodeEnv
              var fontFamily = props['font-family'].getString().replace(/"|'/g, '');
              var srcs = props.src.getString().split(',');
              srcs.forEach(function (src) {
                if (src.indexOf('format("svg")') > 0) {
                  var url = parseExternalUrl(src);

                  if (url) {
                    void new SVGFontLoader(document).load(fontFamily, url);
                  }
                }
              });
            }
          });
        });
        return _this;
      }

      return StyleElement;
    })(Element);
    StyleElement.parseExternalUrl = parseExternalUrl;

    function _createSuper$a(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$a();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$a() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var UseElement = /*#__PURE__*/ (function (_RenderedElement) {
      _inherits__default['default'](UseElement, _RenderedElement);

      var _super = _createSuper$a(UseElement);

      function UseElement() {
        var _this;

        _classCallCheck__default['default'](this, UseElement);

        _this = _super.apply(this, arguments);
        _this.type = 'use';
        return _this;
      }

      _createClass__default['default'](UseElement, [
        {
          key: 'setContext',
          value: function setContext(ctx) {
            _get__default['default'](_getPrototypeOf__default['default'](UseElement.prototype), 'setContext', this).call(this, ctx);

            var xAttr = this.getAttribute('x');
            var yAttr = this.getAttribute('y');

            if (xAttr.hasValue()) {
              ctx.translate(xAttr.getPixels('x'), 0);
            }

            if (yAttr.hasValue()) {
              ctx.translate(0, yAttr.getPixels('y'));
            }
          },
        },
        {
          key: 'path',
          value: function path(ctx) {
            var element = this.element;

            if (element) {
              element.path(ctx);
            }
          },
        },
        {
          key: 'renderChildren',
          value: function renderChildren(ctx) {
            var document = this.document,
              element = this.element;

            if (element) {
              var tempSvg = element;

              if (element.type === 'symbol') {
                // render me using a temporary svg element in symbol cases (http://www.w3.org/TR/SVG/struct.html#UseElement)
                tempSvg = new SVGElement(document, null);
                tempSvg.attributes.viewBox = new Property(document, 'viewBox', element.getAttribute('viewBox').getString());
                tempSvg.attributes.preserveAspectRatio = new Property(document, 'preserveAspectRatio', element.getAttribute('preserveAspectRatio').getString());
                tempSvg.attributes.overflow = new Property(document, 'overflow', element.getAttribute('overflow').getString());
                tempSvg.children = element.children; // element is still the parent of the children

                element.styles.opacity = new Property(document, 'opacity', this.calculateOpacity());
              }

              if (tempSvg.type === 'svg') {
                var widthStyle = this.getStyle('width', false, true);
                var heightStyle = this.getStyle('height', false, true); // if symbol or svg, inherit width/height from me

                if (widthStyle.hasValue()) {
                  tempSvg.attributes.width = new Property(document, 'width', widthStyle.getString());
                }

                if (heightStyle.hasValue()) {
                  tempSvg.attributes.height = new Property(document, 'height', heightStyle.getString());
                }
              }

              var oldParent = tempSvg.parent;
              tempSvg.parent = this;
              tempSvg.render(ctx);
              tempSvg.parent = oldParent;
            }
          },
        },
        {
          key: 'getBoundingBox',
          value: function getBoundingBox(ctx) {
            var element = this.element;

            if (element) {
              return element.getBoundingBox(ctx);
            }

            return null;
          },
        },
        {
          key: 'elementTransform',
          value: function elementTransform() {
            var document = this.document,
              element = this.element;
            return Transform.fromElement(document, element);
          },
        },
        {
          key: 'element',
          get: function get() {
            if (!this.cachedElement) {
              this.cachedElement = this.getHrefAttribute().getDefinition();
            }

            return this.cachedElement;
          },
        },
      ]);

      return UseElement;
    })(RenderedElement);

    function _createSuper$9(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$9();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$9() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    function imGet(img, x, y, width, _height, rgba) {
      return img[y * width * 4 + x * 4 + rgba];
    }

    function imSet(img, x, y, width, _height, rgba, val) {
      img[y * width * 4 + x * 4 + rgba] = val;
    }

    function m(matrix, i, v) {
      var mi = matrix[i];
      return mi * v;
    }

    function c(a, m1, m2, m3) {
      return m1 + Math.cos(a) * m2 + Math.sin(a) * m3;
    }

    var FeColorMatrixElement = /*#__PURE__*/ (function (_Element) {
      _inherits__default['default'](FeColorMatrixElement, _Element);

      var _super = _createSuper$9(FeColorMatrixElement);

      function FeColorMatrixElement(document, node, captureTextNodes) {
        var _this;

        _classCallCheck__default['default'](this, FeColorMatrixElement);

        _this = _super.call(this, document, node, captureTextNodes);
        _this.type = 'feColorMatrix';
        var matrix = toNumbers(_this.getAttribute('values').getString());

        switch (_this.getAttribute('type').getString('matrix')) {
          // http://www.w3.org/TR/SVG/filters.html#feColorMatrixElement
          case 'saturate': {
            var s = matrix[0];
            /* eslint-disable array-element-newline */

            matrix = [
              0.213 + 0.787 * s,
              0.715 - 0.715 * s,
              0.072 - 0.072 * s,
              0,
              0,
              0.213 - 0.213 * s,
              0.715 + 0.285 * s,
              0.072 - 0.072 * s,
              0,
              0,
              0.213 - 0.213 * s,
              0.715 - 0.715 * s,
              0.072 + 0.928 * s,
              0,
              0,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              0,
              1,
            ];
            /* eslint-enable array-element-newline */

            break;
          }

          case 'hueRotate': {
            var a = (matrix[0] * Math.PI) / 180.0;
            /* eslint-disable array-element-newline */

            matrix = [
              c(a, 0.213, 0.787, -0.213),
              c(a, 0.715, -0.715, -0.715),
              c(a, 0.072, -0.072, 0.928),
              0,
              0,
              c(a, 0.213, -0.213, 0.143),
              c(a, 0.715, 0.285, 0.14),
              c(a, 0.072, -0.072, -0.283),
              0,
              0,
              c(a, 0.213, -0.213, -0.787),
              c(a, 0.715, -0.715, 0.715),
              c(a, 0.072, 0.928, 0.072),
              0,
              0,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              0,
              1,
            ];
            /* eslint-enable array-element-newline */

            break;
          }

          case 'luminanceToAlpha':
            /* eslint-disable array-element-newline */
            matrix = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2125, 0.7154, 0.0721, 0, 0, 0, 0, 0, 0, 1];
            /* eslint-enable array-element-newline */

            break;
        }

        _this.matrix = matrix;
        _this.includeOpacity = _this.getAttribute('includeOpacity').hasValue();
        return _this;
      }

      _createClass__default['default'](FeColorMatrixElement, [
        {
          key: 'apply',
          value: function apply(ctx, _x, _y, width, height) {
            // assuming x==0 && y==0 for now
            var includeOpacity = this.includeOpacity,
              matrix = this.matrix;
            var srcData = ctx.getImageData(0, 0, width, height);

            for (var y = 0; y < height; y++) {
              for (var x = 0; x < width; x++) {
                var r = imGet(srcData.data, x, y, width, height, 0);
                var g = imGet(srcData.data, x, y, width, height, 1);
                var b = imGet(srcData.data, x, y, width, height, 2);
                var a = imGet(srcData.data, x, y, width, height, 3);
                var nr = m(matrix, 0, r) + m(matrix, 1, g) + m(matrix, 2, b) + m(matrix, 3, a) + m(matrix, 4, 1);
                var ng = m(matrix, 5, r) + m(matrix, 6, g) + m(matrix, 7, b) + m(matrix, 8, a) + m(matrix, 9, 1);
                var nb = m(matrix, 10, r) + m(matrix, 11, g) + m(matrix, 12, b) + m(matrix, 13, a) + m(matrix, 14, 1);
                var na = m(matrix, 15, r) + m(matrix, 16, g) + m(matrix, 17, b) + m(matrix, 18, a) + m(matrix, 19, 1);

                if (includeOpacity) {
                  nr = 0;
                  ng = 0;
                  nb = 0;
                  na *= a / 255;
                }

                imSet(srcData.data, x, y, width, height, 0, nr);
                imSet(srcData.data, x, y, width, height, 1, ng);
                imSet(srcData.data, x, y, width, height, 2, nb);
                imSet(srcData.data, x, y, width, height, 3, na);
              }
            }

            ctx.clearRect(0, 0, width, height);
            ctx.putImageData(srcData, 0, 0);
          },
        },
      ]);

      return FeColorMatrixElement;
    })(Element);

    function _createSuper$8(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$8();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$8() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var MaskElement = /*#__PURE__*/ (function (_Element) {
      _inherits__default['default'](MaskElement, _Element);

      var _super = _createSuper$8(MaskElement);

      function MaskElement() {
        var _this;

        _classCallCheck__default['default'](this, MaskElement);

        _this = _super.apply(this, arguments);
        _this.type = 'mask';
        return _this;
      }

      _createClass__default['default'](MaskElement, [
        {
          key: 'apply',
          value: function apply(ctx, element) {
            var document = this.document; // render as temp svg

            var x = this.getAttribute('x').getPixels('x');
            var y = this.getAttribute('y').getPixels('y');
            var width = this.getStyle('width').getPixels('x');
            var height = this.getStyle('height').getPixels('y');

            if (!width && !height) {
              var boundingBox = new BoundingBox();
              this.children.forEach(function (child) {
                boundingBox.addBoundingBox(child.getBoundingBox(ctx));
              });
              x = Math.floor(boundingBox.x1);
              y = Math.floor(boundingBox.y1);
              width = Math.floor(boundingBox.width);
              height = Math.floor(boundingBox.height);
            }

            var ignoredStyles = this.removeStyles(element, MaskElement.ignoreStyles);
            var maskCanvas = document.createCanvas(x + width, y + height);
            var maskCtx = maskCanvas.getContext('2d');
            document.screen.setDefaults(maskCtx);
            this.renderChildren(maskCtx); // convert mask to alpha with a fake node
            // TODO: refactor out apply from feColorMatrix

            new FeColorMatrixElement(document, {
              nodeType: 1,
              childNodes: [],
              attributes: [
                {
                  nodeName: 'type',
                  value: 'luminanceToAlpha',
                },
                {
                  nodeName: 'includeOpacity',
                  value: 'true',
                },
              ],
            }).apply(maskCtx, 0, 0, x + width, y + height);
            var tmpCanvas = document.createCanvas(x + width, y + height);
            var tmpCtx = tmpCanvas.getContext('2d');
            document.screen.setDefaults(tmpCtx);
            element.render(tmpCtx);
            tmpCtx.globalCompositeOperation = 'destination-in';
            tmpCtx.fillStyle = maskCtx.createPattern(maskCanvas, 'no-repeat');
            tmpCtx.fillRect(0, 0, x + width, y + height);
            ctx.fillStyle = tmpCtx.createPattern(tmpCanvas, 'no-repeat');
            ctx.fillRect(0, 0, x + width, y + height); // reassign mask

            this.restoreStyles(element, ignoredStyles);
          },
        },
        {
          key: 'render',
          value: function render(_) {
            // NO RENDER
          },
        },
      ]);

      return MaskElement;
    })(Element);
    MaskElement.ignoreStyles = ['mask', 'transform', 'clip-path'];

    function _createSuper$7(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$7();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$7() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var noop = function noop() {
      // NOOP
    };

    var ClipPathElement = /*#__PURE__*/ (function (_Element) {
      _inherits__default['default'](ClipPathElement, _Element);

      var _super = _createSuper$7(ClipPathElement);

      function ClipPathElement() {
        var _this;

        _classCallCheck__default['default'](this, ClipPathElement);

        _this = _super.apply(this, arguments);
        _this.type = 'clipPath';
        return _this;
      }

      _createClass__default['default'](ClipPathElement, [
        {
          key: 'apply',
          value: function apply(ctx) {
            var document = this.document;
            var contextProto = Reflect.getPrototypeOf(ctx);
            var beginPath = ctx.beginPath,
              closePath = ctx.closePath;

            if (contextProto) {
              contextProto.beginPath = noop;
              contextProto.closePath = noop;
            }

            Reflect.apply(beginPath, ctx, []);
            this.children.forEach(function (child) {
              if (typeof child.path === 'undefined') {
                return;
              }

              var transform = typeof child.elementTransform !== 'undefined' ? child.elementTransform() : null; // handle <use />

              if (!transform) {
                transform = Transform.fromElement(document, child);
              }

              if (transform) {
                transform.apply(ctx);
              }

              child.path(ctx);

              if (contextProto) {
                contextProto.closePath = closePath;
              }

              if (transform) {
                transform.unapply(ctx);
              }
            });
            Reflect.apply(closePath, ctx, []);
            ctx.clip();

            if (contextProto) {
              contextProto.beginPath = beginPath;
              contextProto.closePath = closePath;
            }
          },
        },
        {
          key: 'render',
          value: function render(_) {
            // NO RENDER
          },
        },
      ]);

      return ClipPathElement;
    })(Element);

    function _createSuper$6(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$6();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$6() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var FilterElement = /*#__PURE__*/ (function (_Element) {
      _inherits__default['default'](FilterElement, _Element);

      var _super = _createSuper$6(FilterElement);

      function FilterElement() {
        var _this;

        _classCallCheck__default['default'](this, FilterElement);

        _this = _super.apply(this, arguments);
        _this.type = 'filter';
        return _this;
      }

      _createClass__default['default'](FilterElement, [
        {
          key: 'apply',
          value: function apply(ctx, element) {
            // render as temp svg
            var document = this.document,
              children = this.children;
            var boundingBox = element.getBoundingBox(ctx);

            if (!boundingBox) {
              return;
            }

            var px = 0;
            var py = 0;
            children.forEach(function (child) {
              var efd = child.extraFilterDistance || 0;
              px = Math.max(px, efd);
              py = Math.max(py, efd);
            });
            var width = Math.floor(boundingBox.width);
            var height = Math.floor(boundingBox.height);
            var tmpCanvasWidth = width + 2 * px;
            var tmpCanvasHeight = height + 2 * py;

            if (tmpCanvasWidth < 1 || tmpCanvasHeight < 1) {
              return;
            }

            var x = Math.floor(boundingBox.x);
            var y = Math.floor(boundingBox.y);
            var ignoredStyles = this.removeStyles(element, FilterElement.ignoreStyles);
            var tmpCanvas = document.createCanvas(tmpCanvasWidth, tmpCanvasHeight);
            var tmpCtx = tmpCanvas.getContext('2d');
            document.screen.setDefaults(tmpCtx);
            tmpCtx.translate(-x + px, -y + py);
            element.render(tmpCtx); // apply filters

            children.forEach(function (child) {
              if (typeof child.apply === 'function') {
                child.apply(tmpCtx, 0, 0, tmpCanvasWidth, tmpCanvasHeight);
              }
            }); // render on me

            ctx.drawImage(tmpCanvas, 0, 0, tmpCanvasWidth, tmpCanvasHeight, x - px, y - py, tmpCanvasWidth, tmpCanvasHeight);
            this.restoreStyles(element, ignoredStyles);
          },
        },
        {
          key: 'render',
          value: function render(_) {
            // NO RENDER
          },
        },
      ]);

      return FilterElement;
    })(Element);
    FilterElement.ignoreStyles = ['filter', 'transform', 'clip-path'];

    function _createSuper$5(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$5();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$5() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var FeDropShadowElement = /*#__PURE__*/ (function (_Element) {
      _inherits__default['default'](FeDropShadowElement, _Element);

      var _super = _createSuper$5(FeDropShadowElement);

      function FeDropShadowElement(document, node, captureTextNodes) {
        var _this;

        _classCallCheck__default['default'](this, FeDropShadowElement);

        _this = _super.call(this, document, node, captureTextNodes);
        _this.type = 'feDropShadow';

        _this.addStylesFromStyleDefinition();

        return _this;
      }

      _createClass__default['default'](FeDropShadowElement, [
        {
          key: 'apply',
          value: function apply(_, _x, _y, _width, _height) {
            // TODO: implement
          },
        },
      ]);

      return FeDropShadowElement;
    })(Element);

    function _createSuper$4(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$4();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$4() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var FeMorphologyElement = /*#__PURE__*/ (function (_Element) {
      _inherits__default['default'](FeMorphologyElement, _Element);

      var _super = _createSuper$4(FeMorphologyElement);

      function FeMorphologyElement() {
        var _this;

        _classCallCheck__default['default'](this, FeMorphologyElement);

        _this = _super.apply(this, arguments);
        _this.type = 'feMorphology';
        return _this;
      }

      _createClass__default['default'](FeMorphologyElement, [
        {
          key: 'apply',
          value: function apply(_, _x, _y, _width, _height) {
            // TODO: implement
          },
        },
      ]);

      return FeMorphologyElement;
    })(Element);

    function _createSuper$3(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$3();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$3() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var FeCompositeElement = /*#__PURE__*/ (function (_Element) {
      _inherits__default['default'](FeCompositeElement, _Element);

      var _super = _createSuper$3(FeCompositeElement);

      function FeCompositeElement() {
        var _this;

        _classCallCheck__default['default'](this, FeCompositeElement);

        _this = _super.apply(this, arguments);
        _this.type = 'feComposite';
        return _this;
      }

      _createClass__default['default'](FeCompositeElement, [
        {
          key: 'apply',
          value: function apply(_, _x, _y, _width, _height) {
            // TODO: implement
          },
        },
      ]);

      return FeCompositeElement;
    })(Element);

    function _createSuper$2(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$2();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$2() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var FeGaussianBlurElement = /*#__PURE__*/ (function (_Element) {
      _inherits__default['default'](FeGaussianBlurElement, _Element);

      var _super = _createSuper$2(FeGaussianBlurElement);

      function FeGaussianBlurElement(document, node, captureTextNodes) {
        var _this;

        _classCallCheck__default['default'](this, FeGaussianBlurElement);

        _this = _super.call(this, document, node, captureTextNodes);
        _this.type = 'feGaussianBlur';
        _this.blurRadius = Math.floor(_this.getAttribute('stdDeviation').getNumber());
        _this.extraFilterDistance = _this.blurRadius;
        return _this;
      }

      _createClass__default['default'](FeGaussianBlurElement, [
        {
          key: 'apply',
          value: function apply(ctx, x, y, width, height) {
            var document = this.document,
              blurRadius = this.blurRadius;
            var body = document.window ? document.window.document.body : null;
            var canvas = ctx.canvas; // StackBlur requires canvas be on document

            canvas.id = document.getUniqueId();

            if (body) {
              canvas.style.display = 'none';
              body.appendChild(canvas);
            }

            stackblurCanvas.canvasRGBA(canvas, x, y, width, height, blurRadius);

            if (body) {
              body.removeChild(canvas);
            }
          },
        },
      ]);

      return FeGaussianBlurElement;
    })(Element);

    function _createSuper$1(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct$1();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct$1() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var TitleElement = /*#__PURE__*/ (function (_Element) {
      _inherits__default['default'](TitleElement, _Element);

      var _super = _createSuper$1(TitleElement);

      function TitleElement() {
        var _this;

        _classCallCheck__default['default'](this, TitleElement);

        _this = _super.apply(this, arguments);
        _this.type = 'title';
        return _this;
      }

      return TitleElement;
    })(Element);

    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf__default['default'](Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf__default['default'](this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn__default['default'](this, result);
      };
    }

    function _isNativeReflectConstruct() {
      if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === 'function') return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    var DescElement = /*#__PURE__*/ (function (_Element) {
      _inherits__default['default'](DescElement, _Element);

      var _super = _createSuper(DescElement);

      function DescElement() {
        var _this;

        _classCallCheck__default['default'](this, DescElement);

        _this = _super.apply(this, arguments);
        _this.type = 'desc';
        return _this;
      }

      return DescElement;
    })(Element);

    var elements = {
      'svg': SVGElement,
      'rect': RectElement,
      'circle': CircleElement,
      'ellipse': EllipseElement,
      'line': LineElement,
      'polyline': PolylineElement,
      'polygon': PolygonElement,
      'path': PathElement,
      'pattern': PatternElement,
      'marker': MarkerElement,
      'defs': DefsElement,
      'linearGradient': LinearGradientElement,
      'radialGradient': RadialGradientElement,
      'stop': StopElement,
      'animate': AnimateElement,
      'animateColor': AnimateColorElement,
      'animateTransform': AnimateTransformElement,
      'font': FontElement,
      'font-face': FontFaceElement,
      'missing-glyph': MissingGlyphElement,
      'glyph': GlyphElement,
      'text': TextElement,
      'tspan': TSpanElement,
      'tref': TRefElement,
      'a': AElement,
      'textPath': TextPathElement,
      'image': ImageElement,
      'g': GElement,
      'symbol': SymbolElement,
      'style': StyleElement,
      'use': UseElement,
      'mask': MaskElement,
      'clipPath': ClipPathElement,
      'filter': FilterElement,
      'feDropShadow': FeDropShadowElement,
      'feMorphology': FeMorphologyElement,
      'feComposite': FeCompositeElement,
      'feColorMatrix': FeColorMatrixElement,
      'feGaussianBlur': FeGaussianBlurElement,
      'title': TitleElement,
      'desc': DescElement,
    };

    function ownKeys$1(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
          symbols = symbols.filter(function (sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        }
        keys.push.apply(keys, symbols);
      }
      return keys;
    }

    function _objectSpread$1(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys$1(Object(source), true).forEach(function (key) {
            _defineProperty__default['default'](target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys$1(Object(source)).forEach(function (key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }

    function createCanvas(width, height) {
      var canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      return canvas;
    }

    function createImage(_x) {
      return _createImage.apply(this, arguments);
    }

    function _createImage() {
      _createImage = _asyncToGenerator__default['default'](
        /*#__PURE__*/ _regeneratorRuntime__default['default'].mark(function _callee(src) {
          var anonymousCrossOrigin,
            image,
            _args = arguments;
          return _regeneratorRuntime__default['default'].wrap(function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  anonymousCrossOrigin = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
                  image = document.createElement('img');

                  if (anonymousCrossOrigin) {
                    image.crossOrigin = 'Anonymous';
                  }

                  return _context.abrupt(
                    'return',
                    new Promise(function (resolve, reject) {
                      image.onload = function () {
                        resolve(image);
                      };

                      image.onerror = function (_event, _source, _lineno, _colno, error) {
                        reject(error);
                      };

                      image.src = src;
                    }),
                  );

                case 4:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee);
        }),
      );
      return _createImage.apply(this, arguments);
    }

    var Document = /*#__PURE__*/ (function () {
      function Document(canvg) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$rootEmSize = _ref.rootEmSize,
          rootEmSize = _ref$rootEmSize === void 0 ? 12 : _ref$rootEmSize,
          _ref$emSize = _ref.emSize,
          emSize = _ref$emSize === void 0 ? 12 : _ref$emSize,
          _ref$createCanvas = _ref.createCanvas,
          createCanvas = _ref$createCanvas === void 0 ? Document.createCanvas : _ref$createCanvas,
          _ref$createImage = _ref.createImage,
          createImage = _ref$createImage === void 0 ? Document.createImage : _ref$createImage,
          anonymousCrossOrigin = _ref.anonymousCrossOrigin;

        _classCallCheck__default['default'](this, Document);

        this.canvg = canvg;
        this.definitions = Object.create(null);
        this.styles = Object.create(null);
        this.stylesSpecificity = Object.create(null);
        this.images = [];
        this.fonts = [];
        this.emSizeStack = [];
        this.uniqueId = 0;
        this.screen = canvg.screen;
        this.rootEmSize = rootEmSize;
        this.emSize = emSize;
        this.createCanvas = createCanvas;
        this.createImage = this.bindCreateImage(createImage, anonymousCrossOrigin);
        this.screen.wait(this.isImagesLoaded.bind(this));
        this.screen.wait(this.isFontsLoaded.bind(this));
      }

      _createClass__default['default'](Document, [
        {
          key: 'bindCreateImage',
          value: function bindCreateImage(createImage, anonymousCrossOrigin) {
            if (typeof anonymousCrossOrigin === 'boolean') {
              return function (source, forceAnonymousCrossOrigin) {
                return createImage(source, typeof forceAnonymousCrossOrigin === 'boolean' ? forceAnonymousCrossOrigin : anonymousCrossOrigin);
              };
            }

            return createImage;
          },
        },
        {
          key: 'popEmSize',
          value: function popEmSize() {
            var emSizeStack = this.emSizeStack;
            emSizeStack.pop();
          },
        },
        {
          key: 'getUniqueId',
          value: function getUniqueId() {
            return 'canvg'.concat(++this.uniqueId);
          },
        },
        {
          key: 'isImagesLoaded',
          value: function isImagesLoaded() {
            return this.images.every(function (_) {
              return _.loaded;
            });
          },
        },
        {
          key: 'isFontsLoaded',
          value: function isFontsLoaded() {
            return this.fonts.every(function (_) {
              return _.loaded;
            });
          },
        },
        {
          key: 'createDocumentElement',
          value: function createDocumentElement(document) {
            var documentElement = this.createElement(document.documentElement);
            documentElement.root = true;
            documentElement.addStylesFromStyleDefinition();
            this.documentElement = documentElement;
            return documentElement;
          },
        },
        {
          key: 'createElement',
          value: function createElement(node) {
            var elementType = node.nodeName.replace(/^[^:]+:/, '');
            var ElementType = Document.elementTypes[elementType];

            if (typeof ElementType !== 'undefined') {
              return new ElementType(this, node);
            }

            return new UnknownElement(this, node);
          },
        },
        {
          key: 'createTextNode',
          value: function createTextNode(node) {
            return new TextNode(this, node);
          },
        },
        {
          key: 'setViewBox',
          value: function setViewBox(config) {
            this.screen.setViewBox(
              _objectSpread$1(
                {
                  document: this,
                },
                config,
              ),
            );
          },
        },
        {
          key: 'window',
          get: function get() {
            return this.screen.window;
          },
        },
        {
          key: 'fetch',
          get: function get() {
            return this.screen.fetch;
          },
        },
        {
          key: 'ctx',
          get: function get() {
            return this.screen.ctx;
          },
        },
        {
          key: 'emSize',
          get: function get() {
            var emSizeStack = this.emSizeStack;
            return emSizeStack[emSizeStack.length - 1];
          },
          set: function set(value) {
            var emSizeStack = this.emSizeStack;
            emSizeStack.push(value);
          },
        },
      ]);

      return Document;
    })();
    Document.createCanvas = createCanvas;
    Document.createImage = createImage;
    Document.elementTypes = elements;

    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
          symbols = symbols.filter(function (sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        }
        keys.push.apply(keys, symbols);
      }
      return keys;
    }

    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function (key) {
            _defineProperty__default['default'](target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    /**
     * SVG renderer on canvas.
     */

    var Canvg = /*#__PURE__*/ (function () {
      /**
       * Main constructor.
       * @param ctx - Rendering context.
       * @param svg - SVG Document.
       * @param options - Rendering options.
       */
      function Canvg(ctx, svg) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        _classCallCheck__default['default'](this, Canvg);

        this.parser = new Parser(options);
        this.screen = new Screen(ctx, options);
        this.options = options;
        var document = new Document(this, options);
        var documentElement = document.createDocumentElement(svg);
        this.document = document;
        this.documentElement = documentElement;
      }
      /**
       * Create Canvg instance from SVG source string or URL.
       * @param ctx - Rendering context.
       * @param svg - SVG source string or URL.
       * @param options - Rendering options.
       * @returns Canvg instance.
       */

      _createClass__default['default'](
        Canvg,
        [
          {
            key: 'fork',

            /**
             * Create new Canvg instance with inherited options.
             * @param ctx - Rendering context.
             * @param svg - SVG source string or URL.
             * @param options - Rendering options.
             * @returns Canvg instance.
             */
            value: function fork(ctx, svg) {
              var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
              return Canvg.from(ctx, svg, _objectSpread(_objectSpread({}, this.options), options));
            },
            /**
             * Create new Canvg instance with inherited options.
             * @param ctx - Rendering context.
             * @param svg - SVG source string.
             * @param options - Rendering options.
             * @returns Canvg instance.
             */
          },
          {
            key: 'forkString',
            value: function forkString(ctx, svg) {
              var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
              return Canvg.fromString(ctx, svg, _objectSpread(_objectSpread({}, this.options), options));
            },
            /**
             * Document is ready promise.
             * @returns Ready promise.
             */
          },
          {
            key: 'ready',
            value: function ready() {
              return this.screen.ready();
            },
            /**
             * Document is ready value.
             * @returns Is ready or not.
             */
          },
          {
            key: 'isReady',
            value: function isReady() {
              return this.screen.isReady();
            },
            /**
             * Render only first frame, ignoring animations and mouse.
             * @param options - Rendering options.
             */
          },
          {
            key: 'render',
            value: (function () {
              var _render = _asyncToGenerator__default['default'](
                /*#__PURE__*/ _regeneratorRuntime__default['default'].mark(function _callee() {
                  var options,
                    _args = arguments;
                  return _regeneratorRuntime__default['default'].wrap(
                    function _callee$(_context) {
                      while (1) {
                        switch ((_context.prev = _context.next)) {
                          case 0:
                            options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                            this.start(
                              _objectSpread(
                                {
                                  enableRedraw: true,
                                  ignoreAnimation: true,
                                  ignoreMouse: true,
                                },
                                options,
                              ),
                            );
                            _context.next = 4;
                            return this.ready();

                          case 4:
                            this.stop();

                          case 5:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    },
                    _callee,
                    this,
                  );
                }),
              );

              function render() {
                return _render.apply(this, arguments);
              }

              return render;
            })(),
            /**
             * Start rendering.
             * @param options - Render options.
             */
          },
          {
            key: 'start',
            value: function start() {
              var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
              var documentElement = this.documentElement,
                screen = this.screen,
                baseOptions = this.options;
              screen.start(
                documentElement,
                _objectSpread(
                  _objectSpread(
                    {
                      enableRedraw: true,
                    },
                    baseOptions,
                  ),
                  options,
                ),
              );
            },
            /**
             * Stop rendering.
             */
          },
          {
            key: 'stop',
            value: function stop() {
              this.screen.stop();
            },
            /**
             * Resize SVG to fit in given size.
             * @param width
             * @param height
             * @param preserveAspectRatio
             */
          },
          {
            key: 'resize',
            value: function resize(width) {
              var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : width;
              var preserveAspectRatio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
              this.documentElement.resize(width, height, preserveAspectRatio);
            },
          },
        ],
        [
          {
            key: 'from',
            value: (function () {
              var _from = _asyncToGenerator__default['default'](
                /*#__PURE__*/ _regeneratorRuntime__default['default'].mark(function _callee2(ctx, svg) {
                  var options,
                    parser,
                    svgDocument,
                    _args2 = arguments;
                  return _regeneratorRuntime__default['default'].wrap(function _callee2$(_context2) {
                    while (1) {
                      switch ((_context2.prev = _context2.next)) {
                        case 0:
                          options = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
                          parser = new Parser(options);
                          _context2.next = 4;
                          return parser.parse(svg);

                        case 4:
                          svgDocument = _context2.sent;
                          return _context2.abrupt('return', new Canvg(ctx, svgDocument, options));

                        case 6:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }),
              );

              function from(_x, _x2) {
                return _from.apply(this, arguments);
              }

              return from;
            })(),
            /**
             * Create Canvg instance from SVG source string.
             * @param ctx - Rendering context.
             * @param svg - SVG source string.
             * @param options - Rendering options.
             * @returns Canvg instance.
             */
          },
          {
            key: 'fromString',
            value: function fromString(ctx, svg) {
              var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
              var parser = new Parser(options);
              var svgDocument = parser.parseFromString(svg);
              return new Canvg(ctx, svgDocument, options);
            },
          },
        ],
      );

      return Canvg;
    })();

    exports.AElement = AElement;
    exports.AnimateColorElement = AnimateColorElement;
    exports.AnimateElement = AnimateElement;
    exports.AnimateTransformElement = AnimateTransformElement;
    exports.BoundingBox = BoundingBox;
    exports.CB1 = CB1;
    exports.CB2 = CB2;
    exports.CB3 = CB3;
    exports.CB4 = CB4;
    exports.Canvg = Canvg;
    exports.CircleElement = CircleElement;
    exports.ClipPathElement = ClipPathElement;
    exports.DefsElement = DefsElement;
    exports.DescElement = DescElement;
    exports.Document = Document;
    exports.Element = Element;
    exports.EllipseElement = EllipseElement;
    exports.FeColorMatrixElement = FeColorMatrixElement;
    exports.FeCompositeElement = FeCompositeElement;
    exports.FeDropShadowElement = FeDropShadowElement;
    exports.FeGaussianBlurElement = FeGaussianBlurElement;
    exports.FeMorphologyElement = FeMorphologyElement;
    exports.FilterElement = FilterElement;
    exports.Font = Font;
    exports.FontElement = FontElement;
    exports.FontFaceElement = FontFaceElement;
    exports.GElement = GElement;
    exports.GlyphElement = GlyphElement;
    exports.GradientElement = GradientElement;
    exports.ImageElement = ImageElement;
    exports.LineElement = LineElement;
    exports.LinearGradientElement = LinearGradientElement;
    exports.MarkerElement = MarkerElement;
    exports.MaskElement = MaskElement;
    exports.Matrix = Matrix;
    exports.MissingGlyphElement = MissingGlyphElement;
    exports.Mouse = Mouse;
    exports.PSEUDO_ZERO = PSEUDO_ZERO;
    exports.Parser = Parser;
    exports.PathElement = PathElement;
    exports.PathParser = PathParser;
    exports.PatternElement = PatternElement;
    exports.Point = Point;
    exports.PolygonElement = PolygonElement;
    exports.PolylineElement = PolylineElement;
    exports.Property = Property;
    exports.QB1 = QB1;
    exports.QB2 = QB2;
    exports.QB3 = QB3;
    exports.RadialGradientElement = RadialGradientElement;
    exports.RectElement = RectElement;
    exports.RenderedElement = RenderedElement;
    exports.Rotate = Rotate;
    exports.SVGElement = SVGElement;
    exports.SVGFontLoader = SVGFontLoader;
    exports.Scale = Scale;
    exports.Screen = Screen;
    exports.Skew = Skew;
    exports.SkewX = SkewX;
    exports.SkewY = SkewY;
    exports.StopElement = StopElement;
    exports.StyleElement = StyleElement;
    exports.SymbolElement = SymbolElement;
    exports.TRefElement = TRefElement;
    exports.TSpanElement = TSpanElement;
    exports.TextElement = TextElement;
    exports.TextPathElement = TextPathElement;
    exports.TitleElement = TitleElement;
    exports.Transform = Transform;
    exports.Translate = Translate;
    exports.UnknownElement = UnknownElement;
    exports.UseElement = UseElement;
    exports.ViewPort = ViewPort;
    exports.compressSpaces = compressSpaces;
    exports['default'] = Canvg;
    exports.getSelectorSpecificity = getSelectorSpecificity;
    exports.normalizeAttributeName = normalizeAttributeName;
    exports.normalizeColor = normalizeColor;
    exports.parseExternalUrl = parseExternalUrl;
    exports.presets = index;
    exports.toNumbers = toNumbers;
    exports.trimLeft = trimLeft;
    exports.trimRight = trimRight;
    exports.vectorMagnitude = vectorMagnitude;
    exports.vectorsAngle = vectorsAngle;
    exports.vectorsRatio = vectorsRatio;
  })(lib);
  return lib;
}

var libExports = /*@__PURE__*/ requireLib();
var index = /*@__PURE__*/ getDefaultExportFromCjs(libExports);

var index$1 = /*#__PURE__*/ _mergeNamespaces(
  {
    __proto__: null,
    default: index,
  },
  [libExports],
);

export { index$1 as i };
//# sourceMappingURL=p-COzutvIh.js.map

//# sourceMappingURL=p-COzutvIh.js.map
