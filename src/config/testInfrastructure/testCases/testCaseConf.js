const CaseConf = [
	{
		label: '用例名称',
		prop: 'name',
	},
	{
		label: '最近测试结果',
		type: 'slot',
		slot: 'resultSlot',
		width: 150,
	},
	{
		label: '测试时间',
		prop: 'time',
		width: 200,
	},
	{
		label: '创建者',
		prop: 'createUser',
		width: 80,
	},
	{
		label: '操作',
		type: 'slot',
		slot: 'operationSlot',
		width: 250
	},
]
export {
	CaseConf
}
