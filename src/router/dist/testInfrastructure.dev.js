"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("@/views/testInfrastructure/index"));

var _testedSystemManagementRouter = _interopRequireDefault(require("@/views/testInfrastructure/testedSystemManagementRouter"));

var _testedSystemManagement = _interopRequireDefault(require("@/views/testInfrastructure/testedSystemManagement"));

var _transact = _interopRequireDefault(require("@/views/testInfrastructure/subFunction/transact"));

var _configureSystemData = _interopRequireDefault(require("@/views/testInfrastructure/subFunction/configureSystemData"));

var _automatedComponentMaintenance = _interopRequireDefault(require("@/views/testInfrastructure/subFunction/automatedComponentMaintenance"));

var _performCodeManagement = _interopRequireDefault(require("@/views/testInfrastructure/subFunction/performCodeManagement"));

var _transactDetail = _interopRequireDefault(require("@/views/testInfrastructure/transactDetail"));

var _interfacesManagement = _interopRequireDefault(require("@/views/testInfrastructure/subFunction/interfacesManagement"));

var _productLine = _interopRequireDefault(require("@/views/testInfrastructure/subFunction/productLine"));

var _useCaseDebug = _interopRequireDefault(require("@/views/testInfrastructure/transactDetail/useCaseDebug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 测试基础设施界面路由
 */
var _default = {
  path: '/testInfrastructure',
  name: 'TestInfrastructure',
  component: _index["default"],
  redirect: '/testInfrastructure/TestedSystemManagementRouter/testedSystemManagement',
  meta: {
    name: '测试基础设施',
    another: 'atf/aut'
  },
  children: [{
    path: 'TestedSystemManagementRouter',
    name: 'TestedSystemManagementRouter',
    component: _testedSystemManagementRouter["default"],
    redirect: '/testInfrastructure/TestedSystemManagementRouter/testedSystemManagement',
    meta: {
      name: "被测系统管理",
      parent: 'TestInfrastructure',
      icon: 'el-icon-back'
    },
    children: [{
      path: 'testedSystemManagement',
      name: 'TestedSystemManagement',
      component: _testedSystemManagement["default"],
      meta: {
        name: "被测系统管理",
        parent: 'TestInfrastructure',
        icon: 'el-icon-view',
        hide: true
      },
      beforeEnter: function beforeEnter(to, from, next) {
        if (from.name === 'TransactDetail' || from.name === 'UseCaseDebug' || from.name === 'InterfacesManagement') {
          history.go(-1);
          console.log('跳转到testedSystemManagement', to, from);
        } else {
          next();
        }
      } //考虑此处添加功能点管理路由

    }, {
      path: 'transact',
      name: 'Transact',
      component: _transact["default"],
      meta: {
        name: '功能点管理',
        parent: 'TestInfrastructure',
        icon: 'el-icon-view',
        hide: true
      }
    }, {
      path: 'autData',
      name: 'ConfigureSystemData',
      component: _configureSystemData["default"],
      meta: {
        name: "被测系统管理",
        parent: 'TestInfrastructure',
        icon: 'el-icon-view',
        hide: true
      }
    }, {
      path: 'automatedComponentMaintenance',
      name: 'AutomatedComponentMaintenance',
      component: _automatedComponentMaintenance["default"],
      meta: {
        name: "自动化构件维护",
        parent: 'TestInfrastructure',
        icon: 'el-icon-view',
        hide: true
      }
    }, {
      path: 'execCode',
      name: 'PerformCodeManagement',
      component: _performCodeManagement["default"],
      meta: {
        name: "被测系统管理",
        parent: 'TestInfrastructure',
        icon: 'el-icon-view',
        hide: true
      }
    }]
  }, {
    path: 'transactDetail',
    name: 'TransactDetail',
    component: _transactDetail["default"],
    meta: {
      name: 'UI管理',
      parent: 'TestedSystemManagement',
      icon: 'el-icon-document-copy',
      hide: true
    },
    children: []
  }, {
    path: 'useCaseDebug',
    name: 'UseCaseDebug',
    component: _useCaseDebug["default"],
    meta: {
      name: '用例调试',
      parent: 'TestInfrastructure',
      hide: true
    }
  }, // 接口管理
  {
    path: 'interfacesManagement',
    name: 'InterfacesManagement',
    component: _interfacesManagement["default"],
    meta: {
      name: '接口管理',
      parent: 'TestInfrastructure',
      icon: 'el-icon-view',
      hide: true
    }
  }, {
    path: 'productLine',
    name: 'ProductLine',
    component: _productLine["default"],
    meta: {
      name: '产品线',
      parent: 'TestInfrastructure',
      icon: 'el-icon-view',
      hide: true
    }
  }]
};
exports["default"] = _default;