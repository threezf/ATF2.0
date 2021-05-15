const RespCodeOptions=[
		{
			id: 0,
			value: '200'
		},
		{
			id: 1,
			value: '302'
		},
		{
			id: 2,
			value: '404'
		},
		{
			id: 3,
			value: '500'
		},
		{
			id: 4,
			value: '502'
		},
		{
			id: 5,
			value: '自定义'
		},
	]
const	JSONTypeOptions=[
		{
			id: 0,
			value: 'Object'
		},
		{
			id: 1,
			value: 'Array'
		},
	]
const	ArrayTypeOptions=[
		{
			id: 0,
			value: '仅校验第一个元素'
		},
		{
			id: 1,
			value: '校验所有元素'
		},
	]
const ParamTypeOptions = [
	{
		id: 0,
		value: 'string'
	},
	{
		id: 1,
		value: 'int'
	},
	{
		id: 2,
		value: 'bool'
	},
	{
		id: 3,
		value: 'float'
	},
	{
		id: 4,
		value: 'array'
	},
	{
		id: 5,
		value: 'object'
	},
	{
		id: 6,
		value: 'null'
	},
]
const CheckContentOptions = [
	{
		id: 0,
		value: '不校验[]'
	},
	{
		id: 1,
		value: '值-等于[value =]'
	},
	{
		id: 2,
		value: '值-不等于[value !=]'
	},
	{
		id: 3,
		value: '值-大于[value >]'
	},
	{
		id: 4,
		value: '值-大于等于[value >=]'
	},
	{
		id: 5,
		value: '值-小于[value <]'
	},
	{
		id: 6,
		value: '值-小于等于[value <=]'
	},
	{
		id: 7,
		value: '值-包含[include =]'
	},
	{
		id: 8,
		value: '长度-等于[length =]'
	},
	{
		id: 9,
		value: '长度-不等于[length !=]'
	},
	{
		id: 10,
		value: '长度-大于[length >]'
	},
	{
		id: 11,
		value: '长度-小于[length <]'
	},
	{
		id: 12,
		value: '正则匹配[Reg =]'
	},
]
const CheckContentOptionsShort = [
	{
		id: 0,
		value: '不校验[]'
	},
	{
		id: 1,
		value: '值-等于[value =]'
	},
	{
		id: 2,
		value: '值-不等于[value !=]'
	},
]
const LabelOptions = [{
	id: 0,
	value: 'Accept'
}, {
	id: 1,
	value: 'Accept-Charset'
}, {
	id: 2,
	value: 'Accept-Encoding'
}, {
	id: 3,
	value: 'Accept-Language'
}, {
	id: 4,
	value: 'Accept-Ranges'
}, {
	id: 5,
	value: 'Accept-Authorization'
}, {
	id: 6,
	value: 'Cache-Control'
}, {
	id: 7,
	value: 'Connection'
}, {
	id: 8,
	value: 'Cookie'
}, {
	id: 9,
	value: 'Content-Length'
}, {
	id: 10,
	value: 'Content-Type'
}, {
	id: 11,
	value: 'Content-MD5'
}, {
	id: 12,
	value: 'Date'
}, {
	id: 13,
	value: 'Expect'
}, {
	id: 14,
	value: 'From'
}, {
	id: 15,
	value: 'Host'
}, {
	id: 16,
	value: 'If-Match'
}, {
	id: 17,
	value: 'If-Modified-Since'
}, {
	id: 18,
	value: 'If-None-Match'
}, {
	id: 19,
	value: 'If-Range'
}, {
	id: 20,
	value: 'If-Unmodified-Since'
}, {
	id: 21,
	value: 'Max-Forwards'
}, {
	id: 22,
	value: 'Origin'
}, {
	id: 23,
	value: 'Pragma'
}, {
	id: 24,
	value: 'Proxy-Authorization'
}, {
	id: 25,
	value: 'Range'
}, {
	id: 26,
	value: 'Referer'
}, {
	id: 27,
	value: 'TE'
}, {
	id: 28,
	value: 'Upgrade'
}, {
	id: 29,
	value: 'User-Agent'
}, {
	id: 30,
	value: 'Via'
}, {
	id: 31,
	value: 'Warning'
}]
const ResponseTableHeader = [{
	label: '标签',
	type: 'slot',
	slot: 'labelSlot',
// }, {
// 	label: '内容校验',
// 	type: 'slot',
// 	slot: 'contentSlot'
}, {
	label: '预期结果',
	type: 'slot',
	slot: 'resultSlot'
}, {
	label: '说明',
	type: 'slot',
	slot: 'desctSlot'
}, {
	label: '操作',
	type: 'slot',
	slot: 'operationSlot',
}]

export {
	RespCodeOptions,
	JSONTypeOptions,
	ArrayTypeOptions,
	ParamTypeOptions,
	CheckContentOptions,
	CheckContentOptionsShort,
	ResponseTableHeader,
	LabelOptions
}
