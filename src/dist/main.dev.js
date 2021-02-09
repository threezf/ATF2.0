"use strict";

var _vue = _interopRequireDefault(require("vue"));

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

var _vueDragSelectPro = _interopRequireDefault(require("vue-drag-select-pro"));

require("vue-drag-select-pro/lib/vueDragSelectPro.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//引入jquery
_vue["default"].config.productionTip = false;
_vue["default"].config.productionTip = false;

_vue["default"].use(_vueDragSelectPro["default"]);

_vue["default"].use(_elementUi["default"]);

_vue["default"].use(_vCharts["default"]);

_vue["default"].use(_moment["default"]);

_vue["default"].use(_vueBus["default"]);

_vue["default"].use(_index3["default"]);

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