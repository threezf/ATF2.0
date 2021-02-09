"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * 系统错误码统一返回值
 */
var urlDownload = ['dataCenter/downloadDataFile'];

function isDownload(url) {
  var flag = false;
  urlDownload.forEach(function (item) {
    if (url.indexOf(item) !== -1) {
      flag = true;
    }
  });
  return flag;
}

var _default = isDownload;
exports["default"] = _default;