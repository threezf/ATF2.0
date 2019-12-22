/**
 * 测试基础设施界面路由
 */

import TestInfrastructureIndex from '@/views/testInfrastructure/index';
import TestedSystemManagementRouter from '@/views/testInfrastructure/testedSystemManagementRouter';
import TestedSystemManagement from '@/views/testInfrastructure/testedSystemManagement';
import AutomatedComponentManagement from '@/views/testInfrastructure/automatedComponentManagement';
import MockApi from '@/views/testInfrastructure/mockApi';
import Transact from '@/views/testInfrastructure/subFunction/transact';
import ConfigureSystemData from '@/views/testInfrastructure/subFunction/configureSystemData';
import AutomatedComponentMaintenance from '@/views/testInfrastructure/subFunction/automatedComponentMaintenance';
import PerformCodeManagement from '@/views/testInfrastructure/subFunction/performCodeManagement';

import TransactDetail from '@/views/testInfrastructure/transactDetail';

export default {
	path: '/testInfrastructure',
	name: 'TestInfrastructure',
	component: TestInfrastructureIndex,
	redirect: '/testInfrastructure/TestedSystemManagementRouter/testedSystemManagement',
	meta:{
		name: '测试基础设施'
	},
	children:[
		{
			path: 'TestedSystemManagementRouter',
			name: 'TestedSystemManagementRouter',
			component: TestedSystemManagementRouter,
			redirect: '/testInfrastructure/TestedSystemManagementRouter/testedSystemManagement',
			meta: {
				name: "被测系统管理",
				parent: 'TestInfrastructure',
				icon: 'el-icon-view'
			},
			children: [
				{
					path: 'testedSystemManagement',
					name: 'TestedSystemManagement',
					component: TestedSystemManagement,
					meta: {
						name: "被测系统管理",
						parent: 'TestInfrastructure',
						icon: 'el-icon-view',
						hide: true
					},
					//考虑此处添加功能点管理路由
				},
				{
					path: 'transact',
					name: 'Transact',
					component: Transact,
					meta:{
						name: '被测系统管理',
						parent: 'TestInfrastructure',
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
						parent: 'TestInfrastructure',
						icon: 'el-icon-view',
						hide: true
					},
				},
				{
					path: 'component',
					name: 'AutomatedComponentMaintenance',
					component: AutomatedComponentMaintenance,
					meta: {
						name: "被测系统管理",
						parent: 'TestInfrastructure',
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
						parent: 'TestInfrastructure',
						icon: 'el-icon-view',
						hide: true
					},
				}
			]
			//考虑此处添加功能点管理路由
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
		},
		{
			path: 'transactDetail',
			name: 'TransactDetail',
			component: TransactDetail,
			meta: {
				name: 'UI管理',
				parents: 'TestedSystemManagement',
				icon: 'el-icon-document-copy'
			}
		}
	]
}
