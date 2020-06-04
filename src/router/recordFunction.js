/*
 * @Author: your name
 * @Date: 2019-12-10 15:19:52
 * @LastEditTime: 2020-05-17 10:27:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ATF2.0\src\router\recordFunction.js
 */
/**
 *	录制功能界面路由
 */
import RecordFunctionIndex from '@/views/recordFunction/index';
import RecordManagementRouter from '@/views/recordFunction/recordManagementRouter'
import RecordManagement from '@/views/recordFunction/recordManagement';
import RuleExecution from '@/views/recordFunction/ruleExecution';
import QueryRuleExecution from '@/views/recordFunction/queryRuleExecution';
import QueryExecutionRecord from '@/views/recordFunction/queryExecutionRecord';
import RecordTransact from '@/views/recordFunction/subFunction/recordTransact';
import RecordDetail from '@/views/recordFunction/subFunction/recordDetail'
import RecordTransact from '@/views/recordFunction/recordTransact';
import RuleInput from '@/views/recordFunction/ruleInput';

export default {
	path:'/recordFunction',
	name: 'RecordFunction',
	component: RecordFunctionIndex,
	redirect: '/recordFunction/RecordManagementRouter/recordManagement',
	meta: {
		name: '录制功能'
	},
	children:[
		{
			path: 'RecordManagementRouter',
			name: 'RecordManagementRouter',
			component: RecordManagementRouter,
			redirect: '/recordFunction/RecordManagementRouter/recordManagement',
			meta: {
				name: '录制管理',
				parent: 'RecordFunction',
				icon: 'el-icon-video-camera'
			},
			children: [
				{
					path: 'recordManagement',
					name: 'RecordManagement',
					component: RecordManagement,
					meta: {
						name: '录制管理',
						parent: 'RecordFunction',
						icon: 'el-icon-video-camera',
						hide: true
					},
				},
				{
					path: 'recordTransact',
					name: 'RecordTransact',
					component: RecordTransact,
					meta: {
						name: "录制功能点管理",
						parent: 'recordFunction',
						icon: 'el-icon-view',
						hide: true
					},
				},
				{
					path: 'recordDetail',
					name: 'RecordDetail',
					component: RecordDetail,
					meta: {
						name: 'UI管理',
						parent: 'recordFunction',
						icon: 'el-icon-view',
						hide: true
					}
				}
			]
		},
		{
			path: 'recordTransact',
			name: 'RecordTransact',
			component: RecordTransact,
			hidden: true,
			meta: {
				name: '功能点',
				parent: 'RecordFunction',
				hide: true
			}
		},
		{
			path: 'ruleInput',
			name: 'RuleInput',
			component: RuleInput,
			hidden: true,
			meta: {
				name: '规则录入',
				parent: 'RecordFunction',
				hide: true
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
		},
	]
}
