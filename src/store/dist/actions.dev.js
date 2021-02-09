"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _request = _interopRequireDefault(require("../libs/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  // 获取总积分
  getTotalScore: function getTotalScore(context, userId) {
    return new Promise(function (resolve, reject) {
      (0, _request["default"])({
        url: '/userController/getTotalScore',
        method: 'POST',
        params: {
          userId: userId
        }
      }).then(function (res) {
        sessionStorage.setItem('totalScore', res.totalScore);
        context.commit('setTotalScore', {
          totalScore: Number(res.totalScore)
        });
        resolve({
          userId: userId,
          totalScore: Number(res.totalScore)
        });
      })["catch"](function (error) {
        console.log(error);
        reject(error);
      });
    });
  },
  // 修改总积分
  updateTotalScore: function updateTotalScore(context, res) {
    console.log('update', res);
    return new Promise(function (resolve, reject) {
      (0, _request["default"])({
        url: '/userController/updateTotalScore',
        method: 'POST',
        params: {
          userId: res.userId,
          totalScore: res.totalScore
        }
      }).then(function (res) {
        console.log(res, '积分更新成功');
        context.commit('updateTotalScore', {
          totalScore: Number(res.totalScore)
        });
        resolve(res);
      })["catch"](function (err) {
        console.log(err, '出现错误');
        reject(err);
      });
    });
  }
};
exports["default"] = _default;