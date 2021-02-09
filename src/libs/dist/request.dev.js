"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _elementUi = _interopRequireDefault(require("element-ui"));

var _axios = _interopRequireDefault(require("axios"));

var _vue = _interopRequireDefault(require("vue"));

var _qs = _interopRequireDefault(require("qs"));

var _errorCode = _interopRequireDefault(require("../const/errorCode"));

var _urlDownload = _interopRequireDefault(require("../const/urlDownload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 公共请求
 * 返回值为Promise
 *
 * 使用方式
 * import Request from '{pwd}/libs/request'
 *
 * Request({
      url: '/cgi-bin/poisearch',
      method: 'get',
      params: {}
    }).then((res) => {

  	}).catch((err) => {

  	})
 */
var _Vue = new _vue["default"]({
  el: "#app"
});

_axios["default"].defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

_axios["default"].defaults.paramsSerializer = function (params) {
  return _qs["default"].stringify(params, {
    arrayFormat: 'brackets'
  });
}; // interceptors 执行时间：在axios().then(f,f)  之前
// api文档 : You can intercept requests or responses before they are handled by then or catch.
// 如果判断条件不通过就直接return Promise.reject(message) 不执行后边的内容


_axios["default"].interceptors.response.use(function (response) {
  console.log(response.request.responseURL);
  console.log(response, '响应内容'); // if(isDownload(response.request.responseURL)){
  //     console.log(response)
  //     return response
  // }

  console.log('返回', response, response.status);

  if (+response.status === 201) {
    console.log('返回码201', response);
    return response;
  }

  if (+response.data.respCode === 401) {
    // alert('异地账号登录') // 待优化
    window.location = "/index/index.html#/login";
  }

  if (!(+response.status === 200)) {
    var _message = "http请求失败：失败码：" + response.status + "；失败信息：" + response.statusText;

    return Promise.reject(_message);
  }

  if (response.data.respCode === '0000') {
    return response;
  }

  if (response.data.respCode === '10000010') {
    _elementUi["default"].Message.warning('异地登录');
  }

  if (response.data.success) {
    return response;
  }

  var message = "\u63A5\u53E3\u8BF7\u6C42\u5931\u8D25\uFF1A\u5931\u8D25\u7801\uFF1A".concat(response.data.respCode, "\uFF1B\u5931\u8D25\u4FE1\u606F\uFF1A").concat(response.data.respMsg);
  console.log('拦截器捕获了错误' + message);
  return Promise.reject(message);
}, function (error) {
  // window.location = '/#/error'
  console.log('发生错误拦截', error, _Vue);
  return Promise.reject(error);
}); //扩展Promise的finally方法


Promise.prototype["finally"] = function (callback) {
  var P = this.constructor;
  return this.then(function (value) {
    return P.resolve(callback()).then(function () {
      return value;
    });
  }, function (reason) {
    return P.resolve(callback()).then(function () {
      throw reason;
    });
  });
};

var Request = function Request(options) {
  return new Promise(function (resolve, reject) {
    var axiosParams = {
      url: '/atfcloud2.0a' + options.url,
      method: options.method
    };

    if (options.method == 'get') {
      axiosParams.params = options.params;
    } else {
      axiosParams.data = options.params;
    }

    (0, _axios["default"])(axiosParams).then(function (res) {
      console.log('request', res.data);
      res = res.data;
      resolve(res);
    })["catch"](function (err) {
      reject(err);
    });
  });
};

var _default = Request;
exports["default"] = _default;