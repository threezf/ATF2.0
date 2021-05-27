/**
 * 测试基础设施界面路由
 */

import TestInfrastructureIndex from '@/views/testInfrastructure/index';
import TestedSystemManagementRouter from '@/views/testInfrastructure/testedSystemManagementRouter';
import TestedSystemManagement from '@/views/testInfrastructure/testedSystemManagement';
import Transact from '@/views/testInfrastructure/subFunction/transact';
import ConfigureSystemData from '@/views/testInfrastructure/subFunction/interfaceTest';
import AutomatedComponentMaintenance from '@/views/testInfrastructure/subFunction/automatedComponentMaintenance';
import PerformCodeManagement from '@/views/testInfrastructure/subFunction/performCodeManagement';
import ProjectEnvironment from '@/views/testInfrastructure/interfacesManagement/projectEnvironment';
import TestCases from '@/views/testInfrastructure/interfacesManagement/testCases';

import TransactDetail from '@/views/testInfrastructure/transactDetail'
import InterfacesManagement from '@/views/testInfrastructure/interfacesManagement/interfaceManage'
// import InterfacesManagement from '@/views/testInfrastructure/subFunction/interfacesManagement'
import InterfaceDetail from '@/views/testInfrastructure/interfacesManagement/interfaceDetail'
import ProductLine from '@/views/testInfrastructure/subFunction/productLine'
import UseCaseDebug from '@/views/testInfrastructure/transactDetail/useCaseDebug'


export default {
	path: '/testInfrastructure',
	name: 'TestInfrastructure',
	component: TestInfrastructureIndex,
	redirect: '/testInfrastructure/TestedSystemManagementRouter/testedSystemManagement',
	meta:{
		name: '测试基础设施',
		another: 'atf/aut'
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
				icon: 'el-icon-back',
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
					beforeEnter: (to, from, next) => {
						if(from.name === 'TransactDetail' || from.name === 'UseCaseDebug' || from.name === 'InterfacesManagement') {
							history.go(-1)
							console.log('跳转到testedSystemManagement', to, from)
						}else {
							next()
						}
					}
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
			path: 'transactDetail',
			name: 'TransactDetail',
			component: TransactDetail,
			meta: {
				name: 'UI管理',
				parent: 'TestedSystemManagement',
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
				parent: 'TestInfrastructure',
				hide: true
			}
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
				isDisplay: true
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
			component: ConfigureSystemData,
			meta: {
				name: "接口测试",
				another: 'atf/interface',
				icon: 'el-icon-stopwatch',
				hide: true,
				isDisplay: true
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
				isDisplay: true
			},
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
				isDisplay: true
			},
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
