const ProcessCaseConf = [
	{
		label: '编号',
		type: 'index',
		width: 80
	},
	{
		label: '用例名称',
		prop: 'nameMedium',
	},
	{
		label: '标签Tag',
		type: 'tag',
		prop: 'descShort',
		width: 200
	},
	{
		label: '最近测试结果',
		type: 'slot',
		slot: 'resultSlot',
		width: 150,
	},
	{
		label: '更新时间',
		prop: 'modifiedTime',
		width: 200,
	},
	{
		label: '创建者',
		prop: 'creatorId',
		width: 80,
	},
	{
		label: '操作',
		type: 'slot',
		slot: 'operationSlot',
		width: 200
	},
]
export {
	ProcessCaseConf
}
