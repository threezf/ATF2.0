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
import DatatableFlowcase from '@/views/testProject/datatableFlowcase'
import BatchExecutionQuery from "@/views/testProject/batchExecutionQuery"
import TestRecord from '@/views/testProject/testRecord'
import SceneSetting from '@/views/testProject/sceneSetting'
import InsertSceneCase from '@/views/testProject/insertSceneCase'
import CaseOperation from '@/views/testProject/subFunction/caseOperation'
import uploadRecord from '@/views/testProject/subFunction/uploadRecord'
import testplanExecute from '@/views/testProject/testplanExecute'
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
						parent: 'TestProjectIndex',
						icon: 'el-icon-view'
				}
		},
		{
				path: 'testCase',
				name: 'testCase',
				component: testCaseManagement,
				meta: {
						name: '测试用例管理',
						parent: 'TestProjectIndex',
						icon: 'el-icon-star-off'
				},
		},
		{
			path: 'datatable',
			name: 'datatable',
			component: datatable,
			meta: {
				name: '测试资源管理管理',
				parent: 'TestProjectIndex',
				icon: 'el-icon-edit'
			}
		},
		{
			path: 'uploadRecord',
			name: 'uploadRecord',
			component: uploadRecord,
			meta: {
				name: '导入记录',
				parent: 'TestProjectIndex',
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
                parent: 'TestProjectIndex',
                icon: 'el-icon-edit',
                children: [
                ]
            }
        },
        {
            path: 'sceneSetting',
            name: 'sceneSetting',
            component: SceneSetting,
            meta: {
                name: '场景设置',
                parent: 'TestProjectIndex',
                icon: 'el-icon-setting',
                hide: true
            }
        },
        // {
        //     path: 'datatable',
        //     name: 'datatable',
        //     component: datatable,
        //     meta: {
        //         name: '测试资源管理单用例',
        //         parent: 'TestProjectIndex',
        //         icon: 'el-icon-edit'
        //     }
        // },
		{
				path: 'datatable_flowcase',
				name: 'DatatableFlowcase',
				component: DatatableFlowcase,
				meta: {
					name: '测试资源管理流程用例',
					parent: 'TestProjectIndex',
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
                parent: 'TestProjectIndex',
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
						parent: 'TestProjectIndex',
						icon: 'el-icon-info',
						hide: true
				}
		},{
			path: 'testplanExecute',
			name: 'testplanExecute',
			component: testplanExecute,
			meta: {
				name: '测试计划及执行',
				parent: 'TestProjectIndex',
				icon: 'el-icon-cpu'
			}
		},
		{
			path: 'batchexecutionquery',
			name: 'BatchExecutionQuery',
			component: BatchExecutionQuery,
			meta: {
				name: '批次执行查询',
				parent: 'TestProjectIndex',
				icon: 'el-icon-search'
			}

		},
		{
			path: 'testrecord',
			name: 'TestRecord',
			component: TestRecord,
			meta: {
				name: '执行记录查询',
				parent: 'TestProjectIndex',
				icon: 'el-icon-search'
			}
		},
		{
			path: 'testRecord_of_runId',
			name: 'testRecord_of_runId',
			component: testRecord_of_runId,
			meta: {
				name: '测试记录单',
				parent: 'TestProjectIndex',
				icon: 'el-icon-edit',
				hide: true
			}
		}

    ]
}
