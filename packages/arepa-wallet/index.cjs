'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var nearAPI = require('near-api-js');
var walletUtils = require('@near-wallet-selector/wallet-utils');

function _interopNamespace(e) {
	if (e && e.__esModule) return e;
	var n = Object.create(null);
	if (e) {
		Object.keys(e).forEach(function (k) {
			if (k !== 'default') {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		});
	}
	n["default"] = e;
	return Object.freeze(n);
}

var nearAPI__namespace = /*#__PURE__*/_interopNamespace(nearAPI);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$n =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var objectGetOwnPropertyDescriptor = {};

var fails$k = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$j = fails$k;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$j(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});

var fails$i = fails$k;

var functionBindNative = !fails$i(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

var NATIVE_BIND$3 = functionBindNative;

var call$k = Function.prototype.call;

var functionCall = NATIVE_BIND$3 ? call$k.bind(call$k) : function () {
  return call$k.apply(call$k, arguments);
};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$2(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

var createPropertyDescriptor$5 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var NATIVE_BIND$2 = functionBindNative;

var FunctionPrototype$2 = Function.prototype;
var call$j = FunctionPrototype$2.call;
var uncurryThisWithBind = NATIVE_BIND$2 && FunctionPrototype$2.bind.bind(call$j, call$j);

var functionUncurryThis = NATIVE_BIND$2 ? uncurryThisWithBind : function (fn) {
  return function () {
    return call$j.apply(fn, arguments);
  };
};

var uncurryThis$l = functionUncurryThis;

var toString$6 = uncurryThis$l({}.toString);
var stringSlice$7 = uncurryThis$l(''.slice);

var classofRaw$2 = function (it) {
  return stringSlice$7(toString$6(it), 8, -1);
};

var uncurryThis$k = functionUncurryThis;
var fails$h = fails$k;
var classof$7 = classofRaw$2;

var $Object$4 = Object;
var split$3 = uncurryThis$k(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$h(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object$4('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$7(it) === 'String' ? split$3(it, '') : $Object$4(it);
} : $Object$4;

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
var isNullOrUndefined$5 = function (it) {
  return it === null || it === undefined;
};

var isNullOrUndefined$4 = isNullOrUndefined$5;

var $TypeError$d = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$5 = function (it) {
  if (isNullOrUndefined$4(it)) throw new $TypeError$d("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject$1 = indexedObject;
var requireObjectCoercible$4 = requireObjectCoercible$5;

var toIndexedObject$5 = function (it) {
  return IndexedObject$1(requireObjectCoercible$4(it));
};

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var isCallable$m = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};

var isCallable$l = isCallable$m;

var isObject$b = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$l(it);
};

var global$m = global$n;
var isCallable$k = isCallable$m;

var aFunction = function (argument) {
  return isCallable$k(argument) ? argument : undefined;
};

var getBuiltIn$7 = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$m[namespace]) : global$m[namespace] && global$m[namespace][method];
};

var uncurryThis$j = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$j({}.isPrototypeOf);

var engineUserAgent = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

var global$l = global$n;
var userAgent$3 = engineUserAgent;

var process$3 = global$l.process;
var Deno$1 = global$l.Deno;
var versions = process$3 && process$3.versions || Deno$1 && Deno$1.version;
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
if (!version && userAgent$3) {
  match = userAgent$3.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent$3.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var engineV8Version = version;

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION$1 = engineV8Version;
var fails$g = fails$k;
var global$k = global$n;

var $String$5 = global$k.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$g(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String$5(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
});

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL$1 = symbolConstructorDetection;

var useSymbolAsUid = NATIVE_SYMBOL$1
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var getBuiltIn$6 = getBuiltIn$7;
var isCallable$j = isCallable$m;
var isPrototypeOf$3 = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var $Object$3 = Object;

var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$6('Symbol');
  return isCallable$j($Symbol) && isPrototypeOf$3($Symbol.prototype, $Object$3(it));
};

var $String$4 = String;

var tryToString$4 = function (argument) {
  try {
    return $String$4(argument);
  } catch (error) {
    return 'Object';
  }
};

var isCallable$i = isCallable$m;
var tryToString$3 = tryToString$4;

var $TypeError$c = TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$8 = function (argument) {
  if (isCallable$i(argument)) return argument;
  throw new $TypeError$c(tryToString$3(argument) + ' is not a function');
};

var aCallable$7 = aCallable$8;
var isNullOrUndefined$3 = isNullOrUndefined$5;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$4 = function (V, P) {
  var func = V[P];
  return isNullOrUndefined$3(func) ? undefined : aCallable$7(func);
};

var call$i = functionCall;
var isCallable$h = isCallable$m;
var isObject$a = isObject$b;

var $TypeError$b = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$h(fn = input.toString) && !isObject$a(val = call$i(fn, input))) return val;
  if (isCallable$h(fn = input.valueOf) && !isObject$a(val = call$i(fn, input))) return val;
  if (pref !== 'string' && isCallable$h(fn = input.toString) && !isObject$a(val = call$i(fn, input))) return val;
  throw new $TypeError$b("Can't convert object to primitive value");
};

var sharedStore = {exports: {}};

var isPure = false;

var global$j = global$n;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$6 = Object.defineProperty;

