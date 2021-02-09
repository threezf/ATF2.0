"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("@/views/test/index"));

var _testSubPage = _interopRequireDefault(require("@/views/test/test-sub-page"));

var _testSubPage2 = _interopRequireDefault(require("@/views/test/test-sub-page2"));

var _testSubPageTwo = _interopRequireDefault(require("@/views/test/test-sub-page-two"));

var _testSubPage3 = _interopRequireDefault(require("@/views/test/test-sub-page22"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 测试页面路由
 */
var _default = {
  path: '/test',
  name: 'TestIndex',
  component: _index["default"],
  redirect: '/test/test-sub-page1/test-sub-page-two',
  meta: {
    name: '测试页面'
  },
  children: [{
    path: 'test-sub-page1',
    name: 'TestSubPage1',
    component: _testSubPage["default"],
    meta: {
      name: '模板管理1',
      parent: 'TestIndex',
      icon: 'el-icon-document-copy'
    },
    children: [{
      path: 'test-sub-page-two',
      name: 'TestSubPage11',
      component: _testSubPageTwo["default"],
      meta: {
        name: '模板管理11',
        parent: 'TestSubPage1',
        icon: 'el-icon-document-copy'
      }
    }, {
      path: 'test-sub-page12',
      name: 'TestSubPage12',
      component: _testSubPage3["default"],
      meta: {
        name: '模板管理12',
        parent: 'TestSubPage1',
        icon: 'el-icon-document-copy'
      }
    }]
  }, {
    path: 'test-sub-page2',
    name: 'TestSubPage2',
    component: _testSubPage2["default"],
    meta: {
      name: '模板管理2',
      parent: 'TestIndex',
      icon: 'el-icon-document-copy'
    }
  }]
};
exports["default"] = _default;