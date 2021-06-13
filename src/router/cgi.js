/**
 * UI测试页面路由
 */
import CGI from '@/views/UIorCGI/CGI'
import TestedSystemManagement from '@/views/testInfrastructure/testedSystemManagement';
import scene from '@/views/testProject/scene'
import testProject from '@/views/testProject/testProject'
import processTestCase from '../views/testInfrastructure/interfacesAutoTest/processTestCase'
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

import ProjectEnvironment from '@/views/testInfrastructure/interfacesManagement/projectEnvironment';
import TestCases from '@/views/testInfrastructure/interfacesManagement/testCases';
import InterfacesManagement from '@/views/testInfrastructure/interfacesManagement/interfaceManage'
import InterfaceDetail from '@/views/testInfrastructure/interfacesManagement/interfaceDetail'
import ProductLine from '@/views/testInfrastructure/subFunction/productLine'
import InterfaceTest from '@/views/testInfrastructure/subFunction/interfaceTest';
import ProcessCaseSteps from '../views/testInfrastructure/interfacesAutoTest/processCaseSteps';
export default {
	path: '/interface',
	name: 'Interface',
	component: CGI,
	redirect: '/interface/testedSystemManagement',
	meta: {
		name: '接口测试',
		another: 'atf/ui'
	},
	children: [
		{
				path: 'testedSystemManagement',
				name: 'TestedSystemManagement',
				component: TestedSystemManagement,
				meta: {
					name: "接口管理",
					parent: 'Interface',
					icon: 'el-icon-menu',
				},
			},
		// 接口管理
		{
			path: 'interfacesManagement',
			name: 'InterfacesManagement',
			component: InterfacesManagement,
			meta: {
				name: '接口管理',
				another: 'atf/interface',
				icon: 'el-icon-menu',
				hide: true,
				display: true
			},
		},
		{
			path: 'interfaceDetail',
			name: 'InterfaceDetail',
			component: InterfaceDetail,
			meta: {
				name: "接口详情",
				hide: true
			},
		},
		{
			path: 'interfaceTest',
			name: 'InterfaceTest',
			component: InterfaceTest,
			meta: {
				name: "接口测试",
				another: 'atf/interface',
				icon: 'el-icon-stopwatch',
				hide: true,
				display: true
			},
		},
		{
			path: 'testCases',
			name: 'TestCases',
			component: TestCases,
			meta: {
				name: "测试用例",
				another: 'atf/interface',
				icon: 'el-icon-document',
				hide: true,
				display: true
			},
		},
		{
			path: 'testProject',
			name: 'testProject',
			component: testProject,
			meta: {
				name: '接口自动化测试',
				parent: 'Interface',
				icon: 'el-icon-s-platform',
			},
		},
		{
			path: 'processTestCase',
			name: 'ProcessTestCase',
			component: processTestCase,
			meta: {
				name: '流程测试用例',
				parent: 'Interface',
				icon: 'el-icon-edit',
				hide: true,
				show: true
			}
		},
		{
			path: 'projectEnvironment',
			name: 'ProjectEnvironment',
			component: ProjectEnvironment,
			meta: {
				name: "项目环境",
				another: 'atf/interface',
				icon: 'el-icon-star-off',
				hide: true,
				display: true,
				show: true
			},
		},
		{
			path: 'processCaseSteps',
			name: 'ProcessCaseSteps',
			component: ProcessCaseSteps,
			meta: {
				name: '测试步骤',
				parent: 'Interface',
				icon: 'el-icon-star-off',
				hide: true,
			},
		},
		{
			path: 'datatable',
			name: 'datatable',
			component: datatable,
			meta: {
				name: '测试资源管理',
				parent: 'Interface',
				icon: 'el-icon-edit',
				hide: true,
			}
		},
		{
			path: 'uploadRecord',
			name: 'uploadRecord',
			component: uploadRecord,
			meta: {
				name: '导入记录',
				parent: 'Interface',
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
				parent: 'Interface',
				icon: 'el-icon-notebook-1',
				hide: true,
			}
		},
		{
			path: 'sceneSetting',
			name: 'sceneSetting',
			component: SceneSetting,
			meta: {
				name: '场景设置',
				parent: 'Interface',
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
				parent: 'Interface',
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
				parent: 'Interface',
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
				parent: 'Interface',
				icon: 'el-icon-info',
				hide: true
			}
		},{
			path: 'testplanExecute',
			name: 'TestplanExecute',
			component: testplanExecute,
			meta: {
				name: '测试计划及执行',
				parent: 'Interface',
				icon: 'el-icon-cpu',
				hide: true,
			}
		},
		{
			path: 'batchexecutionquery',
			name: 'BatchExecutionQuery',
			component: BatchExecutionQuery,
			meta: {
				name: '批次执行查询',
				parent: 'Interface',
				icon: 'el-icon-search',
				hide: true,
			}

		},
		{
			path: 'testrecord',
			name: 'TestRecord',
			component: TestRecord,
			meta: {
				name: '执行记录查询',
				parent: 'Interface',
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
				parent: 'Interface',
				icon: 'el-icon-edit',
				hide: true
			}
		},
		{
			path: 'productLine',
			name: 'ProductLine',
			component: ProductLine,
			meta: {
				name: '产品线',
				parent: 'Interface',
				icon: 'el-icon-view',
				hide: true
			}
		},

	]
}
