"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _HelloWorld = _interopRequireDefault(require("@/components/HelloWorld"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('HelloWorld.vue', function () {
  it('should render correct contents', function () {
    var Constructor = _vue["default"].extend(_HelloWorld["default"]);

    var vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.hello h1').textContent);
  });
});