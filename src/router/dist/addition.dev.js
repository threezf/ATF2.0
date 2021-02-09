"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Error = _interopRequireDefault(require("@/views/addition/Error"));

var _NoGrant = _interopRequireDefault(require("@/views/addition/NoGrant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  path: '/addition',
  redirect: '/addition/error',
  name: 'Addition',
  meta: {
    hide: true
  },
  children: [{
    path: 'error',
    name: 'Error',
    component: _Error["default"],
    meta: {
      name: '发生错误',
      parent: '/addition'
    }
  }, {
    path: 'noGrant',
    name: 'NoGrant',
    component: _NoGrant["default"],
    meta: {
      name: '未授权界面',
      parent: '/addition'
    }
  }]
};
exports["default"] = _default;