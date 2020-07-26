/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./mainCarousel.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./carousel.view":
/*!***********************!*\
  !*** ./carousel.view ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass Carousel {\n  render() {\n    return create(\"template\", {\"type\":\"startTag\",\"tagName\":\"template\"}, \"\\r\\n  \",create(\"div\", {\"type\":\"startTag\",\"tagName\":\"div\"}, ),\"\\r\\n\");\n  }\n}\n\n//# sourceURL=webpack:///./carousel.view?");

/***/ }),

/***/ "./createElement.js":
/*!**************************!*\
  !*** ./createElement.js ***!
  \**************************/
/*! exports provided: createElement, Text, Wrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElement\", function() { return createElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Text\", function() { return Text; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Wrapper\", function() { return Wrapper; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction createElement(Cls, attributes) {\n  var o;\n\n  if (typeof Cls === \"string\") {\n    o = new Wrapper(Cls);\n  } else {\n    o = new Cls({\n      timer: {}\n    });\n  }\n\n  for (var name in attributes) {\n    o.setAttribute(name, attributes[name]);\n  }\n\n  var visit = function visit(children) {\n    var _iterator = _createForOfIteratorHelper(children),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var child = _step.value;\n\n        if (_typeof(child) === \"object\" && child instanceof Array) {\n          visit(child);\n          continue;\n        }\n\n        if (typeof child === \"string\") {\n          child = new Text(child);\n        }\n\n        o.appendChild(child);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  };\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  visit(children);\n  return o;\n}\nvar Text = /*#__PURE__*/function () {\n  function Text(text) {\n    _classCallCheck(this, Text);\n\n    this.children = [];\n    this.root = document.createTextNode(text);\n  }\n\n  _createClass(Text, [{\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return Text;\n}();\nvar Wrapper = /*#__PURE__*/function () {\n  function Wrapper(type) {\n    _classCallCheck(this, Wrapper);\n\n    this.children = [];\n    this.root = document.createElement(type);\n  } // attributes\n\n\n  _createClass(Wrapper, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, val) {\n      this.root.setAttribute(name, val);\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n\n      var _iterator2 = _createForOfIteratorHelper(this.children),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var child = _step2.value;\n          child.mountTo(this.root);\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener() {\n      var _this$root;\n\n      (_this$root = this.root).addEventListener.apply(_this$root, arguments);\n    }\n  }, {\n    key: \"style\",\n    get: function get() {\n      return this.root.style;\n    }\n  }]);\n\n  return Wrapper;\n}();\n\n//# sourceURL=webpack:///./createElement.js?");

/***/ }),

/***/ "./mainCarousel.js":
/*!*************************!*\
  !*** ./mainCarousel.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement */ \"./createElement.js\");\n/* harmony import */ var _carousel_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./carousel.view */ \"./carousel.view\");\n/* harmony import */ var _carousel_view__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_carousel_view__WEBPACK_IMPORTED_MODULE_1__);\n\n\n/*\r\nclass Carousel {\r\n  constructor(config) {\r\n    this.children = [];\r\n    this.attributes = new Map();\r\n    this.properties = new Map();\r\n  }\r\n\r\n  setAttribute(name, value) {\r\n    this[name] = value;\r\n  }\r\n\r\n  appendChild(child) {\r\n    this.children.push(child);\r\n  }\r\n\r\n  render() {\r\n    let children = this.data.map(url => {\r\n      let element = <img src={url} />;\r\n      element.addEventListener(\"dragstart\", event => {\r\n        event.preventDefault();\r\n        element.style.cursor = 'grabbing';\r\n      });\r\n      return element;\r\n    });\r\n    let root = <div class=\"carousel\">{children}</div>\r\n\r\n    let curPosition = 0;\r\n    let nextPic = () => {\r\n      let nextPosition = (curPosition + 1) % this.data.length; // number circle use % operator\r\n      \r\n      let curEle = children[curPosition];\r\n      let nextEle = children[nextPosition];\r\n\r\n      curEle.style.transition = `ease 0s`\r\n      nextEle.style.transition = `ease 0s`\r\n\r\n      curEle.style.transform = `translateX(${ - 100 * curPosition}%)`\r\n      nextEle.style.transform = `translateX(${100 - 100 * nextPosition}%)`\r\n\r\n      setTimeout(function() {\r\n        curEle.style.transition = ``; // = \"\" means use the CSS rules\r\n        nextEle.style.transition = ``;\r\n  \r\n        curEle.style.transform = `translateX(${- 100 - 100 * curPosition}%)`\r\n        nextEle.style.transform = `translateX(${- 100 * nextPosition}%)`\r\n  \r\n        curPosition = nextPosition;\r\n      }, 16);\r\n      setTimeout(nextPic, 3000);\r\n    }\r\n    setTimeout(nextPic, 3000);\r\n\r\n    root.addEventListener(\"mousedown\", (event) => {     \r\n      let initX = event.clientX;\r\n      let nextPosition = (curPosition + 1) % this.data.length;\r\n      let prevPostion = (curPosition - 1 + this.data.length) % this.data.length\r\n      \r\n      let preEle = children[prevPostion];\r\n      let curEle = children[curPosition];\r\n      let nextEle = children[nextPosition];\r\n      \r\n      preEle.style.transition = `ease 0s`;\r\n      curEle.style.transition = `ease 0s`;\r\n      nextEle.style.transition = `ease 0s`;\r\n\r\n      preEle.style.transform = `translateX(${ -500 - 500 * prevPostion}px)`;\r\n      curEle.style.transform = `translateX(${- 500 * curPosition}px)`;\r\n      nextEle.style.transform = `translateX(${500 - 500 * nextPosition}px)`;\r\n\r\n      children.forEach(item => {\r\n        item.style.cursor = 'grabbing';\r\n      });\r\n\r\n      let move = event => {\r\n        // console.log(event.clientX - initX, event.clientY - initY);\r\n        preEle.style.transform = `translateX(${event.clientX - initX - 500 - 500 * prevPostion}px)`;\r\n        curEle.style.transform = `translateX(${event.clientX - initX - 500 * curPosition}px)`;\r\n        nextEle.style.transform = `translateX(${event.clientX - initX + 500 - 500 * nextPosition}px)`;\r\n      };\r\n  \r\n      let up = (event) => {\r\n        let offset = 0;\r\n\r\n        if(event.clientX - initX > 250) {\r\n          offset = 1;\r\n        } else if(event.clientX - initX < -250) {\r\n          offset = -1;\r\n        }\r\n\r\n        // use the CSS rules\r\n        preEle.style.transition = ``;\r\n        curEle.style.transition = ``;\r\n        nextEle.style.transition = ``;\r\n\r\n        preEle.style.transform = `translateX(${offset * 500 - 500 - 500 * prevPostion}px)`;\r\n        curEle.style.transform = `translateX(${offset * 500- 500 * curPosition}px)`;\r\n        nextEle.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`;\r\n\r\n        curPosition = (curPosition - offset + this.data.length) % this.data.length;\r\n\r\n        children.forEach(item => {\r\n          item.style.cursor = 'grab';\r\n        });\r\n\r\n        document.removeEventListener(\"mousemove\", move);\r\n        document.removeEventListener(\"mouseup\", up);\r\n      };\r\n  \r\n      document.addEventListener(\"mousemove\", move);\r\n      document.addEventListener(\"mouseup\", up);\r\n    });\r\n    return root;\r\n  }\r\n\r\n  mountTo(parent) {\r\n    this.render().mountTo(parent);\r\n  }\r\n}\r\n\r\nlet carouselData = [\r\n  \"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg\",\r\n  \"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg\",\r\n  \"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg\",\r\n  \"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg\",\r\n];\r\nlet componet = <Carousel data={carouselData}/>\r\ncomponet.mountTo(document.body);\r\n*/\n\n//# sourceURL=webpack:///./mainCarousel.js?");

/***/ })

/******/ });