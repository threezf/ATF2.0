"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _index = _interopRequireDefault(require("@/views/login/index"));

var _mobile = _interopRequireDefault(require("@/views/testProject/mobile"));

var _rigester = _interopRequireDefault(require("@/views/login/rigester"));

var _noReviewed = _interopRequireDefault(require("@/views/login/noReviewed"));

var _index2 = _interopRequireDefault(require("@/views/index"));

var _testInfrastructure = _interopRequireDefault(require("./testInfrastructure.js"));

var _systemManagement = _interopRequireDefault(require("./systemManagement.js"));

var _testProject = _interopRequireDefault(require("./testProject.js"));

var _recordFunction = _interopRequireDefault(require("./recordFunction"));

var _test = _interopRequireDefault(require("@/views/test"));

var _quicklyStart = _interopRequireDefault(require("./quicklyStart"));

var _ui = _interopRequireDefault(require("@/views/UIorCGI/ui"));

var _CGI = _interopRequireDefault(require("@/views/UIorCGI/CGI"));

var _addition = _interopRequireDefault(require("./addition"));

var _mockApi = _interopRequireDefault(require("@/views/testInfrastructure/mockApi"));

var _PreView = _interopRequireDefault(require("@/views/testInfrastructure/mockAPIComponents/PreView"));

var _Edit = _interopRequireDefault(require("@/views/testInfrastructure/mockAPIComponents/Edit"));

var _Run = _interopRequireDefault(require("@/views/testInfrastructure/mockAPIComponents/Run"));

var _msgboard = _interopRequireDefault(require("@/views/messageBoard/msgboard"));

var _msgdetail = _interopRequireDefault(require("@/views/messageBoard/msgdetail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var originalPush = _vueRouter["default"].prototype.push;

_vueRouter["default"].prototype.push = function push(location) {
  return originalPush.call(this, location)["catch"](function (err) {
    return err;
  });
};

var _default = new _vueRouter["default"]({
  // mode: 'history',
  routes: [{
    path: '/login',
    name: 'Login',
    // component: Test,
    component: _index["default"],
    meta: {
      name: '登录',
      hide: true,
      //在目录结构上隐藏，不在菜单栏外显
      noRequiresAuth: true
    }
  }, {
    path: '/rigester',
    name: 'Rigester',
    component: _rigester["default"],
    meta: {
      name: '注册',
      hide: true
    }
  }, {
    path: '/index',
    name: 'Index',
    component: _index2["default"],
    meta: {
      name: '首页'
    }
  }, {
    path: '/noReceived',
    name: 'NoReceived',
    component: _noReviewed["default"],
    meta: {
      name: '待审核',
      another: 'atf/interface',
      hide: true
    }
  }, {
    path: '/',
    redirect: '/login',
    name: 'default',
    meta: {
      name: '首页'
    }
  }, _testInfrastructure["default"], {
    path: '/testInfrastructure/ui',
    name: 'UI',
    component: _ui["default"],
    meta: {
      name: 'UI测试',
      another: 'atf/ui'
    }
  }, {
    path: '/testInfrastructure/cgi',
    component: _CGI["default"],
    name: 'CGI',
    meta: {
      name: '接口测试',
      another: 'atf/interface'
    }
  }, _testProject["default"], _systemManagement["default"], _quicklyStart["default"], _addition["default"], {
    path: '/testProject/mobile',
    name: 'Mobile',
    component: _mobile["default"],
    meta: {
      name: '移动端测试',
      another: 'atf/interface',
      hide: true
    }
  }, {
    path: '/mockApi',
    name: "MockApi",
    component: _mockApi["default"],
    meta: {
      name: "Mock API",
      parent: "TestInfrastructure",
      another: 'atf/interface'
    },
    children: [{
      path: 'preview/:id',
      name: 'Preview',
      component: _PreView["default"],
      meta: {
        parent: 'TestInfrastructure',
        hide: true
      }
    }, {
      path: 'edit/:id',
      name: 'Edit',
      component: _Edit["default"],
      meta: {
        parent: 'TestInfrastructure',
        hide: true
      }
    }, {
      path: 'run/:id',
      name: 'Run',
      component: _Run["default"],
      meta: {
        parent: 'TestInfrastructure',
        hide: true
      }
    }]
  }, {
    path: '/mssageboard',
    name: 'MessageBoard',
    component: _msgboard["default"],
    meta: {
      name: '留言板',
      another: 'atf/interface'
    }
  }, {
    path: 'msgdetail',
    name: 'MsgDetail',
    component: _msgdetail["default"],
    meta: {// parent: 'MessageBoard'
    }
  }]
});

exports["default"] = _default;