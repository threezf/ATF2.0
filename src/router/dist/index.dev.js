"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _index = _interopRequireDefault(require("@/views/login/index"));

var _rigester = _interopRequireDefault(require("@/views/login/rigester"));

var _index2 = _interopRequireDefault(require("@/views/index"));

var _testInfrastructure = _interopRequireDefault(require("./testInfrastructure.js"));

var _systemManagement = _interopRequireDefault(require("./systemManagement.js"));

var _testProject = _interopRequireDefault(require("./testProject.js"));

var _recordFunction = _interopRequireDefault(require("./recordFunction"));

var _quicklyStart = _interopRequireDefault(require("./quicklyStart"));

var _ui = _interopRequireDefault(require("@/views/UIorCGI/ui"));

var _CGI = _interopRequireDefault(require("@/views/UIorCGI/CGI"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var originalPush = _vueRouter["default"].prototype.push;

_vueRouter["default"].prototype.push = function push(location) {
  return originalPush.call(this, location)["catch"](function (err) {
    return err;
  });
};

var _default = new _vueRouter["default"]({
  routes: [{
    path: '/login',
    name: 'Login',
    component: _index["default"],
    meta: {
      name: '登录',
      hide: true,
      //在目录结构上隐藏，不在菜单栏外显
      noRequiresAuth: true
    }
  }, {
    path: '/rigester',
    name: 'Rigester',
    component: _rigester["default"],
    meta: {
      name: '注册',
      hide: true
    }
  }, {
    path: '/index',
    name: 'Index',
    component: _index2["default"],
    meta: {
      name: '首页'
    }
  }, {
    path: '/',
    redirect: '/login',
    name: 'default',
    meta: {
      name: '首页'
    }
  }, _systemManagement["default"], _testInfrastructure["default"], {
    path: '/testInfrastructure/ui',
    name: 'UI',
    component: _ui["default"],
    meta: {
      name: 'UI测试'
    }
  }, {
    path: '/testInfrastructure/cgi',
    component: _CGI["default"],
    name: 'CGI',
    meta: {
      name: '接口测试'
    }
  }, _testProject["default"], _recordFunction["default"], _quicklyStart["default"]]
});

exports["default"] = _default;