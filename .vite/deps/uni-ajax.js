var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// E:/front/MayActivity/node_modules/uni-ajax/lib/core/InterceptorManager.js
var InterceptorManager = class {
  constructor() {
    __publicField(this, "handlers", []);
    this.forEach = {
      asc: (fn) => {
        for (let i = 0, l = this.handlers.length; i < l; i++) {
          this.handlers[i] !== null && fn(this.handlers[i]);
        }
      },
      desc: (fn) => {
        for (let i = this.handlers.length - 1; i >= 0; i--) {
          this.handlers[i] !== null && fn(this.handlers[i]);
        }
      }
    };
  }
  use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled,
      rejected
    });
    return this.handlers.length - 1;
  }
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
};

// E:/front/MayActivity/node_modules/uni-ajax/lib/adapters/Request.js
function RequestConstructor() {
  const Request = function Request2(executor) {
    return Reflect.construct(Promise, [executor], Request2);
  };
  Object.setPrototypeOf(Request, Promise);
  Request.prototype = Object.create(Promise.prototype);
  Request.prototype.constructor = Request;
  Request.task = null;
  Request.aborted = false;
  Request.onHeadersReceivedCallback = null;
  Request.offHeadersReceivedCallback = null;
  Request.onHeadersReceived = function onHeadersReceived(fn) {
    var _a, _b;
    if (typeof fn === "function") {
      Request.onHeadersReceivedCallback = fn;
    }
    if (Request.onHeadersReceivedCallback && Request.task) {
      (_b = (_a = Request.task).onHeadersReceived) == null ? void 0 : _b.call(_a, Request.onHeadersReceivedCallback);
    }
  };
  Request.offHeadersReceived = function offHeadersReceived(fn) {
    var _a, _b;
    if (typeof fn === "function") {
      Request.offHeadersReceivedCallback = fn;
    }
    if (Request.offHeadersReceivedCallback && Request.task) {
      (_b = (_a = Request.task).offHeadersReceived) == null ? void 0 : _b.call(_a, Request.offHeadersReceivedCallback);
    }
  };
  Request.prototype.abort = function abort() {
    var _a;
    Request.aborted = true;
    (_a = Request.task) == null ? void 0 : _a.abort();
    return this;
  };
  Request.prototype.onHeadersReceived = function onHeadersReceived(fn) {
    Request.onHeadersReceived(fn);
    return this;
  };
  Request.prototype.offHeadersReceived = function offHeadersReceived(fn) {
    Request.offHeadersReceived(fn);
    return this;
  };
  return Request;
}

// E:/front/MayActivity/node_modules/uni-ajax/lib/utils.js
var _toString = Object.prototype.toString;
function isArray(val) {
  return _toString.call(val) === "[object Array]";
}
function isPlainObject(val) {
  return _toString.call(val) === "[object Object]";
}
function forEach(obj, fn) {
  if (obj === null || obj === void 0)
    return;
  if (typeof obj !== "object")
    obj = [obj];
  if (isArray(obj)) {
    for (let i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (const k in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, k)) {
        fn.call(null, obj[k], k, obj);
      }
    }
  }
}
function merge(...args) {
  const result = {};
  for (let i = 0, l = args.length; i < l; i++) {
    if (isPlainObject(args[i])) {
      forEach(args[i], (val, key) => {
        result[key] = assign(result[key], val);
      });
    }
  }
  return result;
}
function assign(target, source) {
  if (isPlainObject(target) && isPlainObject(source)) {
    return merge(target, source);
  } else if (isPlainObject(source)) {
    return merge({}, source);
  } else if (isArray(source)) {
    return source.slice();
  }
  return source;
}
function tryCatch(fn) {
  return function(...args) {
    try {
      return fn.apply(fn, args);
    } catch (error) {
      console.error(error);
    }
  };
}

