const InterfaceTestConf = [{
    type: 'select',
    label: '',
    key: 'protocal',
    value: '',
    options: [],
    width: 150,
    right: -10
}, {
    type: 'select',
    label: '',
    key: 'method',
    value: '',
    options: [],
    width: 150,
    right: -10
}, {
    type: 'input',
    label: '',
    key: 'detail',
    value: '/user/points.php',
    width: 640,
    right: 0
}, {
    type: 'select',
    label: '',
    key: 'usecase',
    value: '',
    width: 150,
    placeholder: '请选择测试用例',
    options: []
}, {
    type: 'slot',
    slot: 'runnerSlot'
}]

const ResultHeader = [{
    label: '测试时间',
    prop: 'time',
    width: 200
}, {
    label: '请求地址',
    type: 'slot',
    slot: 'addressSlot'
}, {
    label: '返回状态',
    prop: 'status',
    width: 100
}, {
    label: '请求时常',
    prop: 'len',
    width: 100
}, {
    label: '操作',
    type: 'slot',
    slot: 'operationSlot',
    width: 100
}]

export {
    InterfaceTestConf,
    ResultHeader
}