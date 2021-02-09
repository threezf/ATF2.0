"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompareTypeOptions = exports.PropertyNameOptions = void 0;
var PropertyNameOptions = [{
  value: "caseCompositeType",
  label: "用例组成类型"
}, {
  value: "casecode",
  label: "用例编号"
}, {
  value: "autId",
  label: "被测系统"
}, {
  value: "testDesign",
  label: "测试意图"
}, {
  value: "preRequisites",
  label: "前置条件"
}, {
  value: "dataRequest",
  label: "数据需求"
}, {
  value: "testStep",
  label: "测试步骤"
}, {
  value: "expectResult",
  label: "预期结果"
}, {
  value: "checkPoint",
  label: "附加检查点"
}, {
  value: "caseProperty",
  label: "用例性质"
}, // {
//     value: "caseType",
//     label: "测试用例类型"
// },
{
  value: "author",
  label: "作者"
} // {
//     value: "reviewer",
//     label: "执行者"
// },
// {
//     value: "scriptModeFlag",
//     label: "脚本管理方式"
// },
// {
// 	value: "executeMethod",
// 	label: "执行方式"
// }
];
exports.PropertyNameOptions = PropertyNameOptions;
var CompareTypeOptions = {
  caseCompositeType: [{
    value: "=",
    label: "等于",
    itemType: true,
    // false/输入框; true/下拉框
    itemList: [{
      value: "1",
      label: "单用例"
    }, {
      value: "2",
      label: "流程用例"
    }]
  }, {
    value: "!=",
    label: "不等于",
    itemType: true,
    // false/输入框; true/下拉框
    itemList: [{
      value: "1",
      label: "单用例"
    }, {
      value: "2",
      label: "流程用例"
    }]
  }],
  casecode: [{
    value: "=",
    label: "等于",
    itemType: false // false/输入框; true/下拉框

  }, {
    value: "!=",
    label: "不等于",
    itemType: false // false/输入框; true/下拉框

  }, {
    value: "C",
    label: "包含",
    itemType: false // false/输入框; true/下拉框

  }, {
    value: "!C",
    label: "不包含",
    itemType: false // false/输入框; true/下拉框

  }],
  autId: [{
    value: "=",
    label: "等于",
    itemType: true,
    // false/输入框; true/下拉框
    itemList: []
  }, {
    value: "!=",
    label: "不等于",
    itemType: true,
    // false/输入框; true/下拉框
    itemList: []
  }, {
    value: "in",
    label: "属于",
    multiple: true,
    itemType: true,
    // false/输入框; true/下拉框
    itemList: []
  }, {
    value: "!in",
    label: "不属于",
    multiple: true,
    itemType: true,
    // false/输入框; true/下拉框
    itemList: []
  }],
  testDesign: [{
    value: "C",
    label: "包含",
    itemType: false // false/输入框; true/下拉框

  }, {
    value: "!C",
    label: "不包含",
    itemType: false // false/输入框; true/下拉框

  }],
  preRequisites: [{
    value: "C",
    label: "包含",
    itemType: false // false/输入框; true/下拉框

  }, {
    value: "!C",
    label: "不包含",
    itemType: false // false/输入框; true/下拉框

  }],
  dataRequest: [{
    value: "C",
    label: "包含",
    itemType: false // false/输入框; true/下拉框

  }, {
    value: "!C",
    label: "不包含",
    itemType: false // false/输入框; true/下拉框

  }],
  testStep: [{
    value: "C",
    label: "包含",
    itemType: false // false/输入框; true/下拉框

  }, {
    value: "!C",
    label: "不包含",
    itemType: false // false/输入框; true/下拉框

  }],
  expectResult: [{
    value: "C",
    label: "包含",
    itemType: false // false/输入框; true/下拉框

  }, {
    value: "!C",
    label: "不包含",
    itemType: false // false/输入框; true/下拉框

  }],
  checkPoint: [{
    value: "C",
    label: "包含",
    itemType: false // false/输入框; true/下拉框

  }, {
    value: "!C",
    label: "不包含",
    itemType: false // false/输入框; true/下拉框

  }],
  caseProperty: [{
    value: "=",
    label: "等于",
    itemType: true,
    // false/输入框; true/下拉框
    itemList: []
  }, {
    value: "!=",
    label: "不等于",
    itemType: true,
    // false/输入框; true/下拉框
    itemList: []
  }, {
    value: "in",
    label: "属于",
    multiple: true,
    itemType: true,
    // false/输入框; true/下拉框
    itemList: []
  }, {
    value: "!in",
    label: "不属于",
    multiple: true,
    itemType: true,
    // false/输入框; true/下拉框
    itemList: []
  }],
  // caseType:[
  // 	{
  // 		value: "=",
  // 		label: "等于",
  // 		itemType: true, // false/输入框; true/下拉框
  // 		itemList: []
  // 	},
  // 	{
  // 		value: "!=",
  // 		label: "不等于",
  // 		itemType: true, // false/输入框; true/下拉框
  // 		itemList: []
  // 	},
  // 	{
  // 		value: "in",
  // 		label: "属于",
  // 		multiple: true,
  // 		itemType: true, // false/输入框; true/下拉框
  // 		itemList: []
  // 	},
  // 	{
  // 		value: "!in",
  // 		label: "不属于",
  // 		multiple: true,
  // 		itemType: true, // false/输入框; true/下拉框
  // 		itemList: []
  // 	},
  // ],
  // priority:[
  // 	{
  // 		value: "=",
  // 		label: "等于",
  // 		itemType: true, // false/输入框; true/下拉框
  // 		itemList: []
  // 	},
  // 	{
  // 		value: "!=",
  // 		label: "不等于",
  // 		itemType: true, // false/输入框; true/下拉框
  // 		itemList: []
  // 	},
  // 	{
  // 		value: "in",
  // 		label: "属于",
  // 		multiple: true,
  // 		itemType: true, // false/输入框; true/下拉框
  // 		itemList: []
  // 	},
  // 	{
  // 		value: "!in",
  // 		label: "不属于",
  // 		multiple: true,
  // 		itemType: true, // false/输入框; true/下拉框
  // 		itemList: []
  // 	},
  // ],
  author: [{
    value: "=",
    label: "等于",
    itemType: true,
    // false/输入框; true/下拉框
    itemList: []
  }, {
    value: "!=",
    label: "不等于",
    itemType: true,
    // false/输入框; true/下拉框
    itemList: []
  }, {
    value: "in",
    label: "属于",
    multiple: true,
    itemType: true,
    // false/输入框; true/下拉框
    itemList: []
  }, {
    value: "!in",
    label: "不属于",
    multiple: true,
    itemType: true,
    // false/输入框; true/下拉框
    itemList: []
  }] // reviewer:[
  // 	{
  // 		value: "=",
  // 		label: "等于",
  // 		itemType: true, // false/输入框; true/下拉框
  // 		itemList: []
  // 	},
  // 	{
  // 		value: "!=",
  // 		label: "不等于",
  // 		itemType: true, // false/输入框; true/下拉框
  // 		itemList: []
  // 	},
  // 	{
  // 		value: "in",
  // 		label: "属于",
  // 		multiple: true,
  // 		itemType: true, // false/输入框; true/下拉框
  // 		itemList: []
  // 	},
  // 	{
  // 		value: "!in",
  // 		label: "不属于",
  // 		multiple: true,
  // 		itemType: true, // false/输入框; true/下拉框
  // 		itemList: []
  // 	},
  // ],

};
exports.CompareTypeOptions = CompareTypeOptions;