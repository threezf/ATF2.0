"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Path = void 0;
var Path = [{
  name: "被测系统管理",
  pathName: "TestedSystemManagement",
  status: true,
  pre: 0,
  item: [{
    name: "添加被测系统",
    pathName: "TestedSystemManagement",
    status: "",
    pre: 0
  }, {
    name: "添加功能点",
    pathName: "Transact",
    status: "",
    pre: 1
  }, {
    name: "配置接口",
    pathName: "InterfacesManagement",
    status: "",
    pre: 2
  }]
}, {
  name: "脚本生成",
  pathName: "testProject",
  status: false,
  pre: 0,
  item: [{
    name: "添加测试项目",
    pathName: "testProject",
    status: "",
    pre: 0
  }, {
    name: "添加用例",
    pathName: "testCase",
    status: "",
    pre: 3
  }, {
    name: "配置数据",
    pathName: "datatable",
    status: "",
    pre: 3
  }, {
    name: "配置场景",
    pathName: "scene",
    status: "",
    pre: 3
  }]
}, {
  name: "测试执行",
  pathName: "testplanExecute",
  status: false,
  pre: 3,
  item: [{
    name: "添加测试计划",
    pathName: "testplanExecute",
    status: "",
    pre: 3
  }, {
    name: "添加待执行场景",
    pathName: "testplanExecute",
    status: "",
    pre: 3
  }, {
    name: "选择执行机",
    pathName: "testplanExecute",
    status: "",
    pre: 3
  }, {
    name: "执行",
    pathName: "testplanExecute",
    status: "",
    pre: 3
  }]
}, {
  name: "结果查询",
  pathName: "BatchExecutionQuery",
  status: false,
  pre: 3,
  item: [{
    name: "按执行批次查询",
    pathName: "BatchExecutionQuery",
    status: "",
    pre: 3
  }, {
    name: "按记录单查询",
    pathName: "TestRecord",
    status: "",
    pre: 3
  }]
}];
exports.Path = Path;