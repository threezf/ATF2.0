"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("@/views/systemManagement/index"));

var _EnterpriseManagement = _interopRequireDefault(require("@/views/systemManagement/EnterpriseManagement"));

var _AdministratorManagement = _interopRequireDefault(require("@/views/systemManagement/AdministratorManagement"));

var _RoleManagement = _interopRequireDefault(require("@/views/systemManagement/RoleManagement"));

var _MenuManagement = _interopRequireDefault(require("@/views/systemManagement/MenuManagement"));

var _ProjectManagement = _interopRequireDefault(require("@/views/systemManagement/ProjectManagement"));

var _ProjectManagerManagement = _interopRequireDefault(require("@/views/systemManagement/ProjectManagerManagement"));

var _userManagement = _interopRequireDefault(require("@/views/systemManagement/userManagement"));

var _runnerManagement = _interopRequireDefault(require("@/views/systemManagement/runnerManagement"));

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
    name: '系统管理'
  },
  children: [{
    path: 'enterpriseManagement',
    name: 'enterpriseManagement',
    component: _EnterpriseManagement["default"],
    meta: {
      name: '企业管理',
      parent: 'SystemManagement',
      icon: 'el-icon-s-platform'
    }
  }, {
    path: 'administratorManagement',
    name: 'administratorManagement',
    component: _AdministratorManagement["default"],
    meta: {
      name: '系统管理员管理',
      parent: 'SystemManagement',
      icon: 'el-icon-user-solid'
    }
  }, {
    path: 'roleManagement',
    name: 'roleManagement',
    component: _RoleManagement["default"],
    meta: {
      name: '角色管理',
      parent: 'SystemManagement',
      icon: 'el-icon-user'
    }
  }, {
    path: 'menuManagement',
    name: 'menuManagement',
    component: _MenuManagement["default"],
    meta: {
      name: '系统菜单',
      parent: 'SystemManagement',
      icon: 'el-icon-menu'
    }
  }, {
    path: 'projectManagement',
    name: 'projectManagement',
    component: _ProjectManagement["default"],
    meta: {
      name: '项目组管理',
      parent: 'SystemManagement',
      icon: 'el-icon-s-management'
    }
  }, {
    path: 'projectManagerManagement',
    name: 'ProjectManagerManagement',
    component: _ProjectManagerManagement["default"],
    meta: {
      name: '项目经理管理',
      parent: 'SystemManagement',
      icon: 'el-icon-user'
    }
  }, {
    path: 'userManagement',
    name: 'userManagement',
    component: _userManagement["default"],
    meta: {
      name: '用户管理',
      parent: 'SystemManagement',
      icon: 'el-icon-s-custom'
    }
  }, {
    path: 'runnerManagement',
    name: 'runnerManagement',
    component: _runnerManagement["default"],
    meta: {
      name: '执行机管理',
      parent: 'SystemManagement',
      icon: 'el-icon-setting'
    }
  }]
};
exports["default"] = _default;