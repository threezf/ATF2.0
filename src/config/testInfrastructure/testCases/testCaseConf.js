const CaseConf = [
	{
		label: '',
		tableType: 'selection',
		width: 100
	},
	{
		label: '用例名称',
		prop: 'projectName',
	},
	{
		label: '最近测试结果',
		type: 'slot',
		slot: 'resultSlot',
		width: 150,
	},
	{
		label: '测试时间',
		prop: 'timeStamp',
		width: 200,
	},
	{
		label: '创建者',
		prop: 'createUser',
		width: 80,
	},
	{
		label: '测试报告',
		type: 'slot',
		slot: 'reportSlot',
		width: 100
	},
	{
		label: '操作',
		type: 'slot',
		slot: 'operationSlot',
		width: 300
	},
]
export {
	CaseConf
}