var defineGlobalProperty$3 = function (key, value) {
  try {
    defineProperty$6(global$j, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global$j[key] = value;
  } return value;
};

var globalThis$1 = global$n;
var defineGlobalProperty$2 = defineGlobalProperty$3;

var SHARED = '__core-js_shared__';
var store$3 = sharedStore.exports = globalThis$1[SHARED] || defineGlobalProperty$2(SHARED, {});

(store$3.versions || (store$3.versions = [])).push({
  version: '3.37.0',
  mode: 'global',
  copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.37.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

var store$2 = sharedStore.exports;

var shared$4 = function (key, value) {
  return store$2[key] || (store$2[key] = value || {});
};

var requireObjectCoercible$3 = requireObjectCoercible$5;

var $Object$2 = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$5 = function (argument) {
  return $Object$2(requireObjectCoercible$3(argument));
};

var uncurryThis$i = functionUncurryThis;
var toObject$4 = toObject$5;

var hasOwnProperty = uncurryThis$i({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$4(it), key);
};

var uncurryThis$h = functionUncurryThis;

var id = 0;
var postfix = Math.random();
var toString$5 = uncurryThis$h(1.0.toString);

var uid$2 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$5(++id + postfix, 36);
};

var global$i = global$n;
var shared$3 = shared$4;
var hasOwn$c = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = symbolConstructorDetection;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var Symbol$1 = global$i.Symbol;
var WellKnownSymbolsStore = shared$3('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1['for'] || Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

var wellKnownSymbol$i = function (name) {
  if (!hasOwn$c(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$c(Symbol$1, name)
      ? Symbol$1[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

var call$h = functionCall;
var isObject$9 = isObject$b;
var isSymbol$1 = isSymbol$2;
var getMethod$3 = getMethod$4;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$h = wellKnownSymbol$i;

var $TypeError$a = TypeError;
var TO_PRIMITIVE = wellKnownSymbol$h('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject$9(input) || isSymbol$1(input)) return input;
  var exoticToPrim = getMethod$3(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$h(exoticToPrim, input, pref);
    if (!isObject$9(result) || isSymbol$1(result)) return result;
    throw new $TypeError$a("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol = isSymbol$2;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$2 = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

var global$h = global$n;
var isObject$8 = isObject$b;

var document$3 = global$h.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$8(document$3) && isObject$8(document$3.createElement);

var documentCreateElement$2 = function (it) {
  return EXISTS$1 ? document$3.createElement(it) : {};
};

var DESCRIPTORS$f = descriptors;
var fails$f = fails$k;
var createElement$1 = documentCreateElement$2;

// Thanks to IE8 for its funny defineProperty
var ie8DomDefine = !DESCRIPTORS$f && !fails$f(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement$1('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});

var DESCRIPTORS$e = descriptors;
var call$g = functionCall;
var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
var createPropertyDescriptor$4 = createPropertyDescriptor$5;
var toIndexedObject$4 = toIndexedObject$5;
var toPropertyKey$1 = toPropertyKey$2;
var hasOwn$b = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$e ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$4(O);
  P = toPropertyKey$1(P);
  if (IE8_DOM_DEFINE$1) try {
    return $getOwnPropertyDescriptor$1(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn$b(O, P)) return createPropertyDescriptor$4(!call$g(propertyIsEnumerableModule$1.f, O, P), O[P]);
};

var objectDefineProperty = {};

var DESCRIPTORS$d = descriptors;
var fails$e = fails$k;

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug = DESCRIPTORS$d && fails$e(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});

var isObject$7 = isObject$b;

var $String$3 = String;
var $TypeError$9 = TypeError;

// `Assert: Type(argument) is Object`
var anObject$f = function (argument) {
  if (isObject$7(argument)) return argument;
  throw new $TypeError$9($String$3(argument) + ' is not an object');
};

var DESCRIPTORS$c = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$e = anObject$f;
var toPropertyKey = toPropertyKey$2;

var $TypeError$8 = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE$1 = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$c ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
  anObject$e(O);
  P = toPropertyKey(P);
  anObject$e(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject$e(O);
  P = toPropertyKey(P);
  anObject$e(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError$8('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$b = descriptors;
var definePropertyModule$4 = objectDefineProperty;
var createPropertyDescriptor$3 = createPropertyDescriptor$5;

var createNonEnumerableProperty$5 = DESCRIPTORS$b ? function (object, key, value) {
  return definePropertyModule$4.f(object, key, createPropertyDescriptor$3(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var makeBuiltIn$3 = {exports: {}};

var DESCRIPTORS$a = descriptors;
var hasOwn$a = hasOwnProperty_1;

var FunctionPrototype$1 = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS$a && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn$a(FunctionPrototype$1, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$a || (DESCRIPTORS$a && getDescriptor(FunctionPrototype$1, 'name').configurable));

var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

var uncurryThis$g = functionUncurryThis;
var isCallable$g = isCallable$m;
var store$1 = sharedStore.exports;

var functionToString = uncurryThis$g(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$g(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$3 = store$1.inspectSource;

var global$g = global$n;
var isCallable$f = isCallable$m;

var WeakMap$1 = global$g.WeakMap;

var weakMapBasicDetection = isCallable$f(WeakMap$1) && /native code/.test(String(WeakMap$1));

var shared$2 = shared$4;
var uid = uid$2;

var keys = shared$2('keys');

var sharedKey$3 = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys$4 = {};

var NATIVE_WEAK_MAP = weakMapBasicDetection;
var global$f = global$n;
var isObject$6 = isObject$b;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;
var hasOwn$9 = hasOwnProperty_1;
var shared$1 = sharedStore.exports;
var sharedKey$2 = sharedKey$3;
var hiddenKeys$3 = hiddenKeys$4;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$4 = global$f.TypeError;
var WeakMap = global$f.WeakMap;
var set$1, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set$1(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$6(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError$4('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared$1.state) {
  var store = shared$1.state || (shared$1.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set$1 = function (it, metadata) {
    if (store.has(it)) throw new TypeError$4(OBJECT_ALREADY_INITIALIZED);
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
  var STATE = sharedKey$2('state');
  hiddenKeys$3[STATE] = true;
  set$1 = function (it, metadata) {
    if (hasOwn$9(it, STATE)) throw new TypeError$4(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$4(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn$9(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn$9(it, STATE);
  };
}

var internalState = {
  set: set$1,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

var uncurryThis$f = functionUncurryThis;
var fails$d = fails$k;
var isCallable$e = isCallable$m;
var hasOwn$8 = hasOwnProperty_1;
var DESCRIPTORS$9 = descriptors;
var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
var inspectSource$2 = inspectSource$3;
var InternalStateModule$5 = internalState;

var enforceInternalState = InternalStateModule$5.enforce;
var getInternalState$3 = InternalStateModule$5.get;
var $String$2 = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$5 = Object.defineProperty;
var stringSlice$6 = uncurryThis$f(''.slice);
var replace$5 = uncurryThis$f(''.replace);
var join$3 = uncurryThis$f([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS$9 && !fails$d(function () {
  return defineProperty$5(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn$2 = makeBuiltIn$3.exports = function (value, name, options) {
  if (stringSlice$6($String$2(name), 0, 7) === 'Symbol(') {
    name = '[' + replace$5($String$2(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn$8(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)) {
    if (DESCRIPTORS$9) defineProperty$5(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn$8(options, 'arity') && value.length !== options.arity) {
    defineProperty$5(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn$8(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS$9) defineProperty$5(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn$8(state, 'source')) {
    state.source = join$3(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn$2(function toString() {
  return isCallable$e(this) && getInternalState$3(this).source || inspectSource$2(this);
}, 'toString');

var isCallable$d = isCallable$m;
var definePropertyModule$3 = objectDefineProperty;
var makeBuiltIn$1 = makeBuiltIn$3.exports;
var defineGlobalProperty$1 = defineGlobalProperty$3;

var defineBuiltIn$a = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable$d(value)) makeBuiltIn$1(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty$1(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule$3.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};

var objectGetOwnPropertyNames = {};

var ceil = Math.ceil;
var floor$4 = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
var mathTrunc = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor$4 : ceil)(n);
};

var trunc = mathTrunc;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
var toIntegerOrInfinity$4 = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};

var toIntegerOrInfinity$3 = toIntegerOrInfinity$4;

var max$1 = Math.max;
var min$2 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$1 = function (index, length) {
  var integer = toIntegerOrInfinity$3(index);
  return integer < 0 ? max$1(integer + length, 0) : min$2(integer, length);
};

var toIntegerOrInfinity$2 = toIntegerOrInfinity$4;

var min$1 = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$2 = function (argument) {
  var len = toIntegerOrInfinity$2(argument);
  return len > 0 ? min$1(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength$1 = toLength$2;

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
var lengthOfArrayLike$3 = function (obj) {
  return toLength$1(obj.length);
};

var toIndexedObject$3 = toIndexedObject$5;
var toAbsoluteIndex = toAbsoluteIndex$1;
var lengthOfArrayLike$2 = lengthOfArrayLike$3;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod$1 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$3($this);
    var length = lengthOfArrayLike$2(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$1(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$1(false)
};

var uncurryThis$e = functionUncurryThis;
var hasOwn$7 = hasOwnProperty_1;
var toIndexedObject$2 = toIndexedObject$5;
var indexOf$1 = arrayIncludes.indexOf;
var hiddenKeys$2 = hiddenKeys$4;

var push$4 = uncurryThis$e([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$2(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn$7(hiddenKeys$2, key) && hasOwn$7(O, key) && push$4(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn$7(O, key = names[i++])) {
    ~indexOf$1(result, key) || push$4(result, key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$3 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;

var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1(O, hiddenKeys$1);
};

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$5 = getBuiltIn$7;
var uncurryThis$d = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
var anObject$d = anObject$f;

var concat$2 = uncurryThis$d([].concat);

// all object keys, includes non-enumerable and symbols
var ownKeys$1 = getBuiltIn$5('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject$d(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
  return getOwnPropertySymbols ? concat$2(keys, getOwnPropertySymbols(it)) : keys;
};

var hasOwn$6 = hasOwnProperty_1;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$2 = objectDefineProperty;

var copyConstructorProperties$1 = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule$2.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn$6(target, key) && !(exceptions && hasOwn$6(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

var fails$c = fails$k;
var isCallable$c = isCallable$m;

var replacement = /#|\.prototype\./;

var isForced$2 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable$c(detection) ? fails$c(detection)
    : !!detection;
};

var normalize = isForced$2.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$2.data = {};
var NATIVE = isForced$2.NATIVE = 'N';
var POLYFILL = isForced$2.POLYFILL = 'P';

var isForced_1 = isForced$2;

var global$e = global$n;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;
var defineBuiltIn$9 = defineBuiltIn$a;
var defineGlobalProperty = defineGlobalProperty$3;
var copyConstructorProperties = copyConstructorProperties$1;
var isForced$1 = isForced_1;

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
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$e;
  } else if (STATIC) {
    target = global$e[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = global$e[TARGET] && global$e[TARGET].prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor$1(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty$3(sourceProperty, 'sham', true);
    }
    defineBuiltIn$9(target, key, sourceProperty, options);
  }
};

var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3;

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
var objectKeys$2 = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys$1);
};

var DESCRIPTORS$8 = descriptors;
var uncurryThis$c = functionUncurryThis;
var call$f = functionCall;
var fails$b = fails$k;
var objectKeys$1 = objectKeys$2;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var toObject$3 = toObject$5;
var IndexedObject = indexedObject;

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty$4 = Object.defineProperty;
var concat$1 = uncurryThis$c([].concat);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
var objectAssign = !$assign || fails$b(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS$8 && $assign({ b: 1 }, $assign(defineProperty$4({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty$4(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es/no-symbol -- safe
  var symbol = Symbol('assign detection');
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] !== 7 || objectKeys$1($assign({}, B)).join('') !== alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject$3(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? concat$1(objectKeys$1(S), getOwnPropertySymbols(S)) : objectKeys$1(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS$8 || call$f(propertyIsEnumerable, S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

var $$a = _export;
var assign$1 = objectAssign;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$$a({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign$1 }, {
  assign: assign$1
});

var wellKnownSymbol$g = wellKnownSymbol$i;

var TO_STRING_TAG$2 = wellKnownSymbol$g('toStringTag');
var test = {};

test[TO_STRING_TAG$2] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var isCallable$b = isCallable$m;
var classofRaw$1 = classofRaw$2;
var wellKnownSymbol$f = wellKnownSymbol$i;

var TO_STRING_TAG$1 = wellKnownSymbol$f('toStringTag');
var $Object$1 = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw$1(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$6 = TO_STRING_TAG_SUPPORT ? classofRaw$1 : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object$1(it), TO_STRING_TAG$1)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw$1(O)
    // ES3 arguments fallback
    : (result = classofRaw$1(O)) === 'Object' && isCallable$b(O.callee) ? 'Arguments' : result;
};

var classof$5 = classof$6;

var $String$1 = String;

var toString$4 = function (argument) {
  if (classof$5(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
  return $String$1(argument);
};

var anObject$c = anObject$f;

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags$1 = function () {
  var that = anObject$c(this);
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

var call$e = functionCall;
var hasOwn$5 = hasOwnProperty_1;
var isPrototypeOf$2 = objectIsPrototypeOf;
var regExpFlags = regexpFlags$1;

var RegExpPrototype$2 = RegExp.prototype;

var regexpGetFlags = function (R) {
  var flags = R.flags;
  return flags === undefined && !('flags' in RegExpPrototype$2) && !hasOwn$5(R, 'flags') && isPrototypeOf$2(RegExpPrototype$2, R)
    ? call$e(regExpFlags, R) : flags;
};

var PROPER_FUNCTION_NAME$1 = functionName.PROPER;
var defineBuiltIn$8 = defineBuiltIn$a;
var anObject$b = anObject$f;
var $toString$2 = toString$4;
var fails$a = fails$k;
var getRegExpFlags = regexpGetFlags;

var TO_STRING = 'toString';
var RegExpPrototype$1 = RegExp.prototype;
var nativeToString = RegExpPrototype$1[TO_STRING];

var NOT_GENERIC = fails$a(function () { return nativeToString.call({ source: 'a', flags: 'b' }) !== '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = PROPER_FUNCTION_NAME$1 && nativeToString.name !== TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  defineBuiltIn$8(RegExpPrototype$1, TO_STRING, function toString() {
    var R = anObject$b(this);
    var pattern = $toString$2(R.source);
    var flags = $toString$2(getRegExpFlags(R));
    return '/' + pattern + '/' + flags;
  }, { unsafe: true });
}

var objectDefineProperties = {};

var DESCRIPTORS$7 = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule$1 = objectDefineProperty;
var anObject$a = anObject$f;
var toIndexedObject$1 = toIndexedObject$5;
var objectKeys = objectKeys$2;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
objectDefineProperties.f = DESCRIPTORS$7 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$a(O);
  var props = toIndexedObject$1(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule$1.f(O, key = keys[index++], props[key]);
  return O;
};

var getBuiltIn$4 = getBuiltIn$7;

var html$2 = getBuiltIn$4('document', 'documentElement');

/* global ActiveXObject -- old IE, WSH */
var anObject$9 = anObject$f;
var definePropertiesModule = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys = hiddenKeys$4;
var html$1 = html$2;
var documentCreateElement$1 = documentCreateElement$2;
var sharedKey$1 = sharedKey$3;

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO$1 = sharedKey$1('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement$1('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html$1.appendChild(iframe);
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
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO$1] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject$9(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

var wellKnownSymbol$e = wellKnownSymbol$i;
var create$3 = objectCreate;
var defineProperty$3 = objectDefineProperty.f;

var UNSCOPABLES = wellKnownSymbol$e('unscopables');
var ArrayPrototype$1 = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype$1[UNSCOPABLES] === undefined) {
  defineProperty$3(ArrayPrototype$1, UNSCOPABLES, {
    configurable: true,
    value: create$3(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables$1 = function (key) {
  ArrayPrototype$1[UNSCOPABLES][key] = true;
};

var iterators = {};

var fails$9 = fails$k;

var correctPrototypeGetter = !fails$9(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var hasOwn$4 = hasOwnProperty_1;
var isCallable$a = isCallable$m;
var toObject$2 = toObject$5;
var sharedKey = sharedKey$3;
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject$2(O);
  if (hasOwn$4(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable$a(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};

var fails$8 = fails$k;
var isCallable$9 = isCallable$m;
var isObject$5 = isObject$b;
var getPrototypeOf$1 = objectGetPrototypeOf;
var defineBuiltIn$7 = defineBuiltIn$a;
var wellKnownSymbol$d = wellKnownSymbol$i;

var ITERATOR$7 = wellKnownSymbol$d('iterator');
var BUGGY_SAFARI_ITERATORS$1 = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = !isObject$5(IteratorPrototype$2) || fails$8(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype$2[ITERATOR$7].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable$9(IteratorPrototype$2[ITERATOR$7])) {
  defineBuiltIn$7(IteratorPrototype$2, ITERATOR$7, function () {
    return this;
  });
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$2,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};

var defineProperty$2 = objectDefineProperty.f;
var hasOwn$3 = hasOwnProperty_1;
var wellKnownSymbol$c = wellKnownSymbol$i;

var TO_STRING_TAG = wellKnownSymbol$c('toStringTag');

var setToStringTag$6 = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn$3(target, TO_STRING_TAG)) {
    defineProperty$2(target, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
var create$2 = objectCreate;
var createPropertyDescriptor$2 = createPropertyDescriptor$5;
var setToStringTag$5 = setToStringTag$6;
var Iterators$4 = iterators;

var returnThis$1 = function () { return this; };

var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create$2(IteratorPrototype$1, { next: createPropertyDescriptor$2(+!ENUMERABLE_NEXT, next) });
  setToStringTag$5(IteratorConstructor, TO_STRING_TAG, false);
  Iterators$4[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var uncurryThis$b = functionUncurryThis;
var aCallable$6 = aCallable$8;

var functionUncurryThisAccessor = function (object, key, method) {
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return uncurryThis$b(aCallable$6(Object.getOwnPropertyDescriptor(object, key)[method]));
  } catch (error) { /* empty */ }
};

var isObject$4 = isObject$b;

var isPossiblePrototype$1 = function (argument) {
  return isObject$4(argument) || argument === null;
};

var isPossiblePrototype = isPossiblePrototype$1;

var $String = String;
var $TypeError$7 = TypeError;

var aPossiblePrototype$1 = function (argument) {
  if (isPossiblePrototype(argument)) return argument;
  throw new $TypeError$7("Can't set " + $String(argument) + ' as a prototype');
};

/* eslint-disable no-proto -- safe */
var uncurryThisAccessor = functionUncurryThisAccessor;
var isObject$3 = isObject$b;
var requireObjectCoercible$2 = requireObjectCoercible$5;
var aPossiblePrototype = aPossiblePrototype$1;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    requireObjectCoercible$2(O);
    aPossiblePrototype(proto);
    if (!isObject$3(O)) return O;
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var $$9 = _export;
var call$d = functionCall;
var FunctionName = functionName;
var isCallable$8 = isCallable$m;
var createIteratorConstructor$1 = iteratorCreateConstructor;
var getPrototypeOf = objectGetPrototypeOf;
var setPrototypeOf$1 = objectSetPrototypeOf;
var setToStringTag$4 = setToStringTag$6;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;
var defineBuiltIn$6 = defineBuiltIn$a;
var wellKnownSymbol$b = wellKnownSymbol$i;
var Iterators$3 = iterators;
var IteratorsCore = iteratorsCore;

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$6 = wellKnownSymbol$b('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

var iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor$1(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];

    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    }

    return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$6]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf$1) {
          setPrototypeOf$1(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable$8(CurrentIteratorPrototype[ITERATOR$6])) {
          defineBuiltIn$6(CurrentIteratorPrototype, ITERATOR$6, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag$4(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty$2(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call$d(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        defineBuiltIn$6(IterablePrototype, KEY, methods[KEY]);
      }
    } else $$9({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if (IterablePrototype[ITERATOR$6] !== defaultIterator) {
    defineBuiltIn$6(IterablePrototype, ITERATOR$6, defaultIterator, { name: DEFAULT });
  }
  Iterators$3[NAME] = defaultIterator;

  return methods;
};

// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
var createIterResultObject$3 = function (value, done) {
  return { value: value, done: done };
};

var toIndexedObject = toIndexedObject$5;
var addToUnscopables = addToUnscopables$1;
var Iterators$2 = iterators;
var InternalStateModule$4 = internalState;
var defineProperty$1 = objectDefineProperty.f;
var defineIterator$1 = iteratorDefine;
var createIterResultObject$2 = createIterResultObject$3;
var DESCRIPTORS$6 = descriptors;

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$4 = InternalStateModule$4.set;
var getInternalState$2 = InternalStateModule$4.getterFor(ARRAY_ITERATOR);

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
var es_array_iterator = defineIterator$1(Array, 'Array', function (iterated, kind) {
  setInternalState$4(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$2(this);
  var target = state.target;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return createIterResultObject$2(undefined, true);
  }
  switch (state.kind) {
    case 'keys': return createIterResultObject$2(index, false);
    case 'values': return createIterResultObject$2(target[index], false);
  } return createIterResultObject$2([index, target[index]], false);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = Iterators$2.Arguments = Iterators$2.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// V8 ~ Chrome 45- bug
if (DESCRIPTORS$6 && values.name !== 'values') try {
  defineProperty$1(values, 'name', { value: 'values' });
} catch (error) { /* empty */ }

var global$d = global$n;
var classof$4 = classofRaw$2;

var engineIsNode = classof$4(global$d.process) === 'process';

var makeBuiltIn = makeBuiltIn$3.exports;
var defineProperty = objectDefineProperty;

var defineBuiltInAccessor$3 = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty.f(target, name, descriptor);
};

var getBuiltIn$3 = getBuiltIn$7;
var defineBuiltInAccessor$2 = defineBuiltInAccessor$3;
var wellKnownSymbol$a = wellKnownSymbol$i;
var DESCRIPTORS$5 = descriptors;

var SPECIES$3 = wellKnownSymbol$a('species');

var setSpecies$1 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$3(CONSTRUCTOR_NAME);

  if (DESCRIPTORS$5 && Constructor && !Constructor[SPECIES$3]) {
    defineBuiltInAccessor$2(Constructor, SPECIES$3, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

var isPrototypeOf$1 = objectIsPrototypeOf;

var $TypeError$6 = TypeError;

var anInstance$3 = function (it, Prototype) {
  if (isPrototypeOf$1(Prototype, it)) return it;
  throw new $TypeError$6('Incorrect invocation');
};

var uncurryThis$a = functionUncurryThis;
var fails$7 = fails$k;
var isCallable$7 = isCallable$m;
var classof$3 = classof$6;
var getBuiltIn$2 = getBuiltIn$7;
var inspectSource$1 = inspectSource$3;

var noop = function () { /* empty */ };
var construct = getBuiltIn$2('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec$3 = uncurryThis$a(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable$7(argument)) return false;
  try {
    construct(noop, [], argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable$7(argument)) return false;
  switch (classof$3(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec$3(constructorRegExp, inspectSource$1(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
var isConstructor$2 = !construct || fails$7(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;

var isConstructor$1 = isConstructor$2;
var tryToString$2 = tryToString$4;

var $TypeError$5 = TypeError;

// `Assert: IsConstructor(argument) is true`
var aConstructor$1 = function (argument) {
  if (isConstructor$1(argument)) return argument;
  throw new $TypeError$5(tryToString$2(argument) + ' is not a constructor');
};

var anObject$8 = anObject$f;
var aConstructor = aConstructor$1;
var isNullOrUndefined$2 = isNullOrUndefined$5;
var wellKnownSymbol$9 = wellKnownSymbol$i;

var SPECIES$2 = wellKnownSymbol$9('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
var speciesConstructor$1 = function (O, defaultConstructor) {
  var C = anObject$8(O).constructor;
  var S;
  return C === undefined || isNullOrUndefined$2(S = anObject$8(C)[SPECIES$2]) ? defaultConstructor : aConstructor(S);
};

var NATIVE_BIND$1 = functionBindNative;

var FunctionPrototype = Function.prototype;
var apply$2 = FunctionPrototype.apply;
var call$c = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$1 ? call$c.bind(apply$2) : function () {
  return call$c.apply(apply$2, arguments);
});

var classofRaw = classofRaw$2;
var uncurryThis$9 = functionUncurryThis;

var functionUncurryThisClause = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis$9(fn);
};

var uncurryThis$8 = functionUncurryThisClause;
var aCallable$5 = aCallable$8;
var NATIVE_BIND = functionBindNative;

var bind$7 = uncurryThis$8(uncurryThis$8.bind);

// optional / simple context binding
var functionBindContext = function (fn, that) {
  aCallable$5(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind$7(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var uncurryThis$7 = functionUncurryThis;

var arraySlice$3 = uncurryThis$7([].slice);

var $TypeError$4 = TypeError;

var validateArgumentsLength$3 = function (passed, required) {
  if (passed < required) throw new $TypeError$4('Not enough arguments');
  return passed;
};

var userAgent$2 = engineUserAgent;

// eslint-disable-next-line redos/no-vulnerable -- safe
var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$2);

var global$c = global$n;
var apply$1 = functionApply;
var bind$6 = functionBindContext;
var isCallable$6 = isCallable$m;
var hasOwn$2 = hasOwnProperty_1;
var fails$6 = fails$k;
var html = html$2;
var arraySlice$2 = arraySlice$3;
var createElement = documentCreateElement$2;
var validateArgumentsLength$2 = validateArgumentsLength$3;
var IS_IOS$1 = engineIsIos;
var IS_NODE$3 = engineIsNode;

var set = global$c.setImmediate;
var clear = global$c.clearImmediate;
var process$2 = global$c.process;
var Dispatch = global$c.Dispatch;
var Function$1 = global$c.Function;
var MessageChannel = global$c.MessageChannel;
var String$1 = global$c.String;
var counter = 0;
var queue$2 = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var $location, defer, channel, port;

fails$6(function () {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  $location = global$c.location;
});

var run = function (id) {
  if (hasOwn$2(queue$2, id)) {
    var fn = queue$2[id];
    delete queue$2[id];
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
  global$c.postMessage(String$1(id), $location.protocol + '//' + $location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(handler) {
    validateArgumentsLength$2(arguments.length, 1);
    var fn = isCallable$6(handler) ? handler : Function$1(handler);
    var args = arraySlice$2(arguments, 1);
    queue$2[++counter] = function () {
      apply$1(fn, undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue$2[id];
  };
  // Node.js 0.8-
  if (IS_NODE$3) {
    defer = function (id) {
      process$2.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS$1) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = eventListener;
    defer = bind$6(port.postMessage, port);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global$c.addEventListener &&
    isCallable$6(global$c.postMessage) &&
    !global$c.importScripts &&
    $location && $location.protocol !== 'file:' &&
    !fails$6(globalPostMessageDefer)
  ) {
    defer = globalPostMessageDefer;
    global$c.addEventListener('message', eventListener, false);
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

var task$1 = {
  set: set,
  clear: clear
};

var global$b = global$n;
var DESCRIPTORS$4 = descriptors;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Avoid NodeJS experimental warning
var safeGetBuiltIn$2 = function (name) {
  if (!DESCRIPTORS$4) return global$b[name];
  var descriptor = getOwnPropertyDescriptor(global$b, name);
  return descriptor && descriptor.value;
};

var Queue$2 = function () {
  this.head = null;
  this.tail = null;
};

Queue$2.prototype = {
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
      var next = this.head = entry.next;
      if (next === null) this.tail = null;
      return entry.item;
    }
  }
};

var queue$1 = Queue$2;

var userAgent$1 = engineUserAgent;

var engineIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$1) && typeof Pebble != 'undefined';

var userAgent = engineUserAgent;

var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);

var global$a = global$n;
var safeGetBuiltIn$1 = safeGetBuiltIn$2;
var bind$5 = functionBindContext;
var macrotask = task$1.set;
var Queue$1 = queue$1;
var IS_IOS = engineIsIos;
var IS_IOS_PEBBLE = engineIsIosPebble;
var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
var IS_NODE$2 = engineIsNode;

var MutationObserver = global$a.MutationObserver || global$a.WebKitMutationObserver;
var document$2 = global$a.document;
var process$1 = global$a.process;
var Promise$1 = global$a.Promise;
var microtask$1 = safeGetBuiltIn$1('queueMicrotask');
var notify$1, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!microtask$1) {
  var queue = new Queue$1();

  var flush = function () {
    var parent, fn;
    if (IS_NODE$2 && (parent = process$1.domain)) parent.exit();
    while (fn = queue.get()) try {
      fn();
    } catch (error) {
      if (queue.head) notify$1();
      throw error;
    }
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE$2 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
    toggle = true;
    node = document$2.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify$1 = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise$1.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise$1;
    then = bind$5(promise.then, promise);
    notify$1 = function () {
      then(flush);
    };
  // Node.js without promises
  } else if (IS_NODE$2) {
    notify$1 = function () {
      process$1.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessage
  // - onreadystatechange
  // - setTimeout
  } else {
    // `webpack` dev server bug on IE global methods - use bind(fn, global)
    macrotask = bind$5(macrotask, global$a);
    notify$1 = function () {
      macrotask(flush);
    };
  }

  microtask$1 = function (fn) {
    if (!queue.head) notify$1();
    queue.add(fn);
  };
}

var microtask_1 = microtask$1;

var hostReportErrors$1 = function (a, b) {
  try {
    // eslint-disable-next-line no-console -- safe
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  } catch (error) { /* empty */ }
};

var perform$3 = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

var global$9 = global$n;

var promiseNativeConstructor = global$9.Promise;

/* global Deno -- Deno case */
var engineIsDeno = typeof Deno == 'object' && Deno && typeof Deno.version == 'object';

var IS_DENO$1 = engineIsDeno;
var IS_NODE$1 = engineIsNode;

var engineIsBrowser = !IS_DENO$1 && !IS_NODE$1
  && typeof window == 'object'
  && typeof document == 'object';

var global$8 = global$n;
var NativePromiseConstructor$3 = promiseNativeConstructor;
var isCallable$5 = isCallable$m;
var isForced = isForced_1;
var inspectSource = inspectSource$3;
var wellKnownSymbol$8 = wellKnownSymbol$i;
var IS_BROWSER = engineIsBrowser;
var IS_DENO = engineIsDeno;
var V8_VERSION = engineV8Version;

NativePromiseConstructor$3 && NativePromiseConstructor$3.prototype;
var SPECIES$1 = wellKnownSymbol$8('species');
var SUBCLASSING = false;
var NATIVE_PROMISE_REJECTION_EVENT$1 = isCallable$5(global$8.PromiseRejectionEvent);

var FORCED_PROMISE_CONSTRUCTOR$5 = isForced('Promise', function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor$3);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor$3);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (!V8_VERSION || V8_VERSION < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
    // Detect correctness of subclassing with @@species support
    var promise = new NativePromiseConstructor$3(function (resolve) { resolve(1); });
    var FakePromise = function (exec) {
      exec(function () { /* empty */ }, function () { /* empty */ });
    };
    var constructor = promise.constructor = {};
    constructor[SPECIES$1] = FakePromise;
    SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
    if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  } return !GLOBAL_CORE_JS_PROMISE && (IS_BROWSER || IS_DENO) && !NATIVE_PROMISE_REJECTION_EVENT$1;
});

var promiseConstructorDetection = {
  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR$5,
  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT$1,
  SUBCLASSING: SUBCLASSING
};

var newPromiseCapability$2 = {};

var aCallable$4 = aCallable$8;

var $TypeError$3 = TypeError;

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw new $TypeError$3('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable$4(resolve);
  this.reject = aCallable$4(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
newPromiseCapability$2.f = function (C) {
  return new PromiseCapability(C);
};

var $$8 = _export;
var IS_NODE = engineIsNode;
var global$7 = global$n;
var call$b = functionCall;
var defineBuiltIn$5 = defineBuiltIn$a;
var setPrototypeOf = objectSetPrototypeOf;
var setToStringTag$3 = setToStringTag$6;
var setSpecies = setSpecies$1;
var aCallable$3 = aCallable$8;
var isCallable$4 = isCallable$m;
var isObject$2 = isObject$b;
var anInstance$2 = anInstance$3;
var speciesConstructor = speciesConstructor$1;
var task = task$1.set;
var microtask = microtask_1;
var hostReportErrors = hostReportErrors$1;
var perform$2 = perform$3;
var Queue = queue$1;
var InternalStateModule$3 = internalState;
var NativePromiseConstructor$2 = promiseNativeConstructor;
var PromiseConstructorDetection = promiseConstructorDetection;
var newPromiseCapabilityModule$3 = newPromiseCapability$2;

var PROMISE = 'Promise';
var FORCED_PROMISE_CONSTRUCTOR$4 = PromiseConstructorDetection.CONSTRUCTOR;
var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
var getInternalPromiseState = InternalStateModule$3.getterFor(PROMISE);
var setInternalState$3 = InternalStateModule$3.set;
var NativePromisePrototype$1 = NativePromiseConstructor$2 && NativePromiseConstructor$2.prototype;
var PromiseConstructor = NativePromiseConstructor$2;
var PromisePrototype = NativePromisePrototype$1;
var TypeError$3 = global$7.TypeError;
var document$1 = global$7.document;
var process = global$7.process;
var newPromiseCapability$1 = newPromiseCapabilityModule$3.f;
var newGenericPromiseCapability = newPromiseCapability$1;

var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$7.dispatchEvent);
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
  return isObject$2(it) && isCallable$4(then = it.then) ? then : false;
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
        reject(new TypeError$3('Promise-chain cycle'));
      } else if (then = isThenable(result)) {
        call$b(then, result, resolve, reject);
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
    while (reaction = reactions.get()) {
      callReaction(reaction, state);
    }
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document$1.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global$7.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global$7['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  call$b(task, global$7, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform$2(function () {
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
  call$b(task, global$7, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind$4 = function (fn, state, unwrap) {
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
    if (state.facade === value) throw new TypeError$3("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          call$b(then, value,
            bind$4(internalResolve, wrapper, state),
            bind$4(internalReject, wrapper, state)
          );
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
if (FORCED_PROMISE_CONSTRUCTOR$4) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance$2(this, PromisePrototype);
    aCallable$3(executor);
    call$b(Internal, this);
    var state = getInternalPromiseState(this);
    try {
      executor(bind$4(internalResolve, state), bind$4(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };

  PromisePrototype = PromiseConstructor.prototype;

  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState$3(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: new Queue(),
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };

  // `Promise.prototype.then` method
  // https://tc39.es/ecma262/#sec-promise.prototype.then
  Internal.prototype = defineBuiltIn$5(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
    var state = getInternalPromiseState(this);
    var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
    state.parent = true;
    reaction.ok = isCallable$4(onFulfilled) ? onFulfilled : true;
    reaction.fail = isCallable$4(onRejected) && onRejected;
    reaction.domain = IS_NODE ? process.domain : undefined;
    if (state.state === PENDING) state.reactions.add(reaction);
    else microtask(function () {
      callReaction(reaction, state);
    });
    return reaction.promise;
  });

  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalPromiseState(promise);
    this.promise = promise;
    this.resolve = bind$4(internalResolve, state);
    this.reject = bind$4(internalReject, state);
  };

  newPromiseCapabilityModule$3.f = newPromiseCapability$1 = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (isCallable$4(NativePromiseConstructor$2) && NativePromisePrototype$1 !== Object.prototype) {
    nativeThen = NativePromisePrototype$1.then;

    if (!NATIVE_PROMISE_SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      defineBuiltIn$5(NativePromisePrototype$1, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          call$b(nativeThen, that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype$1.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype$1, PromisePrototype);
    }
  }
}

$$8({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR$4 }, {
  Promise: PromiseConstructor
});

setToStringTag$3(PromiseConstructor, PROMISE, false);
setSpecies(PROMISE);

var wellKnownSymbol$7 = wellKnownSymbol$i;
var Iterators$1 = iterators;

var ITERATOR$5 = wellKnownSymbol$7('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod$2 = function (it) {
  return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$5] === it);
};

var classof$2 = classof$6;
var getMethod$2 = getMethod$4;
var isNullOrUndefined$1 = isNullOrUndefined$5;
var Iterators = iterators;
var wellKnownSymbol$6 = wellKnownSymbol$i;

var ITERATOR$4 = wellKnownSymbol$6('iterator');

var getIteratorMethod$4 = function (it) {
  if (!isNullOrUndefined$1(it)) return getMethod$2(it, ITERATOR$4)
    || getMethod$2(it, '@@iterator')
    || Iterators[classof$2(it)];
};

var call$a = functionCall;
var aCallable$2 = aCallable$8;
var anObject$7 = anObject$f;
var tryToString$1 = tryToString$4;
var getIteratorMethod$3 = getIteratorMethod$4;

var $TypeError$2 = TypeError;

var getIterator$3 = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$3(argument) : usingIterator;
  if (aCallable$2(iteratorMethod)) return anObject$7(call$a(iteratorMethod, argument));
  throw new $TypeError$2(tryToString$1(argument) + ' is not iterable');
};

var call$9 = functionCall;
var anObject$6 = anObject$f;
var getMethod$1 = getMethod$4;

var iteratorClose$2 = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject$6(iterator);
  try {
    innerResult = getMethod$1(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call$9(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject$6(innerResult);
  return value;
};

var bind$3 = functionBindContext;
var call$8 = functionCall;
var anObject$5 = anObject$f;
var tryToString = tryToString$4;
var isArrayIteratorMethod$1 = isArrayIteratorMethod$2;
var lengthOfArrayLike$1 = lengthOfArrayLike$3;
var isPrototypeOf = objectIsPrototypeOf;
var getIterator$2 = getIterator$3;
var getIteratorMethod$2 = getIteratorMethod$4;
var iteratorClose$1 = iteratorClose$2;

var $TypeError$1 = TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

var iterate$2 = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_RECORD = !!(options && options.IS_RECORD);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind$3(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose$1(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject$5(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_RECORD) {
    iterator = iterable.iterator;
  } else if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod$2(iterable);
    if (!iterFn) throw new $TypeError$1(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod$1(iterFn)) {
      for (index = 0, length = lengthOfArrayLike$1(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator$2(iterable, iterFn);
  }

  next = IS_RECORD ? iterable.next : iterator.next;
  while (!(step = call$8(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose$1(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  } return new Result(false);
};

var wellKnownSymbol$5 = wellKnownSymbol$i;

var ITERATOR$3 = wellKnownSymbol$5('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR$3] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
  try {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  } catch (error) { return false; } // workaround of old WebKit + `eval` bug
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR$3] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

var NativePromiseConstructor$1 = promiseNativeConstructor;
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
var FORCED_PROMISE_CONSTRUCTOR$3 = promiseConstructorDetection.CONSTRUCTOR;

var promiseStaticsIncorrectIteration = FORCED_PROMISE_CONSTRUCTOR$3 || !checkCorrectnessOfIteration(function (iterable) {
  NativePromiseConstructor$1.all(iterable).then(undefined, function () { /* empty */ });
});

var $$7 = _export;
var call$7 = functionCall;
var aCallable$1 = aCallable$8;
var newPromiseCapabilityModule$2 = newPromiseCapability$2;
var perform$1 = perform$3;
var iterate$1 = iterate$2;
var PROMISE_STATICS_INCORRECT_ITERATION$1 = promiseStaticsIncorrectIteration;

// `Promise.all` method
// https://tc39.es/ecma262/#sec-promise.all
$$7({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$1 }, {
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule$2.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform$1(function () {
      var $promiseResolve = aCallable$1(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate$1(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        remaining++;
        call$7($promiseResolve, C, promise).then(function (value) {
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
  }
});

var $$6 = _export;
var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;
var NativePromiseConstructor = promiseNativeConstructor;
var getBuiltIn$1 = getBuiltIn$7;
var isCallable$3 = isCallable$m;
var defineBuiltIn$4 = defineBuiltIn$a;

var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

// `Promise.prototype.catch` method
// https://tc39.es/ecma262/#sec-promise.prototype.catch
$$6({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR$2, real: true }, {
  'catch': function (onRejected) {
    return this.then(undefined, onRejected);
  }
});

// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
if (isCallable$3(NativePromiseConstructor)) {
  var method = getBuiltIn$1('Promise').prototype['catch'];
  if (NativePromisePrototype['catch'] !== method) {
    defineBuiltIn$4(NativePromisePrototype, 'catch', method, { unsafe: true });
  }
}

var $$5 = _export;
var call$6 = functionCall;
var aCallable = aCallable$8;
var newPromiseCapabilityModule$1 = newPromiseCapability$2;
var perform = perform$3;
var iterate = iterate$2;
var PROMISE_STATICS_INCORRECT_ITERATION = promiseStaticsIncorrectIteration;

// `Promise.race` method
// https://tc39.es/ecma262/#sec-promise.race
$$5({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule$1.f(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      iterate(iterable, function (promise) {
        call$6($promiseResolve, C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var $$4 = _export;
var newPromiseCapabilityModule = newPromiseCapability$2;
var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;

// `Promise.reject` method
// https://tc39.es/ecma262/#sec-promise.reject
$$4({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 }, {
  reject: function reject(r) {
    var capability = newPromiseCapabilityModule.f(this);
    var capabilityReject = capability.reject;
    capabilityReject(r);
    return capability.promise;
  }
});

var anObject$4 = anObject$f;
var isObject$1 = isObject$b;
var newPromiseCapability = newPromiseCapability$2;

var promiseResolve$1 = function (C, x) {
  anObject$4(C);
  if (isObject$1(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var $$3 = _export;
var getBuiltIn = getBuiltIn$7;
var FORCED_PROMISE_CONSTRUCTOR = promiseConstructorDetection.CONSTRUCTOR;
var promiseResolve = promiseResolve$1;

getBuiltIn('Promise');

// `Promise.resolve` method
// https://tc39.es/ecma262/#sec-promise.resolve
$$3({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
  resolve: function resolve(x) {
    return promiseResolve(this, x);
  }
});

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
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
  TouchList: 0
};

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = documentCreateElement$2;

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;

var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

var global$6 = global$n;
var DOMIterables = domIterables;
var DOMTokenListPrototype = domTokenListPrototype;
var ArrayIteratorMethods = es_array_iterator;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$5;
var setToStringTag$2 = setToStringTag$6;
var wellKnownSymbol$4 = wellKnownSymbol$i;

var ITERATOR$2 = wellKnownSymbol$4('iterator');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR$2] !== ArrayValues) try {
      createNonEnumerableProperty$1(CollectionPrototype, ITERATOR$2, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR$2] = ArrayValues;
    }
    setToStringTag$2(CollectionPrototype, COLLECTION_NAME, true);
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty$1(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global$6[COLLECTION_NAME] && global$6[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

var uncurryThis$6 = functionUncurryThis;
var toIntegerOrInfinity$1 = toIntegerOrInfinity$4;
var toString$3 = toString$4;
var requireObjectCoercible$1 = requireObjectCoercible$5;

var charAt$6 = uncurryThis$6(''.charAt);
var charCodeAt$1 = uncurryThis$6(''.charCodeAt);
var stringSlice$5 = uncurryThis$6(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString$3(requireObjectCoercible$1($this));
    var position = toIntegerOrInfinity$1(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt$1(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt$1(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt$6(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice$5(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};

var charAt$5 = stringMultibyte.charAt;
var toString$2 = toString$4;
var InternalStateModule$2 = internalState;
var defineIterator = iteratorDefine;
var createIterResultObject$1 = createIterResultObject$3;

var STRING_ITERATOR = 'String Iterator';
var setInternalState$2 = InternalStateModule$2.set;
var getInternalState$1 = InternalStateModule$2.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState$2(this, {
    type: STRING_ITERATOR,
    string: toString$2(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState$1(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return createIterResultObject$1(undefined, true);
  point = charAt$5(string, index);
  state.index += point.length;
  return createIterResultObject$1(point, false);
});

var fails$5 = fails$k;
var wellKnownSymbol$3 = wellKnownSymbol$i;
var DESCRIPTORS$3 = descriptors;
var IS_PURE = isPure;

var ITERATOR$1 = wellKnownSymbol$3('iterator');

var urlConstructorDetection = !fails$5(function () {
  // eslint-disable-next-line unicorn/relative-url-style -- required for testing
  var url = new URL('b?a=1&b=2&c=3', 'http://a');
  var params = url.searchParams;
  var params2 = new URLSearchParams('a=1&a=2&b=3');
  var result = '';
  url.pathname = 'c%20d';
  params.forEach(function (value, key) {
    params['delete']('b');
    result += key + value;
  });
  params2['delete']('a', 2);
  // `undefined` case is a Chromium 117 bug
  // https://bugs.chromium.org/p/v8/issues/detail?id=14222
  params2['delete']('b', undefined);
  return (IS_PURE && (!url.toJSON || !params2.has('a', 1) || params2.has('a', 2) || !params2.has('a', undefined) || params2.has('b')))
    || (!params.size && (IS_PURE || !DESCRIPTORS$3))
    || !params.sort
    || url.href !== 'http://a/c%20d?a=1&c=3'
    || params.get('c') !== '3'
    || String(new URLSearchParams('?a=1')) !== 'a=1'
    || !params[ITERATOR$1]
    // throws in Edge
    || new URL('https://a@b').username !== 'a'
    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
    // not punycoded in Edge
    || new URL('http://тест').host !== 'xn--e1aybc'
    // not escaped in Chrome 62-
    || new URL('http://a#б').hash !== '#%D0%B1'
    // fails in Chrome 66-
    || result !== 'a1c3'
    // throws in Safari
    || new URL('http://x', undefined).host !== 'x';
});

var anObject$3 = anObject$f;
var iteratorClose = iteratorClose$2;

// call something on iterator step with safe closing on error
var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject$3(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};

var DESCRIPTORS$2 = descriptors;
var definePropertyModule = objectDefineProperty;
var createPropertyDescriptor$1 = createPropertyDescriptor$5;

var createProperty$1 = function (object, key, value) {
  if (DESCRIPTORS$2) definePropertyModule.f(object, key, createPropertyDescriptor$1(0, value));
  else object[key] = value;
};

var bind$2 = functionBindContext;
var call$5 = functionCall;
var toObject$1 = toObject$5;
var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
var isArrayIteratorMethod = isArrayIteratorMethod$2;
var isConstructor = isConstructor$2;
var lengthOfArrayLike = lengthOfArrayLike$3;
var createProperty = createProperty$1;
var getIterator$1 = getIterator$3;
var getIteratorMethod$1 = getIteratorMethod$4;

var $Array = Array;

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
var arrayFrom$1 = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject$1(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind$2(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  var iteratorMethod = getIteratorMethod$1(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
    result = IS_CONSTRUCTOR ? new this() : [];
    iterator = getIterator$1(O, iteratorMethod);
    next = iterator.next;
    for (;!(step = call$5(next, iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};

// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
var uncurryThis$5 = functionUncurryThis;

var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'
var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
var baseMinusTMin = base - tMin;

var $RangeError = RangeError;
var exec$2 = uncurryThis$5(regexSeparators.exec);
var floor$3 = Math.floor;
var fromCharCode = String.fromCharCode;
var charCodeAt = uncurryThis$5(''.charCodeAt);
var join$2 = uncurryThis$5([].join);
var push$3 = uncurryThis$5([].push);
var replace$4 = uncurryThis$5(''.replace);
var split$2 = uncurryThis$5(''.split);
var toLowerCase$1 = uncurryThis$5(''.toLowerCase);

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */
var ucs2decode = function (string) {
  var output = [];
  var counter = 0;
  var length = string.length;
  while (counter < length) {
    var value = charCodeAt(string, counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = charCodeAt(string, counter++);
      if ((extra & 0xFC00) === 0xDC00) { // Low surrogate.
        push$3(output, ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        push$3(output, value);
        counter--;
      }
    } else {
      push$3(output, value);
    }
  }
  return output;
};

/**
 * Converts a digit/integer into a basic code point.
 */
var digitToBasic = function (digit) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */
var adapt = function (delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor$3(delta / damp) : delta >> 1;
  delta += floor$3(delta / numPoints);
  while (delta > baseMinusTMin * tMax >> 1) {
    delta = floor$3(delta / baseMinusTMin);
    k += base;
  }
  return floor$3(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */
var encode = function (input) {
  var output = [];

  // Convert the input in UCS-2 to an array of Unicode code points.
  input = ucs2decode(input);

  // Cache the length.
  var inputLength = input.length;

  // Initialize the state.
  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue;

  // Handle the basic code points.
  for (i = 0; i < input.length; i++) {
    currentValue = input[i];
    if (currentValue < 0x80) {
      push$3(output, fromCharCode(currentValue));
    }
  }

  var basicLength = output.length; // number of basic code points.
  var handledCPCount = basicLength; // number of code points that have been handled;

  // Finish the basic string with a delimiter unless it's empty.
  if (basicLength) {
    push$3(output, delimiter);
  }

  // Main encoding loop:
  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next larger one:
    var m = maxInt;
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }

    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
    var handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor$3((maxInt - delta) / handledCPCountPlusOne)) {
      throw new $RangeError(OVERFLOW_ERROR);
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < n && ++delta > maxInt) {
        throw new $RangeError(OVERFLOW_ERROR);
      }
      if (currentValue === n) {
        // Represent delta as a generalized variable-length integer.
        var q = delta;
        var k = base;
        while (true) {
          var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
          if (q < t) break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          push$3(output, fromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor$3(qMinusT / baseMinusT);
          k += base;
        }

        push$3(output, fromCharCode(digitToBasic(q)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
        delta = 0;
        handledCPCount++;
      }
    }

    delta++;
    n++;
  }
  return join$2(output, '');
};

var stringPunycodeToAscii = function (input) {
  var encoded = [];
  var labels = split$2(replace$4(toLowerCase$1(input), regexSeparators, '\u002E'), '.');
  var i, label;
  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    push$3(encoded, exec$2(regexNonASCII, label) ? 'xn--' + encode(label) : label);
  }
  return join$2(encoded, '.');
};

var defineBuiltIn$3 = defineBuiltIn$a;

var defineBuiltIns$1 = function (target, src, options) {
  for (var key in src) defineBuiltIn$3(target, key, src[key], options);
  return target;
};

var arraySlice$1 = arraySlice$3;

var floor$2 = Math.floor;

var sort = function (array, comparefn) {
  var length = array.length;

  if (length < 8) {
    // insertion sort
    var i = 1;
    var element, j;

    while (i < length) {
      j = i;
      element = array[i];
      while (j && comparefn(array[j - 1], element) > 0) {
        array[j] = array[--j];
      }
      if (j !== i++) array[j] = element;
    }
  } else {
    // merge sort
    var middle = floor$2(length / 2);
    var left = sort(arraySlice$1(array, 0, middle), comparefn);
    var right = sort(arraySlice$1(array, middle), comparefn);
    var llength = left.length;
    var rlength = right.length;
    var lindex = 0;
    var rindex = 0;

    while (lindex < llength || rindex < rlength) {
      array[lindex + rindex] = (lindex < llength && rindex < rlength)
        ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
        : lindex < llength ? left[lindex++] : right[rindex++];
    }
  }

  return array;
};

var arraySort$1 = sort;

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

var $$2 = _export;
var global$5 = global$n;
var safeGetBuiltIn = safeGetBuiltIn$2;
var call$4 = functionCall;
var uncurryThis$4 = functionUncurryThis;
var DESCRIPTORS$1 = descriptors;
var USE_NATIVE_URL$1 = urlConstructorDetection;
var defineBuiltIn$2 = defineBuiltIn$a;
var defineBuiltInAccessor$1 = defineBuiltInAccessor$3;
var defineBuiltIns = defineBuiltIns$1;
var setToStringTag$1 = setToStringTag$6;
var createIteratorConstructor = iteratorCreateConstructor;
var InternalStateModule$1 = internalState;
var anInstance$1 = anInstance$3;
var isCallable$2 = isCallable$m;
var hasOwn$1 = hasOwnProperty_1;
var bind$1 = functionBindContext;
var classof$1 = classof$6;
var anObject$2 = anObject$f;
var isObject = isObject$b;
var $toString$1 = toString$4;
var create$1 = objectCreate;
var createPropertyDescriptor = createPropertyDescriptor$5;
var getIterator = getIterator$3;
var getIteratorMethod = getIteratorMethod$4;
var createIterResultObject = createIterResultObject$3;
var validateArgumentsLength$1 = validateArgumentsLength$3;
var wellKnownSymbol$2 = wellKnownSymbol$i;
var arraySort = arraySort$1;

var ITERATOR = wellKnownSymbol$2('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState$1 = InternalStateModule$1.set;
var getInternalParamsState = InternalStateModule$1.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule$1.getterFor(URL_SEARCH_PARAMS_ITERATOR);

var nativeFetch = safeGetBuiltIn('fetch');
var NativeRequest = safeGetBuiltIn('Request');
var Headers = safeGetBuiltIn('Headers');
var RequestPrototype = NativeRequest && NativeRequest.prototype;
var HeadersPrototype = Headers && Headers.prototype;
var RegExp$1 = global$5.RegExp;
var TypeError$2 = global$5.TypeError;
var decodeURIComponent = global$5.decodeURIComponent;
var encodeURIComponent$1 = global$5.encodeURIComponent;
var charAt$4 = uncurryThis$4(''.charAt);
var join$1 = uncurryThis$4([].join);
var push$2 = uncurryThis$4([].push);
var replace$3 = uncurryThis$4(''.replace);
var shift$1 = uncurryThis$4([].shift);
var splice = uncurryThis$4([].splice);
var split$1 = uncurryThis$4(''.split);
var stringSlice$4 = uncurryThis$4(''.slice);

var plus = /\+/g;
var sequences = Array(4);

var percentSequence = function (bytes) {
  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp$1('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
};

var percentDecode = function (sequence) {
  try {
    return decodeURIComponent(sequence);
  } catch (error) {
    return sequence;
  }
};

var deserialize = function (it) {
  var result = replace$3(it, plus, ' ');
  var bytes = 4;
  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = replace$3(result, percentSequence(bytes--), percentDecode);
    }
    return result;
  }
};

var find = /[!'()~]|%20/g;

var replacements = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+'
};

var replacer = function (match) {
  return replacements[match];
};

var serialize = function (it) {
  return replace$3(encodeURIComponent$1(it), find, replacer);
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  setInternalState$1(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    target: getInternalParamsState(params).entries,
    index: 0,
    kind: kind
  });
}, URL_SEARCH_PARAMS, function next() {
  var state = getInternalIteratorState(this);
  var target = state.target;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return createIterResultObject(undefined, true);
  }
  var entry = target[index];
  switch (state.kind) {
    case 'keys': return createIterResultObject(entry.key, false);
    case 'values': return createIterResultObject(entry.value, false);
  } return createIterResultObject([entry.key, entry.value], false);
}, true);

var URLSearchParamsState = function (init) {
  this.entries = [];
  this.url = null;

  if (init !== undefined) {
    if (isObject(init)) this.parseObject(init);
    else this.parseQuery(typeof init == 'string' ? charAt$4(init, 0) === '?' ? stringSlice$4(init, 1) : init : $toString$1(init));
  }
};

URLSearchParamsState.prototype = {
  type: URL_SEARCH_PARAMS,
  bindURL: function (url) {
    this.url = url;
    this.update();
  },
  parseObject: function (object) {
    var entries = this.entries;
    var iteratorMethod = getIteratorMethod(object);
    var iterator, next, step, entryIterator, entryNext, first, second;

    if (iteratorMethod) {
      iterator = getIterator(object, iteratorMethod);
      next = iterator.next;
      while (!(step = call$4(next, iterator)).done) {
        entryIterator = getIterator(anObject$2(step.value));
        entryNext = entryIterator.next;
        if (
          (first = call$4(entryNext, entryIterator)).done ||
          (second = call$4(entryNext, entryIterator)).done ||
          !call$4(entryNext, entryIterator).done
        ) throw new TypeError$2('Expected sequence with length 2');
        push$2(entries, { key: $toString$1(first.value), value: $toString$1(second.value) });
      }
    } else for (var key in object) if (hasOwn$1(object, key)) {
      push$2(entries, { key: key, value: $toString$1(object[key]) });
    }
  },
  parseQuery: function (query) {
    if (query) {
      var entries = this.entries;
      var attributes = split$1(query, '&');
      var index = 0;
      var attribute, entry;
      while (index < attributes.length) {
        attribute = attributes[index++];
        if (attribute.length) {
          entry = split$1(attribute, '=');
          push$2(entries, {
            key: deserialize(shift$1(entry)),
            value: deserialize(join$1(entry, '='))
          });
        }
      }
    }
  },
  serialize: function () {
    var entries = this.entries;
    var result = [];
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      push$2(result, serialize(entry.key) + '=' + serialize(entry.value));
    } return join$1(result, '&');
  },
  update: function () {
    this.entries.length = 0;
    this.parseQuery(this.url.query);
  },
  updateURL: function () {
    if (this.url) this.url.update();
  }
};

// `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams
var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
  anInstance$1(this, URLSearchParamsPrototype);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  var state = setInternalState$1(this, new URLSearchParamsState(init));
  if (!DESCRIPTORS$1) this.size = state.entries.length;
};

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

defineBuiltIns(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.append` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    var state = getInternalParamsState(this);
    validateArgumentsLength$1(arguments.length, 2);
    push$2(state.entries, { key: $toString$1(name), value: $toString$1(value) });
    if (!DESCRIPTORS$1) this.length++;
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function (name /* , value */) {
    var state = getInternalParamsState(this);
    var length = validateArgumentsLength$1(arguments.length, 1);
    var entries = state.entries;
    var key = $toString$1(name);
    var $value = length < 2 ? undefined : arguments[1];
    var value = $value === undefined ? $value : $toString$1($value);
    var index = 0;
    while (index < entries.length) {
      var entry = entries[index];
      if (entry.key === key && (value === undefined || entry.value === value)) {
        splice(entries, index, 1);
        if (value !== undefined) break;
      } else index++;
    }
    if (!DESCRIPTORS$1) this.size = entries.length;
    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get(name) {
    var entries = getInternalParamsState(this).entries;
    validateArgumentsLength$1(arguments.length, 1);
    var key = $toString$1(name);
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    var entries = getInternalParamsState(this).entries;
    validateArgumentsLength$1(arguments.length, 1);
    var key = $toString$1(name);
    var result = [];
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) push$2(result, entries[index].value);
    }
    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name /* , value */) {
    var entries = getInternalParamsState(this).entries;
    var length = validateArgumentsLength$1(arguments.length, 1);
    var key = $toString$1(name);
    var $value = length < 2 ? undefined : arguments[1];
    var value = $value === undefined ? $value : $toString$1($value);
    var index = 0;
    while (index < entries.length) {
      var entry = entries[index++];
      if (entry.key === key && (value === undefined || entry.value === value)) return true;
    }
    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    var state = getInternalParamsState(this);
    validateArgumentsLength$1(arguments.length, 1);
    var entries = state.entries;
    var found = false;
    var key = $toString$1(name);
    var val = $toString$1(value);
    var index = 0;
    var entry;
    for (; index < entries.length; index++) {
      entry = entries[index];
      if (entry.key === key) {
        if (found) splice(entries, index--, 1);
        else {
          found = true;
          entry.value = val;
        }
      }
    }
    if (!found) push$2(entries, { key: key, value: val });
    if (!DESCRIPTORS$1) this.size = entries.length;
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort() {
    var state = getInternalParamsState(this);
    arraySort(state.entries, function (a, b) {
      return a.key > b.key ? 1 : -1;
    });
    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach(callback /* , thisArg */) {
    var entries = getInternalParamsState(this).entries;
    var boundFunction = bind$1(callback, arguments.length > 1 ? arguments[1] : undefined);
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys() {
    return new URLSearchParamsIterator(this, 'keys');
  },
  // `URLSearchParams.prototype.values` method
  values: function values() {
    return new URLSearchParamsIterator(this, 'values');
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries() {
    return new URLSearchParamsIterator(this, 'entries');
  }
}, { enumerable: true });

// `URLSearchParams.prototype[@@iterator]` method
defineBuiltIn$2(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries, { name: 'entries' });

// `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
defineBuiltIn$2(URLSearchParamsPrototype, 'toString', function toString() {
  return getInternalParamsState(this).serialize();
}, { enumerable: true });

// `URLSearchParams.prototype.size` getter
// https://github.com/whatwg/url/pull/734
if (DESCRIPTORS$1) defineBuiltInAccessor$1(URLSearchParamsPrototype, 'size', {
  get: function size() {
    return getInternalParamsState(this).entries.length;
  },
  configurable: true,
  enumerable: true
});

setToStringTag$1(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

$$2({ global: true, constructor: true, forced: !USE_NATIVE_URL$1 }, {
  URLSearchParams: URLSearchParamsConstructor
});

// Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
if (!USE_NATIVE_URL$1 && isCallable$2(Headers)) {
  var headersHas = uncurryThis$4(HeadersPrototype.has);
  var headersSet = uncurryThis$4(HeadersPrototype.set);

  var wrapRequestOptions = function (init) {
    if (isObject(init)) {
      var body = init.body;
      var headers;
      if (classof$1(body) === URL_SEARCH_PARAMS) {
        headers = init.headers ? new Headers(init.headers) : new Headers();
        if (!headersHas(headers, 'content-type')) {
          headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
        return create$1(init, {
          body: createPropertyDescriptor(0, $toString$1(body)),
          headers: createPropertyDescriptor(0, headers)
        });
      }
    } return init;
  };

  if (isCallable$2(nativeFetch)) {
    $$2({ global: true, enumerable: true, dontCallGetSet: true, forced: true }, {
      fetch: function fetch(input /* , init */) {
        return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
      }
    });
  }

  if (isCallable$2(NativeRequest)) {
    var RequestConstructor = function Request(input /* , init */) {
      anInstance$1(this, RequestPrototype);
      return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
    };

    RequestPrototype.constructor = RequestConstructor;
    RequestConstructor.prototype = RequestPrototype;

    $$2({ global: true, constructor: true, dontCallGetSet: true, forced: true }, {
      Request: RequestConstructor
    });
  }
}

var web_urlSearchParams_constructor = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

var $$1 = _export;
var DESCRIPTORS = descriptors;
var USE_NATIVE_URL = urlConstructorDetection;
var global$4 = global$n;
var bind = functionBindContext;
var uncurryThis$3 = functionUncurryThis;
var defineBuiltIn$1 = defineBuiltIn$a;
var defineBuiltInAccessor = defineBuiltInAccessor$3;
var anInstance = anInstance$3;
var hasOwn = hasOwnProperty_1;
var assign = objectAssign;
var arrayFrom = arrayFrom$1;
var arraySlice = arraySlice$3;
var codeAt = stringMultibyte.codeAt;
var toASCII = stringPunycodeToAscii;
var $toString = toString$4;
var setToStringTag = setToStringTag$6;
var validateArgumentsLength = validateArgumentsLength$3;
var URLSearchParamsModule = web_urlSearchParams_constructor;
var InternalStateModule = internalState;

var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor('URL');
var URLSearchParams$1 = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;

var NativeURL = global$4.URL;
var TypeError$1 = global$4.TypeError;
var parseInt = global$4.parseInt;
var floor$1 = Math.floor;
var pow = Math.pow;
var charAt$3 = uncurryThis$3(''.charAt);
var exec$1 = uncurryThis$3(/./.exec);
var join = uncurryThis$3([].join);
var numberToString = uncurryThis$3(1.0.toString);
var pop = uncurryThis$3([].pop);
var push$1 = uncurryThis$3([].push);
var replace$2 = uncurryThis$3(''.replace);
var shift = uncurryThis$3([].shift);
var split = uncurryThis$3(''.split);
var stringSlice$3 = uncurryThis$3(''.slice);
var toLowerCase = uncurryThis$3(''.toLowerCase);
var unshift = uncurryThis$3([].unshift);

var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';

var ALPHA = /[a-z]/i;
// eslint-disable-next-line regexp/no-obscure-range -- safe
var ALPHANUMERIC = /[\d+-.a-z]/i;
var DIGIT = /\d/;
var HEX_START = /^0x/i;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\da-f]+$/i;
/* eslint-disable regexp/no-control-character -- safe */
var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
var LEADING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+/;
var TRAILING_C0_CONTROL_OR_SPACE = /(^|[^\u0000-\u0020])[\u0000-\u0020]+$/;
var TAB_AND_NEW_LINE = /[\t\n\r]/g;
/* eslint-enable regexp/no-control-character -- safe */
var EOF;

// https://url.spec.whatwg.org/#ipv4-number-parser
var parseIPv4 = function (input) {
  var parts = split(input, '.');
  var partsLength, numbers, index, part, radix, number, ipv4;
  if (parts.length && parts[parts.length - 1] === '') {
    parts.length--;
  }
  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];
  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part === '') return input;
    radix = 10;
    if (part.length > 1 && charAt$3(part, 0) === '0') {
      radix = exec$1(HEX_START, part) ? 16 : 8;
      part = stringSlice$3(part, radix === 8 ? 1 : 2);
    }
    if (part === '') {
      number = 0;
    } else {
      if (!exec$1(radix === 10 ? DEC : radix === 8 ? OCT : HEX, part)) return input;
      number = parseInt(part, radix);
    }
    push$1(numbers, number);
  }
  for (index = 0; index < partsLength; index++) {
    number = numbers[index];
    if (index === partsLength - 1) {
      if (number >= pow(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }
  ipv4 = pop(numbers);
  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow(256, 3 - index);
  }
  return ipv4;
};

// https://url.spec.whatwg.org/#concept-ipv6-parser
// eslint-disable-next-line max-statements -- TODO
var parseIPv6 = function (input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var chr = function () {
    return charAt$3(input, pointer);
  };

  if (chr() === ':') {
    if (charAt$3(input, 1) !== ':') return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }
  while (chr()) {
    if (pieceIndex === 8) return;
    if (chr() === ':') {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }
    value = length = 0;
    while (length < 4 && exec$1(HEX, chr())) {
      value = value * 16 + parseInt(chr(), 16);
      pointer++;
      length++;
    }
    if (chr() === '.') {
      if (length === 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;
      while (chr()) {
        ipv4Piece = null;
        if (numbersSeen > 0) {
          if (chr() === '.' && numbersSeen < 4) pointer++;
          else return;
        }
        if (!exec$1(DIGIT, chr())) return;
        while (exec$1(DIGIT, chr())) {
          number = parseInt(chr(), 10);
          if (ipv4Piece === null) ipv4Piece = number;
          else if (ipv4Piece === 0) return;
          else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }
        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen === 2 || numbersSeen === 4) pieceIndex++;
      }
      if (numbersSeen !== 4) return;
      break;
    } else if (chr() === ':') {
      pointer++;
      if (!chr()) return;
    } else if (chr()) return;
    address[pieceIndex++] = value;
  }
  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex !== 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex !== 8) return;
  return address;
};

var findLongestZeroSequence = function (ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;
  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }
      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }
  if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
  }
  return maxIndex;
};

// https://url.spec.whatwg.org/#host-serializing
var serializeHost = function (host) {
  var result, index, compress, ignore0;
  // ipv4
  if (typeof host == 'number') {
    result = [];
    for (index = 0; index < 4; index++) {
      unshift(result, host % 256);
      host = floor$1(host / 256);
    } return join(result, '.');
  // ipv6
  } else if (typeof host == 'object') {
    result = '';
    compress = findLongestZeroSequence(host);
    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;
      if (compress === index) {
        result += index ? ':' : '::';
        ignore0 = true;
      } else {
        result += numberToString(host[index], 16);
        if (index < 7) result += ':';
      }
    }
    return '[' + result + ']';
  } return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
});
var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
  '#': 1, '?': 1, '{': 1, '}': 1
});
var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
});

var percentEncode = function (chr, set) {
  var code = codeAt(chr, 0);
  return code > 0x20 && code < 0x7F && !hasOwn(set, chr) ? chr : encodeURIComponent(chr);
};

// https://url.spec.whatwg.org/#special-scheme
var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

// https://url.spec.whatwg.org/#windows-drive-letter
var isWindowsDriveLetter = function (string, normalized) {
  var second;
  return string.length === 2 && exec$1(ALPHA, charAt$3(string, 0))
    && ((second = charAt$3(string, 1)) === ':' || (!normalized && second === '|'));
};

// https://url.spec.whatwg.org/#start-with-a-windows-drive-letter
var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(stringSlice$3(string, 0, 2)) && (
    string.length === 2 ||
    ((third = charAt$3(string, 2)) === '/' || third === '\\' || third === '?' || third === '#')
  );
};

// https://url.spec.whatwg.org/#single-dot-path-segment
var isSingleDot = function (segment) {
  return segment === '.' || toLowerCase(segment) === '%2e';
};

// https://url.spec.whatwg.org/#double-dot-path-segment
var isDoubleDot = function (segment) {
  segment = toLowerCase(segment);
  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
};

// States:
var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {};

var URLState = function (url, isBase, base) {
  var urlString = $toString(url);
  var baseState, failure, searchParams;
  if (isBase) {
    failure = this.parse(urlString);
    if (failure) throw new TypeError$1(failure);
    this.searchParams = null;
  } else {
    if (base !== undefined) baseState = new URLState(base, true);
    failure = this.parse(urlString, null, baseState);
    if (failure) throw new TypeError$1(failure);
    searchParams = getInternalSearchParamsState(new URLSearchParams$1());
    searchParams.bindURL(this);
    this.searchParams = searchParams;
  }
};

URLState.prototype = {
  type: 'URL',
  // https://url.spec.whatwg.org/#url-parsing
  // eslint-disable-next-line max-statements -- TODO
  parse: function (input, stateOverride, base) {
    var url = this;
    var state = stateOverride || SCHEME_START;
    var pointer = 0;
    var buffer = '';
    var seenAt = false;
    var seenBracket = false;
    var seenPasswordToken = false;
    var codePoints, chr, bufferCodePoints, failure;

    input = $toString(input);

    if (!stateOverride) {
      url.scheme = '';
      url.username = '';
      url.password = '';
      url.host = null;
      url.port = null;
      url.path = [];
      url.query = null;
      url.fragment = null;
      url.cannotBeABaseURL = false;
      input = replace$2(input, LEADING_C0_CONTROL_OR_SPACE, '');
      input = replace$2(input, TRAILING_C0_CONTROL_OR_SPACE, '$1');
    }

    input = replace$2(input, TAB_AND_NEW_LINE, '');

    codePoints = arrayFrom(input);

    while (pointer <= codePoints.length) {
      chr = codePoints[pointer];
      switch (state) {
        case SCHEME_START:
          if (chr && exec$1(ALPHA, chr)) {
            buffer += toLowerCase(chr);
            state = SCHEME;
          } else if (!stateOverride) {
            state = NO_SCHEME;
            continue;
          } else return INVALID_SCHEME;
          break;

        case SCHEME:
          if (chr && (exec$1(ALPHANUMERIC, chr) || chr === '+' || chr === '-' || chr === '.')) {
            buffer += toLowerCase(chr);
          } else if (chr === ':') {
            if (stateOverride && (
              (url.isSpecial() !== hasOwn(specialSchemes, buffer)) ||
              (buffer === 'file' && (url.includesCredentials() || url.port !== null)) ||
              (url.scheme === 'file' && !url.host)
            )) return;
            url.scheme = buffer;
            if (stateOverride) {
              if (url.isSpecial() && specialSchemes[url.scheme] === url.port) url.port = null;
              return;
            }
            buffer = '';
            if (url.scheme === 'file') {
              state = FILE;
            } else if (url.isSpecial() && base && base.scheme === url.scheme) {
              state = SPECIAL_RELATIVE_OR_AUTHORITY;
            } else if (url.isSpecial()) {
              state = SPECIAL_AUTHORITY_SLASHES;
            } else if (codePoints[pointer + 1] === '/') {
              state = PATH_OR_AUTHORITY;
              pointer++;
            } else {
              url.cannotBeABaseURL = true;
              push$1(url.path, '');
              state = CANNOT_BE_A_BASE_URL_PATH;
            }
          } else if (!stateOverride) {
            buffer = '';
            state = NO_SCHEME;
            pointer = 0;
            continue;
          } else return INVALID_SCHEME;
          break;

        case NO_SCHEME:
          if (!base || (base.cannotBeABaseURL && chr !== '#')) return INVALID_SCHEME;
          if (base.cannotBeABaseURL && chr === '#') {
            url.scheme = base.scheme;
            url.path = arraySlice(base.path);
            url.query = base.query;
            url.fragment = '';
            url.cannotBeABaseURL = true;
            state = FRAGMENT;
            break;
          }
          state = base.scheme === 'file' ? FILE : RELATIVE;
          continue;

        case SPECIAL_RELATIVE_OR_AUTHORITY:
          if (chr === '/' && codePoints[pointer + 1] === '/') {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
            pointer++;
          } else {
            state = RELATIVE;
            continue;
          } break;

        case PATH_OR_AUTHORITY:
          if (chr === '/') {
            state = AUTHORITY;
            break;
          } else {
            state = PATH;
            continue;
          }

        case RELATIVE:
          url.scheme = base.scheme;
          if (chr === EOF) {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = base.query;
          } else if (chr === '/' || (chr === '\\' && url.isSpecial())) {
            state = RELATIVE_SLASH;
          } else if (chr === '?') {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = '';
            state = QUERY;
          } else if (chr === '#') {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.path.length--;
            state = PATH;
            continue;
          } break;

        case RELATIVE_SLASH:
          if (url.isSpecial() && (chr === '/' || chr === '\\')) {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          } else if (chr === '/') {
            state = AUTHORITY;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            state = PATH;
            continue;
          } break;

        case SPECIAL_AUTHORITY_SLASHES:
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          if (chr !== '/' || charAt$3(buffer, pointer + 1) !== '/') continue;
          pointer++;
          break;

        case SPECIAL_AUTHORITY_IGNORE_SLASHES:
          if (chr !== '/' && chr !== '\\') {
            state = AUTHORITY;
            continue;
          } break;

        case AUTHORITY:
          if (chr === '@') {
            if (seenAt) buffer = '%40' + buffer;
            seenAt = true;
            bufferCodePoints = arrayFrom(buffer);
            for (var i = 0; i < bufferCodePoints.length; i++) {
              var codePoint = bufferCodePoints[i];
              if (codePoint === ':' && !seenPasswordToken) {
                seenPasswordToken = true;
                continue;
              }
              var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
              if (seenPasswordToken) url.password += encodedCodePoints;
              else url.username += encodedCodePoints;
            }
            buffer = '';
          } else if (
            chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
            (chr === '\\' && url.isSpecial())
          ) {
            if (seenAt && buffer === '') return INVALID_AUTHORITY;
            pointer -= arrayFrom(buffer).length + 1;
            buffer = '';
            state = HOST;
          } else buffer += chr;
          break;

        case HOST:
        case HOSTNAME:
          if (stateOverride && url.scheme === 'file') {
            state = FILE_HOST;
            continue;
          } else if (chr === ':' && !seenBracket) {
            if (buffer === '') return INVALID_HOST;
            failure = url.parseHost(buffer);
            if (failure) return failure;
            buffer = '';
            state = PORT;
            if (stateOverride === HOSTNAME) return;
          } else if (
            chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
            (chr === '\\' && url.isSpecial())
          ) {
            if (url.isSpecial() && buffer === '') return INVALID_HOST;
            if (stateOverride && buffer === '' && (url.includesCredentials() || url.port !== null)) return;
            failure = url.parseHost(buffer);
            if (failure) return failure;
            buffer = '';
            state = PATH_START;
            if (stateOverride) return;
            continue;
          } else {
            if (chr === '[') seenBracket = true;
            else if (chr === ']') seenBracket = false;
            buffer += chr;
          } break;

        case PORT:
          if (exec$1(DIGIT, chr)) {
            buffer += chr;
          } else if (
            chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
            (chr === '\\' && url.isSpecial()) ||
            stateOverride
          ) {
            if (buffer !== '') {
              var port = parseInt(buffer, 10);
              if (port > 0xFFFF) return INVALID_PORT;
              url.port = (url.isSpecial() && port === specialSchemes[url.scheme]) ? null : port;
              buffer = '';
            }
            if (stateOverride) return;
            state = PATH_START;
            continue;
          } else return INVALID_PORT;
          break;

        case FILE:
          url.scheme = 'file';
          if (chr === '/' || chr === '\\') state = FILE_SLASH;
          else if (base && base.scheme === 'file') {
            switch (chr) {
              case EOF:
                url.host = base.host;
                url.path = arraySlice(base.path);
                url.query = base.query;
                break;
              case '?':
                url.host = base.host;
                url.path = arraySlice(base.path);
                url.query = '';
                state = QUERY;
                break;
              case '#':
                url.host = base.host;
                url.path = arraySlice(base.path);
                url.query = base.query;
                url.fragment = '';
                state = FRAGMENT;
                break;
              default:
                if (!startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
                  url.host = base.host;
                  url.path = arraySlice(base.path);
                  url.shortenPath();
                }
                state = PATH;
                continue;
            }
          } else {
            state = PATH;
            continue;
          } break;

        case FILE_SLASH:
          if (chr === '/' || chr === '\\') {
            state = FILE_HOST;
            break;
          }
          if (base && base.scheme === 'file' && !startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
            if (isWindowsDriveLetter(base.path[0], true)) push$1(url.path, base.path[0]);
            else url.host = base.host;
          }
          state = PATH;
          continue;

        case FILE_HOST:
          if (chr === EOF || chr === '/' || chr === '\\' || chr === '?' || chr === '#') {
            if (!stateOverride && isWindowsDriveLetter(buffer)) {
              state = PATH;
            } else if (buffer === '') {
              url.host = '';
              if (stateOverride) return;
              state = PATH_START;
            } else {
              failure = url.parseHost(buffer);
              if (failure) return failure;
              if (url.host === 'localhost') url.host = '';
              if (stateOverride) return;
              buffer = '';
              state = PATH_START;
            } continue;
          } else buffer += chr;
          break;

        case PATH_START:
          if (url.isSpecial()) {
            state = PATH;
            if (chr !== '/' && chr !== '\\') continue;
          } else if (!stateOverride && chr === '?') {
            url.query = '';
            state = QUERY;
          } else if (!stateOverride && chr === '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr !== EOF) {
            state = PATH;
            if (chr !== '/') continue;
          } break;

        case PATH:
          if (
            chr === EOF || chr === '/' ||
            (chr === '\\' && url.isSpecial()) ||
            (!stateOverride && (chr === '?' || chr === '#'))
          ) {
            if (isDoubleDot(buffer)) {
              url.shortenPath();
              if (chr !== '/' && !(chr === '\\' && url.isSpecial())) {
                push$1(url.path, '');
              }
            } else if (isSingleDot(buffer)) {
              if (chr !== '/' && !(chr === '\\' && url.isSpecial())) {
                push$1(url.path, '');
              }
            } else {
              if (url.scheme === 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
                if (url.host) url.host = '';
                buffer = charAt$3(buffer, 0) + ':'; // normalize windows drive letter
              }
              push$1(url.path, buffer);
            }
            buffer = '';
            if (url.scheme === 'file' && (chr === EOF || chr === '?' || chr === '#')) {
              while (url.path.length > 1 && url.path[0] === '') {
                shift(url.path);
              }
            }
            if (chr === '?') {
              url.query = '';
              state = QUERY;
            } else if (chr === '#') {
              url.fragment = '';
              state = FRAGMENT;
            }
          } else {
            buffer += percentEncode(chr, pathPercentEncodeSet);
          } break;

        case CANNOT_BE_A_BASE_URL_PATH:
          if (chr === '?') {
            url.query = '';
            state = QUERY;
          } else if (chr === '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr !== EOF) {
            url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
          } break;

        case QUERY:
          if (!stateOverride && chr === '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr !== EOF) {
            if (chr === "'" && url.isSpecial()) url.query += '%27';
            else if (chr === '#') url.query += '%23';
            else url.query += percentEncode(chr, C0ControlPercentEncodeSet);
          } break;

        case FRAGMENT:
          if (chr !== EOF) url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
          break;
      }

      pointer++;
    }
  },
  // https://url.spec.whatwg.org/#host-parsing
  parseHost: function (input) {
    var result, codePoints, index;
    if (charAt$3(input, 0) === '[') {
      if (charAt$3(input, input.length - 1) !== ']') return INVALID_HOST;
      result = parseIPv6(stringSlice$3(input, 1, -1));
      if (!result) return INVALID_HOST;
      this.host = result;
    // opaque host
    } else if (!this.isSpecial()) {
      if (exec$1(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input)) return INVALID_HOST;
      result = '';
      codePoints = arrayFrom(input);
      for (index = 0; index < codePoints.length; index++) {
        result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
      }
      this.host = result;
    } else {
      input = toASCII(input);
      if (exec$1(FORBIDDEN_HOST_CODE_POINT, input)) return INVALID_HOST;
      result = parseIPv4(input);
      if (result === null) return INVALID_HOST;
      this.host = result;
    }
  },
  // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
  cannotHaveUsernamePasswordPort: function () {
    return !this.host || this.cannotBeABaseURL || this.scheme === 'file';
  },
  // https://url.spec.whatwg.org/#include-credentials
  includesCredentials: function () {
    return this.username !== '' || this.password !== '';
  },
  // https://url.spec.whatwg.org/#is-special
  isSpecial: function () {
    return hasOwn(specialSchemes, this.scheme);
  },
  // https://url.spec.whatwg.org/#shorten-a-urls-path
  shortenPath: function () {
    var path = this.path;
    var pathSize = path.length;
    if (pathSize && (this.scheme !== 'file' || pathSize !== 1 || !isWindowsDriveLetter(path[0], true))) {
      path.length--;
    }
  },
  // https://url.spec.whatwg.org/#concept-url-serializer
  serialize: function () {
    var url = this;
    var scheme = url.scheme;
    var username = url.username;
    var password = url.password;
    var host = url.host;
    var port = url.port;
    var path = url.path;
    var query = url.query;
    var fragment = url.fragment;
    var output = scheme + ':';
    if (host !== null) {
      output += '//';
      if (url.includesCredentials()) {
        output += username + (password ? ':' + password : '') + '@';
      }
      output += serializeHost(host);
      if (port !== null) output += ':' + port;
    } else if (scheme === 'file') output += '//';
    output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
    if (query !== null) output += '?' + query;
    if (fragment !== null) output += '#' + fragment;
    return output;
  },
  // https://url.spec.whatwg.org/#dom-url-href
  setHref: function (href) {
    var failure = this.parse(href);
    if (failure) throw new TypeError$1(failure);
    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-origin
  getOrigin: function () {
    var scheme = this.scheme;
    var port = this.port;
    if (scheme === 'blob') try {
      return new URLConstructor(scheme.path[0]).origin;
    } catch (error) {
      return 'null';
    }
    if (scheme === 'file' || !this.isSpecial()) return 'null';
    return scheme + '://' + serializeHost(this.host) + (port !== null ? ':' + port : '');
  },
  // https://url.spec.whatwg.org/#dom-url-protocol
  getProtocol: function () {
    return this.scheme + ':';
  },
  setProtocol: function (protocol) {
    this.parse($toString(protocol) + ':', SCHEME_START);
  },
  // https://url.spec.whatwg.org/#dom-url-username
  getUsername: function () {
    return this.username;
  },
  setUsername: function (username) {
    var codePoints = arrayFrom($toString(username));
    if (this.cannotHaveUsernamePasswordPort()) return;
    this.username = '';
    for (var i = 0; i < codePoints.length; i++) {
      this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-password
  getPassword: function () {
    return this.password;
  },
  setPassword: function (password) {
    var codePoints = arrayFrom($toString(password));
    if (this.cannotHaveUsernamePasswordPort()) return;
    this.password = '';
    for (var i = 0; i < codePoints.length; i++) {
      this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-host
  getHost: function () {
    var host = this.host;
    var port = this.port;
    return host === null ? ''
      : port === null ? serializeHost(host)
      : serializeHost(host) + ':' + port;
  },
  setHost: function (host) {
    if (this.cannotBeABaseURL) return;
    this.parse(host, HOST);
  },
  // https://url.spec.whatwg.org/#dom-url-hostname
  getHostname: function () {
    var host = this.host;
    return host === null ? '' : serializeHost(host);
  },
  setHostname: function (hostname) {
    if (this.cannotBeABaseURL) return;
    this.parse(hostname, HOSTNAME);
  },
  // https://url.spec.whatwg.org/#dom-url-port
  getPort: function () {
    var port = this.port;
    return port === null ? '' : $toString(port);
  },
  setPort: function (port) {
    if (this.cannotHaveUsernamePasswordPort()) return;
    port = $toString(port);
    if (port === '') this.port = null;
    else this.parse(port, PORT);
  },
  // https://url.spec.whatwg.org/#dom-url-pathname
  getPathname: function () {
    var path = this.path;
    return this.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
  },
  setPathname: function (pathname) {
    if (this.cannotBeABaseURL) return;
    this.path = [];
    this.parse(pathname, PATH_START);
  },
  // https://url.spec.whatwg.org/#dom-url-search
  getSearch: function () {
    var query = this.query;
    return query ? '?' + query : '';
  },
  setSearch: function (search) {
    search = $toString(search);
    if (search === '') {
      this.query = null;
    } else {
      if (charAt$3(search, 0) === '?') search = stringSlice$3(search, 1);
      this.query = '';
      this.parse(search, QUERY);
    }
    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-searchparams
  getSearchParams: function () {
    return this.searchParams.facade;
  },
  // https://url.spec.whatwg.org/#dom-url-hash
  getHash: function () {
    var fragment = this.fragment;
    return fragment ? '#' + fragment : '';
  },
  setHash: function (hash) {
    hash = $toString(hash);
    if (hash === '') {
      this.fragment = null;
      return;
    }
    if (charAt$3(hash, 0) === '#') hash = stringSlice$3(hash, 1);
    this.fragment = '';
    this.parse(hash, FRAGMENT);
  },
  update: function () {
    this.query = this.searchParams.serialize() || null;
  }
};

// `URL` constructor
// https://url.spec.whatwg.org/#url-class
var URLConstructor = function URL(url /* , base */) {
  var that = anInstance(this, URLPrototype);
  var base = validateArgumentsLength(arguments.length, 1) > 1 ? arguments[1] : undefined;
  var state = setInternalState(that, new URLState(url, false, base));
  if (!DESCRIPTORS) {
    that.href = state.serialize();
    that.origin = state.getOrigin();
    that.protocol = state.getProtocol();
    that.username = state.getUsername();
    that.password = state.getPassword();
    that.host = state.getHost();
    that.hostname = state.getHostname();
    that.port = state.getPort();
    that.pathname = state.getPathname();
    that.search = state.getSearch();
    that.searchParams = state.getSearchParams();
    that.hash = state.getHash();
  }
};

var URLPrototype = URLConstructor.prototype;

var accessorDescriptor = function (getter, setter) {
  return {
    get: function () {
      return getInternalURLState(this)[getter]();
    },
    set: setter && function (value) {
      return getInternalURLState(this)[setter](value);
    },
    configurable: true,
    enumerable: true
  };
};

if (DESCRIPTORS) {
  // `URL.prototype.href` accessors pair
  // https://url.spec.whatwg.org/#dom-url-href
  defineBuiltInAccessor(URLPrototype, 'href', accessorDescriptor('serialize', 'setHref'));
  // `URL.prototype.origin` getter
  // https://url.spec.whatwg.org/#dom-url-origin
  defineBuiltInAccessor(URLPrototype, 'origin', accessorDescriptor('getOrigin'));
  // `URL.prototype.protocol` accessors pair
  // https://url.spec.whatwg.org/#dom-url-protocol
  defineBuiltInAccessor(URLPrototype, 'protocol', accessorDescriptor('getProtocol', 'setProtocol'));
  // `URL.prototype.username` accessors pair
  // https://url.spec.whatwg.org/#dom-url-username
  defineBuiltInAccessor(URLPrototype, 'username', accessorDescriptor('getUsername', 'setUsername'));
  // `URL.prototype.password` accessors pair
  // https://url.spec.whatwg.org/#dom-url-password
  defineBuiltInAccessor(URLPrototype, 'password', accessorDescriptor('getPassword', 'setPassword'));
  // `URL.prototype.host` accessors pair
  // https://url.spec.whatwg.org/#dom-url-host
  defineBuiltInAccessor(URLPrototype, 'host', accessorDescriptor('getHost', 'setHost'));
  // `URL.prototype.hostname` accessors pair
  // https://url.spec.whatwg.org/#dom-url-hostname
  defineBuiltInAccessor(URLPrototype, 'hostname', accessorDescriptor('getHostname', 'setHostname'));
  // `URL.prototype.port` accessors pair
  // https://url.spec.whatwg.org/#dom-url-port
  defineBuiltInAccessor(URLPrototype, 'port', accessorDescriptor('getPort', 'setPort'));
  // `URL.prototype.pathname` accessors pair
  // https://url.spec.whatwg.org/#dom-url-pathname
  defineBuiltInAccessor(URLPrototype, 'pathname', accessorDescriptor('getPathname', 'setPathname'));
  // `URL.prototype.search` accessors pair
  // https://url.spec.whatwg.org/#dom-url-search
  defineBuiltInAccessor(URLPrototype, 'search', accessorDescriptor('getSearch', 'setSearch'));
  // `URL.prototype.searchParams` getter
  // https://url.spec.whatwg.org/#dom-url-searchparams
  defineBuiltInAccessor(URLPrototype, 'searchParams', accessorDescriptor('getSearchParams'));
  // `URL.prototype.hash` accessors pair
  // https://url.spec.whatwg.org/#dom-url-hash
  defineBuiltInAccessor(URLPrototype, 'hash', accessorDescriptor('getHash', 'setHash'));
}

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
defineBuiltIn$1(URLPrototype, 'toJSON', function toJSON() {
  return getInternalURLState(this).serialize();
}, { enumerable: true });

// `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior
defineBuiltIn$1(URLPrototype, 'toString', function toString() {
  return getInternalURLState(this).serialize();
}, { enumerable: true });

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
  // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  if (nativeCreateObjectURL) defineBuiltIn$1(URLConstructor, 'createObjectURL', bind(nativeCreateObjectURL, NativeURL));
  // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  if (nativeRevokeObjectURL) defineBuiltIn$1(URLConstructor, 'revokeObjectURL', bind(nativeRevokeObjectURL, NativeURL));
}

setToStringTag(URLConstructor, 'URL');

$$1({ global: true, constructor: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
  URL: URLConstructor
});

var fails$4 = fails$k;
var global$3 = global$n;

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp$2 = global$3.RegExp;

var UNSUPPORTED_Y$1 = fails$4(function () {
  var re = $RegExp$2('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') !== null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY = UNSUPPORTED_Y$1 || fails$4(function () {
  return !$RegExp$2('a', 'y').sticky;
});

var BROKEN_CARET = UNSUPPORTED_Y$1 || fails$4(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp$2('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') !== null;
});

var regexpStickyHelpers = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y$1
};

var fails$3 = fails$k;
var global$2 = global$n;

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp$1 = global$2.RegExp;

var regexpUnsupportedDotAll = fails$3(function () {
  var re = $RegExp$1('.', 's');
  return !(re.dotAll && re.test('\n') && re.flags === 's');
});

var fails$2 = fails$k;
var global$1 = global$n;

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global$1.RegExp;

var regexpUnsupportedNcg = fails$2(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call$3 = functionCall;
var uncurryThis$2 = functionUncurryThis;
var toString$1 = toString$4;
var regexpFlags = regexpFlags$1;
var stickyHelpers = regexpStickyHelpers;
var shared = shared$4;
var create = objectCreate;
var getInternalState = internalState.get;
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG = regexpUnsupportedNcg;

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt$2 = uncurryThis$2(''.charAt);
var indexOf = uncurryThis$2(''.indexOf);
var replace$1 = uncurryThis$2(''.replace);
var stringSlice$2 = uncurryThis$2(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call$3(nativeExec, re1, 'a');
  call$3(nativeExec, re2, 'a');
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
    var str = toString$1(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call$3(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call$3(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace$1(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice$2(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$2(str, re.lastIndex - 1) !== '\n')) {
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

    match = call$3(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice$2(match.input, charsAdded);
        match[0] = stringSlice$2(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
      call$3(nativeReplace, match[0], reCopy, function () {
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

var regexpExec$2 = patchedExec;

var $ = _export;
var exec = regexpExec$2;

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});

// TODO: Remove from `core-js@4` since it's moved to entry points

var call$2 = functionCall;
var defineBuiltIn = defineBuiltIn$a;
var regexpExec$1 = regexpExec$2;
var fails$1 = fails$k;
var wellKnownSymbol$1 = wellKnownSymbol$i;
var createNonEnumerableProperty = createNonEnumerableProperty$5;

var SPECIES = wellKnownSymbol$1('species');
var RegExpPrototype = RegExp.prototype;

var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol$1(KEY);

  var DELEGATES_TO_SYMBOL = !fails$1(function () {
    // String methods call symbol-named RegExp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) !== 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$1(function () {
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
      re.constructor[SPECIES] = function () { return re; };
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

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var $exec = regexp.exec;
      if ($exec === regexpExec$1 || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: call$2(nativeRegExpMethod, regexp, str, arg2) };
        }
        return { done: true, value: call$2(nativeMethod, str, regexp, arg2) };
      }
      return { done: false };
    });

    defineBuiltIn(String.prototype, KEY, methods[0]);
    defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};

var charAt$1 = stringMultibyte.charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
var advanceStringIndex$1 = function (S, index, unicode) {
  return index + (unicode ? charAt$1(S, index).length : 1);
};

var uncurryThis$1 = functionUncurryThis;
var toObject = toObject$5;

var floor = Math.floor;
var charAt = uncurryThis$1(''.charAt);
var replace = uncurryThis$1(''.replace);
var stringSlice$1 = uncurryThis$1(''.slice);
// eslint-disable-next-line redos/no-vulnerable -- safe
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
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
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice$1(str, 0, position);
      case "'": return stringSlice$1(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice$1(ch, 1, -1)];
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

var call$1 = functionCall;
var anObject$1 = anObject$f;
var isCallable$1 = isCallable$m;
var classof = classofRaw$2;
var regexpExec = regexpExec$2;

var $TypeError = TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (isCallable$1(exec)) {
    var result = call$1(exec, R, S);
    if (result !== null) anObject$1(result);
    return result;
  }
  if (classof(R) === 'RegExp') return call$1(regexpExec, R, S);
  throw new $TypeError('RegExp#exec called on incompatible receiver');
};

var apply = functionApply;
var call = functionCall;
var uncurryThis = functionUncurryThis;
var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
var fails = fails$k;
var anObject = anObject$f;
var isCallable = isCallable$m;
var isNullOrUndefined = isNullOrUndefined$5;
var toIntegerOrInfinity = toIntegerOrInfinity$4;
var toLength = toLength$2;
var toString = toString$4;
var requireObjectCoercible = requireObjectCoercible$5;
var advanceStringIndex = advanceStringIndex$1;
var getMethod = getMethod$4;
var getSubstitution = getSubstitution$1;
var regExpExec = regexpExecAbstract;
var wellKnownSymbol = wellKnownSymbol$i;

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
fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = isNullOrUndefined(searchValue) ? undefined : getMethod(searchValue, REPLACE);
      return replacer
        ? call(replacer, searchValue, O, replaceValue)
        : call(nativeReplace, toString(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject(this);
      var S = toString(string);

      if (
        typeof replaceValue == 'string' &&
        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
        stringIndexOf(replaceValue, '$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable(replaceValue);
      if (!functionalReplace) replaceValue = toString(replaceValue);

      var global = rx.global;
      var fullUnicode;
      if (global) {
        fullUnicode = rx.unicode;
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
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

/******************************************************************************
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

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var icon = `data:image/png;base64,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`;

const resolveWalletUrl = (network, walletUrl) => {
  if (walletUrl) {
    return walletUrl;
  }
  switch (network.networkId) {
    case "mainnet":
      return "https://mi.arepa.digital";
    case "testnet":
      return "https://testnet.arepa.digital";
    default:
      throw new Error("Invalid wallet url");
  }
};
const setupWalletState = (params, network) => __awaiter(void 0, void 0, void 0, function* () {
  const keyStore = new nearAPI__namespace.keyStores.BrowserLocalStorageKeyStore();
  const near = yield nearAPI__namespace.connect(Object.assign(Object.assign({
    keyStore,
    walletUrl: params.walletUrl
  }, network), {
    headers: {}
  }));
  const wallet = new nearAPI__namespace.WalletConnection(near, "near_app");
  return {
    wallet,
    keyStore
  };
});
const ArepaWallet = ({
  metadata,
  options,
  store,
  params,
  logger,
  id
}) => __awaiter(void 0, void 0, void 0, function* () {
  const _state = yield setupWalletState(params, options.network);
  const getAccounts = () => __awaiter(void 0, void 0, void 0, function* () {
    const accountId = _state.wallet.getAccountId();
    const account = _state.wallet.account();
    if (!accountId || !account) {
      return [];
    }
    const publicKey = yield account.connection.signer.getPublicKey(account.accountId, options.network.networkId);
    return [{
      accountId,
      publicKey: publicKey ? publicKey.toString() : ""
    }];
  });
  const transformTransactions = transactions => __awaiter(void 0, void 0, void 0, function* () {
    const account = _state.wallet.account();
    const {
      networkId,
      signer,
      provider
    } = account.connection;
    const localKey = yield signer.getPublicKey(account.accountId, networkId);
    return Promise.all(transactions.map((transaction, index) => __awaiter(void 0, void 0, void 0, function* () {
      const actions = transaction.actions.map(action => walletUtils.createAction(action));
      const accessKey = yield account.accessKeyForTransaction(transaction.receiverId, actions, localKey);
      if (!accessKey) {
        throw new Error(`Failed to find matching key for transaction sent to ${transaction.receiverId}`);
      }
      const block = yield provider.block({
        finality: "final"
      });
      return nearAPI__namespace.transactions.createTransaction(account.accountId, nearAPI__namespace.utils.PublicKey.from(accessKey.public_key), transaction.receiverId, accessKey.access_key.nonce + index + 1, actions, nearAPI__namespace.utils.serialize.base_decode(block.header.hash));
    })));
  });
  return {
    signIn({
      contractId,
      methodNames,
      successUrl,
      failureUrl
    }) {
      return __awaiter(this, void 0, void 0, function* () {
        const existingAccounts = yield getAccounts();
        if (existingAccounts.length) {
          return existingAccounts;
        }
        yield _state.wallet.requestSignIn({
          contractId,
          methodNames,
          successUrl,
          failureUrl
        });
        return getAccounts();
      });
    },
    signOut() {
      return __awaiter(this, void 0, void 0, function* () {
        if (_state.wallet.isSignedIn()) {
          _state.wallet.signOut();
        }
      });
    },
    getAccounts() {
      return __awaiter(this, void 0, void 0, function* () {
        return getAccounts();
      });
    },
    verifyOwner() {
      return __awaiter(this, void 0, void 0, function* () {
        throw new Error(`Method not supported by ${metadata.name}`);
      });
    },
    signMessage({
      message,
      nonce,
      recipient,
      callbackUrl,
      state
    }) {
      return __awaiter(this, void 0, void 0, function* () {
        logger.log("sign message", {
          message
        });
        if (id !== "arepa-wallet") {
          throw Error(`The signMessage method is not supported by ${metadata.name}`);
        }
        const locationUrl = typeof window !== "undefined" ? window.location.href : "";
        const url = callbackUrl || locationUrl;
        if (!url) {
          throw new Error(`The callbackUrl is missing for ${metadata.name}`);
        }
        const href = new URL(params.walletUrl);
        href.pathname = "sign-message";
        href.searchParams.append("message", message);
        href.searchParams.append("nonce", nonce.toString("base64"));
        href.searchParams.append("recipient", recipient);
        href.searchParams.append("callbackUrl", url);
        if (state) {
          href.searchParams.append("state", state);
        }
        window.location.replace(href.toString());
        return;
      });
    },
    signAndSendTransaction({
      signerId,
      receiverId,
      actions,
      callbackUrl
    }) {
      return __awaiter(this, void 0, void 0, function* () {
        logger.log("signAndSendTransaction", {
          signerId,
          receiverId,
          actions,
          callbackUrl
        });
        const {
          contract
        } = store.getState();
        if (!_state.wallet.isSignedIn() || !contract) {
          throw new Error("Wallet not signed in");
        }
        const account = _state.wallet.account();
        return account["signAndSendTransaction"]({
          receiverId: receiverId || contract.contractId,
          actions: actions.map(action => walletUtils.createAction(action)),
          walletCallbackUrl: callbackUrl
        });
      });
    },
    signAndSendTransactions({
      transactions,
      callbackUrl
    }) {
      return __awaiter(this, void 0, void 0, function* () {
        logger.log("signAndSendTransactions", {
          transactions,
          callbackUrl
        });
        if (!_state.wallet.isSignedIn()) {
          throw new Error("Wallet not signed in");
        }
        return _state.wallet.requestSignTransactions({
          transactions: yield transformTransactions(transactions),
          callbackUrl
        });
      });
    }
  };
});
function setupArepaWallet({
  walletUrl,
  iconUrl = icon,
  deprecated = false,
  successUrl = "",
  failureUrl = ""
} = {}) {
  return moduleOptions => __awaiter(this, void 0, void 0, function* () {
    return {
      id: "arepa-wallet",
      type: "browser",
      metadata: {
        name: "ArepaWallet",
        description: "NEAR wallet to store, buy, send and stake assets for DeFi.",
        iconUrl,
        deprecated,
        available: true,
        successUrl,
        failureUrl,
        walletUrl: resolveWalletUrl(moduleOptions.options.network, walletUrl)
      },
      init: options => {
        return ArepaWallet(Object.assign(Object.assign({}, options), {
          params: {
            walletUrl: resolveWalletUrl(options.options.network, walletUrl)
          }
        }));
      }
    };
  });
}

exports.setupArepaWallet = setupArepaWallet;
