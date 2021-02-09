"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetSideBarList = void 0;

/**
 * 获取pathName对应的Sidebar的path和children，用于Sidebar组件的构建数据
 */
var GetSideBarList = function GetSideBarList(pathName) {
  var routes = this.$router.options.routes;
  var children = [];
  var path = '';
  routes.forEach(function (item) {
    if (item.name === pathName) {
      children = item.children;
      path = item.path;
    }
  });
  return {
    path: path,
    children: children
  };
};

exports.GetSideBarList = GetSideBarList;