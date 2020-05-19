/*
 * @Author: your name
 * @Date: 2019-12-22 09:48:55
 * @LastEditTime: 2020-05-18 10:48:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ATF2.0\src\router\testProject.js
 */
/**
 * 测试项目管理页面路由
 */
import testProjectIndex from '@/views/testProject/index'
import scene from '@/views/testProject/scene'
import testProject from '@/views/testProject/testProject'
import testCaseManagement from "../views/testProject/testCaseManagement"
import datatable from "../views/testProject/datatable"
import uploadRecord from '@/views/testProject/subFunction/uploadRecord'
import testRecord_of_runId from '@/views/testProject/testRecord_of_runId'

export default {
	path: '/testProjectIndext',
	name: 'TestProject',
	component: testProjectIndex,
	redirect: '/testProjectIndext/testProject',
	meta: {
		name: '项目测试'
	},
	children: [
		{
			path: 'testProject',
			name: 'testProject',
			component: testProject,
			meta: {
				name: '测试项目管理',
				parents: 'TestProjectIndex',
				icon: 'el-icon-view'
			}
		},
		{
			path: 'testCase',
			name: 'testCase',
			component: testCaseManagement,
			meta: {
				name: '测试用例管理',
				parents: 'TestProjectIndex',
				icon: 'el-icon-star-off'
			},
			// children:[
			// 	{
			// 		path: 'uploadRecord',
			// 		name: 'uploadRecord',
			// 		component: uploadRecord,
			// 		meta: {
			// 			name: '导入记录',
			// 			parents: 'testCaseManagement',
			// 			icon: 'el-icon-star-off'
			// 		},
			// 	},
			// ]
		},
		{
			path: 'uploadRecord',
			name: 'uploadRecord',
			component: uploadRecord,
			meta: {
				name: '导入记录',
				parents: 'TestProjectIndex',
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
				parents: 'TestProjectIndex',
				icon: 'el-icon-edit'
			}
		},
		{
			path: 'datatable',
			name: 'datatable',
			component: datatable,
			meta: {
				name: '测试资源管理管理',
				parents: 'TestProjectIndex',
				icon: 'el-icon-edit'
			}
		},
		{
			path: 'testRecord_of_runId',
			name: 'testRecord_of_runId',
			component: testRecord_of_runId,
			meta: {
				name: '测试记录单',
				parents: 'TestProjectIndex',
				icon: 'el-icon-edit',
				hide: true
			}
		}
	]
}
