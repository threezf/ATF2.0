"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _breadCrumb = _interopRequireDefault(require("./breadCrumb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  install: function install(Vue) {
    Vue.component('BreadCrumb', _breadCrumb["default"]);
  }
};
exports["default"] = _default;