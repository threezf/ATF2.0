/**
 * UI测试页面路由
 */
import UI from '@/views/UIorCGI/ui'
import TestInfrastructure from './testInfrastructure.js'
import TestProject from './testProject.js'
import TestInfrastructureIndex from '@/views/testInfrastructure/index';
import TestedSystemManagement from '@/views/testInfrastructure/testedSystemManagement';
import Transact from '@/views/testInfrastructure/subFunction/transact';
import ConfigureSystemData from '@/views/testInfrastructure/subFunction/interfaceTest';
import AutomatedComponentMaintenance from '@/views/testInfrastructure/subFunction/automatedComponentMaintenance';
import PerformCodeManagement from '@/views/testInfrastructure/subFunction/performCodeManagement';
import testProjectIndex from '@/views/testProject/index'
import scene from '@/views/testProject/scene'
import testProject from '@/views/testProject/testProject'
import manageTestProject from '../views/testProject/manageTestProject'
import testCaseManagement from "../views/testProject/testCaseManagement"
import datatable from "../views/testProject/datatable"
import DatatableFlowcase from '@/views/testProject/datatableFlowcase'
import BatchExecutionQuery from "@/views/testProject/batchExecutionQuery"
import TestRecord from '@/views/testProject/testRecord'
import SceneSetting from '@/views/testProject/sceneSetting'
import InsertSceneCase from '@/views/testProject/insertSceneCase'
import CaseOperation from '@/views/testProject/subFunction/caseOperation'
import uploadRecord from '@/views/testProject/subFunction/uploadRecord'
import testplanExecute from '@/views/testProject/testplanExecute'
import testRecord_of_runId from '@/views/testProject/testRecord_of_runId'
import TransactDetail from '@/views/testInfrastructure/transactDetail'
import UseCaseDebug from '@/views/testInfrastructure/transactDetail/useCaseDebug'
export default {
	path: '/ui',
	name: 'UI',
	component: UI,
	redirect: '/ui/testedSystemManagement',
	meta: {
		name: 'UI测试',
		another: 'atf/ui'
	},
	children: [
		{
				path: 'testedSystemManagement',
				name: 'TestedSystemManagement',
				component: TestedSystemManagement,
				meta: {
					name: "UI管理",
					parent: 'UI',
					icon: 'el-icon-menu',
				},
				//考虑此处添加功能点管理路由
			},
			{
				path: 'transact',
				name: 'Transact',
				component: Transact,
				meta:{
					name: '功能点管理',
					parent: 'UI',
					icon: 'el-icon-view',
					hide: true
				}
			},
			{
				path: 'autData',
				name: 'ConfigureSystemData',
				component: ConfigureSystemData,
				meta: {
					name: "被测系统管理",
					parent: 'UI',
					icon: 'el-icon-view',
					hide: true
				},
			},
			{
				path: 'automatedComponentMaintenance',
				name: 'AutomatedComponentMaintenance',
				component: AutomatedComponentMaintenance,
				meta: {
					name: "自动化构件维护",
					parent: 'UI',
					icon: 'el-icon-view',
					hide: true
				},
			},
			{
				path: 'execCode',
				name: 'PerformCodeManagement',
				component: PerformCodeManagement,
				meta: {
					name: "被测系统管理",
					parent: 'UI',
					icon: 'el-icon-view',
					hide: true
				},
		},
		{
			path: 'transactDetail',
			name: 'TransactDetail',
			component: TransactDetail,
			meta: {
				name: 'UI管理',
				parent: 'UI',
				icon: 'el-icon-document-copy',
				hide: true,
			},
			children: [
			]
		},
		{
			path: 'useCaseDebug',
			name: 'UseCaseDebug',
			component: UseCaseDebug,
			meta: {
				name: '用例调试',
				parent: 'UI',
				hide: true
			}
		},
		// {
		// 	path: 'testProjectIndext',
		// 	name: 'TestProject',
		// 	component: testProjectIndex,
		// 	redirect: '/ui/testProject',
		// 	meta: {
		// 		name: '项目测试',
		// 		parent: 'UI',
		// 		another: 'atf/project'
		// 	},
		// },
		{
			path: 'testProject',
			name: 'testProject',
			component: testProject,
			meta: {
				name: '项目测试',
				parent: 'UI',
				icon: 'el-icon-s-platform',
			},
		},
		{
			path: 'manageTestProject',
			name: 'manageTestProject',
			component: manageTestProject,
			meta: {
				name: '管理项目',
				parent: 'UI',
				icon: 'el-icon-back',
				hide:true
			}
		},
		{
			path: 'testCase',
			name: 'testCase',
			component: testCaseManagement,
			meta: {
				name: '测试用例管理',
				parent: 'UI',
				icon: 'el-icon-star-off',
				hide: true,
				display:true
			},
		},
		{
			path: 'datatable',
			name: 'datatable',
			component: datatable,
			meta: {
				name: '测试资源管理',
				parent: 'UI',
				icon: 'el-icon-edit',
				hide: true,
				display:true
			}
		},
		{
			path: 'uploadRecord',
			name: 'uploadRecord',
			component: uploadRecord,
			meta: {
				name: '导入记录',
				parent: 'UI',
				icon: 'el-icon-star-off',
				hide: true
			},
		},
		{
			path: 'scene',
			name: 'scene',
			component: scene,
			meta: {
				name: '场景管理',
				parent: 'UI',
				icon: 'el-icon-notebook-1',
				hide: true,
				display:true
			}
		},
		{
			path: 'sceneSetting',
			name: 'sceneSetting',
			component: SceneSetting,
			meta: {
				name: '场景设置',
				parent: 'UI',
				icon: 'el-icon-setting',
				hide: true
			}
		},
		{
			path: 'datatable_flowcase',
			name: 'DatatableFlowcase',
			component: DatatableFlowcase,
			meta: {
				name: '测试资源管理流程用例',
				parent: 'UI',
				icon: 'el-icon-edit',
				hide: true
			},
		},
		{
			path: 'insertSceneCase',
			name: 'InsertSceneCase',
			component: InsertSceneCase,
			meta: {
				name: '添加场景用例',
				parent: 'UI',
				icon: 'el-icon-search',
				hide: true
			}
		},
		{
			path: 'caseOperation',
			name: 'CaseOperation',
			component: CaseOperation,
			meta: {
				name: '用例执行结果查询',
				parent: 'UI',
				icon: 'el-icon-info',
				hide: true
			}
		},{
			path: 'testplanExecute',
			name: 'TestplanExecute',
			component: testplanExecute,
			meta: {
				name: '测试计划及执行',
				parent: 'UI',
				icon: 'el-icon-cpu',
				hide: true,
				display:true
			}
		},
		{
			path: 'batchexecutionquery',
			name: 'BatchExecutionQuery',
			component: BatchExecutionQuery,
			meta: {
				name: '批次执行查询',
				parent: 'UI',
				icon: 'el-icon-search',
				hide: true,
				display:true
			}

		},
		{
			path: 'testrecord',
			name: 'TestRecord',
			component: TestRecord,
			meta: {
				name: '执行记录查询',
				parent: 'UI',
				icon: 'el-icon-search',
				hide: true
			}
		},
		{
			path: 'testRecord_of_runId',
			name: 'testRecord_of_runId',
			component: testRecord_of_runId,
			meta: {
				name: '测试记录单',
				parent: 'UI',
				icon: 'el-icon-edit',
				hide: true
			}
		},


	]
}
