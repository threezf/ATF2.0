"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("@/views/testProject/index"));

var _scene = _interopRequireDefault(require("@/views/testProject/scene"));

var _testProject = _interopRequireDefault(require("@/views/testProject/testProject"));

var _manageTestProject = _interopRequireDefault(require("../views/testProject/manageTestProject"));

var _testCaseManagement = _interopRequireDefault(require("../views/testProject/testCaseManagement"));

var _datatable = _interopRequireDefault(require("../views/testProject/datatable"));

var _datatableFlowcase = _interopRequireDefault(require("@/views/testProject/datatableFlowcase"));

var _batchExecutionQuery = _interopRequireDefault(require("@/views/testProject/batchExecutionQuery"));

var _testRecord = _interopRequireDefault(require("@/views/testProject/testRecord"));

var _sceneSetting = _interopRequireDefault(require("@/views/testProject/sceneSetting"));

var _insertSceneCase = _interopRequireDefault(require("@/views/testProject/insertSceneCase"));

var _caseOperation = _interopRequireDefault(require("@/views/testProject/subFunction/caseOperation"));

var _uploadRecord = _interopRequireDefault(require("@/views/testProject/subFunction/uploadRecord"));

var _testplanExecute = _interopRequireDefault(require("@/views/testProject/testplanExecute"));

var _testRecord_of_runId = _interopRequireDefault(require("@/views/testProject/testRecord_of_runId"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * @Author: your name
 * @Date: 2019-12-22 09:48:55
 * @LastEditTime: 2020-05-18 10:48:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ATF2.0\src\router\testProject.js
 */

/**
 * 测试项目管理页面路由
 */
var _default = {
  path: '/testProjectIndext',
  name: 'TestProject',
  component: _index["default"],
  redirect: '/testProjectIndext/testProject',
  meta: {
    name: '项目测试',
    another: 'atf/project'
  },
  children: [{
    path: 'testProject',
    name: 'testProject',
    component: _testProject["default"],
    meta: {
      name: '测试项目管理',
      parent: 'TestProjectIndex',
      icon: 'el-icon-back'
    }
  }, {
    path: 'manageTestProject',
    name: 'manageTestProject',
    component: _manageTestProject["default"],
    meta: {
      name: '管理项目',
      parent: 'TestProjectIndex',
      icon: 'el-icon-back',
      hide: true
    }
  }, {
    path: 'testCase',
    name: 'testCase',
    component: _testCaseManagement["default"],
    meta: {
      name: '测试用例管理',
      parent: 'TestProjectIndex',
      icon: 'el-icon-star-off'
    }
  }, {
    path: 'datatable',
    name: 'datatable',
    component: _datatable["default"],
    meta: {
      name: '测试资源管理',
      parent: 'TestProjectIndex',
      icon: 'el-icon-edit'
    }
  }, {
    path: 'uploadRecord',
    name: 'uploadRecord',
    component: _uploadRecord["default"],
    meta: {
      name: '导入记录',
      parent: 'TestProjectIndex',
      icon: 'el-icon-star-off',
      hide: true
    }
  }, {
    path: 'scene',
    name: 'scene',
    component: _scene["default"],
    meta: {
      name: '场景管理',
      parent: 'TestProjectIndex',
      icon: 'el-icon-notebook-1',
      children: []
    }
  }, {
    path: 'sceneSetting',
    name: 'sceneSetting',
    component: _sceneSetting["default"],
    meta: {
      name: '场景设置',
      parent: 'TestProjectIndex',
      icon: 'el-icon-setting',
      hide: true
    }
  }, // {
  //     path: 'datatable',
  //     name: 'datatable',
  //     component: datatable,
  //     meta: {
  //         name: '测试资源管理单用例',
  //         parent: 'TestProjectIndex',
  //         icon: 'el-icon-edit'
  //     }
  // },
  {
    path: 'datatable_flowcase',
    name: 'DatatableFlowcase',
    component: _datatableFlowcase["default"],
    meta: {
      name: '测试资源管理流程用例',
      parent: 'TestProjectIndex',
      icon: 'el-icon-edit',
      hide: true
    }
  }, {
    path: 'insertSceneCase',
    name: 'InsertSceneCase',
    component: _insertSceneCase["default"],
    meta: {
      name: '添加场景用例',
      parent: 'TestProjectIndex',
      icon: 'el-icon-search',
      hide: true
    }
  }, {
    path: 'caseOperation',
    name: 'CaseOperation',
    component: _caseOperation["default"],
    meta: {
      name: '用例执行结果查询',
      parent: 'TestProjectIndex',
      icon: 'el-icon-info',
      hide: true
    }
  }, {
    path: 'testplanExecute',
    name: 'TestplanExecute',
    component: _testplanExecute["default"],
    meta: {
      name: '测试计划及执行',
      parent: 'TestProjectIndex',
      icon: 'el-icon-cpu'
    }
  }, {
    path: 'batchexecutionquery',
    name: 'BatchExecutionQuery',
    component: _batchExecutionQuery["default"],
    meta: {
      name: '批次执行查询',
      parent: 'TestProjectIndex',
      icon: 'el-icon-search'
    }
  }, {
    path: 'testrecord',
    name: 'TestRecord',
    component: _testRecord["default"],
    meta: {
      name: '执行记录查询',
      parent: 'TestProjectIndex',
      icon: 'el-icon-search',
      hide: true
    }
  }, {
    path: 'testRecord_of_runId',
    name: 'testRecord_of_runId',
    component: _testRecord_of_runId["default"],
    meta: {
      name: '测试记录单',
      parent: 'TestProjectIndex',
      icon: 'el-icon-edit',
      hide: true
    }
  }]
};
exports["default"] = _default;