System.register([], function (exports, module) {
	'use strict';
	return {
		execute: function () {

			exports('configure', configure);
			var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

			function unwrapExports (x) {
				return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
			}

			function createCommonjsModule(fn, module) {
				return module = { exports: {} }, fn(module, module.exports), module.exports;
			}

			var aureliaPal = createCommonjsModule(function (module, exports) {

			Object.defineProperty(exports, "__esModule", {
			  value: true
			});
			exports.AggregateError = AggregateError;
			exports.initializePAL = initializePAL;
			exports.reset = reset;
			function AggregateError(message, innerError, skipIfAlreadyAggregate) {
			  if (innerError) {
			    if (innerError.innerError && skipIfAlreadyAggregate) {
			      return innerError;
			    }

			    var separator = '\n------------------------------------------------\n';

			    message += separator + 'Inner Error:\n';

			    if (typeof innerError === 'string') {
			      message += 'Message: ' + innerError;
			    } else {
			      if (innerError.message) {
			        message += 'Message: ' + innerError.message;
			      } else {
			        message += 'Unknown Inner Error Type. Displaying Inner Error as JSON:\n ' + JSON.stringify(innerError, null, '  ');
			      }

			      if (innerError.stack) {
			        message += '\nInner Error Stack:\n' + innerError.stack;
			        message += '\nEnd Inner Error Stack';
			      }
			    }

			    message += separator;
			  }

			  var e = new Error(message);
			  if (innerError) {
			    e.innerError = innerError;
			  }

			  return e;
			}

			var FEATURE = exports.FEATURE = {};

			var PLATFORM = exports.PLATFORM = {
			  noop: function noop() {},
			  eachModule: function eachModule() {},
			  moduleName: function (_moduleName) {
			    function moduleName(_x) {
			      return _moduleName.apply(this, arguments);
			    }

			    moduleName.toString = function () {
			      return _moduleName.toString();
			    };

			    return moduleName;
			  }(function (moduleName) {
			    return moduleName;
			  })
			};

			PLATFORM.global = function () {
			  if (typeof self !== 'undefined') {
			    return self;
			  }

			  if (typeof commonjsGlobal !== 'undefined') {
			    return commonjsGlobal;
			  }

			  return new Function('return this')();
			}();

			var DOM = exports.DOM = {};
			var isInitialized = exports.isInitialized = false;
			function initializePAL(callback) {
			  if (isInitialized) {
			    return;
			  }
			  exports.isInitialized = isInitialized = true;
			  if (typeof Object.getPropertyDescriptor !== 'function') {
			    Object.getPropertyDescriptor = function (subject, name) {
			      var pd = Object.getOwnPropertyDescriptor(subject, name);
			      var proto = Object.getPrototypeOf(subject);
			      while (typeof pd === 'undefined' && proto !== null) {
			        pd = Object.getOwnPropertyDescriptor(proto, name);
			        proto = Object.getPrototypeOf(proto);
			      }
			      return pd;
			    };
			  }

			  callback(PLATFORM, FEATURE, DOM);
			}
			function reset() {
			  exports.isInitialized = isInitialized = false;
			}
			});

			unwrapExports(aureliaPal);
			var aureliaPal_1 = aureliaPal.AggregateError;
			var aureliaPal_2 = aureliaPal.initializePAL;
			var aureliaPal_3 = aureliaPal.reset;
			var aureliaPal_4 = aureliaPal.FEATURE;
			var aureliaPal_5 = aureliaPal.PLATFORM;
			var aureliaPal_6 = aureliaPal.DOM;
			var aureliaPal_7 = aureliaPal.isInitialized;

			/*! *****************************************************************************
			Copyright (c) Microsoft Corporation. All rights reserved.
			Licensed under the Apache License, Version 2.0 (the "License"); you may not use
			this file except in compliance with the License. You may obtain a copy of the
			License at http://www.apache.org/licenses/LICENSE-2.0

			THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
			KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
			WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
			MERCHANTABLITY OR NON-INFRINGEMENT.

			See the Apache Version 2.0 License for specific language governing permissions
			and limitations under the License.
			***************************************************************************** */

			function __decorate(decorators, target, key, desc) {
			    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
			    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
			    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
			    return c > 3 && r && Object.defineProperty(target, key, r), r;
			}

			function __metadata(metadataKey, metadataValue) {
			    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
			}

			var aureliaLogging = createCommonjsModule(function (module, exports) {

			Object.defineProperty(exports, "__esModule", {
			  value: true
			});
			exports.getLogger = getLogger;
			exports.addAppender = addAppender;
			exports.removeAppender = removeAppender;
			exports.getAppenders = getAppenders;
			exports.clearAppenders = clearAppenders;
			exports.addCustomLevel = addCustomLevel;
			exports.removeCustomLevel = removeCustomLevel;
			exports.setLevel = setLevel;
			exports.getLevel = getLevel;



			var logLevel = exports.logLevel = {
			  none: 0,
			  error: 10,
			  warn: 20,
			  info: 30,
			  debug: 40
			};

			var loggers = {};
			var appenders = [];
			var globalDefaultLevel = logLevel.none;

			var standardLevels = ['none', 'error', 'warn', 'info', 'debug'];
			function isStandardLevel(level) {
			  return standardLevels.filter(function (l) {
			    return l === level;
			  }).length > 0;
			}

			function appendArgs() {
			  return [this].concat(Array.prototype.slice.call(arguments));
			}

			function logFactory(level) {
			  var threshold = logLevel[level];
			  return function () {
			    if (this.level < threshold) {
			      return;
			    }

			    var args = appendArgs.apply(this, arguments);
			    var i = appenders.length;
			    while (i--) {
			      var _appenders$i;

			      (_appenders$i = appenders[i])[level].apply(_appenders$i, args);
			    }
			  };
			}

			function logFactoryCustom(level) {
			  var threshold = logLevel[level];
			  return function () {
			    if (this.level < threshold) {
			      return;
			    }

			    var args = appendArgs.apply(this, arguments);
			    var i = appenders.length;
			    while (i--) {
			      var appender = appenders[i];
			      if (appender[level] !== undefined) {
			        appender[level].apply(appender, args);
			      }
			    }
			  };
			}

			function connectLoggers() {
			  var proto = Logger.prototype;
			  for (var _level in logLevel) {
			    if (isStandardLevel(_level)) {
			      if (_level !== 'none') {
			        proto[_level] = logFactory(_level);
			      }
			    } else {
			      proto[_level] = logFactoryCustom(_level);
			    }
			  }
			}

			function disconnectLoggers() {
			  var proto = Logger.prototype;
			  for (var _level2 in logLevel) {
			    if (_level2 !== 'none') {
			      proto[_level2] = function () {};
			    }
			  }
			}

			function getLogger(id) {
			  return loggers[id] || new Logger(id);
			}

			function addAppender(appender) {
			  if (appenders.push(appender) === 1) {
			    connectLoggers();
			  }
			}

			function removeAppender(appender) {
			  appenders = appenders.filter(function (a) {
			    return a !== appender;
			  });
			}

			function getAppenders() {
			  return [].concat(appenders);
			}

			function clearAppenders() {
			  appenders = [];
			  disconnectLoggers();
			}

			function addCustomLevel(name, value) {
			  if (logLevel[name] !== undefined) {
			    throw Error('Log level "' + name + '" already exists.');
			  }

			  if (isNaN(value)) {
			    throw Error('Value must be a number.');
			  }

			  logLevel[name] = value;

			  if (appenders.length > 0) {
			    connectLoggers();
			  } else {
			    Logger.prototype[name] = function () {};
			  }
			}

			function removeCustomLevel(name) {
			  if (logLevel[name] === undefined) {
			    return;
			  }

			  if (isStandardLevel(name)) {
			    throw Error('Built-in log level "' + name + '" cannot be removed.');
			  }

			  delete logLevel[name];
			  delete Logger.prototype[name];
			}

			function setLevel(level) {
			  globalDefaultLevel = level;
			  for (var key in loggers) {
			    loggers[key].setLevel(level);
			  }
			}

			function getLevel() {
			  return globalDefaultLevel;
			}

			var Logger = exports.Logger = function () {
			  function Logger(id) {
			    

			    var cached = loggers[id];
			    if (cached) {
			      return cached;
			    }

			    loggers[id] = this;
			    this.id = id;
			    this.level = globalDefaultLevel;
			  }

			  Logger.prototype.debug = function debug(message) {};

			  Logger.prototype.info = function info(message) {};

			  Logger.prototype.warn = function warn(message) {};

			  Logger.prototype.error = function error(message) {};

			  Logger.prototype.setLevel = function setLevel(level) {
			    this.level = level;
			  };

			  return Logger;
			}();
			});

			unwrapExports(aureliaLogging);
			var aureliaLogging_1 = aureliaLogging.getLogger;
			var aureliaLogging_2 = aureliaLogging.addAppender;
			var aureliaLogging_3 = aureliaLogging.removeAppender;
			var aureliaLogging_4 = aureliaLogging.getAppenders;
			var aureliaLogging_5 = aureliaLogging.clearAppenders;
			var aureliaLogging_6 = aureliaLogging.addCustomLevel;
			var aureliaLogging_7 = aureliaLogging.removeCustomLevel;
			var aureliaLogging_8 = aureliaLogging.setLevel;
			var aureliaLogging_9 = aureliaLogging.getLevel;
			var aureliaLogging_10 = aureliaLogging.logLevel;
			var aureliaLogging_11 = aureliaLogging.Logger;

			var aureliaTaskQueue = createCommonjsModule(function (module, exports) {

			Object.defineProperty(exports, "__esModule", {
			  value: true
			});
			exports.TaskQueue = undefined;

			var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };





			var hasSetImmediate = typeof setImmediate === 'function';
			var stackSeparator = '\nEnqueued in TaskQueue by:\n';
			var microStackSeparator = '\nEnqueued in MicroTaskQueue by:\n';

			function makeRequestFlushFromMutationObserver(flush) {
			  var toggle = 1;
			  var observer = aureliaPal.DOM.createMutationObserver(flush);
			  var node = aureliaPal.DOM.createTextNode('');
			  observer.observe(node, { characterData: true });
			  return function requestFlush() {
			    toggle = -toggle;
			    node.data = toggle;
			  };
			}

			function makeRequestFlushFromTimer(flush) {
			  return function requestFlush() {
			    var timeoutHandle = setTimeout(handleFlushTimer, 0);

			    var intervalHandle = setInterval(handleFlushTimer, 50);
			    function handleFlushTimer() {
			      clearTimeout(timeoutHandle);
			      clearInterval(intervalHandle);
			      flush();
			    }
			  };
			}

			function onError(error, task, longStacks) {
			  if (longStacks && task.stack && (typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object' && error !== null) {
			    error.stack = filterFlushStack(error.stack) + task.stack;
			  }

			  if ('onError' in task) {
			    task.onError(error);
			  } else if (hasSetImmediate) {
			    setImmediate(function () {
			      throw error;
			    });
			  } else {
			    setTimeout(function () {
			      throw error;
			    }, 0);
			  }
			}

			var TaskQueue = exports.TaskQueue = function () {
			  function TaskQueue() {
			    var _this = this;

			    

			    this.flushing = false;
			    this.longStacks = false;

			    this.microTaskQueue = [];
			    this.microTaskQueueCapacity = 1024;
			    this.taskQueue = [];

			    if (aureliaPal.FEATURE.mutationObserver) {
			      this.requestFlushMicroTaskQueue = makeRequestFlushFromMutationObserver(function () {
			        return _this.flushMicroTaskQueue();
			      });
			    } else {
			      this.requestFlushMicroTaskQueue = makeRequestFlushFromTimer(function () {
			        return _this.flushMicroTaskQueue();
			      });
			    }

			    this.requestFlushTaskQueue = makeRequestFlushFromTimer(function () {
			      return _this.flushTaskQueue();
			    });
			  }

			  TaskQueue.prototype._flushQueue = function _flushQueue(queue, capacity) {
			    var index = 0;
			    var task = void 0;

			    try {
			      this.flushing = true;
			      while (index < queue.length) {
			        task = queue[index];
			        if (this.longStacks) {
			          this.stack = typeof task.stack === 'string' ? task.stack : undefined;
			        }
			        task.call();
			        index++;

			        if (index > capacity) {
			          for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
			            queue[scan] = queue[scan + index];
			          }

			          queue.length -= index;
			          index = 0;
			        }
			      }
			    } catch (error) {
			      onError(error, task, this.longStacks);
			    } finally {
			      this.flushing = false;
			    }
			  };

			  TaskQueue.prototype.queueMicroTask = function queueMicroTask(task) {
			    if (this.microTaskQueue.length < 1) {
			      this.requestFlushMicroTaskQueue();
			    }

			    if (this.longStacks) {
			      task.stack = this.prepareQueueStack(microStackSeparator);
			    }

			    this.microTaskQueue.push(task);
			  };

			  TaskQueue.prototype.queueTask = function queueTask(task) {
			    if (this.taskQueue.length < 1) {
			      this.requestFlushTaskQueue();
			    }

			    if (this.longStacks) {
			      task.stack = this.prepareQueueStack(stackSeparator);
			    }

			    this.taskQueue.push(task);
			  };

			  TaskQueue.prototype.flushTaskQueue = function flushTaskQueue() {
			    var queue = this.taskQueue;
			    this.taskQueue = [];
			    this._flushQueue(queue, Number.MAX_VALUE);
			  };

			  TaskQueue.prototype.flushMicroTaskQueue = function flushMicroTaskQueue() {
			    var queue = this.microTaskQueue;
			    this._flushQueue(queue, this.microTaskQueueCapacity);
			    queue.length = 0;
			  };

			  TaskQueue.prototype.prepareQueueStack = function prepareQueueStack(separator) {
			    var stack = separator + filterQueueStack(captureStack());

			    if (typeof this.stack === 'string') {
			      stack = filterFlushStack(stack) + this.stack;
			    }

			    return stack;
			  };

			  return TaskQueue;
			}();

			function captureStack() {
			  var error = new Error();

			  if (error.stack) {
			    return error.stack;
			  }

			  try {
			    throw error;
			  } catch (e) {
			    return e.stack;
			  }
			}

			function filterQueueStack(stack) {
			  return stack.replace(/^[\s\S]*?\bqueue(Micro)?Task\b[^\n]*\n/, '');
			}

			function filterFlushStack(stack) {
			  var index = stack.lastIndexOf('flushMicroTaskQueue');

			  if (index < 0) {
			    index = stack.lastIndexOf('flushTaskQueue');
			    if (index < 0) {
			      return stack;
			    }
			  }

			  index = stack.lastIndexOf('\n', index);

			  return index < 0 ? stack : stack.substr(0, index);
			}
			});

			unwrapExports(aureliaTaskQueue);
			var aureliaTaskQueue_1 = aureliaTaskQueue.TaskQueue;

			var aureliaMetadata = createCommonjsModule(function (module, exports) {

			Object.defineProperty(exports, "__esModule", {
			  value: true
			});
			exports.Origin = exports.metadata = undefined;

			var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

			var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

			exports.decorators = decorators;
			exports.deprecated = deprecated;
			exports.mixin = mixin;
			exports.protocol = protocol;





			function isObject(val) {
			  return val && (typeof val === 'function' || (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object');
			}

			var metadata = exports.metadata = {
			  resource: 'aurelia:resource',
			  paramTypes: 'design:paramtypes',
			  propertyType: 'design:type',
			  properties: 'design:properties',
			  get: function get(metadataKey, target, targetKey) {
			    if (!isObject(target)) {
			      return undefined;
			    }
			    var result = metadata.getOwn(metadataKey, target, targetKey);
			    return result === undefined ? metadata.get(metadataKey, Object.getPrototypeOf(target), targetKey) : result;
			  },
			  getOwn: function getOwn(metadataKey, target, targetKey) {
			    if (!isObject(target)) {
			      return undefined;
			    }
			    return Reflect.getOwnMetadata(metadataKey, target, targetKey);
			  },
			  define: function define(metadataKey, metadataValue, target, targetKey) {
			    Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
			  },
			  getOrCreateOwn: function getOrCreateOwn(metadataKey, Type, target, targetKey) {
			    var result = metadata.getOwn(metadataKey, target, targetKey);

			    if (result === undefined) {
			      result = new Type();
			      Reflect.defineMetadata(metadataKey, result, target, targetKey);
			    }

			    return result;
			  }
			};

			var originStorage = new Map();
			var unknownOrigin = Object.freeze({ moduleId: undefined, moduleMember: undefined });

			var Origin = exports.Origin = function () {
			  function Origin(moduleId, moduleMember) {
			    

			    this.moduleId = moduleId;
			    this.moduleMember = moduleMember;
			  }

			  Origin.get = function get(fn) {
			    var origin = originStorage.get(fn);

			    if (origin === undefined) {
			      aureliaPal.PLATFORM.eachModule(function (key, value) {
			        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
			          for (var name in value) {
			            var exp = value[name];
			            if (exp === fn) {
			              originStorage.set(fn, origin = new Origin(key, name));
			              return true;
			            }
			          }
			        }

			        if (value === fn) {
			          originStorage.set(fn, origin = new Origin(key, 'default'));
			          return true;
			        }

			        return false;
			      });
			    }

			    return origin || unknownOrigin;
			  };

			  Origin.set = function set(fn, origin) {
			    originStorage.set(fn, origin);
			  };

			  return Origin;
			}();

			function decorators() {
			  for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
			    rest[_key] = arguments[_key];
			  }

			  var applicator = function applicator(target, key, descriptor) {
			    var i = rest.length;

			    if (key) {
			      descriptor = descriptor || {
			        value: target[key],
			        writable: true,
			        configurable: true,
			        enumerable: true
			      };

			      while (i--) {
			        descriptor = rest[i](target, key, descriptor) || descriptor;
			      }

			      Object.defineProperty(target, key, descriptor);
			    } else {
			      while (i--) {
			        target = rest[i](target) || target;
			      }
			    }

			    return target;
			  };

			  applicator.on = applicator;
			  return applicator;
			}

			function deprecated(optionsOrTarget, maybeKey, maybeDescriptor) {
			  function decorator(target, key, descriptor) {
			    var methodSignature = target.constructor.name + '#' + key;
			    var options = maybeKey ? {} : optionsOrTarget || {};
			    var message = 'DEPRECATION - ' + methodSignature;

			    if (typeof descriptor.value !== 'function') {
			      throw new SyntaxError('Only methods can be marked as deprecated.');
			    }

			    if (options.message) {
			      message += ' - ' + options.message;
			    }

			    return _extends({}, descriptor, {
			      value: function deprecationWrapper() {
			        if (options.error) {
			          throw new Error(message);
			        } else {
			          console.warn(message);
			        }

			        return descriptor.value.apply(this, arguments);
			      }
			    });
			  }

			  return maybeKey ? decorator(optionsOrTarget, maybeKey, maybeDescriptor) : decorator;
			}

			function mixin(behavior) {
			  var instanceKeys = Object.keys(behavior);

			  function _mixin(possible) {
			    var decorator = function decorator(target) {
			      var resolvedTarget = typeof target === 'function' ? target.prototype : target;

			      var i = instanceKeys.length;
			      while (i--) {
			        var property = instanceKeys[i];
			        Object.defineProperty(resolvedTarget, property, {
			          value: behavior[property],
			          writable: true
			        });
			      }
			    };

			    return possible ? decorator(possible) : decorator;
			  }

			  return _mixin;
			}

			function alwaysValid() {
			  return true;
			}
			function noCompose() {}

			function ensureProtocolOptions(options) {
			  if (options === undefined) {
			    options = {};
			  } else if (typeof options === 'function') {
			    options = {
			      validate: options
			    };
			  }

			  if (!options.validate) {
			    options.validate = alwaysValid;
			  }

			  if (!options.compose) {
			    options.compose = noCompose;
			  }

			  return options;
			}

			function createProtocolValidator(validate) {
			  return function (target) {
			    var result = validate(target);
			    return result === true;
			  };
			}

			function createProtocolAsserter(name, validate) {
			  return function (target) {
			    var result = validate(target);
			    if (result !== true) {
			      throw new Error(result || name + ' was not correctly implemented.');
			    }
			  };
			}

			function protocol(name, options) {
			  options = ensureProtocolOptions(options);

			  var result = function result(target) {
			    var resolvedTarget = typeof target === 'function' ? target.prototype : target;

			    options.compose(resolvedTarget);
			    result.assert(resolvedTarget);

			    Object.defineProperty(resolvedTarget, 'protocol:' + name, {
			      enumerable: false,
			      configurable: false,
			      writable: false,
			      value: true
			    });
			  };

			  result.validate = createProtocolValidator(options.validate);
			  result.assert = createProtocolAsserter(name, options.validate);

			  return result;
			}

			protocol.create = function (name, options) {
			  options = ensureProtocolOptions(options);
			  var hidden = 'protocol:' + name;
			  var result = function result(target) {
			    var decorator = protocol(name, options);
			    return target ? decorator(target) : decorator;
			  };

			  result.decorates = function (obj) {
			    return obj[hidden] === true;
			  };
			  result.validate = createProtocolValidator(options.validate);
			  result.assert = createProtocolAsserter(name, options.validate);

			  return result;
			};
			});

			unwrapExports(aureliaMetadata);
			var aureliaMetadata_1 = aureliaMetadata.Origin;
			var aureliaMetadata_2 = aureliaMetadata.metadata;
			var aureliaMetadata_3 = aureliaMetadata.decorators;
			var aureliaMetadata_4 = aureliaMetadata.deprecated;
			var aureliaMetadata_5 = aureliaMetadata.mixin;
			var aureliaMetadata_6 = aureliaMetadata.protocol;

			var aureliaBinding = createCommonjsModule(function (module, exports) {

			Object.defineProperty(exports, "__esModule", {
			  value: true
			});
			exports.getSetObserver = exports.BindingEngine = exports.NameExpression = exports.Listener = exports.ListenerExpression = exports.BindingBehaviorResource = exports.ValueConverterResource = exports.Call = exports.CallExpression = exports.Binding = exports.BindingExpression = exports.ObjectObservationAdapter = exports.ObserverLocator = exports.SVGAnalyzer = exports.presentationAttributes = exports.presentationElements = exports.elements = exports.ComputedExpression = exports.ClassObserver = exports.SelectValueObserver = exports.CheckedObserver = exports.ValueAttributeObserver = exports.StyleObserver = exports.DataAttributeObserver = exports.dataAttributeAccessor = exports.XLinkAttributeObserver = exports.SetterObserver = exports.PrimitiveObserver = exports.propertyAccessor = exports.DirtyCheckProperty = exports.DirtyChecker = exports.EventSubscriber = exports.EventManager = exports.delegationStrategy = exports.getMapObserver = exports.ParserImplementation = exports.Parser = exports.Scanner = exports.Lexer = exports.Token = exports.bindingMode = exports.ExpressionCloner = exports.Unparser = exports.LiteralObject = exports.LiteralArray = exports.LiteralString = exports.LiteralPrimitive = exports.PrefixNot = exports.Binary = exports.CallFunction = exports.CallMember = exports.CallScope = exports.AccessKeyed = exports.AccessMember = exports.AccessScope = exports.AccessThis = exports.Conditional = exports.Assign = exports.ValueConverter = exports.BindingBehavior = exports.Chain = exports.Expression = exports.getArrayObserver = exports.CollectionLengthObserver = exports.ModifyCollectionObserver = exports.ExpressionObserver = exports.sourceContext = exports.targetContext = undefined;

			var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

			var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

			var _dec, _dec2, _class, _dec3, _class2, _dec4, _class3, _dec5, _class5, _dec6, _class7, _dec7, _class8, _dec8, _class9, _dec9, _class10, _class12, _temp, _dec10, _class13, _class14, _temp2;

			exports.camelCase = camelCase;
			exports.createOverrideContext = createOverrideContext;
			exports.getContextFor = getContextFor;
			exports.createScopeForTest = createScopeForTest;
			exports.connectable = connectable;
			exports.enqueueBindingConnect = enqueueBindingConnect;
			exports.subscriberCollection = subscriberCollection;
			exports.calcSplices = calcSplices;
			exports.mergeSplice = mergeSplice;
			exports.projectArraySplices = projectArraySplices;
			exports.getChangeRecords = getChangeRecords;
			exports.cloneExpression = cloneExpression;
			exports.hasDeclaredDependencies = hasDeclaredDependencies;
			exports.declarePropertyDependencies = declarePropertyDependencies;
			exports.computedFrom = computedFrom;
			exports.createComputedObserver = createComputedObserver;
			exports.valueConverter = valueConverter;
			exports.bindingBehavior = bindingBehavior;
			exports.observable = observable;
			exports.connectBindingToSignal = connectBindingToSignal;
			exports.signalBindings = signalBindings;



			var LogManager = _interopRequireWildcard(aureliaLogging);







			function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

			function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

			function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



			var targetContext = exports.targetContext = 'Binding:target';
			var sourceContext = exports.sourceContext = 'Binding:source';

			var map = Object.create(null);

			function camelCase(name) {
			  if (name in map) {
			    return map[name];
			  }
			  var result = name.charAt(0).toLowerCase() + name.slice(1).replace(/[_.-](\w|$)/g, function (_, x) {
			    return x.toUpperCase();
			  });
			  map[name] = result;
			  return result;
			}

			function createOverrideContext(bindingContext, parentOverrideContext) {
			  return {
			    bindingContext: bindingContext,
			    parentOverrideContext: parentOverrideContext || null
			  };
			}

			function getContextFor(name, scope, ancestor) {
			  var oc = scope.overrideContext;

			  if (ancestor) {
			    while (ancestor && oc) {
			      ancestor--;
			      oc = oc.parentOverrideContext;
			    }
			    if (ancestor || !oc) {
			      return undefined;
			    }
			    return name in oc ? oc : oc.bindingContext;
			  }

			  while (oc && !(name in oc) && !(oc.bindingContext && name in oc.bindingContext)) {
			    oc = oc.parentOverrideContext;
			  }
			  if (oc) {
			    return name in oc ? oc : oc.bindingContext;
			  }

			  return scope.bindingContext || scope.overrideContext;
			}

			function createScopeForTest(bindingContext, parentBindingContext) {
			  if (parentBindingContext) {
			    return {
			      bindingContext: bindingContext,
			      overrideContext: createOverrideContext(bindingContext, createOverrideContext(parentBindingContext))
			    };
			  }
			  return {
			    bindingContext: bindingContext,
			    overrideContext: createOverrideContext(bindingContext)
			  };
			}

			var slotNames = [];
			var versionSlotNames = [];

			for (var i = 0; i < 100; i++) {
			  slotNames.push('_observer' + i);
			  versionSlotNames.push('_observerVersion' + i);
			}

			function addObserver(observer) {
			  var observerSlots = this._observerSlots === undefined ? 0 : this._observerSlots;
			  var i = observerSlots;
			  while (i-- && this[slotNames[i]] !== observer) {}

			  if (i === -1) {
			    i = 0;
			    while (this[slotNames[i]]) {
			      i++;
			    }
			    this[slotNames[i]] = observer;
			    observer.subscribe(sourceContext, this);

			    if (i === observerSlots) {
			      this._observerSlots = i + 1;
			    }
			  }

			  if (this._version === undefined) {
			    this._version = 0;
			  }
			  this[versionSlotNames[i]] = this._version;
			}

			function observeProperty(obj, propertyName) {
			  var observer = this.observerLocator.getObserver(obj, propertyName);
			  addObserver.call(this, observer);
			}

			function observeArray(array) {
			  var observer = this.observerLocator.getArrayObserver(array);
			  addObserver.call(this, observer);
			}

			function unobserve(all) {
			  var i = this._observerSlots;
			  while (i--) {
			    if (all || this[versionSlotNames[i]] !== this._version) {
			      var observer = this[slotNames[i]];
			      this[slotNames[i]] = null;
			      if (observer) {
			        observer.unsubscribe(sourceContext, this);
			      }
			    }
			  }
			}

			function connectable() {
			  return function (target) {
			    target.prototype.observeProperty = observeProperty;
			    target.prototype.observeArray = observeArray;
			    target.prototype.unobserve = unobserve;
			    target.prototype.addObserver = addObserver;
			  };
			}

			var queue = [];
			var queued = {};
			var nextId = 0;
			var minimumImmediate = 100;
			var frameBudget = 15;

			var isFlushRequested = false;
			var immediate = 0;

			function flush(animationFrameStart) {
			  var length = queue.length;
			  var i = 0;
			  while (i < length) {
			    var binding = queue[i];
			    queued[binding.__connectQueueId] = false;
			    binding.connect(true);
			    i++;

			    if (i % 100 === 0 && aureliaPal.PLATFORM.performance.now() - animationFrameStart > frameBudget) {
			      break;
			    }
			  }
			  queue.splice(0, i);

			  if (queue.length) {
			    aureliaPal.PLATFORM.requestAnimationFrame(flush);
			  } else {
			    isFlushRequested = false;
			    immediate = 0;
			  }
			}

			function enqueueBindingConnect(binding) {
			  if (immediate < minimumImmediate) {
			    immediate++;
			    binding.connect(false);
			  } else {
			    var id = binding.__connectQueueId;
			    if (id === undefined) {
			      id = nextId;
			      nextId++;
			      binding.__connectQueueId = id;
			    }

			    if (!queued[id]) {
			      queue.push(binding);
			      queued[id] = true;
			    }
			  }
			  if (!isFlushRequested) {
			    isFlushRequested = true;
			    aureliaPal.PLATFORM.requestAnimationFrame(flush);
			  }
			}

			function addSubscriber(context, callable) {
			  if (this.hasSubscriber(context, callable)) {
			    return false;
			  }
			  if (!this._context0) {
			    this._context0 = context;
			    this._callable0 = callable;
			    return true;
			  }
			  if (!this._context1) {
			    this._context1 = context;
			    this._callable1 = callable;
			    return true;
			  }
			  if (!this._context2) {
			    this._context2 = context;
			    this._callable2 = callable;
			    return true;
			  }
			  if (!this._contextsRest) {
			    this._contextsRest = [context];
			    this._callablesRest = [callable];
			    return true;
			  }
			  this._contextsRest.push(context);
			  this._callablesRest.push(callable);
			  return true;
			}

			function removeSubscriber(context, callable) {
			  if (this._context0 === context && this._callable0 === callable) {
			    this._context0 = null;
			    this._callable0 = null;
			    return true;
			  }
			  if (this._context1 === context && this._callable1 === callable) {
			    this._context1 = null;
			    this._callable1 = null;
			    return true;
			  }
			  if (this._context2 === context && this._callable2 === callable) {
			    this._context2 = null;
			    this._callable2 = null;
			    return true;
			  }
			  var callables = this._callablesRest;
			  if (callables === undefined || callables.length === 0) {
			    return false;
			  }
			  var contexts = this._contextsRest;
			  var i = 0;
			  while (!(callables[i] === callable && contexts[i] === context) && callables.length > i) {
			    i++;
			  }
			  if (i >= callables.length) {
			    return false;
			  }
			  contexts.splice(i, 1);
			  callables.splice(i, 1);
			  return true;
			}

			var arrayPool1 = [];
			var arrayPool2 = [];
			var poolUtilization = [];

			function callSubscribers(newValue, oldValue) {
			  var context0 = this._context0;
			  var callable0 = this._callable0;
			  var context1 = this._context1;
			  var callable1 = this._callable1;
			  var context2 = this._context2;
			  var callable2 = this._callable2;
			  var length = this._contextsRest ? this._contextsRest.length : 0;
			  var contextsRest = void 0;
			  var callablesRest = void 0;
			  var poolIndex = void 0;
			  var i = void 0;
			  if (length) {
			    poolIndex = poolUtilization.length;
			    while (poolIndex-- && poolUtilization[poolIndex]) {}
			    if (poolIndex < 0) {
			      poolIndex = poolUtilization.length;
			      contextsRest = [];
			      callablesRest = [];
			      poolUtilization.push(true);
			      arrayPool1.push(contextsRest);
			      arrayPool2.push(callablesRest);
			    } else {
			      poolUtilization[poolIndex] = true;
			      contextsRest = arrayPool1[poolIndex];
			      callablesRest = arrayPool2[poolIndex];
			    }

			    i = length;
			    while (i--) {
			      contextsRest[i] = this._contextsRest[i];
			      callablesRest[i] = this._callablesRest[i];
			    }
			  }

			  if (context0) {
			    if (callable0) {
			      callable0.call(context0, newValue, oldValue);
			    } else {
			      context0(newValue, oldValue);
			    }
			  }
			  if (context1) {
			    if (callable1) {
			      callable1.call(context1, newValue, oldValue);
			    } else {
			      context1(newValue, oldValue);
			    }
			  }
			  if (context2) {
			    if (callable2) {
			      callable2.call(context2, newValue, oldValue);
			    } else {
			      context2(newValue, oldValue);
			    }
			  }
			  if (length) {
			    for (i = 0; i < length; i++) {
			      var callable = callablesRest[i];
			      var context = contextsRest[i];
			      if (callable) {
			        callable.call(context, newValue, oldValue);
			      } else {
			        context(newValue, oldValue);
			      }
			      contextsRest[i] = null;
			      callablesRest[i] = null;
			    }
			    poolUtilization[poolIndex] = false;
			  }
			}

			function hasSubscribers() {
			  return !!(this._context0 || this._context1 || this._context2 || this._contextsRest && this._contextsRest.length);
			}

			function hasSubscriber(context, callable) {
			  var has = this._context0 === context && this._callable0 === callable || this._context1 === context && this._callable1 === callable || this._context2 === context && this._callable2 === callable;
			  if (has) {
			    return true;
			  }
			  var index = void 0;
			  var contexts = this._contextsRest;
			  if (!contexts || (index = contexts.length) === 0) {
			    return false;
			  }
			  var callables = this._callablesRest;
			  while (index--) {
			    if (contexts[index] === context && callables[index] === callable) {
			      return true;
			    }
			  }
			  return false;
			}

			function subscriberCollection() {
			  return function (target) {
			    target.prototype.addSubscriber = addSubscriber;
			    target.prototype.removeSubscriber = removeSubscriber;
			    target.prototype.callSubscribers = callSubscribers;
			    target.prototype.hasSubscribers = hasSubscribers;
			    target.prototype.hasSubscriber = hasSubscriber;
			  };
			}

			var ExpressionObserver = exports.ExpressionObserver = (_dec = connectable(), _dec2 = subscriberCollection(), _dec(_class = _dec2(_class = function () {
			  function ExpressionObserver(scope, expression, observerLocator, lookupFunctions) {
			    

			    this.scope = scope;
			    this.expression = expression;
			    this.observerLocator = observerLocator;
			    this.lookupFunctions = lookupFunctions;
			  }

			  ExpressionObserver.prototype.getValue = function getValue() {
			    return this.expression.evaluate(this.scope, this.lookupFunctions);
			  };

			  ExpressionObserver.prototype.setValue = function setValue(newValue) {
			    this.expression.assign(this.scope, newValue);
			  };

			  ExpressionObserver.prototype.subscribe = function subscribe(context, callable) {
			    var _this = this;

			    if (!this.hasSubscribers()) {
			      this.oldValue = this.expression.evaluate(this.scope, this.lookupFunctions);
			      this.expression.connect(this, this.scope);
			    }
			    this.addSubscriber(context, callable);
			    if (arguments.length === 1 && context instanceof Function) {
			      return {
			        dispose: function dispose() {
			          _this.unsubscribe(context, callable);
			        }
			      };
			    }
			  };

			  ExpressionObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
			    if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
			      this.unobserve(true);
			      this.oldValue = undefined;
			    }
			  };

			  ExpressionObserver.prototype.call = function call() {
			    var newValue = this.expression.evaluate(this.scope, this.lookupFunctions);
			    var oldValue = this.oldValue;
			    if (newValue !== oldValue) {
			      this.oldValue = newValue;
			      this.callSubscribers(newValue, oldValue);
			    }
			    this._version++;
			    this.expression.connect(this, this.scope);
			    this.unobserve(false);
			  };

			  return ExpressionObserver;
			}()) || _class) || _class);


			function isIndex(s) {
			  return +s === s >>> 0;
			}

			function toNumber(s) {
			  return +s;
			}

			function newSplice(index, removed, addedCount) {
			  return {
			    index: index,
			    removed: removed,
			    addedCount: addedCount
			  };
			}

			var EDIT_LEAVE = 0;
			var EDIT_UPDATE = 1;
			var EDIT_ADD = 2;
			var EDIT_DELETE = 3;

			function ArraySplice() {}

			ArraySplice.prototype = {
			  calcEditDistances: function calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd) {
			    var rowCount = oldEnd - oldStart + 1;
			    var columnCount = currentEnd - currentStart + 1;
			    var distances = new Array(rowCount);
			    var north = void 0;
			    var west = void 0;

			    for (var _i = 0; _i < rowCount; ++_i) {
			      distances[_i] = new Array(columnCount);
			      distances[_i][0] = _i;
			    }

			    for (var j = 0; j < columnCount; ++j) {
			      distances[0][j] = j;
			    }

			    for (var _i2 = 1; _i2 < rowCount; ++_i2) {
			      for (var _j = 1; _j < columnCount; ++_j) {
			        if (this.equals(current[currentStart + _j - 1], old[oldStart + _i2 - 1])) {
			          distances[_i2][_j] = distances[_i2 - 1][_j - 1];
			        } else {
			          north = distances[_i2 - 1][_j] + 1;
			          west = distances[_i2][_j - 1] + 1;
			          distances[_i2][_j] = north < west ? north : west;
			        }
			      }
			    }

			    return distances;
			  },

			  spliceOperationsFromEditDistances: function spliceOperationsFromEditDistances(distances) {
			    var i = distances.length - 1;
			    var j = distances[0].length - 1;
			    var current = distances[i][j];
			    var edits = [];
			    while (i > 0 || j > 0) {
			      if (i === 0) {
			        edits.push(EDIT_ADD);
			        j--;
			        continue;
			      }
			      if (j === 0) {
			        edits.push(EDIT_DELETE);
			        i--;
			        continue;
			      }
			      var northWest = distances[i - 1][j - 1];
			      var west = distances[i - 1][j];
			      var north = distances[i][j - 1];

			      var min = void 0;
			      if (west < north) {
			        min = west < northWest ? west : northWest;
			      } else {
			        min = north < northWest ? north : northWest;
			      }

			      if (min === northWest) {
			        if (northWest === current) {
			          edits.push(EDIT_LEAVE);
			        } else {
			          edits.push(EDIT_UPDATE);
			          current = northWest;
			        }
			        i--;
			        j--;
			      } else if (min === west) {
			        edits.push(EDIT_DELETE);
			        i--;
			        current = west;
			      } else {
			        edits.push(EDIT_ADD);
			        j--;
			        current = north;
			      }
			    }

			    edits.reverse();
			    return edits;
			  },

			  calcSplices: function calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd) {
			    var prefixCount = 0;
			    var suffixCount = 0;

			    var minLength = Math.min(currentEnd - currentStart, oldEnd - oldStart);
			    if (currentStart === 0 && oldStart === 0) {
			      prefixCount = this.sharedPrefix(current, old, minLength);
			    }

			    if (currentEnd === current.length && oldEnd === old.length) {
			      suffixCount = this.sharedSuffix(current, old, minLength - prefixCount);
			    }

			    currentStart += prefixCount;
			    oldStart += prefixCount;
			    currentEnd -= suffixCount;
			    oldEnd -= suffixCount;

			    if (currentEnd - currentStart === 0 && oldEnd - oldStart === 0) {
			      return [];
			    }

			    if (currentStart === currentEnd) {
			      var _splice = newSplice(currentStart, [], 0);
			      while (oldStart < oldEnd) {
			        _splice.removed.push(old[oldStart++]);
			      }

			      return [_splice];
			    } else if (oldStart === oldEnd) {
			      return [newSplice(currentStart, [], currentEnd - currentStart)];
			    }

			    var ops = this.spliceOperationsFromEditDistances(this.calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd));

			    var splice = undefined;
			    var splices = [];
			    var index = currentStart;
			    var oldIndex = oldStart;
			    for (var _i3 = 0; _i3 < ops.length; ++_i3) {
			      switch (ops[_i3]) {
			        case EDIT_LEAVE:
			          if (splice) {
			            splices.push(splice);
			            splice = undefined;
			          }

			          index++;
			          oldIndex++;
			          break;
			        case EDIT_UPDATE:
			          if (!splice) {
			            splice = newSplice(index, [], 0);
			          }

			          splice.addedCount++;
			          index++;

			          splice.removed.push(old[oldIndex]);
			          oldIndex++;
			          break;
			        case EDIT_ADD:
			          if (!splice) {
			            splice = newSplice(index, [], 0);
			          }

			          splice.addedCount++;
			          index++;
			          break;
			        case EDIT_DELETE:
			          if (!splice) {
			            splice = newSplice(index, [], 0);
			          }

			          splice.removed.push(old[oldIndex]);
			          oldIndex++;
			          break;
			      }
			    }

			    if (splice) {
			      splices.push(splice);
			    }
			    return splices;
			  },

			  sharedPrefix: function sharedPrefix(current, old, searchLength) {
			    for (var _i4 = 0; _i4 < searchLength; ++_i4) {
			      if (!this.equals(current[_i4], old[_i4])) {
			        return _i4;
			      }
			    }

			    return searchLength;
			  },

			  sharedSuffix: function sharedSuffix(current, old, searchLength) {
			    var index1 = current.length;
			    var index2 = old.length;
			    var count = 0;
			    while (count < searchLength && this.equals(current[--index1], old[--index2])) {
			      count++;
			    }

			    return count;
			  },

			  calculateSplices: function calculateSplices(current, previous) {
			    return this.calcSplices(current, 0, current.length, previous, 0, previous.length);
			  },

			  equals: function equals(currentValue, previousValue) {
			    return currentValue === previousValue;
			  }
			};

			var arraySplice = new ArraySplice();

			function calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd) {
			  return arraySplice.calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd);
			}

			function intersect(start1, end1, start2, end2) {
			  if (end1 < start2 || end2 < start1) {
			    return -1;
			  }

			  if (end1 === start2 || end2 === start1) {
			    return 0;
			  }

			  if (start1 < start2) {
			    if (end1 < end2) {
			      return end1 - start2;
			    }

			    return end2 - start2;
			  }

			  if (end2 < end1) {
			    return end2 - start1;
			  }

			  return end1 - start1;
			}

			function mergeSplice(splices, index, removed, addedCount) {
			  var splice = newSplice(index, removed, addedCount);

			  var inserted = false;
			  var insertionOffset = 0;

			  for (var _i5 = 0; _i5 < splices.length; _i5++) {
			    var current = splices[_i5];
			    current.index += insertionOffset;

			    if (inserted) {
			      continue;
			    }

			    var intersectCount = intersect(splice.index, splice.index + splice.removed.length, current.index, current.index + current.addedCount);

			    if (intersectCount >= 0) {

			      splices.splice(_i5, 1);
			      _i5--;

			      insertionOffset -= current.addedCount - current.removed.length;

			      splice.addedCount += current.addedCount - intersectCount;
			      var deleteCount = splice.removed.length + current.removed.length - intersectCount;

			      if (!splice.addedCount && !deleteCount) {
			        inserted = true;
			      } else {
			        var currentRemoved = current.removed;

			        if (splice.index < current.index) {
			          var prepend = splice.removed.slice(0, current.index - splice.index);
			          Array.prototype.push.apply(prepend, currentRemoved);
			          currentRemoved = prepend;
			        }

			        if (splice.index + splice.removed.length > current.index + current.addedCount) {
			          var append = splice.removed.slice(current.index + current.addedCount - splice.index);
			          Array.prototype.push.apply(currentRemoved, append);
			        }

			        splice.removed = currentRemoved;
			        if (current.index < splice.index) {
			          splice.index = current.index;
			        }
			      }
			    } else if (splice.index < current.index) {

			      inserted = true;

			      splices.splice(_i5, 0, splice);
			      _i5++;

			      var offset = splice.addedCount - splice.removed.length;
			      current.index += offset;
			      insertionOffset += offset;
			    }
			  }

			  if (!inserted) {
			    splices.push(splice);
			  }
			}

			function createInitialSplices(array, changeRecords) {
			  var splices = [];

			  for (var _i6 = 0; _i6 < changeRecords.length; _i6++) {
			    var record = changeRecords[_i6];
			    switch (record.type) {
			      case 'splice':
			        mergeSplice(splices, record.index, record.removed.slice(), record.addedCount);
			        break;
			      case 'add':
			      case 'update':
			      case 'delete':
			        if (!isIndex(record.name)) {
			          continue;
			        }

			        var index = toNumber(record.name);
			        if (index < 0) {
			          continue;
			        }

			        mergeSplice(splices, index, [record.oldValue], record.type === 'delete' ? 0 : 1);
			        break;
			      default:
			        console.error('Unexpected record type: ' + JSON.stringify(record));
			        break;
			    }
			  }

			  return splices;
			}

			function projectArraySplices(array, changeRecords) {
			  var splices = [];

			  createInitialSplices(array, changeRecords).forEach(function (splice) {
			    if (splice.addedCount === 1 && splice.removed.length === 1) {
			      if (splice.removed[0] !== array[splice.index]) {
			        splices.push(splice);
			      }

			      return;
			    }

			    splices = splices.concat(calcSplices(array, splice.index, splice.index + splice.addedCount, splice.removed, 0, splice.removed.length));
			  });

			  return splices;
			}

			function newRecord(type, object, key, oldValue) {
			  return {
			    type: type,
			    object: object,
			    key: key,
			    oldValue: oldValue
			  };
			}

			function getChangeRecords(map) {
			  var entries = new Array(map.size);
			  var keys = map.keys();
			  var i = 0;
			  var item = void 0;

			  while (item = keys.next()) {
			    if (item.done) {
			      break;
			    }

			    entries[i] = newRecord('added', map, item.value);
			    i++;
			  }

			  return entries;
			}

			var ModifyCollectionObserver = exports.ModifyCollectionObserver = (_dec3 = subscriberCollection(), _dec3(_class2 = function () {
			  function ModifyCollectionObserver(taskQueue, collection) {
			    

			    this.taskQueue = taskQueue;
			    this.queued = false;
			    this.changeRecords = null;
			    this.oldCollection = null;
			    this.collection = collection;
			    this.lengthPropertyName = collection instanceof Map || collection instanceof Set ? 'size' : 'length';
			  }

			  ModifyCollectionObserver.prototype.subscribe = function subscribe(context, callable) {
			    this.addSubscriber(context, callable);
			  };

			  ModifyCollectionObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
			    this.removeSubscriber(context, callable);
			  };

			  ModifyCollectionObserver.prototype.addChangeRecord = function addChangeRecord(changeRecord) {
			    if (!this.hasSubscribers() && !this.lengthObserver) {
			      return;
			    }

			    if (changeRecord.type === 'splice') {
			      var index = changeRecord.index;
			      var arrayLength = changeRecord.object.length;
			      if (index > arrayLength) {
			        index = arrayLength - changeRecord.addedCount;
			      } else if (index < 0) {
			        index = arrayLength + changeRecord.removed.length + index - changeRecord.addedCount;
			      }
			      if (index < 0) {
			        index = 0;
			      }
			      changeRecord.index = index;
			    }

			    if (this.changeRecords === null) {
			      this.changeRecords = [changeRecord];
			    } else {
			      this.changeRecords.push(changeRecord);
			    }

			    if (!this.queued) {
			      this.queued = true;
			      this.taskQueue.queueMicroTask(this);
			    }
			  };

			  ModifyCollectionObserver.prototype.flushChangeRecords = function flushChangeRecords() {
			    if (this.changeRecords && this.changeRecords.length || this.oldCollection) {
			      this.call();
			    }
			  };

			  ModifyCollectionObserver.prototype.reset = function reset(oldCollection) {
			    this.oldCollection = oldCollection;

			    if (this.hasSubscribers() && !this.queued) {
			      this.queued = true;
			      this.taskQueue.queueMicroTask(this);
			    }
			  };

			  ModifyCollectionObserver.prototype.getLengthObserver = function getLengthObserver() {
			    return this.lengthObserver || (this.lengthObserver = new CollectionLengthObserver(this.collection));
			  };

			  ModifyCollectionObserver.prototype.call = function call() {
			    var changeRecords = this.changeRecords;
			    var oldCollection = this.oldCollection;
			    var records = void 0;

			    this.queued = false;
			    this.changeRecords = [];
			    this.oldCollection = null;

			    if (this.hasSubscribers()) {
			      if (oldCollection) {
			        if (this.collection instanceof Map || this.collection instanceof Set) {
			          records = getChangeRecords(oldCollection);
			        } else {
			          records = calcSplices(this.collection, 0, this.collection.length, oldCollection, 0, oldCollection.length);
			        }
			      } else {
			        if (this.collection instanceof Map || this.collection instanceof Set) {
			          records = changeRecords;
			        } else {
			          records = projectArraySplices(this.collection, changeRecords);
			        }
			      }

			      this.callSubscribers(records);
			    }

			    if (this.lengthObserver) {
			      this.lengthObserver.call(this.collection[this.lengthPropertyName]);
			    }
			  };

			  return ModifyCollectionObserver;
			}()) || _class2);
			var CollectionLengthObserver = exports.CollectionLengthObserver = (_dec4 = subscriberCollection(), _dec4(_class3 = function () {
			  function CollectionLengthObserver(collection) {
			    

			    this.collection = collection;
			    this.lengthPropertyName = collection instanceof Map || collection instanceof Set ? 'size' : 'length';
			    this.currentValue = collection[this.lengthPropertyName];
			  }

			  CollectionLengthObserver.prototype.getValue = function getValue() {
			    return this.collection[this.lengthPropertyName];
			  };

			  CollectionLengthObserver.prototype.setValue = function setValue(newValue) {
			    this.collection[this.lengthPropertyName] = newValue;
			  };

			  CollectionLengthObserver.prototype.subscribe = function subscribe(context, callable) {
			    this.addSubscriber(context, callable);
			  };

			  CollectionLengthObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
			    this.removeSubscriber(context, callable);
			  };

			  CollectionLengthObserver.prototype.call = function call(newValue) {
			    var oldValue = this.currentValue;
			    this.callSubscribers(newValue, oldValue);
			    this.currentValue = newValue;
			  };

			  return CollectionLengthObserver;
			}()) || _class3);

			var pop = Array.prototype.pop;
			var push = Array.prototype.push;
			var reverse = Array.prototype.reverse;
			var shift = Array.prototype.shift;
			var sort = Array.prototype.sort;
			var splice = Array.prototype.splice;
			var unshift = Array.prototype.unshift;

			Array.prototype.pop = function () {
			  var notEmpty = this.length > 0;
			  var methodCallResult = pop.apply(this, arguments);
			  if (notEmpty && this.__array_observer__ !== undefined) {
			    this.__array_observer__.addChangeRecord({
			      type: 'delete',
			      object: this,
			      name: this.length,
			      oldValue: methodCallResult
			    });
			  }
			  return methodCallResult;
			};

			Array.prototype.push = function () {
			  var methodCallResult = push.apply(this, arguments);
			  if (this.__array_observer__ !== undefined) {
			    this.__array_observer__.addChangeRecord({
			      type: 'splice',
			      object: this,
			      index: this.length - arguments.length,
			      removed: [],
			      addedCount: arguments.length
			    });
			  }
			  return methodCallResult;
			};

			Array.prototype.reverse = function () {
			  var oldArray = void 0;
			  if (this.__array_observer__ !== undefined) {
			    this.__array_observer__.flushChangeRecords();
			    oldArray = this.slice();
			  }
			  var methodCallResult = reverse.apply(this, arguments);
			  if (this.__array_observer__ !== undefined) {
			    this.__array_observer__.reset(oldArray);
			  }
			  return methodCallResult;
			};

			Array.prototype.shift = function () {
			  var notEmpty = this.length > 0;
			  var methodCallResult = shift.apply(this, arguments);
			  if (notEmpty && this.__array_observer__ !== undefined) {
			    this.__array_observer__.addChangeRecord({
			      type: 'delete',
			      object: this,
			      name: 0,
			      oldValue: methodCallResult
			    });
			  }
			  return methodCallResult;
			};

			Array.prototype.sort = function () {
			  var oldArray = void 0;
			  if (this.__array_observer__ !== undefined) {
			    this.__array_observer__.flushChangeRecords();
			    oldArray = this.slice();
			  }
			  var methodCallResult = sort.apply(this, arguments);
			  if (this.__array_observer__ !== undefined) {
			    this.__array_observer__.reset(oldArray);
			  }
			  return methodCallResult;
			};

			Array.prototype.splice = function () {
			  var methodCallResult = splice.apply(this, arguments);
			  if (this.__array_observer__ !== undefined) {
			    this.__array_observer__.addChangeRecord({
			      type: 'splice',
			      object: this,
			      index: +arguments[0],
			      removed: methodCallResult,
			      addedCount: arguments.length > 2 ? arguments.length - 2 : 0
			    });
			  }
			  return methodCallResult;
			};

			Array.prototype.unshift = function () {
			  var methodCallResult = unshift.apply(this, arguments);
			  if (this.__array_observer__ !== undefined) {
			    this.__array_observer__.addChangeRecord({
			      type: 'splice',
			      object: this,
			      index: 0,
			      removed: [],
			      addedCount: arguments.length
			    });
			  }
			  return methodCallResult;
			};

			function _getArrayObserver(taskQueue, array) {
			  return ModifyArrayObserver.for(taskQueue, array);
			}

			exports.getArrayObserver = _getArrayObserver;

			var ModifyArrayObserver = function (_ModifyCollectionObse) {
			  _inherits(ModifyArrayObserver, _ModifyCollectionObse);

			  function ModifyArrayObserver(taskQueue, array) {
			    

			    return _possibleConstructorReturn(this, _ModifyCollectionObse.call(this, taskQueue, array));
			  }

			  ModifyArrayObserver.for = function _for(taskQueue, array) {
			    if (!('__array_observer__' in array)) {
			      Reflect.defineProperty(array, '__array_observer__', {
			        value: ModifyArrayObserver.create(taskQueue, array),
			        enumerable: false, configurable: false
			      });
			    }
			    return array.__array_observer__;
			  };

			  ModifyArrayObserver.create = function create(taskQueue, array) {
			    return new ModifyArrayObserver(taskQueue, array);
			  };

			  return ModifyArrayObserver;
			}(ModifyCollectionObserver);

			var Expression = exports.Expression = function () {
			  function Expression() {
			    

			    this.isChain = false;
			    this.isAssignable = false;
			  }

			  Expression.prototype.evaluate = function evaluate(scope, lookupFunctions, args) {
			    throw new Error('Binding expression "' + this + '" cannot be evaluated.');
			  };

			  Expression.prototype.assign = function assign(scope, value, lookupFunctions) {
			    throw new Error('Binding expression "' + this + '" cannot be assigned to.');
			  };

			  Expression.prototype.toString = function toString() {
			    return typeof FEATURE_NO_UNPARSER === 'undefined' ? _Unparser.unparse(this) : Function.prototype.toString.call(this);
			  };

			  return Expression;
			}();

			var Chain = exports.Chain = function (_Expression) {
			  _inherits(Chain, _Expression);

			  function Chain(expressions) {
			    

			    var _this3 = _possibleConstructorReturn(this, _Expression.call(this));

			    _this3.expressions = expressions;
			    _this3.isChain = true;
			    return _this3;
			  }

			  Chain.prototype.evaluate = function evaluate(scope, lookupFunctions) {
			    var result = void 0;
			    var expressions = this.expressions;
			    var last = void 0;

			    for (var _i7 = 0, length = expressions.length; _i7 < length; ++_i7) {
			      last = expressions[_i7].evaluate(scope, lookupFunctions);

			      if (last !== null) {
			        result = last;
			      }
			    }

			    return result;
			  };

			  Chain.prototype.accept = function accept(visitor) {
			    return visitor.visitChain(this);
			  };

			  return Chain;
			}(Expression);

			var BindingBehavior = exports.BindingBehavior = function (_Expression2) {
			  _inherits(BindingBehavior, _Expression2);

			  function BindingBehavior(expression, name, args) {
			    

			    var _this4 = _possibleConstructorReturn(this, _Expression2.call(this));

			    _this4.expression = expression;
			    _this4.name = name;
			    _this4.args = args;
			    return _this4;
			  }

			  BindingBehavior.prototype.evaluate = function evaluate(scope, lookupFunctions) {
			    return this.expression.evaluate(scope, lookupFunctions);
			  };

			  BindingBehavior.prototype.assign = function assign(scope, value, lookupFunctions) {
			    return this.expression.assign(scope, value, lookupFunctions);
			  };

			  BindingBehavior.prototype.accept = function accept(visitor) {
			    return visitor.visitBindingBehavior(this);
			  };

			  BindingBehavior.prototype.connect = function connect(binding, scope) {
			    this.expression.connect(binding, scope);
			  };

			  BindingBehavior.prototype.bind = function bind(binding, scope, lookupFunctions) {
			    if (this.expression.expression && this.expression.bind) {
			      this.expression.bind(binding, scope, lookupFunctions);
			    }
			    var behavior = lookupFunctions.bindingBehaviors(this.name);
			    if (!behavior) {
			      throw new Error('No BindingBehavior named "' + this.name + '" was found!');
			    }
			    var behaviorKey = 'behavior-' + this.name;
			    if (binding[behaviorKey]) {
			      throw new Error('A binding behavior named "' + this.name + '" has already been applied to "' + this.expression + '"');
			    }
			    binding[behaviorKey] = behavior;
			    behavior.bind.apply(behavior, [binding, scope].concat(evalList(scope, this.args, binding.lookupFunctions)));
			  };

			  BindingBehavior.prototype.unbind = function unbind(binding, scope) {
			    var behaviorKey = 'behavior-' + this.name;
			    binding[behaviorKey].unbind(binding, scope);
			    binding[behaviorKey] = null;
			    if (this.expression.expression && this.expression.unbind) {
			      this.expression.unbind(binding, scope);
			    }
			  };

			  return BindingBehavior;
			}(Expression);

			var ValueConverter = exports.ValueConverter = function (_Expression3) {
			  _inherits(ValueConverter, _Expression3);

			  function ValueConverter(expression, name, args, allArgs) {
			    

			    var _this5 = _possibleConstructorReturn(this, _Expression3.call(this));

			    _this5.expression = expression;
			    _this5.name = name;
			    _this5.args = args;
			    _this5.allArgs = allArgs;
			    return _this5;
			  }

			  ValueConverter.prototype.evaluate = function evaluate(scope, lookupFunctions) {
			    var converter = lookupFunctions.valueConverters(this.name);
			    if (!converter) {
			      throw new Error('No ValueConverter named "' + this.name + '" was found!');
			    }

			    if ('toView' in converter) {
			      return converter.toView.apply(converter, evalList(scope, this.allArgs, lookupFunctions));
			    }

			    return this.allArgs[0].evaluate(scope, lookupFunctions);
			  };

			  ValueConverter.prototype.assign = function assign(scope, value, lookupFunctions) {
			    var converter = lookupFunctions.valueConverters(this.name);
			    if (!converter) {
			      throw new Error('No ValueConverter named "' + this.name + '" was found!');
			    }

			    if ('fromView' in converter) {
			      value = converter.fromView.apply(converter, [value].concat(evalList(scope, this.args, lookupFunctions)));
			    }

			    return this.allArgs[0].assign(scope, value, lookupFunctions);
			  };

			  ValueConverter.prototype.accept = function accept(visitor) {
			    return visitor.visitValueConverter(this);
			  };

			  ValueConverter.prototype.connect = function connect(binding, scope) {
			    var expressions = this.allArgs;
			    var i = expressions.length;
			    while (i--) {
			      expressions[i].connect(binding, scope);
			    }
			    var converter = binding.lookupFunctions.valueConverters(this.name);
			    if (!converter) {
			      throw new Error('No ValueConverter named "' + this.name + '" was found!');
			    }
			    var signals = converter.signals;
			    if (signals === undefined) {
			      return;
			    }
			    i = signals.length;
			    while (i--) {
			      connectBindingToSignal(binding, signals[i]);
			    }
			  };

			  return ValueConverter;
			}(Expression);

			var Assign = exports.Assign = function (_Expression4) {
			  _inherits(Assign, _Expression4);

			  function Assign(target, value) {
			    

			    var _this6 = _possibleConstructorReturn(this, _Expression4.call(this));

			    _this6.target = target;
			    _this6.value = value;
			    _this6.isAssignable = true;
			    return _this6;
			  }

			  Assign.prototype.evaluate = function evaluate(scope, lookupFunctions) {
			    return this.target.assign(scope, this.value.evaluate(scope, lookupFunctions));
			  };

			  Assign.prototype.accept = function accept(vistor) {
			    vistor.visitAssign(this);
			  };

			  Assign.prototype.connect = function connect(binding, scope) {};

			  Assign.prototype.assign = function assign(scope, value) {
			    this.value.assign(scope, value);
			    this.target.assign(scope, value);
			  };

			  return Assign;
			}(Expression);

			var Conditional = exports.Conditional = function (_Expression5) {
			  _inherits(Conditional, _Expression5);

			  function Conditional(condition, yes, no) {
			    

			    var _this7 = _possibleConstructorReturn(this, _Expression5.call(this));

			    _this7.condition = condition;
			    _this7.yes = yes;
			    _this7.no = no;
			    return _this7;
			  }

			  Conditional.prototype.evaluate = function evaluate(scope, lookupFunctions) {
			    return !!this.condition.evaluate(scope, lookupFunctions) ? this.yes.evaluate(scope, lookupFunctions) : this.no.evaluate(scope, lookupFunctions);
			  };

			  Conditional.prototype.accept = function accept(visitor) {
			    return visitor.visitConditional(this);
			  };

			  Conditional.prototype.connect = function connect(binding, scope) {
			    this.condition.connect(binding, scope);
			    if (this.condition.evaluate(scope)) {
			      this.yes.connect(binding, scope);
			    } else {
			      this.no.connect(binding, scope);
			    }
			  };

			  return Conditional;
			}(Expression);

			var AccessThis = exports.AccessThis = function (_Expression6) {
			  _inherits(AccessThis, _Expression6);

			  function AccessThis(ancestor) {
			    

			    var _this8 = _possibleConstructorReturn(this, _Expression6.call(this));

			    _this8.ancestor = ancestor;
			    return _this8;
			  }

			  AccessThis.prototype.evaluate = function evaluate(scope, lookupFunctions) {
			    var oc = scope.overrideContext;
			    var i = this.ancestor;
			    while (i-- && oc) {
			      oc = oc.parentOverrideContext;
			    }
			    return i < 1 && oc ? oc.bindingContext : undefined;
			  };

			  AccessThis.prototype.accept = function accept(visitor) {
			    return visitor.visitAccessThis(this);
			  };

			  AccessThis.prototype.connect = function connect(binding, scope) {};

			  return AccessThis;
			}(Expression);

			var AccessScope = exports.AccessScope = function (_Expression7) {
			  _inherits(AccessScope, _Expression7);

			  function AccessScope(name, ancestor) {
			    

			    var _this9 = _possibleConstructorReturn(this, _Expression7.call(this));

			    _this9.name = name;
			    _this9.ancestor = ancestor;
			    _this9.isAssignable = true;
			    return _this9;
			  }

			  AccessScope.prototype.evaluate = function evaluate(scope, lookupFunctions) {
			    var context = getContextFor(this.name, scope, this.ancestor);
			    return context[this.name];
			  };

			  AccessScope.prototype.assign = function assign(scope, value) {
			    var context = getContextFor(this.name, scope, this.ancestor);
			    return context ? context[this.name] = value : undefined;
			  };

			  AccessScope.prototype.accept = function accept(visitor) {
			    return visitor.visitAccessScope(this);
			  };

			  AccessScope.prototype.connect = function connect(binding, scope) {
			    var context = getContextFor(this.name, scope, this.ancestor);
			    binding.observeProperty(context, this.name);
			  };

			  return AccessScope;
			}(Expression);

			var AccessMember = exports.AccessMember = function (_Expression8) {
			  _inherits(AccessMember, _Expression8);

			  function AccessMember(object, name) {
			    

			    var _this10 = _possibleConstructorReturn(this, _Expression8.call(this));

			    _this10.object = object;
			    _this10.name = name;
			    _this10.isAssignable = true;
			    return _this10;
			  }

			  AccessMember.prototype.evaluate = function evaluate(scope, lookupFunctions) {
			    var instance = this.object.evaluate(scope, lookupFunctions);
			    return instance === null || instance === undefined ? instance : instance[this.name];
			  };

			  AccessMember.prototype.assign = function assign(scope, value) {
			    var instance = this.object.evaluate(scope);

			    if (instance === null || instance === undefined) {
			      instance = {};
			      this.object.assign(scope, instance);
			    }

			    instance[this.name] = value;
			    return value;
			  };

			  AccessMember.prototype.accept = function accept(visitor) {
			    return visitor.visitAccessMember(this);
			  };

			  AccessMember.prototype.connect = function connect(binding, scope) {
			    this.object.connect(binding, scope);
			    var obj = this.object.evaluate(scope);
			    if (obj) {
			      binding.observeProperty(obj, this.name);
			    }
			  };

			  return AccessMember;
			}(Expression);

			var AccessKeyed = exports.AccessKeyed = function (_Expression9) {
			  _inherits(AccessKeyed, _Expression9);

			  function AccessKeyed(object, key) {
			    

			    var _this11 = _possibleConstructorReturn(this, _Expression9.call(this));

			    _this11.object = object;
			    _this11.key = key;
			    _this11.isAssignable = true;
			    return _this11;
			  }

			  AccessKeyed.prototype.evaluate = function evaluate(scope, lookupFunctions) {
			    var instance = this.object.evaluate(scope, lookupFunctions);
			    var lookup = this.key.evaluate(scope, lookupFunctions);
			    return getKeyed(instance, lookup);
			  };

			  AccessKeyed.prototype.assign = function assign(scope, value) {
			    var instance = this.object.evaluate(scope);
			    var lookup = this.key.evaluate(scope);
			    return setKeyed(instance, lookup, value);
			  };

			  AccessKeyed.prototype.accept = function accept(visitor) {
			    return visitor.visitAccessKeyed(this);
			  };

			  AccessKeyed.prototype.connect = function connect(binding, scope) {
			    this.object.connect(binding, scope);
			    var obj = this.object.evaluate(scope);
			    if (obj instanceof Object) {
			      this.key.connect(binding, scope);
			      var key = this.key.evaluate(scope);

			      if (key !== null && key !== undefined && !(Array.isArray(obj) && typeof key === 'number')) {
			        binding.observeProperty(obj, key);
			      }
			    }
			  };

			  return AccessKeyed;
			}(Expression);

			var CallScope = exports.CallScope = function (_Expression10) {
			  _inherits(CallScope, _Expression10);

			  function CallScope(name, args, ancestor) {
			    

			    var _this12 = _possibleConstructorReturn(this, _Expression10.call(this));

			    _this12.name = name;
			    _this12.args = args;
			    _this12.ancestor = ancestor;
			    return _this12;
			  }

			  CallScope.prototype.evaluate = function evaluate(scope, lookupFunctions, mustEvaluate) {
			    var args = evalList(scope, this.args, lookupFunctions);
			    var context = getContextFor(this.name, scope, this.ancestor);
			    var func = getFunction(context, this.name, mustEvaluate);
			    if (func) {
			      return func.apply(context, args);
			    }
			    return undefined;
			  };

			  CallScope.prototype.accept = function accept(visitor) {
			    return visitor.visitCallScope(this);
			  };

			  CallScope.prototype.connect = function connect(binding, scope) {
			    var args = this.args;
			    var i = args.length;
			    while (i--) {
			      args[i].connect(binding, scope);
			    }
			  };

			  return CallScope;
			}(Expression);

			var CallMember = exports.CallMember = function (_Expression11) {
			  _inherits(CallMember, _Expression11);

			  function CallMember(object, name, args) {
			    

			    var _this13 = _possibleConstructorReturn(this, _Expression11.call(this));

			    _this13.object = object;
			    _this13.name = name;
			    _this13.args = args;
			    return _this13;
			  }

			  CallMember.prototype.evaluate = function evaluate(scope, lookupFunctions, mustEvaluate) {
			    var instance = this.object.evaluate(scope, lookupFunctions);
			    var args = evalList(scope, this.args, lookupFunctions);
			    var func = getFunction(instance, this.name, mustEvaluate);
			    if (func) {
			      return func.apply(instance, args);
			    }
			    return undefined;
			  };

			  CallMember.prototype.accept = function accept(visitor) {
			    return visitor.visitCallMember(this);
			  };

			  CallMember.prototype.connect = function connect(binding, scope) {
			    this.object.connect(binding, scope);
			    var obj = this.object.evaluate(scope);
			    if (getFunction(obj, this.name, false)) {
			      var args = this.args;
			      var _i8 = args.length;
			      while (_i8--) {
			        args[_i8].connect(binding, scope);
			      }
			    }
			  };

			  return CallMember;
			}(Expression);

			var CallFunction = exports.CallFunction = function (_Expression12) {
			  _inherits(CallFunction, _Expression12);

			  function CallFunction(func, args) {
			    

			    var _this14 = _possibleConstructorReturn(this, _Expression12.call(this));

			    _this14.func = func;
			    _this14.args = args;
			    return _this14;
			  }

			  CallFunction.prototype.evaluate = function evaluate(scope, lookupFunctions, mustEvaluate) {
			    var func = this.func.evaluate(scope, lookupFunctions);
			    if (typeof func === 'function') {
			      return func.apply(null, evalList(scope, this.args, lookupFunctions));
			    }
			    if (!mustEvaluate && (func === null || func === undefined)) {
			      return undefined;
			    }
			    throw new Error(this.func + ' is not a function');
			  };

			  CallFunction.prototype.accept = function accept(visitor) {
			    return visitor.visitCallFunction(this);
			  };

			  CallFunction.prototype.connect = function connect(binding, scope) {
			    this.func.connect(binding, scope);
			    var func = this.func.evaluate(scope);
			    if (typeof func === 'function') {
			      var args = this.args;
			      var _i9 = args.length;
			      while (_i9--) {
			        args[_i9].connect(binding, scope);
			      }
			    }
			  };

			  return CallFunction;
			}(Expression);

			var Binary = exports.Binary = function (_Expression13) {
			  _inherits(Binary, _Expression13);

			  function Binary(operation, left, right) {
			    

			    var _this15 = _possibleConstructorReturn(this, _Expression13.call(this));

			    _this15.operation = operation;
			    _this15.left = left;
			    _this15.right = right;
			    return _this15;
			  }

			  Binary.prototype.evaluate = function evaluate(scope, lookupFunctions) {
			    var left = this.left.evaluate(scope, lookupFunctions);

			    switch (this.operation) {
			      case '&&':
			        return left && this.right.evaluate(scope, lookupFunctions);
			      case '||':
			        return left || this.right.evaluate(scope, lookupFunctions);
			    }

			    var right = this.right.evaluate(scope, lookupFunctions);

			    switch (this.operation) {
			      case '==':
			        return left == right;
			      case '===':
			        return left === right;
			      case '!=':
			        return left != right;
			      case '!==':
			        return left !== right;
			    }

			    if (left === null || right === null || left === undefined || right === undefined) {
			      switch (this.operation) {
			        case '+':
			          if (left !== null && left !== undefined) return left;
			          if (right !== null && right !== undefined) return right;
			          return 0;
			        case '-':
			          if (left !== null && left !== undefined) return left;
			          if (right !== null && right !== undefined) return 0 - right;
			          return 0;
			      }

			      return null;
			    }

			    switch (this.operation) {
			      case '+':
			        return autoConvertAdd(left, right);
			      case '-':
			        return left - right;
			      case '*':
			        return left * right;
			      case '/':
			        return left / right;
			      case '%':
			        return left % right;
			      case '<':
			        return left < right;
			      case '>':
			        return left > right;
			      case '<=':
			        return left <= right;
			      case '>=':
			        return left >= right;
			      case '^':
			        return left ^ right;
			    }

			    throw new Error('Internal error [' + this.operation + '] not handled');
			  };

			  Binary.prototype.accept = function accept(visitor) {
			    return visitor.visitBinary(this);
			  };

			  Binary.prototype.connect = function connect(binding, scope) {
			    this.left.connect(binding, scope);
			    var left = this.left.evaluate(scope);
			    if (this.operation === '&&' && !left || this.operation === '||' && left) {
			      return;
			    }
			    this.right.connect(binding, scope);
			  };

			  return Binary;
			}(Expression);

			var PrefixNot = exports.PrefixNot = function (_Expression14) {
			  _inherits(PrefixNot, _Expression14);

			  function PrefixNot(operation, expression) {
			    

			    var _this16 = _possibleConstructorReturn(this, _Expression14.call(this));

			    _this16.operation = operation;
			    _this16.expression = expression;
			    return _this16;
			  }

			  PrefixNot.prototype.evaluate = function evaluate(scope, lookupFunctions) {
			    return !this.expression.evaluate(scope, lookupFunctions);
			  };

			  PrefixNot.prototype.accept = function accept(visitor) {
			    return visitor.visitPrefix(this);
			  };

			  PrefixNot.prototype.connect = function connect(binding, scope) {
			    this.expression.connect(binding, scope);
			  };

			  return PrefixNot;
			}(Expression);

			var LiteralPrimitive = exports.LiteralPrimitive = function (_Expression15) {
			  _inherits(LiteralPrimitive, _Expression15);

			  function LiteralPrimitive(value) {
			    

			    var _this17 = _possibleConstructorReturn(this, _Expression15.call(this));

			    _this17.value = value;
			    return _this17;
			  }

			  LiteralPrimitive.prototype.evaluate = function evaluate(scope, lookupFunctions) {
			    return this.value;
			  };

			  LiteralPrimitive.prototype.accept = function accept(visitor) {
			    return visitor.visitLiteralPrimitive(this);
			  };

			  LiteralPrimitive.prototype.connect = function connect(binding, scope) {};

			  return LiteralPrimitive;
			}(Expression);

			var LiteralString = exports.LiteralString = function (_Expression16) {
			  _inherits(LiteralString, _Expression16);

			  function LiteralString(value) {
			    

			    var _this18 = _possibleConstructorReturn(this, _Expression16.call(this));

			    _this18.value = value;
			    return _this18;
			  }

			  LiteralString.prototype.evaluate = function evaluate(scope, lookupFunctions) {
			    return this.value;
			  };

			  LiteralString.prototype.accept = function accept(visitor) {
			    return visitor.visitLiteralString(this);
			  };

			  LiteralString.prototype.connect = function connect(binding, scope) {};

			  return LiteralString;
			}(Expression);

			var LiteralArray = exports.LiteralArray = function (_Expression17) {
			  _inherits(LiteralArray, _Expression17);

			  function LiteralArray(elements) {
			    

			    var _this19 = _possibleConstructorReturn(this, _Expression17.call(this));

			    _this19.elements = elements;
			    return _this19;
			  }

			  LiteralArray.prototype.evaluate = function evaluate(scope, lookupFunctions) {
			    var elements = this.elements;
			    var result = [];

			    for (var _i10 = 0, length = elements.length; _i10 < length; ++_i10) {
			      result[_i10] = elements[_i10].evaluate(scope, lookupFunctions);
			    }

			    return result;
			  };

			  LiteralArray.prototype.accept = function accept(visitor) {
			    return visitor.visitLiteralArray(this);
			  };

			  LiteralArray.prototype.connect = function connect(binding, scope) {
			    var length = this.elements.length;
			    for (var _i11 = 0; _i11 < length; _i11++) {
			      this.elements[_i11].connect(binding, scope);
			    }
			  };

			  return LiteralArray;
			}(Expression);

			var LiteralObject = exports.LiteralObject = function (_Expression18) {
			  _inherits(LiteralObject, _Expression18);

			  function LiteralObject(keys, values) {
			    

			    var _this20 = _possibleConstructorReturn(this, _Expression18.call(this));

			    _this20.keys = keys;
			    _this20.values = values;
			    return _this20;
			  }

			  LiteralObject.prototype.evaluate = function evaluate(scope, lookupFunctions) {
			    var instance = {};
			    var keys = this.keys;
			    var values = this.values;

			    for (var _i12 = 0, length = keys.length; _i12 < length; ++_i12) {
			      instance[keys[_i12]] = values[_i12].evaluate(scope, lookupFunctions);
			    }

			    return instance;
			  };

			  LiteralObject.prototype.accept = function accept(visitor) {
			    return visitor.visitLiteralObject(this);
			  };

			  LiteralObject.prototype.connect = function connect(binding, scope) {
			    var length = this.keys.length;
			    for (var _i13 = 0; _i13 < length; _i13++) {
			      this.values[_i13].connect(binding, scope);
			    }
			  };

			  return LiteralObject;
			}(Expression);

			function evalList(scope, list, lookupFunctions) {
			  var length = list.length;
			  var result = [];
			  for (var _i14 = 0; _i14 < length; _i14++) {
			    result[_i14] = list[_i14].evaluate(scope, lookupFunctions);
			  }
			  return result;
			}

			function autoConvertAdd(a, b) {
			  if (a !== null && b !== null) {
			    if (typeof a === 'string' && typeof b !== 'string') {
			      return a + b.toString();
			    }

			    if (typeof a !== 'string' && typeof b === 'string') {
			      return a.toString() + b;
			    }

			    return a + b;
			  }

			  if (a !== null) {
			    return a;
			  }

			  if (b !== null) {
			    return b;
			  }

			  return 0;
			}

			function getFunction(obj, name, mustExist) {
			  var func = obj === null || obj === undefined ? null : obj[name];
			  if (typeof func === 'function') {
			    return func;
			  }
			  if (!mustExist && (func === null || func === undefined)) {
			    return null;
			  }
			  throw new Error(name + ' is not a function');
			}

			function getKeyed(obj, key) {
			  if (Array.isArray(obj)) {
			    return obj[parseInt(key, 10)];
			  } else if (obj) {
			    return obj[key];
			  } else if (obj === null || obj === undefined) {
			    return undefined;
			  }

			  return obj[key];
			}

			function setKeyed(obj, key, value) {
			  if (Array.isArray(obj)) {
			    var index = parseInt(key, 10);

			    if (obj.length <= index) {
			      obj.length = index + 1;
			    }

			    obj[index] = value;
			  } else {
			    obj[key] = value;
			  }

			  return value;
			}

			var _Unparser = null;

			exports.Unparser = _Unparser;
			if (typeof FEATURE_NO_UNPARSER === 'undefined') {
			  exports.Unparser = _Unparser = function () {
			    function Unparser(buffer) {
			      

			      this.buffer = buffer;
			    }

			    Unparser.unparse = function unparse(expression) {
			      var buffer = [];
			      var visitor = new _Unparser(buffer);

			      expression.accept(visitor);

			      return buffer.join('');
			    };

			    Unparser.prototype.write = function write(text) {
			      this.buffer.push(text);
			    };

			    Unparser.prototype.writeArgs = function writeArgs(args) {
			      this.write('(');

			      for (var _i15 = 0, length = args.length; _i15 < length; ++_i15) {
			        if (_i15 !== 0) {
			          this.write(',');
			        }

			        args[_i15].accept(this);
			      }

			      this.write(')');
			    };

			    Unparser.prototype.visitChain = function visitChain(chain) {
			      var expressions = chain.expressions;

			      for (var _i16 = 0, length = expressions.length; _i16 < length; ++_i16) {
			        if (_i16 !== 0) {
			          this.write(';');
			        }

			        expressions[_i16].accept(this);
			      }
			    };

			    Unparser.prototype.visitBindingBehavior = function visitBindingBehavior(behavior) {
			      var args = behavior.args;

			      behavior.expression.accept(this);
			      this.write('&' + behavior.name);

			      for (var _i17 = 0, length = args.length; _i17 < length; ++_i17) {
			        this.write(':');
			        args[_i17].accept(this);
			      }
			    };

			    Unparser.prototype.visitValueConverter = function visitValueConverter(converter) {
			      var args = converter.args;

			      converter.expression.accept(this);
			      this.write('|' + converter.name);

			      for (var _i18 = 0, length = args.length; _i18 < length; ++_i18) {
			        this.write(':');
			        args[_i18].accept(this);
			      }
			    };

			    Unparser.prototype.visitAssign = function visitAssign(assign) {
			      assign.target.accept(this);
			      this.write('=');
			      assign.value.accept(this);
			    };

			    Unparser.prototype.visitConditional = function visitConditional(conditional) {
			      conditional.condition.accept(this);
			      this.write('?');
			      conditional.yes.accept(this);
			      this.write(':');
			      conditional.no.accept(this);
			    };

			    Unparser.prototype.visitAccessThis = function visitAccessThis(access) {
			      if (access.ancestor === 0) {
			        this.write('$this');
			        return;
			      }
			      this.write('$parent');
			      var i = access.ancestor - 1;
			      while (i--) {
			        this.write('.$parent');
			      }
			    };

			    Unparser.prototype.visitAccessScope = function visitAccessScope(access) {
			      var i = access.ancestor;
			      while (i--) {
			        this.write('$parent.');
			      }
			      this.write(access.name);
			    };

			    Unparser.prototype.visitAccessMember = function visitAccessMember(access) {
			      access.object.accept(this);
			      this.write('.' + access.name);
			    };

			    Unparser.prototype.visitAccessKeyed = function visitAccessKeyed(access) {
			      access.object.accept(this);
			      this.write('[');
			      access.key.accept(this);
			      this.write(']');
			    };

			    Unparser.prototype.visitCallScope = function visitCallScope(call) {
			      var i = call.ancestor;
			      while (i--) {
			        this.write('$parent.');
			      }
			      this.write(call.name);
			      this.writeArgs(call.args);
			    };

			    Unparser.prototype.visitCallFunction = function visitCallFunction(call) {
			      call.func.accept(this);
			      this.writeArgs(call.args);
			    };

			    Unparser.prototype.visitCallMember = function visitCallMember(call) {
			      call.object.accept(this);
			      this.write('.' + call.name);
			      this.writeArgs(call.args);
			    };

			    Unparser.prototype.visitPrefix = function visitPrefix(prefix) {
			      this.write('(' + prefix.operation);
			      prefix.expression.accept(this);
			      this.write(')');
			    };

			    Unparser.prototype.visitBinary = function visitBinary(binary) {
			      binary.left.accept(this);
			      this.write(binary.operation);
			      binary.right.accept(this);
			    };

			    Unparser.prototype.visitLiteralPrimitive = function visitLiteralPrimitive(literal) {
			      this.write('' + literal.value);
			    };

			    Unparser.prototype.visitLiteralArray = function visitLiteralArray(literal) {
			      var elements = literal.elements;

			      this.write('[');

			      for (var _i19 = 0, length = elements.length; _i19 < length; ++_i19) {
			        if (_i19 !== 0) {
			          this.write(',');
			        }

			        elements[_i19].accept(this);
			      }

			      this.write(']');
			    };

			    Unparser.prototype.visitLiteralObject = function visitLiteralObject(literal) {
			      var keys = literal.keys;
			      var values = literal.values;

			      this.write('{');

			      for (var _i20 = 0, length = keys.length; _i20 < length; ++_i20) {
			        if (_i20 !== 0) {
			          this.write(',');
			        }

			        this.write('\'' + keys[_i20] + '\':');
			        values[_i20].accept(this);
			      }

			      this.write('}');
			    };

			    Unparser.prototype.visitLiteralString = function visitLiteralString(literal) {
			      var escaped = literal.value.replace(/'/g, "\'");
			      this.write('\'' + escaped + '\'');
			    };

			    return Unparser;
			  }();
			}

			var ExpressionCloner = exports.ExpressionCloner = function () {
			  function ExpressionCloner() {
			    
			  }

			  ExpressionCloner.prototype.cloneExpressionArray = function cloneExpressionArray(array) {
			    var clonedArray = [];
			    var i = array.length;
			    while (i--) {
			      clonedArray[i] = array[i].accept(this);
			    }
			    return clonedArray;
			  };

			  ExpressionCloner.prototype.visitChain = function visitChain(chain) {
			    return new Chain(this.cloneExpressionArray(chain.expressions));
			  };

			  ExpressionCloner.prototype.visitBindingBehavior = function visitBindingBehavior(behavior) {
			    return new BindingBehavior(behavior.expression.accept(this), behavior.name, this.cloneExpressionArray(behavior.args));
			  };

			  ExpressionCloner.prototype.visitValueConverter = function visitValueConverter(converter) {
			    return new ValueConverter(converter.expression.accept(this), converter.name, this.cloneExpressionArray(converter.args));
			  };

			  ExpressionCloner.prototype.visitAssign = function visitAssign(assign) {
			    return new Assign(assign.target.accept(this), assign.value.accept(this));
			  };

			  ExpressionCloner.prototype.visitConditional = function visitConditional(conditional) {
			    return new Conditional(conditional.condition.accept(this), conditional.yes.accept(this), conditional.no.accept(this));
			  };

			  ExpressionCloner.prototype.visitAccessThis = function visitAccessThis(access) {
			    return new AccessThis(access.ancestor);
			  };

			  ExpressionCloner.prototype.visitAccessScope = function visitAccessScope(access) {
			    return new AccessScope(access.name, access.ancestor);
			  };

			  ExpressionCloner.prototype.visitAccessMember = function visitAccessMember(access) {
			    return new AccessMember(access.object.accept(this), access.name);
			  };

			  ExpressionCloner.prototype.visitAccessKeyed = function visitAccessKeyed(access) {
			    return new AccessKeyed(access.object.accept(this), access.key.accept(this));
			  };

			  ExpressionCloner.prototype.visitCallScope = function visitCallScope(call) {
			    return new CallScope(call.name, this.cloneExpressionArray(call.args), call.ancestor);
			  };

			  ExpressionCloner.prototype.visitCallFunction = function visitCallFunction(call) {
			    return new CallFunction(call.func.accept(this), this.cloneExpressionArray(call.args));
			  };

			  ExpressionCloner.prototype.visitCallMember = function visitCallMember(call) {
			    return new CallMember(call.object.accept(this), call.name, this.cloneExpressionArray(call.args));
			  };

			  ExpressionCloner.prototype.visitPrefix = function visitPrefix(prefix) {
			    return new PrefixNot(prefix.operation, prefix.expression.accept(this));
			  };

			  ExpressionCloner.prototype.visitBinary = function visitBinary(binary) {
			    return new Binary(binary.operation, binary.left.accept(this), binary.right.accept(this));
			  };

			  ExpressionCloner.prototype.visitLiteralPrimitive = function visitLiteralPrimitive(literal) {
			    return new LiteralPrimitive(literal);
			  };

			  ExpressionCloner.prototype.visitLiteralArray = function visitLiteralArray(literal) {
			    return new LiteralArray(this.cloneExpressionArray(literal.elements));
			  };

			  ExpressionCloner.prototype.visitLiteralObject = function visitLiteralObject(literal) {
			    return new LiteralObject(literal.keys, this.cloneExpressionArray(literal.values));
			  };

			  ExpressionCloner.prototype.visitLiteralString = function visitLiteralString(literal) {
			    return new LiteralString(literal.value);
			  };

			  return ExpressionCloner;
			}();

			function cloneExpression(expression) {
			  var visitor = new ExpressionCloner();
			  return expression.accept(visitor);
			}

			var bindingMode = exports.bindingMode = {
			  oneTime: 0,
			  toView: 1,
			  oneWay: 1,
			  twoWay: 2,
			  fromView: 3
			};

			var Token = exports.Token = function () {
			  function Token(index, text) {
			    

			    this.index = index;
			    this.text = text;
			  }

			  Token.prototype.withOp = function withOp(op) {
			    this.opKey = op;
			    return this;
			  };

			  Token.prototype.withGetterSetter = function withGetterSetter(key) {
			    this.key = key;
			    return this;
			  };

			  Token.prototype.withValue = function withValue(value) {
			    this.value = value;
			    return this;
			  };

			  Token.prototype.toString = function toString() {
			    return 'Token(' + this.text + ')';
			  };

			  return Token;
			}();

			var Lexer = exports.Lexer = function () {
			  function Lexer() {
			    
			  }

			  Lexer.prototype.lex = function lex(text) {
			    var scanner = new Scanner(text);
			    var tokens = [];
			    var token = scanner.scanToken();

			    while (token) {
			      tokens.push(token);
			      token = scanner.scanToken();
			    }

			    return tokens;
			  };

			  return Lexer;
			}();

			var Scanner = exports.Scanner = function () {
			  function Scanner(input) {
			    

			    this.input = input;
			    this.length = input.length;
			    this.peek = 0;
			    this.index = -1;

			    this.advance();
			  }

			  Scanner.prototype.scanToken = function scanToken() {
			    while (this.peek <= $SPACE) {
			      if (++this.index >= this.length) {
			        this.peek = $EOF;
			        return null;
			      }

			      this.peek = this.input.charCodeAt(this.index);
			    }

			    if (isIdentifierStart(this.peek)) {
			      return this.scanIdentifier();
			    }

			    if (isDigit(this.peek)) {
			      return this.scanNumber(this.index);
			    }

			    var start = this.index;

			    switch (this.peek) {
			      case $PERIOD:
			        this.advance();
			        return isDigit(this.peek) ? this.scanNumber(start) : new Token(start, '.');
			      case $LPAREN:
			      case $RPAREN:
			      case $LBRACE:
			      case $RBRACE:
			      case $LBRACKET:
			      case $RBRACKET:
			      case $COMMA:
			      case $COLON:
			      case $SEMICOLON:
			        return this.scanCharacter(start, String.fromCharCode(this.peek));
			      case $SQ:
			      case $DQ:
			        return this.scanString();
			      case $PLUS:
			      case $MINUS:
			      case $STAR:
			      case $SLASH:
			      case $PERCENT:
			      case $CARET:
			      case $QUESTION:
			        return this.scanOperator(start, String.fromCharCode(this.peek));
			      case $LT:
			      case $GT:
			      case $BANG:
			      case $EQ:
			        return this.scanComplexOperator(start, $EQ, String.fromCharCode(this.peek), '=');
			      case $AMPERSAND:
			        return this.scanComplexOperator(start, $AMPERSAND, '&', '&');
			      case $BAR:
			        return this.scanComplexOperator(start, $BAR, '|', '|');
			      case $NBSP:
			        while (isWhitespace(this.peek)) {
			          this.advance();
			        }

			        return this.scanToken();
			    }

			    var character = String.fromCharCode(this.peek);
			    this.error('Unexpected character [' + character + ']');
			    return null;
			  };

			  Scanner.prototype.scanCharacter = function scanCharacter(start, text) {
			    assert(this.peek === text.charCodeAt(0));
			    this.advance();
			    return new Token(start, text);
			  };

			  Scanner.prototype.scanOperator = function scanOperator(start, text) {
			    assert(this.peek === text.charCodeAt(0));
			    assert(OPERATORS[text] === 1);
			    this.advance();
			    return new Token(start, text).withOp(text);
			  };

			  Scanner.prototype.scanComplexOperator = function scanComplexOperator(start, code, one, two) {
			    assert(this.peek === one.charCodeAt(0));
			    this.advance();

			    var text = one;

			    if (this.peek === code) {
			      this.advance();
			      text += two;
			    }

			    if (this.peek === code) {
			      this.advance();
			      text += two;
			    }

			    assert(OPERATORS[text] === 1);

			    return new Token(start, text).withOp(text);
			  };

			  Scanner.prototype.scanIdentifier = function scanIdentifier() {
			    assert(isIdentifierStart(this.peek));
			    var start = this.index;

			    this.advance();

			    while (isIdentifierPart(this.peek)) {
			      this.advance();
			    }

			    var text = this.input.substring(start, this.index);
			    var result = new Token(start, text);

			    if (OPERATORS[text] === 1) {
			      result.withOp(text);
			    } else {
			      result.withGetterSetter(text);
			    }

			    return result;
			  };

			  Scanner.prototype.scanNumber = function scanNumber(start) {
			    assert(isDigit(this.peek));
			    var simple = this.index === start;
			    this.advance();

			    while (true) {
			      if (!isDigit(this.peek)) {
			        if (this.peek === $PERIOD) {
			          simple = false;
			        } else if (isExponentStart(this.peek)) {
			          this.advance();

			          if (isExponentSign(this.peek)) {
			            this.advance();
			          }

			          if (!isDigit(this.peek)) {
			            this.error('Invalid exponent', -1);
			          }

			          simple = false;
			        } else {
			          break;
			        }
			      }

			      this.advance();
			    }

			    var text = this.input.substring(start, this.index);
			    var value = simple ? parseInt(text, 10) : parseFloat(text);
			    return new Token(start, text).withValue(value);
			  };

			  Scanner.prototype.scanString = function scanString() {
			    assert(this.peek === $SQ || this.peek === $DQ);

			    var start = this.index;
			    var quote = this.peek;

			    this.advance();

			    var buffer = void 0;
			    var marker = this.index;

			    while (this.peek !== quote) {
			      if (this.peek === $BACKSLASH) {
			        if (!buffer) {
			          buffer = [];
			        }

			        buffer.push(this.input.substring(marker, this.index));
			        this.advance();

			        var _unescaped = void 0;

			        if (this.peek === $u) {
			          var hex = this.input.substring(this.index + 1, this.index + 5);

			          if (!/[A-Z0-9]{4}/.test(hex)) {
			            this.error('Invalid unicode escape [\\u' + hex + ']');
			          }

			          _unescaped = parseInt(hex, 16);

			          for (var _i21 = 0; _i21 < 5; ++_i21) {
			            this.advance();
			          }
			        } else {
			          _unescaped = unescape(this.peek);
			          this.advance();
			        }

			        buffer.push(String.fromCharCode(_unescaped));
			        marker = this.index;
			      } else if (this.peek === $EOF) {
			        this.error('Unterminated quote');
			      } else {
			        this.advance();
			      }
			    }

			    var last = this.input.substring(marker, this.index);
			    this.advance();
			    var text = this.input.substring(start, this.index);

			    var unescaped = last;

			    if (buffer !== null && buffer !== undefined) {
			      buffer.push(last);
			      unescaped = buffer.join('');
			    }

			    return new Token(start, text).withValue(unescaped);
			  };

			  Scanner.prototype.advance = function advance() {
			    if (++this.index >= this.length) {
			      this.peek = $EOF;
			    } else {
			      this.peek = this.input.charCodeAt(this.index);
			    }
			  };

			  Scanner.prototype.error = function error(message) {
			    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			    var position = this.index + offset;
			    throw new Error('Lexer Error: ' + message + ' at column ' + position + ' in expression [' + this.input + ']');
			  };

			  return Scanner;
			}();

			var OPERATORS = {
			  'undefined': 1,
			  'null': 1,
			  'true': 1,
			  'false': 1,
			  '+': 1,
			  '-': 1,
			  '*': 1,
			  '/': 1,
			  '%': 1,
			  '^': 1,
			  '=': 1,
			  '==': 1,
			  '===': 1,
			  '!=': 1,
			  '!==': 1,
			  '<': 1,
			  '>': 1,
			  '<=': 1,
			  '>=': 1,
			  '&&': 1,
			  '||': 1,
			  '&': 1,
			  '|': 1,
			  '!': 1,
			  '?': 1
			};

			var $EOF = 0;
			var $TAB = 9;
			var $LF = 10;
			var $VTAB = 11;
			var $FF = 12;
			var $CR = 13;
			var $SPACE = 32;
			var $BANG = 33;
			var $DQ = 34;
			var $$ = 36;
			var $PERCENT = 37;
			var $AMPERSAND = 38;
			var $SQ = 39;
			var $LPAREN = 40;
			var $RPAREN = 41;
			var $STAR = 42;
			var $PLUS = 43;
			var $COMMA = 44;
			var $MINUS = 45;
			var $PERIOD = 46;
			var $SLASH = 47;
			var $COLON = 58;
			var $SEMICOLON = 59;
			var $LT = 60;
			var $EQ = 61;
			var $GT = 62;
			var $QUESTION = 63;

			var $0 = 48;
			var $9 = 57;

			var $A = 65;
			var $E = 69;
			var $Z = 90;

			var $LBRACKET = 91;
			var $BACKSLASH = 92;
			var $RBRACKET = 93;
			var $CARET = 94;
			var $_ = 95;

			var $a = 97;
			var $e = 101;
			var $f = 102;
			var $n = 110;
			var $r = 114;
			var $t = 116;
			var $u = 117;
			var $v = 118;
			var $z = 122;

			var $LBRACE = 123;
			var $BAR = 124;
			var $RBRACE = 125;
			var $NBSP = 160;

			function isWhitespace(code) {
			  return code >= $TAB && code <= $SPACE || code === $NBSP;
			}

			function isIdentifierStart(code) {
			  return $a <= code && code <= $z || $A <= code && code <= $Z || code === $_ || code === $$;
			}

			function isIdentifierPart(code) {
			  return $a <= code && code <= $z || $A <= code && code <= $Z || $0 <= code && code <= $9 || code === $_ || code === $$;
			}

			function isDigit(code) {
			  return $0 <= code && code <= $9;
			}

			function isExponentStart(code) {
			  return code === $e || code === $E;
			}

			function isExponentSign(code) {
			  return code === $MINUS || code === $PLUS;
			}

			function unescape(code) {
			  switch (code) {
			    case $n:
			      return $LF;
			    case $f:
			      return $FF;
			    case $r:
			      return $CR;
			    case $t:
			      return $TAB;
			    case $v:
			      return $VTAB;
			    default:
			      return code;
			  }
			}

			function assert(condition, message) {
			  if (!condition) {
			    throw message || 'Assertion failed';
			  }
			}

			var EOF = new Token(-1, null);

			var Parser = exports.Parser = function () {
			  function Parser() {
			    

			    this.cache = {};
			    this.lexer = new Lexer();
			  }

			  Parser.prototype.parse = function parse(input) {
			    input = input || '';

			    return this.cache[input] || (this.cache[input] = new ParserImplementation(this.lexer, input).parseChain());
			  };

			  return Parser;
			}();

			var ParserImplementation = exports.ParserImplementation = function () {
			  function ParserImplementation(lexer, input) {
			    

			    this.index = 0;
			    this.input = input;
			    this.tokens = lexer.lex(input);
			  }

			  ParserImplementation.prototype.parseChain = function parseChain() {
			    var isChain = false;
			    var expressions = [];

			    while (this.optional(';')) {
			      isChain = true;
			    }

			    while (this.index < this.tokens.length) {
			      if (this.peek.text === ')' || this.peek.text === '}' || this.peek.text === ']') {
			        this.error('Unconsumed token ' + this.peek.text);
			      }

			      var expr = this.parseBindingBehavior();
			      expressions.push(expr);

			      while (this.optional(';')) {
			        isChain = true;
			      }

			      if (isChain) {
			        this.error('Multiple expressions are not allowed.');
			      }
			    }

			    return expressions.length === 1 ? expressions[0] : new Chain(expressions);
			  };

			  ParserImplementation.prototype.parseBindingBehavior = function parseBindingBehavior() {
			    var result = this.parseValueConverter();

			    while (this.optional('&')) {
			      var name = this.peek.text;
			      var args = [];

			      this.advance();

			      while (this.optional(':')) {
			        args.push(this.parseExpression());
			      }

			      result = new BindingBehavior(result, name, args);
			    }

			    return result;
			  };

			  ParserImplementation.prototype.parseValueConverter = function parseValueConverter() {
			    var result = this.parseExpression();

			    while (this.optional('|')) {
			      var name = this.peek.text;
			      var args = [];

			      this.advance();

			      while (this.optional(':')) {
			        args.push(this.parseExpression());
			      }

			      result = new ValueConverter(result, name, args, [result].concat(args));
			    }

			    return result;
			  };

			  ParserImplementation.prototype.parseExpression = function parseExpression() {
			    var start = this.peek.index;
			    var result = this.parseConditional();

			    while (this.peek.text === '=') {
			      if (!result.isAssignable) {
			        var end = this.index < this.tokens.length ? this.peek.index : this.input.length;
			        var expression = this.input.substring(start, end);

			        this.error('Expression ' + expression + ' is not assignable');
			      }

			      this.expect('=');
			      result = new Assign(result, this.parseConditional());
			    }

			    return result;
			  };

			  ParserImplementation.prototype.parseConditional = function parseConditional() {
			    var start = this.peek.index;
			    var result = this.parseLogicalOr();

			    if (this.optional('?')) {
			      var yes = this.parseExpression();

			      if (!this.optional(':')) {
			        var end = this.index < this.tokens.length ? this.peek.index : this.input.length;
			        var expression = this.input.substring(start, end);

			        this.error('Conditional expression ' + expression + ' requires all 3 expressions');
			      }

			      var no = this.parseExpression();
			      result = new Conditional(result, yes, no);
			    }

			    return result;
			  };

			  ParserImplementation.prototype.parseLogicalOr = function parseLogicalOr() {
			    var result = this.parseLogicalAnd();

			    while (this.optional('||')) {
			      result = new Binary('||', result, this.parseLogicalAnd());
			    }

			    return result;
			  };

			  ParserImplementation.prototype.parseLogicalAnd = function parseLogicalAnd() {
			    var result = this.parseEquality();

			    while (this.optional('&&')) {
			      result = new Binary('&&', result, this.parseEquality());
			    }

			    return result;
			  };

			  ParserImplementation.prototype.parseEquality = function parseEquality() {
			    var result = this.parseRelational();

			    while (true) {
			      if (this.optional('==')) {
			        result = new Binary('==', result, this.parseRelational());
			      } else if (this.optional('!=')) {
			        result = new Binary('!=', result, this.parseRelational());
			      } else if (this.optional('===')) {
			        result = new Binary('===', result, this.parseRelational());
			      } else if (this.optional('!==')) {
			        result = new Binary('!==', result, this.parseRelational());
			      } else {
			        return result;
			      }
			    }
			  };

			  ParserImplementation.prototype.parseRelational = function parseRelational() {
			    var result = this.parseAdditive();

			    while (true) {
			      if (this.optional('<')) {
			        result = new Binary('<', result, this.parseAdditive());
			      } else if (this.optional('>')) {
			        result = new Binary('>', result, this.parseAdditive());
			      } else if (this.optional('<=')) {
			        result = new Binary('<=', result, this.parseAdditive());
			      } else if (this.optional('>=')) {
			        result = new Binary('>=', result, this.parseAdditive());
			      } else {
			        return result;
			      }
			    }
			  };

			  ParserImplementation.prototype.parseAdditive = function parseAdditive() {
			    var result = this.parseMultiplicative();

			    while (true) {
			      if (this.optional('+')) {
			        result = new Binary('+', result, this.parseMultiplicative());
			      } else if (this.optional('-')) {
			        result = new Binary('-', result, this.parseMultiplicative());
			      } else {
			        return result;
			      }
			    }
			  };

			  ParserImplementation.prototype.parseMultiplicative = function parseMultiplicative() {
			    var result = this.parsePrefix();

			    while (true) {
			      if (this.optional('*')) {
			        result = new Binary('*', result, this.parsePrefix());
			      } else if (this.optional('%')) {
			        result = new Binary('%', result, this.parsePrefix());
			      } else if (this.optional('/')) {
			        result = new Binary('/', result, this.parsePrefix());
			      } else {
			        return result;
			      }
			    }
			  };

			  ParserImplementation.prototype.parsePrefix = function parsePrefix() {
			    if (this.optional('+')) {
			      return this.parsePrefix();
			    } else if (this.optional('-')) {
			      return new Binary('-', new LiteralPrimitive(0), this.parsePrefix());
			    } else if (this.optional('!')) {
			      return new PrefixNot('!', this.parsePrefix());
			    }

			    return this.parseAccessOrCallMember();
			  };

			  ParserImplementation.prototype.parseAccessOrCallMember = function parseAccessOrCallMember() {
			    var result = this.parsePrimary();

			    while (true) {
			      if (this.optional('.')) {
			        var name = this.peek.text;

			        this.advance();

			        if (this.optional('(')) {
			          var args = this.parseExpressionList(')');
			          this.expect(')');
			          if (result instanceof AccessThis) {
			            result = new CallScope(name, args, result.ancestor);
			          } else {
			            result = new CallMember(result, name, args);
			          }
			        } else {
			          if (result instanceof AccessThis) {
			            result = new AccessScope(name, result.ancestor);
			          } else {
			            result = new AccessMember(result, name);
			          }
			        }
			      } else if (this.optional('[')) {
			        var key = this.parseExpression();
			        this.expect(']');
			        result = new AccessKeyed(result, key);
			      } else if (this.optional('(')) {
			        var _args = this.parseExpressionList(')');
			        this.expect(')');
			        result = new CallFunction(result, _args);
			      } else {
			        return result;
			      }
			    }
			  };

			  ParserImplementation.prototype.parsePrimary = function parsePrimary() {
			    if (this.optional('(')) {
			      var result = this.parseExpression();
			      this.expect(')');
			      return result;
			    } else if (this.optional('null')) {
			      return new LiteralPrimitive(null);
			    } else if (this.optional('undefined')) {
			      return new LiteralPrimitive(undefined);
			    } else if (this.optional('true')) {
			      return new LiteralPrimitive(true);
			    } else if (this.optional('false')) {
			      return new LiteralPrimitive(false);
			    } else if (this.optional('[')) {
			      var _elements = this.parseExpressionList(']');
			      this.expect(']');
			      return new LiteralArray(_elements);
			    } else if (this.peek.text === '{') {
			      return this.parseObject();
			    } else if (this.peek.key !== null && this.peek.key !== undefined) {
			      return this.parseAccessOrCallScope();
			    } else if (this.peek.value !== null && this.peek.value !== undefined) {
			      var value = this.peek.value;
			      this.advance();
			      return value instanceof String || typeof value === 'string' ? new LiteralString(value) : new LiteralPrimitive(value);
			    } else if (this.index >= this.tokens.length) {
			      throw new Error('Unexpected end of expression: ' + this.input);
			    } else {
			      this.error('Unexpected token ' + this.peek.text);
			    }
			  };

			  ParserImplementation.prototype.parseAccessOrCallScope = function parseAccessOrCallScope() {
			    var name = this.peek.key;

			    this.advance();

			    if (name === '$this') {
			      return new AccessThis(0);
			    }

			    var ancestor = 0;
			    while (name === '$parent') {
			      ancestor++;
			      if (this.optional('.')) {
			        name = this.peek.key;
			        this.advance();
			      } else if (this.peek === EOF || this.peek.text === '(' || this.peek.text === ')' || this.peek.text === '[' || this.peek.text === '}' || this.peek.text === ',' || this.peek.text === '|' || this.peek.text === '&') {
			        return new AccessThis(ancestor);
			      } else {
			        this.error('Unexpected token ' + this.peek.text);
			      }
			    }

			    if (this.optional('(')) {
			      var args = this.parseExpressionList(')');
			      this.expect(')');
			      return new CallScope(name, args, ancestor);
			    }

			    return new AccessScope(name, ancestor);
			  };

			  ParserImplementation.prototype.parseObject = function parseObject() {
			    var keys = [];
			    var values = [];

			    this.expect('{');

			    if (this.peek.text !== '}') {
			      do {
			        var peek = this.peek;
			        var value = peek.value;
			        keys.push(typeof value === 'string' ? value : peek.text);

			        this.advance();
			        if (peek.key && (this.peek.text === ',' || this.peek.text === '}')) {
			          --this.index;
			          values.push(this.parseAccessOrCallScope());
			        } else {
			          this.expect(':');
			          values.push(this.parseExpression());
			        }
			      } while (this.optional(','));
			    }

			    this.expect('}');

			    return new LiteralObject(keys, values);
			  };

			  ParserImplementation.prototype.parseExpressionList = function parseExpressionList(terminator) {
			    var result = [];

			    if (this.peek.text !== terminator) {
			      do {
			        result.push(this.parseExpression());
			      } while (this.optional(','));
			    }

			    return result;
			  };

			  ParserImplementation.prototype.optional = function optional(text) {
			    if (this.peek.text === text) {
			      this.advance();
			      return true;
			    }

			    return false;
			  };

			  ParserImplementation.prototype.expect = function expect(text) {
			    if (this.peek.text === text) {
			      this.advance();
			    } else {
			      this.error('Missing expected ' + text);
			    }
			  };

			  ParserImplementation.prototype.advance = function advance() {
			    this.index++;
			  };

			  ParserImplementation.prototype.error = function error(message) {
			    var location = this.index < this.tokens.length ? 'at column ' + (this.tokens[this.index].index + 1) + ' in' : 'at the end of the expression';

			    throw new Error('Parser Error: ' + message + ' ' + location + ' [' + this.input + ']');
			  };

			  _createClass(ParserImplementation, [{
			    key: 'peek',
			    get: function get() {
			      return this.index < this.tokens.length ? this.tokens[this.index] : EOF;
			    }
			  }]);

			  return ParserImplementation;
			}();

			var mapProto = Map.prototype;

			function _getMapObserver(taskQueue, map) {
			  return ModifyMapObserver.for(taskQueue, map);
			}

			exports.getMapObserver = _getMapObserver;

			var ModifyMapObserver = function (_ModifyCollectionObse2) {
			  _inherits(ModifyMapObserver, _ModifyCollectionObse2);

			  function ModifyMapObserver(taskQueue, map) {
			    

			    return _possibleConstructorReturn(this, _ModifyCollectionObse2.call(this, taskQueue, map));
			  }

			  ModifyMapObserver.for = function _for(taskQueue, map) {
			    if (!('__map_observer__' in map)) {
			      Reflect.defineProperty(map, '__map_observer__', {
			        value: ModifyMapObserver.create(taskQueue, map),
			        enumerable: false, configurable: false
			      });
			    }
			    return map.__map_observer__;
			  };

			  ModifyMapObserver.create = function create(taskQueue, map) {
			    var observer = new ModifyMapObserver(taskQueue, map);

			    var proto = mapProto;
			    if (proto.set !== map.set || proto.delete !== map.delete || proto.clear !== map.clear) {
			      proto = {
			        set: map.set,
			        delete: map.delete,
			        clear: map.clear
			      };
			    }

			    map.set = function () {
			      var hasValue = map.has(arguments[0]);
			      var type = hasValue ? 'update' : 'add';
			      var oldValue = map.get(arguments[0]);
			      var methodCallResult = proto.set.apply(map, arguments);
			      if (!hasValue || oldValue !== map.get(arguments[0])) {
			        observer.addChangeRecord({
			          type: type,
			          object: map,
			          key: arguments[0],
			          oldValue: oldValue
			        });
			      }
			      return methodCallResult;
			    };

			    map.delete = function () {
			      var hasValue = map.has(arguments[0]);
			      var oldValue = map.get(arguments[0]);
			      var methodCallResult = proto.delete.apply(map, arguments);
			      if (hasValue) {
			        observer.addChangeRecord({
			          type: 'delete',
			          object: map,
			          key: arguments[0],
			          oldValue: oldValue
			        });
			      }
			      return methodCallResult;
			    };

			    map.clear = function () {
			      var methodCallResult = proto.clear.apply(map, arguments);
			      observer.addChangeRecord({
			        type: 'clear',
			        object: map
			      });
			      return methodCallResult;
			    };

			    return observer;
			  };

			  return ModifyMapObserver;
			}(ModifyCollectionObserver);

			function findOriginalEventTarget(event) {
			  return event.path && event.path[0] || event.deepPath && event.deepPath[0] || event.target;
			}

			function stopPropagation() {
			  this.standardStopPropagation();
			  this.propagationStopped = true;
			}

			function handleCapturedEvent(event) {
			  event.propagationStopped = false;
			  var target = findOriginalEventTarget(event);

			  var orderedCallbacks = [];

			  while (target) {
			    if (target.capturedCallbacks) {
			      var callback = target.capturedCallbacks[event.type];
			      if (callback) {
			        if (event.stopPropagation !== stopPropagation) {
			          event.standardStopPropagation = event.stopPropagation;
			          event.stopPropagation = stopPropagation;
			        }
			        orderedCallbacks.push(callback);
			      }
			    }
			    target = target.parentNode;
			  }
			  for (var _i22 = orderedCallbacks.length - 1; _i22 >= 0 && !event.propagationStopped; _i22--) {
			    var orderedCallback = orderedCallbacks[_i22];
			    if ('handleEvent' in orderedCallback) {
			      orderedCallback.handleEvent(event);
			    } else {
			      orderedCallback(event);
			    }
			  }
			}

			var CapturedHandlerEntry = function () {
			  function CapturedHandlerEntry(eventName) {
			    

			    this.eventName = eventName;
			    this.count = 0;
			  }

			  CapturedHandlerEntry.prototype.increment = function increment() {
			    this.count++;

			    if (this.count === 1) {
			      aureliaPal.DOM.addEventListener(this.eventName, handleCapturedEvent, true);
			    }
			  };

			  CapturedHandlerEntry.prototype.decrement = function decrement() {
			    this.count--;

			    if (this.count === 0) {
			      aureliaPal.DOM.removeEventListener(this.eventName, handleCapturedEvent, true);
			    }
			  };

			  return CapturedHandlerEntry;
			}();

			function handleDelegatedEvent(event) {
			  event.propagationStopped = false;
			  var target = findOriginalEventTarget(event);

			  while (target && !event.propagationStopped) {
			    if (target.delegatedCallbacks) {
			      var callback = target.delegatedCallbacks[event.type];
			      if (callback) {
			        if (event.stopPropagation !== stopPropagation) {
			          event.standardStopPropagation = event.stopPropagation;
			          event.stopPropagation = stopPropagation;
			        }
			        if ('handleEvent' in callback) {
			          callback.handleEvent(event);
			        } else {
			          callback(event);
			        }
			      }
			    }

			    target = target.parentNode;
			  }
			}

			var DelegateHandlerEntry = function () {
			  function DelegateHandlerEntry(eventName) {
			    

			    this.eventName = eventName;
			    this.count = 0;
			  }

			  DelegateHandlerEntry.prototype.increment = function increment() {
			    this.count++;

			    if (this.count === 1) {
			      aureliaPal.DOM.addEventListener(this.eventName, handleDelegatedEvent, false);
			    }
			  };

			  DelegateHandlerEntry.prototype.decrement = function decrement() {
			    this.count--;

			    if (this.count === 0) {
			      aureliaPal.DOM.removeEventListener(this.eventName, handleDelegatedEvent, false);
			    }
			  };

			  return DelegateHandlerEntry;
			}();

			var DelegationEntryHandler = function () {
			  function DelegationEntryHandler(entry, lookup, targetEvent) {
			    

			    this.entry = entry;
			    this.lookup = lookup;
			    this.targetEvent = targetEvent;
			  }

			  DelegationEntryHandler.prototype.dispose = function dispose() {
			    this.entry.decrement();
			    this.lookup[this.targetEvent] = null;
			    this.entry = this.lookup = this.targetEvent = null;
			  };

			  return DelegationEntryHandler;
			}();

			var EventHandler = function () {
			  function EventHandler(target, targetEvent, callback) {
			    

			    this.target = target;
			    this.targetEvent = targetEvent;
			    this.callback = callback;
			  }

			  EventHandler.prototype.dispose = function dispose() {
			    this.target.removeEventListener(this.targetEvent, this.callback);
			    this.target = this.targetEvent = this.callback = null;
			  };

			  return EventHandler;
			}();

			var DefaultEventStrategy = function () {
			  function DefaultEventStrategy() {
			    

			    this.delegatedHandlers = {};
			    this.capturedHandlers = {};
			  }

			  DefaultEventStrategy.prototype.subscribe = function subscribe(target, targetEvent, callback, strategy, disposable) {
			    var delegatedHandlers = void 0;
			    var capturedHandlers = void 0;
			    var handlerEntry = void 0;

			    if (strategy === delegationStrategy.bubbling) {
			      delegatedHandlers = this.delegatedHandlers;
			      handlerEntry = delegatedHandlers[targetEvent] || (delegatedHandlers[targetEvent] = new DelegateHandlerEntry(targetEvent));
			      var delegatedCallbacks = target.delegatedCallbacks || (target.delegatedCallbacks = {});

			      handlerEntry.increment();
			      delegatedCallbacks[targetEvent] = callback;

			      if (disposable === true) {
			        return new DelegationEntryHandler(handlerEntry, delegatedCallbacks, targetEvent);
			      }

			      return function () {
			        handlerEntry.decrement();
			        delegatedCallbacks[targetEvent] = null;
			      };
			    }
			    if (strategy === delegationStrategy.capturing) {
			      capturedHandlers = this.capturedHandlers;
			      handlerEntry = capturedHandlers[targetEvent] || (capturedHandlers[targetEvent] = new CapturedHandlerEntry(targetEvent));
			      var capturedCallbacks = target.capturedCallbacks || (target.capturedCallbacks = {});

			      handlerEntry.increment();
			      capturedCallbacks[targetEvent] = callback;

			      if (disposable === true) {
			        return new DelegationEntryHandler(handlerEntry, capturedCallbacks, targetEvent);
			      }

			      return function () {
			        handlerEntry.decrement();
			        capturedCallbacks[targetEvent] = null;
			      };
			    }

			    target.addEventListener(targetEvent, callback);

			    if (disposable === true) {
			      return new EventHandler(target, targetEvent, callback);
			    }

			    return function () {
			      target.removeEventListener(targetEvent, callback);
			    };
			  };

			  return DefaultEventStrategy;
			}();

			var delegationStrategy = exports.delegationStrategy = {
			  none: 0,
			  capturing: 1,
			  bubbling: 2
			};

			var EventManager = exports.EventManager = function () {
			  function EventManager() {
			    

			    this.elementHandlerLookup = {};
			    this.eventStrategyLookup = {};

			    this.registerElementConfig({
			      tagName: 'input',
			      properties: {
			        value: ['change', 'input'],
			        checked: ['change', 'input'],
			        files: ['change', 'input']
			      }
			    });

			    this.registerElementConfig({
			      tagName: 'textarea',
			      properties: {
			        value: ['change', 'input']
			      }
			    });

			    this.registerElementConfig({
			      tagName: 'select',
			      properties: {
			        value: ['change']
			      }
			    });

			    this.registerElementConfig({
			      tagName: 'content editable',
			      properties: {
			        value: ['change', 'input', 'blur', 'keyup', 'paste']
			      }
			    });

			    this.registerElementConfig({
			      tagName: 'scrollable element',
			      properties: {
			        scrollTop: ['scroll'],
			        scrollLeft: ['scroll']
			      }
			    });

			    this.defaultEventStrategy = new DefaultEventStrategy();
			  }

			  EventManager.prototype.registerElementConfig = function registerElementConfig(config) {
			    var tagName = config.tagName.toLowerCase();
			    var properties = config.properties;
			    var propertyName = void 0;

			    var lookup = this.elementHandlerLookup[tagName] = {};

			    for (propertyName in properties) {
			      if (properties.hasOwnProperty(propertyName)) {
			        lookup[propertyName] = properties[propertyName];
			      }
			    }
			  };

			  EventManager.prototype.registerEventStrategy = function registerEventStrategy(eventName, strategy) {
			    this.eventStrategyLookup[eventName] = strategy;
			  };

			  EventManager.prototype.getElementHandler = function getElementHandler(target, propertyName) {
			    var tagName = void 0;
			    var lookup = this.elementHandlerLookup;

			    if (target.tagName) {
			      tagName = target.tagName.toLowerCase();

			      if (lookup[tagName] && lookup[tagName][propertyName]) {
			        return new EventSubscriber(lookup[tagName][propertyName]);
			      }

			      if (propertyName === 'textContent' || propertyName === 'innerHTML') {
			        return new EventSubscriber(lookup['content editable'].value);
			      }

			      if (propertyName === 'scrollTop' || propertyName === 'scrollLeft') {
			        return new EventSubscriber(lookup['scrollable element'][propertyName]);
			      }
			    }

			    return null;
			  };

			  EventManager.prototype.addEventListener = function addEventListener(target, targetEvent, callbackOrListener, delegate, disposable) {
			    return (this.eventStrategyLookup[targetEvent] || this.defaultEventStrategy).subscribe(target, targetEvent, callbackOrListener, delegate, disposable);
			  };

			  return EventManager;
			}();

			var EventSubscriber = exports.EventSubscriber = function () {
			  function EventSubscriber(events) {
			    

			    this.events = events;
			    this.element = null;
			    this.handler = null;
			  }

			  EventSubscriber.prototype.subscribe = function subscribe(element, callbackOrListener) {
			    this.element = element;
			    this.handler = callbackOrListener;

			    var events = this.events;
			    for (var _i23 = 0, ii = events.length; ii > _i23; ++_i23) {
			      element.addEventListener(events[_i23], callbackOrListener);
			    }
			  };

			  EventSubscriber.prototype.dispose = function dispose() {
			    if (this.element === null) {
			      return;
			    }
			    var element = this.element;
			    var callbackOrListener = this.handler;
			    var events = this.events;
			    for (var _i24 = 0, ii = events.length; ii > _i24; ++_i24) {
			      element.removeEventListener(events[_i24], callbackOrListener);
			    }
			    this.element = this.handler = null;
			  };

			  return EventSubscriber;
			}();

			var DirtyChecker = exports.DirtyChecker = function () {
			  function DirtyChecker() {
			    

			    this.tracked = [];
			    this.checkDelay = 120;
			  }

			  DirtyChecker.prototype.addProperty = function addProperty(property) {
			    var tracked = this.tracked;

			    tracked.push(property);

			    if (tracked.length === 1) {
			      this.scheduleDirtyCheck();
			    }
			  };

			  DirtyChecker.prototype.removeProperty = function removeProperty(property) {
			    var tracked = this.tracked;
			    tracked.splice(tracked.indexOf(property), 1);
			  };

			  DirtyChecker.prototype.scheduleDirtyCheck = function scheduleDirtyCheck() {
			    var _this22 = this;

			    setTimeout(function () {
			      return _this22.check();
			    }, this.checkDelay);
			  };

			  DirtyChecker.prototype.check = function check() {
			    var tracked = this.tracked;
			    var i = tracked.length;

			    while (i--) {
			      var current = tracked[i];

			      if (current.isDirty()) {
			        current.call();
			      }
			    }

			    if (tracked.length) {
			      this.scheduleDirtyCheck();
			    }
			  };

			  return DirtyChecker;
			}();

			var DirtyCheckProperty = exports.DirtyCheckProperty = (_dec5 = subscriberCollection(), _dec5(_class5 = function () {
			  function DirtyCheckProperty(dirtyChecker, obj, propertyName) {
			    

			    this.dirtyChecker = dirtyChecker;
			    this.obj = obj;
			    this.propertyName = propertyName;
			  }

			  DirtyCheckProperty.prototype.getValue = function getValue() {
			    return this.obj[this.propertyName];
			  };

			  DirtyCheckProperty.prototype.setValue = function setValue(newValue) {
			    this.obj[this.propertyName] = newValue;
			  };

			  DirtyCheckProperty.prototype.call = function call() {
			    var oldValue = this.oldValue;
			    var newValue = this.getValue();

			    this.callSubscribers(newValue, oldValue);

			    this.oldValue = newValue;
			  };

			  DirtyCheckProperty.prototype.isDirty = function isDirty() {
			    return this.oldValue !== this.obj[this.propertyName];
			  };

			  DirtyCheckProperty.prototype.subscribe = function subscribe(context, callable) {
			    if (!this.hasSubscribers()) {
			      this.oldValue = this.getValue();
			      this.dirtyChecker.addProperty(this);
			    }
			    this.addSubscriber(context, callable);
			  };

			  DirtyCheckProperty.prototype.unsubscribe = function unsubscribe(context, callable) {
			    if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
			      this.dirtyChecker.removeProperty(this);
			    }
			  };

			  return DirtyCheckProperty;
			}()) || _class5);


			var logger = LogManager.getLogger('property-observation');

			var propertyAccessor = exports.propertyAccessor = {
			  getValue: function getValue(obj, propertyName) {
			    return obj[propertyName];
			  },
			  setValue: function setValue(value, obj, propertyName) {
			    obj[propertyName] = value;
			  }
			};

			var PrimitiveObserver = exports.PrimitiveObserver = function () {
			  function PrimitiveObserver(primitive, propertyName) {
			    

			    this.doNotCache = true;

			    this.primitive = primitive;
			    this.propertyName = propertyName;
			  }

			  PrimitiveObserver.prototype.getValue = function getValue() {
			    return this.primitive[this.propertyName];
			  };

			  PrimitiveObserver.prototype.setValue = function setValue() {
			    var type = _typeof(this.primitive);
			    throw new Error('The ' + this.propertyName + ' property of a ' + type + ' (' + this.primitive + ') cannot be assigned.');
			  };

			  PrimitiveObserver.prototype.subscribe = function subscribe() {};

			  PrimitiveObserver.prototype.unsubscribe = function unsubscribe() {};

			  return PrimitiveObserver;
			}();

			var SetterObserver = exports.SetterObserver = (_dec6 = subscriberCollection(), _dec6(_class7 = function () {
			  function SetterObserver(taskQueue, obj, propertyName) {
			    

			    this.taskQueue = taskQueue;
			    this.obj = obj;
			    this.propertyName = propertyName;
			    this.queued = false;
			    this.observing = false;
			  }

			  SetterObserver.prototype.getValue = function getValue() {
			    return this.obj[this.propertyName];
			  };

			  SetterObserver.prototype.setValue = function setValue(newValue) {
			    this.obj[this.propertyName] = newValue;
			  };

			  SetterObserver.prototype.getterValue = function getterValue() {
			    return this.currentValue;
			  };

			  SetterObserver.prototype.setterValue = function setterValue(newValue) {
			    var oldValue = this.currentValue;

			    if (oldValue !== newValue) {
			      if (!this.queued) {
			        this.oldValue = oldValue;
			        this.queued = true;
			        this.taskQueue.queueMicroTask(this);
			      }

			      this.currentValue = newValue;
			    }
			  };

			  SetterObserver.prototype.call = function call() {
			    var oldValue = this.oldValue;
			    var newValue = this.currentValue;

			    this.queued = false;

			    this.callSubscribers(newValue, oldValue);
			  };

			  SetterObserver.prototype.subscribe = function subscribe(context, callable) {
			    if (!this.observing) {
			      this.convertProperty();
			    }
			    this.addSubscriber(context, callable);
			  };

			  SetterObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
			    this.removeSubscriber(context, callable);
			  };

			  SetterObserver.prototype.convertProperty = function convertProperty() {
			    this.observing = true;
			    this.currentValue = this.obj[this.propertyName];
			    this.setValue = this.setterValue;
			    this.getValue = this.getterValue;

			    if (!Reflect.defineProperty(this.obj, this.propertyName, {
			      configurable: true,
			      enumerable: this.propertyName in this.obj ? this.obj.propertyIsEnumerable(this.propertyName) : true,
			      get: this.getValue.bind(this),
			      set: this.setValue.bind(this)
			    })) {
			      logger.warn('Cannot observe property \'' + this.propertyName + '\' of object', this.obj);
			    }
			  };

			  return SetterObserver;
			}()) || _class7);

			var XLinkAttributeObserver = exports.XLinkAttributeObserver = function () {
			  function XLinkAttributeObserver(element, propertyName, attributeName) {
			    

			    this.element = element;
			    this.propertyName = propertyName;
			    this.attributeName = attributeName;
			  }

			  XLinkAttributeObserver.prototype.getValue = function getValue() {
			    return this.element.getAttributeNS('http://www.w3.org/1999/xlink', this.attributeName);
			  };

			  XLinkAttributeObserver.prototype.setValue = function setValue(newValue) {
			    return this.element.setAttributeNS('http://www.w3.org/1999/xlink', this.attributeName, newValue);
			  };

			  XLinkAttributeObserver.prototype.subscribe = function subscribe() {
			    throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.');
			  };

			  return XLinkAttributeObserver;
			}();

			var dataAttributeAccessor = exports.dataAttributeAccessor = {
			  getValue: function getValue(obj, propertyName) {
			    return obj.getAttribute(propertyName);
			  },
			  setValue: function setValue(value, obj, propertyName) {
			    if (value === null || value === undefined) {
			      obj.removeAttribute(propertyName);
			    } else {
			      obj.setAttribute(propertyName, value);
			    }
			  }
			};

			var DataAttributeObserver = exports.DataAttributeObserver = function () {
			  function DataAttributeObserver(element, propertyName) {
			    

			    this.element = element;
			    this.propertyName = propertyName;
			  }

			  DataAttributeObserver.prototype.getValue = function getValue() {
			    return this.element.getAttribute(this.propertyName);
			  };

			  DataAttributeObserver.prototype.setValue = function setValue(newValue) {
			    if (newValue === null || newValue === undefined) {
			      return this.element.removeAttribute(this.propertyName);
			    }
			    return this.element.setAttribute(this.propertyName, newValue);
			  };

			  DataAttributeObserver.prototype.subscribe = function subscribe() {
			    throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.');
			  };

			  return DataAttributeObserver;
			}();

			var StyleObserver = exports.StyleObserver = function () {
			  function StyleObserver(element, propertyName) {
			    

			    this.element = element;
			    this.propertyName = propertyName;

			    this.styles = null;
			    this.version = 0;
			  }

			  StyleObserver.prototype.getValue = function getValue() {
			    return this.element.style.cssText;
			  };

			  StyleObserver.prototype._setProperty = function _setProperty(style, value) {
			    var priority = '';

			    if (value !== null && value !== undefined && typeof value.indexOf === 'function' && value.indexOf('!important') !== -1) {
			      priority = 'important';
			      value = value.replace('!important', '');
			    }
			    this.element.style.setProperty(style, value, priority);
			  };

			  StyleObserver.prototype.setValue = function setValue(newValue) {
			    var styles = this.styles || {};
			    var style = void 0;
			    var version = this.version;

			    if (newValue !== null && newValue !== undefined) {
			      if (newValue instanceof Object) {
			        var value = void 0;
			        for (style in newValue) {
			          if (newValue.hasOwnProperty(style)) {
			            value = newValue[style];
			            style = style.replace(/([A-Z])/g, function (m) {
			              return '-' + m.toLowerCase();
			            });
			            styles[style] = version;
			            this._setProperty(style, value);
			          }
			        }
			      } else if (newValue.length) {
			        var rx = /\s*([\w\-]+)\s*:\s*((?:(?:[\w\-]+\(\s*(?:"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[\w\-]+\(\s*(?:^"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^\)]*)\),?|[^\)]*)\),?|"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^;]*),?\s*)+);?/g;
			        var pair = void 0;
			        while ((pair = rx.exec(newValue)) !== null) {
			          style = pair[1];
			          if (!style) {
			            continue;
			          }

			          styles[style] = version;
			          this._setProperty(style, pair[2]);
			        }
			      }
			    }

			    this.styles = styles;
			    this.version += 1;

			    if (version === 0) {
			      return;
			    }

			    version -= 1;
			    for (style in styles) {
			      if (!styles.hasOwnProperty(style) || styles[style] !== version) {
			        continue;
			      }

			      this.element.style.removeProperty(style);
			    }
			  };

			  StyleObserver.prototype.subscribe = function subscribe() {
			    throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.');
			  };

			  return StyleObserver;
			}();

			var ValueAttributeObserver = exports.ValueAttributeObserver = (_dec7 = subscriberCollection(), _dec7(_class8 = function () {
			  function ValueAttributeObserver(element, propertyName, handler) {
			    

			    this.element = element;
			    this.propertyName = propertyName;
			    this.handler = handler;
			    if (propertyName === 'files') {
			      this.setValue = function () {};
			    }
			  }

			  ValueAttributeObserver.prototype.getValue = function getValue() {
			    return this.element[this.propertyName];
			  };

			  ValueAttributeObserver.prototype.setValue = function setValue(newValue) {
			    newValue = newValue === undefined || newValue === null ? '' : newValue;
			    if (this.element[this.propertyName] !== newValue) {
			      this.element[this.propertyName] = newValue;
			      this.notify();
			    }
			  };

			  ValueAttributeObserver.prototype.notify = function notify() {
			    var oldValue = this.oldValue;
			    var newValue = this.getValue();

			    this.callSubscribers(newValue, oldValue);

			    this.oldValue = newValue;
			  };

			  ValueAttributeObserver.prototype.handleEvent = function handleEvent() {
			    this.notify();
			  };

			  ValueAttributeObserver.prototype.subscribe = function subscribe(context, callable) {
			    if (!this.hasSubscribers()) {
			      this.oldValue = this.getValue();
			      this.handler.subscribe(this.element, this);
			    }

			    this.addSubscriber(context, callable);
			  };

			  ValueAttributeObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
			    if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
			      this.handler.dispose();
			    }
			  };

			  return ValueAttributeObserver;
			}()) || _class8);


			var checkedArrayContext = 'CheckedObserver:array';
			var checkedValueContext = 'CheckedObserver:value';

			var CheckedObserver = exports.CheckedObserver = (_dec8 = subscriberCollection(), _dec8(_class9 = function () {
			  function CheckedObserver(element, handler, observerLocator) {
			    

			    this.element = element;
			    this.handler = handler;
			    this.observerLocator = observerLocator;
			  }

			  CheckedObserver.prototype.getValue = function getValue() {
			    return this.value;
			  };

			  CheckedObserver.prototype.setValue = function setValue(newValue) {
			    if (this.initialSync && this.value === newValue) {
			      return;
			    }

			    if (this.arrayObserver) {
			      this.arrayObserver.unsubscribe(checkedArrayContext, this);
			      this.arrayObserver = null;
			    }

			    if (this.element.type === 'checkbox' && Array.isArray(newValue)) {
			      this.arrayObserver = this.observerLocator.getArrayObserver(newValue);
			      this.arrayObserver.subscribe(checkedArrayContext, this);
			    }

			    this.oldValue = this.value;
			    this.value = newValue;
			    this.synchronizeElement();
			    this.notify();

			    if (!this.initialSync) {
			      this.initialSync = true;
			      this.observerLocator.taskQueue.queueMicroTask(this);
			    }
			  };

			  CheckedObserver.prototype.call = function call(context, splices) {
			    this.synchronizeElement();

			    if (!this.valueObserver) {
			      this.valueObserver = this.element.__observers__.model || this.element.__observers__.value;
			      if (this.valueObserver) {
			        this.valueObserver.subscribe(checkedValueContext, this);
			      }
			    }
			  };

			  CheckedObserver.prototype.synchronizeElement = function synchronizeElement() {
			    var value = this.value;
			    var element = this.element;
			    var elementValue = element.hasOwnProperty('model') ? element.model : element.value;
			    var isRadio = element.type === 'radio';
			    var matcher = element.matcher || function (a, b) {
			      return a === b;
			    };

			    element.checked = isRadio && !!matcher(value, elementValue) || !isRadio && value === true || !isRadio && Array.isArray(value) && value.findIndex(function (item) {
			      return !!matcher(item, elementValue);
			    }) !== -1;
			  };

			  CheckedObserver.prototype.synchronizeValue = function synchronizeValue() {
			    var value = this.value;
			    var element = this.element;
			    var elementValue = element.hasOwnProperty('model') ? element.model : element.value;
			    var index = void 0;
			    var matcher = element.matcher || function (a, b) {
			      return a === b;
			    };

			    if (element.type === 'checkbox') {
			      if (Array.isArray(value)) {
			        index = value.findIndex(function (item) {
			          return !!matcher(item, elementValue);
			        });
			        if (element.checked && index === -1) {
			          value.push(elementValue);
			        } else if (!element.checked && index !== -1) {
			          value.splice(index, 1);
			        }

			        return;
			      }

			      value = element.checked;
			    } else if (element.checked) {
			      value = elementValue;
			    } else {
			      return;
			    }

			    this.oldValue = this.value;
			    this.value = value;
			    this.notify();
			  };

			  CheckedObserver.prototype.notify = function notify() {
			    var oldValue = this.oldValue;
			    var newValue = this.value;

			    if (newValue === oldValue) {
			      return;
			    }

			    this.callSubscribers(newValue, oldValue);
			  };

			  CheckedObserver.prototype.handleEvent = function handleEvent() {
			    this.synchronizeValue();
			  };

			  CheckedObserver.prototype.subscribe = function subscribe(context, callable) {
			    if (!this.hasSubscribers()) {
			      this.handler.subscribe(this.element, this);
			    }
			    this.addSubscriber(context, callable);
			  };

			  CheckedObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
			    if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
			      this.handler.dispose();
			    }
			  };

			  CheckedObserver.prototype.unbind = function unbind() {
			    if (this.arrayObserver) {
			      this.arrayObserver.unsubscribe(checkedArrayContext, this);
			      this.arrayObserver = null;
			    }
			    if (this.valueObserver) {
			      this.valueObserver.unsubscribe(checkedValueContext, this);
			    }
			  };

			  return CheckedObserver;
			}()) || _class9);


			var selectArrayContext = 'SelectValueObserver:array';

			var SelectValueObserver = exports.SelectValueObserver = (_dec9 = subscriberCollection(), _dec9(_class10 = function () {
			  function SelectValueObserver(element, handler, observerLocator) {
			    

			    this.element = element;
			    this.handler = handler;
			    this.observerLocator = observerLocator;
			  }

			  SelectValueObserver.prototype.getValue = function getValue() {
			    return this.value;
			  };

			  SelectValueObserver.prototype.setValue = function setValue(newValue) {
			    if (newValue !== null && newValue !== undefined && this.element.multiple && !Array.isArray(newValue)) {
			      throw new Error('Only null or Array instances can be bound to a multi-select.');
			    }
			    if (this.value === newValue) {
			      return;
			    }

			    if (this.arrayObserver) {
			      this.arrayObserver.unsubscribe(selectArrayContext, this);
			      this.arrayObserver = null;
			    }

			    if (Array.isArray(newValue)) {
			      this.arrayObserver = this.observerLocator.getArrayObserver(newValue);
			      this.arrayObserver.subscribe(selectArrayContext, this);
			    }

			    this.oldValue = this.value;
			    this.value = newValue;
			    this.synchronizeOptions();
			    this.notify();

			    if (!this.initialSync) {
			      this.initialSync = true;
			      this.observerLocator.taskQueue.queueMicroTask(this);
			    }
			  };

			  SelectValueObserver.prototype.call = function call(context, splices) {
			    this.synchronizeOptions();
			  };

			  SelectValueObserver.prototype.synchronizeOptions = function synchronizeOptions() {
			    var value = this.value;
			    var isArray = void 0;

			    if (Array.isArray(value)) {
			      isArray = true;
			    }

			    var options = this.element.options;
			    var i = options.length;
			    var matcher = this.element.matcher || function (a, b) {
			      return a === b;
			    };

			    var _loop = function _loop() {
			      var option = options.item(i);
			      var optionValue = option.hasOwnProperty('model') ? option.model : option.value;
			      if (isArray) {
			        option.selected = value.findIndex(function (item) {
			          return !!matcher(optionValue, item);
			        }) !== -1;
			        return 'continue';
			      }
			      option.selected = !!matcher(optionValue, value);
			    };

			    while (i--) {
			      var _ret = _loop();

			      if (_ret === 'continue') continue;
			    }
			  };

			  SelectValueObserver.prototype.synchronizeValue = function synchronizeValue() {
			    var _this23 = this;

			    var options = this.element.options;
			    var count = 0;
			    var value = [];

			    for (var _i25 = 0, ii = options.length; _i25 < ii; _i25++) {
			      var _option = options.item(_i25);
			      if (!_option.selected) {
			        continue;
			      }
			      value.push(_option.hasOwnProperty('model') ? _option.model : _option.value);
			      count++;
			    }

			    if (this.element.multiple) {
			      if (Array.isArray(this.value)) {
			        var _ret2 = function () {
			          var matcher = _this23.element.matcher || function (a, b) {
			            return a === b;
			          };

			          var i = 0;

			          var _loop2 = function _loop2() {
			            var a = _this23.value[i];
			            if (value.findIndex(function (b) {
			              return matcher(a, b);
			            }) === -1) {
			              _this23.value.splice(i, 1);
			            } else {
			              i++;
			            }
			          };

			          while (i < _this23.value.length) {
			            _loop2();
			          }

			          i = 0;

			          var _loop3 = function _loop3() {
			            var a = value[i];
			            if (_this23.value.findIndex(function (b) {
			              return matcher(a, b);
			            }) === -1) {
			              _this23.value.push(a);
			            }
			            i++;
			          };

			          while (i < value.length) {
			            _loop3();
			          }
			          return {
			            v: void 0
			          };
			        }();

			        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
			      }
			    } else {
			      if (count === 0) {
			        value = null;
			      } else {
			        value = value[0];
			      }
			    }

			    if (value !== this.value) {
			      this.oldValue = this.value;
			      this.value = value;
			      this.notify();
			    }
			  };

			  SelectValueObserver.prototype.notify = function notify() {
			    var oldValue = this.oldValue;
			    var newValue = this.value;

			    this.callSubscribers(newValue, oldValue);
			  };

			  SelectValueObserver.prototype.handleEvent = function handleEvent() {
			    this.synchronizeValue();
			  };

			  SelectValueObserver.prototype.subscribe = function subscribe(context, callable) {
			    if (!this.hasSubscribers()) {
			      this.handler.subscribe(this.element, this);
			    }
			    this.addSubscriber(context, callable);
			  };

			  SelectValueObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
			    if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
			      this.handler.dispose();
			    }
			  };

			  SelectValueObserver.prototype.bind = function bind() {
			    var _this24 = this;

			    this.domObserver = aureliaPal.DOM.createMutationObserver(function () {
			      _this24.synchronizeOptions();
			      _this24.synchronizeValue();
			    });
			    this.domObserver.observe(this.element, { childList: true, subtree: true });
			  };

			  SelectValueObserver.prototype.unbind = function unbind() {
			    this.domObserver.disconnect();
			    this.domObserver = null;

			    if (this.arrayObserver) {
			      this.arrayObserver.unsubscribe(selectArrayContext, this);
			      this.arrayObserver = null;
			    }
			  };

			  return SelectValueObserver;
			}()) || _class10);

			var ClassObserver = exports.ClassObserver = function () {
			  function ClassObserver(element) {
			    

			    this.element = element;
			    this.doNotCache = true;
			    this.value = '';
			    this.version = 0;
			  }

			  ClassObserver.prototype.getValue = function getValue() {
			    return this.value;
			  };

			  ClassObserver.prototype.setValue = function setValue(newValue) {
			    var nameIndex = this.nameIndex || {};
			    var version = this.version;
			    var names = void 0;
			    var name = void 0;

			    if (newValue !== null && newValue !== undefined && newValue.length) {
			      names = newValue.split(/\s+/);
			      for (var _i26 = 0, length = names.length; _i26 < length; _i26++) {
			        name = names[_i26];
			        if (name === '') {
			          continue;
			        }
			        nameIndex[name] = version;
			        this.element.classList.add(name);
			      }
			    }

			    this.value = newValue;
			    this.nameIndex = nameIndex;
			    this.version += 1;

			    if (version === 0) {
			      return;
			    }

			    version -= 1;
			    for (name in nameIndex) {
			      if (!nameIndex.hasOwnProperty(name) || nameIndex[name] !== version) {
			        continue;
			      }
			      this.element.classList.remove(name);
			    }
			  };

			  ClassObserver.prototype.subscribe = function subscribe() {
			    throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "class" property is not supported.');
			  };

			  return ClassObserver;
			}();

			function hasDeclaredDependencies(descriptor) {
			  return !!(descriptor && descriptor.get && descriptor.get.dependencies);
			}

			function declarePropertyDependencies(ctor, propertyName, dependencies) {
			  var descriptor = Object.getOwnPropertyDescriptor(ctor.prototype, propertyName);
			  descriptor.get.dependencies = dependencies;
			}

			function computedFrom() {
			  for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
			    rest[_key] = arguments[_key];
			  }

			  return function (target, key, descriptor) {
			    descriptor.get.dependencies = rest;
			    return descriptor;
			  };
			}

			var ComputedExpression = exports.ComputedExpression = function (_Expression19) {
			  _inherits(ComputedExpression, _Expression19);

			  function ComputedExpression(name, dependencies) {
			    

			    var _this25 = _possibleConstructorReturn(this, _Expression19.call(this));

			    _this25.name = name;
			    _this25.dependencies = dependencies;
			    _this25.isAssignable = true;
			    return _this25;
			  }

			  ComputedExpression.prototype.evaluate = function evaluate(scope, lookupFunctions) {
			    return scope.bindingContext[this.name];
			  };

			  ComputedExpression.prototype.assign = function assign(scope, value) {
			    scope.bindingContext[this.name] = value;
			  };

			  ComputedExpression.prototype.accept = function accept(visitor) {
			    throw new Error('not implemented');
			  };

			  ComputedExpression.prototype.connect = function connect(binding, scope) {
			    var dependencies = this.dependencies;
			    var i = dependencies.length;
			    while (i--) {
			      dependencies[i].connect(binding, scope);
			    }
			  };

			  return ComputedExpression;
			}(Expression);

			function createComputedObserver(obj, propertyName, descriptor, observerLocator) {
			  var dependencies = descriptor.get.dependencies;
			  if (!(dependencies instanceof ComputedExpression)) {
			    var _i27 = dependencies.length;
			    while (_i27--) {
			      dependencies[_i27] = observerLocator.parser.parse(dependencies[_i27]);
			    }
			    dependencies = descriptor.get.dependencies = new ComputedExpression(propertyName, dependencies);
			  }

			  var scope = { bindingContext: obj, overrideContext: createOverrideContext(obj) };
			  return new ExpressionObserver(scope, dependencies, observerLocator);
			}

			var svgElements = void 0;
			var svgPresentationElements = void 0;
			var svgPresentationAttributes = void 0;
			var svgAnalyzer = void 0;

			if (typeof FEATURE_NO_SVG === 'undefined') {
			  svgElements = {
			    a: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'target', 'transform', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
			    altGlyph: ['class', 'dx', 'dy', 'externalResourcesRequired', 'format', 'glyphRef', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    altGlyphDef: ['id', 'xml:base', 'xml:lang', 'xml:space'],
			    altGlyphItem: ['id', 'xml:base', 'xml:lang', 'xml:space'],
			    animate: ['accumulate', 'additive', 'attributeName', 'attributeType', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
			    animateColor: ['accumulate', 'additive', 'attributeName', 'attributeType', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
			    animateMotion: ['accumulate', 'additive', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keyPoints', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'origin', 'path', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'rotate', 'systemLanguage', 'to', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
			    animateTransform: ['accumulate', 'additive', 'attributeName', 'attributeType', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'type', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
			    circle: ['class', 'cx', 'cy', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'r', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
			    clipPath: ['class', 'clipPathUnits', 'externalResourcesRequired', 'id', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
			    'color-profile': ['id', 'local', 'name', 'rendering-intent', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
			    cursor: ['externalResourcesRequired', 'id', 'requiredExtensions', 'requiredFeatures', 'systemLanguage', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    defs: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
			    desc: ['class', 'id', 'style', 'xml:base', 'xml:lang', 'xml:space'],
			    ellipse: ['class', 'cx', 'cy', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rx', 'ry', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
			    feBlend: ['class', 'height', 'id', 'in', 'in2', 'mode', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    feColorMatrix: ['class', 'height', 'id', 'in', 'result', 'style', 'type', 'values', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    feComponentTransfer: ['class', 'height', 'id', 'in', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    feComposite: ['class', 'height', 'id', 'in', 'in2', 'k1', 'k2', 'k3', 'k4', 'operator', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    feConvolveMatrix: ['bias', 'class', 'divisor', 'edgeMode', 'height', 'id', 'in', 'kernelMatrix', 'kernelUnitLength', 'order', 'preserveAlpha', 'result', 'style', 'targetX', 'targetY', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    feDiffuseLighting: ['class', 'diffuseConstant', 'height', 'id', 'in', 'kernelUnitLength', 'result', 'style', 'surfaceScale', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    feDisplacementMap: ['class', 'height', 'id', 'in', 'in2', 'result', 'scale', 'style', 'width', 'x', 'xChannelSelector', 'xml:base', 'xml:lang', 'xml:space', 'y', 'yChannelSelector'],
			    feDistantLight: ['azimuth', 'elevation', 'id', 'xml:base', 'xml:lang', 'xml:space'],
			    feFlood: ['class', 'height', 'id', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    feFuncA: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
			    feFuncB: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
			    feFuncG: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
			    feFuncR: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
			    feGaussianBlur: ['class', 'height', 'id', 'in', 'result', 'stdDeviation', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    feImage: ['class', 'externalResourcesRequired', 'height', 'id', 'preserveAspectRatio', 'result', 'style', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    feMerge: ['class', 'height', 'id', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    feMergeNode: ['id', 'xml:base', 'xml:lang', 'xml:space'],
			    feMorphology: ['class', 'height', 'id', 'in', 'operator', 'radius', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    feOffset: ['class', 'dx', 'dy', 'height', 'id', 'in', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    fePointLight: ['id', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y', 'z'],
			    feSpecularLighting: ['class', 'height', 'id', 'in', 'kernelUnitLength', 'result', 'specularConstant', 'specularExponent', 'style', 'surfaceScale', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    feSpotLight: ['id', 'limitingConeAngle', 'pointsAtX', 'pointsAtY', 'pointsAtZ', 'specularExponent', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y', 'z'],
			    feTile: ['class', 'height', 'id', 'in', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    feTurbulence: ['baseFrequency', 'class', 'height', 'id', 'numOctaves', 'result', 'seed', 'stitchTiles', 'style', 'type', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    filter: ['class', 'externalResourcesRequired', 'filterRes', 'filterUnits', 'height', 'id', 'primitiveUnits', 'style', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    font: ['class', 'externalResourcesRequired', 'horiz-adv-x', 'horiz-origin-x', 'horiz-origin-y', 'id', 'style', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'xml:base', 'xml:lang', 'xml:space'],
			    'font-face': ['accent-height', 'alphabetic', 'ascent', 'bbox', 'cap-height', 'descent', 'font-family', 'font-size', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'hanging', 'id', 'ideographic', 'mathematical', 'overline-position', 'overline-thickness', 'panose-1', 'slope', 'stemh', 'stemv', 'strikethrough-position', 'strikethrough-thickness', 'underline-position', 'underline-thickness', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'widths', 'x-height', 'xml:base', 'xml:lang', 'xml:space'],
			    'font-face-format': ['id', 'string', 'xml:base', 'xml:lang', 'xml:space'],
			    'font-face-name': ['id', 'name', 'xml:base', 'xml:lang', 'xml:space'],
			    'font-face-src': ['id', 'xml:base', 'xml:lang', 'xml:space'],
			    'font-face-uri': ['id', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
			    foreignObject: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    g: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
			    glyph: ['arabic-form', 'class', 'd', 'glyph-name', 'horiz-adv-x', 'id', 'lang', 'orientation', 'style', 'unicode', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'xml:base', 'xml:lang', 'xml:space'],
			    glyphRef: ['class', 'dx', 'dy', 'format', 'glyphRef', 'id', 'style', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    hkern: ['g1', 'g2', 'id', 'k', 'u1', 'u2', 'xml:base', 'xml:lang', 'xml:space'],
			    image: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'preserveAspectRatio', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    line: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'x1', 'x2', 'xml:base', 'xml:lang', 'xml:space', 'y1', 'y2'],
			    linearGradient: ['class', 'externalResourcesRequired', 'gradientTransform', 'gradientUnits', 'id', 'spreadMethod', 'style', 'x1', 'x2', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y1', 'y2'],
			    marker: ['class', 'externalResourcesRequired', 'id', 'markerHeight', 'markerUnits', 'markerWidth', 'orient', 'preserveAspectRatio', 'refX', 'refY', 'style', 'viewBox', 'xml:base', 'xml:lang', 'xml:space'],
			    mask: ['class', 'externalResourcesRequired', 'height', 'id', 'maskContentUnits', 'maskUnits', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    metadata: ['id', 'xml:base', 'xml:lang', 'xml:space'],
			    'missing-glyph': ['class', 'd', 'horiz-adv-x', 'id', 'style', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'xml:base', 'xml:lang', 'xml:space'],
			    mpath: ['externalResourcesRequired', 'id', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
			    path: ['class', 'd', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'pathLength', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
			    pattern: ['class', 'externalResourcesRequired', 'height', 'id', 'patternContentUnits', 'patternTransform', 'patternUnits', 'preserveAspectRatio', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'viewBox', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    polygon: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'points', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
			    polyline: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'points', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
			    radialGradient: ['class', 'cx', 'cy', 'externalResourcesRequired', 'fx', 'fy', 'gradientTransform', 'gradientUnits', 'id', 'r', 'spreadMethod', 'style', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
			    rect: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rx', 'ry', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    script: ['externalResourcesRequired', 'id', 'type', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
			    set: ['attributeName', 'attributeType', 'begin', 'dur', 'end', 'externalResourcesRequired', 'fill', 'id', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
			    stop: ['class', 'id', 'offset', 'style', 'xml:base', 'xml:lang', 'xml:space'],
			    style: ['id', 'media', 'title', 'type', 'xml:base', 'xml:lang', 'xml:space'],
			    svg: ['baseProfile', 'class', 'contentScriptType', 'contentStyleType', 'externalResourcesRequired', 'height', 'id', 'onabort', 'onactivate', 'onclick', 'onerror', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onresize', 'onscroll', 'onunload', 'onzoom', 'preserveAspectRatio', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'version', 'viewBox', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y', 'zoomAndPan'],
			    switch: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
			    symbol: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'preserveAspectRatio', 'style', 'viewBox', 'xml:base', 'xml:lang', 'xml:space'],
			    text: ['class', 'dx', 'dy', 'externalResourcesRequired', 'id', 'lengthAdjust', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'textLength', 'transform', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    textPath: ['class', 'externalResourcesRequired', 'id', 'lengthAdjust', 'method', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'spacing', 'startOffset', 'style', 'systemLanguage', 'textLength', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
			    title: ['class', 'id', 'style', 'xml:base', 'xml:lang', 'xml:space'],
			    tref: ['class', 'dx', 'dy', 'externalResourcesRequired', 'id', 'lengthAdjust', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'textLength', 'x', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    tspan: ['class', 'dx', 'dy', 'externalResourcesRequired', 'id', 'lengthAdjust', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'textLength', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    use: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
			    view: ['externalResourcesRequired', 'id', 'preserveAspectRatio', 'viewBox', 'viewTarget', 'xml:base', 'xml:lang', 'xml:space', 'zoomAndPan'],
			    vkern: ['g1', 'g2', 'id', 'k', 'u1', 'u2', 'xml:base', 'xml:lang', 'xml:space']
			  };


			  svgPresentationElements = {
			    'a': true,
			    'altGlyph': true,
			    'animate': true,
			    'animateColor': true,
			    'circle': true,
			    'clipPath': true,
			    'defs': true,
			    'ellipse': true,
			    'feBlend': true,
			    'feColorMatrix': true,
			    'feComponentTransfer': true,
			    'feComposite': true,
			    'feConvolveMatrix': true,
			    'feDiffuseLighting': true,
			    'feDisplacementMap': true,
			    'feFlood': true,
			    'feGaussianBlur': true,
			    'feImage': true,
			    'feMerge': true,
			    'feMorphology': true,
			    'feOffset': true,
			    'feSpecularLighting': true,
			    'feTile': true,
			    'feTurbulence': true,
			    'filter': true,
			    'font': true,
			    'foreignObject': true,
			    'g': true,
			    'glyph': true,
			    'glyphRef': true,
			    'image': true,
			    'line': true,
			    'linearGradient': true,
			    'marker': true,
			    'mask': true,
			    'missing-glyph': true,
			    'path': true,
			    'pattern': true,
			    'polygon': true,
			    'polyline': true,
			    'radialGradient': true,
			    'rect': true,
			    'stop': true,
			    'svg': true,
			    'switch': true,
			    'symbol': true,
			    'text': true,
			    'textPath': true,
			    'tref': true,
			    'tspan': true,
			    'use': true
			  };

			  svgPresentationAttributes = {
			    'alignment-baseline': true,
			    'baseline-shift': true,
			    'clip-path': true,
			    'clip-rule': true,
			    'clip': true,
			    'color-interpolation-filters': true,
			    'color-interpolation': true,
			    'color-profile': true,
			    'color-rendering': true,
			    'color': true,
			    'cursor': true,
			    'direction': true,
			    'display': true,
			    'dominant-baseline': true,
			    'enable-background': true,
			    'fill-opacity': true,
			    'fill-rule': true,
			    'fill': true,
			    'filter': true,
			    'flood-color': true,
			    'flood-opacity': true,
			    'font-family': true,
			    'font-size-adjust': true,
			    'font-size': true,
			    'font-stretch': true,
			    'font-style': true,
			    'font-variant': true,
			    'font-weight': true,
			    'glyph-orientation-horizontal': true,
			    'glyph-orientation-vertical': true,
			    'image-rendering': true,
			    'kerning': true,
			    'letter-spacing': true,
			    'lighting-color': true,
			    'marker-end': true,
			    'marker-mid': true,
			    'marker-start': true,
			    'mask': true,
			    'opacity': true,
			    'overflow': true,
			    'pointer-events': true,
			    'shape-rendering': true,
			    'stop-color': true,
			    'stop-opacity': true,
			    'stroke-dasharray': true,
			    'stroke-dashoffset': true,
			    'stroke-linecap': true,
			    'stroke-linejoin': true,
			    'stroke-miterlimit': true,
			    'stroke-opacity': true,
			    'stroke-width': true,
			    'stroke': true,
			    'text-anchor': true,
			    'text-decoration': true,
			    'text-rendering': true,
			    'unicode-bidi': true,
			    'visibility': true,
			    'word-spacing': true,
			    'writing-mode': true
			  };

			  var createElement = function createElement(html) {
			    var div = aureliaPal.DOM.createElement('div');
			    div.innerHTML = html;
			    return div.firstChild;
			  };

			  svgAnalyzer = function () {
			    function SVGAnalyzer() {
			      

			      if (createElement('<svg><altGlyph /></svg>').firstElementChild.nodeName === 'altglyph' && elements.altGlyph) {
			        elements.altglyph = elements.altGlyph;
			        delete elements.altGlyph;
			        elements.altglyphdef = elements.altGlyphDef;
			        delete elements.altGlyphDef;
			        elements.altglyphitem = elements.altGlyphItem;
			        delete elements.altGlyphItem;
			        elements.glyphref = elements.glyphRef;
			        delete elements.glyphRef;
			      }
			    }

			    SVGAnalyzer.prototype.isStandardSvgAttribute = function isStandardSvgAttribute(nodeName, attributeName) {
			      return presentationElements[nodeName] && presentationAttributes[attributeName] || elements[nodeName] && elements[nodeName].indexOf(attributeName) !== -1;
			    };

			    return SVGAnalyzer;
			  }();
			}

			var elements = exports.elements = svgElements;
			var presentationElements = exports.presentationElements = svgPresentationElements;
			var presentationAttributes = exports.presentationAttributes = svgPresentationAttributes;
			var SVGAnalyzer = exports.SVGAnalyzer = svgAnalyzer || function () {
			  function _class11() {
			    
			  }

			  _class11.prototype.isStandardSvgAttribute = function isStandardSvgAttribute() {
			    return false;
			  };

			  return _class11;
			}();

			var ObserverLocator = exports.ObserverLocator = (_temp = _class12 = function () {
			  function ObserverLocator(taskQueue, eventManager, dirtyChecker, svgAnalyzer, parser) {
			    

			    this.taskQueue = taskQueue;
			    this.eventManager = eventManager;
			    this.dirtyChecker = dirtyChecker;
			    this.svgAnalyzer = svgAnalyzer;
			    this.parser = parser;

			    this.adapters = [];
			    this.logger = LogManager.getLogger('observer-locator');
			  }

			  ObserverLocator.prototype.getObserver = function getObserver(obj, propertyName) {
			    var observersLookup = obj.__observers__;
			    var observer = void 0;

			    if (observersLookup && propertyName in observersLookup) {
			      return observersLookup[propertyName];
			    }

			    observer = this.createPropertyObserver(obj, propertyName);

			    if (!observer.doNotCache) {
			      if (observersLookup === undefined) {
			        observersLookup = this.getOrCreateObserversLookup(obj);
			      }

			      observersLookup[propertyName] = observer;
			    }

			    return observer;
			  };

			  ObserverLocator.prototype.getOrCreateObserversLookup = function getOrCreateObserversLookup(obj) {
			    return obj.__observers__ || this.createObserversLookup(obj);
			  };

			  ObserverLocator.prototype.createObserversLookup = function createObserversLookup(obj) {
			    var value = {};

			    if (!Reflect.defineProperty(obj, '__observers__', {
			      enumerable: false,
			      configurable: false,
			      writable: false,
			      value: value
			    })) {
			      this.logger.warn('Cannot add observers to object', obj);
			    }

			    return value;
			  };

			  ObserverLocator.prototype.addAdapter = function addAdapter(adapter) {
			    this.adapters.push(adapter);
			  };

			  ObserverLocator.prototype.getAdapterObserver = function getAdapterObserver(obj, propertyName, descriptor) {
			    for (var _i28 = 0, ii = this.adapters.length; _i28 < ii; _i28++) {
			      var adapter = this.adapters[_i28];
			      var observer = adapter.getObserver(obj, propertyName, descriptor);
			      if (observer) {
			        return observer;
			      }
			    }
			    return null;
			  };

			  ObserverLocator.prototype.createPropertyObserver = function createPropertyObserver(obj, propertyName) {
			    var descriptor = void 0;
			    var handler = void 0;
			    var xlinkResult = void 0;

			    if (!(obj instanceof Object)) {
			      return new PrimitiveObserver(obj, propertyName);
			    }

			    if (obj instanceof aureliaPal.DOM.Element) {
			      if (propertyName === 'class') {
			        return new ClassObserver(obj);
			      }
			      if (propertyName === 'style' || propertyName === 'css') {
			        return new StyleObserver(obj, propertyName);
			      }
			      handler = this.eventManager.getElementHandler(obj, propertyName);
			      if (propertyName === 'value' && obj.tagName.toLowerCase() === 'select') {
			        return new SelectValueObserver(obj, handler, this);
			      }
			      if (propertyName === 'checked' && obj.tagName.toLowerCase() === 'input') {
			        return new CheckedObserver(obj, handler, this);
			      }
			      if (handler) {
			        return new ValueAttributeObserver(obj, propertyName, handler);
			      }
			      xlinkResult = /^xlink:(.+)$/.exec(propertyName);
			      if (xlinkResult) {
			        return new XLinkAttributeObserver(obj, propertyName, xlinkResult[1]);
			      }
			      if (propertyName === 'role' && (obj instanceof aureliaPal.DOM.Element || obj instanceof aureliaPal.DOM.SVGElement) || /^\w+:|^data-|^aria-/.test(propertyName) || obj instanceof aureliaPal.DOM.SVGElement && this.svgAnalyzer.isStandardSvgAttribute(obj.nodeName, propertyName)) {
			        return new DataAttributeObserver(obj, propertyName);
			      }
			    }

			    descriptor = Object.getPropertyDescriptor(obj, propertyName);

			    if (hasDeclaredDependencies(descriptor)) {
			      return createComputedObserver(obj, propertyName, descriptor, this);
			    }

			    if (descriptor) {
			      var existingGetterOrSetter = descriptor.get || descriptor.set;
			      if (existingGetterOrSetter) {
			        if (existingGetterOrSetter.getObserver) {
			          return existingGetterOrSetter.getObserver(obj);
			        }

			        var adapterObserver = this.getAdapterObserver(obj, propertyName, descriptor);
			        if (adapterObserver) {
			          return adapterObserver;
			        }
			        return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
			      }
			    }

			    if (obj instanceof Array) {
			      if (propertyName === 'length') {
			        return this.getArrayObserver(obj).getLengthObserver();
			      }

			      return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
			    } else if (obj instanceof Map) {
			      if (propertyName === 'size') {
			        return this.getMapObserver(obj).getLengthObserver();
			      }

			      return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
			    } else if (obj instanceof Set) {
			      if (propertyName === 'size') {
			        return this.getSetObserver(obj).getLengthObserver();
			      }

			      return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
			    }

			    return new SetterObserver(this.taskQueue, obj, propertyName);
			  };

			  ObserverLocator.prototype.getAccessor = function getAccessor(obj, propertyName) {
			    if (obj instanceof aureliaPal.DOM.Element) {
			      if (propertyName === 'class' || propertyName === 'style' || propertyName === 'css' || propertyName === 'value' && (obj.tagName.toLowerCase() === 'input' || obj.tagName.toLowerCase() === 'select') || propertyName === 'checked' && obj.tagName.toLowerCase() === 'input' || propertyName === 'model' && obj.tagName.toLowerCase() === 'input' || /^xlink:.+$/.exec(propertyName)) {
			        return this.getObserver(obj, propertyName);
			      }
			      if (/^\w+:|^data-|^aria-/.test(propertyName) || obj instanceof aureliaPal.DOM.SVGElement && this.svgAnalyzer.isStandardSvgAttribute(obj.nodeName, propertyName) || obj.tagName.toLowerCase() === 'img' && propertyName === 'src' || obj.tagName.toLowerCase() === 'a' && propertyName === 'href') {
			        return dataAttributeAccessor;
			      }
			    }
			    return propertyAccessor;
			  };

			  ObserverLocator.prototype.getArrayObserver = function getArrayObserver(array) {
			    return _getArrayObserver(this.taskQueue, array);
			  };

			  ObserverLocator.prototype.getMapObserver = function getMapObserver(map) {
			    return _getMapObserver(this.taskQueue, map);
			  };

			  ObserverLocator.prototype.getSetObserver = function getSetObserver(set) {
			    return _getSetObserver(this.taskQueue, set);
			  };

			  return ObserverLocator;
			}(), _class12.inject = [aureliaTaskQueue.TaskQueue, EventManager, DirtyChecker, SVGAnalyzer, Parser], _temp);

			var ObjectObservationAdapter = exports.ObjectObservationAdapter = function () {
			  function ObjectObservationAdapter() {
			    
			  }

			  ObjectObservationAdapter.prototype.getObserver = function getObserver(object, propertyName, descriptor) {
			    throw new Error('BindingAdapters must implement getObserver(object, propertyName).');
			  };

			  return ObjectObservationAdapter;
			}();

			var BindingExpression = exports.BindingExpression = function () {
			  function BindingExpression(observerLocator, targetProperty, sourceExpression, mode, lookupFunctions, attribute) {
			    

			    this.observerLocator = observerLocator;
			    this.targetProperty = targetProperty;
			    this.sourceExpression = sourceExpression;
			    this.mode = mode;
			    this.lookupFunctions = lookupFunctions;
			    this.attribute = attribute;
			    this.discrete = false;
			  }

			  BindingExpression.prototype.createBinding = function createBinding(target) {
			    return new Binding(this.observerLocator, this.sourceExpression, target, this.targetProperty, this.mode, this.lookupFunctions);
			  };

			  return BindingExpression;
			}();

			var Binding = exports.Binding = (_dec10 = connectable(), _dec10(_class13 = function () {
			  function Binding(observerLocator, sourceExpression, target, targetProperty, mode, lookupFunctions) {
			    

			    this.observerLocator = observerLocator;
			    this.sourceExpression = sourceExpression;
			    this.target = target;
			    this.targetProperty = targetProperty;
			    this.mode = mode;
			    this.lookupFunctions = lookupFunctions;
			  }

			  Binding.prototype.updateTarget = function updateTarget(value) {
			    this.targetObserver.setValue(value, this.target, this.targetProperty);
			  };

			  Binding.prototype.updateSource = function updateSource(value) {
			    this.sourceExpression.assign(this.source, value, this.lookupFunctions);
			  };

			  Binding.prototype.call = function call(context, newValue, oldValue) {
			    if (!this.isBound) {
			      return;
			    }
			    if (context === sourceContext) {
			      oldValue = this.targetObserver.getValue(this.target, this.targetProperty);
			      newValue = this.sourceExpression.evaluate(this.source, this.lookupFunctions);
			      if (newValue !== oldValue) {
			        this.updateTarget(newValue);
			      }
			      if (this.mode !== bindingMode.oneTime) {
			        this._version++;
			        this.sourceExpression.connect(this, this.source);
			        this.unobserve(false);
			      }
			      return;
			    }
			    if (context === targetContext) {
			      if (newValue !== this.sourceExpression.evaluate(this.source, this.lookupFunctions)) {
			        this.updateSource(newValue);
			      }
			      return;
			    }
			    throw new Error('Unexpected call context ' + context);
			  };

			  Binding.prototype.bind = function bind(source) {
			    if (this.isBound) {
			      if (this.source === source) {
			        return;
			      }
			      this.unbind();
			    }
			    this.isBound = true;
			    this.source = source;

			    if (this.sourceExpression.bind) {
			      this.sourceExpression.bind(this, source, this.lookupFunctions);
			    }

			    var mode = this.mode;
			    if (!this.targetObserver) {
			      var method = mode === bindingMode.twoWay || mode === bindingMode.fromView ? 'getObserver' : 'getAccessor';
			      this.targetObserver = this.observerLocator[method](this.target, this.targetProperty);
			    }

			    if ('bind' in this.targetObserver) {
			      this.targetObserver.bind();
			    }
			    if (this.mode !== bindingMode.fromView) {
			      var value = this.sourceExpression.evaluate(source, this.lookupFunctions);
			      this.updateTarget(value);
			    }

			    if (mode === bindingMode.oneTime) {
			      return;
			    } else if (mode === bindingMode.toView) {
			      enqueueBindingConnect(this);
			    } else if (mode === bindingMode.twoWay) {
			      this.sourceExpression.connect(this, source);
			      this.targetObserver.subscribe(targetContext, this);
			    } else if (mode === bindingMode.fromView) {
			      this.targetObserver.subscribe(targetContext, this);
			    }
			  };

			  Binding.prototype.unbind = function unbind() {
			    if (!this.isBound) {
			      return;
			    }
			    this.isBound = false;
			    if (this.sourceExpression.unbind) {
			      this.sourceExpression.unbind(this, this.source);
			    }
			    this.source = null;
			    if ('unbind' in this.targetObserver) {
			      this.targetObserver.unbind();
			    }
			    if (this.targetObserver.unsubscribe) {
			      this.targetObserver.unsubscribe(targetContext, this);
			    }
			    this.unobserve(true);
			  };

			  Binding.prototype.connect = function connect(evaluate) {
			    if (!this.isBound) {
			      return;
			    }
			    if (evaluate) {
			      var value = this.sourceExpression.evaluate(this.source, this.lookupFunctions);
			      this.updateTarget(value);
			    }
			    this.sourceExpression.connect(this, this.source);
			  };

			  return Binding;
			}()) || _class13);

			var CallExpression = exports.CallExpression = function () {
			  function CallExpression(observerLocator, targetProperty, sourceExpression, lookupFunctions) {
			    

			    this.observerLocator = observerLocator;
			    this.targetProperty = targetProperty;
			    this.sourceExpression = sourceExpression;
			    this.lookupFunctions = lookupFunctions;
			  }

			  CallExpression.prototype.createBinding = function createBinding(target) {
			    return new Call(this.observerLocator, this.sourceExpression, target, this.targetProperty, this.lookupFunctions);
			  };

			  return CallExpression;
			}();

			var Call = exports.Call = function () {
			  function Call(observerLocator, sourceExpression, target, targetProperty, lookupFunctions) {
			    

			    this.sourceExpression = sourceExpression;
			    this.target = target;
			    this.targetProperty = observerLocator.getObserver(target, targetProperty);
			    this.lookupFunctions = lookupFunctions;
			  }

			  Call.prototype.callSource = function callSource($event) {
			    var overrideContext = this.source.overrideContext;
			    Object.assign(overrideContext, $event);
			    overrideContext.$event = $event;
			    var mustEvaluate = true;
			    var result = this.sourceExpression.evaluate(this.source, this.lookupFunctions, mustEvaluate);
			    delete overrideContext.$event;
			    for (var prop in $event) {
			      delete overrideContext[prop];
			    }
			    return result;
			  };

			  Call.prototype.bind = function bind(source) {
			    var _this26 = this;

			    if (this.isBound) {
			      if (this.source === source) {
			        return;
			      }
			      this.unbind();
			    }
			    this.isBound = true;
			    this.source = source;

			    if (this.sourceExpression.bind) {
			      this.sourceExpression.bind(this, source, this.lookupFunctions);
			    }
			    this.targetProperty.setValue(function ($event) {
			      return _this26.callSource($event);
			    });
			  };

			  Call.prototype.unbind = function unbind() {
			    if (!this.isBound) {
			      return;
			    }
			    this.isBound = false;
			    if (this.sourceExpression.unbind) {
			      this.sourceExpression.unbind(this, this.source);
			    }
			    this.source = null;
			    this.targetProperty.setValue(null);
			  };

			  return Call;
			}();

			var ValueConverterResource = exports.ValueConverterResource = function () {
			  function ValueConverterResource(name) {
			    

			    this.name = name;
			  }

			  ValueConverterResource.convention = function convention(name) {
			    if (name.endsWith('ValueConverter')) {
			      return new ValueConverterResource(camelCase(name.substring(0, name.length - 14)));
			    }
			  };

			  ValueConverterResource.prototype.initialize = function initialize(container, target) {
			    this.instance = container.get(target);
			  };

			  ValueConverterResource.prototype.register = function register(registry, name) {
			    registry.registerValueConverter(name || this.name, this.instance);
			  };

			  ValueConverterResource.prototype.load = function load(container, target) {};

			  return ValueConverterResource;
			}();

			function valueConverter(nameOrTarget) {
			  if (nameOrTarget === undefined || typeof nameOrTarget === 'string') {
			    return function (target) {
			      aureliaMetadata.metadata.define(aureliaMetadata.metadata.resource, new ValueConverterResource(nameOrTarget), target);
			    };
			  }

			  aureliaMetadata.metadata.define(aureliaMetadata.metadata.resource, new ValueConverterResource(), nameOrTarget);
			}

			var BindingBehaviorResource = exports.BindingBehaviorResource = function () {
			  function BindingBehaviorResource(name) {
			    

			    this.name = name;
			  }

			  BindingBehaviorResource.convention = function convention(name) {
			    if (name.endsWith('BindingBehavior')) {
			      return new BindingBehaviorResource(camelCase(name.substring(0, name.length - 15)));
			    }
			  };

			  BindingBehaviorResource.prototype.initialize = function initialize(container, target) {
			    this.instance = container.get(target);
			  };

			  BindingBehaviorResource.prototype.register = function register(registry, name) {
			    registry.registerBindingBehavior(name || this.name, this.instance);
			  };

			  BindingBehaviorResource.prototype.load = function load(container, target) {};

			  return BindingBehaviorResource;
			}();

			function bindingBehavior(nameOrTarget) {
			  if (nameOrTarget === undefined || typeof nameOrTarget === 'string') {
			    return function (target) {
			      aureliaMetadata.metadata.define(aureliaMetadata.metadata.resource, new BindingBehaviorResource(nameOrTarget), target);
			    };
			  }

			  aureliaMetadata.metadata.define(aureliaMetadata.metadata.resource, new BindingBehaviorResource(), nameOrTarget);
			}

			var ListenerExpression = exports.ListenerExpression = function () {
			  function ListenerExpression(eventManager, targetEvent, sourceExpression, delegationStrategy, preventDefault, lookupFunctions) {
			    

			    this.eventManager = eventManager;
			    this.targetEvent = targetEvent;
			    this.sourceExpression = sourceExpression;
			    this.delegationStrategy = delegationStrategy;
			    this.discrete = true;
			    this.preventDefault = preventDefault;
			    this.lookupFunctions = lookupFunctions;
			  }

			  ListenerExpression.prototype.createBinding = function createBinding(target) {
			    return new Listener(this.eventManager, this.targetEvent, this.delegationStrategy, this.sourceExpression, target, this.preventDefault, this.lookupFunctions);
			  };

			  return ListenerExpression;
			}();

			var Listener = exports.Listener = function () {
			  function Listener(eventManager, targetEvent, delegationStrategy, sourceExpression, target, preventDefault, lookupFunctions) {
			    

			    this.eventManager = eventManager;
			    this.targetEvent = targetEvent;
			    this.delegationStrategy = delegationStrategy;
			    this.sourceExpression = sourceExpression;
			    this.target = target;
			    this.preventDefault = preventDefault;
			    this.lookupFunctions = lookupFunctions;
			  }

			  Listener.prototype.callSource = function callSource(event) {
			    var overrideContext = this.source.overrideContext;
			    overrideContext.$event = event;
			    var mustEvaluate = true;
			    var result = this.sourceExpression.evaluate(this.source, this.lookupFunctions, mustEvaluate);
			    delete overrideContext.$event;
			    if (result !== true && this.preventDefault) {
			      event.preventDefault();
			    }
			    return result;
			  };

			  Listener.prototype.handleEvent = function handleEvent(event) {
			    this.callSource(event);
			  };

			  Listener.prototype.bind = function bind(source) {
			    if (this.isBound) {
			      if (this.source === source) {
			        return;
			      }
			      this.unbind();
			    }
			    this.isBound = true;
			    this.source = source;

			    if (this.sourceExpression.bind) {
			      this.sourceExpression.bind(this, source, this.lookupFunctions);
			    }
			    this._handler = this.eventManager.addEventListener(this.target, this.targetEvent, this, this.delegationStrategy, true);
			  };

			  Listener.prototype.unbind = function unbind() {
			    if (!this.isBound) {
			      return;
			    }
			    this.isBound = false;
			    if (this.sourceExpression.unbind) {
			      this.sourceExpression.unbind(this, this.source);
			    }
			    this.source = null;
			    this._handler.dispose();
			    this._handler = null;
			  };

			  return Listener;
			}();

			function getAU(element) {
			  var au = element.au;

			  if (au === undefined) {
			    throw new Error('No Aurelia APIs are defined for the element: "' + element.tagName + '".');
			  }

			  return au;
			}

			var NameExpression = exports.NameExpression = function () {
			  function NameExpression(sourceExpression, apiName, lookupFunctions) {
			    

			    this.sourceExpression = sourceExpression;
			    this.apiName = apiName;
			    this.lookupFunctions = lookupFunctions;
			    this.discrete = true;
			  }

			  NameExpression.prototype.createBinding = function createBinding(target) {
			    return new NameBinder(this.sourceExpression, NameExpression.locateAPI(target, this.apiName), this.lookupFunctions);
			  };

			  NameExpression.locateAPI = function locateAPI(element, apiName) {
			    switch (apiName) {
			      case 'element':
			        return element;
			      case 'controller':
			        return getAU(element).controller;
			      case 'view-model':
			        return getAU(element).controller.viewModel;
			      case 'view':
			        return getAU(element).controller.view;
			      default:
			        var target = getAU(element)[apiName];

			        if (target === undefined) {
			          throw new Error('Attempted to reference "' + apiName + '", but it was not found amongst the target\'s API.');
			        }

			        return target.viewModel;
			    }
			  };

			  return NameExpression;
			}();

			var NameBinder = function () {
			  function NameBinder(sourceExpression, target, lookupFunctions) {
			    

			    this.sourceExpression = sourceExpression;
			    this.target = target;
			    this.lookupFunctions = lookupFunctions;
			  }

			  NameBinder.prototype.bind = function bind(source) {
			    if (this.isBound) {
			      if (this.source === source) {
			        return;
			      }
			      this.unbind();
			    }
			    this.isBound = true;
			    this.source = source;
			    if (this.sourceExpression.bind) {
			      this.sourceExpression.bind(this, source, this.lookupFunctions);
			    }
			    this.sourceExpression.assign(this.source, this.target, this.lookupFunctions);
			  };

			  NameBinder.prototype.unbind = function unbind() {
			    if (!this.isBound) {
			      return;
			    }
			    this.isBound = false;
			    if (this.sourceExpression.evaluate(this.source, this.lookupFunctions) === this.target) {
			      this.sourceExpression.assign(this.source, null, this.lookupFunctions);
			    }
			    if (this.sourceExpression.unbind) {
			      this.sourceExpression.unbind(this, this.source);
			    }
			    this.source = null;
			  };

			  return NameBinder;
			}();

			var LookupFunctions = {
			  bindingBehaviors: function bindingBehaviors(name) {
			    return null;
			  },
			  valueConverters: function valueConverters(name) {
			    return null;
			  }
			};

			var BindingEngine = exports.BindingEngine = (_temp2 = _class14 = function () {
			  function BindingEngine(observerLocator, parser) {
			    

			    this.observerLocator = observerLocator;
			    this.parser = parser;
			  }

			  BindingEngine.prototype.createBindingExpression = function createBindingExpression(targetProperty, sourceExpression) {
			    var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : bindingMode.toView;
			    var lookupFunctions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : LookupFunctions;

			    return new BindingExpression(this.observerLocator, targetProperty, this.parser.parse(sourceExpression), mode, lookupFunctions);
			  };

			  BindingEngine.prototype.propertyObserver = function propertyObserver(obj, propertyName) {
			    var _this27 = this;

			    return {
			      subscribe: function subscribe(callback) {
			        var observer = _this27.observerLocator.getObserver(obj, propertyName);
			        observer.subscribe(callback);
			        return {
			          dispose: function dispose() {
			            return observer.unsubscribe(callback);
			          }
			        };
			      }
			    };
			  };

			  BindingEngine.prototype.collectionObserver = function collectionObserver(collection) {
			    var _this28 = this;

			    return {
			      subscribe: function subscribe(callback) {
			        var observer = void 0;
			        if (collection instanceof Array) {
			          observer = _this28.observerLocator.getArrayObserver(collection);
			        } else if (collection instanceof Map) {
			          observer = _this28.observerLocator.getMapObserver(collection);
			        } else if (collection instanceof Set) {
			          observer = _this28.observerLocator.getSetObserver(collection);
			        } else {
			          throw new Error('collection must be an instance of Array, Map or Set.');
			        }
			        observer.subscribe(callback);
			        return {
			          dispose: function dispose() {
			            return observer.unsubscribe(callback);
			          }
			        };
			      }
			    };
			  };

			  BindingEngine.prototype.expressionObserver = function expressionObserver(bindingContext, expression) {
			    var scope = { bindingContext: bindingContext, overrideContext: createOverrideContext(bindingContext) };
			    return new ExpressionObserver(scope, this.parser.parse(expression), this.observerLocator, LookupFunctions);
			  };

			  BindingEngine.prototype.parseExpression = function parseExpression(expression) {
			    return this.parser.parse(expression);
			  };

			  BindingEngine.prototype.registerAdapter = function registerAdapter(adapter) {
			    this.observerLocator.addAdapter(adapter);
			  };

			  return BindingEngine;
			}(), _class14.inject = [ObserverLocator, Parser], _temp2);


			var setProto = Set.prototype;

			function _getSetObserver(taskQueue, set) {
			  return ModifySetObserver.for(taskQueue, set);
			}

			exports.getSetObserver = _getSetObserver;

			var ModifySetObserver = function (_ModifyCollectionObse3) {
			  _inherits(ModifySetObserver, _ModifyCollectionObse3);

			  function ModifySetObserver(taskQueue, set) {
			    

			    return _possibleConstructorReturn(this, _ModifyCollectionObse3.call(this, taskQueue, set));
			  }

			  ModifySetObserver.for = function _for(taskQueue, set) {
			    if (!('__set_observer__' in set)) {
			      Reflect.defineProperty(set, '__set_observer__', {
			        value: ModifySetObserver.create(taskQueue, set),
			        enumerable: false, configurable: false
			      });
			    }
			    return set.__set_observer__;
			  };

			  ModifySetObserver.create = function create(taskQueue, set) {
			    var observer = new ModifySetObserver(taskQueue, set);

			    var proto = setProto;
			    if (proto.add !== set.add || proto.delete !== set.delete || proto.clear !== set.clear) {
			      proto = {
			        add: set.add,
			        delete: set.delete,
			        clear: set.clear
			      };
			    }

			    set.add = function () {
			      var type = 'add';
			      var oldSize = set.size;
			      var methodCallResult = proto.add.apply(set, arguments);
			      var hasValue = set.size === oldSize;
			      if (!hasValue) {
			        observer.addChangeRecord({
			          type: type,
			          object: set,
			          value: Array.from(set).pop()
			        });
			      }
			      return methodCallResult;
			    };

			    set.delete = function () {
			      var hasValue = set.has(arguments[0]);
			      var methodCallResult = proto.delete.apply(set, arguments);
			      if (hasValue) {
			        observer.addChangeRecord({
			          type: 'delete',
			          object: set,
			          value: arguments[0]
			        });
			      }
			      return methodCallResult;
			    };

			    set.clear = function () {
			      var methodCallResult = proto.clear.apply(set, arguments);
			      observer.addChangeRecord({
			        type: 'clear',
			        object: set
			      });
			      return methodCallResult;
			    };

			    return observer;
			  };

			  return ModifySetObserver;
			}(ModifyCollectionObserver);

			function observable(targetOrConfig, key, descriptor) {
			  function deco(target, key, descriptor, config) {
			    var isClassDecorator = key === undefined;
			    if (isClassDecorator) {
			      target = target.prototype;
			      key = typeof config === 'string' ? config : config.name;
			    }

			    var innerPropertyName = '_' + key;
			    var innerPropertyDescriptor = {
			      configurable: true,
			      enumerable: false,
			      writable: true
			    };

			    var callbackName = config && config.changeHandler || key + 'Changed';

			    if (descriptor) {
			      if (typeof descriptor.initializer === 'function') {
			        innerPropertyDescriptor.value = descriptor.initializer();
			      }
			    } else {
			      descriptor = {};
			    }

			    if (!('enumerable' in descriptor)) {
			      descriptor.enumerable = true;
			    }

			    delete descriptor.value;
			    delete descriptor.writable;
			    delete descriptor.initializer;

			    Reflect.defineProperty(target, innerPropertyName, innerPropertyDescriptor);

			    descriptor.get = function () {
			      return this[innerPropertyName];
			    };
			    descriptor.set = function (newValue) {
			      var oldValue = this[innerPropertyName];
			      if (newValue === oldValue) {
			        return;
			      }

			      this[innerPropertyName] = newValue;
			      Reflect.defineProperty(this, innerPropertyName, { enumerable: false });

			      if (this[callbackName]) {
			        this[callbackName](newValue, oldValue, key);
			      }
			    };

			    descriptor.get.dependencies = [innerPropertyName];

			    if (isClassDecorator) {
			      Reflect.defineProperty(target, key, descriptor);
			    } else {
			      return descriptor;
			    }
			  }

			  if (key === undefined) {
			    return function (t, k, d) {
			      return deco(t, k, d, targetOrConfig);
			    };
			  }
			  return deco(targetOrConfig, key, descriptor);
			}

			var signals = {};

			function connectBindingToSignal(binding, name) {
			  if (!signals.hasOwnProperty(name)) {
			    signals[name] = 0;
			  }
			  binding.observeProperty(signals, name);
			}

			function signalBindings(name) {
			  if (signals.hasOwnProperty(name)) {
			    signals[name]++;
			  }
			}
			});

			unwrapExports(aureliaBinding);
			var aureliaBinding_1 = aureliaBinding.getSetObserver;
			var aureliaBinding_2 = aureliaBinding.BindingEngine;
			var aureliaBinding_3 = aureliaBinding.NameExpression;
			var aureliaBinding_4 = aureliaBinding.Listener;
			var aureliaBinding_5 = aureliaBinding.ListenerExpression;
			var aureliaBinding_6 = aureliaBinding.BindingBehaviorResource;
			var aureliaBinding_7 = aureliaBinding.ValueConverterResource;
			var aureliaBinding_8 = aureliaBinding.Call;
			var aureliaBinding_9 = aureliaBinding.CallExpression;
			var aureliaBinding_10 = aureliaBinding.Binding;
			var aureliaBinding_11 = aureliaBinding.BindingExpression;
			var aureliaBinding_12 = aureliaBinding.ObjectObservationAdapter;
			var aureliaBinding_13 = aureliaBinding.ObserverLocator;
			var aureliaBinding_14 = aureliaBinding.SVGAnalyzer;
			var aureliaBinding_15 = aureliaBinding.presentationAttributes;
			var aureliaBinding_16 = aureliaBinding.presentationElements;
			var aureliaBinding_17 = aureliaBinding.elements;
			var aureliaBinding_18 = aureliaBinding.ComputedExpression;
			var aureliaBinding_19 = aureliaBinding.ClassObserver;
			var aureliaBinding_20 = aureliaBinding.SelectValueObserver;
			var aureliaBinding_21 = aureliaBinding.CheckedObserver;
			var aureliaBinding_22 = aureliaBinding.ValueAttributeObserver;
			var aureliaBinding_23 = aureliaBinding.StyleObserver;
			var aureliaBinding_24 = aureliaBinding.DataAttributeObserver;
			var aureliaBinding_25 = aureliaBinding.dataAttributeAccessor;
			var aureliaBinding_26 = aureliaBinding.XLinkAttributeObserver;
			var aureliaBinding_27 = aureliaBinding.SetterObserver;
			var aureliaBinding_28 = aureliaBinding.PrimitiveObserver;
			var aureliaBinding_29 = aureliaBinding.propertyAccessor;
			var aureliaBinding_30 = aureliaBinding.DirtyCheckProperty;
			var aureliaBinding_31 = aureliaBinding.DirtyChecker;
			var aureliaBinding_32 = aureliaBinding.EventSubscriber;
			var aureliaBinding_33 = aureliaBinding.EventManager;
			var aureliaBinding_34 = aureliaBinding.delegationStrategy;
			var aureliaBinding_35 = aureliaBinding.getMapObserver;
			var aureliaBinding_36 = aureliaBinding.ParserImplementation;
			var aureliaBinding_37 = aureliaBinding.Parser;
			var aureliaBinding_38 = aureliaBinding.Scanner;
			var aureliaBinding_39 = aureliaBinding.Lexer;
			var aureliaBinding_40 = aureliaBinding.Token;
			var aureliaBinding_41 = aureliaBinding.bindingMode;
			var aureliaBinding_42 = aureliaBinding.ExpressionCloner;
			var aureliaBinding_43 = aureliaBinding.Unparser;
			var aureliaBinding_44 = aureliaBinding.LiteralObject;
			var aureliaBinding_45 = aureliaBinding.LiteralArray;
			var aureliaBinding_46 = aureliaBinding.LiteralString;
			var aureliaBinding_47 = aureliaBinding.LiteralPrimitive;
			var aureliaBinding_48 = aureliaBinding.PrefixNot;
			var aureliaBinding_49 = aureliaBinding.Binary;
			var aureliaBinding_50 = aureliaBinding.CallFunction;
			var aureliaBinding_51 = aureliaBinding.CallMember;
			var aureliaBinding_52 = aureliaBinding.CallScope;
			var aureliaBinding_53 = aureliaBinding.AccessKeyed;
			var aureliaBinding_54 = aureliaBinding.AccessMember;
			var aureliaBinding_55 = aureliaBinding.AccessScope;
			var aureliaBinding_56 = aureliaBinding.AccessThis;
			var aureliaBinding_57 = aureliaBinding.Conditional;
			var aureliaBinding_58 = aureliaBinding.Assign;
			var aureliaBinding_59 = aureliaBinding.ValueConverter;
			var aureliaBinding_60 = aureliaBinding.BindingBehavior;
			var aureliaBinding_61 = aureliaBinding.Chain;
			var aureliaBinding_62 = aureliaBinding.Expression;
			var aureliaBinding_63 = aureliaBinding.getArrayObserver;
			var aureliaBinding_64 = aureliaBinding.CollectionLengthObserver;
			var aureliaBinding_65 = aureliaBinding.ModifyCollectionObserver;
			var aureliaBinding_66 = aureliaBinding.ExpressionObserver;
			var aureliaBinding_67 = aureliaBinding.sourceContext;
			var aureliaBinding_68 = aureliaBinding.targetContext;
			var aureliaBinding_69 = aureliaBinding.camelCase;
			var aureliaBinding_70 = aureliaBinding.createOverrideContext;
			var aureliaBinding_71 = aureliaBinding.getContextFor;
			var aureliaBinding_72 = aureliaBinding.createScopeForTest;
			var aureliaBinding_73 = aureliaBinding.connectable;
			var aureliaBinding_74 = aureliaBinding.enqueueBindingConnect;
			var aureliaBinding_75 = aureliaBinding.subscriberCollection;
			var aureliaBinding_76 = aureliaBinding.calcSplices;
			var aureliaBinding_77 = aureliaBinding.mergeSplice;
			var aureliaBinding_78 = aureliaBinding.projectArraySplices;
			var aureliaBinding_79 = aureliaBinding.getChangeRecords;
			var aureliaBinding_80 = aureliaBinding.cloneExpression;
			var aureliaBinding_81 = aureliaBinding.hasDeclaredDependencies;
			var aureliaBinding_82 = aureliaBinding.declarePropertyDependencies;
			var aureliaBinding_83 = aureliaBinding.computedFrom;
			var aureliaBinding_84 = aureliaBinding.createComputedObserver;
			var aureliaBinding_85 = aureliaBinding.valueConverter;
			var aureliaBinding_86 = aureliaBinding.bindingBehavior;
			var aureliaBinding_87 = aureliaBinding.observable;
			var aureliaBinding_88 = aureliaBinding.connectBindingToSignal;
			var aureliaBinding_89 = aureliaBinding.signalBindings;

			var aureliaDependencyInjection = createCommonjsModule(function (module, exports) {

			Object.defineProperty(exports, "__esModule", {
			  value: true
			});
			exports.Container = exports.InvocationHandler = exports._emptyParameters = exports.SingletonRegistration = exports.TransientRegistration = exports.FactoryInvoker = exports.NewInstance = exports.Factory = exports.StrategyResolver = exports.Parent = exports.Optional = exports.All = exports.Lazy = exports.resolver = undefined;

			var _dec, _class, _dec2, _class3, _dec3, _class5, _dec4, _class7, _dec5, _class9, _dec6, _class11, _dec7, _class13, _classInvokers;

			exports.getDecoratorDependencies = getDecoratorDependencies;
			exports.lazy = lazy;
			exports.all = all;
			exports.optional = optional;
			exports.parent = parent;
			exports.factory = factory;
			exports.newInstance = newInstance;
			exports.invoker = invoker;
			exports.invokeAsFactory = invokeAsFactory;
			exports.registration = registration;
			exports.transient = transient;
			exports.singleton = singleton;
			exports.autoinject = autoinject;
			exports.inject = inject;







			var resolver = exports.resolver = aureliaMetadata.protocol.create('aurelia:resolver', function (target) {
			  if (!(typeof target.get === 'function')) {
			    return 'Resolvers must implement: get(container: Container, key: any): any';
			  }

			  return true;
			});

			var Lazy = exports.Lazy = (_dec = resolver(), _dec(_class = function () {
			  function Lazy(key) {
			    

			    this._key = key;
			  }

			  Lazy.prototype.get = function get(container) {
			    var _this = this;

			    return function () {
			      return container.get(_this._key);
			    };
			  };

			  Lazy.of = function of(key) {
			    return new Lazy(key);
			  };

			  return Lazy;
			}()) || _class);
			var All = exports.All = (_dec2 = resolver(), _dec2(_class3 = function () {
			  function All(key) {
			    

			    this._key = key;
			  }

			  All.prototype.get = function get(container) {
			    return container.getAll(this._key);
			  };

			  All.of = function of(key) {
			    return new All(key);
			  };

			  return All;
			}()) || _class3);
			var Optional = exports.Optional = (_dec3 = resolver(), _dec3(_class5 = function () {
			  function Optional(key) {
			    var checkParent = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

			    

			    this._key = key;
			    this._checkParent = checkParent;
			  }

			  Optional.prototype.get = function get(container) {
			    if (container.hasResolver(this._key, this._checkParent)) {
			      return container.get(this._key);
			    }

			    return null;
			  };

			  Optional.of = function of(key) {
			    var checkParent = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

			    return new Optional(key, checkParent);
			  };

			  return Optional;
			}()) || _class5);
			var Parent = exports.Parent = (_dec4 = resolver(), _dec4(_class7 = function () {
			  function Parent(key) {
			    

			    this._key = key;
			  }

			  Parent.prototype.get = function get(container) {
			    return container.parent ? container.parent.get(this._key) : null;
			  };

			  Parent.of = function of(key) {
			    return new Parent(key);
			  };

			  return Parent;
			}()) || _class7);
			var StrategyResolver = exports.StrategyResolver = (_dec5 = resolver(), _dec5(_class9 = function () {
			  function StrategyResolver(strategy, state) {
			    

			    this.strategy = strategy;
			    this.state = state;
			  }

			  StrategyResolver.prototype.get = function get(container, key) {
			    switch (this.strategy) {
			      case 0:
			        return this.state;
			      case 1:
			        var singleton = container.invoke(this.state);
			        this.state = singleton;
			        this.strategy = 0;
			        return singleton;
			      case 2:
			        return container.invoke(this.state);
			      case 3:
			        return this.state(container, key, this);
			      case 4:
			        return this.state[0].get(container, key);
			      case 5:
			        return container.get(this.state);
			      default:
			        throw new Error('Invalid strategy: ' + this.strategy);
			    }
			  };

			  return StrategyResolver;
			}()) || _class9);
			var Factory = exports.Factory = (_dec6 = resolver(), _dec6(_class11 = function () {
			  function Factory(key) {
			    

			    this._key = key;
			  }

			  Factory.prototype.get = function get(container) {
			    var _this2 = this;

			    return function () {
			      for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
			        rest[_key] = arguments[_key];
			      }

			      return container.invoke(_this2._key, rest);
			    };
			  };

			  Factory.of = function of(key) {
			    return new Factory(key);
			  };

			  return Factory;
			}()) || _class11);
			var NewInstance = exports.NewInstance = (_dec7 = resolver(), _dec7(_class13 = function () {
			  function NewInstance(key) {
			    

			    this.key = key;
			    this.asKey = key;

			    for (var _len2 = arguments.length, dynamicDependencies = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
			      dynamicDependencies[_key2 - 1] = arguments[_key2];
			    }

			    this.dynamicDependencies = dynamicDependencies;
			  }

			  NewInstance.prototype.get = function get(container) {
			    var dynamicDependencies = this.dynamicDependencies.length > 0 ? this.dynamicDependencies.map(function (dependency) {
			      return dependency['protocol:aurelia:resolver'] ? dependency.get(container) : container.get(dependency);
			    }) : undefined;
			    var instance = container.invoke(this.key, dynamicDependencies);
			    container.registerInstance(this.asKey, instance);
			    return instance;
			  };

			  NewInstance.prototype.as = function as(key) {
			    this.asKey = key;
			    return this;
			  };

			  NewInstance.of = function of(key) {
			    for (var _len3 = arguments.length, dynamicDependencies = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
			      dynamicDependencies[_key3 - 1] = arguments[_key3];
			    }

			    return new (Function.prototype.bind.apply(NewInstance, [null].concat([key], dynamicDependencies)))();
			  };

			  return NewInstance;
			}()) || _class13);
			function getDecoratorDependencies(target, name) {
			  var dependencies = target.inject;
			  if (typeof dependencies === 'function') {
			    throw new Error('Decorator ' + name + ' cannot be used with "inject()".  Please use an array instead.');
			  }
			  if (!dependencies) {
			    dependencies = aureliaMetadata.metadata.getOwn(aureliaMetadata.metadata.paramTypes, target).slice();
			    target.inject = dependencies;
			  }

			  return dependencies;
			}

			function lazy(keyValue) {
			  return function (target, key, index) {
			    var params = getDecoratorDependencies(target, 'lazy');
			    params[index] = Lazy.of(keyValue);
			  };
			}

			function all(keyValue) {
			  return function (target, key, index) {
			    var params = getDecoratorDependencies(target, 'all');
			    params[index] = All.of(keyValue);
			  };
			}

			function optional() {
			  var checkParentOrTarget = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

			  var deco = function deco(checkParent) {
			    return function (target, key, index) {
			      var params = getDecoratorDependencies(target, 'optional');
			      params[index] = Optional.of(params[index], checkParent);
			    };
			  };
			  if (typeof checkParentOrTarget === 'boolean') {
			    return deco(checkParentOrTarget);
			  }
			  return deco(true);
			}

			function parent(target, key, index) {
			  var params = getDecoratorDependencies(target, 'parent');
			  params[index] = Parent.of(params[index]);
			}

			function factory(keyValue, asValue) {
			  return function (target, key, index) {
			    var params = getDecoratorDependencies(target, 'factory');
			    var factory = Factory.of(keyValue);
			    params[index] = asValue ? factory.as(asValue) : factory;
			  };
			}

			function newInstance(asKeyOrTarget) {
			  for (var _len4 = arguments.length, dynamicDependencies = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
			    dynamicDependencies[_key4 - 1] = arguments[_key4];
			  }

			  var deco = function deco(asKey) {
			    return function (target, key, index) {
			      var params = getDecoratorDependencies(target, 'newInstance');
			      params[index] = NewInstance.of.apply(NewInstance, [params[index]].concat(dynamicDependencies));
			      if (!!asKey) {
			        params[index].as(asKey);
			      }
			    };
			  };
			  if (arguments.length >= 1) {
			    return deco(asKeyOrTarget);
			  }
			  return deco();
			}

			function invoker(value) {
			  return function (target) {
			    aureliaMetadata.metadata.define(aureliaMetadata.metadata.invoker, value, target);
			  };
			}

			function invokeAsFactory(potentialTarget) {
			  var deco = function deco(target) {
			    aureliaMetadata.metadata.define(aureliaMetadata.metadata.invoker, FactoryInvoker.instance, target);
			  };

			  return potentialTarget ? deco(potentialTarget) : deco;
			}

			var FactoryInvoker = exports.FactoryInvoker = function () {
			  function FactoryInvoker() {
			    
			  }

			  FactoryInvoker.prototype.invoke = function invoke(container, fn, dependencies) {
			    var i = dependencies.length;
			    var args = new Array(i);

			    while (i--) {
			      args[i] = container.get(dependencies[i]);
			    }

			    return fn.apply(undefined, args);
			  };

			  FactoryInvoker.prototype.invokeWithDynamicDependencies = function invokeWithDynamicDependencies(container, fn, staticDependencies, dynamicDependencies) {
			    var i = staticDependencies.length;
			    var args = new Array(i);

			    while (i--) {
			      args[i] = container.get(staticDependencies[i]);
			    }

			    if (dynamicDependencies !== undefined) {
			      args = args.concat(dynamicDependencies);
			    }

			    return fn.apply(undefined, args);
			  };

			  return FactoryInvoker;
			}();

			FactoryInvoker.instance = new FactoryInvoker();

			function registration(value) {
			  return function (target) {
			    aureliaMetadata.metadata.define(aureliaMetadata.metadata.registration, value, target);
			  };
			}

			function transient(key) {
			  return registration(new TransientRegistration(key));
			}

			function singleton(keyOrRegisterInChild) {
			  var registerInChild = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

			  return registration(new SingletonRegistration(keyOrRegisterInChild, registerInChild));
			}

			var TransientRegistration = exports.TransientRegistration = function () {
			  function TransientRegistration(key) {
			    

			    this._key = key;
			  }

			  TransientRegistration.prototype.registerResolver = function registerResolver(container, key, fn) {
			    var existingResolver = container.getResolver(this._key || key);
			    return existingResolver === undefined ? container.registerTransient(this._key || key, fn) : existingResolver;
			  };

			  return TransientRegistration;
			}();

			var SingletonRegistration = exports.SingletonRegistration = function () {
			  function SingletonRegistration(keyOrRegisterInChild) {
			    var registerInChild = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

			    

			    if (typeof keyOrRegisterInChild === 'boolean') {
			      this._registerInChild = keyOrRegisterInChild;
			    } else {
			      this._key = keyOrRegisterInChild;
			      this._registerInChild = registerInChild;
			    }
			  }

			  SingletonRegistration.prototype.registerResolver = function registerResolver(container, key, fn) {
			    var targetContainer = this._registerInChild ? container : container.root;
			    var existingResolver = targetContainer.getResolver(this._key || key);
			    return existingResolver === undefined ? targetContainer.registerSingleton(this._key || key, fn) : existingResolver;
			  };

			  return SingletonRegistration;
			}();

			function validateKey(key) {
			  if (key === null || key === undefined) {
			    throw new Error('key/value cannot be null or undefined. Are you trying to inject/register something that doesn\'t exist with DI?');
			  }
			}
			var _emptyParameters = exports._emptyParameters = Object.freeze([]);

			aureliaMetadata.metadata.registration = 'aurelia:registration';
			aureliaMetadata.metadata.invoker = 'aurelia:invoker';

			var resolverDecorates = resolver.decorates;

			var InvocationHandler = exports.InvocationHandler = function () {
			  function InvocationHandler(fn, invoker, dependencies) {
			    

			    this.fn = fn;
			    this.invoker = invoker;
			    this.dependencies = dependencies;
			  }

			  InvocationHandler.prototype.invoke = function invoke(container, dynamicDependencies) {
			    return dynamicDependencies !== undefined ? this.invoker.invokeWithDynamicDependencies(container, this.fn, this.dependencies, dynamicDependencies) : this.invoker.invoke(container, this.fn, this.dependencies);
			  };

			  return InvocationHandler;
			}();

			function invokeWithDynamicDependencies(container, fn, staticDependencies, dynamicDependencies) {
			  var i = staticDependencies.length;
			  var args = new Array(i);
			  var lookup = void 0;

			  while (i--) {
			    lookup = staticDependencies[i];

			    if (lookup === null || lookup === undefined) {
			      throw new Error('Constructor Parameter with index ' + i + ' cannot be null or undefined. Are you trying to inject/register something that doesn\'t exist with DI?');
			    } else {
			      args[i] = container.get(lookup);
			    }
			  }

			  if (dynamicDependencies !== undefined) {
			    args = args.concat(dynamicDependencies);
			  }

			  return Reflect.construct(fn, args);
			}

			var classInvokers = (_classInvokers = {}, _classInvokers[0] = {
			  invoke: function invoke(container, Type) {
			    return new Type();
			  },

			  invokeWithDynamicDependencies: invokeWithDynamicDependencies
			}, _classInvokers[1] = {
			  invoke: function invoke(container, Type, deps) {
			    return new Type(container.get(deps[0]));
			  },

			  invokeWithDynamicDependencies: invokeWithDynamicDependencies
			}, _classInvokers[2] = {
			  invoke: function invoke(container, Type, deps) {
			    return new Type(container.get(deps[0]), container.get(deps[1]));
			  },

			  invokeWithDynamicDependencies: invokeWithDynamicDependencies
			}, _classInvokers[3] = {
			  invoke: function invoke(container, Type, deps) {
			    return new Type(container.get(deps[0]), container.get(deps[1]), container.get(deps[2]));
			  },

			  invokeWithDynamicDependencies: invokeWithDynamicDependencies
			}, _classInvokers[4] = {
			  invoke: function invoke(container, Type, deps) {
			    return new Type(container.get(deps[0]), container.get(deps[1]), container.get(deps[2]), container.get(deps[3]));
			  },

			  invokeWithDynamicDependencies: invokeWithDynamicDependencies
			}, _classInvokers[5] = {
			  invoke: function invoke(container, Type, deps) {
			    return new Type(container.get(deps[0]), container.get(deps[1]), container.get(deps[2]), container.get(deps[3]), container.get(deps[4]));
			  },

			  invokeWithDynamicDependencies: invokeWithDynamicDependencies
			}, _classInvokers.fallback = {
			  invoke: invokeWithDynamicDependencies,
			  invokeWithDynamicDependencies: invokeWithDynamicDependencies
			}, _classInvokers);

			function getDependencies(f) {
			  if (!f.hasOwnProperty('inject')) {
			    return [];
			  }

			  if (typeof f.inject === 'function') {
			    return f.inject();
			  }

			  return f.inject;
			}

			var Container = exports.Container = function () {
			  function Container(configuration) {
			    

			    if (configuration === undefined) {
			      configuration = {};
			    }

			    this._configuration = configuration;
			    this._onHandlerCreated = configuration.onHandlerCreated;
			    this._handlers = configuration.handlers || (configuration.handlers = new Map());
			    this._resolvers = new Map();
			    this.root = this;
			    this.parent = null;
			  }

			  Container.prototype.makeGlobal = function makeGlobal() {
			    Container.instance = this;
			    return this;
			  };

			  Container.prototype.setHandlerCreatedCallback = function setHandlerCreatedCallback(onHandlerCreated) {
			    this._onHandlerCreated = onHandlerCreated;
			    this._configuration.onHandlerCreated = onHandlerCreated;
			  };

			  Container.prototype.registerInstance = function registerInstance(key, instance) {
			    return this.registerResolver(key, new StrategyResolver(0, instance === undefined ? key : instance));
			  };

			  Container.prototype.registerSingleton = function registerSingleton(key, fn) {
			    return this.registerResolver(key, new StrategyResolver(1, fn === undefined ? key : fn));
			  };

			  Container.prototype.registerTransient = function registerTransient(key, fn) {
			    return this.registerResolver(key, new StrategyResolver(2, fn === undefined ? key : fn));
			  };

			  Container.prototype.registerHandler = function registerHandler(key, handler) {
			    return this.registerResolver(key, new StrategyResolver(3, handler));
			  };

			  Container.prototype.registerAlias = function registerAlias(originalKey, aliasKey) {
			    return this.registerResolver(aliasKey, new StrategyResolver(5, originalKey));
			  };

			  Container.prototype.registerResolver = function registerResolver(key, resolver) {
			    validateKey(key);

			    var allResolvers = this._resolvers;
			    var result = allResolvers.get(key);

			    if (result === undefined) {
			      allResolvers.set(key, resolver);
			    } else if (result.strategy === 4) {
			      result.state.push(resolver);
			    } else {
			      allResolvers.set(key, new StrategyResolver(4, [result, resolver]));
			    }

			    return resolver;
			  };

			  Container.prototype.autoRegister = function autoRegister(key, fn) {
			    fn = fn === undefined ? key : fn;

			    if (typeof fn === 'function') {
			      var _registration = aureliaMetadata.metadata.get(aureliaMetadata.metadata.registration, fn);

			      if (_registration === undefined) {
			        return this.registerResolver(key, new StrategyResolver(1, fn));
			      }

			      return _registration.registerResolver(this, key, fn);
			    }

			    return this.registerResolver(key, new StrategyResolver(0, fn));
			  };

			  Container.prototype.autoRegisterAll = function autoRegisterAll(fns) {
			    var i = fns.length;
			    while (i--) {
			      this.autoRegister(fns[i]);
			    }
			  };

			  Container.prototype.unregister = function unregister(key) {
			    this._resolvers.delete(key);
			  };

			  Container.prototype.hasResolver = function hasResolver(key) {
			    var checkParent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

			    validateKey(key);

			    return this._resolvers.has(key) || checkParent && this.parent !== null && this.parent.hasResolver(key, checkParent);
			  };

			  Container.prototype.getResolver = function getResolver(key) {
			    return this._resolvers.get(key);
			  };

			  Container.prototype.get = function get(key) {
			    validateKey(key);

			    if (key === Container) {
			      return this;
			    }

			    if (resolverDecorates(key)) {
			      return key.get(this, key);
			    }

			    var resolver = this._resolvers.get(key);

			    if (resolver === undefined) {
			      if (this.parent === null) {
			        return this.autoRegister(key).get(this, key);
			      }

			      var _registration2 = aureliaMetadata.metadata.get(aureliaMetadata.metadata.registration, key);

			      if (_registration2 === undefined) {
			        return this.parent._get(key);
			      }

			      return _registration2.registerResolver(this, key, key).get(this, key);
			    }

			    return resolver.get(this, key);
			  };

			  Container.prototype._get = function _get(key) {
			    var resolver = this._resolvers.get(key);

			    if (resolver === undefined) {
			      if (this.parent === null) {
			        return this.autoRegister(key).get(this, key);
			      }

			      return this.parent._get(key);
			    }

			    return resolver.get(this, key);
			  };

			  Container.prototype.getAll = function getAll(key) {
			    validateKey(key);

			    var resolver = this._resolvers.get(key);

			    if (resolver === undefined) {
			      if (this.parent === null) {
			        return _emptyParameters;
			      }

			      return this.parent.getAll(key);
			    }

			    if (resolver.strategy === 4) {
			      var state = resolver.state;
			      var i = state.length;
			      var results = new Array(i);

			      while (i--) {
			        results[i] = state[i].get(this, key);
			      }

			      return results;
			    }

			    return [resolver.get(this, key)];
			  };

			  Container.prototype.createChild = function createChild() {
			    var child = new Container(this._configuration);
			    child.root = this.root;
			    child.parent = this;
			    return child;
			  };

			  Container.prototype.invoke = function invoke(fn, dynamicDependencies) {
			    try {
			      var _handler = this._handlers.get(fn);

			      if (_handler === undefined) {
			        _handler = this._createInvocationHandler(fn);
			        this._handlers.set(fn, _handler);
			      }

			      return _handler.invoke(this, dynamicDependencies);
			    } catch (e) {
			      throw new aureliaPal.AggregateError('Error invoking ' + fn.name + '. Check the inner error for details.', e, true);
			    }
			  };

			  Container.prototype._createInvocationHandler = function _createInvocationHandler(fn) {
			    var dependencies = void 0;

			    if (fn.inject === undefined) {
			      dependencies = aureliaMetadata.metadata.getOwn(aureliaMetadata.metadata.paramTypes, fn) || _emptyParameters;
			    } else {
			      dependencies = [];
			      var ctor = fn;
			      while (typeof ctor === 'function') {
			        var _dependencies;

			        (_dependencies = dependencies).push.apply(_dependencies, getDependencies(ctor));
			        ctor = Object.getPrototypeOf(ctor);
			      }
			    }

			    var invoker = aureliaMetadata.metadata.getOwn(aureliaMetadata.metadata.invoker, fn) || classInvokers[dependencies.length] || classInvokers.fallback;

			    var handler = new InvocationHandler(fn, invoker, dependencies);
			    return this._onHandlerCreated !== undefined ? this._onHandlerCreated(handler) : handler;
			  };

			  return Container;
			}();

			function autoinject(potentialTarget) {
			  var deco = function deco(target) {
			    var previousInject = target.inject ? target.inject.slice() : null;
			    var autoInject = aureliaMetadata.metadata.getOwn(aureliaMetadata.metadata.paramTypes, target) || _emptyParameters;
			    if (!previousInject) {
			      target.inject = autoInject;
			    } else {
			      for (var i = 0; i < autoInject.length; i++) {
			        if (previousInject[i] && previousInject[i] !== autoInject[i]) {
			          var prevIndex = previousInject.indexOf(autoInject[i]);
			          if (prevIndex > -1) {
			            previousInject.splice(prevIndex, 1);
			          }
			          previousInject.splice(prevIndex > -1 && prevIndex < i ? i - 1 : i, 0, autoInject[i]);
			        } else if (!previousInject[i]) {
			          previousInject[i] = autoInject[i];
			        }
			      }
			      target.inject = previousInject;
			    }
			  };

			  return potentialTarget ? deco(potentialTarget) : deco;
			}

			function inject() {
			  for (var _len5 = arguments.length, rest = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
			    rest[_key5] = arguments[_key5];
			  }

			  return function (target, key, descriptor) {
			    if (typeof descriptor === 'number' && rest.length === 1) {
			      var params = target.inject;
			      if (typeof params === 'function') {
			        throw new Error('Decorator inject cannot be used with "inject()".  Please use an array instead.');
			      }
			      if (!params) {
			        params = aureliaMetadata.metadata.getOwn(aureliaMetadata.metadata.paramTypes, target).slice();
			        target.inject = params;
			      }
			      params[descriptor] = rest[0];
			      return;
			    }

			    if (descriptor) {
			      var _fn = descriptor.value;
			      _fn.inject = rest;
			    } else {
			      target.inject = rest;
			    }
			  };
			}
			});

			unwrapExports(aureliaDependencyInjection);
			var aureliaDependencyInjection_1 = aureliaDependencyInjection.Container;
			var aureliaDependencyInjection_2 = aureliaDependencyInjection.InvocationHandler;
			var aureliaDependencyInjection_3 = aureliaDependencyInjection._emptyParameters;
			var aureliaDependencyInjection_4 = aureliaDependencyInjection.SingletonRegistration;
			var aureliaDependencyInjection_5 = aureliaDependencyInjection.TransientRegistration;
			var aureliaDependencyInjection_6 = aureliaDependencyInjection.FactoryInvoker;
			var aureliaDependencyInjection_7 = aureliaDependencyInjection.NewInstance;
			var aureliaDependencyInjection_8 = aureliaDependencyInjection.Factory;
			var aureliaDependencyInjection_9 = aureliaDependencyInjection.StrategyResolver;
			var aureliaDependencyInjection_10 = aureliaDependencyInjection.Parent;
			var aureliaDependencyInjection_11 = aureliaDependencyInjection.Optional;
			var aureliaDependencyInjection_12 = aureliaDependencyInjection.All;
			var aureliaDependencyInjection_13 = aureliaDependencyInjection.Lazy;
			var aureliaDependencyInjection_14 = aureliaDependencyInjection.resolver;
			var aureliaDependencyInjection_15 = aureliaDependencyInjection.getDecoratorDependencies;
			var aureliaDependencyInjection_16 = aureliaDependencyInjection.lazy;
			var aureliaDependencyInjection_17 = aureliaDependencyInjection.all;
			var aureliaDependencyInjection_18 = aureliaDependencyInjection.optional;
			var aureliaDependencyInjection_19 = aureliaDependencyInjection.parent;
			var aureliaDependencyInjection_20 = aureliaDependencyInjection.factory;
			var aureliaDependencyInjection_21 = aureliaDependencyInjection.newInstance;
			var aureliaDependencyInjection_22 = aureliaDependencyInjection.invoker;
			var aureliaDependencyInjection_23 = aureliaDependencyInjection.invokeAsFactory;
			var aureliaDependencyInjection_24 = aureliaDependencyInjection.registration;
			var aureliaDependencyInjection_25 = aureliaDependencyInjection.singleton;
			var aureliaDependencyInjection_26 = aureliaDependencyInjection.autoinject;
			var aureliaDependencyInjection_27 = aureliaDependencyInjection.inject;

			var aureliaPath = createCommonjsModule(function (module, exports) {

			Object.defineProperty(exports, "__esModule", {
			  value: true
			});

			var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

			exports.relativeToFile = relativeToFile;
			exports.join = join;
			exports.buildQueryString = buildQueryString;
			exports.parseQueryString = parseQueryString;

			function trimDots(ary) {
			  for (var i = 0; i < ary.length; ++i) {
			    var part = ary[i];
			    if (part === '.') {
			      ary.splice(i, 1);
			      i -= 1;
			    } else if (part === '..') {
			      if (i === 0 || i === 1 && ary[2] === '..' || ary[i - 1] === '..') {
			        continue;
			      } else if (i > 0) {
			        ary.splice(i - 1, 2);
			        i -= 2;
			      }
			    }
			  }
			}

			function relativeToFile(name, file) {
			  var fileParts = file && file.split('/');
			  var nameParts = name.trim().split('/');

			  if (nameParts[0].charAt(0) === '.' && fileParts) {
			    var normalizedBaseParts = fileParts.slice(0, fileParts.length - 1);
			    nameParts.unshift.apply(nameParts, normalizedBaseParts);
			  }

			  trimDots(nameParts);

			  return nameParts.join('/');
			}

			function join(path1, path2) {
			  if (!path1) {
			    return path2;
			  }

			  if (!path2) {
			    return path1;
			  }

			  var schemeMatch = path1.match(/^([^/]*?:)\//);
			  var scheme = schemeMatch && schemeMatch.length > 0 ? schemeMatch[1] : '';
			  path1 = path1.substr(scheme.length);

			  var urlPrefix = void 0;
			  if (path1.indexOf('///') === 0 && scheme === 'file:') {
			    urlPrefix = '///';
			  } else if (path1.indexOf('//') === 0) {
			    urlPrefix = '//';
			  } else if (path1.indexOf('/') === 0) {
			    urlPrefix = '/';
			  } else {
			    urlPrefix = '';
			  }

			  var trailingSlash = path2.slice(-1) === '/' ? '/' : '';

			  var url1 = path1.split('/');
			  var url2 = path2.split('/');
			  var url3 = [];

			  for (var i = 0, ii = url1.length; i < ii; ++i) {
			    if (url1[i] === '..') {
			      url3.pop();
			    } else if (url1[i] === '.' || url1[i] === '') {
			      continue;
			    } else {
			      url3.push(url1[i]);
			    }
			  }

			  for (var _i = 0, _ii = url2.length; _i < _ii; ++_i) {
			    if (url2[_i] === '..') {
			      url3.pop();
			    } else if (url2[_i] === '.' || url2[_i] === '') {
			      continue;
			    } else {
			      url3.push(url2[_i]);
			    }
			  }

			  return scheme + urlPrefix + url3.join('/') + trailingSlash;
			}

			var encode = encodeURIComponent;
			var encodeKey = function encodeKey(k) {
			  return encode(k).replace('%24', '$');
			};

			function buildParam(key, value, traditional) {
			  var result = [];
			  if (value === null || value === undefined) {
			    return result;
			  }
			  if (Array.isArray(value)) {
			    for (var i = 0, l = value.length; i < l; i++) {
			      if (traditional) {
			        result.push(encodeKey(key) + '=' + encode(value[i]));
			      } else {
			        var arrayKey = key + '[' + (_typeof(value[i]) === 'object' && value[i] !== null ? i : '') + ']';
			        result = result.concat(buildParam(arrayKey, value[i]));
			      }
			    }
			  } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !traditional) {
			    for (var propertyName in value) {
			      result = result.concat(buildParam(key + '[' + propertyName + ']', value[propertyName]));
			    }
			  } else {
			    result.push(encodeKey(key) + '=' + encode(value));
			  }
			  return result;
			}

			function buildQueryString(params, traditional) {
			  var pairs = [];
			  var keys = Object.keys(params || {}).sort();
			  for (var i = 0, len = keys.length; i < len; i++) {
			    var key = keys[i];
			    pairs = pairs.concat(buildParam(key, params[key], traditional));
			  }

			  if (pairs.length === 0) {
			    return '';
			  }

			  return pairs.join('&');
			}

			function processScalarParam(existedParam, value) {
			  if (Array.isArray(existedParam)) {
			    existedParam.push(value);
			    return existedParam;
			  }
			  if (existedParam !== undefined) {
			    return [existedParam, value];
			  }

			  return value;
			}

			function parseComplexParam(queryParams, keys, value) {
			  var currentParams = queryParams;
			  var keysLastIndex = keys.length - 1;
			  for (var j = 0; j <= keysLastIndex; j++) {
			    var key = keys[j] === '' ? currentParams.length : keys[j];
			    if (j < keysLastIndex) {
			      var prevValue = !currentParams[key] || _typeof(currentParams[key]) === 'object' ? currentParams[key] : [currentParams[key]];
			      currentParams = currentParams[key] = prevValue || (isNaN(keys[j + 1]) ? {} : []);
			    } else {
			      currentParams = currentParams[key] = value;
			    }
			  }
			}

			function parseQueryString(queryString) {
			  var queryParams = {};
			  if (!queryString || typeof queryString !== 'string') {
			    return queryParams;
			  }

			  var query = queryString;
			  if (query.charAt(0) === '?') {
			    query = query.substr(1);
			  }

			  var pairs = query.replace(/\+/g, ' ').split('&');
			  for (var i = 0; i < pairs.length; i++) {
			    var pair = pairs[i].split('=');
			    var key = decodeURIComponent(pair[0]);
			    if (!key) {
			      continue;
			    }

			    var keys = key.split('][');
			    var keysLastIndex = keys.length - 1;

			    if (/\[/.test(keys[0]) && /\]$/.test(keys[keysLastIndex])) {
			      keys[keysLastIndex] = keys[keysLastIndex].replace(/\]$/, '');
			      keys = keys.shift().split('[').concat(keys);
			      keysLastIndex = keys.length - 1;
			    } else {
			      keysLastIndex = 0;
			    }

			    if (pair.length >= 2) {
			      var value = pair[1] ? decodeURIComponent(pair[1]) : '';
			      if (keysLastIndex) {
			        parseComplexParam(queryParams, keys, value);
			      } else {
			        queryParams[key] = processScalarParam(queryParams[key], value);
			      }
			    } else {
			      queryParams[key] = true;
			    }
			  }
			  return queryParams;
			}
			});

			unwrapExports(aureliaPath);
			var aureliaPath_1 = aureliaPath.relativeToFile;
			var aureliaPath_2 = aureliaPath.join;
			var aureliaPath_3 = aureliaPath.buildQueryString;
			var aureliaPath_4 = aureliaPath.parseQueryString;

			var aureliaLoader = createCommonjsModule(function (module, exports) {

			Object.defineProperty(exports, "__esModule", {
			  value: true
			});
			exports.Loader = exports.TemplateRegistryEntry = exports.TemplateDependency = undefined;

			var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();







			var TemplateDependency = exports.TemplateDependency = function TemplateDependency(src, name) {
			  

			  this.src = src;
			  this.name = name;
			};

			var TemplateRegistryEntry = exports.TemplateRegistryEntry = function () {
			  function TemplateRegistryEntry(address) {
			    

			    this.templateIsLoaded = false;
			    this.factoryIsReady = false;
			    this.resources = null;
			    this.dependencies = null;

			    this.address = address;
			    this.onReady = null;
			    this._template = null;
			    this._factory = null;
			  }

			  TemplateRegistryEntry.prototype.addDependency = function addDependency(src, name) {
			    var finalSrc = typeof src === 'string' ? (0, aureliaPath.relativeToFile)(src, this.address) : aureliaMetadata.Origin.get(src).moduleId;

			    this.dependencies.push(new TemplateDependency(finalSrc, name));
			  };

			  _createClass(TemplateRegistryEntry, [{
			    key: 'template',
			    get: function get() {
			      return this._template;
			    },
			    set: function set(value) {
			      var address = this.address;
			      var requires = void 0;
			      var current = void 0;
			      var src = void 0;
			      var dependencies = void 0;

			      this._template = value;
			      this.templateIsLoaded = true;

			      requires = value.content.querySelectorAll('require');
			      dependencies = this.dependencies = new Array(requires.length);

			      for (var i = 0, ii = requires.length; i < ii; ++i) {
			        current = requires[i];
			        src = current.getAttribute('from');

			        if (!src) {
			          throw new Error('<require> element in ' + address + ' has no "from" attribute.');
			        }

			        dependencies[i] = new TemplateDependency((0, aureliaPath.relativeToFile)(src, address), current.getAttribute('as'));

			        if (current.parentNode) {
			          current.parentNode.removeChild(current);
			        }
			      }
			    }
			  }, {
			    key: 'factory',
			    get: function get() {
			      return this._factory;
			    },
			    set: function set(value) {
			      this._factory = value;
			      this.factoryIsReady = true;
			    }
			  }]);

			  return TemplateRegistryEntry;
			}();

			var Loader = exports.Loader = function () {
			  function Loader() {
			    

			    this.templateRegistry = {};
			  }

			  Loader.prototype.map = function map(id, source) {
			    throw new Error('Loaders must implement map(id, source).');
			  };

			  Loader.prototype.normalizeSync = function normalizeSync(moduleId, relativeTo) {
			    throw new Error('Loaders must implement normalizeSync(moduleId, relativeTo).');
			  };

			  Loader.prototype.normalize = function normalize(moduleId, relativeTo) {
			    throw new Error('Loaders must implement normalize(moduleId: string, relativeTo: string): Promise<string>.');
			  };

			  Loader.prototype.loadModule = function loadModule(id) {
			    throw new Error('Loaders must implement loadModule(id).');
			  };

			  Loader.prototype.loadAllModules = function loadAllModules(ids) {
			    throw new Error('Loader must implement loadAllModules(ids).');
			  };

			  Loader.prototype.loadTemplate = function loadTemplate(url) {
			    throw new Error('Loader must implement loadTemplate(url).');
			  };

			  Loader.prototype.loadText = function loadText(url) {
			    throw new Error('Loader must implement loadText(url).');
			  };

			  Loader.prototype.applyPluginToUrl = function applyPluginToUrl(url, pluginName) {
			    throw new Error('Loader must implement applyPluginToUrl(url, pluginName).');
			  };

			  Loader.prototype.addPlugin = function addPlugin(pluginName, implementation) {
			    throw new Error('Loader must implement addPlugin(pluginName, implementation).');
			  };

			  Loader.prototype.getOrCreateTemplateRegistryEntry = function getOrCreateTemplateRegistryEntry(address) {
			    return this.templateRegistry[address] || (this.templateRegistry[address] = new TemplateRegistryEntry(address));
			  };

			  return Loader;
			}();
			});

			unwrapExports(aureliaLoader);
			var aureliaLoader_1 = aureliaLoader.Loader;
			var aureliaLoader_2 = aureliaLoader.TemplateRegistryEntry;
			var aureliaLoader_3 = aureliaLoader.TemplateDependency;

			var aureliaTemplating = createCommonjsModule(function (module, exports) {

			Object.defineProperty(exports, "__esModule", {
			  value: true
			});
			exports.TemplatingEngine = exports.ElementConfigResource = exports.CompositionEngine = exports.SwapStrategies = exports.HtmlBehaviorResource = exports.BindableProperty = exports.BehaviorPropertyObserver = exports.Controller = exports.ViewEngine = exports.ModuleAnalyzer = exports.ResourceDescription = exports.ResourceModule = exports.ViewCompiler = exports.ViewFactory = exports.BoundViewFactory = exports.ViewSlot = exports.View = exports.ViewResources = exports.ShadowDOM = exports.ShadowSlot = exports.PassThroughSlot = exports.SlotCustomAttribute = exports.BindingLanguage = exports.ViewLocator = exports.InlineViewStrategy = exports.TemplateRegistryViewStrategy = exports.NoViewStrategy = exports.ConventionalViewStrategy = exports.RelativeViewStrategy = exports.viewStrategy = exports.TargetInstruction = exports.BehaviorInstruction = exports.ViewCompileInstruction = exports.ResourceLoadContext = exports.ElementEvents = exports.ViewEngineHooksResource = exports.CompositionTransaction = exports.CompositionTransactionOwnershipToken = exports.CompositionTransactionNotifier = exports.Animator = exports.animationEvent = undefined;

			var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

			var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

			var _class, _temp, _dec, _class2, _dec2, _class3, _dec3, _class4, _dec4, _class5, _dec5, _class6, _class7, _temp2, _dec6, _class8, _class9, _temp3, _class11, _dec7, _class13, _dec8, _class14, _class15, _temp4, _dec9, _class16, _dec10, _class17, _dec11, _class18;

			exports._hyphenate = _hyphenate;
			exports._isAllWhitespace = _isAllWhitespace;
			exports.viewEngineHooks = viewEngineHooks;
			exports.children = children;
			exports.child = child;
			exports.resource = resource;
			exports.behavior = behavior;
			exports.customElement = customElement;
			exports.customAttribute = customAttribute;
			exports.templateController = templateController;
			exports.bindable = bindable;
			exports.dynamicOptions = dynamicOptions;
			exports.useShadowDOM = useShadowDOM;
			exports.processAttributes = processAttributes;
			exports.processContent = processContent;
			exports.containerless = containerless;
			exports.useViewStrategy = useViewStrategy;
			exports.useView = useView;
			exports.inlineView = inlineView;
			exports.noView = noView;
			exports.elementConfig = elementConfig;
			exports.viewResources = viewResources;



			var LogManager = _interopRequireWildcard(aureliaLogging);















			function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }



			var animationEvent = exports.animationEvent = {
			  enterBegin: 'animation:enter:begin',
			  enterActive: 'animation:enter:active',
			  enterDone: 'animation:enter:done',
			  enterTimeout: 'animation:enter:timeout',

			  leaveBegin: 'animation:leave:begin',
			  leaveActive: 'animation:leave:active',
			  leaveDone: 'animation:leave:done',
			  leaveTimeout: 'animation:leave:timeout',

			  staggerNext: 'animation:stagger:next',

			  removeClassBegin: 'animation:remove-class:begin',
			  removeClassActive: 'animation:remove-class:active',
			  removeClassDone: 'animation:remove-class:done',
			  removeClassTimeout: 'animation:remove-class:timeout',

			  addClassBegin: 'animation:add-class:begin',
			  addClassActive: 'animation:add-class:active',
			  addClassDone: 'animation:add-class:done',
			  addClassTimeout: 'animation:add-class:timeout',

			  animateBegin: 'animation:animate:begin',
			  animateActive: 'animation:animate:active',
			  animateDone: 'animation:animate:done',
			  animateTimeout: 'animation:animate:timeout',

			  sequenceBegin: 'animation:sequence:begin',
			  sequenceDone: 'animation:sequence:done'
			};

			var Animator = exports.Animator = function () {
			  function Animator() {
			    
			  }

			  Animator.prototype.enter = function enter(element) {
			    return Promise.resolve(false);
			  };

			  Animator.prototype.leave = function leave(element) {
			    return Promise.resolve(false);
			  };

			  Animator.prototype.removeClass = function removeClass(element, className) {
			    element.classList.remove(className);
			    return Promise.resolve(false);
			  };

			  Animator.prototype.addClass = function addClass(element, className) {
			    element.classList.add(className);
			    return Promise.resolve(false);
			  };

			  Animator.prototype.animate = function animate(element, className) {
			    return Promise.resolve(false);
			  };

			  Animator.prototype.runSequence = function runSequence(animations) {};

			  Animator.prototype.registerEffect = function registerEffect(effectName, properties) {};

			  Animator.prototype.unregisterEffect = function unregisterEffect(effectName) {};

			  return Animator;
			}();

			var CompositionTransactionNotifier = exports.CompositionTransactionNotifier = function () {
			  function CompositionTransactionNotifier(owner) {
			    

			    this.owner = owner;
			    this.owner._compositionCount++;
			  }

			  CompositionTransactionNotifier.prototype.done = function done() {
			    this.owner._compositionCount--;
			    this.owner._tryCompleteTransaction();
			  };

			  return CompositionTransactionNotifier;
			}();

			var CompositionTransactionOwnershipToken = exports.CompositionTransactionOwnershipToken = function () {
			  function CompositionTransactionOwnershipToken(owner) {
			    

			    this.owner = owner;
			    this.owner._ownershipToken = this;
			    this.thenable = this._createThenable();
			  }

			  CompositionTransactionOwnershipToken.prototype.waitForCompositionComplete = function waitForCompositionComplete() {
			    this.owner._tryCompleteTransaction();
			    return this.thenable;
			  };

			  CompositionTransactionOwnershipToken.prototype.resolve = function resolve() {
			    this._resolveCallback();
			  };

			  CompositionTransactionOwnershipToken.prototype._createThenable = function _createThenable() {
			    var _this = this;

			    return new Promise(function (resolve, reject) {
			      _this._resolveCallback = resolve;
			    });
			  };

			  return CompositionTransactionOwnershipToken;
			}();

			var CompositionTransaction = exports.CompositionTransaction = function () {
			  function CompositionTransaction() {
			    

			    this._ownershipToken = null;
			    this._compositionCount = 0;
			  }

			  CompositionTransaction.prototype.tryCapture = function tryCapture() {
			    return this._ownershipToken === null ? new CompositionTransactionOwnershipToken(this) : null;
			  };

			  CompositionTransaction.prototype.enlist = function enlist() {
			    return new CompositionTransactionNotifier(this);
			  };

			  CompositionTransaction.prototype._tryCompleteTransaction = function _tryCompleteTransaction() {
			    if (this._compositionCount <= 0) {
			      this._compositionCount = 0;

			      if (this._ownershipToken !== null) {
			        var token = this._ownershipToken;
			        this._ownershipToken = null;
			        token.resolve();
			      }
			    }
			  };

			  return CompositionTransaction;
			}();

			var capitalMatcher = /([A-Z])/g;

			function addHyphenAndLower(char) {
			  return '-' + char.toLowerCase();
			}

			function _hyphenate(name) {
			  return (name.charAt(0).toLowerCase() + name.slice(1)).replace(capitalMatcher, addHyphenAndLower);
			}

			function _isAllWhitespace(node) {
			  return !(node.auInterpolationTarget || /[^\t\n\r ]/.test(node.textContent));
			}

			var ViewEngineHooksResource = exports.ViewEngineHooksResource = function () {
			  function ViewEngineHooksResource() {
			    
			  }

			  ViewEngineHooksResource.prototype.initialize = function initialize(container, target) {
			    this.instance = container.get(target);
			  };

			  ViewEngineHooksResource.prototype.register = function register(registry, name) {
			    registry.registerViewEngineHooks(this.instance);
			  };

			  ViewEngineHooksResource.prototype.load = function load(container, target) {};

			  ViewEngineHooksResource.convention = function convention(name) {
			    if (name.endsWith('ViewEngineHooks')) {
			      return new ViewEngineHooksResource();
			    }
			  };

			  return ViewEngineHooksResource;
			}();

			function viewEngineHooks(target) {
			  var deco = function deco(t) {
			    aureliaMetadata.metadata.define(aureliaMetadata.metadata.resource, new ViewEngineHooksResource(), t);
			  };

			  return target ? deco(target) : deco;
			}

			var ElementEvents = exports.ElementEvents = function () {
			  function ElementEvents(element) {
			    

			    this.element = element;
			    this.subscriptions = {};
			  }

			  ElementEvents.prototype._enqueueHandler = function _enqueueHandler(handler) {
			    this.subscriptions[handler.eventName] = this.subscriptions[handler.eventName] || [];
			    this.subscriptions[handler.eventName].push(handler);
			  };

			  ElementEvents.prototype._dequeueHandler = function _dequeueHandler(handler) {
			    var index = void 0;
			    var subscriptions = this.subscriptions[handler.eventName];
			    if (subscriptions) {
			      index = subscriptions.indexOf(handler);
			      if (index > -1) {
			        subscriptions.splice(index, 1);
			      }
			    }
			    return handler;
			  };

			  ElementEvents.prototype.publish = function publish(eventName) {
			    var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			    var bubbles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
			    var cancelable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

			    var event = aureliaPal.DOM.createCustomEvent(eventName, { cancelable: cancelable, bubbles: bubbles, detail: detail });
			    this.element.dispatchEvent(event);
			  };

			  ElementEvents.prototype.subscribe = function subscribe(eventName, handler) {
			    var captureOrOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

			    if (typeof handler === 'function') {
			      var eventHandler = new EventHandlerImpl(this, eventName, handler, captureOrOptions, false);
			      return eventHandler;
			    }

			    return undefined;
			  };

			  ElementEvents.prototype.subscribeOnce = function subscribeOnce(eventName, handler) {
			    var captureOrOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

			    if (typeof handler === 'function') {
			      var eventHandler = new EventHandlerImpl(this, eventName, handler, captureOrOptions, true);
			      return eventHandler;
			    }

			    return undefined;
			  };

			  ElementEvents.prototype.dispose = function dispose(eventName) {
			    if (eventName && typeof eventName === 'string') {
			      var subscriptions = this.subscriptions[eventName];
			      if (subscriptions) {
			        while (subscriptions.length) {
			          var subscription = subscriptions.pop();
			          if (subscription) {
			            subscription.dispose();
			          }
			        }
			      }
			    } else {
			      this.disposeAll();
			    }
			  };

			  ElementEvents.prototype.disposeAll = function disposeAll() {
			    for (var key in this.subscriptions) {
			      this.dispose(key);
			    }
			  };

			  return ElementEvents;
			}();

			var EventHandlerImpl = function () {
			  function EventHandlerImpl(owner, eventName, handler, captureOrOptions, once) {
			    

			    this.owner = owner;
			    this.eventName = eventName;
			    this.handler = handler;

			    this.capture = typeof captureOrOptions === 'boolean' ? captureOrOptions : captureOrOptions.capture;
			    this.bubbles = !this.capture;
			    this.captureOrOptions = captureOrOptions;
			    this.once = once;
			    owner.element.addEventListener(eventName, this, captureOrOptions);
			    owner._enqueueHandler(this);
			  }

			  EventHandlerImpl.prototype.handleEvent = function handleEvent(e) {
			    var fn = this.handler;
			    fn(e);
			    if (this.once) {
			      this.dispose();
			    }
			  };

			  EventHandlerImpl.prototype.dispose = function dispose() {
			    this.owner.element.removeEventListener(this.eventName, this, this.captureOrOptions);
			    this.owner._dequeueHandler(this);
			    this.owner = this.handler = null;
			  };

			  return EventHandlerImpl;
			}();

			var ResourceLoadContext = exports.ResourceLoadContext = function () {
			  function ResourceLoadContext() {
			    

			    this.dependencies = {};
			  }

			  ResourceLoadContext.prototype.addDependency = function addDependency(url) {
			    this.dependencies[url] = true;
			  };

			  ResourceLoadContext.prototype.hasDependency = function hasDependency(url) {
			    return url in this.dependencies;
			  };

			  return ResourceLoadContext;
			}();

			var ViewCompileInstruction = exports.ViewCompileInstruction = function ViewCompileInstruction() {
			  var targetShadowDOM = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
			  var compileSurrogate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			  

			  this.targetShadowDOM = targetShadowDOM;
			  this.compileSurrogate = compileSurrogate;
			  this.associatedModuleId = null;
			};

			ViewCompileInstruction.normal = new ViewCompileInstruction();

			var BehaviorInstruction = exports.BehaviorInstruction = function () {
			  BehaviorInstruction.enhance = function enhance() {
			    var instruction = new BehaviorInstruction();
			    instruction.enhance = true;
			    return instruction;
			  };

			  BehaviorInstruction.unitTest = function unitTest(type, attributes) {
			    var instruction = new BehaviorInstruction();
			    instruction.type = type;
			    instruction.attributes = attributes || {};
			    return instruction;
			  };

			  BehaviorInstruction.element = function element(node, type) {
			    var instruction = new BehaviorInstruction();
			    instruction.type = type;
			    instruction.attributes = {};
			    instruction.anchorIsContainer = !(node.hasAttribute('containerless') || type.containerless);
			    instruction.initiatedByBehavior = true;
			    return instruction;
			  };

			  BehaviorInstruction.attribute = function attribute(attrName, type) {
			    var instruction = new BehaviorInstruction();
			    instruction.attrName = attrName;
			    instruction.type = type || null;
			    instruction.attributes = {};
			    return instruction;
			  };

			  BehaviorInstruction.dynamic = function dynamic(host, viewModel, viewFactory) {
			    var instruction = new BehaviorInstruction();
			    instruction.host = host;
			    instruction.viewModel = viewModel;
			    instruction.viewFactory = viewFactory;
			    instruction.inheritBindingContext = true;
			    return instruction;
			  };

			  function BehaviorInstruction() {
			    

			    this.initiatedByBehavior = false;
			    this.enhance = false;
			    this.partReplacements = null;
			    this.viewFactory = null;
			    this.originalAttrName = null;
			    this.skipContentProcessing = false;
			    this.contentFactory = null;
			    this.viewModel = null;
			    this.anchorIsContainer = false;
			    this.host = null;
			    this.attributes = null;
			    this.type = null;
			    this.attrName = null;
			    this.inheritBindingContext = false;
			  }

			  return BehaviorInstruction;
			}();

			BehaviorInstruction.normal = new BehaviorInstruction();

			var TargetInstruction = exports.TargetInstruction = (_temp = _class = function () {
			  TargetInstruction.shadowSlot = function shadowSlot(parentInjectorId) {
			    var instruction = new TargetInstruction();
			    instruction.parentInjectorId = parentInjectorId;
			    instruction.shadowSlot = true;
			    return instruction;
			  };

			  TargetInstruction.contentExpression = function contentExpression(expression) {
			    var instruction = new TargetInstruction();
			    instruction.contentExpression = expression;
			    return instruction;
			  };

			  TargetInstruction.lifting = function lifting(parentInjectorId, liftingInstruction) {
			    var instruction = new TargetInstruction();
			    instruction.parentInjectorId = parentInjectorId;
			    instruction.expressions = TargetInstruction.noExpressions;
			    instruction.behaviorInstructions = [liftingInstruction];
			    instruction.viewFactory = liftingInstruction.viewFactory;
			    instruction.providers = [liftingInstruction.type.target];
			    instruction.lifting = true;
			    return instruction;
			  };

			  TargetInstruction.normal = function normal(injectorId, parentInjectorId, providers, behaviorInstructions, expressions, elementInstruction) {
			    var instruction = new TargetInstruction();
			    instruction.injectorId = injectorId;
			    instruction.parentInjectorId = parentInjectorId;
			    instruction.providers = providers;
			    instruction.behaviorInstructions = behaviorInstructions;
			    instruction.expressions = expressions;
			    instruction.anchorIsContainer = elementInstruction ? elementInstruction.anchorIsContainer : true;
			    instruction.elementInstruction = elementInstruction;
			    return instruction;
			  };

			  TargetInstruction.surrogate = function surrogate(providers, behaviorInstructions, expressions, values) {
			    var instruction = new TargetInstruction();
			    instruction.expressions = expressions;
			    instruction.behaviorInstructions = behaviorInstructions;
			    instruction.providers = providers;
			    instruction.values = values;
			    return instruction;
			  };

			  function TargetInstruction() {
			    

			    this.injectorId = null;
			    this.parentInjectorId = null;

			    this.shadowSlot = false;
			    this.slotName = null;
			    this.slotFallbackFactory = null;

			    this.contentExpression = null;

			    this.expressions = null;
			    this.behaviorInstructions = null;
			    this.providers = null;

			    this.viewFactory = null;

			    this.anchorIsContainer = false;
			    this.elementInstruction = null;
			    this.lifting = false;

			    this.values = null;
			  }

			  return TargetInstruction;
			}(), _class.noExpressions = Object.freeze([]), _temp);
			var viewStrategy = exports.viewStrategy = aureliaMetadata.protocol.create('aurelia:view-strategy', {
			  validate: function validate(target) {
			    if (!(typeof target.loadViewFactory === 'function')) {
			      return 'View strategies must implement: loadViewFactory(viewEngine: ViewEngine, compileInstruction: ViewCompileInstruction, loadContext?: ResourceLoadContext): Promise<ViewFactory>';
			    }

			    return true;
			  },
			  compose: function compose(target) {
			    if (!(typeof target.makeRelativeTo === 'function')) {
			      target.makeRelativeTo = aureliaPal.PLATFORM.noop;
			    }
			  }
			});

			var RelativeViewStrategy = exports.RelativeViewStrategy = (_dec = viewStrategy(), _dec(_class2 = function () {
			  function RelativeViewStrategy(path) {
			    

			    this.path = path;
			    this.absolutePath = null;
			  }

			  RelativeViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext, target) {
			    if (this.absolutePath === null && this.moduleId) {
			      this.absolutePath = (0, aureliaPath.relativeToFile)(this.path, this.moduleId);
			    }

			    compileInstruction.associatedModuleId = this.moduleId;
			    return viewEngine.loadViewFactory(this.absolutePath || this.path, compileInstruction, loadContext, target);
			  };

			  RelativeViewStrategy.prototype.makeRelativeTo = function makeRelativeTo(file) {
			    if (this.absolutePath === null) {
			      this.absolutePath = (0, aureliaPath.relativeToFile)(this.path, file);
			    }
			  };

			  return RelativeViewStrategy;
			}()) || _class2);
			var ConventionalViewStrategy = exports.ConventionalViewStrategy = (_dec2 = viewStrategy(), _dec2(_class3 = function () {
			  function ConventionalViewStrategy(viewLocator, origin) {
			    

			    this.moduleId = origin.moduleId;
			    this.viewUrl = viewLocator.convertOriginToViewUrl(origin);
			  }

			  ConventionalViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext, target) {
			    compileInstruction.associatedModuleId = this.moduleId;
			    return viewEngine.loadViewFactory(this.viewUrl, compileInstruction, loadContext, target);
			  };

			  return ConventionalViewStrategy;
			}()) || _class3);
			var NoViewStrategy = exports.NoViewStrategy = (_dec3 = viewStrategy(), _dec3(_class4 = function () {
			  function NoViewStrategy(dependencies, dependencyBaseUrl) {
			    

			    this.dependencies = dependencies || null;
			    this.dependencyBaseUrl = dependencyBaseUrl || '';
			  }

			  NoViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext, target) {
			    var entry = this.entry;
			    var dependencies = this.dependencies;

			    if (entry && entry.factoryIsReady) {
			      return Promise.resolve(null);
			    }

			    this.entry = entry = new aureliaLoader.TemplateRegistryEntry(this.moduleId || this.dependencyBaseUrl);

			    entry.dependencies = [];
			    entry.templateIsLoaded = true;

			    if (dependencies !== null) {
			      for (var i = 0, ii = dependencies.length; i < ii; ++i) {
			        var current = dependencies[i];

			        if (typeof current === 'string' || typeof current === 'function') {
			          entry.addDependency(current);
			        } else {
			          entry.addDependency(current.from, current.as);
			        }
			      }
			    }

			    compileInstruction.associatedModuleId = this.moduleId;

			    return viewEngine.loadViewFactory(entry, compileInstruction, loadContext, target);
			  };

			  return NoViewStrategy;
			}()) || _class4);
			var TemplateRegistryViewStrategy = exports.TemplateRegistryViewStrategy = (_dec4 = viewStrategy(), _dec4(_class5 = function () {
			  function TemplateRegistryViewStrategy(moduleId, entry) {
			    

			    this.moduleId = moduleId;
			    this.entry = entry;
			  }

			  TemplateRegistryViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext, target) {
			    var entry = this.entry;

			    if (entry.factoryIsReady) {
			      return Promise.resolve(entry.factory);
			    }

			    compileInstruction.associatedModuleId = this.moduleId;
			    return viewEngine.loadViewFactory(entry, compileInstruction, loadContext, target);
			  };

			  return TemplateRegistryViewStrategy;
			}()) || _class5);
			var InlineViewStrategy = exports.InlineViewStrategy = (_dec5 = viewStrategy(), _dec5(_class6 = function () {
			  function InlineViewStrategy(markup, dependencies, dependencyBaseUrl) {
			    

			    this.markup = markup;
			    this.dependencies = dependencies || null;
			    this.dependencyBaseUrl = dependencyBaseUrl || '';
			  }

			  InlineViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext, target) {
			    var entry = this.entry;
			    var dependencies = this.dependencies;

			    if (entry && entry.factoryIsReady) {
			      return Promise.resolve(entry.factory);
			    }

			    this.entry = entry = new aureliaLoader.TemplateRegistryEntry(this.moduleId || this.dependencyBaseUrl);
			    entry.template = aureliaPal.DOM.createTemplateFromMarkup(this.markup);

			    if (dependencies !== null) {
			      for (var i = 0, ii = dependencies.length; i < ii; ++i) {
			        var current = dependencies[i];

			        if (typeof current === 'string' || typeof current === 'function') {
			          entry.addDependency(current);
			        } else {
			          entry.addDependency(current.from, current.as);
			        }
			      }
			    }

			    compileInstruction.associatedModuleId = this.moduleId;
			    return viewEngine.loadViewFactory(entry, compileInstruction, loadContext, target);
			  };

			  return InlineViewStrategy;
			}()) || _class6);
			var ViewLocator = exports.ViewLocator = (_temp2 = _class7 = function () {
			  function ViewLocator() {
			    
			  }

			  ViewLocator.prototype.getViewStrategy = function getViewStrategy(value) {
			    if (!value) {
			      return null;
			    }

			    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && 'getViewStrategy' in value) {
			      var _origin = aureliaMetadata.Origin.get(value.constructor);

			      value = value.getViewStrategy();

			      if (typeof value === 'string') {
			        value = new RelativeViewStrategy(value);
			      }

			      viewStrategy.assert(value);

			      if (_origin.moduleId) {
			        value.makeRelativeTo(_origin.moduleId);
			      }

			      return value;
			    }

			    if (typeof value === 'string') {
			      value = new RelativeViewStrategy(value);
			    }

			    if (viewStrategy.validate(value)) {
			      return value;
			    }

			    if (typeof value !== 'function') {
			      value = value.constructor;
			    }

			    var origin = aureliaMetadata.Origin.get(value);
			    var strategy = aureliaMetadata.metadata.get(ViewLocator.viewStrategyMetadataKey, value);

			    if (!strategy) {
			      if (!origin.moduleId) {
			        throw new Error('Cannot determine default view strategy for object.', value);
			      }

			      strategy = this.createFallbackViewStrategy(origin);
			    } else if (origin.moduleId) {
			      strategy.moduleId = origin.moduleId;
			    }

			    return strategy;
			  };

			  ViewLocator.prototype.createFallbackViewStrategy = function createFallbackViewStrategy(origin) {
			    return new ConventionalViewStrategy(this, origin);
			  };

			  ViewLocator.prototype.convertOriginToViewUrl = function convertOriginToViewUrl(origin) {
			    var moduleId = origin.moduleId;
			    var id = moduleId.endsWith('.js') || moduleId.endsWith('.ts') ? moduleId.substring(0, moduleId.length - 3) : moduleId;
			    return id + '.html';
			  };

			  return ViewLocator;
			}(), _class7.viewStrategyMetadataKey = 'aurelia:view-strategy', _temp2);


			function mi(name) {
			  throw new Error('BindingLanguage must implement ' + name + '().');
			}

			var BindingLanguage = exports.BindingLanguage = function () {
			  function BindingLanguage() {
			    
			  }

			  BindingLanguage.prototype.inspectAttribute = function inspectAttribute(resources, elementName, attrName, attrValue) {
			    mi('inspectAttribute');
			  };

			  BindingLanguage.prototype.createAttributeInstruction = function createAttributeInstruction(resources, element, info, existingInstruction) {
			    mi('createAttributeInstruction');
			  };

			  BindingLanguage.prototype.inspectTextContent = function inspectTextContent(resources, value) {
			    mi('inspectTextContent');
			  };

			  return BindingLanguage;
			}();

			var noNodes = Object.freeze([]);

			var SlotCustomAttribute = exports.SlotCustomAttribute = (_dec6 = (0, aureliaDependencyInjection.inject)(aureliaPal.DOM.Element), _dec6(_class8 = function () {
			  function SlotCustomAttribute(element) {
			    

			    this.element = element;
			    this.element.auSlotAttribute = this;
			  }

			  SlotCustomAttribute.prototype.valueChanged = function valueChanged(newValue, oldValue) {};

			  return SlotCustomAttribute;
			}()) || _class8);

			var PassThroughSlot = exports.PassThroughSlot = function () {
			  function PassThroughSlot(anchor, name, destinationName, fallbackFactory) {
			    

			    this.anchor = anchor;
			    this.anchor.viewSlot = this;
			    this.name = name;
			    this.destinationName = destinationName;
			    this.fallbackFactory = fallbackFactory;
			    this.destinationSlot = null;
			    this.projections = 0;
			    this.contentView = null;

			    var attr = new SlotCustomAttribute(this.anchor);
			    attr.value = this.destinationName;
			  }

			  PassThroughSlot.prototype.renderFallbackContent = function renderFallbackContent(view, nodes, projectionSource, index) {
			    if (this.contentView === null) {
			      this.contentView = this.fallbackFactory.create(this.ownerView.container);
			      this.contentView.bind(this.ownerView.bindingContext, this.ownerView.overrideContext);

			      var slots = Object.create(null);
			      slots[this.destinationSlot.name] = this.destinationSlot;

			      ShadowDOM.distributeView(this.contentView, slots, projectionSource, index, this.destinationSlot.name);
			    }
			  };

			  PassThroughSlot.prototype.passThroughTo = function passThroughTo(destinationSlot) {
			    this.destinationSlot = destinationSlot;
			  };

			  PassThroughSlot.prototype.addNode = function addNode(view, node, projectionSource, index) {
			    if (this.contentView !== null) {
			      this.contentView.removeNodes();
			      this.contentView.detached();
			      this.contentView.unbind();
			      this.contentView = null;
			    }

			    if (node.viewSlot instanceof PassThroughSlot) {
			      node.viewSlot.passThroughTo(this);
			      return;
			    }

			    this.projections++;
			    this.destinationSlot.addNode(view, node, projectionSource, index);
			  };

			  PassThroughSlot.prototype.removeView = function removeView(view, projectionSource) {
			    this.projections--;
			    this.destinationSlot.removeView(view, projectionSource);

			    if (this.needsFallbackRendering) {
			      this.renderFallbackContent(null, noNodes, projectionSource);
			    }
			  };

			  PassThroughSlot.prototype.removeAll = function removeAll(projectionSource) {
			    this.projections = 0;
			    this.destinationSlot.removeAll(projectionSource);

			    if (this.needsFallbackRendering) {
			      this.renderFallbackContent(null, noNodes, projectionSource);
			    }
			  };

			  PassThroughSlot.prototype.projectFrom = function projectFrom(view, projectionSource) {
			    this.destinationSlot.projectFrom(view, projectionSource);
			  };

			  PassThroughSlot.prototype.created = function created(ownerView) {
			    this.ownerView = ownerView;
			  };

			  PassThroughSlot.prototype.bind = function bind(view) {
			    if (this.contentView) {
			      this.contentView.bind(view.bindingContext, view.overrideContext);
			    }
			  };

			  PassThroughSlot.prototype.attached = function attached() {
			    if (this.contentView) {
			      this.contentView.attached();
			    }
			  };

			  PassThroughSlot.prototype.detached = function detached() {
			    if (this.contentView) {
			      this.contentView.detached();
			    }
			  };

			  PassThroughSlot.prototype.unbind = function unbind() {
			    if (this.contentView) {
			      this.contentView.unbind();
			    }
			  };

			  _createClass(PassThroughSlot, [{
			    key: 'needsFallbackRendering',
			    get: function get() {
			      return this.fallbackFactory && this.projections === 0;
			    }
			  }]);

			  return PassThroughSlot;
			}();

			var ShadowSlot = exports.ShadowSlot = function () {
			  function ShadowSlot(anchor, name, fallbackFactory) {
			    

			    this.anchor = anchor;
			    this.anchor.isContentProjectionSource = true;
			    this.anchor.viewSlot = this;
			    this.name = name;
			    this.fallbackFactory = fallbackFactory;
			    this.contentView = null;
			    this.projections = 0;
			    this.children = [];
			    this.projectFromAnchors = null;
			    this.destinationSlots = null;
			  }

			  ShadowSlot.prototype.addNode = function addNode(view, node, projectionSource, index, destination) {
			    if (this.contentView !== null) {
			      this.contentView.removeNodes();
			      this.contentView.detached();
			      this.contentView.unbind();
			      this.contentView = null;
			    }

			    if (node.viewSlot instanceof PassThroughSlot) {
			      node.viewSlot.passThroughTo(this);
			      return;
			    }

			    if (this.destinationSlots !== null) {
			      ShadowDOM.distributeNodes(view, [node], this.destinationSlots, this, index);
			    } else {
			      node.auOwnerView = view;
			      node.auProjectionSource = projectionSource;
			      node.auAssignedSlot = this;

			      var anchor = this._findAnchor(view, node, projectionSource, index);
			      var parent = anchor.parentNode;

			      parent.insertBefore(node, anchor);
			      this.children.push(node);
			      this.projections++;
			    }
			  };

			  ShadowSlot.prototype.removeView = function removeView(view, projectionSource) {
			    if (this.destinationSlots !== null) {
			      ShadowDOM.undistributeView(view, this.destinationSlots, this);
			    } else if (this.contentView && this.contentView.hasSlots) {
			      ShadowDOM.undistributeView(view, this.contentView.slots, projectionSource);
			    } else {
			      var found = this.children.find(function (x) {
			        return x.auSlotProjectFrom === projectionSource;
			      });
			      if (found) {
			        var _children = found.auProjectionChildren;

			        for (var i = 0, ii = _children.length; i < ii; ++i) {
			          var _child = _children[i];

			          if (_child.auOwnerView === view) {
			            _children.splice(i, 1);
			            view.fragment.appendChild(_child);
			            i--;ii--;
			            this.projections--;
			          }
			        }

			        if (this.needsFallbackRendering) {
			          this.renderFallbackContent(view, noNodes, projectionSource);
			        }
			      }
			    }
			  };

			  ShadowSlot.prototype.removeAll = function removeAll(projectionSource) {
			    if (this.destinationSlots !== null) {
			      ShadowDOM.undistributeAll(this.destinationSlots, this);
			    } else if (this.contentView && this.contentView.hasSlots) {
			      ShadowDOM.undistributeAll(this.contentView.slots, projectionSource);
			    } else {
			      var found = this.children.find(function (x) {
			        return x.auSlotProjectFrom === projectionSource;
			      });

			      if (found) {
			        var _children2 = found.auProjectionChildren;
			        for (var i = 0, ii = _children2.length; i < ii; ++i) {
			          var _child2 = _children2[i];
			          _child2.auOwnerView.fragment.appendChild(_child2);
			          this.projections--;
			        }

			        found.auProjectionChildren = [];

			        if (this.needsFallbackRendering) {
			          this.renderFallbackContent(null, noNodes, projectionSource);
			        }
			      }
			    }
			  };

			  ShadowSlot.prototype._findAnchor = function _findAnchor(view, node, projectionSource, index) {
			    if (projectionSource) {
			      var found = this.children.find(function (x) {
			        return x.auSlotProjectFrom === projectionSource;
			      });
			      if (found) {
			        if (index !== undefined) {
			          var _children3 = found.auProjectionChildren;
			          var viewIndex = -1;
			          var lastView = void 0;

			          for (var i = 0, ii = _children3.length; i < ii; ++i) {
			            var current = _children3[i];

			            if (current.auOwnerView !== lastView) {
			              viewIndex++;
			              lastView = current.auOwnerView;

			              if (viewIndex >= index && lastView !== view) {
			                _children3.splice(i, 0, node);
			                return current;
			              }
			            }
			          }
			        }

			        found.auProjectionChildren.push(node);
			        return found;
			      }
			    }

			    return this.anchor;
			  };

			  ShadowSlot.prototype.projectTo = function projectTo(slots) {
			    this.destinationSlots = slots;
			  };

			  ShadowSlot.prototype.projectFrom = function projectFrom(view, projectionSource) {
			    var anchor = aureliaPal.DOM.createComment('anchor');
			    var parent = this.anchor.parentNode;
			    anchor.auSlotProjectFrom = projectionSource;
			    anchor.auOwnerView = view;
			    anchor.auProjectionChildren = [];
			    parent.insertBefore(anchor, this.anchor);
			    this.children.push(anchor);

			    if (this.projectFromAnchors === null) {
			      this.projectFromAnchors = [];
			    }

			    this.projectFromAnchors.push(anchor);
			  };

			  ShadowSlot.prototype.renderFallbackContent = function renderFallbackContent(view, nodes, projectionSource, index) {
			    if (this.contentView === null) {
			      this.contentView = this.fallbackFactory.create(this.ownerView.container);
			      this.contentView.bind(this.ownerView.bindingContext, this.ownerView.overrideContext);
			      this.contentView.insertNodesBefore(this.anchor);
			    }

			    if (this.contentView.hasSlots) {
			      var slots = this.contentView.slots;
			      var projectFromAnchors = this.projectFromAnchors;

			      if (projectFromAnchors !== null) {
			        for (var slotName in slots) {
			          var slot = slots[slotName];

			          for (var i = 0, ii = projectFromAnchors.length; i < ii; ++i) {
			            var anchor = projectFromAnchors[i];
			            slot.projectFrom(anchor.auOwnerView, anchor.auSlotProjectFrom);
			          }
			        }
			      }

			      this.fallbackSlots = slots;
			      ShadowDOM.distributeNodes(view, nodes, slots, projectionSource, index);
			    }
			  };

			  ShadowSlot.prototype.created = function created(ownerView) {
			    this.ownerView = ownerView;
			  };

			  ShadowSlot.prototype.bind = function bind(view) {
			    if (this.contentView) {
			      this.contentView.bind(view.bindingContext, view.overrideContext);
			    }
			  };

			  ShadowSlot.prototype.attached = function attached() {
			    if (this.contentView) {
			      this.contentView.attached();
			    }
			  };

			  ShadowSlot.prototype.detached = function detached() {
			    if (this.contentView) {
			      this.contentView.detached();
			    }
			  };

			  ShadowSlot.prototype.unbind = function unbind() {
			    if (this.contentView) {
			      this.contentView.unbind();
			    }
			  };

			  _createClass(ShadowSlot, [{
			    key: 'needsFallbackRendering',
			    get: function get() {
			      return this.fallbackFactory && this.projections === 0;
			    }
			  }]);

			  return ShadowSlot;
			}();

			var ShadowDOM = exports.ShadowDOM = (_temp3 = _class9 = function () {
			  function ShadowDOM() {
			    
			  }

			  ShadowDOM.getSlotName = function getSlotName(node) {
			    if (node.auSlotAttribute === undefined) {
			      return ShadowDOM.defaultSlotKey;
			    }

			    return node.auSlotAttribute.value;
			  };

			  ShadowDOM.distributeView = function distributeView(view, slots, projectionSource, index, destinationOverride) {
			    var nodes = void 0;

			    if (view === null) {
			      nodes = noNodes;
			    } else {
			      var childNodes = view.fragment.childNodes;
			      var ii = childNodes.length;
			      nodes = new Array(ii);

			      for (var i = 0; i < ii; ++i) {
			        nodes[i] = childNodes[i];
			      }
			    }

			    ShadowDOM.distributeNodes(view, nodes, slots, projectionSource, index, destinationOverride);
			  };

			  ShadowDOM.undistributeView = function undistributeView(view, slots, projectionSource) {
			    for (var slotName in slots) {
			      slots[slotName].removeView(view, projectionSource);
			    }
			  };

			  ShadowDOM.undistributeAll = function undistributeAll(slots, projectionSource) {
			    for (var slotName in slots) {
			      slots[slotName].removeAll(projectionSource);
			    }
			  };

			  ShadowDOM.distributeNodes = function distributeNodes(view, nodes, slots, projectionSource, index, destinationOverride) {
			    for (var i = 0, ii = nodes.length; i < ii; ++i) {
			      var currentNode = nodes[i];
			      var nodeType = currentNode.nodeType;

			      if (currentNode.isContentProjectionSource) {
			        currentNode.viewSlot.projectTo(slots);

			        for (var slotName in slots) {
			          slots[slotName].projectFrom(view, currentNode.viewSlot);
			        }

			        nodes.splice(i, 1);
			        ii--;i--;
			      } else if (nodeType === 1 || nodeType === 3 || currentNode.viewSlot instanceof PassThroughSlot) {
			        if (nodeType === 3 && _isAllWhitespace(currentNode)) {
			          nodes.splice(i, 1);
			          ii--;i--;
			        } else {
			          var found = slots[destinationOverride || ShadowDOM.getSlotName(currentNode)];

			          if (found) {
			            found.addNode(view, currentNode, projectionSource, index);
			            nodes.splice(i, 1);
			            ii--;i--;
			          }
			        }
			      } else {
			        nodes.splice(i, 1);
			        ii--;i--;
			      }
			    }

			    for (var _slotName in slots) {
			      var slot = slots[_slotName];

			      if (slot.needsFallbackRendering) {
			        slot.renderFallbackContent(view, nodes, projectionSource, index);
			      }
			    }
			  };

			  return ShadowDOM;
			}(), _class9.defaultSlotKey = '__au-default-slot-key__', _temp3);


			function register(lookup, name, resource, type) {
			  if (!name) {
			    return;
			  }

			  var existing = lookup[name];
			  if (existing) {
			    if (existing !== resource) {
			      throw new Error('Attempted to register ' + type + ' when one with the same name already exists. Name: ' + name + '.');
			    }

			    return;
			  }

			  lookup[name] = resource;
			}

			var ViewResources = exports.ViewResources = function () {
			  function ViewResources(parent, viewUrl) {
			    

			    this.bindingLanguage = null;

			    this.parent = parent || null;
			    this.hasParent = this.parent !== null;
			    this.viewUrl = viewUrl || '';
			    this.lookupFunctions = {
			      valueConverters: this.getValueConverter.bind(this),
			      bindingBehaviors: this.getBindingBehavior.bind(this)
			    };
			    this.attributes = Object.create(null);
			    this.elements = Object.create(null);
			    this.valueConverters = Object.create(null);
			    this.bindingBehaviors = Object.create(null);
			    this.attributeMap = Object.create(null);
			    this.values = Object.create(null);
			    this.beforeCompile = this.afterCompile = this.beforeCreate = this.afterCreate = this.beforeBind = this.beforeUnbind = false;
			  }

			  ViewResources.prototype._tryAddHook = function _tryAddHook(obj, name) {
			    if (typeof obj[name] === 'function') {
			      var func = obj[name].bind(obj);
			      var counter = 1;
			      var callbackName = void 0;

			      while (this[callbackName = name + counter.toString()] !== undefined) {
			        counter++;
			      }

			      this[name] = true;
			      this[callbackName] = func;
			    }
			  };

			  ViewResources.prototype._invokeHook = function _invokeHook(name, one, two, three, four) {
			    if (this.hasParent) {
			      this.parent._invokeHook(name, one, two, three, four);
			    }

			    if (this[name]) {
			      this[name + '1'](one, two, three, four);

			      var callbackName = name + '2';
			      if (this[callbackName]) {
			        this[callbackName](one, two, three, four);

			        callbackName = name + '3';
			        if (this[callbackName]) {
			          this[callbackName](one, two, three, four);

			          var counter = 4;

			          while (this[callbackName = name + counter.toString()] !== undefined) {
			            this[callbackName](one, two, three, four);
			            counter++;
			          }
			        }
			      }
			    }
			  };

			  ViewResources.prototype.registerViewEngineHooks = function registerViewEngineHooks(hooks) {
			    this._tryAddHook(hooks, 'beforeCompile');
			    this._tryAddHook(hooks, 'afterCompile');
			    this._tryAddHook(hooks, 'beforeCreate');
			    this._tryAddHook(hooks, 'afterCreate');
			    this._tryAddHook(hooks, 'beforeBind');
			    this._tryAddHook(hooks, 'beforeUnbind');
			  };

			  ViewResources.prototype.getBindingLanguage = function getBindingLanguage(bindingLanguageFallback) {
			    return this.bindingLanguage || (this.bindingLanguage = bindingLanguageFallback);
			  };

			  ViewResources.prototype.patchInParent = function patchInParent(newParent) {
			    var originalParent = this.parent;

			    this.parent = newParent || null;
			    this.hasParent = this.parent !== null;

			    if (newParent.parent === null) {
			      newParent.parent = originalParent;
			      newParent.hasParent = originalParent !== null;
			    }
			  };

			  ViewResources.prototype.relativeToView = function relativeToView(path) {
			    return (0, aureliaPath.relativeToFile)(path, this.viewUrl);
			  };

			  ViewResources.prototype.registerElement = function registerElement(tagName, behavior) {
			    register(this.elements, tagName, behavior, 'an Element');
			  };

			  ViewResources.prototype.getElement = function getElement(tagName) {
			    return this.elements[tagName] || (this.hasParent ? this.parent.getElement(tagName) : null);
			  };

			  ViewResources.prototype.mapAttribute = function mapAttribute(attribute) {
			    return this.attributeMap[attribute] || (this.hasParent ? this.parent.mapAttribute(attribute) : null);
			  };

			  ViewResources.prototype.registerAttribute = function registerAttribute(attribute, behavior, knownAttribute) {
			    this.attributeMap[attribute] = knownAttribute;
			    register(this.attributes, attribute, behavior, 'an Attribute');
			  };

			  ViewResources.prototype.getAttribute = function getAttribute(attribute) {
			    return this.attributes[attribute] || (this.hasParent ? this.parent.getAttribute(attribute) : null);
			  };

			  ViewResources.prototype.registerValueConverter = function registerValueConverter(name, valueConverter) {
			    register(this.valueConverters, name, valueConverter, 'a ValueConverter');
			  };

			  ViewResources.prototype.getValueConverter = function getValueConverter(name) {
			    return this.valueConverters[name] || (this.hasParent ? this.parent.getValueConverter(name) : null);
			  };

			  ViewResources.prototype.registerBindingBehavior = function registerBindingBehavior(name, bindingBehavior) {
			    register(this.bindingBehaviors, name, bindingBehavior, 'a BindingBehavior');
			  };

			  ViewResources.prototype.getBindingBehavior = function getBindingBehavior(name) {
			    return this.bindingBehaviors[name] || (this.hasParent ? this.parent.getBindingBehavior(name) : null);
			  };

			  ViewResources.prototype.registerValue = function registerValue(name, value) {
			    register(this.values, name, value, 'a value');
			  };

			  ViewResources.prototype.getValue = function getValue(name) {
			    return this.values[name] || (this.hasParent ? this.parent.getValue(name) : null);
			  };

			  return ViewResources;
			}();

			var View = exports.View = function () {
			  function View(container, viewFactory, fragment, controllers, bindings, children, slots) {
			    

			    this.container = container;
			    this.viewFactory = viewFactory;
			    this.resources = viewFactory.resources;
			    this.fragment = fragment;
			    this.firstChild = fragment.firstChild;
			    this.lastChild = fragment.lastChild;
			    this.controllers = controllers;
			    this.bindings = bindings;
			    this.children = children;
			    this.slots = slots;
			    this.hasSlots = false;
			    this.fromCache = false;
			    this.isBound = false;
			    this.isAttached = false;
			    this.bindingContext = null;
			    this.overrideContext = null;
			    this.controller = null;
			    this.viewModelScope = null;
			    this.animatableElement = undefined;
			    this._isUserControlled = false;
			    this.contentView = null;

			    for (var key in slots) {
			      this.hasSlots = true;
			      break;
			    }
			  }

			  View.prototype.returnToCache = function returnToCache() {
			    this.viewFactory.returnViewToCache(this);
			  };

			  View.prototype.created = function created() {
			    var i = void 0;
			    var ii = void 0;
			    var controllers = this.controllers;

			    for (i = 0, ii = controllers.length; i < ii; ++i) {
			      controllers[i].created(this);
			    }
			  };

			  View.prototype.bind = function bind(bindingContext, overrideContext, _systemUpdate) {
			    var controllers = void 0;
			    var bindings = void 0;
			    var children = void 0;
			    var i = void 0;
			    var ii = void 0;

			    if (_systemUpdate && this._isUserControlled) {
			      return;
			    }

			    if (this.isBound) {
			      if (this.bindingContext === bindingContext) {
			        return;
			      }

			      this.unbind();
			    }

			    this.isBound = true;
			    this.bindingContext = bindingContext;
			    this.overrideContext = overrideContext || (0, aureliaBinding.createOverrideContext)(bindingContext);

			    this.resources._invokeHook('beforeBind', this);

			    bindings = this.bindings;
			    for (i = 0, ii = bindings.length; i < ii; ++i) {
			      bindings[i].bind(this);
			    }

			    if (this.viewModelScope !== null) {
			      bindingContext.bind(this.viewModelScope.bindingContext, this.viewModelScope.overrideContext);
			      this.viewModelScope = null;
			    }

			    controllers = this.controllers;
			    for (i = 0, ii = controllers.length; i < ii; ++i) {
			      controllers[i].bind(this);
			    }

			    children = this.children;
			    for (i = 0, ii = children.length; i < ii; ++i) {
			      children[i].bind(bindingContext, overrideContext, true);
			    }

			    if (this.hasSlots) {
			      ShadowDOM.distributeView(this.contentView, this.slots);
			    }
			  };

			  View.prototype.addBinding = function addBinding(binding) {
			    this.bindings.push(binding);

			    if (this.isBound) {
			      binding.bind(this);
			    }
			  };

			  View.prototype.unbind = function unbind() {
			    var controllers = void 0;
			    var bindings = void 0;
			    var children = void 0;
			    var i = void 0;
			    var ii = void 0;

			    if (this.isBound) {
			      this.isBound = false;
			      this.resources._invokeHook('beforeUnbind', this);

			      if (this.controller !== null) {
			        this.controller.unbind();
			      }

			      bindings = this.bindings;
			      for (i = 0, ii = bindings.length; i < ii; ++i) {
			        bindings[i].unbind();
			      }

			      controllers = this.controllers;
			      for (i = 0, ii = controllers.length; i < ii; ++i) {
			        controllers[i].unbind();
			      }

			      children = this.children;
			      for (i = 0, ii = children.length; i < ii; ++i) {
			        children[i].unbind();
			      }

			      this.bindingContext = null;
			      this.overrideContext = null;
			    }
			  };

			  View.prototype.insertNodesBefore = function insertNodesBefore(refNode) {
			    refNode.parentNode.insertBefore(this.fragment, refNode);
			  };

			  View.prototype.appendNodesTo = function appendNodesTo(parent) {
			    parent.appendChild(this.fragment);
			  };

			  View.prototype.removeNodes = function removeNodes() {
			    var fragment = this.fragment;
			    var current = this.firstChild;
			    var end = this.lastChild;
			    var next = void 0;

			    while (current) {
			      next = current.nextSibling;
			      fragment.appendChild(current);

			      if (current === end) {
			        break;
			      }

			      current = next;
			    }
			  };

			  View.prototype.attached = function attached() {
			    var controllers = void 0;
			    var children = void 0;
			    var i = void 0;
			    var ii = void 0;

			    if (this.isAttached) {
			      return;
			    }

			    this.isAttached = true;

			    if (this.controller !== null) {
			      this.controller.attached();
			    }

			    controllers = this.controllers;
			    for (i = 0, ii = controllers.length; i < ii; ++i) {
			      controllers[i].attached();
			    }

			    children = this.children;
			    for (i = 0, ii = children.length; i < ii; ++i) {
			      children[i].attached();
			    }
			  };

			  View.prototype.detached = function detached() {
			    var controllers = void 0;
			    var children = void 0;
			    var i = void 0;
			    var ii = void 0;

			    if (this.isAttached) {
			      this.isAttached = false;

			      if (this.controller !== null) {
			        this.controller.detached();
			      }

			      controllers = this.controllers;
			      for (i = 0, ii = controllers.length; i < ii; ++i) {
			        controllers[i].detached();
			      }

			      children = this.children;
			      for (i = 0, ii = children.length; i < ii; ++i) {
			        children[i].detached();
			      }
			    }
			  };

			  return View;
			}();

			function getAnimatableElement(view) {
			  if (view.animatableElement !== undefined) {
			    return view.animatableElement;
			  }

			  var current = view.firstChild;

			  while (current && current.nodeType !== 1) {
			    current = current.nextSibling;
			  }

			  if (current && current.nodeType === 1) {
			    return view.animatableElement = current.classList.contains('au-animate') ? current : null;
			  }

			  return view.animatableElement = null;
			}

			var ViewSlot = exports.ViewSlot = function () {
			  function ViewSlot(anchor, anchorIsContainer) {
			    var animator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Animator.instance;

			    

			    this.anchor = anchor;
			    this.anchorIsContainer = anchorIsContainer;
			    this.bindingContext = null;
			    this.overrideContext = null;
			    this.animator = animator;
			    this.children = [];
			    this.isBound = false;
			    this.isAttached = false;
			    this.contentSelectors = null;
			    anchor.viewSlot = this;
			    anchor.isContentProjectionSource = false;
			  }

			  ViewSlot.prototype.animateView = function animateView(view) {
			    var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'enter';

			    var animatableElement = getAnimatableElement(view);

			    if (animatableElement !== null) {
			      switch (direction) {
			        case 'enter':
			          return this.animator.enter(animatableElement);
			        case 'leave':
			          return this.animator.leave(animatableElement);
			        default:
			          throw new Error('Invalid animation direction: ' + direction);
			      }
			    }
			  };

			  ViewSlot.prototype.transformChildNodesIntoView = function transformChildNodesIntoView() {
			    var parent = this.anchor;

			    this.children.push({
			      fragment: parent,
			      firstChild: parent.firstChild,
			      lastChild: parent.lastChild,
			      returnToCache: function returnToCache() {},
			      removeNodes: function removeNodes() {
			        var last = void 0;

			        while (last = parent.lastChild) {
			          parent.removeChild(last);
			        }
			      },
			      created: function created() {},
			      bind: function bind() {},
			      unbind: function unbind() {},
			      attached: function attached() {},
			      detached: function detached() {}
			    });
			  };

			  ViewSlot.prototype.bind = function bind(bindingContext, overrideContext) {
			    var i = void 0;
			    var ii = void 0;
			    var children = void 0;

			    if (this.isBound) {
			      if (this.bindingContext === bindingContext) {
			        return;
			      }

			      this.unbind();
			    }

			    this.isBound = true;
			    this.bindingContext = bindingContext = bindingContext || this.bindingContext;
			    this.overrideContext = overrideContext = overrideContext || this.overrideContext;

			    children = this.children;
			    for (i = 0, ii = children.length; i < ii; ++i) {
			      children[i].bind(bindingContext, overrideContext, true);
			    }
			  };

			  ViewSlot.prototype.unbind = function unbind() {
			    if (this.isBound) {
			      var i = void 0;
			      var ii = void 0;
			      var _children4 = this.children;

			      this.isBound = false;
			      this.bindingContext = null;
			      this.overrideContext = null;

			      for (i = 0, ii = _children4.length; i < ii; ++i) {
			        _children4[i].unbind();
			      }
			    }
			  };

			  ViewSlot.prototype.add = function add(view) {
			    if (this.anchorIsContainer) {
			      view.appendNodesTo(this.anchor);
			    } else {
			      view.insertNodesBefore(this.anchor);
			    }

			    this.children.push(view);

			    if (this.isAttached) {
			      view.attached();
			      return this.animateView(view, 'enter');
			    }
			  };

			  ViewSlot.prototype.insert = function insert(index, view) {
			    var children = this.children;
			    var length = children.length;

			    if (index === 0 && length === 0 || index >= length) {
			      return this.add(view);
			    }

			    view.insertNodesBefore(children[index].firstChild);
			    children.splice(index, 0, view);

			    if (this.isAttached) {
			      view.attached();
			      return this.animateView(view, 'enter');
			    }
			  };

			  ViewSlot.prototype.move = function move(sourceIndex, targetIndex) {
			    if (sourceIndex === targetIndex) {
			      return;
			    }

			    var children = this.children;
			    var view = children[sourceIndex];

			    view.removeNodes();
			    view.insertNodesBefore(children[targetIndex].firstChild);
			    children.splice(sourceIndex, 1);
			    children.splice(targetIndex, 0, view);
			  };

			  ViewSlot.prototype.remove = function remove(view, returnToCache, skipAnimation) {
			    return this.removeAt(this.children.indexOf(view), returnToCache, skipAnimation);
			  };

			  ViewSlot.prototype.removeMany = function removeMany(viewsToRemove, returnToCache, skipAnimation) {
			    var _this2 = this;

			    var children = this.children;
			    var ii = viewsToRemove.length;
			    var i = void 0;
			    var rmPromises = [];

			    viewsToRemove.forEach(function (child) {
			      if (skipAnimation) {
			        child.removeNodes();
			        return;
			      }

			      var animation = _this2.animateView(child, 'leave');
			      if (animation) {
			        rmPromises.push(animation.then(function () {
			          return child.removeNodes();
			        }));
			      } else {
			        child.removeNodes();
			      }
			    });

			    var removeAction = function removeAction() {
			      if (_this2.isAttached) {
			        for (i = 0; i < ii; ++i) {
			          viewsToRemove[i].detached();
			        }
			      }

			      if (returnToCache) {
			        for (i = 0; i < ii; ++i) {
			          viewsToRemove[i].returnToCache();
			        }
			      }

			      for (i = 0; i < ii; ++i) {
			        var index = children.indexOf(viewsToRemove[i]);
			        if (index >= 0) {
			          children.splice(index, 1);
			        }
			      }
			    };

			    if (rmPromises.length > 0) {
			      return Promise.all(rmPromises).then(function () {
			        return removeAction();
			      });
			    }

			    return removeAction();
			  };

			  ViewSlot.prototype.removeAt = function removeAt(index, returnToCache, skipAnimation) {
			    var _this3 = this;

			    var view = this.children[index];

			    var removeAction = function removeAction() {
			      index = _this3.children.indexOf(view);
			      view.removeNodes();
			      _this3.children.splice(index, 1);

			      if (_this3.isAttached) {
			        view.detached();
			      }

			      if (returnToCache) {
			        view.returnToCache();
			      }

			      return view;
			    };

			    if (!skipAnimation) {
			      var animation = this.animateView(view, 'leave');
			      if (animation) {
			        return animation.then(function () {
			          return removeAction();
			        });
			      }
			    }

			    return removeAction();
			  };

			  ViewSlot.prototype.removeAll = function removeAll(returnToCache, skipAnimation) {
			    var _this4 = this;

			    var children = this.children;
			    var ii = children.length;
			    var i = void 0;
			    var rmPromises = [];

			    children.forEach(function (child) {
			      if (skipAnimation) {
			        child.removeNodes();
			        return;
			      }

			      var animation = _this4.animateView(child, 'leave');
			      if (animation) {
			        rmPromises.push(animation.then(function () {
			          return child.removeNodes();
			        }));
			      } else {
			        child.removeNodes();
			      }
			    });

			    var removeAction = function removeAction() {
			      if (_this4.isAttached) {
			        for (i = 0; i < ii; ++i) {
			          children[i].detached();
			        }
			      }

			      if (returnToCache) {
			        for (i = 0; i < ii; ++i) {
			          var _child3 = children[i];

			          if (_child3) {
			            _child3.returnToCache();
			          }
			        }
			      }

			      _this4.children = [];
			    };

			    if (rmPromises.length > 0) {
			      return Promise.all(rmPromises).then(function () {
			        return removeAction();
			      });
			    }

			    return removeAction();
			  };

			  ViewSlot.prototype.attached = function attached() {
			    var i = void 0;
			    var ii = void 0;
			    var children = void 0;
			    var child = void 0;

			    if (this.isAttached) {
			      return;
			    }

			    this.isAttached = true;

			    children = this.children;
			    for (i = 0, ii = children.length; i < ii; ++i) {
			      child = children[i];
			      child.attached();
			      this.animateView(child, 'enter');
			    }
			  };

			  ViewSlot.prototype.detached = function detached() {
			    var i = void 0;
			    var ii = void 0;
			    var children = void 0;

			    if (this.isAttached) {
			      this.isAttached = false;
			      children = this.children;
			      for (i = 0, ii = children.length; i < ii; ++i) {
			        children[i].detached();
			      }
			    }
			  };

			  ViewSlot.prototype.projectTo = function projectTo(slots) {
			    var _this5 = this;

			    this.projectToSlots = slots;
			    this.add = this._projectionAdd;
			    this.insert = this._projectionInsert;
			    this.move = this._projectionMove;
			    this.remove = this._projectionRemove;
			    this.removeAt = this._projectionRemoveAt;
			    this.removeMany = this._projectionRemoveMany;
			    this.removeAll = this._projectionRemoveAll;
			    this.children.forEach(function (view) {
			      return ShadowDOM.distributeView(view, slots, _this5);
			    });
			  };

			  ViewSlot.prototype._projectionAdd = function _projectionAdd(view) {
			    ShadowDOM.distributeView(view, this.projectToSlots, this);

			    this.children.push(view);

			    if (this.isAttached) {
			      view.attached();
			    }
			  };

			  ViewSlot.prototype._projectionInsert = function _projectionInsert(index, view) {
			    if (index === 0 && !this.children.length || index >= this.children.length) {
			      this.add(view);
			    } else {
			      ShadowDOM.distributeView(view, this.projectToSlots, this, index);

			      this.children.splice(index, 0, view);

			      if (this.isAttached) {
			        view.attached();
			      }
			    }
			  };

			  ViewSlot.prototype._projectionMove = function _projectionMove(sourceIndex, targetIndex) {
			    if (sourceIndex === targetIndex) {
			      return;
			    }

			    var children = this.children;
			    var view = children[sourceIndex];

			    ShadowDOM.undistributeView(view, this.projectToSlots, this);
			    ShadowDOM.distributeView(view, this.projectToSlots, this, targetIndex);

			    children.splice(sourceIndex, 1);
			    children.splice(targetIndex, 0, view);
			  };

			  ViewSlot.prototype._projectionRemove = function _projectionRemove(view, returnToCache) {
			    ShadowDOM.undistributeView(view, this.projectToSlots, this);
			    this.children.splice(this.children.indexOf(view), 1);

			    if (this.isAttached) {
			      view.detached();
			    }
			  };

			  ViewSlot.prototype._projectionRemoveAt = function _projectionRemoveAt(index, returnToCache) {
			    var view = this.children[index];

			    ShadowDOM.undistributeView(view, this.projectToSlots, this);
			    this.children.splice(index, 1);

			    if (this.isAttached) {
			      view.detached();
			    }
			  };

			  ViewSlot.prototype._projectionRemoveMany = function _projectionRemoveMany(viewsToRemove, returnToCache) {
			    var _this6 = this;

			    viewsToRemove.forEach(function (view) {
			      return _this6.remove(view, returnToCache);
			    });
			  };

			  ViewSlot.prototype._projectionRemoveAll = function _projectionRemoveAll(returnToCache) {
			    ShadowDOM.undistributeAll(this.projectToSlots, this);

			    var children = this.children;

			    if (this.isAttached) {
			      for (var i = 0, ii = children.length; i < ii; ++i) {
			        children[i].detached();
			      }
			    }

			    this.children = [];
			  };

			  return ViewSlot;
			}();

			var ProviderResolver = (0, aureliaDependencyInjection.resolver)(_class11 = function () {
			  function ProviderResolver() {
			    
			  }

			  ProviderResolver.prototype.get = function get(container, key) {
			    var id = key.__providerId__;
			    return id in container ? container[id] : container[id] = container.invoke(key);
			  };

			  return ProviderResolver;
			}()) || _class11;

			var providerResolverInstance = new ProviderResolver();

			function elementContainerGet(key) {
			  if (key === aureliaPal.DOM.Element) {
			    return this.element;
			  }

			  if (key === BoundViewFactory) {
			    if (this.boundViewFactory) {
			      return this.boundViewFactory;
			    }

			    var factory = this.instruction.viewFactory;
			    var _partReplacements = this.partReplacements;

			    if (_partReplacements) {
			      factory = _partReplacements[factory.part] || factory;
			    }

			    this.boundViewFactory = new BoundViewFactory(this, factory, _partReplacements);
			    return this.boundViewFactory;
			  }

			  if (key === ViewSlot) {
			    if (this.viewSlot === undefined) {
			      this.viewSlot = new ViewSlot(this.element, this.instruction.anchorIsContainer);
			      this.element.isContentProjectionSource = this.instruction.lifting;
			      this.children.push(this.viewSlot);
			    }

			    return this.viewSlot;
			  }

			  if (key === ElementEvents) {
			    return this.elementEvents || (this.elementEvents = new ElementEvents(this.element));
			  }

			  if (key === CompositionTransaction) {
			    return this.compositionTransaction || (this.compositionTransaction = this.parent.get(key));
			  }

			  if (key === ViewResources) {
			    return this.viewResources;
			  }

			  if (key === TargetInstruction) {
			    return this.instruction;
			  }

			  return this.superGet(key);
			}

			function createElementContainer(parent, element, instruction, children, partReplacements, resources) {
			  var container = parent.createChild();
			  var providers = void 0;
			  var i = void 0;

			  container.element = element;
			  container.instruction = instruction;
			  container.children = children;
			  container.viewResources = resources;
			  container.partReplacements = partReplacements;

			  providers = instruction.providers;
			  i = providers.length;

			  while (i--) {
			    container._resolvers.set(providers[i], providerResolverInstance);
			  }

			  container.superGet = container.get;
			  container.get = elementContainerGet;

			  return container;
			}

			function hasAttribute(name) {
			  return this._element.hasAttribute(name);
			}

			function getAttribute(name) {
			  return this._element.getAttribute(name);
			}

			function setAttribute(name, value) {
			  this._element.setAttribute(name, value);
			}

			function makeElementIntoAnchor(element, elementInstruction) {
			  var anchor = aureliaPal.DOM.createComment('anchor');

			  if (elementInstruction) {
			    var firstChild = element.firstChild;

			    if (firstChild && firstChild.tagName === 'AU-CONTENT') {
			      anchor.contentElement = firstChild;
			    }

			    anchor._element = element;

			    anchor.hasAttribute = hasAttribute;
			    anchor.getAttribute = getAttribute;
			    anchor.setAttribute = setAttribute;
			  }

			  aureliaPal.DOM.replaceNode(anchor, element);

			  return anchor;
			}

			function applyInstructions(containers, element, instruction, controllers, bindings, children, shadowSlots, partReplacements, resources) {
			  var behaviorInstructions = instruction.behaviorInstructions;
			  var expressions = instruction.expressions;
			  var elementContainer = void 0;
			  var i = void 0;
			  var ii = void 0;
			  var current = void 0;
			  var instance = void 0;

			  if (instruction.contentExpression) {
			    bindings.push(instruction.contentExpression.createBinding(element.nextSibling));
			    element.nextSibling.auInterpolationTarget = true;
			    element.parentNode.removeChild(element);
			    return;
			  }

			  if (instruction.shadowSlot) {
			    var commentAnchor = aureliaPal.DOM.createComment('slot');
			    var slot = void 0;

			    if (instruction.slotDestination) {
			      slot = new PassThroughSlot(commentAnchor, instruction.slotName, instruction.slotDestination, instruction.slotFallbackFactory);
			    } else {
			      slot = new ShadowSlot(commentAnchor, instruction.slotName, instruction.slotFallbackFactory);
			    }

			    aureliaPal.DOM.replaceNode(commentAnchor, element);
			    shadowSlots[instruction.slotName] = slot;
			    controllers.push(slot);
			    return;
			  }

			  if (behaviorInstructions.length) {
			    if (!instruction.anchorIsContainer) {
			      element = makeElementIntoAnchor(element, instruction.elementInstruction);
			    }

			    containers[instruction.injectorId] = elementContainer = createElementContainer(containers[instruction.parentInjectorId], element, instruction, children, partReplacements, resources);

			    for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
			      current = behaviorInstructions[i];
			      instance = current.type.create(elementContainer, current, element, bindings);
			      controllers.push(instance);
			    }
			  }

			  for (i = 0, ii = expressions.length; i < ii; ++i) {
			    bindings.push(expressions[i].createBinding(element));
			  }
			}

			function styleStringToObject(style, target) {
			  var attributes = style.split(';');
			  var firstIndexOfColon = void 0;
			  var i = void 0;
			  var current = void 0;
			  var key = void 0;
			  var value = void 0;

			  target = target || {};

			  for (i = 0; i < attributes.length; i++) {
			    current = attributes[i];
			    firstIndexOfColon = current.indexOf(':');
			    key = current.substring(0, firstIndexOfColon).trim();
			    value = current.substring(firstIndexOfColon + 1).trim();
			    target[key] = value;
			  }

			  return target;
			}

			function styleObjectToString(obj) {
			  var result = '';

			  for (var key in obj) {
			    result += key + ':' + obj[key] + ';';
			  }

			  return result;
			}

			function applySurrogateInstruction(container, element, instruction, controllers, bindings, children) {
			  var behaviorInstructions = instruction.behaviorInstructions;
			  var expressions = instruction.expressions;
			  var providers = instruction.providers;
			  var values = instruction.values;
			  var i = void 0;
			  var ii = void 0;
			  var current = void 0;
			  var instance = void 0;
			  var currentAttributeValue = void 0;

			  i = providers.length;
			  while (i--) {
			    container._resolvers.set(providers[i], providerResolverInstance);
			  }

			  for (var key in values) {
			    currentAttributeValue = element.getAttribute(key);

			    if (currentAttributeValue) {
			      if (key === 'class') {
			        element.setAttribute('class', currentAttributeValue + ' ' + values[key]);
			      } else if (key === 'style') {
			        var styleObject = styleStringToObject(values[key]);
			        styleStringToObject(currentAttributeValue, styleObject);
			        element.setAttribute('style', styleObjectToString(styleObject));
			      }
			    } else {
			      element.setAttribute(key, values[key]);
			    }
			  }

			  if (behaviorInstructions.length) {
			    for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
			      current = behaviorInstructions[i];
			      instance = current.type.create(container, current, element, bindings);

			      if (instance.contentView) {
			        children.push(instance.contentView);
			      }

			      controllers.push(instance);
			    }
			  }

			  for (i = 0, ii = expressions.length; i < ii; ++i) {
			    bindings.push(expressions[i].createBinding(element));
			  }
			}

			var BoundViewFactory = exports.BoundViewFactory = function () {
			  function BoundViewFactory(parentContainer, viewFactory, partReplacements) {
			    

			    this.parentContainer = parentContainer;
			    this.viewFactory = viewFactory;
			    this.factoryCreateInstruction = { partReplacements: partReplacements };
			  }

			  BoundViewFactory.prototype.create = function create() {
			    var view = this.viewFactory.create(this.parentContainer.createChild(), this.factoryCreateInstruction);
			    view._isUserControlled = true;
			    return view;
			  };

			  BoundViewFactory.prototype.setCacheSize = function setCacheSize(size, doNotOverrideIfAlreadySet) {
			    this.viewFactory.setCacheSize(size, doNotOverrideIfAlreadySet);
			  };

			  BoundViewFactory.prototype.getCachedView = function getCachedView() {
			    return this.viewFactory.getCachedView();
			  };

			  BoundViewFactory.prototype.returnViewToCache = function returnViewToCache(view) {
			    this.viewFactory.returnViewToCache(view);
			  };

			  _createClass(BoundViewFactory, [{
			    key: 'isCaching',
			    get: function get() {
			      return this.viewFactory.isCaching;
			    }
			  }]);

			  return BoundViewFactory;
			}();

			var ViewFactory = exports.ViewFactory = function () {
			  function ViewFactory(template, instructions, resources) {
			    

			    this.isCaching = false;

			    this.template = template;
			    this.instructions = instructions;
			    this.resources = resources;
			    this.cacheSize = -1;
			    this.cache = null;
			  }

			  ViewFactory.prototype.setCacheSize = function setCacheSize(size, doNotOverrideIfAlreadySet) {
			    if (size) {
			      if (size === '*') {
			        size = Number.MAX_VALUE;
			      } else if (typeof size === 'string') {
			        size = parseInt(size, 10);
			      }
			    }

			    if (this.cacheSize === -1 || !doNotOverrideIfAlreadySet) {
			      this.cacheSize = size;
			    }

			    if (this.cacheSize > 0) {
			      this.cache = [];
			    } else {
			      this.cache = null;
			    }

			    this.isCaching = this.cacheSize > 0;
			  };

			  ViewFactory.prototype.getCachedView = function getCachedView() {
			    return this.cache !== null ? this.cache.pop() || null : null;
			  };

			  ViewFactory.prototype.returnViewToCache = function returnViewToCache(view) {
			    if (view.isAttached) {
			      view.detached();
			    }

			    if (view.isBound) {
			      view.unbind();
			    }

			    if (this.cache !== null && this.cache.length < this.cacheSize) {
			      view.fromCache = true;
			      this.cache.push(view);
			    }
			  };

			  ViewFactory.prototype.create = function create(container, createInstruction, element) {
			    createInstruction = createInstruction || BehaviorInstruction.normal;

			    var cachedView = this.getCachedView();
			    if (cachedView !== null) {
			      return cachedView;
			    }

			    var fragment = createInstruction.enhance ? this.template : this.template.cloneNode(true);
			    var instructables = fragment.querySelectorAll('.au-target');
			    var instructions = this.instructions;
			    var resources = this.resources;
			    var controllers = [];
			    var bindings = [];
			    var children = [];
			    var shadowSlots = Object.create(null);
			    var containers = { root: container };
			    var partReplacements = createInstruction.partReplacements;
			    var i = void 0;
			    var ii = void 0;
			    var view = void 0;
			    var instructable = void 0;
			    var instruction = void 0;

			    this.resources._invokeHook('beforeCreate', this, container, fragment, createInstruction);

			    if (element && this.surrogateInstruction !== null) {
			      applySurrogateInstruction(container, element, this.surrogateInstruction, controllers, bindings, children);
			    }

			    if (createInstruction.enhance && fragment.hasAttribute('au-target-id')) {
			      instructable = fragment;
			      instruction = instructions[instructable.getAttribute('au-target-id')];
			      applyInstructions(containers, instructable, instruction, controllers, bindings, children, shadowSlots, partReplacements, resources);
			    }

			    for (i = 0, ii = instructables.length; i < ii; ++i) {
			      instructable = instructables[i];
			      instruction = instructions[instructable.getAttribute('au-target-id')];
			      applyInstructions(containers, instructable, instruction, controllers, bindings, children, shadowSlots, partReplacements, resources);
			    }

			    view = new View(container, this, fragment, controllers, bindings, children, shadowSlots);

			    if (!createInstruction.initiatedByBehavior) {
			      view.created();
			    }

			    this.resources._invokeHook('afterCreate', view);

			    return view;
			  };

			  return ViewFactory;
			}();

			var nextInjectorId = 0;
			function getNextInjectorId() {
			  return ++nextInjectorId;
			}

			var lastAUTargetID = 0;
			function getNextAUTargetID() {
			  return (++lastAUTargetID).toString();
			}

			function makeIntoInstructionTarget(element) {
			  var value = element.getAttribute('class');
			  var auTargetID = getNextAUTargetID();

			  element.setAttribute('class', value ? value + ' au-target' : 'au-target');
			  element.setAttribute('au-target-id', auTargetID);

			  return auTargetID;
			}

			function makeShadowSlot(compiler, resources, node, instructions, parentInjectorId) {
			  var auShadowSlot = aureliaPal.DOM.createElement('au-shadow-slot');
			  aureliaPal.DOM.replaceNode(auShadowSlot, node);

			  var auTargetID = makeIntoInstructionTarget(auShadowSlot);
			  var instruction = TargetInstruction.shadowSlot(parentInjectorId);

			  instruction.slotName = node.getAttribute('name') || ShadowDOM.defaultSlotKey;
			  instruction.slotDestination = node.getAttribute('slot');

			  if (node.innerHTML.trim()) {
			    var fragment = aureliaPal.DOM.createDocumentFragment();
			    var _child4 = void 0;

			    while (_child4 = node.firstChild) {
			      fragment.appendChild(_child4);
			    }

			    instruction.slotFallbackFactory = compiler.compile(fragment, resources);
			  }

			  instructions[auTargetID] = instruction;

			  return auShadowSlot;
			}

			var ViewCompiler = exports.ViewCompiler = (_dec7 = (0, aureliaDependencyInjection.inject)(BindingLanguage, ViewResources), _dec7(_class13 = function () {
			  function ViewCompiler(bindingLanguage, resources) {
			    

			    this.bindingLanguage = bindingLanguage;
			    this.resources = resources;
			  }

			  ViewCompiler.prototype.compile = function compile(source, resources, compileInstruction) {
			    resources = resources || this.resources;
			    compileInstruction = compileInstruction || ViewCompileInstruction.normal;
			    source = typeof source === 'string' ? aureliaPal.DOM.createTemplateFromMarkup(source) : source;

			    var content = void 0;
			    var part = void 0;
			    var cacheSize = void 0;

			    if (source.content) {
			      part = source.getAttribute('part');
			      cacheSize = source.getAttribute('view-cache');
			      content = aureliaPal.DOM.adoptNode(source.content);
			    } else {
			      content = source;
			    }

			    compileInstruction.targetShadowDOM = compileInstruction.targetShadowDOM && aureliaPal.FEATURE.shadowDOM;
			    resources._invokeHook('beforeCompile', content, resources, compileInstruction);

			    var instructions = {};
			    this._compileNode(content, resources, instructions, source, 'root', !compileInstruction.targetShadowDOM);

			    var firstChild = content.firstChild;
			    if (firstChild && firstChild.nodeType === 1) {
			      var targetId = firstChild.getAttribute('au-target-id');
			      if (targetId) {
			        var ins = instructions[targetId];

			        if (ins.shadowSlot || ins.lifting || ins.elementInstruction && !ins.elementInstruction.anchorIsContainer) {
			          content.insertBefore(aureliaPal.DOM.createComment('view'), firstChild);
			        }
			      }
			    }

			    var factory = new ViewFactory(content, instructions, resources);

			    factory.surrogateInstruction = compileInstruction.compileSurrogate ? this._compileSurrogate(source, resources) : null;
			    factory.part = part;

			    if (cacheSize) {
			      factory.setCacheSize(cacheSize);
			    }

			    resources._invokeHook('afterCompile', factory);

			    return factory;
			  };

			  ViewCompiler.prototype._compileNode = function _compileNode(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM) {
			    switch (node.nodeType) {
			      case 1:
			        return this._compileElement(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM);
			      case 3:
			        var expression = resources.getBindingLanguage(this.bindingLanguage).inspectTextContent(resources, node.wholeText);
			        if (expression) {
			          var marker = aureliaPal.DOM.createElement('au-marker');
			          var auTargetID = makeIntoInstructionTarget(marker);
			          (node.parentNode || parentNode).insertBefore(marker, node);
			          node.textContent = ' ';
			          instructions[auTargetID] = TargetInstruction.contentExpression(expression);

			          while (node.nextSibling && node.nextSibling.nodeType === 3) {
			            (node.parentNode || parentNode).removeChild(node.nextSibling);
			          }
			        } else {
			          while (node.nextSibling && node.nextSibling.nodeType === 3) {
			            node = node.nextSibling;
			          }
			        }
			        return node.nextSibling;
			      case 11:
			        var currentChild = node.firstChild;
			        while (currentChild) {
			          currentChild = this._compileNode(currentChild, resources, instructions, node, parentInjectorId, targetLightDOM);
			        }
			        break;
			      default:
			        break;
			    }

			    return node.nextSibling;
			  };

			  ViewCompiler.prototype._compileSurrogate = function _compileSurrogate(node, resources) {
			    var tagName = node.tagName.toLowerCase();
			    var attributes = node.attributes;
			    var bindingLanguage = resources.getBindingLanguage(this.bindingLanguage);
			    var knownAttribute = void 0;
			    var property = void 0;
			    var instruction = void 0;
			    var i = void 0;
			    var ii = void 0;
			    var attr = void 0;
			    var attrName = void 0;
			    var attrValue = void 0;
			    var info = void 0;
			    var type = void 0;
			    var expressions = [];
			    var expression = void 0;
			    var behaviorInstructions = [];
			    var values = {};
			    var hasValues = false;
			    var providers = [];

			    for (i = 0, ii = attributes.length; i < ii; ++i) {
			      attr = attributes[i];
			      attrName = attr.name;
			      attrValue = attr.value;

			      info = bindingLanguage.inspectAttribute(resources, tagName, attrName, attrValue);
			      type = resources.getAttribute(info.attrName);

			      if (type) {
			        knownAttribute = resources.mapAttribute(info.attrName);
			        if (knownAttribute) {
			          property = type.attributes[knownAttribute];

			          if (property) {
			            info.defaultBindingMode = property.defaultBindingMode;

			            if (!info.command && !info.expression) {
			              info.command = property.hasOptions ? 'options' : null;
			            }

			            if (info.command && info.command !== 'options' && type.primaryProperty) {
			              var primaryProperty = type.primaryProperty;
			              attrName = info.attrName = primaryProperty.attribute;

			              info.defaultBindingMode = primaryProperty.defaultBindingMode;
			            }
			          }
			        }
			      }

			      instruction = bindingLanguage.createAttributeInstruction(resources, node, info, undefined, type);

			      if (instruction) {
			        if (instruction.alteredAttr) {
			          type = resources.getAttribute(instruction.attrName);
			        }

			        if (instruction.discrete) {
			          expressions.push(instruction);
			        } else {
			          if (type) {
			            instruction.type = type;
			            this._configureProperties(instruction, resources);

			            if (type.liftsContent) {
			              throw new Error('You cannot place a template controller on a surrogate element.');
			            } else {
			              behaviorInstructions.push(instruction);
			            }
			          } else {
			            expressions.push(instruction.attributes[instruction.attrName]);
			          }
			        }
			      } else {
			        if (type) {
			          instruction = BehaviorInstruction.attribute(attrName, type);
			          instruction.attributes[resources.mapAttribute(attrName)] = attrValue;

			          if (type.liftsContent) {
			            throw new Error('You cannot place a template controller on a surrogate element.');
			          } else {
			            behaviorInstructions.push(instruction);
			          }
			        } else if (attrName !== 'id' && attrName !== 'part' && attrName !== 'replace-part') {
			          hasValues = true;
			          values[attrName] = attrValue;
			        }
			      }
			    }

			    if (expressions.length || behaviorInstructions.length || hasValues) {
			      for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
			        instruction = behaviorInstructions[i];
			        instruction.type.compile(this, resources, node, instruction);
			        providers.push(instruction.type.target);
			      }

			      for (i = 0, ii = expressions.length; i < ii; ++i) {
			        expression = expressions[i];
			        if (expression.attrToRemove !== undefined) {
			          node.removeAttribute(expression.attrToRemove);
			        }
			      }

			      return TargetInstruction.surrogate(providers, behaviorInstructions, expressions, values);
			    }

			    return null;
			  };

			  ViewCompiler.prototype._compileElement = function _compileElement(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM) {
			    var tagName = node.tagName.toLowerCase();
			    var attributes = node.attributes;
			    var expressions = [];
			    var expression = void 0;
			    var behaviorInstructions = [];
			    var providers = [];
			    var bindingLanguage = resources.getBindingLanguage(this.bindingLanguage);
			    var liftingInstruction = void 0;
			    var viewFactory = void 0;
			    var type = void 0;
			    var elementInstruction = void 0;
			    var elementProperty = void 0;
			    var i = void 0;
			    var ii = void 0;
			    var attr = void 0;
			    var attrName = void 0;
			    var attrValue = void 0;
			    var originalAttrName = void 0;
			    var instruction = void 0;
			    var info = void 0;
			    var property = void 0;
			    var knownAttribute = void 0;
			    var auTargetID = void 0;
			    var injectorId = void 0;

			    if (tagName === 'slot') {
			      if (targetLightDOM) {
			        node = makeShadowSlot(this, resources, node, instructions, parentInjectorId);
			      }
			      return node.nextSibling;
			    } else if (tagName === 'template') {
			      if (!('content' in node)) {
			        throw new Error('You cannot place a template element within ' + node.namespaceURI + ' namespace');
			      }
			      viewFactory = this.compile(node, resources);
			      viewFactory.part = node.getAttribute('part');
			    } else {
			      type = resources.getElement(node.getAttribute('as-element') || tagName);
			      if (type) {
			        elementInstruction = BehaviorInstruction.element(node, type);
			        type.processAttributes(this, resources, node, attributes, elementInstruction);
			        behaviorInstructions.push(elementInstruction);
			      }
			    }

			    for (i = 0, ii = attributes.length; i < ii; ++i) {
			      attr = attributes[i];
			      originalAttrName = attrName = attr.name;
			      attrValue = attr.value;
			      info = bindingLanguage.inspectAttribute(resources, tagName, attrName, attrValue);

			      if (targetLightDOM && info.attrName === 'slot') {
			        info.attrName = attrName = 'au-slot';
			      }

			      type = resources.getAttribute(info.attrName);
			      elementProperty = null;

			      if (type) {
			        knownAttribute = resources.mapAttribute(info.attrName);
			        if (knownAttribute) {
			          property = type.attributes[knownAttribute];

			          if (property) {
			            info.defaultBindingMode = property.defaultBindingMode;

			            if (!info.command && !info.expression) {
			              info.command = property.hasOptions ? 'options' : null;
			            }

			            if (info.command && info.command !== 'options' && type.primaryProperty) {
			              var primaryProperty = type.primaryProperty;
			              attrName = info.attrName = primaryProperty.attribute;

			              info.defaultBindingMode = primaryProperty.defaultBindingMode;
			            }
			          }
			        }
			      } else if (elementInstruction) {
			        elementProperty = elementInstruction.type.attributes[info.attrName];
			        if (elementProperty) {
			          info.defaultBindingMode = elementProperty.defaultBindingMode;
			        }
			      }

			      if (elementProperty) {
			        instruction = bindingLanguage.createAttributeInstruction(resources, node, info, elementInstruction);
			      } else {
			        instruction = bindingLanguage.createAttributeInstruction(resources, node, info, undefined, type);
			      }

			      if (instruction) {
			        if (instruction.alteredAttr) {
			          type = resources.getAttribute(instruction.attrName);
			        }

			        if (instruction.discrete) {
			          expressions.push(instruction);
			        } else {
			          if (type) {
			            instruction.type = type;
			            this._configureProperties(instruction, resources);

			            if (type.liftsContent) {
			              instruction.originalAttrName = originalAttrName;
			              liftingInstruction = instruction;
			              break;
			            } else {
			              behaviorInstructions.push(instruction);
			            }
			          } else if (elementProperty) {
			            elementInstruction.attributes[info.attrName].targetProperty = elementProperty.name;
			          } else {
			            expressions.push(instruction.attributes[instruction.attrName]);
			          }
			        }
			      } else {
			        if (type) {
			          instruction = BehaviorInstruction.attribute(attrName, type);
			          instruction.attributes[resources.mapAttribute(attrName)] = attrValue;

			          if (type.liftsContent) {
			            instruction.originalAttrName = originalAttrName;
			            liftingInstruction = instruction;
			            break;
			          } else {
			            behaviorInstructions.push(instruction);
			          }
			        } else if (elementProperty) {
			          elementInstruction.attributes[attrName] = attrValue;
			        }
			      }
			    }

			    if (liftingInstruction) {
			      liftingInstruction.viewFactory = viewFactory;
			      node = liftingInstruction.type.compile(this, resources, node, liftingInstruction, parentNode);
			      auTargetID = makeIntoInstructionTarget(node);
			      instructions[auTargetID] = TargetInstruction.lifting(parentInjectorId, liftingInstruction);
			    } else {
			      var skipContentProcessing = false;

			      if (expressions.length || behaviorInstructions.length) {
			        injectorId = behaviorInstructions.length ? getNextInjectorId() : false;

			        for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
			          instruction = behaviorInstructions[i];
			          instruction.type.compile(this, resources, node, instruction, parentNode);
			          providers.push(instruction.type.target);
			          skipContentProcessing = skipContentProcessing || instruction.skipContentProcessing;
			        }

			        for (i = 0, ii = expressions.length; i < ii; ++i) {
			          expression = expressions[i];
			          if (expression.attrToRemove !== undefined) {
			            node.removeAttribute(expression.attrToRemove);
			          }
			        }

			        auTargetID = makeIntoInstructionTarget(node);
			        instructions[auTargetID] = TargetInstruction.normal(injectorId, parentInjectorId, providers, behaviorInstructions, expressions, elementInstruction);
			      }

			      if (skipContentProcessing) {
			        return node.nextSibling;
			      }

			      var currentChild = node.firstChild;
			      while (currentChild) {
			        currentChild = this._compileNode(currentChild, resources, instructions, node, injectorId || parentInjectorId, targetLightDOM);
			      }
			    }

			    return node.nextSibling;
			  };

			  ViewCompiler.prototype._configureProperties = function _configureProperties(instruction, resources) {
			    var type = instruction.type;
			    var attrName = instruction.attrName;
			    var attributes = instruction.attributes;
			    var property = void 0;
			    var key = void 0;
			    var value = void 0;

			    var knownAttribute = resources.mapAttribute(attrName);
			    if (knownAttribute && attrName in attributes && knownAttribute !== attrName) {
			      attributes[knownAttribute] = attributes[attrName];
			      delete attributes[attrName];
			    }

			    for (key in attributes) {
			      value = attributes[key];

			      if (value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
			        property = type.attributes[key];

			        if (property !== undefined) {
			          value.targetProperty = property.name;
			        } else {
			          value.targetProperty = key;
			        }
			      }
			    }
			  };

			  return ViewCompiler;
			}()) || _class13);

			var ResourceModule = exports.ResourceModule = function () {
			  function ResourceModule(moduleId) {
			    

			    this.id = moduleId;
			    this.moduleInstance = null;
			    this.mainResource = null;
			    this.resources = null;
			    this.viewStrategy = null;
			    this.isInitialized = false;
			    this.onLoaded = null;
			    this.loadContext = null;
			  }

			  ResourceModule.prototype.initialize = function initialize(container) {
			    var current = this.mainResource;
			    var resources = this.resources;
			    var vs = this.viewStrategy;

			    if (this.isInitialized) {
			      return;
			    }

			    this.isInitialized = true;

			    if (current !== undefined) {
			      current.metadata.viewStrategy = vs;
			      current.initialize(container);
			    }

			    for (var i = 0, ii = resources.length; i < ii; ++i) {
			      current = resources[i];
			      current.metadata.viewStrategy = vs;
			      current.initialize(container);
			    }
			  };

			  ResourceModule.prototype.register = function register(registry, name) {
			    var main = this.mainResource;
			    var resources = this.resources;

			    if (main !== undefined) {
			      main.register(registry, name);
			      name = null;
			    }

			    for (var i = 0, ii = resources.length; i < ii; ++i) {
			      resources[i].register(registry, name);
			      name = null;
			    }
			  };

			  ResourceModule.prototype.load = function load(container, loadContext) {
			    if (this.onLoaded !== null) {
			      return this.loadContext === loadContext ? Promise.resolve() : this.onLoaded;
			    }

			    var main = this.mainResource;
			    var resources = this.resources;
			    var loads = void 0;

			    if (main !== undefined) {
			      loads = new Array(resources.length + 1);
			      loads[0] = main.load(container, loadContext);
			      for (var i = 0, ii = resources.length; i < ii; ++i) {
			        loads[i + 1] = resources[i].load(container, loadContext);
			      }
			    } else {
			      loads = new Array(resources.length);
			      for (var _i = 0, _ii = resources.length; _i < _ii; ++_i) {
			        loads[_i] = resources[_i].load(container, loadContext);
			      }
			    }

			    this.loadContext = loadContext;
			    this.onLoaded = Promise.all(loads);
			    return this.onLoaded;
			  };

			  return ResourceModule;
			}();

			var ResourceDescription = exports.ResourceDescription = function () {
			  function ResourceDescription(key, exportedValue, resourceTypeMeta) {
			    

			    if (!resourceTypeMeta) {
			      resourceTypeMeta = aureliaMetadata.metadata.get(aureliaMetadata.metadata.resource, exportedValue);

			      if (!resourceTypeMeta) {
			        resourceTypeMeta = new HtmlBehaviorResource();
			        resourceTypeMeta.elementName = _hyphenate(key);
			        aureliaMetadata.metadata.define(aureliaMetadata.metadata.resource, resourceTypeMeta, exportedValue);
			      }
			    }

			    if (resourceTypeMeta instanceof HtmlBehaviorResource) {
			      if (resourceTypeMeta.elementName === undefined) {
			        resourceTypeMeta.elementName = _hyphenate(key);
			      } else if (resourceTypeMeta.attributeName === undefined) {
			        resourceTypeMeta.attributeName = _hyphenate(key);
			      } else if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
			        HtmlBehaviorResource.convention(key, resourceTypeMeta);
			      }
			    } else if (!resourceTypeMeta.name) {
			      resourceTypeMeta.name = _hyphenate(key);
			    }

			    this.metadata = resourceTypeMeta;
			    this.value = exportedValue;
			  }

			  ResourceDescription.prototype.initialize = function initialize(container) {
			    this.metadata.initialize(container, this.value);
			  };

			  ResourceDescription.prototype.register = function register(registry, name) {
			    this.metadata.register(registry, name);
			  };

			  ResourceDescription.prototype.load = function load(container, loadContext) {
			    return this.metadata.load(container, this.value, loadContext);
			  };

			  return ResourceDescription;
			}();

			var ModuleAnalyzer = exports.ModuleAnalyzer = function () {
			  function ModuleAnalyzer() {
			    

			    this.cache = Object.create(null);
			  }

			  ModuleAnalyzer.prototype.getAnalysis = function getAnalysis(moduleId) {
			    return this.cache[moduleId];
			  };

			  ModuleAnalyzer.prototype.analyze = function analyze(moduleId, moduleInstance, mainResourceKey) {
			    var mainResource = void 0;
			    var fallbackValue = void 0;
			    var fallbackKey = void 0;
			    var resourceTypeMeta = void 0;
			    var key = void 0;
			    var exportedValue = void 0;
			    var resources = [];
			    var conventional = void 0;
			    var vs = void 0;
			    var resourceModule = void 0;

			    resourceModule = this.cache[moduleId];
			    if (resourceModule) {
			      return resourceModule;
			    }

			    resourceModule = new ResourceModule(moduleId);
			    this.cache[moduleId] = resourceModule;

			    if (typeof moduleInstance === 'function') {
			      moduleInstance = { 'default': moduleInstance };
			    }

			    if (mainResourceKey) {
			      mainResource = new ResourceDescription(mainResourceKey, moduleInstance[mainResourceKey]);
			    }

			    for (key in moduleInstance) {
			      exportedValue = moduleInstance[key];

			      if (key === mainResourceKey || typeof exportedValue !== 'function') {
			        continue;
			      }

			      resourceTypeMeta = aureliaMetadata.metadata.get(aureliaMetadata.metadata.resource, exportedValue);

			      if (resourceTypeMeta) {
			        if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
			          HtmlBehaviorResource.convention(key, resourceTypeMeta);
			        }

			        if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
			          resourceTypeMeta.elementName = _hyphenate(key);
			        }

			        if (!mainResource && resourceTypeMeta instanceof HtmlBehaviorResource && resourceTypeMeta.elementName !== null) {
			          mainResource = new ResourceDescription(key, exportedValue, resourceTypeMeta);
			        } else {
			          resources.push(new ResourceDescription(key, exportedValue, resourceTypeMeta));
			        }
			      } else if (viewStrategy.decorates(exportedValue)) {
			        vs = exportedValue;
			      } else if (exportedValue instanceof aureliaLoader.TemplateRegistryEntry) {
			        vs = new TemplateRegistryViewStrategy(moduleId, exportedValue);
			      } else {
			        if (conventional = HtmlBehaviorResource.convention(key)) {
			          if (conventional.elementName !== null && !mainResource) {
			            mainResource = new ResourceDescription(key, exportedValue, conventional);
			          } else {
			            resources.push(new ResourceDescription(key, exportedValue, conventional));
			          }

			          aureliaMetadata.metadata.define(aureliaMetadata.metadata.resource, conventional, exportedValue);
			        } else if (conventional = aureliaBinding.ValueConverterResource.convention(key) || aureliaBinding.BindingBehaviorResource.convention(key) || ViewEngineHooksResource.convention(key)) {
			          resources.push(new ResourceDescription(key, exportedValue, conventional));
			          aureliaMetadata.metadata.define(aureliaMetadata.metadata.resource, conventional, exportedValue);
			        } else if (!fallbackValue) {
			          fallbackValue = exportedValue;
			          fallbackKey = key;
			        }
			      }
			    }

			    if (!mainResource && fallbackValue) {
			      mainResource = new ResourceDescription(fallbackKey, fallbackValue);
			    }

			    resourceModule.moduleInstance = moduleInstance;
			    resourceModule.mainResource = mainResource;
			    resourceModule.resources = resources;
			    resourceModule.viewStrategy = vs;

			    return resourceModule;
			  };

			  return ModuleAnalyzer;
			}();

			var logger = LogManager.getLogger('templating');

			function ensureRegistryEntry(loader, urlOrRegistryEntry) {
			  if (urlOrRegistryEntry instanceof aureliaLoader.TemplateRegistryEntry) {
			    return Promise.resolve(urlOrRegistryEntry);
			  }

			  return loader.loadTemplate(urlOrRegistryEntry);
			}

			var ProxyViewFactory = function () {
			  function ProxyViewFactory(promise) {
			    var _this7 = this;

			    

			    promise.then(function (x) {
			      return _this7.viewFactory = x;
			    });
			  }

			  ProxyViewFactory.prototype.create = function create(container, bindingContext, createInstruction, element) {
			    return this.viewFactory.create(container, bindingContext, createInstruction, element);
			  };

			  ProxyViewFactory.prototype.setCacheSize = function setCacheSize(size, doNotOverrideIfAlreadySet) {
			    this.viewFactory.setCacheSize(size, doNotOverrideIfAlreadySet);
			  };

			  ProxyViewFactory.prototype.getCachedView = function getCachedView() {
			    return this.viewFactory.getCachedView();
			  };

			  ProxyViewFactory.prototype.returnViewToCache = function returnViewToCache(view) {
			    this.viewFactory.returnViewToCache(view);
			  };

			  _createClass(ProxyViewFactory, [{
			    key: 'isCaching',
			    get: function get() {
			      return this.viewFactory.isCaching;
			    }
			  }]);

			  return ProxyViewFactory;
			}();

			var auSlotBehavior = null;

			var ViewEngine = exports.ViewEngine = (_dec8 = (0, aureliaDependencyInjection.inject)(aureliaLoader.Loader, aureliaDependencyInjection.Container, ViewCompiler, ModuleAnalyzer, ViewResources), _dec8(_class14 = (_temp4 = _class15 = function () {
			  function ViewEngine(loader, container, viewCompiler, moduleAnalyzer, appResources) {
			    

			    this.loader = loader;
			    this.container = container;
			    this.viewCompiler = viewCompiler;
			    this.moduleAnalyzer = moduleAnalyzer;
			    this.appResources = appResources;
			    this._pluginMap = {};

			    if (auSlotBehavior === null) {
			      auSlotBehavior = new HtmlBehaviorResource();
			      auSlotBehavior.attributeName = 'au-slot';
			      aureliaMetadata.metadata.define(aureliaMetadata.metadata.resource, auSlotBehavior, SlotCustomAttribute);
			    }

			    auSlotBehavior.initialize(container, SlotCustomAttribute);
			    auSlotBehavior.register(appResources);
			  }

			  ViewEngine.prototype.addResourcePlugin = function addResourcePlugin(extension, implementation) {
			    var name = extension.replace('.', '') + '-resource-plugin';
			    this._pluginMap[extension] = name;
			    this.loader.addPlugin(name, implementation);
			  };

			  ViewEngine.prototype.loadViewFactory = function loadViewFactory(urlOrRegistryEntry, compileInstruction, loadContext, target) {
			    var _this8 = this;

			    loadContext = loadContext || new ResourceLoadContext();

			    return ensureRegistryEntry(this.loader, urlOrRegistryEntry).then(function (registryEntry) {
			      var url = registryEntry.address;

			      if (registryEntry.onReady) {
			        if (!loadContext.hasDependency(url)) {
			          loadContext.addDependency(url);
			          return registryEntry.onReady;
			        }

			        if (registryEntry.template === null) {
			          return registryEntry.onReady;
			        }

			        return Promise.resolve(new ProxyViewFactory(registryEntry.onReady));
			      }

			      loadContext.addDependency(url);

			      registryEntry.onReady = _this8.loadTemplateResources(registryEntry, compileInstruction, loadContext, target).then(function (resources) {
			        registryEntry.resources = resources;

			        if (registryEntry.template === null) {
			          return registryEntry.factory = null;
			        }

			        var viewFactory = _this8.viewCompiler.compile(registryEntry.template, resources, compileInstruction);
			        return registryEntry.factory = viewFactory;
			      });

			      return registryEntry.onReady;
			    });
			  };

			  ViewEngine.prototype.loadTemplateResources = function loadTemplateResources(registryEntry, compileInstruction, loadContext, target) {
			    var resources = new ViewResources(this.appResources, registryEntry.address);
			    var dependencies = registryEntry.dependencies;
			    var importIds = void 0;
			    var names = void 0;

			    compileInstruction = compileInstruction || ViewCompileInstruction.normal;

			    if (dependencies.length === 0 && !compileInstruction.associatedModuleId) {
			      return Promise.resolve(resources);
			    }

			    importIds = dependencies.map(function (x) {
			      return x.src;
			    });
			    names = dependencies.map(function (x) {
			      return x.name;
			    });
			    logger.debug('importing resources for ' + registryEntry.address, importIds);

			    if (target) {
			      var viewModelRequires = aureliaMetadata.metadata.get(ViewEngine.viewModelRequireMetadataKey, target);
			      if (viewModelRequires) {
			        var templateImportCount = importIds.length;
			        for (var i = 0, ii = viewModelRequires.length; i < ii; ++i) {
			          var req = viewModelRequires[i];
			          var importId = typeof req === 'function' ? aureliaMetadata.Origin.get(req).moduleId : (0, aureliaPath.relativeToFile)(req.src || req, registryEntry.address);

			          if (importIds.indexOf(importId) === -1) {
			            importIds.push(importId);
			            names.push(req.as);
			          }
			        }
			        logger.debug('importing ViewModel resources for ' + compileInstruction.associatedModuleId, importIds.slice(templateImportCount));
			      }
			    }

			    return this.importViewResources(importIds, names, resources, compileInstruction, loadContext);
			  };

			  ViewEngine.prototype.importViewModelResource = function importViewModelResource(moduleImport, moduleMember) {
			    var _this9 = this;

			    return this.loader.loadModule(moduleImport).then(function (viewModelModule) {
			      var normalizedId = aureliaMetadata.Origin.get(viewModelModule).moduleId;
			      var resourceModule = _this9.moduleAnalyzer.analyze(normalizedId, viewModelModule, moduleMember);

			      if (!resourceModule.mainResource) {
			        throw new Error('No view model found in module "' + moduleImport + '".');
			      }

			      resourceModule.initialize(_this9.container);

			      return resourceModule.mainResource;
			    });
			  };

			  ViewEngine.prototype.importViewResources = function importViewResources(moduleIds, names, resources, compileInstruction, loadContext) {
			    var _this10 = this;

			    loadContext = loadContext || new ResourceLoadContext();
			    compileInstruction = compileInstruction || ViewCompileInstruction.normal;

			    moduleIds = moduleIds.map(function (x) {
			      return _this10._applyLoaderPlugin(x);
			    });

			    return this.loader.loadAllModules(moduleIds).then(function (imports) {
			      var i = void 0;
			      var ii = void 0;
			      var analysis = void 0;
			      var normalizedId = void 0;
			      var current = void 0;
			      var associatedModule = void 0;
			      var container = _this10.container;
			      var moduleAnalyzer = _this10.moduleAnalyzer;
			      var allAnalysis = new Array(imports.length);

			      for (i = 0, ii = imports.length; i < ii; ++i) {
			        current = imports[i];
			        normalizedId = aureliaMetadata.Origin.get(current).moduleId;

			        analysis = moduleAnalyzer.analyze(normalizedId, current);
			        analysis.initialize(container);
			        analysis.register(resources, names[i]);

			        allAnalysis[i] = analysis;
			      }

			      if (compileInstruction.associatedModuleId) {
			        associatedModule = moduleAnalyzer.getAnalysis(compileInstruction.associatedModuleId);

			        if (associatedModule) {
			          associatedModule.register(resources);
			        }
			      }

			      for (i = 0, ii = allAnalysis.length; i < ii; ++i) {
			        allAnalysis[i] = allAnalysis[i].load(container, loadContext);
			      }

			      return Promise.all(allAnalysis).then(function () {
			        return resources;
			      });
			    });
			  };

			  ViewEngine.prototype._applyLoaderPlugin = function _applyLoaderPlugin(id) {
			    var index = id.lastIndexOf('.');
			    if (index !== -1) {
			      var ext = id.substring(index);
			      var pluginName = this._pluginMap[ext];

			      if (pluginName === undefined) {
			        return id;
			      }

			      return this.loader.applyPluginToUrl(id, pluginName);
			    }

			    return id;
			  };

			  return ViewEngine;
			}(), _class15.viewModelRequireMetadataKey = 'aurelia:view-model-require', _temp4)) || _class14);

			var Controller = exports.Controller = function () {
			  function Controller(behavior, instruction, viewModel, container) {
			    

			    this.behavior = behavior;
			    this.instruction = instruction;
			    this.viewModel = viewModel;
			    this.isAttached = false;
			    this.view = null;
			    this.isBound = false;
			    this.scope = null;
			    this.container = container;
			    this.elementEvents = container.elementEvents || null;

			    var observerLookup = behavior.observerLocator.getOrCreateObserversLookup(viewModel);
			    var handlesBind = behavior.handlesBind;
			    var attributes = instruction.attributes;
			    var boundProperties = this.boundProperties = [];
			    var properties = behavior.properties;
			    var i = void 0;
			    var ii = void 0;

			    behavior._ensurePropertiesDefined(viewModel, observerLookup);

			    for (i = 0, ii = properties.length; i < ii; ++i) {
			      properties[i]._initialize(viewModel, observerLookup, attributes, handlesBind, boundProperties);
			    }
			  }

			  Controller.prototype.created = function created(owningView) {
			    if (this.behavior.handlesCreated) {
			      this.viewModel.created(owningView, this.view);
			    }
			  };

			  Controller.prototype.automate = function automate(overrideContext, owningView) {
			    this.view.bindingContext = this.viewModel;
			    this.view.overrideContext = overrideContext || (0, aureliaBinding.createOverrideContext)(this.viewModel);
			    this.view._isUserControlled = true;

			    if (this.behavior.handlesCreated) {
			      this.viewModel.created(owningView || null, this.view);
			    }

			    this.bind(this.view);
			  };

			  Controller.prototype.bind = function bind(scope) {
			    var skipSelfSubscriber = this.behavior.handlesBind;
			    var boundProperties = this.boundProperties;
			    var i = void 0;
			    var ii = void 0;
			    var x = void 0;
			    var observer = void 0;
			    var selfSubscriber = void 0;

			    if (this.isBound) {
			      if (this.scope === scope) {
			        return;
			      }

			      this.unbind();
			    }

			    this.isBound = true;
			    this.scope = scope;

			    for (i = 0, ii = boundProperties.length; i < ii; ++i) {
			      x = boundProperties[i];
			      observer = x.observer;
			      selfSubscriber = observer.selfSubscriber;
			      observer.publishing = false;

			      if (skipSelfSubscriber) {
			        observer.selfSubscriber = null;
			      }

			      x.binding.bind(scope);
			      observer.call();

			      observer.publishing = true;
			      observer.selfSubscriber = selfSubscriber;
			    }

			    var overrideContext = void 0;
			    if (this.view !== null) {
			      if (skipSelfSubscriber) {
			        this.view.viewModelScope = scope;
			      }

			      if (this.viewModel === scope.overrideContext.bindingContext) {
			        overrideContext = scope.overrideContext;
			      } else if (this.instruction.inheritBindingContext) {
			        overrideContext = (0, aureliaBinding.createOverrideContext)(this.viewModel, scope.overrideContext);
			      } else {
			        overrideContext = (0, aureliaBinding.createOverrideContext)(this.viewModel);
			        overrideContext.__parentOverrideContext = scope.overrideContext;
			      }

			      this.view.bind(this.viewModel, overrideContext);
			    } else if (skipSelfSubscriber) {
			      overrideContext = scope.overrideContext;

			      if (scope.overrideContext.__parentOverrideContext !== undefined && this.viewModel.viewFactory && this.viewModel.viewFactory.factoryCreateInstruction.partReplacements) {
			        overrideContext = Object.assign({}, scope.overrideContext);
			        overrideContext.parentOverrideContext = scope.overrideContext.__parentOverrideContext;
			      }
			      this.viewModel.bind(scope.bindingContext, overrideContext);
			    }
			  };

			  Controller.prototype.unbind = function unbind() {
			    if (this.isBound) {
			      var _boundProperties = this.boundProperties;
			      var _i2 = void 0;
			      var _ii2 = void 0;

			      this.isBound = false;
			      this.scope = null;

			      if (this.view !== null) {
			        this.view.unbind();
			      }

			      if (this.behavior.handlesUnbind) {
			        this.viewModel.unbind();
			      }

			      if (this.elementEvents !== null) {
			        this.elementEvents.disposeAll();
			      }

			      for (_i2 = 0, _ii2 = _boundProperties.length; _i2 < _ii2; ++_i2) {
			        _boundProperties[_i2].binding.unbind();
			      }
			    }
			  };

			  Controller.prototype.attached = function attached() {
			    if (this.isAttached) {
			      return;
			    }

			    this.isAttached = true;

			    if (this.behavior.handlesAttached) {
			      this.viewModel.attached();
			    }

			    if (this.view !== null) {
			      this.view.attached();
			    }
			  };

			  Controller.prototype.detached = function detached() {
			    if (this.isAttached) {
			      this.isAttached = false;

			      if (this.view !== null) {
			        this.view.detached();
			      }

			      if (this.behavior.handlesDetached) {
			        this.viewModel.detached();
			      }
			    }
			  };

			  return Controller;
			}();

			var BehaviorPropertyObserver = exports.BehaviorPropertyObserver = (_dec9 = (0, aureliaBinding.subscriberCollection)(), _dec9(_class16 = function () {
			  function BehaviorPropertyObserver(taskQueue, obj, propertyName, selfSubscriber, initialValue) {
			    

			    this.taskQueue = taskQueue;
			    this.obj = obj;
			    this.propertyName = propertyName;
			    this.notqueued = true;
			    this.publishing = false;
			    this.selfSubscriber = selfSubscriber;
			    this.currentValue = this.oldValue = initialValue;
			  }

			  BehaviorPropertyObserver.prototype.getValue = function getValue() {
			    return this.currentValue;
			  };

			  BehaviorPropertyObserver.prototype.setValue = function setValue(newValue) {
			    var oldValue = this.currentValue;

			    if (oldValue !== newValue) {
			      this.oldValue = oldValue;
			      this.currentValue = newValue;

			      if (this.publishing && this.notqueued) {
			        if (this.taskQueue.flushing) {
			          this.call();
			        } else {
			          this.notqueued = false;
			          this.taskQueue.queueMicroTask(this);
			        }
			      }
			    }
			  };

			  BehaviorPropertyObserver.prototype.call = function call() {
			    var oldValue = this.oldValue;
			    var newValue = this.currentValue;

			    this.notqueued = true;

			    if (newValue === oldValue) {
			      return;
			    }

			    if (this.selfSubscriber) {
			      this.selfSubscriber(newValue, oldValue);
			    }

			    this.callSubscribers(newValue, oldValue);
			    this.oldValue = newValue;
			  };

			  BehaviorPropertyObserver.prototype.subscribe = function subscribe(context, callable) {
			    this.addSubscriber(context, callable);
			  };

			  BehaviorPropertyObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
			    this.removeSubscriber(context, callable);
			  };

			  return BehaviorPropertyObserver;
			}()) || _class16);


			function getObserver(instance, name) {
			  var lookup = instance.__observers__;

			  if (lookup === undefined) {
			    var ctor = Object.getPrototypeOf(instance).constructor;
			    var _behavior = aureliaMetadata.metadata.get(aureliaMetadata.metadata.resource, ctor);
			    if (!_behavior.isInitialized) {
			      _behavior.initialize(aureliaDependencyInjection.Container.instance || new aureliaDependencyInjection.Container(), instance.constructor);
			    }

			    lookup = _behavior.observerLocator.getOrCreateObserversLookup(instance);
			    _behavior._ensurePropertiesDefined(instance, lookup);
			  }

			  return lookup[name];
			}

			var BindableProperty = exports.BindableProperty = function () {
			  function BindableProperty(nameOrConfig) {
			    

			    if (typeof nameOrConfig === 'string') {
			      this.name = nameOrConfig;
			    } else {
			      Object.assign(this, nameOrConfig);
			    }

			    this.attribute = this.attribute || _hyphenate(this.name);
			    if (this.defaultBindingMode === null || this.defaultBindingMode === undefined) {
			      this.defaultBindingMode = aureliaBinding.bindingMode.oneWay;
			    }
			    this.changeHandler = this.changeHandler || null;
			    this.owner = null;
			    this.descriptor = null;
			  }

			  BindableProperty.prototype.registerWith = function registerWith(target, behavior, descriptor) {
			    behavior.properties.push(this);
			    behavior.attributes[this.attribute] = this;
			    this.owner = behavior;

			    if (descriptor) {
			      this.descriptor = descriptor;
			      return this._configureDescriptor(descriptor);
			    }

			    return undefined;
			  };

			  BindableProperty.prototype._configureDescriptor = function _configureDescriptor(descriptor) {
			    var name = this.name;

			    descriptor.configurable = true;
			    descriptor.enumerable = true;

			    if ('initializer' in descriptor) {
			      this.defaultValue = descriptor.initializer;
			      delete descriptor.initializer;
			      delete descriptor.writable;
			    }

			    if ('value' in descriptor) {
			      this.defaultValue = descriptor.value;
			      delete descriptor.value;
			      delete descriptor.writable;
			    }

			    descriptor.get = function () {
			      return getObserver(this, name).getValue();
			    };

			    descriptor.set = function (value) {
			      getObserver(this, name).setValue(value);
			    };

			    descriptor.get.getObserver = function (obj) {
			      return getObserver(obj, name);
			    };

			    return descriptor;
			  };

			  BindableProperty.prototype.defineOn = function defineOn(target, behavior) {
			    var name = this.name;
			    var handlerName = void 0;

			    if (this.changeHandler === null) {
			      handlerName = name + 'Changed';
			      if (handlerName in target.prototype) {
			        this.changeHandler = handlerName;
			      }
			    }

			    if (this.descriptor === null) {
			      Object.defineProperty(target.prototype, name, this._configureDescriptor(behavior, {}));
			    }
			  };

			  BindableProperty.prototype.createObserver = function createObserver(viewModel) {
			    var selfSubscriber = null;
			    var defaultValue = this.defaultValue;
			    var changeHandlerName = this.changeHandler;
			    var name = this.name;
			    var initialValue = void 0;

			    if (this.hasOptions) {
			      return undefined;
			    }

			    if (changeHandlerName in viewModel) {
			      if ('propertyChanged' in viewModel) {
			        selfSubscriber = function selfSubscriber(newValue, oldValue) {
			          viewModel[changeHandlerName](newValue, oldValue);
			          viewModel.propertyChanged(name, newValue, oldValue);
			        };
			      } else {
			        selfSubscriber = function selfSubscriber(newValue, oldValue) {
			          return viewModel[changeHandlerName](newValue, oldValue);
			        };
			      }
			    } else if ('propertyChanged' in viewModel) {
			      selfSubscriber = function selfSubscriber(newValue, oldValue) {
			        return viewModel.propertyChanged(name, newValue, oldValue);
			      };
			    } else if (changeHandlerName !== null) {
			      throw new Error('Change handler ' + changeHandlerName + ' was specified but not declared on the class.');
			    }

			    if (defaultValue !== undefined) {
			      initialValue = typeof defaultValue === 'function' ? defaultValue.call(viewModel) : defaultValue;
			    }

			    return new BehaviorPropertyObserver(this.owner.taskQueue, viewModel, this.name, selfSubscriber, initialValue);
			  };

			  BindableProperty.prototype._initialize = function _initialize(viewModel, observerLookup, attributes, behaviorHandlesBind, boundProperties) {
			    var selfSubscriber = void 0;
			    var observer = void 0;
			    var attribute = void 0;
			    var defaultValue = this.defaultValue;

			    if (this.isDynamic) {
			      for (var key in attributes) {
			        this._createDynamicProperty(viewModel, observerLookup, behaviorHandlesBind, key, attributes[key], boundProperties);
			      }
			    } else if (!this.hasOptions) {
			      observer = observerLookup[this.name];

			      if (attributes !== null) {
			        selfSubscriber = observer.selfSubscriber;
			        attribute = attributes[this.attribute];

			        if (behaviorHandlesBind) {
			          observer.selfSubscriber = null;
			        }

			        if (typeof attribute === 'string') {
			          viewModel[this.name] = attribute;
			          observer.call();
			        } else if (attribute) {
			          boundProperties.push({ observer: observer, binding: attribute.createBinding(viewModel) });
			        } else if (defaultValue !== undefined) {
			          observer.call();
			        }

			        observer.selfSubscriber = selfSubscriber;
			      }

			      observer.publishing = true;
			    }
			  };

			  BindableProperty.prototype._createDynamicProperty = function _createDynamicProperty(viewModel, observerLookup, behaviorHandlesBind, name, attribute, boundProperties) {
			    var changeHandlerName = name + 'Changed';
			    var selfSubscriber = null;
			    var observer = void 0;
			    var info = void 0;

			    if (changeHandlerName in viewModel) {
			      if ('propertyChanged' in viewModel) {
			        selfSubscriber = function selfSubscriber(newValue, oldValue) {
			          viewModel[changeHandlerName](newValue, oldValue);
			          viewModel.propertyChanged(name, newValue, oldValue);
			        };
			      } else {
			        selfSubscriber = function selfSubscriber(newValue, oldValue) {
			          return viewModel[changeHandlerName](newValue, oldValue);
			        };
			      }
			    } else if ('propertyChanged' in viewModel) {
			      selfSubscriber = function selfSubscriber(newValue, oldValue) {
			        return viewModel.propertyChanged(name, newValue, oldValue);
			      };
			    }

			    observer = observerLookup[name] = new BehaviorPropertyObserver(this.owner.taskQueue, viewModel, name, selfSubscriber);

			    Object.defineProperty(viewModel, name, {
			      configurable: true,
			      enumerable: true,
			      get: observer.getValue.bind(observer),
			      set: observer.setValue.bind(observer)
			    });

			    if (behaviorHandlesBind) {
			      observer.selfSubscriber = null;
			    }

			    if (typeof attribute === 'string') {
			      viewModel[name] = attribute;
			      observer.call();
			    } else if (attribute) {
			      info = { observer: observer, binding: attribute.createBinding(viewModel) };
			      boundProperties.push(info);
			    }

			    observer.publishing = true;
			    observer.selfSubscriber = selfSubscriber;
			  };

			  return BindableProperty;
			}();

			var lastProviderId = 0;

			function nextProviderId() {
			  return ++lastProviderId;
			}

			function doProcessContent() {
			  return true;
			}
			function doProcessAttributes() {}

			var HtmlBehaviorResource = exports.HtmlBehaviorResource = function () {
			  function HtmlBehaviorResource() {
			    

			    this.elementName = null;
			    this.attributeName = null;
			    this.attributeDefaultBindingMode = undefined;
			    this.liftsContent = false;
			    this.targetShadowDOM = false;
			    this.shadowDOMOptions = null;
			    this.processAttributes = doProcessAttributes;
			    this.processContent = doProcessContent;
			    this.usesShadowDOM = false;
			    this.childBindings = null;
			    this.hasDynamicOptions = false;
			    this.containerless = false;
			    this.properties = [];
			    this.attributes = {};
			    this.isInitialized = false;
			    this.primaryProperty = null;
			  }

			  HtmlBehaviorResource.convention = function convention(name, existing) {
			    var behavior = void 0;

			    if (name.endsWith('CustomAttribute')) {
			      behavior = existing || new HtmlBehaviorResource();
			      behavior.attributeName = _hyphenate(name.substring(0, name.length - 15));
			    }

			    if (name.endsWith('CustomElement')) {
			      behavior = existing || new HtmlBehaviorResource();
			      behavior.elementName = _hyphenate(name.substring(0, name.length - 13));
			    }

			    return behavior;
			  };

			  HtmlBehaviorResource.prototype.addChildBinding = function addChildBinding(behavior) {
			    if (this.childBindings === null) {
			      this.childBindings = [];
			    }

			    this.childBindings.push(behavior);
			  };

			  HtmlBehaviorResource.prototype.initialize = function initialize(container, target) {
			    var proto = target.prototype;
			    var properties = this.properties;
			    var attributeName = this.attributeName;
			    var attributeDefaultBindingMode = this.attributeDefaultBindingMode;
			    var i = void 0;
			    var ii = void 0;
			    var current = void 0;

			    if (this.isInitialized) {
			      return;
			    }

			    this.isInitialized = true;
			    target.__providerId__ = nextProviderId();

			    this.observerLocator = container.get(aureliaBinding.ObserverLocator);
			    this.taskQueue = container.get(aureliaTaskQueue.TaskQueue);

			    this.target = target;
			    this.usesShadowDOM = this.targetShadowDOM && aureliaPal.FEATURE.shadowDOM;
			    this.handlesCreated = 'created' in proto;
			    this.handlesBind = 'bind' in proto;
			    this.handlesUnbind = 'unbind' in proto;
			    this.handlesAttached = 'attached' in proto;
			    this.handlesDetached = 'detached' in proto;
			    this.htmlName = this.elementName || this.attributeName;

			    if (attributeName !== null) {
			      if (properties.length === 0) {
			        new BindableProperty({
			          name: 'value',
			          changeHandler: 'valueChanged' in proto ? 'valueChanged' : null,
			          attribute: attributeName,
			          defaultBindingMode: attributeDefaultBindingMode
			        }).registerWith(target, this);
			      }

			      current = properties[0];

			      if (properties.length === 1 && current.name === 'value') {
			        current.isDynamic = current.hasOptions = this.hasDynamicOptions;
			        current.defineOn(target, this);
			      } else {
			        for (i = 0, ii = properties.length; i < ii; ++i) {
			          properties[i].defineOn(target, this);
			          if (properties[i].primaryProperty) {
			            if (this.primaryProperty) {
			              throw new Error('Only one bindable property on a custom element can be defined as the default');
			            }
			            this.primaryProperty = properties[i];
			          }
			        }

			        current = new BindableProperty({
			          name: 'value',
			          changeHandler: 'valueChanged' in proto ? 'valueChanged' : null,
			          attribute: attributeName,
			          defaultBindingMode: attributeDefaultBindingMode
			        });

			        current.hasOptions = true;
			        current.registerWith(target, this);
			      }
			    } else {
			      for (i = 0, ii = properties.length; i < ii; ++i) {
			        properties[i].defineOn(target, this);
			      }

			      this._copyInheritedProperties(container, target);
			    }
			  };

			  HtmlBehaviorResource.prototype.register = function register(registry, name) {
			    var _this11 = this;

			    if (this.attributeName !== null) {
			      registry.registerAttribute(name || this.attributeName, this, this.attributeName);

			      if (Array.isArray(this.aliases)) {
			        this.aliases.forEach(function (alias) {
			          registry.registerAttribute(alias, _this11, _this11.attributeName);
			        });
			      }
			    }

			    if (this.elementName !== null) {
			      registry.registerElement(name || this.elementName, this);
			    }
			  };

			  HtmlBehaviorResource.prototype.load = function load(container, target, loadContext, viewStrategy, transientView) {
			    var _this12 = this;

			    var options = void 0;

			    if (this.elementName !== null) {
			      viewStrategy = container.get(ViewLocator).getViewStrategy(viewStrategy || this.viewStrategy || target);
			      options = new ViewCompileInstruction(this.targetShadowDOM, true);

			      if (!viewStrategy.moduleId) {
			        viewStrategy.moduleId = aureliaMetadata.Origin.get(target).moduleId;
			      }

			      return viewStrategy.loadViewFactory(container.get(ViewEngine), options, loadContext, target).then(function (viewFactory) {
			        if (!transientView || !_this12.viewFactory) {
			          _this12.viewFactory = viewFactory;
			        }

			        return viewFactory;
			      });
			    }

			    return Promise.resolve(this);
			  };

			  HtmlBehaviorResource.prototype.compile = function compile(compiler, resources, node, instruction, parentNode) {
			    if (this.liftsContent) {
			      if (!instruction.viewFactory) {
			        var template = aureliaPal.DOM.createElement('template');
			        var fragment = aureliaPal.DOM.createDocumentFragment();
			        var cacheSize = node.getAttribute('view-cache');
			        var part = node.getAttribute('part');

			        node.removeAttribute(instruction.originalAttrName);
			        aureliaPal.DOM.replaceNode(template, node, parentNode);
			        fragment.appendChild(node);
			        instruction.viewFactory = compiler.compile(fragment, resources);

			        if (part) {
			          instruction.viewFactory.part = part;
			          node.removeAttribute('part');
			        }

			        if (cacheSize) {
			          instruction.viewFactory.setCacheSize(cacheSize);
			          node.removeAttribute('view-cache');
			        }

			        node = template;
			      }
			    } else if (this.elementName !== null) {
			      var _partReplacements2 = {};

			      if (this.processContent(compiler, resources, node, instruction) && node.hasChildNodes()) {
			        var currentChild = node.firstChild;
			        var contentElement = this.usesShadowDOM ? null : aureliaPal.DOM.createElement('au-content');
			        var nextSibling = void 0;
			        var toReplace = void 0;

			        while (currentChild) {
			          nextSibling = currentChild.nextSibling;

			          if (currentChild.tagName === 'TEMPLATE' && (toReplace = currentChild.getAttribute('replace-part'))) {
			            _partReplacements2[toReplace] = compiler.compile(currentChild, resources);
			            aureliaPal.DOM.removeNode(currentChild, parentNode);
			            instruction.partReplacements = _partReplacements2;
			          } else if (contentElement !== null) {
			            if (currentChild.nodeType === 3 && _isAllWhitespace(currentChild)) {
			              aureliaPal.DOM.removeNode(currentChild, parentNode);
			            } else {
			              contentElement.appendChild(currentChild);
			            }
			          }

			          currentChild = nextSibling;
			        }

			        if (contentElement !== null && contentElement.hasChildNodes()) {
			          node.appendChild(contentElement);
			        }

			        instruction.skipContentProcessing = false;
			      } else {
			        instruction.skipContentProcessing = true;
			      }
			    } else if (!this.processContent(compiler, resources, node, instruction)) {
			      instruction.skipContentProcessing = true;
			    }

			    return node;
			  };

			  HtmlBehaviorResource.prototype.create = function create(container, instruction, element, bindings) {
			    var viewHost = void 0;
			    var au = null;

			    instruction = instruction || BehaviorInstruction.normal;
			    element = element || null;
			    bindings = bindings || null;

			    if (this.elementName !== null && element) {
			      if (this.usesShadowDOM) {
			        viewHost = element.attachShadow(this.shadowDOMOptions);
			        container.registerInstance(aureliaPal.DOM.boundary, viewHost);
			      } else {
			        viewHost = element;
			        if (this.targetShadowDOM) {
			          container.registerInstance(aureliaPal.DOM.boundary, viewHost);
			        }
			      }
			    }

			    if (element !== null) {
			      element.au = au = element.au || {};
			    }

			    var viewModel = instruction.viewModel || container.get(this.target);
			    var controller = new Controller(this, instruction, viewModel, container);
			    var childBindings = this.childBindings;
			    var viewFactory = void 0;

			    if (this.liftsContent) {
			      au.controller = controller;
			    } else if (this.elementName !== null) {
			      viewFactory = instruction.viewFactory || this.viewFactory;
			      container.viewModel = viewModel;

			      if (viewFactory) {
			        controller.view = viewFactory.create(container, instruction, element);
			      }

			      if (element !== null) {
			        au.controller = controller;

			        if (controller.view) {
			          if (!this.usesShadowDOM && (element.childNodes.length === 1 || element.contentElement)) {
			            var contentElement = element.childNodes[0] || element.contentElement;
			            controller.view.contentView = { fragment: contentElement };
			            contentElement.parentNode && aureliaPal.DOM.removeNode(contentElement);
			          }

			          if (instruction.anchorIsContainer) {
			            if (childBindings !== null) {
			              for (var _i3 = 0, _ii3 = childBindings.length; _i3 < _ii3; ++_i3) {
			                controller.view.addBinding(childBindings[_i3].create(element, viewModel, controller));
			              }
			            }

			            controller.view.appendNodesTo(viewHost);
			          } else {
			            controller.view.insertNodesBefore(viewHost);
			          }
			        } else if (childBindings !== null) {
			          for (var _i4 = 0, _ii4 = childBindings.length; _i4 < _ii4; ++_i4) {
			            bindings.push(childBindings[_i4].create(element, viewModel, controller));
			          }
			        }
			      } else if (controller.view) {
			        controller.view.controller = controller;

			        if (childBindings !== null) {
			          for (var _i5 = 0, _ii5 = childBindings.length; _i5 < _ii5; ++_i5) {
			            controller.view.addBinding(childBindings[_i5].create(instruction.host, viewModel, controller));
			          }
			        }
			      } else if (childBindings !== null) {
			        for (var _i6 = 0, _ii6 = childBindings.length; _i6 < _ii6; ++_i6) {
			          bindings.push(childBindings[_i6].create(instruction.host, viewModel, controller));
			        }
			      }
			    } else if (childBindings !== null) {
			      for (var _i7 = 0, _ii7 = childBindings.length; _i7 < _ii7; ++_i7) {
			        bindings.push(childBindings[_i7].create(element, viewModel, controller));
			      }
			    }

			    if (au !== null) {
			      au[this.htmlName] = controller;
			    }

			    if (instruction.initiatedByBehavior && viewFactory) {
			      controller.view.created();
			    }

			    return controller;
			  };

			  HtmlBehaviorResource.prototype._ensurePropertiesDefined = function _ensurePropertiesDefined(instance, lookup) {
			    var properties = void 0;
			    var i = void 0;
			    var ii = void 0;
			    var observer = void 0;

			    if ('__propertiesDefined__' in lookup) {
			      return;
			    }

			    lookup.__propertiesDefined__ = true;
			    properties = this.properties;

			    for (i = 0, ii = properties.length; i < ii; ++i) {
			      observer = properties[i].createObserver(instance);

			      if (observer !== undefined) {
			        lookup[observer.propertyName] = observer;
			      }
			    }
			  };

			  HtmlBehaviorResource.prototype._copyInheritedProperties = function _copyInheritedProperties(container, target) {
			    var _this13 = this;

			    var behavior = void 0;
			    var derived = target;

			    while (true) {
			      var proto = Object.getPrototypeOf(target.prototype);
			      target = proto && proto.constructor;
			      if (!target) {
			        return;
			      }
			      behavior = aureliaMetadata.metadata.getOwn(aureliaMetadata.metadata.resource, target);
			      if (behavior) {
			        break;
			      }
			    }
			    behavior.initialize(container, target);

			    var _loop = function _loop(_i8, _ii8) {
			      var prop = behavior.properties[_i8];

			      if (_this13.properties.some(function (p) {
			        return p.name === prop.name;
			      })) {
			        return 'continue';
			      }

			      new BindableProperty(prop).registerWith(derived, _this13);
			    };

			    for (var _i8 = 0, _ii8 = behavior.properties.length; _i8 < _ii8; ++_i8) {
			      var _ret = _loop(_i8, _ii8);

			      if (_ret === 'continue') continue;
			    }
			  };

			  return HtmlBehaviorResource;
			}();

			function createChildObserverDecorator(selectorOrConfig, all) {
			  return function (target, key, descriptor) {
			    var actualTarget = typeof key === 'string' ? target.constructor : target;
			    var r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, HtmlBehaviorResource, actualTarget);

			    if (typeof selectorOrConfig === 'string') {
			      selectorOrConfig = {
			        selector: selectorOrConfig,
			        name: key
			      };
			    }

			    if (descriptor) {
			      descriptor.writable = true;
			      descriptor.configurable = true;
			    }

			    selectorOrConfig.all = all;
			    r.addChildBinding(new ChildObserver(selectorOrConfig));
			  };
			}

			function children(selectorOrConfig) {
			  return createChildObserverDecorator(selectorOrConfig, true);
			}

			function child(selectorOrConfig) {
			  return createChildObserverDecorator(selectorOrConfig, false);
			}

			var ChildObserver = function () {
			  function ChildObserver(config) {
			    

			    this.name = config.name;
			    this.changeHandler = config.changeHandler || this.name + 'Changed';
			    this.selector = config.selector;
			    this.all = config.all;
			  }

			  ChildObserver.prototype.create = function create(viewHost, viewModel, controller) {
			    return new ChildObserverBinder(this.selector, viewHost, this.name, viewModel, controller, this.changeHandler, this.all);
			  };

			  return ChildObserver;
			}();

			var noMutations = [];

			function trackMutation(groupedMutations, binder, record) {
			  var mutations = groupedMutations.get(binder);

			  if (!mutations) {
			    mutations = [];
			    groupedMutations.set(binder, mutations);
			  }

			  mutations.push(record);
			}

			function onChildChange(mutations, observer) {
			  var binders = observer.binders;
			  var bindersLength = binders.length;
			  var groupedMutations = new Map();

			  for (var _i9 = 0, _ii9 = mutations.length; _i9 < _ii9; ++_i9) {
			    var record = mutations[_i9];
			    var added = record.addedNodes;
			    var removed = record.removedNodes;

			    for (var j = 0, jj = removed.length; j < jj; ++j) {
			      var node = removed[j];
			      if (node.nodeType === 1) {
			        for (var k = 0; k < bindersLength; ++k) {
			          var binder = binders[k];
			          if (binder.onRemove(node)) {
			            trackMutation(groupedMutations, binder, record);
			          }
			        }
			      }
			    }

			    for (var _j = 0, _jj = added.length; _j < _jj; ++_j) {
			      var _node = added[_j];
			      if (_node.nodeType === 1) {
			        for (var _k = 0; _k < bindersLength; ++_k) {
			          var _binder = binders[_k];
			          if (_binder.onAdd(_node)) {
			            trackMutation(groupedMutations, _binder, record);
			          }
			        }
			      }
			    }
			  }

			  groupedMutations.forEach(function (value, key) {
			    if (key.changeHandler !== null) {
			      key.viewModel[key.changeHandler](value);
			    }
			  });
			}

			var ChildObserverBinder = function () {
			  function ChildObserverBinder(selector, viewHost, property, viewModel, controller, changeHandler, all) {
			    

			    this.selector = selector;
			    this.viewHost = viewHost;
			    this.property = property;
			    this.viewModel = viewModel;
			    this.controller = controller;
			    this.changeHandler = changeHandler in viewModel ? changeHandler : null;
			    this.usesShadowDOM = controller.behavior.usesShadowDOM;
			    this.all = all;

			    if (!this.usesShadowDOM && controller.view && controller.view.contentView) {
			      this.contentView = controller.view.contentView;
			    } else {
			      this.contentView = null;
			    }
			  }

			  ChildObserverBinder.prototype.matches = function matches(element) {
			    if (element.matches(this.selector)) {
			      if (this.contentView === null) {
			        return true;
			      }

			      var contentView = this.contentView;
			      var assignedSlot = element.auAssignedSlot;

			      if (assignedSlot && assignedSlot.projectFromAnchors) {
			        var anchors = assignedSlot.projectFromAnchors;

			        for (var _i10 = 0, _ii10 = anchors.length; _i10 < _ii10; ++_i10) {
			          if (anchors[_i10].auOwnerView === contentView) {
			            return true;
			          }
			        }

			        return false;
			      }

			      return element.auOwnerView === contentView;
			    }

			    return false;
			  };

			  ChildObserverBinder.prototype.bind = function bind(source) {
			    var viewHost = this.viewHost;
			    var viewModel = this.viewModel;
			    var observer = viewHost.__childObserver__;

			    if (!observer) {
			      observer = viewHost.__childObserver__ = aureliaPal.DOM.createMutationObserver(onChildChange);

			      var options = {
			        childList: true,
			        subtree: !this.usesShadowDOM
			      };

			      observer.observe(viewHost, options);
			      observer.binders = [];
			    }

			    observer.binders.push(this);

			    if (this.usesShadowDOM) {
			      var current = viewHost.firstElementChild;

			      if (this.all) {
			        var items = viewModel[this.property];
			        if (!items) {
			          items = viewModel[this.property] = [];
			        } else {
			          items.length = 0;
			        }

			        while (current) {
			          if (this.matches(current)) {
			            items.push(current.au && current.au.controller ? current.au.controller.viewModel : current);
			          }

			          current = current.nextElementSibling;
			        }

			        if (this.changeHandler !== null) {
			          this.viewModel[this.changeHandler](noMutations);
			        }
			      } else {
			        while (current) {
			          if (this.matches(current)) {
			            var value = current.au && current.au.controller ? current.au.controller.viewModel : current;
			            this.viewModel[this.property] = value;

			            if (this.changeHandler !== null) {
			              this.viewModel[this.changeHandler](value);
			            }

			            break;
			          }

			          current = current.nextElementSibling;
			        }
			      }
			    }
			  };

			  ChildObserverBinder.prototype.onRemove = function onRemove(element) {
			    if (this.matches(element)) {
			      var value = element.au && element.au.controller ? element.au.controller.viewModel : element;

			      if (this.all) {
			        var items = this.viewModel[this.property] || (this.viewModel[this.property] = []);
			        var index = items.indexOf(value);

			        if (index !== -1) {
			          items.splice(index, 1);
			        }

			        return true;
			      }

			      return false;
			    }

			    return false;
			  };

			  ChildObserverBinder.prototype.onAdd = function onAdd(element) {
			    if (this.matches(element)) {
			      var value = element.au && element.au.controller ? element.au.controller.viewModel : element;

			      if (this.all) {
			        var items = this.viewModel[this.property] || (this.viewModel[this.property] = []);

			        if (this.selector === '*') {
			          items.push(value);
			          return true;
			        }

			        var index = 0;
			        var prev = element.previousElementSibling;

			        while (prev) {
			          if (this.matches(prev)) {
			            index++;
			          }

			          prev = prev.previousElementSibling;
			        }

			        items.splice(index, 0, value);
			        return true;
			      }

			      this.viewModel[this.property] = value;

			      if (this.changeHandler !== null) {
			        this.viewModel[this.changeHandler](value);
			      }
			    }

			    return false;
			  };

			  ChildObserverBinder.prototype.unbind = function unbind() {
			    if (this.viewHost.__childObserver__) {
			      this.viewHost.__childObserver__.disconnect();
			      this.viewHost.__childObserver__ = null;
			    }
			  };

			  return ChildObserverBinder;
			}();

			function remove(viewSlot, previous) {
			  return Array.isArray(previous) ? viewSlot.removeMany(previous, true) : viewSlot.remove(previous, true);
			}

			var SwapStrategies = exports.SwapStrategies = {
			  before: function before(viewSlot, previous, callback) {
			    return previous === undefined ? callback() : callback().then(function () {
			      return remove(viewSlot, previous);
			    });
			  },
			  with: function _with(viewSlot, previous, callback) {
			    return previous === undefined ? callback() : Promise.all([remove(viewSlot, previous), callback()]);
			  },
			  after: function after(viewSlot, previous, callback) {
			    return Promise.resolve(viewSlot.removeAll(true)).then(callback);
			  }
			};

			function tryActivateViewModel(context) {
			  if (context.skipActivation || typeof context.viewModel.activate !== 'function') {
			    return Promise.resolve();
			  }

			  return context.viewModel.activate(context.model) || Promise.resolve();
			}

			var CompositionEngine = exports.CompositionEngine = (_dec10 = (0, aureliaDependencyInjection.inject)(ViewEngine, ViewLocator), _dec10(_class17 = function () {
			  function CompositionEngine(viewEngine, viewLocator) {
			    

			    this.viewEngine = viewEngine;
			    this.viewLocator = viewLocator;
			  }

			  CompositionEngine.prototype._swap = function _swap(context, view) {
			    var swapStrategy = SwapStrategies[context.swapOrder] || SwapStrategies.after;
			    var previousViews = context.viewSlot.children.slice();

			    return swapStrategy(context.viewSlot, previousViews, function () {
			      return Promise.resolve(context.viewSlot.add(view)).then(function () {
			        if (context.currentController) {
			          context.currentController.unbind();
			        }
			      });
			    }).then(function () {
			      if (context.compositionTransactionNotifier) {
			        context.compositionTransactionNotifier.done();
			      }
			    });
			  };

			  CompositionEngine.prototype._createControllerAndSwap = function _createControllerAndSwap(context) {
			    var _this14 = this;

			    return this.createController(context).then(function (controller) {
			      controller.automate(context.overrideContext, context.owningView);

			      if (context.compositionTransactionOwnershipToken) {
			        return context.compositionTransactionOwnershipToken.waitForCompositionComplete().then(function () {
			          return _this14._swap(context, controller.view);
			        }).then(function () {
			          return controller;
			        });
			      }

			      return _this14._swap(context, controller.view).then(function () {
			        return controller;
			      });
			    });
			  };

			  CompositionEngine.prototype.createController = function createController(context) {
			    var _this15 = this;

			    var childContainer = void 0;
			    var viewModel = void 0;
			    var viewModelResource = void 0;
			    var m = void 0;

			    return this.ensureViewModel(context).then(tryActivateViewModel).then(function () {
			      childContainer = context.childContainer;
			      viewModel = context.viewModel;
			      viewModelResource = context.viewModelResource;
			      m = viewModelResource.metadata;

			      var viewStrategy = _this15.viewLocator.getViewStrategy(context.view || viewModel);

			      if (context.viewResources) {
			        viewStrategy.makeRelativeTo(context.viewResources.viewUrl);
			      }

			      return m.load(childContainer, viewModelResource.value, null, viewStrategy, true);
			    }).then(function (viewFactory) {
			      return m.create(childContainer, BehaviorInstruction.dynamic(context.host, viewModel, viewFactory));
			    });
			  };

			  CompositionEngine.prototype.ensureViewModel = function ensureViewModel(context) {
			    var childContainer = context.childContainer = context.childContainer || context.container.createChild();

			    if (typeof context.viewModel === 'string') {
			      context.viewModel = context.viewResources ? context.viewResources.relativeToView(context.viewModel) : context.viewModel;

			      return this.viewEngine.importViewModelResource(context.viewModel).then(function (viewModelResource) {
			        childContainer.autoRegister(viewModelResource.value);

			        if (context.host) {
			          childContainer.registerInstance(aureliaPal.DOM.Element, context.host);
			        }

			        context.viewModel = childContainer.viewModel = childContainer.get(viewModelResource.value);
			        context.viewModelResource = viewModelResource;
			        return context;
			      });
			    }

			    var m = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, HtmlBehaviorResource, context.viewModel.constructor);
			    m.elementName = m.elementName || 'dynamic-element';
			    m.initialize(context.container || childContainer, context.viewModel.constructor);
			    context.viewModelResource = { metadata: m, value: context.viewModel.constructor };
			    childContainer.viewModel = context.viewModel;
			    return Promise.resolve(context);
			  };

			  CompositionEngine.prototype.compose = function compose(context) {
			    var _this16 = this;

			    context.childContainer = context.childContainer || context.container.createChild();
			    context.view = this.viewLocator.getViewStrategy(context.view);

			    var transaction = context.childContainer.get(CompositionTransaction);
			    var compositionTransactionOwnershipToken = transaction.tryCapture();

			    if (compositionTransactionOwnershipToken) {
			      context.compositionTransactionOwnershipToken = compositionTransactionOwnershipToken;
			    } else {
			      context.compositionTransactionNotifier = transaction.enlist();
			    }

			    if (context.viewModel) {
			      return this._createControllerAndSwap(context);
			    } else if (context.view) {
			      if (context.viewResources) {
			        context.view.makeRelativeTo(context.viewResources.viewUrl);
			      }

			      return context.view.loadViewFactory(this.viewEngine, new ViewCompileInstruction()).then(function (viewFactory) {
			        var result = viewFactory.create(context.childContainer);
			        result.bind(context.bindingContext, context.overrideContext);

			        if (context.compositionTransactionOwnershipToken) {
			          return context.compositionTransactionOwnershipToken.waitForCompositionComplete().then(function () {
			            return _this16._swap(context, result);
			          }).then(function () {
			            return result;
			          });
			        }

			        return _this16._swap(context, result).then(function () {
			          return result;
			        });
			      });
			    } else if (context.viewSlot) {
			      context.viewSlot.removeAll();

			      if (context.compositionTransactionNotifier) {
			        context.compositionTransactionNotifier.done();
			      }

			      return Promise.resolve(null);
			    }

			    return Promise.resolve(null);
			  };

			  return CompositionEngine;
			}()) || _class17);

			var ElementConfigResource = exports.ElementConfigResource = function () {
			  function ElementConfigResource() {
			    
			  }

			  ElementConfigResource.prototype.initialize = function initialize(container, target) {};

			  ElementConfigResource.prototype.register = function register(registry, name) {};

			  ElementConfigResource.prototype.load = function load(container, target) {
			    var config = new target();
			    var eventManager = container.get(aureliaBinding.EventManager);
			    eventManager.registerElementConfig(config);
			  };

			  return ElementConfigResource;
			}();

			function validateBehaviorName(name, type) {
			  if (/[A-Z]/.test(name)) {
			    var newName = _hyphenate(name);
			    LogManager.getLogger('templating').warn('\'' + name + '\' is not a valid ' + type + ' name and has been converted to \'' + newName + '\'. Upper-case letters are not allowed because the DOM is not case-sensitive.');
			    return newName;
			  }
			  return name;
			}

			function resource(instance) {
			  return function (target) {
			    aureliaMetadata.metadata.define(aureliaMetadata.metadata.resource, instance, target);
			  };
			}

			function behavior(override) {
			  return function (target) {
			    if (override instanceof HtmlBehaviorResource) {
			      aureliaMetadata.metadata.define(aureliaMetadata.metadata.resource, override, target);
			    } else {
			      var r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, HtmlBehaviorResource, target);
			      Object.assign(r, override);
			    }
			  };
			}

			function customElement(name) {
			  return function (target) {
			    var r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, HtmlBehaviorResource, target);
			    r.elementName = validateBehaviorName(name, 'custom element');
			  };
			}

			function customAttribute(name, defaultBindingMode, aliases) {
			  return function (target) {
			    var r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, HtmlBehaviorResource, target);
			    r.attributeName = validateBehaviorName(name, 'custom attribute');
			    r.attributeDefaultBindingMode = defaultBindingMode;
			    r.aliases = aliases;
			  };
			}

			function templateController(target) {
			  var deco = function deco(t) {
			    var r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
			    r.liftsContent = true;
			  };

			  return target ? deco(target) : deco;
			}

			function bindable(nameOrConfigOrTarget, key, descriptor) {
			  var deco = function deco(target, key2, descriptor2) {
			    var actualTarget = key2 ? target.constructor : target;
			    var r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, HtmlBehaviorResource, actualTarget);
			    var prop = void 0;

			    if (key2) {
			      nameOrConfigOrTarget = nameOrConfigOrTarget || {};
			      nameOrConfigOrTarget.name = key2;
			    }

			    prop = new BindableProperty(nameOrConfigOrTarget);
			    return prop.registerWith(actualTarget, r, descriptor2);
			  };

			  if (!nameOrConfigOrTarget) {
			    return deco;
			  }

			  if (key) {
			    var _target = nameOrConfigOrTarget;
			    nameOrConfigOrTarget = null;
			    return deco(_target, key, descriptor);
			  }

			  return deco;
			}

			function dynamicOptions(target) {
			  var deco = function deco(t) {
			    var r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
			    r.hasDynamicOptions = true;
			  };

			  return target ? deco(target) : deco;
			}

			var defaultShadowDOMOptions = { mode: 'open' };
			function useShadowDOM(targetOrOptions) {
			  var options = typeof targetOrOptions === 'function' || !targetOrOptions ? defaultShadowDOMOptions : targetOrOptions;

			  var deco = function deco(t) {
			    var r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
			    r.targetShadowDOM = true;
			    r.shadowDOMOptions = options;
			  };

			  return typeof targetOrOptions === 'function' ? deco(targetOrOptions) : deco;
			}

			function processAttributes(processor) {
			  return function (t) {
			    var r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
			    r.processAttributes = function (compiler, resources, node, attributes, elementInstruction) {
			      try {
			        processor(compiler, resources, node, attributes, elementInstruction);
			      } catch (error) {
			        LogManager.getLogger('templating').error(error);
			      }
			    };
			  };
			}

			function doNotProcessContent() {
			  return false;
			}

			function processContent(processor) {
			  return function (t) {
			    var r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
			    r.processContent = processor ? function (compiler, resources, node, instruction) {
			      try {
			        return processor(compiler, resources, node, instruction);
			      } catch (error) {
			        LogManager.getLogger('templating').error(error);
			        return false;
			      }
			    } : doNotProcessContent;
			  };
			}

			function containerless(target) {
			  var deco = function deco(t) {
			    var r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
			    r.containerless = true;
			  };

			  return target ? deco(target) : deco;
			}

			function useViewStrategy(strategy) {
			  return function (target) {
			    aureliaMetadata.metadata.define(ViewLocator.viewStrategyMetadataKey, strategy, target);
			  };
			}

			function useView(path) {
			  return useViewStrategy(new RelativeViewStrategy(path));
			}

			function inlineView(markup, dependencies, dependencyBaseUrl) {
			  return useViewStrategy(new InlineViewStrategy(markup, dependencies, dependencyBaseUrl));
			}

			function noView(targetOrDependencies, dependencyBaseUrl) {
			  var target = void 0;
			  var dependencies = void 0;
			  if (typeof targetOrDependencies === 'function') {
			    target = targetOrDependencies;
			  } else {
			    dependencies = targetOrDependencies;
			    target = undefined;
			  }

			  var deco = function deco(t) {
			    aureliaMetadata.metadata.define(ViewLocator.viewStrategyMetadataKey, new NoViewStrategy(dependencies, dependencyBaseUrl), t);
			  };

			  return target ? deco(target) : deco;
			}

			function elementConfig(target) {
			  var deco = function deco(t) {
			    aureliaMetadata.metadata.define(aureliaMetadata.metadata.resource, new ElementConfigResource(), t);
			  };

			  return target ? deco(target) : deco;
			}

			function viewResources() {
			  for (var _len = arguments.length, resources = Array(_len), _key = 0; _key < _len; _key++) {
			    resources[_key] = arguments[_key];
			  }

			  return function (target) {
			    aureliaMetadata.metadata.define(ViewEngine.viewModelRequireMetadataKey, resources, target);
			  };
			}

			var TemplatingEngine = exports.TemplatingEngine = (_dec11 = (0, aureliaDependencyInjection.inject)(aureliaDependencyInjection.Container, ModuleAnalyzer, ViewCompiler, CompositionEngine), _dec11(_class18 = function () {
			  function TemplatingEngine(container, moduleAnalyzer, viewCompiler, compositionEngine) {
			    

			    this._container = container;
			    this._moduleAnalyzer = moduleAnalyzer;
			    this._viewCompiler = viewCompiler;
			    this._compositionEngine = compositionEngine;
			    container.registerInstance(Animator, Animator.instance = new Animator());
			  }

			  TemplatingEngine.prototype.configureAnimator = function configureAnimator(animator) {
			    this._container.unregister(Animator);
			    this._container.registerInstance(Animator, Animator.instance = animator);
			  };

			  TemplatingEngine.prototype.compose = function compose(context) {
			    return this._compositionEngine.compose(context);
			  };

			  TemplatingEngine.prototype.enhance = function enhance(instruction) {
			    if (instruction instanceof aureliaPal.DOM.Element) {
			      instruction = { element: instruction };
			    }

			    var compilerInstructions = {};
			    var resources = instruction.resources || this._container.get(ViewResources);

			    this._viewCompiler._compileNode(instruction.element, resources, compilerInstructions, instruction.element.parentNode, 'root', true);

			    var factory = new ViewFactory(instruction.element, compilerInstructions, resources);
			    var container = instruction.container || this._container.createChild();
			    var view = factory.create(container, BehaviorInstruction.enhance());

			    view.bind(instruction.bindingContext || {}, instruction.overrideContext);

			    view.firstChild = view.lastChild = view.fragment;
			    view.fragment = aureliaPal.DOM.createDocumentFragment();
			    view.attached();

			    return view;
			  };

			  return TemplatingEngine;
			}()) || _class18);
			});

			unwrapExports(aureliaTemplating);
			var aureliaTemplating_1 = aureliaTemplating.TemplatingEngine;
			var aureliaTemplating_2 = aureliaTemplating.ElementConfigResource;
			var aureliaTemplating_3 = aureliaTemplating.CompositionEngine;
			var aureliaTemplating_4 = aureliaTemplating.SwapStrategies;
			var aureliaTemplating_5 = aureliaTemplating.HtmlBehaviorResource;
			var aureliaTemplating_6 = aureliaTemplating.BindableProperty;
			var aureliaTemplating_7 = aureliaTemplating.BehaviorPropertyObserver;
			var aureliaTemplating_8 = aureliaTemplating.Controller;
			var aureliaTemplating_9 = aureliaTemplating.ViewEngine;
			var aureliaTemplating_10 = aureliaTemplating.ModuleAnalyzer;
			var aureliaTemplating_11 = aureliaTemplating.ResourceDescription;
			var aureliaTemplating_12 = aureliaTemplating.ResourceModule;
			var aureliaTemplating_13 = aureliaTemplating.ViewCompiler;
			var aureliaTemplating_14 = aureliaTemplating.ViewFactory;
			var aureliaTemplating_15 = aureliaTemplating.BoundViewFactory;
			var aureliaTemplating_16 = aureliaTemplating.ViewSlot;
			var aureliaTemplating_17 = aureliaTemplating.View;
			var aureliaTemplating_18 = aureliaTemplating.ViewResources;
			var aureliaTemplating_19 = aureliaTemplating.ShadowDOM;
			var aureliaTemplating_20 = aureliaTemplating.ShadowSlot;
			var aureliaTemplating_21 = aureliaTemplating.PassThroughSlot;
			var aureliaTemplating_22 = aureliaTemplating.SlotCustomAttribute;
			var aureliaTemplating_23 = aureliaTemplating.BindingLanguage;
			var aureliaTemplating_24 = aureliaTemplating.ViewLocator;
			var aureliaTemplating_25 = aureliaTemplating.InlineViewStrategy;
			var aureliaTemplating_26 = aureliaTemplating.TemplateRegistryViewStrategy;
			var aureliaTemplating_27 = aureliaTemplating.NoViewStrategy;
			var aureliaTemplating_28 = aureliaTemplating.ConventionalViewStrategy;
			var aureliaTemplating_29 = aureliaTemplating.RelativeViewStrategy;
			var aureliaTemplating_30 = aureliaTemplating.viewStrategy;
			var aureliaTemplating_31 = aureliaTemplating.TargetInstruction;
			var aureliaTemplating_32 = aureliaTemplating.BehaviorInstruction;
			var aureliaTemplating_33 = aureliaTemplating.ViewCompileInstruction;
			var aureliaTemplating_34 = aureliaTemplating.ResourceLoadContext;
			var aureliaTemplating_35 = aureliaTemplating.ElementEvents;
			var aureliaTemplating_36 = aureliaTemplating.ViewEngineHooksResource;
			var aureliaTemplating_37 = aureliaTemplating.CompositionTransaction;
			var aureliaTemplating_38 = aureliaTemplating.CompositionTransactionOwnershipToken;
			var aureliaTemplating_39 = aureliaTemplating.CompositionTransactionNotifier;
			var aureliaTemplating_40 = aureliaTemplating.Animator;
			var aureliaTemplating_41 = aureliaTemplating.animationEvent;
			var aureliaTemplating_42 = aureliaTemplating._hyphenate;
			var aureliaTemplating_43 = aureliaTemplating._isAllWhitespace;
			var aureliaTemplating_44 = aureliaTemplating.viewEngineHooks;
			var aureliaTemplating_45 = aureliaTemplating.children;
			var aureliaTemplating_46 = aureliaTemplating.child;
			var aureliaTemplating_47 = aureliaTemplating.resource;
			var aureliaTemplating_48 = aureliaTemplating.behavior;
			var aureliaTemplating_49 = aureliaTemplating.customElement;
			var aureliaTemplating_50 = aureliaTemplating.customAttribute;
			var aureliaTemplating_51 = aureliaTemplating.templateController;
			var aureliaTemplating_52 = aureliaTemplating.bindable;
			var aureliaTemplating_53 = aureliaTemplating.dynamicOptions;
			var aureliaTemplating_54 = aureliaTemplating.useShadowDOM;
			var aureliaTemplating_55 = aureliaTemplating.processAttributes;
			var aureliaTemplating_56 = aureliaTemplating.processContent;
			var aureliaTemplating_57 = aureliaTemplating.containerless;
			var aureliaTemplating_58 = aureliaTemplating.useViewStrategy;
			var aureliaTemplating_59 = aureliaTemplating.useView;
			var aureliaTemplating_60 = aureliaTemplating.inlineView;
			var aureliaTemplating_61 = aureliaTemplating.noView;
			var aureliaTemplating_62 = aureliaTemplating.elementConfig;
			var aureliaTemplating_63 = aureliaTemplating.viewResources;

			const logger = aureliaLogging_1("dynamic-html");
			let DynamicHtml = exports('DynamicHtml', class DynamicHtml {
			    constructor(el, tq, container, viewCompiler) {
			        this.el = el;
			        this.tq = tq;
			        this.container = container;
			        this.viewCompiler = viewCompiler;
			        this.html = this.context = this.slot = this.bindingContext = this.overrideContext = null;
			        this.renderErrors = this.isAttached = this.isBound = this.isCompiled = this.isInitialized = false;
			        this.isCleanedUp = true;
			    }
			    bind(bindingContext, overrideContext) {
			        this.isBound = true;
			        this.bindingContext = this.context || bindingContext.context || bindingContext;
			        this.overrideContext = aureliaBinding_70(bindingContext, overrideContext);
			        this.htmlChanged(this.html);
			    }
			    unbind() {
			        this.isBound = false;
			        this.bindingContext = null;
			        this.overrideContext = null;
			    }
			    attached() {
			        this.isAttached = true;
			        this.isInitialized = true;
			        this.slot = new aureliaTemplating_16(this.el.firstElementChild || this.el, true);
			        this.tq.queueMicroTask(() => {
			            this.tryCompile();
			        });
			    }
			    detached() {
			        this.isAttached = false;
			        if (this.isCompiled) {
			            this.cleanUp();
			        }
			        this.slot = null;
			    }
			    htmlChanged(newValue, __) {
			        if ((newValue === null || newValue === undefined) && !this.isCleanedUp) {
			            this.cleanUp();
			        }
			        else if (this.isBound || this.isInitialized) {
			            this.tq.queueMicroTask(() => {
			                this.tryCompile();
			            });
			        }
			    }
			    contextChanged(newValue, _) {
			        if ((newValue === null || newValue === undefined) && !!this.overrideContext) {
			            this.bindingContext = this.overrideContext.bindingContext;
			        }
			        else {
			            this.bindingContext = newValue;
			        }
			        if (this.isBound || this.isInitialized) {
			            this.tq.queueMicroTask(() => {
			                this.tryCompile();
			            });
			        }
			    }
			    tryCompile() {
			        if (this.isAttached) {
			            if (!this.isCleanedUp) {
			                this.cleanUp();
			            }
			            try {
			                this.tq.queueMicroTask(() => {
			                    this.compile();
			                });
			            }
			            catch (e) {
			                logger.warn(e.message);
			                if (this.renderErrors) {
			                    this.tq.queueMicroTask(() => {
			                        this.compile(`<template>${e.message}</template>`);
			                    });
			                }
			            }
			        }
			    }
			    cleanUp() {
			        this.isCompiled = false;
			        logger.debug("Cleaning up");
			        const slot = this.slot;
			        try {
			            slot.detached();
			        }
			        catch (e) {
			            logger.error(e.message);
			        }
			        try {
			            slot.unbind();
			        }
			        catch (e) {
			            logger.error(e.message);
			        }
			        try {
			            slot.removeAll();
			        }
			        catch (e) {
			            logger.error(e.message);
			        }
			        this.isCleanedUp = true;
			    }
			    compile(message) {
			        if (!this.isCleanedUp) {
			            this.cleanUp();
			        }
			        if ((this.html === null || this.html === undefined) && message === undefined) {
			            logger.debug("Skipping compilation because no html value is set");
			            return;
			        }
			        this.isCleanedUp = false;
			        const template = `<template>${message || this.html}</template>`;
			        logger.debug("Compiling", template, this.bindingContext);
			        const viewResources = this.container.get(aureliaTemplating_18);
			        const childContainer = this.container.createChild();
			        const factory = this.viewCompiler.compile(template, viewResources);
			        const view = factory.create(childContainer);
			        const slot = this.slot;
			        slot.add(view);
			        slot.bind(this.bindingContext, this.overrideContext);
			        slot.attached();
			        this.isCompiled = true;
			    }
			});
			__decorate([
			    aureliaTemplating_52({ defaultBindingMode: aureliaBinding_41.toView }),
			    __metadata("design:type", Object)
			], DynamicHtml.prototype, "html", void 0);
			__decorate([
			    aureliaTemplating_52({ defaultBindingMode: aureliaBinding_41.toView }),
			    __metadata("design:type", Object)
			], DynamicHtml.prototype, "context", void 0);
			__decorate([
			    aureliaTemplating_52({ defaultBindingMode: aureliaBinding_41.toView }),
			    __metadata("design:type", Boolean)
			], DynamicHtml.prototype, "renderErrors", void 0);
			DynamicHtml = exports('DynamicHtml', __decorate([
			    aureliaTemplating_49("dynamic-html"),
			    aureliaTemplating_60("<template><div></div></template>"),
			    __metadata("design:paramtypes", [Element, aureliaTaskQueue_1, aureliaDependencyInjection_1, aureliaTemplating_13])
			], DynamicHtml));

			function configure(config) {
			    config.globalResources(aureliaPal_5.moduleName("./dynamic-html"));
			}

		}
	};
});
