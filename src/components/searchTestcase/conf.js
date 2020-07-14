let PropertyNameOptions = [
    {
        value: "caseCompositeType",
        label: "用例组成类型"
    },
    {
        value: "casecode",
        label: "用例编号"
    },
    // {
    //     value: "missionId",
    //     label: "测试任务"
    // },
    {
        value: "autId",
        label: "被测系统"
    },
    // {
    //     value: "testDesign",
    //     label: "测试意图"
    // },
    // {
    //     value: "preRequisites",
    //     label: "前置条件"
    // },
    // {
    //     value: "dataRequest",
    //     label: "数据需求"
    // },
    // {
    //     value: "testStep",
    //     label: "测试步骤"
    // },
    // {
    //     value: "expectResult",
    //     label: "预期结果"
    // },
    // {
    //     value: "checkPoint",
    //     label: "附加检查点"
    // },
    // {
    //     value: "caseProperty",
    //     label: "用例性质"
    // },
    // {
    //     value: "caseType",
    //     label: "测试用例类型"
    // },
    // {
    //     value: "priority",
    //     label: "优先级"
    // },
    // {
    //     value: "author",
    //     label: "作者"
    // },
    // {
    //     value: "reviewer",
    //     label: "评审者"
    // },
    // {
    //     value: "scriptModeFlag",
    //     label: "所属模板"
    // },
]
let CompareTypeOptions = {
    caseCompositeType: [
        {
            value: "=",
            label: "等于",
            itemType: true, // false/输入框; true/下拉框
            itemList: [
                {
                    value: "1",
                    label: "单用例",
                },
                {
                    value: "2",
                    label: "流程用例",
                },
            ]
        },
        {
            value: "!=",
            label: "不等于",
            itemType: true, // false/输入框; true/下拉框
            itemList: [
                {
                    value: "1",
                    label: "单用例",
                },
                {
                    value: "2",
                    label: "流程用例",
                },
            ]
        }
    ],
    casecode: [
        {
            value: "=",
            label: "等于",
            itemType: false, // false/输入框; true/下拉框
        },
        {
            value: "!=",
            label: "不等于",
            itemType: false, // false/输入框; true/下拉框
        },
        {
            value: "C",
            label: "包含",
            itemType: false, // false/输入框; true/下拉框
        },
        {
            value: "!C",
            label: "不包含",
            itemType: false, // false/输入框; true/下拉框
        },
    ],
    autId: [
        {
            value: "=",
            label: "等于",
            itemType: true, // false/输入框; true/下拉框
            itemList: []
        },
        {
            value: "!=",
            label: "不等于",
            itemType: true, // false/输入框; true/下拉框
            itemList: []
        },
        {
            value: "in",
            label: "属于",
            multiple: true,
            itemType: true, // false/输入框; true/下拉框
            itemList: []
        },
        {
            value: "!in",
            label: "不属于",
            multiple: true,
            itemType: true, // false/输入框; true/下拉框
            itemList: []
        },
    ]

}
export { 
    PropertyNameOptions,
    CompareTypeOptions
}