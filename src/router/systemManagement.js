/**
 * 系统管理页面路由
 */
import SystemManagementIndex from '@/views/systemManagement/index'
import EnterpriseManagement from '@/views/systemManagement/EnterpriseManagement'
import RoleManagement from '@/views/systemManagement/RoleManagement'
import MenuManagement from '@/views/systemManagement/MenuManagement'
import UserManagement from '@/views/systemManagement/userManagement'
import RunnerManagement from '@/views/systemManagement/runnerManagement'

export default {
    path: '/systemManagement',
    name: 'SystemManagement',
    component: SystemManagementIndex,
    redirect: '/systemManagement/enterpriseManagement',
    meta: {
        name: '系统管理'
    },
    children: [
        {
            path: 'enterpriseManagement',
            name: 'enterpriseManagement',
            component: EnterpriseManagement,
            meta: {
                name: '企业管理',
                parent: 'SystemManagement',
                icon: 'el-icon-s-platform'
            }
        },
        {
            path: 'roleManagement',
            name: 'roleManagement',
            component: RoleManagement,
            meta: {
                name: '角色管理',
                parent: 'SystemManagement',
                icon: 'el-icon-user'
            }
        },
        {
            path: 'menuManagement',
            name: 'menuManagement',
            component: MenuManagement,
            meta: {
                name: '系统菜单',
                parent: 'SystemManagement',
                icon: 'el-icon-menu'
            }
        },
        {
            path: 'userManagement',
            name: 'userManagement',
            component: UserManagement,
            meta: {
                name: '用户管理',
                parent: 'SystemManagement',
                icon: 'el-icon-s-custom'
            }
        },
        {
            path: 'runnerManagement',
            name: 'runnerManagement',
            component: RunnerManagement,
            meta: {
                name: '执行机管理',
                parent: 'SystemManagement',
                icon: 'el-icon-setting'
            }
        },
    ]
}
