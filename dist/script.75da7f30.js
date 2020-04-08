// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script.js":[function(require,module,exports) {
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

;

function wait(ms) {
  var start = new Date().getTime();
  var end = start;

  while (end < start + ms) {
    end = new Date().getTime();
  }
}

manageBox = {
  data: {
    "containerWidth": 0,
    "totalGame": 0,
    "gameWidth": 0,
    "gameVisibleInPage": 0,
    "pageTotal": 0,
    "translateXStartPerc": 0,
    "translateXPerc": 0,
    "translateXBox": 0,
    "arrowWidthPerc": 0,
    "gameBoxMarginPerc": 0,
    "pagePos": 1,
    "gameBoxIndex": 1
  },
  init: function init(el) {
    //Reset position and set base data
    if (this.getData("translateXStartPerc") != 0) {
      this.setData("pagePos", 1);
      this.setData("translateXPerc", this.getData("translateXStartPerc"));
      el.style.transform = "translateX(" + this.getData("translateXStartPerc") + "%)";
      el.nextElementSibling.classList.add("hide");
    }

    this.setData("containerWidth", parseFloat(el.offsetWidth));
    this.setData("totalGame", el.querySelectorAll(".game-box").length);
    this.setData("gameWidth", parseFloat(el.querySelector(".game-box").offsetWidth + parseFloat(window.getComputedStyle(el.querySelector(".game-box"), null).getPropertyValue("margin-right"))));
    this.setData("gameVisibleInPage", parseInt((this.getData("containerWidth") - parseFloat(window.getComputedStyle(el.nextElementSibling, null).getPropertyValue("width")) * 2) / this.getData("gameWidth")));
    this.setData("pageTotal", parseInt(Math.ceil(this.getData("totalGame") / this.getData("gameVisibleInPage"))));

    if (this.getData("translateXStartPerc") == 0) {
      this.setData("translateXPerc", this.getComputedTranslate(el) * 100 / this.getData("containerWidth"));
      this.setData("translateXStartPerc", this.getData("translateXPerc"));
      this.setData("translateXBox", parseFloat(this.getData("gameWidth") * 100 / this.getData("containerWidth")));
    }

    this.setData("arrowWidthPerc", parseFloat(window.getComputedStyle(el.nextElementSibling, null).getPropertyValue("width")) * 100 / this.getData("containerWidth"));
    this.setData("gameBoxMarginPerc", parseFloat(window.getComputedStyle(el.querySelector(".game-box"), null).getPropertyValue("margin-right")) * 100 / this.getData("containerWidth"));

    if (this.getData("totalGame") > this.getData("gameVisibleInPage")) {
      el.nextElementSibling.classList.remove("hide");
    }
  },
  getData: function getData(property) {
    return property ? this.data[property] : this.data;
  },
  setData: function setData(property, value) {
    this.data[property] = value;
  },
  getComputedTranslate: function getComputedTranslate(el) {
    var st = window.getComputedStyle(el, null);
    var tr = st.getPropertyValue("-webkit-transform") || st.getPropertyValue("-moz-transform") || st.getPropertyValue("-ms-transform") || st.getPropertyValue("-o-transform") || st.getPropertyValue("transform");
    var values = tr.split('(')[1],
        values = values.split(')')[0],
        values = values.split(',');
    return parseFloat(values[4]); //TranslateX
  },
  next: function next(el) {
    var _ref = el;

    if (this.getData("pagePos") == this.getData("pageTotal")) {
      this.setData("pagePos", "1");
    }

    if (this.getSiblingsCount(el, this.getData("gameBoxIndex"), "next") <= parseInt(this.getData("gameVisibleInPage") + 1)) {
      //Move DOM block
      var els = el.querySelectorAll(':nth-of-type(-n+' + this.getData("gameVisibleInPage") + ')');
      [].forEach.call(els, function (el) {
        //console.log("--->",el);
        if (el.classList.contains("game-box")) {
          var clone = el.cloneNode(true);

          _ref.appendChild(clone);

          _ref.removeChild(el);
        }
      }); //debugger;

      var posX = this.getData("translateXPerc") + (100 - this.getData("arrowWidthPerc") * 2 - this.getData("gameBoxMarginPerc"));
      this.setData("translateXPerc", posX);
      el.classList.toggle("transition");
      el.style.transform = "translateX(" + posX + "%)";
      el.classList.toggle("transition");
    } else {
      this.setData("gameBoxIndex", parseInt(this.getData("gameBoxIndex") + this.getData("gameVisibleInPage")));
    }

    var posX = this.getData("translateXPerc") - (100 - this.getData("arrowWidthPerc") * 2 - this.getData("gameBoxMarginPerc"));
    el.style.transform = "translateX(" + posX + "%)";
    this.setData("translateXPerc", posX); //Set the new page

    this.setData("pagePos", parseInt(this.getData("pagePos")) + 1);
    console.log(this.getData());
  },
  prev: function prev(el) {
    var _ref = el;

    if (this.getData("pagePos") == 0) {
      this.setData("pagePos", this.getData("pageTotal"));
    }

    if (this.getSiblingsCount(el, this.getData("gameBoxIndex"), "prev") <= parseInt(this.getData("gameVisibleInPage") + 1)) {
      //Move DOM block
      var els = el.querySelectorAll(':nth-last-of-type(-n+' + this.getData("gameVisibleInPage") + ')');
      var i = 0;
      [].forEach.call(els, function (el) {
        if (el.classList.contains("game-box")) {
          var clone = el.cloneNode(true);

          _ref.insertBefore(clone, _ref.childNodes[i]);

          _ref.removeChild(el);

          i++;
        }
      });
      var posX = this.getData("translateXPerc") - (100 - this.getData("arrowWidthPerc") * 2 - this.getData("gameBoxMarginPerc"));
      this.setData("translateXPerc", posX);
      el.classList.toggle("transition");
      el.style.transform = "translateX(" + posX + "%)";
      el.classList.toggle("transition");
    } else {
      this.setData("gameBoxIndex", parseInt(this.getData("gameBoxIndex") - this.getData("gameVisibleInPage")));
    }

    var posX = this.getData("translateXPerc") + (100 - this.getData("arrowWidthPerc") * 2 - this.getData("gameBoxMarginPerc"));
    el.style.transform = "translateX(" + posX + "%)";
    this.setData("translateXPerc", posX); //Set the new page

    this.setData("pagePos", parseInt(this.getData("pagePos")) - 1);
  },
  getSiblingsCount: function getSiblingsCount(el, index, dir) {
    result = 0;

    switch (dir) {
      case 'next':
        var el = el.querySelector('.game-box:nth-of-type(' + index + ')').nextElementSibling;
        var i = 0;

        while (el) {
          el = el.nextElementSibling;
          i++;
        }

        result = parseInt(i - (this.getData("gameVisibleInPage") - 1));
        break;

      case 'prev':
        var el = el.querySelector('.game-box:nth-of-type(' + index + ')').previousElementSibling;
        var i = 0;

        while (el) {
          el = el.previousElementSibling;
          i++;
        }

        result = parseInt(i - this.getData("gameVisibleInPage"));
        break;
    }

    return result;
  }
}; //Move Forwards

document.querySelector(".game-container .arrow-right").addEventListener("click", function (e) {
  manageBox.next(this.previousElementSibling);
}); //Move Backwards

document.querySelector(".game-container .arrow-left").addEventListener("click", function (e) {
  manageBox.prev(this.nextElementSibling);
}); //Init

var gameFixPos = debounce(function () {
  var els = document.querySelectorAll(".game-container .game-wrapper");
  [].forEach.call(els, function (el) {
    manageBox.init(el);
  });
}, 250);
window.addEventListener('resize', gameFixPos);
gameFixPos();
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64462" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map