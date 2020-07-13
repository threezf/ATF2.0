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
import Preview from '@/views/testInfrastructure/mockAPIComponents/Preview'
import Edit from '@/views/testInfrastructure/mockAPIComponents/Edit'
import Run from '@/views/testInfrastructure/mockAPIComponents/Run'
import TransactDetail from '@/views/testInfrastructure/transactDetail'
import InterfacesManagement from '@/views/testInfrastructure/subFunction/interfacesManagement'
import ProductLine from '@/views/testInfrastructure/subFunction/productLine'


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
						name: '功能点管理',
						parent: 'TestInfrastructure',
						icon: 'el-icon-view',
						hide: true
					}
				},
				// // 接口管理
				// {
				// 	path: 'interfacesManagement',
				// 	name: 'InterfacesManagement',
				// 	component: InterfacesManagement,
				// 	meta: {
				// 		name: '被测系统管理1',
				// 		parent: 'TestInfrastructure',
				// 		icon: 'el-icon-view',
				// 		// hide: true
				// 	}
				// },
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
					path: 'automatedComponentMaintenance',
					name: 'AutomatedComponentMaintenance',
					component: AutomatedComponentMaintenance,
					meta: {
						name: "自动化构件维护",
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
			path: 'transactDetail',
			name: 'TransactDetail',
			component: TransactDetail,
			meta: {
				name: 'UI管理',
				parent: 'TestedSystemManagement',
				icon: 'el-icon-document-copy',
				hide: true
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
			},
			children: [
				{
					path: 'preview/:id',
					name: 'Preview',
					component: Preview,
					meta: {
						parent: 'TestInfrastructure',
						hide: true
					},
				},
				{
					path: 'edit/:id',
					name: 'Edit',
					component: Edit,
					meta: {
						parent: 'TestInfrastructure',
						hide: true
					},
				},
				{
					path: 'run/:id',
					name: 'Run',
					component: Run,
					meta: {
						parent: 'TestInfrastructure',
						hide: true
					},
				}
			]
		},
		// 接口管理
		{
			path: 'interfacesManagement',
			name: 'InterfacesManagement',
			component: InterfacesManagement,
			meta: {
				name: '接口管理',
				parent: 'TestInfrastructure',
				icon: 'el-icon-view',
				hide: true
			}
		},
		{
			path: 'productLine',
			name: 'ProductLine',
			component: ProductLine,
			meta: {
				name: '产品线',
				parent: 'TestInfrastructure',
				icon: 'el-icon-view',
				hide: true
			}
		},
	]
}
