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
						}
				},
        {
            path: 'scene',
            name: 'scene',
            component: scene,
            meta: {
                name: '场景管理',
                parents: 'TestProjectIndex',
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
                parents: 'TestProjectIndex',
                icon: 'el-icon-setting',
                hide: false
            }
        },
        {
            path: 'datatable',
            name: 'datatable',
            component: datatable,
            meta: {
                name: '测试资源管理单用例',
                parents: 'TestProjectIndex',
                icon: 'el-icon-edit'
            }
        },
				{
						path: 'datatable_flowcase',
						name: 'DatatableFlowcase',
						component: DatatableFlowcase,
						meta: {
							name: '测试资源管理流程用例',
							parents: 'TestProjectIndex',
							icon: 'el-icon-edit'
						},
				},
        {
            path: 'batchexecutionquery',
            name: 'BatchExecutionQuery',
            component: BatchExecutionQuery,
            meta: {
                name: '批次执行查询',
                parents: 'TestProjectIndex',
                icon: 'el-icon-search'
            }

        },
        {
            path: 'testrecord',
            name: 'TestRecord',
            component: TestRecord,
            meta: {
                name:'执行记录查询',
                parents: 'TestProjectIndex',
                icon: 'el-icon-search'
            }
        },
        {
            path: 'insertSceneCase',
            name: 'InsertSceneCase',
            component: InsertSceneCase,
            meta: {
                name: '添加场景用例',
                parents: 'TestProjectIndex',
                icon: 'el-icon-search'
            }
        },
				{
						path: 'caseOperation',
						name: 'CaseOperation',
						component: CaseOperation,
						meta: {
								name: '用例执行结果查询',
								parents: 'TestProjectIndex',
								icon: 'el-icon-info'
						}
				}

    ]
}
