"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("@/views/quicklyStart/index"));

var _quicklyTransact = _interopRequireDefault(require("@/views/quicklyStart/quicklyTransact"));

var _quicklyElement = _interopRequireDefault(require("@/views/quicklyStart/quicklyElement"));

var _quicklyTemplate = _interopRequireDefault(require("@/views/quicklyStart/quicklyTemplate"));

var _quicklyRun = _interopRequireDefault(require("@/views/quicklyStart/quicklyRun"));

var _quicklyResult = _interopRequireDefault(require("@/views/quicklyStart/quicklyResult"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 快速开始页面路由
 * 路由规则
 */
var _default = {
  path: '/quicklyStart',
  name: 'QuicklyStart',
  component: _index["default"],
  redirect: '/quicklyStart/quicklyTransact',
  meta: {
    name: '快速开始',
    another: 'atf/quickStart',
    hide: true
  },
  children: [{
    path: 'quicklyTransact',
    name: 'QuicklyTransact',
    component: _quicklyTransact["default"],
    meta: {
      name: '添加功能点',
      parent: 'QuicklyStart'
    }
  }, {
    path: 'quicklyElement',
    name: 'QuicklyElement',
    component: _quicklyElement["default"],
    meta: {
      name: '维护元素库',
      parent: 'QuicklyStart'
    }
  }, {
    path: 'quicklyTemplate',
    name: 'QuicklyTemplate',
    component: _quicklyTemplate["default"],
    meta: {
      name: '配置用例',
      parent: 'QuicklyStart'
    }
  }, {
    path: 'quicklyRun',
    name: 'QuicklyRun',
    component: _quicklyRun["default"],
    meta: {
      name: '执行用例',
      parent: 'QuicklyStart'
    }
  }, {
    path: 'quicklyResult',
    name: 'QuicklyResult',
    component: _quicklyResult["default"],
    meta: {
      name: '查看结果',
      parent: 'QuicklyStart'
    }
  }]
};
exports["default"] = _default;