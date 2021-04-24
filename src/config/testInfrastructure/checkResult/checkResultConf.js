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
export {
	RespCodeOptions,
	JSONTypeOptions,
	ArrayTypeOptions,
	ParamTypeOptions,
	CheckContentOptions,
	CheckContentOptionsShort
}
