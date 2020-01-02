/**
 * 测试项目管理页面路由
 */
import testProjectIndex from '@/views/testProject/index'
import scene from '@/views/testProject/scene'
import testProject from '@/views/testProject/testProject'
import testCaseManagement from "../views/testProject/testCaseManagement"
import datatable from "../views/testProject/datatable"
 
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
        }
    ]
}
