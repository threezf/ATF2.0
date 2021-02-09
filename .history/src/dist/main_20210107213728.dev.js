"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _vue = _interopRequireWildcard(require("vue"));

var _App = _interopRequireDefault(require("./App"));

var _router = _interopRequireDefault(require("./router"));

var _vCharts = _interopRequireDefault(require("v-charts"));

var _jquery = _interopRequireDefault(require("jquery"));

require("../node_modules/bootstrap/dist/css/bootstrap.css");

require("../node_modules/bootstrap/dist/js/bootstrap.js");

var _vacFunctions = _interopRequireDefault(require("./libs/vac-functions.es"));

var _elementUi = _interopRequireDefault(require("element-ui"));

require("element-ui/lib/theme-chalk/index.css");

require("font-awesome/css/font-awesome.min.css");

var _wiiFeUtils = require("wii-fe-utils");

var _moment = _interopRequireDefault(require("moment"));

var _index2 = _interopRequireDefault(require("./store/index"));

var _vueBus = _interopRequireDefault(require("vue-bus"));

var _index3 = _interopRequireDefault(require("./components/page/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//引入jquery
_vue["default"].config.productionTip = false;
_vue["default"].config.productionTip = false;

_vue["default"].use(_elementUi["default"]);

_vue["default"].use(_vCharts["default"]);

_vue["default"].use(_moment["default"]);

_vue["default"].use(_vueBus["default"]);

_vue["default"].use(_index3["default"]);

_vue["default"].use(_vue.onMounted);

_vue["default"].use(_vue.onBeforeUnmount);

_vue["default"].use(_vue.ref);

_vue["default"].use(_vue.reactive);

window.activeMenu; // 路由钩子

var loadingInstance = null;

_router["default"].beforeEach(function (to, from, next) {
  window.activeMenu = to.meta && to.meta.parent ? to.meta.parent : to.name;

  if (to.meta && to.meta.noRequiresAuth) {
    next();
  } else {
    if (_wiiFeUtils.SessionStorage.get('userId')) {
      //需要校验的key
      next();
    } else {
      next('/login');
    }
  }

  if (to.meta && to.meta.requiresAuth) {
    //如果需要登录校验，在路由处配置
    if (_wiiFeUtils.SessionStorage.get('user')) {
      //需要校验的key
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

_router["default"].afterEach(function (to, from) {// loadingInstance.close()
});
/* eslint-disable no-new */


new _vue["default"]({
  el: '#app',
  router: _router["default"],
  store: _index2["default"],
  components: {
    App: _App["default"]
  },
  template: '<App/>'
});