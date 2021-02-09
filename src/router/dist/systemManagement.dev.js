"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("@/views/systemManagement/index"));

var _EnterpriseManagement = _interopRequireDefault(require("@/views/systemManagement/EnterpriseManagement"));

var _RoleManagement = _interopRequireDefault(require("@/views/systemManagement/RoleManagement"));

var _MenuManagement = _interopRequireDefault(require("@/views/systemManagement/MenuManagement"));

var _usermanagement = _interopRequireDefault(require("@/views/systemManagement/usermanagement"));

var _runnerManagement = _interopRequireDefault(require("@/views/systemManagement/runnerManagement"));

var _automatedComponentManagement = _interopRequireDefault(require("@/views/systemManagement/automatedComponentManagement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 系统管理页面路由
 */
var _default = {
  path: '/systemManagement',
  name: 'SystemManagement',
  component: _index["default"],
  redirect: '/systemManagement/enterpriseManagement',
  meta: {
    name: '系统管理',
    another: 'atf/system'
  },
  children: [{
    path: 'enterpriseManagement',
    name: 'enterpriseManagement',
    component: _EnterpriseManagement["default"],
    meta: {
      name: '企业管理',
      parent: 'SystemManagement',
      icon: 'el-icon-s-platform',
      another: 'atf/company'
    }
  }, {
    path: 'roleManagement',
    name: 'roleManagement',
    component: _RoleManagement["default"],
    meta: {
      name: '角色管理',
      parent: 'SystemManagement',
      icon: 'el-icon-user',
      another: 'atf/role'
    }
  }, {
    path: 'menuManagement',
    name: 'menuManagement',
    component: _MenuManagement["default"],
    meta: {
      name: '系统菜单',
      parent: 'SystemManagement',
      icon: 'el-icon-menu',
      another: 'atf/menu'
    }
  }, {
    path: 'userManagement',
    name: 'userManagement',
    component: _usermanagement["default"],
    meta: {
      name: '用户管理',
      parent: 'SystemManagement',
      icon: 'el-icon-s-custom',
      another: 'atf/user'
    }
  }, {
    path: 'automatedComponentManagement',
    name: 'AutomatedComponentManagement',
    component: _automatedComponentManagement["default"],
    meta: {
      name: '自动化构件管理',
      parent: 'TestInfrastructure',
      icon: "el-icon-notebook-2",
      another: 'atf/infrastructure'
    }
  }, {
    path: 'runnerManagement',
    name: 'runnerManagement',
    component: _runnerManagement["default"],
    meta: {
      name: '执行机管理',
      parent: 'SystemManagement',
      icon: 'el-icon-setting',
      another: 'atf/runner'
    }
  }]
};
exports["default"] = _default;