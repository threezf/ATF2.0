let TableHeader = [{
    label: 'path',
    prop: 'path'
}, {
    label: '请求方式',
    prop: 'method',
    width: 100,
    type: 'trans',
    transList: [{
        value: 0,
        label: 'get'
    }, {
        value: 1,
        label: 'post'
    }, {
        value: 2,
        label: 'put'
    }, {
        value: 3,
        label: 'delete'
    }]
}, {
    label: '通信类型',
    prop: 'protocol',
    width: 100,
    type: 'trans',
    transList: [{
        value: "1",
        label: 'http'
    },{
        value: "2",
        label: 'ftp'
    }]
}, {
    label: '请求参数体',
    type: 'slot',
    slot: 'scriptSlot',
}]
export {
    TableHeader
}