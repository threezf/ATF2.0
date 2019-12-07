/**
 * 测试基础设施界面路由
 */

import TestInfrastructureIndex from '@/views/testInfrastructure/index';
import TestedSystemManagement from '@/views/testInfrastructure/testedSystemManagement';
import AutomatedComponentManagement from '@/views/testInfrastructure/automatedComponentManagement';
import MockApi from '@/views/testInfrastructure/mockApi';
import Transact from '@/views/testInfrastructure/transact';

export default {
	path: '/testInfrastructure',
	name: 'TestInfrastructure',
	component: TestInfrastructureIndex,
	redirect: '/testInfrastructure/testedSystemManagement',
	meta:{
		name: '测试基础设施'
	},
	children:[
		{
			path: 'testedSystemManagement',
			name: 'TestedSystemManagement',
			component: TestedSystemManagement,
			meta: {
				name: "被测系统管理",
				parent: 'TestInfrastructure',
				icon: 'el-icon-view'
			},
			//考虑此处添加功能点管理路由
		},
		{
			path: 'transact',
			name: 'Transact',
			component: Transact,
			meta:{
				name: '被测系统管理',
				parent: 'TestInfrastructureIndex',
				icon: 'el-icon-view',
				hide: true
			}
		},
		{
			path: 'automatedComponentManagement',
			name: 'AutomatedComponentManagement',
			component: AutomatedComponentManagement,
			meta:{
				name: '自动化构件管理',
				parent: 'TestInfrastructure',
				icon: "el-icon-setting"
			}
		},
		{
			path: 'mockApi',
			name: "MockApi",
			component: MockApi,
			meta: {
				name: "Mock API",
				parent: "TestInfrastructure",
				icon: "el-icon-setting"
			}
		}
	]
}
