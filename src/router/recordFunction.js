/**
 *	录制功能界面路由
 */
import RecordFunctionIndex from '@/views/recordFunction/index';
import RecordManagement from '@/views/recordFunction/recordManagement';
import RuleExecution from '@/views/recordFunction/ruleExecution';
import QueryRuleExecution from '@/views/recordFunction/queryRuleExecution';
import QueryExecutionRecord from '@/views/recordFunction/queryExecutionRecord';

export default {
	path:'/recordFunction',
	name: 'RecordFunction',
	component: RecordFunctionIndex,
	redirect: '/recordFunction/recordManagement',
	meta: {
		name: '录制功能'
	},
	children:[
		{
			path: 'recordManagement',
			name: 'RecordManagement',
			component: RecordManagement,
			meta: {
				name: '录制管理',
				parent: 'RecordFunction',
				icon: 'el-icon-video-camera'
			}
		},
		{
			path: 'ruleExecution',
			name: 'RuleExecution',
			component: RuleExecution,
			meta: {
				name: '规则执行',
				parent: 'RecordFunction',
				icon: 'el-icon-video-play'
			}
		},
		{
			path: 'queryRuleExecution',
			name: 'QueryRuleExecution',
			component: QueryRuleExecution,
			meta: {
				name: '规则执行查询',
				parent: 'RecordFunction',
				icon: 'el-icon-search'
			}
		},
		{
			path: 'queryExecutionRecord',
			name: 'QueryExecutionRecord',
			component: QueryExecutionRecord,
			meta: {
				name: '执行记录查询',
				parent: 'RecordFunction',
				icon: 'el-icon-search'
			}
		}
	]
}
