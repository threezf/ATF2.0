"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _wiiFeUtils = require("wii-fe-utils");

var _vacFunctions = _interopRequireDefault(require("./vac-functions.es"));

var _methods;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _default = {
  filters: {
    changeTime: function changeTime(value) {
      return _wiiFeUtils.TimeUtils.timestampToTime(value, 'yyyy-MM-dd hh:mm:ss');
    }
  },
  data: function data() {
    return {
      Vac: _vacFunctions["default"],
      verifyId: _wiiFeUtils.SessionStorage.get('unigroupuid'),
      rtx: _wiiFeUtils.SessionStorage.get('unigrouprtx'),
      componentAppId: 'wx1ec08a99274a048d',
      address4: 'http://140.143.16.21:9090/',
      currentPort: '9090' // address4:'http://10.101.167.184:8080/'

    };
  },
  methods: (_methods = {
    transTime: function transTime(row, column, cellValue) {
      // console.log(cellValue)
      return _wiiFeUtils.TimeUtils.timestampToTime(cellValue, 'yyyy-MM-dd hh:mm:ss');
    },
    setBackground: function setBackground() {
      var caseCbs = $('input.check-case');
      this.$nextTick(function () {
        $.each(caseCbs, function (index, ele) {
          if (ele.checked) {
            $(ele).parents('.case-header').css({
              "border-color": "rgb(69, 185, 177)"
            });
            $(ele).parents('.case-header').css({
              "background-color": "rgb(69, 185, 177)"
            });
            $('p', $(ele).parents('.case-header')).css({
              "color": "#fff"
            });
          } else {
            $(ele).parents('.case-header').css({
              "border-color": "#ddd5d5"
            });
            $(ele).parents('.case-header').css({
              "background-color": "#fff"
            });
            $('p', $(ele).parents('.case-header')).css({
              "color": "#797979"
            });
          }
        });
      });
    },
    setSelect: function setSelect(event) {
      var _this = this;

      var target = event.target;

      if (target.classList.contains('handle')) {
        return;
      } // if (!target.classList.contains('main-content')) { return false; }


      var container = document.querySelector('.main-content');
      var fileNodes = document.querySelectorAll(".case .check-case");

      var startX = event.offsetX + _vacFunctions["default"].getOffsetTo(event.target, container).offsetLeft;

      var startY = event.offsetY + _vacFunctions["default"].getOffsetTo(event.target, container).offsetTop;

      var moveBeforeX = event.pageX;
      var moveBeforeY = event.pageY;
      var selDiv = document.createElement('div');
      selDiv.style.cssText = "position:absolute;width:0px;height:0px;\n            font-size:0px;margin:0px;padding:0px;border:1px dashed #0099FF;\n            background-color:#C3D5ED;z-index:1000;filter:alpha(opacity:60);\n            opacity:0.6;display:none;";
      selDiv.id = 'selectDiv';
      document.querySelector('.main-content').appendChild(selDiv);
      selDiv.style.left = startX + "px";
      selDiv.style.top = startY + 'px';
      var _x = null;
      var _y = null;
      var moveAfterX = null;
      var moveAfterY = null;
      event.stopPropagation();
      event.preventDefault();
      var selectedRange = []; // 函数节流
      // var moveFunction = Vac.throttle(mouseMoveFunction, 30, _this)

      var moveFunction = mouseMoveFunction;
      container.addEventListener('mousemove', moveFunction, false);
      container.addEventListener('mouseup', function (event) {
        // this.isSelect = true;
        if (selDiv) {
          document.querySelector('.main-content').removeChild(selDiv);
        }

        container.removeEventListener('mousemove', moveFunction, false);
        selDiv = null;
      }, false);

      function mouseMoveFunction(event) {
        if (selDiv.style.display == 'none') {
          selDiv.style.display = "block";
        }

        moveAfterX = event.pageX;
        moveAfterY = event.pageY; // 获取鼠标移动后的位置

        _x = startX - moveBeforeX + moveAfterX;
        _y = startY - moveBeforeY + moveAfterY;
        selDiv.style.left = Math.min(_x, startX) + "px";
        selDiv.style.top = Math.min(_y, startY) + "px";
        selDiv.style.width = Math.abs(_x - startX) + "px";
        selDiv.style.height = Math.abs(_y - startY) + "px";
        var _l = selDiv.offsetLeft,
            _t = selDiv.offsetTop;

        var _r = selDiv.offsetWidth + _l,
            _b = selDiv.offsetHeight + _t;

        for (var i = 0; i < fileNodes.length; i++) {
          var inputLeft = _vacFunctions["default"].getOffsetTo(fileNodes[i], container).offsetLeft;

          var inputTop = _vacFunctions["default"].getOffsetTo(fileNodes[i], container).offsetTop;

          var inputRight = inputLeft + fileNodes[i].offsetWidth;
          var inputBottom = inputTop + fileNodes[i].offsetHeight;

          if (inputBottom < _b && inputTop > _t && inputLeft > _l && inputRight < _r) {
            selectedRange.push(fileNodes[i]);
          }
        }

        for (var i = 0; i < selectedRange.length; i++) {
          var inputLeft = _vacFunctions["default"].getOffsetTo(selectedRange[i], container).offsetLeft;

          var inputTop = _vacFunctions["default"].getOffsetTo(selectedRange[i], container).offsetTop;

          var inputRight = inputLeft + selectedRange[i].offsetWidth;
          var inputBottom = inputTop + selectedRange[i].offsetHeight;
          var value = selectedRange[i].value;

          if (inputBottom < _b && inputTop > _t && inputLeft > _l && inputRight < _r) {
            if ($(selectedRange[i]).hasClass('single-case')) {
              _this.pushNoRepeat(_this.selectedCases, +value);
            } else {
              _this.pushNoRepeat(_this.checkedFlowNodes, +value);
            }
          } else {
            if ($(selectedRange[i]).hasClass('single-case')) {
              var set = new Set(_this.selectedCases);
              set["delete"](+value);
              _this.selectedCases = _toConsumableArray(set);
            } else {
              var _set = new Set(_this.checkedFlowNodes);

              _set["delete"](+value);

              _this.checkedFlowNodes = _toConsumableArray(_set);
            }
          }

          _this.setBackground();
        }

        event.stopPropagation();
        event.preventDefault();
      }

      ;
    },
    setSelectListener: function setSelectListener() {// document.querySelector('.main-content').addEventListener('mousedown',this.setSelect,false);
    },
    pushNoRepeat: function pushNoRepeat(array, value) {
      array.includes(value) ? 1 : array.push(value);
    },
    // 点击checkbox
    checkChanged: function checkChanged(event) {
      var parent = event.target.parentNode.parentNode.parentNode;
      var checkallId = +parent.parentNode.querySelector('.checkall').value;
      var inputs = Array.from(parent.querySelectorAll('.check-case'));

      if (inputs.every(function (value) {
        return value.checked === true;
      })) {
        this.selectedCases.push(checkallId);
      } else {
        var set = new Set(this.selectedCases);
        set["delete"](checkallId);
        this.selectedCases = _toConsumableArray(set);
      }

      this.setBackground();
    },
    checkallToggle: function checkallToggle(event) {
      var flag = event.target.checked;
      var inputs = event.target.parentNode.parentNode.parentNode.getElementsByClassName('check-case');
      var inputValue = [];

      if (flag) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = inputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var input = _step.value;
            !this.checkedFlowNodes.includes(+input.value) ? this.checkedFlowNodes.push(+input.value) : 1;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } else {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = inputs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var input = _step2.value;
            var set = new Set(this.checkedFlowNodes);
            var value = +input.value;

            if (set.has(value)) {
              set["delete"](value);
            }

            this.checkedFlowNodes = _toConsumableArray(set);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      this.setBackground();
    },
    checkallBox: function checkallBox(event) {
      var _this2 = this;

      if (this.checkall === true) {
        this.caseIds.forEach(function (value) {
          _this2.selectedCases.includes(value) ? 1 : _this2.selectedCases.push(value);
          _this2.flowNodeIds.has(+value) ? _this2.checkedFlowNodes = [].concat(_toConsumableArray(_this2.checkedFlowNodes), _toConsumableArray(_this2.flowNodeIds.get(+value))) : 1;
        });
      } else {
        this.selectedCases = [];
        this.checkedFlowNodes = [];
      }

      this.setBackground();
    },
    checkAllInScene: function checkAllInScene(event) {
      var flag = event.target.checked;
      var inputs = Array.from(event.target.parentNode.parentNode.querySelectorAll('input[type=checkbox]'));

      for (var _i = 0, _inputs = inputs; _i < _inputs.length; _i++) {
        var input = _inputs[_i];
        input.checked = flag;
        flag === true ? _vacFunctions["default"].pushNoRepeat(this.selectedSceneCases, input.value) : this.selectedSceneCases.indexOf(input.value) >= 0 ? this.selectedSceneCases.splice(this.selectedSceneCases.indexOf(input.value), 1) : 1;
      }

      this.setBackground();
    },
    checkAllFlowNodes: function checkAllFlowNodes(event) {
      var _this3 = this;

      var _this = this;

      var flag = event.target.checked;
      var caseLibDiv = event.target.parentNode.parentNode.parentNode;
      var caseListDiv = caseLibDiv.parentNode.parentNode;
      var inputs = Array.from(caseLibDiv.querySelectorAll('.check-case'));

      if (flag === true) {
        // get all the flownodes in this flowcase
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = inputs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var input = _step3.value;

            _vacFunctions["default"].pushNoRepeat(this.selectedSceneCases, input.value);
          } // get all the check-flownodes and if all the check-flownodes' value is in the selectedSceneCases,
          // then set the checkall-inscene true

        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        var checkFlowNodesInputs = Array.from(caseListDiv.querySelectorAll('.check-flownodes'));

        if (checkFlowNodesInputs.every(function (input) {
          return _this3.selectedSceneCases.includes(input.value);
        })) {
          caseListDiv.querySelector('.checkall-inscene').checked = true;

          _this.checkallSceneIds.push(+caseListDiv.querySelector('.checkall-inscene').value);
        }
      } else {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = inputs[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _input = _step4.value;
            this.selectedSceneCases.includes(_input.value) ? this.selectedSceneCases.splice(this.selectedSceneCases.indexOf(_input.value), 1) : 1;
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
              _iterator4["return"]();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        var value = caseListDiv.querySelector('.checkall-inscene').value;
        caseListDiv.querySelector('.checkall-inscene').checked = false;
        var set = new Set(_this.checkallSceneIds);
        set.has(+value) ? set["delete"](+value) : 1;
        _this.checkallSceneIds = _toConsumableArray(set);
      }

      caseLibDiv = null;
      inputs = null;
      caseListDiv = null;
      this.setBackground();
    },
    checkFlowNode: function checkFlowNode(event) {
      var _this4 = this;

      var _this = this;

      var flag = event.target.checked;
      var caseDiv = event.target.parentNode.parentNode;
      var caseListDiv = caseDiv.parentNode.parentNode;
      var caseId = caseDiv.parentNode.querySelector('.check-flownodes').value;

      if (flag) {
        var inputs = _toConsumableArray(caseDiv.querySelectorAll('.check-case'));

        if (inputs.every(function (input) {
          return _this4.selectedSceneCases.includes(input.value);
        })) {
          _vacFunctions["default"].pushNoRepeat(this.selectedSceneCases, caseId);

          var caseInputs = _toConsumableArray(caseListDiv.querySelectorAll('.check-flownodes'));

          if (caseInputs.every(function (input) {
            return _this4.selectedSceneCases.includes(input.value);
          })) {
            caseListDiv.querySelector('.checkall-inscene').checked = true;

            _this.checkallSceneIds.push(+caseListDiv.querySelector('.checkall-inscene').value);
          } else {
            caseListDiv.querySelector('.checkall-inscene').checked = false;
            var value = caseListDiv.querySelector('.checkall-inscene').value;
            var set = new Set(_this.checkallSceneIds);
            set.has(+value) ? set["delete"](+value) : 1;
            _this.checkallSceneIds = _toConsumableArray(set);
          }
        } else {
          if (this.selectedSceneCases.includes(caseId)) {
            this.selectedSceneCases.splice(this.selectedSceneCases.indexOf(caseId), 1);
          }

          caseListDiv.querySelector('.checkall-inscene').checked = false;
          var _value = caseListDiv.querySelector('.checkall-inscene').value;

          var _set2 = new Set(_this.checkallSceneIds);

          _set2.has(+_value) ? _set2["delete"](+_value) : 1;
          _this.checkallSceneIds = _toConsumableArray(_set2);
        }

        inputs = null;
      } else {
        if (this.selectedSceneCases.includes(caseId)) {
          this.selectedSceneCases.splice(this.selectedSceneCases.indexOf(caseId), 1);
        }

        caseListDiv.querySelector('.checkall-inscene').checked = false;
        var _value2 = caseListDiv.querySelector('.checkall-inscene').value;

        var _set3 = new Set(_this.checkallSceneIds);

        _set3.has(+_value2) ? _set3["delete"](+_value2) : 1;
        _this.checkallSceneIds = _toConsumableArray(_set3);
      }

      caseListDiv = null;
      caseDiv = null; // console.log(_this.checkallSceneIds)

      this.setBackground();
    }
  }, _defineProperty(_methods, "setSelect", function setSelect(event) {
    var _this = this;

    var target = event.target;

    if (target.classList.contains('handle1') || target.classList.contains('handle')) {
      return;
    }

    var container = document.querySelector('.main-content2');
    var fileNodes = document.querySelectorAll(".case .check-case");

    var startX = event.offsetX + _vacFunctions["default"].getOffsetTo(event.target, container).offsetLeft;

    var startY = event.offsetY + _vacFunctions["default"].getOffsetTo(event.target, container).offsetTop;

    var moveBeforeX = event.pageX;
    var moveBeforeY = event.pageY;
    var selDiv = document.createElement('div');
    selDiv.style.cssText = "position:absolute;width:0px;height:0px;\n            font-size:0px;margin:0px;padding:0px;border:1px dashed #0099FF;\n            background-color:#C3D5ED;z-index:1000;filter:alpha(opacity:60);\n            opacity:0.6;display:none;";
    selDiv.id = 'selectDiv';
    container.appendChild(selDiv);
    selDiv.style.left = startX + "px";
    selDiv.style.top = startY + 'px';
    var _x = null;
    var _y = null;
    var moveAfterX = null;
    var moveAfterY = null;
    event.stopPropagation();
    event.preventDefault();
    var selectedRange = [];
    var moveFunction = mouseMoveFunction;
    container.addEventListener('mousemove', moveFunction, false);
    container.addEventListener('mouseup', function (event) {
      // this.isSelect = true;
      if (selDiv) {
        container.removeChild(selDiv);
      }

      container.removeEventListener('mousemove', moveFunction, false);
      selDiv = null;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = _this.sceneIds[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var sceneid = _step5.value;

          if (_this.sceneCaseMap.get(sceneid).every(function (value) {
            return _this.selectedSceneCases.includes(value);
          })) {
            _vacFunctions["default"].pushNoRepeat(_this.checkallSceneIds, sceneid);
          } else {
            if (_this.checkallSceneIds.includes(sceneid)) {
              var set = new Set(_this.checkallSceneIds);
              set["delete"](sceneid);
              _this.checkallSceneIds = _toConsumableArray(set);
            }
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = _this.sceneCaseIds[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var caseId = _step6.value;

          if (_this.flowNodesMap.get(caseId).every(function (value) {
            return _this.selectedSceneCases.includes(value);
          })) {
            _vacFunctions["default"].pushNoRepeat(_this.selectedSceneCases, caseId);
          } else {
            if (_this.selectedSceneCases.includes(caseId)) {
              var _set4 = new Set(_this.selectedSceneCases);

              _set4["delete"](caseId);

              _this.selectedSceneCases = _toConsumableArray(_set4);
            }
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    }, false);

    function mouseMoveFunction(event) {
      if (selDiv.style.display == 'none') {
        selDiv.style.display = "block";
      }

      moveAfterX = event.pageX;
      moveAfterY = event.pageY; // 获取鼠标移动后的位置

      _x = startX - moveBeforeX + moveAfterX;
      _y = startY - moveBeforeY + moveAfterY;
      selDiv.style.left = Math.min(_x, startX) + "px";
      selDiv.style.top = Math.min(_y, startY) + "px";
      selDiv.style.width = Math.abs(_x - startX) + "px";
      selDiv.style.height = Math.abs(_y - startY) + "px";
      var _l = selDiv.offsetLeft,
          _t = selDiv.offsetTop;

      var _r = selDiv.offsetWidth + _l,
          _b = selDiv.offsetHeight + _t;

      for (var i = 0; i < fileNodes.length; i++) {
        var inputLeft = _vacFunctions["default"].getOffsetTo(fileNodes[i], container).offsetLeft;

        var inputTop = _vacFunctions["default"].getOffsetTo(fileNodes[i], container).offsetTop;

        var inputRight = inputLeft + fileNodes[i].offsetWidth;
        var inputBottom = inputTop + fileNodes[i].offsetHeight;

        if (inputBottom < _b && inputTop > _t && inputLeft > _l && inputRight < _r) {
          // selectedRange.push(fileNodes[i]);
          _vacFunctions["default"].pushNoRepeat(selectedRange, fileNodes[i]);
        }
      }

      for (var i = 0; i < selectedRange.length; i++) {
        var inputLeft = _vacFunctions["default"].getOffsetTo(selectedRange[i], container).offsetLeft;

        var inputTop = _vacFunctions["default"].getOffsetTo(selectedRange[i], container).offsetTop;

        var inputRight = inputLeft + selectedRange[i].offsetWidth;
        var inputBottom = inputTop + selectedRange[i].offsetHeight;
        var value = selectedRange[i].value;

        if (inputRight > _l && inputBottom > _t && inputLeft < _r && inputTop < _b) {
          if ($(selectedRange[i]).hasClass('single-case-incaselib')) {
            _vacFunctions["default"].pushNoRepeat(_this.selectedCases, +value);
          } else if ($(selectedRange[i]).hasClass('flow-node-incaselib')) {
            _vacFunctions["default"].pushNoRepeat(_this.checkedFlowNodes, +value);
          } else {
            _vacFunctions["default"].pushNoRepeat(_this.selectedSceneCases, value);
          }
        } else {
          if ($(selectedRange[i]).hasClass('single-case-incaselib')) {
            var set = new Set(_this.selectedCases);
            set["delete"](+value);
            _this.selectedCases = _toConsumableArray(set);
          } else if ($(selectedRange[i]).hasClass('flow-node-incaselib')) {
            var _set5 = new Set(_this.checkedFlowNodes);

            _set5["delete"](+value);

            _this.checkedFlowNodes = _toConsumableArray(_set5);
          } else {
            var _set6 = new Set(_this.selectedSceneCases);

            _set6["delete"](value);

            _this.selectedSceneCases = _toConsumableArray(_set6);
          }
        }

        _this.setBackground();
      }

      event.stopPropagation();
      event.preventDefault();
    }
  }), _defineProperty(_methods, "setSelectListener", function setSelectListener() {
    // document.querySelector('.main-content2').addEventListener('mousedown',Vac.throttle(this.setSelect, 1000, this),false);
    document.querySelector('.main-content2').addEventListener('mousedown', this.setSelect, false); // 防止点击用例框时也进行选取
    // var caseLibs = Array.from(document.querySelectorAll('.case-lib'))
    // console.log(caseLibs)
    // for(let caseLib of caseLibs) {
    // 	console.log(caseLib)
    // 	caseLib.addEventListener('mousedown', function(event){
    // 		console.log(event.target)
    // 	})
    // }
  }), _methods)
};
exports["default"] = _default;