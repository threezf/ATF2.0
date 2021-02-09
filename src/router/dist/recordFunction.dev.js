"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("@/views/recordFunction/index"));

var _recordManagementRouter = _interopRequireDefault(require("@/views/recordFunction/recordManagementRouter"));

var _recordManagement = _interopRequireDefault(require("@/views/recordFunction/recordManagement"));

var _ruleExecute = _interopRequireDefault(require("@/views/recordFunction/ruleExecute"));

var _queryRuleExecution = _interopRequireDefault(require("@/views/recordFunction/queryRuleExecution"));

var _queryExecutionRecord = _interopRequireDefault(require("@/views/recordFunction/queryExecutionRecord"));

var _recordDetail = _interopRequireDefault(require("@/views/recordFunction/subFunction/recordDetail"));

var _recordTransact = _interopRequireDefault(require("@/views/recordFunction/recordTransact"));

var _ruleInput = _interopRequireDefault(require("@/views/recordFunction/ruleInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * @Author: your name
 * @Date: 2019-12-10 15:19:52
 * @LastEditTime: 2020-05-17 10:27:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ATF2.0\src\router\recordFunction.js
 */

/**
 *	录制功能界面路由
 */
var _default = {
  path: '/recordFunction',
  name: 'RecordFunction',
  component: _index["default"],
  redirect: '/recordFunction/RecordManagementRouter/recordManagement',
  meta: {
    name: '录制功能'
  },
  children: [{
    path: 'RecordManagementRouter',
    name: 'RecordManagementRouter',
    component: _recordManagementRouter["default"],
    redirect: '/recordFunction/RecordManagementRouter/recordManagement',
    meta: {
      name: '录制管理',
      parent: 'RecordFunction',
      icon: 'el-icon-video-camera'
    },
    children: [{
      path: 'recordManagement',
      name: 'RecordManagement',
      component: _recordManagement["default"],
      meta: {
        name: '录制管理',
        parent: 'RecordFunction',
        icon: 'el-icon-video-camera',
        hide: true
      }
    }, {
      path: 'recordTransact',
      name: 'RecordTransact',
      component: _recordTransact["default"],
      meta: {
        name: "录制功能点管理",
        parent: 'recordFunction',
        icon: 'el-icon-view',
        hide: true
      }
    }, {
      path: 'recordDetail',
      name: 'RecordDetail',
      component: _recordDetail["default"],
      meta: {
        name: 'UI管理',
        parent: 'recordFunction',
        icon: 'el-icon-view',
        hide: true
      }
    }]
  }, {
    path: 'recordTransact',
    name: 'RecordTransact',
    component: _recordTransact["default"],
    hidden: true,
    meta: {
      name: '功能点',
      parent: 'RecordFunction',
      hide: true
    }
  }, {
    path: 'ruleInput',
    name: 'RuleInput',
    component: _ruleInput["default"],
    hidden: true,
    meta: {
      name: '规则录入',
      parent: 'RecordFunction',
      hide: true
    }
  }, {
    path: 'ruleExecution',
    name: 'RuleExecution',
    component: _ruleExecute["default"],
    meta: {
      name: '规则执行',
      parent: 'RecordFunction',
      icon: 'el-icon-video-play'
    }
  }, {
    path: 'queryRuleExecution',
    name: 'QueryRuleExecution',
    component: _queryRuleExecution["default"],
    meta: {
      name: '规则执行查询',
      parent: 'RecordFunction',
      icon: 'el-icon-search'
    }
  }, {
    path: 'queryExecutionRecord',
    name: 'QueryExecutionRecord',
    component: _queryExecutionRecord["default"],
    meta: {
      name: '执行记录查询',
      parent: 'RecordFunction',
      icon: 'el-icon-search',
      hide: true
    }
  }]
};
exports["default"] = _default;