// E:/front/MayActivity/node_modules/uni-ajax/lib/helpers/buildURL.js
function combineURL(baseURL = "", relativeURL = "") {
  if (/^https?:\/\//.test(relativeURL))
    return relativeURL;
  return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function querystring(url, params) {
  let query;
  const parts = [];
  forEach(params, (val, key) => {
    if (val === null || typeof val === "undefined")
      return;
    if (isArray(val))
      key = key + "[]";
    else
      val = [val];
    forEach(val, (v) => {
      if (v !== null && typeof v === "object") {
        v = JSON.stringify(v);
      }
      parts.push(encode(key) + "=" + encode(v));
    });
  });
  query = parts.join("&");
  if (query) {
    const hashmarkIndex = url.indexOf("#");
    hashmarkIndex !== -1 && (url = url.slice(0, hashmarkIndex));
    url += (url.indexOf("?") === -1 ? "?" : "&") + query;
  }
  return url;
}
function buildURL({ baseURL, url: relativeURL, params, query } = {}) {
  let url = combineURL(baseURL, relativeURL);
  if (!params && !query) {
    return url;
  }
  if (params) {
    if (/\/:/.test(url)) {
      forEach(params, (val, key) => {
        url = url.replace(`/:${key}`, `/${encode(String(val))}`);
      });
    } else if (!query) {
      url = querystring(url, params);
    }
  }
  if (query) {
    url = querystring(url, query);
  }
  return url;
}

// E:/front/MayActivity/node_modules/uni-ajax/lib/helpers/isCallback.js
function isCallback(field) {
  return ["success", "fail", "complete"].includes(field);
}

// E:/front/MayActivity/node_modules/uni-ajax/lib/helpers/detachConfig.js
function detachConfig(url, data, config) {
  let callback = null;
  const options = {};
  const isSingle = typeof url === "object";
  const value = isSingle ? url : __spreadProps(__spreadValues({}, config), { url, data });
  forEach(value, (val, key) => {
    if (isSingle && isCallback(key)) {
      ;
      (callback || (callback = {}))[key] = tryCatch(val);
    } else {
      options[key] = val;
    }
  });
  return {
    callback,
    config: options
  };
}

// E:/front/MayActivity/node_modules/uni-ajax/lib/helpers/mergeConfig.js
function merge2(obj1 = {}, obj2 = {}) {
  const obj = {};
  const objKeys = Object.keys(__spreadValues(__spreadValues({}, obj1), obj2));
  forEach(objKeys, (prop) => {
    if (obj2[prop] !== void 0) {
      obj[prop] = assign(obj1[prop], obj2[prop]);
    } else if (obj1[prop] !== void 0) {
      obj[prop] = assign(void 0, obj1[prop]);
    }
  });
  return obj;
}
async function mergeConfig(...args) {
  let config = {};
  for (let i = 0, l = args.length; i < l; i++) {
    const current = typeof args[i] === "function" ? await args[i]() : args[i];
    config = merge2(config, current);
  }
  config.method = config.method.toUpperCase();
  return config;
}

// E:/front/MayActivity/node_modules/uni-ajax/lib/adapters/http.js
function adapter(config, Request) {
  return new Promise((resolve, reject) => {
    var _a;
    if (Request.aborted) {
      return reject({
        config,
        errMsg: "request:fail abort"
      });
    }
    Request.task = uni.request(__spreadProps(__spreadValues({}, config), {
      complete: (result) => {
        const response = __spreadValues({ config }, result);
        !config.validateStatus || config.validateStatus(result.statusCode) ? resolve(response) : reject(response);
      }
    }));
    Request.onHeadersReceived();
    Request.offHeadersReceived();
    (_a = config.xhr) == null ? void 0 : _a.call(config, Request.task, config);
  });
}

// E:/front/MayActivity/node_modules/uni-ajax/lib/defaults.js
var METHOD = ["get", "post", "put", "delete", "connect", "head", "options", "trace"];
var HEADER = ["common", ...METHOD];
var defaults = {
  adapter,
  header: {},
  method: "GET",
  validateStatus: (statusCode) => statusCode >= 200 && statusCode < 300
};
forEach(HEADER, (h) => defaults.header[h] = {});
var defaults_default = defaults;

// E:/front/MayActivity/node_modules/uni-ajax/lib/core/dispatchRequest.js
function dispatchRequest(Request) {
  return (config) => {
    config.url = buildURL(config);
    config.method = (config.method || "get").toUpperCase();
    config.header = merge(config.header.common, config.header[config.method.toLowerCase()], config.header);
    forEach(HEADER, (h) => isPlainObject(config.header[h]) && delete config.header[h]);
    forEach(config, (val, key) => isCallback(key) && delete config[key]);
    return config.adapter(config, Request);
  };
}

// E:/front/MayActivity/node_modules/uni-ajax/lib/core/handleCancel.js
var CANCEL = Symbol("$$cancel");
function hasCancel(target) {
  return target === null || target === void 0 ? false : Object.prototype.hasOwnProperty.call(target, CANCEL);
}
function dispatchCancel(reason) {
  return Promise.reject({ [CANCEL]: reason });
}
function interceptCancel(rejected) {
  return rejected && ((response) => hasCancel(response) ? Promise.reject(response) : rejected(response));
}
function detachCancel(error) {
  return Promise.reject(hasCancel(error) ? error[CANCEL] : error);
}

// E:/front/MayActivity/node_modules/uni-ajax/lib/core/Ajax.js
function Ajax(defaultConfig) {
  const config = typeof defaultConfig === "object" ? merge(defaultConfig) : defaultConfig;
  ajax2.config = Object.freeze(config);
  ajax2.defaults = defaults_default;
  ajax2.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
  ajax2.getURL = async function getURL(config2) {
    const combineConfig = await mergeConfig(defaults_default, defaultConfig, config2);
    return buildURL(combineConfig).replace(/^\?/, "");
  };
  forEach(METHOD, (method) => {
    ajax2[method] = function(url, data, config2) {
      if (typeof url === "string")
        return ajax2(url, data, __spreadProps(__spreadValues({}, config2), { method }));
      return ajax2(__spreadProps(__spreadValues({}, url), { method }));
    };
  });
  function ajax2(...args) {
    const { callback, config: config2 } = detachConfig(...args);
    const Request = RequestConstructor();
    const chain = [dispatchRequest(Request), dispatchCancel];
    ajax2.interceptors.request.forEach.desc(({ fulfilled, rejected }) => chain.unshift(fulfilled, rejected));
    ajax2.interceptors.response.forEach.asc(({ fulfilled, rejected }) => chain.push(fulfilled, interceptCancel(rejected)));
    chain.unshift((config3) => mergeConfig(defaults_default, defaultConfig, config3), void 0);
    chain.push(void 0, detachCancel);
    chain.push((response) => {
      var _a, _b;
      if (!callback)
        return response;
      (_a = callback.success) == null ? void 0 : _a.call(callback, response);
      (_b = callback.complete) == null ? void 0 : _b.call(callback, response);
    }, (error) => {
      var _a, _b;
      if (!callback)
        return Promise.reject(error);
      (_a = callback.fail) == null ? void 0 : _a.call(callback, error);
      (_b = callback.complete) == null ? void 0 : _b.call(callback, error);
    });
    let request = Request.resolve(config2);
    while (chain.length) {
      request = request.then(chain.shift(), chain.shift());
    }
    return request;
  }
  return ajax2;
}

// E:/front/MayActivity/node_modules/uni-ajax/index.js
var ajax = Ajax();
ajax.create = function create(instanceConfig) {
  return Ajax(instanceConfig);
};
var uni_ajax_default = ajax;

// dep:uni-ajax
var uni_ajax_default2 = uni_ajax_default;
export {
  uni_ajax_default2 as default
};
//# sourceMappingURL=uni-ajax.js.map
