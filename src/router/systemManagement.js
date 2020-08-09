/**
 * 系统管理页面路由
 */
import SystemManagementIndex from '@/views/systemManagement/index'
import EnterpriseMnagement from '@/views/systemManagement/EnterpriseMnagement'
import AdministratorMnagement from '@/views/systemManagement/AdministratorMnagement'
import RoleMnagement from '@/views/systemManagement/RoleMnagement'
import MenuManagement from '@/views/systemManagement/MenuManagement'
import ProjectMnagement from '@/views/systemManagement/ProjectMnagement'
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
            path: 'enterpriseMnagement',
            name: 'enterpriseMnagement',
            component: EnterpriseMnagement,
            meta: {
                name: '企业管理',
                parent: 'SystemManagement',
                icon: 'el-icon-s-platform'
            }
        },
        {
            path: 'administratorMnagement',
            name: 'administratorMnagement',
            component: AdministratorMnagement,
            meta: {
                name: '系统管理员管理',
                parent: 'SystemManagement',
                icon: 'el-icon-user-solid'
            }
        },
        {
            path: 'roleMnagement',
            name: 'roleMnagement',
            component: RoleMnagement,
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
            path: 'projectMnagement',
            name: 'projectMnagement',
            component: ProjectMnagement,
            meta: {
                name: '项目组管理',
                parent: 'SystemManagement',
                icon: 'el-icon-s-management'
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
            path: 'runnerMnagement',
            name: 'runnerMnagement',
            component: RunnerMnagement,
            meta: {
                name: '执行机管理',
                parent: 'SystemManagement',
                icon: 'el-icon-setting'
            }
        },
    ]
}
