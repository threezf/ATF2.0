const EnvironmentConf = [
	{
		label: '环境ID',
		prop: 'id',
		width: 80
	},
	{
		label: '环境名称',
		prop: 'name',
	},
	{
		label: '备注',
		prop: 'remark',
	},
	{
		label: '前置URL',
		prop: 'url',
	},
	{
		label: '操作',
		type: 'slot',
		slot: 'operationSlot',
		width: 200
	},
]
export {
	EnvironmentConf
}
