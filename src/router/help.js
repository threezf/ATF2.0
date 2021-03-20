import HelpIndex from '@/views/help/index'
import HelpInfo from '@/views/help/helpInfo'

import TestInfrastructure from '@/views/help/testInfrastructure'
import TestProject from '@/views/help/testProject'
import User from '@/views/help/user'

export default {
    path: '/help',
    name: 'Help',
    component: HelpIndex,
    redirect: '/help/helpInfo',
    meta: {
        name: '帮助',
        another: 'atf/interface'
    },
    children: [{
        path: 'helpinfo',
        name: 'HelpInfo',
        component: HelpInfo,
        meta: {
            name: '公共函数',
            another: 'atf/interface'
        },
    }, {
        path: 'infrastructure',
        name: 'Infrastructure',
        component: TestInfrastructure,
        meta: {
            name: '基础设施说明',
            another: 'atf/interface',
            icon: 'el-icon-document'
        }
    }, {
        path: 'project',
        name: 'Project',
        component: TestProject,
        meta: {
            name: '项目测试说明',
            another: 'atf/interface',
            hide: false,
            icon: 'el-icon-document'
            
        }
    }, {
        path: 'userDesc',
        name: 'UserDesc',
        component: User,
        meta: {
            name: '用户权限说明',
            another: 'atf/interface',
            hide: false,
            icon: 'el-icon-document'
        }
    }]
}