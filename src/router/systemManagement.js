/**
 * 系统管理页面路由
 */
import SystemManagementIndex from '@/views/systemManagement/index'
import UserManagement from '@/views/systemManagement/userManagement'
import RunnerMnagement from '@/views/systemManagement/runnerManagement'

export default {
    path: '/systemManagement',
    name: 'SystemManagement',
    component: SystemManagementIndex,
    redirect: '/systemManagement/userManagement',
    meta: {
        name: '系统管理'
    },
    children: [
        {
            path: 'userManagement',
            name: 'userManagement',
            component: UserManagement,
            meta: {
                name: '用户管理',
                parent: 'SystemManagement',
                icon: 'el-icon-view'
            }
        },
        {
            path: 'runnerMnagement',
            name: 'runnerMnagement',
            component: RunnerMnagement,
            meta: {
                name: '执行机管理',
                parent: 'SystemManagement',
                icon: 'el-icon-setting'
            }
        }
    ]
}
