/**
 * 测试项目管理页面路由
 */
import testProjectIndex from '@/views/testProject/index'
import scene from '@/views/testProject/scene'

export default {
    path: '/testProjectIndext',
    name: 'TestProject',
    component: testProjectIndex,
    redirect: '/testProjectIndext/scene',
    meta: {
        name: '项目测试'
    },
    children: [
        {
            path: 'scene',
            name: 'scene',
            component: scene,
            meta: {
                name: '场景管理',
                parents: 'TestProjectIndex',
                icon: 'el-icon-view'
            }
        }
    ]
}