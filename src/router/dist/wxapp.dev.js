"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("@/views/wxapp-open/index"));

var _index2 = _interopRequireDefault(require("@/views/wxapp-open/template/index"));

var _draft = _interopRequireDefault(require("@/views/wxapp-open/template/draft"));

var _template = _interopRequireDefault(require("@/views/wxapp-open/template/template"));

var _index3 = _interopRequireDefault(require("@/views/wxapp-open/wxapp/index"));

var _manage = _interopRequireDefault(require("@/views/wxapp-open/wxapp/manage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 小程序开放平台模板
 */
var _default = {
  path: '/wxapp-open',
  name: 'WxappIndex',
  component: _index["default"],
  redirect: '/wxapp-open/template',
  meta: {
    name: '小程序'
  },
  children: [{
    path: 'template',
    name: 'WxappTemplate',
    component: _index2["default"],
    redirect: '/wxapp-open/template/list',
    meta: {
      name: '模板管理',
      parent: 'WxappIndex',
      icon: 'el-icon-document-copy'
    },
    children: [{
      path: 'draft',
      name: 'WxappTemplateDraft',
      component: _draft["default"],
      meta: {
        name: '草稿箱',
        parent: 'WxappIndex'
      }
    }, {
      path: 'list',
      name: 'WxappTemplateList',
      component: _template["default"],
      meta: {
        name: '模板列表',
        parent: 'WxappIndex'
      }
    }]
  }, {
    path: 'app-list',
    name: 'WxappAppList',
    component: _index3["default"],
    meta: {
      name: '托管小程序列表',
      parent: 'WxappIndex',
      icon: 'el-icon-mobile-phone'
    }
  }, {
    path: 'manage/:appId',
    name: 'WxappAppManage',
    component: _manage["default"],
    meta: {
      name: '小程序管理',
      parent: 'WxappIndex',
      hide: true
    }
  }]
};
exports["default"] = _default;